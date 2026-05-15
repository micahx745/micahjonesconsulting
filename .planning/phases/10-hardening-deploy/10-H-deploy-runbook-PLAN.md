# 10-H — Deploy runbook + Supabase migration

**Covers:** DEPLOY-01, DEPLOY-03, DEPLOY-04, DEPLOY-05, DEPLOY-06
**Depends on:** Wave 1 + Wave 2 (everything code-side is green)
**Estimated effort:** 30 minutes
**Files touched:** 1 new doc

---

## Pre-flight

1. All Wave 1 + Wave 2 plans merged + verified.
2. `pnpm build` green.
3. Phase 1's `docs/RESEND-DNS-SETUP.md` exists.

---

## Changes

### 1. Create `docs/DEPLOY-RUNBOOK.md`

Verbatim per 10-RESEARCH.md §8. Top-to-bottom operator runbook with:
- Preflight (3 invariants the operator must confirm)
- Step 1: Vercel project creation
- Step 2: Supabase project creation + SQL migration + API credentials + Resend API key retrieval
- Step 3: Env vars in Vercel
- Step 4: Domain + DNS configuration
- Step 5: First production deploy
- Step 6: Smoke test (9 verification checks)
- Step 7: Sitemap submission to Google Search Console
- Rollback
- Known gotchas
- Post-launch checklist

The runbook includes the full SQL migration verbatim for the `contact_messages` table:

```sql
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now(),
  source text not null default 'website'
);

alter table public.contact_messages enable row level security;

create policy "deny anon and authenticated"
  on public.contact_messages
  for all
  to anon, authenticated
  using (false);
```

This schema mirrors `app/actions/contact.ts` (which inserts `{ name, message, created_at }` — the `id` and `source` use defaults).

---

## Verification

1. File exists at `docs/DEPLOY-RUNBOOK.md`.
2. Markdown renders cleanly (preview in editor or `pnpm typecheck` agnostic).
3. SQL migration is valid Postgres (visual review).
4. Operator could follow the runbook top-to-bottom without external context.

---

## DEPLOY-05 (preview deploys gated by CI)

The roadmap text for DEPLOY-05 says "Preview deploys gated by `/premium audit` (harness) + GitHub Actions checks (typecheck, lint, build)." Vercel auto-runs the project's `build` script on preview deploys, which transitively runs `tsc --noEmit` (via tsconfig) + `tsx lib/copy-lint-cli.ts` (per package.json `build` script) + `next build`. A breaking build fails the preview deploy — same gate as production.

The harness `/premium audit` slash command is a separate developer-driven gate; it runs locally before push and is documented in `.claude/CLAUDE.md` and `AGENTS.md`. The DEPLOY-RUNBOOK references both layers under "Preflight."

GitHub Actions checks: Vercel's GitHub integration provides built-in PR checks (build status + Lighthouse on Preview). No GitHub Actions YAML required at v1; the runbook notes that future projects can add `.github/workflows/ci.yml` for redundancy.

DEPLOY-06: production deploy is triggered by the operator following Step 5 of the runbook (either merge to `main` + Vercel auto-deploys, or manual Redeploy from the dashboard).

---

## Rollback

The runbook is a doc; no code dependencies. Delete or revise.
