# Tambo — client build by darkroom.engineering

**Slug:** `tambo` · Researched 2026-09-05

## 1. Fetch proof

- **Live URL:** https://tambo.co/ — **HTTP 200** (`curl -L -o /dev/null -w "%{http_code}"` returned `200 https://tambo.co/`)
- **`<title>`:** `<title>Tambo</title>` (verified in raw HTML, 583,083 bytes; Playwright `page.title()` also returns `Tambo`)
- **Studio:** darkroom.engineering (formerly Studio Freight). Confirmed by the studio's own work index.
- **Pointer URL:** https://darkroom.engineering/work — **HTTP 200**, `<title>Work - Projects That Speak for Themselves - darkroom.engineering</title>`. There is **no case-study detail page**: `/work/tambo`, `/tambo`, `/projects/tambo` all return **404**. The index's own JSON-LD ItemList proves the card links straight out to the client domain: `{"@type":"ListItem","position":18,"name":"Tambo","url":"https://tambo.co"}`. Three `href="https://tambo.co"` occurrences on the page, zero internal links.
- **What the studio page says they did**, quoted from the Tambo card: "Tambo is an open-source React toolkit for building AI agents that speak your UI." and "Connect your existing components and Tambo handles streaming, state management, and MCP." Note: that is the *product* description, not a scope-of-work line — darkroom names no deliverables here. The engineering fingerprints in the CSS (below, sections 4 and 10) are the actual proof of authorship.
- Corporate entity in the footer: **FRACTAL DYNAMICS INC (c) 2026**.

## 2. The client and the product

Tambo sells a developer product: an open-source React SDK plus a hosted agent API that lets an LLM render *your own* React components instead of returning text — free tier, $25/mo Growth, annual Enterprise.

## 3. First screen

- **Asserts:** "Build agents that speak your UI" — **6 words**, one H1, two lines. Sub-dek: "An open-source toolkit for adding agents to your React app. Connect your existing components—Tambo handles streaming, state management, and MCP." (23 words.)
- **Alignment:** left-aligned type in the left half at 1440; centred and stacked *below* the visual at 390.
- **The hero IS:** a live product demonstration, not art. Two stacked UI panels on the right — a real map render of Boston, and a chat transcript reading "What can I do in Boston?" then "checking activities matching the area and your trip dates…" then a typing indicator. Both drawn in dashed-border frames so they read as *the thing being generated*, not a screenshot. Zero canvas at hero (2 `<canvas>` exist elsewhere on the page), no WebGL, no film.
- **Above the H1:** a pill badge, "Announcing Tambo 1.0!".
- **Nav pattern:** a **floating centre-docked pill** fixed at `top-0 z-100`, plus two satellite pills at the far left and far right corners. Left pill = Discord icon + "2.1K". Centre pill = `DOCS · BLOG · [tambo wordmark] · PRICING · CONTACT US · [LOG IN button]`. Right pill = "11.2K" + GitHub icon. **4 link items + 1 button + 2 social counters = 7 targets.** Not hidden at desktop. At 390 the whole thing collapses to one pill: wordmark + `MENU`.
- A circular down-arrow affordance (`hero_arrowDown__...`) sits at the bottom edge, fixed.

## 4. Type system FROM THE CSS

Four `@font-face` families, all self-hosted `.woff2` via `next/font` (`/_next/static/media/*-s.p.woff2`):

| Role | Family | Weights shipped |
|---|---|---|
| Display | **sentient** | 300 only |
| Text | **geist** | 400, 500 |
| Labels / mono | **geistMono** | 400, 500, 700 |
| (4th) | **mono** | 400 |

