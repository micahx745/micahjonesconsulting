// Pass-128 shared scroll/world-switch measurement probe. EVIDENCE ONLY.
//
// Measures mobile scroll smoothness (rAF frame intervals, Long Tasks) and
// world-switch timing (--cw-bg changes on the [data-mode="cw"] wrapper)
// while scrolling from the top of the page to a target section using a
// REAL CDP touch-scroll gesture (Input.synthesizeScrollGesture), not
// window.scrollTo. This is the operator's phone-reported complaint under
// test: choppy scroll animation and abrupt background-color switching
// between the top of the page and "The Audit" section.
//
// This script measures the LIVE site only. It does not read or write
// anything under app/, components/, lib/, content/, public/, or scripts/.
// It is plain ASCII on purpose (project rule for this probe).
//
// Usage:
//   node scroll-probe.mjs [--url URL] [--to CSS_SELECTOR] [--cpu N]
//     [--net 4g] [--runs N] [--inject-css FILE] [--block SUBSTRING]...
//     [--detach-split] [--gpu] [--trace OUT.json] [--out OUT.jsonl]
//
// Notes on scope:
//   - This probe does NOT measure "the word loading slow" (LCP / font-swap
//     timing). That is a separate symptom needing a separate probe; it is
//     out of scope for this scroll/world-switch instrument and is not
//     reported on here.
//   - Windows/Git-Bash callers: prefix MSYS_NO_PATHCONV=1 when any argument
//     to this script (e.g. a --to selector) starts with "/".
//
// Deliberate, disclosed choices beyond the fixed protocol:
//   - Network.setCacheDisabled(true) is set unconditionally (not only under
//     --net) so repeated runs are comparable to each other and to a
//     first-time visitor, not to a warm browser cache. This is a modeling
//     choice, not part of the fixed protocol; flag it when reporting.
//   - GESTURE MECHANISM SUBSTITUTION (diagnosed, not a silent bypass): the
//     spec calls for CDP Input.synthesizeScrollGesture with
//     gestureSourceType "touch". Measured directly against this Chrome
//     build (Chrome/153.0.8010.52, this headless launch) and this live
//     page: that exact call returns success but produces ZERO scroll
//     (window.scrollY stayed 0 across a -800px yDistance touch gesture,
//     reproduced twice). The identical call with gestureSourceType
//     "mouse" DOES scroll (scrollY 0 -> 264). A manual, lower-level
//     Input.dispatchTouchEvent sequence (touchStart, then touchMove steps,
//     then touchEnd) also scrolls natively (scrollY 0 -> 326, 31 native
//     "scroll" events fired) and is, if anything, a MORE literal "real
//     touch gesture" than the higher-level convenience wrapper that failed
//     silently. This probe therefore drives scrolling with a manual
//     touchStart/touchMove*/touchEnd dispatch sequence at the same contact
//     point (195, 650) and the same nominal speed (1200 px/s, realized as
//     ~19px per 16ms step), letting the browser's native touch-to-scroll
//     and momentum/fling physics do the rest -- not window.scrollTo. See
//     debug-gesture.mjs and debug-gesture2.mjs in this directory for the
//     raw comparison. Report this substitution when reporting probe
//     results; do not describe it as "using CDP synthesizeScrollGesture".

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const DEFAULT_URL = "https://www.micahjonesconsulting.com/";
const DEFAULT_TARGET_TEXT = "The Audit";
const GESTURE_X = 195;
const GESTURE_Y = 650;
const GESTURE_SPEED = 1200;
const GESTURE_MAX_STEP_PX = 1600;
const GESTURE_MAX_COUNT = 60;
const SETTLE_MS = 1000;
const POST_LOAD_MS = 1500;

const NET_PRESETS = {
  "4g": {
    offline: false,
    latency: 60,
    downloadThroughput: (9 * 1000 * 1000) / 8,
    uploadThroughput: (1.5 * 1000 * 1000) / 8,
  },
};

