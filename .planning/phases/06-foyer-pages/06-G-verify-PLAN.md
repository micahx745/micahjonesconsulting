# Plan 06-G — Phase 6 Verify

**Phase:** 06 Foyer Pages
**Plan letter:** G
**Wave:** 4 (depends on Waves 1–3)
**Requirements supported:** Phase 6 ROADMAP success criteria + traceability close-out
**Files touched:**
- `.planning/phases/06-foyer-pages/06-VERIFY-OUTPUT.md` — CREATE
- `.planning/phases/06-foyer-pages/verification-artifacts/` — CREATE + populate with screenshots if MCP available
- `.planning/STATE.md` — UPDATE
- `.planning/ROADMAP.md` — UPDATE (Phase 6 status + plan count)
- `.planning/REQUIREMENTS.md` — UPDATE (FOYER-02..08 traceability status to Complete)

## Goal

Run the verification matrix from 06-RESEARCH §6 and write a binding verdict to `06-VERIFY-OUTPUT.md`. If MCP screenshots are available, capture them. Update ROADMAP/STATE/REQUIREMENTS traceability.

## Steps

1. **Typecheck**: `pnpm typecheck` — capture output, must be zero errors.
2. **Copy-lint**: `pnpm lint:copy` — capture output, must be zero findings.
3. **Build**: `pnpm build` — capture output, must succeed; verify Next.js prints prerendered routes for `/`, `/about`, `/work-with-me`, `/contact`, `/work`. (Contact may be SSR rather than SSG because of `useActionState`; either is acceptable.)
4. **Dev server**: `pnpm dev` in background; wait 6s; curl `http://localhost:3000/` and verify 200 + presence of "I help operators ship the work" in HTML.
5. **Chrome DevTools MCP screenshots** (if available): take screenshots of `/`, `/about`, `/work-with-me`, `/contact`, `/work` at 1440×900 (desktop). Save into `verification-artifacts/`.
6. **Lighthouse (optional)**: if `chrome-devtools-cli` is installable/available, run `chrome-devtools-cli lighthouse http://localhost:3000 --form-factor=mobile`. Capture Performance score. Below-95 is noted but does NOT fail Phase 6 (per ROADMAP, perf hardening is Phase 10).
7. **GSAP quarantine grep**: confirm only `components/TitleCard.tsx` imports gsap. The new foyer pages (Home, Work index) consume `TitleCardComposition` not `TitleCard`, so quarantine remains intact.
8. **Stop dev server.**
9. **Update STATE.md** — current-position to "Phase 6 complete; Phase 7 next (MDX Infrastructure)". Increment completed-phases to 6. Document Phase 6 highlights.
10. **Update ROADMAP.md** — mark Phase 6 with checkmark + completion date; set Plans Complete to 7/7.
11. **Update REQUIREMENTS.md** — set FOYER-02..08 traceability rows to "Complete".
12. **Write 06-VERIFY-OUTPUT.md** with all results + verdict (PASS / partial / FAIL).

## Verification

- All 7 REQ-IDs (FOYER-02..08) have observable evidence in `06-VERIFY-OUTPUT.md`.
- All 5 ROADMAP success criteria addressed (with verbatim hero copy excerpt, 150-word About excerpt, three engagement-card names, Contact form structure, Work index thumbnail count).
- Visual MCP-verification: 5 screenshots present in `verification-artifacts/` (best-effort; note if MCP unavailable).
- Banned-word lint: clean (zero findings).
- Contact form runtime path documented: code-complete + structured error on missing env (NOT end-to-end tested against live Resend in this phase — that's Phase 10 ops).

## Success criteria

Verdict in 06-VERIFY-OUTPUT.md is PASS. Hand off to Phase 7 (MDX Infrastructure) is unblocked.
