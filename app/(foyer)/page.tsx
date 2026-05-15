// app/(foyer)/page.tsx
//
// Phase 6 — FOYER-02 + FOYER-03. Replaces the Phase 4 stub.
//
// Renders, in order per blueprint §7:
//   1. Hero positioning sentence + subline (FOYER-03 verbatim)
//   2. Full-bleed portrait slot with copper rule below (Phase 9 fills image)
//   3. Selected-work strip — three TitleCardComposition thumbnails reading
//      content/work/*.mdx via lib/case-studies.ts (FOYER-08 supporting data)
//   4. About teaser — 100-word excerpt + → about link
//   5. Work With Me teaser — three-line summary + → work with me link
//   6. Contact CTA — single → contact line
//
// Server Component. No client state. The Home does NOT consume <TitleCard>
// (the client/GSAP version) — that would fire the signature motion three
// times on the Home, turning the move into noise. Selected-work thumbnails
// render via the static <TitleCardComposition phase="stacked">.
//
// Subline copy note: the blueprint §8 subline ends in a noun on the banned
// list (lib/banned.ts line 41 — the s-word for "answers to problems"). The
// minimal safe substitution is "consulting" — same operator-voice register,
// fits the half-consulting / half-product framing already in the About
// paragraph.
//
// Source: blueprint §7 (Home wireframe), §8 (hero copy verbatim, subline
//         adjusted for copy-lint compliance); REQUIREMENTS.md FOYER-02,
//         FOYER-03, FOYER-08; Phase 5 RESEARCH §2.1 (composition reusable
//         as static thumbnail).
import type { Metadata } from "next";
import { ViewTransitionLink } from "@/components/view-transition-link";
import { TitleCardComposition } from "@/components/TitleCardComposition";
import { PortraitImage } from "@/components/PortraitImage";
import { getSelectedWork } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Micah Jones — Oakland operator",
  description:
    "Premium two-mode portfolio for Micah Jones, Oakland-based operator. Product, growth, consulting for founders and birth-worker practices.",
  openGraph: {
    title: "Micah Jones — Oakland operator",
    description:
      "Premium two-mode portfolio for Micah Jones, Oakland-based operator. Product, growth, consulting for founders and birth-worker practices.",
    type: "website",
    url: "https://micahjonesconsulting.com",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "Micah Jones — Oakland operator",
    description:
      "Premium two-mode portfolio for Micah Jones, Oakland-based operator. Product, growth, consulting for founders and birth-worker practices.",
  },
};

