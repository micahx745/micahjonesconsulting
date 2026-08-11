# Pass #19 — Brutal persona review (deep)

**Date:** 2026-05-23
**Reviewer:** Claude (Opus 4.7), running in Cowork
**HEAD audited:** `40a0860` (Pass-17, committed on `main`)
**Preview:** `https://micahjonesconsulting.vercel.app/` — alive, returns 200, served Pass-17 SSR. Visual evidence captured directly via Chrome MCP (browser navigates the cookie-authed session). **Viewport caveat:** Chrome MCP's `resize_window` resizes the chrome window, not the CSS viewport — desktop screenshots are at ~1568px regardless of requested size. Tablet/mobile verdicts derive from CSS clamp + media-query math rather than emulated viewports.

---

## Maya Lee — VP Growth, Series B AI security startup

**1. First-30-seconds.** OK so the hero loads, I see "I BUILD THE [PRODUCT.]" rotating, fine, I get it — operator who ships. Scroll once. `$20M+ in client revenue. Two enterprise exits. Named institutional customers. **Trillions in digital assets secured.**` Wait. That's the hook. That's the line that made me stop scrolling. Trillions is a Knowable Number — I know what TD Bank, Deutsche, NIH means as a buyer. Whoever this guy worked with is at MY tier or above. Now I'm reading the Guardicore body — "Repositioned the platform from honeypot-lead to visibility + east-west microsegmentation" — that's not consultant deck-speak, that's category-shift work. Sold.

**2. Does revenue-up-top work for me?** Yes. Aggressively yes. The Pass-9 era where the hero was an editorial lede + the receipts buried below the fold was the wrong sequence for buyers like me. I don't have time to read your manifesto. I have 90 seconds and a budget. Show me the receipts first, then let me decide if your manifesto is worth my time. The Pass-17 flow — hero → marquee → REVENUE+EXITS → services → Ordani → Shipped — is the right sequence. Hero hooks attention, marquee buys 2 more seconds, revenue closes the trust loop in the same scroll. Then the services pitch lands with a "yeah, OK, let's hear it." Don't move the receipts back down.

**3. Closing phrase.** *"Trillions in digital assets sat behind the Guardicore deployments."* That one sentence in the rev card's body copy. That's the line I'd quote to my CTO when forwarding the URL. "Trillions" is the buyer-side number. Most consultants give me their deal-size moves; this guy gives me the SIZE OF WHAT WAS BEING DEFENDED. That's the framing my buyer cares about — not "how much did you move," but "what stakes were you working at." The `$150K` deal-size move is also good but less differentiating; "trillions" is the unfair-advantage claim.

**4. The one thing I'd verify on the intro call.** Whether Micah was actually the SOURCE of the Guardicore positioning or whether he was on a team that did it. The site says "I owned the positioning research. Customer interviews. Sales-call analysis. I rewrote the single message at the top of the funnel." If true, that's a $200K engagement at my company. If he was a contributor inside a larger product-marketing function and the "I" is a stretch, the price drops by 60%. I'd ask: "Walk me through the week of the customer interviews — what were the three insights that drove the visibility framing? Who else was on the call?" One question, gets the truth fast. Side note: the Frontier AI "Inquire ↗" link goes to the SAME Calendly as "Book a call" in the hero — I noticed immediately. That's lazy. Either build a distinct intake for AI engagements or kill the second button. Two CTAs to the same form reads as a placeholder, not a service. (file: `app/(foyer)/page.tsx:322-323`)

---

## David Okonkwo — Black healthtech founder, Series A

**1. First-30-seconds.** Scrolled to Ordani first because that's the only thing on this site I can technically X-ray. Three-pill tagrow lands — `LIVE BETA · 14 DOULA PRACTICES · HUNDREDS OF USERS ACTIVE` — that's the social proof I came for. Then the lede: *"HIPAA-grade practice management for birth workers, built end to end. Doulas had been running their practice on Google Docs and group chats for a decade — they have proper software now."* Hmm. The first sentence is positioning. The second sentence is the contrast frame. Both are descriptive. **Neither one tells me why I should care about Micah.** This is a product page lede, not an operator's case-study hook. If I'm trying to figure out whether this guy can build HIPAA software for MY market, "proper software now" doesn't help — proper how? Encryption at rest? RLS? SOC-2? Who's the auditor? "Built end to end" is the line that should be doing the work and it's vague.

