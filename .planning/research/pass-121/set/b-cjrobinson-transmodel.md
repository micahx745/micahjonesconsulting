# b-cjrobinson-transmodel

URL captured: https://cj-robinson.github.io/trans-model-leg/ (live, primary, no fallback needed).

## 1. Index shape

N/A: single long-form scrollytelling article, not an index of entries.

## 2. Featured entry

N/A: no entries; one continuous narrative built from a sequence of document exhibits.

## 3. How a study opens

**1440 first fold (reading order):** a facsimile of an Idaho legislative document ("LEGISLATURE OF
THE STATE OF IDAHO... HOUSE BILL NO. 500... FAIRNESS IN WOMEN'S SPORTS ACT", set in numbered-line
Courier type on an off-white card), then below it a white callout card in serif type: "Idaho's House
Bill 500 was introduced just like any other bill, at first glance." No nav, no logo, no site header,
no title, no byline are present anywhere in the first fold. The `-fold-early` capture (domcontent+
250ms) shows only the callout card, faded in on a grey ground; the bill facsimile has not yet
rendered/animated in at that point, confirming the document itself is entrance-animated.

**390 first fold:** identical structure, same two elements stacked, same absence of nav or title.

The page does **not** name the result above the fold at either width. It names the subject (Idaho
House Bill 500) but withholds the finding as a hook ("at first glance" implies a reveal to come)
rather than stating an answer. This is the opposite editorial choice from this project's
answer-shaped-lede ruling (take-list item 2): CJ Robinson opens on a mystery, not an answer.

**First thing below the fold:** the scrollytelling sequence continues immediately with a second
document exhibit (a Montana bill) and a side-by-side comparison. The real h1 ("The Legislative
Network / Behind State Trans Laws"), byline ("By C.J. Robinson") and the first real paragraph do not
appear until roughly 27% down the page (measured: h1 top = 7093px of a 26519px-tall page at 1440) —
several document exhibits run before the formal title/byline block. Cold-open structure: artifact
first, title and byline mid-scroll.

## 4. The visual device standing in for photographs

The whole page. Every screen without a photograph (all of them; there is no photograph on this page)
is carried by one of three devices, all keyed to the same investigation:

1. **Document facsimiles** — legislative bill text set as a numbered, monospace "document" card
   (Courier New 12px inside the card, on an off-white background with a drop shadow), with the
   operative title highlighted in yellow (e.g. "FAIRNESS IN WOMEN'S SPORTS ACT").
2. **A diff comparison** — two bill facsimiles side by side (Idaho HB 500, Montana HB 112) with
   matching phrases highlighted in green in both documents simultaneously, plus a floating white
   callout card between them: "The two bills are markedly similar. **Repeated phrases** appear
   directly used in the Idaho bill."
3. **Small multiples** — grids of miniature bill-document thumbnails, one per state, each labeled
   only with a two-letter state code and a year (MT 2021, WV 2021, DE 2021, IL 2021, RI 2022, MO
   2023, OR 2023, OK 2023, HI 2023...), building a "constellation" of how many states copied the
   language.
4. **A static ai2html map pair** (confirmed via a targeted scroll/screenshot beyond the frame cap of
   the default stitched capture): two US choropleth maps side by side, one per model bill
   ("Fairness in Women's Sports Act" / "Save Adolescents From Experimentation Act"), states shaded
   green where matching legislation was introduced, under the heading "Model Legislation Is
   Introduced Around the Country, Often by Less Well-Resourced Legislatures."
5. A Datawrapper bar chart (green bars, 2020–2025) with a conventional "Chart: C.J. Robinson ·
   Source: ACLU · Get the data · Created with Datawrapper" caption line is also present, mixed in
   with the bespoke devices.

All five are authored to this content — none could be reused on another story unchanged (the maps,
diff highlighting and small multiples are keyed to specific bills and states).

## 5. Motion grammar

- **Bill-container zoom-in**: trigger = in-view (IntersectionObserver-style), duration = 2000ms
  (bucket: over 1s), property = transform (scale, class `zoom-in`), once (`iter:1`), timeline =
  `DocumentTimeline` (confirmed via `document.getAnimations()` — **not** a ScrollTimeline, so it is
  not scroll-linked/scrubbed and does not reverse on scroll-up; it plays once to completion
  regardless of scroll speed).
- **Highlight-bill-title**: trigger = in-view (same gesture as above, paired), duration = 750ms
  (bucket: 400–1000ms), property = background-color/clip (the yellow/green highlight sweeping in),
  once, `DocumentTimeline`.
- No hover-triggered motion was found other than the browser default link-hover underline/color on
  inline citation links (confirmed via the hover capture: hovering an external citation link shows
  standard green-underlined text, nothing custom).
- Nothing pins or hijacks scroll in the sticky-viewport sense: each document exhibit is its own
  in-flow block that animates in once when scrolled to, not a fixed/sticky graphic with steps
  scrolling past it (the classic scrollama pin pattern). No continuous or looping motion anywhere.

**Signature motion:** the document zoom-in (2000ms, transform, once, in-view trigger) — every bill
facsimile on the page uses it as its entrance. The highlight sweep (750ms) is the sprinkle,
subordinate and always paired with a zoom.

## 6. Type scale and grid

Measured via `getComputedStyle`, not the eye (with one live discrepancy resolved below):

- **Display size (the real article h1, "The Legislative Network / Behind State Trans Laws"): 57.6px**,
  `"Libre Franklin", sans-serif`, identical at 1440 and 390 (does not scale down at 390; the two-line
  break via `<br>` keeps it fitting).
- **Body size: 16px**, `Georgia, serif`.
- **Discrepancy worth flagging:** the capture script's mechanical snippet (`document.querySelector('h1')`
  + the leaf-node `fontSizes` scan) reported the h1 as 12px `"Courier New"` and omitted 57.6px from the
  size list entirely. Direct investigation found why: the page marks up **every line of each bill
  facsimile's header as its own `<h1>`** ("LEGISLATURE OF THE STATE OF IDAHO", "HOUSE BILL NO. 500",
  "AN ACT", "CHAPTER 62", etc. — seven separate `<h1>` elements before the real one), all at 12px
  Courier New. `querySelector('h1')` returns the first of these, not the article title. The 57.6px
  headline itself was excluded from the leaf-node font scan because it contains a `<br>` child. This
  is a real, verified quirk of the page's markup (not a script bug) and is itself evidence for
  question 7 (semantic h1 reused seven times as document-facsimile styling — an authoring choice
  unique to this build, and not one to copy).
