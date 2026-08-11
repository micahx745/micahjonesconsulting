# RESUME — REWRITE whole-file every task. Never append. Last rewrite: 2026-08-11

## Now
- DESIGN-ELEVATION arc. Discussion CLOSED — 13 decisions locked in
  .planning/reviews/DESIGN-DECISIONS-2026-08.md (D1-D13).
- W1 DONE (60bc53a Pass-33): case template re-ported (fonts/ground/nav/dedups/401px
  canvas fix/hero void). W2 DONE (d76276d Pass-34): SpecTable replaces all four card
  grids (Embedded weighted, 16px cells); home engagements weighted — Guardicore 2×
  with $80M/$14M saffron display metric; /services mobile 6,889→4,751px. Both verified
  on prod build 390/768/1440, page canvas clean, ban-grep clean.
- NEXT: W3 P1 batch (rotator one-cycle D1 · marquee scroll-linked D2 · CTA grammar D7 ·
  playbook pricing D8 · cut names D9 · type scale D13 · index curation · footers ·
  sticky-nav collision). NOT deployed yet — operator visual sign-off first.

## Queue
- OPERATOR: eyeball W1 screenshots (sent in chat) → approve deploy or request changes.
  Deploy = CARD 1 chained flow, re-alias BOTH domains (LESSONS #5).
- W2 = P0-2 spec tables (/services ×3, /services/ai-engineering, /hire-me) + home
  engagements weighting. W3 = P1 batch (D1 rotator one-cycle, D2 marquee scroll-linked,
  D7 CTA grammar home=See the work, D8 playbook plain pricing, D9 cut
  Flexport/Cuebiq/Postmates, D13 type scale, index curation, footers, sticky-nav).
  W4 = P2 (D10 gesture, /about spacing bugs, 404, email affordance, accent discipline).
- W3 note: extra idle animations found in CSS (2s cw-pulse, 8s monogram-breath,
  28-38s ambient drifts) — audit vs reduced-motion in W3.
- W4 note: OG images are Satori-generic (sans-serif, MICAH JONES CONSULTING words) —
  re-brand in W4 (P2-4). Legacy /v1-/v4 routes keep 9 fonts loading at root — flag
  to operator: delete or noindex legacy routes? (their fonts block full R1 clear).
- Operator dashboard action still open: add www as project domain.
- Artifacts operator will supply (D12): Ordani screenshots, /about portrait, redacted
  RFP report. Guardicore scan NOT coming — placeholder stays.

## LIVE / MUST-RECONCILE
- [2026-06-18] www is a PER-DEPLOY ALIAS — every deploy re-aliases BOTH domains (CARD 1).
- [2026-08-11] Pass-33 committed but NOT pushed/deployed — awaiting operator visuals OK.

## Pointers
- Constitution: .claude/CLAUDE.md | Bar: docs/DESIGN_BAR.md | Brand: .claude/brand.json
- Decisions: .planning/reviews/DESIGN-DECISIONS-2026-08.md | Review:
  REVIEW-DESIGN-2026-08-10-COWORK.md | Lessons: docs/LESSONS_LEARNED.md (#3 ledger)
