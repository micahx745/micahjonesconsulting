// Pass-123a CLS probe. Usage: node .planning/exec/cls-123.mjs <baseUrl>
// Sums EVERY layout-shift entry (hadRecentInput included, LESSONS #29) while
// loading / and scrolling in 200px instant steps to the bottom of #products
// plus one viewport. Runs 390x844 (DPR 2, mobile, touch) and 1440x900.
import { createRequire } from 'module';

const require = createRequire('C:/tmp/p101tools/package.json');
const puppeteer = require('puppeteer-core');

const baseUrl = process.argv[2];
if (!baseUrl) {
  console.error('usage: node cls-123.mjs <baseUrl>');
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});

async function runViewport(label, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.evaluateOnNewDocument(() => {
    window.__cls = 0;
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__cls += entry.value;
      }).observe({ type: 'layout-shift', buffered: true });
    } catch { /* observer unavailable */ }
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
  const cls = await page.evaluate(() => window.__cls ?? 0);
  console.log(`CLS ${label} = ${cls.toFixed(4)}`);
  await page.close();
  return cls;
}

try {
  const m = await runViewport('390x844', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const d = await runViewport('1440x900', { width: 1440, height: 900, deviceScaleFactor: 1 });
  console.log(`SUMMARY mobile=${m.toFixed(4)} desktop=${d.toFixed(4)}`);
} finally {
  await browser.close();
}
