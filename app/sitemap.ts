// app/sitemap.ts
//
// Phase 10 — OG-03. Next.js App Router file convention: this file becomes
// /sitemap.xml automatically. We list:
//   - All five foyer routes
//   - Every case study slug (read via lib/case-studies.ts → gray-matter)
//
// Per pitfall E3 + the discoverability requirement, all routes are indexed.
// AI-training crawlers are blocked from /work/* via app/robots.ts, not via
// per-page noindex.
//
// Source: REQUIREMENTS.md OG-03; PITFALLS.md E3; Next.js sitemap.ts docs.
import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";

const BASE_URL = "https://micahjonesconsulting.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const foyerRoutes: MetadataRoute.Sitemap = [
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
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/work-with-me`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
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

  return [...foyerRoutes, ...caseStudyRoutes];
}
