// Pass-118a performance diagnosis: CDP layout-shift and LCP measurements.
// Usage: node .planning/exec/perf118a.mjs [--bite] [--q1] [--q2]
//        [--loads N] [--base URL]
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";

const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUTPUT_DIR = ".planning/qa/pass-118a";
const OUTPUT_FILE = `${OUTPUT_DIR}/probe.json`;
const CONDITIONS = ["A", "B", "C", "D"];
const NOT_REPORTED = "not reported";

function usage() {
  console.log(
    "Usage: node .planning/exec/perf118a.mjs [--bite] [--q1] [--q2] [--loads N] [--base URL]",
  );
}

function parseArgs(argv) {
  const options = {
    bite: false,
    q1: false,
    q2: false,
    loads: null,
    base: "https://www.micahjonesconsulting.com",
    valid: true,
  };

  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index];
    if (argument === "--bite") options.bite = true;
    else if (argument === "--q1") options.q1 = true;
    else if (argument === "--q2") options.q2 = true;
    else if (argument === "--loads") {
      const value = Number(argv[++index]);
      if (!Number.isInteger(value) || value < 1) options.valid = false;
      else options.loads = value;
    } else if (argument === "--base") {
      const value = argv[++index];
      if (!value || value.startsWith("--")) options.valid = false;
      else options.base = value;
    } else options.valid = false;
  }

  options.base = options.base.replace(/\/$/, "");
  return options;
}

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function round(value, places = 3) {
  if (!Number.isFinite(value)) return NOT_REPORTED;
  const scale = 10 ** places;
  return Math.round(value * scale) / scale;
}

function median(values) {
  const sorted = values.filter(Number.isFinite).sort((left, right) => left - right);
  if (!sorted.length) return NOT_REPORTED;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

function attributeMap(attributes = []) {
  const result = new Map();
  for (let index = 0; index < attributes.length; index += 2) {
    result.set(attributes[index], attributes[index + 1]);
  }
  return result;
}

function describeNodeName(node) {
  const tag = (node.localName || node.nodeName || "node").toLowerCase();
  const attributes = attributeMap(node.attributes);
  const id = attributes.get("id");
  const classes = (attributes.get("class") || "").trim().split(/\s+/).filter(Boolean);
  return `${tag}${id ? `#${id}` : ""}${classes.map((name) => `.${name}`).join("")}`;
}

async function configurePage(page, session, condition, bite) {
  if (condition === "B") {
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const url = request.url();
      const action = url.includes(".woff2") || url.includes(".woff")
        ? request.abort()
        : request.continue();
      action.catch(() => {});
    });
  }
  if (condition === "C") await page.setJavaScriptEnabled(false);
  if (condition === "D") {
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
  }

  if (condition !== "C") {
    await page.evaluateOnNewDocument(() => {
      globalThis.__perf118a = { classTime: null, fontsTime: null };
      const observer = new MutationObserver((mutations) => {
        if (globalThis.__perf118a.classTime !== null) return;
        for (const mutation of mutations) {
          if (mutation.target?.classList?.contains("cw-js-reveals")) {
            globalThis.__perf118a.classTime = performance.now();
            observer.disconnect();
            break;
          }
        }
      });
      observer.observe(document, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class"],
      });
      document.addEventListener("DOMContentLoaded", () => {
        document.fonts.ready.then(() => {
          if (globalThis.__perf118a.fontsTime === null) {
            globalThis.__perf118a.fontsTime = performance.now();
          }
        });
      }, { once: true });
    });
  }

  if (bite) {
    await page.evaluateOnNewDocument(() => {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
          const main = document.querySelector("main");
          if (!main) return;
          const block = document.createElement("div");
          block.id = "perf118a-bite";
          block.style.height = "200px";
          main.insertBefore(block, main.firstChild);
        }, 800);
      }, { once: true });
    });
  }

  await session.send("Emulation.setDeviceMetricsOverride", {
    width: 412,
    height: 823,
    deviceScaleFactor: 1.75,
    mobile: true,
  });
  await session.send("Emulation.setTouchEmulationEnabled", {
    enabled: true,
    maxTouchPoints: 1,
  });
  await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await session.send("Network.enable");
  await session.send("Network.setCacheDisabled", { cacheDisabled: true });
  await session.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: 1.6 * 1024 * 1024 / 8,
    uploadThroughput: 750 * 1024 / 8,
  });
}

async function resolveNodeNames(session, events) {
  const nodeIds = new Set();
  for (const event of events) {
    if (event.lcpDetails?.nodeId) nodeIds.add(event.lcpDetails.nodeId);
    for (const source of event.layoutShiftDetails?.sources || []) {
      if (source.nodeId) nodeIds.add(source.nodeId);
    }
  }

  const names = new Map();
  for (const backendNodeId of nodeIds) {
    try {
      const { node } = await session.send("DOM.describeNode", { backendNodeId });
      names.set(backendNodeId, describeNodeName(node));
    } catch {
      names.set(backendNodeId, NOT_REPORTED);
    }
  }
  return names;
}

