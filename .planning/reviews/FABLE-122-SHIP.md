# Fable ship gate: Pass-122 (2026-09-18)

Read: every named image, the ten `work/final/` frames, the assembly and rm/no-JS sheets, LESSONS #3
PASS-122 rows and #39. The lower half of /work has no post-cut frame; the pre-cut sheets and the
executor's zero counts stand in.

## 1. Buyer read
Phone. The espresso section stops me: a "$20" the width of the screen with a man's face moving inside
it, then "M+", and it burns to copper. I never read "The receipts."; I read a number and a face, then
"In revenue behind my work", believed because it sits under what it explains. The scoreboard steps as
I scroll; I stop at Neuton.AI "Undisclosed", where the numbers run out. On /work: heading, two
sentences saying what the page is, a small dark photo, an arrow. My eye goes to the photo, then past
it to "$14M" in copper. From there the page is a rhythm: label, poster, bold line, paragraph, mono
tag. I read the posters and bold lines and skip the paragraphs, as intended. I lean in at $14M and
800,000. I stall at "five to / ten.": the only poster made of words, and the break makes me read
"five to" and wait. The method line lands because it comes after the evidence.

## 2. Reject on sight?
No. Not bland: one image-sized element per screen. Not word heavy: the /work first screen is one
heading, two sentences, one number. "Weak" is a risk only at "five to / ten." and the doubled
Guardicore caption, below.

## 3. Defects (no BLOCKs)
- FIX-LATER, operator ruling. `final/390-0.png` and `final/1440-0.png`: "Guardicore, acquired by
  Akamai" appears twice inside one screen, as featured caption and as the first study's label. Reads
  as a repeat. Without new copy: the featured entry carries the study's frontmatter `title`, or the
  list drops its label for the featured study.
- FIX-LATER. `final/390-0.png`: 125 CSS px of empty paper between the featured arrow and the first
  label. Halve the opening block's bottom padding.
- FIX-LATER. `final/390-2.png`: under "Bookings went from one to three a month to" the poster slot is
  blank paper. The assembly sheet shows the figure landing at +140ms once triggered; this is the
  pre-trigger state with 125 CSS px already in view. Trigger when the poster's top edge crosses the
  bottom 15% of the viewport (`rootMargin: "0px 0px -15% 0px"`, threshold 0), or give the weight-200
  start state visible opacity. Confirm on a real phone.
- FIX-LATER, operator ruling. `work-before-after-390.png` y 2110; `work-after-1440.png` y 2250: "five
  to / ten." breaks over two lines at both widths. Locked at `30b1c45`. If he wants it fixed: render
  the birth-worker `figurePhrase` one step smaller with `white-space: nowrap`; wording stays exact.
- FIX-LATER, pre-existing, out of scope. `frames/after-nojs-390-01.png`: with JS off, page text shows
  through the nav; `components/color-worlds/Nav.tsx:188` sets the nav ground via `is-scrolled` from a
  `useEffect`.
- No collisions, clipped glyphs or legibility failures. "$20 / M+" at 390 is the locked v2.

## 4. Facts and copy
Every visible string is on production `92095b7` today or a ledgered exact: the heading (09-16 ruling),
the cut description (count 1, exact), the method line (count 1, below the studies as the 09-16 ruling
requires), the five entry lines (work-entry-gate PASS x5), "In revenue behind my work". The three cut
strings count 0 in served HTML. 800,000 renders as "Up to 800,000 impressions in a month", a peak, not
a rate. No em-dash in any frame. Nothing goes to the operator under #35: "five to ten." is sound prose
broken into a poster, a design fix, not a rewrite. Unverified by me: the post-cut record block layout;
the executor's 0 count stands in.

## 5. Verdict
SHIP. Both surfaces do what the operator locked, inside the existing theme; nothing in the frames
misleads a buyer or breaks a ledger row. The five items are FIX-LATER; none touches a fact or a locked
string, and two need his ruling first. Queue them in RESUME, ship on his push approval per CARD 1 to
both aliases, then verify `$20M+`, the /work description and the three zero counts on the live domain
with `curl -s | node .planning/exec/visible-text.mjs`, never grep.
