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
- **AMENDED, Pass-104b §5, 2026-09-08.** The packages section is a THIRD named exception.
  Asked directly whether to ship the safe poster-only pick or reverse this rule for a
  full-bleed espresso band under the three cards and Engagements, the operator chose,
  verbatim: "Reverse the rule, build the band." It is an exception, not a repeal — no
  other section may declare a ground on the strength of it. Recorded in full, with the
  amendment's reasoning (the Audit's copper border moves from 3.85:1 on bone to 4.41:1 on
  espresso) and the re-measured text-contrast ledger, in `.claude/CLAUDE.md` and
  `.planning/qa/pass-104b/verification.md` under "Section 5 — packages."
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

## 11. Rulings after verification (Fable, 2026-09-05, three verify rounds)

- **Copper row contrast.** `go-to-market.` in copper on solid espresso measures 4.37–4.40:1
  at every frame; that is the accent's ceiling on this ground, not a tuning failure. The
  4.5 threshold in §8.6 was written for bone over film. Ruled: the copper row passes at
  ≥ 3:1 (large text, per the constitution's own WCAG rule); the bone row keeps 4.5.
- **Width axis on phones.** At 390 `go-to-market.` cannot fit at wdth 115 at the 52px
  floor. Ruled: the width axis is the lever all the way down (106 at ≤479px, 98 at
  ≤359px); the size never drops below the clamp. §10's first return condition is retired.
- **The veil.** Solid espresso from the 56% mark so both headline rows sit on flat
  espresso; the film carries the top ~45% at 1440. Accepted over the §3 stops. At ≤899px
  the veil goes solid earlier (opaque by 36%) so the second row's tail is never over lit
  film.
- **The person section.** "cols 1–5" read as grid lines 1→5 (four columns); the display
  line sits in the right column and needs eight columns to hold `consultant.` at `--d`.
  Accepted. Below 1280px the section stacks.
- **The numbers.** A 2×2 grid at 1440 (a single row of four cannot hold the two-line
  figures at one display size). Accepted. No min-height reservation: the footnote follows
  the figure at 24px; cards in a row share height through the grid.
- **The bar over the copper field.** SUPERSEDED 2026-09-06 (v3 verify 2): copper with
  espresso labels measures 4.40:1 at 14px, below AA. The bar over the ask paints
  **espresso with bone labels** (≥ 5.5:1 measured); the arrow is bone. Not copper, not bone.
- Also fixed in the final round: proof row baseline-aligned with the chip text at 1440;
  the price column's suffixes (`START HERE`, `AT LAUNCH`, `A MONTH`) set on their own line
  under the figure so all five figures are flush right; the manual's label precedes its
  display line; the rail sticks at 140px.

## 12. Astra's review (2026-09-05, one call at ultra), verified, and the rulings → v2

`reviews/CODEX-ROOM-AND-LEDGER-2026-09-05.md`. Eight of its premises were checked against
the template before any ruling; all eight held (price rows are divs; `--ink` and `--ground`
are the same mixture at p=.5; `100lvh`/720 hero; `.ask:hover` dims the block; `data-rise=30`
on 15 text rows; bar reveals at a bare innerHeight; no IntersectionObserver; no off-screen
pause). Its jury verdict: not SOTD as it stands; first juror comment the stranded "not" in
the person heading; the tell is one composition applied regardless of content.

**Accepted into v2 (Fable):**
- Two display sizes, not one. `--d` (poster: hero, the three record names, the ask) and
  `--d2: calc(.76 * var(--d))` (the person heading, composed "Operator," / "not consultant."
  at wdth 115; the four figures). The one-size rule came from 1/14 builds; Astra is right
  that it had become a constraint on judgement.
- Labels 14px, wdth 80, tracking .04em, weight 500; metadata 14/20 at 80% ink; number
  footnotes as reading text (Hanken 16/23, 80% ink, ≤ 34ch). Printer's marks no more.
- Hero on `100svh` with content-driven min-height; no 720px floor; at 390 the proof row
  ends above the fold. The full-bleed film at 390 stays (Astra's 360px stage rejected).
- Price rows are links (three services → /packages, the manual → /playbook, engagements →
  /call), grouped 3 + 40px + 2, min height 80/96, prices 32px, copper rule on hover and
  focus.
- Both videos pause off-screen (IntersectionObserver); B starts at ≥ 35% visible. Veil at
  40% tried at .55 (from .75) gated by the bone row ≥ 4.5 across frames; solid stays at
  56%. B's grade starts below 65% height.
- Numbers at `--d2`, two columns from 1280 up, explanation 20px below, rules 10% ink, the
  first figure of a comparison at 65% ink and the result at 100%.
- Bar: desktop reveals when the hero chips pass under its bottom edge (180ms); ≤ 899px a
  48px bar from first paint with `MICAH JONES` and `PACKAGES FROM $500`; 64px anchor
  clearance.
- Ink switches hard at p=.5 (text never inherits the mid-mixture) while the ground travels;
  mobile rail pairs each heading with its artifact (all headings opacity 1); `data-rise`
  removed from text (media keeps 10); section entry air 96/56.
- The ask: the heading is the link to /call; the block hover removed; field ≥ 720px at
  1440 with 112/96 padding, 48px to the chips, the arrow 56px on the baseline; 390: 88px
  padding, 64px heading, 48px controls.

**Parked for the operator:** (1) Astra #1, offer before proof: move price + FAQ to
immediately after the hero. Fable recommends keeping proof at two (corpus 6/14) with the
price in the mobile bar from first paint. (2) Astra #6, forward-then-hold instead of the
ping-pong loops. Fable recommends keeping the loops; hold B only if the reversed
conversation reads wrong to him.

## 13. Operator decisions (2026-09-05, after Astra) → v3

Verbatim: "i like the breakdown on how i work (we need way better images, lets brainstorm
what to put there instead of the screenshots of the book). then pricing packages and a
small part for engagements on top before the packages, then proof then playbook and then
faq. I ike the idea of the video stopping. I also like the idea of the video blending more
into the hero. maybe having my handpointing to the go to market part and it stopping - make
sure things looking good on mobile too. I think the video of me talk should be looped and
maybe blend it with the operator not consutltant thing more. not like its own portrait."

**Order (v3).** 01 The room (hero, clip A) → 02 Operator, not consultant (clip B as the
section's ground, not a portrait) → 03 How I work (the rail) → 04 Engagements, small, above
05 Packages (the three priced rows) → 06 Proof (the record + the four figures) → 07 The
manual → 08 FAQ (the three answers, now their own section) → 09 The ask (copper) → 10 Foot.
Astra #1 is therefore settled by the operator: offer before proof. The FAQ moves off the
price and closes the argument.

**Clip A: forward once, then hold** (Astra #6, accepted by the operator). Play on load, no
loop, hold the last frame; the poster is the LAST frame. Pause/resume off-screen still.
"Hand pointing at the go-to-market part": with the current clip this cannot be composed
honestly. He points up-right at the board; the headline lives bottom-left; any placement
of a 1127px headline in the upper half crosses his head (viewport x 730–810 at 1440), and
mirroring the clip mirrors the handwriting on the board. At 390 the pointing hand leaves
the frame entirely (the visible slice is source x ≈ 867–1342; the hand ends at ≈ 1700).
So: **regenerate clip A** with the gesture aimed at the headline's corner and the hand
kept near the body (in frame on phones). Kling 3 Pro, same settings as §4 of the video
brief, 5 s, colour master this time (feed `A-whiteboard-16x9.jpg`, not the treated poster):

```
A man sits at a laptop. He looks up at the camera, raises his right hand and points
toward the lower left corner of the frame, and holds the point. The whiteboard
stays still. The camera does not move.
```

Fallback if the model mirrors left and right (it sometimes does): "points toward the left
edge of the frame". Judge on the face and the hand; the point must end in the frame at a
3:4 centre crop. Until the new clip exists, v3 ships the current clip forward-then-hold.

**Clip B: loop, blended into the operator section.** Not a framed portrait: clip B becomes
the ground of section 02 the way clip A is the ground of 01, full-bleed within the
section, veiled to espresso from 55% down, the heading "Operator," / "not consultant." over
the dark part, the paragraph beside. Loops. Pauses off-screen. At 390 the section is one
screen: film top, heading and first paragraph bottom.

**How I work: the images.** The three book pages come out. Brainstorm, three tiers, no
stock, no illustration, nothing generated that is not his own material:
- Exists today: 01 Diagnose, the real whiteboard, cropped from the hero photograph (his
  own service diagram, the diagnosis drawn on a wall); 02 Build, an Ordani screen he
  shipped solo (`public/ordani-*.jpg`, the intake flow that went 40%→91%); 03 Position,
  the Tel Aviv room (`public/guardicore-telaviv.jpg`, the wider frame) or the site's own
  hero line as the artifact ("the positioning line I shipped for myself").
- He shoots on a phone (a shoot list, one evening): 01 him standing at a whiteboard,
  marker up, 3:4, from the side; 02 a 6-second screen recording of Ordani's intake flow,
  the phone in his hand; 03 a real positioning one-pager on a desk, redacted, or him
  writing the line on the board.
- The bold system, "three rooms": each step is him in the room where it happens, three
  stills (whiteboard / laptop / table), one of them moving. Costs one new photograph (the
  whiteboard stand) and reuses the two he has. Risk: with clips A and B already moving,
  a third motion is the corpus's noise line; the three would be stills.
Fable recommends the "three rooms" as stills, with the Ordani screen recording as the one
exception if he records it. v3 ships the exists-today tier so the page does not wait.

**Proof, minimalist (added the same evening).** Verbatim: "also we need more a minimalist
approach with some figures. We do not have to put specific figures for the stuff. Also
captions and little things like years. we want to entice people to click to see stuff."
So section 06 is an index that entices, not a ledger that tells: each row is name · year ·
one caption · `→`, and the row is a link to its case study or record. The four-card
numbers section is retired; at most two figures survive, inside captions, as bait ("40%
→ 91% intake completion · 2025"). Captions and years are the live case studies' own
frontmatter (`content/work/*.mdx`: `title`, `dek`, `year`, `role`), verbatim, which
widens the copy gate to a second verified source; nothing else is written. Dragonfly §10
(names as text, year, one line, the ask as an address) is the precedent.

**Mobile.** Every v3 section is judged at 390 first: the film's face in frame, the hero's
proof above the fold, one screen for section 02, the engagements strip one row, the
packages three rows, the FAQ readable at 17px.

## 14. Operator review of v3 (2026-09-06) → v4

Verbatim: "The vid does not point to the actual go to market part. You should have the vid
be the background with the i build the go to market positioned perfectly to be pointed at.
also teh same thing for the operator not consultant vid. I want overlay, so the video is a
direct focus. The pics for diagnose being the white board pic and then two pics of me is
for the other two is bad. What would be a better thing to put there? Examples from the
collection of sites you looked? The list of packages and engagements look very unorganized.
I like the previous structure - but defintely look for examples for the sites you looked at.
Needs to be less underwhelming. Same thing with the rest of the things - looks really nice
but underwhelimg. ALso i mentioned on top of the chat that I want to remove years and
specific numbers like the REv number. Just say things like millions and do not need to
specify when i did things"

**14.1 The hero is a stage, and the words sit where the finger ends.** The hero becomes a
fixed-aspect 16:9 stage: width 100%, height = width × 9/16 (1440 → 810px; 1920 → 1080px),
the film filling it exactly (no cover crop, so source coordinates map 1:1 to the box). The
builder measures the fingertip on `A2-poster-last.jpg` (the leftmost skin pixels of the
pointing hand; Fable's estimate from the v3 render is source ≈ (457, 402) of 1920×1080,
i.e. 23.8% across, 37.2% down) and positions the headline block so the cap-top of
`I build the` sits 12px below the fingertip's y and its left edge at the gutter (32px),
with `go-to-market.` on the row beneath. The point lands on the "I". The positioning
sentence, chips and proof row sit below the headline inside the stage; whatever does not
fit inside the stage at a given width goes directly under it on espresso, never
bottom-anchored to the viewport again. The veil is re-tuned to the stage: solid espresso
from the headline's cap-top down, .55 at the fingertip's y, clear above 25%. The bar
overlays the stage's top. At ≤ 899px the stage is still 16:9 full width (390 → 219px tall)
with the same 1:1 mapping, and the headline block starts right under the stage, so the
finger points down-left at it; if the film at 219px is too small to read, the builder may
use a 4:3 crop of the SAME source region (object-position such that the hand and face
stay inside; measure) up to 292px tall. No other mobile composition.

**14.2 The operator section is an overlay.** Clip B (1440×1440) becomes a square stage:
at ≥ 900px a two-column section where the film fills the left 7 columns as a square and the
heading "Operator," / "not consultant." at `--d2` is set OVER the film's lower third on a
veil (solid espresso by 70% of the square's height, .6 at 50%), the first paragraph
directly under the heading still on the film, and the second paragraph + § line in the
right 5 columns, top-aligned with the film. At ≤ 899px the film is a full-width square
(390×390) with the heading over its lower third and the paragraphs under it. The film is
the focus: no band above, no heading below the frame.

**14.3 No years, no specific figures (operator ruling).** Every year and every specific
figure leaves the mock: the hero proof row becomes `Guardicore · acquired by Akamai`; the
index rows carry no years and no "since"; captions with figures are replaced by
figure-free verified sentences, and where none exists the ONLY permitted rewrite is the
figure → magnitude word, listed exhaustively: `$14M in revenue` → `millions in revenue`;
`$3M in contracts won` → `millions in contracts won`. Nothing else may be composed.
`From $5K a month` and the three package prices stay: they are prices, not receipts. The
$99 stays. The copy gate gains exactly those two rewrites. The voice rule ("named
numbers") is overruled on this surface by the operator; the case studies keep the numbers.

**14.4 Underwhelming, diagnosed.** v2/v3 demoted every section head to a 14px label, so
the light half lost its poster rhythm; the corpus's product register opens every section
with a display line. Restore: every section head at `--d2` (`Three fixed prices. Start
this week.`, `The receipts. Every line below is real.`, `The objections, in your words.`,
`Operating principles · How I work.` as the template has them), the label style kept only
for eyebrows and metadata. Index row names at 28px; FAQ questions at 28px, answers 19px;
captions 19px. Section entry air back to 120px at ≥ 900. Two display sizes remain the
rule; nothing at `--d` except the hero and the ask.

**14.5 Packages and engagements: three cards, then one bar** (from
`research/CORPUS-PRICING-SECTIONS.md`: tambo §8's geometry, cora §10's framing; the
complaint was a rank problem, five offers reading as five peers when only three are).
- Section head at `--d2`: `Three fixed prices. Start this week.` with `Fixed.` as the
  eyebrow.
- Three cards in a row at ≥ 900px (each = (content − 48px) / 3), 24px gap, no border, no
  shadow, no fill; a single 1px hairline (ink 12%) under the price block of each. Card
  interior, five parts and no more, 24px padding: the package name as the label-style
  eyebrow (`The Unstick Session` / `The Audit` / `The Sprint`) · the price at 64px, Anybody
  300, `"wdth" 106`, tabular, letter-spacing −0.02em · the unit/suffix in the label style at
  60% ink on the price's baseline (`Start here` on the Audit only) · the row's one sentence
  from the template at 17px/1.5, max two lines · the CTA chip (primary, 48px, full card
  width) linking to /packages?from=mock-price. The Audit card alone carries a 1px copper
  border and nothing else (athenahq §3's hairline; no ribbon, no claim).
- Hover/focus on a card: the chip's ground swaps to copper in 300ms; nothing lifts; 0ms
  under reduced motion.
- 32px beneath the cards, ONE bar, full content width, 104px tall, 16px radius, espresso
  ground with bone type (on the bone half): the sentence `Engagements · advisory, project,
  retainer, or embedded.` at 19px left, and `From $5K a month` in an outlined copper pill
  (1px copper border, copper text, 44px tall) flush right, the whole bar a link to
  /call?from=mock-engagements. Never a fourth price slot.
- The $99 manual stays in section 07 only.
- At ≤ 899px the cards stack full width, price at 52px, the bar becomes a 2-row block
  (sentence, then the pill) with the tap target kept.

**14.6 The rail's panels: real artifacts, or type; never a photograph of him.** The
headline finding in `research/CORPUS-METHOD-SECTIONS.md`: 0 of 14 builds put a photograph
of the founder, the team or the workspace in the method section; 9 of 14 run typographic
panels, 4 crop the product's own output into one soft frame, 1 redraws the system diagram
in live type. Ruling, per panel:
- 01 Diagnose → the manual's page-6 diagram REDRAWN in live type and SVG (boxes, hand-curved
  arrows, capsule labels in the label style), the `<WallChart />` subject at panel scale;
  the builder ports the geometry from `components/WallChart.tsx` if it is SVG, else redraws
  it from `mock-assets/wallchart.jpg` as boxes + arrows. Static; no animation in the mock.
- 02 Build → one real screen of the shipped CRM in one soft frame (bone card, 16px radius,
  no device chrome), IF a real product screenshot exists in `public/` or `content/`
  (the builder inventories and reports; `ordani-intake.jpg` is a photograph, not a screen).
  If none exists: a typographic panel (label, the step's one sentence at 28px, a § code,
  hairline) per pattern D, and the slot is named as the place the screen goes.
- 03 Position → typographic panel: the positioning sentence the site already runs
  (`Strategy and software, shipped by the same pair of hands…`) set at 28px as the artifact,
  with the label `Position` above and a hairline; the RFP engine's real output replaces it
  when he supplies a redacted page.
All three panels share one frame geometry and one ground; a missing artifact is a
legitimate variant, not a hole (growthloop §11).

**14.7 After v4 verify 2 (2026-09-06): the words go to the finger.** Measured fingertip on
the hold frame: source (372, 413) = 19.375% across, 38.24% down; the finger points left
and slightly up. v4 pinned the headline's left at the gutter, so the tip landed 209px right
of the "I". Ruling: the headline block is positioned by the fingertip on both axes:
`left = fingertip_x − 48px` (the "I" glyph sits one hand's width left of the tip, so the
finger points at it), `cap-top = fingertip_y + 4px` (the row's centre at the tip; the
double-applied 12px correction is removed). The positioning sentence and chips share that
left edge; the proof row stays right. At 1280/1440/1920 the "go-to-market." row must still
end ≥ 32px inside the stage (drop wdth to 115 then 106 if not). At ≤ 899px the 4:3 stage
is cropped at `object-position 0% 50%` (source x 0–1440 visible) so the fingertip lands at
≈ 26% of the stage width; the headline is OVERLAID on the stage there too (two rows at the
52px floor, wdth per the ladder, "I" at fingertip_x − 40px, cap-top at fingertip_y + 4px,
veil solid from the cap-top down); sentence, chips and proof under the stage. The face
(source x 1010–1290) stays in frame at that crop. This is the composition at every width:
the words are where the finger ends.

Also from verify 2: the operator heading stays at `--d2` and drops to wdth 106 to fit the
square (no third display size); the operator veil reaches solid at 82% (.6 at 62%) so film
shows behind the heading's top; the operator right column's rows take their own height;
the price cards' text aligns to the section gutter (the row offset −24px so content sits
at 32px; at ≤ 899 the Audit's mark is a 2px copper left rule, not a box, so nothing
bleeds); the card chips read the live /packages button labels verbatim (`Buy the Unstick
Session →` / `Buy the Audit →` / `Buy the Sprint →`, a third verified source:
`app/(foyer)/packages/page.tsx`); index captions take an initial capital (the only
permitted case change); the FAQ head takes its terminal full stop; the middot in
`Operating principles · How I work.` is kept with the word after it in a nowrap span;
panel 01's `THE WALL` capsule gets a leader and the 390 overlap is cleared.

**14.8 After v4 (2026-09-06).** Operator: "its not loaded for me. also you do not need to
have random captions like the guaridocore acquired by akami thing. Just put somewhere the
5 billion of exits i have helped with." Rulings: the hero proof row is the template's
verbatim `Four exits, $5B+ combined.` and `$5B+` is the single named exception to §14.3;
no other caption is added to the hero. The published page (5.2MB, v4 HTML confirmed served
by a fetch through Fable's own session) did not load for him: the clips are inlined at
720p only (webm and 1080p dropped, target ≤ 3.5MB), every inline script is guarded, and
the headline lands at the finger from CSS defaults alone, verified with JavaScript off.

## 15. Operator review of v4.1 (2026-09-06) → v5

Verbatim: "i see no vids and the structure of the book section and the objections part
still look bad. The cards to the right of diagnose and build etc look horrible. The part
showing pckages could look a little more prounonced and visually enticing. Engagements is
the highest paying form - so maybe make that special looking instead of underwhelming but
still connected with the packagers. consolidated the receipts part and show two and offer
to see the rest. guardicore RFP engine. For the book the image didnt load. WE NEED TO have
a round for all the wording and also - did you create the pages for the existing websites
pages in this version? i click on the stuff and it takes me to the active sites version of
that page" + "the wording round will be using the data from the other reddit data scraping
sessions data".

**15.1 The clips.** The account has no asset capability (contract 0.2.41: artifact, db,
downloads, mcp, room, sample, self), so clips can only travel as data URIs. A diagnostic
artifact ("Clip Test") plays the same 160KB clip three ways with a readout; the operator's
answer decides the mechanism. Meanwhile v5: `preload="auto"`; on the first user gesture
(pointerdown / touchstart / keydown / wheel) call `play()` on the hero if it has not
ended and on the operator clip if ≥ 35% visible, in addition to autoplay; posters stay the
fallback. If the readout shows data-URI media refused, the fallback is the poster and the
clips move to the live-site build.

**15.2 The manual (07), recomposed.** Two columns at ≥ 900: LEFT cols 1–5 the cover filling
the column at 4:5 inside the dashed frame, the file line under it (the cover JPEG is
720×1018 and decodes; the builder verifies it renders in Chromium). RIGHT cols 6–12: the
label `The 80% Wall`, the display line at `--d2` (never `--d`: it out-shouted the hero),
the three symptom lines as a hairline ledger at 21px, the chapters paragraph 19px, then
the buy block: `$99` at 64px, `at launch`, the chip `Get chapter one free →`. At 390: cover
first, full width, then the copy.

**15.3 The objections (08), recomposed.** Head at `--d2`; the three Q/A as THREE COLUMNS at
≥ 900 in the price cards' geometry ((content − 48)/3, 24px gap): hairline top, question
24px/1.2 Hanken 500, answer 17px/1.5 at 80% ink; stacked at 390 with 40px between.

**15.4 How I work (03): no cards.** The three panels are removed and the section becomes a
full-width ledger: head at `--d2`, then three rows, each: ordinal in the label style · the
step name at `--d2` · its one sentence at 21px (≤ 46ch) in the right half; hairlines
between; no frames, no images, no sticky rail. The page-6 SVG leaves the section. The slot
for the "three rooms" clips is recorded, not shown.

**15.5 Packages, pronounced; Engagements, the top tier.** The three cards get a ground: 1px
border (ink 15%), 8px radius, 28px padding; the package name at 24px Hanken 500 (not the
14px label); the price at 72px; the sentence 17px; the chip full width. The Audit: a 2px
copper top rule and `Start here`, instead of the full copper box. Then Engagements as a
full-width espresso block, same width as the cards row, 24px below, 16px radius, a 2px
copper top rule, min-height 220px: left `Engagements` at `--d2` + `advisory, project,
retainer, or embedded.` at 21px; right `From $5K a month` at 64px (bone) + the chip `Name
the problem →` (bone block, copper arrow). The whole block one link to /call. Stacked at 390.

**15.6 The receipts, consolidated.** Two rows only: Guardicore and the RFP engine (name 28px,
caption 19px, arrow), then a third row-shaped link `See the rest →` (the operator's own
words, recorded as operator-supplied copy) to https://www.micahjonesconsulting.com/work
?from=mock-proof. The head stays.

**15.7 Sub-pages.** None exist in this design; every link goes to the live site on purpose.
The click-through build (packages, playbook, work, call in the new system) is the next arc
and belongs on a branch with a Vercel preview, not in a mock. Operator decision.

**15.8 The wording round** follows this structural round: the Reddit research
(`.planning/research/01-REDDIT-EVIDENCE.md`, the attested phrase bank, the scraping app's
data) + the copy-editor + the claims ledger; every proposed string is put to the operator
before it enters the page; the copy gate then widens to the approved list.

## 16. Operator review of v5 (2026-09-06) → v6 and the site arc

Verbatim: "1. 1st one moves. the website it still is not angled right to the point i point at
the go to market. the vid in the header 2. idk but i see it has loaded now 3. Well arent
you going to build the other pages in this style? 4. Lack of animations and weak ones that
exist. FYI I love website animations need more"

**16.1 Clips settled.** The viewer plays data-URI video and autoplays it (player 1 moved).
The hero's hold frame was read as a still. Keep data URIs; the gesture handler stays.

**16.2 The point lands on `go-to-market.`** The copper row's cap-top sits 4px under the
fingertip and its left edge one hand's width (48px) left of the tip; `I build the` sits on
the row ABOVE, over the film, bone on the veiled wall (≥ 4.5:1 measured at three frames).
The veil: .55 at fingertip_y − 12px, solid from fingertip_y + 4px (the copper row's ground);
the hand emerges from the dark and its tip touches the "g". At ≤ 899px the same rule inside
the 4:3 stage, the stage starting below the 48px bar (in flow, not under it); the builder
measures that row 1 clears the bar. Everything else in the hero as v5.

**16.3 Motion, widened (operator ruling: "I love website animations, need more").** The
corpus's one-moment discipline is overruled by the client; the vocabulary stays premium
(transform/opacity/clip-path, the house curve `cubic-bezier(.4,0,0,1)`, nothing coupled to
the cursor, no scroll-jack, no marquee, no parallax on photographs, ≤ 3 `@keyframes`,
everything off under reduced motion). The set, in full:
1. THE MOMENT: the copper word lights when the fingertip arrives. `go-to-market.` rests at
   opacity .28 and fills to 1 over 260ms on the house curve, triggered by the clip's
   `timeupdate` when currentTime ≥ the arrival time (the builder measures the frame where
   the tip reaches its final x: ~3.4 s) and by the hold frame if the clip is already past
   it. `I build the` rises 24px into place over 600ms as the clip starts. Once lit, it
   stays lit.
2. The bar: slides down 12px + fades in at the seam (240ms), never again.
3. Section heads: a clip-path reveal from the left (`inset(0 100% 0 0)` → `inset(0)`,
   700ms) as the head crosses the reading line, once each.
4. Hairlines draw: every ledger rule (how-I-work rows, receipts, manual symptoms,
   objections' tops, the card price rules) `scaleX(0→1)` from the left, 500ms, 60ms stagger
   within a section, as the section enters.
5. Cards and blocks rise: the three price cards rise 20px with a 70ms stagger; the
   Engagements block rises after them; the objection columns the same; media and the
   cover rise 10px. All transform + opacity, 500ms, once.
6. Operator: the square's film settles from `scale(1.06)` to 1 over 1.2 s as it enters; the
   two heading rows rise 20px, 80ms apart.
7. Hovers, everywhere: chips swap ground in 300ms; the `→` in every chip and row slides
   6px right on hover/focus (200ms); the receipt rows' copper wipe stays; the price cards'
   border turns copper on hover (300ms).
8. The ask: the copper field's headline rises 30px and the arrow slides in from the left
   (both 600ms) as the field enters; the chips follow 120ms later.
9. The ground travel and the rail-style lighting stay as they are.
Rest states are always the finished frame (a page with scripting off shows everything).

**16.4 The other pages: the site arc.** The operator expects the whole site in this
style. Ruled: not more mocks. A branch of the real site (`design/room-and-ledger`), the
system installed (Anybody + Hanken via next/font with the wdth axis; JetBrains Mono retired;
copper/espresso/bone unchanged), the home rebuilt from the template as components, and
packages / playbook / work (+ case studies) / call / about restyled to the system, with
the motion set above, `pnpm build` green, axe clean, screenshots at 390/1440. Brief:
`.claude/briefs/pass-101-room-and-ledger-site.md`. No push, no deploy: the preview URL is
the operator's push. The wording round runs on those pages.

## 17. Mid-flight (2026-09-06): "really think about UI design"

Verbatim: "really think about UI design and look at those references and look up web
search. I still feel like the home page has parts that feel unorganized like the box.
receipts - we should add the content ai part to the list so we have three."

- **Receipts = three rows:** Guardicore · RFP engine for an industry author · AI content
  engine for an industry author, then `See the rest →`. Binds v7 and Pass 101.
- **A design-critique leg** (Opus, web + corpus): every home section screenshotted at 1440
  and 390 from v5/v6, judged section by section as composed or assembled, against the
  corpus teardowns AND a fresh web search of 2026 award-level pages for the same patterns
  (a pricing row with a premium tier, a product block, a small FAQ, a method ledger, a
  proof index). Output: a recomposition per failing section with px values and a named
  reference. Fable rules → v7 (mock) and a Pass-101 follow-up commit on the branch.

## 10. Return conditions (stop and report instead of guessing)

A hero row that cannot fit at wdth 115 at either size · contrast under 4.5:1 that the 60%
stop at 75% opacity does not fix · a copy-gate miss · the built file over 12MB · Anybody
failing `document.fonts.check`.
