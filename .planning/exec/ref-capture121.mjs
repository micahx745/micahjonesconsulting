// Pass-121 design research: capture ONE reference page per FABLE-121-G1.md section 2.2/2.3.
// Usage: node ref-capture121.mjs <url> <slug> <outdir> [--hover "<css selector>"] [--scroll-to "<css selector>"]
//
// Writes to <outdir>:
//   <slug>-1440.png          full page, stitched frames, scale 0.5, dsf 1, at most 15 frames
//   <slug>-1440-fold.png     viewport screenshot, dsf 2, ~1.5s after the post-load wait (entrance settled)
//   <slug>-1440-fold-early.png  viewport screenshot, dsf 1, domcontentloaded + 250ms (separate page load)
//   <slug>-1440-hover.png    viewport screenshot, dsf 2, hover target at 30% from top, 700ms after hover
//   <slug>-390.png           full page, stitched frames, scale 1.0, dsf 1, at most 12 frames
//   <slug>-390-fold.png      viewport screenshot, dsf 2
//   <slug>-390-fold-early.png viewport screenshot, dsf 1
//   _raw/<slug>.html         plain fetch of the initial HTML (desktop Chrome UA), not the browser DOM
//   <slug>-capture.json      every recorded value; see buildup below
//
// Same puppeteer-core require and Chrome path as ref-capture120.mjs. Frames, not fullPage:
// fullPage resizes the viewport and inflates vh layouts.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseArgs(argv) {
  const [url, slug, outdir, ...rest] = argv;
  const flags = { hover: null, scrollTo: null };
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === "--hover") flags.hover = rest[++i] || null;
    else if (rest[i] === "--scroll-to") flags.scrollTo = rest[++i] || null;
  }
  return { url, slug, outdir, flags };
}

const { url, slug, outdir, flags } = parseArgs(process.argv.slice(2));
if (!url || !slug || !outdir) {
  console.log(
    'usage: node ref-capture121.mjs <url> <slug> <outdir> [--hover "<css selector>"] [--scroll-to "<css selector>"]',
  );
  process.exit(2);
}

const require2 = createRequire("C:/tmp/p101tools/package.json");
const puppeteer = require2("puppeteer-core");

mkdirSync(outdir, { recursive: true });
mkdirSync(`${outdir}/_raw`, { recursive: true });

const CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
const CONSENT_RX_SRC = "reject|decline|only necessary|necessary only|deny";

// verbatim from FABLE-121-G1.md section 2.2, plus timeline type when present
const ANIMATIONS_SNIPPET = () =>
  document.getAnimations().map((a) => ({
    el: a.effect?.target?.tagName + "." + (a.effect?.target?.className || ""),
    dur: a.effect?.getTiming().duration,
    iter: a.effect?.getTiming().iterations,
    name: a.animationName || a.constructor.name,
    timeline: a.timeline ? a.timeline.constructor.name : null,
  }));

// verbatim from FABLE-121-G1.md section 2.2
const TYPE_SNIPPET = () =>
  [
    ...new Set(
      [...document.querySelectorAll("body *")]
        .filter((e) => e.children.length === 0 && e.innerText && e.innerText.trim())
        .map((e) => getComputedStyle(e).fontSize),
    ),
  ]
    .map(parseFloat)
    .sort((a, b) => b - a);

function fontFacts() {
  const facts = (el) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    return { fontFamily: s.fontFamily, fontSize: s.fontSize, textTransform: s.textTransform };
  };
  const h1 = document.querySelector("h1");
  const p = document.querySelector("main p, article p, p");
  return { h1: facts(h1), paragraph: facts(p) };
}

async function stitch(browser, frames, w, h, total, scale) {
  const p = await browser.newPage();
  const b64 = await p.evaluate(
    async ({ frames, w, h, total, scale }) => {
      const c = document.createElement("canvas");
      c.width = Math.round(w * scale);
      c.height = Math.round(total * scale);
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#888";
      ctx.fillRect(0, 0, c.width, c.height);
      for (const f of frames) {
        const img = new Image();
        img.src = "data:image/png;base64," + f.b64;
        await img.decode();
        ctx.drawImage(img, 0, Math.round(f.y * scale), Math.round(w * scale), Math.round(h * scale));
      }
      return c.toDataURL("image/png").split(",")[1];
    },
    { frames, w, h, total, scale },
  );
  await p.close();
  return Buffer.from(b64, "base64");
}

