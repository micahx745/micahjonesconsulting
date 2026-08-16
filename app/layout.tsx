// app/layout.tsx
//
// Root layout — fonts, LenisProvider, ViewTransition, JSON-LD Person +
// Organization schemas, default metadata.
//
// EditorialTimestamp was REMOVED from root — it now mounts inside the
// individual legacy route-group layouts (/v1, /v2, /v3, /v4) where it
// actually belongs. Keeping it in the root + hiding via CSS leaked the
// "Oakland · May 2026 · Issue 01" text into Color Worlds SSR HTML.
//
// Pass-37 (operator: "delete"): the /v1-/v4 legacy directions are gone,
// and with them the six fonts only they used. The root now loads the
// THREE system faces — Bricolage (display), Hanken (body), JetBrains
// Mono (labels) — which is the full R1 clear: nothing else ships.
import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { bricolage, hankenGrotesk, jetbrainsMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/LenisProvider";
import { RevealMount } from "@/components/RevealMount";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Micah Jones — Oakland operator",
    template: "%s — Micah Jones",
  },
  description:
    "Independent operator in Oakland. $20M+ in client revenue. Three companies I helped build reached an exit (Akamai, SurveyMonkey IPO, Nordic Semiconductor). Now building Ordani — HIPAA-grade practice management used by 200 birth workers.",
  metadataBase: new URL("https://www.micahjonesconsulting.com"),
  alternates: {
    canonical: "https://www.micahjonesconsulting.com",
  },
};

// theme-color matches the terracotta hero so mobile system chrome
// blends into the brand at first paint.
export const viewport: Viewport = {
  themeColor: "#9E3C25",
};

/**
 * Person + Organization JSON-LD for SEO + AI entity recognition.
 *
 * Carries the most-cited facts about Micah so Google's Knowledge Graph
 * and LLM tools (Perplexity, ChatGPT search, Claude search) have a
 * canonical, machine-readable entity to attribute statements to.
 *
 * TODO — operator follow-up:
 *   - Confirm linkedin.com handle (currently a sensible default).
 *   - Add github / twitter sameAs if those exist.
 */
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Micah Jones",
  url: "https://www.micahjonesconsulting.com",
  jobTitle: "Independent operator",
  // Pass-21 (Claude Chat audit): compressed from 60+ words to 38.
  // AI crawlers (Perplexity, ChatGPT search, Claude search) cite the
  // first 40-50 words of a description field — the most important
  // facts now land first. "AND" in all-caps was a formatting artifact
  // that shouldn't appear in machine-readable metadata.
  description:
    "Oakland-based independent operator. $20M+ in client revenue (2013–2023). Exits at Guardicore (Akamai, 2021) and SurveyMonkey Enterprise (IPO, 2018). Building Ordani: HIPAA-grade practice management for doulas and midwives.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oakland",
    addressRegion: "CA",
    addressCountry: "US",
  },
  knowsAbout: [
    "Go-to-market strategy",
    "Product building",
    "Product launches",
    "Growth systems",
    "B2B software",
    "Positioning research",
    "HIPAA software",
  ],
  // Person.worksFor without a dedicated org domain. The Ordani case
  // study lives at /work/ordani but that's NOT Ordani's homepage —
  // Schema.org Organization.url expects the entity's actual site.
  // Until Ordani has its own domain, describe the relationship as
  // a foundedOf claim referencing the case study, not as a separate
  // Organization with a misleading url.
  worksFor: {
    "@type": "Organization",
    name: "Ordani",
  },
  // alumniOf lists companies where the operator was actually employed
  // (including by acquisition). Akamai and SurveyMonkey are referenced
  // in the description as deal context, not as alumni — listing them
  // here would imply a separate tenure that wasn't the work claim.
  alumniOf: [
    { "@type": "Organization", name: "Guardicore" },
    { "@type": "Organization", name: "TechValidate" },
    { "@type": "Organization", name: "Flexport" },
    { "@type": "Organization", name: "Cuebiq" },
    { "@type": "Organization", name: "Postmates" },
  ],
  sameAs: ["https://www.linkedin.com/in/micah-j/"],
};

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ordani",
  // url intentionally omitted — ordani.com is currently a domain-sale
  // parking page; pointing schema at it would mislead Knowledge Graph
  // + LLM crawlers. mainEntityOfPage (below) carries the canonical
  // reference to the case study until Ordani has its own production site.
  description:
    "Ordani is HIPAA-grade practice management software for birth workers — doulas, midwives, and perinatal counselors. Built end to end by Micah Jones. Used by 200 birth workers.",
  // mainEntityOfPage points at the case study (the only public page
  // about Ordani right now). Avoids putting a case-study URL in the
  // Organization.url slot, which expects the org's actual site.
  mainEntityOfPage: "https://www.micahjonesconsulting.com/work/ordani",
  founder: { "@type": "Person", name: "Micah Jones" },
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Oakland",
      addressRegion: "CA",
      addressCountry: "US",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LenisProvider>
          <ViewTransition>{children}</ViewTransition>
        </LenisProvider>
        <RevealMount />
        <Analytics />
        <SpeedInsights />
        {/* JSON-LD — Person + Organization. SEO + AI entity recognition. */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }}
        />
      </body>
    </html>
  );
}
