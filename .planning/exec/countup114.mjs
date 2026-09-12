// .planning/exec/countup114.mjs — Pass-114 dynamic verification (brief §4).
// Seven numbered assertions, one `chk` line each, then `countup failures: N`.
// Exits with the failure count (0 = all pass). Puppeteer-core from
// C:/tmp/p101tools; Chrome at the system path; server on :3200.
//
// Scroll strategy for assertion 4: the figure is scrolled into the ARM zone
// first (below the visible viewport, inside the arm observer's extended
// root), held 250ms so the armed state ("$0M") is poll-visible, then centred
// so the play observer starts the count. A single jump to centre would arm
// and start in the same observer batch and a 50ms poll can miss the "$0M"
// prefix even though the machine passes through it.

import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";

const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");

const ROOT =
  "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live";
const OUT = `${ROOT}/.planning/qa/pass-114`;
mkdirSync(OUT, { recursive: true });

const S = "http://localhost:3200";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FINAL = "$20M+";

let failures = 0;
function chk(name, ok, detail) {
  console.log(`chk${name} ${ok ? "PASS" : "FAIL"} :: ${detail}`);
  if (!ok) failures++;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const val = (t) => (t === FINAL ? 20 : parseInt(t.replace(/[^0-9]/g, ""), 10));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-color-profile=srgb",
  ],
});

async function freshPage(vp, opts = {}) {
  const page = await browser.newPage();
  await page.setViewport(vp);
  if (opts.noJs) await page.setJavaScriptEnabled(false);
  if (opts.reduced)
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
  return page;
}

async function figInfo(page) {
  return page.evaluate(() => {
    const wrap = document.querySelector(".cw-rec__wrap");
    const tick = document.querySelector(".cw-rec__tick");
    if (!wrap || !tick) return null;
    const r = wrap.getBoundingClientRect();
    return {
      top: r.top,
      height: r.height,
      absTop: r.top + window.scrollY,
      tick: tick.textContent,
      innerHeight: window.innerHeight,
      docH: document.body.scrollHeight,
    };
  });
}

async function circleDash(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll(".cw-rec .hand-circle path")].map((p) => {
      const cs = getComputedStyle(p);
      return {
        inline: p.style.strokeDashoffset,
        computed: cs.strokeDashoffset,
        num: cs.strokeDashoffset === "none" ? null : parseFloat(cs.strokeDashoffset),
      };
    }),
  );
}
const drawnWhole = (paths) =>
  paths.length === 2 &&
  paths.every(
    (p) =>
      (!p.inline || p.inline === "") &&
      (p.computed === "none" || p.num === 0),
  );
const drawnClosed = (paths) =>
  paths.length === 2 &&
  paths.every((p) => p.num === 0 || p.computed === "none");

async function startPoll(page) {
  await page.evaluate(() => {
    window.__samples = [];
    window.__t0 = performance.now();
    window.__poll = setInterval(() => {
      const t = document.querySelector(".cw-rec__tick");
      if (t) window.__samples.push({ t: performance.now() - window.__t0, text: t.textContent });
    }, 50);
  });
}
async function stopPoll(page) {
  return page.evaluate(() => {
    clearInterval(window.__poll);
    return window.__samples || [];
  });
}
async function centreOnFigure(page) {
  return page.evaluate(() => {
    const w = document.querySelector(".cw-rec__wrap");
    const r = w.getBoundingClientRect();
    const y = r.top + window.scrollY + r.height / 2 - window.innerHeight / 2;
    window.scrollTo(0, Math.max(0, y));
    return Math.max(0, y);
  });
}
async function waitHydrated(page) {
  await page.waitForFunction(
    () => document.documentElement.classList.contains("lenis"),
    { timeout: 15000 },
  );
}

// ---------------------------------------------------------------- chk 1
// No JS: tick is $20M+, both circle paths carry no dashoffset (drawn whole).
{
  const page = await freshPage(
    { width: 1440, height: 900, deviceScaleFactor: 1 },
    { noJs: true },
  );
  await page.goto(`${S}/`, { waitUntil: "networkidle0", timeout: 60000 });
  const info = await figInfo(page);
  const paths = await circleDash(page);
  const tickOk = info.tick === FINAL;
  const pathsOk = drawnWhole(paths);
  chk(
    1,
    tickOk && pathsOk,
    `no-JS: tick=${JSON.stringify(info.tick)} (expect "${FINAL}"); paths inline/computed=` +
      paths.map((p) => `${JSON.stringify(p.inline)}/${p.computed}`).join(" ") +
      ` (expect no inline dashoffset, computed none/0)`,
  );
  await page.close();
}