async function declineConsent(page) {
  const clicked = await page.evaluate((rxSrc) => {
    const rx = new RegExp(rxSrc, "i");
    const els = [...document.querySelectorAll("button, a")];
    for (const el of els) {
      const text = (el.innerText || el.textContent || "").trim();
      if (!text || !rx.test(text)) continue;
      const r = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const visible = r.width > 0 && r.height > 0 && style.visibility !== "hidden" && style.display !== "none";
      if (!visible) continue;
      el.setAttribute("data-ref121-consent", "1");
      return text.replace(/\s+/g, " ").slice(0, 60);
    }
    return null;
  }, CONSENT_RX_SRC);
  if (!clicked) return "none";
  const handle = await page.$('[data-ref121-consent="1"]');
  if (handle) {
    await handle.click().catch(() => {});
    await page.evaluate((el) => el.removeAttribute("data-ref121-consent"), handle).catch(() => {});
  }
  await sleep(300);
  return clicked;
}

async function findHoverTarget(page) {
  return page.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    const links = [...main.querySelectorAll("a[href]")];
    const rx = /work|project|case|stud/i;
    for (const a of links) {
      const href = a.getAttribute("href");
      if (!href) continue;
      let path = "";
      try {
        path = new URL(href, location.href).pathname;
      } catch {
        continue;
      }
      if (!rx.test(path)) continue;
      const r = a.getBoundingClientRect();
      const style = getComputedStyle(a);
      const visible = r.width > 0 && r.height > 0 && style.visibility !== "hidden" && style.display !== "none";
      if (!visible) continue;
      return `a[href="${href}"]`;
    }
    return null;
  });
}

async function captureFoldEarly(browser, w, h, out) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await sleep(250);
    writeFileSync(out, await page.screenshot());
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  } finally {
    await page.close().catch(() => {});
  }
}

async function captureFull(browser, w, h, scale, maxFrames, out) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    await sleep(2000);
    let total = await page.evaluate(() => document.documentElement.scrollHeight);
    const cap = Math.min(total, h * maxFrames);
    for (let y = 0; y < cap; y += Math.round(h * 0.7)) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await sleep(250);
    }
    total = await page.evaluate(() => document.documentElement.scrollHeight);
    const stop = Math.min(total, h * maxFrames);
    const frames = [];
    for (let y = 0; y < stop; y += h) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await sleep(500);
      const actual = await page.evaluate(() => window.scrollY);
      frames.push({ y: actual, b64: await page.screenshot({ encoding: "base64" }) });
    }
    writeFileSync(out, await stitch(browser, frames, w, h, Math.min(total, stop), scale));
    const truncated = total > stop;
    return { ok: true, total, frameCount: frames.length, truncated, maxFrames };
  } catch (e) {
    return { ok: false, error: e.message };
  } finally {
    await page.close().catch(() => {});
  }
}

async function captureMain(browser, w, h, isDesktop, paths) {
  const result = {
    finalUrl: null,
    status: null,
    consent: "none",
    animations: { afterLoad: null, afterScroll: null },
    type: { fontSizes: null, h1: null, paragraph: null },
    hover: null,
    errors: [],
  };
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    let resp;
    try {
      resp = await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    } catch (e) {
      result.errors.push(`goto: ${e.message}`);
      return result;
    }
    result.finalUrl = page.url();
    result.status = resp ? resp.status() : null;
    await sleep(3000);

    try {
      result.consent = await declineConsent(page);
    } catch (e) {
      result.errors.push(`consent: ${e.message}`);
    }

    await sleep(1500);
    try {
      writeFileSync(paths.fold, await page.screenshot());
    } catch (e) {
      result.errors.push(`fold screenshot: ${e.message}`);
    }

    try {
      result.animations.afterLoad = await page.evaluate(ANIMATIONS_SNIPPET);
    } catch (e) {
      result.errors.push(`animations afterLoad: ${e.message}`);
    }

    try {
      result.type.fontSizes = await page.evaluate(TYPE_SNIPPET);
      const facts = await page.evaluate(fontFacts);
      result.type.h1 = facts.h1;
      result.type.paragraph = facts.paragraph;
    } catch (e) {
      result.errors.push(`type snippet: ${e.message}`);
    }

    try {
      if (flags.scrollTo) {
        await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (el) el.scrollIntoView({ block: "center" });
        }, flags.scrollTo);
      } else {
        await page.evaluate((hh) => window.scrollBy(0, hh), h);
      }
      await sleep(1000);
      result.animations.afterScroll = await page.evaluate(ANIMATIONS_SNIPPET);
    } catch (e) {
      result.errors.push(`scroll/animations afterScroll: ${e.message}`);
    }

    if (isDesktop) {
      try {
        let selector = flags.hover;
        let usedDefault = false;
        if (!selector) {
          selector = await findHoverTarget(page);
          usedDefault = true;
        }
        if (!selector) {
          result.hover = { selector: "none found", screenshot: false };
        } else {
          const exists = await page.$(selector).then((h) => !!h);
          if (!exists) {
            result.hover = {
              selector: usedDefault ? "none found" : `${selector} (not found)`,
              screenshot: false,
            };
          } else {
            await page.evaluate((sel) => {
              const el = document.querySelector(sel);
              const r = el.getBoundingClientRect();
              const targetTop = window.innerHeight * 0.3;
              window.scrollBy(0, r.top - targetTop);
            }, selector);
            await sleep(200);
            const el = await page.$(selector);
            const box = await el.boundingBox();
            if (box) {
              await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
              await sleep(700);
              writeFileSync(paths.hover, await page.screenshot());
              result.hover = { selector, screenshot: true };
            } else {
              result.hover = { selector, screenshot: false };
            }
          }
        }
      } catch (e) {
        result.errors.push(`hover: ${e.message}`);
        result.hover = result.hover || { selector: "error", screenshot: false };
      }
    }
  } finally {
    await page.close().catch(() => {});
  }
  return result;
}

