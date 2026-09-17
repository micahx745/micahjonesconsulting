// Pass-121 MOCK SET generator (Direction C, "Five exhibits").
// Writes work.html, study-guardicore.html, study-rfp.html, states.html into
// this set/ folder. Reuses, without editing, the proof's files in ../proof/:
// the hand technique is copied forward from gen-round4.mjs and the circle
// ratios come from ../proof/home-circle-ratios.json. Brief: Pass-121 mock
// set kickoff, 2026-09-17. Scratch, not committed.
//
// E-fix from the brief: on a study band the exhibit's sentence sits directly
// beneath its drawing (28px margin; M12 wants a 24-40px gap), never pinned to
// the column bottom; leftover dark space lands at the bottom of the band.
//
// M13 note: /work uses exactly seven rendered font sizes at 1440:
// 96, 72, 36, 22, 18, 14, 12 (G2 3.1). SVG exhibit labels are the drawings'
// own type (G2 4.1 sets them outside the page scale) and are not page type.
import { createRequire } from "node:module";
import fs from "node:fs";

const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");

const DIR = "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/mock/pass-121/set";
const PROOF = "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/mock/pass-121/proof";
const HOME = JSON.parse(fs.readFileSync(`${PROOF}/home-circle-ratios.json`, "utf8"));
const R = HOME.ratios;
const CIRCLE_D = HOME.pathsD;
const IMG = "file:///C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/public/media/guardicore-band-960.jpg";

// ---------- deterministic wobble (proof technique, verbatim) ----------
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r2 = (v) => (Math.round(v * 100) / 100).toString();

function catmull(pts) {
  let d = `M ${r2(pts[0].x)} ${r2(pts[0].y)}`;
  const n = pts.length;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(n - 1, i + 2)];
    d += ` C ${r2(p1.x + (p2.x - p0.x) / 6)} ${r2(p1.y + (p2.y - p0.y) / 6)}, ${r2(
      p2.x - (p3.x - p1.x) / 6,
    )} ${r2(p2.y - (p3.y - p1.y) / 6)}, ${r2(p2.x)} ${r2(p2.y)}`;
  }
  return d;
}

function handStroke(x1, y1, x2, y2, rng, opt = {}) {
  const { maxAmp = 2.6, midFloor = 0.35, endFrac = 0.15 } = opt;
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const n = Math.max(3, Math.round(len / 6.5));
  const nx = -(y2 - y1) / len;
  const ny = (x2 - x1) / len;
  const phase = rng() * Math.PI * 2;
  const freq = 1.1 + rng() * 0.9;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const dEnd = Math.min(1, Math.min(t, 1 - t) / endFrac);
    const amp = maxAmp * (1 - (1 - midFloor) * dEnd);
    const off = Math.sin(t * freq * 2 * Math.PI + phase) * amp * 0.6 + (rng() * 2 - 1) * amp * 0.45;
    pts.push({ x: x1 + (x2 - x1) * t + nx * off, y: y1 + (y2 - y1) * t + ny * off });
  }
  return pts;
}

function boxSides(x, y, w, h, seed) {
  const rng = mulberry32(seed);
  const ov = () => 1.5 + rng() * 2;
  const j = () => (rng() * 2 - 1) * 1.3;
  const top = handStroke(x - ov() + j(), y + j() * 0.6, x + w + ov() + j(), y + j() * 0.6, rng);
  const right = handStroke(x + w + j() * 0.6, y - ov() + j(), x + w + j() * 0.6, y + h + ov() + j(), rng);
  const bottom = handStroke(x + w + ov() + j(), y + h + j() * 0.6, x - ov() + j(), y + h + j() * 0.6, rng);
  const left = handStroke(x + j() * 0.6, y + h + ov() + j(), x + j() * 0.6, y - ov() + j(), rng);
  return [top, right, bottom, left].map(catmull);
}

function nodeMarkup(x, y, w, h, seed, dataNode, dx = 0, dy = 0) {
  return `<g class="node" data-node="${dataNode}">${boxSides(x + dx, y + dy, w, h, seed)
    .map((d) => `<path class="ln" d="${d}"/>`)
    .join("")}</g>`;
}

function arrowParts(x1, y1, x2, y2, seed, headLen = 8.5) {
  const rng = mulberry32(seed);
  const shaft = handStroke(x1, y1, x2, y2, rng, { maxAmp: 1.8, midFloor: 0.3, endFrac: 0.18 });
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const h1 = handStroke(
    x2, y2,
    x2 + Math.cos(ang + Math.PI - 0.46) * headLen,
    y2 + Math.sin(ang + Math.PI - 0.46) * headLen,
    rng, { maxAmp: 1.1 },
  );
  const h2 = handStroke(
    x2, y2,
    x2 + Math.cos(ang - Math.PI + 0.46) * headLen,
    y2 + Math.sin(ang - Math.PI + 0.46) * headLen,
    rng, { maxAmp: 1.1 },
  );
  return [shaft, h1, h2].map(catmull);
}
const arrowMarkup = (x1, y1, x2, y2, seed, dx = 0, dy = 0, cls = "") =>
  arrowParts(x1 + dx, y1 + dy, x2 + dx, y2 + dy, seed)
    .map((d) => `<path class="ln arw${cls ? " " + cls : ""}" d="${d}"/>`)
    .join("");

// ---------- flow layout (proof, verbatim; viewBox 560 x 176) ----------
const CH = 11.4;
const B = [
  { id: "b1", x: 6, y: 8, w: Math.round(15 * CH + 16), h: 64, lines: ["portals,", "checked nightly"], seed: 11 },
  { id: "b2", x: 221, y: 8, w: Math.round(11 * CH + 17), h: 60, lines: ["library,", "300+ pieces"], seed: 23 },
  { id: "b3", x: 390, y: 8, w: Math.round(13 * CH + 16), h: 62, lines: ["bid or no-bid", "score"], seed: 31 },
  { id: "b4", x: 356, y: 102, w: Math.round(16 * CH + 16), h: 66, lines: ["draft, on the", "buyer's criteria"], seed: 47 },
  { id: "b5", x: 209, y: 102, w: Math.round(8 * CH + 16), h: 60, lines: ["the gap,", "marked"], seed: 59 },
  { id: "b6", x: 56, y: 102, w: Math.round(8 * CH + 18), h: 63, lines: ["a person", "approves"], seed: 71 },
];
{
  const total = B[0].w + B[1].w + B[2].w;
  const gap = (554 - 6 - total) / 2;
  B[1].x = Math.round(B[0].x + B[0].w + gap);
  B[2].x = Math.round(B[1].x + B[1].w + gap);
  B[3].x = 554 - B[3].w;
  B[4].x = B[3].x - 40 - B[4].w;
  B[5].x = B[4].x - 44 - B[5].w;
}
const byId = Object.fromEntries(B.map((b) => [b.id, b]));
const center = (b) => +(b.x + b.w / 2).toFixed(1);
const firstBaseline = (b) => +(b.y + (b.h - 42.6) / 2 + 14.3).toFixed(1);

function flowMarkup(fid, hlInline) {
  const hl = hlInline ? ` style="opacity:1"` : "";
  const texts = B.map(
    (b) =>
      `<text data-label="${b.id}" x="${center(b)}" y="${firstBaseline(b)}" text-anchor="middle">${b.lines[0]}<tspan x="${center(
        b,
      )}" dy="24">${b.lines[1]}</tspan></text>`,
  ).join("\n        ");
  return `<svg class="flow" data-drawing="rfp-flow" viewBox="0 0 560 176" role="img" aria-label="The RFP engine in six steps">
        <defs>
          <filter id="${fid}" x="-4%" y="-8%" width="108%" height="116%" color-interpolation-filters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55"/>
          </filter>
        </defs>
        <g filter="url(#${fid})">
          ${["b1", "b2", "b3", "b4", "b6"].map((id) => nodeMarkup(byId[id].x, byId[id].y, byId[id].w, byId[id].h, byId[id].seed, id)).join("\n          ")}
          ${arrowMarkup(byId.b1.x + byId.b1.w + 3, 36.5, byId.b2.x - 3, 38.5, 83)}
          ${arrowMarkup(byId.b2.x + byId.b2.w + 3, 39, byId.b3.x - 3, 37.5, 89)}
          ${(() => {
            const dx = Math.min(byId.b3.x + byId.b3.w, byId.b4.x + byId.b4.w) - 12;
            return arrowMarkup(dx, byId.b3.y + byId.b3.h + 1.5, dx, byId.b4.y - 1.5, 97, 0, 0, "arw-down");
          })()}
          ${arrowMarkup(byId.b5.x - 3, 132, byId.b6.x + byId.b6.w + 3, 134, 101)}
          <g class="hl"${hl}>
            ${nodeMarkup(byId.b5.x, byId.b5.y, byId.b5.w, byId.b5.h, byId.b5.seed, "b5")}
            <g class="p2">${nodeMarkup(byId.b5.x, byId.b5.y, byId.b5.w, byId.b5.h, byId.b5.seed + 37, "b5p2", 2.2, 1.6)}</g>
            ${arrowMarkup(byId.b4.x - 3, 134, byId.b5.x + byId.b5.w + 3, 132, 103)}
            <g class="p2">${arrowMarkup(byId.b4.x - 3, 134, byId.b5.x + byId.b5.w + 3, 132, 141, 2.2, 1.6)}</g>
          </g>
        </g>
        ${texts}
      </svg>`;
}

function circleSvg(fid, em) {
  return `<svg class="handcircle" viewBox="0 0 180 60" preserveAspectRatio="none" aria-hidden="true" style="left:${em.left}em;top:${em.top}em;width:${em.width}em;height:${em.height}em">
            <defs>
              <filter id="${fid}" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.9"/>
              </filter>
            </defs>
            <g filter="url(#${fid})">
              <path class="hc-p" d="${CIRCLE_D[0]}"/>
              <path class="hc-o" d="${CIRCLE_D[1]}"/>
            </g>
          </svg>`;
}

// ---------- drawing 2: the Guardicore visibility diagram ----------
// One viewBox per variant: "wide" (frames side by side, >=768px) and "tall"
// (frames stacked, <768px), per the brief's "side by side at 1440, stacked
// at 390". Frame content is identical code in both. Font 19px like the flow.
const CHV = 11.4; // mono advance at 19px
const VIS = {
  frameW: 260,
  frameH: 160,
  honeypot: { w: Math.round(8 * CHV + 18), h: 34 }, // "honeypot"
  wl: [58, 44, 52], // workload box widths, varied per hand
  wlH: 24,
};

