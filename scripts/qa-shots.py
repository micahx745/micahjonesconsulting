# scripts/qa-shots.py
#
# PASS-101 PHASE 3 verification (brief §5.2, §5.6).
#
# Full-page screenshots of every restyled route at 390x844 and 1440x900 into
# .planning/qa/pass-101/, plus four measured checks reported to stdout:
#
#   1. FONTS   — no element on the page may compute a font-family naming
#      JetBrains or Bricolage (brief §5 item 6).
#   2. MOTION  — with html.rl-js set, every [data-rl] element must have reached
#      .rl-in by the time the page has been walked to its foot, i.e. the
#      finished frame is reachable and nothing is stranded invisible.
#   3. OVERFLOW — document scrollWidth must equal clientWidth. The page body
#      never scrolls sideways.
#   4. REDUCED MOTION — the same page under prefers-reduced-motion: reduce must
#      carry NO html.rl-js, so no pre-state is ever matched.
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

WALK = """async () => {
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 500));
}"""

PROBE = """() => {
  const bad = [];
  for (const el of document.querySelectorAll('*')) {
    const f = getComputedStyle(el).fontFamily || '';
    if (/JetBrains|Bricolage/i.test(f)) bad.push(el.tagName + '.' + String(el.className).slice(0, 40));
  }
  const all = [...document.querySelectorAll('[data-rl]')];
  return {
    badFonts: bad.slice(0, 6),
    rlJs: document.documentElement.classList.contains('rl-js'),
    animated: all.length,
    stranded: all.filter((el) => !el.classList.contains('rl-in')).length,
    barIn: !!document.getElementById('rl-bar')?.classList.contains('rl-in'),
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  };
}"""


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    report: dict[str, object] = {}
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for label, w, h in SIZES:
            page = await browser.new_page(viewport={"width": w, "height": h})
            for name, route in ROUTES:
                await page.goto(BASE + route, wait_until="networkidle")
                await page.evaluate(WALK)
                report[f"{name}@{label}"] = await page.evaluate(PROBE)
                await page.screenshot(
                    path=str(OUT / f"{name}-{label}.png"), full_page=True
                )
            await page.close()

        # 4. the reduced-motion pass: one width, every route, no screenshots.
        rm = await browser.new_context(
            viewport={"width": 1440, "height": 900}, reduced_motion="reduce"
        )
        page = await rm.new_page()
        for name, route in ROUTES:
            await page.goto(BASE + route, wait_until="networkidle")
            report[f"{name}@reduced"] = await page.evaluate(PROBE)
        await rm.close()
        await browser.close()
    print(json.dumps(report, indent=2))


asyncio.run(main())