async function captureRawHtml() {
  const out = { path: `${outdir}/_raw/${slug}.html`, bytes: null, status: null, error: null };
  try {
    const resp = await fetch(url, { headers: { "User-Agent": CHROME_UA } });
    out.status = resp.status;
    const buf = Buffer.from(await resp.arrayBuffer());
    out.bytes = buf.length;
    writeFileSync(out.path, buf);
  } catch (e) {
    out.error = e.message;
  }
  return out;
}

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    "--autoplay-policy=no-user-gesture-required",
  ],
});

const report = { url, slug, capturedAt: new Date().toISOString(), viewports: {}, raw: null };
const allErrors = [];

const viewportsPlan = [
  { w: 1440, h: 900, tag: "1440", scale: 0.5, maxFrames: 15, isDesktop: true },
  { w: 390, h: 844, tag: "390", scale: 1.0, maxFrames: 12, isDesktop: false },
];

for (const vp of viewportsPlan) {
  const paths = {
    foldEarly: `${outdir}/${slug}-${vp.tag}-fold-early.png`,
    fold: `${outdir}/${slug}-${vp.tag}-fold.png`,
    full: `${outdir}/${slug}-${vp.tag}.png`,
    hover: `${outdir}/${slug}-1440-hover.png`,
  };
  const vpReport = { errors: [] };

  const early = await captureFoldEarly(browser, vp.w, vp.h, paths.foldEarly);
  vpReport.foldEarly = early;
  if (!early.ok) vpReport.errors.push(`fold-early: ${early.error}`);

  const main = await captureMain(browser, vp.w, vp.h, vp.isDesktop, paths);
  vpReport.finalUrl = main.finalUrl;
  vpReport.status = main.status;
  vpReport.consent = main.consent;
  vpReport.animations = main.animations;
  vpReport.type = main.type;
  if (vp.isDesktop) vpReport.hover = main.hover;
  vpReport.errors.push(...main.errors);

  const full = await captureFull(browser, vp.w, vp.h, vp.scale, vp.maxFrames, paths.full);
  vpReport.pageHeight = full.ok ? full.total : null;
  vpReport.frames = full.ok
    ? { count: full.frameCount, maxFrames: full.maxFrames, truncated: full.truncated }
    : null;
  if (!full.ok) vpReport.errors.push(`full: ${full.error}`);

  report.viewports[vp.tag] = vpReport;
  allErrors.push(...vpReport.errors.map((e) => `${vp.tag}: ${e}`));
}

report.raw = await captureRawHtml();
if (report.raw.error) allErrors.push(`raw: ${report.raw.error}`);

writeFileSync(`${outdir}/${slug}-capture.json`, JSON.stringify(report, null, 2));
await browser.close();

if (allErrors.length === 0) {
  console.log(`OK ${slug}`);
  process.exit(0);
} else {
  console.log(`FAIL ${slug}: ${allErrors.join(" | ")}`);
  process.exit(1);
}
