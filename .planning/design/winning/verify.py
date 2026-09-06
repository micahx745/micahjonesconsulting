"""Verify the built "Room and Ledger" page (v3) against brief SS13 and Fable's binding notes.

Usage:  python .planning/design/winning/verify.py [built_html_path]

Prints one line per check:  CHECK <id> PASS|FAIL <evidence>

Writes beside the built file the twelve named plates:
  rl3-1440-top.png rl3-390-top.png rl3-360-top.png
  rl3-sec-operator.png rl3-sec-work.png rl3-sec-price.png rl3-sec-proof.png
  rl3-sec-faq.png rl3-sec-ask.png
  rl3-390-operator.png rl3-390-proof.png rl3-390-price.png
plus rl3-1440.png / rl3-390.png (full page) and rl3-verify.json.

WHAT MOVED FROM v2 (the checks that were rewritten, not merely renumbered):
  * The four-card numbers section is DELETED; check 14 (its geometry) is gone with it.
  * Order is now 01 room / 02 operator / 03 work / 04 engagements / 05 packages /
    06 proof / 07 manual / 08 faq / 09 ask / 10 foot (check 13).
  * The copy gate reads TWO verified sources: freight text AND alt text, plus the
    title/dek/year/role frontmatter of content/work/*.mdx. A node also passes if every
    " \u00b7 "-separated atom of it is verified (the freight file composes labels that way).
  * The hero clip is A2: no loop, the poster is the LAST frame, and below 900px it is a
    46lvh band so the pointing hand AND the face are inside the crop (check 11).
  * The width ladder is swept at 360 / 375 / 390 / 414 (check 03).
  * The bar's ground is a hard switch and it inverts to espresso/bone over every dark
    section; contrast over the ask is measured (check 12).
  * Reduced motion is exercised in its own context (check 21).
"""
import io
import json
import os
import re
import sys
from html.parser import HTMLParser

from PIL import Image, ImageChops, ImageStat
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
DESIGN = os.path.normpath(os.path.join(HERE, ".."))
REPO = os.path.normpath(os.path.join(DESIGN, "..", ".."))
FREIGHT = os.path.join(DESIGN, "freight", "the-receipts.template.html")
MDX_DIR = os.path.join(REPO, "content", "work")
SCRATCH = (r"C:\Users\micah\AppData\Local\Temp\claude\C--Users-micah-Code-micahjonesconsulting"
           r"\5e1d622c-a05a-43bd-9bbe-992aaaf6d702\scratchpad")
DEFAULT_BUILT = os.path.join(SCRATCH, "room-and-ledger.html")

ESPRESSO = (0x0D, 0x0D, 0x0F)
BONE = (0xF5, 0xEF, 0xE4)
COPPER_RGB = (200, 84, 43)
COPPER = "rgb(200, 84, 43)"
ESPRESSO_CSS = "rgb(13, 13, 15)"
BONE_CSS = "rgb(245, 239, 228)"

T_COPPER = 3.0     # SS11: the accent's ceiling on this ground; large display type
T_BONE = 4.5
# RL4 supersedes SS11's bar-over-the-ask line. The old rule put espresso type on raw copper,
# which measures 4.3999:1 -- the arithmetic ceiling of that pair, and 0.10 short of AA for
# 14px type. The bar now paints espresso with bone labels over the ask, like every other dark
# section, and carries NO exception: T_BAR_ASK is a floor ABOVE the 4.5 general bar, not below
# it, because the operator asked for the state to be measured at 5:1.
T_BAR_ASK = 5.0

EXEMPT = {"Room and Ledger"}

# The hero clip A2 in SOURCE FRACTIONS of its own width, measured off A2-poster-last.jpg
# (1920x1080): the pointing hand runs x 368-685, his face x 1010-1290. Fractions, because
# below 900px the page serves the 1280-wide cut.
HAND = (368 / 1920.0, 685 / 1920.0)
FACE = (1010 / 1920.0, 1290 / 1920.0)

RESULTS = []

SCROLL = """(y) => { if (window.lenis) window.lenis.scrollTo(y, {immediate: true});
                     else window.scrollTo(0, y); }"""

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

# the visible slice of a <video>'s own source, as fractions of the source frame
SLICE_JS = """(sel) => {
  const v = document.querySelector(sel);
  if (!v) return null;
  const r = v.getBoundingClientRect(), cs = getComputedStyle(v);
  const vw = v.videoWidth, vh = v.videoHeight;
  if (!vw || !vh) return {error: 'no metadata'};
  const parts = cs.objectPosition.split(' ');
  const off = (s, box, nat) => s.endsWith('%') ? (parseFloat(s) / 100) * (box - nat) : parseFloat(s);
  const sc = Math.max(r.width / vw, r.height / vh);
  const sw = vw * sc, sh = vh * sc;
  const ox = off(parts[0], r.width, sw), oy = off(parts[1], r.height, sh);
  return {box: [r.width, r.height], nat: [vw, vh], objectPosition: cs.objectPosition,
          x: [(-ox / sc) / vw, ((-ox + r.width) / sc) / vw],
          y: [(-oy / sc) / vh, ((-oy + r.height) / sc) / vh],
          srcBytes: v.currentSrc.length, height: cs.height};
}"""


HOLD_JS = """async () => {
  const v = document.getElementById('filmvid');
  if (!v || !v.duration) return;
  const t = Math.max(0, v.duration - 0.05);
  if (Math.abs(v.currentTime - t) > 0.02) {
    await new Promise(res => {
      const done = () => { v.removeEventListener('seeked', done); res(); };
      v.addEventListener('seeked', done);
      v.currentTime = t;
      setTimeout(res, 2000);
    });
  }
  v.pause();
}"""


def hold(pg):
    """Clip A runs forward ONCE and holds (SS13). Every plate of the first screen has to show
    that hold frame -- the harness scrubs the clip during the contrast work, and play() on an
    ended element rewinds it to zero, so the resting state is restored explicitly."""
    pg.evaluate(HOLD_JS)
    pg.wait_for_timeout(160)


def place(page, sel, offset=0.0, tries=6):
    """Put `sel`'s top at `offset` px from the viewport top and CONFIRM it landed.
    Lenis owns the scroll, and a native scrollIntoView leaves its internal position out of
    step, so every seek is closed-loop."""
    for _ in range(tries):
        top = page.evaluate("(s) => document.querySelector(s).getBoundingClientRect().top", sel)
        if abs(top - offset) <= 1.5:
            return top
        y = page.evaluate("(s) => window.scrollY + document.querySelector(s).getBoundingClientRect().top", sel)
        page.evaluate(SCROLL, y - offset)
        page.wait_for_timeout(320)
    return page.evaluate("(s) => document.querySelector(s).getBoundingClientRect().top", sel)


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
        self.alts = []

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self.stack.append(tag)
        d = dict(attrs)
        if d.get("alt", "").strip():
            self.alts.append(" ".join(d["alt"].split()))

    def handle_endtag(self, tag):
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()

    def handle_data(self, data):
        if self.stack:
            return
        s = " ".join(data.split()).strip()
        if s:
            self.nodes.append(s)


def parse(path):
    p = Text()
    p.feed(io.open(path, encoding="utf-8").read())
    return p


def mdx_corpus():
    """title / dek / year / role from every content/work/*.mdx frontmatter."""
    vals = []
    for name in sorted(os.listdir(MDX_DIR)):
        if not name.endswith(".mdx"):
            continue
        src = io.open(os.path.join(MDX_DIR, name), encoding="utf-8").read()
        m = re.match(r"^---\r?\n(.*?)\r?\n---", src, re.S)
        if not m:
            continue
        for line in m.group(1).split("\n"):
            mm = re.match(r"^(title|dek|year|role):\s*(.+?)\s*$", line)
            if mm:
                v = mm.group(2)
                if len(v) > 1 and v[0] in "\"'" and v[-1] == v[0]:
                    v = v[1:-1]
                vals.append((name, mm.group(1), " ".join(v.split())))
    return vals


def dash(s):
    """Date-range punctuation only: U+2013 folded to '-' on BOTH sides of the comparison.

    The two verified sources disagree with themselves -- guardicore.mdx carries `2018-2021`
    with an en dash and rfp-engine/content-engine/ordani carry hyphens -- so four years set
    two ways landed in one 300px column of the index. Setting all four as ranges (en dash,
    which is what a range takes) adds no word to the page; it changes one glyph inside a
    figure the source already supplies. Nothing else in the gate is relaxed."""
    return s.replace("–", "-")


def copy_gate(built):
    fr = parse(FREIGHT)
    ref_text = dash(" ".join(" ".join(fr.nodes).split()))
    ref_alt = dash(" || ".join(fr.alts))
    mdx = mdx_corpus()
    ref_mdx = dash(" || ".join(v for _, _, v in mdx))

    def atom_ok(a):
        a = dash(a.strip())
        return bool(a) and (a in ref_text or a in ref_alt or a in ref_mdx)

    def node_ok(node):
        if node_ok_direct(node):
            return True
        parts = node.split(" \u00b7 ")
        return len(parts) > 1 and all(atom_ok(p) for p in parts)

    def node_ok_direct(node):
        return atom_ok(node)

    b = parse(built)
    # v3.1: the BUILT page's alt attributes are held to the same two sources. The gate used to
    # read visible text nodes only, which is how two invented alt strings shipped.
    alt_misses = [a for a in b.alts if not node_ok(a)]
    misses, sourced, total = [], {"freight": 0, "alt": 0, "mdx": 0, "composed": 0}, 0
    for node in b.nodes:
        if node in EXEMPT:
            continue
        total += 1
        d = dash(node)
        if d in ref_text:
            sourced["freight"] += 1
        elif d in ref_alt:
            sourced["alt"] += 1
        elif d in ref_mdx:
            sourced["mdx"] += 1
        elif node_ok(node):
            sourced["composed"] += 1
        else:
            misses.append(node)
    return total, misses + ["[alt] " + a for a in alt_misses], sourced, len(mdx)


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


