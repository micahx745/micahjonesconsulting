# Plan 08-E — `content/citations.ts` + test-slug cleanup + phase verify

**REQ-IDs:** none (supporting all Phase 8 REQ-IDs)
**Wave:** 2 (after 08-A/B/C/D)
**Estimated effort:** 1 new file + 1 deletion + full verification matrix

---

## 1. Goal

Three threads bundled into one verification plan:

1. Create `content/citations.ts` — documents the CDC source for ORDANI's "Why it matters" stats. Build-time scanner picks it up automatically.
2. Delete `content/work/test-slug.mdx` — Phase 4/7 stub no longer needed now that four real case studies exist.
3. Run the full phase-verification matrix per 08-RESEARCH.md §11: typecheck, build, route count, negative-test #1 (banned-word), negative-test #2 (Zod invalid status), MCP screenshots, GSAP quarantine grep, render-order DOM check.

---

## 2. Scope

**Touches:**
- Create `content/citations.ts`
- Delete `content/work/test-slug.mdx`
- Run verification commands (no other file changes)
- Write `08-VERIFY-OUTPUT.md`
- Update `.planning/ROADMAP.md` (Phase 8 → Complete)
- Update `.planning/STATE.md` (current focus, last activity)
- Update `.planning/REQUIREMENTS.md` traceability table (CASE-03..06 → Complete)

