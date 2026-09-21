// app/(foyer)/page.tsx
//
// Color Worlds home — single long-scroll. Sections set data-world on
// themselves; WorldSwitcher observes them and cross-fades the page
// palette as each crosses viewport center.
//
// Section order + worlds (Terracotta Workshop palette). AMENDED Pass-106
// (research CHAT-105 — receipts earn belief before the ask; the abstract
// "Three engagements" trio doesn't match how a stalled solo builder names
// his own problem). CLIENTS is cut outright and THE RECEIPTS section
// (named "Shipped" in the old version of this list, id="products") moves
// up to sit directly after Hero. Two doors has been real since Pass-5/6
// and is added to this list for the first time here — this comment had
// already drifted from the JSX body before Pass-106: Revenue+exits, cut
// at Pass-4, stayed listed for many passes after it left the page, and
// Two doors was never listed at all. Cross-check this list against the
// actual <section data-world="..."> tags below rather than trusting it
// on its own.
//   Hero          → terracotta (Pass-21: rotating words pipeline→position
//                               + system→engine; sub names 14 practices)
//   How I work    → espresso (Pass-21: NEW Operating Principles section
//                             per Claude Chat audit — missing-surface gap;
//                             three named stages, Diagnose / Build /
//                             Position. FUSE PASS (operator, verbatim:
//                             "attach the receipts part to that too...
//                             one smooth motion of I offer this and here
//                             is an example of that"): THE RECEIPTS
//                             section (id="products", Pass-2's LEDGER,
//                             moved here Pass-106) is folded into this
//                             one — each stage carries the ledger rows
//                             that prove it, the rows that fit no stage
//                             plus the Consulting total close the
//                             section, then Exit Record. World moves
//                             bone -> espresso: one fewer section, so the
//                             remaining transitions run rarer and bigger
//                             (D-R3). id stays "products" (Hero's "See
//                             the work ↓" CTA targets it); id="how-i-work"
//                             is retired, unreferenced anywhere else
//                             (grepped). Full row-to-stage map is on the
//                             section tag itself, below.)
//   Ordani        → petrol (Pass-21: lede rewritten problem-first per
//                           Claude Chat audit)
//   Two doors     → bone   (Pass-5/6: builder vs growing-business self-
//                           select panels, full-bleed, no cards. The
//                           sell-side door still links /services.)
//   Footer        → terracotta (Pass-21: "LET'S BUILD →" → "NAME THE
//                               PROBLEM →" — the operator-listening
//                               voice, not operator-pitching)
//
// CUT at Pass-106: CLIENTS ("Three engagements.", bone, id="clients"),
// the CLIENT_OFFERS teaser (Positioning & GTM / End-to-end product
// building / Frontier AI engineering) and its two /services links.
// /services stays fully reachable from this same page — Hero's "Hire
// me" link and the Two doors sell panel — and from the site nav on
// every route (components/color-worlds/Nav.tsx NAV_LINKS). Full
// accounting is in the deletion note where the CLIENTS section used to
// sit, below.
//
// Copy in the mockup is placeholder per the brief — Micah will finalize.
// "No 3D printing, no hardware, no maker content" — workshop bench is
// intentionally absent. "Don't frame Ordani as a side project" — it's
// presented as a live product with beta signup.
import type { Metadata } from "next";
import { BuyButton } from "@/components/BuyButton";
import { Hero } from "@/components/color-worlds/Hero";
import { ExitRecord } from "@/components/color-worlds/ExitRecord";
import { HowIWork } from "@/components/color-worlds/HowIWork";
import { OrdaniBetaForm } from "@/components/color-worlds/OrdaniBetaForm";
import { PriceBox } from "@/components/color-worlds/PriceBox";
import { RevenueFigure } from "@/components/color-worlds/RevenueFigure";
import { SplitReveal } from "@/components/color-worlds/SplitReveal";
import { MagneticArea } from "@/components/motion/MagneticArea";

