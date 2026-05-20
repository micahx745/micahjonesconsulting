// Source: https://nextjs.org/docs/app/getting-started/fonts
//         + STACK.md §"Typography (free path)"
//         + ARCHITECTURE.md §5 "Font Cascade"
//
// IMPORTANT — PITFALL A1:
//   adjustFontFallback: true asks Next.js to inject size-adjust / ascent-override
//   metrics into the generated @font-face rule, which neutralizes CLS on first paint.
//   Known intermittent Next.js issue #74134 in 15.x — verify .next/static/css/*.css
//   contains size-adjust rules after first `pnpm build`.
import {
  Inter,
  Source_Serif_4,
  Instrument_Serif,
  Bricolage_Grotesque,
  Fraunces,
  Geist_Mono,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";

// Tier Z — Bricolage Grotesque replaces Inter Display for cinematographer-
// slow's display use. Variable opsz + wdth axes give the typeface character
// that Inter cannot match — and importantly, it's NOT the same face every
// other 2026 portfolio uses. Designed by Mathieu Triay for Atelier National
// de Recherche Typographique; FOSS via Google Fonts.
//
// axes: ['opsz', 'wdth'] = optical-size + width-axis access. Hero pulls
// 96pt+ with opsz tuned to display, body uses 18pt with opsz tuned to text.
//
// preload: true because this is now the LCP font for the foyer hero.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  weight: "variable",
  variable: "--font-bricolage",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

// Inter at display weights — used for headlines, TitleCard 96px stack, hero copy.
// Inter at 700/800 scores ~90% Söhne Halbfett similarity per Typewolf 2025 index.
export const interDisplay = Inter({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-inter-display",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

// Inter at body weights — used for body, foyer caption metadata, contact form.
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

// Source Serif 4 — used for deks, pull quotes, About long-form lede.
// axes: ['opsz'] is the most-missed integration detail in 2026; without it the
// pull quotes at 32px look mechanically thin.
// preload: false because serif is below the fold on most foyer pages.
//
// NOTE: Next.js 16 (Turbopack) requires `weight: "variable"` when `axes` is set.
// Discrete weights ["400","500"] + axes are incompatible — only variable-font
// weight is allowed. The variable font interpolates 400-700 internally; the
// `opsz` axis provides optical-size compensation at 32px pull-quote scale.
// v2 (dark-mode luxury) — Instrument Serif as the free PP-Editorial-New
// fallback. Used for hero, project titles, pull quotes on /v2 routes only.
// Italic is the primary face for editorial display use.
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});

// "Two Hands" — display face. Variable serif with optical-sizing.
// Per the research brief: "Fraunces + Inter + Geist Mono is a fully free pairing
// that hits the same register" as the commercial GT America Mono direction.
// Used for the hero "and" line, section headers ("What I build for clients"),
// and the numbered editorial list of client projects.
//
// preload: true — Fraunces carries the LCP headline on the new home.
export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

// "Two Hands" — mono labels. Per the brief: Geist Mono "as a structural device —
// labels, section numbers, button text, footer details. Mono pulls the whole
// site into the 'design engineer' register without doing anything else."
// Never used for body copy.
//
// preload: false — labels are tertiary; not LCP-critical.
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});

// "Color Worlds" — body face. Hanken Grotesk per the approved mockup. Used
// for hero subline, body prose, and the form input on the Ordani band.
// Bricolage handles display (already present); JetBrains Mono handles
// labels/nav/eyebrows.
export const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

// "Color Worlds" — mono labels. JetBrains Mono per the approved mockup.
// Used ONLY for: nav links, eyebrows, kickers, meta text, footnotes,
// status pills, scroll hints. Never body. Never decorative.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});
