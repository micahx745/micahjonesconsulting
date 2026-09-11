// Pass-111a captures and measurements. Settled VIEWPORT captures only, never
// full-page. Records the world each capture shows, horizontal overflow at every
// width, the home Audit box against its left column, and the summed image
// height inside #ordani at 390.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const req = createRequire("C:/tmp/p101tools/package.json");
const mod = req("puppeteer-core");
const puppeteer = mod.default ?? mod;
const BASE = (process.argv[2] || "http://localhost:3200").replace(/\/$/, "");
const OUT = process.argv[3] || ".planning/qa/pass-111a";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const VPS = {
  1440: { width: 1440, height: 900, deviceScaleFactor: 1 },
  1280: { width: 1280, height: 800, deviceScaleFactor: 1 },
  1024: { width: 1024, height: 768, deviceScaleFactor: 1 },
  768: { width: 768, height: 1024, deviceScaleFactor: 1, hasTouch: true },
  390: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  360: { width: 360, height: 780, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
// [route, name, selector to centre (null = top), viewports]
const PLAN = [
  ["/", "home-hero", null, ["1440", "390"]],
  ["/", "home-offer", "#offer", ["1440", "1280", "1024", "768", "390"]],
  ["/", "home-receipts", ".cw-rec", ["1440", "390"]],
  ["/", "home-exits", ".cw-exits", ["1440", "768", "390", "360"]],
  ["/", "home-ordani", "#ordani", ["1440", "1024", "390"]],
  ["/work", "work-index", null, ["1440"]],
  ["/work/postmates", "work-postmates", null, ["1440"]],
  ["/work/postmates", "work-postmates-body", "article h2, main h2", ["1440", "390"]],
  ["/work/neuton", "work-neuton", null, ["1440"]],
  ["/work/neuton", "work-neuton-body", "article h2, main h2", ["1440"]],
];

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const out = [];
try {
  for (const [route, name, sel, vps] of PLAN) {
    for (const v of vps) {
      const page = await browser.newPage();
      await page.setViewport(VPS[v]);
      const resp = await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 90000 });
      await sleep(7000);
      const found = await page.evaluate((s) => {
        if (!s) {
          window.scrollTo({ top: 0, behavior: "instant" });
          return true;
        }
        const el = document.querySelector(s);
        if (!el) return false;
        el.scrollIntoView({ block: "center", behavior: "instant" });
        return true;
      }, sel);
      await sleep(2600);
      const m = await page.evaluate(() => {
        const root = document.querySelector('[data-mode="cw"]');
        const res = {
          world: root ? getComputedStyle(root).getPropertyValue("--cw-bg").trim() : null,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
        const box = document.querySelector("#offer .cw-pbox");
        const h2 = document.querySelector("#offer h2");
        if (box && h2) {
          const col = h2.parentElement.getBoundingClientRect();
          res.offerBoxH = Math.round(box.getBoundingClientRect().height);
          res.offerLeftColH = Math.round(col.height);
          res.offerBoxW = Math.round(box.getBoundingClientRect().width);
          res.offerFits = innerWidth < 1024 || res.offerBoxH <= innerHeight;
        }
        res.exitsWrapped = [...document.querySelectorAll(".cw-exits__co")]
          .filter((e) => {
            const s = getComputedStyle(e);
            const lh = parseFloat(s.lineHeight) || parseFloat(s.fontSize);
            return e.getBoundingClientRect().height > lh * 1.5;
          })
          .map((e) => e.textContent);
        const ord = document.querySelector("#ordani");
        if (ord) {
          res.ordaniImgHeightSum = Math.round(
            [...ord.querySelectorAll("img")]
              .filter((i) => getComputedStyle(i).display !== "none" && i.getBoundingClientRect().height > 0)
              .reduce((s, i) => s + i.getBoundingClientRect().height, 0),
          );
        }
        return res;
      });
      const file = path.join(OUT, `${name}-${v}.png`);
      await page.screenshot({ path: file });
      const rec = { route, name, v, status: resp ? resp.status() : null, found, file, ...m, overflowX: m.scrollWidth > m.clientWidth };
      out.push(rec);
      console.log(
        `shot ${file}  status=${rec.status} found=${found} world=${m.world} overflowX=${rec.overflowX}` +
          (m.offerBoxH ? `  box=${m.offerBoxW}x${m.offerBoxH} leftcol=${m.offerLeftColH} fits=${m.offerFits}` : "") +
          (m.exitsWrapped && m.exitsWrapped.length ? `  EXITS-WRAPPED=${m.exitsWrapped.join("|")}` : "") +
          (m.ordaniImgHeightSum !== undefined ? `  ordaniImgH=${m.ordaniImgHeightSum}` : ""),
      );
      await page.close();
    }
  }
} finally {
  await browser.close();
}
fs.writeFileSync(path.join(OUT, "shots.json"), JSON.stringify(out, null, 2));
const ok = out.every(
  (o) =>
    o.found &&
    !o.overflowX &&
    (o.status === null || o.status < 400) &&
    o.offerFits !== false &&
    !(o.exitsWrapped && o.exitsWrapped.length),
);
process.exit(ok ? 0 : 1);