- **Display:** `sentient` at **weight 300** — a light contrast serif. Computed H1 at 1440: `font-size: 63.5556px`, `letter-spacing: -3.17778px` (= **-0.05em**), color `rgb(15,26,23)`. A 300-weight serif at 64px with -5% tracking is the entire brand voice: expensive, editorial, and deliberately *not* the Inter-tight-tracking SaaS default.
- **Text:** `geist` 400/500.
- **Mono:** `geistMono` used for every eyebrow, every button label, every code and every data figure — `text-transform: uppercase` appears **7 times**, `letter-spacing: .02em` **7 times**. Mono is fenced to labels; body copy is never mono.
- **Tracking ledger:** `-.05em` x8 (display), `.02em` x7 (mono labels), `0` x7, `-.04em` x1, `.05em` x1.
- **The sizing mechanism (this is the borrowable part):** there is **no `clamp()` anywhere.** Every size is
  `font-size: min(calc(((64*100)/var(--device-width))*var(--calc-factor,1vw)), calc(((64*var(--max-width))/var(--device-width))*1px))`
  — you type the **Figma pixel value** (`64`) and the token math converts it to a viewport-relative size that scales fluidly to `--max-width: 1440` and then locks. `--device-width` is `375` in the mobile block and `1440` in the desktop block, so the *same* `64` means the mobile comp's 64px on mobile and the desktop comp's 64px on desktop. 14 distinct sizes observed on this pattern (10, 12, 14, 15, 16, 20, 24, 28, 32, 36, 40, 48, 52, 64). Spacing (`--gap`, `--safe`, `--header-height`) uses the identical function.

## 5. Palette from the CSS

Named `:root` tokens (mint/forest system; counts are appearances in the inline CSS):

| Token | Hex | Count | Role |
|---|---|---|---|
| `--color-dark-teal` | `#80c1a2` | 6 | muted mint, hairlines/dashes |
| `--color-black` / `--color-secondary` | `#0f1a17` | 5 | **type colour** — a near-black with green in it, never `#000` |
| `--color-white` | `#fff` | 4 | the raised content card |
| `--color-light-gray` / `--color-primary` | `#e5f0ed` | 4 | **ground** (computed `body` bg = `rgb(229,240,237)`) |
| `--color-mint` / `--color-contrast` | `#b6ffdd` | 4 | **accent** |
| `--color-teal` | `#7fffc3` | 2 | accent, brighter |
| `--color-ghost-mint` | `#d6ffec` | 2 | accent, faintest |
| `--color-forest` | `#008346` | 2 | deep accent |
| `--color-off-white` | `#f2f8f6` | 2 | |
| `--color-grey` / `--color-dark-grey` | `#d8e9e4` / `#cbe2db` | 2 / 2 | |
| (dek grey, unnamed) | `#444d56` | 3 | body dek |
| `--color-pink` | `#ffc4eb` | 2 | near-unused |
| `--color-red` | `#e30613` | 2 | inherited from the darkroom starter, unused |

