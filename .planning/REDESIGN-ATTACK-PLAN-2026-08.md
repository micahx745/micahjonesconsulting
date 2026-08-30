# REDESIGN ATTACK PLAN — micahjonesconsulting.com (2026-08-29)

> **AMENDED 2026-08-29 after operator review.** LOCKED: D-R1 hero sentence (Fable's
> draft), D-R2 audience split (confirmed), D-R3 palette five worlds -> three.
> **D-R4 OVERRULED BY THE OPERATOR:** he wants animations, and motion direction moves
> into the research/style-tile stage rather than being pre-decided here. Wave 0 is
> therefore REPAIR, not removal — see `.planning/redesign-2026-08/DIRECTION.md`, which
> is the current-state artifact and outranks this document on every row it covers.

Author: Fable 5, at the operator's request. Research plan + execution plan for a full
redesign. Brief: "less is more with everything but super powerful"; "do not be shy about
making big changes"; positioning must scream what the resume already proves.

Inputs read before writing: CLAUDE.md (all three), RESUME.md, LESSONS_LEARNED #1-#8,
DESIGN_BAR.md, brand.json, STANDING_TECHNIQUES CARDS 1-6, the Cowork premium-tier prompt,
`~/.claude/playbooks/marketing.md` + `website-dev.md`, globals.css (3,894 lines), the live
home page source, and live word counts for all ten routes.

---

## 1. VERDICT — three different problems wearing one complaint

**DEFECT (fix regardless of any design direction).** The reveal animation has never played
for anyone. Three overlapping reveal systems exist; two are inert and the third is dead:

- `components/RevealMount.tsx` queries `[data-reveal]` — zero such attributes exist
  anywhere in app/ or components/. It mounts in the root layout on every page and does
  nothing but add a body class. Dead code.
- The IntersectionObserver path (`components/color-worlds/ScrollReveal.tsx` + `.is-in`)
  is correct but permanently overridden.
- The `@supports (animation-timeline: view())` block (globals.css ~3296) wins in every
  modern browser and permanently resolves the animation to its END state: all 24
  `.cw-reveal` elements render `opacity: 1` at every scroll position, verified with
  Playwright against production at 1440x900, reducedMotion: no-preference. The exact
  `view()` resolution failure is unresolved (suspect interaction with Lenis's scroll
  handling); we do not need to solve it — we need to stop depending on it.

The operator ALSO browses with Windows `MinAnimate = 0`, so his machines report
`prefers-reduced-motion: reduce` and correctly suppress everything. He experiences both
the real defect and his own OS setting. Consequence for design, not just for the fix:
**the motionless page is the page the operator sees every day, and the page a meaningful
share of visitors see. It must be the design baseline, not the fallback.**

**DESIGN.** Word counts are roughly double the tier's norm (home 690 words; services 848;
hr-equity-author 803 — the Pentagram/Koto/Metalab class runs homepages under ~300). The
section-header system is a drumbeat: mono eyebrow + large uppercase display on nearly every
section, most headlines the same abstract-noun-plus-period template — the exact "same
grammatical shape" slop tell the Cowork prompt names. Five palette worlds is a vocabulary,
not a position; at five, the shift reads as decoration. LCP is 3017ms against an 1800ms
budget. globals.css carries three generations of design system (foyer/theater legacy +
Color Worlds) in 3,894 lines.

**STRATEGY.** The site is asked to convert three audiences that pull in opposite
directions, and currently resolves the tension by splitting the difference everywhere —
which is the most expensive possible answer. Resolved in §2.

