// .planning/exec/dimsettle120.mjs
// Pass-120 judge evidence for brief §3 open item 2: arriving through the 900ms foyer-to-theater dim,
// is the 600ms settle visible or veiled? Loads /work at 1440x900 (motion on), clicks the lead entry's
// study link (a client navigation through ViewTransitionLink), and records CDP screencast frames with
// timestamps for 1800ms after the click. Writes frames to .planning/qa/pass-120/build/dim/ as
// dim-<ms>.png (ms after the click) and prints one line per frame plus whether the navigation stayed
// inside one document. Evidence only; no pass/fail.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");
const BASE = process.argv[2] || "http://localhost:3200";
const OUT = ".planning/qa/pass-120/build/dim";
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.goto(`${BASE}/work`, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 1500));
  await page.evaluate(() => { window.__docMark = "same-document"; });

  const href = await page.evaluate(() => {
    const a = [...document.querySelectorAll('main a[href^="/work/"]')][0];
    return a ? a.getAttribute("href") : null;
  });
  if (!href) throw new Error("no study link on /work");
  console.log(`clicking ${href}`);

  const cdp = await page.createCDPSession();
  const frames = [];
  let t0 = 0;
  cdp.on("Page.screencastFrame", async (f) => {
    frames.push({ ms: Math.round(performance.now() - t0), data: f.data });
    await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
  await new Promise((r) => setTimeout(r, 200));
  t0 = performance.now();
  await page.click(`main a[href="${href}"]`);
  await new Promise((r) => setTimeout(r, 1800));
  await cdp.send("Page.stopScreencast");

  const mark = await page.evaluate(() => window.__docMark || "new-document");
  const path = await page.evaluate(() => location.pathname);
  console.log(`landed on ${path}; navigation was ${mark}; frames ${frames.length}`);
  for (const f of frames) {
    const name = `dim-${String(f.ms).padStart(4, "0")}.png`;
    writeFileSync(`${OUT}/${name}`, Buffer.from(f.data, "base64"));
    console.log(name);
  }
} finally {
  await browser.close();
}
