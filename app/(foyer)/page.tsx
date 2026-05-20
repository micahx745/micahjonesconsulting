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

const HERO_WORDS = [
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
];

export default async function FoyerHomePage() {
  const selected = await getSelectedWork(4);

  return (
    <div className="home-rooms">
      {/* ====== ROOM 1 — FOYER (HERO) ============================== */}
      <section className="home-room home-room--hero" data-room="foyer">
        <EditorialStrip lot="LOT 001" items={["2026", "Oakland", "Issue 01"]} />

        {/* Tier Z — Asymmetric hero composition. Top line anchored left,
            bottom line indented. Reads as composed, not flowed. */}
        <h1
          className="home-hero"
          aria-label="I help operators ship the work the rest of their org keeps stalling on."
        >
          <span className="home-hero__line">
            {HERO_WORDS.slice(0, 4).map((word, i) => (
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
            {HERO_WORDS.slice(4).map((word, i) => (
              <span
                key={`${word}-${i + 4}`}
                className="home-hero__word"
                style={{ ["--word-i"]: i + 4 } as CSSProperties}
                aria-hidden
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        <p
          className="home-hero-subline"
          style={{ ["--word-i"]: 15 } as CSSProperties}
        >
          product · growth · consulting. Oakland, CA.
        </p>

        <p
          className="home-hero-currently"
          style={{ ["--word-i"]: 17 } as CSSProperties}
        >
          <span className="home-hero-currently__eyebrow">currently</span>
          <span className="home-hero-currently__statement">
            building <em>ORDANI</em> — a HIPAA-compliant CRM. Q3 2026 paid beta.
          </span>
        </p>

        <div
          className="home-hero-tail"
          style={{ ["--word-i"]: 19 } as CSSProperties}
          aria-hidden
        >
          <span className="home-hero-tail__rule" />
          <span className="home-hero-tail__hint">proof below</span>
          <span className="home-hero-tail__arrow">↓</span>
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
          <p
            className="proof-plate__stat"
            data-shadow="$150K"
            aria-label="$150K — average deal-size move at Guardicore"
          >
            $150K
          </p>
          <p className="proof-plate__caption">
            Average <strong>deal-size move</strong> at Guardicore, where I
            rewrote the single message at the top of the funnel — and the
            company was acquired by Akamai shortly after.
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
          <h2 className="library-pillar">Selected work.</h2>
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

        <h2 className="booth-question">
          Have something that needs shipping?
        </h2>

        <p className="booth-answer">
          <ViewTransitionLink href="/contact" className="booth-link">
            Write to me
          </ViewTransitionLink>
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
