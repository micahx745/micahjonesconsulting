# Prompt — wire payments to the chapter 6 rules

Implement checkout using the provider's HOSTED checkout page (never a
custom card form) and a webhook endpoint that follows all four rules:

1. Verify the webhook signature on every event; reject on failure.
2. Record processed event IDs and skip duplicates.
3. On each event, read current state from the provider's API rather
   than trusting event order.
4. Acknowledge fast; do slow work after responding.

Access to the product is granted ONLY in the webhook handler, never
on the success page. Add charge.refunded handling that revokes what
payment granted. List every environment variable this needs, and
which are per-mode (test vs live).
