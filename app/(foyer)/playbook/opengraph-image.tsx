// app/(foyer)/playbook/opengraph-image.tsx
//
// /playbook OG image — Color Worlds palette, matching /about and /work.
// Added Pass-61: this route had no share card while every other one did, and
// its audience arrives from shared links more than from search. See
// .claude/briefs/pass-61-playbook-cro.md, "traffic to message match".
import { ImageResponse } from "next/og";
import { CWOGComposition } from "@/components/og/cw-og-composition";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <CWOGComposition
      eyebrow="THE 80% WALL · FIELD MANUAL"
      headline="80% DONE"
      punch="Your build got to 80%. Here is the rest of the way. 68 pages, 26 working files."
    />,
    size,
  );
}
