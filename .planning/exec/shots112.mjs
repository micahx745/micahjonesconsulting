// Pass-112 captures. Settled VIEWPORT captures only, never full-page: the
// surfaces the book left (home doors, services foot, packages fine print,
// about links, thanks, the ordani case-study end) plus the OPEN mobile nav
// at 390. Records the world each capture shows and horizontal overflow at
// every width. The Pass-111a measurements that named elements no longer in
// the plan (offer box, exits wrap, home #ordani image sum) are gone with it.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const req = createRequire("C:/tmp/p101tools/package.json");
const mod = req("puppeteer-core");
const puppeteer = mod.default ?? mod;
const BASE = (process.argv[2] || "http://localhost:3200").replace(/\/$/, "");
const OUT = process.argv[3] || ".planning/qa/pass-112";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const VPS = {
  1440: { width: 1440, height: 900, deviceScaleFactor: 1 },
  390: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
// [route, name, selector to centre (null = top), viewports]
const PLAN = [
  ["/", "home-nav", null, ["1440", "390"]],
  ["/", "home-doors", "#doors", ["1440", "390"]],
  ["/services", "services-foot", ".cw-sv-shapes__foot", ["1440", "390"]],
  ["/packages", "packages-fine", ".cw-pkgs__fine", ["1440", "390"]],
  ["/about", "about-links", "a[href='/work']", ["1440", "390"]],
  ["/services/thanks", "thanks", null, ["1440", "390"]],
  ["/work/ordani", "ordani-end", "blockquote", ["1440"]],
];

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const out = [];
const measure = () => {
  const root = document.querySelector('[data-mode="cw"]');
  return {
    world: root ? getComputedStyle(root).getPropertyValue("--cw-bg").trim() : null,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  };
};
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
      const m = await page.evaluate(measure);
      const file = path.join(OUT, `${name}-${v}.png`);
      await page.screenshot({ path: file });
      const rec = { route, name, v, status: resp ? resp.status() : null, found, file, ...m, overflowX: m.scrollWidth > m.clientWidth };
      out.push(rec);
      console.log(
        `shot ${file}  status=${rec.status} found=${found} world=${m.world} overflowX=${rec.overflowX}`,
      );
      await page.close();
    }
  }

  // The OPEN mobile menu at 390: nav toggle click, 600ms settle, then the
  // capture. The menu must show four items and no Playbook row.
  {
    const page = await browser.newPage();
    await page.setViewport(VPS["390"]);
    const resp = await page.goto(BASE + "/", { waitUntil: "networkidle0", timeout: 90000 });
    await sleep(7000);
    const clicked = await page.evaluate(() => {
      const btn = document.querySelector("button.cw-menubtn");
      if (!btn) return false;
      btn.click();
      return true;
    });
    await sleep(600);
    const m = await page.evaluate(measure);
    const file = path.join(OUT, "home-nav-open-390.png");
    await page.screenshot({ path: file });
    const rec = { route: "/", name: "home-nav-open", v: "390", status: resp ? resp.status() : null, found: clicked, file, ...m, overflowX: m.scrollWidth > m.clientWidth };
    out.push(rec);
    console.log(
      `shot ${file}  status=${rec.status} found=${clicked} world=${m.world} overflowX=${rec.overflowX}`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
fs.writeFileSync(path.join(OUT, "shots.json"), JSON.stringify(out, null, 2));
const ok = out.every(
  (o) =>
    o.found &&
    !o.overflowX &&
    (o.status === null || o.status < 400),
);
process.exit(ok ? 0 : 1);
