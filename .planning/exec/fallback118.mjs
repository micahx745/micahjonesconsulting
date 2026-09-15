// Pass-118 tuner and gate for tuned fallback geometry.
// Usage: node .planning/exec/fallback118.mjs [--base URL]
//        node .planning/exec/fallback118.mjs --geometry --label before|after [--base URL]
//        node .planning/exec/fallback118.mjs --compare
//        node .planning/exec/fallback118.mjs --verify --label before|after [--base URL]
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUTPUT_DIR = ".planning/qa/pass-118";
const FALLBACK_FILE = `${OUTPUT_DIR}/fallback118.json`;
const geometryFile = (label) => `${OUTPUT_DIR}/geometry2-${label}.json`;
const verificationFile = (label) => `${OUTPUT_DIR}/verify2-${label}.json`;
const DEFAULT_BASE = "http://localhost:3200";
const SEARCH_ROUTES = ["/", "/services"];
const VERIFY_ROUTES = [
  "/",
  "/services",
  "/packages",
  "/about",
  "/work",
  "/contact",
  "/work/guardicore",
  "/call",
];
const VIEWPORTS = [
  { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
  { width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true },
  { width: 768, height: 1024, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
];
const COMMON_UNICODE_RANGE = [
  "U+0000-002F",
  "U+0031-00FF",
  "U+0131",
  "U+0152-0153",
  "U+02BB-02BC",
  "U+02C6",
  "U+02DA",
  "U+02DC",
  "U+0304",
  "U+0308",
  "U+0329",
  "U+2000-206F",
  "U+20AC",
  "U+2122",
  "U+2191",
  "U+2193",
  "U+2212",
  "U+2215",
  "U+FEFF",
  "U+FFFD",
  "U+0100-02BA",
  "U+02BD-02C5",
  "U+02C7-02CC",
  "U+02CE-02D7",
  "U+02DD-02FF",
  "U+1D00-1DBF",
  "U+1E00-1E9F",
  "U+1EF2-1EFF",
  "U+2020",
  "U+20A0-20AB",
  "U+20AD-20C0",
  "U+2113",
  "U+2C60-2C7F",
  "U+A720-A7FF",
  "U+0102-0103",
  "U+0110-0111",
  "U+0128-0129",
  "U+0168-0169",
  "U+01A0-01A1",
  "U+01AF-01B0",
  "U+0300-0301",
  "U+0303",
  "U+0309",
  "U+0323",
  "U+1EA0-1EF9",
];
const HANKEN_UNICODE_RANGE = [
  ...COMMON_UNICODE_RANGE,
  "U+0460-052F",
  "U+1C80-1C8A",
  "U+20B4",
  "U+2DE0-2DFF",
  "U+A640-A69F",
  "U+FE2E-FE2F",
];
const FACES = [
  {
    label: "Bricolage",
    realFamily: "Bricolage Grotesque",
    variable: "--font-bricolage",
    originalSize: 105.43,
    originalAscent: 88.21,
    originalDescent: 25.61,
    unicodeRange: COMMON_UNICODE_RANGE.join(", "),
  },
  {
    label: "Hanken",
    realFamily: "Hanken Grotesk",
    variable: "--font-hanken",
    originalSize: 100.94,
    originalAscent: 99.07,
    originalDescent: 30.02,
    unicodeRange: HANKEN_UNICODE_RANGE.join(", "),
  },
];
const JETBRAINS = {
  label: "JetBrains Mono",
  variable: "--font-jetbrains",
  family: "CandJetBrainsMono",
  source: 'local("Courier New")',
  loadSource: "Courier New",
  descriptors: {
    sizeAdjust: "100%",
    ascentOverride: "102%",
    descentOverride: "30%",
    lineGapOverride: "0%",
  },
};
const SWEEP = Array.from({ length: (11500 - 6000) / 25 + 1 }, (_, index) =>
  (6000 + index * 25) / 100,
);

class CandidateFaceLoadError extends Error {
  constructor(source) {
    super(`candidate face failed to load from local ${source}`);
    this.name = "CandidateFaceLoadError";
  }
}

function usage() {
  console.log(
    "Usage: node .planning/exec/fallback118.mjs [--base URL] | --geometry --label before|after [--base URL] | --compare | --verify --label before|after [--base URL]",
  );
}

function parseArgs(argv) {
  const options = {
    mode: "default",
    label: null,
    base: DEFAULT_BASE,
    valid: true,
  };
  const modes = [];

  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index];
    if (argument === "--geometry") modes.push("geometry");
    else if (argument === "--compare") modes.push("compare");
    else if (argument === "--verify") modes.push("verify");
    else if (argument === "--label") {
      const value = argv[++index];
      if (value !== "before" && value !== "after") options.valid = false;
      else options.label = value;
    } else if (argument === "--base") {
      const value = argv[++index];
      if (!value || value.startsWith("--")) options.valid = false;
      else options.base = value;
    } else options.valid = false;
  }

  if (modes.length > 1) options.valid = false;
  if (modes.length === 1) options.mode = modes[0];
  if (["geometry", "verify"].includes(options.mode) && !options.label) options.valid = false;
  if (!["geometry", "verify"].includes(options.mode) && options.label) options.valid = false;
  options.base = options.base.replace(/\/$/, "");
  return options;
}

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const sizeKey = (size) => size.toFixed(2);

