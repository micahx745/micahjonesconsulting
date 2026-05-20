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
// Public content is public. The legacy direction snapshots (/v1-/v4)
// are noindexed via per-layout metadata, not via robots.txt — that's
// the right tool for "crawl but don't index" semantics.
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
        // Legacy direction snapshots are noindex-only at the page level,
        // but block crawling too — saves crawler budget and prevents the
        // snapshots showing up in any cached search results.
        disallow: ["/v1/", "/v2/", "/v3/", "/v4/"],
      },
    ],
    sitemap: "https://www.micahjonesconsulting.com/sitemap.xml",
    host: "https://www.micahjonesconsulting.com",
  };
}
