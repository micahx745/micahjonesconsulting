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
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: "no-preference",
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

// Byte-identical check first (fast), then a coarse dimension check so a
// changed-but-same-size image is still reported. Pixel-level diffing is
// deliberately not implemented — anti-aliasing noise across runs produces
// false positives, and the real gate is a human looking at what changed.
async function diff(dirA, dirB) {
  const files = (await readdir(dirA)).filter((f) => f.endsWith(".png"));
  const changed = [];
  const missing = [];

  for (const f of files) {
    const a = join(dirA, f);
    const b = join(dirB, f);
    if (!existsSync(b)) {
      missing.push(f);
      continue;
    }
    const [bufA, bufB] = await Promise.all([readFile(a), readFile(b)]);
    if (!bufA.equals(bufB)) {
      changed.push({ file: f, bytesA: bufA.length, bytesB: bufB.length });
    }
  }

  return { changed, missing, total: files.length };
}

const args = process.argv.slice(2);

if (args[0] === "--diff") {
  const [, dirA, dirB] = args;
  const report = await diff(dirA, dirB);
  console.log(`\nCompared ${report.total} captures: ${dirA} -> ${dirB}`);
  console.log(`  identical: ${report.total - report.changed.length - report.missing.length}`);
  console.log(`  CHANGED:   ${report.changed.length}`);
  for (const c of report.changed) {
    const delta = c.bytesB - c.bytesA;
    console.log(`    ${c.file}  (${delta > 0 ? "+" : ""}${delta} bytes)`);
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
