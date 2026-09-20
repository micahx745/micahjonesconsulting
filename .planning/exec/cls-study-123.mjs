// Pass-123 study-band CLS attribution (copied from .planning/exec/cls-attrib-123.mjs
// per the Stage-0 brief, step 0.6). Usage:
//   node .planning/exec/cls-study-123.mjs <baseUrl> <path> <outDir>
// Loads <baseUrl><path> (a study page, e.g. /work/guardicore) and scrolls in 200px
// instant steps to the bottom of .cs-band plus one viewport (adapted from the
// original's #products target on the home page). Records every layout-shift entry:
// value, startTime, window.scrollY at observer-callback time, hadRecentInput, and
// each source's node as a short selector (tag + classes, node plus up to 3
// ancestors) with previousRect and currentRect. Computes CLS the way Chrome does —
// session windows over non-input entries (a gap over 1s closes the window, the
// window is capped at 5s), the metric is the largest window.
//
// LIVENESS: the original script's scroll target silently fell back to
// document.body.scrollHeight when its anchor selector (#products) was missing,
// which would report a plausible-looking but wrong number if the selector ever
// stopped matching. This copy asserts .cs-band exists before computing anything
// and throws loudly instead of falling back, adapted to these study pages (the
// element to assert is .cs-band, not the home page's .cw-exits).
//
// Saves <outDir>/<slug>-<W>.json per width, where <slug> is the last path segment.
import { createRequire } from 'module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire('C:/tmp/p101tools/package.json');
const puppeteer = require('puppeteer-core');

const baseUrl = process.argv[2];
const pagePath = process.argv[3];
const OUT_DIR = process.argv[4];
if (!baseUrl || !pagePath || !OUT_DIR) {
  console.error('usage: node cls-study-123.mjs <baseUrl> <path> <outDir>');
  process.exit(1);
}
const slug = pagePath.split('/').filter(Boolean).pop() || 'page';
const url = baseUrl.replace(/\/$/, '') + pagePath;

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
  await page.goto(url, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2000));

  // LIVENESS: fail loudly if .cs-band is not on the page, rather than silently
  // falling back to document.body.scrollHeight.
  const hasBand = await page.evaluate(() => !!document.querySelector('.cs-band'));
  if (!hasBand) {
    await page.close();
    throw new Error(`LIVENESS: .cs-band not found on ${url} (${label} ${W}px)`);
  }

  const target = await page.evaluate(() => {
    const el = document.querySelector('.cs-band');
    const bottom = el.getBoundingClientRect().top + window.scrollY + el.offsetHeight;
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
      { width: W, url, entries, totalAll, chromeSessionWindows: windows, largestSessionWindow: cls },
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
  const m = await runViewport('mobile', 390, `${slug}-390.json`, {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const d = await runViewport('desktop', 1440, `${slug}-1440.json`, {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
  });
  console.log(`\nSUMMARY ${slug} 390: total=${m.totalAll} largest-window=${m.cls.toFixed(5)} | 1440: total=${d.totalAll} largest-window=${d.cls.toFixed(5)}`);
} finally {
  await browser.close();
}
