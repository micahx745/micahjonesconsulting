// Pass-128 T4 scratch verifier (evidence phase only, not the deliverable
// probe). Confirms exp-T4.css actually matches live [data-world] sections
// and changes their computed content-visibility, both WITHOUT and WITH the
// injected CSS, against the live deploy, before trusting the A/B numbers.
import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "https://www.micahjonesconsulting.com/";
const withCss = process.argv.includes("--with-css");

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
await page.goto(URL, { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1000));
if (withCss) await page.addStyleTag({ path: "exp-T4.css" });
await new Promise((r) => setTimeout(r, 200));

const info = await page.evaluate(() => {
  const nodes = Array.from(document.querySelectorAll('[data-mode="cw"] section[data-world]'));
  return {
    matchCount: nodes.length,
    dataWorlds: nodes.map((el) => el.getAttribute("data-world")),
    samples: nodes.slice(0, 6).map((el) => {
      const c = getComputedStyle(el);
      return {
        world: el.getAttribute("data-world"),
        contentVisibility: c.contentVisibility,
        containIntrinsicSize: c.containIntrinsicSize,
      };
    }),
  };
});
console.log(withCss ? "WITH exp-T4.css:" : "WITHOUT exp-T4.css (baseline default):");
console.log(JSON.stringify(info, null, 2));
await browser.close();
