# Design directions: the "How I work." section (Pass-126)

You are proposing visual design directions for ONE section of micahjonesconsulting.com, the personal site of Micah
Jones, a solo operator who builds products and sells them (AI engineering, product building, positioning and
go-to-market). You have no files and no browsing; everything you need is here. Two or three other design models get
this same prompt; a judge picks one direction, it is built on a preview branch, and the owner judges the rendered page.

## The ask (the owner's own ruling, 2026-09-21)
"Same words, better design" for the How I work section on the home page, and "carry it to other pages": the same
four steps also go on /services, which today states the same commitments in different words. The WORDS ARE LOCKED.
You design how the section looks and moves, not what it says.

## The locked copy (verbatim; you may not change, add or remove a word)
Heading (visible): How I work.
Step label / headline / body:
- Scope / Week one is an audit and a scope. / I look at where things stand: what works, what is broken, and what to fix
  first. The scope and the price go in writing before anything starts.
- Plan / I name the trade-offs before I build. / You get a roadmap, and you sign off on it before I build anything.
  Something named ships in month one.
- Build / I build the real thing, not a prototype. / That means sign-in, data, deployment, and where it stands on
  compliance, written down. You get me, directly, and a reply within one business day.
- Stay / I stay for launch and what customers break. / I interview customers and listen to sales calls to find the
  question buyers are actually asking. Then I hand over documentation and a walkthrough so your team runs it without me.
Then one link: See the work (to /work).

## What it looks like now (the problem)
On the home it sits on a dark espresso ground, directly after the hero and the two "which one are you" doors, and
directly before the site's $20M+ receipts figure (a poster-size number with a short video clip inside the numerals).
The heading "HOW I WORK." is set in huge uppercase Bricolage display type. Below it, four IDENTICAL blocks stacked
vertically, each: a tiny mono uppercase label (SCOPE), a large uppercase display headline running the full width
(~44px at 1440), a small body paragraph in a narrow ~420px column at the left, then a thin hairline rule. At 1440 the
right two thirds of every block is empty ground. Every step has the same weight, size and rhythm, so it reads like a
spec sheet, not a sequence someone lives through. At 390 it is the same stack, headlines wrapping to 2 to 4 lines.
The research this site follows lists "uniform component sizing" and "everything in threes, cards everywhere" among the
2026 tells of a templated, AI-made page.

## The theme you design inside (not negotiable; the owner rejected a full redesign on 2026-09-18)
- Colour worlds: each section sits on one full-bleed ground and the page recolours per section as you scroll. Grounds
  available: cream paper #F5EFE4, bone #ECE3D0, espresso #2a1f18 (a warm brown-black), ink #1A1816, terracotta #9e3c25 (an
  oxidized brick used for the site's closing CTA). ONE accent per screen: copper #bd5a2d (fine for large text, rules and
  shapes; on paper it fails contrast for body text, where copper-deep #8a3d24 is used). No gradients, no purple, no glow.
- Type: Bricolage Grotesque for display (a variable font: weight 200 to 800 and an optical-size axis); Hanken Grotesk for
  body; JetBrains Mono ONLY for small labels, codes and data, never body or headings.
- Motion the owner has PERMITTED (2026-09-18): type and numbers may move with the scroll; a section may hold (sticky)
  while its content changes; entrances may run past 400ms. BANNED: cursor followers, scroll that changes speed
  (scroll-jacking), marquees, anything that loops idly. Reduced motion always gets the finished frame; no-JS gets the
  finished frame. Prefer CSS scroll-driven animation (animation-timeline: view()/scroll()) with a static fallback; GSAP
  is allowed only through one existing split-text component.
- Hard design limits: NO step numerals (no 01/02/03/04, no "Step 1"; a ruling of 2026-09-21); NO box-and-arrow or
  flowchart diagrams of the work (a hold since 2026-09-18); NO equal cards in a grid; no icons, stock, illustration,
  3D. The "HOW I WORK." heading stays visible.
- Performance: Lighthouse mobile performance 95+, and layout shift (CLS) at or under 0.05 MEASURED WHILE SCROLLING (a
  scoreboard on this site once restyled its cards on scroll and shipped CLS 0.33). A sticky/held section must reserve
  its height up front.
- It must work at 390px and at 1440px, and it must have a variant that sits on a LIGHT ground (bone or cream) for
  /services, where it replaces a plain bulleted list.

## References the owner's research set used (borrow moves by name; do not copy a site)
by-kin.com (restraint, editorial type, smooth transitions), unseen.co (type-led pacing), obys.agency (static frames that
already look like posters), basement.studio (massive tight display type, one warm accent), uncommonstudio.com.au (a grid
that breaks at the right moment), matvoyce.tv (kinetic type that never blocks reading), linear.app (specific, print-like
discipline), vercel.com (engineered hairlines and grids), aristidebenoist.com (pure type and motion feeling expensive).

## Hand back: TWO genuinely different directions, each 350 words or fewer, plain markdown
For each:
1. Name, and the idea in one sentence.
2. Why a buyer (a founder or a small-business owner deciding whether to hire him) reads it as a real sequence of work
   rather than a spec sheet. Name the reference move you borrow.
3. Layout at 1440 and at 390: what goes where, type sizes (px or clamp), weights, the ground, where the copper accent
   lives, spacing. Every one of the four steps must be fully readable.
4. Motion: what moves, what triggers it, how long, what holds; the reduced-motion and no-JS frame; the CLS plan.
5. The /services light-ground variant, in two sentences.
6. The one risk that would make the owner reject it on sight, and how the direction avoids it.
No preamble. No code.
