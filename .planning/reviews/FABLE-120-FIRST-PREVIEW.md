# Pass-120 first preview: the judge's ruling (brief §1.4 return condition 1)

Fable 5.1 standing in for Astra, 2026-09-16. One look. Read: the first-preview input, brief
section 1 (lines 1-156), CAPTURES.md, the nine contact sheets, and one grep pass over
`app/globals.css`, `components/TitleCard.tsx`, `components/color-worlds/WorkHeroClip.tsx`,
`content/work/ordani.mdx`, `app/layout.tsx`, `app/llms.txt/route.ts` for the exact lines the
fixes name. No source edited, nothing run, nothing deployed.

## 1. Verdict

The preview holds at 390 and 1440 for /work, /work/guardicore, /work/rfp-engine and
/work/birth-worker. Every study names its client and its result in the first screen on the dark
band, turns to paper on one copper (or sage) rule, and reads cleanly to a "Next" entry and "All
work"; /work leads with the $14M figure beside the Tel Aviv frame, the method line, four
four-point entries and the record block, and the record block's mono columns read as data, not
prose. Three things read as unfinished, all mechanical: the 13-word client descriptor set in
mono on the study band and the Next entry (rfp-engine's band at 1440 runs 95 mono characters on
one line; the same string is already Hanken on /work), ORDANI's title breaking "HIPAA- /
compliant" at 768 and below, and a stray inner rule in the stacked RFP table at 390. Nothing
here contradicts a section-1 ruling or the ledger; the Lighthouse L1b stop is a measurement
that compared two environments and is re-specified below, not a page defect. One section-1
ruling looks different from its name: the "900ms dim" renders as a cross-fade (both pages
visible at once at 220ms), which is the Phase 2 View Transition as it runs on the live site
today; I say so once here and rule within it in section 2.

## 2. Open item 2 (brief §3): arriving through the dim

Read from s8 (frames 94, 220, 273, 346, 450, 600ms after the click). At 94 the /work page is
still whole; at 220 the cream /work page and the dark band are double-exposed, both texts
legible; at 273 the cream ghost is faint; at 346 the band is clean with title line 1 in place
and line 2 not yet shown; at 450 both lines are present; 600 is the settled study. The
settle's CSS is `cs-settle 400ms cubic-bezier(0.16, 1, 0.3, 1)` with a 100ms delay on line 2
of a two-line title (globals.css 712-721), so the 600ms figure is 400ms per line plus the
stagger. Arriving through the dim, line 1's settle is veiled (it lands under the cross-fade
before the old page has cleared); line 2's arrival between 346 and 450ms is the visible part.

**Ruling: accept, no change.** Both timings are ruled; the two ways to make the settle fully
visible (start the settle when the transition's `finished` promise resolves, or sequence the
old page out before the new page in inside the 900ms) are new motion decisions, not fixes, and
belong to the motion-engineer's written approval at return condition 4. The double exposure in
dim-0220 is acceptable: it is the standard View Transition cross-fade at its midpoint, it is
what the live site does today between foyer and theater, and it never shows a broken frame.
Record for RC4: the motion-engineer may propose the old-out-then-new-in sequence within 900ms;
that proposal needs the operator's word because it changes what the eye sees, even with the
total unchanged. The direct-load settle frames (t150 onward "already settled") are consistent
with a 400ms expo-out curve at reduced capture resolution and do not indicate a defect; RC4's
approval must rest on a measured timeline (`document.getAnimations()` durations and delays on
`.cs-title__line`), not on screenshots.

## 3. Rulings on the failure list

### A (checks written before the rulings)
- U2, U3 (paper and footer): ACCEPT. Expected becomes `rgb(236, 227, 208)` (O8, applied to the footer too so the page ends on one ground; confirmed).
- U17 (ORDANI numerals): ACCEPT. Expected becomes `rgb(26, 24, 22)` (R3 ruling 2).
- U12 (Guardicore band image): ACCEPT. Expected becomes a `_next/image` URL containing `guardicore-band-960.jpg` (O5).
- T12 (ORDANI sage text): ACCEPT. Expected becomes 0 elements with sage `color`; the sage proof moves to the band rule (`border-color` or the pseudo-element), expected >= 1.
- S5 V5 rows 25-28: ACCEPT. Retired by O4; the §2.7 lines are the check.

