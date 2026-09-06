# sharplink — client build teardown

Slug: `sharplink` · Fetched 2026-09-05 · Screens at
`…/scratchpad/client-work/sharplink-{top,mid,late,390}.png`

---

## 1. Fetch proof

- **Live URL:** https://www.sharplink.com/ — **HTTP 200** (curl `-L`, final URL unchanged).
- **`<title>`:** `Sharplink : Home`
- **Second probe:** Playwright at 1440x900, `status 200`, `title "Sharplink : Home"`,
  `document.documentElement.scrollHeight = 8664`.
- **Stack observed:** Nuxt (`/_nuxt/entry.D7b4BisY.css`, hashed chunk graph),
  **Storyblok** CMS (123 `storyblok` occurrences in the delivered HTML; DOM components
  named `.storyblok-video`), Nuxt Fonts self-hosting (`/_nuxt/_fonts/*.woff2`).

**Studio attribution — NOT CONFIRMED. Report this as unverified.**
- The site carries **no studio credit**: no `humans.txt` (404), no "built by"/"designed by"
  string anywhere in the delivered HTML, no credit line in the footer (footer ends
  `© 2026 Sharplink Inc. ALL RIGHTS RESERVED`).
- **No pointer page exists.** `https://studiofreight.com/work/sharplink` → **404**.
  `https://darkroom.engineering/work/sharplink` → **404**.
- Studio Freight's own work index (`https://studiofreight.com/work`, title
  `Work | Studio Freight`, fetched) lists 29 projects — IYO, Esther, Lightfield, Air Space
  Intelligence, Thesis, Battleface, RRE, La Marzocco, Brex, Perplexity Comet, Psyop,
  Applause, Irys, **MetaMask Rewards**, Tabs, Path Robotics, Bad Boys, Republic Note,
  Argus Labs, Morph, zkPass, Hyperbolic, Pelé Foundation, 0G, Legend, Telemetric,
  Patrick Mahomes, Orderful. **SharpLink is not among them.**
- Circumstantial only: SharpLink is chaired by Ethereum cofounder Joseph Lubin and states
  it is "partners with Consensys" — the same orbit as Studio Freight's MetaMask Rewards
  build. The tooling fingerprint (Lenis + GSAP/ScrollTrigger + three.js + tempus/hamo) is
  the darkroom.engineering / Studio Freight house stack. **That is a resemblance, not a
  credit.** Nothing quotable says who built it.
- **What a case-study page SAYS they did:** not observable — no such page found.

---

## 2. The client and the product

SharpLink Inc. (Nasdaq: **SBET**) sells *a share of stock* — it is a publicly traded
Ethereum treasury company, and the page's whole job is to convince an investor that
owning SBET is a better way to hold ETH than holding ETH or an ETF.

---

## 3. First screen

- **Asserts:** `Ethereum with an Edge` — **four words**, 88px Archivo Regular,
  `letter-spacing: -2.64px`, two lines, hard left, top-left quadrant.
