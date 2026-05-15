# Phase 9 — Research: Portrait Integration

**Phase:** 09 Portrait Integration
**REQ-IDs:** PHOTO-02 (two image slots — main + context), PHOTO-03 (≤500KB AVIF, 2x retina)
**Depends on:** Phase 1 (PHOTO-01 booking initiated, runbook delivered) AND Phase 6 (portrait slots already rendered with cream/copper-rule scaffolding)
**Date:** 2026-05-14
**Scope discipline:** Phase 9 ships placeholder generation + `<Image>` wiring. The actual Oakland portrait shoot is operator-side (Phase 1's PORTRAIT-OUTREACH.md runbook). When the real photos arrive, the operator drops them at `public/portrait-main.jpg` + `public/portrait-context.jpg` and the site picks them up — zero code change.

---

## 1. Goal

Two outcomes:

1. **Placeholder generation.** Real photos don't exist yet. We ship a small Node script (`scripts/generate-placeholders.mjs`) that produces low-fidelity PNG stand-ins at `public/portrait-main.placeholder.png` (4:5 vertical) and `public/portrait-context.placeholder.png` (4:5 vertical) so the page layout works visually without real photos. Both well under 500KB (target ~3-10KB each).
2. **`<Image>` wiring.** A small server component `<PortraitImage>` reads from `/portrait-main.jpg` or `/portrait-context.jpg` when those files exist in `public/`, and falls back to the placeholder PNG otherwise. Both Home and About swap their current placeholder `<div>` slots for `<PortraitImage variant="main" priority />` and `<PortraitImage variant="context" />` respectively. Copper rule below Home portrait is preserved. Sub-caption "Oakland, CA." stays on About.

The operator's swap flow becomes:

```bash
# 1. Drop the real photos in public/
cp ~/Downloads/portrait-final-main.jpg public/portrait-main.jpg
cp ~/Downloads/portrait-final-context.jpg public/portrait-context.jpg

# 2. Build + deploy
pnpm build && vercel --prod
```

That's it. Three command lines. No code changes.

---

## 2. Existing infrastructure (Phase 6 — already shipped)

**`app/(foyer)/page.tsx` (Home)** has a portrait slot at lines 53-59:

```tsx
<section className="foyer-section foyer-section--portrait">
  <div className="portrait-slot portrait-slot--full-bleed" aria-hidden>
    <span className="portrait-slot__label">portrait — Oakland — coming Day 7–14</span>
  </div>
  <hr className="copper-rule" aria-hidden />
</section>
```

**`app/(foyer)/about/page.tsx` (About)** has a portrait slot at lines 61-64:

```tsx
<aside className="about-grid__column">
  <div className="portrait-slot portrait-slot--column" aria-hidden>
    <span className="portrait-slot__label">portrait — coming Day 7–14</span>
  </div>
  <p className="about-grid__sub-caption">Oakland, CA.</p>
  ...
```

**`app/globals.css`** has the slot styling at lines 605-648:
- `.portrait-slot` — cream linear gradient, 1px foyer rule border, centered label
- `.portrait-slot--full-bleed` — `aspect-ratio: 16/9` on mobile, `21/9` on tablet+
- `.portrait-slot--column` — `aspect-ratio: 4/5`, `max-width: 360px`
- `.portrait-slot__label` — uppercase, soft-ink, 0.75rem
- `.copper-rule` — 1px top border in `--color-accent-copper`, max-width 320px

**Phase 9 swap:** the `<div class="portrait-slot ...">` becomes `<PortraitImage variant="..." />`. The new component still uses `.portrait-slot` classes for layout but renders an `<Image>` inside instead of a label `<span>`. Existing CSS continues to apply.

**Phase 1 runbook** at `docs/PORTRAIT-OUTREACH.md` specifies the deliverable: 2 retouched 2x-retina JPEGs, one main vertical + one context shot. Phase 9 doesn't need to wait for the deliverable — it ships placeholders + wiring now, the operator drops real images later.

---

## 3. Placeholder generation strategy

**Decision: sharp + Node script** producing solid-color PNGs with text overlay.

### Why sharp

- Industry-standard Node image library, used by Next.js itself for image optimization (transitive).
- Generates PNG/JPEG/WebP/AVIF from raw buffers, SVG, or composite operations.
- Tiny output for solid-color images with simple text overlay (~2-5KB).
- Cross-platform binary; Windows + Linux both work cleanly.
- DevDep only — not in production bundle.

### Alternative considered: SVG-only

- Pro: vector, ~1KB each, no binary dep.
- Con: `next/image` does not optimize SVG by default (security — would need `dangerouslyAllowSVG: true` plus CSP). Adds attack surface for v1; not worth it for placeholder.

### Alternative considered: hand-rolled PNG bytes

- Pro: zero deps.
- Con: writing raw PNG with CRC32 + zlib in a script is footgun-prone; sharp is the boring right tool.

### Script design — `scripts/generate-placeholders.mjs`

```js
// scripts/generate-placeholders.mjs
//
// Phase 9 — PHOTO-02 placeholder generation.
//
// Produces two PNG placeholders under public/ that fill the portrait slots
// rendered by Phase 6 until the real Oakland portraits arrive (operator-side,
// per docs/PORTRAIT-OUTREACH.md). Both are well under the 500KB image-budget
// cap.
//
// Outputs:
//   public/portrait-main.placeholder.png    — 1200×1500 (4:5 vertical)
//   public/portrait-context.placeholder.png — 900×1125  (4:5 vertical)
//
// Both ~3-8KB. Solid foyer-paper background, foyer-ink text overlay reading
// "PORTRAIT COMING DAY 7-14".
//
// Run: node scripts/generate-placeholders.mjs
// (Or, after install: pnpm exec node scripts/generate-placeholders.mjs)
//
// Idempotent: re-running overwrites the files identically.

import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, "..", "public");

// Foyer palette (kept literal here — generation tooling, not site type, so
// design-tokens.sh exception per Phase 5 OG image precedent).
const PAPER = "#F5EFE4";
const INK_SOFT = "#3A3631";

async function generate(name, width, height) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="${PAPER}"/>
      <g font-family="Arial, sans-serif" font-size="${Math.round(width * 0.028)}" fill="${INK_SOFT}" opacity="0.55" letter-spacing="2">
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">PORTRAIT COMING DAY 7-14</text>
      </g>
    </svg>
  `;
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  const outPath = resolve(PUBLIC_DIR, name);
  await mkdir(PUBLIC_DIR, { recursive: true });
  await writeFile(outPath, png);
  const kb = (png.length / 1024).toFixed(1);
  console.log(`  wrote ${name} (${width}x${height}, ${kb}KB)`);
}

