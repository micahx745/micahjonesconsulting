// .planning/exec/band123.mjs — Pass-123 study band checks B1-B10, K1-K9, from the
// STUDY-BRIEF.md §5 "The checks in band123.mjs" list, verbatim.
//
// Usage: node .planning/exec/band123.mjs [base]
//   base defaults to http://localhost:3200.
// Every assertion prints "PASS <id> <slug> <W>: got <x>" or
// "FAIL <id> <slug> <W>: got <x> (want <y>)"; informational (not gated) lines print
// "REPORT <id> <slug> <W>: ...". The run ends on "band123 failures: N" and exits 1
// when N is not 0.
//
// Where a check names an element that this stage does not implement yet (.cs-num,
// .cs-poster, .cs-poster__lead, .cs-title__line--figure, .cs-title__kick,
// .cs-title__tail, video.cs-band__clip), the count-style checks (B2, B7, K1) still
// compare the live count against the spec'd want value, so they correctly FAIL
// pre-implementation. Checks that can only be evaluated when the element exists
// (B3 strings, B4 rest state, B5 fit, B8 assembly, K2-K8 clip behaviour) report NA
// without incrementing the failure counter when the element is entirely absent for
// a study that will never carry it (ordani); when a poster/clip study is missing
// the element it WILL carry after later stages, the check is a hard FAIL (matching
// the brief's stated Stage-0 bite), not a silent NA.
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import matter from "gray-matter";

const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const REPO = fileURLToPath(new URL("../../", import.meta.url));
const pos = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const BASE = (pos[0] || "http://localhost:3200").replace(/\/$/, "");

const SLUGS = ["guardicore", "rfp-engine", "ordani", "content-engine", "birth-worker"];
const WIDTHS = [390, 1440];
const VP = {
  390: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  1440: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
};
const POSTER_SLUGS = ["guardicore", "rfp-engine", "content-engine", "birth-worker"];
const BAND_CLIP_SLUG = "guardicore";
const RESULT_REST_BIRTHWORKER =
  "Thousands of dollars kept that used to go to claims-processing fees. Requests across her whole range instead of one service.";

