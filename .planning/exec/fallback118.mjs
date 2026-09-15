// Pass-118 tuner and gate for Bricolage/Hanken fallback geometry.
// Usage: node .planning/exec/fallback118.mjs [--base URL]
//        node .planning/exec/fallback118.mjs --after [--base URL]
//        node .planning/exec/fallback118.mjs --compare
//        node .planning/exec/fallback118.mjs --verify --label before|after [--base URL]
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUTPUT_DIR = ".planning/qa/pass-118";
const FALLBACK_FILE = `${OUTPUT_DIR}/fallback118.json`;
const GEOMETRY_BEFORE_FILE = `${OUTPUT_DIR}/geometry-before.json`;
const GEOMETRY_AFTER_FILE = `${OUTPUT_DIR}/geometry-after.json`;
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
const FACES = [
  {
    label: "Bricolage",
    realFamily: "Bricolage Grotesque",
    variable: "--font-bricolage",
    originalSize: 105.43,
    originalAscent: 88.21,
    originalDescent: 25.61,
  },
  {
    label: "Hanken",
    realFamily: "Hanken Grotesk",
    variable: "--font-hanken",
    originalSize: 100.94,
    originalAscent: 99.07,
    originalDescent: 30.02,
  },
];
const SWEEP = Array.from({ length: (11500 - 6000) / 25 + 1 }, (_, index) =>
  (6000 + index * 25) / 100,
);

class CandidateFaceLoadError extends Error {
  constructor() {
    super("candidate face failed to load from local Arial");
    this.name = "CandidateFaceLoadError";
  }
}

