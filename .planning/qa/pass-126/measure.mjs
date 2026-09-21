import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;
const axeSource = fs.readFileSync(
  require.resolve("axe-core/axe.min.js"),
  "utf8",
);

const baseUrl = (process.argv[2] || "http://localhost:3125").replace(/\/$/, "");
const outPath = path.resolve(".planning/qa/pass-126/measure.json");
const source = fs.readFileSync("content/how-i-work.ts", "utf8");

const capture = (pattern, label) => {
  const match = source.match(pattern);
  if (!match)
    throw new Error(`Could not read ${label} from content/how-i-work.ts`);
  return match[1];
};

const expected = {
  heading: capture(/heading:\s*"([^"]+)"/, "heading"),
  steps: [
    ...source.matchAll(
      /\{\s*label:\s*"([^"]+)",\s*headline:\s*"([^"]+)",\s*body:\s*"([^"]+)",\s*\}/g,
    ),
  ].map(([, label, headline, body]) => ({ label, headline, body })),
  servicesNote: capture(/servicesNote:\s*\r?\n\s*"([^"]+)"/, "services note"),
};

if (expected.steps.length !== 4) {
  throw new Error(`Expected four locked steps, found ${expected.steps.length}`);
}

const viewports = [
  { name: "390x844", width: 390, height: 844, deviceScaleFactor: 1 },
  { name: "1440x900", width: 1440, height: 900, deviceScaleFactor: 1 },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const debug = (message) => {
  if (process.env.DEBUG_MEASURE) process.stderr.write(`${message}\n`);
};

async function scrollWholePage(page) {
  let y = 0;
  while (true) {
    const dimensions = await page.evaluate(() => ({
      height: window.innerHeight,
      max:
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
        ) - window.innerHeight,
    }));
    if (y >= dimensions.max) {
      await page.evaluate(
        (target) => window.scrollTo(0, target),
        dimensions.max,
      );
      await sleep(900);
      await page.evaluate(() => window.scrollTo(0, 0));
      await sleep(1000);
      return;
    }
    await page.evaluate((target) => window.scrollTo(0, target), y);
    await sleep(300);
    y += dimensions.height * 0.75;
  }
}

async function axeCount(page, selector) {
  debug(`axe start ${selector ?? "document"}`);
  await page.addScriptTag({ content: axeSource });
  const violations = await page.evaluate(async (contextSelector) => {
    const context = contextSelector
      ? document.querySelector(contextSelector)
      : document;
    if (!context) return null;
    const results = await window.axe.run(context, {
      resultTypes: ["violations"],
    });
    return results.violations
      .filter((violation) => ["serious", "critical"].includes(violation.impact))
      .map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          html: node.html,
          failureSummary: node.failureSummary,
        })),
      }));
  }, selector);
  debug(`axe done ${selector ?? "document"}`);
  return violations;
}

async function openMeasuredPage(browser, viewport, pathname) {
  debug(`open start ${viewport.name} ${pathname}`);
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "no-preference" },
  ]);
  await page.goto(`${baseUrl}${pathname}`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await sleep(1500);
  debug(`scroll start ${viewport.name} ${pathname}`);
  await scrollWholePage(page);
  debug(`scroll done ${viewport.name} ${pathname}`);
  return page;
}

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

const results = [];
const failures = [];

