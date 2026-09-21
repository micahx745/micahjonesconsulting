// exp-T3-screencast.mjs -- Pass-128, experiment T3 (GSAP/ScrollTrigger chunk
// blocking, visual cross-check). EVIDENCE ONLY. Measures the LIVE site only.
// Does not read or write anything under app/, components/, lib/, content/,
// public/, or scripts/.
//
// This is screencast-scroll.mjs (same folder, same pass, S1/W1's instrument)
// with exactly two additions, both mirroring how the shared scroll-probe.mjs
// already implements the same features:
//   --block SUBSTRING  (repeatable) -- request-interception abort for any
//     request URL containing SUBSTRING, installed before page.goto(), same
//     pattern as scroll-probe.mjs's own --block handling.
//   --out-dir DIR       -- write frames/manifest into DIR instead of the
//     fixed "frames" directory, so a baseline and a blocked-variant capture
//     don't clobber each other.
// Everything else -- gesture mechanism, CPU condition, viewport, screencast
// mechanism, world-switch/reveal recorders -- is unchanged and not
// reimplemented from scratch.
//
// Usage: node exp-T3-screencast.mjs [--url URL] [--to SELECTOR] [--cpu N]
//   [--block SUBSTRING]... [--out-dir DIR]

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
const SETTLE_MS = 1200;
const POST_LOAD_MS = 1500;
const GESTURE_STEP_MS = 16;
const GESTURE_STEP_PX = (GESTURE_SPEED * GESTURE_STEP_MS) / 1000;
const GESTURE_SETTLE_MS = 350;

function parseArgs(argv) {
  const options = { url: DEFAULT_URL, to: null, cpu: 4, block: [], outDir: "frames" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--url") options.url = argv[++i];
    else if (a === "--to") options.to = argv[++i];
    else if (a === "--cpu") options.cpu = Number(argv[++i]);
    else if (a === "--block") options.block.push(argv[++i]);
    else if (a === "--out-dir") options.outDir = argv[++i];
  }
  return options;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
      worldSwitches: [],
      noWrapper: false,
      headingReveals: [],
    };
    window.__screencastProbe = state;

    const wrapper = document.querySelector('[data-mode="cw"]');
    if (!wrapper) {
      state.noWrapper = true;
    } else {
      let lastBg = getComputedStyle(wrapper).getPropertyValue("--cw-bg").trim();
      state.worldSwitches.push({ tPerf: performance.now(), tEpoch: Date.now(), bg: lastBg });
      state.mutationObserver = new MutationObserver(() => {
        const bg = getComputedStyle(wrapper).getPropertyValue("--cw-bg").trim();
        if (bg !== lastBg) {
          lastBg = bg;
          state.worldSwitches.push({ tPerf: performance.now(), tEpoch: Date.now(), bg });
        }
      });
      state.mutationObserver.observe(wrapper, { attributes: true, attributeFilter: ["style"] });
    }

    try {
      state.revealObserver = new MutationObserver((mutations) => {
        for (const m of mutations) {
          const el = m.target;
          if (el.classList && el.classList.contains("is-in") && !el.__screencastLogged) {
            el.__screencastLogged = true;
            state.headingReveals.push({
              tPerf: performance.now(),
              tEpoch: Date.now(),
              text: (el.textContent || "").trim().slice(0, 60),
            });
          }
        }
      });
      document.querySelectorAll(".cw-reveal").forEach((el) => {
        state.revealObserver.observe(el, { attributes: true, attributeFilter: ["class"] });
      });
    } catch (err) {
      state.revealObserverError = String(err);
    }
  });
}

