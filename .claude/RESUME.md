# RESUME — REWRITE whole-file every task. Never append. Last rewrite: 2026-08-15

## Now
- SHIPPED 2026-08-15, live on BOTH domains (perf 93 · a11y 96 · BP 100 · SEO 100
  · LCP 3017ms · CLS 0.0000; was 80 / 5115ms / 0.068 before this arc).
- Pass-43: portrait WIRED into /about — it had zero importers, so the drop-in
  flow documented in CLAUDE.md could never have worked. Placeholder "MJ" poster
  + its generator retired. Hanken 700 + JetBrains 600 added (browsers were
  synthesizing them; 0 bytes).
- Pass-44: cross-model review harness ported and PROVEN — all three legs
  returned live verdicts from this repo. Fixed a real honesty bug in it:
  glm-in-legs-without-a-key emitted NO banner, so a two-leg round read as three.
- The harness's FIRST run caught 5 real defects in Pass-43, all verified and
  adopted: lazy-loaded LCP image · .png silently unsupported · a false-green
  verify command I had written · a size budget claimed "enforced" that nothing
  enforces here · alt text asserting a setting the photo brief never promised.
- UNPUSHED: Pass-43, Pass-44, this RESUME. Pushing fires an auto-deploy, so per
  CARD 1 re-alias BOTH domains afterward and prove parity via data-dpl-id.

## Cross-review harness (CARD 6)
`/cross-review plan|diff`, or directly:
`python scripts/cross-review/run_cross_review.py --mode diff --input qa/xr/xr_input.txt --out qa/xr/xr_out.txt`
Legs: Gemini REST + Codex CLI (`gpt-5.6-sol`, the DEEP leg) + GLM REST. Keys at
`~/.claude/.gemini-key` / `.zai-key` — outside every repo, one rotation site.
Sits between `/premium audit` and CARD 1: a CONFIRMED block-class finding blocks
the SHIP, not the build (LESSONS #7 shipped through two passes precisely because
it cleared every static gate).

## The 95 question — ANSWERED and DECIDED (D14: keep faces)
Built once with fonts disabled: 97 / LCP 2651ms / 245KB, vs 92-93 / ~3.0-3.4s /
390KB with them. The three brand faces (144KB) ARE the gap. `display: optional`
tested and reverted — identical, because the bytes still travel. >=95 costs a
typeface; operator chose to keep all three.

## Queue (operator-owned)
1. Vercel dashboard: add www as a project domain — retires the per-deploy
   re-alias AND the auto-deploy domain-split trap (LESSONS #5).
2. Artifacts (D12): Ordani screenshots (#1, biggest remaining visual win),
   /about portrait (drop into public/ — see public/README.md), redacted RFP report.
3. Optional next arc: re-run the Cowork design review against the LIVE site. The
   existing one (2026-08-10) graded a site that no longer exists; both of its
   load-bearing failures (R1 three typefaces, R6 uniform grids) are now closed.
4. Spend note: the harness bills real pennies per round on operator accounts
   (Codex via ChatGPT plan, Gemini via AI Studio, GLM pay-go). Zero ambient.

## Verification harness
`node scripts/visual-baseline.mjs [--out DIR] [--reduced]` — 33 shots (11 routes
x 390/768/1440); `--diff A B` is a real per-pixel compare with a bounding box;
`--reduced` makes captures deterministic. Captures gitignored.
Scratchpad `axe-verify.mjs` re-measures every axe hit AFTER scrolling it into
view — the only way to separate real failures from this site's palette-shift
false positives.

## LIVE / MUST-RECONCILE
- [2026-06-18] www is a PER-DEPLOY ALIAS — every deploy re-aliases BOTH (CARD 1),
  and the alias step comes AFTER the push.

## Pointers
- Decisions: `.planning/reviews/DESIGN-DECISIONS-2026-08.md` (D1-D14)
- Lessons: `docs/LESSONS_LEARNED.md` (#3 facts ledger, #6 RSC entity-space,
  #7 mix-blend-mode/stacking-context)
- Techniques: `.claude/STANDING_TECHNIQUES.md` (CARD 1 ship, CARD 6 cross-review)
