// app/(foyer)/page.tsx
//
// Color Worlds home — single long-scroll. Sections set data-world on
// themselves; WorldSwitcher observes them and cross-fades the page
// palette as each crosses viewport center.
//
// Section order + worlds (Terracotta Workshop palette):
//   Hero         → terracotta (Pass-21: rotating words pipeline→position
//                              + system→engine; sub names 14 practices)
//   Marquee      → terracotta (Pass-21: verb-forward phrases — was
//                              category nouns reading as a tag cloud)
//   Revenue+exits→ terracotta (Pass-21: dek cut "Named institutional
//                              customers" — claim-without-evidence
//                              since names follow in entry bodies)
//   Clients      → bone   (Pass-20: 3-service teaser; Pass-21: still
//                          links to /services)
//   How I work   → bone   (Pass-21: NEW Operating Principles section
//                          per Claude Chat audit — missing-surface gap.
//                          Four short statements about how the work
//                          happens; gives buyers language to repeat
//                          internally when selling Micah to their CEO.)
//   Ordani       → petrol (Pass-21: lede rewritten problem-first per
//                          Claude Chat audit)
//   Shipped      → espresso (Pass-21: "Shipped." → "Work that shipped."
//                            for scanner clarity; dek cut "Real work
//                            in real users' hands" opener; Frontier
//                            AI card body sharpened to "the engineering
//                            between the model and the user")
//   Footer       → terracotta (Pass-21: "LET'S BUILD →" → "NAME THE
//                              PROBLEM →" — the operator-listening
//                              voice, not operator-pitching)
//
// Copy in the mockup is placeholder per the brief — Micah will finalize.
// "No 3D printing, no hardware, no maker content" — workshop bench is
// intentionally absent. "Don't frame Ordani as a side project" — it's
// presented as a live product with beta signup.
import type { Metadata } from "next";
import { Hero } from "@/components/color-worlds/Hero";
import { OrdaniBetaForm } from "@/components/color-worlds/OrdaniBetaForm";
import { OrdaniSticky } from "@/components/color-worlds/OrdaniSticky";
import { SplitReveal } from "@/components/color-worlds/SplitReveal";
import { RevenueTick } from "@/components/color-worlds/RevenueTick";
import { MagneticArea } from "@/components/motion/MagneticArea";

export const metadata: Metadata = {
  // Absolute title prevents the root template ("%s — Micah Jones") from
  // double-suffixing on the home page. Other routes still get the suffix.
  title: {
    absolute:
      "Micah Jones — Strategy and software, shipped by the same pair of hands",
  },
  description:
    "Independent operator in Oakland. $20M+ in client revenue. Three companies I helped build reached an exit — Akamai, SurveyMonkey IPO, and Neuton.AI → Nordic Semiconductor. Now building Ordani — HIPAA-grade practice management used by 200 birth workers.",
  alternates: { canonical: "https://www.micahjonesconsulting.com" },
  openGraph: {
    title:
      "Micah Jones — Strategy and software, shipped by the same pair of hands",
    description:
      "$20M+ in client revenue. Three companies I helped build reached an exit — Akamai, SurveyMonkey IPO, and Neuton.AI → Nordic Semiconductor. Now building Ordani — HIPAA-grade practice management used by 200 birth workers.",
    type: "website",
    url: "https://www.micahjonesconsulting.com",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Micah Jones — Strategy and software, shipped by the same pair of hands",
    description:
      "$20M+ in client revenue. Three companies I helped build reached an exit — Akamai, SurveyMonkey IPO, and Neuton.AI → Nordic Semiconductor. Now building Ordani.",
  },
};