console.log("generating portrait placeholders...");
// Main portrait — Home full-bleed slot. 4:5 vertical at 2x retina (~1200 wide
// covers 600px display + 2x, plus Home full-bleed reflows 16:9 mobile → 21:9
// desktop, so a 4:5 vertical centered/cropped by object-fit:cover is fine.)
await generate("portrait-main.placeholder.png", 1200, 1500);
// Context portrait — About column slot. 4:5 vertical, smaller (column max
// width 360px on desktop * 2x = 720px wide). 900 gives headroom.
await generate("portrait-context.placeholder.png", 900, 1125);
console.log("done.");
```

**Sizing rationale:**
- Main: 1200×1500 (4:5). Display width on Home reaches ~1200px full-bleed; 2x retina cap → 2400px ideal but PNG of solid color is < 5KB anyway and `next/image` resamples per breakpoint. 1200×1500 is plenty for placeholder.
- Context: 900×1125 (4:5). Display width on About column is `max-width: 360px` → 720px @ 2x. 900 gives headroom.
- Aspect ratio 4:5 matches blueprint §4c "vertical portrait" + existing `.portrait-slot--column` CSS (which already uses `aspect-ratio: 4/5`).

**Text overlay** uses system fonts (`Arial, sans-serif`) only — these are placeholder PNGs, not site type, so `font-license.sh` is not in scope. Same pattern as Phase 5 OG image (which uses literal hex for the same Satori-can't-resolve-CSS-vars reason).

**Banned-word check on overlay text:** "PORTRAIT COMING DAY 7-14" — scanned against `lib/banned.ts`: zero hits. (No "unlock", "leverage", "journey", etc.) Safe.

---

## 4. `<PortraitImage>` component design

**File:** `components/PortraitImage.tsx` — server component (no `'use client'`).

**Responsibilities:**

1. Accept a `variant` prop: `"main" | "context"`.
2. At module load (server-side), check `fs.existsSync(public/portrait-<variant>.jpg)`:
   - If `true`: render `<Image src="/portrait-<variant>.jpg" />` with the real image.
   - If `false`: render `<Image src="/portrait-<variant>.placeholder.png" />` with a visual "PLACEHOLDER" data-attr that CSS can target for the overlay strap.
3. Forward the correct alt text:
   - Real image: `"Micah Jones, Oakland"` (main) / `"Micah Jones at his Oakland workspace"` (context).
   - Placeholder: `"Portrait of Micah Jones (placeholder — final shoot Day 7-14)"`.
4. Forward `priority` flag (only true for Home main portrait — LCP candidate).
5. Use the existing `.portrait-slot` wrapper classes so all current CSS layout still applies.

**Why fs.existsSync at module-load time:** Next.js App Router pages are server components rendered at build time (SSG) or request time (SSR/ISR). When `pnpm build` runs, the file existence is a snapshot at that moment — exactly what we want for the operator's "drop real image → build → deploy" flow. The check is synchronous and cheap (one syscall per page render at build, never on the wire).

**Why not client-side fallback:** would add JS, defeat `priority` LCP, flash the placeholder briefly. Server-side resolution is strictly better.

### Component shape

```tsx
// components/PortraitImage.tsx
//
// Phase 9 — PHOTO-02 + PHOTO-03. Renders the Oakland portrait when the real
// file exists at public/portrait-<variant>.jpg, otherwise falls back to the
// placeholder PNG produced by scripts/generate-placeholders.mjs. The check
// happens server-side at module load so the operator's swap flow is:
//
//   1. Save real photo as public/portrait-<variant>.jpg
//   2. pnpm build && vercel --prod
//
// No code changes required. See .claude/CLAUDE.md "Portrait Swap" section
// for full operator runbook.
//
// Variants:
//   - main:    Home full-bleed below hero. priority=true (LCP candidate).
//              Alt: "Micah Jones, Oakland" (real) / placeholder alt otherwise.
//   - context: About right column. priority=false (below fold).
//              Alt: "Micah Jones at his Oakland workspace" (real) /
//              placeholder alt otherwise.
//
// CSS: relies on existing .portrait-slot, .portrait-slot--full-bleed, and
// .portrait-slot--column blocks in app/globals.css. The new
// .portrait-slot--has-image variant tightens the fill (no centered-label
// affordance) and .portrait-slot--placeholder applies a subtle "placeholder"
// strap so visitors aren't confused.
//
// Source: REQUIREMENTS.md PHOTO-02, PHOTO-03; blueprint §4c (photography
// direction) + §7 (Home + About wireframes); docs/PORTRAIT-OUTREACH.md
// (Phase 1 runbook for the actual shoot).
import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

