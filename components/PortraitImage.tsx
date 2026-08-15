// components/PortraitImage.tsx
//
// Renders the Oakland portrait when a real file exists at
// public/portrait-<variant>.jpg — and renders NOTHING until then.
//
// The operator swap flow is unchanged and now actually works:
//
//   1. Save the photo as public/portrait-context.jpg (or -main.jpg)
//   2. pnpm build && ship
//
// 2026-08-15 rewrite, two changes worth the note:
//
// 1. WIRED. This component previously had no importer at all — it was
//    unreachable from every route root, so the documented "drop the file and
//    build" flow would have done nothing. It is now mounted on /about.
//
// 2. NO PLACEHOLDER BRANCH. It used to fall back to a typographic poster (a
//    huge "MJ" monogram on a dark field) when the photo was missing. That
//    shipped a stand-in for a human face on the one page where a buyer goes
//    looking for the human — it reads as unfinished, not as restraint. An
//    empty column is the more honest state, and the design review's note about
//    /about's empty right half is answered by a real photograph or not at all.
//    Returning null also means mounting this today changes zero pixels.
//
// Image budget: 500KB max (harness image-budget.sh). next/image serves
// AVIF/WebP at request time.
import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

type Variant = "main" | "context";

interface PortraitImageProps {
  variant: Variant;
  /** Set on an above-the-fold portrait so it is treated as an LCP candidate. */
  priority?: boolean;
}

const REAL_FILENAME: Record<Variant, string> = {
  main: "portrait-main.jpg",
  context: "portrait-context.jpg",
};

const REAL_ALT: Record<Variant, string> = {
  main: "Micah Jones, Oakland",
  context: "Micah Jones at his Oakland workspace",
};

// Source dimensions; next/image resamples per breakpoint via `sizes`.
const DIM: Record<Variant, { width: number; height: number }> = {
  main: { width: 1200, height: 1500 },
  context: { width: 900, height: 1125 },
};

const SIZES: Record<Variant, string> = {
  main: "(min-width: 1440px) 1200px, 100vw",
  // /about right column: ~380px at desktop, full width once it stacks.
  context: "(min-width: 1100px) 380px, 100vw",
};

export function PortraitImage({ variant, priority = false }: PortraitImageProps) {
  const hasReal = existsSync(join(process.cwd(), "public", REAL_FILENAME[variant]));
  if (!hasReal) return null;

  const { width, height } = DIM[variant];
  return (
    <figure className={`cw-portrait cw-portrait--${variant}`}>
      <Image
        src={`/${REAL_FILENAME[variant]}`}
        alt={REAL_ALT[variant]}
        width={width}
        height={height}
        sizes={SIZES[variant]}
        priority={priority}
        className="cw-portrait__img"
      />
      <figcaption className="cw-portrait__cap">
        Oakland <span aria-hidden>·</span> 2026
      </figcaption>
    </figure>
  );
}
