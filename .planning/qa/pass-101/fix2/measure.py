# Pass-101 integrate - measurement harness. Read-only against a live pnpm start.
import json, pathlib, re
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
SP = pathlib.Path(r"C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad")
AXE = (SP / "axe.min.js").read_text(encoding="utf-8")
OUT = pathlib.Path(r"C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p101-integrate/.planning/qa/pass-101/fix2")
OUT.mkdir(parents=True, exist_ok=True)


def srgb(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def parse(col):
    n = [float(x) for x in re.findall(r"[\d.]+", col)]
    return tuple(n[:3])


def lum(col):
    r, g, b = (srgb(v) for v in parse(col))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return round((hi + 0.05) / (lo + 0.05), 2)


def settle(pg):
    pg.evaluate("async()=>{await document.fonts.ready}")
    pg.wait_for_timeout(600)


def walk(pg, up=True):
    """Drive the page to its foot with real wheel events (Lenis smooths scroll,
    so window.scrollTo alone is fought by it), then optionally back to the top."""
    h = pg.evaluate("()=>document.documentElement.scrollHeight")
    vh = pg.evaluate("()=>window.innerHeight")
    y, guard = 0, 0
    while y < h - vh - 2 and guard < 240:
        pg.mouse.wheel(0, int(vh * 0.8))
        pg.wait_for_timeout(90)
        ny = pg.evaluate("()=>Math.round(window.scrollY)")
        if ny <= y + 2:
            guard += 4
        y = ny
        h = pg.evaluate("()=>document.documentElement.scrollHeight")
        guard += 1
    pg.wait_for_timeout(800)
    if up:
        for _ in range(80):
            pg.mouse.wheel(0, -int(vh * 1.2))
            pg.wait_for_timeout(40)
            if pg.evaluate("()=>window.scrollY") <= 1:
                break
        pg.evaluate("()=>window.scrollTo(0,0)")
        pg.wait_for_timeout(500)


results = {}


def rec(k, v):
    results[k] = v
    print("== " + k + " " + json.dumps(v)[:1500], flush=True)


TOKEN_JS = """()=>{
  const root = getComputedStyle(document.documentElement);
  const alias = root.getPropertyValue('--accent-copper-deep').trim();
  const named = root.getPropertyValue('--color-accent-copper-deep').trim();
  const probe = document.createElement('span');
  probe.style.color = 'var(--accent-copper-deep)';
  document.body.appendChild(probe);
  const probeColor = getComputedStyle(probe).color;
  probe.remove();
  const links = [...document.querySelectorAll('.rl-link')].map(e=>({
    t: e.textContent.trim().slice(0,24),
    color: getComputedStyle(e).color,
    deco: getComputedStyle(e).textDecorationColor}));
  const deep = [...document.querySelectorAll('*')].filter(e=>
    getComputedStyle(e).color==='rgb(138, 61, 36)').length;
  return {alias, named, probeColor, links, deepCount: deep};
}"""

SKIP_JS = """()=>{
  const a = document.querySelector('.skip-to-content');
  const cs = getComputedStyle(a);
  let bg = cs.backgroundColor, q = a;
  while (q && (bg==='rgba(0, 0, 0, 0)'||bg==='transparent')) {
    q=q.parentElement; if(!q) break; bg=getComputedStyle(q).backgroundColor; }
  return {focused: document.activeElement===a, color: cs.color, bg,
          transform: cs.transform,
          lit: document.documentElement.classList.contains('lit'),
          rect: a.getBoundingClientRect().toJSON()};
}"""

FOOT_JS = """()=>{
  const f = document.querySelector('footer.rl-foot');
  if (!f) return {found:false};
  const r = f.getBoundingClientRect();
  const cs = getComputedStyle(f);
  const cols = ['.who','.nav','.book'].map(s=>{
    const e = f.querySelector(s); if(!e) return null;
    const b = e.getBoundingClientRect();
    return {sel:s, x: Math.round(b.x), w: Math.round(b.width), h: Math.round(b.height)};
  });
  const chip = f.querySelector('.rl-chip');
  const cr = chip ? chip.getBoundingClientRect() : null;
  const nav = f.querySelector('.nav a');
  const row = f.querySelector('.row');
  return {found:true, height: Math.round(r.height), width: Math.round(r.width),
          bg: cs.backgroundColor, color: cs.color, cols,
          rowDisplay: getComputedStyle(row).display,
          rowCols: getComputedStyle(row).gridTemplateColumns.split(' ').length,
          borderTop: getComputedStyle(row).borderTopWidth,
          navLinkColor: nav ? getComputedStyle(nav).color : null,
          chip: cr ? {h: Math.round(cr.height), w: Math.round(cr.width),
                      bg: getComputedStyle(chip).backgroundColor,
                      color: getComputedStyle(chip).color,
                      radius: getComputedStyle(chip).borderRadius} : null};
}"""

ABOUT_JS = """()=>{
  const fig = document.querySelector('.rl-exhibit__fig');
  const body = document.querySelector('.rl-exhibit__body');
  const wrap = fig ? fig.closest('.rl-wrap') : null;
  const wr = wrap ? wrap.getBoundingClientRect() : null;
  const cs = wrap ? getComputedStyle(wrap) : null;
  const contentRight = wr ? wr.right - parseFloat(cs.paddingRight) : null;
  const fr = fig ? fig.getBoundingClientRect() : null;
  const br = body ? body.getBoundingClientRect() : null;
  const img = fig ? fig.querySelector('img') : null;
  return {
    fig: fr ? {x: Math.round(fr.x), w: Math.round(fr.width), h: Math.round(fr.height)} : null,
    body: br ? {x: Math.round(br.x), w: Math.round(br.width), h: Math.round(br.height)} : null,
    contentRight: contentRight ? Math.round(contentRight) : null,
    emptyBeside: (fr && br) ? Math.round(br.x - fr.right) : null,
    topsAligned: (fr && br) ? Math.round(Math.abs(fr.top - br.top)) : null,
    imgW: img ? Math.round(img.getBoundingClientRect().width) : null
  };
}"""

ABOUT_M_JS = """()=>{
  const fig = document.querySelector('.rl-exhibit__fig');
  const body = document.querySelector('.rl-exhibit__body');
  const fr = fig.getBoundingClientRect(), br = body.getBoundingClientRect();
  return {stacked: br.top >= fr.bottom - 2,
          figX: Math.round(fr.x), figW: Math.round(fr.width),
          bodyX: Math.round(br.x), bodyW: Math.round(br.width),
          gap: Math.round(br.top - fr.bottom),
          ledgerCols: getComputedStyle(document.querySelector('.rl-ledger > li')).gridTemplateColumns,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth};
}"""

PK_JS = """()=>{
  const p = document.querySelector('.rl-lede.rl-seam');
  const r = p.getBoundingClientRect();
  const seams = [...document.querySelectorAll('.rl-seam')].map(e=>({
    t: e.textContent.trim().slice(0,32), x: Math.round(e.getBoundingClientRect().x),
    w: Math.round(e.getBoundingClientRect().width)}));
  return {intro: {x: Math.round(r.x), w: Math.round(r.width)}, seams,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth};
}"""

AXE_JS = """async()=>{
  const r = await axe.run(document, {resultTypes:['violations']});
  return r.violations.map(v=>({id:v.id, impact:v.impact, n:v.nodes.length,
    targets:v.nodes.slice(0,3).map(n=>n.target.join(' ')) }));
}"""

with sync_playwright() as pw:
    br = pw.chromium.launch()

    ctx = br.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    pg = ctx.new_page()

    # 1. TOKEN
    tok = {}
    for route in ("/packages", "/playbook", "/about", "/work"):
        pg.goto(BASE + route, wait_until="load")
        settle(pg)
        tok[route] = pg.evaluate(TOKEN_JS)
    rec("1-token", tok)

    # 2. SKIP LINK on / with html.lit
    pg.goto(BASE + "/", wait_until="load")
    settle(pg)
    walk(pg, up=False)
    lit_at_foot = pg.evaluate("()=>document.documentElement.classList.contains('lit')")
    # preventScroll: focusing an element pinned at top:0 would otherwise scroll
    # the page home, and RoomMotion recomputes --p from scroll, dropping .lit.
    pg.evaluate("()=>document.querySelector('.skip-to-content').focus({preventScroll:true})")
    pg.wait_for_timeout(300)
    skip = pg.evaluate(SKIP_JS)
    skip["litAtFoot"] = lit_at_foot
    skip["contrast"] = contrast(skip["color"], skip["bg"])
    pg.screenshot(path=str(OUT / "skip-link-home-lit-1440.png"))
    # and the shot a keyboard reader actually sees: page at the top, first Tab.
    pg.evaluate("()=>{document.activeElement.blur();window.scrollTo(0,0)}")
    pg.wait_for_timeout(600)
    pg.keyboard.press("Tab")
    pg.wait_for_timeout(400)
    skip["atTop"] = pg.evaluate(SKIP_JS)
    skip["atTop"]["contrast"] = contrast(skip["atTop"]["color"], skip["atTop"]["bg"])
    pg.screenshot(path=str(OUT / "skip-link-home-focused-1440.png"),
                  clip={"x": 0, "y": 0, "width": 480, "height": 120})
    rec("2-skip", skip)

    # 3. FOOTER parity
    foot = {}
    for name, route in (("packages", "/packages"), ("guardicore", "/work/guardicore")):
        pg.goto(BASE + route, wait_until="load")
        settle(pg)
        walk(pg, up=False)
        foot[name] = pg.evaluate(FOOT_JS)
        pg.screenshot(path=str(OUT / ("foot-" + name + "-1440.png")))
    if foot["packages"].get("found") and foot["guardicore"].get("found"):
        foot["deltaPx"] = abs(foot["packages"]["height"] - foot["guardicore"]["height"])
    rec("3-foot", foot)

    # 4. /about exhibit at 1440
    pg.goto(BASE + "/about", wait_until="load")
    settle(pg)
    walk(pg, up=False)
    rec("4-about-1440", pg.evaluate(ABOUT_JS))

    # 5. /packages intro seam at 1440
    pg.goto(BASE + "/packages", wait_until="load")
    settle(pg)
    rec("5-packages-1440", pg.evaluate(PK_JS))
    ctx.close()

    # mobile
    mctx = br.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=1)
    mp = mctx.new_page()
    mp.goto(BASE + "/about", wait_until="load")
    settle(mp)
    walk(mp, up=False)
    rec("4-about-390", mp.evaluate(ABOUT_M_JS))
    mp.goto(BASE + "/packages", wait_until="load")
    settle(mp)
    rec("5-packages-390", mp.evaluate(PK_JS))
    mp.goto(BASE + "/work/guardicore", wait_until="load")
    settle(mp)
    walk(mp, up=False)
    rec("3-foot-390-guardicore", mp.evaluate(FOOT_JS))
    mctx.close()

    # AXE + screenshots
    ROUTES = [("home", "/"), ("packages", "/packages"), ("about", "/about"),
              ("work-guardicore", "/work/guardicore")]
    axe_out = {}
    for w, h, tag in ((1440, 900, "1440"), (390, 844, "390")):
        c = br.new_context(viewport={"width": w, "height": h}, device_scale_factor=1)
        p2 = c.new_page()
        for name, route in ROUTES:
            p2.goto(BASE + route, wait_until="load")
            settle(p2)
            walk(p2, up=False)
            p2.add_script_tag(content=AXE)
            res = p2.evaluate(AXE_JS)
            sc = [v for v in res if v["impact"] in ("serious", "critical")]
            axe_out[name + "@" + tag] = {
                "seriousCritical": len(sc), "detail": sc,
                "all": [v["id"] + "(" + str(v["impact"]) + "," + str(v["n"]) + ")" for v in res]}
            p2.screenshot(path=str(OUT / (name + "-" + tag + ".png")), full_page=True)
        c.close()
    rec("6-axe", axe_out)
    br.close()

(SP / "measure-results.json").write_text(json.dumps(results, indent=1), encoding="utf-8")
print("WROTE " + str(SP / "measure-results.json"))
