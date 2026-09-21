// Pass-128 style invalidation probe. EVIDENCE ONLY.
//
// This copies scroll-probe.mjs's live-page setup and manual CDP touch
// gesture. It records the requested invalidation-tracking categories only
// while scrollToTarget is active, then summarizes style invalidations and
// UpdateLayoutTree work. The --no-hover-emulation variant injects the exact
// post-load rule requested by the investigation.
//
// Usage:
//   node invalidation-probe.mjs [--url URL] [--to CSS_SELECTOR] [--cpu N]
//     [--runs N] [--no-hover-emulation] [--out FILE] [--append]

// Typical evidence run:
//   node invalidation-probe.mjs --runs 2
//   node invalidation-probe.mjs --runs 2 --no-hover-emulation --append

// This file is plain ASCII on purpose.

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const DEFAULT_URL = "https://www.micahjonesconsulting.com/";
const DEFAULT_TARGET_TEXT = "The Audit";
const DEFAULT_OUT = ".planning/qa/pass-128/invalidation.txt";
const GESTURE_X = 195;
const GESTURE_Y = 650;
const GESTURE_SPEED = 1200;
const GESTURE_MAX_STEP_PX = 1600;
const GESTURE_MAX_COUNT = 60;
const SETTLE_MS = 1000;
const POST_LOAD_MS = 1500;
const GESTURE_STEP_MS = 16;
const GESTURE_STEP_PX = (GESTURE_SPEED * GESTURE_STEP_MS) / 1000;
const GESTURE_SETTLE_MS = 350;
const TRACE_CATEGORIES = [
  "devtools.timeline",
  "disabled-by-default-devtools.timeline",
  "disabled-by-default-devtools.timeline.invalidationTracking",
  "disabled-by-default-devtools.timeline.stack",
];
const INVALIDATION_EVENT_NAMES = new Set([
  "ScheduleStyleRecalculation",
  "StyleRecalcInvalidationTracking",
  "StyleInvalidatorInvalidationTracking",
]);

function usage() {
  console.error(
    "Usage: node invalidation-probe.mjs [--url URL] [--to SELECTOR] [--cpu N]\n" +
      "  [--runs N] [--no-hover-emulation] [--out FILE] [--append]",
  );
}

