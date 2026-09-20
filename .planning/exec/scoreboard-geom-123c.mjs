// Pass-123c V1. Usage: node .planning/exec/scoreboard-geom-123c.mjs <base> <out.json>
// Loads `/` at 390x844 (DPR 2, isMobile, hasTouch) and 1440x900, normal motion.
// For beat b in 0..3: instant scroll to Y0 + (b + 0.5) * 0.5 * innerHeight (Y0
// as in scrollbar-fit.mjs: exits top + scrollY - navH, navH from --cw-nav-h),
// wait 1500ms, then record: current index, .cw-exits__stage top, nav height,
// per deal the TEXT rects (Range.getClientRects union) of val / co / outcome,
// and each divider's y. Divider y: flow mode (no .is-actors) =
// li.getBoundingClientRect().top for deals 2-4; actor mode = the list's top +
// the row's computed --cw-line-y. Outcome rect captured only when visible:
// computed opacity > 0.5 AND not an sr-only 1px box (flow-mode sr-only
// outcomes compute opacity 1 but clip to 1px; they are not visible by
// construction, and the actor mode's opacity:0 pairs with them). Also records
// scrollWidth at every stop and console errors across the run (V9).
import { createRequire } from 'module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire('C:/tmp/p101tools/package.json');
const puppeteer = require('puppeteer-core');

const baseUrl = process.argv[2];
const outPath = process.argv[3];
if (!baseUrl || !outPath) {
  console.error('usage: node scoreboard-geom-123c.mjs <base> <out.json>');
  process.exit(1);
}

const VIEWPORTS = [
  { name: '390', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: '1440', width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
];

const PAGE_HELPERS = `
  const textRect = (el) => {
    if (!el) return null;
    const range = document.createRange();
    range.selectNodeContents(el);
    const rects = range.getClientRects();
    if (!rects.length) return null;
    let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
    for (const rc of rects) {
      l = Math.min(l, rc.left); t = Math.min(t, rc.top);
      r = Math.max(r, rc.right); b = Math.max(b, rc.bottom);
    }
    return { left: +l.toFixed(2), top: +t.toFixed(2), right: +r.toFixed(2),
             bottom: +b.toFixed(2), width: +(r - l).toFixed(2), height: +(b - t).toFixed(2) };
  };
`;

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});

const result = { base: baseUrl, when: new Date().toISOString() };
try {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    page.on('pageerror', (e) => consoleErrors.push(String(e)));
    await page.setViewport({
      width: vp.width, height: vp.height,
      deviceScaleFactor: vp.deviceScaleFactor,
      isMobile: vp.isMobile, hasTouch: vp.hasTouch,
    });
    await page.goto(baseUrl.replace(/\/$/, '') + '/', { waitUntil: 'networkidle2', timeout: 90000 });
    // Go-live (and on the AFTER build, actor-mode init) runs inside
    // document.fonts.ready; wait for is-live, then settle.
    await page.waitForFunction(
      () => !!document.querySelector('.cw-exits.is-live'),
      { timeout: 15000 },
    );
    await new Promise((r) => setTimeout(r, 1200));

    const info = await page.evaluate(() => {
      const exits = document.querySelector('.cw-exits');
      let navH = 72;
      const raw = getComputedStyle(exits).getPropertyValue('--cw-nav-h');
      const parsed = parseFloat(raw);
      if (!Number.isNaN(parsed)) navH = parsed;
      const Y0 = +(exits.getBoundingClientRect().top + window.scrollY - navH).toFixed(2);
      return {
        navH,
        Y0,
        actorsMode: exits.classList.contains('is-actors'),
        navOffsetH: document.querySelector('.cw-nav')?.offsetHeight ?? null,
      };
    });

    const beats = [];
    for (let b = 0; b < 4; b++) {
      const beat = await page.evaluate(`
        (async (b, Y0) => {
${PAGE_HELPERS}
          window.scrollTo(0, Y0 + (b + 0.5) * 0.5 * window.innerHeight);
          await new Promise((r) => setTimeout(r, 1500));
          const section = document.querySelector('.cw-exits');
          const stage = document.querySelector('.cw-exits__stage');
          const row = document.querySelector('.cw-exits__row');
          const deals = [...document.querySelectorAll('.cw-exits__deal')];
          let cur = -1;
          deals.forEach((d, i) => { if (d.classList.contains('is-current')) cur = i; });
          const dealData = deals.map((d) => {
            const val = d.querySelector('.cw-exits__val');
            const co = d.querySelector('.cw-exits__co');
            const out = d.querySelector('.cw-exits__outcome');
            const outVisible = out
              ? parseFloat(getComputedStyle(out).opacity) > 0.5 &&
                out.getBoundingClientRect().width > 2
              : false;
            return {
              val: textRect(val),
              co: textRect(co),
              outcome: outVisible ? textRect(out) : null,
              outcomeVisible: outVisible,
            };
          });
          const actors = section.classList.contains('is-actors');
          const rowTop = row.getBoundingClientRect().top;
          // Pass-123c fix round 1: in actor mode the hairline is the deal's
          // ::before, whose containing block is the deal itself (it is
          // position: relative on purpose), so the rendered y is the deal's top
          // plus --cw-line-y. Round 0 measured it from the ROW's top and
          // reported a 177-562px error that the render never had. Asserted, not
          // assumed: a static deal means the model no longer matches the paint.
          const dividers = [1, 2, 3].map((i) => {
            if (!actors) return +deals[i].getBoundingClientRect().top.toFixed(2);
            const pos = getComputedStyle(deals[i]).position;
            if (pos === 'static') return 'DEAL_STATIC_ANCHOR_UNKNOWN';
            const v = parseFloat(getComputedStyle(deals[i]).getPropertyValue('--cw-line-y'));
            const anchor = deals[i].getBoundingClientRect().top;
            return +(anchor + (Number.isNaN(v) ? 0 : v)).toFixed(2);
          });
          return {
            b,
            scrollY: +window.scrollY.toFixed(2),
            current: cur,
            stageTop: stage ? +stage.getBoundingClientRect().top.toFixed(2) : null,
            navH: parseFloat(getComputedStyle(section).getPropertyValue('--cw-nav-h')) || null,
            scrollWidth: document.documentElement.scrollWidth,
            actorsMode: actors,
            deals: dealData,
            dividers,
          };
        })(${b}, ${info.Y0})`);
      beats.push(beat);
    }

    result[vp.name] = { viewport: vp, info, beats, consoleErrors };
    const curList = beats.map((x) => x.current).join(',');
    console.log(`${vp.name}: Y0=${info.Y0} navH=${info.navH} actors=${info.actorsMode} cur=[${curList}] scrollW=[${beats.map((x) => x.scrollWidth).join(',')}] consoleErrors=${consoleErrors.length}`);
    await page.close();
  }
} finally {
  await browser.close();
}

fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(result, null, 2) + '\n');
console.log(`wrote ${outPath}`);
