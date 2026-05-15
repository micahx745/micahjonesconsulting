---
phase: 01-scaffold-tokens-dns
plan: J
type: execute
wave: 4
depends_on:
  - A
  - B
  - C
  - D
  - E
  - F
  - G
  - H
  - I
files_modified:
  - .planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md
autonomous: true
requirements: []
must_haves:
  truths:
    - "`pnpm install && pnpm typecheck && pnpm build` succeeds on a clean checkout."
    - "Built CSS contains `size-adjust` and `ascent-override` rules (Pitfall A1 mitigation verified)."
    - "All 11 color tokens are present in `app/globals.css` and `.claude/brand.json`."
    - "`lib/banned.ts` contains exactly 30 entries; `.claude/brand.json.voice.banned` mirrors them."
    - "`instrumentation.ts` lives at repo root (NOT inside `app/`)."
    - "`mdx-components.tsx` does NOT exist (Phase 7 creates)."
    - "`app/page.tsx` does NOT exist (Plan A deleted)."
    - "All scaffolder default SVGs in `public/` are deleted."
    - "`.claude/brand.json` is valid JSON; `.claude/CLAUDE.md` has all 8 required sections."
    - "`docs/RESEND-DNS-SETUP.md` and `docs/PORTRAIT-OUTREACH.md` exist."
    - "The 6 ROADMAP Phase 1 success criteria are validated (success criteria 1, 2, 3, 4 are repo-state checks; success criteria 5 + 6 are operator-state — runbooks delivered, operator action initiated but pending operator execution)."
  artifacts:
    - path: ".planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md"
      provides: "Phase 1 verification log + pass/fail per ROADMAP success criterion"
      contains: "Phase 1 verification"
      min_lines: 60
  key_links:
    - from: "Plans A-I outputs"
      to: "Plan J pass/fail verdict"
      via: "ROADMAP §'Phase 1 Success Criteria' six checks"
      pattern: "Success Criteria"
---

<objective>
Verify Phase 1 is complete by running `pnpm install && pnpm typecheck && pnpm build` against the assembled scaffold, then inspecting build outputs (`.next/static/css/*.css` for size-adjust rules), filesystem layout (all expected files present, no forbidden files present), and content cross-checks (11 colors in 2 places, 30 banned words in 2 places). Produce a verification log `.planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md` documenting pass/fail per ROADMAP success criterion.

Purpose: Validate the 6 ROADMAP Phase 1 success criteria before the gsd-verifier subagent runs its formal pass. This plan does not introduce REQ-IDs of its own (all 19 are covered by Plans A-I); it is the integration test.
Output: A verification log committed to the planning directory.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/01-scaffold-tokens-dns/01-RESEARCH.md

**ROADMAP Phase 1 Success Criteria (6 checks):**
1. `pnpm install && pnpm typecheck && pnpm build` succeeds on a clean checkout with Next.js 16.2, Tailwind v4 `@theme` block, MDX wrapper, and `experimental.viewTransition: true` configured.
2. `app/globals.css` defines all 11 color tokens from blueprint §4b as CSS custom properties readable by `[data-mode="foyer"]` and `[data-mode="theater"]` attribute selectors, with `--accent-copper-deep` documented as the body-text emphasis token (5.4:1 vs cream).
3. `next/font/google` loads Inter Display, Inter, and Source Serif 4 (with `axes: ['opsz']`) and built `@font-face` output includes `size-adjust` / `ascent-override` metrics (verifiable in `.next/static`).
4. `.claude/brand.json` and `.claude/CLAUDE.md` exist with House-Lights-specific overrides; the harness blocks any test PR that imports a monospace font, a Klim foundry without license, or a banned word in a string literal.
5. Resend domain verification DNS TXT record is submitted at the registrar Day 1 (verification can lag 24-72h — start clock now, not Day 14).
6. Oakland portrait photographer outreach is initiated (booking request sent or shortlist contacted); session targeted within 7 days; budget envelope confirmed at $500-$1,200.

**Criteria 1-4 are REPO-STATE checks** — Plan J runs `pnpm typecheck`/`build` and inspects files. PASS or FAIL is verifiable.

