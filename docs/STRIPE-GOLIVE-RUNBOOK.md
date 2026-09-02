# Stripe go-live runbook

**Audience:** Operator (Micah), with the steps Claude can run marked.
**Written:** 2026-09-02. **Status:** steps 0, 2 and 5 DONE (2026-09-02).

> **Progress.** Business verified. Test key rotated. A live key was pasted into
> chat once and was rotated immediately; the replacement lives only in
> `.env.local`, which is gitignored and deny-listed so Claude cannot read it.
> The LIVE catalog is created and verified: all four SKUs resolve by lookup key.
> `playbook-99` $99 · `unstick-500` $500 · `audit-2500` $2,500 · `sprint-7500`
> $7,500. Production has `RESEND_API_KEY` but NOT `STRIPE_SECRET_KEY` or
> `STRIPE_WEBHOOK_SECRET`, so the live site still cannot take a payment.
> **Next: step 3.**

**What goes live:** four things on one rail, the ebook at $99 and the three
packages at $500, $2,500 and $7,500.

The rail is already built and was proven end to end twice in test mode: hosted
checkout, Stripe's own webhook delivery, one email carrying the book PDF and the
companion ZIP, and a refund echo. Nothing below is new code. This is the swap
from test mode to live mode, plus the one-time business verification.

---

## What is being sold

| Lookup key    | Product             | Price  | What the buyer gets                           |
| ------------- | ------------------- | ------ | --------------------------------------------- |
| `playbook-99` | The 80% Wall        | $99    | 68-page PDF + 26 companion files, emailed     |
| `unstick-500` | The Unstick Session | $500   | 90 minutes live + a same-day written fix plan |
| `audit-2500`  | The Audit           | $2,500 | Two-week fixed-scope audit, memo + debrief    |
| `sprint-7500` | The Sprint          | $7,500 | One week embedded on one outcome              |

Source of truth is `lib/catalog.ts`. A price change touches that file, the
`/services` cards, `PACKAGES_LD`, and the Stripe catalog, in the same commit.

---

## READ THIS BEFORE TOUCHING THE DASHBOARD

**Do not create the products by hand in the Stripe dashboard.**

The code never stores a price ID. It looks prices up by **lookup key** at
checkout time (`getPriceId` in `lib/stripe.ts`). A product created through the
dashboard UI does not get a lookup key unless you set one explicitly, and the
dashboard buries that field. A product with the right name and the right price
but no lookup key is invisible to the site, and checkout fails with "price not
found" on a page that looks completely fine.

Price IDs also differ between test and live mode, which is exactly why the code
resolves by lookup key instead.

So: the products get created by `scripts/stripe-setup.mjs`, which sets the
lookup keys, is idempotent, and reads the same catalog file the site does. Step
5 below. If you have already hand-created anything in live mode, tell me and I
will reconcile rather than create duplicates.

---

## Step 0 — Verify the business (YOURS, and it gates everything)

Your dashboard currently says **"You're testing in a sandbox"** and shows a
**Verify your business** button. Until that is approved there is no live secret
key, and no charge can settle. Nothing else in this runbook can complete first.

1. Dashboard → **Verify your business**.
2. Expect to supply: legal entity name and address, EIN or SSN, a bank account
   for payouts, and a statement descriptor (what buyers see on their card
   statement — make it recognisable, e.g. `MICAHJONES` or `80PCTWALL`).
3. Approval is usually minutes to a day. Occasionally they ask for a document.

**Blocked until this clears.** Do not start step 2 before it is approved.

---

## Step 1 — Decide: shared account or separate (YOURS)

Right now this Stripe account is shared with Ordani. Ordani's webhook receives
every event on the account, and this site's webhook receives Ordani's.

Our side is safe already: the webhook ignores anything whose
`metadata.product` is not one of the four keys above. But safe-by-filter and
clean are different things, and the risk runs in the other direction too.

- **Separate account for the book and packages** — cleaner. Separate payouts,
  separate statement descriptor, separate books at tax time, no cross-talk. Cost
  is redoing step 0 on the new account.
- **Stay shared** — faster, and then you must confirm Ordani's _live_ webhook
  safely ignores foreign events.

**Recommendation: separate.** These are different businesses with different
buyers, and untangling later is worse than the hour it costs now.

---

## Step 2 — Rotate the exposed test key (YOURS, do it regardless)

The test secret key for this account went through a chat transcript on
2026-09-01. Treat it as burned even though it is only test mode.

Dashboard → **Developers → API keys → Secret key → Roll key**.

Nothing in production depends on it. This is hygiene, and it is also the rule
that keeps the next one from being a live key.

---

## Step 3 — Get the live secret key to Vercel (YOURS)

**Never paste a live key into chat.** Not into this session, not into any
session. An approved key in a transcript is a key that has to be rotated.

Two safe routes:

- **Vercel dashboard** (simplest): Project → Settings → Environment Variables →
  add `STRIPE_SECRET_KEY`, scope **Production only**, paste, save.
- **CLI by reference**, if you prefer the terminal: put the key in a temp file
  and pipe it, never inline:
  ```bash
  npx vercel env add STRIPE_SECRET_KEY production < /path/to/keyfile
  ```
  then delete the file.

The test key stays where it is, scoped to Development and Preview. That
separation is what keeps a test charge from ever hitting live money.

