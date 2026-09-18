# Kickoff: micahjonesconsulting, Pass-122 DIRECT (a new design direction, from the operator's research)

Written 2026-09-18 13:40 PDT by the Opus 5 session that ran Pass-121 EXECUTE. `.claude/RESUME.md` is current
state and outranks this file. Supersedes the Pass-121 EXECUTE kickoff (git history keeps it).

## 0. What the operator will paste with this file

The answer from a Claude chat (Fable, research on) to the prompt in
`.planning/research/pass-122-design-ethos-prompt.md`: real reference sites, a recommended design ethos,
three directions, a pick, what to create or shoot, and the AI-built tells to avoid. Possibly its answer to
prompt 2, which puts the current site's design rules on trial. That answer is the input to this pass.
It is research, not a ruling: verify its premises (open a sample of its URLs; check its claims about Micah
against LESSONS #3) before building on it, and let the operator pick.

## 1. Why this pass exists (read this before anything else)

The operator rejected Pass-121's design on sight, 2026-09-18 (LESSONS #3, "DIRECTION C REJECTED ON SIGHT"),
verbatim: "It looks bad. Still very wordy and the boxes with lines looks bad. Fable really signed off on
this? confused on where the insipiration and ideas are coming for such a bland, word heavy, weak design.
Its something that would not draw someone in. I feel like there are so many amazing design websites. Why do
you keep going underwhelming? are there restraints?"

What the previous session told him, and what this pass must not repeat:
- The Pass-121 direction came from a 14-site reference set that leaned editorial and quiet (Tom Critchlow,
  Basecamp Shape Up, The Pudding, Emil Kowalski, Draft.nu). Quiet references produce a quiet design.
- Every gate asked "does this break a rule?" and "is every word true?", and none asked "would this stop a
  buyer scrolling?". Fable designed the direction and passed it with fixes; it saw the drawings read as "a
  sketch tool's output" and judged that cosmetic. The operator judged it the concept.
- The design rules in `.claude/CLAUDE.md` and `docs/DESIGN_BAR.md` (type and photographs only; one signature
  motion; nothing pins, parallaxes or follows the cursor; entrance motion once and 400ms or less; one accent
  colour; mono for labels only) came largely with the "House Lights" setup the site was started on. They
  cap visual punch. They are ON TRIAL this pass, not binding: which ones go is the operator's ruling, by
  popup, ledgered with his words, and then the constitution files are amended with a dated note before any
  build relies on the change. Until he rules, do not design inside them and do not silently break them.
- What is NOT on trial: facts and copy. Every number, client and sentence is ledgered in LESSONS #3; nothing
  is invented; retired figures stay retired (the gates enforce it).

The new gate for this pass: the operator sees a visual early and often. A style tile or a one-screen mock
at 390 and 1440 comes before any full mock set, and the question every reviewer answers first is "does this
draw a stranger in?", before any rule check.

## 2. Where things stand

- Branch `design/live-evolve`, worktree `.claude/worktrees/p106-live`, nothing pushed. Production is
  `c525329` (Pass-120) on both domains. The local `main` ref is stale; compare against `c525329`.
- **Pass-121 Stage A is committed and design-independent** (`294f7c9`, `ed4de52`): the retired ORDANI intake
  figure (40% to 91%) leaves all seven surfaces in the operator's approved words; the home ORDANI paragraph
  carries the money line; the retired-phrases gate carries the figure in every spelling (proven to bite);
  named robots allows; per-route sitemap dates from a committed `content/lastmod.json`; the Ordani
  Organization JSON-LD no longer claims the study page. Checks passed on the production build.
- **The retired claim is LIVE on production right now** (curl, 2026-09-18 13:34: `/work/ordani` shows
  "40% to a measured 91%", `/llms.txt` shows "intake completion went from 40%"). Against `c525329`, the
  branch's only site changes are Stage A and the deletion of the unmounted `EditorialTimestamp` (operator
  2026-09-16). So Stage A can ship alone, ahead of any design. That is the operator's decision (section 5).
- Pass-121's brief `.claude/briefs/pass-121-work-and-studies.md` is FINAL but ON HOLD: its sections 3 and 4
  (the Direction C design) are dead; its section 2 copy and Stage A stand. Stages B to F do not run.
- Kept from Pass-121 and still useful: every LESSONS #3 ruling (ORDANI dek, description, Step 02, What it
  became, did-line, home money line, the rewritten content-engine and birth-worker openings, the /work
  heading and description, the record heading's period); `.planning/exec/visible-text.mjs` (decodes numeric
  entities); `.planning/exec/route-js-bytes.mjs` (JS size, since Next 16 dropped First Load JS; baseline
  /work 665757 bytes, each study 679924); `scripts/lastmod.mjs`; LESSONS #36 and #37 and the four standing
  clauses they added to `.claude/briefs/README.md`.

## 3. Do this, in order