What is genuinely good and stays: the facts (three exits helped-built, $20M+ client
revenue, $80M pipeline — this inventory beats most agencies' entire client lists), the
voice rules, the scroll palette shift as a signature (it WORKS, verified), the left-aligned
one-sentence hero pattern, the case-study skeletons. The operator said the stories are a
foundation. Agreed. This is a compression-and-sharpening job on copy, a subtraction job on
design, and a decision job on strategy — not a teardown.

---

## 2. THE STRATEGY CALL — one spine, split doorways

**One surface cannot carry all three audiences equally.** A homepage catchy enough to make
a vibe coder feel seen reads scrappy to a bank's procurement team; a homepage restrained
enough for procurement bores the builder. Split-the-difference is how the current site got
wordy: every section explains itself to three readers at once.

**Architecture:**

- **The homepage aims at audience B (enterprise / high-value buyers), written so plainly
  that audience C (small business) reads it without friction.** B and C both buy outcomes;
  they differ in vocabulary tolerance, not in what convinces them. Named numbers in plain
  sentences serve both. The homepage STOPS trying to be catchy for builders, stops
  explaining methodology, and stops carrying six sections of self-description.
- **Audience A (solo builders) enters at `/playbook`** — which already exists, is already
  deliberately kept off the enterprise front door, and is already the product A buys. That
  page gets to keep lived specifics and looser energy. A builder who lands on the homepage
  first still sees three exits and a person who ships; that does not repel A, it earns A's
  respect. What repels A is corporate vagueness — and the voice rules already ban that.
- **Shared spine across all routes:** identity (name, type, palette), the facts ledger,
  first-person voice, one CTA grammar per page. What splits: density, register, and entry
  CTA (homepage → hire-me; playbook → buy).

**The 2-second sentence** (draft — final wording is taste-lock decision D-R1):

> "Most consultants can't build. Most builders can't sell. I do both."

with the proof deck immediately under it, no adjectives:

> "Three companies I helped build reached exits. $20M+ in client revenue. $80M in pipeline
> at one of them."

Aimed at: audience B, legible to C, respected by A. This is the honest translation of
"I help people get rich": the site never says rich — it shows revenue, pipeline, and exits
in named numbers and lets the reader do the arithmetic. Force preserved, procurement-safe,
zero banned words, ledger-clean ("helped build reached exits", never a Neuton cap-table
claim). Every page must answer "this person makes companies money" inside two seconds,
via numbers, never adjectives.

---

## 3. STAGE 0 — DISCUSS / TASTE-LOCK (blocking; no build before the artifact exists)

Per marketing.md non-negotiable #1 (the UI-006 six-week burn): discuss before research,
research before build. This stage is one conversation, not a survey. Six questions:

1. **References you USE.** Name up to three products or sites you personally use and
   admire — and the one thing each does that you want here. Not Dribbble, not portfolios
   of portfolios. (If nothing comes to mind, react to the six side-by-sides I bring —
   see §4.)
2. **Anti-patterns.** Name two sites, or two specific design moves, that make you close
   the tab. This is the most diagnostic signal we can get.
3. **The sentence.** Pick or edit one of three hero-sentence options I present (§2 draft
   plus two alternates). This locks positioning before any pixel moves.
4. **The audience architecture.** Confirm or overrule §2: homepage aims at enterprise and
   high-value buyers; builders enter at /playbook; small business reads the same proof in
   plain words.
5. **The palette.** Directional only (final call at the style tile with side-by-sides):
   A) keep five worlds · B) cut to three — bone, terracotta, espresso (my recommendation)
   · C) one ground + one accent.
6. **Motion baseline.** Confirm: the motionless page is the design baseline; the palette
   shift is garnish on top, not the load-bearing wall. (You browse with animations off —
   this makes the version you see daily the primary design surface.)

**Artifact:** `.planning/redesign-2026-08/DIRECTION.md` — locked position sentence,
audience architecture, exactly 3 references + 2 anti-references (live URLs, each with the
named traits to borrow/avoid), palette direction, motion baseline, and the operator's
verbatim answers with a date. No DIRECTION.md → no Wave 2 or later. Wave 0 (the defect)
proceeds regardless.

**On the two Dribbble profiles the operator offered:** examined and set aside, stated
here so we do not design toward them by drift. `dribbble.com/arounda` is an agency
thumbnail grid — a different business telling a different story (headcount, volume).
`dribbble.com/nexuxlab` is SaaS/fintech dashboard product design — card-based admin UI,
data-dense, near-irrelevant to a solo consulting narrative. Useful as evidence the
operator responds to confident, structured, data-forward surfaces; not usable as
references. The reference set must be real shipped sites (§4).

---

## 4. RESEARCH PROGRAM

Builds on research already done (DESIGN_BAR's 12-exemplar teardown, the 2026 trend scan,
conversion timing research). Do not repeat it; extend it into side-by-sides and a lock.

**Corpus — live sites only, never shots.** Calibration set for the side-by-sides:
Linear (marketing surfaces), Stripe Press, rauno.me, Pentagram, danmall.com, Koto —
six covers the spread from institutional (B) to solo-craft (A-respecting). Directories
(awwwards, godly.website) may be used only to FIND live URLs; judgment happens only on
the shipped site at real viewports. Anything the operator names in Q1 outranks all of it.