export const metadata: Metadata = {
  // Absolute title prevents the root template ("%s | Micah Jones") from
  // double-suffixing on the home page. Other routes still get the suffix.
  title: {
    absolute: "Micah Jones | Strategy and software, shipped by one person",
  },
  description:
    "Strategy and software from one operator in Oakland. Four exits behind my work, $5B+ combined. $20M+ in revenue behind my work.",
  alternates: { canonical: "https://www.micahjonesconsulting.com" },
  openGraph: {
    title: "Micah Jones | Strategy and software, shipped by one person",
    description:
      "Four exits behind my work, $5B+ combined. $20M+ in revenue behind my work. Now building Ordani, in beta with paying users.",
    type: "website",
    url: "https://www.micahjonesconsulting.com",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "Micah Jones | Strategy and software, shipped by one person",
    description:
      "Four exits behind my work, $5B+ combined. $20M+ in revenue behind my work. Now building Ordani.",
  },
};

// CLIENT_OFFERS DELETED (Pass-106, research CHAT-105) — the trio read as
// abstract service categories, not the buyer's own words for his
// problem, and "Frontier AI engineering" was the sharpest mismatch: a
// solo builder who stalled after a Claude Code / Cursor / Lovable / v0 /
// Bolt demo does not self-identify as needing that. The three rows
// (Positioning & GTM / End-to-end product building / Frontier AI
// engineering) and the CLIENTS section that rendered them are both cut;
// see the deletion note below, at the old CLIENTS location, for the full
// accounting of what links to /services now. The three rows themselves
// still live in full on /services (app/(foyer)/services/page.tsx lines
// 53, 93, 130) — unchanged; this only removes the home-page teaser and
// its two links into that page.