// ---------------------------------------------------------------- chk 2
// Reduced motion: finished frame only; $0M never appears.
{
  const page = await freshPage(
    { width: 1440, height: 900, deviceScaleFactor: 1 },
    { reduced: true },
  );
  await page.goto(`${S}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await startPoll(page);
  await sleep(300);
  await centreOnFigure(page);
  await sleep(300);
  const info = await figInfo(page);
  const samples = await stopPoll(page);
  const set = [...new Set(samples.map((s) => s.text))];
  const setOk = set.length === 1 && set[0] === FINAL;
  chk(
    2,
    setOk && info.tick === FINAL,
    `reduced-motion: tick=${JSON.stringify(info.tick)} (expect "${FINAL}"); texts seen=${JSON.stringify(set)} (expect ["${FINAL}"])`,
  );
  await page.close();
}

// ---------------------------------------------------------------- chk 3
// In view at load (deep link to the receipts anchor): finished frame, never $0M.
{
  const page = await freshPage({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${S}/#cw-products-title`, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });
  await startPoll(page);
  await sleep(600);
  let info = await figInfo(page);
  let mode = "anchor #cw-products-title";
  if (!(info.top < info.innerHeight)) {
    // Fallback: the refresh-mid-page leg of the same mount check.
    mode = "fallback refresh mid-page";
    await centreOnFigure(page);
    await page.reload({ waitUntil: "networkidle0", timeout: 60000 });
    await startPoll(page);
    await sleep(600);
    info = await figInfo(page);
  }
  const samples = await stopPoll(page);
  const set = [...new Set(samples.map((s) => s.text))];
  const inView = info.top < info.innerHeight;
  const ok =
    inView && info.tick === FINAL && set.length === 1 && set[0] === FINAL;
  chk(
    3,
    ok,
    `in-view-at-load (${mode}): figure top=${Math.round(info.top)} < innerHeight=${info.innerHeight}=${inView}; tick=${JSON.stringify(info.tick)} (expect "${FINAL}"); texts seen=${JSON.stringify(set)} (expect ["${FINAL}"])`,
  );
  await page.close();
}

