# RESUME — micahjonesconsulting (2026-09-04, night)

## READ THIS FIRST
Fable 5.1 main, **Opus default subagent** (`.claude/settings.json`). Direction:
`.planning/PHASE-MAP-2026-09-04.md`. Rulings there are settled; do not re-open them.

**Passes 97 and 98 are DONE, verified, judged, and UNSHIPPED.** Branch is 11 commits
ahead of origin. `d614591` Pass-97 (eight Class A defects + `scripts/retired-phrases-gate.mjs`
wired into the build + LESSONS #15). `0718578` Pass-98 (the playbook page from
`.claude/briefs/pass-98-playbook-landing.md`; §9 has the type/contrast record, §10 the
JUDGE verdict: holds, no fix-list). Independent Opus verifiers passed both, both flag states.
**The live domain still serves every defect until the operator deploys.**

## Ship gate for 97+98 (operator-owned, in order)
1. **Register the Stripe webhook + `whsec_` in Vercel Production + one live $500
   buy/refund** (`docs/MONEY-RAIL-TEST.md`). The `/packages` buttons are live over nothing.
2. **Approve deploy** — quote it here with a date, then `docs/DEPLOY-RUNBOOK.md`, both
   aliases (LESSONS #5). Then rerun `scripts/snapshot-live.py` against the LIVE domain and
   the §5 script: this is the only verification that counts.
3. At the gate, in a real browser: scroll `/playbook` (the world cross-fade), zoom the hero
   wall chart at 1440 (labels went 8→11 SVG units), read hero→checkout in the ON state.
4. `PLAYBOOK_ON_SALE=1` in Vercel + redeploy = the launch. Not before 1.

## Next passes (Opus, from new Fable briefs)
99: the landing-page offer + `/services` `/packages` distribution reframe (needs his
name/price ruling first). 100: home spear, Search Console, `/work` ItemList, sitemap
lastmod, `/work/ordani` title. Book arc, other repo: ch8 as sample (brief §8.4), ch8:31
"third"→"first", cover art "SOLO BUILDERS", `publish:site` to refresh the stale frozen
copy, "twenty years of selling" unledgered, the $149 trigger.

## Still blocked on the operator
Google his own name (v0 page?) · Search Console · the offer's name/price · a portrait for
the back cover · the launch date.

## Standing traps
Stripe prefixes `sk_`/`pk_`/`mk_` · Vercel env applies only on a NEW deploy · `grep -oiF`
false zeroes, python utf-8 · strip `<script>` before counting · copy-lint hook rejects docs
that QUOTE banned words · snapshot `.txt` fakes spaces at tag boundaries · next/image
srcset makes substring counts of image names meaningless, count `<img>` · full-page
screenshots freeze the world cross-fade · `--cw-accent` flips across hydration, use literal
tokens · a review is a reader, not an oracle · two sessions share this tree: stage by path.