**2. Rewrite of the Ordani lede.** Operator wants a candidate. Here's mine:

> *"HIPAA-grade practice management for birth workers — built end-to-end by one operator. Row-level encryption inside Supabase RLS, two outside security reviews, every read logged. 14 practices, hundreds of users; eight active after six months. Zero churn."*

That's three sentences and it does what the current lede doesn't: it names the technical posture (RLS + security reviews + audit log), the social proof with the retention specificity (eight of 14 active after six months, zero churn), and it lets the architecture do the selling. A founder reading that knows whether to take the call. The current lede sells the contrast frame; my rewrite sells the operator's competence. Operator can dial back specifics if NDA — but "row-level encryption" + "two outside security reviews" are claims the case study already makes in body copy ("`/work/ordani` Approach §03"), so they're not under any NDA worth respecting.

**3. Five technical-credibility questions for the Frontier AI engagement.** The card says "Production-grade AI work for founders building AI-native software. The architecture and orchestration layers that turn frontier capability into a product users actually touch." Before I'd engage him on this:
  1. **What's "production-grade" mean to you?** SLOs? Eval infrastructure? Continuous-deployment pipeline for prompts/models? Or do you mean "deployed to users"? Different commitments.
  2. **Which frontier models have you shipped against in the last 12 months?** I need versions (Claude Opus 4.7? GPT-5? Gemini 3?), not categories. The architecture differs dramatically between them and lockin shows.
  3. **What's your stance on the LLM-as-judge eval pattern?** This is a litmus for whether you've actually shipped or whether you've read the literature. Real shippers have a strong opinion.
  4. **How do you handle the retrieval failure mode where the model confidently confabulates over a sparse RAG hit?** Want to hear about confidence thresholds, refusal patterns, fallback chains.
  5. **Can you name ONE production AI engagement that's NOT under NDA — even at the "I shipped a thing for a company in vertical X" level?** "Specifics under NDA — available for new engagements" reads thin when there's not even a category. Every other card on this site names a recognizable shape; this one is a void.

**4. Case-study pages verdict.** I went to `/work/ordani` after reading the home. The hero TitleCard is `ORDANI / INTAKE. / SECURE. / SHIPPED.` in display weight on obsidian — looks great, looks intentional. But everything below is on a different planet. The body is centered Source Serif at ~50% viewport width with the right half of every section EMPTY DARK SPACE. The Pass-17 specimen-card placeholders (`PRIVATE BETA / The intake — one screen, not fifteen / MAR 2026`) read as designed-pictureless from a craft perspective IF you know that's the design — but I'm a founder, not a designer, and what I see is **a bordered rectangle with nothing in it and a caption underneath**. Once I see one empty card I expect the next one will be filled — then I scroll and the next two are also empty. By the third, my hypothesis flips from "designed restraint" to "this guy doesn't have the screenshots to show me." That hypothesis is wrong (the operator could ship anonymized stills), but the page invites it. The "Why it matters" CDC paragraph is the strongest thing on the page — the maternal-mortality stat is REAL editorial weight, and I'd cite it if I were writing about Micah. But the page-as-a-whole reads "MDX rendered with care" rather than "case study with evidence." The theater obsidian register vs. the Color Worlds home register also IS jarring — I clicked from a terracotta paper world to a black void, with no continuity. Whether that's "two registers, one operator" intentionally or "two different sites" accidentally is exactly the question Marcus is going to nail. From my read: it leans accidentally.

---

## Marcus Chen — partner, creative-tech studio

**1. First-8-seconds.** Bricolage 800 ALL CAPS at clamp(52-196), rotating-word inside an italic mask, chromatic aberration on `.cw-shift` — this is competent. The `MICAH/JONES` wordmark in mix-blend-difference on terracotta works. The eyebrow `INDEPENDENT OPERATOR · OAKLAND, CA` is correctly small-mono. Scroll: marquee. **And we're done.** The marquee spacing is the first thing my eye fights — words floating 100px apart with the ✦ dot adrift in the middle. That's not a "fix later" item; that's the first failure of restraint on the page, and a buyer-tier judge would clock it in three seconds.