// §2 table: the exact strings each poster study's spans will carry.
const EXPECT = {
  guardicore: { kick: null, num: "$14M,", tail: "then Akamai", posterLead: null, comma: true, words: false },
  "rfp-engine": { kick: null, num: "$3M", tail: "in signed contracts", posterLead: null, comma: false, words: false },
  "content-engine": { kick: "up to", num: "800,000", tail: "impressions", posterLead: null, comma: true, words: false },
  "birth-worker": { kick: null, num: "five to ten.", tail: null, posterLead: "Bookings from one to three a month to", comma: false, words: true },
  ordani: { kick: null, num: null, tail: null, posterLead: null, comma: false, words: false },
};

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`${ok ? "PASS" : "FAIL"} ${id}: got ${got}${ok ? "" : ` (want ${want})`}`);
  if (!ok) failures++;
};
const report = (id, msg) => console.log(`REPORT ${id}: ${msg}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const errText = (e) => String((e && e.message) || e).split("\n")[0];
const f1 = (v) => (v === null || v === undefined || Number.isNaN(v) ? String(v) : Number(v).toFixed(1));

// ---------------------------------------------------------------- frontmatter (B1)
const FRONTMATTER_TITLE = {};
for (const slug of SLUGS) {
  const raw = readFileSync(join(REPO, "content/work", `${slug}.mdx`), "utf8");
  FRONTMATTER_TITLE[slug] = matter(raw).data.title;
}

// ---------------------------------------------------------------- contrast helpers
function srgbToLin(c) {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function relLum([r, g, b]) {
  return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
}
function contrastRatio(a, b) {
  const la = relLum(a);
  const lb = relLum(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}
function parseRgb(str) {
  const m = /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/.exec(str || "");
  return m ? [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])] : null;
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const decoder = await browser.newPage();
await decoder.goto("about:blank");

// Decode a base64 PNG in the decoder page and return the per-channel median over
// every pixel (used for a ground patch's median colour).
async function medianColorOfPng(b64) {
  if (!b64) return null;
  return decoder.evaluate(async (b64) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    const rs = [], gs = [], bs = [];
    for (let i = 0; i < d.length; i += 4) {
      rs.push(d[i]);
      gs.push(d[i + 1]);
      bs.push(d[i + 2]);
    }
    const med = (arr) => {
      const s = [...arr].sort((x, y) => x - y);
      return s[Math.floor(s.length / 2)];
    };
    return [med(rs), med(gs), med(bs)];
  }, b64);
}

// Decode a base64 PNG and return the median of only its "copper-like" pixels
// (|r-200|<=30, |g-84|<=30, |b-43|<=30), plus how many qualified.
async function medianCopperOfPng(b64) {
  if (!b64) return { n: 0, rgb: null };
  return decoder.evaluate(async (b64) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    const rs = [], gs = [], bs = [];
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2];
      if (Math.abs(r - 200) <= 30 && Math.abs(g - 84) <= 30 && Math.abs(b - 43) <= 30) {
        rs.push(r);
        gs.push(g);
        bs.push(b);
      }
    }
    const med = (arr) => {
      const s = [...arr].sort((x, y) => x - y);
      return s.length ? s[Math.floor(s.length / 2)] : null;
    };
    return { n: rs.length, rgb: rs.length ? [med(rs), med(gs), med(bs)] : null };
  }, b64);
}

// Overlap (copper+bone same row) and ink-gap, scanned inside the decoder page in
// one pass over the head rect's own screenshot.
async function overlapAndGap(b64, dsf) {
  if (!b64) return null;
  return decoder.evaluate(async (b64, dsf) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    const isCopper = (r, g, b) => Math.abs(r - 200) <= 30 && Math.abs(g - 84) <= 30 && Math.abs(b - 43) <= 30;
    const isBone = (r, g, b) => r >= 200 && g >= 190 && b >= 170;
    let overlapRows = 0;
    let lowestCopperRow = -1;
    for (let y = 0; y < c.height; y++) {
      let hasCopper = false;
      let hasBone = false;
      for (let x = 0; x < c.width; x++) {
        const i = (y * c.width + x) * 4;
        if (isCopper(d[i], d[i + 1], d[i + 2])) hasCopper = true;
        if (isBone(d[i], d[i + 1], d[i + 2])) hasBone = true;
      }
      if (hasCopper && hasBone) overlapRows++;
      if (hasCopper) lowestCopperRow = y;
    }
    let firstBoneRowBelow = -1;
    if (lowestCopperRow >= 0) {
      for (let y = lowestCopperRow + 1; y < c.height; y++) {
        let hasBone = false;
        for (let x = 0; x < c.width; x++) {
          const i = (y * c.width + x) * 4;
          if (isBone(d[i], d[i + 1], d[i + 2])) {
            hasBone = true;
            break;
          }
        }
        if (hasBone) {
          firstBoneRowBelow = y;
          break;
        }
      }
    }
    const gapDevicePx = lowestCopperRow >= 0 && firstBoneRowBelow >= 0 ? firstBoneRowBelow - lowestCopperRow : null;
    return { overlapRows, hasCopper: lowestCopperRow >= 0, gapCssPx: gapDevicePx === null ? null : gapDevicePx / dsf };
  }, b64, dsf);
}

// Mean abs channel diff and luminance std between two base64 PNG crops (clip120 pattern).
async function decodeDiff(b64a, b64b) {
  return decoder.evaluate(
    async (list) => {
      const crops = [];
      for (const b64 of list) {
        const img = new Image();
        img.src = `data:image/png;base64,${b64}`;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        crops.push(ctx.getImageData(0, 0, c.width, c.height).data);
      }
      const std = crops.map((d) => {
        let n = 0, sum = 0, sq = 0;
        for (let i = 0; i < d.length; i += 4) {
          const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
          n++;
          sum += l;
          sq += l * l;
        }
        const mean = sum / n;
        return Math.sqrt(Math.max(0, sq / n - mean * mean));
      });
      let maxDiff = null;
      let meanDiff = null;
      if (crops.length >= 2) {
        const [a, b] = crops;
        if (a.length !== b.length) {
          maxDiff = Infinity;
          meanDiff = Infinity;
        } else {
          maxDiff = 0;
          let sum = 0, n = 0;
          for (let i = 0; i < a.length; i++) {
            if (i % 4 === 3) continue;
            const dd = Math.abs(a[i] - b[i]);
            if (dd > maxDiff) maxDiff = dd;
            sum += dd;
            n++;
          }
          meanDiff = sum / n;
        }
      }
      return { std, maxDiff, meanDiff };
    },
    [b64a, b64b].filter(Boolean),
  );
}

async function openPage(w, { reduced = false, js = true, saveData = false } = {}) {
  const page = await browser.newPage();
  await page.bringToFront();
  await page.setCacheEnabled(false);
  await page.setViewport(VP[w]);
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: reduced ? "reduce" : "no-preference" }]);
  if (saveData)
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(Navigator.prototype, "connection", {
        get: () => ({ saveData: true, effectiveType: "4g", addEventListener() {}, removeEventListener() {} }),
      });
    });
  if (!js) await page.setJavaScriptEnabled(false);
  return page;
}

function installNumSampler() {
  window.__num = { samples: [], done: false };
  const S = window.__num;
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      const t0 = performance.now();
      const tick = () => {
        const num = document.querySelector(".cs-num");
        let wght = null, fvs = null, clip = null;
        if (num) {
          const cs = getComputedStyle(num);
          fvs = cs.fontVariationSettings;
          clip = cs.clipPath;
          const m = /"wght"\s*([\d.]+)/.exec(fvs || "");
          wght = m ? parseFloat(m[1]) : null;
        }
        const opEls = [...document.querySelectorAll(".cs-title__line, .cs-title__kick, .cs-title__tail, .cs-poster__lead")];
        const minOp = opEls.length ? Math.min(...opEls.map((el) => parseFloat(getComputedStyle(el).opacity))) : null;
        S.samples.push({ t: performance.now() - t0, wght, fvs, clip, minOp, hasNum: !!num, opCount: opEls.length });
        if (performance.now() - t0 < 2000) requestAnimationFrame(tick);
        else S.done = true;
      };
      requestAnimationFrame(tick);
    },
    { once: true },
  );
}

// ================================================================== B1-B8, B10
// One primary page load per slug x width serves all of these (motion on, JS on).
for (const slug of SLUGS) {
  for (const w of WIDTHS) {
    const tag = `${slug} ${w}`;
    let page;
    try {
      page = await openPage(w, {});
      await page.evaluateOnNewDocument(installNumSampler);
      const resp = await page.goto(`${BASE}/work/${slug}`, { waitUntil: "load", timeout: 60000 });
      const status = resp ? resp.status() : 0;
      if (status !== 200) {
        chk(`B1 status ${tag}`, false, status, 200);
        console.log(`SKIP ${tag}: status ${status}, B1-B8/B10 not run`);
        await page.close();
        continue;
      }
      await page.waitForFunction(() => window.__num && window.__num.done, { timeout: 8000 }).catch(() => {});

      // ---------------------------------------------------------- B1
      const h1Text = await page.evaluate(() => {
        const el = document.querySelector("main h1.cs-title");
        return el ? el.textContent.replace(/\s+/g, " ").trim() : null;
      });
      chk(`B1 h1 text ${tag}`, h1Text === FRONTMATTER_TITLE[slug], JSON.stringify(h1Text), JSON.stringify(FRONTMATTER_TITLE[slug]));

      // ---------------------------------------------------------- B2
      const counts = await page.evaluate(() => ({
        num: document.querySelectorAll(".cs-num").length,
        poster: document.querySelectorAll(".cs-poster").length,
        figureLine: document.querySelectorAll(".cs-title__line--figure").length,
        line: document.querySelectorAll(".cs-title__line").length,
      }));
      const wantNum = POSTER_SLUGS.includes(slug) ? 1 : 0;
      const wantPoster = slug === "birth-worker" ? 1 : 0;
      const wantFigureLine = ["guardicore", "rfp-engine", "content-engine"].includes(slug) ? 1 : 0;
      const b2ok = counts.num === wantNum && counts.poster === wantPoster && counts.figureLine === wantFigureLine && counts.line === 2;
      chk(
        `B2 counts ${tag}`,
        b2ok,
        `num=${counts.num} poster=${counts.poster} figureLine=${counts.figureLine} line=${counts.line}`,
        `num=${wantNum} poster=${wantPoster} figureLine=${wantFigureLine} line=2`,
      );

      // ---------------------------------------------------------- B3
      const strings = await page.evaluate(() => {
        const t = (sel) => {
          const el = document.querySelector(sel);
          return el ? el.textContent.replace(/\s+/g, " ").trim() : null;
        };
        return {
          num: t(".cs-num"),
          kick: t(".cs-title__kick"),
          tail: t(".cs-title__tail"),
          posterLead: t(".cs-poster__lead"),
          hasComma: !!document.querySelector(".cs-num.cs-num--comma"),
        };
      });
      const exp = EXPECT[slug];
      const b3ok =
        strings.num === exp.num &&
        strings.kick === exp.kick &&
        strings.tail === exp.tail &&
        strings.posterLead === exp.posterLead &&
        strings.hasComma === exp.comma;
      chk(
        `B3 strings ${tag}`,
        b3ok,
        `num=${JSON.stringify(strings.num)} kick=${JSON.stringify(strings.kick)} tail=${JSON.stringify(strings.tail)} posterLead=${JSON.stringify(strings.posterLead)} comma=${strings.hasComma}`,
        `num=${JSON.stringify(exp.num)} kick=${JSON.stringify(exp.kick)} tail=${JSON.stringify(exp.tail)} posterLead=${JSON.stringify(exp.posterLead)} comma=${exp.comma}`,
      );

      // ---------------------------------------------------------- B4 (rest state, page has been alive >=2000ms since DCL by now)
      const b4 = await page.evaluate(() => {
        const round = (n) => Math.round(n * 10) / 10;
        const num = document.querySelector(".cs-num");
        let numData = null;
        if (num) {
          const cs = getComputedStyle(num);
          const anims = num.getAnimations ? num.getAnimations() : [];
          numData = {
            fontSize: round(parseFloat(cs.fontSize)),
            color: cs.color,
            fvs: cs.fontVariationSettings,
            animsFinished: anims.length === 0 || anims.every((a) => a.playState === "finished"),
            animsCount: anims.length,
          };
        }
        const lineEls = [...document.querySelectorAll(".cs-title__line, .cs-title__kick, .cs-title__tail, .cs-poster__lead")];
        const opacities = lineEls.map((el) => round(parseFloat(getComputedStyle(el).opacity)));
        const plainLineEls = [...document.querySelectorAll(".cs-title__line, .cs-title__kick, .cs-title__tail")];
        const lineSizes = plainLineEls.map((el) => {
          const cs = getComputedStyle(el);
          return { fontSize: round(parseFloat(cs.fontSize)), fontWeight: cs.fontWeight };
        });
        const posterLeadEl = document.querySelector(".cs-poster__lead");
        const posterLead = posterLeadEl
          ? (() => {
              const cs = getComputedStyle(posterLeadEl);
              return { fontSize: round(parseFloat(cs.fontSize)), fontWeight: cs.fontWeight };
            })()
          : null;
        // The accent as the page itself computes it, so the check reads the
        // design system instead of a hex from a doc (judge ruling 2026-09-19).
        // --cs-accent is scoped to [data-mode="theater"] .cs, so a probe on
        // document.body (an ancestor) inherits nothing and reads black. The
        // probe has to live INSIDE the scope it is asking about. Caught by
        // the Stage 2 leg, which proved it with both probes side by side.
        const probe = document.createElement('span');
        probe.style.color = 'var(--cs-accent)';
        (document.querySelector('.cs-band__head') || document.querySelector('.cs') || document.body).appendChild(probe);
        const tokenColor = getComputedStyle(probe).color;
        probe.remove();
        return { numData, opacities, lineSizes, posterLead, tokenColor };
      });
      if (POSTER_SLUGS.includes(slug)) {
        const wantFs = w === 390 ? (exp.words ? 77.8 : 99.4) : exp.words ? 188 : 240;
        const numOk =
          !!b4.numData &&
          Math.abs(b4.numData.fontSize - wantFs) <= (w === 390 ? 0.3 : 0.6) &&
          // JUDGE RULING (main session, 2026-09-19): assert the poster takes the
          // site's OWN accent token, not a hex copied from the docs. The live
          // token is --color-accent-copper #bd5a2d (rgb(189,90,45)); .claude/
          // CLAUDE.md, brand.json and globals.css's own header comment still say
          // #C8542B, drift that predates this pass (the repo wins). Comparing to
          // the computed token catches a wrong colour without re-encoding a
          // stale one.
          b4.numData.color === b4.tokenColor &&
          /"wght"\s*800/.test(b4.numData.fvs || "") &&
          b4.numData.animsFinished;
        const lineOk = b4.lineSizes.every((l) => Math.abs(l.fontSize - (w === 390 ? 36 : 56)) <= 0.5 && l.fontWeight === "800");
        const opOk = b4.opacities.every((o) => o === 1);
        const posterLeadOk =
          slug !== "birth-worker" ||
          (!!b4.posterLead && Math.abs(b4.posterLead.fontSize - (w === 390 ? 26 : 36)) <= 0.5 && b4.posterLead.fontWeight === "700");
        chk(
          `B4 rest state ${tag}`,
          numOk && lineOk && opOk && posterLeadOk,
          `num=${JSON.stringify(b4.numData)} lineSizes=${JSON.stringify(b4.lineSizes)} opacities=${JSON.stringify(b4.opacities)} posterLead=${JSON.stringify(b4.posterLead)}`,
          `num fontSize~${wantFs}px color rgb(200,84,43) wght 800 finished; lines ${w === 390 ? 36 : 56}px/800; all opacity 1${slug === "birth-worker" ? `; posterLead ${w === 390 ? 26 : 36}px/700` : ""}`,
        );
      } else {
        // ordani: no .cs-num ever; only the generic line metrics apply.
        const lineOk = b4.lineSizes.every((l) => Math.abs(l.fontSize - (w === 390 ? 36 : 56)) <= 0.5 && l.fontWeight === "800");
        const opOk = b4.opacities.every((o) => o === 1);
        chk(
          `B4 rest state ${tag}`,
          lineOk && opOk,
          `lineSizes=${JSON.stringify(b4.lineSizes)} opacities=${JSON.stringify(b4.opacities)}`,
          `lines ${w === 390 ? 36 : 56}px/800; all opacity 1 (ordani carries no .cs-num)`,
        );
      }

      // ---------------------------------------------------------- geometry for B5 fit / B6 / B10 (pre-scroll)
      const geo = await page.evaluate(() => {
        const r = (el) => {
          if (!el) return null;
          const b = el.getBoundingClientRect();
          return { x: b.x, y: b.y, width: b.width, height: b.height, right: b.right, bottom: b.bottom };
        };
        return { head: r(document.querySelector(".cs-band__head")), num: r(document.querySelector(".cs-num")) };
      });

      // ---------------------------------------------------------- B5 (fit part; scrollWidth sweep runs later, after captures)
      if (!geo.num) {
        report(`B5 fit ${tag}`, "no .cs-num element -- fit check NA");
      } else {
        const fitOk = geo.num.right <= geo.head.right + 0.5;
        chk(`B5 fit ${tag}`, fitOk, `num right=${f1(geo.num.right)} head right=${f1(geo.head.right)}`, `num right <= head right + 0.5 (${f1(geo.head.right + 0.5)})`);
        report(`B5 poster width ${tag}`, `${f1(geo.num.width)}px`);
      }

      // ---------------------------------------------------------- rest screenshot (for B6 + B10), BEFORE any scrolling
      const dsf = VP[w].deviceScaleFactor;
      let headB64 = null;
      if (geo.head && geo.head.width > 0 && geo.head.height > 0) {
        try {
          headB64 = await page.screenshot({
            clip: { x: Math.max(0, geo.head.x), y: Math.max(0, geo.head.y), width: geo.head.width, height: geo.head.height },
            encoding: "base64",
          });
        } catch (e) {
          headB64 = null;
        }
      }

      // ---------------------------------------------------------- B6
      if (!headB64) {
        chk(`B6 overlap ${tag}`, false, "could not screenshot .cs-band__head", "0 overlap rows");
      } else {
        const og = await overlapAndGap(headB64, dsf);
        chk(`B6 overlap ${tag}`, og.overlapRows === 0, `${og.overlapRows} rows with both copper and bone`, 0);
        if (og.hasCopper && og.gapCssPx !== null) {
          const [lo, hi] = w === 390 ? [6, 18] : [12, 32];
          const inRange = og.gapCssPx >= lo && og.gapCssPx <= hi;
          report(`B6 ink gap ${tag}`, `${f1(og.gapCssPx)}px (expect ${lo}-${hi}px; ${inRange ? "in range" : "OUTSIDE range, judge rules"})`);
        } else {
          report(`B6 ink gap ${tag}`, "no copper pixels in the head rect -- NA");
        }
      }

      // ---------------------------------------------------------- B7
      const b7 = await page.evaluate(() => {
        const resultEls = [...document.querySelectorAll(".cs-glance__result")];
        const restEl = document.querySelector(".cs-glance__result-rest");
        const dtEls = [...document.querySelectorAll(".cs-glance dt")].filter((d) => d.textContent.trim() === "Results");
        return {
          resultCount: resultEls.length,
          restText: restEl ? restEl.textContent.replace(/\s+/g, " ").trim() : null,
          hasResultsDt: dtEls.length >= 1,
        };
      });
      // birth-worker's lead is promoted into the band poster, so its Results row
      // prints no lead. rfp-engine prints none either, since 2026-09-20: the
      // operator ruled on 09-19 that a lead which merely repeats the title's
      // figure line must be dropped ("Drop the repeat, keep the rest", LESSONS
      // #3 "PASS-123 JUDGE-GATE ANSWERS"), and commit be786f7 built it. This
      // check asserted the repeat and so failed on the first build that obeyed
      // the ruling -- the same stale-check shape that LESSONS #45 caught in
      // CARD 1 the same day. Corrected here rather than tolerated, because a
      // check that cries wolf on approved copy gets ignored, and then it is
      // not a check. scripts/results-repeat-gate.mjs is the build-time gate
      // that holds the rule properly, off the rendered bytes.
      const NO_RESULT_LEAD = ["birth-worker", "rfp-engine"];
      const wantResultCount = NO_RESULT_LEAD.includes(slug) ? 0 : 1;
      let b7ok = b7.resultCount === wantResultCount && b7.hasResultsDt;
      if (slug === "birth-worker") b7ok = b7ok && b7.restText === RESULT_REST_BIRTHWORKER;
      chk(
        `B7 results row ${tag}`,
        b7ok,
        `resultCount=${b7.resultCount} hasResultsDt=${b7.hasResultsDt}${slug === "birth-worker" ? ` restText=${JSON.stringify(b7.restText)}` : ""}`,
        `resultCount=${wantResultCount}, dt "Results" present${slug === "birth-worker" ? `, restText=${JSON.stringify(RESULT_REST_BIRTHWORKER)}` : ""}`,
      );

      // ---------------------------------------------------------- B8 (poster studies only)
      if (POSTER_SLUGS.includes(slug)) {
        const samples = await page.evaluate(() => (window.__num ? window.__num.samples : []));
        const withNum = samples.filter((s) => s.hasNum && s.wght !== null);
        if (!withNum.length) {
          chk(
            `B8 assembly ${tag}`,
            false,
            "no .cs-num sampled in any of the 2000ms of frames",
            "wght<800 first, non-decreasing, last=800, clip-path final inset(-25% -10% -25% -10%), opacity 1 by 1000ms",
          );
        } else {
          const first = withNum[0];
          const last = withNum[withNum.length - 1];
          let nonDecreasing = true;
          for (let i = 1; i < withNum.length; i++) if (withNum[i].wght < withNum[i - 1].wght - 1) nonDecreasing = false;
          // Chrome serialises inset(-25% -10% -25% -10%) as its 2-value
          // shorthand inset(-25% -10%): same box, different string. Compare
          // the four sides, not the text (judge ruling 2026-09-19).
          const insets = String(last.clip || '').match(/-?[\d.]+%/g) || [];
          const sides = insets.length === 2 ? [insets[0], insets[1], insets[0], insets[1]]
            : insets.length === 4 ? insets : null;
          const clipOk = !!sides && sides[0] === '-25%' && sides[1] === '-10%'
            && sides[2] === '-25%' && sides[3] === '-10%';
          let opReachT = null;
          for (const s of samples) {
            if (s.opCount > 0 && s.minOp !== null && s.minOp >= 0.999) {
              opReachT = s.t;
              break;
            }
          }
          const ok = first.wght < 800 && nonDecreasing && Math.abs(last.wght - 800) < 0.5 && clipOk && opReachT !== null && opReachT <= 1000;
          chk(
            `B8 assembly ${tag}`,
            ok,
            `first wght=${f1(first.wght)}@${f1(first.t)}ms, ${nonDecreasing ? "non-decreasing" : "NOT non-decreasing"}, last wght=${f1(last.wght)}, last clip=${last.clip}, opacity->1 at ${opReachT === null ? "never" : `${f1(opReachT)}ms`}`,
            "first<800, non-decreasing, last=800, clip inset(-25% -10% -25% -10%), opacity 1 by 1000ms",
          );
          let weight800T = null;
          for (const s of withNum) {
            if (Math.abs(s.wght - 800) < 0.5) {
              weight800T = s.t;
              break;
            }
          }
          const topInset = (/inset\(([^ ]+)/.exec(first.clip || "") || [])[1] || "n/a";
          report(
            `B8 timing ${tag}`,
            `first sample t=${f1(first.t)}ms wght=${f1(first.wght)} clip-top-inset=${topInset}; weight first reads 800 at ${weight800T === null ? "never within 2000ms" : `${f1(weight800T)}ms`} (expect <= 900ms)`,
          );
        }
      }

      // ---------------------------------------------------------- B10 (contrast)
      const B10_SELECTORS = [
        ".cs-band__context",
        ".cs-title__line",
        ".cs-title__kick",
        ".cs-title__tail",
        ".cs-num",
        ".cs-poster__lead",
        ".cs-band__dek",
        ".cs-glance dt",
        ".cs-glance dd",
        ".cs-glance__protected",
        ".cs-glance__result",
        ".cs-glance__result-rest",
      ];
      const elMetas = await page.evaluate((sels) => {
        const out = [];
        for (const sel of sels) {
          const els = [...document.querySelectorAll(sel)];
          els.forEach((el, i) => {
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            if (r.width <= 0 || r.height <= 0 || cs.visibility === "hidden") return;
            out.push({
              label: `${sel}${els.length > 1 ? `#${i}` : ""}`,
              rect: { x: r.x, y: r.y, width: r.width, height: r.height },
              color: cs.color,
              fontSize: parseFloat(cs.fontSize),
              fontWeight: parseFloat(cs.fontWeight) || 400,
            });
          });
        }
        return out;
      }, B10_SELECTORS);

      const patchSize = w === 390 ? 12 : 24;
      const patchX0 = w === 390 ? 2 : 40;
      const ratios = [];
      for (const meta of elMetas) {
        const midY = meta.rect.y + meta.rect.height / 2;
        const patchY0 = Math.max(0, midY - patchSize / 2);
        let groundB64 = null;
        try {
          groundB64 = await page.screenshot({
            clip: { x: patchX0, y: patchY0, width: patchSize, height: patchSize },
            encoding: "base64",
          });
        } catch {
          groundB64 = null;
        }
        const ground = await medianColorOfPng(groundB64);
        const textRgb = parseRgb(meta.color);
        if (!ground || !textRgb) {
          ratios.push({ label: meta.label, ratio: null });
          continue;
        }
        const ratio = contrastRatio(textRgb, ground);
        const isLarge = meta.fontSize >= 24 || (meta.fontSize >= 18.66 && meta.fontWeight >= 700);
        const threshold = isLarge ? 3.0 : 4.5;
        ratios.push({ label: meta.label, ratio, threshold, fontSize: meta.fontSize });

        if (meta.label.startsWith(".cs-num")) {
          let numB64 = null;
          try {
            numB64 = await page.screenshot({ clip: { x: meta.rect.x, y: meta.rect.y, width: meta.rect.width, height: meta.rect.height }, encoding: "base64" });
          } catch {
            numB64 = null;
          }
          const copper = await medianCopperOfPng(numB64);
          if (copper.n > 0 && ground) {
            const copperRatio = contrastRatio(copper.rgb, ground);
            ratios.push({ label: `${meta.label} (copper pixels)`, ratio: copperRatio, threshold: 3.0 });
          }
        }
      }
      const measured = ratios.filter((r) => r.ratio !== null);
      const b10ok = measured.every((r) => r.ratio >= r.threshold);
      chk(
        `B10 contrast ${tag}`,
        b10ok,
        measured.map((r) => `${r.label}=${r.ratio.toFixed(2)}(>=${r.threshold})`).join(" ") || "(no visible elements measured)",
        "every ratio >= its threshold",
      );

      // ---------------------------------------------------------- B5 scrollWidth sweep (390 only; destructive, so last)
      if (w === 390) {
        const bandBottom = await page.evaluate(() => {
          const el = document.querySelector(".cs-band");
          return el ? el.getBoundingClientRect().bottom + window.scrollY : document.body.scrollHeight;
        });
        const bad = [];
        for (let y = 0; y <= bandBottom; y += 422) {
          await page.evaluate((yy) => window.scrollTo(0, yy), y);
          await sleep(80);
          const sw = await page.evaluate(() => document.documentElement.scrollWidth);
          if (sw !== 390) bad.push(`${y}px->${sw}`);
        }
        chk(`B5 scrollWidth-390 ${tag}`, bad.length === 0, bad.length ? `scrollWidth != 390 at ${bad.join(", ")}` : "390 at every 422px step", "390 at every step");
      }

      await page.close();
    } catch (e) {
      chk(`B-checks ${tag}`, false, `error: ${errText(e)}`, "no error");
      if (page) await page.close().catch(() => {});
    }
  }
}

// ================================================================== B9 (fresh loads)
async function headRestsNoJs(w, slug) {
  const tag = `${slug} ${w}`;
  let page;
  try {
    page = await openPage(w, { js: false });
    const resp = await page.goto(`${BASE}/work/${slug}`, { waitUntil: "load", timeout: 60000 }).catch(() => null);
    const status = resp ? resp.status() : 0;
    if (status !== 200) {
      chk(`B9 no-JS ${tag}`, false, `status ${status}`, "status 200");
      return;
    }
    const t0 = Date.now();
    const rectAt = async (targetMs) => {
      const d = targetMs - (Date.now() - t0);
      if (d > 0) await sleep(d);
      const head = await page.evaluate(() => {
        const el = document.querySelector(".cs-band__head");
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      });
      if (!head || head.width <= 0 || head.height <= 0) return null;
      return page.screenshot({ clip: head, encoding: "base64" });
    };
    const c300 = await rectAt(300);
    const c1500 = await rectAt(1500);
    if (!c300 || !c1500) {
      chk(`B9 no-JS ${tag}`, false, "no .cs-band__head rect to capture", "an inked, stable head rect");
      return;
    }
    const r = await decodeDiff(c300, c1500);
    chk(
      `B9 no-JS ${tag}`,
      r.maxDiff <= 2 && r.std[0] > 10 && r.std[1] > 10,
      `max channel diff ${r.maxDiff}, luminance std ${f1(r.std[0])} / ${f1(r.std[1])}`,
      "diff <= 2, std > 10 (both frames)",
    );
  } catch (e) {
    chk(`B9 no-JS ${tag}`, false, `error: ${errText(e)}`, "no error");
  } finally {
    if (page) await page.close().catch(() => {});
  }
}

async function reducedMotionRest(w, slug) {
  const tag = `${slug} ${w}`;
  let page;
  try {
    page = await openPage(w, { reduced: true });
    const resp = await page.goto(`${BASE}/work/${slug}`, { waitUntil: "load", timeout: 60000 });
    const status = resp ? resp.status() : 0;
    if (status !== 200) {
      chk(`B9 reduced-motion ${tag}`, false, `status ${status}`, "status 200");
      return;
    }
    await sleep(100);
    const r = await page.evaluate(() => {
      const num = document.querySelector(".cs-num");
      let numData = null;
      if (num) {
        const anims = num.getAnimations ? num.getAnimations() : [];
        const cs = getComputedStyle(num);
        numData = { animsLength: anims.length, fvs: cs.fontVariationSettings, fontWeight: cs.fontWeight };
      }
      const lines = [...document.querySelectorAll(".cs-title__line, .cs-title__kick, .cs-title__tail, .cs-poster__lead")];
      const allOpacity1 = lines.every((el) => parseFloat(getComputedStyle(el).opacity) === 1);
      return { numData, allOpacity1, lineCount: lines.length };
    });
    if (POSTER_SLUGS.includes(slug)) {
      const numOk = !!r.numData && r.numData.animsLength === 0 && r.numData.fvs === "normal" && r.numData.fontWeight === "800";
      chk(
        `B9 reduced-motion ${tag}`,
        numOk && r.allOpacity1,
        `num=${JSON.stringify(r.numData)} allOpacity1=${r.allOpacity1} (${r.lineCount} lines)`,
        "num animsLength 0, fvs normal, weight 800; every title line opacity 1",
      );
    } else {
      chk(`B9 reduced-motion ${tag}`, r.allOpacity1, `allOpacity1=${r.allOpacity1} (${r.lineCount} lines, no .cs-num on ordani)`, "every title line opacity 1");
    }
  } catch (e) {
    chk(`B9 reduced-motion ${tag}`, false, `error: ${errText(e)}`, "no error");
  } finally {
    if (page) await page.close().catch(() => {});
  }
}

for (const slug of SLUGS) {
  for (const w of WIDTHS) {
    await reducedMotionRest(w, slug);
    await headRestsNoJs(w, slug);
  }
}

// ================================================================== K1 (SSR, fetch only)
try {
  const res = await fetch(`${BASE}/work/${BAND_CLIP_SLUG}`, { cache: "no-store" });
  const html = (await res.text()).replace(/<!-- -->/g, "");
  const videos = (html.match(/<video\b/gi) || []).length;
  chk(`K1 video count ${BAND_CLIP_SLUG}`, videos === 1, videos, 1);
  const tracks = (html.match(/<track\b/gi) || []).length;
  chk(`K1 track count ${BAND_CLIP_SLUG}`, tracks === 0, tracks, 0);
  const tag = (html.match(/<video\b[^>]*>/i) || [null])[0];
  if (tag) {
    const attrs = {};
    const body = tag.replace(/^<video\b/i, "").replace(/\/?>$/, "");
    for (const m of body.matchAll(/([^\s"'=<>\/`]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g))
      attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
    const banned = ["autoplay", "loop", "controls", "poster"].filter((a) => a in attrs);
    const ok =
      attrs.preload === "none" &&
      attrs["aria-hidden"] === "true" &&
      "playsinline" in attrs &&
      banned.length === 0;
    chk(
      `K1 video attrs ${BAND_CLIP_SLUG}`,
      ok,
      `preload=${JSON.stringify(attrs.preload)} aria-hidden=${JSON.stringify(attrs["aria-hidden"])} playsinline=${"playsinline" in attrs} banned-present=${banned.join(",") || "none"}`,
      `preload="none" aria-hidden="true" playsinline present, none of autoplay/loop/controls/poster`,
    );
  } else {
    chk(`K1 video attrs ${BAND_CLIP_SLUG}`, false, "no <video tag on the page", "preload=none aria-hidden=true playsinline, no autoplay/loop/controls/poster");
  }
  const preloadLinks = html.match(/<link[^>]*rel="preload"[^>]*as="image"[^>]*>/gi) || [];
  const hasGuardicorePreload = preloadLinks.some((l) => l.includes("guardicore-band-960"));
  chk(`K1 preload link ${BAND_CLIP_SLUG}`, hasGuardicorePreload, `${preloadLinks.length} preload-image links${hasGuardicorePreload ? ", one names guardicore-band-960" : ""}`, "one names guardicore-band-960");
  const imgIdx = html.indexOf('class="cs-band__img');
  const imgIdxAlt = imgIdx === -1 ? html.search(/class="[^"]*\bcs-band__img\b/) : imgIdx;
  const videoIdx = html.search(/class="[^"]*\bcs-band__clip\b/);
  if (imgIdxAlt === -1 || videoIdx === -1) {
    chk(`K1 img-precedes-video ${BAND_CLIP_SLUG}`, false, `img.cs-band__img at ${imgIdxAlt}, video.cs-band__clip at ${videoIdx}`, "both present, img index < video index");
  } else {
    chk(`K1 img-precedes-video ${BAND_CLIP_SLUG}`, imgIdxAlt < videoIdx, `img at ${imgIdxAlt}, video at ${videoIdx}`, "img index < video index");
  }
} catch (e) {
  chk(`K1 SSR ${BAND_CLIP_SLUG}`, false, `error: ${errText(e)}`, "no error");
}

