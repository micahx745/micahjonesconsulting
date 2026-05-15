# Plan 09-C — Operator Runbook + Phase Verification

**Phase:** 09 Portrait Integration
**REQ-IDs:** PHOTO-02 + PHOTO-03 traceability close-out; success-criteria evidence.
**Wave:** 3
**Depends on:** Plan 09-B (component + wiring + CSS must exist before verification reads them)
**Date:** 2026-05-14

---

## Goal

Append the "Portrait swap" operator runbook to `.claude/CLAUDE.md` so the swap flow is documented inline with project memory, then run the full Phase 9 verification matrix and produce `09-VERIFY-OUTPUT.md`. Finally, update ROADMAP / STATE / REQUIREMENTS traceability marking PHOTO-02 and PHOTO-03 as complete (with the note that the real-image swap is operator action).

---

## Deliverables

1. `.claude/CLAUDE.md` — new H2 section "Portrait swap (when real photos arrive)" inserted before "Definition of done".
2. `.planning/phases/09-portrait-integration/09-VERIFY-OUTPUT.md` — verification artifact with verdict.
3. `.planning/phases/09-portrait-integration/verification-artifacts/` — directory containing the Chrome DevTools MCP screenshots (Home @ 1440, Home @ 390, About @ 1440, About @ 390) + optional Lighthouse report.
4. `.planning/ROADMAP.md` — Phase 9 marked complete; Plans table populated (3/3 complete); Progress table cell updated.
5. `.planning/STATE.md` — milestone progress updated to 9/10; STATE accumulated context appended.
6. `.planning/REQUIREMENTS.md` — Traceability table: PHOTO-02 + PHOTO-03 changed from "Pending" to "Complete (with placeholders pending real-photo swap)".
7. Commit: `docs(phase-9): complete phase execution`.

---

## Step-by-step

### Step 1 — Append "Portrait swap" section to `.claude/CLAUDE.md`

Insert immediately before `## Definition of done` (line 88):

```markdown
## Portrait swap (when real photos arrive)

The site ships with two placeholder PNGs at `public/portrait-main.placeholder.png` and
`public/portrait-context.placeholder.png` (produced by `scripts/generate-placeholders.mjs`).
When the real Oakland portraits land from the Phase 1 booking
(see `docs/PORTRAIT-OUTREACH.md`), the swap is three steps:

1. **Save the main vertical portrait as** `public/portrait-main.jpg` (2x retina source,
   ≥1200×1500 ideal, any JPEG/PNG; `next/image` AVIF-converts at request time, ≤500KB
   enforced by harness `image-budget.sh`).
2. **Save the secondary workspace shot as** `public/portrait-context.jpg` (same constraints).
3. **Build and deploy:** `pnpm build && vercel --prod`.

The `<PortraitImage>` server component (`components/PortraitImage.tsx`) checks for
`public/portrait-<variant>.jpg` at build time. If present, it serves the real image with
the real-image alt text ("Micah Jones, Oakland" on Home; "Micah Jones at his Oakland workspace"
on About). If absent, it serves the placeholder PNG with the "placeholder — final portrait
Day 7-14" strap.

**No code changes are required.** The operator's flow is purely file drop + build.

Constraints:
- 2x retina source. JPEG or PNG (`next/image` converts to AVIF/WebP automatically).
- ≤500KB after AVIF conversion (harness `image-budget.sh` enforces at write boundary).
- 4:5 vertical aspect ratio recommended (matches `.portrait-slot--column` exactly and
  crops gracefully in `.portrait-slot--full-bleed` via `object-fit: cover`).

To regenerate placeholders (if they're ever lost or need re-tuning):

```bash
node scripts/generate-placeholders.mjs
```
```

**Banned-word check on inserted text:** "portrait", "swap", "real", "photo", "operator", "Oakland", "shoot", "workspace", "build", "deploy", "framework", "retina", "cap" — none banned. "—" appears in the strap quote (one em-dash, quoted). Safe.

### Step 2 — Run the verification matrix

#### 2a — Static checks

```bash
pnpm typecheck
# Expected: zero errors.

pnpm build
# Expected: copy-lint pre-step passes; next build succeeds; .next/static populated.
```

Record output for `09-VERIFY-OUTPUT.md`.

#### 2b — File-presence checks

```bash
ls -la public/portrait-main.placeholder.png public/portrait-context.placeholder.png
# Expected: both exist, ≤500KB.

ls -la components/PortraitImage.tsx
# Expected: exists, ~80 lines.

ls -la scripts/generate-placeholders.mjs
# Expected: exists.
```

Record sizes and existence.

#### 2c — GSAP quarantine check

