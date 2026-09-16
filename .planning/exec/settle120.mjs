// .planning/exec/settle120.mjs — Pass-120 V3 (brief §6.3): the TitleCard settle on the five
// case studies at 1440 and 390, read from painted frames. A requestAnimationFrame sampler,
// installed with evaluateOnNewDocument and started on DOMContentLoaded, records for `main h1`
// and each descendant with a non-zero rect: performance.now(), effective opacity (product of
// computed opacity up to <html>), rect.left, rect.top + scrollY, and the h1's computed filter,
// clip-path, font-size and letter-spacing, for 3000ms. The final frame is the last sample; a
// frame is non-final when any element's effective opacity differs from its final value by more
// than 0.01 or its position by more than 0.5px.
//
// Usage: node .planning/exec/settle120.mjs [base]
//   base defaults to http://localhost:3200.
// Every result line is `PASS <id>: got <x>` or `FAIL <id>: got <x> (want <y>)`; the run ends on
// `settle120 failures: N` and exits 1 when N is not 0.
//
// A route that does not answer 200 is one failure (S0) and its remaining checks are skipped.
// S5 compares only frames sampled at the final frame's window width: while the viewport is
// 1200 (or 360) the layout itself differs, which is not a replay.
// Bite proof: run against production before the pass; it must fail S1 or S2 on each study.
import { createRequire } from "node:module";

const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const pos = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const BASE = (pos[0] || "http://localhost:3200").replace(/\/$/, "");

const STUDIES = ["guardicore", "rfp-engine", "ordani", "content-engine", "birth-worker"];
const WIDTHS = [1440, 390];
const VP = {
  1440: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  390: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const ALT_WIDTH = { 1440: 1200, 390: 360 };

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`${ok ? "PASS" : "FAIL"} ${id}: got ${got}${ok ? "" : ` (want ${want})`}`);
  if (!ok) failures++;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const errText = (e) => String((e && e.message) || e).split("\n")[0];

// Installed before any page script. window.__settle.start(ms) samples every animation frame
// for ms milliseconds (or until stop() when ms is null).
function installSampler() {
  const S = (window.__settle = { samples: [], running: false, done: false, token: 0 });
  const effOpacity = (el) => {
    let o = 1;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity);
    return o;
  };
  const frame = () => {
    const rec = { t: performance.now(), w: window.innerWidth, els: null, style: null };
    const h1 = document.querySelector("main h1");
    if (h1) {
      rec.els = [h1, ...h1.querySelectorAll("*")].map((el) => {
        const r = el.getBoundingClientRect();
        if (!(r.width > 0 && r.height > 0)) return null;
        return [effOpacity(el), r.left, r.top + window.scrollY];
      });
      const cs = getComputedStyle(h1);
      rec.style = [cs.filter, cs.clipPath, cs.fontSize, cs.letterSpacing];
    }
    S.samples.push(rec);
  };
  S.start = (ms) => {
    const token = ++S.token;
    S.samples = [];
    S.done = false;
    S.running = true;
    const t0 = performance.now();
    const loop = () => {
      if (token !== S.token || !S.running) return;
      frame();
      if (ms != null && performance.now() - t0 >= ms) {
        S.running = false;
        S.done = true;
        return;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };
  S.stop = () => {
    S.running = false;
    S.done = true;
  };
  document.addEventListener("DOMContentLoaded", () => S.start(3000), { once: true });
}

function installCls() {
  window.__cls = { entries: [], load: null };
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) window.__cls.entries.push({ t: e.startTime, v: e.value, input: e.hadRecentInput });
    }).observe({ type: "layout-shift", buffered: true });
  } catch (e) {
    window.__cls.error = String(e);
  }
  window.addEventListener("load", () => (window.__cls.load = performance.now()), { once: true });
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });

async function openPage(w, reduced) {
  const page = await browser.newPage();
  await page.bringToFront();
  await page.setCacheEnabled(false);
  await page.setViewport(VP[w]);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: reduced ? "reduce" : "no-preference" },
  ]);
  return page;
}

async function load(page, route) {
  const resp = await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await sleep(1500);
  return resp ? resp.status() : 0;
}

// Classify samples against the last one. Returns per-frame booleans (true = non-final).
function analyse(samples, onlyWidth) {
  const use = onlyWidth == null ? samples : samples.filter((s) => s.w === onlyWidth);
  if (!use.length) return { use, nonFinal: [], fin: null };
  const fin = use[use.length - 1];
  const elFinal = (a, b) =>
    (a === null && b === null) ||
    (a !== null && b !== null && Math.abs(a[0] - b[0]) <= 0.01 && Math.abs(a[1] - b[1]) <= 0.5 && Math.abs(a[2] - b[2]) <= 0.5);
  const isFinal = (s) => {
    if (s.els === null || fin.els === null) return s.els === fin.els;
    if (s.els.length !== fin.els.length) return false;
    return s.els.every((e, i) => elFinal(e, fin.els[i]));
  };
  const h1Final = (s) => {
    if (s.els === null || fin.els === null) return s.els === fin.els;
    return elFinal(s.els[0] ?? null, fin.els[0] ?? null);
  };
  return { use, fin, nonFinal: use.map((s) => !isFinal(s)), h1Final };
}

const waitSampler = (page) => page.waitForFunction(() => window.__settle && window.__settle.done, { timeout: 15000 });

