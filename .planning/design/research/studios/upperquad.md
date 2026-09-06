# Upperquad — teardown

## 1. Fetch proof
- `https://upperquad.com/` → HTTP 200 · `<title>Upperquad</title>`
- `https://upperquad.com/work` → 200 · `<title>Work | Upperquad</title>`
- `https://upperquad.com/work/gemini` → 200 · `<title>Gemini | Upperquad</title>`
- `https://upperquad.com/contact` → 200 · `<title>Contact | Upperquad</title>`
- Stack: Next.js App Router (`/_next/static/chunks/app/(marketing)/page-*.js`), Tailwind v4 CSS-first
  (`@layer theme` with `--text-*` / `--tracking-*` tokens), single stylesheet
  `/_next/static/css/bdf7e213f32a875f.css` (92,277 bytes). Media on CloudFront.

## 2. Type system (from the CSS)
Three self-hosted licensed faces via `next/font/local`, all `.woff2`, `font-display:swap`, each with an
Arial-metric fallback (`ascent-override`, `size-adjust`) — zero Google/Adobe links:

| face | role | weights shipped | var |
|---|---|---|---|
| **national** (Klim National) | DISPLAY — every h1/h2, `.font-display` (18 uses on home, 29 on /work, 13 on the case study) | 400 (one file; 300 rendered via synthesis/variable axis) | `--font-national` → `--font-display` |
| **brutGrotesque** | TEXT — `body`, all UI, labels | 300, 400 | `--font-brut` → `--font-sans` |
| **tiemposText** | reserve serif — `--font-serif` is defined, `.font-serif` appears **0 times** in the markup I fetched | 400 roman + 400 italic | `--font-tiempos` |

Note the inversion of the obvious: the *display* face is the grotesque-adjacent National and the *body*
face is the sans; the serif they licensed (with an italic) is loaded and unused on these four pages.

Computed at 1440: home `h1` = `national`, **112px / 400 / -3.36px** (`-0.03em`), no transform, centered.
Case-study `h1` ("Gemini") = `national`, **128px / 300 / -3.84px**. Body = brutGrotesque, `#1a1a18`.

Full display ramp (all `clamp()`, all with a matched line-height token):
```
--text-5xl: clamp(3.25rem, 1.85rem + 7vw, 7rem)       lh 1
--text-4xl: clamp(2.75rem, 1.75rem + 5vw, 5.5rem)     lh 1.05
--text-3xl: clamp(2.25rem, 1.65rem + 3vw, 4.25rem)    lh 1.1
--text-2xl: clamp(1.75rem, 1.4rem + 1.75vw, 2.75rem)  lh 1.2
--text-xl:  clamp(1.375rem, 1.15rem + 1.13vw, 1.75rem) lh 1.3
--text-lg:  clamp(1.125rem, 1rem + .6vw, 1.375rem)    lh 1.45
--text-base:clamp(.9375rem, .9rem + .19vw, 1.0625rem) lh 1.6
--text-sm:  clamp(.8125rem, .76rem + .26vw, .875rem)  lh 1.5
--text-xs:  clamp(.6875rem, .65rem + .19vw, .75rem)   lh 1.4
```
Plus fixed 6xl–9xl (3.75/4.5/6/8rem) for outsized numerals. Nine fluid steps. The display sizes scale by
`vw`; the body sizes barely move (`.9375rem → 1.0625rem` across the whole range). That is the discipline:
**the headline is responsive, the paragraph is not.**

Letter-spacing is a two-pole system: display negative (`--tracking-tight -.02em`,
`--tracking-tighter -.03em`); labels positive (`--tracking-wide .04em`, `wider .08em`, `widest .1em`),
with footer/eyebrow labels on an inline `tracking-[0.06em]`.

Uppercase is rationed and always small: `text-xs font-medium uppercase tracking-[0.06em]` — 7 uses on
home (footer column heads "Let's connect", "Stay in touch"; social + legal links), 45 on the case study
(section eyebrows, credit-block heads, award rows). **Monospace: none.** `--font-mono` is only Tailwind's
untouched default and `.font-mono` appears once in 237KB of case-study markup. No mono-serif.

## 3. Palette (from the CSS)
Achromatic in practice, and the accent is a decoy. Top hexes by count:
`#0000` ×20 (transparent), `#1413100f` ×11, `#fafaf8` ×7, `#1a1a18` ×7, `#0000000a` ×6, `#1413100a` ×6,
`#14131014` ×5, `#fff` ×4, `#ffffff40` ×4, `#fff9` ×3 — the whole list is one warm off-white, one warm
near-black, and ~20 alpha variants of those two for borders and scrims.

