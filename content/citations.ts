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
      "components/color-worlds/ExitRecord.tsx (Pass-106, renders DEALS below)",
    ],
    // Pass-106: the same four deals as structured data, so <ExitRecord /> can
    // RENDER the record instead of restating it. quotedStatistics above stays
    // the citation of record, and every field here is read off it — no figure,
    // date or acquirer lives in a component as a literal (Pitfall E2).
    // `value: null` means the price was never disclosed, which is why Neuton
    // contributes nothing to the sum and carries no figure on the page.
    DEALS: [
      {
        company: "SurveyMonkey",
        event: "Nasdaq IPO",
        counterparty: "SVMK",
        year: "2018",
        value: "$2.33B",
        note: "First-day market valuation, September 26.",
        outcome: "IPO, first-day value",
      },
      {
        company: "Postmates",
        event: "Acquired by",
        counterparty: "Uber",
        year: "2020",
        value: "$2.65B",
        note: "All-stock, closed December.",
        outcome: "Acquired by Uber",
      },
      {
        company: "Guardicore",
        event: "Acquired by",
        counterparty: "Akamai",
        year: "2021",
        value: "$600M",
        note: "Closed October.",
        outcome: "Acquired by Akamai",
      },
      {
        company: "Neuton.AI",
        event: "Technology acquired by",
        counterparty: "Nordic Semiconductor",
        year: "2025",
        value: null,
        note: "Price never disclosed. Counted as zero.",
        outcome: "Technology acquired by Nordic Semiconductor",
      },
    ],
    // The arithmetic, stated so the page can show its work: the disclosed
    // deals sum to this, and the site rounds DOWN to the claim it makes.
    DISCLOSED_TOTAL: "$5.58B",
    CLAIMED_FLOOR: "$5B+",
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
