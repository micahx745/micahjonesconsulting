// Pass-121 MOCK SET captures. For work / study-guardicore / study-rfp:
// full-page and first-fold PNGs at 1440 and 390 (deviceScaleFactor 2), plus a
// 50 percent zoom full-page capture of each study at 1440 (the skim path).
// states.html: one full-page capture at 1440 and 390. Each drawing on
// work.html at 1440 is also cropped to its own PNG. Scratch, not committed.
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

async function open(name, w, h) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  await page.goto(`file:///${DIR}/${name}.html`, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluateHandle("document.fonts.ready");
  await sleep(900);
  return page;
}

for (const name of ["work", "study-guardicore", "study-rfp"]) {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const page = await open(name, w, h);
    await page.screenshot({ path: `${DIR}/${name}-${w}.png`, fullPage: true });
    await page.screenshot({ path: `${DIR}/${name}-${w}-fold.png` });
    console.log(`ok ${name}-${w}.png + ${name}-${w}-fold.png`);
    if (w === 1440) {
      await page.evaluate(() => {
        document.documentElement.style.zoom = "0.5";
      });
      await sleep(400);
      await page.screenshot({ path: `${DIR}/${name}-1440-50pct.png`, fullPage: true });
      console.log(`ok ${name}-1440-50pct.png`);
    }
    await page.close();
  }
}

for (const w of [1440, 390]) {
  const page = await open("states", w, w === 1440 ? 900 : 844);
  await sleep(600); // let the fit() scale script settle
  await page.screenshot({ path: `${DIR}/states-${w}.png`, fullPage: true });
  console.log(`ok states-${w}.png`);
  await page.close();
}

// per-drawing crops from work.html at 1440
const page = await open("work", 1440, 900);
const crops = await page.evaluate(() => {
  const out = [];
  for (const svg of document.querySelectorAll("svg[data-drawing]")) {
    const r = svg.getBoundingClientRect();
    if (r.width < 5) continue;
    out.push({
      slug: svg.getAttribute("data-drawing"),
      x: Math.max(0, r.left - 20),
      y: Math.max(0, r.top - 20),
      w: r.width + 40,
      h: r.height + 40,
    });
  }
  return out;
});
const seen = new Set();
for (const c of crops) {
  if (seen.has(c.slug)) continue; // first (visible) instance only
  seen.add(c.slug);
  const clip = {
    x: Math.round(c.x),
    y: Math.round(c.y),
    width: Math.round(c.w),
    height: Math.round(c.h),
  };
  await page.screenshot({ path: `${DIR}/drawing-${c.slug}-1440.png`, clip });
  console.log(`ok drawing-${c.slug}-1440.png (${JSON.stringify(clip)})`);
}
await page.close();

await browser.close();
console.log("captures done");