- Ground: `--color-surface #fafaf8` (warm paper), inverted to `#1a1a18` on case studies.
- Type: `--color-text #1a1a18`; muted `#68665e`; borders `#1a1a181a` (10%) and `#1a1a1833` (20%).
- Accent: `--color-accent-500 #1602ff` and `--color-link #2b53fc` are declared and I found them on no
  rendered type. Rendered accent count on home: **zero**. Color enters only through the work imagery.
- Five named theme scopes exist — `[data-theme=dark|sand|blue|forest|midnight]` — each redefining the
  same seven tokens (`surface`, `surface-alt`, `surface-inv`, `text`, `text-inv`, `text-muted`,
  `border`). `/work/gemini` stamps `data-theme="dark"` on `<html>`. Sand `#e8e2d6`, forest `#0a1a12`,
  midnight `#0a0a2e`, blue `#0c0f1a`. **A per-case-study color world, seven tokens wide, no new hues in
  the chrome.**

## 4. Home first screen
Centered, one assertion, **four words**: "Building for what's next." at 112px. Below it a two-sentence
dek: "We work where legacy collides with the promise of a brighter tomorrow. Creativity orchestrated with
insight, care and scale." Nothing else above the fold — no image, no button, no scroll cue. The work
starts around 900px down.

Nav: a centered floating pill at the top — wordmark `UPPERQUAD` (uppercase, tracked) plus a hamburger
toggle to its right; **four destinations behind the menu** (Work, About, Services, Contact), repeated as
a plain four-item text nav in the footer. Hidden menu on desktop, footer as the real index. The WORK is
not the first screen; the sentence is.

Total home: 10 `<section>`s, 10,848px tall, 160 `<img>`, 1 `<video>`.

## 5. How work is shown
Home: five featured projects — Gemini, Jigsaw, Afresh, This is Bears Ears, Hummingbird — each a media
card in `rounded-2xl` with title, one-line dek, and a literal "View Gemini" link. Five projects land
**before any prose about the studio**. Only after them comes "Orchestrated expertise. Creative
flexibility. Focus on outcomes." and the three services. Above the featured work sits a small uppercase
"New & noted →" row of seven press/award one-liners (Afresh in Taschen, Gemini on Behance, The Current at
the Webbys…), each a single line of text, no logos.

`/work` is a filterable index — filters All / Strategy / Brand / Interactive / Development and a
**Grid ⇄ Flow view toggle** — listing 24 projects; the first four carry a dek, the remaining twenty are
title-only. It closes on an animated-counter sentence, shipped in the HTML as literal zeros:
"Our work has been recognized with 00 Awwwards including 00 Sites of the Day, 00 Webby Awards…"

Aspect ratios in the stylesheet: `1`, `4/5`, `3/4`, `4/3`, `16/10`, `16/9`, `var(--aspect-video)` — six
ratios, so the grid is deliberately ragged rather than one tile shape. Radii: `rounded-xl`,
`rounded-2xl`, `rounded-full`. Hover is a single vocabulary word: `transition-opacity hover:opacity-60`
on links, and on labels a hairline `h-px bg-current` running the `underline-out-in` keyframe.

Case study (`/work/gemini`): 23 sections, 23,135px, **14 `<video>` + 27 `<img>`**, dark theme, full-bleed
media between narrow prose columns. Ends with a fixed four-block tail: **In collaboration with** (every
client-side name listed), **Upperquad's Dream team** (own staff plus named partner studios),
**Press & Awards** (publication + "Featured" + year, nine rows), **Since launch** (two metrics with year:
"Gemini app surpasses 750M monthly active users · 2026"), then **Up next** — five sibling projects with a
"Swipe" affordance.

## 6. Path to business
No CTA button anywhere on the home page. The ask is the footer: `Let's connect` (xs uppercase label) →
`hello@upperquad.com`, beside a `Stay in touch` newsletter field (Netlify form, honeypot labelled
"Don't fill this out:", submit is a bare `→`).

`/contact` is the whole pitch, and it triages by intent into **three mailto addresses, no form**:
- "Work with us — Have a project in mind? Tell us about it, and let's figure out the right approach
  together." → `newbiz@upperquad.com`
- "Drop us a note — For general inquiries, introductions, or anything else on your mind. We're happy to
  hear from you." → `hello@upperquad.com`
- "Work at Upperquad — Creative, curious, friendly & talented?" → `work@upperquad.com`

