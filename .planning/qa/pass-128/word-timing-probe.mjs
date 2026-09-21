// word-timing-probe.mjs — Pass-128, investigator lens "THE WORD LOADING SLOW".
// EVIDENCE ONLY. Measures the LIVE site only. Does not read or write anything
// under app/, components/, lib/, content/, public/, or scripts/. New,
// purpose-built instrument (the shared scroll-probe.mjs explicitly disclaims
// this measurement in its own header comment: "This probe does NOT measure
// 'the word loading slow' (LCP / font-swap timing)").
//
// What it measures, per heading between the top of the page and "The Audit":
//   - t_enter: first rAF sample where the element's bounding rect says it has
//     entered the viewport (top < innerHeight, bottom > 0).
//   - t_settled: first rAF sample (sustained for >= 3 consecutive samples)
//     where computed opacity is within 0.02 of its own final value AND
//     computed transform equals its own final value.
//   - delta = t_settled - t_enter (the "time to fully in place" the lens
//     asks for).
// It also separately tracks the GSAP/SplitText char spans inside the offer
// h2 (#cw-offer-title), because SplitReveal never changes the CONTAINER's
// opacity/transform -- only the dynamically-created .cw-split__char children,
// which do not exist in the DOM until GSAP's SplitText.create() has run. The
// first non-null sample for a char selector is therefore a direct read of
// "when did the GSAP chunk finish loading + hydrate + execute", not an
// estimate.
//
// Font-load timing comes from PerformanceResourceTiming entries for .woff2
// files (self-hosted by next/font under /_next/static/media/*).
//
// Methodology notes (disclosed, not a silent choice):
//   - CPU throttle 4x, network throttled to the 4g preset (same numbers as
//     scroll-probe.mjs's NET_PRESETS.4g), matching the calibration already
//     recorded in this folder.
//   - Scroll is driven by the SAME manual touchStart/touchMove*/touchEnd
//     dispatch sequence as scroll-probe.mjs, at the same contact point and
//     nominal speed (1200px/s) -- copied here, not reinvented, per the
//     GESTURE MECHANISM SUBSTITUTION note in that file. This script does not
//     import that file (kept dependency-free / single-file for easy
//     re-running), but the algorithm is identical.
//   - Recording starts from an evaluateOnNewDocument script, i.e. before the
//     first byte of the page's own JS runs, and is NOT gated on
//     `document.fonts.ready` (the opposite of scroll-probe.mjs, deliberately
//     -- this script's whole job is to see what happens BEFORE fonts/JS are
//     ready).
//
// Usage: node word-timing-probe.mjs [--runs N] [--out OUT_PREFIX]

import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "https://www.micahjonesconsulting.com/";
const GESTURE_X = 195;
const GESTURE_Y = 650;
const GESTURE_SPEED = 1200;
const GESTURE_STEP_MS = 16;
const GESTURE_STEP_PX = (GESTURE_SPEED * GESTURE_STEP_MS) / 1000;
const GESTURE_MAX_STEP_PX = 1600;
const GESTURE_SETTLE_MS = 350;

const NET_4G = {
  offline: false,
  latency: 60,
  downloadThroughput: (9 * 1000 * 1000) / 8,
  uploadThroughput: (1.5 * 1000 * 1000) / 8,
};

// Heading/element census between the top of the page and "The Audit"
// (app/(foyer)/page.tsx order, verified by direct read 2026-09-21):
//   Hero H1 (2 lines) -> Hero sub -> doors h2 x2 -> offer h2 (SplitReveal,
//   GSAP char spans) -> "The Audit" PriceBox name (h3.cw-pbox__name).
const HEADINGS = [
  { key: "h1_line1", sel: ".cw-h1 .cw-line:not(.cw-line--turn) > span" },
  { key: "h1_line2", sel: ".cw-h1 .cw-line--turn > span" },
  { key: "sub", sel: ".cw-sub" },
  { key: "door1_h2", sel: ".cw-door--build .cw-door__title" },
  { key: "door2_h2", sel: ".cw-door--sell .cw-door__title" },
  { key: "offer_h2_container", sel: "#cw-offer-title" },
  { key: "offer_firstchar", sel: "#cw-offer-title .cw-split__char" },
  { key: "offer_lastchar", sel: "#cw-offer-title .cw-split__char:last-child" },
  { key: "audit_h3", sel: ".cw-pbox__name" },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function touchSwipe(session, distancePx) {
  let y = GESTURE_Y;
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: GESTURE_X, y, radiusX: 5, radiusY: 5, force: 1 }],
  });
  await sleep(GESTURE_STEP_MS);
  let traveled = 0;
  while (traveled < distancePx) {
    const step = Math.min(GESTURE_STEP_PX, distancePx - traveled);
    y -= step;
    traveled += step;
    await session.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: GESTURE_X, y, radiusX: 5, radiusY: 5, force: 1 }],
    });
    await sleep(GESTURE_STEP_MS);
  }
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
}

