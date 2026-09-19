#!/usr/bin/env node
// Crossfade contrast measurement (Pass-122 ship-gate). Reconstructed from the
// method recorded in .planning/qa/pass-122/preship/crossfade/ (run.log,
// results.json, summary.json): for each viewport, scroll down then up
// through the end of #products into the Ordani title in 60px steps,
// sampling every visible copper-or-current element's rendered color against
// the page's actual painted background at that instant, plus an isolated
// flip test holding scroll fixed at the world-crossfade trigger point and
// sampling at t=0/350/800ms. The ground here is a flat CSS background-color
// (no video/blend layer behind the exits scoreboard or the Ordani title —
// that layer only exists behind the separate $20M+ figure much higher up the
// page), so getComputedStyle's live, mid-transition color/backgroundColor is
// read directly instead of screenshot pixel sampling; for a flat ground
// these are equivalent and exact, not an approximation.
//
// METHOD FIX (this file, Pass-122 fix2): the first run's worst sample
// (up#31, 1440x900, scrollY=4050, ratio 2.35) was real — that is the
// confirmed defect, not an artifact. But the *next* rerun after landing a
// fix must not manufacture a false failure of its own: this script jumps
// (instant scrollTo) to the start of each pass rather than scrolling there
// continuously, and a jump that crosses the WorldSwitcher's flip threshold
// starts the 0.7s CSS colour transition from whatever the browser was
// still painting before the jump. Sampling immediately after that specific
// jump (the old per-step 120ms wait) can catch a transition that a
// continuously-scrolling reader would never see already-completed by the
// time they reach that pixel. Fix: after the two pass-opening jumps (down's
// jump to startY, up's jump to endY) wait 1500ms before the FIRST sample of
// that pass, long enough for any in-flight 0.7s transition to fully settle
// before measurement starts. Every other step is a plain 60px continuous
// move and keeps the original 120ms settle wait.
//
// Usage: node .planning/exec/crossfade-contrast.mjs [baseUrl] [outDir] [--reduced-motion]
//   node .planning/exec/crossfade-contrast.mjs http://localhost:3241 .planning/qa/pass-122/preship/fixes2
//   node .planning/exec/crossfade-contrast.mjs http://localhost:3241 .planning/qa/pass-122/preship/fixes2 --reduced-motion
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const TOOLS = process.env.AXE_TOOLS || "C:/tmp/p101tools";
const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = (process.argv[2] || "http://localhost:3240").replace(/\/$/, "");
const REDUCED = process.argv.includes("--reduced-motion");
const OUT_DIR = process.argv[3] && !process.argv[3].startsWith("--") ? process.argv[3] : null;

