# Packages runbook — the self-serve funnel, end to end

Operator-locked 2026-09-01: The Unstick Session $500 · The Audit $2,500
(Build / Production / Traction) · The Sprint $7,500. Credit bridge on.
Refund: full before kickoff, none after. All three include The 80% Wall
(book + companion ZIP).

## The funnel

    site / SEO / free chapter
        ├── FREE INTRO CALL (/book) ──→ engagement (matrix, scoped live)
        └── PACKAGE (self-serve) ──→ delivery ──→ debrief
                                        └── credit bridge ──→ next package
                                                              or engagement

Cross-routing on the call: not engagement-shaped → point at a package.
Package debrief → offer the next rung with the credit applied.

## Fulfillment — package email arrives (interim, pre-Stripe)

Buyers currently start by email (honest commerce until checkout is
verified). When a package email lands at micah@:

1. Reply same day with: confirmation of price + refund rule, the two
   or three intake questions from their package's mailto template (if
   they didn't answer them), and a /book link for the kickoff call.
2. Invoice from the Stripe dashboard (manual invoice, card-payable).
   Work starts at kickoff, AFTER payment — the refund rule depends on
   that order.
3. Deliver per package: Unstick = the call + same-day memo; Audit =
   memo + fix sequence + debrief inside two weeks; Sprint = the
   outcome + daily notes + debrief.
4. Send the book + companion ZIP with the kickoff confirmation.
5. Log the buyer in the pipeline file; at debrief, make the credit-
   bridge offer explicitly: "your $X applies to <next rung> for 60
   days."

## Credit-bridge bookkeeping

One line in the ledger per purchase: date, package, amount, credit
expiry (+60 days). When they upgrade, apply as a discount on the next
invoice/checkout and mark consumed. Credits never stack past the
largest single prior fee.

## Stripe phase — BUILT + E2E-VERIFIED IN TEST MODE (Pass-52, 2026-09-01)

Verified live on the test rig (Audit $2,500, card 4242): checkout with
the flavor dropdown captured at purchase -> Stripe's own webhook
delivery -> kickoff email to the buyer (intake + /book link + book/ZIP
attached) + sale note to hello@ -> refund -> "Refund: The Audit" echo.
What was built on the shared rail:
- lib/catalog.ts is the SKU source of truth (4 SKUs; scripts/
  stripe-setup.mjs mirrors it and created the three test prices)
- app/actions/package-checkout.ts (Audit captures flavor as a Stripe
  custom field); /services/thanks (noindex) is the success page
- metadata.product gates each (shared-account rule)
- webhook delivery email = kickoff email: receipt framing, intake
  questions, /book link, book + companion attached
- /services cards swap mailto CTAs for checkout buttons ONLY after the
  pay-yourself-live ritual passes (money UI ships last)
- the same go-live decision as the book: shared Stripe account vs
  separate (see product/playbook/HANDOFF.md)

## Wording source of truth

The package copy lives in app/(foyer)/services/page.tsx (cards +
fine-print rules) and PACKAGES_LD (structured data with real prices).
Price changes touch: cards, PACKAGES_LD, mailto subjects, this file,
and Stripe prices — all five, same commit.
