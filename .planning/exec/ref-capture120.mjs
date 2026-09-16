// Pass-120 design research: capture ONE reference page the same way every time.
// Usage: node .planning/exec/ref-capture120.mjs <url> <slug>
// Writes .planning/qa/pass-120/refs/<slug>/: top-1440.png, full-1440.png (stitched, 0.3 scale,
// at most 15 frames), top-390.png, full-390.png (0.5 scale, at most 12 frames), info.json
// (computed type, ground colour, media counts, video autoplay/loop). Frames, not fullPage:
// fullPage resizes the viewport and inflates vh layouts. Prints OK or FAIL; exit 1 on FAIL.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";

const [, , url, slug] = process.argv;
if (!url || !slug) {
  console.log("usage: node ref-capture120.mjs <url> <slug>");
  process.exit(2);
}
const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");
const OUT = `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/qa/pass-120/refs/${slug}`;
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-color-profile=srgb", "--autoplay-policy=no-user-gesture-required"],
});

async function stitch(frames, w, h, total, scale) {
  const p = await browser.newPage();
  const b64 = await p.evaluate(
    async ({ frames, w, h, total, scale }) => {
      const c = document.createElement("canvas");
      c.width = Math.round(w * scale);
      c.height = Math.round(total * scale);
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#888";
      ctx.fillRect(0, 0, c.width, c.height);
      for (const f of frames) {
        const img = new Image();
        img.src = "data:image/png;base64," + f.b64;
        await img.decode();
        ctx.drawImage(img, 0, Math.round(f.y * scale), Math.round(w * scale), Math.round(h * scale));
      }
      return c.toDataURL("image/png").split(",")[1];
    },
    { frames, w, h, total, scale },
  );
  await p.close();
  return Buffer.from(b64, "base64");
}

async function shoot(w, h, scale, maxFrames, tag) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(3000);
  writeFileSync(`${OUT}/top-${tag}.png`, await page.screenshot());
  let total = await page.evaluate(() => document.documentElement.scrollHeight);
  const cap = Math.min(total, h * maxFrames);
  for (let y = 0; y < cap; y += Math.round(h * 0.7)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await sleep(250);
  }
  total = await page.evaluate(() => document.documentElement.scrollHeight);
  const stop = Math.min(total, h * maxFrames);
  const frames = [];
  for (let y = 0; y < stop; y += h) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await sleep(600);
    const actual = await page.evaluate(() => window.scrollY);
    frames.push({ y: actual, b64: await page.screenshot({ encoding: "base64" }) });
  }
  writeFileSync(`${OUT}/full-${tag}.png`, await stitch(frames, w, h, Math.min(total, stop), scale));
  let info = null;
  if (tag === "1440") {
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);
    info = await page.evaluate(() => {
      const cs = (el) => getComputedStyle(el);
      const pick = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const s = cs(el);
        return { text: el.innerText.replace(/\s+/g, " ").slice(0, 80), font: s.fontFamily.split(",")[0], size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight, tt: s.textTransform };
      };
      let biggest = null;
      for (const el of document.querySelectorAll("h1,h2,h3,p,span,a,div")) {
        if (!el.innerText || el.children.length > 2) continue;
        const r = el.getBoundingClientRect();
        if (r.top > window.innerHeight * 1.2 || r.width === 0) continue;
        const sz = parseFloat(cs(el).fontSize);
        if (!biggest || sz > biggest.sz) biggest = { sz, text: el.innerText.replace(/\s+/g, " ").slice(0, 60), font: cs(el).fontFamily.split(",")[0] };
      }
      const videos = [...document.querySelectorAll("video")].map((v) => ({ autoplay: v.autoplay, loop: v.loop, muted: v.muted, poster: !!v.poster }));
      return {
        title: document.title,
        h1: pick("h1"), h2: pick("h2"), h3: pick("h3"), p: pick("main p, article p, p"),
        biggest_above_fold: biggest,
        ground: cs(document.body).backgroundColor,
        ink: cs(document.body).color,
        images: document.querySelectorAll("img").length,
        videos,
        headings: [...document.querySelectorAll("h1,h2,h3")].slice(0, 25).map((e) => `${e.tagName}: ${e.innerText.replace(/\s+/g, " ").slice(0, 70)}`),
        scrollHeight: document.documentElement.scrollHeight,
      };
    });
  }
  await page.close();
  return { total, frames: frames.length, info };
}

let rc = 0;
const report = { url, slug };
try {
  const d = await shoot(1440, 900, 0.3, 15, "1440");
  report.desktop = { height: d.total, frames: d.frames };
  report.info = d.info;
} catch (e) {
  rc = 1;
  report.desktop_error = e.message;
}
try {
  const m = await shoot(390, 844, 0.5, 12, "390");
  report.mobile = { height: m.total, frames: m.frames };
} catch (e) {
  rc = 1;
  report.mobile_error = e.message;
}
writeFileSync(`${OUT}/info.json`, JSON.stringify(report, null, 2));
await browser.close();
console.log(rc === 0 ? `OK ${slug}` : `FAIL ${slug}: ${report.desktop_error || ""} ${report.mobile_error || ""}`);
process.exit(rc);
