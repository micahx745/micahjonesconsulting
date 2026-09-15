// Pass-118 Astra set: the home hero at 412 (Lighthouse mobile) in the stand-in state (web fonts
// blocked) on production and on the v3b build, plus the v3b fonts-loaded frame; same for /services.
import { createRequire } from "node:module";
const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const OUT = ".planning/qa/pass-118/astra";
const shots = [
  ["prod", "https://www.micahjonesconsulting.com", "/", true],
  ["v3b", "http://localhost:3200", "/", true],
  ["v3b", "http://localhost:3200", "/", false],
  ["prod", "https://www.micahjonesconsulting.com", "/services", true],
  ["v3b", "http://localhost:3200", "/services", true],
  ["v3b", "http://localhost:3200", "/services", false],
];
for (const [label, base, path, blocked] of shots) {
  const ctx = await b.createBrowserContext(); const p = await ctx.newPage();
  await p.setViewport({ width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true });
  await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  if (blocked) { await p.setRequestInterception(true); p.on("request", (r) => (/\.woff2?(\?|$)/.test(r.url()) ? r.abort() : r.continue())); }
  await p.goto(base + path, { waitUntil: "load", timeout: 90000 }); await p.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 1500));
  const file = `${OUT}/${label}-${path === "/" ? "home" : "services"}-412-${blocked ? "standin" : "loaded"}.png`;
  await p.screenshot({ path: file }); console.log(file); await ctx.close();
}
await b.close();
