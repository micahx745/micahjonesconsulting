# Plan 08-C — `content/work/passioneer.mdx` (CASE-05 conservative stub)

**REQ-IDs:** CASE-05
**Wave:** 1 (parallel with 08-A, 08-B, 08-D)
**Estimated effort:** 1 file, ~15 lines of MDX

---

## 1. Goal

Write `content/work/passioneer.mdx` as a **conservative stub**. Blueprint provides only that Passioneer is "an AI content platform" (§7 line 255). DO NOT INVENT metrics, dates, quotes, or specific outcomes. Ship status=`stub` with a placeholder body. The case study appears on Work index (sorted last per `lib/case-studies.ts` stub-sort) but never on Home selected-work strip (`getSelectedWork(3)` excludes stubs).

---

## 2. Scope

**Touches:**
- Create `content/work/passioneer.mdx` (new file)

**Does NOT touch:**
- Anything else.

---

## 3. Frontmatter (Zod-schema valid)

```yaml
---
title: Passioneer
dek: An AI content platform. Case study draft pending.
role: Product + growth
tools:
  - AI
  - content
year: 2024
status: stub
titleCardWords:
  - PASSIONEER
  - PROOF
  - PENDING
---
```

**Field-by-field validation:**
| Field | Value | Zod rule | Result |
|---|---|---|---|
| `title` | `Passioneer` | `z.string().min(1)` | PASS |
| `dek` | (placeholder sentence) | `z.string().min(1)` | PASS |
| `role` | `Product + growth` | `z.string().min(1)` | PASS |
| `tools` | 2 generic categories | `z.array(z.string().min(1)).min(1)` | PASS |
| `year` | `2024` (number) | `z.union([z.string(), z.number()])` | PASS |
| `status` | `stub` | `z.enum(["shipped", "in-flight", "archived", "stub"])` | PASS |
| `titleCardWords` | 3 strings | `.min(3).max(6)` | PASS |

**No `client`** — name not authorized for publication; Passioneer is the platform's name itself.

**No `heroStill`** — stub status, no artifacts.

---

## 4. Body (conservative placeholder)

```mdx
A case study draft is in progress.

The Passioneer engagement is recent and the detailed metrics require client sign-off before publication. Check back in Q3 2026.
```

**That's the entire body.** Two short paragraphs. No section headers. No PullQuote. No CaseStudyStill. No claims of outcomes.

---

## 5. Component usage

NONE. The TitleCard renders from frontmatter; the body is plain markdown paragraphs.

---

## 6. Banned-word safety

Body uses only neutral words. Pre-verified clean against all 30 banned words.

---

## 7. Why this matters

The objective explicitly instructs: "DO NOT INVENT specific outcomes, metrics, dates, or quotes for Passioneer." A stub that says "draft pending" is honest and accurate. A fake metric in the body would violate the user's hard rule. The Work index will show Passioneer at the bottom (per stub sort) with TitleCard("PASSIONEER / PROOF / PENDING") and the dek "An AI content platform. Case study draft pending." — readers can see this is a stub at a glance.

When Micah has client sign-off and concrete metrics later, edit the frontmatter (`status: stub → shipped`, real metrics in dek + body) and re-deploy.

---

## 8. Verification (within this plan)

After writing the file:

1. **Frontmatter parses:** every Zod field passes.
2. **Body renders:** dynamic MDX import returns a module exporting a render function for the two paragraphs.
3. **Page-level smoke:** `/work/passioneer` returns 200 in dev.
4. **Sort confirmation:** Work index renders Passioneer LAST (after the three shipped/in-flight studies). Home selected-work strip does NOT include Passioneer (filtered by `getSelectedWork(3)`'s `cs.status !== "stub"` predicate).

Full phase-level verification deferred to 08-E.

---

## 9. Risk

**Risk:** a future reader thinks "this case study is empty / broken" without realizing it's intentionally a stub. **Mitigation:** the dek explicitly says "Case study draft pending."; the body explicitly says "draft is in progress" + "Check back in Q3 2026." The TitleCard words "PROOF / PENDING" make the stub status visually legible.

---

## 10. Files

**Created:** `content/work/passioneer.mdx`

**No other files touched.**

---

## 11. Commit

After 08-C executes: `feat(case-studies): add Passioneer case study (CASE-05, stub)`