function ensureOutputDir() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function candidateDescriptors(face, size) {
  return {
    sizeAdjust: `${size.toFixed(2)}%`,
    ascentOverride: `${(face.originalAscent * face.originalSize / size).toFixed(2)}%`,
    descentOverride: `${(face.originalDescent * face.originalSize / size).toFixed(2)}%`,
    lineGapOverride: "0%",
  };
}

function biteCandidateSpec(face) {
  return {
    label: face.label,
    variable: face.variable,
    family: `CandBite${face.label.replace(/\s+/g, "")}${Math.round(face.originalSize * 100)}`,
    loadSource: "Arial",
    sources: [
      {
        source: 'local("Arial")',
        descriptors: candidateDescriptors(face, face.originalSize),
      },
    ],
  };
}

function candidateSpec(face, size) {
  return {
    label: face.label,
    variable: face.variable,
    family: `Cand${face.label.replace(/\s+/g, "")}${Math.round(size * 100)}`,
    loadSource: "Arial",
    sources: [
      {
        source: 'local("Arial")',
        descriptors: candidateDescriptors(face, face.originalSize),
      },
      {
        source: 'local("Arial")',
        descriptors: {
          ...candidateDescriptors(face, size),
          unicodeRange: face.unicodeRange,
        },
      },
    ],
  };
}

function jetbrainsCandidateSpec() {
  return {
    label: JETBRAINS.label,
    variable: JETBRAINS.variable,
    family: JETBRAINS.family,
    loadSource: JETBRAINS.loadSource,
    sources: [
      {
        source: JETBRAINS.source,
        descriptors: JETBRAINS.descriptors,
      },
    ],
  };
}