1. Boot (section 4). Rewrite `.claude/RESUME.md` for this pass.
2. Ask the operator the Stage A ship question first (section 5, item 1), by popup. If yes: follow
   `docs/DEPLOY-RUNBOOK.md` and STANDING_TECHNIQUES CARD 1, re-alias BOTH domains (LESSONS #5), quote his
   approval with its date in RESUME before the push, and verify on the live domains with curl that the
   retired figure is gone (expect 0) and the new ORDANI line is present.
3. Read the research he pastes. Verify: open 6 to 8 of its reference URLs (they must exist and show the
   move it claims); check every claim it makes about Micah against LESSONS #3.
4. Put the directions to him by popup, two questions at a time, recommended option first, with the
   reference screenshots or links. Then the rules on trial, rule by rule, by popup. Ledger every answer in
   LESSONS #3 before the next leg (#32); amend `.claude/CLAUDE.md`, `docs/DESIGN_BAR.md` and
   `.claude/brand.json` with dated notes for every rule he drops, and update the hooks that enforce them
   (`design-tokens.sh`, `motion-discipline.sh`, `scripts/gsap-quarantine-gate.mjs` and similar) in the same
   commit, or the harness will block the new design.
5. A style tile or one-screen mock of the picked direction at 390 and 1440, fast, shown to him as a local
   preview (section 6) before any full mock set. Iterate with him until he says it draws him in.
6. Then the Fable gate on the direction, the full mocks, his approval, the brief, the Fable read of the
   brief, the build in stages, per the arc in `.claude/briefs/README.md`.

## 4. Boot, in order

1. `.claude/RESUME.md`.
2. `C:/Users/micah/.claude/CLAUDE.md`, `ULTRACODE_OPERATING_PATTERNS.md`, `MODEL_ROUTING.md` §6 and §9.
3. `docs/LESSONS_LEARNED.md`: #3 rows dated 2026-09-17 and 2026-09-18 (the copy rulings and the rejection),
   and lessons #32 to #37.
4. `C:/Users/micah/.claude/playbooks/website-dev.md`, especially "Premium marketing routes: the design loop is
   mandatory" (taste-lock with real-site side-by-sides before any code; operator visual checkpoint per wave;
   an aesthetic gate before functional checks). Pass-121 skipped the spirit of it.
5. `.planning/research/pass-122-design-ethos-prompt.md` (what the research was asked).

## 5. Parked operator decisions

1. **Ship Stage A now?** It removes a retired claim from production and is independent of the design. Push
   and deploy are his; quote his approval with the date in RESUME first.
2. Which design rules go (section 1). Nothing changes in the constitution without his dated word.
3. Imagery: the research will likely ask for a shoot or new visual material. Only he can commission it.
4. `fable-harness-init` does not handle `AGENTS.md`: since Claude Code 2.1.277 (2026-09-18) a project with
   no `CLAUDE.md` reads `AGENTS.md`, so a `CLAUDE.md` the skill creates would silently stop that file loading.
   Offered adding "start the new CLAUDE.md with `@AGENTS.md` when an AGENTS.md exists"; he has not answered.
   This repo is unaffected (its `CLAUDE.md` already opens with `@AGENTS.md`).
5. Standing: Speed Insights p75 LCP for /work; the colleagues' okay for the clip; Ordani screens.

## 6. How to show him work

- Popups, two questions at a time, recommended first; read his "Other" text literally (he often answers a
  question with a question: answer it, then re-ask). Lead with what happened and what he must decide.
- He rejects on sight, so show visuals early. Send captures at 390 and 1440 with SendUserFile (render).
- Live previews: self-contained HTML with images embedded as data URIs, opened as `file:///` links in his
  browser and in the app's browser pane. The pane serves local pages as a snapshot and blocks `file:///`
  image paths, so an image referenced by path shows as missing there (found 2026-09-18). A private Artifact
  link works on his phone, but only after the page is read in full before publishing.
- Raise a badly reading sentence at once with rewrites (#35). Never absorb a decision that is his.

## 7. Routing (operator 2026-09-18)

"with our usage resetting in 13 hours and glm and chatgpt out for right now - think we need to move forward
with using more claude right now. Of course we need to have tiers - best quality for gates etc and lower
tier models for grunt work etc." So: the main session runs on Opus 5 and rules, briefs and verifies; Sonnet
subagents do grunt work (builds, checks, captures, mechanical edits), named `model: "sonnet"`; Fable is a
named subagent at gates only, one call with a written input file. GLM 5.3's 5-hour window reopened at 14:03
PDT 2026-09-18 and is the cheaper executor for long mechanical runs (`scripts/claude-glm.ps1 -Batch`, prompt
on stdin, LESSONS #36; a big brief can drain a whole window in about 35 minutes, so keep its runs small and
smoke-test first). ChatGPT (Sol, Astra) returns 2026-09-19 12:17. Name the bucket before any fan-out. Do not
arm background launchers that must survive an app restart; one died overnight.

## Micah: open the new chat

In the Claude desktop app's Code tab, choose the `p106-live` worktree, pick **Opus 5**, and paste this line,
then paste the research results under it:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it. The design research results are below.`
