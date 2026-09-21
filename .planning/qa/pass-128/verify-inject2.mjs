// Pass-128 T2 sanity check #2: did the <style> tag actually land in the DOM?
// Any CSP violation reported? EVIDENCE ONLY, live site only.
import { createRequire } from "node:module";
const require = createRequire("C:/tmp/p101tools/package.json");
const puppeteerModule = require("puppeteer-core");
const puppeteer = puppeteerModule.default ?? puppeteerModule;

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "https://www.micahjonesconsulting.com/";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
const consoleMsgs = [];
page.on("console", (msg) => consoleMsgs.push({ type: msg.type(), text: msg.text() }));
page.on("pageerror", (err) => consoleMsgs.push({ type: "pageerror", text: String(err) }));
page.on("requestfailed", (req) => consoleMsgs.push({ type: "requestfailed", text: req.url() + " " + req.failure()?.errorText }));

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
await page.goto(URL, { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1000));

const cspHeader = await page.evaluate(() => {
  const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  return meta ? meta.getAttribute("content") : null;
});

const beforeStyleCount = await page.evaluate(() => document.querySelectorAll("style").length);
const handle = await page.addStyleTag({ path: "exp-T2.css" });
await new Promise((r) => setTimeout(r, 200));
const afterStyleCount = await page.evaluate(() => document.querySelectorAll("style").length);
const injectedInfo = await page.evaluate(() => {
  const styles = Array.from(document.querySelectorAll("style"));
  const last = styles[styles.length - 1];
  return last ? { textLength: last.textContent.length, first200: last.textContent.slice(0, 200), sheetRules: (() => {
    try { return last.sheet ? last.sheet.cssRules.length : -1; } catch (e) { return "ERR:" + e.message; }
  })() } : null;
});

console.log(JSON.stringify({ cspHeaderMeta: cspHeader, beforeStyleCount, afterStyleCount, injectedInfo, consoleMsgs }, null, 2));
await browser.close();