async function preparePage(page, base, route, viewport, blockFonts = false) {
  await page.setViewport(viewport);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);

  if (blockFonts) {
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const url = request.url();
      const action = url.includes(".woff2") || url.includes(".woff")
        ? request.abort()
        : request.continue();
      action.catch(() => {});
    });
  }

  await page.goto(`${base}${route}`, { waitUntil: "load", timeout: 90000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo(0, 0);
  });
  await sleep(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function captureRealState(page) {
  return page.evaluate(() => {
    const structuralPath = (element) => {
      const parts = [];
      let current = element;
      while (current && current !== document.body) {
        let position = 1;
        let sibling = current.previousElementSibling;
        while (sibling) {
          if (sibling.tagName === current.tagName) position++;
          sibling = sibling.previousElementSibling;
        }
        parts.unshift(`${current.tagName.toLowerCase()}:nth-of-type(${position})`);
        current = current.parentElement;
      }
      return parts.length ? `body > ${parts.join(" > ")}` : "body";
    };
    const measure = ({ element, path, text, tagClass, hasOwnText }) => {
      const rect = element.getBoundingClientRect();
      const tenth = (value) => Math.round(value * 10) / 10;
      const record = {
        path,
        text,
        tagClass,
        top: tenth(rect.top),
        left: tenth(rect.left),
        width: tenth(rect.width),
        height: tenth(rect.height),
      };
      if (hasOwnText) {
        const range = document.createRange();
        range.selectNodeContents(element);
        record.lines = new Set(
          [...range.getClientRects()]
            .filter((rangeRect) => rangeRect.width > 0.5)
            .map((rangeRect) => Math.round(rangeRect.top)),
        ).size;
      }
      return record;
    };

    const membership = [];
    for (const element of [document.body, ...document.body.querySelectorAll("*")]) {
      const directText = [...element.childNodes]
        .filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
        .map((node) => node.textContent.trim())
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      const rect = element.getBoundingClientRect();
      if (rect.width <= 2 || rect.height <= 2 || rect.top >= window.innerHeight) continue;
      const style = getComputedStyle(element);
      if (style.visibility === "hidden" || style.display === "none") continue;
      if (element.closest(".sr-only, [hidden]")) continue;
      const classes = [...element.classList].join(".");
      membership.push({
        element,
        text: directText.slice(0, 40),
        tagClass: `${element.tagName.toLowerCase()}${classes ? `.${classes}` : ""}`,
        hasOwnText: Boolean(directText),
        path: structuralPath(element),
      });
    }

    globalThis.__fallback118Membership = membership;
    return membership.map(measure);
  });
}

async function applyCandidatesAndMeasure(page, specs) {
  const result = await page.evaluate(async (candidateDefinitions) => {
    const faces = [];
    let override = null;
    let loadSource = "Arial";
    try {
      for (const definition of candidateDefinitions) {
        loadSource = definition.loadSource;
        for (const source of definition.sources) {
          const face = new FontFace(
            definition.family,
            source.source,
            source.descriptors,
          );
          document.fonts.add(face);
          faces.push(face);
          await face.load();
          if (face.status !== "loaded") {
            return { loadFailed: definition.loadSource, records: [] };
          }
        }
      }

      document.getElementById("fallback118-override")?.remove();
      override = document.createElement("style");
      override.id = "fallback118-override";
      override.textContent = `:root:root { ${candidateDefinitions
        .map((definition) => `${definition.variable}: "${definition.family}";`)
        .join(" ")} }`;
      document.head.append(override);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      const records = (globalThis.__fallback118Membership || [])
        .filter(({ element }) => element.isConnected)
        .map(({ element, path, text, tagClass, hasOwnText }) => {
          const rect = element.getBoundingClientRect();
          const tenth = (value) => Math.round(value * 10) / 10;
          const record = {
            path,
            text,
            tagClass,
            top: tenth(rect.top),
            left: tenth(rect.left),
            width: tenth(rect.width),
            height: tenth(rect.height),
          };
          if (hasOwnText) {
            const range = document.createRange();
            range.selectNodeContents(element);
            record.lines = new Set(
              [...range.getClientRects()]
                .filter((rangeRect) => rangeRect.width > 0.5)
                .map((rangeRect) => Math.round(rangeRect.top)),
            ).size;
          }
          return record;
        });
      return { loadFailed: false, records };
    } catch {
      return { loadFailed: loadSource, records: [] };
    } finally {
      override?.remove();
      for (const face of faces) document.fonts.delete(face);
    }
  }, specs);

  if (result.loadFailed) throw new CandidateFaceLoadError(result.loadFailed);
  return result.records;
}

function recordKey(record) {
  return record.path;
}

function compareMeasurements(realRecords, candidateRecords, page, width) {
  const real = new Map(realRecords.map((record) => [recordKey(record), record]));
  const candidate = new Map(candidateRecords.map((record) => [recordKey(record), record]));
  const keys = [...new Set([...real.keys(), ...candidate.keys()])].sort();
  const mismatches = [];
  const sideways = [];

  for (const key of keys) {
    const realRecord = real.get(key) || null;
    const candidateRecord = candidate.get(key) || null;
    if (
      !realRecord
      || !candidateRecord
      || (realRecord.lines ?? null) !== (candidateRecord.lines ?? null)
      || Math.abs(realRecord.top - candidateRecord.top) > 1
      || Math.abs(realRecord.height - candidateRecord.height) > 1
    ) {
      mismatches.push({
        page,
        width,
        path: realRecord?.path || candidateRecord?.path,
        text: realRecord?.text || candidateRecord?.text,
        tagClass: realRecord?.tagClass || candidateRecord?.tagClass,
        real: realRecord
          ? {
              top: realRecord.top,
              height: realRecord.height,
              lines: realRecord.lines ?? null,
            }
          : null,
        candidate: candidateRecord
          ? {
              top: candidateRecord.top,
              height: candidateRecord.height,
              lines: candidateRecord.lines ?? null,
            }
          : null,
      });
    }
    if (
      realRecord
      && candidateRecord
      && (
        Math.abs(realRecord.left - candidateRecord.left) > 1
        || Math.abs(realRecord.width - candidateRecord.width) > 1
      )
    ) {
      sideways.push({
        page,
        width,
        path: realRecord.path,
        text: realRecord.text || candidateRecord.text,
        tagClass: realRecord.tagClass,
        real: { left: realRecord.left, width: realRecord.width },
        candidate: { left: candidateRecord.left, width: candidateRecord.width },
      });
    }
  }
  return { mismatches, sideways };
}

function pathTail(path) {
  return path.split(" > ").slice(-3).join(" > ");
}

function subject(record) {
  return record.text ? JSON.stringify(record.text.slice(0, 40)) : record.tagClass;
}

function printMismatch(mismatch, realName = "real", candidateName = "cand") {
  const real = mismatch.real
    ? `top=${mismatch.real.top.toFixed(1)} height=${mismatch.real.height.toFixed(1)} lines=${mismatch.real.lines ?? "-"}`
    : "missing";
  const candidate = mismatch.candidate
    ? `top=${mismatch.candidate.top.toFixed(1)} height=${mismatch.candidate.height.toFixed(1)} lines=${mismatch.candidate.lines ?? "-"}`
    : "missing";
  console.log(
    `  ${mismatch.page} ${mismatch.width} ${pathTail(mismatch.path)} ${subject(mismatch)}:`
      + ` ${realName} ${real}, ${candidateName} ${candidate}`,
  );
}

function printSideways(move, realName = "real", candidateName = "cand") {
  console.log(
    `  ${move.page} ${move.width} ${pathTail(move.path)} ${subject(move)}:`
      + ` ${realName} left=${move.real.left.toFixed(1)} width=${move.real.width.toFixed(1)},`
      + ` ${candidateName} left=${move.candidate.left.toFixed(1)} width=${move.candidate.width.toFixed(1)}`,
  );
}

async function runBite(browser, base) {
  const mismatches = [];
  const sideways = [];
  const viewport = VIEWPORTS.find(({ width }) => width === 412);
  for (const face of FACES) {
    for (const route of SEARCH_ROUTES) {
      const page = await browser.newPage();
      try {
        await preparePage(page, base, route, viewport);
        const real = await captureRealState(page);
        const candidate = await applyCandidatesAndMeasure(
          page,
          [biteCandidateSpec(face)],
        );
        const comparison = compareMeasurements(real, candidate, route, viewport.width);
        mismatches.push(...comparison.mismatches);
        sideways.push(...comparison.sideways);
      } finally {
        await page.close();
      }
    }
  }
  console.log(`bite mismatches: ${mismatches.length}`);
  for (const mismatch of mismatches) printMismatch(mismatch);
  console.log(`bite moved sideways: ${sideways.length}`);
  for (const move of sideways) printSideways(move);
  if (mismatches.length === 0) {
    console.log("bite: FAIL, the tuner cannot see the reflow");
    return false;
  }
  return true;
}

function geometryRecords(records, page, width) {
  return records.map((record) => ({
    ...record,
    page,
    width,
  }));
}

function contiguousRuns(feasibleSizes) {
  const runs = [];
  for (const size of feasibleSizes) {
    const last = runs.at(-1);
    if (last && Math.round((size - last.end) * 100) === 25) last.end = size;
    else runs.push({ start: size, end: size });
  }
  return runs;
}

function chooseRun(runs) {
  const ranked = [...runs].sort((left, right) => {
    const leftLength = Math.round((left.end - left.start) * 100 / 25) + 1;
    const rightLength = Math.round((right.end - right.start) * 100 / 25) + 1;
    if (leftLength !== rightLength) return rightLength - leftLength;
    const leftMiddle = (left.start + left.end) / 2;
    const rightMiddle = (right.start + right.end) / 2;
    const distance = Math.abs(leftMiddle - 100) - Math.abs(rightMiddle - 100);
    return distance || leftMiddle - rightMiddle;
  });
  const run = ranked[0];
  const midpoint = (run.start + run.end) / 2;
  return Math.floor((midpoint * 100 + 1e-7) / 25) * 25 / 100;
}

function chooseBestSize(contexts) {
  return [...SWEEP]
    .map((size) => {
      const key = sizeKey(size);
      const counts = contexts.map((context) => context.counts[key]);
      return {
        size,
        zeroCount: counts.filter((count) => count === 0).length,
        mismatches: counts.reduce((total, count) => total + count, 0),
      };
    })
    .sort((left, right) =>
      right.zeroCount - left.zeroCount
      || left.mismatches - right.mismatches
      || Math.abs(left.size - 100) - Math.abs(right.size - 100)
      || left.size - right.size,
    )[0];
}

function summarizeFace(face, contexts) {
  const feasible = SWEEP.filter((size) =>
    contexts.every((context) => context.counts[sizeKey(size)] === 0),
  );
  const runs = contiguousRuns(feasible);
  if (runs.length) {
    const chosen = chooseRun(runs);
    console.log(
      `${face.label} feasible runs: ${runs
        .map(({ start, end }) => `${sizeKey(start)}-${sizeKey(end)}`)
        .join(", ")} chosen: ${sizeKey(chosen)}`,
    );
    const sideways = contexts.flatMap((context) => context.sideways[sizeKey(chosen)]);
    console.log(`${face.label} moved sideways: ${sideways.length}`);
    for (const move of sideways) printSideways(move);
    return { feasible, runs, chosen, best: null };
  }

  const best = chooseBestSize(contexts);
  const details = contexts.flatMap((context) => context.details[sizeKey(best.size)]);
  const sideways = contexts.flatMap((context) => context.sideways[sizeKey(best.size)]);
  console.log(
    `${face.label} feasible: none; best S=${sizeKey(best.size)} with ${best.mismatches} mismatches:`,
  );
  for (const mismatch of details) printMismatch(mismatch);
  console.log(`${face.label} moved sideways: ${sideways.length}`);
  for (const move of sideways) printSideways(move);
  return { feasible, runs, chosen: null, best };
}

async function searchFace(browser, base, face) {
  const contexts = [];
  for (const route of SEARCH_ROUTES) {
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      try {
        await preparePage(page, base, route, viewport);
        const real = await captureRealState(page);
        const counts = {};
        const details = {};
        const sidewaysCounts = {};
        const sideways = {};
        for (const size of SWEEP) {
          const key = sizeKey(size);
          const candidate = await applyCandidatesAndMeasure(page, [candidateSpec(face, size)]);
          const comparison = compareMeasurements(real, candidate, route, viewport.width);
          counts[key] = comparison.mismatches.length;
          details[key] = comparison.mismatches;
          sidewaysCounts[key] = comparison.sideways.length;
          sideways[key] = comparison.sideways;
        }
        const feasibleCount = Object.values(counts).filter((count) => count === 0).length;
        console.log(
          `${face.label} ${route} ${viewport.width} S 60.00..115.00 done, feasible count ${feasibleCount}`,
        );
        contexts.push({
          page: route,
          width: viewport.width,
          counts,
          details,
          sidewaysCounts,
          sideways,
        });
      } finally {
        await page.close();
      }
    }
  }
  return { contexts, summary: summarizeFace(face, contexts) };
}

