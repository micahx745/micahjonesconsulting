// app/(foyer)/layout.tsx
//
// "Color Worlds" direction (current).
//
// Direction history:
//   /v1 — Tier Z+ foyer with hand-drawn marks (cream + copper)
//   /v2 — Dark luxury graphite + champagne
//   /v3 — Typesetter's workshop (numbered plates)
//   /v4 — "Two Hands" warm paper + workshop orange + Fraunces
//   /    — "Color Worlds" (this) — rotating saturated worlds, Bricolage display
//
// The route group is still named (foyer) for path-mapping; the design
// language has been swapped end-to-end. See globals.css [data-mode="cw"]
// and components/color-worlds/* for the implementation.
//
// Persistent chrome:
//   - <Grain> — full-viewport noise overlay
//   - <Cursor> — magnetic custom cursor (hidden on touch)
//   - <Nav> — fixed top nav + mobile overlay menu (mix-blend-mode: difference)
//   - <WorldSwitcher> — IntersectionObserver swap of --cw-* CSS vars
//   - <ScrollReveal> — observes .cw-reveal elements
import type { ReactNode } from "react";
import { Grain } from "@/components/color-worlds/Grain";
import { Nav } from "@/components/color-worlds/Nav";
import { WorldSwitcher } from "@/components/color-worlds/WorldSwitcher";
import { ScrollReveal } from "@/components/color-worlds/ScrollReveal";

// Custom magnetic cursor removed; system cursor everywhere.
export default function ColorWorldsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div data-mode="cw">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Grain />
      <Nav />
      <WorldSwitcher />
      <ScrollReveal />
      {/* tabIndex={-1} so the skip link can programmatic-focus the
       * <main> without making it a tab stop in regular nav flow.
       * Stops SR from re-announcing the whole region on focus. */}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
