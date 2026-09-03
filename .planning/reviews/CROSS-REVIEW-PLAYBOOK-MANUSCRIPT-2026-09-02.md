# CROSS-REVIEW — "The 80% Wall", complete manuscript (MODE: manuscript)

**2026-09-02.** First independent cold read of the assembled book. Target:
`product/playbook/output/the-80-percent-wall.pdf` — the exact file a buyer
receives. 69 pages, 15,352 words, extracted with pypdf and page-marked. Input
95,096 bytes, under the 200,000 cap: **no truncation, every leg saw all 69
pages.**

## VERDICT: BLOCK (3 confirmed claim-honesty defects) + CONCERNS (8 improvements)

The block is not from the external legs. It is from checking their findings
against `docs/LESSONS_LEARNED.md` #3, which the legs could not see. Two
operator rulings dated 2026-09-01 were swept across the site and **never
applied to the PDF**. The book is the most public surface the project has, and
it currently contradicts both.

---

## Round composition — honest accounting

| Leg | Model | Status |
| --- | --- | --- |
| Gemini | `gemini-2.5-flash` (REST) | OK — VERDICT: PASS |
| Codex (deep) | `openai-codex/gpt-5.4` (CLI) | OK — VERDICT: CONCERNS |
| GLM | `glm-5.2` (REST, Z.ai) | OK — VERDICT: CONCERNS |
| Claude (same-family) | — | **DELIBERATELY SKIPPED**, see below |

**The same-family leg was not run.** The protocol calls for it. It was skipped
on two grounds: the operator is actively managing a 5-hour usage window, and
this manuscript was co-written by that model family, making it the least
independent reader available. Recorded here rather than silently omitted.

### Round 1 was INVALID and was discarded

The first round of this review is void. `manuscript` mode was added to the
harness, but the override reached only the CLI path — **both REST legs read a
69-page book under the Next.js code-review instruction.** Gemini duly reported
on "the repo" and "no auth/DB/payments" and returned a PASS it had no basis
for. Fixed (`_instruction_for`, all three legs resolve through one function)
and the round was re-run from scratch. The round-1 output is not cited anywhere
below.

### The Codex leg had been silently dead

The pin `openai-codex/gpt-5.6-sol` returned `Unknown model`. So did every
fallback recorded beside it — sol, terra, luna and 5.5 are all gone from the
plugin's model list. The entire 2026-07-09 pin block was stale, fallbacks
included. **The deep leg has therefore been absent from every round run since
the plugin rotated**, failing loudly each time rather than fabricating, but
absent. Re-pinned to `openai-codex/gpt-5.4` and smoke-tested through the
harness per the pin's own rule.

---

## CONFIRMED — BLOCK class

### B1. A retired user count ships in the book, in three places (four in source)

**p4:** "a HIPAA-compliant SaaS I built alone with Claude Code and Cursor, that
hundreds of birth workers pay for."
**p53:** "Hundreds of birth workers pay for it today, and at the six-month mark
none had been lost to a competitor."
**p69:** "Hundreds of birth workers pay for it today."

LESSONS #3, **SUPERSEDED 2026-09-01**, operator verbatim: *"drop the user
amounts across the website for ordani, just say it has active paying users,
it's in beta, we're releasing to public soon."* The ledger records the result
as "Every user count is now OFF every public surface: no '200', no 'hundreds'"
and lists the swept surfaces: case study, home, about, services, playbook, root
metadata, llms.txt. **The PDF is not on that list and was not swept.**

Approved phrasing is "active paying users", framed as **in beta with a public
release coming**. All three passages also omit the beta framing entirely — p53
actively implies a shipped product with a retention history.

A fourth instance sits in `chapter-01.typ:240`, inside the `#sampler-only`
block. It is suppressed in the paid PDF but **renders in the free sample** —
the most widely read surface of the three.

"None lost to a competitor" survives the ruling and can stay.

### B2. Ordani's security design is published, by name, in three field notes

**p33**, directly beneath a working row-level-security policy:
> "Ordani, the HIPAA-compliant app from these pages, runs its entire
> authorization model this way: a birth worker sees her clients and nobody
> else's, enforced in the database."

