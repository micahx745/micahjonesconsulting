import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");
const axeSource = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const root = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(root, "../../../..");
const markerPath = path.join(workspace, ".planning", "exec", "card1-124-markers.sh");
const beforeUrl = "https://www.micahjonesconsulting.com/";
const afterUrl = "http://localhost:3241/";
const widths = [390, 1440];

const present = [
  "It works.",
  "It just does not sell.",
  "I shape the product and build the message that sells it.",
  "I have $20M+ in revenue behind my work.",
  "An agency is too broad. A hire is too early.",
  "I build what your growing business needs next",
  "How I work.",
  "Week one is an audit and a scope.",
  "I name the trade-offs before I build.",
  "I build the real thing, not a prototype.",
  "I stay for launch and what customers",
  "See the work",
  "In revenue behind my work",
  "Four exits I worked inside",
  "Name the problem",
];

const absent = [
  "I take AI-built",
  "demo to production",
  "Too big for duct tape",
  "Operating principles",
  "The story comes first",
  "I step in as the operator",
  "Make it sell",
  "Labor support",
  "Bodywork",
];

const asciiJson = (value) =>
  JSON.stringify(value, null, 2).replace(
    /[^\x00-\x7f]/g,
    (character) =>
      `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`,
  ) + "\n";

const normalize = (text) => text.replace(/\s+/g, " ").trim();

const countInsensitive = (text, phrase) => {
  const haystack = normalize(text).toLowerCase();
  const needle = normalize(phrase).toLowerCase();
  let count = 0;
  let offset = 0;
  while (true) {
    const found = haystack.indexOf(needle, offset);
    if (found < 0) return count;
    count += 1;
    offset = found + needle.length;
  }
};

const addObservers = async (page) => {
  await page.evaluateOnNewDocument(() => {
    const rect = (value) =>
      value
        ? {
            x: value.x,
            y: value.y,
            width: value.width,
            height: value.height,
          }
        : null;
    const selector = (node) => {
      const element =
        node instanceof Element
          ? node
          : node?.parentElement instanceof Element
            ? node.parentElement
            : null;
      if (!element) return null;
      if (element.id) return `#${CSS.escape(element.id)}`;
      const classes = [...element.classList].filter(Boolean).slice(0, 4);
      if (classes.length) {
        return `${element.tagName.toLowerCase()}.${classes.map((name) => CSS.escape(name)).join(".")}`;
      }
      const parts = [];
      let current = element;
      while (current instanceof Element && parts.length < 5) {
        let part = current.tagName.toLowerCase();
        if (current.parentElement) {
          const siblings = [...current.parentElement.children].filter(
            (entry) => entry.tagName === current.tagName,
          );
          if (siblings.length > 1) {
            part += `:nth-of-type(${siblings.indexOf(current) + 1})`;
          }
        }
        parts.unshift(part);
        current = current.parentElement;
      }
      return parts.join(" > ");
    };
    const sourceSelector = (source) => {
      const direct = selector(source.node);
      if (direct) return direct;
      const bounds = source.currentRect;
      if (!bounds || bounds.width <= 0 || bounds.height <= 0) return null;
      const center = document.elementFromPoint(
        bounds.x + bounds.width / 2,
        bounds.y + bounds.height / 2,
      );
      return selector(center);
    };

    globalThis.__p124LayoutShifts = [];
    globalThis.__p124Lcp = [];

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        globalThis.__p124LayoutShifts.push({
          value: entry.value,
          startTime: entry.startTime,
          hadRecentInput: entry.hadRecentInput,
          sources: (entry.sources ?? []).map((source) => ({
            selector: sourceSelector(source),
            previousRect: rect(source.previousRect),
            currentRect: rect(source.currentRect),
          })),
        });
      }
    }).observe({ type: "layout-shift", buffered: true });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        globalThis.__p124Lcp.push({
          startTime: entry.startTime,
          renderTime: entry.renderTime,
          loadTime: entry.loadTime,
          size: entry.size,
          selector: selector(entry.element),
          tag: entry.element?.tagName?.toLowerCase() ?? null,
          text: entry.element?.textContent?.replace(/\s+/g, " ").trim().slice(0, 240) ?? null,
          url: entry.url || null,
        });
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
};

const makePage = async (browser, width, cpuRate = 1) => {
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await addObservers(page);
  if (cpuRate !== 1) {
    const client = await page.createCDPSession();
    await client.send("Emulation.setCPUThrottlingRate", { rate: cpuRate });
  }
  return page;
};

const visit = async (page, url) => {
  const response = await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 120000,
  });
  if (!response?.ok()) {
    throw new Error(`navigation failed: ${url} status=${response?.status()}`);
  }
  await page.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(1, Math.floor(window.innerHeight * 0.75));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 750));
  });
};

