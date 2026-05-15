---
phase: 01-scaffold-tokens-dns
plan: I
type: execute
wave: 3
depends_on:
  - A
files_modified:
  - docs/PORTRAIT-OUTREACH.md
autonomous: true
requirements:
  - PHOTO-01
must_haves:
  truths:
    - "`docs/PORTRAIT-OUTREACH.md` exists as a complete operator runbook for the Oakland portrait photographer booking workstream — initiate Day 1 of Phase 1; 7-day shoot target; $500-$1,200 budget envelope."
    - "The runbook includes the 5-name shortlist from RESEARCH §'Photographer Outreach Checklist': Meika Ejiasi (@meikaejiasi), Robert Silver Photography, Ella Sophie Photography, East Bay Photo Collective referral, Thumbtack/Yelp top-rated. Each entry includes discovery channel + why a fit + approximate rate signal."
    - "The runbook includes the inquiry email template (verbatim from RESEARCH §'Photographer Outreach Checklist' — addressed from Micah, mentions ORDANI, references Anton & Irene / Aurora James aesthetic, specifies 2hr session + 2 retouched images + $500-1,200 budget)."
    - "The runbook clarifies the OPERATOR sends 3 of the 5 shortlist inquiries Day 1 (after triaging by portfolio fit to blueprint §4c aesthetic); the executor produces the runbook + email draft, NOT the actual outreach."
    - "The runbook flags Phase 9 dependency: portrait integration depends on this Phase 1 booking landing within ~21 days (7-day target + buffer); if shoot slips, Phase 9 slips and Phase 10 launch slips with it."
    - "The runbook notes the email's sender alternative — until Resend DNS finishes propagating (Phase 1 Plan H workstream), `hello@micahjonesconsulting.com` may not be active; operator uses personal email as fallback."
  artifacts:
    - path: "docs/PORTRAIT-OUTREACH.md"
      provides: "Operator runbook for Oakland portrait photographer booking"
      contains: "Oakland"
      min_lines: 80
  key_links:
    - from: "docs/PORTRAIT-OUTREACH.md"
      to: "Phase 9 PHOTO-02..03 (portrait integration)"
      via: "delivered images at public/portrait-main.jpg + public/portrait-context.jpg"
      pattern: "portrait-main.jpg"
    - from: "docs/PORTRAIT-OUTREACH.md inquiry email"
      to: "operator's personal email + (post-DNS) hello@micahjonesconsulting.com"
      via: "Plan H Resend DNS verification (24-72h)"
      pattern: "hello@micahjonesconsulting.com"
---

<objective>
Produce a complete operator runbook at `docs/PORTRAIT-OUTREACH.md` for the Oakland portrait photographer booking workstream. This plan PRODUCES the runbook + email draft — the executor does NOT contact photographers (operator-side action requiring authentication to email + judgment on portfolio fit).

Purpose: REQ PHOTO-01 — Oakland portrait photographer booked within 7 days; 2-hour session; budget $500-$1,200. The shoot is OUT-OF-BAND of dev but ON-CRITICAL-PATH for Phase 9 integration and Phase 10 launch.
Output: A markdown runbook with 5-name shortlist + inquiry email template + operator action checklist. Operator triages portfolios and sends 3 inquiries Day 1 of Phase 1.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/01-scaffold-tokens-dns/01-RESEARCH.md
@.planning/blueprint.md
@.planning/PROJECT.md

**Operator-side action (RESEARCH §"Photographer Outreach Checklist"):**
Phase 1 cannot programmatically contact photographers — the operator must:
1. Triage the 5-name shortlist by browsing each photographer's portfolio for blueprint §4c aesthetic fit ("warm-grade color or B&W, available light, Oakland location" — Anton & Irene / Aurora James register, NOT LinkedIn headshot register).
2. Pick 3 photographers whose work genuinely matches.
3. Send the inquiry email to all 3 the same day.
4. Manage the back-and-forth (rate negotiation, session date, location selection) — typically 2-5 emails per photographer.
5. Book the shoot within 7-10 days.

The executor's role is to **produce the runbook + email draft**. The actual outreach is operator-side.

**Why Day 1 (RESEARCH §"Pitfall: Photographer booking 7-day target"):**
Quality Oakland portrait photographers book 1-3 weeks out. Reaching out Day 13 with a "shoot needed in 24h" timeline gets either expensive rush rates or a phone-grade compromise. Day 1 outreach lands the shoot inside the 7-day target window and gives Phase 9 a deliverable.

