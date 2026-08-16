// app/(foyer)/about/opengraph-image.tsx
//
// /about OG image — Color Worlds palette. Carries the operator-not-
// consultant framing for social link unfurls.
import { ImageResponse } from "next/og";
import { CWOGComposition } from "@/components/og/cw-og-composition";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <CWOGComposition
        eyebrow="ABOUT · MICAH JONES"
        headline="OPERATOR"
        punch="A decade of B2B GTM + product. Three exits. Receipts that hold up."
      />
    ),
    size,
  );
}