const layoutAndGap = async (page) =>
  page.evaluate(() => {
    const audit = document.querySelector("#home-audit");
    const heading = document.querySelector("#cw-howiwork-title");
    if (!audit || !heading) {
      throw new Error(
        `gap selectors missing: audit=${Boolean(audit)} heading=${Boolean(heading)}`,
      );
    }
    const auditRect = audit.getBoundingClientRect();
    const headingRect = heading.getBoundingClientRect();
    const entries = globalThis.__p124LayoutShifts ?? [];
    return {
      layoutShift: {
        totalIncludingRecentInput: entries.reduce(
          (sum, entry) => sum + entry.value,
          0,
        ),
        entries,
      },
      auditGap: {
        pixels: headingRect.top - auditRect.bottom,
        auditBottom: auditRect.bottom + window.scrollY,
        howIWorkTop: headingRect.top + window.scrollY,
        auditSelector: "#home-audit",
        headingSelector: "#cw-howiwork-title",
      },
    };
  });

const axeSummary = async (page) => {
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async () => {
    const results = await globalThis.axe.run(document);
    const summarize = (impact) => {
      const rules = results.violations.filter(
        (violation) => violation.impact === impact,
      );
      return {
        violations: rules.length,
        nodes: rules.reduce(
          (total, violation) => total + violation.nodes.length,
          0,
        ),
        rules: rules.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.length,
        })),
      };
    };
    return {
      serious: summarize("serious"),
      critical: summarize("critical"),
    };
  });
};

const markerBite = (label, innerText) => {
  const shell = [
    "sf=0",
    "chk () { if eval \"$3\"; then echo \"  PASS $1: got $2\"; else echo \"  FAIL $1: got $2 (want $4)\"; sf=$((sf+1)); fi; }",
    "cnt () { printf '%s' \"$1\" | grep -o -F -- \"$2\" | wc -l | tr -d ' '; }",
    `source '${markerPath.replaceAll("\\", "/")}'`,
    "echo \"FAILURES: $sf\"",
    "exit $sf",
  ].join("\n");
  const run = spawnSync("bash", ["-c", shell], {
    encoding: "utf8",
    env: { ...process.env, HV: normalize(innerText) },
  });
  const output = `${run.stdout ?? ""}${run.stderr ?? ""}`;
  const passCount = (output.match(/^  PASS /gm) ?? []).length;
  const failCount = (output.match(/^  FAIL /gm) ?? []).length;
  return {
    label,
    exitCode: run.status,
    passCount,
    failCount,
    output: output.trimEnd(),
  };
};

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
  ignoreDefaultArgs: ["--hide-scrollbars"],
});

const results = {
  urls: { before: beforeUrl, after: afterUrl },
  reducedMotion: true,
  fullPageScreenshots: true,
  widths: {},
  text: {},
  markerBite: {},
  lcp390Cpu4x: null,
};

let beforeText = "";
let afterText = "";

try {
  for (const width of widths) {
    const beforePage = await makePage(browser, width);
    await visit(beforePage, beforeUrl);
    await beforePage.screenshot({
      path: path.join(root, `before-${width}.png`),
      fullPage: true,
      type: "png",
    });
    if (width === 1440) {
      beforeText = await beforePage.evaluate(() => document.body.innerText);
    }
    await beforePage.close();

    const afterPage = await makePage(browser, width);
    await visit(afterPage, afterUrl);
    await afterPage.screenshot({
      path: path.join(root, `after-${width}.png`),
      fullPage: true,
      type: "png",
    });
    if (width === 1440) {
      afterText = await afterPage.evaluate(() => document.body.innerText);
    }
    const measured = await layoutAndGap(afterPage);
    results.widths[String(width)] = {
      axe: await axeSummary(afterPage),
      ...measured,
    };
    await afterPage.close();
  }

  const normalizedAfter = normalize(afterText);
  const mojibakeMatches = normalizedAfter.match(/[A-Za-z][?\uFFFD][a-z]/g) ?? [];
  results.text = {
    present: Object.fromEntries(
      present.map((phrase) => [phrase, countInsensitive(afterText, phrase)]),
    ),
    absent: Object.fromEntries(
      absent.map((phrase) => [phrase, countInsensitive(afterText, phrase)]),
    ),
    mojibakePattern: "[A-Za-z][?\\uFFFD][a-z]",
    mojibakeCount: mojibakeMatches.length,
    mojibakeMatches,
  };

  results.markerBite.after = markerBite("after", afterText);
  results.markerBite.production = markerBite("production", beforeText);

  const lcpPage = await makePage(browser, 390, 4);
  const lcpResponse = await lcpPage.goto(afterUrl, {
    waitUntil: "networkidle2",
    timeout: 120000,
  });
  if (!lcpResponse?.ok()) {
    throw new Error(`LCP navigation failed: status=${lcpResponse?.status()}`);
  }
  await lcpPage.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((resolve) => setTimeout(resolve, 3000));
  });
  results.lcp390Cpu4x = await lcpPage.evaluate(() => {
    const entries = globalThis.__p124Lcp ?? [];
    return {
      throttleRate: 4,
      entryCount: entries.length,
      largest: entries.at(-1) ?? null,
      entries,
    };
  });
  await lcpPage.close();
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(root, "results.json"), asciiJson(results), "utf8");
console.log(asciiJson(results));
