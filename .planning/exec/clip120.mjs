// .planning/exec/clip120.mjs — Pass-120 V4 (brief §6.3): the /work hero clip, measured from
// served markup, media properties and painted pixels.
// "Ink": a viewport screenshot cropped to the media element's rect (clamped to the viewport),
// decoded through a canvas in a separate about:blank page (the circle115.mjs pattern; a
// screenshot({clip}) is not used), luminance standard deviation > 10.
// "Same pixels": two decoded crops differ by at most 2 in every channel of every pixel.
//
// Usage: node .planning/exec/clip120.mjs [base]
//   base defaults to http://localhost:3200.
// Every result line is `PASS <id>: got <x>` or `FAIL <id>: got <x> (want <y>)`; the run ends on
// `clip120 failures: N` and exits 1 when N is not 0.
//
// Choices the spec leaves open: C2, C7 read the C3 page at 1440 after its captures; C6 runs with
// motion (reduced is C4); C9 runs on the C4 reduced pages and counts text whose line box starts
// within 120px below the media rect and overlaps it horizontally. "After load" is the navigation
// entry's loadEventEnd. C8 reads the repository this script sits in.
// Bite proof: run against production before the pass; it must fail C1 (no <video on /work).
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const pos = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const BASE = (pos[0] || "http://localhost:3200").replace(/\/$/, "");
const REPO = fileURLToPath(new URL("../../", import.meta.url));
const RAW_SOURCE_BYTES = 3264298;

const WIDTHS = [1440, 390];
const VP = {
  1440: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  390: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`${ok ? "PASS" : "FAIL"} ${id}: got ${got}${ok ? "" : ` (want ${want})`}`);
  if (!ok) failures++;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const errText = (e) => String((e && e.message) || e).split("\n")[0];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const decoder = await browser.newPage();
await decoder.goto("about:blank");

async function openPage(w, { reduced, js = true, saveData = false }) {
  const page = await browser.newPage();
  await page.bringToFront();
  await page.setCacheEnabled(false);
  await page.setViewport(VP[w]);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: reduced ? "reduce" : "no-preference" },
  ]);
  if (saveData)
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(Navigator.prototype, "connection", {
        get: () => ({ saveData: true, effectiveType: "4g", addEventListener() {}, removeEventListener() {} }),
      });
    });
  if (js)
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
  else await page.setJavaScriptEnabled(false);
  return page;
}

// Goes to /work, waits for the load event, and maps page time to the node clock.
async function loadWork(page) {
  const resp = await page.goto(BASE + "/work", { waitUntil: "load", timeout: 60000 });
  const t0 = Date.now();
  const r = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    return { now: performance.now(), load: nav ? nav.loadEventEnd : null };
  });
  const t1 = Date.now();
  const offset = (t0 + t1) / 2 - r.now;
  return {
    status: resp ? resp.status() : 0,
    load: r.load,
    toNode: (pt) => pt + offset,
    pageNow: () => Date.now() - offset,
  };
}

const waitUntilPage = async (clock, pageT) => {
  const d = clock.toNode(pageT) - Date.now();
  if (d > 0) await sleep(d);
};

// The media element's rect clamped to the viewport. allowImg: fall back to the first visible main img.
async function mediaRect(page, allowImg) {
  return page.evaluate((allowImg) => {
    const HIDE = '.sr-only, .cw-sr-only, [hidden], .skip-to-content, [role="dialog"]';
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 2 && r.height > 2 && cs.visibility !== "hidden" && cs.display !== "none" && !el.closest(HIDE);
    };
    let el = document.querySelector("main video");
    let kind = "video";
    if (!el && allowImg) {
      el = [...document.querySelectorAll("main img")].find(visible) || null;
      kind = "img";
    }
    if (!el) return { kind: null };
    const r = el.getBoundingClientRect();
    const x0 = Math.max(0, r.left);
    const y0 = Math.max(0, r.top);
    const x1 = Math.min(window.innerWidth, r.right);
    const y1 = Math.min(window.innerHeight, r.bottom);
    return {
      kind,
      src: kind === "video" ? el.currentSrc || el.getAttribute("poster") || "" : el.currentSrc || el.getAttribute("src") || "",
      rect: x1 > x0 && y1 > y0 ? { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } : null,
      full: { left: r.left, top: r.top, width: r.width, height: r.height },
    };
  }, allowImg);
}

async function capture(page, clock) {
  const at = clock.pageNow() - clock.load;
  const b64 = await page.screenshot({ encoding: "base64", captureBeyondViewport: false });
  return { b64, at };
}

