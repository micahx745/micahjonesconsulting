"""Verify the built "Room and Ledger" page against WINNING-BRIEF-2026-09-05.md SS14.

    cd <scratchpad>/vfy && python -P verify.py [built.html]

-P matters: the scratchpad holds a `copy.py` that shadows the stdlib `copy` module.

Every check is measured in Chromium through file://. Nothing is asserted from the source
text alone except the copy gate, which reads the built HTML and the three verified copy
sources (freight template, content/work/*.mdx frontmatter, components/color-worlds/
WallChart.tsx).

Checks, in SS14 order (SS14.7 supersedes SS14.1's gutter pin and SS14.5's card row):
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
  09 copy-gate        every text node is verbatim in a verified source, or one of two rewrites,
                      or one of the two SS14.7 shape changes (an index caption's initial
                      capital, the FAQ head's terminal full stop)
  10 two-rewrites     the gate enumerates exactly the two SS14.3 rewrites, and both are used
  11 heads            section heads at --d2; index names 28; FAQ 28/19; captions 19; air 120/64
  11b faq-stop        the FAQ head ends in a full stop
  11c captions-caps   every index caption opens on a capital
  11d middot          the middot is never the last thing on a line, at 1440 or 390
  12 cards            three equal cards, CTA chips level, 64px price, and the first glyph on
                      the section gutter (x = 32 at 1440)
  12b card-mark       the Audit is a box border at >=900 and a 2px copper LEFT RULE at 390,
                      with nothing beyond the 20px gutter
  12c chip-labels     the three chips read the live /packages button labels verbatim
  13 ebar             one link, 104px, espresso ground, outlined copper pill; phone stack
  14 panels           01 diagram / 02 type / 03 type, one frame geometry, no photograph
  14d wallchart       three capsules with leaders, every label inside its own plate, and no
                      leader or head touching a plate or a label at 1440 or 390
  15 hero-rows        both hero display rows unwrapped and inside the content width
  16 no-hscroll       390 and 360 have no horizontal scroll
  17 media            two <video>, correct attributes, ONE 720 source each, readyState >= 2
  18 discipline       zero @keyframes, no gsap, no mix-blend-mode, no banned faces
  19 proof-row        the hero proof row reads exactly "Four exits, $5B+ combined."
"""
import json, os, re, sys, unicodedata
from playwright.sync_api import sync_playwright

