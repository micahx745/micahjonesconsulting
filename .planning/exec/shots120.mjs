// .planning/exec/shots120.mjs — Pass-120 V7 (brief §6.3, captures table §6.7).
// Writes every §6.7 capture into .planning/qa/pass-120/build/shots/ at 390 and 1440.
// Reduced motion unless the file name says `motion`.
//
// Usage: node .planning/exec/shots120.mjs [base]
//   base defaults to http://localhost:3200 (the local build; never production for this pass).
// One line per capture, `PASS <file>: got written ...` or `FAIL <file>: got <reason> (want written)`;
// the run ends on `shots120 failures: N` and exits 1 when N is not 0.
//
// O-k: the Guardicore band capture selects the main img whose currentSrc contains
// guardicore-band-960.jpg. Scrolled captures are full-viewport screenshots after
// window.scrollTo (screenshot({clip}) on a scrolled page captures the unscrolled surface,
// circle115.mjs 2026-09-12); only the settle captures, taken at scroll 0, use a clip.
// The executor opens every capture once and writes .planning/qa/pass-120/build/CAPTURES.md.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const pos = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const BASE = (pos[0] || "http://localhost:3200").replace(/\/$/, "");
const OUT = fileURLToPath(new URL("../qa/pass-120/build/shots/", import.meta.url));
mkdirSync(OUT, { recursive: true });

const STUDIES = ["guardicore", "rfp-engine", "ordani", "content-engine", "birth-worker"];
const WIDTHS = [390, 1440];
const VP = {
  1440: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  390: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const SETTLE_MS = [0, 150, 300, 450, 600, 750];

let failures = 0;
const ok = (file, note = "") => console.log(`PASS ${file}: got written${note ? ` ${note}` : ""}`);
const bad = (file, why) => {
  console.log(`FAIL ${file}: got ${why} (want written)`);
  failures++;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const errText = (e) => String((e && e.message) || e).split("\n")[0];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });

async function openPage(w, { reduced = true, js = true } = {}) {
  const page = await browser.newPage();
  await page.bringToFront();
  // The in-page finders are built with new Function; no CSP may refuse them.
  await page.setBypassCSP(true);
  await page.setCacheEnabled(false);
  await page.setViewport(VP[w]);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: reduced ? "reduce" : "no-preference" },
  ]);
  if (!js) await page.setJavaScriptEnabled(false);
  return page;
}

async function load(page, route) {
  const resp = await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await sleep(1500);
  return resp ? resp.status() : 0;
}

// After a scroll: let in-view images finish, then settle.
async function ready(page) {
  await sleep(600);
  await page
    .waitForFunction(
      () =>
        [...document.images]
          .filter((i) => {
            const r = i.getBoundingClientRect();
            return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
          })
          .every((i) => i.complete),
      { timeout: 5000, polling: 100 },
    )
    .catch(() => console.log("  note: images in view still loading after 5000ms"));
  await sleep(300);
}

const scrollTo = (page, y) =>
  page.evaluate((y) => window.scrollTo({ top: Math.max(0, y), left: 0, behavior: "instant" }), y);

async function viewport(page, file, note) {
  await page.screenshot({ path: OUT + file, captureBeyondViewport: false });
  ok(file, note);
}

async function fullPage(page, file) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = VP[1440].height / 2;
  for (let y = 0; y < h; y += step) {
    await scrollTo(page, y);
    await sleep(120);
  }
  await scrollTo(page, 0);
  await ready(page);
  await page.screenshot({ path: OUT + file, fullPage: true });
  ok(file);
}

// Document-coordinate rect of the first element a page function finds, or null.
const docRect = (page, finder, arg) =>
  page.evaluate(
    (src, arg) => {
      const el = new Function("arg", src)(arg);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, height: r.height };
    },
    finder,
    arg,
  );

const VISIBLE = `
  const HIDE = '.sr-only, .cw-sr-only, [hidden], .skip-to-content, [role="dialog"]';
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 2 && r.height > 2 && cs.visibility !== "hidden" && cs.display !== "none" && !el.closest(HIDE);
  };
  const decode = (u) => { try { return decodeURIComponent(u || ""); } catch { return u || ""; } };
`;
const FIND_BAND = `
  const canvas = document.createElement("canvas");
  canvas.width = 1; canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const rgba = (s) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = "rgba(0, 0, 0, 0)"; ctx.fillStyle = s; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data]; };
  const lum = ([r, g, b]) => { const f = (c) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const h1 = document.querySelector("main h1");
  if (!h1) return null;
  for (let n = h1.parentElement; n; n = n.parentElement) {
    const c = rgba(getComputedStyle(n).backgroundColor);
    if (c[3] === 255 && lum(c) < 0.5) return n;
  }
  return null;
`;

