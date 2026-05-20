// app/(foyer)/page.tsx
//
// Tier X — "Three rooms" home.
//
// Restructure from 7 polite sections to 3 dramatic rooms:
//
//   ROOM 1 — Foyer (Hero, paper background)
//     Editorial top-strip + mark drawing + word-by-word hero reveal +
//     subline + currently-building specimen + tail affordance.
//
//   ROOM 2 — Library (Selected Work, bone background)
//     Section eyebrow + tagline + 4 massive case-study cards stacked
//     vertically, each with index, title, dek, meta, and per-case
//     accent rule. Hover transforms each card (scale + dek slide).
//
//   ROOM 3 — Viewing booth (Contact, obsidian background — theater color)
//     Single massive question, single email link, reply commitment.
//     Foreshadows the theater mode you enter on a case-study click.
//
// Cut from previous: portrait poster section, currently-building
// stand-alone section, work-with-me teaser, contact CTA. Their content
// either moves to the relevant /page or is absorbed into a room above.
//
// Source: blueprint §6, §7, §8; aggressive aesthetic rework per user
// direction (Apple / Anthropic / Cav Empt level of confidence).
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ViewTransitionLink } from "@/components/view-transition-link";
import { EditorialStrip } from "@/components/EditorialStrip";
import { getSelectedWork } from "@/lib/case-studies";
import { HandUnderline } from "@/components/hand/HandUnderline";
import { HandCircle } from "@/components/hand/HandCircle";
import { HandArrow } from "@/components/hand/HandArrow";
import { Signature } from "@/components/hand/Signature";

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

// Hero rewrite: contrast + punchline. Line 1 sets the buyer's actual
// pain (sales vs product split). Line 2 owns it. Two-sentence hit at
// 5-second scan velocity.
const HERO_WORDS = [
  "Sales",
  "and",
  "product",
  "disagree",
  "about",
  "everything.",
  "I",
  "do",
  "both",
  "halves.",
];
const HERO_BREAK_AT = 6; // index where line 1 ends and indented line 2 begins

