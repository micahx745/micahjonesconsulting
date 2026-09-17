import { createRequire } from "node:module";
const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");
const DIR = "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/mock/pass-121/set";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-color-profile=srgb"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(`file:///${DIR}/work.html`, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluateHandle("document.fonts.ready");
await sleep(700);
const r = await page.evaluate(() => {
  const svg = document.querySelector('svg[data-drawing="ordani-claims"]');
  const b = svg.getBoundingClientRect();
  return { x: Math.round(b.left - 16), y: Math.round(b.top - 16), width: Math.round(b.width + 32), height: Math.round(b.height + 32) };
});
await page.screenshot({ path: `${DIR}/drawing-ordani-claims-1440-v2.png`, clip: r });
console.log("ok v2 crop", JSON.stringify(r));
await browser.close();
