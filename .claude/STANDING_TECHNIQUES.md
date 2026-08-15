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
git push origin main             # NOTE: this fires Vercel's GitHub auto-deploy
npx vercel ls --prod             # grab the NEWEST deployment (the auto one)
npx vercel alias set <newest> micahjonesconsulting.vercel.app
npx vercel alias set <newest> www.micahjonesconsulting.com
curl spot-check BOTH domains     # marker-grep the changed copy (CARD 3)
curl both + compare data-dpl-id  # MUST match, else the domains serve two builds
```
ORDERING RULE (learned 2026-08-15): alias AFTER pushing, not before. The push
triggers an auto-deploy that takes the .vercel.app production domain while www
stays on the manually-aliased deployment — the two domains then serve different
builds from the same commit. Always re-alias both to the newest deployment last,
and prove it by diffing `data-dpl-id` across the two domains.
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

## CARD 6 — Cross-model review (ported from the Ordani harness, 2026-08-15)

Three EXTERNAL lineages review a plan or a diff, breaking the
Claude-verifies-Claude monoculture:

```
python scripts/cross-review/run_cross_review.py --mode diff \
  --input qa/xr/xr_input.txt --out qa/xr/xr_out.txt
```

Protocol: `.claude/skills/cross-review/SKILL.md` (procedure + the disposition
protocol) and `.claude/cross-review-prompt.md` (reconciliation, rounds, stop
rule). Command: `/cross-review plan|diff`. Escape hatch: `SKIP_CROSS_REVIEW=1`.

- **Where it sits in the ship flow:** `pnpm build` -> `/premium audit` ->
  **`/cross-review diff origin/main`** -> CARD 1. A CONFIRMED block-class
  finding blocks CARD 1, not the build — the build already passed, which is
  exactly how LESSONS #7 shipped through two passes.
- **`<base>` is `origin/main`,** because Pass-N commits sit behind an operator
  deploy gate. NEVER bare `git diff` — the tree is clean at this checkpoint.
- **Keys live at `~/.claude/.gemini-key` and `~/.claude/.zai-key`** — outside
  every repo, so one rotation site serves all projects and no working tree can
  stage a secret. `.gitignore` also blocks the in-repo paths as a backstop.
- **Model pins live ONLY in the script.** Never restate a pin in prose; a
  restated pin is what rotted upstream. Codex is pinned to `gpt-5.6-sol` and is
  the DEEP leg — give it latency, never truncation. Never bump the pin without
  smoke-testing THROUGH the harness: a direct-CLI OK does not imply the `llm`
  plugin can route it (`gpt-5.6-luna` answers directly but 404s through the
  plugin).
- **Cost:** zero ambient; per-round pennies on operator-owned accounts (Codex on
  the ChatGPT plan, Gemini on AI Studio, GLM pay-go). Invoke deliberately.
- Python 3.14 on PATH; the script is 100% stdlib — nothing to install.
