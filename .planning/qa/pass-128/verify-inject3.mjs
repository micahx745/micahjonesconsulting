// Pass-128 T2 sanity check #3: enumerate all stylesheet rules touching
// .cw-mlink's transition property, in cascade order, with !important flags,
// AFTER the exp-T2.css style tag is injected. EVIDENCE ONLY, live site only.
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
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
await page.goto(URL, { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1000));
await page.addStyleTag({ path: "exp-T2.css" });
await new Promise((r) => setTimeout(r, 200));

const info = await page.evaluate(() => {
  const el = document.querySelector(".cw-mlink");
  const out = { matchesInjectedSelector: null, rules: [] };
  try {
    out.matchesInjectedSelector = el.matches(':is([data-mode="cw"]) .cw-mlink');
  } catch (e) {
    out.matchesInjectedSelector = "ERR:" + e.message;
  }
  for (const sheet of Array.from(document.styleSheets)) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch (e) {
      out.rules.push({ href: sheet.href, error: "cannot read cssRules: " + e.message });
      continue;
    }
    function walk(ruleList, layerName) {
      for (const rule of Array.from(ruleList)) {
        if (rule.type === CSSRule.STYLE_RULE) {
          if (rule.selectorText && rule.selectorText.includes("cw-mlink")) {
            let transitionDecl = null;
            try {
              transitionDecl = rule.style.getPropertyValue("transition") || null;
              const transProp = rule.style.getPropertyValue("transition-property");
              const transImportant = rule.style.getPropertyPriority("transition");
              out.rules.push({
                href: sheet.href ? sheet.href.split("/").pop() : "(inline)",
                layer: layerName || null,
                selector: rule.selectorText,
                transition: transitionDecl,
                transitionProperty: transProp || null,
                important: transImportant,
                cssTextSnippet: rule.cssText.slice(0, 200),
              });
            } catch (e) {
              out.rules.push({ error: e.message });
            }
          }
        } else if (rule.type === CSSRule.LAYER_BLOCK_RULE || (rule.cssRules && rule.type !== CSSRule.MEDIA_RULE)) {
          walk(rule.cssRules, rule.name || layerName);
        } else if (rule.type === CSSRule.MEDIA_RULE) {
          walk(rule.cssRules, layerName);
        }
      }
    }
    walk(rules, null);
  }
  return out;
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
