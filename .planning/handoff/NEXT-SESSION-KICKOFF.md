# Kickoff: micahjonesconsulting, Pass-123 (the study pages and the small fixes, on the week's routing tiers)

Written 2026-09-19 08:10 PDT by the Opus 5 session that shipped Pass-122. `.claude/RESUME.md` is current
state and outranks this file. Supersedes the Pass-122 DIRECT kickoff (git history keeps it).

## 0. The routing tiers for this week (operator 2026-09-19, read this first)

Operator, verbatim: "I want to really implement the AI routing tier to conserve usage this week. Right now
chatgpt weekly usage is reset in 4 hours, and glm is at 74% for the week. So we can use glm and claude for
now - using the best models to ensure quality in design and writing and the cheaper models to do the grunt
work." Recorded in `.claude/CLAUDE.md` (amendment 2026-09-19). In practice:

| Work | Who | How |
|---|---|---|
| Rulings, briefs, verifying, commits, talking to Micah | Main session, Opus 5 | this chat; no build, capture or screenshot loops |
| First design of a surface, copy drafts and rulings, brief reads, judge and buyer reads | Fable | `model: "fable"` subagent, ONE call per gate, input written to a file first |
| Independent juror at design and copy checkpoints | Astra (ChatGPT) | `scripts/codex-exec.ps1 -Review -Prompt <file> -Out <file> -Image a.png,b.png`; back 2026-09-19 12:17 PDT; gates only |
| Builds, fix rounds, captures, measuring scripts, mechanical edits | GLM 5.3 | `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/claude-glm.ps1 -Batch -PromptFile <file>` (prompt on stdin, LESSONS #36); `-Smoke` first each session; small runs (a big brief can drain a 5-hour window in ~35 min); GLM weekly was 74% on 09-19 |
| Grunt overflow, research and lookups | Sonnet | `model: "sonnet"` subagent when GLM is capped or a leg needs in-session tools |

Pacing: call `mcp__ccd_session_mgmt__get_usage` at boot and before every fan-out, and name the bucket in one
line before launching (memory: `check-usage-before-tiering`). On 09-19 08:06 PDT the Claude week had just
reset: all models 0%, Fable 0%, next reset 2026-09-26 01:00 PDT. Claude weekly all-models is the bucket that
stops everything; every Fable call draws on it. A GLM or Sonnet report is a claim: the main session opens
every capture and re-runs every number that decides a ship (LESSONS #36, #37).

## 1. Where things stand

- **Production = Pass-122, `361f29d`, on all three domains** (www, apex, .vercel.app), dpl
  `dpl_7ov1sFMSwNhEpyPzhCqyohPgxkUD`, curl-verified 2026-09-19 07:00. Revert: promote
  `dpl_3hnWsf2kgZn5bhEdQrTqLcaG9dwe` (Stage A, `92095b7`). Push to main deploys (git integration).
- Worktree `.claude/worktrees/p106-live`, branch `design/live-evolve` = origin/main plus RESUME/ledger
  commits (not pushed; they carry no site change). The main checkout's local `main` ref is stale (79534b8);
  its `.claude/launch.json` carries an uncommitted `prod-p106` preview config (port 3101, serves this
  worktree's `.next`): keep it, it is how Micah scrolls a build in the app's browser pane.
- **What Pass-122 shipped** (LESSONS #3 rows headed "PASS-122 ..."): the redesign research FEEDS the existing
  theme, never replaces it ("i didnt want to change the entire site", #39). Home receipts: $20M+ at poster
  size with the Tel Aviv clip inside the numerals once, then copper; the exits scoreboard; "The receipts."
  screen-reader only. /work: approved heading + two-sentence description, small featured Guardicore entry
  (photo + arrow), every figure a copper poster that assembles once, three cuts. Micah verified the clip on
  his iPhone.
- New gates you must follow: LESSONS #38 (a field split re-checks every consumer; `work-entry-gate` in
  build), #39 (scope before any direction popup; briefs README clause), #40 (scroll reveals captured before
  and after trigger; a waiting state is never empty), #19 recurrence (accent colour on a WorldSwitcher page
  measured while scrolling: `node .planning/exec/crossfade-contrast.mjs`, down and up, normal and reduced
  motion, 390 and 1440, 0 steps under the floor, before CARD 1).

## 2. Boot, in order

1. `.claude/RESUME.md`. 2. `get_usage` (name the numbers to Micah in one line). 3. `docs/LESSONS_LEARNED.md`
#3 rows headed "PASS-122" and lessons #38 to #40 plus the #19 recurrence. 4. `.claude/briefs/README.md`
standing clauses. 5. `C:/Users/micah/.claude/playbooks/website-dev.md` ("Premium marketing routes: the design
loop is mandatory"). 6. The Pass-122 briefs as the pattern to copy: `.planning/mocks/pass-122/RECEIPTS-BRIEF.md`
and `WORK-BRIEF.md` (scope line first, themes quoted, bans, verification with numbers).

## 3. The queue, in order, with the tier for each

1. **GLM smoke + three small fixes (grunt, GLM):** `-Smoke` first. Then one small batch prompt, verified by
   the main session: (a) F5 from `.planning/reviews/CROSS-REVIEW-PASS-122-DIFF-claude.md`: `.cw-rec` and
   `.cw-exits.is-live` size from `100vw`, so with classic scrollbars (Windows) the `+` of $20M+ runs up to
   ~9px into the gutter below ~1300px; switch to `container-type: inline-size` + `cqi` like /work does;
   (b) `components/view-transition-link.tsx` accepts anchor attributes, so the featured link's
   `aria-label` in `app/(foyer)/work/page.tsx` drops its `as any` spread; (c) dead CSS `.cw-secttitle--sub`
   and the stale 112px-pause comment on the home. Do NOT delete `components/hand/HandCircle.tsx` (no importer
   now) without asking Micah. Verify: build, captures of $20M+ at 1300/1440 with a classic scrollbar, CLS 0,
   contrast unchanged. Ship only with his push approval.
2. **Ledger provenance (main session, then Micah if needed):** "Close rate from one in eight to one in four
   inside six months" and "$3M in signed contracts across eleven awards" are live on the RFP study since
   Pass-120 (`6c564b4`) with no LESSONS #3 row. Look for them in the Pass-120 brief's draft-detail
   confirmations (LESSONS #3 "PASS-120 DRAFT DETAILS CONFIRMED", 2026-09-16: RFP ?1 to ?7, ?9 and ?11
   confirmed; ?8 and ?10 are not in that list); if found, add a
   provenance row; if not, put both to him by popup before any surface restates them.
3. **The five study pages, `/work/[slug]`, in the same grammar (the pass's main work):**
   - SCOPE FIRST (#39), by popup, before any design: which parts of the study page take which themes (the
     dark band's result as a poster that assembles; the results block as posters; fewer words as proposed
     cuts; the Guardicore photo), and that it FEEDS the existing theme. Note the DESIGN_BAR R2 exception of
     2026-09-16: study pages cap their largest type at 56px/36px because a 112px result wrapped on the
     anonymous studies; poster figures reopen that, so it is part of the scope question.
   - Design + brief: Fable (one call; input file with the scope ruling, the Pass-122 frames, the study page
     code, the ledger rows it may use). Main session reads the brief against the ledger (no invented copy).
   - Build: GLM from the brief, in small stages (one study template change, then captures), Sonnet as
     overflow. Captures before/after at 390 and 1440 for all five studies.
   - Gates: Astra juror (images) + Fable judge read; crossfade-contrast.mjs and before/after-trigger frames;
     Micah sees before/after and the live build in the pane (launch `prod-p106`) before anything ships.
   - Ship: his dated push approval quoted in RESUME, CARD 1, curl via `visible-text.mjs` + a whitespace-
     normalising counter (never `grep -i -F`, #34).
4. **Parked, Micah's calls:** which other real photos of him to animate like the Tel Aviv clip; topping up
   the pay-as-you-go GLM key for the cross-review REST leg (HTTP 429 "Insufficient balance" on 09-18);
   `fable-harness-init` + `@AGENTS.md` (CC 2.1.277); Speed Insights p75 LCP for /work; the colleagues' okay
   for the clip; Ordani screens.

## 4. How to show him work

Popups, two questions at a time, recommended option first; read his "Other" text literally and answer a
question-answer before re-asking. Lead with what happened and what he must decide. Visuals early:
before/after sheets at 390 and 1440 via SendUserFile (render), and the real build in the app's browser pane
(`preview_start` name `prod-p106`; stop that server before any rebuild, one `.next` at a time). He rejects on
sight; a tasteful-but-quiet result fails. Raise a badly reading sentence at once with rewrites (#35).

## Micah: open the new chat

In the Claude desktop app's Code tab, choose the `p106-live` worktree, pick **Opus 5**, and paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it.`