type Variant = "main" | "context";

interface PortraitImageProps {
  variant: Variant;
  priority?: boolean;
}

const REAL_FILENAME: Record<Variant, string> = {
  main: "portrait-main.jpg",
  context: "portrait-context.jpg",
};

const PLACEHOLDER_FILENAME: Record<Variant, string> = {
  main: "portrait-main.placeholder.png",
  context: "portrait-context.placeholder.png",
};

const REAL_ALT: Record<Variant, string> = {
  main: "Micah Jones, Oakland",
  context: "Micah Jones at his Oakland workspace",
};

const PLACEHOLDER_ALT =
  "Portrait of Micah Jones (placeholder — final shoot Day 7-14)";

// Source dimensions are the placeholder dimensions; Next.js resamples for
// every breakpoint via `sizes`.
const DIM: Record<Variant, { width: number; height: number }> = {
  main: { width: 1200, height: 1500 },
  context: { width: 900, height: 1125 },
};

const SIZES: Record<Variant, string> = {
  // Full-bleed Home: ~100vw on mobile, 100vw on desktop (no max-width).
  main: "(min-width: 1440px) 1200px, 100vw",
  // About right column: 4-col of 12 at 1440 ≈ 360px with 80px gutters.
  context: "(min-width: 1440px) 360px, (min-width: 960px) 33vw, 100vw",
};

