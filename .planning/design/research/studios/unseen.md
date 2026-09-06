# Unseen Studio — teardown

## 1. Fetch proof
- URL: https://unseen.co/ — HTTP **200** (Playwright `response.status()`), rendered headless Chrome at 1440x900.
- `<title>`: **`Unseen Studio® – Brand, Digital & Motion`**
- Also fetched: `/projects/` (200, `Unseen Studio® – Projects`), `/projects/superlist/` (200, `Superlist – Unseen Studio®`), `/contact/` (200), `project-sitemap.xml` (200, 25 project URLs).
- Platform: WordPress (`/wp-content/themes/unseen/`), Yoast sitemap.

## 2. Type system (from CSS)
Three `@font-face` declarations, all self-hosted woff2 from `/wp-content/themes/unseen/resources/assets/fonts/`. No Google or Adobe link.
- **`Neue Montreal` Regular 400** — the text/UI face. Stack falls back to `system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans`.
- **`Saol Display` Light 400** + **`Saol Display` LightItalic 400** — the display face (high-contrast, didone-adjacent serif). Fallback `Georgia, Cambria, Times New Roman, serif`.
- Only **two families, one weight each** are shipped. Computed weights observed: 300 (the large mailto link), 400 nearly everywhere, 500 on the gate button, 700 only on visually-hidden `h1`s.
- Display sizes (computed at 1440px): 90px menu items (`Index`, `Projects`), 86.4px `Say hello`, 57.6px `Selected Projects` and the hero word `unexpected`. Letter-spacing on display: **-1.44px at 90px and 86.4px**, **-1.152px at 57.6px** — a consistent ~-0.016em optical tightening applied to both Saol and Neue Montreal.
- Body: 14.4px / 21.6px line-height, `letter-spacing: -0.36px` (-0.025em) on the hero paragraph; 17.28px / 22.46px for address blocks.
- Labels: **10.08px uppercase 500** (`ENTER WITHOUT AUDIO`, `⮡ TWITTER`), **11.52px uppercase** (`UNSEEN`), **7.2px uppercase** (`CLICK & HOLD`), 9px filter counts. Uppercase is reserved for labels, chrome microtext and case-study metadata headers — never for a headline.
- Sizes land on fractional px (14.4, 57.6, 86.4, 10.08), i.e. a fluid scale computed off a root, not a hand-picked ladder. No `clamp()` literals exposed in the computed style.
- **No monospace anywhere.** No mono-serif. The technical register is carried by tiny uppercase Neue Montreal instead.
- The signature move: **Saol italic and Neue Montreal alternate inside a single phrase.** Hero reads "*Creating the*" (Saol italic) / "unexpected" (Neue Montreal). The case hero reads "*PROJECTS/*" (Saol italic caps) / "SUPERLIST" (grotesk caps), then "MARKETING" (grotesk) / "*WEBSITE*" (Saol italic). Nav items render both faces stacked for a hover swap.

## 3. Palette (computed census across all elements)
| value | hex | count | role |
|---|---|---|---|
| rgb(0,0,0) | #000000 | 393–781 | true black type and overlays |
| rgb(33,33,33) | #212121 | 232–459 | the working ink (nav, body, links) |
| rgb(66,66,66) | #424242 | 98–196 | secondary/muted text on the gate |
| rgb(214,214,214) | #D6D6D6 | 19–34 | inactive menu item, disabled state |
| rgb(255,255,255) | #FFFFFF | 20–28 | reversed type on dark pills |
| rgb(239,222,217) | #EFDED9 | **7** | soft blush — the only chromatic value in the CSS |
| rgb(250,246,244) | #FAF6F4 | 2–3 | warm off-white pill fill |
| rgb(241,237,235) | #F1EDEB | 1 | warm off-white ground |
| rgb(237,237,237) | #EDEDED | 1 | case-page ground |