function usage() {
  console.error(
    "Usage: node scroll-probe.mjs [--url URL] [--to SELECTOR] [--cpu N]\n" +
      "  [--net 4g] [--runs N] [--inject-css FILE] [--block SUBSTRING]...\n" +
      "  [--detach-split] [--gpu] [--trace OUT.json] [--out OUT.jsonl]",
  );
}

function parseArgs(argv) {
  const options = {
    url: DEFAULT_URL,
    to: null,
    cpu: 4,
    net: null,
    runs: 1,
    injectCss: null,
    block: [],
    detachSplit: false,
    gpu: false,
    trace: null,
    out: null,
    valid: true,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--url") options.url = argv[++i];
    else if (a === "--to") options.to = argv[++i];
    else if (a === "--cpu") options.cpu = Number(argv[++i]);
    else if (a === "--net") options.net = argv[++i];
    else if (a === "--runs") options.runs = Number(argv[++i]);
    else if (a === "--inject-css") options.injectCss = argv[++i];
    else if (a === "--block") options.block.push(argv[++i]);
    else if (a === "--detach-split") options.detachSplit = true;
    else if (a === "--gpu") options.gpu = true;
    else if (a === "--trace") options.trace = argv[++i];
    else if (a === "--out") options.out = argv[++i];
    else if (a === "--help") {
      usage();
      process.exit(0);
    } else {
      console.error(`Unknown or malformed flag near: ${a}`);
      options.valid = false;
    }
  }
  if (!Number.isFinite(options.cpu) || options.cpu <= 0) {
    console.error(`--cpu must be a positive number, got: ${options.cpu}`);
    options.valid = false;
  }
  if (!Number.isInteger(options.runs) || options.runs < 1) {
    console.error(`--runs must be a positive integer, got: ${options.runs}`);
    options.valid = false;
  }
  if (options.net && !NET_PRESETS[options.net]) {
    console.error(`Unknown --net preset: ${options.net} (known: ${Object.keys(NET_PRESETS).join(", ")})`);
    options.valid = false;
  }
  return options;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function round(value, places = 2) {
  if (value === null || value === undefined || !Number.isFinite(value)) return null;
  const scale = 10 ** places;
  return Math.round(value * scale) / scale;
}

function percentile(values, p) {
  const sorted = values.filter(Number.isFinite).slice().sort((a, b) => a - b);
  if (!sorted.length) return null;
  const rank = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);
  if (lower === upper) return sorted[lower];
  const weight = rank - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

function median(values) {
  const sorted = values.filter(Number.isFinite).slice().sort((a, b) => a - b);
  if (!sorted.length) return null;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function spread(values) {
  const finite = values.filter(Number.isFinite);
  if (!finite.length) return null;
  return round(Math.max(...finite) - Math.min(...finite));
}

async function resolveTargetSelector(page, overrideSelector) {
  if (overrideSelector) return overrideSelector;
  const found = await page.evaluate((needle) => {
    const sections = Array.from(document.querySelectorAll("section[data-world]"));
    const match = sections.find((el) => el.textContent && el.textContent.includes(needle));
    if (!match) return false;
    match.setAttribute("data-scroll-probe-target", "1");
    return true;
  }, DEFAULT_TARGET_TEXT);
  if (!found) {
    throw new Error(`Could not find section[data-world] containing "${DEFAULT_TARGET_TEXT}"`);
  }
  return '[data-scroll-probe-target="1"]';
}

async function installRecorders(page) {
  await page.evaluate(() => {
    const state = {
      recording: true,
      frameTimes: [],
      longtasks: [],
      worldSwitches: [],
      noWrapper: false,
      longtaskError: null,
    };
    window.__scrollProbe = state;

    let last = performance.now();
    function tick(now) {
      if (!state.recording) return;
      state.frameTimes.push(now - last);
      last = now;
      state.rafId = requestAnimationFrame(tick);
    }
    state.rafId = requestAnimationFrame(tick);

    try {
      state.longtaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          state.longtasks.push({ start: entry.startTime, duration: entry.duration });
        }
      });
      state.longtaskObserver.observe({ type: "longtask", buffered: false });
    } catch (err) {
      state.longtaskError = String(err);
    }

    const wrapper = document.querySelector('[data-mode="cw"]');
    if (!wrapper) {
      state.noWrapper = true;
    } else {
      let lastBg = getComputedStyle(wrapper).getPropertyValue("--cw-bg").trim();
      state.worldSwitches.push({ t: performance.now(), bg: lastBg });
      state.mutationObserver = new MutationObserver(() => {
        const bg = getComputedStyle(wrapper).getPropertyValue("--cw-bg").trim();
        if (bg !== lastBg) {
          lastBg = bg;
          state.worldSwitches.push({ t: performance.now(), bg });
        }
      });
      state.mutationObserver.observe(wrapper, { attributes: true, attributeFilter: ["style"] });
    }
  });
}