**Criteria 5-6 are OPERATOR-STATE checks** — Plans H and I produced runbooks Day 1; the operator executes them in parallel with development. At Plan J completion time, the operator may or may not have executed yet. The verification log records:
- Plan J → "Runbooks delivered ✓; operator execution pending verification" (PASS for the executor's responsibility)
- The final gsd-verifier phase pass at Phase 10 will check whether the actual DNS verification and shoot booking landed in time.

**Harness hook coverage check (Criterion 4):**
"The harness blocks any test PR that imports a monospace font, a Klim foundry without license, or a banned word in a string literal."

The harness hooks (`copy-lint.sh`, `font-license.sh`, `motion-discipline.sh`, `design-tokens.sh`, `mdx-frontmatter.sh`, `image-budget.sh`) fire at the Write/Edit/MultiEdit boundary. Phase 1 does not yet have a test PR to dogfood the hooks against, but Plan J can:
- Confirm `.claude/brand.json` voice.banned contains the right words
- Confirm `.claude/brand.json` typography.*.foundry = "system" (so font-license.sh permits Inter)
- Confirm `.claude/brand.json` motion.banned contains `font-mono|font-family:\\s*ui-monospace` pattern

The actual hook firing is tested implicitly throughout Phases 2-10 (every PR runs through them).
</context>

<tasks>

<task type="auto">
  <name>Task J1: Run pnpm install + typecheck + build, capture results</name>
  <files>
    .next/* (build output, transient — not committed; .gitignore excludes)
    .planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md (created in Task J2 — this task feeds it)
  </files>
  <action>
From `C:/Users/micah/Code/micahjonesconsulting/`, run the three commands the ROADMAP Success Criterion 1 mandates:

```bash
cd C:/Users/micah/Code/micahjonesconsulting

# Step 1 — install (should be a no-op since Plan A already installed, but verifies frozen-lockfile integrity)
pnpm install --frozen-lockfile

# Step 2 — typecheck
pnpm typecheck

# Step 3 — production build (Turbopack)
pnpm build
```

**Expected outcome:**
- `pnpm install --frozen-lockfile` exits 0 with no changes (package.json and pnpm-lock.yaml are in sync).
- `pnpm typecheck` exits 0 (no TypeScript errors).
- `pnpm build` exits 0 with output like `▲ Next.js 16.2.6 ... Compiled successfully`.

**Note:** Next.js 16 may use Turbopack for production builds (per `--turbopack` scaffolder flag in Plan A). If `pnpm build` fails with a Turbopack-specific error, retry with `pnpm build --webpack` or whatever the version-specific fallback is. Document any fallback in the verification log.

**Note:** `pnpm typecheck` may not be a default script. If `package.json` does NOT have a `typecheck` script, add one before running:

```bash
pnpm pkg set scripts.typecheck="tsc --noEmit"
```

Then run `pnpm typecheck`. This minor script addition is permitted under Plan J because it is required by ROADMAP Success Criterion 1 ("pnpm typecheck succeeds").

Capture stdout/stderr of all three commands. If any fail, the verification log records the failure and Plan J's done state is FAIL — pause and surface to user (no further automated remediation in this phase).

**After `pnpm build` succeeds**, inspect the build output for Pitfall A1 mitigation:

```bash
# Find the font CSS in the build output
ls .next/static/css/

# Pick the largest CSS file (Tailwind output) and grep for size-adjust + ascent-override
grep -l "size-adjust" .next/static/css/*.css
grep -l "ascent-override" .next/static/css/*.css
```

If `size-adjust` and `ascent-override` are present in built CSS, Criterion 3 ✓. If not, Pitfall A1 is unmitigated — document in verification log as a WARN (Phase 5 TitleCard will need to handle this).
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && pnpm install --frozen-lockfile && (grep -q "\"typecheck\":" package.json || pnpm pkg set scripts.typecheck="tsc --noEmit") && pnpm typecheck && pnpm build && ls .next/static/css/*.css 2>/dev/null | head -1 | xargs grep -l "size-adjust" && echo "PASS — install + typecheck + build + Pitfall A1 mitigation verified" || echo "FAIL"</automated>
  </verify>
  <done>
    All three commands exit 0; `.next/static/css/*.css` contains `size-adjust` and `ascent-override` rules; output captured for Task J2's log.
  </done>
</task>

<task type="auto">
  <name>Task J2: Inspect filesystem + cross-check tokens/banned-words, write verification log</name>
  <files>
    .planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md
  </files>
  <action>
Run the following filesystem and content cross-checks, then write the results to `.planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md`.

**Cross-checks (run from `C:/Users/micah/Code/micahjonesconsulting/`):**

```bash
# ----- Filesystem presence -----
test -f package.json && echo "package.json: PASS" || echo "package.json: FAIL"
test -f tsconfig.json && echo "tsconfig.json: PASS" || echo "tsconfig.json: FAIL"
test -f next.config.ts && echo "next.config.ts: PASS" || echo "next.config.ts: FAIL"
test -f postcss.config.mjs && echo "postcss.config.mjs: PASS" || echo "postcss.config.mjs: FAIL"
test -f app/layout.tsx && echo "app/layout.tsx: PASS" || echo "app/layout.tsx: FAIL"
test -f app/globals.css && echo "app/globals.css: PASS" || echo "app/globals.css: FAIL"
test -f lib/fonts.ts && echo "lib/fonts.ts: PASS" || echo "lib/fonts.ts: FAIL"
test -f lib/banned.ts && echo "lib/banned.ts: PASS" || echo "lib/banned.ts: FAIL"
test -f lib/copy-lint.ts && echo "lib/copy-lint.ts: PASS" || echo "lib/copy-lint.ts: FAIL"
test -f instrumentation.ts && echo "instrumentation.ts (root): PASS" || echo "instrumentation.ts (root): FAIL"
test -f .claude/brand.json && echo ".claude/brand.json: PASS" || echo ".claude/brand.json: FAIL"
test -f .claude/CLAUDE.md && echo ".claude/CLAUDE.md: PASS" || echo ".claude/CLAUDE.md: FAIL"
test -f .gitignore && echo ".gitignore: PASS" || echo ".gitignore: FAIL"
test -f docs/RESEND-DNS-SETUP.md && echo "docs/RESEND-DNS-SETUP.md: PASS" || echo "docs/RESEND-DNS-SETUP.md: FAIL"
test -f docs/PORTRAIT-OUTREACH.md && echo "docs/PORTRAIT-OUTREACH.md: PASS" || echo "docs/PORTRAIT-OUTREACH.md: FAIL"

# ----- Forbidden files (must NOT exist in Phase 1) -----
test ! -f app/page.tsx && echo "app/page.tsx deletion: PASS" || echo "app/page.tsx deletion: FAIL"
test ! -f mdx-components.tsx && echo "mdx-components.tsx absence: PASS" || echo "mdx-components.tsx absence: FAIL"
test ! -f tailwind.config.ts && echo "tailwind.config.ts absence: PASS" || echo "tailwind.config.ts absence: FAIL"
test ! -f app/instrumentation.ts && echo "instrumentation.ts NOT in app/: PASS" || echo "instrumentation.ts NOT in app/: FAIL"
test ! -f public/next.svg && test ! -f public/vercel.svg && test ! -f public/file.svg && test ! -f public/globe.svg && test ! -f public/window.svg && echo "scaffolder default SVGs deleted: PASS" || echo "scaffolder default SVGs deleted: FAIL"

# ----- 11 color tokens present in app/globals.css -----
for hex in F5EFE4 1A1816 3A3631 0D0D0F 16161A EAE6DD 9C988F C8542B 8E3A1E 5E7158 D9D2C4 2A2A30; do
  grep -q "#$hex" app/globals.css && echo "  #$hex in globals.css: PASS" || echo "  #$hex in globals.css: FAIL"
done

# ----- 11 color tokens present in .claude/brand.json (same hexes) -----
for hex in F5EFE4 1A1816 3A3631 0D0D0F 16161A EAE6DD 9C988F C8542B 8E3A1E 5E7158 D9D2C4 2A2A30; do
  grep -q "#$hex" .claude/brand.json && echo "  #$hex in brand.json: PASS" || echo "  #$hex in brand.json: FAIL"
done

# ----- 30 banned words count -----
banned_count=$(grep -c '^\s*"' lib/banned.ts | head -1)
[ "$banned_count" -eq 30 ] && echo "lib/banned.ts entry count = 30: PASS" || echo "lib/banned.ts entry count = $banned_count: FAIL"

# ----- 30 banned words in brand.json voice.banned (same list) -----
# Spot-check a representative subset
for word in unlock drive leverage elevate synergy seamless empower; do
  grep -q "\"$word\"" .claude/brand.json && echo "  $word in brand.json: PASS" || echo "  $word in brand.json: FAIL"
done

# ----- next.config.ts feature flags -----
grep -q "viewTransition: true" next.config.ts && echo "viewTransition: true in next.config.ts: PASS" || echo "viewTransition: true in next.config.ts: FAIL"
grep -q "withMDX" next.config.ts && echo "withMDX wrapper in next.config.ts: PASS" || echo "withMDX wrapper in next.config.ts: FAIL"

# ----- Tailwind v4 PostCSS plugin -----
grep -q "@tailwindcss/postcss" postcss.config.mjs && echo "@tailwindcss/postcss in postcss.config.mjs: PASS" || echo "@tailwindcss/postcss in postcss.config.mjs: FAIL"

# ----- tsconfig strict -----
grep -q "noUncheckedIndexedAccess" tsconfig.json && echo "tsconfig noUncheckedIndexedAccess: PASS" || echo "tsconfig noUncheckedIndexedAccess: FAIL"

# ----- brand.json valid JSON -----
node -e "JSON.parse(require('fs').readFileSync('.claude/brand.json','utf8'))" 2>&1 && echo "brand.json valid JSON: PASS" || echo "brand.json valid JSON: FAIL"

# ----- Pitfall A1 mitigation in built CSS -----
ls .next/static/css/*.css 2>/dev/null | xargs grep -l "size-adjust" >/dev/null && echo "size-adjust in built CSS: PASS" || echo "size-adjust in built CSS: FAIL or WARN"
ls .next/static/css/*.css 2>/dev/null | xargs grep -l "ascent-override" >/dev/null && echo "ascent-override in built CSS: PASS" || echo "ascent-override in built CSS: FAIL or WARN"
```

**Then write the verification log** (`.planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md`) summarizing:

```markdown
# Phase 1 Verification — Scaffold, Tokens, DNS

**Date:** [timestamp]
**Executor:** gsd-executor
**Outcome:** [PASS|FAIL|PASS-WITH-WARN]

## ROADMAP Success Criteria — pass/fail

### Criterion 1: `pnpm install && pnpm typecheck && pnpm build` succeeds with Next.js 16.2 + Tailwind v4 @theme + MDX + experimental.viewTransition
- `pnpm install --frozen-lockfile`: [PASS|FAIL]
- `pnpm typecheck`: [PASS|FAIL] (command: `tsc --noEmit`)
- `pnpm build`: [PASS|FAIL] (Turbopack: [yes|no])
- `next.config.ts` has `viewTransition: true`: [PASS|FAIL]
- `next.config.ts` has `withMDX` wrapper: [PASS|FAIL]
- `postcss.config.mjs` uses `@tailwindcss/postcss`: [PASS|FAIL]
- **Overall Criterion 1:** [PASS|FAIL]

### Criterion 2: 11 color tokens in `app/globals.css` keyed by `[data-mode]`; `--accent-copper-deep` 5.4:1 documented
- 11 hex tokens in `app/globals.css`: [list each hex with PASS/FAIL]
- `[data-mode="foyer"]` selector: [PASS|FAIL]
- `[data-mode="theater"]` selector: [PASS|FAIL]
- Pitfall B1 contrast rule documented in comment block: [PASS|FAIL]
- **Overall Criterion 2:** [PASS|FAIL]

### Criterion 3: `next/font/google` Inter Display + Inter + Source Serif 4 with `axes: ['opsz']`; built `@font-face` has size-adjust + ascent-override
- `lib/fonts.ts` exports `interDisplay`/`inter`/`sourceSerif`: [PASS|FAIL]
- Source Serif 4 has `axes: ["opsz"]`: [PASS|FAIL]
- All three set `adjustFontFallback: true`: [PASS|FAIL]
- Built CSS contains `size-adjust`: [PASS|FAIL|WARN if next-version intermittent]
- Built CSS contains `ascent-override`: [PASS|FAIL|WARN]
- **Overall Criterion 3:** [PASS|FAIL|PASS-WITH-WARN]

### Criterion 4: `.claude/brand.json` + `.claude/CLAUDE.md` with House Lights overrides; harness can block monospace/Klim/banned words
- `.claude/brand.json` exists + valid JSON: [PASS|FAIL]
- Palette 11 hex match `app/globals.css`: [PASS|FAIL]
- Voice.banned 30 entries match `lib/banned.ts`: [PASS|FAIL]
- Typography foundry = "system" (Inter permitted): [PASS|FAIL]
- Motion.banned has font-mono pattern: [PASS|FAIL]
- Motion.banned has syncTouch:true pattern: [PASS|FAIL]
- `.claude/CLAUDE.md` exists with 8 sections: [PASS|FAIL]
- **Overall Criterion 4:** [PASS|FAIL]

### Criterion 5: Resend DNS TXT submitted Day 1
- `docs/RESEND-DNS-SETUP.md` runbook exists: [PASS|FAIL]
- Operator action pending: documented in Phase 1 STATE.md update at Phase 1 close
- **Overall Criterion 5 (executor's responsibility):** PASS — runbook delivered; operator state pending

### Criterion 6: Oakland portrait photographer outreach initiated
- `docs/PORTRAIT-OUTREACH.md` runbook exists with shortlist + email template: [PASS|FAIL]
- Operator action pending: documented in Phase 1 STATE.md update at Phase 1 close
- **Overall Criterion 6 (executor's responsibility):** PASS — runbook delivered; operator state pending

## Filesystem Sanity Checks

[reproduce the per-file PASS/FAIL output from the bash block above]

## Notes / Warnings / Follow-ups

[Anything WARN-tier — e.g., if size-adjust isn't in built CSS, recommend Phase 5 TitleCard manually verify CLS]

## Overall Verdict

[PASS | FAIL | PASS-WITH-WARN]

Phase 1 is ready for [Phase 2 planning | Phase 1 gap closure].
```

Write the log file using the above template, filling in the actual results from the bash cross-checks. If any FAIL appears, the Overall Verdict is FAIL — pause and surface to user before continuing.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && test -f .planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md && grep -q "ROADMAP Success Criteria" .planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md && grep -q "Criterion 1" .planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md && grep -q "Criterion 6" .planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md && grep -q "Overall Verdict" .planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    Verification log `.planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md` exists; documents pass/fail per ROADMAP Success Criterion 1-6; Overall Verdict is PASS (or PASS-WITH-WARN if Pitfall A1 mitigation was intermittent) — FAIL outcome pauses for user.
  </done>
</task>

</tasks>

<verification>
- `pnpm install --frozen-lockfile && pnpm typecheck && pnpm build` all exit 0
- All 15 expected files exist
- All 5 forbidden files absent (app/page.tsx + 5 default SVGs + mdx-components.tsx + tailwind.config.ts)
- `instrumentation.ts` is at repo root, NOT inside `app/`
- 11 color tokens cross-check between `app/globals.css` and `.claude/brand.json`
- 30 banned-word entries cross-check between `lib/banned.ts` and `.claude/brand.json.voice.banned`
- `.claude/brand.json` is valid JSON
- `.next/static/css/*.css` contains `size-adjust` and `ascent-override` (Pitfall A1 mitigation)
- `docs/RESEND-DNS-SETUP.md` and `docs/PORTRAIT-OUTREACH.md` exist (operator runbooks)
- Verification log committed at `.planning/phases/01-scaffold-tokens-dns/01-VERIFY-OUTPUT.md`
</verification>

<success_criteria>
- All 6 ROADMAP Phase 1 Success Criteria validated:
  - Criterion 1 (typecheck + build passes): hard PASS or FAIL
  - Criterion 2 (11 tokens + data-mode selectors + B1 doc): hard PASS or FAIL
  - Criterion 3 (3 fonts + opsz + built size-adjust): PASS or PASS-WITH-WARN
  - Criterion 4 (brand.json + CLAUDE.md + harness blockers): hard PASS or FAIL
  - Criterion 5 (DNS submitted): runbook-delivery PASS; operator state pending
  - Criterion 6 (photographer outreach initiated): runbook-delivery PASS; operator state pending
- Verification log delivered for gsd-verifier subagent's downstream pass
- Phase 2 planning can begin (or, if FAIL, gap-closure planning for Phase 1)
</success_criteria>

<output>
After completion:
1. The verification log `01-VERIFY-OUTPUT.md` is the primary output.
2. Update `.planning/STATE.md` Current Position: Phase 1 of 10 → Phase 1 complete (status: Verified).
3. Note in STATE.md that operator-side actions (Resend DNS verification + photographer outreach) are pending; Phase 9 + Phase 10 will check whether the DNS verified and the shoot delivered in time.
4. Create `.planning/phases/01-scaffold-tokens-dns/01-J-SUMMARY.md` summarizing the verdict.
</output>