**p22:** "Ordani runs this way: a birth worker sees her clients and nobody
else's, enforced in the database, not in my query discipline."
**p48:** "…a vendor chain where everything touching client data carries the
right agreement, ownership enforced in the database, and the two-account
discipline from chapter five."

LESSONS #3, **SECURITY-DETAIL GATE**, operator 2026-09-01: *"dont make specific
security stuff on the app."* The ledger extends the vendor gate from names to
**mechanisms**: "Ordani surfaces never describe how the protections work: **no
row-level policies**, no encryption placement, no audit-log or export-gating
description." Its stated rationale: "Publishing your control design on a
product holding real patient data is a gift to an attacker, and a buyer reads
its absence as competence."

The ledger asserts ordani.mdx "was the only surface carrying mechanism detail."
**That was wrong.** The book carries it three times, and p33 is the most
explicit disclosure of the three — it pairs the named product with the concrete
policy shape.

Note what is *not* broken: teaching RLS generically is the book's job and is
fine. The defect is the attribution. Cutting Ordani's name from these three
field notes satisfies the gate, costs the book nothing pedagogically, and
removes three self-referential asides.

### B3. The exits figure is attributed to the wrong group of companies

**p69:** "I sold enterprise software inside SurveyMonkey on the way to its IPO,
and I was inside Postmates, Guardicore, and Neuton.AI for their exits: **$5B+
in combined value.**"

Two legs independently computed the shortfall and flagged it. LESSONS #3 proves
them right:

> $5B+ combined = DISCLOSED deals only: Uber–Postmates $2.65B + **SVMK
> first-day IPO value $2.33B** + Akamai–Guardicore $600M = $5.58B; Neuton
> undisclosed, contributes $0.

