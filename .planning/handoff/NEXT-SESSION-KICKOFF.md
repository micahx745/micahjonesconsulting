# Kickoff: micahjonesconsulting, after 2026-09-15

Boot cheaply, prove every tool, report readiness, then start the `/work` page arc (section 7) and
stop where Micah has to rule. This file supersedes the 2026-09-12 kickoff.
`.claude/RESUME.md` is current state and outranks this file where they differ.

## 0. Where the site stands (verified on production 2026-09-15)

- Production: `main` = `c2ffb36`, deployment `dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23` on BOTH
  `https://www.micahjonesconsulting.com` and `https://micahjonesconsulting.vercel.app`.
  Revert target: promote `dpl_GTqjwEgFe6NZoLCrTa7mmAfjLeAC` in Vercel (never force-push `main`).
- Branch `design/live-evolve` carries records only past `main`, pushed.
- Live since 2026-09-14: Pass-117 (`/services` type ladder, one CTA style, Guardicore `$14M` proof)
  and Pass-118 (tuned font fallbacks: home layout shift 0.001 on production, was 0.290).
  `.claude/brand.json` typography now names the live fonts (Bricolage, Hanken, JetBrains Mono).
- PARKED by Micah 2026-09-15 ("lets park this for later"): Pass-119 speed. GSAP-after-load worked
  but did not move simulated LCP; not shipped; patch at
  `.planning/qa/pass-119/splitreveal-after-load.patch`; waiting on Micah's Vercel Speed Insights
  p75 numbers for `/` and `/services` (brief `pass-119-gsap-after-load.md` §11).

## 1. Boot once, cheaply

