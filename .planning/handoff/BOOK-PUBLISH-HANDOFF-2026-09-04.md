# Book publish handoff — what the site session applies after `publish:site`

Written 2026-09-04 by the book session (Fable). Source of truth for every number
here is the book repo at `Code/the-80-percent-wall`, HEAD after the cross-review
fix pass (`1e4b184`). Before applying anything, re-probe the two facts that move:

```bash
python -c "import pypdf;r=pypdf.PdfReader('C:/Users/micah/Code/the-80-percent-wall/output/the-80-percent-wall.pdf');print(len(r.pages));print(r.pages[1].extract_text())"
python -c "import zipfile;print(len(zipfile.ZipFile('C:/Users/micah/Code/the-80-percent-wall/output/the-80-percent-wall-companion.zip').namelist()))"
```

Expected today: `76`, eleven contents rows, `30`.

## What the book is now

| Fact | Value |
| --- | --- |
| Chapters | 11 |
| Pages | 76 |
| Companion files | 30 (11 checklists, 7 prompts, 11 templates, README) |
| Free sample | chapter 8, "The first ten users", 8 pages |
| Reader noun | solo founders |
| Revision stamp | 2026.09 |
| Price | $99 at launch, $149 after (ledgered 2026-09-04; the increase date is open) |

Contents page, as rendered:

| # | Title | Page |
| --- | --- | --- |
| 01 | Why your build broke at 80% | 3 |
| 02 | The spec is the moat | 12 |
| 03 | The architecture you didn't draw | 19 |
| 04 | Deploy day | 25 |
| 05 | The security pre-flight | 31 |
| 06 | Stripe in production | 37 |
| 07 | Compliance, when it matters | 44 |
| 08 | The first ten users | 50 |
| 09 | The page they land on | 57 |
| 10 | The distribution loop | 64 |
| 11 | When to hand it off | 70 |

## The sequence, and who runs each step

1. **Book session** runs `npm run publish:site` from the book repo. It writes three
   generated modules here: `lib/book-pdf.ts`, `lib/companion-zip.ts` and the NEW
   `lib/sample-chapter-pdf.ts` (`SAMPLE_CHAPTER_PDF_BASE64`, `SAMPLE_CHAPTER_FILENAME`
   = `the-80-percent-wall-ch8.pdf`). It does NOT touch `lib/chapter1-pdf.ts`, which
   is now orphaned: its source PDF no longer exists in the book repo, so nothing can
   refresh it and it silently serves a pre-Pass-79 chapter 1.
2. **Site session** applies everything below, builds, and stops at the ship gate.
3. **Operator** approves the deploy in writing; the approval is quoted with its date
   in this repo's resume before the command runs.

## Site edits, by file

Line numbers are from the Pass-98 brief section 8.4 and the book arc's round-1
verification; the cited text is the authority.

- `app/actions/playbook-signup.ts`
  - `:23` import `SAMPLE_CHAPTER_PDF_BASE64, SAMPLE_CHAPTER_FILENAME` from
    `@/lib/sample-chapter-pdf` instead of the chapter1 module; `:81` attach them.
  - `:62` subject "Chapter 1 of The 80% Wall — why your build broke at 80%" becomes
    the chapter-8 subject; suggested: `Chapter 8 of The 80% Wall — the first ten users`.
  - `:63-79` body: the paragraph describing chapter 1's contents becomes chapter 8's
    ("where the first ten users come from, why posting stopped working, the outreach
    that gets a reply, and the file that tracks ten people"); `:75` "ten chapters"
    becomes "eleven chapters"; `:106, :108` the notification copy says chapter 8.
- **Delete `lib/chapter1-pdf.ts`** and confirm nothing imports it (`grep -rn chapter1-pdf app components lib`).
- `app/(foyer)/playbook/page.tsx`
  - `:56` and the two metadata descriptions (`:202`, `:234`): "Ten chapters, 69
    pages, 26 files" / "26 companion files" → "Eleven chapters, 76 pages, 30 files"
    (and the matching phrasing in each).
  - `:83` `free: true` moves from the `01` entry to the `08` entry.
  - `CHAPTERS` array: eleven rows with the pages in the table above; insert
    `{ n: "09", title: "The page they land on", tag: <a tag in the array's own register, e.g. "Traffic or conversion, the one sentence">, page: 57 }`
    and renumber the loop to 10 (page 64) and the hand-off to 11 (page 70).
  - `:288`, `:470`, `:490`, `:495-497`, `:616`, `:637`, `:657` ("Chapter one, free"),
    `:381` ("Get chapter one free"), `:810` ("Not today? Chapter one is free, above"),
    `:824`: every "chapter one" that means the free sample becomes chapter eight,
    and any copy that describes the sample's contents describes chapter 8.
  - The spec card's companion count and "Nine templates" → 30 files, eleven templates.
- `components/color-worlds/PlaybookSignupForm.tsx` `:58`, `:77` ("Send me chapter one →").
- `scripts/build-xr-input.py` in `product/playbook/` is the frozen copy; do not edit
  it. `publish:site` does not refresh `product/playbook/src`; that frozen tree stays
  stale until the operator decides what to do with it (book repo `CLAUDE.md` names it).
- `docs/LESSONS_LEARNED.md` #3 still carries the wrong gloss "the 22 practitioner
  interviews and the two paid independent reviewers (one healthcare, one cyber
  security) are the team". The book repo's ledger records the operator's correction
  of 2026-09-02: "the two paid reviewer thing isnt true. Ordani now has a team with
  health care/ birth work professionals and cyber security experts." Apply it here.

## The ungated chapter (decision 3, ruled 2026-09-04)

Publish the same chapter 8 PDF at a public URL with no email gate, for Show HN and
search. Show HN's rules, fetched at source on 2026-09-04: "For books, a sample
chapter is ok"; sign-up pages are off topic; drop "barriers such as signups or
emails". The email form stays for the list.

## Ship gate, before the deploy

- `pnpm build` passes; the vendor gate, the retired-phrases gate and the render gate
  in the build chain are green.
- Cross-review of the assembled PDF: the book repo's round 1 had zero external legs
  (Gemini quota, Z.ai balance, Codex usage limit) and a same-family ledger audit whose
  seven adopted fixes are in `1e4b184`. The external round is owed when an account can
  run a leg; the harness in both repos is the same file (site `c41d406`).
- Operator approval, quoted with a date, in `.claude/RESUME.md` here.
