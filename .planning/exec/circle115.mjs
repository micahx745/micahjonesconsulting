// .planning/exec/circle115.mjs — Pass-115 circle verification (brief §2 + §4).
//
// §2 mode (`--m1-only`): measure the "$20M+" ink box BEFORE the geometry edit,
//   at 1440x900 dpr1 and 390x844 dpr2, reduced motion on. Prints L/T/W/H and
//   W/H in em (divided by the .cw-rec__num font-size), 3 decimals.
// §4 mode (bare `node .planning/exec/circle115.mjs`): the same M1 measurement
//   at each width, then — with the loop visible — samples the first path at
//   400 points and the second at 150 (getPointAtLength + getScreenCTM) and
//   prints C1..C10. Ends with `circle failures: N` over both widths; exits 1
//   if N is not 0. Also writes the three §4 captures into
//   .planning/qa/pass-115/.
// --p116 (Pass-116 brief §3): runs C1..C11 AND then C12..C14 (reduced motion
//   OFF for all three), which count toward `circle failures`. Without the
//   flag, C1..C11 only, unchanged.
//
// Puppeteer-core from C:/tmp/p101tools; Chrome at the system path; server on
// :3200. The ink decode runs in a separate about:blank page (brief §2).

import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");

const ROOT =
  "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live";
const OUT_INDEX = process.argv.indexOf("--out");
const OUT_GIVEN = OUT_INDEX !== -1;
if (
  OUT_GIVEN &&
  (!process.argv[OUT_INDEX + 1] || process.argv[OUT_INDEX + 1].startsWith("--"))
) {
  console.error("--out requires a directory");
  process.exit(2);
}
const OUT = OUT_GIVEN
  ? resolve(process.cwd(), process.argv[OUT_INDEX + 1])
  : `${ROOT}/.planning/qa/pass-115`;
mkdirSync(OUT, { recursive: true });

const S = "http://localhost:3200";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FINAL = "$20M+";
const M1_ONLY = process.argv.includes("--m1-only");
const PROBE = process.argv.includes("--probe");
const P116 = process.argv.includes("--p116");

let failures = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const f3 = (v) => v.toFixed(3);
const ceil3 = (v) => Math.ceil(v * 1000) / 1000;

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

async function freshPage(vp, { reduced = true } = {}) {
  const page = await browser.newPage();
  await page.setViewport(vp);
  if (reduced) {
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
  }
  return page;
}

async function centreOnFigure(page) {
  await page.evaluate(() => {
    const r = document.querySelector(".cw-rec__wrap").getBoundingClientRect();
    window.scrollTo(
      0,
      Math.max(0, r.top + window.scrollY + r.height / 2 - window.innerHeight / 2),
    );
  });
}

async function waitHydrated(page) {
  await page.waitForFunction(
    () => document.documentElement.classList.contains("lenis"),
    { timeout: 15000 },
  );
}

