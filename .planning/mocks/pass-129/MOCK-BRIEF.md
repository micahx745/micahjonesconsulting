# Pass-129 mocks: the home purchase links, gamified (three directions)

Written by the main session (Opus 5.5) 2026-09-23. Builder: ONE Opus 5.5 subagent. Output folder:
`.planning/mocks/pass-129/` ONLY. No edits anywhere else, no commits, no server left running.

## Why (his words, verbatim, 2026-09-23, LESSONS #3 "THE HOME PURCHASE LINKS, GAMIFIED")
"I want you to really gamify the purchasable links on the home page. ITs a good point for this fine print but in
reality the audit package on the homepage already had too many words - needs to be shaved down a bit but still be
enticing for a person to want to purchase and/orinvestigate more on our services"

## Diagnosis (live www, curl, 2026-09-23)
The `#offer` section is 152 words (the Audit box 139). Its purchase links are passive: one cream pill ("Buy the Audit")
and small mono text links. Nothing responds to the buyer. The three packages exist only as a sentence in the build door
("Three fixed prices start at $500") and behind two links to two different pages. Memory of what he loves: directions
built from the PRODUCT'S OWN MATERIAL, each with a complete first screen and ONE memorable moment. He rejected 8 mocks
that were "words as type on flat colour".

## Base and scope
- Base = the live home at https://www.micahjonesconsulting.com/ (main e091a16). Save its HTML + compiled CSS + font
  files locally so the mock is pixel-true; strip Next scripts; force every `.cw-reveal` to its revealed state.
- Replace ONLY `<section id="offer">`. Hero, doors (a separate build, Pass-127c, owns their design), How I work,
  receipts, Ordani and the closing stay exactly as live. The doors link stays `See the three packages →` to /packages.
- Read first: `app/(foyer)/page.tsx` L197-257 (the live offer), `components/color-worlds/PackageBand.tsx` (the approved
  per-area strings and the radio pattern), `components/color-worlds/PriceBox.tsx`, `app/globals.css` from L2558 (offer
  box), `.claude/brand.json`, `docs/DESIGN_BAR.md` §4 (never-list) and R15/R17. Invoke the skills `frontend-design` and
  `impeccable-critique` by name before building.

## Rules that are not on trial
Existing theme only: the offer's world stays terracotta; bone/cream type; the cream pill `.cw-buy` for the lead buy,
`.cw-buy--quiet` for the others, `.cw-mlink` for text links; Bricolage display, Hanken body, JetBrains Mono for labels,
figures and data ONLY. No new colours, gradients, glow, icons, emoji, cards-in-cards, radius > 16px. Motion: type and
numbers may move with the scroll; one number per section may assemble once (the site idiom: weight 200 to 800, as the
/work study figures do); user-triggered swaps are CSS, 200ms or less. OUT: cursor followers, scroll that changes
speed, marquees, idle loops, confetti, points, badges, timers, urgency. `prefers-reduced-motion: reduce` = the finished
frame. Native radios/buttons, keyboard works, visible focus, 44px targets, aria-live polite on every swap. Every buy
button is inert in the mock (no navigation).

## Copy: use these strings verbatim, invent nothing
A missing string renders as a loud `[TODO: ...]` and is reported. The banned list in `.claude/brand.json` applies
(it holds two words a game brief invites; read it before writing any label).
- H2 (all): `Two weeks to know what to fix first.`
- Audit: tag `Start here` · name `The Audit` · price `$2,500` · term `Two weeks · starts within the week` · buy
  `Buy the Audit →` · fit per area = `AUDIT_FIT` in PackageBand.tsx (the `none` line before a pick).
- Short deliverables (live on /packages, plus approved AU1): `8-10 page audit memo` · `Prioritized fix sequence` ·
  `One-hour debrief call` · `30-day follow-up call`
- Fine print (all): `Every fee credits toward the next package or an engagement started within 60 days. Full refund before kickoff, none after.`
- Packages link (all): `See all three packages →` to `/packages`.
- Unstick: name `The Unstick Session` · `$500` · `90 minutes · same-day plan` · fit `UNSTICK_FIT` · list
  `What is wrong, in the order to fix it` · `For builds, the prompts to fix it with` · `Your tools, your repo` · buy
  `Buy the Unstick Session →`
