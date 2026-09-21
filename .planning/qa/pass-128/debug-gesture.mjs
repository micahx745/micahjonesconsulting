// Scratch diagnostic (Pass-128 evidence phase): why doesn't the touch
// gesture move the page? Not part of the deliverable probe.
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
const session = await page.createCDPSession();
await page.goto("https://www.micahjonesconsulting.com/", { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1500));

const before = await page.evaluate(() => ({
  scrollY: window.scrollY,
  bodyH: document.body.scrollHeight,
  docScrollingElement: document.scrollingElement && document.scrollingElement.tagName,
  hasLenisEl: !!document.querySelector(".lenis, [data-lenis], html.lenis"),
  htmlClass: document.documentElement.className,
}));
console.log("BEFORE", JSON.stringify(before));

let gestureError = null;
try {
  await session.send("Input.synthesizeScrollGesture", {
    x: 195,
    y: 650,
    xDistance: 0,
    yDistance: -800,
    gestureSourceType: "touch",
    speed: 1200,
  });
} catch (err) {
  gestureError = String(err);
}
await new Promise((r) => setTimeout(r, 500));

const after = await page.evaluate(() => ({ scrollY: window.scrollY }));
console.log("AFTER", JSON.stringify(after), "gestureError=", gestureError);

// Try mouse-sourced gesture too for comparison.
let gestureError2 = null;
try {
  await session.send("Input.synthesizeScrollGesture", {
    x: 195,
    y: 650,
    xDistance: 0,
    yDistance: -800,
    gestureSourceType: "mouse",
    speed: 1200,
  });
} catch (err) {
  gestureError2 = String(err);
}
await new Promise((r) => setTimeout(r, 500));
const after2 = await page.evaluate(() => ({ scrollY: window.scrollY }));
console.log("AFTER-MOUSE", JSON.stringify(after2), "gestureError2=", gestureError2);

await browser.close();
