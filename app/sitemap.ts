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

const BASE_URL = "https://micahjonesconsulting.com";

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
  ];

  const studies = await getAllCaseStudies();
  const caseStudyRoutes: MetadataRoute.Sitemap = studies.map((cs) => ({
    url: `${BASE_URL}/work/${cs.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...routes, ...caseStudyRoutes];
}
