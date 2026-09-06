# "Room and Ledger" — the winning combination (2026-09-05)

Operator: "Lets take design, animation, everything notes from all the references you have
complied and figure out the winning combination. I want something unique, award winning
looking, premium." Earlier, on the current mock: "love it … i dont like the header for this
one and it does feel less loud than i would want it. also AI font."

A mock, published as an Artifact. Constitution released; facts, anonymity and the claims
ledger are not. **Every visible string is copied verbatim from
`freight/the-receipts.template.html`** (each is verified against the live site). The
verifier diffs text nodes against that file; one new sentence fails the build.

Inputs: three Opus lenses (jury, buyer, counts) over the whole corpus, a type scout with a
rendered specimen sheet, and the two encoded clips (`video/README.md`). Fable ruled.

## 1. The ruling in one paragraph

The man is filmed in the dark half and the ledger is printed in the light half, and the
light travels once between them. Clip A is the ground of the first screen: full-bleed,
fixed, playing at rest, monochrome, already graded down to the espresso the page is made
of, so when the scroll extinguishes it the room does not cut, it stops being lit. No header
exists until the first screen is gone. One display size is used for every display line on
the page, and the face is Anybody, set wide and light, which is loud without being bold.
The page ends on a copper field. Nothing else moves that is not service.

## 2. Type

| Role | Face | Setting |
| --- | --- | --- |
| Display, every display line | **Anybody** (Google Fonts, variable wdth 50–150, wght 100–900) | `--d: clamp(52px, 9.4vw, 136px)`; wght 300; `font-variation-settings: "wdth" 125`; line-height .92; tracking -0.03em; `text-wrap: balance` off (rows are set by hand) |
| Label, the one label style | Anybody | 13px, wght 500, `"wdth" 62`, uppercase, `letter-spacing: .08em`, ink at 60% (100% when it is the current item) |
| Text | Hanken Grotesk 400 (500 for metadata keys only) | 17px/1.5 body, 21px/1.35 lede; measure ≤ 40ch |
| Data (prices, figures, ordinals) | Anybody, `font-variant-numeric: tabular-nums` | same size as the surrounding role |
| Mono | **none** | JetBrains Mono retired in this direction (jury, counts, darkroom §10) |

Load: `https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,300;50..150,500&family=Hanken+Grotesk:wght@400;500&display=swap`
(the scout confirmed 200 + @font-face for Anybody with both axes). Fallback stacks declared.
Bricolage, Instrument Serif/Sans, Inter, Space Grotesk, Syne, Unbounded are banned here.

The hero row `go-to-market.` at wdth 125 must fit the content width at 1440 (1376px) and at
390 (350px) without wrapping or clipping. If it does not at 1440, the builder drops wdth
to 115, never the size. The verifier measures both.

## 3. Grounds and colour

- `--espresso #0D0D0F`, `--bone #F5EFE4`, `--copper #C8542B`. Ink on espresso is bone; ink
  on bone is espresso. Strokes are ink at 15%; card borders ink at 4%.
- One fixed sheet, `position:fixed; inset:0; z-index:0`, background
  `color-mix(in oklab, var(--espresso) calc((1 - var(--p)) * 100%), var(--bone))`.
  `--p` is written from scroll: 0 at the top, reaching 1 when the reading line (55vh)
  crosses the top of the rail section, and it never goes back below its section value on
  the way up (the light does not flicker). No section declares a background. Transition
  `background 700ms cubic-bezier(.4,0,0,1)`.
- The ask section is the exception and the only place copper is a ground: a full-bleed
  copper field with espresso type. The foot after it is espresso with bone type.
- Copper on type: the noun `go-to-market.` in the hero, and nowhere else. Copper otherwise
  only in the `→` glyph, the 1px seam rules, the row wipe and the ask field.

## 4. The page, in order

**00 — The bar (no header on screen one).** `position:fixed; top:0; height:40px` (44px
below 900px); `opacity:0; pointer-events:none` while `scrollY < innerHeight`; released to 1
over 300ms on the house curve, then never hides, shrinks or moves. Background
`var(--ground)` (the same sheet colour), `border-bottom: 1px solid` ink at 15%. No blur,
no glass, no blend mode. Five items in the one label style justified edge-to-edge
(`justify-content: space-between`, 32px side padding, 20px at 390), NO logo-left/menu-right
cluster: `MICAH JONES` · `RECORD` · `PLAYBOOK` · `PACKAGES FROM $500` · `NAME THE PROBLEM →`.
Below 900px only the first, fourth and fifth show. The `→` is copper; nothing else in the
bar is.

