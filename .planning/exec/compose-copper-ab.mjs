// .planning/exec/compose-copper-ab.mjs — composes the two labelled A/B sheets
// for the Pass-123 copper hex question: copper-ab-390.png / copper-ab-1440.png.
// Row 1 = the three "live" (shipped #bd5a2d/#8a3d24) frames, row 2 = the three
// "docs" (#C8542B/#8E3A1E override, confirmed) frames, same page order
// (home, work, guardicore) as copper-ab.mjs's PAGES list. Every cell is
// labelled with page, width, variant and the hex actually confirmed on that
// capture (read from capture-summary.json, not hand-typed).
// Model: compose-pass123c-sheets.mjs (puppeteer-renders-an-HTML-page-of-
// file:// images technique).
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");

const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const DIR = path.resolve(
  "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/qa/pass-123/copper",
);

function fileUrl(p) {
  return "file:///" + p.replace(/\\/g, "/");
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const summaryPath = path.join(DIR, "capture-summary.json");
const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
if (summary.aborted) {
  console.error(`capture-summary.json records an ABORT (${JSON.stringify(summary.aborted)}) — refusing to compose a sheet from an unconfirmed override.`);
  process.exit(1);
}

const PAGE_ORDER = ["home", "work", "guardicore"];
const HEX_LABEL = {
  live: "shipped #bd5a2d / #8a3d24",
  docs: "override #C8542B / #8E3A1E",
};

function findCombo(page, width, variant) {
  return summary.combos.find((c) => c.page === page && c.width === width && c.variant === variant);
}

function cell(page, width, variant, displayWidth) {
  const combo = findCombo(page, width, variant);
  const imgPath = path.join(DIR, `${page}-${width}-${variant}.png`);
  const exists = fs.existsSync(imgPath);
  const hexLabel = HEX_LABEL[variant];
  const confirm = combo?.confirmRgb || combo?.error || "n/a";
  const label = `${page} · ${width} · ${variant} — ${hexLabel} — computed ${confirm}`;
  const body = exists
    ? `<img src="${fileUrl(imgPath)}" style="width:${displayWidth}px;">`
    : `<div class="missing" style="width:${displayWidth}px;">MISSING: ${esc(path.basename(imgPath))}</div>`;
  return `<div class="col"><div class="label">${esc(label)}</div>${body}</div>`;
}

function row(width, variant, displayWidth) {
  return `<div class="row">${PAGE_ORDER.map((p) => cell(p, width, variant, displayWidth)).join("\n")}</div>`;
}

const CSS = `
  body { margin: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #fff; }
  h1 { font-size: 20px; padding: 14px 14px 4px; margin: 0; }
  .row { display: flex; align-items: flex-start; }
  .col { display: flex; flex-direction: column; align-items: flex-start; padding: 8px; }
  .label { font-size: 11px; font-weight: 700; margin-bottom: 6px; background: #111; color: #fff;
           padding: 4px 7px; border-radius: 3px; white-space: nowrap; }
  img { display: block; border: 2px solid #111; height: auto; }
  .missing { height: 200px; border: 2px dashed #c00; color: #c00; font-weight: 700;
             display: flex; align-items: center; justify-content: center; text-align: center; font-size: 13px; }
`;

async function buildSheet(browser, outName, width, displayWidth, canvasWidth) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>
    <h1>Pass-123 copper hex A/B — width ${width} — row 1 live (shipped) vs row 2 docs (override, confirmed)</h1>
    ${row(width, "live", displayWidth)}
    ${row(width, "docs", displayWidth)}
  </body></html>`;
  const htmlPath = path.join(DIR, `_sheet-${outName}.html`);
  fs.writeFileSync(htmlPath, html);
  const page = await browser.newPage();
  await page.setViewport({ width: canvasWidth, height: canvasWidth, deviceScaleFactor: 1 });
  await page.goto(fileUrl(htmlPath), { waitUntil: "networkidle0" });
  const outPath = path.join(DIR, `${outName}.png`);
  await page.screenshot({ path: outPath, fullPage: true });
  await page.close();
  fs.unlinkSync(htmlPath);
  return outPath;
}

function pngSize(p) {
  const buf = fs.readFileSync(p);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
const outputs = [];
try {
  // Seed viewport is deliberately tiny: Chrome's scrollHeight/scrollWidth can
  // never report SMALLER than the viewport's clientHeight/clientWidth, so a
  // seed larger than the actual content (as a first guess would be) leaves
  // fullPage:true padding the shot with blank space instead of cropping tight.
  // A tiny seed guarantees content always exceeds it, so fullPage always
  // grows to fit exactly.
  outputs.push(await buildSheet(browser, "copper-ab-390", 390, 300, 50));
  outputs.push(await buildSheet(browser, "copper-ab-1440", 1440, 460, 50));
} finally {
  await browser.close();
}

for (const p of outputs) {
  const { width, height } = pngSize(p);
  console.log(`${p} — ${width}x${height}`);
}
