// .planning/exec/clip-visibility-probe.mjs — the bite test for the WorkHeroClip /
// StudyBandClip page-visibility fix (uncommitted this pass, components/color-worlds/
// WorkHeroClip.tsx + StudyBandClip.tsx).
//
// Usage: node .planning/exec/clip-visibility-probe.mjs [base]
//   base defaults to http://localhost:3236. Tests run against /work/guardicore,
//   the only study currently carrying <StudyBandClip>.
//
// MECHANISM NOTE — read this before trusting assertion (a). The brief asked for
// CDP's Emulation.setPageVisibilityOverride, with Page.setWebLifecycleState or a
// backgrounded tab as fallbacks, and to say which one was used. All three were
// tried against this Chrome (Chrome/153.0.8010.52) before writing this file:
//   1. `Emulation.setPageVisibilityOverride` — protocol error, "wasn't found".
//      Also tried `Emulation.setPageVisibility`, `Page.setPageVisibility`,
//      `Emulation.setDocumentVisibility`, `Page.setVisibilityState` — all five
//      came back "wasn't found" on this build. No page-visibility-override verb
//      exists in this Chrome's CDP surface.
//   2. `Page.setWebLifecycleState({state:"frozen"})` — DOES flip
//      document.visibilityState to "hidden", but it freezes the page's task
//      queue outright (that is what "frozen" means), which would suspend the
//      IntersectionObserver callback the fix depends on along with everything
//      else. Not usable: it wouldn't let start()/play() run at all.
//   3. A genuinely backgrounded tab (front a second blank tab, leave the
//      guardicore tab unfocused) — DOES flip document.visibilityState to
//      "hidden" for real, no simulation. But measured directly (10 straight
//      seconds, 1 poll/sec, IntersectionObserver instrumented): ZERO observer
//      callbacks fired. Chrome suspends compositing/hit-testing for occluded
//      tabs, so the observer that arms start()/play() never runs, and video.play()
//      is never even called. This mechanism is used below as REAL evidence for
//      a different, still-real claim (no crash, no permanent dead state, plays
//      fine once actually looked at) but it cannot exercise the refusal branch,
//      because nothing ever calls play() while it's active.
// None of the three lets play() actually get invoked while the tab keeps
// rendering. So assertion (a)'s refusal-and-retry path is exercised with a
// DOM-level simulation instead: document.visibilityState is overridden via
// Object.defineProperty (the tab stays fully rendered — IntersectionObserver,
// compositor and rAF all keep running for real), and HTMLMediaElement.prototype
// .play is wrapped so that while the override reads "hidden" it returns
// Promise.reject(new DOMException(<Chrome's own wording>, "AbortError")) without
// touching the network; the instant the override flips back to "visible" (with a
// manually dispatched visibilitychange — defineProperty alone doesn't fire
// the browser's native event) play() calls straight through to the real
// HTMLMediaElement implementation and the clip has to actually decode and play
// for real, over the network, to pass. This is a simulation of Chrome's refusal,
// not a simulation of the component under test — the component's own code
// (WorkHeroClip.tsx / StudyBandClip.tsx) runs unmodified and its own
// `document.visibilityState` reads see the same override.
import { createRequire } from "node:module";

const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = (process.argv[2] || "http://localhost:3236").replace(/\/$/, "");
const URL_GUARDICORE = `${BASE}/work/guardicore`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`${ok ? "PASS" : "FAIL"} ${id}: got ${got}${ok ? "" : ` (want ${want})`}`);
  if (!ok) failures++;
};
const report = (id, msg) => console.log(`REPORT ${id}: ${msg}`);