Headline: "Let's talk." Dek: "Everything starts with a conversation." Then an eight-item FAQ accordion
answering the questions a buyer would otherwise email: How does a project typically start? · How do you
structure project teams? · What's a typical timeline? · Do you work with startups? · How do you think
about strategy vs. execution? · What does your involvement look like after launch? · How do you handle
projects that span brand and technology? · What makes Upperquad different?

**No pricing. No calendar link. No budget dropdown. No form on the contact page at all.**

## 7. Motion vocabulary
Detected in the chunks: **Lenis only** (21 hits in `chunks/691-*.js`, incl. `smoothWheel`, `autoRaf`,
`lenisStopPropagation`, `syncTouch`) — guarded by `matchMedia("(prefers-reduced-motion: reduce)")` in
three separate chunks. **No GSAP, no Three.js, no WebGL, no Framer Motion, no `<canvas>` on either page.**
Scroll behaviour is native-first: `ScrollTimeline` feature-detected in two chunks with
`IntersectionObserver` as the fallback; `position:sticky` appears 5× in the CSS.

Five keyframes exist in the entire stylesheet: `carousel-fill`, `disco-hue`, `glass-sheen`,
`logo-scroll`, `underline-out-in`. Three `prefers-reduced-motion` blocks in the CSS.

What is quiet: no cursor follower, no page-transition library, no parallax rig, no horizontal
scroll-jack, no velocity skew, no video hero. The video is 14 muted inline clips *inside* the case study,
playing the work itself.

## 8. Rhythm
Home: 10 sections — statement (silent, ~900px of air) → seven-item "New & noted" text row → five work
cards (full-bleed media alternating with white gutters) → three-line services claim → three service
blocks → clients paragraph → logo row (`logo-scroll` keyframe) → footer. Case study: 23 sections
alternating narrow prose (~5 lines max) with full-bleed video, then the four evidence blocks, then
"Up next".

Footer is a 12-column grid, **not** a giant wordmark: `md:col-span-3` "Let's connect" + email,
`md:col-span-4` newsletter, `md:col-span-5` right-aligned socials over legal — all xs uppercase
`tracking-[0.06em]`, each with the hairline underline-out-in on hover. The four-item nav sits above it.
The loudest thing on the page is the headline; the quietest is the ask.

## 9. THE BEST PART
**The case-study tail: four fixed evidence blocks in a fixed order — who else was in the room (named),
who on our side did it (named), where it was covered (publication + year), and what happened since
(metric + year).** The Gemini page names ~20 Google collaborators, 7 Upperquad staff, two partner
studios, nine press mentions with years, and closes on "Gemini app surpasses 750M monthly active users ·
2026". No logo wall, no testimonial, no adjective — every claim is a proper noun or a number with a date
attached, set in the same xs uppercase label style as the footer so it reads as a colophon, not a brag.

**Legal for him: yes, and it is the shape his seven receipts are already in.** He has names and numbers
with dates; that is exactly what these blocks are made of. Rows he can fill: "Since" (his metric + year,
straight from the receipts), "In collaboration with" (whoever is nameable, or omit the block entirely —
a missing block reads as honest; a fabricated one is the only failure mode), "Covered" (only if true — he
has none, so that block does not exist). The single anonymous testimonial line fits as one row, once, in
the same label type. What he must NOT import is the "00 Awwwards / 00 Webbys" counter sentence or the
seven-item "New & noted" press row — those are a logo wall by another name and he has nothing to put in
them.

Second-order lesson worth as much: **the type ramp does the loud work so the color does not have to.**
One 112px display line, a body size that moves 1.7px across all viewports, everything else at
xs-uppercase-tracked, and a declared accent (`#1602ff`) they simply never spend. A solo site with one
accent has the same problem and the same answer.

## 10. THE TELL
**The hamburger on a 1440px desktop, inside a centered floating pill.** Four destinations — Work, About,
Services, Contact — hidden behind a toggle on a viewport with 1400px of room, while the footer prints all
four as plain text. It is the 2024–26 studio-template default (the pill, the `rounded-2xl` media cards,
the "Building for what's next." futurist abstraction that names no client and no outcome in its four
words). Runner-up tell: the FAQ accordion labelled "Common questions" with a `+` glyph — an eight-item
disclosure widget doing work that eight visible short paragraphs would do better on a page with one job.

## 11. Screenshots
- `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/upperquad-home.png` — 1440×900 viewport, full page clipped to 2700px
- `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/upperquad-work.png` — `/work/gemini`, same
