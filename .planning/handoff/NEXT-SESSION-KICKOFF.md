# Kickoff: micahjonesconsulting, Pass-120 BUILD, after 2026-09-16

This session EXECUTES a committed brief. It does not re-rule anything the brief rules. This file
supersedes the 2026-09-15 kickoff. `.claude/RESUME.md` is current state and outranks this file where
they differ.

## 0. Where things stand (2026-09-16)

- Production unchanged: `main` = `c2ffb36`, `dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23` on both domains.
  Revert target: promote `dpl_GTqjwEgFe6NZoLCrTa7mmAfjLeAC`. Never force-push `main`.
- Branch `design/live-evolve` in worktree `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`
  carries the whole DIRECT arc, unpushed past `origin/design/live-evolve`: rulings, ledger, drafts,
  research, mocks, and the brief. Pushing the branch needs Micah's words that day.
- One source fix already on the branch: the home ledger aria-label no longer reads the retired $80M
  figure (`8f6034c`, LESSONS #33).
- THE BRIEF: `.claude/briefs/pass-120-work-page.md` (5,523 lines). Section 1 rules over sections 2
  to 6; read section 1 first and apply its overrides O1 to O15 wherever a later section disagrees.
- Operator ruling 2026-09-16: "Ship everything together". One release; nothing deploys piecemeal.

## 1. Boot, in order (do not explore beyond this)

1. `.claude/RESUME.md`.
2. `C:/Users/micah/.claude/CLAUDE.md`, `C:/Users/micah/.claude/ULTRACODE_OPERATING_PATTERNS.md`.
3. Brief section 1 in full (`sed -n '1,160p' .claude/briefs/pass-120-work-page.md`; it ends at the
   line `# 2. Final copy and the content model`), then only the section you are executing.
4. `docs/LESSONS_LEARNED.md` #3 rows dated 2026-09-15 and 2026-09-16, and #23, #25, #26, #28, #32, #33.
5. `docs/DESIGN_BAR.md` R2, R11, R12 (with its 2026-09-16 exception), R15, R16, R17.

## 2. Routing for the build

- ChatGPT (Astra, Sol) is out of quota until 2026-09-19 12:17. Micah's rule, 2026-09-16: things
  that would go to Astra go to Fable, not overused: one Fable look per judge checkpoint.
- The main session runs every `next build`, `next start` and measuring chain itself as background
  shell commands (detached executors have hung at `next build` on this machine: LESSONS, RESUME).
- Code is written by in-session agents on DISJOINT files, one writer per file, every Agent or
  Workflow leg naming its model (`opus` where the brief leaves judgement inside execution, `sonnet`
  for mechanical placement and measuring). The main session reads every diff before it commits.
- Commit by explicit pathspec after `git diff --cached --name-only` (#23). Never `git add -A`.
- Multi-agent Workflows are approved for this arc (Micah invoked them on 2026-09-16). Shape that
  worked: parallel writers on disjoint files -> an independent verifier that reads the diff and
  re-runs the checks -> the main session spot-reads before committing. Verifiers have been wrong
  twice this arc (a mock judge cut event years Micah allows; an editor skipped overrides while
  reporting none skipped): check every reviewer premise against the ledger before applying it.

## 3. Execution order (the brief's own order, with section 1's overrides)

1. §2.0 the premium-web `mdx-frontmatter.sh` hook edit (approved, A2); record it in RESUME.
2. §2.1 to §2.2 schema and every consumer in ONE commit; §2.3 the five studies (publishedAt = the
   release date, A1: if RESUME has no release date recorded, stop and ask); §2.4 to §2.7 record block,
   entries, method line, CDC figures, llms.txt (§2.7 owns the study lines, O4).
3. §3 and §4 the study template and the settle entrance; `globals.css` edit order per O11; the paper
   ground is bone (O8); brand.json in one step (O11); DESIGN_BAR R2 and R16 exceptions (O7, O10);
   `.claude/CLAUDE.md` prose (O14).
4. §3b /work, the hero clip transcodes with the O6 crossfade and the O5 band still, the redirects.
5. §5 the live claims sweep and the gate (§5.5 is the gate's only writer; self-test expects
   `70 planted caught, 32 near misses passed`, O12).
6. §6 verification: static gates, one build, one server on 3200, the served checks, captures,
   Lighthouse reported against the production /work baseline measured first (A4).
7. STOP at return condition 1 (§1.4): the Fable first-preview look. Then copy on the page, then the
   ship gate, the motion-engineer's written approval, and Micah's words that day before any push.

## 3a. Working with Micah (how the DIRECT session ran; keep it the same)

- Ask him questions with the AskUserQuestion popup, never a wall of text: at most four questions
  per popup, a recommended option first and marked (Recommended), each option's description saying
  what happens if he picks it. He answers in the popup and often types context into Other: read
  that text literally, it frequently changes the question.
- Write every answer that settles a fact, a wording or a claim into LESSONS #3 (design rulings into
  DESIGN_BAR) in the same turn, verbatim and dated, BEFORE any agent or build leg launches (#32).
- Settled and not to be re-raised: no captions on photos or the clip ("not everything needs a
  caption"); the AI clip ships as the /work hero under the R12 exception; Direction B; the settle
  entrance; the method line.
- Plain words. Lead with what happened and what he needs to decide; file:line only where he will
  click it. When something he asked for conflicts with a written rule, say so once with the rule,
  then follow his ruling.
- He wants to see visuals before approving visual work: captures at 390 and 1440, sent with
  SendUserFile (display render), not described.

## 4. Stop conditions (from the brief; never reinterpret, #25)

Any chk line whose output differs from its expected value; any hook refusal; any ffmpeg error or
byte budget over; any contrast pair under threshold on bone; a gate that fails with no edit specified;
anything section 1 does not settle. Stop, report the raw output, and let the judge rule.

## 5. Traps

push to main deploys · pathspec commits (#23) · measure the render (#26) · scope gates from the
layout (#28) · ledger every operator answer before a leg launches (#32) · retired figures in every
spelling (#33) · hooks read the MAIN checkout's `.claude/brand.json`, so a motion-discipline refusal
after the worktree's brand.json is edited is #31, not a real ban: stop and report, never route
around it · release date: O16 · never build while serving · `MSYS_NO_PATHCONV=1` in Git Bash · long inline scripts
or heredocs with nested quotes break the Bash tool: write a script file · `python3` is a stub that hangs.

## Micah: open the build session

In the Claude desktop app's Code tab, choose the `p106-live` worktree as the working directory. Pick
Opus 5. Paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it exactly.`
