// .planning/exec/fixdom120.mjs
// Judge F2 and F3 DOM checks (.planning/reviews/FABLE-120-FIRST-PREVIEW.md section 4), cache off.
// F2: /work/ordani h1 textContent exact; .cs-title__nb count 1 on ordani, 0 on the other four studies.
// F3: /work/rfp-engine exhibit cells with a top border: 1 at 390, 2 at 1440.
import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");
const BASE = process.argv[2] || "http://localhost:3200";
let failures = 0;
const chk = (id, ok, got, want) => {
  if (ok) console.log(`PASS ${id}: got ${JSON.stringify(got)}`);
  else { failures++; console.log(`FAIL ${id}: got ${JSON.stringify(got)} (want ${JSON.stringify(want)})`); }
};
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
try {
  const open = async (route, w) => {
    const p = await browser.newPage();
    await p.setCacheEnabled(false);
    const mob = w === 390;
    await p.setViewport({ width: w, height: mob ? 844 : 900, deviceScaleFactor: mob ? 2 : 1, isMobile: mob, hasTouch: mob });
    await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    const r = await p.goto(BASE + route, { waitUntil: "networkidle0", timeout: 60000 });
    await p.evaluate(() => document.fonts.ready);
    return { p, status: r.status() };
  };
  for (const w of [390, 1440]) {
    const { p, status } = await open("/work/ordani", w);
    const got = await p.evaluate(() => ({ text: document.querySelector("h1.cs-title")?.textContent, nb: document.querySelectorAll(".cs-title__nb").length, lines: [...document.querySelectorAll(".cs-title__line")].map((l) => l.getBoundingClientRect().height > 0 ? Math.round(l.getClientRects().length) : 0) }));
    chk(`F2 ordani h1 text ${w}`, status === 200 && got.text === "ORDANI: HIPAA-compliant CRM for birth workers", got.text, "ORDANI: HIPAA-compliant CRM for birth workers");
    chk(`F2 ordani nb count ${w}`, got.nb === 1, got.nb, 1);
    await p.close();
  }
  for (const s of ["guardicore", "rfp-engine", "content-engine", "birth-worker"]) {
    const { p } = await open(`/work/${s}`, 1440);
    const nb = await p.evaluate(() => document.querySelectorAll(".cs-title__nb").length);
    chk(`F2 ${s} nb count`, nb === 0, nb, 0);
    await p.close();
  }
  for (const [w, want] of [[390, 1], [1440, 2]]) {
    const { p } = await open("/work/rfp-engine", w);
    const n = await p.evaluate(() => [...document.querySelectorAll(".cs-exhibit tbody td")].filter((td) => parseFloat(getComputedStyle(td).borderTopWidth) > 0).length);
    chk(`F3 exhibit bordered cells ${w}`, n === want, n, want);
    await p.close();
  }
} finally {
  await browser.close();
}
console.log(`fixdom120 failures: ${failures}`);
process.exit(failures ? 1 : 0);
