import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");
const base = process.argv[2] || "http://localhost:3250";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(base + "/", { waitUntil: "networkidle2" });
await new Promise(r => setTimeout(r, 3500));
const out = await p.evaluate(() => {
  const sec = document.querySelector(".cw-exits");
  const row = document.querySelector(".cw-exits__row");
  const deals = [...document.querySelectorAll(".cw-exits__deal")];
  const rowR = row.getBoundingClientRect();
  return {
    classes: sec.className,
    rowPos: getComputedStyle(row).position,
    rowTop: rowR.top,
    deals: deals.map((d, i) => {
      const v = d.querySelector(".cw-exits__val");
      const cs = getComputedStyle(v);
      const dcs = getComputedStyle(d);
      return {
        i,
        dealPos: dcs.position, dealDisplay: dcs.display, dealH: d.getBoundingClientRect().height,
        dealTransform: dcs.transform, dealTranslate: dcs.translate, dealFilter: dcs.filter, dealWillChange: dcs.willChange, dealContain: dcs.contain, dealCV: dcs.contentVisibility, dealPerspective: dcs.perspective, dealBackdrop: dcs.backdropFilter,
        dealTop: d.getBoundingClientRect().top - rowR.top,
        valPos: cs.position, valDisplay: cs.display,
        offsetParent: v.offsetParent ? (v.offsetParent.className || v.offsetParent.tagName) : null,
        translate: v.style.translate, scale: v.style.scale, fontSize: v.style.fontSize,
        valTopRel: v.getBoundingClientRect().top - rowR.top,
        valLeftRel: v.getBoundingClientRect().left - rowR.left,
      };
    }),
  };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
