// content/work-page.ts
//
// Pass-120. Copy for /work that is not a case study: the method line and the record block.
// Rulings: LESSONS #3, THE /WORK METHOD LINE (2026-09-16) and the record-block rows
// (operator 2026-09-15, descriptions confirmed 2026-09-16). Event years only, never tenure.
// The block DIVERGES on purpose from components/color-worlds/ExitRecord.tsx (home):
// sorted by exit year, carries roles, no deal values except Postmates'. Every year and value
// below must match CITATIONS.EXITS_COMBINED_VALUE.DEALS (checked by the Pass-120 V7 command).

export const METHOD_LINE =
  "I find what your buyers are actually paying for, then build the system that sells exactly that.";

export const RECORD = {
  id: "record",
  heading: "Also on the record",
  line: "Four of the companies I worked inside reached an exit.",
  rows: [
    {
      company: "SurveyMonkey",
      role: "Enterprise sales",
      outcome: "IPO, 2018",
      description: "$1M+ in enterprise sales toward the 2018 IPO.",
      href: null,
    },
    {
      company: "Postmates",
      role: "Product analyst",
      outcome: "Acquired by Uber, $2.65B, 2020",
      description:
        "Market and fraud analysis in the deliver-anything era, and the case for narrowing the promise to the core offerings. A promise that covers everything cannot be priced, policed or sold.",
      href: null,
    },
    {
      company: "Guardicore",
      role: "Revenue and positioning",
      outcome: "Acquired by Akamai, 2021",
      description:
        "$14M in revenue, sourced and closed, after the research moved the pitch from honeypots to east-west visibility.",
      href: "/work/guardicore",
    },
    {
      company: "Neuton.AI",
      role: "Helped launch",
      outcome: "Technology acquired by Nordic Semiconductor, 2025",
      description:
        "North American positioning for an AI product years before anyone was queuing to buy AI. I held no cap-table position.",
      href: null,
    },
  ],
} as const;