**01 — The room (hero).** `min-height: 100lvh` (min 720px). Clip A is a `<video>` at
`position:fixed; inset:0; width:100%; height:100lvh; object-fit:cover; z-index:0`, above
the ground sheet, below everything else, `object-position: 60% 30%` (his face; the verifier
confirms the face is in frame at 390). Attributes: `autoplay muted loop playsinline
preload="metadata" poster="{{A_poster}}" aria-hidden="true"`; sources: WebM then MP4 (data
URIs, see §7). Over it a fixed gradient sheet: transparent at the top 15%, espresso at 55%
opacity by 60%, solid espresso at 100% (VIDEO-BRIEF §1). Film opacity `calc(1 - clamp(0,
var(--p) * 4, 1))`: gone by p ≈ .25, during section 02.
Composition at 1440: the top half of the screen is the film and nothing else (the void is
the man in the room). Bottom-left, above the fold line by 64px: the headline, two rows,
`I build the` / `go-to-market.` at `--d`; under it the positioning sentence (the template's
hero sentence, 21px, ≤ 40ch); under that the chip pair (`Name the problem →` primary: bone
chip, 44px, with a 44×44 copper square-arrow chip bolted on; `See the packages` secondary:
ink at 12%). Bottom-right, baseline-aligned with the chips: the dated proof row from the
template (Guardicore · years · figure) in the label style. Headline contrast: the verifier
samples the composited luminance behind every glyph run of both rows at loop frames 0, 96
and 192 and reports the lowest contrast ratio; it must be ≥ 4.5:1 or the gradient's 60%
stop darkens until it is.
At 390: the same order, film full-bleed behind, headline at `--d` minimum 52px, rows must
not wrap; chips stacked; proof row last. Nothing here animates in: it is simply there.

**02 — The record (proof at position two).** Section head from the template with `07` in
the label style. Spotlight over index: the three promoted rows (Guardicore, Postmates, the
industry author's book, as the template names them) at `--d`, ordinal beside each in the
label style; the four remaining rows in the text size on hairlines. Hover on a row: a 1px
copper wipe `scaleX(0→1)` 400ms and the row's artifact (the template's images) fading in
at the right margin; rows without an artifact show only the wipe; on touch the artifact
is always shown. Zero logos; names are text. The film finishes extinguishing across this
section, so the ground here is espresso.

**03 — The person (clip B).** Two columns at 1440, stacked at 390. Left, cols 1–5: clip B
in a square panel, no frame, playing at rest with the same attributes as A, `object-fit:
cover`, held still: no parallax, no hover state, no scale. Right: the template's person
copy (display line at `--d`, the names-as-text paragraph, the § lines). Espresso ground.

**04 — The seam.** Not a section: `--p` reaches 1 here and the sheet turns to bone over
700ms. The bar turns with it because it shares the property.

**05 — How I work (the rail, service).** `position:sticky; top:140px` left column holding
`01 Diagnose / 02 Build / 03 Position` at opacity .42, each lighting to 1 over 300ms as its
panel crosses the reading line; the three panels on the right with their template copy and
images (page 6, the pre-flight card, page 51).

**06 — The manual.** The cover in a dashed 1px frame captioned with the template's file
line so it reads as the artifact being produced; the label, the display line at `--d`, the
symptom lines, the chapters paragraph, the price and the buy chip, all from the template.

**07 — The numbers.** Four equal cards, borders ink at 4%, one figure each at `--d`,
tabular, each with its asterisked footnote naming what it is measured against, from the
template. Nothing on the screen is bigger than the figures.

**08 — The price, with the objection beside it.** Two columns at 1440, stacked at 390
with the price first: the five priced rows on hairlines, prices tabular at the text size ×
1.6; the three live FAQ answers in the buyer's words on the right. All from the template.

**09 — The ask.** Full-bleed copper field, one screen tall. `Name the problem.` at `--d`
in espresso, the `→` in its own span so it does not scale, 220px of air above and below at
1440 (120px at 390). The chip pair returns inverted: espresso chip with a bone arrow chip.
The whole block goes to opacity .8 on hover, nothing else.

**10 — The foot.** Espresso. One row in the label style: email, the reply promise, the
copyright range, exactly as the template has them. Nothing over 24px.

## 5. Motion, in total

