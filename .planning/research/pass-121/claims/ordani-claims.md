# Ordani claims — what the repo actually does (read-only, 2026-09-16)

Source: `C:/Users/micah/birthflowV2/birthflowV2` (read-only; no edits/commits/builds made). All facts below are
`primary-doc` in the sense of "the running code and its own commit history" — this is the vendor's internal
system-of-record, not a public claim. Dates given are `git log -1 --format=%ad` for the cited file, i.e. when
that code/prose last changed.

The clearinghouse used is **Stedi**. Per the task's rule, it is named here for internal accuracy only. Any
sentence meant for the public site must describe it by role only ("a clearinghouse," "a real clearinghouse")
and must never say "Stedi."

## 1. Claim lifecycle, step by step (practitioner's view)

1. **Visit becomes billable.** `POST /api/billable-visits` (`app/api/billable-visits/route.ts:30-70`) — manual
   creation only today (auto-draft from bookings/birth sessions/postpartum visits is deferred, bead 1190).
   Inherits `state_code`/`organization_id` from the pregnancy; RLS enforces the practitioner owns it.
2. **Eligibility check (270/271, optional).** `POST /api/eligibility` (`app/api/eligibility/route.ts:91-512`) —
   decrypts the client's Medicaid ID / policy number, resolves payer + provider NPI, checks a 24h cache, enforces
   a hard 50/month quota (`app/api/eligibility/route.ts:324-332`), sends a 270 via Stedi with bounded retry, and
   persists the encrypted 271. A code comment (`app/api/eligibility/route.ts:105-110`, "OPS-021") states the 270
   path was sandbox-only at M1, with production wiring deferred to "M4" — see §5 for whether that has landed.
3. **Building the claim + validation before submission.** `POST /api/billable-visits/[id]/build-claim`
   (`app/api/billable-visits/[id]/build-claim/route.ts:52-340`). This is **Medi-Cal-specific**: it loads a
   per-state doula-code rules engine (`lib/billing/state-rules.ts`) gated to enabled states (California doula
   codes, `CA_DOULA_CODES`), resolves the provider's NPI and an active CA payer, aggregates the pregnancy's prior
   claim lines to enforce per-code/per-pool unit and occurrence caps, assembles the claim (`assembleClaim`), and
   runs `validateClaim` — an invalid claim 422s with itemized errors and is **never persisted** (build-claim
   route.ts:225-234). A valid claim persists atomically via one Postgres RPC (`build_medicaid_claim`) that inserts
   the header + lines and flips the visit to `billing_state='ready'` — no partial writes.
4. **Electronic submission (837P).** `POST /api/insurance-claims/[id]/submit`
   (`app/api/insurance-claims/[id]/submit/route.ts:67-309`). Re-asserts `status==='draft'` and the filing deadline,
   then gates on `isClaimsConfigured()` — i.e., `STEDI_API_KEY_PRODUCTION` must be set — **before any PHI work**
   (route.ts:110-116; the sandbox key cannot submit real claims at all, per
   `lib/services/stedi/claims.ts:28-49`). It resolves the billing/subscriber/payer parties, builds the ANSI 837P
   body (`lib/services/stedi/build-837.ts`, fails 422 on any missing/invalid required field before any DB flip),
   flips the claim to `submitted` via an RPC **before** the network call, then POSTs to Stedi with a stable
   `Idempotency-Key` and a bounded retry (429/5xx/timeout only — route.ts:220-251).
5. **Acknowledgment and status.** The synchronous response is a 277CA edit result (accepted/rejected/pending);
   `record_claim_ack` writes it and reverts a synchronously-rejected claim to `draft` so the practitioner can fix
   and resubmit (route.ts:255-261). `GET /api/insurance-claims/[id]/status`
   (`app/api/insurance-claims/[id]/status/route.ts:49-140`) surfaces the header status, the latest submission
   outcome, and the full async event history — deriving "rejected" from the latest **submission** row rather than
   the header, specifically because a sync reject reverts the header to `draft` (status/route.ts:98-105).
