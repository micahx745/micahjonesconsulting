// app/(foyer)/page.tsx
//
// Phase 4 — stub home page. Resolves to "/" via the (foyer) route group
// (Next.js strips the parens from the URL).
//
// This is intentionally minimal: one line of placeholder copy plus one
// ViewTransitionLink to the theater stub so the foyer↔theater cross-fade
// becomes recordable in Chrome DevTools Performance. Phase 6 (Foyer Pages)
// replaces this file with the real Home composition (hero positioning
// sentence, full-bleed portrait, selected-work strip, About teaser, Work
// With Me teaser, Contact CTA — all per blueprint §7).
//
// Server Component. No data dependencies. No client state.
//
// Source: ROADMAP Phase 4 success criterion #1 + #2 (stub renders data-mode
//         foyer; click to /work/test-slug triggers visible 600ms cross-fade).
import { ViewTransitionLink } from "@/components/view-transition-link";

export default function FoyerHomePage() {
  return (
    <section>
      <p>Foyer home (Phase 6 will replace).</p>
      <p>
        <ViewTransitionLink href="/work/test-slug">
          → test theater transition
        </ViewTransitionLink>
      </p>
    </section>
  );
}
