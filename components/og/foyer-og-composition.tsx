// components/og/foyer-og-composition.tsx
//
// Phase 10 — OG-01 helper. Shared Satori-compatible composition for the
// five foyer OG routes. The theater OG (case studies) lives at
// app/(theater)/work/[slug]/opengraph-image.tsx and uses a different
// composition (the TitleCard vertical word stack on obsidian).
//
// Architectural constraint: Satori does not resolve CSS variables, class
// names, or @theme. All styling is inline + hex literal. This is the
// documented exception to design-tokens.sh — see CLAUDE.md.
//
// Source: REQUIREMENTS.md OG-01; blueprint §4b palette; Phase 5 theater OG
// established the Satori inline-style pattern.

export interface FoyerOGProps {
  /** Page eyebrow rendered at 120px (e.g., "ABOUT", "WORK WITH ME"). */
  eyebrow: string;
  /** Description rendered below in italic serif fallback. */
  description: string;
}

// Foyer palette — inline because Satori can't read CSS variables.
const PAPER = "#F5EFE4";
const INK = "#1A1816";
const INK_SOFT = "#3A3631";
const COPPER = "#C8542B";
const COPPER_DEEP = "#8E3A1E";

export function FoyerOGComposition({ eyebrow, description }: FoyerOGProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: PAPER,
        color: INK,
        padding: "80px 96px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top — copper hairline + project name + page eyebrow */}
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div
          style={{
            width: "80px",
            height: "2px",
            background: COPPER,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: INK_SOFT,
            }}
          >
            MICAH JONES
          </span>
          <span
            style={{
              fontSize: 120,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: INK,
            }}
          >
            {eyebrow}
          </span>
        </div>
      </div>

      {/* Bottom — description + domain mark */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "48px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 30,
            fontStyle: "italic",
            color: INK_SOFT,
            lineHeight: 1.35,
            maxWidth: "75%",
          }}
        >
          {description}
        </p>
        <span
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: COPPER_DEEP,
            letterSpacing: "0.02em",
          }}
        >
          micahjonesconsulting.com
        </span>
      </div>
    </div>
  );
}
