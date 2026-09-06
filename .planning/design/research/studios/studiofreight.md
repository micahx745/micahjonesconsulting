# Studio Freight — teardown

Fetched 2026-09-05. Slug `studiofreight`. Kind: studio.

## 1. Fetch proof
- `https://studiofreight.com/` — HTTP **200** (curl `-L`, 171,816 bytes), Playwright `response.status() === 200`.
- `<title>` = **`Studio Freight`** (exact, no suffix).
- Also fetched: `/work/` → 200, `<title>` = `Work | Studio Freight`; `/work/la-marzocco` → 200, `<title>` = `La Marzocco | Studio Freight`; `/info` → 200, `Info | Studio Freight`; `/contact` → 200, `Studio Freight`.
- Stack: Nuxt (`/_nuxt/*`), Tailwind utilities compiled in, `_payload.json` hydration.

## 2. Type system (from the CSS)
Only **three** font files are preloaded and only three families are ever declared in `@font-face` (39 inline `@font-face` blocks, all repeats of these three):

```
/fonts/publico-text-mono-roman.woff2      -> publico-text-mono-roman
/fonts/publico-text-mono-semibold.woff2   -> publico-text-mono-semibold
/fonts/jjannon-regular.woff2              -> jjannon-regular
```

Two systems live in the CSS, and only one of them is actually loaded.

**(a) The live system** (`Symbol.BaojJKts.css` / `ALink.BdlGF7Lf.css`, scoped `data-v-*`, and inlined per page). A named step scale — uppercase on every Publico step, lowercase on every JJannon step:

| class | family | size | letter-spacing | line-height | case |
|---|---|---|---|---|---|
| `.display` | publico-text-mono-roman | `clamp(126px, max(21px + 13.125vw, min(-18px + 15.8333vw, 286px)), 286px)`; **210px** fixed at ≤899px | `-2.88px` | 80% | uppercase |
| `.h1-pr` | publico-text-mono-roman | `clamp(104px, ...8.3333vw..., 184px)`; 144px ≤899px | `-2.88px` | 80% | uppercase |
| `.h2-pr` | publico-text-mono-roman | 64px (a clamp with 0vw slope — a fixed step written as a clamp) | `-1.28px` | 80% | uppercase |
| `.h3-pr` | publico-text-mono-roman | 42px fixed | `1%` | 116% | uppercase |
| `.h3-ps` | publico-text-mono-**semibold** | `clamp(36px, ...4.5833vw..., 64px)` | `1%` | 116% | uppercase |
| `.h3-jj` | jjannon-regular | `clamp(36px, ...4.5833vw..., 64px)` | `0` | 116% | **none** |
| `.h4-jj` | jjannon-regular | 26px | `0` | 124% | none |
| `.h4-ps` | publico-text-mono-semibold | 26px | `0` | 124% | uppercase |

Measured live: home `h1` "Moving Missions Forward" computes to `jjannon-regular / 42px / letter-spacing normal / line-height 48.72px / text-transform none`. Case-study `h1` "LA MARZOCCO" computes to `publico-text-mono-roman / 210px / uppercase`. Work-index `h1` (an animated word, caught mid-type as `EXPER|`) computes `publico-text-mono-roman / 64px / -1.28px / uppercase`.

So: **JJannon (a Jannon/Garamond-lineage old-style serif) is the display voice for sentences; Publico Text *Mono* is the display voice for names and labels** — a monospaced serif, uppercase, tracked tight-negative at the big steps and positive `1%` at the small ones. That inversion (mono-serif for the label layer, proportional serif for the human sentence) is the whole type idea. Weights in use: 400 everywhere, 600 only on `.h4-ps`. No sans-serif is loaded at all.