async function runCombinedCheck(browser, base, chosenByFace) {
  const mismatches = [];
  const sideways = [];
  for (const route of SEARCH_ROUTES) {
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      try {
        await preparePage(page, base, route, viewport);
        const real = await captureRealState(page);
        const candidates = await applyCandidatesAndMeasure(
          page,
          [
            ...FACES.map((face) => candidateSpec(face, chosenByFace[face.label])),
            jetbrainsCandidateSpec(),
          ],
        );
        const comparison = compareMeasurements(real, candidates, route, viewport.width);
        mismatches.push(...comparison.mismatches);
        sideways.push(...comparison.sideways);
      } finally {
        await page.close();
      }
    }
  }
  console.log(`combined mismatches: ${mismatches.length}`);
  for (const mismatch of mismatches) printMismatch(mismatch);
  console.log(`combined moved sideways: ${sideways.length}`);
  for (const move of sideways) printSideways(move);
  return { mismatches, sideways };
}

function serializableSearchFace(face, result) {
  const perViewport = (field) => Object.fromEntries(
    SEARCH_ROUTES.map((route) => [
      route,
      Object.fromEntries(
        VIEWPORTS.map(({ width }) => {
          const context = result.contexts.find(
            (entry) => entry.page === route && entry.width === width,
          );
          return [String(width), context[field]];
        }),
      ),
    ]),
  );
  return {
    realFamily: face.realFamily,
    variable: face.variable,
    pages: perViewport("counts"),
    movedSideways: perViewport("sidewaysCounts"),
    feasible: result.summary.feasible.map(sizeKey),
    runs: result.summary.runs.map(({ start, end }) => ({
      start: sizeKey(start),
      end: sizeKey(end),
    })),
    chosen: result.summary.chosen === null ? null : sizeKey(result.summary.chosen),
    best: result.summary.best
      ? {
          size: sizeKey(result.summary.best.size),
          zeroCount: result.summary.best.zeroCount,
          mismatches: result.summary.best.mismatches,
        }
      : null,
  };
}

