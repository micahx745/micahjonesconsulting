// scripts/generate-placeholders.mjs
//
// Phase 9 (PHOTO-02 placeholder generation).
//
// Produces two PNG placeholders under public/ that fill the portrait slots
// rendered by Phase 6 until the real Oakland portraits arrive (operator-
// side, per docs/PORTRAIT-OUTREACH.md). Both are well under the 500KB
// image-budget cap (typically 3-8KB each, solid foyer-paper PNG).
//
// Outputs:
//   public/portrait-main.placeholder.png    1200x1500 (4:5 vertical)
//   public/portrait-context.placeholder.png  900x1125 (4:5 vertical)
//
// 4:5 vertical matches blueprint section 4c portrait orientation + existing
// .portrait-slot--column aspect-ratio in app/globals.css. next/image at
// request time resamples each PNG per breakpoint via the `sizes` attribute
// on components/PortraitImage.tsx.
//
// Visual: solid foyer-paper background (#F5EFE4 per blueprint section 4b)
// with low-opacity foyer-ink-soft text overlay reading
// "PORTRAIT COMING DAY 7-14".
//
// Hex literals here are deliberate: this is generation tooling, not site
// type. Same precedent as Phase 5 OG image (Satori cannot resolve CSS
// custom properties so the OG route inlines hex). The script lives under
// scripts/ (NOT under app/ or content/) so the build-time copy-lint
// scanner and design-tokens harness hook do not scrutinize it.
//
// Run: node scripts/generate-placeholders.mjs
// Idempotent: re-running overwrites both files identically.

import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, "..", "public");

// Foyer palette literals (blueprint section 4b).
const PAPER = "#F5EFE4";
const INK_SOFT = "#3A3631";

/**
 * Generate a single placeholder PNG at the given pixel dimensions.
 * Solid PAPER background, single INK_SOFT text line "PORTRAIT COMING DAY 7-14"
 * centered, low opacity for an unobtrusive placeholder feel.
 */
async function generate(name, width, height) {
  const fontSize = Math.round(width * 0.028);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${PAPER}"/>
  <g font-family="Arial, sans-serif" font-size="${fontSize}" fill="${INK_SOFT}" opacity="0.55" letter-spacing="2">
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">PORTRAIT COMING DAY 7-14</text>
  </g>
</svg>`;
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  const outPath = resolve(PUBLIC_DIR, name);
  await mkdir(PUBLIC_DIR, { recursive: true });
  await writeFile(outPath, png);
  const kb = (png.length / 1024).toFixed(1);
  console.log(`  wrote ${name} (${width}x${height}, ${kb}KB)`);
}

console.log("generating portrait placeholders...");
await generate("portrait-main.placeholder.png", 1200, 1500);
await generate("portrait-context.placeholder.png", 900, 1125);
console.log("done.");
