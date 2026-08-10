# STANDING TECHNIQUES — terse operational cards for procedures that proved out

Promote a procedure here the moment it works twice. Cards cite their source (lesson number,
commit, doc) and never inline credentials — pointers to gitignored local files only.

## CARD 1 — Ship flow (proved across Pass-25..32)

```
pnpm build                       # runs copy-lint FIRST (never bypass), then Next build + TS
git add <files> && git commit    # "Pass-N: <what>" subject; never --amend
npx vercel deploy --yes          # team scope passioneer
npx vercel alias set <deploy-url> micahjonesconsulting.vercel.app
npx vercel alias set <deploy-url> www.micahjonesconsulting.com    # LESSONS #5 — until dashboard add
git push origin main
curl spot-check BOTH domains     # marker-grep the changed copy (CARD 3)
```
Run as ONE chained command where possible — interrupted turns have stranded
committed-but-undeployed states twice.

## CARD 2 — Evidence-locked external review (LESSONS #1)

Any Cowork/external review prompt must include: (a) the exact live-route list + expected
404s/redirects; (b) "critique only what you loaded this session"; (c) verbatim-quote
requirement per finding; (d) a closing EVIDENCE LOG table (URL | HTTP status | one quoted
line) — findings not traceable to it are invalid; (e) scope pinned to the correct domain.
Template: `.planning/prompts/cowork-design-review-prompt.md`.

## CARD 3 — Verify-before-acting marker grep (LESSONS #1)

For every review finding and every deploy: `curl -s <url> > /tmp/x.html`, then a
FOUND/MISSING loop over exact marker strings (the quoted copy). want-present and want-gone
lists. Zero tolerance for acting on a claim whose marker doesn't match.

## CARD 4 — Copy rules quick card (enforced by hooks + copy-editor agent)

First person "I". ≤25 words hard cap per sentence. Real numbers only (facts ledger:
LESSONS #3). Banned-word list: `.claude/brand.json.voice.banned` (~30 terms). Em-dash cap:
one per page. Evidence before claim. No prospect naming, no problem-presumption (LESSONS #4).

## CARD 5 — Design work routing (premium-web plugin)

Before ANY UI change: read `.claude/brand.json` + `docs/DESIGN_BAR.md`. Direction calls →
`design-director` agent. Motion → `motion-engineer` (one signature motion, it refuses
seconds). Prose → `copy-editor`. Pre-deploy → `/premium audit` (a11y-reviewer + perf-auditor
+ visual-qa + copy-editor). Definition of done: `.claude/CLAUDE.md` §Definition of done
(Lighthouse ≥95 mobile, axe zero serious, reduced-motion honored, zero banned words).
NOTE: the live home diverged from the foyer/theater description in `.claude/CLAUDE.md` — the
home + top-level pages run the "Color Worlds" system (`data-mode="cw"`, terracotta/bone/
petrol/espresso, Bricolage display); (theater) case-study routes keep the obsidian theater.
Live code wins over stale doc prose.
