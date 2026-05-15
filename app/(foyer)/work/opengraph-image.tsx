// app/(foyer)/work/opengraph-image.tsx
//
// Phase 10 — OG-01. Foyer OG image for /work (the case-study index).
import { ImageResponse } from "next/og";
import { FoyerOGComposition } from "@/components/og/foyer-og-composition";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <FoyerOGComposition
        eyebrow="WORK"
        description="Case studies from Micah Jones: ORDANI HIPAA-compliant CRM for birth workers, HR equity playbook, Passioneer, Akamai positioning research."
      />
    ),
    size,
  );
}
