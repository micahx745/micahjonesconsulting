# Plan 07-G — Test MDX Update + Phase 7 Verification

**Phase:** 07 MDX Infrastructure
**Plan letter:** G
**Wave:** 4 (depends on Waves 1-3)
**Requirements supported:** Phase 7 ROADMAP success criteria + traceability close-out
**Files touched:**
- `content/work/test-slug.mdx` — UPDATE (richer body exercising every component, adds `titleCardWords`)
- `.planning/phases/07-mdx-infrastructure/07-VERIFY-OUTPUT.md` — CREATE
- `.planning/phases/07-mdx-infrastructure/verification-artifacts/` — CREATE (Chrome DevTools MCP screenshots if available)
- `.planning/STATE.md` — UPDATE (Phase 7 complete; Phase 8 next)
- `.planning/ROADMAP.md` — UPDATE (Phase 7 status + plan count)
- `.planning/REQUIREMENTS.md` — UPDATE (8 REQ-ID traceability status to Complete)

## Goal

Land the Phase 7 test corpus (test-slug.mdx richer body) that exercises every MDX component, then run the full verify matrix from `07-RESEARCH.md` §6 — including the **negative-frontmatter test** that proves the CASE-02 Zod gate works. Write a binding verdict to `07-VERIFY-OUTPUT.md` and update ROADMAP/STATE/REQUIREMENTS traceability.

## Steps

1. **Update `content/work/test-slug.mdx`** verbatim per `07-RESEARCH.md` §5.10:
   - Frontmatter: `title: Test slug`, `dek: A stub for Phase 7 MDX infrastructure verification.`, `role: Stub`, `tools: [Next.js, MDX]`, `year: 2026`, `status: stub`, `titleCardWords: [STUB, MDX, RENDER]`
   - Body:
     - `## Problem` paragraph
     - `<CaseStudyStill alt="Placeholder still" date="2026-05" />` (omit `src` to exercise the placeholder branch)
     - `## Why it matters` paragraph
     - `## Approach` followed by bulleted list
     - `<CopperRule />`
     - `## What it became` followed by `<CaseStudyStill alt="Second placeholder" caption="What a doula sees on a Tuesday morning" date="2026-04" />`
     - `## Outcome` paragraph
     - `<PullQuote attribution="stub source">A test quote rendered in Source Serif 4 italic with copper underline-grow on scroll-in.</PullQuote>`
   - **Banned-word scrub:** scan the body against the 30-word `lib/banned.ts` list before committing. The example text above is clean of `drive`, `unlock`, `leverage`, `journey`, `solutions`, etc.

2. **Typecheck:** `pnpm typecheck` — capture output, must be zero errors.

3. **Banned-word + frontmatter lint:** `pnpm lint:copy` — capture output, must report `Zero banned-word findings, zero schema violations.`

4. **Build:** `pnpm build` — capture output, must succeed. Verify Next.js prints `/work/test-slug` as a prerendered route.

5. **GSAP quarantine grep:**
   - `grep -rE "import.*gsap" --include='*.ts' --include='*.tsx' . | grep -v 'node_modules\|\.next\|TitleCard'`
   - Expected: zero matches. Phase 7 must not regress this.

6. **Dev server smoke test:** start `pnpm dev` in background; wait 6s; `curl http://localhost:3000/work/test-slug` — verify 200 status + presence of `STUB` (from titleCardWords) in HTML; verify presence of `A stub for Phase 7 MDX infrastructure verification` (from dek) in HTML; verify presence of `## Problem` HTML rendering (h2 with text "Problem").

7. **Chrome DevTools MCP screenshot (if available):** navigate to `http://localhost:3000/work/test-slug` at 1440×900 desktop; take screenshot of the full page (or scroll-snapshot if available). Save to `verification-artifacts/test-slug-1440.png`.

8. **NEGATIVE-FRONTMATTER TEST (critical proof for CASE-02 success criterion):**
   - Edit `content/work/test-slug.mdx` frontmatter to set `status: "invalid-enum"` (an enum value not in `["shipped", "in-flight", "archived", "stub"]`)
   - Run `pnpm build` — must FAIL with a clearly-formatted error citing `content/work/test-slug.mdx` + a Zod issue (e.g., `status: Invalid enum value`)
   - Capture the failing output verbatim into `07-VERIFY-OUTPUT.md`
   - Restore `status: stub`
   - Re-run `pnpm build` — must succeed
   - This is the binding proof that the CASE-02 build-time gate works

9. **(Optional) Foyer↔theater transition retest:** with `pnpm dev` running, use Chrome DevTools MCP to navigate `/` → `/work/test-slug`; verify view transition fires (cross-fade visible). Capture screenshot if MCP available.

10. **Stop dev server.**

11. **Write `07-VERIFY-OUTPUT.md`** with:
    - Verdict header: PASS or FAIL with date
    - All 8 REQ-IDs (CASE-01..02, CASE-07..10, THEATER-04..05) with observable evidence
    - All 5 success criteria with checkmarks + evidence quote
    - Negative-frontmatter test output (the failing build excerpt)
    - GSAP quarantine grep output
    - Screenshot references (if MCP captured)

12. **Update `.planning/STATE.md`:**
    - `completed_phases: 7`, `completed_plans: 42` (35 + 7)
    - Current focus: "Phase 7 (MDX Infrastructure) complete; Phase 8 (Case Studies — ORDANI verbatim + 3 others) next — ready to plan"
    - Document Phase 7 highlights (8/8 REQs PASS, negative-frontmatter test confirms Zod gate works, GSAP quarantine intact)

13. **Update `.planning/ROADMAP.md`:**
    - Phase 7 row: `[x]` checkmark + completion date `2026-05-14`
    - Plans Complete column: `7/7`
    - Status column: Complete
    - Append Plan listing under Phase 7 Details (7 plans: 07-A through 07-G)

14. **Update `.planning/REQUIREMENTS.md` traceability table:**
    - CASE-01 → Complete
    - CASE-02 → Complete
    - CASE-07 → Complete
    - CASE-08 → Complete
    - CASE-09 → Complete
    - CASE-10 → Complete
    - THEATER-04 → Complete
    - THEATER-05 → Complete

## Verification

- All 8 REQ-IDs have observable evidence in `07-VERIFY-OUTPUT.md`.
- All 5 ROADMAP success criteria are addressed.
- Negative-frontmatter test produces a clear build failure (the binding proof for CASE-02).
- GSAP imports remain quarantined to `components/TitleCard.tsx`.
- The Phase 4 stub-MDX/theater-stub behavior is preserved: `/work/test-slug` still renders cleanly.

## Success criteria

Verdict in `07-VERIFY-OUTPUT.md` is PASS. Hand off to Phase 8 (Case Studies — ORDANI verbatim) is unblocked. The MDX infrastructure is in place to receive real case-study content.
