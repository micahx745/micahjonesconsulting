# The 80% Wall — product source

Typst sources for the $149 field manual sold at /playbook.

- `src/template.typ` — Color Worlds print design system (bone paper,
  espresso ink, terracotta accent, saffron mono labels).
- `src/chapter-01.typ` — the free sample chapter.
- `fonts/` — Bricolage Grotesque, Hanken Grotesk, JetBrains Mono
  (Google Fonts, SIL Open Font License; redistribution permitted).
- `output/` — compiled PDFs.

Compile (from product/playbook/):

    typst compile src/chapter-01.typ output/the-80-percent-wall-ch1.pdf --font-path fonts

Gates before any chapter ships: per-page PNG walkthrough (typst
--format png, read every page), banned-word battery vs
.claude/brand.json, fonts-embedded check, operator sign-off on every
factual claim. Certified is not sendable — the operator reviews the
exact PDF before it is wired to any delivery path.