- Ground: warm near-white **#F1EDEB / #FAF6F4**. On the home the ground is not CSS at all — it is the WebGL render (dusty pink plaster arches, water, sky).
- Type colour: **#212121**, not black, for anything sitting on the paper. Pure #000 shows up mostly on overlay and hidden elements.
- Accent: **#EFDED9 blush, 7 occurrences in the whole document.** Effectively no accent.
- **Achromatic in practice: yes.** The CSS is a greyscale system; every colour on screen comes from the 3D scene and the project thumbnails. That is the trick — the chrome never competes with the work.

## 4. Composition of the home first screen
- A gate comes first: full-bleed still plus `ENTER` / `ENTER WITHOUT AUDIO`, a `(LOADING)` counter, the studio name and the positioning paragraph at 14.4px.
- After entry the first screen is **one full-bleed WebGL scene** (three.js, a single `<canvas>`; `document.body.scrollHeight` = **43px, so the home does not scroll at all**). Zero `<img>`, zero `<video>` in the DOM.
- A centred stack of three lines:
  - kicker `A BRAND, DIGITAL & MOTION STUDIO` (5 words, 10px uppercase)
  - headline `Creating the unexpected` — **3 words**, Saol italic plus Neue Montreal
  - one pill button `View our work ↘`
- Total assertion on the first screen: **8 words.** The 30-word positioning paragraph lives only on the pre-entry gate.
- Nav: wordmark top-left; **3 items top-right** (Index, Projects, Contact) plus a `•••` circular toggle opening a numbered overlay (01 Index, 02 Projects, 03 Contact, 04 World). Bottom bar: sound toggle at left, an `Our 2025 Wrapped` pill, centred `UNSEEN ⊕ WORLD`, `©2026` at right. The corners carry the chrome; the middle is left to the work.
- **Is the work the page? No** — deliberately. The home is an atmosphere, not an index; the work sits one click behind `View our work`.

## 5. How work is shown
- `/projects/` is a **2-column grid of ~16:9 tiles**, rendered through a shader — the whole grid is painted into the WebGL canvas with a curved-page warp and chromatic-aberration fringing at the edges, which is why the DOM reports 0 `<img>` and a `scrollHeight` of 0.
- Header `Selected Projects` (57.6px), then **filter pills carrying counts**: `All 20 · Branding 5 · Digital 20 · Motion 5 · Experiment 6`. The counts are the honesty device — a visitor knows the size of the body of work before scrolling.
- Caption under each tile: **project name in medium weight plus a service line** ("Hubtown / Portfolio Website, Immersive Experience"; "Poly / Website Design"), a hairline rule, and a `↘` affordance. Two lines, no prose.
- Hover: a circular cursor puck follows the pointer, the tile plays its video, and the warp reacts. `[class*="cursor"]` returns 17 nodes.
- Prose before work: **none on the index.** Twenty projects appear before a paragraph does.
- Case page (`/projects/superlist/`): 10,476px tall, 6 `<video>` and 5 `<img>`, still one canvas. Media aspect ratios: 1094x616 (**16:9**, the default), 1440x1080 (**4:3** full-bleed), 346x521 and 357x805 (**0.66 and 0.44**, phone-shaped, for UI). Structure: a hero of two alternating-face lines, a three-part metadata strip (`PROJECT OVERVIEW` one sentence / `SERVICES` list / `DATE · CLIENT · LOCATION`), then alternating full-width media and 2–3 sentence sections under plain sentence-case headings ("All in the details", "Under the hood; technologies and optimisation"). It ends with `Awards & Recognition` (Awwwards, CSSDA, FWA, Lovies, Davey) and a `NEXT — DREAMSCAPES (KEEP SCROLLING)` handoff.

## 6. The path to business
- Nav item **`Contact`** (third of three), plus a sitewide pre-footer that ends every page.
- Pre-footer wording, exact: **`Say hello`** (86.4px Saol) over **`WE LOOK FORWARD TO HEARING FROM YOU`** (12.96px uppercase), then two labelled routes — **`New Business`** goes to `⮡ projects@unseen.co`, **`General`** goes to `⮡ hello@unseen.co`. Below that, `(+44) 0117 922 6892` and two studio addresses (Bristol, 35a Colston Avenue BS1 4TT; London, 90 Paul Street EC2A 4NE).
- The home's only CTA is **`View our work ↘`**. The first ask is to look, not to book.
- **No pricing.** No form on the contact page, no calendar, no "book a call". **Two mailto links, a phone number, two street addresses.** The split inbox (new business versus general) is the entire qualification mechanism.

