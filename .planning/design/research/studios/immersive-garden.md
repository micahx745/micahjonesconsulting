# Immersive Garden — teardown

Slug: `immersive-garden` · Kind: studio · Fetched 2026-09-05

> Note on quoting: this studio's own copy leans on vocabulary that this project's `copy-lint` gate bans (the tagline adjective, and the verb in its mission line). Those two words are elided below rather than quoted, and the pattern is itself a finding — see §10.

## 1. Fetch proof

- URL: `https://immersive-g.com/` — HTTP **200** (no redirect)
- `<title>Immersive Garden</title>`
- Also fetched: `/the-studio/` 200 `<title>The studio - Immersive Garden</title>` · `/the-studio/contact-us` 200 `<title>Contact us - Immersive Garden</title>` · `/projects/` 200 `<title>Projects - Immersive Garden</title>` · `/projects/louis-vuitton-1` 200 `<title>Louis Vuitton VIA - Immersive Garden</title>`
- Stack: Nuxt/Vue SSR (`__NUXT_DATA__`, scoped `data-v-*`), headless GraphQL CMS at `ig-cms-prod-*.ondigitalocean.app`.

## 2. Type system (from the CSS, `/assets/entry.CEhA1U0S.css`)

Three self-hosted `@font-face` families, all `font-weight:400`, all `font-display:swap`. No Google/Adobe link. No variable font, no second weight anywhere.

```
@font-face{font-family:PSTimes;              font-weight:400; src:PSTimes-Regular.woff/.woff2}
@font-face{font-family:HelveticaNeueRegular; font-weight:400; src:HelveticaNeue-Regular.woff/.woff2}
@font-face{font-family:HelveticaNeueLight;   font-weight:400; src:HelveticaNeue-Light.woff/.woff2}
```

- **Display + body prose = PSTimes** (a Times-like serif; stack `PSTimes, serif`). This is the surprise: the *serif* carries both headline and paragraph. Computed on the live page: `h1` / `[data-webgl-title]` = `PSTimes, serif`, **44px / 48.4px line-height (1.10), weight 400, letter-spacing normal**; `p` = `PSTimes, serif`, **22px / 30.8px (1.40)**.
- **UI / labels = HelveticaNeueRegular, sans-serif** (14px is the single most common size in the sheet — 28 declarations). `HelveticaNeueLight` is declared but used once. So: serif says the things, grotesque labels the chrome.
- Sizes are **viewport-proportional, not `clamp()`** — zero `clamp(` in 224KB of CSS. The scale is authored against a 1440 frame: `3.0555vw` (44px @1440), `2.9166vw` (42px), `1.9444vw` (28px), `1.5277vw` (22px), `1.1111vw` (16px), `.9722vw` (14px). Fixed px fallbacks sit beside them (58.52 / 55.86 / 37.24 / 34 / 29.26 / 23 / 20 / 14 / 13).
- **Letter-spacing is essentially unused**: exactly two declarations in the whole build, `-.01em` and `.01em`. No tracked-out uppercase labels.
- **`text-transform` appears only as `text-transform:none`** (20×, from the normalize reset). Nothing on this site is set in CSS uppercase. The wordmark "IMMERSIVE GARDEN" is uppercase because it is drawn as letterforms in the logo lockup, not styled.
- **No monospace.** `font-family:monospace,monospace` appears only in the normalize block for `code/kbd/samp`. Roman numerals (I–V) do the job a mono § code would do elsewhere.

## 3. Palette (from the CSS)

Hex counts across all seven stylesheets (223,919 bytes):

| hex | count | role |
|---|---|---|
| `#030303` | 57 | the ink — near-black, not `#000` |
| `#e8e8e8` | 39 | the ground — light warm grey, not white |
| `#ff0` | 20 | normalize reset only (`mark` element default) |
| `#90ee90` | 20 | normalize reset only |
| `#000` | 20 | normalize reset only |
| `#fff` | 1 | one utility |
| `#a6a6a6` | 1 | the single secondary grey (used for "Scroll down") |
| `rgba(0,0,0,0)` | 20 | normalize reset only |

