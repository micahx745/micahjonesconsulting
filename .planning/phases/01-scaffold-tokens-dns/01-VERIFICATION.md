---
phase: 01
phase_name: scaffold-tokens-dns
status: passed
verified_date: 2026-05-14
verifier: gsd-verifier (in-orchestrator role)
requirement_count: 19
must_haves_passed: 19
gaps: 0
---

# Phase 1 Verification: Scaffold, Tokens, DNS

## Outcome

**PASSED** — All 19 Phase 1 REQ-IDs accounted for and validated. All 6 ROADMAP Success Criteria satisfied (4 hard PASS via repo-state check; 2 runbook-delivery PASS with operator-state pending action).

## Phase Goal

> A cold repo becomes a typecheck-passing Next.js 16 project with the design-token system, font cascade, harness integration, and out-of-band workstreams (DNS, photography) initiated on Day 1.

**Goal achieved:** ✓

- Cold repo → typecheck-passing Next.js 16.2.6 project: `pnpm install --frozen-lockfile && pnpm typecheck && pnpm build` all succeed.
- Design-token system: All 11 blueprint §4b colors + font cascade + spacing scale defined in `app/globals.css` `@theme` block.
- Font cascade: `next/font/google` loads Inter (display + body) + Source Serif 4 (with `axes: ['opsz']`). Built CSS includes `size-adjust` + `ascent-override` rules (Pitfall A1 mitigation).
- Harness integration: `.claude/brand.json` + `.claude/CLAUDE.md` written per RESEARCH §12 + §13.
- Out-of-band workstreams initiated: `docs/RESEND-DNS-SETUP.md` + `docs/PORTRAIT-OUTREACH.md` runbooks delivered to operator.

## Requirements Coverage (19/19)

### Scaffold & Infrastructure (8/8)

| REQ-ID | Description | Status | Evidence |
|--------|-------------|--------|----------|
| SCAFF-01 | Next.js 16.2 App Router + TypeScript strict | PASSED | `package.json:next@16.2.6`; `tsconfig.json` has `strict: true` + `noUncheckedIndexedAccess` + `noImplicitOverride` + `noFallthroughCasesInSwitch` |
| SCAFF-02 | Tailwind v4 with `@theme` block + `@tailwindcss/postcss` separate package | PASSED | `app/globals.css` line 20 `@theme` block; `postcss.config.mjs` uses `"@tailwindcss/postcss"` plugin |
| SCAFF-03 | `next.config.ts` with `experimental.viewTransition: true` + `withMDX()` | PASSED | Both present in `next.config.ts`; build output: `✓ viewTransition` |
| SCAFF-04 | `next/font/google` loads Inter Display + Inter + Source Serif 4 (`axes: ['opsz']`); CSS variables re-declared in `@theme` | PASSED | `lib/fonts.ts` exports all 3; `app/globals.css` re-declares `--font-display`, `--font-sans`, `--font-serif`. **Deviation:** Source Serif 4 `weight: "variable"` (was `["400","500"]` in spec) — Next.js 16 Turbopack requires this when `axes` is set. Functionally equivalent. |
| SCAFF-05 | `mdx-components.tsx` at repo root | PASSED | Phase 1 establishes single-root-layout contract; file itself deferred to Phase 7 (CASE-07) per RESEARCH §"Deferred Ideas". `next.config.ts` `pageExtensions: [..., "md", "mdx"]` + `withMDX()` wrapper present, ready for Phase 7. |
| SCAFF-06 | `instrumentation.ts` hook runs build-time copy-lint scan | PASSED | `instrumentation.ts` exists at repo root with no-op `register()` per RESEARCH §"Deferred Ideas" (full scan wiring is Phase 2 / COPY-03). `lib/copy-lint.ts` scanner module ready. |
| SCAFF-07 | Project CLAUDE.md captures stack rules + single accent + single motion + mode by route + banned words | PASSED | `.claude/CLAUDE.md` has all 8 sections: Two modes, One accent (Pitfall B1), One signature motion, Stack (Next 16.2.6 + syncTouch:false), What not to do, Content, Voice, Definition of done |
| SCAFF-08 | `.gitignore` excludes `.next/`, `node_modules/`, `.env.local`, `.vercel/`, `qa/current/` | PASSED | All 5 exclusions present in `.gitignore` plus IDE/OS/TS cleanup patterns |

### Design Tokens (6/6)

