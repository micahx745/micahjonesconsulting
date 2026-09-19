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

// Pass-121 (operator 2026-09-17/18, LESSONS #3, PASS-121 DIRECTION AND /WORK
// HEADING; ORDANI DID-LINE AND THE RECORD HEADING): /work becomes five
// exhibits. WORK_HEADING is the page's one h1 (sentence case in the DOM,
// uppercased by CSS); WORK_DESCRIPTION is the description under it;
// WORK_DESCRIPTION's figure list was cut 2026-09-18 (LESSONS #3 "PASS-122 /WORK LOCKED").
// DOORWAY_LINK closes the Guardicore doorway (renders READ THIS ONE FIRST →,
// the arrow span is the component's). The record heading gains its period.
export const WORK_HEADING = "The work, on the record.";

export const WORK_DESCRIPTION =
  "Four client engagements and the company I founded. Each page says what I found, what I built, and what changed.";

export const DOORWAY_LINK = "Read this one first";

export const RECORD = {
  id: "record",
  heading: "Also on the record.",
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
      // Cut 2026-09-18 (operator, LESSONS #3 "PASS-122 /WORK LOCKED WITH THREE CUTS"): it repeated the
      // study's own line; the row still links to the study.
      description: null,
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