function visFrameLeft(fx, fy) {
  const rect = nodeMarkup(fx, fy + 120, VIS.frameW, VIS.frameH, 211, "env-l");
  const hp = VIS.honeypot;
  const hpX = fx + Math.round((VIS.frameW - hp.w) / 2) - 34;
  const hpY = fy + 120 + 74;
  const hpBox = nodeMarkup(hpX, hpY, hp.w, hp.h, 223, "honeypot");
  const hpText = `<text data-label="honeypot" data-node="honeypot" x="${hpX + hp.w / 2}" y="${hpY + 23}" text-anchor="middle">honeypot</text>`;
  const a1 = arrowMarkup(fx + 198, fy + 104, fx + 198, fy + 160, 227); // in
  const a2 = arrowMarkup(fx + 234, fy + 160, fx + 234, fy + 104, 229); // out
  const ns = `<text data-label="ns" x="${fx}" y="${fy + 84}">north-south, defended</text>`;
  const label = `<text data-label="fl" x="${fx + VIS.frameW / 2}" y="${fy + 22}" text-anchor="middle">What the pitch<tspan x="${fx + VIS.frameW / 2}" dy="24">led with</tspan></text>`;
  return { markup: [rect, hpBox, a1, a2].join("\n      ") + "\n      " + hpText + ns + label, bottom: fy + 120 + VIS.frameH };
}

function visFrameRight(fx, fy) {
  const rect = nodeMarkup(fx, fy + 120, VIS.frameW, VIS.frameH, 213, "env-r");
  const cx = fx + 16;
  const widths = VIS.wl;
  let out = rect;
  const rowY = [fy + 120 + 32, fy + 120 + 76];
  let arrows = "";
  for (let r = 0; r < 2; r++) {
    let x = cx;
    for (let c = 0; c < 3; c++) {
      out += "\n      " + nodeMarkup(x, rowY[r], widths[c], VIS.wlH, 233 + r * 3 + c, `wl${r}${c}`);
      if (c < 2) {
        const ax1 = x + widths[c] + 3;
        const ax2 = x + widths[c] + 31;
        const ay = rowY[r] + VIS.wlH / 2 + (r === 0 ? -1 : 1);
        arrows += arrowMarkup(ax1, ay, ax2, ay, 251 + r * 2 + c);
        arrows += `<g class="p2">${arrowMarkup(ax1, ay, ax2, ay, 281 + r * 2 + c, 1.8, 1.4)}</g>`;
      }
      x += widths[c] + 34;
    }
  }
  const wl = `<text data-label="workloads" x="${fx + VIS.frameW / 2}" y="${fy + 120 + 18}" text-anchor="middle">workloads</text>`;
  const ew = `<text class="hl-t" data-label="ew" x="${fx + VIS.frameW / 2}" y="${fy + 120 + 138}" text-anchor="middle">east-west traffic, seen</text>`;
  const label = `<text data-label="fr" x="${fx + VIS.frameW / 2}" y="${fy + 22}" text-anchor="middle">What buyers signed for</text>`;
  return {
    markup: `<g class="hl">\n      ${arrows}${ew}\n      </g>\n      ${out}\n      ${wl}${label}`,
    bottom: fy + 120 + VIS.frameH,
  };
}

function visibilityMarkup(fid, variant) {
  let inner;
  let vbw, vbh;
  if (variant === "wide") {
    const L = visFrameLeft(12, 0);
    const Rr = visFrameRight(288, 0);
    inner = L.markup + "\n      " + Rr.markup;
    vbw = 560;
    vbh = 292;
  } else {
    const L = visFrameLeft(20, 0);
    const Rr = visFrameRight(20, 304);
    inner = L.markup + "\n      " + Rr.markup;
    vbw = 300;
    vbh = 596;
  }
  return `<svg class="flow vis vis-${variant}" data-drawing="guardicore-vis" viewBox="0 0 ${vbw} ${vbh}" role="img" aria-label="What the pitch led with, and what buyers signed for">
      <defs>
        <filter id="${fid}" x="-4%" y="-8%" width="108%" height="116%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55"/>
        </filter>
      </defs>
      <g filter="url(#${fid})">
      ${inner}
      </g>
    </svg>`;
}

// ---------- drawing 3: the ORDANI claims comparison (sage accent) ----------
// Two captioned columns; four statement boxes sized to their wrapped words;
// the sage line beneath is the one accent element. viewBox 600 x 340.
const CLAIMS = {
  cols: [
    {
      head: ["Filing it yourself", "or through a service"],
      boxes: [
        { lines: ["A service takes a", "fee on every visit."], seed: 311 },
        { lines: ["Filing it yourself", "costs no fee, but", "it costs time and", "knowledge."], seed: 313 },
      ],
    },
    {
      head: ["Filing it in Ordani"],
      boxes: [
        { lines: ["The claim is built from", "the visits already", "on the calendar."], seed: 317 },
        { lines: ["It is checked before", "it goes out, so fewer", "come back rejected."], seed: 319 },
      ],
    },
  ],
};
function claimsBox(b, x, y) {
  const w = Math.round(Math.max(...b.lines.map((l) => l.length)) * CHV + 18);
  const h = b.lines.length * 24 + 16;
  const cx = x + w / 2;
  const texts = b.lines
    .map((l, i) => `<tspan${i === 0 ? "" : ` x="${cx}" dy="24"`}>${l}</tspan>`)
    .join("");
  return {
    markup: nodeMarkup(x, y, w, h, b.seed, `cl-${b.seed}`) +
      `\n      <text data-label="cl-${b.seed}" data-node="cl-${b.seed}" x="${cx}" y="${y + (h - (b.lines.length - 1) * 24) / 2 + 4}" text-anchor="middle">${texts}</text>`,
    w, h, bottom: y + h,
  };
}
function claimsMarkup(fid) {
  const x0 = [8, 312];
  let boxes = "";
  let maxBottom = 0;
  CLAIMS.cols.forEach((col, ci) => {
    const head = col.head
      .map((l, i) => `<tspan${i === 0 ? "" : ` x="${x0[ci]}" dy="24"`}>${l}</tspan>`)
      .join("");
    boxes += `\n      <text data-label="cl-h${ci}" x="${x0[ci]}" y="26">${head}</text>`;
    let y = 70;
    for ( const b of col.boxes ) {
      const bx = claimsBox(b, x0[ci], y);
      boxes += "\n      " + bx.markup;
      y = bx.bottom + 20;
      maxBottom = Math.max(maxBottom, bx.bottom);
    }
  });
  const cx = 300;
  const sage = `<g class="hl"><text class="hl-t sage-t" data-label="cl-sage" x="${cx}" y="${maxBottom + 34}" text-anchor="middle">Hundreds of dollars per client<tspan x="${cx}" dy="24">stay with the practitioner.</tspan></text></g>`;
  return `<svg class="flow claims" data-drawing="ordani-claims" viewBox="0 0 600 ${maxBottom + 70}" role="img" aria-label="Filing it yourself or through a service, against filing it in Ordani">
      <defs>
        <filter id="${fid}" x="-4%" y="-8%" width="108%" height="116%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55"/>
        </filter>
      </defs>
      <g filter="url(#${fid})">
      ${boxes}
      </g>
      ${sage}
    </svg>`;
}

// ---------- drawing 4: the content-engine figure move ----------
// Main pair a few thousand -> up to 800,000 with a boxed mono + tag in
// copper, caption beneath, second small pair under it. viewBox 480 x 176.
function figureMoveMarkup(fid, kind) {
  if (kind === "content") {
    const n1 = { x: 16, y: 16, w: Math.round(14 * CHV + 18), h: 40, label: "a few thousand", seed: 411 };
    const n2 = { x: 258, y: 16, w: Math.round(13 * CHV + 18), h: 40, label: "up to 800,000", seed: 413 };
    const plus = { x: n2.x + n2.w + 12, y: 19, w: 34, h: 34 };
    const cap = `<text data-label="cm-cap" x="240" y="94" text-anchor="middle">impressions in a month</text>`;
    const s1 = { x: 16, y: 124, w: Math.round(15 * 9.6 + 16), h: 34, label: "one rough video", cls: "sm" };
    const s2 = { x: 226, y: 124, w: Math.round(14 * 9.6 + 16), h: 34, label: "the week's work", cls: "sm" };
    return `<svg class="flow fmove" data-drawing="content-move" viewBox="0 0 480 176" role="img" aria-label="From a few thousand to up to 800,000 impressions in a month">
      <defs>
        <filter id="${fid}" x="-4%" y="-8%" width="108%" height="116%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55"/>
        </filter>
      </defs>
      <g filter="url(#${fid})">
      ${nodeMarkup(n1.x, n1.y, n1.w, n1.h, n1.seed, "cm-n1")}
      <text data-label="cm-n1" data-node="cm-n1" x="${n1.x + n1.w / 2}" y="${n1.y + 27}" text-anchor="middle">${n1.label}</text>
      ${arrowMarkup(n1.x + n1.w + 4, 36, n2.x - 4, 36, 417)}
      ${nodeMarkup(n2.x, n2.y, n2.w, n2.h, n2.seed, "cm-n2")}
      <text data-label="cm-n2" data-node="cm-n2" x="${n2.x + n2.w / 2}" y="${n2.y + 27}" text-anchor="middle">${n2.label}</text>
      <g class="hl">
        ${nodeMarkup(plus.x, plus.y, plus.w, plus.h, 419, "cm-plus")}
        <g class="p2">${nodeMarkup(plus.x, plus.y, plus.w, plus.h, 452, "cm-plus2", 2, 1.5)}</g>
        <text class="hl-t" data-label="cm-plus" x="${plus.x + plus.w / 2}" y="${plus.y + 24.5}" text-anchor="middle">+</text>
      </g>
      ${nodeMarkup(s1.x, s1.y, s1.w, s1.h, 423, "cm-s1")}
      <text class="sm" data-label="cm-s1" data-node="cm-s1" x="${s1.x + s1.w / 2}" y="${s1.y + 23}" text-anchor="middle">${s1.label}</text>
      ${arrowMarkup(s1.x + s1.w + 4, 141, s2.x - 4, 141, 429, 0, 0)}
      ${nodeMarkup(s2.x, s2.y, s2.w, s2.h, 431, "cm-s2")}
      <text class="sm" data-label="cm-s2" data-node="cm-s2" x="${s2.x + s2.w / 2}" y="${s2.y + 23}" text-anchor="middle">${s2.label}</text>
      </g>
      ${cap}
    </svg>`;
  }
  // birth worker: 1 to 3 -> 5 to 10, copper arrow drawn twice, boxed + tag,
  // unit strip "bookings a month". viewBox 440 x 160.
  const n1 = { x: 24, y: 20, w: 90, h: 40, label: "1 to 3", seed: 511 };
  const n2 = { x: 182, y: 20, w: 104, h: 40, label: "5 to 10", seed: 513 };
  const plus = { x: n2.x + n2.w + 14, y: 23, w: 34, h: 34 };
  const strip = { x: 120, y: 96, w: 200, h: 38, label: "bookings a month" };
  return `<svg class="flow fmove" data-drawing="birth-move" viewBox="0 0 440 160" role="img" aria-label="Bookings went from one to three a month to five to ten">
      <defs>
        <filter id="${fid}" x="-4%" y="-8%" width="108%" height="116%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55"/>
        </filter>
      </defs>
      <g filter="url(#${fid})">
      ${nodeMarkup(n1.x, n1.y, n1.w, n1.h, n1.seed, "bm-n1")}
      <text data-label="bm-n1" data-node="bm-n1" x="${n1.x + n1.w / 2}" y="${n1.y + 27}" text-anchor="middle">${n1.label}</text>
      <g class="hl">
        ${arrowMarkup(n1.x + n1.w + 4, 40, n2.x - 4, 40, 517)}
        <g class="p2">${arrowMarkup(n1.x + n1.w + 4, 40, n2.x - 4, 40, 541, 2, 1.5)}</g>
        ${nodeMarkup(plus.x, plus.y, plus.w, plus.h, 519, "bm-plus")}
        <g class="p2">${nodeMarkup(plus.x, plus.y, plus.w, plus.h, 552, "bm-plus2", 2, 1.5)}</g>
        <text class="hl-t" data-label="bm-plus" x="${plus.x + plus.w / 2}" y="${plus.y + 24.5}" text-anchor="middle">+</text>
      </g>
      ${nodeMarkup(n2.x, n2.y, n2.w, n2.h, n2.seed, "bm-n2")}
      <text data-label="bm-n2" data-node="bm-n2" x="${n2.x + n2.w / 2}" y="${n2.y + 27}" text-anchor="middle">${n2.label}</text>
      ${nodeMarkup(strip.x, strip.y, strip.w, strip.h, 523, "bm-strip")}
      <text data-label="bm-strip" data-node="bm-strip" x="${strip.x + strip.w / 2}" y="${strip.y + 24.5}" text-anchor="middle">${strip.label}</text>
      </g>
    </svg>`;
}

