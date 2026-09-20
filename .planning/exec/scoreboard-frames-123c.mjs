// Pass-123c V7 — REWRITE of the dead leg.
//
// Four bugs found and fixed while rewriting, in the order they surfaced:
//
// BUG 1 (the original dead leg, V1-V4): every beat capture called
// `elementHandle.screenshot()` on `.cw-exits__stage`. Puppeteer's
// ElementHandle.screenshot() unconditionally calls an internal
// `_scrollIntoViewIfNeeded()` before grabbing pixels. `.cw-exits__stage` is
// the sticky "monitor" inside a tall scroll-driven section, so that internal
// re-scroll landed on the same resting position every time and silently
// discarded the window.scrollTo() used to move between beats. Evidence: at
// 1440 all six live captures were byte-identical; at 390 five of six were.
//
// BUG 2 (found fixing bug 1, by hand): `page.screenshot({ clip,
// captureBeyondViewport: false })` threw "Cannot take screenshot with 0
// height" for a verified-sane, fully-in-viewport clip. Also confirmed
// elementHandle.boundingBox() (CDP DOM.getBoxModel) disagrees with
// getBoundingClientRect() for this position:sticky element (off by ~570px
// in one measured case) -- a second, independent geometry landmine. Fix at
// the time: measure with getBoundingClientRect() (matches what is actually
// painted) and drop captureBeyondViewport.
//
// BUG 3 (found running the bug-1/2 fix for real): repeated CLIPPED
// screenshots on the same page came back byte-identical or scroll drifted
// between calls, even though the recorded DOM state (current index, value
// text) genuinely differed and matched the already-verified geometry
// (geom-123c-after3.json) exactly. Giving every frame its own fresh page
// load removed the shared-page angle but did NOT fix it: b0/b1/b2/b3 on
// fully independent pages still came back byte-identical.
//
// BUG 4 (the real one, isolated by hand in debug-stage-height-123c.mjs):
// `page.screenshot({ clip })` itself returns a STALE frame for this page --
// confirmed by dumping the live actor geometry (getBoundingClientRect on
// `.cw-exits__val`) at beat 0 vs beat 3, which proved a huge, real,
// correctly-applied transform difference (a 897x272px "poster" box at
// beat 0 moves to a 206x63px ledger box by beat 3, a different deal grows
// to fill the poster slot instead) -- then confirming a FULL, UNCLIPPED
// `page.screenshot()` of the exact same two page states shows exactly that
// difference (17.3% of viewport pixels differ by >8, in precisely the stage
// region), while the clipped screenshot of the same states showed ~0.
// Fix: never pass `clip` to page.screenshot(). Take the full viewport
// screenshot (the well-tested, unclipped path) and crop to the element's
// getBoundingClientRect (scaled by devicePixelRatio) with `sharp` in Node
// afterward. Verified by hand: the sharp-cropped beat0-vs-beat3 pair shows
// the same ~20% pixel difference as the uncropped pair, just scoped to the
// smaller region.
//
// Usage: node .planning/exec/scoreboard-frames-123c.mjs <baseUrl> <tag> <outDir>
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");

const [baseUrl, tag, outDir] = process.argv.slice(2);
if (!baseUrl || !tag || !outDir) {
  console.error("usage: node scoreboard-frames-123c.mjs <baseUrl> <tag> <outDir>");
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const url = `${baseUrl.replace(/\/$/, "")}/`;

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: "1440", width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
];

function md5(filePath) {
  return createHash("md5").update(fs.readFileSync(filePath)).digest("hex");
}

