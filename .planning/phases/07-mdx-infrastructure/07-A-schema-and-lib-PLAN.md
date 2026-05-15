# Plan 07-A — Schema + Lib Hardening

**Phase:** 07 MDX Infrastructure
**Plan letter:** A
**Wave:** 1 (parallel with 07-B, 07-C, 07-D)
**Requirements supported:** CASE-01, CASE-02, CASE-10
**Files touched:**
- `lib/case-study-schema.ts` — CREATE
- `lib/case-studies.ts` — UPDATE (replace Phase 6 defensive parse with Zod-validated read; add `getCaseStudyBySlug` + `getNextCaseStudy`)
- `lib/copy-lint-runner.ts` — UPDATE (add MDX frontmatter Zod gate alongside banned-word scan)
- `app/(foyer)/page.tsx` — UPDATE (Phase 6 call-site uses `cs.words`; rename to `cs.titleCardWords`)
- `app/(foyer)/work/page.tsx` — UPDATE (same call-site rename)

## Goal

Establish the strict, typed contract for case-study frontmatter and wire it into the build-time gate. Replace the Phase 6 tolerant parse with a fail-loud Zod validation so any drift across `content/work/*.mdx` aborts the build with a clear error pointing to the file + Zod issue.

## Steps

1. **Create `lib/case-study-schema.ts`** verbatim per `07-RESEARCH.md` §5.1:
   - Export `CASE_STUDY_STATUSES = ["shipped", "in-flight", "archived", "stub"] as const`
   - Export `caseStudyFrontmatterSchema` Zod object with: `title`, `dek`, `role`, `tools[]`, `year` (string|number), `status` (enum), `titleCardWords[3..6]`, optional `heroStill`, optional `client`
   - Export `CaseStudyFrontmatter` type via `z.infer`

2. **Rewrite `lib/case-studies.ts`** verbatim per `07-RESEARCH.md` §5.2:
   - Replace `CaseStudyMeta` interface to extend `CaseStudyFrontmatter` + slug
   - Remove `deriveWordsFromTitle()` (no longer needed; schema requires `titleCardWords`)
   - `getAllCaseStudies()` uses `caseStudyFrontmatterSchema.safeParse()`; on failure, **throw** with file path + Zod issue list
   - Add `getCaseStudyBySlug(slug)` returning `CaseStudyMeta | null`
   - Add `getNextCaseStudy(slug)` returning `CaseStudyMeta | null` (wraps to first; null if only 1 study or unknown slug)
   - Sort order: status rank (shipped < in-flight < archived < stub), then year desc
   - `getSelectedWork()` filters out `status === "stub"` so the Phase 7 test slug never lands on Home

3. **Update `lib/copy-lint-runner.ts`** verbatim per `07-RESEARCH.md` §5.3:
   - Import `caseStudyFrontmatterSchema` + `gray-matter`
   - Add `scanMdxFrontmatter(cwd)` helper that walks `content/work/*.mdx` and returns `SchemaFinding[]`
   - Aggregate banned-word findings AND schema findings into one error report
   - Throw with combined message if either is non-empty
   - On success: print `Zero banned-word findings, zero schema violations.`

4. **Update foyer call sites** — `app/(foyer)/page.tsx` and `app/(foyer)/work/page.tsx`. Phase 6 reads `cs.words`; Phase 7 schema exposes `cs.titleCardWords` (the canonical name). Rename via grep:
   - `grep -n "cs\.words" app/(foyer)/page.tsx app/(foyer)/work/page.tsx` → see exact line(s)
   - Edit each to use `cs.titleCardWords` (the field renamed at the source of truth)

5. **Sanity-check Phase 4 stub frontmatter:**
   - `content/work/test-slug.mdx` currently has `title`/`dek`/`role`/`tools[]`/`year`/`status` but is missing `titleCardWords` — Plan 07-G updates this file with the richer body that includes `titleCardWords`. For 07-A's standalone verify, this means `pnpm lint:copy` will FAIL until 07-G lands. That is correct and intentional — the schema gate is doing its job. Document this in the verify section so Wave 4 catches it as the expected handoff.

## Verification

- `pnpm typecheck` clean — no type errors after the rename + schema introduction.
- `lib/case-study-schema.ts` exports the named items.
- `lib/case-studies.ts` no longer references `deriveWordsFromTitle`.
- `lib/copy-lint-runner.ts` references `caseStudyFrontmatterSchema` and `scanMdxFrontmatter`.
- Foyer call sites use `cs.titleCardWords`, not `cs.words`.
- `pnpm lint:copy` would currently fail on the stub MDX missing `titleCardWords` — that's expected; 07-G test corpus update + verify-step closes the loop.

## Success criteria

CASE-01 + CASE-02 + CASE-10 all have observable implementation. The schema is the single source of truth for frontmatter shape, the build-time gate is wired, the lib function returns strongly-typed objects, and the call sites consume the canonical field name.
