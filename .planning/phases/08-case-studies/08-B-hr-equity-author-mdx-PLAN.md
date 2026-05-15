# Plan 08-B — `content/work/hr-equity-author.mdx` (CASE-04)

**REQ-IDs:** CASE-04
**Wave:** 1 (parallel with 08-A, 08-C, 08-D)
**Estimated effort:** 1 file, ~50 lines of MDX

---

## 1. Goal

Write `content/work/hr-equity-author.mdx` as the anonymized HR consultant + author case study per blueprint §10. User has explicitly authorized this verbatim treatment — every claim ships unchanged.

---

## 2. Scope

**Touches:**
- Create `content/work/hr-equity-author.mdx` (new file)

**Does NOT touch:**
- Anything else. Reuses Phase 7 infrastructure exactly.

---

## 3. Frontmatter (Zod-schema valid)

```yaml
---
title: An HR consultant and author specializing in organizational equity
dek: Algorithm strategy + multi-platform content system. RFP wins. 25+ page playbook. Two named platforms outperformed the third by 4x.
role: Strategist + ghostwriter
tools:
  - TikTok
  - Instagram
  - YouTube
  - LinkedIn
  - X
  - Notion
year: 2024-2025
status: shipped
titleCardWords:
  - REACH.
  - RFP.
  - RETAINER.
---
```

**Field-by-field validation:**
| Field | Value | Zod rule | Result |
|---|---|---|---|
| `title` | (anonymized descriptor) | `z.string().min(1)` | PASS |
| `dek` | (one sentence with named numbers) | `z.string().min(1)` | PASS |
| `role` | `Strategist + ghostwriter` | `z.string().min(1)` | PASS |
| `tools` | 6 strings | `z.array(z.string().min(1)).min(1)` | PASS |
| `year` | `2024-2025` (string) | `z.union([z.string(), z.number()])` | PASS |
| `status` | `shipped` | `z.enum(["shipped", ...])` | PASS |
| `titleCardWords` | 3 strings | `.min(3).max(6)` | PASS |

**No `client` field** — anonymized per blueprint §10. `client` is optional in the Zod schema; omit.

**No `heroStill`** — anonymized, no client artifacts to surface.

---

## 4. Body (verbatim per blueprint §10 lines 554-583)

Lift verbatim. The TitleCard component renders the word stack from `titleCardWords`, so the body does NOT start with an `# AN HR CONSULTANT AND AUTHOR` H1.

The exact body content is documented in 08-RESEARCH.md §4.2. Key points:

1. Lead paragraph (no heading): "I built the algorithm strategy and content system for an HR consultant and author specializing in organizational equity. The playbook ran to 25+ pages. Two platforms outperformed the third by 4x. RFP wins followed."

2. `## The problem` — one paragraph (verbatim).

3. `## Why it matters` — one paragraph (verbatim). Contains "I am uninterested in helping any of these consultants become quiet." which is a defining-voice sentence.

4. `## Approach` — four numbered subsections (`**01.** ... **02.** ... **03.** ... **04.**`).

5. `## Outcome` — one paragraph (verbatim).

6. `<PullQuote attribution="client">` — quote verbatim per blueprint §10 line 582: "Micah does the work that most strategy decks promise and never deliver."

---

## 5. Component usage

- `<PullQuote attribution="client">` — single instance at the close.
- NO `<CaseStudyStill>` — anonymized engagement, no artifacts.
- NO `<CopperRule>` — blueprint §10 doesn't use one.
- NO body-level `<Dek>` — page template handles dek.

---

## 6. Banned-word safety

Pre-verified in 08-RESEARCH.md §4.3. All 30 banned words absent. The word "deliver" appears in the pull quote — NOT banned (we ban "drive" / "elevate" / "leverage"; "deliver" is fine).

---

## 7. Verification (within this plan)

After writing the file:

1. **Frontmatter parses:** every Zod field passes.
2. **Body renders:** dynamic MDX import succeeds.
3. **Page-level smoke:** `/work/hr-equity-author` returns 200 in dev.

Full phase-level verification deferred to 08-E.

---

## 8. Risk

**Risk:** the title "An HR consultant and author specializing in organizational equity" is unusually long — it's a descriptor, not a brand name. **Mitigation:** Phase 7 page template renders title in TitleCard via `titleCardWords` (which are the 3 short words REACH/RFP/RETAINER), not via the long `title` field directly. The `title` field is for `<title>` HTML element + Work index card heading; the layout already wraps long titles (CSS `max-width` and `font-size: 0.85rem` on `.work-index-card__title`).

**Risk:** em-dashes in body prose may exceed COPY-05 per-page cap (manual subagent rule). **Mitigation:** verbatim authorized by user; COPY-05 is documented as known divergence.

---

## 9. Files

**Created:** `content/work/hr-equity-author.mdx`

**No other files touched.**

---

## 10. Commit

After 08-B executes: `feat(case-studies): add HR Equity Author case study (CASE-04, anonymized)`

The phase-final commit at 08-E aggregates.
