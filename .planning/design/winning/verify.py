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
  02 fingertip        the tip is <=60px from the "I" glyph box AND the "I" is LEFT of the tip
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
import json, os, re, sys, unicodedata
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
ALLOWED_DIGIT_TOKENS = ["80%", "80-percent", "v0", "01", "02", "03", "page 6"]
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


def finger_visible(page, png):
    """At the hold frame, is the pointing hand still a visible step off the wall where the
    veil has taken it to .55? Sample a box centred on the measured fingertip and compare its
    darkest decile against the wall 60px to its left."""
    box = page.evaluate("""()=>{const w=document.getElementById('stagewrap');
        const r=w.getBoundingClientRect();
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
    box = page.evaluate("""()=>{const r=document.getElementById('stagewrap')
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
            const v=document.getElementById('filmvid'); const r=w.getBoundingClientRect();
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
            const tn=[...rows[0].childNodes].filter(n=>n.nodeType===3&&n.textContent.trim())[0];
            const rg=document.createRange(); rg.setStart(tn,0); rg.setEnd(tn,1);
            const g=rg.getBoundingClientRect();
            const capk=parseFloat(getComputedStyle(document.documentElement)
                        .getPropertyValue('--capk'))||0.0591;
            const capTop=g.y+capk*parseFloat(getComputedStyle(h1).fontSize);
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
                    euclid:Math.hypot(dx,dy), dx:dx, dy:dy, Ileft:g.right<fx,
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
        chk("14.7-fingertip-to-I",
            all(v["euclid"] <= 60 and v["Ileft"] for v in pt.values()),
            "tip -> nearest point of the \"I\" glyph box, and the glyph LEFT of the tip: "
            + "; ".join(
                "%d: tip (%.0f, %.0f), I box [%.0f %.0f %.0f %.0f], dx %.1f dy %.1f, "
                "euclid %.1fpx (<=60), I left of tip=%s"
                % (W, pt[W]["fx"], pt[W]["fy"], pt[W]["I"][0], pt[W]["I"][1], pt[W]["I"][2],
                   pt[W]["I"][3], pt[W]["dx"], pt[W]["dy"], pt[W]["euclid"], pt[W]["Ileft"])
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
            "; ".join("%d: I at %.0f, sentence at %.0f, chips at %.0f, proof row ends %.0f "
                      "(stage ends %.0f, gutter 32)"
                      % (W, pt[W]["I"][0], pt[W]["ledeX"], pt[W]["chipsX"],
                         pt[W]["proofRight"], pt[W]["stage"]["right"])
                      for W in (1280, 1440, 1920)))

        # ---- 03 hero veil contrast at frames 0 / 48 / 96 ---------------------
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(600)
        bone_min, cop_min, det = 99, 99, []
        for fr in (0, 48, 96):
            t = set_frame(pg, "filmvid", fr)
            b = bg_contrast(pg, "#h1 .r:nth-child(1)", os.path.join(SCRATCH, "vfy", "_b.png"))
            c = bg_contrast(pg, "#h1 .r.cu", os.path.join(SCRATCH, "vfy", "_c.png"))
            if b:
                bone_min = min(bone_min, b)
            if c:
                cop_min = min(cop_min, c)
            det.append("f%d(t=%.2fs) bone %.2f copper %.2f" % (fr, t or 0, b or 0, c or 0))
        chk("14.1-hero-contrast", bone_min >= 4.5 and cop_min >= 3.0,
            "bone row min %.2f:1 (>=4.5), copper row min %.2f:1 (>=3.0) | %s"
            % (bone_min, cop_min, "; ".join(det)))

        # ---- 02b the out-of-flow hero block must never reach section 02 ------
        clear = []
        for W in (1440, 1280, 1024, 900):
            pg.set_viewport_size({"width": W, "height": 900})
            pg.wait_for_timeout(400)
            g = pg.evaluate("""()=>{const c=document.getElementById('herocopy');
                const o=document.getElementById('operator');
                const w=document.getElementById('stagewrap');
                return {gap:o.getBoundingClientRect().top-c.getBoundingClientRect().bottom,
                        over:c.getBoundingClientRect().bottom-w.getBoundingClientRect().bottom};}""")
            clear.append((W, g["gap"], g["over"]))
        chk("14.1-hero-clearance", all(g > 0 for _, g, _ in clear),
            "hero block foot -> operator top: " + ", ".join(
                "%d: %+.0fpx clear (block runs %+.0fpx past the stage's foot)" % c
                for c in clear))
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(400)

        # ---- 03b the gesture has to survive the veil -------------------------
        set_frame(pg, "filmvid", 96)
        pg.evaluate("()=>window.scrollTo(0,0)")
        pg.wait_for_timeout(500)
        vis = finger_visible(pg, os.path.join(SCRATCH, "vfy", "_finger.png"))
        hand = hand_reads(pg, os.path.join(SCRATCH, "vfy", "_hand.png"))
        chk("14.1-hand-reads", all(d >= 10 for _, d in hand),
            "1440, hold frame: the hand's own band (source x 460..660 -- knuckles, fist, "
            "wrist) against the wall beside it, BELOW the fingertip: "
            + ", ".join("%d%% of the stage %+.0f levels" % (pc, d) for pc, d in hand)
            + " (>=10 at every height, or the gesture is a fingertip with nothing attached)")
        chk("14.1-finger-visible", vis and vis["delta"] >= 25,
            "1440, hold frame: the fingertip band reads %.0f against a local wall of %.0f "
            "-- a %.0f-level step (>=25 to read at 1x); sampled in a %dx%d box centred on "
            "the measured fingertip" % (vis["ink"], vis["wall"], vis["delta"],
                                        vis["bw"], vis["bh"]))

        # ---- 05/06 operator overlay -----------------------------------------
        pg.evaluate("()=>document.getElementById('operator').scrollIntoView()")
        pg.wait_for_timeout(900)
        opm = pg.evaluate("""()=>{
            const s=document.getElementById('opstage'), o=document.getElementById('opover');
            const h=document.getElementById('oph2');
            const side=document.querySelector('.opside');
            const lead=document.querySelector('.opside .lead');
            const sig=document.querySelector('.opside .sig');
            const p1=document.querySelector('.opover p');
            const sr=s.getBoundingClientRect(), hr=h.getBoundingClientRect();
            const p1r=p1?p1.getBoundingClientRect():null;
            return {sw:sr.width,sh:sr.height,st:sr.top,sb:sr.bottom,
                    ht:hr.top,hb:hr.bottom,
                    p1t:p1r?p1r.top:null,p1b:p1r?p1r.bottom:null,
                    sidet:side.getBoundingClientRect().top,
                    leadt:lead.getBoundingClientRect().top,
                    hasSig:!!sig, ov:getComputedStyle(o).position,
                    hfs:parseFloat(getComputedStyle(h).fontSize),
                    d2:parseFloat(getComputedStyle(document.documentElement)
                        .getPropertyValue('--d2'))||null};}""")
        third = opm["st"] + opm["sh"] * 2 / 3
        chk("14.2-op-square",
            abs(opm["sw"] - opm["sh"]) <= 1.5 and opm["ov"] == "absolute"
            and opm["ht"] >= third - 12 and opm["hb"] <= opm["sb"] + 2,
            "square stage %.1fx%.1f; heading top %.1f is inside the lower third (starts %.1f) "
            "and its foot %.1f is inside the film (%.1f); overlay position=%s"
            % (opm["sw"], opm["sh"], opm["ht"], third, opm["hb"], opm["sb"], opm["ov"]))
        chk("14.2-op-columns",
            opm["p1t"] is not None and opm["p1t"] >= opm["hb"] - 2
            and opm["p1b"] <= opm["sb"] + 2 and abs(opm["leadt"] - opm["st"]) <= 4
            and opm["hasSig"],
            "first paragraph %.1f..%.1f sits under the heading (%.1f) and on the film "
            "(foot %.1f); right column top %.1f vs film top %.1f (top-aligned); "
            "section line present=%s"
            % (opm["p1t"], opm["p1b"], opm["hb"], opm["sb"], opm["leadt"], opm["st"],
               opm["hasSig"]))
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
        chk("14.7-op-veil-62-82",
            bool(s60) and abs(s60[0] - 62) < 0.6 and bool(s100) and abs(min(s100) - 82) < 0.6,
            "the operator veil reaches .6 at %s%% (SS14.7 wants 62) and solid at %s%% "
            "(wants 82); every stop: %s"
            % (s60[0] if s60 else "-", min(s100) if s100 else "-",
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
            and all(abs(n - 19) < 0.6 for n in sizes["caps"])
            and all(abs(x - 120) < 1 for x in sizes["air"]),
            "--d2=%.1f; %d section heads all at --d2 %s; index names %s; FAQ q %s / a %s; "
            "captions %s; section air %s; hero --d=%.1f, ask --d=%.1f (only these two)"
            % (d2, len(sizes["heads"]), [round(h[1], 1) for h in sizes["heads"]],
               sizes["names"], sizes["q"], sizes["a"], sizes["caps"], sizes["air"],
               sizes["hd"], sizes["ask"]))

        # ---- 11b/c/d SS14.7: the FAQ stop, the caption capitals, the middot ----
        tp = pg.evaluate(r"""()=>{
            const faq=[...document.querySelectorAll('.sec h2')].find(
                e=>/objections/i.test(e.textContent));
            const caps=[...document.querySelectorAll('.prf .cap')].map(e=>e.textContent.trim());
            return {faq:faq?faq.textContent.trim():null, caps:caps};}""")
        chk("14.7-faq-full-stop", bool(tp["faq"]) and tp["faq"].endswith("."),
            "the FAQ head reads %r" % tp["faq"])
        lower = [c for c in tp["caps"] if c and c[0].islower()]
        chk("14.7-captions-initial-capital", not lower,
            "%d index captions, every one opening on a capital: %s"
            % (len(tp["caps"]), [c[:26] for c in tp["caps"]]))

        # the middot: glyph-by-glyph line grouping, so "last thing on a line" is measured,
        # not inferred from where the nbsp were put.
        MID_JS = r"""()=>{
            const h=[...document.querySelectorAll('.sec h2')].find(
                e=>/Operating principles/.test(e.textContent));
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
        never_last = all(l["last"] != "\u00b7" for W in WW for l in mid[W])
        never_first = all(l["line"].lstrip()[:1] != "\u00b7" for W in WW for l in mid[W])
        axis = pg.evaluate(r"""()=>{const o={};
            document.querySelectorAll('.sec h2').forEach(h=>{
              o[(h.closest('[id]')||{}).id||'?']=getComputedStyle(h).fontVariationSettings;});
            return o;}""")
        one_axis = len(set(axis.values())) == 1 and '"wdth" 115' in set(axis.values()).pop()
        chk("15.4-work-head-one-axis-middot-interior",
            one_axis and never_last and never_first,
            "every section head on one width axis: %s (round 9 wants wdth 115 on all five, "
            "the head free to wrap). Rows, glyph-grouped: %s"
            % (json.dumps(axis),
               "; ".join("%d: %d row(s) %s" % (W, len(mid[W]),
                         [(l["line"], "opens %r ends %r" % (l["line"].lstrip()[:1], l["last"]))
                          for l in mid[W]]) for W in WW)))
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
              chipT:cards.map(c=>c.querySelector('.cta .chip .t').textContent.trim()),
              chipFits:cards.map(c=>{const t=c.querySelector('.cta .chip .t');
                 return chipInk(t)<=t.getBoundingClientRect().width+0.5;}),
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
        chk("15.5-cards",
            widths_eq and spread <= 2.0
            and all(abs(f - 72) < 0.6 for f in cd["pr"])
            and all(abs(f - 24) < 0.6 for f in cd["nameFs"])
            and all("Hanken" in f for f in cd["nameFam"])
            and all(w == "500" for w in cd["nameWt"])
            and all(r == "8px" for r in cd["radius"])
            and all(pp.startswith("28px") or pp == "27px 28px 28px" for pp in cd["pad"])
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
        # SS15.5: a 2px COPPER TOP RULE on the Audit, and no full copper box.
        top_ok = (marked == [1]
                  and cd["borders"][1][0].startswith("2px")
                  and "200, 84, 43" in cd["borders"][1][0]
                  and not any("200, 84, 43" in cd["borders"][1][k] for k in (1, 2, 3))
                  and not any("200, 84, 43" in bd for i in (0, 2) for bd in cd["borders"][i]))
        chk("15.5-audit-top-rule", top_ok,
            "the Audit's four borders are %s -- a 2px copper rule on the TOP edge and the "
            "hairline on the other three, which is the rank SS15.5 asks for and not the full "
            "copper box of v4; the other two cards read %s and %s"
            % (cd["borders"][1], cd["borders"][0], cd["borders"][2]))
        pk = open(PACKAGES, encoding="utf-8").read()
        live = re.findall(r'(?<!aria-)label="([^"]*)"', pk)
        chk("14.7-chip-labels-are-the-live-buttons",
            cd["chipT"] == live and all(cd["chipFits"]),
            "the three card chips read %s; app/(foyer)/packages/page.tsx renders %s "
            "(BuyButton appends the arrow, which the chip carries as its own glyph); each "
            "label fits its chip without clipping: %s"
            % (cd["chipT"], live, cd["chipFits"]))

        # ---- 15.5b Engagements: the top tier ---------------------------------
        eb = pg.evaluate(r"""()=>{const e=document.getElementById('ebar');
            const r=e.getBoundingClientRect(), cs=getComputedStyle(e);
            const cards=document.querySelector('.cards').getBoundingClientRect();
            const hd=e.querySelector('.hd'), v=e.querySelector('.v');
            const dsc=e.querySelector('.dsc'), chip=e.querySelector('.chip');
            const d2=0.76*parseFloat(getComputedStyle(document.getElementById('h1')).fontSize);
            const runs=[];
            const w=document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
            let n; while((n=w.nextNode())){
              const t=n.textContent.replace(/\s+/g,' ').trim(); if(!t) continue;
              const el=n.parentElement, st=getComputedStyle(el);
              runs.push({t:t, color:st.color, fs:parseFloat(st.fontSize),
                         hidden:!!el.closest('[aria-hidden="true"]'),
                         bg:(()=>{let q=el; while(q&&q!==document.body){
                            const c=getComputedStyle(q).backgroundColor;
                            if(c && c!=='rgba(0, 0, 0, 0)' && c!=='transparent') return c;
                            q=q.parentElement;} return 'rgb(13, 13, 15)';})()});}
            return {tag:e.tagName, href:e.getAttribute('href'),
                    links:e.querySelectorAll('a').length,
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
        chk("15.5-engagements",
            eb["tag"] == "A" and eb["links"] == 0
            and eb["h"] >= 219.5 and abs(eb["w"] - eb["cardsW"]) <= 1.0
            and abs(eb["gapAbove"] - 24) <= 1.0 and eb["radius"] == "16px"
            and eb["bt"].startswith("2px") and "200, 84, 43" in eb["bt"]
            and all(x == "0px" for x in eb["bo"])
            and "13, 13, 15" in eb["bg"]
            and abs(eb["hdFs"] - eb["d2"]) < 1.0 and abs(eb["dscFs"] - 21) < 0.6
            and abs(eb["vFs"] - 64) < 0.6
            and eb["hdX"] < eb["mid"] and eb["vRight"] > eb["mid"]
            and eb["chipRight"] > eb["mid"]
            and worst_word >= 4.5 and worst_glyph >= 3.0,
            "one <%s> with %d links inside it -> %s; %.0fpx tall (>=220), %.1fpx wide == the "
            "cards row %.1f, %.1fpx below it; radius %s; top border %s and nothing on the "
            "other three (%s); ground %s; 'Engagements' at %.1f == --d2 %.1f on the LEFT "
            "(x %.0f of a midline %.0f) with the descriptor at %.0fpx; the figure at %.0fpx "
            "and the chip %r on the RIGHT; every word run >= %.2f:1 and the one aria-hidden "
            "24px arrow at %.2f:1 (SS11: copper's ceiling is 4.41 on espresso and 3.85 on "
            "bone, so large text takes the 3:1 bar). Runs: %s"
            % (eb["tag"], eb["links"], eb["href"], eb["h"], eb["w"], eb["cardsW"],
               eb["gapAbove"], eb["radius"], eb["bt"], eb["bo"], eb["bg"], eb["hdFs"],
               eb["d2"], eb["hdX"], eb["mid"], eb["dscFs"], eb["vFs"], eb["chipT"],
               worst_word, worst_glyph, runs))

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
                    dt:qs.map(e=>parseFloat(getComputedStyle(e.querySelector('dt')).fontSize)),
                    dd:qs.map(e=>parseFloat(getComputedStyle(e.querySelector('dd')).fontSize)),
                    gap:getComputedStyle(dl).columnGap, content:content};}""")
        wexp2 = (fq["content"] - 48) / 3.0
        chk("15.3-objections-three-columns",
            fq["n"] == 3 and len(set(fq["tops"])) == 1
            and max(fq["w"]) - min(fq["w"]) <= 1.0 and abs(fq["w"][0] - wexp2) <= 1.0
            and all(r == "1px solid" for r in fq["rule"])
            and all(x == fq["x"][0] or True for x in fq["x"])
            and all(abs(x - 24) < 0.6 for x in fq["dt"])
            and all(abs(x - 17) < 0.6 for x in fq["dd"]),
            "1440: three columns on ONE row (tops %s) at %s -- each (content - 48)/3 = %.2f "
            "of a %.0f content, equal within %.2fpx; hairline tops %s; questions %s / "
            "answers %s; column gap %s"
            % (fq["tops"], fq["w"], wexp2, fq["content"], max(fq["w"]) - min(fq["w"]),
               set(fq["rule"]), fq["dt"], fq["dd"], fq["gap"]))

        # ---- 15.2 the manual -------------------------------------------------
        mn = pg.evaluate(r"""()=>{
            const art=document.querySelector('.manual .art');
            const fr=art.querySelector('.frame'), img=art.querySelector('img');
            const copy=document.querySelector('.manual .copy');
            const grid=document.querySelector('.manual .grid');
            const cols=getComputedStyle(grid).gridTemplateColumns.split(' ').map(parseFloat);
            const gap=parseFloat(getComputedStyle(grid).columnGap);
            const want15=cols.slice(0,5).reduce((a,b)=>a+b,0)+4*gap;
            const want612=cols.slice(5,12).reduce((a,b)=>a+b,0)+6*gap;
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
                    buyFs:parseFloat(getComputedStyle(buyV).fontSize),
                    buyTxt:buyV.textContent.replace(/\s+/g,' ').trim(),
                    chipTxt:chip.textContent.replace(/\s+/g,' ').trim(),
                    chipH:+chip.getBoundingClientRect().height.toFixed(0)};}""")
        chk("15.2-manual",
            mn["nw"] == 720 and mn["nh"] == 1018 and mn["complete"]
            and abs(mn["artW"] - mn["want15"]) <= 1.0
            and abs(mn["copyW"] - mn["want612"]) <= 1.0 and mn["copyRightOfArt"]
            and abs(mn["frameW"] - mn["artW"]) <= 0.6
            and abs(mn["frameAr"] - 0.8) <= 0.01
            and mn["border"] == "1px dashed"
            and abs(mn["imgW"] - mn["inner"]) <= 0.6 and mn["imgFit"] == "cover"
            and abs(mn["headFs"] - mn["d2"]) < 1.0
            and all(abs(f - 21) < 0.6 for f in mn["lineFs"])
            and all(r == "1px solid" for r in mn["lineRule"])
            and mn["lastBottom"] == "1px"
            and abs(mn["buyFs"] - 64) < 0.6,
            "the cover DECODES in Chromium: naturalWidth %d x %d, complete=%s; the dashed "
            "frame (%s) fills cols 1-5 -- %.1f wide against the measured column span %.1f -- "
            "at 4:5 (%.1f x %.1f = %.4f) with the cover filling its content box (%.1f of "
            "%.1f, object-fit %s); the copy holds cols 6-12 (%.1f vs %.1f) to the RIGHT of "
            "it; display line %.1f == --d2 %.1f; three symptom rows at %s on %s hairlines "
            "(the last closing on a %s rule); the buy figure %r at %.0fpx with the chip %r "
            "at %dpx"
            % (mn["nw"], mn["nh"], mn["complete"], mn["border"], mn["frameW"], mn["want15"],
               mn["frameW"], mn["frameH"], mn["frameAr"], mn["imgW"], mn["inner"],
               mn["imgFit"], mn["copyW"], mn["want612"], mn["headFs"], mn["d2"],
               mn["lineFs"], set(mn["lineRule"]), mn["lastBottom"], mn["buyTxt"],
               mn["buyFs"], mn["chipTxt"], mn["chipH"]))

        # ---- SS11 the bar over the copper field is espresso with bone labels --
        pg.evaluate("""()=>{const a=document.getElementById('contact');
            window.scrollTo(0, a.offsetTop + 240);}""")
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
            "contrast %.2f:1 (>=4.5). Not copper, not bone." % (barm["bg"], barm["dark"], worst))

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
            return {panels:sec.querySelectorAll('.panel,[data-panel]').length,
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
            and all(x >= wk["mid"] - 0.5 for x in wk["sX"])
            # computed style resolves ch to px, so the measure is divided back out by the
            # element's own '0' advance and asserted as 46 characters.
            and all(abs(c - 46) <= 0.5 for c in wk["sCh"])
            and all(r == "1px solid" for r in wk["rule"])
            and wk["lastRule"] == "1px"
            and all(abs(x - wk["contentW"]) <= 1.0 for x in wk["w"]),
            "#work now holds %d .panel, %d <svg>, %d <img>, %d <video> and %d "
            "sticky/fixed elements %s -- SS15.4 wants zero of each. Three full-width rows "
            "(%s of a %.0f content): ordinals %s in the label style (%s at %s, %s), the step "
            "names %s at %s == --d2 %.1f, and each sentence at %s on a %s measure (%s = 46ch) "
            "starting "
            "at x %s against the section's midline %.0f (the right half); hairlines %s, the "
            "ledger closing on a %s rule"
            % (wk["panels"], wk["svg"], wk["img"], wk["video"], len(wk["sticky"]),
               wk["sticky"] or "[]", wk["w"], wk["contentW"], wk["ord"],
               [f.split(",")[0] for f in wk["ordFam"]], wk["ordFs"], set(wk["ordTr"]),
               wk["nm"], [round(x, 1) for x in wk["nmFs"]], wk["d2"], wk["sFs"],
               wk["sCh"], set(wk["sMeasure"]), wk["sX"], wk["mid"], set(wk["rule"]),
               wk["lastRule"]))

        # ---- 15.6 the record index, consolidated -----------------------------
        # SS15.6 supersedes SS14.3's seven-row ledger: two receipts and a way out.
        rec = pg.evaluate(r"""()=>{
            const rows=[].slice.call(document.querySelectorAll('.prf'));
            const more=[].slice.call(document.querySelectorAll('.prfx'));
            const head=document.querySelector('#proof .sec h2').textContent.trim();
            const geo=e=>{const b=e.getBoundingClientRect(), c=getComputedStyle(e);
                return {h:Math.round(b.height), rule:c.borderBottomWidth+' '
                        +c.borderBottomStyle, x:Math.round(b.x),
                        w:Math.round(b.width)};};
            return {head:head,
              prf:rows.map(e=>({tag:e.tagName, href:e.getAttribute('href')||'',
                 who:e.querySelector('.who').textContent.trim(),
                 cap:e.querySelector('.cap').textContent.trim(),
                 whoFs:parseFloat(getComputedStyle(e.querySelector('.who')).fontSize),
                 capFs:parseFloat(getComputedStyle(e.querySelector('.cap')).fontSize),
                 arrow:!!e.querySelector('.ar'), geo:geo(e)})),
              more:more.map(e=>({tag:e.tagName, href:e.getAttribute('href')||'',
                 who:e.querySelector('.who').textContent.trim(),
                 arrow:(e.querySelector('.ar')||{}).textContent,
                 geo:geo(e)}))};}""")
        prf = rec["prf"]
        allink = all(r["tag"] == "A" and r["href"] and r["arrow"] for r in prf)
        stops = [r["cap"] for r in prf if r["cap"].endswith(".")]
        names = [r["who"] for r in prf]
        more = rec["more"]
        chk("15.6-receipts-consolidated",
            len(prf) == 2 and names == ["Guardicore", "RFP engine for an industry author"]
            and allink and not stops
            and all(abs(r["whoFs"] - 28) < 0.6 for r in prf)
            and all(abs(r["capFs"] - 19) < 0.6 for r in prf)
            and len(more) == 1 and more[0]["tag"] == "A"
            and more[0]["who"] == "See the rest"
            and more[0]["arrow"] == "\u2192"
            and more[0]["href"] == "https://www.micahjonesconsulting.com/work?from=mock-proof"
            and more[0]["geo"]["rule"] == prf[0]["geo"]["rule"]
            and more[0]["geo"]["x"] == prf[0]["geo"]["x"]
            and more[0]["geo"]["w"] == prf[0]["geo"]["w"]
            and rec["head"] == "The receipts. Every line below is real.",
            "exactly %d .prf rows -- %s -- each a link carrying an arrow (%s), names at %s "
            "and captions at %s, zero captions ending in a full stop (tails %s); then ONE "
            "row-shaped link %r + %r to %s, sharing the rows' geometry (%s vs %s). The head "
            "is unchanged: %r"
            % (len(prf), names, allink, [r["whoFs"] for r in prf],
               [r["capFs"] for r in prf], [r["cap"][-24:] for r in prf],
               more[0]["who"], more[0]["arrow"], more[0]["href"], more[0]["geo"],
               prf[0]["geo"], rec["head"]))

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
        more_n = np_.locator(".prfx").count()
        eng_b = np_.locator("#ebar").bounding_box()
        cov_b = np_.locator(".manual .art .frame").bounding_box()
        barvis = np_.locator("#bar").is_visible()
        nctx.close()
        # the fingertip, from CSS alone: 19.375% across and 38.2407% down the 16:9 stage.
        ftx = stg["x"] + stg["width"] * 0.19375
        fty = stg["y"] + stg["height"] * 0.382407
        chk("14.8-renders-with-javascript-off",
            rows_n == 2 and cards_n == 3 and steps_n == 3 and qs_n == 3
            and prf_n == 2 and more_n == 1 and barvis
            and abs(stg["width"] * 9 / 16 - stg["height"]) <= 1.5
            and h1b["x"] < ftx and ftx - h1b["x"] <= 60
            and abs(h1b["y"] - fty) <= 40
            and eng_b["height"] >= 219.5 and cov_b["width"] > 0,
            "scripting DISABLED: the 16:9 stage is %.0fx%.0f and the headline block starts "
            "at (%.0f, %.0f) against the CSS-only fingertip (%.0f, %.0f) -- %.0fpx to its "
            "left, from :root's measured percentages and nothing else; %d headline rows, "
            "%d cards, %d ledger rows, %d objection columns, %d receipts + %d 'see the "
            "rest' link, the engagements block %.0fpx tall, the cover frame %.0fpx wide, "
            "and the bar visible=%s (the <noscript> rule opens it)"
            % (stg["width"], stg["height"], h1b["x"], h1b["y"], ftx, fty, ftx - h1b["x"],
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
        chk("discipline", disc["kf"] == 0 and disc["gsap"] == "undefined"
            and not disc["blends"] and not bad,
            "@keyframes=%d, gsap=%s, mix-blend-mode elements=%d, banned faces=%s, "
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
                    and m["Ileft"] and m["dx"] <= 50
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

        chk("14.7-hero-mobile", all(mob_ok(m) for m in mob.values()),
            " || ".join(
                "%d: stage %.0fx%.0f cropped %s; fingertip (%.1f, %.1f) = %.2f%% across "
                "(SS14.7 wants ~26) and %.2f%% down; \"I\" box left edge %.1f, %.1fpx LEFT "
                "of the tip (<=50, I left=%s); rows %s; visible source window %.0f..%.0f "
                "(the face at 1010..1290 is inside); headline box %.0f..%.0f inside the "
                "stage %.0f..%.0f; the sentence starts %.0f, the stage ends %.0f; bar "
                "opacity %s, %.0fpx tall, and the stage opens at y %.0f CLEAR of it"
                % (W, mob[W]["stage"]["w"], mob[W]["stage"]["h"], mob[W]["objpos"],
                   mob[W]["fx"], mob[W]["fy"], mob[W]["fpct"][0], mob[W]["fpct"][1],
                   mob[W]["I"][0], mob[W]["dx"], mob[W]["Ileft"],
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

        # the veil is re-cut from the new cap-top at BOTH ends of the ladder, so the two
        # rows are measured over the film on the phone too.
        pg.set_viewport_size({"width": 390, "height": 844})
        pg.reload()
        pg.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        pg.wait_for_timeout(1600)
        mb, mc, mdet = 99, 99, []
        for fr in (0, 48, 96):
            t = set_frame(pg, "filmvid", fr)
            pg.evaluate("()=>window.scrollTo(0,0)")
            pg.wait_for_timeout(200)
            b = bg_contrast(pg, "#h1 .r:nth-child(1)", os.path.join(SCRATCH, "vfy", "_mb.png"))
            c2 = bg_contrast(pg, "#h1 .r.cu", os.path.join(SCRATCH, "vfy", "_mc.png"))
            if b:
                mb = min(mb, b)
            if c2:
                mc = min(mc, c2)
            mdet.append("f%d(t=%.2fs) bone %.2f copper %.2f" % (fr, t or 0, b or 0, c2 or 0))
        chk("14.7-hero-contrast-390", mb >= 4.5 and mc >= 3.0,
            "390, veil re-cut from the new cap-top: bone row min %.2f:1 (>=4.5), copper row "
            "min %.2f:1 (>=3.0) | %s" % (mb, mc, "; ".join(mdet)))

        pg.evaluate("()=>document.getElementById('operator').scrollIntoView({block:'start'})")
        pg.wait_for_timeout(1000)
        mop = pg.evaluate("""()=>{const s=document.getElementById('opstage');
            const h=document.getElementById('oph2');
            const sr=s.getBoundingClientRect(), hr=h.getBoundingClientRect();
            return {sw:sr.width,sh:sr.height,iw:innerWidth,
                    top:(hr.top-sr.top)/sr.height*100, foot:(hr.bottom-sr.top)/sr.height*100,
                    right:hr.right-sr.right};}""")
        alive = op_film_alive(pg, os.path.join(SCRATCH, "vfy", "_op390.png"), mop["top"])
        chk("14.2-op-mobile-overlay",
            abs(mop["sw"] - mop["iw"]) <= 1 and abs(mop["sw"] - mop["sh"]) <= 1.5
            and 58 <= mop["top"] <= 72 and mop["foot"] <= 100 and mop["right"] <= 0.5
            and alive >= 12,
            "390: film %.0fx%.0f is the FULL width (%d) and square; heading cap row starts "
            "%.1f%% of the square and ends %.1f%%, %.0fpx inside its right edge; live film "
            "under the veil at the cap row reads %+d levels off the solid espresso "
            "(>=12, or the type is a caption under a photograph)"
            % (mop["sw"], mop["sh"], mop["iw"], mop["top"], mop["foot"], -mop["right"], alive))

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
                        '.hd, .v, .dsc, .chip')].map(
                        x=>Math.round(x.getBoundingClientRect().top)))].length,
                    engCols:[...new Set([...e.querySelectorAll(
                        '.hd, .v, .dsc, .chip')].map(
                        x=>Math.round(x.getBoundingClientRect().left)))].length,
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
        chk("15.5-cards-mobile",
            stacked and all(w == mcard["inner"] for w in mcard["w"])
            and all(r == "8px" for r in mcard["radius"])
            and mk[0].startswith("2px") and "200, 84, 43" in mk[0]
            and not any("200, 84, 43" in bd for i in (0, 2) for bd in mcard["borders"][i])
            and all(x >= mcard["gut"] - 0.5 for x in mcard["x"])
            and all(r <= mcard["iw"] - mcard["gut"] + 0.5 for r in mcard["right"])
            and mcard["rowMargin"].replace(" ", "") in ("0px", "0px0px0px0px")
            and mcard["engH"] >= 220 and mcard["engRows"] == 4
            and mcard["engCols"] == 1
            and mcard["engW"] == mcard["inner"]
            and abs(mcard["air"] - 64) < 1,
            "390: the three cards stack (tops %s) at the full %dpx content width %s, keeping "
            "their 8px ground %s; the Audit's borders are %s -- the SAME 2px copper TOP rule "
            "as the desktop, no box, no bleed (row margin %s, x %s, right %s of a %dpx "
            "viewport); the engagements block stacks into %d rows on %d left edge(s), %dpx "
            "tall and %dpx wide; "
            "section air %.0fpx"
            % (mcard["tops"], mcard["inner"], mcard["w"], set(mcard["radius"]), mk,
               mcard["rowMargin"], mcard["x"], mcard["right"], mcard["iw"],
               mcard["engRows"], mcard["engCols"], mcard["engH"], mcard["engW"],
               mcard["air"]))
        chk("15.3-objections-mobile",
            len(set(mcard["qTops"])) == 3 and all(w == mcard["inner"] for w in mcard["qW"])
            and all(abs(g - 40) <= 1 for g in mcard["qGaps"]),
            "390: the three objections stack (tops %s) at the full %dpx width %s, on %s "
            "gaps (SS15.3 wants 40)"
            % (mcard["qTops"], mcard["inner"], mcard["qW"], mcard["qGaps"]))
        chk("15.2-manual-mobile",
            mcard["artTop"] < mcard["copyTop"] and mcard["artW"] == mcard["inner"],
            "390: the cover comes FIRST (its top %d, the copy's %d) at the full %dpx width"
            % (mcard["artTop"], mcard["copyTop"], mcard["artW"]))
        # SS15.2 send-back (round 8): the file line under the cover was a two-column row at
        # 390 and both halves wrapped. It must stack into two WHOLE lines on one left edge.
        chk("15.2-fileline-mobile",
            mcard["capDir"] == "column" and mcard["capRows"] == 2
            and mcard["capRects"] == [1, 1] and mcard["capX"] == 1,
            "390: the manual's file line is %s with %d rows sharing %d left edge(s), and "
            "each label occupies %s client rect(s) -- 1 each means neither wraps"
            % (mcard["capDir"], mcard["capRows"], mcard["capX"], mcard["capRects"]))

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
