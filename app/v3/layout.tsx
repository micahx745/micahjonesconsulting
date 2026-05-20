// app/v3/layout.tsx
//
// v3 — Typesetter's workshop route group layout.
// Cream paper ground + faint baseline grid via [data-mode="v3"] on globals.css.
// SpecimenNav at top (plate-numbered index). Colophon at bottom.
//
// Lenis + ViewTransition inherited from root.
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { SpecimenNav } from "@/components/v3/specimen/SpecimenNav";
import { Colophon } from "@/components/v3/specimen/Colophon";

// Legacy direction — preserved for reference, not indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V3Layout({ children }: { children: ReactNode }) {
  return (
    <div data-mode="v3">
      <SpecimenNav />
      <main>{children}</main>
      <Colophon />
    </div>
  );
}