async function checkStrokeCoverage(page, state, inkHeight, dsf) {
  const geometry = await page.evaluate((deviceScaleFactor) => {
    const paths = [...document.querySelectorAll(".cw-rec .hand-circle path")];
    const tick = document.querySelector(".cw-rec__tick");
    const oldVisibility = tick.style.visibility;
    tick.style.visibility = "hidden";
    const sample = (el, count) => {
      const len = el.getTotalLength();
      const ctm = el.getScreenCTM();
      const points = [];
      for (let i = 0; i < count; i++) {
        const p = el.getPointAtLength((i / (count - 1)) * len);
        const mapped = new DOMPoint(p.x, p.y).matrixTransform(ctm);
        points.push([
          mapped.x * deviceScaleFactor,
          mapped.y * deviceScaleFactor,
        ]);
      }
      return points;
    };
    const primary = sample(paths[0], 200);
    const overshoot = sample(paths[1], 80);
    const all = [...primary, ...overshoot];
    return {
      primary,
      overshoot,
      loopLeft: Math.min(...all.map((p) => p[0])),
      loopTop: Math.min(...all.map((p) => p[1])),
      oldVisibility,
    };
  }, dsf);

  let shot;
  try {
    shot = await page.screenshot({ encoding: "base64" });
  } finally {
    await page.evaluate((visibility) => {
      document.querySelector(".cw-rec__tick").style.visibility = visibility;
    }, geometry.oldVisibility);
  }

  const decoder = await browser.newPage();
  await decoder.goto("about:blank");
  const coverage = await decoder.evaluate(
    async (dataUrl, geometry, inkHeight, dsf) => {
      const img = new Image();
      img.src = dataUrl;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const width = canvas.width;
      const height = canvas.height;
      const bgX = Math.round(geometry.loopLeft);
      const bgY = Math.round(geometry.loopTop - 0.4 * inkHeight * dsf);
      const rs = [];
      const gs = [];
      const bs = [];
      for (let y = bgY - 10; y < bgY + 10; y++) {
        for (let x = bgX - 10; x < bgX + 10; x++) {
          if (x < 0 || x >= width || y < 0 || y >= height) continue;
          const i = (y * width + x) * 4;
          rs.push(pixels[i]);
          gs.push(pixels[i + 1]);
          bs.push(pixels[i + 2]);
        }
      }
      const median = (values) => {
        values.sort((a, b) => a - b);
        return values[(values.length - 1) >> 1];
      };
      const bg = [median(rs), median(gs), median(bs)];
      const radius = 3 * dsf;
      const covered = (point) => {
        const cx = Math.round(point[0]);
        const cy = Math.round(point[1]);
        const reach = Math.ceil(radius);
        for (let dy = -reach; dy <= reach; dy++) {
          for (let dx = -reach; dx <= reach; dx++) {
            if (dx * dx + dy * dy > radius * radius) continue;
            const x = cx + dx;
            const y = cy + dy;
            if (x < 0 || x >= width || y < 0 || y >= height) continue;
            const i = (y * width + x) * 4;
            const diff = Math.max(
              Math.abs(pixels[i] - bg[0]),
              Math.abs(pixels[i + 1] - bg[1]),
              Math.abs(pixels[i + 2] - bg[2]),
            );
            if (diff > 40) return true;
          }
        }
        return false;
      };
      const ratio = (points) =>
        points.filter((point) => covered(point)).length / points.length;
      return {
        primary: ratio(geometry.primary),
        overshoot: ratio(geometry.overshoot),
      };
    },
    `data:image/png;base64,${shot}`,
    geometry,
    inkHeight,
    dsf,
  );
  await decoder.close();

  const primaryOk = coverage.primary >= 0.97;
  const overshootOk = coverage.overshoot >= 0.9;
  if (!primaryOk) failures++;
  if (!overshootOk) failures++;
  console.log(
    `C11 stroke coverage primary [${state}]: got ${f3(coverage.primary)}, expect >= 0.97${primaryOk ? "" : "  <-- FAIL"}`,
  );
  console.log(
    `C11 stroke coverage overshoot [${state}]: got ${f3(coverage.overshoot)}, expect >= 0.90${overshootOk ? "" : "  <-- FAIL"}`,
  );
}

