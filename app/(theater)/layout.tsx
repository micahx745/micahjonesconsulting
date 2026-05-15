// app/(theater)/layout.tsx
//
// Phase 4 — THEATER-01 + THEATER-03 (Nav variant wiring).
//
// Theater route group shared layout. Wraps every theater route
// ('/work/[slug]') in a single <div data-mode="theater"> which Phase 1's
// app/globals.css picks up via:
//   [data-mode="theater"] { background-color: var(--color-theater-ground); color: var(--color-theater-ink); }
// That obsidian #0D0D0F body color is the other half of the foyer↔theater
// 600ms cross-fade — the browser snapshots ::view-transition-new(root)
// against this color when entering a theater route.
//
// Nav passes variant="theater" so the Phase 3 chrome flips to copper-on-obsidian
// with a single [BACK TO FOYER ↗] link. Footer is mode-aware via CSS attribute
// selectors (no prop needed).
//
// Server Component. No 'use client'.
//
// Source: ARCHITECTURE.md §3.1 + §3.3; REQUIREMENTS.md THEATER-01, THEATER-03;
//         CLAUDE.md "Two modes".
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function TheaterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-mode="theater">
      <Nav variant="theater" />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