```bash
grep -r "from \"gsap\"" components/ lib/ app/ 2>&1
```

Expected: only `components/TitleCard.tsx` matches. Record output.

#### 2d — Visual verification via Chrome DevTools MCP

Start the dev server:

```bash
pnpm dev
# wait for "Ready in" then continue
```

Use `mcp__chrome-devtools__new_page` + `mcp__chrome-devtools__navigate_page` + `mcp__chrome-devtools__resize_page` + `mcp__chrome-devtools__take_screenshot` to capture:

| Screenshot | Route | Viewport | Expected |
|---|---|---|---|
| `home-1440.png` | `/` | 1440×900 | Portrait full-bleed below hero. Cream wash with "PORTRAIT COMING DAY 7-14" overlay. Copper rule below. Strap "placeholder — final portrait Day 7-14" near the bottom of the portrait. |
| `home-390.png` | `/` | 390×844 | Portrait reflows to 16:9 ratio (per `.portrait-slot--full-bleed` mobile rule). No horizontal scroll. Copper rule visible. |
| `about-1440.png` | `/about` | 1440×900 | Two-column grid. Right column has portrait at 4:5, "Oakland, CA." sub-caption below in italic Source Serif 4, credits list below that. |
| `about-390.png` | `/about` | 390×844 | Grid stacks. Portrait below long-form text, no horizontal scroll. Sub-caption + credits stack vertically. |

Save screenshots to `.planning/phases/09-portrait-integration/verification-artifacts/`.

#### 2e — Lighthouse informational pass

Use Chrome DevTools MCP `mcp__chrome-devtools__lighthouse_audit` on `/` with mobile preset (slow 4G simulated).

Record:
- Performance score (0-100).
- LCP value (ms).
- INP value (ms) if available.
- CLS value.

**This is informational only.** With a ~3KB PNG placeholder, LCP will be artificially fast. The binding LCP ≤1.8s validation happens in Phase 10 with the real portrait. Note this clearly in `09-VERIFY-OUTPUT.md`.

#### 2f — Hook regression check

```bash
ls -la public/
# verify both .placeholder.png files plus any operator-dropped real files
```

If an operator has dropped a real `portrait-main.jpg` between when 09-A ran and 09-C verifies, this is the expected path — the `<PortraitImage>` component will serve the real image without code change. Record observation in the verify doc either way.

### Step 3 — Write `09-VERIFY-OUTPUT.md`

Use the same skeleton as the Phase 8 verify doc (`.planning/phases/08-case-studies/08-VERIFY-OUTPUT.md`). Sections:

- **Verdict:** PASS / FAIL with one-sentence rationale.
- **REQ-ID coverage:**
  - PHOTO-02 — Complete (with placeholder; operator swap pending real photos).
  - PHOTO-03 — Complete (both placeholder PNGs ≤500KB; `next/image` AVIF pipeline wired and will engage automatically on real-photo swap).
- **Success-criteria evidence (4/4):**
  1. portrait-main slot exists at 2x retina (1200×1500), ≤500KB (~3KB actual). Visible Home full-bleed, copper rule below. Real image swaps in automatically when operator drops `public/portrait-main.jpg`.
  2. portrait-context slot exists at 2x retina (900×1125), ≤500KB (~2KB actual). Integrated About right column, sub-caption "Oakland, CA." preserved.
  3. Home portrait has `priority` on `<Image>`. LCP measurement with placeholder is informational (Phase 10 with real image is binding). Lighthouse Performance score captured.
  4. image-budget.sh passed (both PNGs well under cap). No horizontal scroll at 390px (verified via MCP screenshots).
- **Static checks:** typecheck output, build output.
- **Visual artifacts:** 4 MCP screenshots in `verification-artifacts/`.
- **Lighthouse capture:** scores (informational).
- **GSAP quarantine:** confirmed.
- **Operator runbook:** confirmed in `.claude/CLAUDE.md` lines [N-M].
- **Notes:**
  - Real photos are operator-side per Phase 1 PORTRAIT-OUTREACH.md.
  - Swap flow is documented; zero-code: drop file → build → deploy.
  - Phase 10 will re-measure LCP with real image.

### Step 4 — Update `.planning/ROADMAP.md`

Edit two locations:

**4a — Phase 9 line in the top-of-file phase list (line 25):**

```markdown
- [x] **Phase 9: Portrait Integration** ✓ 2026-05-14 - Placeholder PNGs generated; `<PortraitImage>` server component reads `public/portrait-<variant>.jpg` at build with placeholder fallback. Operator swap = drop real file → `pnpm build && vercel --prod`. Both placeholders <10KB; PHOTO-02 + PHOTO-03 wired with `next/image` AVIF pipeline.
```