**(b) The dead system** (`entry.CjzddFcg.css`, `:root`): `--font-family-primary:"Portrait Text", serif` and `--font-family-secondary:"Graphik", sans-serif`, with a full parallel scale (`--font-size-xl` 3rem → 3.625rem → 4.5rem, `--font-size-primary` 1.8125 → 2 → 2.25rem, title-lg 1.5 → 1.625 → 1.75rem, title-sm/paragraph 1.12rem, eyebrow 1rem, cta .875rem, meta .75rem; `--letter-spacing-xl` and `-primary` `-.02em`, eyebrow/cta `-.01rem`, meta `-.04rem`; line-heights 1 / 1.05 / 1.05 / 1.2 / 1.35 / 1.3 / 1 / 1). **Neither Portrait Text nor Graphik is loaded by any `@font-face` or link on any page fetched** — those steps fall back to the browser's serif/sans. It is a previous design's token set left in the bundle.

Uppercase use: the menu-overlay nav (`HOME WORK INFO NEWS AEON CONTACT`), all `-pr`/`-ps` steps, project names on case pages. Monospace: yes — but a mono *serif*, used for display, never for body.

## 3. Palette (from `entry.css` `:root`)
```
--color-black:#000        --color-white:#fff
--color-off-white:#f8f8f7 --color-off-black:#140700   <- warm, near-brown black
--color-mid-white:#d0d0c8 --color-mid-black:#5e5855
--color-grey-10:#1d1d1d   --color-grey-30:#4c4c4c
--color-grey-60:#7a7a7a   --color-grey-80:#ccc  --color-grey-97:#f7f7f7
--color-brian-orange:#ff7600
--color-html:#f8f8f7
```
Themes are attribute-switched, not media-queried: `[theme=light]` → bg `#f8f8f7`, fg `#140700`; `[theme=alt]` → bg `#fff`, fg `#000`; `[theme=dark]` → bg `#140700`, fg `#fff`. Buttons invert per theme (`--color-button-background` / `-foreground` swap). Measured body background on home, work index and case page: `rgb(254,253,252)` — a slightly warmer off-white than the token, applied above it.

Counts in the compiled Tailwind layer: `rgb(0 0 0/…)` ×20, `rgb(230 230 230/…)` ×16, `rgb(255 255 255/…)` ×4, `rgb(196 206 211/…)` ×2, `rgb(16 16 16/…)` ×1. Stray hexes in the inline page CSS: `#dadada` ×2, `#f9f9f9`, `#0000001f`, `#fefcfb52`, `#9acd32` ×1, `#514c49` (a form border).

**Accent: `#ff7600`, named `--color-brian-orange` after a person.** Occurrence count in `entry.css`: **1** — the declaration itself. It is never consumed. The site is **achromatic in practice**: every colour on screen comes from client photography, and the chrome is off-white and near-black only.

## 4. Composition of the home first screen
`document.documentElement.scrollHeight` = **900** at a 900px viewport. **The home page does not scroll.** It is one screen, and that is the site's opening argument.

Total copy on it, in order: `Home` · `Work , Info , News , Aeon` · `Contact` · **`Moving Missions Forward`** · `IG / LI` · `Studio Freight` · `©2026 / Terms`.

The assertion is **three words**, dead-centre of the viewport, JJannon at 42px, sentence case — the only sentence on the page.

Around it: **26 project thumbnails** scattered on the off-white ground in a loose, deliberately gappy mosaic. Columns of unequal height, wide empty gutters, one thumbnail hanging off the top-right corner, whole cells left blank so the centre stays clear for the line. No captions, no titles at rest.

Nav pattern: **corners plus a centred spine.** Crest mark (a horse-and-freight logo) top-left; `• Home` left-of-centre with a dot marking the current page; `Work, Info, News, Aeon` as a **comma-separated run of four** right-of-centre; `Contact` alone top-right. Footer row pinned to the bottom edge: `IG / LI` left, `Studio Freight` centre, `©2026 / Terms` right. Six destinations, all above the fold, all in one ~14px mono-serif line. A `Menu` overlay (clip-path reveal) carries the same six in uppercase.

