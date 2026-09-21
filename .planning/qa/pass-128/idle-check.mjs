// Scratch diagnostic (Pass-128 evidence phase): does the transitionrun/
// transitioncancel storm on .cw-mlink/.cw-section-cta (found in
// transition-attrib.mjs) happen even with ZERO scrolling -- i.e. is it a
// background/idle loop, or genuinely scroll-driven? No touch dispatch in
// this script at all; page is left completely alone after load. Live
// site only, read-only.
import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core").default ?? require("puppeteer-core");

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
await page.goto("https://www.micahjonesconsulting.com/", { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1000));

await page.evaluate(() => {
  const log = [];
  window.__log = log;
  const t0 = performance.now();
  for (const type of ["transitionrun", "transitionstart", "transitioncancel", "transitionend"]) {
    document.addEventListener(type, (e) => {
      log.push({ t: Math.round(performance.now() - t0), type, target: e.target.className || e.target.tagName });
    }, { capture: true });
  }
});

await new Promise((r) => setTimeout(r, 4000)); // sit idle, no scroll, no input

const log = await page.evaluate(() => window.__log);
console.log("IDLE (no scroll) 4s window -- total transition events:", log.length);
for (const e of log.slice(0, 50)) console.log(" ", e.t, e.type, e.target);

await browser.close();
