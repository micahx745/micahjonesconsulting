// .planning/exec/verify-pass122-fix.mjs — Pass-122 ship-gate fix verification.
//
// Executor task verify script: puppeteer-core (via createRequire against
// C:/tmp/p101tools/package.json) driving a real Chrome, headless, no
// --disable-gpu. Checks the four fixes on /work at 390x844 (DPR 2, mobile)
// and 1440x900: no blank poster slot, the halved opening gap, the one-line
// "five to ten." poster, and the featured link's accessible name.
//
// Usage: node .planning/exec/verify-pass122-fix.mjs

import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");

const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE_URL = "http://localhost:3236";
const OUT_DIR = path.resolve(
  "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/qa/pass-122/work/fix",
);
mkdirSync(OUT_DIR, { recursive: true });

const report = { viewports: {}, errors: [] };

function sh(v) {
  return Math.round(v * 100) / 100;
}

async function installClsObserver(page) {
  await page.evaluateOnNewDocument(() => {
    window.__clsSum = 0;
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__clsSum += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    } catch {
      window.__clsSum = null; // unsupported
    }
  });
}

async function getWorkFiguresGeometry(page) {
  return page.evaluate(() => {
    const nums = Array.from(document.querySelectorAll(".cw-wx-num"));
    const info = nums.map((el, i) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        i,
        classes: el.className,
        top: r.top,
        bottom: r.bottom,
        left: r.left,
        width: r.width,
        height: r.height,
        opacity: cs.opacity,
        wght: cs.fontVariationSettings,
        text: el.textContent,
      };
    });
    return info;
  });
}

async function scrollWidthAndErrors(page) {
  return page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
}

async function capture(page, label, extra = {}) {
  const file = path.join(OUT_DIR, `${label}.png`);
  await page.screenshot({ path: file });
  const geom = await getWorkFiguresGeometry(page);
  const sw = await scrollWidthAndErrors(page);
  const scrollY = await page.evaluate(() => window.scrollY);
  const frame = { label, file, scrollY, ...sw, nums: geom, ...extra };
  return frame;
}

