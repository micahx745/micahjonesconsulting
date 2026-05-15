# Plan 05-B: TitleCardComposition (Server-Safe Presentational Shell)

**Phase:** 05 TitleCard Signature Motion
**Requirements:** MOT-03 (visual structure)
**Depends on:** 05-A (`lib/title-card-schema.ts` exports `TitleCardProps`; `app/globals.css` `[data-title-card]` styles in place)
**Status:** Ready
**Estimated LOC:** 1 new TSX file (~70 lines)

---

## Goal

Ship `components/TitleCardComposition.tsx` — the **server-safe** presentational shell that defines the visual structure of the TitleCard (vertical word stack + caption + hero slot). No `'use client'`, no GSAP, no refs. Pure declarative JSX consuming the Phase 5-A schema types and the Phase 5-A CSS classes.

This separation is load-bearing for two reasons:

1. **GSAP quarantine** — keeps motion logic (`TitleCard.tsx` in 05-C) isolated. Future consumers like Phase 6's Work index "TitleCard thumbnail" can render this composition statically without dragging GSAP into the foyer bundle.
2. **OG generation parity** — Phase 5-D's `opengraph-image.tsx` needs the same visual structure rendered server-side via `next/og` Satori. While Satori requires inline styles (not class names), the canonical visual layout lives here and is mirrored in the OG route.

The composition accepts a `phase: "stacked" | "resolved"` prop that controls initial visibility of the word stack vs. caption/hero. The client wrapper (05-C) always passes `phase="stacked"` and animates to resolved via GSAP. Reduced-motion users have the CSS safety net (05-A) flip them to resolved regardless.

---

## File Operations

### NEW: `components/TitleCardComposition.tsx`

```tsx
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
```

---

## Acceptance

- `pnpm typecheck` clean
- `pnpm build` clean (the component compiles as a Server Component)
- File `components/TitleCardComposition.tsx` exists and exports `TitleCardComposition`
- No `'use client'` directive at the top of the file (verify with `head -5 components/TitleCardComposition.tsx | grep -c 'use client'` returns 0)
- No GSAP imports (verify with `grep -E "import.*gsap" components/TitleCardComposition.tsx` returns nothing)
- No `useRef`, `useState`, `useEffect` imports (server-safe)
- Component accepts `TitleCardProps & { phase?: "stacked" | "resolved" }` and renders without runtime errors at the default `phase="stacked"`

---

## Notes

### On the `<img>` element vs `<Image>`

The composition uses plain `<img>` (with an eslint-disable comment) instead of `next/image`. This is intentional:

- The same composition file MIGHT be referenced by the OG route in the future (not today — we re-implement inline-styled for Satori). Keeping it `next/image`-free preserves that future option.
- `next/image` requires the optimizer pipeline; for a hero still served from `/public`, plain `<img>` is correct in this presentational shell.
- Phase 8 (when real hero stills land) can revisit if PERF needs `next/image` here.

### On the `phase` prop default

We default `phase="stacked"` because:

1. The client wrapper (05-C) always wants `stacked` as the initial render state — GSAP fades it into `resolved`.
2. SSR renders the same state the client expects on first mount → no hydration mismatch.
3. The reduced-motion CSS safety net in `app/globals.css` (from 05-A) flips the visibility independently of the `phase` prop, so reduced-motion users see the resolved state even though the server rendered `phase="stacked"`.

### On `aria-hidden` choice

When `phase="stacked"`, the resolved subtree is `aria-hidden="true"` (caption and hero are invisible). Once GSAP animates to resolved, the stack becomes invisible — but we don't toggle `aria-hidden` from JS (we'd need a state, defeating the server-safe contract). The screen reader perspective:

- On initial render with phase="stacked": SR reads the word stack (the visible content).
- After GSAP resolve: stack is faded to opacity 0, resolved is opacity 1. SR could still read the stack since `aria-hidden` is static.
- The `aria-label` on the parent `<section>` (`${words.join(" ")} — ${caption}`) is the canonical accessible name for the whole component — so SR users get both content fragments via the label whether they navigate into the subtree or not.

This is the right SR contract: the whole card has one accessible name ("ORDANI INTAKE. SECURE. SHIPPED. — A HIPAA-compliant CRM for birth workers."), and the visual reveal is a sighted-user affordance.
