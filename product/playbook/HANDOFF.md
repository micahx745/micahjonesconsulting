# THE 80% WALL — workstream handoff (READ THIS FIRST)

Dedicated workstream: perfect the book, bring it to life, ship it for money.
This file is the book-of-record for `product/playbook/`. The site-wide rules in
the repo root (`CLAUDE.md`, `.claude/CLAUDE.md`, `docs/LESSONS_LEARNED.md`) still
apply on top.

## State (2026-08-31 PM — Pass-45 perfection pass DONE)

PERFECTION PASS COMPLETE (buyer-persona cold-read + claude-code-guide expert review +
full 76pp visual walkthrough + editor consistency sweep; all findings fixed or rejected
with reasons). Book is now **68pp**: the 8 "NEXT · CHAPTER" teaser pages (ch2-9) are
edition-suppressed in the book (kept in standalone/sampler PDFs) — buyer review read
them as padding; their text also resurrected operator-rejected copy (Vercel/Supabase in
ch3's, "Product Hunt" in ch7's, "fractionalize" in ch9's) — teaser text now mirrors the
target deks. Other fixes: ch1 opener says "Chapter one of ten" in book edition
(edition-status helper; sampler unchanged); .env.example card copyable (hard linebreaks);
filecards smartquote-off (ch5 SQL curly quotes were unpastable) + escaped `\-\-` (Typst
en-dash shorthand); auth.uid()/E.164/webhook-"work after" glossed; ch9+ch10 credential
repetition trimmed (ledger-safe removals only); ch10 End page now gives companion-files
access + /playbook as free-ch1 share path; Cursor note precision (.mdc). Rejected with
reasons: Codex nit (audience knows the tool), month-only build-log dates (honest; never
invent precision), "$5B+" phrasing (ledger-locked, operator-owned).
- DELIVERY CONTRACT (End page asserts it): the purchase delivery MUST include the
  companion ZIP alongside the book PDF. Bind this into the Stripe webhook build.
- `src/chapter-01..10.typ` — ten chapters, Typst, one design system (`src/template.typ`)
- `src/book.typ` — assembled book: cover, queried TOC, 68pp, `output/the-80-percent-wall.pdf`
- Chapter 1 doubles as the free sampler (`output/the-80-percent-wall-ch1.pdf`); an
  edition state in template.typ suppresses its sales colophon inside the book.
  The sampler is EMBEDDED for delivery: `node product/playbook/embed-ch1.mjs`
  regenerates `lib/chapter1-pdf.ts` after ANY ch.1 recompile — never skip this.
- `companion/` — 26 files (templates, ten checklists, six prompts), zipped to
  `output/the-80-percent-wall-companion.zip`
- Sales page: `app/(foyer)/playbook/page.tsx` (live, waitlist phase, delivers ch.1 by email)

## The pipeline (non-negotiable, in order)

1. Edit `.typ` → 2. `python check.py src/chapter-NN.typ` (banned words, em-dash cap,
   fieldnote-before-heading) → 3. compile chapter AND book → 4. rasterize
   (`typst compile ... "{p}.png" --format png`) and LOOK at every changed page →
   5. if ch.1 changed: `node product/playbook/embed-ch1.mjs` → 6. commit.
- Compile: `typst compile src/book.typ output/the-80-percent-wall.pdf --font-path fonts`
- Page-count/byte asserts are blind; the visual walkthrough is the gate (a "verified"
  deck once shipped with an invisible slide — see machine playbook document-artifacts.md).

## Hard rules for this content

- EVERY factual claim uses the verified ledger phrasings in `docs/LESSONS_LEARNED.md` #3.
  Never invent numbers, roles, dates, or war stories. Every build-log entry in the book
  is TRUE and dated; keep it that way — it is the product's core trust asset.
- VENDOR GATE (now build-blocking, `scripts/vendor-gate.mjs`): no infra vendor/engine
  named in anything that mentions Ordani. In the book, Ordani field notes say
  "in the database", never an engine. Dev tools (Claude Code, Cursor) are permitted.
- Voice: first person, short sentences, em-dashes ≤2/chapter, 30-word banned list in
  `.claude/brand.json`. check.py enforces the mechanical parts.
- HIPAA-compliant (operator-confirmed), never "HIPAA-grade".
- Design system: Color Worlds print grammar (bone/espresso/terracotta/saffron/petrol,
  Bricolage/Hanken/JetBrains Mono, marginalia rail, § codes, filecards, pre-flight
  cards, line-drawn diagrams). Fonts vendored in `fonts/` (OFL).

## Mission status (2026-08-31 PM)

1. Perfection pass: DONE (Pass-45, e7860c7). 2. Harness: DONE (Pass-46, 43a1f83) —
check.py gained the block-scoped Ordani vendor check (negative-tested) AND now runs as a
blocking PostToolUse hook on product/playbook/src/*.typ writes (.claude/settings.json →
hook-gate.py; live-fire proven). Skill evaluations, rejected with reasons: beautiful-prose
(hollow stub, verified — no actual style contract), copy-editing (superseded by the house
copy-editor agent + copy-lint + check.py), pdf-official (forms/manipulation; Typst
pipeline has no need), canvas-design (would fight the locked print grammar).
Deferred to their surfaces: frontend-design/scroll-experience/impeccable-* (the /playbook
launch flip), remotion-best-practices (only if a video render step appears).
3. Animation: the perfection pass is done, so the generation ask is NOW OPEN (see
operator queue below). Integration returns to this workstream when assets land.

## STRIPE RAIL — BUILT AND E2E-VERIFIED IN TEST MODE (Pass-49/50, 2026-09-01)

Live-verified twice ($99 test payments, 4242): hosted checkout → Stripe's own webhook
delivery → ONE email w/ book PDF + companion ZIP (idempotent on session id) → sale note;
refund → refund echo note. Signature negatives verified (unsigned/wrong-key → 400).
- Code: app/actions/playbook-checkout.ts (session + metadata tag), app/api/stripe/
  webhook/route.ts (verify → re-fetch → metadata gate → deliver), lib/playbook-
  delivery.ts, lib/stripe.ts, app/(foyer)/playbook/thanks (noindex), scripts/
  stripe-setup.mjs (per-mode catalog), product/playbook/embed-book.mjs (re-run after
  ANY book/companion change, like embed-ch1).
- TEST infra: price_1UAux6PJokEBk2aD0E264TQj ($99, lookup playbook-99) · webhook
  we_1UAvPaPJokEBk2aDzUsGSVeO → stripe-test.micahjonesconsulting.com (preview alias;
  URL carries the Vercel automation-bypass query param — SSO protects previews) ·
  deploys carry env via `vercel deploy -e K="$(cat tmpfile)"` because the project's
  Preview env vars are branch-scoped to redesign-wave4 (main-branch previews get NONE —
  cost an hour: delivery failed w/ RESEND_API_KEY unset until injected).
- ⚠ SHARED STRIPE ACCOUNT: Ordani's webhook (v0-birth-worker-platform.vercel.app)
  receives ALL events on this account, and ours receives Ordani's. Our side is gated
  by metadata.product=playbook-99 (Pass-50). OPERATOR DECISION for go-live: separate
  Stripe account for the book (clean) vs. staying shared (then confirm Ordani's LIVE
  webhook safely ignores foreign events).

## LAUNCH PAGE v2 — "GO WILD" REBUILD (Pass-53/54, 2026-09-01 PM)

Operator brief after seeing v1: "feels weak… I need to feel special… make them want to
buy… too wordy… no trust signals… no restraint, go wild." Process: DISCUSS lock (his
answers) → research leg (2026 exemplars, all fetched live: Refactoring UI, Practical UI,
Whimsy, Devouring Details, Resend, Dia, Awwwards SOTD Aug-Sep 2026; ranked "want" moves
+ word budget hero ≤45 / page ≤900) → design-director round 2 → build → Playwright
verification per act → buyer-persona cold read → revisions.
- SHIPPED: three-act world arc espresso → bone → espresso (per-section data-world; the
  site's own crossfade rearranged); THE OBJECT hero (real cover, static 7° tilt, one
  edge-light, still the loop socket via <PlaybookHeroMedia videoSrc>); pain trio + after
  trio; trust block (Ordani first in display type, then first-person ledger-exact exits/
  revenue line, then the dead-forms wall line); full-bleed filmstrip of six real spreads;
  companion card as demonstration; TOC as page-numbered index with five-word failure
  tags; counted-from-source numbers + the 26 files defined; $99 headline / $149 anchor;
  capture form inside the price box too. 611 words (was ~1,500).
- PERSONA COLD READ (vibe-coder, skeptic): want 6/10 → would leave email YES, pay $99
  "not today, leaning maybe" — top asks applied: capture in the price box, Ordani before
  the $5B line, failure tags in the index, files defined, mechanism in after-line 3.
- OPERATOR-OWNED ASKS from the read: a SHIP WINDOW for the price box ("ships <month>")
  and a face/name photo in the author block. Both convert; both are facts only he has.
- Render gotcha: full-page screenshots freeze the world at one bg — verify bone/espresso
  sections with viewport captures after real scrolling (run_code script in session).
- Mechanical lessons: equal-specificity overrides lose to SOURCE ORDER (mobile hero
  collapsed to 0px twice); scroll-snap-align:start eats scroll-container padding on load
  (removed snap). Both fixed and verified by computed values, not by eye alone.

## LANDING PAGE v1 (Pass-52 — superseded by v2 above; kept for the pipeline notes)

/playbook is now the premium landing page, still in waitlist phase. Shipped: asymmetric
hero (kicker · H1 · the book's cover sentence · one mlink CTA down to the sampler) beside
an espresso 3/2 media slot holding the REAL cover render; a proof strip (real interior
spread p.20 five-box map + the real checklists/05-security.md rendered through the
book's own preflight() grammar via product/playbook/marketing/companion-card.typ);
rhythm variance (hero/pain wide, TOC→sampler→zip tight); chapter blurbs synced verbatim
to the book's deks; ZIP list synced to the real 26 files; the stale "$149" kicker gone
(one price artifact on the page). Verified: typecheck+build green, Playwright full-page
at 1440 and 390 (no overflow, all reveals fire, images load). Red lines held: no 3D
cover, no petrol/saffron in page chrome, no second CTA style, no new motion.
- ⚠ CONCURRENT-ARC NOTE: the site session's commit bfc0363 ("Pass-47: self-serve
  packages") swept this whole in-flight build into its commit. Correct content, wrong
  subject line; the proof-spread caption fix landed separately (Pass-52). That session
  is ALSO refactoring the webhook route + lib/stripe.ts into a SKU catalog for its
  packages — the E2E-verified rail is being modified. RE-RUN the test-mode E2E before
  go-live and confirm the metadata gate survives their refactor.
- ANIMATION SOCKET (ready): drop the operator's loop at public/playbook/factory-loop.mp4
  (<4MB, muted, loopable) and pass videoSrc="/playbook/factory-loop.mp4" to
  <PlaybookHeroMedia /> in app/(foyer)/playbook/page.tsx. Same box, cover = poster,
  reduced-motion users keep the still. Wide stills (PROMPT 3/4) can replace the cover
  or join the proof strip through the same next/image pattern.
- PIPELINE LESSON: page-number renders (spread-*.png) are pagination-bound — the 68pp
  repagination silently moved "p.21" from the diagram to body text and the caption
  would have lied. After ANY book recompile that changes pagination, re-render every
  spread AND look at it against its caption.

## RAIL EXTENDED BY THE MAIN SESSION (Pass-52, 2026-09-01) — read before touching the rail

The self-serve packages (Unstick $500 / Audit $2,500 / Sprint $7,500) now ride this rail.
lib/catalog.ts is the SKU source of truth; the webhook dispatches by catalog (book -> file
delivery, package -> kickoff email); refund echo carries the product name. E2E-verified in
test mode (paid Audit w/ flavor field, kickoff + sale note + refund echo all delivered).
COORDINATION FACTS:
- The old test webhook endpoint we_1UAvPaPJokEBk2aDzUsGSVeO was DELETED (its whsec was never
  persisted). New endpoint: we_1UAwdlPJokEBk2aD62yaHEhs, same stripe-test URL + bypass param.
  Its whsec lives ONLY in deploy micahjonesconsulting-2kigmu15i's env (stripe-test alias now
  points there; that deploy runs current main, so BOOK test purchases keep working too).
- scripts/stripe-setup.mjs now creates all FOUR prices per mode — go-live step 3 covers the
  packages automatically. Go-live also flips /services mailto CTAs -> createPackageCheckout
  buttons, same ritual, same deploy as the /playbook flip.

## GO-LIVE RUNBOOK (the five swaps, concrete)

1. ROTATE the test secret key first (it entered a chat transcript, 2026-09-01) — roll
   in dashboard; live key NEVER via chat: temp file or Vercel dashboard only.
2. Live key → Vercel env STRIPE_SECRET_KEY (Production). 3. `node scripts/
   stripe-setup.mjs` with live key → live price. 4. Register live webhook at
   https://www.micahjonesconsulting.com/api/stripe/webhook (production custom domain =
   NO bypass param needed) → its NEW whsec → STRIPE_WEBHOOK_SECRET (Production).
   5. Deploy (installed is not live). Then the ritual: pay yourself $99 live, watch
   checkout → webhook → email → refund echo. Then flip /playbook waitlist → buy button
   (wire createPlaybookCheckout), launch email. Cleanup after: delete test webhook
   endpoint + stripe-test alias; rotate the Vercel automation-bypass secret.

## OPERATOR QUEUE (this workstream)

1. Check micah@ inbox: TWO test deliveries of "The 80% Wall — your book and companion
   files" — open both attachments, confirm the PDF and ZIP open clean (the one
   delivery-form check this session cannot do).
2. END-TO-END READ of output/the-80-percent-wall.pdf (68pp) — the last human gate.
3. Decide: separate Stripe account for the book vs shared-with-Ordani (see ⚠ above).
4. GENERATE the animation assets (animation/PROMPTS.md, in a Recraft/Krea-class tool).
   Run order: PROMPT 3 (wide still — seeds the video, doubles as poster) → PROMPT 1
   (hero loop) → PROMPT 4 vignettes (optional, book spreads) → 2/5 only if wanted.
   Paste the STYLE BLOCK first and the NEGATIVE block last on every prompt.
5. Say the word on go-live → this session runs the runbook above.

## Mission for this workstream

1. **Perfection pass**: read the assembled 76pp book end to end as an editor AND as the
   buyer persona (see the two prior reviews in this repo's history: buyer-persona
   cold-read + claude-code-guide expert review — both patterns worked; rerun on the
   whole book). Consistency: cross-references, terminology, diagram grammar, TOC.
2. **Harness research**: evaluate skills/hooks/plugins to add for book-quality work
   (candidates seen in the skill registry: pdf-official, canvas-design,
   remotion-best-practices, scroll-experience, frontend-design, impeccable-*,
   beautiful-prose, copy-editing). Propose, then wire the winners: e.g. graduate
   check.py into a write-boundary hook for `product/playbook/src/**`.
3. **"Life" concept — assets and timing owned by THIS workstream.** Direction is locked:
   the "vibe-coding factory" rendered in the book's own line-drawn field-manual grammar.
   The paste-ready generation prompts live at `product/playbook/animation/PROMPTS.md`
   (brand-locking style block, hero loop, 80%-wall narrative loop, poster still, five
   chapter vignettes, texture variant, stills-first image-to-video workflow, delivery
   specs). The operator generates in a Recraft/Krea-class multi-model tool — but THIS
   SESSION DECIDES WHEN: schedule the generation ask at the right point in the plan
   (sensible default: after the perfection pass, as launch polish), hand the operator
   PROMPTS.md with which prompts to run first, then integrate what comes back —
   stills into book spreads (full pipeline applies), the loop video onto /playbook
   (muted autoplay, poster fallback, prefers-reduced-motion honored, <4MB, and the
   site's one-signature-motion constitution respected — a video element is imagery,
   not a new scroll interaction; keep it that way).

## Launch checklist (owns the finish line)

- [ ] Operator end-to-end read of the book (the last human gate)
- [ ] Stripe: operator creates/confirms account → build checkout + webhook delivery
      EXACTLY to chapter 6's rules (hosted checkout, signature, dedupe, refund echo)
      → pay-yourself-once-live ritual → flip /playbook waitlist to buy button ($99 launch)
- [ ] Launch email to waitlist (playbook-signup notifications hold the list)
- [ ] Sales-page persona suggestion (from the ch.1 review): show one companion file
      on the page as proof against padded-course skepticism
- [x] Sales-page page-count sync: /playbook now says "A 68-page PDF" (Pass-48,
      operator-directed 2026-08-31 "yes make that change"). Verified in the built
      HTML; goes live with the next deploy (operator-gated).
- [ ] Stripe delivery MUST attach/link the companion ZIP with the book PDF — the
      book's End page states "they arrived alongside this PDF with your purchase".
- [ ] Whole-book persona verdict on file: YES at $99 (asterisk was companion-file
      access, now fixed in-book). Expert review: 0 blockers.

## Gotchas that already burned this repo

- Heredocs with large payloads break in bash → Write a .py file, run it.
- Regex surgery on chapters scrambled ch.2 once → exact-string Edits only.
- Typst: breakable:false blocks push whole to next page (thin-page risk); place()
  margin notes collide with § codes when anchored before a heading (check.py catches).
- Windows: cp1252 printing (reconfigure stdout), /tmp path split between bash/python.