function relativeTime(seconds, origin) {
  if (!Number.isFinite(seconds) || seconds === 0) return NOT_REPORTED;
  return round(seconds * 1000 - origin);
}

function buildRecord(load, events, nodeNames, origin, pageTimes) {
  const shifts = events
    .filter((event) => event.type === "layout-shift" && event.layoutShiftDetails)
    .map((event) => {
      const details = event.layoutShiftDetails;
      return {
        value: details.value,
        time: relativeTime(event.time, origin),
        hadRecentInput: details.hadRecentInput,
        sources: (details.sources || []).map((source) => {
          const previousRect = source.previousRect;
          const currentRect = source.currentRect;
          return {
            nodeName: source.nodeId
              ? nodeNames.get(source.nodeId) || NOT_REPORTED
              : NOT_REPORTED,
            previousRect,
            currentRect,
            dy: round(currentRect.y - previousRect.y),
            dh: round(currentRect.height - previousRect.height),
          };
        }),
      };
    });

  const cls = shifts
    .filter((shift) => !shift.hadRecentInput)
    .reduce((total, shift) => total + shift.value, 0);
  const lcpEvents = events.filter(
    (event) => event.type === "largest-contentful-paint" && event.lcpDetails,
  );
  const lastLcp = lcpEvents.at(-1);
  const lcpDetails = lastLcp?.lcpDetails;
  const lcpTimestamp = lcpDetails
    ? (lcpDetails.renderTime || lcpDetails.loadTime)
    : 0;

  return {
    load,
    cls: round(cls, 6),
    shifts,
    lcp: lcpDetails
      ? {
          time: relativeTime(lcpTimestamp, origin),
          size: lcpDetails.size,
          nodeName: lcpDetails.nodeId
            ? nodeNames.get(lcpDetails.nodeId) || NOT_REPORTED
            : NOT_REPORTED,
        }
      : { time: NOT_REPORTED, size: NOT_REPORTED, nodeName: NOT_REPORTED },
    classTime: pageTimes.classTime,
    fontsTime: pageTimes.fontsTime,
  };
}

async function measureLoad(browser, base, path, condition, load, bite = false) {
  const context = await browser.createBrowserContext();
  let page;
  let session;
  try {
    page = await context.newPage();
    session = await page.createCDPSession();
    const events = [];
    const onTimelineEvent = ({ event }) => events.push(event);
    session.on("PerformanceTimeline.timelineEventAdded", onTimelineEvent);

    await configurePage(page, session, condition, bite);
    await session.send("PerformanceTimeline.enable", {
      eventTypes: ["layout-shift", "largest-contentful-paint"],
    });
    events.length = 0;
    const gotoStartedAt = Date.now();
    await page.goto(`${base}${path}`, { waitUntil: "load", timeout: 90000 });
    await sleep(6000);

    session.off("PerformanceTimeline.timelineEventAdded", onTimelineEvent);
    const pageTimes = condition === "C"
      ? { classTime: NOT_REPORTED, fontsTime: NOT_REPORTED }
      : await page.evaluate(() => ({
          classTime: globalThis.__perf118a?.classTime ?? "not reported",
          fontsTime: globalThis.__perf118a?.fontsTime ?? "not reported",
        }));
    const origin = condition === "C"
      ? gotoStartedAt
      : await page.evaluate(() => performance.timeOrigin);
    const nodeNames = await resolveNodeNames(session, events);
    return buildRecord(load, events, nodeNames, origin, pageTimes);
  } finally {
    if (session) {
      try {
        await session.detach();
      } catch {}
    }
    try {
      if (page && !page.isClosed()) await page.close();
    } finally {
      await context.close();
    }
  }
}

function topShift(records) {
  let top = null;
  for (const record of records) {
    if (!Number.isFinite(record.cls)) continue;
    for (const shift of record.shifts) {
      if (shift.hadRecentInput) continue;
      if (!top || shift.value > top.shift.value) top = { record, shift };
    }
  }
  return top;
}

function nearTiming(record, shift) {
  const candidates = [
    ["class", record.classTime],
    ["fonts", record.fontsTime],
  ]
    .filter(([, time]) => Number.isFinite(time) && Number.isFinite(shift.time))
    .map(([name, time]) => [name, Math.abs(shift.time - time)])
    .filter(([, distance]) => distance <= 100)
    .sort((left, right) => left[1] - right[1]);
  return candidates[0]?.[0] || "none";
}

function formatNumber(value, places) {
  return Number.isFinite(value) ? value.toFixed(places) : NOT_REPORTED;
}