### B (check or brief conflict, page right)
- V9 tenure regex: ACCEPT. The regex excludes the PageFooter's `© 2013–2026`; expected 0 after the exclusion.
- T9 rfp-engine figcaption: ACCEPT. The count excludes `.case-study-pull-quote figcaption`; photo figcaptions expected 0 (no-captions ruling intact).
- K1 "Flexport": ACCEPT. Raw hits allowed only inside JSON-LD `alumniOf` (the gate's existing exemption at `retired-phrases-gate.mjs:78`, hidden background like the dates); visible expected 0.
- K1 "back to home": ACCEPT. K1 is scoped to the visible text of /work and the five study routes; expected 0 there. `services/page.tsx:493` and `not-found.tsx:32` are outside Pass-120 and stay.
- K4 case: ACCEPT. The check goes case-insensitive; expected 1 per route (the capitalised client line).
- V6, V7, card1-120 redirect lines: ACCEPT the substitute. `curl -sI` reading the `location:` header (`location: /work#record`) is sufficient; curl 8.11 drops `%{redirect_url}` when the Location carries a fragment.
- C14 opengraph-image: ACCEPT the substitute. `C14-hashed.txt` (five 200 `image/png`) is sufficient; the check reads `og:image` from each page and fetches that URL.
- U21 two 404s: ACCEPT. On localhost expected exactly two 404s, both under `/_vercel/`; on the live domain (CARD 1) expected 0.
- U0 304: ACCEPT. page120's cache-off run is the evidence; expected 200.
- X5 EditorialTimestamp: ACCEPT. No importer and a calendar year, not tenure. Dead component; park its deletion for after the ship, not now.
- W1a, W1b: ACCEPT. Expected becomes `98` (the ruled O6 command produces 98 frames, 4.083s).
- W1i bite: FIX the check, not the media (section 4, F5). Frame 96 is frame 0 by design (O6).
- prettier: FIX (section 4, F4). DoD #7 is not negotiable; the brief's single-line forms yield to the formatter and C10's literal follows.
- brief lines 4924, 5392 `grep -iF`: ACCEPT the corrected form (LESSONS #34).

### C (real defects)
- T6 mono descriptor on `.cs-band__context` / `.cs-next__context`: FIX (F1).
- ORDANI "HIPAA- / compliant" at 768/390/360: FIX (F2), typographic, no copy change.
- C6 no-JS native controls: ACCEPT. The served `<video>` carries no `controls` attribute (WorkHeroClip.tsx 70-83: `preload="none" muted playsInline`, no autoplay); with scripting disabled the HTML spec tells the user agent to expose its own interface, so the controls are the browser's, and a no-JS visitor who can press play is the more honest outcome than a hidden control bar. C6's expected value becomes: `curl -s http://localhost:3200/work | grep -o '<video[^>]*>' | grep -c controls` prints `0`; the 1s-vs-5s rect diff under no-JS is reported, not gated.
- T15 `#record` at -0.3px: ACCEPT. Sub-pixel rounding of 0; the section's own 120px padding-top (80px at 760 and below) keeps the h2 clear of the fixed nav by design (globals.css 6366-6373), and adding `scroll-margin-top` would stack the nav height on top of that padding. T15's window becomes `-1 <= top <= 160`.

### C2 Lighthouse
- L1b: the stop stands as a stop on the comparison, not on the page. Localhost build vs Vercel production is two environments; the /contact calibration (+747ms FCP, +216ms LCP on an untouched route) proves the loop is not "the same loop" across hosts. Re-measured per F6.

### C4 OG cards
- ACCEPT as rendered (s9): five cards, one rule each, sage on ORDANI, the study title and result line legible. One confirmation, no fix: `grep -n -i 'font' app/work/\[slug\]/opengraph-image.tsx` (or wherever §3.10 placed it) must show the face §3.10 names being loaded; if the card face is a fallback, report it at the copy checkpoint.

### Also seen, no fix
- Body and dek wraps at hard hyphens ("east- / west", "North- / south", "award- / winning", "sales- / call", "deliver- / anything") are standard typesetting of compound words; accepted.
- The full-page /work seam at one viewport height is a capture artifact of the viewport-fixed ground; every viewport capture is clean.
- Neuton.AI's seven-word mono data column ("Technology acquired by Nordic Semiconductor, 2025") is data in the record block, accepted.
- The stale `.claude/CLAUDE.md` GSAP lines (Stack bullet, "What not to do") and the two-modes palette lines are outside O14; they go in the ship-gate doc sweep (RC3), not this return.

## 4. Fix-list (required before the build continues; run in this order)

**F1. Band and Next client descriptor to Hanken at label size** (mirrors /work, brief §3b).
- File `app/globals.css`, block `.cs-band__context {` (line 630): change `font-family: var(--font-cw-mono);` to `font-family: var(--font-cw-body);` and `letter-spacing: 0.06em;` to `letter-spacing: 0;`. Keep size, weight, line-height, color, margin.
- Same file, directly after the closing brace of the shared block `.cs-next__context, .cs-next__service { ... }` (opens at line 936), insert:
  ```
  .cs-next__context {
    font-family: var(--font-cw-body);
    letter-spacing: 0;
  }
  ```
  `.cs-next__service` ("AI engineering", "Positioning & GTM") stays mono: it is a label.
- Check: `grep -n -A4 '^\.cs-band__context {' app/globals.css | grep -c 'font-cw-body'` prints `1`; `grep -n -A2 '^\.cs-next__context {' app/globals.css | grep -c 'font-cw-body'` prints `1`; page120 T6 re-run prints 0 mono-prose findings on guardicore and rfp-engine at both widths.

**F2. Hyphenated title words do not break** (typographic; `title`, `titleLines` and the search title untouched).
- File `components/TitleCard.tsx`, replace lines 20-25 (the `lines.map` block) with:
  ```tsx
        {lines.map((line, i) => (
          <Fragment key={`${i}-${line}`}>
            {i > 0 ? " " : null}
            <span className="cs-title__line">
              {line.split(" ").map((word, j) => (
                <Fragment key={`${j}-${word}`}>
                  {j > 0 ? " " : null}
                  {word.includes("-") ? <span className="cs-title__nb">{word}</span> : word}
                </Fragment>
              ))}
            </span>
          </Fragment>
        ))}
  ```
- File `app/globals.css`, directly after `.cs-title__line { display: block; }` (lines 648-650), insert:
  ```
  .cs-title__nb {
    white-space: nowrap;
  }
  ```
  The `.cs-title__line:nth-child(...)` settle selectors (712-721) are unaffected: the new span is inside the line, not beside it.
- Rejected alternative: U+2011 in `title` and `titleLines[0]`. It would put a non-ASCII hyphen into the ledgered `<title>`, the OG title and JSON-LD, and Bricolage Grotesque's glyph coverage for U+2011 is unverified (a fallback glyph inside a 36-56px title is the defect this fix removes).
- Check: layout-gate re-run prints no `HIPAA- / compliant` line at 768, 390 or 360 (the three NEW findings gone); on /work/ordani `document.querySelector("h1.cs-title").textContent` is exactly `ORDANI: HIPAA-compliant CRM for birth workers`; `document.querySelectorAll(".cs-title__nb").length` is `1` on /work/ordani and `0` on the other four studies; the regenerated `study-ordani-curtain-390.png` wraps `ORDANI: / HIPAA-compliant / CRM for birth / workers`.

**F3. Stacked exhibit table: one rule between rows, none inside a row.**
- File `app/globals.css`, inside the existing `@media (max-width: 767px) {` block that begins at line 867 (the `.cs-exhibit thead` block), append before its closing brace:
  ```
    .cs-exhibit tbody tr + tr td + td {
      border-top: 0;
    }
  ```
  (`.cs-exhibit tbody tr + tr td { border-top: 1px solid var(--cs-rule); }` at 864 stays; at 1440 it still draws one row rule across both cells.)
- Check, at 390 on /work/rfp-engine: `[...document.querySelectorAll(".cs-exhibit tbody td")].filter(td => parseFloat(getComputedStyle(td).borderTopWidth) > 0).length` prints `1`; at 1440 it prints `2`. The regenerated `study-rfp-engine-worked-example-390.png` shows one rule, between the two rows.

**F4. Prettier (DoD #7), after F1-F3.**
- Run `pnpm exec prettier --write app/globals.css components/TitleCard.tsx`, then `pnpm exec prettier --check app/globals.css components/TitleCard.tsx`. Expected: `All matched files use Prettier code style!`.
- Re-run C10. If its literal single-line grep no longer matches, change C10's pattern to the prettier-formatted first line of the same declaration and record the old and new pattern in `served120.txt`. Expected: C10 PASS with the recorded pattern.
- Then `pnpm build` (15/15 gates) and re-run page120, template120, layout-gate, W5 and axe on the four judged routes plus ordani. Expected: the previously passing checks still pass; T6 and layout-gate now pass.

**F5. W1i bite check re-targeted, then the media commits.**
- In the W1i step, extract frame 48 instead of frame 96: `ffmpeg -v error -y -i public/media/work-hero-720.webm -vf "select=eq(n\,48)" -frames:v 1 "$TMP/webm-f48.png"` and run the same ssim compare against `work-hero-poster-960.avif`. Expected: `All:` below `0.98` (measured 0.892). O6's end-state check (last frame vs poster) keeps its `>= 0.97` (measured 0.9928 / 0.9936). W1a/W1b expected `98`.
- Then commit `public/media` with the byte budgets from §3b restated in the message. Expected: `git status --short public/media` empty after the commit.

**F6. L1b re-measured in one environment (A4: "the same loop").**
- Retire the localhost-vs-Vercel number (3085 vs 2710) as a comparison; keep it reported.
- Build the base in a temporary worktree and serve it on 3201: `git worktree add "$TMP/p120-base" 73dde08 && (cd "$TMP/p120-base" && pnpm install --frozen-lockfile --prefer-offline && pnpm build && pnpm exec next start -p 3201)`. Run the loop that produced `.planning/exec/lh120/` (three runs, simulated mobile, cache off) against `http://localhost:3201/work` into `.planning/exec/lh120-base/`. Remove the worktree afterwards (`git worktree remove --force "$TMP/p120-base"`).
- `lh120-summary.mjs` prints one new line: `L1b-local: build <median>ms vs base-local <median>ms; LCP element build=<selector> base=<selector>`. PASS if the build median is at or below the base-local median.
- Expected honestly: if the base's LCP element is text (`h1` or the lead figure) and the build's is `video.cw-wx-lead__clip` (the poster), the line will FAIL by roughly the poster's load time; that is the cost of an image lead under Direction B, not a regression to trim, and the ship decision then rests on A4 (Speed Insights p75 for /work after release, read by the operator). The clip and poster are not removed, delayed or shrunk to pass. The only apples-to-apples lab that could settle L1b against production is a Vercel preview deployment measured by the same loop; that is the operator's to authorise (section 7).

## 5. Copy flags for the copy checkpoint (RC2, by curl)

- `app/layout.tsx:68` (PERSON_LD `description`) is third person ("Four exits behind his work") and carries "$20M+ in revenue behind my work." Replacement, exact: `$20M+ in revenue behind his work.`
- `app/llms.txt/route.ts:17` is third person ("ships his own products") and carries "\$20M+ in revenue behind my work." Replacement, exact: `\$20M+ in revenue behind his work.` (keep the escaped dollar as the file has it).
- `app/layout.tsx:32` (site `description`) is first person throughout; unchanged.
- Ruling: the ledgered fact (LESSONS #3, 2026-09-15) is the number and the claim shape "$20M+ in revenue behind [his/my] work"; the pronoun follows the surrounding voice of the surface. Apply at RC2 and add to the ledger row: "person-shifted to 'his' on third-person surfaces (PERSON_LD, llms.txt), judge 2026-09-16; number and claim unchanged". Show Micah the one-word change in the popup (section 7); if he says no, revert both to "my".
- RC2 also greps the ledger's NEVER-phrases across the five rendered studies and /work as brief §1.4 says; nothing in the captures suggests a hit.

## 6. Re-look

No separate re-look at this checkpoint. F1-F3 are mechanical and each carries a DOM or grep check a Sonnet leg can run; F1 mirrors a treatment already judged on /work. At the next return (RC2, copy by curl) attach three regenerated captures for a glance, not a checkpoint: `study-rfp-engine-curtain-1440.png` (Hanken descriptor on the band), `study-ordani-curtain-390.png` (title wrap), `study-rfp-engine-worked-example-390.png` (one rule). If F6 produces the "text vs poster" FAIL the input predicts, bring the `L1b-local` line and both LCP element selectors to RC2 as well.

## 7. For Micah

- Good: every study now opens by naming the client and the result on the dark band, then reads on cream; /work leads with the $14M beside your Tel Aviv frame. It looks finished on a phone and a desktop.
- Being fixed, no decision needed: the long client descriptor on the study bands moves out of typewriter type into the body face (as on /work); ORDANI's title stops breaking "HIPAA-/compliant" on phones; a stray line in the RFP table on phones; a code-formatting check.
- Your decision A (speed): the lab test compared the build on your laptop with the live site on Vercel, and your laptop adds about three quarters of a second even on a page we did not touch, so the "slower than today" reading is not trustworthy. Recommendation: say "preview deploy ok" and it gets measured on Vercel against the live site, no domain or production touched. If not, it is measured laptop-vs-laptop and the clip ships under your rule from Pass-119 (Speed Insights after release).
- Your decision B (one word): in the hidden search-engine bio and the AI-readers file the site speaks in third person, so "$20M+ in revenue behind my work" reads "behind his work" there. The number and the claim do not change. Recommendation: yes.
- For your information: clicking from /work into a study cross-fades, with both pages visible for a split second, exactly as the live site does today. Not changing it now; the motion review may propose a cleaner dim-then-reveal, which would come back to you.
