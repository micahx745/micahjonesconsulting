// app/layout.tsx
//
// Root layout — fonts, LenisProvider, ViewTransition, JSON-LD Person +
// Organization schemas, default metadata.
//
// EditorialTimestamp (the "Oakland · Month Year · Issue 01" mark) was deleted
// on 2026-09-16 (operator: "delete the dead EditorialTimestamp component"):
// nothing had mounted it since the /v1-/v4 layouts went in Pass-37.
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
import "./globals.css";

export const metadata: Metadata = {
  title: {
    // Fallback title for any page that exports none. Was "Oakland operator",
    // a leftover of the strap removed 2026-09-02; the city still lives in the
    // JSON-LD addressLocality below, which is where a machine looks for it.
    default: "Micah Jones — independent operator",
    template: "%s — Micah Jones",
  },
  description:
    "Independent operator in Oakland. Four exits behind my work: Postmates, SurveyMonkey IPO, Guardicore, Neuton.AI. $5B+ combined. $20M+ in revenue behind my work. Now building Ordani, HIPAA-compliant practice management in beta with active paying users.",
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
    "Oakland-based independent operator. Four exits behind his work: Postmates (Uber, 2020), SurveyMonkey (IPO, 2018), Guardicore (Akamai, 2021), Neuton.AI (Nordic Semiconductor, 2025). $20M+ in revenue behind his work. Building Ordani: HIPAA-compliant practice management for doulas and midwives.",
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
    { "@type": "Organization", name: "SurveyMonkey" },
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
    "Ordani is HIPAA-compliant practice management software for birth workers — doulas, midwives, and perinatal counselors. Built end to end by Micah Jones. In beta with active paying users.",
  // Pass-121 A5: mainEntityOfPage dropped. The ORDANI case study's own Article
  // JSON-LD (app/(theater)/work/[slug]/page.tsx) already names that page as
  // its mainEntityOfPage, so this Organization block does not need to repeat
  // the reference.
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
        {/* RevealMount DELETED (Wave 0): it observed [data-reveal], an
            attribute that exists nowhere in the tree — dead code since
            the Color Worlds migration. ScrollReveal (per-page, .cw-reveal
            -> .is-in) is the one reveal system. */}
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
