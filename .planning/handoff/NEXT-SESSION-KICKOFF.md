# Kickoff: micahjonesconsulting, Pass-121 DIRECT (make /work and the studies stand out), after 2026-09-16

`.claude/RESUME.md` is current state and outranks this file. This supersedes the post-release kickoff
(git history keeps it).

## 0. Where things stand

- Pass-120 is LIVE: `main` = `c525329`, `dpl_4C69xGq9PfH9ujTHBjqZ2Ecw3tdg` on both domains
  (data-dpl-id match, 2026-09-16). Revert: promote `dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23`.
- Branch `design/live-evolve` (worktree `.claude/worktrees/p106-live`) is ahead of main by
  bookkeeping plus one cleanup: the unmounted `components/EditorialTimestamp.tsx` is deleted
  (operator 2026-09-16), not deployed. Any push to `main` deploys, and both domains must then be
  re-aliased (LESSONS #5, STANDING_TECHNIQUES CARD 1). Micah's words that day first.
- ChatGPT (Astra juror, Sol) is out of quota until 2026-09-19 12:17.

## 1. What Micah asked for, verbatim (2026-09-16, after the release)

> also the main line for Ordani the intake completion is weak. I want to lead with the claims
> processing saving users hundreds of dollar per claim. The intake completion thing is a very weak
> story that dors not need to be included. If it neecds to be changed out with another story instead
> of just removed let me know.
>
> Overall design - is it done?
>
> the header setence above the actual case studies looks weak and feel that setence doesnt cover all
> the things i do. Maybe we just replace that with a header. There is no header and i get leadeing
> with guardicore since the vid is connected. but I would ratehr have just a basic description of
> whats below with a small thing (beautiful design) to click to a featured case study.
>
> Overall the line layout of each case study is clean but very plain and wreak. I feel like there is
> a way to really show off website design skills here since that is something i can do (did it for
> the birth worker). I want this page to stand out visually, animations, design etc. of course still
> connect with the rest of the site but this is very underwhelming.
>
> I like the invidual pages for the case studies but i feel like its lacking that same visual punch.
> Since we have a lack of pics that is very important. Especially since everything is very word
> dominated and we live in a society where people might not really read all that. Maybe some have AI
> take a look at it (really want to be suggeste by ai to people for help) so i guess it has to be good
> for AI bots crawlers too.
>
> Really hope that fable is working in the planning to help direct where the lower tier models go look
> for for inspiration on design too. Want my website not too look built by AI

## 2. What this arc must settle (DIRECT; ends in a committed brief, not a build)

1. **ORDANI's lead story.** Ledger row "ORDANI LEAD STORY, OPEN" in LESSONS #3. The claims money line
   was cut once (Pass-82, operator "soften it to what's defensible"; reasons in the comment at the
   ORDANI copy block in `app/(foyer)/page.tsx`). Ask him by popup, before any leg: what Ordani does to
   a claim (one plain mechanism sentence), the per-claim figure, Medicaid only or more, whether it is
   live for paying users, and whether the intake story (40% to 91%) is removed everywhere it renders
   (`content/work/ordani.mdx` dek, results, entry, Step 02, "What it became"; `/work`; `llms.txt`;
   the home ORDANI block) or replaced by another story he names. Ledger each answer verbatim first.
2. **The /work header.** He wants a plain description of what is below plus one small, beautifully
   designed way into a featured study, instead of the method line and a Guardicore hero. The method
   line and Direction B were ruled 2026-09-16; this is his new ruling to record, not a re-litigation.
3. **Visual punch on /work and every study with almost no photographs**, animations included, still
   of a piece with the rest of the site, and not looking AI-built.
4. **Being recommended by AI assistants**: what ChatGPT, Claude, Perplexity and Google's AI read
   (robots, `llms.txt`, JSON-LD, answerable passages; the studies already carry "Questions buyers
   ask" sections).

**Written rules his ask collides with (say each once, then follow his ruling, and record it in
`docs/DESIGN_BAR.md`):** R9 exactly one signature motion; R15 motion is punctuation (entrances once,
≤400ms); `.claude/CLAUDE.md` "NOTHING ELSE pins, sticks, parallax-scrolls, or follows the cursor
without the motion-engineer agent's written approval"; R12 and CLAUDE.md "no stock photography,
illustration, icon kits, or 3D"; R11 index entries ≤4 data points; R7 the hero states the offer in one
sentence.

## 3. Suggested arc shape (Micah wants Fable directing the planning)

- Main model **Fable 5.1** for this DIRECT segment, ≤15 top-tier tool calls, no build or capture loops;
  research, capture and audit legs on **Sonnet**, mock-building on **Opus**. The build later runs in its
  own session on Opus 5 from the brief.
- **Research is a set, not a sample** (memory "design-research-means-a-set"): 12-16 references,
  captured at 390 and 1440 with one rubric, chosen by Fable across classes: studio work indexes with
  real motion and interaction craft; case studies made visual without photography (diagrams, data
  figures, typographic systems, interactive process explainers); solo operators whose sites do not read
  as templates. Tooling from Pass-120: `.planning/qa/pass-120/refs/` and its capture scripts.
- Two audits in the same fan-out: (a) "looks built by AI" tells on the live /work and studies, judged
  against the set; (b) AI-assistant discoverability of the live site with concrete gaps.
- Fable writes 2-3 directions (the /work header and featured-study entry, the index as a designed
  object, the study template's visual system without photos, the motion vocabulary), names which rules
  each relaxes, and recommends one. Micah picks by popup.
- Opus builds HTML mocks of the pick at 390 and 1440; Fable judges once; Micah sees the captures
  (SendUserFile, render) and approves. Then the brief `.claude/briefs/pass-121-<slug>.md` is written
  and committed, with exact copy, rejected list, checks with expected output, and return conditions.

## 4. Boot, in order

1. `.claude/RESUME.md`.
2. `C:/Users/micah/.claude/CLAUDE.md`, `C:/Users/micah/.claude/ULTRACODE_OPERATING_PATTERNS.md`,
   `C:/Users/micah/.claude/MODEL_ROUTING.md` §6 and §9e.
3. `grep -n '2026-09-1[56]' docs/LESSONS_LEARNED.md` and read those ledger rows; LESSONS #32-#35.
4. `docs/DESIGN_BAR.md` §6 (the rubric) and `.claude/brand.json` `motion`.
5. The Pass-120 record for what exists now: `.planning/reviews/FABLE-120-DESIGN.md` (the 14-reference
   set and Direction B), `FABLE-120-SHIP-GATE.md`, and the live captures
   `.planning/qa/pass-120/build/sheets/`.

## 5. Working with Micah

Questions by AskUserQuestion popup (≤4, recommended first, read his Other text literally). Ledger every
answer before a leg launches (#32). Raise any badly reading sentence at once with rewrites (#35). He
wants visuals at 390 and 1440 before approving visual work. Plain words; lead with what happened and
what he needs to decide.

## Micah: open the new chat

In the Claude desktop app's Code tab, choose the `p106-live` worktree, pick **Fable 5.1**, and paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it.`