// ---------------------------------------------------------------- /work
for (const w of WIDTHS) {
  let page;
  try {
    page = await openPage(w);
    const status = await load(page, "/work");
    if (status !== 200) {
      bad(`work-*-${w}.png`, `status ${status} for /work`);
    } else {
      await viewport(page, `work-lead-hero-still-${w}.png`);

      const method = await docRect(page, `return document.getElementById("cw-wx-method") || document.querySelector(".cw-wx-method");`);
      if (!method) bad(`work-method-line-and-entries-${w}.png`, "no #cw-wx-method element");
      else {
        await scrollTo(page, method.top - 96);
        await ready(page);
        await viewport(page, `work-method-line-and-entries-${w}.png`);
      }

      const record = await docRect(page, `return document.getElementById("record");`);
      if (!record) bad(`work-record-block-${w}.png`, "no #record element");
      else {
        await scrollTo(page, record.top);
        await ready(page);
        await viewport(page, `work-record-block-${w}.png`);
      }

      await fullPage(page, `work-full-${w}.png`);
    }
  } catch (e) {
    bad(`work-*-${w}.png`, `error: ${errText(e)}`);
  } finally {
    if (page) await page.close();
    page = null;
  }

  try {
    page = await openPage(w, { js: false });
    const status = await load(page, "/work");
    if (status !== 200) bad(`work-hero-nojs-${w}.png`, `status ${status}`);
    else await viewport(page, `work-hero-nojs-${w}.png`);
  } catch (e) {
    bad(`work-hero-nojs-${w}.png`, `error: ${errText(e)}`);
  } finally {
    if (page) await page.close();
    page = null;
  }

  const lastFrame = `work-lead-hero-clip-lastframe-motion-${w}.png`;
  try {
    page = await openPage(w, { reduced: false });
    await page.evaluateOnNewDocument(() => {
      window.__clipEnded = null;
      document.addEventListener(
        "ended",
        (e) => {
          if (e.target && e.target.tagName === "VIDEO" && window.__clipEnded === null) window.__clipEnded = performance.now();
        },
        true,
      );
    });
    const resp = await page.goto(BASE + "/work", { waitUntil: "load", timeout: 60000 });
    if (!resp || resp.status() !== 200) bad(lastFrame, `status ${resp ? resp.status() : 0}`);
    else {
      const ended = await page
        .waitForFunction(() => window.__clipEnded, { timeout: 20000, polling: 50 })
        .then((h) => h.jsonValue())
        .catch(() => null);
      if (ended === null) bad(lastFrame, "no ended event within 20000ms of load");
      else {
        const now = await page.evaluate(() => performance.now());
        await sleep(Math.max(0, ended + 500 - now));
        const at = (await page.evaluate(() => performance.now())) - ended;
        await viewport(page, lastFrame, `(${at.toFixed(0)}ms after ended)`);
      }
    }
  } catch (e) {
    bad(lastFrame, `error: ${errText(e)}`);
  } finally {
    if (page) await page.close();
    page = null;
  }
}

// ---------------------------------------------------------------- the five studies
for (const slug of STUDIES) {
  const route = `/work/${slug}`;
  for (const w of WIDTHS) {
    let page;
    try {
      page = await openPage(w);
      const status = await load(page, route);
      if (status !== 200) {
        bad(`study-${slug}-*-${w}.png`, `status ${status} for ${route}`);
        continue;
      }
      await viewport(page, `study-${slug}-curtain-${w}.png`);

      const band = await docRect(page, FIND_BAND);
      if (!band) bad(`study-${slug}-band-to-paper-${w}.png`, "no dark opaque ancestor of main h1");
      else {
        await scrollTo(page, band.bottom - 200);
        await ready(page);
        await viewport(page, `study-${slug}-band-to-paper-${w}.png`);
      }

      const centre = async (file, finder, what) => {
        const r = await docRect(page, VISIBLE + finder);
        if (!r) return bad(file, `no ${what}`);
        const vh = VP[w].height;
        await scrollTo(page, r.top + r.height / 2 - vh / 2);
        await ready(page);
        await viewport(page, file);
      };
      if (slug === "ordani")
        await centre(
          `study-ordani-chapter-photo-${w}.png`,
          `const cw = document.documentElement.clientWidth;
           return [...document.querySelectorAll("main img")].find((i) => visible(i) && i.getBoundingClientRect().width >= cw - 1) || null;`,
          "full-bleed main img",
        );
      if (slug === "guardicore")
        await centre(
          `study-guardicore-band-photo-${w}.png`,
          `return [...document.querySelectorAll("main img")].find((i) => decode(i.currentSrc || i.getAttribute("src")).includes("guardicore-band-960.jpg")) || null;`,
          "main img with guardicore-band-960.jpg",
        );
      if (slug === "rfp-engine") {
        const file = `study-rfp-engine-worked-example-${w}.png`;
        const r = await docRect(
          page,
          `return [...document.querySelectorAll("main h2")].find((h) => h.textContent.replace(/\\s+/g, " ").trim() === "One requirement, start to finish") || null;`,
        );
        if (!r) bad(file, 'no h2 "One requirement, start to finish"');
        else {
          await scrollTo(page, r.top);
          await ready(page);
          await viewport(page, file);
        }
      }

      const closeFile = `study-${slug}-close-and-all-work-${w}.png`;
      const all = await docRect(
        page,
        VISIBLE +
          `return [...document.querySelectorAll('main a[href="/work"]')].find((a) => visible(a) && a.innerText.replace(/\\s+/g, " ").trim() === "All work") || null;`,
      );
      if (!all) bad(closeFile, "no visible All work link");
      else {
        await scrollTo(page, all.bottom - VP[w].height);
        await ready(page);
        await viewport(page, closeFile);
      }

      await fullPage(page, `study-${slug}-full-${w}.png`);
    } catch (e) {
      bad(`study-${slug}-*-${w}.png`, `error: ${errText(e)}`);
    } finally {
      if (page) await page.close();
    }
  }
}