function printConditionSummary(question, condition, records) {
  const good = records.filter((record) => Number.isFinite(record.cls));
  const clsValues = good.map((record) => record.cls).sort((a, b) => a - b);
  const lcpValues = good.map((record) => record.lcp.time).filter(Number.isFinite);
  const top = topShift(good);
  const source = top?.shift.sources[0];
  const clsSummary = clsValues.length
    ? `${formatNumber(clsValues[0], 3)}/${formatNumber(median(clsValues), 3)}/${formatNumber(clsValues.at(-1), 3)}`
    : `${NOT_REPORTED}/${NOT_REPORTED}/${NOT_REPORTED}`;
  console.log(
    `${question} ${condition} loads=${records.length} cls min/med/max=${clsSummary}`
      + ` over0.05=${good.filter((record) => record.cls > 0.05).length}`
      + ` lcp med=${Number.isFinite(median(lcpValues)) ? Math.round(median(lcpValues)) : NOT_REPORTED}`
      + ` top-shift=${source?.nodeName || NOT_REPORTED}`
      + ` dy=${Number.isFinite(source?.dy) ? source.dy : NOT_REPORTED}`
      + ` dh=${Number.isFinite(source?.dh) ? source.dh : NOT_REPORTED}`
      + ` t=${Number.isFinite(top?.shift.time) ? Math.round(top.shift.time) : NOT_REPORTED}`
      + ` near=${top ? nearTiming(top.record, top.shift) : "none"}`,
  );
}

async function runCondition(browser, probe, state, question, path, condition, loads) {
  const records = [];
  for (let load = 1; load <= loads; load++) {
    try {
      const record = await measureLoad(browser, probe.base, path, condition, load);
      records.push(record);
      state.consecutiveErrors = 0;
      console.log(
        `${question} ${condition} ${load}/${loads} cls=${formatNumber(record.cls, 3)}`
          + ` lcp=${Number.isFinite(record.lcp.time) ? Math.round(record.lcp.time) : NOT_REPORTED}`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      records.push({ load, error: message });
      state.consecutiveErrors++;
      console.log(`${question} ${condition} ${load}/${loads} cls=ERROR lcp=ERROR`);
      if (state.consecutiveErrors >= 3) {
        throw new Error(`Three loads threw in a row; latest error: ${message}`, { cause: error });
      }
    }
  }
  probe.conditions[`${question}-${condition}`] = records;
  writeFileSync(OUTPUT_FILE, `${JSON.stringify(probe, null, 2)}\n`);
  printConditionSummary(question, condition, records);
}

async function runBite(browser, base) {
  const records = [];
  let consecutiveErrors = 0;
  let fatalError = null;
  for (let load = 1; load <= 3; load++) {
    try {
      const record = await measureLoad(browser, base, "/", "A", load, true);
      records.push(record);
      consecutiveErrors = 0;
      const source = topShift([record])?.shift.sources[0]?.nodeName || NOT_REPORTED;
      console.log(`bite load ${load}: cls=${formatNumber(record.cls, 3)} top-source=${source}`);
    } catch (error) {
      consecutiveErrors++;
      const message = error instanceof Error ? error.message : String(error);
      records.push({ load, error: message });
      console.log(`bite load ${load}: cls=ERROR top-source=${NOT_REPORTED}`);
      if (consecutiveErrors >= 3) {
        fatalError = new Error(`Three loads threw in a row; latest error: ${message}`, {
          cause: error,
        });
        break;
      }
    }
  }
  const passed = records.length === 3 && records.every((record) => record.cls > 0.1);
  if (fatalError) console.error(fatalError.stack);
  console.log(`bite: ${passed ? "PASS" : "FAIL"}`);
  return passed;
}

async function run(options) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  try {
    if (options.bite) return await runBite(browser, options.base);

    mkdirSync(OUTPUT_DIR, { recursive: true });
    const probe = {
      base: options.base,
      startedAt: new Date().toISOString(),
      conditions: {},
    };
    const state = { consecutiveErrors: 0 };
    if (options.q1) {
      const loads = options.loads ?? 10;
      for (const condition of CONDITIONS) {
        await runCondition(browser, probe, state, "q1", "/", condition, loads);
      }
    }
    if (options.q2) {
      const loads = options.loads ?? 5;
      for (const condition of CONDITIONS) {
        await runCondition(browser, probe, state, "q2", "/services", condition, loads);
      }
    }
    return true;
  } finally {
    await browser.close();
  }
}

const options = parseArgs(process.argv.slice(2));
if (!options.valid || (!options.bite && !options.q1 && !options.q2)) {
  usage();
} else {
  try {
    const passed = await run(options);
    if (!passed) process.exitCode = 1;
  } catch (error) {
    console.error(error instanceof Error ? error.stack : error);
    process.exitCode = 1;
  }
}
