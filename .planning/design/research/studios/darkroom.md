# darkroom.engineering — teardown

Slug: `darkroom` · Kind: studio · Researched 2026-09-05

---

## 1. Fetch proof

- URL: `https://darkroom.engineering/`
- HTTP status: **200** (`curl -s -o /dev/null -w "%{http_code}"` → `200`)
- `<title>`: **`where things get developed - darkroom.engineering`** (confirmed twice: `grep -o "<title>"` on the fetched HTML, and `page.title()` in a live Playwright session)
- Also fetched: `/work` → `Work - Projects That Speak for Themselves - darkroom.engineering`; `/contact` → `Contact - Let's Build Something That Lasts - darkroom.engineering`; `/work/looped` → `Looped - darkroom.engineering`.
- Note: `/work/ecotrak` returns **404** — only two projects have real case-study routes (`/work/looped`, `/work/badomens`). Everything else on the index is an outbound "LIVE SITE ↗".
- Stack, from the DOM: Next.js App Router, Turbopack, immutable `_next/static` chunks. Self-hosted fonts, no Google/Adobe font link.

---

## 2. Type system (from the CSS, not from looks)

Three self-hosted `@font-face` families in `_next/static/immutable/chunks/1qlf-7l8edf8h.css`. All licensed, none from a CDN:

| CSS family | File | Weight | Role |
|---|---|---|---|
| `therma` | `ASTherma_BoldCondensed-s.p.*.woff2` | 700 | **Display.** Bold condensed grotesque. Every h1/h2. |
| `sauce` | `ASModule2VF-s.p.*.woff2` | 400 (variable) | Secondary/UI. Present but rarely visible on the home. |
| `mono` | `ReplicaMonoLLWeb_Regular-s.p.*.woff2` | 200 | **Text.** Replica Mono. This is `body`'s computed font. |

Every face declares a metric-matched `local(Arial)` fallback with `ascent-override` / `descent-override` / `size-adjust` — zero CLS on swap is engineered, not hoped for.

**The unusual part: `body` is the monospace.** Computed on the live page: `font-family: mono, "mono Fallback", ui-monospace, …; font-size: 16px`. There is no body serif or body grotesque. The site is display-condensed plus mono, and nothing else. `sauce` is the third wheel.

**Sizes.** There is no `clamp()` anywhere. The whole scale is a single fluid formula against a design-width variable:

```css
:root { --device-width: 375; --device-height: 852; --columns: 4;
        --gap:  calc(((8  * 100) / var(--device-width)) * 1vw);
        --safe: calc(((8  * 100) / var(--device-width)) * 1vw);
        --header-height: calc(((28 * 100) / var(--device-width)) * 1vw); }
@media (min-width: 800px) {
  :root { --device-width: 1440; --device-height: 816; --columns: 8;
          --gap: calc(((16 * 100) / var(--device-width)) * 1vw);
          --safe: calc(((16 * 100) / var(--device-width)) * 1vw);
          --header-height: calc(((22 * 100) / var(--device-width)) * 1vw); } }
```

Every `font-size` is then `calc(((N * 100) / var(--device-width)) * 1vw)`. The N values in use: **8, 10, 12, 14, 16, 20, 32, 40, 48, 72, 80, 86, 120, 270**. One breakpoint (800px), one grid (4 → 8 columns), everything else scales with the viewport forever. Nothing is pinned in px.

**Measured on the live page at 1440:**
- h1 `WHERE THINGS GET DEVELOPED` — `therma`, **200px**, `letter-spacing: -10px` (−0.05em), `text-transform: uppercase`.
- h2 (`OREO & BTS`, `IBICASH`, `WHAT CLIENTS SAY`) — `therma`, **120px**, `letter-spacing: -6px` (−0.05em), weight 700.
- Body and labels — `mono`, 16px and below.

**Letter-spacing values in the whole stylesheet** (nine, total): `-1.33333vw`, `-.694444vw`, `-.05em`, `-.03em`, `-.02em`, `-.01em`, `0`, `.05em`, `.1em`. Negative on display, positive only on the small mono labels. The two vw values are the giant footer and marquee wordmarks.

**`text-transform: uppercase` appears exactly once in the CSS** — yet the whole site reads as caps. The rest of the caps are typed into the content as caps (the JSON payload carries "A SAMPLING OF THINGS WE'VE BUILT"). Worth noting: they treat caps as an editorial decision per string, not a global rule.

---

## 3. Palette (from the CSS)

