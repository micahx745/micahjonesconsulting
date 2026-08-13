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
// Perf (2026-08-13): the `wdth` axis is DROPPED. Nothing in the site's CSS
// sets font-stretch or font-variation-settings 'wdth', so the axis was pure
// payload: the latin file goes 128.5KB -> 75.1KB, a 41.6% cut to the largest
// asset on every route. Advance widths measured identical to 3 significant
// figures across all six real size/weight combinations.
//
// `opsz` STAYS. It is tempting to drop it too (a further 34.7KB) but browsers
// default to font-optical-sizing: auto, so the axis is applied from font-size
// even though no CSS mentions it — removing it would pin every glyph to one
// optical size and visibly change the display type.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
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
