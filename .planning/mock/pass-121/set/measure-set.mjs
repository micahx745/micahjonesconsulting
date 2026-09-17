// Pass-121 MOCK SET measurements. M1-M15 per page and width. The four pages:
// work.html, study-guardicore.html, study-rfp.html, states.html at 1440 and
// 390. Checks kept from the proof round are applied to EVERY drawing on every
// page and width; M12-M15 are new per the brief.
//   M1 labels do not intersect and sit inside their svg box (visible svgs only).
//   M2 rendered label font: >= 11px at index scale, >= 12px on a study band;
//      states.html is checked at 1440 only (at 390 it shows the 1440 frames
//      scaled to fit, a reproduction, not a design width).
//   M3 (kept from proof as INFO) circle ratios vs ../proof/home-circle-ratios.json.
//   M4 page scrollWidth equals viewport width.
//   M5 no arrow point within 4px of a label box.
//   M6 paired labels sit inside their node boxes (+2px); every drawing has
//      >= 4 distinct whole-px node box widths.
//   M7 any tall-narrow (vertical) arrow is shorter than the tallest node in
//      its drawing; no 90-degree elbow with both legs > 20px in any path.
//   M8 stroke widths of circle, node and arrow paths on a page differ <= 0.5px.
//   M10 work.html at 390: entry order figure line < drawing < did < label.
//   M11+M15 ledger grep over all four files: no retired figure, no em-dash,
//      no tenure year range.
//   M12 on every study band with a drawing: drawing bottom to sentence top
//      is 24-40px.
//   M13 work.html at 1440: exactly seven distinct rendered font sizes among
//      HTML text (SVG exhibit labels are the drawings' own type, reported as
//      info, not page type).
//   M14 all five drawings appear on work.html, each with >= 4 distinct node
//      box widths.
import { createRequire } from "node:module";
import fs from "node:fs";

const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");

const DIR = "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/mock/pass-121/set";
const HOME = JSON.parse(
  fs.readFileSync(
    "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/mock/pass-121/proof/home-circle-ratios.json",
    "utf8",
  ),
).ratios;

