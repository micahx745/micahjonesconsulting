# Fable pick: How I work design direction (Pass-126, 2026-09-21)

Input: `.planning/prompts/PASS-126-HOWIWORK-FABLE-PICK.md` (six directions: Sol x2, DeepSeek v4-pro x2, Gemini x2, with
the main session's pre-screen). One call. The build brief is `.claude/briefs/pass-126-how-i-work.md`.

## Verdict (Fable, verbatim)
**Sol 2, "The Marked-Up Proof", grafted onto the existing espresso section (no ground change, no hold).**

It draws a buyer in because all four commitments are on screen at once as one irregular poster: a stacked "HOW I /
WORK." block top-left, Scope beside it, then Plan, Build and Stay walking down the page on different column starts and
widening measures, so a founder scans the whole method in a glance and then reads it as a path, which is what obys'
static frames and uncommon's broken grid do. It is still this site because nothing new enters: the same espresso world,
`.cw-secttitle`, Bricolage/Hanken/Mono at their existing roles, copper only as four short rules, the site's own ease,
and the section keeps "I offer this, here is the example" fused with the receipts as the operator asked. If the jurors
split, show him DeepSeek 1 "Annotated Ledger" with its fixes (labels and link in cream, the rail sticky only at 1440 and
only inside the steps, heading at `.cw-secttitle` scale): its one real merit over the pick is that "How I work." stays on
screen through all four steps.

- Sol 1 "Working Session": a second full-viewport hold in the section that already holds, with the heading demoted to
  18px; out on both pre-screen rules.
- DeepSeek 1 "Annotated Ledger": same family as the pick, but copper on 12px labels and the 13px link, a heading at 48px
  under 88px headlines, and a sticky heading on phones; runner-up only after fixes.
- DeepSeek 2 "Four Sign-offs": 400vh pinned plates, pins on phones, 40px heading against 104px steps; out.
- Gemini 1 "Focused Unfold": a sticky slideshow with 18px copper labels and a 900px body measure; generic and out.
- Gemini 2 "Emphasized Progression": inactive steps at 0.3 opacity and scaled text; fails contrast outright; out.

Why no hold: the exits scoreboard already pins this section (LESSONS #41); the composition is the draw here, and a
second pin would turn the home into a walk.

Fable's full build spec (grid areas, type, sizes, /services variant) is carried into the brief sections 1 to 4.

## Main-session edits to the spec (2026-09-21), and why
1. MOTION: Fable specified CSS `animation-timeline: view()`. Overridden: the site's native `view()` reveal path was
   DELETED on 2026-08-30 because it resolved to its end state for every visitor (the "Native scroll-driven reveal path
   DELETED" comment in `app/globals.css`, `.planning/DEFECT-reveal-system-2026-08-29.md`), and the page root carries
   `overflow-x: hidden` (clip only where the exits scoreboard is live), which is exactly the dead-timeline failure
   Fable named as its biggest phone risk. The same choreography (rule draws, headline rises, body follows) is built on
   the site's one reveal system, the IntersectionObserver `.cw-reveal`/`.is-in`.
2. CONTRAST CLAIM corrected: Fable wrote that the from-states "both clear 4.5:1". Computed by the main session: cream at
   45% on espresso is about 3.66:1 (passes AA for large text, 3:1, which a 34px+ headline is); at 55% about 4.79:1
   (passes body). With the IntersectionObserver path the from-state is opacity 0 before reveal anyway.
3. /services heading is an h3 (`#sv-hiw-title`), not an h2: the block sits inside the shapes section, whose outline
   already has an h2 above it.
4. /services keeps the two "Every engagement includes" lines the steps do not say ("No discovery fee." and "Any one of
   the three areas below, two of them, or all three.") as one note under the steps, and "Why one person" loses its two
   sentences that repeat week one and month one. Straight cuts and moves; no word changed.
