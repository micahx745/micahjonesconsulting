// Pass-123b CLS attribution (live site, read only). Usage:
//   node .planning/exec/cls-attrib-123.mjs <baseUrl>
// Same load + scripted scroll as .planning/exec/cls-123.mjs (Pass-123a measured
// 0.33 @390 and 0.20 @1440 summing EVERY layout-shift entry), but records every
// entry: value, startTime, window.scrollY at observer-callback time,
// hadRecentInput, and each source's node as a short selector (tag + classes,
// node plus up to 3 ancestors) with previousRect and currentRect. Also computes
// CLS the way Chrome does — session windows over non-input entries (a gap over
// 1s closes the window, the window is capped at 5s), the metric is the largest
// window. Saves .planning/qa/pass-123/cls-attrib-<W>.json per width.
import { createRequire } from 'module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire('C:/tmp/p101tools/package.json');
const puppeteer = require('puppeteer-core');

const baseUrl = process.argv[2] || 'https://www.micahjonesconsulting.com/';
const OUT_DIR = process.argv[3] || '.planning/qa/pass-123';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});

// Chrome's session windows: only non-input entries; a gap > 1s between
// consecutive entries starts a new window; a window never spans more than 5s
// from its first entry. Metric = the largest window's value sum.
function largestSessionWindow(entries) {
  const usable = entries
    .filter((e) => !e.hadRecentInput)
    .sort((a, b) => a.startTime - b.startTime);
  const windows = [];
  let cur = null;
  for (const e of usable) {
    if (cur && e.startTime - cur.last > 1000) cur = null;
    if (cur && e.startTime - cur.start > 5000) cur = null;
    if (!cur) {
      cur = { start: e.startTime, last: e.startTime, value: 0, count: 0 };
      windows.push(cur);
    }
    cur.value += e.value;
    cur.last = e.startTime;
    cur.count++;
  }
  windows.forEach((w) => {
    w.durationMs = +(w.last - w.start).toFixed(1);
    w.value = +w.value.toFixed(5);
  });
  return { windows, cls: windows.length ? Math.max(...windows.map((w) => w.value)) : 0 };
}

async function runViewport(label, W, outName, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.evaluateOnNewDocument(() => {
    window.__shifts = [];
    try {
      new PerformanceObserver((list) => {
        const scrollY = window.scrollY;
        for (const entry of list.getEntries()) {
          window.__shifts.push({
            value: entry.value,
            startTime: entry.startTime,
            hadRecentInput: entry.hadRecentInput,
            scrollYAtCallback: scrollY,
            sources: (entry.sources || []).map((s) => ({
              node: s.node
                ? (() => {
                    const seg = (n) => {
                      if (!n || n.nodeType !== 1) return null;
                      let str = n.tagName.toLowerCase();
                      const cls = (typeof n.className === 'string' ? n.className : '').trim().split(/\s+/)[0];
                      if (cls) str += `.${cls}`;
                      return str;
                    };
                    const segs = [];
                    let n = s.node;
                    for (let i = 0; n && i < 4; i++) {
                      const t = seg(n);
                      if (t) segs.unshift(t);
                      n = n.parentElement;
                    }
                    return segs.join(' > ');
                  })()
                : null,
              previousRect: s.previousRect
                ? { x: +s.previousRect.x.toFixed(1), y: +s.previousRect.y.toFixed(1), w: +s.previousRect.width.toFixed(1), h: +s.previousRect.height.toFixed(1) }
                : null,
              currentRect: s.currentRect
                ? { x: +s.currentRect.x.toFixed(1), y: +s.currentRect.y.toFixed(1), w: +s.currentRect.width.toFixed(1), h: +s.currentRect.height.toFixed(1) }
                : null,
            })),
          });
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch {
      /* observer unavailable */
    }
  });
  await page.goto(baseUrl.replace(/\/$/, '') + '/', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2000));
  const target = await page.evaluate(() => {
    const el = document.querySelector('#products');
    const bottom = el
      ? el.getBoundingClientRect().top + window.scrollY + el.offsetHeight
      : document.body.scrollHeight;
    return bottom + window.innerHeight;
  });
  for (let y = 0; y <= target; y += 200) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await new Promise((r) => setTimeout(r, 120));
  }
  const entries = await page.evaluate(() => window.__shifts ?? []);
  await page.close();

  entries.forEach((e) => {
    e.value = +e.value.toFixed(5);
    e.startTime = +e.startTime.toFixed(1);
  });
  const totalAll = +entries.reduce((s, e) => s + e.value, 0).toFixed(5);
  const { windows, cls } = largestSessionWindow(entries);
  const top = [...entries].sort((a, b) => b.value - a.value).slice(0, 12);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, outName);
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      { width: W, url: baseUrl.replace(/\/$/, '') + '/', entries, totalAll, chromeSessionWindows: windows, largestSessionWindow: cls },
      null,
      2,
    ) + '\n',
  );

  console.log(`\n=== ${label} (${W}px) ===`);
  console.log(`total (every entry, Pass-123a method): ${totalAll}`);
  console.log(`largest session window (Chrome method): ${cls.toFixed(5)} of ${windows.length} window(s)`);
  console.log(`top ${top.length} entries by value:`);
  for (const e of top) {
    const src = e.sources
      .map((s) => `${s.node || '(no node)'} prev=${s.previousRect ? `${s.previousRect.x},${s.previousRect.y} ${s.previousRect.w}x${s.previousRect.h}` : 'null'} cur=${s.currentRect ? `${s.currentRect.x},${s.currentRect.y} ${s.currentRect.w}x${s.currentRect.h}` : 'null'}`)
      .join(' | ');
    console.log(
      `  value=${e.value.toFixed(5)} start=${e.startTime}ms scrollY=${e.scrollYAtCallback} input=${e.hadRecentInput}\n    ${src || '(no sources)'}`,
    );
  }
  console.log(`wrote ${outPath}`);
  return { totalAll, cls };
}

try {
  const m = await runViewport('mobile', 390, 'cls-attrib-390.json', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const d = await runViewport('desktop', 1440, 'cls-attrib-1440.json', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
  });
  console.log(`\nSUMMARY 390: total=${m.totalAll} largest-window=${m.cls.toFixed(5)} | 1440: total=${d.totalAll} largest-window=${d.cls.toFixed(5)}`);
} finally {
  await browser.close();
}