// ---------- study marks: bracket and underline ----------
function bracketSvg(fid) {
  const rng = mulberry32(615);
  const a = handStroke(21, 6, 9, 13, rng, { maxAmp: 1.4 });
  const b = handStroke(9, 13, 9, 55, rng, { maxAmp: 1.4 });
  const c = handStroke(9, 55, 21, 62, rng, { maxAmp: 1.4 });
  return `<svg class="mark-bracket" viewBox="0 0 28 68" aria-hidden="true">
    <defs><filter id="${fid}" x="-12%" y="-6%" width="124%" height="112%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55"/></filter></defs>
    <g filter="url(#${fid})">${[a, b, c].map((p) => `<path class="ln" d="${catmull(p)}"/>`).join("")}</g>
  </svg>`;
}
function underlineSvg(fid) {
  const rng = mulberry32(617);
  const p1 = handStroke(6, 5, 214, 6, rng, { maxAmp: 1.6 });
  const rng2 = mulberry32(618);
  const p2 = handStroke(8, 7, 212, 8, rng2, { maxAmp: 1.6 });
  return `<svg class="mark-underline" viewBox="0 0 220 14" preserveAspectRatio="none" aria-hidden="true">
    <defs><filter id="${fid}" x="-3%" y="-30%" width="106%" height="160%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55"/></filter></defs>
    <g filter="url(#${fid})"><path class="ln u-p" d="${catmull(p1)}"/><path class="ln u-o" d="${catmull(p2)}"/></g>
  </svg>`;
}

// ---------- probe the two circled figures (Bricolage metrics) ----------
const PROBE_HTML = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>body{margin:0}
.fig{position:relative;display:inline-block;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;line-height:1;letter-spacing:-0.02em}
#f14{font-size:72px;font-variation-settings:"opsz" 72}
#f3{font-size:72px;font-variation-settings:"opsz" 72}
.probe{display:inline-block;width:0;height:0}
</style></head><body>
<p><span class="fig" id="f14">$14M<i class="probe"></i></span></p>
<p><span class="fig" id="f3">$3M<i class="probe"></i></span></p>
</body></html>`;

const PROBE_MEASURE = () => {
  const out = {};
  for (const id of ["f14", "f3"]) {
    const span = document.getElementById(id);
    const tn = Array.from(span.childNodes).find((n) => n.nodeType === 3);
    const range = document.createRange();
    range.selectNode(tn);
    const tr = range.getBoundingClientRect();
    const sr = span.getBoundingClientRect();
    const baseline = span.querySelector(".probe").getBoundingClientRect().bottom;
    const fs = parseFloat(getComputedStyle(span).fontSize);
    const ascent = baseline - tr.top;
    out[id] = {
      fs,
      figWem: +(tr.width / fs).toFixed(4),
      capEm: +(ascent / fs).toFixed(4),
      capOffsetEm: +((tr.top - sr.top) / fs).toFixed(4),
    };
  }
  return out;
};

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-color-profile=srgb"],
});
const probePage = await browser.newPage();
await probePage.setViewport({ width: 1440, height: 900 });
fs.writeFileSync(`${DIR}/probe-figs.html`, PROBE_HTML);
await probePage.goto(`file:///${DIR}/probe-figs.html`, { waitUntil: "networkidle0", timeout: 60000 });
await probePage.evaluateHandle("document.fonts.ready");
await new Promise((r) => setTimeout(r, 800));
const figs = await probePage.evaluate(PROBE_MEASURE);
await probePage.close();

function circleEm(f) {
  const width = +(R.widthRatio * f.figWem).toFixed(3);
  const height = +(R.heightRatio * f.capEm).toFixed(3);
  const left = +(-R.leftOffsetRatio * f.figWem).toFixed(3);
  const top = +(f.capOffsetEm - R.topOffsetRatio * f.capEm).toFixed(3);
  return { left, top, width, height };
}
const EM14 = circleEm(figs.f14);
const EM3 = circleEm(figs.f3);
console.log("figure metrics:", JSON.stringify(figs));
console.log("$14M@72 circle em:", JSON.stringify(EM14), " $3M@72 circle em:", JSON.stringify(EM3));

// ---------- shared CSS ----------
const FLOW_CSS = `
  .flow{display:block;width:100%;height:auto}
  .flow .ln{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
  .flow .hl .ln{stroke:var(--copper)}
  .flow .hl{opacity:.6}
  .flow .hl .p2{opacity:.72}
  .flow text{font-family:'JetBrains Mono',monospace;font-size:19px;fill:currentColor}
  .flow .hl .hl-t,.flow .hl-t{fill:var(--copper)}
  .flow .sm{font-size:16px}
  .flow.vis text{font-size:19px}
  .flow.claims .hl-t.sage-t{fill:var(--sage)}`;
const CIRCLE_CSS = `
  .handcircle{position:absolute;overflow:visible;pointer-events:none}
  .hc-p{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;opacity:.92}
  .hc-o{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;opacity:.55}`;
const STROKE_MOBILE = `  .flow .ln,.hc-p,.hc-o{stroke-width:1.5}`;
const MARKS_CSS = `
  .mark-bracket .ln,.mark-underline .ln{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
  .mark-underline .u-o{opacity:.55}`;
const FONT_LINKS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`;
const GRAIN_LIGHT = `<svg class="grain" aria-hidden="true"><filter id="pg"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0"/></filter><rect width="100%" height="100%" filter="url(#pg)"/></svg>`;
const NAV_LIGHT = `<header class="nav">
  <a class="nav__mark" href="#">MICAH/JONES</a>
  <nav class="nav__links">
    <a href="#">Services</a><a href="#">Work</a><a href="#">About</a><a href="#">Contact</a>
  </nav>
</header>`;
const NAV_CSS = `
  .nav{display:flex;justify-content:space-between;align-items:center;padding:24px 40px;color:var(--ink)}
  .nav__mark{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:22px;letter-spacing:-0.02em}
  .nav__links{display:flex;gap:30px;font-family:'JetBrains Mono',monospace;font-size:12px;text-transform:uppercase;letter-spacing:.12em}
  .nav__links a{opacity:.92}`;

// ---------- exact copy (brief section C + MDX, verbatim) ----------
const DESC =
  "Four client engagements and the company I founded. $14M in revenue for a security company, $3M in contracts from an RFP engine, a content engine that peaked at 800,000 impressions in a month, a birth worker's practice rebuilt, and ORDANI. Each page says what I found, what I built, and what changed.";
const METHOD =
  "I find what your buyers are actually paying for, then build the system that sells exactly that.";
const CROSS =
  `The next entry in this record could be yours. <a href="#">Engagements</a> scoped on a call; <a href="#">packages</a> at $500, $2,500 and $7,500.`;
const RECORD_ROWS = [
  { company: "SurveyMonkey", role: "Enterprise sales", outcome: "IPO, 2018", desc: "$1M+ in enterprise sales toward the 2018 IPO." },
  { company: "Postmates", role: "Product analyst", outcome: "Acquired by Uber, $2.65B, 2020", desc: "Market and fraud analysis in the deliver-anything era, and the case for narrowing the promise to the core offerings. A promise that covers everything cannot be priced, policed or sold." },
  { company: "Guardicore", role: "Revenue and positioning", outcome: "Acquired by Akamai, 2021", desc: "$14M in revenue, sourced and closed, after the research moved the pitch from honeypots to east-west visibility.", link: true },
  { company: "Neuton.AI", role: "Helped launch", outcome: "Technology acquired by Nordic Semiconductor, 2025", desc: "North American positioning for an AI product years before anyone was queuing to buy AI. I held no cap-table position." },
];

const ENTRY02 = {
  folio: "02",
  ctx: "An award-winning author and leadership consultant who teaches government bodies and corporations",
  num: "$3M",
  qual: "in signed contracts across eleven awards.",
  did: "It finds the RFPs worth answering, weighs each one against twenty years of their own work, and has a drafted response waiting by morning.",
  svc: "AI engineering",
};
const ENTRY03 = {
  folio: "03",
  ctx: "ORDANI, my company",
  line: "Birth workers keep hundreds of dollars per client that a claims service would take.",
  did: "I founded and built ORDANI, a HIPAA-compliant CRM where birth workers file their own Medicaid and private-insurance claims.",
  svc: "Product building",
};
const ENTRY04 = {
  folio: "04",
  ctx: "A social activist",
  num: "Up to 800,000",
  qual: "impressions in a month, up from a few thousand a month.",
  did: "I wrote the platform strategy, then built an AI engine that turns one rough video into the week's work.",
  svc: "Product building",
};
const ENTRY05 = {
  folio: "05",
  ctx: "A birth worker",
  line: "Bookings went from one to three a month to five to ten.",
  did: "I repositioned the practice around the full arc of care, rebuilt how clients find and book her, and set up claims she could file directly.",
  svc: "Positioning &amp; GTM",
};

function entryMarkup(e, exhibitSvg, extraCls = "") {
  const fig = e.num
    ? `<span class="e-num">${e.num}</span>
      <span class="e-qual">${e.qual}</span>`
    : `<span class="e-line36">${e.line}</span>`;
  return `  <a class="entry${extraCls}" data-entry="${e.folio}" href="#">
    <p class="e-folio">${e.folio}</p>
    <p class="ctx e-ctx">${e.ctx}</p>
    <p class="e-fig">
      ${fig}
    </p>
    <div class="e-exhibit">
      ${exhibitSvg}
    </div>
    <p class="e-did">${e.did}</p>
    <p class="svc e-svc">${e.svc}</p>
    <span class="copperline"></span>
  </a>`;
}

// ---------- work.html ----------
function buildWork() {
  const doorwayExhibit = visibilityMarkup("visd", "wide");
  const doorwayExhibitM = visibilityMarkup("visdm", "tall");
  const record = RECORD_ROWS.map(
    (r) => `      <li class="rec__row">
        <p class="rec__co">${r.link ? `<a href="#">${r.company}</a>` : r.company}</p>
        <p class="rec__meta">${r.role} &#183; ${r.outcome}</p>
        <p class="rec__desc">${r.desc}</p>
      </li>`,
  ).join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pass-121 mock set / the new /work page, Direction C</title>
${FONT_LINKS}
<style>
  :root{
    --paper:#f5efe4;
    --ink:#1a1816;
    --ink-soft:#3a3631;
    --bone:#ece3d0;
    --espresso:#2a1f18;
    --espresso-soft:#a69b8a;
    --copper:#bd5a2d;
    --copper-deep:#8a3d24;
    --sage:#5E7158;
    --rule:#d9d2c4;
    --ease-hover:cubic-bezier(0.2,0.8,0.2,1);
    --dur-hover:200ms;
  }
  *{box-sizing:border-box}
  html{margin:0}
  body{
    margin:0;
    position:relative;
    background:var(--paper);
    color:var(--ink);
    font-family:'Hanken Grotesk',sans-serif;
    -webkit-font-smoothing:antialiased;
  }
  a{color:inherit;text-decoration:none}
  .grain{position:absolute;inset:0;width:100%;height:100%;z-index:9998;pointer-events:none;opacity:.05;mix-blend-mode:multiply}
${NAV_CSS}
  .wx{max-width:1200px;margin:0 auto;padding:0 40px 120px}
  .wx__head{margin:56px 0 0;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:96px;line-height:1.02;letter-spacing:-0.02em;text-transform:uppercase;font-variation-settings:"opsz" 96}
  .wx__desc{margin:36px 0 0;font-size:22px;line-height:1.6;max-width:60ch;color:var(--ink)}
  .svc{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;line-height:1.5;color:var(--ink-soft);margin:0}

  /* doorway (folio 01), proof structure; the still stays the shared element */
  .doorway{
    display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:64px;row-gap:28px;
    border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);
    padding:48px 0;margin-top:64px;
  }
  .doorway__text{grid-column:1;grid-row:1/3}
  .doorway__img{grid-column:2;grid-row:1;margin:0;justify-self:end}
  .doorway__img img{display:block;width:320px;height:400px;object-fit:cover;opacity:.82;transition:opacity var(--dur-hover) var(--ease-hover)}
  .doorway__exhibit{grid-column:2;grid-row:2;margin:0;color:var(--ink)}
  .doorway--hover .doorway__img img{opacity:1}
  .doorway__folio{margin:0 0 20px;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;letter-spacing:.06em;color:var(--ink-soft)}
  .doorway__ctx{margin:0 0 28px;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;line-height:1.5;color:var(--ink-soft)}
  .doorway__fig{position:relative;margin:0 0 20px}
  .doorway__num{position:relative;display:inline-block;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:72px;line-height:1;letter-spacing:-0.02em;font-variation-settings:"opsz" 72}
  .doorway__line{margin:0 0 20px;font-size:22px;line-height:1.45}
  .doorway__did{margin:0 0 28px;font-size:18px;line-height:1.6}
  .doorway__svc{margin:0 0 12px}
  .doorway__read{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--copper-deep);margin:0}
  .doorway__read .arr{display:inline-block;transition:transform var(--dur-hover) var(--ease-hover)}
  .doorway--hover .doorway__read .arr{transform:translateX(4px)}
  .doorway--hover .doorway__num{color:var(--copper-deep)}
  .doorway--hover .flow .hl{opacity:1}
