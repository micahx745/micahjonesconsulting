// Pass-118 §13: JetBrains Mono advance against Courier New and Arial on rendered mono labels.
import { createRequire } from "node:module";
const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const p = await b.newPage(); await p.setViewport({ width: 412, height: 823 });
await p.goto("http://localhost:3200/", { waitUntil: "networkidle0" }); await p.evaluate(() => document.fonts.ready);
console.log(await p.evaluate(() => {
  const out = [];
  for (const el of [...document.querySelectorAll("a.cw-mlink, .cw-eyebrow, nav a")].slice(0, 5)) {
    const cs = getComputedStyle(el); const text = el.textContent.replace(/\s+/g, " ").trim();
    const m = (f) => { const s = document.createElement("span"); s.textContent = text; Object.assign(s.style, { position: "absolute", whiteSpace: "nowrap", visibility: "hidden", fontFamily: f, fontSize: cs.fontSize, fontWeight: cs.fontWeight, letterSpacing: cs.letterSpacing, textTransform: cs.textTransform }); document.body.appendChild(s); const w = s.getBoundingClientRect().width; s.remove(); return w; };
    const real = m('"JetBrains Mono"'), cour = m('"Courier New"'), arial = m("Arial");
    out.push(`${el.className.split(" ")[0] || el.tagName} "${text.slice(0, 24)}" ${cs.fontSize} w${cs.fontWeight} ls=${cs.letterSpacing} real=${real.toFixed(1)} courier=${cour.toFixed(1)} (parity ${(100 * real / cour).toFixed(2)}%) arial=${arial.toFixed(1)}`);
  }
  const z = document.createElement("span"); z.textContent = "0"; z.style.cssText = "position:absolute;visibility:hidden;font-size:100px;font-family:'JetBrains Mono'"; document.body.appendChild(z); const zw = z.getBoundingClientRect().width; z.style.fontFamily = "'Courier New'"; const cw = z.getBoundingClientRect().width; z.remove();
  out.push(`zero advance at 100px: JetBrains ${zw.toFixed(2)} Courier ${cw.toFixed(2)}`);
  return out.join("\n");
}));
await b.close();