export function PortraitImage({ variant, priority = false }: PortraitImageProps) {
  // public/ is at the project root.
  const realPath = join(process.cwd(), "public", REAL_FILENAME[variant]);
  const hasReal = existsSync(realPath);

  const src = hasReal
    ? `/${REAL_FILENAME[variant]}`
    : `/${PLACEHOLDER_FILENAME[variant]}`;
  const alt = hasReal ? REAL_ALT[variant] : PLACEHOLDER_ALT;
  const { width, height } = DIM[variant];

  const slotClass =
    variant === "main"
      ? "portrait-slot portrait-slot--full-bleed portrait-slot--has-image"
      : "portrait-slot portrait-slot--column portrait-slot--has-image";

  const fillClass = hasReal ? "" : " portrait-slot--placeholder";

  return (
    <div className={slotClass + fillClass} data-portrait-state={hasReal ? "real" : "placeholder"}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={SIZES[variant]}
        priority={priority}
        className="portrait-slot__image"
      />
      {!hasReal && (
        <span className="portrait-slot__strap" aria-hidden>
          placeholder — final portrait Day 7-14
        </span>
      )}
    </div>
  );
}
```

**Notes:**
- `Image` from `next/image` handles AVIF/WebP conversion automatically when serving (`next.config.ts` already has the default image optimizer; it'll deliver AVIF to capable browsers, JPEG/PNG fallback otherwise).
- The `sizes` attribute is critical for `next/image` to pick the right resolution per breakpoint without over-fetching on mobile (RESP-01).
- `width`/`height` are the *source* dimensions for layout reservation (prevents CLS); `next/image` computes intrinsic aspect ratio + resamples actual served bytes.
- The strap is a tiny visual cue when the placeholder is showing — visitors immediately see it's not the final image. Removed automatically when the real file is dropped in.

---

## 5. CSS adjustments (`app/globals.css`)

Three blocks to add (all under existing `[data-mode="foyer"]` selectors, around line 648 after `.copper-rule`):

```css
/* Phase 9 — portrait-slot variants when image is present */
[data-mode="foyer"] .portrait-slot--has-image {
  overflow: hidden;
  background: none; /* image replaces the cream gradient */
  border: none;     /* image edge is the edge */
}

[data-mode="foyer"] .portrait-slot__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

