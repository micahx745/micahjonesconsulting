---
phase: 01-scaffold-tokens-dns
plan: H
type: execute
wave: 3
depends_on:
  - A
files_modified:
  - docs/RESEND-DNS-SETUP.md
autonomous: true
requirements:
  - DEPLOY-02
must_haves:
  truths:
    - "`docs/RESEND-DNS-SETUP.md` exists as a complete operator runbook for adding the Resend domain verification DNS records (TXT/MX/DKIM/optional DMARC) at the registrar Day 1 of Phase 1."
    - "The runbook documents the 8-step workflow: (1) Resend account signup/login, (2) Add Domain at micahjonesconsulting.com, (3) Accept send.micahjonesconsulting.com subdomain default, (4) Resend generates exact DNS records, (5) Add records at the registrar's DNS panel, (6) Click Verify in Resend (5-min auto-rechecks for 72h), (7) Generate API key once verified, (8) Document the API key name (key itself stored in password manager, NOT in repo)."
    - "The runbook explicitly notes 24-72h DNS propagation latency and recommends starting Day 1 — Phase 10 deploy depends on verification being complete by then."
    - "The runbook includes `dig +short TXT send.micahjonesconsulting.com` / `dig +short MX send.micahjonesconsulting.com` / `dig +short TXT resend._domainkey.micahjonesconsulting.com` verification commands the operator can run from any terminal to confirm propagation independently of the Resend dashboard."
    - "The runbook clarifies that Phase 1 does NOT yet store the Resend API key anywhere in the repo — Phase 10 (DEPLOY-04) sets `RESEND_API_KEY` as a Vercel environment variable."
    - "The runbook flags the open question 'Which DNS registrar is the domain on?' — if unowned, the operator must purchase the domain first (15 min); the registrar's DNS panel UI differs but the records are the same."
  artifacts:
    - path: "docs/RESEND-DNS-SETUP.md"
      provides: "Operator runbook for Resend DNS domain verification"
      contains: "send.micahjonesconsulting.com"
      min_lines: 60
  key_links:
    - from: "docs/RESEND-DNS-SETUP.md"
      to: "Phase 10 DEPLOY-04 (RESEND_API_KEY in Vercel env)"
      via: "API key name documented in runbook + stored in operator password manager"
      pattern: "RESEND_API_KEY"
    - from: "docs/RESEND-DNS-SETUP.md verification commands"
      to: "Resend dashboard verification status"
      via: "dig commands return correct TXT/MX/DKIM values within 24h"
      pattern: "dig \\+short"
---

<objective>
Produce a complete operator runbook at `docs/RESEND-DNS-SETUP.md` documenting how to add Resend domain verification DNS records at the registrar Day 1. This plan PRODUCES the runbook file — the executor does NOT perform the registrar/Resend actions itself (those require operator authentication to Resend dashboard + registrar DNS panel). The operator follows the runbook in parallel with the rest of Phase 1.

Purpose: REQ DEPLOY-02 — Resend domain verification (DNS TXT) completed Day 1 of build per pitfall research (not Day 14). DNS propagation takes 24-72h; starting Day 1 means Phase 10 deploy is unblocked.
Output: A single markdown runbook the operator can follow start-to-finish in ~15 minutes (Resend signup + domain add + record copy/paste at registrar). Resend then auto-rechecks every 5 minutes for 72h until status flips to `verified`.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/01-scaffold-tokens-dns/01-RESEARCH.md

**Operator-side action (RESEARCH §"Resend DNS Verification Steps"):**
Phase 1 cannot programmatically submit DNS records — the operator must:
1. Authenticate to a Resend dashboard (web UI).
2. Authenticate to a registrar dashboard (registrar varies; Namecheap, Cloudflare, Squarespace successor, Porkbun all have different DNS panel UIs).
3. Copy/paste Resend-generated TXT/MX values into the registrar's DNS panel.
4. Click Verify in Resend dashboard.

The executor's role is to **produce a clear runbook** the operator can follow. The runbook is the deliverable — the actual DNS submission is operator-side.

