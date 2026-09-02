// content/citations.ts
//
// Phase 8 — Documents sources for any verbatim statistics in case studies.
// The case-study MDX prose itself remains verbatim per blueprint §9; this
// file records the citation for traceability (and for any future component
// that wants to render footnotes).
//
// Source: blueprint §9 ORDANI "Why it matters" paragraph; CLAUDE.md line 57.

export const CITATIONS = {
  // Four-exit combined value (operator instruction 2026-08-30: Postmates
  // joins the exit record). "$5B+" = DISCLOSED deals only; Neuton.AI's
  // acquisition price was never made public and contributes $0 to the sum.
  EXITS_COMBINED_VALUE: {
    id: "EXITS_COMBINED_VALUE",
    title: "Combined disclosed exit value across four companies",
    publisher: "SEC filings + acquirer press releases",
    url: "https://techcrunch.com/2020/12/01/uber-officially-completes-postmates-acquisition/",
    accessedAt: "2026-08-30",
    quotedStatistics: [
      "$2.65B — Uber acquires Postmates, all-stock, closed December 2020 (SEC Form 425/S-4)",
      "$2.33B — SurveyMonkey (SVMK) first-day market valuation, Nasdaq IPO, September 26 2018",
      "$600M — Akamai acquires Guardicore, closed October 2021 (Akamai IR press release)",
      "undisclosed — Nordic Semiconductor acquires Neuton.AI technology, 2025 (excluded from sum)",
      "$5.58B disclosed total; site claims the conservative floor '$5B+'",
    ],
    citedIn: [
      "components/color-worlds/Hero.tsx (proof chips)",
      "app/(foyer)/about/page.tsx (receipts)",
      "app/llms.txt/route.ts",
      "metadata descriptions (root, home, about) — /hire-me retired Pass-57",
      "opengraph images (home, about)",
    ],
  },
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
