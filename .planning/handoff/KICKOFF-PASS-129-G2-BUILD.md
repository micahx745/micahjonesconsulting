# Kickoff: build the home Audit as the tab (G2), and land Pass-129a (written 2026-09-23)

Fresh chat in `p106-live` (Opus 5.5). Boot per `.claude/RESUME.md`; `get_usage` first. The previous chat passed 250K.

## 1. Land Pass-129a first (GLM ran it in this worktree; the diff may still be uncommitted)
Brief `.claude/briefs/pass-129a-ruled-lines.md` (lines 1A/2A/4A, Packages 2nd in the nav, both home packages links to
/packages, the W2 terms comma on home, /packages and the kickoff email in `lib/package-delivery.ts`).
- Read the digest `.planning/exec/pass-129a-digest.json` (`python scripts/harness/digest_check.py` on it), then
  `python scripts/harness/diff_scope.py .claude/briefs/pass-129a-ruled-lines.md`, then `git diff` of the four files
  (check E1-E8 against the brief's exact strings; the email file's non-ASCII bytes unchanged), then
  `.planning/qa/pass-129a/SHEET.png` (the longer door heading at 390, the five-item nav at 1440, the menu).
- If GLM never finished or failed: read its launcher output and receipt first (mechanism before retry).
- Commit with explicit pathspecs. Copy checkpoint: Fable (one call) + Astra (`codex-exec.ps1 -Review`); DeepSeek is
  dead ($-0.01), say so. Then his push popup; quote his words with the date in RESUME; CARD 1, both aliases, curl-verify
  the strings live.
- `.claude/launch.json` gained `mocks-129` (python http.server on 8129 over `.planning/mocks/pass-129/`).

## 2. The ruling (LESSONS #3 "THE HOME AUDIT BECOMES THE TAB (G2)")
He picked G2 on sight. Visual spec: `.planning/mocks/pass-129/g2.html` (serve with preview_start `mocks-129`; phone
http://192.168.4.60:8129/g2.html), clip `shots/g2-390.webm`, notes `MOCKS.md` (the builder's one change: set the
three area chips in Mono like the printed values). Strings: MOCK-BRIEF.md §G2 plus the W2 fine print
`Every fee credits toward the next package, or toward an engagement started within 60 days. Full refund before kickoff, none after.`

## 3. Write `.claude/briefs/pass-129b-offer-tab.md` (Brief-Format v2, lint it, commit it)
- Executor: an Opus 5.5 subagent (judgment-bearing: scroll-linked printing, the one-time assemble, the area wiring), on
  a branch cut from `design/live-evolve` AFTER 129a is committed. The builder of the mock is not the build.
- Replace only `#offer` in `app/(foyer)/page.tsx` (L197-257); a client component for the tab; `BuyButton` gets the
  picked area (Stripe `metadata.area`, as `PackageBand` does); unpicked, checkout asks (no guard on home); `?area=`
  deep link as PackageBand. Radios for the chips, aria-live on the swap, 44px targets.
- Motion: rows print tied to scroll position (CSS scroll-driven, a fallback where unsupported), `$2,500` assembles once
  (weight 200 to 800, the /work figure idiom), reduced motion = finished frame, no timers. Pass-128c's jank lessons
  apply (no page-wide colour transitions).
- Open check for the brief: the mock's stub is a dark ink pill on the bone slip. Grep how `.cw-buy` renders on a bone
  ground; if no existing variant fits, that is a new CTA style (DESIGN_BAR R17): ask him by popup with the capture.
- Verification: `pnpm build`; string greps; production build at 390/768/1440; Lighthouse mobile >= 95; axe 0
  serious; the money-wired check (open the checkout from a preview and read $2,500 on Stripe's page, with and
  without an area picked; playbook website-dev "Verify the destination, never the label").
- Rejected: G1, G3 (and its two derived prices), the mix; confetti, points, badges, timers, urgency.
- Checkpoints: Fable at the first preview (390 + 1440), copy by `curl -s | grep` against the ledger, buyer read at the
  ship gate; Astra at each; DeepSeek dead. His push words before anything ships.

## 4. Queue after this
128c phone verdict · 127c doors (brief now carries line 1A) · the rest of RESUME's queue.
