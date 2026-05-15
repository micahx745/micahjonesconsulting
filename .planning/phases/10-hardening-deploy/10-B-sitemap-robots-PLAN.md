# 10-B — `app/sitemap.ts` + `app/robots.ts`

**Covers:** OG-03, OG-04
**Depends on:** Phase 7 (`lib/case-studies.ts`)
**Estimated effort:** 15 minutes
**Files touched:** 2 new

---

## Pre-flight

1. Confirm `lib/case-studies.ts` exports `getAllCaseStudies` (yes — Phase 7).
2. Confirm Next.js 16.2.6 supports `MetadataRoute.Sitemap` + `MetadataRoute.Robots` types (yes — App Router convention).

---

## Changes

### 1. Create `app/sitemap.ts`

Verbatim per 10-RESEARCH.md §2.5. Imports `getAllCaseStudies` from `@/lib/case-studies`. Lists 5 foyer routes + every case-study slug. `BASE_URL = "https://micahjonesconsulting.com"`.

### 2. Create `app/robots.ts`

Verbatim per 10-RESEARCH.md §2.6. Rules:
- `User-agent: *` → `Allow: /`
- `User-agent: GPTBot` → `Disallow: /work/`
- `User-agent: Google-Extended` → `Disallow: /work/`
- `User-agent: CCBot` → `Disallow: /work/`
- `User-agent: ClaudeBot` → `Disallow: /work/`
- `User-agent: anthropic-ai` → `Disallow: /work/`
- `sitemap: https://micahjonesconsulting.com/sitemap.xml`
- `host: https://micahjonesconsulting.com`

---

## Verification

1. `pnpm typecheck` clean.
2. `pnpm build` clean.
3. After build, `http://localhost:3000/sitemap.xml` returns XML listing all foyer + case-study URLs.
4. `http://localhost:3000/robots.txt` returns plaintext with the rules above.
5. Confirm `/robots.txt` lists `Sitemap: https://micahjonesconsulting.com/sitemap.xml` at the bottom.

Copy-lint: both files contain no banned words (URLs + user-agent strings + meta fields only).

---

## Rollback

Both files are additive. Delete to roll back; no other code depends on them.
