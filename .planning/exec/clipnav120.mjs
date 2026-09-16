// .planning/exec/clipnav120.mjs
// Pass-120 section 3b W4: the /work clip plays once per DOCUMENT load, including
// across a client navigation away (ViewTransitionLink) and Back. Motion on,
// 1440x900. Measures the media element (play events, video.played), not the
// component. Scope (LESSONS #28): the video lives in main (app/(foyer)/layout.tsx
// renders Nav as a sibling of main), so every query is "main video".
// Usage: node .planning/exec/clipnav120.mjs [base]   (base defaults to http://localhost:3200)
import { createRequire } from "node:module";
const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = (process.argv[2] || "http://localhost:3200").replace(/\/$/, "");

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`${ok ? "PASS" : "FAIL"} ${id}: got ${JSON.stringify(got)}${ok ? "" : ` (want ${JSON.stringify(want)})`}`);
  if (!ok) failures++;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(() => {
    window.__plays = 0;
    document.addEventListener(
      "play",
      (e) => {
        if (e.target instanceof HTMLVideoElement) window.__plays++;
      },
      true,
    );
  });
  await page.goto(BASE + "/work", { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => {
    window.__docMark = "p120";
  });

  const ended = await page
    .waitForFunction(() => {
      const v = document.querySelector("main video");
      return !!v && v.ended;
    }, { timeout: 15000 })
    .then(() => true, () => false);
  chk("N1 clip ended after the first load", ended, ended, true);
  const plays1 = await page.evaluate(() => window.__plays);
  chk("N2 play events after the first load", plays1 === 1, plays1, 1);

  await page.evaluate(() => {
    const a = document.querySelector('main a[href="/work/rfp-engine"]');
    if (a) a.click();
  });
  const away = await page
    .waitForFunction(() => location.pathname === "/work/rfp-engine", { timeout: 15000 })
    .then(() => true, () => false);
  chk("N3 reached /work/rfp-engine", away, away, true);
  const markAway = await page.evaluate(() => window.__docMark === "p120");
  chk("N4 same document after the entry click (client navigation)", markAway, markAway, true);

  await page.evaluate(() => history.back());
  const back = await page
    .waitForFunction(
      () => location.pathname === "/work" && !!document.querySelector("main video"),
      { timeout: 15000 },
    )
    .then(() => true, () => false);
  chk("N5 Back reached /work with a video element", back, back, true);
  await wait(6000);
  const after = await page.evaluate(() => {
    const v = document.querySelector("main video");
    return {
      mark: window.__docMark === "p120",
      plays: window.__plays,
      played: v ? v.played.length : -1,
      paused: v ? v.paused : null,
    };
  });
  chk("N6 same document after Back", after.mark, after.mark, true);
  chk("N7 no second play event in this document", after.plays === 1, after.plays, 1);
  chk(
    "N8 the remounted video never played",
    after.played === 0 && after.paused === true,
    { played: after.played, paused: after.paused },
    { played: 0, paused: true },
  );
} finally {
  await browser.close();
}
console.log(`clipnav120 failures: ${failures}`);
process.exit(failures ? 1 : 0);