function usage() {
  console.log(
    "Usage: node .planning/exec/fallback118.mjs [--after | --compare | --verify --label before|after] [--base URL]",
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
    if (argument === "--after") modes.push("after");
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
  if (options.mode === "verify" && !options.label) options.valid = false;
  if (options.mode !== "verify" && options.label) options.valid = false;
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

function candidateSpec(face, size) {
  return {
    label: face.label,
    variable: face.variable,
    family: `Cand${Math.round(size * 100)}`,
    sizeAdjust: `${size.toFixed(2)}%`,
    ascentOverride: `${(face.originalAscent * face.originalSize / size).toFixed(2)}%`,
    descentOverride: `${(face.originalDescent * face.originalSize / size).toFixed(2)}%`,
    lineGapOverride: "0%",
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

async function captureRealState(page, faces) {
  return page.evaluate((faceDefinitions) => {
    const firstFamily = (fontFamily) =>
      fontFamily.split(",")[0].trim().replace(/^["']|["']$/g, "");
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
    const measure = (element, face, text, path) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      const tops = new Set(
        [...range.getClientRects()]
          .filter((rect) => rect.width > 0.5)
          .map((rect) => Math.round(rect.top)),
      );
      const rect = element.getBoundingClientRect();
      const tenth = (value) => Math.round(value * 10) / 10;
      return {
        face,
        path,
        text,
        lines: tops.size,
        height: tenth(rect.height),
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        },
      };
    };

    const familyToLabel = new Map(
      faceDefinitions.map(({ label, realFamily }) => [realFamily, label]),
    );
    const membership = [];
    for (const element of [document.body, ...document.body.querySelectorAll("*")]) {
      const directText = [...element.childNodes]
        .filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
        .map((node) => node.textContent.trim())
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      if (!directText) continue;
      const rect = element.getBoundingClientRect();
      if (rect.width <= 2 || rect.height <= 2 || rect.top >= window.innerHeight) continue;
      const style = getComputedStyle(element);
      if (style.visibility === "hidden" || style.display === "none") continue;
      if (element.closest(".sr-only, [hidden]")) continue;
      const label = familyToLabel.get(firstFamily(style.fontFamily));
      if (!label) continue;
      membership.push({
        element,
        face: label,
        text: directText.slice(0, 120),
        path: structuralPath(element),
      });
    }

    globalThis.__fallback118Membership = membership;
    return membership.map(({ element, face, text, path }) =>
      measure(element, face, text, path),
    );
  }, faces.map(({ label, realFamily }) => ({ label, realFamily })));
}

async function applyCandidatesAndMeasure(page, specs) {
  const result = await page.evaluate(async (candidateDefinitions) => {
    const faces = [];
    try {
      for (const definition of candidateDefinitions) {
        const face = new FontFace(definition.family, 'local("Arial")', {
          sizeAdjust: definition.sizeAdjust,
          ascentOverride: definition.ascentOverride,
          descentOverride: definition.descentOverride,
          lineGapOverride: definition.lineGapOverride,
        });
        document.fonts.add(face);
        faces.push(face);
        await face.load();
        if (face.status !== "loaded") return { loadFailed: true, records: [] };
      }

      document.getElementById("fallback118-override")?.remove();
      const override = document.createElement("style");
      override.id = "fallback118-override";
      override.textContent = `:root:root { ${candidateDefinitions
        .map((definition) => `${definition.variable}: "${definition.family}";`)
        .join(" ")} }`;
      document.head.append(override);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      const tenth = (value) => Math.round(value * 10) / 10;
      const selectedFaces = new Set(candidateDefinitions.map(({ label }) => label));
      const records = (globalThis.__fallback118Membership || [])
        .filter(({ face }) => selectedFaces.has(face))
        .map(({ element, face, path, text }) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          const tops = new Set(
            [...range.getClientRects()]
              .filter((rect) => rect.width > 0.5)
              .map((rect) => Math.round(rect.top)),
          );
          const rect = element.getBoundingClientRect();
          return {
            face,
            path,
            text,
            lines: tops.size,
            height: tenth(rect.height),
            rect: {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height,
            },
          };
        });
      return { loadFailed: false, records };
    } catch {
      return { loadFailed: true, records: [] };
    } finally {
      for (const face of faces) document.fonts.delete(face);
    }
  }, specs);

  if (result.loadFailed) throw new CandidateFaceLoadError();
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

  for (const key of keys) {
    const realRecord = real.get(key) || null;
    const candidateRecord = candidate.get(key) || null;
    if (
      !realRecord
      || !candidateRecord
      || realRecord.lines !== candidateRecord.lines
      || Math.abs(realRecord.height - candidateRecord.height) > 1
    ) {
      mismatches.push({
        page,
        width,
        face: realRecord?.face || candidateRecord?.face,
        path: realRecord?.path || candidateRecord?.path,
        text: realRecord?.text || candidateRecord?.text,
        real: realRecord
          ? { lines: realRecord.lines, height: realRecord.height }
          : null,
        candidate: candidateRecord
          ? { lines: candidateRecord.lines, height: candidateRecord.height }
          : null,
      });
    }
  }
  return mismatches;
}

function printMismatch(mismatch, candidateName = "cand") {
  const real = mismatch.real
    ? `lines=${mismatch.real.lines} height=${mismatch.real.height.toFixed(1)}`
    : "missing";
  const candidate = mismatch.candidate
    ? `lines=${mismatch.candidate.lines} height=${mismatch.candidate.height.toFixed(1)}`
    : "missing";
  console.log(
    `  ${mismatch.page} ${mismatch.width} ${mismatch.face} ${mismatch.path}`
      + ` ${JSON.stringify(mismatch.text || "")}: real ${real}, ${candidateName} ${candidate}`,
  );
}

async function runBite(browser, base) {
  let mismatchCount = 0;
  const viewport = VIEWPORTS.find(({ width }) => width === 412);
  for (const face of FACES) {
    for (const route of SEARCH_ROUTES) {
      const page = await browser.newPage();
      try {
        await preparePage(page, base, route, viewport);
        const real = await captureRealState(page, [face]);
        const candidate = await applyCandidatesAndMeasure(
          page,
          [candidateSpec(face, face.originalSize)],
        );
        mismatchCount += compareMeasurements(real, candidate, route, viewport.width).length;
      } finally {
        await page.close();
      }
    }
  }
  console.log(`bite mismatches: ${mismatchCount}`);
  if (mismatchCount === 0) {
    console.log("bite: FAIL, the tuner cannot see the reflow");
    return false;
  }
  return true;
}

function geometryRecords(records, page, width) {
  return records.map(({ face, path, lines, rect }) => ({
    page,
    width,
    face,
    path,
    lines,
    rect,
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
    return { feasible, runs, chosen, best: null };
  }

  const best = chooseBestSize(contexts);
  const details = contexts.flatMap((context) => context.details[sizeKey(best.size)]);
  console.log(
    `${face.label} feasible: none; best S=${sizeKey(best.size)} with ${best.mismatches} mismatches:`,
  );
  for (const mismatch of details) printMismatch(mismatch);
  return { feasible, runs, chosen: null, best };
}

async function searchFace(browser, base, face, geometry) {
  const contexts = [];
  for (const route of SEARCH_ROUTES) {
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      try {
        await preparePage(page, base, route, viewport);
        const real = await captureRealState(page, [face]);
        geometry.push(...geometryRecords(real, route, viewport.width));
        const counts = {};
        const details = {};
        for (const size of SWEEP) {
          const key = sizeKey(size);
          const candidate = await applyCandidatesAndMeasure(page, [candidateSpec(face, size)]);
          const mismatches = compareMeasurements(real, candidate, route, viewport.width);
          counts[key] = mismatches.length;
          details[key] = mismatches;
        }
        const feasibleCount = Object.values(counts).filter((count) => count === 0).length;
        console.log(
          `${face.label} ${route} ${viewport.width} S 60.00..115.00 done, feasible count ${feasibleCount}`,
        );
        contexts.push({ page: route, width: viewport.width, counts, details });
      } finally {
        await page.close();
      }
    }
  }
  return { contexts, summary: summarizeFace(face, contexts) };
}

async function runCombinedCheck(browser, base, chosenByFace) {
  const mismatches = [];
  for (const route of SEARCH_ROUTES) {
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      try {
        await preparePage(page, base, route, viewport);
        const real = await captureRealState(page, FACES);
        const candidates = await applyCandidatesAndMeasure(
          page,
          FACES.map((face) => candidateSpec(face, chosenByFace[face.label])),
        );
        mismatches.push(
          ...compareMeasurements(real, candidates, route, viewport.width),
        );
      } finally {
        await page.close();
      }
    }
  }
  console.log(`combined mismatches: ${mismatches.length}`);
  for (const mismatch of mismatches) printMismatch(mismatch);
  return mismatches;
}

function serializableSearchFace(face, result) {
  return {
    realFamily: face.realFamily,
    variable: face.variable,
    pages: Object.fromEntries(
      SEARCH_ROUTES.map((route) => [
        route,
        Object.fromEntries(
          VIEWPORTS.map(({ width }) => {
            const context = result.contexts.find(
              (entry) => entry.page === route && entry.width === width,
            );
            return [String(width), context.counts];
          }),
        ),
      ]),
    ),
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
    || left.face.localeCompare(right.face)
    || left.path.localeCompare(right.path),
  );
  writeJson(path, { base, generatedAt: new Date().toISOString(), elements: sorted });
}

async function runDefault(browser, base) {
  if (!await runBite(browser, base)) return false;

  ensureOutputDir();
  const geometry = [];
  const searchResults = {};
  for (const face of FACES) {
    searchResults[face.label] = await searchFace(browser, base, face, geometry);
  }

  const allFeasible = FACES.every(
    (face) => searchResults[face.label].summary.chosen !== null,
  );
  let combinedMismatches = null;
  if (allFeasible) {
    const chosenByFace = Object.fromEntries(
      FACES.map((face) => [face.label, searchResults[face.label].summary.chosen]),
    );
    combinedMismatches = await runCombinedCheck(browser, base, chosenByFace);
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
    combinedMismatchCount: combinedMismatches?.length ?? null,
    combinedMismatches,
  });
  writeGeometry(GEOMETRY_BEFORE_FILE, base, geometry);
  return allFeasible;
}

async function collectGeometry(browser, base) {
  const geometry = [];
  for (const route of SEARCH_ROUTES) {
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      try {
        await preparePage(page, base, route, viewport);
        const records = await captureRealState(page, FACES);
        geometry.push(...geometryRecords(records, route, viewport.width));
      } finally {
        await page.close();
      }
    }
  }
  return geometry;
}

async function runAfter(browser, base) {
  ensureOutputDir();
  const geometry = await collectGeometry(browser, base);
  writeGeometry(GEOMETRY_AFTER_FILE, base, geometry);
  return true;
}

function geometryKey(record) {
  return `${record.page}|${record.width}|${record.path}`;
}

function runCompare() {
  const before = JSON.parse(readFileSync(GEOMETRY_BEFORE_FILE, "utf8"));
  const after = JSON.parse(readFileSync(GEOMETRY_AFTER_FILE, "utf8"));
  const beforeByKey = new Map(before.elements.map((record) => [geometryKey(record), record]));
  const afterByKey = new Map(after.elements.map((record) => [geometryKey(record), record]));
  const keys = new Set([...beforeByKey.keys(), ...afterByKey.keys()]);
  let diffs = 0;
  for (const key of keys) {
    const left = beforeByKey.get(key);
    const right = afterByKey.get(key);
    if (
      !left
      || !right
      || left.lines !== right.lines
      || ["x", "y", "width", "height"].some(
        (field) => Math.abs(left.rect[field] - right.rect[field]) > 0.5,
      )
    ) diffs++;
  }
  console.log(`geometry diffs: ${diffs}`);
  return true;
}

async function loadVerificationState(browser, base, route, viewport, blockFonts) {
  const context = await browser.createBrowserContext();
  let page;
  try {
    page = await context.newPage();
    await preparePage(page, base, route, viewport, blockFonts);
    return await captureRealState(page, FACES);
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
  for (const route of VERIFY_ROUTES) {
    for (const viewport of VIEWPORTS) {
      const blocked = await loadVerificationState(browser, base, route, viewport, true);
      const loaded = await loadVerificationState(browser, base, route, viewport, false);
      const mismatches = compareMeasurements(blocked, loaded, route, viewport.width);
      totalMismatches += mismatches.length;
      console.log(`verify ${route} ${viewport.width} mismatches: ${mismatches.length}`);
      results.push({
        page: route,
        width: viewport.width,
        blocked,
        loaded,
        mismatchCount: mismatches.length,
        mismatches,
      });
    }
  }
  writeJson(`${OUTPUT_DIR}/verify-${label}.json`, {
    label,
    base,
    generatedAt: new Date().toISOString(),
    results,
    totalMismatches,
  });
  console.log(`verify total mismatches: ${totalMismatches}`);
  return true;
}

async function runBrowserMode(options) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  try {
    if (options.mode === "after") return await runAfter(browser, options.base);
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
