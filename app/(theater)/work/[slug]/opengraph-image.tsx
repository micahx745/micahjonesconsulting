// app/(theater)/work/[slug]/opengraph-image.tsx
//
// Phase 5 — MOT-07. Vercel OG image generation for case-study routes.
//
// Renders a 1200×630 PNG at /work/[slug]/opengraph-image. Per Next.js App
// Router file conventions, this file co-located with page.tsx auto-becomes
// the OG image source — the route exports a default async function
// returning a next/og ImageResponse.
//
// Architectural constraint (see 05-RESEARCH §2.9):
//   next/og uses Satori to rasterize React JSX server-side. Satori supports
//   only inline styles (NO CSS variables, NO class names, NO @theme). It
//   does NOT execute JavaScript (NO GSAP, NO refs, NO hooks).
//
//   We therefore CANNOT import TitleCardComposition directly here — that
//   component depends on Tailwind utility classes that resolve via the
//   @theme block in app/globals.css. Instead, this file inlines a Satori-
//   compatible twin of the composition, rendering the RESOLVED (final)
//   state (since the OG is a static frame, not an animated reveal).
//
// Phase 5 ships ONE working OG route, parameterized by [slug], that uses a
// stub words/caption when slug is unknown. Phase 7 (MDX infra) and Phase 8
// (case studies) will read frontmatter to populate the words/caption per slug.
// Phase 10 fans out via export configuration if needed.
//
// Source: REQUIREMENTS.md MOT-07; Next.js App Router opengraph-image docs;
//         next/og ImageResponse API.
import { ImageResponse } from "next/og";

// Edge runtime is the default for opengraph-image. Set explicitly for clarity.
export const runtime = "edge";

// Static dimensions — Open Graph spec.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Stub registry for Phase 5. Phase 7 reads from content/work/[slug].mdx
// frontmatter; Phase 8 fills in real case studies.
const STUB_DATA: Record<string, { words: string[]; caption: string }> = {
  "test-slug": {
    words: ["ORDANI", "INTAKE.", "SECURE.", "SHIPPED."],
    caption: "A HIPAA-compliant CRM for birth workers.",
  },
};

const FALLBACK = {
  words: ["MICAH", "JONES", "CONSULTING"],
  caption: "Oakland operator. Builds the systems other people promise.",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = STUB_DATA[slug] ?? FALLBACK;

  // Theater ground + bone ink. Hex literals are acceptable HERE because
  // Satori cannot resolve CSS variables (this is the documented exception
  // to the design-tokens.sh rule — see CLAUDE.md "design-tokens.sh warns
  // on any other hex literal" and the OG architectural constraint).
  const GROUND = "#0D0D0F";
  const INK = "#EAE6DD";
  const INK_SOFT = "#9C988F";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: GROUND,
          color: INK,
          padding: "80px 96px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Vertical word stack — resolved-state caption sits below */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          {data.words.map((word, i) => (
            <span key={`${word}-${i}`} style={{ display: "block" }}>
              {word}
            </span>
          ))}
        </div>

        {/* Caption */}
        <p
          style={{
            margin: 0,
            fontSize: 32,
            fontStyle: "italic",
            color: INK_SOFT,
            maxWidth: "80%",
            lineHeight: 1.3,
          }}
        >
          {data.caption}
        </p>
      </div>
    ),
    {
      ...size,
      // No `fonts: [...]` for Phase 5 — Satori falls back to its built-in
      // Inter subset, which renders bold 96px correctly. Phase 10 will
      // upgrade to an explicit font fetch if visual QA flags a mismatch.
    },
  );
}