**Is the work the page? Completely** — the home is 26 pieces of work and three words.

## 5. How work is shown
- `/work/` is a **grid ⇄ list toggle** (a `Grid / List` control in the header). Page height 5,501px; 32 `<img>`, **0 `<video>`**.
- Above the grid, a numbered taxonomy filter: `01 AI & Technology` · `02 Crypto & Web3` · `03 Culture & Media` · `04 Ecommerce & Consumer` · `05 Finance & Capital` · `06 Logistics & Production` · `07 Services & Hospitality` · `08 Other Categories`. Two-digit ordinals, always.
- Every tile's caption is **name + two-part sector**, comma-joined: `IYO AI, Ecommerce` · `La Marzocco Consumer, Food/Drink` · `Path Robotics AI, Manufacturing` · `Pelé Foundation Culture, Ecommerce` · `Perplexity Comet AI, Platform`. 29 projects listed.
- Rendered tile sizes are **deliberately unequal**: 702×481, 464×354, 226×292, 105×105 — landscape, portrait and near-square in the same grid. That is what makes the home mosaic read as a wall rather than a table.
- A case page (`/work/la-marzocco`, 5,662px, 18 images, **2 videos**, 0 canvas, 0 sticky): full-bleed-inset photography with generous white margins, dark-ground plates alternating with light ones, then `Info` — roughly 450 words of prose in five paragraphs — then `Receipt`, then `Services`, `Labels`, `Links`, `More`, `Contact`.
- **Zero projects appear before prose on a case page; about 29 appear before any prose on the site.** Prose exists only on `/info` and inside a case.

## 6. The path to business
- Nav: `Contact` in the top-right corner of every page, and the last item in the menu overlay.
- Case-page foot: **`Contact` / `Work with us`**. Work-index foot: **`Contact` / `WORK WITH US →`** (uppercase, arrow). Those are the exact CTA words.
- `/contact` is a form headed **`Inquire`**, button **`Submit`**. Fields: `Your name*`, `Your email*`, `Company name*`, `Project description*`, `How did you find us?` — plus a honeypot input named `website`. **No budget dropdown. No calendar. No pricing anywhere on the site.**
- Below the form, an **FAQ that routes the wrong inquiries away** by address: `jobs@` for portfolios ("Please use \"Job Inquiry: Role\" as the subject line"), `press@` ("Looking to say mean things? Right this way please."), `hello@` for collaborations. Then two blocks that are pure personality and no business: **Food recommendations** (restaurants in Columbus, NYC, Mexico City, LA, Margate) and **Book recommendations** (design / history / business / wisdom / book club). Then `Capabilities: Download / View` — the deck is a download, not a meeting.

## 7. Motion vocabulary
- **Lenis** — present and mounted (`class="lenis"` wrapper, `data-lenis` attribute). Smooth scroll is the only scroll library.
- **GSAP: absent.** `window.gsap` false; zero `gsap` occurrences in the home HTML. **three.js: absent** (`window.THREE` false). **`<canvas>`: 0** on home, work index and case page. **WebGL: 0. Marquee: 0.** **`position: sticky`: 0 elements** on all three pages measured — nothing pins.
- Videos: 0 on home, 0 on the work index, 2 inside a case study.
- Page transitions use the **native View Transitions API**, styled in CSS: `::view-transition-group(*)`, `::view-transition-old(root)` / `::view-transition-new(root)` running named `oldPage` / `newPage` keyframes on `--view-transition-easing: cubic-bezier(.5,.3,0,1)`. The menu uses `clip-path .3s` with `transform .3s` on the inner grid.
- The easing library is unusually deep for a site this quiet: `--spring-fast` (.667s), `--spring-common` (.667s), `--spring-bounce` (.833s), `--spring-fast-bounce` (1s), `--spring-slow-bounce` (1.167s), `--easing-spring-elegant` (.58171s), `--ease-out-elastic` — all as stepped `linear()` curves. Spent on small things: the newsletter submit button runs `.2s opacity` plus `.8s transform var(--ease-out-elastic)`.
- Observed behaviour: the work-index heading **types itself** (captured mid-animation as `EXPER|`, cursor included). Home thumbnails animate in on load (`--tw-translate-y: 1% / 2% / 2.5%` utilities).
- **What is quiet:** no cursor follower, no parallax, no pinning, no horizontal gallery, no scroll-velocity skew, no hero video, no 3D. For a studio with this reputation, the restraint is the statement.