// Shared page instrumentation, installed before any page script runs.
// cfg.simulateHidden: when true, document.visibilityState is overridden and
// starts at "hidden"; page.evaluate(() => window.__setVis("visible")) flips it
// (and dispatches a real visibilitychange event) later.
function instrument(cfg) {
  window.__playLog = [];
  window.__ioLog = [];
  window.__visOverride = cfg.simulateHidden ? "hidden" : null;
  window.__simulateHiddenRejection = !!cfg.simulateHidden;

  const realDesc = Object.getOwnPropertyDescriptor(Document.prototype, "visibilityState");
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    get() {
      return window.__visOverride ?? (realDesc && realDesc.get ? realDesc.get.call(document) : "visible");
    },
  });
  window.__setVis = (state) => {
    window.__visOverride = state;
    document.dispatchEvent(new Event("visibilitychange"));
  };

  const OrigIO = window.IntersectionObserver;
  window.IntersectionObserver = function (cb, opts) {
    return new OrigIO((entries) => {
      window.__ioLog.push({ t: performance.now(), intersecting: entries.map((e) => e.isIntersecting) });
      cb(entries);
    }, opts);
  };
  window.IntersectionObserver.prototype = OrigIO.prototype;

  const origPlay = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function (...args) {
    const visNow = document.visibilityState;
    const entry = { t: performance.now(), visibility: visNow, result: "pending", simulated: false };
    window.__playLog.push(entry);
    if (window.__simulateHiddenRejection && visNow !== "visible") {
      entry.simulated = true;
      entry.result = "rejected";
      entry.errName = "AbortError";
      entry.errMsg =
        "The play() request was interrupted because video-only background media was paused to save power. https://goo.gl/xX8pDD";
      return Promise.reject(new DOMException(entry.errMsg, "AbortError"));
    }
    const p = origPlay.apply(this, args);
    if (p && p.then) {
      p.then(
        () => {
          entry.result = "resolved";
          entry.tSettled = performance.now();
        },
        (e) => {
          entry.result = "rejected";
          entry.tSettled = performance.now();
          entry.errName = e && e.name;
          entry.errMsg = String((e && e.message) || e);
        },
      );
    } else {
      entry.result = "no-promise-returned";
    }
    return p;
  };
}

async function readState(page) {
  return page.evaluate(() => {
    const v = document.querySelector("video.cs-band__clip");
    return {
      visibilityState: document.visibilityState,
      playLog: window.__playLog,
      ioLogCount: window.__ioLog.length,
      video: v
        ? {
            playedLength: v.played.length,
            isPlaying: v.classList.contains("is-playing"),
            paused: v.paused,
            readyState: v.readyState,
          }
        : null,
    };
  });
}

// Poll for up to `ms`, OR-ing `is-playing` across every sample (it can be added
// then removed on "ended" before we look again), returning the last state plus
// whether is-playing was ever observed true.
async function pollUntilPlayedOrTimeout(page, ms, step = 200) {
  let everPlaying = false;
  let last = null;
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    last = await readState(page);
    if (last.video && last.video.isPlaying) everPlaying = true;
    if (last.video && last.video.playedLength >= 1 && !last.video.isPlaying) break; // played through and settled
    await sleep(step);
  }
  if (!last) last = await readState(page);
  if (last.video && last.video.isPlaying) everPlaying = true;
  return { last, everPlaying };
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });

// ==================================================================== TEST A
// (a) THE FIX WORKS — refused while hidden, retried and plays once made visible.
async function testA() {
  console.log("\n--- TEST A: refused while hidden -> retried -> plays once visible ---");

  // A1 (real, not simulated): a genuinely backgrounded tab from load onward.
  // Evidence for the mechanism note above, and a real (non-simulated) check
  // that the observer neither crashes nor fires a premature/duplicate play
  // while truly occluded, and that the clip still plays once actually viewed.
  {
    const pA = await browser.newPage();
    await pA.setViewport({ width: 1440, height: 900 });
    await pA.evaluateOnNewDocument(instrument, { simulateHidden: false });
    const pBlank = await browser.newPage();
    await pBlank.goto("about:blank");
    await pBlank.bringToFront(); // pA is now the backgrounded tab, for real
    await pA.goto(URL_GUARDICORE, { waitUntil: "load" });
    const visAtLoad = await pA.evaluate(() => document.visibilityState);
    await sleep(3000);
    const hiddenState = await readState(pA);
    report(
      "A1 real-background hidden window",
      `visibilityState-at-load=${visAtLoad} after 3s: ioLogCount=${hiddenState.ioLogCount} playLogLen=${hiddenState.playLog.length} playedLength=${hiddenState.video ? hiddenState.video.playedLength : "n/a"}`,
    );
    chk(
      "A1 no play attempt while truly backgrounded",
      hiddenState.playLog.length === 0 && hiddenState.video && hiddenState.video.playedLength === 0,
      `playLogLen=${hiddenState.playLog.length} playedLength=${hiddenState.video ? hiddenState.video.playedLength : "n/a"}`,
      "0 attempts, 0 played (observer suspended while occluded, confirms the mechanism note)",
    );
    await pA.bringToFront();
    const { last, everPlaying } = await pollUntilPlayedOrTimeout(pA, 8000);
    chk(
      "A1 plays once actually viewed after real backgrounding",
      last.video && last.video.playedLength >= 1 && everPlaying,
      `playedLength=${last.video ? last.video.playedLength : "n/a"} everObservedIsPlaying=${everPlaying}`,
      "playedLength>=1, is-playing observed at some point",
    );
    await pA.close();
    await pBlank.close();
  }

  // A2 (simulated refusal): document.visibilityState pinned to "hidden" while
  // the tab stays fully rendered, so start()/play() actually run; play() is
  // wrapped to reject with Chrome's documented AbortError while the override
  // reads "hidden", and call straight through to the real implementation the
  // instant it reads "visible" again.
  {
    const pA = await browser.newPage();
    await pA.setViewport({ width: 1440, height: 900 });
    await pA.evaluateOnNewDocument(instrument, { simulateHidden: true });
    await pA.goto(URL_GUARDICORE, { waitUntil: "load" });

    await sleep(3000); // the arm window
    const hidden = await readState(pA);
    report(
      "A2 simulated-hidden arm window (~3s)",
      `visibilityState=${hidden.visibilityState} playLog=${JSON.stringify(hidden.playLog)} playedLength=${hidden.video ? hidden.video.playedLength : "n/a"}`,
    );
    const gotRefusal = hidden.playLog.some((e) => e.simulated && e.result === "rejected" && e.visibility === "hidden");
    chk(
      "A2 play() actually attempted and refused while hidden",
      gotRefusal,
      `playLog=${JSON.stringify(hidden.playLog)}`,
      "at least one entry: simulated=true, result=rejected, visibility=hidden",
    );
    chk(
      "A2 no premature play while refused",
      hidden.video && hidden.video.playedLength === 0,
      `playedLength=${hidden.video ? hidden.video.playedLength : "n/a"}`,
      "0 (refusal, not a real start)",
    );

    // Now make it visible for real: flip the override, turn off simulation so
    // the retry's play() call is the REAL HTMLMediaElement implementation.
    await pA.evaluate(() => {
      window.__simulateHiddenRejection = false;
      window.__setVis("visible");
    });
    const { last, everPlaying } = await pollUntilPlayedOrTimeout(pA, 8000);
    report(
      "A2 after visibility flip, up to 8s",
      `playLog=${JSON.stringify(last.playLog)} playedLength=${last.video ? last.video.playedLength : "n/a"} everObservedIsPlaying=${everPlaying}`,
    );
    chk(
      "A2 clip plays after refusal once made visible (THE FIX)",
      last.video && last.video.playedLength >= 1 && everPlaying,
      `playedLength=${last.video ? last.video.playedLength : "n/a"} everObservedIsPlaying=${everPlaying}`,
      "playedLength>=1, is-playing observed at some point",
    );
    await pA.close();
  }
}

// ==================================================================== TEST B
// (b) THE CONTROL — no true control run; reasoning only, as the brief permits
// ("Do not fake a control run. If you cannot run a true control, say 'no true
// control run' and give the reasoning instead.").
function testB() {
  console.log("\n--- TEST B: control (no true control run — reasoning) ---");
  console.log("no true control run: the old component isn't checked out into a second build.");
  console.log(
    [
      "Reasoning, from the component's own doc comment describing the old behaviour",
      '("a refused play() is not retried"; playedThisLoad set synchronously before',
      "video.play() resolved): the old start() set the module-level flag the",
      "instant it CALLED play(), not the instant playback actually began, and did",
      "not branch on document.visibilityState in the .catch() at all.",
      "",
      "At A2's first checkpoint (arm window, page hidden): the old code would have",
      "called play() once (attempt made, same as the fix), gotten the same",
      "AbortError, and already set playedThisLoad = true BEFORE that rejection was",
      "even observed -- so this checkpoint would look identical to the fix's: 0",
      "played, 1 attempt logged. No difference yet; this is exactly why the",
      "original bug was invisible to a quick look.",
      "",
      "At A2's second checkpoint (visibility flip, wait up to 8s): this is where",
      "the two diverge. The fix's start() checks playedThisLoad and attempts",
      "before calling play() again, and playedThisLoad is still false (it only",
      "flips on the real 'playing' event) -- so it retries and the assertion",
      '"clip plays after refusal once made visible" passes. The old code\'s',
      "playedThisLoad was already true from the failed first attempt, and every",
      "path back into start() -- the observer callback, the effect's own entry",
      "guard (`if (!video || playedThisLoad) return`) -- returns immediately on",
      "that flag. video.play() is never called a second time, the 'playing'",
      "event never fires, and video.played.length stays 0 for the rest of the",
      "page's life. Assertion A2's final check",
      '("playedLength>=1 && everObservedIsPlaying") would read',
      "playedLength=0, everObservedIsPlaying=false -- a FAIL. That is the exact",
      "shape of the reported defect: opening the page in a background tab killed",
      "the clip for the whole load.",
    ].join("\n"),
  );
}