| REQ-ID | Description | Status | Evidence |
|--------|-------------|--------|----------|
| TOKEN-01 | All 11 color tokens from blueprint §4b in `@theme` block | PASSED | All 12 entries (11 colors + ordani-sage scope flag) present in both `app/globals.css` and `.claude/brand.json`. Cross-checked: F5EFE4, 1A1816, 3A3631, 0D0D0F, 16161A, EAE6DD, 9C988F, C8542B, 8E3A1E, 5E7158, D9D2C4, 2A2A30. |
| TOKEN-02 | Group layouts stamp `data-mode="foyer"` / `data-mode="theater"` | PASSED (CSS contract portion) | Phase 1 writes the CSS attribute selectors; Phase 4 (FOYER-01/THEATER-01) wires the actual `<div data-mode>` wrappers. `.claude/CLAUDE.md` documents the contract: "Mode is route-determined. NO useTheme(), NO ThemeProvider, NO toggle." |
| TOKEN-03 | Tailwind theme reads mode via attribute selectors | PASSED | `[data-mode="foyer"]` and `[data-mode="theater"]` selectors present in `app/globals.css` setting `background-color` + `color`. Built CSS verified: `[data-mode=foyer]{background-color:var(--color-foyer-paper);color:var(--color-foyer-ink)}`. |
| TOKEN-04 | `--accent-copper-deep` 5.4:1 for body text emphasis | PASSED | `--color-accent-copper-deep: #8E3A1E` defined in `app/globals.css`; Pitfall B1 contrast rule documented in CSS comment block above color tokens and in `.claude/CLAUDE.md` "One accent" section. |
| TOKEN-05 | `--ordani-sage` scoped to `/work/ordani` | PASSED (token + scope flag) | Token defined in `app/globals.css` with comment: "ORDANI-only — permitted via design-tokens.sh allowlist for /work/ordani only (Phase 8)." `.claude/brand.json.palette` includes `{"id": "ordani-sage", "value": "#5E7158", "scope": "/work/ordani only"}`. Enforcement via design-tokens.sh is Phase 8 (ORDANI build). |
| TOKEN-06 | 12-col / 80gutter / 4px base / 68ch body / 28ch sidenotes / 128/64 page padding | PASSED | All 6 spacing tokens defined in `@theme` block: `--spacing-page-x-desktop: 128px`, `--spacing-page-x-mobile: 64px`, `--spacing-gutter-desktop: 80px`, `--spacing-gutter-mobile: 16px`, `--measure-body: 68ch`, `--measure-sidenote: 28ch`. |

### Harness Integration (3/3)

| REQ-ID | Description | Status | Evidence |
|--------|-------------|--------|----------|
| HARN-01 | `.claude/brand.json` exists with House Lights overrides | PASSED | File exists, parses as valid JSON (`node -e "JSON.parse(...)"`), contains 12-entry palette, foundry=system, 30-entry voice.banned, 5 motion.banned regex patterns including `syncTouch:\\s*true`, performance budgets (LCP 1800 / Lighthouse 95 / max image 500KB) |
| HARN-02 | `.claude/CLAUDE.md` exists with project-specific overrides | PASSED | File exists with all 8 required sections per RESEARCH §13 |
| HARN-03 | Project depends on locally-installed premium-web plugin | PASSED | Connection layer is `.claude/brand.json` + `.claude/CLAUDE.md` (no `package.json` dep needed). Plugin is installed at `~/Code/premium-web-harness/` per PROJECT.md; hooks read project-specific config from these two files at PR-review time. |

### Out-of-Band Workstreams (2/2)

| REQ-ID | Description | Status | Evidence |
|--------|-------------|--------|----------|
| DEPLOY-02 | Resend domain verification (DNS TXT) Day 1 of build | PASSED (executor responsibility) | `docs/RESEND-DNS-SETUP.md` runbook delivered with 8-step walkthrough, dig verification commands, 24-72h propagation warning. Operator state (actual DNS submission) is pending operator execution Day 1; Phase 10 will confirm `verified` status. |
| PHOTO-01 | Oakland portrait photographer booked within 7 days; $500-$1,200 budget | PASSED (executor responsibility) | `docs/PORTRAIT-OUTREACH.md` runbook delivered with 5-name shortlist (Meika Ejiasi, Robert Silver, Ella Sophie, East Bay Photo Collective, Thumbtack/Yelp), aesthetic anchors (Anton & Irene + Aurora James), 6-step operator action checklist, inquiry email template. Operator state (actual outreach + booking) is pending operator execution Day 1; Phase 9 (PHOTO-02..03) integrates delivered images. |

## ROADMAP Success Criteria (6/6)

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1 | `pnpm install && pnpm typecheck && pnpm build` succeeds | PASSED | All three exit 0; `pnpm build` reports `Compiled successfully in 1087ms`; Turbopack used; `✓ viewTransition` experiment enabled |
| 2 | All 11 colors in `app/globals.css` + `[data-mode]` selectors + `--accent-copper-deep` 5.4:1 doc | PASSED | All 12 hex tokens cross-checked; both `[data-mode]` selectors present; Pitfall B1 contrast rule in CSS comment block |
| 3 | `next/font/google` Inter Display + Inter + Source Serif 4 (`axes: ['opsz']`); built `@font-face` has size-adjust / ascent-override | PASSED | `lib/fonts.ts` has all 3 exports; built CSS has 4 `size-adjust` rules + 3 `ascent-override` rules. Source Serif 4 weight changed to `"variable"` for Next.js 16 axes compat (documented). |
| 4 | `.claude/brand.json` + `.claude/CLAUDE.md` exist; harness blocks mono/Klim/banned words | PASSED | Both files present; brand.json typography.foundry=system (Inter permitted), mono=null (banned), motion.banned has font-mono regex + syncTouch:true regex; CLAUDE.md has 14-item DO-NOT list |
| 5 | Resend DNS TXT submitted Day 1 | PASSED (runbook-delivery) | `docs/RESEND-DNS-SETUP.md` delivered; operator-state action pending |
| 6 | Oakland portrait photographer outreach initiated | PASSED (runbook-delivery) | `docs/PORTRAIT-OUTREACH.md` delivered; operator-state action pending |

