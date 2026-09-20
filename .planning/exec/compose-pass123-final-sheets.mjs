// .planning/exec/compose-pass123-final-sheets.mjs — Pass-123 capture-leg FINAL sheets.
// Model: .planning/exec/compose-pass123-sheets.mjs section 1-2 (before/after band sheet),
// adapted to compare study-before against study-final (the post-cuts, post-commit-29605e0
// capture) instead of study-after. Same HTML-page-of-labelled-<img>-cells approach,
// screenshotted full-page with Puppeteer -- no sharp compositing math needed.
//
// Usage: node .planning/exec/compose-pass123-final-sheets.mjs
// Reads PNGs from .planning/qa/pass-123/study-before and .planning/qa/pass-123/study-final
// and writes study-final-390.png + study-final-1440.png into .planning/qa/pass-123/sheets/.
// Every cell is labelled with slug, width and BEFORE/FINAL; a missing source file renders as
// a red "MISSING <path>" cell instead of breaking the sheet, and is also printed to stderr.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const REPO = fileURLToPath(new URL("../../", import.meta.url));
const sharp = createRequire(path.join(REPO, "package.json"))("sharp");
const BEFORE_DIR = path.join(REPO, ".planning/qa/pass-123/study-before");
const FINAL_DIR = path.join(REPO, ".planning/qa/pass-123/study-final");
const OUT_DIR = path.join(REPO, ".planning/qa/pass-123/sheets");
fs.mkdirSync(OUT_DIR, { recursive: true });

const SLUGS = ["guardicore", "rfp-engine", "ordani", "content-engine", "birth-worker"];

const missing = [];
function fileUrl(p) {
  return "file:///" + p.replace(/\\/g, "/");
}
function cellHtml(label, absPath) {
  if (!fs.existsSync(absPath)) {
    missing.push(absPath);
    return `<div class="col"><div class="label">${esc(label)}</div><div class="missing">MISSING<br>${esc(path.basename(absPath))}</div></div>`;
  }
  return `<div class="col"><div class="label">${esc(label)}</div><img src="${fileUrl(absPath)}"></div>`;
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const STYLE = `
  body { margin: 0; padding: 16px; font-family: Arial, sans-serif; background: #fff; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  h2 { font-size: 15px; margin: 18px 0 6px; color: #333; }
  .row { display: flex; align-items: flex-start; margin-bottom: 10px; }
  .col { display: flex; flex-direction: column; align-items: center; padding: 6px; }
  .label { font-size: 11px; font-weight: 700; margin-bottom: 4px; background: #111; color: #fff; padding: 3px 8px; border-radius: 3px; white-space: nowrap; }
  .missing { width: 160px; height: 120px; display: flex; align-items: center; justify-content: center; text-align: center; background: #fee; border: 2px dashed #c00; color: #900; font-size: 11px; font-weight: 700; }
  img { display: block; border: 1px solid #111; }
`;

async function renderSheet(browser, name, bodyHtml, viewportWidth) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${STYLE}</style></head><body>${bodyHtml}</body></html>`;
  const htmlPath = path.join(OUT_DIR, `_tmp-${name}.html`);
  fs.writeFileSync(htmlPath, html);
  const page = await browser.newPage();
  await page.setViewport({ width: viewportWidth, height: 800, deviceScaleFactor: 1 });
  await page.goto(fileUrl(htmlPath), { waitUntil: "networkidle0" });
  const outFile = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: outFile, fullPage: true });
  await page.close();
  fs.unlinkSync(htmlPath);
  const meta = await sharp(outFile).metadata();
  console.log(`wrote ${outFile} (${meta.width}x${meta.height}px)`);
  return { path: outFile, width: meta.width, height: meta.height };
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const results = [];
try {
  for (const W of ["390", "1440"]) {
    const rowBefore = SLUGS.map((slug) => cellHtml(`${slug} ${W} BEFORE band`, path.join(BEFORE_DIR, `${slug}-${W}-band.png`))).join("");
    const rowFinal = SLUGS.map((slug) => cellHtml(`${slug} ${W} FINAL band`, path.join(FINAL_DIR, `${slug}-${W}-band.png`))).join("");
    const body = `
      <h1>Pass-123 capture leg -- study band BEFORE / FINAL at ${W}</h1>
      <h2>Row 1: BEFORE (pre-Pass-123)</h2><div class="row">${rowBefore}</div>
      <h2>Row 2: FINAL (post-29605e0)</h2><div class="row">${rowFinal}</div>`;
    results.push(await renderSheet(browser, `study-final-${W}`, body, 2100));
  }
} finally {
  await browser.close();
}

if (missing.length) {
  console.error(`\n${missing.length} MISSING source file(s) rendered as placeholder cells:`);
  for (const m of missing) console.error(`  ${m}`);
}
console.log(`\nsheets written: ${results.length}`);
for (const r of results) console.log(`  ${r.path} : ${r.width}x${r.height}px`);
if (missing.length) process.exitCode = 1;
