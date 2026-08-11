# Consulting site — Pass-25 strategic-repositioning execution

You're picking up the `micahjonesconsulting.com` consulting site mid-pivot. Pass-24 (copy audit edits) shipped to `https://micahjonesconsulting.vercel.app` on 2026-05-27 (commit `ac77cf4`). Pass-25 is queued: process a strategic-repositioning research brief from Claude.ai (claude.ai/chat with conversation memory) into site-wide copy + structure edits.

## Project root

```
C:\Users\micah\Code\micahjonesconsulting
```

Confirm Claude Code opens here. Do not work from a parent directory or a sibling project.

## Stack

- Next.js 16 (App Router; two route groups: `(foyer)` for marketing pages, `(theater)` for case studies)
- Tailwind v4 with `@theme` tokens; hand-written CSS in `app/globals.css`
- MDX case studies in `content/work/*.mdx` (Zod-validated frontmatter)
- motion v12 + GSAP 3.15 + Lenis 1.3 + View Transitions API
- Vercel deploy under team scope **`passioneer`**; preview alias **`micahjonesconsulting.vercel.app`**
- GitHub: `github.com/micahx745/micahjonesconsulting`
- pnpm + tsx; copy-lint hook runs in pre-build

## Where things stand (start of session)

- **Pass-24 shipped**: cut dek-repeat opening paragraphs from all three case studies; pain-led hero sub; Operating Principles claim cuts; Card 1 numbers (8K → 290K + RFP doubled); +12 other items. Live and pushed to `main`.
- **Pass-25 research drafted**: operator submitted a strategic-repositioning research brief to Claude.ai. Brief content lives at `.planning/prompts/pass-25-strategic-repositioning-research.md`. The deliverable will land at `.planning/reviews/REVIEW-PASS-25-STRATEGIC-REPOSITIONING-*.md` (date suffix may vary).
- **Branch**: `main`. No uncommitted work expected when you open.

## Primary task — process the Pass-25 research

The brief pivots the site from one narrow buyer to **two buyers** and adds a **two-tier product structure**:

### Buyer A — companies hiring Micah
For product / software engineering / GTM roles. Tech or non-tech industry. Full-time, fractional, or senior contract.

### Buyer B — vibe coders stuck on launch or traction
Solo builders using AI tools (Cursor, Claude Code, Lovable, v0, Bolt) who got 80% to a build but can't ship, or shipped and have no users. Cannot afford a $50K+ engagement. Can afford a $49–$299 PDF.

### Tier 1 — paid PDF
Format / length / price open per research recommendation. Serves as both standalone product AND appetizer for the full engagement.

### Tier 2 — full engagement
Existing services (positioning & GTM, end-to-end product building, frontier AI engineering) — three services, four shapes each. Stays. Framing should be reachable from both audiences.

### Your first action

Check whether the research deliverable file exists:

```
ls .planning/reviews/REVIEW-PASS-25-STRATEGIC-REPOSITIONING-*.md
```

**If it exists**: read it end-to-end (think hard about the cross-cuts and contradictions before proposing the plan). Then group the proposed changes by file / new file, separate clear wins from judgment calls, and propose a Pass-25 execution plan via `AskUserQuestion` for scope aggressiveness — same flow as Pass-23 → Pass-24.

**If it does not exist**: the operator opened this session before the research landed. Confirm with them. Offer to either (a) wait, or (b) work on the queued items below while waiting.

## Queued items (independent of Pass-25 research)

### 1. Guardicore framing broadening — high priority

The operator clarified that "Positioning researcher" is too narrow a role label. Reality: he was a **sales manager** at Guardicore (2018–2021) who originated approximately **$15M in pipeline** over three years, built the **MSSP and reseller channel**, **trained the sales team**, AND ran the positioning research that fed the Akamai acquisition narrative. The case study (`content/work/guardicore.mdx`) needs:

- `role:` from `"Positioning researcher"` → `"Enterprise sales + GTM"`
- `year:` from `"2020"` → `"2018-2021"`
- **New dek** leading with `$15M originated in pipeline across three years. The MSSP partner channel built. The sales team trained. The positioning research that became the narrative carrying the Akamai acquisition.`
- **Body restructure**: expand `## Approach` to 4 points (1: sales execution + $15M, 2: MSSP / reseller channel, 3: sales-team training, 4: positioning research)
- **Outcome section** leads with $15M instead of $150K

This should land in Pass-25 if the research aligns with it (and most likely it does — broadening the role helps Buyer A). If you process Pass-25 before doing this, weave it into the Pass-25 case-study edits.

### 2. Case-study summary images — wiring task

The operator generated 12 Freepik / Pikaso editorial-broadsheet variants on 2026-05-27 at:

```
C:\Users\micah\Downloads\pikaso-2026-05-27\
```