- **Alignment:** left-aligned type against a right-of-centre object. Headline, two
  buttons, then a *long* gap, then the positioning sentence pinned to the bottom-left
  ("Sharplink is the institutional-grade Ethereum treasury platform giving investors a
  smarter, more productive access vehicle to ETH.") and a news card bottom-right. The
  first screen carries **four** distinct content blocks with a deliberately empty middle.
- **What the hero IS:** a looping **video of a 3D render** —
  `shrp_homepagehero_30fps.webm`, 2160x1620, `loop muted`, `paused:false`, played into a
  fixed `.video-bg` behind the type, with a `.bg-overlay` scrim. A chrome/aluminium
  Ethereum octahedron dissolving into machined hardware, wrapped in thin white technical
  callout rectangles and dashed leader lines. Not WebGL for the hero — **prerendered video**.
  (three.js *is* in the bundle, 130 refs + `WebGLRenderer` + `precision highp` shader
  strings, and three `<canvas>` elements exist including `.logo-canvas` at 1440x469.)
- **Nav:** **five** items — ABOUT · INVESTORS · OPPORTUNITY · NEWS · ETH DASHBOARD —
  top-right, `position: fixed`, transparent background, rendered as a row of individual
  frosted grey chips with a sixth square blue arrow chip on the end. Logo top-left. Not
  hidden at 1440. At 390 it collapses to a `MENU` chip + hamburger; the drawer is
  `data-lenis-prevent`.
- Above all of it: a full-width dark cookie bar in 13px uppercase Archivo Narrow, which
  offsets the page via `--cookie-offset: 48px` on `<html>`.

---

## 4. Type system (from the CSS)

**Two faces, one superfamily.** Self-hosted woff2/woff via Nuxt Fonts, `font-display: swap`,
with metric-matched Arial fallbacks (`size-adjust: 82.5481%`, `ascent-override: 125.3815%`).

| Role | Family | Evidence |
|---|---|---|
| Display + body | **Archivo** | 800 `font-family:Archivo` declarations; `body { font-family: Archivo, "Archivo Fallback: Arial", sans-serif }` |
| Labels / eyebrows / dates / data | **Archivo Narrow** | 480 declarations |

- **Weights shipped:** 400 / 500 / 700, roman and italic, per `@font-face` blocks. In use
  on the home page: **400 for every display headline**, 500 for labels and buttons.
- **Display sizes (computed, 1440):** h1 `88px`, section h2 `68px`, sub-h2 `44px`,
  small h2 `24px`. At 390 those become `52px` / `44px` / `24px`. Fluid, roughly
  `clamp`-driven — the h1 ratio 88:52 is a 1.69x range.
- **Tracking on display:** negative and *proportional to size* —
  88px → `-2.64px` (**-0.03em**), 68px → `-1.36px` (-0.02em), 44px → `-0.44px` (-0.01em),
  24px → `-0.24px` (-0.01em). Line-height sits at 1.02–1.28, tightest at the top.
- **Tracking on labels:** every eyebrow is Archivo Narrow **13px / 500 /
  `letter-spacing: 1.04px` (+0.08em) / `text-transform: uppercase`** — one label style,
  used everywhere (`PROUDLY LISTED ON`, `COMPANY NEWS`, `TOTAL ETH HOLDINGS`,
  `STAKING REWARDS`, `TRANSPARENCY`, `COLLABORATION`, `INSIGHTS FROM THE BLOG`).
- **Mono:** **none.** No monospace family is loaded or declared anywhere. The "technical"
  register is carried entirely by condensed-uppercase-with-tracking, not by a mono face.
- **Uppercase:** confined to that one 13px label style plus button text. Headlines are
  sentence case.

---

## 5. Palette (from the CSS variables)

Declared tokens (all from `entry.css` / `colors.css`), each generated as a full 0–95%
alpha ramp:

| Token | Value | Role |
|---|---|---|
| `--surface-background` | `#f7f7f5` | the ground; `body` computes to `rgb(247,247,245)` |
| `--black` / `--theme-fg` | `#000` | type colour on light |
| `--off-white` | `#f3f3f3` | type colour on dark |
| `--brand-blue-primary` | **`#0e76ff`** | the accent |
| `--brand-blue-secondary` | `#99c5ff` | accent tint |
| `--brand-beige` | `#f4efe9` (hsl 33 33% 94%) | warm surface |
| `--grey-primary` / `--grey-secondary` | `#676767` / `#a9a9a9` | secondary type |
| `--stroke-black-subtle` / `--stroke-off-white-subtle` | `#00000026` / `#f3f3f326` | **15% rules — the grid** |
| `--utility-error` | `#ff0e52` | forms only |
| gradient stops | `#c4d5e7`, `#fdfbf7` | the fixed sky |

**Raw hex counts across all CSS:** `#000` ×5, `#fff` ×2, `#f7f7f5` ×2, then exactly one
declaration each of `#ff0e52`, `#fdfbf7`, `#f4efe9`, `#f3f3f3`, `#c4d5e7`, `#a9a9a9`,
`#99c5ff`, `#676767`, `#0e76ff`. **Thirteen literals in the whole stylesheet** — every
other colour is a var or an alpha step of one.

**Ground:** there is no per-section background. There is a *fixed* full-viewport
atmosphere: `.gradient-bg-light { background: radial-gradient(ellipse 100% 130% at 50% -30%,
#c4d5e7 45%, #fdfbf7 85%, #f7f7f5); position: fixed; height: 100lvh; z-index: 0 }`,
with parallaxing dark sheets (`.gradient-bg-dark`, `--parallax-scale: 1.3`) laid over the
top and bottom of the document. The page reads black at the hero and cream at the news
block **without a single section owning a colour**.

**Is the accent the client's brand colour doing the work?** Yes and barely. `#0e76ff` is
SharpLink's blue and it appears in maybe four places on the whole home page: the square
arrow chip on the primary CTA, the ~4px square tick marks at grid-line origins, the link
colour, and one headline word in the Galaxy blog card. Accent frequency is *low single
digits*. The chrome renders are greyscale. Everything else is black, off-white, and a
15% rule.

---

## 6. Narrative arc

Eight sections, ~8,660px at 1440.

1. **`.home-hero.wrapped-hero`** (900px) — "Ethereum with an Edge", two CTAs, the ETH-render
   video, positioning sentence, one dated news card. *The claim.*
2. **`.home-productivity`** (912px) — eyebrow `COMPANY NEWS` / h2 **"Pioneering Productivity"**
   + "By combining native protocol rewards, ecosystem incentives, and institutional-grade
   custody…". Then the live proof strip: `TOTAL ETH HOLDINGS`, `STAKING REWARDS` (rendering
   `data not available` on my fetch — live-data panel), three numbered claims
   `01 Staked since day one` / `02 Enhanced yield incentives` / `03 Trackable day-by-day`,
   and a `MORE IN ETH DASHBOARD` link. *The receipts.*
