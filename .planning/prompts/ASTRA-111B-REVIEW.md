You are the design and copy juror for one pass on a consulting site. Read-only. Do not edit any file. Write your verdict to the -Out path as markdown.

The pass: `/services` was rebuilt as pricing boxes. Four engagement shapes (Advisory, Project, Retainer, Embedded) sit in one band; a ruled "Every engagement includes" row sits under it; three areas of work sit under that as unboxed columns; then three fixed-price packages (Unstick $500, Audit $2,500, Sprint $7,500) with an area picker above them that the buyer must use before "Buy" works.

Four captures are attached, all settled viewport captures of the production build:
1. sv-shapes-1440: the four shape boxes at 1440x900.
2. sv-pkgs-1440: the picker and the three package boxes at 1440x900.
3. sv-areas-1440: the shared row and the three areas at 1440x900.
4. sv-shapes-390: the shape boxes at 390x844 (2x).

The written rules the page must hold to are in these files; read them before judging:
- C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/docs/DESIGN_BAR.md (R1-R17 and the never-list)
- C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/brand.json (voice.banned, motion)
- C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/briefs/pass-111b-services-boxes-and-rail.md sections 0, 2 and 14 (the operator's rulings and the exact approved copy; do not propose copy that contradicts a ruling)
- C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/design/CRITIQUE-110.md H1, H2, H5, H6 (the critique the build was meant to answer)
- The rendered page source: C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/app/(foyer)/services/page.tsx and components/color-worlds/PackageBand.tsx

Answer two questions, with evidence from the captures (name the capture and describe the exact spot) and the files (path and line):

1. THE BUYER READ. A founder who runs a 30-person company lands on this page from the home hero. In one screen at 1440, can they tell: which of the four shapes fits them, what it costs or when they will know the cost, and what they get that the other shapes do not? Then a solo builder scrolls to the packages: can they tell which area to pick, what each package delivers, and what happens after they pay? Where does the page fail either reader? Quote the sentence or name the element.

2. THE BAR. List every place the captures or the source break a DESIGN_BAR rule, the never-list, or a CRITIQUE-110 H1/H2/H5/H6 requirement: repeated promises, tracked-uppercase labels beyond the allowance, a box taller than it needs to be, an element whose hierarchy is carried by opacity or colour rather than size and weight, a CTA that competes with the page's one filled pill per band, wrapping or orphaned words at 390, a term line that reads as a price.

Then a verdict in one of three words: SHIP, FIX, or REWORK, followed by a numbered fix-list ordered by severity. Each fix names the file, the element, the exact change, and the rule it serves. Keep the fix-list to what a mechanical executor can apply without taste. Do not propose new sections, new motion, a second accent, or any sentence the brief did not approve; if a copy problem needs new words, say so and mark it OPERATOR.

Be terse. Evidence over opinion.
