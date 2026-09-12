// .planning/exec/circle115.mjs — Pass-115 circle verification (brief §2 + §4).
//
// §2 mode (`--m1-only`): measure the "$20M+" ink box BEFORE the geometry edit,
//   at 1440x900 dpr1 and 390x844 dpr2, reduced motion on. Prints L/T/W/H and
//   W/H in em (divided by the .cw-rec__num font-size), 3 decimals.
// §4 mode (bare `node .planning/exec/circle115.mjs`): the same M1 measurement
//   at each width, then — with the loop visible — samples the first path at
//   400 points and the second at 150 (getPointAtLength + getScreenCTM) and
//   prints C1..C10. Ends with `circle failures: N` over both widths; exits 1
//   if N is not 0. Also writes the three §4 captures into
//   .planning/qa/pass-115/.
//
// Puppeteer-core from C:/tmp/p101tools; Chrome at the system path; server on
// :3200. The ink decode runs in a separate about:blank page (brief §2).

import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";

const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");

const ROOT =
  "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live";
const OUT = `${ROOT}/.planning/qa/pass-115`;
mkdirSync(OUT, { recursive: true });

const S = "http://localhost:3200";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FINAL = "$20M+";
const M1_ONLY = process.argv.includes("--m1-only");

let failures = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const f3 = (v) => v.toFixed(3);
const ceil3 = (v) => Math.ceil(v * 1000) / 1000;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-color-profile=srgb",
  ],
});

async function freshPage(vp) {
  const page = await browser.newPage();
  await page.setViewport(vp);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  return page;
}