export default function ColorWorldsHome() {
  return (
    <>
      {/* HERO — terracotta */}
      <Hero />

      {/* THE TWO DOORS. Pass-5 (operator: "something to preach to the vibe
          coders and something to preach to small businesses"): two doorways,
          one per reader, each in its own register. Pass-6: not cards but two
          full-bleed colour panels, petrol for the build side, terracotta for
          the sell side; the section keeps data-world="bone" and the panels
          paint themselves. Pass-124 (operator 2026-09-21, "go with proposal
          rec"): moved up to sit directly under the hero as the "you are
          probably here" paths, both kickers cut, and the sell door's copy
          rewritten (LESSONS #3, THE TWO REWORKED LINES). */}
      <section
        className="cw-doors-band"
        id="doors"
        data-section
        data-world="bone"
        aria-label="Which door fits"
      >
        {/* Review #10 (2026-09-02): this door sent the one reader a $500
            session fits to a $149 book, and /packages had zero links from the
            home page. The door holds two destinations now, so it is a <div>
            with the links in its foot (the Pass-76b pattern on /services; a
            link inside a link is invalid HTML). The body also drops "gap",
            which appeared five times on the page. */}
        <div className="cw-door cw-door--build cw-reveal">
          <h2 className="cw-door__title">
            The demo took a weekend. The last 20% is eating your month.
          </h2>
          <p className="cw-door__body">
            That last 20% is my daily work. Want me on your build? Three fixed
            prices start at $500.
          </p>
          <div className="cw-door__ctas">
            <a href="/packages" className="cw-door__cta">
              See the three packages <span aria-hidden>→</span>
            </a>
          </div>
        </div>
        <a
          href="/services"
          className="cw-door cw-door--sell cw-reveal"
          style={{ transitionDelay: "100ms" }}
        >
          <h2 className="cw-door__title">
            An agency is too broad. A hire is too early.
          </h2>
          <p className="cw-door__body">
            I build what your growing business needs next, from the product to
            the way you sell it. You get me directly.
          </p>
          <span className="cw-door__cta">
            See the engagements <span aria-hidden>→</span>
          </span>
        </a>
      </section>

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

      {/* THE OFFER — terracotta. Pass-106 (audit section): the audit
          research's read on this page — it earns belief but makes the
          buyer piece together what to buy and how to start. The one
          sentence naming a price lived inside the closing "doors"
          section, five screens down, reachable only after Clients, How
          I work, Ordani and Shipped (see the doors comment at L626).
          This states the Audit once, plainly, one section past the
          hero: the name, the price, what it covers, what shows up in
          the buyer's inbox. Same terracotta world as the hero, so this
          adds no new palette transition — it just moves the existing
          hero-to-bone transition one section later, which is the same
          direction D-R3 above already argues for. The doors-section
          sentence at L639 is untouched; it still holds, just no longer
          carries the offer alone. */}
      <section
        className="cw-block"
        id="offer"
        data-section
        data-world="terracotta"
        aria-labelledby="cw-offer-title"
      >
        {/* Pass-111a: one purchase path. The hero points here; the box buys. */}
        <div className="cw-offer__grid">
          <SplitReveal as="h2" id="cw-offer-title" className="cw-secttitle">
            Two weeks to know what to fix first.
          </SplitReveal>
          <div className="cw-offer__box cw-reveal">
            <PriceBox
              id="home-audit"
              tag="Start here"
              lead
              name="The Audit"
              price={{ fig: "$2,500" }}
              term="Two weeks · starts within the week"
              fit="I go through your build, your production, or your positioning top to bottom."
              list={[
                "An 8-10 page memo: what works, what is broken, and what to fix first.",
                "A prioritized fix sequence, so you can start the morning it lands.",
                "A one-hour debrief call where I walk you through it. You keep the memo either way.",
                // Pass-112 (operator 2026-09-11): the book is off the site until it ships.
                "A kickoff email the moment you buy: the intake questions and a link to book the debrief.",
              ]}
              area="Covers one area: AI engineering, product building, or positioning and GTM. You pick it at checkout."
              cta={
                <BuyButton
                  skuKey="audit-2500"
                  label="Buy the Audit"
                  className="cw-buy"
                />
              }
              fine="The rules, in plain terms: every package fee credits toward the next package or an engagement started within 60 days. Full refund any time before kickoff. None after, because by then the work has started."
              as="h3"
            />
          </div>
          <a
            href="/services#packages"
            className="cw-mlink cw-offer__packages-link"
          >
            See all three packages <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* CLIENTS section DELETED (Pass-106, research CHAT-105). Was:
          bone, id="clients", "Three engagements.", the CLIENT_OFFERS
          3-row teaser (Positioning & GTM / End-to-end product building /
          Frontier AI engineering), each row linking /services, plus a
          section CTA "See full services →" also to /services. Cut
          because the buyer this page is now written for — a solo
          builder or small team who shipped something with Claude Code,
          Cursor, Lovable, v0 or Bolt that demoed well and stalled before
          production — doesn't self-identify as needing "Frontier AI
          engineering"; the trio read as abstract categories, not his
          problem in his own words.

          /services does not go dark: it is still linked from Hero's
          "Hire me" CTA (components/color-worlds/Hero.tsx), from the Two
          doors sell panel below ("See the three engagements →", which
          still describes /services accurately — the same three rows
          live there in full, with scope/process/proof per service, at
          app/(foyer)/services/page.tsx lines 53, 93 and 130), and from
          the site nav on every route (components/color-worlds/Nav.tsx
          NAV_LINKS). Checked by grep, 2026-09-09: those three plus
          /about, /packages and /work all still link /services
          independent of this section.

          THE RECEIPTS section (the LEDGER, id="products") now occupies
          this slot, moved up from between Ordani and Two doors so proof
          lands before any pitch, per the same research. It was cut from
          its old location, not duplicated — see the note left there. */}

      {/* HOW I WORK + THE RECEIPTS — fused, espresso. Operator, verbatim:
          "after the hero we need to offer a section on how I work and
          attach the receipts part to that too. Make it one smooth motion
          of I offer this and here is an example of that." These were two
          adjacent sections (Pass-106 order: THE RECEIPTS then OPERATING
          PRINCIPLES); now one <section>. "How I work." is the only <h2>
          (id cw-howiwork-title carries aria-labelledby); each stage below
          carries the ledger rows that prove it — see the row-to-stage
          rationale in the pass notes/brief. Rows that fit no stage, plus
          the Consulting total, close the section under "The receipts."
          (now an <h3> — cw-secttitle is a class-based scale, not
          tag-based, so it renders at the same size); Exit Record closes
          last, as before.

          id stays "products": Hero's "See the work ↓" CTA
          (components/color-worlds/Hero.tsx) targets #products and nothing
          else references #how-i-work (grepped) — this is the
          zero-blast-radius choice. World moves bone → espresso: one fewer
          section makes the remaining palette transitions rarer and bigger
          (D-R3, already this file's own principle), and every element in
          both merged sections already carries color: inherit, sized and
          weighted rather than coloured (the 2026-09-09 axe/CONTRASTFIX fix
          above .cw-exits in globals.css), so neither the ledger rows nor
          the principle type depend on which world renders them.

          Per-row transitionDelay is recomputed, not copied: the old
          values staggered ONE flat list; the receipts are now three small
          groups plus a closing group, each entering the viewport at its
          own scroll position, so the old cadence no longer describes
          anything. Each group restarts at 0ms with the site's own
          short-stagger convention (cw-deliver, cw-principles:
          0/80/160ms). */}
      <section
        className="cw-block"
        id="products"
        data-section
        data-world="espresso"
        aria-labelledby="cw-howiwork-title"
      >
        <HowIWork variant="home" />

        {/* Pass-2 (redesign D-R14 synthesis): the card grid becomes THE
            LEDGER — the direction the operator picked across four style
            rounds. A record table reads as an audited document: the most
            credible register available to an enterprise buyer, and the
            format a procurement team forwards. Title breaks the
            abstract-noun+period drumbeat (attack plan §6 item 5) with a
            full assertion no competitor can copy. */}
        {/* Pass-18 (operator): "every figure is defensible on request is
            a little much" — the dare becomes an invitation, and the
            title drops into the site's own register (the protect-listed
            "I'll send the receipts" line). */}
        {/* THE FULL RECORD — closes the fused section.
            CORRECTED (operator, 2026-09-10): the drafting agent put
            Postmates and Neuton.AI here on the reasoning that neither
            "narrates one stage without straining the fit". The operator
            says both are POSITION, and he is the only person who could
            know: Postmates sold everything, so the work was cutting the
            promise back to a core menu it could actually deliver, and
            Neuton.AI was a foreign company needing North American
            positioning for an AI product in 2020, which is the same shape
            as Guardicore and ended the same way. Both rows moved up under
            03 Position. The Consulting total stays here because it
            aggregates every client since 2013, so it can only close the
            whole record. Otherwise unchanged from
            Pass-2/Pass-18; only the heading level moved (h2 → h3), since
            "How I work." above is now the section's one accessible name. */}
        {/* Pass-122 (operator 2026-09-18, LESSONS #3 "PASS-122 RECEIPTS
            VERDICT AND THE FIRST CUT"): "The receipts." is cut from the
            screen and kept for screen readers, same text, so the outline
            still reads. A plain visually hidden h3: no SplitReveal, nothing
            animates, no space reserved. The poster figure takes its place
            (the 112px pause above it moved to .cw-rec). */}
        <h3 id="cw-products-title" className="cw-sr-only">
          The receipts.
        </h3>
        <RevenueFigure />
        <ExitRecord />
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

        <div className="cw-ord-grid cw-ord-grid--copy-only">
          <div className="cw-ord-copy">
            {/* Pass-82, operator ruling 2026-09-02: "soften it to what's
                defensible". Two claims came out. Pass-121 (2026-09-17): the
                money claim is BACK, under LESSONS #3 ORDANI CLAIMS FACTS
                PARTS 3 to 5 and ORDANI DESCRIPTION AND THE HOME MONEY LINE —
                birth workers keep hundreds of dollars per client that a
                claims service would take, the same sentence every ORDANI
                surface now carries. The beta framing (active paying users,
                public release coming) stays, and the mortality line stays
                purpose-framed ("lower"), never an outcome claim. */}
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
              coming. Birth workers keep hundreds of dollars per client that a
              claims service would take. The mission is bigger: lower infant
              mortality, by giving the people who care for mothers and babies
              better tools than paperwork.
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
        </div>
      </section>

      {/* THE RECEIPTS section (id="products", the LEDGER table) MOVED
          from here to Pass-106 (research CHAT-105 — receipts earn belief
          before the ask). It now sits directly after Hero, in the slot
          CLIENTS used to occupy; see the note left there for the full
          text, moved verbatim including every href, aria-label and
          transitionDelay, except one internal comment that named a row
          in the section this move sits above of, corrected in place
          because that section no longer exists. */}

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
          href="/call"
          className="cw-big-link"
          aria-label="Name the problem — book a free intro call"
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
            {/* Pass-93: engagements book a call again (operator 2026-09-03).
                Internal route, so no _blank and the internal arrow. */}
            <a href="/call">Book a free intro call →</a>
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