async function runPlayedState(inkHeight) {
  const page = await freshPage(
    { width: 1440, height: 900, deviceScaleFactor: 1 },
    { reduced: false },
  );
  await page.goto(`${S}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await waitHydrated(page);
  const pre = await page.evaluate(() => {
    const r = document.querySelector(".cw-rec__wrap").getBoundingClientRect();
    return {
      top: r.top,
      height: r.height,
      absTop: r.top + window.scrollY,
      innerHeight: window.innerHeight,
    };
  });
  if (pre.top <= pre.innerHeight) {
    failures += 2;
    console.log(
      `C11 stroke coverage primary [played]: got 0.000, expect >= 0.97  <-- FAIL`,
    );
    console.log(
      `C11 stroke coverage overshoot [played]: got 0.000, expect >= 0.90  <-- FAIL`,
    );
    await page.close();
    return;
  }
  await sleep(500);
  const stageA = pre.absTop - (pre.innerHeight + 0.75 * pre.innerHeight);
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, stageA));
  await sleep(250);
  const centre = pre.absTop + pre.height / 2 - pre.innerHeight / 2;
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, centre));
  await sleep(3200);
  await page.evaluate(() => document.fonts.ready);
  await checkStrokeCoverage(page, "played", inkHeight, 1);
  if (OUT_GIVEN) {
    await page.screenshot({ path: `${OUT}/home-rec-played-1440.png` });
    console.log(`     capture: home-rec-played-1440.png`);
  }
  await page.close();
}

// ------------------------------------------- Pass-116 (§3): C12, C13, C14
// Behind --p116, reduced motion OFF. Each counts toward `circle failures`.

// C12 helper: primary-path stroke coverage by the C11 method (screenshot +
// ink decode), counted over ONLY the samples inside the viewport — C12
// measures with the loop partly off-screen, so the C11 background sample
// point (above the loop's top-left) is clamped into the frame here.
async function viewportPrimaryCoverage(page, dsf) {
  const geometry = await page.evaluate((deviceScaleFactor) => {
    const paths = [...document.querySelectorAll(".cw-rec .hand-circle path")];
    const tick = document.querySelector(".cw-rec__tick");
    const oldVisibility = tick.style.visibility;
    tick.style.visibility = "hidden";
    const sample = (el, count) => {
      const len = el.getTotalLength();
      const ctm = el.getScreenCTM();
      const points = [];
      for (let i = 0; i < count; i++) {
        const p = el.getPointAtLength((i / (count - 1)) * len);
        const mapped = new DOMPoint(p.x, p.y).matrixTransform(ctm);
        points.push([
          mapped.x * deviceScaleFactor,
          mapped.y * deviceScaleFactor,
        ]);
      }
      return points;
    };
    const primary = sample(paths[0], 200);
    const vw = window.innerWidth * deviceScaleFactor;
    const vh = window.innerHeight * deviceScaleFactor;
    const inside = primary.filter(
      (p) => p[0] >= 0 && p[0] <= vw && p[1] >= 0 && p[1] <= vh,
    );
    const anchor = inside.length ? inside : primary;
    return {
      inside,
      sampleLeft: Math.min(...anchor.map((p) => p[0])),
      sampleTop: Math.min(...anchor.map((p) => p[1])),
      oldVisibility,
    };
  }, dsf);

  let shot;
  try {
    shot = await page.screenshot({ encoding: "base64" });
  } finally {
    await page.evaluate((visibility) => {
      document.querySelector(".cw-rec__tick").style.visibility = visibility;
    }, geometry.oldVisibility);
  }

  const decoder = await browser.newPage();
  await decoder.goto("about:blank");
  const ratio = await decoder.evaluate(
    async (dataUrl, geometry, dsf) => {
      const img = new Image();
      img.src = dataUrl;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const width = canvas.width;
      const height = canvas.height;
      const bgX = Math.max(
        12,
        Math.min(width - 13, Math.round(geometry.sampleLeft)),
      );
      const bgY = Math.max(
        12,
        Math.min(height - 13, Math.round(geometry.sampleTop) - 12 * dsf),
      );
      const rs = [];
      const gs = [];
      const bs = [];
      for (let y = bgY - 10; y < bgY + 10; y++) {
        for (let x = bgX - 10; x < bgX + 10; x++) {
          if (x < 0 || x >= width || y < 0 || y >= height) continue;
          const i = (y * width + x) * 4;
          rs.push(pixels[i]);
          gs.push(pixels[i + 1]);
          bs.push(pixels[i + 2]);
        }
      }
      const median = (values) => {
        values.sort((a, b) => a - b);
        return values[(values.length - 1) >> 1];
      };
      const bg = [median(rs), median(gs), median(bs)];
      const radius = 3 * dsf;
      const covered = (point) => {
        const cx = Math.round(point[0]);
        const cy = Math.round(point[1]);
        const reach = Math.ceil(radius);
        for (let dy = -reach; dy <= reach; dy++) {
          for (let dx = -reach; dx <= reach; dx++) {
            if (dx * dx + dy * dy > radius * radius) continue;
            const x = cx + dx;
            const y = cy + dy;
            if (x < 0 || x >= width || y < 0 || y >= height) continue;
            const i = (y * width + x) * 4;
            const diff = Math.max(
              Math.abs(pixels[i] - bg[0]),
              Math.abs(pixels[i + 1] - bg[1]),
              Math.abs(pixels[i + 2] - bg[2]),
            );
            if (diff > 40) return true;
          }
        }
        return false;
      };
      if (!geometry.inside.length) return -1;
      return (
        geometry.inside.filter((point) => covered(point)).length /
        geometry.inside.length
      );
    },
    `data:image/png;base64,${shot}`,
    geometry,
    dsf,
  );
  await decoder.close();
  return ratio;
}

async function runC12() {
  console.log("--- C12 resize while armed (900x900 -> 1400x900) ---");
  const page = await freshPage(
    { width: 900, height: 900, deviceScaleFactor: 1 },
    { reduced: false },
  );
  await page.goto(`${S}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await waitHydrated(page);
  await sleep(500);
  const pre = await page.evaluate(() => {
    const r = document.querySelector(".cw-rec__wrap").getBoundingClientRect();
    return {
      absTop: r.top + window.scrollY,
      height: r.height,
      innerHeight: window.innerHeight,
    };
  });
  // Arm zone: the wrap's top at 1.5x innerHeight.
  await page.evaluate(
    (y) => window.scrollTo(0, y),
    Math.max(0, pre.absTop - 1.5 * pre.innerHeight),
  );
  await sleep(300);
  const armed = await page.evaluate(
    () => document.querySelector(".cw-rec__tick").textContent,
  );
  if (armed !== "$0M") {
    failures++;
    console.log(
      `C12 hidden after resize: got (invalid: tick at arm reads ${JSON.stringify(armed)}, not "$0M"), expect <= 0.02  <-- FAIL`,
    );
    await page.close();
    return;
  }
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
  await sleep(400);
  // 30% of the wrap's height showing at the bottom edge.
  const post = await page.evaluate(() => {
    const r = document.querySelector(".cw-rec__wrap").getBoundingClientRect();
    return {
      absTop: r.top + window.scrollY,
      height: r.height,
      innerHeight: window.innerHeight,
    };
  });
  await page.evaluate(
    (y) => window.scrollTo(0, y),
    Math.max(0, post.absTop + 0.3 * post.height - post.innerHeight),
  );
  await sleep(200);
  const hiddenRatio = await viewportPrimaryCoverage(page, 1);
  const hiddenOk = hiddenRatio >= 0 && hiddenRatio <= 0.02;
  if (!hiddenOk) failures++;
  console.log(
    `C12 hidden after resize: got ${hiddenRatio < 0 ? "(no samples in viewport)" : f3(hiddenRatio)}, expect <= 0.02${hiddenOk ? "" : "  <-- FAIL"}`,
  );
  // Centre it and let the play run out.
  await centreOnFigure(page);
  await sleep(3200);
  await page.evaluate(() => document.fonts.ready);
  const drawnRatio = await viewportPrimaryCoverage(page, 1);
  const drawnOk = drawnRatio >= 0.97;
  if (!drawnOk) failures++;
  console.log(
    `C12 drawn after play: got ${f3(drawnRatio)}, expect >= 0.97${drawnOk ? "" : "  <-- FAIL"}`,
  );
  await page.close();
}

async function runC13() {
  console.log("--- C13 once per load (client back and forward) ---");
  const page = await freshPage(
    { width: 1440, height: 900, deviceScaleFactor: 1 },
    { reduced: false },
  );
  // Count full document loads in this tab. Client navigations do not run
  // this hook; sessionStorage makes a true reload increment instead of reset.
  await page.evaluateOnNewDocument(() => {
    if (window === window.top) {
      const key = "__p116DocLoads";
      const count = Number(sessionStorage.getItem(key) || "0") + 1;
      sessionStorage.setItem(key, String(count));
      window.__docLoads = count;
    }
  });
  const invalid = (detail) => {
    failures++;
    console.log(`     C13 invalid: ${detail}  <-- FAIL`);
  };
  const readWrap = () =>
    page.evaluate(() => {
      const r = document.querySelector(".cw-rec__wrap").getBoundingClientRect();
      return {
        top: r.top,
        absTop: r.top + window.scrollY,
        height: r.height,
        innerHeight: window.innerHeight,
      };
    });
  const startPoll = () =>
    page.evaluate(() => {
      window.__c13 = [];
      window.__c13int = setInterval(() => {
        const t = document.querySelector(".cw-rec__tick");
        if (t) window.__c13.push(t.textContent);
      }, 50);
    });
  const stopPoll = () =>
    page.evaluate(() => {
      clearInterval(window.__c13int);
      return window.__c13 || [];
    });

  // Full load at the case study, then client-navigate home through Next Link.
  await page.goto(`${S}/work/guardicore`, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });
  let docLoads = await page.evaluate(() => window.__docLoads || 0);
  if (docLoads !== 1) invalid(`initial docLoads=${docLoads}, expect 1`);
  await page.evaluate(() => {
    const go = () => window.next.router.push("/");
    if ("startViewTransition" in document) document.startViewTransition(go);
    else go();
  });
  await page.waitForFunction(() => location.pathname === "/", {
    timeout: 15000,
  });
  await sleep(800);
  await waitHydrated(page);
  docLoads = await page.evaluate(() => window.__docLoads || 0);
  if (docLoads !== 1) invalid(`docLoads after client home=${docLoads}, expect 1`);

  // Real play: arm zone, hold 250ms, centre, poll every 50ms for 3200ms.
  const pre = await readWrap();
  await startPoll();
  const stageA = pre.absTop - 1.75 * pre.innerHeight;
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, stageA));
  await sleep(250);
  const centre = pre.absTop + pre.height / 2 - pre.innerHeight / 2;
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, centre));
  await sleep(3200);
  const firstSamples = await stopPoll();
  const firstNonFinal = firstSamples.find((text) => text !== FINAL) ?? "(none)";
  if (firstNonFinal !== "$0M") {
    invalid(
      `first play first non-final=${JSON.stringify(firstNonFinal)}, expect "$0M"`,
    );
  }

  // Back and Forward traverse the two client entries in the same document.
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(300);
  await page.goBack({ timeout: 15000 }).catch(() => null);
  await page.waitForFunction(() => location.pathname === "/work/guardicore", {
    timeout: 15000,
  });
  await sleep(800);
  await page.goForward({ timeout: 15000 }).catch(() => null);
  await page.waitForFunction(() => location.pathname === "/", {
    timeout: 15000,
  });
  await sleep(800);
  docLoads = await page.evaluate(() => window.__docLoads || 0);
  if (docLoads !== 1) {
    invalid(`docLoads after client back and forward=${docLoads}, expect 1`);
  }

  let back = await readWrap();
  if (!(back.top > back.innerHeight)) {
    await page.evaluate(() => window.scrollTo(0, 0));
    back = await readWrap();
  }
  if (!(back.top > back.innerHeight))
    invalid(
      `wrap top ${Math.round(back.top)} not below the fold ${back.innerHeight}`,
    );

  // Arm zone, hold 250ms, centre, poll the tick every 50ms for 3200ms.
  await startPoll();
  const stageA2 = back.absTop - 1.75 * back.innerHeight;
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, stageA2));
  await sleep(250);
  const centre2 = back.absTop + back.height / 2 - back.innerHeight / 2;
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, centre2));
  await sleep(3200);
  const samples = await stopPoll();
  const texts = [...new Set(samples)];
  const ok = texts.length === 1 && texts[0] === FINAL;
  if (!ok) failures++;
  console.log(
    `C13 texts after client back and forward: got ${JSON.stringify(texts)}, expect ["$20M+"]${ok ? "" : "  <-- FAIL"}`,
  );
  await page.close();
}

