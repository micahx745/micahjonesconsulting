// app/(theater)/work/[slug]/page.tsx
//
// Phase 7 — THEATER-04 render order. Replaces the Phase 4 stub.
//
// Render order per blueprint §9 ORDANI wireframe:
//   1. TitleCard (frontmatter.titleCardWords + frontmatter.dek + heroStill?)
//   2. Dek (frontmatter.dek rendered separately for the case where the
//      MDX body wants additional Source Serif 4 italic emphasis under the
//      TitleCard's own resolved caption — blueprint §9 keeps these distinct
//      in the wireframe)
//   3. Hero still (frontmatter.heroStill, if present, via CaseStudyStill)
//   4. MDX body (Problem → Why → Approach → What it became → Outcome → PullQuote)
//   5. Footer nav ([NEXT WORK ↘] [BACK TO FOYER ↗])
//
// Pattern: hybrid per ARCHITECTURE §7.2 — gray-matter for frontmatter (in
// lib/case-studies.ts), dynamic import() for the rendered MDX body.
//
// Source: REQUIREMENTS.md THEATER-04; blueprint §9 wireframe; ARCHITECTURE
// §7.1 + §7.2.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TitleCard } from "@/components/TitleCard";
import { Dek } from "@/components/Dek";
import { CaseStudyStill } from "@/components/CaseStudyStill";
import { CaseStudyReadTracker } from "@/components/CaseStudyReadTracker";
import { CaseStudySidebar } from "@/components/CaseStudySidebar";
import { ViewTransitionLink } from "@/components/view-transition-link";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getNextCaseStudy,
} from "@/lib/case-studies";

export async function generateStaticParams() {
  const all = await getAllCaseStudies();
  return all.map((cs) => ({ slug: cs.slug }));
}

// Allow dynamic params during dev for the Phase 7 test slug. Phase 8 case
// studies will be statically generated via the params above.
export const dynamicParams = true;

// Per-route metadata for /work/[slug]. The root layout's title template
// ("%s — Micah Jones") supplies the brand suffix — we just pass the
// case study title here. Description clamped to ~155 chars with ellipsis.
//
// Don't manually append " — Micah Jones" to the title; that's what the
// template does. The previous version did both, producing the bug
// "title — Micah Jones — Micah Jones" on every case study page.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return { title: "Not found" };

  // Case study titles should be ≤45 chars so they survive template +
  // SERP truncation. If a title is longer, it was authored too long —
  // fix in MDX frontmatter, not by clamping at runtime.
  const title = cs.title;
  const description =
    cs.dek.length <= 155 ? cs.dek : `${cs.dek.slice(0, 152).trimEnd()}...`;
  const url = `https://www.micahjonesconsulting.com/work/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${cs.title} — Micah Jones`,
      description,
      type: "article",
      url,
      siteName: "Micah Jones",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.title} — Micah Jones`,
      description,
    },
  };
}

export default async function TheaterCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  // Dynamic import of the MDX body. The frontmatter is already validated
  // by getCaseStudyBySlug() above (via lib/case-studies.ts → Zod schema).
  // Per ARCHITECTURE §7.2 Pattern A — let @next/mdx handle the MDX → React
  // compilation, we just consume the default export.
  const mod = await import(`@/content/work/${slug}.mdx`);
  const MDXContent = mod.default;

  const next = await getNextCaseStudy(slug);

  // Pass-23 (SEO): Article JSON-LD for AI-search citation + Google
  // article-rich-result eligibility. Headline + author + description
  // + datePublished extracted from frontmatter. frontmatter.year may
  // be a range ("2024-2025"); we take the start year, which is valid
  // ISO 8601 (YYYY) for datePublished. Author + publisher both Micah
  // Jones (Person) to match the home Person LD pattern.
  const yearStr =
    typeof cs.year === "string" ? cs.year : String(cs.year);
  const startYear = yearStr.split("-")[0].trim();
  const ARTICLE_LD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.dek,
    datePublished: startYear,
    author: {
      "@type": "Person",
      name: "Micah Jones",
      url: "https://www.micahjonesconsulting.com",
    },
    publisher: {
      "@type": "Person",
      name: "Micah Jones",
      url: "https://www.micahjonesconsulting.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.micahjonesconsulting.com/work/${slug}`,
    },
  };

  return (
    <article className="case-study" data-case={slug}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }}
      />
      {/* Tier C — data-case attribute scopes --case-accent to this case
          study's secondary color. The accent flows into the dek meta line,
          locked-still rules, pull quote, and any other element that reads
          var(--case-accent). Outside this scope it falls back to copper. */}
      {/* Phase 10 — ANALY-02. Tracks 90% scroll depth and fires
          case_study_read_complete once per session. */}
      <CaseStudyReadTracker slug={slug} />

      {/* 1. TitleCard — the signature motion (Phase 5 client wrapper) */}
      <TitleCard
        words={cs.titleCardWords}
        caption={cs.dek}
        heroSrc={cs.heroStill}
        heroAlt={cs.title}
      />

      {/* Pass-22 (CW-18 Slice 1): asymmetric two-column grid wrapping
          the header, hero still, body, AND a sticky sidebar. At
          >=1024px: column 2 carries the editorial content (Dek + still
          + body) at the 64ch measure; column 3 carries the sidebar
          (TOC + reading progress + meta). At <1024px: single column;
          sidebar hides via CSS; the header's meta-fallback element
          shows below the Dek. Closes Marcus's Pass-19 "40% void"
          complaint by giving the empty right column designed content. */}
      <div className="case-study__layout">
        <header className="case-study__header">
          <Dek>{cs.dek}</Dek>
          {/* Mobile + no-JS fallback. Hidden at >=1024px when JS
              confirms the sidebar is wired (toggled by globals.css
              against the .cw-js-reveals root class). Reuses the
              existing .case-study__meta layout. */}
          <p className="case-study__header-meta-fallback case-study__meta">
            <span className="case-study__role">{cs.role}</span>
            <span className="case-study__dot" aria-hidden="true">
              ·
            </span>
            <span className="case-study__tools">{cs.tools.join(", ")}</span>
            <span className="case-study__dot" aria-hidden="true">
              ·
            </span>
            <span className="case-study__year">{cs.year}</span>
          </p>
        </header>

        {/* 3. Hero still (optional — frontmatter.heroStill) */}
        {cs.heroStill ? (
          <CaseStudyStill
            src={cs.heroStill}
            alt={`${cs.title} — hero still`}
            date={typeof cs.year === "string" ? cs.year : String(cs.year)}
          />
        ) : null}

        {/* 4. MDX body — Problem → Why → Approach → Outcome → PullQuote.
            Components like <CaseStudyStill> and <PullQuote> are wired
            via mdx-components.tsx at repo root (CASE-07). */}
        <div className="case-study__body">
          <MDXContent />
        </div>

        {/* Sidebar — column 3 at desktop, hidden at mobile.
            Sticky-positioned at top: 88px (clears the site nav).
            Builds its TOC client-side from .case-study__body h2s. */}
        <CaseStudySidebar role={cs.role} tools={cs.tools} year={cs.year} />
      </div>

      {/* 5. Footer nav — [NEXT WORK ↘] [← BACK TO HOME] */}
      <nav className="case-study__nav" aria-label="case study navigation">
        {next ? (
          <ViewTransitionLink
            href={`/work/${next.slug}`}
            className="case-study__nav-link"
          >
            next work ↘
          </ViewTransitionLink>
        ) : null}
        <ViewTransitionLink href="/" className="case-study__nav-link">
          ← back to home
        </ViewTransitionLink>
      </nav>
    </article>
  );
}
