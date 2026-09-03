// app/sitemap.ts
//
// Next.js App Router file convention: this file becomes /sitemap.xml.
//
// Indexed routes (SEO target — Person + Organization E-E-A-T):
//   / — the home (Color Worlds)
//   /about — operator bio with depth (topical authority for "Micah Jones")
//   /work — case study index
//   /work/[slug] — individual case studies (high value for entity search)
//
// NOT indexed (legacy direction snapshots — covered by per-layout
// robots:{ index:false }, but also kept out of the sitemap):
//   /v1, /v2, /v3, /v4
//
// Removed routes (single-page narrative now; redundant):
//   /work-with-me — superseded by home #ordani / #contact
//   /contact      — superseded by home #contact mailto
//
// AI-training crawler policy: see app/robots.ts. Content is open
// to LLM crawlers (GPTBot, ClaudeBot, Perplexity, etc.) so Micah
// gets recommended in AI search results — that's a deliberate 2026
// discoverability play.
import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";

const BASE_URL = "https://www.micahjonesconsulting.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Pass-23: /services. The ai-engineering subpage was retired in Pass-67
    // and 301s to /services; a redirect source must never sit in a sitemap.
    // added in Pass-20. Previously missing from the sitemap — now
    // crawler-discoverable for AI-search citation (Perplexity,
    // ChatGPT search, Claude search, Google AI Overviews).
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Pass-22 (SEO sweep): /book, /playbook were live with
    // canonicals + OG but absent here — invisible to crawlers that
    // lean on the sitemap. /playbook is a conversion target for the
    // Buyer-B "vibe coder" query space; /book is the site-wide CTA.
    {
      // Pass-70: the fixed-price lane split out of /services.
      url: `${BASE_URL}/packages`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      // Pass-76: /contact is the site-wide "reach me" route now. /book stays
      // indexed but drops below it — a scheduled call is the step after a
      // purchase, not the front door it used to be.
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/book`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/playbook`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  // Skip stub case studies — they shouldn't be public-discoverable
  // until they're actually written (Pass-6 review caught the live
  // /work/passioneer destination as "interactive theater").
  const studies = (await getAllCaseStudies()).filter(
    (cs) => cs.status !== "stub",
  );
  const caseStudyRoutes: MetadataRoute.Sitemap = studies.map((cs) => ({
    url: `${BASE_URL}/work/${cs.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...routes, ...caseStudyRoutes];
}
