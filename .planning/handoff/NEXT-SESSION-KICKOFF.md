# Kickoff: micahjonesconsulting, Pass-124 — the voice, the copy, and the blog

Written 2026-09-20 ~13:00 PDT by the Opus 5 session that shipped Pass-123 and wrote the Pass-124
research prompt. `.claude/RESUME.md` is current state and outranks this file. Supersedes the
Pass-123 kickoff (git history keeps it).

**Micah is arriving with the answer from a Fable research chat.** He will paste new wording, a voice
recommendation, an audience ruling, and an SEO/blog plan. Everything below exists so you can receive
that without breaking anything.

---

## 0. The one thing that will bite you

**Nothing he pastes goes into the repo unverified.** The research chat was given a hard fact lock,
but it is still a model writing marketing copy, and this repo has a ledger precisely because earlier
copy carried numbers that were wrong. Before a single file changes:

1. Read `docs/LESSONS_LEARNED.md` item 3 in full. It is long. Read it anyway.
2. For every number, client, quote and claim in the new copy, find the row that authorises it, in
   that exact wording. No row means it does not ship — ask him, do not infer.
3. `pnpm build` runs `scripts/retired-phrases-gate.mjs` with ~80 dated retirements. **Treat a gate
   hit as the writer having reached for a nicer-sounding statistic**, which is the failure mode the
   lock exists to stop. Never route around it.
4. The banned-word list lives in `.claude/brand.json` `voice.banned` (37 entries) and `lib/banned.ts`.
   The `copy-lint.sh` hook rejects a write containing one — including a file that merely *lists*
   them, which is how this kickoff and the prompt both came to point at brand.json instead.

## 1. The routing tiers, with DeepSeek now standing (operator 2026-09-20)

| Work | Who | How |
|---|---|---|
| Rulings, briefs, verifying, commits, talking to Micah | Main session, Opus 5 | this chat; no build/capture/screenshot loops |
| Taste: design of a surface, copy rulings, the judge and buyer reads | Fable | `model: "fable"` subagent, ONE call per gate, input written to a file first |
| Independent juror at a design or copy checkpoint | Astra (ChatGPT) | `scripts/codex-exec.ps1 -Review -Prompt <file> -Out <file> -Image a.png,b.png` |
| Builds, fix rounds, captures, measuring, anything needing Chrome | Sonnet subagents | `model: "sonnet"`; the main session opens every capture itself |
| File+build grunt without Chrome | Sol (ChatGPT) | `scripts/codex-exec.ps1 -Task <promptfile>` |
| **Reading, drafting, summarising, classifying, second opinions** | **DeepSeek** | `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/deepseek-exec.ps1 -PromptFile <f> -Out <f>` |
| A 4th independent lineage in cross-review | DeepSeek | `run_cross_review.py --legs deepseek` (on by default) |
| Overflow only | GLM 5.3 | `scripts/claude-glm.ps1`; was 94% for the week on 09-20, resets ~09-22 |

