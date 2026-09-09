# The executor tier — paste this into the running chat

The launchers were on `main` only. A worktree sees its own branch's tree, so from
`.claude/worktrees/p101-integrate` those paths resolved to nothing and you could not have found
them. They are now tracked on the branch (commit `c74fc98`, LESSONS #21). Verify before planning:

```bash
ls C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p101-integrate/scripts/*.ps1
```

## Use them. This is the operator's ruling of 2026-09-08, not a preference.
Verbatim: "lots of sol and only altra for qualty gates. altra is only top tier model we have -
fable gone for few days. we are at 29% chatgpt usage and 6 dayd till reset."

**You are the ruler, not the executor.** You write the brief, dispatch it, judge the result and
commit. You do not run the build loop yourself when an executor is available.

### GLM 5.3 — runs briefs, on z.ai's quota (cheapest; try this first)
```bash
powershell -NoProfile -ExecutionPolicy Bypass -File C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p101-integrate/scripts/claude-glm.ps1 -Smoke
```
If that answers `OK`, its five-hour window is open. Then, with the prompt in a file:
```bash
powershell -NoProfile -ExecutionPolicy Bypass -File C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p101-integrate/scripts/claude-glm.ps1 -Dir C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p101-integrate -Batch -PromptFile <prompt.md>
```
Run it with `run_in_background: true` and watch it with a Monitor loop on the log; it takes
10 to 25 minutes. **LESSONS #20: never hand it more spec than it can hold.** The Pass 104b specs
are already split per area under `.planning/design/104b/`, none over 21KB. Point each unit of work
at its own file, never at the whole synthesis.

### The second Claude account — a $20 plan, so bounded legs only
The operator completed the login and the workspace trust on 2026-09-08.
```bash
powershell -NoProfile -ExecutionPolicy Bypass -File C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p101-integrate/scripts/claude-alt.ps1 -Smoke
```
Same `-Dir` / `-Batch` / `-PromptFile` shape as GLM. Its allowance is small: give it one
mechanical job, not an open-ended pass.

### Astra / Codex — QUALITY GATES ONLY, and you get roughly one this pass
Never `-Brief`. Never a long execution run: one was launched and killed on this ruling, and the
operator's ChatGPT week is the scarcest thing in the harness.
```bash
powershell -NoProfile -ExecutionPolicy Bypass -File C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p101-integrate/scripts/codex-exec.ps1 -Review -Prompt <prompt.md> -Out <out.md> -Image <a.png,b.png> -Dir C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p101-integrate
```
Spend it once, at the end of Pass 104b: the juror look at the rebuilt home at 390 and 1440.

### Sonnet — the workhorse
Everything else. Execution legs, measurement, verification, sweeps. Name `model: 'sonnet'` on
every Agent and Workflow call; a fan-out that inherits a top tier is what ended a five-hour
window once already.

## Two standing traps for these launchers
- **Codex cannot commit inside a git worktree** (its git dir sits outside the sandbox). Executors
  write; you commit. LESSONS #18.
- **A workspace must be trusted once, interactively, per config directory**, or a non-interactive
  run silently ignores the project's permission allow-list. That has cost this project a run.
