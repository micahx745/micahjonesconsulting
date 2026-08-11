// app/(theater)/layout.tsx
//
// Phase 4 — THEATER-01 + THEATER-03. W1 re-port (D3, 2026-08-11).
//
// Theater route group shared layout. Wraps every theater route
// ('/work/[slug]') in a single <div data-mode="theater"> which Phase 1's
// app/globals.css picks up via:
//   [data-mode="theater"] { background-color: var(--color-theater-ground); color: var(--color-theater-ink); }
// The ground is now the warm espresso-black of the Color Worlds family
// (#12100E) — the "lights go down" moment survives, but in the same
// color world as the rest of the site.
//
// W1 re-port: the old two-rectangle Mark + "MICAH JONES" nav (the second
// wordmark the Cowork review flagged under R1/P2-4) is replaced by the
// same Color Worlds Nav the rest of the site runs — MICAH/JONES wordmark,
// same links, same overlay menu. The theater keeps its OWN grain (the
// [data-mode="theater"]::before noise overlay) — the CW <Grain> layers are
// [data-mode="cw"]-scoped and are NOT mounted here.
// The nav/overlay CSS is shared via :is([data-mode="cw"],[data-mode="theater"])
// selectors in globals.css.
//
// Server Component. No 'use client' (Nav is a client component
// imported into a server layout — standard composition).
import { Nav } from "@/components/color-worlds/Nav";
import { Footer } from "@/components/Footer";

export default function TheaterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-mode="theater">
      {/* Phase 10 — A11Y-06. Skip-to-content link. Visible only on focus. */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
