# Phase 5 Research — TitleCard Signature Motion [BLOCKER]

**Phase:** 05 TitleCard Signature Motion
**Requirements:** MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-06, MOT-07 (7 REQ-IDs)
**Blocker for:** Phase 6 (Home + Work index consume TitleCard), Phase 7 (MDX `<TitleCard>` mapping), Phase 8 (case-study heroes), Phase 10 OG image generation.
**Researched:** 2026-05-14

---

## 1. Scope

Phase 5 delivers **the** signature motion move of the entire site: a vertical word-stack of 3–6 words at 96px Inter Display 700+ that pins for ~600ms on scroll-enter, then resolves into a smaller caption with a cross-fade to the first product still. The pin is GSAP ScrollTrigger; the cross-fade is `gsap.to({opacity})` on the timeline. On mobile (< 768px) the stack reflows to 64px. Users with `prefers-reduced-motion: reduce` see the resolved state immediately with no pin and no scrub.

GSAP imports are **quarantined** to `components/TitleCard.tsx` (and only this file). This is enforced by `.claude/CLAUDE.md` line 33 ("Do not import `gsap` outside `components/TitleCard.tsx`") and verified by a build-time grep in the verify step.

The TitleCard is also the **OG image source** for every case study. Because `@vercel/og` (shipped as `next/og` in Next.js 13+) runs in the Edge runtime and cannot share React components with the client TitleCard (no DOM, no GSAP, very limited CSS — JSX is rendered server-side to a PNG via Satori), the visual structure must be factored into a **presentational** component (no GSAP, no `'use client'`) that both:

1. The client TitleCard wraps and animates with `useGSAP`, AND
2. The OG image route renders inside `ImageResponse(...)` at 1200×630.

This is the load-bearing architectural decision of Phase 5.

---

## 2. Architecture Decisions

### 2.1 Two-file split: `TitleCardComposition` + `TitleCard`

