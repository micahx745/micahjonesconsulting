# Testing the money rail end to end

Written 2026-09-03, after packages went on sale. Everything BEFORE the card is
proven in production; everything after it was assumed until this ran.

  proven   buy button -> server action -> live key authenticates -> price
           resolves in live mode -> Stripe returns a session -> redirect
  assumed  payment -> webhook -> kickoff email (intake + booking link + book
           and companion attached) -> success_url -> refund echo

The second row is where a paying customer silently gets nothing, so it is the
row worth testing.

## Run it in test mode. It costs nothing.

Test mode is a separate world: separate customers, separate payments, and
SEPARATE PRODUCTS AND PRICES. The lookup keys `unstick-500`, `audit-2500` and
`sprint-7500` must exist there too. If a test checkout returns "Checkout isn't
open yet", that is the price lookup coming back empty, NOT a bad key.

### 1. Fill .env.local

    STRIPE_SECRET_KEY          already set, a TEST key
    STRIPE_WEBHOOK_SECRET      from step 2
    RESEND_API_KEY             REQUIRED, or no email is ever sent

Without RESEND_API_KEY the webhook fires and the delivery code runs and nothing
arrives. That failure looks identical to success from the outside, which is
exactly the failure mode this test exists to catch.

### 2. Forward webhooks to localhost

    stripe listen --forward-to localhost:3000/api/stripe/webhook

Leave it running. It prints a `whsec` value on the first line - that is the TEST
signing secret. Paste it into .env.local. It is NOT the live one; the live
webhook has a different secret and they are not interchangeable.

### 3. Buy something

    pnpm dev

Go to http://localhost:3000/packages and buy the Unstick Session.
Card `4242 4242 4242 4242`, any future expiry, any CVC, any postcode.

### 4. Check all five, not just the first

1. The browser lands on /services/thanks.
2. The `stripe listen` terminal shows `checkout.session.completed` with a 200.
   A 400 there means the signing secret is wrong.
3. The kickoff email arrives. Open it and confirm ALL of:
   - the intake questions
   - a link to /book/kickoff, not /book
   - The 80% Wall PDF attached
   - the companion ZIP attached
4. The booking link opens the KICKOFF page: title "Book the kickoff call",
   Cost row "Included with your package". If it says "Free", it went to /book.
5. Refund it in the Stripe dashboard and confirm the refund notification.

## Then one small LIVE purchase

Test mode cannot prove the LIVE webhook endpoint is registered and signing
correctly. That is per-mode configuration and it is the thing that silently
breaks. One real buy plus refund on the $500 Unstick Session settles it.

It costs about $15: Stripe's processing fee is not returned on a refund. That is
cheap against a paying customer receiving no kickoff email.

Confirm afterwards in the Vercel runtime logs:

    projectId and teamId are in .vercel/project.json

Query the logs for `package-checkout` and for the webhook route. The checkout
action logs ONLY on failure, so silence there is success. The webhook logs its
own path.

## If something fails

Check the prefix first. Stripe's dashboard shows three lookalike values and only
one works: `sk_` is the secret, `pk_` is publishable and useless server-side,
`mk_` is the key's ID. Production shipped with an `mk_` value and every checkout
returned StripeAuthenticationError; local passed through a live secret and a
publishable key before landing on the right one. The error text names the
problem explicitly - read it before theorising.

And remember Vercel env vars only take effect on a NEW DEPLOYMENT. Changing the
value does not update deployments already running, which is why a fix can look
like it did not work.
