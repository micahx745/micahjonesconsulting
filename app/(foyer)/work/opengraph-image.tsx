// app/(foyer)/work/opengraph-image.tsx
//
// /work OG image — Color Worlds palette. Case-study index.
import { ImageResponse } from "next/og";
import { CWOGComposition } from "@/components/og/cw-og-composition";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <CWOGComposition
      eyebrow="WORK · MICAH JONES"
      headline="CASE STUDIES"
      punch="Guardicore, SurveyMonkey, Flexport, Postmates — and Ordani."
    />,
    size,
  );
}