- **Active sizes ≥12px** (from the mechanical scan, both viewports identical): 28.8, 19.2, 18, 16,
  14, 12, 8 — seven sizes, plus the 57.6px display size the scan missed (eight total).
- **Body column width:** measured directly at 1440, the widest body paragraph's box is 480px wide
  (at 16px Georgia, roughly 55–60ch); at 390 it narrows to 310px (roughly 36ch), a straightforward
  fixed-margin reflow, not a multi-column layout at either width.
- **Case (display):** sentence case ("The Legislative Network Behind State Trans Laws"), not
  uppercase. The bill facsimile headers are uppercase, but that is quoted source text, not the
  site's own display voice.

## 7. Hand-made versus templated

Three things that could only belong to this page:

1. The document facsimiles rendered as pixel-accurate legislative printouts (numbered lines,
   Courier type, real bill headers) built specifically from this investigation's primary sources
   (Idaho HB 500, Montana HB 112, Arkansas Act 626, and others).
2. The side-by-side diff comparison with synchronized green phrase-highlighting and a floating
   verdict card ("Repeated phrases appear directly used in the Idaho bill") — a custom comparison
   UI keyed to this story's specific argument.
3. The paired ai2html choropleth maps titled by the two model bills' actual names, shaded to this
   dataset's findings.

No never-list pattern from this project's own motion-discipline rules (cursor-follow, scroll-jacking
sticky pin, marquee, mono-aesthetic-throughout) was observed: mono type is scoped to the quoted
documents only, body copy is serif, and the entrance motion is a once-only in-view animation on a
DocumentTimeline, not a scroll-linked pin. (DESIGN_BAR section 4 itself was not opened for this leg;
this check is against the CLAUDE.md motion-discipline list already in hand.)

