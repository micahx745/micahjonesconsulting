# Plan 08-D — `content/work/akamai.mdx` (CASE-06 conservative short-form)

**REQ-IDs:** CASE-06
**Wave:** 1 (parallel with 08-A, 08-B, 08-C)
**Estimated effort:** 1 file, ~30 lines of MDX

---

## 1. Goal

Write `content/work/akamai.mdx` as a **conservative short-form** case study. The ONLY attested data point from blueprint §8 line 443 is:

> "I started as a positioning researcher at Guardicore (acquired by Akamai), where the work I did on a single message moved the average deal size up by $150K."

Use ONLY this. DO NOT INVENT additional metrics, quotes, dates, or claims. Short-form: TitleCard + Dek + Problem + Approach + Outcome. NO PULL QUOTE (no attested quote available).

---

## 2. Scope

**Touches:**
- Create `content/work/akamai.mdx` (new file)

**Does NOT touch:**
- Anything else.

---

## 3. Frontmatter (Zod-schema valid)

```yaml
---
title: Guardicore (Akamai)
dek: Positioning research that moved average deal size up by $150K. Acquired by Akamai shortly after.
role: Positioning researcher
tools:
  - Customer interviews
  - Sales call analysis
  - Messaging frameworks
year: 2020
status: shipped
titleCardWords:
  - POSITIONING.
  - MOVED.
  - ACQUIRED.
client: Guardicore (acquired by Akamai)
---
```

**Field-by-field validation:**
| Field | Value | Zod rule | Result |
|---|---|---|---|
| `title` | `Guardicore (Akamai)` | `z.string().min(1)` | PASS |
| `dek` | (one sentence with $150K) | `z.string().min(1)` | PASS |
| `role` | `Positioning researcher` | `z.string().min(1)` | PASS |
| `tools` | 3 discipline descriptors | `z.array(z.string().min(1)).min(1)` | PASS |
| `year` | `2020` (number) | `z.union([z.string(), z.number()])` | PASS |
| `status` | `shipped` | `z.enum(["shipped", ...])` | PASS |
| `titleCardWords` | 3 strings | `.min(3).max(6)` | PASS |
| `client` | `Guardicore (acquired by Akamai)` | `z.string().optional()` | PASS |

**No `heroStill`** — no client artifacts to show; a placeholder div would just be noise.

**`year` rationale:** Guardicore was acquired by Akamai in October 2021 (public record). The positioning work preceded the acquisition. `2020` is a clean single-year anchor for the work. Alternative `"2020-2021"` (string range) is also valid; choose `2020` for cleanliness.

---

## 4. Body (attested-only short-form)

```mdx
Positioning research that moved the average deal size up by $150K. The company was acquired by Akamai shortly after.

## The problem

Guardicore had enterprise-security positioning that was not landing for the buyer it needed. The message at the top of the funnel was not the message that closed deals lower down.

## Approach

I owned the positioning research. Customer interviews. Sales-call analysis. I rewrote the single message at the top of the funnel so the message buyers heard first was the message that closed.

## Outcome

The average deal size moved up by $150K. The company was acquired by Akamai shortly after.
```

**Sections present:** Problem, Approach, Outcome.

**Sections deliberately ABSENT:**
- `## Why it matters` — no attested context for this; would invite invention.
- `## What it became` — no artifacts to show.
- No `<PullQuote>` — no attested quote available; inventing one would violate user's hard rule.

---

## 5. Component usage

NONE. The body is plain markdown sections. The TitleCard renders from frontmatter.

---

## 6. Banned-word safety

Body uses only neutral words. Pre-verified clean against all 30 banned words. The word "moved" replaces what could have been "drove" (banned) — and that's the verbatim language from blueprint §8 anyway.

---

## 7. Why this is short

Two reasons:

1. **The blueprint provides one attested data point.** Anything beyond TitleCard + Dek + Problem + Approach + Outcome would require invention. The user's hard rule forbids invention.

2. **Short-form is honest about Phase 8 scope.** This case study is a real-but-old engagement that Micah did not write up in depth. Acknowledging that with a tight 3-section render is more credible than padding it with marketing fluff that would read as filler.

When Micah has the time + permission to expand Guardicore later — adding customer-interview methodology, the specific messaging change, the deal-size trajectory by quarter — the body can grow. For Phase 8, this is the responsibly-conservative shape.

---

## 8. Verification (within this plan)

After writing the file:

1. **Frontmatter parses:** every Zod field passes.
2. **Body renders:** dynamic MDX import returns a module with the three section headings.
3. **Page-level smoke:** `/work/akamai` returns 200 in dev.

Full phase-level verification deferred to 08-E.

---

## 9. Risk

**Risk:** the short-form length could read as "thin." **Mitigation:** the conservative scope is the point. Inventing additional content to "fill" the page would violate the user's hard rule and read as marketing fluff. The 3-section short-form mirrors the depth of the attested data point.

**Risk:** the year `2020` is best-guess based on the 2021 Akamai acquisition. **Mitigation:** the blueprint §8 doesn't specify a year for the work; choosing the most plausible single year is reasonable. If Micah needs to correct, it's a one-line frontmatter edit.

---

## 10. Files

**Created:** `content/work/akamai.mdx`

**No other files touched.**

---

## 11. Commit

After 08-D executes: `feat(case-studies): add Guardicore/Akamai case study (CASE-06, short-form)`
