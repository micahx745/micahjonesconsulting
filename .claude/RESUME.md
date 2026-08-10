# RESUME — REWRITE whole-file every task. Never append. Last rewrite: 2026-07-09

## Now
- Harness bootstrapped (this file + LESSONS + TECHNIQUES + docs/DESIGN_BAR.md).
- Site state: Pass-32 LIVE on BOTH domains (www.micahjonesconsulting.com now serves
  the real site — old v0 prototype evicted 2026-06-18; commit 4c67cc0).
- NEXT: design-elevation arc. Operator runs the Cowork design review
  (.planning/prompts/cowork-design-review-prompt.md); this session ingests the
  verdict, curl-verifies every claim (LESSONS #1), then plans + executes waves
  against docs/DESIGN_BAR.md.

## Queue
- Ingest Cowork design review -> verify -> triage -> execute (the main arc)
- Operator-deferred decisions: "trillions in assets" line (operator chose it — do
  not remove unasked) · dedicated /work/<rfp-platform> page · mobile-menu identity
  line ("Independent operator — Oakland") · "built solo" phrasing on /playbook
- Operator dashboard action: add www.micahjonesconsulting.com as a project domain
  (Vercel -> micahjonesconsulting -> Settings -> Domains) — until then EVERY deploy
  must re-alias www manually (see STANDING_TECHNIQUES ship flow)
- Real portraits still pending (docs/PORTRAIT-OUTREACH.md; placeholders auto-swap)

## LIVE / MUST-RECONCILE
- [2026-06-18] www is a PER-DEPLOY ALIAS, not a project domain — a bare git push
  auto-deploys prod but does NOT update www until re-aliased. Ship flow covers it.

## Pointers
- Constitution: .claude/CLAUDE.md (design system + enforcement) | Brand: .claude/brand.json
- Design bar: docs/DESIGN_BAR.md | Lessons: docs/LESSONS_LEARNED.md
- Techniques: .claude/STANDING_TECHNIQUES.md | Deploy: docs/DEPLOY-RUNBOOK.md
- Verified-facts ledger: LESSONS #3 (never resurrect the banned claims)
