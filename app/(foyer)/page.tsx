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
    "Independent operator in Oakland. $20M+ in client revenue. Three companies I helped build reached an exit — Akamai, SurveyMonkey IPO, and Neuton.AI → Nordic Semiconductor. Now building Ordani — HIPAA-grade practice management software for fourteen doula practices.",
  alternates: { canonical: "https://www.micahjonesconsulting.com" },
  openGraph: {
    title:
      "Micah Jones — Strategy and software, shipped by the same pair of hands",
    description:
      "$20M+ in client revenue. Three companies I helped build reached an exit — Akamai, SurveyMonkey IPO, and Neuton.AI → Nordic Semiconductor. Now building Ordani — HIPAA-grade practice management for fourteen doula practices.",
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
    desc: "Eval, orchestration, deployment — the shipping discipline most AI founders skip.",
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

      <div className="cw-marquee" data-section data-world="terracotta">
        <div className="cw-track">
          {/* Track is duplicated; linear translateX(-50%) loops cleanly. */}
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
          CLIENTS section. The $20M+ / two exits / trillions claim is the
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
      <section
        className="cw-block"
        id="about-brief"
        data-section
        data-world="bone"
        aria-labelledby="cw-about-brief-title"
      >
        <p className="cw-kicker cw-reveal">About</p>
        <SplitReveal
          as="h2"
          id="cw-about-brief-title"
          className="cw-secttitle"
        >
          Operator, not consultant.
        </SplitReveal>
        <p className="cw-sect-dek cw-reveal">
          I&rsquo;ve spent a decade inside B2B software, on either side of
          the table — GTM strategy in the morning, shipping product in the
          afternoon. Most consultants don&rsquo;t ship. Most builders
          don&rsquo;t sell. I do both.
        </p>
        <div className="cw-section-cta-wrap cw-reveal">
          <a href="/about" className="cw-section-cta">
            More about how I work{" "}
            <span className="cw-section-cta__arr" aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* CLIENTS — bone */}
      <section
        className="cw-block"
        id="clients"
        data-section
        data-world="bone"
        aria-labelledby="cw-clients-title"
      >
        <p className="cw-kicker cw-reveal">Services</p>
        <SplitReveal
          as="h2"
          id="cw-clients-title"
          className="cw-secttitle"
        >
          Three engagements. Built for companies, founders, and operators who need outcomes shipped — not slides.
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
                actually pay for. Customer interviews, sales-call
                analysis, market research.
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
                I stay until the narrative sells without me &mdash; the
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
        <p className="cw-tagrow cw-reveal">
          <span className="cw-live">Live beta</span>
          <span>14 doula practices</span>
          <span>Six months in</span>
        </p>
        <h2 id="cw-ordani-title" className="cw-reveal cw-bleed">
          Ordani
        </h2>
        <p className="cw-lede cw-reveal">
          {/* Pass-21 (Claude Chat audit): rewritten to lead with the
              PROBLEM, not the build. The Pass-20 lede was a technical
              spec with metrics attached — it described what Ordani is
              but not why anyone should care. Now: problem-first
              ("Birth workers run their practices on group chats"),
              then the operator move ("I built it."), then the
              technical posture as evidence, closing on retention. */}
          Birth workers run their practices on group chats and paper
          intakes. HIPAA is the law, and real compliance needs real
          infrastructure. <em>So I built Ordani — a company, in private
          beta.</em> Row-level encryption, two outside security reviews,
          fourteen practices, none lost to a competitor.
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

        <p className="cw-note cw-reveal">
          Private beta · onboarding new users weekly
        </p>
        {/* Pass-32 (operator: frame Ordani as a real company, not a solo
            side project). The stack stays as proof; "solo" framing dropped. */}
        <p className="cw-note cw-reveal">
          A real company in private beta — Next.js, Supabase, Vercel,
          HIPAA-grade.
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
        <p className="cw-kicker cw-reveal">Engagements</p>
        <SplitReveal
          as="h2"
          id="cw-products-title"
          className="cw-secttitle"
        >
          Shipped, not pitched.
        </SplitReveal>
        <p className="cw-sect-dek cw-reveal">
          {/* Pass-21 (Claude Chat audit): cut "Real work in real users'
              hands" — claim-without-evidence opener that told the reader
              you were about to show real work instead of just showing
              it. The remaining three sentences carry the evidence. */}
          Two platforms acquired and public. A content engine that wins
          inbound. Frontier AI in production for founders.
        </p>

        <ul className="cw-cards">
          {/* Card 1 — industry-authority author engagement. The three
              fabricated end-clients (research university / Fortune-500
              "30% revenue lift" / "major American city" + bespoke product)
              are DELETED — operator confirms that story is false. The true
              engagement is one industry-authority author: reach 8K→290K, a
              real custom RFP-scanning platform, two six-figure retainers.
              "product" in the H3 now names the RAG RFP software I built. */}
          <li
            className="cw-card cw-reveal"
            style={{ transitionDelay: "0ms" }}
          >
            <a href="/work/hr-equity-author" className="cw-card__link">
              <span className="cw-tag">2024–present · Content + software</span>
              <h3>Content + product for an industry author</h3>
              <p>
                One industry-authority author. I built the content engine
                and the software beneath it. Monthly reach grew from 8K to
                290K. RFP-to-close rate doubled. The software scans new
                RFPs, weighs each against the author&apos;s own work, and
                drafts a partial response every morning. Two six-figure
                retainers closed in the window.
              </p>
              <span className="cw-open">See the engagement →</span>
            </a>
          </li>

          {/* Card 2 — GTM at scale. Per operator, no TechValidate; the
              IPO platform is named as SurveyMonkey Enterprise (the
              product line that anchored the IPO case). Accurate framing
              that uses the bigger recognizable brand. */}
          <li
            className="cw-card cw-reveal"
            style={{ transitionDelay: "120ms" }}
          >
            <a href="/work/guardicore" className="cw-card__link">
              <span className="cw-tag">Enterprise software · 2013–2023</span>
              <h3>GTM at scale</h3>
              <p>
                Positioning, market research, and the data backbone that
                moved deal size and revenue at platforms that sold
                (<strong>Guardicore → Akamai</strong>) and went public
                (<strong>SurveyMonkey Enterprise</strong> on Nasdaq).
                A decade of working directly with product teams in
                B2B software.
              </p>
              <span className="cw-open">See the receipts →</span>
            </a>
          </li>

          {/* Card 3 — frontier AI. New in Pass-12. Operator: "billed as
              another service/case study," 10,000-ft abstraction, no
              specifics. Premium consulting register: "specifics under
              NDA" + "available for new engagements." Links to Calendly
              since the case study hasn't been built yet. */}
          {/* Pass-20 (per Lena, Pass-19 review): card now links to the
              dedicated /services/ai-engineering subpage instead of
              routing AI-engagement intake to the generic Calendly. The
              subpage carries the engagement shapes (4 tiers); Calendly
              becomes the CTA from there, not from this card. */}
          <li
            className="cw-card cw-reveal"
            style={{ transitionDelay: "240ms" }}
          >
            <a
              href="/services/ai-engineering"
              className="cw-card__link"
            >
              <span className="cw-tag">2025–present · Embedded</span>
              <h3>Frontier AI, shipped.</h3>
              <p>
                {/* Pass-21 (Claude Chat audit): "production architecture
                    and orchestration" was category-level, not point-of-
                    view. "The engineering between the model and the
                    user" names the gap founders feel. Stack named
                    inline gives evidence the NDA framing can lean on. */}
                The engineering between the model and the user — eval
                infrastructure, RAG, agent orchestration, prompt-deployment
                pipelines. Specifics under NDA.
              </p>
              <span className="cw-open">See the engagement →</span>
            </a>
          </li>
        </ul>

        {/* Pass-16: former standalone <section.cw-credits> merged into
            Shipped as an "Also at" sub-credit. The operator flagged
            the standalone section read as an orphan — separate from
            Shipped but not really its own thing. Now it lives inside
            Shipped's espresso world, after the cards, as the secondary-
            engagement line. Guardicore and SurveyMonkey are NOT listed
            here (both already named prominently in the cards above);
            this lists the other named engagements. */}
        <div className="cw-shipped-also cw-reveal">
          <p className="cw-shipped-also__eyebrow">2013 — 2023</p>
          <p className="cw-shipped-also__line">
            Also at <strong>Flexport</strong>, <strong>Cuebiq</strong>,
            and <strong>Postmates</strong> — growth, GTM, and platform
            strategy across a decade of enterprise software.
          </p>
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
          <span style={{ opacity: 0.5, border: "none" }}>
            © 2026 — Micah Jones
          </span>
        </div>
      </footer>
    </>
  );
}