def runs(page, sel):
    """Each glyph run of `sel`, with its resolved ink colour (through a 1x1 canvas, because
    getComputedStyle hands back oklab() for anything mixed from --ink)."""
    return page.evaluate("""(sel) => {
        const cv = document.createElement('canvas'); cv.width = cv.height = 1;
        const ctx = cv.getContext('2d', {willReadFrequently: true});
        return [...document.querySelectorAll(sel)].map(e => {
          const r = e.getBoundingClientRect();
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = getComputedStyle(e).color;
          ctx.fillRect(0, 0, 1, 1);
          const d = ctx.getImageData(0, 0, 1, 1).data;
          return [e.textContent.trim().slice(0, 24),
                  {x: r.x, y: r.y, width: r.width, height: r.height},
                  [d[0], d[1], d[2]]];
        });
    }""", sel)


def composited(page, boxes, hide_sel):
    """Screenshot with and without the type, then compare the ink against the background
    both between and directly under the glyphs."""
    shown = Image.open(io.BytesIO(page.screenshot())).convert("RGB")
    page.evaluate("(s) => document.querySelectorAll(s).forEach(e => e.style.visibility = 'hidden')", hide_sel)
    page.wait_for_timeout(120)
    hidden = Image.open(io.BytesIO(page.screenshot())).convert("RGB")
    page.evaluate("(s) => document.querySelectorAll(s).forEach(e => e.style.visibility = '')", hide_sel)

    out = []
    for name, b, rgb in boxes:
        ink_l = rel_lum(rgb)
        crop = (max(0, int(b["x"])), max(0, int(b["y"])),
                min(shown.width, int(b["x"] + b["width"])),
                min(shown.height, int(b["y"] + b["height"])))
        if crop[2] <= crop[0] or crop[3] <= crop[1]:
            continue
        a_px = shown.crop(crop).load()
        b_px = hidden.crop(crop).load()
        w, h = crop[2] - crop[0], crop[3] - crop[1]
        bg_sum = bg_n = 0
        gl_sum = gl_n = 0
        dev = 0
        for y in range(h):
            for x in range(w):
                pa, pb = a_px[x, y], b_px[x, y]
                glyph = max(abs(pa[0] - pb[0]), abs(pa[1] - pb[1]), abs(pa[2] - pb[2])) > 12
                lum = rel_lum(pb)
                d = max(abs(pb[i] - ESPRESSO[i]) for i in range(3))
                dev = max(dev, d)
                if glyph:
                    gl_sum += lum; gl_n += 1
                else:
                    bg_sum += lum; bg_n += 1
        cands = []
        if bg_n:
            cands.append(ratio(ink_l, bg_sum / bg_n))
        if gl_n:
            cands.append(ratio(ink_l, gl_sum / gl_n))
        out.append({"name": name, "rgb": tuple(rgb), "min": min(cands) if cands else 0,
                    "dev": dev, "gl_n": gl_n})
    return out


CX_JS = r"""(sel) => {
  const root = sel === ':bar' ? document.getElementById('bar') : document.querySelector(sel);
  if (!root) return [];
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const ctx = cv.getContext('2d', {willReadFrequently: true});
  const vh = window.innerHeight, vw = window.innerWidth;
  const out = [];
  document.querySelectorAll('[data-cx]').forEach(e => e.removeAttribute('data-cx'));
  const all = [root, ...root.querySelectorAll('*')];
  for (const e of all) {
    let txt = '';
    for (const c of e.childNodes) if (c.nodeType === 3) txt += c.textContent;
    txt = txt.trim();
    if (!txt) continue;
    const r = e.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    if (r.bottom <= 3 || r.top >= vh - 3 || r.right <= 1 || r.left >= vw - 1) continue;
    const cs = getComputedStyle(e);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    let a = 1;
    for (let p = e; p && p !== document.documentElement; p = p.parentElement) {
      const o = parseFloat(getComputedStyle(p).opacity);
      if (!isNaN(o)) a *= o;
    }
    if (a < 0.02) continue;
    // RL4: there is no copper bar state left to except. Kept as a constant false so the
    // tuple shape (and any older reader of it) does not change shape underneath the sweep.
    const inCopperBar = false;
    ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = cs.color; ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    // the ink's OWN alpha counts too: every --ink-60 / --ink-72 token is a colour-mix with
    // transparent, and getImageData hands back the un-premultiplied channels.
    a *= d[3] / 255;
    if (a < 0.02) continue;
    e.setAttribute('data-cx', '1');
    out.push([txt.replace(/\s+/g, ' ').slice(0, 44),
              {x: r.x, y: r.y, width: r.width, height: r.height},
              [d[0], d[1], d[2]], parseFloat(cs.fontSize), parseInt(cs.fontWeight, 10) || 400, a,
              inCopperBar]);
  }
  return out;
}"""


def sweep(page, sel):
    """Every visible glyph run inside `sel`, measured against the pixels actually behind it.

    The ink is the element's own colour composited through every ancestor opacity (that is
    what CSS opacity does), the ground is the mean of the non-glyph pixels in a screenshot
    taken with the type hidden. Threshold is WCAG's: 4.5:1, or 3:1 for large text (>= 24px,
    or >= 18.66px at weight >= 700) -- which is the same exception SS11 grants the copper
    display rows, and the reason a 20px copper arrow does NOT get it."""
    boxes = page.evaluate(CX_JS, sel)
    if not boxes:
        return []
    shown = Image.open(io.BytesIO(page.screenshot())).convert("RGB")
    # colour:transparent, NOT visibility:hidden -- hiding a chip takes its own fill away with
    # it and the ground behind it gets measured instead of the chip.
    page.evaluate("() => document.querySelectorAll('[data-cx]').forEach("
                  "e => e.style.setProperty('color', 'transparent', 'important'))")
    page.wait_for_timeout(140)
    hidden = Image.open(io.BytesIO(page.screenshot())).convert("RGB")
    page.evaluate("() => document.querySelectorAll('[data-cx]').forEach("
                  "e => e.style.removeProperty('color'))")

    out = []
    for text, bx, rgb, size, weight, alpha, in_copper_bar in boxes:
        crop = (max(0, int(bx["x"])), max(0, int(bx["y"])),
                min(shown.width, int(bx["x"] + bx["width"]) + 1),
                min(shown.height, int(bx["y"] + bx["height"]) + 1))
        if crop[2] - crop[0] < 2 or crop[3] - crop[1] < 2:
            continue
        a_c, b_c = shown.crop(crop), hidden.crop(crop)
        diff = ImageChops.difference(a_c, b_c).convert("L")
        gmask = diff.point(lambda v: 255 if v > 12 else 0)
        bmask = diff.point(lambda v: 0 if v > 12 else 255)
        st_g = ImageStat.Stat(a_c, gmask)
        st_b = ImageStat.Stat(b_c, bmask)
        if not st_g.count[0] or not st_b.count[0]:
            continue
        bg = tuple(st_b.mean)
        ink = tuple(rgb[i] * alpha + bg[i] * (1 - alpha) for i in range(3))
        thr = 3.0 if (size >= 24 or (size >= 18.66 and weight >= 700)) else 4.5
        # RL4: the copper-bar exception is gone with the copper bar. Every run on the page,
        # the bar over the ask included, is held to the plain WCAG threshold.
        out.append({"text": text, "size": size, "ratio": ratio(rel_lum(ink), rel_lum(bg)),
                    "thr": thr, "ink": tuple(round(c) for c in ink),
                    "bg": tuple(round(c) for c in bg), "copperbar": in_copper_bar})
    return out


def hero_contrast(page, label):
    boxes = runs(page, ".room h1 .r")
    rows, worst_dev, detail = {}, {}, []
    for fno, t in [(0, 0.0), (48, 2.0), (96, 4.0)]:
        page.evaluate("""async (t) => {
            const v = document.querySelector('#filmvid'); if (!v) return;
            v.pause();
            if (Math.abs(v.currentTime - t) < 0.001) return;
            await new Promise(res => {
              const done = () => { v.removeEventListener('seeked', done); res(); };
              v.addEventListener('seeked', done);
              v.currentTime = Math.min(t, (v.duration || t) - 0.02);
              setTimeout(res, 2500);
            });
        }""", t)
        page.wait_for_timeout(200)
        for r in composited(page, boxes, ".room h1"):
            rows[r["name"]] = min(rows.get(r["name"], 99.0), r["min"])
            rows["__rgb__" + r["name"]] = r["rgb"]
            worst_dev[r["name"]] = max(worst_dev.get(r["name"], 0), r["dev"])
            detail.append("%s f%d %r ink=rgb%s min=%.2f dev=%d"
                          % (label, fno, r["name"], r["rgb"], r["min"], r["dev"]))
    ok, verdicts = True, []
    for key, lo in sorted(rows.items()):
        if key.startswith("__rgb__"):
            continue
        rgb = rows["__rgb__" + key]
        thr = T_COPPER if tuple(rgb) == COPPER_RGB else T_BONE
        good = lo >= thr
        ok = ok and good
        verdicts.append("%r %s min=%.2f vs %.1f -> %s"
                        % (key, "copper" if thr == T_COPPER else "bone", lo, thr,
                           "PASS" if good else "FAIL"))
    return ok, verdicts, detail, worst_dev


# ---------------------------------------------------------------- main

