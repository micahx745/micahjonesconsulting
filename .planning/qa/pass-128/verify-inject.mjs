// Pass-128 T2 sanity check: does exp-T2.css's injected !important rule
// actually win the cascade on the live page for the listed selectors, or is
// it being overridden/no-oped? EVIDENCE ONLY, live site only.
import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "https://www.micahjonesconsulting.com/";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
await page.goto(URL, { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1000));

function report(label) {
  return page.evaluate((label) => {
    const out = { label };
    const mlink = document.querySelector(".cw-mlink");
    if (mlink) {
      const cs = getComputedStyle(mlink);
      out.mlink = {
        tag: mlink.tagName,
        cls: mlink.className,
        transitionProperty: cs.transitionProperty,
        transitionDuration: cs.transitionDuration,
        transitionTimingFunction: cs.transitionTimingFunction,
      };
    } else {
      out.mlink = null;
    }
    const secCta = document.querySelector(".cw-section-cta");
    if (secCta) {
      const cs = getComputedStyle(secCta);
      out.sectionCta = {
        transitionProperty: cs.transitionProperty,
        transitionDuration: cs.transitionDuration,
      };
    }
    const nav = document.querySelector(".cw-nav");
    if (nav) {
      const cs = getComputedStyle(nav);
      out.nav = {
        cls: nav.className,
        transitionProperty: cs.transitionProperty,
        transitionDuration: cs.transitionDuration,
      };
    }
    const exitsCo = document.querySelector(".cw-exits__co");
    if (exitsCo) {
      const cs = getComputedStyle(exitsCo);
      out.exitsCo = { transitionProperty: cs.transitionProperty, transitionDuration: cs.transitionDuration };
    }
    return out;
  }, label);
}

const before = await report("before-inject");
await page.addStyleTag({ path: "exp-T2.css" });
await new Promise((r) => setTimeout(r, 100));
const after = await report("after-inject");

// Also scroll a bit so nav picks up is-scrolled, and re-check nav specifically.
await page.evaluate(() => window.scrollTo(0, 400));
await new Promise((r) => setTimeout(r, 500));
const afterScroll = await report("after-inject-scrolled");

console.log(JSON.stringify({ before, after, afterScroll }, null, 2));
await browser.close();
