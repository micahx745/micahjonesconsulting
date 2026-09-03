// app/(foyer)/page.tsx
//
// Color Worlds home — single long-scroll. Sections set data-world on
// themselves; WorldSwitcher observes them and cross-fades the page
// palette as each crosses viewport center.
//
// Section order + worlds (Terracotta Workshop palette):
//   Hero         → terracotta (Pass-21: rotating words pipeline→position
//                              + system→engine; sub names 14 practices)
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
import Image from "next/image";
import { Hero } from "@/components/color-worlds/Hero";
import { OrdaniBetaForm } from "@/components/color-worlds/OrdaniBetaForm";
import { SplitReveal } from "@/components/color-worlds/SplitReveal";
import { MagneticArea } from "@/components/motion/MagneticArea";

export const metadata: Metadata = {
  // Absolute title prevents the root template ("%s — Micah Jones") from
  // double-suffixing on the home page. Other routes still get the suffix.
  title: {
    absolute: "Micah Jones — Strategy and software, shipped by one person",
  },
  description:
    "Strategy and software from one operator in Oakland. Four exits behind my work, $5B+ combined. $80M in enterprise pipeline, $20M+ in client revenue.",
  alternates: { canonical: "https://www.micahjonesconsulting.com" },
  openGraph: {
    title: "Micah Jones — Strategy and software, shipped by one person",
    description:
      "Four exits behind my work, $5B+ combined. $80M in enterprise pipeline and $20M+ in client revenue. Now building Ordani, in beta with paying users.",
    type: "website",
    url: "https://www.micahjonesconsulting.com",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "Micah Jones — Strategy and software, shipped by one person",
    description:
      "Four exits behind my work, $5B+ combined. $80M in enterprise pipeline and $20M+ in client revenue. Now building Ordani.",
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

export default function ColorWorldsHome() {
  return (
    <>
      {/* HERO — terracotta */}
      <Hero />

      {/* Pass-68: the scrolling ✦ marquee is gone. A ticker of buzzword
          fragments is one of the two most recognisable AI-built-site tells,
          it carried no information a static line would not, and the three
          services are stated properly further down the page. The
          [data-scroll-track] effect in Hero.tsx that drove it went with it. */}

      {/* REVENUE BAND DELETED (Pass-4). Its three claims ($20M+, three
          exits, trillions) moved ONTO the hero photo as proof chips —
          the reference language (D-R15) puts stats on the image, not in
          a band below it. The per-exit detail (Guardicore→Akamai etc.)
          lives in THE LEDGER with figures and links, so the band's
          three-entry index was already a duplicate. ~90 rendered words
          leave the page with it. */}

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
        <SplitReveal as="h2" id="cw-clients-title" className="cw-secttitle">
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
            <span className="cw-section-cta__arr" aria-hidden>
              →
            </span>
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
        <SplitReveal as="h2" id="cw-howiwork-title" className="cw-secttitle">
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
                I find the gap between what you built and what buyers actually
                pay for.
              </p>
              <p className="cw-principle__artifact">
                &#8594; Positioning audit memo
              </p>
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
                Every engagement ships a named artifact in month one. No decks.
                No discovery debt.
              </p>
              <p className="cw-principle__artifact">
                &#8594; Shipped artifact, month one
              </p>
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
                I stay until the narrative sells without me. The Guardicore
                repositioning carried into the Akamai acquisition.
              </p>
              <p className="cw-principle__artifact">
                &#8594; The story the market repeats
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* ORDANI — petrol — live product, NOT a side project.
          The h2 carries .cw-bleed — the one ink-bleed display headline
          per page, per the texture research. Giant Ordani word reads
          as pulp-ink, not pixel-text. */}
      {/* ORDANI (Pass-15, operator: "make it look nicer than it was
          before but without all the cheap gimmicks - maybe a pic of a
          doula working (small not the entire page)"). Back in the
          site's own editorial idiom: kicker, title, lede, one small
          bordered photograph, one link. The photo is the /about
          portrait grammar; the copy carries the value props. Nothing
          animates beyond the standard reveals. */}
      {/* Pass-64 (operator: the Ordani part "feels bare - make it more
          special/premium"). Two changes, no new motion.

          1. The section takes PETROL. That is already Ordani's world in
             WorldSwitcher's map and it was the only mapped world the site
             never used, so the one product section now has a colour nothing
             else on the page has. It costs nothing: the palette shift is the
             site's existing signature gesture.
          2. It becomes a picture edit rather than one photo. The lead image
             is a doula taking notes on a pad beside a pregnant client, which
             is the paper intake this product replaces, stated without a word.
             Three smaller frames follow.

          Photography is the operator's own licensed birth-work shoot (rights
          confirmed 2026-09-01), the same session as the frame already on the
          site. Captions describe birth work in general and never imply these
          people are Ordani customers, because they are not. */}
      <section
        className="cw-block cw-ord"
        id="ordani"
        data-section
        data-world="petrol"
        aria-labelledby="cw-ordani-title"
      >
        {/* Pass-17 (operator): "Ordani needs to be bigger - the built for
            the people is nice but i cant see ordani above it". The name
            takes the display slot; the line he likes becomes a large
            subtitle beneath it. */}
        <SplitReveal as="h2" id="cw-ordani-title" className="cw-secttitle">
          Ordani
        </SplitReveal>
        <p className="cw-ordani-subtitle cw-reveal">
          Built for the people who show up for mothers.
        </p>

        <div className="cw-ordani-split">
          <div className="cw-ordani-split__text">
            {/* Pass-82, operator ruling 2026-09-02: "soften it to what's
                defensible". Two claims came out.

                "processing Medicaid claims fee-free" reads as a regulated
                billing function sitting on a HIPAA product, and the ledger
                carries no sentence describing what Ordani actually does to a
                claim. It was operator-supplied via a code comment, and a code
                comment is not provenance.

                "keeping hundreds of dollars in birth workers' pockets" was the
                vaguest number on a page built from named ones, and it wore the
                same "hundreds of" shape as the user count retired on
                2026-08-31 - close enough to be misread as one.

                What replaces them is the ledger framing this surface was
                missing entirely: active paying users, in beta, public release
                coming. The mortality line is purpose-framed ("lower"), never
                an outcome claim, and stays.

                To put the money claim back: one sentence on the real mechanism
                and a named figure, ledgered in LESSONS #3 with a date. */}
            {/* LESSONS #6, sharpened: every apostrophe in this paragraph is a
                LITERAL character, never &rsquo;. Next 16's RSC serializer
                drops the space before a text node that follows an inline
                element when that text node contains an HTML entity ANYWHERE
                in it — not just next to the tag. This paragraph shipped as
                "So I built Ordani.It’s" because of the &rsquo; in
                "workers’ pockets", four lines further on. Removing only the
                nearby entity did not fix it; the whole node has to be clean.
                Do not "tidy" these back into entities, and do not put a
                {/* comment *\/} inside the <p>: an expression container splits
                the text node and moves the problem rather than fixing it.
                The render-gate GLUE check reads the rendered bytes. */}
            <p className="cw-lede cw-reveal">
              Birth workers run their practices on group chats and paper
              intakes. HIPAA is the law. <em>So I built Ordani.</em> It has
              active paying users today, it is in beta, and a public release is
              coming. The mission is bigger: lower infant mortality, by giving
              the people who care for mothers and babies better tools than
              paperwork.
            </p>
            <div className="cw-section-cta-wrap cw-reveal">
              <a href="/work/ordani" className="cw-section-cta">
                See how it was built{" "}
                <span className="cw-section-cta__arr" aria-hidden>
                  →
                </span>
              </a>
            </div>
            {/* Waitlist restored (operator ask). Same OrdaniBetaForm as
                before Pass-12 — wired to Resend + the beta flow. */}
            <div className="cw-ordani-wait cw-reveal" id="waitlist">
              <p className="cw-ordani-wait__lbl">
                Know a birth worker? Join the waitlist.
              </p>
              <OrdaniBetaForm />
            </div>
          </div>

          <figure className="cw-ordani-split__fig cw-reveal">
            <Image
              src="/ordani-intake.jpg"
              alt="A doula sits with a pregnant client on a couch, writing on a notepad as they talk."
              width={1600}
              height={1068}
              sizes="(min-width: 1100px) 420px, 100vw"
              className="cw-ordani-split__img"
            />
            <figcaption className="cw-ordani-split__cap">
              The intake, on paper <span aria-hidden>·</span> what Ordani
              replaces
            </figcaption>
          </figure>
        </div>

        <div className="cw-ord-band cw-reveal">
          <figure>
            <Image
              src="/ordani-work.jpg"
              alt="A doula supports a laboring client in a close embrace, a woven rebozo draped over the shoulder between them."
              width={900}
              height={698}
              sizes="(min-width: 900px) 33vw, 100vw"
            />
            <figcaption>
              Labor support <span aria-hidden>·</span> the work the software
              protects
            </figcaption>
          </figure>
          <figure>
            <Image
              src="/ordani-hands.jpg"
              alt="Two hands working along a client's lower leg on a draped table."
              width={1100}
              height={733}
              sizes="(min-width: 900px) 33vw, 100vw"
            />
            <figcaption>
              Bodywork <span aria-hidden>·</span> between appointments
            </figcaption>
          </figure>
          <figure>
            <Image
              src="/ordani-newborn.jpg"
              alt="A parent holds a newborn in a nursery chair."
              width={1100}
              height={734}
              sizes="(min-width: 900px) 33vw, 100vw"
            />
            <figcaption>The reason the record has to be right</figcaption>
          </figure>
        </div>
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
        <SplitReveal as="h2" id="cw-products-title" className="cw-secttitle">
          The receipts.
        </SplitReveal>
        {/* Pass-18 (operator): "every figure is defensible on request is
            a little much" — the dare becomes an invitation, and the
            title drops into the site's own register (the protect-listed
            "I'll send the receipts" line). */}
        <p className="cw-sect-dek cw-reveal">
          Every line below is real. Ask about any of them.
        </p>

        {/* THE LEDGER. Replaces the W2 weighted card grid AND absorbs the
            cw-shipped-also credit line (its 2013–2023 / $20M+ claim is now
            the total row). Trace rule (LESSONS #2) checked: $80M/$14M in
            guardicore.mdx, 8K→290K in content-engine.mdx, doubled in rfp-engine.mdx,
            the paying-users claim in ordani.mdx. The SurveyMonkey row has no
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
            <span className="cw-lrow__go" aria-hidden>
              →
            </span>
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
              <strong>$1M+</strong> toward the IPO · held through the Nasdaq
              listing
            </span>
          </div>

          <div
            className="cw-lrow cw-reveal"
            role="listitem"
            style={{ transitionDelay: "150ms" }}
          >
            <span className="cw-lrow__co">
              Postmates
              <span className="cw-lrow__tag">Product analyst · 2020</span>
            </span>
            <span className="cw-lrow__out">
              Market and fraud analysis in the wide-open era ·{" "}
              <strong>acquired by Uber, $2.65B</strong>
            </span>
          </div>

          {/* Pass-78. This was ONE row fusing two separate engagements for
              the same author, linked to /work/content-engine. The $3M is not
              on that page: it belongs to the RFP software and lives on
              /work/rfp-engine. Under a heading that says "Every line below is
              real. Ask about any of them.", the one receipt a skeptic clicks
              to check led to a page that does not carry it. Now two rows, each
              pointing at the study that proves its own number. Both figures
              are the case studies' own indexLine values, verbatim. */}
          <a
            href="/work/content-engine"
            className="cw-lrow cw-lrow--link cw-reveal"
            role="listitem"
            style={{ transitionDelay: "180ms" }}
          >
            <span className="cw-lrow__co">
              Industry author
              <span className="cw-lrow__tag">Content engine · 2024–2025</span>
            </span>
            <span className="cw-lrow__out">
              Monthly reach <strong>8K → 290K</strong> in five months
            </span>
            <span className="cw-lrow__go" aria-hidden>
              →
            </span>
          </a>

          <a
            href="/work/rfp-engine"
            className="cw-lrow cw-lrow--link cw-reveal"
            role="listitem"
            style={{ transitionDelay: "200ms" }}
          >
            <span className="cw-lrow__co">
              Industry author
              <span className="cw-lrow__tag">RFP engine · 2024–2025</span>
            </span>
            <span className="cw-lrow__out">
              <strong>$3M in contracts won</strong> · close rate doubled
            </span>
            <span className="cw-lrow__go" aria-hidden>
              →
            </span>
          </a>

          <a
            href="/services#ai-engineering"
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
            <span className="cw-lrow__go" aria-hidden>
              →
            </span>
          </a>

          <a
            href="/work/ordani"
            className="cw-lrow cw-lrow--link cw-reveal"
            role="listitem"
            style={{ transitionDelay: "300ms" }}
          >
            <span className="cw-lrow__co">
              Ordani
              <span className="cw-lrow__tag">
                Founder, sole engineer · 2026
              </span>
            </span>
            <span className="cw-lrow__out">
              <strong>Active paying users</strong> · none lost to a competitor
            </span>
            <span className="cw-lrow__go" aria-hidden>
              →
            </span>
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

      {/* THE TWO DOORS (Pass-5, operator ask: "something to preach to the
          vibe coders and something to preach to small businesses"). Two
          register-matched doorways at the bottom of the page — audience B
          got the whole page above; A and C each get one door in their own
          voice. NOTE: the playbook door touches the Pass-30 lock (playbook
          off the enterprise front door) — that lock was about the FIRST
          screen; this sits five screens down. Flagged to the operator
          either way. */}
      {/* Pass-6 (operator: "the cards look weak"): doors are no longer
          cards. They are the SEAM — two full-bleed color panels, edge to
          edge, no borders. Builders get the petrol (build-side) panel,
          growing businesses get terracotta (sell-side). The section
          keeps data-world="bone" for the page-palette rhythm; the panels
          paint themselves. */}
      <section
        className="cw-doors-band"
        id="doors"
        data-section
        data-world="bone"
        aria-label="Which door fits"
      >
        <a href="/playbook" className="cw-door cw-door--build cw-reveal">
          <p className="cw-door__kicker">Building solo, with AI</p>
          <h2 className="cw-door__title">
            The demo took a weekend. The last 20% is eating your month.
          </h2>
          <p className="cw-door__body">
            That gap is my daily work. I wrote the field manual for it.
          </p>
          <span className="cw-door__cta">
            Read the playbook <span aria-hidden>→</span>
          </span>
        </a>
        <a
          href="/services"
          className="cw-door cw-door--sell cw-reveal"
          style={{ transitionDelay: "100ms" }}
        >
          <p className="cw-door__kicker">Running a growing business</p>
          <h2 className="cw-door__title">
            Too big for duct tape. Not ready for an agency retainer.
          </h2>
          <p className="cw-door__body">
            You get me directly. Diagnosis, a shipped artifact in month one, and
            a system your team runs without me.
          </p>
          <span className="cw-door__cta">
            See the three engagements <span aria-hidden>→</span>
          </span>
        </a>
      </section>

      {/* FOOTER — terracotta */}
      <footer
        className="cw-foot"
        id="contact"
        data-section
        data-world="terracotta"
        aria-labelledby="cw-build-title"
      >
        {/* Pass-80: was target="_blank" + rel="noopener noreferrer". /book is
            an internal route on this same site, so opening it in a new tab
            split the visit in two and stranded the back button at the moment a
            buyer was closest to acting. _blank belongs on links that leave. */}
        <a
          href="/contact"
          className="cw-big-link"
          aria-label="Name the problem — send me a note"
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
            {/* Pass-82: booking is post-purchase now, so the footer offers
                the note. Internal route, so no _blank and the internal arrow. */}
            <a href="/contact">Send me a note →</a>
          </MagneticArea>
          <a href="mailto:micah@micahjonesconsulting.com">
            micah@micahjonesconsulting.com
          </a>
          <a
            href="https://www.linkedin.com/in/micah-j/"
            rel="me noopener noreferrer"
            target="_blank"
          >
            LinkedIn ↗
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