// ---------------------------------------------------------------- §2, M1
// Scroll .cw-rec to the viewport centre, hide the loop, screenshot the clip,
// decode the ink box in a separate about:blank page, restore the loop.
// Returns { F, wrap, title, lbl, ink (CSS px, client coords), em: {L,T,W,H} }.
async function measureInk(page, dsf) {
  await page.goto(`${S}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    const r = document.querySelector(".cw-rec").getBoundingClientRect();
    window.scrollTo(
      0,
      Math.max(0, r.top + r.height / 2 - window.innerHeight / 2),
    );
  });
  await sleep(400);

  const g = await page.evaluate(() => {
    // DOMRect serializes to {} through this evaluate path; toJSON() it.
    const rect = (el) => el.getBoundingClientRect().toJSON();
    const wrap = rect(document.querySelector(".cw-rec__wrap"));
    const title = rect(document.querySelector(".cw-receipts__title"));
    const lbl = rect(document.querySelector(".cw-rec__lbl"));
    const F = parseFloat(
      getComputedStyle(document.querySelector(".cw-rec__num")).fontSize,
    );
    return { wrap, title, lbl, F };
  });
  const { wrap, title, lbl, F } = g;

  await page.evaluate(() => {
    document.querySelector(".cw-rec .hand-circle").style.visibility = "hidden";
  });

  const clip = {
    x: wrap.left - 0.3 * F,
    y: Math.max(wrap.top - 0.25 * F, title.bottom + 1),
    width: wrap.right + 0.3 * F - (wrap.left - 0.3 * F),
    height:
      Math.min(wrap.bottom + 0.25 * F, lbl.top - 1) -
      Math.max(wrap.top - 0.25 * F, title.bottom + 1),
  };
  // screenshot({clip}) renders against an UNSCROLLED surface in this
  // puppeteer (verified 2026-09-12: the clip over the figure captured hero
  // pixels instead), so capture the full viewport and apply the clip as a
  // crop in the decoder — same rectangle, corners, and threshold.
  const shot = await page.screenshot({ encoding: "base64" });

  await page.evaluate(() => {
    document.querySelector(".cw-rec .hand-circle").style.visibility = "";
  });

  // Decode in a separate about:blank page.
  const dp = await browser.newPage();
  await dp.goto("about:blank");
  const inkImg = await dp.evaluate(
    async (dataUrl, clip, dsf) => {
      const img = new Image();
      img.src = dataUrl;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, c.width, c.height).data;
      const W = c.width;
      const H = c.height;
      // Crop = the clip rectangle in image px, clamped to the frame.
      const x0 = Math.max(0, Math.round(clip.x * dsf));
      const y0 = Math.max(0, Math.round(clip.y * dsf));
      const x1 = Math.min(W, Math.round((clip.x + clip.width) * dsf));
      const y1 = Math.min(H, Math.round((clip.y + clip.height) * dsf));
      const rs = [];
      const gs = [];
      const bs = [];
      for (const [bx, by] of [
        [x0, y0],
        [x1 - 6, y0],
        [x0, y1 - 6],
        [x1 - 6, y1 - 6],
      ]) {
        for (let y = by; y < by + 6; y++)
          for (let x = bx; x < bx + 6; x++) {
            const i = (y * W + x) * 4;
            rs.push(d[i]);
            gs.push(d[i + 1]);
            bs.push(d[i + 2]);
          }
      }
      const med = (a) => {
        a.sort((p, q) => p - q);
        return a[(a.length - 1) >> 1];
      };
      const bg = [med(rs), med(gs), med(bs)];
      let minX = W;
      let minY = H;
      let maxX = -1;
      let maxY = -1;
      let count = 0;
      for (let y = y0; y < y1; y++)
        for (let x = x0; x < x1; x++) {
          const i = (y * W + x) * 4;
          const diff = Math.max(
            Math.abs(d[i] - bg[0]),
            Math.abs(d[i + 1] - bg[1]),
            Math.abs(d[i + 2] - bg[2]),
          );
          if (diff > 60) {
            count++;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      return { W, H, bg, count, minX, minY, maxX, maxY };
    },
    `data:image/png;base64,${shot}`,
    clip,
    dsf,
  );
  await dp.close();

  // Image px -> CSS px (device scale factor) -> viewport coords.
  const ink = {
    left: inkImg.minX / dsf,
    top: inkImg.minY / dsf,
    w: (inkImg.maxX - inkImg.minX + 1) / dsf,
    h: (inkImg.maxY - inkImg.minY + 1) / dsf,
  };
  const em = {
    L: (ink.left - wrap.left) / F,
    T: (ink.top - wrap.top) / F,
    W: ink.w / F,
    H: ink.h / F,
  };
  return { F, wrap, title, lbl, ink, em, inkCount: inkImg.count };
}

// ------------------------------------------------------- §4, path sampling
async function sampleLoop(page) {
  return page.evaluate(() => {
    const paths = [...document.querySelectorAll(".cw-rec .hand-circle path")];
    const sample = (el, n) => {
      const len = el.getTotalLength();
      const c = el.getScreenCTM();
      const pts = [];
      for (let i = 0; i < n; i++) {
        const p = el.getPointAtLength((i / (n - 1)) * len);
        const m = new DOMPoint(p.x, p.y).matrixTransform(c);
        pts.push([m.x, m.y]);
      }
      return pts;
    };
    const tick = document.querySelector(".cw-rec__tick");
    const rect = (el) => el.getBoundingClientRect().toJSON();
    const title = rect(document.querySelector(".cw-receipts__title"));
    const lbl = rect(document.querySelector(".cw-rec__lbl"));
    return {
      primary: sample(paths[0], 400),
      overshoot: sample(paths[1], 150),
      tick: tick ? tick.textContent : null,
      titleLeft: title.left,
      titleBottom: title.bottom,
      lblTop: lbl.top,
      innerW: window.innerWidth,
    };
  });
}

function insideEvenOdd(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (
      (yi > py) !== (yj > py) &&
      px < ((xj - xi) * (py - yi)) / (yj - yi) + xi
    )
      inside = !inside;
  }
  return inside;
}

function distToPolyline(px, py, poly) {
  let best = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [ax, ay] = poly[j];
    const [bx, by] = poly[i];
    const dx = bx - ax;
    const dy = by - ay;
    const l2 = dx * dx + dy * dy;
    let t = l2 ? ((px - ax) * dx + (py - ay) * dy) / l2 : 0;
    t = Math.max(0, Math.min(1, t));
    best = Math.min(best, Math.hypot(px - (ax + t * dx), py - (ay + t * dy)));
  }
  return best;
}

// ------------------------------------------------------------------ widths
const WIDTHS = [
  { name: "1440", vp: { width: 1440, height: 900, deviceScaleFactor: 1 }, dsf: 1 },
  { name: "390", vp: { width: 390, height: 844, deviceScaleFactor: 2 }, dsf: 2 },
];

const m1 = {};
let ratioDiff = null;

for (const W of WIDTHS) {
  console.log(`--- ${W.vp.width}x${W.vp.height} (dpr ${W.dsf}) ---`);
  const page = await freshPage(W.vp);
  const r = await measureInk(page, W.dsf);
  m1[W.name] = r;
  console.log(
    `M1 ${W.name}: L=${f3(r.em.L)}em T=${f3(r.em.T)}em W=${f3(r.em.W)}em H=${f3(r.em.H)}em W/H=${f3(r.em.W / r.em.H)}`,
  );
  console.log(
    `     (F=${r.F}px ink=${r.inkCount}px inkBox=${f3(r.ink.w)}x${f3(r.ink.h)}px at ${f3(r.ink.left)},${f3(r.ink.top)})`,
  );

  if (M1_ONLY) {
    await page.close();
    continue;
  }

  // ---------------------------------------------------------- C1 .. C10
  const L = await sampleLoop(page);
  const ink = r.ink;
  const corners = [
    [ink.left, ink.top],
    [ink.left + ink.w, ink.top],
    [ink.left, ink.top + ink.h],
    [ink.left + ink.w, ink.top + ink.h],
  ];
  const all = [...L.primary, ...L.overshoot];
  const minX = Math.min(...all.map((p) => p[0]));
  const maxX = Math.max(...all.map((p) => p[0]));
  const minY = Math.min(...all.map((p) => p[1]));
  const maxY = Math.max(...all.map((p) => p[1]));
  const cX = (minX + maxX) / 2;
  const cY = (minY + maxY) / 2;
  const iCX = ink.left + ink.w / 2;
  const iCY = ink.top + ink.h / 2;

  const results = [];

  // C1 corners inside loop (even-odd, ink box corners)
  const c1 = corners.filter(([x, y]) => insideEvenOdd(x, y, L.primary)).length;
  results.push(["C1 corners inside loop", c1, 4, c1 === 4]);

  // C2 min corner clearance (corner to loop polyline)
  const c2 = Math.min(...corners.map(([x, y]) => distToPolyline(x, y, L.primary)));
  const c2exp = 0.05 * ink.h;
  results.push([
    "C2 min corner clearance",
    `${f3(c2)}px`,
    `>= ${f3(c2exp)}px`,
    c2 >= c2exp,
  ]);

  // C3 overshoot points inside ink box
  const c3 = L.overshoot.filter(
    ([x, y]) =>
      x > ink.left &&
      x < ink.left + ink.w &&
      y > ink.top &&
      y < ink.top + ink.h,
  ).length;
  results.push(["C3 overshoot points inside ink box", c3, 0, c3 === 0]);

  // C4 loop left to column edge
  const c4 = Math.abs(minX - L.titleLeft);
  results.push(["C4 loop left to column edge", `${f3(c4)}px`, "<= 3px", c4 <= 3]);

  // C5 loop inside viewport
  const c5 = minX >= 0 && maxX <= L.innerW;
  results.push(["C5 loop inside viewport", c5, true, c5 === true]);

  // C6 title clearance
  const c6 = minY - L.titleBottom;
  results.push(["C6 title clearance", `${f3(c6)}px`, ">= 12px", c6 >= 12]);

  // C7 label clearance
  const c7 = L.lblTop - maxY;
  results.push(["C7 label clearance", `${f3(c7)}px`, ">= 8px", c7 >= 8]);

  // C8 centre x offset
  const c8 = Math.abs(cX - iCX) / ink.w;
  results.push(["C8 centre x offset", f3(c8), "<= 0.02", c8 <= 0.02]);

  // C9 centre y offset
  const c9 = Math.abs(cY - iCY) / ink.h;
  results.push(["C9 centre y offset", f3(c9), "<= 0.04", c9 <= 0.04]);

  // C10 tick text
  results.push(["C10 tick text", `"${L.tick}"`, `"${FINAL}"`, L.tick === FINAL]);

  for (const [name, got, expect, ok] of results) {
    if (!ok) failures++;
    console.log(`${name}: got ${got}, expect ${expect}${ok ? "" : "  <-- FAIL"}`);
  }

  // ------------------------------------------------------------ captures
  await page.evaluate(() => document.fonts.ready);
  if (W.name === "1440") {
    await page.screenshot({ path: `${OUT}/home-rec-done-1440.png` });
    console.log(`     capture: home-rec-done-1440.png`);

    // home-receipts-1440.png: section title through the four exits.
    const span = await page.evaluate(() => {
      const t = document
        .querySelector(".cw-receipts__title")
        .getBoundingClientRect();
      const e = document.querySelector(".cw-exits").getBoundingClientRect();
      return {
        topAbs: t.top + window.scrollY,
        botAbs: e.bottom + window.scrollY,
      };
    });
    const need = Math.ceil(span.botAbs - span.topAbs + 80);
    await page.setViewport({
      width: 1440,
      height: need,
      deviceScaleFactor: 1,
    });
    await sleep(150);
    await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, span.topAbs - 40));
    await sleep(250);
    await page.screenshot({ path: `${OUT}/home-receipts-1440.png` });
    console.log(`     capture: home-receipts-1440.png (${need}px tall)`);
  } else {
    await page.screenshot({ path: `${OUT}/home-rec-done-390.png` });
    console.log(`     capture: home-rec-done-390.png (2x)`);
  }
  await page.close();
}

const ratios = Object.values(m1).map((r) => r.em.W / r.em.H);
if (ratios.length === 2 && Math.abs(ratios[0] - ratios[1]) > 0.03) {
  ratioDiff = Math.abs(ratios[0] - ratios[1]);
  console.log(
    `W/H differs between widths by ${f3(ratioDiff)} (> 0.03) — continuing (numbers are font-relative and should match)`,
  );
}

if (!M1_ONLY) {
  console.log(`circle failures: ${failures}`);
}

await browser.close();
if (!M1_ONLY && failures !== 0) process.exit(1);
