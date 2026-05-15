# Plan 06-D — Work With Me page (app/(foyer)/work-with-me/page.tsx)

**Phase:** 06 Foyer Pages
**Plan letter:** D
**Wave:** 2 (parallel with 06-B / 06-C / 06-F)
**Requirements supported:** FOYER-06 (engagement cards + FAQ + CTA)
**Files touched:**
- `app/(foyer)/work-with-me/page.tsx` — CREATE

## Goal

Build the Work With Me page per blueprint §7:
- Hero line: "Three ways to work. One of them probably fits."
- Three stacked engagement cards (NOT gridded) — Strategy Sprint (2–4wk) / Embed (8–12wk) / Build (custom). Each carries name, meta line, one-paragraph description from orchestrator prompt's §"Engagement cards copy".
- FAQ with the four questions from blueprint §7: How much do you charge? / Do you take equity? / Will you sign an NDA before talking? / What if I am not technical?
- Single CTA to `/contact`.

## Steps

1. Create `app/(foyer)/work-with-me/page.tsx` verbatim from 06-RESEARCH §3.6.
2. The FAQ answers are drafted in research; manually scan each against `lib/banned.ts`. Confirmed clean: no "drive", "unlock", "leverage", "elevate", "synergy", "transformative", "game-changing", "best-in-class", "at the intersection of", or any of the 30 banned terms. "Translate" is not banned. "Operator instinct" is not banned.

## Verification

- `pnpm typecheck` clean.
- `pnpm lint:copy` clean.
- Visual: three cards stack vertically (not grid).
- FAQ renders as definition list (`<dl>/<dt>/<dd>`) per accessibility best practice — no JS accordion needed.

## Success criteria

- Engagement card 01 STRATEGY SPRINT copy matches orchestrator prompt verbatim.
- Engagement card 02 EMBED copy matches orchestrator prompt verbatim.
- Engagement card 03 BUILD copy matches orchestrator prompt verbatim.
- All four FAQ questions present in order per blueprint §7.
- Single `→ contact` CTA at page bottom links to `/contact` via ViewTransitionLink.
