# DIRECTION — micahjonesconsulting redesign (opened 2026-08-29)

The taste-lock artifact. Per marketing.md non-negotiable #1, no build past Wave 0
until the OPEN rows below are closed. Operator's verbatim words are quoted, dated.

## LOCKED (operator, 2026-08-29)

**D-R1 — Hero sentence.** Chosen:
> Most consultants can't build. Most builders can't sell. I do both.

Proof deck directly under it, no adjectives: three companies helped build reached
exits · $20M+ in client revenue · $80M in pipeline at one of them.
Rationale: the honest translation of the operator's brief ("i help people get rich").
The site never says rich; it shows revenue, pipeline and exits as named numbers and
lets the reader do the arithmetic. Ledger-clean, procurement-safe, zero banned words.

**D-R2 — Audience architecture.** CONFIRMED.
Homepage aims at enterprise / high-value buyers, written plainly enough that a small
business reads it without friction. Solo builders enter at `/playbook`. Shared spine:
identity, facts ledger, first-person voice, one CTA grammar per page. What splits:
density, register, entry CTA.

**D-R3 — Palette.** CUT FIVE WORLDS TO THREE: bone `#ECE3D0`, terracotta `#9E3C25`,
espresso `#2A1F18`. Retire petrol `#1A4548` and saffron-as-a-world; saffron survives
only as an accent if the style tile proves it earns the duty. The scroll cross-fade
itself is protect-listed and stays — shrinking its vocabulary makes each remaining
transition rarer and larger.

**D-R4 — Motion. SUPERSEDES the plan's "delete all reveals" recommendation.**
Operator, 2026-08-29: *"i want animations on the site and considering the research you
need to do for the redesign - is this apart of that?"* — Yes. Motion direction is a
TASTE decision, judged with eyes at the style tile (Wave 2), not pre-decided in a doc.
Wave 0 therefore REPAIRS rather than removes: delete only the genuinely dead code, which
restores the working IntersectionObserver path so the reveals can be SEEN and judged for
the first time. Nothing is deleted for design reasons before Wave 2.


**D-R8 — Taste signal (operator, 2026-08-30, verbatim).**
> "i would like a mix of koto and stripe press - clean abstract unique lowkey luxury
> professional tho dash of linear."
> "love animations - needs to look equally as amazing on mobile too"

Reading: Koto's confidence + abstraction (abstract graphic marks, not photography),
Stripe Press's editorial quiet (few faces, bookish restraint), Linear's tightness
(precision, dark discipline). "Lowkey luxury" = expensive by restraint, never by
ornament. Motion is WANTED, not tolerated. Mobile is a first-class surface, graded
equally — not a desktop design that survives a narrow viewport.

Consequences to carry forward:
- Reference hunting must weight MOBILE quality equally; most award-site studios fail there.
- Motion is now a requirement, so the reduced-motion still state must be designed as its
  own composition (his machines run MinAnimate = 0). Both states get built at the tile.
- REOPENS D-R3 for re-test at the style tile: bone/terracotta/espresso is a warm, light,
  paper-led palette. "Lowkey luxury" with Koto/Stripe-Press/Linear as anchors leans
  darker and more neutral. Not overturned here — tested side by side at Wave 2.
- Abstract graphic system (marks, shapes, type-as-image) becomes a live design question;
  the site currently has hand-drawn marks on the protect list.


**D-R9 — Reference #1 LOCKED: Locomotive (locomotive.ca).** Operator, 2026-08-30:
*"locomotive is my fave - all them realkly are nice"* (no anti-reference named; still open).

Measured, not eyeballed: ground **pure black** `rgb(0,0,0)`; UI face Helvetica Now Display
(commercial — needs a substitute) at **26px**, white; a high-contrast serif for the identity
line; full-bleed ABSTRACT imagery covering the fold; nav written as prose
("Work, Agency, Careers, Store"); type anchored BOTTOM-left, not top; two-tone colour
*within* a single line; a small boxed credential mark (OPS | DES/DEV).
Motion signature: text is split into **one span per character** so glyphs animate
independently — a scramble/decode. No scroll dependency, identical on mobile, and it
degrades to plain final text under reduced motion.

### What this pick OVERTURNS — operator decisions, surfaced not silently absorbed

