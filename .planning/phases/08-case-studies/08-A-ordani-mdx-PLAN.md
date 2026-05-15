# Plan 08-A — `content/work/ordani.mdx` (CASE-03 verbatim)

**REQ-IDs:** CASE-03
**Wave:** 1 (parallel with 08-B, 08-C, 08-D)
**Estimated effort:** 1 file, ~70 lines of MDX

---

## 1. Goal

Write `content/work/ordani.mdx` as the verbatim ORDANI case study per blueprint §9. User has explicitly authorized verbatim treatment — every metric, quote, and statement ships unchanged.

---

## 2. Scope

**Touches:**
- Create `content/work/ordani.mdx` (new file)

**Does NOT touch:**
- `app/(theater)/work/[slug]/page.tsx` — already prerenders this slug via Phase 7 `generateStaticParams`.
- `mdx-components.tsx` — already maps every component used.
- `app/globals.css` — no new styles needed; Phase 7 styles cover all components.
- `--color-ordani-sage` token — reserved in `app/globals.css` and `brand.json` palette but NOT consumed in Phase 8.

---

## 3. Frontmatter (Zod-schema valid)

```yaml
---
title: ORDANI
dek: A HIPAA-compliant CRM for birth workers. Solo build. Next.js + Supabase. 14 doulas in private beta.
role: Solo — research, design, build, ship
tools:
  - Next.js
  - Supabase
  - Vercel
  - Tailwind
  - Resend
year: 2025-2026
status: in-flight
titleCardWords:
  - ORDANI
  - INTAKE.
  - SECURE.
  - SHIPPED.
client: ORDANI (private beta)
---
```

**Field-by-field validation:**
| Field | Value | Zod rule | Result |
|---|---|---|---|
| `title` | `ORDANI` | `z.string().min(1)` | PASS |
| `dek` | (one sentence) | `z.string().min(1)` | PASS |
| `role` | `Solo — research, design, build, ship` | `z.string().min(1)` | PASS |
| `tools` | 5 strings | `z.array(z.string().min(1)).min(1)` | PASS |
| `year` | `2025-2026` (string) | `z.union([z.string().min(1), z.number()])` | PASS |
| `status` | `in-flight` | `z.enum(["shipped", "in-flight", "archived", "stub"])` | PASS |
| `titleCardWords` | 4 strings | `.min(3).max(6)` | PASS |
| `client` | `ORDANI (private beta)` | `z.string().optional()` | PASS |

---

## 4. Body (verbatim per blueprint §9 lines 497-535)

Lift verbatim. Do NOT alter prose. The TitleCard component renders the word stack from `titleCardWords`, so the body does NOT start with an `# ORDANI` H1.

The exact body content is documented in 08-RESEARCH.md §3.2. Key points:

1. Lead paragraph (no heading): "A HIPAA-compliant CRM for birth workers. I built it alone, on Next.js and Supabase, and 14 doulas use it every day in private beta."

2. `## The problem` — one paragraph (verbatim).

3. `## Why it matters` — one paragraph with CDC stats (44.8 per 100,000, 3.15×, 14.2) verbatim. Italicizes `*Maternal Mortality Rates in the United States, 2024*` via markdown italics.

4. `## Approach` — four numbered subsections, each opening with bolded `**01.** ... **02.** ... **03.** ... **04.**` markdown.

5. `## What it became` — three `<CaseStudyStill>` components:
   - `<CaseStudyStill alt="The intake — one screen, not fifteen" date="2026-03" />`
   - `<CaseStudyStill alt="What a doula sees on a Tuesday morning" date="2026-03" />`
   - `<CaseStudyStill alt="Every read is logged. Every export requires a reason" date="2026-03" />`

   `src` is omitted on all three — Phase 7 `<CaseStudyStill>` graceful-placeholder branch renders the gradient div.

6. `## Outcome` — one paragraph (verbatim).

7. `<PullQuote attribution="beta user, name withheld">` — quote text verbatim per blueprint §9 line 533: "It is the first piece of software that treats my practice the way I treat my clients."

---

## 5. Component usage

- `<CaseStudyStill alt="..." date="..." />` — three instances, no `src`. The Phase 7 placeholder gradient renders; caption is "alt — Mar 2026".
- `<PullQuote attribution="beta user, name withheld">...quote...</PullQuote>` — wraps the closing quote.
- NO `<CopperRule>` — blueprint §9 doesn't use one in ORDANI.
- NO `<Dek>` inside body — the page template renders `<Dek>` from frontmatter.dek already.

---

## 6. Banned-word safety

Pre-verified in 08-RESEARCH.md §3.3 against `lib/banned.ts`. All 30 banned words absent from the verbatim prose.

**Exception flag:** em-dash count exceeds COPY-05's "≤1 per page" guideline. The user has authorized verbatim — em-dashes ship as-is. COPY-05 is a manual `copy-editor` subagent rule, not a build-time scanner rule, so `pnpm build` will not fail. Documented in 08-VERIFY-OUTPUT.md.

---

## 7. Verification (within this plan)

After writing the file:

1. **Frontmatter parses:** the Zod schema accepts every field.
2. **Body renders:** dynamic import in the theater page returns an MDX module.
3. **Page-level smoke:** `/work/ordani` route returns 200 in dev.

Full phase-level verification deferred to 08-E.

---

## 8. Risk

**Risk:** verbatim blueprint prose contains em-dashes that exceed COPY-05's per-page cap (manual subagent rule). **Mitigation:** the user has explicitly authorized verbatim treatment; em-dashes ship as-is; COPY-05 is documented as a known divergence in the verify output.

**Risk:** `<CaseStudyStill src=undefined>` renders a gradient placeholder which looks different from real screenshots. **Mitigation:** Phase 7 PASS verified placeholder branch; real images land in a future phase.

---

## 9. Files

**Created:** `content/work/ordani.mdx`

**No other files touched.**

---

## 10. Commit

After 08-A executes: `feat(case-studies): add ORDANI case study (CASE-03, verbatim)`

The phase-final commit at 08-E aggregates: `docs(phase-8): complete phase execution`.
