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
      {/* HERO — FOYER-03 verbatim per blueprint §8 */}
      <section className="foyer-section foyer-section--hero">
        <h1 className="foyer-hero">
          I help operators ship the work the rest of their org keeps stalling on.
        </h1>
        <p className="foyer-hero-subline">product · growth · consulting. Oakland, CA.</p>
      </section>

      {/* PORTRAIT (Phase 9). Renders public/portrait-main.jpg when present,
          placeholder PNG otherwise. See .claude/CLAUDE.md "Portrait swap"
          for the operator's swap flow. */}
      <section className="foyer-section foyer-section--portrait">
        <PortraitImage variant="main" priority />
        <hr className="copper-rule" aria-hidden />
      </section>

      {/* SELECTED WORK STRIP — three TitleCardComposition thumbnails */}
      <section className="foyer-section foyer-section--selected-work">
        <h2 className="foyer-eyebrow">selected work</h2>
        <ul className="selected-work-strip">
          {selected.map((study, i) => (
            <li key={study.slug} className="selected-work-card">
              <ViewTransitionLink
                href={`/work/${study.slug}`}
                className="selected-work-card__link"
              >
                <span className="selected-work-card__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <TitleCardComposition
                  words={study.titleCardWords}
                  caption={study.dek || study.title}
                  phase="stacked"
                />
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

      {/* ABOUT TEASER — 100-word excerpt */}
      <section className="foyer-section foyer-section--about-teaser">
        <h2 className="foyer-eyebrow">about</h2>
        <p className="foyer-teaser-body">
          I started as a positioning researcher at Guardicore (acquired by Akamai), where the
          work I did on a single message moved the average deal size up by $150K. Now I run my
          own shop in Oakland. Half consulting, half product. The product half means ORDANI,
          a HIPAA-compliant CRM I built solo for the people who keep Black women alive in
          childbirth.
        </p>
        <p className="foyer-section__cta">
          <ViewTransitionLink href="/about" className="foyer-link">
            → about
          </ViewTransitionLink>
        </p>
      </section>

      {/* WORK WITH ME TEASER — three one-liners */}
      <section className="foyer-section foyer-section--work-with-me-teaser">
        <h2 className="foyer-eyebrow">work with me</h2>
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
      <section className="foyer-section foyer-section--contact-cta">
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
