# Production Deploy Runbook

**Audience:** Operator (Micah).
**Cwd:** `~/Code/micahjonesconsulting`
**Goal:** Take the Phase 10 code-complete repo from green local build to live on `https://micahjonesconsulting.com`.

This runbook is the only thing Claude cannot finish itself. It requires
authenticated access to four external services (Vercel, Supabase, Resend, the
domain registrar). All other deploy preconditions — code, env schema, CI gates,
OG images, sitemap, robots, perf, a11y — are merged on `main` and verified in
`.planning/phases/10-hardening-deploy/10-VERIFY-OUTPUT.md`.

---

## Preflight — read first

These three things must be true before you begin:

1. `git status` is clean on the `main` branch.
2. `pnpm typecheck && pnpm build` succeeds locally.
3. `docs/RESEND-DNS-SETUP.md` Phase 1 DNS records are submitted at the registrar
   (you submitted these on Day 1; verification can lag 24–72h — see step 4.4).

If any are false, fix before proceeding.

---

## Step 1 — Create the Vercel project (~5 minutes)

1. Visit `https://vercel.com/new`.
2. Click **Import Git Repository**.
3. Choose `micahx745/micahjonesconsulting`.
4. **Framework Preset**: Next.js (auto-detected — should say `Next.js (16.2.6)`).
5. **Root Directory**: leave as `.`.
6. **Build Command**: leave as the default (`next build`). The package.json
   `build` script chains `tsx lib/copy-lint-cli.ts && next build` and Vercel
   detects it automatically.
7. **Output Directory**: leave as `.next`.
8. **Install Command**: `pnpm install`.
9. **Node version**: 20 (Vercel default; works for Next.js 16).
10. **DO NOT click Deploy yet.** First add env vars in Step 3.

---

## Step 2 — Create the Supabase project (~10 minutes)

1. Visit `https://supabase.com/dashboard/new`.
2. **Name**: `micahjonesconsulting`.
3. **Database password**: generate a strong one; save in 1Password / your
   password manager.
4. **Region**: closest to Vercel's `iad1` (US East — Ohio): choose `us-east-1`.
5. **Pricing plan**: Free tier — under 500MB storage, more than enough for
   contact form archive.
6. Click **Create new project**. Provisioning takes ~2 minutes.

### 2.1 — Run the contact_messages migration

Open the **SQL Editor** in the Supabase dashboard and paste this:

```sql
-- Phase 10 — contact_messages archive table.
-- Schema mirrors lib/contact-form-schema.ts + app/actions/contact.ts.
-- RLS: deny anon; allow service-role full access.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now(),
  source text not null default 'website'
);

alter table public.contact_messages enable row level security;

-- Deny anonymous + authenticated users. Only the service-role key (used by
-- the Next.js server action) can read/insert. This is correct for a contact
-- archive — nothing on the client should ever read this table.
create policy "deny anon and authenticated"
  on public.contact_messages
  for all
  to anon, authenticated
  using (false);

-- Service-role bypasses RLS by default; no explicit grant needed. The policy
-- above only restricts anon and authenticated.
```

Click **Run**. You should see "Success. No rows returned."

### 2.2 — Copy the API credentials

1. In the Supabase dashboard, go to **Project Settings → API**.
2. Copy **Project URL** (looks like `https://abcdefghijklmnop.supabase.co`).
3. Copy the **service_role** key (under "Project API keys"). Treat this like a
   password — it bypasses RLS.
4. Save both in 1Password.

### 2.3 — Get the Resend API key

1. Visit `https://resend.com/api-keys`.
2. Click **Create API key**, name it `micahjonesconsulting-production`.
3. Permission: **Sending access** (NOT Full access).
4. Copy the key (starts with `re_`).
5. Save in 1Password.

---

## Step 3 — Wire env vars into Vercel (~3 minutes)

In the Vercel project you created in Step 1:

1. Go to **Project Settings → Environment Variables**.
2. Add each of these for **Production** + **Preview**:

| Name | Value |
|------|-------|
| `RESEND_API_KEY` | (Resend key from Step 2.3) |
| `SUPABASE_URL` | (Supabase URL from Step 2.2) |
| `SUPABASE_SERVICE_ROLE_KEY` | (Supabase service_role key from Step 2.2) |

3. Click **Save**.

---

## Step 4 — Configure the production domain (~5 minutes + DNS propagation)

