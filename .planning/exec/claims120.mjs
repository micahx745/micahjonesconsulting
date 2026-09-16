// Pass-120 V1: the live claims sweep (brief .claude/briefs/pass-120-work-page.md §6.3 V1).
// Strings on every public route: retired phrases (K1, read from scripts/retired-phrases-gate.mjs
// at run time), scoped zeros (K2), exact and minimum presence (K3, K4), the /work record block
// (K5) and index links (K6), tenure years (K7), study JSON-LD dates (K8), the sitemap (K9) and
// the two retired-slug redirects (K10). K0 (added by the writer leg, not in V1's text) checks each
// route serves 200 and loads, so a 404 page cannot pass the zero checks by being empty.
//
// Usage: node .planning/exec/claims120.mjs [base]   (base defaults to http://localhost:3200)
// Bite proof: run against production before the pass; it must report failures.
import { createRequire } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const pos = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const BASE = (pos[0] || "http://localhost:3200").replace(/\/$/, "");
const SITE = "https://www.micahjonesconsulting.com";

const SLUGS = ["guardicore", "rfp-engine", "ordani", "content-engine", "birth-worker"];
const STUDIES = SLUGS.map((s) => `/work/${s}`);
const HTML_ROUTES = ["/", "/about", "/services", "/packages", "/contact", "/call", "/work", ...STUDIES];
const TEXT_ROUTES = ["/llms.txt", "/sitemap.xml"];
const ROUTES = [...HTML_ROUTES, ...TEXT_ROUTES];

const METHOD = "I find what your buyers are actually paying for, then build the system that sells exactly that.";
const VISIBLE_RE = [/\b8K\b/g, /\bRLS\b/g];
const VENDOR =
  /\b(Supabase|Vercel|Next\.js|Postgres(?:QL)?|Twilio|Resend|Neon|Expo|Railway|Firebase|PlanetScale|Cloudflare|AWS|GCP|Azure)\b/g;
const ORDANI_I = ["row-level security", "auth.uid", "encrypted at rest", "encryption at rest", "audit log"];
const BOTH_I = ["Protected by NDA", "client-confidential", "NEXT WORK", "back to home", "every practitioner had been", "8,000 to"];
const K3 = [
  ["/work", METHOD],
  ["/work", "Also on the record"],
  ["/work", "Four of the companies I worked inside reached an exit."],
  ["/services", "An author and leadership consultant: software that finds and drafts RFPs from buyers outside their existing network. $3M in signed contracts, close rate doubled."],
];
const K4 = [
  ["/work", "$14M"],
  ["/work/guardicore", "$14M in revenue, sourced and closed"],
  ["/work/guardicore", "a major U.S. utility"],
  ["/work/guardicore", "Acquired by Akamai in 2021"],
  ["/work/rfp-engine", "an award-winning author and leadership consultant who teaches government bodies and corporations"],
  ["/work/rfp-engine", "$3M in signed contracts"],
  ["/work/rfp-engine", "One requirement, start to finish"],
  ["/work/content-engine", "a social activist"],
  ["/work/content-engine", "800,000 impressions"],
  ["/work/content-engine", "a few thousand"],
  ["/work/ordani", "HIPAA-compliant"],
  ["/work/ordani", "Six apps and a Sunday night"],
  ["/work/ordani", "44.8"],
  ["/work/ordani", "3.15"],
  ["/work/birth-worker", "one to three"],
  ["/work/birth-worker", "five to ten"],
  ["/work/birth-worker", "thousands of dollars"],
  ["/work/birth-worker", "Medicaid"],
  ["/services", "five to ten"],
];
const RECORD_ONCE = [
  "SurveyMonkey",
  "Enterprise sales",
  "IPO, 2018",
  "$1M+ in enterprise sales toward the 2018 IPO.",
  "Postmates",
  "Product analyst",
  "Acquired by Uber, $2.65B, 2020",
  "Market and fraud analysis in the deliver-anything era, and the case for narrowing the promise to the core offerings. A promise that covers everything cannot be priced, policed or sold.",
  "Revenue and positioning",
  "Acquired by Akamai, 2021",
  "$14M in revenue, sourced and closed, after the research moved the pitch from honeypots to east-west visibility.",
  "Neuton.AI",
  "Helped launch",
  "Technology acquired by Nordic Semiconductor, 2025",
  "North American positioning for an AI product years before anyone was queuing to buy AI. I held no cap-table position.",
];
const RECORD_ORDER = ["SurveyMonkey", "Postmates", "Guardicore", "Neuton.AI"];
const K7_ROUTES = ["/", "/about", "/work", ...STUDIES, "/llms.txt"];
const K7_RAW_ROUTES = ["/", "/about", "/work", ...STUDIES];
const LEGAL = "© 2013–2026 Micah Jones";
// The footer sets the notice in uppercase with CSS, and innerText applies text-transform, so the
// visible text reads "© 2013–2026 MICAH JONES" (measured on production /about, 2026-09-16). The
// exact string is deleted without regard to case; nothing else is removed.
const LEGAL_RE = new RegExp(LEGAL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
const YEAR_RANGE = /\b(?:19|20)\d{2}\s*[-–—]\s*(?:(?:19|20)\d{2}|\d{2})\b(?![-–]\d)/g;
const YEAR_MIDDOT = /·\s*(?:19|20)\d{2}\b|\b(?:19|20)\d{2}\s*·/g;

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`  ${ok ? "PASS" : "FAIL"} ${id}: got ${got}${ok ? "" : ` (want ${want})`}`);
  if (!ok) failures++;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const collapse = (s) => s.replace(/\s+/g, " ").trim();
