import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE_URL = "http://127.0.0.1:3125";
const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const OUT_DIR = path.join(ROOT, ".planning/qa/pass-125");
const SCROLL_DIR = path.join(OUT_DIR, "scroll");
const SHEETS_DIR = path.join(OUT_DIR, "sheets");
const VIEWPORTS = [
  { width: 390, height: 844, columns: 4, scale: 1 },
  { width: 1440, height: 900, columns: 2, scale: 0.5 },
];

fs.mkdirSync(SCROLL_DIR, { recursive: true });
fs.mkdirSync(SHEETS_DIR, { recursive: true });

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function preparePage(browser, viewport, pathname) {
  const page = await browser.newPage();
  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
  });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(`${BASE_URL}${pathname}`, { waitUntil: "networkidle2" });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

async function captureScrollFrames(browser, viewport) {
  const page = await preparePage(browser, viewport, "/full-time");
  const frames = [];

  try {
    const scroll = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      max: Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
    }));
    const step = viewport.height * 0.8;
    const targets = [];

    for (let y = 0; y < scroll.max; y += step) {
      targets.push(Math.round(y));
    }
    if (!targets.length || targets.at(-1) !== scroll.max) {
      targets.push(scroll.max);
    }

    for (let index = 0; index < targets.length; index += 1) {
      await page.evaluate((y) => window.scrollTo(0, y), targets[index]);
      await wait(700);
      const scrollY = await page.evaluate(() => Math.round(window.scrollY));
      const number = String(index + 1).padStart(2, "0");
      const filename = `ft-${viewport.width}-${number}.png`;
      const outputPath = path.join(SCROLL_DIR, filename);
      await page.screenshot({ path: outputPath, captureBeyondViewport: false });
      frames.push({ filename, outputPath, scrollY });
      console.log(
        `frame ${viewport.width} ${number}: scrollY=${scrollY} path=${outputPath}`,
      );
    }

    console.log(
      `captured ${frames.length} frames at ${viewport.width}x${viewport.height}; pageHeight=${scroll.height}; maxScroll=${scroll.max}`,
    );
    return frames;
  } finally {
    await page.close();
  }
}

async function composeSheet(browser, viewport, frames) {
  const displayWidth = Math.round(viewport.width * viewport.scale);
  const gap = 16;
  const padding = 24;
  const sheetWidth =
    displayWidth * viewport.columns +
    gap * (viewport.columns - 1) +
    padding * 2;
  const cells = frames
    .map(
      (frame) => `
        <figure>
          <figcaption>${viewport.width}px | scrollY ${escapeHtml(frame.scrollY)}</figcaption>
          <img src="${pathToFileURL(frame.outputPath).href}" alt="">
        </figure>`,
    )
    .join("");
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      * { box-sizing: border-box; }
      html { background: #b8b8b8; }
      body {
        margin: 0;
        padding: ${padding}px;
        background: #b8b8b8;
        color: #181818;
        font-family: Arial, sans-serif;
      }
      h1 { margin: 0 0 18px; font-size: 20px; }
      .grid {
        display: grid;
        grid-template-columns: repeat(${viewport.columns}, ${displayWidth}px);
        gap: ${gap}px;
        align-items: start;
      }
      figure { margin: 0; width: ${displayWidth}px; }
      figcaption {
        padding: 7px 9px;
        background: #333;
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        line-height: 1;
      }
      img {
        display: block;
        width: ${displayWidth}px;
        height: auto;
        border: 1px solid #333;
        border-top: 0;
      }
    </style>
  </head>
  <body>
    <h1>Full-time scroll sheet: ${viewport.width}px</h1>
    <main class="grid">${cells}</main>
  </body>
</html>`;
  const tempPath = path.join(
    SHEETS_DIR,
    `_tmp-full-time-scroll-${viewport.width}.html`,
  );
  const outputPath = path.join(
    SHEETS_DIR,
    `full-time-scroll-${viewport.width}.png`,
  );
  fs.writeFileSync(tempPath, html);

  const page = await browser.newPage();
  try {
    await page.setViewport({ width: sheetWidth, height: 900, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(tempPath).href, { waitUntil: "networkidle0" });
    await page.evaluate(async () => {
      await Promise.all(
        [...document.images].map((image) => image.decode().catch(() => {})),
      );
    });
    await page.screenshot({ path: outputPath, fullPage: true });
    console.log(`sheet ${viewport.width}: ${outputPath}`);
  } finally {
    await page.close();
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }

  return outputPath;
}

async function captureFooter(browser, pathname, viewport, filename) {
  const page = await preparePage(browser, viewport, pathname);
  try {
    const position = await page.evaluate(() => {
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      window.scrollTo(0, max);
      return { max };
    });
    await wait(700);
    const scrollY = await page.evaluate(() => Math.round(window.scrollY));
    const outputPath = path.join(OUT_DIR, filename);
    await page.screenshot({ path: outputPath, captureBeyondViewport: false });
    console.log(
      `footer ${pathname} ${viewport.width}x${viewport.height}: scrollY=${scrollY} maxScroll=${position.max} path=${outputPath}`,
    );
    return outputPath;
  } finally {
    await page.close();
  }
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
  ignoreDefaultArgs: ["--hide-scrollbars"],
});

try {
  for (const viewport of VIEWPORTS) {
    const frames = await captureScrollFrames(browser, viewport);
    await composeSheet(browser, viewport, frames);
  }

  await captureFooter(
    browser,
    "/about",
    { width: 1440, height: 900 },
    "footer-about-1440-v2.png",
  );
  await captureFooter(
    browser,
    "/about",
    { width: 390, height: 844 },
    "footer-about-390-v2.png",
  );
  await captureFooter(
    browser,
    "/work",
    { width: 1440, height: 900 },
    "footer-work-1440.png",
  );
} finally {
  await browser.close();
}
