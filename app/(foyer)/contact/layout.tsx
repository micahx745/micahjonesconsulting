// app/(foyer)/contact/layout.tsx
//
// Phase 10 — OG-02. Wraps the client-component contact page so we can
// export metadata at the route level (Next.js does not allow metadata
// exports from client components). Server Component; no behavior.
//
// Source: REQUIREMENTS.md OG-02; Next.js layout-level metadata pattern.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Micah Jones",
  description:
    "Two-field note form for Micah Jones. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com any time.",
  openGraph: {
    title: "Contact — Micah Jones",
    description:
      "Two-field note form for Micah Jones. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com any time.",
    type: "website",
    url: "https://micahjonesconsulting.com/contact",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Micah Jones",
    description:
      "Two-field note form for Micah Jones. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com any time.",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