**Method, per site (recorded in `.planning/redesign-2026-08/REFERENCES.md`):** load live
at 1440 and 390; capture: (a) the 2-second sentence, verbatim; (b) nav item count;
(c) above-the-fold word count; (d) typefaces + display:body size ratio; (e) full palette
inventory (computed values, not eyeballed); (f) motion inventory AND behavior under
`prefers-reduced-motion: reduce`; (g) the one device worth stealing; (h) the one thing
NOT to copy. Grade each against DESIGN_BAR §6 where applicable. Screenshot pairs: the
current site next to each candidate at the same viewport — these are the side-by-sides
the taste-lock conversation reacts to.

**Lock rule:** exactly 3 references and 2 anti-references graduate into DIRECTION.md
with the operator's words attached. A reference not in DIRECTION.md does not exist for
build purposes. This is the mechanical gate that prevents a UI-006 repeat.

---

## 5. EXECUTION WAVES

Each wave: scope → surfaces → gate → rollback. Every wave touching UI runs the full
verification battery: 390/768/1440 device pass on every touched surface against the
PRODUCTION build (`next build` + `next start`, never dev), console read at each viewport,
committed evidence file `verification/<wave>-viewports.md`, axe, Lighthouse delta. A wave
without its evidence file has not run the gate. Deploys are operator-approved per CARD 1
(both domains re-aliased, `data-dpl-id` diffed — LESSONS #5). Commits are "Pass-N"
subjects; every wave's rollback is `git revert` of its commits.

**WAVE 0 — Kill the dead motion (ships immediately, independent of direction).**
- Delete the `@supports (animation-timeline: view())` reveal block from globals.css.
- Delete `RevealMount.tsx` and its root-layout mount — AFTER a dependents grep for
  `data-reveal`, `scroll-reveal--shown`, and the body class it adds (playbook pitfall #90:
  enumerate side effects before removing).
- The IntersectionObserver path becomes the only reveal system and now actually runs.
  Trim its transition from 0.9s toward the R15 bound (run once, ease-out, ≤400ms-class).
- Gate: Playwright on the production build — below-fold `.cw-reveal` computes opacity 0
  before scroll and gains `.is-in` on entry; reduced-motion still full-stops; device pass
  + console + evidence file; Lighthouse must hold or improve.
- Rollback: one revert commit.
- Note: Wave 4 will likely delete reveals entirely (§6). Wave 0 is still correct — the
  live site is broken today and direction may take days. Cheap, honest interim state.

**WAVE 1 — Taste-lock.** §3. No code. Gate: DIRECTION.md exists, dated, operator-worded.

**WAVE 2 — Style tile (aesthetic gate BEFORE any full page).**
- One static page: locked palette rendered as world sections, the type scale, the new
  header treatment (§7), the hero with the locked sentence, one full section — built in
  BOTH states, motion and motionless, motionless shown FIRST (it is what the operator's
  own machine will show him).
- Delivered as a Vercel preview deploy (never aliased) + screenshots.
- Gate: operator I-Like / I-Wish / What-If, ending in an explicit ship/revise/refuse call
  on the aesthetic. Refuse → back to Wave 1, cheap. Rollback: none needed, nothing shipped.

**WAVE 3 — Copy spine (staged, deploys inside Waves 4-7).**
- Per surface: extract every factual claim into a claims table checked against LESSONS #3;
  cut to the §7 word targets by deleting explanation and keeping assertion; copy-editor
  subagent pass; full-tree NEVER-phrase sweep; rendered-text ban battery on the built
  output (source greps miss entity/JS-rendered variants — marketing.md #3).
- Drafted in `.planning/redesign-2026-08/copy/` before touching app/.
- Gate: copy-lint + ledger sweep clean; operator reads home + hire-me copy and approves.
- Rollback: files never deployed alone; superseding drafts.

**WAVE 4 — Homepage rebuild (the big visual proof).**
- New structure per DIRECTION.md: ≤5 sections (from ~7), ≤350 words (from 690), hero =
  sentence + proof deck, section headers per §7, palette worlds per the lock, reveals
  deleted (D-R4), the scroll palette shift retained as the ONE gesture.
- Gate: full battery + Lighthouse LCP checkpoint + operator visual checkpoint
  (motionless screenshots first, then motion). Rollback: revert; the old page lives in git.

**WAVE 5 — /about, /services, /hire-me** (+ execute the /services/ai-engineering merge if
D-R5 approved). Same gates. /hire-me keeps the numbered receipts block (protect list).

**WAVE 6 — Case studies (the proof layer).**
- Compress prose toward evidence: what a $100K buyer needs on the first screen; tables
  and numbers where prose currently explains; artifact frames planned and positioned.
- Partially blocked on operator artifacts (Ordani screenshots, portrait — queue item D12).
  Ship with the accepted placeholder frames; do NOT hold the wave hostage to photography.
- Gate: full battery + case-study framework intact (frontmatter schema, citations.ts —
  numbers render from the citations object, never as prose literals).

**WAVE 7 — /playbook (audience A's front door).**
- Align to the new system without corporate polish: keep lived specifics, looser register,
  the "built solo with AI tools" Ordani framing that page is licensed to use.
- Gate: full battery + an A-persona cold read (marketing.md: GOT IT / FUZZY / LOST per
  concept) — the page must make a stuck builder feel precisely diagnosed.

**WAVE 8 — Excision + performance + final audit.**
- Remove dead design-system generations from globals.css (verify with a usage grep per
  selector family first — (theater) case-study selectors are LIVE; foyer-legacy ones
  likely are not; the repo wins, not this doc). Target: 3,894 → under ~2,500 lines.
- LCP campaign toward ≤1800ms within D14 (three faces stay): subset fonts, preload the
  display face, metric-matched fallbacks, keep the hero text-only.
- Gate: `/premium audit` + `/cross-review diff origin/main` (CARD 6) + DESIGN_BAR §6
  self-grade targeting ≥18/20 with zero load-bearing failures + CARD 1 ship flow.

Sequencing rationale: the operator sees working proof at Wave 0 (site behaves), Wave 2
(the aesthetic, cheap to refuse), Wave 4 (the homepage) — early and often, with the two
cheapest-to-reverse gates placed before the expensive build waves.

---

## 6. DELETION LEDGER — what "less is more" actually removes

| # | Item | Action | Wave |
|---|------|--------|------|
| 1 | `RevealMount.tsx` + `[data-reveal]` system | DELETE (dead code) | 0 |
| 2 | `@supports (animation-timeline: view())` reveal block | DELETE (the defect) | 0 |
| 3 | ALL entrance reveals (IO path too) | DELETE — recommend zero; 24 fade-ups is the "AOS on every section" tell (DESIGN_BAR never-list). D-R4. | 4 |
| 4 | Palette worlds: petrol `#1A4548`, saffron-as-world | RETIRE — cut 5 worlds to 3 (bone/terracotta/espresso); saffron survives only if the style tile proves it earns accent duty. D-R3. | 2/4 |
| 5 | Mono-eyebrow + uppercase-display header drumbeat | DELETE as a system; each header earns its place individually; some sections go headerless | 4-7 |
| 6 | `/services/ai-engineering` (414 words) | MERGE into /services — a one-child taxonomy is nav noise. D-R5. | 5 |
| 7 | Homepage sections (7 → ≤5) | FOLD about-brief into the hero proof deck; compress how-i-work to one line per step or move to /services | 4 |
| 8 | ~1,800 words site-wide (§7 targets) | CUT | 3-7 |
| 9 | Dead foyer-legacy CSS generations | DELETE after usage grep | 8 |
| 10 | Three typefaces | KEEP — D14 is decided; not relitigated here. Reopens only by operator, only with LCP evidence in hand. | — |

The scroll palette shift is NOT deleted. It is the signature, it verifiably works, and it
is protect-listed. Cutting its vocabulary from five worlds to three makes each transition
rarer and larger — the shift gets MORE powerful by subtraction, which is the whole brief.

---

## 7. COPY STRATEGY — from wordy to compelling without breaking anything

**Method (per surface, in order):**
1. Claims table: every factual claim, its ledger line, its provenance. A claim with no
   ledger line is cut or marked "operator must supply" — never patched with an invented
   number.
2. Compression pass: assertion survives, explanation dies. Every section leads with its
   conclusion; a number may be followed by ONE sentence of mechanism (R14 wants metric
   WITH mechanism); the third sentence of any paragraph must justify itself.
3. Slop-tell pass: kill triads, symmetric sentence pairs, repeated headline grammar.
   Vary section-opening shapes deliberately. One em-dash per page, hard.
4. copy-editor subagent + copy-lint + full-tree NEVER-grep + rendered-text battery.

**Word targets (live counts → target):**
`/` 690 → ≤350 · `/about` 276 → ~250 · `/services` 848 → ≤500 (absorbing the merge) ·
`/work` 121 → keep · `/work/guardicore` 398 → ~350 · `/work/ordani` 589 → ~450 ·
`/work/hr-equity-author` 803 → ≤550 · `/playbook` 701 → ~600 (A wants lived detail; cut
throat-clearing, keep specifics) · `/hire-me` 455 → ≤350.
Site total ~5,300 → ~3,450 (-35%).

**Register split:** homepage/services/hire-me write for a procurement-grade skim — short
declaratives, numbers up front. /playbook writes for recognition — the reader's exact
failure mode named in their vocabulary. Case studies write for the skeptical CFO — every
claim interrogable, mechanism attached.

---

## 8. MOTION STRATEGY

**One gesture: the scroll-linked palette cross-fade.** Already the signature, already
protect-listed, already verified working. Everything else is static. No entrance reveals,
no hover theatrics beyond CSS-transition affordances, no parallax, nothing idle.

**The motionless page is the design baseline.** Composition, hierarchy, and the 2-second
sentence must land with zero animation — because that is what the operator's own machines
render, and what every reduced-motion visitor gets. Under `prefers-reduced-motion:
reduce`, the palette worlds still exist as static per-section grounds (color changes at
section boundaries without the cross-fade), so the signature survives as composition even
when it cannot survive as motion. Every operator checkpoint presents motionless
screenshots FIRST, then the motion pass.

Case-study hero (TitleCard resolved state) stays as-is under reduced motion. No new
motion is introduced anywhere in this arc; the motion-engineer agent's refusal of second
gestures stands.

---

## 9. RISK REGISTER

| Risk | Early warning | Revert / mitigation |
|---|---|---|
| LCP stuck above 1800ms or regressing (baseline 3017ms) | Lighthouse delta per wave; any wave that worsens LCP fails its gate | Revert the wave; Wave 8 mitigations (subsetting, preload, metric fallbacks, text-only hero); D14 reopen is operator-only, evidence-first |
| Palette cut reads flat, guts the signature | Style-tile side-by-side at Wave 2 — before any page is built | Refuse at the aesthetic gate; 5-world tokens stay in git |
| Copy cut severs a load-bearing fact | Claims table diff pre/post per surface | Restore from the claims table; full-tree NEVER-sweep every copy commit |
| Reveal-infra deletion breaks a hidden dependent | Pre-delete dependents grep; console gate at 3 viewports | One-commit revert |
| Taste-lock stalls | Nothing after Wave 0 moves | That is the rule working, not failing; Wave 0 value already shipped; queue stays visible in RESUME.md |
| Redesign ships onto dead conversion paths | RESUME: lead-form notifications dead until the operator's ImprovMX/Gmail steps land | Named blocker for MEASURING the redesign; restate at every ship; not this plan's work |
| www serves a stale build post-deploy | `data-dpl-id` diff across both domains | CARD 1 double re-alias, every wave (LESSONS #5) |
| External review confabulates mid-arc | Any Cowork round without an evidence log | CARD 2 rules mandatory; findings without verbatim quotes are discarded (LESSONS #1) |
| Scope creep ("while I'm in here...") | Any edit not traceable to a wave's scope line | The deletion ledger + §10 are the contract; new ideas go to the RESUME queue, not the diff |
| Homepage repels audience A | A-persona cold read at Wave 7 | /playbook remains A's doorway; if A needs a homepage doorway, that is a small below-fold link and an operator call — not a register change |

---

## 10. OUT OF SCOPE

Email/DNS operator steps (tracked in RESUME — prerequisite for measurement, not for this
plan) · portrait + Ordani screenshots (operator artifacts D12; frames planned, content
out) · new case studies · blog/newsletter/CMS · SEO or paid campaigns · pricing changes ·
naming customers or prospects (LESSONS #3/#4) · inventing any metric · dark-mode toggle ·
Vercel dashboard www project-domain add (operator queue) · the Ordani product itself.

---

## 11. OPERATOR DECISION QUEUE (each with my recommendation attached)

- **D-R1** Hero sentence — pick/edit at taste-lock. Rec: §2 draft.
- **D-R2** Audience architecture — homepage aims at B, /playbook is A's door, C reads the
  spine. Rec: confirm; it is the only resolution that stops the site explaining itself
  three ways at once.
- **D-R3** Palette 5 worlds → 3 (retire petrol + saffron-as-world). Protect-list item, so
  argued explicitly: the shift is kept; only its vocabulary shrinks, and each remaining
  transition gets bigger. Rec: cut.
- **D-R4** Entrance reveals → zero. You have never actually seen them (defect + your OS
  setting); nobody else has either. The site has been shipping the no-reveal experience
  since launch — this decision merely makes it intentional. Rec: delete.
- **D-R5** Merge /services/ai-engineering into /services. Rec: merge.
- **D-R6** Motionless page as design baseline. Rec: yes.
- **D-R7** Per-wave deploy approvals — yours by standing rule; each ship request will
  quote this plan's wave and its evidence file.
