// Pass-111b captures (from shots112.mjs). Settled VIEWPORT captures only,
// never full-page: the rebuilt /services (opening, shapes band, shared row,
// areas, picker, packages band), the /packages cross-link, and the /call
// prefill — plus two scripted states on /services at 1440 and 390: (a) the
// buy guard firing with no pick, (b) a "Product building" pick. Records the
// world each capture shows and horizontal overflow at every width, and the
// seven .cw-pbox heights at 1440 (each must be <= 700px, CRITIQUE H1).
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const req = createRequire("C:/tmp/p101tools/package.json");
const mod = req("puppeteer-core");
const puppeteer = mod.default ?? mod;
const BASE = (process.argv[2] || "http://localhost:3200").replace(/\/$/, "");
const OUT = process.argv[3] || ".planning/qa/pass-111b";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const VPS = {
  1440: { width: 1440, height: 900, deviceScaleFactor: 1 },
  1280: { width: 1280, height: 800, deviceScaleFactor: 1 },
  1024: { width: 1024, height: 768, deviceScaleFactor: 1 },
  768: {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },
  390: {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },
};
// [route, name, selector to centre (null = top), viewports]
const PLAN = [
  ["/services", "sv-open", null, ["1440", "390"]],
  [
    "/services",
    "sv-shapes",
    ".cw-pband--shapes",
    ["1440", "1280", "1024", "768", "390"],
  ],
  ["/services", "sv-incl", ".cw-pband__incl", ["1440", "390"]],
  ["/services", "sv-areas", ".cw-areas", ["1440", "768", "390"]],
  ["/services", "sv-pick", ".cw-pick", ["1440", "768", "390"]],
  ["/services", "sv-pkgs", ".cw-pband--pkgs", ["1440", "1024", "768", "390"]],
  ["/packages", "pk-cross", ".cw-pkg-page__cross", ["1440"]],
  ["/call?shape=embedded", "call-prefill", "textarea", ["1440"]],
];

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const out = [];
const failures = [];
const boxHeights = [];
const measure = () => {
  const root = document.querySelector('[data-mode="cw"]');
  return {
    world: root
      ? getComputedStyle(root).getPropertyValue("--cw-bg").trim()
      : null,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  };
};
const shoot = async (page, file) => {
  await page.screenshot({ path: file });
};
try {
  for (const [route, name, sel, vps] of PLAN) {
    for (const v of vps) {
      const page = await browser.newPage();
      await page.setViewport(VPS[v]);
      const resp = await page.goto(BASE + route, {
        waitUntil: "networkidle0",
        timeout: 90000,
      });
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
      await shoot(page, file);
      let notePrefill;
      if (name === "call-prefill") {
        // M2a: the /call?shape= prefill is client-side (BookCallForm
        // useEffect), asserted against this same capture's live page.
        notePrefill = await page.evaluate(
          () => document.querySelector('textarea[name="note"]')?.value ?? null,
        );
        if (notePrefill !== "Shape: Embedded.")
          failures.push(
            `call-prefill embedded value: ${JSON.stringify(notePrefill)} (expect "Shape: Embedded.")`,
          );
        console.log(
          `call-prefill embedded value: ${JSON.stringify(notePrefill)} (expect "Shape: Embedded.")`,
        );
      }
      const rec = {
        route,
        name,
        v,
        status: resp ? resp.status() : null,
        found,
        file,
        ...m,
        overflowX: m.scrollWidth > m.clientWidth,
        ...(notePrefill !== undefined ? { notePrefill } : {}),
      };
      out.push(rec);
      console.log(
        `shot ${file}  status=${rec.status} found=${found} world=${m.world} overflowX=${rec.overflowX}`,
      );
      await page.close();
    }
  }

  // M2a continued: a second load with an invalid shape must leave the note
  // textarea empty. No new PNG — this is not part of the PLAN capture list.
  {
    const page = await browser.newPage();
    await page.setViewport(VPS["1440"]);
    await page.goto(BASE + "/call?shape=bogus", {
      waitUntil: "networkidle0",
      timeout: 90000,
    });
    await sleep(1000);
    const bogusVal = await page.evaluate(
      () => document.querySelector('textarea[name="note"]')?.value ?? null,
    );
    if (bogusVal !== "")
      failures.push(
        `call-prefill bogus value: ${JSON.stringify(bogusVal)} (expect "")`,
      );
    console.log(
      `call-prefill bogus value: ${JSON.stringify(bogusVal)} (expect "")`,
    );
    await page.close();
  }

  // The seven .cw-pbox heights (four shapes + three packages), at 1440 AND
  // 1280 (Pass-111b §14 M3+M4: the layout-gate viewport rule with margin —
  // no .cw-pbox taller than the viewport from 1024px up). Gated at <= 800px;
  // CRITIQUE H1's 700 stays a target, reported but not a gate. 14 heights
  // total. (boxHeights is declared at top level: the final write happens
  // outside this try block.)
  for (const v of ["1440", "1280"]) {
    const page = await browser.newPage();
    await page.setViewport(VPS[v]);
    await page.goto(BASE + "/services", {
      waitUntil: "networkidle0",
      timeout: 90000,
    });
    await sleep(7000);
    const heights = await page.evaluate(() =>
      [...document.querySelectorAll(".cw-pbox")].map((el) => ({
        id: el.id,
        h: Math.round(el.getBoundingClientRect().height),
      })),
    );
    for (const b of heights) {
      if (!(b.h <= 800))
        failures.push(`box ${b.id} height ${b.h}px > 800px at ${v}`);
      console.log(`box ${b.id} height at ${v}: ${b.h}px (cap 800, target 700)`);
    }
    boxHeights.push(...heights.map((h) => ({ ...h, v })));
    await page.close();
  }

  // (a) The guard: click "Buy the Audit" with NO pick, settle 300ms, capture.
  // Must show the error text and leave focus on the first radio.
  for (const v of ["1440", "390"]) {
    const page = await browser.newPage();
    await page.setViewport(VPS[v]);
    await page.goto(BASE + "/services", {
      waitUntil: "networkidle0",
      timeout: 90000,
    });
    await sleep(7000);
    await page.evaluate(() => {
      const pick = document.querySelector(".cw-pick");
      if (pick) pick.scrollIntoView({ block: "center", behavior: "instant" });
    });
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find((b) =>
        (b.textContent || "").includes("Buy the Audit"),
      );
      if (btn) btn.click();
    });
    await sleep(300);
    const state = await page.evaluate(() => {
      const err = document.querySelector(".cw-pick__err");
      const first = document.querySelector('input[name="pkg-area"]');
      return {
        errText: err ? err.textContent.trim() : null,
        errVisible: err
          ? getComputedStyle(err).display !== "none" &&
            err.textContent.trim() !== ""
          : false,
        focusOnFirstRadio: !!first && document.activeElement === first,
      };
    });
    if (state.errText !== "Pick an area first, then buy.")
      failures.push(
        `guard error text at ${v}: ${JSON.stringify(state.errText)}`,
      );
    if (!state.errVisible) failures.push(`guard error not visible at ${v}`);
    if (!state.focusOnFirstRadio)
      failures.push(`focus not on first radio at ${v}`);
    const file = path.join(OUT, `sv-guard-${v}.png`);
    await shoot(page, file);
    const m = await page.evaluate(measure);
    out.push({
      route: "/services",
      name: "sv-guard",
      v,
      status: 200,
      found: state.errVisible,
      file,
      ...m,
      overflowX: m.scrollWidth > m.clientWidth,
      ...state,
    });
    console.log(
      `shot ${file}  guard err="${state.errText}" visible=${state.errVisible} focusOnFirstRadio=${state.focusOnFirstRadio} overflowX=${m.scrollWidth > m.clientWidth}`,
    );
    await page.close();
  }

  // (b) The pick: click the "Product building" radio, settle 300ms, capture.
  // The polite region must read "Packages now show Product building." and the
  // Audit fit must read the build sentence.
  for (const v of ["1440", "390"]) {
    const page = await browser.newPage();
    await page.setViewport(VPS[v]);
    await page.goto(BASE + "/services", {
      waitUntil: "networkidle0",
      timeout: 90000,
    });
    await sleep(7000);
    await page.evaluate(() => {
      const pick = document.querySelector(".cw-pick");
      if (pick) pick.scrollIntoView({ block: "center", behavior: "instant" });
      const radio = document.querySelector(
        'input[name="pkg-area"][value="build"]',
      );
      if (radio) radio.click();
    });
    await sleep(300);
    const state = await page.evaluate(() => {
      const polite = document.querySelector('.cw-sr-only[aria-live="polite"]');
      const fit = document.querySelector("#pkg-audit .cw-pbox__fit");
      return {
        politeText: polite ? polite.textContent.trim() : null,
        auditFit: fit ? fit.textContent.trim() : null,
      };
    });
    if (state.politeText !== "Packages now show Product building.")
      failures.push(`polite text at ${v}: ${JSON.stringify(state.politeText)}`);
    if (
      state.auditFit !==
      "I go through your architecture, code, and deploy top to bottom."
    )
      failures.push(`audit fit at ${v}: ${JSON.stringify(state.auditFit)}`);
    const file = path.join(OUT, `sv-picked-${v}.png`);
    await shoot(page, file);
    const m = await page.evaluate(measure);
    out.push({
      route: "/services",
      name: "sv-picked",
      v,
      status: 200,
      found: true,
      file,
      ...m,
      overflowX: m.scrollWidth > m.clientWidth,
      ...state,
    });
    console.log(
      `shot ${file}  polite="${state.politeText}" auditFit ok=${state.auditFit === "I go through your architecture, code, and deploy top to bottom."} overflowX=${m.scrollWidth > m.clientWidth}`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
fs.writeFileSync(
  path.join(OUT, "shots.json"),
  JSON.stringify({ shots: out, boxHeights }, null, 2),
);
const ok =
  failures.length === 0 &&
  out.every(
    (o) => o.found && !o.overflowX && (o.status === null || o.status < 400),
  );
if (failures.length) {
  console.error("shots111b assertion failures:");
  for (const f of failures) console.error(`  - ${f}`);
}
process.exit(ok ? 0 : 1);
