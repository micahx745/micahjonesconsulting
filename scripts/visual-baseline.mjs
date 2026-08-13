// scripts/visual-baseline.mjs
//
// Captures a full-page screenshot of every live route at three widths into
// qa/baselines/ (or a comparison dir), so risky refactors — CSS purges,
// token changes, layout rewrites — can be diffed instead of eyeballed.
//
// The /premium audit's visual-qa leg reported "no baselines" on 2026-08-11;
// this is that gap closed. Written for the perf dead-CSS purge, where the
// whole point is deleting thousands of lines without changing one pixel.
//
// Usage:
//   node scripts/visual-baseline.mjs                 # -> qa/baselines
//   node scripts/visual-baseline.mjs --out qa/after  # -> qa/after
//   node scripts/visual-baseline.mjs --diff qa/baselines qa/after
//
// Requires a server already running at BASE (default http://localhost:3000)
// and playwright available via npx. Reduced-motion is forced OFF so the
// captures match what a default visitor sees; scroll-driven palette state is
// settled by scrolling the page before capture.
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

// Playwright is deliberately NOT a dependency of this project — it would add
// ~100MB of browsers to every install for a script that runs a few times a
// release. Resolve it from wherever it already exists: a local install, or a
// path handed in via PLAYWRIGHT_PATH (an npx cache, a global install, a
// throwaway project). Fail with instructions rather than a bare stack trace.
async function loadChromium() {
  try {
    return (await import("playwright")).chromium;
  } catch {
    const override = process.env.PLAYWRIGHT_PATH;
    if (override) {
      const entry = pathToFileURL(join(override, "index.js")).href;
      const mod = await import(entry);
      // playwright's entry is CJS; imported through ESM its named exports may
      // land on the namespace or under .default depending on cjs-interop.
      const chromium = mod.chromium ?? mod.default?.chromium;
      if (!chromium) {
        console.error(`PLAYWRIGHT_PATH resolved but exposed no chromium export: ${entry}`);
        process.exit(2);
      }
      return chromium;
    }
    console.error(
      "playwright not found.\n" +
        "  Install it locally (pnpm add -D playwright && npx playwright install chromium)\n" +
        "  or point PLAYWRIGHT_PATH at an existing install's playwright package directory.",
    );
    process.exit(2);
  }
}

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const REDUCED = process.argv.includes("--reduced");

const ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/ai-engineering",
  "/work",
  "/work/guardicore",
  "/work/ordani",
  "/work/hr-equity-author",
  "/playbook",
  "/hire-me",
  "/no-such-page-404",
];

const WIDTHS = [390, 768, 1440];

const slug = (route) =>
  route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");

async function capture(outDir) {
  const chromium = await loadChromium();
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const results = [];

  for (const width of WIDTHS) {
    // --reduced makes captures DETERMINISTIC: the hero word rotator, scroll
    // reveals and palette drifts all settle to a fixed state, so a diff shows
    // real regressions instead of "the animation was 200ms further along".
    // Use it for before/after refactor comparisons; omit it to capture what a
    // default visitor actually sees.
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: REDUCED ? "reduce" : "no-preference",
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      const url = `${BASE}${route}`;
      await page.goto(url, { waitUntil: "networkidle" });

      // Settle scroll-driven reveals + palette worlds: walk the page, then
      // return to top so the capture starts from a stable state.
      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 250));
      });

      const file = join(outDir, `${slug(route)}-${width}.png`);
      await page.screenshot({ path: file, fullPage: true });
      results.push({ route, width, file });
      process.stdout.write(`  captured ${slug(route)}-${width}\n`);
    }

    await context.close();
  }

  await browser.close();
  return results;
}

