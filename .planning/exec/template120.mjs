// Pass-120 sections 3-4 gate: the Direction B study template (band, paper surface,
// atmosphere, footer, at-a-glance, blocks, close, Next) and the settle's CSS mechanics
// read through CDP. Section 6's page120.mjs (type ladder, rail, captions, link colours)
// and settle120.mjs (frame timing, no flash, replay, CLS) cover the rest.
// Scope (LESSONS #28): app/(theater)/layout.tsx renders [data-mode="theater"] >
// a.skip-to-content, Nav, main#main-content, Footer[data-footer-root]. Template checks
// read main#main-content; U3 reads the footer and U6 the layout wrapper, by name.
// Usage: node .planning/exec/template120.mjs [base] [--shots <dir>]
// Bite proof: run against https://www.micahjonesconsulting.com before any Pass-120 edit.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";

const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const CDP_ANIMATION_ON = "Animation." + "en" + "able";
const argv = process.argv.slice(2);
const si = argv.indexOf("--shots");
const SHOTS = si >= 0 ? argv[si + 1] : null;
const pos = argv.filter((a, i) => !a.startsWith("--") && !(si >= 0 && i === si + 1));
const BASE = (pos[0] || "http://localhost:3200").replace(/\/$/, "");

const STUDIES = {
  guardicore: { next: "rfp-engine", service: "positioning-gtm", label: "Positioning & GTM", nextLabel: "AI engineering", dts: ["Client", "My role", "The work", "Results"], nameProtected: 0, photo: "guardicore-telaviv-session", breaks: 0, exhibits: 0, sage: false },
  "rfp-engine": { next: "ordani", service: "ai-engineering", label: "AI engineering", nextLabel: "Product building", dts: ["Client", "My role", "First real RFPs delivered", "What I built", "Results"], nameProtected: 1, photo: null, breaks: 0, exhibits: 1, sage: false },
  ordani: { next: "content-engine", service: "product-building", label: "Product building", nextLabel: "Product building", dts: ["Client", "My role", "The work", "Results"], nameProtected: 0, photo: null, breaks: 1, exhibits: 0, sage: true },
  "content-engine": { next: "birth-worker", service: "product-building", label: "Product building", nextLabel: "Positioning & GTM", dts: ["Client", "My role", "What I built", "Results"], nameProtected: 1, photo: null, breaks: 0, exhibits: 0, sage: false },
  "birth-worker": { next: "guardicore", service: "positioning-gtm", label: "Positioning & GTM", nextLabel: "Positioning & GTM", dts: ["Client", "My role", "The work", "Results"], nameProtected: 1, photo: null, breaks: 0, exhibits: 0, sage: false },
};
const RGB = {
  ground: "rgb(18, 16, 14)",
  paper: "rgb(245, 239, 228)",
  copper: "rgb(189, 90, 45)",
  copperDeep: "rgb(138, 61, 36)",
  sage: "rgb(94, 113, 88)",
};

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`  ${ok ? "PASS" : "FAIL"} ${id}: got ${JSON.stringify(got)}${ok ? "" : ` (want ${JSON.stringify(want)})`}`);
  if (!ok) failures++;
};
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function expectedStarts(n) {
  if (n === 1) return [[400, 0]];
  if (n === 2) return [[400, 0], [400, 200]];
  if (n === 3) return [[400, 0], [400, 100], [400, 200]];
  return "bad line count";
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
try {
  for (const [slug, X] of Object.entries(STUDIES)) {
    for (const w of [1440, 390]) {
      console.log(`/work/${slug} @${w} reduced`);
      const page = await browser.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 140)));
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text().slice(0, 140));
      });
      await page.setViewport({ width: w, height: w === 390 ? 844 : 900, deviceScaleFactor: 1 });
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
      const res = await page.goto(`${BASE}/work/${slug}`, { waitUntil: "networkidle0", timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      chk("U0 status", res?.status() === 200, res?.status(), 200);

      const m = await page.evaluate(() => {
        const main = document.querySelector("main#main-content");
        const wrap = document.querySelector('[data-mode="theater"]');
        const q = (s) => main?.querySelector(s) ?? null;
        const qa = (s) => (main ? [...main.querySelectorAll(s)] : []);
        const t = (el) => (el ? el.textContent.replace(/\s+/g, " ").trim() : "missing");
        const bg = (el) => (el ? getComputedStyle(el).backgroundColor : "missing");
        const band = q(".cs-band");
        const paper = q('[data-surface="paper"]');
        const numeral = q(".cs-step__n");
        const h1 = q("h1.cs-title");
        return {
          bandBg: bg(band),
          paperBg: bg(paper),
          footBg: bg(document.querySelector("[data-footer-root]")),
          gap: band && paper ? Math.round(paper.getBoundingClientRect().top - band.getBoundingClientRect().bottom) : "missing",
          bandRule: band ? getComputedStyle(band).borderBottomColor : "missing",
          wrapPseudo: wrap ? [getComputedStyle(wrap, "::before").content, getComputedStyle(wrap, "::after").content] : "missing",
          bandGrain: band ? getComputedStyle(band, "::before").content : "missing",
          old: document.querySelectorAll("[data-title-card], .title-card-root, .case-study__sidebar, .case-study-still, .case-study__glance, .case-study__nav").length,
          nda: main ? /Protected by NDA|Client-confidential/.test(main.innerText) : "missing",
          headOk: !!band?.querySelector(".cs-band__head > .cs-band__context + h1.cs-title"),
          contextLen: t(q(".cs-band__context")).length,
          h1Match: !!h1 && t(h1) === h1.getAttribute("data-title"),
          dts: qa(".cs-glance dt").map(t),
          nameProtected: qa(".cs-glance__protected").filter((e) => t(e) === "Name protected").length,
          bandImgs: qa(".cs-band img").map((i) => decodeURIComponent(i.currentSrc)),
          mainImgs: qa("img").length,
          breaks: qa(".cs-body > .cs-break").length,
          breakCaptions: qa(".cs-break figcaption").length,
          exhibits: qa(".cs-exhibit").length,
          exhibitTh: qa(".cs-exhibit th").map(t),
          exhibitRows: qa(".cs-exhibit tbody tr").length,
          steps: qa(".cs-body > .cs-step").length,
          badNumerals: qa(".cs-step__n").filter((e) => !/^\d\d$/.test(t(e))).length,
          numeralColor: numeral ? getComputedStyle(numeral).color : "missing",
          close: qa(".cs-body > .cs-close a").map((a) => `${a.getAttribute("href")}|${t(a)}`),
          next: qa(".cs-next__entry").map((a) => a.getAttribute("href")),
          nextParts: [".cs-next__context", ".cs-next__line", ".cs-next__did", ".cs-next__service"].map((s) => t(q(s))),
          all: qa(".cs-next__all").map((a) => `${a.getAttribute("href")}|${t(a)}`),
        };
      });

      chk("U1 band ground", m.bandBg === RGB.ground, m.bandBg, RGB.ground);
      chk("U2 paper body", m.paperBg === RGB.paper, m.paperBg, RGB.paper);
      chk("U3 footer on paper", m.footBg === RGB.paper, m.footBg, RGB.paper);
      chk("U4 band meets paper", m.gap === 0, m.gap, 0);
      const rule = X.sage ? RGB.sage : RGB.copper;
      chk("U5 band rule accent", m.bandRule === rule, m.bandRule, rule);
      chk("U6 fixed atmosphere off", same(m.wrapPseudo, ["none", "none"]), m.wrapPseudo, ["none", "none"]);
      chk("U7 band grain", m.bandGrain === '""', m.bandGrain, '""');
      chk("U8 retired template gone", m.old === 0 && m.nda === false, [m.old, m.nda], [0, false]);
      chk("U9 band head", m.headOk && m.contextLen > 0 && m.h1Match, [m.headOk, m.contextLen, m.h1Match], [true, ">0", true]);
      chk("U10 at-a-glance keys", same(m.dts, X.dts), m.dts, X.dts);
      chk("U11 Name protected", m.nameProtected === X.nameProtected, m.nameProtected, X.nameProtected);
      const imgOk = X.photo ? m.bandImgs.length === 1 && m.bandImgs[0].includes(X.photo) : m.bandImgs.length === 0;
      chk("U12 band photograph", imgOk, m.bandImgs, X.photo ?? []);
      chk("U13 chapter breaks, no caption", m.breaks === X.breaks && m.breakCaptions === 0, [m.breaks, m.breakCaptions], [X.breaks, 0]);
      const wantImgs = (X.photo ? 1 : 0) + X.breaks;
      chk("U14 images in main", m.mainImgs === wantImgs, m.mainImgs, wantImgs);
      const exOk = m.exhibits === X.exhibits && (X.exhibits === 0 || (same(m.exhibitTh, ["The request", "What the engine did"]) && m.exhibitRows === 2));
      chk("U15 exhibit", exOk, [m.exhibits, m.exhibitTh, m.exhibitRows], [X.exhibits, X.exhibits ? ["The request", "What the engine did"] : [], X.exhibits ? 2 : 0]);
      chk("U16 steps", m.steps >= 1 && m.badNumerals === 0, [m.steps, m.badNumerals], [">=1", 0]);
      const numeralWant = X.sage ? RGB.sage : RGB.copperDeep;
      chk("U17 numeral colour", m.numeralColor === numeralWant, m.numeralColor, numeralWant);
      const closeWant = [`/services#${X.service}|${X.label} →`];
      chk("U18 close link", same(m.close, closeWant), m.close, closeWant);
      const nextOk = same(m.next, [`/work/${X.next}`]) && m.nextParts.every((p) => p !== "missing" && p.length > 0) && m.nextParts[3] === X.nextLabel;
      chk("U19 Next entry", nextOk, [m.next, m.nextParts[3]], [[`/work/${X.next}`], X.nextLabel]);
      chk("U20 All work", same(m.all, ["/work|All work"]), m.all, ["/work|All work"]);
      chk("U21 no console or page errors", errors.length === 0, errors, []);

      if (SHOTS) {
        await page.screenshot({ path: `${SHOTS}/study-${slug}-fold-${w}.png` });
        await page.screenshot({ path: `${SHOTS}/study-${slug}-full-${w}.png`, fullPage: true });
      }

      if (w === 1440 && m.close.length === 1) {
        await Promise.all([
          page.waitForFunction(() => location.pathname === "/services", { timeout: 20000 }),
          page.click(".cs-close a"),
        ]);
        await sleep(2500);
        const land = await page.evaluate(() => {
          const el = document.getElementById(location.hash.slice(1));
          return { hash: location.hash, top: el ? Math.round(el.getBoundingClientRect().top) : "missing" };
        });
        const landOk = land.hash === `#${X.service}` && typeof land.top === "number" && land.top >= 0 && land.top <= 240;
        chk("U22 close lands on its /services block", landOk, land, { hash: `#${X.service}`, top: "0..240" });
      }
      await page.close();
    }

    for (const js of [true, false]) {
      console.log(`/work/${slug} @1440 motion js=${js}`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
      await page.setJavaScriptEnabled(js);
      const cdp = await page.createCDPSession();
      const started = [];
      cdp.on("Animation.animationStarted", (e) => {
        if (e.animation.name === "cs-settle") started.push([Math.round(e.animation.source.duration), Math.round(e.animation.source.delay)]);
      });
      await cdp.send(CDP_ANIMATION_ON);
      await page.goto(`${BASE}/work/${slug}`, { waitUntil: "load", timeout: 60000 });
      await sleep(1500);
      const s = await page.evaluate(() => {
        const lines = [...document.querySelectorAll("main h1.cs-title > .cs-title__line")];
        let props = "missing";
        const walk = (rules) => {
          for (const r of rules) {
            if (r.type === CSSRule.KEYFRAMES_RULE && r.name === "cs-settle") {
              props = [...new Set([...r.cssRules].flatMap((k) => [...k.style]))].sort().join(",");
            } else if (r.cssRules) {
              walk(r.cssRules);
            }
          }
        };
        for (const sheet of document.styleSheets) {
          try {
            walk(sheet.cssRules);
          } catch {
            /* cross-origin sheet */
          }
        }
        return { n: lines.length, end: lines.map((l) => `${getComputedStyle(l).opacity}/${getComputedStyle(l).transform}`), props };
      });
      const sorted = [...started].sort((a, b) => a[1] - b[1]);
      const want = js ? expectedStarts(s.n) : [];
      chk(`M1 settle animations js=${js}`, same(sorted, want), sorted, want);
      chk(`M2 finished frame js=${js}`, s.n >= 1 && s.end.every((e) => e === "1/none"), s.end, "every line 1/none");
      chk(`M3 keyframes animate opacity and transform only js=${js}`, s.props === "opacity,transform", s.props, "opacity,transform");

      if (js && slug === "guardicore" && !(await page.$(".cs-next__entry"))) {
        chk("M4 settle runs on a client navigation into a study", false, "no .cs-next__entry", "a Next entry to click");
      } else if (js && slug === "guardicore") {
        started.length = 0;
        await Promise.all([
          page.waitForFunction(() => location.pathname === "/work/rfp-engine", { timeout: 20000 }),
          page.click(".cs-next__entry"),
        ]);
        await sleep(1500);
        const n2 = await page.evaluate(() => document.querySelectorAll("main h1.cs-title > .cs-title__line").length);
        const sorted2 = [...started].sort((a, b) => a[1] - b[1]);
        chk("M4 settle runs on a client navigation into a study", same(sorted2, expectedStarts(n2)), sorted2, expectedStarts(n2));
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}
console.log(`template120 failures: ${failures}`);
process.exit(failures ? 1 : 0);
