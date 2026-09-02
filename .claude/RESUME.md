# RESUME — micahjonesconsulting (2026-09-01 PM)

## HARNESS: model gate locked
`~/.claude/MODEL_ROUTING.md` (global + project CLAUDE.md point at it). Rule: **can a command
verify the next decision? No -> Fable. Yes -> Opus/Sonnet.** Cap: `CLAUDE_CODE_SUBAGENT_MODEL:
sonnet` globally; per-call `model:` outranks it and is mandatory. In use: copy + design legs
run `fable`, verify legs `sonnet`. Hooks cannot change the model.

## UNPUSHED: Pass-57/58 (88bbafe), Pass-59 (26e3ed7), Pass-60 (7f4774f)
Live production is still Pass-53..56c (musrbwwz4). Prod deploys are CLI, not git push.

Pass-60: author case study SPLIT into /work/content-engine + /work/rfp-engine (Fable wrote,
Sonnet verified; two defects caught and fixed: an invented "reads each RFP like a buyer's
committee" dek, and a stat reading "5 months" while prose said "five"). Old page RETIRED
(308 -> rfp-engine) because it carried the sector wording AND the same 8K->290K figures, so
the pair was matchable back to it; "equity" now at zero rendered instances. Guardicore: $1.2M
average deal size (SUPERSEDES the $150K delta) + trillions line RESTORED, both ledgered with
provenance. Ordani: every user count gone site-wide -> "active paying users", beta, public
release coming; a live "HIPAA-grade" in llms.txt found and fixed.

## NEXT: page-opening redesign — DIRECTION PROPOSED, AWAITING "go"
Operator: services/work/contact openings "underwhelming… premium without screaming AI".
Fable direction: /services = cut the header, two full-height columns split by one rule (menu
form); /work = espresso "lot 01" auction-catalogue opening ($80M at hero scale, Tel Aviv photo
as exhibit, provenance line), hand-set order via a frontmatter `order` key; /book = espresso
printed-timetable slot grid. Prerequisite it found: interior pages first-paint TERRACOTTA then
cross-fade to bone (globals.css ~1334) — server-render the opening world first. Also /work
currently sorts the author studies above Akamai.

## OPEN OPERATOR QUESTIONS
1. Photo rights: the 429-image set is 342 Pexels + 74 lemandjune + Getty + an AdobeStock
   _Preview (watermarked comp). Only lemandjune matches the live ordani-work.jpg shoot. Owned?
   Stock is banned by the constitution.
2. About: recommended AGAINST the Jerusalem photo (political read; sunglasses hide the eyes).
3. Tel Aviv photo still carries an Instagram location + avatar sticker to remove.
4. Ordani heading says "encryption at the row level", body says "row-level security policies".
5. SECRET ROTATION overdue (Resend, calendar ICS, Stripe test). 6. Stripe go-live.
7. tsx em-dash debt: 6 files / 13 over cap, queued not swept.

## Gotchas
- Windows heredocs mangle backslashes: write regex-bearing TS with Edit, not python.
- Python writes CRLF -> prettier --write touched TS/TSX before commit.
- Secrets never inline. Ordani never names vendors. HIPAA-compliant, never -grade.
