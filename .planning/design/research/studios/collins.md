# COLLINS — wearecollins.com

Teardown, 2026-09-05. Slug `collins`, kind: studio (brand consultancy, NY/SF).

## 1. Fetch proof

- URL: `https://wearecollins.com/` — **HTTP 200**, 173,824 bytes of server-rendered HTML.
- `<title>` = `COLLINS` (verbatim; no tagline, no "Brand Agency | New York").
- Case page: `https://wearecollins.com/case-studies/bose/` — **HTTP 200** (the un-slashed
  `/case-studies/bose` returns **301**; trailing slash is canonical).
  `<title>` = `Bose | COLLINS`.
- Stack: Nuxt 3 SSR (`/_nuxt/*` chunk names, `_payload.json`). CSS read directly from
  `/_nuxt/entry.DXiaQ8c9.css` (46KB) plus six component sheets (Card, MuxVideoPlayer,
  HeadGroup, List, AppCarousel, Stories).

## 2. Type system (from the CSS, not from looks)

Two `@font-face` declarations. That is the whole system — no third face, no italic file,
no bold file.

```
@font-face{font-family:Portrait Text;src:local(...),url(../fonts/portrait-text-400.woff2)
           format(woff2);font-display:swap;font-weight:400;font-style:normal}
@font-face{font-family:Graphik;src:local(...),url(../fonts/graphik-400.woff2)
           format(woff2);font-display:swap;font-weight:400;font-style:normal}
```

- `--font-family-primary: "Portrait Text", serif` — **the display face.** Used for `.text-xl`
  and `.text-primary` only: the H1, the section deks, the overlay-menu nav items.
- `--font-family-secondary: "Graphik", sans-serif` — **the text/UI face.** Everything else:
  paragraph, eyebrow, CTA, meta, card titles, footer links.
- **Weight 400 only.** Every `font:` shorthand in the sheet reads `font:400 ...`. There is no
  second weight file on the wire. (`html{font-weight:500}` is declared and then never honored,
  because no 500 face exists — the browser resolves it to the 400 file.)
- **No monospace anywhere.** No mono-serif. No `font-feature-settings` beyond
  `"kern" on,"liga" on`, which is set on every text utility.

Scale — **fixed rem steps at three breakpoints; there is not a single `clamp()` in the sheet
(`clamp(` count: 0).** The whole ramp is eight named tokens:

| token | ≤767px | ≥768px | ≥960px | line-height | letter-spacing |
|---|---|---|---|---|---|
| `--font-size-xl` (display) | 3rem / 48px | 3.625rem / 58px | **4.5rem / 72px** | 1 | **-.02em** |
| `--font-size-primary` (dek) | 1.8125rem / 29px | 2rem | 2.25rem / 36px | 1.05 | -.02em |
| `--font-size-title-lg` | 1.5rem | 1.625rem | 1.75rem / 28px | 1.05 | **0** |
| `--font-size-title-sm` | 1.12rem | — | — | 1.2 | 0 |
| `--font-size-paragraph` | 1.12rem / 18px | — | — | 1.35 | 0 |
| `--font-size-eyebrow` | 1rem / 16px | — | — | 1.3 | -.01rem |
| `--font-size-cta` | .875rem / 14px | — | — | 1 | -.01rem |
| `--font-size-meta` | .75rem / 12px | — | — | 1 | **-.04rem** |

Confirmed live at 1440: computed H1 = `72px / 72px`, `letter-spacing: -1.44px`,
`font-weight: 400`, `text-align: center`, family `"Portrait Text", serif`.

**Display max is 72px.** For a studio of this reputation that is restrained — a quarter of the
viewport height, not half.

Two details worth stealing outright:
- The display utilities carry `margin-block:-.175em` — negative block margin to cancel the
  serif's leading so a 72px line optically sits on its box. Nobody does this and everybody
  should.
- Letter-spacing is **tightened on display (-.02em) and on the smallest labels (-.04rem)**,
  and left at exactly `0` on paragraph and on card titles. There is no positive tracking on
  this site. **Uppercase appears exactly once in the entire stylesheet** — a `.comingsoon`
  badge on a card, 11px. No uppercase eyebrows, no uppercase nav.

## 3. Palette (from the CSS)

Hex literals across `entry.css` + all six component sheets, with counts:

```
#fff      6    --color-white
#ff7600   2    --color-brian-orange   <- declared, NEVER REFERENCED anywhere
#000      2    --color-black
#f8f8f7   2    --color-off-white / --color-html   <- THE GROUND
#00f      2    (UA default, not authored)
#140700   1    --color-off-black      <- THE TYPE COLOR
#514c49   1
#d0d0c8   1    --color-mid-white
#5e5855   1    --color-mid-black
#1d1d1d   1    --color-grey-10
#4c4c4c   1    --color-grey-30
#7a7a7a   1    --color-grey-60
#ccc      1    --color-grey-80
```

- **Ground:** `#f8f8f7` on `html` (`--color-html`). Verified computed: `rgb(248,248,247)`.
  A paper white with a one-point green cast, not `#fff`.
- **Type:** `#140700` (`--color-off-black`). Verified computed body color `rgb(20,7,0)`.
  That is a **warm** near-black — 20R/7G/0B, a black with brown in it, chosen to sit under a
  serif.
- **Grey:** one secondary voice, `--color-mid`, which flips `#5e5855` (warm) on light grounds
  and `#d0d0c8` (warm) on dark. The `--color-grey-10/30/60/80` ramp is neutral and reserved
  for UI chrome (footer links, form errors).
- **Accent: there is none in practice.** The one chromatic token, `#ff7600`
  ("brian-orange" — presumably named for a person), is defined in `:root` and referenced
  **zero times** in any stylesheet on the page. The site is **achromatic**, and all color
  arrives from client photography inside the cards.
- Inversion is a two-token swap: `--color-background` / `--color-foreground` are reassigned
  per section between off-white and off-black. Buttons, close buttons and `--color-mid` all
  key off those two, so a section flips ground with one class.

## 4. Composition of the home first screen

The first screen asserts **three words**: `Rewrite your worth.` Centered, 72px Portrait Text,
alone above the fold with the wordmark. No sub-headline, no "we are a brand consultancy
that…", no scroll cue in the DOM.

- **Alignment: centered.** Computed `text-align:center` on the H1 and on the overlay nav.
  Centered symmetry is the whole compositional idea — it is a title page, not a dashboard.
- **Nav pattern: two elements, corners.**
  ```html
  <header class="app-header header--at-top"><nav class="header">
    <a href="/" aria-label="go to homepage" class="logo">[93x15 wordmark SVG]</a>
    <button class="menu-btn" aria-label="open menu" aria-expanded="false">[svg]</button>
  </nav>
  ```
  Wordmark left, hamburger right. **Zero visible nav items.** The real nav (Case Studies /
  Programs / Arts & Culture — three items) lives inside the overlay, set in the *display*
  serif at `--font-size-xl` (72px), stacked and centered. The menu is not a utility drawer;
  it is a second title page.
- **Grid:** 4 / 8 / 10 columns at 0 / 768 / 960. `--max-width` 768 → 960 → **1244px**.
  `--gutter-width: 1rem` fixed at every breakpoint. `--grid-padding` is
  `max(1rem, (100vw - 1244px)/2)` — the page centers itself rather than growing.
- **Is the WORK the page? No — and that is the studio's actual position.** Section order is:
  hero → **awards** ("8x Agency of the Year", AdAge x7 + D&AD, 2019–2026) → **Programs**
  ("Eleven ways we help brands find and command their unique premium") → **Case Studies**
  → **Arts & Culture** → contact → footer. The *offer* outranks the portfolio. A studio site
  leads with work; a consultancy leads with the named service ladder. COLLINS is telling you
  it sells programs and showing work as evidence for them.

## 5. How work is shown

- **Home:** a horizontal `AppCarousel` of cards — nine named clients before any prose about
  them: Bose, Robinhood, Target: up&up, Arcane, San Francisco Symphony, Primary, YouTube
  Gaming, Cadia, Muse Group. Plus four "stories": Red Hot x COLLINS, The House of Belonging,
  Hope as Defiance, WSCN x COLLINS. **14 `<img>`, zero `<video>`, zero `<canvas>` on the home
  document.** (A `MuxVideoPlayer.css` chunk ships, so video exists deeper in the site; the
  home page carries none.)
- Card title = client name only. The caption is the *program* they bought
  (Turnaround / Reposition / Premiumization), not the deliverable.
- **Aspect ratios** are per-card CSS variables (`aspect-ratio: var(--aspect-ratio)`, fed
  per-instance), with `1/1` and an `aspect-ratio:.8!important` override for the tall variant.
  Not one uniform tile grid — the cards are different shapes on purpose.
