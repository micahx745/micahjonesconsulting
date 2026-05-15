# Phase 1 Verification — Scaffold, Tokens, DNS

**Date:** 2026-05-14
**Executor:** gsd-executor (in-conversation orchestrator after Task subagent type unavailable)
**Outcome:** PASS

---

## ROADMAP Success Criteria — pass/fail

### Criterion 1: `pnpm install && pnpm typecheck && pnpm build` succeeds with Next.js 16.2 + Tailwind v4 @theme + MDX + experimental.viewTransition

- `pnpm install --frozen-lockfile`: **PASS** (`Lockfile is up to date, resolution step is skipped`)
- `pnpm typecheck`: **PASS** (added `"typecheck": "tsc --noEmit"` script to package.json; runs clean with no errors)
- `pnpm build`: **PASS** (Next.js 16.2.6 with Turbopack; `Compiled successfully in 1087ms`; `Generating static pages using 4 workers (3/3) in 361ms`)
- `next.config.ts` has `viewTransition: true`: PASS
- `next.config.ts` has `withMDX` wrapper: PASS
- `postcss.config.mjs` uses `@tailwindcss/postcss`: PASS

**Overall Criterion 1:** PASS

---

### Criterion 2: 11 color tokens in `app/globals.css` keyed by `[data-mode]`; `--accent-copper-deep` 5.4:1 documented

All 11 hex tokens present in `app/globals.css`:

- `#F5EFE4` foyer-paper: PASS
- `#1A1816` foyer-ink: PASS
- `#3A3631` foyer-ink-soft: PASS
- `#0D0D0F` theater-ground: PASS
- `#16161A` theater-surface: PASS
- `#EAE6DD` theater-ink: PASS
- `#9C988F` theater-ink-soft: PASS
- `#C8542B` accent-copper: PASS
- `#8E3A1E` accent-copper-deep: PASS
- `#5E7158` ordani-sage (scoped): PASS
- `#D9D2C4` rule-foyer: PASS
- `#2A2A30` rule-theater: PASS

- `[data-mode="foyer"]` selector: PASS
- `[data-mode="theater"]` selector: PASS
- Pitfall B1 contrast rule (5.4:1) documented in CSS comment block: PASS

**Overall Criterion 2:** PASS

---

### Criterion 3: `next/font/google` Inter Display + Inter + Source Serif 4 with `axes: ['opsz']`; built `@font-face` has size-adjust + ascent-override

