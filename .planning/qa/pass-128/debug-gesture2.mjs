// Scratch diagnostic (Pass-128 evidence phase), round 2.
import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core").default ?? require("puppeteer-core");

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const version = await browser.version();
console.log("BROWSER VERSION", version);
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
const session = await page.createCDPSession();
await page.goto("https://www.micahjonesconsulting.com/", { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1500));

const dom = await page.evaluate(() => {
  const html = document.documentElement;
  const body = document.body;
  const cwWrapper = document.querySelector('[data-mode="cw"]');
  const style = (el) => el ? getComputedStyle(el) : null;
  return {
    htmlTouchAction: style(html) && style(html).touchAction,
    bodyTouchAction: style(body) && style(body).touchAction,
    htmlOverflowY: style(html) && style(html).overflowY,
    bodyOverflowY: style(body) && style(body).overflowY,
    cwWrapperTag: cwWrapper && cwWrapper.tagName,
    cwWrapperTouchAction: cwWrapper && style(cwWrapper).touchAction,
    cwWrapperOverflowY: cwWrapper && style(cwWrapper).overflowY,
    cwWrapperTransform: cwWrapper && style(cwWrapper).transform,
    lenisWrapperFound: !!document.querySelector(".lenis-content, [data-lenis-content]"),
    scrollingElement: document.scrollingElement && document.scrollingElement.tagName,
  };
});
console.log("DOM", JSON.stringify(dom, null, 2));

// Install a raw touch listener count before firing synthesized events.
await page.evaluate(() => {
  window.__touchLog = [];
  for (const type of ["touchstart", "touchmove", "touchend", "touchcancel"]) {
    window.addEventListener(type, (e) => {
      window.__touchLog.push({ type, cancelable: e.cancelable, defaultPrevented: e.defaultPrevented, t: performance.now() });
    }, { passive: true, capture: true });
  }
  window.__scrollEvents = 0;
  window.addEventListener("scroll", () => { window.__scrollEvents++; }, { passive: true });
});

// Try manual low-level touch dispatch: touchStart, several touchMove steps, touchEnd.
const startX = 195, startY = 650;
async function dispatchTouch(type, x, y) {
  await session.send("Input.dispatchTouchEvent", {
    type,
    touchPoints: type === "touchEnd" ? [] : [{ x, y, radiusX: 5, radiusY: 5, force: 1 }],
  });
}

await dispatchTouch("touchStart", startX, startY);
await new Promise((r) => setTimeout(r, 16));
let y = startY;
for (let i = 0; i < 20; i++) {
  y -= 15;
  await dispatchTouch("touchMove", startX, y);
  await new Promise((r) => setTimeout(r, 16));
}
await dispatchTouch("touchEnd", startX, y);
await new Promise((r) => setTimeout(r, 500));

const after = await page.evaluate(() => ({
  scrollY: window.scrollY,
  touchLog: window.__touchLog,
  scrollEvents: window.__scrollEvents,
}));
console.log("MANUAL-TOUCH-DISPATCH scrollY=", after.scrollY, "scrollEvents=", after.scrollEvents);
console.log("touchLog sample:", JSON.stringify(after.touchLog.slice(0, 6)));

await browser.close();
