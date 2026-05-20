// components/og/cw-og-composition.tsx
//
// Color Worlds OG composition for the home + cw subpages. Replaces the
// old FoyerOGComposition for the cw routes — keeps the cream-paper
// composition around for legacy /v1 /v4 if they ever need OG images.
//
// Satori constraint: no CSS variables, no class names, no @theme.
// Everything inline + hex literal. The palette mirrors globals.css cw
// tokens.

export interface CWOGProps {
  /** Headline at ~120px display weight. Defaults to "MICAH JONES". */
  headline?: string;
  /** Sub line below the headline — usually the credibility punch. */
  punch: string;
  /** Optional eyebrow / tag line at the top. Default "INDEPENDENT OPERATOR". */
  eyebrow?: string;
}

// Color Worlds palette — inline because Satori can't read CSS variables.
const TERRACOTTA = "#9E3C25";
const BONE = "#ECE3D0";
const ESPRESSO = "#2A1F18";
const SAFFRON = "#C9982F";

export function CWOGComposition({
  headline = "MICAH JONES",
  punch,
  eyebrow = "INDEPENDENT OPERATOR · OAKLAND",
}: CWOGProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: TERRACOTTA,
        color: BONE,
        padding: "80px 96px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top — saffron hairline + eyebrow */}
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div
          style={{
            width: "80px",
            height: "2px",
            background: SAFFRON,
          }}
        />
        <span
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: BONE,
            opacity: 0.85,
          }}
        >
          {eyebrow}
        </span>
      </div>

      {/* Middle — giant headline */}
      <div
        style={{
          display: "flex",
          fontSize: 144,
          fontWeight: 800,
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
          color: BONE,
          textTransform: "uppercase",
        }}
      >
        {headline}
      </div>

      {/* Bottom — punchline + domain */}
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
            fontSize: 36,
            fontWeight: 600,
            color: BONE,
            lineHeight: 1.3,
            maxWidth: "70%",
          }}
        >
          {punch}
        </p>
        <span
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: SAFFRON,
            letterSpacing: "0.02em",
          }}
        >
          www.micahjonesconsulting.com
        </span>
      </div>
    </div>
  );
}