export default async function FoyerHomePage() {
  const selected = await getSelectedWork(4);

  return (
    <div className="home-rooms">
      {/* ====== ROOM 1 — FOYER (HERO) ============================== */}
      <section className="home-room home-room--hero" data-room="foyer">
        {/* Tier Z+ — Asymmetric hero composition. Setup on top, punchline
            indented. Editorial strip removed per user feedback (was
            small-font noise above the hero, not earning its presence). */}
        <h1
          className="home-hero"
          aria-label="Sales and product disagree about everything. I do both halves."
        >
          <span className="home-hero__line">
            {HERO_WORDS.slice(0, HERO_BREAK_AT).map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="home-hero__word"
                style={{ ["--word-i"]: i } as CSSProperties}
                aria-hidden
              >
                {word}
              </span>
            ))}
          </span>
          <span className="home-hero__line home-hero__line--indent">
            {HERO_WORDS.slice(HERO_BREAK_AT).map((word, i) => (
              <span
                key={`${word}-${i + HERO_BREAK_AT}`}
                className="home-hero__word"
                style={{ ["--word-i"]: i + HERO_BREAK_AT } as CSSProperties}
                aria-hidden
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        <p
          className="home-hero-subline"
          style={{ ["--word-i"]: 12 } as CSSProperties}
        >
          Operator-for-hire. Solo since 2024. Oakland.
        </p>

        <p
          className="home-hero-currently"
          style={{ ["--word-i"]: 14 } as CSSProperties}
        >
          <span className="home-hero-currently__eyebrow">Now</span>
          <span className="home-hero-currently__statement">
            building <em>ORDANI</em> — HIPAA-grade software for the doulas keeping
            Black women alive in childbirth.
          </span>
        </p>

        <div
          className="home-hero-tail"
          style={{ ["--word-i"]: 17 } as CSSProperties}
          aria-hidden
        >
          <span className="home-hero-tail__rule" />
          <span className="home-hero-tail__hint">proof below</span>
          <span className="home-hero-tail__arrow">↓</span>
        </div>

        {/* Tier Final — Hand-signed signature at end of foyer hero.
            Draws itself in 1.6s after page load. Replaces "made by a
            template" with "made by a person." */}
        <div
          className="home-hero-signature"
          style={{ ["--word-i"]: 19 } as CSSProperties}
        >
          <Signature height={42} delay={1.6} />
          <span className="home-hero-signature__caption">
            Hand-set 2026, Oakland CA
          </span>
        </div>
      </section>

      {/* ====== ROOM 2 — PLATE OF PROOF ============================ */}
      <section
        className="home-room home-room--proof scroll-reveal"
        data-room="proof"
        data-reveal
      >
        <div className="proof-plate">
          <p className="proof-plate__eyebrow">
            <span className="proof-plate__eyebrow-num">01</span>
            <span className="proof-plate__eyebrow-sep" aria-hidden />
            <span>Recent proof</span>
          </p>

          {/* Tier Final — Hand-drawn circle around $150K + hand-arrow
              from a margin note. The stat container is positioned
              relative so the absolute-circle sits over the number. */}
          <div className="proof-plate__stat-container">
            <p
              className="proof-plate__stat"
              data-shadow="$150K"
              aria-label="$150K — average deal-size move at Guardicore"
            >
              $150K
            </p>
            <HandCircle delay={0.4} variant={1} />
            <span className="proof-plate__marginalia" aria-hidden>
              <HandArrow direction="down-right" delay={1.0} />
              <em>actual rev impact</em>
            </span>
          </div>

          <p className="proof-plate__caption">
            I rewrote <strong>one sentence</strong> at Guardicore. Average deal
            size moved $150K. Akamai bought us shortly after.
          </p>
          <p className="proof-plate__provenance">
            Guardicore / Akamai · 2020 · Positioning research
          </p>
        </div>
      </section>

      {/* ====== ROOM 3 — LIBRARY (WORK) ============================ */}
      <section
        className="home-room home-room--library scroll-reveal"
        data-room="library"
        data-reveal
      >
        <header className="library-heading">
          <EditorialStrip lot="LOT 002" items={["Selected Work", "Four ships"]} />
          <h2 className="library-pillar">
            Selected work.
            <span className="library-pillar__underline" aria-hidden>
              <HandUnderline variant={2} delay={0.3} />
            </span>
          </h2>
        </header>

        <ul className="library-shelf">
          {selected.map((study, i) => (
            <li
              key={study.slug}
              className="library-shelf-card"
              data-case={study.slug}
            >
              <ViewTransitionLink
                href={`/work/${study.slug}`}
                className="library-shelf-card__link"
              >
                <div className="library-shelf-card__main">
                  <span className="library-shelf-card__index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="library-shelf-card__body">
                    <h3 className="library-shelf-card__title">{study.title}</h3>
                    <p className="library-shelf-card__dek">{study.dek}</p>
                  </div>
                </div>
                <div className="library-shelf-card__meta">
                  <span className="library-shelf-card__meta-item">
                    {study.year}
                  </span>
                  <span className="library-shelf-card__meta-dot">·</span>
                  <span className="library-shelf-card__meta-item">
                    {study.role}
                  </span>
                  <span className="library-shelf-card__meta-dot">·</span>
                  <span className="library-shelf-card__meta-item">
                    {study.status}
                  </span>
                  <span className="library-shelf-card__arrow" aria-hidden>
                    ↗
                  </span>
                </div>
              </ViewTransitionLink>
            </li>
          ))}
        </ul>

        <p className="library-cta">
          <ViewTransitionLink href="/work" className="foyer-link">
            → all work
          </ViewTransitionLink>
        </p>
      </section>

      {/* ====== ROOM 4 — VIEWING BOOTH (CONTACT) =================== */}
      <section
        className="home-room home-room--booth scroll-reveal"
        data-room="booth"
        data-reveal
      >
        <EditorialStrip
          lot="LOT 003"
          items={["Contact", "Two-day reply"]}
        />

        <h2 className="booth-question">Something stuck in your funnel?</h2>

        <p className="booth-answer">
          <span className="booth-link-wrap">
            <ViewTransitionLink href="/contact" className="booth-link">
              Write to me
            </ViewTransitionLink>
            <span className="booth-link__hand-underline" aria-hidden>
              <HandUnderline
                variant={3}
                color="var(--color-indigo)"
                delay={0.4}
              />
            </span>
          </span>
          <span className="booth-arrow" aria-hidden>
            ↗
          </span>
        </p>

        <p className="booth-commitment">
          I read every message and reply inside two business days. Or write
          directly:{" "}
          <a
            href="mailto:hello@micahjonesconsulting.com"
            className="booth-mailto"
          >
            hello@micahjonesconsulting.com
          </a>
        </p>
      </section>
    </div>
  );
}