- **Ground:** `#e5f0ed` — a pale mint paper, *not* white. Content sits on a `#fff` card with large corner radii floating on top of it, so the page reads as a sheet on a table.
- **Type:** `#0f1a17` on that ground.
- **Accent:** the mint ramp `#d6ffec` to `#b6ffdd` to `#7fffc3` to `#008346`. **Yes, this is the client's brand colour doing the work** — it is Tambo's own octopus-mascot mint, and it appears as: the primary button fill, the pill borders, the diagram card fills, the "+" affordances, the Discord/GitHub badges. `#e30613` (darkroom's own red) and `#ffc4eb` are dead tokens carried in from the studio boilerplate — a tell that this is a *system* the studio reuses, not a bespoke stylesheet.
- Also shipped: 12 named easing curves (`--ease-out-expo: cubic-bezier(.19,1,.22,1)`, `--ease-gleasing: cubic-bezier(.4,0,0,1)`, etc.) as first-class tokens alongside colour.

## 6. The narrative arc

Total document height **9,799px at 1440x900** — 10.9 viewports. 13 sections:

1. **Nav** — floating triple-pill.
2. **Hero** — "Build agents that speak your UI" + a live-looking generative render (map + chat) + `GET STARTED FOR FREE` + a copyable `npm create tambo-app`.
3. **"Generative UI, powered by your components."** — the mechanism, narrated in four labelled beats: `USER` "What seats are available?" then `TAMBO` "Tambo's agent renders your `<SeatMap>`, with your styling and logic." then `TAMBO` "Tambo updates state when users interact." then `BENEFIT` "Same components, new capabilities. Ship AI features without rebuilding." Ends with a 4-line `JSX` snippet (`<TamboProvider components={components}><YourApp /></TamboProvider>`) and `Read the Docs`.
4. **WHY TAMBO — "From zero to agent in a weekend"** — four benefit cards with human titles: "Agent included", "Auth just works", "Your components", "The boring parts, solved".
5. **"Product engineers [heart] Tambo"** — three named testimonials with title and employer.
6. **HOW IT WORKS — "The missing layer between React and LLMs"** — the annotated architecture diagram (see sections 7 and 10).
7. **FEATURES — "What Tambo solves for you"** — 10 uppercase mono capability chips.
8. **PRICING — "Free to start, simple to scale"** — Starter (Free), Growth ($25/mo), Enterprise (Annual Contract), plus a fourth **Open Source / "Self-host for Free. Forever."** column.
9. **"Backed by top investors and builders"** — three names with title-at-company (Drew Houston, CEO at Dropbox).
10. **"Built with Tambo"** — three community-built apps as screenshot cards with the builder's handle: db-thing / @akinloluwami, Strudel AI / @lachieh, CheatSheet / @michaelmagan.
11. **"Join the Tambo community"** — `Star Tambo` + `Join Discord`.
12. **Social-proof marquee** — 9 tweets, each with handle, quote, real name, and title-at-company. Duplicated verbatim in the DOM (the infinite-loop tell).
13. **"Start for free" / "Your first agent is only minutes away."** — final ask, then footer.

The arc is: *show the magic, explain the mechanism, prove it's easy, have engineers say so, show the architecture, enumerate the surface, price it, show who's betting, show what people made, ask.* Proof appears **four separate times in four different currencies** (named engineers, named investors, named community apps, named tweets).

## 7. Motion grammar

**Libraries in the DOM/scripts:**
- **Lenis** — 63 mentions in the HTML; `<html class="... lenis lenis-autoToggle">` at runtime. `window.lenis` is *not* exposed globally (it lives inside the React tree), but the class proves it.
- **tempus** — 1 mention (darkroom's own rAF scheduler, the standard companion to Lenis).
- **gsap** — 1 mention only; `window.gsap` is `false`. **No GSAP runtime, no ScrollTrigger.** All scroll behaviour is CSS `position: sticky` + IntersectionObserver + transforms.
- **three / hamo / r3f / Framer Motion / Embla / Swiper** — **zero**.
- **Next.js App Router** (`/_next/static/chunks/app/(pages)/home/...`), Tailwind-flavoured utility classes with a custom `dt:` desktop variant and `dr-` (darkroom) grid utilities.
- **2 `<canvas>`**, **7 `<video>`** (all `autoPlay muted loop playsInline object-cover`, all `.webm`, all initially `visibility:hidden` and revealed on intersection), **0 `<iframe>`**.

**The videos are the mascot, not footage:** `/videos/Octo-File-compressed.webm`, `Octo-Search`, `Octo-Wave`, `Octo-Catch`, `Octo-Carry`, `Octo-Juggle`. Six short loops of an animated octopus doing one verb each, dropped inline as tiny compressed webm rather than as a Lottie or a sprite.

**Scroll-driven behaviour observed:**
- **Sticky pin x3.** Two `desktop-only sticky top-0 h-screen bg-white` panels (900px sticky inside a 1350px and a 900px parent) act as **curtains**: the white content card scrolls up and a full-bleed white panel holds while the mint ground swaps in behind it. Visible directly in `tambo-late.png` — the white card's rounded bottom edge is caught mid-lift off the mint field.
- **Sticky footer reveal.** The final `Start for free` + footer block is `dt:sticky dt:top-0 dt:h-screen` inside an 1800px parent — a 900px pinned panel with 900px of overscroll, so the page body slides *off* the footer rather than the footer sliding *in*. Classic darkroom close.
- **Marquee.** The tweet wall is a duplicated-content infinite horizontal loop (`marquee` present in the DOM; the 9 tweets appear exactly twice).
- **Reveal-on-intersection.** Every video ships `style="visibility:hidden"` in the SSR HTML and is unhidden by observer, so nothing plays above the fold that isn't in view.
- **Perspective transform on the diagram.** The How-It-Works boxes are rotated in 3D space via CSS transform, not an image.
- Radial `background_item` circles (`absolute rounded-full left-[50%] top-[50%] desktop-only`) drift behind the ground.

**Deliberately still:** no cursor follower. No parallax on the hero. No horizontal-scroll section. No scrub-timeline. No page-transition curtain. No text-splitting/character-stagger reveal. No velocity skew. The H1 does not animate in — it is simply *there* on first paint. On a 10.9-viewport page that is a lot of restraint.

**The ONE motion moment that carries the page:** the **white card lifting off the mint ground** at the sticky curtains. The whole layout is built as a floating white sheet with big radii; twice on the way down, that sheet un-sticks and slides away to reveal the mint field, and the section beneath arrives on a different ground. It costs one `position:sticky` div and a background colour. Everything else on the page is content, not motion.

## 8. Commerce / the ask

- **Primary CTA:** `GET STARTED FOR FREE` — mono, uppercase, letter-spaced, in a **dark `#0f1a17` pill with a mint `#b6ffdd` circular arrow button embedded at its right end**. Only one of these exists above the fold.
- **Immediately beside it, the real ask for this audience:** a copyable command block labelled `NPM` reading `npm create tambo-app`. For a dev product that is the buy button.
- Secondary: `READ THE DOCS`, `LEARN MORE` x2, `START BUILDING` x2, `SIGNUP` x2 (pricing), `CONTACT US` (enterprise), `GITHUB` (open-source column), `STAR TAMBO`, `JOIN DISCORD`.
- **Loudness:** quiet. The only filled dark pill is the hero CTA and the closer. Every other action is an outlined pill or a plain mono link. The nav's `LOG IN` is a mint-outlined pill, deliberately smaller than the wordmark.
- **The final ask** is a full pinned screen: "Start for free / Your first agent is only minutes away." + `START BUILDING` + `CONTACT US`.

## 9. Rhythm

- **13 sections over 9,799px.** Alternating rhythm: contained white card, full-bleed mint, contained white card.
- **Contained is the default.** The page body is a `max-width` white sheet with ~24px radii, inset from the mint ground by `--safe` (40px at 1440, 24px at 375). Full-bleed happens only at the sticky curtains and the marquee.
- **Where it goes quiet:** the gap between the How-It-Works diagram and "Built with Tambo" — `tambo-mid.png` shows roughly 300px of pure empty mint below the diagram, and `tambo-late.png` shows ~200px of empty ground above the "Built with Tambo" heading. The diagram and the heading are each given a whole screen with nothing competing.
- **Footer pattern:** pinned full-screen close. Ask headline in sentient 300, two mono pill CTAs, then a single mono legal strip: `FRACTAL DYNAMICS INC (c) 2026 · DOCUMENTATION · LICENSE · PRIVACY NOTICE · TERMS OF USE`. No sitemap column, no newsletter, no social row (social lives in the nav pills instead).

## 10. THE BEST PART for Micah

**The annotated architecture diagram as the page's centrepiece — a system drawing rendered in live type and CSS, not an image.**

Look at `tambo-mid.png`. The How-It-Works section is four rounded boxes arranged in 3D perspective — "Your App / Your React components" (mint) with "Tambo SDK / Provider · Hooks · State · Streaming" (dark) nested inside it, "Tambo Agent / Hosted API · Orchestration layer" (dark) in the middle, "LLMs" and "MCP Servers / Databases · APIs · Services" (mint) at the right — connected by hand-curved arrows whose labels sit in little mono capsules riding the curve: `MESSAGES & CONTEXT`, `COMPLETIONS`, `STREAMED RESPONSE`, `MCP CALLS`. Box titles are in the serif at 300 weight. It occupies a full screen with 300px of silence under it.

Why this is Micah's mechanism and not someone else's budget:
- It is **type + boxes + SVG arrows**. No illustration, no icon kit, no stock, no 3D — which is exactly the House Lights ban list. The perspective is one CSS `transform`.
- **He already owns the source material.** The book has **nine hand-drawn pages**; one of them is the page-6 diagram the `<WallChart />` already draws. This is the same move at hero scale: take the diagram that *already exists in the artifact* and rebuild it as the centrepiece of the page that sells the artifact.
- **It carries the labels the reader needs.** Tambo's arrow capsules do the explaining that would otherwise be three paragraphs. Micah's equivalent — the arrows between what a client hands him and what comes back — is the whole pitch for a $5K/mo engagement and it fits on one screen.
- **The second mechanism, free with it:** the diagram sits on a full screen with ~300px of empty ground under it. Tambo earns the right to a huge quiet diagram by putting *four different kinds of proof* around it (section 6). Micah has seven receipts with names and numbers, one anonymous quote, and three screenshot-shaped assets. Those are four currencies too — they just have to be **separated into four sections rather than piled into one testimonial block**. Tambo never shows two proof types on the same screen.
- **Third, cheapest, largest return: the fluid-type token function** (section 4). `min(calc(((N*100)/var(--device-width))*1vw), calc(((N*var(--max-width))/var(--device-width))*1px))` with `--device-width: 375 | 1440`. Type the comp's pixel number, get correct fluid type at both breakpoints with no `clamp()` guesswork and no magic middle value. This is darkroom's actual production system, sitting in plain text in the stylesheet, and it is portable to a Tailwind v4 `@theme` block in an afternoon.

## 11. THE TELL

**The six commissioned octopus animations.** `Octo-File`, `Octo-Search`, `Octo-Wave`, `Octo-Catch`, `Octo-Carry`, `Octo-Juggle` — six bespoke character loops of a mascot doing a different verb in each section, produced as compressed `.webm`. That is a character designer plus an animator plus six shot briefs. It reads as delight; it is a line item. Do not attempt an equivalent — a stand-in mascot on a consultant's site is worse than no mascot, the same reasoning that deleted the "MJ" monogram from `/about`.

**Second tell: the proof volume itself.** Three named testimonials + three named investors (Drew Houston) + three community-built apps + nine screenshotted tweets from Supabase's CEO and a Google DX engineer = **eighteen third-party endorsements**. That is a funded company with a developer community, not a design decision. The *shape* of it — four currencies, separated, each with a name and a title — is borrowable at any scale. The *count* is not. Micah has seven receipts and one anonymous quote; the correct response is four sections of one or two items each, spaced exactly as generously as Tambo spaces its dozens, not a wall pretending to be full.

**Third, minor:** the hero's map render is a live embedded map of Boston inside a generated-UI frame. It is real product output. A screenshot in the same dashed frame reads as a mock-up; the frame only works when what's inside it is genuinely live.

## 12. Screenshots

Playwright, Chromium, saved to `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/client-work/`:

| File | Viewport | Scroll |
|---|---|---|
| `tambo-top.png` | 1440x900 | 0 — hero |
| `tambo-mid.png` | 1440x900 | 3,430px (~35%) — the How-It-Works architecture diagram + quiet ground |
| `tambo-late.png` | 1440x900 | 6,859px (~70%) — the white card lifting off the mint ground into "Built with Tambo" |
| `tambo-390.png` | 390x844 | 0 — mobile hero (visual first, H1 second, single `MENU` pill) |