Live computed: `body { background: rgb(232,232,232); color: rgb(3,3,3) }`. Body carries a class `bg--white`, and utility classes `bg--black` / `bg--grey` exist for mode swaps.

**There is no accent colour. Zero. The palette is achromatic by construction** — one ink, one ground, one grey. Colour enters *only* through project photography inside the media panels: in the scrolled capture, the single saturated object on a 1440×900 screen is a gold Cartier bracelet against a pink-blue sky, and every other pixel is grey plaster. That is the whole colour strategy: the work is the only thing allowed to be in colour.

## 4. Home first screen

Asserts **four words**. The first is an adjective meaning novel — the one this project's copy-lint bans — followed by "digital experiences studio." Centred, PSTimes 44px, mid-screen. Each word is its own animated span in the DOM.

- **Alignment: centred**, on a 12-column grid (`repeat(12,minmax(0,1fr))` at desktop, 8 at tablet, 4 at mobile).
- **Nav pattern: two items, total, sitewide.** The CMS ships exactly two nav entries — `{label:"Close", uri:"/"}` and `{label:"About", uri:"/the-studio/"}`. On the home screen only **"About"** is visible, top-right. Everything else is corner furniture on a fixed frame that never scrolls away: logo lockup (mark + "IMMERSIVE GARDEN") at mid-left, "Scroll down" in `#a6a6a6` at mid-right, "See all projects" bottom-left, a 6px sound-toggle dot bottom-right. No hamburger, no menu overlay, no "Contact" in the nav.
- **Is the work the page? No — the *ground* is the page.** The first screen is a full-viewport WebGL canvas rendering white plaster bas-relief: two birds mid-flight pressed out of the surface, a vine curling up the left edge. It is not a project; it is a made object standing in for the studio's craft. The work arrives on the second screen.

## 5. How work is shown

- **Home = an interleaved feed**, not a grid. 17 projects on the home page; 51 in the index (the footer link carries `data-after="(51)"` — the count is data-bound, rendered as a superscript on "See all projects").
- Each entry is a **rectangular media panel that bleeds off a screen edge**, plus a one-sentence caption in PSTimes 22px, plus title + a single category word (`Web Experience` / `E-Shop` / `Corporate`). No year, no client logo, no team credit, no metric.
- The captions are written, not templated: *"Explore our collaboration with Louis Vuitton on VIA, showcasing the Maison's Web 3 vision through its first digital trunk."* One sentence per project, always describing what the visitor will *do*.
- **Placement is a CMS-authored slot system.** The CSS exposes `.position__1`…`.position__10`, `.offsetX__left|right`, `.offsetY__center|negative|positive|…_small`, and `.align--center|center-left|center-right|left-right|right-left`, plus `.fontSize--large|small` and `layout--two_columns_lists`. An editor picks a slot and an offset per block, so no two projects land in the same place and no designer is in the loop. That is the real machine behind the "handmade" rhythm.
- **Prose before work: two sentences, total.** An "Our approach" line — "A global leader in groundbreaking digital design and strategy, we help forward-thinking clients achieve impact and growth." — appears *after* the hero and *before* project one. An "Our mission" line of eight words, about partnering with clients and helping their success, appears after project three. That is the entire About-on-the-home-page budget: 33 words across two interruptions in a 17-project scroll.
- **`/projects/` index** is a list keyed by discipline tags rather than titles: `Design, Experience, 3D` · `Design, Tech, Branding, Experience` · `Design, Champagne, Experience, 3D` (yes, "Champagne" is a tag — the taxonomy is allowed to be specific to one job).
- **Case page** (`/projects/louis-vuitton-1`): centred PSTimes headline, three lines, ~44px, generous leading — *"Launching Louis Vuitton's Web 3 Vision with an Immersive NFT Platform"*. The headline **is** the case study: verb-first, names the client, names the outcome. Below it one underlined link, `Launch website`. Right rail: `See backstage`. Top-centre: `Back`. Then full-bleed media, subtly warped/tilted by the WebGL layer. 22 `<img>`, 3 canvases, **0 `<video>` elements**, and **no metadata block at all** — no dates, no roles, no credits, no results section. The DOM's entire text content on that page is: `Back | to Home | See backstage | Launch website | See next project`.