- **`components/TitleCardComposition.tsx`** — server-safe presentational shell. NO `'use client'`. NO GSAP. NO `useRef`. Renders the vertical word stack + caption + hero image slot purely declaratively. Accepts a `phase: "stacked" | "resolved"` prop that controls visibility of word stack vs caption + hero, plus class names for animation-target nodes (refs are attached by the client wrapper via `forwardRef` and DOM querySelectors scoped to the wrapper's container).
- **`components/TitleCard.tsx`** — `'use client'` wrapper. Imports `TitleCardComposition`, attaches a `useRef` to a wrapping container, registers GSAP ScrollTrigger at MODULE level, runs the pin+resolve timeline inside `useGSAP({ scope: ref })`. Reads `matchMedia('(prefers-reduced-motion: reduce)')` and short-circuits to the resolved phase immediately if matched.

This split mirrors the Next.js pattern: server-only visual primitives composed into both client islands AND `next/og` routes.

### 2.2 GSAP quarantine — single import location

Per `.claude/CLAUDE.md` line 33 and PITFALLS.md A4 (GSAP triple-bundle), `components/TitleCard.tsx` is the **only** file in the codebase that imports any of:
- `gsap`
- `gsap/ScrollTrigger`
- `@gsap/react`

This is verified post-write by:
```bash
grep -rE "import.*gsap" --include='*.ts' --include='*.tsx' . \
  | grep -v 'node_modules\|\.next\|TitleCard'
# expected: zero output
```

The bridging hook `useLenis(({ scroll }) => ScrollTrigger.update())` runs inside the same `useGSAP` callback because `ScrollTrigger` is the only thing that needs the bridge — and `ScrollTrigger` only exists when GSAP is imported, which only happens in this file. **No separate `LenisScrollTriggerBridge.tsx` is needed** — the bridge is one line inside the TitleCard's `useGSAP`.

(If a future component needs ScrollTrigger and we don't want GSAP in the TitleCard bundle for a non-TitleCard route, we'd revisit by promoting GSAP to a shared client provider — but for v1 there's exactly one consumer and the quarantine is the cleaner constraint.)

### 2.3 Module-level `gsap.registerPlugin` registration

Per STACK.md §"Motion & Scroll" integration note 4 and PITFALLS.md C1, `gsap.registerPlugin(useGSAP, ScrollTrigger)` lives **at module top** (above the component function), not inside `useEffect` or `useGSAP`. This prevents React 19 StrictMode double-mount from triggering "Plugin already registered" warnings.

```ts
// at module top
gsap.registerPlugin(useGSAP, ScrollTrigger);
```

### 2.4 `useGSAP({ scope: ref })` scoping

The `scope` option scopes GSAP selectors to the component's DOM subtree. Without it, two TitleCards on the same page (e.g., Work index page in Phase 6) would interfere during hydration. STACK.md §"Motion & Scroll" integration note 4 documents this.

### 2.5 Pin behavior — fixed pixel hold, not scrub

The blueprint says "pins for ~600ms as you scroll, then resolves." Two valid interpretations:

- **`scrub` style** — the timeline plays as the scroll position changes, no time-based hold. Pin distance = total scroll distance during pin. `end: '+=600'` means 600 pixels of scroll.
- **`pin + duration` style** — the trigger pins the element in place, then plays a time-based timeline of 0.6s while pinned, then unpins. This better matches "~600ms" phrasing.

We go with the second style (time-based) because:
1. Blueprint says "~600ms" which is a temporal unit, not a pixel unit.
2. Reduced-motion fallback is cleaner — skipping a time-based reveal is "play instantly at t=0"; skipping a scrub means "scroll past the pin range instantly," which fights ScrollTrigger.
3. Lenis lerp at 0.08 makes pixel-based scrub feel hesitant.

The ScrollTrigger config:
```ts
ScrollTrigger.create({
  trigger: rootRef.current,
  start: 'top top',          // pin starts when component top hits viewport top
  end: '+=' + PIN_DISTANCE,  // PIN_DISTANCE is calculated to give ~600ms at typical scroll velocity
  pin: true,
  pinSpacing: true,
  anticipatePin: 1,
  onEnter: () => tl.play(),  // play the resolve timeline ONCE on enter
  onLeaveBack: () => tl.reverse(), // reverse if user scrolls back up before unpin
});
```

PIN_DISTANCE is conservative: 240 pixels of scroll runway, which at Lenis's lerp 0.08 + a moderate wheel input gives ~600ms of perceived pin time. This is a calibration value; we can tune in verify.

### 2.6 Cross-fade timeline

Inside the `useGSAP` callback, build a `gsap.timeline({paused: true})`:

```ts
const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
tl.to(wordStackEl, { opacity: 0, y: -16, duration: 0.5 }, 0);
tl.to(captionEl, { opacity: 1, y: 0, duration: 0.6 }, 0.1);
tl.to(heroEl, { opacity: 1, duration: 0.7 }, 0.15);
```

Initial state (set via `gsap.set` at the start of the callback or via inline styles in `TitleCardComposition`):
- `wordStackEl` — opacity 1, y 0
- `captionEl` — opacity 0, y 8px
- `heroEl` — opacity 0

After resolve:
- `wordStackEl` — opacity 0
- `captionEl` — opacity 1, y 0
- `heroEl` — opacity 1

### 2.7 Reduced-motion branch

Inside the `useGSAP` callback, **first thing:**
```ts
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) {
  gsap.set(wordStackEl, { opacity: 0 });
  gsap.set(captionEl, { opacity: 1, y: 0 });
  gsap.set(heroEl, { opacity: 1 });
  return;  // no ScrollTrigger.create, no timeline.play
}
// ...normal pin + timeline path
```

This is documented in PITFALLS.md B2 — the WCAG 2.2 AA requirement on vestibular triggers.

Per spec MOT-05 ("render the resolved (final) state immediately. No pin. No scrub."), this is exactly the contract.

### 2.8 Mobile reflow at 64px

Pure CSS. No GSAP code path change. Inside the `TitleCardComposition` styles:

```css
.title-card-word {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 64px;
  line-height: 0.95;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .title-card-word {
    font-size: 96px;
  }
}
```

ScrollTrigger doesn't care about the font-size; the pin distance is independent of the word-stack height. We DO want to verify the stack doesn't overflow at 390px — at 64px with `line-height: 0.95` and up to 6 words, the stack height is `64 * 0.95 * 6 = ~365px`, well within a 390×844 viewport.

### 2.9 OG image composition — `next/og` ImageResponse

Per Next.js App Router file conventions, `app/(theater)/work/[slug]/opengraph-image.tsx` exports a default async function returning `new ImageResponse(<jsx>, { width: 1200, height: 630 })`. The `<jsx>` is rendered server-side by Satori (the Vercel OG library), which supports:
- Inline styles only (no CSS variables, no class names, no `@theme`)
- A subset of CSS: flex, grid (partially), font-family, color, font-size, font-weight
- No JavaScript at all (so no GSAP, no useRef, no hooks)
- External fonts must be fetched and passed to `ImageResponse` as `fonts: [...]`

So the OG composition CANNOT directly import `TitleCardComposition` as-is (it uses CSS variables and class names). Instead, we factor a SEPARATE inline-styled composition inside `opengraph-image.tsx` itself, using the same visual layout as `TitleCardComposition`. This is acceptable: the OG image is the **resolved final** state — word stack faded, caption + hero visible — and renders as a static layout, not the animated reveal.

The 1200×630 OG layout:
- Background: `#0D0D0F` (theater ground)
- Centered word stack at top (60% of vertical space): 96px Inter Bold, white ink (`#EAE6DD`)
- Caption below: 28px Source Serif italic
- Optional hero image right column (40% width) — placeholder rectangle if no hero in frontmatter

Phase 5 ships this OG route for ONE test slug (`/work/test-slug/opengraph-image`). Phase 10 fans it out to every real case-study slug via `generateStaticParams` analogue (the OG route auto-generates per-slug). Per scope discipline, we wire ONE working OG route in Phase 5 to satisfy MOT-07 and unblock Phase 10.

### 2.10 Font loading inside ImageResponse

`next/og` requires fonts to be fetched at runtime and passed in `fonts: [...]`. For Phase 5 we can use a simple fallback (`fontFamily: 'sans-serif'`) — Satori falls back to its default font (Vercel ships an Inter subset). The visual result is acceptable: bold weight at 96px reads correctly even on the fallback. Phase 10 will optionally upgrade to the exact Inter weight bundled from Google Fonts CDN at OG-generation time.

For Phase 5 we explicitly note the Inter font is a "best-effort visual match" and accept the Satori default. This avoids the network-fetch failure mode at OG generation time (Next.js 16 OG route can fail silently if font fetch returns a non-200; with no font config, it falls back gracefully).

### 2.11 Zod validation of the words array

Per MOT-02, the words array must be 3–6 items. We use `zod` (already in package.json):

```ts
// lib/title-card-schema.ts
import { z } from 'zod';

export const titleCardSchema = z.object({
  words: z.array(z.string().min(1)).min(3).max(6),
  caption: z.string().min(1),
  heroSrc: z.string().optional(),
  heroAlt: z.string().optional(),
});

export type TitleCardProps = z.infer<typeof titleCardSchema>;
```

The schema is parsed inside `TitleCard.tsx` on render (cheap — runs once per mount) and throws a clear error on misuse. This satisfies MOT-02 with a runtime contract; TypeScript provides the compile-time contract.

### 2.12 Lenis↔ScrollTrigger bridge (closes deferred LENIS-04)

Per STACK.md §"Motion & Scroll" integration note 4 (final bullet) and the DevDreaming 2026 guide, when Lenis lerp is active **and** ScrollTrigger is pinning, the pin's measured scroll position can drift from Lenis's animated position by a frame or two, causing the pin to "snap" at the boundary. The fix is one line:

```ts
useLenis(({ scroll }) => {
  ScrollTrigger.update();
});
```

This runs inside the same `useGSAP` callback (just before the pin setup). The `useLenis` hook is re-exported from `components/LenisProvider.tsx` (already wired in Phase 2). On reduced-motion routes Lenis is short-circuited (LenisProvider returns `<>{children}</>`), so `useLenis` returns a no-op subscriber — safe.

This closes the deferred LENIS-04 requirement from Phase 2.

---

## 3. File Inventory

### NEW Files

1. **`lib/title-card-schema.ts`** — Zod schema for `{words, caption, heroSrc?, heroAlt?}` (MOT-02)
2. **`components/TitleCardComposition.tsx`** — server-safe presentational shell (visual structure only)
3. **`components/TitleCard.tsx`** — `'use client'` wrapper with GSAP motion (MOT-01, MOT-03, MOT-04, MOT-05, MOT-06) — the ONLY file that imports GSAP
4. **`app/(theater)/work/[slug]/opengraph-image.tsx`** — `next/og` ImageResponse composition (MOT-07)

### MODIFIED Files

5. **`app/globals.css`** — appended `[data-title-card]` styles block (word stack typography, caption, hero slot, mobile breakpoint at 768px, reduced-motion safety net)
6. **`app/(theater)/work/[slug]/page.tsx`** — stub paragraph replaced with `<TitleCard words={...} caption={...} heroSrc={null} />` so the verify step can scroll into the pin (Phase 8 will replace this whole file with MDX rendering)

### NO Changes To

- `components/LenisProvider.tsx` — already exports `useLenis` from Phase 2; the bridge consumer is Phase 5's TitleCard
- `next.config.ts` — `experimental.viewTransition: true` already set
- `package.json` — `gsap`, `@gsap/react`, `lenis`, `zod` all installed

---

## 4. File Verbatim Drafts

### 4.1 `lib/title-card-schema.ts`

```ts
// lib/title-card-schema.ts
//
// Phase 5 — MOT-02. Zod schema for the TitleCard component props.
//
// Why a schema (not just TS types):
//   - Catches MDX frontmatter drift at render-time (Phase 7 will pipe
//     content/work/*.mdx frontmatter `titleCardWords` through this schema).
//   - Provides a single source-of-truth that the OG route also uses.
//   - The min/max bounds (3..6 words) are the blueprint §4f spec — turning
//     them into a runtime validator prevents future PRs from drifting past.
//
// Source: blueprint §4f ("three to six words"); REQUIREMENTS.md MOT-02;
//         STACK.md §"Email / Form / Data" (zod is already a project dep).
import { z } from "zod";

export const titleCardSchema = z.object({
  /** 3 to 6 short words, each non-empty. Renders as a vertical stack. */
  words: z
    .array(z.string().min(1, "word must be non-empty"))
    .min(3, "TitleCard requires at least 3 words")
    .max(6, "TitleCard supports at most 6 words"),

  /** One-sentence caption shown after the resolve. Source Serif 4 italic. */
  caption: z.string().min(1, "caption is required"),

  /** Optional path to a hero still — fades in below the caption after the resolve. */
  heroSrc: z.string().optional(),

  /** Alt text for the hero still. Required if heroSrc is set. */
  heroAlt: z.string().optional(),
});

export type TitleCardProps = z.infer<typeof titleCardSchema>;
```

### 4.2 `components/TitleCardComposition.tsx`

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

### 4.3 `components/TitleCard.tsx` — the ONLY GSAP-importing file

```tsx
// components/TitleCard.tsx
//
// Phase 5 — MOT-01, MOT-03 (motion), MOT-04 (GSAP quarantine),
// MOT-05 (reduced-motion), MOT-06 (mobile reflow via CSS).
//
// THIS IS THE ONLY FILE IN THE CODEBASE THAT IMPORTS GSAP.
// Enforced by .claude/CLAUDE.md line 33 + verify-step grep:
//   grep -rE "import.*gsap" --include='*.ts' --include='*.tsx' . \
//     | grep -v 'node_modules\|\.next\|TitleCard'
//   expected: zero output
//
// Pattern (per STACK.md §"Motion & Scroll" integration note 4,
//          PITFALLS.md C1, A4):
//   - 'use client' at top
//   - gsap.registerPlugin(useGSAP, ScrollTrigger) at MODULE level
//   - useGSAP({ scope: ref }) wraps the timeline + ScrollTrigger setup
//   - matchMedia('(prefers-reduced-motion: reduce)') is the first check
//     inside the useGSAP callback — short-circuits to the resolved state
//   - useLenis(({scroll}) => ScrollTrigger.update()) bridges Lenis lerp
//     into ScrollTrigger's measurement loop (closes deferred LENIS-04)
//
// The component renders TitleCardComposition (server-safe) inside a
// containing ref'd div. GSAP queries DOM nodes by [data-tc-*] attributes
// scoped to the ref's subtree via useGSAP's scope option.
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "@/components/LenisProvider";
import { titleCardSchema, type TitleCardProps } from "@/lib/title-card-schema";
import { TitleCardComposition } from "@/components/TitleCardComposition";

// Module-level plugin registration. MUST be outside the component function
// so React 19 StrictMode double-mount doesn't trigger "Plugin already
// registered" warnings on every navigation (PITFALLS.md C1).
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Pin runway in pixels. Calibrated to feel like ~600ms at Lenis lerp 0.08.
// Tunable — increase to slow the pin, decrease to speed.
const PIN_DISTANCE_PX = 240;

export function TitleCard(props: TitleCardProps) {
  // Validate at runtime. Throws on misuse (e.g., 7 words, 2 words,
  // missing caption). MOT-02 contract.
  const parsed = titleCardSchema.parse(props);

  const rootRef = useRef<HTMLDivElement | null>(null);

  // Bridge Lenis lerp into ScrollTrigger's measurement loop so the pin
  // stays accurate while Lenis is animating scroll position.
  // Closes the deferred LENIS-04 requirement from Phase 2.
  //
  // Important: useLenis returns a no-op subscriber when Lenis is short-
  // circuited (reduced-motion). In that case ScrollTrigger.update is
  // simply never invoked from here — but reduced-motion users also skip
  // the ScrollTrigger setup below, so there's nothing to update anyway.
  useLenis(() => {
    ScrollTrigger.update();
  });

  useGSAP(
    () => {
      // MOT-05 — read prefers-reduced-motion FIRST. If reduce, paint the
      // resolved state immediately and skip ScrollTrigger.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const root = rootRef.current;
      if (!root) return;

      const stack = root.querySelector<HTMLElement>("[data-tc-stack]");
      const resolved = root.querySelector<HTMLElement>("[data-tc-resolved]");
      const caption = root.querySelector<HTMLElement>("[data-tc-caption]");
      const hero = root.querySelector<HTMLElement>("[data-tc-hero]");

      if (!stack || !resolved || !caption) return;

      if (reduce) {
        // MOT-05 — final state, no pin, no scrub.
        gsap.set(stack, { opacity: 0, y: -16, pointerEvents: "none" });
        gsap.set(resolved, { opacity: 1, y: 0 });
        gsap.set(caption, { opacity: 1, y: 0 });
        if (hero) gsap.set(hero, { opacity: 1 });
        return;
      }

      // Normal path — initial states explicit so SSR matches what GSAP
      // immediately overrides on mount.
      gsap.set(stack, { opacity: 1, y: 0 });
      gsap.set(resolved, { opacity: 0 });
      gsap.set(caption, { opacity: 0, y: 8 });
      if (hero) gsap.set(hero, { opacity: 0 });

      // The resolve timeline — paused until ScrollTrigger fires onEnter.
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
      });
      tl.to(stack, { opacity: 0, y: -16, duration: 0.5 }, 0);
      tl.to(resolved, { opacity: 1, duration: 0.4 }, 0.05);
      tl.to(caption, { opacity: 1, y: 0, duration: 0.55 }, 0.1);
      if (hero) {
        tl.to(hero, { opacity: 1, duration: 0.65 }, 0.18);
      }

      // The pin trigger. Pin runway is PIN_DISTANCE_PX of scroll, then
      // unpins. Timeline plays on enter; reverses if user scrolls back up
      // through the top of the pin before the unpin.
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: `+=${PIN_DISTANCE_PX}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });

      // No manual cleanup needed — useGSAP wraps everything in
      // gsap.context() and calls .revert() on unmount.
      // (PITFALLS.md C1 — manual cleanup fights useGSAP's revert.)
      void trigger; // silence "value never read" under noUnusedLocals (we keep the var for clarity)
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="title-card-root">
      <TitleCardComposition {...parsed} phase="stacked" />
    </div>
  );
}
```

### 4.4 `app/(theater)/work/[slug]/opengraph-image.tsx`

```tsx
// app/(theater)/work/[slug]/opengraph-image.tsx
//
// Phase 5 — MOT-07. Vercel OG image generation for case-study routes.
//
// Renders a 1200×630 PNG at /work/[slug]/opengraph-image. Per Next.js App
// Router file conventions, this file co-located with page.tsx auto-becomes
// the OG image source — the route exports a default async function
// returning a next/og ImageResponse.
//
// Architectural constraint (see 05-RESEARCH §2.9):
//   next/og uses Satori to rasterize React JSX server-side. Satori supports
//   only inline styles (NO CSS variables, NO class names, NO @theme). It
//   does NOT execute JavaScript (NO GSAP, NO refs, NO hooks).
//
//   We therefore CANNOT import TitleCardComposition directly here — that
//   component depends on Tailwind utility classes that resolve via the
//   @theme block in app/globals.css. Instead, this file inlines a Satori-
//   compatible twin of the composition, rendering the RESOLVED (final)
//   state (since the OG is a static frame, not an animated reveal).
//
// Phase 5 ships ONE working OG route, parameterized by [slug], that uses a
// stub words/caption when slug is unknown. Phase 7 (MDX infra) and Phase 8
// (case studies) will read frontmatter to drive the words/caption per slug.
// Phase 10 fans out via export configuration if needed.
//
// Source: REQUIREMENTS.md MOT-07; Next.js App Router opengraph-image docs;
//         next/og ImageResponse API.
import { ImageResponse } from "next/og";

