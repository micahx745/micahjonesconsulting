// app/(foyer)/about/opengraph-image.tsx
//
// Phase 10 — OG-01. Foyer OG image for /about.
import { ImageResponse } from "next/og";
import { FoyerOGComposition } from "@/components/og/foyer-og-composition";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <FoyerOGComposition
        eyebrow="ABOUT"
        description="Oakland-based operator. Guardicore positioning research moved deals up by $150K. Now runs his own shop: half consulting, half product."
      />
    ),
    size,
  );
}
