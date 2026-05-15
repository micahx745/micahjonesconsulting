// components/TitleCardComposition.tsx
//
// Phase 5 — MOT-03 (visual structure). Server-safe presentational shell.
//
// NO 'use client'. NO GSAP. NO refs. Pure declarative JSX + Tailwind
// utilities + a few CSS attribute hooks for the client wrapper to target
// via querySelector inside useGSAP({scope: ref}).
//
// Why a separate composition:
//   1. Strict separation between visual structure (here) and motion logic
//      (TitleCard.tsx). Keeps GSAP quarantine clean (per .claude/CLAUDE.md
//      line 33 — gsap imports ONLY in components/TitleCard.tsx).
//   2. The composition can be rendered server-side by app/(theater)/work/
//      [slug]/opengraph-image.tsx for Vercel OG generation (MOT-07).
//      (Note: next/og's Satori renderer is strict about CSS; the OG route
//      actually re-implements an inline-styled twin of this composition for
//      Satori compatibility. This file remains the source of truth for the
//      LIVE composition; OG re-derivation is acceptable per architectural
//      constraint — see 05-RESEARCH §2.9.)
//   3. Future consumers (Phase 6 Work index TitleCard thumbnails) can
//      render the static resolved phase without dragging GSAP in.
//
// The `phase` prop drives the initial render state:
//   - "stacked" (default) — word stack visible, caption + hero hidden
//   - "resolved"          — word stack hidden, caption + hero visible
// The client wrapper passes "stacked" and animates to "resolved" via GSAP.
// Reduced-motion users render with phase="resolved" immediately (MOT-05).
//
// Class names use Tailwind v4 utility-first plus a handful of stable
// `data-tc-*` attributes the client wrapper queries by inside useGSAP.
// We deliberately avoid `id=` to allow multiple TitleCards on a page (e.g.,
// the Phase 6 Work index where every case study renders a thumbnail).
//
// Source: blueprint §4f; REQUIREMENTS.md MOT-03; ARCHITECTURE.md §4.1.
import type { TitleCardProps } from "@/lib/title-card-schema";

type Phase = "stacked" | "resolved";

export function TitleCardComposition({
  words,
  caption,
  heroSrc,
  heroAlt,
  phase = "stacked",
}: TitleCardProps & { phase?: Phase }) {
  // Visual contract:
  //   .title-card-stack — the vertical word column (96px desktop / 64px mobile)
  //   .title-card-caption — the smaller caption (Source Serif 4 italic, 22px)
  //   .title-card-hero — the first product still
  // All three are styled in app/globals.css under [data-title-card].
  //
  // Initial visibility is driven by inline style so SSR matches what GSAP
  // will then animate. This avoids the hydration "flash of stacked phase"
  // for reduced-motion users — they render with phase="resolved" from the
  // server.
  const stackVisible = phase === "stacked" ? 1 : 0;
  const resolvedVisible = phase === "resolved" ? 1 : 0;

  return (
    <section
      data-title-card
      data-phase={phase}
      className="title-card relative w-full"
      aria-label={`${words.join(" ")} — ${caption}`}
    >
      {/* Word stack — vertical column, pinned during the GSAP timeline */}
      <div
        data-tc-stack
        className="title-card-stack"
        style={{ opacity: stackVisible }}
        aria-hidden={phase === "resolved"}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="title-card-word">
            {word}
          </span>
        ))}
      </div>

      {/* Resolved state: caption + hero still */}
      <div
        data-tc-resolved
        className="title-card-resolved"
        style={{ opacity: resolvedVisible }}
        aria-hidden={phase === "stacked"}
      >
        <p data-tc-caption className="title-card-caption">
          {caption}
        </p>

        {heroSrc ? (
          <div data-tc-hero className="title-card-hero">
            {/* next/image not used here so the same composition is reusable
                in the OG route. Phase 8 will swap to next/image inside the
                live render path if PERF requires it. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroSrc} alt={heroAlt ?? ""} loading="eager" />
          </div>
        ) : (
          <div data-tc-hero className="title-card-hero title-card-hero--placeholder" aria-hidden />
        )}
      </div>
    </section>
  );
}
