// Pass-118 diagnosis: what changes inside the home hero .cw-cta-row between fonts blocked and loaded.
import { createRequire } from "node:module";
const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
for (const blocked of [true, false]) {
  const ctx = await b.createBrowserContext(); const p = await ctx.newPage();
  await p.setViewport({ width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true });
  await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  if (blocked) { await p.setRequestInterception(true); p.on("request", (r) => (/\.woff2?(\?|$)/.test(r.url()) ? r.abort() : r.continue())); }
  await p.goto("http://localhost:3200/", { waitUntil: "load" }); await p.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 1500));
  const out = await p.evaluate(() => {
    const row = document.querySelector(".cw-cta-row"); const rcs = getComputedStyle(row); const rr = row.getBoundingClientRect();
    const lines = [`row h=${rr.height.toFixed(1)} display=${rcs.display} wrap=${rcs.flexWrap} gap=${rcs.gap} dir=${rcs.flexDirection}`];
    for (const el of row.querySelectorAll("*")) {
      const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); if (r.width < 1) continue;
      const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(" ").trim();
      lines.push(`  ${el.tagName.toLowerCase()}.${(el.className && typeof el.className === "string" ? el.className.split(" ")[0] : "")} fam=${cs.fontFamily.split(",")[0]} fs=${cs.fontSize} x=${r.x.toFixed(0)} y=${(r.y - rr.y).toFixed(0)} w=${r.width.toFixed(1)} h=${r.height.toFixed(1)} minW=${cs.minWidth} maxW=${cs.maxWidth} pad=${cs.padding} flex=${cs.flex} text="${own.slice(0, 40)}"`);
    }
    return lines;
  });
  console.log(`== fonts ${blocked ? "BLOCKED" : "LOADED"}`); out.forEach((l) => console.log(l)); await ctx.close();
}
await b.close();
