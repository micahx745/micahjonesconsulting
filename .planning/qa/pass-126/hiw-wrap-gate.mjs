import { createRequire } from "node:module";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;

// Usage: node hiw-wrap-gate.mjs [baseUrl] [--self-test]   (LESSONS #48)
// FINISHED FRAME (amended 2026-09-21 after the first production run): every check measures with the .cw-reveal
// entrance switched off. Before, the title gap included the Scope step's reveal transform (translateY 40px until it
// scrolls in, with a transition that starts at hydration), so the same live page measured 40, 53 or 80px depending on
// when the JS landed; production read "home 53px" while its settled layout was 40. Reduced motion gets this frame too.
// --self-test injects the two pre-fix rules and passes only if exactly the three original defects are caught.
const selfTest = process.argv.includes("--self-test");
const baseUrl = (process.argv.slice(2).find((a) => !a.startsWith("--")) || "http://localhost:3126").replace(/\/$/, "");
const FINISHED_FRAME = '[data-mode="cw"] .cw-reveal { transform: none !important; transition: none !important; }';
const PRE_FIX =
  '@media (max-width: 760px) { [data-mode="cw"] .cw-hiw--home .cw-hiw__title { margin-bottom: 18px !important; } }' +
  ' [data-mode="cw"] .cw-hiw--services .cw-hiw__step--build .cw-hiw__head { text-wrap: pretty !important; }';
const EXPECTED_BITE = ["title-gap 390x844", "orphan /services 1100x900 build", "orphan /services 1440x900 build"];
const failedLabels = [];
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

      await page.addStyleTag({ content: FINISHED_FRAME + (selfTest ? " " + PRE_FIX : "") });
      await page.evaluate(() => document.body.getBoundingClientRect());

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
        if (failed) {
          failures += 1;
          failedLabels.push(`orphan ${pathname} ${viewport.name} ${headline.step}`);
        }
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
      if (failed) {
        failures += 1;
        failedLabels.push(`title-gap ${viewport.name}`);
      }
      process.stdout.write(
        `${failed ? "FAIL" : "PASS"} title-gap ${viewport.name}: home ${titleGaps["/"]}px, services ${titleGaps["/services"]}px\n`,
      );
    }
  }
} finally {
  await browser.close();
}

if (process.exitCode !== 2 && selfTest) {
  const same =
    failedLabels.length === EXPECTED_BITE.length && EXPECTED_BITE.every((label) => failedLabels.includes(label));
  process.stdout.write(
    `HIW-WRAP-GATE --self-test: ${same ? "PASS" : "FAIL"} (pre-fix CSS injected; caught ${JSON.stringify(failedLabels)}, want ${JSON.stringify(EXPECTED_BITE)})\n`,
  );
  process.exitCode = same ? 0 : 1;
} else if (process.exitCode !== 2) {
  process.stdout.write(`HIW-WRAP-GATE: ${failures} failures\n`);
  if (failures > 0) process.exitCode = 1;
}
