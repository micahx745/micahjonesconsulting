---
phase: 02-root-layout-lenis-transitions
plan: E
type: execute
wave: 1
depends_on: []
files_modified:
  - .claude/CLAUDE.md
autonomous: true
requirements:
  - COPY-04
  - COPY-05
must_haves:
  truths:
    - ".claude/CLAUDE.md contains explicit subagent-policy text stating that ≤25-word sentences, first person, active voice, and named numbers are enforced by the copy-editor subagent on every prose-touching PR (COPY-04)."
    - ".claude/CLAUDE.md contains explicit policy stating em-dashes are capped at one per page; the copy-editor subagent rejects PRs with >1 em-dash per file (COPY-05)."
    - "The Voice section of CLAUDE.md is augmented but NOT replaced — Phase 1 wrote the base content, this plan adds a concrete 'Enforcement' subsection."
    - "No code is added — this is pure policy documentation. The voice rules are subagent-enforced, not mechanically-checked (per RESEARCH.md COPY-04/05 row 'OUT OF SCOPE for code')."
  artifacts:
    - path: ".claude/CLAUDE.md"
      provides: "Phase 2 copy-discipline policy reinforcement (COPY-04 + COPY-05 subagent enforcement contract)"
      contains: "copy-editor"
  key_links:
    - from: ".claude/CLAUDE.md Voice section"
      to: "copy-editor subagent expectations"
      via: "added Enforcement subsection"
      pattern: "copy-editor.*subagent"
---

<objective>
Augment `.claude/CLAUDE.md` to document the manual-enforcement contract for COPY-04 (voice rules) and COPY-05 (em-dash cap). These two requirements are explicitly OUT OF SCOPE for code per the orchestrator prompt and RESEARCH.md — they live as policy enforced by the `copy-editor` subagent on every prose-touching PR. Phase 2 owns the documentation layer.

Purpose: REQ COPY-04 (voice rules enforced manually by copy-editor subagent: ≤25-word sentences, first person, active voice, named numbers) + COPY-05 (em-dashes capped at one per page).

Output: A concrete "Enforcement" subsection within the Voice section of CLAUDE.md that the copy-editor subagent will read before every prose review. The mechanically-enforced layer (COPY-01..03) is delivered by Plan 02-D. This plan delivers the policy-layer guardrails.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/02-root-layout-lenis-transitions/02-RESEARCH.md
@.claude/CLAUDE.md

**Why this is a documentation plan, not a code plan:**
RESEARCH.md's `<phase_requirements>` table explicitly notes:
- COPY-04: "OUT OF SCOPE for code — this is subagent behavior, not a Phase 2 file. Documented in RESEARCH.md so planner doesn't task it."
- COPY-05: "OUT OF SCOPE for code in Phase 2 — could be added to copy-lint.ts as a per-file count check, but the prompt indicates this is also subagent-enforced. Recommended: add a `countEmDashes(text) → number` helper to `lib/copy-lint.ts` and call from instrumentation.ts with a warn (not fail) when count > 1. Treat as nice-to-have."

The wave_strategy in the orchestrator prompt explicitly states: "COPY-04 (voice rules manually enforced by copy-editor subagent) and COPY-05 (em-dashes cap) are POLICY items, not code — they live in CLAUDE.md (Phase 1 wrote those rules) and are enforced via the copy-editor subagent on every prose-touching PR. Phase 2 only delivers the automated layer (COPY-01..03). Map COPY-04 and COPY-05 to Plan G (which updates CLAUDE.md to reinforce them) or to a small documentation plan."

I'm choosing the "small documentation plan" option (this plan) because Plan G is a verification plan and shouldn't be conflated with policy documentation.

**Phase 1 CLAUDE.md status:**
The current CLAUDE.md (verified — see lines 60-65) already has a Voice section with:
- First person, never "we" if it's just Micah.
- ≤25 words per sentence on average.
- Named numbers, never "significant impact."
- Em-dashes capped at one per page (em-dashes are an AI tell).
- 30-word banned list in `.claude/brand.json.voice.banned` — both copy-lint.sh (write boundary) and lib/copy-lint.ts (build-time) reject.

So Phase 1 wrote the RULES. Phase 2 adds the ENFORCEMENT contract — i.e., the documentation that says "when these are violated, the copy-editor subagent rejects the PR."

**Why augment, not replace:**
Phase 1's content is correct and the file is project memory used by every Claude Code session. Replacing the Voice section would lose Phase 1 context. Augmenting with an "Enforcement" subsection is additive and signals the new layer.

**What this plan does NOT do:**
- Does NOT add the optional `countEmDashes(text)` helper to `lib/copy-lint.ts` — orchestrator prompt + RESEARCH.md both treat it as nice-to-have, subagent-enforced. Phase 2 stays tight on scope.
- Does NOT wire any new code path.
- Does NOT modify other CLAUDE.md sections.

**Harness hook awareness:**
- This file (`.claude/CLAUDE.md`) is NOT in the copy-lint scanner's SCAN_TARGETS (which scans only `content/**` and `app/**`). So banned words in this file would not trip the build-time scanner. The write-boundary `copy-lint.sh` hook MAY scan `.claude/CLAUDE.md` — verify against the harness brand.json before commit. Phase 1 already wrote prose in this file; if any new entries this plan adds collide with banned words, rewrite.
- The phrase "copy-editor" is a subagent identifier, not a banned word. Verified.
- The strings "voice rules", "first person", "active voice", "named numbers", "em-dash" are not banned.

