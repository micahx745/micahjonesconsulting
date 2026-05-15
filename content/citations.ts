// content/citations.ts
//
// Phase 8 — Documents sources for any verbatim statistics in case studies.
// The case-study MDX prose itself remains verbatim per blueprint §9; this
// file records the citation for traceability (and for any future component
// that wants to render footnotes).
//
// Source: blueprint §9 ORDANI "Why it matters" paragraph; CLAUDE.md line 57.

export const CITATIONS = {
  ORDANI_CDC_2024: {
    id: "ORDANI_CDC_2024",
    title: "Maternal Mortality Rates in the United States, 2024",
    publisher:
      "Centers for Disease Control and Prevention (CDC), National Center for Health Statistics",
    url: "https://www.cdc.gov/nchs/products/databriefs/maternal-mortality-2024.htm",
    accessedAt: "2026-05-14",
    quotedStatistics: [
      "44.8 per 100,000 live births (non-Hispanic Black women, maternal mortality rate)",
      "14.2 per 100,000 live births (non-Hispanic white women, maternal mortality rate)",
      "~3.15x rate ratio (Black vs. white, non-Hispanic)",
    ],
    citedIn: ["content/work/ordani.mdx (Why it matters)"],
  },
} as const;

export type CitationId = keyof typeof CITATIONS;
