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
  metadataBase: new URL("https://micahjonesconsulting.com"),
  alternates: {
    canonical: "https://micahjonesconsulting.com",
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
  url: "https://micahjonesconsulting.com",
  jobTitle: "Independent operator",
  description:
    "Independent operator based in Oakland, CA. Builds go-to-market for B2B software companies AND ships his own products. $17M+ in client revenue moved 2013–2023. Contributed to two acquisitions: Guardicore → Akamai and TechValidate → SurveyMonkey. Currently building Ordani.",
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
  worksFor: {
    "@type": "Organization",
    name: "Ordani",
    url: "https://micahjonesconsulting.com/work/ordani",
  },
  alumniOf: [
    { "@type": "Organization", name: "Guardicore" },
    { "@type": "Organization", name: "Akamai" },
    { "@type": "Organization", name: "TechValidate" },
    { "@type": "Organization", name: "SurveyMonkey" },
    { "@type": "Organization", name: "Flexport" },
    { "@type": "Organization", name: "Cuebiq" },
    { "@type": "Organization", name: "Postmates" },
  ],
  sameAs: [
    // TODO — verify exact LinkedIn handle.
    "https://www.linkedin.com/in/micahjones/",
  ],
};

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ordani",
  description:
    "A live-beta system of record for an underserved, regulated industry — built end to end by Micah Jones and already in the hands of real users.",
  url: "https://micahjonesconsulting.com/work/ordani",
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
