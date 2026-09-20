import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require("puppeteer-core");
const base = process.argv[2] || "http://localhost:3250";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const p = await b.newPage();
const logs = [];
p.on("console", m => logs.push(`${m.type()}: ${m.text().slice(0,200)}`));
p.on("pageerror", e => logs.push(`PAGEERROR: ${String(e).slice(0,300)}`));
await p.setViewport({ width: 1440, height: 900 });
await p.goto(base + "/", { waitUntil: "networkidle2" });
await new Promise(r => setTimeout(r, 3000));
const st = await p.evaluate(() => ({
  classes: document.querySelector(".cw-exits").className,
  fonts: document.fonts.status,
  secTop: document.querySelector(".cw-exits").getBoundingClientRect().top,
  innerH: window.innerHeight,
  supports: [CSS.supports("overflow-x","clip"), CSS.supports("selector(:has(a))"), CSS.supports("height","1svh")],
  rm: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
}));
console.log(JSON.stringify(st, null, 1));
console.log("LOGS:", logs.length ? logs.join("\n") : "(none)");
await b.close();