async function runC14() {
  console.log("--- C14 no hidden frame on an in-view refresh (6x CPU) ---");
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  const cdp = page.createCDPSession
    ? await page.createCDPSession()
    : await (await page.target()).createCDPSession();
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 6 });
  // Poller on every new document: on every animation frame from
  // DOMContentLoaded for 1500ms, read the first loop path's inline dash
  // pair. A frame is hidden when the dasharray is neither empty nor none
  // and the offset is above 0.
  await page.evaluateOnNewDocument(() => {
    window.__hiddenFrames = 0;
    window.__c14Frames = 0;
    window.__c14Seen = [];
    const read = () => {
      const p = document.querySelector(".cw-rec .hand-circle path");
      if (!p) return;
      const da = p.style.strokeDasharray;
      const doffRaw = p.style.strokeDashoffset;
      const off = parseFloat(doffRaw);
      window.__c14Frames++;
      window.__c14Seen.push(`${da || "(empty)"}|${doffRaw || "(empty)"}`);
      if (da !== "" && da !== "none" && off > 0) window.__hiddenFrames++;
    };
    document.addEventListener("DOMContentLoaded", () => {
      const t0 = performance.now();
      const frame = () => {
        read();
        if (performance.now() - t0 < 1500) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
  });
  await page.goto(`${S}/#cw-products-title`, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });
  let mode = "anchor #cw-products-title";
  let info = await page.evaluate(() => {
    const r = document.querySelector(".cw-rec__wrap").getBoundingClientRect();
    return { top: r.top, innerHeight: window.innerHeight };
  });
  if (!(info.top < info.innerHeight)) {
    // Same fallback as countup114 chk3: centre, then reload (the
    // evaluateOnNewDocument poller re-installs on the new document).
    mode = "fallback centre + reload";
    await page.evaluate(() => {
      const r = document.querySelector(".cw-rec__wrap").getBoundingClientRect();
      window.scrollTo(
        0,
        Math.max(0, r.top + window.scrollY + r.height / 2 - window.innerHeight / 2),
      );
    });
    await page.reload({ waitUntil: "networkidle0", timeout: 60000 });
  }
  await sleep(2200); // poller window is 1500ms from DOMContentLoaded
  const result = await page.evaluate(() => {
    const r = document.querySelector(".cw-rec__wrap").getBoundingClientRect();
    return {
      hidden: window.__hiddenFrames ?? -1,
      frames: window.__c14Frames ?? -1,
      top: r.top,
      innerHeight: window.innerHeight,
    };
  });
  const inView = result.top < result.innerHeight;
  const ok = inView && result.hidden === 0;
  if (!ok) failures++;
  console.log(
    `C14 hidden frames on in-view load: got ${result.hidden}, expect 0${ok ? "" : "  <-- FAIL"}${inView ? "" : ` (invalid: figure top ${Math.round(result.top)} not in view)`} [${mode}, ${result.frames} frames sampled]`,
  );
  await cdp.detach();
  await page.close();
}

if (PROBE) {
  const page = await freshPage({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${S}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await centreOnFigure(page);
  await sleep(400);
  const probe = await page.evaluate(() =>
    [...document.querySelectorAll(".cw-rec .hand-circle path")].map((el) => {
      const user = el.getTotalLength();
      const ctm = el.getScreenCTM();
      let screen = 0;
      let previous = null;
      for (let i = 0; i < 400; i++) {
        const p = el.getPointAtLength((i / 399) * user);
        const mapped = new DOMPoint(p.x, p.y).matrixTransform(ctm);
        if (previous) screen += Math.hypot(mapped.x - previous.x, mapped.y - previous.y);
        previous = mapped;
      }
      return { user, screen, ratio: screen / user };
    }),
  );
  probe.forEach(({ user, screen, ratio }, i) => {
    console.log(
      `P1 path${i}: user=${user.toFixed(2)} screen=${screen.toFixed(2)} ratio=${ratio.toFixed(2)}`,
    );
  });
  await page.close();
  await browser.close();
  process.exit(0);
}

// ---------------------------------------------------------------- §2, M1
// Scroll .cw-rec to the viewport centre, hide the loop, screenshot the clip,
// decode the ink box in a separate about:blank page, restore the loop.
// Returns { F, wrap, title, lbl, ink (CSS px, client coords), em: {L,T,W,H} }.
async function measureInk(page, dsf) {
  await page.goto(`${S}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    const r = document.querySelector(".cw-rec").getBoundingClientRect();
    window.scrollTo(
      0,
      Math.max(0, r.top + r.height / 2 - window.innerHeight / 2),
    );
  });
  await sleep(400);

  const g = await page.evaluate(() => {
    // DOMRect serializes to {} through this evaluate path; toJSON() it.
    const rect = (el) => el.getBoundingClientRect().toJSON();
    const wrap = rect(document.querySelector(".cw-rec__wrap"));
    const title = rect(document.querySelector(".cw-receipts__title"));
    const lbl = rect(document.querySelector(".cw-rec__lbl"));
    const F = parseFloat(
      getComputedStyle(document.querySelector(".cw-rec__num")).fontSize,
    );
    return { wrap, title, lbl, F };
  });
  const { wrap, title, lbl, F } = g;

  await page.evaluate(() => {
    document.querySelector(".cw-rec .hand-circle").style.visibility = "hidden";
  });

  const clip = {
    x: wrap.left - 0.3 * F,
    y: Math.max(wrap.top - 0.25 * F, title.bottom + 1),
    width: wrap.right + 0.3 * F - (wrap.left - 0.3 * F),
    height:
      Math.min(wrap.bottom + 0.25 * F, lbl.top - 1) -
      Math.max(wrap.top - 0.25 * F, title.bottom + 1),
  };
  // screenshot({clip}) renders against an UNSCROLLED surface in this
  // puppeteer (verified 2026-09-12: the clip over the figure captured hero
  // pixels instead), so capture the full viewport and apply the clip as a
  // crop in the decoder — same rectangle, corners, and threshold.
  const shot = await page.screenshot({ encoding: "base64" });

  await page.evaluate(() => {
    document.querySelector(".cw-rec .hand-circle").style.visibility = "";
  });

  // Decode in a separate about:blank page.
  const dp = await browser.newPage();
  await dp.goto("about:blank");
  const inkImg = await dp.evaluate(
    async (dataUrl, clip, dsf) => {
      const img = new Image();
      img.src = dataUrl;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, c.width, c.height).data;
      const W = c.width;
      const H = c.height;
      // Crop = the clip rectangle in image px, clamped to the frame.
      const x0 = Math.max(0, Math.round(clip.x * dsf));
      const y0 = Math.max(0, Math.round(clip.y * dsf));
      const x1 = Math.min(W, Math.round((clip.x + clip.width) * dsf));
      const y1 = Math.min(H, Math.round((clip.y + clip.height) * dsf));
      const rs = [];
      const gs = [];
      const bs = [];
      for (const [bx, by] of [
        [x0, y0],
        [x1 - 6, y0],
        [x0, y1 - 6],
        [x1 - 6, y1 - 6],
      ]) {
        for (let y = by; y < by + 6; y++)
          for (let x = bx; x < bx + 6; x++) {
            const i = (y * W + x) * 4;
            rs.push(d[i]);
            gs.push(d[i + 1]);
            bs.push(d[i + 2]);
          }
      }
      const med = (a) => {
        a.sort((p, q) => p - q);
        return a[(a.length - 1) >> 1];
      };
      const bg = [med(rs), med(gs), med(bs)];
      let minX = W;
      let minY = H;
      let maxX = -1;
      let maxY = -1;
      let count = 0;
      for (let y = y0; y < y1; y++)
        for (let x = x0; x < x1; x++) {
          const i = (y * W + x) * 4;
          const diff = Math.max(
            Math.abs(d[i] - bg[0]),
            Math.abs(d[i + 1] - bg[1]),
            Math.abs(d[i + 2] - bg[2]),
          );
          if (diff > 60) {
            count++;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      return { W, H, bg, count, minX, minY, maxX, maxY };
    },
    `data:image/png;base64,${shot}`,
    clip,
    dsf,
  );
  await dp.close();

  // Image px -> CSS px (device scale factor) -> viewport coords.
  const ink = {
    left: inkImg.minX / dsf,
    top: inkImg.minY / dsf,
    w: (inkImg.maxX - inkImg.minX + 1) / dsf,
    h: (inkImg.maxY - inkImg.minY + 1) / dsf,
  };
  const em = {
    L: (ink.left - wrap.left) / F,
    T: (ink.top - wrap.top) / F,
    W: ink.w / F,
    H: ink.h / F,
  };
  return { F, wrap, title, lbl, ink, em, inkCount: inkImg.count };
}

// ------------------------------------------------------- §4, path sampling
async function sampleLoop(page) {
  return page.evaluate(() => {
    const paths = [...document.querySelectorAll(".cw-rec .hand-circle path")];
    const sample = (el, n) => {
      const len = el.getTotalLength();
      const c = el.getScreenCTM();
      const pts = [];
      for (let i = 0; i < n; i++) {
        const p = el.getPointAtLength((i / (n - 1)) * len);
        const m = new DOMPoint(p.x, p.y).matrixTransform(c);
        pts.push([m.x, m.y]);
      }
      return pts;
    };
    const tick = document.querySelector(".cw-rec__tick");
    const rect = (el) => el.getBoundingClientRect().toJSON();
    const title = rect(document.querySelector(".cw-receipts__title"));
    const lbl = rect(document.querySelector(".cw-rec__lbl"));
    return {
      primary: sample(paths[0], 400),
      overshoot: sample(paths[1], 150),
      tick: tick ? tick.textContent : null,
      titleLeft: title.left,
      titleBottom: title.bottom,
      lblTop: lbl.top,
      innerW: window.innerWidth,
    };
  });
}

function insideEvenOdd(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (
      (yi > py) !== (yj > py) &&
      px < ((xj - xi) * (py - yi)) / (yj - yi) + xi
    )
      inside = !inside;
  }
  return inside;
}

function distToPolyline(px, py, poly) {
  let best = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [ax, ay] = poly[j];
    const [bx, by] = poly[i];
    const dx = bx - ax;
    const dy = by - ay;
    const l2 = dx * dx + dy * dy;
    let t = l2 ? ((px - ax) * dx + (py - ay) * dy) / l2 : 0;
    t = Math.max(0, Math.min(1, t));
    best = Math.min(best, Math.hypot(px - (ax + t * dx), py - (ay + t * dy)));
  }
  return best;
}

// ------------------------------------------------------------------ widths
const WIDTHS = [
  { name: "1440", vp: { width: 1440, height: 900, deviceScaleFactor: 1 }, dsf: 1 },
  { name: "390", vp: { width: 390, height: 844, deviceScaleFactor: 2 }, dsf: 2 },
];

const m1 = {};
let ratioDiff = null;

for (const W of WIDTHS) {
  console.log(`--- ${W.vp.width}x${W.vp.height} (dpr ${W.dsf}) ---`);
  const page = await freshPage(W.vp);
  const r = await measureInk(page, W.dsf);
  m1[W.name] = r;
  console.log(
    `M1 ${W.name}: L=${f3(r.em.L)}em T=${f3(r.em.T)}em W=${f3(r.em.W)}em H=${f3(r.em.H)}em W/H=${f3(r.em.W / r.em.H)}`,
  );
  console.log(
    `     (F=${r.F}px ink=${r.inkCount}px inkBox=${f3(r.ink.w)}x${f3(r.ink.h)}px at ${f3(r.ink.left)},${f3(r.ink.top)})`,
  );

  if (M1_ONLY) {
    await page.close();
    continue;
  }

  // ---------------------------------------------------------- C1 .. C10
  const L = await sampleLoop(page);
  const ink = r.ink;
  const corners = [
    [ink.left, ink.top],
    [ink.left + ink.w, ink.top],
    [ink.left, ink.top + ink.h],
    [ink.left + ink.w, ink.top + ink.h],
  ];
  const all = [...L.primary, ...L.overshoot];
  const minX = Math.min(...all.map((p) => p[0]));
  const maxX = Math.max(...all.map((p) => p[0]));
  const minY = Math.min(...all.map((p) => p[1]));
  const maxY = Math.max(...all.map((p) => p[1]));
  const cX = (minX + maxX) / 2;
  const cY = (minY + maxY) / 2;
  const iCX = ink.left + ink.w / 2;
  const iCY = ink.top + ink.h / 2;

  const results = [];

  // C1 corners inside loop (even-odd, ink box corners)
  const c1 = corners.filter(([x, y]) => insideEvenOdd(x, y, L.primary)).length;
  results.push(["C1 corners inside loop", c1, 4, c1 === 4]);

  // C2 min corner clearance (corner to loop polyline)
  const c2 = Math.min(...corners.map(([x, y]) => distToPolyline(x, y, L.primary)));
  const c2exp = 0.05 * ink.h;
  results.push([
    "C2 min corner clearance",
    `${f3(c2)}px`,
    `>= ${f3(c2exp)}px`,
    c2 >= c2exp,
  ]);

  // C3 overshoot points inside ink box
  const c3 = L.overshoot.filter(
    ([x, y]) =>
      x > ink.left &&
      x < ink.left + ink.w &&
      y > ink.top &&
      y < ink.top + ink.h,
  ).length;
  results.push(["C3 overshoot points inside ink box", c3, 0, c3 === 0]);

  // C4 loop left to column edge
  const c4 = Math.abs(minX - L.titleLeft);
  results.push(["C4 loop left to column edge", `${f3(c4)}px`, "<= 3px", c4 <= 3]);

  // C5 loop inside viewport
  const c5 = minX >= 0 && maxX <= L.innerW;
  results.push(["C5 loop inside viewport", c5, true, c5 === true]);

  // C6 title clearance
  const c6 = minY - L.titleBottom;
  results.push(["C6 title clearance", `${f3(c6)}px`, ">= 12px", c6 >= 12]);

  // C7 label clearance
  const c7 = L.lblTop - maxY;
  results.push(["C7 label clearance", `${f3(c7)}px`, ">= 8px", c7 >= 8]);

  // C8 centre x offset
  const c8 = Math.abs(cX - iCX) / ink.w;
  results.push(["C8 centre x offset", f3(c8), "<= 0.02", c8 <= 0.02]);

  // C9 centre y offset
  const c9 = Math.abs(cY - iCY) / ink.h;
  results.push(["C9 centre y offset", f3(c9), "<= 0.04", c9 <= 0.04]);

  // C10 tick text
  results.push(["C10 tick text", `"${L.tick}"`, `"${FINAL}"`, L.tick === FINAL]);

  for (const [name, got, expect, ok] of results) {
    if (!ok) failures++;
    console.log(`${name}: got ${got}, expect ${expect}${ok ? "" : "  <-- FAIL"}`);
  }

  await checkStrokeCoverage(
    page,
    W.name === "1440" ? "reduced" : "reduced-390",
    r.ink.h,
    W.dsf,
  );

  // ------------------------------------------------------------ captures
  await page.evaluate(() => document.fonts.ready);
  if (W.name === "1440") {
    await page.screenshot({ path: `${OUT}/home-rec-done-1440.png` });
    console.log(`     capture: home-rec-done-1440.png`);

    // home-receipts-1440.png: section title through the four exits.
    const span = await page.evaluate(() => {
      const t = document
        .querySelector(".cw-receipts__title")
        .getBoundingClientRect();
      const e = document.querySelector(".cw-exits").getBoundingClientRect();
      return {
        topAbs: t.top + window.scrollY,
        botAbs: e.bottom + window.scrollY,
      };
    });
    const need = Math.ceil(span.botAbs - span.topAbs + 80);
    await page.setViewport({
      width: 1440,
      height: need,
      deviceScaleFactor: 1,
    });
    await sleep(150);
    await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, span.topAbs - 40));
    await sleep(250);
    await page.screenshot({ path: `${OUT}/home-receipts-1440.png` });
    console.log(`     capture: home-receipts-1440.png (${need}px tall)`);
  } else {
    await page.screenshot({ path: `${OUT}/home-rec-done-390.png` });
    console.log(`     capture: home-rec-done-390.png (2x)`);
  }
  await page.close();
  if (W.name === "1440") await runPlayedState(r.ink.h);
}

const ratios = Object.values(m1).map((r) => r.em.W / r.em.H);
if (ratios.length === 2 && Math.abs(ratios[0] - ratios[1]) > 0.03) {
  ratioDiff = Math.abs(ratios[0] - ratios[1]);
  console.log(
    `W/H differs between widths by ${f3(ratioDiff)} (> 0.03) — continuing (numbers are font-relative and should match)`,
  );
}

if (P116 && !M1_ONLY && !PROBE) {
  await runC12();
  await runC13();
  await runC14();
}

if (!M1_ONLY) {
  console.log(`circle failures: ${failures}`);
}

await browser.close();
if (!M1_ONLY && failures !== 0) process.exit(1);
