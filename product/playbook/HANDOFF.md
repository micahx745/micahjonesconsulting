# THE 80% WALL — workstream handoff (READ THIS FIRST)

Dedicated workstream: perfect the book, bring it to life, ship it for money.
This file is the book-of-record for `product/playbook/`. The site-wide rules in
the repo root (`CLAUDE.md`, `.claude/CLAUDE.md`, `docs/LESSONS_LEARNED.md`) still
apply on top.

## State (2026-08-31)

MANUSCRIPT COMPLETE AND ASSEMBLED. Operator approved chapters 1-10 individually.
- `src/chapter-01..10.typ` — ten chapters, Typst, one design system (`src/template.typ`)
- `src/book.typ` — assembled book: cover, queried TOC, 76pp, `output/the-80-percent-wall.pdf`
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
3. **"Life" concept — DISCUSS BEFORE BUILD** (marketing playbook rule 1): operator wants
   animated energy on the PDF and/or landing page — his sketch: "animated workers
   vibe-coding factory." CONSTRAINT COLLISION to resolve with the operator first: the
   site constitution bans illustration/stock/3D ("type and photographs only") and caps
   motion (one signature interaction; motion-engineer approval required). The on-brand
   lane: animate the book's OWN line-drawn diagram grammar (the five-box factory as a
   living technical drawing — boxes, arrows, mono labels in Color Worlds palette) rather
   than importing a cartoon style. Lock direction with the operator before any build;
   consider remotion-best-practices (machine playbook remotion-video.md exists) for a
   rendered loop vs. CSS/SVG in-page animation. PDFs themselves cannot animate — "life
   in the PDF" means richer diagrams/spreads, or a motion companion on the web.

## Launch checklist (owns the finish line)

- [ ] Operator end-to-end read of the book (the last human gate)
- [ ] Stripe: operator creates/confirms account → build checkout + webhook delivery
      EXACTLY to chapter 6's rules (hosted checkout, signature, dedupe, refund echo)
      → pay-yourself-once-live ritual → flip /playbook waitlist to buy button ($99 launch)
- [ ] Launch email to waitlist (playbook-signup notifications hold the list)
- [ ] Sales-page persona suggestion (from the ch.1 review): show one companion file
      on the page as proof against padded-course skepticism

## Gotchas that already burned this repo

- Heredocs with large payloads break in bash → Write a .py file, run it.
- Regex surgery on chapters scrambled ch.2 once → exact-string Edits only.
- Typst: breakable:false blocks push whole to next page (thin-page risk); place()
  margin notes collide with § codes when anchored before a heading (check.py catches).
- Windows: cp1252 printing (reconfigure stdout), /tmp path split between bash/python.
