# Kickoff: Opus 5.5 reviews the whole site, wording and visual design (written 2026-09-22)

Written by the site chat (p106-live, Opus 5.5) at the operator's request. His words, verbatim, 2026-09-22: "i want to
have the new opus model do more research and give its feedback on our wording on everything on the site. give me a
prompt for it", then "also visual designs".

This is a REVIEW arc: research, then feedback. It changes no site source (app/, components/, content/, lib/, public/).
Everything it writes goes under `.planning/research/opus55-review-2026-09/`, plus this worktree's `.claude/RESUME.md`.

## 0. Boot
1. You are Opus 5.5, the main session, in the `opus-review` worktree (branch `research/opus55-review`, cut from
   design/live-evolve). The AI ROUTING block should print at start; if it does not, say so.
2. Pass-128c is NOT yours. The site chat (p106-live) owns it: do not touch the p124-cuts worktree, preview/p128-jank,
   the preview server on port 3126, or anything that pushes or deploys. Review the LIVE site only.
3. Budget: run `get_usage`, say the numbers, record them with `python scripts/harness/status.py claude --five-hour N
   --weekly N --fable N --resets <ISO> --five-hour-resets <ISO> --window-start 2026-09-22T17:13:00Z`, then read
   `python scripts/harness/status.py tier`. At 01:09Z on 09-23: 5-hour 12%, weekly 15%, Fable 3%.
4. Read `C:/Users/micah/.claude/playbooks/marketing.md` and `website-dev.md` before any copy or design judgment, and
   say that you did. Read `.claude/AI_ROUTING.md` (routing and budget rules) and follow it.
5. Rewrite this worktree's `.claude/RESUME.md` (whole file, 2,500 bytes max) after every unit and before any dispatch.

