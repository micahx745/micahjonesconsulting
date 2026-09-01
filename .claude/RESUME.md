# RESUME — micahjonesconsulting (2026-09-01 PM)

## Now: Pass-56 /services simplified — AWAITING OPERATOR REVIEW (preview shared)
Operator: "super busy, worded oddly… not clear or compelling to purchase… simplified."
Plan locked ("go"): one decision per screen. Built 244705e: h1 "What I do, and how to hire
me." + two doors (Engagements / Packages) → three compact services (pain / what lands /
proof w/ case link, ledger phrasings only) → ONE four-shape table for all services (was
3×4 SpecTable matrices) → Pass-47 packages (intro tightened) → espresso foot. 840 words.
Verified: local prod build 1440 + ~500px (no overflow, table stacks, world switch, zero new
transitions) AND deployed preview micahjonesconsulting-8i53etaqo (share link in chat).
Catch: "Most chosen" tag = unverifiable claim → "Recommended"; popularity phrases now banned
in copy-lint (LESSONS #10).

## Unpushed on main (4 commits ahead of origin)
Pass-53/54 (book session) · Pass-55 /playbook (operator: "ok looks great") · Pass-56
/services. Production still serves the OLD /playbook and /services. Push waits for the
operator's "push it". Domains auto-move on deploy (LESSONS #9) — no re-alias chore.

## Stripe rail (Pass-52) — BUILT + E2E-verified in test mode
lib/catalog.ts SKUs; checkout + kickoff delivery + refund echo verified by a real test
purchase. No Stripe env in Production. Go-live ritual (shared vs separate account, rotate
test key, live keys via dashboard, live webhook, pay-yourself) → flip /services mailtos to
checkout + /playbook $99 button + launch email. Runbooks: docs/PACKAGES-RUNBOOK.md,
product/playbook/HANDOFF.md.

## Workstream split
Book = dedicated session (HANDOFF.md; owns /playbook normally — Pass-55 built here on
operator instruction, noted there). This session: site, consulting, SEO, email/booking.

## Operator queue
1. "push it" → ship Pass-53–56 to production (deploy, verify www + apex).
2. SECRET ROTATION overdue: Resend key (re_V6Jg…), Google Calendar secret ICS URL, Stripe
   test key; update all 3 Vercel envs each.
3. Stripe go-live decisions. 4. Read the 68pp book. 5. Jamie Snitker email (drafted).
6. Postmates years for the ledger row.

## Gotchas
- Pane screenshots go black after scrolling → chrome-devtools MCP pages for scrolled shots.
- Git Bash /tmp invisible to Windows python; big heredocs break → Write script, run by path.
- launch.json "prod" = pnpm start -p 3100 for prod-build previews.
- Secrets never inline. Ordani surfaces never name vendors. HIPAA-compliant, never -grade.
