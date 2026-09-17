// Diagnostic: list elements whose right edge exceeds the viewport, and print
// the claims svg's label/node boxes so the M1/M6 geometry can be corrected
// from measured numbers. Scratch, not committed.
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
for (const [name, w] of [["work", 390], ["study-guardicore", 390], ["work", 1440]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 844 });
  await page.goto(`file:///${DIR}/${name}.html`, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluateHandle("document.fonts.ready");
  await sleep(700);
  const out = await page.evaluate(() => {
    const bad = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width > 1 && r.right > window.innerWidth + 1) {
        bad.push(
          `${el.tagName.toLowerCase()}.${(el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || "").toString().split(" ")[0]} right=${r.right.toFixed(0)} w=${r.width.toFixed(0)} text="${(el.textContent || "").trim().slice(0, 30)}"`,
        );
      }
    }
    const claims = [];
    for (const svg of document.querySelectorAll("svg[data-drawing='ordani-claims']")) {
      const sr = svg.getBoundingClientRect();
      if (sr.width < 5) continue;
      claims.push(`svg [${sr.left.toFixed(1)},${sr.top.toFixed(1)},${sr.right.toFixed(1)},${sr.bottom.toFixed(1)}] w=${sr.width.toFixed(1)}`);
      for (const t of svg.querySelectorAll("text")) {
        const r = t.getBoundingClientRect();
        claims.push(`  text "${(t.textContent || "").replace(/\s+/g, " ").trim().slice(0, 22)}" [${r.left.toFixed(1)},${r.top.toFixed(1)},${r.right.toFixed(1)},${r.bottom.toFixed(1)}]`);
      }
      for (const g of svg.querySelectorAll("g.node")) {
        const r = g.getBoundingClientRect();
        claims.push(`  node ${g.getAttribute("data-node")} [${r.left.toFixed(1)},${r.top.toFixed(1)},${r.right.toFixed(1)},${r.bottom.toFixed(1)}]`);
      }
    }
    return { bad: bad.slice(0, 25), claims };
  });
  console.log(`\n=== ${name} ${w} scrollW=${await page.evaluate(() => document.documentElement.scrollWidth)}`);
  out.bad.forEach((l) => console.log("OVER " + l));
  out.claims.forEach((l) => console.log("CLM " + l));
  await page.close();
}
await browser.close();
