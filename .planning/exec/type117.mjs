// Pass-117 gate: /services type ladder (DESIGN_BAR R2), mono prose (R1), one CTA
// style (R17), the Guardicore proof figure (R13), and no text crossing its frame.
// Measures the render: computed sizes of visible text in header and main.
//
// Usage: node .planning/exec/type117.mjs [base]   (default http://localhost:3200)
// Bite proof: run against production before the pass; it must report failures.
import { createRequire } from "node:module";
const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = (process.argv[2] || "http://localhost:3200").replace(/\/$/, "");
const EXPECT = { 390: [12, 16, 22, 32, 44], 1440: [12, 16, 22, 44, 68] };
const R13 =
  "See how I helped Guardicore, a Tel Aviv security company, break into the North American market with $14M in revenue and get acquired by Akamai";

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`  ${ok ? "PASS" : "FAIL"} ${id}: got ${got}${ok ? "" : ` (want ${want})`}`);
  if (!ok) failures++;
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
for (const w of [390, 1440]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(BASE + "/services", { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  const m = await page.evaluate(() => {
    const own = (el) =>
      [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(" ").replace(/\s+/g, " ").trim();
    const shown = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 2 && r.height > 2 && cs.visibility !== "hidden" && cs.display !== "none" && !el.closest(".sr-only, [hidden], .skip-to-content");
    };
    const sizes = new Set();
    const where = {};
    const monoProse = [];
    for (const el of document.querySelectorAll("header *, main *")) {
      const t = own(el);
      if (!t || !shown(el)) continue;
      const cs = getComputedStyle(el);
      const fs = Math.round(parseFloat(cs.fontSize) * 100) / 100;
      sizes.add(fs);
      const cls = typeof el.className === "string" && el.className ? el.className.split(" ")[0] : el.tagName.toLowerCase();
      (where[fs] ||= new Set()).add(cls);
      if (/mono/i.test(cs.fontFamily.split(",")[0]) && t.split(" ").length >= 4 && !el.closest("footer")) monoProse.push(`${cls}: ${t.slice(0, 50)}`);
    }
    const main = document.querySelector("main");
    const buys = [...main.querySelectorAll(".cw-buy")];
    const tuples = new Set(buys.map((b) => { const c = getComputedStyle(b); return [c.fontFamily.split(",")[0], c.fontSize, c.fontWeight, c.borderTopLeftRadius].join("|"); }));
    const proof = main.querySelector(".cw-sv-open__case");
    const proofText = proof ? proof.textContent.replace(/\u2192/g, "").replace(/\s+/g, " ").trim() : "(absent)";
    const spills = [];
    for (const el of main.querySelectorAll(".cw-sv-open__name, .cw-service__title, .cw-pbox__fig, .cw-pbox__name, .cw-services__foot-title, .cw-area__name, .cw-sv-open__case")) {
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
      monoProse,
      cta: main.querySelectorAll(".cw-cta").length,
      buyCount: buys.length,
      buyTuples: [...tuples],
      proofText,
      pageSpill: document.documentElement.scrollWidth - window.innerWidth,
      spills,
    };
  });
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
  chk(`T6 one .cw-buy style ${w}`, m.buyCount >= 8 && m.buyTuples.length === 1, `${m.buyCount} buttons, ${m.buyTuples.length} style(s) [${m.buyTuples.join(" ; ")}]`, ">=8 buttons, 1 style");
  chk(`T7 R13 proof line ${w}`, m.proofText === R13, JSON.stringify(m.proofText), JSON.stringify(R13));
  chk(`T8 no page spill ${w}`, m.pageSpill <= 0, m.pageSpill, "<=0");
  chk(`T9 no text past its frame ${w}`, m.spills.length === 0, m.spills.length ? m.spills.join(" | ") : "none", "none");
  await page.close();
}
await browser.close();
console.log(`type117 failures: ${failures}`);
process.exit(failures ? 1 : 0);
