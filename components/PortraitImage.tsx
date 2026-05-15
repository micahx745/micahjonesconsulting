// components/PortraitImage.tsx
//
// Phase 9 (PHOTO-02 + PHOTO-03). Renders the Oakland portrait when the
// real file exists at public/portrait-<variant>.jpg, otherwise falls back
// to the placeholder PNG produced by scripts/generate-placeholders.mjs.
// The check happens server-side at module load so the operator's swap flow
// is purely:
//
//   1. Save real photo as public/portrait-<variant>.jpg
//   2. pnpm build && vercel --prod
//
// No code changes required. See .claude/CLAUDE.md "Portrait swap" section
// for the full operator runbook.
//
// Variants:
//   main    Home full-bleed below hero. priority=true (LCP candidate).
//           Alt: "Micah Jones, Oakland" (real) or placeholder alt.
//   context About right column. priority=false (below fold).
//           Alt: "Micah Jones at his Oakland workspace" (real) or
//           placeholder alt.
//
// CSS: relies on existing .portrait-slot / --full-bleed / --column blocks
// in app/globals.css. The new --has-image / --placeholder / __image /
// __strap variants (also in globals.css) handle the image-filled state.
//
// Image budget (PHOTO-03): 500KB max enforced by harness image-budget.sh.
// next/image at request time delivers AVIF/WebP to capable browsers
// automatically.
//
// Source: REQUIREMENTS.md PHOTO-02, PHOTO-03; blueprint section 4c
// (photography direction) + section 7 (Home + About wireframes);
// docs/PORTRAIT-OUTREACH.md (Phase 1 runbook for the actual shoot).
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

// Alt text is the same whether the real image is mounted or the placeholder
// is. The visible __strap below tells operators which state they're in;
// the alt is what screen readers and social scrapers consume, and it should
// describe the subject (Micah Jones) not the file's provisional state.
const PLACEHOLDER_ALT = "Portrait of Micah Jones";

// Source dimensions are the placeholder dimensions; next/image resamples
// for every breakpoint via the `sizes` attribute below.
const DIM: Record<Variant, { width: number; height: number }> = {
  main: { width: 1200, height: 1500 },
  context: { width: 900, height: 1125 },
};

const SIZES: Record<Variant, string> = {
  // Full-bleed Home: ~100vw on mobile, 100vw on desktop (no max-width).
  main: "(min-width: 1440px) 1200px, 100vw",
  // About right column: 4-col of 12 at 1440 is roughly 360px.
  context: "(min-width: 1440px) 360px, (min-width: 960px) 33vw, 100vw",
};

export function PortraitImage({ variant, priority = false }: PortraitImageProps) {
  const realPath = join(process.cwd(), "public", REAL_FILENAME[variant]);
  const hasReal = existsSync(realPath);

  const src = hasReal
    ? `/${REAL_FILENAME[variant]}`
    : `/${PLACEHOLDER_FILENAME[variant]}`;
  const alt = hasReal ? REAL_ALT[variant] : PLACEHOLDER_ALT;
  const { width, height } = DIM[variant];

  const baseSlot =
    variant === "main"
      ? "portrait-slot portrait-slot--full-bleed portrait-slot--has-image"
      : "portrait-slot portrait-slot--column portrait-slot--has-image";

  const slotClass = hasReal ? baseSlot : `${baseSlot} portrait-slot--placeholder`;

  return (
    <div className={slotClass} data-portrait-state={hasReal ? "real" : "placeholder"}>
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
          placeholder, final portrait Day 7-14
        </span>
      )}
    </div>
  );
}
