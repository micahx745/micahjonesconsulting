// app/(theater)/work/[slug]/opengraph-image.tsx
//
// Phase 5 — MOT-07. Vercel OG image generation for case-study routes.
// W4 (P2-4, 2026-08-11): re-branded to the re-ported system — warm
// espresso ground + bone ink + saffron eyebrow + MICAH/JONES wordmark
// — and now reads REAL frontmatter (title card words + dek) instead of
// the Phase-5 stub registry that served a generic fallback for every
// slug. Runtime moved edge → nodejs so lib/case-studies (node:fs) works.
//
// Architectural constraint (see 05-RESEARCH §2.9):
//   next/og uses Satori to rasterize React JSX server-side. Satori
//   supports only inline styles (NO CSS variables, NO class names).
//   Hex literals are the documented exception to design-tokens.sh here.
//   Fonts: Satori's built-in sans fallback — an explicit Bricolage
//   fetch is a future upgrade if visual QA flags the mismatch.
import { ImageResponse } from "next/og";
import { getCaseStudyBySlug } from "@/lib/case-studies";

export const runtime = "nodejs";

// Static dimensions — Open Graph spec.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FALLBACK = {
  words: ["MICAH", "JONES"],
  caption: "Strategy and software, shipped by the same pair of hands.",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug).catch(() => null);
  const words = cs?.titleCardWords ?? FALLBACK.words;
  // First sentence of the dek — the OG caption is a compression, and
  // full deks overflow the 630px frame.
  const caption = cs ? `${cs.dek.split(". ")[0]}.` : FALLBACK.caption;

  // W1 re-ported theater tokens (globals.css @theme is not resolvable
  // in Satori — these literals mirror --color-theater-* + cw-saffron).
  const GROUND = "#12100E";
  const INK = "#ECE3D0";
  const INK_SOFT = "#A69B8A";
  const SAFFRON = "#C9982F";

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: GROUND,
        color: INK,
        padding: "72px 96px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Wordmark — one brand mark everywhere (P2-4). */}
      <div
        style={{
          display: "flex",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.01em",
        }}
      >
        MICAH/JONES
      </div>

      {/* Title-card word stack — resolved state. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          fontSize: words.length > 3 ? 76 : 92,
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
        }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} style={{ display: "flex" }}>
            {word}
          </span>
        ))}
      </div>

      {/* Caption — first sentence of the dek, saffron-tagged. */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: "0.14em",
            color: SAFFRON,
          }}
        >
          {(cs?.client ?? "CASE STUDY").toUpperCase()}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 30,
            color: INK_SOFT,
            maxWidth: "85%",
            lineHeight: 1.3,
          }}
        >
          {caption}
        </p>
      </div>
    </div>,
    { ...size },
  );
}