- **Hover, home cards:** `.card:hover .card__inner{transform:rotateX(-10deg)}` and, on press,
  `.card:hover:active .card__inner{transform:rotateX(0)}`. A 3D tilt away that flattens when
  you click. Physical, about 10 degrees, not a scale-up.
- **Hover, Programs list** — the smartest thing in the file:
  ```css
  ul:has(a:hover) .program{opacity:.4}
  ul:has(a:hover):before{opacity:1;transform:scale(1)}
  @supports (position-anchor:--thumb){ ul:before{ position-anchor:--thumb;
      bottom:anchor(bottom); border-radius:var(--border-radius); ... } }
  .program.hover{anchor-name:--thumb}
  ```
  Hovering any row **dims all eleven rows to 40%** and floats a thumbnail panel positioned by
  **CSS anchor positioning** against the hovered row. No JS. No mousemove listener. `:has()`
  plus `anchor-name` doing what studios normally hire GSAP for.
- **Case page (`/case-studies/bose/`):** H1 "Bose", dek "Helping a legacy brand find
  leadership." Then a metadata block — `Program: Turnaround / Reposition / Premiumization`,
  `Industry: Electronics`, `Stage: Enterprise` — then a truncated summary with
  **"Read the full story"** as a disclosure, then the long narrative, then **46 images and
  zero videos**, then a full credit list naming every individual on both sides (COLLINS team
  x15 by name, the typeface designer, the Bose client team x8 by name), then a cross-sell
  block ("Augments") back into the program ladder. 3,963px tall — a short case study by 2026
  standards.

## 6. The path to business

- One contact section, near the bottom of the home page, above the footer. Two lines:
  **`Work with us`** and **`info@wearecollins.com`**.
- The mechanism: the CTA is a **copy-to-clipboard swap** built in CSS as a two-layer grid
  crossfade —
  ```css
  a:hover .cta   {grid-template-columns:1px .6fr 1px; opacity:0; visibility:hidden}
  a:hover .email {grid-template-columns:1px 1fr  1px; opacity:1; visibility:visible}
  a:hover        {transform:scale(1.04)}
  ```
  Rest state reads `Work with us`; on hover the label *is replaced in place* by the address;
  on click it copies and the `[status=success]` attribute pins the third state,
  **`Email copied`**. Three states, one button, no modal.
- **No pricing.** No rate card, no "starting at", no engagement-size language in the markup.
- **No form for new business.** The only `<input>` on the page is the newsletter
  ("Keep up to date"), which has its own success state (`content:"Thank you!"`).
- **No calendar link.** No Calendly, no "book a call".
- The rest of the ask is done by the **Programs** ladder — eleven named engagements
  (Brand Refresh, Reposition, Expansion, Turnaround, Premiumization, Brand Creation,
  Brand Merger, Architecture/Restructure, Scale-Up, Value-Market Fit, Exit), each with a
  one-line pitch ("Don't Become the Best. Become the Only."). **That is the sales page**, and
  it sits above the work.

## 7. Motion vocabulary

Detected in the shipped bundle (`/_nuxt/BQi2lG-y.js`, 418KB) and confirmed against `window`
at runtime:

- `gsap` — **absent.** `lenis` — **absent.** `three` / WebGL — **absent.**
  `ScrollTrigger`, `Swiper`, `anime` — absent. Runtime probe
  `['gsap','Lenis','lenis','THREE','ScrollTrigger','Swiper','anime'].filter(k=>k in window)`
  returned `[]`.
- `<canvas>` count: **0.** `<video>` count on home: **0.**
- `scroll-behavior` on `html`: `auto`. **No smooth-scroll hijack.** No marquee. No cursor
  follower — nothing in the sheet reads mouse position.
- The bundle contains `startViewTransition` x5, `IntersectionObserver` x4, `matchMedia` x7,
  `requestAnimationFrame` x11. That is the entire motion budget.
- **Page transitions are the native View Transition API**, tuned in CSS:
  ```css
  @property --view-transition-duration{syntax:"<time>";inherits:true;initial-value:.45s}
  ::view-transition-group(*){animation-duration:var(--view-transition-duration);
                             animation-timing-function:var(--view-transition-easing)}
  ::view-transition-image-pair(root){background:#000}
  ```
  450ms, with the crossfade happening **over black**.
- A twenty-entry easing token library (`--ease-out-expo`, `--ease-out-quint`, a hand-authored
  `linear()` elastic, and `--easing-spring-elegant` with
  `--easing-spring-elegant-duration:.58171s`). The *vocabulary* is deep; the *usage* is nearly
  all `.25s`–`.8s` `var(--ease-out-cubic)` on color, opacity and transform.