// Pass-20 (per Lena, Pass-19 review): consolidated 4 services → 3.
// Dropped "Launches" (70% overlap with Go-to-market — demand + narrative
// + cascade is a SUBSET of GTM, not a peer). Dropped "Growth systems"
// (wrong register — reads as YC-stage performance-marketing, not as
// $200K boutique operator). Added "Frontier AI engineering" as a first-
// class service (was previously only surfaced as a Shipped card).
//
// Per-row href + proof fields dropped — the home CLIENTS section is now
// a teaser. Every row links to /services where the full scope/process/
// proof per service lives. Single section-level "See full services →"
// CTA below the row list reinforces the destination.
// Pass-23 (Claude Chat copy audit + operator review): rewrote each
// row description to lead with the buyer's pain instead of describing
// what the service IS. Target buyer: founders building with AI who
// lack the enterprise / IPO / acquisition muscle to ship at the
// procurement level. One sentence each.
const CLIENT_OFFERS = [
  {
    n: "01",
    title: "Positioning & GTM",
    desc: "You built it. Enterprise teams still aren't buying. The gap is positioning, not features.",
  },
  {
    n: "02",
    title: "End-to-end product building",
    desc: "Most AI ideas die in the gap between demo and production. I work in that gap.",
  },
  {
    n: "03",
    title: "Frontier AI engineering",
    desc: "Eval, orchestration, deployment. The shipping discipline most AI founders skip.",
  },
] as const;

// Pass-21 (Claude Chat audit): category nouns ("Go-to-market", "Product",
// "Growth", "Strategy") read as a tag cloud. Verb-forward phrases name
// specific artifacts a scrolling marquee can carry with energy. Each
// phrase now maps to a buyer-recognizable thing: research, products,
// GTM, AI work, repositioning outcomes.
const SERVICE_MARQUEE = [
  "Positioning research",
  "Shipped products",
  "Enterprise GTM",
  "AI in production",
  "Category shifts",
] as const;

