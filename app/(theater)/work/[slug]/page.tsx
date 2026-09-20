// app/(theater)/work/[slug]/page.tsx
//
// Pass-120, Direction B: curtain, then page. A dark band names the client, the
// title, the dek and the result, with the photograph where one exists. The body
// turns to paper through data-surface="paper" (app/globals.css, "PASS-120 STUDY
// TEMPLATE"). One Next entry and All work close the page. The title's settle
// entrance is components/TitleCard.tsx.
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TitleCard } from "@/components/TitleCard";
import { CaseStudyReadTracker } from "@/components/CaseStudyReadTracker";
import { ViewTransitionLink } from "@/components/view-transition-link";
import { titleCardSchema } from "@/lib/title-card-schema";
import { findTitleFigure, splitLeadPhrase } from "@/lib/title-figure";
import { SERVICE_LABELS } from "@/lib/case-study-schema";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getNextCaseStudy,
  isPublished,
} from "@/lib/case-studies";

// Studies whose Results lead carries the poster role when the title itself
// has no figure (twin of the same-named constant in app/(foyer)/work/
// page.tsx). ORDANI is excluded by the 2026-09-19 ruling: no figure, no
// poster.
const POSTER_PHRASE_SLUGS = new Set(["birth-worker"]);

// The study whose band photo plays the Tel Aviv clip once (Stage 3).
const BAND_CLIP_SLUG = "guardicore";

export async function generateStaticParams() {
  const all = await getAllCaseStudies();
  // Persona review 2026-09-03: stubs were included here, so /work/passioneer
  // prerendered as a notFound() shell and SERVED AN EMPTY <body> - the "404 /
  // That page isn't here" copy existed only in the client payload, so a reader
  // with scripts off, and any crawler that does not run JS, got a blank page.
  // getCaseStudyBySlug already returns null for stubs, so listing them here
  // only ever produced that shell.
  return all.filter(isPublished).map((cs) => ({ slug: cs.slug }));
}

// false, so an unknown slug (including a stub) serves the real static 404 at
// app/not-found.tsx, which ships complete HTML. With this true, every unknown
// slug rendered the same empty streaming shell described above.
export const dynamicParams = false;

// <meta>, OG and Twitter description. The full dek when it fits in 155
// chars. Otherwise the whole sentences that fit (at least 100 chars, so a
// two-sentence dek never shrinks to a stub), or, when the first sentence
// alone runs long, a cut at the last word boundary plus an ellipsis. Never
// a cut mid-word: the old slice(0, 152) shipped "...for North American
// en..." as the Guardicore search snippet (site copy review 2026-09-02, #16).
function clampDescription(dek: string): string {
  if (dek.length <= 155) return dek;
  const sentenceEnd = dek.slice(0, 156).lastIndexOf(". ");
  if (sentenceEnd >= 100) return dek.slice(0, sentenceEnd + 1);
  const cut = dek.slice(0, 152);
  const wordEnd = cut.lastIndexOf(" ");
  const words = cut.slice(0, wordEnd > 0 ? wordEnd : 152);
  return `${words.replace(/[,;:]+$/, "")}...`;
}

// Per-route metadata for /work/[slug]. The root layout's title template
// ("%s — Micah Jones") supplies the brand suffix — we just pass the
// case study title here. Description: see clampDescription above.
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
  const description = clampDescription(cs.description);
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

  // The band's poster when the title carries no figure of its own: the
  // Results lead split around the entry's figurePhrase (lib/title-figure.ts).
  // null on every titled study (TitleCard renders their poster) and on
  // ORDANI (no figure at all).
  const poster =
    findTitleFigure(cs.titleLines) === -1 &&
    POSTER_PHRASE_SLUGS.has(slug) &&
    cs.entry.figurePhrase
      ? splitLeadPhrase(cs.results.lead, cs.entry.figurePhrase)
      : null;

  const mod = await import(`@/content/work/${slug}.mdx`);
  const MDXContent = mod.default;

  const next = await getNextCaseStudy(slug);

  const ARTICLE_LD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.description,
    datePublished: cs.publishedAt,
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
    <article className="cs" data-case={slug}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }}
      />
      <CaseStudyReadTracker slug={slug} />

      <header className="cs-band">
        <div className="cs-band__grid" data-photo={cs.hero ? "true" : "false"}>
          <div className="cs-band__head">
            <p className="cs-band__context">{cs.client}</p>
            <TitleCard
              {...titleCardSchema.parse({
                title: cs.title,
                lines: cs.titleLines,
              })}
            />
            {poster ? (
              <p className="cs-poster">
                <span className="cs-poster__lead">{poster.lead}</span>{" "}
                <span className="cs-num cs-num--words">{poster.poster}</span>
                {poster.after ? (
                  <>
                    {" "}
                    <span className="cs-poster__lead">{poster.after}</span>
                  </>
                ) : null}
              </p>
            ) : null}
          </div>

          <div className="cs-band__text">
            <p className="cs-band__dek">{cs.dek}</p>
            <dl className="cs-glance">
              <div className="cs-glance__row">
                <dt>Client</dt>
                <dd>
                  {cs.client}
                  {cs.clientNameProtected ? (
                    <>
                      {" "}
                      <span className="cs-glance__protected">
                        Name protected
                      </span>
                    </>
                  ) : null}
                </dd>
              </div>
              {cs.atAGlance.map((row) => (
                <div className="cs-glance__row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
              <div className="cs-glance__row">
                <dt>Results</dt>
                <dd>
                  {poster ? null : (
                    <>
                      <span className="cs-glance__result">
                        {cs.results.lead}
                      </span>{" "}
                    </>
                  )}
                  <span className="cs-glance__result-rest">
                    {cs.results.rest}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {cs.hero ? (
            <div className="cs-band__media">
              <Image
                src={cs.hero.src}
                width={cs.hero.width}
                height={cs.hero.height}
                alt={cs.hero.alt}
                preload
                sizes="(min-width: 1024px) 405px, calc(100vw - 32px)"
                className="cs-band__img"
              />
            </div>
          ) : null}
        </div>
      </header>

      <div className="cs-page" data-surface="paper">
        <div className="cs-body">
          <MDXContent />
          <p className="cs-close">
            <ViewTransitionLink
              href={`/services#${cs.service}`}
              className="cs-close__link"
            >
              {SERVICE_LABELS[cs.service]}
              <span aria-hidden="true"> →</span>
            </ViewTransitionLink>
          </p>
        </div>

        <nav className="cs-next" aria-labelledby="cs-next-label">
          <p className="cs-next__label" id="cs-next-label">
            Next
          </p>
          {next ? (
            <ViewTransitionLink
              href={`/work/${next.slug}`}
              className="cs-next__entry"
            >
              <span className="cs-next__context">{next.entry.context}</span>{" "}
              <span className="cs-next__line">
                {next.entry.figure
                  ? `${next.entry.figure} ${next.entry.line}`
                  : next.entry.line}
              </span>{" "}
              <span className="cs-next__did">{next.entry.did}</span>{" "}
              <span className="cs-next__service">
                {SERVICE_LABELS[next.service]}
              </span>
            </ViewTransitionLink>
          ) : null}
          <ViewTransitionLink href="/work" className="cs-next__all">
            All work
          </ViewTransitionLink>
        </nav>
      </div>
    </article>
  );
}
