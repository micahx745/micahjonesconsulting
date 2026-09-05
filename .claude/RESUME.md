# RESUME — micahjonesconsulting (2026-09-04, night, post-deploy)

## READ THIS FIRST
Fable 5.1 main, **Opus default subagent**. Direction: `.planning/PHASE-MAP-2026-09-04.md`.
**Passes 97 + 98 are LIVE on both domains and independently verified.**
Deploy approved — Operator, 2026-09-04, verbatim: "deploy it". Ship per CARD 1; both
domains on one id (`dpl_HwBFed…`), lineage 6eb543e → origin/main proven. Live verify
`448cbb2`: brief §5 all OK on the live snapshot, Pass-97 probes OK, retired phrases 0,
banned words 0, 4/4 redirects, both share images read back as images. Cross-review
`6eb543e`: 2 legs, advisory only, 0 blockers. Codex leg repinned `gpt-6-astra` at
`model_reasoning_effort=ultra` via the codex CLI (`c009693` + `381e519`), smoke-tested.
**A second session — the book chat — is on this tree** (it made `c009693`). Stage by
path. Its brief: `.planning/handoff/NEXT-CHAT-PROMPT-BOOK.md`; its materials:
`.planning/handoff/04-BOOK-MATERIALS.md`.

## Ship gate, what remains (operator-owned)
1. **Stripe webhook + `whsec_` in Vercel Production + one live $500 buy/refund.**
   `/packages` buttons are live over nothing. Blocks the flag.
2. Real-browser look at `/playbook`: the world cross-fade on scroll, the hero wall chart
   zoomed at 1440 (labels 8→11 SVG units), hero→checkout read in the ON state. An Opus
   scroll-capture was dispatched; crops land in the session scratchpad.
3. `PLAYBOOK_ON_SALE=1` in Vercel + redeploy = the launch. Not before 1.

## Housekeeping from the cross-review (one small Opus pass, none urgent)
XR-2 drop the `offers` block from JSON-LD while the flag is unset · XR-1 `Product.brand`
Person → Organization · XR-7 `.cw-lp-block--breath` loses its 160px on `:last-child`
(specificity) · XR-6 `scripts/snapshot-live.py` does not decode the `&rsquo;` family ·
XR-3 the gate's comment-strip regex eats `//` inside strings.

## Observation for LESSONS #5
The auto-deploy fired by the verifier's push moved BOTH domains with no manual alias.
www may now be a project domain. Confirm in the dashboard before deleting the re-alias
step from CARD 1; until confirmed, keep checking parity after every push.

## Next passes
99: the landing-page offer + `/services` `/packages` distribution reframe (needs his
name/price ruling). 100: home spear, Search Console, `/work` ItemList, sitemap lastmod,
`/work/ordani` title. Book arc: its own chat, other repo.

## Still his
Google his own name (a v0 page?) · Search Console · the offer's name/price · a portrait
for the back cover · the launch date · the $149 trigger.

## Standing traps
Stripe prefixes `sk_`/`pk_`/`mk_` · Vercel env applies only on a NEW deploy · every push
fires an auto-deploy, check both domains after · `grep -oiF` false zeroes, python utf-8 ·
strip `<script>` before counting · next/image srcsets: count `<img>`, not substrings ·
full-page screenshots freeze the world cross-fade · copy-lint hook rejects docs that
QUOTE banned words · `--cw-accent` flips across hydration · a review is a reader, not an
oracle · two sessions share this tree.
