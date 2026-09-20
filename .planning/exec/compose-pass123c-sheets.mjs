// .planning/exec/compose-pass123c-sheets.mjs — composes the four labelled
// contact sheets Pass-123c's frame verify asks for:
//   sheet-390.png / sheet-1440.png            -- BEFORE (row1) vs AFTER
//     (row2) beats 0-3, from scoreboard-frames-123c.mjs's output.
//   sheet-static-390.png / sheet-static-1440.png -- BEFORE vs AFTER
//     reduced-motion and no-JS frames.
// Labels are read from frames-before-summary.json / frames-after-summary.json
// (written by the frames script) so they reflect what was actually measured,
// not hand-typed guesses. Model: .planning/exec/compose-pass122-sheet.mjs
// (same puppeteer-render-an-HTML-page-of-file:// images technique).
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");

const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const DIR = path.resolve(
  "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/qa/pass-123/scoreboard",
);

function fileUrl(p) {
  return "file:///" + p.replace(/\\/g, "/");
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const before = JSON.parse(fs.readFileSync(path.join(DIR, "frames-before-summary.json"), "utf8"));
const after = JSON.parse(fs.readFileSync(path.join(DIR, "frames-after-summary.json"), "utf8"));

function frameInfo(summary, width, name) {
  const w = summary.widths?.[width];
  const f = w?.frames?.find((x) => x.name === name);
  if (!f) return { scrollY: "n/a", current: "n/a", valueText: "n/a", md5: "n/a" };
  return { scrollY: f.scrollY, current: f.current, valueText: f.valueText, md5: f.md5?.slice(0, 8) };
}

function cell(tag, width, name) {
  const summary = tag === "before" ? before : after;
  const info = frameInfo(summary, width, name);
  const imgPath = path.join(DIR, `${tag}-${width}-${name}.png`);
  const exists = fs.existsSync(imgPath);
  const label = `${tag} ${width} ${name} — scrollY ${info.scrollY} · current ${info.current} · ${esc(
    info.valueText ?? "null",
  )} · md5 ${info.md5}`;
  const body = exists
    ? `<img src="${fileUrl(imgPath)}">`
    : `<div class="missing">MISSING: ${esc(path.basename(imgPath))}</div>`;
  return `<div class="col"><div class="label">${label}</div>${body}</div>`;
}

function row(tag, width, names) {
  return `<div class="row">${names.map((n) => cell(tag, width, n)).join("\n")}</div>`;
}

const CSS = `
  body { margin: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #fff; }
  h1 { font-size: 20px; padding: 14px 14px 4px; margin: 0; }
  .row { display: flex; align-items: flex-start; }
  .col { display: flex; flex-direction: column; align-items: flex-start; padding: 8px; }
  .label { font-size: 11px; font-weight: 700; margin-bottom: 6px; background: #111; color: #fff;
           padding: 4px 7px; border-radius: 3px; white-space: nowrap; }
  img { display: block; border: 2px solid #111; width: 460px; height: auto; }
  .missing { width: 460px; height: 200px; border: 2px dashed #c00; color: #c00; font-weight: 700;
             display: flex; align-items: center; justify-content: center; text-align: center; font-size: 13px; }
`;

async function buildSheet(browser, outName, width, names, title) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>
    <h1>${esc(title)}</h1>
    ${row("before", width, names)}
    ${row("after", width, names)}
  </body></html>`;
  const htmlPath = path.join(DIR, `_sheet-${outName}.html`);
  fs.writeFileSync(htmlPath, html);
  const page = await browser.newPage();
  await page.setViewport({ width: 2000, height: 1200, deviceScaleFactor: 1 });
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
  outputs.push(
    await buildSheet(
      browser,
      "sheet-390",
      "390",
      ["b0", "b1", "b2", "b3"],
      "Pass-123c scoreboard beats — 390 — BEFORE (row1) vs AFTER (row2)",
    ),
  );
  outputs.push(
    await buildSheet(
      browser,
      "sheet-1440",
      "1440",
      ["b0", "b1", "b2", "b3"],
      "Pass-123c scoreboard beats — 1440 — BEFORE (row1) vs AFTER (row2)",
    ),
  );
  outputs.push(
    await buildSheet(
      browser,
      "sheet-static-390",
      "390",
      ["reduced", "nojs"],
      "Pass-123c scoreboard static paths — 390 — BEFORE (row1) vs AFTER (row2)",
    ),
  );
  outputs.push(
    await buildSheet(
      browser,
      "sheet-static-1440",
      "1440",
      ["reduced", "nojs"],
      "Pass-123c scoreboard static paths — 1440 — BEFORE (row1) vs AFTER (row2)",
    ),
  );
} finally {
  await browser.close();
}

for (const p of outputs) {
  const { width, height } = pngSize(p);
  console.log(`${p} — ${width}x${height}`);
}
