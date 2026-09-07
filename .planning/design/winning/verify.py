"""Verify the built "Room and Ledger" page against WINNING-BRIEF-2026-09-05.md SS14.

    cd <scratchpad>/vfy && python -P verify.py [built.html]

-P matters: the scratchpad holds a `copy.py` that shadows the stdlib `copy` module.

Every check is measured in Chromium through file://. Nothing is asserted from the source
text alone except the copy gate, which reads the built HTML and the three verified copy
sources (freight template, content/work/*.mdx frontmatter, app/(foyer)/packages/page.tsx)
plus the ONE operator-supplied string SS15.6 names.

Checks, in SS14/SS15 order (SS15 supersedes SS14 on the rail, the cards, the engagements
strip, the manual, the objections and the index; SS14 binds everywhere SS15 is silent):
  01 stage-map        the hero stage is 16:9 at >=900, the film fills it, 1:1 source mapping
  16.2 fingertip      the tip is <=60px from the "g" glyph box AND the "g" is LEFT of the
                      tip (SS16.2 moves the words up one row: the COPPER row's cap-top is
                      the 4px stop under the tip and "I build the" is the row above it)
  16.2 arrival        the fingertip's arrival frame, re-measured IN the browser off the
                      built page's own clip at 0.1s steps, against the script's constant
  16.2 lighting       bone row >=4.5:1 at three frames; the copper row's ground, from the
                      cap-top SS16.2 pins, flat espresso; the veil's own alpha profile
  16.3 motion         one probe per item: initial vs settled computed values, <=3
                      @keyframes, everything off under reduced motion, and the no-JS
                      render finished at opacity 1
  02b copper-row      'go-to-market.' ends >=32px inside the stage at 1280/1440/1920
  03 hero-veil        composited contrast behind both headline rows at frames 0/48/96
  04 hero-mobile      390 and 360: crop 0% 50%, the headline OVERLAID at the fingertip, both
                      rows single-rect with >=12px of stage right of them, the face in frame,
                      and the sentence, chips and proof row under the stage
  05 operator         square stage, heading over the lower third, contrast at 3 loop frames
  05b op-heading      the heading is exactly --d2 at "wdth" 106 and single-rect in the square
  05c op-veil         the veil reads .6 at 62% and solid at 82%
  05d op-rows         the right column's register rows take their own height
  06 op-columns       first paragraph on the film under the heading; right column top-aligned
  07 no-years         zero 19xx/20xx anywhere in the rendered text
  08 no-figures       zero digit-bearing tokens outside the explicit allow-list
  09 copy-gate        every text node is verbatim in a verified source, or one of the two
                      SS14.3 rewrites, or one of the two SS14.7 shape changes, or the ONE
                      SS15.6 operator-supplied string
  10 two-rewrites     the gate enumerates exactly the two SS14.3 rewrites, and both are used
  11 heads            section heads at --d2; index names 28; FAQ 24/17 (SS15.3); captions 19
  11b faq-stop        the FAQ head ends in a full stop
  11c captions-caps   every index caption opens on a capital
  11d middot          the middot is never the last thing on a line, at 1440 or 390
  15.1 gesture        preload="auto" on both clips, and after ONE synthetic wheel event the
                      hero plays and the operator clip plays once it is >= 35% visible
  15.2 manual         the cover decodes (naturalWidth 720) and fills cols 1-5 at 4:5 inside
                      the dashed frame; the display line at --d2; three hairline symptom
                      rows at 21px; the buy block; at 390 the cover comes before the copy
                      and the file line under it stacks into two unwrapped lines
  15.3 objections     three equal columns at 1440 (+-1px), hairline tops, 24px / 17px;
                      stacked at 390 on 40px gaps
  15.4 work-ledger    zero .panel, zero <svg>, zero <img>/<video>, zero position:sticky in
                      the section; three rows, ordinal + name at --d2 + sentence right half
  15.5 cards          1px ink-15% border, 8px radius, 28px padding, name 24px Hanken 500,
                      price 72px, full-width chip; the Audit a 2px copper TOP rule, no box
  15.5b engagements   one <a>, width == the cards row, 24px below, 16px radius, 2px copper
                      top rule, >=220px, espresso ground, --d2 left + 64px right + the chip;
                      every text run measured for contrast
  15.6 receipts       exactly two .prf rows (Guardicore, the RFP engine) and one row-shaped
                      "See the rest" link; the head unchanged
  15 hero-rows        both hero display rows unwrapped and inside the content width
  16 no-hscroll       390 and 360 have no horizontal scroll
  17 media            two <video>, correct attributes, ONE 720 source each, readyState >= 2
  18 discipline       zero @keyframes, no gsap, no mix-blend-mode, no banned faces
  19 proof-row        the hero proof row reads exactly "Four exits, $5B+ combined."
"""
import json, os, re, shutil, subprocess, sys, unicodedata
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass
from playwright.sync_api import sync_playwright

REPO = r"C:\Users\micah\Code\micahjonesconsulting"
DESIGN = os.path.join(REPO, ".planning", "design")
FREIGHT = os.path.join(DESIGN, "freight", "the-receipts.template.html")
WORK = os.path.join(REPO, "content", "work")
# SS14.7 names a THIRD verified copy source: the live /packages page, whose three BuyButton
# labels the card chips now read verbatim.
PACKAGES = os.path.join(REPO, "app", "(foyer)", "packages", "page.tsx")
SCRATCH = (r"C:\Users\micah\AppData\Local\Temp\claude"
           r"\C--Users-micah-Code-micahjonesconsulting"
           r"\5e1d622c-a05a-43bd-9bbe-992aaaf6d702\scratchpad")
BUILT = os.path.join(SCRATCH, "room-and-ledger.html")

# SS14.3, exhaustive. Nothing else may be composed.
REWRITES = [
    ("$14M in revenue", "millions in revenue"),
    ("$3M in contracts won", "millions in contracts won"),
]
# SS14.3: the four prices and the engagements floor survive; they are prices, not receipts.
# Operator ruling 2026-09-06, verbatim: "Just put somewhere the 5 billion of exits i have
# helped with." "$5B+" is the SINGLE named exception to the no-figures rule -- it is a
# receipt, not a price, and it is the only one. Nothing else in the rule changes.
ALLOWED_FIGURES = ["$500", "$2,500", "$7,500", "$99", "$5K", "$5B+"]
# tokens that carry a digit but are not a figure: the book's own title/argument, a product
# name, the rail's step ordinals, and one page citation.
# SS18 gives the receipts their count, which is the freight template's own `07`, and
# the objections keep theirs (`03`, also the template's). Both are section ordinals in the
# label style, not claims -- the same class as the rail's 01/02/03.
ALLOWED_DIGIT_TOKENS = ["80%", "80-percent", "v0", "01", "02", "03", "07", "page 6"]
BAR_LABELS = ["Micah Jones", "Record", "Playbook", "Packages from $500",
              "Name the problem", "\u2192"]
# SS15.6, verbatim: the receipts index is consolidated to two rows "and offer to see
# the rest". The words are the operator's own and are recorded here as the ONE
# operator-supplied string on the page. It reaches the DOM as two nodes (the words, and
# the shared arrow glyph the bar already exempts), so a node clears this rule when it is
# a substring of it.
OPERATOR_COPY = ["See the rest →"]

RES = []


def chk(cid, ok, ev):
    RES.append({"id": cid, "pass": bool(ok), "evidence": str(ev)})
    print(("PASS " if ok else "FAIL ") + cid + "  " + str(ev))
    return ok


# ---------------------------------------------------------------- copy corpus


def norm(s):
    s = unicodedata.normalize("NFKC", s)
    s = (s.replace("\u2019", "'").replace("\u2018", "'")
           .replace("\u201c", '"').replace("\u201d", '"')
           .replace("\u2013", "-").replace("\u2014", "-")
           .replace("\u00a0", " ").replace("\u2192", "->").replace("\u00b7", "."))
    return re.sub(r"\s+", " ", s).strip()


def strip_tags(html):
    html = re.sub(r"<script.*?</script>", " ", html, flags=re.S | re.I)
    html = re.sub(r"<style.*?</style>", " ", html, flags=re.S | re.I)
    alts = re.findall(r'alt="([^"]*)"', html) + re.findall(r'aria-label="([^"]*)"', html)
    text = re.sub(r"<[^>]+>", "\n", html)
    import html as H
    return H.unescape(text) + "\n" + "\n".join(H.unescape(a) for a in alts)


def corpus():
    parts = []
    parts.append(strip_tags(open(FREIGHT, encoding="utf-8").read()))
    for f in sorted(os.listdir(WORK)):
        if not f.endswith(".mdx"):
            continue
        src = open(os.path.join(WORK, f), encoding="utf-8").read()
        m = re.match(r"^---\n(.*?)\n---", src, flags=re.S)
        if m:
            parts.append(m.group(1))
    # SS15.4 takes the redrawn page-6 diagram off the page with the rest of the rail
    # panels, so WallChart.tsx stops being a copy source: the gate narrows to three.
    # SS14.7's third source: the live /packages button labels and its own JSX text
    pk = open(PACKAGES, encoding="utf-8").read()
    parts.append("\n".join(re.findall(r'(?<!aria-)label="([^"]*)"', pk)))
    parts.append("\n".join(re.findall(r">\s*([^<>{}\n][^<>{}]*?)\s*<", pk)))
    blob = norm("\n".join(parts))
    for a, b in REWRITES:
        blob += " || " + norm(b)
    blob += " || " + norm("From $5K a month")
    return blob


# ---------------------------------------------------------------- contrast


def lum(r, g, b):
    def c(v):
        v /= 255.0
        return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b)


def ratio(a, b):
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)


def parse_rgb(s):
    n = [float(x) for x in re.findall(r"[\d.]+", s)[:3]]
    return n if len(n) == 3 else [255, 255, 255]


def bg_contrast(page, sel, png_path):
    """Hide the glyphs of `sel`, shoot its box, and return the WORST contrast any pixel
    behind it makes with the element's own colour."""
    info = page.evaluate("""(sel)=>{const e=document.querySelector(sel);
        if(!e) return null; const r=e.getBoundingClientRect();
        return {x:r.x,y:r.y,w:r.width,h:r.height,color:getComputedStyle(e).color};}""", sel)
    if not info or info["w"] < 2 or info["h"] < 2:
        return None
    page.evaluate("(sel)=>{document.querySelector(sel).style.color='transparent';}", sel)
    clip = {"x": max(0, info["x"]), "y": max(0, info["y"]),
            "width": min(info["w"], page.viewport_size["width"] - max(0, info["x"])),
            "height": min(info["h"], page.viewport_size["height"] - max(0, info["y"]))}
    page.screenshot(path=png_path, clip=clip)
    page.evaluate("(sel)=>{document.querySelector(sel).style.color='';}", sel)
    from PIL import Image
    im = Image.open(png_path).convert("RGB")
    fg = lum(*parse_rgb(info["color"]))
    worst = 99.0
    px = im.load()
    w, h = im.size
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            worst = min(worst, ratio(fg, lum(*px[x, y])))
    return worst


FFMPEG = (r"C:\Users\micah\AppData\Local\Microsoft\WinGet\Packages"
          r"\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe"
          r"\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe")