Hex literals in the main stylesheet, by count: `#000` ×7, `#fff` ×5, `#e71419` ×4, `#e5e5e5` ×4, `#c20510` ×2, `#390205` ×2, `#262626` ×2, `#00d9ff` ×2 (dev overlay only), plus one-offs (`#888`, `#666`, `#dc2626`, `#111827`, `#e5e7eb`) that belong to that overlay, not the design.

Six named tokens and nothing else:

```css
--color-black: #000; --color-white: #fff; --color-light-grey: #e5e5e5; --color-dark-grey: #262626;
--color-red: #e71419; --color-dark-red: #c20510; --color-burnt-red: #390205;
--color-hover: color-mix(in oklab, var(--color-secondary) 83%, transparent);
```

Every one is re-declared inside `@supports (color: lab(0% 0 0))` as a `lab()` value — a wide-gamut upgrade path baked into the token layer.

**The real move is that there is no single palette — there are five named themes, and sections swap between them:**

| `[data-theme]` | primary (ground) | secondary (type) | contrast |
|---|---|---|---|
| `light` | `#fff` | `#000` | `#e5e5e5` |
| `dark` | `#000` | `#fff` | `#262626` |
| `simple` | `#000` | `#e71419` | `#390205` |
| `red` | `#e71419` | `#000` | `#c20510` |
| `nasa` | `#fff` | `#e71419` | `#e5e5e5` |

The `:root` default is `light` (black on white). **The live home ships `simple`** — computed `body` background `lab(0 0 0)` (black), computed `body` color `lab(49.9 73.4 57)` (= `#e71419`). Red terminal type on black.

**Is it achromatic?** In practice yes, plus one hue. Two neutrals and exactly one chromatic family (red, in three tints). There is no second accent anywhere. All the *colour* on the page belongs to the client work — the studio's own chrome is red, black and white only.

---

## 4. Composition of the home first screen

At 1440×900 the first screen is:

- A **1px-ruled top rail** running the full width: a decorative glyph block at far left, `DARKROOM.ENGINEERING` centred, then `WORK · ABOUT · CONTACT` right-of-centre, then another glyph block at far right. Header height is `22/1440` — a **22px** rail. Everything sits inside a boxed 1px hairline, like terminal window chrome.
- Roughly 230px of pure black nothing.
- `WHERE THINGS GET DEVELOPED` — 200px condensed caps, **one line, full bleed edge to edge**, left-aligned at the 16px safe margin and running out to the right margin. Four words. That is the entire assertion.
- Below it, a four-column band of small mono text:
  1. `[ DARKROOM ], NOUN` (col 1)
  2. `1. A LIGHTPROOF ROOM FOR DEVELOPING PHOTOGRAPHS. / 2. A STUDIO ENGINEERING CREATIVITY INTO REALITY.` (col 2) — a dictionary entry as positioning
  3. the pitch (cols 5–7): *"you've got a product that needs to be fast, polished, and built to last. we're the studio that gets it there — design, engineering, and system thinking working together so you ship with confidence, not compromise."* (**39 words**)
  4. a boxed `MANIFESTO →` button, far right
- Then the first project (`OREO & BTS`) begins bleeding in at ~y=640 — **the first case is above the fold.**
- A fixed bottom rail: `BECOME AN OPEN SOURCE SPONSOR`, flanked by window-chrome glyphs.

**Assertion word count: 4** (the headline) — 39 more in the sub-paragraph, and a 12-word dictionary definition. Alignment is a strict 8-column grid, everything left-aligned within its column, nothing centred except the wordmark in the rail.

**Nav pattern:** top bar, **3 items** (`WORK`, `ABOUT`, `CONTACT`) plus the wordmark as home. No hidden menu, no hamburger at desktop, no CTA in the nav. The CTA lives in the footer.

**Is the work the page?** Nearly. The hero is one screen; project #1 starts before the fold ends. Ten `<section>`s total, 8609px of scroll — and three of those sections are projects, occupying the top third of the document.

---

## 5. How work is shown

**Home:** three full-bleed project bands. Each is a viewport-wide autoplaying `<video>` (4 videos, **0 `<img>` elements** after hydration — the home is entirely video and type) with the project name in 120px `therma` overlaid at the left margin, hairline-ruled top and bottom. Aspect ratio is not fixed: the media fills the viewport width and is cropped to roughly 16:9 / 21:9 bands. **No captions, no client name, no year, no role on the home tiles — just the name.** Three projects, then the first prose: *"A SMALL SAMPLE, JUST THREE BUILDS WE LIKED FOR DIFFERENT REASONS. IF YOU WANT THE FULL STACK (LIVE LINKS, CASE STUDIES, THE WEIRD STUFF), HEAD OVER TO THE WORK PAGE."* plus `ALL WORK →`.