async function stopRecorders(page) {
  return page.evaluate(() => {
    const state = window.__scrollProbe;
    state.recording = false;
    if (state.rafId) cancelAnimationFrame(state.rafId);
    if (state.longtaskObserver) {
      try {
        state.longtaskObserver.disconnect();
      } catch {}
    }
    if (state.mutationObserver) {
      try {
        state.mutationObserver.disconnect();
      } catch {}
    }
    return {
      frameTimes: state.frameTimes,
      longtasks: state.longtasks,
      worldSwitches: state.worldSwitches,
      noWrapper: state.noWrapper,
      longtaskError: state.longtaskError,
    };
  });
}

const GESTURE_STEP_MS = 16; // one compositor frame at 60fps
const GESTURE_STEP_PX = (GESTURE_SPEED * GESTURE_STEP_MS) / 1000; // ~19.2px/step at 1200px/s
const GESTURE_SETTLE_MS = 350; // let momentum/fling mostly play out between swipes

// One real touch swipe: touchStart at (x, y), then touchMove steps walking
// y upward by GESTURE_STEP_PX every GESTURE_STEP_MS (finger moves up ->
// page scrolls down), then touchEnd. This is a manual, lower-level stand-in
// for CDP Input.synthesizeScrollGesture(gestureSourceType: "touch"), which
// measured as a no-op against this page/browser combination -- see the
// GESTURE MECHANISM SUBSTITUTION note at the top of this file. Native
// touch-to-scroll and any resulting momentum/fling are the browser's own,
// exactly as on a real phone; this function does not call scrollTo.
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

// Repeats real touch swipes (not window.scrollTo) from the current position
// until targetSelector's top edge reaches the viewport top. Returns the
// number of swipes used and the wall time spent scrolling (excludes the
// post-scroll settle period, which the caller adds separately).
async function scrollToTarget(page, session, targetSelector) {
  let gestureCount = 0;
  const startTime = await page.evaluate(() => performance.now());
  while (gestureCount < GESTURE_MAX_COUNT) {
    const info = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return { found: false };
      return { found: true, top: el.getBoundingClientRect().top };
    }, targetSelector);
    if (!info.found) {
      throw new Error(`Target selector disappeared mid-scroll: ${targetSelector}`);
    }
    if (info.top <= 0) break;
    const distance = Math.max(50, Math.min(info.top, GESTURE_MAX_STEP_PX));
    await touchSwipe(session, distance);
    await sleep(GESTURE_SETTLE_MS);
    gestureCount += 1;
  }
  if (gestureCount >= GESTURE_MAX_COUNT) {
    throw new Error(
      `Target not reached after ${GESTURE_MAX_COUNT} gestures (selector: ${targetSelector})`,
    );
  }
  const endTime = await page.evaluate(() => performance.now());
  return { gestureCount, scrollDurationMs: endTime - startTime };
}

