#!/usr/bin/env node
// scripts/layout-gate.mjs: the between-widths layout gate (LESSONS #20).
//
// WHY THIS EXISTS. Pass-111a's first battery passed every gate it had: render,
// copy, axe in all four worlds, no horizontal overflow at any width. Its
// captures still showed three layout defects that none of them could see:
//   1. "SURVEYMONKE / Y", a word split across two lines at 390. The rule
//      overflow-wrap: anywhere turns an overflow into a mid-word break, so the
//      overflow check had nothing to report.
//   2. The home Audit pricing box, 933px tall on a 1440x900 screen and 1022px
//      tall on 1024x768. A buyer could never see the whole box at once.
//   3. The Ordani grid, capped at 1100px, stopping 260px short of the page's
//      right edge at 1440 while every other section spans it.
//
// WHAT IT CHECKS, per route and per viewport (1440, 1280, 1024, 768, 390, 360):
//   words  no word in visible text breaks between two letters or digits (the
//          overflow-wrap break), and none breaks at all, hyphen included, in
//          display type (24px and up) or in a mono label that is that one word,
//          and no number range splits ("2025- / 2026") at any size. A break
//          after a hyphen inside a line of prose or data is ordinary and
//          passes. Measured with a Range per character.
//   boxes  from 1024px wide, no .cw-pbox is taller than the viewport.
//   fill   the grids in FILL span their container's content box.
//   spill  (Pass-111b §15 A1, Astra 1) no .cw-pbox__fig, .cw-pbox__name or
//          .cw-pbox__price crosses its own .cw-pbox's right edge (minus a
//          1px margin). A clamp() sized off the viewport, not the column,
//          let Project's "6-20 weeks" spill past its box while three other
//          boxes in the same band fit.
//
// WHAT IT CANNOT SEE: a word that is split into several text nodes (per-letter
// spans, or an inline element inside a word) is measured one node at a time.
//
// PASS = zero findings outside KNOWN. KNOWN holds findings that were already
// failing before the change under test, each with its reason. An entry is an
// open item, never an accepted one; nothing is added to let a change through.
//
// RUN:  node scripts/layout-gate.mjs [baseUrl] [route ...]
//       node scripts/layout-gate.mjs --self-test   (planted page, no server)
//   baseUrl defaults to http://localhost:3100, the "prod" entry in
//   .claude/launch.json (next start against the current .next build).
//   env AXE_TOOLS    dir whose node_modules has puppeteer-core.
//                    Default C:/tmp/p101tools. It is not a repo dependency.
//   env CHROME_PATH  Chrome executable. Default: the Windows install path.
// Exit 0 pass, 1 findings outside KNOWN, 2 setup error.
import { createRequire } from "node:module";
import path from "node:path";

const TOOLS = process.env.AXE_TOOLS || "C:/tmp/p101tools";
const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const SETTLE_MS = Number(process.env.LAYOUT_SETTLE_MS || 4000);

const req = createRequire(path.join(TOOLS, "package.json"));
let puppeteer;
try {
  const mod = req("puppeteer-core");
  puppeteer = mod.default ?? mod;
} catch (e) {
  console.error(
    `layout-gate: cannot load puppeteer-core from ${TOOLS} (${e.message}). Set AXE_TOOLS.`,
  );
  process.exit(2);
}

const SELF_TEST = process.argv.includes("--self-test");
const args = process.argv.slice(2).filter((a) => a !== "--self-test");
const BASE = (
  args[0] && /^https?:/.test(args[0]) ? args.shift() : "http://localhost:3100"
).replace(/\/$/, "");
const ROUTES = args.length
  ? args
  : ["/", "/services", "/packages", "/work", "/work/postmates", "/work/neuton"];
// Git Bash rewrites "/" into "C:/Program Files/Git/" (LESSONS #19).
const badRoutes = ROUTES.filter((r) => !r.startsWith("/") || r.includes(":"));
if (badRoutes.length) {
  console.error(
    `layout-gate: bad route(s) ${JSON.stringify(badRoutes)}. From Git Bash, set MSYS_NO_PATHCONV=1.`,
  );
  process.exit(2);
}

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: "1280", width: 1280, height: 800, deviceScaleFactor: 1 },
  { name: "1024", width: 1024, height: 768, deviceScaleFactor: 1 },
  {
    name: "768",
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    hasTouch: true,
  },
  {
    name: "390",
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },
  {
    name: "360",
    width: 360,
    height: 780,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },
];

// Grids that must reach both edges of their container's content box.
const FILL = [".cw-ord-grid", ".cw-offer__grid", ".cw-exits__row"];

// { route, check, key, reason }, matched exactly. Empty at creation.
const KNOWN = [];