for (const slug of SLUGS.filter((s) => s !== BAND_CLIP_SLUG)) {
  try {
    const res = await fetch(`${BASE}/work/${slug}`, { cache: "no-store" });
    const html = await res.text();
    const videos = (html.match(/<video\b/gi) || []).length;
    chk(`K1 video count ${slug}`, videos === 0, videos, 0);
  } catch (e) {
    chk(`K1 video count ${slug}`, false, `error: ${errText(e)}`, "no error");
  }
}

// ================================================================== K2-K5, K7, K8 (guardicore, main flow)
async function mediaRect(page) {
  return page.evaluate(() => {
    const el = document.querySelector("video.cs-band__clip");
    if (!el) return { kind: null };
    const r = el.getBoundingClientRect();
    const x0 = Math.max(0, r.left);
    const y0 = Math.max(0, r.top);
    const x1 = Math.min(window.innerWidth, r.right);
    const y1 = Math.min(window.innerHeight, r.bottom);
    return {
      kind: "video",
      rect: x1 > x0 && y1 > y0 ? { x: x0, y: y0, width: x1 - x0, height: y1 - y0 } : null,
    };
  });
}

async function loadGuardicore(page) {
  const resp = await page.goto(`${BASE}/work/${BAND_CLIP_SLUG}`, { waitUntil: "load", timeout: 60000 });
  const t0 = Date.now();
  const r = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    return { now: performance.now(), load: nav ? nav.loadEventEnd : null };
  });
  const t1 = Date.now();
  const offset = (t0 + t1) / 2 - r.now;
  return {
    status: resp ? resp.status() : 0,
    load: r.load,
    toNode: (pt) => pt + offset,
    pageNow: () => Date.now() - offset,
  };
}
const waitUntilPage = async (clock, pageT) => {
  const d = clock.toNode(pageT) - Date.now();
  if (d > 0) await sleep(d);
};

