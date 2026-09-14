// Pass-117 gate: /services type ladder (DESIGN_BAR R2), mono prose (R1), one CTA
// style (R17), the Guardicore proof figure (R13), and no text crossing its frame.
// Measures the render: computed sizes of visible text in the nav and main.
// Round 2 (Sol plan review 2026-09-14): the nav is a sibling of main, so the
// scope is the whole [data-mode="cw"] wrapper minus the closed overlay dialog;
// T10 pins each role to its size so a swapped ladder cannot pass on the set alone.
//
// Usage: node .planning/exec/type117.mjs [base] [--shots <dir>]
//   base defaults to http://localhost:3200. --shots writes viewport PNGs of the
//   opening, both bands and the foot at 390 and 1440 for the Astra look.
// Bite proof: run against production before the pass; it must report failures.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const argv = process.argv.slice(2);
const si = argv.indexOf("--shots");
const SHOTS = si >= 0 ? argv[si + 1] : null;
const pos = argv.filter((a, i) => !a.startsWith("--") && !(si >= 0 && i === si + 1));
const BASE = (pos[0] || "http://localhost:3200").replace(/\/$/, "");
const EXPECT = { 390: [12, 16, 22, 32, 44], 1440: [12, 16, 22, 44, 68] };
const ROLES = [
  [".cw-services__kicker, .cw-sv-open__proof-lbl, .cw-services__foot-kicker", 12, 12],
  [".cw-pbox__list li, .cw-pbox__term, .cw-pbox__fit, .cw-area__pain, .cw-area__proof, .cw-mlink, .cw-buy, .cw-services__foot-intro, .cw-sv-objection p", 16, 16],
  [".cw-sv-open__body, .cw-services__intro, .cw-sv-open__case, .cw-pband__incl-h, .cw-areas__h, .cw-area__name, .cw-sv-objection__h, .cw-pbox__name", 22, 22],
  [".cw-pbox__fig, .cw-services__foot-title", 32, 44],
  [".cw-sv-open__name, .cw-service__title", 44, 68],
];
const R13 =
  "See how I helped Guardicore, a Tel Aviv security company, break into the North American market with $14M in revenue and get acquired by Akamai";

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`  ${ok ? "PASS" : "FAIL"} ${id}: got ${got}${ok ? "" : ` (want ${want})`}`);
  if (!ok) failures++;
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
for (const w of [390, 1440]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(BASE + "/services", { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  const m = await page.evaluate((roles, width) => {
    const own = (el) =>
      [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(" ").replace(/\s+/g, " ").trim();
    const boxed = (el) => { const r = el.getBoundingClientRect(); return r.width > 2 && r.height > 2; };
    const shown = (el) => {
      const cs = getComputedStyle(el);
      return boxed(el) && cs.visibility !== "hidden" && cs.display !== "none" && !el.closest('.sr-only, [hidden], .skip-to-content, [role="dialog"]');
    };
    const root = document.querySelector('[data-mode="cw"]') || document.body;
    const sizes = new Set();
    const where = {};
    const monoProse = [];
    for (const el of root.querySelectorAll("*")) {
      const t = own(el);
      if (!t || !shown(el)) continue;
      const cs = getComputedStyle(el);
      const fs = Math.round(parseFloat(cs.fontSize) * 100) / 100;
      sizes.add(fs);
      const cls = typeof el.className === "string" && el.className ? el.className.split(" ")[0] : el.tagName.toLowerCase();
      (where[fs] ||= new Set()).add(cls);
      if (el.closest("main") && !el.closest("footer") && /mono/i.test(cs.fontFamily.split(",")[0]) && t.split(" ").length >= 4) monoProse.push(`${cls}: ${t.slice(0, 50)}`);
    }
    const main = document.querySelector("main.cw-sv") || document.querySelector("main");
    const roleMiss = [];
    let roleCount = 0;
    for (const [sel, s390, s1440] of roles) {
      const want = width === 390 ? s390 : s1440;
      for (const el of main.querySelectorAll(sel)) {
        if (!shown(el)) continue;
        roleCount++;
        const fs = Math.round(parseFloat(getComputedStyle(el).fontSize) * 100) / 100;
        if (fs !== want) roleMiss.push(`${el.className || el.tagName.toLowerCase()} ${fs}!=${want}`);
      }
    }
    const monoFam = [...main.querySelectorAll(".cw-pbox__term, .cw-mlink")].filter(shown).filter((el) => /mono/i.test(getComputedStyle(el).fontFamily.split(",")[0])).length;
    const buys = [...main.querySelectorAll(".cw-buy")].filter(shown);
    const tuples = new Set(buys.map((b) => { const c = getComputedStyle(b); return [c.fontFamily.split(",")[0], c.fontSize, c.fontWeight, c.borderTopLeftRadius, c.borderTopWidth, c.textTransform].join("|"); }));
    const proof = main.querySelector(".cw-sv-open__case");
    const proofText = proof && shown(proof) ? proof.textContent.replace(/\s+/g, " ").trim().replace(/\s*\u2192$/, "") : "(absent or hidden)";
    const spills = [];
    for (const el of main.querySelectorAll(".cw-sv-open__name, .cw-service__title, .cw-pbox__fig, .cw-pbox__name, .cw-pbox__term, .cw-buy, .cw-services__foot-title, .cw-area__name, .cw-areas__h, .cw-pband__incl-h, .cw-sv-objection__h, .cw-sv-open__body, .cw-services__intro, .cw-sv-open__case")) {
      if (!shown(el)) continue;
      const box = el.closest(".cw-pbox, .cw-area, .cw-sv-open__lead, .cw-sv-open__proof, .cw-sv-sec, .cw-services__foot") || el.parentElement;
      const rg = document.createRange();
      rg.selectNodeContents(el);
      const tb = rg.getBoundingClientRect();
      const bb = box.getBoundingClientRect();
      if (tb.right > bb.right + 0.5 || tb.left < bb.left - 0.5) spills.push(`${el.className.split(" ")[0]} "${el.textContent.trim().slice(0, 20)}" text ${Math.round(tb.left)}-${Math.round(tb.right)} box ${Math.round(bb.left)}-${Math.round(bb.right)}`);
    }
    return {
      sizes: [...sizes].sort((a, b) => a - b),
      where: Object.fromEntries(Object.entries(where).map(([k, v]) => [k, [...v].slice(0, 6).join(" ")])),
      monoProse, roleMiss, roleCount, monoFam,
      cta: main.querySelectorAll(".cw-cta").length,
      buyCount: buys.length,
      buyTuples: [...tuples],
      proofText,
      pageSpill: document.documentElement.scrollWidth - window.innerWidth,
      spills,
    };
  }, ROLES, w);
  console.log(`== ${BASE}/services at ${w}`);
  for (const s of m.sizes) console.log(`     ${String(s).padStart(5)}px  ${m.where[s]}`);
  const want = EXPECT[w];
  chk(`T1 sizes ${w}`, JSON.stringify(m.sizes) === JSON.stringify(want), m.sizes.join(","), want.join(","));
  const close = m.sizes.slice(1).map((s, i) => [m.sizes[i], s]).filter(([a, b]) => b / a < 1.15).map(([a, b]) => `${a}/${b}`);
  chk(`T2 adjacent steps >=15% ${w}`, close.length === 0, close.length ? close.join(" ") : "none", "none");
  if (w === 1440) {
    const ratio = Math.max(...m.sizes) / 16;
    chk("T3 largest >= 4x body 1440", ratio >= 4, ratio.toFixed(2), ">=4");
  }
  chk(`T4 mono prose in main ${w}`, m.monoProse.length === 0, m.monoProse.length ? `${m.monoProse.length} [${m.monoProse.slice(0, 3).join(" | ")}]` : 0, 0);
  chk(`T5 .cw-cta in main ${w}`, m.cta === 0, m.cta, 0);
  chk(`T6 one visible .cw-buy style ${w}`, m.buyCount >= 8 && m.buyTuples.length === 1, `${m.buyCount} buttons, ${m.buyTuples.length} style(s) [${m.buyTuples.join(" ; ")}]`, ">=8 buttons, 1 style");
  chk(`T7 R13 proof line ${w}`, m.proofText === R13, JSON.stringify(m.proofText), JSON.stringify(R13));
  chk(`T8 no page spill ${w}`, m.pageSpill <= 0, m.pageSpill, "<=0");
  chk(`T9 no text past its frame ${w}`, m.spills.length === 0, m.spills.length ? m.spills.join(" | ") : "none", "none");
  chk(`T10 every role at its size ${w}`, m.roleCount >= 60 && m.roleMiss.length === 0, `${m.roleCount} checked, ${m.roleMiss.length} off [${m.roleMiss.slice(0, 4).join(" | ")}]`, ">=60 checked, 0 off");
  chk(`T11 terms and links not mono ${w}`, m.monoFam === 0, m.monoFam, 0);
  if (SHOTS) {
    for (const [name, sel] of [["open", null], ["shapes", ".cw-pband--shapes"], ["pkgs", ".cw-pband--pkgs"], ["foot", ".cw-services__foot"]]) {
      await page.evaluate((s) => { if (s) document.querySelector(s)?.scrollIntoView({ block: "start" }); else window.scrollTo(0, 0); }, sel);
      await new Promise((r) => setTimeout(r, 900));
      await page.screenshot({ path: `${SHOTS}/sv117-${name}-${w}.png` });
    }
  }
  await page.close();
}
await browser.close();
console.log(`type117 failures: ${failures}`);
process.exit(failures ? 1 : 0);
