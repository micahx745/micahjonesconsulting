// Pass-122 reference capture: read-only screenshot + metrics probe for design-
// research reference sites. Puppeteer-core from C:/tmp/p101tools; Chrome at the
// system path (pattern per capture-113.mjs). Scratch — not committed.
//
// Usage: node refs122.mjs <slug> <url>
//
// Writes to .planning/qa/pass-122/refs/<slug>/ :
//   390-early.png  390-settled.png  390-scroll1.png  390-scroll2.png
//   1440-early.png 1440-settled.png 1440-scroll1.png 1440-scroll2.png
//   metrics.json
//
// Read-only on the web: never clicks a cookie/consent banner, never accepts
// terms, never logs in, never submits a form, never downloads anything.

import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";

const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");

const BASE =
  "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/qa/pass-122/refs";

const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const LAUNCH_ARGS = [
  "--hide-scrollbars",
  "--force-color-profile=srgb",
  "--ignore-gpu-blocklist",
  "--enable-unsafe-swiftshader",
  "--use-angle=swiftshader",
  "--no-sandbox",
];

const UA_MOBILE =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36";
const UA_DESKTOP =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const VIEWPORTS = [
  {
    name: "390",
    ua: UA_MOBILE,
    config: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  },
  {
    name: "1440",
    ua: UA_DESKTOP,
    config: { width: 1440, height: 900, deviceScaleFactor: 1 },
  },
];

const LIB_NAMES = [
  "gsap",
  "ScrollTrigger",
  "three",
  "lenis",
  "ogl",
  "pixi",
  "_next",
  "framer",
  "webflow",
  "barba",
  "swup",
  "locomotive",
  "rive",
  "lottie",
];

const GLOBAL_TIMEOUT_MS = 150000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitUntilElapsed(startTime, targetMs) {
  const remaining = targetMs - (Date.now() - startTime);
  if (remaining > 0) await sleep(remaining);
}

async function wheelScroll(page, viewportHeight, fromFactor, toFactor) {
  const deltaTotal = (toFactor - fromFactor) * viewportHeight;
  const ticks = Math.max(0, Math.ceil(deltaTotal / 250));
  for (let i = 0; i < ticks; i++) {
    await page.mouse.wheel({ deltaY: 250 });
    await sleep(120);
  }
}

// Runs inside the page. Must be self-contained (no closures over outer scope).
function collectMetricsInPage(libNames) {
  function isVisible(el) {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;
    if (parseFloat(style.opacity) === 0) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return false;
    return true;
  }

  function intersectsFirstViewport(rect) {
    return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
  }

  function hasDirectText(el) {
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) return true;
    }
    return false;
  }

  const errors = [];
  const out = {};

  try {
    out.title = document.title || null;
  } catch (e) {
    errors.push(`title: ${e.message}`);
    out.title = null;
  }

  try {
    const htmlStyle = window.getComputedStyle(document.documentElement);
    out.htmlBackgroundColor = htmlStyle.backgroundColor;
    const bodyStyle = document.body ? window.getComputedStyle(document.body) : null;
    out.bodyBackgroundColor = bodyStyle ? bodyStyle.backgroundColor : null;
  } catch (e) {
    errors.push(`backgroundColor: ${e.message}`);
  }

  // Visible text elements (direct text) intersecting the first viewport.
  let visibleFirstViewportEls = [];
  try {
    const all = Array.from(document.querySelectorAll("body *"));
    for (const el of all) {
      if (!hasDirectText(el)) continue;
      if (!isVisible(el)) continue;
      const rect = el.getBoundingClientRect();
      if (!intersectsFirstViewport(rect)) continue;
      visibleFirstViewportEls.push(el);
    }
  } catch (e) {
    errors.push(`visibleFirstViewportEls: ${e.message}`);
  }

  try {
    let maxSize = 0;
    for (const el of visibleFirstViewportEls) {
      const size = parseFloat(window.getComputedStyle(el).fontSize) || 0;
      if (size > maxSize) maxSize = size;
    }
    out.largestFontSizePxFirstViewport = maxSize || null;
  } catch (e) {
    errors.push(`largestFontSizePxFirstViewport: ${e.message}`);
    out.largestFontSizePxFirstViewport = null;
  }

  try {
    let h1 = document.querySelector("h1");
    let source = "h1";
    if (!h1) {
      source = "largest-visible-text";
      let best = null;
      let bestSize = -1;
      for (const el of visibleFirstViewportEls) {
        const size = parseFloat(window.getComputedStyle(el).fontSize) || 0;
        if (size > bestSize) {
          bestSize = size;
          best = el;
        }
      }
      h1 = best;
    }
    if (h1) {
      const cs = window.getComputedStyle(h1);
      out.headline = {
        source,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        letterSpacing: cs.letterSpacing,
      };
    } else {
      out.headline = null;
    }
  } catch (e) {
    errors.push(`headline: ${e.message}`);
    out.headline = null;
  }

  try {
    const p = Array.from(document.querySelectorAll("p")).find((el) => isVisible(el));
    out.firstVisibleParagraphFontFamily = p ? window.getComputedStyle(p).fontFamily : null;
  } catch (e) {
    errors.push(`firstVisibleParagraphFontFamily: ${e.message}`);
    out.firstVisibleParagraphFontFamily = null;
  }

  try {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const text = node.textContent.trim();
        if (!text) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || !isVisible(parent)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let count = 0;
    let node;
    while ((node = walker.nextNode())) {
      const range = document.createRange();
      range.selectNodeContents(node);
      const rect = range.getBoundingClientRect();
      if (intersectsFirstViewport(rect)) {
        const words = node.textContent.trim().split(/\s+/).filter(Boolean);
        count += words.length;
      }
    }
    out.wordCountFirstViewport = count;
  } catch (e) {
    errors.push(`wordCountFirstViewport: ${e.message}`);
    out.wordCountFirstViewport = null;
  }

  try {
    out.canvasCount = document.querySelectorAll("canvas").length;
  } catch (e) {
    errors.push(`canvasCount: ${e.message}`);
    out.canvasCount = null;
  }

  try {
    const scriptSrcs = Array.from(document.querySelectorAll("script[src]"))
      .map((s) => s.src)
      .join(" ");
    let globalKeys = "";
    try {
      globalKeys = Object.keys(window).join(" ");
    } catch (e2) {
      errors.push(`globalKeys: ${e2.message}`);
    }
    const haystack = (scriptSrcs + " " + globalKeys).toLowerCase();
    out.libs = libNames.filter((name) => haystack.includes(name.toLowerCase()));
  } catch (e) {
    errors.push(`libs: ${e.message}`);
    out.libs = [];
  }

  out.pageErrors = errors;
  return out;
}