// Edge runtime is the default for opengraph-image. Set explicitly for clarity.
export const runtime = "edge";

// Static dimensions — Open Graph spec.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Stub registry for Phase 5. Phase 7 reads from content/work/[slug].mdx
// frontmatter; Phase 8 fills in real case studies.
const STUB_DATA: Record<string, { words: string[]; caption: string }> = {
  "test-slug": {
    words: ["ORDANI", "INTAKE.", "SECURE.", "SHIPPED."],
    caption: "A HIPAA-compliant CRM for birth workers.",
  },
};

const FALLBACK = {
  words: ["MICAH", "JONES", "CONSULTING"],
  caption: "Oakland operator. Builds the systems other people promise.",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = STUB_DATA[slug] ?? FALLBACK;

  // Theater ground + bone ink. Hex literals are acceptable HERE because
  // Satori cannot resolve CSS variables (this is the documented exception
  // to the design-tokens.sh rule — see CLAUDE.md "design-tokens.sh warns
  // on any other hex literal" and the OG architectural constraint).
  const GROUND = "#0D0D0F";
  const INK = "#EAE6DD";
  const INK_SOFT = "#9C988F";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: GROUND,
          color: INK,
          padding: "80px 96px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Vertical word stack — resolved-state caption sits below */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          {data.words.map((word, i) => (
            <span key={`${word}-${i}`} style={{ display: "block" }}>
              {word}
            </span>
          ))}
        </div>

        {/* Caption */}
        <p
          style={{
            margin: 0,
            fontSize: 32,
            fontStyle: "italic",
            color: INK_SOFT,
            maxWidth: "80%",
            lineHeight: 1.3,
          }}
        >
          {data.caption}
        </p>
      </div>
    ),
    {
      ...size,
      // No `fonts: [...]` for Phase 5 — Satori falls back to its built-in
      // Inter subset, which renders bold 96px correctly. Phase 10 will
      // upgrade to an explicit font fetch if visual QA flags a mismatch.
    },
  );
}
```

### 4.5 `app/globals.css` — appended TitleCard block

```css
/* ============================================================
 * TITLE CARD — Phase 5 (MOT-03 visual structure + MOT-06 mobile reflow)
 *
 * The vertical word stack is the signature element. Inter Display 700
 * (weight imported in lib/fonts.ts), 96px desktop / 64px mobile,
 * negative letter-spacing for tight stack rhythm.
 *
 * The caption uses Source Serif 4 italic at 22px (foyer caption rhythm
 * carried into theater). The hero slot is a responsive box.
 *
 * Initial visibility is controlled by inline `style={{opacity: ...}}` in
 * TitleCardComposition; GSAP overrides on mount in TitleCard. This file
 * only carries TYPOGRAPHY + LAYOUT, not motion state.
 *
 * The data-title-card scope ensures multiple TitleCards on the same page
 * (Phase 6 Work index) don't share state.
 *
 * Source: blueprint §4f; REQUIREMENTS.md MOT-03, MOT-06.
 * ============================================================ */

