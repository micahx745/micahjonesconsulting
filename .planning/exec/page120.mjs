// .planning/exec/page120.mjs — Pass-120 V2 (brief §6.3): the rendered /work and the five
// case studies. Type ladder (R2), mono prose (R1), tracked uppercase, no rail, no captions,
// one visible title, body links on paper, sage scope, photographs, the close, the retired-slug
// fragment and the no-JS finished frame. Measures the render, not the model.
//
// Usage: node .planning/exec/page120.mjs [base]
//   base defaults to http://localhost:3200.
// Every result line is `PASS <id>: got <x>` or `FAIL <id>: got <x> (want <y>)`; the run ends on
// `page120 failures: N` and exits 1 when N is not 0.
//
// Overrides applied (Pass-120 leg L6b): O-k, the Guardicore band photograph is
// guardicore-band-960.jpg (T13); O-l, ORDANI's paper links are ink #1A1816 (T11).
// A route that does not answer 200 is one failure (T0) and its remaining checks are skipped.
// Bite proof: run against production before the pass; it must fail T10 on each study.
import { createRequire } from "node:module";

const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const pos = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const BASE = (pos[0] || "http://localhost:3200").replace(/\/$/, "");

const STUDIES = ["guardicore", "rfp-engine", "ordani", "content-engine", "birth-worker"];
const ROUTES = ["/work", ...STUDIES.map((s) => `/work/${s}`)];
const WIDTHS = [1440, 390];
const VP = {
  1440: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  390: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const LADDER = { 1440: [13, 18, 36, 56, 112], 390: [12, 17, 26, 36, 64] };
const REQUIRED = { 1440: [13, 18, 36], 390: [12, 17, 26] };
const LEAD = { 1440: { work: 112, study: 56 }, 390: { work: 64, study: 36 } };

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`${ok ? "PASS" : "FAIL"} ${id}: got ${got}${ok ? "" : ` (want ${want})`}`);
  if (!ok) failures++;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });

async function openPage(w, { reduced = true, js = true } = {}) {
  const page = await browser.newPage();
  await page.bringToFront();
  // Every load is a fresh 200: a shared browser cache answers repeat routes with 304.
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

// Runs in the page. Everything T1-T14 needs, read once at scroll 0.
function measure(isOrdani) {
  const HIDE = '.sr-only, .cw-sr-only, [hidden], .skip-to-content, [role="dialog"]';
  const boxed = (el) => {
    const r = el.getBoundingClientRect();
    return r.width > 2 && r.height > 2;
  };
  const visible = (el) => {
    if (!boxed(el)) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== "hidden" && cs.display !== "none" && !el.closest(HIDE);
  };
  const own = (el) =>
    [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  const cls = (el) => {
    const c = el.getAttribute("class");
    return c && c.trim() ? c.trim().split(/\s+/)[0] : el.tagName.toLowerCase();
  };
  const round = (v) => Math.round(parseFloat(v) * 100) / 100;
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const rgba = (str) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillStyle = str;
    ctx.fillRect(0, 0, 1, 1);
    return [...ctx.getImageData(0, 0, 1, 1).data];
  };
  const lum = ([r, g, b]) => {
    const f = (c) => {
      const s = c / 255;
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const bgLum = (el) => {
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const c = rgba(getComputedStyle(n).backgroundColor);
      if (c[3] > 0) return lum(c);
    }
    return 1;
  };
  const probe = (parent, before, value) => {
    const s = document.createElement("span");
    s.setAttribute("style", `color: ${value}`);
    parent.insertBefore(s, before);
    const c = getComputedStyle(s).color;
    s.remove();
    return c;
  };
  const decode = (u) => {
    try {
      return decodeURIComponent(u || "");
    } catch {
      return u || "";
    }
  };

  const main = document.querySelector("main");
  const out = {
    pageSpill: document.documentElement.scrollWidth - window.innerWidth,
    sidebar: document.querySelectorAll(".case-study__sidebar").length,
  };
  if (!main) return { ...out, noMain: true };
  const scoped = [main, ...main.querySelectorAll("*")].filter((el) => !el.closest(".cw-pagefoot"));

  // T1, T2, T6, T7
  const sizes = new Set();
  const where = {};
  const monoProse = [];
  const upper = [];
  for (const el of scoped) {
    const t = own(el);
    if (!t || !visible(el)) continue;
    const cs = getComputedStyle(el);
    const fs = round(cs.fontSize);
    sizes.add(fs);
    (where[fs] ||= new Set()).add(cls(el));
    if (/mono/i.test(cs.fontFamily.split(",")[0]) && t.split(" ").length >= 7)
      monoProse.push(`${cls(el)}: ${t.slice(0, 50)}`);
    if (cs.textTransform === "uppercase") upper.push(`${cls(el)}: ${t.slice(0, 30)}`);
  }
  out.sizes = [...sizes].sort((a, b) => a - b);
  out.where = Object.fromEntries(Object.entries(where).map(([k, v]) => [k, [...v].slice(0, 6).join(" ")]));
  out.monoProse = monoProse;
  out.upper = upper;

  // T4 (INFO)
  const chrome = (els) => {
    const s = new Set();
    for (const root of els)
      for (const el of [root, ...root.querySelectorAll("*")]) if (own(el) && visible(el)) s.add(round(getComputedStyle(el).fontSize));
    return [...s].sort((a, b) => a - b).join(",") || "none";
  };
  out.chrome = {
    nav: chrome([...document.querySelectorAll(".cw-nav")]),
    pagefoot: chrome([...document.querySelectorAll(".cw-pagefoot")]),
    footer: chrome([...document.querySelectorAll("footer")].filter((f) => !f.closest("main") && !f.matches(".cw-pagefoot"))),
  };

  // T8
  out.rail = scoped
    .filter((el) => ["sticky", "fixed"].includes(getComputedStyle(el).position))
    .map((el) => `${cls(el)} ${getComputedStyle(el).position}`);

  // T9
  out.figcaptions = [...main.querySelectorAll("figcaption")].filter((el) => !el.closest(".cw-pagefoot")).length;

  // T10
  const h1s = [...main.querySelectorAll("h1")];
  out.h1Count = h1s.length;
  out.h1Visible = h1s.length ? visible(h1s[0]) : false;
  out.h1Desc = h1s.map((h) => `${cls(h)} "${h.textContent.replace(/\s+/g, " ").trim().slice(0, 40)}"`).join(" | ");
  out.h1Top = h1s.length ? h1s[0].getBoundingClientRect().top : null;

  // T11
  const copperVar = "var(--color-accent-copper-deep, #8a3d24)";
  const sageVar = "var(--color-ordani-sage, #5e7158)";
  const links = [...main.querySelectorAll("p a")].filter((a) => !a.closest(".cw-pagefoot") && visible(a));
  const linkBad = [];
  let paperLinks = 0;
  let darkLinks = 0;
  for (const a of links) {
    const parent = a.parentNode;
    const color = getComputedStyle(a).color;
    const copper = probe(parent, a.nextSibling, copperVar);
    const text = a.textContent.replace(/\s+/g, " ").trim().slice(0, 30);
    if (bgLum(a) >= 0.5) {
      paperLinks++;
      let ok = color === copper;
      if (isOrdani && !ok) ok = color === probe(parent, a.nextSibling, sageVar) || color === probe(parent, a.nextSibling, "#1a1816");
      if (!ok) linkBad.push(`paper "${text}" ${color} != ${copper}`);
    } else {
      darkLinks++;
      if (color === copper) linkBad.push(`dark "${text}" ${color} == copper-deep`);
    }
  }
  out.links = { paperLinks, darkLinks, linkBad };

  // T12
  const sage = probe(main, null, sageVar);
  const sageHits = [];
  for (const el of main.querySelectorAll("*")) {
    if (!visible(el)) continue;
    const cs = getComputedStyle(el);
    for (const p of ["color", "background-color", "border-top-color", "fill", "stroke"])
      if (cs.getPropertyValue(p) === sage) {
        sageHits.push(`${cls(el)} ${p}`);
        break;
      }
  }
  out.sage = { value: sage, hits: sageHits };

  // T13
  const cw = document.documentElement.clientWidth;
  const src = (img) => decode(img.currentSrc || img.getAttribute("src"));
  const vimgs = [...main.querySelectorAll("img")].filter(visible);
  const vvids = [...main.querySelectorAll("video")].filter(visible);
  const width = (el) => el.getBoundingClientRect().width;
  out.photos = {
    clientWidth: cw,
    fullBleedImg: vimgs.filter((i) => width(i) >= cw - 1).map((i) => `${src(i).slice(0, 80)} ${Math.round(width(i))}px`),
    fullBleedVideo: vvids.filter((v) => width(v) >= cw - 1).length,
    band: vimgs
      .filter((i) => src(i).includes("guardicore-band-960.jpg"))
      .map((i) => ({ w: width(i), s: src(i).slice(0, 80) })),
    imgCount: main.querySelectorAll("img").length,
    videoCount: main.querySelectorAll("video").length,
    sticker: [
      ...[...document.querySelectorAll("img")].filter((i) => src(i).includes("guardicore-telaviv.jpg")).map((i) => `img ${src(i).slice(0, 80)}`),
      ...[...document.querySelectorAll("video")].filter((v) => decode(v.getAttribute("poster")).includes("guardicore-telaviv.jpg")).map(() => "video poster"),
    ],
  };

  // T14
  out.allWork = [...main.querySelectorAll('a[href="/work"]')].filter(
    (a) => !a.closest(".cw-pagefoot") && visible(a) && a.innerText.replace(/\s+/g, " ").trim() === "All work",
  ).length;
  return out;
}

const reducedTop = {};
for (const route of ROUTES) {
  const isWork = route === "/work";
  const slug = isWork ? null : route.slice("/work/".length);
  for (const w of WIDTHS) {
    const tag = `${route} ${w}`;
    console.log(`== ${BASE}${route} at ${w}`);
    let page;
    try {
      page = await openPage(w);
      const status = await load(page, route);
      chk(`T0 status ${tag}`, status === 200, status, 200);
      if (status !== 200) {
        console.log(`SKIP ${tag}: status ${status}, T1-T14 and T16 not run`);
        continue;
      }
      const m = await page.evaluate(measure, slug === "ordani");
      if (m.noMain) {
        chk(`T1 main ${tag}`, false, "no main element", "one main");
        continue;
      }
      for (const s of m.sizes) console.log(`     ${String(s).padStart(6)}px  ${m.where[s]}`);
      const need = [...REQUIRED[w], isWork ? LEAD[w].work : LEAD[w].study];
      const outside = m.sizes.filter((s) => !LADDER[w].includes(s));
      const missing = need.filter((s) => !m.sizes.includes(s));
      chk(
        `T1 type ladder ${tag}`,
        outside.length === 0 && missing.length === 0,
        `${m.sizes.join(",")}${outside.length ? ` [off ladder: ${outside.join(",")}]` : ""}${missing.length ? ` [missing: ${missing.join(",")}]` : ""}`,
        `subset of {${LADDER[w].join(",")}} containing ${need.join(",")}`,
      );
      chk(`T2 set size ${tag}`, m.sizes.length <= 5, m.sizes.length, "<= 5");
      if (isWork && w === 1440) {
        const ratio = Math.max(...m.sizes) / 18;
        chk(`T3 largest / 18 ${tag}`, ratio >= 4, ratio.toFixed(2), ">= 4 (expected 6.22)");
      }
      console.log(`INFO chrome sizes ${route} ${w}: nav ${m.chrome.nav}; pagefoot ${m.chrome.pagefoot}; footer ${m.chrome.footer}`);
      chk(`T5 page spill ${tag}`, m.pageSpill <= 0, m.pageSpill, "<= 0");
      chk(`T6 mono prose ${tag}`, m.monoProse.length === 0, m.monoProse.length ? `${m.monoProse.length} [${m.monoProse.slice(0, 3).join(" | ")}]` : 0, 0);
      chk(`T7 tracked uppercase ${tag}`, m.upper.length === 0, m.upper.length ? `${m.upper.length} [${m.upper.slice(0, 4).join(" | ")}]` : 0, 0);
      chk(
        `T8 no rail ${tag}`,
        m.rail.length === 0 && m.sidebar === 0,
        `sticky/fixed ${m.rail.length}${m.rail.length ? ` [${m.rail.slice(0, 4).join(" | ")}]` : ""}, .case-study__sidebar ${m.sidebar}`,
        "sticky/fixed 0, .case-study__sidebar 0",
      );
      chk(`T9 no figcaption ${tag}`, m.figcaptions === 0, m.figcaptions, 0);
      if (isWork) chk(`T10 one title ${tag}`, m.h1Count === 1, `${m.h1Count} [${m.h1Desc}]`, 1);
      else
        chk(
          `T10 one visible title ${tag}`,
          m.h1Count === 1 && m.h1Visible,
          `${m.h1Count} h1, visible ${m.h1Visible} [${m.h1Desc}]`,
          "1 h1, visible true",
        );
      chk(
        `T11 body links on paper ${tag}`,
        m.links.linkBad.length === 0,
        `${m.links.paperLinks} on paper, ${m.links.darkLinks} dark, ${m.links.linkBad.length} off${m.links.linkBad.length ? ` [${m.links.linkBad.slice(0, 4).join(" | ")}]` : ""}`,
        `0 off (paper = copper-deep${slug === "ordani" ? ", sage or ink #1A1816" : ""}; dark != copper-deep)`,
      );
      const sageN = m.sage.hits.length;
      chk(
        `T12 sage scope ${tag}`,
        slug === "ordani" ? sageN >= 1 : sageN === 0,
        `${sageN} (${m.sage.value})${sageN ? ` [${m.sage.hits.slice(0, 4).join(" | ")}]` : ""}`,
        slug === "ordani" ? ">= 1" : 0,
      );
      const ph = m.photos;
      if (slug === "ordani")
        chk(`T13 full-bleed img ${tag}`, ph.fullBleedImg.length >= 1, `${ph.fullBleedImg.length} [${ph.fullBleedImg.join(" | ")}]`, ">= 1");
      if (slug === "guardicore") {
        chk(`T13 full-bleed img ${tag}`, ph.fullBleedImg.length === 0, `${ph.fullBleedImg.length} [${ph.fullBleedImg.join(" | ")}]`, 0);
        const okBand = ph.band.length === 1 && ph.band[0].w > 0 && ph.band[0].w < ph.clientWidth - 1;
        chk(
          `T13 band photograph ${tag}`,
          okBand,
          `${ph.band.length} visible guardicore-band-960.jpg [${ph.band.map((b) => `${Math.round(b.w)}px ${b.s}`).join(" | ")}]`,
          `exactly 1, width > 0 and < ${ph.clientWidth - 1}`,
        );
      }
      if (["rfp-engine", "content-engine", "birth-worker"].includes(slug))
        chk(`T13 no photographs ${tag}`, ph.imgCount === 0 && ph.videoCount === 0, `img ${ph.imgCount}, video ${ph.videoCount}`, "img 0, video 0");
      chk(`T13 no stickered frame ${tag}`, ph.sticker.length === 0, ph.sticker.length ? ph.sticker.join(" | ") : 0, 0);
      if (!isWork) {
        chk(`T14 the close ${tag}`, m.allWork === 1, m.allWork, 1);
        reducedTop[tag] = m.h1Top;
      }
    } catch (e) {
      chk(`run ${tag}`, false, `error: ${String(e.message || e).split("\n")[0]}`, "no error");
    } finally {
      if (page) await page.close();
    }
  }
}

// T16: no-JS finished frame, each study at both widths.
for (const slug of STUDIES) {
  const route = `/work/${slug}`;
  for (const w of WIDTHS) {
    const tag = `${route} ${w}`;
    if (!(tag in reducedTop)) {
      console.log(`SKIP T16 ${tag}: no reduced-motion run to compare against`);
      continue;
    }
    let page;
    try {
      page = await openPage(w, { js: false });
      const status = await load(page, route);
      if (status !== 200) {
        chk(`T16 no-JS finished frame ${tag}`, false, `status ${status}`, "status 200");
        continue;
      }
      const r = await page.evaluate(() => {
        const HIDE = '.sr-only, .cw-sr-only, [hidden], .skip-to-content, [role="dialog"]';
        const h1 = document.querySelector("main h1");
        if (!h1) return null;
        const rect = h1.getBoundingClientRect();
        const cs = getComputedStyle(h1);
        const vis = rect.width > 2 && rect.height > 2 && cs.visibility !== "hidden" && cs.display !== "none" && !h1.closest(HIDE);
        let op = 1;
        for (let n = h1; n && n.nodeType === 1; n = n.parentElement) op *= parseFloat(getComputedStyle(n).opacity);
        return { vis, op, top: rect.top };
      });
      const want = reducedTop[tag];
      const ok = r && r.vis && r.op === 1 && want != null && Math.abs(r.top - want) <= 1;
      chk(
        `T16 no-JS finished frame ${tag}`,
        ok,
        r ? `visible ${r.vis}, opacity ${r.op}, top ${r.top.toFixed(1)}` : "no main h1",
        `visible true, opacity 1, top ${want == null ? "(none)" : want.toFixed(1)} +/- 1`,
      );
    } catch (e) {
      chk(`T16 no-JS finished frame ${tag}`, false, `error: ${String(e.message || e).split("\n")[0]}`, "no error");
    } finally {
      if (page) await page.close();
    }
  }
}

// T15: the retired slugs land on #record, 1440.
for (const old of ["postmates", "neuton"]) {
  let page;
  try {
    page = await openPage(1440);
    await load(page, `/work/${old}`);
    const r = await page.evaluate(() => {
      const rec = document.getElementById("record");
      return { at: location.pathname + location.hash, top: rec ? rec.getBoundingClientRect().top : null };
    });
    chk(
      `T15 /work/${old} lands on #record 1440`,
      r.at === "/work#record" && r.top != null && r.top >= 0 && r.top <= 160,
      `${r.at}, #record top ${r.top == null ? "(no #record)" : r.top.toFixed(1)}`,
      "/work#record, top 0-160",
    );
  } catch (e) {
    chk(`T15 /work/${old} lands on #record 1440`, false, `error: ${String(e.message || e).split("\n")[0]}`, "no error");
  } finally {
    if (page) await page.close();
  }
}

await browser.close();
console.log(`page120 failures: ${failures}`);
process.exit(failures ? 1 : 0);
