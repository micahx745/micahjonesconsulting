// .planning/exec/measure-pass123-final.mjs — Pass-123 capture-leg FINAL measurements.
// Usage: node .planning/exec/measure-pass123-final.mjs <base>
// For rfp-engine / content-engine / birth-worker at 390 + 1440: the bounding rect and
// computed style (font-size, font-family, letter-spacing, text-transform, color) of
// span.cs-glance__protected, the rect of p.cs-band__context above it, and the vertical gap
// between them. For all five studies at both widths: a count of .cs-glance__row elements and
// each row's <dt> text. Writes .planning/qa/pass-123/measure-final.json. Report only -- no
// judgment calls made in this script.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = (process.argv[2] || "http://localhost:3236").replace(/\/$/, "");
const REPO = fileURLToPath(new URL("../../", import.meta.url));
const OUT_FILE = path.join(REPO, ".planning/qa/pass-123/measure-final.json");

const ALL_SLUGS = ["guardicore", "rfp-engine", "ordani", "content-engine", "birth-worker"];
const PROTECTED_SLUGS = ["rfp-engine", "content-engine", "birth-worker"];
const VIEWPORTS = [
  { label: "390", vp: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } },
  { label: "1440", vp: { width: 1440, height: 900, deviceScaleFactor: 1 } },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const out = { protected: {}, glanceRows: {} };
try {
  for (const slug of ALL_SLUGS) {
    out.glanceRows[slug] = {};
    if (PROTECTED_SLUGS.includes(slug)) out.protected[slug] = {};
    for (const { label, vp } of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport(vp);
      await page.goto(`${BASE}/work/${slug}`, { waitUntil: "networkidle2", timeout: 60000 });
      await sleep(1000);

      const rows = await page.evaluate(() => {
        return [...document.querySelectorAll(".cs-glance__row")].map((row) => {
          const dt = row.querySelector("dt");
          return dt ? dt.textContent : null;
        });
      });
      out.glanceRows[slug][label] = { count: rows.length, dts: rows };

      if (PROTECTED_SLUGS.includes(slug)) {
        const data = await page.evaluate(() => {
          const round = (n) => (typeof n === "number" ? +n.toFixed(2) : n);
          const rect = (el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return { top: round(r.top), left: round(r.left), right: round(r.right), bottom: round(r.bottom), width: round(r.width), height: round(r.height) };
          };
          const protectedEl = document.querySelector("span.cs-glance__protected");
          const contextEl = document.querySelector("p.cs-band__context");
          const cs = protectedEl ? getComputedStyle(protectedEl) : null;
          return {
            protectedFound: !!protectedEl,
            contextFound: !!contextEl,
            protectedRect: rect(protectedEl),
            contextRect: rect(contextEl),
            protectedStyle: cs
              ? {
                  fontSize: cs.fontSize,
                  fontFamily: cs.fontFamily,
                  letterSpacing: cs.letterSpacing,
                  textTransform: cs.textTransform,
                  color: cs.color,
                }
              : null,
            protectedText: protectedEl ? protectedEl.textContent : null,
          };
        });
        const gap =
          data.protectedRect && data.contextRect ? +(data.protectedRect.top - data.contextRect.bottom).toFixed(2) : null;
        out.protected[slug][label] = { ...data, verticalGap: gap };
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}

fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + "\n");
console.log(`wrote ${OUT_FILE}`);
console.log(JSON.stringify(out, null, 2));