---

## Step 4 — Confirm Resend is live (MINE to check, yours to fix)

The rail sends the book through Resend. `RESEND_API_KEY` must exist in
**Production**, and the sending domain must be verified (DKIM at
`resend._domainkey`).

This has bitten this project before: a delivery failed silently because the key
was unset on the deployment, and the code swallows that error by design. I will
probe production for it before you pay yourself. If it is missing, you add it
the same way as step 3.

---

## Step 5 — Create the live catalog (MINE)

One command, run with the live key in the environment:

```bash
node --env-file=.env.local scripts/stripe-setup.mjs
```

The script reads `STRIPE_SECRET_KEY`, detects live versus test from the key
prefix, and for each of the four SKUs either creates the product and price with
the correct lookup key or reports that it already exists. It prints price IDs,
never secrets. Running it twice is safe.

Expected output, four lines:

```
[LIVE] playbook-99: created product prod_..., price price_... ($99)
[LIVE] unstick-500: created product prod_..., price price_... ($500)
[LIVE] audit-2500: created product prod_..., price price_... ($2500)
[LIVE] sprint-7500: created product prod_..., price price_... ($7500)
```

If any line says `exists` on a fresh live account, stop: something was
hand-created and needs reconciling first.

---

## Step 6 — Register the live webhook (MINE, or yours in the dashboard)

Endpoint URL:

```
https://www.micahjonesconsulting.com/api/stripe/webhook
```

Use the production custom domain. Previews sit behind Vercel SSO and need a
bypass parameter; production does not.

Subscribe to exactly these three events:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `charge.refunded`

The first two deliver the product. The third sends the refund echo. Subscribing
to everything else just adds noise the handler ignores.

Stripe then shows a **signing secret** starting `whsec_`. That goes to Vercel as
`STRIPE_WEBHOOK_SECRET`, **Production only**, by the same safe route as step 3.
It is a credential; same rule, no chat.

---

## Step 7 — Deploy (MINE)

Environment variables that are set but not deployed are not live. The site must
be redeployed after steps 3 and 6 or it will read the old values.

I run the standard ship flow: build gate, deploy, push, re-alias both domains to
the newest deployment, then prove both domains serve the same build by diffing
their deployment IDs.

---

## Step 8 — The ritual: buy your own book (YOURS, with me watching)

This is the only real proof. Test mode passing twice is not the same as live
mode working once.

1. Go to the live `/playbook` and buy the book for **$99 with a real card**.
2. Watch for all four, in order:
   - Stripe shows the payment succeeded.
   - The webhook shows a **200** on `checkout.session.completed`.
   - The email arrives with **both** attachments: the 68-page PDF and the
     companion ZIP. Open both.
   - You get the sale notification.
3. Then **refund yourself** from the dashboard and confirm the refund echo
   arrives.
4. Repeat once against a package, ideally `unstick-500`, because packages take
   the other delivery path (a kickoff email with intake questions, not files).
   Refund that too.

If any step fails, stop and tell me what you saw. Do not flip the button.

---

## Step 9 — Flip the buy button (MINE)

Only after step 8 passes on both a book and a package.

The hero pill currently reads "Get chapter one free" and scrolls to the email
form. It becomes **"Buy the manual · $99"** wired to `createPlaybookCheckout`,
and the email capture demotes to the "not today" path beneath it, under the
kicker "Not today?". The full layout is already specified in
`.claude/briefs/pass-61-playbook-cro.md` §8, including the two lines that must
sit within one line of the button:

- `30 days, full refund, no questions. Reply to the delivery email.`
- `Checkout runs on Stripe. I never see your card. One email, two attachments,
usually within minutes.`

The spec-card Status row flips from `Coming soon` to
`Available · delivered by email, usually within minutes`.

**One thing to settle before this step:** the page advertises "$99 at launch ·
$149 after". If you do not actually intend to raise the price, that line comes
off. An anchor with no intent behind it is false scarcity in slow motion, and
this audience checks.

---

## Step 10 — Cleanup (MINE)

- Delete the test webhook endpoint (`we_1UAvPa…`).
- Remove the `stripe-test.micahjonesconsulting.com` preview alias.
- Rotate the Vercel automation-bypass secret, which also went through a
  transcript.

---

## If something goes wrong

- **Checkout says the price is not found** → the lookup key is missing on the
  live price. Re-run step 5; do not hand-fix in the dashboard.
- **Payment succeeds, no email** → check `RESEND_API_KEY` on the _deployed_
  production build, then the webhook's delivery log in Stripe. The handler
  swallows send errors by design, so Stripe will show 200 even when the email
  failed.
- **Webhook 400** → signature mismatch. `STRIPE_WEBHOOK_SECRET` must be the
  whole `whsec_…` string for the _live_ endpoint, and the site must have been
  redeployed since it was set.
- **Money moved and you want it stopped** → refund from the dashboard, then flip
  the button back. The button is a one-line change and the fastest lever.

---

## Division of labour, in one line each

**Yours, because they touch live credentials or real money:** business
verification, the account decision, both key rotations, getting the live key and
the webhook secret into Vercel, and the pay-yourself ritual.

**Mine:** the catalog script, the webhook registration if you want it done by
CLI, the deploy, the production probes, the button flip, and the cleanup.