**DeepSeek is UNSMOKED.** No key was set when it was written. Its first use in your session is:

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/deepseek-exec.ps1 -Smoke
```

Record the dated result in the STATUS comment at the top of that script, the way `claude-glm.ps1`
carries its own verification line. Until that line exists its output is not evidence. **The key he
pasted into a chat on 2026-09-20 is in a transcript on disk and must be rotated** — he sets
`DEEPSEEK_API_KEY` himself, in his own shell; it never appears in a chat, a command line or a file.

DeepSeek has no tools, no filesystem, no repo access — that decides what to send it. Anything that
must edit a file or run a command goes to Sonnet or Sol.

Call `mcp__ccd_session_mgmt__get_usage` at boot and before every Claude fan-out, and say the numbers
to him in one line. On 2026-09-20 ~13:00 the 5-hour window was ~25%, the week ~12%, Fable ~10%,
resetting 2026-09-26.

## 2. Where things stand

**Production = `31d44b9`, `dpl_A6PqFCsmCFCav2Cbj79eo781nv1e`, all three domains, CARD 1 67 PASS /
0 FAIL** (`.planning/exec/card1-123-prod-0920-clipfix.txt`), verified 2026-09-20 ~12:50.
Revert: promote `dpl_Go2xKXbYYECL34ygnDtECsJRQzbQ` (`9813825`). Branch `design/live-evolve` in the
worktree `.claude/worktrees/p106-live` is level with `origin/main`. Push to main deploys.

Shipped today: the five study bands, his ticked cuts, the judge fix round, the RFP Results row
dropping its repeat, the clip retry fix, and the HandCircle deletion.

**Read the deploy id off the wire, never out of a doc** (LESSONS #45 — a RESUME line naming a
deploy the domains were not serving nearly set a ship gate's baseline wrong):

```bash
curl -sL https://www.micahjonesconsulting.com/ | grep -o 'data-dpl-id="[^"]*"'
EXPECT_DPL=<that id> bash .planning/exec/card1-123.sh
```

## 3. Pass-124, the work itself

The prompt he ran is `.planning/research/pass-124-copy-voice-prompt.md`. Read it before you read his
answer — it tells you what was asked, what was locked, and what was deliberately delegated.

Three things in it shape how you receive the result:

- **He delegated the audience ruling** ("research and ultrathink on this one"), so the answer will
  contain a recommendation on how one page serves a range running from a solo birth worker to an
  enterprise security buyer. That recommendation is a proposal, not a decision. It goes to him.
- **A third reader is new:** he wants the site to also work for someone considering him for a
  full-time corporate role. Nothing on the site was written for that.
- **Anti-patterns, verbatim:** humble-brag storytelling, jargon-dense insider writing. He did *not*
  object to plain confidence or directness — do not soften the copy in the name of fixing it.

**A voice change is a Pass, not an edit.** Scope it (LESSONS #39 — scope before any direction
popup), get his ruling on the voice, write the brief, then build. He rejects on sight, so he sees new
copy rendered in the real page before it ships, never only in a document. Serve the build with
`preview_start` name `prod-p106` so he can scroll it.

**The blog does not exist yet.** There is no `/blog` route, no post content type, no index, nothing
in `app/sitemap.ts`. He asked for blogs and "a perfect voice" for them, so if his answer includes a
blog plan, building the route, the MDX content type, the frontmatter schema, the index, RSS and the
sitemap entries is real work that has not been started or estimated. Say so before it is assumed done.

## 4. What is owed him, honestly

Nothing below is blocked on anyone but us unless marked.

1. **The copy pass** — receive his wording, verify every fact, brief, build, gate, show, ship.
2. **The blog** — route, content type, schema, index, RSS, sitemap. Not started. Sizeable.
3. **DeepSeek smoke test** — one command, needs his rotated key. *Blocked on him.*
4. **Home hero CLS 0.0045** at 1440 (`h1.cw-h1` / `p.cw-sub` at load), pre-existing. Deliberately
   deferred: the copy pass rewrites that hero, so tuning it now is churn. Do it after.
5. **`/work/guardicore` mobile LCP ~3.4s** (text LCP), pre-existing. Speed Insights field p75 is the
   agreed judge (Pass-120) — nobody has actually gone and read it. That reading is owed.
6. **K4 and K5 at 390** are one flaky harness race (scrollIntoView vs Lenis), not the page: K4 failed
   at 13.9 on 09-19 and passed the rerun at 4.7. A background task is filed. The harness fix is owed.
7. **The em-dash gate only blocks on `.mdx`/`.md`.** A `.tsx` page can carry two past the build. That
   gap matters more the moment new copy lands in `.tsx`. Closing it is owed, ideally before the copy.
8. **`.claude/RESUME.md` is ~2.7KB against its own 2.5KB cap.** Six rounds of shaving did not fix it
   because the state genuinely grew. The real fix is structural: split standing setup notes from
   current state. Owed.
9. **`content/site.ts` does not exist** despite `.claude/CLAUDE.md` naming it as the home of global
   copy; that copy is inline in `app/(foyer)/page.tsx`, `Hero.tsx`, `Nav.tsx`, `PageFooter.tsx`. Fix
   the doc when the copy pass touches those files.
10. **Parked, his calls:** which other real photos of him to animate like the Tel Aviv clip; the
    colleagues' okay for that clip; ORDANI screenshots; `fable-harness-init` + `@AGENTS.md`
    (CC 2.1.277). The GLM pay-as-you-go top-up is no longer needed — DeepSeek took that leg.

## 5. How to work with him

Popups, two questions at a time, recommended option first; read his "Other" text literally. On an
open strategy question expect "you research it" — make one option explicitly *research it and rule*.
Lead with what happened and what he must decide. Visuals early: before/after sheets at 390 and 1440
via SendUserFile, and the real build in the browser pane. A badly reading sentence goes to him at
once with rewrites, never parked.

## Micah: open the new chat

In the Claude desktop app's Code tab, choose the `p106-live` worktree, pick **Opus 5**, and paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it. I have the copy research back.`
