// app/v4/layout.tsx
//
// /v4 — preserved snapshot of the "Two Hands" home (warm paper #F4F1EA,
// ink #15130F, workshop orange #D2521C, Fraunces display, useSpring image
// follow on Clients list). Saved so the prior direction stays browsable
// while the new "Color Worlds" direction ships at /.
//
// Inherits data-mode="th" to restore the Two Hands tokens / nav styling.
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { EditorialTimestamp } from "@/components/EditorialTimestamp";

// Legacy direction — preserved for reference, not indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V4Layout({ children }: { children: ReactNode }) {
  return (
    <div data-mode="th">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Nav variant="foyer" />
      <main id="main-content">{children}</main>
      <Footer />
      <EditorialTimestamp />
    </div>
  );
}