try {
  for (const viewport of viewports) {
    const homePage = await openMeasuredPage(browser, viewport, "/");
    const home = await homePage.evaluate((locked) => {
      const normalize = (value) => value.replace(/\u00a0/g, " ");
      const text = normalize(document.body.innerText);
      const section = document.querySelector(".cw-hiw");
      const steps = [...document.querySelectorAll(".cw-hiw__step")];
      const bodies = [...document.querySelectorAll(".cw-hiw__body")];
      const plan = document.querySelector(".cw-hiw__step--plan");
      const build = document.querySelector(".cw-hiw__step--build");
      const stayBody = document.querySelector(
        ".cw-hiw__step--stay .cw-hiw__body",
      );
      const more = document.querySelector(".cw-hiw__more");
      const stayBodyRect = stayBody?.getBoundingClientRect();
      const moreRect = more?.getBoundingClientRect();
      const copperTextColors = ["rgb(189, 90, 45)", "rgb(138, 61, 36)"];
      return {
        heading:
          document.querySelector("h2#cw-howiwork-title")?.textContent?.trim() ??
          null,
        stepCount: steps.length,
        labels: [...document.querySelectorAll(".cw-hiw__label")].map(
          (node) => node.textContent?.trim() ?? "",
        ),
        headlineMatches: locked.steps.map((step) =>
          text.includes(normalize(step.headline)),
        ),
        bodyMatches: locked.steps.map((step) =>
          text.includes(normalize(step.body)),
        ),
        digitCount: section
          ? (section.innerText.match(/[0-9]/g) ?? []).length
          : null,
        stickyElementCount: section
          ? [...section.querySelectorAll("*")].filter(
              (node) => getComputedStyle(node).position === "sticky",
            ).length
          : null,
        stepsIn: steps.map((step) => step.classList.contains("is-in")),
        bodyOpacities: bodies.map((body) => getComputedStyle(body).opacity),
        ruleTransforms: steps.map(
          (step) =>
            getComputedStyle(step.querySelector(":scope > div"), "::before")
              .transform,
        ),
        moreBelowStayBody:
          moreRect && stayBodyRect ? moreRect.top > stayBodyRect.bottom : false,
        moreStayLeftDelta:
          moreRect && stayBodyRect
            ? Math.abs(moreRect.left - stayBodyRect.left)
            : null,
        planBuildTopDelta:
          plan && build
            ? Math.abs(
                plan.getBoundingClientRect().top -
                  build.getBoundingClientRect().top,
              )
            : null,
        stepInnerPaddingLefts: steps.map((step) =>
          getComputedStyle(step.querySelector(":scope > div")).paddingLeft,
        ),
        copperTextElementCount: section
          ? [...section.querySelectorAll("*")].filter(
              (node) =>
                node.textContent?.trim() &&
                copperTextColors.includes(getComputedStyle(node).color),
            ).length
          : null,
        horizontalOverflow:
          Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
          ) - document.documentElement.clientWidth,
      };
    }, expected);
    home.axeViolations = await axeCount(homePage, "#products");
    home.axeSeriousCritical = home.axeViolations?.length ?? null;
    await homePage.close();

    const servicesPage = await openMeasuredPage(browser, viewport, "/services");
    const services = await servicesPage.evaluate((locked) => {
      const normalize = (value) => value.replace(/\u00a0/g, " ");
      const pageText = normalize(document.body.innerText);
      const whyHeading = [...document.querySelectorAll("h2")].find(
        (node) => node.textContent?.trim() === "Why one person",
      );
      const whyText = normalize(
        whyHeading?.nextElementSibling?.textContent ?? "",
      );
      const section = document.querySelector(".cw-hiw");
      const steps = [...document.querySelectorAll(".cw-hiw__step")];
      const plan = document.querySelector(".cw-hiw__step--plan");
      const build = document.querySelector(".cw-hiw__step--build");
      const stayBody = document.querySelector(
        ".cw-hiw__step--stay .cw-hiw__body",
      );
      const more = document.querySelector(".cw-hiw__more");
      const areasTitle = document.querySelector("#sv-areas-title");
      const areasNote = document.querySelector(".cw-areas__note");
      const stayBodyRect = stayBody?.getBoundingClientRect();
      const moreRect = more?.getBoundingClientRect();
      const sectionRect = section?.getBoundingClientRect();
      const areasTitleRect = areasTitle?.getBoundingClientRect();
      const copperTextColors = ["rgb(189, 90, 45)", "rgb(138, 61, 36)"];
      const areasNoteMatches =
        normalize(areasNote?.textContent?.trim() ?? "") ===
        normalize(locked.servicesNote);
      return {
        heading:
          document.querySelector("#sv-hiw-title")?.textContent?.trim() ?? null,
        stepCount: document.querySelectorAll(".cw-hiw__step").length,
        noteMatches: areasNoteMatches,
        hiwNoteCount: document.querySelectorAll(".cw-hiw__note").length,
        areasNoteMatches,
        areasNoteAfterTitle:
          areasTitle && areasNote
            ? Boolean(
                areasTitle.compareDocumentPosition(areasNote) &
                  Node.DOCUMENT_POSITION_FOLLOWING,
              )
            : false,
        hiwToAreasTitleGap:
          sectionRect && areasTitleRect
            ? areasTitleRect.top - sectionRect.bottom
            : null,
        moreBelowStayBody:
          moreRect && stayBodyRect ? moreRect.top > stayBodyRect.bottom : false,
        moreStayLeftDelta:
          moreRect && stayBodyRect
            ? Math.abs(moreRect.left - stayBodyRect.left)
            : null,
        planBuildTopDelta:
          plan && build
            ? Math.abs(
                plan.getBoundingClientRect().top -
                  build.getBoundingClientRect().top,
              )
            : null,
        stepInnerPaddingLefts: steps.map((step) =>
          getComputedStyle(step.querySelector(":scope > div")).paddingLeft,
        ),
        copperTextElementCount: section
          ? [...section.querySelectorAll("*")].filter(
              (node) =>
                node.textContent?.trim() &&
                copperTextColors.includes(getComputedStyle(node).color),
            ).length
          : null,
        everyEngagementIncludesCount: (
          pageText.match(/Every engagement includes/g) ?? []
        ).length,
        whyContainsWeekOne: whyText.includes("Week one is the scoping session"),
        whyContainsClosing: whyText.includes(
          "When the work is bigger than one person, I say so on the call.",
        ),
        horizontalOverflow:
          Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
          ) - document.documentElement.clientWidth,
      };
    }, expected);
    services.axeViolations = await axeCount(servicesPage, null);
    services.axeSeriousCritical = services.axeViolations?.length ?? null;
    await servicesPage.close();

    const result = { viewport: viewport.name, home, services };
    results.push(result);

    const prefix = viewport.name;
    const checks = [
      [home.heading === expected.heading, `${prefix} home heading`],
      [home.stepCount === 4, `${prefix} home step count`],
      [
        JSON.stringify(home.labels) ===
          JSON.stringify(expected.steps.map((step) => step.label)),
        `${prefix} home labels`,
      ],
      [home.headlineMatches.every(Boolean), `${prefix} home headlines`],
      [home.bodyMatches.every(Boolean), `${prefix} home bodies`],
      [home.digitCount === 0, `${prefix} home digit count`],
      [home.stickyElementCount === 0, `${prefix} home sticky elements`],
      [
        home.stepsIn.length === 4 && home.stepsIn.every(Boolean),
        `${prefix} home reveal classes`,
      ],
      [
        home.bodyOpacities.length === 4 &&
          home.bodyOpacities.every((value) => value === "1"),
        `${prefix} home body opacity`,
      ],
      [
        home.ruleTransforms.length === 4 &&
          home.ruleTransforms.every((value) =>
            ["none", "matrix(1, 0, 0, 1, 0, 0)"].includes(value),
          ),
        `${prefix} home rule transforms`,
      ],
      [home.axeSeriousCritical === 0, `${prefix} home axe`],
      [home.horizontalOverflow <= 0, `${prefix} home horizontal overflow`],
      [home.moreBelowStayBody, `${prefix} home more below stay body`],
      [
        home.moreStayLeftDelta !== null && home.moreStayLeftDelta <= 2,
        `${prefix} home more aligned with stay body`,
      ],
      [
        viewport.width !== 1440 ||
          (home.planBuildTopDelta !== null && home.planBuildTopDelta <= 2),
        `${prefix} home plan and build aligned`,
      ],
      [
        viewport.width !== 390 ||
          (home.stepInnerPaddingLefts.length === 4 &&
            home.stepInnerPaddingLefts.every((value) => value === "0px")),
        `${prefix} home step inner padding`,
      ],
      [
        home.copperTextElementCount === 0,
        `${prefix} home copper text elements`,
      ],
      [services.heading === expected.heading, `${prefix} services heading`],
      [services.stepCount === 4, `${prefix} services step count`],
      [services.noteMatches, `${prefix} services note`],
      [services.hiwNoteCount === 0, `${prefix} services hiw note count`],
      [services.areasNoteMatches, `${prefix} services areas note text`],
      [services.areasNoteAfterTitle, `${prefix} services areas note order`],
      [
        services.everyEngagementIncludesCount === 0,
        `${prefix} services retired heading`,
      ],
      [!services.whyContainsWeekOne, `${prefix} services repeated sentence`],
      [services.whyContainsClosing, `${prefix} services closing sentence`],
      [services.axeSeriousCritical === 0, `${prefix} services axe`],
      [
        services.horizontalOverflow <= 0,
        `${prefix} services horizontal overflow`,
      ],
      [services.moreBelowStayBody, `${prefix} services more below stay body`],
      [
        services.moreStayLeftDelta !== null && services.moreStayLeftDelta <= 2,
        `${prefix} services more aligned with stay body`,
      ],
      [
        viewport.width !== 1440 ||
          (services.planBuildTopDelta !== null &&
            services.planBuildTopDelta <= 2),
        `${prefix} services plan and build aligned`,
      ],
      [
        viewport.width !== 390 ||
          (services.stepInnerPaddingLefts.length === 4 &&
            services.stepInnerPaddingLefts.every((value) => value === "0px")),
        `${prefix} services step inner padding`,
      ],
      [
        services.copperTextElementCount === 0,
        `${prefix} services copper text elements`,
      ],
      [
        viewport.width !== 1440 ||
          (services.hiwToAreasTitleGap !== null &&
            services.hiwToAreasTitleGap >= 120),
        `${prefix} services hiw to areas title gap`,
      ],
    ];
    failures.push(
      ...checks.filter(([passed]) => !passed).map(([, label]) => label),
    );
  }
} finally {
  await browser.close();
}

const report = { results, failures };
const json = `${JSON.stringify(report, null, 2)}\n`;
fs.writeFileSync(outPath, json, "utf8");
process.stdout.write(json);

if (failures.length) process.exitCode = 1;