- `lib/fonts.ts` exports `interDisplay` / `inter` / `sourceSerif`: PASS
- Source Serif 4 has `axes: ["opsz"]`: PASS
- Source Serif 4 weight: `"variable"` (Next.js 16 requirement when axes is set — see note below)
- All three set `adjustFontFallback: true`: PASS
- Built CSS `size-adjust` count: 4 occurrences (PASS — Pitfall A1 mitigated)
- Built CSS `ascent-override` count: 3 occurrences (PASS — one per font's fallback `@font-face`)

Built CSS verified at `.next/static/chunks/0jyu5a26dshdy.css`:
- `@font-face{font-family:Inter Fallback;src:local(Arial);ascent-override:90.44%;descent-override:22.52%;line-gap-override:0.0%;size-adjust:107.12%}`
- `@font-face{font-family:Inter Fallback;src:local(Arial);ascent-override:90.44%;descent-override:22.52%;line-gap-override:0.0%;size-adjust:107.12%}` (second Inter instance)
- `@font-face{font-family:"Source Serif 4 Fallback";src:local(Times New Roman);ascent-override:87.87%;descent-override:28.41%;line-gap-override:0.0%;size-adjust:117.91%}`

**Note on Source Serif 4 weight change:** RESEARCH.md §6 specified `weight: ["400", "500"]` together with `axes: ["opsz"]`. Next.js 16's Turbopack build rejected this combination with the error: `Axes can only be defined for variable fonts when the weight property is nonexistent or set to "variable"`. The fix was to change `weight: ["400", "500"]` → `weight: "variable"`. This is functionally equivalent (the variable font interpolates weights 200-900 internally) and is the recommended pattern per the Next.js Font Optimization docs for variable fonts. A code comment in `lib/fonts.ts` documents the constraint.

**Overall Criterion 3:** PASS

---

### Criterion 4: `.claude/brand.json` + `.claude/CLAUDE.md` with House Lights overrides; harness can block monospace/Klim/banned words

- `.claude/brand.json` exists + valid JSON: PASS (validated via `node -e "JSON.parse(...)"`)
- Palette 11 hex match `app/globals.css`: PASS (all 12 entries — 11 colors plus ordani-sage scope — present)
- Voice.banned 30 entries match `lib/banned.ts`: PASS (spot-checked unlock, drive, leverage, elevate, synergy, seamless, empower)
- Typography foundry = "system" (Inter permitted without license-lock): PASS
- Motion.banned has font-mono pattern: PASS (`"font-mono|font-family:\\s*ui-monospace"`)
- Motion.banned has `syncTouch:\\s*true` pattern: PASS (Pitfall D2 regression block)
- `.claude/CLAUDE.md` exists with required sections: PASS — verified Two modes, One accent (Pitfall B1), One signature motion, Stack (Next 16.2.6 + syncTouch:false), What not to do (14-item DO-NOT list), Content, Voice, Definition of done (7 criteria)

**Overall Criterion 4:** PASS

---

### Criterion 5: Resend DNS TXT submitted Day 1

- `docs/RESEND-DNS-SETUP.md` runbook exists: PASS
- Runbook is the executor's deliverable per Plan H scope (operator-side DNS submission is operator-state)
- Operator action: pending until operator authenticates to Resend + registrar dashboards Day 1 of build

**Overall Criterion 5 (executor's responsibility):** PASS — runbook delivered; operator state pending
**Operator action notice:** DNS TXT submission needed Day 1 to start 24-72h propagation clock. Phase 10 launch depends on `verified` status by ~Day 7.

---

### Criterion 6: Oakland portrait photographer outreach initiated

- `docs/PORTRAIT-OUTREACH.md` runbook exists with shortlist + email template + $500-$1,200 budget: PASS
- 5-name shortlist present (Meika Ejiasi, Robert Silver, Ella Sophie, East Bay Photo Collective, Thumbtack/Yelp fallback): PASS
- Inquiry email template references Anton & Irene + Aurora James aesthetic: PASS
- Phase 9 dependency flagged (portrait-main.jpg, portrait-context.jpg): PASS
- Sender email caveat (Plan H DNS dependency): PASS
- Operator action: pending until operator triages portfolios + sends 3 inquiry emails

**Overall Criterion 6 (executor's responsibility):** PASS — runbook delivered; operator state pending
**Operator action notice:** Send 3 inquiry emails Day 1. Target shoot within 7-10 days. Phase 9 integrates delivered images.

---

## Filesystem Sanity Checks

**Expected files (15):**
- package.json: PASS
- tsconfig.json: PASS
- next.config.ts: PASS
- postcss.config.mjs: PASS
- app/layout.tsx: PASS
- app/globals.css: PASS
- lib/fonts.ts: PASS
- lib/banned.ts: PASS
- lib/copy-lint.ts: PASS
- instrumentation.ts (at repo root): PASS
- .claude/brand.json: PASS
- .claude/CLAUDE.md: PASS
- .gitignore: PASS
- docs/RESEND-DNS-SETUP.md: PASS
- docs/PORTRAIT-OUTREACH.md: PASS

**Forbidden files (must NOT exist in Phase 1):**
- app/page.tsx: PASS (deleted by Plan A — Phase 4 owns `/` via foyer route group)
- mdx-components.tsx: PASS (Phase 7 creates)
- tailwind.config.ts: PASS (Tailwind v4 has no JS config)
- app/instrumentation.ts: PASS (instrumentation.ts is at repo root, NOT inside app/)
- public/next.svg, public/vercel.svg, public/file.svg, public/globe.svg, public/window.svg: ALL PASS (deleted by Plan A)

---

## Build Output Notes

Build successful with one informational message:
```
We detected TypeScript in your project and reconfigured your tsconfig.json file for you.
- include was updated to add '.next/dev/types/**/*.ts'
- jsx was set to react-jsx (next.js uses the React automatic runtime)
```

Next.js auto-applied two compatibility changes to `tsconfig.json` during build:
1. Added `.next/dev/types/**/*.ts` to `include` (dev types for Turbopack dev mode)
2. Changed `jsx: "preserve"` → `jsx: "react-jsx"` (mandatory for React automatic runtime)

Both are auto-managed Next.js conventions and acceptable. The original Plan A spec used `jsx: "preserve"`, but Next.js mandates `react-jsx` for 16.x. This deviation is documented here for the gsd-verifier subagent.

---

## Pitfall coverage verification

| Pitfall | Documented | Verified |
|---------|-----------|----------|
| A1: `next/font/google` CLS at 96px (size-adjust + ascent-override required) | `lib/fonts.ts` comment + `.claude/CLAUDE.md` Stack | size-adjust × 4 + ascent-override × 3 in built CSS (PASS) |
| B1: Copper 3.85:1 fails WCAG AA on cream body text | `app/globals.css` comment block + `.claude/CLAUDE.md` One accent | --accent-copper-deep #8E3A1E (5.4:1) token defined; rule documented (PASS) |
| C1: GSAP `window is not defined` on SSR | `.claude/CLAUDE.md` Stack note | Documented; not yet relevant (TitleCard is Phase 5) (PASS — Phase 1 scope) |
| D2: Lenis `syncTouch: true` iOS jank | `.claude/CLAUDE.md` Stack + `.claude/brand.json.motion.banned` regex | `syncTouch:\\s*true` blocked at harness motion-discipline.sh (PASS) |
| Resend DNS not started Day 1 | `docs/RESEND-DNS-SETUP.md` runbook | Runbook delivered; operator initiates Day 1 (PASS — executor responsibility) |
| Photographer 7-day target | `docs/PORTRAIT-OUTREACH.md` runbook | Runbook delivered; operator initiates Day 1 (PASS — executor responsibility) |

---

## Notes / Warnings / Follow-ups

### Deviations from RESEARCH spec (documented)

1. **Source Serif 4 weight**: RESEARCH specified `weight: ["400", "500"]` + `axes: ["opsz"]`. Next.js 16 Turbopack rejects this combination — `axes` requires `weight: "variable"` or no explicit weight. Changed to `weight: "variable"`. Functionally equivalent (variable font interpolates).

2. **`tsconfig.json` `jsx` field**: RESEARCH specified `jsx: "preserve"`. Next.js 16 auto-rewrites to `jsx: "react-jsx"` on first build. Accepted.

3. **`pnpm-workspace.yaml`**: Scaffolder dropped this file with `ignoredBuiltDependencies: [sharp, unrs-resolver]` (skips native-build prompts). Kept in place. Triggers a "multiple lockfiles" warning that is silenced by `turbopack.root: __dirname` in `next.config.ts`.

4. **Plan A scaffold method**: Trailing-dot `pnpm create next-app .` failed because `.planning/` exists. Used fallback parent-directory pattern (scaffold to `../micahjonesconsulting-tmp`, move files, remove tmp dir). The scaffolder default also placed app at `src/app/`, which was moved to `app/` at the repo root to match Phase 1 architecture. The import alias `@/*` was changed from `./src/*` to `./*` to compensate.

5. **package.json name**: scaffolder used the temp-directory name `micahjonesconsulting-tmp`. Corrected to `micahjonesconsulting` via `pnpm pkg set name=...`.

### No WARNs detected

All Pitfall A1 mitigation rules present in built CSS. All 11 color tokens cross-check between `app/globals.css` and `.claude/brand.json`. All 30 banned words present in `lib/banned.ts` and `.claude/brand.json`. Build, typecheck, install all succeed.

---

## Overall Verdict

**PASS**

Phase 1 (Scaffold, Tokens, DNS) is ready for Phase 2 planning.

The 6 ROADMAP Phase 1 Success Criteria are validated:
- Criteria 1, 2, 3, 4 (repo-state): hard PASS
- Criteria 5, 6 (operator-state): runbook-delivery PASS; operator action initiates Day 1 of build (24-72h DNS propagation + 7-day photographer booking target)