## 7. Motion vocabulary
- Detected in the runtime: **`window.__THREE__` = "143"** (three.js r143) and **`window.gsapVersions` = ["3.6.0"]**. Bundles: `manifest.js`, `vendor.js`, `theme.js` — a Laravel-Mix / Sage WordPress theme.
- No Lenis, no Locomotive, no Barba, no Swiper globals. No marquee elements (`[class*="marquee"]` = 0).
- `<canvas>` count: **1** on every page (one persistent renderer). `<video>` count: 0 on the home, 6 on a case page.
- Described behaviours, from on-screen microcopy and observation: an **audio gate** with a persistent `Toggle Sound` control; `Drag to explore our world` and `Click & Hold` — the home is a draggable 3D room; a **custom circular cursor**; a shader warp plus chromatic fringe on the project grid; per-letter text reveals; scroll-tied media on case pages; a `(KEEP SCROLLING)` chained next-project transition.
- What is quiet: **no parallax on type, no sticky or pinned sections, no horizontal gallery, no scroll-jacking, no loading theatre after entry.** The typography itself barely moves. Every effect is spent on the imagery layer.

## 8. Rhythm
- Home: **one screen, no scroll.** The most confident decision on the site.
- Projects: header, filters, uninterrupted grid, pre-footer. Three beats.
- Case study: hero, metadata strip, roughly five alternating media/prose sections, awards, next project. Media runs full-bleed; prose sits in a narrow measure with wide margins. It goes quiet exactly where the 4:3 full-bleed frames land.
- Footer pattern: **no giant wordmark.** The page ends on `Say hello` at 86.4px — the sign-off is the display moment — followed by a low bar of emails, addresses and socials in 10px uppercase. The persistent bottom chrome (`UNSEEN ⊕ WORLD`, `©2026`, sound toggle) is fixed, not a footer.

## 9. THE BEST PART
**The project caption plus the case metadata strip: every piece of work is introduced by facts before it is introduced by adjectives.** A tile carries `Name / Service, Service`. A case opens with a one-sentence `PROJECT OVERVIEW`, a `SERVICES` list, and `DATE · CLIENT · LOCATION` in 10px uppercase labels. No claim, no impact language — a filing card. And the filter pills publish the counts (`All 20 · Branding 5 · Motion 5`), which quietly says this is the whole body of work and nothing is hidden.

**Legal for him: yes, entirely, and it is the cheapest credibility available.** He has real artifacts and seven receipts with names and numbers; a `DATE / CLIENT / ROLE / TOOLS` strip and a one-sentence overview per project is a factual restatement of what he already holds. No logo wall, no testimonial, no invented proof needed — the format itself performs the trust. The one part to skip is the `Awards & Recognition` block; he has no awards, and borrowing the shape without the substance is the failure mode.

Second, freely stealable: **an achromatic chrome so the artifacts are the only colour on screen.** Their CSS palette is nine greys and one blush used seven times. His book pages, his photograph and his screenshots would be the only saturated things on the page — the same effect, with no WebGL at all.

## 10. THE TELL
**The audio gate.** `ENTER` / `ENTER WITHOUT AUDIO` over a `(LOADING)` counter, then `Drag to explore our world` — the 2021 Awwwards-submission template, and the Awwwards/FWA/CSSDA badge list at the foot of the case study confirms what the gate is for. It costs the visitor a click, a decision and a wait before a single fact about the studio arrives, and it is the reason the 30-word positioning line has to live on a splash screen instead of on the site. A solo consultant selling judgement cannot afford a doorman. The adjacent tell is the non-scrolling WebGL room, which makes the actual work a second-click event.

## 11. Screenshots
- Home: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/unseen-home.png`
- Case (`/projects/superlist/`): `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/unseen-work.png`
- Supporting: `unseen-projects.png`, `unseen-projects-hover.png`, `unseen-work-footer.png` in the same directory.
