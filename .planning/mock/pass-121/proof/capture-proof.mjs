// Pass-121 quality proof, FIX ROUND 3. Measures M1-M5 in-page after fonts
// are ready, prints PASS/FAIL per page and width, then overwrites the four
// full-page PNGs at deviceScaleFactor 2. Scratch, not committed.
//   M1 every SVG label box: no two labels on one drawing intersect, all
//      fully inside their svg's box.
//   M2 rendered label font: >= 11px at /work index scale, >= 12px at band
//      scale (computed font-size x svg scale).
//   M3 each circled figure: margins of the circle path box around the
//      figure element box, L/R 6-16px, T/B 4-12px.
//   M4 page scrollWidth equals viewport width.
//   M5 every arrow path clears every label box: sample each arrow path
//      every 2 path units (getPointAtLength), map to screen with
//      getScreenCTM, PASS only if no point falls inside a label rect
//      inflated by 4px.
import { createRequire } from "node:module";

const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");

const DIR =
  "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/mock/pass-121/proof";
// index scale = the /work fold drawing; band scale = the study band drawing
const PAGES = [
  { name: "work-fold", minFont: 11 },
  { name: "rfp-study", minFont: 12 },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MEASURE = () => {
  const drawings = [];
  for (const svg of document.querySelectorAll("svg")) {
    const labels = Array.from(svg.querySelectorAll("text"));
    if (!labels.length) continue;
    const sr = svg.getBoundingClientRect();
    const vb = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal.width : 0;
    const scale = vb ? sr.width / vb : 1;
    const fontRaw = parseFloat(getComputedStyle(labels[0]).fontSize);
    // screen-CTM with a device-pixel guard: if the mapped svg origin is not
    // in client px, normalize by devicePixelRatio so points and label rects
    // (getBoundingClientRect, client px) share one space.
    const ctm = svg.getScreenCTM();
    let fix = 1;
    if (ctm) {
      const o = new DOMPoint(0, 0).matrixTransform(ctm);
      if (Math.abs(o.x - sr.left) > 2 || Math.abs(o.y - sr.top) > 2)
        fix = 1 / (window.devicePixelRatio || 1);
    }
    const arrows = Array.from(svg.querySelectorAll("path.arw")).map((p) => {
      const pts = [];
      try {
        const len = p.getTotalLength();
        for (let d = 0; d <= len; d += 2) {
          const q = p.getPointAtLength(d);
          const sc = ctm
            ? new DOMPoint(q.x, q.y).matrixTransform(ctm)
            : { x: q.x, y: q.y };
          pts.push([+(sc.x * fix).toFixed(1), +(sc.y * fix).toFixed(1)]);
        }
      } catch (e) {}
      return pts;
    });
    drawings.push({
      w: +sr.width.toFixed(2),
      vb,
      fontRendered: +(fontRaw * scale).toFixed(2),
      arrows,
      labels: labels.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          t: (el.textContent || "").replace(/\s+/g, " ").trim(),
          l: +r.left.toFixed(1),
          r: +r.right.toFixed(1),
          tp: +r.top.toFixed(1),
          b: +r.bottom.toFixed(1),
          sl: +sr.left.toFixed(1),
          sr: +sr.right.toFixed(1),
          st: +sr.top.toFixed(1),
          sb: +sr.bottom.toFixed(1),
        };
      }),
    });
  }
  const circles = [];
  for (const svg of document.querySelectorAll("svg.handcircle")) {
    const fig = svg.parentElement;
    const path = svg.querySelector(".hc-p");
    if (!fig || !path) continue;
    const f = fig.getBoundingClientRect();
    const p = path.getBoundingClientRect();
    circles.push({
      figText: (fig.textContent || "").trim(),
      L: +(f.left - p.left).toFixed(1),
      R: +(p.right - f.right).toFixed(1),
      T: +(f.top - p.top).toFixed(1),
      B: +(p.bottom - f.bottom).toFixed(1),
    });
  }
  return {
    drawings,
    circles,
    pageW: document.documentElement.scrollWidth,
    viewW: window.innerWidth,
  };
};

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-color-profile=srgb"],
});

