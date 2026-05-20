// app/v1/layout.tsx
//
// /v1 — preserved snapshot of the "Tier Z+" home (cream foyer + hand-drawn
// marks + asymmetric hero + signature). Saved so the prior direction stays
// browsable for reference while the new "Two Hands" direction ships at /.
//
// Inherits data-mode="foyer" to restore the original cream/copper palette
// the components inside this snapshot expect.
import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function V1Layout({ children }: { children: ReactNode }) {
  return (
    <div data-mode="foyer">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Nav variant="foyer" />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
