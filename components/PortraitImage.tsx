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
  /**
   * Defaults TRUE. The /about portrait sits in the intro — above the fold at
   * >=1100px, and the largest element on screen once it exists — so lazy
   * loading it would make the page's own LCP candidate wait on the lazy
   * queue. Pass `priority={false}` if you mount a variant below the fold.
   * (Cross-review finding, 2026-08-15.)
   */
  priority?: boolean;
}

// Both extensions are accepted because the operator docs say "JPEG or PNG" —
// checking only .jpg made a dropped-in .png render silently nothing.
// (Cross-review finding, 2026-08-15.)
const EXTENSIONS = ["jpg", "jpeg", "png"] as const;

const BASENAME: Record<Variant, string> = {
  main: "portrait-main",
  context: "portrait-context",
};

// Alt text has to stay TRUE for whatever photograph actually arrives. The
// previous "at his Oakland workspace" asserted a setting the photo brief never
// guaranteed — if the portrait is shot anywhere else the alt text lies to every
// screen-reader user. (Cross-review finding, 2026-08-15.)
const REAL_ALT: Record<Variant, string> = {
  main: "Micah Jones",
  context: "Micah Jones",
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

export function PortraitImage({ variant, priority = true }: PortraitImageProps) {
  const file = EXTENSIONS.map((ext) => `${BASENAME[variant]}.${ext}`).find((name) =>
    existsSync(join(process.cwd(), "public", name)),
  );
  if (!file) return null;

  const { width, height } = DIM[variant];
  return (
    <figure className={`cw-portrait cw-portrait--${variant}`}>
      <Image
        src={`/${file}`}
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