[data-mode="foyer"] .portrait-slot--placeholder {
  /* Restore the foyer-paper feel so the placeholder doesn't read as a
     broken photo. The PNG itself is solid foyer-paper, but having the
     wrapper match preserves the affordance if the PNG fails to load. */
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

**Mobile reflow (RESP-01) — already handled by existing CSS:**
- `.portrait-slot--full-bleed` is `aspect-ratio: 16/9` on mobile → `21/9` on tablet+. With `object-fit: cover` and `object-position: center top`, the 4:5 source PNG crops to fit. No horizontal scroll because the slot is `width: 100%`.
- `.portrait-slot--column` is `aspect-ratio: 4/5` with `max-width: 360px`. The 4:5 source PNG fills exactly. Mobile stacks below the long-form via existing About grid behavior.

No new mobile-specific CSS is needed; the existing slot CSS already does the right thing once the image is inside.

---

## 6. Wiring changes — Home and About

### Home (`app/(foyer)/page.tsx`)

Replace lines 53-59:

```tsx
// BEFORE
<section className="foyer-section foyer-section--portrait">
  <div className="portrait-slot portrait-slot--full-bleed" aria-hidden>
    <span className="portrait-slot__label">portrait — Oakland — coming Day 7–14</span>
  </div>
  <hr className="copper-rule" aria-hidden />
</section>

// AFTER
<section className="foyer-section foyer-section--portrait">
  <PortraitImage variant="main" priority />
  <hr className="copper-rule" aria-hidden />
</section>
```

Plus the import:

```tsx
import { PortraitImage } from "@/components/PortraitImage";
```

### About (`app/(foyer)/about/page.tsx`)

Replace lines 61-64:

```tsx
// BEFORE
<div className="portrait-slot portrait-slot--column" aria-hidden>
  <span className="portrait-slot__label">portrait — coming Day 7–14</span>
</div>
<p className="about-grid__sub-caption">Oakland, CA.</p>

// AFTER
<PortraitImage variant="context" />
<p className="about-grid__sub-caption">Oakland, CA.</p>
```

Plus the import. The `<aside class="about-grid__column">` wrapper stays.

Sub-caption "Oakland, CA." stays exactly as Phase 6 left it. Source Serif 4 italic, soft ink — already styled at globals.css lines 757-763. No change needed.

---

## 7. Operator runbook addition (`.claude/CLAUDE.md`)

A new H2 section near the bottom, before "Definition of done":

```markdown
## Portrait swap (when real photos arrive)

The site ships with two placeholder PNGs at `public/portrait-main.placeholder.png` and
`public/portrait-context.placeholder.png` produced by `scripts/generate-placeholders.mjs`. When
the real Oakland portraits land from the Phase 1 booking (see `docs/PORTRAIT-OUTREACH.md`),
the swap is three steps:

1. **Save the main vertical portrait as** `public/portrait-main.jpg` (2x retina source ≥1200×1500 ideal,
   any JPEG/PNG; `next/image` AVIF-converts at request time, ≤500KB enforced by
   harness `image-budget.sh`).
2. **Save the secondary workspace shot as** `public/portrait-context.jpg` (same constraints).
3. **Build and deploy:** `pnpm build && vercel --prod`.

The `<PortraitImage>` server component (`components/PortraitImage.tsx`) checks for
`public/portrait-<variant>.jpg` at build time. If present, it serves the real image with
the real-image alt text ("Micah Jones, Oakland" on Home; "Micah Jones at his Oakland workspace"
on About). If absent, it serves the placeholder PNG with the "placeholder — final portrait
Day 7-14" strap.

**No code changes are required.** The operator's flow is purely file drop + build.

Constraints:
- 2x retina source. JPEG or PNG (next/image converts to AVIF/WebP automatically).
- ≤500KB after AVIF conversion (harness `image-budget.sh` enforces at write boundary).
- 4:5 vertical aspect ratio recommended (matches the `.portrait-slot--column` slot exactly
  and crops gracefully in the `.portrait-slot--full-bleed` slot via `object-fit: cover`).
```

This documents the swap for the operator without baking it into a script. Three commands, clear intent.

---

## 8. Verification matrix

After execution:

1. **Placeholder size check.** `ls -la public/portrait-main.placeholder.png public/portrait-context.placeholder.png` — both must be <500KB. (Expected: 3-10KB each, solid-color PNG is tiny.)
2. **Build clean.** `pnpm typecheck && pnpm build` — zero errors. `pnpm build` also runs the copy-lint pre-step; placeholder strap text "placeholder — final portrait Day 7-14" must pass (already validated against `lib/banned.ts`).
3. **Visual — Chrome DevTools MCP.**
   - Navigate to `http://localhost:3000` (`pnpm dev` running). Screenshot at 1440×900 → portrait visible full-bleed, copper rule below.
   - Resize to 390×844 → portrait reflows tighter, no horizontal scroll.
   - Navigate to `/about`. Screenshot at 1440×900 → portrait in right column with "Oakland, CA." sub-caption below.
   - Resize to 390×844 → About grid stacks; portrait below long-form, no scroll.
4. **Lighthouse (informational).** Run on Home mobile simulated slow 4G. With placeholder PNG (~3KB), LCP is trivially fast; real LCP ≤ 1.8s validation happens in Phase 10 with the actual portrait. Capture the Performance score for the record.
5. **Harness hooks.** Confirm `image-budget.sh` did not fire (PNGs <500KB). Confirm `copy-lint.sh` did not fire on any edit. Confirm `font-license.sh` did not fire (no font imports in the generation script). Confirm `motion-discipline.sh` did not fire (no animation on portraits).
6. **GSAP quarantine check.** `grep -r "from \"gsap\"" components/ lib/ app/` — only `components/TitleCard.tsx` should match.

---

## 9. Plan map

Three plans, executed in three waves (linear, each depends on prior):

| Plan | Purpose | Wave | Depends on |
|------|---------|------|------------|
| 09-A-placeholders | Add sharp devDep, write `scripts/generate-placeholders.mjs`, run it, commit two PNG placeholders | 1 | — |
| 09-B-component-wiring | Write `components/PortraitImage.tsx`, edit Home + About pages, add new CSS blocks to `app/globals.css` | 2 | 09-A (needs placeholder PNGs to exist for build to render) |
| 09-C-runbook-verify | Append "Portrait swap" section to `.claude/CLAUDE.md`, run full verification matrix, write `09-VERIFY-OUTPUT.md`, update ROADMAP/STATE/REQUIREMENTS traceability | 3 | 09-B (verification reads what 09-B produced) |

---

## 10. Decisions

| Decision | Rationale |
|---|---|
| `sharp` as devDependency, not runtime | Generation tooling only. Adds binary download once at install; doesn't enter production bundle. |
| Solid-color PNG placeholders, not SVG | Avoids `dangerouslyAllowSVG` security surface for v1. PNG of solid color is tiny (~3KB). |
| `fs.existsSync` server-side fallback (not client-side or manifest-based) | Server-side resolution = build-time snapshot, zero JS overhead, no flash, preserves `priority` LCP. Pure SSG. |
| Placeholder PNG dimensions 1200×1500 / 900×1125 | 4:5 vertical matches blueprint §4c portrait orientation + existing `.portrait-slot--column` aspect ratio. 2x retina headroom for typical display sizes. |
| `Arial, sans-serif` for placeholder text overlay | Generation tooling, not site type. Same precedent as Phase 5 OG image (Satori-compatible literals). |
| `priority` only on Home main portrait | Above-fold LCP candidate. About context portrait is below fold; default lazy loading is correct. |
| Alt text differentiated real vs. placeholder | A11Y-03 + honest accessibility — placeholder strap is decorative, but the `<Image>` alt text accurately tells the screen-reader user this is a temporary stand-in. |
| New CSS block uses `--color-*` tokens only, no raw hex | `design-tokens.sh` discipline. |
| `<PortraitImage>` is a server component | Existence check needs Node `fs`. No client interactivity required. Keeps client bundle untouched. |
| Three plans, linear waves | Plan 09-A's PNGs are imported by 09-B's wiring (placeholder path resolves at build). 09-C verifies the integrated output. |

---

## 11. Harness hook safety table

| Hook | Phase 9 impact | Status |
|---|---|---|
| `image-budget.sh` | Both PNGs MUST be ≤500KB. Sharp produces ~3-10KB. | Safe — well under cap. |
| `copy-lint.sh` | Placeholder strap "placeholder — final portrait Day 7-14" + alt texts ("Micah Jones, Oakland", etc.) scanned for banned words. | Safe — zero hits verified against `lib/banned.ts`. |
| `design-tokens.sh` | New CSS uses `--color-accent-copper`, `--color-foyer-paper`, etc. — no raw hex. Generation script (under `scripts/`) is NOT scanned (scope is `app/`, `components/`, `content/`). | Safe. |
| `font-license.sh` | Generation script uses `Arial, sans-serif` in SVG → PNG render only. No `next/font` imports in placeholders. | Safe — script is generation tooling, not site type. |
| `motion-discipline.sh` | No animations on portraits. No cursor follower, no parallax, no scroll-jacking. | Safe. |
| `mdx-frontmatter.sh` | No MDX changes in Phase 9. | Safe — not invoked. |
| `a11y-baseline.sh` | All `<Image>` have alt; placeholder strap has `aria-hidden`. | Safe; full a11y audit deferred to Phase 10. |
| `perf-budget.sh` | Placeholder PNG is ~3KB → trivial LCP. Real-image LCP target ≤1.8s deferred to Phase 10. | Safe (informational only at Phase 9). |

---

## 12. Out of scope (deferred to Phase 10)

- Lighthouse Performance ≥95 gate on Home mobile with the REAL portrait. (Phase 9 captures an informational number with the placeholder; the binding validation needs the actual image.)
- `<Image>` `blurDataURL` placeholder. (Premature — placeholder PNG is already the placeholder. Real image will get a `placeholder="blur"` with a generated low-res inline blurDataURL via `next/image` plaiceholder helper in Phase 10 if desired.)
- AVIF pre-conversion. (`next/image` does this automatically at request time. Phase 9 trusts the framework.)
- Photo retouching / color grading. (Photographer-side per Phase 1 runbook.)

---

*Phase 9 research authored 2026-05-14 ahead of plan generation.*
