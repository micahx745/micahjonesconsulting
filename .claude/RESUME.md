# RESUME — micahjonesconsulting (2026-09-04, late)

## READ THIS FIRST — the DIRECT segment is closed; EXECUTE is next
Main model Fable 5.1 rules; **Opus is the default subagent** and runs the work
(`.claude/settings.json`). Direction: `.planning/PHASE-MAP-2026-09-04.md`.
**The Pass 98 brief is written and committed:** `.claude/briefs/pass-98-playbook-landing.md`
— exact strings, layout in existing tokens, verification commands with expected output,
the rejected list, return conditions, parked items. Materials came from one Opus
workflow (five reads + 38 attest skeptics): 30 phrases attested, 8 killed, saved at
`.planning/research/01-APPENDIX-phrase-bank-attested.json`. The brief already treats the
8 kills as operator wording or unverifiable.

**Next session:** `/clear`, `/model opus`, then
1. **Pass 97** — the eight Class A defects from `.planning/RESEARCH-TO-ACTION-MAP-2026-09-04.md`
   §3 (exact strings there). One commit. Verify with `scripts/snapshot-live.py` + the
   retired-phrase grep = 0.
2. **Pass 98** — run the brief verbatim. Fable returns only at its §7 checkpoints
   (390 + 1440 preview, ledger grep, buyer read at ship).
Do not re-derive either. Do not touch `product/playbook/` (frozen, stale — see parked).

## Blocked on the operator, in the order it blocks
1. Stripe webhook registered + `whsec_` in Vercel Production + one live $500 buy/refund.
   `PLAYBOOK_ON_SALE` stays OFF until done; /packages buttons are live over nothing today.
2. Google his own name: is a superseded v0 page the first result? (Leg claim; unverifiable here.)
3. Search Console verification. 4. The landing-page offer's name/price; replace Unstick or add.
5. A portrait for the back cover. 6. Launch date → flip the flag + redeploy. 7. The $149 trigger.
8. Book arc (other repo): ch8 as sample (edit list in brief §8.4), ch8 line 31 "third"→"first",
   `publish:site` to refresh the stale frozen copy, "twenty years of selling" unledgered.

## Site state
Live, both domains re-aliased each deploy. Build gate = copy-lint + vendor-gate + `next build`
+ render-gate. Traffic 7d: 26 visitors; `/playbook` #2 at 15. Zero revenue ever. All three
research packages on disk in `.planning/research/`. Live-DOM snapshot at
`.planning/snapshots/2026-09-04/`. Claims ledger `docs/LESSONS_LEARNED.md` #3 outranks memory.

## Standing traps
Stripe prefixes `sk_`/`pk_`/`mk_` · Vercel env applies only on a NEW deploy · `grep -oiF`
false zeroes, use python utf-8 · strip `<script>` before counting · copy-lint hook rejects
docs that QUOTE banned words · snapshot `.txt` fakes spaces at tag boundaries · a review is
a reader, not an oracle · two sessions share this tree: stage by path · `--cw-accent`
flips between hydration states, use literal tokens for new colour rules.
