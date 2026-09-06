# GrowthLoop — client build by darkroom.engineering

## 1. Fetch proof
- **Live URL:** https://www.growthloop.com/ — **HTTP/1.1 200 OK** (Server: Vercel, `X-Nextjs-Prerender: 1`, `X-Vercel-Cache: HIT`, 728,833 bytes of HTML).
- **`<title>`:** `GrowthLoop | Agentic composable CDP ` (trailing space is in the source).
- **Stack observed:** Next.js App Router on Vercel, Storyblok CMS (`Content-Security-Policy: frame-ancestors 'self' https://app.storyblok.com/`), Turbopack chunk names.
- **Studio:** **darkroom.engineering** — the dev studio that maintains Lenis. NOT "Darkroom Agency," the DTC growth-marketing shop that shares the name; search results conflate the two.
- **Pointer URL:** https://darkroom.engineering/work (machine-readable sibling at https://darkroom.engineering/work.md). GrowthLoop is entry 7 of 19.
- **What the pointer page says they did**, verbatim: "GrowthLoop is a Composable CDP that unifies all your customer data, enabling marketers to build audiences and orchestrate journeys without engineering support." The page header adds: "Darkroom builds production websites, ecommerce platforms, digital products, and interactive experiences. Case studies hosted on this site have Markdown siblings; other entries link to the live work." GrowthLoop is an "other entry" — the link goes straight to the live client domain, with no hosted case study. `https://growthloop.darkroom.engineering` (which appears in the search index) now returns **404**, and `https://darkroom.engineering/work/growthloop.md` also 404s. So there is no scope or role breakdown from the studio — only the one-line credit above.
- **Fingerprint confirming darkroom authorship from the code itself:** Lenis `1.3.15` (`window.lenisVersion`), the `dr-*` Tailwind prefix on every utility class (`dr-w-104 dt:dr-w-144`), darkroom's `useDeviceDetection` / `useScrollTrigger` hooks, and their house fluid-type formula `min(calc(((N*100)/var(--device-width))*1vw), N*1.3333px)`.

## 2. The client and the product
GrowthLoop sells enterprise SaaS: an "agentic, composable CDP" that sits on top of a company's existing cloud data warehouse (Snowflake, BigQuery, Databricks, Redshift) so marketers can build audiences and run omnichannel journeys without waiting on engineering. The ask is a sales demo, not a purchase.

## 3. First screen
- **Assertion:** `Composable architecture meets agentic intelligence` — **6 words**, with `agentic intelligence` set in the brand blue `#1653f1` while the first four words stay near-black. The sub-dek is 27 words: "GrowthLoop is the agentic, composable CDP that drives compound growth by uniting your cloud data and AI into one Compound Marketing Engine."
- **Alignment:** dead-centre, both headline and dek, with the CTA pill centred beneath. Unusually classical for a darkroom build — the type is the composition.
- **What the hero IS:** a **photograph** — a soft daylit sky and cloud field, blue at the left edge fading toward white — overlaid with faint concentric white arcs (the "loop" motif drawn as thin circles radiating from below the fold). No video, no canvas, no 3D. Beneath the fold-line a **product render** rises into frame: a rounded card in a blue-to-cream gradient showing "Build with AI Studio," a typed prompt ("Build an audience of high spenders who live in New York City."), and a vertical chain of agent chips — AUDIENCE AGENT, PLANNER AGENT, VALIDATOR AGENT, AUDIENCE AGENT.
- **Nav:** a sticky white bar. Logo left; **5 top-level items** centred — Platform, the industries menu, Pricing, Resources, Company (four are mega-menu triggers); one black pill **"Get a demo"** right. Nothing hidden at 1440. At 390 the whole centre collapses to a hamburger and the black pill stays visible beside it. Above the nav sits a dismissible periwinkle **announcement bar** naming three new ad-tech integrations (The Trade Desk, Audience Acuity, Moloco) with a "Learn more and watch the demo!" link.