**Verdict: hand-made.** Not the tomcritchlow plain-calibration case — this is a bespoke
data-journalism build with original narrative devices, not a template.

## 8. The one mechanism worth taking

The page sets quoted legislative text as a document facsimile (numbered Courier lines, yellow
highlight on the operative clause) that zooms in once when scrolled into view, for 2000ms, with a
paired 750ms highlight sweep.

This differs from what section 1 expected in one respect: the expected "source line" is not a
separate citation caption under each document. Instead the document's own official header (state,
chamber, bill number, session year) serves as its own citation, embedded in the facsimile rather than
appended below it — a sparer device than a true source line. Anything transferred to the RFP study
under take-list item 13 needs an explicit provenance line regardless, since the RFP fragment will not
carry an official government header the way a real bill printout does.

## 9. What is budget

A newsroom-scale investigative-reporting budget this site does not have: a 50-state corpus of scraped
legislative text, four named expert interview subjects (Logan Casey/Movement Advancement Project,
Jami Taylor/University of Toledo, Andrew Karsh/University of Minnesota, Maia Monet/The Center
Orlando), an ACLU dataset partnership, and a Datawrapper + ai2html production pipeline. None of that
transfers; only the document-facsimile and diff-highlight devices do.

## 10. Rule collision

The signature mechanism (once, in-view, transform, DocumentTimeline) is itself compliant with the
CLAUDE.md motion rules and with this project's own once-only in-view reveal condition (take-list item
7) in shape. Taken as-is, though, its **2000ms duration** collides with item 7's stated 400ms cap for
a permitted in-view reveal, and would fall under "any motion over 400ms outside the recorded
exceptions" — the section 5 POPUP line. So: none if the duration is trimmed to 400ms on adoption;
otherwise it is a named POPUP item.

## 11. Capture facts

- URL captured (final, after redirects): https://cj-robinson.github.io/trans-model-leg/ (no redirect).
- Date: 2026-09-17 (capture timestamp 2026-09-17T04:41:23.006Z per capture JSON).
- Viewports: 1440x900 and 390x844, dsf 2 for fold shots, dsf 1 for full-page stitches.
- Page height: 26519px at 1440; 31915px at 390.
- Consent banner: none present; no blocker.
- Entry text in initial HTML: confirmed. `grep -c "House Bill 500"` on the raw fetched HTML returns
  1 (found), and the page's `<title>` is "The Legislative Network Behind State Trans Laws" — the
  content is server-rendered/prerendered, not client-only.
- Fallback used: no (primary live, status 200 at both viewports).

### Snippet outputs (pasted from capture JSON)

**Animations** (`document.getAnimations()`, identical at both viewports, captured after scroll):
```json
[
  { "el": "DIV.bill-container svelte-16naiyl zoom-in", "dur": 2000, "iter": 1, "name": "svelte-16naiyl-zoomIn", "timeline": "DocumentTimeline" },
  { "el": "SPAN.highlight-bill-title", "dur": 750, "iter": 1, "name": "svelte-16naiyl-highlight", "timeline": "DocumentTimeline" }
]
```

**Type** (leaf-node font-size scan, identical at both viewports):
```json
{
  "fontSizes": [28.8, 19.2, 18, 16, 14, 12, 8],
  "h1": { "fontFamily": "\"Courier New\", Courier, monospace", "fontSize": "12px", "textTransform": "none" },
  "paragraph": { "fontFamily": "Georgia, serif", "fontSize": "16px", "textTransform": "none" }
}
```
(See question 6 for why this snippet's h1 reading is 12px Courier rather than the real 57.6px Libre
Franklin display headline, and the directly-measured correction.)

---

**Mechanism to take (q8):** quoted legislative text set as a numbered document facsimile with its
operative clause highlighted, zooming in once on scroll-into-view.

**Rule it touches (q10):** none if trimmed to the 400ms once-only-reveal cap (take-list item 7); at
its native 2000ms it is a named POPUP item under "any motion over 400ms outside the recorded
exceptions."
