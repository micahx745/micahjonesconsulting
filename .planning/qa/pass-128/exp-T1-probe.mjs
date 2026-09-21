// exp-T1-probe.mjs -- Pass-128, experiment T1 (words-loading-slow claim).
// EVIDENCE ONLY. Measures the LIVE site only. Does not read or write
// anything under app/, components/, lib/, content/, public/, or scripts/.
//
// This is word-timing-probe.mjs (same folder, same pass, Finding W2's
// instrument) with exactly one addition: an --inject-css FILE flag that
// applies a stylesheet via page.addStyleTag() right after page load and
// before the scroll-to-target gesture begins, mirroring exactly how the
// shared scroll-probe.mjs applies --inject-css (same call, same point in
// the sequence: after goto+liveness, before scrollToTarget). Everything
// else -- gesture mechanism, CPU/net conditions, heading census, sampling
// method, t_enter/t_settled definitions -- is unchanged and not
// reimplemented from scratch, per the "don't invent a second instrument"
// discipline the rest of this folder follows. Used to A/B the Finding W2
// neutralizer (exp-T1.css) against the unmodified baseline.
//
// Usage: node exp-T1-probe.mjs [--runs N] [--out OUT_PREFIX] [--cpu N]
//   [--inject-css FILE]

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

// Same heading census as word-timing-probe.mjs (app/(foyer)/page.tsx order,
// verified by direct read 2026-09-21).
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

    // Same insertion point as scroll-probe.mjs's own --inject-css handling:
    // after goto (page + its own stylesheets are loaded), before scrolling
    // starts. SplitReveal's ScrollTrigger fires on scroll (start "top 75%"),
    // well after this point, so the injected rule is in place before the
    // reveal it targets can possibly fire.
    if (injectCssPath) {
      await page.addStyleTag({ path: injectCssPath });
    }

    const reach = await scrollToSelector(page, session, ".cw-pbox__name");
    await sleep(2000);

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

    const result = {
      run: runIndex,
      url: URL,
      cpu: cpuRate,
      net: "4g",
      injectCss: injectCssPath || null,
      wallLoadMs,
      scrollReach: reach,
      navTiming,
      fontResources,
      gsapResourcesFoundByNameSubstring: gsapResources,
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
        injectCss: injectCssPath || null,
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
  let outPrefix = "exp-T1";
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