**Open question (RESEARCH §"Open Questions" #1):**
Which DNS registrar is the domain on? PROJECT.md confirms domain is `micahjonesconsulting.com` but doesn't specify a registrar. The runbook should explicitly ask the operator to identify the registrar in Step 0 (or buy the domain if unowned).

**Open question (RESEARCH §"Open Questions" #2):**
Does the user have an existing Resend account? If yes, skip sign-up; if no, sign up. Runbook should branch.

**DNS record shapes (RESEARCH §"Resend DNS Verification Steps" — operator-side workflow):**
Resend generates the exact values at Add-Domain time per-account (DKIM public key varies per Resend account). The general shape:

| Type | Host / Name | Value |
|------|-------------|-------|
| TXT | send.micahjonesconsulting.com | v=spf1 include:amazonses.com ~all |
| MX | send.micahjonesconsulting.com | feedback-smtp.us-east-1.amazonses.com priority 10 |
| TXT | resend._domainkey.micahjonesconsulting.com | (Long DKIM public key — Resend generates) |
| TXT | _dmarc.micahjonesconsulting.com | v=DMARC1; p=none; (optional DMARC reporting) |

Resend dashboard provides copy-paste-ready values — operator should treat dashboard-generated values as authoritative (not the table above, which is illustrative shape only).

**Phase 1 boundary:**
- Phase 1: Runbook + operator submits records + Resend dashboard verifies (within 72h)
- Phase 10 (DEPLOY-04): Store `RESEND_API_KEY` as Vercel env var

Phase 1 does NOT yet:
- Store the Resend API key in the repo (no `.env.local` is committed)
- Create a Vercel project (Phase 10 owns)
- Configure Resend SDK in code (Phase 6 contact form owns)
</context>

<tasks>

<task type="auto">
  <name>Task H1: Create docs/RESEND-DNS-SETUP.md operator runbook</name>
  <files>
    docs/RESEND-DNS-SETUP.md
  </files>
  <action>
Create `C:/Users/micah/Code/micahjonesconsulting/docs/` directory (it doesn't exist yet), then create `docs/RESEND-DNS-SETUP.md` with the runbook content below. The content is synthesized from RESEARCH.md §"Resend DNS Verification Steps".

Final file content:

```markdown
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
```

**Critical writing rules:**
- File MUST be at `C:/Users/micah/Code/micahjonesconsulting/docs/RESEND-DNS-SETUP.md`.
- The runbook is the DELIVERABLE — the executor does NOT log into Resend, does NOT log into any registrar, does NOT add DNS records. Those are operator-side actions.
- The 24-72h propagation note MUST appear prominently (above-the-fold of the runbook).
- The verification `dig` commands MUST be present (Step 6).
- The Step 8 note about NOT storing the API key in repo MUST appear (Pitfall: API key checked into git).
- Reference RESEARCH.md sources at the bottom.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && test -f docs/RESEND-DNS-SETUP.md && grep -q "send.micahjonesconsulting.com" docs/RESEND-DNS-SETUP.md && grep -q "24-72 hours" docs/RESEND-DNS-SETUP.md && grep -q "dig +short TXT" docs/RESEND-DNS-SETUP.md && grep -q "RESEND_API_KEY" docs/RESEND-DNS-SETUP.md && grep -q "DEPLOY-02" docs/RESEND-DNS-SETUP.md && grep -q "v=spf1 include:amazonses.com" docs/RESEND-DNS-SETUP.md && grep -q "resend._domainkey" docs/RESEND-DNS-SETUP.md && grep -q "Step 8" docs/RESEND-DNS-SETUP.md && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    `docs/RESEND-DNS-SETUP.md` exists as a complete operator runbook with: 24-72h propagation note prominent; 8-step walkthrough (signup → add domain → copy records → add at registrar → verify → dig verification → generate API key → note API key name); DNS record shape table; troubleshooting table; sources section. The executor has NOT performed any actual DNS submission (operator owns).
  </done>
</task>

</tasks>

<verification>
- `docs/RESEND-DNS-SETUP.md` is a complete runbook
- Prerequisites + 8 steps + troubleshooting + sources sections all present
- DNS record shape table present
- dig verification commands present
- Step 8 explicitly states Phase 1 does NOT store API key in repo
- The executor did NOT actually submit DNS records (operator-side action)
- DEPLOY-02 is now ready for operator to execute Day 1 (in parallel with the rest of Phase 1's automated work)
</verification>

<success_criteria>
- DEPLOY-02 ✓: Runbook exists; operator follows Day 1; 24-72h propagation clock starts now
- By Phase 10 (deploy), the Resend domain status should be `verified` (assuming operator completed runbook within 7 days of Phase 1)
- Phase 6 (FOYER-07 Contact form) will be able to send test emails through Resend
- The API key name is documented in the runbook for Phase 10 (DEPLOY-04) to reference
</success_criteria>

<output>
After completion, create `.planning/phases/01-scaffold-tokens-dns/01-H-SUMMARY.md` confirming:
- Runbook exists at `docs/RESEND-DNS-SETUP.md`
- Operator-side action documented (executor did NOT perform DNS submission)
- 24-72h propagation clock starts when operator executes Day 1
- Phase 10 dependency: API key in Vercel env (DEPLOY-04) blocked until operator completes runbook + Resend status = verified
</output>