**So: three projects before any prose.** The pitch paragraph in the hero is the only prose above them.

**/work index:** 19 projects (`ALL[19]`), a `GRID —— LIST` toggle, and per-project tag chips (`BRAND`, `SAAS`, `AI`, `WEB3`, `ECOMMERCE`, `GAME`, `FRAMER`, `MOBILE`, `HEALTH`, `PLUGIN`, `VENTURE CAPITAL`). 15 videos, 103 images, 1 canvas, 12760px tall.

**The hover and scroll behaviour is the signature.** Tiles do not load as photographs. They render first as **red-on-black 1-bit ASCII/dither placeholders** — the media reduced to the site's own two colours. As the tile enters the viewport (and under the cursor) it resolves into the real full-colour video. Verified: a screenshot before scroll shows the OREO tile as scattered red glyphs; after scrolling and hovering, the LORE tile below it is a full-colour gold video while the OREO tile above is still red glyphs. Media is *quarantined into the palette* until you engage with it.

Each row also carries `LIVE SITE ↗` and, for the two that have one, `CASE STUDY →`.

**Case study (`/work/looped`):** 13829px, 4 sections, 9 videos, 12 images. Opens with a two-line 120px headline, then a **four-column metadata strip — `YEAR / CLIENT / TYPE / ROLE`** (`2024 · POLYAI · GAME · FRONT-END DEVELOPMENT / CREATIVE DEVELOPMENT / MOTION & INTERACTIONS`). Then the brief in the client's own problem language, then `LIVE SITE ↗`, then alternating media and prose. It names collaborators in the body ("in collaboration with Studio Freight and Glenn Catteeuw") and names the tech ("a custom game engine built on Three.js").

---

## 6. The path to business

- **Header:** nothing. Three nav items, no CTA.
- **Home body:** a boxed `MANIFESTO →` in the hero (not a sales CTA), `ALL WORK →` after the projects, `ALL TOOLS →` after open source.
- **Home, penultimate section:** *"We bring brands and interfaces **to life** with code that runs smooth and scales right."* then *"We've built for teams who care about craft. If you want engineers who speak design fluently and sweat the details that make the difference, we should talk."* → **`Get in Touch →`**
- **Footer, every page:** a solid red-filled box, top-left of the footer, reading **`LET'S TALK →`**. Beside it, three live clocks: `ARG 09:52 PM / CET 02:52 AM / WET 01:52 AM` — the distributed team as a fact you can read off the wall, not a claim.
- **`/contact`:** a scrolling marquee `contact:// if you've got a vision, we've got questions`, then the headline **`GOT SOMETHING WORTH BUILDING? SKIP THE SMALL TALK.`** Then: *"WHETHER IT'S A BADASS PRODUCT IDEA OR A BROKEN THING THAT NEEDS FIXING, WE'RE HERE TO BUILD. GIVE US THE RAW DETAILS, AND WE'LL TAKE IT FROM THERE."* Then a form, plus an escape hatch: *"FOR GENERAL INQUIRES, MOVIE OR RESTAURANT RECOMMENDATIONS, YOU CAN REACH OUT VIA EMAIL."* → **`EMAIL →`**

**Exact CTA words, in order of appearance:** `Let's talk →` (footer, every page) · `Get in Touch →` (home, penultimate) · `EMAIL →` (contact) · `Start a project` (in the agent/llms text layer only).

**Pricing:** not shown, not hinted at, no ranges, no "starting from." **Contact pattern:** form plus email fallback. **No calendar link anywhere.** No budget dropdown visible in the flow.

**Proof section (`WHAT CLIENTS SAY`)** — three quotes, all **anonymously attributed**:
- *"nothing you guys were exceptional and brilliantly clear + prescriptive on what was possible vs. not"* — **Past Client**
- *"clearly everyone is very senior and action oriented without needing much guidance from us"* — **Web3 Partner**
- *"Seeing what you've built already and the people you've worked with — this is the biggest selling point."* — **Design & Development Partner**

Alongside that, a plain **`Clients`** list sits in the capabilities block: nine company names set as running text (Argus Labs, Every, Ecotrak, Framer, Griflan, Milkinside, Studio Freight, Viture, and one venture fund) — **names as text, no logo wall.** Same treatment for `Technologies` (Next.js, Contentful, HubSpot, Vercel, Lenis, R3F, Three.js, GSAP, Sanity, Framer, Figma) and `Awards / Features` (Awwwards, CSS Design Awards, Muzli, FWA). Three lists of plain words where most studios put three rows of images.

