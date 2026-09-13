# Kickoff: micahjonesconsulting, after 2026-09-12

Boot cheaply, prove the tools, report readiness, present Micah's open queue, then wait.
This file supersedes the 2026-09-11 kickoff. The 2026-09-12 routing ruling (section 5) and
`C:/Users/micah/.claude/MODEL_ROUTING.md` §9e are the routing law; the latest ruling wins.
Evolve the live site. Do not resume Pass-104b or the rejected dark rebuild.

## 0. Where the site stands (verified on production 2026-09-12)

- Production: `main` = `79534b8`, deployment `dpl_BuNe67xzMiEGEEi4hKSXCSyHdrsw` on BOTH
  `https://www.micahjonesconsulting.com` and `https://micahjonesconsulting.vercel.app`.
- Branch `design/live-evolve` = `35351fc` (records only past main), pushed.
- Shipped 2026-09-12, each judged, Astra-gated, and verified on both live domains:
  - Pass-113: Postmates and Neuton.AI studies neutralized.
  - Pass-114: the home `$20M+` count-up (operator exception to DESIGN_BAR R13/R15).
  - Pass-115/115b: the hand loop redrawn around the whole number, figure indented to the
    column edge, dash measured in screen pixels (Fable SHIP before merge).
  - Pass-116: Fable's six later items (no loop blink, resize-proof hidden dash, once per
    load, Postmates "That promise invited fraud.", Neuton tag "Helped launch · exit 2025").
- Open verification debt: `components/hand/HandUnderline.tsx` has the dash fix but is
  UNVERIFIED IN RENDER because nothing mounts it. Whoever mounts it runs C11-style coverage.

## 1. Boot once, cheaply

Work only in `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch
`design/live-evolve`. The main checkout `C:/Users/micah/Code/micahjonesconsulting` is behind
origin and has Micah's uncommitted files; do not touch it or switch checkouts.
Read only these, in order. Do not explore code, history, or transcripts.

1. `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/RESUME.md` (current state).
2. `C:/Users/micah/.claude/CLAUDE.md` and `C:/Users/micah/.claude/ULTRACODE_OPERATING_PATTERNS.md`.
3. `C:/Users/micah/.claude/MODEL_ROUTING.md` §§6, 8, 9, 9a–9e.
4. `C:/Users/micah/.claude/projects/C--Users-micah-Code-micahjonesconsulting/memory/MEMORY.md` (index only).
5. `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/docs/LESSONS_LEARNED.md` #3 (the ledger) and #23–#27.
6. `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/briefs/README.md` (three standing Verification clauses).
7. `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/DECISIONS-2026-09-11.md` §§6–8 only. Hold them for section 4.

The project rules auto-load (`CLAUDE.md`, `.claude/CLAUDE.md`, `AGENTS.md` in the worktree).
Their older Fable-resident prose does not override the 2026-09-12 ruling.

## 2. Prove the tools exist (PowerShell)

```powershell
Set-Location -LiteralPath 'C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live'
& 'C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe' -NoProfile -ExecutionPolicy Bypass -File 'C:/Users/micah/Code/micahjonesconsulting/scripts/claude-glm.ps1' -Smoke
Write-Output "GLM smoke exit: $LASTEXITCODE"
& 'C:/Program Files/Git/cmd/git.exe' status --short --branch
& 'C:/Program Files/Git/cmd/git.exe' log -3 --oneline --decorate
codex login status
codex --version
```

Expect `design/live-evolve` at `35351fc` or a later handoff commit, 0 behind origin; `main`
at `79534b8`. Expect ONE tracked modification (`.planning/qa/pass-112/server.log`, pre-existing)
and about 70 untracked scratch files under `.planning/exec/`. Preserve them; never clean.

GLM (z.ai) hit its WEEKLY limit on 2026-09-12: reset `2026-09-15 11:57:18` z.ai time, about
2026-09-14 20:57 Pacific. A 429 before then is expected; record it and route to Sol. After the
reset, GLM's five-hour window applies again. Do not loop retries. `codex --version` and login
status prove Codex resolves without spending quota. Do not launch the alternate Claude account.

## 3. Readiness report, at most 10 lines

Model and effort from your statusline (say unknown if not shown), working directory, branch,
HEAD, dirty files, GLM response with its reset time, Codex login, and any missing MCP servers,
plugins, or skills. The operator owns model switches; recommend, never launch.

## 4. Present the open queue, then wait

Present these in one message, each with its recommendation and the ruling you need. Do not
decide operator-owned facts. No page work, builds, research fan-out, or QA before he rules.

From `DECISIONS-2026-09-11.md`: all nine are ruled (1–5 and 9 shipped). Ruled 2026-09-12,
do not re-present:
- **6.** Micah supplies real Ordani screens later ("I will do that later"). Section unchanged.
- **7.** Book work runs in a separate chat ("book work will take place in other chat"). The
  spread image is already gone: `/playbook/spread-money.png` is 404 on both domains.
- **8.** `$5B+` stays ("keep"). Recorded in LESSONS #3.

Standing operator-owned items (RESUME):
- Stripe: turn off playbook-99; update the LIVE Audit product description to the area names
  (it may still say "prioritized fix sequence"; only Micah can see the live record).
- Run the live $500 purchase and refund test (checkout changed since test mode was verified).
- Supply the A4/S3 text; rule on the five parked bar items.
- MODEL_ROUTING §9a: the two Anthropic support questions stay Micah's.

## 5. Routing after Micah rules

Operator 2026-09-12, verbatim: "make sure we are not using all our claude usage in just a few
days ... i do not want to sacrifice on quality." How that ran all day, and should keep running:
- **Claude (this account) rules, briefs, judges, records.** No multi-agent Claude workflows or
  fan-out; name `model:` on any Agent call. Fable only when Micah asks (one pre-merge look cost
  about 124k tokens).
- **GLM 5.3 executes briefs** when its quota is live: `C:/Users/micah/Code/micahjonesconsulting/scripts/claude-glm.ps1 -Dir <worktree>
  -Batch -PromptFile <abs pointer>`, launched detached (`Start-Process ... -PassThru`) and
  watched by PID. The pointer file carries no quotes and names the absolute brief path.
- **Sol writes when GLM is out:** `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high
  --sandbox workspace-write -C <worktree> -` with the prompt on stdin. Its sandbox cannot
  build, serve, run a browser, or commit (LESSONS #18), so the main session runs the build,
  server, puppeteer checks, and commits, in the brief's order.
- **Astra judges quality gates only**, one look per pass: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/scripts/codex-exec.ps1
  -Review -Model gpt-6-astra -Prompt <abs> -Out <abs> -Image <abs,abs> -Dir <worktree>`.
