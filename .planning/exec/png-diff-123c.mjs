// Pass-123c reusable PNG diff helper. Usage:
//   node .planning/exec/png-diff-123c.mjs <a.png> <b.png>
// Prints: dimensions, mean absolute difference per channel (RGB), count of
// pixels differing by more than 8 (any channel), and the bounding box of
// pixels that differ at all. Pure numeric output -- no visual description.
import sharp from "sharp";

const [aPath, bPath] = process.argv.slice(2);
if (!aPath || !bPath) {
  console.error("usage: node png-diff-123c.mjs <a.png> <b.png>");
  process.exit(1);
}

const [a, b] = await Promise.all([
  sharp(aPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
  sharp(bPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
]);

if (a.info.width !== b.info.width || a.info.height !== b.info.height) {
  console.log(
    JSON.stringify({
      a: aPath,
      b: bPath,
      error: "dimension mismatch",
      aDims: `${a.info.width}x${a.info.height}`,
      bDims: `${b.info.width}x${b.info.height}`,
    }),
  );
  process.exit(0);
}

const { width, height } = a.info;
const bufA = a.data;
const bufB = b.data;
const channels = 4; // ensureAlpha -> RGBA
let sumAbsDiff = [0, 0, 0]; // RGB only
let countOver8 = 0;
let minX = width,
  minY = height,
  maxX = -1,
  maxY = -1;
let anyDiffPixels = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * channels;
    const dr = Math.abs(bufA[idx] - bufB[idx]);
    const dg = Math.abs(bufA[idx + 1] - bufB[idx + 1]);
    const db = Math.abs(bufA[idx + 2] - bufB[idx + 2]);
    sumAbsDiff[0] += dr;
    sumAbsDiff[1] += dg;
    sumAbsDiff[2] += db;
    const maxCh = Math.max(dr, dg, db);
    if (maxCh > 8) countOver8++;
    if (dr || dg || db) {
      anyDiffPixels++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const totalPixels = width * height;
const result = {
  a: aPath,
  b: bPath,
  width,
  height,
  totalPixels,
  meanAbsDiffPerChannel: sumAbsDiff.map((s) => +(s / totalPixels).toFixed(4)),
  pixelsOver8: countOver8,
  pixelsOver8Pct: +((countOver8 / totalPixels) * 100).toFixed(4),
  anyDiffPixels,
  anyDiffPixelsPct: +((anyDiffPixels / totalPixels) * 100).toFixed(4),
  diffBoundingBox:
    anyDiffPixels > 0 ? { x0: minX, y0: minY, x1: maxX, y1: maxY, w: maxX - minX + 1, h: maxY - minY + 1 } : null,
};
console.log(JSON.stringify(result, null, 2));
