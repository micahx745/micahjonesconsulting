# 10-F — Performance audit (PERF-01..09)

**Covers:** PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-06, PERF-07, PERF-08, PERF-09
**Depends on:** Wave 1 (10-A..E merged)
**Estimated effort:** 1 hour
**Files touched:** likely 0-2 (only fixes if budget breaches)

---

## Pre-flight

1. Wave 1 plans merged.
2. `pnpm build` produces a `.next/` directory.
3. Chrome DevTools MCP available.

---

## Audit script

### 1. GSAP quarantine (PERF-07)

```bash
grep -rE "import.*from\s+['\"]gsap" --include='*.ts' --include='*.tsx' . \
  | grep -v 'node_modules\|\.next\|TitleCard\.tsx'
```

Expected: zero output.

### 2. Image budget (PERF-05)

```bash
find public -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.avif' \) -size +500k
```

Expected: zero output.

### 3. Lazy-load below-fold stills (PERF-08)

Read `components/CaseStudyStill.tsx`. Confirm:
- Hero/first still uses `loading="eager"` (or no `loading` attribute — next/image defaults vary).
- Below-fold stills use `loading="lazy"`.

If `<CaseStudyStill>` always lazy-loads, even better — the hero still in the article body is below the TitleCard (which dominates above-fold), so lazy is correct.

### 4. Font CLS — `adjustFontFallback` (PERF-06)

Read `lib/fonts.ts`. Confirm each font import explicitly sets:
- `display: "swap"` (or default; `swap` is `next/font/google` default)
- `adjustFontFallback: true` (or implicit — `next/font/google` enables fallback metrics by default for Latin subsets)

If `adjustFontFallback` is not explicit, leave it — Next.js 16 enables it by default for Google fonts. Document this verification.

### 5. First-load JS budget (PERF-09)

After `pnpm build`, inspect output:
- Read the Next.js build output table (route → first load JS). Next 16 prints this as a "Route (App)" section.
- Foyer routes (`/`, `/about`, `/work-with-me`, `/contact`, `/work`) should be ≤90KB.
- Theater route (`/work/[slug]`) is allowed to carry the GSAP bundle.

Capture the build output table to verification artifacts.

If a foyer route exceeds 90KB: investigate. Likely culprits:
- GSAP accidentally imported via a transitive bundle (re-run quarantine grep).
- A heavy component (e.g., PullQuote) imported into foyer chrome (PullQuote is theater-only — verify by grep).
- Large dependency in a foyer page (none expected; Phase 6 was clean).

### 6. Lighthouse per route (PERF-01..04)

For each of 9 routes, run Chrome DevTools MCP Lighthouse audit on mobile (or capture performance trace + manually inspect Core Web Vitals).

Routes:
1. `/`
2. `/about`
3. `/work-with-me`
4. `/contact`
5. `/work`
6. `/work/ordani`
7. `/work/hr-equity-author`
8. `/work/passioneer`
9. `/work/akamai`

For each:
- Performance ≥ 95
- LCP ≤ 1800ms
- INP ≤ 200ms
- CLS ≤ 0.05

Capture JSON outputs to `.planning/phases/10-hardening-deploy/verification-artifacts/lighthouse-<route>.json`.

If Performance score is unavailable from MCP (some implementations expose limited metrics), capture the underlying timings and document the workaround.

---

## Likely fixes (if budget breaches)

| Symptom | Fix |
|---------|-----|
| LCP > 1800ms on Home | Confirm `<PortraitImage variant="main" priority />` — should already have `priority` |
| CLS > 0.05 | Verify fonts.ts has `adjustFontFallback: true`; if needed add explicitly |
| Performance < 95 on foyer routes | Grep for GSAP in foyer route bundles; if found, refactor |
| First-load > 90KB on foyer routes | Inspect `.next/static/chunks/` sizes; identify the offending chunk; dynamic-import |

---

## Verification

1. All bash audits return clean.
2. All Lighthouse JSON saved.
3. PERF-01..09 each marked PASS or PASS-with-caveat in the verify output.

---

## Rollback

If a fix is needed: the fixes are minimal (priority flag toggle, font config option). Revert if any cause regressions.