${CIRCLE_CSS}
${FLOW_CSS}
  .doorway__exhibit .vis-wide{display:block}
  .doorway__exhibit .vis-tall{display:none}

  /* index entries */
  .entry{
    display:grid;grid-template-columns:repeat(12,1fr);column-gap:24px;
    position:relative;padding:56px 0 48px;border-bottom:1px solid var(--rule);
  }
  .entry .copperline{position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--copper);transform:scaleX(0);transform-origin:left;transition:transform var(--dur-hover) var(--ease-hover)}
  .entry--hover .copperline{transform:scaleX(1)}
  .e-folio{grid-column:1/7;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;letter-spacing:.06em;color:var(--ink-soft);margin:0 0 20px}
  .e-ctx{grid-column:1/7;margin:0 0 24px;font-size:14px;line-height:1.5;color:var(--ink-soft);max-width:50ch}
  .e-fig{grid-column:1/7;margin:0 0 24px}
  .e-num{display:block;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:72px;line-height:1;letter-spacing:-0.02em;font-variation-settings:"opsz" 96;transition:color var(--dur-hover) var(--ease-hover)}
  .e-qual{display:block;margin-top:10px;font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:22px;line-height:1.3;letter-spacing:-0.01em;font-variation-settings:"opsz" 22;transition:color var(--dur-hover) var(--ease-hover)}
  .e-line36{display:block;font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:36px;line-height:1.25;letter-spacing:-0.01em;font-variation-settings:"opsz" 36;max-width:20ch;transition:color var(--dur-hover) var(--ease-hover)}
  .entry--hover .e-num,.entry--hover .e-qual,.entry--hover .e-line36{color:var(--copper-deep)}
  .entry--hover .flow .hl{opacity:1}
  .e-did{grid-column:1/7;margin:0 0 20px;font-size:18px;line-height:1.6;max-width:48ch}
  .e-svc{grid-column:1/7}
  .e-exhibit{grid-column:8/13;grid-row:3/6;align-self:start;justify-self:end;width:100%;max-width:400px;margin-top:14px;color:var(--ink)}
  .entry.entry--draft{margin-bottom:0}
  .draftnote{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.06em;color:var(--ink-soft);margin:12px 0 0}

  /* method band */
  .methodband{padding:160px 0}
  .methodline{margin:0;max-width:1120px;font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:36px;line-height:1.35;letter-spacing:-0.01em;font-variation-settings:"opsz" 36}

  /* record block on espresso */
  .record{background:var(--espresso);color:var(--bone);padding:120px 0 140px}
  .record .wx{padding-bottom:0}
  .rec__h{margin:0;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:72px;line-height:1.05;letter-spacing:-0.02em;text-transform:uppercase;font-variation-settings:"opsz" 72}
  .rec__line{margin:28px 0 0;font-size:22px;line-height:1.5}
  .rec__list{list-style:none;margin:72px 0 0;padding:0}
  .rec__row{display:grid;grid-template-columns:repeat(12,1fr);column-gap:24px;padding:36px 0;border-top:1px solid #453a30}
  .rec__co{grid-column:1/6;margin:0;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:36px;line-height:1.15;letter-spacing:-0.01em;font-variation-settings:"opsz" 36}
  .rec__co a{color:var(--copper)}
  .rec__meta{grid-column:1/6;margin:12px 0 0;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;letter-spacing:.06em;line-height:1.7;color:var(--espresso-soft)}
  .rec__desc{grid-column:7/13;align-self:start;margin:0;font-size:18px;line-height:1.6}

  /* cross line + footer */
  .wx-close{padding:0 40px}
  .cross{margin:0;padding:120px 0 96px;font-size:18px;line-height:1.7;max-width:64ch}
  .cross a{color:var(--copper-deep)}
  .pagefoot{border-top:1px solid var(--rule);padding:32px 0 72px}
  .pagefoot__promise{margin:0 0 16px;font-size:18px}
  .pagefoot__row{display:flex;flex-wrap:wrap;gap:16px;align-items:baseline;margin:0;font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:.04em;color:var(--ink-soft)}

  @media (max-width:767px){
    .nav{padding:20px 20px}
    .nav__mark{font-size:17px}
    .nav__links{gap:12px;font-size:10px}
    .wx{padding:0 20px 72px}
    .wx__head{font-size:48px;line-height:1.06}
    .wx__desc{font-size:17px}
    .doorway{display:flex;flex-direction:column;gap:28px;padding:36px 0;margin-top:48px}
    .doorway__img{order:1}
    .doorway__text{order:2}
    .doorway__exhibit{order:3;margin-top:4px}
    .doorway__img{justify-self:start}
    .doorway__img img{width:100%;height:auto;aspect-ratio:16/10}
    .doorway__num{font-size:48px}
    .doorway__line{font-size:20px}
    .doorway__did{font-size:17px}
    .doorway__exhibit .vis-wide{display:none}
    .doorway__exhibit .vis-tall{display:block}
    .e-folio,.e-ctx,.e-fig,.e-did,.e-svc{grid-column:1/-1}
    .e-exhibit{grid-column:1/-1;grid-row:auto;justify-self:start;max-width:none;margin-top:20px}
    .e-num{font-size:48px}
    .e-qual{font-size:20px}
    .e-line36{font-size:26px}
    .e-did{font-size:17px}
    .methodband{padding:96px 0}
    .methodline{font-size:28px}
    .record{padding:72px 0 88px}
    .rec__h{font-size:40px}
    .rec__line{font-size:18px}
    .rec__row{display:block;padding:28px 0}
    .rec__co{font-size:28px}
    .rec__meta{margin-top:8px}
    .rec__desc{margin-top:12px;font-size:17px}
    .cross{padding:72px 0 56px;font-size:17px}
${STROKE_MOBILE}
  }
</style>
</head>
<body>

${GRAIN_LIGHT}
${NAV_LIGHT}

<main class="wx">
  <h1 class="wx__head">The Work,<br>On The Record.</h1>
  <p class="wx__desc">${DESC}</p>

  <a class="doorway" href="#">
    <div class="doorway__text">
      <p class="doorway__folio">01</p>
      <p class="doorway__ctx">Guardicore, acquired by Akamai</p>
      <p class="doorway__fig">
        <span class="doorway__num">$14M${circleSvg("hcdoor", EM14)}</span>
      </p>
      <p class="doorway__line">in revenue, sourced and closed, at a $1.2M average enterprise deal.</p>
      <p class="doorway__did">I ran the research that found what those buyers were actually signing for, moved the story from honeypots to east-west visibility, and sat in the deals.</p>
      <p class="svc doorway__svc">Positioning &amp; GTM</p>
      <p class="doorway__read">Read this one first <span class="arr">&#8594;</span></p>
    </div>
    <p class="doorway__img"><img src="${IMG}" alt=""></p>
    <div class="doorway__exhibit">
      ${doorwayExhibit}
      ${doorwayExhibitM}
    </div>
  </a>

  <div class="entries">
${entryMarkup(ENTRY02, flowMarkup("fgw2", false))}
${entryMarkup(ENTRY03, claimsMarkup("clw3"), " entry--draft")}
  <p class="draftnote">DRAFT</p>
${entryMarkup(ENTRY04, figureMoveMarkup("cmw4", "content"))}
${entryMarkup(ENTRY05, figureMoveMarkup("bmw5", "birth"))}
  </div>

  <section class="methodband">
    <p class="methodline">${METHOD}</p>
  </section>
</main>

<section class="record">
  <div class="wx">
    <h2 class="rec__h">Also On The Record.</h2>
    <p class="rec__line">Four of the companies I worked inside reached an exit.</p>
    <ol class="rec__list">
${record}
    </ol>
  </div>
</section>

<div class="wx wx-close">
  <p class="cross">${CROSS}</p>
  <footer class="pagefoot">
    <p class="pagefoot__promise">I read every message and reply inside one business day.</p>
    <p class="pagefoot__row">
      <a href="#">micah@micahjonesconsulting.com</a>
      <span aria-hidden="true">&#183;</span>
      <a href="#">LinkedIn</a>
    </p>
  </footer>
</div>

</body>
</html>
`;
}

// ---------- study copy (MDX, verbatim) ----------
const G_S1 = [
  "In the years before the acquisition, the security market was saturated with deception. Honeypots were a feature several vendors shipped, and Guardicore led with theirs.",
  "Meanwhile the thing enterprises could not do was see their own networks. North-south traffic, in and out through the firewall, was well defended. The lateral east-west traffic between workloads was a blind spot, and that blind spot was where ransomware lived.",
  "So the top-of-funnel message described a feature the market already had, while buyers at the bottom of the funnel were signing for something else. The product was built an ocean away from the buyers who needed it.",
];
const G_S2 = [
  "I interviewed customers, researched the market, and ran the data analysis on what closed against what the pitch promised. The two came apart in the same place every time: buyers were not buying deception. They could not see anything inside their own environments, and visibility was the thing they signed for.",
  "I brought that to leadership with the analysis behind it, and the story moved: visibility first, then east-west microsegmentation.",
];
const G_STEPS = [
  ["01", "The research, before the pitch changed.", "Customer interviews, market research, and the analysis that showed where the message and the money disagreed."],
  ["02", "The reposition.", "Two anchors, in order: see the traffic, then segment it. Every surface told the same story in the same sequence."],
  ["03", "The pipeline.", "I picked the target accounts, ran the outbound, briefed executives, qualified the leads, and sat in the deals. Once leadership backed the new focus, I was selling microsegmentation before the product was finished. That is the part of positioning nobody puts in a deck: the story has to hold in a live deal while the roadmap catches up."],
  ["04", "Managed-security partners.", "I helped sign the managed-security and reseller partners who extended the platform's reach, and their reps carried the repositioned story the direct team carried."],
  ["05", "The pilot that proved it.", "A microsegmentation pilot with a top-10 North American bank. The two anchors held under a real network, with a real security team pushing on them."],
];
const G_CHANGES = [
  "$14M in revenue, at a $1.2M average enterprise deal size.",
  "Deployed behind a global systemically important bank and a federal research agency. It reached a white-shoe Wall Street law firm and a major U.S. utility too.",
  "Trillions in financial assets sit protected behind those deployments.",
  "Akamai acquired Guardicore in 2021, and the positioning carried into the product that followed the acquisition.",
];
const G_QA = [
  ["Why would positioning change revenue?", "It changes which buyer takes the meeting and what they think they are solving. Here the pitch described a feature while buyers were signing the contracts for an outcome."],
];
const G_CLOSE =
  "You built it. Enterprise teams still are not buying, and the gap is positioning, not features. I run the customer interviews and the sales-call analysis that name the question your buyers are actually asking, then the positioning shift and the sales narrative your team runs without me.";

const R_S1 = [
  "The client had twenty years of published work behind them: books, keynotes and training programs. Public buyers were funding exactly that expertise. Most of those requests never reached them.",
  "New opportunities arrived through a single newsletter list and the client's existing network. Everything else sat on federal, state and local procurement portals that nobody was watching.",
  "Every response started from a blank page. One took three to five working days, so two or three went out a month and the client passed on the rest. Volume was the ceiling, and each pass was a contract someone else won.",
];
const R_S2_INTRO = "Day three, the software was live and sending real opportunities. Scoring, the library and the drafting came after that.";
const R_STEPS = [
  ["01", "Discovery.", "It checks federal, state and local procurement portals every night and pulls each new RFP in the client's field."],
  ["02", "One record per solicitation.", "Portals repost the same solicitation, and amendments change it. Duplicates collapse into one record, and an amendment gets flagged for review rather than quietly replacing what the client already read."],
  ["03", "The library, with provenance.", "I put more than 300 pieces of the client's work into a searchable library: books, articles, talks, past proposals and client results. Every passage keeps its source, its date and how that engagement ended. This is the retrieval layer, RAG, and the provenance is the point: a draft can name real work instead of describing work in general."],
  ["04", "Bid/no-bid scoring.", "Each RFP gets scored before a person reads it: eligibility, deadline, required certifications, and how far the scope overlaps proven work."],
  ["05", "Drafting against the buyer's own criteria.", "Each solicitation states how it will be scored, and evaluation factors differ from one to the next. The draft follows that solicitation's stated criteria rather than a house template."],
  ["06", "Gaps instead of invention.", "Where the library cannot support a claim, the draft leaves a marked gap and says what is missing. It does not write a sentence that merely sounds right."],
  ["07", "Outcomes tune the scoring.", "Every award and every rejection adjusts the weights, so the scoring keeps learning from real results."],
];
const R_S2_TAIL = "Nothing submits itself. A person reads and approves every response before it goes out.";
const R_TABLE = [
  ["A buyer asks for proof of similar work delivered in the last five years.", "The engine pulls two engagements out of the library that match the scope, each with its date and how it ended, and drafts the answer around them in the client's own language."],
  ["The same RFP asks for a credential the client does not hold.", "Nothing in twenty years of their work supports it. The draft leaves a marked gap and names what is missing, so the client can answer it honestly, bring in a partner who has it, or skip the bid."],
];
const R_S3_TAIL = "That gap is the part I care about. A model that writes something plausible there costs a client their credibility with a buyer they wanted for years.";
const R_S4 = [
  "Before the software scored a live RFP, I ran thirty to fifty of the client's past bids back through it. The pattern held: every win matched two or more of their proven capabilities, and every loss matched one or none. Capability overlap became the heaviest weight in the score.",
  "That is also the honest answer to a fair question. A better filter raises a win rate on its own, so the scoring had to earn its weights against bids whose outcomes were already known.",
];
const R_CHANGES = [
  "$3M in signed contracts through the platform, across eleven awards.",
  "Contracts started arriving from buyers outside the client's existing network and outside their home state.",
  "The close rate went from one in eight to one in four of submitted proposals, inside six months.",
  "Responses out went from two or three a month to eight to ten.",
  "First drafts arrive in hours instead of days.",
  "The judgment that used to fire only when I was in the room now fires on every submission.",
];
const R_QA = [
  ["What did this RFP engine automate?", "Finding relevant solicitations, scoring whether each one is worth a bid, and drafting a first response from the client's own published work. A person reviews and submits every response."],
  ["Can AI write a government RFP response?", "It can draft one. Here the draft came from the client's own library and followed that solicitation's stated evaluation criteria, and a person finished every response. Eligibility, pricing and submission checks stayed human."],
  ["What was working after three days?", "Real RFPs arriving, scored for fit. The library, the drafting and the tuning came after."],
];
const R_CLOSE =
  "Your AI works in the notebook. Production is a different stack, and I run that stack. I build the retrieval, the scoring and the drafting on your own material, for real load and not the demo, with evals that fire on every change and catch failures before your customers do. Your team runs it after I leave.";

// ---------- study template ----------
const STUDY_CSS = `
  :root{
    --paper:#f5efe4;
    --ink:#1a1816;
    --ink-soft:#3a3631;
    --bone:#ece3d0;
    --t-ground:#12100e;
    --t-ink:#ece3d0;
    --t-ink-soft:#a69b8a;
    --t-rule:#3a332b;
    --copper:#bd5a2d;
    --copper-deep:#8a3d24;
    --rule:#d9d2c4;
    --gutter:clamp(32px,8.9vw,128px);
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--t-ground);font-family:'Hanken Grotesk',sans-serif;-webkit-font-smoothing:antialiased}
  a{color:inherit;text-decoration:none}
  .nav{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:24px 40px;color:var(--t-ink)}
  .nav__mark{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:22px;letter-spacing:-0.02em}
  .nav__links{display:flex;gap:30px;font-family:'JetBrains Mono',monospace;font-size:12px;text-transform:uppercase;letter-spacing:.12em}
  .nav__links a{opacity:.92}

  /* the band: Pass-120 shape; media slot carries the photo or the exhibit */
  .band{position:relative;isolation:isolate;background:var(--t-ground);color:var(--t-ink);border-bottom:2px solid var(--copper);padding:40px var(--gutter) 96px}
  .band-grain{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;opacity:.12;mix-blend-mode:screen}
  .band__grid{display:grid;grid-template-columns:minmax(0,1fr);grid-template-areas:"head" "text" "media";row-gap:28px;max-width:1184px;margin:0 auto}
  .band__context{font-size:13px;font-weight:500;line-height:1.5;color:var(--t-ink-soft);margin:0 0 20px}
  .cs-title{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:56px;line-height:1.08;letter-spacing:-0.02em;font-variation-settings:"opsz" 56;margin:0}
  .cs-title span{display:block}
  .band__dek{font-size:18px;line-height:1.6;max-width:56ch;margin:0 0 36px;color:var(--t-ink)}
  .glance{margin:0;padding-top:28px;border-top:1px solid var(--t-rule);display:grid;row-gap:20px}
  .glance__row{display:grid;grid-template-columns:220px minmax(0,1fr);column-gap:24px;align-items:baseline}
  .glance dt{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;letter-spacing:.06em;line-height:1.5;color:var(--t-ink-soft);margin:0}
  .glance dd{margin:0;font-size:18px;line-height:1.5;color:var(--t-ink)}
  .glance__protected{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--t-ink-soft)}
  .glance__result{margin-top:8px}
  .glance__lead{display:block;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:36px;line-height:1.2;letter-spacing:-0.01em;font-variation-settings:"opsz" 36;color:var(--t-ink)}
  .glance__rest{display:block;margin-top:8px;font-size:18px;line-height:1.5;color:var(--t-ink)}