for (const w of WIDTHS) {
  const tag = `${BAND_CLIP_SLUG} ${w}`;
  let page;
  try {
    page = await openPage(w, {});
    await page.evaluateOnNewDocument(() => {
      window.__clipEvents = {};
      for (const ev of ["playing", "ended"]) {
        document.addEventListener(
          ev,
          (e) => {
            if (e.target && e.target.tagName === "VIDEO" && !(ev in window.__clipEvents)) window.__clipEvents[ev] = performance.now();
          },
          true,
        );
      }
    });
    const clock = await loadGuardicore(page);
    if (clock.status !== 200) {
      chk(`K3 plays once ${tag}`, false, clock.status, 200);
      continue;
    }
    if (w === 390) {
      await page.evaluate(() => {
        const m = document.querySelector(".cs-band__media");
        if (m) m.scrollIntoView({ block: "center" });
      });
    }
    const m = await mediaRect(page);
    if (m.kind !== "video" || !m.rect) {
      chk(`K3 plays once ${tag}`, false, "no video.cs-band__clip in the viewport", "a main video in the viewport");
      if (w === 1440) chk(`K2 properties ${tag}`, false, "no video.cs-band__clip", "a video element");
      chk(`K4 visible while playing ${tag}`, false, "no video.cs-band__clip", "opacity 1 while playing, pixels differ from clip-pre");
      chk(`K5 rests on photo ${tag}`, false, "no video.cs-band__clip", "opacity 0 after ended, pixels equal clip-pre");
      chk(`K8 no early fetch ${tag}`, false, "no video.cs-band__clip to evaluate", "0 media fetches before load, >=1 after playing");
    } else {
      // clip-pre: before play can possibly arm (spec floor is 1200ms).
      await waitUntilPage(clock, Math.min(clock.load + 200, 200));
      const clipPre = await page.screenshot({ clip: m.rect, encoding: "base64" });

      let playing = null;
      const deadlinePlaying = Date.now() + 8000;
      while (Date.now() < deadlinePlaying) {
        playing = await page.evaluate(() => window.__clipEvents.playing ?? null);
        if (playing !== null) break;
        await sleep(100);
      }
      if (playing === null) {
        chk(`K3 plays once ${tag}`, false, "no playing event within 8000ms", "playing fires, performance.now() >= 1200");
        chk(`K4 visible while playing ${tag}`, false, "video never played", "opacity 1 while playing, pixels differ from clip-pre");
        chk(`K5 rests on photo ${tag}`, false, "video never played", "opacity 0 after ended, pixels equal clip-pre");
      } else {
        chk(`K3 floor 1200ms ${tag}`, playing >= 1200, f1(playing), ">= 1200");
        await waitUntilPage(clock, playing + 100);
        const p100 = await page.screenshot({ clip: m.rect, encoding: "base64" });
        const dQuiet = await decodeDiff(clipPre, p100);
        chk(`K4 quiet at +100ms ${tag}`, dQuiet.meanDiff <= 10, `mean channel diff ${f1(dQuiet.meanDiff)}`, "<= 10 (frame 0 is the photo)");

        await waitUntilPage(clock, playing + 2000);
        const p2000 = await page.screenshot({ clip: m.rect, encoding: "base64" });
        const op2000 = await page.evaluate(() => {
          const v = document.querySelector("video.cs-band__clip");
          return v ? parseFloat(getComputedStyle(v).opacity) : null;
        });
        const dMoved = await decodeDiff(clipPre, p2000);
        chk(
          `K4 visible while playing ${tag}`,
          op2000 === 1 && dMoved.meanDiff > 3,
          `opacity=${op2000}, mean channel diff from clip-pre ${f1(dMoved.meanDiff)}`,
          "opacity 1, mean channel diff from clip-pre > 3",
        );

        let ended = null;
        while (Date.now() < deadlinePlaying + 2000) {
          ended = await page.evaluate(() => window.__clipEvents.ended ?? null);
          if (ended !== null) break;
          await sleep(100);
        }
        const endedOk = ended !== null && clock.toNode(ended) - clock.toNode(clock.load) <= 8000;
        chk(`K3 ended within 8000ms ${tag}`, endedOk, ended === null ? "no ended event" : `${f1(ended - clock.load)}ms after load`, "<= 8000ms after load");
        if (endedOk) {
          const p = await page.evaluate(() => {
            const v = document.querySelector("video.cs-band__clip");
            return { paused: v.paused, n: v.played.length, start: v.played.length ? v.played.start(0) : null, end: v.played.length ? v.played.end(0) : null, duration: v.duration };
          });
          chk(
            `K3 played once ${tag}`,
            p.paused === true && p.n === 1 && p.start <= 0.05 && p.end >= p.duration - 0.1,
            `paused=${p.paused} played.length=${p.n} start=${p.start} end=${p.end} duration=${p.duration}`,
            "paused true, played.length 1, start<=0.05, end>=duration-0.1",
          );
          await waitUntilPage(clock, ended + 600);
          const e600 = await page.screenshot({ clip: m.rect, encoding: "base64" });
          const opEnded = await page.evaluate(() => {
            const v = document.querySelector("video.cs-band__clip");
            return v ? { opacity: parseFloat(getComputedStyle(v).opacity), isPlaying: v.classList.contains("is-playing") } : null;
          });
          const dRest = await decodeDiff(clipPre, e600);
          chk(
            `K5 rests on photo ${tag}`,
            !!opEnded && opEnded.opacity === 0 && !opEnded.isPlaying && dRest.maxDiff <= 2 && dRest.std[0] > 10 && dRest.std[1] > 10,
            `opacity=${opEnded ? opEnded.opacity : "n/a"} is-playing=${opEnded ? opEnded.isPlaying : "n/a"} maxDiff-from-clip-pre=${dRest.maxDiff} std=${f1(dRest.std[0])}/${f1(dRest.std[1])}`,
            "opacity 0, is-playing absent, maxDiff<=2 from clip-pre, std>10",
          );
        } else {
          chk(`K3 played once ${tag}`, false, "no ended event", "played.length 1 etc.");
          chk(`K5 rests on photo ${tag}`, false, "no ended event", "opacity 0, pixels equal clip-pre");
        }

        if (w === 1440) {
          const q = await page.evaluate(() => {
            const v = document.querySelector("video.cs-band__clip");
            return v
              ? { muted: v.muted, playsInline: v.playsInline, loop: v.loop, controls: v.controls, duration: v.duration, currentSrc: v.currentSrc }
              : null;
          });
          chk(
            `K2 properties ${tag}`,
            !!q && q.muted === true && q.playsInline === true && q.loop === false && q.controls === false && q.duration >= 3.9 && q.duration <= 4.2 && /\.(webm|mp4)$/i.test(q.currentSrc || ""),
            JSON.stringify(q),
            "muted true, playsInline true, loop false, controls false, 3.9<=duration<=4.2, currentSrc ends .webm/.mp4",
          );
        }
      }

      // K8: resource timing for /media/work-hero-720
      const resources = await page.evaluate(() => {
        const nav = performance.getEntriesByType("navigation")[0];
        const loadEventEnd = nav ? nav.loadEventEnd : null;
        const hits = performance.getEntriesByType("resource").filter((r) => r.name.includes("/media/work-hero-720"));
        return { loadEventEnd, hits: hits.map((h) => ({ name: h.name, startTime: h.startTime })) };
      });
      const beforeLoad = resources.hits.filter((h) => resources.loadEventEnd !== null && h.startTime < resources.loadEventEnd);
      chk(
        `K8 no early fetch ${tag}`,
        beforeLoad.length === 0,
        `${beforeLoad.length} of ${resources.hits.length} work-hero-720 fetches before loadEventEnd`,
        "0 before loadEventEnd",
      );
      chk(`K8 fetch after playing ${tag}`, resources.hits.length >= 1, `${resources.hits.length} total work-hero-720 fetches`, ">= 1 (after playing)");
    }

    // K7: no caption, in the loaded page regardless of clip outcome.
    const cap = await page.evaluate(() => {
      const media = document.querySelector(".cs-band__media");
      if (!media) return null;
      const mr = media.getBoundingClientRect();
      const insideHits = [];
      const walkerScope = media;
      const visible = (el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none";
      };
      const wIn = document.createTreeWalker(walkerScope, NodeFilter.SHOW_TEXT);
      for (let n = wIn.nextNode(); n; n = wIn.nextNode()) {
        const text = n.textContent.replace(/\s+/g, " ").trim();
        if (text && n.parentElement && visible(n.parentElement)) insideHits.push(text.slice(0, 40));
      }
      const band = document.querySelector(".cs-band");
      const belowHits = [];
      if (band) {
        const wBand = document.createTreeWalker(band, NodeFilter.SHOW_TEXT);
        for (let n = wBand.nextNode(); n; n = wBand.nextNode()) {
          const text = n.textContent.replace(/\s+/g, " ").trim();
          if (!text || !n.parentElement || !visible(n.parentElement)) continue;
          const range = document.createRange();
          range.selectNodeContents(n);
          for (const r of range.getClientRects()) {
            if (r.width <= 0 || r.height <= 0) continue;
            if (r.top >= mr.bottom - 1 && r.top < mr.bottom + 120 && r.right > mr.left && r.left < mr.right) {
              belowHits.push(text.slice(0, 40));
              break;
            }
          }
        }
      }
      return { insideHits, belowHits };
    });
    if (cap === null) chk(`K7 no caption ${tag}`, false, "no .cs-band__media element", "0 text nodes inside/below the media rect");
    else
      chk(
        `K7 no caption ${tag}`,
        cap.insideHits.length === 0 && cap.belowHits.length === 0,
        `${cap.insideHits.length} inside [${cap.insideHits.join(" | ")}], ${cap.belowHits.length} below [${cap.belowHits.join(" | ")}]`,
        "0 and 0",
      );
  } catch (e) {
    chk(`K2-K8 ${tag}`, false, `error: ${errText(e)}`, "no error");
  } finally {
    if (page) await page.close().catch(() => {});
  }
}