- Hover motion is capped at `scale(1.04)`, `scale(1.05)` on the newsletter submit, and the
  `rotateX(-10deg)` card tilt. Nav links crossfade `.45s` in and `.7s` out — **asymmetric
  timing, faster to attend than to release.**
- **What is quiet: everything else.** No parallax, no pinning, no sticky sections, no
  scroll-velocity skew, no horizontal scroll-jack (the carousel is a carousel, not a hijacked
  page).
- One flaw, and it is a real one: `prefers-reduced-motion` appears **nowhere** in the
  stylesheet. Do not copy that.

## 8. Rhythm

- **Five `<section>` elements** on the home document. That is the whole page: hero, awards,
  Programs, Case Studies, Arts & Culture — then contact and footer.
- Page height 5,394px at 1440 wide — **exactly six viewports.** A studio site that lands under
  6,000px in 2026 is making an argument.
- `--section-padding` steps 3rem → 4rem → **5rem**; `--section-gap` 1.5rem → 3rem. Vertical
  rhythm is one token, changed twice.
- Every section opens with the same `hgroup`: a small Graphik eyebrow in `--color-mid`, then a
  serif dek at `--font-size-primary`, `max-width:500px`, `text-wrap:balance`. **The section
  header is a component, and it is the same component five times.** The variety comes from the
  card shapes below it, never from the headers.
- It goes quiet at the top (three words on a paper ground) and again at the contact block (two
  lines). The full-bleed moments are the carousels.
- **Footer: yes, the giant wordmark.** `.sword{font-size:5rem; align-self:end;
  justify-self:center; grid-area:symbol}` — an 80px centered COLLINS mark closing the page,
  with the three nav links and three socials in 16px Graphik above it.

## 9. THE BEST PART

**The offer ladder outranks the portfolio, and every case study is filed under the program the
client bought.** Eleven named engagements with one-line pitches sit *above* the work on the
home page; the Bose page's first metadata row is not "Branding, Identity, Motion" but
`Program: Turnaround / Reposition / Premiumization`. The work is not a gallery — it is
**evidence for a named product**. That is why "Rewrite your worth." can be three words and
still land: the page underneath it says exactly what you are buying.

Second, and mechanically stealable today: **the three-state hire button.** `Work with us` →
hover reveals the address in place → click pins `Email copied`. It is a CSS grid crossfade,
roughly fifteen lines, and it replaces a contact form.

**Legal for Micah? Yes — both, entirely.** Neither needs a client logo, a testimonial, or a
number he does not own.
- The ladder is his own service definition. He can name three or four engagements the way
  COLLINS names eleven, give each a one-line pitch in his voice, and file each of his seven
  receipts under the engagement it was. The receipts already carry names and numbers; this
  gives them a shelf.
- The Bose credit block — **every individual named on both sides** — is the honesty move he is
  uniquely positioned to copy. A solo consultant naming the client contact he worked with
  (with permission), or absent that naming himself as the whole team, is a stronger signal
  than a logo wall, and it is the one form of proof that cannot be faked.
- The copy-to-clipboard email button is pure CSS and needs no proof at all.
- The centered three-word title page with an 80px footer wordmark is also fully available and
  costs nothing but nerve.

## 10. THE TELL

**"8x Agency of the Year" as the second screen — an award shelf placed above the work.** Eight
badges (AdAge x7, D&AD x1, 2019–2026) rendered as a row of SVG marks with years, before a
single project. It reads as the trophy-case reflex every agency site of the last decade has
had, and it is the one section of this page that is about COLLINS rather than about the buyer.
For a solo consultant it is doubly wrong: he has no awards, and manufacturing an equivalent
(badge row, "as featured in", counter stats) would be exactly the invented proof the brief
forbids. The rest of this site earns attention by being useful; that band asks for it.

Runner-up tell: `--color-brian-orange:#ff7600` declared in `:root` and referenced zero times —
a dead token shipped to every visitor. Cosmetic, but it is the fingerprint of a design system
that outgrew its own file.

## 11. Screenshots

- Home: `…/scratchpad/studios/collins-home.png` (1440x2700, 1440px viewport, capped at three
  viewports of a 5,394px page).
- Work: `…/scratchpad/studios/collins-work.png` (1425x2700, `/case-studies/bose/`, 3,963px
  page).
