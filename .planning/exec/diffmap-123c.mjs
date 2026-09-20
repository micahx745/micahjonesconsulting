import { createRequire } from "node:module";
const require = createRequire("C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/package.json");
const sharp = require("sharp");
const [aP, bP, outP] = process.argv.slice(2);
const a = sharp(aP), b = sharp(bP);
const [ab, bb, meta] = await Promise.all([a.raw().toBuffer(), b.raw().toBuffer(), a.metadata()]);
const { width, height, channels } = { width: meta.width, height: meta.height, channels: 3 };
const ra = await sharp(aP).removeAlpha().raw().toBuffer();
const rb = await sharp(bP).removeAlpha().raw().toBuffer();
const out = Buffer.alloc(width * height * 3);
const rowHits = new Array(height).fill(0);
for (let i = 0, p = 0; i < ra.length; i += 3, p++) {
  const d = Math.max(Math.abs(ra[i] - rb[i]), Math.abs(ra[i+1] - rb[i+1]), Math.abs(ra[i+2] - rb[i+2]));
  const y = Math.floor(p / width);
  if (d > 8) { rowHits[y]++; out[i] = 255; out[i+1] = 40; out[i+2] = 0; }
  else { const g = Math.round(ra[i] * 0.3); out[i] = g; out[i+1] = g; out[i+2] = g; }
}
await sharp(out, { raw: { width, height, channels: 3 } }).png().toFile(outP);
const bands = [];
for (let y = 0; y < height; y += Math.round(height / 12)) {
  const end = Math.min(height, y + Math.round(height / 12));
  let s = 0; for (let k = y; k < end; k++) s += rowHits[k];
  bands.push(`${y}-${end}: ${(100 * s / ((end - y) * width)).toFixed(1)}%`);
}
console.log(outP, width + "x" + height);
console.log("diff by vertical band:", bands.join(" | "));
