# Pre-flight - Money (chapter 6)

- [ ] Hosted checkout only. Your server never sees a card number.
- [ ] Access is granted by the verified webhook, never by the success page. Signature checked, event IDs deduped.
- [ ] Make the five live-mode swaps deliberately: live keys, live endpoint, its new secret, live price IDs, redeploy.
- [ ] Wire the refund echo: charge.refunded revokes what payment granted.
- [ ] Pay yourself once, live, and watch the whole pipe. Then refund it.
