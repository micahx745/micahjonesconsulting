// Pass-118 §12: the real faces' "0" advance in em, which is what 1ch resolves to once fonts load.
import { createRequire } from "node:module";
const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
await p.goto((process.argv[2] || "http://localhost:3200") + "/services", { waitUntil: "networkidle0" }); await p.evaluate(() => document.fonts.ready);
const r = await p.evaluate(() => {
  const out = {};
  for (const sel of [".cw-sv-open__body", ".cw-pbox__fit"]) {
    const el = document.querySelector(sel); const cs = getComputedStyle(el);
    const probe = document.createElement("span"); probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;display:inline-block;width:1ch;height:1px";
    el.appendChild(probe); const chPx = probe.getBoundingClientRect().width; probe.remove();
    out[sel] = { family: cs.fontFamily.split(",")[0], weight: cs.fontWeight, fontSize: cs.fontSize, maxWidth: cs.maxWidth, chPx, chEm: chPx / parseFloat(cs.fontSize) };
  }
  return out;
});
console.log(JSON.stringify(r, null, 1)); await b.close();