## 1. The DISCUSS lock comes first (marketing playbook, rule 1)
Before any research, one popup (two questions, recommended first; links and paths go in chat text before it, never
inside it; options carry short codes). Read his "Other" text literally. Lock at least:
- How far the design feedback may go. Recommended: inside the existing theme, per the Pass-122 scope ruling ("i didnt
  want to change the entire site", `.claude/CLAUDE.md`), with a separate "rulings I would revisit" section for
  anything bolder. The alternative is open feedback.
- The peer set. Recommended: independent consultants and fractional operators selling to his buyers (read
  `02-BUSINESS-CONTEXT.md` and `04-CUT-D-competitive-set.md` first), and, for design, studios' CLIENT work.
If the page priority is unclear, ask a second popup. The default is every live page, starting with home and the six
case studies.

## 2. What we already believe (read these first; your job is the delta)
- Facts: the LESSONS #3 ledger in `docs/LESSONS_LEARNED.md`. Grep its NEVER-phrases against every rewrite you
  propose. Add no facts: a rewrite that needs a detail the ledger does not hold tags it [C1], [C2]..., and the
  detail reaches the site only after his "tick anything that did NOT happen" popup.
- Voice: `.claude/brand.json` (voice, the 30 banned words), the Voice section of `.claude/CLAUDE.md` (first person
  "I"; sentences 25 words or fewer on average; named numbers; at most one em-dash per page), `lib/copy-lint.ts`.
- Design: `docs/DESIGN_BAR.md` (R1-R15 with the dated rulings), `.claude/brand.json`, the Pass-122 amendment at the
  top of `.claude/CLAUDE.md` (motion permissions, one accent per screen, imagery rules).
- Prior research in `.planning/research/`: `02-BUSINESS-CONTEXT.md`, `01-REDDIT-EVIDENCE.md` and the `04-CUT-*`
  files, `04-CUT-D-competitive-set.md`, `pass-124-copy-research-ANSWER.md`, `pass-122-research-answer.md` and
  `pass-122-research-verify.md`.
- Buyer language: the Reddit corpus at `C:/Users/micah/Code/reddit-research/` (5,456 posts; a new cut takes seconds).
  Use it to learn how buyers describe their problem in their own words. Never search it for his own sentences to
  "validate" them.

## 3. Research (after the lock)
- A SET, never one reference: 10-16 peer sites for wording, each torn down with the same rubric (headline, offer,
  proof, price, call to action, about page, case-study shape), best parts taken. For design, 10-16 pieces of studios'
  CLIENT work live on the clients' own domains, not the studios' own homepages.
- Split research by facet, not by keyword variations. Verify every claim you lean on. End with the delta against
  section 2.
- Who does what: you read and judge (his request names Opus 5.5). Web research may fan out to Opus subagents
  (`model: "opus"`, at most 4 per wave, pointer briefs, short returns); before each, say "his request names Opus 5.5"
  as the routing reason. Mechanical legs stay off Claude: captures through the deterministic chain or GLM
  (`scripts/claude-glm.ps1 -Batch`), text extraction by script.

## 4. The review: every live page, in its final form
- Pages: the 12 in `https://www.micahjonesconsulting.com/sitemap.xml` (/, /about, /work, /services, /packages,
  /contact, /call, and /work/ guardicore, rfp-engine, ordani, content-engine, birth-worker), plus the 404 page, /call
  /kickoff and /services/thanks. Also nav, footer, metadata titles and descriptions, OG images, alt text, form labels
  and errors, button labels, and the emails the forms send (`app/actions/*.ts`).
- Wording: read the LIVE text (`curl.exe -s https://www.micahjonesconsulting.com/<route>`), and map every finding to
  its source file:line in this worktree.
- Visual: capture the live domain at 390 and 1440 with `node scripts/harness/visual-qa.mjs --base-url
  https://www.micahjonesconsulting.com --routes "..." --widths "390,1440" --out <dir>` (viewport shots; run
  `pnpm install --frozen-lockfile` here first), plus reduced motion, and a scroll contact sheet for the pages that
  move with the scroll (home, one case study). Open at most 7 raw images in this chat; everything else goes through
  `python scripts/harness/visual_qa.py --sheet` as downscaled contact sheets. Opus subagents may take a set of pages
  each, 7 images at most per subagent, images before text.
- Each finding gives: where (URL plus file:line, or image plus area); what is there (quote the words); what is wrong
  (the rule it breaks, or how a buyer reads it); a severity (P1 costs a buyer's trust or attention; P2; P3); and a
  fix. Wording findings carry one or two rewrites.

## 5. What you hand him
- `.planning/research/opus55-review-2026-09/REPORT.md`, in this order: the top 10 across the site; then page by page;
  then site-wide patterns; then "rulings I would revisit", each with its evidence (never folded into the fix list);
  then the research delta. End with a LEGS stamp: `LEGS: fable=N astra=N dspro=N dsflash=N gemini=N sol=N glm=N
  sonnet=N opus=N`.
- In chat: the report path and the contact sheets, so he sees the rendered evidence. Then popups for his calls on the
  top findings, two questions at a time, recommended first. Every P1 goes into the first round; nothing is parked.
- What he accepts becomes a build brief, `.claude/briefs/<pass>-opus55-<slug>.md` (exact copy strings, verification
  commands with expected output, the rejected list), for a later pass. That pass writes non-ASCII copy in the main
  session only (LESSONS #46) and runs the standard checkpoint reads (Fable, Astra, deepseek-v4-pro) before anything
  ships. A push needs his words.
- Commit as each unit lands, with explicit pathspecs (LESSONS #23). Near 200K context: finish the unit, rewrite the
  RESUME, write a kickoff in `.planning/handoff/`, and stop.

## 6. Traps
- Use `git -C` and full paths; a `cd` moves the session's working directory (LESSONS #64).
- The global push gate reads `|vercel` inside a quoted grep pattern as a deploy command. Use separate `-e` patterns.
- A third-party `claude` child runs only through a launcher with the LESSONS #65 scrub.
- Sol's shell has no `rg` or `pnpm`, and `curl` there means Invoke-WebRequest: use `git grep` and `curl.exe`.

## Micah: open the new chat
In the Code tab choose the `opus-review` worktree, pick Opus 5.5 (high effort), and paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/opus-review/.planning/handoff/KICKOFF-OPUS55-REVIEW.md and follow it.`
