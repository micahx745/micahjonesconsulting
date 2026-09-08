# Pass 103b — consistency and layout fixes found by the Pass 103 verification (executor: Codex xhigh)

Branch `design/room-and-ledger`, this worktree. Fable ruled these 2026-09-08 from the verification
workflow (`.planning/qa/pass-103/`, journal wf_dbe6bf5f-577) and its own source checks. None of
them changes a ticked Pass 102/103 string. Executors write; Fable commits (LESSONS #18). Never push.

## 1. The retired phrase in derived strings (consistency)
Rows PK08 and PK18 retired "prioritized fix sequence" in favour of "what to fix in order". Two
derived strings still carry it:
- `app/(room)/packages/page.tsx` ~line 88, the `PACKAGES_LD` Audit offer description:
  "…Written memo, prioritized fix sequence, debrief call." → "…Written memo, what to fix in order, debrief call."
- `scripts/stripe-setup.mjs` ~line 46: make the Audit description byte-identical to
  `lib/catalog.ts` line 53 (the runbook's same-commit mirror rule). DO NOT run the script; the live
  Stripe product is the operator's.
Verify: `grep -c "prioritized fix sequence" "app/(room)/packages/page.tsx" lib/catalog.ts scripts/stripe-setup.mjs` → 0, 0, 0.

## 2. "$99at launch" (a pre-existing Pass-101 defect)
`app/(room)/playbook/page.tsx` ~line 852: the source reads `<span className="rl-num">$99</span> at launch &middot; $149 after`
but the compiled HTML (`.next/server/app/playbook.html`) reads `$99</span>at launch`. First find the
mechanism (inspect the compiled output; the line mixes an inline element, a same-line text run and an
HTML entity), then fix so the rendered text is "$99 at launch · $149 after" (an explicit `{" "}` is
acceptable). Add a verify-room check that the rendered Price row text equals "$99 at launch · $149 after".
Append a LESSONS entry (next free number on this branch) with the mechanism and the gate.
Verify: after the build, `grep -o '$99</span>[^<]\{0,12\}' .next/server/app/playbook.html` shows a space after the span.

## 3. /packages card interiors (layout, side-by-side widths only)
The three `<article>` cards (~lines 161/189/227) have descriptions of 2/6/2 lines, so the feature
rows and the space above the buttons do not align across cards (`.planning/qa/pass-103/packages-1440.png`).
Fix with CSS subgrid: each card `display: grid; grid-template-rows: subgrid; grid-row: span <N>` where
N is the count of the card's direct children, so the description row takes the tallest card's height
in all three and the feature lists and buttons start on common rows. Scope it to the breakpoint where
the cards sit side by side; the single-column layout at 390 is unchanged. No markup change beyond a
class if needed, no new tokens, no new hex.
Verify (Playwright at 1440): the y of the first feature row in each of the three cards is equal ±1px,
and the y of the three buy buttons is equal ±1px. Record the numbers in the report.

## 4. Widowed headline words (typography)
`text-wrap: balance` exists (`app/room.css:1248`, `app/room-and-ledger.css:1127`) but the section
heads and card headlines on the ported pages still widow: /about "What I'm known for" (390),
"Software for marketing and contracts.", "Products I build from start to finish."; /playbook "One
sentence, four rounds apart", "Chapter one, free", "Where the ten live" (390); /call "Thirty minutes.
Bring the problem."; the NDA card headline on /work/guardicore (390); the confidential card headline on
/work/content-engine (390). Widen the selectors to every h2/h3 and card headline on the ported pages.
EXCLUDE the home hero headline and the home's copper row (positioned by the fingertip; verify-room's
fingertip checks must stay green) and any heading the winning brief §14.7 positions by hand.
Verify: screenshots at 390 and 1440; list each named heading with its last line's word count before
and after. Where `balance` cannot remove a widow, say so; do not insert manual breaks.

## 5. Screenshot procedure
Before each 1440 capture wait for `document.fonts.ready` plus 3s so `<WallChart />` (draws once on
load at ≥ 900px) is in its finished frame; the Pass 103 playbook-1440 capture caught it mid-draw.

## 6. Gates and record
`pnpm build` green · `python -P scripts/verify-room.py` green (62 checks after §2) · axe on /about,
/packages, /playbook, /call unchanged · screenshots of the four pages plus /work/guardicore and
/work/content-engine at 390 and 1440 to `.planning/qa/pass-103b/` · a report `verification.md` there
with every command and number. DO NOT COMMIT. Do not push.

## 7. Return conditions
Any change to a ticked string · a fingertip check failing on a MEASURED frame (a `16.2-arrival`
FAIL that reads "ffmpeg missing or clip absent" is the executor's sandbox, not the fingertip: note
it, keep going, and Fable runs the final verify-room outside the sandbox where ffmpeg is on PATH;
Fable ruling 2026-09-08 after the first run stopped on it) · §3 needing markup changes beyond a class ·
a mechanism for §2 you cannot demonstrate in the compiled output.

## 8. Execution record
- Run 1 (Codex, 8 min): §2 mechanism demonstrated (SWC drops the leading space of a multi-line JSX
  text run that contains an entity), the price-row check added; stopped on the sandbox ffmpeg FAIL
  before §1/§3/§4. Run 2 continues from there.
