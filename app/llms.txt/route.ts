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

> Independent operator based in Oakland, CA. Builds go-to-market for B2B software companies AND ships his own products. \$17M+ in client revenue (2013–2023). Two exits at companies he helped build: Guardicore (acquired by Akamai, 2021) and TechValidate (acquired by SurveyMonkey, 2015). Now building Ordani — a live-beta system of record for an underserved regulated market.

## What I do

Strategy and software, shipped by the same pair of hands. Four offerings:
- Go-to-market — positioning, motion, and the plan to win the market
- Product building — from idea to working software, designed and shipped
- Launches — demand, narrative, and the cascade that follows a launch
- Growth systems — the repeatable engine underneath the numbers

## Background

- 2013–2023: Growth, GTM, and platform strategy roles at Guardicore, TechValidate, Flexport, Cuebiq, Postmates
- Currently solo since 2024; building Ordani in private beta
- Based in Oakland, CA

## Pages worth reading
- [Home](https://www.micahjonesconsulting.com/): single-page narrative with offerings, exits, products, and contact
- [About](https://www.micahjonesconsulting.com/about): bio, expertise areas, LinkedIn
- [Work](https://www.micahjonesconsulting.com/work): case study index
- [Ordani case study](https://www.micahjonesconsulting.com/work/ordani): HIPAA-grade CRM for birth workers
- [Guardicore case study](https://www.micahjonesconsulting.com/work/guardicore): positioning research that moved deal-size \$150K; led to the Akamai acquisition
- [HR equity author case study](https://www.micahjonesconsulting.com/work/hr-equity-author): algorithm strategy + multi-platform content system

## Contact
- Email: hello@micahjonesconsulting.com
- LinkedIn: https://www.linkedin.com/in/micahjones/
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
