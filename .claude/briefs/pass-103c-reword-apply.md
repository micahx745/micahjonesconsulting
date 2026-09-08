# Pass 103c — apply the reword round (executor: Codex xhigh; runs on the operator's ticks)

Branch `design/room-and-ledger`, this worktree. Inputs: `.planning/copy/PASS-103-REWORD-TICK-TABLE.md`
(rows #1–#10; apply ONLY rows whose Tick cell is `[x]`), the juror's file
`.planning/copy/PASS-103-REWORD-JUROR-astra.md`, and the Pass 103 record `.planning/qa/pass-103/`.
Executors write; Fable commits (LESSONS #18). Never push. The rules of `pass-103-long-form-copy.md` §0
hold: no new fact, number, name, price or quote; first person; no banned word; no em-dash.

## 1. Section A rows (wording): replace CURRENT with the APPLY cell verbatim
Same method as Pass 103 Step D (JSX splits, entities, MDX line breaks preserved; never paraphrase).
Files: PK15 `app/(room)/packages/page.tsx`; AB06 `app/(room)/about/page.tsx`; GC08
`content/work/guardicore.mdx`; RF03 `content/work/rfp-engine.mdx`; PB05 `app/(room)/playbook/page.tsx`;
CA02 `app/(room)/call/page.tsx`. Widen the copy gate in `scripts/verify-room.py` per applied row,
cited `PASS-103 reword row N`; remove the superseded CURRENT entries.

## 2. Section B (the /about order), only if row 7 is ticked
Reorder `app/(room)/about/page.tsx` to: the film and the h1 with AB01/AB02 (unchanged, first) →
the **Currently** heading with AB10, AB09 (its own "Products I build from start to finish." label
travels with it), AB11, AB12 → the **What I'm known for** heading with AB03, AB07 (the Guardicore
photograph stays with AB07), AB08, AB06 → the **Receipts** label with AB04 and AB05 → the case-studies
CTA and the closing photograph as they are. No heading renamed, no paragraph reworded, no paragraph
dropped. The `:has(.cw-portrait)` two-column intro and every id/anchor keep working.
Verify: the rendered order of the first six words of each paragraph at 390, before and after, in a
table; axe unchanged; the page's heading outline (h1 → h2s) listed.

## 3. Section C rows (the playbook "What ships" statements) and Section D (the /about meta description)
Apply as ticked, verbatim. For D change `metadata.description` AND `openGraph.description` in
`app/(room)/about/page.tsx` (the OG copy drops the trailing "Oakland, CA." exactly as the current pair
does); confirm the render gate's metadata length limit still passes.

## 4. The packages subgrid rhythm (CSS, no tick needed; Fable ruling 2026-09-08 from packages-1440.png)
In the 103b subgrid, the shorter cards' description `<p>` keeps its own height, so its bottom hairline
hugs the text while the feature list's top hairline sits at the shared row's bottom, leaving two lines
with a void between. Make the description cell stretch to the shared row (`align-self: stretch` on
that child within `#packages .rl-cards > .rl-card` at ≥ 900px, or the equivalent) so the two hairlines
meet as one line at the same y in all three cards, as they already do in the Audit card.
Verify (Playwright at 1440): the y of the description's bottom border equals the y of the feature
list's top border ±1px in each card, and those y values are equal across the three cards.

## 5. Gates and record
`pnpm build` green · `python -P scripts/verify-room.py` green (report the FAIL for `16.2-arrival` as
the sandbox's missing ffmpeg if it appears; Fable re-runs outside the sandbox) · axe on every changed
page unchanged · em-dashes ≤ 1 and average sentence length ≤ 25 per changed page · screenshots at 390
and 1440 of every changed page to `.planning/qa/pass-103c/` with `verification.md` (every command,
every number, every row: applied / not-found / return-condition). DO NOT COMMIT. Do not push.

## 6. Return conditions
A ticked cell that would change a ledgered number · a CURRENT string not found and not recoverable
across a split · the /about reorder breaking the two-column intro or an anchor · a banned word in a
ticked cell (copy-lint) · any change outside the ticked rows and §4.