const count = (hay, needle) => {
  let n = 0;
  for (let i = hay.indexOf(needle); needle && i !== -1; i = hay.indexOf(needle, i + needle.length)) n++;
  return n;
};
const countI = (hay, needle) => count(hay.toLowerCase(), needle.toLowerCase());
const matches = (hay, re) => hay.match(new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g")) || [];
const q = (s) => JSON.stringify(s);

function readPhrases() {
  const src = readFileSync(join(ROOT, "scripts/retired-phrases-gate.mjs"), "utf8");
  const m = src.match(/const PHRASES = \[([\s\S]*?)\n\];/);
  if (!m) return null;
  // The strings IN the array: whole-line and trailing // comments quote operator words, not phrases.
  const body = m[1]
    .split(/\r?\n/)
    .map((l) => l.replace(/(^|[,[])\s*\/\/.*$/, "$1"))
    .join("\n");
  return [...body.matchAll(/"((?:[^"\\\r\n]|\\.)*)"/g)].map((x) => JSON.parse(`"${x[1]}"`));
}

function publishedAt(slug) {
  const f = join(ROOT, "content/work", `${slug}.mdx`);
  if (!existsSync(f)) return null;
  const fm = readFileSync(f, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const m = fm[1].match(/^publishedAt:\s*["']?([^"'\s#]+)["']?\s*(?:#.*)?$/m);
  return m ? m[1] : null;
}

function ldNodes(j) {
  if (Array.isArray(j)) return j.flatMap(ldNodes);
  if (j && typeof j === "object") return [j, ...(Array.isArray(j["@graph"]) ? j["@graph"].flatMap(ldNodes) : [])];
  return [];
}
const isArticle = (n) => n["@type"] === "Article" || (Array.isArray(n["@type"]) && n["@type"].includes("Article"));

// Raw bodies.
const raw = {};
for (const r of ROUTES) {
  try {
    const res = await fetch(BASE + r);
    raw[r] = { status: res.status, body: await res.text() };
  } catch (e) {
    raw[r] = { status: `error ${e.message}`, body: "" };
  }
}

// Visible text: HTML routes at 1440, reduced motion; text routes are their own visible text.
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
async function open(route, w) {
  const page = await browser.newPage();
  if (w === 390) await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  else await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  let err = null;
  try {
    await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 60000 });
  } catch (e) {
    err = e.message;
  }
  try {
    await page.evaluate(() => document.fonts.ready);
  } catch {}
  await sleep(1500);
  return { page, err };
}
const vis = {};
const loadErr = {};
let workPage1440 = null;
for (const r of HTML_ROUTES) {
  const { page, err } = await open(r, 1440);
  loadErr[r] = err;
  vis[r] = collapse(await page.evaluate(() => document.body.innerText).catch(() => ""));
  if (r === "/work") workPage1440 = page;
  else await page.close();
}
for (const r of TEXT_ROUTES) vis[r] = collapse(raw[r].body);

const PHRASES = readPhrases();

for (const r of ROUTES) {
  console.log(`== ${r}`);
  const v = vis[r];
  const b = raw[r].body;

  // K0 (writer addition): the route serves and loads.
  chk(`K0 ${r} status`, raw[r].status === 200, raw[r].status, 200);
  if (r in loadErr) chk(`K0 ${r} browser load`, loadErr[r] === null, loadErr[r] ?? "loaded", "loaded");

  // K1 retired strings, expect 0 each.
  const hits = [];
  if (!PHRASES) {
    chk(`K1 ${r} PHRASES read from scripts/retired-phrases-gate.mjs`, false, "no match", "the array");
  } else {
    for (const p of PHRASES) {
      const nv = countI(v, p);
      const nr = p.length >= 8 ? countI(b, p) : 0;
      if (nv || nr) hits.push([q(p), `${nv} visible, ${p.length >= 8 ? nr : "-"} raw`]);
    }
  }
  for (const re of VISIBLE_RE) {
    const nv = matches(v, re).length;
    if (nv) hits.push([String(re), `${nv} visible`]);
  }
  if (r === "/work/ordani") {
    const vend = matches(v, VENDOR);
    if (vend.length) hits.push(["vendor regex", `${vend.length} visible [${vend.join(", ")}]`]);
    for (const p of ORDANI_I) {
      const nv = countI(v, p);
      if (nv) hits.push([q(p), `${nv} visible`]);
    }
  }
  for (const p of BOTH_I) {
    // Already swept above when the gate's PHRASES carries it (e.g. "8,000 to"); count it once.
    if (PHRASES && PHRASES.some((x) => x.toLowerCase() === p.toLowerCase())) continue;
    const nv = countI(v, p);
    const nr = countI(b, p);
    if (nv || nr) hits.push([q(p), `${nv} visible, ${nr} raw`]);
  }
  if (PHRASES) {
    const both = BOTH_I.filter((p) => !PHRASES.some((x) => x.toLowerCase() === p.toLowerCase())).length;
    const total = PHRASES.length + VISIBLE_RE.length + both + (r === "/work/ordani" ? 1 + ORDANI_I.length : 0);
    if (!hits.length) chk(`K1 ${r}`, true, `0 hits across ${total} retired strings`, 0);
  }
  for (const [label, got] of hits) chk(`K1 ${r} ${label}`, false, got, 0);

  // K2 scoped zero.
  if (["/work", ...STUDIES, "/llms.txt"].includes(r)) {
    const n = countI(v, "same engagement");
    chk(`K2 ${r} "same engagement"`, n === 0, n, 0);
  }

  // K3 exact presence; the method line is 0 everywhere but /work.
  for (const [route, s] of K3) {
    if (route !== r) continue;
    const n = count(v, s);
    chk(`K3 ${r} ${q(s)}`, n === 1, n, 1);
  }
  if (r !== "/work") {
    const n = count(v, METHOD);
    chk(`K3 ${r} method line`, n === 0, n, 0);
  }

  // K4 presence.
  for (const [route, s] of K4) {
    if (route !== r) continue;
    const n = count(v, s);
    chk(`K4 ${r} ${q(s)}`, n >= 1, n, ">=1");
  }

  // K7 tenure years.
  if (K7_ROUTES.includes(r)) {
    const t = v.replace(LEGAL_RE, "");
    const ranges = matches(t, YEAR_RANGE);
    chk(`K7 ${r} year range`, ranges.length === 0, `${ranges.length}${ranges.length ? ` [${ranges.join(", ")}]` : ""}`, 0);
    const mid = matches(t, YEAR_MIDDOT);
    chk(`K7 ${r} year beside middot`, mid.length === 0, `${mid.length}${mid.length ? ` [${mid.join(", ")}]` : ""}`, 0);
  }
  if (K7_RAW_ROUTES.includes(r)) {
    const a = count(b, "case-study__year");
    chk(`K7 ${r} raw "case-study__year"`, a === 0, a, 0);
    const d = count(b, "<dt>Year</dt>");
    chk(`K7 ${r} raw "<dt>Year</dt>"`, d === 0, d, 0);
  }

  // K8 JSON-LD Article date on each study.
  if (STUDIES.includes(r)) {
    const slug = r.slice("/work/".length);
    const articles = [];
    for (const x of b.matchAll(/<script\b[^>]*\btype="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      let j;
      try {
        j = JSON.parse(x[1]);
      } catch {
        continue;
      }
      const a = ldNodes(j).find(isArticle);
      if (a) articles.push(a);
    }
    chk(`K8 ${r} Article JSON-LD scripts`, articles.length === 1, articles.length, 1);
    const dp = articles[0] ? articles[0].datePublished : undefined;
    chk(`K8 ${r} datePublished format`, typeof dp === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dp), q(dp), "YYYY-MM-DD");
    const want = publishedAt(slug);
    chk(
      `K8 ${r} datePublished equals content/work/${slug}.mdx publishedAt`,
      want !== null && dp === want,
      q(dp),
      want === null ? `a publishedAt in content/work/${slug}.mdx (none found)` : q(want),
    );
  }

  // K9 sitemap.
  if (r === "/sitemap.xml") {
    const locs = [...b.matchAll(/<loc>([^<]*)<\/loc>/g)].map((x) => x[1].trim());
    const work = locs.filter((l) => l.includes("/work")).sort();
    const want = [`${SITE}/work`, ...STUDIES.map((s) => SITE + s)].sort();
    chk(`K9 /work locs`, JSON.stringify(work) === JSON.stringify(want), `${work.length} [${work.join(" ")}]`, `6 [${want.join(" ")}]`);
    const bad = locs.filter((l) => /postmates|neuton/.test(l));
    chk(`K9 postmates or neuton locs`, bad.length === 0, `${bad.length}${bad.length ? ` [${bad.join(" ")}]` : ""}`, 0);
  }
}

// K5 the record block and K6 index links on /work.
for (const w of [1440, 390]) {
  console.log(`== /work record block at ${w}`);
  const page = w === 1440 ? workPage1440 : (await open("/work", 390)).page;
  const m = await page.evaluate(() => {
    const r = document.getElementById("record");
    return {
      n: document.querySelectorAll('[id="record"]').length,
      text: r ? r.innerText.replace(/\s+/g, " ").trim() : "",
      links: r ? [...r.querySelectorAll("a")].map((a) => a.getAttribute("href")) : [],
      body: document.body.innerText.replace(/\s+/g, " ").trim(),
      work: [...new Set([...document.querySelectorAll('main a[href^="/work/"]')].map((a) => a.getAttribute("href")))].sort(),
    };
  });
  chk(`K5@${w} [id="record"] count`, m.n === 1, m.n, 1);
  for (const s of RECORD_ONCE) {
    const n = count(m.text, s);
    chk(`K5@${w} #record ${q(s)}`, n === 1, n, 1);
  }
  const g = count(m.text, "Guardicore");
  chk(`K5@${w} #record "Guardicore"`, g >= 1, g, ">=1");
  const idx = RECORD_ORDER.map((s) => m.text.indexOf(s));
  const ordered = idx.every((i) => i >= 0) && idx.every((i, k) => k === 0 || idx[k - 1] < i);
  chk(`K5@${w} #record order`, ordered, RECORD_ORDER.map((s, k) => `${s}@${idx[k]}`).join(" "), RECORD_ORDER.join(" < "));
  chk(`K5@${w} #record a count`, m.links.length === 1, m.links.length, 1);
  chk(`K5@${w} #record a href`, m.links[0] === "/work/guardicore", q(m.links[0] ?? null), q("/work/guardicore"));
  const hl = count(m.body, "Helped launch · 2025");
  chk(`K5@${w} page "Helped launch · 2025"`, hl === 0, hl, 0);
  if (w === 1440) {
    const want = [...STUDIES].sort();
    chk(`K6 main a[href^="/work/"] distinct hrefs`, JSON.stringify(m.work) === JSON.stringify(want), `[${m.work.join(" ")}]`, `[${want.join(" ")}]`);
  }
  await page.close();
}

// K10 redirects.
console.log("== redirects");
for (const r of ["/work/postmates", "/work/neuton"]) {
  let got;
  try {
    const res = await fetch(BASE + r, { redirect: "manual" });
    got = `${res.status} ${res.headers.get("location")}`;
  } catch (e) {
    got = `error ${e.message}`;
  }
  chk(`K10 ${r}`, got === "308 /work#record", got, "308 /work#record");
}

await browser.close();
console.log(`claims120 failures: ${failures}`);
process.exit(failures ? 1 : 0);
