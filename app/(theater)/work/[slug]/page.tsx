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

// Phase 10 — OG-02. Per-route metadata for /work/[slug]. Title is truncated
// to 60 chars and description to 155 chars (with ellipsis when needed).
// OG image route already exists at /work/[slug]/opengraph-image (Phase 5).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return { title: "Not found — Micah Jones" };

  const rawTitle = `${cs.title} — Micah Jones`;
  const title = rawTitle.length <= 60 ? rawTitle : `${rawTitle.slice(0, 57)}...`;
  const description =
    cs.dek.length <= 155 ? cs.dek : `${cs.dek.slice(0, 152).trimEnd()}...`;
  const url = `https://micahjonesconsulting.com/work/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "Micah Jones",
    },
    twitter: {
      card: "summary_large_image",
      title,
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

  return (
    <article className="case-study">
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

      {/* 2. Dek — Source Serif 4 italic subtitle (a second beat under the
          TitleCard's own resolved caption per blueprint §9 wireframe) */}
      <header className="case-study__header">
        <Dek>{cs.dek}</Dek>
        <p className="case-study__meta">
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
          Components like <CaseStudyStill> and <PullQuote> are wired via
          mdx-components.tsx at repo root (CASE-07). */}
      <div className="case-study__body">
        <MDXContent />
      </div>

      {/* 5. Footer nav — [NEXT WORK ↘] [BACK TO FOYER ↗] */}
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
          back to foyer ↗
        </ViewTransitionLink>
      </nav>
    </article>
  );
}