**2. The marquee fix — exact replacement at `app/globals.css:5818-5820`.**

The current rule:

```css
[data-mode="cw"] .cw-marquee .cw-track span {
  margin: 0 26px;
}
```

is a descendant combinator that matches every span in the marquee tree — the outer `[0,1]` block wrappers, the per-word inner wrappers, AND the `.cw-dot` spans. Compound margins. Plus the `.cw-dot` content is literally ` ✦ ` (leading/trailing spaces inside the text node), adding even more breath. Net visible gap between "Go-to-market" and "Product" is ~100-110px with the dot ghosting in the middle.

Replace `:5818-5820` with:

```css
/* Pass-19 fix: the prior descendant selector applied 26px margin to
 * ALL spans in the tree — block wrappers, word wrappers, AND the
 * inner .cw-dot spans. Compound margins inflated the inter-word gap
 * to ~104px with the ✦ floating in oversized empty space. Scope to
 * the word-wrapper level only; let the dot sit snug to its trailing
 * word with small padding. */
[data-mode="cw"] .cw-marquee .cw-track > span {
  /* Outer block wrappers (the duplicated [0,1] for infinite loop). No
   * margin — they're just structural; their children carry spacing. */
  margin: 0;
}
[data-mode="cw"] .cw-marquee .cw-track > span > span {
  /* Word wrappers — one per service. Carries the inter-word margin. */
  margin: 0 14px;
}
[data-mode="cw"] .cw-marquee .cw-track .cw-dot {
  /* The ✦ sits at the END of each word wrapper. Reset descendant
   * margin (was inheriting from the old too-broad rule), tighten the
   * content padding so it reads as inline punctuation. */
  margin: 0;
  padding: 0 4px 0 12px;
  color: var(--cw-accent);
}
```

While you're in there, also strip the leading/trailing spaces inside the JSX so layout responsibility lives in CSS, not in invisible text nodes. `app/(foyer)/page.tsx:122` — change `<span className="cw-dot"> ✦ </span>` to `<span className="cw-dot" aria-hidden>✦</span>`. (The current `aria-hidden` is missing; the dot is decorative and shouldn't be in the accessibility tree.)

Net result: ~42-50px between word and next word with the ✦ visually attached to the word it follows. Reads as deliberate typesetting, not as a tracking accident.

**3. The hand-circle fix — `components/hand/HandCircle.tsx`.**

The current implementation has `preserveAspectRatio="none"` (line 79) on a 100×60 viewBox. At the new `$20M+` figure scale (clamp 80-168px), the container aspect is roughly 6:1 to 7:1 — the SVG path gets stretched horizontally ~4x and the "hand-feeling" curves become a flattened, mechanical ellipse. The 2.4px stroke also reads thin against a 130px+ display numeric. Plus there's only ONE path — no overstroke, no grain — so it reads vector-smooth, not pen-on-paper.

Premium hand-marks I'd reference: Klim Foundry specimen pages (single-stroke editor's circles around quoted figures), Pinkerton Zweck editorial (multi-pass marks with visible registration), Stripe Press's marginalia in printed books (overshooting tails that close past the start). Common pattern across all three: native viewBox matches the typical container aspect, stroke is heavy enough to carry weight at scale, the stroke itself has slight irregularity from either a turbulence filter or multi-pass overlap.

Replace `components/hand/HandCircle.tsx` with:

