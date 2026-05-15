// app/(foyer)/work-with-me/opengraph-image.tsx
//
// Phase 10 — OG-01. Foyer OG image for /work-with-me.
import { ImageResponse } from "next/og";
import { FoyerOGComposition } from "@/components/og/foyer-og-composition";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <FoyerOGComposition
        eyebrow="WORK WITH ME"
        description="Three engagement shapes for shipping work: Strategy Sprint (two to four weeks), Embed (eight to twelve weeks), Build (custom Next.js)."
      />
    ),
    size,
  );
}
