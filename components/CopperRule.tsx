// components/CopperRule.tsx
//
// Phase 7 — Supporting CASE-07. A copper hairline rule that case-study MDX
// can drop in for section separation. Mirrors the foyer .copper-rule from
// app/globals.css (Phase 6) but for theater pages.
//
// Server component. Pure <hr>.
export function CopperRule() {
  return <hr className="case-study-copper-rule" aria-hidden="true" />;
}
