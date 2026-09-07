// app/(home)/layout.tsx
//
// Pass-101 phase 2 — the "Room and Ledger" home, in its own route group.
//
// WHY (home) AND NOT (room). Phase 2 wrote this layout at app/(room)/layout.tsx
// and phase 3 wrote a DIFFERENT one at the same path for the other pages: that
// one mounts <SiteBar>, <SiteFoot> and the site-wide motion set over a
// data-mode="cw" wrapper, and imports app/room-and-ledger.css. The home's
// chrome is its own — the section-00 bar that arrives at the seam, the fixed
// --p sheet, the page's own foot — so the two cannot share one layout without
// one of them rendering a second navigation. Route groups do not appear in the
// URL, so the home keeps `/` from here and phase 3's pages keep theirs from
// (room). Integration ruling, Pass-101 integrate.
//
// WHY A NEW GROUP. The home used to sit in `(foyer)`, whose layout mounts the
// Color Worlds chrome: <Grain>, <Nav>, <WorldSwitcher>, <ScrollReveal>. Room
// and Ledger replaces all four — the ground travels on one fixed sheet driven
// by --p, the navigation is the section-00 bar that arrives at the seam, and
// the reveals are the §16.3 set. Hiding that chrome with CSS would have left
// four live components and a duplicate nav in the accessibility tree, so the
// home moves to its own group instead. `(foyer)` keeps /contact and /services,
// the two routes neither phase ported. Every group resolves to the same URL
// space; this one owns `/` only.
//
// The wrapper carries `.rl-home`, which is the scope every rule in
// app/room.css hangs off.
//
// THE BOOT SCRIPT (Pass-101 §18 follow-up, defect: the reverse flash).
//   Every §16.3 pre-state used to be gated on `.rl-home.js`, a class RoomMotion
//   added in a useEffect — i.e. AFTER the first paint. Measured on a live load:
//   at t=84ms the copper row painted LIT (opacity 1), at t=147ms the class
//   landed, and from t=179ms it visibly DIMMED to .28 over 260ms before
//   re-lighting at ~2.8s. The bar did the same, 0 -> -12px. §16.3-1's second
//   half never played at all: raiseRow() ran in the same tick as the class, so
//   `I build the` never rendered at translateY(24px) and the 600ms rise was a
//   no-op.
//   The sibling engine already solved this — SiteMotion.tsx documents it:
//   "If it were applied on mount, everything would paint, jump back and
//   animate in — a flash of finished content." So the gate moves to
//   `html.rl-js`, stamped SYNCHRONOUSLY during parse, before the first paint,
//   and only when reduced motion is not asked for. With scripting off the
//   class is never set and the rest state — the finished frame — is what
//   renders, which is §16.3's closing rule, unchanged.
//   The 4s net: if the class is set but React never mounts (a hydration
//   error), nothing would ever add `in` and the page would stay in its
//   pre-state. RoomMotion stamps `rl-on`; if it has not by then, the gate is
//   dropped and the finished frame comes back.
import type { ReactNode } from "react";
import { Bar } from "@/components/room/Bar";

const BOOT =
  `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){` +
  `var d=document.documentElement;d.classList.add('rl-js');` +
  `setTimeout(function(){if(!d.classList.contains('rl-on'))` +
  `d.classList.remove('rl-js')},4000)}}catch(e){}`;

export default function HomeLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="rl-home">
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: BOOT }}
      />
      {/* The hero's poster is the first screen's largest paint and it is
          discovered late — it is a <video poster>, not an <img>, so the
          preload scanner never sees it. React hoists this into <head>. */}
      <link
        rel="preload"
        as="image"
        href="/video/a2-poster-last.jpg"
        fetchPriority="high"
      />
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
