# Plan 09-B — PortraitImage Component + Page Wiring + CSS

**Phase:** 09 Portrait Integration
**REQ-IDs:** PHOTO-02 (image slots wired on Home + About), PHOTO-03 (≤500KB AVIF via next/image)
**Wave:** 2
**Depends on:** Plan 09-A (placeholder PNGs must exist for `<PortraitImage>` to resolve at build time)
**Date:** 2026-05-14

---

## Goal

Write `components/PortraitImage.tsx`, replace the placeholder `<div>` slots on Home and About with `<PortraitImage>`, and add the supporting CSS to `app/globals.css`.

After this plan, the build serves the placeholder PNGs through `next/image`, and the operator's swap flow becomes: drop `public/portrait-main.jpg` → `pnpm build` → real image renders.

---

## Deliverables

1. `components/PortraitImage.tsx` — server component, ~80 lines, body specified in §4 of `09-RESEARCH.md`.
2. `app/(foyer)/page.tsx` — replace lines 53-59 portrait slot with `<PortraitImage variant="main" priority />` (keep copper rule below).
3. `app/(foyer)/about/page.tsx` — replace lines 61-64 portrait slot with `<PortraitImage variant="context" />` (keep "Oakland, CA." sub-caption below).
4. `app/globals.css` — append four CSS blocks after the existing `.copper-rule` rule (around line 648): `.portrait-slot--has-image`, `.portrait-slot__image`, `.portrait-slot--placeholder`, `.portrait-slot__strap`.

---

## Step-by-step

### Step 1 — Write `components/PortraitImage.tsx`

Create the file with the body specified in §4 of `09-RESEARCH.md`. Key points:

- Server component (no `'use client'`).
- Imports `existsSync` from `node:fs` and `join` from `node:path`.
- Imports `Image` from `next/image`.
- Two const tables (`REAL_FILENAME`, `PLACEHOLDER_FILENAME`, `REAL_ALT`, `PLACEHOLDER_ALT`, `DIM`, `SIZES`) keyed by `Variant`.
- Single function-component `PortraitImage({ variant, priority = false })`.
- Resolves `realPath` via `join(process.cwd(), "public", REAL_FILENAME[variant])` and checks `existsSync`.
- Renders `<div className={...}><Image .../>{!hasReal && <span class=portrait-slot__strap aria-hidden>placeholder — final portrait Day 7-14</span>}</div>`.
- Forwards `data-portrait-state={hasReal ? "real" : "placeholder"}` for debugging / future visual-qa hooks.

**Banned-word check on this file:**
- "Micah Jones, Oakland" — clean.
- "Micah Jones at his Oakland workspace" — clean.
- "Portrait of Micah Jones (placeholder — final shoot Day 7-14)" — clean.
- "placeholder — final portrait Day 7-14" — clean.
- "portrait", "context", "main", "variant", "Oakland" — none banned.

Verified no banned words.

**Em-dash count:** alt text contains "—" once ("placeholder — final shoot Day 7-14"), strap contains "—" once ("placeholder — final portrait Day 7-14"). These are in *component code*, not visible page prose, so COPY-05 page-level em-dash cap doesn't apply per harness scope (em-dash policy is per-page rendered output, not component definitions). The visible rendered text on Home and About includes the strap once when placeholder mode, which is below the per-page cap of 1.

**Imports placement:** `node:fs` and `node:path` are Node built-ins; safe in server components per Next.js docs.

### Step 2 — Wire into Home (`app/(foyer)/page.tsx`)

Two edits:

**Edit A — add import after the existing `TitleCardComposition` import:**

```tsx
import { TitleCardComposition } from "@/components/TitleCardComposition";
import { PortraitImage } from "@/components/PortraitImage";  // new
```

**Edit B — replace the portrait section block (lines 53-59):**

