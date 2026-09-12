import { createRequire } from "node:module";
const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");
const S = "http://localhost:3200";
const OUT = "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/qa/pass-116";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"] });
async function shot(path, url, find) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(S + url, { waitUntil: "networkidle0", timeout: 60000 });
  const y = await page.evaluate(find);
  if (y === null) throw new Error("target not found for " + path);
  await page.evaluate((yy) => window.scrollTo(0, Math.max(0, yy - 450)), y);
  await sleep(900);
  await page.screenshot({ path: `${OUT}/${path}` });
  console.log("capture:", path);
  await page.close();
}
await shot("home-exits-1440.png", "/", () => { const el = [...document.querySelectorAll(".cw-lrow__tag")].find((e) => e.textContent.includes("exit 2025")); if (!el) return null; const r = el.getBoundingClientRect(); return r.top + window.scrollY; });
await shot("work-postmates-body-1440.png", "/work/postmates", () => { const el = [...document.querySelectorAll("p")].find((e) => e.textContent.trim() === "That promise invited fraud."); if (!el) return null; const r = el.getBoundingClientRect(); return r.top + window.scrollY; });
await browser.close();