**Phase 9 dependency:**
Phase 9 (PHOTO-02..03) integrates `portrait-main.jpg` (Home full-bleed) + `portrait-context.jpg` (About column) at ≤500KB after AVIF conversion. Both files come from this booking. If shoot slips a few days, Phase 9 has buffer because Phase 6 (foyer pages) renders `bg-foyer-paper` placeholders in portrait slots until images arrive.

**Sender email caveat:**
The runbook's inquiry email uses `hello@micahjonesconsulting.com` as the sender, but Plan H (Resend DNS) needs 24-72h for that address to be operational. The runbook should note: until DNS propagates, operator uses personal email; the inquiry email itself doesn't strictly require the custom domain — operator can send from personal email and reference the consulting site URL later.

**Shortlist composition (RESEARCH §"Photographer Outreach Checklist"):**
Five candidates surfaced through 2026 Oakland portrait-photographer search results. Three categories:
1. Black Oakland portrait photographer (Meika Ejiasi)
2. Established commercial/editorial photographers (Robert Silver, Ella Sophie)
3. Community channels (East Bay Photo Collective, Thumbtack/Yelp fallback)

**Inquiry email aesthetic anchors:**
- Anton & Irene (antonandirene.com) — Brooklyn founders-as-the-hero treatment
- Aurora James (aurorajames.com) — memoir/author editorial portraiture, naturalistic palette
- The email explicitly references both so the photographer understands the register.
</context>

<tasks>

<task type="auto">
  <name>Task I1: Create docs/PORTRAIT-OUTREACH.md operator runbook</name>
  <files>
    docs/PORTRAIT-OUTREACH.md
  </files>
  <action>
Create `C:/Users/micah/Code/micahjonesconsulting/docs/PORTRAIT-OUTREACH.md`. The `docs/` directory exists from Plan H — append this file.

Final file content:

```markdown
# Oakland Portrait Photographer Outreach — Operator Runbook

**Phase:** 1 (Scaffold, Tokens, DNS)
**Requirement:** PHOTO-01 — Oakland portrait photographer booked within 7 days; 2-hour session; budget $500-$1,200
**Target completion:** Day 1 of Phase 1 build (operator action — not automated)

---

## Why Day 1, not Day 13

Quality Oakland portrait photographers book 1-3 weeks out. Reaching out Day 13 with a "shoot needed in 24h" timeline gets either expensive rush rates or a phone-grade compromise that undermines the entire site's premium register.

Send the inquiry email Day 1 of Phase 1. By Day 7-10, the shoot is on the calendar. Phase 9 (image integration) is unblocked.

---

## What we are buying

| Spec | Value |
|------|-------|
| Session length | ~2 hours |
| Location | Oakland (Micah's actual workspace, a window, a doorway) |
| Look | Warm-grade color or B&W, available light, real-person register |
| Aesthetic references | Anton & Irene (antonandirene.com), Aurora James (aurorajames.com) |
| Anti-references | LinkedIn headshot, corporate environmental portrait, agency-tier "lifestyle" |
| Final delivery | 2 retouched images: (1) main vertical portrait for Home full-bleed; (2) workspace/desk shot for About column |
| Output | 2x retina resolution, ≤500KB after AVIF conversion (Phase 9 next/image handles conversion) |
| Budget | $500-$1,200 for session + final delivery |

---

## Phase 1 → Phase 9 dependency

Phase 9 (PHOTO-02..03) integrates the delivered images into:
- `public/portrait-main.jpg` → Home full-bleed (LCP target ≤1.8s mobile)
- `public/portrait-context.jpg` → About column with caption "Oakland, CA."

If Phase 1's booking lands within 7 days as planned, Phase 9 has the deliverable ready. If it slips a few days, Phase 9 has buffer because Phase 6 (foyer pages) renders `bg-foyer-paper` placeholders in portrait slots until the images arrive. If it slips more than ~21 days, Phase 10 launch slips with it.

---

## Shortlist (5 candidates — operator triages portfolio fit + reaches out)

| Photographer | Discovery channel | Why a fit | Approx rate signal |
|--------------|-------------------|-----------|---------------------|
| **Meika Ejiasi** (@meikaejiasi) | Instagram — identified in 2026 search as "Oakland PhotograpHER" specializing in portrait + lifestyle | Oakland-based; Black photographer; portrait + lifestyle focus matches blueprint §4c "warm-grade color or B&W, natural light, Oakland location" | Within $500–$1,200 likely; confirm via DM |
| **Robert Silver Photography** (robertsilverphotography.com) | "Oakland commercial editorial portrait photographer 2026" search — Oakland-based award-winning commercial + editorial | Commercial + editorial portfolio appropriate for founder portrait; founded Day One Films 2019 (filmic eye) | Mid-range; portfolio rates typically $800–$2,000 for editorial 2hr; ask for solo-operator quote |
| **Ella Sophie Photography** (ellasophiephoto.com) | "Bay Area editorial portrait artist photographer" search — Bay-Area-based professional editorial / artist portraits | Editorial / artists portraits aesthetic matches blueprint §4c "treat product stills like film frames" sensibility | Likely $800–$2,000 for editorial 2hr; ask |
| **East Bay Photo Collective referral** (ebpco.org) | Oakland non-profit photo collective; their member directory + community board often surfaces emerging editorial portrait photographers at sub-mid rates | Local community discovery; possible $500–$900 emerging-photographer rates with strong editorial sensibility | $500–$900 likely |
| **Thumbtack / Yelp top-rated Oakland portrait photographer (5-star ≥ 50 reviews)** | thumbtack.com/ca/oakland/portrait-photographers + yelp.com/search?cflt=photographers&find_loc=Oakland%2C+CA | High-volume rated; useful for fallback if first 4 are booked through July | $400–$800 mid-tier; confirm editorial fit before booking |

---

## Operator action checklist (Day 1)

- [ ] **Step 1: Triage portfolios.** Visit each photographer's portfolio site / Instagram. For each, ask: "Does this work look like Anton & Irene or Aurora James, or does it look like LinkedIn?" Cut anyone whose work is closer to LinkedIn. Aim for 3 keepers.
- [ ] **Step 2: For each keeper, pick a specific image or project to reference in the inquiry email.** This signals you actually looked.
- [ ] **Step 3: Send the inquiry email** (template below) to all 3 the same day.
- [ ] **Step 4: Wait 2-3 business days for responses.** If only 1 of 3 responds with a yes, proceed. If 0 of 3 respond, add 2 more from the Thumbtack/Yelp pool and reissue.
- [ ] **Step 5: Negotiate rate + lock the session date within the 7-10 day window.** Aim for a weekday morning/early afternoon for natural-light Oakland conditions.
- [ ] **Step 6: After the shoot, request 2x retina delivery (high-res JPEGs or PNGs).** Phase 9 handles AVIF conversion via next/image.

---

## Inquiry email template

Send via personal email until Resend DNS verification completes (Plan H, 24-72h propagation). After that, send via `hello@micahjonesconsulting.com`.

> **Subject:** Portrait session for solo-operator marketing site — Oakland, 2-hour, $500–$1,200
>
> Hi [Photographer name],
>
> I'm Micah Jones, an Oakland-based product/growth operator and solo founder. I'm building a new marketing site for my consulting practice and ORDANI (a HIPAA-compliant CRM for birth workers I built solo). The site leads with one excellent portrait of me — full-bleed on the home page, vertical column on the About page.
>
> I'm looking for a working portrait photographer in Oakland for a ~2-hour session in the next 7-10 days. The look I'm after is available-light, warm-grade color or B&W, shot at my actual workspace or a window/doorway in Oakland. Think founder portrait in the lineage of Anton & Irene or Aurora James — real person, not LinkedIn headshot.
>
> Budget: $500–$1,200 for the session and final delivery of 2 retouched images (one main vertical portrait, one secondary workspace/desk shot).
>
> I admire [one specific image / project from their portfolio — fill in before sending]. If you're available and the brief feels right, what's your turnaround on a session like this?
>
> Thanks,
> Micah
> [your personal email — until DNS propagates] / hello@micahjonesconsulting.com (live within 72h)

---

## What this runbook does NOT do

- Does not integrate the delivered images into the site (Phase 9, PHOTO-02..03)
- Does not handle AVIF conversion or `next/image` wiring (Phase 9)
- Does not commit any images to git from Phase 1 (image files arrive in Phase 9)

---

## Sources

- [The 10 Best Portrait Photographers in Oakland, CA 2026 — Thumbtack](https://www.thumbtack.com/ca/oakland/portrait-photographers)
- [Best Photographers in Oakland, CA — Yelp 2026](https://www.yelp.com/search?cflt=photographers&find_loc=Oakland%2C+CA)
- [Meika Ejiasi (@meikaejiasi) — Oakland PhotograpHER, Instagram](https://www.instagram.com/meikaejiasi/)
- [Robert Silver Photography — Oakland Commercial Editorial Portrait](https://www.robertsilverphotography.com/)
- [Ella Sophie Photography — Studio portraits, editorial, lifestyle](https://www.ellasophiephoto.com/portraits.html)
- [East Bay Photo Collective](https://www.ebpco.org/)
- Project research: `.planning/phases/01-scaffold-tokens-dns/01-RESEARCH.md` §"Photographer Outreach Checklist"
- Aesthetic references: blueprint §4c (photography direction) + §2 (Anton & Irene tear-down)

---

*Runbook produced as part of Phase 1, Plan I. Operator executes Day 1 of build.*
```