- Every brief lives in `.claude/briefs/` and follows `README.md`, including its three standing
  clauses. Every push, merge to main, and deploy needs Micah's words that day, quoted in RESUME.

## 6. Gates that exist now

- Build `npx next build --webpack`. Serve `npx next start --port 3200`. Stop the server with
  PowerShell `Stop-Process` on the PID from `Get-NetTCPConnection -LocalPort 3200`.
- Static: `npx tsc --noEmit`, `npx tsx lib/copy-lint-cli.ts`,
  `node scripts/retired-phrases-gate.mjs`, `node scripts/accent-states-lint.mjs`,
  `node scripts/gsap-quarantine-gate.mjs`, `npx prettier --check <changed ts/tsx/css>`.
- Served: `node scripts/render-gate.mjs`, `node scripts/axe-worlds.mjs http://localhost:3200 /`.
- The `$20M+` figure: `node .planning/exec/circle115.mjs --p116 --out <dir>` runs C1–C14
  (geometry, rendered stroke coverage, resize, once per load, no hidden frame). Also `--probe`.
  `node .planning/exec/countup114.mjs` runs the count-up contract (7 checks); it REWRITES the
  Pass-114 PNGs, so run `git checkout -- .planning/qa/pass-114/` after it.
- Copy markers: `bash .planning/exec/card1-115.sh` checks both live domains and deployment ids
  (set `BASE_DPL` to the CURRENT live id before a deploy); `bash .planning/exec/card1-115.sh
  http://localhost:3200` checks one base.
- Production copies of circle115: sed its `const S` line to a live domain into a `.tmp.mjs` next
  to the original, run, delete.

## 7. Traps learned 2026-09-12

- Served `grep -c` counts the RSC payload too; exact counts need visible DOM text (#24).
- An executor never reinterprets an expected value; it stops before committing (#25).
- Measure the render, not the model, and prove each check fails on broken code first (#26).
- Header links are plain anchors (full loads); case-study home links are client navigations.
  A navigation check asserts which kind it uses (#27).
- Production CSS hrefs carry `?dpl=`; match `.css[^"]*`, not `.css"`.
- Puppeteer `screenshot({clip})` renders unscrolled here; take a full frame and crop.
- `taskkill //F` breaks under `MSYS_NO_PATHCONV=1`; stop servers with PowerShell `Stop-Process`.
- PowerShell `*>` logs are UTF-16; decode with `iconv -f UTF-16` before grep.
- Long single tool writes can truncate mid-file late in a session; write in short parts.
- Commit only by explicit pathspec after reading `git diff --cached --name-only` (#23).

## Micah: open the next chat

In the Claude desktop app's Code tab, choose the p106-live worktree as the working directory.
Pick Sonnet (or Opus for a ruling-heavy day), then paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it exactly.`
