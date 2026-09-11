# Fact-check report

## `.planning/handoff/KICKOFF-DRAFT-ASTRA.md`

OK count: 78 other line-level claim groups, including explicit paths, launcher parameters, branch `design/live-evolve`, HEAD `7d2c9b4`, and the cited routing and lesson sections.

| claim (short) | verdict | evidence |
|---|---|---|
| September 11 supersedes all older routing instructions | WRONG | Kickoff:4 is too broad. `C:/Users/micah/.claude/MODEL_ROUTING.md:379-387` explicitly retains the §9b bucket check and applies the §6 cap to Fable and Opus. Only conflicting earlier routing is superseded. |
| Work only in `p106-live` | WRONG | Kickoff:9 conflicts with the recommended book action in `DECISIONS-2026-09-11.md:87-97`, whose source is `C:/Users/micah/Code/the-80-percent-wall/src/`. The handoff must either authorize that second repo after approval or assign the book work to Micah. |
| Sol and Astra are available through `codex-exec.ps1` | UNSOURCED | The wrapper exists and its flags are correct, but it invokes bare `codex` at `scripts/codex-exec.ps1:45,51`. Fresh checks returned `Get-Command codex: NOT RESOLVED`; invoking `C:/Users/micah/AppData/Roaming/npm/codex.cmd --version` returned `Access is denied`. Kickoff:31-49 intentionally tests only GLM, so ChatGPT execution is not proved during boot. |
| Codex cannot run a browser or server | UNSOURCED | Kickoff:80 states this categorically. `.planning/exec/sol111a.log:17` says only that the sandbox “may not allow” it and explicitly instructed that run not to try. `scripts/codex-exec.ps1:16,45,51` establishes sandbox modes, not a browser/server prohibition. |
| The summarized §6 brief contract is complete | WRONG | Kickoff:86 omits the contract’s first required item: the ruling in one paragraph with its one-line reason. The complete eight-item contract is in `C:/Users/micah/.claude/MODEL_ROUTING.md:144-159`. |
| Bare `next start` supplies the server expected by both browser gates | WRONG | Kickoff:97 gives bare `next start`, which defaults to port 3000 per `node_modules/next/dist/docs/01-app/03-api-reference/06-cli/next.md:318`. Both gates default to port 3100 at `scripts/axe-worlds.mjs:74` and `scripts/layout-gate.mjs:64`. Specify a port and pass the same base URL to each gate. |

## `.planning/handoff/DECISIONS-2026-09-11.md`

OK count: 77 other line-level claim groups, including the prices, transaction flow, motion figures, case-study text, `$5.58B` arithmetic, branch divergence, and Stripe setup behavior.

| claim (short) | verdict | evidence |
|---|---|---|
| Review flagged Neuton’s causal wording for explicit approval | WRONG | Decisions:67. The actual Sol review says “Stronger restatements and causal claims: None” and explains that Neuton preserves sequence without causality at `.planning/exec/sol110.log:1620-1626`. Its explicit-approval list at lines 1628-1633 concerns Postmates details. |
| Renaming only the chapter 6 heading aligns the paid PDF with the ban | WRONG | Decisions:87-97 overlooks a second occurrence in the live manuscript: `C:/Users/micah/Code/the-80-percent-wall/src/chapter-05.typ:55`. The chapter 6 heading is at `chapter-06.typ:56`. Both require a ruling if the ban is extended to the book. |
| `publish:site` publishes the rebuilt book into this worktree | WRONG | Decisions:93-95 does not state the required destination override. `C:/Users/micah/Code/the-80-percent-wall/scripts/publish-to-site.mjs:30-33` defaults to `C:/Users/micah/Code/micahjonesconsulting`, the main checkout, not `p106-live`. It needs an explicit `SITE_REPO=C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`. |
| Operator said “Yes rename it.” and selected “AI engineering” | UNSOURCED | Decisions:114. A verbatim search for `Yes rename it.` returns only the file under test. The upstream drafting prompt asserts the quote without an independent attestation at `.planning/prompts/SOL-DECISIONS-2026-09-11.md:31-32`. The documented direction instead recommends “Demo to production” at `.planning/design/DIRECTION-110.md:466-470`. |
| Construction-term ban is done for the site | WRONG | Decisions:118 checks only `app`, `components`, `content`, and `lib`. The public, directly servable asset `public/playbook/spread-money.png` visibly contains the banned heading. Its contents are also documented at `.planning/handoff/04-BOOK-MATERIALS.md:289`. |

## Three fixes that matter most

1. Rewrite decision 7 to cover both book occurrences, explicitly target the `p106-live` worktree through `SITE_REPO`, and state who is authorized to modify the separate book repo and deploy.
2. Remove the “AI engineering” ruling until a primary operator attestation is located, or present the rename as an open choice alongside the documented “Demo to production” recommendation.
3. Repair kickoff readiness: prove the inner `codex` executable, replace the unsupported browser/server prohibition with an actual capability test, and use one explicit server port for both browser gates.