**Critical writing rules:**
- File MUST be at `C:/Users/micah/Code/micahjonesconsulting/docs/PORTRAIT-OUTREACH.md`.
- The runbook is the DELIVERABLE — the executor does NOT contact photographers, does NOT view portfolios, does NOT send emails.
- The 5-name shortlist MUST appear with all four columns per RESEARCH (Photographer / Discovery channel / Why a fit / Approx rate signal).
- The inquiry email template MUST appear verbatim from RESEARCH §"Photographer Outreach Checklist".
- The "Phase 9 dependency" section MUST flag the 21-day slip risk → Phase 10 launch slip.
- The "Sender email caveat" MUST note the Plan H DNS dependency.
- Reference RESEARCH.md sources at the bottom.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && test -f docs/PORTRAIT-OUTREACH.md && grep -q "Oakland" docs/PORTRAIT-OUTREACH.md && grep -q "PHOTO-01" docs/PORTRAIT-OUTREACH.md && grep -q "Meika Ejiasi" docs/PORTRAIT-OUTREACH.md && grep -q "Robert Silver" docs/PORTRAIT-OUTREACH.md && grep -q "Ella Sophie" docs/PORTRAIT-OUTREACH.md && grep -q "East Bay Photo Collective" docs/PORTRAIT-OUTREACH.md && grep -q "Anton & Irene" docs/PORTRAIT-OUTREACH.md && grep -q "Aurora James" docs/PORTRAIT-OUTREACH.md && grep -q "500" docs/PORTRAIT-OUTREACH.md && grep -q "1,200\\|\\$500" docs/PORTRAIT-OUTREACH.md && grep -q "Subject:" docs/PORTRAIT-OUTREACH.md && grep -q "Phase 9" docs/PORTRAIT-OUTREACH.md && grep -q "portrait-main.jpg" docs/PORTRAIT-OUTREACH.md && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    `docs/PORTRAIT-OUTREACH.md` exists with: "What we are buying" spec table; Phase 9 dependency callout; 5-name shortlist table (4 columns); 6-step operator action checklist; inquiry email template (verbatim from RESEARCH); Phase 9 deliverable filenames documented (portrait-main.jpg + portrait-context.jpg); sources section with 6 references.
  </done>
</task>

</tasks>

<verification>
- `docs/PORTRAIT-OUTREACH.md` is a complete runbook
- "What we are buying" spec, "Phase 9 dependency", "Shortlist", "Operator action checklist", "Inquiry email template", "Sources" sections all present
- 5-name shortlist with discovery channel + why a fit + rate signal
- Inquiry email template references Anton & Irene + Aurora James aesthetic
- $500-$1,200 budget envelope documented (matches PROJECT.md Key Decisions)
- Phase 9 dependency (portrait-main.jpg + portrait-context.jpg) called out
- Sender email caveat (Plan H DNS dependency) noted
- Executor did NOT contact any photographers (operator-side action)
</verification>

<success_criteria>
- PHOTO-01 ✓: Runbook + shortlist + email template exist; operator can send 3 inquiries Day 1
- Phase 9 (PHOTO-02..03) blocked until operator completes runbook + receives images
- If 7-day shoot target is missed by ~14 days, Phase 9 has buffer (foyer placeholders); if missed by 21+ days, Phase 10 launch slips
- Aesthetic register documented (Anton & Irene / Aurora James — NOT LinkedIn) so photographer responses can be filtered
</success_criteria>

<output>
After completion, create `.planning/phases/01-scaffold-tokens-dns/01-I-SUMMARY.md` confirming:
- Runbook exists at `docs/PORTRAIT-OUTREACH.md`
- 5-name shortlist sourced from RESEARCH §"Photographer Outreach Checklist"
- Inquiry email template verbatim from RESEARCH
- Operator-side action (executor did NOT contact photographers)
- Phase 9 dependency flagged: if shoot slips >21 days, Phase 10 launch slips
</output>