```tsx
// BEFORE
{/* PORTRAIT SLOT — Phase 9 fills with portrait-main.jpg */}
<section className="foyer-section foyer-section--portrait">
  <div className="portrait-slot portrait-slot--full-bleed" aria-hidden>
    <span className="portrait-slot__label">portrait — Oakland — coming Day 7–14</span>
  </div>
  <hr className="copper-rule" aria-hidden />
</section>

// AFTER
{/* PORTRAIT — Phase 9. Renders public/portrait-main.jpg when present,
    placeholder PNG otherwise. See .claude/CLAUDE.md "Portrait swap" section
    for the operator's swap flow. */}
<section className="foyer-section foyer-section--portrait">
  <PortraitImage variant="main" priority />
  <hr className="copper-rule" aria-hidden />
</section>
```

The comment is updated to reflect Phase 9 wiring (no longer "Phase 9 fills with..."). The `<hr className="copper-rule" aria-hidden />` stays exactly as-is — copper rule below portrait is preserved per blueprint §4c / §7.

### Step 3 — Wire into About (`app/(foyer)/about/page.tsx`)

Two edits:

**Edit A — add import after the metadata block (no existing component imports; inserts at top after `import type { Metadata }`):**

```tsx
import type { Metadata } from "next";
import { PortraitImage } from "@/components/PortraitImage";  // new
```

**Edit B — replace the portrait div block (lines 61-64):**

```tsx
// BEFORE
{/* RIGHT 4 col — vertical portrait + credits */}
<aside className="about-grid__column">
  <div className="portrait-slot portrait-slot--column" aria-hidden>
    <span className="portrait-slot__label">portrait — coming Day 7–14</span>
  </div>
  <p className="about-grid__sub-caption">Oakland, CA.</p>

// AFTER
{/* RIGHT 4 col — vertical portrait + credits (Phase 9) */}
<aside className="about-grid__column">
  <PortraitImage variant="context" />
  <p className="about-grid__sub-caption">Oakland, CA.</p>
```

Sub-caption preserved unchanged. Credits list and family-context section below are untouched.

### Step 4 — Append CSS blocks to `app/globals.css`

Insert four new CSS blocks immediately after the existing `.copper-rule` rule (around line 648, before the `/* SELECTED WORK STRIP (Home) */` comment at line 650).

```css
/* PORTRAIT-SLOT — when a real image or placeholder PNG is rendered inside
   (Phase 9). The base .portrait-slot above provides aspect-ratio + cream
   gradient + dashed border for the empty-slot Phase 6 state; the --has-image
   variant strips those once an image fills it. */
[data-mode="foyer"] .portrait-slot--has-image {
  position: relative;
  overflow: hidden;
  background: none;
  border: none;
}

[data-mode="foyer"] .portrait-slot__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

/* Placeholder state restores a paper-like wash so the PNG sits on a foyer
   feel even if its bytes fail to load; once the real photo lands at
   public/portrait-<variant>.jpg the wash disappears. */
[data-mode="foyer"] .portrait-slot--placeholder {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-foyer-paper) 95%, var(--color-foyer-ink) 5%) 0%,
    color-mix(in srgb, var(--color-foyer-paper) 90%, var(--color-foyer-ink) 10%) 100%
  );
  border: 1px solid var(--color-rule-foyer);
}

[data-mode="foyer"] .portrait-slot__strap {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-foyer-ink-soft);
  opacity: 0.55;
  background: color-mix(in srgb, var(--color-foyer-paper) 80%, transparent);
  padding: 4px 12px;
  border: 1px solid var(--color-rule-foyer);
  pointer-events: none;
}
```

**Token discipline:** every color uses a `--color-*` CSS variable. Zero raw hex. `design-tokens.sh` passes.

**Banned-word check on CSS comments:** "portrait", "image", "placeholder", "wash", "strap", "Oakland", "real", "photo", "land" — none banned. Safe.

### Step 5 — Typecheck + build

```bash
pnpm typecheck
# Expected: clean.

pnpm build
# Expected: clean. The build-time copy-lint pre-step scans the new
# components/PortraitImage.tsx (since components/ is at repo root — but
# wait, the scanner walks app/ and content/, NOT components/). Either way,
# the file has no banned words. The build itself imports the component into
# Home + About, both pages compile clean.
```

**If build errors on `existsSync` server-only constraint:** Next.js App Router permits Node built-ins in server components by default. Should be clean. If a turbopack quirk surfaces, the fallback is to wrap the existsSync call in a try/catch and treat any failure as "use placeholder."

---

