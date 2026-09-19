# House Lights — project memory

This project uses the **premium-web** Claude Code plugin (installed at `~/Code/premium-web-harness`). Read `.claude/brand.json` before making any UI decision.

## Pass-122 amendment — the rules on trial (operator 2026-09-18)
The operator rejected Pass-121 on sight and put the design rules below on trial; he ruled on each by
popup for the **Kinetic Editorial** direction (LESSONS #3 "PASS-122 DIRECTION AND THE DEMO PIECE" and
"PASS-122 RULES ON TRIAL"; `docs/DESIGN_BAR.md` R1, R4, R9, R12, R13, R15 carry the dated rulings).
Where a section below says otherwise, THIS amendment wins:
- **SCOPE (operator 2026-09-18, same day, LESSONS #3 "PASS-122 SCOPE"):** "i didnt want to change the
  entire site. I wanted to take the best themes from these designs and incoporate them in our existing
  theme." The existing theme stays (structure, pages, Color Worlds home, cream/ink/copper, Bricolage,
  Hanken, Mono labels). Kinetic Editorial is a source of themes; the rulings below are permissions used
  INSIDE that theme. The display-face test is withdrawn; the style-tile palette is not adopted.
- **Motion:** the one-signature limit and the 400ms entrance cap are lifted for scroll-driven type: type
  and numbers may move with the scroll, a section may hold while its number assembles. Still banned:
  cursor followers, scroll that changes speed, marquees, idle loops. Reduced motion gets the finished frame.
- **Counters:** one hero number per page or section may assemble once; the number is in the server HTML.
- **Colour:** poster grounds, one full-bleed ground per section, ONE accent per screen, drawn from the
  EXISTING palette (scope ruling). No gradients, purple or glow.
- **Type:** Bricolage stays (the face test was withdrawn by the scope ruling); Hanken body, Mono labels.
- **Imagery:** real photos, screen recordings, charts of real numbers, and animated versions of the
  operator's own real working photos (no captions). Still out: stock, AI illustration, icons, 3D scenes.
  The 2026-09-18 hold on box-and-arrow diagrams of the work stands.
- **Logos and quotes:** allowed only if real, each approved and ledgered before it renders.
- **Not on trial:** facts, copy, voice rules, the banned list, the em-dash cap.
- **Enforcement still to move:** `brand.json.palette` (the design-tokens allow-list) when the palette is
  picked; `scripts/gsap-quarantine-gate.mjs` only if the build brief picks GSAP over CSS scroll-driven
  animation. The plugin hooks (`motion-discipline.sh`, `design-tokens.sh`) already ban only what stays banned.

## Two modes
- Foyer pages (`app/(foyer)/`) — paper `--color-foyer-paper #F5EFE4`, ink `#1A1816`. Hospitality feel. Home / About / Work With Me / Contact / Work index.
- Theater pages (`app/(theater)/`) — `/work/[slug]` case studies. Each opens on a dark band (`--color-theater-ground #12100E`, type in `--color-theater-ink #ECE3D0`) that names the client and the result, then turns on one copper rule (sage on `/work/ordani`) to bone paper `#ECE3D0` (`--color-cw-bone`) for the body and the footer. Pass-120; the earlier all-obsidian study is retired.
- Mode is route-determined. NO `useTheme()`, NO `<ThemeProvider>`, NO toggle. Group layouts stamp `data-mode="foyer"` or `data-mode="theater"` on a wrapper `<div>`; Tailwind v4 reads the attribute via `[data-mode="..."]` selectors in `app/globals.css`.

## One accent
Copper `#C8542B`. Used everywhere across both modes. One exception: `ordani.sage #5E7158` inside `/work/ordani` only.

**CRITICAL — WCAG AA rule (Pitfall B1):**
- `--accent-copper #C8542B` on `--foyer-paper #F5EFE4` is 3.85:1 → FAILS WCAG AA for normal body text.
- Use `--accent-copper-deep #8E3A1E` (5.4:1, PASS) for body-text emphasis and foyer body link color.
- Plain `--accent-copper` is fine for large text (≥24px), headlines, UI components (buttons, focus rings, dividers), and decorative underlines.

The `design-tokens.sh` hook warns on any other hex literal.

