# Sol task: the operator's decision queue, 2026-09-11

You are a drafting leg for a solo consultant's website repo (Micah Jones). Read-only. Your
final message IS the finished document: markdown only, nothing before or after it. It will be
saved as `.planning/handoff/DECISIONS-2026-09-11.md` and presented to the operator by the next
Claude session.

## What the document is for

The operator parked a set of decisions while a new chat is set up on his other Claude account.
That chat will present them to him in one sitting, and he answers each in a sentence. Make
every decision answerable without him opening a file.

## The decisions (from `.claude/RESUME.md`, section "Waiting on the operator", 2026-09-11)

1. Engagement price floor.
2. Per-shape commitments (`.planning/design/DIRECTION-110.md` §3.3): what each of the four
   engagement shapes promises, so each pricing box lists lines specific to that shape.
3. Package pick to Stripe (backend): each package covers one area and the buyer picks which on
   the page. How does the pick reach checkout?
4. A count-up on the circled $20M+ would override DESIGN_BAR R13/R15. It ships static now.
5. Case-study lines in `content/work/postmates.mdx` and `content/work/neuton.mdx`: the Hennessy
   example, the word "foreign", and "led to".
6. Ordani product screenshots. None are supplied; the home Ordani section uses lifestyle photos.
7. The paid book PDF's chapter-6 heading still uses a term now banned on the site. The fix lives
   in the book repo, not this one.
8. The metadata and OG descriptions say "$5B+", which adds SurveyMonkey's first-day IPO value to
   two acquisition prices. The home page dropped its $5.58B total for exactly that reason
   (`.planning/reviews/ASTRA-111A-VERDICT.md`). Keep, reword, or drop?

Also list, under "Already ruled" so nobody asks again: the rename of "Frontier AI engineering"
to "AI engineering" (operator, 2026-09-11: "Yes rename it"); Neuton.AI dated 2025; Postmates and
Neuton added as case studies; Guardicore named on /services; the construction term banned
site-wide on 2026-09-11 (see `lib/banned.ts`). Say for each whether the repo shows it done or
still to do (grep; do not assume).

Standing operator-owned items to list after the eight, briefly: merging `design/live-evolve` to
`main` (every push to main auto-deploys production); the Stripe live $500 end-to-end test; the
two Anthropic support questions in `C:/Users/micah/.claude/MODEL_ROUTING.md` §9a. Also check
whether the live Audit product description still carries the retired phrase "prioritized fix
sequence": read `scripts/stripe-setup.mjs` and `scripts/retired-phrases-gate.mjs`, report what
the repo shows, and note that only the operator can check the LIVE Stripe product.

## Sources (the repo is the truth; quote verbatim where a quote exists)

`.claude/RESUME.md`; `.planning/design/DIRECTION-110.md`; `.planning/design/CRITIQUE-110.md`;
`.claude/briefs/pass-111a-boxes-receipts-ordani.md`; `docs/DESIGN_BAR.md` (R13, R15);
`docs/LESSONS_LEARNED.md` entry #3, the verified-facts ledger (search "$5B+", "Neuton",
"Postmates", "Hennessy"); `content/work/postmates.mdx`; `content/work/neuton.mdx`;
`content/citations.ts`; `app/(foyer)/services/page.tsx`; `app/(foyer)/packages/page.tsx`; the
Stripe checkout route (grep for "checkout" under `app/api`); and a grep of the repo for "$5B+"
listing every rendered surface that carries it.

## Format, per decision

### N. The question, answerable in one sentence
- **Unblocks:** what waits on it (Pass-111b, the /services rebuild, waits on 1 to 3).
- **Facts:** 2 to 5 bullets, each ending with its source path.
- **Options:** 2 to 4, each with its consequence in one line.
- **Recommendation:** one option and one line of reason, labelled as a recommendation.

## Rules

- Never invent a fact, a price or a quote. If the repo does not answer something, write "not in
  the repo" and name where it would live.
- Blocking decisions (1 to 3) first, then 4 to 8, then "Already ruled", then the standing items.
- Under 1,500 words. Short sentences. No em-dashes. Do not write the banned term itself.
