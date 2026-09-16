// Pass-120 mocks: compose A-versus-B comparison sheets from the mock captures.
// Usage: node .planning/exec/compare120.mjs
// Reads .planning/qa/pass-120/mock/mock-{a,b}-{work,study}/full-{1440,390}.png and writes
// compare-work-1440.png, compare-study-1440.png, compare-work-390.png, compare-study-390.png
// into .planning/qa/pass-120/mock/, A on the left and B on the right, top-aligned, labelled.
import { createRequire } from "node:module";
import { readFileSync, existsSync, writeFileSync } from "node:fs";

const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");
const DIR = "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/qa/pass-120/mock";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

let made = 0;
for (const page of ["work", "study"]) {
  for (const w of ["1440", "390"]) {
    const cols = ["a", "b"].map((d) => {
      const f = `${DIR}/mock-${d}-${page}/full-${w}.png`;
      if (!existsSync(f)) return `<div class="col"><p>Direction ${d.toUpperCase()}: missing ${f}</p></div>`;
      const b64 = readFileSync(f).toString("base64");
      return `<div class="col"><p>Direction ${d.toUpperCase()} · ${page} · ${w}</p><img src="data:image/png;base64,${b64}"></div>`;
    });
    const html = `<!doctype html><html><body style="margin:0;background:#111;color:#eee;font:14px/1.3 monospace">
<div style="display:flex;gap:16px;align-items:flex-start;padding:12px">${cols.join("")}</div>
<style>.col p{margin:0 0 6px}.col img{display:block;border:1px solid #333}</style></body></html>`;
    const p = await browser.newPage();
    await p.setViewport({ width: w === "1440" ? 920 : 440, height: 800, deviceScaleFactor: 1 });
    await p.setContent(html, { waitUntil: "load" });
    writeFileSync(`${DIR}/compare-${page}-${w}.png`, await p.screenshot({ fullPage: true }));
    await p.close();
    made++;
  }
}
await browser.close();
console.log(`compare sheets written: ${made}`);
