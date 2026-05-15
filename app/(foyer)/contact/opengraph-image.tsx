// app/(foyer)/contact/opengraph-image.tsx
//
// Phase 10 — OG-01. Foyer OG image for /contact.
import { ImageResponse } from "next/og";
import { FoyerOGComposition } from "@/components/og/foyer-og-composition";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <FoyerOGComposition
        eyebrow="CONTACT"
        description="Two-field note form for Micah Jones. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com any time."
      />
    ),
    size,
  );
}
