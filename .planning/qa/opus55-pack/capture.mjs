// Viewport-frame capture of the LIVE site for the Opus 5.5 web-chat review.
// Brief: .claude/briefs/opus55-pack-captures.md. Writes frames/ and
// manifest.json next to this file. Changes nothing in the site's source.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const BASE_URL = "https://www.micahjonesconsulting.com";

const ROUTES = [
  "/",
  "/about",
  "/work",
  "/services",
  "/packages",
  "/contact",
  "/call",
  "/work/guardicore",
  "/work/rfp-engine",
  "/work/ordani",
  "/work/content-engine",
  "/work/birth-worker",
];

const WIDTHS = [
  { name: "phone", width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: "desktop", width: 1440, height: 900 },
];

const MAX_FRAMES = 30;

const PACK_DIR = dirname(fileURLToPath(import.meta.url));
const FRAMES_DIR = join(PACK_DIR, "frames");

const slug = (route) =>
  route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");

// Same resolution as scripts/harness/visual-qa.mjs loadChromium(): import
// index.js from PLAYWRIGHT_PATH. Never install anything.
async function loadChromium() {
  const entry = pathToFileURL(join(process.env.PLAYWRIGHT_PATH, "index.js")).href;
  const mod = await import(entry);
  return mod.chromium ?? mod.default?.chromium ?? null;
}

async function main() {
  const chromium = await loadChromium();
  if (!chromium) throw new Error("playwright not found via PLAYWRIGHT_PATH");
  await mkdir(FRAMES_DIR, { recursive: true });

  const browser = await chromium.launch();
  const manifest = [];

  for (const route of ROUTES) {
    for (const w of WIDTHS) {
      const context = await browser.newContext({
        viewport: { width: w.width, height: w.height },
        deviceScaleFactor: 1,
        isMobile: w.isMobile ?? false,
        hasTouch: w.hasTouch ?? false,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      let status = 0;
      let H = 0;
      let frameCount = 0;
      try {
        const response = await page.goto(BASE_URL + route, {
          waitUntil: "networkidle",
          timeout: 60_000,
        });
        status = response ? response.status() : 0;
        await page.waitForTimeout(1500);
        H = await page.evaluate(() => document.documentElement.scrollHeight);
        const V = w.height;
        const ys = [];
        for (let y = 0; y < H - V; y += V) ys.push(y);
        ys.push(H - V);
        const capped = ys.slice(0, MAX_FRAMES);
        for (let i = 0; i < capped.length; i++) {
          const name = `${slug(route)}-${w.width}-${String(i + 1).padStart(2, "0")}.png`;
          await page.evaluate((yy) => window.scrollTo(0, yy), capped[i]);
          await page.waitForTimeout(400);
          await page.screenshot({
            path: join(FRAMES_DIR, name),
            fullPage: false,
          });
          frameCount++;
        }
      } catch (err) {
        console.error(`error: ${route} ${w.name}: ${err?.message ?? err}`);
      }
      console.log(`${route} ${w.width} status=${status} H=${H} frames=${frameCount}`);
      manifest.push({
        route,
        slug: slug(route),
        width: w.width,
        status,
        H,
        frames: frameCount,
      });
      await context.close();
    }
  }

  await browser.close();
  await writeFile(
    join(PACK_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8",
  );
  const bad = manifest.filter((e) => e.status !== 200 || e.frames === 0);
  if (bad.length > 0) {
    console.error(`failing entries: ${JSON.stringify(bad)}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
