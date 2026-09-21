// region-sheet.mjs (Pass-126): VIEWPORT frames of one page region while scrolling, composed into one sheet.
// Viewport frames, not a full-page shot: the Color Worlds switcher recolours per section on scroll, so a full-page
// screenshot freezes every section in the first one's world (briefs README, Pass-125).
// Usage: node .planning/qa/pass-126/region-sheet.mjs <base> <path> <startSel> <endSel> <name> [width...]
//   Frames run from 100px above <startSel> until <endSel>'s top reaches mid-viewport, every 0.8 viewport, 700ms
//   settle each. Writes .planning/qa/pass-126/frames/<name>-<w>-<nn>.png and .planning/qa/pass-126/sheets/<name>-<w>.png.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");
const [base, route, startSel, endSel, name, ...ws] = process.argv.slice(2);
const widths = (ws.length ? ws : ["390", "1440"]).map(Number);
const OUT = path.resolve(".planning/qa/pass-126");
fs.mkdirSync(path.join(OUT, "frames"), { recursive: true });
fs.mkdirSync(path.join(OUT, "sheets"), { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
try {
  for (const w of widths) {
    const h = w <= 400 ? 844 : 900;
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    const resp = await page.goto(base.replace(/\/$/, "") + route, { waitUntil: "load", timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    // One pass over the whole page first so reveals and the world switcher have run, as for a reader.
    const H = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H; y += Math.round(h * 0.75)) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await wait(120); }
    const span = await page.evaluate((s, e, vh) => {
      const a = document.querySelector(s), b = document.querySelector(e);
      if (!a || !b) return null;
      const top = a.getBoundingClientRect().top + scrollY - 100;
      const end = b.getBoundingClientRect().top + scrollY - vh / 2;
      return { top: Math.max(0, Math.round(top)), end: Math.round(Math.max(end, top)) };
    }, startSel, endSel, h);
    if (!resp || resp.status() >= 400 || !span) throw new Error(`LIVENESS FAIL ${w}: status=${resp && resp.status()} selectors found=${!!span}`);
    const frames = [];
    for (let y = span.top, i = 1; ; y += Math.round(h * 0.8), i++) {
      const yy = Math.min(y, span.end);
      await page.evaluate((v) => window.scrollTo(0, v), yy);
      await wait(700);
      const file = path.join(OUT, "frames", `${name}-${w}-${String(i).padStart(2, "0")}.png`);
      await page.screenshot({ path: file });
      frames.push({ file, y: yy });
      if (yy >= span.end) break;
    }
    await page.close();
    const per = w <= 400 ? 4 : 2, scale = w <= 400 ? 1 : 0.5;
    const cells = frames.map((f) => `<figure><figcaption>${name} ${w}px | scrollY ${f.y}</figcaption><img src="${pathToFileURL(f.file).href}" style="width:${w * scale}px"></figure>`).join("");
    const html = `<!doctype html><meta charset="utf-8"><style>body{margin:16px;background:#bbb;font:600 13px system-ui}h1{font-size:18px}
      .g{display:grid;grid-template-columns:repeat(${per},max-content);gap:14px}figure{margin:0}figcaption{background:#222;color:#fff;padding:4px 8px}
      img{display:block;border:1px solid #222}</style><h1>${name} at ${w}px (viewport frames while scrolling)</h1><div class="g">${cells}</div>`;
    const tmp = path.join(OUT, "sheets", `_tmp-${name}-${w}.html`);
    fs.writeFileSync(tmp, html);
    const sp = await browser.newPage();
    await sp.setViewport({ width: per * (w * scale + 16) + 40, height: 800 });
    await sp.goto(pathToFileURL(tmp).href, { waitUntil: "load" });
    const sheet = path.join(OUT, "sheets", `${name}-${w}.png`);
    await sp.screenshot({ path: sheet, fullPage: true });
    await sp.close();
    fs.unlinkSync(tmp);
    console.log(`${name} ${w}: ${frames.length} frames -> ${path.relative(process.cwd(), sheet)}`);
  }
} finally {
  await browser.close();
}