${FLOW_CSS}
  .flow{color:var(--t-ink)}
  .flow .hl{opacity:1}
  .exhibit__sentence{margin:28px 0 0;font-size:15px;line-height:1.6;color:var(--t-ink-soft);max-width:48ch}

  /* bone body: per-section grid, body col + margin col */
  .paperbody{background:var(--bone);color:var(--ink);padding:96px 0 120px}
  .bodygrid{max-width:1200px;margin:0 auto;padding:0 40px}
  .sec{display:grid;grid-template-columns:minmax(0,68ch) minmax(0,1fr);column-gap:64px;margin-top:96px}
  .sec:first-child{margin-top:0}
  .sec__body{grid-column:1;grid-row:1}
  .sec__body h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:36px;line-height:1.15;letter-spacing:-0.01em;font-variation-settings:"opsz" 36;margin:0 0 24px}
  .sec__body p{font-size:18px;line-height:1.7;margin:0 0 20px;max-width:68ch}
  .secno{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;letter-spacing:.06em;color:var(--ink-soft);margin-right:16px;vertical-align:0.35em}
  .aside-note{grid-column:2;grid-row:1;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.7;letter-spacing:.06em;color:var(--ink-soft)}
  .aside-note .mark-bracket{width:22px;height:54px;color:var(--ink);margin-bottom:16px}
  .sec__break{grid-column:1/-1;width:834px;max-width:100%;margin:48px 0 0}
  .sec__break .flow{color:var(--ink)}
  .sec__break .flow .hl{opacity:1}
  .sec__break .vis-wide{display:block}
  .sec__break .vis-tall{display:none}
  .break-sentence{margin:28px 0 0;font-size:15px;line-height:1.6;color:var(--ink-soft);max-width:48ch}

  .cs-step{display:grid;grid-template-columns:56px minmax(0,1fr);margin:0 0 24px}
  .cs-step__n{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;color:var(--copper-deep);padding-top:5px}
  .cs-step p{margin:0;font-size:18px;line-height:1.7}
  .changes{margin:0 0 24px;padding-left:24px}
  .changes li{font-size:18px;line-height:1.7;margin-bottom:12px}
  .qa{font-size:18px;line-height:1.7;margin:0 0 24px}
  .qa strong{font-weight:600}

  /* comparison table, restyled (proof) */
  .exhibit-wrap{position:relative}
  .exhibit{width:100%;margin:40px 0;border-collapse:collapse;background:var(--paper)}
  .exhibit th,.exhibit td{text-align:left;vertical-align:top;padding:20px 32px}
  .exhibit th{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;letter-spacing:.06em;color:var(--ink-soft);padding-top:28px;padding-bottom:0;width:50%}
  .exhibit td{font-size:18px;line-height:1.6;color:var(--ink)}
  .exhibit tbody tr + tr td{border-top:1px solid var(--rule)}
  .gap-mark{color:var(--copper-deep)}
  .margin-arrow{position:absolute;right:-88px;top:56%;width:48px;height:40px;color:var(--ink)}
  .margin-arrow .ln{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}

  /* figure moment */
  .fm{margin:8px 0 24px}
  .fm__fig{margin:0 0 20px}
  .fm__num{position:relative;display:inline-block;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:72px;line-height:1;letter-spacing:-0.02em;font-variation-settings:"opsz" 72}
  .fm__mono{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;line-height:1.8;color:var(--ink-soft);margin:0;max-width:64ch}
