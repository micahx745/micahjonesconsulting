# Pass-120 build brief: the /work index, five case studies, the live claims sweep

Written 2026-09-16 by the ruling tier (Opus 5) from the operator's rulings of 2026-09-15 and 16,
two Fable looks (.planning/reviews/FABLE-120-CRAFT.md, FABLE-120-DESIGN.md) and a five-facet
build map (.planning/briefs-prep/pass-120/). Sections 2 to 6 were drafted by five Opus writers,
attacked by three Sonnet reviewers (premises, rulings, executability) and fixed by their writers.
This section rules over them: where section 1 and a later section disagree, **section 1 wins**,
and every override below names the text it replaces.

## 1. The ruling

Rebuild /work and every case study as one release, in Direction B ("Curtain, then Page"): /work is
paper, with the lead study at hero scale over the operator's hero clip, one method line, four
four-point entries and a record block of four exits; every study opens on a dark band that names
the client and the result, then turns to paper for the read. The stories are the locked Pass-120
drafts, every fact ledgered. The same commit set sweeps every live claim the operator corrected on
2026-09-15 and 16. **Reason:** every reference in a fourteen-site set names its subject in the first
screen and sets long reads on light ground, and today's study hero hides both the client and the
result behind four words on black.

**Release rule.** Operator 2026-09-16: "Ship everything together." Nothing from this brief pushes,
merges to main or deploys without the operator's words that day, quoted in RESUME with the date.

## 1.1 Operator answers given after the sections were drafted (these win)

| # | Question | Answer, verbatim or picked, 2026-09-16 | Replaces |
|---|---|---|---|
| A1 | Hidden publish date for each study | "The release date of the rewrite" | S2 §2.3 `publishedAt` = first-commit date, and the BLOCKING paragraph at S2:291 and S2 §2.10. `publishedAt` for all five studies is the release date, written at the content commit as the date recorded in RESUME for the release (the executor stops and asks the judge for it if RESUME has none). S6 K8 checks datePublished equals that date. |
| A2 | Edit the premium-web `mdx-frontmatter.sh` hook | "Yes, edit the hook" | S2 §2.0 and §2.10 item 1: apply S2 §2.0's two-line edit before any §2.3 write, and record in RESUME: `hook edit approved by operator 2026-09-16 ("Yes, edit the hook")`. |
| A3 | ORDANI beta-user quote | "Drop it" | Confirms S2's omission. |
| A4 | How the clip's LCP condition is measured | "Field data, like Pass-119" | S6 §6.6 "stop rather than trim". Lighthouse runs as specified and its numbers are REPORTED, not gated, with one hard limit: /work's simulated mobile LCP on the build must not be worse than production /work measured by the same loop before any edit (record the baseline first). The LCP ship condition in DESIGN_BAR R12's exception is judged on Vercel Speed Insights field p75 for /work after release, read by the operator (the Pass-119 standard). |
| A5 | The soft 770px Guardicore photograph | "thought we would use the vid in the hero?" (the /work hero is the clip; the soft photo was the study band) | Judge ruling below, O5. |
| A6 | What visitors see before and after the clip | "what you recommmend is the best looking idea" | Judge ruling below, O6. |
| A7 | Study pages at 56/18 (3.1x) under R2's 4x | "what you think is best" | Judge ruling below, O7. |

## 1.2 Judge rulings and assembly overrides (these win over sections 2 to 6)

- **O1 publishedAt.** As A1.
- **O2 the hook.** As A2. If the hook still refuses after the edit, stop and report the refusal.
- **O3 LCP.** As A4. Add to section 6's ship conditions: "operator reads Speed Insights p75 LCP for
  /work after release"; it does not block the deploy.