**4b — Phase 9 Plans block + Progress table:**

Add the three plans under Phase 9 in the Phase Details section, and update the Progress row to `3/3 | Complete | 2026-05-14`.

### Step 5 — Update `.planning/STATE.md`

Edit the YAML frontmatter:

```yaml
progress:
  total_phases: 10
  completed_phases: 9  # was 8
  total_plans: 50      # was 47
  completed_plans: 50  # was 47
```

Update `last_updated` to the current timestamp. Update the "Current focus" line and the "Current Position" / "Last activity" / "Recent Trend" sections to reflect Phase 9 completion. Append a new "Phase 9" decision bullet under "Decisions" capturing: placeholder strategy, fs.existsSync fallback pattern, operator runbook delivered.

### Step 6 — Update `.planning/REQUIREMENTS.md` traceability

Edit the Traceability table rows for PHOTO-02 and PHOTO-03 (lines 338-339):

```markdown
| PHOTO-02 | Phase 9 | Complete (placeholder; real-photo swap is operator action — see .claude/CLAUDE.md "Portrait swap") |
| PHOTO-03 | Phase 9 | Complete (next/image AVIF pipeline wired; placeholder PNGs ≤10KB; cap enforced by harness image-budget.sh) |
```

### Step 7 — Final commit

```bash
git add -A
git status   # review staged changes
git diff --staged --stat   # review file footprint

git commit -m "docs(phase-9): complete phase execution"
```

Use a multi-line message via heredoc as the project convention requires.

---

## Banned-word safety summary

| Source | Notable text | Banned? |
|---|---|---|
| `.claude/CLAUDE.md` "Portrait swap" section | "portrait", "swap", "real", "photo", "Oakland", "shoot", "workspace", "operator", "framework", "cap", "deploy" | None banned. |
| `09-VERIFY-OUTPUT.md` | "Complete", "portrait", "operator", "swap", "real", "informational", "binding" | None banned. |
| `ROADMAP.md` Phase 9 line | "Placeholder", "PNG", "operator", "swap" | None banned. |
| `STATE.md` decision bullet | "placeholder", "fallback", "runbook", "operator" | None banned. |

---

## Harness hook expectations

| Hook | Trigger | Expected outcome |
|---|---|---|
| `copy-lint.sh` | On Edit of `.claude/CLAUDE.md`, `ROADMAP.md`, `STATE.md`, `REQUIREMENTS.md`, Write of `09-VERIFY-OUTPUT.md` | Pass (no banned words). |
| `image-budget.sh` | On Write of screenshots to `verification-artifacts/` | Screenshots go to `.planning/phases/...`, NOT `public/`. Hook scope (line 6 of `image-budget.sh`) only matches `public/*` paths. Safe. |
| All others | n/a | Not triggered. |

---

## Verification

After this plan completes, the entire Phase 9 is closed. Quick post-check:

```bash
git log --oneline | head -3
# Expected:
#   <hash> docs(phase-9): complete phase execution
#   <hash> docs(phase-9): plans
#   <hash> docs(phase-9): research

ls .planning/phases/09-portrait-integration/
# Expected files:
#   09-RESEARCH.md
#   09-A-placeholders-PLAN.md
#   09-B-component-wiring-PLAN.md
#   09-C-runbook-verify-PLAN.md
#   09-VERIFY-OUTPUT.md
#   verification-artifacts/
```

---

## Out of scope for 09-C

- Real-image swap and live deploy — operator action; documented for them in `.claude/CLAUDE.md`.
- Phase 10 hardening pass (perf, a11y, SEO, OG, prod deploy) — separate phase.
- Replacing the placeholder generation script with a richer fallback — not needed.

---

## Done when

- [ ] `.claude/CLAUDE.md` has the new "Portrait swap" section.
- [ ] `09-VERIFY-OUTPUT.md` written with verdict PASS.
- [ ] 4 MCP screenshots captured in `verification-artifacts/`.
- [ ] Lighthouse score captured (informational).
- [ ] `pnpm typecheck && pnpm build` clean.
- [ ] GSAP quarantine confirmed.
- [ ] `ROADMAP.md` updated: Phase 9 row complete, Progress row 3/3.
- [ ] `STATE.md` updated: 9/10 phases complete, frontmatter incremented, decisions appended.
- [ ] `REQUIREMENTS.md` traceability updated for PHOTO-02 + PHOTO-03.
- [ ] Final commit `docs(phase-9): complete phase execution` lands.

---

*Plan 09-C authored 2026-05-14.*
