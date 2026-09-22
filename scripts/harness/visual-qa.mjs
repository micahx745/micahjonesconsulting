// scripts/harness/visual-qa.mjs
//
// C3.2, Harness v2 run E (.claude/briefs/harness-v2-e-visualqa-fablegate.md). Node 22, ESM, no
// new dependencies. Captures VIEWPORT screenshots (never full-page: Color Worlds recolours
// sections on scroll) at scroll offsets down a page, then hands the frames to
// scripts/harness/visual_qa.py for the actual blank/drift/overflow checks and the contact
// sheet.
//
// Usage:
//   node scripts/harness/visual-qa.mjs --base-url URL --routes "/,/about" --widths "390,1440" \
//        --out DIR [--baseline DIR] [--frames 6]
//   node scripts/harness/visual-qa.mjs --selftest
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const DEFAULT_FRAMES = 6;

const slug = (route) =>
  route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");

// Playwright is deliberately not a dependency of this project. Resolve it from
// PLAYWRIGHT_PATH when the env var is set (an npx cache, a global install, a throwaway
// project); otherwise try a bare `import("playwright")` (a local install, if one exists).
// Never install anything. Returns null, never throws, when nothing resolves.
async function loadChromium() {
  try {
    const override = process.env.PLAYWRIGHT_PATH;
    if (override) {
      const entry = pathToFileURL(join(override, "index.js")).href;
      const mod = await import(entry);
      return mod.chromium ?? mod.default?.chromium ?? null;
    }
    return (await import("playwright")).chromium;
  } catch {
    return null;
  }
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--base-url") out.baseUrl = argv[++i];
    else if (a === "--routes") out.routes = argv[++i];
    else if (a === "--widths") out.widths = argv[++i];
    else if (a === "--out") out.out = argv[++i];
    else if (a === "--baseline") out.baseline = argv[++i];
    else if (a === "--frames") out.frames = argv[++i];
  }
  return out;
}

function frameNames(routes, widths, frames) {
  const names = [];
  for (const width of widths) {
    for (const route of routes) {
      const s = slug(route);
      for (let i = 0; i < frames; i++) {
        names.push(`${s}-${width}-${i}`);
      }
    }
  }
  return names;
}

async function selftest() {
  const routes = ["/", "/about"];
  const widths = [390, 1440];
  const frames = 2;
  for (const name of frameNames(routes, widths, frames)) {
    console.log(`frame: ${name}`);
  }
  const chromium = await loadChromium();
  console.log(chromium ? "playwright: found" : "playwright: missing");
  return 0;
}

async function capture(opts) {
  const routes = opts.routes.split(",").map((s) => s.trim()).filter(Boolean);
  const widths = opts.widths
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n));
  const frames = opts.frames ? parseInt(opts.frames, 10) : DEFAULT_FRAMES;
  const outDir = opts.out;
  const framesDir = join(outDir, "frames");
  await mkdir(framesDir, { recursive: true });

  const chromium = await loadChromium();
  if (!chromium) {
    console.log(
      "visual-qa: playwright not found (see scripts/visual-baseline.mjs for setup). " +
        `Image checks still run on existing captures: python scripts/harness/visual_qa.py --captures ${outDir} --out ${outDir}`,
    );
    return 2;
  }

  const overflow = [];
  const browser = await chromium.launch();
  try {
    for (const width of widths) {
      const height = width <= 500 ? 844 : 900;
      const context = await browser.newContext({ viewport: { width, height } });
      const page = await context.newPage();
      try {
        for (const route of routes) {
          const s = slug(route);
          const url = `${opts.baseUrl}${route}`;
          await page.goto(url, { waitUntil: "networkidle" });

          const dims = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
          }));
          overflow.push({
            name: `${s}-${width}`,
            scrollWidth: dims.scrollWidth,
            clientWidth: dims.clientWidth,
          });

          const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
          const maxFrames = Math.min(frames, Math.max(1, Math.ceil(scrollHeight / height)));
          for (let i = 0; i < maxFrames; i++) {
            await page.evaluate((y) => window.scrollTo(0, y), i * height);
            await page.waitForTimeout(60);
            const file = join(framesDir, `${s}-${width}-${i}.png`);
            // Viewport screenshot only: fullPage is never used here (see header comment).
            await page.screenshot({ path: file });
            process.stdout.write(`  captured ${s}-${width}-${i}\n`);
          }
        }
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  const overflowPath = join(outDir, "overflow.json");
  await writeFile(overflowPath, JSON.stringify(overflow, null, 2), "utf-8");

  const lighthouseBin = join("node_modules", ".bin", "lighthouse");
  if (!existsSync(lighthouseBin)) {
    console.log("lighthouse: not installed locally (skipped)");
  }
  // When present, a Lighthouse pass would run here and hand visual_qa.py a
  // --lighthouse-json path. Never fetched with npx: local-only, per the brief.

  const pyArgs = [
    "scripts/harness/visual_qa.py",
    "--captures", framesDir,
    "--out", outDir,
    "--overflow-json", overflowPath,
  ];
  if (opts.baseline) {
    pyArgs.push("--baseline", opts.baseline);
  }
  const result = spawnSync("python", pyArgs, { stdio: "inherit" });
  if (result.error) {
    console.error(`visual-qa: failed to run python: ${result.error.message}`);
    return 1;
  }
  return result.status ?? 1;
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--selftest")) {
    return selftest();
  }
  const opts = parseArgs(argv);
  if (!opts.baseUrl || !opts.routes || !opts.widths || !opts.out) {
    console.error(
      'usage: node scripts/harness/visual-qa.mjs --base-url URL --routes "/,/about" ' +
        '--widths "390,1440" --out DIR [--baseline DIR] [--frames 6]',
    );
    return 2;
  }
  return capture(opts);
}

process.exit(await main());