// ================================================================== K6 (reduced, save-data, no-JS)
async function restsStatic(id, w, opts) {
  let page;
  try {
    page = await openPage(w, opts);
    const clock = await loadGuardicore(page);
    if (clock.status !== 200) {
      chk(id, false, clock.status, 200);
      return;
    }
    await waitUntilPage(clock, clock.load + 300);
    const m = await mediaRect(page);
    if (!m.rect) {
      // Fall back to the always-present image container so the "no video plays" half of the
      // check is still meaningful even though .cs-band__clip does not exist yet.
      const media = await page.evaluate(() => {
        const el = document.querySelector(".cs-band__media");
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: Math.max(0, r.left), y: Math.max(0, r.top), width: r.width, height: r.height };
      });
      if (!media || media.width <= 0 || media.height <= 0) {
        chk(id, false, "no .cs-band__media / video.cs-band__clip element", "an inked, static media rect");
        return;
      }
      const c1 = await page.screenshot({ clip: media, encoding: "base64" });
      await waitUntilPage(clock, clock.load + 5000);
      const c2 = await page.screenshot({ clip: media, encoding: "base64" });
      const r = await decodeDiff(c1, c2);
      chk(
        id,
        r.maxDiff <= 2 && r.std[0] > 10 && r.std[1] > 10,
        `(video absent, measured .cs-band__media) max channel diff ${r.maxDiff}, std ${f1(r.std[0])}/${f1(r.std[1])}`,
        "diff <= 2, std > 10",
      );
      return;
    }
    const c1 = await page.screenshot({ clip: m.rect, encoding: "base64" });
    await waitUntilPage(clock, clock.load + 5000);
    const c2 = await page.screenshot({ clip: m.rect, encoding: "base64" });
    const r = await decodeDiff(c1, c2);
    const played = await page.evaluate(() => {
      const v = document.querySelector("video.cs-band__clip");
      return v ? v.played.length : null;
    });
    chk(
      id,
      r.maxDiff <= 2 && r.std[0] > 10 && r.std[1] > 10 && (played === 0 || played === null),
      `max channel diff ${r.maxDiff}, std ${f1(r.std[0])}/${f1(r.std[1])}, played.length=${played}`,
      "diff <= 2, std > 10, played.length 0",
    );
  } catch (e) {
    chk(id, false, `error: ${errText(e)}`, "no error");
  } finally {
    if (page) await page.close().catch(() => {});
  }
}

