# RESUME — micahjonesconsulting (2026-09-09)

## READ FIRST

Routing: **MODEL_ROUTING §9b** corrects §9. Two buckets — conserving ChatGPT never implied
conserving Anthropic; Opus executes in-session while Anthropic has headroom. **The GLM
launcher takes the whole prompt as argv: any `--token` in brief text kills the run**
(codex `-Review` pipes stdin: safe).

Branch `design/room-and-ledger`, worktree `.claude/worktrees/p101-integrate`.
**NOT PUSHED. NO deploy.** One writer here.

## Pass 104b — sections 1–7 APPLIED, VERIFIED, COMMITTED

`0ed6f52` fixes · `65d84e7` record · `8dca04a` Astra.
Numbers: `.planning/qa/pass-104b/verification.md`.

- **§7 footer**: nav right-aligned to the gutter. Dead gutter 521.94px (37.9%) → **0.00**
  at 1440; 390 unchanged. Rule shared with the five (room) routes.
- **§6 door — real defect, fixed.** Chip sat at the column TOP, 621px off the hairline
  (explicit `grid-row:1` pushed auto-placed `.sec` to row 2). Now **0.0**.
- **Gates**: verify-room **84/85** (lone FAIL `14.7` = §2's known ruling) · axe **0
  violations any impact, 12/12** · **Lighthouse mobile 94** (floor 86) · build green.

## NEXT — the operator pushes

`git -C .claude/worktrees/p101-integrate push origin design/room-and-ledger`

## OPEN — operator-owned, do not absorb

- **Astra does NOT endorse the pass** (`ASTRA-104B-HOME.md`): hero sign reads as
  DECORATION not proof · operator band still soft at 1440 · packages band is NOT the
  loudest, the copper ask is. Nothing applied. It also flags the book 104a deliberately
  removed, and names a nonexistent person; read change 3 with care.
- **Three gate edits brief §6 does not name**: `14.4-heads` (24→28 / 17→19),
  `14.8-renders-with-javascript-off` (qs_n 2→3), `stacked` 2→3. Same facts §6 orders, in
  gates it did not enumerate; all stay exact-value. **Confirm or reverse.**
- `/services` 1 serious contrast, `.cw-lede-link` 1.95:1 scrolled; fails on main too.
- Dead `.foot .book` CSS. Separate cleanup.
- Global `settings.json` wildcard-before-command allow rules over-approve. Queued.
- Stripe webhook + live $500 buy/refund, then `PLAYBOOK_ON_SALE=1` = launch.

## Standing traps

Every push auto-deploys · **stale `next start` on :3000 serves OLD chunks** · `python -P`
(scratchpad `copy.py` shadows stdlib) · `verify-room.py` clobbers `.planning/qa/pass-101`,
restore after each run · **`grep -c` counts LINES, not occurrences** · lighthouse
`--output-path=/tmp/…` writes nothing here · axe needs fonts.ready + a wheel walk.
