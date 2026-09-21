# Fable pick: the How I work design direction (Pass-126)

You are the taste gate. One call. Your output becomes the design spec a build executor (Sol) implements on a preview
branch; the owner then judges the RENDERED section at 390 and 1440. Make it buildable and exact.

## Read, in this order
1. `.planning/prompts/PASS-126-HOWIWORK-DIRECTIONS.md`: the brief all drafters got (locked copy, the theme, the limits).
2. The six directions: `.planning/drafts/pass-126/sol-directions.md` (Sol 1 "The Working Session", Sol 2 "The Marked-Up
   Proof"), `.planning/drafts/pass-126/dspro-directions.md` (DeepSeek 1 "Annotated Ledger", DeepSeek 2 "Four
   Sign-offs"), `.planning/drafts/pass-126/gemini-directions.md` (Gemini 1 "The Focused Unfold", Gemini 2 "The
   Emphasized Progression").
3. The live section's code: `app/(foyer)/page.tsx` (search "How I work.", the `cw-principles cw-principles--steps` list)
   and its CSS in `app/globals.css` (search `.cw-principle`). The section is `<section id="products">` on the espresso
   world and ALSO holds the receipts (`$20M+` with the clip, then the exits scoreboard, which holds on scroll).

## The owner, in his words this month
- The ask (2026-09-21): "Same words, better design", and carry the four steps to /services (where they replace a
  bulleted "Every engagement includes" list that restates the same commitments).
- On the Pass-121 design he rejected (2026-09-18): "It looks bad. Still very wordy and the boxes with lines looks bad
  ... bland, word heavy, weak design. Its something that would not draw someone in."
- Scope (2026-09-18): "i didnt want to change the entire site. I wanted to take the best themes from these designs and
  incoporate them in our existing theme." Kinetic Editorial themes are permitted INSIDE the existing theme.
- On How I work (2026-09-21): "i hate that the how i work part is gone - replaced by something i dont understand." He
  relies on the visible heading "How I work."; do not shrink it into a caption.

## The main session's pre-screen (facts and rules, not taste; do not re-litigate)
- CONTRAST: copper #bd5a2d on espresso #2a1f18 measures about 3.57:1, so copper may not carry small text there (mono
  labels at 11-20px, a 13px "See the work" link, 18px body). Copper is fine for rules, shapes and text at 24px+.
  DeepSeek 1, DeepSeek 2 and both Gemini directions put copper on small labels or the link; fix that in anything you take.
  Gemini 2's inactive steps at 0.3 opacity fail contrast outright.
- HEADING: Sol 1 sets "How I work." at 18px and DeepSeek 2 at 40px against 80-100px steps; that demotes a heading he
  said he relies on. Keep it at least as prominent as the step headlines.
- HOLDS: the same section already holds on scroll for the exits scoreboard (it once shipped CLS 0.33, LESSONS #41). A
  second full-viewport hold in the same section (Sol 1, DeepSeek 2, both Gemini) doubles that risk and makes the home a
  long pinned walk; DeepSeek 2 and Gemini 1 also pin on phones. A hold is allowed by his 09-18 ruling, but you must say
  why it earns its place if you pick one, and the phone must not pin.
- GROUND: Sol 2 moves the steps to ink. The section is shared with the receipts on espresso; a ground change inside one
  `<section data-world>` needs a new section boundary, which the build can do, but name it.
- NO numerals, NO box-and-arrow diagram, NO equal cards, words locked (all six comply).

## Hand back (plain markdown, your answer is the return value; do not write files)
1. VERDICT: the direction you pick (one of the six, or a named graft), in three sentences: why it draws a buyer in,
   why it is still this site, and which runner-up you would show him only if the jurors split. One line each on the rest.
2. THE BUILD SPEC, exact enough to implement without a design decision left open:
   - Structure and ground for the home (where the section starts and ends relative to the receipts; which world).
   - At 1440 and at 390: grid or offsets per step, type (face, size as px or clamp, weight, case, tracking, line-height)
     for the heading, labels, headlines, bodies and the link; colours by token; spacing values.
   - Motion: trigger, property, duration, easing, order; CSS scroll-driven where possible; the reduced-motion and no-JS
     frame; how CLS stays at 0 while scrolling.
   - The /services variant: ground, colours, what it replaces, spacing.
3. The one thing in your spec most likely to fail on a real phone, and the check that would catch it.