[data-title-card] {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100dvh;          /* fills the viewport so pin has room */
  padding: 64px var(--spacing-page-x-mobile);
  width: 100%;
}

@media (min-width: 768px) {
  [data-title-card] {
    padding: 128px var(--spacing-page-x-desktop);
  }
}

/* The vertical word stack — pinned during the GSAP reveal */
.title-card-stack {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.title-card-word {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 64px;             /* MOT-06 — mobile reflow */
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: inherit;              /* foyer ink or theater bone, set by [data-mode] ancestor */
}

@media (min-width: 768px) {
  .title-card-word {
    font-size: 96px;           /* blueprint §4f */
  }
}

/* The resolved state — caption + hero, layered on top of the (faded) stack */
.title-card-resolved {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  padding: inherit;
  pointer-events: none;        /* GSAP toggles via inline style; layout pre-positioned */
}

.title-card-caption {
  margin: 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 20px;
  line-height: 1.5;
  letter-spacing: -0.005em;
  max-width: 64ch;
  color: inherit;
}

@media (min-width: 768px) {
  .title-card-caption {
    font-size: 22px;
  }
}

.title-card-hero {
  position: relative;
  width: 100%;
  max-width: 720px;
  aspect-ratio: 4 / 3;
  background-color: var(--color-theater-surface);
  border: 2px solid var(--color-theater-ink);   /* matches Phase 7 stills border spec */
  overflow: hidden;
}

.title-card-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.title-card-hero--placeholder {
  /* No image yet — render a flat surface in theater color */
  background-color: var(--color-theater-surface);
}

/* MOT-05 reduced-motion safety net.
 * The TitleCard component itself reads matchMedia and short-circuits, but
 * if the JS fails to mount (network blip, JS disabled, hydration error),
 * the CSS here ensures the user STILL sees the resolved state — never
 * a frozen pin or a flash of stacked-only content. */
@media (prefers-reduced-motion: reduce) {
  [data-title-card] [data-tc-stack] {
    opacity: 0 !important;
  }
  [data-title-card] [data-tc-resolved] {
    opacity: 1 !important;
  }
  [data-title-card] [data-tc-caption] {
    opacity: 1 !important;
    transform: none !important;
  }
  [data-title-card] [data-tc-hero] {
    opacity: 1 !important;
  }
}
```

### 4.6 `app/(theater)/work/[slug]/page.tsx` — integration

```tsx
// app/(theater)/work/[slug]/page.tsx
//
// Phase 4 stub + Phase 5 TitleCard integration.
//
// Phase 5 replaces the stub paragraph with a real <TitleCard /> render so
// the signature motion is verifiable end-to-end on /work/test-slug. The
// route still uses the stub frontmatter from content/work/test-slug.mdx
// in Phase 7 — for Phase 5 we hard-code the props here as a stand-in.
//
// Phase 7 (MDX Infrastructure) will replace the hard-coded props with a
// frontmatter read of `titleCardWords` + `dek` from the MDX file. Phase 8
// fills in real case studies.
//
// Source: REQUIREMENTS.md MOT-03 (component composes correctly on a real
//         route); ROADMAP Phase 5 success criterion #1 (standalone test
//         route renders <TitleCard words={...} />).
import { TitleCard } from "@/components/TitleCard";
import { ViewTransitionLink } from "@/components/view-transition-link";

export default async function TheaterCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Stub data for Phase 5. Phase 7 replaces this with frontmatter from
  // content/work/[slug].mdx; Phase 8 fills in real case studies.
  const stubData = {
    "test-slug": {
      words: ["ORDANI", "INTAKE.", "SECURE.", "SHIPPED."],
      caption: "A HIPAA-compliant CRM for birth workers.",
    },
  } as const;

  const data =
    stubData[slug as keyof typeof stubData] ?? {
      words: ["TEST", "ROUTE", "STUB"],
      caption: `Slug: ${slug}`,
    };

  return (
    <article>
      <TitleCard
        words={[...data.words]}
        caption={data.caption}
      />

      {/* Trailing content for scroll runway — needed so the user can scroll
          past the pin and see the resolve. Phase 8 replaces with MDX. */}
      <section style={{ minHeight: "100vh", padding: "128px 32px" }}>
        <p>
          <ViewTransitionLink href="/">back to foyer</ViewTransitionLink>
        </p>
      </section>
    </article>
  );
}
```

---

## 5. Verification Plan

### 5.1 Static verification

1. **typecheck** — `pnpm typecheck` clean (strict mode + `noUncheckedIndexedAccess`)
2. **build** — `pnpm build` clean (includes copy-lint pre-step + next build)
3. **GSAP quarantine grep** (critical):
   ```bash
   grep -rE "import.*gsap|from ['\"]gsap" \
     --include='*.ts' --include='*.tsx' . \
     | grep -v 'node_modules\|\.next\|TitleCard'
   ```
   Expected: zero results.
4. **Single source of truth** — `lib/title-card-schema.ts` is imported by both `TitleCard.tsx` and (later) the OG route. Verify both import paths resolve.

### 5.2 Runtime verification

5. **DevTools `/work/test-slug`** — visit the route, expect:
   - TitleCard renders with `data-mode="theater"` styling (obsidian ground, bone ink)
   - Word stack visible on initial render at scroll position 0
   - Scrolling pins the element at viewport top
   - Within ~600ms (240px scroll runway) the timeline plays: stack fades up, caption fades in, hero placeholder fades in
   - Continuing to scroll past the pin distance unpins and reveals trailing content
6. **Reduced-motion emulation** — Chrome DevTools Rendering panel → "Emulate CSS media feature prefers-reduced-motion: reduce" → refresh → expect:
   - TitleCard renders with caption + hero visible IMMEDIATELY (no stacked words pre-pin)
   - No pin behavior; scrolling moves past the component normally
7. **Mobile reflow** — DevTools mobile emulation at 390×844 → expect:
   - Word stack renders at 64px (verified via computed style)
   - Stack does not overflow the viewport
   - Pin behavior still fires
8. **OG route** — visit `http://localhost:3000/work/test-slug/opengraph-image` → expect:
   - 200 response, Content-Type: image/png
   - Width 1200, Height 630
   - Renders the words "ORDANI / INTAKE. / SECURE. / SHIPPED." on theater-ground

