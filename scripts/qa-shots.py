# scripts/qa-shots.py
#
# PASS-101 PHASE 3 verification (brief §5.2, §5.6).
#
# Full-page screenshots of every restyled route at 390x844 and 1440x900 into
# .planning/qa/pass-101/, plus two measured checks reported to stdout:
#
#   1. FONTS  — the computed font-family of every element on the page must not
#      name JetBrains or Bricolage (brief §5 item 6). Reported per route.
#   2. MOTION — with html.rl-js set, every [data-rl] element must have reached
#      .rl-in by the time the page has been scrolled to its foot, i.e. the
#      finished frame is actually reachable and nothing is stranded invisible.
#
# Usage: python scripts/qa-shots.py [base_url]
import asyncio
import json
import pathlib
import sys

from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
OUT = pathlib.Path(".planning/qa/pass-101")
ROUTES = [
    ("packages", "/packages"),
    ("playbook", "/playbook"),
    ("work", "/work"),
    ("work-guardicore", "/work/guardicore"),
    ("call", "/call"),
    ("about", "/about"),
]
SIZES = [("390", 390, 844), ("1440", 1440, 900)]

FONT_PROBE = """() => {
  const bad = [];
  for (const el of document.querySelectorAll('*')) {
    const f = getComputedStyle(el).fontFamily || '';
    if (/JetBrains|Bricolage/i.test(f)) bad.push(el.tagName + '.' + el.className + ' :: ' + f);
  }
  return bad.slice(0, 8);
}"""

MOTION_PROBE = """() => {
  const all = [...document.querySelectorAll('#rl-root [data-rl]')];
  const stranded = all.filter(el => !el.classList.contains('rl-in'));
  return {
    js: document.documentElement.classList.contains('rl-js'),
    total: all.length,
    stranded: stranded.length,
    barIn: !!document.getElementById('rl-bar')?.classList.contains('rl-in'),
  };
}"""

OVERFLOW_PROBE = """() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
})"""


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    report = {}
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for label, w, h in SIZES:
            page = await browser.new_page(viewport={"width": w, "height": h})
            for name, route in ROUTES:
                await page.goto(BASE + route, wait_until="networkidle")
                # walk the page so every IntersectionObserver target fires
                await page.evaluate(
                    "async () => {"
                    "  const step = window.innerHeight * 0.8;"
                    "  for (let y = 0; y < document.body.scrollHeight; y += step) {"
                    "    window.scrollTo(0, y);"
                    "    await new Promise(r => setTimeout(r, 90));"
                    "  }"
                    "  window.scrollTo(0, 0);"
                    "  await new Promise(r => setTimeout(r, 400));"
                    "}"
                )
                key = f"{name}@{label}"
                report[key] = {
                    "fonts": await page.evaluate(FONT_PROBE),
                    "motion": await page.evaluate(MOTION_PROBE),
                    "overflow": await page.evaluate(OVERFLOW_PROBE),
                }
                await page.screenshot(
                    path=str(OUT / f"{name}-{label}.png"), full_page=True
                )
            await page.close()
        await browser.close()
    print(json.dumps(report, indent=2))


asyncio.run(main())
