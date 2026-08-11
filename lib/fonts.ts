// Source: https://nextjs.org/docs/app/getting-started/fonts
//         + STACK.md §"Typography (free path)"
//
// Pass-37 (operator: "delete"): the /v1-/v4 legacy directions and the
// six fonts only they used are GONE. The site loads exactly three
// faces — Bricolage Grotesque (display), Hanken Grotesk (body),
// JetBrains Mono (labels) — the Color Worlds system, nothing else.
//
// IMPORTANT — PITFALL A1:
//   adjustFontFallback: true asks Next.js to inject size-adjust / ascent-override
//   metrics into the generated @font-face rule, which neutralizes CLS on first paint.
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";

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