### 5.3 Bundle verification

9. Inspect `.next/static/chunks/` after build. Confirm:
   - GSAP appears in the route bundle for `/work/[slug]` (expected)
   - GSAP does NOT appear in the route bundle for `/` (foyer home) — the home page does not import TitleCard yet
   - Quantitative check optional; the grep result is the primary contract

---

## 6. Risks & Open Questions

### R1 — Pin distance calibration

PIN_DISTANCE_PX = 240 is a calibration guess. At Lenis lerp 0.08 with a typical mid-velocity wheel scroll, this should feel like ~600ms. If verify shows it's too fast (e.g., 300ms) or too slow (1000ms), tune in the verify-fix loop. The value is a single constant at the top of `TitleCard.tsx` for easy adjustment.

### R2 — `noUncheckedIndexedAccess` interaction with words array

`words[i]` returns `string | undefined` under strict checking. The composition uses `.map((word, i) => ...)` which gives `word` as `string` (the map callback type) so we're safe. The Zod schema guarantees `min(1)` items per element. No risk.

### R3 — Lenis `useLenis` hook with no provider

If `LenisProvider` is short-circuited (reduced-motion), `useLenis` should still be callable without throwing. The Lenis 1.3 `useLenis` hook returns a `lenis` instance or `null` when no provider is mounted, and the callback form (`useLenis(fn)`) is a no-op subscription in that case. Verify this in the runtime check — if `useLenis` throws when reduced-motion is on, we move the bridge inside the non-reduced-motion branch.

