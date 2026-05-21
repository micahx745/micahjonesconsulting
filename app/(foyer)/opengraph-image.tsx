// app/(foyer)/opengraph-image.tsx
//
// Home OG image — Color Worlds palette + credibility punchline. This
// is what unfurls when the home URL is shared on Twitter/LinkedIn/etc.
//
// Renders at /opengraph-image (Next.js App Router convention).
import { ImageResponse } from "next/og";
import { CWOGComposition } from "@/components/og/cw-og-composition";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <CWOGComposition
        headline="MICAH JONES"
        punch="$20M+ in client revenue. Two exits — Akamai + SurveyMonkey IPO. Now building Ordani."
      />
    ),
    size,
  );
}
