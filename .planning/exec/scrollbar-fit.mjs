// Pass-123a measuring script. Usage:
//   node .planning/exec/scrollbar-fit.mjs <baseUrl> <out.json> [--classic]
// --classic: launch Chrome with ignoreDefaultArgs ["--hide-scrollbars"] so the
// scrollbar is a real classic one that takes layout width (Windows desktop case).
import { createRequire } from 'module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire('C:/tmp/p101tools/package.json');
const puppeteer = require('puppeteer-core');

const baseUrl = process.argv[2];
const outPath = process.argv[3];
const classic = process.argv.includes('--classic');
if (!baseUrl || !outPath) {
  console.error('usage: node scrollbar-fit.mjs <baseUrl> <out.json> [--classic]');
  process.exit(1);
}

const WIDTHS = [390, 600, 680, 760, 761, 800, 899, 900, 1024, 1300, 1440];

// In-page helper (defined INSIDE each IIFE: top-level const from one
// page.evaluate persists in the page's global lexical environment and would
// collide on the next injection).
const MAX_RIGHT = `
    const maxRight = (el) => {
      if (!el) return null;
      let m = null;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const rect of range.getClientRects()) {
          if (m === null || rect.right > m) m = rect.right;
        }
      }
      return m;
    };
`;

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  ...(classic ? { ignoreDefaultArgs: ['--hide-scrollbars'] } : {}),
});

const results = [];
try {
  for (const W of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({ width: W, height: 900, deviceScaleFactor: 1 });
    await page.goto(baseUrl.replace(/\/$/, '') + '/', { waitUntil: 'networkidle2' });

    const sb = await page.evaluate(
      () => window.innerWidth - document.documentElement.clientWidth,
    );

    // $20M+ receipts figure: scroll to viewport centre, settle, measure.
    const rec = await page.evaluate(`
      (async () => {
${MAX_RIGHT}
        const el = document.querySelector('.cw-rec');
        if (!el) return { recFs: null, recColR: null, recInkR: null, recOver: null };
        const y = el.getBoundingClientRect().top + window.scrollY
          - (window.innerHeight - el.offsetHeight) / 2;
        window.scrollTo(0, Math.max(0, y));
        await new Promise((r) => setTimeout(r, 600));
        const num = el.querySelector('.cw-rec__num');
        const recFs = num ? parseFloat(getComputedStyle(num).fontSize) : null;
        const colR = el.getBoundingClientRect().right;
        const fig = el.querySelector('.cw-rec__box > .cw-rec__fig');
        const inkR = fig ? maxRight(fig) : null;
        return {
          recFs,
          recColR: +colR.toFixed(2),
          recInkR: inkR === null ? null : +inkR.toFixed(2),
          recOver: inkR === null ? null : +(inkR - colR).toFixed(2),
        };
      })()`,
    );

    // Scoreboard.
    const exitsInfo = await page.evaluate(() => {
      const exits = document.querySelector('.cw-exits');
      const sbLive = exits ? exits.classList.contains('is-live') : false;
      let navH = 72;
      let Y0 = null;
      if (exits && sbLive) {
        const raw = getComputedStyle(exits).getPropertyValue('--cw-nav-h');
        const parsed = parseFloat(raw);
        if (!Number.isNaN(parsed)) navH = parsed;
        Y0 = +(exits.getBoundingClientRect().top + window.scrollY - navH).toFixed(2);
      }
      return { sbLive, navH, Y0 };
    });

    const beats = [];
    if (exitsInfo.sbLive) {
      for (let b = 0; b < 4; b++) {
        const beat = await page.evaluate(`
          (async (b, Y0) => {
${MAX_RIGHT}
            window.scrollTo(0, Y0 + (b + 0.5) * 0.5 * window.innerHeight);
            await new Promise((r) => setTimeout(r, 1200));
            const exits = document.querySelector('.cw-exits');
            const exitsR = exits.getBoundingClientRect().right;
            const deals = [...document.querySelectorAll('.cw-exits__deal')];
            let cur = -1;
            deals.forEach((d, i) => { if (d.classList.contains('is-current')) cur = i; });
            const curVal = document.querySelector('.cw-exits__deal.is-current .cw-exits__val');
            const curFs = curVal ? parseFloat(getComputedStyle(curVal).fontSize) : null;
            const curInk = maxRight(curVal);
            let all = null;
            for (const v of document.querySelectorAll('.cw-exits__val')) {
              const m = maxRight(v);
              if (m !== null && (all === null || m > all)) all = m;
            }
            const stage = document.querySelector('.cw-exits__stage');
            return {
              b,
              cur,
              curFs,
              curInkR: curInk === null ? null : +curInk.toFixed(2),
              curOver: curInk === null ? null : +(curInk - exitsR).toFixed(2),
              allOver: all === null ? null : +(all - exitsR).toFixed(2),
              stageTop: stage ? +stage.getBoundingClientRect().top.toFixed(2) : null,
              navH: null,
            };
          })(${b}, ${exitsInfo.Y0})`);
        beat.navH = exitsInfo.navH;
        beats.push(beat);
      }
    }

    results.push({ W, classic, sb, ...rec, sbLive: exitsInfo.sbLive, navH: exitsInfo.navH, Y0: exitsInfo.Y0, beats });
    const curList = beats.map((x) => x.cur).join(',');
    console.log(`W=${W} sb=${sb} live=${exitsInfo.sbLive} cur=[${curList}] recFs=${rec.recFs} recOver=${rec.recOver}`);
    await page.close();
  }
} finally {
  await browser.close();
}

fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(results, null, 2) + '\n');
console.log(`wrote ${outPath} (${results.length} widths, classic=${classic})`);
