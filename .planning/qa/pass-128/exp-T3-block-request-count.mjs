// exp-T3-block-request-count.mjs -- Pass-128, experiment T3 scratch diagnostic.
// EVIDENCE ONLY. Live site only. Counts how many times the browser actually
// tries to fetch a URL matching --block SUBSTRING during one full
// load+scroll+settle cycle (same gesture mechanism/timings as scroll-probe.mjs),
// to check whether blocking the chunk triggers a request-retry storm (as
// opposed to a compute-only retry loop that never re-requests the network).
import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "https://www.micahjonesconsulting.com/";
const BLOCK = process.argv[2] || "14u.~01e7g0-p";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const GESTURE_X = 195, GESTURE_Y = 650, GESTURE_SPEED = 1200;
const GESTURE_STEP_MS = 16;
const GESTURE_STEP_PX = (GESTURE_SPEED * GESTURE_STEP_MS) / 1000;

async function touchSwipe(session, distancePx) {
  let y = GESTURE_Y;
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: GESTURE_X, y, radiusX: 5, radiusY: 5, force: 1 }] });
  await sleep(GESTURE_STEP_MS);
  let traveled = 0;
  while (traveled < distancePx) {
    const step = Math.min(1600, distancePx - traveled);
    y -= step; traveled += step;
    await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: GESTURE_X, y, radiusX: 5, radiusY: 5, force: 1 }] });
    await sleep(GESTURE_STEP_MS);
  }
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
try {
  const page = await browser.newPage();
  const consoleErrors = [];
  const consoleMsgs = [];
  page.on("pageerror", (e) => consoleErrors.push(String(e)));
  page.on("console", (m) => consoleMsgs.push(`${m.type()}: ${m.text()}`));
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  const session = await page.createCDPSession();
  await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await session.send("Network.enable");
  await session.send("Network.setCacheDisabled", { cacheDisabled: true });

  let matchCount = 0;
  const matchedUrls = [];
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = req.url();
    if (url.includes(BLOCK)) {
      matchCount++;
      matchedUrls.push(url);
      req.abort().catch(() => {});
    } else {
      req.continue().catch(() => {});
    }
  });

  const t0 = Date.now();
  await page.goto(URL, { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await sleep(1500);
  const afterLoadCount = matchCount;

  const target = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll("section[data-world]"));
    const m = sections.find((el) => el.textContent && el.textContent.includes("The Audit"));
    if (!m) return null;
    m.setAttribute("data-t3-target", "1");
    return true;
  });

  let swipes = 0;
  const maxSwipes = 30;
  while (swipes < maxSwipes) {
    const info = await page.evaluate(() => {
      const el = document.querySelector('[data-t3-target="1"]');
      if (!el) return { found: false };
      return { found: true, top: el.getBoundingClientRect().top };
    });
    if (!info.found || info.top <= 0) break;
    const distance = Math.max(50, Math.min(info.top, 1600));
    await touchSwipe(session, distance);
    await sleep(350);
    swipes++;
  }
  await sleep(1000);
  const wallMs = Date.now() - t0;

  console.log(JSON.stringify({
    block: BLOCK,
    wallMs,
    swipes,
    matchCountAfterLoad: afterLoadCount,
    matchCountTotal: matchCount,
    matchedUrls: [...new Set(matchedUrls)],
    consoleErrorCount: consoleErrors.length,
    consoleErrors,
    consoleMsgCount: consoleMsgs.length,
    consoleMsgsSample: consoleMsgs.slice(0, 30),
  }, null, 2));
} finally {
  await browser.close().catch(() => {});
}