---

## 7. Motion vocabulary

**Detected in the DOM / RSC payload:**
- **Lenis** — mounted at root: `{"root": true, "options": {}, "syncScrollTrigger": true}`. 24 references in the HTML.
- **GSAP** — a component receives `{"gsap": true}`; `ScrollTrigger` appears once, wired to Lenis via `syncScrollTrigger`. So: smooth scroll drives the pin/scrub layer, one scroll authority.
- **Tempus** (their own rAF scheduler) and **Hamo** (their own hooks) — both referenced.
- **three.js / R3F: zero matches on the home.** WebGL appears only in the marketing copy. `<canvas>` count on the home after hydration: **0**. On `/work`: **1** (the ASCII/dither renderer).
- **Video count:** 4 on the home, 15 on `/work`, 9 on `/work/looped`. `<img>` on the home after hydration: **0**.
- **`marquee` as a word: 0** — but marquees exist, built by hand (`/work` and `/contact` each repeat their strapline **10 times** in the DOM: `work:// designed to be built, built to be used.` ×10).

**Described behaviours observed:**
- A **preloader with a 0→100 numeric counter** and a stack of images cycling behind it, ~6–9s to settle. The count sits at the far right margin, not centred.
- **Smooth scroll** (Lenis) throughout.
- **Section theme swapping** — `[data-theme]` flips ground and type as you pass boundaries; that is the page's main transition.
- **Horizontal marquees** on the `/work` and `/contact` heros, with heavy horizontal-scanline distortion on the type.
- **Progressive media reveal** — ASCII/dither to real video on enter and hover (§5).
- **A distorted giant wordmark** in the footer: `DARKROOM` at ~`-1.33vw` tracking, sliced by ~40 horizontal scanlines that offset each band. It reads as a CRT signal, not as a logo.
- 20 easing curves are declared as `:root` variables (`--ease-in-quad` through `--ease-in-out-circ`, plus a custom `--ease-gleasing: cubic-bezier(.4,0,0,1)`). A full motion vocabulary as tokens.

**What is quiet:** no cursor follower, no parallax on the hero, no page-transition wipe, no scroll-jacked section snapping, no 3D. The hero is **static** — 200px of type on black that does not move at all. Every moving thing is either the client's video or a marquee that loops forever and never demands attention.

---

## 8. Rhythm

**10 `<section>`s, 8609px** (≈9.6 viewports at 900px tall). The sequence:

1. Hero — static type on black, ~640px of near-empty ground before the headline.
2–4. Three full-bleed project bands (media edge to edge, name overlaid, hairline rules).
5. `WHAT CLIENTS SAY` — three anonymous quotes.
6. `TOOLS WE BUILD AND USE. NOW YOURS TOO.` — a numbered tab list (`01.` Satus / Lenis / Hamo / Tempus) with a description panel.
7. `We bring brands and interfaces to life…` — the pitch plus `Get in Touch →`.
8. `Studio capabilities` — four plain word-lists: Services (9), Clients (9), Technologies (11), Awards / Features (4).
9. `Activity Log` — **a dated, reverse-chronological shipping log**: `2026/02/06 · Open Source · Satus hardened — Zod validation, proxy.ts, typed env, integration registry, 432 tests`. ~22 entries, each tagged (`Open Source`, `Infrastructure`, `Product`, `Experiment`, `Stealth`, `Migration`, `Internal`). One reads `2026/01/20 · Stealth · [REDACTED] — iOS app. More soon.`
10. Footer.

**Where it goes quiet:** the hero (a 640px black void above a single line), and the gap between the third project and the quotes — the `/work` index does this too, leaving ~350px of black between the intro paragraph and the first tile. Emptiness is used as the pause between full-bleed media, so the video never touches the prose.

**Where it goes full-bleed:** all three project bands, and the footer wordmark.

**Footer pattern: yes — a giant wordmark.** `DARKROOM` filling the full 1440 width, scanline-sliced, red on black. Above it, a four-column link table (`NAV` / `OPEN SOURCE` / `SOCIAL` / `INSPIRATION`), the `LET'S TALK →` box, and the three timezone clocks. The `INSPIRATION` column is five links titled `IMPORTANT VIDEO`, `A MEANINGFUL SONG`, `GREAT BOOK BTW`, `AMAZING GAME`, `A GOOD MOVIE` — unlabelled personality, no explanation. Bottom hairline: `©2026 DARKROOM.ENGINEERING` left, `ALL RIGHTS RESERVED` right.