6. **Payment/remittance matching (async).** `GET /api/cron/claim-status-poll`
   (`app/api/cron/claim-status-poll/route.ts:56-97`) — a cron job that **only runs its Stedi calls if
   `isClaimsConfigured()`**; otherwise it no-ops ("no production key," route.ts:66-70). When configured, it (a)
   re-POSTs any claim stranded mid-crash using the same idempotency key, (b) polls Stedi's inbound-transaction
   endpoint for 277 (status) and 835 (remittance/ERA) reports and stores them idempotently, then (c) correlates
   each event to a claim by control number + hashed member ID + date of service and posts paid/adjusted amounts
   and denial reasons onto `insurance_claims` and per-line onto `claim_lines` (route.ts:397-475).
7. **Rejection handling.** A synchronous (intake) reject reverts the claim to `draft` for correction and resubmit
   (submit/route.ts:255-261); an asynchronous 277/835 denial sets `status='denied'`, `denied_at`, and
   `denial_reason` (cron route.ts:416-426). `PATCH /api/insurance-claims/[id]` also lets a practitioner manually
   set `appealed`/`closed` status and append appeal notes (`app/api/insurance-claims/[id]/route.ts:85-161`).
8. **Paper/CMS-1500 and superbill fallback.** Dedicated routes exist —
   `app/api/insurance-claims/[id]/cms1500/route.ts` and `.../superbill/route.ts` (not read in full for this pass,
   but their existence and a "Download CMS-1500 (PDF)" UI button are corroborated by
   `docs/BUG_BOARD.md:3251` — bead 1203, "Done"). The product guide (`docs/ORDANI_PRODUCT_GUIDE.md:92`, commit
   2026-08-10) lists superbills and CMS-1500s as generated today, separately from electronic 837P filing.

## 2. Which payers: Medicaid, private, or both

- The **automated, validated build path** (`build-claim`) is Medi-Cal (California) specific: it is driven by
  `lib/billing/state-rules.ts` + `CA_DOULA_CODES`, throws `StateNotEnabledError` for any state not enabled, and
  the RPC it calls is literally named `build_medicaid_claim`. As of this read, only CA is wired.
- The **generic claim record + 837P submit pipeline** (`POST /api/insurance-claims`, `.../submit`) is
  payer-agnostic in code: `insurance_claims.insurance_company` is a free-text field, and the submit route resolves
  whichever `payers` row is attached (keyed by `payers.stedi_payer_id`), with no Medicaid-only check
  (`lib/billing/resolve-claim-parties.ts:1-40`; `app/api/insurance-claims/route.ts:21-41`). So a private/commercial
  payer with a `stedi_payer_id` on file could, by the code's structure, flow through the same submit/poll pipeline.
  This is an **inference from code structure**, not a documented or tested private-insurance claim path — I found
  no state-rules equivalent, no product-guide sentence, and no test fixture for a non-Medicaid claim.
- `docs/COMPETITIVE_ANALYSIS.md:66` (positioning copy, not a technical spec) calls the feature "insurance claims"
  and "Medicaid billing" in the same breath, consistent with Medicaid being the built, marketed use case today.

**Conclusion: confirmed for Medicaid (CA Medi-Cal); private/commercial insurance claims are technically possible
via the same generic pipeline but not found to be a built, validated, or tested feature in this repo.**

## 3. What Ordani charges practitioners for claims

**Not found in the repo.** I grepped `lib/`, `app/`, and `docs/` for per-claim fees, percentage fees, and
plan/tier gating tied to claims (`tier`, `plan`, `pricing`, `per claim`, `fee`) and found no pricing logic, no
Stripe metering, and no entitlement check anywhere in the claims code path (`insurance-claims/**`,
`billable-visits/**`, `eligibility/**`, `stedi/**`). The only quota enforced is a hard **50 eligibility checks per
month** (`lib/billing/eligibility-quota.ts`; `app/api/eligibility/route.ts:324-332`), which is a usage cap, not a
price. `docs/COWORK_M2_RETEST.md:86` (commit 2026-05-31) explicitly lists **"M6 (pricing)"** as a still-upcoming
roadmap milestone after the M2/M3 claims-onboarding work, i.e. claims pricing had not been built as of that phase
gate. No later commit was found that adds one.

## 4. Clearinghouse vs. Ordani — division of labor

