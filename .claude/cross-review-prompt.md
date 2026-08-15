# cross-review — reconciliation, rounds, stop rule

The edit-once source for how a cross-review round is run and closed. The Skill
(`.claude/skills/cross-review/SKILL.md`) covers procedure; this file covers what
happens to the findings. Do not duplicate either into the other — the upstream
harness rotted twice from exactly that.

## Project context handed to the external models

The script's `SHORT_INSTRUCTION` carries this; it is repeated here only so a
human editing the prompt knows what the models were told:

micahjonesconsulting.com — a Next.js 16.2.6 App Router marketing/portfolio site.
React 19.2.6, Tailwind v4 with CSS-first tokens in `app/globals.css` (no JS
config), MDX case studies, GSAP quarantined to `components/TitleCard.tsx`, Lenis
smooth scroll mounted at ROOT, a Resend contact route, deployed on Vercel behind
TWO domains. **No auth, no database, no payments, no PHI** — models that assume
otherwise are hallucinating from a template and their findings should be refuted
on that basis.

## MODE: plan — what the external legs should hunt

- Decisions that contradict the constitution (`.claude/CLAUDE.md`): a second
  accent colour, a second signature motion, monospace-as-body, a mode toggle.
- Token or palette changes that break WCAG AA in ANY `data-mode` world. The
  palette shifts on scroll, so a colour that passes in one world can fail two
  sections later.
- Added client JS, a new font, or a new font axis — each one is measured against
  the shipped Lighthouse floor (see `.planning/reviews/DESIGN-DECISIONS-2026-08.md`
  D14: three typefaces are the accepted cost, ~92-93 mobile is the floor).
- Copy claims not supported by the LESSONS #3 facts ledger.
- Any surface that will need a live-domain marker check at ship time but has no
  marker defined.

## MODE: diff — what the external legs should hunt

- **Server/Client boundary errors** — function props crossing the boundary break
  SSG and are invisible to both `tsc` and lint. Highest-value class here.
- Correctness bugs, dead conditionals, off-by-one, unhandled null.
- **RSC entity-space regressions** (LESSONS #6): a space before an HTML entity
  after an inline element gets dropped in the built output.
- **Stacking-context / blend traps** (LESSONS #7): `mix-blend-mode` only blends
  within its nearest stacking context, and `getComputedStyle` cannot see it.
- a11y on changed UI — labels, contrast, focus, keyboard, heading order.
- Core Web Vitals: added JS, blocking fonts, layout shift, an above-the-fold
  image left lazy.
- Banned words and the em-dash cap (`.claude/brand.json`), metadata/OG/robots
  drift, `next/image` and font-loading regressions.
- **Anything the diff CLAIMS to do but does not.** Commit messages in this repo
  assert measurements; check them against the diff.

## Reconciliation

- **Agreement across legs = high-confidence must-fix.** It raises priority; it
  does NOT skip premise verification (see the Skill's disposition protocol).
- **Disagreement = surface to the operator with both views**, not a silent pick.
- **Round 1 fast path:** if every leg returns PASS with no block-class finding,
  close at one round. Do not manufacture rounds.
- **Re-review after every fix pass.** A fix pass is a first-class review subject:
  it is new code written under time pressure, and it is where regressions breed.
  Re-diff and re-run rather than assuming the fix was clean.
- **Stop rule:** close when a round produces no new CONFIRMED block-class
  finding. If two consecutive rounds keep adopting findings on the same page or
  component, stop reviewing and re-plan that surface — the problem is the design,
  not the diff.
- **Never rely on any leg as the sole cold-reader of text it approved in a prior
  round.** An incumbent leg reads its own prior approval as context.

## Cost

Zero ambient — nothing runs unless invoked. Per invocation: Codex rides the
existing ChatGPT plan; Gemini meters a Google AI Studio project; GLM is pay-go
on the Z.ai balance. Roughly cents per round, but it is real spend on an
operator-owned account, so it is invoked deliberately, not on every commit.
