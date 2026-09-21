// exp-T2-probe.mjs -- Pass-128, experiment T2 (colour-switch-glitchy claim).
// EVIDENCE ONLY. Measures the LIVE site only. Does not read or write
// anything under app/, components/, lib/, content/, public/, or scripts/.
//
// This is transition-attrib.mjs (same folder, the root-cause instrument
// named in the T2 task text, baseline 868 events / 132 transitionrun +
// 126 transitioncancel on a.cw-mlink) with two additions, mirroring exactly
// how exp-T1-probe.mjs extended word-timing-probe.mjs for T1:
//   1. --runs N / --out PREFIX: loop N fresh-browser runs, write each run's
//      full event log to <PREFIX>.run<N>.json, print a one-line summary.
//   2. --inject-css FILE: applies a stylesheet via page.addStyleTag() right
//      after page load, before the scroll-to-target gesture begins -- same
//      call, same point in the sequence as scroll-probe.mjs's own
//      --inject-css and exp-T1-probe.mjs's --inject-css.
// Everything else -- gesture mechanism (manual touchStart/touchMove-steps/
// touchEnd, per calibration.txt's disclosed deviation from the literal
// synthesizeScrollGesture spec), viewport, cpu throttle, target-detection
// (first section[data-world] whose text includes "The Audit"), and the
// transitionrun/transitionstart/transitioncancel/transitionend capture-phase
// listeners -- is unchanged from transition-attrib.mjs, not reimplemented.
//
// Usage: node exp-T2-probe.mjs [--runs N] [--out OUT_PREFIX] [--cpu N]
//   [--inject-css FILE]

import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "https://www.micahjonesconsulting.com/";
const GX = 195, GY = 650, SPEED = 1200;
const STEP_MS = 16;
const STEP_PX = (SPEED * STEP_MS) / 1000;
const SETTLE_MS = 350;

// Same "listed elements" the T2 claim names as the two independently-found
// bug instances sharing the root-crossfade-inheritance mechanism.
const LISTED_SUBSTRINGS = [
  "cw-nav", // paired with is-scrolled below; nav is only relevant when scrolled
  "cw-mlink",
  "cw-section-cta",
  "cw-offer__packages-link",
  "cw-exits__co",
  "cw-exits__val",
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isListedTarget(target) {
  if (target.includes("cw-nav")) return target.includes("is-scrolled");
  return LISTED_SUBSTRINGS.slice(1).some((s) => target.includes(s));
}

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

async function runOnce(runIndex, outPrefix, cpuRate, injectCssPath) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const consoleErrors = [];
  try {
    const page = await browser.newPage();
    page.on("pageerror", (err) => consoleErrors.push(String(err)));

    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    const session = await page.createCDPSession();
    await session.send("Emulation.setCPUThrottlingRate", { rate: cpuRate });
    await session.send("Network.enable");
    await session.send("Network.setCacheDisabled", { cacheDisabled: true });

    await page.goto(URL, { waitUntil: "load", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await sleep(1500);

    if (injectCssPath) {
      // Same insertion point as scroll-probe.mjs / exp-T1-probe.mjs: after
      // load + liveness wait, before the scroll gesture begins.
      await page.addStyleTag({ path: injectCssPath });
    }

    const targetFound = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll("section[data-world]"));
      const match = sections.find((el) => el.textContent && el.textContent.includes("The Audit"));
      if (!match) return false;
      match.setAttribute("data-scroll-probe-target", "1");
      return true;
    });
    if (!targetFound) {
      throw new Error("target section not found (run " + runIndex + ")");
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

    const byKey = new Map();
    for (const e of log) {
      const key = `${e.type} | ${e.target} | ${e.prop}`;
      byKey.set(key, (byKey.get(key) || 0) + 1);
    }
    const sorted = [...byKey.entries()].sort((a, b) => b[1] - a[1]);

    const cancelTargets = new Map();
    for (const e of log) {
      if (e.type !== "transitioncancel") continue;
      const key = `${e.target} | ${e.prop}`;
      cancelTargets.set(key, (cancelTargets.get(key) || 0) + 1);
    }

    const listedRunPlusCancel = log.filter(
      (e) => (e.type === "transitionrun" || e.type === "transitioncancel") && isListedTarget(e.target),
    ).length;
    const listedCancelOnly = log.filter((e) => e.type === "transitioncancel" && isListedTarget(e.target)).length;
    const mlinkCancelOnly = log.filter((e) => e.type === "transitioncancel" && e.target.includes("cw-mlink")).length;

    const result = {
      run: runIndex,
      url: URL,
      cpu: cpuRate,
      injectCss: injectCssPath || null,
      gesturesUsed: count,
      consoleErrors,
      totalEvents: log.length,
      listedRunPlusCancel,
      listedCancelOnly,
      mlinkCancelOnly,
      topCounts: sorted.slice(0, 40),
      cancelTargets: [...cancelTargets.entries()].sort((a, b) => b[1] - a[1]),
      log,
    };

    const outPath = `${outPrefix}.run${runIndex}.json`;
    fs.writeFileSync(outPath, JSON.stringify(result));
    console.log(
      JSON.stringify({
        run: runIndex,
        injectCss: injectCssPath || null,
        gesturesUsed: count,
        totalEvents: log.length,
        listedRunPlusCancel,
        listedCancelOnly,
        mlinkCancelOnly,
        consoleErrors,
        outPath,
      }),
    );
    return result;
  } finally {
    await browser.close().catch(() => {});
  }
}

async function main() {
  const argv = process.argv.slice(2);
  let runs = 1;
  let outPrefix = "exp-T2";
  let cpuRate = 4;
  let injectCssPath = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--runs") runs = Number(argv[++i]);
    else if (argv[i] === "--out") outPrefix = argv[++i];
    else if (argv[i] === "--cpu") cpuRate = Number(argv[++i]);
    else if (argv[i] === "--inject-css") injectCssPath = argv[++i];
  }
  for (let i = 1; i <= runs; i++) {
    await runOnce(i, outPrefix, cpuRate, injectCssPath);
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