function parseArgs(argv) {
  const options = {
    url: DEFAULT_URL,
    to: null,
    cpu: 4,
    runs: 1,
    noHoverEmulation: false,
    out: DEFAULT_OUT,
    append: false,
    valid: true,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--url") options.url = argv[++i];
    else if (arg === "--to") options.to = argv[++i];
    else if (arg === "--cpu") options.cpu = Number(argv[++i]);
    else if (arg === "--runs") options.runs = Number(argv[++i]);
    else if (arg === "--no-hover-emulation") options.noHoverEmulation = true;
    else if (arg === "--out") options.out = argv[++i];
    else if (arg === "--append") options.append = true;
    else if (arg === "--help") {
      usage();
      process.exit(0);
    } else {
      console.error(`Unknown or malformed flag near: ${arg}`);
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
  return options;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function round(value, places = 3) {
  if (!Number.isFinite(value)) return null;
  const scale = 10 ** places;
  return Math.round(value * scale) / scale;
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

// Copied from scroll-probe.mjs. Do not replace this with scrollTo or with
// Input.synthesizeScrollGesture: the latter is a measured no-op in this
// Chrome/headless combination.
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

// Copied from scroll-probe.mjs. The returned interval is the scroll window
// used by this probe; tracing starts immediately before this call and stops
// immediately after it returns.
async function scrollToTarget(page, session, targetSelector) {
  let gestureCount = 0;
  const startTime = await page.evaluate(() => performance.now());
  while (gestureCount < GESTURE_MAX_COUNT) {
    const info = await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) return { found: false };
      return { found: true, top: element.getBoundingClientRect().top };
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

function eventData(event) {
  return event?.args?.data ?? event?.args?.beginData ?? event?.args ?? {};
}

function firstDefined(objects, keys) {
  for (const object of objects) {
    if (!object || typeof object !== "object") continue;
    for (const key of keys) {
      const value = object[key];
      if (value !== undefined && value !== null && String(value).length) return value;
    }
  }
  return null;
}

function normalizeReason(item, data) {
  return String(
    firstDefined([item, data], ["reason", "invalidationReason", "cause", "change"]) ??
      "(none)",
  );
}

function normalizeNode(item, data) {
  const objects = [item, data];
  let node = String(firstDefined(objects, ["nodeName", "tagName", "element"]) ?? "(none)");
  const id = firstDefined(objects, ["id", "elementId", "domId"]);
  const classValue = firstDefined(objects, ["className", "class", "classList"]);
  if (id && !node.includes(`#${id}`) && !node.includes(`id='${id}'`) && !node.includes(`id=\"${id}\"`)) {
    node += `#${id}`;
  }
  if (classValue) {
    const classes = Array.isArray(classValue)
      ? classValue
      : String(classValue).trim().split(/\s+/).filter(Boolean);
    const suffix = classes.map((name) => `.${name}`).join("");
    if (suffix && !node.includes(suffix)) node += suffix;
  }
  return node.replace(/\s+/g, " ").trim();
}

function findStackTrace(item, data, event) {
  const candidates = [
    item?.stackTrace,
    item?.stack,
    data?.stackTrace,
    data?.stack,
    event?.args?.stackTrace,
    event?.args?.stack,
  ];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
    if (Array.isArray(candidate?.callFrames)) return candidate.callFrames;
  }
  return [];
}

function normalizeTopFrame(item, data, event) {
  const frames = findStackTrace(item, data, event);
  const frame = frames.find((entry) => entry && (entry.url || entry.functionName));
  if (!frame) return "(none)";
  const url = frame.url || "(anonymous-url)";
  const functionName = frame.functionName || "(anonymous)";
  const line = Number.isFinite(frame.lineNumber) ? frame.lineNumber : "?";
  return `${url}:${functionName}:${line}`;
}

function invalidationRecords(event) {
  const data = eventData(event);
  const list = Array.isArray(data.invalidationList)
    ? data.invalidationList
    : Array.isArray(data.invalidations)
      ? data.invalidations
      : [data];
  return list.map((item) => ({
    eventName: event.name,
    ts: event.ts,
    reason: normalizeReason(item, data),
    node: normalizeNode(item, data),
    topFrame: normalizeTopFrame(item, data, event),
  }));
}

function nearestPrecedingReason(invalidations, timestamp) {
  for (let i = invalidations.length - 1; i >= 0; i--) {
    const record = invalidations[i];
    if (record.ts <= timestamp && record.reason !== "(none)") return record;
  }
  return null;
}

function summarizeTrace(tracePath) {
  const parsed = JSON.parse(fs.readFileSync(tracePath, "utf8"));
  const events = Array.isArray(parsed) ? parsed : parsed.traceEvents || [];
  const invalidationEvents = events
    .filter((event) => INVALIDATION_EVENT_NAMES.has(event.name) && Number.isFinite(event.ts))
    .sort((a, b) => a.ts - b.ts);
  const invalidations = invalidationEvents
    .flatMap(invalidationRecords)
    .sort((a, b) => a.ts - b.ts);

  const groups = new Map();
  for (const record of invalidations) {
    const key = JSON.stringify([record.reason, record.node, record.topFrame]);
    let group = groups.get(key);
    if (!group) {
      group = {
        reason: record.reason,
        node: record.node,
        topFrame: record.topFrame,
        count: 0,
        eventNames: new Set(),
      };
      groups.set(key, group);
    }
    group.count += 1;
    group.eventNames.add(record.eventName);
  }
  const topInvalidationGroups = [...groups.values()]
    .map((group) => ({
      count: group.count,
      reason: group.reason,
      node: group.node,
      topFrame: group.topFrame,
      eventNames: [...group.eventNames].sort(),
    }))
    .sort(
      (a, b) =>
        b.count - a.count ||
        a.reason.localeCompare(b.reason) ||
        a.node.localeCompare(b.node) ||
        a.topFrame.localeCompare(b.topFrame),
    )
    .slice(0, 20);

  const updateEvents = events
    .filter(
      (event) =>
        event.name === "UpdateLayoutTree" &&
        event.ph === "X" &&
        Number.isFinite(event.ts) &&
        Number.isFinite(event.dur),
    )
    .sort((a, b) => a.ts - b.ts);
  const updateLayoutTreeTotalMs = updateEvents.reduce((sum, event) => sum + event.dur, 0) / 1000;
  const updatesOver5Ms = updateEvents
    .filter((event) => event.dur > 5000)
    .map((event) => {
      const nearest = nearestPrecedingReason(invalidations, event.ts);
      return {
        durationMs: round(event.dur / 1000),
        elementCount: event.args?.elementCount ?? eventData(event).elementCount ?? null,
        nearestReason: nearest?.reason ?? "(none)",
        nearestNode: nearest?.node ?? "(none)",
        nearestEvent: nearest?.eventName ?? "(none)",
        deltaMs: nearest ? round((event.ts - nearest.ts) / 1000) : null,
      };
    });

  const invalidationEventCounts = Object.fromEntries(
    [...INVALIDATION_EVENT_NAMES]
      .sort()
      .map((name) => [name, invalidationEvents.filter((event) => event.name === name).length]),
  );

  return {
    traceEventCount: events.length,
    invalidationEventCounts,
    expandedInvalidationCount: invalidations.length,
    topInvalidationGroups,
    updateLayoutTreeCount: updateEvents.length,
    updateLayoutTreeTotalMs: round(updateLayoutTreeTotalMs),
    updatesOver5Ms,
  };
}

function formatRunSummary(result) {
  const lines = [
    `=== condition=${result.condition} run=${result.run} ===`,
    `url=${result.url}`,
    `viewport=390x844 dpr=3 mobile=true touch=true`,
    `cpuThrottle=${result.cpu}`,
    `target=${result.target}`,
    `gesture=manual-CDP-touch x=${GESTURE_X} y=${GESTURE_Y} speed=${GESTURE_SPEED}px/s`,
    `gestureCount=${result.gestureCount}`,
    `scrollDurationMs=${result.scrollDurationMs}`,
    `pointerEventsRuleInjected=${result.pointerEventsRuleInjected}`,
    `pointerEventsAtGesturePoint=${result.pointerEventsAtGesturePoint}`,
    `traceEventCount=${result.traceEventCount}`,
    `invalidationEventCounts=${JSON.stringify(result.invalidationEventCounts)}`,
    `expandedInvalidationCount=${result.expandedInvalidationCount}`,
    `UpdateLayoutTree count=${result.updateLayoutTreeCount}`,
    `UpdateLayoutTree total ms=${result.updateLayoutTreeTotalMs}`,
    "Invalidation groups top 20:",
  ];
  if (!result.topInvalidationGroups.length) lines.push("(none)");
  result.topInvalidationGroups.forEach((group, index) => {
    lines.push(
      `${index + 1}. count=${group.count} | reason=${group.reason} | node=${group.node} | ` +
        `stack=${group.topFrame} | events=${group.eventNames.join(",")}`,
    );
  });
  lines.push("UpdateLayoutTree events over 5 ms:");
  if (!result.updatesOver5Ms.length) lines.push("(none)");
  result.updatesOver5Ms.forEach((update, index) => {
    lines.push(
      `${index + 1}. durationMs=${update.durationMs} | elementCount=${update.elementCount ?? "(none)"} | ` +
        `nearestReason=${update.nearestReason} | nearestNode=${update.nearestNode} | ` +
        `nearestEvent=${update.nearestEvent} | deltaMs=${update.deltaMs ?? "(none)"}`,
    );
  });
  lines.push("");
  return lines.join("\n");
}

async function runOnce(options, runIndex) {
  const condition = options.noHoverEmulation ? "pointer-events-none" : "baseline";
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  let tracePath = null;
  try {
    const page = await browser.newPage();
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

    await page.goto(options.url, { waitUntil: "load", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await sleep(POST_LOAD_MS);

    const liveness = await page.evaluate(() => {
      const wrapper = document.querySelector('[data-mode="cw"]');
      if (!wrapper) return { ok: false, reason: 'no [data-mode="cw"] element' };
      const bg = getComputedStyle(wrapper).getPropertyValue("--cw-bg").trim();
      return { ok: bg.length > 0, reason: bg.length > 0 ? null : "--cw-bg is empty", bg };
    });
    if (!liveness.ok) throw new Error(`LIVENESS FAIL: ${liveness.reason}`);

    if (options.noHoverEmulation) {
      await page.addStyleTag({ content: "* { pointer-events: none !important; }" });
    }
    const pointerEventsAtGesturePoint = await page.evaluate(
      ({ x, y }) => {
        const element = document.elementFromPoint(x, y);
        return element ? getComputedStyle(element).pointerEvents : "(no element)";
      },
      { x: GESTURE_X, y: GESTURE_Y },
    );

    const targetSelector = await resolveTargetSelector(page, options.to);
    const traceName = `invalidation-${condition}.run${runIndex}.trace.json`;
    tracePath = path.join(path.dirname(options.out), traceName);
    await page.tracing.start({ path: tracePath, categories: TRACE_CATEGORIES });
    const scroll = await scrollToTarget(page, session, targetSelector);
    await page.tracing.stop();

    // Keep the original post-scroll settle behavior outside the trace window.
    await sleep(SETTLE_MS);

    const traceSummary = summarizeTrace(tracePath);
    await session.detach().catch(() => {});
    await page.close().catch(() => {});

    return {
      condition,
      run: runIndex,
      url: options.url,
      cpu: options.cpu,
      target: targetSelector,
      gestureCount: scroll.gestureCount,
      scrollDurationMs: round(scroll.scrollDurationMs),
      pointerEventsRuleInjected: options.noHoverEmulation,
      pointerEventsAtGesturePoint,
      ...traceSummary,
    };
  } finally {
    await browser.close().catch(() => {});
    if (tracePath && fs.existsSync(tracePath)) fs.unlinkSync(tracePath);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options.valid) {
    usage();
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(options.out), { recursive: true });
  if (!options.append) fs.writeFileSync(options.out, "", "utf8");

  for (let runIndex = 1; runIndex <= options.runs; runIndex++) {
    console.log(
      `Starting ${options.noHoverEmulation ? "pointer-events-none" : "baseline"} run ${runIndex}/${options.runs}`,
    );
    const result = await runOnce(options, runIndex);
    const summary = formatRunSummary(result);
    process.stdout.write(`${summary}\n`);
    fs.appendFileSync(options.out, `${summary}\n`, "utf8");
  }
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
