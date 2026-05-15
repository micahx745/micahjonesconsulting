# Plan 06-A — Helpers (case-studies.ts + contact-form-schema.ts)

**Phase:** 06 Foyer Pages
**Plan letter:** A
**Wave:** 1 (no upstream dependencies)
**Requirements supported:** FOYER-08 (Work index data source), FOYER-07 (contact form schema sharing)
**Files touched:**
- `lib/case-studies.ts` — CREATE
- `lib/contact-form-schema.ts` — CREATE

## Goal

Land the two helper modules every subsequent Phase 6 plan depends on. `lib/case-studies.ts` reads `content/work/*.mdx` frontmatter via `gray-matter` and returns sorted `CaseStudyMeta[]` for Home selected-work + Work index. `lib/contact-form-schema.ts` exports a shared Zod schema + inferred type used by both the Contact page's React form and the Server Action's parser.

## Steps

1. Create `lib/case-studies.ts` with verbatim content from 06-RESEARCH §3.1:
   - `CaseStudyMeta` interface with slug/title/dek/words/optional fields.
   - `deriveWordsFromTitle()` private helper for Phase 6 fallback when frontmatter omits `titleCardWords`.
   - `getAllCaseStudies()` async fn — reads `content/work/*.mdx`, parses via `gray-matter`, sorts by status="published" first then year desc.
   - `getSelectedWork(limit = 3)` convenience for Home strip.
2. Create `lib/contact-form-schema.ts` with verbatim content from 06-RESEARCH §3.2:
   - `contactFormSchema` Zod object with `name` (1..100) + `message` (10..2000), both trimmed.
   - `ContactFormInput` exported inferred type.

## Verification

- `pnpm typecheck` clean — both files type-check against existing `zod` + `gray-matter` deps.
- `pnpm lint:copy` clean — no banned words in either file (both contain only schema names, comments, and error messages drafted clean).
- Import smoke test (no separate test runner; the Wave 2 + 3 plans import these and will fail the typecheck if signatures drift).

## Success criteria

- Files compile.
- `getAllCaseStudies()` correctly returns an array of length 1 for Phase 6 (only `test-slug.mdx` exists). Sorts test-slug last because status="stub" not "published".
- `contactFormSchema.safeParse({name: "", message: ""})` returns `success: false` with both field errors populated.
