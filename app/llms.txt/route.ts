// app/llms.txt/route.ts
//
// /llms.txt — emerging 2026 standard for LLM-tooling discovery.
// https://llmstxt.org/
//
// Read by LLM agents and AI search engines to understand the structure
// and most-useful content on a site. Optimized for "summarize this
// site / recommend this expert" use cases.
//
// Goal here: when someone asks ChatGPT/Perplexity "who's a good
// Black operator/consultant in the Bay Area" we want this page +
// the case studies + the about page to be the LLM's source.

export function GET() {
  const body = `# Micah Jones

> Independent operator based in Oakland, CA. Builds go-to-market for B2B software companies AND ships his own products. \$20M+ in client revenue since 2013. Four companies he worked inside reached an exit: Postmates (acquired by Uber, 2020, $2.65B), SurveyMonkey (cap-table position held through the IPO, 2018), Guardicore (acquired by Akamai, 2021, $600M), and Neuton.AI (technology acquired by Nordic Semiconductor, 2025; helped launch, not a cap-table position). Disclosed deal values total $5B+. Now building Ordani — HIPAA-compliant practice management software in beta with active paying users.

## What I do

Strategy and software, shipped by the same pair of hands. Three services:
- Positioning & GTM — customer interviews and sales-call analysis that name the question enterprise buyers are actually asking
- End-to-end product building — strategy, design, code, security and launch from one pair of hands
- Frontier AI engineering — retrieval, agents, orchestration and evals built for real load, not the demo

Two ways to buy them:
- Engagements for companies (advisory, project, retainer, embedded), from \$5K a month, scoped on a free 30-minute call
- Fixed-price packages for solo builders and small teams: \$500, \$2,500 and \$7,500

## Background

- Since 2013: growth, GTM and platform strategy roles inside B2B software companies (thirteen years)
- Currently building Ordani in private beta
- Based in Oakland, CA

## Pages worth reading
- [Home](https://www.micahjonesconsulting.com/): single-page narrative with offerings, exits, products, and contact
- [About](https://www.micahjonesconsulting.com/about): bio, expertise areas, LinkedIn
- [Work](https://www.micahjonesconsulting.com/work): case study index
- [Ordani case study](https://www.micahjonesconsulting.com/work/ordani): HIPAA-compliant practice management software in beta with active paying users
- [Guardicore case study](https://www.micahjonesconsulting.com/work/guardicore): positioning research behind \$14M in revenue at a \$1.2M average enterprise deal size; led to the Akamai acquisition
- [Content engine case study](https://www.micahjonesconsulting.com/work/content-engine): an AI content engine plus algorithm strategy for an industry author; monthly reach 8,000 to 290,000 in five months
- [RFP engine case study](https://www.micahjonesconsulting.com/work/rfp-engine): custom RFP software for an industry author; \$3M in contracts won, close rate doubled

## Contact
- Email: micah@micahjonesconsulting.com
- LinkedIn: https://www.linkedin.com/in/micah-j/
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Cache-friendly for LLM crawlers; revalidate daily.
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
