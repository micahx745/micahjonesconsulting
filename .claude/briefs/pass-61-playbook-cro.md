# Pass-61 — /playbook conversion readiness

DIRECT segment, Fable, 2026-09-01. First brief written under `MODEL_ROUTING.md` §6.
Skills applied: `page-cro` (Phase 0 scoring), `marketing-psychology` (PLFS, ethical guardrails).

## 1. The ruling

For **email capture** the page scores **76/100, Moderate Readiness**. It is good and needs
corrections, not reinvention: six verbatim copy edits, one social share image, one deploy.
For the **$99 purchase** it scores **68/100, Low Readiness** and is not ready to flip. The
gap is not persuasion. It is hierarchy (no primary buy action), adjacency (the refund sits
in a spec row far from any button), and three operational gates that must pass first.

Reason: the page already earns attention with a real free chapter and a dated build log. It
has not yet earned a stranger's $99, because nothing on it answers "who are you" with a face
or a second credential, and the risk reversal is not where the decision happens.

**Do not A/B test.** Traffic is too low, and these are corrections, not hypotheses.

| Category (email goal) | Score |
|---|---|
| Value proposition clarity | 22 / 25 |
| Conversion goal focus | 16 / 20 |
| Traffic to message match | 9 / 15 |
| Trust and credibility | 9 / 15 |
| Friction and UX | 13 / 15 |
| Objection handling | 7 / 10 |

Evidence: live fetch 200, 66 ms TTFB, 750 words, 13.4 words/sentence, zero body em-dashes,
screenshots at 375x812 and 1440x900.

### Live production carries a retired claim (urgent, but not mine to fix)

The live page still says Ordani is "a HIPAA-compliant SaaS that hundreds of birth workers
pay for." The ledger retired every Ordani user count on 2026-09-01. **HEAD already has the
correction**; it is unshipped because deploy is an operator decision. This is the single
largest trust correction available and costs no engineering.

## 2. Final copy — exact strings

**QW1 — price mismatch on the inbound bridge.** `app/(foyer)/services/ai-engineering/page.tsx`
- Find: `for $149, not $5K a month.`
- Replace: `for under $150, not $5K a month.`
- True at both $99 and $149, so it never needs maintenance again.

**QW2 — success state names the sender.** `components/color-worlds/PlaybookSignupForm.tsx`
- Find: `Chapter 1 is on its way. Check your inbox.`
- Replace: `Chapter 1 is on its way from micah@micahjonesconsulting.com. Nothing in a few minutes? Check spam.`

**QW3 — hero link discloses the cost of "free".** `app/(foyer)/playbook/page.tsx`
- Find: `Read chapter one free <span aria-hidden>↓</span>`
- Replace: `Read chapter one free, by email <span aria-hidden>↓</span>`

**QW4 — two FAQ entries.** `app/(foyer)/playbook/page.tsx`, append to `FAQS` after the
tutorial entry:
```
{
  q: "What if it does not help?",
  a: "Thirty days, full refund, no questions asked. Reply to the delivery email and I refund it.",
},
{
  q: "Will it go stale?",
  a: "The tools change monthly. The walls do not. Every future edition is included and goes to the same email.",
},
```

**QW5 — author row in the spec card.** `app/(foyer)/playbook/page.tsx`, inside
`<dl className="cw-lp-spec">`, before `<dt>Format</dt>`:
```
<dt>Author</dt>
<dd>Micah Jones · Oakland · built Ordani solo · four exits behind my work</dd>
```
"behind my work" is the approved ledger umbrella phrasing for the four-count.

**QW6 — restore the who in the Ordani line, without a count.** `app/(foyer)/playbook/page.tsx`
- Find: `a HIPAA-compliant SaaS with active paying users.`
- Replace: `a HIPAA-compliant SaaS for birth workers, with active paying users.`
- Pass-60 removed the count and the audience together. The audience is not a count.

**Not changed, deliberately:** the H1, the sub, the button label, the "no drip" note, the
Status row, and the three existing FAQs. They are good.

## 3. Layout spec

