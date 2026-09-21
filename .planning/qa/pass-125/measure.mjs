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
const axeSource = fs.readFileSync(
  require.resolve("axe-core/axe.min.js"),
  "utf8",
);

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
      const studyHrefs = [
        "/work/ordani",
        "/work/guardicore",
        "/work/rfp-engine",
      ];
      const artifactLastWordAlone = [
        ...document.querySelectorAll(".cw-principle__artifact"),
      ].map((artifact) => {
        const textNode = [...artifact.childNodes].find(
          (node) => node.nodeType === Node.TEXT_NODE,
        );
        if (!textNode) return null;

        const words = [...(textNode.textContent || "").matchAll(/\S+/g)];
        if (words.length < 2) return null;

        const wordTop = (word) => {
          const range = document.createRange();
          range.setStart(textNode, word.index);
          range.setEnd(textNode, word.index + word[0].length);
          return range.getClientRects()[0]?.top ?? null;
        };
        const previousTop = wordTop(words.at(-2));
        const lastTop = wordTop(words.at(-1));
        if (previousTop === null || lastTop === null) return null;
        return Math.abs(lastTop - previousTop) > 0.5;
      });

      return {
        h1Count: h1s.length,
        h1Text: h1s[0]?.textContent?.trim() || "",
        h2Texts: [...document.querySelectorAll("h2")].map(
          (heading) => heading.textContent?.trim() || "",
        ),
        principleCount: document.querySelectorAll(".cw-principle").length,
        principleNames: [
          ...document.querySelectorAll(".cw-principle__name"),
        ].map((name) => name.textContent?.trim() || ""),
        studyLinks: Object.fromEntries(
          studyHrefs.map((href) => [
            href,
            [...document.querySelectorAll("main a")].filter(
              (link) => link.getAttribute("href") === href,
            ).length,
          ]),
        ),
        recordRowCount: document.querySelectorAll(".cw-about__list li").length,
        artifactLastWordAlone,
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
      "How I think.",
      "The record.",
      "Write to me.",
    ]);
    expectEqual(
      `${width} /full-time principle count`,
      fullTime.principleCount,
      4,
    );
    expectEqual(
      `${width} /full-time principle names`,
      fullTime.principleNames,
      ["Code", "Positioning", "Result", "Scope"],
    );
    expectEqual(`${width} /full-time study links`, fullTime.studyLinks, {
      "/work/ordani": 1,
      "/work/guardicore": 1,
      "/work/rfp-engine": 1,
    });
    expectEqual(
      `${width} /full-time record row count`,
      fullTime.recordRowCount,
      4,
    );
    expectEqual(
      `${width} /full-time artifact last word alone`,
      fullTime.artifactLastWordAlone,
      [false, false, false, false],
    );
    expectEqual(
      `${width} /full-time link-label count`,
      fullTime.fullTimeLinkLabelCount,
      0,
    );
    expectEqual(
      `${width} /full-time em-dash count`,
      fullTime.emDashCount,
      width === 390 ? 1 : 0,
    );
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
      expectEqual(
        `${width} ${pathname} full-time links`,
        routeResult.fullTimeLinks,
        1,
      );
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