**Does NOT touch:**
- The four MDX files written in Wave 1 (they're done).
- `app/(theater)/work/[slug]/page.tsx` — `generateStaticParams` already wired in Phase 7.
- Any component code.

---

## 3. `content/citations.ts` content

Documented in 08-RESEARCH.md §7.1:

```ts
// content/citations.ts
//
// Phase 8 — Documents sources for any verbatim statistics in case studies.
// The case-study MDX prose itself remains verbatim per blueprint §9; this
// file records the citation for traceability (and for any future component
// that wants to render footnotes).
//
// Source: blueprint §9 ORDANI "Why it matters" paragraph; CLAUDE.md line 57.

export const CITATIONS = {
  ORDANI_CDC_2024: {
    id: "ORDANI_CDC_2024",
    title: "Maternal Mortality Rates in the United States, 2024",
    publisher: "Centers for Disease Control and Prevention (CDC), National Center for Health Statistics",
    url: "https://www.cdc.gov/nchs/products/databriefs/maternal-mortality-2024.htm",
    accessedAt: "2026-05-14",
    quotedStatistics: [
      "44.8 per 100,000 live births (non-Hispanic Black women, maternal mortality rate)",
      "14.2 per 100,000 live births (non-Hispanic white women, maternal mortality rate)",
      "~3.15x rate ratio (Black vs. white, non-Hispanic)",
    ],
    citedIn: ["content/work/ordani.mdx (Why it matters)"],
  },
} as const;

export type CitationId = keyof typeof CITATIONS;
```

**Banned-word check:** "Maternal Mortality Rates", "Centers for Disease Control and Prevention", "rate ratio" — clean.

**TypeScript check:** `as const` produces a readonly record; `CitationId` is the union of keys; type-only consumers can import safely.

**Build-scanner check:** `lib/copy-lint-runner.ts` SCAN_TARGETS includes `{ dir: "content", extensions: [".mdx", ".md", ".ts"] }` — so `content/citations.ts` is scanned. Clean prose passes.

---

## 4. test-slug deletion

```powershell
Remove-Item C:/Users/micah/Code/micahjonesconsulting/content/work/test-slug.mdx
```

After deletion, `getAllCaseStudies()` returns only the four real case studies. `generateStaticParams` prerenders only those four routes. `/work/test-slug` becomes a 404.

**Rationale (also in 08-RESEARCH.md §8):**
- The four real case studies exercise every component (TitleCard, Dek, CaseStudyStill, PullQuote, CopperRule).
- Keeping test-slug would prerender it to production — not desirable.
- Future negative-frontmatter tests can be done ad-hoc by temporarily editing a real case study.

---

## 5. Verification matrix

Run each in order; record output in `08-VERIFY-OUTPUT.md`.

### 5.1 Typecheck

```bash
pnpm typecheck
```

Expected: clean. Citations file's `as const` + index type signature passes; no schema changes; no consumer-side type drift.

### 5.2 Build (positive)

```bash
pnpm build
```

Expected:
- `[copy-lint] ✓ Scanned project. Zero banned-word findings, zero schema violations.`
- Route table includes:
  - `/work/[slug]` row with four sub-routes prerendered:
    - `/work/akamai`
    - `/work/hr-equity-author`
    - `/work/ordani`
    - `/work/passioneer`
  - No `/work/test-slug` row.
- All four marked as SSG (`●`).

### 5.3 Negative test #1 — banned-word build failure

1. Edit `content/work/ordani.mdx` — change "shipped" to "drove" somewhere in the body (a real banned-word swap that the verbatim prose doesn't contain — "drove" is a form of "drive" which IS banned).
2. Run `pnpm build`.
3. Expected output (exact format from `lib/copy-lint-runner.ts`):
   ```
   [copy-lint] N banned word finding(s):
     content/work/ordani.mdx:LINE:COL — "drove" in: "...drove..."

   copy-lint: N banned-word + 0 schema violation(s). Fix the prose / frontmatter or update lib/banned.ts / lib/case-study-schema.ts. Build aborted.
    ELIFECYCLE  Command failed with exit code 1.
   ```
4. Restore `shipped`.
5. Re-run `pnpm build` to confirm clean.

**Note:** "drive" is the banned root; "drove" matches `\bdrive\b`? **NO** — the regex uses literal word boundaries. "drove" does NOT match `\bdrive\b`. Use a DIFFERENT swap: change `"shipped"` to `"unlock"` (literal banned word). Verify the build aborts with `"unlock"` in the finding. Restore.

### 5.4 Negative test #2 — Zod schema failure

1. Edit `content/work/hr-equity-author.mdx` frontmatter — change `status: shipped` to `status: "invalid-status"`.
2. Run `pnpm build`.
3. Expected output:
   ```
   [case-study-schema] 1 MDX file(s) with invalid frontmatter:
     content/work/hr-equity-author.mdx:
       - status: Invalid option: expected one of "shipped"|"in-flight"|"archived"|"stub"

   copy-lint: 0 banned-word + 1 schema violation(s). Fix the prose / frontmatter or update lib/banned.ts / lib/case-study-schema.ts. Build aborted.
    ELIFECYCLE  Command failed with exit code 1.
   ```
4. Restore `status: shipped`.
5. Re-run `pnpm build` to confirm clean.

### 5.5 Chrome DevTools MCP — screenshots

Boot `pnpm dev`. Open each route in turn at 1440px viewport, take a full-page screenshot:

- `http://localhost:3000/work` → `work-index-1440.png`
- `http://localhost:3000/work/ordani` → `ordani-1440.png`
- `http://localhost:3000/work/hr-equity-author` → `hr-equity-author-1440.png`
- `http://localhost:3000/work/passioneer` → `passioneer-1440.png`
- `http://localhost:3000/work/akamai` → `akamai-1440.png`

Save all to `.planning/phases/08-case-studies/verification-artifacts/`.

Visual verification checklist:
- Work index: four TitleCard thumbnails (REACH/RFP/RETAINER, POSITIONING/MOVED/ACQUIRED, ORDANI/INTAKE/SECURE/SHIPPED, PASSIONEER/PROOF/PENDING). Sort order: shipped first, then in-flight, then stub.
- ORDANI: TitleCard at 96px → Dek → meta → Problem → Why it matters (with CDC stats inline) → Approach (4 numbered) → 3 CaseStudyStill placeholders → Outcome → PullQuote (beta user, name withheld). PullQuote underline is copper (not sage — Phase 7 component decision).
- HR Equity Author: TitleCard → Dek → meta → Problem → Why → Approach (4 numbered) → Outcome → PullQuote (client). No stills.
- Passioneer: TitleCard → Dek → meta → 2-paragraph body. No headings. No stills. No PullQuote.
- Akamai: TitleCard → Dek → meta → Problem → Approach → Outcome. No PullQuote. No stills.

### 5.6 Sage color audit

```bash
grep -rE "#5E7158|ordani-sage|--color-ordani-sage" app/ components/ content/ lib/
```

Expected matches:
- `app/globals.css` — `--color-ordani-sage: #5E7158;` (token definition, line 36)
- That's it. No consumers. Sage stays reserved.

### 5.7 GSAP quarantine grep

```bash
grep -rE "import.*gsap|from 'gsap" --include='*.ts' --include='*.tsx' . | grep -v node_modules | grep -v ".next"
```

Expected: only `components/TitleCard.tsx`. PullQuote uses CSS + IntersectionObserver, no GSAP.

### 5.8 Render-order DOM check

Boot `pnpm dev` (or use the production build). For each route, curl and grep markers:

```bash
# ORDANI
curl -s http://localhost:3000/work/ordani | grep -oE "ORDANI|INTAKE|SECURE|SHIPPED|case-study-dek|<h2>The problem|<h2>Why it matters|<h2>Approach|case-study-still|<h2>Outcome|case-study-pull-quote|beta user|back to foyer"

# HR Equity Author
curl -s http://localhost:3000/work/hr-equity-author | grep -oE "REACH|RFP|RETAINER|case-study-dek|<h2>The problem|<h2>Why it matters|<h2>Approach|<h2>Outcome|case-study-pull-quote|back to foyer"

# Passioneer
curl -s http://localhost:3000/work/passioneer | grep -oE "PASSIONEER|PROOF|PENDING|case-study-dek|case study draft|back to foyer"

# Akamai
curl -s http://localhost:3000/work/akamai | grep -oE "POSITIONING|MOVED|ACQUIRED|case-study-dek|<h2>The problem|<h2>Approach|<h2>Outcome|150K|back to foyer"
```

Expected: all markers present in document order matching the wireframes.

### 5.9 ROADMAP / STATE / REQUIREMENTS updates

Update `.planning/ROADMAP.md`:
- Phase 8 row: `[ ]` → `[x]`, status → Complete, date → 2026-05-14.
- Progress table: Phase 8 → 5/5 plans complete, Complete, 2026-05-14.

Update `.planning/STATE.md`:
- `progress.completed_phases`: 7 → 8.
- `progress.total_plans`: 42 → 47.
- `progress.completed_plans`: 42 → 47.
- Current focus → "Phase 8 (Case Studies) complete; Phase 9 (Portrait Integration) next — paused per --no-transition flag."
- Last activity timestamp + summary.

Update `.planning/REQUIREMENTS.md` traceability table:
- `CASE-03 | Phase 8 | Pending` → `Complete`
- `CASE-04 | Phase 8 | Pending` → `Complete`
- `CASE-05 | Phase 8 | Pending` → `Complete`
- `CASE-06 | Phase 8 | Pending` → `Complete`

---

## 6. `08-VERIFY-OUTPUT.md` structure

```
# Phase 8 Verification Output — Case Studies (Theater Content)

Phase: 08 Case Studies
Verified: 2026-05-14
Verdict: ✅/❌ PASS/FAIL summary

## 1. REQ-ID coverage (4/4)
   - Table for CASE-03..06

## 2. Success criteria (5/5)
   - Table for ROADMAP §Phase 8 criteria

## 3. Build output (positive)
   - Full `pnpm build` stdout showing 4 SSG routes

## 4. Negative test #1 — banned word
   - Procedure + output + restoration confirmation

## 5. Negative test #2 — Zod invalid status
   - Procedure + output + restoration confirmation

## 6. Sage color audit
   - Grep results showing token defined + zero consumers

## 7. GSAP quarantine
   - Grep results showing only TitleCard imports GSAP

## 8. Render-order DOM evidence
   - 4× grep output blocks per route

## 9. MCP screenshots
   - 5 files captured under verification-artifacts/

## 10. Em-dash deviation note
   - Documents that ORDANI + HR Equity verbatim contain multiple em-dashes per page; user-authorized verbatim treatment overrides COPY-05 manual-subagent rule.

## 11. Harness hook safety
   - Hook-by-hook status table

## 12. Files shipped
   - 4 new MDX + 1 new TS + 1 deletion

## 13. Verdict
   - Phase 8 = PASS.
   - Phase 9 unblocked but paused per --no-transition flag.
```

---

## 7. Files

**Created:**
- `content/citations.ts`
- `.planning/phases/08-case-studies/08-VERIFY-OUTPUT.md`
- `.planning/phases/08-case-studies/verification-artifacts/*.png` (5 screenshots)

**Deleted:**
- `content/work/test-slug.mdx`

**Updated:**
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/REQUIREMENTS.md`

---

## 8. Commit

After 08-E executes: `docs(phase-8): complete phase execution`

The single phase-final commit aggregates:
- citations.ts
- test-slug deletion
- verify output doc
- screenshot artifacts
- planning doc updates
