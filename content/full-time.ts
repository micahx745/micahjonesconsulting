// content/full-time.ts — Pass-125, the "Work with me full-time" page (/full-time).
//
// The page is for a hiring manager at an early-stage company, hiring the first person who both
// builds the product and sells it (operator 2026-09-21, LESSONS #3 "PASS-125 FULL-TIME PAGE: THE
// SEAT AND ORDANI"). It is linked from the footers and once from /about, never the primary nav
// (LESSONS #3 "PASS-124 FIRST MOVE AND THE AUDIENCE RULING").
//
// Every string is ledger-checked. Drafts: DeepSeek v4-pro and Sol; pick: Fable
// (.planning/reviews/FABLE-125-FULLTIME-PICK.md). Round 3 applies the three jurors' agreed fixes
// and the main session's tie-breaks (.planning/reviews/PASS-125-JURY-DISPOSITION.md). Do not reword
// without a new dated ruling. ORDANI appears as proof only: nothing on its future. No location,
// no price, no title beyond Postmates "product analyst".
//
// Headline strings carry a no-break space before their last word so no word sits alone on a line
// (the Pass-124 home did the same for "BREAK." and "one.").

/** A run of body text: plain, or a link to the study that proves it. */
export type Part = string | { text: string; href: string };

export const FULL_TIME = {
  path: "/full-time",
  linkLabel: "Work with me full-time",
  title: "Work with me full-time",
  description:
    "Micah Jones wants one seat: the first person at an early-stage company who both builds the product and sells it. $20M+ in revenue behind his work.",
  kicker: "Full-time",
  h1: "I build the product and sell it.",
  lede: "I want one seat: the first person at an early-stage company who both builds the product and sells it. I have thirteen years inside B2B software companies and $20M+ in revenue behind my work.",
  thinkHeading: "How I think.",
  // Order: build, then sell (the H1's order). Code first (Astra), Scope last (Fable).
  principles: [
    {
      label: "Code",
      headline: "I write the code and put working software in users’ hands.",
      body: [
        "I founded and built ",
        { text: "ORDANI", href: "/work/ordani" },
        ", a HIPAA-compliant CRM for birth workers. It is in beta with active paying users, and none has left for a competitor.",
      ] as Part[],
    },
    {
      label: "Positioning",
      headline: "I find the reason buyers sign and lead the pitch with it.",
      body: [
        "At ",
        { text: "Guardicore", href: "/work/guardicore" },
        " the pitch led with honeypots. In deals, customer interviews and data analysis, I found that buyers could not see the east-west traffic between their own workloads. I moved the story to east-west visibility and sat in the deals: $14M in revenue, sourced and closed, at a $1.2M average enterprise deal.",
      ] as Part[],
    },
    {
      label: "Result",
      headline: "I build software that helps close deals.",
      body: [
        "I was the sole builder of an ",
        { text: "AI RFP engine", href: "/work/rfp-engine" },
        " for an award-winning author and leadership consultant. $3M in signed contracts came through it, and the close rate went from one in eight proposals to one in four inside six months.",
      ] as Part[],
    },
    {
      label: "Scope",
      headline: "I narrow the promise to what can be priced and sold.",
      body: [
        "At Postmates, I was a product analyst when the promise was to deliver anything. My market and fraud analysis made the case for narrowing the promise to the core offerings.",
      ] as Part[],
    },
  ],
  recordHeading: "The record.",
  recordLead:
    "I worked inside four companies that reached an exit, and I joined each one early. Disclosed deals total $5B+.",
  // One row per company; each acquisition stays in its own sentence (LESSONS #3, 2026-09-11).
  // The Neuton.AI line is the approved /work record description, kept verbatim until he rules on
  // the three jurors' rewrites.
  recordRows: [
    { company: "Postmates:", text: "Uber acquired it for $2.65B in 2020." },
    {
      company: "SurveyMonkey:",
      text: "I contributed $1M+ in enterprise sales toward its 2018 IPO.",
    },
    { company: "Guardicore:", text: "Akamai acquired it in 2021." },
    {
      company: "Neuton.AI:",
      text: "I helped launch it, with North American positioning for an AI product years before anyone was queuing to buy AI. Nordic Semiconductor acquired its technology in 2025.",
    },
  ],
  recordClose: "SurveyMonkey and Guardicore carried my name on the cap table.",
  contactHeading: "Write to me.",
  // One paragraph: before + mailto(email) + middle + LinkedIn link + after. The spaces live in the
  // strings so the JSX adds none (LESSONS #6). The reply promise is NOT repeated here: PageFooter
  // renders it directly below.
  contact: {
    before: "If this is the seat you are filling, write to ",
    email: "micah@micahjonesconsulting.com",
    middle: " or find me on ",
    linkedin: "LinkedIn",
    linkedinHref: "https://www.linkedin.com/in/micah-j/",
    after: ".",
  },
  // The one /about sentence, link on "one full-time seat". "also" ties it to the engagements line
  // above it (all three jurors, round 1).
  about: {
    before: "I also want ",
    link: "one full-time seat",
    after:
      ": the first person at an early-stage company who both builds the product and sells it.",
  },
} as const;