The sentence puts SurveyMonkey in a *preceding* clause and hangs "$5B+" off the
three that follow. Those three carry $2.65B + $0.6B + $0 ≈ **$3.25B**. The
figure is only true across all four. `/about` words it correctly ("the
disclosed deals total $5B+" covering four companies); the book does not.

This is the credibility-anchor sentence of a $99 book, and as written a reader
with a search engine can catch it.

**The corrected sentence already exists in this repo.** The same author block
appears twice. `chapter-01.typ:238` (the `#sampler-only` block, which ships in
the FREE chapter) reads "$5B+ in combined value **across the four**."
`chapter-10.typ:162` (the paid book's closing block) drops those three words.
One copy was fixed and the fix never propagated to the other. Nothing needs to
be decided here — the phrasing is settled, it just has to be carried across.

---

## CONFIRMED — improvement class

### C1. Chapter 10 is thin, and it is visible (all three legs, unanimous)

Every leg named it. Codex: *"no handoff checklist, no due-diligence prep beyond
metaphor, no hiring scorecard, no fractional-engagement rubric."* GLM: *"after
nine chapters that each ship a file, a template, or a code snippet, the final
chapter ships prose and a recap, and it's the last thing I read."* Gemini,
which passed the book overall, still flagged the structural break.

Both critical legs converged on the same fix without being prompted: a file
card + a definition block + at least one real artifact — a quarterly scorecard,
a rules-with-reasons role brief, or a data-room checklist mapping each artifact
the book made you write to what diligence asks for.

Both also independently proposed the same fallback: merge ch10 into ch9 as a
shorter epilogue. Codex additionally noted the ordering inverts the energy —
§10.4's thesis recap lands *after* the pre-flight, so the manual ends on an
essay rather than a procedure.

### C2. "Row-level security on, on every table" is over-broad (p33, p36)

A literal reader applies RLS to migration metadata and internal tables. Correct
scope: every application table reachable from a user-context query or a
browser-exposed path, with exceptions documented. Cheap fix, highest-stakes
chapter.

### C3. `auth.uid()` is Supabase-specific; the book never names a platform

Verified: zero occurrences of "supabase" in the manuscript. The book hedges
"the helper's name varies by database host," but the anon-key/service-key
architecture around it is one platform's model, not Postgres-universal.

**Do not fix this by naming the vendor.** The VENDOR GATE bans infra-vendor
names on Ordani-mentioning surfaces, and this book mentions Ordani. The fix is
to widen the hedge to cover the key model, not just the helper name.

### C4. "as with every environment variable… until a rebuild" (p29) over-generalises

True on immutable-deployment hosts; on a traditional VPS a restart suffices.

*Partial refutation:* GLM quoted this as "environment variables are read when
the app is built, not when you save them in the dashboard" on p27. **That
sentence does not appear in the manuscript.** The substance survives at p29 in
different words; the quote does not.

### C5. Secret-scanning instruction is noisy (p33/34)

"search for `sk_`, `secret`, `key`" — the first two are high-signal, `key` in a
browser bundle is near-useless. Name known secret prefixes and exact env names.

### C6. Three of thirteen build-log entries are month-only

The cover claims "EVERY BUILD-LOG ENTRY IN THIS MANUAL IS TRUE AND DATED." Ten
entries carry full dates; three carry "2026-08" alone. Either add days or
soften the cover claim.

### C7. "In 2026 the big models hold…" (p4) timestamps the book

Hedged with "somewhere between," so the mechanism survives the numbers. Low
priority; noted by two legs.

### C8. DISAGREEMENT — chapter 7 (compliance)

Codex calls it the weakest technical chapter: *"too compressed for the claims
it brushes against… most likely to be over-relied on by exactly the reader
least equipped to know where it is thin."* It wants an explicit "this chapter
is triage, not clearance" frame and a list of what is omitted.

GLM disagrees: *"not under-delivery — the chapter explicitly positions itself
as a field guide, not legal advice."*

Surfaced unresolved, per protocol. My read favours Codex's narrower ask: the
"triage, not clearance" line is one sentence and it costs nothing.

---

## REFUTED — with evidence

**Codex R1: soften "HIPAA-compliant" to "operated in a HIPAA-regulated
context."** LESSONS #3: *"HIPAA: Ordani is HIPAA-compliant (operator
confirmation 2026-08-31: 'HIPAA compliant is true'). 'HIPAA-grade' was the
pre-confirmation hedge; swept to 'HIPAA-compliant' everywhere same day. NEVER
revert to '-grade'."* The operator has ruled and explicitly banned the hedge
this finding proposes. Dismissed.

**GLM R2 / round-1 GLM: the "$149 button" on p42 contradicts the $99 price.**
`app/(foyer)/playbook/page.tsx:294` and `:594` both render "$99 at launch ·
$149 after". The book is consistent with the live page. Dismissed — **but it
records a real coupling**: LAUNCH-PLAN §7.3 leaves "a real dated increase, or
remove it" open. Removing the $149 line orphans p42.

**GLM: "hundreds of paying birth workers" is an unsupported claim.** It is
operator-confirmed and ledgered. The legs pointed at the right sentence for the
wrong reason — the defect is that the claim is *retired* (B1), not that it is
unsupported.

**Gemini's overall PASS.** Not refuted, but weighted low: it found none of the
defects the other two legs found, and none of the three the ledger confirms. On
a 95KB input this leg reads as a summariser, not an auditor.

---

## Stop rule

Round 2 produced three CONFIRMED block-class findings. **The round does not
close.** Per `.claude/cross-review-prompt.md`, the fix pass is itself a
first-class review subject: after B1–B3 are corrected and the PDF re-rendered,
re-extract and re-run before the book ships.

## Harness changes made during this round

- `scripts/cross-review/run_cross_review.py`: added `manuscript` mode
  (`MANUSCRIPT_INSTRUCTION`, `MANUSCRIPT_DEEP_INSTRUCTION`); added
  `_instruction_for()` so **every** leg resolves its instruction through one
  function — the REST legs previously hardcoded `SHORT_INSTRUCTION` and silently
  ignored any mode override; re-pinned the Codex model.
- `plan` and `diff` behaviour is unchanged: `MODE_INSTRUCTION_OVERRIDE` is empty
  for both, verified by direct introspection of all three legs in both modes.
