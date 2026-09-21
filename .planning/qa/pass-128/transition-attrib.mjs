// Scratch diagnostic (Pass-128 evidence phase): WHICH elements/properties
// fire transitionrun/transitioncancel during the top-to-Audit scroll, and
// how many times. The devtools trace's EventDispatch records (used by
// scroll-probe.mjs --trace) carry only {type}, no target/property, so this
// is a separate instrument to get that attribution. Not part of the
// deliverable probe; a receipt for the W1/R1 hypotheses in FINDINGS.md.
//
// Method: same manual touchStart/touchMove*/touchEnd gesture sequence as
// scroll-probe.mjs (see that file's GESTURE MECHANISM SUBSTITUTION note),
// same viewport/cpu throttle, same live URL. Listens for transitionrun,
// transitionstart, transitioncancel, transitionend at the document level
// (capture: true) and records {target selector-ish, propertyName, elapsed}
// for every one. Measures the LIVE site only.
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

const targetSel = await page.evaluate(() => {
  const sections = Array.from(document.querySelectorAll("section[data-world]"));
  const match = sections.find((el) => el.textContent && el.textContent.includes("The Audit"));
  if (!match) return null;
  match.setAttribute("data-scroll-probe-target", "1");
  return true;
});
if (!targetSel) {
  console.error("target section not found");
  await browser.close();
  process.exit(2);
}

await page.evaluate(() => {
  const log = [];
  window.__transLog = log;
  const t0 = performance.now();
  function describe(el) {
    if (!el || !el.nodeType) return "?";
    const tag = el.tagName ? el.tagName.toLowerCase() : "?";
    const cls = el.className && typeof el.className === "string" ? "." + el.className.split(" ").join(".") : "";
    const id = el.id ? "#" + el.id : "";
    return tag + id + cls;
  }
  for (const type of ["transitionrun", "transitionstart", "transitioncancel", "transitionend"]) {
    document.addEventListener(
      type,
      (e) => {
        log.push({
          t: Math.round(performance.now() - t0),
          type,
          prop: e.propertyName,
          target: describe(e.target),
        });
      },
      { capture: true },
    );
  }
});

let dist;
let count = 0;
const start = await page.evaluate(() => performance.now());
while (count < 60) {
  const info = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { found: false };
    return { found: true, top: el.getBoundingClientRect().top };
  }, '[data-scroll-probe-target="1"]');
  if (!info.found) break;
  if (info.top <= 0) break;
  dist = Math.max(50, Math.min(info.top, 1600));
  await touchSwipe(session, dist);
  await sleep(SETTLE_MS);
  count += 1;
}
await sleep(1000);

const log = await page.evaluate(() => window.__transLog);

// Summarize by (type, target, prop)
const byKey = new Map();
for (const e of log) {
  const key = `${e.type} | ${e.target} | ${e.prop}`;
  byKey.set(key, (byKey.get(key) || 0) + 1);
}
const sorted = [...byKey.entries()].sort((a, b) => b[1] - a[1]);
console.log(`TOTAL EVENTS: ${log.length}`);
console.log(`gestures used: ${count}`);
console.log("--- top (type | target | property) counts ---");
for (const [k, v] of sorted.slice(0, 40)) console.log(v, k);

// Also: unique targets that ever got a transitioncancel, with counts
const cancelTargets = new Map();
for (const e of log) {
  if (e.type !== "transitioncancel") continue;
  const key = `${e.target} | ${e.prop}`;
  cancelTargets.set(key, (cancelTargets.get(key) || 0) + 1);
}
console.log("--- transitioncancel by (target | property) ---");
for (const [k, v] of [...cancelTargets.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(v, k);
}

await session.detach().catch(() => {});
await browser.close();