// ==================================================================== TEST C
// (c) NO REGRESSION IN THE NORMAL CASE — visible throughout, plays exactly once.
async function testC() {
  console.log("\n--- TEST C: normal case, page visible throughout ---");
  const pA = await browser.newPage();
  await pA.setViewport({ width: 1440, height: 900 });
  await pA.evaluateOnNewDocument(instrument, { simulateHidden: false });
  await pA.goto(URL_GUARDICORE, { waitUntil: "load" });

  const { last: afterFirstPlay, everPlaying } = await pollUntilPlayedOrTimeout(pA, 8000);
  report(
    "C first play cycle",
    `playLog=${JSON.stringify(afterFirstPlay.playLog)} playedLength=${afterFirstPlay.video ? afterFirstPlay.video.playedLength : "n/a"} everObservedIsPlaying=${everPlaying}`,
  );
  chk(
    "C plays exactly once, normal visible load",
    afterFirstPlay.video && afterFirstPlay.video.playedLength === 1 && everPlaying,
    `playedLength=${afterFirstPlay.video ? afterFirstPlay.video.playedLength : "n/a"} everObservedIsPlaying=${everPlaying}`,
    "playedLength===1, is-playing observed at some point",
  );

  // Try to provoke a second play: scroll the band out of view and back in,
  // then wait again. played.length must stay exactly 1.
  await pA.evaluate(() => {
    window.scrollBy(0, -2000);
  });
  await sleep(300);
  await pA.evaluate(() => {
    document.querySelector("video.cs-band__clip")?.scrollIntoView({ block: "center" });
  });
  await sleep(3000);
  const after = await readState(pA);
  chk(
    "C does not play twice after re-scrolling into view",
    after.video && after.video.playedLength === 1,
    `playedLength=${after.video ? after.video.playedLength : "n/a"} playLogLen=${after.playLog.length}`,
    "playedLength===1, no new play() attempt",
  );
  await pA.close();
}

// ==================================================================== TEST D
// (d) THE GUARD HOLDS — prefers-reduced-motion: reduce, never plays, even
// across a visibility flip.
async function testD() {
  console.log("\n--- TEST D: prefers-reduced-motion: reduce, guard holds across a visibility flip ---");
  const pA = await browser.newPage();
  await pA.setViewport({ width: 1440, height: 900 });
  await pA.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await pA.evaluateOnNewDocument(instrument, { simulateHidden: false });
  await pA.goto(URL_GUARDICORE, { waitUntil: "load" });
  await sleep(3000);

  const before = await readState(pA);
  report(
    "D before visibility flip",
    `playLogLen=${before.playLog.length} playedLength=${before.video ? before.video.playedLength : "n/a"} ioLogCount=${before.ioLogCount}`,
  );

  // Flip hidden -> visible using the same override machinery (harmless here
  // since simulateHidden started false, so this is a real visibilitychange
  // dispatch layered on top of the real, already-visible state).
  await pA.evaluate(() => window.__setVis("hidden"));
  await sleep(500);
  await pA.evaluate(() => window.__setVis("visible"));
  await sleep(3000);

  const after = await readState(pA);
  report(
    "D after visibility flip",
    `playLogLen=${after.playLog.length} playedLength=${after.video ? after.video.playedLength : "n/a"}`,
  );
  chk(
    "D reduced-motion guard: video never plays",
    after.video && after.video.playedLength === 0 && after.playLog.length === 0,
    `playedLength=${after.video ? after.video.playedLength : "n/a"} playLogLen=${after.playLog.length}`,
    "playedLength===0, 0 play() attempts ever",
  );
  await pA.close();
}

await testA();
testB();
await testC();
await testD();

await browser.close();
console.log(`\nclip-visibility-probe failures: ${failures}`);
process.exit(failures === 0 ? 0 : 1);