<interfaces>
Phase 1 CLAUDE.md Voice section (current, to be augmented):
```markdown
## Voice
- First person (`I`, never `we` if it's just Micah).
- ≤25 words per sentence on average.
- Specific named numbers (`$150K`, `14 practices`, `91% intake completion`) — never "significant impact."
- Em-dashes capped at one per page (em-dashes are an AI tell).
- 30-word banned list in `.claude/brand.json.voice.banned`. The `copy-lint.sh` hook (write boundary) + `lib/copy-lint.ts` build-time scanner (in `instrumentation.ts`) both reject these. Build fails with `file:line:column` on any finding.
```

Phase 2 adds an "Enforcement" subsection AFTER the existing five bullets.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task E1: Add Enforcement subsection to .claude/CLAUDE.md Voice section</name>
  <files>.claude/CLAUDE.md</files>
  <action>
Edit `.claude/CLAUDE.md`. Find the existing `## Voice` section (currently around lines 60-65 — read the file to confirm exact location before editing). The section currently ends with the bullet about the 30-word banned list and the build-time scanner.

INSERT the following new content immediately AFTER the existing bullets in the Voice section, BEFORE the next `##` heading (which should be `## Definition of done`):

```markdown

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
```

IMPORTANT — what must NOT change:
- Do NOT replace the existing five bullets in the Voice section — they're Phase 1's contract and remain accurate.
- Do NOT modify any other section of CLAUDE.md (## Two modes, ## One accent, ## One signature motion, ## Stack, ## What not to do, ## Content, ## Definition of done, ## How to ask for things).
- Do NOT add the new `### Enforcement (Phase 2)` heading before the existing bullets — it goes AFTER them.
- The new content uses level-3 heading (`###`) so it nests under the existing `## Voice` (level-2) section.
- Verify the inserted content contains zero banned words from `lib/banned.ts`. The strings used here (`Enforcement`, `Automated`, `Manual subagent`, `prose-touching PR`, `Sentence length cap`, `passive constructions`, `Em-dashes`, etc.) are all safe.
- `"meaningful results"` and `"growth metrics"` appear inside a quoted negative example (showing what is REJECTED) — this is intentional and not a banned-word violation. The banned list contains `make an impact`, `move the needle` etc. — not `meaningful` or `growth`.
- Confirm by running the regex `grep -iE "(unlock|drive|leverage|elevate|synergy|transformative|game-changing|best-in-class|at the intersection of|seamless|cutting-edge|revolutionary|world-class|next-generation|holistic|robust|innovative|dive deep|circle back|low-hanging fruit|move the needle|make an impact|delight users|craft experiences|passionate about|obsessed with|journey|solutions|empower)" .claude/CLAUDE.md` after the edit — count should match pre-edit count (anything matched should be in negative-example quotes).
  </action>
  <verify>
    <automated>cd /c/Users/micah/Code/micahjonesconsulting && grep -q "### Enforcement (Phase 2)" .claude/CLAUDE.md && grep -q "copy-editor" .claude/CLAUDE.md && grep -q "Em-dashes capped" .claude/CLAUDE.md && grep -q "COPY-04" .claude/CLAUDE.md && grep -q "COPY-05" .claude/CLAUDE.md && grep -q "First person" .claude/CLAUDE.md && grep -q "Sentence length" .claude/CLAUDE.md</automated>
  </verify>
  <done>
- `.claude/CLAUDE.md` Voice section contains both the original five Phase 1 bullets AND the new `### Enforcement (Phase 2)` subsection.
- The Enforcement subsection references COPY-04 and COPY-05 by their REQ-IDs.
- The Enforcement subsection names the `copy-editor` subagent as the manual enforcer.
- The two layers (automated build-time + manual subagent) are clearly distinguished.
- Other CLAUDE.md sections are byte-identical to pre-edit state.
- No new banned words introduced (verify via grep against the banned list).
  </done>
</task>

</tasks>

<verification>
1. **Augmentation, not replacement** — `## Voice` heading preserved; the five Phase 1 bullets remain unchanged; a new `### Enforcement (Phase 2)` subsection is appended within the Voice section.
2. **REQ-IDs present** — both `COPY-04` and `COPY-05` appear in the new content.
3. **Subagent identified** — the string `copy-editor` appears at least once.
4. **No banned-word violations introduced** — the new content has been read and contains zero entries from `lib/banned.ts` outside of negative-example quotes (which are allowed because they show what NOT to write).
5. **Other sections untouched** — Two modes, One accent, One signature motion, Stack, What not to do, Content, Definition of done, How to ask for things all unchanged.
6. **No code added** — `.claude/CLAUDE.md` is the only file modified. No new `.ts` files, no edits to existing TypeScript.
</verification>

<success_criteria>
- COPY-04 documented in `.claude/CLAUDE.md` as subagent-enforced.
- COPY-05 documented in `.claude/CLAUDE.md` as subagent-enforced.
- The two-layer enforcement model (automated build-time via Plan 02-D; manual via copy-editor subagent) is explicit in the file.
- No code added — pure documentation plan.
- Zero regressions to other CLAUDE.md sections.
</success_criteria>

<output>
After completion, create `.planning/phases/02-root-layout-lenis-transitions/02-E-SUMMARY.md` covering:
- Modified file: `.claude/CLAUDE.md` (Voice section augmented with `### Enforcement (Phase 2)` subsection)
- REQ coverage: COPY-04 (voice rules — subagent-enforced) + COPY-05 (em-dash cap — subagent-enforced)
- Two-layer enforcement model documented: automated (Plan 02-D) + manual subagent (copy-editor)
- No new code introduced — policy documentation only
- The optional `countEmDashes()` helper (RESEARCH.md "Recommended: add a `countEmDashes(text) → number` helper") was DEFERRED per scope-tightness rule — can be added later if a subagent escalation pattern emerges
</output>