const req = createRequire(path.join(TOOLS, "package.json"));
const mod = req("puppeteer-core");
const puppeteer = mod.default ?? mod;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function luminance([r, g, b]) {
  const c = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrastRatio(rgb1, rgb2) {
  const l1 = luminance(rgb1);
  const l2 = luminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
function parseRgb(str) {
  if (!str) return null;
  const m = str.match(/rgba?\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
  return m ? [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])] : null;
}

const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  { name: "390x844", width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];

// Page-state snapshot: root's inline target var, root's live computed
// background (reflects the CSS transition mid-flight), every element that
// actually PAINTS copper glyphs or a copper fill, and both components' own
// state classes.
//
// Candidate filter (this file, Pass-122 fix2): the first cut sampled every
// element in the DOM whose *resolved* `color`/`background-color` matched
// copper, which also matches non-rendering wrapper elements — .cw-rec__num,
// .cw-rec__box and .cw-rec__fig carry the same inherited/own `color` as
// their .cw-rec__line children but hold no text of their own — and the
// visually-hidden .cw-sr-only duplicate (1x1px, clip: rect(0,0,0,0), a
// screen-reader-only echo of the same numerals WCAG 1.4.3 does not apply
// to). Once a fix overrides only the leaf that actually paints, those
// non-rendering duplicates keep reporting the old ratio and manufacture a
// false failure. Restrict samples to elements that (a) own a DIRECT
// non-whitespace text node (so `color` is the value actually painted,
// not just inherited past unused) or paint a background fill, and
// (b) render at real size (>4px both axes), which excludes the sr-only
// clip-rect trick without excluding any real glyph or tick.
async function sampleFrame(page) {
  return page.evaluate(() => {
    const root = document.querySelector('[data-mode="cw"]');
    const cwBgVar = root ? root.style.getPropertyValue("--cw-bg").trim() : null;
    const bgColor = root ? getComputedStyle(root).backgroundColor : null;
    const vw = innerWidth;
    const vh = innerHeight;
    const COPPER = "189, 90, 45";
    const hasDirectText = (el) =>
      Array.from(el.childNodes).some(
        (n) => n.nodeType === 3 && n.textContent.trim().length > 0,
      );
    const all = Array.from(document.querySelectorAll("body *"));
    const candidates = [];
    for (const el of all) {
      const r = el.getBoundingClientRect();
      if (
        !(
          r.width > 4 &&
          r.height > 4 &&
          r.bottom > 0 &&
          r.top < vh &&
          r.right > 0 &&
          r.left < vw
        )
      )
        continue;
      const cs = getComputedStyle(el);
      const usesColor = cs.color.includes(COPPER) && hasDirectText(el);
      const usesBg = cs.backgroundColor.includes(COPPER);
      if (!usesColor && !usesBg) continue;
      const text = (el.textContent || "").trim().slice(0, 60);
      candidates.push({
        cls: el.className || el.tagName,
        text,
        rect: { x: r.x, y: r.y, width: r.width, height: r.height },
        mode: usesBg ? "background" : "text",
        sampleColor: usesBg ? cs.backgroundColor : cs.color,
      });
    }
    const exitsSection = document.querySelector(".cw-exits");
    const recEl = document.querySelector(".cw-rec");
    return {
      cwBgVar,
      bgColor,
      scrollY: window.scrollY,
      exitsIsLive: !!exitsSection?.classList.contains("is-live"),
      exitsIsOffworld: !!exitsSection?.classList.contains("is-offworld"),
      recIsOffworld: !!recEl?.classList.contains("is-offworld"),
      candidates,
    };
  });
}

function evalSamples(frame) {
  const groundRgb = parseRgb(frame.bgColor);
  const samples = frame.candidates.map((c) => {
    const textRgb = parseRgb(c.sampleColor);
    const ratio = groundRgb && textRgb ? contrastRatio(textRgb, groundRgb) : null;
    return { ...c, textRgb, groundRgb, ratio };
  });
  return samples;
}

async function findProductsAndOrdaniY(page) {
  return page.evaluate(() => {
    const products = document.querySelector("#products");
    const ordaniTitle = document.querySelector("#cw-ordani-title");
    const y0 = window.scrollY;
    const pr = products ? products.getBoundingClientRect() : null;
    const orA = ordaniTitle ? ordaniTitle.getBoundingClientRect() : null;
    const exitsEl = document.querySelector(".cw-exits");
    const exA = exitsEl ? exitsEl.getBoundingClientRect() : null;
    const recEl = document.querySelector(".cw-rec");
    const recA = recEl ? recEl.getBoundingClientRect() : null;
    return {
      productsTop: pr ? pr.top + y0 : null,
      productsBottom: pr ? pr.bottom + y0 : null,
      exitsTop: exA ? exA.top + y0 : null,
      exitsBottom: exA ? exA.bottom + y0 : null,
      recTop: recA ? recA.top + y0 : null,
      recBottom: recA ? recA.bottom + y0 : null,
      ordaniTitleTop: orA ? orA.top + y0 : null,
      maxScroll: document.documentElement.scrollHeight - window.innerHeight,
    };
  });
}

async function scrollTo(page, y) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
}

async function runViewport(browser, vp) {
  const page = await browser.newPage();
  await page.setViewport({
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
  });
  if (REDUCED) {
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
  }
  await page.goto(BASE + "/", { waitUntil: "networkidle0", timeout: 90000 });
  await sleep(1500);

  const geo = await findProductsAndOrdaniY(page);
  // Start the DOWN pass above the $20M+ figure itself (not just #products'
  // top), so every copper element in the section — the receipts figure AND
  // the scoreboard — is covered by both passes.
  const startY = Math.max(
    0,
    Math.round(Math.min(geo.recTop ?? geo.productsTop, geo.exitsTop) - vp.height),
  );
  const endY = Math.min(
    geo.maxScroll,
    Math.round(geo.ordaniTitleTop + vp.height * 1.5),
  );
  const STEP = 60;

  const result = { vp: vp.name, geo, down: [], up: [] };

  // DOWN pass. The jump to startY is a programmatic scrollTo from wherever
  // page load left us (top) — wait out any in-flight transition before the
  // first sample so this jump can't manufacture a false low reading.
  await scrollTo(page, startY);
  await sleep(1500);
  for (let y = startY, i = 0; y <= endY; y += STEP, i++) {
    if (i > 0) {
      await scrollTo(page, y);
      await sleep(120); // let Lenis + the 0.7s CSS transition tick between steps
    }
    const frame = await sampleFrame(page);
    const samples = evalSamples(frame);
    result.down.push({
      label: `down#${i}`,
      targetY: y,
      scrollY: frame.scrollY,
      cwBgVar: frame.cwBgVar,
      bgColor: frame.bgColor,
      exitsIsLive: frame.exitsIsLive,
      exitsIsOffworld: frame.exitsIsOffworld,
      recIsOffworld: frame.recIsOffworld,
      copperCount: samples.length,
      samples,
    });
  }
  // UP pass. Jump back up to endY is likewise a programmatic jump (the down
  // pass's last landed position may be short of endY depending on step
  // divisibility) — same 1500ms settle before the first sample.
  await scrollTo(page, endY);
  await sleep(1500);
  for (let y = endY, i = 0; y >= startY; y -= STEP, i++) {
    if (i > 0) {
      await scrollTo(page, y);
      await sleep(120);
    }
    const frame = await sampleFrame(page);
    const samples = evalSamples(frame);
    result.up.push({
      label: `up#${i}`,
      targetY: y,
      scrollY: frame.scrollY,
      cwBgVar: frame.cwBgVar,
      bgColor: frame.bgColor,
      exitsIsLive: frame.exitsIsLive,
      exitsIsOffworld: frame.exitsIsOffworld,
      recIsOffworld: frame.recIsOffworld,
      copperCount: samples.length,
      samples,
    });
  }

  // Find the world-flip trigger scrollY: step by 4px near the ordani title
  // crossing until the root's INLINE --cw-bg target (not the transitioning
  // computed value) flips from espresso to petrol.
  let flipY = null;
  {
    const loY = Math.max(startY, Math.round(geo.ordaniTitleTop - vp.height));
    const hiY = Math.min(endY, Math.round(geo.ordaniTitleTop + vp.height));
    let prevVar = null;
    for (let y = loY; y <= hiY; y += 4) {
      await scrollTo(page, y);
      const v = await page.evaluate(() => {
        const root = document.querySelector('[data-mode="cw"]');
        return root ? root.style.getPropertyValue("--cw-bg").trim() : null;
      });
      if (prevVar && v !== prevVar) {
        flipY = y;
        break;
      }
      prevVar = v;
    }
  }

  const flip = { flipY, samples: [] };
  if (flipY !== null) {
    // Land just before the trigger, then cross it in one step and sample
    // at t=0/350/800ms of REAL elapsed time (setTimeout, actualMs logged).
    await scrollTo(page, flipY - 8);
    await sleep(900); // let any prior transition fully settle
    const t0start = Date.now();
    await scrollTo(page, flipY + 8);
    for (const delayMs of [0, 350, 800]) {
      const target = t0start + delayMs;
      const wait = Math.max(0, target - Date.now());
      if (wait) await sleep(wait);
      const frame = await sampleFrame(page);
      const samples = evalSamples(frame);
      flip.samples.push({
        delayMs,
        actualMs: Date.now() - t0start,
        cwBgVar: frame.cwBgVar,
        bgColor: frame.bgColor,
        copperCount: samples.length,
        samples,
      });
    }
  }
  result.flip = flip;

  await page.close();
  return result;
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-first-run", "--no-default-browser-check"],
});

