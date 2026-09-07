// Source: node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md
//         (`axes`, `weight: "variable"`, `adjustFontFallback`, `variable`)
//
// Pass-101 — "Room and Ledger" (WINNING-BRIEF-2026-09-05 §2, §16.4).
// Operator ruling 2026-09-06 ("Well arent you going to build the other pages
// in this style?"): the site moves onto the Room and Ledger system.
//
//   Display AND label face .... Anybody, variable, wdth 50..150 + wght 100..900
//   Text face ................. Hanken Grotesk 400 / 500
//   Mono ...................... NONE. The mono face is RETIRED by the §2 type
//                               table ("Mono | none | retired in this
//                               direction"). The label style is Anybody at
//                               wdth 80, not a monospace.
//
// Bricolage Grotesque is kept ONLY until Pass-101 phase 3 restyles the
// remaining routes; §2 bans it in this direction. Do not add call sites.
//
// IMPORTANT — PITFALL A1:
//   adjustFontFallback: true asks Next.js to inject size-adjust / ascent-override
//   metrics into the generated @font-face rule, which neutralizes CLS on first paint.
import { Anybody, Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";

// THE DISPLAY AND LABEL FACE.
//
// `weight: "variable"` keeps the full wght range (the system uses 300 for every
// display line and 500 for every label); `axes: ["wdth"]` ships the width axis,
// which this direction depends on — the width ladder (125 poster / 115 composed
// / 106 fitted / 90 meta / 80 label) is set with font-variation-settings and
// collapses to a single width without the axis.
//
// The 2026-08-13 perf note on Bricolage ("the wdth axis is DROPPED, nothing sets
// font-variation-settings") is REVERSED here on purpose: the ladder is the
// direction. Cost is measured at the ship gate, not assumed.
export const anybody = Anybody({
  subsets: ["latin"],
  axes: ["wdth"],
  weight: "variable",
  variable: "--font-anybody",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

// THE TEXT FACE. 17px/1.5 body, 21px/1.35 lede, 500 for metadata keys only.
// 600/700 stay declared: the unrestyled routes render Hanken at those weights
// in ~17 places and would otherwise get a synthesized bold. Google serves the
// same variable file regardless of which weights are listed (measured identical
// at 33.9KB, 2026-08-15).
export const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

// DEPRECATED — Pass-101. Bricolage carries the display type on the routes that
// have not been ported to the Room and Ledger system yet. It is banned in the
// new direction (§2) and leaves the bundle when the last route is ported.
// preload: false so it never competes with Anybody for the LCP font slot.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  variable: "--font-bricolage",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});
