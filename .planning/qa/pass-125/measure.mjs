import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { tsImport } from "tsx/esm/api";

const fullTimeModule = await tsImport(
  "../../../content/full-time.ts",
  import.meta.url,
);
const { FULL_TIME } = fullTimeModule.default;

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");
const axeSource = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const baseUrl = (process.argv[2] || "http://127.0.0.1:3125").replace(/\/$/, "");
const outDir = path.dirname(fileURLToPath(import.meta.url));
const widths = [390, 1440];
const results = {};
const failures = [];

function expectEqual(label, actual, expected) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    failures.push(
      `${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
    );
  }
}

async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(1, Math.floor(window.innerHeight * 0.75));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 250));
  });
}

async function visit(page, pathname) {
  await page.goto(`${baseUrl}${pathname}`, { waitUntil: "networkidle2" });
  await settle(page);
}

async function axeCount(page) {
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async () => {
    const axeResults = await globalThis.axe.run(document);
    return axeResults.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    ).length;
  });
}

async function linkCount(page) {
  return page.evaluate(
    (href) =>
      [...document.querySelectorAll("a")].filter(
        (link) => link.getAttribute("href") === href,
      ).length,
    FULL_TIME.path,
  );
}

async function captureViewportAtBottom(page, filename) {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await new Promise((resolve) => setTimeout(resolve, 250));
  await page.screenshot({ path: path.join(outDir, filename) });
}

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
  ignoreDefaultArgs: ["--hide-scrollbars"],
});

try {
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);

    results[String(width)] = {};

    await visit(page, FULL_TIME.path);
    const fullTime = await page.evaluate((linkLabel) => {
      const h1s = [...document.querySelectorAll("h1")];
      const emDash = String.fromCodePoint(0x2014);
      return {
        h1Count: h1s.length,
        h1Text: h1s[0]?.textContent?.trim() || "",
        h2Texts: [...document.querySelectorAll("h2")].map(
          (heading) => heading.textContent?.trim() || "",
        ),
        principleCount: document.querySelectorAll(".cw-principle").length,
        fullTimeLinkLabelCount: [...document.querySelectorAll("a")].filter(
          (link) => link.textContent?.trim() === linkLabel,
        ).length,
        emDashCount: document.body.innerText.split(emDash).length - 1,
        horizontalOverflow:
          document.documentElement.scrollWidth - window.innerWidth,
      };
    }, FULL_TIME.linkLabel);
    fullTime.axeSeriousCritical = await axeCount(page);
    results[String(width)][FULL_TIME.path] = fullTime;

    expectEqual(`${width} /full-time h1 count`, fullTime.h1Count, 1);
    expectEqual(`${width} /full-time h1 text`, fullTime.h1Text, FULL_TIME.h1);
    expectEqual(`${width} /full-time h2 texts`, fullTime.h2Texts, [
      FULL_TIME.thinkHeading,
      FULL_TIME.recordHeading,
      FULL_TIME.contactHeading,
    ]);
    expectEqual(`${width} /full-time principle count`, fullTime.principleCount, 4);
    expectEqual(
      `${width} /full-time link-label count`,
      fullTime.fullTimeLinkLabelCount,
      0,
    );
    expectEqual(`${width} /full-time em-dash count`, fullTime.emDashCount, 0);
    if (fullTime.horizontalOverflow > 0) {
      failures.push(
        `${width} /full-time horizontal overflow: expected 0 or less, got ${fullTime.horizontalOverflow}`,
      );
    }
    expectEqual(
      `${width} /full-time axe serious+critical`,
      fullTime.axeSeriousCritical,
      0,
    );
    await page.screenshot({
      path: path.join(outDir, `full-time-${width}.png`),
      fullPage: true,
    });

    await visit(page, "/about");
    const about = {
      fullTimeLinks: await linkCount(page),
      axeSeriousCritical: await axeCount(page),
    };
    results[String(width)]["/about"] = about;
    expectEqual(`${width} /about full-time links`, about.fullTimeLinks, 2);
    expectEqual(
      `${width} /about axe serious+critical`,
      about.axeSeriousCritical,
      0,
    );
    const aboutSentenceFound = await page.evaluate((href) => {
      const link = [...document.querySelectorAll("a")].find(
        (candidate) =>
          candidate.getAttribute("href") === href && !candidate.closest("footer"),
      );
      if (!link) return false;
      const top = link.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, Math.max(0, top - window.innerHeight / 3));
      return true;
    }, FULL_TIME.path);
    if (!aboutSentenceFound) {
      failures.push(`${width} /about full-time sentence link not found`);
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
    await page.screenshot({ path: path.join(outDir, `about-currently-${width}.png`) });
    if (width === 1440) {
      await captureViewportAtBottom(page, "footer-about-1440.png");
    }

    await visit(page, "/");
    const home = {
      fullTimeLinks: await linkCount(page),
      primaryNavFullTimeLinks: await page.evaluate(
        (href) =>
          [...document.querySelectorAll("nav a")].filter(
            (link) => link.getAttribute("href") === href,
          ).length,
        FULL_TIME.path,
      ),
    };
    results[String(width)]["/"] = home;
    expectEqual(`${width} / full-time links`, home.fullTimeLinks, 1);
    expectEqual(
      `${width} / primary-nav full-time links`,
      home.primaryNavFullTimeLinks,
      0,
    );
    await captureViewportAtBottom(page, `footer-home-${width}.png`);

    for (const pathname of [
      "/work/guardicore",
      "/work",
      "/services",
      "/packages",
      "/contact",
    ]) {
      await visit(page, pathname);
      const routeResult = { fullTimeLinks: await linkCount(page) };
      results[String(width)][pathname] = routeResult;
      expectEqual(`${width} ${pathname} full-time links`, routeResult.fullTimeLinks, 1);
      if (width === 390 && pathname === "/work/guardicore") {
        await captureViewportAtBottom(page, "footer-study-390.png");
      }
    }

    await page.close();
  }
} finally {
  await browser.close();
}

const json = `${JSON.stringify(results, null, 2)}\n`;
fs.writeFileSync(path.join(outDir, "measure.json"), json);
process.stdout.write(json);

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exitCode = 1;
}