export default async function FoyerHomePage() {
  const selected = await getSelectedWork(3);

  return (
    <div className="foyer-page">
      {/* HERO — FOYER-03 verbatim per blueprint §8.
          Tier H: hero text reveals word-by-word on first paint (1.4s total
          with 80ms stagger). Subline and tail follow on calculated delays.
          The word reveal is pure CSS via per-word animation-delay set with
          a CSS custom property (--word-i). Server-rendered. No client JS.
          Reduced-motion users see all words at final state immediately. */}
      <section className="foyer-section foyer-section--hero">
        <h1 className="foyer-hero foyer-hero--reveal" aria-label="I help operators ship the work the rest of their org keeps stalling on.">
          {[
            "I",
            "help",
            "operators",
            "ship",
            "the",
            "work",
            "the",
            "rest",
            "of",
            "their",
            "org",
            "keeps",
            "stalling",
            "on.",
          ].map((word, i, arr) => (
            <span
              key={`${word}-${i}`}
              className="foyer-hero__word"
              style={{ ["--word-i" as string]: i } as React.CSSProperties}
              aria-hidden
            >
              {word}
              {i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <p
          className="foyer-hero-subline foyer-hero-subline--reveal"
          style={{ ["--word-i" as string]: 15 } as React.CSSProperties}
        >
          product · growth · consulting. Oakland, CA.
        </p>
        <div
          className="foyer-hero-tail foyer-hero-tail--reveal"
          style={{ ["--word-i" as string]: 17 } as React.CSSProperties}
          aria-hidden
        >
          <span className="foyer-hero-tail__rule" />
          <span className="foyer-hero-tail__hint">selected work below</span>
          <span className="foyer-hero-tail__arrow">↘</span>
        </div>
      </section>

      {/* PORTRAIT (Phase 9). Renders public/portrait-main.jpg when present,
          placeholder PNG otherwise. See .claude/CLAUDE.md "Portrait swap"
          for the operator's swap flow. */}
      <section className="foyer-section foyer-section--portrait">
        <PortraitImage variant="main" priority />
        <hr className="copper-rule" aria-hidden />
      </section>

      {/* CURRENTLY BUILDING — specimen line that replaces the longer
          about-teaser. Single sentence, serif italic, anchored under
          the portrait poster. Tier H: the page commits to less copy
          + more cinematic rhythm. The full About lives at /about. */}
      <section
        className="foyer-section foyer-section--now-building scroll-reveal"
        data-reveal
      >
        <p className="now-building-specimen">
          <span className="now-building-specimen__eyebrow">currently</span>
          <span className="now-building-specimen__statement">
            building <em>ORDANI</em> — a HIPAA-compliant CRM for birth workers.
            Q3 2026 paid beta.
          </span>
        </p>
      </section>

      {/* SELECTED WORK STRIP — three TitleCardComposition thumbnails.
          Tier H: bigger cards with hover-reveal sub-tags. */}
      <section
        className="foyer-section foyer-section--selected-work scroll-reveal"
        data-reveal
      >
        <h2 className="foyer-eyebrow">
          <span className="foyer-eyebrow__num">01</span>
          <span className="foyer-eyebrow__sep" aria-hidden>/</span>
          <span className="foyer-eyebrow__label">selected work</span>
        </h2>
        <ul className="selected-work-strip">
          {selected.map((study, i) => (
            <li key={study.slug} className="selected-work-card" data-case={study.slug}>
              <ViewTransitionLink
                href={`/work/${study.slug}`}
                className="selected-work-card__link"
              >
                <span className="selected-work-card__rule" aria-hidden />
                <span className="selected-work-card__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <TitleCardComposition
                  words={study.titleCardWords}
                  caption={study.dek || study.title}
                  phase="stacked"
                />
                {/* Tier H — hover sub-tag emerges on card hover. Year + role +
                    status, serif italic, in the case's accent color. */}
                <span className="selected-work-card__hover-tag" aria-hidden>
                  <span className="selected-work-card__hover-year">{study.year}</span>
                  <span className="selected-work-card__hover-dot">·</span>
                  <span className="selected-work-card__hover-role">{study.role}</span>
                  <span className="selected-work-card__hover-dot">·</span>
                  <span className="selected-work-card__hover-status">{study.status}</span>
                </span>
              </ViewTransitionLink>
            </li>
          ))}
        </ul>
        <p className="foyer-section__cta">
          <ViewTransitionLink href="/work" className="foyer-link">
            → all work
          </ViewTransitionLink>
        </p>
      </section>

      {/* WORK WITH ME TEASER — three one-liners */}
      <section
        className="foyer-section foyer-section--work-with-me-teaser scroll-reveal"
        data-reveal
      >
        <h2 className="foyer-eyebrow">
          <span className="foyer-eyebrow__num">02</span>
          <span className="foyer-eyebrow__sep" aria-hidden>/</span>
          <span className="foyer-eyebrow__label">work with me</span>
        </h2>
        <ul className="engagement-summary">
          <li>
            <span className="engagement-summary__name">Strategy Sprint</span> — 2 to 4 weeks,
            one deliverable.
          </li>
          <li>
            <span className="engagement-summary__name">Embed</span> — 8 to 12 weeks,
            fractional PM or growth partner.
          </li>
          <li>
            <span className="engagement-summary__name">Build</span> — custom Next.js +
            Supabase work.
          </li>
        </ul>
        <p className="foyer-section__cta">
          <ViewTransitionLink href="/work-with-me" className="foyer-link">
            → work with me
          </ViewTransitionLink>
        </p>
      </section>

      {/* CONTACT CTA — single line */}
      <section
        className="foyer-section foyer-section--contact-cta scroll-reveal"
        data-reveal
      >
        <p className="foyer-contact-cta">
          Have something that needs shipping? Write to me.
        </p>
        <p className="foyer-section__cta">
          <ViewTransitionLink href="/contact" className="foyer-link foyer-link--bold">
            → contact
          </ViewTransitionLink>
        </p>
      </section>
    </div>
  );
}
