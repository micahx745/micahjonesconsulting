# Kickoff: micahjonesconsulting, Pass-121 EXECUTE (build the mock set, judge it, write the brief)

Written 2026-09-17 by the Opus 5 session that ran Pass-121 DIRECT. `.claude/RESUME.md` is current state and
outranks this file. This supersedes the Pass-121 DIRECT kickoff (git history keeps it).

## 0. Routing, and why this chat exists (operator 2026-09-17)

Verbatim, ending the last session: "we need to start a new chat that respects the AI routing to conserve
claude usage and the harness skills plugins hooks etc that come with this. And continue the work."

- **GLM 5.3 (z.ai) executes.** `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/claude-glm.ps1
  -Batch -Dir "C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live" -PromptFile <brief>`.
  Smoke first if unsure: `-Smoke` prints OK. It hit its 5 hour cap 2026-09-17 ~10:45 PDT; the cap resets
  **13:46 PDT**. LESSONS #36: the prompt now goes in on stdin as UTF-8; do not pass it as an argument.
- **In-session Sonnet legs bill THIS account.** They are the fallback only when GLM is capped AND the operator
  says to spend it (he did once, for proof round 4). Name the bucket before any fan-out (MODEL_ROUTING §9b).
- **Fable** is a named subagent at two gates only: G3 (judge the mocks) and G4 (read the brief before it
  commits). One call each, with a written input file, ~8-12 tool calls. Never the main loop.
- **Opus 5** (this session) runs the loop: operator popups, the ledger, the brief, and one look at every
  capture before it goes to Fable or to him. It does not run builds or capture loops.
- ChatGPT (Sol, Astra) is out of quota until 2026-09-19 12:17.

## 1. Where Pass-121 stands

Branch `design/live-evolve`, worktree `.claude/worktrees/p106-live`, 19 commits ahead of origin, nothing
pushed, production untouched (`main` = c525329, Pass-120 live on both domains).

Done and committed (newest first): bd622c9 proof round 4 mocks; 3102bd1 the mock-set brief; 2d7f727 ORDANI
facts part 5; 11f96ca description punctuation + Fable's proof verdict; 13c62ce proof round 3; 32cacae LESSONS
#36 and the GLM stdin fix; 951cd69 Fable G2 directions and the operator's pick; earlier: the trend research,
the claims check, Fable G1, the 14-reference set, audits (a) and (b).

**The design is settled:** Direction C, "Five exhibits" (`.planning/reviews/FABLE-121-G2.md` section 7): every
engagement gets a hand-drawn diagram of how the work worked, beside its number on /work and in the study's
opening band; the featured Guardicore doorway morphs its photograph into the study on click; one hover
grammar; two once-only in-view reveals per page; nothing loops, pins or follows the cursor.

**The proof passed** (`.planning/mock/pass-121/proof/`, round 4, every measurement PASS at 390 and 1440). The
operator saw the captures and approved building the full mock set.

## 2. Do this next, in order

1. **Build the mock set.** The brief is written: `.planning/exec/glm-121-mocks.md` (four HTML files, five
   drawings, exact copy, measurements M1-M15, captures). Run it on GLM once the cap has reset. If the operator
   wants it sooner, ask him first: the only faster route is a Sonnet leg billed to this account.
2. **Look at every capture yourself** (Opus) against Fable's checks in `.planning/reviews/FABLE-121-PROOF.md`
   section 5 and G2 section 10. Executor self-reports about visuals are claims, not evidence (LESSONS #36).
3. **G3: Fable judges the mocks.** Write `.planning/reviews/FABLE-121-G3-INPUT.md` first (state what to look
   at, what is settled, what it must rule on). One call.
4. **Operator approval** by popup, with the captures sent (SendUserFile, render). He wants 390 and 1440.
5. **Write the brief** `.claude/briefs/pass-121-work-and-studies.md` per `.claude/briefs/README.md`: the
   ruling, exact copy strings, layout spec in existing tokens and classes, motion with timings and its
   reduced-motion and no-JS renders, verification commands with expected output, the rejected list, return
   conditions, parked operator decisions. Fold in the plumbing from `.planning/research/pass-121/
   audit-b-discoverability.md` (retire the intake figure everywhere including `app/llms.txt/route.ts`, named
   robots allows, per-file sitemap dates from git, the ORDANI `mainEntityOfPage` scoped to its own page,
   answer-shaped ledes). Note the doc drift: the live copper token is `#bd5a2d`; `.claude/CLAUDE.md` prose says
   `#C8542B`, and the token wins.
6. **G4: Fable reads the brief**, then commit it. The build runs later from the brief, on GLM.

## 3. Copy that is already settled (LESSONS #3, do not re-open)

- /work heading: `THE WORK, ON THE RECORD.`
- /work description: `Four client engagements and the company I founded. $14M in revenue for a security
  company, $3M in contracts from an RFP engine, a content engine that peaked at 800,000 impressions in a
  month, a birth worker's practice rebuilt, and ORDANI. Each page says what I found, what I built, and what
  changed.`
- ORDANI money line: `Birth workers keep hundreds of dollars per client that a claims service would take.`
  Loula is named once, in the study body only, never with a fee number; never "per claim"; never the
  clearinghouse or an internal tool. Claims come with the subscription. Medicaid and private insurance.
  The intake story (40% to 91%) is cut from every surface; claims takes Step 02. ORDANI stays in beta with a
  public release coming. Step 02 facts confirmed 2026-09-17, including that birth workers either pay a service
  a fee per visit or file themselves, which costs no fee but takes time and knowledge.
- The method line keeps its ledgered wording and moves below the index; it never opens /work.
- Featured study: Guardicore, in every direction.

## 4. Boot, in order

1. `.claude/RESUME.md`.
2. `C:/Users/micah/.claude/CLAUDE.md`, `ULTRACODE_OPERATING_PATTERNS.md`, `MODEL_ROUTING.md` §6, §9d, §9e.
3. `docs/LESSONS_LEARNED.md`: #3 rows dated 2026-09-16 and 2026-09-17 (ORDANI claims parts 1-5, the /work
   header, the direction and heading picks), and lessons #32-#36.
4. `docs/DESIGN_BAR.md` R12's 2026-09-17 ruling (hand-drawn diagrams relax "used sparingly"), and
   `.claude/brand.json` `motion`.
5. `.planning/reviews/FABLE-121-G2.md` (the direction), `FABLE-121-PROOF.md` (the quality bar), and the proof
   captures in `.planning/mock/pass-121/proof/`.

## 5. Working with Micah

Popups, two questions at a time, recommended option first, read his Other text literally (he dismissed a
four-question popup and answered every two-question one). Ledger every answer in LESSONS #3 before the next leg
launches (#32). Raise a badly reading sentence at once with rewrites, never park it (#35). Send him captures at
390 and 1440 before asking for approval on anything visual. Lead with what happened and what he must decide.

## Micah: open the new chat

In the Claude desktop app's Code tab, choose the `p106-live` worktree, pick **Opus 5**, and paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it.`