function writeGeometry(path, base, elements) {
  const sorted = [...elements].sort((left, right) =>
    left.page.localeCompare(right.page)
    || left.width - right.width
    || left.path.localeCompare(right.path),
  );
  writeJson(path, { base, generatedAt: new Date().toISOString(), elements: sorted });
}

async function runDefault(browser, base) {
  if (!await runBite(browser, base)) return false;

  ensureOutputDir();
  const searchResults = {};
  for (const face of FACES) {
    searchResults[face.label] = await searchFace(browser, base, face);
  }

  const allFeasible = FACES.every(
    (face) => searchResults[face.label].summary.chosen !== null,
  );
  let combined = null;
  if (allFeasible) {
    const chosenByFace = Object.fromEntries(
      FACES.map((face) => [face.label, searchResults[face.label].summary.chosen]),
    );
    combined = await runCombinedCheck(browser, base, chosenByFace);
  }

  writeJson(FALLBACK_FILE, {
    base,
    generatedAt: new Date().toISOString(),
    sweep: { start: "60.00", end: "115.00", step: "0.25" },
    faces: Object.fromEntries(
      FACES.map((face) => [
        face.label,
        serializableSearchFace(face, searchResults[face.label]),
      ]),
    ),
    combinedMismatchCount: combined?.mismatches.length ?? null,
    combinedMovedSidewaysCount: combined?.sideways.length ?? null,
    combinedMismatches: combined?.mismatches ?? null,
    combinedMovedSideways: combined?.sideways ?? null,
  });
  return allFeasible;
}

