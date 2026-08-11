# Design-elevation session — boot handoff (v2, DISCUSS-FIRST)

You're picking up `micahjonesconsulting.com` for the DESIGN-ELEVATION arc. The Cowork design
review is DONE and on disk. Your job: confirm the harness, verify the review, then run a
DISCUSSION with the operator to lock the taste decisions — **you write no code until the
discussion closes.** Positioning/copy is settled and factually locked; this arc is visual craft.

## Project root — confirm FIRST

```
C:\Users\micah\Code\micahjonesconsulting
```

Confirm Claude Code opened HERE (not a parent, not birthflowV2). Wrong cwd → stop, tell the
operator to relaunch.

## Stage 0 — Boot ritual (harness confirmation)

1. Root `CLAUDE.md` + `.claude/CLAUDE.md` auto-load. Read `.claude/RESUME.md` (current state).
2. Read `docs/DESIGN_BAR.md` — the bar: exemplars, never-list, the R1–R20 rubric
   (load-bearing: R1, R4, R6, R12, R20). Every decision in this arc grades against it.
3. Read `docs/LESSONS_LEARNED.md` + `.claude/STANDING_TECHNIQUES.md`. You will actively use:
   LESSONS #1/CARD 3 (curl-verify review claims), LESSONS #3 (facts ledger — grep the
   NEVER-phrases before any copy commit), LESSONS #5/CARD 1 (every deploy re-aliases BOTH
   `micahjonesconsulting.vercel.app` AND `www.micahjonesconsulting.com`).
4. Confirm the premium-web plugin is live: agents design-director / motion-engineer /
   copy-editor / a11y-reviewer / perf-auditor / visual-qa; commands /premium audit, /premium
   ship; the hook set. Missing pieces → say so, don't improvise around a dead gate.
5. Report harness-confirmed in one short message, then go straight to Stage 1.

## Stage 1 — Read + spot-verify the review

Read `.planning/reviews/REVIEW-DESIGN-2026-08-10-COWORK.md` end-to-end. Verdict: 9/20,
capped at template tier by R1 (case pages run a second design system) + R6 (uniform card
grids); main surfaces explicitly praised. It is evidence-logged and method-noted — trustworthy,
but LESSONS #1 still applies. Spot-verify before planning (do not skip):
- The load-bearing claims: case pages actually load Inter + Source Serif 4 (check the source /
  computed styles); the uniform grids exist as described.
- Anything numeric you'll act on: 2–3 of the contrast ratios (e.g. the 2.01:1 greens on
  /work/hr-equity-author), the 13px card bodies, the marquee `infinite` animation.
- The two mobile bugs: /work/guardicore 401px canvas at 390; hero rotator clipping at 390.
- The duplicate-lede DOM claim on case pages.
Report the verify result (expected: near-all confirmed). Discard anything that doesn't
reproduce, with evidence.

## Stage 2 — DISCUSSION (mandatory gate; no edits until it closes)

Walk the operator through the decisions below via AskUserQuestion — max 3–4 questions per
round, each with a recommendation and a why. Where visuals help decide (they usually do here),
render tiny HTML/CSS mockups or annotated screenshots of the options BEFORE asking — taste
decisions made against pixels beat taste decisions made against prose. Capture every locked
answer in `.planning/reviews/DESIGN-DECISIONS-2026-08.md` (dated, operator-locked block).

**The agenda (pre-extracted from the review; add anything you find, drop nothing silently):**

1. **Hero rotating word** (P1-3): reviewer says static strongest word OR one-cycle-then-stop.
   The operator has liked this rotator across two prior rounds — do not assume the kill.
   Options: keep-but-fix-the-390-clip / one-cycle-then-stop / static. Recommend with reasoning.
2. **Marquee** (P1-3): static keyword rule vs scroll-linked advance vs delete. It's been on
   the site since Pass-21.