## 6. The path to business

- **The nav never asks.** There is no "Contact" nav item. The ask lives in two places: the persistent footer, and the last slot of `/the-studio/`.
- `/the-studio/` is a five-chapter index numbered in Roman numerals, each with `cta="Discover"` and the legend **"Click to explore"**: **I** The Studio · **II** Our approach · **III** Services · **IV** Awards · **V** Clients. The page's one button sits below them and its markup is a two-state word swap — `.text__default` = **"Contact us"**, `.text__hover` = **"now"**. Hover changes the sentence.
- `/the-studio/contact-us` has **no form**. Zero `<input>`, `<select>`, `<textarea>`. The whole page is: the line **"Interaction begins with dialogue."**, then `inquiries@immersive-g.com`, `jobs@immersive-g.com`, `14 rue Claude Vellefaux, 75010 Paris, France`.
- The CMS field behind the footer contact block is named `contactTitle: "Work with us"`.
- Footer: `See all projects (51)` · the email as a `<button>` (copy-to-clipboard, not a `mailto:`) · the Paris postal address as a `<p>` · a `Newsletter` button that expands an inline form · X, Instagram, LinkedIn.
- **No pricing. No rate card. No budget dropdown. No calendar link. No "book a call".** The entire commercial funnel is one email address and a street address in Paris.

## 7. Motion vocabulary

Detected on the live page (`window` globals, isolated Playwright context, 1440×900):

- **`lenisVersion: "1.1.14"`** — Lenis smooth scroll.
- **`gsapVersions: ["3.12.5"]`** — GSAP.
- **`__THREE__: "151"`** — Three.js r151.
- Lottie: three 30×30 canvases on the logo (`logo__anim--in`, `--out`, `--click`) plus a 60×60 `circles` canvas.
- 1 full-viewport WebGL canvas (`.webglApp > canvas`, 1440×900). 39 `<img>`, **0 `<video>`**, no marquee, no ScrollTrigger global.

**The defining behaviour: the page does not scroll.** Measured before and after twelve 600px wheel ticks: `document.documentElement.scrollHeight` stays **900** and `window.scrollY` stays **0**, while the composition advances several screens. Scroll is intercepted by Lenis and spent entirely as a parameter into the Three.js scene and GSAP transforms. There is no native scrollbar, no scroll position, no scroll anchor.

Second defining behaviour: **the DOM text is invisible and the WebGL layer paints it.** The `<h1>` carries `data-webgl-title` and computes to `PSTimes 44px / #030303`, but `innerText` reads empty on the rendered page — the real glyphs are drawn into the canvas so they can be displaced, masked and lit with the plaster. The DOM copy exists for crawlers and screen readers; the visible type is a texture.

Other observed vocabulary: an intro loader that reveals the logo through an SVG `linearGradient` mask wiping left-to-right; a frame-stepped mask transition (`transition: mask-position var(--speed) steps(var(--mask-frames))`) — sprite-sheet animation rather than interpolation; a custom cursor (111 `cursor` references); `mix-blend-mode:multiply` used exactly once; `cubic-bezier(.4,0,.2,1)` at `.15s` as the standard UI easing (14 uses).

**What is quiet:** no parallax on body text, no horizontal gallery, no velocity skew on the type, no page-transition curtain, no autoplaying video, no sound by default (the dot is `Off` until clicked). All the motion budget is spent inside the one canvas.

## 8. Rhythm

Home: hero (1 screen) → "Our approach" statement → 3 projects → "Our mission" statement → 14 more projects → "See all projects" → footer. Roughly 20 movements, and only **two** of them are the studio talking about itself.

