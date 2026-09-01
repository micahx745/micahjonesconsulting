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

## OPERATOR QUEUE (this workstream)

1. END-TO-END READ of output/the-80-percent-wall.pdf (68pp) — the last human gate.
2. GENERATE the animation assets (animation/PROMPTS.md, in a Recraft/Krea-class tool).
   Run order: PROMPT 3 (wide still — seeds the video, doubles as poster) → PROMPT 1
   (hero loop) → PROMPT 4 vignettes (optional, book spreads) → 2/5 only if wanted.
   Paste the STYLE BLOCK first and the NEGATIVE block last on every prompt.
3. Stripe account create/confirm → this session builds checkout + webhook delivery
   (book PDF + companion ZIP in one delivery — the book's End page promises it).

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