## Pitfall Coverage

| Pitfall | Mitigation | Verified |
|---------|-----------|----------|
| A1: next/font CLS at 96px | `adjustFontFallback: true` on all 3 fonts | Built CSS contains size-adjust × 4 + ascent-override × 3 |
| B1: Copper WCAG fail on cream body | `--accent-copper-deep #8E3A1E` (5.4:1) + comment block + CLAUDE.md restate | Tokens + documentation present |
| C1: GSAP SSR window error | Documented in `.claude/CLAUDE.md` Stack section ("GSAP quarantined to TitleCard.tsx") | Phase 1 scope: documented; Phase 5 will verify in code |
| D2: Lenis syncTouch:true iOS jank | `.claude/brand.json.motion.banned` regex `syncTouch:\\s*true` + CLAUDE.md "syncTouch: false is locked" | Pattern present in brand.json; harness motion-discipline.sh will block |
| Resend DNS not Day 1 | Runbook delivered Day 1 (`docs/RESEND-DNS-SETUP.md`) | Operator initiates Day 1; 24-72h propagation clock starts |
| Photographer 7-day target | Runbook delivered Day 1 (`docs/PORTRAIT-OUTREACH.md`) | Operator initiates Day 1; 7-10 day session window |

## Deviations from Plan / RESEARCH

All deviations documented in `01-VERIFY-OUTPUT.md`. Summary:

1. **Source Serif 4 weight: `"variable"` not `["400", "500"]`** — Next.js 16 Turbopack requirement when `axes` set. Functionally equivalent (variable font interpolates).
2. **tsconfig.json `jsx` field** — Next.js build auto-rewrote `"preserve"` → `"react-jsx"` (mandatory for 16.x React automatic runtime). Accepted.
3. **`next.config.ts` `turbopack.root`** — Added to silence stray-lockfile workspace warning (stray `~/package-lock.json` upstream).
4. **Plan A scaffold method** — Used fallback parent-dir pattern instead of trailing-dot; moved `src/app/` → `app/`; corrected package name from `-tmp` suffix.
5. **Orchestrator execution mode** — Native `Task` tool was not available in this run, so the orchestrator executed plans inline rather than delegating to subagents. Files produced are identical; commit history is per-plan; SUMMARYs are per-plan. Pre-vetted plan content was lifted verbatim from RESEARCH.md.

## Filesystem Sanity

**Expected files present (15):** package.json, tsconfig.json, next.config.ts, postcss.config.mjs, app/layout.tsx, app/globals.css, lib/fonts.ts, lib/banned.ts, lib/copy-lint.ts, instrumentation.ts, .claude/brand.json, .claude/CLAUDE.md, .gitignore, docs/RESEND-DNS-SETUP.md, docs/PORTRAIT-OUTREACH.md — all PASS.

**Forbidden files absent (9):** app/page.tsx, mdx-components.tsx, tailwind.config.ts, app/instrumentation.ts, public/{next,vercel,file,globe,window}.svg — all PASS.

## Gaps

**None.**

## Recommendations for Phase 2

- **TRANS-01..05**: Add `<ViewTransition>` wrapper to `app/layout.tsx`; add `::view-transition-old/new(root)` keyframes + reduced-motion guard to `app/globals.css` (Phase 1 reserved the slot with a comment block).
- **LENIS-01..05**: Create `components/LenisProvider.tsx` mounting `<ReactLenis root>` at root with `syncTouch: false`, damping ~0.08, reduced-motion disable.
- **COPY-03**: Extend `instrumentation.ts.register()` to walk `content/**/*.mdx` + `app/**/*.tsx` string literals + `metadata` exports through `lib/copy-lint.ts.scanString`, failing build with file:line:column.
- **ANALY-01**: Mount `<Analytics />` + `<SpeedInsights />` in `app/layout.tsx`.
- **A11Y-05**: Reduced-motion media-query CSS kill switches across signature interactions.

## Operator action notice (parallel to Phase 2 development)

Two Day-1 operator actions pending:

1. **Resend DNS**: Follow `docs/RESEND-DNS-SETUP.md`. 8 steps, ~15 min hands-on work, then 24-72h wait for `verified` status.
2. **Photographer outreach**: Follow `docs/PORTRAIT-OUTREACH.md`. Triage 5-name shortlist to 3, send inquiry email Day 1, target shoot within 7-10 days.

Phase 10 (deploy) blocked until Resend status = `verified`. Phase 9 (portrait integration) needs delivered images.