async function collectGeometry(browser, base) {
  const geometry = [];
  for (const route of SEARCH_ROUTES) {
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      try {
        await preparePage(page, base, route, viewport);
        const records = await captureRealState(page);
        geometry.push(...geometryRecords(records, route, viewport.width));
      } finally {
        await page.close();
      }
    }
  }
  return geometry;
}

async function runGeometry(browser, base, label) {
  ensureOutputDir();
  const geometry = await collectGeometry(browser, base);
  writeGeometry(geometryFile(label), base, geometry);
  return true;
}

function geometryKey(record) {
  return `${record.page}|${record.width}|${record.path}`;
}

function runCompare() {
  const before = JSON.parse(readFileSync(geometryFile("before"), "utf8"));
  const after = JSON.parse(readFileSync(geometryFile("after"), "utf8"));
  const beforeByKey = new Map(before.elements.map((record) => [geometryKey(record), record]));
  const afterByKey = new Map(after.elements.map((record) => [geometryKey(record), record]));
  const keys = [...new Set([...beforeByKey.keys(), ...afterByKey.keys()])].sort();
  const mismatches = [];
  const sideways = [];
  for (const key of keys) {
    const left = beforeByKey.get(key) || null;
    const right = afterByKey.get(key) || null;
    if (
      !left
      || !right
      || (left.lines ?? null) !== (right.lines ?? null)
      || Math.abs(left.top - right.top) > 1
      || Math.abs(left.height - right.height) > 1
    ) {
      mismatches.push({
        page: left?.page || right?.page,
        width: left?.width || right?.width,
        path: left?.path || right?.path,
        text: left?.text || right?.text,
        tagClass: left?.tagClass || right?.tagClass,
        real: left
          ? { top: left.top, height: left.height, lines: left.lines ?? null }
          : null,
        candidate: right
          ? { top: right.top, height: right.height, lines: right.lines ?? null }
          : null,
      });
    }
    if (
      left
      && right
      && (
        Math.abs(left.left - right.left) > 1
        || Math.abs(left.width - right.width) > 1
      )
    ) {
      sideways.push({
        page: left.page,
        width: left.width,
        path: left.path,
        text: left.text || right.text,
        tagClass: left.tagClass,
        real: { left: left.left, width: left.width },
        candidate: { left: right.left, width: right.width },
      });
    }
  }
  for (const mismatch of mismatches) printMismatch(mismatch, "before", "after");
  console.log(`geometry diffs: ${mismatches.length}`);
  for (const move of sideways) printSideways(move, "before", "after");
  console.log(`moved sideways: ${sideways.length}`);
  return true;
}