def measure_arrival(clip, workdir):
    """SS16.3-1's trigger, measured rather than guessed. Frames every 0.1s; in each one the
    leftmost run of six pixels 25 levels under the local wall median, inside the band the
    fingertip lives in (source rows 370..520 of 1080). The arrival is the FIRST frame whose
    leftmost hand pixel is within 6px of its value on the last frame."""
    from PIL import Image
    exe = FFMPEG if os.path.exists(FFMPEG) else (shutil.which("ffmpeg") or "")
    if not exe or not os.path.exists(clip):
        return None
    d = os.path.join(workdir, "arr")
    if os.path.isdir(d):
        for f in os.listdir(d):
            os.remove(os.path.join(d, f))
    os.makedirs(d, exist_ok=True)
    r = subprocess.run([exe, "-v", "error", "-i", clip, "-vf", "fps=10",
                        "-start_number", "0", os.path.join(d, "f%03d.png")],
                       capture_output=True)
    if r.returncode != 0:
        return None
    files = sorted(f for f in os.listdir(d) if f.endswith(".png"))
    if not files:
        return None
    im0 = Image.open(os.path.join(d, files[0]))
    W, H = im0.size
    Y0, Y1 = int(round(370 * H / 1080.0)), int(round(520 * H / 1080.0))
    RX0, RX1 = int(round(300 * W / 1920.0)), int(round(365 * W / 1920.0))
    XMAX = min(W, int(round(1050 * W / 1920.0)))

    def leftmost(path):
        px = Image.open(path).convert("L").load()
        best = None
        for y in range(Y0, Y1 + 1):
            row = [px[x, y] for x in range(XMAX)]
            ref = sorted(row[RX0:RX1 + 1])
            thr = ref[len(ref) // 2] - 25
            run = 0
            for x in range(XMAX):
                if row[x] < thr:
                    run += 1
                    if run >= 6:
                        xx = x - 5
                        if best is None or xx < best:
                            best = xx
                        break
                else:
                    run = 0
        return best

    trace = [(i / 10.0, leftmost(os.path.join(d, f))) for i, f in enumerate(files)]
    final = trace[-1][1]
    arrival = None
    for t, x in trace:
        if x is not None and final is not None and abs(x - final) <= 6:
            arrival = t
            break
    return {"trace": trace, "final": final, "arrival": arrival,
            "w": W, "h": H, "n": len(files)}


def ident(v):
    """Is this computed transform the identity (no move, no scale)?"""
    if not v or v == "none":
        return True
    tx, ty, sc = tmat(v)
    return abs(tx) < 0.01 and abs(ty) < 0.01 and abs(sc - 1) < 0.01


def tmat(v):
    """(tx, ty, scale) out of a computed `transform` matrix string."""
    if not v or v == "none":
        return (0.0, 0.0, 1.0)
    n = [float(x) for x in re.findall(r"-?[\d.eE+]+", v)]
    if len(n) >= 6:
        return (n[4], n[5], n[0])
    return (0.0, 0.0, 1.0)


def ground_from_cap(page, sel, png_path):
    """SS16.2 pins the veil solid from `fingertip_y + 4px`, which IS the copper row's own
    INK top -- the top of the leading lowercase `g`, --xk of the font size below the line
    box (round 10; pinned to the cap line instead, the tip stood 15-16px clear of the g and
    touched nothing). So the row's GROUND is measured from that ink top down -- the band the
    row's ink actually stands on -- and what is returned is (worst contrast, brightest
    channel). The --xk of line box ABOVE it is empty except where the two `t`s and the `k`
    of `go-to-market.` run up to the box's own top; that strip stands in the veil's
    .55 -> 1 ramp by construction and is reported separately, never folded into this
    number."""
    from PIL import Image
    info = page.evaluate("""(sel)=>{const e=document.querySelector(sel);
        if(!e) return null; const r=e.getBoundingClientRect();
        const h1=e.closest('h1')||e;
        const xk=parseFloat(getComputedStyle(document.documentElement)
                    .getPropertyValue('--xk'))||0.1404;
        return {x:r.x,y:r.y,w:r.width,h:r.height,color:getComputedStyle(e).color,
                cap:xk*parseFloat(getComputedStyle(h1).fontSize)};}""", sel)
    if not info or info["w"] < 2 or info["h"] < 2:
        return None
    page.evaluate("(sel)=>{document.querySelector(sel).style.color='transparent';}", sel)
    y = max(0, info["y"] + info["cap"])
    h = info["h"] - info["cap"]
    clip = {"x": max(0, info["x"]), "y": y,
            "width": min(info["w"], page.viewport_size["width"] - max(0, info["x"])),
            "height": min(h, page.viewport_size["height"] - y)}
    page.screenshot(path=png_path, clip=clip)
    page.evaluate("(sel)=>{document.querySelector(sel).style.color='';}", sel)
    im = Image.open(png_path).convert("RGB")
    fg = lum(*parse_rgb(info["color"]))
    px = im.load()
    w, hh = im.size
    worst, bright = 99.0, 0
    for yy in range(0, hh, 2):
        for xx in range(0, w, 2):
            p = px[xx, yy]
            worst = min(worst, ratio(fg, lum(*p)))
            bright = max(bright, max(p))
    return worst, bright


def tip_to_g_ink(page, png):
    """SS16.2: "its tip touches the 'g'". Measured in PIXELS, not from a glyph box: the
    copper row is painted black on a white sheet at full opacity, the leading glyph's own
    ink mask is scanned, and what is returned is the distance from the measured fingertip
    to the nearest INK pixel of that "g". A Range rect is the font's ascent+descent box and
    says nothing about where a lowercase bowl actually starts."""
    from PIL import Image
    import math
    info = page.evaluate("""()=>{
        const stg=document.getElementById('stage'); const b=stg.getBoundingClientRect();
        const v=document.getElementById('filmvid'), cs=getComputedStyle(v);
        const SW=1920,SH=1080,FX=372,FY=413;
        const sc=Math.max(b.width/SW,b.height/SH);
        const op=cs.objectPosition.split(' ');
        const ox=b.x+(b.width-SW*sc)*(parseFloat(op[0])/100);
        const oy=b.y+(b.height-SH*sc)*(parseFloat(op[1])/100);
        const r=document.querySelector('#h1 .r.cu').getBoundingClientRect();
        document.getElementById('stage').style.visibility='hidden';
        document.getElementById('room').style.background='#fff';
        document.querySelector('.hero-copy .lede').style.visibility='hidden';
        document.querySelector('#h1 .r.r1').style.visibility='hidden';
        const cu=document.querySelector('#h1 .r.cu');
        cu.style.color='#000'; cu.style.opacity='1'; cu.style.transition='none';
        return {x:r.x,y:r.y,w:r.width,h:r.height,fx:ox+FX*sc,fy:oy+FY*sc};}""")
    page.wait_for_timeout(120)
    page.screenshot(path=png, clip={"x": max(0, info["x"]), "y": max(0, info["y"]),
                                    "width": info["w"], "height": info["h"]})
    page.evaluate("""()=>{document.getElementById('stage').style.visibility='';
        document.getElementById('room').style.background='';
        document.querySelector('.hero-copy .lede').style.visibility='';
        document.querySelector('#h1 .r.r1').style.visibility='';
        const cu=document.querySelector('#h1 .r.cu');
        cu.style.color=''; cu.style.opacity=''; cu.style.transition='';}""")
    im = Image.open(png).convert("L")
    px, W, H = im.load(), im.size[0], im.size[1]
    cols = [any(px[x, y] < 128 for y in range(H)) for x in range(W)]
    try:
        first = next(i for i, v in enumerate(cols) if v)
    except StopIteration:
        return None
    gap = next((i for i in range(first, W) if not cols[i]), W)
    best, at = 1e9, None
    for x in range(first, gap):
        for y in range(H):
            if px[x, y] < 128:
                d = math.hypot(info["x"] + x - info["fx"], info["y"] + y - info["fy"])
                if d < best:
                    best, at = d, (info["x"] + x, info["y"] + y)
    inktop = min(y for x in range(first, gap) for y in range(H) if px[x, y] < 128)
    return {"dist": best, "at": at, "fx": info["fx"], "fy": info["fy"],
            "gInkTop": info["y"] + inktop, "gInkLeft": info["x"] + first,
            "gInkRight": info["x"] + gap, "rowTop": info["y"]}


def hand_emerges(page, png_raw, png_out):
    """SS16.2: "the hand emerges from the dark". The hand-and-arm silhouette is taken from
    the film itself with the veil OFF (every pixel in the arm's own source window that is
    >= 14 levels darker than the wall's median on its own row), and what is reported is the
    share of that silhouette that still reads >= 8 levels off the local wall once the veil
    is composited over it -- plus how much of what survives lies BELOW the fingertip, which
    is the half round 9 painted out entirely."""
    from PIL import Image
    import statistics
    box = page.evaluate("""()=>{
        const stg=document.getElementById('stage'); const b=stg.getBoundingClientRect();
        const v=document.getElementById('filmvid'), cs=getComputedStyle(v);
        const SW=1920,SH=1080,FX=372,FY=413;
        const sc=Math.max(b.width/SW,b.height/SH);
        const op=cs.objectPosition.split(' ');
        const ox=b.x+(b.width-SW*sc)*(parseFloat(op[0])/100);
        const oy=b.y+(b.height-SH*sc)*(parseFloat(op[1])/100);
        document.getElementById('herocopy').style.visibility='hidden';
        return {x:b.x,y:b.y,w:b.width,h:b.height,sc:sc,ox:ox,oy:oy,
                fx:ox+FX*sc, fy:oy+FY*sc};}""")
    clip = {"x": max(0, box["x"]), "y": max(0, box["y"]),
            "width": box["w"], "height": box["h"]}
    page.evaluate("()=>{document.querySelector('#stage .veil').style.display='none';}")
    page.wait_for_timeout(120)
    page.screenshot(path=png_raw, clip=clip)
    page.evaluate("()=>{document.querySelector('#stage .veil').style.display='';}")
    page.wait_for_timeout(120)
    page.screenshot(path=png_out, clip=clip)
    page.evaluate("()=>{document.getElementById('herocopy').style.visibility='';}")
    raw = Image.open(png_raw).convert("L").load()
    cmp_ = Image.open(png_out).convert("L").load()
    im = Image.open(png_raw)
    W, H = im.size

    def sx(s):
        return int(round(box["ox"] - box["x"] + s * box["sc"]))

    def sy(s):
        return int(round(box["oy"] - box["y"] + s * box["sc"]))

    tipy = box["fy"] - box["y"]
    tot = sur = below = 0
    for s_y in range(400, 761, 2):
        y = sy(s_y)
        if y < 0 or y >= H:
            continue
        wall_r = [raw[sx(s), y] for s in range(120, 331, 6) if 0 <= sx(s) < W]
        wall_c = [cmp_[sx(s), y] for s in range(120, 331, 6) if 0 <= sx(s) < W]
        if not wall_r:
            continue
        wr, wc = statistics.median(wall_r), statistics.median(wall_c)
        for s_x in range(360, 761, 2):
            x = sx(s_x)
            if x < 0 or x >= W:
                continue
            if wr - raw[x, y] >= 14:
                tot += 1
                if wc - cmp_[x, y] >= 8:
                    sur += 1
                    if y > tipy:
                        below += 1
    if not tot:
        return None
    return {"tot": tot, "sur": sur, "below": below, "frac": sur / float(tot),
            "below_share": (below / float(sur)) if sur else 0.0}


def veil_profile(page, png):
    """Measure the veil's OWN alpha, not a composite guess: the film is hidden and the
    stage painted flat white, so alpha = (255 - pixel) / (255 - 13) at every row."""
    from PIL import Image
    box = page.evaluate("""()=>{const s=document.getElementById('stage');
        const v=s.querySelector('video'); const st=s.querySelector('.still');
        v.style.display='none'; if(st) st.style.display='none';
        s.style.background='#ffffff';
        document.getElementById('herocopy').style.visibility='hidden';
        const r=s.getBoundingClientRect();
        const wEl=document.getElementById('stagewrap');
        const fy=r.top+r.height*parseFloat(wEl.dataset.fy||'38.2407')/100;
        const rows=[...document.querySelectorAll('#h1 .r')];
        return {x:r.x,y:r.y,w:r.width,h:r.height,fy:fy,
                boneTop:rows[0].getBoundingClientRect().y};}""")
    page.wait_for_timeout(200)
    page.screenshot(path=png, clip={"x": max(0, box["x"]), "y": max(0, box["y"]),
                                    "width": box["w"], "height": box["h"]})
    page.evaluate("""()=>{const s=document.getElementById('stage');
        const v=s.querySelector('video'); const st=s.querySelector('.still');
        v.style.display=''; if(st) st.style.display='';
        s.style.background='';
        document.getElementById('herocopy').style.visibility='';}""")
    im = Image.open(png).convert("L")
    px, W, H = im.load(), im.size[0], im.size[1]

    def a_at(abs_y):
        y = int(round(abs_y - box["y"]))
        if y < 0 or y >= H:
            return None
        v = px[min(W - 1, int(W * 0.5)), y]
        return (255.0 - v) / (255.0 - 13.0)

    out = {"a_m12": a_at(box["fy"] - 12), "a_p4": a_at(box["fy"] + 4),
           "a_m40": a_at(box["fy"] - 40), "a_p40": a_at(box["fy"] + 40),
           "a_bone_top": a_at(box["boneTop"])}
    return None if any(v is None for v in out.values()) else out


def finger_emerges(page, png):
    """SS16.2 supersedes SS14.1's ">= 25 levels" gate. That number was set against a veil
    that held .55 THROUGH the fingertip's row and stayed lit below it, so the finger sat on
    a wall reading ~145 and an absolute step was the right measure. SS16.2 takes the veil
    solid at fingertip_y + 4px, so the finger's lit band is the 18px of ramp above it, where
    the wall itself falls from ~90 to ~19 -- an absolute step there is a measure of the ramp,
    not of the gesture. What is measured instead is the RELATIVE step, row by row inside the
    lit band: the finger's darkest decile against the wall's median at the SAME y. Scale
    free, so it is the same test at any veil alpha."""
    from PIL import Image
    import statistics
    box = page.evaluate("""()=>{const w=document.getElementById('stagewrap');
        const r=document.getElementById('stage').getBoundingClientRect();
        const fx=parseFloat(w.dataset.fx)/100, fy=parseFloat(w.dataset.fy)/100;
        return {x:r.left+r.width*fx, y:r.top+r.height*fy, w:r.width};}""")
    x, y = box["x"], box["y"]
    clip = {"x": max(0, x - 90), "y": max(0, y - 16), "width": 200, "height": 18}
    page.screenshot(path=png, clip=clip)
    im = Image.open(png).convert("L")
    px, W, H = im.load(), im.size[0], im.size[1]
    rows = []
    for yy in range(H):
        wall = [px[xx, yy] for xx in range(0, 60)]
        ink = sorted(px[xx, yy] for xx in range(60, W))
        wv = statistics.median(wall)
        iv = statistics.median(ink[:max(1, len(ink) // 10)])
        if wv > 2:
            rows.append((wv, iv, (wv - iv) / float(wv)))
    if not rows:
        return None
    return {"rows": rows, "rel": statistics.median(r[2] for r in rows),
            "absmax": max(r[0] - r[1] for r in rows), "bw": W, "bh": H}


def finger_visible(page, png):
    """At the hold frame, is the pointing hand still a visible step off the wall where the
    veil has taken it to .55? Sample a box centred on the measured fingertip and compare its
    darkest decile against the wall 60px to its left."""
    box = page.evaluate("""()=>{const w=document.getElementById('stagewrap');
        const r=document.getElementById('stage').getBoundingClientRect();
        const fx=parseFloat(w.dataset.fx)/100, fy=parseFloat(w.dataset.fy)/100;
        return {x:r.left+r.width*fx, y:r.top+r.height*fy, w:r.width};}""")
    x, y = box["x"], box["y"]
    clip = {"x": max(0, x - 90), "y": max(0, y - 14), "width": 200, "height": 26}
    page.screenshot(path=png, clip=clip)
    from PIL import Image
    import statistics
    im = Image.open(png).convert("L")
    px = im.load()
    w, h = im.size
    wall, ink = [], []
    for yy in range(h):
        for xx in range(w):
            (wall if xx < 60 else ink).append(px[xx, yy])
    if not wall or not ink:
        return None
    wall_v = statistics.median(wall)
    ink.sort()
    ink_v = statistics.median(ink[:max(1, len(ink) // 6)])
    return {"wall": wall_v, "ink": ink_v, "delta": wall_v - ink_v, "bw": w, "bh": h}


def hand_reads(page, png):
    """The gesture is a HAND, not a fingertip. Round 3 pinned the veil solid 12px under the
    fingertip, which made the fingertip the last lit pixel: the finger survived as a sliver
    and the hand, wrist and arm behind it were inside the solid espresso. Sample the hand's
    own source band (x 460..660 of 1920 -- knuckles, fist, wrist) against the wall to its
    left (x 120..300) at three heights BELOW the fingertip and report the composited step at
    each. The hold frame is the state every desktop visitor sees."""
    import statistics
    from PIL import Image
    page.evaluate("()=>{document.getElementById('herocopy').style.visibility='hidden';}")
    page.wait_for_timeout(150)
    box = page.evaluate("""()=>{const r=document.getElementById('stage')
        .getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height};}""")
    page.screenshot(path=png, clip={"x": max(0, box["x"]), "y": max(0, box["y"]),
                                    "width": box["w"], "height": box["h"]})
    page.evaluate("()=>{document.getElementById('herocopy').style.visibility='';}")
    im = Image.open(png).convert("L")
    px, W, H = im.load(), im.size[0], im.size[1]
    out = []
    for pc in (42, 46, 50):
        y = min(H - 1, int(H * pc / 100))
        hand = [px[int(W * x / 1920), y] for x in range(460, 661, 8)]
        wall = [px[int(W * x / 1920), y] for x in range(120, 301, 8)]
        out.append((pc, statistics.median(wall) - statistics.median(hand)))
    return out


def op_film_alive(page, png, top_pct):
    """At the row where the operator heading's caps start, is there still film under the
    veil? Compare the brightest pixel across that row with the flat espresso the veil paints
    when it has gone solid (13)."""
    from PIL import Image
    page.evaluate("()=>{document.getElementById('opover').style.visibility='hidden';}")
    page.wait_for_timeout(150)
    b = page.evaluate("""()=>{const r=document.getElementById('opstage').getBoundingClientRect();
        return {x:r.x,y:r.y,w:r.width,h:r.height};}""")
    page.screenshot(path=png, clip={"x": max(0, b["x"]), "y": max(0, b["y"]),
                                    "width": b["w"], "height": b["h"]})
    page.evaluate("()=>{document.getElementById('opover').style.visibility='';}")
    im = Image.open(png).convert("L")
    px, W, H = im.load(), im.size[0], im.size[1]
    y = min(H - 1, int(H * top_pct / 100))
    row = [px[x, y] for x in range(0, W, 3)]
    return max(row) - 13


def set_frame(page, vid_id, frame, fps=24.0):
    return page.evaluate("""async ([id,f,fps])=>{
        const v=document.getElementById(id); if(!v) return null;
        v.pause();
        const d = isFinite(v.duration)&&v.duration>0 ? v.duration : 5;
        v.currentTime = Math.min(f/fps, Math.max(0, d-0.05));
        await new Promise(r=>{const go=()=>{v.removeEventListener('seeked',go);r();};
                              v.addEventListener('seeked',go); setTimeout(r,900);});
        return v.currentTime;}""", [vid_id, frame, fps])


# ---------------------------------------------------------------- main


def main(built):
    url = "file:///" + built.replace("\\", "/")
    shots = []
    blob = corpus()

    with sync_playwright() as p:
        br = p.chromium.launch(args=["--autoplay-policy=no-user-gesture-required",
                                     "--disable-lcd-text"])
        ctx = br.new_context(viewport={"width": 1440, "height": 900},
                             device_scale_factor=1, reduced_motion="no-preference")
        pg = ctx.new_page()
        pg.goto(url)
        pg.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        pg.wait_for_timeout(1800)

        # ---- 01 stage mapping ------------------------------------------------
        st = pg.evaluate("""()=>{const w=document.getElementById('stagewrap');
            const v=document.getElementById('filmvid');
            const r=document.getElementById('stage').getBoundingClientRect();
            const cs=getComputedStyle(v);
            return {w:r.width,h:r.height,fit:cs.objectFit,pos:cs.objectPosition,
                    vw:v.videoWidth,vh:v.videoHeight,
                    fx:parseFloat(w.dataset.fx),fy:parseFloat(w.dataset.fy),
                    inner:window.innerWidth};}""")
        exp = st["w"] * 9 / 16
        chk("14.1-stage-16x9",
            abs(st["h"] - exp) <= 1.5 and abs(st["w"] - st["inner"]) <= 1
            and st["fit"] == "cover" and st["pos"] == "50% 50%",
            "1440: stage %.1fx%.1f (16:9 wants %.1f), width==innerWidth(%d), object-fit=%s, "
            "object-position=%s, source %dx%d -> 1:1 mapping"
            % (st["w"], st["h"], exp, st["inner"], st["fit"], st["pos"], st["vw"], st["vh"]))

        # ---- 02 SS14.7: the words go to the finger ---------------------------
        # The fingertip is derived from the COVER FIT of the 1920x1080 source into whatever
        # box the stage currently is, so ONE expression covers the 16:9 desktop stage and the
        # 4:3 mobile crop. SS14.7 puts the "I" one hand's width (48px at >=900, 40px below)
        # LEFT of the tip and the cap-top 4px under it. What is asserted is the distance from
        # the tip to the nearest point of the "I" glyph box, and that the glyph is to the LEFT
        # of the tip -- which is what makes the finger point AT the word instead of past it.
        FINGER_JS = r"""()=>{
            const stg=document.getElementById('stage');
            const b=stg.getBoundingClientRect();
            const v=document.getElementById('filmvid'), cs=getComputedStyle(v);
            const SW=1920, SH=1080, FX=372, FY=413;
            const sc=Math.max(b.width/SW, b.height/SH);
            const op=cs.objectPosition.split(' ');
            const ox=b.x+(b.width-SW*sc)*(parseFloat(op[0])/100);
            const oy=b.y+(b.height-SH*sc)*(parseFloat(op[1])/100);
            const fx=ox+FX*sc, fy=oy+FY*sc;
            const h1=document.getElementById('h1');
            const hb=h1.getBoundingClientRect();
            const rows=[...h1.querySelectorAll('.r')];
            /* SS16.2: the glyph the finger points at is the "g" of go-to-market., on the
               COPPER row. The row span is display:block, so ITS box is the line box (a
               Range rect is the font's own ascent+descent box and sits ~8px higher at
               1440). ROUND 10: what SS16.2 pins 4px under the tip is that row's own INK
               top -- the top of the lowercase "g", --xk of the font size below the line
               box -- and NOT the cap line. Pinned to the cap line, "its tip touches the g"
               was false by 15-16px at every width, because "g" has no ink at cap height.
               The ink top is also, by SS16.2's own parenthesis, where the veil goes solid
               ("the copper row's ground"), so the finger's last lit pixel and the g's
               first copper pixel are the same row. */
            const tn=[...rows[1].childNodes].filter(n=>n.nodeType===3&&n.textContent.trim())[0];
            const rg=document.createRange(); rg.setStart(tn,0); rg.setEnd(tn,1);
            const g=rg.getBoundingClientRect();
            const lineBox=rows[1].getBoundingClientRect();
            const xk=parseFloat(getComputedStyle(document.documentElement)
                        .getPropertyValue('--xk'))||0.1404;
            const capTop=lineBox.y+xk*parseFloat(getComputedStyle(h1).fontSize);
            const dx=(g.x<=fx&&fx<=g.right)?0:Math.min(Math.abs(fx-g.x),Math.abs(fx-g.right));
            const dy=(capTop<=fy&&fy<=g.bottom)?0:Math.min(Math.abs(fy-capTop),
                                                           Math.abs(fy-g.bottom));
            const ink=r=>{const q=document.createRange(); q.selectNodeContents(r);
                          return q.getBoundingClientRect();};
            const hc=document.getElementById('herocopy').getBoundingClientRect();
            const lede=document.querySelector('.hero-copy .lede').getBoundingClientRect();
            const chips=document.getElementById('herochips').getBoundingClientRect();
            const proof=document.getElementById('heroproof').getBoundingClientRect();
            return {stage:{x:b.x,y:b.y,w:b.width,h:b.height,right:b.right,bottom:b.bottom},
                    objpos:cs.objectPosition, fit:cs.objectFit,
                    fx:fx, fy:fy,
                    fpct:[(fx-b.x)/b.width*100,(fy-b.y)/b.height*100],
                    I:[g.x,capTop,g.right,g.bottom],
                    capTop:capTop, capDelta:capTop-fy,
                    euclid:Math.hypot(dx,dy), dx:dx, dy:dy, Ileft:g.x<fx,
                    h1Box:[hb.x,hb.y,hb.right,hb.bottom],
                    rows:rows.map(r=>{const k=ink(r);
                       return {t:r.textContent.trim(), x:k.x, right:k.right, w:k.width,
                               n:r.getClientRects().length, gutter:b.right-k.right};}),
                    srcWindow:[(b.x-ox)/sc,(b.right-ox)/sc],
                    copyTop:hc.y, ledeX:lede.x, chipsX:chips.x, proofRight:proof.right,
                    scrollW:document.documentElement.scrollWidth, iw:window.innerWidth};}"""
        pt = {}
        for W in (1280, 1440, 1920):
            pg.set_viewport_size({"width": W, "height": 900})
            pg.wait_for_timeout(500)
            pt[W] = pg.evaluate(FINGER_JS)
        gink = {}
        for W in (1280, 1440, 1920):
            pg.set_viewport_size({"width": W, "height": 900})
            pg.wait_for_timeout(400)
            gink[W] = tip_to_g_ink(pg, os.path.join(SCRATCH, "vfy", "_gink_%d.png" % W))
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(300)
        chk("16.2-tip-touches-the-g-ink",
            all(g is not None and g["dist"] <= 10.0 for g in gink.values()),
            "SS16.2 \"its tip touches the 'g'\", measured in PIXELS against the leading "
            "glyph's own ink mask (the row painted black on white at full opacity), NOT "
            "against a Range box: "
            + "; ".join(
                "%d: tip (%.0f, %.0f), nearest ink pixel of the \"g\" at (%.0f, %.0f), "
                "%.1fpx (<=10); the g's ink top %.1fpx under the tip"
                % (W, gink[W]["fx"], gink[W]["fy"], gink[W]["at"][0], gink[W]["at"][1],
                   gink[W]["dist"], gink[W]["gInkTop"] - gink[W]["fy"])
                if gink[W] else "%d: not measurable" % W
                for W in (1280, 1440, 1920)))
        chk("16.2-fingertip-to-g",
            all(v["euclid"] <= 60 and v["Ileft"] and abs(v["capDelta"] - 4) <= 1.0
                for v in pt.values()),
            "tip -> nearest point of the \"g\" glyph box, the glyph LEFT of the tip, and the "
            "copper row's INK top 4px UNDER the tip: "
            + "; ".join(
                "%d: tip (%.0f, %.0f), g box [%.0f %.0f %.0f %.0f], dx %.1f dy %.1f, "
                "euclid %.1fpx (<=60), g left of tip=%s, ink-top %+.1fpx off the tip"
                % (W, pt[W]["fx"], pt[W]["fy"], pt[W]["I"][0], pt[W]["I"][1], pt[W]["I"][2],
                   pt[W]["I"][3], pt[W]["dx"], pt[W]["dy"], pt[W]["euclid"], pt[W]["Ileft"],
                   pt[W]["capDelta"])
                for W in (1280, 1440, 1920)))
        chk("14.7-copper-row-inside-stage",
            all(v["rows"][1]["gutter"] >= 32 and v["rows"][1]["n"] == 1 for v in pt.values()),
            "'go-to-market.' right end vs the stage's right edge (SS14.7 wants >=32px): "
            + "; ".join(
                "%d: row ends %.0f, stage ends %.0f, %.0fpx inside, %d client rect"
                % (W, pt[W]["rows"][1]["right"], pt[W]["stage"]["right"],
                   pt[W]["rows"][1]["gutter"], pt[W]["rows"][1]["n"])
                for W in (1280, 1440, 1920)))
        chk("14.7-sentence-and-chips-share-the-left-edge",
            all(abs(v["ledeX"] - v["I"][0]) <= 1.5 and abs(v["chipsX"] - v["I"][0]) <= 1.5
                and v["proofRight"] >= v["stage"]["right"] - 34 for v in pt.values()),
            "; ".join("%d: g at %.0f, sentence at %.0f, chips at %.0f, proof row ends %.0f "
                      "(stage ends %.0f, gutter 32)"
                      % (W, pt[W]["I"][0], pt[W]["ledeX"], pt[W]["chipsX"],
                         pt[W]["proofRight"], pt[W]["stage"]["right"])
                      for W in (1280, 1440, 1920)))

        # ---- 03 hero veil contrast at frames 0 / 48 / 96 ---------------------
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(600)
        bone_min, cop_min, cop_px, det = 99, 99, 0, []
        for fr in (0, 48, 96):
            t = set_frame(pg, "filmvid", fr)
            b = bg_contrast(pg, "#h1 .r:nth-child(1)", os.path.join(SCRATCH, "vfy", "_b.png"))
            c = ground_from_cap(pg, "#h1 .r.cu", os.path.join(SCRATCH, "vfy", "_c.png"))
            if b:
                bone_min = min(bone_min, b)
            if c:
                cop_min = min(cop_min, c[0])
                cop_px = max(cop_px, c[1])
            det.append("f%d(t=%.2fs) bone %.2f | copper ground %.2f, brightest channel %d"
                       % (fr, t or 0, b or 0, c[0] if c else 0, c[1] if c else 0))
        chk("16.2-hero-lighting", bone_min >= 4.5 and cop_min >= 4.3 and cop_px <= 16,
            "SS16.2: the bone row is over the film on the veiled wall, the copper row is on "
            "the veil's solid ground. bone row min %.2f:1 (>=4.5); the copper row's ground "
            "from its cap-top (= fingertip_y + 4px, the stop SS16.2 pins) down is FLAT "
            "espresso -- brightest channel %d of 255 (#0D0D0F is 15) -- carrying copper at "
            "%.2f:1, which is the brief's own measured copper-on-espresso figure | %s"
            % (bone_min, cop_px, cop_min, "; ".join(det)))

        # ---- 02b the hero block must never reach section 02 ------------------
        # SS18 round 12: the block is IN FLOW and carries the 56px, so the hero's
        # foot IS the block's foot -- gap 0 by construction, and what has to hold is
        # that nothing of section 02 is above it and the section's own air follows.
        clear = []
        for W in (1440, 1280, 1024, 900, 390):
            pg.set_viewport_size({"width": W, "height": 900})
            pg.wait_for_timeout(400)
            g = pg.evaluate("""()=>{const c=document.getElementById('herocopy')
                    .getBoundingClientRect();
                const o=document.getElementById('operator').getBoundingClientRect();
                const s=document.getElementById('opstage').getBoundingClientRect();
                const w=document.getElementById('stagewrap').getBoundingClientRect();
                return {gap:o.top-c.bottom, air:s.top-c.bottom, over:c.bottom-w.bottom};}""")
            clear.append((W, g["gap"], g["air"], g["over"]))
        air = pg.evaluate("()=>parseFloat(getComputedStyle(document.documentElement)"
                          ".getPropertyValue('--s'))")
        chk("14.1-hero-clearance",
            all(gap >= 0 and abs(over) <= 0.5 for _, gap, _, over in clear),
            "hero block foot -> operator top: " + ", ".join(
                "%d: %+.0fpx (first operator ink %+.0fpx below, block %+.0fpx past the "
                "wrap's foot)" % c for c in clear)
            + " -- the block is in flow and IS the hero's foot, so section 02 opens on its "
              "own %.0fpx of entry air and nothing overlaps." % air)
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(400)

        # ---- 02c SS18 "stage padding-bottom 56px": the hole, mechanically ----
        # Round 12 send-back: the 56px was declared on a block that is out of flow
        # inside a fixed 16:9 wrap, so it closed nothing and 149px of solid film sat
        # under the proof line. The gate measures what the eye measured: the proof
        # label's box foot to the hero's own foot. 56px + the label's descender.
        holes = []
        for W in (1440, 1280, 1024, 900, 390):
            pg.set_viewport_size({"width": W, "height": 900})
            pg.wait_for_timeout(400)
            h = pg.evaluate("""()=>{const p=document.getElementById('heroproof');
                const r=document.getElementById('room');
                return r.getBoundingClientRect().bottom
                       - p.getBoundingClientRect().bottom;}""")
            holes.append((W, h))
        chk("18-hero-hole-56", all(h <= 66 for _, h in holes),
            "SS18 'stage padding-bottom 56px'. Proof label's box foot -> the hero's own "
            "foot (the seam): " + ", ".join("%d: %.1fpx" % c for c in holes)
            + " -- 56px of declared air plus the label's own line-box descender, at every "
              "width; the wrap is content-sized and the film is cropped to it.")
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(400)

        # ---- 02d SS18: every buy row carries its copper arrow ----------------
        rows = pg.evaluate("""()=>[...document.querySelectorAll('.buyledger .brow')]
            .map(b=>{const a=b.querySelector('.ar');
              return {lb:b.querySelector('.lb').textContent.trim(),
                      w:+a.getBoundingClientRect().width.toFixed(1),
                      gl:(a.textContent||'').trim(),
                      col:getComputedStyle(a).color};})""")
        cop = pg.evaluate("()=>getComputedStyle(document.documentElement)"
                          ".getPropertyValue('--copper').trim()")
        chk("18-buy-rows-arrow",
            len(rows) == 3 and all(r["gl"] == "→" and abs(r["w"] - 44) <= 1
                                   for r in rows),
            "SS18: 'each label left, value right, a copper -> in a 44px ruled cell'. "
            + "; ".join("%r: cell %.1fpx glyph %r %s" % (r["lb"], r["w"], r["gl"], r["col"])
                        for r in rows) + " (--copper %s)" % cop)

        # ---- 02e SS16.3: the newcomers join the motion set -------------------
        mv = pg.evaluate("""()=>{const g=e=>{const c=getComputedStyle(e);
              return {tr:c.transitionDuration, tf:c.transform, op:c.opacity};};
            const b=document.querySelector('.buyledger');
            const o=document.querySelector('.proofsec .out');
            const r2=document.querySelectorAll('.buyledger .brow')[1];
            const pb=getComputedStyle(r2,'::before');
            return {ledger:g(b), out:g(o),
                    row:{c:pb.content, tr:pb.transitionDuration, tf:pb.transform},
                    js:document.documentElement.classList.contains('js')};}""")
        def moves(d):
            return d["tr"] != "0s" and d["tf"] != "none"
        chk("18-newcomers-move",
            mv["js"] and moves(mv["ledger"]) and moves(mv["out"])
            and mv["row"]["c"] != "none" and mv["row"]["tr"] != "0s",
            "SS16.3-4/5, before the section enters. buy ledger: transition %s, rest %s, "
            "opacity %s | 'See the rest': transition %s, rest %s, opacity %s | its row-2 "
            "rule: content %s, transition %s, rest %s -- the block rises and the rules draw."
            % (mv["ledger"]["tr"], mv["ledger"]["tf"], mv["ledger"]["op"],
               mv["out"]["tr"], mv["out"]["tf"], mv["out"]["op"],
               mv["row"]["c"], mv["row"]["tr"], mv["row"]["tf"]))

        # ---- 03b the gesture has to survive the veil -------------------------
        set_frame(pg, "filmvid", 96)
        pg.evaluate("()=>window.scrollTo(0,0)")
        pg.wait_for_timeout(500)
        vis = finger_emerges(pg, os.path.join(SCRATCH, "vfy", "_finger.png"))
        # SS16.2 supersedes SS14.1's hand check: the veil is now SOLID from the fingertip's
        # own row +4px, so the hand below the tip is inside the dark BY DESIGN ("the hand
        # emerges from the dark and its tip touches the g"). What is measured instead is
        # the veil's own alpha profile against the two stops SS16.2 pins.
        veil = veil_profile(pg, os.path.join(SCRATCH, "vfy", "_veil.png"))
        chk("16.2-veil-cut",
            veil is not None and abs(veil["a_m12"] - 0.55) <= 0.03
            and veil["a_p4"] >= 0.995 and veil["a_bone_top"] >= 0.52,
            "1440, the veil measured directly (the film replaced by flat white, so alpha = "
            "(255 - pixel) / 242): %.3f at fingertip_y - 12px (SS16.2 pins .55), %.3f at "
            "fingertip_y + 4px (SS16.2 pins solid), %.3f at the bone row's own box top "
            "(what carries that row at >=4.5:1), %.3f 40px above the tip, %.3f 40px below"
            % (veil["a_m12"], veil["a_p4"], veil["a_bone_top"], veil["a_m40"], veil["a_p40"])
            if veil else "veil profile could not be measured")
        he = hand_emerges(pg, os.path.join(SCRATCH, "vfy", "_hand_raw.png"),
                          os.path.join(SCRATCH, "vfy", "_hand_cmp.png"))
        chk("16.2-hand-emerges",
            he is not None and he["frac"] >= 0.25 and he["below_share"] >= 0.35,
            "SS16.2 \"the hand emerges from the dark\", 1440 at the hold frame. The "
            "hand-and-arm silhouette is taken from the film with the veil OFF; %d of %d of "
            "its pixels still read >=8 levels off the wall on their own row once the veil "
            "is composited (%.1f%%, gate 25%%), and %.1f%% of those sit BELOW the fingertip "
            "(gate 35%%) -- the half round 9 painted out entirely (1.7%% survived there, "
            "100%% of it above the tip). The veil holds solid across the copper row's own "
            "box and reopens under it, so the wrist, the forearm and the table come back."
            % (he["sur"], he["tot"], he["frac"] * 100, he["below_share"] * 100)
            if he else "the hand silhouette could not be sampled")
        chk("16.2-fingertip-emerges", vis and vis["rel"] >= 0.15,
            "1440, hold frame: inside the 18px of ramp still lit above the tip, the finger "
            "reads a median %.0f%% darker than the wall on the same row (>=15%%, the "
            "scale-free form of SS14.1's old 25-of-145 step), peaking at a %.0f-level "
            "absolute step; per-row (wall, finger, rel): %s. Below fingertip_y + 4px the "
            "veil is solid by SS16.2's own ruling, so the hand is in the dark there BY "
            "DESIGN and only the tip is lit."
            % (vis["rel"] * 100, vis["absmax"],
               [(int(a), int(b), round(c, 2)) for a, b, c in vis["rows"][::3]])
            if vis else "the fingertip band could not be sampled")

        # ---- 05/06 operator overlay -----------------------------------------
        pg.evaluate("()=>document.getElementById('operator').scrollIntoView()")
        pg.wait_for_timeout(900)
        opm = pg.evaluate("""()=>{
            const s=document.getElementById('opstage'), o=document.getElementById('opover');
            const h=document.getElementById('oph2');
            const side=document.querySelector('.opside');
            const lead=document.querySelector('.opside .lead');
            const sig=document.querySelector('.opside .sig');
            const p1=document.querySelector('.opside .first');
            const grid=document.querySelector('.opgrid');
            const cols=getComputedStyle(grid).gridTemplateColumns.split(' ').map(parseFloat);
            const cgap=parseFloat(getComputedStyle(grid).columnGap);
            const want17=cols.slice(0,7).reduce((a,b)=>a+b,0)+6*cgap;
            const sr=s.getBoundingClientRect(), hr=h.getBoundingClientRect();
            const p1r=p1?p1.getBoundingClientRect():null;
            const kids=[...side.children].map(e=>e.getBoundingClientRect());
            const gaps=kids.slice(1).map((r,i)=>+(r.top-kids[i].bottom).toFixed(1));
            return {sw:sr.width,sh:sr.height,st:sr.top,sb:sr.bottom,sx:sr.x,
                    ht:hr.top,hb:hr.bottom,hx:hr.x,
                    p1t:p1r?p1r.top:null,p1b:p1r?p1r.bottom:null,
                    p1First:side.firstElementChild===p1,
                    p1Fs:p1?parseFloat(getComputedStyle(p1).fontSize):null,
                    onFilm:p1r?(p1r.x>=sr.x&&p1r.right<=sr.right&&p1r.top<sr.bottom):null,
                    gaps:gaps, want17:+want17.toFixed(1),
                    radius:getComputedStyle(document.querySelector('.opfilm')).borderRadius,
                    sidet:side.getBoundingClientRect().top,
                    sideh:side.getBoundingClientRect().height,
                    sidew:side.getBoundingClientRect().width,
                    sideb:side.getBoundingClientRect().bottom,
                    leadt:lead.getBoundingClientRect().top,
                    hasSig:!!sig, ov:getComputedStyle(o).position,
                    hfs:parseFloat(getComputedStyle(h).fontSize),
                    d2:parseFloat(getComputedStyle(document.documentElement)
                        .getPropertyValue('--d2'))||null};}""")
        third = opm["st"] + opm["sh"] * 2 / 3
        # SS18 supersedes SS14.2's square: the film is a 4:5 PORTRAIT in cols 1-7 with an
        # 8px radius (Rule A -- no frame), and the heading is overlaid at the FILM's own
        # left edge rather than at a third edge inset inside it.
        chk("18-op-portrait-4x5-cols-1-7",
            abs(opm["sw"] / opm["sh"] - 0.8) <= 0.005 and opm["ov"] == "absolute"
            and abs(opm["sw"] - opm["want17"]) <= 1.0
            and opm["radius"] == "8px"
            and abs(opm["hx"] - opm["sx"]) <= 0.6
            and opm["ht"] >= third - 12 and opm["hb"] <= opm["sb"] + 2,
            "the film is %.1fx%.1f = %.4f (4:5 wants 0.8000) filling cols 1-7 (%.1f measured "
            "off the grid) with an %s radius and no border; the heading opens at x %.1f, the "
            "film's own left edge (%.1f); its cap row starts %.1f, inside the lower third "
            "(%.1f), and its foot %.1f is inside the film (%.1f); overlay position=%s"
            % (opm["sw"], opm["sh"], opm["sw"] / opm["sh"], opm["want17"], opm["radius"],
               opm["hx"], opm["sx"], opm["ht"], third, opm["hb"], opm["sb"], opm["ov"]))
        # SS18: the first paragraph LEAVES the film and becomes the right column's first
        # row; both columns start on one top line; no gap between rows exceeds 60px.
        chk("18-op-columns",
            opm["p1t"] is not None and opm["p1First"] and not opm["onFilm"]
            and abs(opm["p1Fs"] - 21) < 0.6
            and abs(opm["sidet"] - opm["st"]) <= 1.0
            and abs(opm["leadt"] - opm["sidet"] - (opm["p1b"] - opm["p1t"]) - 28) <= 2
            and max(opm["gaps"]) <= 60 and opm["hasSig"],
            "the first paragraph is the right column's FIRST row (%s) at %.0fpx, off the "
            "film (%s); both columns start on one top line (column %.1f vs film %.1f); the "
            "gaps between the column's rows are %s -- none over 60px (SS18 'no hole'); the "
            "quote is present=%s"
            % (opm["p1First"], opm["p1Fs"], opm["onFilm"], opm["sidet"], opm["st"],
               opm["gaps"], opm["hasSig"]))
        # SS18's operator bullet ends "No hole." HOME-CRITIQUE S03 measured and REJECTED a
        # 410px and a 330px void under the right column and licensed exactly one figure:
        # "that 140px difference reads as deliberate asymmetry, not as a hole. 410px does
        # not." The film's height is not free -- SS18 pins it to cols 1-7 at 4:5 and SS14.7
        # pins the heading to --d2 at wdth 106, whose "not consultant." row is 720.3px of
        # ink, so no narrower film can hold it -- which leaves the right column as the only
        # lever. This is the gate that stops the column from being written short again.
        chk("18-op-no-hole",
            opm["sb"] - opm["sideb"] <= 145,
            "the film's foot is %.1f and the right column's is %.1f: a %.1fpx difference "
            "(HOME-CRITIQUE S03 licenses ~140px as deliberate asymmetry and rejects 330px "
            "and 410px). Film %.1fx%.1f against a column %.1fx%.1f"
            % (opm["sb"], opm["sideb"], opm["sb"] - opm["sideb"],
               opm["sw"], opm["sh"], opm["sidew"], opm["sideh"]))

        ob, det2 = 99, []
        for fr in (0, 48, 96):
            t = set_frame(pg, "opvid", fr)
            v = bg_contrast(pg, "#oph2", os.path.join(SCRATCH, "vfy", "_o.png"))
            if v:
                ob = min(ob, v)
            det2.append("f%d(t=%.2fs) %.2f" % (fr, t or 0, v or 0))
        chk("14.2-op-contrast", ob >= 4.5,
            "heading min %.2f:1 over the film (>=4.5) | %s" % (ob, "; ".join(det2)))

        # ---- 05b/c/d SS14.7: the heading's size, the veil's stops, the rows -----
        opx = pg.evaluate(r"""()=>{
            const h=document.getElementById('oph2');
            const sq=document.getElementById('opstage').getBoundingClientRect();
            const cs=getComputedStyle(h);
            const d=parseFloat(getComputedStyle(document.getElementById('h1')).fontSize);
            const rows=[...h.querySelectorAll('.r')].map(r=>{
                const q=document.createRange(); q.selectNodeContents(r);
                const k=q.getBoundingClientRect();
                return {t:r.textContent.trim(), inkRight:k.right, inkW:k.width,
                        n:r.getClientRects().length};});
            const veil=getComputedStyle(document.querySelector('.opfilm .veil')).backgroundImage;
            const lead=[...document.querySelectorAll('.opside .lead span')].map(
                e=>({h:e.getBoundingClientRect().height,
                     flex:getComputedStyle(e).flexGrow+'/'+getComputedStyle(e).flexBasis}));
            return {fs:parseFloat(cs.fontSize), d2:0.76*d, vs:cs.fontVariationSettings,
                    sqRight:sq.right, sqLeft:sq.x, rows:rows, veil:veil, lead:lead};}""")
        chk("14.7-op-heading-d2-wdth106",
            abs(opx["fs"] - opx["d2"]) < 0.6 and '"wdth" 106' in (opx["vs"] or "")
            and all(r["n"] == 1 for r in opx["rows"])
            and all(r["inkRight"] <= opx["sqRight"] + 0.5 for r in opx["rows"]),
            "heading font-size %.2f == --d2 %.2f at %s; rows %s -- each one client rect, "
            "each ending inside the square (right edge %.1f)"
            % (opx["fs"], opx["d2"], opx["vs"],
               [(r["t"], round(r["inkW"], 1), round(r["inkRight"], 1), r["n"])
                for r in opx["rows"]], opx["sqRight"]))
        stops = [(float(a), float(b)) for a, b in
                 re.findall(r"rgba?\(\s*13,\s*13,\s*15(?:,\s*([\d.]+))?\s*\)\s+([\d.]+)%",
                            opx["veil"].replace("rgb(13, 13, 15)", "rgba(13, 13, 15, 1)"))]
        s60 = [p for a, p in stops if abs(a - 0.6) < 0.001]
        s100 = [p for a, p in stops if a == 1.0]
        cappct = pg.evaluate("""()=>{const s=document.getElementById('opstage')
            .getBoundingClientRect();
            const h=document.getElementById('oph2').getBoundingClientRect();
            const capk=parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--capk'))||0.0591;
            const fs=parseFloat(getComputedStyle(document.getElementById('oph2')).fontSize);
            return +(((h.top+capk*fs)-s.top)/s.height*100).toFixed(2);}""")
        # SS18: "veil solid from the heading's cap-top". SS14.7's 82% stop is superseded --
        # it existed to keep live film behind the heading's top row, and SS18 puts the
        # heading on flat ground instead.
        chk("18-op-veil-solid-at-the-cap-top",
            bool(s60) and abs(s60[0] - 62) < 0.6 and bool(s100)
            and abs(min(s100) - cappct) <= 1.2,
            "the operator veil reaches .6 at %s%% and goes SOLID at %s%%, which is the "
            "heading's own cap-top measured on the film (%.2f%%); every stop: %s"
            % (s60[0] if s60 else "-", min(s100) if s100 else "-", cappct,
               [(a, p) for a, p in stops]))
        hs = [round(r["h"], 1) for r in opx["lead"]]
        chk("14.7-op-rows-auto-height",
            len(set(hs)) > 1 and all(r["flex"].startswith("0/") for r in opx["lead"]),
            "the right column's three register rows take their own height: %s "
            "(flex-grow/basis %s -- 0/auto is auto height; 1/0px was the stretched thirds "
            "SS14.7 removed)" % (hs, [r["flex"] for r in opx["lead"]]))

        # ---- 11 head sizes / air --------------------------------------------
        sizes = pg.evaluate("""()=>{
            const hd0=parseFloat(getComputedStyle(document.getElementById('h1')).fontSize);
            const d2=0.76*hd0;
            const heads=[].map.call(document.querySelectorAll('.sec h2'),
                e=>[e.textContent.trim().slice(0,40), parseFloat(getComputedStyle(e).fontSize)]);
            const names=[].map.call(document.querySelectorAll('.prf .who'),
                e=>parseFloat(getComputedStyle(e).fontSize));
            const q=[].map.call(document.querySelectorAll('.q dt'),
                e=>parseFloat(getComputedStyle(e).fontSize));
            const a=[].map.call(document.querySelectorAll('.q dd'),
                e=>parseFloat(getComputedStyle(e).fontSize));
            const caps=[].map.call(document.querySelectorAll('.cap'),
                e=>parseFloat(getComputedStyle(e).fontSize));
            const air=[].map.call(document.querySelectorAll('.work,.price,.proofsec,.manual,.faq'),
                e=>parseFloat(getComputedStyle(e).paddingTop));
            const hd=parseFloat(getComputedStyle(document.getElementById('h1')).fontSize);
            const ask=parseFloat(getComputedStyle(document.querySelector('.ask .d')).fontSize);
            return {d2:d2,heads:heads,names:names,q:q,a:a,caps:caps,air:air,hd:hd,ask:ask};}""")
        d2 = sizes["d2"]
        headsok = all(abs(h[1] - d2) < 1.0 for h in sizes["heads"]) and len(sizes["heads"]) == 5
        chk("14.4-heads", headsok
            and all(abs(n - 28) < 0.6 for n in sizes["names"])
            # SS15.3 supersedes SS14.4 on the objections: 24px question, 17px answer.
            and all(abs(n - 24) < 0.6 for n in sizes["q"])
            and all(abs(n - 17) < 0.6 for n in sizes["a"])
            # SS18: the receipts' captions take the NAME's size (28px). Rank is colour
            # and column, not size -- locomotive.ca's measured rule.
            and all(abs(n - 28) < 0.6 for n in sizes["caps"])
            and all(abs(x - 120) < 1 for x in sizes["air"]),
            "--d2=%.1f; %d section heads all at --d2 %s; index names %s; FAQ q %s / a %s; "
            "captions %s; section air %s; hero --d=%.1f, ask --d=%.1f (only these two)"
            % (d2, len(sizes["heads"]), [round(h[1], 1) for h in sizes["heads"]],
               sizes["names"], sizes["q"], sizes["a"], sizes["caps"], sizes["air"],
               sizes["hd"], sizes["ask"]))

        # ---- 11b/c/d SS14.7: the FAQ stop, the caption capitals, the middot ----
        tp = pg.evaluate(r"""()=>{
            const faqh=[...document.querySelectorAll('.sec h2')].find(
                e=>/objections/i.test(e.textContent));
            const faqc=faqh?faqh.cloneNode(true):null;
            if(faqc){const c=faqc.querySelector('.count'); if(c) c.remove();}
            const faq=faqc;
            const caps=[...document.querySelectorAll('.prf .cap')].map(e=>e.textContent.trim());
            return {faq:faq?faq.textContent.replace(/\s+/g,' ').trim():null,
                    count:faqh&&faqh.querySelector('.count')
                          ?faqh.querySelector('.count').textContent.trim():null,
                    caps:caps};}""")
        chk("14.7-faq-full-stop", bool(tp["faq"]) and tp["faq"].endswith("."),
            "the FAQ head reads %r, with SS18's count %r set on its last baseline"
            % (tp["faq"], tp["count"]))
        lower = [c for c in tp["caps"] if c and c[0].islower()]
        chk("14.7-captions-initial-capital", not lower,
            "%d index captions, every one opening on a capital: %s"
            % (len(tp["caps"]), [c[:26] for c in tp["caps"]]))

        # the middot: glyph-by-glyph line grouping, so "last thing on a line" is measured,
        # not inferred from where the nbsp were put.
        MID_JS = r"""()=>{
            const h=[...document.querySelectorAll('.sec h2')].find(
                e=>/How I work/.test(e.textContent));
            const tn=[...h.childNodes].filter(n=>n.nodeType===3)[0];
            const t=tn.textContent, rg=document.createRange(), rows={};
            for(let i=0;i<t.length;i++){
              if(!t[i].trim()) continue;
              rg.setStart(tn,i); rg.setEnd(tn,i+1);
              const r=rg.getBoundingClientRect(); const k=Math.round(r.y);
              (rows[k]=rows[k]||[]).push([t[i], r.right]);}
            return Object.keys(rows).map(k=>{
              const a=rows[k].slice().sort((p,q)=>q[1]-p[1]);
              return {y:+k, line:rows[k].map(p=>p[0]).join(''), last:a[0][0]};});}"""
        mid = {}
        for W in (1920, 1440, 1280, 900, 390, 360):
            pg.set_viewport_size({"width": W, "height": 900})
            pg.wait_for_timeout(450)
            pg.evaluate("()=>document.getElementById('work').scrollIntoView({block:'start'})")
            pg.wait_for_timeout(400)
            mid[W] = pg.evaluate(MID_JS)
        # ROUND-9 RULE CHANGE (operator, 2026-09-06): "the how-I-work head ... on the same
        # width axis as the other section heads (wdth 115) at every width; it may wrap to
        # two lines; the middot rule (never alone at a line end) still holds."
        # So the ONE-LINE clause is gone -- it was what forced this head to wdth 88 on the
        # desktop and 68 on the phone, i.e. NARROWER than the step names under it. What
        # survives is the separator condition, and it is still measured glyph by glyph:
        # the middot can neither END a row nor OPEN one, at any width. The width axis is
        # asserted with it, because dropping the one-line clause is only correct if the
        # head is actually back in the section-head register.
        WW = (1920, 1440, 1280, 900, 390, 360)
        # SS18 retires the middot outright: the eyebrow `Operating principles` and the head
        # `How I work.` are the two halves of the template's own string, and the separator
        # that glued them is gone. What used to be "never last, never first" is now "never
        # present", and the head has to hold ONE line at 1440 and at 390.
        never_last = all("\u00b7" not in l["line"] for W in WW for l in mid[W])
        never_first = all(len(mid[W]) == 1 for W in WW)
        axis = pg.evaluate(r"""()=>{const o={};
            document.querySelectorAll('.sec h2').forEach(h=>{
              o[(h.closest('[id]')||{}).id||'?']=getComputedStyle(h).fontVariationSettings;});
            return o;}""")
        one_axis = len(set(axis.values())) == 1 and '"wdth" 115' in set(axis.values()).pop()
        eyeb = pg.evaluate("""()=>{const e=document.querySelector('#work .sec .eyebrow .l');
            const h=document.querySelector('#work .sec h2');
            const sec=document.querySelector('#work .sec');
            return {t:e?e.textContent.trim():null,
                    fs:e?parseFloat(getComputedStyle(e).fontSize):null,
                    tr:e?getComputedStyle(e).textTransform:null,
                    gap:parseFloat(getComputedStyle(sec).rowGap||getComputedStyle(sec).gap),
                    head:h.textContent.trim()};}""")
        chk("18-work-head-eyebrow-one-line-no-middot",
            one_axis and never_last and never_first
            and eyeb["t"] == "Operating principles" and eyeb["tr"] == "uppercase"
            and abs(eyeb["fs"] - 14) < 0.6 and abs(eyeb["gap"] - 20) <= 0.6
            and eyeb["head"] == "How I work.",
            "the eyebrow %r is the label style (%.0fpx, %s) %.0fpx above the head %r, which "
            "holds ONE line at every width and carries no middot; every section head on one "
            "width axis: %s. Rows, glyph-grouped: %s"
            % (eyeb["t"], eyeb["fs"], eyeb["tr"], eyeb["gap"], eyeb["head"],
               json.dumps(axis),
               "; ".join("%d: %d row(s) %s" % (W, len(mid[W]),
                         [l["line"] for l in mid[W]]) for W in WW)))
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(400)

        # ---- 15.5 the cards, pronounced -------------------------------------
        # SS15.5 supersedes SS14.5/SS14.7 here. The cards get a ground -- 1px hairline at
        # 15% ink, 8px radius, 28px of interior -- the package name comes off the label
        # style onto 24px Hanken 500, and the price goes to 72. SS14.7's gutter pin went
        # with the borderless card it was written for: a bordered box hanging 25px into the
        # page gutter is a mistake, so the row sits in the content width and each card is
        # (content - 48)/3, which is the geometry SS15.3 then borrows for the objections.
        cd = pg.evaluate(r"""()=>{
            const cards=[].slice.call(document.querySelectorAll('.card'));
            const sec=document.querySelector('.price');
            const gut=parseFloat(getComputedStyle(sec).paddingLeft);
            const content=sec.getBoundingClientRect().width - 2*gut;
            const chipInk=t=>{const q=document.createRange(); q.selectNodeContents(t);
                              return q.getBoundingClientRect().width;};
            const row=document.getElementById('cards').getBoundingClientRect();
            return {w:cards.map(c=>c.getBoundingClientRect().width),
              x:cards.map(c=>+c.getBoundingClientRect().x.toFixed(1)),
              right:cards.map(c=>+c.getBoundingClientRect().right.toFixed(1)),
              chipTops:cards.map(c=>c.querySelector('.cta .chip').getBoundingClientRect().top),
              chipH:cards.map(c=>c.querySelector('.cta .chip').getBoundingClientRect().height),
              chipW:cards.map(c=>c.querySelector('.cta .chip').getBoundingClientRect().width),
              inner:cards.map(c=>{const cs=getComputedStyle(c);
                 return c.getBoundingClientRect().width - parseFloat(cs.paddingLeft)
                        - parseFloat(cs.paddingRight) - parseFloat(cs.borderLeftWidth)
                        - parseFloat(cs.borderRightWidth);}),
              chipT:cards.map(c=>{const ch=c.querySelector('.cta .chip').cloneNode(true);
                 const g=ch.querySelector('.gl'); if(g) g.remove();
                 return ch.textContent.replace(/\s+/g,' ').trim();}),
              chipFits:cards.map(c=>{const t=c.querySelector('.cta .chip');
                 return chipInk(t)<=t.getBoundingClientRect().width+0.5;}),
              chipSquares:cards.map(c=>c.querySelectorAll('.cta .chip .a').length),
              mini:cards.map(c=>{const m=c.querySelector('.mini');
                 return m?{t:m.textContent.trim(),
                           bw:getComputedStyle(m).borderTopWidth,
                           bc:getComputedStyle(m).borderTopColor,
                           col:getComputedStyle(m).color,
                           rad:getComputedStyle(m).borderRadius,
                           inline:Math.abs(m.getBoundingClientRect().top
                             - c.querySelector('.nm').getBoundingClientRect().top)<24}:null;}),
              nameFs:cards.map(c=>parseFloat(getComputedStyle(c.querySelector('.nm')).fontSize)),
              nameFam:cards.map(c=>getComputedStyle(c.querySelector('.nm')).fontFamily),
              nameWt:cards.map(c=>getComputedStyle(c.querySelector('.nm')).fontWeight),
              pr:cards.map(c=>parseFloat(getComputedStyle(c.querySelector('.pr')).fontSize)),
              pad:cards.map(c=>getComputedStyle(c).padding),
              radius:cards.map(c=>getComputedStyle(c).borderRadius),
              borders:cards.map(c=>{const st=getComputedStyle(c);
                 return [st.borderTopWidth+' '+st.borderTopColor,
                         st.borderRightWidth+' '+st.borderRightColor,
                         st.borderBottomWidth+' '+st.borderBottomColor,
                         st.borderLeftWidth+' '+st.borderLeftColor];}),
              mark:cards.map(c=>c.classList.contains('mark')),
              hairPx:(()=>{const d=document.createElement('div');
                 d.style.cssText='color:var(--hair)';
                 document.querySelector('.price').appendChild(d);
                 const v=getComputedStyle(d).color; d.remove(); return v;})(),
              rowX:+row.x.toFixed(1), rowW:+row.width.toFixed(1),
              content:content, gutter:gut, vw:window.innerWidth};}""")
        wexp = (cd["content"] - 48) / 3.0
        spread = max(cd["chipTops"]) - min(cd["chipTops"])
        widths_eq = max(cd["w"]) - min(cd["w"]) <= 0.8 and abs(cd["w"][0] - wexp) <= 1.0
        # the border is color-mix(ink 15%), which computes to an rgba carrying alpha 0.15
        hair_ok = all(bd.startswith("1px") and "0.15" in bd
                      for i in (0, 2) for bd in cd["borders"][i])
        chk("18-cards",
            widths_eq and spread <= 2.0
            and all(abs(f - 72) < 0.6 for f in cd["pr"])
            and all(abs(f - 24) < 0.6 for f in cd["nameFs"])
            and all("Hanken" in f for f in cd["nameFam"])
            and all(w == "500" for w in cd["nameWt"])
            and all(r == "8px" for r in cd["radius"])
            # SS18 deletes the 2px top rule, so every card's padding is a plain 28px.
            and all(pp.startswith("28px") for pp in cd["pad"])
            and all(k == 0 for k in cd["chipSquares"])
            and hair_ok
            and all(abs(cw - iw) <= 0.6 for cw, iw in zip(cd["chipW"], cd["inner"]))
            and abs(cd["rowX"] - cd["gutter"]) <= 0.6
            and abs(cd["rowW"] - cd["content"]) <= 1.0,
            "1440: widths %s (each wants (content - 48)/3 = %.1f of a %.0f content); the row "
            "sits IN the content width (x %.1f == the %.0fpx gutter, width %.1f); borders %s "
            "-- 1px at 15%% ink, which computes %s; radius %s; padding %s; name %s at %s / "
            "weight %s; price %s; the chip is the full card interior %s vs %s; CTA tops "
            "spread %.2fpx"
            % ([round(x, 1) for x in cd["w"]], wexp, cd["content"], cd["rowX"], cd["gutter"],
               cd["rowW"], cd["borders"][0], cd["hairPx"], set(cd["radius"]), cd["pad"],
               cd["nameFs"], [f.split(",")[0] for f in cd["nameFam"]], cd["nameWt"], cd["pr"],
               [round(x, 1) for x in cd["chipW"]], [round(x, 1) for x in cd["inner"]], spread))
        marked = [i for i, m in enumerate(cd["mark"]) if m]
        # SS18 supersedes SS15.5's 2px top rule: the Audit carries EXACTLY TWO devices, the
        # 1px copper border on all four sides and the inline `Start here` pill on the name
        # line (warp.dev's measured pair -- a ring and an inline pill, never a third).
        mini = cd["mini"]
        box_ok = (marked == [1]
                  and all(bd.startswith("1px") and "200, 84, 43" in bd
                          for bd in cd["borders"][1])
                  and not any("200, 84, 43" in bd for i in (0, 2) for bd in cd["borders"][i]))
        pill_ok = (mini[1] and mini[1]["t"] == "Start here" and mini[1]["inline"]
                   and mini[1]["bw"] == "1px" and "200, 84, 43" in mini[1]["bc"]
                   and "200, 84, 43" in mini[1]["col"] and mini[1]["rad"] == "999px"
                   and mini[0] is None and mini[2] is None)
        chk("18-audit-two-devices", box_ok and pill_ok,
            "the Audit's four borders are %s -- 1px COPPER on all four sides (SS18 deletes "
            "the 2px top rule) -- and its second and last device is the inline pill %s on "
            "the name line; the other two cards carry neither (%s / %s, mini %s / %s)"
            % (cd["borders"][1], mini[1], cd["borders"][0], cd["borders"][2],
               mini[0], mini[2]))
        pk = open(PACKAGES, encoding="utf-8").read()
        live = re.findall(r'(?<!aria-)label="([^"]*)"', pk)
        chk("14.7-chip-labels-are-the-live-buttons",
            cd["chipT"] == live,
            "the three card chips read %s; app/(foyer)/packages/page.tsx renders %s "
            "(BuyButton appends the arrow, which the chip carries as its own glyph); each "
            "label fits its chip without clipping: %s"
            % (cd["chipT"], live, cd["chipFits"]))

        # ---- 15.5b Engagements: the top tier ---------------------------------
        eb = pg.evaluate(r"""()=>{const e=document.getElementById('ebar');
            const r=e.getBoundingClientRect(), cs=getComputedStyle(e);
            const cards=document.querySelector('.cards').getBoundingClientRect();
            const hd=e.querySelector('.nm'), v=e.querySelector('.pr');
            const dsc=e.querySelector('.one'), chip=e.querySelector('.chip');
            const card=document.querySelector('.card');
            const ccs=getComputedStyle(card);
            const d2=0.76*parseFloat(getComputedStyle(document.getElementById('h1')).fontSize);
            const runs=[];
            const w=document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
            const cvs=document.createElement('canvas'); cvs.width=cvs.height=1;
            const c2=cvs.getContext('2d');
            const comp=(fg,bg)=>{c2.clearRect(0,0,1,1); c2.fillStyle=bg; c2.fillRect(0,0,1,1);
              c2.fillStyle=fg; c2.fillRect(0,0,1,1);
              const d=c2.getImageData(0,0,1,1).data;
              return 'rgb('+d[0]+', '+d[1]+', '+d[2]+')';};
            let n; while((n=w.nextNode())){
              const t=n.textContent.replace(/\s+/g,' ').trim(); if(!t) continue;
              const el=n.parentElement, st=getComputedStyle(el);
              const bg=(()=>{let q=el; while(q&&q!==document.body){
                            const c=getComputedStyle(q).backgroundColor;
                            if(c && c!=='rgba(0, 0, 0, 0)' && c!=='transparent') return c;
                            q=q.parentElement;} return 'rgb(13, 13, 15)';})();
              runs.push({t:t, color:comp(st.color, bg), raw:st.color,
                         fs:parseFloat(st.fontSize),
                         hidden:!!el.closest('[aria-hidden="true"]'), bg:bg});}
            return {tag:e.tagName, href:e.getAttribute('href'),
                    links:e.querySelectorAll('a').length,
                    chips:e.querySelectorAll('.chip').length,
                    squares:e.querySelectorAll('.chip .a').length,
                    pad:cs.padding, cardPad:ccs.padding, cardRad:ccs.borderRadius,
                    nameFam:getComputedStyle(hd).fontFamily,
                    nameWt:getComputedStyle(hd).fontWeight,
                    chipH:+chip.getBoundingClientRect().height.toFixed(1),
                    h:r.height, w:r.width, gapAbove:r.top-cards.bottom, cardsW:cards.width,
                    radius:cs.borderRadius, bg:cs.backgroundColor, color:cs.color,
                    bt:cs.borderTopWidth+' '+cs.borderTopColor,
                    bo:[cs.borderRightWidth,cs.borderBottomWidth,cs.borderLeftWidth],
                    hdFs:parseFloat(getComputedStyle(hd).fontSize), d2:d2,
                    hdX:hd.getBoundingClientRect().x,
                    dscFs:parseFloat(getComputedStyle(dsc).fontSize),
                    vFs:parseFloat(getComputedStyle(v).fontSize),
                    vRight:v.getBoundingClientRect().right,
                    chipT:chip.textContent.replace(/\s+/g,' ').trim(),
                    chipRight:chip.getBoundingClientRect().right,
                    mid:r.x+r.width/2, runs:runs};}""")

        def run_ratio(rr):
            return ratio(lum(*parse_rgb(rr["color"])), lum(*parse_rgb(rr["bg"])))

        runs = [(rr["t"][:34], round(run_ratio(rr), 2), rr["fs"], rr["hidden"])
                for rr in eb["runs"]]
        # Every WORD run has to clear 4.5. The one decorative glyph is the chip's arrow: it
        # is aria-hidden, it is 24px (large text) and it is bone on copper, which is the
        # accent's own ceiling -- SS11 already ruled copper large text at >= 3:1, and no
        # tuning moves it, because copper reaches only 4.41 against espresso and 3.85
        # against bone. It is reported by name at its measured ratio, never folded in.
        words = [rr for rr in eb["runs"] if not rr["hidden"]]
        glyphs = [rr for rr in eb["runs"] if rr["hidden"]]
        worst_word = min([run_ratio(rr) for rr in words] or [0])
        worst_glyph = min([run_ratio(rr) for rr in glyphs] or [99])
        # SS18 supersedes SS15.5's plate: Engagements is the FOURTH OBJECT IN THE SAME
        # SYSTEM as the three cards -- the same 8px radius, the same 28px padding, the name
        # at 24px Hanken 500, the figure in the PRICE's slot at 72px, ONE chip -- special by
        # ground and connected by grammar. The 16px radius, the 220px floor and the 2px
        # copper top rule are all deleted; height is by content.
        chk("18-engagements-same-system",
            eb["tag"] == "A" and eb["links"] == 0
            and abs(eb["w"] - eb["cardsW"]) <= 1.0
            and abs(eb["gapAbove"] - 24) <= 1.0 and eb["radius"] == "8px"
            and eb["radius"] == eb["cardRad"]
            and eb["pad"].startswith("28px") and eb["cardPad"].startswith("28px")
            and "200, 84, 43" not in eb["bt"]
            and "13, 13, 15" in eb["bg"]
            and abs(eb["hdFs"] - 24) < 0.6 and "Hanken" in eb["nameFam"]
            and eb["nameWt"] == "500"
            and abs(eb["dscFs"] - 17) < 0.6
            and abs(eb["vFs"] - 72) < 0.6
            and eb["chips"] == 1 and eb["squares"] == 0
            and abs(eb["chipH"] - 48) < 0.6
            and eb["hdX"] < eb["mid"] and eb["chipRight"] > eb["mid"]
            and worst_word >= 4.5 and worst_glyph >= 3.0,
            "one <%s> with %d links inside it -> %s; %.1fpx wide == the cards row %.1f, "
            "%.1fpx below it, %.0fpx tall BY CONTENT (SS18 deletes the 220px floor); radius "
            "%s == the card's %s and padding %s == the card's %s; NO copper top rule (top "
            "border reads %s); ground %s; 'Engagements' at %.1fpx %s %s (the card's name "
            "register, not --d2 %.1f) on the LEFT (x %.0f of a midline %.0f) with the "
            "descriptor at %.0fpx; the figure at %.0fpx in the price's slot and ONE chip %r "
            "(%d chip, %d bolted squares, %.0fpx tall) on the RIGHT; every word run >= "
            "%.2f:1 and the one aria-hidden arrow at %.2f:1. Runs: %s"
            % (eb["tag"], eb["links"], eb["href"], eb["w"], eb["cardsW"], eb["gapAbove"],
               eb["h"], eb["radius"], eb["cardRad"], eb["pad"], eb["cardPad"], eb["bt"],
               eb["bg"], eb["hdFs"], eb["nameFam"].split(",")[0], eb["nameWt"], eb["d2"],
               eb["hdX"], eb["mid"], eb["dscFs"], eb["vFs"], eb["chipT"], eb["chips"],
               eb["squares"], eb["chipH"], worst_word, worst_glyph, runs))

        # ---- 15.3 the objections: three equal columns ------------------------
        fq = pg.evaluate(r"""()=>{
            const qs=[].slice.call(document.querySelectorAll('.q'));
            const sec=document.querySelector('.faq');
            const gut=parseFloat(getComputedStyle(sec).paddingLeft);
            const content=sec.getBoundingClientRect().width-2*gut;
            const dl=document.querySelector('.qs');
            return {n:qs.length, w:qs.map(e=>+e.getBoundingClientRect().width.toFixed(2)),
                    tops:qs.map(e=>Math.round(e.getBoundingClientRect().top)),
                    x:qs.map(e=>+e.getBoundingClientRect().x.toFixed(1)),
                    rule:qs.map(e=>{const c=getComputedStyle(e);
                       return c.borderTopWidth+' '+c.borderTopStyle;}),
                    ruleB:qs.map(e=>{const c=getComputedStyle(e);
                       return c.borderBottomWidth+' '+c.borderBottomStyle;}),
                    ruleT:qs.map(e=>getComputedStyle(e).borderTopWidth),
                    padT:qs.map(e=>parseFloat(getComputedStyle(e).paddingTop)),
                    dtX:qs.map(e=>+e.querySelector('dt').getBoundingClientRect().x.toFixed(1)),
                    arW:qs.map(e=>+e.querySelector('.qa').getBoundingClientRect().width.toFixed(1)),
                    arColor:qs.map(e=>getComputedStyle(e.querySelector('.qa')).color),
                    gut:gut,
                    dt:qs.map(e=>parseFloat(getComputedStyle(e.querySelector('dt')).fontSize)),
                    dd:qs.map(e=>parseFloat(getComputedStyle(e.querySelector('dd')).fontSize)),
                    gap:getComputedStyle(dl).columnGap, content:content};}""")
        # SS18 supersedes SS15.3's three columns: the list is ONE column opening on the
        # seam (Rule B), each row a 24px copper arrow cell ahead of the question with the
        # text at x = 632, and each row CLOSING on its own hairline so no foot is ragged.
        seam_x = fq["gut"] + fq["content"] * 0.412791
        chk("18-objections-one-column-on-the-seam",
            fq["n"] == 3 and len(set(fq["tops"])) == 3
            and max(fq["w"]) - min(fq["w"]) <= 1.0
            and all(abs(x - seam_x) <= 1.0 for x in fq["x"])
            and all(abs(t - seam_x - 32) <= 1.0 for t in fq["dtX"])
            and all(r == "1px solid" for r in fq["ruleB"])
            and all(a == "1px" or a == "0px" for a in fq["ruleT"])
            and all(abs(p - 30) <= 0.6 for p in fq["padT"])
            and all(abs(x - 24) < 0.6 for x in fq["dt"])
            and all(abs(x - 17) < 0.6 for x in fq["dd"])
            and all("200, 84, 43" in c for c in fq["arColor"])
            and all(abs(w - 24) <= 0.6 for w in fq["arW"]),
            "1440: ONE column of three rows stacked (tops %s), each %s wide opening at x %s "
            "-- the seam at %.1f -- with the question's own text at %s (the seam + a 24px "
            "copper arrow cell %s at %s + 8px = 632); rows padded %s and CLOSING on their "
            "own hairlines %s; questions %s / answers %s"
            % (fq["tops"], fq["w"], fq["x"], seam_x, fq["dtX"], fq["arW"], fq["arColor"],
               fq["padT"], set(fq["ruleB"]), fq["dt"], fq["dd"]))

        # ---- 15.2 the manual -------------------------------------------------
        mn = pg.evaluate(r"""()=>{
            const art=document.querySelector('.manual .art');
            const fr=art.querySelector('.cov'), img=art.querySelector('img');
            const copy=document.querySelector('.manual .copy');
            const grid=document.querySelector('.manual .lanes');
            const sec=document.querySelector('.manual');
            const gutm=parseFloat(getComputedStyle(sec).paddingLeft);
            const contentm=sec.getBoundingClientRect().width-2*gutm;
            const gap=parseFloat(getComputedStyle(grid).columnGap);
            const want15=contentm*0.412791-24;
            const want612=contentm-contentm*0.412791;
            const fb=fr.getBoundingClientRect(), ib=img.getBoundingClientRect();
            const cs=getComputedStyle(fr);
            const h2=document.querySelector('.manual .sec h2');
            const d2=0.76*parseFloat(getComputedStyle(document.getElementById('h1')).fontSize);
            const lines=[].slice.call(document.querySelectorAll('.manual .lines p'));
            const buyV=document.querySelector('.manual .buy .v');
            const chip=document.querySelector('.manual .buy .chip');
            return {artW:+art.getBoundingClientRect().width.toFixed(1),
                    want15:+want15.toFixed(1),
                    copyW:+copy.getBoundingClientRect().width.toFixed(1),
                    want612:+want612.toFixed(1),
                    copyRightOfArt: copy.getBoundingClientRect().x
                                    > art.getBoundingClientRect().x,
                    frameW:+fb.width.toFixed(1), frameH:+fb.height.toFixed(1),
                    frameAr:+(fb.width/fb.height).toFixed(4),
                    border:cs.borderTopWidth+' '+cs.borderTopStyle,
                    imgW:+ib.width.toFixed(1), imgH:+ib.height.toFixed(1),
                    imgFit:getComputedStyle(img).objectFit,
                    inner:+(fb.width-2*parseFloat(cs.paddingLeft)
                            -2*parseFloat(cs.borderTopWidth)).toFixed(1),
                    nw:img.naturalWidth, nh:img.naturalHeight, complete:img.complete,
                    headFs:parseFloat(getComputedStyle(h2).fontSize), d2:d2,
                    lineFs:lines.map(e=>parseFloat(getComputedStyle(e).fontSize)),
                    lineRule:lines.map(e=>getComputedStyle(e).borderTopWidth+' '
                                          +getComputedStyle(e).borderTopStyle),
                    lastBottom:getComputedStyle(lines[2]).borderBottomWidth,
                    buyFs:0, buyTxt:'', chipTxt:'', chipH:0,
                    dashed:[...document.querySelectorAll('.manual *')].filter(e=>{
                       const c=getComputedStyle(e);
                       return [c.borderTopStyle,c.borderRightStyle,c.borderBottomStyle,
                               c.borderLeftStyle].includes('dashed');}).length,
                    covRad:getComputedStyle(fr).borderRadius,
                    covBorders:(()=>{const c=getComputedStyle(fr);
                       return [c.borderTopWidth,c.borderRightWidth,c.borderBottomWidth,
                               c.borderLeftWidth].join(' ');})(),
                    covAr:+(fr.getBoundingClientRect().width
                            /fr.getBoundingClientRect().height).toFixed(4),
                    covX:+fr.getBoundingClientRect().x.toFixed(1),
                    copyX:+copy.getBoundingClientRect().x.toFixed(1),
                    ledgerBorder:(()=>{const b=document.querySelector('.buyledger');
                       const c=getComputedStyle(b);
                       return c.borderTopWidth+' '+c.borderTopStyle+' r'+c.borderRadius;})(),
                    ledgerW:+document.querySelector('.buyledger')
                             .getBoundingClientRect().width.toFixed(1),
                    brows:[...document.querySelectorAll('.manual .brow')].map(e=>({
                       h:+e.getBoundingClientRect().height.toFixed(1),
                       t:e.textContent.replace(/\s+/g,' ').trim(),
                       arW:+e.querySelector('.ar').getBoundingClientRect().width.toFixed(1),
                       ruled:getComputedStyle(e.querySelector('.ar')).borderLeftWidth,
                       arColor:getComputedStyle(e.querySelector('.ar')).color})),
                    borderedInSection:[...document.querySelectorAll('.manual *')].filter(e=>{
                       const c=getComputedStyle(e);
                       return ['borderTopWidth','borderRightWidth','borderBottomWidth',
                               'borderLeftWidth'].some(k=>parseFloat(c[k])>0)
                              && !e.closest('.buyledger') && !e.classList.contains('buyledger')
                              && !e.closest('.lines') && !e.classList.contains('lines');})
                       .map(e=>e.tagName+'.'+e.className)};}""")
        # SS18 RULE A: the dashed frame and its padding are deleted -- the cover IS the
        # object, at 4:5 with an 8px radius and no border -- and the section's ONLY border
        # is the buy ledger (the symptom ledger's own hairlines excepted: they are rules,
        # not a box). The buy block becomes a Stripe-Press ledger: one bordered box, three
        # 48px rows, each with a copper arrow in a 44px RULED cell.
        rows48 = mn["brows"]
        chk("18-manual-no-frame-buy-ledger",
            mn["nw"] == 720 and mn["nh"] == 1018 and mn["complete"]
            and mn["dashed"] == 0
            and mn["covBorders"] == "0px 0px 0px 0px" and mn["covRad"] == "8px"
            and abs(mn["covAr"] - 0.8) <= 0.01
            and abs(mn["artW"] - mn["want15"]) <= 1.5
            and abs(mn["copyW"] - mn["want612"]) <= 1.5 and mn["copyRightOfArt"]
            and mn["imgFit"] == "cover"
            and abs(mn["headFs"] - mn["d2"]) < 1.0
            and all(abs(f - 21) < 0.6 for f in mn["lineFs"])
            and all(r == "1px solid" for r in mn["lineRule"])
            and mn["lastBottom"] == "1px"
            and mn["ledgerBorder"] == "1px solid r0px"
            and len(rows48) == 3 and all(abs(r["h"] - 48) <= 0.6 for r in rows48)
            and all(abs(r["arW"] - 44) <= 0.6 for r in rows48)
            and all(r["ruled"] == "1px" for r in rows48)
            and all("200, 84, 43" in r["arColor"] for r in rows48)
            and not mn["borderedInSection"],
            "the cover DECODES in Chromium (naturalWidth %d x %d, complete=%s) and carries "
            "NO border (%s) at %s radius and %.4f (4:5), %.1f wide in the left lane (cols "
            "1-5 = %.1f); zero dashed borders anywhere in the section (%d); the copy column "
            "is %.1f wide (%.1f) at x %.1f, to the RIGHT of the cover at x %.1f; display "
            "head %.1f == --d2 %.1f; three symptom rows at %s on %s hairlines (the last "
            "closing on a %s rule); the buy LEDGER is one bordered box (%s, %.0f wide) of "
            "three rows %s, each arrow in a %s-wide cell ruled by a %s left border in "
            "copper; the only bordered objects left in the section are the ledger and the "
            "symptom rules (stray borders: %s)"
            % (mn["nw"], mn["nh"], mn["complete"], mn["covBorders"], mn["covRad"],
               mn["covAr"], mn["artW"], mn["want15"], mn["dashed"], mn["copyW"],
               mn["want612"], mn["copyX"], mn["covX"], mn["headFs"], mn["d2"],
               mn["lineFs"], set(mn["lineRule"]), mn["lastBottom"], mn["ledgerBorder"],
               mn["ledgerW"], [r["h"] for r in rows48], [r["arW"] for r in rows48],
               set(r["ruled"] for r in rows48), mn["borderedInSection"] or "[]"))

        # ================= SS18: the three page-wide rules, at 1440 =============
        pg.evaluate("()=>window.scrollTo(0,0)")
        pg.wait_for_timeout(400)
        s18 = pg.evaluate(r"""()=>{
          const sec=document.querySelector('.work');
          const gut=parseFloat(getComputedStyle(sec).paddingLeft);
          const content=sec.getBoundingClientRect().width-2*gut;
          const X=s=>{const e=document.querySelector(s);
                      return e?+e.getBoundingClientRect().x.toFixed(2):null;};
          const media=[...document.querySelectorAll(
            'img, video, .cov, .opfilm, .stage, .stagewrap, figure')].map(e=>{
              const c=getComputedStyle(e);
              const w=[c.borderTopWidth,c.borderRightWidth,c.borderBottomWidth,
                       c.borderLeftWidth];
              return {el:e.tagName+'.'+String(e.className).slice(0,24), w:w.join(' '),
                      any:w.some(v=>parseFloat(v)>0)};});
          const dashed=[...document.querySelectorAll('*')].filter(e=>{
            const c=getComputedStyle(e);
            return [c.borderTopStyle,c.borderRightStyle,c.borderBottomStyle,
                    c.borderLeftStyle].includes('dashed');})
            .map(e=>e.tagName+'.'+String(e.className).slice(0,24));
          const chips=[...document.querySelectorAll('.chip')].map(e=>{
            const r=e.getBoundingClientRect(), c=getComputedStyle(e);
            const gl=e.querySelector('.gl');
            return {t:e.textContent.replace(/\s+/g,' ').trim().slice(0,30),
                    h:+r.height.toFixed(2), rad:c.borderRadius, fs:c.fontSize,
                    fam:c.fontFamily.split(',')[0], wt:c.fontWeight,
                    squares:e.querySelectorAll('.a').length,
                    kids:e.childElementCount,
                    glMl:gl?getComputedStyle(gl).marginLeft:null,
                    glInline:gl?(gl.getBoundingClientRect().top>=r.top
                                 && gl.getBoundingClientRect().bottom<=r.bottom):null};});
          const hero=(()=>{const p=document.getElementById('heroproof');
            const ch=document.getElementById('herochips');
            const h1=document.getElementById('h1');
            const lbl=p.querySelector('.l');
            const rules=[...document.querySelectorAll('.hero-copy *')].filter(e=>{
              const c=getComputedStyle(e);
              return parseFloat(c.borderTopWidth)>0
                     && c.borderTopColor!=='rgba(0, 0, 0, 0)'
                     && e.getBoundingClientRect().width>300;})
              .map(e=>e.tagName+'.'+String(e.className).slice(0,20));
            return {gap:+(p.getBoundingClientRect().top
                          -ch.getBoundingClientRect().bottom).toFixed(1),
                    x:+p.getBoundingClientRect().x.toFixed(1),
                    h1x:+h1.getBoundingClientRect().x.toFixed(1),
                    fs:getComputedStyle(lbl).fontSize,
                    col:getComputedStyle(lbl).color,
                    align:getComputedStyle(p).textAlign,
                    rules:rules};})();
          const ask=(()=>{const a=document.getElementById('contact');
            const c=getComputedStyle(a);
            const pr=document.querySelector('.ask .promise');
            const h2=document.querySelector('.ask h2');
            const cs=[...document.querySelectorAll('.ask .chip')];
            const m=document.createElement('span');
            m.textContent='0'; m.style.cssText='position:absolute;visibility:hidden;font:'
              +getComputedStyle(pr).font;
            document.body.appendChild(m);
            const ch=m.getBoundingClientRect().width; m.remove();
            return {minH:c.minHeight, pad:c.padding,
                    arrows:a.querySelectorAll('.ar').length,
                    prFs:getComputedStyle(pr).fontSize,
                    prAlign:getComputedStyle(pr).textAlign,
                    prCh:+(parseFloat(getComputedStyle(pr).maxWidth)/ch).toFixed(2),
                    prRight:+pr.getBoundingClientRect().right.toFixed(1),
                    prBase:+pr.getBoundingClientRect().bottom.toFixed(1),
                    h2Base:+h2.getBoundingClientRect().bottom.toFixed(1),
                    edge:+(a.getBoundingClientRect().right
                           -parseFloat(c.paddingRight)).toFixed(1),
                    n:cs.length,
                    shapes:[...new Set(cs.map(e=>{const q=getComputedStyle(e);
                      return q.height+'/'+q.borderRadius+'/'+q.fontSize;}))]};})();
          const foot=(()=>{const f=document.querySelector('.foot');
            const g=f.querySelector('.grid');
            const c=getComputedStyle(g);
            const cols=[...f.querySelectorAll('.fcol')].map(
              e=>+e.getBoundingClientRect().x.toFixed(1));
            return {bt:c.borderTopWidth+' '+c.borderTopColor,
                    cols:cols, n:cols.length,
                    txt:f.textContent.replace(/\s+/g,' ').trim()};})();
          const bar=(()=>{const b=document.getElementById('bar');
            const c=getComputedStyle(b);
            const mid=b.querySelector('.mid');
            return {cols:c.gridTemplateColumns, h:c.height,
                    midDisplay:getComputedStyle(mid).display,
                    midJustify:getComputedStyle(mid).justifyContent,
                    midGap:getComputedStyle(mid).gap,
                    midN:mid.querySelectorAll('a').length};})();
          return {seam:+(gut+content*0.412791).toFixed(2), gut:gut, content:content,
                  lanes:{work:X('#work .steps li .s'), manual:X('.manual .copy'),
                         objections:X('#faq .qs'), receipts:X('#proof .prf .cap')},
                  media:media, dashed:dashed, chips:chips, hero:hero, ask:ask,
                  foot:foot, bar:bar};}""")
        lanes = s18["lanes"]
        chk("18-rule-B-one-seam-at-600",
            all(v is not None and abs(v - 600) <= 1 for v in lanes.values())
            and abs(s18["seam"] - 600) <= 1,
            "at 1440 the four right-hand lanes measure x = %s -- the how-I-work sentence, "
            "the manual's copy column, the objections list and the receipts' caption lane -- "
            "against SS18's pinned 600 (the token resolves to %.2f: the gutter %.0f + "
            "41.2791%% of a %.0f content)"
            % (json.dumps(lanes), s18["seam"], s18["gut"], s18["content"]))
        framed = [m for m in s18["media"] if m["any"]]
        chk("18-rule-A-no-frame-on-a-picture",
            not framed and not s18["dashed"],
            "%d of %d <img>/<video>/cover/stage/figure elements carry a border (%s) and the "
            "page declares %d dashed borders (%s). SS18: the border goes on the list, never "
            "on the picture."
            % (len(framed), len(s18["media"]), framed or "[]", len(s18["dashed"]),
               s18["dashed"] or "[]"))
        ch = s18["chips"]
        arrowed = [c for c in ch if c["glMl"]]
        chk("18-rule-C-one-chip-shape",
            len(ch) >= 8
            and all(abs(c["h"] - 48) <= 0.6 for c in ch)
            and all(c["rad"] == "8px" for c in ch)
            and all(c["fs"] == "19px" for c in ch)
            and all("Hanken" in c["fam"] for c in ch)
            and all(c["wt"] == "500" for c in ch)
            and sum(c["squares"] for c in ch) == 0
            and all(c["kids"] <= 1 for c in ch)
            and all(c["glMl"] == "10px" and c["glInline"] for c in arrowed),
            "%d chips on the page, every one ONE block: heights %s, radii %s, labels %s %s "
            "at weight %s; %d bolted arrow squares (.a) in total; child elements per chip %s "
            "(<=1: the inline glyph); the %d chips that carry an arrow set it inline at a "
            "%s margin, inside the block's own box (%s). Chips: %s"
            % (len(ch), sorted(set(c["h"] for c in ch)), sorted(set(c["rad"] for c in ch)),
               sorted(set(c["fs"] for c in ch)),
               sorted(set(c["fam"] for c in ch)), sorted(set(c["wt"] for c in ch)),
               sum(c["squares"] for c in ch), sorted(set(c["kids"] for c in ch)),
               len(arrowed), sorted(set(c["glMl"] for c in arrowed)),
               sorted(set(c["glInline"] for c in arrowed)), [c["t"] for c in ch]))
        hb = s18["bar"]
        chk("18-bar-1440-three-tracks",
            len(hb["cols"].split()) == 3
            and hb["midDisplay"] == "flex" and hb["midJustify"] == "center"
            and hb["midGap"].startswith("56px") and hb["midN"] == 3,
            "the bar is a %s grid -- identity and the ask in auto tracks with the three "
            "middle labels centred in the 1fr track (%s, justify %s, gap %s, %d labels), "
            "instead of five items on four different space-between gaps"
            % (hb["cols"], hb["midDisplay"], hb["midJustify"], hb["midGap"], hb["midN"]))
        hr = s18["hero"]
        chk("18-hero-proof-under-the-chips",
            abs(hr["gap"] - 24) <= 1 and abs(hr["x"] - hr["h1x"]) <= 1
            and hr["fs"] == "14px" and "0.6" in hr["col"] and not hr["rules"],
            "`Four exits, $5B+ combined.` sits %.1fpx under the chips (SS18 wants 24) on the "
            "headline's own left edge (%.1f vs %.1f), in the label style at %s / %s, and the "
            "full-width hairline over the chips is gone (%d rules wider than 300px left in "
            "the block: %s)"
            % (hr["gap"], hr["x"], hr["h1x"], hr["fs"], hr["col"], len(hr["rules"]),
               hr["rules"] or "[]"))
        ak = s18["ask"]
        chk("18-ask-field-is-its-content",
            ak["minH"] == "0px" and ak["pad"].startswith("120px")
            and ak["arrows"] == 0
            and ak["prFs"] == "19px" and ak["prAlign"] == "right"
            and abs(ak["prCh"] - 26) <= 0.5
            and abs(ak["prRight"] - ak["edge"]) <= 1.0
            and abs(ak["prBase"] - ak["h2Base"]) <= 2.0
            and ak["n"] == 2 and len(ak["shapes"]) == 1,
            "min-height %s and padding %s (the field is its content); %d floating arrows; "
            "the reply promise is right-aligned at %s on a %.2fch measure, its right edge on "
            "the field's own (%.1f vs %.1f) and its last line level with the headline's "
            "(%.1f vs %.1f); %d chips of %d shape (%s)"
            % (ak["minH"], ak["pad"], ak["arrows"], ak["prFs"], ak["prCh"], ak["prRight"],
               ak["edge"], ak["prBase"], ak["h2Base"], ak["n"], len(ak["shapes"]),
               ak["shapes"]))
        ft = s18["foot"]
        years = re.findall(r"(?:19|20)\d{2}", ft["txt"])
        chk("18-foot-three-columns",
            ft["bt"].startswith("1px") and "0.15" in ft["bt"]
            and ft["n"] == 3 and len(set(ft["cols"])) == 3
            and not years and "\u00a9" not in ft["txt"],
            "the foot opens on a %s hairline and holds %d columns at x %s; no copyright "
            "range and no year in %r"
            % (ft["bt"], ft["n"], ft["cols"], ft["txt"][:120]))

        # ---- SS11 the bar over the copper field is espresso with bone labels --
        # SS18 takes the field's min-height from 720 to 0, so at 1440x900 the document
        # bottoms out (max scroll 6474) BEFORE the field's top (6563) can reach the bar --
        # the state SS11 rules on is unreachable at that viewport and reachable at any
        # shorter one. The viewport is shortened for this one probe and restored after it,
        # which is the faithful way to put the copper field under the bar.
        pg.set_viewport_size({"width": 1440, "height": 560})
        pg.wait_for_timeout(500)
        pg.evaluate("""()=>{const a=document.getElementById('contact');
            window.scrollTo(0, a.offsetTop + 240);}""")
        pg.wait_for_timeout(300)
        pg.evaluate("()=>window.dispatchEvent(new Event('resize'))")
        pg.wait_for_timeout(700)
        barm = pg.evaluate("""()=>{const b=document.getElementById('bar');
            const cs=getComputedStyle(b);
            const px=c=>{const cv=document.createElement('canvas');cv.width=cv.height=1;
                const x=cv.getContext('2d');x.clearRect(0,0,1,1);x.fillStyle=c;
                x.fillRect(0,0,1,1);return [...x.getImageData(0,0,1,1).data];};
            const ls=[].map.call(b.querySelectorAll('.l'),
                e=>px(getComputedStyle(e).color));
            const bgpx=px(cs.backgroundColor);
            const a=document.getElementById('contact').getBoundingClientRect();
            return {dark:b.classList.contains('dark'), bg:cs.backgroundColor, ls:ls,
                    askUnderBar:(a.top<=b.getBoundingClientRect().height && a.bottom>=0),
                    bgpx:bgpx};}""")
        # the label tints are color-mix()es with alpha; composite each over the bar's own
        # ground before measuring, or the ratio is meaningless.
        bg = barm["bgpx"][:3]
        worst = 99.0
        for c in barm["ls"]:
            al = c[3] / 255.0
            over = [c[i] * al + bg[i] * (1 - al) for i in range(3)]
            worst = min(worst, ratio(lum(*bg), lum(*over)))
        chk("11-bar-over-ask",
            barm["askUnderBar"] and barm["dark"] and "13, 13, 15" in barm["bg"]
            and worst >= 4.5,
            "with the copper field under it the bar paints %s (dark=%s); worst label "
            "contrast %.2f:1 (>=4.5). Not copper, not bone. Measured at 1440x560: SS18's "
            "min-height 0 makes the field too short to reach the bar at 900."
            % (barm["bg"], barm["dark"], worst))
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(500)

        # ---- 15.4 how I work: the ledger, and nothing else -------------------
        # SS15.4 removes the three framed panels, the redrawn page-6 SVG and the sticky
        # rail outright. What is asserted is first the ABSENCE -- zero .panel, zero <svg>,
        # zero <img>/<video>, zero position:sticky inside #work -- and then the three rows.
        wk = pg.evaluate(r"""()=>{
            const sec=document.getElementById('work');
            const sticky=[].slice.call(sec.querySelectorAll('*')).filter(
                e=>/sticky|fixed/.test(getComputedStyle(e).position))
                .map(e=>e.tagName+'.'+e.className);
            const rows=[].slice.call(sec.querySelectorAll('.steps li'));
            const secR=sec.getBoundingClientRect();
            const gut=parseFloat(getComputedStyle(sec).paddingLeft);
            const d2=0.76*parseFloat(getComputedStyle(document.getElementById('h1')).fontSize);
            const mid=secR.x+gut+(secR.width-2*gut)/2;
            const seam=secR.x+gut+(secR.width-2*gut)*0.412791;
            return {seam:+seam.toFixed(2),
                    ordW:+document.querySelector('#work .steps .n')
                          .getBoundingClientRect().width.toFixed(1),
                    ordCol:getComputedStyle(document.querySelector('#work .steps li'))
                           .gridTemplateColumns.split(' ')[0],
                    panels:sec.querySelectorAll('.panel,[data-panel]').length,
                    svg:sec.querySelectorAll('svg').length,
                    img:sec.querySelectorAll('img').length,
                    video:sec.querySelectorAll('video').length,
                    sticky:sticky, n:rows.length, d2:d2, mid:mid,
                    ord:rows.map(r=>r.querySelector('.n').textContent.trim()),
                    ordFam:rows.map(r=>getComputedStyle(r.querySelector('.n')).fontFamily),
                    ordFs:rows.map(r=>parseFloat(getComputedStyle(r.querySelector('.n')).fontSize)),
                    ordTr:rows.map(r=>getComputedStyle(r.querySelector('.n')).textTransform),
                    nm:rows.map(r=>r.querySelector('.nm').textContent.trim()),
                    nmFs:rows.map(r=>parseFloat(getComputedStyle(r.querySelector('.nm')).fontSize)),
                    sFs:rows.map(r=>parseFloat(getComputedStyle(r.querySelector('.s')).fontSize)),
                    sX:rows.map(r=>+r.querySelector('.s').getBoundingClientRect().x.toFixed(1)),
                    sMeasure:rows.map(r=>getComputedStyle(r.querySelector('.s')).maxWidth),
                    sCh:rows.map(r=>{const e=r.querySelector('.s');
                       const m=document.createElement('span');
                       m.textContent='0'; m.style.cssText='position:absolute;visibility:hidden;'
                         +'font:'+getComputedStyle(e).font;
                       document.body.appendChild(m);
                       const ch=m.getBoundingClientRect().width; m.remove();
                       return +(parseFloat(getComputedStyle(e).maxWidth)/ch).toFixed(2);}),
                    rule:rows.map(r=>getComputedStyle(r).borderTopWidth+' '
                                     +getComputedStyle(r).borderTopStyle),
                    lastRule:getComputedStyle(rows[2]).borderBottomWidth,
                    w:rows.map(r=>+r.getBoundingClientRect().width.toFixed(1)),
                    contentW:+(secR.width-2*gut).toFixed(1)};}""")
        chk("15.4-work-ledger",
            wk["panels"] == 0 and wk["svg"] == 0 and wk["img"] == 0 and wk["video"] == 0
            and not wk["sticky"] and wk["n"] == 3
            and wk["ord"] == ["01", "02", "03"]
            and all(t == "uppercase" for t in wk["ordTr"])
            and all(abs(f - wk["d2"]) < 1.0 for f in wk["nmFs"])
            and all(abs(f - 21) < 0.6 for f in wk["sFs"])
            # SS18 Rule B supersedes SS15.4's "the right half": the lane is the page's
            # one seam, which sits LEFT of the section's midline by design.
            and all(abs(x - wk["seam"]) <= 1.0 for x in wk["sX"])
            # computed style resolves ch to px, so the measure is divided back out by the
            # element's own '0' advance and asserted as 46 characters.
            and all(abs(c - 46) <= 0.5 for c in wk["sCh"])
            and all(r == "1px solid" for r in wk["rule"])
            and wk["ordCol"] == "28px"
            and wk["lastRule"] == "1px"
            and all(abs(x - wk["contentW"]) <= 1.0 for x in wk["w"]),
            "#work now holds %d .panel, %d <svg>, %d <img>, %d <video> and %d "
            "sticky/fixed elements %s -- SS15.4 wants zero of each. Three full-width rows "
            "(%s of a %.0f content): ordinals %s in the label style (%s at %s, %s), the step "
            "names %s at %s == --d2 %.1f, and each sentence at %s on a %s measure (%s = 46ch) "
            "starting "
            "at x %s against the seam %.1f (Rule B; the section's midline is %.0f); the "
            "ordinal sits in a %s cell (SS18 wants 28px, measured %.1f); hairlines %s, the "
            "ledger closing on a %s rule"
            % (wk["panels"], wk["svg"], wk["img"], wk["video"], len(wk["sticky"]),
               wk["sticky"] or "[]", wk["w"], wk["contentW"], wk["ord"],
               [f.split(",")[0] for f in wk["ordFam"]], wk["ordFs"], set(wk["ordTr"]),
               wk["nm"], [round(x, 1) for x in wk["nmFs"]], wk["d2"], wk["sFs"],
               wk["sCh"], set(wk["sMeasure"]), wk["sX"], wk["seam"], wk["mid"],
               wk["ordCol"], wk["ordW"], set(wk["rule"]), wk["lastRule"]))

        # ---- 15.6 the record index, consolidated -----------------------------
        # SS15.6 supersedes SS14.3's seven-row ledger: two receipts and a way out.
        rec = pg.evaluate(r"""()=>{
            const rows=[].slice.call(document.querySelectorAll('.prf'));
            const more=[].slice.call(document.querySelectorAll('.proofsec .pill'));
            const head=document.querySelector('#proof .sec h2').textContent.trim();
            const sec=document.querySelector('.proofsec');
            const gut=parseFloat(getComputedStyle(sec).paddingLeft);
            const content=sec.getBoundingClientRect().width-2*gut;
            const ledger=document.querySelector('.proofsec .ledger').getBoundingClientRect();
            const geo=e=>{const b=e.getBoundingClientRect(), c=getComputedStyle(e);
                return {h:Math.round(b.height), rule:c.borderBottomWidth+' '
                        +c.borderBottomStyle, x:Math.round(b.x),
                        w:Math.round(b.width)};};
            return {head:head,
              seam:+(gut+content*0.412791).toFixed(1),
              eyebrow:[...document.querySelectorAll('#proof .eyebrow .l')]
                       .map(e=>e.textContent.trim()),
              prf:rows.map(e=>({tag:e.tagName, href:e.getAttribute('href')||'',
                 who:e.querySelector('.who').textContent.trim(),
                 cap:e.querySelector('.cap').textContent.trim(),
                 whoFs:parseFloat(getComputedStyle(e.querySelector('.who')).fontSize),
                 capFs:parseFloat(getComputedStyle(e.querySelector('.cap')).fontSize),
                 capX:+e.querySelector('.cap').getBoundingClientRect().x.toFixed(1),
                 capCol:getComputedStyle(e.querySelector('.cap')).color,
                 whoCol:getComputedStyle(e.querySelector('.who')).color,
                 arW:+e.querySelector('.ar').getBoundingClientRect().width.toFixed(1),
                 arRight:+e.querySelector('.ar').getBoundingClientRect().right.toFixed(1),
                 cell:getComputedStyle(e).gridTemplateColumns.split(' ').slice(-1)[0],
                 bt:getComputedStyle(e).borderTopWidth+'/'+getComputedStyle(e).borderTopColor,
                 bb:getComputedStyle(e).borderBottomWidth+'/'
                    +getComputedStyle(e).borderBottomColor,
                 arrow:!!e.querySelector('.ar'), geo:geo(e)})),
              rightEdge:+(gut+content).toFixed(1),
              more:more.map(e=>({tag:e.tagName, href:e.getAttribute('href')||'',
                 who:e.textContent.replace(/\u2192/g,'').replace(/\s+/g,' ').trim(),
                 arrow:(e.querySelector('.gl')||{}).textContent,
                 h:+e.getBoundingClientRect().height.toFixed(1),
                 rad:getComputedStyle(e).borderRadius,
                 bw:getComputedStyle(e).borderTopWidth,
                 fs:getComputedStyle(e).fontSize,
                 gapAbove:+(e.getBoundingClientRect().top-ledger.bottom).toFixed(1),
                 x:+e.getBoundingClientRect().x.toFixed(1),
                 geo:geo(e)}))};}""")
        prf = rec["prf"]
        allink = all(r["tag"] == "A" and r["href"] and r["arrow"] for r in prf)
        stops = [r["cap"] for r in prf if r["cap"].endswith(".")]
        names = [r["who"] for r in prf]
        more = rec["more"]
        # SS17: "we should add the content ai part to the list so we have three."
        # SS18: one size for the name and the caption (28px), the caption lane on the seam,
        # a 32px arrow cell flush right, 72px rows carrying 2px TRANSPARENT top and bottom
        # borders so the copper hover rule costs no layout shift (locomotive.ca, measured),
        # the count `07` on the head, and the way out demoted from a row to a 40px pill.
        want3 = ["Guardicore", "RFP engine for an industry author",
                 "AI content engine for an industry author"]
        reserved = all(r["bt"].startswith("2px") and "0, 0, 0, 0" in r["bt"]
                       and r["bb"].startswith("2px") and "0, 0, 0, 0" in r["bb"] for r in prf)
        chk("18-receipts-three-rows",
            len(prf) == 3 and names == want3 and allink
            and all(abs(r["geo"]["h"] - 72) <= 0.6 for r in prf)
            and all(abs(r["whoFs"] - 28) < 0.6 for r in prf)
            and all(abs(r["capFs"] - 28) < 0.6 for r in prf)
            and all(abs(r["capX"] - rec["seam"]) <= 1.0 for r in prf)
            and all(r["cell"] == "32px" for r in prf)
            and all(abs(r["arRight"] - rec["rightEdge"]) <= 1.0 for r in prf)
            and reserved
            and "07" in rec["eyebrow"]
            and len(more) == 1 and more[0]["tag"] == "A"
            and more[0]["who"] == "See the rest"
            and more[0]["arrow"] == "\u2192"
            and more[0]["href"] == "https://www.micahjonesconsulting.com/work?from=mock-proof"
            and abs(more[0]["h"] - 40) <= 0.6 and more[0]["rad"] == "999px"
            and more[0]["bw"] == "1px" and more[0]["fs"] == "14px"
            and abs(more[0]["gapAbove"] - 32) <= 1.0
            and abs(more[0]["x"] - prf[0]["geo"]["x"]) <= 1.0
            and rec["head"] == "The receipts. Every line below is real.",
            "exactly %d .prf rows -- %s -- each a 72px link (%s) carrying an arrow in a %s "
            "cell flush to the content's right edge (%.1f vs %.1f); name and caption BOTH at "
            "%s / %s, ranked by colour (%s vs %s) and column, the caption lane on the seam "
            "%s (seam %.1f); 2px transparent top/bottom borders held in reserve for the "
            "hover rule=%s (%s / %s); the head carries the count %s. The way out is a "
            "%.0fpx pill (radius %s, %s border, %s label) %.0fpx under the ledger at x %.1f, "
            "not a fourth row: %r + %r -> %s. The head is unchanged: %r"
            % (len(prf), names, allink, set(r["cell"] for r in prf),
               prf[0]["arRight"], rec["rightEdge"], [r["whoFs"] for r in prf],
               [r["capFs"] for r in prf], prf[0]["whoCol"], prf[0]["capCol"],
               [r["capX"] for r in prf], rec["seam"], reserved, prf[0]["bt"], prf[0]["bb"],
               rec["eyebrow"], more[0]["h"], more[0]["rad"], more[0]["bw"], more[0]["fs"],
               more[0]["gapAbove"], more[0]["x"], more[0]["who"], more[0]["arrow"],
               more[0]["href"], rec["head"]))

        # ---- 15 hero rows ----------------------------------------------------
        pg.evaluate("()=>window.scrollTo(0,0)")
        pg.wait_for_timeout(400)
        rows = pg.evaluate("""()=>{const rs=[].slice.call(document.querySelectorAll('#h1 .r'));
            const c=document.getElementById('herocopy').getBoundingClientRect();
            return rs.map(r=>({t:r.textContent.trim(),w:r.getBoundingClientRect().width,
                               n:r.getClientRects().length,avail:c.width}));}""")
        chk("hero-rows-1440",
            all(r["n"] == 1 and r["w"] <= r["avail"] for r in rows),
            "; ".join("%r %.0fpx in %.0fpx, %d client rect"
                      % (r["t"], r["w"], r["avail"], r["n"]) for r in rows))

        # ---- 17 media / 18 discipline ---------------------------------------
        med = pg.evaluate("""()=>{const vs=[].slice.call(document.querySelectorAll('video'));
            return vs.map(v=>({id:v.id,muted:v.muted,loop:v.loop,preload:v.preload,
                playsinline:v.hasAttribute('playsinline'),poster:!!v.getAttribute('poster'),
                srcs:v.querySelectorAll('source').length,rs:v.readyState}));}""")
        # Operator, 2026-09-06: the published page did not load for him. The webm and 1080p
        # cuts are gone; each clip now ships exactly ONE source, the 720 mp4, at every width.
        # SS15.1 adds preload="auto" on BOTH clips: "i see no vids", twice.
        chk("media", len(med) == 2 and all(m["muted"] and m["playsinline"] and m["poster"]
                                           and m["srcs"] == 1 and m["rs"] >= 2
                                           and m["preload"] == "auto" for m in med)
            and med[0]["loop"] is False and med[1]["loop"] is True,
            json.dumps(med))

        # ---- SS14.8 the page has to render with scripting OFF ----------------
        # Every SS15 section is CSS-only, and the headline still lands on the finger from
        # :root's measured percentages alone. Asserted in a context with JavaScript
        # DISABLED, which is the only faithful probe of that claim.
        nctx = br.new_context(viewport={"width": 1440, "height": 900},
                              java_script_enabled=False, device_scale_factor=1)
        np_ = nctx.new_page()
        np_.goto(url)
        np_.wait_for_timeout(2500)
        # evaluate() cannot run with scripting off, so the render is read through the
        # protocol instead: bounding boxes and element counts, driven out-of-process.
        h1b = np_.locator("#h1").bounding_box()
        stg = np_.locator("#stage").bounding_box()
        rows_n = np_.locator("#h1 .r").count()
        cards_n = np_.locator(".card").count()
        steps_n = np_.locator(".steps li").count()
        qs_n = np_.locator(".q").count()
        prf_n = np_.locator(".prf").count()
        more_n = np_.locator(".proofsec .pill").count()
        eng_b = np_.locator("#ebar").bounding_box()
        cov_b = np_.locator(".manual .art .cov").bounding_box()
        cu_b = np_.locator("#h1 .r.cu").bounding_box()
        barvis = np_.locator("#bar").is_visible()
        nctx.close()
        # the fingertip, from CSS alone: 19.375% across and 38.2407% down the 16:9 stage.
        ftx = stg["x"] + stg["width"] * 0.19375
        fty = stg["y"] + stg["height"] * 0.382407
        chk("14.8-renders-with-javascript-off",
            rows_n == 2 and cards_n == 3 and steps_n == 3 and qs_n == 3
            and prf_n == 3 and more_n == 1 and barvis
            and abs(stg["width"] * 9 / 16 - stg["height"]) <= 1.5
            and h1b["x"] < ftx and ftx - h1b["x"] <= 60
            # SS16.2: the row whose INK top is pinned 4px under the tip is the COPPER one.
            # .r is display:block at line-height .92, so --d is its height / .92 and the
            # leading "g"'s ink top is --xk of that below the box top (round 10: --capk, the
            # cap line, is 15-16px higher and has no ink on it in `go-to-market.`).
            and abs((cu_b["y"] + 0.1404 * cu_b["height"] / 0.92) - (fty + 4)) <= 2.0
            and eng_b["height"] > 0 and cov_b["width"] > 0,
            "scripting DISABLED: the 16:9 stage is %.0fx%.0f and the headline block starts "
            "at (%.0f, %.0f) against the CSS-only fingertip (%.0f, %.0f) -- %.0fpx to its "
            "left and the copper row's ink-top at %.1f, %+.1fpx off the tip, from :root's "
            "measured percentages and nothing else; %d headline rows, "
            "%d cards, %d ledger rows, %d objection columns, %d receipts + %d 'see the "
            "rest' link, the engagements block %.0fpx tall, the cover frame %.0fpx wide, "
            "and the bar visible=%s (the <noscript> rule opens it)"
            % (stg["width"], stg["height"], h1b["x"], h1b["y"], ftx, fty, ftx - h1b["x"],
               cu_b["y"] + 0.1404 * cu_b["height"] / 0.92,
               cu_b["y"] + 0.1404 * cu_b["height"] / 0.92 - fty,
               rows_n, cards_n, steps_n, qs_n, prf_n, more_n, eng_b["height"],
               cov_b["width"], barvis))

        # ---- 15.1 the gesture handler ---------------------------------------
        # Both clips are paused by hand first (the observer only fires on an intersection
        # CHANGE, so a programmatic pause is not undone by it) and then ONE synthetic wheel
        # event is dispatched. Nothing else can start them, so what plays after it is the
        # SS15.1 handler and only the handler. The viewport is tall enough that the operator
        # square is >= 35% visible at scrollY 0, which is the handler's own gate.
        gctx = br.new_context(viewport={"width": 1440, "height": 2400},
                              device_scale_factor=1, reduced_motion="no-preference")
        gp = gctx.new_page()
        gp.goto(url)
        gp.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        gp.wait_for_timeout(2500)
        before = gp.evaluate("""()=>{
            const a=document.getElementById('filmvid'), b=document.getElementById('opvid');
            a.pause(); a.currentTime=0; b.pause();
            const r=document.getElementById('opstage').getBoundingClientRect();
            const vis=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,0))/r.height;
            return {a:a.paused, b:b.paused, ended:a.ended, opVisible:+vis.toFixed(3),
                    preload:[a.preload,b.preload]};}""")
        gp.wait_for_timeout(300)
        gp.evaluate("()=>window.dispatchEvent(new WheelEvent('wheel',{deltaY:1,bubbles:true}))")
        gp.wait_for_timeout(1200)
        after = gp.evaluate("""()=>{
            const a=document.getElementById('filmvid'), b=document.getElementById('opvid');
            return {a:a.paused, b:b.paused, at:+a.currentTime.toFixed(2),
                    bt:+b.currentTime.toFixed(2)};}""")
        gctx.close()
        chk("15.1-gesture-plays-both",
            before["a"] and before["b"] and before["opVisible"] >= 0.35
            and before["preload"] == ["auto", "auto"]
            and (not after["a"]) and (not after["b"]),
            "preload %s on both; both clips paused by hand first (hero paused=%s, operator "
            "paused=%s, hero ended=%s, operator square %.0f%% visible -- past the 35%% gate); "
            "after ONE synthetic wheel event the hero is playing (paused=%s, t=%.2fs) and "
            "the operator clip is playing (paused=%s, t=%.2fs)"
            % (before["preload"], before["a"], before["b"], before["ended"],
               before["opVisible"] * 100, after["a"], after["at"], after["b"], after["bt"]))

        disc = pg.evaluate("""()=>{let kf=0;
            for(const s of document.styleSheets){try{for(const r of s.cssRules){
              if(r.type===CSSRule.KEYFRAMES_RULE) kf++;}}catch(e){}}
            const fams=new Set(); const blends=[];
            document.querySelectorAll('*').forEach(e=>{const cs=getComputedStyle(e);
              fams.add(cs.fontFamily);
              if(cs.mixBlendMode&&cs.mixBlendMode!=='normal') blends.push(e.tagName);});
            return {kf:kf, gsap: typeof window.gsap, fams:[...fams], blends:blends};}""")
        bad = [f for f in disc["fams"] if "Bricolage" in f or "JetBrains" in f or "mono" in f.lower()]
        chk("discipline", disc["kf"] <= 3 and disc["gsap"] == "undefined"
            and not disc["blends"] and not bad,
            "@keyframes=%d (SS16.3 ceiling 3 -- the whole set is transitions between two "
            "declared states), gsap=%s, mix-blend-mode elements=%d, banned faces=%s, "
            "Anybody loaded=%s" % (disc["kf"], disc["gsap"], len(disc["blends"]), bad,
                                   pg.evaluate("()=>document.fonts.check('300 20px Anybody')")))

        # ---- 19 hero proof row ----------------------------------------------
        pr = pg.evaluate("""()=>{const e=document.getElementById('heroproof');
            return {txt:e.textContent.replace(/\\s+/g,' ').trim(),
                    parts:[].map.call(e.children,c=>c.textContent.trim())};}""")
        want = "Four exits, $5B+ combined."
        chk("14.3-proof-row", norm(pr["txt"]) == norm(want),
            "reads %r; nodes %s (both verified substrings of the freight template)"
            % (pr["txt"], pr["parts"]))

        # ---- screenshots at 1440 / 1920 -------------------------------------
        def shoot(name, w, h, y=0, sel=None):
            pg.set_viewport_size({"width": w, "height": h})
            pg.wait_for_timeout(500)
            if sel:
                pg.evaluate("(s)=>document.querySelector(s).scrollIntoView({block:'start'})", sel)
                pg.wait_for_timeout(700)
                pg.evaluate("()=>window.scrollBy(0,-80)")
            else:
                pg.evaluate("(y)=>window.scrollTo(0,y)", y)
            pg.wait_for_timeout(900)
            path = os.path.join(SCRATCH, name)
            pg.screenshot(path=path)
            shots.append(path)

        shoot("rl8-1440-top.png", 1440, 900)
        shoot("rl8-sec-work.png", 1440, 900, sel="#work")
        shoot("rl8-sec-price.png", 1440, 900, sel="#price")
        shoot("rl8-sec-proof.png", 1440, 900, sel="#proof")
        shoot("rl8-sec-manual.png", 1440, 1000, sel="#manual")
        shoot("rl8-sec-faq.png", 1440, 900, sel="#faq")

        # ---- 04 / 16 SS14.7: the phone runs the SAME composition --------------
        mob = {}
        for W in (390, 360):
            pg.set_viewport_size({"width": W, "height": 844})
            pg.reload()
            pg.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
            pg.wait_for_timeout(1600)
            pg.evaluate("()=>window.scrollTo(0,0)")
            pg.wait_for_timeout(300)
            m = pg.evaluate(FINGER_JS)
            m["bar"] = pg.evaluate("""()=>{const b=document.getElementById('bar');
                return {op:getComputedStyle(b).opacity,
                        h:b.getBoundingClientRect().height};}""")
            m["stageH"] = m["stage"]["h"]
            mob[W] = m

        def mob_ok(m):
            return (m["objpos"] == "0% 50%"
                    and 24.5 <= m["fpct"][0] <= 27.5
                    and abs(m["fpct"][1] - 38.24) < 0.6
                    # the headline is OVERLAID: its box sits inside the stage's own box
                    and m["h1Box"][1] >= m["stage"]["y"] - 0.5
                    and m["h1Box"][3] <= m["stage"]["bottom"] + 0.5
                    and m["Ileft"] and m["euclid"] <= 60
                    and abs(m["capDelta"] - 4) <= 1.5
                    and all(r["n"] == 1 and r["gutter"] >= 12 for r in m["rows"])
                    # the face, source x 1010..1290, stays inside the visible window
                    and m["srcWindow"][0] <= 1010 and m["srcWindow"][1] >= 1290
                    # sentence, chips and proof follow the stage
                    and m["copyTop"] >= m["stage"]["bottom"] - 1
                    and m["bar"]["op"] == "1"
                    # v5 verify 3 SEND-BACK: the opaque 48px bar was sitting ON the
                    # stage and covering the crown of his head -- 16% of a 292px film,
                    # with hair silhouette measured on the first visible row. The
                    # stage starts BELOW the bar on the phone.
                    and m["stage"]["y"] >= m["bar"]["h"] - 0.5)

        chk("16.2-hero-mobile", all(mob_ok(m) for m in mob.values()),
            " || ".join(
                "%d: stage %.0fx%.0f cropped %s; fingertip (%.1f, %.1f) = %.2f%% across "
                "(SS14.7 wants ~26) and %.2f%% down; \"g\" box left edge %.1f, %.1fpx from "
                "the tip (<=60, g left=%s); rows %s; visible source window %.0f..%.0f "
                "(the face at 1010..1290 is inside); headline box %.0f..%.0f inside the "
                "stage %.0f..%.0f; the sentence starts %.0f, the stage ends %.0f; bar "
                "opacity %s, %.0fpx tall, and the stage opens at y %.0f CLEAR of it"
                % (W, mob[W]["stage"]["w"], mob[W]["stage"]["h"], mob[W]["objpos"],
                   mob[W]["fx"], mob[W]["fy"], mob[W]["fpct"][0], mob[W]["fpct"][1],
                   mob[W]["I"][0], mob[W]["euclid"], mob[W]["Ileft"],
                   [(r["t"], round(r["w"], 1), "%.0fpx gutter" % r["gutter"], r["n"])
                    for r in mob[W]["rows"]],
                   mob[W]["srcWindow"][0], mob[W]["srcWindow"][1],
                   mob[W]["h1Box"][1], mob[W]["h1Box"][3], mob[W]["stage"]["y"],
                   mob[W]["stage"]["bottom"], mob[W]["copyTop"], mob[W]["stage"]["bottom"],
                   mob[W]["bar"]["op"], mob[W]["bar"]["h"], mob[W]["stage"]["y"])
                for W in (390, 360)))
        chk("no-hscroll-390-360",
            all(m["scrollW"] <= m["iw"] + 1 for m in mob.values()),
            "; ".join("%d: scrollWidth %d <= innerWidth %d"
                      % (W, mob[W]["scrollW"], mob[W]["iw"]) for W in (390, 360)))

        # ---- SS16.2 on the phone: the same two facts, measured the same way -----
        mg, mh = {}, {}
        for W in (390, 360):
            pg.set_viewport_size({"width": W, "height": 844})
            pg.reload()
            pg.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
            pg.wait_for_timeout(1600)
            pg.evaluate("()=>window.scrollTo(0,0)")
            pg.wait_for_timeout(300)
            mg[W] = tip_to_g_ink(pg, os.path.join(SCRATCH, "vfy", "_gink_m%d.png" % W))
            mh[W] = hand_emerges(pg, os.path.join(SCRATCH, "vfy", "_hand_raw_m%d.png" % W),
                                 os.path.join(SCRATCH, "vfy", "_hand_cmp_m%d.png" % W))
        chk("16.2-tip-touches-the-g-ink-390",
            all(g is not None and g["dist"] <= 10.0 for g in mg.values()),
            "the phone runs the SAME rule, measured against the g's own ink mask: "
            + "; ".join(
                "%d: tip (%.0f, %.0f), nearest ink pixel of the \"g\" at (%.0f, %.0f), "
                "%.1fpx (<=10; it was 17.4 at 390 and 18.4 at 360 on the 40px offset, with "
                "the tip past the g and over the \"o\")"
                % (W, mg[W]["fx"], mg[W]["fy"], mg[W]["at"][0], mg[W]["at"][1],
                   mg[W]["dist"]) if mg[W] else "%d: not measurable" % W
                for W in (390, 360)))
        chk("16.2-hand-emerges-390",
            all(h is not None and h["frac"] >= 0.25 and h["below_share"] >= 0.35
                for h in mh.values()),
            "the veil reopens under the copper row at the phone end of the ladder too: "
            + "; ".join(
                "%d: %d of %d silhouette pixels survive (%.1f%%, gate 25%%), %.1f%% of them "
                "BELOW the tip (gate 35%%)"
                % (W, mh[W]["sur"], mh[W]["tot"], mh[W]["frac"] * 100,
                   mh[W]["below_share"] * 100) if mh[W] else "%d: not measurable" % W
                for W in (390, 360)))

        # the veil is re-cut from the new cap-top at BOTH ends of the ladder, so the two
        # rows are measured over the film on the phone too.
        # ROUND 11: 360 joins 390. This check ran at 390 only, and 390 cleared the 4.5 gate
        # by 0.04 while 360 -- the narrowest width in the ladder -- missed it on two of the
        # three frames. The narrowest width is where the mobile crop puts the brightest wall
        # behind the bone row, so it is the width the gate has to be measured at.
        mb, mc, mpx, mdet = 99, 99, 0, []
        for MW, MH in ((390, 844), (360, 800)):
            pg.set_viewport_size({"width": MW, "height": MH})
            pg.reload()
            pg.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
            pg.wait_for_timeout(1600)
            for fr in (0, 48, 96):
                t = set_frame(pg, "filmvid", fr)
                pg.evaluate("()=>window.scrollTo(0,0)")
                pg.wait_for_timeout(200)
                b = bg_contrast(pg, "#h1 .r:nth-child(1)",
                                os.path.join(SCRATCH, "vfy", "_mb%d.png" % MW))
                c2 = ground_from_cap(pg, "#h1 .r.cu",
                                     os.path.join(SCRATCH, "vfy", "_mc%d.png" % MW))
                if b:
                    mb = min(mb, b)
                if c2:
                    mc = min(mc, c2[0])
                    mpx = max(mpx, c2[1])
                mdet.append("%d f%d(t=%.2fs) bone %.2f | copper ground %.2f, brightest "
                            "channel %d" % (MW, fr, t or 0, b or 0,
                                            c2[0] if c2 else 0, c2[1] if c2 else 0))
        pg.set_viewport_size({"width": 390, "height": 844})
        pg.reload()
        pg.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        pg.wait_for_timeout(1600)
        chk("16.2-hero-lighting-390-360", mb >= 4.5 and mc >= 4.3 and mpx <= 16,
            "390 AND 360, the SS16.2 cut at the other end of the ladder: bone row min "
            "%.2f:1 (>=4.5) across both widths and all three frames; the copper row's "
            "ground from its cap-top down is flat espresso (brightest channel %d) at "
            "%.2f:1 | %s" % (mb, mpx, mc, "; ".join(mdet)))

        pg.evaluate("()=>document.getElementById('operator').scrollIntoView({block:'start'})")
        pg.wait_for_timeout(1000)
        mop = pg.evaluate("""()=>{const s=document.getElementById('opstage');
            const h=document.getElementById('oph2');
            const sr=s.getBoundingClientRect(), hr=h.getBoundingClientRect();
            return {sw:sr.width,sh:sr.height,iw:innerWidth,
                    top:(hr.top-sr.top)/sr.height*100, foot:(hr.bottom-sr.top)/sr.height*100,
                    right:hr.right-sr.right};}""")
        # SS18: the film is a full-width 4:5 PORTRAIT at 390 too, and the veil goes solid
        # at the heading's cap-top, so the "live film at the cap row" gate SS14.2 needed is
        # retired with the stop it measured -- the heading now stands on flat ground by
        # ruling. What is asserted is the shape and the overlay.
        chk("18-op-mobile-portrait",
            abs(mop["sw"] - mop["iw"]) <= 1 and abs(mop["sw"] / mop["sh"] - 0.8) <= 0.01
            and 58 <= mop["top"] <= 72 and mop["foot"] <= 100 and mop["right"] <= 0.5,
            "390: film %.0fx%.0f is the FULL width (%d) at 4:5 (%.4f); the heading's cap row "
            "starts %.1f%% of the film and ends %.1f%%, %.0fpx inside its right edge"
            % (mop["sw"], mop["sh"], mop["iw"], mop["sw"] / mop["sh"], mop["top"],
               mop["foot"], -mop["right"]))

        # ---- 15.5 / 15.2 / 15.3 at 390 --------------------------------------
        # SS15.5 replaces SS14.7's left-rule variant: the bordered card is the thing the
        # operator asked for, and the left rule existed only because the borderless row
        # hung into the gutter. The cards keep their ground at every width and simply stack.
        mcard = pg.evaluate(r"""()=>{const cs=[].slice.call(document.querySelectorAll('.card'));
            const e=document.getElementById('ebar');
            const sec=document.querySelector('.price');
            const gut=parseFloat(getComputedStyle(sec).paddingLeft);
            const inner=sec.getBoundingClientRect().width - 2*gut;
            const qs=[].slice.call(document.querySelectorAll('.q'));
            const art=document.querySelector('.manual .art');
            const copy=document.querySelector('.manual .copy');
            return {tops:cs.map(c=>Math.round(c.getBoundingClientRect().top)),
                    w:cs.map(c=>Math.round(c.getBoundingClientRect().width)),
                    x:cs.map(c=>+c.getBoundingClientRect().x.toFixed(1)),
                    right:cs.map(c=>+c.getBoundingClientRect().right.toFixed(1)),
                    radius:cs.map(c=>getComputedStyle(c).borderRadius),
                    borders:cs.map(c=>{const st=getComputedStyle(c);
                       return [st.borderTopWidth+' '+st.borderTopColor,
                               st.borderRightWidth+' '+st.borderRightColor,
                               st.borderBottomWidth+' '+st.borderBottomColor,
                               st.borderLeftWidth+' '+st.borderLeftColor];}),
                    rowMargin:getComputedStyle(document.getElementById('cards')).margin,
                    inner:Math.round(inner), gut:gut, iw:window.innerWidth,
                    engH:Math.round(e.getBoundingClientRect().height),
                    engDir:getComputedStyle(e).flexDirection,
                    engW:Math.round(e.getBoundingClientRect().width),
                    /* v5 verify 3: the block is a two-by-two grid now, not two flex
                       columns, so the .side wrappers are gone. Its four cells ARE the
                       rows: two at every width >= 900, four when it stacks. */
                    engRows:[...new Set([...e.querySelectorAll(
                        '.nm, .pr, .one, .chip')].map(
                        x=>Math.round(x.getBoundingClientRect().top)))].length,
                    engCols:[...new Set([...e.querySelectorAll(
                        '.nm, .pr, .one, .chip')].map(
                        x=>Math.round(x.getBoundingClientRect().left)))].length,
                    engRad:getComputedStyle(e).borderRadius,
                    engChips:e.querySelectorAll('.chip').length,
                    engSquares:e.querySelectorAll('.chip .a').length,
                    miniPresent:cs.map(c=>!!c.querySelector('.mini')),
                    qTops:qs.map(x=>Math.round(x.getBoundingClientRect().top)),
                    qGaps:qs.slice(1).map((x,i)=>Math.round(
                        x.getBoundingClientRect().top-qs[i].getBoundingClientRect().bottom)),
                    qW:qs.map(x=>Math.round(x.getBoundingClientRect().width)),
                    artTop:Math.round(art.getBoundingClientRect().top),
                    copyTop:Math.round(copy.getBoundingClientRect().top),
                    artW:Math.round(art.getBoundingClientRect().width),
                    capDir:getComputedStyle(art.querySelector('figcaption')).flexDirection,
                    capRows:[...new Set([...art.querySelectorAll('figcaption .l')].map(
                        x=>Math.round(x.getBoundingClientRect().top)))].length,
                    capRects:[...art.querySelectorAll('figcaption .l')].map(
                        x=>x.getClientRects().length),
                    capX:[...new Set([...art.querySelectorAll('figcaption .l')].map(
                        x=>Math.round(x.getBoundingClientRect().left)))].length,
                    air:parseFloat(getComputedStyle(sec).paddingTop)};}""")
        stacked = len(set(mcard["tops"])) == 3
        mk = mcard["borders"][1]
        chk("18-cards-mobile",
            stacked and all(w == mcard["inner"] for w in mcard["w"])
            and all(r == "8px" for r in mcard["radius"])
            and all(bd.startswith("1px") and "200, 84, 43" in bd for bd in mk)
            and not any("200, 84, 43" in bd for i in (0, 2) for bd in mcard["borders"][i])
            and mcard["miniPresent"] == [False, True, False]
            and all(x >= mcard["gut"] - 0.5 for x in mcard["x"])
            and all(r <= mcard["iw"] - mcard["gut"] + 0.5 for r in mcard["right"])
            and mcard["rowMargin"].replace(" ", "") in ("0px", "0px0px0px0px")
            and mcard["engRad"] == "8px" and mcard["engChips"] == 1
            and mcard["engSquares"] == 0
            and mcard["engCols"] == 1
            and mcard["engW"] == mcard["inner"]
            and abs(mcard["air"] - 64) < 1,
            "390: the three cards stack (tops %s) at the full %dpx content width %s, keeping "
            "their 8px ground %s; the Audit's borders are %s -- the SAME 1px copper box as "
            "the desktop, with the inline pill present on that card alone (%s) and no bleed "
            "(row margin %s, x %s, right %s of a %dpx viewport); the engagements block keeps "
            "the card's 8px radius, stacks into %d rows on %d left edge(s) with ONE chip "
            "(%d, squares %d), %dpx tall by content and %dpx wide; section air %.0fpx"
            % (mcard["tops"], mcard["inner"], mcard["w"], set(mcard["radius"]), mk,
               mcard["miniPresent"], mcard["rowMargin"], mcard["x"], mcard["right"],
               mcard["iw"], mcard["engRows"], mcard["engCols"], mcard["engChips"],
               mcard["engSquares"], mcard["engH"], mcard["engW"], mcard["air"]))
        # SS18 supersedes SS15.3's 40px gaps with a closed ledger: the rows stack at the
        # full width and each closes on its own hairline, so the gap between them is zero.
        chk("18-objections-mobile",
            len(set(mcard["qTops"])) == 3 and all(w == mcard["inner"] for w in mcard["qW"])
            and all(abs(g) <= 1 for g in mcard["qGaps"]),
            "390: the three objections stack (tops %s) at the full %dpx width %s, closing on "
            "their own hairlines (gaps %s)"
            % (mcard["qTops"], mcard["inner"], mcard["qW"], mcard["qGaps"]))
        chk("15.2-manual-mobile",
            mcard["artTop"] < mcard["copyTop"] and mcard["artW"] == mcard["inner"],
            "390: the cover comes FIRST (its top %d, the copy's %d) at the full %dpx width"
            % (mcard["artTop"], mcard["copyTop"], mcard["artW"]))
        # SS18 moves `PDF + ZIP . every future edition` out of the caption and into the buy
        # ledger's third row, so the caption is ONE line -- the file line -- and the two-line
        # stacking round 8 had to fix no longer has a second half to stack.
        chk("18-fileline-mobile",
            mcard["capRows"] == 1 and mcard["capRects"] == [1] and mcard["capX"] == 1,
            "390: the manual's caption is the file line alone -- %d row on %d left edge, "
            "occupying %s client rect(s), so it cannot wrap into fragments"
            % (mcard["capRows"], mcard["capX"], mcard["capRects"]))


        # ---- SS18: the bar at 390 -------------------------------------------
        mbar = pg.evaluate(r"""()=>{const b=document.getElementById('bar');
            const c=getComputedStyle(b);
            const mid=b.querySelector('.mid');
            const cta=b.querySelector('.cta');
            const r=cta.getBoundingClientRect();
            const cc=getComputedStyle(cta);
            const pkg=[...mid.querySelectorAll('a')].find(
              a=>/Packages from/i.test(a.textContent));
            return {h:c.height, on:c.opacity,
                    midDisplay:getComputedStyle(mid).display,
                    pkgVisible:!!(pkg && pkg.getClientRects().length
                                  && getComputedStyle(mid).display!=='none'),
                    ident:b.querySelector('.l.now').textContent.trim(),
                    identVisible:b.querySelector('.l.now').getClientRects().length>0,
                    ctaTxt:cta.textContent.replace(/\s+/g,' ').trim(),
                    ctaH:+r.height.toFixed(1), ctaRad:cc.borderRadius,
                    ctaBw:cc.borderTopWidth, ctaBc:cc.borderTopColor,
                    ctaFs:getComputedStyle(cta.querySelector('.l')).fontSize,
                    ctaRight:+r.right.toFixed(1), iw:innerWidth,
                    gut:parseFloat(c.paddingRight)};}""")
        chk("18-bar-390",
            mbar["h"] == "52px" and mbar["identVisible"]
            and mbar["ident"] == "Micah Jones"
            and mbar["midDisplay"] == "none" and not mbar["pkgVisible"]
            and abs(mbar["ctaH"] - 32) <= 0.6 and mbar["ctaRad"] == "999px"
            and mbar["ctaBw"] == "1px" and "200, 84, 43" in mbar["ctaBc"]
            and mbar["ctaFs"] == "12px" and mbar["on"] == "1"
            and abs(mbar["ctaRight"] - (mbar["iw"] - mbar["gut"])) <= 1.0,
            "390: a %s bar, open from first paint (opacity %s), showing %r and the CTA %r as "
            "a %.0fpx pill (radius %s, %s copper border, %s label) flush to the %0.fpx "
            "gutter (%.1f of %d); `Packages from $500` is the label that hides (mid display "
            "%s, visible=%s)"
            % (mbar["h"], mbar["on"], mbar["ident"], mbar["ctaTxt"], mbar["ctaH"],
               mbar["ctaRad"], mbar["ctaBw"], mbar["ctaFs"], mbar["gut"], mbar["ctaRight"],
               mbar["iw"], mbar["midDisplay"], mbar["pkgVisible"]))

        set_frame(pg, "filmvid", 96)
        set_frame(pg, "opvid", 60)
        for name, sel in (("rl8-390-price.png", "#price"), ("rl8-390-manual.png", "#manual"),
                          ("rl8-390-faq.png", "#faq"), ("rl8-390-work.png", "#work")):
            if sel:
                pg.evaluate("(s)=>document.querySelector(s).scrollIntoView({block:'start'})", sel)
                pg.wait_for_timeout(700)
                pg.evaluate("()=>window.scrollBy(0,-60)")
            else:
                pg.evaluate("()=>window.scrollTo(0,0)")
            pg.wait_for_timeout(900)
            path = os.path.join(SCRATCH, name)
            pg.screenshot(path=path)
            shots.append(path)

        pg.set_viewport_size({"width": 390, "height": 844})
        pg.wait_for_timeout(600)

        # ---- 07/08/09/10 the copy gates -------------------------------------
        nodes = pg.evaluate("""()=>{
            const out=[]; const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
            let n; while((n=w.nextNode())){
              const p=n.parentElement;
              if(!p||p.closest('script,style,noscript')) continue;
              const t=n.textContent.replace(/\\s+/g,' ').trim();
              if(t) out.push(t);}
            document.querySelectorAll('[alt]').forEach(e=>out.push(e.getAttribute('alt')));
            document.querySelectorAll('svg[aria-label]').forEach(
              e=>out.push(e.getAttribute('aria-label')));
            return out;}""")

        # ================= SS16.2 / SS16.3 =====================================
        # ---- 16.2 the arrival frame -------------------------------------------
        clipA = os.path.join(DESIGN, "video", "A2-hold-720.mp4")
        arr = measure_arrival(clipA, os.path.join(SCRATCH, "vfy"))
        src = open(built, encoding="utf-8").read()
        m = re.search(r"var ARRIVAL = ([\d.]+);", src)
        pageArr = float(m.group(1)) if m else None
        moved = [(t, x) for t, x in (arr["trace"] if arr else []) if x is not None]
        chk("16.2-arrival",
            arr is not None and arr["arrival"] is not None and pageArr is not None
            and abs(pageArr - arr["arrival"]) <= 0.1,
            ("A2-hold-720.mp4 %dx%d, %d frames at 0.1s: the leftmost hand pixel settles at "
             "x=%s; the FIRST frame within 6px of that is t=%.2fs, and the page's own "
             "trigger constant is ARRIVAL=%.2f. (SS16.3 estimated ~3.4s; the clip measures "
             "%.2fs -- the measurement is what ships.) Trace, 2.0s..3.0s: %s"
             % (arr["w"], arr["h"], arr["n"], arr["final"], arr["arrival"], pageArr,
                arr["arrival"], [(round(t, 1), x) for t, x in moved if 2.0 <= t <= 3.0]))
            if arr and arr["arrival"] is not None else
            "the arrival could not be measured (ffmpeg missing or clip absent)")

        # ---- 16.3 the motion set: initial vs settled --------------------------
        MOTION_JS = r"""()=>{
          const one=(s,p)=>{const e=document.querySelector(s);
                            return e?getComputedStyle(e)[p]:null;};
          const all=(s,p)=>[...document.querySelectorAll(s)].map(
                            e=>getComputedStyle(e)[p]);
          const pone=(s,pe,p)=>{const e=document.querySelector(s);
                            return e?getComputedStyle(e,pe)[p]:null;};
          const pall=(s,pe,p)=>[...document.querySelectorAll(s)].map(
                            e=>getComputedStyle(e,pe)[p]);
          return {
            js:document.documentElement.classList.contains('js'),
            cuOp:one('#h1 .cu','opacity'), cuDur:one('#h1 .cu','transitionDuration'),
            r1:one('#h1 .r1','transform'), r1Dur:one('#h1 .r1','transitionDuration'),
            bar:one('.bar','transform'), barDur:one('.bar','transitionDuration'),
            barOp:one('.bar','opacity'),
            heads:all('.sec h2','clipPath'), headDur:all('.sec h2','transitionDuration'),
            stepRule:pall('.steps li','::before','transform'),
            stepDelay:pall('.steps li','::before','transitionDelay'),
            stepDur:pall('.steps li','::before','transitionDuration'),
            stepLast:pone('.steps li:last-child','::after','transform'),
            qRule:pall('.q','::before','transform'),
            prfRule:pall('.prf','::before','transform'),
            prfLast:pone('.prf:last-of-type','::before','transform'),
            ledgerRule:pone('.proofsec .ledger','::before','transform'),
            priceRule:pall('.card .pblock','::after','transform'),
            priceDelay:pall('.card .pblock','::after','transitionDelay'),
            lineRule:pall('.manual .lines p','::before','transform'),
            lineLast:pone('.manual .lines p:last-child','::after','transform'),
            cards:all('.card','transform'), cardOp:all('.card','opacity'),
            cardDelay:all('.card','transitionDelay'),
            cardDur:all('.card','transitionDuration'),
            eng:one('.eng','transform'), engOp:one('.eng','opacity'),
            engDelay:one('.eng','transitionDelay'),
            qs:all('.q','transform'), qOp:all('.q','opacity'),
            qDelay:all('.q','transitionDelay'),
            opfilm:one('.opfilm video','transform'),
            opfilmDur:one('.opfilm video','transitionDuration'),
            opRow:all('.opover .r','transform'), opRowOp:all('.opover .r','opacity'),
            opRowDelay:all('.opover .r','transitionDelay'),
            askH:one('.ask h2','transform'), askHOp:one('.ask h2','opacity'),
            askHDur:one('.ask h2','transitionDuration'),
            askAr:one('.ask .promise','transform'), askArOp:one('.ask .promise','opacity'),
            askArDur:one('.ask .promise','transitionDuration'),
            floatArrow:document.querySelectorAll('.ask .ar').length,
            askChips:one('.ask .chips','transform'), askChipsOp:one('.ask .chips','opacity'),
            askChipsDelay:one('.ask .chips','transitionDelay'),
            askChipsDur:one('.ask .chips','transitionDuration'),
            glDur:one('.chip .gl','transitionDuration'),
            arDur:one('.prf .ar','transitionDuration'),
            cover:one('.manual .art .cov','transform'),
            sheetDur:one('.sheet','transitionDuration')};}"""

        mctx = br.new_context(viewport={"width": 1440, "height": 900},
                              device_scale_factor=1, reduced_motion="no-preference")
        mp = mctx.new_page()
        mp.goto(url)
        mp.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        mp.wait_for_timeout(1000)
        ini = mp.evaluate(MOTION_JS)
        mp.evaluate("""()=>{document.querySelectorAll('[data-anim],[data-rise]').forEach(
            e=>e.classList.add('in'));
            const h=document.getElementById('h1'); h.classList.add('on','up');
            document.getElementById('bar').classList.add('on');}""")
        mp.wait_for_timeout(1700)
        fin = mp.evaluate(MOTION_JS)

        # 1 THE MOMENT -- driven through the clip's own clock, not by a class
        tctx = br.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        tp = tctx.new_page()
        tp.add_init_script("""new MutationObserver(function(mu,o){
              var v=document.getElementById('filmvid');
              if(v){v.removeAttribute('autoplay'); v.autoplay=false; o.disconnect();}})
            .observe(document.documentElement,{childList:true,subtree:true});
          Object.defineProperty(HTMLMediaElement.prototype,'play',
            {value:function(){return Promise.resolve();}});""")
        tp.goto(url)
        tp.wait_for_function("document.getElementById('filmvid').readyState>=1", timeout=30000)
        tp.wait_for_timeout(600)
        # the clip cannot start on this page (autoplay stripped, play() a no-op), so this
        # is the ONLY place the pre-start rest state of row 1 survives to be read.
        # read the DECLARED rest state, with the transition suppressed so what comes back
        # is the rule's own value and not a frame of the fill in progress.
        r1_rest = tp.evaluate("""()=>{const h=document.getElementById('h1');
            const el=document.querySelector('#h1 .r1');
            const d=getComputedStyle(el).transitionDuration;
            const had=h.classList.contains('up');
            el.style.transition='none'; h.classList.remove('up'); void el.offsetWidth;
            const t=getComputedStyle(el).transform;
            if(had) h.classList.add('up'); void el.offsetWidth; el.style.transition='';
            return {t:t, d:d, had:had};}""")
        seek = """async (t)=>{const v=document.getElementById('filmvid');
            v.pause(); v.currentTime=t;
            await new Promise(r=>{const go=()=>{v.removeEventListener('seeked',go);r();};
              v.addEventListener('seeked',go); setTimeout(r,900);});
            return v.currentTime;}"""
        tp.evaluate(seek, 1.0)
        tp.wait_for_timeout(500)
        op_at_1 = tp.evaluate("()=>getComputedStyle(document.querySelector('#h1 .cu')).opacity")
        tp.evaluate(seek, (pageArr or 2.54) + 0.5)
        tp.wait_for_timeout(500)
        op_after = tp.evaluate("()=>getComputedStyle(document.querySelector('#h1 .cu')).opacity")
        tctx.close()
        chk("16.3-1-the-moment",
            abs(float(op_at_1) - 0.28) < 0.02 and float(op_after) >= 0.99
            and abs(float(ini["cuDur"].rstrip("s")) - 0.26) < 0.01
            and abs(tmat(r1_rest["t"])[1] - 24) < 0.5 and tmat(fin["r1"])[1] == 0
            and abs(float(r1_rest["d"].rstrip("s")) - 0.6) < 0.01,
            "with the clip paused at t=1.00s the copper row computes opacity %s (rest state "
            ".28) and at t=%.2fs (arrival + 0.5s) it computes %s, over a %s fill; "
            "'I build the' rests at translateY %.1fpx over %s and settles at %.1fpx"
            % (op_at_1, (pageArr or 2.54) + 0.5, op_after, ini["cuDur"],
               tmat(r1_rest["t"])[1], r1_rest["d"], tmat(fin["r1"])[1]))

        # 2 the bar
        chk("16.3-2-bar",
            abs(tmat(ini["bar"])[1] + 12) < 0.5 and tmat(fin["bar"])[1] == 0
            and abs(float(ini["barDur"].split(",")[0].rstrip("s")) - 0.24) < 0.01,
            "the bar rests at translateY %.1fpx and arrives at %.1fpx over %s (opacity and "
            "transform together); `on` is only ever ADDED by the script, so the entrance "
            "cannot run twice"
            % (tmat(ini["bar"])[1], tmat(fin["bar"])[1], ini["barDur"]))

        # 3 section heads
        heads_hidden = all("100%" in c for c in ini["heads"])
        heads_open = all("100%" not in c and c != "none" for c in fin["heads"])
        chk("16.3-3-heads",
            len(ini["heads"]) == 5 and heads_hidden and heads_open
            and all(abs(float(d.rstrip("s")) - 0.7) < 0.01 for d in ini["headDur"]),
            "%d section heads; each rests clipped from the left (%s) and settles open (%s) "
            "over %s. The vertical inset is -0.3em in BOTH states: the .d.two line box is "
            "shorter than the font's em box and a literal inset(0) shears descenders"
            % (len(ini["heads"]), ini["heads"][0], fin["heads"][0], set(ini["headDur"])))

        # 4 the hairlines
        drawn0 = ([tmat(v)[2] for v in ini["stepRule"]] + [tmat(v)[2] for v in ini["qRule"]]
                  + [tmat(v)[2] for v in ini["prfRule"]] + [tmat(v)[2] for v in ini["priceRule"]]
                  + [tmat(v)[2] for v in ini["lineRule"]]
                  + [tmat(ini["ledgerRule"])[2],
                     tmat(ini["stepLast"])[2], tmat(ini["lineLast"])[2]])
        drawn1 = ([tmat(v)[2] for v in fin["stepRule"]] + [tmat(v)[2] for v in fin["qRule"]]
                  + [tmat(v)[2] for v in fin["prfRule"]] + [tmat(v)[2] for v in fin["priceRule"]]
                  + [tmat(v)[2] for v in fin["lineRule"]]
                  + [tmat(fin["ledgerRule"])[2],
                     tmat(fin["stepLast"])[2], tmat(fin["lineLast"])[2]])
        chk("16.3-4-hairlines",
            len(drawn0) == 18 and all(abs(v) < 0.001 for v in drawn0)
            and all(abs(v - 1) < 0.001 for v in drawn1)
            and all(abs(float(d.rstrip("s")) - 0.5) < 0.01 for d in ini["stepDur"])
            and [d.strip() for d in ini["stepDelay"]] == ["0s", "0.06s", "0.12s"],
            "%d ledger rules -- the three how-I-work rows and the ledger's closing rule, the "
            "three manual symptoms and theirs, the three objections' closing hairlines, the "
            "three card price rules, the THREE receipts (SS17) and the ledger's opening rule "
            "-- all rest at scaleX %s and settle at scaleX %s over %s, staggered %s inside a "
            "section"
            % (len(drawn0), set(round(v, 3) for v in drawn0),
               set(round(v, 3) for v in drawn1), set(ini["stepDur"]),
               [d.strip() for d in ini["stepDelay"]]))

        # 5 cards and blocks rise
        chk("16.3-5-rises",
            all(abs(tmat(v)[1] - 20) < 0.5 for v in ini["cards"])
            and all(float(o) == 0 for o in ini["cardOp"])
            and all(tmat(v)[1] == 0 for v in fin["cards"])
            and all(float(o) == 1 for o in fin["cardOp"])
            and [d.split(",")[0].strip() for d in ini["cardDelay"]] == ["0s", "0.07s", "0.14s"]
            and abs(tmat(ini["eng"])[1] - 20) < 0.5
            and ini["engDelay"].split(",")[0].strip() == "0.21s"
            and all(abs(tmat(v)[1] - 20) < 0.5 for v in ini["qs"])
            and [d.split(",")[0].strip() for d in ini["qDelay"]] == ["0s", "0.07s", "0.14s"]
            and abs(tmat(ini["cover"])[1] - 10) < 0.5 and tmat(fin["cover"])[1] == 0,
            "three price cards rest at translateY %s / opacity %s on delays %s and settle at "
            "%s / %s; the Engagements block rests at %.0fpx on a %s delay (after them); the "
            "three objection columns rest at %s on %s; the cover rests at %.0fpx and settles "
            "at %.0fpx"
            % ([round(tmat(v)[1]) for v in ini["cards"]], ini["cardOp"],
               [d.split(",")[0].strip() for d in ini["cardDelay"]],
               [round(tmat(v)[1]) for v in fin["cards"]], fin["cardOp"],
               tmat(ini["eng"])[1], ini["engDelay"].split(",")[0].strip(),
               [round(tmat(v)[1]) for v in ini["qs"]],
               [d.split(",")[0].strip() for d in ini["qDelay"]],
               tmat(ini["cover"])[1], tmat(fin["cover"])[1]))

        # 6 the operator square
        chk("16.3-6-operator",
            abs(tmat(ini["opfilm"])[2] - 1.378) < 0.005
            and abs(tmat(fin["opfilm"])[2] - 1.30) < 0.005
            and abs(float(ini["opfilmDur"].rstrip("s")) - 1.2) < 0.01
            and all(abs(tmat(v)[1] - 20) < 0.5 for v in ini["opRow"])
            and all(tmat(v)[1] == 0 for v in fin["opRow"])
            and [d.split(",")[0].strip() for d in ini["opRowDelay"]] == ["0s", "0.08s"],
            "the square's film rests at scale %.3f and settles to %.3f over %s (the SS14.2 "
            "crop zoom is 1.30, so the SS16.3 1.06 settle is applied on it: 1.30 x 1.06 = "
            "1.378); the two heading rows rest at translateY %s on delays %s"
            % (tmat(ini["opfilm"])[2], tmat(fin["opfilm"])[2], ini["opfilmDur"],
               [round(tmat(v)[1]) for v in ini["opRow"]],
               [d.split(",")[0].strip() for d in ini["opRowDelay"]]))

        # 7 hovers
        mp.evaluate("()=>window.scrollTo(0,0)")
        mp.wait_for_timeout(300)
        mp.hover("#herochips .chip")
        mp.wait_for_timeout(400)
        hv_chip = mp.evaluate("()=>getComputedStyle("
                              "document.querySelector('#herochips .chip .gl')).transform")
        mp.evaluate("()=>document.getElementById('proof').scrollIntoView({block:'center'})")
        mp.wait_for_timeout(700)
        mp.hover(".prf")
        mp.wait_for_timeout(400)
        hv_row = mp.evaluate("()=>getComputedStyle(document.querySelector('.prf .ar')).transform")
        mp.evaluate("()=>document.getElementById('price').scrollIntoView({block:'center'})")
        mp.wait_for_timeout(700)
        mp.hover(".card")
        mp.wait_for_timeout(500)
        hv_card = mp.evaluate("()=>getComputedStyle(document.querySelector('.card')).borderTopColor")
        chk("16.3-7-hovers",
            abs(tmat(hv_chip)[0] - 6) < 0.5 and abs(tmat(hv_row)[0] - 6) < 0.5
            and "200, 84, 43" in hv_card
            and abs(float(ini["glDur"].rstrip("s")) - 0.2) < 0.01
            and abs(float(ini["arDur"].rstrip("s")) - 0.2) < 0.01,
            "on hover the chip's arrow slides to translateX %.1fpx and a receipt row's arrow "
            "to %.1fpx, both over %s / %s; the price card's border computes %s (copper) over "
            "300ms. The chips' 300ms ground swap is unchanged and the receipts' copper wipe "
            "is untouched."
            % (tmat(hv_chip)[0], tmat(hv_row)[0], ini["glDur"], ini["arDur"], hv_card))

        # 8 the ask
        # SS16.3-8's second clause named the floating 56px arrow after `problem.`; SS18
        # DELETES that object ("the chips carry the arrow"), so the clause is retired with
        # it and the reply promise -- the thing SS18 moves into the field -- takes the
        # middle entrance. The field still enters on three objects, 60ms and 120ms apart.
        chk("16.3-8-ask",
            abs(tmat(ini["askH"])[1] - 30) < 0.5 and float(ini["askHOp"]) == 0
            and ini["floatArrow"] == 0
            and abs(tmat(ini["askAr"])[1] - 30) < 0.5 and float(ini["askArOp"]) == 0
            and abs(float(ini["askHDur"].split(",")[0].rstrip("s")) - 0.6) < 0.01
            and abs(float(ini["askArDur"].split(",")[0].rstrip("s")) - 0.6) < 0.01
            and ini["askChipsDelay"].split(",")[0].strip() == "0.12s"
            and tmat(fin["askH"])[1] == 0 and tmat(fin["askAr"])[1] == 0
            and float(fin["askChipsOp"]) == 1,
            "the copper field carries %d floating arrows (SS18 wants 0 -- the chips carry "
            "it); its headline rests at translateY %.0fpx / opacity %s and the reply promise "
            "at translateY %.0fpx / opacity %s, both over %s; the chips follow on a %s delay "
            "and settle at opacity %s"
            % (ini["floatArrow"], tmat(ini["askH"])[1], ini["askHOp"],
               tmat(ini["askAr"])[1], ini["askArOp"], ini["askHDur"].split(",")[0],
               ini["askChipsDelay"].split(",")[0], fin["askChipsOp"]))

        # 9 the ground travel and the rail lighting are untouched
        mp.evaluate("()=>window.scrollTo(0,0)")
        mp.wait_for_timeout(400)
        p_top = mp.evaluate("()=>getComputedStyle(document.documentElement)"
                            ".getPropertyValue('--p').trim()")
        mp.evaluate("()=>document.getElementById('price').scrollIntoView({block:'center'})")
        mp.wait_for_timeout(900)
        p_lit = mp.evaluate("""()=>({p:getComputedStyle(document.documentElement)
            .getPropertyValue('--p').trim(),
            lit:document.documentElement.classList.contains('lit')})""")
        chk("16.3-9-ground-unchanged",
            float(p_top or 0) < 0.02 and float(p_lit["p"]) > 0.98 and p_lit["lit"]
            and abs(float(ini["sheetDur"].rstrip("s")) - 0.7) < 0.01,
            "--p reads %s at the top of the room and %s over the ledger with html.lit=%s; "
            "the sheet still travels over %s. Nothing in SS16.3 touched it."
            % (p_top, p_lit["p"], p_lit["lit"], ini["sheetDur"]))

        # keyframes ceiling
        kf = mp.evaluate("""()=>{let n=0; for(const s of document.styleSheets){
            try{for(const r of s.cssRules){if(r.type===CSSRule.KEYFRAMES_RULE) n++;}}
            catch(e){}} return n;}""")
        chk("16.3-keyframes", kf <= 3,
            "@keyframes declared: %d (SS16.3 ceiling 3). Every item in the set is a "
            "transition between two declared states, so none is needed." % kf)
        mctx.close()

        # ---- 16.3 reduced motion: everything off ------------------------------
        rctx = br.new_context(viewport={"width": 1440, "height": 900},
                              device_scale_factor=1, reduced_motion="reduce")
        rp = rctx.new_page()
        rp.goto(url)
        rp.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        rp.wait_for_timeout(1200)
        rm = rp.evaluate(MOTION_JS)
        rp.hover("#herochips .chip")
        rp.wait_for_timeout(300)
        rm_hover = rp.evaluate("()=>getComputedStyle("
                               "document.querySelector('#herochips .chip .gl')).transform")
        rctx.close()
        rm_tf = ([rm["r1"], rm["bar"], rm["eng"], rm["askH"], rm["askAr"], rm["askChips"],
                  rm["cover"], rm_hover] + rm["cards"] + rm["qs"] + rm["opRow"])
        rm_op = ([rm["cuOp"], rm["barOp"], rm["askHOp"], rm["askArOp"], rm["askChipsOp"],
                  rm["engOp"]] + rm["cardOp"] + rm["qOp"] + rm["opRowOp"])
        rm_dur = ([rm["cuDur"], rm["r1Dur"], rm["sheetDur"], rm["glDur"], rm["arDur"]]
                  + rm["headDur"])
        chk("16.3-reduced-motion-off",
            rm["js"] is False and all(ident(v) for v in rm_tf)
            and all(float(o) == 1 for o in rm_op)
            and all(c == "none" for c in rm["heads"])
            and all(float(d.split(",")[0].rstrip("s")) == 0 for d in rm_dur),
            "under prefers-reduced-motion: reduce the script never adds html.js (js=%s), so "
            "every SS16.3 rest state is absent: %d transforms all identity (hover included), "
            "%d opacities all 1, %d clip-paths all `none`, and every remaining transition "
            "duration is 0s (%s)"
            % (rm["js"], len(rm_tf), len(rm_op), len(rm["heads"]), set(rm_dur)))

        # ---- 16.3 the no-JS render is the finished frame ----------------------
        # Scripting off is simulated exactly: every <script> is removed and the <noscript>
        # block is unwrapped, which is what a scripting-disabled UA does to this page's CSS.
        # Corroborated below by a real java_script_enabled=False screenshot.
        nojs_src = re.sub(r"<script\b.*?</script>", "", src, flags=re.S | re.I)
        nojs_src = nojs_src.replace("<noscript>", "").replace("</noscript>", "")
        nojs_path = os.path.join(SCRATCH, "vfy", "nojs.html")
        open(nojs_path, "w", encoding="utf-8", newline="\n").write(nojs_src)
        jctx = br.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        jp = jctx.new_page()
        jp.goto("file:///" + nojs_path.replace("\\", "/"))
        jp.wait_for_timeout(1500)
        nj = jp.evaluate(MOTION_JS)
        jctx.close()
        nj_tf = ([nj["r1"], nj["bar"], nj["eng"], nj["askH"], nj["askAr"], nj["askChips"],
                  nj["cover"]] + nj["cards"] + nj["qs"] + nj["opRow"])
        nj_op = ([nj["cuOp"], nj["barOp"], nj["askHOp"], nj["askArOp"], nj["askChipsOp"],
                  nj["engOp"]] + nj["cardOp"] + nj["qOp"] + nj["opRowOp"])
        nj_rules = ([tmat(v)[2] for v in nj["stepRule"]] + [tmat(v)[2] for v in nj["qRule"]]
                    + [tmat(v)[2] for v in nj["prfRule"]]
                    + [tmat(v)[2] for v in nj["priceRule"]]
                    + [tmat(v)[2] for v in nj["lineRule"]])
        chk("16.3-no-js-finished-frame",
            nj["js"] is False and all(ident(v) for v in nj_tf)
            and all(float(o) == 1 for o in nj_op)
            and all(c == "none" for c in nj["heads"])
            and all(abs(v - 1) < 0.001 for v in nj_rules)
            and abs(tmat(nj["opfilm"])[2] - 1.30) < 0.005,
            "with every <script> removed html.js is %s, so nothing declares a rest state: "
            "%d transforms identity, %d opacities 1 (the copper word included, at %s), %d "
            "clip-paths `none`, %d ledger rules at scaleX 1, the operator film at its plain "
            "%.2f crop, and the bar at opacity %s"
            % (nj["js"], len(nj_tf), len(nj_op), nj["cuOp"], len(nj["heads"]),
               len(nj_rules), tmat(nj["opfilm"])[2], nj["barOp"]))

        njctx = br.new_context(viewport={"width": 1440, "height": 900},
                               device_scale_factor=1, java_script_enabled=False)
        njp = njctx.new_page()
        njp.goto(url)
        njp.wait_for_timeout(2500)
        njshot = os.path.join(SCRATCH, "rl10-nojs-1440.png")
        njp.screenshot(path=njshot)
        njctx.close()
        shots.append(njshot)
        from PIL import Image as _I
        _im = _I.open(njshot).convert("RGB")
        _px = _im.load()
        copper_px = sum(1 for y in range(300, 440, 3) for x in range(230, 1360, 6)
                        if _px[x, y][0] > 150 and _px[x, y][0] > _px[x, y][1] + 60)
        # y=4 is inside the 40px bar and above its 14px labels' ink, so this counts the
        # bar's own espresso band and not the holes its type punches in it.
        bar_px = sum(1 for x in range(0, 1440, 8) if sum(_px[x, 4]) < 120)
        chk("16.3-no-js-render",
            copper_px > 200 and bar_px > 170,
            "the REAL java_script_enabled=False render at 1440: %d copper pixels sampled "
            "across the `go-to-market.` row (the word is at full strength with no script to "
            "light it) and the bar paints its espresso band on %d of 180 sampled columns"
            % (copper_px, bar_px))

        br.close()

    uniq = sorted(set(nodes))

    def rewritten(nn):
        for a, b in REWRITES:
            if norm(b) in nn and norm(nn.replace(norm(b), norm(a))) in blob:
                return True
        return False

    def provenance(t):
        """Return the name of the rule that clears this string, or None."""
        if t.strip() in BAR_LABELS:
            return "bar label"
        n = norm(t)
        if n and any(n in norm(o) for o in OPERATOR_COPY):
            return "SS15.6 operator-supplied"
        # SS14.7 permits exactly two SHAPE changes on an otherwise verbatim string, and
        # names both: an initial capital on an index caption, and the FAQ head's terminal
        # full stop. They are undone FIRST and the verbatim / SS14.3-rewrite rules then run
        # on the result -- two of the index captions carry a rewrite AND the capital.
        shapes = [(n, "")]
        if n and n[0].isupper():
            shapes.append((n[0].lower() + n[1:], " + SS14.7 initial capital"))
        if n.endswith("."):
            shapes.append((n[:-1].strip(), " + SS14.7 terminal full stop"))
        for nn, tag in shapes:
            if nn in blob:
                return "verbatim" + tag
            if rewritten(nn):
                return "SS14.3 rewrite" + tag
        return None

    graded = [(t, provenance(t)) for t in uniq]
    misses = [t for t, p in graded if p is None]
    counts = {}
    for _, p in graded:
        counts[p] = counts.get(p, 0) + 1
    chk("14.3-copy-gate", not misses,
        "%d distinct text nodes, %d misses %s; provenance %s (sources: freight template + "
        "content/work frontmatter + app/(foyer)/packages/page.tsx; exempt: "
        "the five bar labels). The two SS14.7 shape changes, in full: %s"
        % (len(uniq), len(misses), misses if misses else "", json.dumps(counts),
           json.dumps([[t, p] for t, p in graded if p and "SS14.7" in p])))

    # case-insensitive: SS14.7 gives the index captions their initial capital, so the
    # rendered strings read "Millions in ...".
    used = [b for a, b in REWRITES if any(norm(b) in norm(t).lower() for t in uniq)]
    seen = sorted(t for t in uniq if any(norm(b) in norm(t).lower() for a, b in REWRITES))
    chk("14.3-two-rewrites", len(REWRITES) == 2 and len(used) == 2,
        "the gate enumerates exactly 2 rewrites and both are used: "
        + "; ".join("%r -> %r" % r for r in REWRITES)
        + " -- as rendered, with SS14.7's initial capital: %s" % seen)

    years = sorted(set(y for t in uniq for y in re.findall(r"\b(?:19|20)\d{2}\b", t)))
    chk("14.3-no-years", not years, "zero years in the rendered text" if not years
        else "found %s" % years)

    figs = []
    for t in uniq:
        s = t
        for a in ALLOWED_FIGURES + ALLOWED_DIGIT_TOKENS:
            s = s.replace(a, " ")
        for d in re.findall(r"\S*\d\S*", s):
            figs.append((t, d))
    chk("14.3-no-figures", not figs,
        "zero digit-bearing tokens outside the allow-list "
        "(prices %s; non-figure digit tokens %s)" % (ALLOWED_FIGURES, ALLOWED_DIGIT_TOKENS)
        if not figs else "found %s" % figs[:12])

    size = os.path.getsize(built)
    chk("size", size <= 12 * 1024 * 1024, "%d bytes (%.2f MB), ceiling 12MB" % (size, size / 1048576))

    allpass = all(r["pass"] for r in RES)
    print("\n%d checks, %d pass, %d fail" % (len(RES), sum(r["pass"] for r in RES),
                                             sum(not r["pass"] for r in RES)))
    json.dump({"checks": RES, "screenshots": shots, "bytes": size, "all_pass": allpass},
              open(os.path.join(SCRATCH, "vfy", "rl8-result.json"), "w", encoding="utf-8"),
              indent=1)
    return 0 if allpass else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else BUILT))