3. **`.home-propositions`** (1,539px) — `PROPOSITIONS` / **"The Stack for Stacking Ethereum"**,
   then five labelled propositions stacked down the left column against one pinned 3D
   object on the right: `LEADERSHIP` Built by Proven Pioneers · `OPERATIONS` Treasury as an
   Operating System · `EQUITY` Public Markets as an Advantage · `TRANSPARENCY` Committed to
   Real-time Clarity · `COLLABORATION` Partnered with the Best. *The argument.*
4. **`.home-banner`** (600px) — full-bleed dark break: "Ethereum for Everyone, Engineered to
   Compound." + both CTAs again, over a canvas-drawn logotype. *The restatement.*
5. **`.opportunity-wrapper`** (1,978px) — "The Opportunity of a Generation" + a second looping
   render (`shrp_homeopportunity_chrome.webm`, 1200x1600) and four numbered market
   arguments (active productive capital / secures the onchain economy / scales with real
   usage / structural tailwinds), with one `LEARN MORE`. *The market.*
6. **`.section-news`** (756px) — `INSIGHTS FROM THE BLOG` / "Latest News", dated cards,
   `Visit our Blog`. *The proof of life.* Ground has gone fully light by here.
7. **`.section-faq`** (694px) — "FAQ / got more questions?" — seven numbered accordions that
   do the actual selling ("100% of staking yield accrues to shareholders. We do not skim
   rewards.") plus `REACH US`. *The objection handling.*
8. **Footer** — `Sign up to stay sharp:` + `SIGN UP`, the NASDAQ/SBET line repeated, nav,
   socials, `Back to top`.

The shape: **claim → live number → five reasons → restatement → market → activity →
objections → subscribe.** The hard ask (buy the stock) is never made; every CTA is a
softer one.

---

## 7. Motion grammar

**Libraries actually in the shipped bundles** (grep over the 32 `/_nuxt/` assets):

| Library | Evidence |
|---|---|
| **Lenis** | 23 refs in `CqVY-T_H.js`, `window.lenisVersion`, `data-lenis-prevent` handling — and **`<html class="lenis">` on the live DOM**. Confirmed running. |
| **GSAP + ScrollTrigger** | 61 `gsap` / 24 `ScrollTrigger` refs in `5OliWYBk.js`; plugin names present: `ScrollTrigger` ×5, `Observer` ×9, `Flip` ×3, `SplitText` ×1 |
| **three.js / WebGL** | `WebGLRenderer` ×33 in `CS-g-qVf.js` (+3 in `CqVY-T_H.js`), `gl_FragColor` ×34, `precision highp` ×15, `createShader` |
| **tempus** | 7 refs — the studio's rAF scheduler |
| **hamo** | 1 ref |
| **embla** | 6 refs in `BsfV3BYv.js` — carousel, used for news |
| Motion One / framer-motion primitives | 49 refs in `DMqakE6x.js` |

- **Canvases:** 3 (`398x216`, `560x765`, `.logo-canvas 1440x469`). None of them is the hero.
- **Videos:** 3 elements, 2 distinct sources, both `loop muted` and playing.

**Scroll-driven behaviour observed / inferable:**

- **A fixed atmosphere, not scrolling backgrounds.** `.gradient-bg-light` is
  `position: fixed; height: 100lvh` — the sky never moves. Everything else scrolls past it.
- **Parallax gradient sheets.** `.gradient-bg-dark` carries `--parallax-offset` /
  `--parallax-scale: 1.3` on a `translateY(calc(var(--parallax-offset) * -1))` with
  `will-change: transform`, and a `.bottom` variant that is the same sheet rotated 180°.
  JS drives that offset from scroll position, and that alone is what turns the page from
  black to cream.
- **Pinned object + advancing copy** in `.home-propositions`: the 3D render holds while
  five propositions pass it, each **fading from ~25% to 100% opacity as it reaches
  reading position** (visible in `sharplink-mid.png` — "Public Markets" faint, "Real-time
  Clarity" mid, "Partnered with the Best" full white).
- **Word/letter reveal.** `TextReveal.css` ships `.text-reveal { opacity: 0 }` with
  `.word` and `.letter` children `display: inline-block` — a SplitText-style staggered
  entrance on headlines, base state hidden.
- **Sticky:** `header` (fixed), the gradient layers, `.storyblok-video.video-bg`,
  `.bg-overlay`, `.video-container`, the cookie banner. **13 fixed/sticky elements, and
  almost all of them are background machinery, not content chrome.**
- **Deliberately still:** no marquee (zero `marquee` selectors), no horizontal scroll
  section, no cursor follower, no scroll-jacking, no page-transition curtain, no
  velocity skew. The FAQ, the news grid, the footer and the entire type system are
  motionless. The 3D never responds to the pointer.

**The ONE motion moment:** *the page's own daylight changes.* You begin at black under a
technical render and end in cream — and it is done by parallaxing two gradient sheets
across one fixed radial sky, with no section ever declaring a background colour. Every
other effect on the page is subordinate to that single continuous tonal move.

---

## 8. Commerce / the ask

There is no cart. The ask is **investor attention**, and it is stated three ways:

- **Primary, hero + repeated in the dark banner:** `EXPLORE THE DASHBOARD` — 13px Archivo
  Narrow uppercase, tracked, on a near-white chip, with a **`#0e76ff` square arrow chip
  bolted to its right edge**. Square corners (`border-radius: 0px`). The only saturated
  blue on the first screen.
- **Secondary, directly beneath, same size, grey chip, no arrow:**
  `SEE INVESTOR INFORMATION`.
- **Tertiary, scattered:** `MORE IN ETH DASHBOARD`, `LEARN MORE`, `Visit our Blog`,
  `Read more`, `REACH US`, and in the footer `Sign up to stay sharp:` → `SIGN UP`.

Loudness: **quiet**. The CTAs are 13px in an 88px headline environment. Nothing is
sticky, nothing pulses, there is no floating button. The compliance line
("SharpLink is proudly listed on **NASDAQ** under the trading symbol **SBET**") appears
three times and does more selling than any button.

---

## 9. Rhythm

- **8 sections**, 8,664px at 1440 — roughly 9.6 viewports. Section heights:
  912 / 900 / 1,539 / 600 / 1,978 / 756 / 694 / footer.
- **Full-bleed vs contained:** the *media* is full-bleed (hero video, gradient sky, the
  dark banner) and the *type* is contained on a visible column grid. An SVG
  `.layout-grid` component draws dashed vertical rules at
  `rgba(243,243,243,0.15)` on dark and `rgba(0,0,0,0.15)` on light — the same 15% token,
  inverted — with tiny `#0e76ff` square ticks at the origins (`sharplink-late.png`).
- **Where it goes quiet:** two places, hard. (a) The **middle of the first screen** — the
  headline is top-left, the positioning sentence is bottom-left, and there are ~400
  vertical pixels of nothing but render between them. (b) The **whole right two-thirds
  below "Latest News"** — one news card sits in column 1 and columns 2–4 are empty
  gradient. That emptiness is the luxury signal, not the render.
- **Footer:** dark, three-part — an email capture headline set as a *sentence*
  ("Sign up to stay sharp:") with the field inline, then a Navigation / Social two-column
  link block, then the legal strip repeating the NASDAQ line with `Back to top` on the right.

---

## 10. THE BEST PART for Micah

**Take the fixed atmosphere.** Not the render, not the WebGL — the structural move:
*no section on this page declares a background colour.* One `position: fixed;
height: 100lvh` radial gradient sits at `z-index: 0` behind everything, and two gradient
sheets parallax over it. The result is a page that travels from ink to paper as one
continuous move, so a section never "starts" — the light just changes.

Micah's site already has exactly the two grounds this needs: foyer paper `#F5EFE4` and
theater obsidian `#0D0D0F`. Today they are route-switched by a `data-mode` attribute.
The mechanism worth borrowing is doing the same swap **within one scroll** on a long page
— the `/playbook` or a services page that opens dark under the book's hand-drawn page and
lands on cream at the three fixed-price packages. Implementation cost is one fixed
gradient div, one CSS custom property driven from a scroll listener, and
`will-change: transform`. No GSAP required, no library added, and it survives
`prefers-reduced-motion` by simply resolving to the finished frame.

Two smaller mechanisms in the same box, both free:

- **The one label style.** Archivo Narrow 13px / 500 / `+0.08em` / uppercase, used for
  *every* eyebrow, date, stat caption and button on the site. Micah already has JetBrains
  Mono cleared as the "narrow third" — the lesson is that **one** label style at **one**
  size, repeated fifteen times, is what makes a page feel systematic. SharpLink proves you
  do not need a mono face to get the technical register; tracked condensed uppercase does it.
- **The 15% rule as a single token.** `--stroke-black-subtle: #00000026` and
  `--stroke-off-white-subtle: #f3f3f326` are the *same* 15% alpha inverted, drawn as
  dashed SVG lines that turn the layout grid into visible structure. For a consultant with
  seven receipts and no logos, a visible column grid is free architecture — it makes a page
  with little content look designed rather than empty.

And the copy move: the FAQ is where the actual argument lives ("100% of staking yield
accrues to shareholders. We do not skim rewards."). Seven numbered questions, each
answering a real objection with a number. Micah has seven receipts with names and
numbers — that is the same shape.

---

## 11. THE TELL

**The two prerendered 3D films.** `shrp_homepagehero_30fps.webm` at 2160x1620 and
`shrp_homeopportunity_chrome.webm` at 1200x1600 are studio-rendered CGI: a machined
aluminium Ethereum octahedron that dissolves into hardware, and a glass-and-chrome
cylinder with a floating chain link inside it. That is a 3D artist plus a render farm
plus revision cycles — five figures of asset production before a line of CSS was written,
paid for by a Nasdaq-listed company's marketing budget. There is no cheap version. Do not
attempt it with stock 3D, an icon kit, or an AI image generator — the House Lights
constitution bans all three, and a fake version of this reads instantly as fake.

Secondary tell: the **live ETH holdings / staking-rewards panel**, which needs a real data
pipeline (it rendered `data not available` on my fetch, which is itself instructive — the
number is genuinely live, not baked).

The thing to notice is that **stripping both tells leaves the page almost intact**. Kill
the videos and you still have: a fixed gradient atmosphere, one Archivo/Archivo-Narrow
pair, thirteen hex literals, a 15% dashed grid, one 13px label style, five propositions
against a pinned column, and 400px of deliberate emptiness under the headline. That
residue is the borrowable site.

---

## 12. Screenshots

| File | What it shows |
|---|---|
| `sharplink-top.png` | 1440x900 first screen — black ground, 88px headline, the ETH-octahedron render, two CTAs with the blue arrow chip, bottom-left positioning sentence + Nasdaq lockup, bottom-right dated news card |
| `sharplink-mid.png` | ~35% — the propositions pin: chrome cylinder held on the right, three propositions on the left at ascending opacity, dashed grid rules crossing, dark banner edge entering at the bottom |
| `sharplink-late.png` | ~70% — the ground has become cream; "Latest News" at 68px, one blog card in column 1, three empty columns, `#0e76ff` square ticks on the dashed grid |
| `sharplink-390.png` | mobile first screen — headline drops to 52px, CTAs go full-width-ish, nav collapses to `MENU` + hamburger, the render fills the lower two-thirds |