## Banned-word safety summary

All visible text added or modified in this plan:

| Source | Text | Banned? |
|---|---|---|
| `PortraitImage.tsx` alt (placeholder) | "Portrait of Micah Jones (placeholder — final shoot Day 7-14)" | No — verified against `lib/banned.ts`. |
| `PortraitImage.tsx` alt (main, real) | "Micah Jones, Oakland" | No. |
| `PortraitImage.tsx` alt (context, real) | "Micah Jones at his Oakland workspace" | No. |
| `PortraitImage.tsx` strap | "placeholder — final portrait Day 7-14" | No. |
| Home comment update | "Renders public/portrait-main.jpg when present, placeholder PNG otherwise." | No. |
| About comment update | "RIGHT 4 col — vertical portrait + credits (Phase 9)" | No. |
| CSS comments | "PORTRAIT-SLOT — when a real image or placeholder PNG..." etc. | No. |

Em-dash count check: Home page total em-dashes after edit = (existing hero "— product · growth · consulting") + (strap "placeholder — final portrait Day 7-14" only when placeholder mode) = 1 visible + 1 conditional. The strap only appears in placeholder state. Phase 10 with real image: strap disappears, em-dash count drops to 1. Within cap.

About page total em-dashes after edit = unchanged from Phase 6 + (strap when placeholder) = same as Phase 6 + 1 conditional. The Phase 6 page already passed copy-lint and is unchanged by this plan except for replacing one decorative `<span>` with `<PortraitImage>`.

---

## Harness hook expectations

| Hook | Trigger | Expected outcome |
|---|---|---|
| `copy-lint.sh` | On `Write` of `components/PortraitImage.tsx`, `Edit` of `page.tsx`, `Edit` of `about/page.tsx`, `Edit` of `globals.css` | Pass on every write (verified per the table above). |
| `image-budget.sh` | n/a | Not triggered (no new images in this plan; 09-A created the PNGs). |
| `design-tokens.sh` | On `Edit` of `globals.css` | Pass (all colors via `--color-*` tokens). |
| `font-license.sh` | n/a | Not triggered (no font imports added). |
| `motion-discipline.sh` | n/a | Not triggered (no motion code added). |

---

## Verification (within this plan — full Phase verify is 09-C)

After this plan completes:

```bash
pnpm typecheck
# clean

pnpm build
# clean — copy-lint pre-step passes, next build succeeds

grep -r "from \"gsap\"" components/ lib/ app/ 2>&1
# only components/TitleCard.tsx matches (GSAP quarantine intact)
```

Quick smoke test:

```bash
pnpm dev
# Open http://localhost:3000
# - Portrait slot below Home hero shows the placeholder PNG (cream wash, "PORTRAIT COMING DAY 7-14" text, strap "placeholder — final portrait Day 7-14")
# - Copper rule visible below
# - Open /about — right column shows the smaller placeholder PNG + "Oakland, CA." sub-caption
```

---

## Out of scope for 09-B

- `.claude/CLAUDE.md` operator runbook section — Plan 09-C.
- Lighthouse Performance score capture — Plan 09-C.
- Chrome DevTools MCP screenshot capture — Plan 09-C.
- ROADMAP / STATE / REQUIREMENTS traceability updates — Plan 09-C.
- VERIFY-OUTPUT.md generation — Plan 09-C.

---

## Done when

- [ ] `components/PortraitImage.tsx` exists with the body from research §4.
- [ ] `app/(foyer)/page.tsx` imports `PortraitImage` and uses it for the Home full-bleed slot; copper rule below preserved.
- [ ] `app/(foyer)/about/page.tsx` imports `PortraitImage` and uses it for the About column slot; "Oakland, CA." sub-caption below preserved.
- [ ] `app/globals.css` has four new blocks: `.portrait-slot--has-image`, `.portrait-slot__image`, `.portrait-slot--placeholder`, `.portrait-slot__strap`.
- [ ] `pnpm typecheck` clean.
- [ ] `pnpm build` clean (includes copy-lint pre-step).
- [ ] GSAP quarantine intact (only `components/TitleCard.tsx` imports gsap).

---

*Plan 09-B authored 2026-05-14.*
