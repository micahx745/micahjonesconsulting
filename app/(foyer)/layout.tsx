// app/(foyer)/layout.tsx
//
// Phase 4 — FOYER-01.
//
// Foyer route group shared layout. Wraps every foyer route ('/', '/about',
// '/work-with-me', '/contact', '/work') in a single <div data-mode="foyer">
// which Phase 1's app/globals.css picks up via the
// [data-mode="foyer"] { background-color: var(--color-foyer-paper); color: var(--color-foyer-ink); }
// attribute selector. That cream-paper body color is one half of the
// foyer↔theater 600ms cross-fade — the browser snapshots ::view-transition-old(root)
// against this color when navigating into a theater route.
//
// Server Component. No 'use client'. <Nav> and <Footer> (Phase 3) are also
// Server Components; <ViewTransitionLink> nested inside <Nav> is the only
// client island in the foyer chrome.
//
// Source: ARCHITECTURE.md §3.1 + §3.3 (single root, group sets data-mode);
//         REQUIREMENTS.md FOYER-01; CLAUDE.md "Two modes" + "What not to do"
//         (no useTheme, no ThemeProvider).
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function FoyerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-mode="foyer">
      {/* Phase 10 — A11Y-06. Skip-to-content link. Visible only on focus. */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Nav variant="foyer" />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
