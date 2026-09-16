// Pass-120 design research: compose contact sheets from every captured reference.
// Usage: node .planning/exec/contact120.mjs
// Reads .planning/qa/pass-120/refs/<slug>/top-1440.png and top-390.png, writes
// contact-1440.png (3 across, 480px tiles) and contact-390.png (6 across, 195px tiles) into
// .planning/qa/pass-120/refs/, each tile captioned with its slug. Static page, so fullPage is safe.
import { createRequire } from "node:module";
import { readdirSync, readFileSync, existsSync, writeFileSync } from "node:fs";

const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");
const DIR = "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/qa/pass-120/refs";
const slugs = readdirSync(DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

for (const [tag, cols, tile] of [
  ["1440", 3, 480],
  ["390", 6, 195],
]) {
  const tiles = slugs
    .filter((s) => existsSync(`${DIR}/${s}/top-${tag}.png`))
    .map((s) => {
      const b64 = readFileSync(`${DIR}/${s}/top-${tag}.png`).toString("base64");
      return `<figure><img src="data:image/png;base64,${b64}"><figcaption>${s}</figcaption></figure>`;
    })
    .join("");
  const html = `<!doctype html><html><body style="margin:0;background:#111;font:12px/1.2 monospace;color:#eee">
<div style="display:grid;grid-template-columns:repeat(${cols},${tile}px);gap:8px;padding:8px">${tiles}</div>
<style>figure{margin:0}img{width:${tile}px;display:block;border:1px solid #333}figcaption{padding:3px 0}</style></body></html>`;
  const page = await browser.newPage();
  await page.setViewport({ width: cols * (tile + 8) + 8, height: 800, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  writeFileSync(`${DIR}/contact-${tag}.png`, await page.screenshot({ fullPage: true }));
  await page.close();
  console.log(`contact-${tag}.png: ${slugs.length} slugs`);
}
await browser.close();