export default function ColorWorldsHome() {
  return (
    <>
      {/* HERO + MARQUEE — terracotta */}
      <Hero />

      <div className="cw-marquee" data-section data-world="terracotta" data-scroll-track>
        <div className="cw-track">
          {/* Track duplicated; scroll-linked translateX(0 to -50%) reveals
              the second half cleanly (D2, operator-locked 2026-08 — no
              idle loop; see Hero.tsx's scroll-link effect for the
              [data-scroll-track] progress calc). */}
          {[0, 1].map((dupe) => (
            <span key={dupe}>
              {SERVICE_MARQUEE.map((s) => (
                <span key={`${dupe}-${s}`}>
                  {s}
                  <span className="cw-dot" aria-hidden>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* REVENUE + EXITS — terracotta. Pass-17: moved up from inside the
          CLIENTS section. The $20M+ / three exits / trillions claim is the
          credibility hook that earns the reader's attention BEFORE the
          services pitch. Terracotta world continues the hero band
          (hero → marquee → revenue all share terracotta) so the
          credibility moment reads as the closing beat of the hero. */}
      <section
        className="cw-rev-band"
        data-section
        data-world="terracotta"
        aria-labelledby="cw-rev-title"
      >
        <h2 id="cw-rev-title" className="cw-sr-only">
          Revenue and exits
        </h2>
        <RevenueTick />
      </section>

      {/* ABOUT (brief) — bone. Pass-32: short operator grounding (the
          removed hero eyebrow's identity, relocated here); full bio /about. */}
      {/* ABOUT-BRIEF section DELETED (Pass-3, attack plan §6 item 7).
          Its dek duplicated the hero thesis one screen later — and in
          the exact symmetric-pair shape D-R12 rejects ("Most consultants
          don't ship. Most builders don't sell."). /about carries the
          depth; the nav carries the route. Nothing external linked to
          #about-brief (grepped). One fewer bone section also makes each
          remaining world transition rarer and bigger, per D-R3. */}

      {/* CLIENTS — bone */}
      <section
        className="cw-block"
        id="clients"
        data-section
        data-world="bone"
        aria-labelledby="cw-clients-title"
      >
        <p className="cw-kicker cw-reveal">Services</p>
        {/* Pass-3: title cut from 16 words + an em-dash to three. The
            rows below name the engagements; a title that previews them
            is the section explaining itself twice (attack plan §7). */}
        <SplitReveal
          as="h2"
          id="cw-clients-title"
          className="cw-secttitle"
        >
          Three engagements.
        </SplitReveal>

        <ul className="cw-worklist">
          {CLIENT_OFFERS.map((row, i) => (
            <li
              key={row.n}
              className="cw-workrow cw-reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Pass-20 (per Lena, Pass-19 review): whole row wraps
                  in a single anchor to /services. The per-row case-
                  study "Proven at" links are dead — they pushed
                  buyers to case studies when this section is supposed
                  to read services-led. Now: hover any row, click any
                  row → /services. Section CTA below reinforces. */}
              <a href="/services" className="cw-workrow__link">
                <span className="cw-fill" aria-hidden />
                <span className="cw-num">{row.n}</span>
                <span className="cw-title">{row.title}</span>
                <span className="cw-desc">{row.desc}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Pass-20: section-level CTA — single destination, "See full
            services →" reads as the next step into the services pitch
            rather than into a case study. The arrow nudges right on
            hover. */}
        <div className="cw-section-cta-wrap cw-reveal">
          <a href="/services" className="cw-section-cta">
            See full services{" "}
            <span className="cw-section-cta__arr" aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* OPERATING PRINCIPLES — bone. Pass-21 (Claude Chat audit):
          new surface added per the missing-surface gap call. Sits
          between Services (what I do) and Ordani (proof I can ship),
          explaining HOW the work happens. Premium boutique pattern:
          short statements that give buyers language to repeat
          internally when they're selling the operator to their CEO. */}
      <section
        className="cw-block"
        id="how-i-work"
        data-section
        data-world="bone"
        aria-labelledby="cw-howiwork-title"
      >
        <p className="cw-kicker cw-reveal">Operating principles</p>
        <SplitReveal
          as="h2"
          id="cw-howiwork-title"
          className="cw-secttitle"
        >
          How I work.
        </SplitReveal>
        {/* Pass-27 (operator cowork review): four principles → three named
            operating loop stages (Diagnose / Build / Position). Each
            principle gets a stage name (.cw-principle__name) and a
            deliverable line (.cw-principle__artifact) in addition to
            the existing .cw-principle__text. The 1fr text column in the
            .cw-principle grid stacks the three children naturally — the
            grid rule (auto 1fr) is unchanged. Stagger stays 0/80/160ms. */}
        <ol className="cw-principles">
          <li
            className="cw-principle cw-reveal"
            style={{ transitionDelay: "0ms" }}
          >
            <p className="cw-principle__num">01</p>
            <div>
              <p className="cw-principle__name">Diagnose</p>
              <p className="cw-principle__text">
                I find the gap between what you built and what buyers
                actually pay for.
              </p>
              <p className="cw-principle__artifact">&#8594; Positioning audit memo</p>
            </div>
          </li>
          <li
            className="cw-principle cw-reveal"
            style={{ transitionDelay: "80ms" }}
          >
            <p className="cw-principle__num">02</p>
            <div>
              <p className="cw-principle__name">Build</p>
              <p className="cw-principle__text">
                Every engagement ships a named artifact in month one. No
                decks. No discovery debt.
              </p>
              <p className="cw-principle__artifact">&#8594; Shipped artifact, month one</p>
            </div>
          </li>
          <li
            className="cw-principle cw-reveal"
            style={{ transitionDelay: "160ms" }}
          >
            <p className="cw-principle__num">03</p>
            <div>
              <p className="cw-principle__name">Position</p>
              <p className="cw-principle__text">
                I stay until the narrative sells without me. The
                Guardicore repositioning carried into the Akamai
                acquisition.
              </p>
              <p className="cw-principle__artifact">&#8594; The story the market repeats</p>
            </div>
          </li>
        </ol>
      </section>

      {/* ORDANI — petrol — live product, NOT a side project.
          The h2 carries .cw-bleed — the one ink-bleed display headline
          per page, per the texture research. Giant Ordani word reads
          as pulp-ink, not pixel-text. */}
      <section
        className="cw-ordani"
        id="ordani"
        data-section
        data-world="petrol"
        aria-labelledby="cw-ordani-title"
      >
        <OrdaniSticky />
        {/* Operator correction 2026-08-15: the usage claim is birth workers,
            not practices — "14 doula practices" undersold it and read as a
            pilot. See LESSONS #3; the ledger entry was updated with it. */}
        <p className="cw-tagrow cw-reveal">
          <span className="cw-live">Live</span>
          <span>200 birth workers</span>
        </p>
        <h2 id="cw-ordani-title" className="cw-reveal cw-bleed">
          Ordani
        </h2>
        {/* Problem first, then the move, then the proof. Tightened
            2026-08-15 (mobile read): the old version ran six lines on a
            phone and spent two of them on infrastructure nouns. */}
        <p className="cw-lede cw-reveal">
          Birth workers run their practices on group chats and paper
          intakes. HIPAA is the law. <em>So I built Ordani.</em> 200 birth
          workers use it, and none have left for a competitor.
        </p>
        <p className="cw-lede-sub cw-reveal">
          {/* TODO(operator): Ordani product website is under
              construction. When the public URL ships, replace href="#"
              with the live product URL. Until then the link is inert
              and the OrdaniBetaForm below remains the primary CTA. */}
          <a href="#" className="cw-lede-link">
            Visit Ordani →
          </a>
        </p>

        <OrdaniBetaForm />

        {/* Operator 2026-08-15: the stack line ("Next.js, Supabase,
            Vercel, HIPAA-grade") is cut. Naming the stack is a builder's
            flex, not a buyer's proof — nobody evaluating Micah or Ordani
            is choosing on the framework, and it read as dev-Twitter on a
            page selling outcomes. What survives is the claim a buyer
            actually weighs: it is real, it is compliant, people use it. */}
        <p className="cw-note cw-reveal">
          Onboarding new practices weekly · HIPAA-grade
        </p>
      </section>

      {/* SHIPPED — espresso. Section rewritten per research: single-word
          header + 3-sentence dek that doubles as proof. */}
      <section
        className="cw-block"
        id="products"
        data-section
        data-world="espresso"
        aria-labelledby="cw-products-title"
      >
        {/* Pass-2 (redesign D-R14 synthesis): the card grid becomes THE
            LEDGER — the direction the operator picked across four style
            rounds. A record table reads as an audited document: the most
            credible register available to an enterprise buyer, and the
            format a procurement team forwards. Title breaks the
            abstract-noun+period drumbeat (attack plan §6 item 5) with a
            full assertion no competitor can copy. */}
        <p className="cw-kicker cw-reveal">The record</p>
        <SplitReveal
          as="h2"
          id="cw-products-title"
          className="cw-secttitle"
        >
          Every figure is defensible on request.
        </SplitReveal>
        <p className="cw-sect-dek cw-reveal">
          Ask for the cap table, the pipeline report, or a reference.
        </p>

        {/* THE LEDGER. Replaces the W2 weighted card grid AND absorbs the
            cw-shipped-also credit line (its 2013–2023 / $20M+ claim is now
            the total row). Trace rule (LESSONS #2) checked: $80M/$14M in
            guardicore.mdx, 8K→290K + doubled in hr-equity-author.mdx,
            200 birth workers in ordani.mdx. The SurveyMonkey row has no
            case-study page, so it carries no link — an unlinked row in a
            ledger reads as honesty, not absence. Per the W2 operator lock,
            the home surface says "SurveyMonkey Enterprise", never
            TechValidate. Rows keep .cw-reveal + stagger — the reveal
            system works as of Pass-1, so the rows arrive in sequence. */}
        <div className="cw-ledger cw-reveal" role="list">
          <a
            href="/work/guardicore"
            className="cw-lrow cw-lrow--link cw-reveal"
            role="listitem"
            style={{ transitionDelay: "60ms" }}
          >
            <span className="cw-lrow__co">
              Guardicore
              <span className="cw-lrow__tag">Enterprise sales · 2021</span>
            </span>
            <span
              className="cw-lrow__out"
              aria-label="80 million dollars in pipeline on 14 million dollars in revenue, acquired by Akamai"
            >
              <strong>$80M pipeline</strong> on $14M revenue ·{" "}
              <strong>acquired by Akamai</strong>
            </span>
            <span className="cw-lrow__go" aria-hidden>→</span>
          </a>

          <div
            className="cw-lrow cw-reveal"
            role="listitem"
            style={{ transitionDelay: "120ms" }}
          >
            <span className="cw-lrow__co">
              SurveyMonkey Enterprise
              <span className="cw-lrow__tag">Enterprise sales · 2018</span>
            </span>
            <span className="cw-lrow__out">
              <strong>$1M+</strong> toward the IPO · held through the
              Nasdaq listing
            </span>
          </div>

          <a
            href="/work/hr-equity-author"
            className="cw-lrow cw-lrow--link cw-reveal"
            role="listitem"
            style={{ transitionDelay: "180ms" }}
          >
            <span className="cw-lrow__co">
              Industry author
              <span className="cw-lrow__tag">GTM + software · 2024–</span>
            </span>
            <span className="cw-lrow__out">
              Reach <strong>8K → 290K</strong> · RFP-to-close{" "}
              <strong>doubled</strong>
            </span>
            <span className="cw-lrow__go" aria-hidden>→</span>
          </a>

          <a
            href="/services/ai-engineering"
            className="cw-lrow cw-lrow--link cw-reveal"
            role="listitem"
            style={{ transitionDelay: "240ms" }}
          >
            <span className="cw-lrow__co">
              Frontier AI
              <span className="cw-lrow__tag">Embedded · 2025–</span>
            </span>
            <span className="cw-lrow__out">
              Eval infrastructure, RAG, agent orchestration ·{" "}
              <strong>specifics under NDA</strong>
            </span>
            <span className="cw-lrow__go" aria-hidden>→</span>
          </a>

          <a
            href="/work/ordani"
            className="cw-lrow cw-lrow--link cw-reveal"
            role="listitem"
            style={{ transitionDelay: "300ms" }}
          >
            <span className="cw-lrow__co">
              Ordani
              <span className="cw-lrow__tag">Founder, sole engineer · 2026</span>
            </span>
            <span className="cw-lrow__out">
              <strong>200 birth workers</strong> · none lost to a
              competitor
            </span>
            <span className="cw-lrow__go" aria-hidden>→</span>
          </a>

          <div
            className="cw-lrow cw-lrow--tot cw-reveal"
            role="listitem"
            style={{ transitionDelay: "360ms" }}
          >
            <span className="cw-lrow__co">
              Total
              <span className="cw-lrow__tag">2013–2023</span>
            </span>
            <span className="cw-lrow__out">
              <strong>$20M+ in client revenue</strong>
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER — terracotta */}
      <footer
        className="cw-foot"
        id="contact"
        data-section
        data-world="terracotta"
        aria-labelledby="cw-build-title"
      >
        <a
          href="https://calendly.com/micahmccoyjones/introduction"
          target="_blank"
          rel="noopener noreferrer"
          className="cw-big-link"
          aria-label="Let's build — book a call"
        >
          {/* Pass-21 (Claude Chat audit): "LET'S BUILD" was the single
              weakest line of copy on the site — a startup-culture
              trope that didn't earn its display-scale treatment. A
              $200K buyer doesn't want to "build" with you; they want
              to hire you to own a problem. "Name the problem" reframes
              the CTA as the buyer's action, not yours — implies
              listening, not pitching. */}
          <SplitReveal
            as="h2"
            id="cw-build-title"
            className="cw-big cw-shift"
            stagger={0.04}
            start="top 85%"
          >
            NAME THE
            <br />
            PROBLEM →
          </SplitReveal>
        </a>
        {/* Pass-30 (Cowork review): playbook removed from the footer —
            the enterprise front door no longer routes to a $149 product.
            The playbook is reached from the /services self-select line. */}
        <div className="cw-footrow cw-reveal">
          <MagneticArea>
            <a
              href="https://calendly.com/micahmccoyjones/introduction"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call ↗
            </a>
          </MagneticArea>
          <a href="mailto:hello@micahjonesconsulting.com">
            hello@micahjonesconsulting.com
          </a>
          {/* W4: date-range © per the bar (§3.6). a11y: opacity 0.5
              measured 2.48:1 on terracotta; 0.9 holds ≥4.5:1. */}
          <span style={{ opacity: 0.9, border: "none" }}>
            © 2013–2026 Micah Jones
          </span>
        </div>
      </footer>
    </>
  );
}
