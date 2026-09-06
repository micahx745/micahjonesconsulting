# Hyperbolic — client build by Studio Freight

## 1. Fetch proof

- **Live URL:** https://www.hyperbolic.ai/ — **HTTP 200**
- **`<title>`:** `Hyperbolic — Open-Access GPU & AI Cloud` (confirmed live in Playwright, not just WebFetch)
- **Studio:** Studio Freight. **Pointer:** https://studiofreight.com/work/hyperbolic — **HTTP 200**
- **What the case-study page says they did.** Services listed: *Strategy, Messaging, Visual identity,
  Digital design, Development.* The diagnosis, quoted: "Their brand promise amounted to little. They
  looked like countless other developer-focused upstart startups with dark interfaces and technical
  language that failed to communicate their true value." The remedy, quoted: the future of AI
  "should be collaborative," delivered as a hyperboloid monogram, custom typography across three
  typefaces, and a graphic system combining 3D GPU renders with line-art illustrations — positioning
  Hyperbolic as "The Open Access AI Cloud."
- **Note the inversion, because it is the whole build:** the studio's stated problem was *dark
  interfaces*, and the site they shipped is on a **light grey ground (#eee-family)**. The rebrand is
  legible in one glance for exactly that reason.

## 2. The client and the product

Hyperbolic rents GPU compute — H100/H200/B200, on demand or reserved — to AI teams, plus an
OpenAI-compatible inference API. It sells *access without procurement*: no quota games, no sales
call, no lock-in.

## 3. First screen

- **Asserts:** `THE / OPEN-ACCESS / AI CLOUD` — **five words**, set on three lines in caps, at
  **104px**. Subhead, 24 words: "Hyperbolic gives 250,000+ builders affordable on-demand GPUs to
  train fast, serve via an OpenAI-compatible API, and scale to production."
- **Alignment:** total. The headline is the positioning line from the case study, verbatim. The
  subhead carries a named number (250,000+), three verbs (train / serve / scale), and no adjectives.
- **What the hero IS:** a **WebGL wireframe hyperboloid** — a single full-viewport `<canvas>`
  (1440x900, `position:absolute`, webgl2), rendering the ruled surface the brand is named for, in a
  cyan-to-violet-to-red gradient. It is the logo's monogram promoted to geometry. Behind it, a faint
  square dot-grid fills the ground. No photograph, no video, no product screenshot above the fold.
- **Nav:** 4 links left of centre (`GPUS · ABOUT · DOCS · BLOG`) in mono caps inside a pill, and 3
  actions right (`LOG IN`, `Schedule a Call` outlined, `Get Started` filled violet). Fixed header,
  `--header-height: 62px`. Not hidden — but on scroll the four nav links drop away and **only the
  two CTAs remain pinned** (visible in `-mid.png` and `-late.png`). That is the ask getting louder
  as you descend.

## 4. Type system from the CSS

Three families, all self-hosted `.woff2` via `next/font` (matching the case study's "custom
typography across three typefaces"), aliased in the CSS as `kh`, `geist`, `mono`:

| Role | Family (CSS alias) | Weights loaded | Where |
|---|---|---|---|
| Display | `kh` (the custom face — squarish, slab-terminal, drawn) | 400, 700 | `h1` only |
| Text | `geist` | 400, 500, 600 | `h2`, `h3`, body |
| Labels / data | `mono` | 400 | eyebrows, § numbers |

- **Display size:** `h1` computes to **104px** at 1440 and **42.9px** at 390. Fluid ramp in the CSS:
  `clamp(78px, 6.65vw, 132px)` for the largest step, `clamp(48px, 4.7vw, 84px)` below it.
- **Tracking:** `h1` at **-2%**, `h2` at **-1%** — negative on display, tightening as size grows.
  Label ramp `clamp(10px, 0.9vw, 18px)`.
- **Uppercase:** confined to the `h1` (`text-transform: uppercase`) and the mono eyebrows
  (`TRUSTED BY LEADING AI TEAMS`, `AI NATIVES`, `RESEARCHERS`, `COMPUTE PROVIDERS`, `USE CASES`).
- **Mono use:** eyebrows and the `01`–`06` ordinals only. Never body, never headings. Exactly the
  "narrow third" discipline.
- **Body:** `geist` 400/500, headings 500 at 48px. Section h3s at 27px, weight 400 — the sub-heads
  are *lighter* than the section heads, which is what keeps an 8,419px page from shouting.

## 5. Palette from the CSS

Declared custom properties (the real source of truth here, since the compiled CSS hex counts are low):

```
--color-contrast : #5b25d4   (violet — the accent, 5 hex occurrences, most-repeated in CSS)
--darkgray       : #1a1a1a   (type colour; --darkgray-65 #1a1a1aa6 for secondary)
--white          : #fff  |  --black : #000
--color-secondary: #eee      (the ground)
--color-gray     : #bbb  |  --mediumgray : #888
--color-cyan     : #40ffdd   (gradient partner, 1 use)
--color-orange   : #ff8400   (1 use)  |  --green : #3ae03a  (1 use)
```

- **Ground:** light — `#eee`-family grey, not white and emphatically not the dark developer default.
- **Type colour:** `#1a1a1a` near-black, with `rgb(26,26,26)` on sub-heads; pure `#000` on the `h1`.
- **Accent:** `#5b25d4` violet, and it is **rationed hard** — the `Get Started` button, the
  `Deploy GPU Clusters` button, and three words of the "affordable **GPU access**" headline. Nothing
  else on the page is violet. Everything else is greyscale plus the gradient art.
- **Is it the client's brand colour doing the work?** Yes, but only as *punctuation*. Cyan, orange
  and green appear once each in the CSS and live almost entirely inside the WebGL gradient and the
  dithered illustrations — the flat UI never uses them. The page is a greyscale document with one
  violet and two pictures that hold all the colour.

## 6. The narrative arc

Nine sections, in DOM order, with measured heights:

1. **`home-hero`** (720px) — the claim + the hyperboloid + two CTAs (`Deploy GPU Clusters`,
   `Schedule a Call`).
2. **`home-features`** (735px) — `TRUSTED BY LEADING AI TEAMS` over a logo **marquee**
   (`home-features__logos--marquee`, with a `marquee reverse` second row), then
   "Hyperbolic makes building and running AI hyper simple" and the three-pillar summary.
3. **`home-cards-section`** (1272px) — the product proper: "Deploy Affordable GPU Clusters, On
   Demand." Contains the page's only `<video>` (`loop muted autoplay`, inside
   `card__image__wrapper`) showing **"Creating Your Instance"** — the product doing the thing.
4. **`whoItsFor`** (1392px) — "We provide affordable GPU access for those at the edges of AI."
   Three audiences down the right column (AI Natives / Researchers / Compute Providers), each with
   its own CTA, against a **pinned line-art figure on the left** that changes per audience.
5. **`home-stats`** (768px) — "High-Performance Infrastructure." Four claims that scroll in:
   `250K+ Engineers`, `Minutes, Not Weeks`, `Zero Quota Limit`, `No Long-Term Lock-In`.
6. **`home-testimonials`** (734px) — "Hear from the humans using Hyperbolic." Named-customer quotes.
7. **`useCases`** (841px) — "What teams build on Hyperbolic." Six numbered items `01`–`06` in a
   two-column grid, against a large dithered botanical illustration.
8. **`latestUpdates`** (486px) — three dated posts (Aug 10 2026, Jul 23 2026, Jun 12 2026).
9. **`faq-traditional`** (427px) — "The basics, answered." Its header is the page's **only
   `position: sticky`** element (130px tall).

The arc: *claim → who already trusts it → what it is → who it's for → what it delivers → who says so
→ what gets built → that it is alive → objections.* Proof is placed twice, early (logos) and late
(testimonials), with the product demonstration between them.

## 7. Motion grammar

**Libraries in the DOM:**
- **Lenis** — confirmed: `<html class="lenis">`. Smooth scroll is the substrate.
- **GSAP** — confirmed by markup, not by a global: five elements carry `data-gsap` with JSON payloads
  (`{"x":0,"y":"10%"}` on `home-stats__media`; `{"x":0,"y":"30%"}` on each of the four
  `home-stats__list--item`s). Bundled through Next, so `window.gsap` is absent — the attribute is the
  tell. **A declarative offset-driven reveal system: the component names its own entrance in markup.**
- **three.js:** not on `window`, but there is **1 `<canvas>`, webgl2**, full-viewport, body-level.
- **Videos: 1** (autoplay, loop, muted, in-card, the instance-creation clip). **Images: 134.**
  **SVG: 17.** No image sequence (only 3 numbered srcs — not a scrub).
- Not present: hamo, tempus, Framer Motion.

**Scroll-driven behaviour observed or inferred:**
- **Marquee** — two logo rows, one reversed, in `home-features`. CSS-driven, continuous.
- **Offset reveals** — the `data-gsap` `y: 10%` / `y: 30%` entrances on the stats block; the media
  element leads at 10% and the four claims follow at 30%, so the picture arrives before the numbers.
- **Pinned left column** in `whoItsFor` — the illustration holds while three audience blocks scroll
  past it on the right (visible in `-mid.png`, where the figure is mid-frame and the copy is mid-list).
- **Sticky FAQ header** — the one `position: sticky` on the page, 130px, holding "FAQs / The basics,
  answered." while the accordion runs under it.
- **Nav condensation** — the four nav links vanish on scroll; the two CTAs stay fixed.
- **CSS keyframes:** only two animation names exist page-wide — `gradient` and `pulse`. That is the
  entire ambient-motion budget.
- **`will-change: transform`** is the single declared hint; 33 transformed elements at rest.

**What is deliberately still:** the type. Nothing on this page splits characters, scrambles, or
scrubs a headline. No cursor follower. No horizontal section. No page-transition curtain. No
parallax on the body copy. The nine sections stack, plainly, and the reading is never interrupted.

**The ONE motion moment that carries the page:** the **hyperboloid in the hero** — a live WebGL
wireframe of the ruled surface the company is named after, rotating on its own clock, doing no work
except being the logo at full scale. Everything else on the page is a fade-up.

## 8. Commerce / the ask

Two CTAs, repeated with escalating specificity, never more than one screen from the reader:

- **Header (fixed, all the way down):** `Schedule a Call` (outlined) + `Get Started` (filled violet).
- **Hero:** `Deploy GPU Clusters` (filled violet) + `Schedule a Call` (outlined).
- **Per audience:** `Launch GPU Instance` (AI Natives), `Start an Experiment` (Researchers),
  `List Your GPU Capacity` (Compute Providers).
- **Stats block:** `Deploy GPUs`.

**Loudness:** violet fill on exactly one button per screen, everything else outlined or plain. The
verbs are the point — *Deploy, Launch, Start, List, Schedule*, never "Learn more" as the primary.
**Each audience gets its own verb.** Intercom launcher is present bottom-right.

## 9. Rhythm

- **9 sections, 8,419px total.** Longest is `whoItsFor` at 1,392px; shortest is the FAQ at 427px —
  a **3.3x** span, so the page visibly breathes.
- **Grid:** `--layout-columns-count: 16`, `--max-width: 1440px`, `--layout-margin-large: 12px`.
  Contained content, full-bleed art: the illustrations and the WebGL canvas bleed off the left edge
  while the copy holds a strict right-hand column. That split — **art unbounded, text bounded** — is
  the page's whole spatial signature.
- **Spacers are tokens:** `--spacer-medium: 120px`, `--spacer-large: 160px`. Two values, not fifty.
- **Where it goes quiet:** `latestUpdates` (486px) — three dated lines, no art, no CTA. The page
  exhales once before the FAQ.
- **Footer:** black ground (`rgb(0,0,0)`) — the only dark region on the site, after 8,000px of grey.
  Socials (X, LinkedIn, YouTube, GitHub), Contact, and a Pages column.

## 10. THE BEST PART for Micah

**The pinned-figure / scrolling-audience column from `whoItsFor` — three audiences, one held image,
one distinct verb each.**

Structurally it is: a left column that holds a single piece of art in place, and a right column that
scrolls through three named audiences, each with a mono eyebrow, one sentence of promise, three
sentences of mechanism, and **its own CTA verb**. `AI NATIVES → Launch GPU Instance`.
`RESEARCHERS → Start an Experiment`. `COMPUTE PROVIDERS → List Your GPU Capacity`.

Why it fits Micah exactly:
- **It is the three-packages problem, solved.** Three fixed-price packages are three audiences.
  Today they are three cards competing for one glance; this pattern gives each one a full screen of
  attention, in sequence, without a tab, an accordion, or a pricing table.
- **It costs one image.** Not three. The left column holds *one* thing while three blocks pass it.
  Micah has one photograph of himself and nine hand-drawn book pages — this pattern needs precisely
  one of them, held, and it will read as deliberate rather than thin.
- **The verb-per-audience rule is free and it is the actual mechanism.** "Get started" three times
  is one offer stated thrice; "Launch / Start / List" is three offers. Micah's equivalent —
  *Buy the book / Book the audit / Start the engagement* — costs nothing but the decision to write
  three different verbs, and it changes more on the page than any other single edit available here.
- **The reveal system is copyable as-is.** `data-gsap='{"x":0,"y":"30%"}'` on the block, media at
  10% and copy at 30%, so the picture lands before the claim. Two numbers, declared in markup. This
  is one GSAP call over `[data-gsap]`, and it is entirely within the one-signature-motion budget if
  it replaces rather than joins an existing entrance.

Second-best, and nearly free: **the mono eyebrow + `01`–`06` ordinal grid** in `useCases`. Six
short capability statements, numbered, two columns, no icons, no illustration inside the grid. Micah
has seven receipts with names and numbers — that is `01` through `07` in exactly this frame, and it
needs no assets at all.

## 11. THE TELL

**The custom typeface, the WebGL hyperboloid, and the dithered botanical illustrations. All three
are budget, not mechanism.**

- The display face (`kh`) is drawn for this client. That is a five-figure line item in a
  brand-identity engagement. Do not chase it — the *behaviour* is copyable (one display face, tight
  negative tracking, caps confined to the h1) with any well-cut retail face.
- The hero hyperboloid is a bespoke WebGL build of the company's own monogram. It works because the
  company is *named* Hyperbolic — the geometry and the name are the same object. Micah has no such
  object, and a generic WebGL blob in its place would be exactly the "countless other upstarts"
  problem Studio Freight diagnosed. **A commissioned mark rendered live is not a pattern; it is a
  budget.**
- The dithered/posterized botanicals (visible in `-late.png`) are commissioned illustration in a
  proprietary treatment. Micah's ban on illustration and stock is correct and this does not
  contradict it — his nine hand-drawn pages already are the artifact these illustrations are
  imitating. **He has the real version of the thing this site paid for.**

Also budget, quietly: **the logo marquee**. `TRUSTED BY LEADING AI TEAMS` over two rows of client
marks presumes you have marks. Micah has no logos and one anonymous quote — the marquee is not
available to him, and faking it is out of the question. The *replacement* is section 6's named
testimonial block, which needs names, not logos; his seven receipts have names.

## 12. Screenshots

All at 1440x900 unless noted, cookie/Intercom overlays suppressed by injected CSS (no consent given):

- `hyperbolic-top.png` — first screen (hero + hyperboloid + `TRUSTED BY LEADING AI TEAMS`)
- `hyperbolic-mid.png` — ~35% (2,947px): `whoItsFor`, pinned figure left, audiences right
- `hyperbolic-late.png` — ~70% (5,893px): `useCases` 01–06 grid + dithered botanical
- `hyperbolic-390.png` — mobile 390x844, first screen (h1 drops to 42.9px)

Directory: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/client-work/`