// Decodes captures in the about:blank page. Returns luminance std of each crop and the max
// channel difference between the first two.
async function decode(caps, rect, dsf) {
  return decoder.evaluate(
    async (list, rect, dsf) => {
      const crops = [];
      for (const b64 of list) {
        const img = new Image();
        img.src = `data:image/png;base64,${b64}`;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        const x0 = Math.max(0, Math.round(rect.x * dsf));
        const y0 = Math.max(0, Math.round(rect.y * dsf));
        const x1 = Math.min(c.width, Math.round((rect.x + rect.w) * dsf));
        const y1 = Math.min(c.height, Math.round((rect.y + rect.h) * dsf));
        crops.push(ctx.getImageData(x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0)).data);
      }
      const std = crops.map((d) => {
        let n = 0;
        let sum = 0;
        let sq = 0;
        for (let i = 0; i < d.length; i += 4) {
          const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
          n++;
          sum += l;
          sq += l * l;
        }
        const mean = sum / n;
        return Math.sqrt(Math.max(0, sq / n - mean * mean));
      });
      let maxDiff = null;
      if (crops.length >= 2) {
        const [a, b] = crops;
        if (a.length !== b.length) maxDiff = Infinity;
        else {
          maxDiff = 0;
          for (let i = 0; i < a.length; i++) {
            if (i % 4 === 3) continue;
            const d = Math.abs(a[i] - b[i]);
            if (d > maxDiff) maxDiff = d;
          }
        }
      }
      return { std, maxDiff };
    },
    caps.map((c) => c.b64),
    rect,
    dsf,
  );
}

const f1 = (v) => (v === null || v === undefined ? String(v) : Number(v).toFixed(1));

