// content/full-time.ts — Pass-125, the "Work with me full-time" page (/full-time).
//
// The page is for a hiring manager at an early-stage company, hiring the first person who both
// builds the product and sells it (operator 2026-09-21, LESSONS #3 "PASS-125 FULL-TIME PAGE: THE
// SEAT AND ORDANI"). It is linked from the footers and once from /about, never the primary nav
// (LESSONS #3 "PASS-124 FIRST MOVE AND THE AUDIENCE RULING").
//
// Every string is ledger-checked. Drafts: DeepSeek v4-pro and Sol; pick: Fable
// (.planning/reviews/FABLE-125-FULLTIME-PICK.md, with the main session's two edits recorded
// there). Do not reword without a new dated ruling. ORDANI appears as proof only: nothing on its
// future. No location, no price, no title beyond Postmates "product analyst".
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
  principles: [
    {
      label: "Positioning",
      headline: "I find the reason buyers sign and lead the pitch with it.",
      body: "At Guardicore the pitch led with honeypots, but in deals, customer interviews and data analysis I found that buyers could not see the east-west traffic between their own workloads. I moved the story to east-west visibility and sat in the deals: $14M in revenue, sourced and closed, at a $1.2M average enterprise deal.",
    },
    {
      label: "Scope",
      headline: "I narrow the promise to what can be priced, policed and sold.",
      body: "At Postmates I was a product analyst in the deliver-anything era. My market and fraud analysis made the case for narrowing the promise to the core offerings.",
    },
    {
      label: "Code",
      headline: "I write the code and put working software in users’ hands.",
      body: "I founded and built ORDANI, a HIPAA-compliant CRM for birth workers. It has active paying users in beta, and none has been lost to a competitor.",
    },
    {
      label: "Result",
      headline: "I build software against a result that can be counted.",
      body: "For an award-winning author and leadership consultant, I was the sole builder of an AI RFP engine. The result: $3M in signed contracts, and a close rate from one in eight to one in four inside six months.",
    },
  ],
  recordHeading: "The record",
  record:
    "I worked inside four companies that reached an exit, with disclosed deals totaling $5B+, and I joined each one early. Uber acquired Postmates for $2.65B in 2020. At SurveyMonkey, I contributed $1M+ in enterprise sales toward its 2018 IPO. Akamai acquired Guardicore in 2021. I helped launch Neuton.AI, with North American positioning for an AI product years before anyone was queuing to buy AI. Nordic Semiconductor acquired its technology in 2025. My name was on the cap table at SurveyMonkey and Guardicore.",
  contactHeading: "Write to me",
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
  // The one /about sentence (Fable's pick), link on "one full-time seat".
  about: {
    before: "I want ",
    link: "one full-time seat",
    after:
      ": the first person at an early-stage company who both builds the product and sells it.",
  },
} as const;