1. In Vercel project, go to **Settings → Domains**.
2. Add `micahjonesconsulting.com`.
3. Vercel shows the DNS records to add at the registrar:
   - `A` record: `@` → `76.76.21.21` (Vercel's anycast IP)
   - `CNAME` record: `www` → `cname.vercel-dns.com`
4. Add those records at the domain registrar (Namecheap / Cloudflare / wherever
   the domain lives). If using Cloudflare, set the records to **DNS only**
   (gray cloud), NOT proxied — Vercel needs to issue the SSL cert.
5. Wait for DNS propagation (5 minutes to 24 hours; usually 15 minutes).
   Check with `nslookup micahjonesconsulting.com` from a terminal — when it
   resolves to `76.76.21.21`, you're propagated.

### 4.1 — Confirm Resend DNS verification

You submitted Resend DNS records on Day 1 per `docs/RESEND-DNS-SETUP.md`. Now
confirm:

1. Visit `https://resend.com/domains`.
2. Find `micahjonesconsulting.com`.
3. Status should be **Verified** (green checkmark). If it says **Pending**,
   the TXT/MX/DKIM records haven't propagated yet — give it another few hours.

---

## Step 5 — Trigger the first production deploy (~3 minutes)

1. Back on the Vercel project page, click **Deployments → Redeploy**
   (or push a no-op commit on `main` to trigger an automatic deploy).
2. Watch the build. Expected duration: 60–90 seconds.
3. The build runs:
   - `pnpm install`
   - `tsx lib/copy-lint-cli.ts` (build-time copy-lint scanner — Phase 2)
   - `next build` (with `tsc --noEmit` precheck via tsconfig)
4. If the build fails on copy-lint with a `file:line:column` banned-word
   error, the deploy is correctly blocked. Fix the prose, commit, push, retry.

After the deploy goes green, `https://micahjonesconsulting.com` is live.

---

## Step 6 — Smoke test (~10 minutes)

Run this sequence as if you were a first-time visitor:

1. Visit `https://micahjonesconsulting.com`.
   - Expected: Home renders with cream paper, portrait placeholder, three case-study cards.
2. Click into a case study (try ORDANI — it's the most ambitious render).
   - Expected: 600ms cross-fade from cream to obsidian; TitleCard pin-resolve
     fires on scroll-enter; PullQuote has sage underline-grow (Phase 10
     update).
3. Hit Back, then click into another case study.
   - Expected: same transition; `[NEXT WORK ↘]` link works at the bottom.
4. Go to `/contact`.
   - Expected: two-field form renders.
5. Submit a test message ("Test from production smoke" or similar).
   - Expected: inline "Got it." thank-you; you receive an email at
     `hello@micahjonesconsulting.com` inside ~5 seconds; a row appears in
     Supabase `contact_messages` table.
6. Open `https://micahjonesconsulting.com/sitemap.xml` in a browser.
   - Expected: XML listing all foyer routes + every case study.
7. Open `https://micahjonesconsulting.com/robots.txt`.
   - Expected: `User-agent: *` allows `/`; GPTBot + Google-Extended disallow
     `/work/`; sitemap link present.
8. Open `https://micahjonesconsulting.com/opengraph-image` (this is the
   Home OG; check the `<meta property="og:image">` URL in page source if the
   hashed path differs).
   - Expected: 1200×630 PNG with "MICAH JONES" + "OAKLAND OPERATOR".
9. Open one of the case-study OG image URLs (read the
   `<meta property="og:image">` URL from `/work/ordani` page source).
   - Expected: 1200×630 PNG with the ORDANI word stack on obsidian.

### 6.1 — Verify Vercel Analytics is reporting

1. In Vercel dashboard, go to **Analytics**.
2. Wait ~30 seconds after a page view.
3. You should see at least one **Page View** event.
4. Scroll to bottom of a case study to trigger
   `case_study_read_complete` — the custom event will appear in **Events**.

---

## Step 7 — Submit sitemap to Google Search Console (one-time, ~5 min)

This step accelerates organic indexing. Skip on first launch if you want — it
isn't blocking.

1. Visit `https://search.google.com/search-console`.
2. Add property: `https://micahjonesconsulting.com`.
3. Verify ownership via the **DNS TXT record** method (Vercel exposes it under
   **Domains → DNS records**).
4. Once verified, submit `https://micahjonesconsulting.com/sitemap.xml` under
   **Sitemaps**.

---

## Rollback

If the production deploy goes wrong:

1. Vercel → Deployments → previous green deployment → **Promote to Production**.
2. The previous build is back in 30 seconds.
3. Fix forward on `main` — never `git push --force` to `main`.

---

## Known operator gotchas

- **DNS proxying.** If you use Cloudflare for DNS, set the Vercel records to
  **DNS only** (gray cloud), NOT proxied (orange cloud). Vercel handles SSL
  itself; proxying breaks the cert handshake.
- **Resend "From" address.** The `from` in `app/actions/contact.ts` is
  hardcoded to `hello@micahjonesconsulting.com`. Resend must be sending from a
  domain that has Verified status. If Resend status is Pending, the form will
  return "Could not send the note right now" and you'll see an error in the
  Vercel function logs.
- **Supabase RLS.** The migration above sets RLS deny-all for anon. The
  contact action uses the service-role key which bypasses RLS by design. If
  you ever rotate the service-role key, also update the Vercel env var.
- **Vercel function cold starts.** The contact form server action runs on a
  Vercel Node.js function. First invocation may take ~800ms; subsequent ones
  ~100ms. Fine for the form's traffic profile.
- **Vercel cache invalidation (Pitfall F3).** Next.js fingerprints CSS/JS
  hashes per deploy. The HTML pages point to the fresh hashes on each new
  build; Vercel's edge cache purges automatically. If a user reports stale
  colors right after a deploy, ask them to hard-reload — the static
  prerenders may take ~30 seconds to flush per edge node.

---

## Post-launch checklist

- [ ] DNS propagated; `https://micahjonesconsulting.com` loads.
- [ ] SSL certificate valid (green padlock).
- [ ] Resend Verified status.
- [ ] Test contact form submission received + archived in Supabase.
- [ ] Sitemap submitted to Google Search Console.
- [ ] Vercel Analytics reporting page views.
- [ ] Vercel Speed Insights reporting Core Web Vitals.
- [ ] `case_study_read_complete` event appears in Vercel Analytics after a
      scroll-to-bottom on a `/work/*` route.

---

*Phase 10 produced this runbook on 2026-05-14. See `.planning/phases/10-hardening-deploy/10-VERIFY-OUTPUT.md` for the code-side verification artifacts.*
