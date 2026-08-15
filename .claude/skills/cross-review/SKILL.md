---
name: cross-review
description: Use at two checkpoints to get an INDEPENDENT cross-model (Gemini + Codex + GLM) opinion that breaks the Claude-verifies-Claude monoculture. (1) BEFORE the first Pass-N commit of an arc — review the plan. (2) AFTER pnpm build + /premium audit pass and BEFORE the CARD 1 ship flow — review the diff for bugs. Use proactively at those moments on non-trivial work.
---

# cross-review

Three external model lineages review the work at the two points where a check
on Claude is worth the latency: before building, and before the change goes
live. Ported from the Ordani harness 2026-08-15 and retargeted to this repo.

## When to self-invoke

- **Plan checkpoint** — after an arc is planned and BEFORE its first `Pass-N`
  commit. External models find scope gaps, contradictions with the constitution,
  and decisions that will be expensive to reverse once built.
- **Ship checkpoint** — after `pnpm build` and `/premium audit` pass, BEFORE the
  CARD 1 flow. This is the true point of no return: once
  `npx vercel alias set` runs against `www.micahjonesconsulting.com`, it is live.
  A CONFIRMED block-class finding blocks CARD 1 — not the build; the build
  already passed, which is precisely the failure mode LESSONS #7 documents (a
  regression that cleared every static gate and shipped through two passes).

Skip for trivial/doc-only changes. Honor `SKIP_CROSS_REVIEW=1`.

## How

1. **Build the target.**
   - plan = the decision/plan doc (default: newest in `.planning/reviews/`).
   - diff = `git diff <base>..HEAD`. Default `<base>` is `origin/main` — this
     repo batches Pass-N commits behind an operator deploy gate, so
     `origin/main..HEAD` is exactly "everything not yet live". Mid-arc, use the
     parent of the arc's first Pass commit:
     `git rev-parse "$(git log --grep='^Pass-33' --format=%H -1)^"`.
     **NEVER bare `git diff`** — commits land per Pass, so the tree is clean here
     and bare `git diff` reviews an EMPTY diff.
   - Write to `qa/xr/xr_input.txt` (gitignored) with a HEADER listing every
     surface EXCLUDED from the review text. Exclusions are load-bearing: the
     disposition protocol refutes findings aimed at excluded surfaces, and that
     only works if the header is honest. Typical:
     `-- . ':(exclude)pnpm-lock.yaml' ':(exclude)qa/' ':(exclude)public/*.png'`
   - **Sanity-gate the input both ways.** Under ~2KB for a code arc means the
     base is wrong. Over `--max-bytes` (200000) it gets truncated — a full arc
     diff here can exceed that (Pass-40 alone purged 4,291 CSS lines), so cut
     deliberately and header what you cut rather than letting it truncate.

2. **Run it.**
   `python scripts/cross-review/run_cross_review.py --mode <plan|diff> --input qa/xr/xr_input.txt --out qa/xr/xr_out.txt`
   then Read the out file. The SCRIPT is the leg + model-pin authority — pins
   are never restated in prose, because a restated pin is what rotted upstream.
   Solo re-run of one flaked leg: `--legs gemini`. Every omitted or
   unconfigured leg prints its own banner, so a partial round can never read as
   a full one.

3. **Add Claude's own review, labelled as same-family** — not an independent
   leg. Spawn it fresh: `superpowers:code-reviewer` at `{model: "fable"}` for a
   diff; `design-director` / `copy-editor` for a plan.

4. **Reconcile** per `.claude/cross-review-prompt.md`.

5. **Disposition protocol — MANDATORY before any verdict.** For EVERY external
   finding, verify its premises against the live repo FIRST: Read the cited
   lines, grep the claimed pattern, check versions in `package.json`.
   - **CONFIRMED** (evidence file:line) → must-fix before proceeding.
   - **REFUTED** (evidence file:line disproving the premise) → dismissed, with
     the disproof written into the review artifact.
   - **UNVERIFIABLE** → surface to the operator with both views.

   Agreement between legs raises priority but never skips premise verification.
   Every BLOCK gets exactly one disposition: **ADOPT**, **REFUTE** (allowed ONLY
   with re-runnable evidence quoted inline — the command and its output;
   "we believe it's fine" is softening, not refutation), or **DEFER** (with a
   `.claude/RESUME.md` Queue item number). Mixed verdicts net toward BLOCK: any
   CONFIRMED block-class finding → overall BLOCK; all external BLOCKs refuted →
   `BLOCK (overridden: n refuted, evidence attached)`, never a silent PASS.

   **Rendered-output findings cannot be refuted by reading source.** Contrast,
   blend modes, spacing, LCP, a purged CSS rule — these need a screenshot
   (`scripts/visual-baseline.mjs`), a Lighthouse run, or a CARD 3 curl-marker
   grep. LESSONS #7 is the proof: `getComputedStyle` reported the identical
   value for the working and the broken wordmark.

6. Emit `CROSS-REVIEW VERDICT: PASS | CONCERNS (n) | BLOCK (n)` + merged findings.

## Artifacts

Raw legs and the reconciliation live in `.planning/reviews/` beside the existing
review corpus: `CROSS-REVIEW-PASS-<N>-<PLAN|DIFF>.md` for the ledger,
`-r<N>` suffixes for each round's raw legs. Scratch inputs stay in `qa/xr/`
(gitignored).

## Refusals (honesty — LESSONS applies to model output too)

- NEVER fabricate a model's opinion. If a leg errors or is unconfigured, say the
  round was partial and name which legs ran. The script's banners carry into the
  round file for exactly this reason.
- Do not soften an external BLOCK to keep momentum. Independence is the point.
- A fix pass is itself a first-class review subject — re-diff after fixing.
  This repo shipped LESSONS #7 through two passes because nobody re-reviewed
  the fix.
- This complements, never replaces, the CARD 2 evidence-locked external design
  review and the CARD 3 live-domain marker check.
