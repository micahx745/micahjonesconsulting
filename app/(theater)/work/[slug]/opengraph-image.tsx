// app/(theater)/work/[slug]/opengraph-image.tsx
//
// Pass-120. The study's Open Graph card, 1200x630: wordmark, an accent bar, the
// title in its settle lines, the client, and the results lead. It reads real
// frontmatter; the retired word stack is gone.
//
// Satori (next/og) cannot read CSS variables, so the colours are hex literals
// mirroring app/globals.css: --color-theater-ground, --color-theater-ink,
// --color-theater-ink-soft, --color-accent-copper, --color-ordani-sage.
import { ImageResponse } from "next/og";
import { getCaseStudyBySlug } from "@/lib/case-studies";

export const runtime = "nodejs";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FALLBACK = {
  lines: ["Micah Jones"],
  client: "Case studies",
  caption: "Strategy and software, shipped by the same pair of hands.",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug).catch(() => null);
  const lines = cs?.titleLines ?? FALLBACK.lines;
  const client = cs?.client ?? FALLBACK.client;
  const caption = cs?.results.lead ?? FALLBACK.caption;

  const GROUND = "#12100E";
  const INK = "#ECE3D0";
  const INK_SOFT = "#A69B8A";
  const ACCENT = slug === "ordani" ? "#5E7158" : "#BD5A2D";

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
        padding: "64px 96px",
        fontFamily: "sans-serif",
      }}
    >
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

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", width: 96, height: 4, background: ACCENT }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
          }}
        >
          {lines.map((line, i) => (
            <span key={`${i}-${line}`} style={{ display: "flex" }}>
              {line}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            lineHeight: 1.35,
            color: INK_SOFT,
            maxWidth: "92%",
          }}
        >
          {client}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            lineHeight: 1.3,
            color: INK,
            maxWidth: "92%",
          }}
        >
          {caption}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