async function scrollToSelector(page, session, selector, maxSwipes = 40) {
  let count = 0;
  while (count < maxSwipes) {
    const info = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return { found: false };
      return { found: true, top: el.getBoundingClientRect().top };
    }, selector);
    if (!info.found) return { ok: false, swipes: count };
    if (info.top <= 40) return { ok: true, swipes: count };
    const distance = Math.max(50, Math.min(info.top, GESTURE_MAX_STEP_PX));
    await touchSwipe(session, distance);
    await sleep(GESTURE_SETTLE_MS);
    count += 1;
  }
  return { ok: false, swipes: count };
}

async function runOnce(runIndex, outPrefix, cpuRate) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const consoleErrors = [];
  try {
    const page = await browser.newPage();
    page.on("pageerror", (err) => consoleErrors.push(String(err)));

    await page.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });

    const session = await page.createCDPSession();
    await session.send("Emulation.setCPUThrottlingRate", { rate: cpuRate });
    await session.send("Network.enable");
    await session.send("Network.setCacheDisabled", { cacheDisabled: true });
    await session.send("Network.emulateNetworkConditions", NET_4G);

    await page.evaluateOnNewDocument((headingsJson) => {
      const HEADINGS = JSON.parse(headingsJson);
      window.__wp = {
        recording: true,
        samples: [],
        fontEvents: [],
        classEvents: [],
        t0: performance.now(),
      };
      try {
        if (document.fonts) {
          document.fonts.addEventListener("loadingdone", (e) => {
            window.__wp.fontEvents.push({
              t: performance.now(),
              type: "loadingdone",
              n: e.fontfaces ? e.fontfaces.length : null,
            });
          });
        }
      } catch (err) {
        /* ignore */
      }

      // Pinpoint exactly when the mount-time class/style writes happen:
      // [data-mode="cw"] gains .cw-js-reveals (components/color-worlds/
      // ScrollReveal.tsx L19), the hero H1 line spans gain a --reveal-i
      // inline style (components/color-worlds/Hero.tsx L88), and .cw-sub /
      // .cw-cta-row gain .is-in (Hero.tsx L91-92). Poll via MutationObserver
      // set up as early as possible (this script runs before the page's own
      // JS via evaluateOnNewDocument) so we are not guessing the start time
      // of the CSS animation/transition from indirect signals.
      function watchWhenReady() {
        const root = document.documentElement;
        const mo = new MutationObserver((muts) => {
          const t = performance.now();
          for (const m of muts) {
            if (m.type !== "attributes") continue;
            const el = m.target;
            if (
              el.matches &&
              el.matches('[data-mode="cw"]') &&
              m.attributeName === "class" &&
              el.classList.contains("cw-js-reveals")
            ) {
              window.__wp.classEvents.push({ t, what: "cw-js-reveals-added" });
            }
            if (
              el.matches &&
              el.matches(".cw-h1 .cw-line > span") &&
              m.attributeName === "style"
            ) {
              window.__wp.classEvents.push({
                t,
                what: "h1-line-style",
                style: el.getAttribute("style"),
              });
            }
            if (
              el.matches &&
              el.matches(".cw-sub") &&
              m.attributeName === "class" &&
              el.classList.contains("is-in")
            ) {
              window.__wp.classEvents.push({ t, what: "sub-is-in-added" });
            }
          }
        });
        mo.observe(root, {
          attributes: true,
          attributeFilter: ["class", "style"],
          subtree: true,
        });
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", watchWhenReady, { once: true });
      } else {
        watchWhenReady();
      }

      function sample() {
        const t = performance.now();
        const row = { t, els: {} };
        for (const h of HEADINGS) {
          const el = document.querySelector(h.sel);
          if (!el) {
            row.els[h.key] = null;
            continue;
          }
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          row.els[h.key] = {
            top: Math.round(r.top * 100) / 100,
            bottom: Math.round(r.bottom * 100) / 100,
            opacity: cs.opacity,
            transform: cs.transform,
          };
        }
        row.fontsStatus = document.fonts ? document.fonts.status : "unknown";
        row.innerHeight = window.innerHeight;
        window.__wp.samples.push(row);
        if (window.__wp.recording) requestAnimationFrame(sample);
      }
      requestAnimationFrame(sample);
    }, JSON.stringify(HEADINGS));

    const wallStart = Date.now();
    await page.goto(URL, { waitUntil: "load", timeout: 60000 });
    const wallLoadMs = Date.now() - wallStart;

    // Deliberately NOT awaiting document.fonts.ready here -- this script's
    // whole purpose is to see what renders before/while fonts and JS chunks
    // (GSAP/SplitText/ScrollTrigger) are still arriving under throttle.

    // Walk down to the Audit box with the same real-touch gesture the
    // shared probe uses, pacing similarly to an unhurried reader (not a
    // teleport) so the reveal systems fire under realistic conditions.
    const reach = await scrollToSelector(page, session, ".cw-pbox__name");
    await sleep(2000); // let any in-flight reveal (SplitReveal char cascade, cw-reveal transition) finish

    await page.evaluate(() => {
      window.__wp.recording = false;
    });

    const wp = await page.evaluate(() => window.__wp);
    const resources = await page.evaluate(() =>
      performance.getEntriesByType("resource").map((r) => ({
        name: r.name,
        initiatorType: r.initiatorType,
        startTime: Math.round(r.startTime * 100) / 100,
        responseEnd: Math.round(r.responseEnd * 100) / 100,
        transferSize: r.transferSize,
        decodedBodySize: r.decodedBodySize,
      })),
    );
    const navTiming = await page.evaluate(() => {
      const n = performance.getEntriesByType("navigation")[0];
      if (!n) return null;
      return {
        domContentLoadedEventEnd: n.domContentLoadedEventEnd,
        loadEventEnd: n.loadEventEnd,
        responseEnd: n.responseEnd,
        domInteractive: n.domInteractive,
      };
    });

    const fontResources = resources.filter((r) => /\.woff2?($|\?)/i.test(r.name));
    const gsapResources = resources.filter((r) => /gsap|split|scrolltrigger/i.test(r.name));
    const jsResources = resources
      .filter((r) => r.initiatorType === "script" || /\.js($|\?)/i.test(r.name))
      .sort((a, b) => b.transferSize - a.transferSize)
      .slice(0, 25);

    const result = {
      run: runIndex,
      url: URL,
      cpu: cpuRate,
      net: "4g",
      wallLoadMs,
      scrollReach: reach,
      navTiming,
      fontResources,
      gsapResourcesFoundByNameSubstring: gsapResources,
      largestJsResources: jsResources,
      fontEvents: wp.fontEvents,
      classEvents: wp.classEvents,
      sampleCount: wp.samples.length,
      consoleErrors,
      samples: wp.samples,
    };

    const outPath = `${outPrefix}.run${runIndex}.json`;
    fs.writeFileSync(outPath, JSON.stringify(result));
    console.log(
      JSON.stringify({
        run: runIndex,
        wallLoadMs,
        scrollReach: reach,
        sampleCount: wp.samples.length,
        fontResourceCount: fontResources.length,
        gsapResourceCount: gsapResources.length,
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
  let outPrefix = "word-timing-raw";
  let cpuRate = 4;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--runs") runs = Number(argv[++i]);
    else if (argv[i] === "--out") outPrefix = argv[++i];
    else if (argv[i] === "--cpu") cpuRate = Number(argv[++i]);
  }
  for (let i = 1; i <= runs; i++) {
    await runOnce(i, outPrefix, cpuRate);
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