// Runs in the page. Self-contained: puppeteer serialises it by source.
function probe(fill) {
  const out = { words: [], boxes: [], fill: [], spill: [] };
  const label = (el) => {
    const c = typeof el.className === "string" ? el.className.trim() : "";
    return el.tagName.toLowerCase() + (c ? "." + c.split(/\s+/)[0] : "");
  };
  const hidden = (el) => {
    if (!el.getClientRects().length) return true;
    if (getComputedStyle(el).visibility !== "visible") return true;
    return !!el.closest(".sr-only, [hidden], script, style, noscript, svg");
  };

  // A split is a defect when the line breaks between two letters or digits
  // (an overflow-wrap break) at any size; when it splits a number range
  // ("2025- / 2026") at any size; or at any point in display type (24px and
  // up) or in a mono label that is that one word. A hyphen break inside a
  // line of prose or data is ordinary typesetting: the first run flagged 14 in
  // prose and tables, the second 2 more in mono data lines.
  const HYPHENS = /[-‐-—/]/;
  const seen = new Set();
  const range = document.createRange();
  const one = document.createRange();
  const charTop = (node, i) => {
    one.setStart(node, i);
    one.setEnd(node, i + 1);
    const r = [...one.getClientRects()].find(
      (x) => x.width > 0 || x.height > 0,
    );
    return r ? r.top : null;
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const el = n.parentElement;
    if (!el || !/\S/.test(n.data) || hidden(el)) continue;
    const re = /\S+/g;
    for (let m = re.exec(n.data); m; m = re.exec(n.data)) {
      const word = m[0];
      if (word.length < 2) continue;
      range.setStart(n, m.index);
      range.setEnd(n, m.index + word.length);
      const tops = [];
      for (const r of range.getClientRects()) {
        if (r.width < 1 || r.height < 1) continue;
        if (!tops.some((t) => Math.abs(t - r.top) < r.height / 2))
          tops.push(r.top);
      }
      if (tops.length < 2) continue;
      const top0 = charTop(n, m.index);
      let at = -1;
      for (let i = 1; i < word.length && top0 !== null; i++) {
        const t = charTop(n, m.index + i);
        if (t !== null && Math.abs(t - top0) > 2) {
          at = i;
          break;
        }
      }
      const s = getComputedStyle(el);
      const size = parseFloat(s.fontSize);
      const mono = /mono/i.test(s.fontFamily);
      const atHyphen = at > 0 && HYPHENS.test(word[at - 1]);
      const label1 = mono && el.textContent.trim() === word;
      const numeric =
        at > 1 && /\d/.test(word[at - 2]) && /\d/.test(word[at] || "");
      if (atHyphen && size < 24 && !label1 && !numeric) continue;
      const key = `${label(el)} "${word}"`;
      if (seen.has(key)) continue;
      seen.add(key);
      const where =
        at > 0 ? `"${word.slice(0, at)} / ${word.slice(at)}"` : `"${word}"`;
      out.words.push({
        key,
        msg: `word breaks as ${where} (${Math.round(size)}px${mono ? " mono" : ""}): ${key}`,
      });
    }
  }

  if (innerWidth >= 1024) {
    for (const b of document.querySelectorAll(".cw-pbox")) {
      const r = b.getBoundingClientRect();
      if (!r.width || r.height <= innerHeight) continue;
      const key = b.id || b.closest("[id]")?.id || ".cw-pbox";
      out.boxes.push({
        key,
        msg: `pricing box ${key} is ${Math.round(r.width)}x${Math.round(r.height)}, taller than the ${innerHeight}px viewport`,
      });
    }
  }

  for (const sel of fill) {
    for (const g of document.querySelectorAll(sel)) {
      const r = g.getBoundingClientRect();
      if (!r.width || !g.parentElement) continue;
      const p = g.parentElement;
      const s = getComputedStyle(p);
      const pr = p.getBoundingClientRect();
      const left =
        pr.left + parseFloat(s.paddingLeft) + parseFloat(s.borderLeftWidth);
      const right =
        pr.right - parseFloat(s.paddingRight) - parseFloat(s.borderRightWidth);
      const short = Math.round(right - r.right + (r.left - left));
      if (short > 2) {
        out.fill.push({
          key: sel,
          msg: `${sel} is ${Math.round(r.width)}px wide in a ${Math.round(right - left)}px container, ${short}px short`,
        });
      }
    }
  }

  // spill (Pass-111b §15 A1): a figure/name/price sized off the viewport
  // rather than its own column can cross its box's right edge while the
  // box itself never overflows, so neither the words check (no text-node
  // break) nor a plain overflow check would see it.
  for (const el of document.querySelectorAll(
    ".cw-pbox__fig, .cw-pbox__name, .cw-pbox__price",
  )) {
    const box = el.closest(".cw-pbox");
    if (!box || hidden(el)) continue;
    const er = el.getBoundingClientRect();
    if (!er.width) continue;
    const br = box.getBoundingClientRect();
    if (er.right > br.right - 1) {
      const key = `${box.id || ".cw-pbox"} ${label(el)}`;
      out.spill.push({
        key,
        msg: `${label(el)} right edge ${Math.round(er.right)} crosses ${box.id || ".cw-pbox"} right edge ${Math.round(br.right)} (-1px margin)`,
      });
    }
  }
  return out;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
});

