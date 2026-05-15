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