- Sprint: name `The Sprint` · `$7,500` · `One week · embedded` · fit `SPRINT_FIT` · list
  `One outcome, agreed by email before day one` · `Daily progress notes` · `Debrief + next-step map` · buy `Buy the Sprint →`
- Areas (value: label): production: `AI engineering` · build: `Product building` · traction: `Positioning & GTM`

## G1 "Where is it stuck?" (choose; the box answers)
First screen: the H2, then a question in Bricolage `Where is it stuck?` with three big typographic answer rows (native
radios, no boxes; a thin bone rule between rows; the area label small in Mono at the row's end):
`The AI works in the notebook, not in production.` (production) · `The demo works. The last 20% does not.` (build) ·
`It works. It just does not sell.` (traction). Beside (1440) or below (390): the Audit box, short: tag, name, price,
term, fit, the four deliverables, buy, fine print. Under the box: a size row of three price radios `$500` `$2,500`
`$7,500`, Audit checked; picking one swaps the box to that package. THE MOMENT: tap an answer and the row locks (weight
up, a bone underline draws across in 200ms), the box's fit line swaps to that area and `Covers: <label>.` appears
above the buy button. Default: nothing picked, Audit shown.

## G2 "The tab" (accumulate; the scroll prints the order)
The Audit box becomes an itemized tab: a bone paper slip on the terracotta ground, radius <= 8px. Header: `The Audit`
+ Mono `Start here` + Mono term. Rows, item in Hanken, value in Mono, dotted leader between:
`The memo` / `8-10 pages` · `The fix sequence` / `in priority order` · `The debrief call` / `one hour` ·
`The 30-day follow-up call` / `after the memo` · `The kickoff email` / `the moment you buy` · `The area` / three
radio chips (the area labels; unpicked value text `pick one here or at checkout`). A rule, then `Total` / `$2,500`,
then `You keep the memo either way.`, then a perforated (dashed) line and the buy button as the tab's stub, then the
fine print. THE MOMENT: as the tab scrolls in, the rows print one by one, tied to scroll position (not a timer), and
the total's `$2,500` assembles once, weight 200 to 800. Picking an area writes its label into the row.

## G3 "The ladder" (progress; your fee carries up)
Under the H2, the three packages as a scoreboard (the site's four-exits idiom: columns split by bone rules, no cards):
Mono kicker `Three fixed prices`; each column = name, big figure, Mono term, its buy button (Audit lead, the others
quiet). Each column is also selectable (a radio: `Pick a package`); the selected column shows its fit line (`none`)
under the scoreboard. THE MOMENT: the Audit's figure assembles once on scroll-in; selecting a column prints, under the
NEXT column, Mono `Your fee credits toward this` and the net figure: Unstick picked, under the Audit `$2,000 after the
Unstick Session`; Audit picked (default), under the Sprint `$5,000 after the Audit`; Sprint picked, under the Sprint
`Your $7,500 credits toward an engagement`. These two derived prices are NOT yet approved; mark them in MOCKS.md.

## Deliverables (the main session reads MOCKS.md and SHEET.png, never raw transcripts)
1. `g1.html` `g2.html` `g3.html` (+ shared `assets/`) and `index.html` linking the three; served over http (fonts
   need it), e.g. `python -m http.server` from this folder, stopped when done.
2. `shots/g{1,2,3}-{390,1440}-{rest,picked}.png` (the offer section's first screen at each width, before and after
   one interaction) and `shots/g{1,2,3}-rm-390.png` (reduced motion).
3. `shots/g{1,2,3}-390.webm`: one clip per direction at 390, 8 s or less, scrolling into the section and doing THE
   MOMENT once.
4. `shots/SHEET.png`: ONE contact sheet, the 12 rest/picked shots labelled, 2000px wide at most.
5. `MOCKS.md`: per direction, visible words in `#offer` at rest (live is 152), the strings used, any `[TODO]`, the
   probe results below with their output, and one line on what you would change.

## Probes (run them, quote the output in MOCKS.md)
`document.fonts.check` true for Bricolage Grotesque, Hanken Grotesk, JetBrains Mono at each width; zero console
errors; no horizontal scroll at 390 (`scrollWidth <= innerWidth`); keyboard: Tab reaches each radio group, arrows move
the pick, the swap is announced; reduced motion shows the finished frame; a grep of each mock's visible text against
the banned list in `.claude/brand.json` returns 0, proved by a planted test word first.
