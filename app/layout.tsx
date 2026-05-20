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
// Lenis + 9 fonts are scoped to root because the legacy directions
// still depend on them. Future cleanup: scope per route-group.
import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  interDisplay,
  inter,
  sourceSerif,
  instrumentSerif,
  bricolage,
  fraunces,
  geistMono,
  hankenGrotesk,
  jetbrainsMono,
} from "@/lib/fonts";
import { LenisProvider } from "@/components/LenisProvider";
import { RevealMount } from "@/components/RevealMount";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Micah Jones — Oakland operator",
    template: "%s — Micah Jones",
  },
  description:
    "Independent operator. Builds go-to-market for B2B software AND ships his own products. Two exits. Oakland.",
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
  description:
    "Independent operator based in Oakland, CA. Builds go-to-market for B2B software companies AND ships his own products. $17M+ in client revenue (2013–2023). Two exits at companies he helped build: Guardicore → Akamai (2021) and TechValidate → SurveyMonkey (2015). Currently building Ordani.",
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
  description:
    "A HIPAA-grade system of record for birth workers — built end to end by Micah Jones. In live beta with 14 doula practices keeping Black mothers alive in childbirth.",
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
      className={`${interDisplay.variable} ${inter.variable} ${sourceSerif.variable} ${instrumentSerif.variable} ${bricolage.variable} ${fraunces.variable} ${geistMono.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
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
