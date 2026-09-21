# Kickoff: micahjonesconsulting, Pass-126 ship check (How I work), then the queue

Written 2026-09-21 by the Opus 5 session that built Pass-125 (held) and Pass-126. `.claude/RESUME.md` is current
state and outranks this file. Supersedes the Pass-125 kickoff (git history keeps it).

## 0. Before anything
1. Open the chat in the `p106-live` worktree. The SessionStart routing hook did NOT load last session because the chat
   opened at the main checkout. If no "AI ROUTING" block printed, say so.
2. Read `.claude/AI_ROUTING.md` in full (tiers, ids, commands, rules). Boot probes in one line: `get_usage`,
   `scripts/deepseek-exec.ps1 -Smoke`, `scripts/gemini-exec.ps1 -Smoke`.
3. Confirm the plan with him BEFORE a page arc starts (LESSONS #3 "FULL-TIME PAGE HELD": last session ran a whole page
   arc on a kickoff line that was no longer his priority). One popup: "next is the How I work ship check; right?"

## 1. Where things stand
- LIVE: `main = e8b44e3`, `dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH` on all three domains (read off the wire 2026-09-21).
- `design/live-evolve` = `b257b66`, 50 commits ahead of `origin/main`, NOT pushed. Its only site change vs main is
  Pass-126 (How I work redesign) plus regenerated sitemap dates. The full-time page is NOT on it (reverted, `95cb41b`).
- Pass-126 How I work: APPROVED IN DESIGN for the ship check (LESSONS #3 "HOW I WORK REDESIGN TO THE SHIP CHECK").
  Plan body re-ruled (Sol's line), Build kept. Built, gated and measured on `preview/p126-how-i-work` (`3d5bb88`,
  merged). Jury: Astra and DeepSeek "show him as is"; Fable's last fix applied and measured. Records:
  `.planning/reviews/PASS-126-*`, `FABLE-126-*`, `ASTRA-126-*`, `DSPRO-126-*`.
- HELD: `/full-time` (approved in content 09-21, not pushed). Whole on `preview/p125-full-time` (`708ac61`, incl.
  `card1-125.sh`). To ship later: `git revert 95cb41b` on the branch (re-merging will NOT restore it), then a ship check.

## 2. The next job: the Pass-126 ship check, then his push words
1. Build with every gate: `node .planning/exec/prepush-gates.mjs` (Node; the bash wrapper also works for you, but Sol's
   sandbox cannot start bash). Build in `.claude/worktrees/p124-cuts` after fast-forwarding its branch to
   `design/live-evolve`, or give it to Sol. Last line must be `PREPUSH: all gates and the build passed`.
2. Write `.planning/exec/card1-126.sh` from `card1-124.sh` (NOT 125: the full-time page is held): OLD_DPL read off the
   wire; add markers for the How I work copy (`content/how-i-work.ts`), incl. the new Plan body present and
   "Something named ships" absent on `/`; on `/services` "How I work." present, "Every engagement includes" absent,
   and the note "No discovery fee." present. Bite-test: 0 failures on a local `next start`, the new markers fail on
   production. (The measure scripts: `.planning/qa/pass-126/measure.mjs`, `cls-page.mjs`, `region-sheet.mjs`.)
3. Popup for the push; record his answer verbatim in LESSONS #3 AND RESUME BEFORE the push command.
4. Push `design/live-evolve` to `main` (Vercel deploys on push); read the new deploy id off the wire on both domains;
   `EXPECT_DPL=<id> bash .planning/exec/card1-126.sh`. Revert = promote `dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH`.

## 3. The queue after that (his to order)
Inner pages (/services, /about, /packages, /contact; include Fable's catch: /about calls Ordani "practice management",
the study and full-time page say "CRM"); the blog (answered-ratio cut from `C:/Users/micah/Code/reddit-research/` first;
never the rates); open facts (ORDANI "one engineer", east-west plain swap, "it shipped, nobody came", landing page 27 vs
34); /work/guardicore mobile LCP p75; the K4/K5 harness race; ask him to confirm the 09-20 DeepSeek key was rotated;
the held full-time page when he wants it.

## 4. Traps learned 2026-09-21 (all recorded)
- The bare `npx next build --webpack` skips every gate (LESSONS #47); the Codex sandbox cannot launch bash (so gates are
  Node now).
- Never commit in a worktree while an executor runs in it; a brief never pins a HEAD its own commit moves (briefs README).
- Full-page screenshots of a Color Worlds page freeze every section in the first world: judge from viewport scroll
  frames (`region-sheet.mjs`). Measures need a liveness gate: Sol's round measured an unstyled page and reported 14
  false failures (`measure.mjs` now waits for styles and a grid, bite-tested).
- Git Bash rewrites `/` and `branch:path` arguments into Windows paths: prefix `MSYS_NO_PATHCONV=1`.
- Stop the preview server before any rebuild in p124-cuts (Windows file locks). `preview_start` reads the MAIN
  checkout's `.claude/launch.json`; it has a local, uncommitted `prod-p124` entry (port 3126).
- Copy the jurors flag goes to him at once with rewrites from DeepSeek and Sol, fact-checked first (DeepSeek's three Plan
  drafts all failed: they put the roadmap before ANY work, but week one's audit is work).

## 5. How to work with him (unchanged)
Popups, two questions at a time, recommended first, read "Other" literally. Show the rendered page (viewport sheets at
390 and 1440 plus the served preview). When models disagree, give each pick by name with the tie-break. LEGS stamp on
every checkpoint and copy/design commit.

## Micah: open the new chat
In the Claude desktop app's Code tab, choose the `p106-live` worktree, pick **Opus 5**, and paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it.`
