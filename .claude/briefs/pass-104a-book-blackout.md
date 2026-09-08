# Pass 104a — the book comes off the site, and the refund policy is corrected

Operator ruling, 2026-09-08, verbatim: "Okay not selling the book yet - i want it hidden on the
site for now." Asked how far "hidden" goes, he chose: hide it everywhere AND drop it from the
packages, described to him as "the cleanest break: the book simply does not exist on the site
until you say otherwise." Second ruling the same message, verbatim: "im not doing any refunds and
that shouldnt be a question (only refund is given if paid before a kick off call - if kick off
call happens and no work is done afterwards there is a prorated charge)".

Branch `design/room-and-ledger`, this worktree. Executors write; Fable commits (LESSONS #18).
Never push, never deploy, never run a Stripe script. NOTHING in Stripe changes in this pass.

## 0. What this pass does NOT do
It does not delete the `/playbook` page, its components, its server actions, its Stripe SKU, its
delivery code or its assets. Everything stays on disk and buildable so one commit brings the book
back. This pass removes every PATH to it and every mention of it.

## 1. Remove every link and label
- `components/room/Bar.tsx` (the home's section-00 bar) and `components/room/SiteBar.tsx`
  (the other pages' bar): delete the `Playbook` item. Re-space the remaining items so the bar
  still reads as a designed row, not a row with a hole; say in the report what you did.
- `components/room/Foot.tsx` and `components/room/SiteFoot.tsx`: delete the `Playbook` nav label,
  the book chip and everything in it ("The 80% Wall", "$99 at launch", "Get chapter one free").
  Re-balance the footer columns; a three-column footer whose third column is now empty is a defect.
- `app/(foyer)/services/page.tsx` ~line 468: the contextual "playbook" link. Keep the sentence
  working without it; if the sentence exists only to carry the link, cut the sentence.
- `app/sitemap.ts`: remove the `/playbook` entry.

## 2. Remove the home's Manual section
`app/(home)/page.tsx`: remove `<Manual />` from the section order. Leave `components/room/Manual.tsx`
on disk. The home then runs Room, Operator, HowIWork, Packages, Receipts, Objections, Ask, Foot.
Check the section numbering and any eyebrow that names a section number: if the sections carry
ordinals, renumber them so the sequence has no gap. Report the before and after order.

## 3. Remove the book from the packages promise
Two strings, both of them rows the operator ticked in Pass 103; his blackout ruling is later and
supersedes them, which the commit message must say.
- `app/(room)/packages/page.tsx` ~line 304, the terms paragraph, currently ending: "All three
  include The 80% Wall, my field manual for people building on their own, and its companion files.
  They arrive attached to the kickoff email the moment you buy." Delete those two sentences.
- The PK15 sentence, currently: "Each package goes straight to checkout. My kickoff email arrives
  the moment your card clears. It includes the intake questions and a link to book the call. The
  manual and its companion files are attached." Delete the last sentence only.
- `app/(room)/call/kickoff/page.tsx`: delete any row or line that promises the manual or its
  companion files.

## 4. Remove the book from the prose
- `app/(room)/about/page.tsx`: the AB12 sentence "I also wrote The 80% Wall, a field manual on
  what AI leaves to you once the demo works." and its link. Delete the sentence. The paragraph
  around it must still read; report the paragraph before and after.
- `content/work/ordani.mdx`, last line: "The manual I wrote from this build: The 80% Wall."
  Delete it. Check the other three case studies for the same pattern and report what you find.
- Grep the whole tree for "80% Wall", "chapter one", "the manual" and "playbook" in RENDERED
  strings (not comments, not file paths, not identifiers) and report every remaining hit with a
  judgement on whether it is reachable by a visitor.

## 5. Hide the page from search
`app/(room)/playbook/page.tsx`: add `robots: { index: false, follow: false }` to its `metadata`
export. Do the same for `app/(room)/playbook/thanks/page.tsx` if it is indexable. Do not touch
`app/robots.ts` and do not add a global rule.

## 6. The refund policy
The operator's policy, as he stated it: a full refund is available any time BEFORE the kickoff
call; after the kickoff call there is no refund, but if the work was not done he charges only a
prorated amount for what was done.
- `app/(room)/packages/page.tsx` ~line 303: "Full refund any time before kickoff. None after,
  because the work has started." becomes "Full refund any time before the kickoff call. After it,
  you pay for the work done and nothing more."
- `app/(room)/call/kickoff/page.tsx` ~line 53, the Refund row: "Full refund any time before this
  call, none after." becomes "Full refund any time before this call. After it, you pay for the
  work done and nothing more."
- `components/room/Objections.tsx`: DELETE the entire "What if it does not help?" question and its
  thirty-day refund answer. Leave the two remaining questions as they are; Pass 104b rewrites the
  whole section. A two-question list must still look composed, not truncated: check it at 390 and
  1440 and say what it looks like.
- Append to `docs/LESSONS_LEARNED.md` section 3, the verified-facts ledger, an entry recording the
  refund policy with its source (the operator, in chat, 2026-09-08), the exact words he used, the
  surfaces it touches, and a NEVER line: never state a thirty-day refund, a money-back guarantee,
  or "no questions asked" for any package or engagement.

## 7. Gates and record
`pnpm build` green (the render gate's metadata limits included) · `python -P scripts/verify-room.py`
against the built site, and UPDATE the copy gate: any check asserting a removed string must be
removed, and add checks that `/` and the footer contain no "80% Wall" and no "$99" · axe unchanged
on `/`, `/packages`, `/about`, `/call` · screenshots at 390 and 1440 of `/`, `/packages`, `/about`,
`/call` and the footer to `.planning/qa/pass-104a/` with `verification.md` listing every command,
every removed string, and the before and after of the bar, the footer and the home order.
DO NOT COMMIT. Do not push. A `16.2-arrival` failure saying ffmpeg is missing is your sandbox: note
it and continue.

## 8. Return conditions
A removed link that leaves an unreachable but still-linked page · the footer or bar looking broken
after the removals and no layout fix inside the existing system · a Stripe or webhook file needing
a change · any change to a price, a fact or a number · the build failing on a metadata limit.