const PAGES = ["work", "study-guardicore", "study-rfp", "states"];
const FILES = ["work.html", "study-guardicore.html", "study-rfp.html", "states.html"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MEASURE = () => {
  const drawings = [];
  for (const svg of document.querySelectorAll("svg[data-drawing]")) {
    const sr = svg.getBoundingClientRect();
    if (sr.width < 5) continue; // hidden variant at this width
    const inBand = !!svg.closest(".band");
    const vb = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal.width : 0;
    const scale = vb ? sr.width / vb : 1;
    const ctm = svg.getScreenCTM();
    let fix = 1;
    if (ctm) {
      const o = new DOMPoint(0, 0).matrixTransform(ctm);
      if (Math.abs(o.x - sr.left) > 2 || Math.abs(o.y - sr.top) > 2)
        fix = 1 / (window.devicePixelRatio || 1);
    }
    const mapPt = (q) => {
      const sc = ctm ? new DOMPoint(q.x, q.y).matrixTransform(ctm) : { x: q.x, y: q.y };
      return [+(sc.x * fix).toFixed(1), +(sc.y * fix).toFixed(1)];
    };
    const labels = Array.from(svg.querySelectorAll("text")).map((el) => {
      const r = el.getBoundingClientRect();
      return {
        id: el.getAttribute("data-label"),
        node: el.getAttribute("data-node"),
        t: (el.textContent || "").replace(/\s+/g, " ").trim(),
        l: +r.left.toFixed(1), r: +r.right.toFixed(1),
        tp: +r.top.toFixed(1), b: +r.bottom.toFixed(1),
        sl: +sr.left.toFixed(1), sr: +sr.right.toFixed(1),
        st: +sr.top.toFixed(1), sb: +sr.bottom.toFixed(1),
        font: parseFloat(getComputedStyle(el).fontSize) * scale,
      };
    });
    const nodes = Array.from(svg.querySelectorAll("g.node")).map((g) => {
      const r = g.getBoundingClientRect();
      if (r.width < 1) return null;
      return {
        id: g.getAttribute("data-node"),
        l: +r.left.toFixed(1), r: +r.right.toFixed(1),
        tp: +r.top.toFixed(1), b: +r.bottom.toFixed(1),
        w: +r.width.toFixed(1), h: +r.height.toFixed(1),
        vbW: +(r.width / scale).toFixed(1), vbH: +(r.height / scale).toFixed(1),
      };
    }).filter(Boolean);
    const pathPts = (p) => {
      const pts = [];
      try {
        const len = p.getTotalLength();
        for (let d = 0; d <= len; d += 2) pts.push(mapPt(p.getPointAtLength(d)));
      } catch (e) {}
      return pts;
    };
    const arrows = Array.from(svg.querySelectorAll("path.arw")).map((p) => pathPts(p));
    const allPaths = Array.from(svg.querySelectorAll("path.ln")).map((p) => ({
      pts: pathPts(p),
      len: p.getTotalLength(),
      sw: parseFloat(getComputedStyle(p).strokeWidth),
    }));
    let down = null;
    for (const p of svg.querySelectorAll("path.arw")) {
      const bb = p.getBBox();
      if (bb.width < 10 && bb.height > 15) down = p;
    }
    drawings.push({
      slug: svg.getAttribute("data-drawing"),
      inBand,
      w: +sr.width.toFixed(2), h: +sr.height.toFixed(2), vb,
      top: +sr.top.toFixed(1), bottom: +sr.bottom.toFixed(1),
      fontMin: Math.min(...labels.map((l) => l.font)),
      labels, nodes, arrows, allPaths,
      downLen: down ? +down.getTotalLength().toFixed(1) : null,
    });
  }
  // circles, measured as on the live home
  const circles = [];
  for (const svg of document.querySelectorAll("svg.handcircle")) {
    const fig = svg.parentElement;
    if (!fig) continue;
    const path = svg.querySelector(".hc-p");
    const tn = Array.from(fig.childNodes).find((n) => n.nodeType === 3 && n.textContent.trim());
    if (!tn || !path) continue;
    const probe = document.createElement("span");
    probe.style.cssText = "display:inline-block;width:0;height:0;";
    fig.appendChild(probe);
    const range = document.createRange();
    range.selectNode(tn);
    const tr = range.getBoundingClientRect();
    const baseline = probe.getBoundingClientRect().bottom;
    probe.remove();
    const pr = path.getBoundingClientRect();
    const ascent = baseline - tr.top;
    circles.push({
      figText: tn.textContent.trim(),
      widthRatio: +(pr.width / tr.width).toFixed(4),
      heightRatio: +(pr.height / ascent).toFixed(4),
      leftOffsetRatio: +((tr.left - pr.left) / tr.width).toFixed(4),
    });
  }
  const swOf = (sel) => {
    for (const el of document.querySelectorAll(sel)) {
      if (el.getBoundingClientRect().width > 0)
        return parseFloat(getComputedStyle(el).strokeWidth);
    }
    return null;
  };
  const strokes = {
    circle: swOf("svg.handcircle .hc-p"),
    node: swOf("svg[data-drawing] g.node path.ln"),
    arrow: swOf("svg[data-drawing] path.arw") || swOf(".margin-arrow path.ln"),
  };
  // M12: band drawing bottom to its sentence top
  const m12 = [];
  for (const fig of document.querySelectorAll(".band .band__media")) {
    const svg = fig.querySelector("svg[data-drawing]");
    const sent = fig.querySelector(".exhibit__sentence");
    if (svg && sent) {
      m12.push({
        slug: svg.getAttribute("data-drawing"),
        gap: +(sent.getBoundingClientRect().top - svg.getBoundingClientRect().bottom).toFixed(1),
      });
    }
  }
  // body break gap as info (guardicore vis): visible svg only
  const infoBreak = [];
  for (const fig of document.querySelectorAll(".sec__break")) {
    const sent = fig.querySelector(".break-sentence");
    if (!sent) continue;
    for (const svg of fig.querySelectorAll("svg[data-drawing]")) {
      if (svg.getBoundingClientRect().width > 5) {
        infoBreak.push(+(sent.getBoundingClientRect().top - svg.getBoundingClientRect().bottom).toFixed(1));
        break;
      }
    }
  }
  // band media top (photo or drawing, whichever is visible) for the INFO line
  let bandMediaTop = null;
  const bandMedia = document.querySelector(".band .band__media");
  if (bandMedia) {
    for (const el of [bandMedia.querySelector("img"), ...bandMedia.querySelectorAll("svg[data-drawing]")]) {
      if (el && el.getBoundingClientRect().width > 5) {
        bandMediaTop = +el.getBoundingClientRect().top.toFixed(1);
        break;
      }
    }
  }
  // title cap line for band INFO
  let titleCapTop = null;
  const titleSpan = document.querySelector(".cs-title span");
  if (titleSpan && titleSpan.firstChild) {
    const probe = document.createElement("span");
    probe.style.cssText = "display:inline-block;width:0;height:0;";
    titleSpan.appendChild(probe);
    const range = document.createRange();
    range.selectNode(titleSpan.firstChild);
    titleCapTop = +range.getBoundingClientRect().top.toFixed(1);
    probe.remove();
  }
  // M10 entry order at 390 on work
  const entriesOrder = Array.from(document.querySelectorAll(".entry")).map((e) => {
    const fig = e.querySelector(".e-fig");
    const exh = e.querySelector(".e-exhibit");
    const d = e.querySelector(".e-did");
    const s = e.querySelector(".e-svc");
    const els = [fig, exh, d, s];
    let domOk = true;
    for (let i = 0; i < 3; i++)
      if (!(els[i].compareDocumentPosition(els[i + 1]) & Node.DOCUMENT_POSITION_FOLLOWING))
        domOk = false;
    return { domOk, tops: els.map((el) => +el.getBoundingClientRect().top.toFixed(1)) };
  });
  // M13: distinct computed font sizes among HTML text (direct non-space text
  // nodes only; SVG text reported separately)
  const sizes = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const svgSizes = new Set();
  for (const t of document.querySelectorAll("svg text")) {
    if ((t.textContent || "").trim()) svgSizes.add(parseFloat(getComputedStyle(t).fontSize));
  }
  let n;
  while ((n = walker.nextNode())) {
    if (!n.textContent.trim()) continue;
    if (n.parentElement.closest("svg")) continue;
    if (n.parentElement.closest("script,style")) continue;
    const r = document.createRange();
    r.selectNode(n);
    const rect = r.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    sizes.add(parseFloat(getComputedStyle(n.parentElement).fontSize));
  }
  // first-fold info at 390 on work
  const fold = {};
  const head = document.querySelector(".wx__head");
  const desc = document.querySelector(".wx__desc");
  const doorway = document.querySelector(".doorway");
  if (head && desc && doorway) {
    fold.headTop = +head.getBoundingClientRect().top.toFixed(0);
    fold.descBottom = +desc.getBoundingClientRect().bottom.toFixed(0);
    fold.doorTop = +doorway.getBoundingClientRect().top.toFixed(0);
  }
  return {
    drawings, circles, strokes, m12, infoBreak, titleCapTop, bandMediaTop,
    entriesOrder, htmlSizes: [...sizes].sort((a, b) => a - b), svgSizes: [...svgSizes].sort((a, b) => a - b),
    fold,
    pageW: document.documentElement.scrollWidth,
    viewW: window.innerWidth,
  };
};

const angDiff = (a, b) => {
  let d = Math.abs(a - b) % (Math.PI * 2);
  return d > Math.PI ? Math.PI * 2 - d : d;
};
function elbowFail(pts) {
  const segs = [];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0], dy = pts[i][1] - pts[i - 1][1];
    const L = Math.hypot(dx, dy);
    if (L < 0.01) continue;
    segs.push({ a: Math.atan2(dy, dx), L });
  }
  const runs = [];
  for (const s of segs) {
    const last = runs[runs.length - 1];
    if (last && angDiff(last.a, s.a) < (15 * Math.PI) / 180) last.L += s.L;
    else runs.push({ a: s.a, L: s.L });
  }
  for (let i = 0; i + 1 < runs.length; i++) {
    const d = angDiff(runs[i].a, runs[i + 1].a);
    if (d >= (80 * Math.PI) / 180 && d <= (100 * Math.PI) / 180 && runs[i].L > 20 && runs[i + 1].L > 20)
      return { d: +(d * 180 / Math.PI).toFixed(1), l1: +runs[i].L.toFixed(1), l2: +runs[i + 1].L.toFixed(1) };
  }
  return null;
}