// ---------------------------------------------------------------- the settle, guardicore 1440 motion
{
  let page;
  try {
    page = await openPage(1440, { reduced: false });
    await page.evaluateOnNewDocument((findBand) => {
      window.__shot = { dcl: null, rect: null };
      document.addEventListener(
        "DOMContentLoaded",
        () => {
          window.__shot.dcl = performance.now();
          const band = new Function(findBand)();
          if (band) {
            const r = band.getBoundingClientRect();
            window.__shot.rect = { x: r.left, y: r.top, width: r.width, height: r.height };
          }
        },
        { once: true },
      );
    }, FIND_BAND);
    const resp = await page.goto(BASE + "/work/guardicore", { waitUntil: "domcontentloaded", timeout: 60000 });
    if (!resp || resp.status() !== 200) bad("study-guardicore-settle-t*-motion-1440.png", `status ${resp ? resp.status() : 0}`);
    else {
      await page.waitForFunction(() => window.__shot && window.__shot.dcl !== null, { timeout: 10000, polling: 10 });
      const t0 = Date.now();
      const s = await page.evaluate(() => ({ now: performance.now(), dcl: window.__shot.dcl, rect: window.__shot.rect }));
      const offset = (t0 + Date.now()) / 2 - s.now;
      const pageNow = () => Date.now() - offset;
      let clip;
      if (s.rect) {
        const y0 = Math.max(0, s.rect.y);
        const y1 = Math.min(VP[1440].height, s.rect.y + s.rect.height);
        const x0 = Math.max(0, s.rect.x);
        const x1 = Math.min(VP[1440].width, s.rect.x + s.rect.width);
        if (y1 > y0 && x1 > x0) clip = { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
      }
      for (const nominal of SETTLE_MS) {
        const file = `study-guardicore-settle-t${nominal}-motion-1440.png`;
        const wait = s.dcl + nominal - pageNow();
        if (wait > 0) await sleep(wait);
        const requested = pageNow() - s.dcl;
        await page.screenshot({ path: OUT + file, captureBeyondViewport: false, ...(clip ? { clip } : {}) });
        const returned = pageNow() - s.dcl;
        if (!clip) bad(file, `written as the full viewport: no hero band rect at DOMContentLoaded (actual ${requested.toFixed(0)}ms)`);
        else ok(file, `(nominal ${nominal}ms, actual ${requested.toFixed(0)}ms at request, ${returned.toFixed(0)}ms at return, after DOMContentLoaded)`);
      }
    }
  } catch (e) {
    bad("study-guardicore-settle-t*-motion-1440.png", `error: ${errText(e)}`);
  } finally {
    if (page) await page.close();
  }
}

// ---------------------------------------------------------------- retired slugs, 1440
for (const old of ["postmates", "neuton"]) {
  const file = `redirect-${old}-lands-on-record-1440.png`;
  let page;
  try {
    page = await openPage(1440);
    const status = await load(page, `/work/${old}`);
    const at = await page.evaluate(() => location.pathname + location.hash);
    if (status !== 200) bad(file, `status ${status} at ${at}`);
    else await viewport(page, file, `(landed on ${at})`);
  } catch (e) {
    bad(file, `error: ${errText(e)}`);
  } finally {
    if (page) await page.close();
  }
}

await browser.close();
console.log(`shots120 failures: ${failures}`);
process.exit(failures ? 1 : 0);
