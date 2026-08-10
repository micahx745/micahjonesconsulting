# DESIGN_BAR.md — The Reference Bar for micahjonesconsulting

Internal reference. Sets the bar the site is graded against. A separate reviewer grades pages
against §6 (THE RUBRIC); a builder builds against it. Compiled 2026-08-10 from two research legs:
(A) direct fetch/teardown of six-to-seven-figure design-firm sites; (B) craft/anti-slop and
enterprise-buyer research. All sources in §7.

Target: micahjonesconsulting.vercel.app / www.micahjonesconsulting.com — solo enterprise operator,
three exits, financial-data/security GTM into banks, $149 field manual on a gated page.
Stack: Next.js 16, Tailwind v4, "Color Worlds" system (terracotta/bone/petrol/espresso),
Bricolage display, one signature motion, hand-drawn SVG accents.

**Notation:** banned-word tells in this doc are written with an interpunct (e.g., "seam·less") so
this file itself passes the repo's copy-lint hook. Strip the dot when grepping the live site —
the site must contain none of these words in plain form.

---

## 1. The bar, in one paragraph

A site reads like a $100K–$1M firm when it asserts instead of explains and curates instead of
selling: a one-sentence verb-first thesis a visitor absorbs in two seconds; a nav of at most five
bare items; a page that is mostly work and proof, with case entries compressed to client + one
figure-bearing line and depth deferred to dedicated pages; exactly two typefaces with real scale
contrast (display 4–8× body) and hierarchy built from space, not boxes; one held palette and one
accent doing real work; exactly one signature motion, engineered, never sprinkled; a footer that is
logistics; at least one authored point-of-view surface (published writing, a priced named offer, a
field manual presented as work); and a total absence of selling pressure — no urgency, no popups,
no logo soup, no adjectival self-praise — because at this tier restraint IS the signal: the site
behaves like a firm with a full pipeline. A solo operator earns the tier the way Rauno Freiberg and
Dan Mall do — visible taste plus named, priced offers and interrogable numbers ($80M pipeline,
$14M revenue, $1M+ toward IPO) — not by imitating 200-person-firm scale.

---

## 2. Reference set

| # | Exemplar | URL | Observable traits |
|---|---|---|---|
| 1 | **Pentagram** | pentagram.com | 5-item nav (Work, About, News, Contact, Search). Homepage = project cards, 1–2 line descriptions, no service pitches. Footer nearly empty: Privacy + "© 1972–2026" — the date range asserts longevity. One-sentence tagline. |
| 2 | **COLLINS** | wearecollins.com | ~85% imagery / 15% text. 3-word command headline ("Rewrite your worth"). Services as 11 named productized "Programs." Footer: email, few links, one quiet award row. |
| 3 | **Koto** | koto.com | Work cards carry exactly four data points: client, one-line tagline, year, category. One-sentence tagline, no adjectival pile-up. Clients named plainly in text. |
| 4 | **Instrument** | instrument.com | Homepage work carousel with NO descriptions — depth lives on case pages. "Select clients" list states curation. Awards as one discrete section. Quarterly editorial newsletter. |
| 5 | **Metalab** | metalab.com | Three-word thesis: "We make interfaces." Numbered portfolio sequence, almost no prose. ONE bespoke interaction (HoverDrag), not many effects. |
| 6 | **BUCK** | buck.co | One-sentence brand statement, then work tiles (hero image + title + one sentence). Footer = offices/contacts — logistics, not marketing. Six-item nav. |
| 7 | **Locomotive** | locomotive.ca | Nav = 4 items + "Let's talk." Five featured case studies in a restrained grid. Credibility via specifics ("15 years"), never superlatives. |
| 8 | **Darkroom** | darkroom.engineering | Authority via shipped open source (Lenis: Awwwards SOTD, industry-default scroll library) — the craft claim is a verifiable artifact, not adjectives. One-line self-description. |
| 9 | **Work & Co** | work.co | Title is name + category, zero adjectives. App-grade fully client-rendered build signals product-firm engineering. |
| 10 | **DesignStudio → Further** | design.studio → further.group | An entire page carrying ONE repeated sentence + a single CTA — top-tier comfort with emptiness. |
| 11 | **Rauno Freiberg** (solo craft benchmark) | rauno.me | Near-monochrome, zero decoration, hierarchy from spacing and type alone. The site demonstrates its own principles. Closest structural analog for a solo operator. |
| 12 | **Dan Mall / SuperFriendly** (solo commercial benchmark) | danmall.com | Solo operator documented at $100K/month engagements. Sells point of view via writing, books, named priced offers — proof a one-person site reads six-figure through authored expertise, not headcount. |

