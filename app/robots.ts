// app/robots.ts
//
// Phase 10 — OG-04. Next.js App Router file convention: this file becomes
// /robots.txt automatically.
//
// Per pitfall E3:
//   - Googlebot is explicitly allowed everywhere (do NOT noindex ORDANI).
//   - AI-training crawlers (GPTBot, Google-Extended, CCBot, ClaudeBot,
//     anthropic-ai) are disallowed from /work/* — Micah's case-study
//     content is not training data without explicit opt-in.
//   - Everything else gets the permissive default.
//
// Sitemap is referenced so Googlebot picks up new case studies promptly.
//
// Source: REQUIREMENTS.md OG-04; PITFALLS.md E3; Next.js robots.ts docs.
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        disallow: "/work/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/work/",
      },
      {
        userAgent: "CCBot",
        disallow: "/work/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/work/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/work/",
      },
    ],
    sitemap: "https://micahjonesconsulting.com/sitemap.xml",
    host: "https://micahjonesconsulting.com",
  };
}