async function processViewport(browser, outDir, url, vw) {
  const metrics = { viewport: vw.name, errors: [] };
  const deadlineAt = Date.now() + GLOBAL_TIMEOUT_MS;
  function checkDeadline(step) {
    if (Date.now() > deadlineAt) {
      throw new Error(`global ${GLOBAL_TIMEOUT_MS}ms timeout exceeded before step: ${step}`);
    }
  }

  let page = null;
  try {
    page = await browser.newPage();
    await page.setUserAgent(vw.ua);
    await page.setViewport(vw.config);

    checkDeadline("goto");
    let response = null;
    let usedFallback = false;
    try {
      response = await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });
    } catch (e) {
      usedFallback = true;
      metrics.errors.push(`goto networkidle2 failed: ${e.message}`);
      try {
        response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      } catch (e2) {
        metrics.errors.push(`goto domcontentloaded fallback failed: ${e2.message}`);
      }
    }
    metrics.usedFallback = usedFallback;
    try {
      metrics.httpStatus = response ? response.status() : null;
    } catch (e) {
      metrics.errors.push(`httpStatus read failed: ${e.message}`);
      metrics.httpStatus = null;
    }
    try {
      metrics.finalUrl = page.url();
    } catch (e) {
      metrics.errors.push(`finalUrl read failed: ${e.message}`);
      metrics.finalUrl = null;
    }

    const loadStart = Date.now();

    checkDeadline("fonts.ready");
    try {
      await Promise.race([
        page.evaluate(() => document.fonts.ready.then(() => true)).catch(() => false),
        sleep(5000),
      ]);
    } catch (e) {
      metrics.errors.push(`fonts.ready wait failed: ${e.message}`);
    }

    checkDeadline("early screenshot");
    try {
      await waitUntilElapsed(loadStart, 1200);
      await page.screenshot({ path: `${outDir}/${vw.name}-early.png` });
    } catch (e) {
      metrics.errors.push(`early screenshot failed: ${e.message}`);
    }

    checkDeadline("settled screenshot");
    try {
      await waitUntilElapsed(loadStart, 5000);
      await page.screenshot({ path: `${outDir}/${vw.name}-settled.png` });
    } catch (e) {
      metrics.errors.push(`settled screenshot failed: ${e.message}`);
    }

    checkDeadline("metrics collection");
    try {
      const collected = await page.evaluate(collectMetricsInPage, LIB_NAMES);
      Object.assign(metrics, collected);
    } catch (e) {
      metrics.errors.push(`metrics collection failed: ${e.message}`);
    }

    checkDeadline("scroll leg 1");
    try {
      await page.mouse.move(vw.config.width / 2, vw.config.height / 2);
      await wheelScroll(page, vw.config.height, 0, 1.5);
      await sleep(2500);
      await page.screenshot({ path: `${outDir}/${vw.name}-scroll1.png` });
    } catch (e) {
      metrics.errors.push(`scroll1 failed: ${e.message}`);
    }

    checkDeadline("scroll leg 2");
    try {
      await wheelScroll(page, vw.config.height, 1.5, 3.5);
      await sleep(2500);
      await page.screenshot({ path: `${outDir}/${vw.name}-scroll2.png` });
    } catch (e) {
      metrics.errors.push(`scroll2 failed: ${e.message}`);
    }
  } catch (e) {
    metrics.errors.push(`fatal: ${e.message}`);
  } finally {
    if (page) {
      try {
        await page.close();
      } catch {
        // ignore close failure
      }
    }
  }
  return metrics;
}

async function main() {
  const [, , slug, url] = process.argv;
  if (!slug || !url) {
    console.error("Usage: node refs122.mjs <slug> <url>");
    process.exitCode = 1;
    return;
  }

  const outDir = `${BASE}/${slug}`;
  mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: LAUNCH_ARGS,
  });

  const result = {
    slug,
    url,
    capturedAt: new Date().toISOString(),
    viewports: {},
  };

  try {
    for (const vw of VIEWPORTS) {
      console.log(`[${slug}] capturing viewport ${vw.name}...`);
      const metrics = await processViewport(browser, outDir, url, vw);
      result.viewports[vw.name] = metrics;
      console.log(
        `[${slug}] viewport ${vw.name} done (errors: ${metrics.errors.length})`,
      );
    }
  } finally {
    await browser.close();
  }

  writeFileSync(`${outDir}/metrics.json`, JSON.stringify(result, null, 2));
  console.log(`[${slug}] wrote metrics.json`);
}

main().catch((e) => {
  console.error("fatal error:", e && e.stack ? e.stack : e);
  process.exitCode = 1;
});
