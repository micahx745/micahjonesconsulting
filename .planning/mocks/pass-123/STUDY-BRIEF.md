# Pass-123 build brief: the study band, evolved in the existing theme (Fable, 2026-09-19)

**Scope: FEEDS the existing theme. Changes ONE thing: the top band of the case-study template
(`app/(theater)/work/[slug]/page.tsx` lines 144-198, `components/TitleCard.tsx`, one new helper
`lib/title-figure.ts`, one new client component `components/StudyBandClip.tsx`, and the `.cs-band*` /
`.cs-title*` / `.cs-num*` / `.cs-poster*` CSS in `app/globals.css`). All five studies render through it. The
body of every study, the /work index, the home, `WorkHeroClip.tsx`, `WorkFigures.tsx` and every other page stay
exactly as they are. No study's copy changes in this brief: the cuts are proposals in `CUTS-PROPOSED.md` and
land only when the operator ticks them, in a later copy-only stage.** (LESSONS #39.)

Executor: GLM 5.3 in the stages of §5, one stage per run, stopping to report after each. Read-only shell is
free. No git command in the executor: the main session commits after each stage's checks pass. Port 3236 for
every `pnpm start`; stop it when the stage ends and confirm the port is free.

## 1. The ruling

The band's poster is the figure the title already carries. Three titles end in the result ("Repositioning
Guardicore:" / "$14M, then Akamai"; "AI RFP software:" / "$3M in signed contracts"; "AI content engine:" /
"up to 800,000 impressions"), so on those pages the title's own numerals ("$14M," / "$3M" / "800,000") are set
at /work's poster size in copper inside the h1, assembling once from weight 200 to 800 at first paint, with the
title's remaining words ("then Akamai" / "in signed contracts" / "up to" + "impressions") staying in ink at
the title size above and below them. The h1's text does not change by one character. The birth worker's title
has no figure, so there the Results lead ("Bookings from one to three a month to five to ten.") moves up under
the title as the poster block, its phrase "five to ten." at the words-poster size in copper, and the Results
row keeps only its second line. ORDANI gets no figure and no poster; its band changes nothing. On Guardicore
only, the band photograph plays the Tel Aviv clip once, layered over the preloaded photo, after the load event
and after the title has landed, then rests on the photo. Reason: the operator's ruling names the figures
($14M, $3M, Up to 800,000, five to ten) "like /work", and a band that says $14M at 36px in the title and again
at 240px under it is the trap he would reject on sight; the title cannot be reworded, so the title is the
poster, and every repeat left on the band (dek, Results row) is offered in `CUTS-PROPOSED.md` for him to tick.
The bar (LESSONS #3 PASS-122 rows): louder than today at 390, unmistakably this site.

## 2. Final copy as exact strings

No new copy. Every visible string is one that renders on the page today, verbatim, from frontmatter; the
change only wraps spans around them. The strings the new spans carry, exactly:

| Study | `.cs-title__kick` | `.cs-num` (the poster) | `.cs-title__tail` | `.cs-poster__lead` |
|---|---|---|---|---|
| guardicore | (none) | `$14M,` | `then Akamai` | (none) |
| rfp-engine | (none) | `$3M` | `in signed contracts` | (none) |
| content-engine | `up to` | `800,000` | `impressions` | (none) |
| birth-worker | (none) | `five to ten.` (class `cs-num cs-num--words`) | (none) | `Bookings from one to three a month to` |
| ordani | (none) | (none: zero `.cs-num`, zero `.cs-poster`) | (none) | (none) |

Line 1 of every title stays a plain `.cs-title__line` ("Repositioning Guardicore:", "AI RFP software:",
"ORDANI: HIPAA-compliant", "AI content engine:", "Growing a"). The h1's visible text, whitespace collapsed,
equals the frontmatter `title` on all five pages (check B1). The birth worker's Results row renders
`results.rest` only: "Thousands of dollars kept that used to go to claims-processing fees. Requests across
her whole range instead of one service." The other four Results rows are unchanged (lead + rest). The photo's
alt is unchanged. The clip has no caption, no disclosure, no text of any kind. No `[NEW COPY NEEDED]` arises.

## 3. Layout spec (existing tokens and classes only)

### 3.1 `lib/title-figure.ts` (new, server-safe, no React)
- `FIGURE_RE = /(\$\d[\d.,]*[KMB]?|\d{1,3}(?:,\d{3})+)([.,;:!?]*)/` (first match in a line). It matches a
  money figure or a comma-grouped number and the punctuation glued to it; it does not match "Day 3", "2021",
  "top-10" or a bare "800".
- `splitTitleFigure(line)` returns `null` or `{ kick, poster, tail }`: `kick` = text before the match,
  trimmed; `poster` = numerals + glued punctuation as ONE string (LESSONS #38: "ten<!-- -->." is how two text
  nodes render); `tail` = text after, trimmed. Results: "$14M, then Akamai" -> `{ kick: "", poster: "$14M,",
  tail: "then Akamai" }`; "$3M in signed contracts" -> `{ "", "$3M", "in signed contracts" }`; "up to 800,000
  impressions" -> `{ "up to", "800,000", "impressions" }`; every other title line -> `null`.
- `findTitleFigure(lines)` returns the index of the FIRST line with a match, else -1 (one hero number).
- `splitLeadPhrase(line, phrase)` (the /work `Headline` logic, verbatim in behaviour): `at = line.indexOf(phrase)`;
  when `at > 0`: `lead = line.slice(0, at).trimEnd()`, `rest = line.slice(at + phrase.length)`,
  `tail = /^[.,;:!?]*$/.test(rest) ? rest : ""`, `poster = phrase + tail`, `after = tail ? "" : rest`. For
  "Bookings from one to three a month to five to ten." / "five to ten" -> `{ lead: "Bookings from one to three a
  month to", poster: "five to ten.", after: "" }`.

### 3.2 `components/TitleCard.tsx` (the signature's file; server component, no import added)
Same props, same `titleCardSchema`, same `h1.cs-title[data-title]`, same word mapping (`.cs-title__nb` for
hyphenated words) inside every ink span. For the one line `findTitleFigure` names, render instead:
```
<span className="cs-title__line cs-title__line--figure">
  [kick ? <span className="cs-title__kick">{words(kick)}</span> + " " : nothing]
  <span className={"cs-num" + (poster.includes(",") ? " cs-num--comma" : "")}>{poster}</span>
  [tail ? " " + <span className="cs-title__tail">{words(tail)}</span> : nothing]
</span>
```
The joining spaces are `{" "}` text nodes between the spans, as the lines are joined today, so the h1's text
content stays the title. No other line changes.

### 3.3 `app/(theater)/work/[slug]/page.tsx`
- Two constants beside the imports, with a comment naming the twin: `const POSTER_PHRASE_SLUGS = new
  Set(["birth-worker"])` (twin of `app/(foyer)/work/page.tsx`; ORDANI is excluded by the 2026-09-19 ruling)
  and `const BAND_CLIP_SLUG = "guardicore"`.
- `const poster = findTitleFigure(cs.titleLines) === -1 && POSTER_PHRASE_SLUGS.has(slug) && cs.entry.figurePhrase
  ? splitLeadPhrase(cs.results.lead, cs.entry.figurePhrase) : null` (null when `indexOf` is not > 0).
- Inside `.cs-band__head`, after `<TitleCard />`, when `poster`:
  `<p className="cs-poster"><span className="cs-poster__lead">{poster.lead}</span>{" "}<span className="cs-num
  cs-num--words">{poster.poster}</span>{poster.after ? <>{" "}<span className="cs-poster__lead">{poster.after}
  </span></> : null}</p>`.
- The Results row's `<dd>`: when `poster`, render `results.rest` only (`.cs-glance__result-rest`); otherwise
  exactly as today.
- Inside `.cs-band__media`, after the `<Image>` (which is unchanged: same `preload`, `sizes`, class, alt), when
  `slug === BAND_CLIP_SLUG`: `<StudyBandClip />`.
- Nothing else in the file changes (the context line, the dek, the other glance rows, the body, Next, All
  work).

### 3.4 `components/StudyBandClip.tsx` (new, `"use client"`; modelled on `WorkHeroClip.tsx`)
Renders
```
<video ref className="cs-band__clip" width={720} height={900} preload="none" muted playsInline
  disablePictureInPicture disableRemotePlayback aria-hidden="true" tabIndex={-1}>
  <source src="/media/work-hero-720.webm" type='video/webm; codecs="vp9"' />
  <source src="/media/work-hero-720.mp4" type='video/mp4; codecs="avc1.640028"' />
</video>
```
No `poster` attribute (the photo under it is the poster), no `autoplay`, `loop` or `controls`, no `<track>`.
Behaviour, in this order, all in one `useEffect`:
1. Module flag `playedThisLoad` (its own, not shared with /work): if set, return.
2. Return without arming under `(prefers-reduced-motion: reduce)`, `navigator.connection.saveData === true`,
   or `effectiveType` "2g" / "slow-2g".
3. `const mounted = performance.now()`.
4. Arm on the window `load` event (or at once when `document.readyState === "complete"`): an
   `IntersectionObserver` on the video, `threshold: 0`.
5. On the first intersecting entry: disconnect; `wait = Math.max(0, 1200 - (performance.now() - mounted))`;
   `setTimeout(start, wait)`.
6. `start()`: if cancelled or `playedThisLoad`, return; set `playedThisLoad = true`; `video.muted = true`;
   `video.preload = "auto"`; listen once for `playing` -> `video.classList.add("is-playing")`; listen once for
   `ended` -> `video.classList.remove("is-playing")`; `video.play().catch(() => {})` (refused: the photo stays,
   nothing retries).
7. Cleanup: cancel, remove the load listener, disconnect, clear the timer.

### 3.5 `app/globals.css`, inside the PASS-120 STUDY TEMPLATE block, after `.cs-title__nb`
Add, with a header comment naming the ruling by date (never by quoting a retired string):
```
/* PASS-123 (operator 2026-09-19, LESSONS #3 PASS-123 STUDY PAGES SCOPE; DESIGN_BAR R2 amended):
 * the band's result figure at poster size. The head is the poster's size container. */
.cs-band__head { container-type: inline-size; }
.cs-title__line--figure,
.cs-title__kick,
.cs-title__tail { display: block; }
.cs-num {
  display: block;
  font-family: var(--font-cw-display);
  font-size: min(calc((100vw - 32px) / 3.6), 240px);
  font-size: min(calc(100cqi / 3.6), 240px);
  font-weight: 800;
  line-height: 0.86;
  letter-spacing: -0.035em;
  font-variant-numeric: lining-nums proportional-nums;
  white-space: nowrap;
  color: var(--cs-accent);
  margin: 0.04em 0 0.1em;
}
.cs-num--comma { margin-bottom: 0.16em; }
.cs-num--words {
  font-size: min(calc((100vw - 32px) / 4.6), 188px);
  font-size: min(calc(100cqi / 4.6), 188px);
  margin: 0 0 0.04em;
}
.cs-poster { margin: 28px 0 0; }
.cs-poster__lead {
  display: block;
  max-width: 30ch;
  margin: 0 0 0.3em;
  font-family: var(--font-cw-display);
  font-weight: 700;
  font-size: var(--fs-h2);
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--cs-ink);
}
.cs-band__media { position: relative; overflow: hidden; }
.cs-band__clip {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  opacity: 0;
  pointer-events: none;
}
.cs-band__clip.is-playing { opacity: 1; }
.cs-band__clip::-webkit-media-controls,
.cs-band__clip::-webkit-media-controls-enclosure { display: none !important; }
```
Why these numbers: `/3.6` is /work's numeral divisor (fitted to "800,000", 3.487em at this tracking); the head
is 358px at 390 (99.4px poster, "800,000" 347px, the same 11px slack /work ships) and 1184px at 1440, where
the 240px cap holds the poster to /work's own 1440 size (236.9px measured there), so the number a visitor
clicked on /work does not change size when the study opens. `/4.6` and 188px are /work's words divisor and
the same 1.28 ratio at the cap ("five to ten." about 339px at 390, about 819px at 1440). `min()` keeps one
formula from 390 to 1440 with no step between breakpoints. The vw line is the fallback where `cqi` is
unsupported. Copper is `--cs-accent` (sage would follow on ORDANI, which has no poster). The `--comma`
margin clears a hanging comma ("$14M,", "800,000") from the tail's cap line. `.cs-band__media` becomes the
clip's positioning box; the `<img>` keeps its intrinsic 4:5 box, the video covers it 1:1 (both 4:5, no crop).

The grid areas, the photo's column, the dek, the glance list and every other `.cs-*` rule are untouched. The
band's one hover-free, focus-free surface adds no state rule, so `accent-states-lint` has nothing new to read.

## 4. Motion

Allowed on this band and nothing else. Every timing is CSS unless named as the clip's JS.
- **The poster assembles once at first paint, no delay, no waiting state.** Weight 200 to 800 behind a clip
  rising off the baseline, 800ms, `cubic-bezier(0.2, 0.7, 0.1, 1)` (the /work move, on its own keyframes so the
  two pages never couple):
  ```
  @media (prefers-reduced-motion: no-preference) and (scripting: enabled) {
    .cs-title__line--figure { animation: none; }
    .cs-title__line--figure .cs-title__kick,
    .cs-title__line--figure .cs-title__tail {
      animation: cs-settle 400ms cubic-bezier(0.16, 1, 0.3, 1) 200ms backwards; /* motion-ok: the Pass-120 settle, on the figure line's ink words (Pass-123) */
    }
    .cs-title__line--figure:first-child .cs-title__kick,
    .cs-title__line--figure:first-child .cs-title__tail { animation-delay: 0ms; }
    .cs-title__line--figure:nth-child(2):not(:last-child) .cs-title__kick,
    .cs-title__line--figure:nth-child(2):not(:last-child) .cs-title__tail { animation-delay: 100ms; }
    .cs-poster__lead {
      animation: cs-settle 400ms cubic-bezier(0.16, 1, 0.3, 1) 300ms backwards; /* motion-ok: the Pass-120 settle, on the results-lead poster's words (Pass-123) */
    }
    .cs-num {
      animation: cs-assemble 800ms cubic-bezier(0.2, 0.7, 0.1, 1) both; /* motion-ok: one-time hero-number assembly at first paint, the /work move (LESSONS #3 PASS-122 RULES ON TRIAL, PASS-123 STUDY PAGES SCOPE) */
    }
  }
  @keyframes cs-assemble {
    from { font-variation-settings: "wght" 200; clip-path: inset(100% -10% -25% -10%); }
    to   { font-variation-settings: "wght" 800; clip-path: inset(-25% -10% -25% -10%); }
  }
  ```
  These rules sit inside the SAME media block as the existing `.cs-title__line` settle, after it. The
  figure line itself no longer settles (its ink words do, on the line's schedule); the poster's `both` fill
  leaves it at weight 800, unclipped. Only `font-variation-settings`, `clip-path`, `opacity` and `transform`
  change; no box dimension moves (the poster is `nowrap`, one line, fixed line-height), so no layout shift.
- **Order on a titled study:** 0ms line 1 settles (done 400ms) and the poster starts rising; 200ms the figure
  line's ink words settle (done 600ms); 800ms the poster lands at weight 800. Entrance complete at 800ms. On
  the birth worker: title lines at 0 and 200ms, the lead at 300ms (done 700ms), the poster 0 to 800ms.
- **The Guardicore clip (JS, §3.4):** arms on `load`; plays when any part of the photo is in the viewport, but
  never earlier than 1200ms after the component mounted, so on a fresh load the settle (600ms) and the poster
  (800ms) have landed before the picture moves, and on a client navigation from /work the title has settled.
  One play of the 4.08s clip; the video fades in over 120ms at `playing` (frame 0 is the photo, so the eye
  sees the room start to move, not a cut), fades out over 400ms at `ended`, and the photo is what remains.
  At 1440 the photo sits in the first viewport, so the beat plays there after the number lands; at 390 the
  photo is below the fold and the beat plays when the visitor reaches it. Add under the CSS above:
  ```
  @media (prefers-reduced-motion: no-preference) {
    .cs-band__clip { transition: opacity 400ms linear; } /* motion-ok: the clip resting back on the photo (Pass-123) */
    .cs-band__clip.is-playing { transition-duration: 120ms; }
  }
  ```
- **Reduced motion:** the finished frame. No settle, no assembly (the media query gates them; `.cs-num`
  computes `font-variation-settings: normal` and renders at `font-weight: 800`), no play (the component
  returns before arming; the video stays at opacity 0 under the photo).
- **No JavaScript:** the same finished frame (`(scripting: enabled)` is false; the video never plays; Chrome's
  forced controls are hidden by the `::-webkit-media-controls` rule as on /work).
- **Once:** the CSS entrance runs when the band mounts (a full load or a client navigation into a study, as
  the settle does today) and never replays on scroll, resize or re-render. The clip plays once per document
  load (module flag), never loops, never restarts.
- **Forbidden:** any scroll coupling, pin, sticky, parallax, cursor following, marquee, idle loop, ticker,
  stat bar, replay; GSAP (`scripts/gsap-quarantine-gate.mjs` stays as it is); any new dependency; any motion
  on ORDANI's band; any change to the TitleCard's own 400/200ms settle on non-figure lines.

## 5. Verification (commands with expected output; the executor reports raw lines, never a verdict on looks)

Standing clauses (from `.claude/briefs/README.md`, all binding here): count what renders; the executor never
reinterprets an expected value (a `got` that differs from `expect` is a FAIL: stop before the stage's report,
print the raw output, the judge rules); measure the render, not the model, and prove each check bites on the
BEFORE build first; scope from the layout and open the capture; no `grep -i` with `-F`; no copy defect is
parked; no check is passed by editing the work to fit it (no margin, size, string or class is tuned to reach a
number: report the number); contrast is measured at rest on the real ground (this band has no hover state;
say so in the report); overlap is measured on both axes from the render; the tenure-year grep excludes the
copyright line; scroll reveals are captured before and after their trigger (here the trigger is first paint:
frames at e0 and e1500 in Stage 4); the crossfade-contrast clause is N/A (the study pages are `data-mode="theater"`
with one static ground and no WorldSwitcher; state that line in the report).

Every check script prints `PASS <id> <slug> <W>: got <x>` or `FAIL <id> <slug> <W>: got <x> (want <y>)` and ends
`<script> failures: N` with exit 1 when N is not 0 (the `clip120.mjs` pattern). Puppeteer:
`createRequire("C:/tmp/p101tools/package.json")("puppeteer-core")`, Chrome
`C:/Program Files/Google/Chrome/Application/chrome.exe`, headless, no `--disable-gpu`; viewports 390x844 (DPR 2,
isMobile, hasTouch) and 1440x900 (DPR 1). Lighthouse: `C:/tmp/p101tools/node_modules/.bin/lighthouse`.

### Stage 0: BEFORE (no edits)
0.1 `git status --short` (read-only): the tree as the main session hands it over; report the lines.
0.2 `pnpm build` -> exit 0; the last line is `work-entry-gate: 5 studies — every entry figure+line renders.`
0.3 `node .planning/exec/route-js-bytes.mjs .next/server/app/work/guardicore.html` and the same for
    `.next/server/app/work/rfp-engine.html` -> two lines `files=N bytes=B kB=K`; record both as BEFORE.
0.4 `pnpm start -p 3236` (background). For each slug in guardicore rfp-engine ordani content-engine
    birth-worker: `curl -s http://localhost:3236/work/<slug> | node .planning/exec/visible-text.mjs | tr -s
    '[:space:]' ' ' > .planning/qa/pass-123/text-before/<slug>.txt` -> five files, each > 2000 bytes.
0.5 Lighthouse x3, mobile default: `C:/tmp/p101tools/node_modules/.bin/lighthouse
    http://localhost:3236/work/guardicore --only-categories=performance --output=json
    --output-path=.planning/exec/lh123/before/work-N.json --chrome-flags="--headless=new" --quiet` for N in
    1 2 3 -> three JSON files. Then `node .planning/exec/lh120-summary.mjs .planning/exec/lh123/before
    .planning/exec/lh123/before` -> prints three `run work-N.json: ... LCP <ms>, CLS <n>, LCP element <sel>`
    lines; record the median LCP and every LCP element selector as BEFORE (the script's L1b line compares the
    dir with itself and is ignored here).
0.6 Copy `.planning/exec/cls-attrib-123.mjs` to `.planning/exec/cls-study-123.mjs` taking `<baseUrl> <path>
    <outDir>` and loading `<baseUrl><path>` (scroll to the bottom of `.cs-band` plus one viewport). Run it for
    `/work/guardicore` and `/work/birth-worker` -> `.planning/qa/pass-123/cls-before/<slug>-<W>.json`; report
    the largest-session-window CLS per width (expect a number; record it as BEFORE).
0.7 Write `.planning/exec/band123.mjs` (checks B1-B10 and K1-K9 below, `<base>` argument) and run it against
    this BEFORE server -> the bite proof: expect FAIL on B2, B3, B4, B8 for guardicore, rfp-engine,
    content-engine, birth-worker (no `.cs-num`), FAIL on K1 (no `<video` on /work/guardicore), PASS on B1, B7
    (four studies), PASS on every ordani line. Save the output as `.planning/qa/pass-123/bite-band123.txt`.
0.8 Stop the server; `netstat -ano | findstr :3236` -> no LISTENING line.

### Stage 1: the title poster (`lib/title-figure.ts`, `components/TitleCard.tsx`, `app/globals.css` §3.5 + §4)
1.1 `pnpm build` -> exit 0, same last line as 0.2. `npx prettier --check lib/title-figure.ts
    components/TitleCard.tsx app/globals.css` -> `All matched files use Prettier code style!`
1.2 `node scripts/gsap-quarantine-gate.mjs` -> exit 0. `node .planning/exec/grep-if-gate.mjs` -> exit 0.
1.3 Tenure grep on the diff, copyright excluded: `git diff -- lib components app | grep -v "2013–2026" | grep
    -E "(19|20)[0-9]{2}[-–](19|20)?[0-9]{2}" | wc -l` -> `0`.
1.4 `pnpm start -p 3236`; `node .planning/exec/band123.mjs http://localhost:3236` -> B1-B6, B8-B10 PASS on
    guardicore, rfp-engine, content-engine and ordani at both widths; birth-worker: B2 reports `.cs-num` 0 and
    `.cs-poster` 0 (FAIL until Stage 2; report it as expected-FAIL for this stage, nothing else FAILs); K-lines
    still FAIL (expected until Stage 3). Stop the server.

### Stage 2: the results-lead poster (`app/(theater)/work/[slug]/page.tsx` §3.3 without the clip line)
2.1 As 1.1 and 1.3 (prettier on the page file too).
2.2 `pnpm start -p 3236`; `node .planning/exec/band123.mjs http://localhost:3236` -> every B line PASS on all
    five at both widths; K lines still FAIL. Stop the server.

### Stage 3: the clip (`components/StudyBandClip.tsx` §3.4, the media line in §3.3, the clip CSS in §3.5 and §4)
3.1 As 1.1 and 1.3 (prettier on the new component too). `node scripts/retired-phrases-gate.mjs` -> `clean`.
3.2 `node .planning/exec/route-js-bytes.mjs .next/server/app/work/guardicore.html` and rfp-engine.html ->
    AFTER bytes; expect `AFTER - BEFORE <= 6144` for each (report the two differences).
3.3 `pnpm start -p 3236`; `node .planning/exec/band123.mjs http://localhost:3236` -> every B and K line PASS;
    `band123 failures: 0`. Keep the server up for Stage 4.

### Stage 4: captures, sheets, speed
4.1 `.planning/exec/study-after-123.mjs` (from `study-before-123.mjs`: `<base>` and `<outDir>` arguments; the
    same `<slug>-<W>-{band,full,rm}.png` and `geometry.json`, plus `<slug>-<W>-nojs.png` from a fresh load with
    JavaScript disabled, plus for guardicore, rfp-engine, content-engine and birth-worker the entrance frames
    `<slug>-<W>-e0.png` (the first screenshot after `goto(..., {waitUntil: "domcontentloaded"})`), `-e150`,
    `-e400`, `-e800`, `-e1500` (ms after DOMContentLoaded, each labelled in `entrance-times.json` with the
    page's `performance.now()` at capture), plus for guardicore the clip frames `guardicore-<W>-clip-pre.png`
    (load+200ms, before play), `-clip-p0` (`playing`+100ms), `-clip-p2000`, `-clip-p3500`, `-clip-end`
    (`ended`+600ms), `-clip-rm` and `-clip-nojs` (load+3000ms); at 390 the clip frames are taken after
    `scrollTo(media.top - 200)` once `load` has fired). Run it: `node .planning/exec/study-after-123.mjs
    http://localhost:3236 .planning/qa/pass-123/study-after` -> 30 + 10 + 40 + 14 = 94 PNGs plus
    `geometry.json` and `entrance-times.json`. Open every frame.
4.2 Geometry: `geometry.json` AFTER vs BEFORE (`.planning/qa/pass-123/study-before/geometry.json`): ordani's
    block identical in every fontSize/fontWeight, and its `bandRect.height` within 2px of BEFORE; on the other
    four, `context`, `dek`, `glanceResult` (absent on birth-worker) fontSize/fontWeight identical to BEFORE,
    line 1 of `titleLines` identical; `.cs-num` present once. Print one PASS/FAIL line per slug.
4.3 Sheets, via `.planning/exec/compose-pass123-sheets.mjs` (from `compose-pass122-sheet.mjs`), labelled with
    slug, width and frame time, all saved under `.planning/qa/pass-123/sheets/`:
    - `study-before-after-390.png`: row 1 the five BEFORE bands (`study-before/<slug>-390-band.png`), row 2
      the five AFTER bands (`study-after/<slug>-390-band.png`), same order.
    - `study-before-after-1440.png`: the same at 1440.
    - `study-assembly-390.png` and `study-assembly-1440.png`: per poster study, e0 / e150 / e400 / e800 /
      e1500.
    - `study-clip-1440.png` and `study-clip-390.png`: clip-pre / p0 / p2000 / p3500 / end / rm / nojs.
    - `study-rm-nojs-390.png`: the five rm frames and the five nojs frames at 390.
    Open every sheet; report its path and pixel size. No verdict on looks.
4.4 Lighthouse x3 AFTER, as 0.5 into `.planning/exec/lh123/after/`; then `node .planning/exec/lh120-summary.mjs
    .planning/exec/lh123/after .planning/exec/lh123/before`. Expect, computed from the printed run lines: (a)
    no run's `LCP element` selector contains `video`; (b) AFTER median LCP <= BEFORE median LCP + 100ms (the
    script's own L1b line, which allows no tolerance, is reported, not acted on); (c) `L2` PASS (every run CLS
    <= 0.05); (d) the median LCP against the 1800ms reference is REPORTED. Plus one desktop run:
    `... --preset=desktop --output-path=.planning/exec/lh123/after/desktop-1.json` -> its LCP element selector
    contains `cs-band__img` (the photo stays the LCP image at 1440; report the selector).
4.5 CLS AFTER: `cls-study-123.mjs` for `/work/guardicore` and `/work/birth-worker` at both widths ->
    largest session window <= 0.05 each, and <= BEFORE (0.6); and zero layout-shift sources whose selector
    contains `cs-band`, `cs-title`, `cs-num` or `cs-poster` (print the count).
4.6 Visible text: for each slug, `curl -s http://localhost:3236/work/<slug> | node
    .planning/exec/visible-text.mjs | tr -s '[:space:]' ' ' > .planning/qa/pass-123/text-after/<slug>.txt`;
    `diff .planning/qa/pass-123/text-before/<slug>.txt .planning/qa/pass-123/text-after/<slug>.txt` -> no
    output, exit 0, five times (this pass cuts nothing).
4.7 `git status --short` (read-only) -> beyond what 0.1 listed, only these paths: `app/(theater)/work/[slug]/
    page.tsx`, `app/globals.css`, `components/TitleCard.tsx`, `components/StudyBandClip.tsx`,
    `lib/title-figure.ts`, the new `.planning/exec/*123.mjs` scripts, `.planning/exec/lh123/` and
    `.planning/qa/pass-123/`. Any other path is a FAIL.
4.8 Stop the server; confirm the port is free (0.8).

### The checks in `band123.mjs` (each on all five slugs at 390 and 1440 unless a slug is named)
- **B1 h1 text:** `main h1.cs-title` textContent, whitespace collapsed and trimmed, === the frontmatter
  `title` read with gray-matter from `content/work/<slug>.mdx`. Expect PASS x5 (BEFORE and AFTER).
- **B2 counts:** `.cs-num` count = 1 on guardicore, rfp-engine, content-engine, birth-worker and 0 on ordani;
  `.cs-poster` count = 1 on birth-worker, 0 elsewhere; `.cs-title__line--figure` count = 1 on guardicore,
  rfp-engine, content-engine and 0 on ordani, birth-worker; `.cs-title__line` count = 2 everywhere.
- **B3 strings:** `.cs-num` textContent equals the §2 table exactly ("$14M,", "$3M", "800,000", "five to
  ten."); `.cs-title__kick` = "up to" on content-engine and absent elsewhere; `.cs-title__tail` = "then
  Akamai" / "in signed contracts" / "impressions"; `.cs-poster__lead` = "Bookings from one to three a month
  to" on birth-worker; `.cs-num.cs-num--comma` present on guardicore and content-engine only.
- **B4 rest state (sampled at 1500ms after DOMContentLoaded, motion on):** `.cs-num` computed `font-size`
  99.4 +- 0.3px at 390 (77.8 +- 0.3px for `--words`) and 240px at 1440 (188px for `--words`); computed `color`
  `rgb(200, 84, 43)`; computed `font-variation-settings` `"wght" 800`; `el.getAnimations()` every
  `playState === "finished"`; every `.cs-title__line`, `.cs-title__kick`, `.cs-title__tail`,
  `.cs-poster__lead` computed opacity `1`; the h1's non-figure line and the kick/tail computed `font-size`
  36px at 390, 56px at 1440, `font-weight` 800; `.cs-poster__lead` 26px/700 at 390, 36px/700 at 1440.
- **B5 fit:** `.cs-num` bounding right <= `.cs-band__head` bounding right + 0.5px; `document.documentElement
  .scrollWidth` === 390 at 390 at scroll 0 and at every 422px step to the bottom of `.cs-band` (report the
  poster's width in px: expect about 247 / 183 / 347 / 339 at 390 for the four posters).
- **B6 overlap (both axes, from the render):** on the rest screenshot, within `.cs-band__head`'s rect, the
  number of pixel rows containing both a copper pixel (|r-200|<=30, |g-84|<=30, |b-43|<=30) and a bone pixel
  (r>=200, g>=190, b>=170) is 0; and the ink gap (lowest copper row to the first bone row below it, in CSS
  px) is REPORTED: expect 6-18px at 390 and 12-32px at 1440 (outside that: report, the judge rules).
- **B7 Results row:** `.cs-glance__result` count 0 on birth-worker and 1 elsewhere; birth-worker's
  `.cs-glance__result-rest` textContent = "Thousands of dollars kept that used to go to claims-processing
  fees. Requests across her whole range instead of one service."; the Results `<dt>` still reads "Results" x5.
- **B8 entrance (a rAF sampler installed with `evaluateOnNewDocument`, started at DOMContentLoaded, 2000ms,
  the `settle120.mjs` pattern), poster studies only:** over the samples of `.cs-num`'s computed
  `font-variation-settings` (parse the number after `"wght"`): the first sample's value < 800, the series
  non-decreasing (tolerance 1), the last value 800; `clip-path` in the last sample is
  `inset(-25% -10% -25% -10%)`; every `.cs-title__line` / kick / tail / lead opacity reaches 1 by 1000ms.
  REPORT (no pass/fail): the first sample's time and weight and its `clip-path` top inset (an animation
  that started at first paint reads well under 800 and a positive inset when the sampler is within 100ms of
  it), and the time the weight first reads 800 (expect <= 900ms after DOMContentLoaded). The e0 frame in
  Stage 4 is the visual record of the same moment.
- **B9 reduced motion and no-JS:** fresh load with `prefers-reduced-motion: reduce`: at DOMContentLoaded+100ms
  `.cs-num` `getAnimations().length` 0, computed `font-variation-settings` `normal`, `font-weight` 800; every
  title line opacity 1. Fresh load with JavaScript disabled: the head rect's pixels at load+300 and load+1500
  differ by at most 2 in every channel (the `clip120.mjs` decode) and the head rect is inked (luminance std
  > 10).
- **B10 contrast at rest:** for each visible text element in the band (`.cs-band__context`, each
  `.cs-title__line`, `.cs-title__kick`, `.cs-title__tail`, `.cs-num`, `.cs-poster__lead`, `.cs-band__dek`,
  each `.cs-glance dt`, `dd`, `.cs-glance__protected`, `.cs-glance__result`, `.cs-glance__result-rest`): the
  computed text colour against the median of a ground patch sampled from the band's own gutter beside the
  element (a 12x12 CSS-px patch at x 2-14 at 390; 24x24 at x 40-64 at 1440, at the element's vertical
  middle); for `.cs-num` also the median of its copper pixels against that ground. Expect >= 4.5 for text
  under 24px (under 18.66px at weight >= 700), >= 3.0 otherwise; print every ratio. Reference values:
  copper on the token ground computes to 4.32:1 and the grain lifts the ground a little, so `.cs-num` should
  read about 4.1 to 4.4 (PASS at >= 3.0); ink-soft labels about 6.5 to 7.1; ink >= 13.
- **K1 SSR (raw HTML, expect-0 style):** `curl -s http://localhost:3236/work/guardicore` contains exactly one
  `<video`, zero `<track`, and the tag carries `preload="none"`, `aria-hidden="true"` and `playsinline` (any
  case), and none of `autoplay`, `loop`, `controls`, `poster` (React may not serialize `muted` into the
  HTML; K2 checks the property instead); the other four pages contain zero `<video`.
  The page still carries one `<link rel="preload" as="image"` whose `imagesrcset` or `href` names
  `guardicore-band-960` (BEFORE and AFTER), and `img.cs-band__img` precedes `video.cs-band__clip` in the DOM.
- **K2 properties (1440, after play):** `muted true, playsInline true, loop false, controls false, 3.9 <=
  duration <= 4.2`; `currentSrc` ends in `.webm` or `.mp4`.
- **K3 plays once:** 1440: after `load`, `playing` fires; the video's `played` after `ended`: `length 1, start
  <= 0.05, end >= duration - 0.1`, `paused true`, `ended` within 8000ms after load; `performance.now()`
  at the `playing` event >= 1200 (the floor, measured from the document's time origin; the mount is later
  still, so this is the weaker bound and it must hold). 390: scroll the media into view after load, then
  the same lines.
- **K4 the clip is visible while it plays:** at `playing`+2000ms the video's computed opacity is `1` and the
  media rect's pixels differ from the `clip-pre` frame (mean absolute difference over the rect > 3 per
  channel); at `playing`+100ms the mean absolute difference from `clip-pre` is <= 10 (frame 0 is the photo).
- **K5 rests on the photo:** at `ended`+600ms the video's computed opacity is `0`, `is-playing` absent, and
  the media rect's pixels equal the `clip-pre` frame (max channel diff <= 2, luminance std > 10).
- **K6 reduced motion, save-data, no-JS:** as `clip120.mjs` C4/C5/C6 on `/work/guardicore`: `played.length 0`
  (rm, save-data), the media rect inked (std > 10) and static between load+300 and load+5000 (max diff <= 2);
  no-JS: no `is-playing`, the media rect inked and static.
- **K7 no caption:** zero visible text nodes inside `.cs-band__media`, and zero visible text nodes inside
  `.cs-band` whose line box starts within 120px below the media rect and overlaps it horizontally.
- **K8 nothing fetched before load:** `performance.getEntriesByType("resource")` entries whose name contains
  `/media/work-hero-720`: 0 with `startTime < loadEventEnd`; >= 1 after `playing`.
- **K9 frame 0 is the band photo:** in an about:blank page draw `/media/guardicore-band-960.jpg` and the
  clip's first frame (a `<video src="/media/work-hero-720.mp4" preload="auto" muted>`, wait for `loadeddata`
  at `currentTime` 0, then draw) each onto a 96x120 canvas; mean absolute difference per channel <= 12. Bite:
  the jpg against itself mirrored horizontally must read > 12 (print both numbers).

## 6. The rejected list

- The Results lead as the poster under the title on the three titled studies. Killed: "$14M" at 36px and
  again at 240px 100px apart; the operator rejects a repeated number on sight (PASS-122 /work cut 2).
- A new frontmatter field (`poster`, `bandFigure`). Killed: the title already carries the figure; LESSONS #38
  makes every field change a grep-every-consumer job; the schema is strict.
- Rewording any title, dek or Results string to fit the poster. Killed: copy is not on trial; the cuts list is
  the only path, and it is his to tick.
- Dropping the comma from the poster ("$14M" / ", then Akamai"). Killed: an orphan comma at the start of a
  line; punctuation joins the poster as one string, as "five to ten." does on /work.
- The kick or tail at a caption size (`--fs-h2`). Killed: the h1 stays one sentence at one ink size around its
  number; a third size inside the h1 reads as three headings.
- A poster larger than 240px at 1440 (the head is 1184px wide and could take 329px). Killed: the number the
  visitor clicked on /work is 237px; the study opens on the same number at the same size.
- Moving the photo above the dek at 390 so the clip beat sits in the first phone screen. Killed: at 390 the
  LCP is text today; a 49.6KB image in the first viewport moves the lab LCP toward the 1800ms line for a beat
  the visitor reaches one screen down anyway.
- The photo spanning the head row at 1440 (`"head media" "text media"`). Killed: the poster's one size across
  five bands cannot fit Guardicore's 7fr column between 1024 and about 1290px ("$14M," at 240px is 624px
  wide); every band keeps today's areas.
- Replacing the `<Image>` with a `<video poster>` (the /work markup). Killed: the preloaded `<img>` is the
  page's LCP image at 1440 and must stay it; the video layers over it, fetches nothing before load, and
  the no-JS/reduced-motion frame is the same `<img>` as today.
- An IntersectionObserver-armed assembly (`WorkFigures`). Killed: the band's poster is in the first viewport
  at load, where /work's own rule shows figures finished; a CSS entrance needs no JS and no waiting state.
- A delayed assembly (120 to 250ms after first paint). Killed: LESSONS #40, a waiting state is never empty;
  with `backwards` fill a delayed poster is a blank slot for the delay; delay 0.
- A once-per-document flag shared with `WorkHeroClip` so the /work -> study path plays the clip once. Killed
  for scope (it edits a /work component); noted in §8 for the operator.
- ORDANI's "hundreds of dollars" as a words poster. Ruled out by the operator ("ORDANI gets no number").
- "What changed as big numbers". Not ticked; the body is untouched.
- Any GSAP, any new dependency, any pin, sticky, parallax or scroll coupling. Banned.

## 7. Return conditions

- Routes: `/work/guardicore`, `/work/rfp-engine`, `/work/ordani`, `/work/content-engine`, `/work/birth-worker`.
  Viewports: 390x844 (DPR 2, mobile) and 1440x900. Ledger: LESSONS #3 "PASS-123 STUDY PAGES SCOPE", "RFP
  CONTRACT COUNT RETIRED", the PASS-122 rows; DESIGN_BAR R2 (amended 2026-09-19), R12, R13, R15.
- The main session opens every capture and every sheet itself before anything is called done (LESSONS #36,
  #37) and commits each stage after its checks pass.
- JUDGE (Fable, one call, <= 5 tool calls) after Stage 4, with: the seven sheets, `band123` output,
  `bite-band123.txt`, the Lighthouse summary, the CLS lines, the five empty diffs, the route-bytes deltas.
  It rules on the ink gaps (B6), the fallback-font frame at e0/e150 if the poster shows a different letterform
  before the swap, and the 390 first screen against the bar ("would a skeptical founder stop?").
- OPERATOR: `study-before-after-390.png` and `study-before-after-1440.png` go to him before anything ships
  (LESSONS #3 PASS-123 SCOPE: "A before/after at 390 and 1440 goes to him before anything ships"), with
  `CUTS-PROPOSED.md` as the tick list. Nothing is pushed, deployed or aliased in this brief.
- After his ticks: a copy-only stage edits exactly the ticked strings, rebuilds, and 4.6 is re-run: the
  visible-text diff per study shows the ticked strings and nothing else; then the second JUDGE look (a buyer
  read of the five bands at 390) and his push approval.
- Records at commit (main session, not the executor): `brand.json` gains `motion.bandposter` and
  `motion.bandclip` entries describing §4; `.claude/CLAUDE.md` "One signature motion" gets a Pass-123 line;
  DESIGN_BAR R12 gets the dated line for the band clip; the RFP FAQ ruling (§8) lands in LESSONS #3.

## 8. Parked operator decisions (facts and picks only he has)

1. The cuts: every item in `CUTS-PROPOSED.md`, ticked or not (T1a/T1b, G1-G6, R1-R6, O1-O6, C1-C6, B1-B6).
2. The RFP FAQ at `content/work/rfp-engine.mdx:91` says RFPs were "scored for fit" on day three; line 41 and
   the ledger say scoring came after day three. Options are in the final report (cut the FAQ; or remove the
   words ", scored for fit"; or keep). Not parked as a sentence to place: it is on the live page today and the
   executor does not touch it; he picks before the copy-only stage.
3. If he ticks G3 (the Guardicore dek's first sentence), the next sentence's "those buyers" has no antecedent:
   accept it, or one word changes by his pick (final report). Also "built in Tel Aviv" leaves the visible page.
4. The clip on the /work -> study path plays on both pages in one visit (independent once-per-load flags).
   Accept, or a follow-up that shares the flag (touches `WorkHeroClip.tsx`, outside this scope).
5. Push and deploy timing, and the ship approval after the before/after and the judge look.
