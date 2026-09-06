"""Verify the built "Room and Ledger" page against brief SS8, as amended by SS11.

Usage:  python .planning/design/winning/verify.py [built_html_path]

Prints one line per check:  CHECK <id> PASS|FAIL <evidence>

Writes beside the built file:
  rlf-1440.png, rlf-390.png           full-page
  rlf-1440-top.png, rlf-390-top.png   first screen
  rlf-1440-scrolled.png               bar released, seam under way
  rlf-sec-ask.png                     the bar over the copper field
  rlf-sec-price.png, rlf-sec-numbers.png
  rlf-scan-NN.png                     craft scan

SS11 amendments carried here:
  * SS8.6 thresholds are per-row: the copper row passes at >= 3.0 (large text), the bone
    row keeps >= 4.5. Contrast is now measured at 1440 AND at 390.
  * SS8.3 accepts the width-axis ladder (125 desktop / 106 at <=479 / 98 at <=359) rather
    than a single authorised fallback.
  * New checks 11-16 for the seven SS11 rulings the builder implemented.
"""
import io
import json
import os
import re
import sys
from html.parser import HTMLParser

from PIL import Image
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
DESIGN = os.path.normpath(os.path.join(HERE, ".."))
FREIGHT = os.path.join(DESIGN, "freight", "the-receipts.template.html")
SCRATCH = (r"C:\Users\micah\AppData\Local\Temp\claude\C--Users-micah-Code-micahjonesconsulting"
           r"\5e1d622c-a05a-43bd-9bbe-992aaaf6d702\scratchpad")
DEFAULT_BUILT = os.path.join(SCRATCH, "room-and-ledger.html")

ESPRESSO = (0x0D, 0x0D, 0x0F)
COPPER_RGB = (200, 84, 43)
COPPER = "rgb(200, 84, 43)"
ESPRESSO_CSS = "rgb(13, 13, 15)"

# SS11: the accent's ceiling on this ground is ~4.4; large copper display type passes at 3.
T_COPPER = 3.0
T_BONE = 4.5

# SS8.8 exempts the five bar labels and the title.
EXEMPT = {"Room and Ledger", "Micah Jones", "Record", "Playbook",
          "Packages from $500", "Name the problem \u2192"}

RESULTS = []

# scroll through Lenis when it is running, so the smooth-scroll loop cannot undo the seek
SCROLL = """(y) => { if (window.lenis) window.lenis.scrollTo(y, {immediate: true});
                     else window.scrollTo(0, y); }"""

# an inline-block of zero height sits ON the baseline of the line it joins; a Range rect
# over a text run is the font box (ascent+descent), so equal-metric runs share its offset.
BASELINE_JS = """
  function runRect(el) {
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (!n.textContent.trim()) continue;
      const r = document.createRange();
      r.selectNodeContents(n);
      const b = r.getBoundingClientRect();
      return {top: b.top, bottom: b.bottom, height: b.height, left: b.left,
              right: b.right, text: n.textContent.trim()};
    }
    return null;
  }
"""


def report(cid, ok, evidence):
    RESULTS.append({"id": cid, "pass": bool(ok), "evidence": evidence})
    print("CHECK %s %s %s" % (cid, "PASS" if ok else "FAIL", evidence))


# ---------------------------------------------------------------- copy gate

