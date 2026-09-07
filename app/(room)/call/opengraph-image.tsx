// app/(room)/call/opengraph-image.tsx
//
// PASS-101 PHASE 3. /call used to inherit app/(foyer)/opengraph-image.tsx, the
// group-level card, because it lived in that group. Moving the route to (room)
// would have silently dropped its unfurl card, so the same composition is
// declared explicitly here. Same size, same runtime, same component; the
// headline and punchline are the group card's own strings.
//
// It covers /call/kickoff too, which is noindex but still gets pasted into a
// chat window by a buyer who has just paid.
//
// Renders at /call/opengraph-image (Next.js App Router convention).
import { ImageResponse } from "next/og";
import { CWOGComposition } from "@/components/og/cw-og-composition";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <CWOGComposition
      headline="MICAH JONES"
      punch="Four exits: Postmates, SurveyMonkey IPO, Guardicore, Neuton.AI. $5B+ combined. Now building Ordani."
    />,
    size,
  );
}
