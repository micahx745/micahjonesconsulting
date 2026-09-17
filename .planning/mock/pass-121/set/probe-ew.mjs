// Verify the vision probe's claim that the east-west label collides with the
// right frame's bottom edge or the workload boxes. Measures label bbox vs
// node bboxes in the guardicore-vis drawing on work.html at 1440.
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
await page.setViewport({ width: 1440, height: 900 });
await page.goto(`file:///${DIR}/work.html`, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluateHandle("document.fonts.ready");
await sleep(700);
const out = await page.evaluate(() => {
  const svg = document.querySelector('.doorway__exhibit svg[data-drawing="guardicore-vis"]');
  const r = (el) => el.getBoundingClientRect();
  const ew = svg.querySelector('text[data-label="ew"]');
  const env = svg.querySelector('g[data-node="env-r"]');
  const wl1 = svg.querySelector('g[data-node="wl10"]');
  const wl2 = svg.querySelector('g[data-node="wl11"]');
  const wl3 = svg.querySelector('g[data-node="wl12"]');
  const e = r(ew);
  return {
    ew: [e.top, e.bottom, e.left, e.right],
    envR: (() => { const x = r(env); return [x.top, x.bottom, x.left, x.right]; })(),
    wlRow2: [wl1, wl2, wl3].map((g) => { const x = r(g); return [x.top, x.bottom]; }),
    ewToEnvBottom: +(r(env).bottom - e.bottom).toFixed(1),
    ewToRow2: +(e.top - Math.max(...[wl1, wl2, wl3].map((g) => r(g).bottom))).toFixed(1),
  };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