${CIRCLE_CSS}
${MARKS_CSS}

  /* close + next */
  .cs-close{margin:96px 0 0;font-size:18px}
  .cs-close__link{position:relative;display:inline-block;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--copper-deep);padding-bottom:12px}
  .cs-close__link .mark-underline{position:absolute;left:0;bottom:0;width:100%;height:14px;color:var(--copper)}
  .cs-next{border-top:1px solid var(--rule);margin-top:96px;padding-top:48px}
  .cs-next__label{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-soft);margin:0 0 24px}
  .cs-next__entry{display:block}
  .cs-next__context{display:block;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.6;color:var(--ink-soft);margin-bottom:16px}
  .cs-next__line{display:block;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:36px;line-height:1.2;letter-spacing:-0.01em;font-variation-settings:"opsz" 36;margin-bottom:16px}
  .cs-next__line .fig{color:var(--copper-deep)}
  .cs-next__did{display:block;font-size:18px;line-height:1.6;max-width:64ch;margin-bottom:16px}
  .cs-next__service{display:block;font-family:'JetBrains Mono',monospace;font-size:14px;color:var(--ink-soft)}
  .cs-next__all{display:inline-block;margin-top:48px;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--copper-deep)}
  .draftnote{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.06em;color:var(--ink-soft);margin:12px 0 0}

  @media (max-width:1023px){
    .aside-note,.margin-arrow{display:none}
    .sec{display:block}
    .sec__break{width:100%}
  }
  @media (max-width:767px){
    .nav{padding:20px 20px}
    .nav__mark{font-size:17px}
    .nav__links{gap:12px;font-size:10px}
    .band{padding:24px var(--gutter) 48px}
    .cs-title{font-size:36px}
    .band__dek{font-size:17px}
    .glance__row{grid-template-columns:minmax(0,1fr);row-gap:4px}
    .glance__lead{font-size:28px}
    .exhibit thead{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
    .exhibit tr,.exhibit td{display:block}
    .exhibit td{padding:16px 20px}
    .exhibit td + td{padding-top:0}
    .exhibit td::before{content:attr(data-label);display:block;margin:0 0 4px;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;letter-spacing:.06em;color:var(--ink-soft)}
    .exhibit tbody tr + tr td{border-top:none}
    .exhibit tbody tr + tr{border-top:1px solid var(--rule)}
    .fm__num{font-size:48px}
    .fm__mono{font-size:13px}
    .sec__break .vis-wide{display:none}
    .sec__break .vis-tall{display:block}
    .cs-next__line{font-size:28px}
${STROKE_MOBILE}
  }`;

const BAND_HEAD = (context, l1, l2) => `      <div class="band__head">
        <p class="band__context">${context}</p>
        <h1 class="cs-title"><span>${l1}</span><span>${l2}</span></h1>
      </div>`;

const GLANCE_ROW = (dt, dd) => `        <div class="glance__row"><dt>${dt}</dt><dd>${dd}</dd></div>`;

const H2 = (n, text) => `        <h2><span class="secno">&#167;${n}</span>${text}</h2>`;

function buildStudyGuardicore() {
  const steps = G_STEPS.map(
    ([n, lead, text]) => `          <div class="cs-step"><span class="cs-step__n">${n}</span><p><strong>${lead}</strong> ${text}</p></div>`,
  ).join("\n");
  const changes = G_CHANGES.map((c) => `          <li>${c}</li>`).join("\n");
  const qa = G_QA.map(([q, a]) => `          <p class="qa"><strong>${q}</strong> ${a}</p>`).join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pass-121 mock set / Guardicore study, Direction C</title>
${FONT_LINKS}
<style>${STUDY_CSS}
  .band__head{grid-area:head}
  .band__text{grid-area:text;max-width:820px}
  .band__media{grid-area:media;margin:0}
  .band__img{display:block;width:100%;height:auto}
  @media (min-width:1024px){
    .band__grid{grid-template-columns:minmax(0,1fr) 405px;grid-template-areas:"head head" "text media";column-gap:64px}
    .band__media{margin-top:${BAND_PHOTO_OFFSET}px;align-self:start}
    .band__img{width:405px}
  }
</style>
</head>
<body class="guardicore">

<header class="nav">
  <a class="nav__mark" href="#">MICAH/JONES</a>
  <nav class="nav__links">
    <a href="#">Services</a><a href="#">Work</a><a href="#">About</a><a href="#">Contact</a>
  </nav>
</header>

<div class="band">
  <svg class="band-grain" aria-hidden="true"><filter id="tg"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.92  0 0 0 0 0.90  0 0 0 0 0.86  0 0 0 0.8 0"/></filter><rect width="100%" height="100%" filter="url(#tg)"/></svg>
  <div class="band__grid">
${BAND_HEAD("Guardicore, acquired by Akamai", "Repositioning Guardicore:", "$14M, then Akamai")}
    <div class="band__text">
      <p class="band__dek">$14M in revenue, sourced and closed, at a $1.2M average enterprise deal, for a security company built in Tel Aviv whose buyers sat in North American banks. I ran the research that found what those buyers were actually signing for, moved the story from honeypots to east-west visibility, and sat in the deals. Akamai acquired the company in 2021.</p>
      <dl class="glance">
${GLANCE_ROW("Client", "Guardicore, acquired by Akamai")}
${GLANCE_ROW("My role", "Revenue and positioning")}
${GLANCE_ROW("The work", "Customer research and data analysis, the repositioning, target accounts and outbound, executive briefings, managed-security partners, and a microsegmentation pilot")}
        <div class="glance__row"><dt>Results</dt><dd class="glance__result"><span class="glance__lead">$14M in revenue, sourced and closed.</span><span class="glance__rest">$1.2M average enterprise deal. Acquired by Akamai in 2021.</span></dd></div>
      </dl>
    </div>
    <div class="band__media">
      <img class="band__img" src="${IMG}" alt="A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses.">
    </div>
  </div>
</div>

<div class="paperbody">
  <div class="bodygrid">
    <section class="sec">
      <div class="sec__body">
${H2("01", "Everyone was selling honeypots")}
${G_S1.map((p) => `        <p>${p}</p>`).join("\n")}
      </div>
      <aside class="aside-note"><p>&#167;01 &#183; east-west, the blind spot</p></aside>
      <figure class="sec__break">
        ${visibilityMarkup("visg", "wide")}
        ${visibilityMarkup("visgm", "tall")}
        <figcaption class="break-sentence">The pitch led with honeypots. Buyers could not see the east-west traffic between their own workloads, and seeing inside the environment was what they signed for.</figcaption>
      </figure>
    </section>

    <section class="sec">
      <div class="sec__body">
${H2("02", "What the customers said that the deck did not")}
        <p>${G_S2[0]}</p>
        <p>${G_S2[1]}</p>
      </div>
      <aside class="aside-note">${bracketSvg("brg")}<p>&#167;02 &#183; visibility was the thing they signed for</p></aside>
    </section>

    <section class="sec">
      <div class="sec__body">
${H2("03", "What I did")}
${steps}
      </div>
      <aside class="aside-note"><p>&#167;03 &#183; the story has to hold in a live deal</p></aside>
    </section>

    <section class="sec">
      <div class="sec__body">
${H2("04", "What changed")}
        <ul class="changes">
${changes}
        </ul>
        <div class="fm">
          <p class="fm__fig">
            <span class="fm__num">$14M${circleSvg("hcfig14", EM14)}</span>
          </p>
          <p class="fm__mono">in revenue, sourced and closed &#183; $1.2M average enterprise deal &#183; acquired by Akamai, 2021</p>
        </div>
      </div>
      <aside class="aside-note"><p>&#167;04 &#183; Akamai acquired Guardicore in 2021</p></aside>
    </section>

    <section class="sec">
      <div class="sec__body">
${H2("05", "Questions buyers ask")}
${qa}
      </div>
      <aside class="aside-note"><p>&#167;05 &#183; signing the contracts for an outcome</p></aside>
    </section>

    <section class="sec">
      <div class="sec__body">
${H2("06", "If enterprise teams still are not buying")}
        <p>${G_CLOSE}</p>
        <p class="cs-close"><a class="cs-close__link" href="#">Positioning &amp; GTM <span aria-hidden="true">&#8594;</span>${underlineSvg("ulg")}</a></p>
      </div>
      <aside class="aside-note"><p>&#167;06 &#183; the gap is positioning, not features</p></aside>
    </section>

    <nav class="cs-next" aria-labelledby="cs-next-label">
      <p class="cs-next__label" id="cs-next-label">Next</p>
      <a class="cs-next__entry" href="#">
        <span class="cs-next__context">An award-winning author and leadership consultant who teaches government bodies and corporations</span>
        <span class="cs-next__line"><span class="fig">$3M</span> in signed contracts across eleven awards.</span>
        <span class="cs-next__did">It finds the RFPs worth answering, weighs each one against twenty years of their own work, and has a drafted response waiting by morning.</span>
        <span class="cs-next__service">AI engineering</span>
      </a>
      <a class="cs-next__all" href="#">All work</a>
    </nav>
  </div>
</div>

</body>
</html>
`;
}

function buildStudyRfp() {
  const steps = R_STEPS.map(
    ([n, lead, text]) => `          <div class="cs-step"><span class="cs-step__n">${n}</span><p><strong>${lead}</strong> ${text}</p></div>`,
  ).join("\n");
  const changes = R_CHANGES.map((c) => `          <li>${c}</li>`).join("\n");
  const qa = R_QA.map(([q, a]) => `          <p class="qa"><strong>${q}</strong> ${a}</p>`).join("\n");
  const rows = R_TABLE.map(
    ([req, eng]) => `            <tr>
              <td data-label="The request">${req}</td>
              <td data-label="What the engine did">${eng.includes("marked gap") ? `Nothing in twenty years of their work supports it. <span class="gap-mark">The draft leaves a marked gap and names what is missing, so the client can answer it honestly, bring in a partner who has it, or skip the bid.</span>` : eng}</td>
            </tr>`,
  ).join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pass-121 mock set / RFP engine study, Direction C</title>
${FONT_LINKS}
<style>${STUDY_CSS}
  .band__head{grid-area:head}
  .band__text{grid-area:text;max-width:820px}
  .band__media{grid-area:media;margin:0;display:flex;flex-direction:column}
  @media (min-width:1024px){
    .band__grid{grid-template-columns:minmax(0,1fr) minmax(0,552px);grid-template-areas:"head head" "text media";column-gap:64px}
    .band__media{margin-top:${BAND_FLOW_OFFSET}px;align-self:stretch}
  }
  @media (max-width:767px){
    .band__media{margin-inline:-20px}
    .band__media .exhibit__sentence{margin-inline:20px}
  }
</style>
</head>
<body class="rfp">

<header class="nav">
  <a class="nav__mark" href="#">MICAH/JONES</a>
  <nav class="nav__links">
    <a href="#">Services</a><a href="#">Work</a><a href="#">About</a><a href="#">Contact</a>
  </nav>
</header>

<div class="band">
  <svg class="band-grain" aria-hidden="true"><filter id="tg"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.92  0 0 0 0 0.90  0 0 0 0 0.86  0 0 0 0.8 0"/></filter><rect width="100%" height="100%" filter="url(#tg)"/></svg>
  <div class="band__grid">
${BAND_HEAD("An award-winning author and leadership consultant who teaches government bodies and corporations", "AI RFP software:", "$3M in signed contracts")}
    <div class="band__text">
      <p class="band__dek">$3M in signed contracts, won through AI software I built for an award-winning author and leadership consultant. It finds the RFPs worth answering, weighs each one against twenty years of their own work, and has a drafted response waiting by morning. Their close rate went from one in eight to one in four.</p>
      <dl class="glance">
        <div class="glance__row"><dt>Client</dt><dd>An award-winning author and leadership consultant who teaches government bodies and corporations <span class="glance__protected">Name protected</span></dd></div>
${GLANCE_ROW("My role", "Strategist and sole builder")}
${GLANCE_ROW("First real RFPs delivered", "Day three")}
${GLANCE_ROW("What I built", "Discovery, bid/no-bid scoring, a library of their work with provenance, and response drafting")}
        <div class="glance__row"><dt>Results</dt><dd class="glance__result"><span class="glance__lead">$3M in signed contracts across eleven awards.</span><span class="glance__rest">Close rate from one in eight to one in four inside six months. Responses out per month: two or three, then eight to ten.</span></dd></div>
      </dl>
    </div>
    <figure class="band__media band__media--bleed">
      ${flowMarkup("fgrfp", true)}
      <figcaption class="exhibit__sentence">Nightly checks on procurement portals feed a library of more than 300 pieces of the client's own work. Each request is scored bid or no-bid, drafted against the buyer's criteria with any gap marked, and a person approves every response.</figcaption>
    </figure>
  </div>
</div>

<div class="paperbody">
  <div class="bodygrid">
    <section class="sec">
      <div class="sec__body">
${H2("01", "Three responses a month was the ceiling")}
${R_S1.map((p) => `        <p>${p}</p>`).join("\n")}
      </div>
      <aside class="aside-note"><p>&#167;01 &#183; Volume was the ceiling</p></aside>
    </section>

    <section class="sec">
      <div class="sec__body">
${H2("02", "Real RFPs by day three")}
        <p>${R_S2_INTRO}</p>
${steps}
        <p>${R_S2_TAIL}</p>
      </div>
      <aside class="aside-note"><p>&#167;02 &#183; the software was live</p></aside>
    </section>

    <section class="sec">
      <div class="sec__body">
${H2("03", "One requirement, start to finish")}
        <div class="exhibit-wrap">
          <table class="exhibit">
            <thead>
              <tr><th scope="col">The request</th><th scope="col">What the engine did</th></tr>
            </thead>
            <tbody>
${rows}
            </tbody>
          </table>
          <svg class="margin-arrow" viewBox="0 0 48 40" aria-hidden="true">
            <defs>
              <filter id="ag1" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.9"/>
              </filter>
            </defs>
            <g filter="url(#ag1)">
              <path class="ln" d="M 46 9 C 37 12, 24 18, 12 27.5"/>
              <path class="ln" d="M 12 27.5 L 19.2 26.6"/>
              <path class="ln" d="M 12 27.5 L 16.8 20.9"/>
            </g>
          </svg>
        </div>
        <p>${R_S3_TAIL}</p>
      </div>
      <aside class="aside-note"><p>&#167;03 &#183; a marked gap</p></aside>
    </section>

    <section class="sec">
      <div class="sec__body">
${H2("04", "What the replay found")}
${R_S4.map((p) => `        <p>${p}</p>`).join("\n")}
      </div>
      <aside class="aside-note"><p>&#167;04 &#183; every win matched two or more of their proven capabilities</p></aside>
    </section>

    <section class="sec">
      <div class="sec__body">
${H2("05", "What changed")}
        <ul class="changes">
${changes}
        </ul>
        <div class="fm">
          <p class="fm__fig">
            <span class="fm__num">$3M${circleSvg("hcfig3", EM3)}</span>
          </p>
          <p class="fm__mono">signed contracts, across eleven awards &#183; close rate one in eight to one in four inside six months &#183; responses out two or three a month to eight to ten</p>
        </div>
      </div>
      <aside class="aside-note"><p>&#167;05 &#183; $3M in signed contracts</p></aside>
    </section>

    <section class="sec">
      <div class="sec__body">
${H2("06", "Questions buyers ask")}
${qa}
      </div>
      <aside class="aside-note"><p>&#167;06 &#183; a person reviews and submits every response</p></aside>
    </section>

    <section class="sec">
      <div class="sec__body">
${H2("07", "If your experts read the same document every week")}
        <p>${R_CLOSE}</p>
        <p class="cs-close"><a class="cs-close__link" href="#">AI engineering <span aria-hidden="true">&#8594;</span>${underlineSvg("ulr")}</a></p>
      </div>
      <aside class="aside-note"><p>&#167;07 &#183; Production is a different stack</p></aside>
    </section>

    <nav class="cs-next" aria-labelledby="cs-next-label">
      <p class="cs-next__label" id="cs-next-label">Next</p>
      <a class="cs-next__entry" href="#">
        <span class="cs-next__context">ORDANI, my company</span>
        <span class="cs-next__line">Birth workers keep hundreds of dollars per client that a claims service would take.</span>
        <span class="cs-next__did">I founded and built ORDANI, a HIPAA-compliant CRM where birth workers file their own Medicaid and private-insurance claims.</span>
        <span class="cs-next__service">Product building</span>
      </a>
      <p class="draftnote">DRAFT</p>
      <a class="cs-next__all" href="#">All work</a>
    </nav>
  </div>
</div>

</body>
</html>
`;
}
// ---------- states.html ----------
// Six labelled frames. The two morph mid-points are composites per FABLE-121-G2
// section 7: ground at the 50 percent mix of #f5efe4 and #12100e, the /work
// content at 50 percent opacity, the shared element's box halfway between its
// /work box and its band box (both measured from this set's own pages at 1440).
function mixColor(a, b) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return "#" + pa.map((v, i) => Math.round((v + pb[i]) / 2).toString(16).padStart(2, "0")).join("");
}

// the ghost /work slice: nav + heading + description + doorway (still
// hidden where the shared element takes over) + entry 02
function ghostWork(hideStill, hideFlow) {
  const entry = entryMarkup(ENTRY02, flowMarkup("fgs2", false));
  const entryStyled = hideFlow
    ? entry.replace('class="e-exhibit"', 'class="e-exhibit" style="visibility:hidden"')
    : entry;
  return `<div class="ghostwork">
${NAV_LIGHT}
<main class="wx">
  <h1 class="wx__head">The Work,<br>On The Record.</h1>
  <p class="wx__desc">${DESC}</p>
  <a class="doorway" href="#">
    <div class="doorway__text">
      <p class="doorway__folio">01</p>
      <p class="doorway__ctx">Guardicore, acquired by Akamai</p>
      <p class="doorway__fig">
        <span class="doorway__num">$14M</span>
      </p>
      <p class="doorway__line">in revenue, sourced and closed, at a $1.2M average enterprise deal.</p>
      <p class="doorway__did">I ran the research that found what those buyers were actually signing for, moved the story from honeypots to east-west visibility, and sat in the deals.</p>
      <p class="svc doorway__svc">Positioning &amp; GTM</p>
      <p class="doorway__read">Read this one first <span class="arr">&#8594;</span></p>
    </div>
    <p class="doorway__img"${hideStill ? ' style="visibility:hidden"' : ""}><img src="${IMG}" alt=""></p>
    <div class="doorway__exhibit">
      ${visibilityMarkup("vis_s1", "wide")}
    </div>
  </a>
  <div class="entries">
${entryStyled}
  </div>
</main>
</div>`;
}

function doorwayFrame(hover) {
  const num = hover ? "02" : "01";
  const state = hover ? "hovered" : "at rest";
  return `<section class="panel">
  <p class="statelabel">${num} &#183; doorway ${state}</p>
  <div class="frame frame--paper">
    <div class="frame__in">
      <div class="workctx">
${NAV_LIGHT}
<main class="wx">
  <h1 class="wx__head">The Work,<br>On The Record.</h1>
  <p class="wx__desc">${DESC}</p>
  <a class="doorway${hover ? " doorway--hover" : ""}" href="#">
    <div class="doorway__text">
      <p class="doorway__folio">01</p>
      <p class="doorway__ctx">Guardicore, acquired by Akamai</p>
      <p class="doorway__fig">
        <span class="doorway__num">$14M${circleSvg(hover ? "hcs1h" : "hcs1", EM14)}</span>
      </p>
      <p class="doorway__line">in revenue, sourced and closed, at a $1.2M average enterprise deal.</p>
      <p class="doorway__did">I ran the research that found what those buyers were actually signing for, moved the story from honeypots to east-west visibility, and sat in the deals.</p>
      <p class="svc doorway__svc">Positioning &amp; GTM</p>
      <p class="doorway__read">Read this one first <span class="arr">&#8594;</span></p>
    </div>
    <p class="doorway__img"><img src="${IMG}" alt=""></p>
    <div class="doorway__exhibit">
      ${visibilityMarkup(hover ? "vis_s1h" : "vis_s1b", "wide")}
    </div>
  </a>
</main>
      </div>
    </div>
  </div>
</section>`;
}

function methodFrame(before) {
  const note = before
    ? "before (shown at 18 percent so the frame reads; the build's before-state is fully transparent)"
    : "after";
  return `<section class="panel">
  <p class="statelabel">06 &#183; method band reveal, ${note}</p>
  <div class="frame frame--paper">
    <div class="frame__in">
      <div class="workctx">
        <div class="methodband${before ? " methodband--before" : ""}" style="padding:120px 0">
          <div class="wx"><p class="methodline">${METHOD}</p></div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function buildStates(m) {
  const MID = mixColor("#f5efe4", "#12100e");
  const mid = (a, b) => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    w: (a.w + b.w) / 2,
    h: (a.h + b.h) / 2,
  });
  const stillMid = mid(m.stillWork, m.stillBand);
  const flowMid = mid(m.flowWork, m.flowBand);
  const frameH = Math.ceil(Math.max(stillMid.y + stillMid.h, flowMid.y + flowMid.h) + 120);
  const r = Math.round;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pass-121 mock set / interaction states</title>
${FONT_LINKS}
<style>
  :root{
    --paper:#f5efe4;
    --ink:#1a1816;
    --ink-soft:#3a3631;
    --bone:#ece3d0;
    --copper:#bd5a2d;
    --copper-deep:#8a3d24;
    --sage:#5E7158;
    --rule:#d9d2c4;
    --mid:${MID};
    --ease-hover:cubic-bezier(0.2,0.8,0.2,1);
    --dur-hover:200ms;
  }
  *{box-sizing:border-box}
  body{margin:0;background:#efe9dc;font-family:'Hanken Grotesk',sans-serif;-webkit-font-smoothing:antialiased}
  a{color:inherit;text-decoration:none}
${NAV_CSS}
${FLOW_CSS}
${CIRCLE_CSS}
  .workctx{background:var(--paper);color:var(--ink)}
  .wx{max-width:1200px;margin:0 auto;padding:0 40px}
  .wx__head{margin:56px 0 0;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:96px;line-height:1.02;letter-spacing:-0.02em;text-transform:uppercase;font-variation-settings:"opsz" 96}
  .wx__desc{margin:36px 0 0;font-size:22px;line-height:1.6;max-width:60ch}
  .svc{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;line-height:1.5;color:var(--ink-soft);margin:0}
  .doorway{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:64px;row-gap:28px;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);padding:48px 0;margin-top:64px}
  .doorway__text{grid-column:1;grid-row:1/3}
  .doorway__img{grid-column:2;grid-row:1;margin:0;justify-self:end}
  .doorway__img img{display:block;width:320px;height:400px;object-fit:cover;opacity:.82;transition:opacity var(--dur-hover) var(--ease-hover)}
  .doorway--hover .doorway__img img{opacity:1}
  .doorway__exhibit{grid-column:2;grid-row:2;margin:0;color:var(--ink)}
  .doorway__folio{margin:0 0 20px;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;letter-spacing:.06em;color:var(--ink-soft)}
  .doorway__ctx{margin:0 0 28px;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;line-height:1.5;color:var(--ink-soft)}
  .doorway__fig{position:relative;margin:0 0 20px}
  .doorway__num{position:relative;display:inline-block;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:72px;line-height:1;letter-spacing:-0.02em;font-variation-settings:"opsz" 72}
  .doorway__line{margin:0 0 20px;font-size:22px;line-height:1.45}
  .doorway__did{margin:0 0 28px;font-size:18px;line-height:1.6}
  .doorway__svc{margin:0 0 12px}
  .doorway__read{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--copper-deep);margin:0}
  .doorway__read .arr{display:inline-block;transition:transform var(--dur-hover) var(--ease-hover)}
  .doorway--hover .doorway__read .arr{transform:translateX(4px)}
  .doorway--hover .doorway__num{color:var(--copper-deep)}
  .doorway--hover .flow .hl{opacity:1}
  .entry{display:grid;grid-template-columns:repeat(12,1fr);column-gap:24px;position:relative;padding:56px 0 48px;border-bottom:1px solid var(--rule)}
  .entry .copperline{position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--copper);transform:scaleX(0);transform-origin:left;transition:transform var(--dur-hover) var(--ease-hover)}
  .entry--hover .copperline{transform:scaleX(1)}
  .e-folio{grid-column:1/7;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;letter-spacing:.06em;color:var(--ink-soft);margin:0 0 20px}
  .e-ctx{grid-column:1/7;margin:0 0 24px;font-size:14px;line-height:1.5;color:var(--ink-soft);max-width:50ch}
  .e-fig{grid-column:1/7;margin:0 0 24px}
  .e-num{display:block;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:72px;line-height:1;letter-spacing:-0.02em;font-variation-settings:"opsz" 96}
  .e-qual{display:block;margin-top:10px;font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:22px;line-height:1.3;letter-spacing:-0.01em}
  .entry--hover .e-num,.entry--hover .e-qual{color:var(--copper-deep)}
  .entry--hover .flow .hl{opacity:1}
  .e-did{grid-column:1/7;margin:0 0 20px;font-size:18px;line-height:1.6;max-width:48ch}
  .e-svc{grid-column:1/7}
  .e-exhibit{grid-column:8/13;grid-row:3/6;align-self:start;justify-self:end;width:100%;max-width:400px;margin-top:14px;color:var(--ink)}
  .methodline{margin:0;max-width:1120px;font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:36px;line-height:1.35;letter-spacing:-0.01em;font-variation-settings:"opsz" 36}
  .methodband--before .methodline{opacity:.18;transform:translateY(12px)}

  .sheet{padding:48px 0 120px;max-width:1440px;margin:0 auto}
  .panel{margin:0 0 72px}
  .statelabel{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.06em;color:var(--ink-soft);margin:0 0 12px}
  .frame{position:relative;overflow:hidden;border:1px solid #cfc7b6;background:var(--paper)}
  .frame__in{width:1440px;transform-origin:top left}
  .frame--mix{background:var(--mid);height:${frameH}px}
  .frame--mix .frame__in{position:absolute;top:0;left:0;height:${frameH}px}
  .ghostwork{opacity:.5}
  .shared{position:absolute;object-fit:cover}
  .shared--flow{position:absolute}
  .flow--ink{color:var(--ink)}
  .flow--bone{color:var(--bone)}
</style>
</head>
<body>
<div class="sheet">

${doorwayFrame(false)}
${doorwayFrame(true)}

<section class="panel">
  <p class="statelabel">03 &#183; index entry hovered (the copper element at full strength)</p>
  <div class="frame frame--paper">
    <div class="frame__in">
      <div class="workctx">
<main class="wx" style="padding-top:56px">
  <div class="entries">
${entryMarkup(ENTRY02, flowMarkup("fgs3", false), " entry--hover")}
  </div>
</main>
      </div>
    </div>
  </div>
</section>

<section class="panel">
  <p class="statelabel">04 &#183; doorway morph mid-point (450ms of the 900ms dim): ground at the 50 percent mix, /work at 50 percent opacity, the still halfway between its /work box (${r(m.stillWork.w)}x${r(m.stillWork.h)}) and its band box (${r(m.stillBand.w)}x${r(m.stillBand.h)})</p>
  <div class="frame frame--mix">
    <div class="frame__in">
      ${ghostWork(true, false)}
    </div>
    <img class="shared" src="${IMG}" alt="" style="left:${r(stillMid.x)}px;top:${r(stillMid.y)}px;width:${r(stillMid.w)}px;height:${r(stillMid.h)}px">
  </div>
</section>

<section class="panel">
  <p class="statelabel">05 &#183; index-entry morph mid-point: the RFP flow halfway between its /work box (${r(m.flowWork.w)}px wide) and the band's media slot (${r(m.flowBand.w)}px wide), the ink pass and the bone pass crossfading at 50 percent</p>
  <div class="frame frame--mix">
    <div class="frame__in">
      ${ghostWork(false, true)}
    </div>
    <div class="shared--flow" style="left:${r(flowMid.x)}px;top:${r(flowMid.y)}px;width:${r(flowMid.w)}px">
      <div style="position:absolute;inset:0;opacity:.55">${flowMarkup("fgs4a", true).replace('class="flow"', 'class="flow flow--ink"')}</div>
      <div style="position:absolute;inset:0;opacity:.55">${flowMarkup("fgs4b", true).replace('class="flow"', 'class="flow flow--bone"')}</div>
    </div>
  </div>
</section>

${methodFrame(true)}
${methodFrame(false)}

</div>
<script>
  function fit() {
    for (const f of document.querySelectorAll(".frame")) {
      const w = f.clientWidth;
      const inn = f.querySelector(".frame__in");
      if (!inn) continue;
      const s = w / 1440;
      inn.style.transform = "scale(" + s + ")";
      if (!f.classList.contains("frame--mix")) f.style.height = Math.ceil(inn.scrollHeight * s) + "px";
    }
  }
  window.addEventListener("resize", fit);
  window.addEventListener("load", fit);
  fit();
  setTimeout(fit, 400);
</script>
</body>
</html>
`;
}

// ---------- main ----------
// media top at the title cap line: measured row-2 top was 302.4 with the
// title cap at 149.5, so the pull-up is 153 (INFO-checked each round)
const BAND_FLOW_OFFSET = -153;
const BAND_PHOTO_OFFSET = -153;

fs.writeFileSync(`${DIR}/work.html`, buildWork());
fs.writeFileSync(`${DIR}/study-guardicore.html`, buildStudyGuardicore());
fs.writeFileSync(`${DIR}/study-rfp.html`, buildStudyRfp());
console.log("wrote work.html, study-guardicore.html, study-rfp.html");

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
async function measureBoxes() {
  const out = {};
  const jobs = [
    {
      file: "work.html",
      pick: () => {
        const still = document.querySelector(".doorway__img img").getBoundingClientRect();
        const flow = document.querySelector('.entry[data-entry="02"] .e-exhibit svg').getBoundingClientRect();
        const sy = window.scrollY;
        return {
          stillWork: { x: still.left, y: still.top + sy, w: still.width, h: still.height },
          flowWork: { x: flow.left, y: flow.top + sy, w: flow.width, h: flow.height },
        };
      },
    },
    {
      file: "study-guardicore.html",
      pick: () => {
        const img = document.querySelector(".band__media img").getBoundingClientRect();
        return { stillBand: { x: img.left, y: img.top + window.scrollY, w: img.width, h: img.height } };
      },
    },
    {
      file: "study-rfp.html",
      pick: () => {
        const svg = document.querySelector(".band__media svg.flow").getBoundingClientRect();
        return { flowBand: { x: svg.left, y: svg.top + window.scrollY, w: svg.width, h: svg.height } };
      },
    },
  ];
  for (const job of jobs) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`file:///${DIR}/${job.file}`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluateHandle("document.fonts.ready");
    await sleep(600);
    Object.assign(out, await page.evaluate(job.pick));
    await page.close();
  }
  return out;
}
const boxes = await measureBoxes();
console.log("morph boxes:", JSON.stringify(boxes));
fs.writeFileSync(`${DIR}/states.html`, buildStates(boxes));
console.log("wrote states.html");

await browser.close();
