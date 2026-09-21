// Scratch diagnostic (Pass-128 evidence phase): how many times does the
// [data-mode="cw"] wrapper's style attribute actually get touched during
// the top-to-Audit scroll -- raw MutationObserver record count, NOT
// de-duplicated by --cw-bg value (scroll-probe.mjs's recorder dedupes by
// value and reports worldSwitchCount=2; this checks whether setWorld() /
// style.setProperty is being CALLED far more often than the 2 visible
// colour changes, which would explain the transitionrun/transitioncancel
// storm found in transition-attrib.mjs on inherited `color`).
// Not part of the deliverable probe. Live site only.
import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core").default ?? require("puppeteer-core");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "https://www.micahjonesconsulting.com/";
const GX = 195, GY = 650, SPEED = 1200;
const STEP_MS = 16;
const STEP_PX = (SPEED * STEP_MS) / 1000;
const SETTLE_MS = 350;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function touchSwipe(session, distancePx) {
  let y = GY;
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: GX, y, radiusX: 5, radiusY: 5, force: 1 }],
  });
  await sleep(STEP_MS);
  let traveled = 0;
  while (traveled < distancePx) {
    const step = Math.min(STEP_PX, distancePx - traveled);
    y -= step;
    traveled += step;
    await session.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: GX, y, radiusX: 5, radiusY: 5, force: 1 }],
    });
    await sleep(STEP_MS);
  }
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
const session = await page.createCDPSession();
await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await session.send("Network.enable");
await session.send("Network.setCacheDisabled", { cacheDisabled: true });

await page.goto(URL, { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await sleep(1500);

await page.evaluate(() => {
  const sections = Array.from(document.querySelectorAll("section[data-world]"));
  const match = sections.find((el) => el.textContent && el.textContent.includes("The Audit"));
  match.setAttribute("data-scroll-probe-target", "1");
});

await page.evaluate(() => {
  const root = document.querySelector('[data-mode="cw"]');
  const t0 = performance.now();
  const log = [];
  window.__wwLog = log;
  let innerHeightSamples = [];
  let lastIH = window.innerHeight;
  const ihTimer = setInterval(() => {
    if (window.innerHeight !== lastIH) {
      innerHeightSamples.push({ t: Math.round(performance.now() - t0), from: lastIH, to: window.innerHeight });
      lastIH = window.innerHeight;
    }
  }, 50);
  window.__ihSamples = innerHeightSamples;
  window.__stopIhTimer = () => clearInterval(ihTimer);

  const mo = new MutationObserver((records) => {
    const bg = getComputedStyle(root).getPropertyValue("--cw-bg").trim();
    for (const r of records) {
      log.push({ t: Math.round(performance.now() - t0), bg });
    }
  });
  mo.observe(root, { attributes: true, attributeFilter: ["style"] });
  window.__stopMo = () => mo.disconnect();

  // Also count raw IntersectionObserver callback INVOCATIONS system-wide by
  // wrapping the native constructor (still no repo edit -- this patches the
  // live page's runtime in our own page.evaluate, not the source).
  const NativeIO = window.IntersectionObserver;
  let ioCallbackCount = 0;
  window.__ioCounts = [];
  window.IntersectionObserver = function (cb, opts) {
    const wrapped = (entries, obs) => {
      ioCallbackCount += 1;
      window.__ioCounts.push({ t: Math.round(performance.now() - t0), n: entries.length, rootMargin: opts && opts.rootMargin });
      return cb(entries, obs);
    };
    return new NativeIO(wrapped, opts);
  };
  window.IntersectionObserver.prototype = NativeIO.prototype;
});

let count = 0;
while (count < 60) {
  const info = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { found: false };
    return { found: true, top: el.getBoundingClientRect().top };
  }, '[data-scroll-probe-target="1"]');
  if (!info.found) break;
  if (info.top <= 0) break;
  const dist = Math.max(50, Math.min(info.top, 1600));
  await touchSwipe(session, dist);
  await sleep(SETTLE_MS);
  count += 1;
}
await sleep(1000);

const result = await page.evaluate(() => {
  window.__stopMo();
  window.__stopIhTimer();
  return {
    styleWriteLog: window.__wwLog,
    innerHeightSamples: window.__ihSamples,
    ioCounts: window.__ioCounts,
  };
});

console.log("gestures:", count);
console.log("raw style-attribute mutation records on [data-mode=cw]:", result.styleWriteLog.length);
console.log("distinct --cw-bg values seen in those records:", new Set(result.styleWriteLog.map((r) => r.bg)).size);
console.log("first 30 style writes (t ms, bg):");
for (const r of result.styleWriteLog.slice(0, 30)) console.log(" ", r.t, r.bg);
console.log("window.innerHeight change samples (mobile URL-bar collapse signal):", result.innerHeightSamples.length);
for (const s of result.innerHeightSamples.slice(0, 20)) console.log(" ", s);
console.log("IntersectionObserver instances created & their callback firing counts:");
const byMargin = new Map();
for (const c of result.ioCounts) {
  const key = c.rootMargin || "(default)";
  byMargin.set(key, (byMargin.get(key) || 0) + 1);
}
for (const [k, v] of byMargin.entries()) console.log(" ", k, "->", v, "callback invocations");

await session.detach().catch(() => {});
await browser.close();
