import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "https://www.micahjonesconsulting.com/";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
await page.goto(URL, { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1000));
await page.addStyleTag({ path: "exp-T2-fixed.css" });
await new Promise((r) => setTimeout(r, 200));
await page.evaluate(() => window.scrollTo(0, 400));
await new Promise((r) => setTimeout(r, 500));
const info = await page.evaluate(() => {
  function cs(sel) {
    const el = document.querySelector(sel);
    if (!el) return null;
    const c = getComputedStyle(el);
    return { cls: el.className, transitionProperty: c.transitionProperty, transitionDuration: c.transitionDuration };
  }
  return { mlink: cs(".cw-mlink"), sectionCta: cs(".cw-section-cta"), nav: cs(".cw-nav"), exitsCo: cs(".cw-exits__co") };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