// ---------------------------------------------------------------- C1: SSR markup
try {
  const res = await fetch(BASE + "/work", { cache: "no-store" });
  const html = (await res.text()).replace(/<!-- -->/g, "");
  if (res.status !== 200) chk("C1 /work status", false, res.status, 200);
  const videos = (html.match(/<video\b/gi) || []).length;
  chk("C1 exactly one <video", videos === 1, videos, 1);
  const tag = (html.match(/<video\b[^>]*>/i) || [null])[0];
  if (tag) {
    const attrs = {};
    const body = tag.replace(/^<video\b/i, "").replace(/\/?>$/, "");
    for (const m of body.matchAll(/([^\s"'=<>\/`]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g))
      attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
    const poster = attrs.poster ?? null;
    const banned = ["autoplay", "loop", "controls"].filter((a) => a in attrs);
    chk(
      "C1 <video> attributes",
      poster !== null && poster.trim() !== "" && banned.length === 0,
      `poster ${poster === null ? "(absent)" : JSON.stringify(poster)}, autoplay/loop/controls present: ${banned.length ? banned.join(",") : "none"}`,
      "non-empty poster, none of autoplay/loop/controls",
    );
  } else chk("C1 <video> attributes", false, "no <video> tag", "non-empty poster, none of autoplay/loop/controls");
  const tracks = (html.match(/<track\b/gi) || []).length;
  chk("C1 no <track", tracks === 0, tracks, 0);
} catch (e) {
  chk("C1 SSR markup", false, `error: ${errText(e)}`, "no error");
}

// ---------------------------------------------------------------- C3 (+ C2, C7 at 1440): motion
let servedUrls = null;
for (const w of WIDTHS) {
  const tag = `${w}`;
  let page;
  try {
    page = await openPage(w, { reduced: false });
    const clock = await loadWork(page);
    if (clock.status !== 200) {
      chk(`C3 /work status ${tag}`, false, clock.status, 200);
      continue;
    }
    const m = await mediaRect(page, false);
    if (m.kind !== "video" || !m.rect) {
      chk(`C3 plays once ${tag}`, false, m.kind ? "video outside the viewport" : "no main video", "a main video in the viewport");
      if (w === 1440) chk("C2 properties 1440", false, "no main video", "a main video");
      continue;
    }
    await waitUntilPage(clock, clock.load + 300);
    const c300 = await capture(page, clock);
    await waitUntilPage(clock, clock.load + 2500);
    const c2500 = await capture(page, clock);
    let ended = null;
    while (clock.pageNow() <= clock.load + 8000) {
      ended = await page.evaluate(() => window.__clipEnded);
      if (ended !== null) break;
      await sleep(50);
    }
    const endedOk = ended !== null && ended - clock.load <= 8000;
    chk(`C3 ended within 8000ms ${tag}`, endedOk, ended === null ? "no ended event" : `${f1(ended - clock.load)}ms after load`, "<= 8000ms");
    const a = await decode([c300, c2500], m.rect, VP[w].deviceScaleFactor);
    chk(
      `C3 frames move ${tag}`,
      a.maxDiff > 2,
      `max channel diff ${a.maxDiff} between ${f1(c300.at)}ms and ${f1(c2500.at)}ms`,
      "> 2 (not the same pixels)",
    );
    if (endedOk) {
      const m2 = await mediaRect(page, false);
      const rect = m2.rect || m.rect;
      await waitUntilPage(clock, ended + 100);
      const e1 = await capture(page, clock);
      await waitUntilPage(clock, ended + 2100);
      const e2 = await capture(page, clock);
      const r = await decode([e1, e2], rect, VP[w].deviceScaleFactor);
      chk(
        `C3 rests after ended ${tag}`,
        r.maxDiff <= 2 && r.std[0] > 10 && r.std[1] > 10,
        `max channel diff ${r.maxDiff} between ${f1(e1.at)}ms and ${f1(e2.at)}ms, luminance std ${f1(r.std[0])} / ${f1(r.std[1])}`,
        "diff <= 2, std > 10",
      );
      const p = await page.evaluate(() => {
        const v = document.querySelector("main video");
        return {
          paused: v.paused,
          n: v.played.length,
          start: v.played.length ? v.played.start(0) : null,
          end: v.played.length ? v.played.end(0) : null,
          duration: v.duration,
        };
      });
      chk(
        `C3 played once ${tag}`,
        p.paused === true && p.n === 1 && p.start <= 0.05 && p.end >= p.duration - 0.1,
        `paused ${p.paused}, played.length ${p.n}, start ${p.start}, end ${p.end}, duration ${p.duration}`,
        "paused true, played.length 1, start <= 0.05, end >= duration - 0.1",
      );
    } else console.log(`SKIP C3 rest captures ${tag}: no ended event within 8000ms`);

    if (w === 1440) {
      const q = await page.evaluate(() => {
        const v = document.querySelector("main video");
        return {
          muted: v.muted,
          playsInline: v.playsInline,
          loop: v.loop,
          controls: v.controls,
          duration: v.duration,
          urls: {
            current: v.currentSrc,
            sources: [...v.querySelectorAll("source")].map((s) => s.src),
            poster: v.poster,
          },
        };
      });
      chk(
        "C2 properties 1440",
        q.muted === true && q.playsInline === true && q.loop === false && q.controls === false && q.duration >= 3.9 && q.duration <= 4.2,
        `muted ${q.muted}, playsInline ${q.playsInline}, loop ${q.loop}, controls ${q.controls}, duration ${q.duration}`,
        "muted true, playsInline true, loop false, controls false, 3.9 <= duration <= 4.2",
      );
      servedUrls = q.urls;
    }
  } catch (e) {
    chk(`C3 plays once ${tag}`, false, `error: ${errText(e)}`, "no error");
  } finally {
    if (page) await page.close();
  }
}

// ---------------------------------------------------------------- C4, C5, C6: the resting frame
async function rests(id, w, opts, checkPlayed, withCaption) {
  let page;
  try {
    page = await openPage(w, opts);
    const clock = await loadWork(page);
    if (clock.status !== 200) {
      chk(`${id} /work status`, false, clock.status, 200);
      return;
    }
    await waitUntilPage(clock, clock.load + 1000);
    const m = await mediaRect(page, checkPlayed);
    if (!m.kind || !m.rect) {
      chk(`${id} rests`, false, m.kind ? `${m.kind} outside the viewport` : "no media element", "an inked media element");
      return;
    }
    const c1 = await capture(page, clock);
    await waitUntilPage(clock, clock.load + 5000);
    const c2 = await capture(page, clock);
    const r = await decode([c1, c2], m.rect, VP[w].deviceScaleFactor);
    chk(
      `${id} rests`,
      r.maxDiff <= 2 && r.std[0] > 10 && r.std[1] > 10,
      `${m.kind}: max channel diff ${r.maxDiff} between ${f1(c1.at)}ms and ${f1(c2.at)}ms, luminance std ${f1(r.std[0])} / ${f1(r.std[1])}`,
      "diff <= 2, std > 10",
    );
    if (checkPlayed) {
      const n = await page.evaluate(() => {
        const v = document.querySelector("main video");
        return v ? v.played.length : null;
      });
      chk(
        `${id} never plays`,
        n === 0 || (n === null && m.kind === "img"),
        n === null ? "no video element (visible main img checked above)" : `played.length ${n}`,
        "played.length 0 (or no video and an inked main img)",
      );
    }
    if (withCaption) {
      const c = await page.evaluate(() => {
        const HIDE = '.sr-only, .cw-sr-only, [hidden], .skip-to-content, [role="dialog"]';
        const visible = (el) => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          return r.width > 2 && r.height > 2 && cs.visibility !== "hidden" && cs.display !== "none" && !el.closest(HIDE);
        };
        const media =
          document.querySelector("main video") || [...document.querySelectorAll("main img")].find(visible) || null;
        if (!media) return null;
        const mr = media.getBoundingClientRect();
        const scope = media.closest("figure, section") || document.querySelector("main");
        const hits = [];
        const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const text = n.textContent.replace(/\s+/g, " ").trim();
          if (!text || !n.parentElement || !visible(n.parentElement)) continue;
          const range = document.createRange();
          range.selectNodeContents(n);
          for (const r of range.getClientRects()) {
            if (r.width <= 0 || r.height <= 0) continue;
            if (r.top >= mr.bottom - 1 && r.top < mr.bottom + 120 && r.right > mr.left && r.left < mr.right) {
              hits.push(text.slice(0, 40));
              break;
            }
          }
        }
        return { scope: `${scope.tagName.toLowerCase()}${scope.getAttribute("class") ? "." + scope.getAttribute("class").trim().split(/\s+/)[0] : ""}`, hits };
      });
      chk(
        `C9 no caption ${w}`,
        c !== null && c.hits.length === 0,
        c === null ? "no media element" : `${c.hits.length} text nodes within 120px below, scope ${c.scope}${c.hits.length ? ` [${c.hits.join(" | ")}]` : ""}`,
        0,
      );
    }
  } catch (e) {
    chk(`${id} rests`, false, `error: ${errText(e)}`, "no error");
  } finally {
    if (page) await page.close();
  }
}

for (const w of WIDTHS) await rests(`C4 reduced ${w}`, w, { reduced: true }, true, true);
await rests("C5 save-data 1440", 1440, { reduced: false, saveData: true }, true, false);
for (const w of WIDTHS) await rests(`C6 no-JS ${w}`, w, { reduced: false, js: false }, false, false);

// ---------------------------------------------------------------- C7: served size budget
if (!servedUrls) chk("C7 served size budget", false, "no video read from /work", "a video with sources and a poster");
else {
  const head = (url) => {
    let out = "";
    try {
      out = execFileSync("curl", ["-sI", url], { encoding: "utf8", timeout: 30000 });
    } catch (e) {
      out = e.stdout ? String(e.stdout) : "";
    }
    const lines = out.split(/\r?\n/);
    const status = Number((lines[0] || "").split(" ")[1]) || 0;
    const h = (name) => {
      const l = lines.find((x) => x.toLowerCase().startsWith(name + ":"));
      return l ? l.slice(name.length + 1).trim() : null;
    };
    const len = h("content-length");
    return { status, type: h("content-type") || "", length: len === null ? null : Number(len) };
  };
  const videos = [...new Set([servedUrls.current, ...servedUrls.sources].filter(Boolean))];
  if (!servedUrls.current) chk("C7 video.currentSrc", false, "empty", "a URL");
  let total = 0;
  for (const url of videos) {
    const r = head(url);
    total += r.length || 0;
    chk(
      `C7 video ${url.replace(BASE, "")}`,
      r.status === 200 && r.type.startsWith("video/") && r.length !== null && r.length <= 800000,
      `status ${r.status}, ${r.type || "(no content-type)"}, ${r.length === null ? "(no content-length)" : r.length} bytes`,
      "200, video/*, <= 800000",
    );
  }
  chk("C7 video bytes together", videos.length > 0 && total <= 1400000, `${total} over ${videos.length} files`, "<= 1400000");
  if (!servedUrls.poster) chk("C7 poster", false, "empty", "a URL");
  else {
    const r = head(servedUrls.poster);
    chk(
      `C7 poster ${servedUrls.poster.replace(BASE, "")}`,
      r.status === 200 && r.type.startsWith("image/") && r.length !== null && r.length <= 150000,
      `status ${r.status}, ${r.type || "(no content-type)"}, ${r.length === null ? "(no content-length)" : r.length} bytes`,
      "200, image/*, <= 150000",
    );
  }
}

// ---------------------------------------------------------------- C8: no raw source committed
try {
  const out = execFileSync("git", ["ls-files", "-s", "-z", "public"], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const files = out.split("\0").filter(Boolean).map((l) => l.slice(l.indexOf("\t") + 1));
  const hits = files.filter((f) => {
    try {
      return statSync(join(REPO, f)).size === RAW_SOURCE_BYTES;
    } catch {
      return false;
    }
  });
  chk(
    "C8 no raw source committed",
    hits.length === 0,
    `${hits.length} of ${files.length} files at ${RAW_SOURCE_BYTES} bytes${hits.length ? ` [${hits.join(" | ")}]` : ""}`,
    0,
  );
} catch (e) {
  chk("C8 no raw source committed", false, `error: ${errText(e)}`, "no error");
}

await browser.close();
console.log(`clip120 failures: ${failures}`);
process.exit(failures ? 1 : 0);
