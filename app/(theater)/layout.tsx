// app/(theater)/layout.tsx
//
// Phase 4 — THEATER-01 + THEATER-03. W1 re-port (D3, 2026-08-11).
//
// Theater route group shared layout. Wraps every theater route
// ('/work/[slug]') in a single <div data-mode="theater"> which Phase 1's
// app/globals.css picks up via:
//   [data-mode="theater"] { background-color: var(--color-theater-ground); color: var(--color-theater-ink); }
//
// PASS-101 PHASE 3 (brief §3 item 4: "/work/[slug] theater pages: type system
// and grounds only (TitleCard stays)"). The lightest touch of the pass, and
// deliberately so — the case studies are the one surface the ruling leaves
// composed as it is.
//
// What changed:
//   - id="rl-theater" on the wrapper, which app/room-and-ledger.css §16 uses
//     to repoint FOUR variables and nothing else: --font-display (Bricolage,
//     which §2 bans), --font-sans, --font-serif and the two theater ground
//     tokens, so the case studies set in Anybody and Hanken on the system's
//     espresso and bone. Every layout rule in globals.css still applies.
//   - The Color Worlds <Nav> (a Bricolage wordmark and an overlay menu) and
//     the old <Footer> are replaced by the system's bar and foot, in their
//     dark variants, so a reader crossing from /work into a case study does
//     not cross into different chrome. TitleCard, CaseStudySidebar, the
//     ViewTransition and the reading tracker are untouched.
//
// Server Component. No 'use client' (SiteBar is a client component imported
// into a server layout — standard composition).
import { SiteBar } from "@/components/room/SiteBar";
import { SiteFoot } from "@/components/room/SiteFoot";
// The same stylesheet (room) imports. It carries the bar, the foot and §16's
// theater block; Next emits it once and both groups reference the same chunk.
import "../room-and-ledger.css";

export default function TheaterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-mode="theater" id="rl-theater">
      {/* Phase 10 — A11Y-06. Skip-to-content link. Visible only on focus. */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <SiteBar dark />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      {/* PASS-101 INTEGRATE, MEASURED: <SiteFoot /> was mounted bare here, and
       * the fourteen rules that compose it -- app/room.css §09, every one of
       * them written `#rl-root .rl-foot ...` -- matched NOTHING on a case
       * study, because this group's wrapper carries id="rl-theater". The
       * three columns collapsed to a stack of unstyled links on the page's
       * own ground, the hairline and the espresso band were absent, and the
       * chip lost its shape with them (`#rl-root .rl-chip`). The id is put
       * back around the foot ALONE rather than dropping the prefix from those
       * rules: `#rl-root a { color: inherit }` at (1,0,1) out-specifies a bare
       * `.rl-foot .nav a` at (0,2,1), so unscoping them would have taken the
       * 60% ink off every foot link on the five (room) routes to fix it here.
       * Wrapping preserves every specificity relationship the foot was
       * written against, and scopes the #rl-root block to the foot's own
       * subtree -- the case study above it is untouched. */}
      <div id="rl-root">
        <SiteFoot />
      </div>
    </div>
  );
}
