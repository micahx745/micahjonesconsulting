# Kickoff: micahjonesconsulting, continuing after the 2026-09-21 Pass-126/127/128 session

Written 2026-09-21 by the Opus 5 session that shipped Pass-126, ran the doors rounds (Pass-127), the live-jank root
cause (Pass-128) and the three blog posts. `.claude/RESUME.md` is current state and outranks this file. A SEPARATE chat
owns the landing-page exemplar (`.planning/handoff/KICKOFF-LANDING-EXEMPLAR.md`); do not start that work here.

## 0. Before anything
1. Open in the `p106-live` worktree (the routing hook prints an "AI ROUTING" block; if it does not, say so).
2. Read `.claude/AI_ROUTING.md`. Boot probes in one line: `get_usage`, `scripts/deepseek-exec.ps1 -Smoke`,
   `scripts/gemini-exec.ps1 -Smoke`. Say the numbers.
3. One popup to confirm the order before any arc (LESSONS #3 "FULL-TIME PAGE HELD"): suggested order below.

## 1. Where things stand
- LIVE: `main = e091a16`, `dpl_Bk18zCfBqPb2DjTrkozL2dBs7git` on all three domains (card1-126 157/0 with EXPECT_DPL).
  Revert: promote `dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH`. `design/live-evolve` is ahead by docs and drafts only; any push
  redeploys and needs his words.
- Preview worktree `p124-cuts` (branch `preview/p126-how-i-work`) holds the Pass-127 mocks, juries and captures.

## 2. Suggested order (his to confirm)
0. **Owed gate, first (LESSONS #49):** the worktree write-guard hook (a Write landed in the main checkout; restored).
   Repo-level `.claude/settings.json` + a hook script; bite-test both ways. Use the `update-config` skill.
1. **The jank fix (Pass-128 fix).** Read `.planning/qa/pass-128/ROOT-CAUSE.md` first. "Words slow" is root-caused
   (the letter-by-letter SplitReveal heading: 1.1 s to settle, causal A/B). "Scroll not smooth" is NOT: its leading
   suspect (SplitReveal's per-character inline-style writes, `invalidation.txt`) failed its first A/B only because the
   CSS neutralizer does not stop GSAP's writes; run THE RIGHT TEST in ROOT-CAUSE.md section 2 first (detach the
   characters). The colour glitch is mechanism-observed (the doors band's "bone" world between two terracotta sections;
   mid-screen switch lag; three entrances stacked at the Audit). Put ROOT-CAUSE.md's three operator questions to him by popup, then brief,
   Sol builds on a preview, verify with `.planning/qa/pass-128/scroll-probe.mjs`, his push words.
2. **The doors build (Pass-127c).** He picked round-two 6 "The Copy Gets Eaten" (jury unanimous). Brief:
   `.claude/briefs/pass-127c-doors-build.md`; fill section 4b from the jank decisions (the band's world value), then
   dispatch Sol on a new branch `preview/p127-doors` in `p124-cuts`. Fable judges once; he tries it on his phone.
3. **Queued by him 09-21:** the exits scoreboard on phones ("you have to keep swiping down and nothing happens": measure
   with the dead-swipe detector `.planning/mocks/pass-127/doors-r2/capture-127b.mjs` + `sheets-127b.py`, adapted to the
   real page); the "Four exits I worked inside" title needs presence; Neuton's "Undisclosed" (jurors propose from the
   ledger, he rules; nothing changes before his pick).
4. **The blog:** all three posts LOCKED (`.planning/drafts/blog-0{1,2,3}/POST-*-LOCKED.md`); the blog page is built by
   the exemplar chat, not here. Posts are generic SEO advice, no work stories, no pitch, the ledgered about-me foot.
5. **Queue:** the held /full-time page, inner pages (/about never got the research voice; Ordani "practice management"
   vs "CRM"), open facts, Guardicore LCP p75, K4/K5 race, dead CSS, DeepSeek key rotation ("Not yet, I'll do it").

## 3. Traps learned 2026-09-21 (all in LESSONS)
- Headless Chrome 153: CDP `synthesizeScrollGesture` with touch is a no-op; the probes dispatch touch events by hand.
- Measure the finished frame (#48): the first live wrap-gate run read a reveal mid-slide (53 px vs a settled 40).
- A juror pass is relative unless told the bar: three jurors passed blog draft 1, which he called "very AI"; judge
  against "does this kill it", and gate with `node .planning/exec/blog-lint.mjs`.
- Gemini: 3.1-pro-preview 429 (quota), 2.5-pro 404, 3.5-flash 503 twice; 2.5-flash works. DeepSeek v4-pro needs
  `-MaxTokens 96000` for long drafts (48000 ran out in reasoning).
- PowerShell `*>` logs are UTF-16; brief Sol to use `cmd /c "... > log 2>&1"`. The secret-guard hook blocks literal
  fake keys in commands: build test strings at runtime.
- The dead-swipe detector exists and bites (self-test PASS); use it on any scroll-held moment.

## 4. How to work with him (unchanged)
Popups, two questions at a time, recommended first, read "Other" literally. Show the rendered thing (sheets/GIFs at 390
and 1440). When models split, give each pick by name with the tie-break. LEGS stamp on every checkpoint and copy/design
commit. Non-Claude models take every leg they can (memory "every-other-model-by-default"; he asked mid-session 09-21).

## Micah: open the new chat
In the Claude desktop app's Code tab, choose the `p106-live` worktree, pick **Opus 5**, and paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it.`
