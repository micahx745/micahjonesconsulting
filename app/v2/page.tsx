// app/v2/page.tsx — v2 Home (Phase 2 will populate this).
// For Phase 1, render a placeholder so the route is reachable.
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/v2/primitives/Container";
import { Section } from "@/components/v2/primitives/Section";
import { Column } from "@/components/v2/primitives/Column";
import { Reveal } from "@/components/v2/motion/Reveal";
import { HairlineDivider } from "@/components/v2/motion/HairlineDivider";
import { SplitHero } from "@/components/v2/motion/SplitHero";
import { AccentDot } from "@/components/v2/motion/AccentDot";
import { BookCallPill } from "@/components/v2/nav/BookCallPill";
import { CountUp } from "@/components/v2/motion/CountUp";

export const metadata: Metadata = {
  title: "Micah Jones — Revenue + the product that earns it",
  description:
    "Solo consultant in Oakland, CA. Builds go-to-market motion and the systems that scale it. Founder of ORDANI.",
};

const CASES = [
  {
    slug: "ordani",
    eyebrow: "Case study / 01",
    title: "ORDANI",
    summary:
      "A new system of record for birth workers. HIPAA-compliant by design.",
  },
  {
    slug: "gtm",
    eyebrow: "Case study / 02",
    title: "Tens of millions in revenue",
    summary:
      "Generated at the seam between sales and product. Anonymized engagement.",
  },
  {
    slug: "tech",
    eyebrow: "Case study / 03",
    title: "A decade adjacent to product",
    summary:
      "Sales and GTM across Guardicore, Akamai, SurveyMonkey, Flexport, Cuebiq, Postmates.",
  },
] as const;

export default function V2HomePage() {
  return (
    <>
      {/* HERO */}
      <Section className="v2-hero">
        <Container>
          <AccentDot />
          <div className="v2-editorial-strip" aria-hidden>
            <span className="v2-editorial-strip__lot">LOT 001</span>
            <span className="v2-editorial-strip__sep" />
            <span>2026</span>
            <span className="v2-editorial-strip__sep" />
            <span>Oakland</span>
          </div>
          <SplitHero
            text="Revenue, and the product that earns it."
            className="text-display-xl v2-hero__headline"
          />
          <Reveal delay={0.8}>
            <p className="text-body-lg text-secondary v2-hero__lede">
              I build go-to-market motion and the systems that scale it. Based
              in Oakland. Working with founders who need both halves.
            </p>
          </Reveal>
          <Reveal delay={1.0}>
            <div className="v2-hero__cta">
              <BookCallPill />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <HairlineDivider />
      </Container>

      {/* WORK INDEX */}
      <Section className="v2-work-index">
        <Container>
          <Reveal>
            <p className="text-caption v2-work-index__heading">Selected work</p>
          </Reveal>
          <ul className="v2-work-index__list">
            {CASES.map((cs) => (
              <li key={cs.slug} className="v2-work-card">
                <Reveal as="div">
                  <Link
                    href={`/v2/work/${cs.slug}`}
                    className="v2-work-card__link"
                  >
                    <p className="text-caption v2-work-card__eyebrow">
                      {cs.eyebrow}
                    </p>
                    <h2 className="text-display-md v2-work-card__title">
                      {cs.title}
                    </h2>
                    <p className="text-body-lg text-secondary v2-work-card__summary">
                      {cs.summary}
                    </p>
                    <span className="text-caption v2-work-card__read">
                      Read <span aria-hidden>→</span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Container>
        <HairlineDivider />
      </Container>

      {/* ABOUT EXCERPT */}
      <Section className="v2-about-excerpt">
        <Container>
          <Column className="v2-about-excerpt__column">
            <Reveal>
              <p className="text-caption">About</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-display-md v2-about-excerpt__lede">
                <em>I work at the seam between sales and product.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg text-secondary v2-about-excerpt__body">
                Ten years adjacent to product, in inside sales and go-to-market.
                Now solo — half consulting, half product. The product half is
                ORDANI.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link href="/v2/about" className="v2-inline-link">
                Read more <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </Column>
        </Container>
      </Section>

      {/* STATS ROW */}
      <Section className="v2-stats-row">
        <Container>
          <ul className="v2-stats-row__list">
            <li className="v2-stats-row__item">
              <p className="text-display-md v2-stats-row__value">
                <CountUp value="10+" />
              </p>
              <p className="text-caption v2-stats-row__label">Years tech</p>
            </li>
            <li className="v2-stats-row__item">
              <p className="text-display-md v2-stats-row__value">
                <CountUp value="$10s of millions" />
              </p>
              <p className="text-caption v2-stats-row__label">
                Revenue generated
              </p>
            </li>
            <li className="v2-stats-row__item">
              <p className="text-display-md v2-stats-row__value">
                <CountUp value="Sales ↔ Product" />
              </p>
              <p className="text-caption v2-stats-row__label">The seam</p>
            </li>
          </ul>
        </Container>
      </Section>

      {/* CLOSING CTA */}
      <Section className="v2-closing-cta">
        <Container>
          <Reveal>
            <h2 className="text-display-lg v2-closing-cta__line">
              <em>Book a 30-minute intro call.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="v2-closing-cta__pill">
              <BookCallPill />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
