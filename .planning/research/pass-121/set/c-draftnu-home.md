# c-draftnu-home

Reference: https://draft.nu (Pass-121 set, class C, ADD). Fallback https://jonathanstark.com not
needed; primary is live (200 at both viewports, no redirect, no login wall).

## 1. Index shape

Not an index. This is a single-scroll text page: one h2 headline, four paragraphs of body copy, a
four-item bulleted list of pain-point questions, a "What we do" subsection, an email-capture form,
and a footer. No cards, no grid, no list of entries with a repeated shape. At 1440 the fold shows
headline through the second bullet; at 390 the fold shows headline through the fourth bullet. Zero
"entries" in the index sense, so the rhythm-break question does not apply: the page is one column
of prose from top to bottom, and the only visual break is the dark footer band (2 screens down at
1440, about the same at 390 given the taller stack).

## 2. Featured entry

n/a. No index, no entries, nothing competing for a "featured" slot. The nearest analogue is the
headline itself, which is unclickable prose, not a card.

## 3. How a study opens

n/a. There is no case-study page reachable from this capture; the homepage does not name a client
or a result above the fold. It names the audience and the value proposition instead: "Want pretty?
Go somewhere else. Want impact? Hire us," then "Welcome to Draft, a small interaction design
consultancy... since 2012," then the qualifying question ("growing business making at least 7
figures"). First thing below the fold at 1440: the bullet list continues, then "You've come to the
right place" and the ARPU claim. At 390 the same content, more scroll to reach it.

## 4. The visual device standing in for photographs

