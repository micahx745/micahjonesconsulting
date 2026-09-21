# Brief: Pass-124 cuts preview — build every proposed cut, capture before/after

Written 2026-09-20 by the main session (Opus 5). Operator ruling (LESSONS #3, 2026-09-20,
"PASS-124 TICKING METHOD"): every cut in `.planning/mocks/pass-124/CUTS-PROPOSED.md` is built on
a PREVIEW branch that never merges, captured before and after at 390 and 1440, and he ticks from
the sheets. You are building that preview. You are NOT deciding anything.

## Hard rules
1. **Straight removals only.** The ONLY character change allowed anywhere is the capital "E" in
   A5 and D1 (below). If a cut cannot be applied exactly as written, STOP that cut, leave the
   source untouched, and report it. Never improvise a nearby edit (LESSONS #25, #36, #37).
2. **Never touch `design/live-evolve` or the `p106-live` worktree's source.** Another session
   works there. Your only writes into p106-live are the sheets under `.planning/qa/pass-124/`.
3. **Never push. Never deploy.** Nothing here reaches production.
4. Line numbers are hints from commit `9d2a277`. **Match by text.**

## Setup
From `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`:
`git worktree add ../p124-cuts -b pass-124/cuts-preview 9d2a277`
then in `../p124-cuts`: `C:/Users/micah/AppData/Roaming/npm/pnpm.cmd install --frozen-lockfile`.
Commit the applied cuts on `pass-124/cuts-preview`. If a commit in that worktree is refused
(LESSONS #18), report it and continue uncommitted.

## The cuts — exactly these, nothing else
Treatment key. **DEL** = delete the element or sentence. **SR** = keep the element, its tag, its
`id` and its text; replace its `className` with `cw-sr-only` (the Pass-122 "The receipts."
treatment he ruled: off the screen, kept for screen readers). SR is used for every HEADING,
because B2, B3 and C2 are `aria-labelledby` targets and the others are a section's only name.

| ID | File (app/(foyer)/...) | ~Line | Text | Treatment |
|---|---|---|---|---|
| A1 | page.tsx | 272 | `<p className="cw-kicker cw-reveal">Operating principles</p>` | DEL element |
| A2 | page.tsx | 274 | h2 `How I work.` | SR |
| A3 | page.tsx | 301, 358, 433 | the three `<p className="cw-principle__num">01/02/03</p>` | DEL the three elements |
| A4 | page.tsx | 365-366 | `No decks. No discovery debt.` (inside cw-principle__text) | DEL both sentences; leaves "Every engagement ships a named artifact in month one." |
| A5 | page.tsx | 192 | the `fine=` prop's lead-in `The rules, in plain terms: ` | DEL the lead-in; capitalise the next word so it reads `Every package fee credits...` |
| A6 | page.tsx | 171 | the `tag="Start here"` prop | DEL the prop. Do NOT edit `components/color-worlds/PackageBand.tsx` (it renders /services, not in scope) |
| A7 | page.tsx | 740 | `<p className="cw-door__kicker">Running a growing business</p>` | DEL element |
| A8 | page.tsx | 742 | `Too big for duct tape. Not ready for an agency retainer.` | DEL both sentences; leaves "You get me directly." |
| A9 | page.tsx | 745-746 | `Diagnosis, a shipped artifact in month one, and a system your team runs without me.` | DEL the sentence |
| A10 | page.tsx | 440-441 | `That takes longer than a launch week.` | DEL the sentence; leaves "I stay until the narrative sells without me." |
| A11 | page.tsx | 721 | `<p className="cw-door__kicker">Building solo, with AI</p>` | DEL element |
| B1 | services/page.tsx | 323, 337, 351, 366 | the four links `Ask about Advisory →`, `...a project →`, `...a retainer →`, `...Embedded →` | DEL each ENTIRE enclosing `<a>` element (an empty link is an a11y failure) |
| B2 | services/page.tsx | 375-377 | h3 `#sv-incl-title` `Every engagement includes` | SR |
| B3 | services/page.tsx | 389-391 | h3 `#sv-areas-title` `Three areas of work` | SR |
| B4 | services/page.tsx | 452 | h2 `Why one person` | SR |
| B5 | services/page.tsx | 473 | `<p className="cw-services__foot-kicker">Next step</p>` | DEL element. KEEP the section's `aria-label="Next step"` |
| B6 | services/page.tsx | 279 | `<p className="cw-services__kicker">For companies</p>` | DEL element |
| B7 | services/page.tsx | 289 | `<p className="cw-sv-open__proof-lbl">Proof</p>` | DEL element |
| C1 | about/page.tsx | 145 | h2 `What I&rsquo;m known for` | SR |
| C2 | about/page.tsx | 78-80 | h2 `#cw-about-receipts-title` `Receipts` | SR |
| C3 | about/page.tsx | 178 | h2 `Currently` (renders as "Currently Building" live; cut only this h2) | SR |
| D1 | packages/page.tsx | 212 | lead-in `The rules, in plain terms: ` in `cw-pkgs__fine` | DEL lead-in; capitalise `Every package fee...` |
| D2 | packages/page.tsx | 135 | `<span className="cw-pkg__tag">Start here</span>` | DEL element |
| D3 | packages/page.tsx | 120 | `No scoping call, no proposal, no quote to wait for.` | DEL the sentence only |
| E1 | contact/page.tsx | 56 | `<p className="cw-bk__form-label">A note</p>` | DEL element — but FIRST confirm every form field keeps its own label; if "A note" is any field's only label, STOP E1 and report |

A3+ (the whole `01 Diagnose` labels) is an ALTERNATIVE he may tick instead of A3. Do not build it.

## Gates — run all, paste output verbatim
In `../p124-cuts`, run each command of package.json's `build` script that precedes `next build`,
in order (copy-lint, vendor-gate, retired-phrases-gate + self-test, accent-states-lint +
self-test, gsap-quarantine-gate + self-test), then `npx next build --webpack` (`pnpm build`
fails on this machine), then render-gate, work-entry-gate + self-test, results-repeat-gate +
self-test.
EXPECT: every command exits 0; copy-lint prints "Zero banned-word findings, zero schema
violations." and no `[em-dash-cap]` block. Any failure: STOP and report; do not fix it.
Never judge an exit code through a pipe (repo trap).

## Capture
Serve `../p124-cuts` with `node node_modules/next/dist/bin/next start -p 3241` (not 3236).
Pages: `/`, `/services`, `/about`, `/packages`, `/contact`.
- BEFORE = production `https://www.micahjonesconsulting.com<page>` (serving `c7b7e32`; the only
  source differences to `9d2a277` are page titles and docs, invisible in a screenshot).
- AFTER = `http://localhost:3241<page>`.
- Widths 390 and 1440, FULL PAGE, with reduced motion emulated (`reducedMotion: "reduce"`) so
  every reveal renders finished. Never `elementHandle.screenshot()` (repo trap). Reference
  patterns: `.planning/exec/capture-rec-123.mjs`, `.planning/exec/band123.mjs`.
- On each BEFORE, mark every element about to be cut: a 3px outline in #bd5a2d and a small
  label with its ID (A1, B4...) at its top-left, injected by `page.evaluate` before capture.
  If a marker cannot be placed, say which ID.
- Compose one sheet per page per width: BEFORE (marked) left, AFTER right, a header line with
  the page and width. Write to p106-live:
  `.planning/qa/pass-124/sheets/cuts-<page>-<width>.png` (`home` for `/`). Ten sheets.
- Stop the server afterwards (Stop-Process on its PID).

## Accessibility
Run axe (see `.planning/exec/axe118*.txt` for the prior method) on the five AFTER pages and the
five BEFORE pages. Report serious + critical counts per page, BEFORE vs AFTER. Do not fix.

## Report back (your final message)
Preview commit hash (or "uncommitted" and why) · each cut ID with APPLIED / STOPPED + reason ·
gate outputs verbatim · the ten sheet paths · axe counts BEFORE vs AFTER · anything unexpected.

## Rejected — do not build these (from CUTS-PROPOSED.md "REJECTED")
Row tags (`Revenue and positioning`, `Enterprise sales`, `Product analyst`, `Helped launch · exit
2025`), `The receipts.`, the /work method line, the ORDANI money line, the Guardicore did-line,
`Four exits I worked inside`, every Buy/See/Join/NAME THE PROBLEM CTA, the Audit bullets,
`Covers one area: ...`, nav chrome, `The demo took a weekend...`, `Built for the people who show
up for mothers.`, and /services' `Start here` in PackageBand.