Lenis smooth scroll (12/14; native scroll and no motion if it fails to load). The
extinguish and the ground travel on one property (`--p`, written in a `scroll` listener
with requestAnimationFrame, never a scroll-jack). The bar's opacity reveal. The rail's
opacity. The row wipe and artifact fade. Transform-only entrances declared in markup
(`data-rise="10"` on media, `"30"` on rows; 500ms, house curve, once, ≤ 400ms delay,
picture before claim). The two loops. **Zero @keyframes. No GSAP, no three.js, no cursor,
no marquee, no split text, no counters, no parallax, no Ken Burns.**
`prefers-reduced-motion: reduce`: both videos `display:none` and their posters shown; no
Lenis; no entrances; the ground travel becomes a hard switch; the bar shows at once.

R12 / R15 ruling for the record: a filmed loop of the operator is the photograph moving,
not UI animation; R15's idle-motion clause (pulsing dots, marquees, looping gradients)
does not reach it. The reduced-motion branch is the R15 discharge.

## 6. Loudness, exactly

Scale (one display size, 96px → 136px, used for every display line); the human at 100lvh;
the void made of the film; the copper field at the close. Nothing heavier, nothing more
colourful, nothing new moving. That is the whole loudness budget.

## 7. Build

`winning/room-and-ledger.template.html` + `winning/build.py` (copy `freight/build.py`,
extend: inline the six `mock-assets/*.jpg` AND `video/A-loop.webm`, `video/A-loop.mp4`,
`video/A-poster.jpg`, `video/B-loop.webm`, `video/B-loop.mp4`, `video/B-poster.jpg` as data
URIs; print the total; must stay under 12MB). Output `<scratchpad>/room-and-ledger.html`.
First line `<meta charset="utf-8">`; content-only HTML (no doctype/html/head/body: the
Artifact tool wraps it); `<title>Room and Ledger</title>` at the top. CSP: scripts only
from cdnjs/jsdelivr (Lenis 1.3.4 from jsdelivr), stylesheets only from Google Fonts,
everything else inline or data URI. Single-theme by design: paint every colour explicitly.

## 8. Verification (the builder runs it; the verifier re-runs it independently)

Playwright, Chromium, the built file via `file://`:
1. 1440×900 and 390×844 full-page screenshots to the scratchpad (`rl-1440.png`,
   `rl-390.png`) plus a 1440 viewport-only shot at scrollY 0 and at scrollY 1.5×innerHeight.
2. `document.documentElement.scrollWidth <= innerWidth` at 390 → true.
3. Each hero row: `getBoundingClientRect().width` < content width and
   `getClientRects().length === 1` (no wrap) at both sizes.
4. Bar: `getComputedStyle(bar).opacity` is "0" at scrollY 0 and "1" after scrolling past
   innerHeight and waiting 400ms.
5. `document.querySelectorAll('video').length === 2`; each has muted, loop, playsinline,
   poster, and two `<source>` children; `readyState >= 2` after 3s.
6. Composited contrast under the headline at frames 0/96/192: report the minimum ratio;
   pass ≥ 4.5.
7. `@keyframes` count in all stylesheets === 0; `gsap` absent; `mix-blend-mode` absent.
8. Copy gate: every text node (trimmed, non-empty) in the built page exists as a
   substring of the text of `freight/the-receipts.template.html` (script/style stripped),
   except the five bar labels and the title. Report every miss; zero misses passes.
9. Copper count on the first screen at 1440: elements whose computed colour or background
   is `rgb(200, 84, 43)` in the viewport at scrollY 0 → ≤ 4 (noun, arrow chip, seam
   rules).
10. Fonts: `document.fonts.check('300 20px Anybody')` true; no `Bricolage`, no
    `JetBrains` in any computed font-family.

## 9. Rejected, with the build that rejected it

The floating blurred pill and any backdrop-filter chrome (antinomy §10); the mix-blend
header and headline (muddy over monochrome film); the reach-to-reveal blind on the hero
(withholds the clip the operator generated to be seen; on phones it becomes a tap); a
second clip in the hero; a dashed frame around the person (frames are for artifacts, tambo
§3); WebGL/3D (lore §11); a frame sequence (viture §11); logos, marquees, tickers,
preloaders, gates, counters, cursor effects, split text, magnetic buttons; mono anywhere;
Instrument Serif (proposed by the buyer lens; it is on the AI-tell list); grain overlays;
any new sentence.

## 10. Return conditions (stop and report instead of guessing)

A hero row that cannot fit at wdth 115 at either size · contrast under 4.5:1 that the 60%
stop at 75% opacity does not fix · a copy-gate miss · the built file over 12MB · Anybody
failing `document.fonts.check`.
