// .planning/exec/measure-copper-ab.mjs — Pass-123 copper hex A/B measurement.
//
// For every captured frame (copper-ab.mjs's PNGs), finds the copper-ink
// pixels via a WIDENED colour window that catches both the shipped hex
// (#bd5a2d = rgb(189,90,45)) and the documented hex (#C8542B =
// rgb(200,84,43)): |r-195|<=40, |g-87|<=40, |b-44|<=40. Takes the per-channel
// median of the matches (reusing band123.mjs's medianCopperOfPng approach:
// filter-then-median, just run directly over the saved PNG's raw buffer via
// sharp instead of a browser canvas). Ground colour is sampled from a patch
// immediately beside the copper bounding box (adjacent strip, copper pixels
// excluded), median'd the same way (band123.mjs's medianColorOfPng
// approach). Contrast ratio uses the identical WCAG relative-luminance
// formula as band123.mjs.
//
// Usage: node .planning/exec/measure-copper-ab.mjs
// Reads capture-summary.json written by copper-ab.mjs. Writes
// contrast-table.json + contrast-table.txt next to the PNGs.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(path.resolve("package.json"));
const sharp = require("sharp");

const DIR = path.resolve(
  "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/qa/pass-123/copper",
);

const COPPER_WINDOW = { r: 195, g: 87, b: 44, tol: 40 };

// ---------------------------------------------------------------- contrast helpers (verbatim from band123.mjs)
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
function median(arr) {
  if (!arr.length) return null;
  const s = [...arr].sort((x, y) => x - y);
  return s[Math.floor(s.length / 2)];
}
function isCopper(r, g, b) {
  return Math.abs(r - COPPER_WINDOW.r) <= COPPER_WINDOW.tol && Math.abs(g - COPPER_WINDOW.g) <= COPPER_WINDOW.tol && Math.abs(b - COPPER_WINDOW.b) <= COPPER_WINDOW.tol;
}

// medianCopperOfPng-equivalent: median of only the copper-matching pixels in a raw RGBA buffer.
function medianCopperOfBuffer(data, width, height) {
  const rs = [], gs = [], bs = [];
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (isCopper(r, g, b)) {
        rs.push(r); gs.push(g); bs.push(b);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (!rs.length) return { n: 0, rgb: null, bbox: null };
  return { n: rs.length, rgb: [median(rs), median(gs), median(bs)], bbox: { minX, minY, maxX, maxY } };
}

// medianColorOfPng-equivalent: plain per-channel median over a rectangular patch, optionally
// excluding pixels that match the copper window (keeps the "ground" patch free of ink bleed).
function medianColorOfPatch(data, width, height, rect, excludeCopper) {
  const { x0, y0, x1, y1 } = rect;
  const rs = [], gs = [], bs = [];
  for (let y = Math.max(0, y0); y < Math.min(height, y1); y++) {
    for (let x = Math.max(0, x0); x < Math.min(width, x1); x++) {
      const i = (y * width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (excludeCopper && isCopper(r, g, b)) continue;
      rs.push(r); gs.push(g); bs.push(b);
    }
  }
  if (!rs.length) return null;
  return [median(rs), median(gs), median(bs)];
}

// Picks a ground patch adjacent to the copper bounding box: try right, then left, then below,
// then a top-left corner as a last resort. Returns { rgb, strategy, n } or null.
function findGround(data, width, height, bbox) {
  const bboxH = bbox.maxY - bbox.minY + 1;
  const stripW = 40;
  const candidates = [
    { strategy: "right", rect: { x0: bbox.maxX + 1, y0: bbox.minY, x1: Math.min(width, bbox.maxX + 1 + stripW), y1: bbox.maxY + 1 } },
    { strategy: "left", rect: { x0: Math.max(0, bbox.minX - stripW), y0: bbox.minY, x1: bbox.minX, y1: bbox.maxY + 1 } },
    { strategy: "below", rect: { x0: bbox.minX, y0: bbox.maxY + 1, x1: bbox.maxX + 1, y1: Math.min(height, bbox.maxY + 1 + stripW) } },
    { strategy: "corner-fallback", rect: { x0: 0, y0: 0, x1: 20, y1: 20 } },
  ];
  for (const c of candidates) {
    const w = c.rect.x1 - c.rect.x0;
    const h = c.rect.y1 - c.rect.y0;
    if (w < 8 || h < 8) continue;
    const rgb = medianColorOfPatch(data, width, height, c.rect, true);
    if (rgb) return { rgb, strategy: c.strategy };
  }
  return null;
}

const summaryPath = path.join(DIR, "capture-summary.json");
const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
if (summary.aborted) {
  console.error(`capture-summary.json records an ABORT — refusing to measure an unconfirmed override run.`);
  process.exit(1);
}

const rows = [];
for (const combo of summary.combos) {
  if (combo.error) {
    rows.push({ page: combo.page, width: combo.width, variant: combo.variant, error: combo.error });
    continue;
  }
  const imgPath = combo.outPath || path.join(DIR, `${combo.page}-${combo.width}-${combo.variant}.png`);
  if (!fs.existsSync(imgPath)) {
    rows.push({ page: combo.page, width: combo.width, variant: combo.variant, error: "png missing" });
    continue;
  }
  const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const ink = medianCopperOfBuffer(data, info.width, info.height);
  if (!ink.n) {
    rows.push({ page: combo.page, width: combo.width, variant: combo.variant, note: "no copper-window pixels found in frame" });
    continue;
  }
  const ground = findGround(data, info.width, info.height, ink.bbox);
  if (!ground) {
    rows.push({
      page: combo.page,
      width: combo.width,
      variant: combo.variant,
      inkN: ink.n,
      inkRgb: ink.rgb,
      note: "no viable ground patch found beside the copper bounding box",
    });
    continue;
  }
  const ratio = contrastRatio(ink.rgb, ground.rgb);
  rows.push({
    page: combo.page,
    width: combo.width,
    variant: combo.variant,
    inkN: ink.n,
    inkRgb: ink.rgb,
    groundRgb: ground.rgb,
    groundStrategy: ground.strategy,
    contrastRatio: +ratio.toFixed(2),
  });
}

fs.writeFileSync(path.join(DIR, "contrast-table.json"), JSON.stringify(rows, null, 2));

const fmtRgb = (rgb) => (rgb ? `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` : "n/a");
const header = ["page", "width", "variant", "inkN", "ink rgb", "ground rgb", "ground via", "contrast"];
const lines = [header.join("\t")];
for (const r of rows) {
  if (r.error) {
    lines.push([r.page, r.width, r.variant, "-", "-", "-", "-", `ERROR: ${r.error}`].join("\t"));
  } else if (r.note) {
    lines.push([r.page, r.width, r.variant, r.inkN ?? 0, fmtRgb(r.inkRgb), "-", "-", `NA: ${r.note}`].join("\t"));
  } else {
    lines.push(
      [r.page, r.width, r.variant, r.inkN, fmtRgb(r.inkRgb), fmtRgb(r.groundRgb), r.groundStrategy, r.contrastRatio.toFixed(2)].join("\t"),
    );
  }
}
const table = lines.join("\n");
fs.writeFileSync(path.join(DIR, "contrast-table.txt"), table + "\n");
console.log(table);
console.log(`\nwritten: ${path.join(DIR, "contrast-table.json")}`);
console.log(`written: ${path.join(DIR, "contrast-table.txt")}`);
