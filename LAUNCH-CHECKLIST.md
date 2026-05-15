# Launch Checklist — micahjonesconsulting.com

Phase 1 through Phase 10 are complete. The site is code-ready to deploy. This
one-page checklist is the **operator's Day-of-Launch punchlist** — everything
that requires authenticated access to Vercel, Supabase, Resend, or the domain
registrar.

For the full step-by-step walkthrough, see `docs/DEPLOY-RUNBOOK.md`.

---

## Preflight

- [ ] `git status` clean on `main`
- [ ] `pnpm typecheck && pnpm build` green locally
- [ ] Resend DNS records from Phase 1 (`docs/RESEND-DNS-SETUP.md`) verified at Resend dashboard

## Deploy

- [ ] **Vercel project created** — import `micahx745/micahjonesconsulting` at https://vercel.com/new
- [ ] **Supabase project created** — `micahjonesconsulting`, `us-east-1`, Free tier
- [ ] **Supabase `contact_messages` table created** — SQL from `docs/DEPLOY-RUNBOOK.md` §2.1 run in SQL Editor
- [ ] **Resend API key created** — Sending-access permission, named `micahjonesconsulting-production`
- [ ] **Vercel env vars set** — `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (Production + Preview)
- [ ] **Domain added in Vercel** — `micahjonesconsulting.com`
- [ ] **DNS records added at registrar** — A `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`
- [ ] **DNS propagated** — `nslookup micahjonesconsulting.com` returns `76.76.21.21`
- [ ] **Resend domain verified** — status green at https://resend.com/domains
- [ ] **First production deploy triggered** — Vercel → Deployments → Redeploy
- [ ] **Production deploy green** — Vercel build status

## Smoke test (live)

- [ ] `https://micahjonesconsulting.com` loads with SSL (green padlock)
- [ ] Home renders portrait + 3 case-study cards
- [ ] Foyer→theater navigation produces the 600ms cross-fade
- [ ] TitleCard pin-resolve fires on case study scroll
- [ ] ORDANI PullQuote shows sage underline-grow
- [ ] `[NEXT WORK ↘]` link works
- [ ] Contact form submit lands an email in `hello@micahjonesconsulting.com` inbox
- [ ] Contact form submit creates a row in Supabase `contact_messages`
- [ ] `/sitemap.xml` returns valid XML
- [ ] `/robots.txt` returns the AI-crawler block on `/work/`
- [ ] Vercel Analytics shows page views
- [ ] Scroll-to-bottom on `/work/ordani` fires `case_study_read_complete` event in Vercel Analytics

## One-time post-launch

- [ ] Submit `https://micahjonesconsulting.com/sitemap.xml` to Google Search Console
- [ ] Add Search Console DNS TXT verification record at registrar
- [ ] Note: real portraits not in this checklist — those land via `.claude/CLAUDE.md` "Portrait swap" three-step flow when the Phase 1 photographer delivers

---

**If the deploy fails:** see "Rollback" section of `docs/DEPLOY-RUNBOOK.md`.

**Per-step detail + screenshots + gotchas:** `docs/DEPLOY-RUNBOOK.md` (Steps 1-7).

---

*Last updated: 2026-05-14 (Phase 10 complete).*
