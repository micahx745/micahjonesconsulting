# Plan 07-E — `mdx-components.tsx` Registry

**Phase:** 07 MDX Infrastructure
**Plan letter:** E
**Wave:** 2 (depends on Wave 1: 07-A schema, 07-B Dek/CopperRule, 07-C CaseStudyStill, 07-D PullQuote)
**Requirements supported:** CASE-07
**Files touched:**
- `mdx-components.tsx` (REPO ROOT, not inside `app/`) — CREATE

## Goal

Land the `mdx-components.tsx` at the **repo root** with the `useMDXComponents` export wiring `<TitleCard>`, `<Dek>`, `<CaseStudyStill>`, `<PullQuote>`, `<CopperRule>` into the MDX compiler's globally-injected component map. Case-study MDX files can now reference these components without explicit imports.

**Critical placement rule:** the file MUST be at `C:/Users/micah/Code/micahjonesconsulting/mdx-components.tsx` (REPO ROOT). Placing it inside `app/` causes a silent render failure where MDX content falls back to default HTML primitives only (documented in `.claude/CLAUDE.md` line 48 + ARCHITECTURE §7.1 + Next.js MDX Guide 2026-05-13).

## Steps

1. **Create `mdx-components.tsx`** at REPO ROOT verbatim per `07-RESEARCH.md` §5.4:
   - Header doc comment citing CASE-07, the silent-failure footgun, and what's mapped
   - Import `MDXComponents` type from `mdx/types` (package is already pulled in via `@mdx-js/loader` + `@mdx-js/react`)
   - Import the five components:
     - `TitleCard` from `@/components/TitleCard` (Phase 5 — client wrapper, GSAP quarantined inside)
     - `Dek` from `@/components/Dek` (07-B)
     - `CaseStudyStill` from `@/components/CaseStudyStill` (07-C)
     - `PullQuote` from `@/components/PullQuote` (07-D)
     - `CopperRule` from `@/components/CopperRule` (07-B)
   - Export `useMDXComponents(components: MDXComponents): MDXComponents` returning `{ ...components, TitleCard, Dek, CaseStudyStill, PullQuote, CopperRule }`

2. **Do NOT remap default HTML primitives** (h1, h2, p, etc.). The MDX body uses ## Problem / ## Why it matters as headings; CSS in `app/globals.css` `[data-mode="theater"] .case-study__body h2` styles them. Keeps the surface area minimal.

3. **Verify placement** after write:
   - `test -f mdx-components.tsx` at repo root (Bash) — must exist
   - `test ! -f app/mdx-components.tsx` — must NOT exist (the wrong-placement footgun)

## Verification

- `pnpm typecheck` clean — the import paths resolve, the return type satisfies `MDXComponents`.
- `pnpm build` clean — MDX compiler picks up the file.
- File is at REPO ROOT, not inside `app/`.
- Manual: a hypothetical `content/work/foo.mdx` with `<Dek>Hello</Dek>` would now compile against the wired map (full proof comes in Plan 07-G when test-slug.mdx is updated + verify-step renders the page).

## Success criteria

CASE-07 implemented. The five Phase 7 components are globally available inside MDX without explicit imports. Repo-root placement guards against the silent-render-failure footgun.
