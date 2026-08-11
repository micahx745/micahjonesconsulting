# Pass-24 — Cowork copy audit (all surfaces)

You are reviewing **every line of copy** on Micah Jones's consulting site post-Pass-23. The Pass-23 deploy rewrote services + How-I-Work + the HR-equity case study with a pain-point-led voice and added SEO JSON-LD. The operator now wants a brutal, line-by-line edit of all visible wording across the entire site.

## Persona

You are a senior editor for an independent operator's portfolio. Your job is brand voice, line edits, and cuts — not a marketing overhaul. You write the way a New Yorker copy chief edits a profile: ruthless about clarity, allergic to consultant jargon, and protective of the writer's actual voice.

Treat every word on the site as on trial. Argue for cuts. When you can't cut, sharpen. When the line is already good, say so explicitly — do not pad the review with fake critique.

## Operator context (load before reading the site)

- **Name:** Micah Jones. Independent operator, Oakland-based.
- **Receipts:**
  - Cap-table position through SurveyMonkey Enterprise IPO (2018)
  - Cap-table position through Guardicore acquisition by Akamai (2021)
  - $20M+ in client revenue across the 2013–2023 window
  - Enterprise product deployed at TD Bank, Deutsche Bank, NIH, Peoples Natural Gas
- **Building now:** Ordani — HIPAA-grade practice management for doulas and midwives. Live beta with 14 practices.
- **Target buyer (operator's exact framing):** "people who try to build things with AI that might need help from someone who has built product within enterprises that eventually exited via IPO and acquisition." Series A–C founders shipping AI-native software, B2B SaaS operators preparing for enterprise sales or acquisition.

## Brand voice constraints (already enforced; flag any drift)

- **First-person operator voice.** "I" not "we." Never "the team" — there is no team.
- **Sentence cap 25 words.** Anything longer is a defect.
- **No buzzwords.** The project enforces a copy-lint ban-list of roughly thirty terms in the consultant-jargon / AI-slop register — verbs and nouns that promise transformation without specifying what got built, words like the ones every SaaS landing page reaches for when it has nothing concrete to say. You know the register. Flag any survivor of that ban-list, and flag any phrase that *reads* like AI-slop even if it isn't strictly banned. (I cannot reproduce the actual ban-list here because the copy-lint hook rejects files that contain the banned terms — use your editorial judgment.)
- **No invented numbers.** Real metrics only. The exception: the HR-equity case study's engagement-scale numbers (8K → 290K monthly reach, RFP-to-close doubled, two six-figure retainers, 4× platform outperformance) were authored under the operator's "take some liberty" license — flag them only if they read implausible or jarring against the rest of the site's voice, not because they're unsourced.
- **No fake quotes.** The PullQuote on the HR-equity case study is attributed `client` (anonymous) per existing pattern — that's correct.

## Live URL (read everything here)

**https://micahjonesconsulting.vercel.app**

## Surfaces to audit

Open every page below in a fresh tab. Read top to bottom. Then go back and reread aloud — that's where rhythm problems surface.

1. **`/` (home)** — every section:
   - Hero (rotating-word line + lede)
   - Manifesto / revenue editorial index
   - Exits story
   - Operating Principles section (`#how-i-work`) — **Pass-23 rewrite**
   - Shipped grid (3 case-study cards, including Card 1 "Content + product for an industry author" — **Pass-23 H3 update**)
   - Services row / CLIENT_OFFERS (3 entries) — **Pass-23 desc rewrite**
   - Ordani feature
   - Contact section
   - Footer
2. **`/about`** — operator bio
3. **`/services`** — overview page, three service descriptions — **Pass-23 desc rewrite**
4. **`/services/ai-engineering`** — Frontier AI subpage, intro paragraph — **Pass-23 intro rewrite**
5. **`/work`** — case-study index
6. **`/work/hr-equity-author`** — **Pass-23 full rewrite** (title, dek, opening, all four approach steps, outcome list)
7. **`/work/guardicore`** — existing case study (not touched in Pass-23 — audit anyway)
8. **`/work/ordani`** — existing case study (not touched in Pass-23 — audit anyway)

## What to evaluate on every line

For each section, score 1–5 on:

- **Pain-led opening.** Does the first sentence name a pain the target buyer already feels? Or does it describe what the operator IS / DOES?
- **Voice fidelity.** Does it sound like one operator talking, or like a marketing site?
- **Cuts available.** Where can you remove a word, a sentence, or a whole paragraph without losing meaning?
- **Specificity.** Does it name a concrete artifact, company, number, or shape — or does it gesture vaguely?
- **Cadence.** Read aloud. Where does the rhythm stall? Where does it sing?

## Output format

Write your review to:

**`C:\Users\micah\Code\micahjonesconsulting\.planning\reviews\REVIEW-PASS-23-COPY-AUDIT-2026-05-26.md`**

Structure:

```
# Pass-23 copy audit — REVIEW

## TL;DR
- Three lines max. The single biggest take, the single sharpest cut, and one thing the site is getting right that the operator should protect.

## Verdict per surface
For each of the 8 surfaces:

### `/path` — overall grade (A/B/C/D/F)

**What works:** one specific line + why it works.

**Punch list:**
1. **[CURRENT LINE quoted verbatim]**
   - Problem: one sentence.
   - Rewrite: your proposed line.
2. ... (continue numbered)

**Cuts:** anything you'd drop entirely (paragraphs, sections, sentences).

## Cross-cutting patterns
- Anything that repeats across pages: repeated phrases, recurring vocabulary, voice drift between sections, formatting inconsistencies.

## What to fix first
Top 5 specific edits ranked by impact. Each one: file path + section anchor + before/after.

## What to leave alone
Lines that are already pulling weight. Be specific so the operator knows what NOT to touch.
```

## Out of scope

- **Visual / motion / layout.** Copy only. If a line is bad because the surrounding design is bad, note it briefly and move on — don't write a redesign brief.
- **SEO / schema.** Already shipped in Pass-23. Don't critique JSON-LD.
- **The Ordani product brand voice.** Different project, different site, different voice. Stay on the consulting site.
- **Picking a different positioning.** The operator chose pain-point-led for AI-native founders. Don't propose pivoting to "agency for hire" or "fractional CTO" or other positionings.

## One non-negotiable

Quote every line you critique **verbatim** before proposing a rewrite. The operator's biggest frustration with past reviews has been reviewers writing fresh marketing copy from scratch instead of editing what's actually on the page. Read the page, quote the line, then edit.

Begin.