3. **Case-study template re-port** (P0-1): confirm direction (port to master system) and the
   sub-choices: does the dark ground stay (recolored to ink/cream/rust) or do case pages go
   warm? Do the serif drop caps die (reviewer says yes — operator may like them)?
4. **Grids → which shape** (P0-2): comparative spec table vs 1-weighted+3 composition for
   /services + /hire-me; AND which engagement shape gets the visual weight (= which he most
   wants to sell: embedded? fractional? advisory?). On the home engagements row: which card
   leads at 2× (Guardicore is the FIS-relevant one, but it's his call).
5. **CTA grammar** (P1-6): which action is THE primary per page (home especially: See the
   work vs Book a call). One filled pill per page; everything else underlined mono.
6. **Playbook pricing line** (P1-6/R17): "The first hundred buyers get it at $99" → reviewer
   calls it a scarcity device; the framing came from the operator's own pricing research.
   Reword to plain launch pricing, or keep deliberately?
7. **Flexport/Cuebiq/Postmates lines** (P1-9): attach ONE collective figure (operator must
   SUPPLY it — facts are locked, nothing invented) or cut the names. His call + his number.
8. **Signature gesture declaration** (P2-3): declare the scroll palette-shift THE gesture and
   extend one quiet instance to /about + /services; align case-page mark-draws to the
   hand-drawn family. Confirm direction.
9. **Nav IA** (P2-5): WORK → /work from subpages; do /services or /hire-me earn nav slots
   (≤5 total)?
10. **Artifact supply plan** (P2-1): what can he produce and when — Ordani screenshots (live
    product, no NDA — urgency #1), the portrait (/about), the redacted RFP-report screenshot,
    a Guardicore framework scan. This sets which P2-1 items are schedulable vs blocked.
11. **Type scale** (P1-1): present the proposed consolidated scale (mono-12 · body-17 ·
    lede-22 · h3-28 · h2-40/56 · display-92 + the reserved 230 Ordani moment) for sign-off —
    mostly mechanical, but it touches every page.

**Also honor the review's protect-list (never on the table):** the left-aligned one-sentence
hero, the scroll palette shifts, the hand-drawn marks, the copy voice ("Operator, not
consultant." / "Send the role. I'll send the receipts."), full reduced-motion stop, the
/hire-me numbered receipts block. Operator-locked from before: the "trillions in assets" line
stays unless HE says otherwise.

## Stage 3 — Plan and execute in waves (only after decisions are locked)

- Wave the work: **W1 = P0-1** (case template re-port — clears the tier cap's biggest half,
  plus the AA labels/R5/dedup riding along) · **W2 = P0-2** (grids, per the locked shape) ·
  **W3 = P1 batch** (scale, sizes/contrast, motion per decisions, mobile bugs, index curation,
  CTA grammar, footers, sticky-nav) · **W4 = P2 polish** (whatever's unblocked).
- Route through the agents: design-director for direction-level calls mid-build,
  motion-engineer for ANY motion change, copy-editor for any prose it touches.
- **The visual loop (non-negotiable, learned the hard way on a sibling project):** after each
  wave, screenshot the changed pages at 1440 + 390 (visual-qa / playwright / chrome-devtools)
  and SHOW the operator BEFORE shipping. Functional certification is not aesthetic
  certification — pixels get eyeballed by the human whose taste is the gate.
- Gate: `pnpm build` (copy-lint first) + `/premium audit` on UI-heavy waves. Definition of
  done in `.claude/CLAUDE.md` (Lighthouse ≥95 mobile, axe zero serious, reduced-motion).
- Ship per CARD 1 as ONE chained command: build → commit ("Pass-N:") → deploy → alias BOTH
  domains → push → marker-grep both domains.
- Rewrite `.claude/RESUME.md` after every wave; append lessons w/ gates as they're earned.

## First message back to the operator

Harness-confirmed report + Stage-1 verification result + Discussion Round 1 (the first 3–4
agenda questions, with visuals where they help). Nothing else. No edits before the discussion
closes.
