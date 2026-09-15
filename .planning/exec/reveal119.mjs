// Pass-119 gate: GSAP arrives after load and all five home title reveals remain correct.
// Usage: node .planning/exec/reveal119.mjs [base]
import { createRequire } from "node:module";

const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = (process.argv[2] || "http://localhost:3200").replace(/\/$/, "");
const TITLE_IDS = [
  "cw-offer-title",
  "cw-howiwork-title",
  "cw-products-title",
  "cw-ordani-title",
  "cw-build-title",
];
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

let failures = 0;
function report(id, passed, details) {
  console.log(`${passed ? "PASS" : "FAIL"} ${id}: ${details}`);
  if (!passed) failures++;
}

function urlTail(url) {
  try {
    return new URL(url).pathname.split("/").filter(Boolean).at(-1) || "/";
  } catch {
    return url;
  }
}

async function freshPage(browser, motion, configure, measure) {
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    await page.setViewport({
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      isMobile: false,
    });
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: motion },
    ]);
    const configured = configure ? await configure(page) : undefined;
    return await measure(page, configured);
  } finally {
    await context.close();
  }
}

async function checkR1(browser) {
  const result = await freshPage(browser, "no-preference", async (page) => {
    const responseReads = [];
    page.on("response", (response) => {
      const url = response.url();
      let isJavaScript = false;
      try {
        isJavaScript = new URL(url).pathname.endsWith(".js");
      } catch {}
      if (!isJavaScript) return;

      const arrivedAt = Date.now();
      responseReads.push(
        response
          .text()
          .then((body) =>
            body.includes("GreenSock") ? { url, arrivedAt } : null,
          )
          .catch(() => null),
      );
    });
    return responseReads;
  }, async (page, responseReads) => {
    await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 60000 });
    const timing = await page.evaluate(() => ({
      navigationStart: performance.timing.navigationStart,
      loadEventEnd: performance.timing.loadEventEnd - performance.timing.navigationStart,
    }));
    await sleep(5000);

    const gsapResponses = [];
    let readIndex = 0;
    while (readIndex < responseReads.length) {
      const batch = responseReads.slice(readIndex);
      readIndex = responseReads.length;
      gsapResponses.push(...(await Promise.all(batch)).filter(Boolean));
    }
    const arrivals = gsapResponses
      .filter((response) => response.arrivedAt >= timing.navigationStart)
      .map((response) => ({
        url: response.url,
        time: response.arrivedAt - timing.navigationStart,
      }))
      .sort((left, right) => left.time - right.time);
    const passed =
      arrivals.length > 0 &&
      arrivals.every((response) => response.time >= timing.loadEventEnd) &&
      arrivals.some((response) => response.time <= timing.loadEventEnd + 5000);
    const responses = arrivals.length
      ? arrivals.map((response) => `${Math.round(response.time)}ms ${urlTail(response.url)}`).join(", ")
      : "none";
    return {
      passed,
      details: `loadEventEnd=${Math.round(timing.loadEventEnd)}ms gsap=${responses}`,
    };
  });
  return result;
}

async function scrollTitle(page, id) {
  return page.evaluate((titleId) => {
    const title = document.getElementById(titleId);
    if (!title) return false;
    title.scrollIntoView({ block: "center" });
    return true;
  }, id);
}

async function titleStates(page, includeMotion) {
  return page.evaluate((ids, inspectMotion) =>
    ids.map((id) => {
      const title = document.getElementById(id);
      if (!title) return { id, exists: false, count: 0, bottom: null, bad: null };
      const chars = [...title.querySelectorAll(".cw-split__char")];
      let bad = null;
      if (inspectMotion) {
        for (let index = 0; index < chars.length; index++) {
          const style = getComputedStyle(chars[index]);
          let m42 = 0;
          if (style.transform !== "none") {
            try {
              m42 = new DOMMatrixReadOnly(style.transform).m42;
            } catch {
              m42 = Number.NaN;
            }
          }
          if (style.opacity !== "1" || !Number.isFinite(m42) || Math.abs(m42) > 0.5) {
            bad = { index, opacity: style.opacity, m42 };
            break;
          }
        }
      }
      return {
        id,
        exists: true,
        count: chars.length,
        bottom: title.getBoundingClientRect().bottom,
        bad,
      };
    }),
  TITLE_IDS, includeMotion);
}

function formatR2(states) {
  return states.map((state) => {
    if (!state.exists) return `${state.id} chars=missing`;
    if (!state.bad) return `${state.id} chars=${state.count} bad=none`;
    const m42 = Number.isFinite(state.bad.m42) ? state.bad.m42.toFixed(3) : "NaN";
    return `${state.id} chars=${state.count} bad=#${state.bad.index} opacity=${state.bad.opacity} m42=${m42}`;
  }).join("; ");
}

function formatCounts(states) {
  return states
    .map((state) => `${state.id} chars=${state.exists ? state.count : "missing"}`)
    .join("; ");
}

async function checkR2(browser) {
  return freshPage(browser, "no-preference", null, async (page) => {
    await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 60000 });
    try {
      await page.waitForSelector(`#${TITLE_IDS[0]} .cw-split__char`, { timeout: 6000 });
    } catch {}
    for (const id of TITLE_IDS) {
      await scrollTitle(page, id);
      await sleep(1500);
    }
    const states = await titleStates(page, true);
    return {
      passed: states.every((state) => state.exists && state.count > 0 && !state.bad),
      details: formatR2(states),
    };
  });
}

async function checkR3(browser) {
  return freshPage(browser, "reduce", null, async (page) => {
    await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 60000 });
    for (const id of TITLE_IDS) {
      await scrollTitle(page, id);
      await sleep(1500);
    }
    const states = await titleStates(page, false);
    return {
      passed: states.every((state) => state.exists && state.count === 0),
      details: formatCounts(states),
    };
  });
}

async function checkR4(browser) {
  return freshPage(browser, "no-preference", async (page) => {
    await page.evaluateOnNewDocument(() => {
      document.addEventListener("DOMContentLoaded", () => {
        window.scrollTo(0, document.documentElement.scrollHeight);
      }, { once: true });
    });
  }, async (page) => {
    await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 60000 });
    await sleep(4000);
    const states = await titleStates(page, false);
    const above = states.filter((state) => state.exists && state.bottom < 0);
    const details = states.map((state) => {
      const bottom = state.bottom === null ? "missing" : Math.round(state.bottom);
      return `${state.id} bottom=${bottom} chars=${state.exists ? state.count : "missing"}`;
    }).join("; ");
    return {
      passed:
        states.every((state) => state.exists) &&
        above.length > 0 &&
        above.every((state) => state.count === 0),
      details,
    };
  });
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  try {
    const result = await checkR1(browser);
    report("R1", result.passed, result.details);
  } catch (error) {
    report("R1", false, `error=${error instanceof Error ? error.message : error}`);
  }
  for (const [id, check] of [["R2", checkR2], ["R3", checkR3], ["R4", checkR4]]) {
    try {
      const result = await check(browser);
      report(id, result.passed, result.details);
    } catch (error) {
      report(id, false, `error=${error instanceof Error ? error.message : error}`);
    }
  }
} finally {
  await browser.close();
}
console.log(`reveal119 failures: ${failures}`);
process.exit(failures ? 1 : 0);
