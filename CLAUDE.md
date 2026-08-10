@AGENTS.md

# micahjonesconsulting — operating harness

Judgment layer (machine-local, NOT auto-loaded): if
`C:/Users/micah/.claude/ULTRACODE_OPERATING_PATTERNS.md` exists on this machine, Read it at
session start; project rules win on conflict. The design constitution auto-loads from
`.claude/CLAUDE.md` — live code wins where its prose has drifted (the home runs the
"Color Worlds" system, not the foyer palette it describes).

## Rules
1. **Session memory:** `.claude/RESUME.md` is rewritten (whole-file, ≤2.5KB) after every task
   and before any context switch. It is the only current-state source; static docs are history.
2. **Verify before done:** every "fixed/works/live" claim is preceded by probe output —
   deliverables verified in final form (the LIVE domain, both aliases; see STANDING_TECHNIQUES
   CARD 1/3). External review claims are curl-verified before any edit (LESSONS #1).
3. **Task tracking:** the RESUME queue + `.planning/` artifacts. One tracker; items close
   citing commit hashes ("Pass-N" subjects).
4. **Lessons:** every caught defect gets a numbered entry in `docs/LESSONS_LEARNED.md` + a
   mechanical gate the same day. The verified-facts ledger lives in LESSONS #3 — grep the
   NEVER-phrases before any copy commit.
5. **Design bar:** read `docs/DESIGN_BAR.md` + `.claude/brand.json` before ANY UI work; route
   per STANDING_TECHNIQUES CARD 5 (design-director / motion-engineer / copy-editor /
   `/premium audit`).

## Project facts
- Stack: Next.js 16.2.6 App Router · Tailwind v4 (CSS-first) · MDX case studies · pnpm
- Build: `pnpm build` (copy-lint gate runs first — never bypass)
- Deploy: Vercel, team `passioneer`. BOTH domains re-aliased every deploy
  (`micahjonesconsulting.vercel.app` + `www.micahjonesconsulting.com`) until the operator adds
  www as a project domain in the dashboard (LESSONS #5). Runbook: `docs/DEPLOY-RUNBOOK.md`.
