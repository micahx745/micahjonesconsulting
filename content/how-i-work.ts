// content/how-i-work.ts — the How I work steps, one source for the home and /services (Pass-126).
//
// Copy is LOCKED (operator 2026-09-21, LESSONS #3 "HOW I WORK: FOUR STEPS, FINAL 1" and "HOW I WORK LOCKED";
// Pass-126 ruling "Same words, better design" + "Carry it to other pages"). Extracted byte for byte from the
// Pass-124 home markup, including the two no-break spaces that keep "break." (Stay headline) and "one."
// (Plan body) off a line of their own on a phone. The Plan body was re-ruled on 2026-09-21 (Pass-126, LESSONS #3 "HOW
// I WORK: THE PLAN LINE"); its no-break space now sits before "month." Do not retype, reword or "fix" these strings.
export const HOW_I_WORK = {
  heading: "How I work.",
  steps: [
    {
      label: "Scope",
      headline: "Week one is an audit and a scope.",
      body: "I look at where things stand: what works, what is broken, and what to fix first. The scope and the price go in writing before anything starts.",
    },
    {
      label: "Plan",
      headline: "I name the trade-offs before I build.",
      body: "I give you a roadmap, and you approve it before development begins. A defined piece of the work ships within the first month.",
    },
    {
      label: "Build",
      headline: "I build the real thing, not a prototype.",
      body: "That means sign-in, data, deployment, and where it stands on compliance, written down. You get me, directly, and a reply within one business day.",
    },
    {
      label: "Stay",
      headline: "I stay for launch and what customers break.",
      body: "I interview customers and listen to sales calls to find the question buyers are actually asking. Then I hand over documentation and a walkthrough so your team runs it without me.",
    },
  ],
  moreHref: "/work",
  moreLabel: "See the work",
  // /services only: the two "Every engagement includes" lines the steps do not already say, verbatim from the
  // retired INCLUSIONS list (Pass-111b decision 2 commitments), joined into one note under the steps.
  servicesNote:
    "No discovery fee. Any one of the three areas below, two of them, or all three.",
} as const;
