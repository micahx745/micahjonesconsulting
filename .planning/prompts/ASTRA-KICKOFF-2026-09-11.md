# Astra task: the kickoff prompt for the next Claude chat, 2026-09-11

You are the quality tier. Read-only. Your final message IS the finished prompt: markdown,
nothing before or after it. It will be saved as `.planning/handoff/NEXT-SESSION-KICKOFF.md` and
pasted by the operator as the FIRST message of a new Claude Code chat.

## The situation

- The operator (Micah Jones) is moving this project to a new chat on his OTHER Claude account,
  because Claude usage is the scarce resource. His words, 2026-09-11, verbatim: "Biggest thing
  is making sure we dont burn thru usage on this account while still leveraging fable and opus
  in critical areas. the other Ais especially glm 5.3 will be very helpful in this." And: "the
  rest of decisions for me should be represented to me after the new chat on the other account
  has established itself and is ready to work."
- The existing kickoff (`.planning/handoff/NEXT-SESSION-KICKOFF.md`, 2026-09-08) and
  `.planning/handoff/EXECUTOR-TIER-CARD.md` are STALE. They name Pass-104b, the rejected branch
  design/room-and-ledger and the worktree p101-integrate. Read them for shape and for traps that
  still hold, then replace them. Nothing from them survives unless it is still true.

## What is true now (verify against the repo before relying on any of it)

- Repo: `C:/Users/micah/Code/micahjonesconsulting`. Work happens ONLY in the worktree
  `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch
  `design/live-evolve`, pushed at 7d2c9b4 (a Vercel preview branch). `main` is untouched, and
  every push to main auto-deploys production. A branch lives in one worktree.
- Current state lives in `.claude/RESUME.md` in that worktree. Read it. Pass-110 and Pass-111a
  are committed and pushed. Pass-111b, the /services rebuild, waits on decisions 1 to 3.
- The decision queue the new chat must present: `.planning/handoff/DECISIONS-2026-09-11.md`
  (drafted in parallel with you; reference it by path).
- Routing policy: `C:/Users/micah/.claude/MODEL_ROUTING.md` §6, §8, §9, §9a, §9b, §9c, and a
  new §9d that records the ruling quoted above. Executors: GLM 5.3 via
  `scripts/claude-glm.ps1` (z.ai quota; smoke-test first; five-hour windows; give it a short
  pointer prompt with no quotes and no leading dashes, because PowerShell 5.1 mangles argv).
  Sol `gpt-5.6-sol` and Astra `gpt-6-astra` via `scripts/codex-exec.ps1` (ChatGPT quota; Astra
  is quality gates only, about one look per pass; Sol drafts, researches, and executes when GLM
  is down). Codex cannot commit inside a git worktree and cannot run a browser or a server.
  Executors never rule, push or deploy.
- Recent hard-won rules in `docs/LESSONS_LEARNED.md`: #19 colour on the cross-faded home, #20
  the layout gate, #21 every new gate ships a `--self-test`, #22 never edit a running script.
  `.planning/exec/gates111a.sh` is the template battery; `scripts/axe-worlds.mjs` and
  `scripts/layout-gate.mjs` need a running `next start` server and Chrome.
- The account switch has consequences to design for. Claude Code keeps credentials, settings,
  MCP servers, plugins, skills, memory and history PER CONFIG DIRECTORY. If the new chat runs
  under a different config directory it will NOT auto-load the operator's global contract
  `C:/Users/micah/.claude/CLAUDE.md`, the routing file, the playbooks under
  `C:/Users/micah/.claude/playbooks/`, or this project's memory index
  `C:/Users/micah/.claude/projects/C--Users-micah-Code-micahjonesconsulting/memory/MEMORY.md`.
  The boot must read what it needs by absolute path. A workspace must also be trusted once,
  interactively, per config directory, or a non-interactive executor ignores the project's
  permission allow-list. The repo's own CLAUDE.md files load either way.
- Which models the other account can use is not known here (it was a $20 plan on 2026-09-08).
  The chat must read its own statusline and say what it is running on.

## What the prompt must make the new chat do, in order

1. Boot, cheaply: the reads above, by absolute path, and nothing more. No exploration.
2. Prove the tools exist: list the three launchers by absolute path; run GLM `-Smoke`; run
   `git status` and `git log -3` in the worktree (expect design/live-evolve at 7d2c9b4 or later,
   and only the untracked `.planning/exec/sol111a.log`).
3. Report readiness in at most 10 lines: model and effort it runs on, which executors answered,
   anything missing (MCP servers, skills, memory), and its recommended model setup.
4. Then present the decision queue from `DECISIONS-2026-09-11.md` in one message, blocking ones
   first, each with its recommendation, and wait. No page work before he rules.

## The budget rules it must carry (concrete, not aspirational)

Work out the cheapest routing that still puts Fable or Opus on the calls that matter. At least:
which tier runs the main loop day to day and when to switch up; a per-arc cap on top-tier tool
calls (§6 says 15); no build, screenshot or axe loops on a top tier while GLM is up; no Workflow
or Agent fan-out that inherits a top tier, with the model named on every call; the §9b "name the
bucket" check before any fan-out; Astra about once per pass; Sol executes when GLM is capped;
and what counts as a critical area for Fable or Opus in this project (design direction and copy
rulings, briefs, the final judge look, anything touching money, public claims or production).

## Also carry

What is the operator's and not the chat's: every push, deploy and merge to main, any spend, and
the Anthropic support questions in §9a. The standing traps in RESUME, plus: PowerShell 5.1 splits
a native argument at embedded double quotes, so commit messages go through a Git Bash heredoc or
`git commit -F`; `pnpm build` fails on this machine only, so use `npx next build --webpack`; set
`MSYS_NO_PATHCONV=1` for "/" arguments in Git Bash; never read an exit code through a pipe;
`python -P`; RESUME.md is capped at 2.5KB in bytes and is rewritten after every task.

## Form

- Paste-ready and imperative. Absolute paths for every file and executable.
- Under 120 lines. Where a rule already sits in a file the chat must read, point to it instead
  of restating it, except the few that have broken a run before.
- No em-dashes. Short sentences.
- End with a short section addressed to the operator, not the chat: how to open it (desktop app
  Code tab, logged into the other account, working directory the worktree) and which model to
  pick first.