let anyFail = false;
for (const { name, minFont } of PAGES) {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await page.goto(`file:///${DIR}/${name}.html`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluateHandle("document.fonts.ready");
    await sleep(1000);
    const m = await page.evaluate(MEASURE);
    const tag = `${name} ${w}`;

    // M1: per drawing, label boxes must not intersect each other and must
    // sit fully inside their svg's box.
    let m1ok = true;
    m.drawings.forEach((dr, di) => {
      const n = dr.labels.length;
      for (let i = 0; i < n; i++) {
        const A = dr.labels[i];
        if (A.l < A.sl - 0.5 || A.r > A.sr + 0.5 || A.tp < A.st - 0.5 || A.b > A.sb + 0.5) {
          m1ok = false;
          console.log(`M1 ${tag} FAIL drawing ${di + 1}: label "${A.t}" [${A.l},${A.tp},${A.r},${A.b}] outside svg [${A.sl},${A.st},${A.sr},${A.sb}]`);
        }
        for (let j = i + 1; j < n; j++) {
          const B = dr.labels[j];
          const sep = A.l >= B.r - 0.5 || B.l >= A.r - 0.5 || A.tp >= B.b - 0.5 || B.tp >= A.b - 0.5;
          if (!sep) {
            m1ok = false;
            console.log(`M1 ${tag} FAIL drawing ${di + 1}: labels intersect "${A.t}" [${A.l},${A.tp},${A.r},${A.b}] vs "${B.t}" [${B.l},${B.tp},${B.r},${B.b}]`);
          }
        }
      }
    });
    if (m1ok) {
      const nl = m.drawings.reduce((s, d) => s + d.labels.length, 0);
      console.log(`M1 ${tag} PASS ${m.drawings.length} drawing(s), ${nl} labels: no intersections, all inside their svg box`);
    }

    // M2: rendered label font size per drawing.
    let m2ok = true;
    for (const dr of m.drawings) {
      const ok = dr.fontRendered >= minFont;
      if (!ok) m2ok = false;
      console.log(`M2 ${tag} ${ok ? "PASS" : "FAIL"} drawing (svg ${dr.w}px wide, viewBox ${dr.vb}): rendered label font ${dr.fontRendered}px, need >= ${minFont}px`);
    }

    // M3: circle margins per circled figure.
    let m3ok = m.circles.length > 0;
    for (const c of m.circles) {
      const ok = c.L >= 6 && c.L <= 16 && c.R >= 6 && c.R <= 16 && c.T >= 4 && c.T <= 12 && c.B >= 4 && c.B <= 12;
      if (!ok) m3ok = false;
      console.log(`M3 ${tag} ${ok ? "PASS" : "FAIL"} figure "${c.figText}": circle margins L ${c.L} R ${c.R} T ${c.T} B ${c.B} (need L/R 6-16, T/B 4-12)`);
    }

    // M4: no horizontal overflow.
    const m4ok = m.pageW === m.viewW;
    console.log(`M4 ${tag} ${m4ok ? "PASS" : "FAIL"} page width ${m.pageW} = viewport ${m.viewW}`);

    // M5: every arrow path clears every label box. Points sampled every 2
    // path units and mapped to screen; a label rect inflated by 4px must
    // contain none of them.
    let m5ok = true;
    let m5min = Infinity;
    m.drawings.forEach((dr, di) => {
      dr.arrows.forEach((pts, ai) => {
        for (const [x, y] of pts) {
          for (const L of dr.labels) {
            const dx = Math.max(L.l - x, 0, x - L.r);
            const dy = Math.max(L.tp - y, 0, y - L.b);
            const g = Math.max(dx, dy);
            if (g < m5min) m5min = g;
            if (g < 4) {
              m5ok = false;
              console.log(`M5 ${tag} FAIL drawing ${di + 1} arrow ${ai + 1}: point (${x},${y}) inside 4px of label "${L.t}" [${L.l},${L.tp},${L.r},${L.b}], gap ${g.toFixed(1)}px`);
            }
          }
        }
      });
    });
    const nArrows = m.drawings.reduce((s, d) => s + d.arrows.length, 0);
    const nLbls = m.drawings.reduce((s, d) => s + d.labels.length, 0);
    if (m5ok)
      console.log(`M5 ${tag} PASS ${nArrows} arrow path(s) vs ${nLbls} label box(es): no intersections, min gap ${m5min.toFixed(1)}px (need >= 4)`);

    const all = m1ok && m2ok && m3ok && m4ok && m5ok;
    if (!all) anyFail = true;
    console.log(`RESULT ${tag} ${all ? "PASS" : "FAIL"}`);

    await page.screenshot({ path: `${DIR}/${name}-${w}.png`, fullPage: true });
    console.log(`ok ${name}-${w} png (dsf 2)`);
    await page.close();
  }
}
await browser.close();
process.exitCode = anyFail ? 1 : 0;
