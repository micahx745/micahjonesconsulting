# Pass 116: Fable's six later-items from the 115b pre-merge look

Executor: GLM 5.3 via `scripts/claude-glm.ps1 -Batch` (cap reset, smoke OK 2026-09-12).
Worktree `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch
`design/live-evolve`. Do not touch the main checkout. Do not push. Do not deploy. Stage by
explicit path; `git commit -F <abs msg> -- <paths>` after printing
`git diff --cached --name-only`.

Production is live at `429e55a` / `dpl_BfViKgzf8bHDU5AwneqWDpsTUDLz` on both domains. Every
item below is non-blocking polish on shipped work, so nothing here may regress it.

Read first: this brief, `components/color-worlds/RevenueFigure.tsx`,
`components/hand/HandCircle.tsx`, `components/hand/HandUnderline.tsx`,
`.planning/exec/circle115.mjs`, `.planning/exec/countup114.mjs`,
`.planning/exec/card1-115.sh`, `content/work/postmates.mdx`, `app/(foyer)/page.tsx` around
line 490, `docs/LESSONS_LEARNED.md` entry #3 (the ledger) and #26.

## 0. The ruling

Operator 2026-09-12: "fix the later items from fable". Fable's pre-merge look returned SHIP
with six non-blocking findings. All six are fixed here. Two are copy rulings made by the
judge, stated as exact strings in §1; four are code, in §2.

Ledger facts that do not move (LESSONS #3): Neuton.AI "helped launch", NOT a cap-table
position, technology acquired by Nordic Semiconductor 2025, price undisclosed, **row tag
stays 2025, the acquisition year** (operator 2026-09-11, "for neuton 2025"). Postmates:
product analyst, acquired by Uber 2020 for $2.65B. Nothing here changes a number, a price,
a link, or a claim.

## 1. Copy (exact strings)

**`content/work/postmates.mdx`, line 26.** Replace the whole line
`That promise invited fraud. Some of the custom orders were never meant to be delivered.`
with
`That promise invited fraud.`
Reason, one line: the site's voice requires named numbers, the second sentence has none and
no provenance-safe example exists, and the first sentence is stronger alone (Fable).

**`app/(foyer)/page.tsx`, line 490.** Replace
`<span className="cw-lrow__tag">Helped launch · 2025</span>`
with
`<span className="cw-lrow__tag">Helped launch · exit 2025</span>`
Reason, one line: every other row reads `<noun role> · <exit year>`, so a verb-phrase role
made 2025 read as the launch year (the launch was 2020); naming the year as the exit keeps
the ruled fact and matches the section's own "Four exits I worked inside" frame. The year
2025 does not change. Do not touch the other rows' tags.

**`docs/LESSONS_LEARNED.md`, entry #3, appended immediately before its `**Gate:**` line:**
`- **Postmates fraud line carries no example, Neuton row names its year** (operator 2026-09-12, "fix the later items from fable"). The Postmates study reads "That promise invited fraud." with no second sentence; the home Neuton row tag is "Helped launch · exit 2025". The 2025 row tag is unchanged and still the acquisition year. NEVER: a fraud example on the Postmates study, or a bare "Helped launch · 2025" that reads as a 2025 launch. Gate: card1-115.sh markers (Pass-116).`

## 2. Code

**Item A: no loop blink on a refresh with the figure in view** (`RevenueFigure.tsx`).
Mechanism: the mount decision (reduced motion, in view at load) runs in `useEffect`, after
paint; `HandCircle`'s own effect has already hidden the paths (`play === false`), so one
painted frame can show no loop before `setInstant(true)` re-renders.
- At module scope add
  `const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;`
  (import `useLayoutEffect`). The `typeof window` guard keeps React's server-render warning
  away.
- The component's one existing effect becomes `useIsoLayoutEffect(` with the same body and
  the same empty dependency list. A layout effect's `setInstant(true)` re-renders before
  paint, so `HandCircle`'s first post-paint effect already sees `instant`.

**Item B: once per load, not once per mount** (`RevenueFigure.tsx`).
Mechanism: a client-side navigation away from `/` and back remounts the component, and the
count plays again.
- At module scope add `let playedThisLoad = false;` A module variable survives client
  navigation and resets on a full document load, which is the ruling's "once per load".
- First statement inside the effect: `if (playedThisLoad) { stateRef.current = "done"; setInstant(true); return; }`
- Set `playedThisLoad = true;` at the moment state becomes `"playing"` (inside the play
  observer, beside `setPlay(true)`). A figure that settled instantly and never played may
  still play once later in the same load.

**Item C: the hidden dash survives a resize before play** (`HandCircle.tsx`).
Mechanism: the hidden state sets dash `S S` and offset `S` from the size at arm time. The
figure's font clamps from 88px to 240px (a factor of 2.73), so a resize that grows it shows
the path's tail before the count starts.
- In the controlled `play === false` branch only: `strokeDasharray = \`${S} ${S * 4}\``,
  `strokeDashoffset = \`${S}\``. The path sits in the gap for any growth up to 4x. `drawIn`
  is unchanged: it measures a fresh S when it runs.

**Item D: `HandUnderline` gets the same dash fix** (unmounted today).
- Move `screenLength` out of `HandCircle.tsx`, unchanged, into a new
  `components/hand/strokeLength.ts` exporting `screenLength(el: SVGPathElement): number`.
  `HandCircle.tsx` imports it; its behaviour is byte-for-byte the same.
- In `HandUnderline.tsx`: reduced motion → `strokeDasharray = "none"`,
  `strokeDashoffset = "0"`. Otherwise at mount `S = screenLength(path)`, dash `${S} ${S * 4}`,
  offset `${S}`. On intersect: `S2 = screenLength(path)`, dash `${S2} ${S2}`, offset `${S2}`,
  then in a `requestAnimationFrame` the existing transition string (byte-identical) and
  offset `"0"`, plus a one-shot `transitionend` listener (`{ once: true }`) setting
  `strokeDasharray = "none"`.
- Nothing mounts it, so its render cannot be verified here. Report it as UNVERIFIED IN
  RENDER, in those words. Whoever mounts it first runs a C11-style coverage check.

No timing, easing, delay, geometry, prop, or approved-exception change anywhere.

## 3. New checks, proven to bite first

Add to `.planning/exec/circle115.mjs` behind a `--p116` flag (C1 to C11 keep running
without it). Reduced motion OFF for all three. Each prints `got` and `expect` and counts
toward `circle failures`.

- **C12 resize while armed.** Viewport 900x900 dpr 1. Load `/`, wait 500ms, scroll so the
  wrap's top sits at 1.5 times innerHeight (arm zone), wait 300ms, confirm the tick reads
  `$0M` (else print that the test is invalid and count a failure). Resize to 1400x900, wait
  400ms, scroll so 30% of the wrap's height shows at the bottom edge, wait 200ms. Measure
  primary coverage by the C11 method over only the samples inside the viewport:
  `C12 hidden after resize: got R, expect <= 0.02`. Then centre it and wait 3200ms:
  `C12 drawn after play: got R, expect >= 0.97`.
- **C13 once per load.** Viewport 1440x900. Load `/`, run the real play (arm zone, hold 250ms,
  centre, wait 3200ms). Scroll to 0, wait 300ms, click the header link `a[href="/work"]`,
  wait for the path `/work` plus 800ms, `page.goBack()`, wait for the path `/` plus 800ms.
  Confirm the wrap's top is below the fold (else invalid, counted). Arm zone, hold 250ms,
  centre, poll the tick every 50ms for 3200ms:
  `C13 texts after client back: got [...], expect ["$20M+"]`.
- **C14 no hidden frame on an in-view refresh.** Viewport 1440x900. Set CPU throttling to 6x
  through CDP (`Emulation.setCPUThrottlingRate`). Use `page.evaluateOnNewDocument` to install
  a poller: on every animation frame from `DOMContentLoaded` for 1500ms, read the first
  `.cw-rec .hand-circle path` inline `strokeDasharray` and `strokeDashoffset`; a frame is
  hidden when the dasharray is neither empty nor `none` and the offset is above 0. Load the
  home URL with the figure already in the first viewport (the same anchor countup114's chk3
  uses). `C14 hidden frames on in-view load: got N, expect 0`.

**Order of work (Git Bash, `MSYS_NO_PATHCONV=1`, exit codes read directly):**
1. The existing `.next` is the shipped 115b code. Start `npx next start --port 3200` (stop any
   earlier server on 3200 by PID with PowerShell `Stop-Process`). Add the `--p116` checks and
   run `node .planning/exec/circle115.mjs --p116` on the UNCHANGED build. **Expect C12 hidden,
   C13 and C14 to FAIL.** If any of the three passes on the unchanged build, that check
   cannot see its defect: stop, edit no component, report the raw block.
2. Stop the server. Apply §1 and §2. Static gates, each exit 0: `npx tsc --noEmit` ·
   `npx tsx lib/copy-lint-cli.ts` · `node scripts/retired-phrases-gate.mjs` ·
   `node scripts/accent-states-lint.mjs` · `node scripts/gsap-quarantine-gate.mjs` ·
   `npx prettier --check components/hand/HandCircle.tsx components/hand/HandUnderline.tsx components/hand/strokeLength.ts components/color-worlds/RevenueFigure.tsx "app/(foyer)/page.tsx"` ·
   `npx next build --webpack`. Never prettier an mdx or md file.
3. Start the server. `node .planning/exec/circle115.mjs --out .planning/qa/pass-116 --p116`
   → `circle failures: 0` (C1 to C14). `node .planning/exec/countup114.mjs` →
   `countup failures: 0`, then `git checkout -- .planning/qa/pass-114/`.
   `node scripts/render-gate.mjs` exit 0. `node scripts/axe-worlds.mjs http://localhost:3200 /`
   exit 0.
4. `.planning/exec/card1-115.sh`: give it an optional first argument, a base URL. With one, it
   checks only that base and skips the two deployment-id checks. Replace the
   `new postmates line` check with `postmates fraud line` (`That promise invited fraud.`,
   at least 1) and `removed fraud sentence` (`never meant to be delivered`, exactly 0); add
   `neuton row tag` (`Helped launch · exit 2025` on `/`, at least 1) and `old neuton tag`
   (`Helped launch · 2025<`, exactly 0). Run `bash .planning/exec/card1-115.sh http://localhost:3200`
   → `card1 failures: 0`. Stop the server by PID.

The standing clauses apply: a missed `expect` is a failure, never reinterpreted. You may fix a
measurement bug in a script once. Never change a threshold, a copy string, or a §2 method to
pass. On a remaining failure, stop before the commit and report.

**Captures** (`.planning/qa/pass-116/`, reduced motion on): `home-exits-1440.png` (the exits
list with the Neuton row), `work-postmates-body-1440.png` (centred on the fraud paragraph),
plus the `home-rec-done-1440.png` and `home-rec-done-390.png` that circle115 writes.

## 4. Rejected

- Moving the Neuton year to 2020: the ledger rules "for neuton 2025".
- "Launch team · 2025": claims team membership, more than the ledger's "helped launch".
- Adding "exit" to the other rows: churns approved copy that has no misread.
- A replacement fraud example: no provenance-safe fact exists.
- `sessionStorage` for once per visit: the ruling says once per load, and a module flag that
  resets on a full load is exactly that.
- A resize listener for the hidden dash: the 4x gap needs no listener and covers the clamp's
  2.73x range.
- Mounting `HandUnderline` to verify it: out of scope.
- Any timing, easing, geometry, or approved-exception change.

## 5. Commit

`Pass-116: Fable's later items (no loop blink, resize-proof hidden dash, once per load, two copy rulings, HandUnderline dash)`
with `components/color-worlds/RevenueFigure.tsx`, `components/hand/HandCircle.tsx`,
`components/hand/HandUnderline.tsx`, `components/hand/strokeLength.ts`,
`content/work/postmates.mdx`, `app/(foyer)/page.tsx`, `docs/LESSONS_LEARNED.md`,
`.planning/exec/circle115.mjs`, `.planning/exec/card1-115.sh`, `.planning/qa/pass-116/`.
The body carries the failing C12/C13/C14 lines from step 1 and the passing lines from step 3.
Then `.claude/RESUME.md` alone (merge from the committed file, at most 2500 bytes, `wc -c`
printed). Do not push.

## 6. Return (judge, at most 3 calls)

The before and after C12/C13/C14 blocks, `circle failures`, `countup failures`,
`card1 failures` for localhost, and the captures `home-exits-1440` and
`work-postmates-body-1440`. Then one Astra look at the two copy captures. Deploying is a
separate operator go-ahead.
