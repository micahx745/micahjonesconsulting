# DESIGN DECISIONS — design-elevation arc (2026-08)

Operator-locked answers from the Stage-2 discussion (handoff:
`.planning/prompts/handoff-design-elevation-session.md`). Each block is dated and binding
for the build waves. Source review: `REVIEW-DESIGN-2026-08-10-COWORK.md`.

## Round 1 — locked 2026-08-11

**D1 · Hero rotator (P1-3):** ONE CYCLE, THEN STOP. Runs the full sequence once on load,
lands and holds on the strongest word. Passes R15 (nothing loops idly). Note: the reviewer's
390px clip claim did NOT reproduce (longest word 350px wide, right edge 370 at a true 390
viewport) — no clip fix needed, but verify while touching the component.

**D2 · Marquee (P1-3):** SCROLL-LINKED ADVANCE. The strip's transform ties to scroll
position; `animation: 22s linear infinite` is deleted. Band and full-bleed rhythm stay.

**D3 · Case-study ground (P0-1):** DARK, RE-COLORED TO THE SYSTEM; DROP CAPS DIE.
Template re-ports to Bricolage display + Hanken body + bone ink on the dark ground, one
wordmark (MICAH/JONES), site nav, mono labels at ≥4.5:1, ONE accent family (rust/saffron —
no per-page forest/sage). Serif drop caps deleted; Source Serif 4 + Inter + Instrument
Serif + Fraunces unloaded from the case routes (and from root if nothing else uses them).
Duplicate lede, triplicate role/tools/year, duplicate captions die in the same pass.

**D4 · Grid shape (P0-2):** COMPARATIVE SPEC TABLE, all four routes (/services ×3 grids,
/services/ai-engineering, /hire-me). Shapes as columns, mono data, body ≥16px / labels
11–12px, the operator's priority shape gets the filled/weighted column (which shape —
Round 2). Home engagements row: lead card at 2× (which card — Round 2).

## Round 2 — locked 2026-08-11

**D5 · Weighted shape (P0-2):** EMBEDDED gets the filled/weighted column on BOTH /services
(Project/Retainer/Embedded/Advisory tables ×3 + AI page) and /hire-me (Full-time/
Fractional/Embedded/Advisory). Matches "Operator, not consultant."

**D6 · Home lead card (P0-2):** "GTM at scale" (Guardicore) leads at 2× width, $80M/$14M
at display size. Author + Frontier AI cards stack as minors.

**D7 · CTA grammar (P1-6):** ONE filled pill per page = the page's primary action; ALL
other actions underlined mono. Home primary = "See the work". Book-a-call / Hire-me demote
to underlined mono on home. Gold pill may stay gold inside the Ordani zone ONLY if pill
geometry/typography matches the system (reviewer's allowance).

**D8 · Playbook pricing (P1-6/R17):** REWORD to plain pricing: "Launch price $99; $149
after release." (exact copy may be tuned by copy-editor; no urgency framing).

## Round 3 — locked 2026-08-11

**D9 · Named companies (P1-9/R13):** CUT Flexport/Cuebiq/Postmates from home + /about.
Keep "a decade of enterprise software" framing. No collective figure supplied.

**D10 · Signature gesture (P2-3/R9):** CONFIRMED, all three parts — scroll palette-shift
declared THE gesture; one quiet instance added to /about (into RECEIPTS) and /services
(between the three services); case-page mark-draws re-cut in the hand-drawn family
(ellipse/arrow voice). Motion-engineer owns implementation.

**D11 · Nav IA (P2-5):** CLIENTS / ORDANI / WORK / SERVICES / CONTACT (5 slots). WORK
points at /work from subpages (bug fix). /about, /hire-me, /playbook stay inline-only.

**D12 · Artifact supply (P2-1):** Operator will produce: (1) Ordani screenshots —
urgency #1, (2) /about portrait, (3) redacted RFP-report screenshot. Guardicore framework
scan NOT selected — its artifact card keeps the placeholder treatment; do not block W4 on
it. No timings supplied; artifacts land whenever operator drops them (portrait flow is
file-drop + build per .claude/CLAUDE.md).

## Round 4 — locked 2026-08-11

**D13 · Type scale (P1-1):** APPROVED — mono-12 · body-17 · lede-22 · h3-28 · h2-40/56 ·
display-92 + the reserved 230px Ordani moment. ≤5 active sizes per page; every size maps
to the nearest step; card bodies 13→16+. Before/after screenshots per page in the visual
loop before ship.

## DISCUSSION CLOSED 2026-08-11 — all 13 decisions locked. Build waves may begin.
Waves: W1=P0-1 case re-port (D3) · W2=P0-2 grids (D4/D5/D6) · W3=P1 batch
(D1/D2/D7/D8/D9/D13 + mobile overflow + index curation + footers + sticky-nav) ·
W4=P2 polish (D10/D11/D12 + spacing bugs + 404 + email affordance + accent discipline).

## Protect-list (never on the table, from the review §1)

Left-aligned one-sentence hero · scroll palette shifts · hand-drawn marks · copy voice
("Operator, not consultant." / "Send the role. I'll send the receipts.") · full
reduced-motion stop · /hire-me numbered receipts block · "trillions in assets" line
(operator-locked from before).