async function loadVerificationState(browser, base, route, viewport, blockFonts) {
  const context = await browser.createBrowserContext();
  let page;
  try {
    page = await context.newPage();
    await preparePage(page, base, route, viewport, blockFonts);
    return await captureRealState(page);
  } finally {
    try {
      if (page && !page.isClosed()) await page.close();
    } finally {
      await context.close();
    }
  }
}

async function runVerify(browser, base, label) {
  ensureOutputDir();
  const results = [];
  let totalMismatches = 0;
  let totalSideways = 0;
  for (const route of VERIFY_ROUTES) {
    for (const viewport of VIEWPORTS) {
      const blocked = await loadVerificationState(browser, base, route, viewport, true);
      const loaded = await loadVerificationState(browser, base, route, viewport, false);
      const comparison = compareMeasurements(blocked, loaded, route, viewport.width);
      totalMismatches += comparison.mismatches.length;
      totalSideways += comparison.sideways.length;
      for (const mismatch of comparison.mismatches) {
        printMismatch(mismatch, "blocked", "loaded");
      }
      console.log(
        `verify ${route} ${viewport.width} mismatches: ${comparison.mismatches.length}`,
      );
      for (const move of comparison.sideways) printSideways(move, "blocked", "loaded");
      console.log(
        `verify ${route} ${viewport.width} moved sideways: ${comparison.sideways.length}`,
      );
      results.push({
        page: route,
        width: viewport.width,
        blocked,
        loaded,
        mismatchCount: comparison.mismatches.length,
        movedSidewaysCount: comparison.sideways.length,
        mismatches: comparison.mismatches,
        movedSideways: comparison.sideways,
      });
    }
  }
  writeJson(verificationFile(label), {
    label,
    base,
    generatedAt: new Date().toISOString(),
    results,
    totalMismatches,
    totalMovedSideways: totalSideways,
  });
  console.log(`verify total mismatches: ${totalMismatches}`);
  console.log(`verify moved sideways: ${totalSideways}`);
  return true;
}

async function runBrowserMode(options) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  try {
    if (options.mode === "geometry") {
      return await runGeometry(browser, options.base, options.label);
    }
    if (options.mode === "verify") {
      return await runVerify(browser, options.base, options.label);
    }
    return await runDefault(browser, options.base);
  } finally {
    await browser.close();
  }
}

const options = parseArgs(process.argv.slice(2));
if (!options.valid) {
  usage();
  process.exitCode = 1;
} else {
  try {
    const passed = options.mode === "compare"
      ? runCompare()
      : await runBrowserMode(options);
    if (!passed) process.exitCode = 1;
  } catch (error) {
    if (error instanceof CandidateFaceLoadError) console.error(error.message);
    else console.error(error instanceof Error ? error.stack : error);
    process.exitCode = 1;
  }
}