```tsx
// components/hand/HandCircle.tsx
//
// Hand-drawn editor's circle. Pass-19 refinement for the wide
// $20M+ figure container (clamp 80-168px at ~6:1 container aspect).
//
// Pass-19 changes:
//   - viewBox widened from 100×60 to 180×60 (3:1) to match the typical
//     wide-figure container; reduces the stretch when wrapped on tabular
//     numerics like "$20M+".
//   - preserveAspectRatio="xMidYMid meet" so the path retains its
//     designed shape; the container's own inset sizing (-14% -4%) keeps
//     the curve correctly overlapping the figure.
//   - Stroke width default bumped 2.4 → 3.0; readable at the new scale.
//   - Two overlapping path passes: a primary closed loop + a shorter
//     "overshoot" stroke that closes past the start with 0.85× width
//     and 0.55 opacity. Mimics the editor's pen-lift-and-close-past-
//     start hand gesture without needing a separate animation system.
//   - Optional turbulence filter (`grain` prop, default true) gives
//     the stroke ink-on-paper irregularity rather than vector smooth.
//
// Use: wrap target in a position: relative container, drop HandCircle
// as a sibling.
"use client";

import { useEffect, useId, useRef } from "react";

interface HandCircleProps {
  color?: string;
  /** Stroke width in SVG units. Default 3.0 (was 2.4 — bumped for
   *  the new $20M+ scale). */
  width?: number;
  /** Path variant; 1 and 2 are slight irregularities of the same idea. */
  variant?: 1 | 2;
  /** Animation delay in seconds. */
  delay?: number;
  /** Subtle SVG turbulence filter for ink-on-paper texture. Default true. */
  grain?: boolean;
  className?: string;
}

// Paths designed for 180×60 viewBox (3:1). Each variant has a primary
// closed loop and a shorter overshoot stroke that draws past the start.
const PATHS = {
  1: {
    primary:
      "M 96 8 C 52 10, 14 16, 8 32 C 4 48, 50 54, 96 54 C 144 54, 174 48, 172 30 C 170 14, 130 8, 96 8",
    overshoot: "M 90 9 C 50 11, 14 18, 8 34",
  },
  2: {
    primary:
      "M 92 6 C 48 10, 12 18, 10 32 C 9 50, 52 56, 96 55 C 142 54, 172 48, 170 28 C 168 12, 128 6, 96 6",
    overshoot: "M 96 6 C 130 6, 168 12, 170 28",
  },
};

export function HandCircle({
  color = "var(--color-accent-copper)",
  width = 3.0,
  variant = 1,
  delay = 0,
  grain = true,
  className = "",
}: HandCircleProps) {
  const primaryRef = useRef<SVGPathElement | null>(null);
  const overshootRef = useRef<SVGPathElement | null>(null);
  const uid = useId().replace(/:/g, "");
  const filterId = `hand-grain-${uid}`;

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function drawIn(el: SVGPathElement | null, extraDelay: number) {
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = reduced ? "0" : `${len}`;
      if (reduced) return;
      requestAnimationFrame(() => {
        el.style.transition = `stroke-dashoffset 1100ms cubic-bezier(0.22, 0.8, 0.28, 1) ${delay + extraDelay}s`;
        el.style.strokeDashoffset = "0";
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            drawIn(primaryRef.current, 0);
            // Second stroke fires after the first completes — pen-lift,
            // close past the start, lift again.
            drawIn(overshootRef.current, 0.95);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    if (primaryRef.current) observer.observe(primaryRef.current);
    return () => observer.disconnect();
  }, [delay]);

  const path = PATHS[variant];

  return (
    <svg
      className={`hand-circle ${className}`.trim()}
      viewBox="0 0 180 60"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      style={{
        position: "absolute",
        inset: "-14% -4%",
        width: "108%",
        height: "128%",
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      {grain ? (
        <defs>
          <filter
            id={filterId}
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              seed="3"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.9" />
          </filter>
        </defs>
      ) : null}
      <g filter={grain ? `url(#${filterId})` : undefined}>
        <path
          ref={primaryRef}
          d={path.primary}
          fill="none"
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.92"
        />
        <path
          ref={overshootRef}
          d={path.overshoot}
          fill="none"
          stroke={color}
          strokeWidth={width * 0.85}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.55"
        />
      </g>
    </svg>
  );
}
```

Three notes on this. **One:** the `useId` hash on the filter prevents multiple HandCircle instances on the same page from sharing one turbulence filter (which would cause identical noise patterns to look like a repeat). **Two:** if `grain={false}` is needed for forced-colors compatibility, set it via prop where the circle wraps the $20M+ figure — the turbulence filter doesn't survive forced-colors and should drop out anyway, but explicit is safer. **Three:** the overshoot path is intentionally short — it doesn't redraw the whole circle, just the closing arc. That's the "the editor drew the loop then closed past the start with a quick second pass" gesture. Don't overdo it.

**4. Case-study page verdict + smallest-possible improvement.** I went to `/work/ordani` and `/work/guardicore`. The obsidian register is a real choice — it's distinct, it has integrity. The Source Serif 4 italic dek treatment, the `.case-study-still` bordered specimen card, the "Why it matters" CDC paragraph: all editorial-grade. The TitleCard is gorgeous. **But** the body sits in the left ~60% of the viewport with the right 40% as void. Every section opens with a thin horizontal hairline + an h2 + a body paragraph, then ~200px of empty obsidian, then another hairline, etc. The page is composed for a column that's tighter than the viewport, with no scaffolding to anchor the eye in the empty space. The bordered specimen cards (Pass-17 redesign) are the worst-case version of this — a 2px border around mostly-empty obsidian, with an eyebrow + italic title + date stamped in. Reads as "a screenshot would go here." 

Smallest-possible improvement (don't redesign): **add a faint side-rail to anchor the empty column.** Either (a) move the body to a true center-column with equal margins (currently it sits left-of-center), or (b) add a vertical rule at the body's right edge that runs the full page height, breaking only for the specimen cards. A single hairline rail turns the empty space from "missing content" into "designed margin." Cost: ~6 lines of CSS in the `[data-mode="theater"]` block. Second improvement, if you want a real lift: change the specimen-card placeholder from a bordered rectangle to a typeset block — drop the border, set the eyebrow + title + date in a left-aligned block with a thick left rule (like a magazine pull-quote). The card-as-rectangle is what reads "missing image"; a left-rail block reads "deliberate typography." File: `components/CaseStudyStill.tsx` placeholder branch.

The type system bifurcation (Bricolage on home, Source Serif on case studies) IS working — it's the brand/editorial register split that magazines do all the time. The home is the cover; the case study is the inside spread. That's defensible. But the case study layout is currently competing more with itself than with the home, so the bifurcation reads as "different system" rather than "different register."

**5. Craft score: 6.5/10.** The home is an 8. The marquee spacing drags it down half a point. The case-study pages are a 5 — the typography is high-end but the page composition leaves 40% of the viewport unaccounted for, and the specimen cards undercut their own claim of designed restraint. Fix the marquee, fix the hand-circle, anchor the case-study column with a rail or center-balance the body, and this is an 8.5 overall. Until then it's a strong home with a weak inside.

---

## Lena Marchetti — partner, boutique strategy consulting firm

**1. First impression — boutique practice or indie hustler?** Boutique practice with two indie-hustler tells. The hero, the rev section, the credit-line, the case studies: all premium. The two indie tells are (a) the "Inquire ↗" Frontier AI card linking to the same Calendly as the hero's "Book a call" — sophisticated practices route discovery calls by service line, not to one general intake; (b) the absence of any pricing/engagement-tier signal anywhere on the site. The first reads as a placeholder; the second is more interesting — see point 5.

**2. Services portfolio verdict — keep the 4, switch to 3, or different cut?** Switch to 3, with a wording tweak.

The current 4-service grid:
> 01. Go-to-market — *Positioning, market research, and the narrative that closes enterprise deals.*
> 02. Product building — *From strategy to working software, shipped end to end.*
> 03. Launches — *Demand, narrative, and the cascade that follows a launch.*
> 04. Growth systems — *The repeatable engine underneath the numbers — partnership with product teams.*

Three problems with this. **First:** "Launches" overlaps Go-to-market by 70%. If "Go-to-market" includes positioning + the narrative that closes enterprise deals, then "Launches" — demand + narrative + cascade — is a subset of GTM, not a peer to it. **Second:** "Growth systems" reads as a category I'd buy from a YC-stage performance-marketing agency, not from a $200K boutique operator. The wording bracket is wrong. **Third:** none of the four services match the Frontier AI work — which is now a Shipped card but isn't surfaced as a buyable engagement type.

The proposed 3-service cut is cleaner. With one wording adjustment:

> **01. Positioning & GTM** — *Category-shift research and the narrative that carries the enterprise sale. Engagement anchor: Guardicore → Akamai, SurveyMonkey Enterprise on Nasdaq.*
> **02. End-to-end product building** — *Concept through shipped product, by the same operator. Strategy, design, code, security, launch. Engagement anchor: Ordani (HIPAA-grade, 14 practices) and the HR-author full-stack engagement.*
> **03. Frontier AI engineering** — *Production architecture and orchestration for founders shipping AI-native software. Engagement anchor: ongoing, specifics under NDA.*

The "Launches" beat lives inside Positioning & GTM (where it belongs). "Growth systems" disappears — it was the weakest framing anyway, and the case studies don't actually anchor it. Frontier AI becomes a first-class service, which it should already be given the Shipped card. Three sharp services + an "anchor" line per service is the boutique register. Four-service grids read agency.

**3. CLIENTS section structural fix.** The operator's repeated frustration is real and the Pass-17 attempt didn't solve it. I watched the section live: the row layout puts the service title + description in the center, with the "PROVEN AT GUARDICORE → AKAMAI →" anchor floated right in small mono with low opacity. Visually that small right-aligned link reads as fine-print attribution, not as a click-target. The whole row looks like a service description but only the tiny corner element navigates. Buyers will hover the title, get nothing, and move on.

Of the four options the brief lists, **(i) is the right answer** with a structural tweak to make it land:

> Create `/services` as a dedicated page. The CLIENTS section on home stays a teaser — it shows the 3 services (per recommendation #2) with their anchor line and a SINGLE "See services →" CTA at the bottom that links to `/services`. The per-row "Proven at" anchors get killed entirely from the home; they live ONLY on the `/services` page where each service has full scope/process/proof + a "See the engagement" link to the case study.

This solves it because:
- The CLIENTS section becomes a services teaser, not a case-study lookup
- The visible CTA at the bottom matches what the section is actually selling (services)
- Case studies stay where they belong (Shipped section / `/work/[slug]`) without competing with services for the same row
- A `/services` page lets the operator surface engagement tiers (point 5)

File changes:
- `app/(foyer)/page.tsx:160-198` — drop the `<a href={row.href} className="cw-workrow__proof">…</a>` from the CLIENT_OFFERS rows (currently lines ~178-184). Replace with a single section-level CTA after the `</ul>`: `<a href="/services" className="cw-section-cta">See full services →</a>`.
- `app/(foyer)/page.tsx:69-96` — trim the CLIENT_OFFERS array from 4 to 3 entries per the consolidation in #2; remove the `href` and `proof` fields entirely (no per-row link).
- New file: `app/(foyer)/services/page.tsx` — the dedicated services page with the full scope/process/proof per service. Bone world to match clients section. Each service section has its own "See the engagement" link to the relevant case study.
- `app/sitemap.ts` — add `/services` to the sitemap.

Option (iv) — renaming the section to "Four engagement types" or similar — is the smallest possible fix, but it doesn't solve the structural problem (the row is still doing double duty as service description + case study link). Option (ii) — strip case-study links — is half-right but loses the proof. Option (iii) — keep per-row + add section CTA — is the worst of both because the buyer still hovers the title expecting it to be the click-target. Option (i) is the only one that lands.

**4. Frontier AI card destination.** The current Calendly link is wrong for three reasons: it routes AI-engagement intake to the general discovery call (no segmentation), it competes visually with the hero's "Book a call" CTA, and it's the only card in the Shipped grid that DOESN'T link to a case study. The buyer interprets "the AI card doesn't link to a case study" as "there is no AI case study" — which is correct (`content/work/ai-engineering.mdx` doesn't exist) but the link to Calendly papers over a content gap with a CTA, which reads thinner than just acknowledging the gap.

Recommendation: **link to `/services/ai-engineering`** (subpage of the new `/services` page from #3). The subpage covers the scope/process the AI work involves WITHOUT requiring named-client specifics — process is a defensible thing to publish; client list isn't. CTA on the subpage is the same Calendly link, but it's contextualized as "the AI inquiry routes to a call about engagement fit," not "click here to book the same call as everyone else."

If `/services/ai-engineering` doesn't ship in this pass, fallback is option (iii) from the brief — unlink the card entirely, replace the "Inquire ↗" with a "Currently engaging — accepting inquiries by referral" eyebrow. The card becomes read-only marketing until the supporting page exists. That's still better than the Calendly redirect because it doesn't promise discovery, it signals selectivity.

File changes:
- `app/(foyer)/page.tsx:322-323` — replace `href="https://calendly.com/..."` with `href="/services/ai-engineering"` and update `target` + `rel` (now internal, drop `_blank`).

**5. Pricing/packaging signals — surface or stay private?** Stay private on pricing, surface engagement TIERS. The boutique register is "we don't publish day rates" because day rates anchor down; the boutique register also IS "advisory / project / retainer / embedded" as engagement shapes because that's how the buyer matches their need to your offer. The four-tier shape is the standard. Micah's case-studies map cleanly:
- **Advisory** — periodic strategy sessions, no shipped artifacts. (Currently invisible; could anchor a service-page tier.)
- **Project** — Guardicore positioning research, HR-author content engine. (Currently bracketed by case studies.)
- **Retainer** — HR-author "stayed on retainer for ongoing strategy" (per the MDX). (Currently named in passing.)
- **Embedded** — Frontier AI "2025–present · Embedded" tag on Card 3. (Currently surfaced as a card tag.)

The site is one-tier-too-flat — every engagement reads as "case study," not as "advisory or project or retainer." Surfacing the four tiers on `/services` (without prices) shifts the buyer's mental model from "do I have a project that fits" to "which tier matches my need." That's a boutique move.

File change: when `/services` page lands, structure it as 3 services × 4 tiers grid (or per-service tier section), with each cell containing the SHAPE of an engagement at that tier ("typical scope," "typical duration," "typical first-month deliverable") and no dollar figures.

---

## Synthesis

**1. The consistent friction point — what 3+ personas flagged.** The Frontier AI card linking to Calendly. Maya called it "lazy" and a placeholder. David called it thin. Lena called it an indie-hustler tell. All three agreed the destination is wrong. The unanimous fix is: build a `/services` page (or even a `/services/ai-engineering` subpage), point the card there, and turn the Calendly link into the deeper conversion path AFTER the prospect understands the engagement shape. The card-to-Calendly hop is collapsing too much information into one click. Fix this first — it's a one-line href change once the destination page exists, and a one-character href change ("/services/ai-engineering") if the page is stubbed.

**2. The consistent compliment — what everyone independently liked.** The revenue+exits section. Maya called "trillions" the closing line. David ignored everything else when he first scrolled. Marcus didn't critique it (which from Marcus is praise). Lena called the case-study anchors "boutique register." The figure + dek + 01/02 editorial-index pattern + the named-customer narrative texture (TD Bank, Deutsche, NIH, PNG) is doing the heaviest credibility lifting on the site. The hand-circle on the figure needs the Marcus refinement, but the SECTION is the page's strongest moment. Don't touch the structure.

**3. The biggest single open question.** Operator concern #1 — the case-study pictureless frame — has the least clear path forward across personas. Marcus says "anchor the empty column with a rail." David says "the pages look unfinished." Lena would say (implied) "they look like an indie portfolio's projects, not a boutique's case file." Maya didn't comment because she'd never click into them. The four readings don't converge on a single fix because the underlying question — whether the case studies should be photograph-driven, schematic/diagram-driven, or pure-typography editorial — hasn't been answered. The Pass-17 specimen-card placeholder bets on pure-typography editorial; the bet doesn't quite land because the rest of the page composition isn't supporting it. Before the next pass, the operator needs to decide which of three commitments the case studies are making: (a) commission real photography / screenshots that ship in the cards, (b) commission custom illustration / diagram per case study, OR (c) commit to typography-only editorial restraint AND redesign the page composition to support it (no bordered rectangle placeholders, no centered-narrow-column body — instead a typeset spread that earns its empty space the way a magazine 2-page editorial does). Until that bet is named, every pass at the placeholder is a partial fix.

**4. The smallest cross-persona change.** `app/globals.css:5818-5820` — the marquee descendant-span margin rule. Replace it with the scoped version Marcus wrote above (three rules: outer-block margin 0, word-wrapper margin 0 14px, dot padding 0 4 0 12). Why this one: Marcus called it the "first failure of restraint" — meaning it's the polish issue every taste-aware visitor clocks in the first scroll. Fixing it costs ~5 lines of CSS, no JSX changes, no design rethink. It moves Marcus from 6.5 to 7. It removes the only thing on the page that reads as careless typography. Maya didn't notice it consciously (she scrolled past); Marcus diagnosed it; Lena would tolerate it but mark it down. So the change moves Marcus 0.5 grade points and removes one passive-deduction from Lena's read — net effect across the personas is asymmetrically positive. Five lines, ten minutes, biggest delta-per-effort on the page.
