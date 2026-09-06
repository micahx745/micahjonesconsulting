# STUDIO ETHOS — SYNTHESIS

Source: the 18 teardown files in `./studios/` plus `./00-THE-SET.md`. **14 distinct sites**
(`studiofreight` · `darkroom` · `unseen` · `antinomy` · `exoape` · `14islands` · `upperquad` ·
`obys` · `malvah` · `collins` · `basement` · `immersive-garden` · `matthias-ott` ·
`sara-soueidan`), read across 18 documents — `sf-work-1`..`sf-work-4` are deeper reads of
Studio Freight's `/work`, La Marzocco, Perplexity Comet, and darkroom's `/work`.

Every count below has a denominator of **14 unless stated**, and every claim carries a
`slug §section` citation. Where a teardown did not settle a question the site is counted as
unknown rather than assumed.

Contact sheets:
`…/scratchpad/studios/CONTACT-SHEET-home.png` (2890×4214, 4,722,302 bytes, 18 tiles) ·
`…/scratchpad/studios/CONTACT-SHEET-work.png` (2890×5338, 6,403,310 bytes, 18 tiles).

---

## A. THE ETHOS — what effectively all of them share

### A1. The chrome has no colour. The work supplies all of it.

**12 of 14 render no accent colour at all.** `studiofreight §3` ("achromatic in practice"),
`unseen §3` (blush `#EFDED9`, 7 occurrences in the whole document), `antinomy §3`
("absolutely" — the two dozen saturated hexes in the bundle are per-project grounds, never
chrome), `exoape §3` ("no accent colour in the CSS at all"), `14islands §3` ("there is **no**
brand accent"), `upperquad §3` ("rendered accent count on home: zero"), `obys §3` ("2 hexes
plus 1 grey"), `malvah §3` (a live scan of every computed colour found the declared accent
zero times), `collins §3` ("referenced zero times in any stylesheet"), `immersive-garden §3`
("There is no accent colour. Zero."), `matthias-ott §3`, `sara-soueidan §3` (the brand pink
appears on **one element out of 199**).

