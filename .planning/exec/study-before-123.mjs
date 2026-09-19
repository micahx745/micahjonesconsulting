// Pass-123b study-band BEFORE captures (live site, read only). Usage:
//   node .planning/exec/study-before-123.mjs
// For each of the five published studies: load https://www.micahjonesconsulting.com/work/<slug>
// at 390x844 (DPR 2, isMobile, hasTouch) and 1440x900 (DPR 1), waitUntil networkidle2,
// wait 2500ms (the title settles in 600ms), then:
//   - viewport PNG  <slug>-<W>-band.png
//   - full-page PNG <slug>-<W>-full.png
//   - a FRESH load with prefers-reduced-motion: reduce -> viewport PNG <slug>-<W>-rm.png
//   - geometry.json per slug and width: .cs-band rect height; computed font-size and
//     font-weight of .cs-band__context, each .cs-band__head .cs-title__line, .cs-band__dek,
//     .cs-glance__result; the .cs-band__media rect if present; scrollHeight.
import { createRequire } from 'module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire('C:/tmp/p101tools/package.json');
const puppeteer = require('puppeteer-core');

const BASE = 'https://www.micahjonesconsulting.com';
const OUT_DIR = '.planning/qa/pass-123/study-before';
const SLUGS = ['guardicore', 'rfp-engine', 'ordani', 'content-engine', 'birth-worker'];
const VIEWPORTS = [
  { label: '390', vp: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } },
  { label: '1440', vp: { width: 1440, height: 900, deviceScaleFactor: 1 } },
];

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});

const geometry = {};

try {
  for (const slug of SLUGS) {
    geometry[slug] = {};
    for (const { label, vp } of VIEWPORTS) {
      // Primary load: band + full captures, then geometry.
      const page = await browser.newPage();
      await page.setViewport(vp);
      await page.goto(`${BASE}/work/${slug}`, { waitUntil: 'networkidle2' });
      await new Promise((r) => setTimeout(r, 2500));
      await page.screenshot({ path: path.join(OUT_DIR, `${slug}-${label}-band.png`) });
      await page.screenshot({ path: path.join(OUT_DIR, `${slug}-${label}-full.png`), fullPage: true });

      const geo = await page.evaluate(() => {
        const round = (n) => +n.toFixed(2);
        const fsfw = (el) =>
          el
            ? {
                fontSize: getComputedStyle(el).fontSize,
                fontWeight: getComputedStyle(el).fontWeight,
              }
            : null;
        const out = {};
        const band = document.querySelector('.cs-band');
        out.bandRect = band
          ? { height: round(band.getBoundingClientRect().height) }
          : null;
        out.context = fsfw(document.querySelector('.cs-band .cs-band__context'));
        out.titleLines = [...document.querySelectorAll('.cs-band__head .cs-title__line')].map(
          (el) => ({ text: el.textContent, ...fsfw(el) }),
        );
        out.dek = fsfw(document.querySelector('.cs-band .cs-band__dek'));
        out.glanceResult = fsfw(document.querySelector('.cs-glance__result'));
        const media = document.querySelector('.cs-band__media');
        out.media = media
          ? {
              width: round(media.getBoundingClientRect().width),
              height: round(media.getBoundingClientRect().height),
            }
          : null;
        out.scrollHeight = document.documentElement.scrollHeight;
        return out;
      });
      geometry[slug][label] = geo;
      console.log(
        `${slug} ${label}: bandH=${geo.bandRect ? geo.bandRect.height : null} ` +
          `scrollH=${geo.scrollHeight} lines=${geo.titleLines.length} media=${geo.media ? geo.media.height : 'none'}`,
      );
      await page.close();

      // Fresh load under reduced motion: viewport PNG only.
      const rm = await browser.newPage();
      await rm.setViewport(vp);
      await rm.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await rm.goto(`${BASE}/work/${slug}`, { waitUntil: 'networkidle2' });
      await new Promise((r) => setTimeout(r, 2500));
      await rm.screenshot({ path: path.join(OUT_DIR, `${slug}-${label}-rm.png`) });
      await rm.close();
    }
  }
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(OUT_DIR, 'geometry.json'), JSON.stringify(geometry, null, 2) + '\n');
console.log(`wrote ${path.join(OUT_DIR, 'geometry.json')} and ${SLUGS.length * VIEWPORTS.length * 3} PNGs`);
