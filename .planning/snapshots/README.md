# Live-DOM snapshots

Ground truth for "what does the site actually say right now". A research
document, a review, or a resume is a reader; this is the page.

Regenerate: `python scripts/snapshot-live.py` (writes a dated directory here).

Each route yields:
- `<route>.txt` — visible text, `<script>`/`<style>` stripped, UTF-8 decoded,
  entities resolved. **Committed.** This is what claims get verified against.
- `<route>.raw.html` — the raw response. **Gitignored** (685K per run). Needed
  only for attribute-level checks; regenerate when you need it.
- `_report.json` — status, final URL, title, meta description, h1, em-dash count
  per route. **Committed.**

## Reading these correctly

- Open with python and `encoding='utf-8'` explicitly. `grep -oiF` returns FALSE
  ZEROES on this tree (LESSONS #1 territory).
- `.txt` includes the `<title>` text and the nav's "Menu —", so **two em-dashes
  per page is normal and is not a defect**. Body copy carries zero.
- Never verify against the RSC payload; it repeats page prose and doubles `$`.
  Stripping `<script>` already handles this.