// Geometry read (no scroll) + FULL unclipped screenshot + Node-side crop.
// NEVER elementHandle.screenshot() (BUG 1) and NEVER page.screenshot({clip})
// (BUG 4) -- both silently return stale/wrong pixels for this page.
async function captureStage(page, outputPath, deviceScaleFactor) {
  const box = await page.evaluate(() => {
    const el = document.querySelector(".cw-exits__stage");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return null;
    return { x: r.left, y: r.top, width: r.width, height: r.height };
  });
  if (!box) throw new Error(`.cw-exits__stage not visible for ${outputPath}`);
  const fullBuf = await page.screenshot();
  const meta = await sharp(fullBuf).metadata();
  const region = {
    left: Math.max(0, Math.round(box.x * deviceScaleFactor)),
    top: Math.max(0, Math.round(box.y * deviceScaleFactor)),
    width: Math.round(box.width * deviceScaleFactor),
    height: Math.round(box.height * deviceScaleFactor),
  };
  region.width = Math.min(region.width, meta.width - region.left);
  region.height = Math.min(region.height, meta.height - region.top);
  await sharp(fullBuf).extract(region).toFile(outputPath);
  return box;
}

async function readState(page) {
  return page.evaluate(() => {
    const deals = [...document.querySelectorAll(".cw-exits__deal")];
    const current = deals.findIndex((d) => d.classList.contains("is-current"));
    const valueText =
      current >= 0
        ? (deals[current].querySelector(".cw-exits__val")?.textContent ?? "").trim().replace(/\s+/g, " ") || null
        : null;
    return { scrollY: +window.scrollY.toFixed(2), current, valueText };
  });
}

async function newConfiguredPage(browser, viewport, errs, mode) {
  const page = await browser.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") errs.push(`${mode ? mode + ": " : ""}${m.text()}`);
  });
  page.on("pageerror", (e) => errs.push(`${mode ? mode + ": " : ""}${String(e)}`));
  await page.setViewport(viewport);
  if (mode === "reduced") {
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  } else if (mode === "nojs") {
    await page.setJavaScriptEnabled(false);
  }
  return page;
}

// Go-live runs inside document.fonts.ready + observer setup inside the
// component; is-live is the externally-observable proxy for "ready". Same
// wait as the verified geometry script (scoreboard-geom-123c.mjs).
async function waitLive(page) {
  await page.waitForFunction(() => !!document.querySelector(".cw-exits.is-live"), { timeout: 15000 });
  await sleep(1200);
}

async function computeY0(page) {
  return page.evaluate(() => {
    const exits = document.querySelector(".cw-exits");
    let navH = 72;
    const parsed = parseFloat(getComputedStyle(exits).getPropertyValue("--cw-nav-h"));
    if (!Number.isNaN(parsed)) navH = parsed;
    return +(exits.getBoundingClientRect().top + window.scrollY - navH).toFixed(2);
  });
}

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

const summary = { base: baseUrl, tag, when: new Date().toISOString(), widths: {} };
const failures = [];