## 8. Rhythm
Home: **one section, one screen, no scroll** (`<section>` count = 1).
Work index: filter row → grid (5,501px) → contact block → footer.
Case: hero photograph → alternating full-bleed image plates, some on a black ground, some two-up → `Info` prose → `Receipt` → `Services` / `Labels` / `Links` → `More` (three sibling projects, names only) → `Contact` → footer.
Content is inset from the viewport edge with a consistent white margin on all four sides — even the "full-bleed" plates are framed, so the ground colour runs continuously behind the whole site like a passe-partout.
Footer: **no giant wordmark.** A single ~14px line — `IG / LI` · `Studio Freight` · `©2026 / Terms` — the same weight as the nav. Header and footer frame the page identically.

## 9. THE BEST PART
**The section named `Receipt`.**

On a case page the client quote is not headed "Testimonial" or "What they said." It is headed **Receipt** — a noun from the shipping metaphor that runs the entire studio (Freight; "Moving Missions Forward"; `/info` reads "We TRANSPORT our partners from where they are to where they want to be"). One quote, attributed with a full name and title (`— Ben Blake, Marketing and Creative Director`), placed *after* the prose and *after* the images, where it functions as the proof-of-delivery slip stapled to the job rather than as persuasion.

The transferable principle is two-part: **(1) name the proof section after the work's own metaphor, so the label does brand work while it does structural work; (2) put the proof last and size it like a footnote, so it reads as documentation rather than as a sales beat.**

**Legal for him: yes, and unusually well-fitted.** He already has seven receipts with names and numbers — that is literally a `Receipt` block per engagement, and this site demonstrates the pattern working with exactly one quote per page. His single anonymous testimonial line can sit under the same heading without pretending to be more than it is, because the heading frames it as a record rather than an endorsement. Nothing here requires a logo wall (Studio Freight shows none), a testimonial carousel, or invented proof.

Second steal, also legal: **`Capabilities: Download / View`** — his book is a downloadable artifact, and this site proves a studio can offer a document instead of a calendar link. Third: the **two-part comma caption** (`La Marzocco Consumer, Food/Drink`), which gives every project a sector without a paragraph and is the reason the work index reads as an index rather than a portfolio.

## 10. THE TELL
**The typewriter heading on `/work/`** — the h1 caught mid-animation as `EXPER|`, blinking cursor and all. On a site whose whole thesis is stillness (no pinning, no parallax, no canvas, a home page that refuses to scroll), a terminal-cursor type-on is the one gesture borrowed from a trend rather than from the studio's own logic — and it is the only place the site performs about itself instead of showing the work.

Runner-up tell, invisible to visitors but instructive: **the dead token layer.** `entry.css` still ships a complete `Portrait Text` / `Graphik` scale — sizes, letter-spacing, line-heights, and `.text-xl` / `.text-primary` / `.text-eyebrow` / `.text-cta` / `.text-meta` classes — for two fonts that are never loaded on any page. A previous design's system is riding along in the bundle. The lesson for a one-person site: when the type system changes, delete the old one, or the CSS starts lying about what the site is.

## 11. Screenshots
- Home (1440×900 viewport, full page, capped at 3 viewports): `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/studiofreight-home.png`
- Case study `/work/la-marzocco`: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/studiofreight-work.png`
- Extra, work index `/work/`: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/studiofreight-worklist.png`