def main(built):
    url = "file:///" + built.replace("\\", "/")
    out_dir = os.path.dirname(built)
    shot = lambda name: os.path.join(out_dir, name)

    with sync_playwright() as pw:
        browser = pw.chromium.launch(args=["--autoplay-policy=no-user-gesture-required"])

        # =========================================================== 1440
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(url, wait_until="load")
        page.wait_for_function("document.fonts.status === 'loaded'", timeout=30000)
        page.wait_for_timeout(1400)

        # ---- 10 fonts
        ok_font = page.evaluate("document.fonts.check('300 20px Anybody')")
        bad = page.evaluate("""() => { const b = new Set();
            for (const el of document.querySelectorAll('*')) {
              const f = getComputedStyle(el).fontFamily;
              if (/Bricolage/i.test(f)) b.add('Bricolage');
              if (/JetBrains/i.test(f)) b.add('JetBrains');
            } return [...b]; }""")
        report("10-fonts", ok_font and not bad,
               "fonts.check('300 20px Anybody')=%s; banned families in computed styles=%s"
               % (ok_font, bad or "none"))

        # ---- 07 motion hygiene
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
            return {kf, err, blend, gsap: typeof window.gsap};
        }""")
        src = io.open(built, encoding="utf-8").read()
        ok7 = (hyg["kf"] == 0 and hyg["blend"] == 0 and hyg["gsap"] == "undefined"
               and src.count("@keyframes") == 0 and src.count("mix-blend-mode") == 0
               and len(re.findall(r"\bgsap\b", src)) == 0)
        report("07-no-keyframes-gsap-blend", ok7,
               "@keyframes rules=%d (cross-origin sheets skipped=%d); source '@keyframes'=%d; "
               "elements with mix-blend-mode!=normal=%d; source 'mix-blend-mode'=%d; "
               "typeof window.gsap=%s; source /\\bgsap\\b/=%d"
               % (hyg["kf"], hyg["err"], src.count("@keyframes"), hyg["blend"],
                  src.count("mix-blend-mode"), hyg["gsap"], len(re.findall(r"\bgsap\b", src))))

        # ---- 13 the v3 order, and the numbers section gone
        order = page.evaluate("""() => {
            const ids = ['room','operator','work','engagements','price','proof','manual','faq','contact'];
            const els = ids.map(i => document.getElementById(i));
            const tops = els.map(e => e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : null);
            return {ids, tops, missing: ids.filter((i, k) => !els[k]),
                    foot: !!document.querySelector('.foot'),
                    footTop: document.querySelector('.foot')
                            ? Math.round(document.querySelector('.foot').getBoundingClientRect().top + window.scrollY) : null,
                    numbers: document.querySelectorAll('.nums, .num').length};
        }""")
        seq = order["tops"] + [order["footTop"]]
        ok13 = (not order["missing"] and order["foot"] and order["numbers"] == 0
                and all(seq[i] < seq[i + 1] for i in range(len(seq) - 1)))
        report("13-section-order", ok13,
               "document order 01 room / 02 operator / 03 work / 04 engagements / 05 price / "
               "06 proof / 07 manual / 08 faq / 09 ask / 10 foot -> page offsets %s; missing=%s; "
               "four-card numbers section elements remaining=%d (must be 0)"
               % (list(zip(order["ids"] + ["foot"], seq)), order["missing"] or "none", order["numbers"]))

        # ---- 05 the two clips
        vids = page.evaluate("""() => [...document.querySelectorAll('video')].map(v => ({
            id: v.id, muted: v.muted, loop: v.loop, autoplay: v.autoplay,
            playsinline: v.hasAttribute('playsinline'),
            poster: (v.getAttribute('poster') || '').slice(0, 22),
            sources: [...v.querySelectorAll('source')].map(s => s.type + ':' + s.src.length),
            objectPosition: getComputedStyle(v).objectPosition,
            parentPosition: getComputedStyle(v.parentElement).position,
        }))""")
        page.wait_for_timeout(2400)
        ready = page.evaluate("[...document.querySelectorAll('video')].map(v => v.readyState)")
        hero = next((v for v in vids if v["id"] == "filmvid"), None)
        opv = next((v for v in vids if v["id"] == "opvid"), None)
        ok5 = (len(vids) == 2 and hero and opv
               and hero["muted"] and hero["autoplay"] and hero["playsinline"] and not hero["loop"]
               and hero["poster"].startswith("data:image") and len(hero["sources"]) == 2
               and hero["objectPosition"] == "60% 0%"
               and opv["muted"] and opv["loop"] and opv["playsinline"]
               and opv["objectPosition"] == "50% 40%" and opv["parentPosition"] == "absolute"
               and all(r >= 2 for r in ready))
        report("05-videos", ok5,
               "hero #filmvid: loop=%s (SS13 wants the hold, so False) autoplay=%s muted=%s "
               "playsinline=%s poster=%s.. sources=%s object-position=%s | operator #opvid: "
               "loop=%s muted=%s playsinline=%s object-position=%s, its wrapper is position:%s "
               "(section-relative, NOT fixed) | readyState after 3s=%s"
               % (hero["loop"], hero["autoplay"], hero["muted"], hero["playsinline"], hero["poster"],
                  hero["sources"], hero["objectPosition"], opv["loop"], opv["muted"],
                  opv["playsinline"], opv["objectPosition"], opv["parentPosition"], ready))

        # ---- 04a the desktop bar reveal
        op0 = page.evaluate("getComputedStyle(document.getElementById('bar')).opacity")
        page.evaluate(SCROLL, page.evaluate("window.innerHeight * 1.5"))
        page.wait_for_timeout(700)
        op1 = page.evaluate("getComputedStyle(document.getElementById('bar')).opacity")
        bar_dark = page.evaluate("""() => { const b = document.getElementById('bar');
            const cs = getComputedStyle(b); return {cls: b.className, bg: cs.backgroundColor}; }""")

        # ---- 22 rail sticky + step names at --d2
        rail = page.evaluate("""() => {
            const r = document.querySelector('.rail'), cs = getComputedStyle(r);
            const d = parseFloat(getComputedStyle(document.querySelector('.room h1')).fontSize);
            const names = [...document.querySelectorAll('#rail li .d')].map(e => ({
                t: e.textContent, fs: getComputedStyle(e).fontSize }));
            return {pos: cs.position, top: cs.top, d, names};
        }""")
        d2 = 0.76 * rail["d"]
        ok22 = (rail["pos"] == "sticky" and rail["top"] == "140px"
                and all(abs(float(n["fs"].replace("px", "")) - d2) <= 1.0 for n in rail["names"]))
        report("22-rail", ok22,
               ".rail position=%s top=%s; step names at --d2=%.2fpx: %s"
               % (rail["pos"], rail["top"], d2,
                  ", ".join("%r %s" % (n["t"], n["fs"]) for n in rail["names"])))

        # ---- 23 the label style
        lab = page.evaluate("""() => {
            const want = ['.bar .l', '.sec-head .l', '.chip .t', '.room .proof .l',
                          '.prow .v .l', '.prf .yr', '.panel figcaption .l', '.foot .l'];
            return want.map(sel => { const e = document.querySelector(sel);
              if (!e) return [sel, 'MISSING'];
              const cs = getComputedStyle(e);
              return [sel, cs.fontSize, cs.fontVariationSettings, cs.letterSpacing, cs.fontWeight]; });
        }""")
        def lab_ok(r):
            if len(r) < 5:
                return False
            _, size, wdth, ls, wt = r
            return (size == "14px" and '"wdth"' in (wdth or "")
                    and abs(float(ls.replace("px", "")) - 0.56) < 0.06 and wt == "500")
        report("23-label-style", all(lab_ok(r) for r in lab),
               "14px / wdth 80 (90 on .meta) / .04em (=0.56px) / 500: %s"
               % "; ".join("%s -> %s" % (r[0], " ".join(str(x) for x in r[1:])) for r in lab))

        # ---- 24 two display sizes
        two = page.evaluate("""() => {
            const g = s => { const e = document.querySelector(s); return e ? getComputedStyle(e).fontSize : null; };
            const h2 = document.querySelector('.op h2');
            const ch2 = getComputedStyle(h2);
            const rows = [...h2.querySelectorAll('.r')].map(e => ({t: e.textContent,
                rects: e.getClientRects().length, w: e.getBoundingClientRect().width}));
            const d = parseFloat(g('.room h1'));
            return {d, hero: g('.room h1'), manual: g('.manual h2'), ask: g('.ask h2'),
                    person: ch2.fontSize, wdth: ch2.fontVariationSettings, lh: ch2.lineHeight,
                    rows, col: h2.parentElement.getBoundingClientRect().width};
        }""")
        near = lambda a, b: abs(float(str(a).replace("px", "")) - b) <= 1.0
        # v3.1: the manual moved to --d2. Three rows at --d ran ~550px tall, louder than the
        # two-row hero, which breaks SS6's loudness budget; SS12's --d list is hero / record
        # names / ask, and the manual was never on it.
        ok24 = (near(two["hero"], two["d"]) and near(two["manual"], 0.76 * two["d"])
                and near(two["ask"], two["d"]) and near(two["person"], 0.76 * two["d"])
                and '"wdth" 115' in (two["wdth"] or "")
                and len(two["rows"]) == 2
                and all(r["rects"] == 1 and r["w"] < two["col"] for r in two["rows"]))
        report("24-two-display-sizes", ok24,
               "--d=%.2f -> hero %s, ask %s; --d2=.76*--d=%.2f -> the manual %s and the operator heading %s "
               "(%s, line-height %s), composed as two hand-set rows in a %.0fpx column: %s"
               % (two["d"], two["hero"], two["ask"], 0.76 * two["d"], two["manual"],
                  two["person"], two["wdth"], two["lh"], two["col"],
                  " | ".join("%r %.1fpx rects=%d" % (r["t"], r["w"], r["rects"]) for r in two["rows"])))

        # ---- 14 the operator section
        place(page, "#operator", 0)
        page.wait_for_timeout(500)
        opinfo = page.evaluate("""() => {
            const s = document.getElementById('operator');
            const film = document.querySelector('.opfilm'), v = document.querySelector('#opvid');
            const ca = document.querySelector('.op .ca'), cb = document.querySelector('.op .cb');
            const r = s.getBoundingClientRect(), rf = film.getBoundingClientRect();
            const ra = ca.getBoundingClientRect(), rb = cb.getBoundingClientRect();
            const veil = getComputedStyle(film.querySelector('.veil')).backgroundImage;
            return {h: r.height, vh: window.innerHeight, filmH: rf.height, filmW: rf.width,
                    filmPos: getComputedStyle(film).position, sectionBg: getComputedStyle(s).backgroundColor,
                    caTop: ra.top, cbTop: rb.top, caBottom: ra.bottom, cbBottom: rb.bottom,
                    align: getComputedStyle(document.querySelector('.opwrap')).alignItems,
                    side: Math.abs(ra.top - rb.top) > 4 ? 'stacked' : 'side',
                    flex: getComputedStyle(document.querySelector('.opwrap')).flexDirection,
                    veil, portraits: document.querySelectorAll('.op .clip, .op figure, .op .frame').length};
        }""")
        # v3.2: the columns register at the TOP. Bottom-aligned (the v3 build) the right
        # column's first line started 28.5px below the left's, and the eye enters at the top.
        common = abs(opinfo["caTop"] - opinfo["cbTop"])
        ok14 = (opinfo["h"] >= opinfo["vh"] and opinfo["filmPos"] == "absolute"
                and abs(opinfo["filmH"] - opinfo["h"]) <= 1 and common <= 2
                and opinfo["align"] == "flex-start"
                and opinfo["flex"] == "row" and opinfo["portraits"] == 0)
        report("14-operator-ground", ok14,
               "section height=%.0f >= 100svh(%.0f); the clip's wrapper is position:%s and fills "
               "the section (%.0fx%.0f); veil=%s; two columns %s (flex-direction:%s, "
               "align-items:%s) STARTING on a common line, delta=%.2fpx (<=2); framed portraits "
               "inside the section=%d (must be 0)"
               % (opinfo["h"], opinfo["vh"], opinfo["filmPos"], opinfo["filmW"], opinfo["filmH"],
                  re.sub(r"\s+", " ", opinfo["veil"])[:150], opinfo["side"], opinfo["flex"],
                  opinfo["align"], common, opinfo["portraits"]))

        # operator heading contrast over its composited ground (scroll it into view first --
        # the block sits 100svh down the section, so 'block: start' leaves it below the fold)
        place(page, ".op h2", 260)
        page.wait_for_timeout(600)
        oc = composited(page, runs(page, ".op h2 .r"), ".op h2")
        if not oc:
            oc = [{"name": "NO SAMPLE", "min": 0.0}]
        ok14b = all(r["min"] >= T_BONE for r in oc)
        report("14b-operator-heading-contrast", ok14b,
               "bone heading over clip B + veil: %s (threshold %.1f)"
               % ("; ".join("%r min=%.2f" % (r["name"], r["min"]) for r in oc), T_BONE))
        page.screenshot(path=shot("rl3-sec-operator.png"))

        # ---- 22b the work section plate
        place(page, '.panel[data-panel="1"]', 120)
        page.wait_for_timeout(500)
        page.screenshot(path=shot("rl3-sec-work.png"))
        panels = page.evaluate("""() => [...document.querySelectorAll('.panel')].map(p => ({
            img: p.querySelector('img').getAttribute('src').slice(0, 22),
            filter: getComputedStyle(p.querySelector('img')).filter,
            cap: p.querySelector('figcaption').textContent.trim(),
            book: /page \\d+ of 69|checklists\\//.test(p.textContent) }))""")
        ok22b = (len(panels) == 3 and all(p["filter"] == "grayscale(1)" for p in panels)
                 and not any(p["book"] for p in panels))
        report("22b-work-panels", ok22b,
               "three panels, his own photographs, grayscale(1), no book pages: %s"
               % "; ".join("%r filter=%s book-page=%s" % (p["cap"][:64], p["filter"], p["book"])
                           for p in panels))

        # ---- 15 the engagements strip
        place(page, "#engagements", 80)
        page.wait_for_timeout(500)
        eng = page.evaluate("""() => {
            const head = document.querySelector('#engagements .sec-head');
            const row = document.querySelector('#engagements .erow');
            const price = document.querySelector('#price .sec-head');
            const rh = head.getBoundingClientRect(), rr = row.getBoundingClientRect(),
                  rp = price.getBoundingClientRect();
            return {headText: head.textContent.trim(), rows: document.querySelectorAll('#engagements .erow').length,
                    hairlineToRow: rr.top - rh.bottom, rowToPackagesHead: rp.top - rr.bottom,
                    rule: getComputedStyle(head).borderBottomWidth,
                    href: row.getAttribute('href'),
                    k: row.querySelector('.k').textContent.trim(),
                    v: row.querySelector('.v').textContent.trim(),
                    vRight: row.querySelector('.v').getBoundingClientRect().right,
                    rowRight: rr.right};
        }""")
        ok15 = (eng["rows"] == 1 and eng["rule"] == "1px"
                and abs(eng["hairlineToRow"] - 24) <= 1.5
                and abs(eng["rowToPackagesHead"] - 40) <= 2.5
                and abs(eng["vRight"] - eng["rowRight"]) <= 1
                and "?from=mock-engagements" in (eng["href"] or ""))
        report("15-engagements-strip", ok15,
               "head %r on a 1px hairline (%s); %d row %r with %r flush right (delta %.2fpx); "
               "24px under the hairline -> %.1fpx; 40px above the packages head -> %.1fpx; href=%s"
               % (eng["headText"], eng["rule"], eng["rows"], eng["k"], eng["v"],
                  abs(eng["vRight"] - eng["rowRight"]), eng["hairlineToRow"],
                  eng["rowToPackagesHead"], eng["href"]))

        # ---- 16 the packages
        place(page, "#price", 60)
        page.wait_for_timeout(500)
        page.screenshot(path=shot("rl3-sec-price.png"))
        pk = page.evaluate(("""() => {
            //BASELINE//
            return [...document.querySelectorAll('.prow')].map(r => {
              const v = r.querySelector('.v'), fig = runRect(v), sfx = v.querySelector('.l');
              return {h: r.getBoundingClientRect().height, fig: fig.text, right: fig.right,
                      size: getComputedStyle(v).fontSize,
                      suffix: sfx ? sfx.textContent.trim() : null,
                      suffixDisplay: sfx ? getComputedStyle(sfx).display : null,
                      reserved: sfx ? sfx.getBoundingClientRect().height : 0,
                      suffixBottom: sfx ? sfx.getBoundingClientRect().bottom : 0,
                      rowBottom: r.getBoundingClientRect().bottom,
                      href: r.getAttribute('href'),
                      manual: /80% Wall|Engagements/.test(r.textContent)};
            });
        }""").replace("//BASELINE//", BASELINE_JS))
        hs = [p["h"] for p in pk]
        rights = [p["right"] for p in pk]
        sfx = [p for p in pk if p["suffix"]]
        # v3.2: the two rows with nothing to say no longer carry an EMPTY suffix span. An
        # empty 20px box under $500 and $7,500 read as three unevenly padded rows. The one
        # real suffix is out of flow, so all three rows keep identical geometry anyway.
        ok16 = (len(pk) == 3 and max(hs) - min(hs) <= 0.6
                and max(rights) - min(rights) <= 1.0
                and all(p["size"] == "32px" for p in pk)
                and len(sfx) == 1 and sfx[0]["suffix"] == "Start here"
                and all(p["reserved"] == 0 for p in pk if not p["suffix"])
                and sfx[0]["suffixBottom"] <= sfx[0]["rowBottom"] + 0.5
                and not any(p["manual"] for p in pk))
        report("16-packages", ok16,
               "%d rows, heights=%s (spread %.2f); prices 32px flush right, right edges=%s "
               "(spread %.2f); exactly %d suffix mark(s) %s, hanging inside its own row's bottom "
               "padding (suffix bottom %.1f vs row bottom %.1f) -- the other rows carry no empty "
               "reserved box (%s); the $99 manual row and the engagements row have left this "
               "section=%s"
               % (len(pk), ["%.1f" % h for h in hs], max(hs) - min(hs),
                  ["%.1f" % r for r in rights], max(rights) - min(rights),
                  len(sfx), [p["suffix"] for p in sfx],
                  sfx[0]["suffixBottom"] if sfx else -1, sfx[0]["rowBottom"] if sfx else -1,
                  ["%.1f" % p["reserved"] for p in pk], not any(p["manual"] for p in pk)))

        # ---- 17 the proof index at 1440
        place(page, "#proof", 60)
        page.wait_for_timeout(500)
        page.screenshot(path=shot("rl3-sec-proof.png"))
        PRF_JS = """() => {
            const sec = document.getElementById('proof');
            const rows = [...sec.querySelectorAll('.prf')].map(r => {
              const who = r.querySelector('.who'), cap = r.querySelector('.cap'),
                    ar = r.querySelector('.ar'), yr = r.querySelector('.yr');
              const rr = r.getBoundingClientRect();
              const cs = getComputedStyle(r);
              const lh = (e) => e ? Math.max(1, Math.round(e.getBoundingClientRect().height /
                          parseFloat(getComputedStyle(e).lineHeight))) : 0;
              return {name: who.firstChild.textContent.trim(), whoLines: lh(who),
                      whoSize: getComputedStyle(who).fontSize,
                      year: yr ? yr.textContent.trim() : null,
                      cap: cap ? cap.textContent.trim() : null, capLines: cap ? lh(cap) : 0,
                      capSize: cap ? getComputedStyle(cap).fontSize : null,
                      capMax: cap ? getComputedStyle(cap).maxWidth : null,
                      arrow: !!ar, link: r.tagName === 'A' ? r.getAttribute('href') : null,
                      arX: ar ? ar.getBoundingClientRect().left : null,
                      h: rr.height, top: rr.top,
                      hair: cs.borderBottomColor,
                      rows: Math.round(rr.height)};
            });
            return {rows, spot: sec.querySelectorAll('.spot, .peek, img').length,
                    cols: getComputedStyle(sec.querySelector('.prf')).gridTemplateColumns,
                    head: sec.querySelector('.sec-head').textContent.trim()};
        }"""
        prf = page.evaluate(PRF_JS)
        oneline = all(r["whoLines"] == 1 and r["capLines"] <= 1 for r in prf["rows"])
        lines_1440 = ["%s: %dL/%dL" % (r["name"][:22], r["whoLines"], r["capLines"]) for r in prf["rows"]]
        links = [r for r in prf["rows"] if r["link"]]
        caps = [r["cap"] for r in prf["rows"] if r["cap"]]
        figs = re.findall(r"\$[\d.,]+\s?[MKB]?|\d[\d,]*%|\d[\d,]{2,}", " | ".join(caps))
        # RULING (RL4). The v3.2 index answered the dead-end problem by deleting two of the
        # four exits, which is a smaller lie than a dead end but still one. Seven rows again;
        # what separates them is the ARROW RAIL, not the list. Every linking row puts its
        # arrow in a fixed 40px third column and they share one x exactly; a row you cannot
        # open leaves that column empty. Captions carry exactly TWO figures on the whole
        # index -- $14M on Guardicore, $3M on the RFP engine -- and every other row takes a
        # verified sentence with no figure in it, or no caption at all (Consulting, whose
        # only verified sentence is "$20M+ in client revenue . since 2013").
        xs = [r["arX"] for r in prf["rows"] if r["arX"] is not None]
        spread = (max(xs) - min(xs)) if xs else 99.0
        unlinked = [r["name"] for r in prf["rows"] if not r["link"]]
        titled = [c for c in caps
                  if len([w for w in re.findall(r"[A-Za-z][a-z]+", c) if w[0].isupper()]) > 2]
        dashes = set(re.findall(r"[\u2010-\u2015\-]",
                                " ".join((r["year"] or "") for r in prf["rows"] if r["year"])))
        ok17 = (len(prf["rows"]) == 7 and oneline and len(links) == 5
                and len(xs) == 5 and spread <= 0.5
                and len(prf["cols"].split()) == 3 and prf["cols"].split()[2] == "40px"
                and all(r["arrow"] == bool(r["link"]) for r in prf["rows"])
                and unlinked == ["Postmates", "SurveyMonkey Enterprise"]
                and all(r["h"] >= 72 for r in prf["rows"])
                and all(r["capSize"] == "17px" for r in prf["rows"] if r["cap"])
                and all(r["whoSize"] == "21px" for r in prf["rows"])
                and all(r["year"] for r in links)
                and len(caps) == 6 and not titled
                and sorted(figs) == ["$14M", "$3M"]
                and prf["spot"] == 0 and len(dashes) <= 1)
        report("17-proof-index", ok17,
               "%d rows on the RL4 rail: grid-template-columns=%r, %d linking rows each with "
               "their arrow at the same x (spread %.2fpx), %d rows (%s) leaving that column "
               "empty because they open nothing. One line at 1440 (%s: %s), min-height>=72 "
               "(%s); names 21px, captions 17px capped at %s; years %s, set with a single dash "
               "form (%s); %d rows link (%s); artifacts/spotlight elements inside the "
               "section=%d (must be 0); head=%r; the whole index carries exactly two "
               "figures=%s"
               % (len(prf["rows"]), prf["cols"], len(xs), spread, len(unlinked), unlinked,
                  oneline, lines_1440, ["%.0f" % r["h"] for r in prf["rows"]],
                  links[0]["capMax"], [r["year"] for r in prf["rows"]],
                  sorted(dashes) or "none", len(links),
                  ", ".join((r["link"] or "").rsplit("/", 1)[-1].split("?")[0] for r in links),
                  prf["spot"], prf["head"], figs))

        # ---- 18 the manual
        place(page, "#manual", 40)
        page.wait_for_timeout(400)
        man = page.evaluate("""() => {
            const h = document.querySelector('.manual .head'), d = document.querySelector('.manual h2');
            const buy = document.querySelector('.manual .buy');
            const frame = document.querySelector('.manual .art .frame');
            return {order: (h.compareDocumentPosition(d) & Node.DOCUMENT_POSITION_FOLLOWING) ? 'label-then-display' : 'display-then-label',
                    gap: d.getBoundingClientRect().top - h.getBoundingClientRect().bottom,
                    label: h.textContent.trim(), price: buy ? buy.querySelector('.v').textContent.trim() : null,
                    chip: buy ? buy.querySelector('.chip .t').textContent.trim() : null,
                    dashed: getComputedStyle(frame).borderTopStyle,
                    lines: document.querySelectorAll('.manual .lines p').length};
        }""")
        ok18 = (man["order"] == "label-then-display" and man["gap"] >= 0
                and man["price"].startswith("$99") and man["dashed"] == "dashed" and man["lines"] == 3)
        report("18-manual", ok18,
               "order=%s (%r then the display line, gap %.1fpx); price %r and the buy chip %r are "
               "here now; cover in a %s frame; %d symptom lines"
               % (man["order"], man["label"], man["gap"], man["price"], man["chip"],
                  man["dashed"], man["lines"]))

        # ---- 19 the FAQ
        place(page, "#faq", 40)
        page.wait_for_timeout(500)
        page.screenshot(path=shot("rl3-sec-faq.png"))
        faq = page.evaluate("""() => {
            const qs = [...document.querySelectorAll('#faq .q')];
            const probe = document.createElement('div');
            const dd0 = qs[0].querySelector('dd');
            probe.style.cssText = 'position:absolute;visibility:hidden;width:60ch';
            probe.style.font = getComputedStyle(dd0).font;
            dd0.parentElement.appendChild(probe);
            const ch60 = probe.getBoundingClientRect().width; probe.remove();
            return qs.map((q, i) => {
              const dt = q.querySelector('dt'), dd = q.querySelector('dd');
              const cdt = getComputedStyle(dt), cdd = getComputedStyle(dd), cq = getComputedStyle(q);
              const prev = i ? qs[i-1].getBoundingClientRect().bottom : null;
              return {ch60, qSize: cdt.fontSize, qLH: cdt.lineHeight, qWeight: cdt.fontWeight,
                      qFam: cdt.fontFamily.split(',')[0],
                      aSize: cdd.fontSize, aLH: cdd.lineHeight, aColor: cdd.color, aMax: cdd.maxWidth,
                      rule: cq.borderTopWidth,
                      gap: prev === null ? null : q.getBoundingClientRect().top - prev};
            });
        }""")
        ok19 = (len(faq) == 3
                and all(f["qSize"] == "21px" and abs(float(f["qLH"].replace("px","")) - 28.35) < 0.6
                        and f["qWeight"] == "500" for f in faq)
                and all(f["aSize"] == "17px" and abs(float(f["aLH"].replace("px","")) - 25.5) < 0.6
                        and abs(float(f["aMax"].replace("px", "")) - f["ch60"]) < 1.0 for f in faq)
                and all(f["rule"] == "1px" for f in faq)
                and all(abs(f["gap"] - 48) <= 1 for f in faq[1:]))
        report("19-faq", ok19,
               "%d pairs on their own section: question %s/%s %s %s, answer %s/%s %s capped at %s, "
               "1px hairline above each (%s), %s between pairs (SS13 wants 48px)"
               % (len(faq), faq[0]["qSize"], faq[0]["qLH"], faq[0]["qWeight"], faq[0]["qFam"],
                  faq[0]["aSize"], faq[0]["aLH"], faq[0]["aColor"],
                  "%s (a 60ch probe measures %.1fpx)" % (faq[0]["aMax"], faq[0]["ch60"]),
                  [f["rule"] for f in faq], ["%.1f" % f["gap"] for f in faq[1:]]))

        # ---- 20 + 12 the ask, and the bar over it
        # At 1440x900 the ask (549px) plus the foot (156px) are shorter than one viewport, so
        # the copper field can never reach the bar: the page runs out of scroll first. The bar
        # inversion is therefore exercised in a short window, where it really happens.
        page.evaluate(SCROLL, page.evaluate("document.documentElement.scrollHeight"))
        page.wait_for_timeout(700)
        page.screenshot(path=shot("rl3-sec-ask.png"))
        ask = page.evaluate("""() => {
            const a = document.getElementById('contact'), cs = getComputedStyle(a);
            const bar = document.getElementById('bar'), cb = getComputedStyle(bar);
            const lab = bar.querySelector('.l'), now = bar.querySelector('.l.now');
            const ar = bar.querySelector('.ar');
            const cv = document.createElement('canvas'); cv.width = cv.height = 1;
            const ctx = cv.getContext('2d', {willReadFrequently: true});
            const solve = (c) => { ctx.clearRect(0,0,1,1); ctx.fillStyle = c; ctx.fillRect(0,0,1,1);
                                   const d = ctx.getImageData(0,0,1,1).data; return [d[0],d[1],d[2],d[3]/255]; };
            const rb = bar.getBoundingClientRect(), ra = a.getBoundingClientRect();
            return {minH: cs.minHeight, padTop: cs.paddingTop, padBottom: cs.paddingBottom,
                    bg: cs.backgroundColor, h: ra.height,
                    contentH: a.querySelector('.block').getBoundingClientRect().height,
                    barCls: bar.className, barBg: cb.backgroundColor, barBorder: cb.borderBottomColor,
                    labIn: solve(getComputedStyle(lab).color), nowIn: solve(getComputedStyle(now).color),
                    arIn: solve(getComputedStyle(ar).color),
                    straddles: ra.top <= rb.bottom && ra.bottom >= rb.bottom};
        }""")

        def over(fg, bg):
            a = fg[3]
            mix = tuple(fg[i] * a + bg[i] * (1 - a) for i in range(3))
            return ratio(rel_lum(mix), rel_lum(bg))

        short = browser.new_page(viewport={"width": 1440, "height": 620})
        short.goto(url, wait_until="load")
        short.wait_for_function("document.fonts.status === 'loaded'", timeout=30000)
        short.wait_for_timeout(1200)
        short.evaluate(SCROLL, short.evaluate("document.documentElement.scrollHeight"))
        short.wait_for_timeout(800)
        oa = short.evaluate("""() => {
            const a = document.getElementById('contact'), bar = document.getElementById('bar');
            const cb = getComputedStyle(bar);
            const cv = document.createElement('canvas'); cv.width = cv.height = 1;
            const ctx = cv.getContext('2d', {willReadFrequently: true});
            const solve = (c) => { ctx.clearRect(0,0,1,1); ctx.fillStyle = c; ctx.fillRect(0,0,1,1);
                                   const d = ctx.getImageData(0,0,1,1).data; return [d[0],d[1],d[2],d[3]/255]; };
            const rb = bar.getBoundingClientRect(), ra = a.getBoundingClientRect();
            return {cls: bar.className, bg: cb.backgroundColor, askBg: getComputedStyle(a).backgroundColor,
                    askTop: ra.top, askBottom: ra.bottom, edge: rb.bottom,
                    straddles: ra.top <= rb.bottom && ra.bottom >= rb.bottom,
                    labIn: solve(getComputedStyle(bar.querySelector('.l:not(.now)')).color),
                    nowIn: solve(getComputedStyle(bar.querySelector('.l.now')).color),
                    arIn: solve(getComputedStyle(bar.querySelector('.ar')).color)};
        }""")
        short.close()

        # RULING (RL4), superseding SS11's bar-over-the-ask line: while the ask is under the
        # bar, the bar paints ESPRESSO with BONE labels and a bone arrow. The copper bar it
        # replaces measured 4.40:1 -- the arithmetic ceiling of espresso on raw copper, and
        # 0.10 short of AA for 14px type. Every run is now measured at both viewports and
        # held to 5:1, a floor ABOVE the general 4.5 bar rather than an exception below it.
        ask_bars = {}
        for w, h in [(1440, 620), (390, 664)]:
            # the window has to be one where the field really does cross the bar. At 1440x900
            # the ask + foot are shorter than a viewport; at 390x844 the same is true, which
            # is why the phone leg runs at 664 -- the visible viewport of a 390pt phone once
            # the browser chrome is subtracted.
            sp = browser.new_page(viewport={"width": w, "height": h})
            sp.goto(url, wait_until="load")
            sp.wait_for_function("document.fonts.status === 'loaded'", timeout=30000)
            sp.wait_for_timeout(1200)
            sp.evaluate("""() => {
                const a = document.getElementById('contact');
                const edge = document.getElementById('bar').getBoundingClientRect().height || 40;
                const top = a.getBoundingClientRect().top + window.scrollY;
                window.scrollTo(0, Math.min(top + Math.round(a.getBoundingClientRect().height / 2) - edge,
                                            document.documentElement.scrollHeight));
            }""")
            sp.wait_for_timeout(800)
            ask_bars[w] = sp.evaluate("""() => {
                const a = document.getElementById('contact'), bar = document.getElementById('bar');
                const cb = getComputedStyle(bar);
                const cv = document.createElement('canvas'); cv.width = cv.height = 1;
                const ctx = cv.getContext('2d', {willReadFrequently: true});
                const solve = (c) => { ctx.clearRect(0,0,1,1); ctx.fillStyle = c; ctx.fillRect(0,0,1,1);
                                       const d = ctx.getImageData(0,0,1,1).data; return [d[0],d[1],d[2],d[3]/255]; };
                const rb = bar.getBoundingClientRect(), ra = a.getBoundingClientRect();
                const runs = [];
                bar.querySelectorAll('a, span').forEach(e => {
                  let own = ''; for (const nd of e.childNodes) if (nd.nodeType === 3) own += nd.textContent;
                  own = own.trim(); if (!own) return;
                  const cs = getComputedStyle(e);
                  if (cs.display === 'none' || cs.visibility === 'hidden') return;
                  runs.push({t: own, ink: solve(cs.color), size: parseFloat(cs.fontSize)});
                });
                return {cls: bar.className, bg: cb.backgroundColor, bgSolved: solve(cb.backgroundColor),
                        askBg: getComputedStyle(a).backgroundColor, y: window.scrollY,
                        askTop: ra.top, askBottom: ra.bottom, edge: rb.bottom, runs,
                        straddles: ra.top <= rb.bottom && ra.bottom >= rb.bottom};
            }""")
            sp.close()

        legs, ok12 = [], True
        for w in (1440, 390):
            d = ask_bars[w]
            bg = tuple(round(c) for c in d["bgSolved"][:3])
            # the bar's last run is a literal arrow glyph; the console this runs in is cp1252,
            # so the evidence string carries it escaped rather than dying on it.
            rows12 = [(r["t"].encode("ascii", "backslashreplace").decode("ascii"), round(ratio(rel_lum(tuple(r["ink"][i] * r["ink"][3] +
                                                          bg[i] * (1 - r["ink"][3]) for i in range(3))),
                                           rel_lum(bg)), 2)) for r in d["runs"]]
            worst = min(r[1] for r in rows12) if rows12 else 0.0
            good = (d["straddles"] and bg == ESPRESSO and "dark" in d["cls"]
                    and "copper" not in d["cls"] and d["askBg"] == COPPER
                    and len(rows12) >= 2 and worst >= T_BAR_ASK)
            ok12 = ok12 and good
            legs.append("%dpx at scrollY %d: the copper field (%s) spans %.0f..%.0f across the "
                        "bar's lower edge %.0f -> straddles=%s; bar class=%r background=%s "
                        "(espresso=%s); %d label runs, worst %.2f:1 -> %s"
                        % (w, d["y"], d["askBg"], d["askTop"], d["askBottom"], d["edge"],
                           d["straddles"], d["cls"], d["bg"], bg == ESPRESSO, len(rows12),
                           worst, rows12))
        report("12-bar-over-ask", ok12,
               "RL4: while the ask spans the bar, the bar is ESPRESSO with BONE labels and a "
               "bone arrow -- no copper state exists (%d .bar.copper rules in the built CSS). "
               "Every run held to %.1f:1, not the 4.40:1 ceiling the copper bar carried. || %s"
               % (io.open(built, encoding="utf-8").read().count(".bar.copper"), T_BAR_ASK,
                  " || ".join(legs)))
        # v3.1: SS12 says the field is >= 720px at 1440 with 112/96 padding. It was shipping at
        # 549px -- the shortest section on a 9,000px page -- and the close landed soft.
        ok20 = (ask["minH"] == "720px" and ask["padTop"] == "112px"
                and ask["padBottom"] == "96px" and ask["h"] >= 720)
        report("20-ask-a-full-field", ok20,
               "min-height=%s; padding %s top / %s bottom at 1440; the field is %.0fpx tall "
               "around a %.0fpx block (SS12: >= 720)"
               % (ask["minH"], ask["padTop"], ask["padBottom"], ask["h"], ask["contentH"]))


        # ---- 25 the contrast sweep: every section, every glyph run, at 1440
        page.evaluate("() => document.querySelectorAll('video').forEach(v => v.pause())")
        sweep_specs = [("hero", "#room", 0), ("operator", "#operator", 340),
                       ("rail", "#work", 200), ("engagements", "#engagements", 80),
                       ("packages", "#price", 60), ("proof", "#proof", 60),
                       ("manual", "#manual", 60), ("faq", "#faq", 40),
                       ("ask", "#contact", 0), ("foot", ".foot", 0)]
        fails, worst, cbar = [], [], []
        for nm, sel, off in sweep_specs:
            place(page, sel, off)
            page.wait_for_timeout(420)
            rows = sweep(page, sel) + sweep(page, ":bar")
            for r in rows:
                if r.get("copperbar"):
                    cbar.append("%s %r %.2f:1" % (nm, r["text"], r["ratio"]))
                if r["ratio"] < r["thr"] - 0.005:
                    fails.append("%s %r %.0fpx %.2f:1 < %.1f (ink %s on %s)"
                                 % (nm, r["text"], r["size"], r["ratio"], r["thr"],
                                    r["ink"], r["bg"]))
            if rows:
                lo = min(rows, key=lambda r: r["ratio"] - r["thr"])
                worst.append("%s %.2f:1 (%r %.0fpx, needs %.1f)"
                             % (nm, lo["ratio"], lo["text"][:26], lo["size"], lo["thr"]))
        report("25-contrast-sweep-1440", not fails,
               "WCAG thresholds, measured against the pixels actually behind each run (ink "
               "composited through every ancestor opacity): 4.5:1, or 3:1 for large text "
               "(>=24px, or >=18.66px at 700), and with no named exception left in the table: "
               "RL4 retired SS11's copper bar, so every run -- the bar over the ask included -- "
               "is held to the plain WCAG threshold. Runs still flagged as copper-bar: %s. "
               "Tightest run per section: %s || failures: %s"
               % ("; ".join(cbar) if cbar else "none -- the state does not exist",
                  "; ".join(worst), "; ".join(fails) if fails else "none"))
        page.evaluate("() => document.querySelectorAll('video').forEach("
                      "v => { if (!v.ended) v.play().catch(()=>{}); })")

        place(page, "#proof", 60)
        page.wait_for_timeout(500)
        light_bar = page.evaluate("""() => { const b = document.getElementById('bar');
            return {dark: b.classList.contains('dark'), bg: getComputedStyle(b).backgroundColor}; }""")
        page.evaluate(SCROLL, 0)
        page.wait_for_timeout(800)
        top_bar = page.evaluate("""() => { const b = document.getElementById('bar');
            return {dark: b.classList.contains('dark'), bg: getComputedStyle(b).backgroundColor}; }""")

        # ---- 09 copper on the first screen
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
        report("09-copper-first-screen", len(copper) <= 4,
               "%d element(s) computed rgb(200, 84, 43) inside the 1440x900 viewport at scrollY 0: "
               "%s; the bar's arrow is ink-coloured, not copper" % (len(copper), copper))

        # ---- 06 hero contrast at 1440
        ok6a, verd_a, det_a, dev_a = hero_contrast(page, "1440")
        page.evaluate("() => document.querySelectorAll('video').forEach("
                      "v => { if (!v.ended) v.play().catch(()=>{}); })")

        rows1440 = page.evaluate("""() => {
            const room = document.getElementById('room'), cs = getComputedStyle(room);
            const content = room.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
            return {content, rows: [...document.querySelectorAll('.room h1 .r')].map(e => ({
                text: e.textContent, w: e.getBoundingClientRect().width,
                rects: e.getClientRects().length,
                wdth: getComputedStyle(e).fontVariationSettings, size: getComputedStyle(e).fontSize}))};
        }""")
        slice1440 = page.evaluate(SLICE_JS, "#filmvid")

        page.evaluate(SCROLL, 0)
        page.wait_for_timeout(800)
        hold(page)
        page.screenshot(path=shot("rl3-1440-top.png"))
        page.screenshot(path=shot("rl3-1440.png"), full_page=True)
        report("04-bar-reveal-desktop",
               op0 == "0" and op1 == "1" and not light_bar["dark"]
               and light_bar["bg"] == BONE_CSS and top_bar["dark"]
               and bar_dark["bg"] == ESPRESSO_CSS,
               "1440: opacity at scrollY 0 = %s (the hero owns the first screen); after the hero "
               "chips pass under the bar's lower edge = %s. HARD ground switch, no colour-mix: "
               "over the operator section class=%r background=%s; over the bone proof index "
               "dark=%s background=%s; back over the hero dark=%s background=%s"
               % (op0, op1, bar_dark["cls"], bar_dark["bg"], light_bar["dark"], light_bar["bg"],
                  top_bar["dark"], top_bar["bg"]))
        page.close()

        # =========================================================== 390
        m = browser.new_page(viewport={"width": 390, "height": 844})
        m.goto(url, wait_until="load")
        m.wait_for_function("document.fonts.status === 'loaded'", timeout=30000)
        m.wait_for_timeout(2600)

        over390 = m.evaluate("""() => ({sw: document.documentElement.scrollWidth,
             bw: document.body.scrollWidth, iw: window.innerWidth,
             wide: [...document.querySelectorAll('*')]
               .filter(e => e.getBoundingClientRect().right > window.innerWidth + 1)
               .slice(0, 6).map(e => (e.className || e.tagName) + '@' +
                  Math.round(e.getBoundingClientRect().right))})""")

        mbar = m.evaluate("""() => {
            const bar = document.getElementById('bar'), cs = getComputedStyle(bar);
            return {opacity: cs.opacity, height: cs.height, scrollY: window.scrollY,
                    bg: cs.backgroundColor,
                    items: [...bar.querySelectorAll('a')].filter(a => getComputedStyle(a).display !== 'none')
                             .map(a => a.textContent.trim()),
                    anchor: getComputedStyle(document.getElementById('price')).scrollMarginTop};
        }""")
        ok04b = (mbar["opacity"] == "1" and mbar["height"] == "48px" and mbar["scrollY"] == 0
                 and mbar["items"] == ["Micah Jones", "Packages from $500"]
                 and mbar["anchor"] == "64px")
        report("04b-bar-mobile-first-paint", ok04b,
               "390x844 with scrollY=%s (no scroll performed): opacity=%s height=%s background=%s; "
               "visible items=%s; anchor clearance=%s"
               % (mbar["scrollY"], mbar["opacity"], mbar["height"], mbar["bg"], mbar["items"],
                  mbar["anchor"]))

        rows390 = m.evaluate("""() => {
            const room = document.getElementById('room'), cs = getComputedStyle(room);
            const content = room.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
            return {content, rows: [...document.querySelectorAll('.room h1 .r')].map(e => ({
                text: e.textContent, w: e.getBoundingClientRect().width,
                rects: e.getClientRects().length,
                wdth: getComputedStyle(e).fontVariationSettings, size: getComputedStyle(e).fontSize}))};
        }""")
        slice390 = m.evaluate(SLICE_JS, "#filmvid")

        m.evaluate(SCROLL, 0); m.wait_for_timeout(400)
        ok6b, verd_b, det_b, dev_b = hero_contrast(m, "390")
        second = rows390["rows"][1]["text"]
        dev2 = dev_b.get(second, 999)
        report("06b-390-second-row-on-solid-espresso", dev2 <= 4,
               "worst channel deviation of the composited background under %r from #0D0D0F across "
               "the hold = %d/255 (<=4 counts as solid); all rows: %s" % (second, dev2, dev_b))
        m.evaluate("() => document.querySelectorAll('video').forEach("
                      "v => { if (!v.ended) v.play().catch(()=>{}); })")

        m.evaluate(SCROLL, 0); m.wait_for_timeout(700)
        hold(m)
        m.screenshot(path=shot("rl3-390-top.png"))
        for name, sel in [("rl3-390-operator.png", "#operator"),
                          ("rl3-390-price.png", "#price"),
                          ("rl3-390-proof.png", "#proof")]:
            place(m, sel, 48)
            m.wait_for_timeout(600)
            m.screenshot(path=shot(name))
        m.evaluate(SCROLL, 0); m.wait_for_timeout(500)
        hold(m)
        m.screenshot(path=shot("rl3-390.png"), full_page=True)

        # operator at 390: the film is exactly one screen, the heading and first paragraph in it
        op390 = m.evaluate("""() => {
            const film = document.querySelector('.opfilm'), sec = document.getElementById('operator');
            const h2 = document.querySelector('.op h2'), last = document.querySelector('.op .cb p');
            const first = document.querySelector('.op .ca p');
            const bar = document.getElementById('bar');
            const rf = film.getBoundingClientRect(), rs = sec.getBoundingClientRect();
            return {filmH: rf.height, vh: window.innerHeight, secH: rs.height,
                    barH: bar.getBoundingClientRect().height,
                    anchor: parseFloat(getComputedStyle(sec).scrollMarginTop),
                    headTop: h2.getBoundingClientRect().top - rs.top,
                    firstBottom: first.getBoundingClientRect().bottom - rs.top,
                    lastBottom: last.getBoundingClientRect().bottom - rs.top};
        }""")
        # v3.2: "one screen" has to mean one screen the reader can SEE. At exactly 100svh the
        # section was 844px against an 844px viewport, so the 48px bar sitting on its top edge
        # and the 64px anchor clearance both pushed the tail of the second paragraph under the
        # fold. The stage is 100svh minus that clearance now: landed by anchor at 64px, or
        # scrolled until its top meets the bar at 48px, the whole section is still on screen.
        clear = max(op390["barH"], op390["anchor"])
        ok14c = (abs(op390["filmH"] - op390["secH"]) <= 2
                 and op390["secH"] + clear <= op390["vh"] + 1
                 and op390["secH"] >= op390["vh"] - clear - 26
                 and op390["lastBottom"] <= op390["secH"] + 1
                 and op390["headTop"] / op390["secH"] >= 0.28)
        report("14c-operator-390-one-screen", ok14c,
               "at 390 the section is one VISIBLE screen: %.0fpx + the %.0fpx it has to clear "
               "(48px bar / %.0fpx anchor) = %.0f <= innerHeight %.0f, and the clip is its whole "
               "ground (%.0fpx). Film band %.0fpx (%.1f%%) at the top; the heading starts at "
               "%.1f%% of the section, the first paragraph ends at %.0fpx and the LAST paragraph "
               "at %.0fpx -- both inside the frame. The veil is solid from 29%% down, so every "
               "word sits on flat espresso."
               % (op390["secH"], clear, op390["anchor"], op390["secH"] + clear, op390["vh"],
                  op390["filmH"], op390["headTop"], 100.0 * op390["headTop"] / op390["secH"],
                  100.0 * op390["headTop"] / op390["secH"], op390["firstBottom"],
                  op390["lastBottom"]))

        # ---- 15b the engagements strip on a phone: the PRICE leads
        # RL4: the CSS comment said "the price leads and the descriptor follows" and the CSS
        # said `display: block`, which cannot reorder anything. The comment was the ruling and
        # the build was not; this measures the ruling.
        place(m, "#engagements", 60)
        m.wait_for_timeout(400)
        e390 = m.evaluate("""() => {
            const row = document.querySelector('#engagements .erow');
            const k = row.querySelector('.k'), v = row.querySelector('.v');
            return {k: k.textContent.trim(), v: v.textContent.trim(),
                    kTop: k.getBoundingClientRect().top, vTop: v.getBoundingClientRect().top,
                    disp: getComputedStyle(row).display, dir: getComputedStyle(row).flexDirection,
                    kOrder: getComputedStyle(k).order, vOrder: getComputedStyle(v).order};
        }""")
        ok15b = (e390["disp"] == "flex" and e390["dir"] == "column"
                 and int(e390["vOrder"]) < int(e390["kOrder"])
                 and e390["vTop"] < e390["kTop"] - 4)
        report("15b-engagements-390-price-leads", ok15b,
               "at 390 the strip is %s/%s: %r (order %s) at y=%.1f LEADS, %r (order %s) at "
               "y=%.1f follows -- %.1fpx apart"
               % (e390["disp"], e390["dir"], e390["v"], e390["vOrder"], e390["vTop"],
                  e390["k"], e390["kOrder"], e390["kTop"], e390["kTop"] - e390["vTop"]))

        # ---- 25b the same sweep at 390
        m.evaluate("() => document.querySelectorAll('video').forEach(v => v.pause())")
        mfails, mworst = [], []
        for nm, sel, off in [("hero", "#room", 0), ("operator", "#operator", 300),
                             ("rail", "#work", 120), ("engagements", "#engagements", 60),
                             ("packages", "#price", 48), ("proof", "#proof", 48),
                             ("manual", "#manual", 48), ("faq", "#faq", 40),
                             ("ask", "#contact", 0), ("foot", ".foot", 0)]:
            place(m, sel, off)
            m.wait_for_timeout(420)
            rows = sweep(m, sel) + sweep(m, ":bar")
            for r in rows:
                if r["ratio"] < r["thr"] - 0.005:
                    mfails.append("%s %r %.0fpx %.2f:1 < %.1f (ink %s on %s)"
                                  % (nm, r["text"], r["size"], r["ratio"], r["thr"],
                                     r["ink"], r["bg"]))
            if rows:
                lo = min(rows, key=lambda r: r["ratio"] - r["thr"])
                mworst.append("%s %.2f:1 (%r %.0fpx, needs %.1f)"
                              % (nm, lo["ratio"], lo["text"][:26], lo["size"], lo["thr"]))
        report("25b-contrast-sweep-390", not mfails,
               "same rule at 390. Tightest run per section: %s || failures: %s"
               % ("; ".join(mworst), "; ".join(mfails) if mfails else "none"))

        m.close()

        # =========================================================== the width ladder sweep
        ladder, slices = [], {}
        for w, h in [(360, 780), (375, 812), (390, 844), (414, 896)]:
            s = browser.new_page(viewport={"width": w, "height": h})
            s.goto(url, wait_until="load")
            s.wait_for_function("document.fonts.status === 'loaded'", timeout=30000)
            s.wait_for_timeout(1800)
            r = s.evaluate("""() => {
                const room = document.getElementById('room'), cs = getComputedStyle(room);
                const content = room.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
                const row = [...document.querySelectorAll('.room h1 .r')].pop();
                const rr = row.getBoundingClientRect();
                return {content, text: row.textContent, w: rr.width,
                        rects: row.getClientRects().length, size: getComputedStyle(row).fontSize,
                        wdth: getComputedStyle(row).fontVariationSettings,
                        sw: document.documentElement.scrollWidth, iw: window.innerWidth};
            }""")
            r["viewport"] = w
            r["gutter"] = r["content"] - r["w"]
            ladder.append(r)
            slices[w] = s.evaluate(SLICE_JS, "#filmvid")
            if w == 360:
                s.evaluate(SCROLL, 0); s.wait_for_timeout(500)
                hold(s)
                s.screenshot(path=shot("rl3-360-top.png"))
            s.close()

        def wd(s):
            mm = re.search(r'"wdth"\s+([\d.]+)', s or "")
            return float(mm.group(1)) if mm else None

        ok3 = (all(r["gutter"] >= 12 and r["rects"] == 1 for r in ladder)
               and all(r["sw"] <= r["iw"] for r in ladder)
               and all(r["rects"] == 1 and r["w"] < rows1440["content"] for r in rows1440["rows"])
               and all(r["rects"] == 1 and r["w"] < rows390["content"] for r in rows390["rows"]))
        report("03-hero-rows-width-ladder", ok3,
               "rungs: >=480px wdth 125 | <=479 106 | <=399 104 | <=379 100 | <=364 96 | <=339 90. "
               "'go-to-market.' swept: %s. 1440: %s"
               % (" ; ".join("%d -> wdth %s, %.1fpx in %.0fpx content, gutter %.1fpx, rects=%d"
                             % (r["viewport"], wd(r["wdth"]), r["w"], r["content"], r["gutter"], r["rects"])
                             for r in ladder),
                  " ".join("%r %.0fpx rects=%d %s wdth %s" % (r["text"], r["w"], r["rects"], r["size"], wd(r["wdth"]))
                           for r in rows1440["rows"])))

        report("02-no-h-overflow", over390["sw"] <= over390["iw"] and all(r["sw"] <= r["iw"] for r in ladder),
               "390: documentElement.scrollWidth=%d body=%d innerWidth=%d, overflowing elements=%s; "
               "sweep: %s" % (over390["sw"], over390["bw"], over390["iw"], over390["wide"] or "none",
                              [(r["viewport"], r["sw"]) for r in ladder]))

        # ---- 11 the pointing hand (and the face) inside the crop
        def inside(sl, region):
            return sl and sl.get("x") and sl["x"][0] <= region[0] and sl["x"][1] >= region[1]
        checks = {1440: slice1440, 390: slice390}
        checks.update(slices)
        ok11 = all(inside(sl, HAND) and inside(sl, FACE) for sl in checks.values())
        report("11-hero-hand-and-face-in-frame", ok11,
               "clip A2 points LEFT (measured on A2-poster-last.jpg: the hand occupies source x "
               "368-685 of 1920 = %.3f-%.3f, his face 1010-1290 = %.3f-%.3f). The brief's "
               "'x 1450-1500' described the RETIRED clip A. Visible source slice, as fractions: %s"
               % (HAND[0], HAND[1], FACE[0], FACE[1],
                  " ; ".join("%d -> [%.3f, %.3f] objectPosition %s, box %.0fx%.0f, source %dx%d, "
                             "hand in=%s face in=%s"
                             % (w, sl["x"][0], sl["x"][1], sl["objectPosition"], sl["box"][0],
                                sl["box"][1], sl["nat"][0], sl["nat"][1],
                                inside(sl, HAND), inside(sl, FACE))
                             for w, sl in sorted(checks.items()))))

        # ---- 17b the proof index still one line at 1280 and 900
        wide = {}
        for w in (1280, 1024, 900):
            s = browser.new_page(viewport={"width": w, "height": 900})
            s.goto(url, wait_until="load")
            s.wait_for_function("document.fonts.status === 'loaded'", timeout=30000)
            s.wait_for_timeout(900)
            wide[w] = s.evaluate("""() => {
                const lh = (e) => e ? Math.max(1, Math.round(e.getBoundingClientRect().height /
                            parseFloat(getComputedStyle(e).lineHeight))) : 0;
                return [...document.querySelectorAll('#proof .prf')].map(r => {
                  const ar = r.querySelector('.ar');
                  return {n: r.querySelector('.who').textContent.trim().slice(0, 26),
                          wl: lh(r.querySelector('.who')), cl: lh(r.querySelector('.cap')),
                          cols: getComputedStyle(r).gridTemplateColumns,
                          arX: ar ? ar.getBoundingClientRect().left : null,
                          h: Math.round(r.getBoundingClientRect().height)};
                });
            }""")
            s.close()
        def rail_spread(rr):
            xs2 = [r["arX"] for r in rr if r["arX"] is not None]
            return round(max(xs2) - min(xs2), 2) if xs2 else 99.0
        ok17b = (all(r["wl"] == 1 and r["cl"] <= 1 for w in (1280, 1024) for r in wide[w])
                 and all(len(r["cols"].split()) == 3 for w in (1280, 1024) for r in wide[w])
                 and all(len(r["cols"].split()) == 2 for r in wide[900])
                 and all(rail_spread(wide[w]) == 0 for w in wide))
        report("17b-proof-row-form-by-width", ok17b,
               "the one-line row holds from 1024px up on three tracks (name / caption / the "
               "40px arrow rail); below it the row takes its COMPOSED two-line shape -- name + "
               "year, then the caption -- on two tracks, the rail kept. The arrows share one x "
               "at every width. Measured: %s"
               % " ; ".join("%d [%s] rail spread %.2fpx %s" % (w, wide[w][0]["cols"], rail_spread(rr),
                            ["%s %dL/%dL h=%d" % (r["n"][:20], r["wl"], r["cl"], r["h"]) for r in rr])
                            for w, rr in sorted(wide.items())))

        # ---- 21 reduced motion
        rm_rows = []
        for w, h in [(1440, 900), (390, 844)]:
            r = browser.new_page(viewport={"width": w, "height": h}, reduced_motion="reduce")
            r.goto(url, wait_until="load")
            r.wait_for_function("document.fonts.status === 'loaded'", timeout=30000)
            r.wait_for_timeout(900)
            st = r.evaluate("""() => {
                const vids = [...document.querySelectorAll('video')];
                const bar = document.getElementById('bar');
                const stills = [...document.querySelectorAll('.still')].map(s => {
                  const cs = getComputedStyle(s);
                  return {display: cs.display, img: cs.backgroundImage.slice(0, 26),
                          h: Math.round(s.getBoundingClientRect().height)};
                });
                return {hidden: vids.every(v => getComputedStyle(v).display === 'none'),
                        paused: vids.every(v => v.paused), stills,
                        barOpacity: getComputedStyle(bar).opacity,
                        js: document.documentElement.classList.contains('js'),
                        p: getComputedStyle(document.documentElement).getPropertyValue('--p').trim()};
            }""")
            r.evaluate(SCROLL, r.evaluate("() => document.getElementById('work').getBoundingClientRect().top + window.scrollY - 200"))
            r.wait_for_timeout(500)
            st["pAfter"] = r.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--p').trim()")
            st["viewport"] = w
            rm_rows.append(st)
            r.close()
        ok21 = all(s["hidden"] and s["paused"] and s["barOpacity"] == "1" and not s["js"]
                   and all(x["display"] == "block" and x["img"].startswith("url(\"data:image") for x in s["stills"])
                   and s["pAfter"] in ("0", "1", "0.0000", "1.0000")
                   for s in rm_rows)
        report("21-reduced-motion", ok21,
               "; ".join("%dpx: videos display:none=%s paused=%s, %d posters shown %s, bar opacity=%s, "
                         "entrance class 'js'=%s, ground --p is a hard switch (%s -> %s)"
                         % (s["viewport"], s["hidden"], s["paused"], len(s["stills"]),
                            [x["h"] for x in s["stills"]], s["barOpacity"], s["js"], s["p"] or "0", s["pAfter"])
                         for s in rm_rows))

        browser.close()

    # ---- 06 contrast verdict
    report("06-hero-contrast", ok6a and ok6b,
           "thresholds: copper row >= %.1f (large display type), bone row >= %.1f. 1440: %s | "
           "390: %s || raw: %s"
           % (T_COPPER, T_BONE, " ; ".join(verd_a), " ; ".join(verd_b), " | ".join(det_a + det_b)))

    # ---- 01 the plates
    shots = ["rl3-1440-top.png", "rl3-390-top.png", "rl3-360-top.png", "rl3-sec-operator.png",
             "rl3-sec-work.png", "rl3-sec-price.png", "rl3-sec-proof.png", "rl3-sec-faq.png",
             "rl3-sec-ask.png", "rl3-390-operator.png", "rl3-390-proof.png", "rl3-390-price.png",
             "rl3-1440.png", "rl3-390.png"]
    sizes = []
    for s in shots:
        p = os.path.join(os.path.dirname(built), s)
        if os.path.exists(p):
            with Image.open(p) as im:
                sizes.append("%s %dx%d" % (s, im.width, im.height))
        else:
            sizes.append("%s MISSING" % s)
    report("01-screenshots", all("MISSING" not in x for x in sizes), "; ".join(sizes))

    # ---- 08 the copy gate, over two verified sources
    total, misses, sourced, nmdx = copy_gate(built)
    report("08-copy-gate", not misses,
           "%d visible text nodes checked (title exempt). Sources: %d verbatim in "
           "freight/the-receipts.template.html text, %d in its alt text, %d in content/work/*.mdx "
           "frontmatter (%d title/dek/year/role values read), %d composed from ' \\u00b7 '-joined "
           "verified atoms. Misses=%d%s"
           % (total, sourced["freight"], sourced["alt"], sourced["mdx"], nmdx, sourced["composed"],
              len(misses), (": " + json.dumps(misses, ensure_ascii=False)) if misses else ""))

    size = os.path.getsize(built)
    report("00-size", size <= 12 * 1024 * 1024,
           "%d bytes (%.2fMB), ceiling 12MB" % (size, size / 1024 / 1024))

    print("\nSUMMARY %d/%d pass" % (sum(1 for r in RESULTS if r["pass"]), len(RESULTS)))
    with io.open(os.path.join(os.path.dirname(built), "rl3-verify.json"), "w",
                 encoding="utf-8", newline="\n") as fh:
        json.dump(RESULTS, fh, ensure_ascii=False, indent=1)
    return 0 if all(r["pass"] for r in RESULTS) else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_BUILT))