// --self-test: the three checks against a planted page, with near misses that
// must stay clean (LESSONS #21). Needs Chrome, not a server.
if (SELF_TEST) {
  const planted = `<!doctype html><html><head><style>
    body { margin: 0; font: 20px/1.2 sans-serif; }
    .narrow { width: 60px; overflow-wrap: anywhere; }
    .hyph { width: 60px; font-size: 32px; }
    .body-hyph { width: 50px; font-size: 16px; }
    .tag { display: block; width: 50px; font: 16px monospace; }
    .mono-line { width: 60px; font: 16px monospace; }
    .body-range { width: 60px; font-size: 16px; }
    .wide { width: 700px; }
    .box { padding: 0 10px; width: 400px; }
    .cap { max-width: 200px; }
    .cw-pbox { height: 2000px; }
    .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  </style></head><body>
    <p class="narrow">SURVEYMONKEY</p>
    <p class="hyph">go-to-market</p>
    <p class="body-hyph">full-time work</p>
    <span class="tag">2025–2026</span>
    <p class="mono-line">wide-open market data</p>
    <p class="body-range">in 2024-2025 work</p>
    <p class="wide">SURVEYMONKEY fits on one line here</p>
    <p class="narrow" style="visibility: hidden">HIDDENWORDSPLIT</p>
    <p class="sr-only">SCREENREADERONLYTEXT</p>
    <div class="box"><div class="cw-ord-grid cap">short</div></div>
    <div class="box"><div class="cw-offer__grid">full</div></div>
    <article class="cw-pbox" id="planted-tall"></article>
    <article class="cw-pbox" id="planted-ok" style="height: 100px"></article>
    <article class="cw-pbox" id="spill-bad" style="height: 100px; width: 300px; padding: 0;">
      <div class="cw-pbox__fig" style="display: inline-block; white-space: nowrap; width: 400px; font-size: 16px;">bad</div>
    </article>
    <article class="cw-pbox" id="spill-ok" style="height: 100px; width: 300px; padding: 10px; box-sizing: border-box;">
      <div class="cw-pbox__name" style="display: block; width: 280px; font-size: 16px;">ok</div>
    </article>
  </body></html>`;
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page.setContent(planted, { waitUntil: "load" });
  const res = await page.evaluate(probe, [".cw-ord-grid", ".cw-offer__grid"]);
  await browser.close();
  const keys = (list) => list.map((f) => f.key).sort();
  const got = {
    words: keys(res.words),
    boxes: keys(res.boxes),
    fill: keys(res.fill),
    spill: keys(res.spill),
  };
  const want = {
    words: [
      'p.body-range "2024-2025"',
      'p.hyph "go-to-market"',
      'p.narrow "SURVEYMONKEY"',
      'span.tag "2025–2026"',
    ],
    boxes: ["planted-tall"],
    fill: [".cw-ord-grid"],
    spill: ["spill-bad div.cw-pbox__fig"],
  };
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(
    ok
      ? "layout-gate self-test: 7 planted defects caught, 8 near misses clean"
      : `layout-gate self-test: FAILED\n  want ${JSON.stringify(want)}\n  got  ${JSON.stringify(got)}`,
  );
  process.exit(ok ? 0 : 1);
}

const findings = [];
let loads = 0;
try {
  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      const { name, ...viewport } = vp;
      const page = await browser.newPage();
      await page.setViewport({ isMobile: false, hasTouch: false, ...viewport });
      const resp = await page.goto(BASE + route, {
        waitUntil: "networkidle0",
        timeout: 90000,
      });
      const status = resp ? resp.status() : 0;
      if (status >= 400 || status === 0) {
        findings.push({
          route,
          vp: name,
          check: "load",
          key: String(status),
          msg: `HTTP ${status}`,
        });
        await page.close();
        continue;
      }
      await page.evaluate(() => document.fonts.ready.then(() => true));
      await sleep(SETTLE_MS);
      const res = await page.evaluate(probe, FILL);
      loads++;
      for (const check of ["words", "boxes", "fill", "spill"]) {
        for (const f of res[check])
          findings.push({ route, vp: name, check, ...f });
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}

const isKnown = (f) =>
  KNOWN.some(
    (k) => k.route === f.route && k.check === f.check && k.key === f.key,
  );
for (const f of findings) {
  console.log(
    `layout-gate: ${isKnown(f) ? "KNOWN" : "NEW  "} ${f.route} @${f.vp} [${f.check}] ${f.msg}`,
  );
}
for (const k of KNOWN) {
  if (
    !findings.some(
      (f) => f.route === k.route && f.check === k.check && f.key === k.key,
    )
  ) {
    console.log(
      `layout-gate: KNOWN entry no longer reproduces, delete it: ${k.route} [${k.check}] ${k.key}`,
    );
  }
}
const fresh = findings.filter((f) => !isKnown(f));
console.log(
  `layout-gate: ${loads} page loads across ${ROUTES.length} routes, ${findings.length} finding(s), ${fresh.length} not in KNOWN`,
);
process.exit(fresh.length ? 1 : 0);
