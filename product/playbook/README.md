# ⚠ MOVED — the book lives in its own repo now

**As of 2026-09-02, this directory is a frozen copy. Do not edit it.**

The book, its companion pack and its gates moved to:

    https://github.com/micahx745/the-80-percent-wall   (private)
    C:\Users\micah\Code\the-80-percent-wall

39 commits of history went with it via `git subtree split`, so the manuscript's
log is intact there.

## Why

Two Claude sessions were working this one tree — one on the website, one on the
book. Shared files, a single git index, and two budgets against one 5-hour
window. The book now has its own repo and its own session.

It also had a concrete cost. Two operator claim rulings from 2026-09-01 were
swept across the website and never applied to the book, because Typst is not
part of the Next.js build and no sweep walked this directory. A cross-model
review found them a day later. **Editing this copy recreates that bug**: the
book repo will not see your change, and the two will drift.

## What still lives here, and is correct

The site does **not** read this directory at build time. It ships three
generated base64 modules so the Stripe webhook and the free-chapter action can
attach files without filesystem tracing config:

- `lib/book-pdf.ts`
- `lib/companion-zip.ts`
- `lib/chapter1-pdf.ts`

Those are checked in and are why the site keeps building on its own. **They are
the deliverables a buyer receives.**

## How a book change reaches a customer

```bash
# in the BOOK repo
npm run build
npm run publish:site      # writes the three lib/*.ts modules into this repo

# then here
pnpm build
# deploy per docs/DEPLOY-RUNBOOK.md — operator-approved, both domains re-aliased
```

`publish:site` refuses to write anywhere that is not a real site checkout, and
prints a sha256 of each source so drift is checkable.

## Removing this directory

Deleting `product/playbook/` is safe for the site build — nothing here is read
at build or runtime. It was left in place rather than removed because another
session was working this tree at the time of the split. Removing it is the
right end state; do it when that session is idle, and keep the `lib/*.ts`
modules.

`scripts/ordani-claims-gate.mjs` in this repo still lists `product/playbook/src`
in its ROOTS. When this directory goes, drop that entry — the book repo has its
own copy of the gate covering the same rules.
