// app/robots.ts
//
// /robots.txt — Next.js App Router file convention.
//
// 2026 SEO + AI-discoverability policy: ALLOW all crawlers including
// the LLM training/search bots (GPTBot, ClaudeBot, Perplexity-style
// bots, etc.). For a personal site whose discoverability comes
// largely from AI search engines recommending the operator, blocking
// these is a losing trade — the upside (your case studies show up
// when someone asks "Black operators in Oakland" in ChatGPT/Perplexity)
// outweighs the marginal downside (content potentially in training).
//
// Pass-37 (operator: "delete"): the /v1-/v4 legacy direction snapshots
// are DELETED from the codebase — the routes now 404 and the disallow
// entries are gone.
//
// Reference: llms.txt spec (https://llmstxt.org/) is also implemented
// at /llms.txt for explicit LLM tooling.
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.micahjonesconsulting.com/sitemap.xml",
    host: "https://www.micahjonesconsulting.com",
  };
}