const report = { base: BASE, reducedMotion: REDUCED, when: new Date().toISOString(), viewports: [] };
try {
  for (const vp of VIEWPORTS) {
    console.log(`=== ${vp.name} ${REDUCED ? "(reduced motion)" : ""} ===`);
    const r = await runViewport(browser, vp);
    report.viewports.push(r);
    console.log(
      `  geo: recTop=${Math.round(r.geo.recTop ?? -1)} exitsTop=${Math.round(r.geo.exitsTop)} ordaniTitleTop=${Math.round(r.geo.ordaniTitleTop)} flipY=${r.flip.flipY}`,
    );
    console.log(`  down steps=${r.down.length} up steps=${r.up.length}`);
  }
} finally {
  await browser.close();
}

// Aggregate: minimum ratio across every sample with copper visible, and the
// count of steps (down+up combined) with at least one sample under 3:1.
let minRatio = Infinity;
let minDetail = null;
let stepsUnder3 = 0;
let totalSamples = 0;
const worst = [];
for (const vp of report.viewports) {
  for (const pass of ["down", "up"]) {
    for (const step of vp[pass]) {
      let stepUnder = false;
      for (const s of step.samples) {
        if (s.ratio == null) continue;
        totalSamples++;
        if (s.ratio < 3) stepUnder = true;
        if (s.ratio < minRatio) {
          minRatio = s.ratio;
          minDetail = { vp: vp.vp, pass, label: step.label, scrollY: step.scrollY, ...s };
        }
        worst.push({ vp: vp.vp, pass, label: step.label, scrollY: step.scrollY, ratio: s.ratio, text: s.text, cls: s.cls });
      }
      if (stepUnder) stepsUnder3++;
    }
  }
  for (const s of vp.flip.samples) {
    for (const sm of s.samples) {
      if (sm.ratio == null) continue;
      totalSamples++;
      if (sm.ratio < 3) stepsUnder3++; // count the flip instant too
      if (sm.ratio < minRatio) {
        minRatio = sm.ratio;
        minDetail = { vp: vp.vp, pass: "flip", label: `flip@${s.delayMs}ms`, scrollY: null, ...sm };
      }
    }
  }
}
worst.sort((a, b) => a.ratio - b.ratio);

const summary = {
  totalSamplesWithCopperVisible: totalSamples,
  stepsUnder3to1: stepsUnder3,
  minRatio: minRatio === Infinity ? null : minRatio,
  minRatioDetail: minDetail,
  worst5: worst.slice(0, 5),
};

console.log("\n=== SUMMARY ===");
console.log(JSON.stringify(summary, null, 2));

if (OUT_DIR) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const tag = REDUCED ? "-reduced" : "";
  fs.writeFileSync(path.join(OUT_DIR, `results${tag}.json`), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, `summary${tag}.json`), JSON.stringify(summary, null, 2));
}