## 4. Type system from the CSS
- **Families (self-hosted `.woff2` under `/_next/static/media/`):**
  - `dateiGrotesk` — **Datei Grotesk**, three cuts shipped: `DateiGrotesk_Regular-s.p.a9b9c6ce.woff2`, `_Medium-s.p.9fb4bcf9.woff2`, `_Semibold-s.p.a73a81aa.woff2`. Exposed as `--font-datei-grotesk` / `--font-dateiGrotesk`.
  - `mono` — **Server Mono** (`ServerMono_Regular-s.p.61a035d2.woff2`), exposed as `--font-mono`.
  - Both get generated `-Fallback` metric-override faces (Next's `next/font` local pipeline).
- **Display vs text: the same family does both.** Datei Grotesk carries the 85px hero and the 16px body alike. There is no serif and no second display face. It is a one-family site — hierarchy is carried by size, weight and colour, nothing else. `font-family:var(--font-datei-grotesk)` appears **26x** in the stylesheet; `mono` appears once.
- **Weights in use:** 400 (16 rules), 500 (11), 600 (8), then 700/800/900 in single digits (embedded third-party widgets, not the design system). The site is essentially **400 body / 500 UI / 600 headline** — the headline is *not* bold, it is Medium or Semibold at large size.
- **Display size — no `clamp()` anywhere.** darkroom's alternative: `font-size: min(calc(((64*100)/var(--device-width))*1vw), 85.3333px)`. `--device-width` is `375` at mobile and `1440` at desktop, so the design-file pixel value scales linearly with the viewport and then **hard-caps at 1.3333x the design value**. The full ladder in the CSS: 12/14/16/18/20/24/30/32/38/44/48/56/64 design px, capping at 16 / 18.67 / 21.33 / 24 / 26.67 / 32 / 40 / 42.67 / 50.67 / 58.67 / 64 / 74.67 / 85.33px. The hero renders about 64px at 1440.
- **Tracking:** negative and aggressive on display — `-0.05em` (10 rules, the display default), `-0.04em`, `-0.03em`, then `-0.02em` and `-0.01em` for text sizes, and `0` only twice. Nothing is positively tracked, which means **the labels are not letterspaced** — the "01 Audiences" rail and the eyebrows sit at normal or slightly tight tracking in Datei Grotesk, not in spaced mono.
- **Mono use:** rare to the point of vestigial. Server Mono is loaded and tokenised but appears in one family rule; the numeric rail (`01 / 02 / 03`) reads as grotesk figures, not mono.
- **Uppercase:** `text-transform:uppercase` count in the shipped CSS = **0**. The only caps on the page are baked into product-screenshot chips ("AUDIENCE AGENT"). This is a site with **no uppercase label layer at all** — every eyebrow ("Compound marketing") is sentence case.

## 5. Palette from the CSS
Declared as a flat token block on `:root` — the whole system is 22 named colours:

```
--color-primary:#fff  --color-secondary:#181609  --color-contrast:#f5f5f5
--color-black:#181609 --color-white:#fff        --color-blue:#1653f1
--color-error:#fa4f4f --color-orange:#fd5d03
--color-secondary-blue:#a6bcf4 --color-blue-grey:#fafbff
--color-green:#4ff49b --color-secondary-green:#b9f7d0 --color-green-mint:#f6fef9
--color-yellow:#ffdf4f --color-secondary-yellow:#fcf0b0 --color-yellow-cream:#fdfcf6
--color-light-grey-1:#f5f5f5  -2:#e3e3e3  -3:#bdbdbd
--color-mid-grey:#858585  --color-dark-grey-1:#303030  -2:#363636  -3:#585858
```

Raw hex counts in the shipped CSS: `#fff` x10, **`#1653f1` x7**, `#000` x6, `#fafbff` x5, `#f5f5f5` x5, `#181609` x5, `#fa4f4f` x4, `#2b2b2b` x4, `#ffdf4f` x3, `#4ff49b` x3, greys x3 each.

- **Ground:** white `#fff`, with `#fafbff` (blue-grey) as the quiet-section tint and a near-black `#2b2b2b` / `#181609` band for the one dark section.
- **Type colour:** `#181609` — a warm-shifted near-black (a trace of yellow in it), never pure `#000` for body.
- **Accent:** **`#1653f1`**, and it is the single hardest-working value on the page. It does the coloured half of the headline, every primary CTA pill, the active state of the numbered rail, the "Read the case study" button, and an entire full-bleed royal-blue panel behind the product screenshots. `#a6bcf4` is its tint (announcement bar, gradient edges).
- **Is it the client's brand colour doing the work?** **Yes, entirely.** GrowthLoop's logo mark is that blue; the site simply refuses to introduce anything else at load-bearing size. The yellow, green and orange tokens exist but surface only as gradient partners (blue-to-cream on the AI Studio card) and as status colours. The design decision is: *one client blue, one warm black, white, and a blue-grey — everything else is a gradient.*

## 6. The narrative arc
Nineteen `[data-section]` blocks, 14,488px tall at 1440. In order:

1. **Announcement bar** — dismissible periwinkle strip carrying a dated product-news line.
2. **Hero** — sky photograph, 6-word claim, "Book a demo," AI Studio card rising into frame.
3. **Trust bar** — "The world's leading enterprises trust GrowthLoop to accelerate their growth" plus client logos.
4. **"Our agentic, composable CDP delivers rapidly accelerating growth"** — the outcome claim, stated before any feature.
5. **Capability set** — "Deliver powerful campaigns and compound growth," broken into five promises: better audiences; personalized omnichannel journeys; AI that finds the next revenue opportunity first; fast access to cloud data; compounding growth.
6. **"Benefits of an agentic, composable CDP"** — comparison against the legacy CDP.
7. **"See how our customers create impactful business outcomes"** — a horizontal **customer-story carousel**: full-bleed duotone photograph with the client wordmark burned into it (Allegro, NASCAR), a pull-quote, a **named** person with headshot and title (Marta Piotrowska, Director of Agentic Marketing), a "Read the case study" button, and a three-up number row (2X ROAS increase / 60% GMV increase / 70% CPC decrease). Prev and next circles below.
8. **"2025 Google Cloud Partner of the Year"** — one borrowed authority badge, given its own dark band.
9. **"Give your marketers agentic, growth-driving superpowers"** — AI Studio deep-dive.
10. **"Recognized as an industry leader"** — G2 badges.
11. **"One platform to securely deploy and scale agentic AI across your enterprise"** — the security and enterprise objection handler.
12. **"Compound marketing starts in the cloud"** — warehouse and destination logos (BigQuery, Snowflake, Databricks, Redshift; Advertising, Email, Sales & CRM).
13. **"Audiences, journeys, and insights. One compounding growth loop."** — **the pinned three-step**: a sticky numbered rail `01 Audiences / 02 Universal Journeys / 03 Insights` against a full-bleed blue panel that swaps product screenshots as you scroll. This is where the page's title metaphor is finally paid off.
14. **Final CTA** — "The only platform for compounding growth" plus demo button.
15. **Footer.**

The arc is: claim, then who already trusts it, then outcome, then what it does, then why not the incumbent, then proof with names and numbers, then borrowed authority, then the risk objection, then where it plugs in, then how the loop actually closes, then the ask. Proof arrives at roughly one-third of the page, not at the end.

## 7. Motion grammar
- **Libraries in the bundle** (1.22MB of JS across 19 chunks): **Lenis 1.3.15** (`window.lenisVersion` set; `useLenis` React hook; `data-lenis` attributes), **GSAP** with **ScrollTrigger** wrapped in darkroom's own `useScrollTrigger` hook, and a **`tempus`** reference (their rAF scheduler). **No three.js, no WebGL, no framer-motion, no Embla, Swiper or Splitting.**
- **`<video>` elements: 0. `<canvas>` elements: 0. `<img>` in the initial HTML: 3.** For a site of this apparent production value that is remarkable — every rich moment is a PNG or a CSS gradient.
- **Scroll-driven behaviour actually observable in the code:**
  - `useScrollTrigger({ rect, start:"top center" | "center bottom" | "top bottom", end:"bottom top", onProgress })` — darkroom normalises every scroll effect to a **0-to-1 progress number** and hands it to React. That single hook is the site's entire motion API.
  - **Pinned and sticky:** 16 elements resolve to `position: sticky` or `fixed` at runtime. The nav is one; the `01/02/03` rail in section 13 is the important one — it stays put while its media panel advances.
  - **Progress-driven state, not tweening:** the numbered rail toggles `opacity-100` against `opacity-48` with `transition-all duration-300` as progress crosses each step. The motion is an opacity swap on a text list, driven by scroll.
  - **Reveals:** GSAP tweens with `ease:"expo.out", duration:1, opacity:1`, fired once (a `K.current = true` guard prevents re-run) at `start:"top center"`.
  - **Split text:** a `splittedText.words` structure is passed into a Lenis scroll callback — word-level entrance on at least one headline.
  - **Horizontal:** the customer-story carousel, arrow-driven, not scroll-hijacked.
  - **Header transform:** `useLenis(({scroll}) => setState(scroll >= desktopVW(62)))` — the nav changes state past 62 design-px of scroll.
- **What is deliberately still:** the hero. No parallax on the sky, no video, no cursor follower, no marquee, no velocity skew, no page transitions, no scroll-jacking. The first screen is a photograph and a sentence and it does not move. For a Lenis-house build this is a conscious act of restraint — they shipped the smooth-scroll runtime and then used it almost entirely for *state*, not for *animation*.
- **The ONE motion moment that carries the page:** **section 13's pinned numbered rail.** `01 Audiences / 02 Universal Journeys / 03 Insights` holds still at 48% opacity, lights to 100% one line at a time as the blue panel beside it advances through three product screenshots, and by the time you leave it you have watched the loop close. Everything before it is a claim; this is the only place the page demonstrates rather than asserts. It costs one sticky container and an opacity class.

## 8. Commerce and the ask
No commerce — it is a demo funnel, and it is **loud but singular**.
- The exact words are only ever two: **"Get a demo"** (the persistent black pill, top right, present at every scroll position, mobile included) and **"Book a demo"** (the blue pill with a white circular play glyph, in the hero, beside section 13's headline, and in the final CTA).
- Secondary ask: **"Read the case study"** (blue pill, 6 instances) — the only other button, and it deepens proof rather than diverting from the funnel.
- Loudness: the black pill is the single black object in the nav; the blue pill is the single saturated object in the hero. There are exactly **two button styles on the whole site.**

## 9. Rhythm
- **19 sections** over roughly 16 viewport heights.
- **Contained-first with full-bleed punctuation:** most sections sit in a gutter grid (`--columns` 4 at mobile, wider at desktop; `--gap` and `--safe` both `min(((16*100)/device-width)*1vw, 21.33px)`). The escapes are deliberate and few: the sky hero, the royal-blue product panel, the duotone carousel photographs, the dark partner band, and the gradient strip between sections.
- **Where it goes quiet:** between the carousel and the compound-marketing section there is close to a full viewport of white with nothing but a gradient rule. And the section-13 headline sits alone in enormous type with the CTA floated far right and no supporting copy at all. The page buys its emphasis with emptiness rather than with effects.
- **Footer:** a conventional multi-column SaaS sitemap (product, industries, resources, company, legal), preceded by the "The only platform for compounding growth" CTA band. No signature footer moment; the design budget went above it.

## 10. THE BEST PART for Micah
**The pinned numbered rail (section 13) — an ordered list that holds still and lights up one line at a time as the panel beside it changes.**

Why it is the right steal, specifically for his inventory:
- **It runs on assets he already has.** The mechanism needs (a) three to five ordered step names, (b) one image per step, (c) a sticky container. His book has **nine hand-drawn pages**; his engagements have a real sequence. A rail reading `01 Diagnose / 02 Instrument / 03 Hand back the wheel` beside three of his own hand-drawn pages is the identical mechanism with zero invented proof — and hand-drawn pages advancing next to a still list will read *better* than GrowthLoop's product screenshots, because they are unrepeatable and his.
- **The cost is one CSS property and an opacity class.** `position: sticky` on the left column, and `opacity: .48` to `1` with `transition: opacity 300ms`. No GSAP required — an IntersectionObserver per step, or plain scroll-progress arithmetic, produces the same result. This sits inside the House Lights motion budget: it does not pin the *page*, it does not scrub, it does not follow the cursor. It is a two-column layout where one column is taller than the other.
- **It solves his actual structural problem.** He has three fixed-price packages and a $5K/mo engagement to explain, and a comparison table is the boring answer. The rail turns "here are my packages" into "here is the sequence, and you are currently at step two of it" — the buyer watches the argument advance instead of scanning a grid.
- **Second, smaller steal from the same page: the proof card.** GrowthLoop's carousel pairs *one photograph, one quote, a named person with a title, and exactly three numbers*. Micah has **seven receipts with names and numbers** and **one anonymous quote**. That is enough for seven proof cards in this exact shape — and the anonymous one has an honest home here too, because the format makes the missing name visible rather than papering over it. A card without a headshot reads as "this client asked not to be named," which is a stronger signal than a stock avatar.
- **Third, free: the type system.** One family, three weights, `-0.05em` on display, **zero uppercase**, and no `clamp()` — instead `min(calc((N*100)/var(--device-width)*1vw), N*1.3333px)`, which makes every size scale from the design-file value and stop growing at 1.33x. That formula ports directly into his Tailwind v4 `@theme` block and gives better large-screen behaviour than clamp's linear interpolation.

## 11. THE TELL
**The customer-story carousel's photography.** Each slide is a commissioned or licensed photograph — a woman at a laptop in warm light, a NASCAR pit lane — colour-graded into a duotone and burned with the client's wordmark. That is a photo budget plus a retoucher plus enterprise logo clearances, and it is what makes the section feel expensive. Micah has **one photograph of himself and no logos**, and any attempt to fake this with stock imagery would trip his own DESIGN_BAR ban and read instantly as filler. **Take the card's structure (photo slot, quote, named person, three numbers) and leave the photograph.** His slot should hold a screenshot, a scan of a hand-drawn page, or nothing at all, and the card should be built so that a missing image is a legitimate variant rather than a hole.

Two lesser tells: the **"2025 Google Cloud Partner of the Year"** band and the **G2 leader badges** are borrowed institutional authority that a solo consultant cannot source — the honest analogue is the seven receipts, not a badge row. And the **announcement bar** naming three new ad-tech integrations is a shipping-cadence flex that only works when there is a product org behind it; on a one-person site it reads as a stale banner within a month.

## 12. Screenshots
Captured with Playwright at 1440x900 (and 390 wide for mobile), page height 14,488px:
- `growthloop-top.png` — first screen: sky photograph, centred 6-word hero, "Book a demo," AI Studio card entering.
- `growthloop-mid.png` — about 35%: the Allegro customer-story card, quote plus named person plus the 2X / 60% / 70% row, NASCAR slide bleeding in from the right.
- `growthloop-late.png` — about 70%: the section-13 headline "Audiences, journeys, and insights. One compounding growth loop." with the `01/02/03` sticky rail and the royal-blue product panel.
- `growthloop-390.png` — mobile first screen: hamburger plus black pill nav, hero wrapping to three lines, the agent-chain card.

All four under:
`C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/client-work/`