for (const slug of STUDIES) {
  const route = `/work/${slug}`;
  for (const w of WIDTHS) {
    const tag = `${route} ${w}`;
    console.log(`== ${BASE}${route} at ${w}`);

    // S1-S5: motion.
    let page;
    let ok200 = true;
    try {
      page = await openPage(w, false);
      await page.evaluateOnNewDocument(installSampler);
      const status = await load(page, route);
      chk(`S0 status ${tag}`, status === 200, status, 200);
      if (status !== 200) {
        ok200 = false;
        console.log(`SKIP ${tag}: status ${status}, S1-S7 not run`);
      } else {
        await waitSampler(page);
        const samples = await page.evaluate(() => window.__settle.samples);
        const a = analyse(samples);
        const idx = a.nonFinal.map((n, i) => (n ? i : -1)).filter((i) => i >= 0);
        const hasH1 = samples.some((s) => s.els !== null);
        const nf = idx.length;
        const span = samples.length ? (samples[samples.length - 1].t - samples[0].t).toFixed(0) : 0;
        console.log(`     ${samples.length} frames over ${span}ms, main h1 ${hasH1 ? "present" : "absent"}`);
        chk(`S1 motion runs ${tag}`, nf >= 1, `${nf} non-final frames`, ">= 1");
        if (nf >= 1) {
          const first = idx[0];
          const last = idx[idx.length - 1];
          const settle = samples[last + 1];
          const ms = settle ? settle.t - samples[first].t : null;
          chk(`S2 600ms total ${tag}`, ms !== null && ms <= 634, ms === null ? "never settled" : `${ms.toFixed(1)}ms`, "<= 634ms");
        } else chk(`S2 600ms total ${tag}`, false, "no non-final frame", "<= 634ms");
        const firstNF = nf ? idx[0] : samples.length;
        const flash = samples.slice(0, firstNF).filter((s) => a.h1Final(s)).length;
        chk(`S3 no flash ${tag}`, flash === 0, `${flash} final frames before the first non-final frame`, 0);
        const props = ["filter", "clip-path", "font-size", "letter-spacing"];
        const vals = props.map((_, i) => [...new Set(samples.filter((s) => s.style).map((s) => s.style[i]))]);
        const multi = props.map((p, i) => (vals[i].length === 1 ? null : `${p} [${vals[i].join(" ; ") || "none sampled"}]`)).filter(Boolean);
        chk(
          `S4 transform and opacity only ${tag}`,
          multi.length === 0,
          multi.length ? multi.join(" | ") : props.map((p, i) => `${p} ${vals[i][0]}`).join(", "),
          "one value each",
        );

        // S5: once per load.
        await page.evaluate(() => window.__settle.start(null));
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        await sleep(500);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.setViewport({ ...VP[w], width: ALT_WIDTH[w] });
        await page.setViewport(VP[w]);
        await sleep(2000);
        await page.evaluate(() => window.__settle.stop());
        const s5 = await page.evaluate(() => window.__settle.samples);
        const finW = s5.length ? s5[s5.length - 1].w : null;
        const b = analyse(s5, finW);
        const nf5 = b.nonFinal.filter(Boolean).length;
        chk(
          `S5 once per load ${tag}`,
          s5.length > 0 && nf5 === 0,
          `${nf5} non-final frames (${b.use.length} frames at ${finW}px, ${s5.length - b.use.length} at other widths not compared)`,
          0,
        );
      }
    } catch (e) {
      chk(`run S1-S5 ${tag}`, false, `error: ${errText(e)}`, "no error");
    } finally {
      if (page) await page.close();
      page = null;
    }
    if (!ok200) continue;

    // S6: reduced, fresh page.
    try {
      page = await openPage(w, true);
      await page.evaluateOnNewDocument(installSampler);
      await load(page, route);
      await waitSampler(page);
      const samples = await page.evaluate(() => window.__settle.samples);
      const a = analyse(samples);
      const nf = a.nonFinal.filter(Boolean).length;
      const finOp = a.fin && a.fin.els && a.fin.els[0] ? a.fin.els[0][0] : null;
      chk(
        `S6 reduced ${tag}`,
        samples.length > 0 && nf === 0 && finOp === 1,
        `${nf} non-final frames of ${samples.length}, final h1 opacity ${finOp === null ? "(no h1 rect)" : finOp}`,
        "0 non-final frames, final h1 opacity 1",
      );
    } catch (e) {
      chk(`S6 reduced ${tag}`, false, `error: ${errText(e)}`, "no error");
    } finally {
      if (page) await page.close();
      page = null;
    }
  }
}

// S7: CLS, motion, fresh page, each study and /work at both widths.
for (const route of [...STUDIES.map((s) => `/work/${s}`), "/work"]) {
  for (const w of WIDTHS) {
    const tag = `${route} ${w}`;
    let page;
    try {
      page = await openPage(w, false);
      await page.evaluateOnNewDocument(installCls);
      const resp = await page.goto(BASE + route, { waitUntil: "load", timeout: 60000 });
      const status = resp ? resp.status() : 0;
      if (status !== 200) {
        chk(`S7 CLS ${tag}`, false, `status ${status}`, "status 200");
        continue;
      }
      await page.waitForFunction(() => window.__cls.load !== null && performance.now() >= window.__cls.load + 5000, {
        timeout: 30000,
        polling: 100,
      });
      const r = await page.evaluate(() => {
        const end = window.__cls.load + 5000;
        const kept = window.__cls.entries.filter((e) => !e.input && e.t <= end);
        return { sum: kept.reduce((s, e) => s + e.v, 0), n: kept.length, error: window.__cls.error || null };
      });
      chk(
        `S7 CLS ${tag}`,
        !r.error && r.sum <= 0.05,
        r.error ? `observer error ${r.error}` : `${r.sum.toFixed(4)} (${r.n} shifts)`,
        "<= 0.05",
      );
    } catch (e) {
      chk(`S7 CLS ${tag}`, false, `error: ${errText(e)}`, "no error");
    } finally {
      if (page) await page.close();
    }
  }
}

await browser.close();
console.log(`settle120 failures: ${failures}`);
process.exit(failures ? 1 : 0);
