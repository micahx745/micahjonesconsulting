# Leg L5: the live claims sweep and its gate (sonnet)

Brief section 5, §2.7 for `llms.txt`, and §3.6.6's `/services` attribute. Read brief lines 24-114,
1013-1024, 2270-2283 and 4348-5030.

## YOUR FILES

- `app/(foyer)/page.tsx` — rows 1-12 and the §5.2 blocks.
- `components/color-worlds/RevenueFigure.tsx` — row 13.
- `app/(foyer)/about/page.tsx` — rows 14-16 and the §5.3 blocks.
- `app/(foyer)/services/page.tsx` — rows 17-20 and the §5.4 blocks, AND the §3.6.6 attribute
  (`<article key={service.slug} className="cw-area">` becomes
  `<article key={service.slug} id={service.slug} className="cw-area">`; apply it once).
- `app/layout.tsx` — rows 21-22.
- `app/llms.txt/route.ts` — rows 23 and 24 from section 5; for the study lines use §2.7 (brief lines
  1013-1024): replace the existing four study lines with exactly the five §2.7 lines, in that order.
  Section 5 rows 25-28 are SUPERSEDED (brief O4): do not apply them.
- `scripts/retired-phrases-gate.mjs` — every §5.5 edit (you are its only writer, O11).

Rows marked ACCEPT (29-39) sit in other legs' files: do not edit them.

## OVERRIDES

- **O4** as above.
- **O12**: the gate's self-test expected line is exactly
  `retired-phrases-gate self-test: 70 planted caught, 32 near misses passed`.

## CHECKS (paste raw output)

1. §5.6 V1 (self-test).
2. §5.6 V2 (the edited gate against the untouched `fffeb18` tree via `git archive`, which is read-only
   and allowed), with its per-file tally, against the brief's expected values.
3. Any other §5.6 check that needs no server and no finished build: name each one you ran and each one
   you skipped, with the reason.
4. Once, at the end, as information only (other legs are mid-edit, so this is not pass/fail):
   `node scripts/retired-phrases-gate.mjs; echo "exit=$?"`.
5. `git diff --stat -- "app/(foyer)/page.tsx" components/color-worlds/RevenueFigure.tsx "app/(foyer)/about/page.tsx" "app/(foyer)/services/page.tsx" app/layout.tsx app/llms.txt/route.ts scripts/retired-phrases-gate.mjs`.
