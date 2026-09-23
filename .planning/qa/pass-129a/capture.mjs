// Pass-129a captures. Brief: .claude/briefs/pass-129a-ruled-lines.md
// Viewport/element captures into .planning/qa/pass-129a/ plus the 390 overflow probes.
// No source changes. Uses the machine capture chain (puppeteer-core from C:/tmp/p101tools
// driving the Playwright-downloaded Chromium), same as pass-126.

import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CHROME = "C:/Users/micah/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe";
const BASE = "http://localhost:3131";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
});

const results = [];

async function newPage(width, height) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  return page;
}

async function overflowCheck(page, label) {
  const ok = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  const iw = await page.evaluate(() => window.innerWidth);
  results.push(`${label}: scrollWidth ${sw} <= innerWidth ${iw} -> ${ok}`);
}

// --- / at 390: overflow probe, build door, then the open menu ------------------------------
{
  const page = await newPage(390, 844);
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await sleep(600);
  await overflowCheck(page, "overflow / @390");
  const door = await page.$(".cw-door--build");
  await door.screenshot({ path: path.join(HERE, "home-door-390.png") });
  await page.click("button.cw-menubtn");
  await sleep(600);
  await page.screenshot({ path: path.join(HERE, "home-menu-390.png") });
  await page.close();
}

// --- / at 1440: build door + nav -------------------------------------------------------------
{
  const page = await newPage(1440, 900);
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await sleep(600);
  const door = await page.$(".cw-door--build");
  await door.screenshot({ path: path.join(HERE, "home-door-1440.png") });
  const nav = await page.$("nav.cw-nav");
  await nav.screenshot({ path: path.join(HERE, "home-nav-1440.png") });
  await page.close();
}

// --- /packages at 390: overflow probe + intro ------------------------------------------------
{
  const page = await newPage(390, 844);
  await page.goto(`${BASE}/packages`, { waitUntil: "networkidle0" });
  await sleep(600);
  await overflowCheck(page, "overflow /packages @390");
  const intro = await page.$(".cw-services__intro");
  await intro.screenshot({ path: path.join(HERE, "packages-intro-390.png") });
  await page.close();
}

await browser.close();
for (const line of results) console.log(line);
console.log("captures done");