- **O4 llms.txt ownership.** Section 2 §2.7 owns the five study lines at `app/llms.txt/route.ts:40-43`
  (they reuse each study's approved search description verbatim, LESSONS #2). Section 5 rows 25 to
  28 are SUPERSEDED; section 5 row 24 (the `:32` background line) stands.
- **O5 the Guardicore band still.** The band photograph on /work/guardicore is NOT
  `guardicore-telaviv-session.jpg`. It is a JPEG made from the clip's frame 0 (the graded real
  photograph, from the 1440 source, no sticker, colleagues at the edge), so the /work hero and the
  Guardicore band show the same frame. After section 3b's transcode step has produced
  `$TMP/work-hero-f0-960.png`, run exactly:
  ```bash
  ffmpeg -v error -y -i "$TMP/work-hero-f0-960.png" -q:v 3 "public/media/guardicore-band-960.jpg"
  ```
  Expected: the file exists, 960x1200, at most 180,000 bytes (`ffprobe -v error -show_entries stream=width,height -of csv=p=0` prints `960,1200`; `wc -c` at most 180000; over budget, stop and report). In guardicore.mdx the `hero` becomes `{ src: "/media/guardicore-band-960.jpg", width: 960, height: 1200, alt: "A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses." }`. Every check in sections 2, 3 and 6 that names `guardicore-telaviv-session.jpg` for the Guardicore study band now names `guardicore-band-960.jpg` (the /about page's own use of the session JPEG is untouched). `public/guardicore-telaviv.jpg`, the stickered file, is still deleted as section 2 says.
- **O6 the clip returns to its first frame.** The resting image before and after play is frame 0,
  never a generated frame. Before section 3b's two video transcodes, build a 1440 intermediate that
  crossfades the clip's last 0.5s back to frame 0, then point section 3b's `$SRC` for the MP4 and WebM
  commands at the intermediate (the poster and the O5 still still come from frame 0). The source is
  24fps, 97 frames, 4.0417s. Run exactly (Git Bash, from the worktree, with section 3b's `$SRC` and
  `$TMP` already set):
  ```bash
  ffmpeg -v error -y -i "$SRC" -vf "select=eq(n\,0)" -frames:v 1 "$TMP/clip-f0-1440.png"
  ffmpeg -v error -y -i "$SRC" -loop 1 -framerate 24 -t 0.5 -i "$TMP/clip-f0-1440.png" -filter_complex "[0:v]fps=24,format=yuv420p,setsar=1,settb=AVTB[a];[1:v]fps=24,format=yuv420p,setsar=1,settb=AVTB[b];[a][b]xfade=transition=fade:duration=0.5:offset=3.5417,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -preset slow -crf 12 "$TMP/clip-return-1440.mp4"
  SRC="$TMP/clip-return-1440.mp4"
  ```
  Then run section 3b's MP4 and WebM commands unchanged. Check the end state:
  ```bash
  ffmpeg -v error -y -sseof -0.05 -i public/media/work-hero-720.webm -frames:v 1 "$TMP/webm-last.png"
  ffmpeg -v info -i "$TMP/webm-last.png" -i public/media/work-hero-poster-960.avif -lavfi "[1:v]scale=720:900:flags=lanczos,format=yuv420p[p];[0:v]format=yuv420p[l];[l][p]ssim" -f null - 2>&1 | grep -o 'All:[0-9.]*'
  ```
  Expected: `All:` followed by a value of at least `0.97`. Lower, or any ffmpeg error: stop and report;
  do not change the filter. Re-measure section 3b's byte budgets on the new files; over budget, stop
  and report.
- **O7 R2 at study scale.** Studies keep 56/18 at 1440 (3.1x) and 36/17 at 390. A 112px figure does
  not hold across the anonymous studies (results such as "Bookings: 1–3 to 5–10 a month" and "up to
  800,000 impressions" wrap). Add to `docs/DESIGN_BAR.md` under R2 in the same commit as the template:
  `  - Exception (operator 2026-09-16, left to the judge: "what you think is best"): case-study pages set their largest type at 56px against 18px body at 1440 (3.1x) and 36px against 17px at 390, because a result figure at 112px wraps on the anonymous studies. /work keeps its 112px lead figure. Study pages only, not a precedent.`
- **O8 one paper ground.** The study body's paper uses the same ground as /work, the Color Worlds
  bone `#ECE3D0` (`--color-cw-bone`), not `--color-foyer-paper #F5EFE4`. In section 3's token remap,
  the paper token points at `var(--color-cw-bone)`. Every contrast pair section 3 computed on
  `#F5EFE4` is re-measured on `#ECE3D0` in section 3's checks, with the same thresholds (4.5:1 body,
  3:1 large text and UI). Any pair that fails: stop and report.
- **O9 the /work title.** `metadata.title` and `openGraph.title` on /work become exactly
  `Work: revenue, products, and exits` ("pipeline" no longer describes anything on the page).
- **O10 R16 and "award-winning".** Add to `docs/DESIGN_BAR.md` under R16, same commit as the content:
  `  - Exception (operator 2026-09-15, the RFP client's descriptor, "a award winning author/ Leadership consultant also for gov and corps"): "award-winning" may appear only in that client's descriptor on /work and /work/rfp-engine. Not a precedent for any other adjective.`
- **O11 one writer per file.** `.claude/brand.json`: one step applies section 3's `motion.signature`
  and `view_transition` edits and section 3b's `motion.heroclip` together. `app/globals.css`: section
  3b's line-range deletions run FIRST on the unedited file (boundary lines checked as 3b says), then
  section 3's selector-based edits, then section 3b's `.cw-wx*` insert above the Pass-110 comment,
  then section 3's inserts. `scripts/retired-phrases-gate.mjs`: section 5 §5.5 is its only writer.
- **O12 the gate count.** Section 5 §5.5 merged section 6's four ORDANI and title phrases. The
  expected self-test line everywhere, including section 6 G3 and its §6.2 note, is exactly
  `retired-phrases-gate self-test: 70 planted caught, 32 near misses passed`.
- **O13 the study OG image.** Section 3 §3.10 supersedes section 2 §2.2's three opengraph-image rows.
- **O14 `.claude/CLAUDE.md` prose, same commit as the template.** Rewrite, in both the worktree's
  `.claude/CLAUDE.md` and nowhere else: the "One signature motion" paragraph (the TitleCard is a 600ms
  settle entrance on a hero that names the client and result; the foyer-to-theater dim is 900ms); the
  "Content" bullet's required frontmatter fields to match section 2's schema; the CDC sentence (now
  true: ORDANI's figures render from `content/citations.ts`); Definition of done #1 (settle entrance,
  900ms dim). Exact replacement sentences are the executor's to place, using the facts in this list
  and nothing else; the judge reads the diff at the first return.
- **O15 judge acceptances.** "Once per load" for the settle means once per study page render (section
  3 open item 1). The nav's wordmark and link sizes are site chrome; R2's five-size count is scoped
  to `main` as section 6 measures it (section 3 item 14). The /work cross-link line ("The next entry
  in this record could be yours...") stays, outside `#record`. `llms.txt` keeps "Thirteen years" as a
  duration (section 5 §5.8 item 1).

- **O16 the release date, without a stall.** At the content step, ask Micah once (a popup) for the
  planned release date and record his answer in RESUME and the ledger. If he has none yet, write
  `publishedAt` as the literal `2026-09-16` in all five studies AND add a ship-gate check to section
  6's ship conditions: before any push to `main`, every study's `publishedAt` equals the deploy day
  recorded in RESUME; if not, update the five values in one commit and rebuild. Never ship a date
  that is not the release day (A1).

## 1.3 The rejected list

- **The generated clip with a caption or disclosure.** Operator 2026-09-16: "no captions not
  everything needs a caption... its for the aesthetic". No caption on any Pass-120 photograph or the clip.
- **A repositioning step on the RFP study** (Fable craft fix 6). The client was not repositioned
  (ledger #3, 2026-09-15).
- **290,000, 36x, "industry author", "same engagement", "client revenue since 2013", tenure years
  beside a role, ORDANI counts, the "hacked" line.** Each retired by a dated ruling; gated in §5.5.
- **Removing event years or the client descriptors.** The mock review did this by mistake; IPO 2018,
  Uber 2020, Akamai 2021, Nordic Semiconductor 2025 and both descriptors are restored.
- **The pinned TitleCard word stack.** Retired, operator-signed 2026-09-16.
- **A sticky sidebar, grey "Protected by NDA" boxes, stat trios on index entries, related-project
  card shelves, tracked-uppercase kicker labels.** Design ruling and references (FABLE-120-DESIGN §5).
- **Ken Burns drift or slow zoom on any still; a looping clip.** R15.
- **A 112px result figure in the study band.** O7.
- **A second Guardicore photograph as a chapter break.** One clean frame exists; it lives in the band.
- **Naming the birth worker's claims vendor or itemising her services.** Ledger #3.

## 1.4 Return conditions (when the judge comes back)

1. **First preview.** After the build passes section 6's static and served gates on localhost: the
   judge looks once at the captures section 6 names, at 390 and 1440, for /work, /work/guardicore,
   /work/rfp-engine and /work/birth-worker. Includes section 3 open item 2: arriving through the dim,
   is the 600ms settle visible or veiled?
2. **Copy on the page.** The judge reads rendered text by `curl -s` against the ledger's 2026-09-15
   and 16 rows, not by screenshot.
3. **Ship gate.** One buyer read of the built pages and one identity read of the two anonymous
   studies side by side (Astra's 2026-09-15 finding), including whether naming Medicaid narrows the
   birth worker's location too far. Fable stands in for Astra until 2026-09-19 (operator rule,
   2026-09-16).
4. **Motion-engineer written approval** of the settle entrance and the clip, recorded before the deploy.

## 1.5 Parked operator decisions

- The colleagues' okay to being animated is the operator's to hold (DESIGN_BAR R12 exception); the
  repo records nothing and asserts nothing.
- Speed Insights p75 LCP for /work after release (A4), and for / and /services (Pass-119, parked).
- ORDANI product screens, if he ever publishes one redacted.
- The ORDANI draft's comma ("Birth workers, doulas, midwives and perinatal counselors, were not
  running..."): placed verbatim per section 2; a punctuation fix needs his word.

---
