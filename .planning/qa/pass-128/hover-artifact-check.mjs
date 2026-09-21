// Scratch diagnostic (Pass-128 evidence phase): does the FIXED touch
// coordinate (195, 650) used by scroll-probe.mjs's synthetic touch
// dispatch pass over .cw-mlink / .cw-section-cta anchors as the page
// scrolls underneath it? If so, that is a candidate explanation (possible
// measurement artifact, not necessarily a real-device bug) for the
// transitionrun/transitioncancel storm on those selectors found in
// transition-attrib.mjs. Uses window.scrollTo for pure geometry sampling
// (no touch dispatch here -- this is a static geometry check, not a
// scroll-feel measurement). Live site only, read-only.
import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core").default ?? require("puppeteer-core");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "https://www.micahjonesconsulting.com/";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
await page.goto(URL, { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1000));

const maxScroll = await page.evaluate(() => {
  const el = Array.from(document.querySelectorAll("section[data-world]")).find(
    (s) => s.textContent && s.textContent.includes("The Audit"),
  );
  return el ? el.getBoundingClientRect().top + window.scrollY : 3000;
});

const samples = [];
for (let y = 0; y <= maxScroll; y += 40) {
  const info = await page.evaluate((sy) => {
    window.scrollTo(0, sy);
    const el = document.elementFromPoint(195, 650);
    if (!el) return { scrollY: sy, el: null };
    const link = el.closest(".cw-mlink, .cw-section-cta, .cw-offer__packages-link, a, button");
    return {
      scrollY: sy,
      el: el.tagName + (el.className ? "." + String(el.className).split(" ").join(".") : ""),
      link: link
        ? link.tagName + (link.className ? "." + String(link.className).split(" ").join(".") : "")
        : null,
    };
  }, y);
  samples.push(info);
}

console.log(`maxScroll target: ${maxScroll}`);
console.log(`total samples: ${samples.length}`);
const hits = samples.filter(
  (s) => s.link && /cw-mlink|cw-section-cta|cw-offer__packages-link/.test(s.link),
);
console.log(`samples where (195,650) hit a cw-mlink/cw-section-cta/packages-link ancestor: ${hits.length}`);
for (const s of samples) {
  console.log(s.scrollY, "->", s.el, s.link ? `[link: ${s.link}]` : "");
}

await browser.close();
