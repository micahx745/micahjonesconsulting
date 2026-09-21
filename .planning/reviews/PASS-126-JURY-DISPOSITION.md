# Pass-126 How I work redesign: the three juror reads and the main session's disposition (2026-09-21)

Preview `b9d4fe8` (p124-cuts, `preview/p126-how-i-work`). Prompt `.planning/prompts/PASS-126-HOWIWORK-CONFIRM.md`.
Verdicts, independently: **Fable SHOW HIM AFTER FIXES · Astra SHOW HIM AFTER FIXES · DeepSeek v4-pro SHOW HIM AFTER FIXES.**
All three: clearly better than the uppercase spec-sheet stack it replaces. Texts: `ASTRA-126-HOWIWORK-CONFIRM.md`,
`DSPRO-126-HOWIWORK-CONFIRM.md` and `FABLE-126-HOWIWORK-CONFIRM.md` (this folder). LEGS: fable=1 astra=1 dspro=1.

## Copy (the owed confirmation of the four steps; the words are locked, so flagged lines go to the owner)
- Scope, Stay: CONFIRMED by all three.
- Plan: FLAGGED by all three. "Something named ships in month one." (placeholder / garden path: DeepSeek, Astra,
  Fable); Fable also: "...before I build anything." repeats the headline's "before I build".
- Build: CONFIRMED by Fable and DeepSeek; FLAGGED by Astra: "That means sign-in, data, deployment, and where it stands
  on compliance, written down." (list mixes deliverables with a status; "written down" attaches to nothing clear).
- Rewrites drafted by DeepSeek v4-pro and Sol (`.planning/drafts/pass-126/*-two-lines.md`), ledger-checked, then to him.

## Design fixes adopted (agreed by two or more, or tie-broken)
1. "See the work" directly under Stay's body at every width, aligned to Stay's text, the home's mono-caps ink
   treatment on BOTH pages (all three; Fable: the /services copper link also broke "copper rules are the only copper").
2. Home 1440: one row gap (72px) and Build beside Plan, three bands (heading+Scope / Plan+Build / Stay) (Astra, Fable).
3. /services: the note "No discovery fee. Any one of the three areas below..." moves under the "Three areas of work"
   heading, where "below" points (Fable; Astra and DeepSeek both wanted it off Stay).
4. /services: 64px (48px phone) above the block (known); the gap above "Three areas of work" at least doubled (Fable).
5. 390: indents dropped; one text edge (TIE: DeepSeek "stronger", Astra "common edge", Fable "commit or drop";
   tie-break drop, because Build's largest headline was squeezed to three lines and the stagger read as nesting).
6. Home 390: the heading gets the step gap above it (Fable).

## Round-4 re-confirmation (2026-09-21), preview f023759
Astra SHOW HIM AS IS (new Plan body CONFIRMED); DeepSeek v4-pro SHOW HIM AS IS (CONFIRMED, no findings); Fable ONE MORE
FIX (CONFIRMED the new Plan body; judged every first-read finding landed, incl. the /services link in the page's own ink
style). Fable's three new findings, each MEASURED on the build by the main session before disposition:
1. Home 1440, Plan and Build headlines on one baseline: gutter measured 30px (Fable estimated ~36). ADOPTED: Plan on
   column 1 with a 48px inset at 1100+ (`214b2c4`), gutter checked >= 72 at 1440 and >= 56 at 1280.
2. Home 390, "Scope's rule about 20px under the heading": measured 58px (home) and 80px (/services). DECLINED: the
   estimate was wrong and 58px does not read as an underline.
3. 390 step gaps uneven: measured home 56/80/64, /services 44/60/48 (the phone offsets were never evened). ADOPTED:
   one value per page, home 64, /services 56 (`214b2c4`).
Texts: `ASTRA-126-HOWIWORK-RECONFIRM.md`, `DSPRO-126-HOWIWORK-RECONFIRM.md`, `FABLE-126-HOWIWORK-RECONFIRM.md`.