Nothing. There is no photograph and nothing standing in for one: no figure, diagram, quoted
document, colour field, motif, or table. The eye is carried by type alone: a serif display
headline (Brabo/Georgia), bold inline spans for the qualifying phrase ("independent, product-led
software businesses"), and italic for emphasis ("really", "Hire us."). The one graphic element on
the page is the boxed wordmark "Draft" (an SVG logotype in a rule box), reused in the nav and
footer. This is authored to the site (the wordmark, the direct-address headline) but the page as a
whole reads as plain typography, not a designed visual system.

## 5. Motion grammar

None. `document.getAnimations()` returned an empty array both after load and after scroll, at both
viewports (see snippet below). The fold and fold-early screenshots (taken about 4.5s apart across
separate loads) are pixel-identical in layout, confirming no entrance animation. No signature
motion; nothing to list as sprinkle either.

## 6. Type scale and grid

From computed styles (snippet below), not the eye:
- 1440: largest active size 36px, body/paragraph 24px, ratio 1.5. Active sizes 12px+: 36, 28.08,
  24, 19.2, 18, 16 (six sizes). Single column, `.ten.columns` inside a twelve-column grid (content
  column, not full width), roughly 1030px at this viewport per the grid class.
- 390: largest active size 27px, body/paragraph 18px, ratio 1.5. Active sizes: 27, 24, 21.06, 19.2,
  18, 16, 13.5 (seven sizes). Full-width single column with standard side padding; stacks cleanly,
  no reflow surprises.
- Face: `Brabo, Georgia, serif` on both the h2 subhead and body paragraphs. One serif face only, no
  sans-serif or mono anywhere on this page. No `h1` element exists (see question 11); the h2
  subhead is the only heading before "What we do" (h3).
- Sentence case throughout, no uppercase display type.

## 7. Hand-made versus templated

Three things that could only belong to this site:
1. The direct, combative headline addressed to the reader in the second person ("Want pretty? Go
   somewhere else. Want impact? Hire us."), not a generic value-prop template.
2. The live local-time line in the footer ("It's currently 10:16 AM in Chicago," tied to "Draft is
   open 9a-5p Central Time, Monday through Friday"), a small, server/script-driven detail specific
   to how this consultancy presents its availability.
3. The boxed wordmark treatment of "Draft" as a stamp-like logotype, repeated at nav and footer,
   doing double duty as the "back to home" link.

Nothing from the DESIGN_BAR section 4 never-list is present (no client logo wall, no stock imagery,
no 3D, no mono-aesthetic terminal look, no cursor follower). Verdict: **hand-made, but plain**,
closer to tomcritchlow's calibration point than to a designed system. The distinguishing marks are
in the voice and small authored details, not in typography variety or layout invention.

## 8. The one mechanism worth taking

Draft states its whole value proposition as a single second-person headline with no supporting
hero image, then substitutes inline linked proof phrases in body prose ("over 150 clients,"
"pedigree," "bestsellers") for a logo wall or case-study grid, for the entire first fold, at both
viewports. This matches what section 1 expected ("voice-led, typographic solo-consultancy page
with named offers and no template tells") and adds one detail the row did not name: the named
productized offers live in the nav dropdown ("Do dropdown": Draft Roadmap, Draft Revise, Value
Retainer, Draft Teardown, Strategy Call), each with a one-line description, not on the homepage
body itself.

## 9. What is budget

150+ named clients and $3B in claimed captured ARRU/ARPU across them, a published book line
("bestsellers"), a run of public speaking engagements, and an active weekly newsletter with its own
subdomain (letters.draft.nu) and embedded signup form (Buttondown). This is reputation and audience
budget built over 14 years (since 2012), not a design/tech budget. It has none of the pool's 3D,
canvas, or illustration budgets; it does not even use photography.

## 10. Rule collision

None. The mechanism (a headline plus inline-linked proof prose, no imagery, no motion) touches no
DESIGN_BAR R-number and no CLAUDE.md motion line: there is no pin, parallax, cursor-follow,
animated figure, or GSAP involved. It is a copy/structure mechanism, not a motion or visual one, so
it would be a copy-editor and layout concern for /work's header and description, not a
motion-engineer one.

## 11. Capture facts

- URL captured (final, after redirects): `https://draft.nu/` at both viewports (primary; no
  fallback needed).
- Date: 2026-09-17.
- Viewport: 390x844 and 1440x900, device scale factor 2 for fold shots per protocol.
- Page height: 1519px at 1440, 1564px at 390.
- Consent banner: none present; JSON records `"consent": "none"` at both viewports.
- Blocker: none. Status 200 at both viewports.
- Entry text in initial HTML: yes. `grep -n "Draft" _raw/c-draftnu-home.html` and the h2 line
  confirm the headline and body copy are server-rendered, not JS-injected:
  `<h2 class="subhead">Want pretty? Go somewhere else.<br>Want impact? <em>Hire us.</em></h2>`
  (raw HTML, byte length 23442, status 200). No `<h1>` exists anywhere in the document; the
  `h1: null` in the capture JSON is correct, not a capture failure.
- Fallback used: no.
- Hover: no hover screenshot was produced (`"selector": "none found"`). This is expected, not a
  miss: the homepage has no case-study or work-index entries to hover; the only clickable proof
  elements are inline text links inside body prose (`over 150 clients`, `pedigree`, `bestsellers`),
  which are not the kind of hover-card target the auto-detect heuristic looks for. Checked the raw
  HTML for a better candidate: no `/work`, `/project`, `/case`, or `/stud` hrefs exist on this
  domain at all (grep returned zero matches), confirming there is nothing on this page shaped like
  an index entry to hover.

### Animations snippet (both viewports, after load and after scroll)

```
1440: { afterLoad: [], afterScroll: [] }
390:  { afterLoad: [], afterScroll: [] }
```

### Type snippet

```
1440 fontSizes: [36, 28.08, 24, 19.2, 18, 16]
1440 h1: null
1440 paragraph: { fontFamily: "Brabo, Georgia, serif", fontSize: "24px", textTransform: "none" }

390 fontSizes: [27, 24, 21.06, 19.2, 18, 16, 13.5]
390 h1: null
390 paragraph: { fontFamily: "Brabo, Georgia, serif", fontSize: "18px", textTransform: "none" }
```

## Closing line

Mechanism to take (q8): a single second-person value-prop headline with proof delivered as inline
linked phrases in body prose instead of a logo wall or case-study grid. Rule it touches (q10):
none. It is a copy/structure register for /work's heading and description, not a motion or
DESIGN_BAR visual rule.
