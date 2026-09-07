# Pass 101 — Room and Ledger on the real site (branch `design/room-and-ledger`)

Operator, 2026-09-06: "Well arent you going to build the other pages in this style?" and
"I love website animations need more". Fable ruled the design in
`.planning/design/WINNING-BRIEF-2026-09-05.md` §1–§16 (read §14, §15, §16 in full; the mock's
source of truth is `.planning/design/winning/room-and-ledger.template.html`, verified over
seven rounds). This pass moves it into the Next.js site. EXECUTE on Opus; Fable judges at
the named checkpoints. No push, no deploy: the preview URL is the operator's push.

## 0. Ground rules that do not move
- Work on a new branch `design/room-and-ledger` from `main`, in a worktree. Commit as each
  unit lands ("Pass-101 …" subjects). Never touch `main`. Never push. Never deploy.
- The build gates stay: `pnpm build` runs copy-lint and the retired-phrases gate; never
  bypass. The harness hooks (`motion-discipline.sh`, `design-tokens.sh`, `copy-lint.sh`) run
  on writes; where a hook encodes a rule this pass supersedes (mono ban wording, the
  one-signature-motion rule, the font list), AMEND the hook and the constitution in the
  same commit with the reason quoted from §16, never bypass and never delete the gate.
- Copy: the live strings, verbatim, as the mock uses them (they are live strings). The
  mock's three departures (`See the rest →`, `millions in revenue`, `millions in contracts
  won`) and the no-years / no-figures rule apply to the HOME only; the other pages keep
  their live copy untouched until the wording round. `Four exits, $5B+ combined.` is live.
  The industry author is never named. The claims ledger (`docs/LESSONS_LEARNED.md` §3) binds.
- Facts, numbers, links, prices: from the live pages only. `PLAYBOOK_ON_SALE` logic and the
  buy button stay exactly as they are.

## 1. The system (one commit)
- `lib/fonts.ts`: Anybody (`next/font/google`, `axes: ['wdth']`, weights 300 and 500) as
  the display AND label face; Hanken Grotesk 400/500 as the text face; JetBrains Mono
  removed. Update `app/layout.tsx` variables, `.claude/brand.json`, `.claude/CLAUDE.md`
  (the "three faces" line, the mono rule, the motion section), `docs/DESIGN_BAR.md` R1/R15
  with the §16 rulings quoted and dated.
- Tokens in `app/globals.css` (Tailwind v4 `@theme`): keep copper `#C8542B`, add espresso
  `#0D0D0F` and bone `#F5EFE4` as the two grounds (the foyer paper / theater obsidian pair
  is replaced on the home only; other pages map paper→bone, obsidian→espresso). Two
  display sizes `--d: clamp(52px, 9.4vw, 136px)` and `--d2: calc(.76 * var(--d))`, the label
  style (14px, wdth 80, .04em, 500), the width ladder from the template.
- Lenis stays at the root layout (`syncTouch: false`). GSAP stays quarantined to
  `components/TitleCard.tsx`; the new motion is CSS transitions + IntersectionObserver +
  the clip's `timeupdate`, exactly as the template does it. ≤ 3 `@keyframes` site-wide.
- Video assets to `public/video/`: `a2-hold-720.mp4`, `a2-hold-720.webm` (encode with
  ffmpeg from `.planning/design/video/A2-hold.mp4`), `a2-poster-last.jpg`, `b-loop-720.mp4`,
  `b-loop-720.webm`, `b-poster.jpg`. Served as files, not data URIs. `preload="auto"`,
  `autoplay muted playsinline`, no loop on A, loop on B, IO pause off-screen, gesture play.

## 2. The home (`app/(foyer)/page.tsx` → components)
Port the template section by section into components under `components/room/`: `Bar`,
`Room` (the 16:9 stage, the fingertip positioning from CSS variables, the veil, §16.2 with
the copper row at the finger and §16.3-1 the lighting moment), `Operator`, `HowIWork`,
`Packages` (+ the Engagements tier), `Receipts` (two rows + See the rest), `Manual`,
`Objections`, `Ask`, `Foot`. Every measured rule in the template's comments is a test:
port `.planning/design/winning/verify.py` to `scripts/verify-room.py` (Playwright against
`http://localhost:3000`) and keep it green. The existing `Hero.tsx` (rolling word, pointer
drift) is retired from the home. The old home's sections that the ruling dropped are not
re-added.

## 3. The other pages, restyled to the system (one commit each)
- `/packages`: the three cards + the Engagements tier exactly as the home's section, with
  the page's own live copy (the feature lists, the buy buttons, the intro paragraph) inside
  the card geometry; the buy flow untouched.
- `/playbook`: the manual section's composition at page scale (cover left in the dashed
  frame, ledger right), then the page's existing content (chapters, the WallChart figure
  stays as the one figure animation, sample chapter, price/buy) in the system's type and
  grounds; `PLAYBOOK_ON_SALE` untouched.
- `/work`: the receipts index (name · caption · →) over all case studies; `/work/[slug]`
  theater pages: type system and grounds only (TitleCard stays).
- `/call` and `/about`: the operator section's register (clip B as a ground on /about,
  the register rows; /call keeps its form and logic, restyled).
- 404, robots, sitemap untouched.

## 4. Motion (§16.3, the whole set)
Implement all nine items in §16.3 on the home; items 2, 3, 4, 5, 7 on every other page.
`prefers-reduced-motion: reduce` disables all of it and shows finished frames.

## 5. Verification (the builder runs; a verifier re-runs independently)
1. `pnpm build` green (paste the last 20 lines).
2. `pnpm start` (or dev) on :3000; Playwright: every page at 390×844 and 1440×900, full
   page, to `.planning/qa/pass-101/`; the fingertip check (copper row cap-top ≤ 20px under
   the tip, "g" one hand's width right of the tip) at 1280/1440/1920/390/360; contrast of the
   two headline rows at three frames; both clips reach readyState ≥ 2 and play after a wheel
   event; the lighting moment fires (opacity of the copper row 1 after the arrival time).
3. axe (`a11y-baseline.sh` or `@axe-core/playwright`): 0 serious/critical on every page.
4. Lighthouse mobile on `/`: report Performance, LCP, CLS; the video hero will cost, report
   honestly, no gaming.
5. `prettier --check` passes; copy-lint passes; retired-phrases gate passes.
6. Zero `JetBrains`/`Bricolage` in any computed font-family on any page.

## 6. Return conditions
A hook that cannot be amended without deleting a check · a copy-lint failure on a live
string · a page whose live logic (Stripe, forms, flags) would have to change · Lighthouse
mobile Performance < 70 on `/` after the video is served as a file.

## 7. Rejected
Data-URI video on the site · GSAP outside TitleCard · a second accent · cursor effects,
scroll-jack, marquees, parallax on photographs · changing any price, fact or link.