for (const w of WIDTHS) await restsStatic(`K6 reduced-motion ${BAND_CLIP_SLUG} ${w}`, w, { reduced: true });
await restsStatic(`K6 save-data ${BAND_CLIP_SLUG} 1440`, 1440, { saveData: true });
for (const w of WIDTHS) await restsStatic(`K6 no-JS ${BAND_CLIP_SLUG} ${w}`, w, { js: false });

// ================================================================== K9 (frame 0 vs the band photo)
// Implementation note: the brief's text says "in an about:blank page draw ... each onto a
// canvas". A literal about:blank page has an opaque origin, and Next's static /media files are
// not served with CORS headers, so drawing a cross-origin image/video into a canvas there and
// then reading it back with getImageData throws (a tainted canvas). To get real pixels rather
// than a broken probe, this draws on a page navigated to the same origin as the media files
// (BASE), which is same-origin and therefore never taints the canvas; the comparison itself
// (96x120, mean abs diff per channel, the mirrored-jpg bite) is unchanged.
try {
  const page = await browser.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 60000 });
  const result = await page.evaluate(async () => {
    async function drawTo96x120(kind, src) {
      const c = document.createElement("canvas");
      c.width = 96;
      c.height = 120;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (kind === "img") {
        const img = new Image();
        img.src = src;
        await img.decode();
        ctx.drawImage(img, 0, 0, 96, 120);
      } else if (kind === "img-mirror") {
        const img = new Image();
        img.src = src;
        await img.decode();
        ctx.translate(96, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, 96, 120);
      } else {
        const v = document.createElement("video");
        v.src = src;
        v.muted = true;
        v.preload = "auto";
        await new Promise((resolve, reject) => {
          v.addEventListener("loadeddata", () => resolve(), { once: true });
          v.addEventListener("error", () => reject(new Error("video error")), { once: true });
          v.load();
        });
        v.currentTime = 0;
        await new Promise((r) => setTimeout(r, 50));
        ctx.drawImage(v, 0, 0, 96, 120);
      }
      return ctx.getImageData(0, 0, 96, 120).data;
    }
    function meanAbsDiff(a, b) {
      let sum = 0, n = 0;
      for (let i = 0; i < a.length; i++) {
        if (i % 4 === 3) continue;
        sum += Math.abs(a[i] - b[i]);
        n++;
      }
      return sum / n;
    }
    try {
      const jpg = await drawTo96x120("img", "/media/guardicore-band-960.jpg");
      const jpgMirror = await drawTo96x120("img-mirror", "/media/guardicore-band-960.jpg");
      const biteDiff = meanAbsDiff(jpg, jpgMirror);
      let clipFrame = null;
      let clipErr = null;
      try {
        clipFrame = await drawTo96x120("video", "/media/work-hero-720.mp4");
      } catch (e) {
        clipErr = String(e);
      }
      const frameDiff = clipFrame ? meanAbsDiff(jpg, clipFrame) : null;
      return { biteDiff, frameDiff, clipErr };
    } catch (e) {
      return { error: String(e) };
    }
  });
  if (result.error) {
    chk("K9 frame0-is-photo", false, `error: ${result.error}`, "mean abs diff <= 12 (bite: mirrored self-diff > 12)");
  } else {
    chk("K9 bite (mirrored jpg vs itself)", result.biteDiff > 12, f1(result.biteDiff), "> 12");
    if (result.frameDiff === null) chk("K9 frame0-is-photo", false, `could not decode the clip's first frame: ${result.clipErr}`, "mean abs diff <= 12");
    else chk("K9 frame0-is-photo", result.frameDiff <= 12, f1(result.frameDiff), "<= 12");
  }
  await page.close();
} catch (e) {
  chk("K9 frame0-is-photo", false, `error: ${errText(e)}`, "no error");
}

await decoder.close();
await browser.close();
console.log(`band123 failures: ${failures}`);
process.exit(failures ? 1 : 0);
