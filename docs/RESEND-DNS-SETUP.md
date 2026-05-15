# Resend DNS Domain Verification — Operator Runbook

**Phase:** 1 (Scaffold, Tokens, DNS)
**Requirement:** DEPLOY-02 — Resend domain verification completed Day 1 of build (24-72h propagation)
**Target completion:** Day 1 of Phase 1 build (operator action — not automated)

---

## Why Day 1, not Day 14

DNS TXT/MX record propagation takes **24-72 hours**. If you add the records on deploy day (Phase 10), the contact form's email sending will not work until Day 15-17. Launch slips.

Add the records Day 1. Resend re-checks every 5 minutes for 72 hours. By the time Phase 6 (Contact form) needs to send a test email, the domain will already be verified.

---

## Prerequisites

- [ ] You own `micahjonesconsulting.com` at a DNS registrar (Namecheap, Cloudflare DNS, Squarespace, Porkbun, etc.).
  - If you do NOT own it yet, purchase it first (~15 min). The registrar's DNS panel UI differs across providers but the records you add are the same.
- [ ] You have access to that registrar's account (login + 2FA if enabled).
- [ ] A password manager to store the Resend API key once generated.

---

## Step-by-step

### Step 1 — Sign in or sign up at Resend

Visit https://resend.com.

- **If you have an existing Resend account:** sign in.
- **If you do not:** sign up. The free tier covers expected launch volume (≤10 contact-form submissions/week).

### Step 2 — Add the domain

In the Resend dashboard:

1. Go to **Domains → Add Domain**.
2. Enter `micahjonesconsulting.com`.
3. Select the send subdomain. Accept Resend's default: `send.micahjonesconsulting.com`.

### Step 3 — Copy the DNS records Resend generates

Resend will show you 3-4 DNS records to add at your registrar. The values are unique to your Resend account (the DKIM public key is generated per-account). The general shape:

| Type | Host / Name | Value (Resend shows actual values) |
|------|-------------|-------------------------------------|
| `TXT` | `send.micahjonesconsulting.com` | `v=spf1 include:amazonses.com ~all` (SPF — Amazon SES, Resend's ESP) |
| `MX` | `send.micahjonesconsulting.com` | `feedback-smtp.us-east-1.amazonses.com` priority 10 (bounce processing) |
| `TXT` | `resend._domainkey.micahjonesconsulting.com` | (Long DKIM public key — Resend generates) |
| `TXT` (optional, recommended) | `_dmarc.micahjonesconsulting.com` | `v=DMARC1; p=none;` (DMARC policy reporting) |

**Important:** Use the values shown in your Resend dashboard, NOT the values in the table above. The table shows shape only; your account's DKIM public key will differ.

### Step 4 — Add the records at your registrar

Log in to your domain registrar's DNS panel. For each record Resend generated:

1. Click **Add new DNS record** (or equivalent — naming varies).
2. Paste the **Host / Name** value (e.g., `send` or `send.micahjonesconsulting.com` — registrar conventions differ).
3. Select the **Type** (`TXT` or `MX`).
4. Paste the **Value**.
5. For MX records, set **Priority** to 10.
6. Save.

Repeat for all 3 records (4 if including optional DMARC).

### Step 5 — Verify in Resend

Back in the Resend dashboard, click **Verify DNS records**.

Resend re-checks every 5 minutes for up to 72 hours. Status progression:
- `not_started` → first check pending
- `pending` → records detected partially, waiting on the rest to propagate
- `verified` → all records propagated and validated
- `failed` → 72 hours elapsed without success

### Step 6 — (Optional) Confirm propagation from your terminal

While waiting on Resend, you can independently verify DNS propagation from any terminal:

```bash
# SPF TXT
dig +short TXT send.micahjonesconsulting.com

# DKIM TXT
dig +short TXT resend._domainkey.micahjonesconsulting.com

# MX
dig +short MX send.micahjonesconsulting.com
```

If all three return non-empty values within 24h, Resend will likely detect them on its next 5-min recheck.

### Step 7 — Generate the Resend API key (once verified)

When Resend dashboard shows `verified`:

1. Go to **API Keys → Create API Key**.
2. Name it something like `micahjonesconsulting-prod`.
3. Select scope: **Sending — to verified domains**.
4. Click create.
5. **Resend shows the key ONCE** — copy it immediately to your password manager.

### Step 8 — Note the API key name for Phase 10

The Resend API key will be used by Phase 10 (DEPLOY-04) as the `RESEND_API_KEY` environment variable in Vercel.

**Phase 1 does NOT store the API key anywhere in the repo.** No `.env` files are created. The key lives only in your password manager until Phase 10 wires it into Vercel.

Record the key's name (e.g., `micahjonesconsulting-prod`) so Phase 10 can reference it.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Status stuck at `pending` past 24h | Registrar's DNS panel saved record incorrectly (often missing trailing dot or with extra quoting) | Edit each record at the registrar, paste from Resend dashboard verbatim, save |
| Status flips to `failed` at 72h | DKIM TXT record was truncated by registrar (some registrars limit TXT values to 255 chars and require splitting) | Check registrar docs for "long TXT record" handling; some auto-split, some require manual split with quoted segments |
| `dig` shows correct values but Resend still says `pending` | Resend hasn't run its next 5-min recheck yet | Wait 5-10 min and refresh dashboard |
| Domain not owned at any registrar | Domain unregistered | Purchase via Namecheap / Cloudflare Registrar / Porkbun (~$10-15/yr for .com); start Step 1 after purchase |

---

## What this runbook does NOT do

- Does not deploy the site to Vercel (Phase 10, DEPLOY-01)
- Does not configure Vercel environment variables (Phase 10, DEPLOY-04)
- Does not wire Resend SDK in code (Phase 6, FOYER-07)
- Does not configure Supabase (Phase 10, DEPLOY-03)

---

## Sources

- [Resend Managing Domains documentation](https://resend.com/docs/dashboard/domains/introduction) — official 72h verification window
- [Resend Adding and Authenticating a Domain](https://docs.gravitysmtp.com/adding-and-authenticating-a-domain-in-resend/) — registrar-side workflow annotated walkthrough
- Project research: `.planning/phases/01-scaffold-tokens-dns/01-RESEARCH.md` §"Resend DNS Verification Steps"

---

*Runbook produced as part of Phase 1, Plan H. Operator executes Day 1 of build.*