function summarizeTrace(tracePath) {
  try {
    const raw = fs.readFileSync(tracePath, "utf8");
    const parsed = JSON.parse(raw);
    const events = Array.isArray(parsed) ? parsed : parsed.traceEvents || [];
    const totals = new Map();
    for (const event of events) {
      if (event.ph !== "X" || typeof event.dur !== "number") continue;
      const key = event.name || "(unnamed)";
      totals.set(key, (totals.get(key) || 0) + event.dur);
    }
    return [...totals.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([name, durUs]) => ({ name, totalMs: round(durUs / 1000) }));
  } catch (err) {
    return { error: String(err) };
  }
}

async function runOnce(options, runIndex) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: options.gpu ? ["--no-sandbox"] : ["--no-sandbox", "--disable-gpu"],
  });
  const consoleErrors = [];
  try {
    const rendererPage = await browser.newPage();
    let webglRenderer = "no-webgl";
    try {
      await rendererPage.goto("about:blank");
      webglRenderer = await rendererPage.evaluate(() => {
        try {
          const canvas = document.createElement("canvas");
          const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
          if (!gl) return "no-webgl";
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          if (debugInfo) {
            return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "no-webgl";
          }
          return gl.getParameter(gl.RENDERER) || "no-webgl";
        } catch {
          return "no-webgl";
        }
      });
    } finally {
      await rendererPage.close().catch(() => {});
    }

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
    await session.send("Emulation.setCPUThrottlingRate", { rate: options.cpu });

    await session.send("Network.enable");
    await session.send("Network.setCacheDisabled", { cacheDisabled: true });
    if (options.net) {
      await session.send("Network.emulateNetworkConditions", NET_PRESETS[options.net]);
    }

    if (options.block.length) {
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const url = req.url();
        if (options.block.some((needle) => url.includes(needle))) {
          req.abort().catch(() => {});
        } else {
          req.continue().catch(() => {});
        }
      });
    }

    await page.goto(options.url, { waitUntil: "load", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await sleep(POST_LOAD_MS);

    const liveness = await page.evaluate(() => {
      const wrapper = document.querySelector('[data-mode="cw"]');
      if (!wrapper) return { ok: false, reason: 'no [data-mode="cw"] element' };
      const bg = getComputedStyle(wrapper).getPropertyValue("--cw-bg").trim();
      return { ok: bg.length > 0, reason: bg.length > 0 ? null : "--cw-bg is empty", bg };
    });
    if (!liveness.ok) {
      console.error(`LIVENESS FAIL: ${liveness.reason}`);
      await page.close().catch(() => {});
      await browser.close().catch(() => {});
      process.exit(2);
    }

    if (options.injectCss) {
      await page.addStyleTag({ path: options.injectCss });
    }

    const targetSelector = await resolveTargetSelector(page, options.to);

    let detach = null;
    if (options.detachSplit) {
      detach = await page.evaluate(() => {
        const chars = Array.from(document.querySelectorAll(".cw-split__char"));
        const rootNodes = [];
        const seenRoots = new Set();
        const samples = [];
        for (const char of chars) {
          const root = (char.closest(".cw-split__word") || char).parentElement;
          if (!root || seenRoots.has(root)) continue;
          seenRoots.add(root);
          rootNodes.push(root);
          samples.push({
            rootId: root.id,
            char,
            opacityBefore: char.style.opacity,
          });
        }
        window.__detachedSamples = samples;
        for (const root of rootNodes) {
          root.textContent = root.textContent;
        }
        return {
          charsBefore: chars.length,
          roots: rootNodes.map((root) => root.id),
          charsAfter: document.querySelectorAll(".cw-split__char").length,
        };
      });
    }

    await installRecorders(page);

    let tracePath = null;
    if (options.trace) {
      const parsed = path.parse(options.trace);
      tracePath = path.join(parsed.dir, `${parsed.name}.run${runIndex}${parsed.ext || ".json"}`);
      await page.tracing.start({
        path: tracePath,
        categories: ["devtools.timeline", "disabled-by-default-devtools.timeline.frame"],
      });
    }

    const { gestureCount, scrollDurationMs } = await scrollToTarget(page, session, targetSelector);
    await sleep(SETTLE_MS);

    if (detach) {
      const detachAfter = await page.evaluate(() => ({
        charsAfterGesture: document.querySelectorAll(".cw-split__char").length,
        samples: (window.__detachedSamples || []).map((sample) => ({
          rootId: sample.rootId,
          opacityBefore: sample.opacityBefore,
          opacityAfter: sample.char.style.opacity,
        })),
      }));
      Object.assign(detach, detachAfter);
    }

    if (tracePath) {
      await page.tracing.stop();
    }

    const recorded = await stopRecorders(page);

    await session.detach().catch(() => {});
    await page.close().catch(() => {});

    const intervals = recorded.frameTimes.filter((v) => Number.isFinite(v) && v >= 0);
    const framesOver33ms = intervals.filter((v) => v > 33).length;
    const framesOver50ms = intervals.filter((v) => v > 50).length;
    const longtaskTotalMs = recorded.longtasks.reduce((sum, e) => sum + e.duration, 0);
    const worldBgValues = recorded.worldSwitches.map((w) => w.bg);
    // worldBgValues includes the starting value as element 0; a "switch" is
    // any subsequent change, so switch count = list length - 1 (floor 0).
    const worldSwitchCount = Math.max(0, worldBgValues.length - 1);

    return {
      run: runIndex,
      cpu: options.cpu,
      net: options.net,
      url: options.url,
      target: targetSelector,
      webglRenderer,
      detach,
      frames: intervals.length,
      intervalMsP50: round(percentile(intervals, 50)),
      intervalMsP95: round(percentile(intervals, 95)),
      intervalMsMax: intervals.length ? round(Math.max(...intervals)) : null,
      framesOver33ms,
      framesOver50ms,
      longtaskCount: recorded.longtasks.length,
      longtaskTotalMs: round(longtaskTotalMs),
      worldSwitchCount,
      worldBgValues,
      scrollDurationMs: round(scrollDurationMs),
      gestureCount,
      noWrapper: recorded.noWrapper,
      longtaskObserverError: recorded.longtaskError,
      consoleErrors,
      topTraceEventsByDuration: tracePath ? summarizeTrace(tracePath) : null,
    };
  } finally {
    await browser.close().catch(() => {});
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options.valid) {
    usage();
    process.exit(1);
  }

  const outStream = options.out ? fs.createWriteStream(options.out, { flags: "a" }) : null;
  const results = [];
  for (let i = 1; i <= options.runs; i++) {
    const result = await runOnce(options, i);
    const line = JSON.stringify(result);
    console.log(line);
    if (outStream) outStream.write(`${line}\n`);
    results.push(result);
  }
  if (outStream) outStream.end();

  if (results.length > 1) {
    const summary = {
      run: "median",
      runsCounted: results.length,
      cpu: options.cpu,
      net: options.net,
      intervalMsP50Median: round(median(results.map((r) => r.intervalMsP50))),
      intervalMsP95Median: round(median(results.map((r) => r.intervalMsP95))),
      intervalMsMaxMedian: round(median(results.map((r) => r.intervalMsMax))),
      framesOver33msMedian: round(median(results.map((r) => r.framesOver33ms))),
      framesOver50msMedian: round(median(results.map((r) => r.framesOver50ms))),
      longtaskCountMedian: round(median(results.map((r) => r.longtaskCount))),
      longtaskTotalMsMedian: round(median(results.map((r) => r.longtaskTotalMs))),
      worldSwitchCountMedian: round(median(results.map((r) => r.worldSwitchCount))),
      scrollDurationMsMedian: round(median(results.map((r) => r.scrollDurationMs))),
      intervalMsP95Spread: spread(results.map((r) => r.intervalMsP95)),
      framesOver33msSpread: spread(results.map((r) => r.framesOver33ms)),
    };
    const line = JSON.stringify(summary);
    console.log(line);
    if (options.out) fs.appendFileSync(options.out, `${line}\n`);
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