async function stopRecorders(page) {
  return page.evaluate(() => {
    const state = window.__screencastProbe;
    state.recording = false;
    if (state.mutationObserver) {
      try {
        state.mutationObserver.disconnect();
      } catch {}
    }
    if (state.revealObserver) {
      try {
        state.revealObserver.disconnect();
      } catch {}
    }
    return {
      worldSwitches: state.worldSwitches,
      noWrapper: state.noWrapper,
      headingReveals: state.headingReveals,
    };
  });
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
    throw new Error(`Target not reached after ${GESTURE_MAX_COUNT} gestures (selector: ${targetSelector})`);
  }
  const endTime = await page.evaluate(() => performance.now());
  return { gestureCount, scrollDurationMs: endTime - startTime };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const OUT_DIR = path.join(process.cwd(), options.outDir);
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (f.endsWith(".png")) fs.unlinkSync(path.join(OUT_DIR, f));
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const consoleErrors = [];
  const blockedRequests = [];
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
    await session.send("Emulation.setCPUThrottlingRate", { rate: options.cpu });
    await session.send("Network.enable");
    await session.send("Network.setCacheDisabled", { cacheDisabled: true });

    if (options.block.length) {
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const url = req.url();
        if (options.block.some((needle) => url.includes(needle))) {
          blockedRequests.push(url);
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
      process.exit(2);
    }

    const targetSelector = await resolveTargetSelector(page, options.to);
    await installRecorders(page);

    let frameIndex = 0;
    const manifest = [];
    let captureStartEpochMs = null;

    session.on("Page.screencastFrame", async (event) => {
      const idx = frameIndex++;
      const epochMs = event.metadata && event.metadata.timestamp ? event.metadata.timestamp * 1000 : Date.now();
      if (captureStartEpochMs === null) captureStartEpochMs = epochMs;
      const fname = `frame-${String(idx).padStart(5, "0")}.png`;
      fs.writeFileSync(path.join(OUT_DIR, fname), Buffer.from(event.data, "base64"));
      manifest.push({ index: idx, file: fname, epochMs, metadata: event.metadata });
      session.send("Page.screencastFrameAck", { sessionId: event.sessionId }).catch(() => {});
    });

    const captureStartWallMs = Date.now();
    await session.send("Page.startScreencast", {
      format: "png",
      maxWidth: 390,
      maxHeight: 844,
      everyNthFrame: 1,
    });
    await sleep(300);

    const { gestureCount, scrollDurationMs } = await scrollToTarget(page, session, targetSelector);
    await sleep(SETTLE_MS);

    await session.send("Page.stopScreencast");
    await sleep(200);

    const recorded = await stopRecorders(page);
    await session.detach().catch(() => {});
    await page.close().catch(() => {});

    const baseEpoch = captureStartEpochMs || captureStartWallMs;
    const framesOut = manifest
      .slice()
      .sort((a, b) => a.index - b.index)
      .map((f) => ({ index: f.index, file: f.file, epochMs: f.epochMs, relMs: Math.round(f.epochMs - baseEpoch) }));

    const worldSwitchesOut = recorded.worldSwitches.map((w) => ({
      tPerf: w.tPerf,
      tEpoch: w.tEpoch,
      relMs: Math.round(w.tEpoch - baseEpoch),
      bg: w.bg,
    }));

    const headingRevealsOut = recorded.headingReveals.map((h) => ({
      tPerf: h.tPerf,
      tEpoch: h.tEpoch,
      relMs: Math.round(h.tEpoch - baseEpoch),
      text: h.text,
    }));

    fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(framesOut, null, 2));
    fs.writeFileSync(path.join(OUT_DIR, "world-switches.json"), JSON.stringify(worldSwitchesOut, null, 2));
    fs.writeFileSync(path.join(OUT_DIR, "heading-reveals.json"), JSON.stringify(headingRevealsOut, null, 2));

    const summary = {
      url: options.url,
      cpu: options.cpu,
      block: options.block,
      blockedRequestCount: blockedRequests.length,
      blockedRequests,
      target: targetSelector,
      frameCount: framesOut.length,
      gestureCount,
      scrollDurationMs: Math.round(scrollDurationMs),
      worldSwitchCount: Math.max(0, worldSwitchesOut.length - 1),
      worldBgValues: worldSwitchesOut.map((w) => w.bg),
      noWrapper: recorded.noWrapper,
      consoleErrors,
      captureStartEpochMs: baseEpoch,
    };
    fs.writeFileSync(path.join(OUT_DIR, "run-summary.json"), JSON.stringify(summary, null, 2));
    console.log(JSON.stringify(summary, null, 2));
  } finally {
    await browser.close().catch(() => {});
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