**C1 — Palette. D-R3 is now in real doubt.** D-R3 locked bone/terracotta/espresso: warm,
light, paper-led. Every reference the operator has named is DARK — Locomotive `#000000`,
Linear `rgb(8,9,10)`, Stripe Press `rgb(32,24,25)`, Koto dark-leaning. The light cream
ground is the single biggest divergence between this site and the tier he is aiming at.
Note the continuity available: the repo ALREADY has a warm near-black — theater mode,
`#12100E`, live on case studies. Going dark is promoting an existing mode, not inventing one.

**C2 — Imagery. Conflicts with a hard project rule.** `.claude/CLAUDE.md` states: "Do not use
stock photography, illustration, icon kits, or 3D. Type and photographs/screenshots only."
Locomotive's entire impact is a full-bleed abstract image (defocused 3D letterforms).
PROPOSED RESOLUTION: build the image OUT OF TYPE — oversized, defocused, cropped
compositions of his own letterforms and figures ($20M, 200, three). That is "type as image",
explicitly permitted by the rule, delivers Locomotive's impact, and satisfies "clean abstract
unique" from the brief. Nothing is licensed, bought, or generated.

**C3 — Display typeface, on AESTHETIC grounds this time.** D14 kept three faces on a
PERFORMANCE argument; it never asked whether Bricolage Grotesque is right. Locomotive and
Stripe Press both lead with a serif; "lowkey luxury" reads serif far more often than it reads
a quirky grotesque. Proposed: swap display Bricolage -> a high-contrast serif, KEEP Hanken
(body) and JetBrains Mono (data). Face count stays at three, so D14's perf maths is untouched.

## OPEN — blocking Wave 2 and later

**Q1 — References.** PARTIALLY ANSWERED via round 1 (see D-R8): Koto + Stripe Press +
a dash of Linear. Round 2 in progress — a wider candidate set inside that triangle,
graded on mobile and motion, for a final lock of exactly 3.

**Q2 — Anti-patterns.** STILL UNANSWERED and still the most diagnostic signal available.
Ask again against round 2, where a wider spread makes rejection easier than naming cold.

**Q3 — Motion vocabulary.** Deferred to Wave 2 style tile per D-R4. Must be presented in
BOTH states, motionless first (his own machines run `MinAnimate = 0`, so the still page
is what he sees daily and what every reduced-motion visitor gets).

## Set aside, recorded so we do not design toward them by drift
`dribbble.com/arounda` — agency thumbnail grid; different business, different story.
`dribbble.com/nexuxlab` — SaaS/fintech dashboard product design; near-irrelevant to a
solo consulting narrative. Both are shots, not shipped sites that had to convert anyone.
Useful only as evidence the operator responds to confident, structured, data-forward
surfaces.

## Lock rule
Exactly 3 references + 2 anti-references graduate into this file with the operator's
words attached. A reference not in this file does not exist for build purposes.

## STYLE TILE 01 — "House Lights Down" (built 2026-08-30, awaiting the aesthetic gate)

Artifact: https://claude.ai/code/artifact/a1072e1b-f1e2-4e88-a560-4dea36116806
Source: `.planning/redesign-2026-08/style-tile-01.html` (NOT deployed, never aliased)

Verified before delivery — Playwright, three passes, zero console errors:
`desktop-motion 1440` · `desktop-still 1440 (reduce)` · `mobile-motion 390`
No horizontal overflow at either width. Instrument Serif resolves. Ground paints
`rgb(14,12,11)`. Under `reduce` the headline is solid on arrival and the canvas is static.

What it proposes, all three conflicts resolved in one artifact:
- **C1 palette** → warm near-black `#0E0C0B`, bone `#EAE6DD`, warm grey `#8B8177`,
  copper `#C8542B` / `#E4703F`. Promotes the repo's existing theater mode sitewide.
- **C2 imagery** → the hero image is BUILT FROM HIS OWN FIGURES ($20M, $80M, $150K, 200, 3),
  oversized, rotated, defocused on canvas. "Type as image" — permitted by the project rule,
  nothing licensed, drawn, or generated.
- **C3 typeface** → display Bricolage → **Instrument Serif**. Hanken + JetBrains Mono stay.
  Face count unchanged at three, so D14's performance maths is untouched.
- **Motion** → one signature, Locomotive's device: per-character decode on the headline.
  No scroll dependency, identical at 390px, degrades to plain text under reduce.
- **Scale** → headline drops 180px → ~26-62px clamp. The confidence moves from point size
  to the claim and the room around it.

GATE: operator I-Like / I-Wish / What-If, ending in ship / revise / refuse on the AESTHETIC
before any page is built. Refusing costs one build and nothing shipped.