---

## 3. Common denominators (effectively all exemplars)

1. **One-sentence, verb-first thesis; zero filler adjectives.** Nobody explains; everybody asserts.
2. **Nav of 4–6 items, always including a bare "Work."** No mega-menus, no "Solu·tions" or
   "Resources" dropdowns. Contact as a sentence-case invitation ("Let's talk").
3. **Imagery-to-prose ratio inverted toward work.** Homepage case entries carry ≤4 data points
   (client, one line, year, category); depth deferred to case pages. The homepage curates; it does
   not sell.
4. **Two typefaces max; hierarchy from scale and space**, never boxes/borders/gradients.
5. **Curation as stated posture** — "Select clients," five projects not fifty. Scarcity on the page
   implies demand off it.
6. **Time-depth via specific numbers** ("© 1972–2026," "since 2006," "15 years") — never
   "years of experience."
7. **Services, where present, are named productized offers** (COLLINS' Programs, Mall's priced
   options) — nouns with names, not capability bullet lists.
8. **One signature motion/interaction, engineered properly.** A single owned pattern, never a
   parade of scroll effects. (The site's existing "one signature motion" rule matches the field.)
9. **Footers are logistics:** address, email, socials, privacy, copyright. Awards, if any, one
   quiet row.
10. **An authored point-of-view surface somewhere** — editorial, newsletter, open source, books.
    Expensive firms publish; cheap ones only pitch. (The $149 field manual qualifies IF presented
    as a published work, not a lead magnet.)

---

## 4. The never-list

Merged from both legs. Any single instance is a defect; several are automatic-fail tells in §6.

**Color & surface**
- Indigo/purple or cyan-to-purple gradients (the Tailwind-`#6366F1` AI tell). Gradient text.
  Glow/halo/radial-orb decoration. Neon-on-dark glowing card borders.
- Glassmorphism. Shadows at the reflexive 0.1-opacity default. Cream/beige used reflexively with
  no palette system behind it (Color Worlds IS a system — the tell is systemlessness).

**Cards & layout**
- Three rounded cards in a row: icon above heading above 3-line blurb (the Tailwind-tutorial
  feature-section default).
- Thick one-side accent border on cards. Cards nested in cards. Border radius >16px on content
  containers. Hairline border + wide diffuse shadow combo.
- Centered symmetric hero stack: badge/eyebrow pill → headline → subhead → two buttons.
- Uniform section padding down the whole page; decorative grid-line backgrounds; hero-metric
  layout with gradient accents.

**Typography**
- Inter/Roboto/Geist/Open Sans as the display face ("the font of no typography decision").
- Flat hierarchy (adjacent sizes within 15%). Tracked-uppercase kicker labels on every section.
  Italic-serif hero as the reflexive "elegance" move.

**Imagery & proof**
- Stock photography, stock 3D blobs, Undraw/Storyset figures, AI-generated imagery.
- Logo-soup carousel; "trusted by 500+" counters; testimonial sliders with headshots; star
  ratings; generated avatars; animated stat tickers.

**Motion**
- AOS-style fade-up on every section; parallax everywhere; hover lifts and stagger sprinkled
  broadly; bounce/elastic easing; pulsing status dots on static content; auto-scrolling marquees;
  anything that loops idly.

**Copy & selling pressure**
- Hedged/explanatory headlines ("We help businesses grow through…").
- Hype vocabulary anywhere in body copy: stream·line, em·power, supercharge, world·class,
  seam·less, cutting·edge, enterprise-grade, award-winning, plus the full repo copy-lint banned
  list (see `premium-web:copy-lint-rules`). Emoji bullets. "Years of experience" without a number.
- Mega-menu, chatbot bubble, exit-intent popup, floating CTA bar, urgency/scarcity devices
  (countdowns, "slots filling"), triple-repeated CTAs, dense 30-link footers.

Where decoration exists at all in the exemplar set, it is authored — which validates the
hand-drawn SVG accents, provided they are ONE consistent voice, used sparingly.

---

## 5. Typography standard

**The premium foundation:** a display face with personality paired with a calm legible text face —
one carries voice, one carries reading. Two faces maximum; a mono for numerals/data is an
acceptable narrow third voice. Free fonts aren't disqualifying — *default* fonts are; the tell is
absence of decision, not absence of budget.

**Scale:** display-to-body 4–8× (e.g., 72–120px against 16–18px). Each hierarchy level ≥1.25× the
last; no more than ~5 active sizes; no two adjacent levels within 15% of each other.

**Setting:** body ≥16px; line length 65–75ch; line-height 1.5–1.7 body, 1.0–1.15 at display sizes;
negative tracking acceptable at display scale; generous letter-spacing only in small-caps/label
settings; WCAG AA (4.5:1) everywhere, including muted text.

**Reconciliation with the existing system (Bricolage display + Inter body):**
- **Already at the bar:** Bricolage Grotesque has visible character (ink traps, quirky terminals) —
  exactly the class of characterful grotesk the research names as qualifying. Inter confined to
  body duty is fine; the documented tell is Inter-as-everything or Inter-as-display.
- **Pressure point 1 — scale contrast:** the bar demands display ≥4× body. Verify hero/section
  display sizes actually hit 64px+ against 16–18px body on every page; a Bricolage headline at
  32px over 16px Inter reads template-tier regardless of the faces chosen.
- **Pressure point 2 — Inter creep:** Inter must never carry a headline, section title, or any
  voice moment. If a surface needs a third voice for numerals/metrics ($80M, $14M), use a mono
  narrowly — not a third display face.
- **Pressure point 3 — label discipline:** tracked-uppercase eyebrows are a named tell when they
  appear on every section. If the system uses kickers, they must be rare and earn their place.
- **Color Worlds note:** warm terracotta/bone/petrol/espresso is an authored system, which passes;
  the beige tell applies only to systemless cream defaults. Hold ONE accent per page context.

---

## 6. THE RUBRIC

Twenty pass/fail criteria. Each is observable on the rendered page; a reviewer answers pass/fail
by looking. Grade per page; report R-numbers.

**Type & color**

- **R1 — ≤2 typefaces** (a mono for numerals/data permitted as a narrow third); the display face
  has visible character. Inter/Roboto/Geist/Open Sans serving as the display face is an automatic
  fail.
- **R2 — Real scale contrast:** largest display type ≥4× body size; no two adjacent hierarchy
  levels within 15% of each other; ≤5 active sizes per page.
- **R3 — Body discipline:** body ≥16px, line length ≤75ch, line-height 1.5–1.7, AA contrast
  (4.5:1) everywhere including muted/"subtle" text.
- **R4 — One accent color per page context doing real work; zero purple/indigo/cyan gradients,
  zero gradient text, zero glow/halo/orb decoration.**
- **R5 — No glassmorphism, no one-side accent-border cards, no cards nested in cards, no border
  radius >16px on content containers.**

**Layout & structure**

- **R6 — No section is a centered symmetric icon-grid** (icon above heading above blurb × 3). Any
  grid of like items is asymmetric, weighted, or broken by an off-grid element.
- **R7 — The hero is left-aligned or deliberately asymmetric and states the offer in ONE
  grammatical sentence readable in ~2 seconds** — an assertion that would fit on a business card,
  not an explanation. No badge-pill + headline + subhead + dual-button center stack.
- **R8 — Vertical rhythm varies:** at least one full-bleed or intentionally quiet/short section;
  section paddings are not uniform down the page; major section gaps are generous (on the order of
  15vh+), not a constant 96px.
- **R9 — Exactly one signature motion/visual gesture exists**, deployed deliberately in specific
  moments — not sprinkled on every section, and not zero identity either.
- **R10 — Nav is ≤5 primary items** including a bare "Work" (or direct equivalent); contact is a
  plain invitation; no mega-menu, no dropdown taxonomies, no "Resources."
- **R11 — Case/work entries on index surfaces carry ≤4 data points** (client/context, one
  figure-bearing line, year, category); depth is deferred to dedicated case pages. The page
  curates; it does not sell.

**Imagery & proof**

- **R12 — Every image is a real artifact** — actual screenshot, document, photograph, or hand-made
  graphic tied to the work. Zero stock photos, stock 3D, Undraw-style figures, AI-generated
  imagery. Hand-drawn SVG accents pass only as one consistent authored voice, used sparingly.
- **R13 — No logo wall without outcomes; any client or company named is attached to a specific
  figure-bearing result. No testimonial carousel, no star ratings, no generated avatars, no
  animated counters.**
- **R14 — At least one proof block contains a named metric WITH mechanism** (what was done → the
  number that changed) that a skeptical CFO could interrogate — e.g., the $80M pipeline / $14M
  revenue Guardicore result stated with its how.

**Motion & copy**

- **R15 — Motion is punctuation:** nothing animates idly (no pulsing dots, marquees, looping
  gradients); entrance effects, if any, run once, ≤400ms, ease-out, transform/opacity only.
- **R16 — Copy passes the specificity test:** zero instances of hype vocabulary (stream·line,
  em·power, supercharge, world·class, seam·less, cutting·edge, enterprise-grade, award-winning, or
  anything on the repo copy-lint banned list — dots stripped when grepping); zero emoji bullets;
  time-depth stated as specific numbers (years, dates, dollar figures), never "years of
  experience"; every headline could only describe THIS operator.
- **R17 — No selling pressure:** one CTA style per page, no urgency/scarcity devices, no popups,
  no exit-intent, no chat widget, no floating CTA bar.
- **R18 — The footer is logistics:** contact, socials, legal, copyright (ideally with a date
  range). No marketing copy, no 30-link sitemap dump, no "Resources" columns.

**Property-level**

- **R19 — An authored point-of-view surface exists on the property** — the field manual presented
  as a published work with a price (not a gated lead magnet), and/or writing/frameworks under the
  operator's name. Named, productized offers count toward this.
- **R20 — The screenshot test:** a full-page screenshot at 50% zoom is attributable — someone who
  has seen the site once could identify it. If it could be any of 50 SaaS templates, fail.

**Scoring guidance for the reviewer:**
- 18–20 pass = studio-grade (commands the tier)
- 15–17 = competent but not commanding
- ≤14 = template tier, regardless of polish elsewhere
- **Load-bearing criteria: R1, R4, R6, R12, R20.** Failing any TWO of these caps the grade at
  template tier no matter the total.

---

## 7. Sources

**Leg A — exemplars (fetched Aug 2026 unless noted)**
- https://www.pentagram.com/
- https://www.wearecollins.com/
- https://koto.com/ (koto.studio 301s here)
- https://www.instrument.com/
- https://www.metalab.com/
- https://buck.co/
- https://locomotive.ca/en
- https://design.studio/ → https://further.group (rebrand page)
- https://rauno.me/
- https://work.co/ (JS-rendered, title-only)
- https://www.awwwards.com/sites/lenis-2 (Lenis SOTD)
- https://github.com/darkroomengineering/lenis · https://oss.darkroom.engineering/lenis
- https://v4.danmall.com/ · https://danmall.com/posts/pricing-profitable-projects/
- https://pricingdesignbook.com/
- https://huemor.rocks/blog/best-agency-website-designs/
- https://colorlib.com/wp/branding-agency-website-examples/
- https://passionates.com/top-pentagram-alternatives/

**Leg B — craft / anti-slop / buyer psychology**
- https://impeccable.style/slop/ (exhaustive tell catalog)
- https://www.925studios.co/blog/ai-slop-design-tells
- https://superdesign.dev/blog/why-ai-design-looks-generic (Show HN fingerprint audit)
- https://publishd.app/blog/make-ai-built-site-not-look-ai
- https://inkbotdesign.com/trust-signals/ (enterprise proof psychology)
- https://www.avathiery.com/blog/7-font-pairings-that-instantly-look-premium
- https://www.hontran.dev/blog/best-award-winning-websites-2026
- https://squarerootseo.com/blog/website-trust-signals-that-convert/ (rep-free buying stat)