REPO = r"C:\Users\micah\Code\micahjonesconsulting"
DESIGN = os.path.join(REPO, ".planning", "design")
FREIGHT = os.path.join(DESIGN, "freight", "the-receipts.template.html")
WORK = os.path.join(REPO, "content", "work")
WALLCHART = os.path.join(REPO, "components", "color-worlds", "WallChart.tsx")
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
    wc = open(WALLCHART, encoding="utf-8").read()
    # the SVG's own <text> children and the figcaption, as live code writes them
    parts.append("\n".join(re.findall(r">\s*([^<>{}\n][^<>{}]*?)\s*<", wc)))
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
            and all(abs(n - 28) < 0.6 for n in sizes["q"])
            and all(abs(n - 19) < 0.6 for n in sizes["a"])
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
        for W in (1440, 390):
            pg.set_viewport_size({"width": W, "height": 900})
            pg.wait_for_timeout(450)
            pg.evaluate("()=>document.getElementById('work').scrollIntoView({block:'start'})")
            pg.wait_for_timeout(400)
            mid[W] = pg.evaluate(MID_JS)
        chk("14.7-middot-never-ends-a-line",
            all(l["last"] != "\u00b7" for W in mid for l in mid[W]),
            "; ".join("%d: %s" % (W, [(l["line"], "ends %r" % l["last"]) for l in mid[W]])
                      for W in (1440, 390)))
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(400)

        # ---- 12 cards (SS14.5 as amended by SS14.7) --------------------------
        # SS14.7 pulls the card ROW 25px into the gutter -- 24px of card padding plus the
        # card's own 1px border -- so the first glyph lands on the section gutter (32px at
        # 1440) and the three interiors span exactly the content width. Each card BOX is
        # therefore content/3, not (content - 48)/3, and each interior is (content - 144)/3.
        cd = pg.evaluate(r"""()=>{
            const cards=[].slice.call(document.querySelectorAll('.card'));
            const first=cards[0].querySelector('.l');
            const tn=[...first.childNodes].filter(n=>n.nodeType===3)[0];
            const rg=document.createRange(); rg.setStart(tn,0); rg.setEnd(tn,1);
            const glyph=rg.getBoundingClientRect();
            const sec=document.querySelector('.price');
            const content=sec.getBoundingClientRect().width
                - 2*parseFloat(getComputedStyle(sec).paddingLeft);
            const gut=parseFloat(getComputedStyle(sec).paddingLeft);
            const chipInk=t=>{const q=document.createRange(); q.selectNodeContents(t);
                              return q.getBoundingClientRect().width;};
            return {w:cards.map(c=>c.getBoundingClientRect().width),
              x:cards.map(c=>c.getBoundingClientRect().x),
              right:cards.map(c=>c.getBoundingClientRect().right),
              chipTops:cards.map(c=>c.querySelector('.cta .chip').getBoundingClientRect().top),
              chipH:cards.map(c=>c.querySelector('.cta .chip').getBoundingClientRect().height),
              chipT:cards.map(c=>c.querySelector('.cta .chip .t').textContent.trim()),
              chipFits:cards.map(c=>{const t=c.querySelector('.cta .chip .t');
                 return chipInk(t)<=t.getBoundingClientRect().width+0.5;}),
              pr:cards.map(c=>parseFloat(getComputedStyle(c.querySelector('.pr')).fontSize)),
              hair:cards.map(c=>getComputedStyle(c.querySelector('.pblock')).borderBottomWidth),
              borders:cards.map(c=>{const st=getComputedStyle(c);
                 return [st.borderTopWidth+' '+st.borderTopColor,
                         st.borderRightWidth+' '+st.borderRightColor,
                         st.borderBottomWidth+' '+st.borderBottomColor,
                         st.borderLeftWidth+' '+st.borderLeftColor];}),
              mark:cards.map(c=>c.classList.contains('mark')),
              content:content, gutter:gut, glyphX:glyph.x, labelX:first.getBoundingClientRect().x,
              lastRight:cards[2].getBoundingClientRect().right
                - parseFloat(getComputedStyle(cards[2]).paddingRight)
                - parseFloat(getComputedStyle(cards[2]).borderRightWidth),
              bg:cards.map(c=>getComputedStyle(c).backgroundColor),
              sh:cards.map(c=>getComputedStyle(c).boxShadow),
              vw:window.innerWidth};}""")
        wexp = cd["content"] / 3.0
        spread = max(cd["chipTops"]) - min(cd["chipTops"])
        widths_eq = max(cd["w"]) - min(cd["w"]) <= 0.8 and abs(cd["w"][0] - wexp) <= 1.0
        chk("14.5-cards",
            widths_eq and spread <= 2.0 and all(abs(f - 64) < 0.6 for f in cd["pr"])
            and all(h == "1px" for h in cd["hair"])
            and all(b in ("rgba(0, 0, 0, 0)", "transparent") for b in cd["bg"])
            and all(x == "none" for x in cd["sh"]),
            "widths %s (each wants content/3 = %.1f of a %.0f content); CTA chip tops spread "
            "%.2fpx (<=2); chip heights %s; prices %s; price-block hairline %s; grounds %s; "
            "shadows %s"
            % ([round(x, 1) for x in cd["w"]], wexp, cd["content"], spread,
               [round(x) for x in cd["chipH"]], cd["pr"], cd["hair"], set(cd["bg"]),
               set(cd["sh"])))
        chk("14.7-card-text-on-the-gutter",
            abs(cd["glyphX"] - 32) <= 1.0 and abs(cd["labelX"] - 32) <= 1.0
            and abs(cd["lastRight"] - (cd["vw"] - 32)) <= 1.5,
            "1440: the first card's first glyph starts at x = %.2f and its label box at "
            "%.2f (SS14.7 wants the 32px section gutter); the last card's interior ends at "
            "%.1f against a right gutter of %.0f"
            % (cd["glyphX"], cd["labelX"], cd["lastRight"], cd["vw"] - 32))
        marked = [i for i, m in enumerate(cd["mark"]) if m]
        box_ok = (marked == [1]
                  and all("200, 84, 43" in b for b in cd["borders"][1])
                  and all(b.startswith("1px") for b in cd["borders"][1])
                  and not any("200, 84, 43" in b for i in (0, 2) for b in cd["borders"][i]))
        chk("14.7-audit-box-at-900up", box_ok,
            "at >=900 the Audit alone carries a BOX: its four borders are %s; the other two "
            "read %s and %s" % (cd["borders"][1], cd["borders"][0], cd["borders"][2]))
        pk = open(PACKAGES, encoding="utf-8").read()
        live = re.findall(r'(?<!aria-)label="([^"]*)"', pk)
        chk("14.7-chip-labels-are-the-live-buttons",
            cd["chipT"] == live and all(cd["chipFits"]),
            "the three card chips read %s; app/(foyer)/packages/page.tsx renders %s "
            "(BuyButton appends the arrow, which the chip carries as its own glyph); each "
            "label fits its chip without clipping: %s"
            % (cd["chipT"], live, cd["chipFits"]))

        eb = pg.evaluate("""()=>{const e=document.getElementById('ebar');
            const r=e.getBoundingClientRect(), cs=getComputedStyle(e);
            const p=e.querySelector('.pill'), pc=getComputedStyle(p);
            const say=e.querySelector('.say');
            const cards=document.querySelector('.cards').getBoundingClientRect();
            const sec=document.querySelector('.price');
            const content=sec.getBoundingClientRect().width
                - 2*parseFloat(getComputedStyle(sec).paddingLeft);
            return {tag:e.tagName, href:e.getAttribute('href'), h:r.height, w:r.width,
                    gapAbove:r.top-cards.bottom, radius:cs.borderRadius, bg:cs.backgroundColor,
                    color:cs.color, links:e.querySelectorAll('a').length,
                    pillH:p.getBoundingClientRect().height, pillBorder:pc.borderColor,
                    pillBg:pc.backgroundColor, pillColor:pc.color,
                    pillFs:parseFloat(pc.fontSize),
                    sayFs:parseFloat(getComputedStyle(say).fontSize),
                    cw:content, rowW:cards.width};}""")
        chk("14.5-ebar",
            eb["tag"] == "A" and eb["links"] == 0 and abs(eb["h"] - 104) < 1
            and abs(eb["gapAbove"] - 32) < 1.5 and eb["radius"] == "16px"
            and "13, 13, 15" in eb["bg"] and "245, 239, 228" in eb["color"]
            and abs(eb["pillH"] - 44) < 1 and "200, 84, 43" in eb["pillBorder"]
            and "200, 84, 43" in eb["pillColor"]
            and eb["pillBg"] in ("rgba(0, 0, 0, 0)", "transparent")
            and abs(eb["sayFs"] - 19) < 0.6 and abs(eb["w"] - eb["cw"]) < 1,
            "one <%s> (nested links: %d) href=%s, %.0fpx tall, %.0fpx under the cards, "
            "radius %s, ground %s with %s type at %.0fpx; pill %.0fpx tall, border %s, "
            "ground %s, text %s at %.0fpx; width %.0f == the section content width %.0f "
            "(SS14.7 widens the CARD ROW by 25px either side; the bar is not widened)"
            % (eb["tag"], eb["links"], eb["href"], eb["h"], eb["gapAbove"], eb["radius"],
               eb["bg"], eb["color"], eb["sayFs"], eb["pillH"], eb["pillBorder"],
               eb["pillBg"], eb["pillColor"], eb["pillFs"], eb["w"], eb["cw"]))

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

        # ---- 14 panels -------------------------------------------------------
        pan = pg.evaluate("""()=>{
            const ps=[].slice.call(document.querySelectorAll('.panel'));
            return ps.map(p=>{const f=p.querySelector('.frame'), cs=getComputedStyle(f);
              const r=f.getBoundingClientRect();
              return {kind:p.dataset.kind, svg:!!f.querySelector('svg'),
                      img:!!f.querySelector('img'), video:!!f.querySelector('video'),
                      radius:cs.borderRadius, border:cs.borderTopWidth+' '+cs.borderTopColor,
                      pad:cs.padding, bg:cs.backgroundColor, w:Math.round(r.width),
                      ar:(r.width/r.height).toFixed(3),
                      textFs: (f.querySelector('.art p')?
                        parseFloat(getComputedStyle(f.querySelector('.art p')).fontSize):null)};});}""")
        geo = set((p["radius"], p["border"], p["pad"], p["bg"], p["w"], p["ar"]) for p in pan)
        chk("14.6-panels",
            len(pan) == 3 and pan[0]["kind"] == "diagram" and pan[0]["svg"]
            and pan[1]["kind"] == "type" and pan[2]["kind"] == "type"
            and not any(p["img"] or p["video"] for p in pan) and len(geo) == 1
            and abs(pan[1]["textFs"] - 28) < 0.6 and abs(pan[2]["textFs"] - 28) < 0.6,
            "01=%s(svg=%s) 02=%s(28px=%s) 03=%s(28px=%s); zero photographs in the method "
            "section (img=%s video=%s); ONE frame geometry across all three: %s"
            % (pan[0]["kind"], pan[0]["svg"], pan[1]["kind"], pan[1]["textFs"],
               pan[2]["kind"], pan[2]["textFs"],
               [p["img"] for p in pan], [p["video"] for p in pan], list(geo)[0]))

        # ---- 14b panel 01 IS the WallChart port, not a freehand drawing -------
        # SS14.6: "the builder ports the geometry from `components/WallChart.tsx` if it is
        # SVG". It is SVG, and the real page-6 figure is a LINE CHART -- two crossing lines,
        # one dashed -- so what gets asserted is the fidelity of the port, not a count of
        # boxes and arrows. SS14.6 also asks for "capsule labels in the label style" and
        # "hand-curved arrows": the plates and the two leaders are those, and they take the
        # element counts past 4 boxes / 3 paths without moving a transcribed coordinate.
        src = open(WALLCHART, encoding="utf-8").read()
        want = ["M2 58 L334 54", "M0 144 L90 130 L170 102 L240 58 L300 8"]
        wc = pg.evaluate("""()=>{const s=document.querySelector('.wc');
            const g=t=>[].slice.call(s.querySelectorAll(t));
            return {vb:s.getAttribute('viewBox'),
                    paths:g('path').map(e=>e.getAttribute('d')),
                    rects:g('rect').length,
                    circle:g('circle').map(e=>e.getAttribute('cx')+','+e.getAttribute('cy')
                                             +','+e.getAttribute('r')),
                    texts:g('text').map(e=>e.textContent.trim()),
                    lbl:g('text').map(e=>parseFloat(getComputedStyle(e).fontSize)
                        +'/'+getComputedStyle(e).textTransform)};}""")
        ported = all(w in wc["paths"] for w in want)
        insrc = all(w in src for w in want)
        chk("14.6-panel01-port",
            ported and insrc and wc["vb"] == "0 0 340 168"
            and wc["circle"] == ["243.5,55.1,4"]
            and len(wc["paths"]) >= 3 and wc["rects"] >= 4
            and not any("%" in t for t in wc["texts"]),
            "viewBox %s, crossing %s, both transcribed paths present and byte-identical to "
            "WallChart.tsx (in source: %s); %d <path>, %d <rect> (>=3 / >=4); labels %s at "
            "%s; no bare percentage left in the figure"
            % (wc["vb"], wc["circle"], insrc, len(wc["paths"]), wc["rects"],
               wc["texts"], sorted(set(wc["lbl"]))))

        # ---- 14d SS14.7: three capsules, three leaders, nothing touching ------
        # getBBox() reports USER space and ignores the element's own transform, which the
        # <=899 rules use to re-seat the labels -- so every box here is taken from
        # getBoundingClientRect() and converted back into viewBox units.
        WC_JS = r"""()=>{const s=document.querySelector('.wc');
            const sb=s.getBoundingClientRect();
            const vb=s.getAttribute('viewBox').split(/\s+/).map(Number);
            const k=sb.width/vb[2];
            const conv=r=>[(r.x-sb.x)/k,(r.y-sb.y)/k,(r.right-sb.x)/k,(r.bottom-sb.y)/k];
            const grab=sel=>[...s.querySelectorAll(sel)].map(e=>({
                t:(e.textContent||'').trim(), bb:conv(e.getBoundingClientRect())}));
            return {plates:grab('rect.plate'), texts:grab('text'),
                    leads:grab('path.lead'), heads:grab('path.head'),
                    svg:[sb.x,sb.right], frame:(()=>{const f=s.closest('.frame');
                        const b=f.getBoundingClientRect(), c=getComputedStyle(f);
                        return [b.x+parseFloat(c.paddingLeft),
                                b.right-parseFloat(c.paddingRight)];})()};}"""

        def wc_check(page, W):
            d = page.evaluate(WC_JS)

            def ov(a, b):
                return (a[0] < b[2] - 0.02 and b[0] < a[2] - 0.02
                        and a[1] < b[3] - 0.02 and b[1] < a[3] - 0.02)

            def inside(a, b):
                return (b[0] <= a[0] + 0.02 and a[2] <= b[2] + 0.02
                        and b[1] <= a[1] + 0.02 and a[3] <= b[3] + 0.02)

            housed = [(t["t"], any(inside(t["bb"], p["bb"]) for p in d["plates"]))
                      for t in d["texts"]]
            clashes = []
            for kind, items in (("leader", d["leads"]), ("head", d["heads"])):
                for it in items:
                    for p in d["plates"]:
                        if ov(it["bb"], p["bb"]):
                            clashes.append((kind, [round(x, 1) for x in it["bb"]],
                                            "plate", [round(x, 1) for x in p["bb"]]))
                    for t in d["texts"]:
                        if ov(it["bb"], t["bb"]):
                            clashes.append((kind, [round(x, 1) for x in it["bb"]],
                                            "label:" + t["t"][:16],
                                            [round(x, 1) for x in t["bb"]]))
            for i in range(len(d["plates"])):
                for j in range(i + 1, len(d["plates"])):
                    if ov(d["plates"][i]["bb"], d["plates"][j]["bb"]):
                        clashes.append(("plate", [round(x, 1) for x in d["plates"][i]["bb"]],
                                        "plate", [round(x, 1) for x in d["plates"][j]["bb"]]))
            inframe = (d["svg"][0] >= d["frame"][0] - 0.5
                       and d["svg"][1] <= d["frame"][1] + 0.5)
            return d, housed, clashes, inframe

        wcr = {}
        for W in (1440, 390):
            pg.set_viewport_size({"width": W, "height": 900})
            pg.wait_for_timeout(450)
            pg.evaluate("()=>document.getElementById('work').scrollIntoView({block:'start'})")
            pg.wait_for_timeout(600)
            wcr[W] = wc_check(pg, W)
        chk("14.7-wallchart-capsules-and-leaders",
            all(len(d["leads"]) == 3 and len(d["heads"]) == 3 and len(d["plates"]) == 4
                and all(h for _, h in housed) and not clashes and inframe
                for d, housed, clashes, inframe in wcr.values()),
            "; ".join(
                "%d: %d capsules, %d leaders + %d heads (SS14.7 gives THE WALL its own), "
                "every label inside its own plate %s, leader/head vs plate/label clashes %s, "
                "figure inside the frame's padding box %s"
                % (W, len(wcr[W][0]["plates"]), len(wcr[W][0]["leads"]),
                   len(wcr[W][0]["heads"]), wcr[W][1], wcr[W][2] or "none", wcr[W][3])
                for W in (1440, 390)))
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(400)

        # ---- 14c the record index: every row a link, one caption grammar ------
        prf = pg.evaluate("""()=>[].slice.call(document.querySelectorAll('.prf')).map(
            e=>({tag:e.tagName, href:e.getAttribute('href')||'',
                 cap:e.querySelector('.cap').textContent.trim(),
                 arrow:!!e.querySelector('.ar')}));""")
        allink = all(r["tag"] == "A" and r["href"] and r["arrow"] for r in prf)
        stops = [r["cap"] for r in prf if r["cap"].endswith(".")]
        chk("14.3-record-index", allink and not stops and len(prf) == 7,
            "%d rows, every one a link carrying an arrow (%s); zero captions end in a full "
            "stop, so the list runs one grammar (tails: %s)"
            % (len(prf), allink, [r["cap"][-26:] for r in prf]))

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
            return vs.map(v=>({id:v.id,muted:v.muted,loop:v.loop,
                playsinline:v.hasAttribute('playsinline'),poster:!!v.getAttribute('poster'),
                srcs:v.querySelectorAll('source').length,rs:v.readyState}));}""")
        # Operator, 2026-09-06: the published page did not load for him. The webm and 1080p
        # cuts are gone; each clip now ships exactly ONE source, the 720 mp4, at every width.
        chk("media", len(med) == 2 and all(m["muted"] and m["playsinline"] and m["poster"]
                                           and m["srcs"] == 1 and m["rs"] >= 2 for m in med)
            and med[0]["loop"] is False and med[1]["loop"] is True,
            json.dumps(med))

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

        shoot("rl6-1440-top.png", 1440, 900)
        shoot("rl6-1920-top.png", 1920, 1080)
        shoot("rl6-1280-top.png", 1280, 900)
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(400)
        # the operator section is 1023px tall at 1440, so framing it from its TOP cuts the
        # overlay off. This shot is anchored to the film's FOOT, where the composition is.
        pg.evaluate("""()=>{const s=document.getElementById('opstage');
            window.scrollTo(0, s.getBoundingClientRect().bottom + window.scrollY - 860);}""")
        pg.wait_for_timeout(900)
        _p = os.path.join(SCRATCH, "rl6-sec-operator.png")
        pg.screenshot(path=_p)
        shots.append(_p)
        shoot("rl6-sec-work.png", 1440, 900, sel="#work")
        shoot("rl6-sec-price.png", 1440, 900, sel="#price")

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
                    and m["bar"]["op"] == "1")

        chk("14.7-hero-mobile", all(mob_ok(m) for m in mob.values()),
            " || ".join(
                "%d: stage %.0fx%.0f cropped %s; fingertip (%.1f, %.1f) = %.2f%% across "
                "(SS14.7 wants ~26) and %.2f%% down; \"I\" box left edge %.1f, %.1fpx LEFT "
                "of the tip (<=50, I left=%s); rows %s; visible source window %.0f..%.0f "
                "(the face at 1010..1290 is inside); headline box %.0f..%.0f inside the "
                "stage %.0f..%.0f; the sentence starts %.0f, the stage ends %.0f; bar "
                "opacity %s"
                % (W, mob[W]["stage"]["w"], mob[W]["stage"]["h"], mob[W]["objpos"],
                   mob[W]["fx"], mob[W]["fy"], mob[W]["fpct"][0], mob[W]["fpct"][1],
                   mob[W]["I"][0], mob[W]["dx"], mob[W]["Ileft"],
                   [(r["t"], round(r["w"], 1), "%.0fpx gutter" % r["gutter"], r["n"])
                    for r in mob[W]["rows"]],
                   mob[W]["srcWindow"][0], mob[W]["srcWindow"][1],
                   mob[W]["h1Box"][1], mob[W]["h1Box"][3], mob[W]["stage"]["y"],
                   mob[W]["stage"]["bottom"], mob[W]["copyTop"], mob[W]["stage"]["bottom"],
                   mob[W]["bar"]["op"])
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

        mcard = pg.evaluate("""()=>{const cs=[].slice.call(document.querySelectorAll('.card'));
            const e=document.getElementById('ebar');
            const sec=document.querySelector('.price');
            const inner=sec.getBoundingClientRect().width
              - 2*parseFloat(getComputedStyle(sec).paddingLeft);
            const gut=parseFloat(getComputedStyle(sec).paddingLeft);
            return {tops:cs.map(c=>Math.round(c.getBoundingClientRect().top)),
                    w:cs.map(c=>Math.round(c.getBoundingClientRect().width)),
                    x:cs.map(c=>+c.getBoundingClientRect().x.toFixed(1)),
                    right:cs.map(c=>+c.getBoundingClientRect().right.toFixed(1)),
                    borders:cs.map(c=>{const st=getComputedStyle(c);
                       return [st.borderTopWidth+' '+st.borderTopColor,
                               st.borderRightWidth+' '+st.borderRightColor,
                               st.borderBottomWidth+' '+st.borderBottomColor,
                               st.borderLeftWidth+' '+st.borderLeftColor];}),
                    rowMargin:getComputedStyle(document.getElementById('cards')).margin,
                    inner:Math.round(inner), gut:gut, iw:window.innerWidth,
                    ebarH:Math.round(e.getBoundingClientRect().height),
                    ebarDir:getComputedStyle(e).flexDirection,
                    air:parseFloat(getComputedStyle(sec).paddingTop)};}""")
        stacked = len(set(mcard["tops"])) == 3
        chk("14.5-cards-mobile",
            stacked and mcard["ebarH"] >= 104 and mcard["ebarDir"] == "column"
            and abs(mcard["air"] - 64) < 1,
            "390: cards stack (tops %s, widths %s in %dpx), engagements bar is a 2-row "
            "block %dpx tall (flex-direction %s, tap target kept); section air %.0fpx"
            % (mcard["tops"], mcard["w"], mcard["inner"], mcard["ebarH"], mcard["ebarDir"],
               mcard["air"]))
        mk = mcard["borders"][1]
        rule_ok = (mk[3].startswith("2px") and "200, 84, 43" in mk[3]
                   and "200, 84, 43" not in mk[0] and mk[1].startswith("0px")
                   and mk[2].startswith("0px")
                   and all(x >= mcard["gut"] - 0.5 for x in mcard["x"])
                   and all(r <= mcard["iw"] - mcard["gut"] + 0.5 for r in mcard["right"])
                   and mcard["rowMargin"].replace(" ", "") in ("0px", "0px0px0px0px"))
        chk("14.7-audit-left-rule-390", rule_ok,
            "390: the Audit's four borders are %s -- a 2px copper LEFT RULE and no box; the "
            "other two read %s. The row carries margin %s (no bleed) and every card box "
            "sits between the %.0fpx gutters: x %s, right %s of a %dpx viewport"
            % (mk, mcard["borders"][0], mcard["rowMargin"], mcard["gut"], mcard["x"],
               mcard["right"], mcard["iw"]))

        set_frame(pg, "filmvid", 96)
        set_frame(pg, "opvid", 60)
        for name, sel in (("rl6-390-top.png", None), ("rl6-390-price.png", "#price"),
                          ("rl6-390-work.png", "#work")):
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

        pg.set_viewport_size({"width": 360, "height": 800})
        pg.reload()
        pg.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        pg.wait_for_timeout(1600)
        set_frame(pg, "filmvid", 96)
        pg.evaluate("()=>window.scrollTo(0,0)")
        pg.wait_for_timeout(700)
        path = os.path.join(SCRATCH, "rl6-360-top.png")
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
        "content/work frontmatter + WallChart.tsx + app/(foyer)/packages/page.tsx; exempt: "
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
              open(os.path.join(SCRATCH, "vfy", "rl6-result.json"), "w", encoding="utf-8"),
              indent=1)
    return 0 if allpass else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else BUILT))
