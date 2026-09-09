# Kickoff for the next session — micahjonesconsulting, 2026-09-08

Paste this whole file as the first message of the new chat.

---

You are picking up an in-flight arc. Do the boot sequence first, then the ONE unfinished job below.

## 1. Boot
Read, in this order:
1. `.claude/RESUME.md` — current state. It, not any static doc, is the truth.
2. `C:/Users/micah/.claude/MODEL_ROUTING.md` §9 and §9a — the routing ruling that governs this
   arc, and the second-account launcher.
3. `.claude/briefs/pass-104b-home-rebuild.md` — the brief being executed. Its §0 lists seven
   load-bearing facts; getting one wrong breaks the pass.
4. `.planning/qa/pass-104b/verification.md` — how far the last session got, section by section.

Work happens on branch `design/room-and-ledger` in the worktree
`.claude/worktrees/p101-integrate`, NOT in the main checkout. A branch lives in one worktree.

## 2. Routing, and it is not optional (his ruling, 2026-09-08)
Verbatim: "lots of sol and only altra for qualty gates. altra is only top tier model we have -
fable gone for few days. we are at 29% chatgpt usage and 6 dayd till reset."

- **Astra / Codex: QUALITY GATES ONLY.** Jurying design and copy, the buyer read at a ship gate.
  NEVER a long `codex exec` execution of a brief. One was launched and killed on this ruling.
- **Sonnet: the workhorse.** Execution legs, measurement, verification, sweeps.
- **GLM 5.3** (`scripts/claude-glm.ps1`): executes briefs on z.ai's quota. Smoke-test first; its
  five-hour window resets. LESSONS #20: it needs its context window declared, which the script
  now does, and it must not be handed more spec than it can hold.
- **The second Claude account** (`scripts/claude-alt.ps1`): the operator completed the one-time
  login and workspace trust on 2026-09-08. It is a $20 plan, so its allowance is small — use it
  for a bounded mechanical leg, not an open-ended one.
- Name `model:` on EVERY Agent and Workflow call. A fan-out that inherits the top tier is what
  ended a five-hour window once already.

## 3. The unfinished job
Pass 104b, the home rebuild, is six sections of seven applied and COMMITTED BUT UNVERIFIED
(`cc2f3fd`, `c710075`, `b2d1a0f`, `8e6fcda`). What remains, in order:

1. **Section 7 of the brief, the footer.** With the book block gone, `.foot .nav` spans columns
   7 to 13 but its links sit at the column's left edge, so the right third is visibly empty.
   Rebalance inside the existing system. No new material, no new copy.
2. **Verify the whole pass.** `pnpm build`; then `pnpm start --port <free>` and
   `python -P scripts/verify-room.py http://localhost:<port>/` (a `16.2-arrival` FAIL saying
   ffmpeg is missing is a sandbox artefact — run it where ffmpeg is on PATH and it passes);
   axe on `/` at 390 and 1440; Lighthouse mobile, which **must not fall below 86** — the new
   video files total roughly 3.9MB on disk and the phone now gets a 1.2MB file, so this is a
   real risk, not a formality. Screenshots at 390 and 1440 into `.planning/qa/pass-104b/`.
3. **Fix what verification finds**, then commit.
4. **The one Astra spend of this pass:** the juror look at the rebuilt home at 390 and 1440,
   `scripts/codex-exec.ps1 -Review` with the images attached. That is the quality gate his
   ruling reserves Astra for. Do it once, at the end, not before.
5. Tell him to **re-push** for a fresh preview:
   `git -C .claude/worktrees/p101-integrate push origin design/room-and-ledger`

## 4. What is his, not yours
- Every push and every deploy. The preview is
  `micahjonesconsulting-git-design-room-and-ledger-passioneer.vercel.app` (his Vercel login).
- Merging to main, and the ship gate.
- Re-running `scripts/stripe-setup.mjs`: the live Audit product description still carries the
  retired phrase "prioritized fix sequence".
- Asking Anthropic support the two open questions in MODEL_ROUTING §9a before the second account
  is treated as budget.

## 5. Standing traps that have each cost this project a run
- Every push to main auto-deploys.
- Bash heredocs collapse doubled backslashes; build escape bytes from codes.
- The scratchpad's `copy.py` shadows the stdlib, so run python with `-P`.
- `scripts/verify-room.py` overwrites PNGs under `.planning/qa/pass-101/verify/`; restore them
  with `git checkout -- .planning/qa/pass-101` after any verifier run.
- Codex cannot commit inside a git worktree (its git dir is outside the sandbox). Executors
  write, this session commits.
- A workspace must be trusted once interactively per config dir, or a non-interactive run
  silently ignores the permission allow-list.
- `.claude/RESUME.md` is capped at 2.5KB and the cap is checked in bytes before every commit.
