// app/(room)/layout.tsx
//
// Pass-101 phase 2 — the "Room and Ledger" route group.
//
// WHY A NEW GROUP. The home used to sit in `(foyer)`, whose layout mounts the
// Color Worlds chrome: <Grain>, <Nav>, <WorldSwitcher>, <ScrollReveal>. Room
// and Ledger replaces all four — the ground travels on one fixed sheet driven
// by --p, the navigation is the section-00 bar that arrives at the seam, and
// the reveals are the §16.3 set. Hiding that chrome with CSS would have left
// four live components and a duplicate nav in the accessibility tree, so the
// home moves to its own group instead and `(foyer)` keeps serving the routes
// phase 3 has yet to port. Both groups still resolve to the same URL space;
// this one owns `/` only.
//
// The wrapper carries `.rl-home`, which is the scope every rule in
// app/room.css hangs off, and RoomMotion adds `js` to it when scripting is on
// and reduced motion is off.
import type { ReactNode } from "react";
import { Bar } from "@/components/room/Bar";

export default function RoomLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="rl-home">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      {/* The bar is revealed at the seam by RoomMotion above 900px. Below 900,
          and under reduced motion, CSS already pins it open. With scripting OFF
          nothing would ever open it, so the same rule those two cases use is
          declared here — parsed ONLY when scripting is disabled, so it cannot
          touch the scripted render. */}
      <noscript>
        <style>{`.rl-home .bar{opacity:1;pointer-events:auto;transform:none}`}</style>
      </noscript>
      {/* §3: one fixed ground for the whole page. No section declares a colour
          except the two that are always espresso and the copper field. */}
      <div className="rl-sheet" aria-hidden="true" />
      <Bar />
      {/* tabIndex={-1} so the skip link can focus <main> without making it a
          tab stop in the regular order. */}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