---

## 9. THE BEST PART

**Media is degraded into the site's own palette until you engage with it.**

On `/work`, every project thumbnail first renders as a red-on-black 1-bit ASCII/dither field. It is unmistakably *an image*, but it is made of the site's two colours and nothing else. Only as the tile enters the viewport and takes the cursor does it resolve into the real full-colour video. The consequence: the studio's own page is monochrome red-on-black end to end, and **the only colour anywhere on the site is the client's work.** The work isn't decorated by the design — it's the payoff of it.

**Is it legal for Micah?** Yes, and it is the highest-value thing here, because the mechanic is about restraint, not about assets. He has real artifacts — hand-drawn book pages, a photograph of himself, product screenshots, seven receipts with names and numbers. Those are the only full-colour objects he owns. A House Lights version:

- Theater case-study heroes ship first as a **halftone or duotone reduction in copper on obsidian**, resolving to the real screenshot on enter. One CSS filter chain, or a pre-rendered second asset — **no WebGL, no canvas, no new library**, so it stays inside the existing motion budget.
- Same for the book's hand-drawn pages on `/playbook` and the portrait on `/about` when it lands.
- This gives the site a second *reveal* without a second *signature motion*: it is a material property of images, not a behaviour the page performs at the visitor. That is the same argument that cleared `<WallChart />`.

**Second-best, and simpler to ship:** the **`Activity Log`** — dated, tagged, reverse-chronological, one line each, including a `[REDACTED]` entry. It is proof-of-shipping without a single client logo, testimonial, or invented metric. Micah has seven receipts with names and numbers; a dated log turns those into an ongoing record rather than a static results block, and it can carry redactions honestly. **Caution:** the harness bans `/now`, `/uses`, and decision logs as dev-Twitter tells. An Activity Log is only different if every entry is *client-outcome shipping* — dated deliverables with numbers — never process notes about the site itself. Darkroom's own log fails that test; half its entries are about their own repos. Take the format, not their content.

**Third:** the **plain-text client list**. Nine names as words, in the same mono as everything else, next to Services / Technologies / Awards. No logos, no grid, no greyscale-until-hover. Micah cannot use client logos and shouldn't; he *can* use a word list, and this proves a word list reads as more confident than a logo wall, not less.

---

## 10. THE TELL

**The terminal costume.** Red-on-black monospace body copy, `work://` and `contact://` protocol prefixes on every page strapline, window-chrome glyph blocks in the corners of the top and bottom rails, `[REDACTED]`, `ALL[19]` bracket-superscript counts, an `mc.darkroom.engineering` "Midnight Commander-inspired version of our site" listed in their own activity log. It is 2024–26 developer-studio house style — the exact aesthetic this project's `motion-discipline.sh` hook blocks by name ("mono aesthetic") and the CLAUDE.md bans outright ("Mono body copy, mono headings, or a terminal aesthetic remain banned").

Concretely: on this site **`body`'s computed font-family is Replica Mono at 16px.** Every paragraph on the page is monospace. It is beautifully executed and it is still a costume — it signals *we are hackers* to an audience of other studios, and it makes a 39-word pitch paragraph measurably harder to read than a grotesque would. A solo consultant selling to clinic owners and operations leads cannot wear it; that audience reads it as a website about websites.

Runner-up tell: **five swappable `data-theme`s** (`light` / `dark` / `simple` / `red` / `nasa`) shipped in the token layer when the site uses one. That is a design system built for a demo reel rather than for the page. House Lights' two route-determined modes are the disciplined version of the same idea.

---

## 11. Screenshots

- Home (1440×900 viewport, red-on-black hero plus first project band): `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/darkroom-home.png`
- Work index (marquee, filters, ASCII-dither tile before reveal): `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/darkroom-work.png`
- Supporting: `darkroom-mid.png` (IBICASH band plus the "A SMALL SAMPLE" prose), `darkroom-footer.png` (giant scanline wordmark, clocks, LET'S TALK), `darkroom-work2.png` (**the reveal caught mid-transition** — OREO still ASCII above, LORE resolved to full-colour video below), all in the same directory.

Full-page captures beyond one viewport were not possible: the page uses Lenis with a transformed scroll container, so Playwright's `clip` past `900px` returns black. The four scroll-position captures cover the document instead.
