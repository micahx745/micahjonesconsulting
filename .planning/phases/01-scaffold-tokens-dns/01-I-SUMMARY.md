---
phase: 01-scaffold-tokens-dns
plan: I
status: complete
completed: 2026-05-14
---

# Plan 01-I: Portrait Photographer Outreach Runbook — SUMMARY

## What was built

Produced `docs/PORTRAIT-OUTREACH.md` — a 6-step operator runbook for Day-1 Oakland portrait photographer outreach. The runbook is the deliverable; the executor did NOT contact photographers, view portfolios, or send emails (those require operator-side action with judgment + email authentication).

## Files created

- `docs/PORTRAIT-OUTREACH.md` (~140 lines)

## Runbook content sections

1. **Why Day 1, not Day 13** — quality Oakland portrait photographers book 1-3 weeks out
2. **What we are buying** — spec table: 2hr session, Oakland location, warm-grade color/B&W available light, $500-$1,200 budget, 2 retouched images, Anton & Irene / Aurora James aesthetic references, NOT LinkedIn
3. **Phase 1 → Phase 9 dependency** — portrait-main.jpg + portrait-context.jpg target paths; 21-day slip risk to Phase 10 launch
4. **Shortlist** — 5-name table sourced from RESEARCH §"Photographer Outreach Checklist":
   - Meika Ejiasi (@meikaejiasi) — Instagram-discovered Oakland Black portrait photographer
   - Robert Silver Photography — Oakland commercial+editorial, founded Day One Films 2019
   - Ella Sophie Photography — Bay Area editorial artist portraits
   - East Bay Photo Collective referral — Oakland nonprofit photo collective
   - Thumbtack/Yelp top-rated fallback
5. **Operator action checklist (Day 1)** — 6 steps: triage portfolios, pick image reference per keeper, send 3 emails, wait 2-3 business days, negotiate + lock session date within 7-10 day window, request 2x retina delivery
6. **Inquiry email template** — verbatim from RESEARCH; addresses sender alternative until DNS propagates
7. **What this runbook does NOT do** — Phase 9 image integration boundaries
8. **Sources** — 8 references (Thumbtack, Yelp, Instagram, photographer sites, EBPCO, RESEARCH, blueprint)

## Requirements covered

- PHOTO-01: Operator runbook + 5-name shortlist + inquiry email template produced

## Plan H dependency flagged

The inquiry email references `hello@micahjonesconsulting.com` as the sender, but Plan H (Resend DNS verification) needs 24-72h for that address to be operational. Runbook explicitly instructs: send via personal email until Plan H's DNS propagates, then switch to hello@.

## Phase 9 dependency flagged

If shoot lands within 7-day target → Phase 9 (PHOTO-02..03) has deliverable ready. If shoot slips ~14 days → Phase 9 buffer absorbs (foyer placeholders render). If shoot slips ~21+ days → Phase 10 launch slips.

## Aesthetic register defined

The runbook anchors the aesthetic to Anton & Irene + Aurora James (memoir / founder editorial) and explicitly anti-anchors LinkedIn / corporate environmental / agency-tier "lifestyle." This is the filter operator applies when triaging the 5 candidates down to 3.

## Operator-side action documented

The runbook clearly delineates what is executor-produced (the runbook document + email draft) vs operator-executed (the actual outreach, portfolio triage, rate negotiation, session booking). Image files arrive in Phase 9, not Phase 1 — no images committed from Phase 1.

## Key files

```yaml
key-files:
  created:
    - docs/PORTRAIT-OUTREACH.md
```