// ---------------------------------------------------------------- chk 4
// The real run at 1440x900: $0M first, monotonic, $20M+ 1100-1500ms after
// first $1M+, circle closed at 3000ms; captures mid + done.
let absCentre = 0;
{
  const page = await freshPage({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${S}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await waitHydrated(page);
  const pre = await figInfo(page);
  const belowFold = pre.top > pre.innerHeight;
  console.log(
    `     pre: figure top=${Math.round(pre.top)} vs innerHeight=${pre.innerHeight} — ` +
      (belowFold ? "below the fold, test valid" : "NOT below the fold, TEST INVALID"),
  );
  if (!belowFold) {
    chk(4, false, "figure not below the fold at load — test invalid");
  } else {
    await sleep(500);
    // CLS observer (chk 5) + poller, both installed BEFORE the scroll.
    await page.evaluate(() => {
      window.__shifts = [];
      window.__clsObs = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          window.__shifts.push({
            value: e.value,
            sources: (e.sources || []).map((s) => s.node),
          });
        }
      });
      window.__clsObs.observe({ type: "layout-shift", buffered: true });
    });
    await startPoll(page);
    absCentre = pre.absTop + pre.height / 2 - pre.innerHeight / 2;
    // Stage A: into the arm zone — figure 0.75 viewport below the visible bottom.
    const stageA = pre.absTop - (pre.innerHeight + 0.75 * pre.innerHeight);
    await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, stageA));
    await sleep(250);
    // Stage B: figure centred — the count starts.
    await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, absCentre));
    const tB = Date.now();
    await sleep(600);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${OUT}/home-rec-mid-1440.png` });
    console.log("     capture: home-rec-mid-1440.png (~600ms into the count)");
    while (Date.now() - tB < 3000) await sleep(50);
    const dash = await circleDash(page);
    while (Date.now() - tB < 3200) await sleep(50);
    await page.screenshot({ path: `${OUT}/home-rec-done-1440.png` });
    console.log("     capture: home-rec-done-1440.png (3200ms)");
    const info = await figInfo(page);
    const samples = await stopPoll(page);
    const texts = samples.map((s) => s.text);
    const firstNonFinal = texts.find((t) => t !== FINAL) ?? "(none)";
    const firstOk = firstNonFinal === "$0M";
    let monoOk = true;
    for (let i = 1; i < texts.length; i++)
      if (val(texts[i]) < val(texts[i - 1])) monoOk = false;
    const zeroIdx = texts.indexOf("$0M");
    let i1 = -1;
    let iFinal = -1;
    for (let i = zeroIdx + 1; i < samples.length; i++) {
      if (i1 < 0 && val(texts[i]) >= 1) i1 = i;
      if (iFinal < 0 && texts[i] === FINAL) iFinal = i;
    }
    const dt = i1 >= 0 && iFinal >= 0 ? samples[iFinal].t - samples[i1].t : -1;
    const timingOk = dt >= 1100 && dt <= 1500;
    const dashOk = drawnClosed(dash);
    const endOk = info.tick === FINAL;
    chk(
      4,
      firstOk && monoOk && timingOk && dashOk && endOk,
      `real-run@1440: first non-final=${JSON.stringify(firstNonFinal)} (expect "$0M"); monotonic=${monoOk} (expect true); ` +
        `$20M+ at ${Math.round(dt)}ms after first $1M+ (expect 1100-1500); dashoffset@3000ms=` +
        dash.map((d) => `${d.computed}`).join(",") + ` (expect 0px,0px); end tick=${JSON.stringify(info.tick)} (expect "${FINAL}")`,
    );

    // ------------------------------------------------------------ chk 5
    const shiftSum = await page.evaluate(() => {
      const rec = document.querySelector(".cw-rec");
      return window.__shifts
        .filter((s) => s.sources.some((n) => n && rec.contains(n)))
        .reduce((a, s) => a + s.value, 0);
    });
    chk(5, shiftSum === 0, `CLS from .cw-rec sources: ${shiftSum} (expect 0)`);

    // ------------------------------------------------------------ chk 6
    await startPoll(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(300);
    await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, absCentre));
    await sleep(1500);
    const s6 = await stopPoll(page);
    const set6 = [...new Set(s6.map((x) => x.text))];
    chk(
      6,
      set6.length === 1 && set6[0] === FINAL,
      `once-only: texts after out-and-back ${JSON.stringify(set6)} (expect ["${FINAL}"])`,
    );
    await page.close();
  }
}

// ------------------------------------------------------- chk 4, 390 leg
{
  const page = await freshPage({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(`${S}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await waitHydrated(page);
  const pre = await figInfo(page);
  const belowFold = pre.top > pre.innerHeight;
  if (!belowFold) {
    chk("4.390", false, "figure not below the fold at load (390) — test invalid");
  } else {
    await sleep(500);
    const stageA = pre.absTop - (pre.innerHeight + 0.75 * pre.innerHeight);
    await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, stageA));
    await sleep(250);
    const centre = pre.absTop + pre.height / 2 - pre.innerHeight / 2;
    await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, centre));
    const tB = Date.now();
    while (Date.now() - tB < 3200) await sleep(50);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${OUT}/home-rec-done-390.png` });
    console.log("     capture: home-rec-done-390.png (3200ms, 2x)");
    const info = await figInfo(page);
    const dash = await circleDash(page);
    chk(
      "4.390",
      info.tick === FINAL && drawnClosed(dash),
      `real-run@390: end tick=${JSON.stringify(info.tick)} (expect "${FINAL}"); dashoffset=` +
        dash.map((d) => `${d.computed}`).join(",") + ` (expect 0px,0px); capture written`,
    );
  }
  await page.close();
}

// ---------------------------------------------------------------- chk 7
// Flick-past: one jump to the foot, back to the figure — finished frame,
// circle drawn, no count.
{
  const page = await freshPage({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${S}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await waitHydrated(page);
  await sleep(500);
  await startPoll(page);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(300);
  await centreOnFigure(page);
  await sleep(600);
  const info = await figInfo(page);
  const dash = await circleDash(page);
  const samples = await stopPoll(page);
  const set = [...new Set(samples.map((s) => s.text))];
  const tickOk = info.tick === FINAL && set.length === 1 && set[0] === FINAL;
  const circleOk = drawnClosed(dash);
  chk(
    7,
    tickOk && circleOk,
    `flick-past: tick=${JSON.stringify(info.tick)} texts=${JSON.stringify(set)} (expect ["${FINAL}"]); circle dashoffset=` +
      dash.map((d) => `${d.computed}`).join(",") + ` (expect 0px,0px — drawn, no count)`,
  );
  await page.close();
}

await browser.close();
console.log(`countup failures: ${failures}`);
process.exit(failures);
