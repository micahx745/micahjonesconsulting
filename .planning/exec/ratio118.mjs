import { createRequire } from "node:module";
const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
for (const [path, w] of [["/", 412], ["/", 1440], ["/services", 1440]]) {
  const p = await b.newPage(); await p.setViewport({ width: w, height: 900 });
  await p.goto("http://localhost:3200" + path, { waitUntil: "networkidle0" }); await p.evaluate(() => document.fonts.ready);
  const rows = await p.evaluate(() => {
    const out = [];
    const pick = ["h1.cw-h1 .cw-line > span", ".cw-sub", ".cw-pbox__list li", ".cw-sv-open__body", ".cw-pbox__name", ".cw-buy", ".cw-sv-open__name"];
    for (const sel of pick) {
      const el = document.querySelector(sel); if (!el) continue;
      const cs = getComputedStyle(el); const fam = cs.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
      const text = el.textContent.replace(/\s+/g, " ").trim().slice(0, 60);
      const m = (family) => { const s = document.createElement("span"); s.textContent = text; Object.assign(s.style, { position: "absolute", whiteSpace: "nowrap", visibility: "hidden", fontFamily: family, fontSize: cs.fontSize, fontWeight: cs.fontWeight, fontStyle: cs.fontStyle, letterSpacing: cs.letterSpacing, textTransform: cs.textTransform, fontVariationSettings: cs.fontVariationSettings, fontOpticalSizing: cs.fontOpticalSizing }); document.body.appendChild(s); const wd = s.getBoundingClientRect().width; s.remove(); return wd; };
      const real = m(`"${fam}"`), arial = m("Arial");
      out.push(`${sel.padEnd(28)} ${fam.padEnd(20)} ${cs.fontSize} w${cs.fontWeight} real=${real.toFixed(1)} arial=${arial.toFixed(1)} parity S=${(100 * real / arial).toFixed(2)}%`);
    }
    return out;
  });
  console.log(`== ${path} ${w}`); rows.forEach((r) => console.log("  " + r)); await p.close();
}
await b.close();
