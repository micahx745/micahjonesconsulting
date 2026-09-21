import { createRequire } from "node:module";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;

const baseUrl = (process.argv[2] || "http://localhost:3126").replace(/\/$/, "");
const viewports = [
  { name: "390x844", width: 390, height: 844, deviceScaleFactor: 1 },
  { name: "768x1024", width: 768, height: 1024, deviceScaleFactor: 1 },
  { name: "1100x900", width: 1100, height: 900, deviceScaleFactor: 1 },
  { name: "1440x900", width: 1440, height: 900, deviceScaleFactor: 1 },
];
const pages = ["/", "/services"];

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

let failures = 0;

try {
  for (const viewport of viewports) {
    const titleGaps = {};

    for (const pathname of pages) {
      const page = await browser.newPage();
      await page.setViewport({
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: viewport.deviceScaleFactor,
      });
      await page.goto(`${baseUrl}${pathname}`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await page.evaluate(() => document.fonts.ready);

      const isLive = await page.evaluate(() => {
        const section = document.querySelector(".cw-hiw");
        return section && getComputedStyle(section).display === "grid";
      });

      if (!isLive) {
        process.stdout.write(`LIVENESS FAIL ${viewport.name} ${pathname}\n`);
        process.exitCode = 2;
        await page.close();
        break;
      }

      const measurements = await page.evaluate((measureGap) => {
        const headlines = [...document.querySelectorAll(".cw-hiw__head")].map(
          (headline) => {
            const walker = document.createTreeWalker(
              headline,
              NodeFilter.SHOW_TEXT,
            );
            const characters = [];
            let textNode = walker.nextNode();

            while (textNode) {
              for (let index = 0; index < textNode.data.length; index += 1) {
                const range = document.createRange();
                range.setStart(textNode, index);
                range.setEnd(textNode, index + 1);
                const rect = [...range.getClientRects()].find(
                  (candidate) => candidate.width > 0,
                );
                if (rect) characters.push({ text: textNode.data[index], top: rect.top });
              }
              textNode = walker.nextNode();
            }

            const lines = [];
            let currentTop = null;
            for (const character of characters) {
              if (
                currentTop === null ||
                Math.abs(character.top - currentTop) > 5
              ) {
                lines.push(character.text);
                currentTop = character.top;
              } else {
                lines[lines.length - 1] += character.text;
              }
            }

            const parent = headline.closest("li");
            const stepClass = parent
              ? [...parent.classList].find((name) =>
                  name.startsWith("cw-hiw__step--"),
                )
              : null;
            return {
              step: stepClass ? stepClass.slice("cw-hiw__step--".length) : "unknown",
              lines: lines.map((line) => line.trim()),
            };
          },
        );

        let titleGap = null;
        if (measureGap) {
          const scope = document.querySelector(".cw-hiw__step--scope > div");
          const title = document.querySelector(".cw-hiw__title");
          titleGap = Math.round(
            scope.getBoundingClientRect().top -
              title.getBoundingClientRect().bottom,
          );
        }

        return { headlines, titleGap };
      }, viewport.width < 1100);

      for (const headline of measurements.headlines) {
        const lastLine = headline.lines.at(-1) ?? "";
        const failed = headline.lines.length >= 2 && !/\s/.test(lastLine);
        if (failed) failures += 1;
        process.stdout.write(
          `${failed ? "FAIL" : "PASS"} orphan ${pathname} ${viewport.name} ${headline.step}: ${headline.lines.join(" / ")}\n`,
        );
      }

      if (viewport.width < 1100) titleGaps[pathname] = measurements.titleGap;
      await page.close();
    }

    if (process.exitCode === 2) break;

    if (viewport.width < 1100) {
      const failed = Math.abs(titleGaps["/"] - titleGaps["/services"]) > 4;
      if (failed) failures += 1;
      process.stdout.write(
        `${failed ? "FAIL" : "PASS"} title-gap ${viewport.name}: home ${titleGaps["/"]}px, services ${titleGaps["/services"]}px\n`,
      );
    }
  }
} finally {
  await browser.close();
}

if (process.exitCode !== 2) {
  process.stdout.write(`HIW-WRAP-GATE: ${failures} failures\n`);
  if (failures > 0) process.exitCode = 1;
}
