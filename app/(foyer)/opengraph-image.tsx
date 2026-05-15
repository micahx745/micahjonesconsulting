// app/(foyer)/opengraph-image.tsx
//
// Phase 10 — OG-01. Foyer OG image for the Home route (/).
// Renders at /opengraph-image. Per Next.js App Router conventions, this file
// co-located with the foyer group root becomes the OG image for the Home page.
//
// Source: REQUIREMENTS.md OG-01; Next.js App Router opengraph-image docs.
import { ImageResponse } from "next/og";
import { FoyerOGComposition } from "@/components/og/foyer-og-composition";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <FoyerOGComposition
        eyebrow="OAKLAND OPERATOR"
        description="Premium two-mode portfolio for Micah Jones, Oakland-based operator. Product, growth, consulting for founders and birth-worker practices."
      />
    ),
    size,
  );
}
