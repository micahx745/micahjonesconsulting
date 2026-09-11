# Pass 111a: the pricing box, the home Audit box, receipts, Ordani on mobile, two case studies

Executor: GLM 5.3. You IMPLEMENT and VERIFY. You do NOT commit, push or deploy.
Worktree: C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live
Branch: design/live-evolve. Pass-110 is committed before you start.

Read first, in this order:
1. .claude/RESUME.md
2. CLAUDE.md and .claude/CLAUDE.md
3. docs/DESIGN_BAR.md and .claude/brand.json
4. docs/LESSONS_LEARNED.md entries #2, #3, #6 and #19
5. .planning/design/DIRECTION-110.md, the design direction
6. .planning/design/CRITIQUE-110.md, the adversarial review of that direction

PRECEDENCE. Where the critique changes the direction, the critique wins. Where this brief
says something different from either, this brief wins. This pass builds ONLY what the critique
cleared to build without operator rulings. Do NOT build the /services boxes, the areas block,
the package picker, the count-up, or /packages changes: those wait for the operator.

NOTE ON THIS FILE. Plain ASCII. Every command with flags lives in .planning/exec/gates111a.sh
and .planning/exec/shots111a.mjs.

## The colour rule (every new block)

The home page cross-fades four worlds (LESSONS #19). Text is inherit; a fill carrying text is
var(--cw-fg) with a var(--cw-bg) label (the existing .cw-buy); hairlines are
color-mix(in srgb, currentColor N%, transparent); frames are currentColor. Inside every new
selector: no hex, no --color-cw-* token, no --cw-accent in any state, no opacity on text. The
gate script greps for all four.

## 1. The PriceBox component

Build components/color-worlds/PriceBox.tsx and its CSS exactly as DIRECTION section 1, with
the critique's changes:
a. No `__idx` numerals and no `__sub` "What you get" label (critique H6). Drop the idx prop.
   The `__label` row renders only when a tag exists.
b. BuyButton inside a box keeps disabled={pending} (critique Low 6). Its error paragraph
   `.cw-pkg__cta-error` is color inherit with no opacity.
c. The component must support both a number price and a scoped price (section 1.6), but this
   pass mounts it in ONE place: the home Audit box. /services is not touched.

## 2. The home Audit section (#offer)

Rebuild per DIRECTION section 4, with these decisions:
a. One destination (critique H4). The hero pill "Start the Audit" in
   components/color-worlds/Hero.tsx changes href from /packages to #offer, and its arrow
   becomes the down arrow character that the "See the work" link already uses. The box's own
   button buys. Add one sentence to the Pass-109/110 comment above the CTA row saying so.
b. Left column: delete the "Start here" kicker. The h2 via SplitReveal reads exactly
   "Two weeks to know what to fix first." Then a cw-mlink "See all three packages" with the
   right arrow, linking /services#packages. On one column the order is: h2, box, link
   (critique Low 2). Use grid areas; never reorder the DOM.
c. The box (PriceBox, as="h3", inside .cw-reveal):
   tag: Start here
   name: The Audit
   price: $2,500
   term: Two weeks, then a middle dot (U+00B7, the separator the ledger rows already use),
         then: starts within the week
   fit: I go through your build, your production, or your positioning top to bottom.
   list, exactly these four lines:
     An 8-10 page memo: what works, what is broken, and what to fix first.
     A prioritized fix sequence, so you can start the morning it lands.
     A one-hour debrief call where I walk you through it. You keep the memo either way.
     A kickoff email the moment you buy: intake questions, a link to book the debrief, and
     The 80% Wall, my field manual, attached.
   area row: Covers one area: your build, your production, or your positioning. You pick it
             at checkout.
   CTA: filled BuyButton skuKey="audit-2500" label "Buy the Audit".
   fine: the fee-credit sentence and the refund sentence, copied VERBATIM from
         app/(foyer)/packages/page.tsx. If /packages words them differently from DIRECTION
         section 4, use the /packages wording. Invent nothing.
d. Delete the .cw-offer-stats, .cw-deliver and .cw-offer-next markup from #offer. Delete their
   CSS only if a grep proves no other element uses those classes.
e. Measure at 1024 and 1440 (critique Low 3): the box's height against the left column's. If
   the box is more than 1.5 times the column, move the fit sentence into the left column as
   the dek and report the before and after heights.

## 3. Receipts

Per DIRECTION section 5 with the critique's changes:
a. In the receipts part of the #products section of app/(foyer)/page.tsx, delete the kicker
   "The record", the dek that begins "Every line below is real", and the Consulting total row
   (.cw-lrow--tot). Keep the h3 "The receipts.".
b. RevenueFigure, STATIC ONLY in this pass (critique M7). components/color-worlds/RevenueFigure.tsx
   renders "$20M+" with components/hand/HandCircle.tsx fully drawn and NO animation, and the
   label "In client revenue since 2013". Use the ghost and tick grid from DIRECTION 5.1 so a
   later pass can add the count with zero layout shift. Add a backward-compatible `instant`
   prop to HandCircle that renders the final frame with no transition; without the prop its
   behaviour must not change. HandCircle's color is currentColor. No count-up, no draw-in.
c. ExitRecord rebuilt with critique H7, company first:
   - title (h4, JetBrains Mono 12px uppercase): Four exits I worked inside
   - each cell: the company name at display size (Bricolage 800 uppercase,
     clamp(20px, 2.2vw, 32px)); beneath it ONE baseline row holding the figure (Bricolage 800,
     clamp(20px, 1.9vw, 28px), tabular-nums) and the outcome (Hanken 16px), wrapping allowed.
     Neuton.AI shows the word Undisclosed in the figure slot, same size, weight 700.
   - order: by disclosed value, descending, undisclosed last.
   - no years, no notes, no "Disclosed total" list, no "Stated on this site" row, no floor.
   - the total is the LAST ruled line under the row: a 1px currentColor top rule, the label
     "Combined, disclosed deals" (Hanken 16px, 600) and the figure $5.58B at the SAME size as
     the deal figures. No 3px double rule. Not a third display number.
   - grid per DIRECTION 5.2 at 900px and up; below 900px follow critique M1 exactly (2x2,
     divider via :nth-child(2n), top hairline on items 3 and 4, scrollWidth asserted at 390).
d. content/citations.ts: add an `outcome` string to each DEALS entry, keeping every existing
   field: Postmates "Acquired by Uber"; SurveyMonkey "IPO, first-day value"; Guardicore
   "Acquired by Akamai"; Neuton.AI "Technology acquired by Nordic Semiconductor".
e. docs/LESSONS_LEARNED.md #3: one line saying the home exit record now renders the $5.58B
   disclosed total only; the $5B+ floor remains in metadata and OG images.

## 4. Ordani on mobile

Per DIRECTION section 6 (the operator has not yet supplied product screenshots, NC-X1):
a. Read LESSONS #6 before touching the lede: its text node stays exactly as it is.
b. Restructure into the lead figure, the copy, and the strip, as specified. The strip is
   display none below 768px. Captions lose any opacity.
c. Measure the summed rendered height of every image inside #ordani at 390, before and after.
   Target: 260px or less. Report both numbers.
d. Delete components/color-worlds/OrdaniSticky.tsx after a grep proves nothing imports it.
   Delete .cw-ord-band* and .cw-ordani-split* rules only after a grep proves them unused.

## 5. The GSAP quarantine gate (critique H8)

Write scripts/gsap-quarantine-gate.mjs (Node, no dependencies): fail with exit 1, printing each
file, if any .ts or .tsx file under app/ or components/ imports from "gsap" or any "gsap/..."
subpath, EXCEPT an explicit allowlist: components/TitleCard.tsx, and
components/color-worlds/SplitReveal.tsx with the comment "pre-existing exception recorded in
Pass-111a: mounted on every home section title; moving it off GSAP is its own arc, not a
precedent". Print "gsap-quarantine-gate: clean" when clean. Wire it into package.json "build"
right after scripts/accent-states-lint.mjs. Prove it catches: run it once against a temporary
copy of the tree or with a temporary extra file outside the allowlist, show the failure, then
remove the temporary file. In .claude/CLAUDE.md, in the GSAP bullet under "What not to do", add
one sentence: enforced by scripts/gsap-quarantine-gate.mjs; SplitReveal.tsx is a recorded
pre-existing exception, not a precedent.

## 6. Opacity on reused text classes (critique M2)

Remove the opacity declaration from .cw-services__kicker, .cw-services__intro and
.cw-sv-shapes__foot. Hierarchy stays by size and weight.

## 7. The home doors CTA

In the home doors band, the sell door's CTA "See the three engagements" becomes
"See the engagements" (there are four shapes and three areas; nothing is three engagements).

## 8. Two new case studies

Two reviewed drafts sit at .planning/drafts/postmates.mdx and .planning/drafts/neuton.mdx. Move
them into content/work/ unchanged. Do not edit their wording. Then confirm: both pass the
frontmatter schema (copy-lint validates it); /work lists them after the existing four;
/work/postmates and /work/neuton render with their TitleCard; every figure in each indexLine
also appears in that study's body (LESSONS #2). The render gate's route count rises by two.

## 9. Prove it

Run: bash .planning/exec/gates111a.sh
Expected:
  tsc                 no output, exit 0
  copy-lint           "Zero banned-word findings, zero schema violations."
  vendor, retired     clean
  accent states       "accent-states-lint: clean"
  gsap quarantine     "gsap-quarantine-gate: clean"
  new-block colour    zero lines printed by the grep block
  build               "Compiled successfully"
  render-gate         "17 routes"
  axe-worlds          exit 0, "0 not in KNOWN", no COVERAGE FAIL
  captures            every shot found=true; every scrollWidth equals clientWidth
If a gate fails on something you changed, fix it and re-run. If it fails on something you did
not change, report and stop. pnpm build fails on this machine with a Turbopack font error; the
script uses the webpack path, which works. Then open every capture in .planning/qa/pass-111a/
and describe what you see, including anything that looks cheap or unfinished.

## 10. Report and stop

Print every gate with its real output, the measurements asked for in 2e and 4c, every file you
changed or deleted, and your description of each capture. Do NOT commit. Do NOT push.
