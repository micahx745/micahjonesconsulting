// Pass-110 captures. Settled VIEWPORT captures only, never full-page.
// For each surface the fix touched: centre the element, wait out the palette
// transition and reveals, capture, and record the world the root is showing.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const req = createRequire("C:/tmp/p101tools/package.json");
const mod = req("puppeteer-core");
const puppeteer = mod.default ?? mod;
const BASE = (process.argv[2] || "http://localhost:3200").replace(/\/$/, "");
const OUT = process.argv[3] || ".planning/qa/pass-110";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const VPS = {
  1440: { width: 1440, height: 900, deviceScaleFactor: 1 },
  390: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
// [route, name, selector to centre, viewports]
const PLAN = [
  ["/", "home-hero", null, ["1440", "390"]],
  ["/", "home-doors", ".cw-doors-band", ["1440", "390"]],
  ["/", "home-ordani-form", ".cw-signup", ["1440", "390"]],
  ["/services", "svc-proof", ".cw-sv-open__proof", ["1440"]],
  ["/services", "svc-lede-link", ".cw-lede-link", ["1440"]],
  ["/playbook", "playbook-signup", ".cw-signup", ["1440"]],
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
      await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 90000 });
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
      const world = await page.evaluate(() => {
        const r = document.querySelector('[data-mode="cw"]');
        return r ? getComputedStyle(r).getPropertyValue("--cw-bg").trim() : null;
      });
      const file = path.join(OUT, `${name}-${v}.png`);
      await page.screenshot({ path: file });
      out.push({ route, name, v, found, world, file });
      console.log(`shot ${file}  found=${found}  world=${world}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
fs.writeFileSync(path.join(OUT, "shots.json"), JSON.stringify(out, null, 2));
process.exit(out.every((o) => o.found) ? 0 : 1);