try {
  for (const viewport of VIEWPORTS) {
    const consoleErrors = [];
    const frames = [];

    // Each beat/mid capture is a fully independent page: no shared scroll
    // or screenshot state can leak from one capture into the next (BUG 3).
    const captureBeat = async (name, beatIndex, waitMs) => {
      const page = await newConfiguredPage(browser, viewport, consoleErrors);
      await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
      await waitLive(page);
      const Y0 = await computeY0(page);
      const innerHeight = await page.evaluate(() => window.innerHeight);
      const target = Y0 + (beatIndex + 0.5) * 0.5 * innerHeight;
      await page.evaluate((yy) => window.scrollTo(0, yy), target);
      await sleep(waitMs);
      // Force two rAF ticks so we're definitely past any in-flight
      // compositor update before reading state / screenshotting.
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const outputPath = path.join(outDir, `${tag}-${viewport.name}-${name}.png`);
      const box = await captureStage(page, outputPath, viewport.deviceScaleFactor);
      const state = await readState(page);
      await page.close();
      const hash = md5(outputPath);
      const frame = { name, path: outputPath, box, md5: hash, Y0, innerHeight, target, ...state };
      frames.push(frame);
      console.log(
        `capture ${tag} ${viewport.name} ${name} scrollY=${state.scrollY} current=${state.current} value=${state.valueText} md5=${hash.slice(0, 12)}`,
      );
      return frame;
    };

    await captureBeat("b0", 0, 1500);
    await captureBeat("mid1", 1, 250);
    await captureBeat("b1", 1, 1500);
    await captureBeat("b2", 2, 1500);
    await captureBeat("mid3", 3, 250);
    await captureBeat("b3", 3, 1500);

    // Self-police #1: the four beat files must be pairwise distinct.
    const beatFrames = ["b0", "b1", "b2", "b3"].map((n) => frames.find((f) => f.name === n));
    const dupPairs = [];
    for (let i = 0; i < beatFrames.length; i++) {
      for (let j = i + 1; j < beatFrames.length; j++) {
        if (beatFrames[i].md5 === beatFrames[j].md5) dupPairs.push(`${beatFrames[i].name}=${beatFrames[j].name}`);
      }
    }
    if (dupPairs.length) {
      console.log(`FAIL identical beat frames ${viewport.name} (${dupPairs.join(", ")})`);
      failures.push(`identical beat frames ${viewport.name}: ${dupPairs.join(", ")}`);
    } else {
      console.log(
        `PASS distinct beat frames ${viewport.name}: ${beatFrames.map((f) => f.md5.slice(0, 8)).join(",")}`,
      );
    }

    // Self-police #2: current index sequence across b0..b3 must be 0,1,2,3.
    const currentSeq = beatFrames.map((f) => f.current);
    const seqOk = currentSeq.length === 4 && currentSeq.every((v, i) => v === i);
    if (!seqOk) {
      console.log(`FAIL current indices ${viewport.name} got [${currentSeq.join(",")}] expected [0,1,2,3]`);
      failures.push(`current indices ${viewport.name}: got [${currentSeq.join(",")}]`);
    } else {
      console.log(`PASS current indices ${viewport.name}: [0,1,2,3]`);
    }

    // Static frames: fresh load each, same element, same safe capture path.
    const staticFrame = async (mode) => {
      const page = await newConfiguredPage(browser, viewport, consoleErrors, mode);
      await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
      if (mode === "reduced") {
        try {
          await page.waitForFunction(() => !!document.querySelector(".cw-exits.is-live"), { timeout: 8000 });
        } catch {
          consoleErrors.push("reduced: is-live wait timed out, proceeding anyway");
        }
      }
      await sleep(800);
      await page.evaluate(() => document.querySelector(".cw-exits__stage")?.scrollIntoView({ block: "center" }));
      await sleep(400);
      const outputPath = path.join(outDir, `${tag}-${viewport.name}-${mode}.png`);
      const box = await captureStage(page, outputPath, viewport.deviceScaleFactor);
      const state = await readState(page);
      await page.close();
      const hash = md5(outputPath);
      const frame = { name: mode, path: outputPath, box, md5: hash, ...state };
      console.log(
        `capture ${tag} ${viewport.name} ${mode} scrollY=${state.scrollY} current=${state.current} value=${state.valueText} md5=${hash.slice(0, 12)}`,
      );
      return frame;
    };

    frames.push(await staticFrame("reduced"));
    frames.push(await staticFrame("nojs"));

    summary.widths[viewport.name] = { frames, consoleErrors, dupPairs, currentSeq };
  }
} finally {
  await browser.close();
}

const summaryPath = path.join(outDir, `frames-${tag}-summary.json`);
fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2) + "\n");

console.log("");
console.log("| run | width | frame | scrollY | current | value | md5 |");
console.log("|---|---:|---|---:|---:|---|---|");
for (const [width, data] of Object.entries(summary.widths)) {
  for (const f of data.frames) {
    console.log(
      `| ${tag} | ${width} | ${f.name} | ${f.scrollY} | ${f.current} | ${f.valueText ?? "null"} | ${f.md5.slice(0, 12)} |`,
    );
  }
  if (data.consoleErrors.length) {
    console.log(`${tag} ${width}: consoleErrors=${data.consoleErrors.length}`);
    for (const e of data.consoleErrors) console.log(`  ERR ${e}`);
  }
}
console.log(`wrote ${summaryPath}`);

if (failures.length) {
  console.error(`SELF-POLICE FAILED: ${failures.length} issue(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log("SELF-POLICE PASS: beat frames distinct and current indices are 0,1,2,3 for all widths");
}