Best picks (verified by review):
- **Guardicore**: `creation_3055219967.png` — but **needs re-prompt with the new sales-GTM framing** (see § 1 above). The current variants all say "ROLE: POSITIONING RESEARCHER" in the footer kicker; the new image needs "ROLE: SALES + GTM" + the $15M lead metric. New prompt is at the tail of the prior session's chat — search past chats or have the operator re-paste.
- **Ordani**: `creation_3055220772.png`
- **HR-equity**: `creation_3055223539.png`

When the operator hands off the final JPGs, wire them into the three case-study pages by replacing the editorial-specimen `<CaseStudyStill>` placeholders. Drop the files at `public/work/{slug}-summary.jpg` and pass as `src` props on each MDX `<CaseStudyStill>` call. The component already supports `src` — see `components/CaseStudyStill.tsx`.

### 3. Backlog (lower priority)

- **CW-18 Slice 2**: lighten the theater obsidian register (case-study background palette tweak)
- **Harness research brief**: `.planning/prompts/harness-research-brief.md` — operator queued this for a fresh session. The current operator note: "not sure if there is work to be done on it." Skim the brief; flag if anything looks blocking, otherwise leave for a dedicated harness session.
- **Operator-action items** (do not touch — these are blocked on the operator):
  - Production canonical `www.micahjonesconsulting.com` still serves a v0.dev prototype
  - Ordani product URL placeholder (operator fills when Ordani product site ships)
  - Real screenshots for Ordani + HR-author case studies
- **Nav-structure inconsistency** between foyer and theater route groups (separate pass; design issue)

## Harness — preserve, do not modify

The operator was explicit: maintain the harness, do not modify it without confirmation. Specifically:

- **Skill system**: invoke `using-superpowers`, `executing-plans`, `writing-plans`, `verification-before-completion`, `finishing-a-development-branch`, and the premium-web `copy-lint-rules` skill before any creative / copy work. Session-start system reminders surface the full list.
- **Copy-lint hook**: write-boundary scanner that rejects files containing roughly 30 banned consultant-jargon / AI-slop terms. **Never bypass.** If a write is rejected, rewrite to satisfy the lint.
- **`.claude/brand.json`**: canonical voice + palette. Read it before any creative direction call.
- **Pre-commit hooks**: do not skip with `--no-verify`.
- **MCP servers** (chrome-devtools, playwright, context7, vercel, supabase, etc.): available. Use chrome-devtools or playwright for live-site spot-checks. Use `mcp__plugin_premium-web_chrome-devtools__take_screenshot` for visual QA.

If the Pass-25 research proposes a structural change that requires a new hook, brand-token addition, or schema migration, **flag it to the operator before modifying `.claude/settings.json` or hook scripts.**

## Voice + brand rules (unchanged from Pass-24)

- **First-person operator voice.** "I" not "we."
- **Sentence cap: 25 words.** Anything longer is a defect.
- **No buzzwords.** Copy-lint enforces the ban-list.
- **Real metrics only.** The HR-equity case study's 8K → 290K + RFP-doubled numbers were authored under operator's "take some liberty" license — keep them as-is.
- **Editorial restraint.** Monocle / Bloomberg Businessweek / WSJ feature insert. Not McKinsey deck, not SaaS landing page, not LinkedIn-influencer post.
- **Pain-led openings.** Lead with the buyer's pain in their own internal language.
- **Evidence before claim.** Receipts first. Let the buyer draw the conclusion.

## Workflow (Pass-23 / Pass-24 pattern)

1. Read the relevant review / research file end-to-end
2. Group proposed changes by file
3. Separate clear-cuts from judgment-calls
4. Propose a plan via `AskUserQuestion` for scope aggressiveness ("all 22 items" vs. "clear wins only" vs. "let me pick")
5. Execute in batches (case studies → home → services → about → work index)
6. Verify with `pnpm run build` (runs copy-lint + Next.js TypeScript check)
7. Defensive grep for stray non-ASCII chars in modified files
8. Commit (new commits, never `--amend`) with descriptive HEREDOC body
9. Deploy via `npx vercel deploy --yes` under team scope `passioneer`
10. Alias to `micahjonesconsulting.vercel.app` via `npx vercel alias set <preview-url> micahjonesconsulting.vercel.app`
11. Push to GitHub
12. Live spot-check with `curl -s <url> | grep ...`
13. Mark task complete

## First message back to the operator

One of two openers, depending on whether the research has landed:

**If research file exists**: "Pass-25 research is in — I read it end-to-end. Here's my proposed execution plan, organized by [X groups]. [Brief verdict.] Want me to apply all of it, or just the clear wins?"

**If research file is missing**: "Pass-25 research hasn't landed in `.planning/reviews/` yet. Want me to work on the Guardicore framing broadening (§ 1) and the case-study image wiring (§ 2) while you're waiting on Claude.ai?"

Wait for confirmation before executing.