**The clearinghouse (name withheld from any public sentence) provides:**
- Transmission of the 270 eligibility request and return of the 271 response.
- Transmission of the 837P claim to the payer and return of the synchronous 277CA (intake accept/reject) edit
  result.
- Delivery of asynchronous 277 (status) and 835 (remittance/ERA) reports that Ordani polls for.
- The actual payer-side adjudication and payment decision (outside Ordani entirely).

**Ordani provides:**
- Turning a documented visit into a billable line, with per-state/per-pregnancy code and unit-cap validation
  before anything is ever built or sent (`lib/billing/assemble-claim.ts`, `lib/billing/validate-claim.ts`).
- Building the compliant EDI documents (270, 837P) from that validated data (`lib/services/stedi/build-270.ts`,
  `build-837.ts`), including fail-fast rejection of incomplete claims before any submission attempt.
- The idempotent submit/retry orchestration, crash-window reconciliation, and event correlation
  (`app/api/insurance-claims/[id]/submit/route.ts`, `app/api/cron/claim-status-poll/route.ts`).
- Posting remittance data (paid amount, adjustments, denial reason) back onto the claim and each line so the
  practitioner sees it in the app.
- CMS-1500 and superbill generation as a parallel, non-electronic path.
- HIPAA audit logging of every PHI read/disclosure in this flow (`logPhiView`/`logAuditEventServer` calls
  throughout every route above).

## 5. Evidence that contradicts "real claims are paid today" — the most important finding

This is a direct, explicit, and recent contradiction inside the vendor's own product documentation and its own
launch-readiness audit — both newer than the code that built the submission pipeline:

- **`docs/ORDANI_PRODUCT_GUIDE.md:158`** (file last changed **2026-08-10**, per `git log -1 --format=%ad`):
  > "**Insurance claims.** They do submit electronically to a real clearinghouse — but every submission currently
  > goes out flagged as a **test transaction**, so no claim has ever been paid. If a customer believes claims file
  > for real today, they will submit one and lose money. Say: *'Claims are built and integrated; we're finishing
  > certification with the clearinghouse.'*"
- **`docs/ORDANI_PRODUCT_GUIDE.md:194`** (same file/date), the prescribed answer to "Do you file insurance
  claims?":
  > "Claims are built and integrated with a real clearinghouse, and we generate superbills and CMS-1500s today.
  > We're completing certification before claims file for real money."
- **`.planning/audits/2026-08-07-launch-readiness/AUDIT-REPORT.md:442`** (file last changed **2026-08-07**):
  > "`STEDI_CLAIMS_LIVE` is deliberately unset... Honest impact: no user flow breaks today because Medi-Cal claims
  > are not live."
- This is backed at the code level: `app/api/insurance-claims/[id]/submit/route.ts:145-148` (last changed
  **2026-06-02**) selects the EDI "usage indicator" as **`'P'` (live/production payer) only when the env var
  `STEDI_CLAIMS_LIVE === 'true'` AND a production Stedi key is configured — otherwise it always sends `'T'` (test
  payer)**. `docs/COWORK_235.4_RETEST.md:14` (last changed **2026-07-06**) confirms the operating assumption:
  "Leave `STEDI_CLAIMS_LIVE` UNSET → `usageIndicator` stays `'T'` (synthetic, never sent to a real payer)."
- I searched the full repo history and today's working tree (current date **2026-09-16**) for any later commit
  flipping `STEDI_CLAIMS_LIVE` to true, announcing a signed BAA, or otherwise declaring claims live, and found
  none. The most recent commit touching `docs/BUG_BOARD.md` (**2026-09-16 20:09**) is unrelated (an admin-role
  bug), not a claims go-live entry.

**Net: as of the most current internal documentation in this repo, Ordani's own product guide says claims are
NOT yet filed for real money — every submission today is a test transaction, and "no claim has ever been paid."
This directly contradicts the operator's proposed lead claim that "Ordani files real Medicaid and private-insurance
claims for paying practitioners today." The operator should be shown this before the case study ships with that
claim; it may be stale (something could have changed since 2026-08-10 outside this repo, e.g. a BAA signed
out-of-band), but nothing in the code or docs as of today confirms that.**