async function runViewport(browser, { name, width, height, deviceScaleFactor, isMobile }) {
  const page = await browser.newPage();
  const pageErrors = [];
  const badResponses = [];
  page.on("pageerror", (err) => pageErrors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") pageErrors.push(`console.error: ${msg.text()}`);
  });
  page.on("response", (res) => {
    const url = res.url();
    if (res.status() >= 400 && !url.includes("/_vercel")) {
      badResponses.push(`${res.status()} ${url}`);
    }
  });
  await installClsObserver(page);
  await page.setViewport({ width, height, deviceScaleFactor, isMobile, hasTouch: isMobile });

  await page.goto(`${BASE_URL}/work`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 400));

  const frames = [];
  frames.push(await capture(page, `${name}-scroll0`));

  // Locate the content-engine (3rd cw-wx-num, index 2) and birth-worker
  // (the .cw-wx-num--words poster, last) figures to bound the traversal.
  const bounds = await page.evaluate(() => {
    const nums = Array.from(document.querySelectorAll(".cw-wx-num"));
    const contentEngine = nums[2];
    const birthWorker = document.querySelector(".cw-wx-num--words");
    const ceTop = contentEngine.getBoundingClientRect().top + window.scrollY;
    const bwBottom = birthWorker.getBoundingClientRect().bottom + window.scrollY;
    return { ceTop, bwBottom };
  });

  const vh = height;
  const startY = Math.max(0, bounds.ceTop - vh * 0.5);
  const endY = bounds.bwBottom + vh * 0.5;
  const step = vh * 0.25;

  // Scroll to just above the start first (fast), then slow-scroll the region
  // of interest with page.mouse.wheel so the IntersectionObserver fires the
  // same way a real scroll would.
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, startY - vh * 0.5));
  await new Promise((r) => setTimeout(r, 200));

  let lastCheckpoint = await page.evaluate(() => window.scrollY);
  let nextCheckpoint = lastCheckpoint + step;
  let stopIndex = 0;
  let guard = 0;
  while (true) {
    await page.mouse.wheel({ deltaY: 120 });
    await new Promise((r) => setTimeout(r, 120));
    const y = await page.evaluate(() => window.scrollY);
    if (y >= nextCheckpoint || y >= endY) {
      frames.push(await capture(page, `${name}-step-${stopIndex}`));
      stopIndex += 1;
      nextCheckpoint = y + step;
    }
    guard += 1;
    if (y >= endY || guard > 400) break;
  }
  // One final settle capture after the last wheel tick + backstop.
  await new Promise((r) => setTimeout(r, 900));
  frames.push(await capture(page, `${name}-final`));

  const clsSum = await page.evaluate(() => window.__clsSum);

  // Birth-worker poster measurement (settled state).
  const bwMeasure = await page.evaluate(() => {
    const el = document.querySelector(".cw-wx-num--words");
    const r = el.getBoundingClientRect();
    return {
      lines: el.getClientRects().length,
      rect: { top: r.top, left: r.left, width: r.width, height: r.height },
      text: el.textContent,
      classes: el.className,
      fontSize: getComputedStyle(el).fontSize,
    };
  });

  // Featured link accessible name.
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 200));
  const feat = await page.evaluate(() => {
    const el = document.querySelector(".cw-wx-feat");
    return {
      ariaLabel: el.getAttribute("aria-label"),
      visibleText: el.textContent.trim(),
    };
  });

  await page.close();

  return {
    name,
    width,
    height,
    deviceScaleFactor,
    frames: frames.map((f) => ({
      label: f.label,
      scrollY: sh(f.scrollY),
      scrollWidth: f.scrollWidth,
      clientWidth: f.clientWidth,
      nums: f.nums.map((n) => ({
        i: n.i,
        classes: n.classes,
        opacity: n.opacity,
        wght: n.wght,
        top: sh(n.top),
        bottom: sh(n.bottom),
        emptyLooking: n.opacity === "0",
      })),
    })),
    clsSum,
    birthWorker: bwMeasure,
    featured: feat,
    pageErrors,
    badResponses,
  };
}

async function reducedMotionAndNoJs() {
  const out = {};
  {
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: [],
    });
    const page = await browser.newPage();
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}/work`, { waitUntil: "networkidle0" });
    const bwTop = await page.evaluate(() => {
      const el = document.querySelector(".cw-wx-num--words");
      return el.getBoundingClientRect().top + window.scrollY;
    });
    await page.evaluate((y) => window.scrollTo(0, y - 300), bwTop);
    await new Promise((r) => setTimeout(r, 300));
    await page.screenshot({ path: path.join(OUT_DIR, "390-reduced-motion-birthworker.png") });
    const state = await page.evaluate(() => {
      const el = document.querySelector(".cw-wx-num--words");
      const cs = getComputedStyle(el);
      return { opacity: cs.opacity, wght: cs.fontVariationSettings, classes: el.className };
    });
    out.reducedMotion = state;
    await browser.close();
  }
  {
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: [],
    });
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}/work`, { waitUntil: "networkidle0" });
    const bwTop = await page.evaluate(() => {
      const el = document.querySelector(".cw-wx-num--words");
      return el.getBoundingClientRect().top + window.scrollY;
    });
    await page.evaluate((y) => window.scrollTo(0, y - 300), bwTop);
    await new Promise((r) => setTimeout(r, 300));
    await page.screenshot({ path: path.join(OUT_DIR, "390-nojs-birthworker.png") });
    const state = await page.evaluate(() => {
      const el = document.querySelector(".cw-wx-num--words");
      const cs = getComputedStyle(el);
      return { opacity: cs.opacity, wght: cs.fontVariationSettings, classes: el.className };
    });
    out.noJs = state;
    await browser.close();
  }
  return out;
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [],
  });

  report.viewports.m390 = await runViewport(browser, {
    name: "390",
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
  });
  report.viewports.d1440 = await runViewport(browser, {
    name: "1440",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    isMobile: false,
  });

  await browser.close();

  report.extra = await reducedMotionAndNoJs();

  writeFileSync(
    path.join(OUT_DIR, "report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