One new file only: `app/(foyer)/playbook/opengraph-image.tsx`, copying the existing pattern
in `app/(foyer)/about/opengraph-image.tsx`. Punch line `Your build got to 80%. Here is the
rest of the way.` Subline `A field manual for solo builders · 68 pages · 26 working files`.
Add `twitter: { card: "summary_large_image" }` to the page `metadata`. Next.js injects
`og:image` from the file. Every other route has one; this one does not, and this audience
arrives from shared links.

No new tokens. No new classes. QW5 uses the existing `cw-lp-spec` definition list.

## 4. Motion

Nothing new. Explicitly forbidden here: sticky buy bar, exit-intent popup, countdown, any
pinned or follower element. The page's restraint is its positioning.

## 5. Verification — commands with expected output

```
pnpm exec prettier --check "app/(foyer)/playbook/page.tsx" "components/color-worlds/PlaybookSignupForm.tsx"
```
Expected: `All matched files use Prettier code style!`

```
pnpm build
```
Expected: copy-lint gate passes, no banned word, no em-dash over cap, build completes.

```
curl -s https://www.micahjonesconsulting.com/playbook | grep -c "hundreds of birth workers"
```
Expected AFTER the operator deploys: `0`. Today it returns `1`, which is the open defect.

## 6. Rejected list — do not re-propose

Countdown or launch timer (banned; no date to count to) · waitlist or reader counter
(unverifiable public data claim, same class as the badge killed in LESSONS #10) ·
testimonials or "early reader" quotes (none exist; inventing them is prohibited) ·
exit-intent popup, sticky bar, sticky buy button (second motion) · discount codes, founder
tiers, or a second price artifact (Pass-52 deliberately got to one) · bundle with a call or
checkout upsell (dilutes the single action) · payment plans or pay-what-you-want ($99 needs
no financing) · tool logo strip (icon kits banned; the FAQ names the tools in text) ·
anchoring against the $5K/month rate on this page (self-serving here; it belongs on the
services bridge, where it already is) · a louder guarantee (60 days, double-your-money reads
as theater on a $99 PDF) · a name field on the form (one field converts better) · swapping
the free chapter for a checklist (a real nine-page chapter is stronger reciprocity) · hero
video trailer (socket exists, asset does not; not a CRO fix) · live chat widget (off-brand) ·
shrinking the mobile cover to lift the CTA (real finding, but the cover-as-object is the
page's one design idea; a design-director call, parked not executed).

## 7. Return conditions — when Fable comes back

- After the six edits deploy: one read of the live URL for claim honesty against LESSONS #3.
- Before the $99 flip: a buyer read of the purchase-phase layout in section 8 below.
- If the operator supplies a portrait or a ship month, the trust block is re-judged.

## 8. Parked operator decisions

1. **Deploy Pass-57..61.** Removes the retired "hundreds" line from production. Largest
   trust correction available, zero engineering cost.
2. **A ship month** for the spec card ("Ships October"). Turns "Not for sale yet" into a plan.
3. **A portrait** for the § 0.1 rail and the share card. Constitution bans stock; it must be his.
4. **Real early-reader quotes**, once chapter one has gone out. Attributed only.
5. **The "$149 after" commitment** — a real internal date for the raise, or the anchor comes off.
   An anchor with no intent behind it is false scarcity in slow motion.
6. **Price lock for the list** — do subscribers keep $99? If yes, say it in the launch email.
7. **Stripe account split**, a live-mode purchase with his own card, and a production
   `RESEND_API_KEY` probe. The build log on this very page describes that exact failure.
8. **Whether the exits credential belongs on this page.** Pass-55 dropped it; QW5 restores it.

### The purchase-phase ruling, held until the flip

Hierarchy inverts in exactly two places: a filled `Buy the manual · $99` pill as primary in
the hero and at the back cover, with the email form demoted to the "not today" path under
kicker `Not today?`. Under each pill, one line: `30 days, full refund, no questions. Reply to
the delivery email.` Under the back-cover pill only: `Checkout runs on Stripe. I never see
your card. One email, two attachments, usually within minutes.` Above it: `Read chapter one
first. If it does not earn the other nine, keep your $99.` Status row becomes `Available ·
delivered by email, usually within minutes`. Gates 1, 2, 3 and 7 above block the flip.