## One signature motion
`<TitleCard />`: a 600ms settle entrance on the case-study hero, which names the client and the result. Foyer↔theater View Transition (Phase 2): a 900ms dim. NOTHING ELSE pins, sticks, parallax-scrolls, or follows the cursor without the `motion-engineer` agent's written approval.

**SUPERSEDED (Pass-122, operator 2026-09-18, LESSONS #3 "PASS-122 RECEIPTS V2 LOCKED" and "PASS-122 PUSH APPROVED, WITH FIXES"): two figure animations are now mounted, both inside the existing theme: the home receipts section ($20M+ with the Tel Aviv clip inside the numerals once, then a copper settle; the four exits as a scroll-driven scoreboard) and the /work study figures (each copper poster assembles once, weight 200 to 800). Read the two paragraphs below as history.** **No figure animation is mounted.** The one that existed, `<WallChart />` in the `/playbook` hero, left with the book in Pass-112 (operator 2026-09-11: the book is not shown on the site yet). `motion.figure` in `brand.json` stays as the record of the 2026-09-01 approval. A new animated figure is the second-signature line; the answer there is no.

**RETIRED (Pass-122, operator 2026-09-18, LESSONS #3 "PASS-122 RECEIPTS V2 LOCKED" and "PASS-122 PUSH APPROVED, WITH FIXES"): the count-up and its hand circle are gone; the clip arrival replaced them.** **One recorded count-up exception** (`motion.countup` in `brand.json`): the home `$20M+` figure counts once and its circle draws in after it, 2.65s total, on `/` only, skipped under reduced motion, finished frame without JS. Operator override of R13 and R15 on 2026-09-11 (decision 4), against the harness's recommendation to keep it static. It is not a second signature and not a precedent; the motion-engineer's standing answer to any further animated figure or counter remains no.

`motion-discipline.sh` blocks cursor followers, scroll-jacking, marquees, mono aesthetic, and (Phase 1 addition) `syncTouch: true` on Lenis.

## Model routing — reset 2026-09-04
Operator ruling, 2026-09-04, verbatim: "leave the main model on fable 5.1 ultracode but us
opus as subagents for majority of the work ... having fable guide all other models doing the
grunt work."

So: **Fable 5.1 is the main model and stays there.** It rules, writes briefs, and judges at
the named checkpoints. It does not run build, deploy, playwright or screenshot loops.
**Opus was the default subagent** (`CLAUDE_CODE_SUBAGENT_MODEL=opus` in
`.claude/settings.json` until 2026-09-11; it is `sonnet` now, see the last amendment) and did the majority of the
work: execution briefs, verification, sweeps, research legs. Still name `model:` on every
Agent and Workflow call: `opus` for execution and verification, `sonnet`/`haiku` only for
trivial lookups, `fable` never from a subagent (the main model IS Fable; fan-out inheriting
Fable is what ended the 5-hour window). What Fable caught on this repo and why it stays on
top: the services-page rebuild, the popularity-badge claim, the title-card timing bug.

Full policy: `C:/Users/micah/.claude/MODEL_ROUTING.md`. The arc shape below is unchanged.

**Amended 2026-09-07 — the executor tier (operator: "this consuming our usage at a fast
rate … I got a z.ai account to use their frontier model to do some grunt work … And maybe
Sonnet 5 too. But we need to produce at a fable 5.1 ultracode level").** Four tiers now:
1. **Fable 5.1 (this session):** rulings, briefs, the JUDGE look at named checkpoints. It
   does not run build/verify/screenshot loops and does not read whole transcripts.
2. **GLM executor (a second Claude Code process via `scripts/claude-glm.ps1`, z.ai Coding
   Plan):** executes `.claude/briefs/*.md` verbatim: builds, fix rounds, verify scripts,
   encodes, screenshots, polish. Its usage is z.ai's quota, not this one. It never rules.
3. **Opus (subagent, in-session):** only where taste or judgement inside execution matters
   and the executor is not running: design-critique legs, the first port of a new pattern.
4. **Sonnet 5 / Haiku (subagents, in-session):** research legs, lookups, mechanical
   verifiers that re-measure a spec. Every Workflow verify/measure leg names `sonnet`
   unless the leg has to look at screenshots as a juror (then `opus`).
Secrets: the z.ai key lives in the user env var `ZAI_CODING_KEY`, set by the operator in
his own shell; it never appears in a chat, a settings file, or a commit. The cross-review
REST leg keeps its own pay-as-you-go key (`GLM_API_KEY`/`ZAI_API_KEY`, or the gitignored
`.claude/.zai-key`) because the Coding Plan's usage policy forbids scripted calls.

**Amended 2026-09-07, same day — three executors and a juror (MODEL_ROUTING §8).** The
operator added ChatGPT Pro (5× Codex usage, weekly reset). Routing: **Codex / gpt-6-astra**
is THE JUROR for every design and copy checkpoint (images attached, `scripts/codex-exec.ps1
-Review`) and the second executor for briefs needing judgement inside execution (`-Brief`,
xhigh); **GLM 5.3** (z.ai Coding Plan, `scripts/claude-glm.ps1`, key = the account's
existing `~/.claude/.zai-key`) runs the mechanical rounds AND the reader/drafter legs;
**Sonnet** is the default in-session leg; **Opus** only when no executor is running;
**Fable** rules, briefs, judges. Spend Codex: its quota resets weekly. (Kimi was named and
withdrawn the same day — the operator had confused it with GLM.)

**Amended 2026-09-08 — Astra is rationed (MODEL_ROUTING §9).** Operator, verbatim: "lots of
sol and only altra for qualty gates. altra is only top tier model we have - fable gone for few
days. we are at 29% chatgpt usage and 6 dayd till reset". So: Astra judges, it does not execute;
a long `codex exec` run of a brief is forbidden while the quota is shared. GLM 5.3 executes
briefs, Sonnet does the measuring and verifying, Opus rules and briefs in Fable's absence.

**Amended 2026-09-11: Claude usage is the bucket to conserve (MODEL_ROUTING §9d).** Operator,
verbatim: "Biggest thing is making sure we dont burn thru usage on this account while still
leveraging fable and opus in critical areas. the other Ais especially glm 5.3 will be very
helpful in this." So: GLM 5.3 executes; Sol (`gpt-5.6-sol`, ChatGPT) drafts, and executes when
GLM is capped; Astra judges at quality gates; Fable or Opus rule only on critical calls (design
direction, copy rulings, briefs, the final judge look, money, public claims, production). The
subagent default is now `sonnet`. A new chat starts from `.planning/handoff/NEXT-SESSION-KICKOFF.md`.

**Amended 2026-09-11, evening: two vendors, two tiers each (MODEL_ROUTING §9e).** Operator,
verbatim: "Use claude models and chatgpt. Lower models do grunt work frontier top models of
each make sure we are deliovering quality. Make sure to really not use too much fable". So:
Sonnet (Claude) and Sol (ChatGPT) do the grunt work: executing briefs, fix rounds, builds,
gates, captures, research, commits. Opus and Astra hold the quality gates: briefs, rulings,
the judge look, design and copy verdicts. Fable is reserved for the rare ruling Opus should
not make alone. GLM is overflow, not the default. Every Agent leg names `model: "sonnet"`.

**Amended 2026-09-16: Fable at the gates, never the main driver.** Operator, verbatim: "i dont
want to pick fableas main driver for useage . we are at a good amount right now our resent is
1am sat and fable is at 52 while week is 64 . just want to make sure that is helping with
planning and quality gates." So: the main session runs on Opus 5. Fable is called as a named
subagent (`model: "fable"`) at the planning and quality gates a kickoff or brief names (picking
a direction, judging mocks or a preview, reading a brief before it commits), one call per gate
with a written input file. Research, capture and measuring legs stay on Sonnet.

**Amended 2026-09-18, evening: more Fable when its bucket has room.** Operator, verbatim: "feel free
to use more of fable. look at usage and usage reset time for fable". So: before choosing a tier, read the
plan limits (`mcp__ccd_session_mgmt__get_usage`: 5-hour, weekly all models, weekly Fable, reset times).
Fable takes the taste and judgement legs (design and copy verdicts, the first design of a surface, briefs,
buyer reads) while its weekly bucket has headroom; builds, captures and measuring stay on Sonnet. The
weekly ALL-MODELS bucket binds first (at the time of this note: 87% used, Fable 61%, both resetting
2026-09-19 00:59 PDT), and every Fable call draws on it too.

**Amended 2026-09-19: the week's routing tiers (new usage week).** Operator, verbatim: "I want to
really implement the AI routing tier to conserve usage this week. Right now chatgpt weekly usage is reset
in 4 hours, and glm is at 74% for the week. So we can use glm and claude for now - using the best models to
ensure quality in design and writing and the cheaper models to do the grunt work." So, until he changes it:
- **Quality tier (design and writing):** Fable (`model: "fable"`, one call per gate with a written input
  file) designs a new surface, drafts or rules on copy, reads briefs, and does the judge and buyer reads.
  Astra (ChatGPT, `scripts/codex-exec.ps1 -Review`, images attached) is the independent juror at design and
  copy checkpoints once ChatGPT resets (2026-09-19 12:17 PDT). The main session runs on Opus 5: it rules,
  briefs, verifies and commits, and does not run build or capture loops.
- **Grunt tier:** GLM 5.3 (`scripts/claude-glm.ps1 -Batch -PromptFile`, prompt on stdin, smoke-test first,
  small runs; LESSONS #36) runs finished briefs, fix rounds, builds, captures and measuring scripts.
  Sonnet subagents (`model: "sonnet"`) take grunt work when GLM is capped or a leg needs in-session tools.
  The main session opens every capture itself (LESSONS #36, #37).
- **Pacing:** read `mcp__ccd_session_mgmt__get_usage` at session start and before every fan-out, and name
  the bucket in one line before launching. Claude weekly all-models is the bucket that stops everything; the
  2026-09-19 week started at 0% (Fable 0%), resetting 2026-09-26 01:00 PDT.

**Amended 2026-09-19, afternoon: ChatGPT is back, tiered (GLM capped).** Operator, verbatim: "think
chatgpt is back so we can use the,. still use it in a tiered way - astra for quality and the lower models for
grunt work. Mix in some of claude too". So, alongside the morning tiers: **Sol** (`gpt-5.6-sol`, via
`scripts/codex-exec.ps1 -Task <promptfile>`, workspace-write, no commits) takes grunt runs -- builds, capture
and measuring scripts, fix rounds -- especially while GLM 5.3 is capped (it hit its z.ai 5-hour limit
2026-09-19 ~13:20 PDT, reset ~21:20 PDT). **Astra** (`gpt-6-astra`, `-Review`, images attached) stays the
independent juror at design and copy checkpoints only. **Sonnet** subagents take in-session grunt legs.
Opus (this session) rules, briefs, verifies and commits; Fable takes the taste gates. Every leg still names
its model, and `get_usage` runs before every Claude fan-out.

**Arc shape (MODEL_ROUTING §6).** A top tier's value is the ruling, not the loop that
implements it. An audit of the 2026-09-01 Fable session found 9 of 320 turns were decisions
no command could settle; the other 311 were execution. So a Fable segment ends by writing
`.claude/briefs/<pass>-<slug>.md` and committing it, not by starting the build. See
`.claude/briefs/README.md` for the required contents. Budget: 15 top-tier tool calls per arc,
read-only shell free, no build/deploy/screenshot loops. Three checkpoints bring Fable back
per page arc: first preview at 390 and 1440, copy checked against the LESSONS #3 ledger by
`curl -s | grep` rather than screenshot, and one buyer read at the ship gate.

## Stack
- Next.js 16.2.6 (App Router, `experimental.viewTransition: true`, Turbopack)
- React 19.2.6 — `ViewTransition` is imported from `react`, NOT from `next`
- TypeScript strict (including `noUncheckedIndexedAccess`)
- Tailwind CSS v4 — CSS-first `@theme` block in `app/globals.css`; NO `tailwind.config.ts`
- `@tailwindcss/postcss` is a SEPARATE package from `tailwindcss` in v4 — both required
- `next/font/google` — three faces, the Color Worlds system (Pass-37): Bricolage Grotesque (display, `opsz`), Hanken Grotesk (body), JetBrains Mono (labels, § codes, data — the DESIGN_BAR R1 "narrow third" only, never body or headings). `lib/fonts.ts` is the source of truth. Inter and Source Serif 4 are gone; do not reintroduce them. (Prose corrected 2026-09-04 to match live code.)
- MDX via `@next/mdx`; `mdx-components.tsx` MUST live at REPO ROOT, not inside `app/`
- GSAP 3.15 (free as of 2025) — one importer, `components/color-worlds/SplitReveal.tsx`, the recorded Pass-111a exception. `components/TitleCard.tsx` imports no GSAP since Pass-120: the settle entrance is CSS (`cs-settle` in `app/globals.css`). No other file may import `gsap`; `scripts/gsap-quarantine-gate.mjs` enforces it. Pitfall C1 still applies to SplitReveal: `'use client'` + the `useGSAP` hook.
- Lenis 1.3 via `lenis/react` subpath at ROOT layout — NOT in group layouts. `syncTouch: false` is locked (Pitfall D2)
- Resend for transactional contact email
- Supabase for contact archive insert ONLY — server-side service-role key, no client SDK
- Vercel hosting + Analytics + Speed Insights (cookieless, no consent banner needed)

## What not to do
- Do not use monospace for anything beyond labels, § codes and data. JetBrains Mono is the cleared R1 "narrow third" (`app/layout.tsx`, Pass-37). Mono body copy, mono headings, or a terminal aesthetic remain banned; `motion-discipline.sh` + `brand.json.motion.banned` enforce that. (Prose corrected 2026-09-04; an external review called the font a violation, and it is not.)
- Do not introduce a second accent color. `design-tokens.sh` warns on off-palette hex.
- Do not introduce a second signature motion. `motion-engineer` agent refuses.
- Do not add Framer Motion. Component-level enter/exit uses CSS transitions + `:hover` via Tailwind utilities.
- Do not install `@studio-freight/react-lenis` — retired package. Install `lenis` and import from `lenis/react`.
- Do not set `syncTouch: true` on Lenis — iOS gets native momentum, which is correct.
- Do not import `gsap` anywhere. The one importer is `components/color-worlds/SplitReveal.tsx`, a recorded exception (Pass-111a), not a precedent; `components/TitleCard.tsx` gave up its import in Pass-120. Enforced by `scripts/gsap-quarantine-gate.mjs`, whose allow-list names SplitReveal only.
- Do not write `tailwind.config.ts` — v4 has no JS config.
- Do not put `mdx-components.tsx` inside `app/` — silent render failure.
- Do not add `noindex` to `/work/ordani` "out of abundance of caution" (Pitfall E3). `robots.txt` deliberately allows ALL crawlers including the AI bots — `app/robots.ts` reasons it in its header — so do not "fix" it to block them without an operator ruling. (Prose corrected 2026-09-04 to match live code; the block it used to describe never shipped.)
- Do not add a dark mode toggle, `next-themes`, or any user-facing mode switcher. Mode is route-based.
- Do not add `/now`, `/uses`, `/colophon`, decision log, BART status, or any other dev-Twitter tell (blueprint §13).
- Do not add a client logo wall, "trusted by" bar, newsletter signup in nav, Calendly link in first volley, or budget dropdown on contact form.
- Do not use stock photography, illustration, icon kits, or 3D. Type and photographs/screenshots only.

## Content
- `content/work/*.mdx` — case studies. Frontmatter is validated by the Zod schema in `lib/case-study-schema.ts` and by the harness hook `mdx-frontmatter.sh`, which requires `title`, `dek`, `status`. Published studies require `title`, `titleLines`, `description`, `dek`, `client`, `clientNameProtected`, `atAGlance`, `results`, `entry`, `service`, `publishedAt`, `status`, `order`, `hero?`. Stubs (`status: stub`) carry `title`, `dek`, `status` only.
- `content/citations.ts` — locked sources. ORDANI's CDC maternal-mortality figures render from `ORDANI_CDC_2024.FIGURES` in this file, NOT as literals in prose (Pitfall E2).
- `content/site.ts` — global copy (nav labels, footer copy, positioning sentence).

## Voice
- First person (`I`, never `we` if it's just Micah).
- ≤25 words per sentence on average.
- Specific named numbers (`$150K`, `14 practices`, `91% intake completion`) — never "significant impact."
- Em-dashes capped at one per page (em-dashes are an AI tell).
- 30-word banned list in `.claude/brand.json.voice.banned`. The `copy-lint.sh` hook (write boundary) + `lib/copy-lint.ts` build-time scanner (in `instrumentation.ts`) both reject these. Build fails with `file:line:column` on any finding.

### Enforcement (Phase 2)

The voice rules above are enforced in two layers:

**Automated (Phase 2 — `lib/copy-lint-runner.ts` + `instrumentation.ts`):**
- 30 banned words rejected at `pnpm build` with `file:line:column` reporting.
- Scope: `content/**/*.{mdx,md,ts}` and `app/**/*.{tsx,ts}`.
- Gated to `NEXT_PHASE === 'phase-production-build'` — does NOT run on `next dev`.
- Plus the write-boundary `copy-lint.sh` harness hook catches violations on save.

**Manual subagent (every prose-touching PR — `copy-editor` subagent):**
- **COPY-04** Sentence length cap: average ≤25 words. Sentences over 35 words rewritten.
- **COPY-04** First person locked: `I`, `me`, `my`. The word `we` rejected unless plural truly applies (rare — Micah is solo).
- **COPY-04** Active voice required. Passive constructions ("was built", "is being shipped") rewritten unless documenting outcomes ("Acquired by Salesforce for $27.7 billion" stays passive — that's a fact, not voice).
- **COPY-04** Named numbers required. `$150K`, `14 practices`, `91% intake completion` — never "significant impact", "meaningful results", "growth metrics."
- **COPY-05** Em-dashes capped at ONE per page. Em-dashes (—) are an AI tell. The copy-editor subagent counts `—` occurrences per file; >1 triggers a rewrite request unless the writer can defend each one.

The `copy-editor` subagent runs on every PR that touches `content/**/*.mdx`, `app/**/*.tsx` containing visible prose, or `.claude/CLAUDE.md`. It does not run on code-only PRs (component logic, config, types).

**Subagent invocation:** `/premium audit` triggers the copy-editor pass alongside the design-director, motion-engineer, perf-auditor, a11y-reviewer, case-study-writer, and visual-qa subagents. The audit gate blocks production deploy on copy-editor failure.

## Portrait swap (when real photos arrive)

`components/PortraitImage.tsx` is mounted on `/about` and renders NOTHING until a
real file exists. The operator flow is a file drop plus a build:

1. Save the portrait as `public/portrait-context.jpg` (or `.jpeg`/`.png` — all
   three are checked). 2x retina, 4:5 vertical, ~900x1125 or larger. Keep the
   source under 500KB by convention; nothing enforces it in this repo (the
   `image-budget.sh` hook is unwired). Pass-59 correction: `.claude/settings.json`
   DOES exist — it carries the playbook check.py PostToolUse hook plus this
   project's permission rules. It just never wired image-budget.sh.
2. `pnpm build` — the two-column `/about` intro activates automatically (the CSS
   uses `:has(.cw-portrait)`, so no portrait means no layout change).
3. Ship per STANDING_TECHNIQUES CARD 1.

`portrait-main.jpg` is a reserved second variant that is NOT mounted on any page
yet — mount it somewhere before dropping that file in. See `public/README.md`.

Rewritten 2026-08-15. What changed and why:
- The component previously had NO importer at all, so the documented drop-in flow
  would have done nothing. It is now actually wired.
- The placeholder branch (a large "MJ" monogram poster standing in for a face) was
  deleted along with `scripts/generate-placeholders.mjs` and the two placeholder
  PNGs. A stand-in for a human face on the page where a buyer looks for the human
  reads as unfinished; an empty column is the more honest interim state.

## Definition of done
A page is done when:
1. The signature interactions hold (TitleCard settle entrance 600ms, foyer↔theater dim 900ms ease-in-out).
2. Lighthouse Performance ≥ 95 on mobile; LCP ≤ 1800ms; INP ≤ 200ms; CLS ≤ 0.05.
3. Zero serious/critical axe violations (`a11y-baseline.sh` passes).
4. The foyer-to-theater transition is visible in DevTools Performance panel as a single browser View Transition.
5. Zero banned words across MDX prose, frontmatter, component prop strings, and `metadata` exports.
6. `prefers-reduced-motion: reduce` is honored on TitleCard, View Transitions, Lenis, pull-quote underline-grow, and hover lifts.
7. `prettier --check` passes.

## How to ask for things
- "Make me a foyer page" → the `house-lights-direction` skill fires from the harness.
- "Draft a case study for X" → `/premium case-study x` → `case-study-writer` agent.
- "Audit the build" → `/premium audit`.
- "Ship it" → `/premium ship`.