The two exceptions carry **exactly one hue and use it as a pulse, never a field**:
`darkroom §3` (`#e71419`, bound to both `--color-primary` and `--color-secondary`) and
`basement §3` (`#ff4d00`, 21 hits, confined to a toggle's active half and focus rings).
**0 of 14 have a second accent.**

The corollary is stated identically in four teardowns: *all colour on the page arrives inside
client photography* — `exoape §3`, `immersive-garden §9`, `sf-work-2 §3` ("The site is a white
gallery wall; the work supplies the hue"), `obys §3` (thumbnails are held desaturated until
active — "Colour is a state, not a brand asset").

### A2. One or two families, one weight, self-hosted.

**13 of 14 self-host every face with no Google or Adobe link.** The fourteenth,
`sara-soueidan §2`, links three Google families and **the request returns HTTP 400** because
the URL is malformed; the CSS references none of them. So **0 of 14 successfully render a
webfont from a CDN.**

**9 of 14 run one or two families in the visible hierarchy**: `antinomy §2` (one),
`exoape §2` (one, at three weights registered as three family names), `obys §2` (one,
proprietary), `malvah §2` (one), `unseen §2` (two), `collins §2` (two), `matthias-ott §2`
(two), `14islands §2` (two visible), `upperquad §2` (two used, a third licensed and unused).
Three families: `studiofreight §2`, `darkroom §2`, `basement §2`, `immersive-garden §2`.

**10 of 14 run one weight, or one weight per face.** `collins §2` is the sharpest case:
`html{font-weight:500}` is declared and never honoured because no 500 file exists.
`14islands §2` — "one weight, two faces, zero bold." `obys §2` — `font-weight` appears exactly
once in the whole stylesheet. `sara-soueidan §2` is the outlier at eight weights, and its own
teardown reads that as maintenance drift.

### A3. Two registers, and the gap is the hierarchy.

**14 of 14 track display type negatively**, from −0.0075em (`matthias-ott §2`) to −0.05em
(`darkroom §2`, `14islands §2`), clustering at −0.02 to −0.03em. Positive tracking, where it
exists, is reserved for small labels only (`studiofreight §2`, `upperquad §2`, `basement §2`,
`exoape §2`, `darkroom §2`).

**5 of 14 explicitly refuse the middle register**: `studiofreight §2` (~120–286px display and
14px labels — "There is no 24px, no 32px, no comfortable middle register", `00-THE-SET §A`),
`darkroom §2` (200/120 against 16), `exoape §2` (250px h0 against 12–16px), `14islands §2`
(180px against 12px), `obys §2` (80px against 11px — ratio 7.3:1, "essentially nothing in
between").

**4 of 14 explicitly ban tracked-out uppercase labels** — the tiny-caps `+0.1em` eyebrow:
`14islands §9` ("labels are uppercase at 12px with `letter-spacing: normal`… the reason the
labels read as documentation rather than as decoration"), `collins §2` ("There is no positive
tracking on this site"), `obys §2` ("No positive/wide tracking anywhere"), `malvah §2` ("no
loose uppercase eyebrow tracking of the kind most studio sites use").

**Uppercase is a property of the label face, not a headline treatment**, in 12 of 14.
`text-transform` occurs 0 times in `obys §2`, `exoape §2`, `antinomy §2`, and only as `none`
in `immersive-garden §2`; once in `darkroom §3`, `basement §2`, `collins §2`. Only
`studiofreight §2` (33 times, confined to the mono face) and `darkroom §2` set display in caps.

### A4. The work is shown as a name and almost nothing else.

`studiofreight §5` — name plus a two-part comma sector (`La Marzocco Consumer, Food/Drink`).
`darkroom §5` — "No captions, no client name, no year, no role on the home tiles — just the
name." `obys §5` — two 11px lines only: sector, scope, index number, "no outcome claim on the
tile." `unseen §5` — name plus a service line, a hairline, an arrow. `exoape §5` — name plus a
five-word line. `14islands §5` — title plus a sector label. `collins §5` — "Card title = client
name only."

**12 of 14 carry no testimonial on the home page at all.** The two that do: `studiofreight §5`
(one named quote per case, headed `Receipt`) and `darkroom §6` (three *anonymously* attributed
quotes — "Past Client", "Web3 Partner"). **0 of 14 run a testimonial carousel.**

**2 of 14 ship a logo wall** — `basement §8` ("Trusted by Visionaries", ~40 SVGs) and
`sara-soueidan §5` (16 marks, on `/about`, kept off the home). Both are flagged by their own
teardowns. The replacement pattern, in 3 of 14, is **names as running text**: `darkroom §6`
(nine company names as words beside Services / Technologies / Awards), `obys §6` (client list
in prose on `/about`), `matthias-ott §5` ("I've worked with teams at Bosch, SAP, Deutsche
Bahn…" — inside a sentence).

### A5. The ask is short, it is not in the nav, and it is an address.

**14 of 14 show no pricing.** Verified by grep across all 18 teardowns — every §6 states it.
**14 of 14 ship no calendar or booking link.** Also verified by grep across all 18.
**14 of 14 have no budget dropdown.**

**11 of 14 have no new-business form of any kind.** The three that do — `studiofreight §6`
(`Inquire` / `Submit`, plus an FAQ of mailto routes), `darkroom §6` (form plus an email escape
hatch), `basement §6` (a form inside a drawer, plus a bare mailto) — all pair it with a plain
address.

**The ask is 2–4 words in 12 of 14**: `Work with us` (`studiofreight §6`, `collins §6`),
`LET'S TALK →` (`darkroom §6`), `Say hello` (`unseen §6`), `Copy Mail` (`antinomy §6`),
`Let's connect` (`upperquad §6`), `Contact:` (`obys §6`), `Drop us a mail` (`malvah §6`),
`Write me` (`matthias-ott §6`), `Contact us` → `now` (`immersive-garden §6`). The longest is
`14islands §6` — "Let's make something great together", five words at 75px, repeated on every
page.

**In 10 of 14 the ask carries no more visual weight than the other nav items**, or is absent
from the nav entirely: `darkroom §4` ("No CTA in the nav. The CTA lives in the footer"),
`antinomy §6` (`Contact` sits at `opacity:.4` like `About`), `immersive-garden §4` (the CMS
ships two nav entries and "Contact" is not one of them).

### A6. Persistent chrome, changing middle, identity in a breadcrumb.

`studiofreight §4` — header and footer are fixed and identical on every route; page identity is
carried by a breadcrumb. `sf-work-3 §4` — "The page identifies itself only through the
breadcrumb in the header. Words asserted on the first screen: zero."
`darkroom §4` — a 1px-ruled 22px top rail with a fixed bottom rail. `obys §4` — a fixed frame
with the copyright pinned bottom-right and the view switcher bottom-left. `malvah §4` — a band
of marks across one horizontal line. `immersive-garden §4` — "corner furniture on a fixed frame
that never scrolls away."

**11 of 14 refuse the giant footer wordmark.** The three that keep it: `darkroom §8`
(scanline-sliced `DARKROOM` at −1.33vw tracking), `collins §8` (80px centred), `matthias-ott §8`
(up to 20rem, uppercase, as a scroll-reversing marquee). Everyone else ends small —
`studiofreight §8` ("after a 210px title, the sign-off is 14px"), `antinomy §8` ("The largest
thing in it is still 24px"), `immersive-garden §8` ("After a scroll made entirely of spectacle,
the footer is a business card").

### A7. Smooth scroll is Lenis or it is hand-written. Nothing else survives.

**Lenis: 6 of 14** — `studiofreight §7`, `darkroom §7`, `14islands §7`, `upperquad §7`,
`malvah §7`, `immersive-garden §7`.
**Barba, Locomotive, Swiper, Framer Motion: 0 of 14.** Confirmed by explicit greps in
`obys §7`, `14islands §7`, `exoape §7`, `antinomy §7`, `malvah §7`, `upperquad §7`.
The four that smooth-scroll without Lenis wrote their own: `exoape §7` (a transform-based
virtual scroller), `obys §7` (`lerp` ×45, `wheel` ×6, zero libraries), `antinomy §7` (native
`scroll-behavior: smooth`), `sara-soueidan §7` (native, correctly gated behind
`prefers-reduced-motion: no-preference`).

### A8. Nothing scroll-jacks, nothing pins, nothing follows the cursor.

**0 of 14 scroll-jack.** `position: sticky` count: 0 on all three measured pages
(`studiofreight §7`), 1 in the whole bundle (`14islands §7`), exactly one `pin:`
(`exoape §7`), none (`collins §7`). `obys §7` is explicit that its horizontal view "is a mode
you choose, not a hijack."

**12 of 14 have no cursor follower.** The two that do — `unseen §7` (a circular puck, 17
cursor nodes) and `immersive-garden §7` (111 cursor references) — are the two least browsable
sites in the set (§E).

**3 of 14 run a marquee**, and two of the three teardowns file it as the site's tell:
`darkroom §7` (hand-built, straplines repeated ×10), `exoape §10` (the multilingual contact
marquee — "a 2021 agency-template flourish"), `matthias-ott §7` (the footer wordmark only).

---

## B. THE 2026 IDIOMS — what is current now and was not in 2024

### B1. What arrived

**The native View Transitions API replaced the page-transition library.** 5 of 14 ship it:
`studiofreight §7` (`::view-transition-group(*)` on
`--view-transition-easing: cubic-bezier(.5,.3,0,1)`), `collins §7`
(`@property --view-transition-duration` at 450ms, crossfading **over black**), `sf-work-4 §7`
(`view-transition-type(curtain)`), `antinomy §7` (React 19's `startViewTransition`),
`matthias-ott §7` (MPA `@view-transition` rules). Barba is at zero across the set.

**Metric-overridden fallback faces are now table stakes.** 5 of 14 ship a `local(Arial)` face
with `ascent-override` / `descent-override` / `size-adjust`: `darkroom §2` ("zero CLS on swap
is engineered, not hoped for"), `antinomy §2` (`size-adjust:99.34%`), `upperquad §2`,
`basement §2` (`size-adjust 104.76%`), `matthias-ott §2`.

**`clamp()` fell out of the type scale.** **10 of 14 ship zero `clamp()`** — `14islands §2`,
`antinomy §2`, `basement §2`, `collins §2`, `darkroom §2`, `exoape §2`, `immersive-garden §2`,
`malvah §2`, `obys §2`, `sara-soueidan §2`. What replaced it, in four distinct shapes:

- a design-width variable — `darkroom §2`: `font-size: calc(((N * 100) / var(--device-width)) * 1vw)`, one breakpoint, N ∈ {8,10,12,…,270};
- raw `vw` swapped wholesale at breakpoints — `exoape §2`, `immersive-garden §2`;
- `max(<rem floor>, <vw>)` — `14islands §2`;
- a viewport-locked root — `obys §2` (`html{font-size:.694444vw}`) and `antinomy §2` (`html{font-size:10px}`, so rem values read as px).

Only `studiofreight §2`, `upperquad §2` and `matthias-ott §2` still generate a clamp ramp — and
`studiofreight` writes fixed steps *as* clamps with a 0vw slope, which is a clamp in name only.

**CSS is doing work JS used to.** `collins §5` hovers eleven programme rows with
`ul:has(a:hover) .program{opacity:.4}` plus `@supports (position-anchor:--thumb)` and
`anchor-name:--thumb` — a thumbnail panel positioned by **CSS anchor positioning**, no JS, no
mousemove listener. `collins §6` builds a three-state hire button as a grid crossfade.
`obys §5` reveals grid tiles with `clip-path:inset(50%) → inset(0%)`.

**Wide-gamut colour in the token layer.** `darkroom §3` re-declares every token inside
`@supports (color: lab(0% 0 0))`; `matthias-ott §3` and `sara-soueidan §3` both ship `oklch()`
ramps with `rgb()` fallbacks.

**One custom property gating the whole motion system.** `antinomy §3`: `:root{--motion:1}`,
flipped to `0` under `@media (prefers-reduced-motion: reduce)`.

**Copy-to-clipboard instead of `mailto:`.** 4 of 14 — `antinomy §6` (`Copy Mail`),
`malvah §6` (`Email copied! ✌️`), `collins §6` (three states in one button),
`immersive-garden §6` (the email is a `<button>`).

**View-mode toggles on the work index.** 5 of 14 — `studiofreight §5` (`Grid / List / Zoom`),
`darkroom §5` (`GRID —— LIST`), `upperquad §5` (`Grid ⇄ Flow`), `obys §5` (`Vertical,
Horizontal, Grid`), `basement §5` (`Grid / Rows`).

**The machine-readable mirror.** 3 of 14 — `darkroom` (`llms.txt`, `work.md`, `about.md`,
`contact.md`, an `openapi.json`, a read-only `/api/content` — `00-THE-SET §A`), `antinomy §1`
(`/llms.txt` plus a `.md` mirror of every route, plus `webmcp-diagnostics.js`), `basement §4`
(a `HUMAN | MACHINE` toggle to `/ai/home`). Two of the three teardowns predict it dates fast
(`antinomy §10`: "it is 2026's `humans.txt`").

**The open-source library as the lead generator.** `00-THE-SET §Discovery 4`: lenis.dev's own
showcase closes every card with "Need a site like these? Work with darkroom." `sf-work-4 §6`:
the footer carries an `OPEN SOURCE` column — `SATUS · LENIS · HAMO · TEMPUS · ELASTICA · ANISO
· CC-SETTINGS`. `basement §2` and `obys §2` ship their own typefaces as the same move.

### B2. What fell away

- **The contact form** — 11 of 14 have none (§A5).
- **Framer Motion, Barba, Locomotive, Swiper** — 0 of 14 (§A7).
- **The tracked-out uppercase eyebrow** — banned outright in 4 of 14 (§A3).
- **The bold weight** — 10 of 14 run one weight (§A2).
- **The logo wall** — 2 of 14, both flagged (§A4).
- **WebGL as a requirement** — 6 of 14 ship **zero `<canvas>`**: `studiofreight §7`,
  `darkroom §7` (home), `exoape §7`, `upperquad §7`, `collins §7` (a runtime probe of
  `['gsap','Lenis','THREE','ScrollTrigger','Swiper','anime']` returned `[]`), `sara-soueidan §7`.
  `sf-work-1 §7` is the sharpest datum: Studio Freight built the three.js layer and shipped it
  `three:{enabled:false}` — the dead config still rides in every payload.
- **The 300px display headline** — the set now splits 5 over 100px against 8 topping out under
  90px (§C3).

### B3. What survived into 2026 and should not have

**The entry gate and the numeric preloader.** 5 of 14 — `unseen §4` (`ENTER` /
`ENTER WITHOUT AUDIO` over a `(LOADING)` counter), `malvah §4` (`Enter Site`, a percentage, a
`matter` physics field scattering the studio's own name), `obys §7` (a black panel with a
right-edge counter caught at `50`), `immersive-garden §7` (an SVG-mask logo wipe),
`darkroom §7` (a 0→100 counter, ~6–9s to settle). **Every one of the five is named as its own
teardown's THE TELL.**

---

## C. THE DIVERGENCES — the axes the set splits along

### C1. Paper vs black — 12 light, 2 black

**Light ground (12):** `studiofreight §3` `#fefdfc` · `unseen §3` `#F1EDEB` · `antinomy §3`
`#fff` · `exoape §3` `#fff` · `14islands §3` `#fff` · `upperquad §3` `#fafaf8` · `obys §3`
`#fff` · `malvah §3` `#f8f8f7` · `collins §3` `#f8f8f7` · `immersive-garden §3` `#e8e8e8` ·
`matthias-ott §3` `#efefef` · `sara-soueidan §3` white.
**Black ground (2):** `darkroom §3` `#000` (red-on-black) · `basement §3` `#000`.

**7 of the 12 light grounds are a tinted off-white, not `#fff`** — `#fefdfc` warm
(`studiofreight §3`), `#F1EDEB` warm (`unseen §3`), `#fafaf8` warm (`upperquad §3`), `#f8f8f7`
with a one-point green cast (`collins §3`), `#e8e8e8` (`immersive-garden §3`), `#efefef`
(`matthias-ott §3`), `#f2f2f2` alternate (`14islands §3`).

**9 of 14 set type in an off-black, not `#000`** — the two most deliberate are `collins §3`
`#140700` ("a black with brown in it, chosen to sit under a serif") and `exoape §3` `#0d0e13`
(blue-black). Pure `#000`: `studiofreight`, `obys`, `antinomy`, `malvah`, `sara-soueidan`.

**A dark-ground CASE PAGE under a light-ground home is a third position, held by 3 of 14:**
`sf-work-3 §3` (Comet is `html.lenis theme-dark`, `body` pure `#000` — exactly two colours on
the page), `upperquad §3` (`/work/gemini` stamps `data-theme="dark"` on `<html>`),
`malvah §3` (sections flip ground mid-scroll). This is precisely the House Lights
foyer/theater split, arrived at independently.

### C2. Serif vs grotesk display — 4 serif, 9 grotesk, 1 unclassified

**Serif display (4):** `studiofreight §2` (Publico Text **Mono** — a *monospaced serif* — for
names and labels, JJannon for human sentences; "That inversion… is the whole type idea") ·
`unseen §2` (Saol Display, didone-adjacent) · `collins §2` (Portrait Text) ·
`immersive-garden §2` (PSTimes — and the serif carries **body prose too**).

**Grotesk display (9):** `darkroom §2` (therma, bold condensed) · `antinomy §2` (ABC Diatype) ·
`exoape §2` (TWK Lausanne) · `upperquad §2` (Klim National — "the inversion of the obvious: the
*display* face is the grotesque-adjacent National and the *body* face is the sans") ·
`obys §2` (proprietary Obys) · `malvah §2` (Neue Haas Grotesk Text Pro) · `basement §2` (Geist)
· `matthias-ott §2` (NaN Tresor VAR, "a heavy, quirky grotesque") · `sara-soueidan §2` (the
system UI stack).

**Unclassified in its teardown:** `14islands §2` (AftenScreen for display *and* body prose,
BentonSans for labels only).

### C3. Enormous vs no display at all

**Over 100px (5):** `exoape §2` 250px h0 · `darkroom §2` 200px h1 · `studiofreight §2`
126–286px (210px case h1) · `14islands §2` 180px · `upperquad §2` 112px home / 128px case.

**Under 90px (8):** `unseen §2` 90 · `obys §2` 80 · `matthias-ott §2` ~76 · `collins §2` 72
("Display max is 72px. For a studio of this reputation that is restrained") · `malvah §2` 52 ·
`immersive-garden §2` 44 · `sara-soueidan §2` 36 · **`antinomy §2` 24** ("`.type-h1` has no
responsive override. 24px at 375px, 24px at 1440px").

Display:body ratio runs from **20:1** (`exoape`) to **1.7:1** (`antinomy`, `sara-soueidan`).
Those are two coherent and opposite answers to the same problem, and §D ranks both.

### C4. Grid vs list-index vs feed vs nothing

**Grid (4):** `studiofreight §5` (29 tiles, `grid-column: span` 2/4/6, ragged bottoms) ·
`unseen §5` (2-column 16:9, painted into a shader) · `upperquad §5` (`rounded-2xl` cards, six
aspect ratios) · `basement §5` (four 16:9 stills).
**List-index (3):** `14islands §5` (34 rows, title + sector, media summoned into one canvas on
hover) · `obys §5` (all 19 names visible at once in `#c9c9c9`, active in `#000`) ·
`malvah §5` (six rows, each `name + serial`).
**Interleaved feed (3):** `antinomy §5` ("not a grid, not a list-index" — alternating
full-bleed media with a 24px caption in an off-column) · `exoape §5` · `immersive-garden §5`
(CMS slot system: `.position__1`…`.position__10` × `.offsetX/Y` × `.align--*`, so no two
projects land in the same place).
**Bands (1):** `darkroom §5` (three viewport-wide autoplaying videos, name overlaid at 120px).
**Carousel (1):** `collins §5`.
**No work shown at all (2):** `matthias-ott §5` and `sara-soueidan §5` — both solo operators,
both replace the portfolio with writing.

### C5. Motion-heavy vs still

**Heavy** (WebGL + GSAP + a gate): `immersive-garden §7` (Lenis 1.1.14 + GSAP 3.12.5 + three
r151, and the DOM text is invisible — the `<h1>`'s `innerText` reads empty because the glyphs
are painted into the canvas) · `malvah §7` (GSAP 85 hits + Lenis 34 + three 37 + a `matter`
physics engine at 39) · `unseen §7` (three r143 + GSAP 3.6.0 + an audio gate) · `14islands §7`
(three 187 + shader uniforms 151 + scroll-velocity 92 + their own `r3f-scroll-rig`) ·
`obys §7` (**zero libraries** and a hand-written WebGL layer: `lerp` ×45) · `basement §4` (two
1440×900 canvases above the fold).

**Still:** `collins §7` (no motion library at all; `startViewTransition` ×5,
`IntersectionObserver` ×4, `requestAnimationFrame` ×11 is the entire budget) ·
`sara-soueidan §7` (zero motion libraries, 4 transition declarations, **0 `@keyframes`**; the
only transition on an interactive element is `transition: top 0.1s linear` — **on the skip
link**) · `studiofreight §7` / `sf-work-1 §7` ("the entire transition vocabulary is
`transition:opacity .1s` and `transition:opacity .2s ease`. **Opacity is the only animated
property**") · `antinomy §7` (one word-fill, one curve) · `upperquad §7` (Lenis only, five
keyframes in the whole sheet) · `exoape §7` (GSAP present, but eight transition declarations
total).

**The pattern: the most-awarded sites move most, and the two that sell judgement move least.**
`immersive-garden` is Awwwards Agency of the Year 2025 and `malvah` Studio of the Year '25
(`00-THE-SET §B`); `collins` sells eleven named engagements and ships no motion library.

### C6. The home scrolls vs it does not

**Does not (5):** `studiofreight §4` (`scrollHeight` = 900 — "The home page does not scroll.
It is one screen, and that is the site's opening argument") · `unseen §4` (**43px**) ·
`obys §4` (900) · `immersive-garden §7` (900, and `window.scrollY` never leaves 0 across twelve
wheel ticks) · `exoape §7` (900, a virtual scroller).

**Does (9):** `darkroom §8` 8,609px · `antinomy §8` 9,829px · `14islands §8` 10,304px ·
`upperquad §8` 10,848px · `malvah §8` 8,999px · `collins §8` 5,394px ("exactly six viewports.
A studio site that lands under 6,000px in 2026 is making an argument") · `basement §8` 5,814px
· `sara-soueidan §8` 5,669px · `matthias-ott §8`.

### C7. Is the work the first screen?

**Yes (3):** `studiofreight §4` (26 thumbnails and three words) · `obys §4` (19 names plus a
filmstrip; "Two-thirds of the ink on the first screen is either a project name or a project
image") · `darkroom §4` (project #1 begins bleeding in at y≈640).

**No (11).** And the amount of prose that stands in front of the work varies wildly:
**zero words** (`sf-work-1 §5`), **11 words** (`antinomy §4`), **21 words** (`sf-work-4 §5`),
**31 words** (`obys §4`), **33 words across two interruptions in a 17-project scroll**
(`immersive-garden §5`), against `malvah §5` ("zero projects before the first prose") and
`collins §4` (an award shelf and eleven programmes before a single case).

---

## D. THE BEST PARTS, RANKED

Micah's real material, fixed: **a book with nine hand-drawn pages and 26 files · a photograph ·
seven receipts with names and numbers · a first-person voice · one anonymous quote · no logos,
no invented proof.** Live numbers already in his repo: `$5B+` across four exits
(Postmates · SurveyMonkey · Guardicore · Neuton.AI), `$20M+` client revenue, `$14M` at
Guardicore, intake completion `40% → 91%` at ORDANI, monthly reach `8,000 → 290,000` in five
months.

Marks: **LEGAL** = he can ship it today from what he owns · **NEEDS OWNER INPUT** = requires a
ruling, a permission, or an asset he must make · **ILLEGAL** = would require proof he does not
have.

---

**1 — `studiofreight`: the proof section named `Receipt`.**
*Mechanism* (`studiofreight §9`, `sf-work-2 §5`): the client quote is not headed "Testimonial"
or "What they said." It is headed **`Receipt`** — a noun taken from the studio's own shipping
metaphor (Freight; "Moving Missions Forward"). One quote, attributed with a full name and title
(`— Ben Blake, Marketing and Creative Director`), set as body prose in the *reading* face at
18px rather than dressed as a pull-quote card, and placed **after** the prose and **after** the
images, where it reads as the proof-of-delivery slip stapled to the job.
*Mapping*: this is his inventory, named. Seven receipts with names and numbers become one
`Receipt` block per case. His single anonymous line sits under the same heading without
pretending to be more than it is, because the heading frames it as a record rather than as an
endorsement. Nothing here needs a logo wall (Studio Freight shows none), a carousel, or a
second quote.
**LEGAL.**

**2 — `studiofreight` / `sf-work-3`: the artifact first, the title at 79% scroll, the words
last.**
*Mechanism* (`sf-work-3 §5`): `section.work-case` has exactly four children, and the DOM order
is the whole argument — media **8,723px** (9.7 viewports) → title 443px → prose 1,123px →
pre-footer 750px. The write-up arrives at 83% scroll depth. `sf-work-2 §5` is the same page
type at rest: La Marzocco opens on a top-down photograph of the printed book on terracotta
tile with **no headline**, and the 210px `<h1>` measures at y≈3529 of a 5,662px page. And
`sf-work-3 §9`: **zero `figcaption`, zero caption elements on the page** — "It forces the
artifact to be good enough to stand alone, which is the honest test."
*Mapping*: the book photographed flat in real light — pages fanned, one spread lying open, one
detail of the hand-drawn line, one shot of it on a real desk — occupying the first several
screens of a case, with the dek and the numbers arriving after. The instinct this inverts is
the consultant default (claim, then proof).
**NEEDS OWNER INPUT** — two reasons. The photographs do not exist yet, and it collides with
`<TitleCard />`, which by definition puts a 96px word stack on the hero. Either TitleCard moves
below the first artifact plate or the artifact goes above it; that is a signature-motion ruling.

**3 — `exoape`: the five-word line under every project describes the CLIENT'S business, not the
deliverable.**
*Mechanism* (`exoape §5`, `§9`): "Amaterasu — Frontier Health Innovation." "Columbia Pictures —
Celebrating a Century of Cinema." Never "website redesign", never a service-tag list. Each
caption is the sentence the *client* would use about themselves, which does three things at
once: it makes the index scannable, it demonstrates the studio understood the business before
it touched pixels, and it converts a list of logos into a list of problems solved.
*Mapping*: his `indexLine` frontmatter field already holds this shape and holds it **better**,
because his lines carry numbers — `"Monthly reach grew from 8,000 to 290,000 in five months"`.
`basement §9` supplies the ordering refinement: outcome sentence **first**, tags second, client
name **last**, so "the tile still works when the client is unknown" — which is his exact
situation on the two name-protected engagements.
**LEGAL**, with the warning `exoape §9` attaches: write them in his register, not Exo Ape's —
two of their four home captions were rejected by this repo's copy-lint on first write.

**4 — `14islands`: the offer at 12px, the nouns at 180px.**
*Mechanism* (`14islands §4`, `§9`): the complete 11-word positioning sentence — "WE DESIGN AND
BUILD BESPOKE DIGITAL PRODUCTS, BRANDS, AND EXPERIENCES." — is set at **12px uppercase grey,
centred**, and two nouns get 180px at −0.05em. "Most sites do this backwards: the headline
argues and the caption labels. 14islands lets the headline be a *category* and the caption
carry the *claim*." Inseparable second half: **labels are uppercase at 12px with
`letter-spacing: normal`** — no tracked-out caps.
*Mapping* (`14islands §9` states it directly): his positioning line —
`Strategy and software, shipped by the same pair of hands.` — set at 12px in JetBrains Mono,
which is already the cleared R1 "narrow third" label register. Every hard fact from the seven
receipts goes into the same 12px column: `SECTOR / CLIENT / YEAR / OUTCOME`. Where 14islands
puts an AWARDS column, he puts a **receipts column** — `$14M`, `91%`, `8,000 → 290,000`, each
on its own 12px line under a grey `RESULTS` label.
**LEGAL.**

**5 — `collins`: the offer ladder outranks the portfolio, and every case is filed under the
engagement the client bought.**
*Mechanism* (`collins §4`, `§5`, `§9`): section order is hero → awards → **Programs** → Case
Studies → Arts & Culture. Eleven named engagements (`Reposition`, `Turnaround`,
`Premiumization`, `Exit (IPO/Sale)`…), each with a one-line pitch. The Bose page's **first**
metadata row is not "Branding, Identity, Motion" but `Program: Turnaround / Reposition /
Premiumization`. "The work is not a gallery — it is **evidence for a named product**. That is
why 'Rewrite your worth.' can be three words and still land: the page underneath it says
exactly what you are buying."
*Mapping*: he already ships `Three engagements.` on the home and a `/services` page carrying
per-service receipts. What is missing is the **filing** — each of the seven receipts tagged
with which of the three engagements it was, and that tag appearing as the first metadata row on
each case page. It gives a small body of work a shelf.
**LEGAL** — it is his own service definition, not a claim about anyone.

**6 — `antinomy`: nothing on the page is bigger than 24px, so the site has no voice louder than
the work.**
*Mechanism* (`antinomy §2`, `§9`): three sizes (24 / 14 / 10), one family, one weight, **one
tracking constant (−0.02em) applied at both display and body scale**, one spacing unit (18px),
one section rhythm (100 / 150 / 185px), one easing curve. The studio's own positioning
sentence, the caption on the i-D case, and the dek on the Vast page are typographically
indistinguishable. "The hierarchy a normal site buys with 120px display type, this one buys
with white space and sequence — a 620px screen holding eleven words, then 8,218px of somebody
else's photographs." Featured work is **84% of the page height**.
*Mapping* (`antinomy §9`): **the largest text on the page is a fact about the work, never a
claim about me.** He cannot write "i-D Magazine, the defining voice in identity, style and
culture" — but he can set a receipt's own line, a real number with a real name on it, at
headline size, and put his own name nowhere near it. Also: give the artifacts the **portrait
ratios** — `aspect-3/4` ×17 and 4:5 ×13 in the markup, "the ratios of a magazine page, not of
a laptop screenshot." A hand-drawn book page is a portrait object.
**LEGAL.** Note that #4 and #6 are mutually exclusive; both are coherent, and §F picks.

**7 — `darkroom` / `sf-work-4`: the two-tier proof ladder, and "what they asked for / what we
delivered."**
*Mechanism* (`sf-work-4 §5`, `§9`): 19 projects on the index, each reduced to *name + one tag +
`LIVE SITE ↗`*. Exactly **two** carry `CASE STUDY →`, and the card says so in words — the
index is honest that most of the work is a link, "and honesty about that is what makes the two
deep dives credible." On the case page, a two-cell block headed in sentence case among all the
shouting: **"WHAT THEY ASKED FOR"** (one flat sentence) against **"WHAT WE DELIVERED"** (the
reframe). "That is the whole consulting argument in two cells, and it needs no logo wall, no
testimonial, and no metric."
*Mapping*: seven receipts are seven asked-for/delivered pairs. The tiering is the important
half — let four be one line and a number, and give three the full case. His single anonymous
line sits where darkroom puts its awards row: a small, credited, non-load-bearing footnote
under the credits, never a hero.
**LEGAL.**

**8 — `obys`: the entire index visible at once, grey for exists, ink for active.**
*Mechanism* (`obys §4`, `§9`): nineteen project names sit in the left column **simultaneously**
in `#c9c9c9`, one turning `#000` as it becomes active. Nothing is behind a "view all", nothing
is ranked "featured". A hairline underline wipes in from the left
(`transform-origin:left; transform:scaleX(1)` over `.8s cubic-bezier(.19,1,.22,1)`). "One
grey, one black, one hairline, and position do all the work of hierarchy. No boxes, no cards,
no shadows, no accent colour."
*Mapping* (`obys §9`, verbatim): "seven items shown all at once reads as a body of work; seven
items shown three at a time behind a 'view all' reads as a shortage." This is the direct
counter to the thin-portfolio problem, and it costs nothing. Pair it with the metadata rule
from the same section: the index line stays **sector + scope + index number**, with the numbers
kept inside the case.
**LEGAL.**

**9 — `darkroom`: media degraded into the site's own palette until you engage with it.**
*Mechanism* (`darkroom §5`, `§9`): every `/work` thumbnail renders first as a red-on-black
1-bit ASCII/dither field — unmistakably an image, made of the site's two colours and nothing
else — and resolves into full-colour video only as the tile enters the viewport and takes the
cursor. Verified mid-transition in `darkroom-work2.png`: OREO still glyphs above, LORE already
full-colour gold below. "The studio's own page is monochrome red-on-black end to end, and the
only colour anywhere on the site is the client's work."
*Mapping* (`darkroom §9` writes the House Lights version): theater case heroes ship first as a
halftone or duotone reduction in copper on obsidian, resolving to the real screenshot on enter
— **one CSS filter chain, or a pre-rendered second asset. No WebGL, no canvas, no new
library.** Same for the book's hand-drawn pages on `/playbook`, and the portrait on `/about`
when it lands.
**NEEDS OWNER INPUT** — it is a second reveal. `darkroom §9`'s argument is that it is a
material property of images rather than a behaviour the page performs at the visitor, which is
the same reasoning that cleared `<WallChart />`. That argument belongs to the motion-engineer,
not to this report.

**10 — `upperquad`: the case-study tail as a colophon — four fixed evidence blocks, in a fixed
order, in label type.**
*Mechanism* (`upperquad §5`, `§9`): **In collaboration with** (every client-side name) ·
**Dream team** (own staff plus named partner studios) · **Press & Awards** (publication +
"Featured" + year, nine rows) · **Since launch** (metric + year: "Gemini app surpasses 750M
monthly active users · 2026"). "Every claim is a proper noun or a number with a date attached,
set in the same xs uppercase label style as the footer so it reads as a colophon, not a brag."
*Mapping* (`upperquad §9`): **"Since"** is his metric plus year, straight from the receipts.
**"In collaboration with"** is whoever is nameable — or the block is omitted, because "a
missing block reads as honest; a fabricated one is the only failure mode." **"Covered"** does
not exist for him and therefore does not appear.
**LEGAL**, with two of the four blocks deleted rather than filled.

**11 — `malvah`: the serial number, set at the same size as the title and dropped to 50%.**
*Mechanism* (`malvah §5`, `§9`): every project carries a code — `SC_12©24`, `SC_10©23` — and on
the case page the serial is set at the **same 52px as the `<h1>`**, just at
`rgba(0,0,0,0.5)`, so the code reads as the title's equal rather than as metadata. The site
itself carries `SI_01` and `CT_SA©2024`; disciplines are filed in parentheses —
`(Branding), (UX), (UI), (Development)`. "It dates the work honestly, it implies an archive
with a spine, and it turns a list of six projects into an inventory."
*Mapping* (`malvah §9`): seven receipts become `RC_01`…`RC_07`; the book's hand-drawn pages
become `PG_01`…`PG_09`; case studies become `CS_01©25`. A serial is a fact about his own
artifacts, not a claim about a client — and JetBrains Mono is already cleared for exactly this
(`§ codes`).
**LEGAL.**

**12 — `matthias-ott`: the anecdote-first sales page, and the two-word ask.**
*Mechanism* (`matthias-ott §6`): `/web-design-engineering` is a ~1,100-word **essay**, not a
services list. It opens cold on a four-paragraph anecdote about a Figma card component that
screen readers announce twice — a real defect, **no client named** — and lands on "It falls
into the space neither side owns… That's where I work." Numbers are specific and self-owned.
The CTA at the end is two words: **"Write me."** Above it, the whole hire path is a *question*
— "How can I help you grow?" — forking into two cards, not a grid of services.
*Mapping*: his two doors already run the anecdote's opening move with better copy —
"The demo took a weekend. The last 20% is eating your month." and "Too big for duct tape. Not
ready for an agency retainer." This argues for extending each into a full page-length anecdote
with no client named, and shortening the terminal ask.
**LEGAL.**

**13 — `immersive-garden`: the case-study headline that IS the case study.**
*Mechanism* (`immersive-garden §5`, `§9`): "Launching Louis Vuitton's Web 3 Vision with an
Immersive NFT Platform" — verb, client, outcome, one sentence, then a `Launch website` link and
nothing else. No metadata block, no dates, no results section.
*Mapping* (`immersive-garden §9`): "He has named numbers where IG has only client names, so his
version of that headline is *stronger* than theirs." E.g. moving intake completion from 40% to
91% on a HIPAA-compliant CRM. One sentence, one link.
**LEGAL.**

**14 — `sara-soueidan`: the name and the sentence at the same size, opposite weights.**
*Mechanism* (`sara-soueidan §9`): the `<h1>` computes to 36.064px / weight **900**, and the
positioning paragraph directly under it computes to 36.064px / weight **400** — identical size,
opposite weight, both capped at a 675px measure. "The name is a stub; the claim gets the room."
The first screen therefore has **no hero type at all** and still reads as confident, because
the confidence is in the sentence being long enough to be specific and set large enough to be
unavoidable. Second half: **the one accent appears on one element out of 199.**
*Mapping*: his sentence at the same size as his name, in the opposite weight, on a ~60ch
measure, with copper appearing once above the fold.
**LEGAL** — with the corollary `sara-soueidan §9` attaches: do **not** copy her deferral of all
proof. Her proof is twelve years of public writing the buyer already knows; his artifacts have
to appear sooner than hers do.

**15 — `collins`: the three-state hire button, ~15 lines of CSS, replacing a form.**
*Mechanism* (`collins §6`, `§9`): rest reads `Work with us`; on hover the label is replaced in
place by the address via a two-layer grid crossfade
(`a:hover .cta{grid-template-columns:1px .6fr 1px; opacity:0}` /
`a:hover .email{grid-template-columns:1px 1fr 1px; opacity:1}` / `a:hover{transform:scale(1.04)}`);
on click it copies and `[status=success]` pins the third state, `Email copied`. Three states,
one button, no modal. The same pattern in three more sites (`antinomy §6`, `malvah §6`,
`immersive-garden §6`).
*Mapping*: `micah@micahjonesconsulting.com` is already a plain mailto in his footer.
**NEEDS OWNER INPUT** — the operator ruling of 2026-09-03 is that "Booking replaces the contact
form for engagements" and `/call` is primary. A copy-email button is a third door and its
priority against `/call` is his call, not a design call.

**16 — `studiofreight` / `sf-work-1`: the ask gets the largest type on the site, 288px of air,
and it DIMS on hover.**
*Mechanism* (`sf-work-1 §6`, `§9`): `.work-pre-footer{padding:288px 0}` with `WORK WITH US →`
set in `.h1-pr` (104–184px, −2.88px tracking) as stacked lines, a small thumbnail sitting
inline *inside* the line, and the arrow as a separate 64px span so it does not scale with the
184px text. Hover fades the whole block to `opacity:.32` — the CTA dims when you point at it
rather than lighting up.
*Mapping*: his footer already carries `NAME THE PROBLEM →` at display scale. The transferable
details are the 288px of air and the dim-on-hover.
**LEGAL.**

**17 — `studiofreight`: `Capabilities: Download / View` — the deck is a download, not a
meeting.**
*Mechanism* (`studiofreight §6`): the studio offers a document instead of a calendar link.
*Mapping*: the book with nine hand-drawn pages and 26 files is exactly that artifact, and
`/playbook` already exists to hold it.
**LEGAL.**

**18 — `sf-work-1`: the filter dims to 32%; it never removes.**
*Mechanism* (`sf-work-1 §5`): non-matching tiles go to `opacity:.32` + `pointer-events:none`
and stay in place. "You always see the whole body of work." With a small body of work, never
hiding any of it is a feature (`sf-work-1 §9`).
**LEGAL.**

**19 — `unseen` + `basement`: publish the count.**
*Mechanism*: `unseen §5` — filter pills carry counts (`All 20 · Branding 5 · Digital 20 ·
Motion 5 · Experiment 6`); "the counts are the honesty device — a visitor knows the size of the
body of work before scrolling." `basement §5` — the counts are printed in the **nav**:
`Showcase (26)`, `Blog (29)`.
*Mapping* (`basement §9`, verbatim): "The count-in-nav move works with `(7)` exactly as it
works with `(26)`."
**NEEDS OWNER INPUT** — whether `Work (5)` reads as complete or as thin is a nerve question,
not an evidence question. `basement §9` argues it reads as complete.

**20 — `darkroom`: the plain-text client list.**
*Mechanism* (`darkroom §6`, `§9`): nine company names set as running text in the same face as
everything else, beside `Technologies` and `Awards / Features` — "three lists of plain words
where most studios put three rows of images." It "proves a word list reads as more confident
than a logo wall, not less."
*Mapping*: he already does this — `Postmates · SurveyMonkey · Guardicore · Neuton.AI` runs as a
chip sub-line under the `$5B+` figure on his hero. The finding is that it is correct, and that
it should not be upgraded to marks.
**LEGAL.**

**21 — `darkroom`: the dated ledger, with redactions.**
*Mechanism* (`darkroom §8`): `Activity Log` — dated, tagged, reverse-chronological, one line
each, ~22 entries, including `2026/01/20 · Stealth · [REDACTED] — iOS app. More soon.`
`antinomy §8` runs the same shape as a news ledger back to November 2021, each entry a date, a
category and one sentence — "a changelog for a studio."
*Mapping* (`darkroom §9`, including its own caution): proof-of-shipping with no logo, no
testimonial and no invented metric, and it can carry redactions honestly — but "an Activity Log
is only different if every entry is *client-outcome shipping*: dated deliverables with numbers,
never process notes about the site itself. Darkroom's own log fails that test."
**NEEDS OWNER INPUT** — blueprint §13 bans `/now`, `/uses` and decision logs as dev-Twitter
tells. This survives only under the client-outcome-only rule, and that is a ruling.

### Marked ILLEGAL — named so they are not drifted into

- **The award shelf.** `collins §10` — "8x Agency of the Year" as the second screen, eight
  badges before a single project, "the one section of this page that is about COLLINS rather
  than about the buyer. For a solo consultant it is doubly wrong: he has no awards, and
  manufacturing an equivalent (badge row, 'as featured in', counter stats) would be exactly the
  invented proof the brief forbids." Same verdict in `unseen §9` (skip the
  `Awards & Recognition` block) and `upperquad §9` (do not import the "00 Awwwards / 00 Webbys"
  animated-counter sentence or the seven-item "New & noted" press row — "those are a logo wall
  by another name").
- **The logo band.** `basement §9` — "requires clients who let you print their marks, and he
  has none." Already a named anti-pattern in `.claude/CLAUDE.md`.
- **Borrowed audience metrics.** `matthias-ott §9` — the webmention counts and the
  "over 2,400 readers" figure, "unless he holds the receipt."
- **Proof-of-scale furniture.** `antinomy §9` — the showreel, the WebGL canvas, and the
  two-office footer: "all three are proof-of-scale devices for a 2019-founded team, and on a
  one-person site they read as costume."
- **The unlabelled mosaic and the one-word `<h1>`.** `sf-work-1 §9` — the 29-tile mosaic "needs
  volume he does not have"; `sf-work-1 §10` — "A solo consultant asserting one abstract noun
  reads as evasive, not confident."; `sf-work-2 §10` — "a buyer who cannot tell what he built
  without hovering leaves."

---

## E. THE ANTI-LIST — what none of them do, and what the tells were

### E1. Not one of the fourteen does any of this

| # | Nobody does | Denominator | Citation |
|---|---|---|---|
| 1 | Shows a price, a range, or "starting at" | 14/14 | every teardown §6, grep-verified across all 18 files |
| 2 | Ships a calendar or booking link | 14/14 | every teardown §6, grep-verified |
| 3 | Ships a budget dropdown | 14/14 | every teardown §6 |
| 4 | Runs a testimonial carousel | 14/14 | §A4 |
| 5 | Carries a second accent colour | 14/14 | §A1 |
| 6 | Scroll-jacks or snap-pins the page | 14/14 | §A8 |
| 7 | Ships Framer Motion, Barba, Locomotive or Swiper | 14/14 | §A7 |
| 8 | Uses stock photography, an icon kit, or illustration | 14/14 | no teardown reports one; §A1 |
| 9 | Puts a newsletter signup in the nav | 14/14 | the four that have one keep it in the footer |
| 10 | Runs more than three families in visible use | 14/14 | §A2 |
| 11 | Sets body copy in uppercase | 13/14 | the exception is `darkroom §10`, and its own teardown calls it a costume |
| 12 | Puts a services list of more than four items on the home page | 13/14 | the exception is `collins §5` at eleven, and that IS the page |

### E2. The tells, and what each one cost

- **The gate.** `unseen §10` — "It costs the visitor a click, a decision and a wait before a
  single fact about the studio arrives, and it is the reason the 30-word positioning line has to
  live on a splash screen instead of on the site. A solo consultant selling judgement cannot
  afford a doorman." `malvah §10` — "A consultant selling clarity cannot put a gate in front of
  the proof." `obys §10` — "A visitor who has seen four studio sites this month has seen this
  exact screen four times."
- **The page that refuses to scroll.** `immersive-garden §10` — "The trance… you cannot skim
  it, cannot copy a sentence out of it, and cannot tell a colleague to look at the third one
  down." `obys §10` — `scrollHeight` is 900 on every page, and the case study for Makhno
  contains **zero `<img>` and zero words**: "a case study that is purely a moving image column
  has no argument in it — it is a mood, not a proof."
- **The floating blurred pill nav.** `antinomy §10` — "the most-copied 2024–2026 component on
  the agency web; it arrives pre-installed in every Tailwind/Next starter, and it is the one
  element on an otherwise ruthlessly specific page that could be lifted onto any other studio in
  this study without anyone noticing." `upperquad §10` — a **hamburger on a 1440px desktop**
  hiding four destinations the footer prints in full.
- **The terminal costume.** `darkroom §10` — red-on-black mono body copy, `work://` and
  `contact://` prefixes, window-chrome glyphs, `[REDACTED]`, `ALL[19]`: "it signals *we are
  hackers* to an audience of other studios… A solo consultant selling to clinic owners and
  operations leads cannot wear it; that audience reads it as a website about websites."
  `sf-work-4 §10` — all-uppercase mono body "reads as terminal cosplay at paragraph length."
- **Mono-as-display.** `sf-work-2 §10` — "mono-as-display at 210px with `-2.88px` tracking is
  currently everywhere; the underlying idea survives translation, the specific look does not."
  `sf-work-3 §10` — "it reads as *studio* before it reads as *this studio*."
- **The comma-run nav.** `sf-work-2 §10` and `antinomy §10` both file `Home, Info, News, Aeon`
  as a 2024–26 mannerism. Three of the fourteen already wear it.
- **The typewriter caret.** `studiofreight §10` — the work-index `<h1>` caught mid-animation as
  `EXPER|`: "On a site whose whole thesis is stillness… a terminal-cursor type-on is the one
  gesture borrowed from a trend rather than from the studio's own logic — and it is the only
  place the site performs about itself instead of showing the work."
- **The AI-studio uniform.** `basement §10` — `Press [/] to chat`, an `Online` presence chip,
  and a `HUMAN | MACHINE` toggle to `/ai/home`: "It reads as the studio signalling which client
  segment it wants… rather than as anything the visitor needed. It dates the page to a season."
- **The one WebGL canvas everything composites into.** `14islands §10` — images invisible to a
  screenshot and to anything that does not run WebGL, "hundreds of kilobytes of GPU work to
  achieve a hover reveal", and "a **credibility mismatch** — a shader-composited image layer
  says 'we have a graphics engineer', which is a claim, not a decoration."
- **The personality shelf.** `matthias-ott §10` (`/now` + `/uses` + "This page loaded in 0.4
  seconds. 🚀"), `sf-work-4 §10` (the footer `INSPIRATION` column — `IMPORTANT VIDEO · A
  MEANINGFUL SONG · GREAT BOOK BTW`), `sf-work-2 §10` (Studio Freight's food and book
  recommendations: "charming for a twenty-person studio, dev-Twitter tell for one person").
- **Ten social icons, one of them Facebook.** `malvah §10` — "reads as a checklist rather than
  a choice."
- **`prefers-reduced-motion` absent.** `exoape §7` — "appears 0 times… In a 74KB sheet on a
  site built almost entirely of autoplaying video, that is a real accessibility gap."
  `collins §7` — "appears nowhere in the stylesheet. Do not copy that." **The two most
  otherwise-disciplined sites in the set are the two that skipped it.**

### E3. The most common defect in the whole set: the design system that outgrew its own file

Five of the fourteen ship a dead layer to every visitor.

- `studiofreight §2(b)` — `entry.css` still carries a **complete** `Portrait Text` / `Graphik`
  scale (sizes, letter-spacing, line-heights, `.text-xl` / `.text-primary` / `.text-eyebrow`
  classes) for two fonts that **no `@font-face` or link loads on any page.**
- `collins §3`, `malvah §3` and `studiofreight §3` all declare the identical token
  `--color-brian-orange:#ff7600` — named after a person — and **all three reference it zero
  times.** `upperquad §3` does the same with `--color-accent-500 #1602ff`.
- `malvah §2` — stray unused `Portrait Text` and `Graphik` strings with no live rule.
- `sara-soueidan §10` — three Google families preconnected and requested, the request **400s**,
  and the CSS names none of them; plus an unused ten-step `oklch()` ramp.
- `sf-work-1 §10` — the three.js layer built, switched off (`three:{enabled:false}`), and the
  dead config still riding in every payload.

**A finding worth naming on its own**: `collins`' *live* type system (`Portrait Text` +
`Graphik`) and its exact colour token block are the *dead* layer inside both `studiofreight`'s
and `malvah`'s bundles — same tokens, same hexes, same `--color-brian-orange`, all three on
Nuxt. Three of the fourteen are descended from one codebase. The lesson `studiofreight §10`
draws for a one-person site: "when the type system changes, delete the old one, or the CSS
starts lying about what the site is."

---

## F. THE RECOMMENDED SYSTEM FOR HIM

Every element below names where in the set it comes from. Where his live code already does the
right thing, the entry says so rather than inventing a change.

### F1. Ground, ink, grey, accent

| Token | Value | Source in the set |
|---|---|---|
| foyer ground | `#F5EFE4` (keep) | 12 of 14 sit on light (§C1); 7 of the 12 use a tinted off-white, not `#fff` — `studiofreight §3` `#fefdfc`, `upperquad §3` `#fafaf8`, `collins §3` `#f8f8f7`, `matthias-ott §3` `#efefef`. His is warmer than all of them; that is the House Lights identity, not a defect. |
| foyer ink | `#1A1816` (keep) | 9 of 14 use an off-black. The closest analogue is `collins §3` `#140700`, "a black with brown in it, chosen to sit under a serif". |
| theater ground / ink | `#0D0D0F` / `#EAE6DD` (keep) | `sf-work-3 §3` is the model: a dark case page under a light home, and **exactly two colours on the page**. Independently arrived at by `upperquad §3` (`data-theme="dark"` on `/work/gemini`). |
| grey | **collapse to alpha ramps of the ink** — `.2 / .4 / .6 / .8` | `exoape §3`: "Greys are not separate hexes — they are alpha ramps of the one ink: `rgba(13,14,19,.2/.4/.6/.8)`. That is the entire grey system." Same in `malvah §3` (secondary text is the ink at 50% alpha) and `upperquad §3` (~20 alpha variants of two colours). This retires `--foyer-ink-soft` and `--theater-ink-soft` as separate hexes and keeps the greys in the ground's temperature. |
| accent | **copper `#C8542B`, one accent, kept structural** | 0 of 14 have two (§A1). 12 of 14 render none. The two that use one keep it as a pulse — `basement §3` (a toggle's active half and focus rings), `darkroom §3`. |
| accent frequency | **at most 2–3 elements per screen** | `sara-soueidan §3`: the brand pink appears on **one element out of 199**, and `§9`: "Scarcity is what makes it read as a decision rather than a theme." |
| body-text emphasis | `--accent-copper-deep #8E3A1E` | His own AA rule (Pitfall B1). Unchanged. |
| `ordani-sage #5E7158` | keep, scoped to `/work/ordani` | It is the *client's* colour on the client's page, which is the set's own rule (§A1). One route, one exception. |

### F2. Display face — class and candidates

**The class the evidence points to:** a display grotesque with an optical-size axis, run at
**one weight**, self-hosted, with a metric-matched fallback. Not the editorial-serif lane. The
reasoning: 9 of 14 use a grotesque display (§C2); his voice is first-person and operational
rather than editorial-luxury; and his artifacts — hand-drawn diagrams, a whiteboard photograph,
screenshots — already supply the warmth a serif would be recruited for. `matthias-ott §2` is
the nearest solo-operator analogue and runs "a heavy, quirky grotesque."

**Candidates on Google Fonts** (his stack is `next/font/google`, `lib/fonts.ts` is the source
of truth):

1. **Bricolage Grotesque — the incumbent, and the recommendation.** Variable with `opsz`,
   `wght` and `wdth`. *Why:* an optical-size axis is exactly how the set gets to one or two
   families (§A2) — one file carrying both a 12px label and a 72px display without a second
   face. It is already shipped (Pass-37) and live code wins. The change the set asks for is not
   the face; it is the **weight count** (§F4).
2. **Instrument Serif** — if the collins position is ever wanted. High-contrast display serif
   with a real italic; one weight only, which matches `collins §2` exactly ("weight 400 only…
   there is no second weight file on the wire") and `unseen §2` (Saol Display Light, one cut
   plus an italic). Buys the consultancy-that-sells-judgement register at the cost of a
   whole-site face swap.
3. **Fraunces** — the `studiofreight §2` register, available. Variable with `opsz`, `SOFT` and
   `WONK`; an old-style/Jannon-lineage serif that can be set quirky at display and normal at
   text. This is the "JJannon for human sentences" half of Studio Freight's inversion without
   the mono half.

### F3. Chrome face

**Keep JetBrains Mono, scoped exactly as it already is** — labels, § codes, data, and nothing
else. The set splits: 5 of 14 carry the technical register in a mono (`studiofreight §2`,
`darkroom §2`, `basement §2`, plus two that declare one and never use it), and 8 carry it in a
tiny grotesque. His scoping is the safe half of that split, and two teardowns name
mono-beyond-labels as the 2026 costume (`darkroom §10`, `sf-work-3 §10`).

**The one refinement to adopt, from `14islands §9`:** set the labels **uppercase at 12px with
`letter-spacing: normal`** — no tracked-out caps. "It is a one-line difference from the studio
default and it is the reason the labels read as documentation rather than as decoration."
Enforced by 4 of 14 (`collins §2`, `obys §2`, `malvah §2`, `immersive-garden §2`).

### F4. Display scale — four steps, ratio 4:1, cap at 72px

The set splits 5 over 100px against 8 under 90px (§C3). The 250px lane is closed to him, and
`sf-work-1 §10` says why in one line: *"Micah's first screen has to say what he does in a
sentence."* The right neighbours are `collins §2` (display max **72px** — "For a studio of this
reputation that is restrained") and `matthias-ott §2` (~76px).

| step | size | tracking | line-height | source |
|---|---|---|---|---|
| display | `clamp(2.75rem, 1.6rem + 4.6vw, 4.5rem)` → 44px @375 → **72px @1440** | −0.02em | 1.02 | `collins §2` cap; the −0.02em is the set's median (§A3) |
| section | 28–36px | −0.015em | 1.1 | `unseen §2` 57.6px is the ceiling; `malvah §2` 22px the floor |
| body | **17–18px, moving barely** | 0 | 1.5–1.6 | `upperquad §2`: "the headline is responsive, the paragraph is not" — `--text-base` moves 1.7px across the whole viewport range |
| label | 12px, uppercase, `letter-spacing: normal` | 0 | 1.4 | `14islands §9` |

Display:body ≈ **4:1** — between `antinomy` (1.7:1) and `collins` (6:1), i.e. in the
judgement-selling half of the set, not the spectacle half.

**Measure:** cap prose at ~60–65ch. `antinomy §2` caps at `40rem` (400px); `sara-soueidan §9`
at 675px; `collins §8` sets every section dek at `max-width:500px` with `text-wrap: balance`.

**Two mechanical details worth taking verbatim:**

- `collins §2` — `margin-block: -.175em` on the display utilities, cancelling the face's
  leading so a large line optically sits on its box. "Nobody does this and everybody should."
- `matthias-ott §2` — the 2026-native version of the same thing:
  `text-box-trim: trim-both; text-box-edge: cap alphabetic`.

**Weights: two.** Display at one setting, body at 400, and **500 reserved for metadata keys
only** — which is `antinomy §2` exactly ("`14px / 500` … the *only* emphasis: metadata keys —
Year, Client, Scope", 19 occurrences on the whole page). His `brand.json` currently lists six
weights across display and body; 10 of 14 run one per face (§A2).

### F5. Nav

- **A flat top bar. Wordmark left. Four destinations, visible at desktop, no hamburger above
  900px.** 10 of 14 show the nav at desktop; all four that hide it are flagged, and
  `upperquad §10` names the hamburger-on-1440 as its own tell.
- **Four is the number.** 8 of 14 carry four or fewer (`darkroom §4` three, `unseen §4` three,
  `antinomy §4` four, `exoape §4` four, `obys §4` two). Suggested four: `Work · Services ·
  Playbook · About`. Everything else — `/packages`, `/call`, `/contact` — is printed in the
  footer, which is exactly what makes `upperquad §4`'s footer work and its hamburger
  unnecessary.
- **The ask does not sit in the nav, or sits there with no extra weight.** `darkroom §4` — "No
  CTA in the nav. The CTA lives in the footer." `antinomy §6` — `Contact` at `opacity:.4`, "the
  ask is given no more visual weight than 'About'."
- **Persistent chrome, changing middle, identity in a breadcrumb rather than a per-page `<h1>`**
  (`studiofreight §4`, `sf-work-3 §4`). This is compatible with route-determined foyer/theater
  and, per `00-THE-SET §Cross-cutting 5`, gives the mode switch something to switch *around*.
- **Do not adopt:** the comma-run (`sf-work-2 §10`, `antinomy §10` — three of fourteen already
  wear it) or the floating blurred pill (`antinomy §10`).

### F6. How the work is shown

1. **The complete index, always visible.** All five case studies and all seven receipts on one
   screen, greyed, with the active row in ink and a hairline underline wiping from the left
   (`obys §4`, `§9`). Never behind a "view all": "seven items shown all at once reads as a body
   of work; seven items shown three at a time behind a 'view all' reads as a shortage."
2. **Row = name + an outcome line + a sector, and nothing else.** Outcome sentence first, tag
   second, name last (`basement §9`), with the line describing the client's business or result
   rather than the deliverable (`exoape §9`). His `indexLine` frontmatter already holds this.
3. **Print the count.** `Work (5)` in the nav (`basement §5`) or filter pills carrying counts
   (`unseen §5`).
4. **Filter by dimming to `opacity:.32`, never by removing** (`sf-work-1 §5`).
5. **The case page opens on the artifact, not on a headline** (`sf-work-2 §5`, `sf-work-3 §5`),
   with **zero captions on the artifact plates** (`sf-work-3 §9`).
6. **Portrait ratios — 3:4 and 4:5, full-bleed, no gutter** (`antinomy §9`). A hand-drawn book
   page is a portrait object and photographs better at 3:4 than in a 16:9 card.
7. **Metadata as a flat label/value masthead, not a paragraph.** 6 of 14 open a case this way:
   `malvah §5` (`Areas` / `Overview` / `Links`, labels solid, values at 50% alpha),
   `darkroom §5` (`YEAR / CLIENT / TYPE / ROLE`), `unseen §5` (`PROJECT OVERVIEW` / `SERVICES` /
   `DATE · CLIENT · LOCATION`), `basement §5`, `collins §5` (`Program / Industry / Stage`),
   `antinomy §5`. His frontmatter already carries `role`, `tools[]`, `year`, `status`, `client`
   — plus, per §D5, the engagement it was filed under, as the first row.
8. **The proof block is headed `Receipt`, sits last, and is set at body size in the reading
   face** (`studiofreight §9`, `sf-work-2 §5`) — never as a pull-quote card.
9. **The case tail is a colophon: `Since` (metric + year), and blocks he cannot fill are
   deleted rather than filled** (`upperquad §9`).
10. **Serials on everything** — `RC_01`…`RC_07`, `PG_01`…`PG_09`, `CS_01©25` — set at the same
    size as the title and dropped in alpha (`malvah §9`).

### F7. The path to business — his own words only

The set's shape: the ask is 2–4 words, it is not in the nav, it lives in the footer, and it is
an address (§A5). Assembled from strings already live in his repo:

- **The footer display line: `NAME THE PROBLEM →`.** Give it the `sf-work-1 §6` proportion —
  the largest type on the site, **288px of air**, and `opacity:.32` on hover rather than a glow.
- **Under it, one 14px chrome row, three items:** `Book a free intro call →` ·
  `micah@micahjonesconsulting.com` · `LinkedIn ↗`. That is the `darkroom §8` / `14islands §6`
  footer shape, and it is what his footer already renders.
- **Home hero:** `See the work ↓` as the one filled pill; `Hire me →` and
  `Book a free intro call →` demoted to the underlined chrome grammar. His W3 ruling and his
  live code already do this, and `14islands §6` / `unseen §4` agree that the first ask should
  be to *look*, not to book.
- **Section CTAs, unchanged:** `See full services →` · `See the three engagements →` ·
  `Read the playbook →` · `See the three packages →`.
- **The positioning line — pick one of two, they are exclusive:**
  (a) `Strategy and software, shipped by the same pair of hands.` at **12px uppercase mono,
  `letter-spacing: normal`**, above a two-noun display (`14islands §9`); or
  (b) the same sentence at the **same size as his name in the opposite weight** on a ~60ch
  measure (`sara-soueidan §9`). **(b) is the better fit**, because 10 of 14 assert in eleven
  words or fewer while the two closest analogues — the two solo operators — both write a full
  sentence at display scale (`matthias-ott §4` 40 words as the `<h1>`; `sara-soueidan §4` 37
  words at the h1's own size).
- **The two doors stay as written** — "The demo took a weekend. The last 20% is eating your
  month." / "Too big for duct tape. Not ready for an agency retainer." They are the
  `matthias-ott §6` two-card fork with a symptom in place of a question, which is stronger.

**Three places he departs from all fourteen — flagged as owner decisions, not defects:**

1. **Published prices** (`Three fixed prices start at $500`; the $149 playbook). **0 of 14 show
   a price.** But two ranked-out *solo operators* do — `00-THE-SET §Runners-up`: `danmall.com`
   ("the strongest *pricing* model in the set") and `designjoy.co` ("one person, publicly
   priced subscription, the productized-solo extreme"). The pattern lives in the solo lane and
   is absent from the studio lane. Pass-30 already keeps it off the enterprise front door,
   which is the correct reading of that split.
2. **A booking link** (`/call`; operator-locked 2026-09-03, "Booking replaces the contact form
   for engagements"). **0 of 14 ship one.** The set's counter-argument is that an address reads
   as *more* available than a funnel for a person who answers his own mail (`antinomy §9`,
   `exoape §9`). The ruling is dated and stands; this is the evidence against it, on the record.
3. **A form** (`/contact`). **11 of 14 have none.** His is the `studiofreight §6` pattern — a
   form *plus* plain mailto routes — which is one of the three that do ship one.

### F8. Motion vocabulary — and what stays quiet

**Keep, all three already correct:**

- `<TitleCard />` as the one signature (§A8 — nothing in the set has two).
- The foyer↔theater **native View Transition**. 5 of 14 now use the native API and Barba is at
  zero (§B1) — he is on the current idiom, not behind it. `collins §7` supplies one refinement:
  crossfade **over black** (`::view-transition-image-pair(root){background:#000}`) at 450ms.
- `<WallChart />` as the one figure.
- **Lenis with `syncTouch: false`.** 6 of 14 ship Lenis; nobody in the set fights iOS momentum.

**Adopt three things:**

1. **A published ceiling on the transition dictionary: two curves, four durations, nothing
   outside them.** `obys §7` uses exactly two curves in the whole file
   (`cubic-bezier(.16,1,.3,1)` and `cubic-bezier(.19,1,.22,1)`) with durations at
   `.4 / .6 / .8 / 1 / 1.6s`. `antinomy §7` uses **one**
   (`--ease-out: cubic-bezier(.16,1,.3,1)`). `sf-work-1 §7` is the floor: "Opacity is the only
   animated property."
2. **Gate the whole system from one custom property.** `antinomy §3`: `:root{--motion:1}`
   flipped to `0` under `@media (prefers-reduced-motion: reduce)`. One property, one place,
   auditable in a grep. And note `exoape §7` and `collins §7` — the two most disciplined sites
   in the set both **skipped reduced-motion entirely**, which is the single most repeated
   accessibility failure here.
3. **Let the word-fill be the only reveal, and delete the rest.** `antinomy §7`: every headline
   and paragraph is server-rendered split into one `<span>` per word at `opacity:0.1`, filling
   to 1 as the block passes the viewport — "It is the only thing on the site that animates, and
   it is doing the work an italic or a bold would do — pacing the read." He already ships
   `<SplitReveal>`. The finding is that this should be his *only* entrance, not one of several.

**Stays quiet — with the count that justifies each:**

- No cursor follower (12 of 14; the 2 that have one are the 2 least browsable sites).
- No parallax on type, no velocity skew, no scroll-linked layer stacks.
- No pinning, no scroll-jacking, no snap (14 of 14).
- No marquee (3 of 14 have one and 2 are flagged; his Pass-68 already deleted one).
- No preloader, no gate, no percentage counter (5 of 14 have one; all five are their own
  teardown's tell).
- No WebGL, no `<canvas>` (6 of 14 ship zero, including Studio Freight, which built the layer
  and shipped it `enabled:false` — `sf-work-1 §7`).
- No horizontal gallery, no hero video, no page-transition curtain beyond the native one.

**One live behaviour with no analogue anywhere in the set:** the pointer-parallax on his hero
`<h1>` (`dx*6/dy*4`, `components/color-worlds/Hero.tsx`). **0 of 14 run a pointer-linked
parallax on display type.** Naming it here so the decision to keep it is made knowingly.

---

## G. WHAT STUDIO FREIGHT'S CLIENT WORK ADDS THAT THEIR HOME PAGE DOES NOT

Their home page is one screen. `scrollHeight` = 900 at a 900px viewport (`studiofreight §4`,
`sf-work-2 §4`). Its **total copy, in order**: `Home` · `Work, Info, News, Aeon` · `Contact` ·
**`Moving Missions Forward`** · `IG / LI` · `Studio Freight` · `©2026 / Terms`. Around it, 26
unlabelled thumbnails whose anchors carry **no text at all** — "you must hover or click to
learn what anything is" (`sf-work-2 §5`). It asserts taste, and carries **no prose, no proof,
no numbers, no metadata, and no CTA of any kind** (`studiofreight §4`).

The client pages add seven things the home page has none of.

**1. A proof section with a person's name on it.** `Receipt` — one quote, `— Ben Blake,
Marketing and Creative Director` — placed after the prose and after the images, sized like a
footnote (`studiofreight §5`, `§9`). The home page carries no proof of any kind.

**2. Prose, in a reading face, at length.** ~450 words in five paragraphs under a mono `Info`
label, set in JJannon at 18px / 132% — the only extended writing on the site
(`studiofreight §5`, `sf-work-2 §5`). It opens "La Marzocco has never chased attention." and
closes on the line that the book "doesn't try to sell anything" (`00-THE-SET §A`). The home
page's entire prose budget is **three words**.

**3. A metadata spine.** `Services` (Creative Direction, Applied Design) · `Labels` (Consumer,
Food/Drink) · `Links` · `More` — flat labelled fields in 14px mono (`sf-work-2 §5`). The home
tiles carry no caption, no year, no sector, no role.

**4. Outbound links as receipts.** The Comet page publishes `Website · The Manifest · Pangram
Pangram · The Brand Identity · Vimeo`; the La Marzocco page publishes its **actual research
boards** on Are.na and Savee (`sf-work-3 §5`, `sf-work-2 §5`). `sf-work-3 §9` draws the
principle: "verifiable third-party destinations, not claims. **A link is a receipt, and it
requires no testimonial.**" Nothing on the home page is verifiable by anybody.

**5. The ask, at display scale, with air around it.** `.work-pre-footer{padding:288px 0}`,
`WORK WITH US →` set in `.h1-pr` at 104–184px with the arrow as a separate 64px span, dimming
to `opacity:.32` on hover (`sf-work-1 §6`). The home page has **no CTA at all**
(`studiofreight §4`).

**6. Motion and ground-colour spent on the client's material.** 13 autoplaying looping videos
on Comet, 2 on La Marzocco, against **zero video on the home** (`sf-work-3 §5`, `sf-work-2 §7`,
`studiofreight §7`). And the theme flip: Comet runs `html.lenis theme-dark` with `body`
background pure `#000` and **exactly two colours on the entire page** (`sf-work-3 §3`), against
`rgb(254,253,252)` on the home. The dark ground exists only because the client's work needed it
— the studio's chrome contributes zero hue either way.

**7. The DOM-order argument, which the home page structurally cannot make.**
`section.work-case` is four children — media 8,723px → title 443px → prose 1,123px →
pre-footer 750px (`sf-work-3 §5`). 9.7 viewports of artifacts before a single word; the title
at 79% scroll depth; the write-up at 83%. "A reader who bounces at two screens has seen only
the work." The home page has nothing to sequence, because it is one screen.

**The load-bearing conclusion.** The home page is a *taste signal that only works on a visitor
who arrived pre-sold* — `sf-work-1 §9`: the rotating one-word `<h1>` "only works when the
visitor arrived already knowing who you are"; `sf-work-2 §10`: "a buyer who cannot tell what he
built without hovering leaves." **Every mechanism on this site that would actually convince a
stranger lives on the client pages**: the named quote, the prose, the metadata spine, the
verifiable outbound links, the ask at display scale, and the artifact-first sequence. A solo
consultant whose visitors arrive cold — from LinkedIn, from a referral, from a search — must
run the **client-page grammar on the home page**, and keep only the home page's restraint: the
warm off-white, the 14px chrome, the absence of a logo wall, and the refusal to explain itself
twice.

**And the darkroom half of the same lineage adds two more that Studio Freight's own client
pages do not have:** the honest two-tier ladder (`LIVE SITE ↗` ×19 against `CASE STUDY →` ×2,
with the card saying which — `sf-work-4 §5`) and the two-cell **`WHAT THEY ASKED FOR` /
`WHAT WE DELIVERED`** block, which `sf-work-4 §9` calls "the whole consulting argument in two
cells, and it needs no logo wall, no testimonial, and no metric."