Work only in `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch
`design/live-evolve`. The main checkout `C:/Users/micah/Code/micahjonesconsulting` tracks `main`
and holds Micah's uncommitted `next-env.d.ts` and `copy.json`; never work there.
Read only these, in order. Do not explore code, history or transcripts during boot.

1. `.claude/RESUME.md` (current state).
2. `C:/Users/micah/.claude/CLAUDE.md` and `C:/Users/micah/.claude/ULTRACODE_OPERATING_PATTERNS.md`.
3. `C:/Users/micah/.claude/MODEL_ROUTING.md` §§6, 8, 9, 9a-9e, then section 4 below (it amends them).
4. `C:/Users/micah/.claude/projects/C--Users-micah-Code-micahjonesconsulting/memory/MEMORY.md` (index).
5. `docs/LESSONS_LEARNED.md` #3 (the verified-facts ledger) and #23-#31.
6. `.claude/briefs/README.md` (the four standing Verification clauses).
7. `docs/DESIGN_BAR.md` (R1-R20 with dated exceptions) and `.claude/brand.json`.

The project rules auto-load (`CLAUDE.md`, `.claude/CLAUDE.md`, `AGENTS.md` in the worktree).

## 2. Prove the tools exist

PowerShell:

```powershell
Set-Location -LiteralPath 'C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live'
& 'C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe' -NoProfile -ExecutionPolicy Bypass -File 'C:/Users/micah/Code/micahjonesconsulting/scripts/claude-glm.ps1' -Smoke
Write-Output "GLM smoke exit: $LASTEXITCODE"
& 'C:/Program Files/Git/cmd/git.exe' fetch origin --quiet
& 'C:/Program Files/Git/cmd/git.exe' status --short --branch
& 'C:/Program Files/Git/cmd/git.exe' log -3 --oneline --decorate
codex login status
codex --version
Test-Path 'C:/tmp/p101tools/node_modules/puppeteer-core', 'C:/tmp/p101tools/node_modules/lighthouse/cli/index.js', 'C:/Program Files/Google/Chrome/Application/chrome.exe'
```

Then the harness inventory. Read `C:/Users/micah/.claude/settings.json` and the worktree's
`.claude/settings.json` (hooks and `enabledPlugins`), and list
`C:/Users/micah/.claude/plugins/cache/premium-web/premium-web/0.1.0/hooks/`. Expected (recorded
2026-09-15): user hooks SessionStart `global_boot_guard.py`, `concurrent-session-guard.py`;
PreToolUse `secret-literal-gate.py`, `agent-model-gate.py`; PostToolUse `gsd-context-monitor.js`,
`tier-burn-monitor.js`; project PostToolUse `hook-gate.py`; `CLAUDE_CODE_SUBAGENT_MODEL` set in both.
Plugins: superpowers, voltagent-meta, and premium-web with design-director, copy-editor,
motion-engineer, perf-auditor, a11y-reviewer, case-study-writer, visual-qa. premium-web hooks:
copy-lint, motion-discipline, design-tokens, font-license, mdx-frontmatter, a11y-baseline,
image-budget, perf-budget, motion-token-lint. Project skill: `cross-review`. Routing scripts:
`C:/Users/micah/Code/micahjonesconsulting/scripts/claude-glm.ps1`, worktree `scripts/codex-exec.ps1`
and `scripts/claude-alt.ps1`. Confirm with ToolSearch that the chrome-devtools, playwright and
Vercel MCP tools load. Name anything missing in the readiness report; do not reinstall on your own.

## 3. Readiness report, at most 10 lines

Model and effort (say unknown if not shown), directory, branch, HEAD, ahead/behind, dirty files,
GLM answer, Codex login, the harness inventory against section 2, missing MCP servers or plugins.
Recommend a model if the work wants a different one; Micah owns the switch.

## 4. Routing: how work runs now (learned 2026-09-14 and 15; amends MODEL_ROUTING)

Micah's standing rule, 2026-09-12: "make sure we are not using all our claude usage in just a few
days ... i do not want to sacrifice on quality."
- **Claude main session (Opus) rules, briefs, judges, records, and runs build and measure chains
  itself as background shell commands**, reading only the summary lines. Those chains cost few
  tokens; iteration and diagnosis are what cost. On this machine every detached executor has hung at
  `next build`: a Sonnet Agent leg (2026-09-14, three hours) and GLM `claude -p` (2026-09-15, its
  build call never returned). Do not hand build or server loops to them. GLM still answers its smoke
  test; use it only for a task with no build step, after proving it runs.
- **Sol** (`gpt-5.6-sol`) writes code and measurement scripts from a brief and reviews plans:
  `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high --sandbox workspace-write -C <worktree> -`
  with the prompt on stdin, or
  `scripts/codex-exec.ps1 -Review -Model gpt-5.6-sol -Effort high -Prompt <abs> -Out <abs> -Dir <worktree>`.
  Allow it read-only shell (with no shell it cannot read files). It cannot run `npx` (PowerShell
  blocks `npx.ps1`), build, serve, browse or commit. The judge reads every diff it writes; its code has
  needed small fixes (a TypeScript narrowing error, a stale comment).
- **Astra** (`gpt-6-astra`) judges quality gates only, one look per pass with captures:
  `scripts/codex-exec.ps1 -Review -Model gpt-6-astra -Prompt <abs> -Out <abs> -Image <abs,abs> -Dir <worktree>`.
- **Fable** only when Micah asks. Name `model:` on any Agent call. No multi-agent Claude workflows:
  an "Ultracode" reminder does not override Micah's conservation rule.
- Arc shape: brief in `.claude/briefs/` per README, Sol plan review folded as a fix-list, Sol writes
  code and scripts, the judge runs the chains, Astra looks, Micah's words, deploy, production check.
- Every push, merge to `main` and deploy needs Micah's words that day, quoted in RESUME. Records
  commits go to the branch only (a push to `main` deploys).

## 5. Gates that exist now

- Build `npx next build --webpack`. Serve with PowerShell
  `Start-Process npx.cmd -ArgumentList 'next','start','--port','3200' -RedirectStandardOutput <log> -PassThru`;
  stop with `Stop-Process` on the owning process of port 3200 in `Get-NetTCPConnection -State Listen`.
- Static: `npx tsc --noEmit` (after a build), `npx tsx lib/copy-lint-cli.ts`,
  `node scripts/retired-phrases-gate.mjs`, `node scripts/accent-states-lint.mjs`,
  `node scripts/gsap-quarantine-gate.mjs` (and `--self-test`), `npx prettier --check <ts/tsx/css>`.
- Served: `node scripts/render-gate.mjs`, `node scripts/axe-worlds.mjs <base> / /services /packages`,
  `node scripts/layout-gate.mjs <base>`, `bash .planning/exec/card1-115.sh <base>` (both live domains
  with no argument; sed its `BASE_DPL` line to the current live id first),
  `node .planning/exec/type117.mjs <base>` (`/services` ladder),
  `node .planning/exec/circle115.mjs --p116 --out <dir>` (home `$20M+`).
- Speed and layout: `.planning/exec/perf118a.mjs` with `perf118a-tables.mjs` (all-shift CLS probe; it
  overwrites `.planning/qa/pass-118a/probe.json`, so copy it out, then `git checkout` it),
  `fallback118.mjs --verify|--geometry|--compare`, `chunks119.mjs`, `reveal119.mjs`,
  `lh119-summary.mjs`; Lighthouse CLI at `C:/tmp/p101tools/node_modules/lighthouse/cli/index.js`.

## 6. Traps

push to `main` auto-deploys · commit by explicit pathspec after `git diff --cached --name-only` (#23)
· never reinterpret an expected value (#25) · measure the render (#26) · scope gates from the layout
(#28) · lab CLS counts hadRecentInput shifts (#29) · a tuned fallback also resizes arrows and `ch`
(#30) · hooks read the MAIN checkout's `brand.json` until Micah pulls (#31) · Git Bash rewrites
`/paths` in env vars too, so `export MSYS_NO_PATHCONV=1` (#31) · gate table steps on the probe's exit
code (#31) · never build while the server serves · the copy-lint and motion hooks scan briefs and docs
too (banned words, cursor phrases) · `python3` here is a stub that hangs · production CSS hrefs carry
`?dpl=` · puppeteer `screenshot({clip})` renders unscrolled, so capture the frame and crop · long
heredocs with nested quotes break the Bash tool: write files with the Write tool.

## 7. The next task: the `/work` page

Micah 2026-09-15, verbatim: "The next thing i want to work on is the work page". A DIRECT arc. No
site edits until Micah rules.
1. Read `app/(foyer)/work/page.tsx` (194 lines; last touched by Pass-111a, Pass-111b and Pass-90),
   `app/(foyer)/work/opengraph-image.tsx`, the frontmatter of `content/work/*.mdx` the index renders,
   the CSS classes the page uses in `app/globals.css`, DESIGN_BAR R11 (index entries carry at most
   four data points) and R13, and every LESSONS #3 ledger line about the studies the page lists.
2. Capture `/work` on production at 390 and 1440 (full frames, scrolled) with a background shell
   script, and look at them once.
3. Present to Micah in one message: what the page is today (sections, entries, the claims on each
   entry, calls to action), the design-bar and ledger findings with file:line, three to five
   directions with a recommendation, and the questions only he can answer (what a buyer should do on
   this page, which studies lead, anything new or retired). Then wait.
4. After he rules: `.claude/briefs/pass-120-work-page.md` per `briefs/README.md`, then the section 4
   arc shape.

## 8. Parked (do not start without Micah)

Pass-119 speed (needs his Speed Insights numbers) · stand-in glyphs render mixed case in headless
fonts-blocked captures (production too; Astra called it severe for readability): check in a real
browser · Pass-117 follow-ups: mono text links on home and 404, the spring CTA on the home hero ·
`components/hand/HandUnderline.tsx` unverified in render (unmounted) · Micah's own items: Stripe
`playbook-99` off and the live Audit description, the live $500 purchase and refund test, A4 and S3
wording, Ordani screenshots, MODEL_ROUTING §9a support questions, and `git pull` in the main checkout.

## Micah: open the next chat

In the Claude desktop app's Code tab, choose the `p106-live` worktree as the working directory
(`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`). Pick Opus 5 (the `/work`
arc starts with design and copy rulings). Then paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it exactly.`