class Text(HTMLParser):
    SKIP = {"script", "style", "title"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.nodes = []

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()

    def handle_data(self, data):
        if self.stack:
            return
        s = " ".join(data.split()).strip()
        if s:
            self.nodes.append(s)


def text_nodes(path):
    p = Text()
    p.feed(open(path, encoding="utf-8").read())
    return p.nodes


def copy_gate(built):
    ref = " ".join(text_nodes(FREIGHT))
    ref = " ".join(ref.split())
    misses = []
    total = 0
    for node in text_nodes(built):
        if node in EXEMPT:
            continue
        total += 1
        if node not in ref:
            misses.append(node)
    return total, misses


# ---------------------------------------------------------------- contrast

def rel_lum(rgb):
    out = []
    for c in rgb:
        c = c / 255.0
        out.append(c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * out[0] + 0.7152 * out[1] + 0.0722 * out[2]


def ratio(l1, l2):
    a, b = max(l1, l2), min(l1, l2)
    return (a + 0.05) / (b + 0.05)


def hero_boxes(page):
    return page.evaluate("""() => {
        const cv = document.createElement('canvas'); cv.width = cv.height = 1;
        const ctx = cv.getContext('2d', {willReadFrequently: true});
        return [...document.querySelectorAll('.room h1 .r')].map(e => {
          const r = e.getBoundingClientRect();
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = getComputedStyle(e).color;
          ctx.fillRect(0, 0, 1, 1);
          const d = ctx.getImageData(0, 0, 1, 1).data;
          return [e.textContent, {x: r.x, y: r.y, width: r.width, height: r.height},
                  [d[0], d[1], d[2]]];
        });
    }""")


def contrast_at(page, boxes, t):
    """Seek the hero video to t, then measure each row's own ink against the composited
    background under it. The row colour is resolved through a 1x1 canvas because
    getComputedStyle hands back oklab() for anything mixed from --ink."""
    page.evaluate(
        """async (t) => {
        const v = document.querySelector('#film video');
        v.pause();
        if (Math.abs(v.currentTime - t) < 0.001) return;
        await new Promise(res => {
          const done = () => { v.removeEventListener('seeked', done); res(); };
          v.addEventListener('seeked', done);
          v.currentTime = t;
          setTimeout(res, 2500);
        });
      }""", t)
    page.wait_for_timeout(220)
    shown = Image.open(io.BytesIO(page.screenshot())).convert("RGB")
    page.evaluate("document.querySelector('.room h1').style.visibility = 'hidden'")
    page.wait_for_timeout(120)
    hidden = Image.open(io.BytesIO(page.screenshot())).convert("RGB")
    page.evaluate("document.querySelector('.room h1').style.visibility = ''")

    out = []
    for name, b, rgb in boxes:
        ink_l = rel_lum(rgb)
        crop = (max(0, int(b["x"])), max(0, int(b["y"])),
                int(b["x"] + b["width"]), int(b["y"] + b["height"]))
        a_px = shown.crop(crop).load()
        b_px = hidden.crop(crop).load()
        w, h = crop[2] - crop[0], crop[3] - crop[1]
        bg_sum, bg_n = 0.0, 0        # background between the glyphs
        gl_sum, gl_n = 0.0, 0        # background directly under the glyphs
        dev = 0                      # worst channel deviation from solid espresso
        for y in range(h):
            for x in range(w):
                pa, pb = a_px[x, y], b_px[x, y]
                glyph = max(abs(pa[0] - pb[0]), abs(pa[1] - pb[1]), abs(pa[2] - pb[2])) > 12
                lum = rel_lum(pb)
                d = max(abs(pb[0] - ESPRESSO[0]), abs(pb[1] - ESPRESSO[1]), abs(pb[2] - ESPRESSO[2]))
                if d > dev:
                    dev = d
                if glyph:
                    gl_sum += lum; gl_n += 1
                else:
                    bg_sum += lum; bg_n += 1
        r_bg = ratio(ink_l, bg_sum / bg_n) if bg_n else None
        r_gl = ratio(ink_l, gl_sum / gl_n) if gl_n else None
        out.append({"name": name, "rgb": tuple(rgb), "bg": r_bg, "gl": r_gl,
                    "gl_n": gl_n, "bg_n": bg_n, "dev": dev})
    return out


def measure_contrast(page, label):
    """Run SS8.6 at loop frames 0/96/192 and apply the SS11 per-row thresholds."""
    boxes = hero_boxes(page)
    loop_fps = 24.0
    rows = {}
    details = []
    worst_dev = {}
    for fno, t in [(0, 0.0), (96, 96 / loop_fps), (192, 192 / loop_fps)]:
        for r in contrast_at(page, boxes, t):
            cands = [x for x in (r["bg"], r["gl"]) if x is not None]
            lo = min(cands) if cands else 0
            key = r["name"]
            rows[key] = min(rows.get(key, 99.0), lo)
            rows.setdefault("__rgb__" + key, r["rgb"])
            worst_dev[key] = max(worst_dev.get(key, 0), r["dev"])
            details.append("%s f%d %r ink=rgb(%d,%d,%d) between-glyphs=%s under-glyphs=%s"
                           % (label, fno, key, r["rgb"][0], r["rgb"][1], r["rgb"][2],
                              ("%.2f" % r["bg"]) if r["bg"] else "n/a",
                              ("%.2f" % r["gl"]) if r["gl"] else "n/a(%d glyph px)" % r["gl_n"]))
    page.evaluate("document.querySelectorAll('#film video').forEach(v => v.play())")

    ok = True
    verdicts = []
    for key, lo in sorted(rows.items()):
        if key.startswith("__rgb__"):
            continue
        rgb = rows["__rgb__" + key]
        thr = T_COPPER if tuple(rgb) == COPPER_RGB else T_BONE
        good = lo >= thr
        ok = ok and good
        verdicts.append("%r %s min=%.2f threshold %.1f -> %s"
                        % (key, "copper" if thr == T_COPPER else "bone", lo, thr,
                           "PASS" if good else "FAIL"))
    return ok, verdicts, details, worst_dev


# ---------------------------------------------------------------- main

def main(built):
    url = "file:///" + built.replace("\\", "/")
    out_dir = os.path.dirname(built)
    shot = lambda name: os.path.join(out_dir, name)

    with sync_playwright() as pw:
        browser = pw.chromium.launch(args=["--autoplay-policy=no-user-gesture-required"])

        # ---------------- 1440 ----------------
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(url, wait_until="load")
        page.wait_for_function("document.fonts.status === 'loaded'", timeout=30000)
        page.wait_for_timeout(1200)

        # 10 fonts
        ok_font = page.evaluate("document.fonts.check('300 20px Anybody')")
        bad_fams = page.evaluate("""() => {
            const bad = new Set();
            for (const el of document.querySelectorAll('*')) {
              const f = getComputedStyle(el).fontFamily;
              if (/Bricolage/i.test(f)) bad.add('Bricolage');
              if (/JetBrains/i.test(f)) bad.add('JetBrains');
            }
            return [...bad];
        }""")
        report("10-fonts", ok_font and not bad_fams,
               "fonts.check('300 20px Anybody')=%s; banned families in computed styles=%s"
               % (ok_font, bad_fams or "none"))

        # 7 motion hygiene
        hyg = page.evaluate("""() => {
            let kf = 0, err = 0;
            for (const s of document.styleSheets) {
              let rules; try { rules = s.cssRules; } catch (e) { err++; continue; }
              const walk = (rs) => { for (const r of rs) {
                  if (r.type === CSSRule.KEYFRAMES_RULE || r instanceof CSSKeyframesRule) kf++;
                  if (r.cssRules) walk(r.cssRules); } };
              walk(rules);
            }
            let blend = 0;
            for (const el of document.querySelectorAll('*')) {
              const cs = getComputedStyle(el);
              if (cs.mixBlendMode && cs.mixBlendMode !== 'normal') blend++;
            }
            return { kf, err, blend, gsap: typeof window.gsap };
        }""")
        src = open(built, encoding="utf-8").read()
        src_kf = src.count("@keyframes")
        src_blend = src.count("mix-blend-mode")
        src_gsap = len(re.findall(r"\bgsap\b", src))
        ok7 = (hyg["kf"] == 0 and hyg["blend"] == 0 and hyg["gsap"] == "undefined"
               and src_kf == 0 and src_blend == 0 and src_gsap == 0)
        report("07-no-keyframes-gsap-blend", ok7,
               "@keyframes rules=%d (cross-origin sheets skipped=%d); source '@keyframes'=%d; "
               "elements with mix-blend-mode!=normal=%d; source 'mix-blend-mode'=%d; "
               "typeof window.gsap=%s; source /\\bgsap\\b/=%d"
               % (hyg["kf"], hyg["err"], src_kf, hyg["blend"], src_blend, hyg["gsap"], src_gsap))

        # 5 videos
        vids = page.evaluate("""() => [...document.querySelectorAll('video')].map(v => ({
            muted: v.muted, loop: v.loop, playsinline: v.hasAttribute('playsinline'),
            poster: (v.getAttribute('poster') || '').slice(0, 22),
            sources: v.querySelectorAll('source').length,
            types: [...v.querySelectorAll('source')].map(s => s.type).join('+'),
        }))""")
        page.wait_for_timeout(2600)
        ready = page.evaluate("[...document.querySelectorAll('video')].map(v => v.readyState)")
        ok5 = (len(vids) == 2
               and all(v["muted"] and v["loop"] and v["playsinline"] and v["poster"].startswith("data:image")
                       and v["sources"] == 2 and v["types"] == "video/webm+video/mp4" for v in vids)
               and all(r >= 2 for r in ready))
        report("05-videos", ok5,
               "count=%d; %s; readyState after 3s=%s"
               % (len(vids),
                  "; ".join("v%d muted=%s loop=%s playsinline=%s poster=%s.. sources=%d(%s)"
                            % (i, v["muted"], v["loop"], v["playsinline"], v["poster"], v["sources"], v["types"])
                            for i, v in enumerate(vids)),
                  ready))

        # 4 bar
        op0 = page.evaluate("getComputedStyle(document.getElementById('bar')).opacity")
        page.evaluate(SCROLL, page.evaluate("window.innerHeight * 1.5"))
        page.wait_for_timeout(600)
        op1 = page.evaluate("getComputedStyle(document.getElementById('bar')).opacity")
        report("04-bar", op0 == "0" and op1 == "1",
               "opacity at scrollY 0 = %s; opacity after scrolling past innerHeight + 400ms = %s"
               % (op0, op1))
        page.screenshot(path=shot("rlf-1440-scrolled.png"))

        # ---- 16 rail sticky at 140px (SS11) ----
        rail = page.evaluate("""() => { const r = document.querySelector('.rail');
            const cs = getComputedStyle(r); return {pos: cs.position, top: cs.top}; }""")
        report("16-rail-sticky", rail["pos"] == "sticky" and rail["top"] == "140px",
               "getComputedStyle('.rail') position=%s top=%s (SS11: sticky / 140px)"
               % (rail["pos"], rail["top"]))

        # ---- 15 the manual's label precedes its display line (SS11) ----
        man = page.evaluate("""() => {
            const h = document.querySelector('.manual .head'), d = document.querySelector('.manual h2');
            const rh = h.getBoundingClientRect(), rd = d.getBoundingClientRect();
            return {order: h.compareDocumentPosition(d) & Node.DOCUMENT_POSITION_FOLLOWING ? 'label-then-display' : 'display-then-label',
                    headBottom: rh.bottom, dispTop: rd.top, gap: rd.top - rh.bottom,
                    headText: h.textContent.trim(), dispText: d.textContent.trim().slice(0, 28)};
        }""")
        ok15 = man["order"] == "label-then-display" and man["gap"] >= 0
        report("15-manual-label-first", ok15,
               "document order=%s; %r bottom=%.1f -> %r top=%.1f (gap %.1fpx)"
               % (man["order"], man["headText"], man["headBottom"], man["dispText"],
                  man["dispTop"], man["gap"]))

        # ---- 14 the numbers: no reservation, 24px footnote, equal heights per grid row ----
        page.evaluate("""() => document.querySelector('.nums').scrollIntoView({block: 'center'})""")
        page.wait_for_timeout(500)
        page.screenshot(path=shot("rlf-sec-numbers.png"))
        nums = page.evaluate("""() => [...document.querySelectorAll('.num')].map(n => {
            const d = n.querySelector('.d'), f = n.querySelector('.f');
            const rn = n.getBoundingClientRect(), rd = d.getBoundingClientRect(), rf = f.getBoundingClientRect();
            return {h: rn.height, top: rn.top, gap: rf.top - rd.bottom,
                    minH: getComputedStyle(n).minHeight, dMinH: getComputedStyle(d).minHeight,
                    fig: d.textContent.trim(), lines: d.getClientRects().length};
        })""")
        rowpairs = [(nums[0], nums[1]), (nums[2], nums[3])]
        eq = all(abs(a["h"] - b["h"]) <= 1 for a, b in rowpairs)
        gaps_ok = all(abs(n["gap"] - 24) <= 1 for n in nums)
        noresv = all(n["minH"] in ("0px", "auto") and n["dMinH"] in ("0px", "auto") for n in nums)
        report("14-numbers", eq and gaps_ok and noresv,
               "min-height card/figure=%s; footnote offset below figure=%s (target 24px); "
               "card heights=%s; per-row deltas=%s"
               % ("; ".join("%s/%s" % (n["minH"], n["dMinH"]) for n in nums),
                  ["%.1f" % n["gap"] for n in nums],
                  ["%.1f" % n["h"] for n in nums],
                  ["%.2f" % abs(a["h"] - b["h"]) for a, b in rowpairs]))

        # ---- 13 the price column: five figures flush to one right edge (SS11) ----
        page.evaluate("""() => document.querySelector('#price').scrollIntoView({block: 'start'})""")
        page.wait_for_timeout(500)
        page.screenshot(path=shot("rlf-sec-price.png"))
        price = page.evaluate("""() => {
            %s
            return [...document.querySelectorAll('.prow .v')].map(v => {
              const fig = runRect(v);
              const sfx = v.querySelector('.l');
              const rs = sfx ? sfx.getBoundingClientRect() : null;
              return {fig: fig.text, right: fig.right, figBottom: fig.bottom,
                      suffix: sfx ? sfx.textContent.trim() : null,
                      suffixDisplay: sfx ? getComputedStyle(sfx).display : null,
                      suffixTop: rs ? rs.top : null,
                      ownLine: rs ? rs.top >= fig.bottom - 1 : true};
            });
        }""" % BASELINE_JS)
        rights = [p["right"] for p in price]
        spread = max(rights) - min(rights)
        ok13 = (len(price) == 5 and spread <= 1.0
                and all(p["suffixDisplay"] in (None, "block") for p in price)
                and all(p["ownLine"] for p in price))
        report("13-price-flush-right", ok13,
               "%d figures; right edges=%s; spread=%.2fpx (<=1); suffixes=%s"
               % (len(price), ["%.2f" % r for r in rights], spread,
                  "; ".join("%s->%r display=%s ownLine=%s"
                            % (p["fig"], p["suffix"], p["suffixDisplay"], p["ownLine"])
                            for p in price if p["suffix"])))

        # ---- 12 the bar over the copper field (SS11) ----
        ask_y = page.evaluate(
            "() => window.scrollY + document.getElementById('contact').getBoundingClientRect().top + 20")
        page.evaluate(SCROLL, ask_y)
        page.wait_for_timeout(900)
        overask = page.evaluate("""() => {
            const bar = document.getElementById('bar'), ask = document.getElementById('contact');
            const cs = getComputedStyle(bar), ar = getComputedStyle(bar.querySelector('.ar'));
            const rb = bar.getBoundingClientRect(), ra = ask.getBoundingClientRect();
            return {cls: bar.classList.contains('over-ask'), bg: cs.backgroundColor, color: cs.color,
                    arrow: ar.color, opacity: cs.opacity, barBottom: rb.bottom,
                    askTop: ra.top, askBottom: ra.bottom,
                    askBg: getComputedStyle(ask).backgroundColor};
        }""")
        page.screenshot(path=shot("rlf-sec-ask.png"))
        ok12 = (overask["cls"] and overask["bg"] == COPPER and overask["color"] == ESPRESSO_CSS
                and overask["arrow"] == ESPRESSO_CSS and overask["askBg"] == COPPER
                and overask["askTop"] <= overask["barBottom"] <= overask["askBottom"])
        report("12-bar-over-ask", ok12,
               "ask top=%.1f bottom=%.1f straddles the bar's bottom edge %.1f; bar computed "
               "background=%s color=%s arrow=%s (ask field background=%s); class over-ask=%s"
               % (overask["askTop"], overask["askBottom"], overask["barBottom"], overask["bg"],
                  overask["color"], overask["arrow"], overask["askBg"], overask["cls"]))

        # the bar must go back to the ground colour once the field is past
        page.evaluate(SCROLL, 0)
        page.wait_for_timeout(800)
        back = page.evaluate(
            "() => document.getElementById('bar').classList.contains('over-ask')")

        # 3 hero rows at 1440
        rows1440 = page.evaluate("""() => {
            const room = document.getElementById('room');
            const cs = getComputedStyle(room);
            const content = room.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
            return { content, rows: [...document.querySelectorAll('.room h1 .r')].map(e => ({
                text: e.textContent, w: e.getBoundingClientRect().width, rects: e.getClientRects().length,
                wdth: getComputedStyle(e).fontVariationSettings, size: getComputedStyle(e).fontSize }))};
        }""")

        # ---- 11 proof row baseline-aligned with the chip label (SS11) ----
        base = page.evaluate("""() => {
            %s
            const chip = document.querySelector('.room .chips .chip .t');
            const proof = document.querySelector('.room .proof > div');
            const a = runRect(chip), b = runRect(proof);
            const ca = getComputedStyle(chip), cb = getComputedStyle(proof.querySelector('.l'));
            return {a, b, delta: b.top - a.top, dh: b.height - a.height,
                    fa: ca.fontSize + '/' + ca.fontWeight + '/' + ca.fontVariationSettings,
                    fb: cb.fontSize + '/' + cb.fontWeight + '/' + cb.fontVariationSettings};
        }""" % BASELINE_JS)
        # equal font metrics => equal font-box height => baseline delta == text-box top delta
        ok11 = abs(base["dh"]) <= 0.5 and abs(base["delta"]) <= 2.0
        report("11-proof-baseline", ok11,
               "chip label %r text box top=%.2f h=%.2f (%s); proof first line %r top=%.2f h=%.2f (%s); "
               "identical metrics so the baseline delta = %.2fpx (<=2px); font-box height delta=%.2fpx"
               % (base["a"]["text"], base["a"]["top"], base["a"]["height"], base["fa"],
                  base["b"]["text"], base["b"]["top"], base["b"]["height"], base["fb"],
                  base["delta"], base["dh"]))

        # 9 copper on the first screen
        copper = page.evaluate("""(COPPER) => {
            const hits = [];
            for (const el of document.querySelectorAll('*')) {
              const cs = getComputedStyle(el);
              if (cs.color !== COPPER && cs.backgroundColor !== COPPER) continue;
              const r = el.getBoundingClientRect();
              if (r.width <= 0 || r.height <= 0) continue;
              if (r.bottom <= 0 || r.top >= window.innerHeight) continue;
              if (r.right <= 0 || r.left >= window.innerWidth) continue;
              hits.push((el.className || el.tagName) + (cs.color === COPPER ? ' [color]' : '') +
                        (cs.backgroundColor === COPPER ? ' [background]' : ''));
            }
            return hits;
        }""", COPPER)
        report("09-copper-first-screen", len(copper) <= 4 and not back,
               "%d element(s) computed rgb(200, 84, 43) inside the 1440x900 viewport at scrollY 0: %s; "
               "bar still carries over-ask back at the top=%s"
               % (len(copper), copper, back))

        # 6 composited contrast at 1440
        ok6a, verd_a, det_a, dev_a = measure_contrast(page, "1440")

        # craft scan + full page
        page.evaluate(SCROLL, 0); page.wait_for_timeout(600)
        page.screenshot(path=shot("rlf-1440-top.png"))
        height = page.evaluate("document.documentElement.scrollHeight")
        n, y = 0, 0
        while y < height and n < 14:
            page.evaluate(SCROLL, y)
            page.wait_for_timeout(420)
            page.screenshot(path=shot("rlf-scan-%02d.png" % n))
            n += 1
            y += 800
        page.evaluate(SCROLL, 0); page.wait_for_timeout(700)
        page.screenshot(path=shot("rlf-1440.png"), full_page=True)
        page.close()

        # ---------------- 390 ----------------
        m = browser.new_page(viewport={"width": 390, "height": 844})
        m.goto(url, wait_until="load")
        m.wait_for_function("document.fonts.status === 'loaded'", timeout=30000)
        m.wait_for_timeout(1500)

        over = m.evaluate("""() => ({sw: document.documentElement.scrollWidth,
                                     bw: document.body.scrollWidth,
                                     iw: window.innerWidth,
                                     wide: [...document.querySelectorAll('*')]
                                       .filter(e => e.getBoundingClientRect().right > window.innerWidth + 1)
                                       .slice(0, 6).map(e => (e.className || e.tagName) + '@' +
                                          Math.round(e.getBoundingClientRect().right))})""")
        report("02-no-h-overflow-390", over["sw"] <= over["iw"] and over["bw"] <= over["iw"],
               "documentElement.scrollWidth=%d, body.scrollWidth=%d, innerWidth=%d; overflowing elements=%s"
               % (over["sw"], over["bw"], over["iw"], over["wide"] or "none"))

        rows390 = m.evaluate("""() => {
            const room = document.getElementById('room');
            const cs = getComputedStyle(room);
            const content = room.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
            return { content, rows: [...document.querySelectorAll('.room h1 .r')].map(e => ({
                text: e.textContent, w: e.getBoundingClientRect().width, rects: e.getClientRects().length,
                wdth: getComputedStyle(e).fontVariationSettings, size: getComputedStyle(e).fontSize }))};
        }""")

        # 6 composited contrast at 390 (SS11: the second row must sit on solid espresso)
        m.evaluate(SCROLL, 0); m.wait_for_timeout(400)
        ok6b, verd_b, det_b, dev_b = measure_contrast(m, "390")
        second = list(rows390["rows"])[1]["text"]
        dev2 = dev_b.get(second, 999)
        solid = dev2 <= 4
        report("06b-390-second-row-on-solid-espresso", solid,
               "worst channel deviation of the composited background under %r from #0D0D0F "
               "across frames 0/96/192 = %d/255 (<=4 counts as solid); all rows: %s"
               % (second, dev2, {k: v for k, v in dev_b.items()}))

        m.evaluate(SCROLL, 0); m.wait_for_timeout(500)
        m.screenshot(path=shot("rlf-390-top.png"))
        m.screenshot(path=shot("rlf-390.png"), full_page=True)
        m.close()

        report("06-composited-contrast", ok6a and ok6b,
               "SS11 thresholds (copper row >= %.1f, bone row >= %.1f). 1440: %s | 390: %s || raw: %s"
               % (T_COPPER, T_BONE, " ; ".join(verd_a), " ; ".join(verd_b),
                  " | ".join(det_a + det_b)))

        # 3 hero rows + the SS11 width ladder
        ladder = {1440: 125, 390: 106}
        def wd(s):
            mm = re.search(r'"wdth"\s+([\d.]+)', s or "")
            return float(mm.group(1)) if mm else None
        w1440 = [wd(r["wdth"]) for r in rows1440["rows"]]
        w390 = [wd(r["wdth"]) for r in rows390["rows"]]
        fit = all(r["w"] < d["content"] and r["rects"] == 1
                  for d in (rows1440, rows390) for r in d["rows"])
        ladder_ok = (all(v == ladder[1440] for v in w1440) and all(v == ladder[390] for v in w390))
        report("03-hero-rows-fit", fit and ladder_ok,
               "SS11 ladder 125 desktop / 106 <=479px / 98 <=359px -- observed 1440=%s, 390=%s. "
               "1440: content=%.0fpx %s | 390: content=%.0fpx %s"
               % (w1440, w390,
                  rows1440["content"],
                  " ".join("%r %.0fpx rects=%d %s %s" % (r["text"], r["w"], r["rects"], r["size"], r["wdth"])
                           for r in rows1440["rows"]),
                  rows390["content"],
                  " ".join("%r %.0fpx rects=%d %s %s" % (r["text"], r["w"], r["rects"], r["size"], r["wdth"])
                           for r in rows390["rows"])))

        browser.close()

    # 1 screenshots
    shots = ["rlf-1440.png", "rlf-390.png", "rlf-1440-top.png", "rlf-390-top.png",
             "rlf-1440-scrolled.png", "rlf-sec-ask.png", "rlf-sec-price.png", "rlf-sec-numbers.png"]
    sizes = []
    for s in shots:
        p = os.path.join(out_dir, s)
        if os.path.exists(p):
            with Image.open(p) as im:
                sizes.append("%s %dx%d" % (s, im.width, im.height))
        else:
            sizes.append("%s MISSING" % s)
    report("01-screenshots", all("MISSING" not in x for x in sizes), "; ".join(sizes))

    # 8 copy gate
    total, misses = copy_gate(built)
    report("08-copy-gate", not misses,
           "%d text nodes checked against freight/the-receipts.template.html (5 bar labels + title "
           "exempt); misses=%d%s" % (total, len(misses),
                                     (": " + json.dumps(misses, ensure_ascii=False)) if misses else ""))

    # file size
    size = os.path.getsize(built)
    report("00-size", size <= 12 * 1024 * 1024,
           "%d bytes (%.2fMB), ceiling 12MB" % (size, size / 1024 / 1024))

    print("\nSUMMARY %d/%d pass" % (sum(1 for r in RESULTS if r["pass"]), len(RESULTS)))
    with open(os.path.join(os.path.dirname(built), "rlf-verify.json"), "w",
              encoding="utf-8", newline="\n") as fh:
        json.dump(RESULTS, fh, ensure_ascii=False, indent=1)
    return 0 if all(r["pass"] for r in RESULTS) else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_BUILT))