// Byte comparison first (fast path — identical files short-circuit), then a
// real pixel diff for anything that differs. Byte size alone is useless here:
// a 20KB PNG delta can be one animation frame or a broken layout, and only
// per-pixel comparison with a bounding box tells them apart. Decoding runs in
// the browser via canvas so this needs no image-decoding dependency.
async function diff(dirA, dirB) {
  const files = (await readdir(dirA)).filter((f) => f.endsWith(".png"));
  const changed = [];
  const identical = [];
  const missing = [];
  const suspects = [];

  for (const f of files) {
    const a = join(dirA, f);
    const b = join(dirB, f);
    if (!existsSync(b)) {
      missing.push(f);
      continue;
    }
    const [bufA, bufB] = await Promise.all([readFile(a), readFile(b)]);
    if (bufA.equals(bufB)) identical.push(f);
    else suspects.push({ f, a, b, bytesA: bufA.length, bytesB: bufB.length });
  }

  if (suspects.length) {
    const chromium = await loadChromium();
    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const s of suspects) {
      const [bufA, bufB] = await Promise.all([readFile(s.a), readFile(s.b)]);
      const result = await page.evaluate(
        async ([dataA, dataB]) => {
          const load = (d) =>
            new Promise((res, rej) => {
              const img = new Image();
              img.onload = () => res(img);
              img.onerror = rej;
              img.src = d;
            });
          const [ia, ib] = await Promise.all([load(dataA), load(dataB)]);
          if (ia.width !== ib.width || ia.height !== ib.height) {
            return {
              sizeMismatch: true,
              a: `${ia.width}x${ia.height}`,
              b: `${ib.width}x${ib.height}`,
            };
          }
          const draw = (img) => {
            const c = document.createElement("canvas");
            c.width = img.width;
            c.height = img.height;
            c.getContext("2d").drawImage(img, 0, 0);
            return c.getContext("2d").getImageData(0, 0, img.width, img.height).data;
          };
          const da = draw(ia);
          const db = draw(ib);
          // Tolerance absorbs sub-pixel AA and JPEG-free PNG rounding; only
          // channel deltas a human could see count as a differing pixel.
          const TOL = 12;
          let diffPx = 0;
          let minX = ia.width, minY = ia.height, maxX = -1, maxY = -1;
          for (let i = 0; i < da.length; i += 4) {
            if (
              Math.abs(da[i] - db[i]) > TOL ||
              Math.abs(da[i + 1] - db[i + 1]) > TOL ||
              Math.abs(da[i + 2] - db[i + 2]) > TOL
            ) {
              diffPx++;
              const px = (i / 4) % ia.width;
              const py = Math.floor(i / 4 / ia.width);
              if (px < minX) minX = px;
              if (px > maxX) maxX = px;
              if (py < minY) minY = py;
              if (py > maxY) maxY = py;
            }
          }
          const totalPx = ia.width * ia.height;
          return {
            sizeMismatch: false,
            diffPx,
            totalPx,
            pct: +((diffPx / totalPx) * 100).toFixed(4),
            box: maxX < 0 ? null : { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 },
            dims: `${ia.width}x${ia.height}`,
          };
        },
        [
          `data:image/png;base64,${bufA.toString("base64")}`,
          `data:image/png;base64,${bufB.toString("base64")}`,
        ],
      );
      if (result.sizeMismatch || result.diffPx > 0) changed.push({ file: s.f, ...result });
      else identical.push(s.f);
    }

    await browser.close();
  }

  return { changed, identical, missing, total: files.length };
}

const args = process.argv.slice(2);

if (args[0] === "--diff") {
  const [, dirA, dirB] = args;
  const report = await diff(dirA, dirB);
  console.log(`\nCompared ${report.total} captures: ${dirA} -> ${dirB}`);
  console.log(`  pixel-identical: ${report.identical.length}`);
  console.log(`  CHANGED:         ${report.changed.length}`);
  for (const c of report.changed) {
    if (c.sizeMismatch) {
      console.log(`    ${c.file}  DIMENSIONS ${c.a} -> ${c.b}`);
    } else {
      const b = c.box;
      console.log(
        `    ${c.file}  ${c.pct}% of pixels (${c.diffPx}) | region x${b.x} y${b.y} ${b.w}x${b.h} of ${c.dims}`,
      );
    }
  }
  if (report.missing.length) console.log(`  MISSING in ${dirB}: ${report.missing.join(", ")}`);
  await writeFile(
    join(dirB, "diff-report.json"),
    JSON.stringify(report, null, 2),
    "utf-8",
  );
  process.exit(report.changed.length ? 1 : 0);
} else {
  const outIdx = args.indexOf("--out");
  const outDir = outIdx >= 0 ? args[outIdx + 1] : "qa/baselines";
  console.log(`Capturing ${ROUTES.length} routes x ${WIDTHS.length} widths -> ${outDir}`);
  const results = await capture(outDir);
  console.log(`\nDone: ${results.length} captures in ${outDir}`);
}
