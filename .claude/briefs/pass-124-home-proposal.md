# Brief: Pass-124 homepage proposal — build it twice, capture it

Written 2026-09-20 by the main session (Opus 5). Operator rulings (LESSONS #3, 2026-09-20, "PASS-124
HOMEPAGE: BUILD WHAT THE RESEARCH SAID"): build the homepage the research described as one proposal he
judges on sight, new lines marked; How I work loses its per-step example rows for ONE link to the work
page; the receipts are shown BOTH ways. The copy is fixed: `.planning/reviews/FABLE-124-HOME-COPY.md`.
You are building and capturing. You decide nothing. You write no copy.

## Hard rules
1. Every visible string below is EXACT. Copy it character for character. Use a literal right single
   quote (’, U+2019) for "I’m" and "buyer’s" and "Neuton.AI’s", never an HTML entity (LESSONS #6).
2. Reuse existing classes only. Write NO new CSS, change NO stylesheet, add NO component. If a step
   cannot be done with existing classes, STOP that step and report it.
3. If any step cannot be applied exactly as written, STOP it, leave that source untouched, report it.
   Never improvise a nearby edit, never change a check to make it pass (LESSONS #25, #36, #37).
4. Never touch `design/live-evolve` or the p106-live worktree's source. Your only writes into p106-live
   are the capture files under `.planning/qa/pass-124/home/`.
5. Never push. Never deploy.

## Setup
Reuse the existing worktree `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p124-cuts`
(node_modules already installed). In it:
`git checkout -b pass-124/home-proposal <HEAD of design/live-evolve>` (read the hash with
`git -C ../p106-live rev-parse design/live-evolve`). Work on that branch.

## Variant A (commit 1): the proposal, receipts as locked

### A-1 Hero — `components/color-worlds/Hero.tsx`
The h1 keeps its element, classes, refs and two-line structure. Line 1 (`cw-line`) inner text becomes
`It works.{" "}` (keep the trailing-space rule). Line 2 (`cw-line cw-line--turn`) becomes
`It just does not sell.` Remove the `cw-nowrap` span (no longer needed).
The subhead `<p className="cw-sub" ref={subRef}>` content becomes exactly, with no `<em>`:
`I’m Micah Jones. There is $20M+ in revenue behind my work. I build what sells.`
Hero CTAs unchanged.

### A-2 The two doors move up — `app/(foyer)/page.tsx`
Move the entire `<section className="cw-doors-band" ...>...</section>` (currently ~707-752) so it
sits IMMEDIATELY after `<Hero />` and before the Audit band section. Move it verbatim except:
- DELETE both `<p className="cw-door__kicker">` elements ("Building solo, with AI", "Running a growing
  business").
- In the SELL door (`cw-door--sell`): the headline element's text "Too big for duct tape. Not ready for
  an agency retainer." becomes `An agency is too broad. A hire is too early.` The body paragraph
  "You get me directly. Diagnosis, a shipped artifact in month one, and a system your team runs without
  me." becomes `I step in as the operator. You get me directly.` Its "See the engagements →" link is
  unchanged.
- The BUILD door is unchanged apart from its kicker.

### A-3 How I work — `app/(foyer)/page.tsx`, the section containing `<ol className="cw-principles">`
- DELETE the kicker `<p className="cw-kicker cw-reveal">Operating principles</p>`.
- The h2 "How I work." keeps its text and any id; replace its className with `cw-sr-only`.
- In ALL THREE `<li className="cw-principle ...">`: DELETE `cw-principle__num`, `cw-principle__name`,
  `cw-principle__proof`, and the whole `cw-ledger` div (every example row). Keep the `li` and its inner
  `<div>`.
- li 1: `cw-principle__artifact` text becomes `The story comes first.`; `cw-principle__text` becomes
  `I find the buyer’s words before I build. At Guardicore I heard it in the deals: buyers could not see
  anything inside their own environments, and seeing inside was what they signed for. I moved the story
  there. That work brought in $14M in revenue, sourced and closed.` Then, after that paragraph, add
  `<a href="/work" className="cw-mlink">See the work <span aria-hidden>→</span></a>`.
- li 2: DELETE its `cw-principle__artifact`. `cw-principle__text` becomes `Then I build. Week one is a
  scoping session and an audit. Something named ships in month one.`
- li 3: DELETE its `cw-principle__artifact`. `cw-principle__text` becomes
  `I stay until it sells without me.`
- `<ExitRecord />` and the sr-only "The receipts." h3 stay exactly as they are in Variant A.

### A-4 ORDANI — `app/(foyer)/page.tsx`
DELETE all four ORDANI figures and their wrappers: the figure captioned "The intake, on paper · what
Ordani replaces" and the group of three captioned "Labor support · the work the software protects",
"Bodywork · between appointments", "The reason the record has to be right". Every other ORDANI element
stays word for word: the heading, "Built for the people who show up for mothers.", the paragraph
(ledger-EXACT, do not touch), "See how it was built →", the waitlist. If removing the figures leaves an
empty grid column or a wrapper that only held them, remove the empty wrapper too, and report it.

### A-5 Closing call to action — `app/(foyer)/page.tsx`, `<a href="/call" className="cw-big-link">`
Its visible text "Name the problem" becomes `Make it sell` (the arrow and the uppercase styling stay as
they are). Its `aria-label` becomes `Make it sell: book a free intro call`.

Commit: "Pass-124 home proposal A (preview only, never merges)".

## Variant B (commit 2, on top of A): receipts folded into sentences
In `app/(foyer)/page.tsx` replace `<ExitRecord />` (and only it) with:
`<p className="cw-lede cw-reveal">Four companies I worked inside reached an exit: Uber bought Postmates
for $2.65B, SurveyMonkey went public at a $2.33B first-day value, Akamai bought Guardicore for $600M,
and Nordic Semiconductor acquired Neuton.AI’s technology. Two of them, SurveyMonkey and Guardicore,
carried my name on the cap table.</p>`
Keep the sr-only "The receipts." h3. Commit: "Pass-124 home proposal B (preview only, never merges)".

## Gates — for EACH variant, paste output verbatim
Run package.json's `build` script by hand: every command before `next build` in order, then
`npx next build --webpack`, then every command after it. EXPECT all exit 0, copy-lint "Zero banned-word
findings, zero schema violations." with no `[em-dash-cap]` block. On failure: STOP, report, do not fix.
Never judge an exit code through a pipe.

## Capture (home only)
Serve each variant with `node node_modules/next/dist/bin/next start -p 3241`, one at a time. Reduced
motion emulated, full page, widths 390 and 1440, never `elementHandle.screenshot()`.
BEFORE = `https://www.micahjonesconsulting.com/`.
Write to p106-live `.planning/qa/pass-124/home/`:
1. CLEAN full-page PNGs, no annotation: `live-{390,1440}.png`, `propA-{390,1440}.png`,
   `propB-{390,1440}.png`.
2. ANNOTATED sheets `sheet-{390,1440}.png`: three columns, left to right "LIVE NOW", "PROPOSAL, receipts
   as locked (A)", "PROPOSAL, receipts in sentences (B)", header naming the width. On both proposal
   columns, outline every element whose text is NEW (A-1 h1 and subhead, A-2 sell-door headline and
   body, A-3 li 1-3 text and the See the work link, A-5 big link, and in B the receipts paragraph) with
   a 3px #1d6fd8 outline and a small "NEW" label at its top-left. The blue exists only on the sheet.
Stop the server after each variant (Stop-Process on its PID).

## Also measure, report, do not fix
- axe serious + critical on live, A and B at both widths.
- Hero CLS at 1440 for live and A (the pre-existing 0.0045 on h1/p.cw-sub is the baseline).

## Report back
Branch hashes for A and B · each step A-1..A-5 and B APPLIED / STOPPED + reason · gate outputs
verbatim for both · the file paths · axe counts · hero CLS · anything unexpected (empty wrappers, world
colours that look wrong after the doors move, anything that renders oddly).