It goes quiet by going *empty*: whole screens are plaster and nothing else, with a single relief object off-centre and one 14px label in a corner. The full-bleed moments are the media panels, and they are the only full-bleed moments.

Footer: **no giant wordmark.** It is a modest four-column grid — projects CTA, email, postal address, newsletter + three social links — set in 14px HelveticaNeue. After a scroll made entirely of spectacle, the footer is a business card.

## 9. THE BEST PART

**One ground, one ink, and the only colour on the site comes from the work itself.** `#e8e8e8` and `#030303` and a single grey — 57 + 39 hex occurrences carrying the entire visual identity. Every saturated pixel on the page belongs to a client project. It makes the studio's own chrome read as a gallery wall, and it makes each thumbnail feel like an event without a single "featured" badge, gradient, or accent stripe.

**Legal for him: yes, entirely, and it is nearly free.** He already has a two-mode achromatic system (foyer `#F5EFE4`/`#1A1816`, theater `#0D0D0F`/`#EAE6DD`) and a single accent. The transferable rule is a discipline, not an asset: **let the artifacts be the only colour.** The hand-drawn book pages, the portrait, the product screenshots, the seven receipts — those carry every hue on the site, and copper drops back to structural duty (rules, focus rings, one underline) rather than decoration. No client logos needed; the media panels *are* the proof, and IG demonstrates that a page can persuade with zero logo wall.

The second, cheaper steal: **the case-study headline that is the whole case study.** "Launching Louis Vuitton's Web 3 Vision with an Immersive NFT Platform" — verb, client, outcome, one sentence, then a link and nothing else. He has named numbers (`$150K`, `14 practices`, `91% intake completion`) where IG has only client names, so his version of that headline is *stronger* than theirs, and it needs no invented proof.

Third: **the ask is one line and one address.** "Interaction begins with dialogue." plus an email. No form, no budget dropdown, no calendar — which is exactly the pattern his own rules already require.

## 10. THE TELL

**The trance.** The page refuses to scroll — `scrollY` never leaves 0 — so the visitor's scrollbar, their position, their browser's find-in-page, their ability to deep-link a spot, and their sense of how much is left are all gone. Combine that with a canvas that has swallowed the typography (`innerText` returns empty on the `<h1>`) and you have a site that is beautiful and unbrowsable: you cannot skim it, cannot copy a sentence out of it, and cannot tell a colleague to look at the third one down. It is the 2023-era WebGL-studio signature, and its cost is that a buyer in a hurry cannot get an answer out of the page.

Second tell: **the copy is agency boilerplate under couture typography.** The four-word tagline and the two statement lines are built from exactly the adjectives this project's own `copy-lint` list rejects — the write of this file was blocked twice for quoting them verbatim. The visual craft is at the top of the field and the language is interchangeable with fifty other studios. The lesson for a solo consultant is that the type system cannot carry the sentence; his named numbers do work these words cannot.

Third: the plaster-relief render — off-white sculpted material, soft directional light — is now the default "expensive studio" texture, and the birds-and-vine motif reads as stock 3D even though it is bespoke. Under his own rules it is banned anyway (no 3D, no illustration).

Fourth: `text-transform` never appears and `letter-spacing` appears twice, which is admirable restraint — but it means every label is the same 14px HelveticaNeue at the same weight in every corner, and after three screens the chrome stops reading as hierarchy and becomes wallpaper.

## 11. Screenshots

- `…/scratchpad/studios/immersive-garden-home.png` — 1440×900, home first screen (plaster birds, centred serif line, corner furniture).
- `…/scratchpad/studios/immersive-garden-home-scrolled.png` — 1440×900, home after 12 wheel ticks (the only colour on screen is inside one project panel).
- `…/scratchpad/studios/immersive-garden-work.png` — 1440×900, `/projects/louis-vuitton-1` (headline-as-case-study, `Launch website`, full-bleed media).

Full-page capture is not meaningful on this site: `scrollHeight` is 900 at every scroll position, so a `fullPage:true` screenshot returns exactly one viewport. The three viewport captures above are the honest substitute.
