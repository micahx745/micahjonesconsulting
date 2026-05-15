// Source: https://nextjs.org/docs/app/getting-started/fonts
//         + STACK.md §"Typography (free path)"
//         + ARCHITECTURE.md §5 "Font Cascade"
//
// IMPORTANT — PITFALL A1:
//   adjustFontFallback: true asks Next.js to inject size-adjust / ascent-override
//   metrics into the generated @font-face rule, which neutralizes CLS on first paint.
//   Known intermittent Next.js issue #74134 in 15.x — verify .next/static/css/*.css
//   contains size-adjust rules after first `pnpm build`.
import { Inter, Source_Serif_4 } from "next/font/google";

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
