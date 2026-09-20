// .planning/exec/copper-ab.mjs — Pass-123 copper hex A/B capture.
//
// The live stylesheet ships --color-accent-copper:#bd5a2d and
// --color-accent-copper-deep:#8a3d24; the design notes / brand.json say
// #C8542B / #8E3A1E. This captures the SAME viewport twice per page/width:
//   variant "live": the page as it is.
//   variant "docs": the page with the documented hex pair force-injected via
//     evaluateOnNewDocument (before first paint), confirmed by reading the
//     computed color of a var(--color-accent-copper)-coloured probe element.
//
// Usage: node .planning/exec/copper-ab.mjs
// Writes PNGs to .planning/qa/pass-123/copper/<page>-<W>-<variant>.png and a
// capture-summary.json (per-combo metadata: confirm colours, selector found,
// scrollY) that compose-copper-ab.mjs and measure-copper-ab.mjs read back.
//
// Aborts immediately (no further captures, nothing misleading written) if a
// "docs" variant's probe does not read rgb(200, 84, 43) — see WHY below.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT_DIR = path.resolve(
  "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/qa/pass-123/copper",
);
fs.mkdirSync(OUT_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const errText = (e) => String((e && e.message) || e).split("\n")[0];

const WIDTHS = [390, 1440];
const VP = {
  390: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  1440: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
};

// page order matches the sheet's column order (compose-copper-ab.mjs row = these 3, in order)
const PAGES = [
  {
    key: "home",
    url: "https://www.micahjonesconsulting.com/",
    selector: ".cw-rec",
    align: "center", // centers the $20M+ figure + exits ledger section in the viewport
  },
  {
    key: "work",
    url: "https://www.micahjonesconsulting.com/work",
    selector: ".cw-wx-num",
    align: "center", // first poster figure numerals, centered
  },
  {
    key: "guardicore",
    url: "https://www.micahjonesconsulting.com/work/guardicore",
    selector: ".cs-band",
    align: "top", // the case-study top band header — already page-top, top-align is a no-op safety net
  },
];

const OVERRIDE_CSS =
  ':root,[data-mode="cw"],[data-mode="theater"]{--color-accent-copper:#C8542B !important;--color-accent-copper-deep:#8E3A1E !important;}';
const EXPECT_DOCS_RGB = "rgb(200, 84, 43)";

async function injectOverride(page) {
  await page.evaluateOnNewDocument((css) => {
    const STYLE_ID = "__copper_ab_override__";
    const inject = () => {
      if (document.getElementById(STYLE_ID)) return;
      const target = document.head || document.documentElement;
      if (!target) return;
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = css;
      target.appendChild(style);
    };
    inject();
    document.addEventListener("readystatechange", inject);
  }, OVERRIDE_CSS);
}

async function probeColor(page) {
  return page.evaluate(() => {
    const p = document.createElement("span");
    p.style.cssText = "position:fixed;left:-9999px;top:-9999px;color:var(--color-accent-copper);";
    document.body.appendChild(p);
    const rgb = getComputedStyle(p).color;
    p.remove();
    return rgb;
  });
}

async function frameElement(page, selector, align) {
  return page.evaluate(
    (sel, al) => {
      const el = document.querySelector(sel);
      if (!el) return { found: false, scrollY: window.scrollY };
      const rect = el.getBoundingClientRect();
      const y =
        al === "center"
          ? rect.top + window.scrollY - (window.innerHeight - el.offsetHeight) / 2
          : rect.top + window.scrollY;
      window.scrollTo(0, Math.max(0, y));
      return { found: true, scrollY: Math.max(0, y), rectTop: rect.top, rectHeight: rect.height };
    },
    selector,
    align,
  );
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const summary = [];
let aborted = null;

try {
  outer: for (const W of WIDTHS) {
    for (const pg of PAGES) {
      for (const variant of ["live", "docs"]) {
        const page = await browser.newPage();
        try {
          await page.setViewport(VP[W]);
          if (variant === "docs") await injectOverride(page);
          await page.goto(pg.url, { waitUntil: "networkidle2", timeout: 45000 });

          const rgb = await probeColor(page);
          console.log(`CONFIRM ${pg.key} ${W} ${variant}: ${rgb}`);

          if (variant === "docs" && rgb !== EXPECT_DOCS_RGB) {
            aborted = {
              page: pg.key,
              width: W,
              variant,
              got: rgb,
              want: EXPECT_DOCS_RGB,
            };
            console.error(
              `ABORT: docs override not confirmed for ${pg.key} ${W} — computed ${rgb} (want ${EXPECT_DOCS_RGB}). Stopping rather than producing a misleading sheet.`,
            );
            await page.close();
            break outer;
          }

          const frame = await frameElement(page, pg.selector, pg.align);
          if (!frame.found) {
            console.warn(`WARN ${pg.key} ${W} ${variant}: selector "${pg.selector}" not found on page — capturing unscrolled.`);
          }
          await sleep(2500);

          const outPath = path.join(OUT_DIR, `${pg.key}-${W}-${variant}.png`);
          await page.screenshot({ path: outPath });
          console.log(`wrote ${outPath}`);

          summary.push({
            page: pg.key,
            url: pg.url,
            width: W,
            variant,
            selector: pg.selector,
            selectorFound: frame.found,
            scrollY: frame.scrollY,
            confirmRgb: rgb,
            outPath,
          });
        } catch (e) {
          console.error(`REPORT FAIL ${pg.key} ${W} ${variant}: ${errText(e)}`);
          summary.push({
            page: pg.key,
            url: pg.url,
            width: W,
            variant,
            error: errText(e),
          });
        } finally {
          await page.close();
        }
      }
    }
  }
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(OUT_DIR, "capture-summary.json"), JSON.stringify({ aborted, combos: summary }, null, 2));
console.log(`summary written: ${path.join(OUT_DIR, "capture-summary.json")}`);

if (aborted) {
  console.error(`copper-ab capture ABORTED at ${aborted.page} ${aborted.width} ${aborted.variant}.`);
  process.exit(1);
}
console.log(`copper-ab capture complete: ${summary.length} combos.`);