### R4 — `next/og` Satori font fallback at 96px

Satori's default Inter subset may not render 96px exactly like the live `next/font/google` Inter. Visual difference is acceptable for v1 — both are "Inter at heavy weight." Phase 10 visual QA may upgrade to an explicit font fetch.

### R5 — ScrollTrigger pin in concurrent rendering

React 19 + Next.js 16 use concurrent rendering. `useGSAP` is designed for this (handles double-mount via `gsap.context()`). PITFALLS.md C1 + STACK.md integration note 4 cover the pattern. Should be safe.

### R6 — Hydration parity

The composition renders with `style={{opacity: 1}}` on stack and `opacity: 0` on resolved (the `phase="stacked"` default). After GSAP mounts client-side, it overrides these with the same values, so there's no hydration mismatch warning. Reduced-motion server-render would ideally render with `phase="resolved"`, but we can't read `matchMedia` server-side. The CSS `@media (prefers-reduced-motion: reduce)` safety net in globals.css handles this — even if the server renders `phase="stacked"`, the CSS forces the resolved state visible.

### R7 — `useLenis` re-export type compatibility

`components/LenisProvider.tsx` re-exports `useLenis` from `lenis/react`. The hook callback signature is `(lenis: Lenis) => void`. We use `useLenis(() => { ScrollTrigger.update(); })` which ignores the lenis instance — type-safe.

---

## 7. References

- **Blueprint §4f** — TitleCard signature spec (verbatim quote in 05-RESEARCH §2.5)
- **REQUIREMENTS.md** — MOT-01..07
- **ROADMAP.md** — Phase 5 success criteria (5/5)
- **STACK.md §"Motion & Scroll"** — GSAP 3.15 + @gsap/react 2.1.2, integration note 4
- **PITFALLS.md C1** — GSAP SSR safety
- **PITFALLS.md A4** — GSAP triple-bundle prevention (quarantine pattern)
- **PITFALLS.md B2** — `prefers-reduced-motion` on TitleCard pin
- **.claude/CLAUDE.md line 33** — GSAP quarantine rule
- **Next.js docs** — `app/[route]/opengraph-image` file convention
- **next/og** — ImageResponse + Satori constraints

---

*Researched: 2026-05-14. Ready for /gsd:plan-phase 5.*
