// CLS while scrolling for any page (largest session window, Chrome's rule), with a liveness check.
import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");
const url = process.argv[2]; const mustSel = process.argv[3];
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const out = {};
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const page = await browser.newPage(); await page.setViewport({ width: w, height: h });
  await page.evaluateOnNewDocument(() => { window.__s = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__s.push({ v: e.value, t: e.startTime, i: e.hadRecentInput }); }).observe({ type: "layout-shift", buffered: true }); });
  const r = await page.goto(url, { waitUntil: "load", timeout: 60000 }); await new Promise((r) => setTimeout(r, 1500));
  const live = await page.evaluate((s) => !!document.querySelector(s), mustSel);
  if (!r || r.status() >= 400 || !live) { console.error(`LIVENESS FAIL ${w}: status=${r && r.status()} ${mustSel}=${live}`); process.exit(1); }
  const H = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= H; y += 200) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await new Promise((r) => setTimeout(r, 120)); }
  const es = (await page.evaluate(() => window.__s)).filter((e) => !e.i).sort((a, b) => a.t - b.t);
  let best = 0, cur = null; for (const e of es) { if (!cur || e.t - cur.last > 1000 || e.t - cur.start > 5000) cur = { start: e.t, last: e.t, v: 0 }; cur.v += e.v; cur.last = e.t; best = Math.max(best, cur.v); }
  out[w] = { entries: es.length, largestWindow: +best.toFixed(5) }; await page.close();
}
await browser.close(); console.log(JSON.stringify(out));