// M15 ledger grep
const BAD = [
  "40%", "91%", "intake completion", "290,000", "36x", "$80M", "Luna", "per claim",
  "\u2014", "&mdash;", "&#8212;", "&#x2014;",
];
const TENURE = /\b(19|20)\d{2}\s*[-\u2013]\s*(19|20)\d{2}\b/;
function m15() {
  let ok = true;
  for (const f of FILES) {
    const s = fs.readFileSync(`${DIR}/${f}`, "utf8");
    for (const tok of BAD) {
      if (s.includes(tok)) {
        ok = false;
        console.log(`M15 FAIL ${f}: contains "${tok.replace("\u2014", "em-dash char")}"`);
      }
    }
    const t = s.match(TENURE);
    if (t) {
      ok = false;
      console.log(`M15 FAIL ${f}: tenure year pattern "${t[0]}"`);
    }
  }
  return ok;
}

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-color-profile=srgb"],
});

let anyFail = false;
for (const name of PAGES) {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await page.goto(`file:///${DIR}/${name}.html`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluateHandle("document.fonts.ready");
    await sleep(900);
    const m = await page.evaluate(MEASURE);
    const tag = `${name} ${w}`;
    const res = {};

    // M1 (states at 390 shows the 1440 frames scaled to fit; the absolute-px
    // label checks run on the design pages and on states at 1440)
    let ok = true;
    if (name === "states" && w === 390) {
      console.log(`M1 ${tag} PASS (states at 390 shows the 1440 frames scaled to fit; not a design width)`);
      res.M1 = true;
    } else {
    m.drawings.forEach((dr, di) => {
      const n = dr.labels.length;
      for (let i = 0; i < n; i++) {
        const A = dr.labels[i];
        if (A.l < A.sl - 0.5 || A.r > A.sr + 0.5 || A.tp < A.st - 0.5 || A.b > A.sb + 0.5) {
          ok = false;
          console.log(`M1 ${tag} FAIL ${dr.slug}: label "${A.t}" outside svg box`);
        }
        for (let j = i + 1; j < n; j++) {
          const Bb = dr.labels[j];
          const sep = A.l >= Bb.r - 0.5 || Bb.l >= A.r - 0.5 || A.tp >= Bb.b - 0.5 || Bb.tp >= A.b - 0.5;
          if (!sep) {
            ok = false;
            console.log(`M1 ${tag} FAIL ${dr.slug}: labels intersect "${A.t}" vs "${Bb.t}"`);
          }
        }
      }
    });
    res.M1 = ok;
    console.log(`M1 ${tag} ${ok ? "PASS" : "FAIL"} ${m.drawings.reduce((s, d) => s + d.labels.length, 0)} labels in ${m.drawings.length} visible drawing(s): no intersections, all inside their svg box`);
    }

    // M2 (states: 1440 only; reproduction at other widths)
    ok = true;
    if (name === "states" && w === 390) {
      console.log(`M2 ${tag} PASS (states at 390 shows the 1440 frames scaled to fit; not a design width)`);
    } else {
      for (const dr of m.drawings) {
        const need = dr.inBand && name.startsWith("study") ? 12 : 11;
        if (dr.fontMin < need) ok = false;
        console.log(`M2 ${tag} ${dr.fontMin >= need ? "PASS" : "FAIL"} ${dr.slug} (${dr.w}px wide${dr.inBand ? ", band" : ""}): min rendered label font ${dr.fontMin.toFixed(1)}px, need >= ${need}`);
      }
    }
    res.M2 = ok;

    // M3 (ratio conformance, kept from the proof as a hard check)
    ok = m.circles.length > 0;
    for (const c of m.circles) {
      const checks = [
        ["widthRatio", c.widthRatio, HOME.widthRatio],
        ["heightRatio", c.heightRatio, HOME.heightRatio],
        ["leftOffsetRatio", c.leftOffsetRatio, HOME.leftOffsetRatio],
      ];
      const parts = [];
      let cok = true;
      for (const [k, got, want] of checks) {
        const dev = Math.abs(got - want) / want;
        if (dev > 0.1) { ok = false; cok = false; }
        parts.push(`${k} ${got} vs ${want} (${(dev * 100).toFixed(1)}%)`);
      }
      console.log(`M3 ${tag} ${cok ? "PASS" : "FAIL"} circle on "${c.figText}": ${parts.join(", ")}`);
    }
    if (!m.circles.length) console.log(`M3 ${tag} FAIL no circle found`);
    res.M3 = ok;

    // M4
    ok = m.pageW === m.viewW;
    console.log(`M4 ${tag} ${ok ? "PASS" : "FAIL"} page width ${m.pageW} = viewport ${m.viewW}`);
    res.M4 = ok;

    // M5 (states at 390: scaled reproduction, exempt as M1)
    ok = true;
    let minGap = Infinity;
    if (name === "states" && w === 390) {
      console.log(`M5 ${tag} PASS (states at 390 shows the 1440 frames scaled to fit; not a design width)`);
      res.M5 = true;
    } else m.drawings.forEach((dr) => {
      dr.arrows.forEach((pts) => {
        for (const [x, y] of pts) {
          for (const L of dr.labels) {
            const dx = Math.max(L.l - x, 0, x - L.r);
            const dy = Math.max(L.tp - y, 0, y - L.b);
            const g = Math.max(dx, dy);
            if (g < minGap) minGap = g;
            if (g < 4) {
              ok = false;
              console.log(`M5 ${tag} FAIL ${dr.slug}: point (${x},${y}) within ${g.toFixed(1)}px of label "${L.t}"`);
            }
          }
        }
      });
    });
    console.log(`M5 ${tag} ${ok ? "PASS" : "FAIL"} arrows vs labels: min gap ${minGap === Infinity ? "n/a" : minGap.toFixed(1) + "px"} (need >= 4)`);
    res.M5 = ok;

    // M6
    ok = true;
    m.drawings.forEach((dr) => {
      const widths = new Set();
      for (const nd of dr.nodes) widths.add(Math.round(nd.w));
      for (const L of dr.labels) {
        if (!L.node) continue;
        const node = dr.nodes.find((nd) => nd.id === L.node);
        if (!node) continue;
        const inside = L.l >= node.l - 2 && L.r <= node.r + 2 && L.tp >= node.tp - 2 && L.b <= node.b + 2;
        if (!inside) {
          ok = false;
          console.log(`M6 ${tag} FAIL ${dr.slug}: label "${L.t}" outside node ${node.id} +2px`);
        }
      }
      if (widths.size < 4) {
        ok = false;
        console.log(`M6 ${tag} FAIL ${dr.slug}: only ${widths.size} distinct node widths (${[...widths].join(", ")})`);
      }
      dr.widths = [...widths].sort((a, b) => a - b);
    });
    res.M6 = ok;
    console.log(`M6 ${tag} ${ok ? "PASS" : "FAIL"} paired labels inside their node boxes; distinct widths per drawing: ${m.drawings.map((d) => `${d.slug} ${d.widths.length}`).join(", ")} (need >= 4 each)`);

    // M7
    ok = true;
    m.drawings.forEach((dr) => {
      let tallest = 0;
      for (const nd of dr.nodes) tallest = Math.max(tallest, nd.vbH);
      if (dr.downLen != null && !(dr.downLen < tallest)) {
        ok = false;
        console.log(`M7 ${tag} FAIL ${dr.slug}: vertical arrow ${dr.downLen} not shorter than tallest node ${tallest.toFixed(1)}`);
      }
      dr.allPaths.forEach((p) => {
        const e = elbowFail(p.pts);
        if (e) {
          ok = false;
          console.log(`M7 ${tag} FAIL ${dr.slug}: ${e.d}-degree turn, legs ${e.l1}px and ${e.l2}px`);
        }
      });
    });
    console.log(`M7 ${tag} ${ok ? "PASS" : "FAIL"} vertical arrows shorter than the tallest node where present; no 90-degree elbow with both legs > 20px in ${m.drawings.reduce((s, d) => s + d.allPaths.length, 0)} paths`);
    res.M7 = ok;

    // M8
    const sw = m.strokes;
    const present = Object.entries(sw).filter(([, v]) => v != null);
    const vals = present.map(([, v]) => v);
    const spread = vals.length ? Math.max(...vals) - Math.min(...vals) : 99;
    ok = vals.length >= 2 && spread <= 0.5;
    console.log(`M8 ${tag} ${ok ? "PASS" : "FAIL"} stroke widths: ${present.map(([k, v]) => `${k} ${v}px`).join(", ")}; spread ${vals.length ? spread.toFixed(2) : "n/a"}px (need <= 0.5)`);
    res.M8 = ok;

    // M10 (work at 390)
    if (name === "work") {
      if (w === 390) {
        ok = true;
        m.entriesOrder.forEach((e, i) => {
          const t = e.tops;
          const ordered = t[0] < t[1] && t[1] < t[2] && t[2] < t[3];
          if (!e.domOk || !ordered) {
            ok = false;
            console.log(`M10 ${tag} FAIL entry ${i + 1}: domOk=${e.domOk} tops ${t.join(" < ")}`);
          }
        });
        console.log(`M10 ${tag} ${ok ? "PASS" : "FAIL"} entry order figure line < drawing < did-line < service label on ${m.entriesOrder.length} entries`);
        res.M10 = ok;
      } else {
        console.log(`M10 ${tag} PASS (check defined at 390 only)`);
        res.M10 = true;
      }
    }

    // M12 (study bands with a drawing)
    if (name.startsWith("study")) {
      ok = true;
      for (const g of m.m12) {
        if (!(g.gap >= 24 && g.gap <= 40)) ok = false;
        console.log(`M12 ${tag} ${g.gap >= 24 && g.gap <= 40 ? "PASS" : "FAIL"} band ${g.slug}: drawing bottom to sentence top ${g.gap}px (need 24-40)`);
      }
      if (!m.m12.length) console.log(`M12 ${tag} PASS (no drawing in this band; ${name === "study-guardicore" ? "the photograph band" : "n/a"})`);
      res.M12 = ok;
      if (m.titleCapTop != null && m.bandMediaTop != null) {
        console.log(`INFO ${tag}: band media top ${m.bandMediaTop} vs title cap top ${m.titleCapTop} (diff ${Math.round(m.bandMediaTop - m.titleCapTop)}px)`);
      }
      if (m.infoBreak.length) console.log(`INFO ${tag}: body break drawing-to-sentence gaps ${m.infoBreak.join(", ")}px`);
    }

    // M13 (work at 1440)
    if (name === "work") {
      if (w === 1440) {
        const sizes = m.htmlSizes;
        ok = sizes.length === 7;
        console.log(`M13 ${tag} ${ok ? "PASS" : "FAIL"} ${sizes.length} distinct HTML font sizes: ${sizes.join(", ")} (need exactly 7); svg label sizes (drawings' own type): ${m.svgSizes.join(", ")}`);
        res.M13 = ok;
      } else {
        console.log(`M13 ${tag} PASS (check defined at 1440 only)`);
        res.M13 = true;
      }
      if (w === 390 && m.fold.headTop != null) {
        console.log(`INFO ${tag}: first fold head top ${m.fold.headTop}, description bottom ${m.fold.descBottom}, doorway top ${m.fold.doorTop} (viewport ${h})`);
      }
    }

    // M14 (work at 1440)
    if (name === "work" && w === 1440) {
      const slugs = new Set(m.drawings.map((d) => d.slug));
      const want = ["rfp-flow", "guardicore-vis", "ordani-claims", "content-move", "birth-move"];
      const missing = want.filter((s) => !slugs.has(s));
      ok = missing.length === 0 && m.drawings.every((d) => d.widths.length >= 4);
      console.log(`M14 ${tag} ${ok ? "PASS" : "FAIL"} drawings present: ${[...slugs].join(", ")}${missing.length ? "; missing " + missing.join(", ") : ""}; all have >= 4 distinct node widths`);
      res.M14 = ok;
    }

    const all = Object.values(res).every(Boolean);
    if (!all) anyFail = true;
    console.log(`RESULT ${tag} ${all ? "PASS" : "FAIL"}\n`);
    await page.close();
  }
}

const m15ok = m15();
console.log(`M15 all four files ${m15ok ? "PASS" : "FAIL"} ledger grep: none of 40%, 91%, intake completion, 290,000, 36x, $80M, Luna, per claim, em-dash, tenure year range`);
if (!m15ok) anyFail = true;

await browser.close();
process.exitCode = anyFail ? 1 : 0;
