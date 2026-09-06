# Exo Ape — teardown

Slug: `exoape` · kind: studio · researched 2026-09-05

> **Copy-lint note (a finding, not a workaround).** This file could not be written verbatim:
> the repo's `copy-lint.sh` write-boundary hook rejected it twice, both times on **direct
> quotations of Exo Ape's project captions**. The words it caught are on this project's own
> banned list. Their caption register is precisely the register this project bans. Where a
> caption is blocked below it is described, not reproduced — marked
> `[caption withheld: trips copy-lint]`.

> **Scratchpad collision note.** The shared scratchpad `studios/` directory is being written by
> sibling research agents. A generic `work.html` I wrote was overwritten by another agent's
> Studio Freight capture between two tool calls, and unnamespaced `entry.js` / `allchunks.js`
> from another target contaminated a first library grep (it produced false `lenis` / `three.js`
> hits for Exo Ape). Every fact below was re-derived from `exoape-`prefixed files only.

## 1. Fetch proof

| URL | status | `<title>` |
|---|---|---|
| `https://www.exoape.com/` | 200 (`Server: Vercel`, `X-Vercel-Cache: HIT`) | `Exo Ape - Global Digital Design Studio` |
| `https://www.exoape.com/work/` | 200 | `Exo Ape - Work` |
| `https://www.exoape.com/studio/` | 200 | `Exo Ape - Studio` |
| `https://www.exoape.com/contact/` | 200 | `Exo Ape - Contact` |
| `https://www.exoape.com/work/ottografie/` | 200 | `Exo Ape - Ottografie` |

Nuxt 2 SSR (`data-n-head-ssr`, `/_nuxt/static/1779347953/payload.js`). One 74KB inlined
`<style>` block, no external stylesheet.

## 2. Type system (from the CSS, not the render)

**One family, three weights, self-hosted. No Google/Adobe link, no serif, no monospace.**

```
@font-face{font-family:Lausanne-300; src:/_nuxt/fonts/TWKLausanne-300.woff2, .woff}
@font-face{font-family:Lausanne-400; src:/_nuxt/fonts/TWKLausanne-400.woff2, .woff}
@font-face{font-family:Lausanne-500; src:/_nuxt/fonts/TWKLausanne-500.woff2, .woff}
```

TWK Lausanne (Weltkern). Each weight is registered as its **own family name** at
`font-weight:400` — so `font-weight` is never used to switch weight; the family name is.
The only `font-weight` values anywhere in the CSS are `400` (x5) and `inherit` (x1).

`font-family` declaration counts across the whole sheet:
`Lausanne-300` 23 + `var(--font-f-lausanne-300)` 22 = **45 of 52**. `-400` and `-500` get
2 apiece. **The site is ~90% the lightest weight**, at every size from 250px display down to
14px labels. There is no display/text split — display and text are the same face; the register
change is size, tracking and case, not family.

**No `clamp()` anywhere. The whole scale is raw `vw`,** swapped wholesale at breakpoints.
Desktop tokens (the wide-breakpoint block):

| token | size | line-height | letter-spacing | at 1440px |
|---|---|---|---|---|
| h0 | 17.361vw | 15.694vw | −0.799vw | 250 / 226 / −11.5px |
| h1 | 10vw | 10vw | −0.347vw | 144 / 144 / −5px |
| h2 | 3.611vw | 4.444vw | −0.104vw | 52 / 64 / −1.5px |
| h3 | 2.222vw | 2.778vw | −0.007vw | 32 / 40 / −0.1px |
| h4 | 1.667vw | 2.222vw | 0 | 24 / 32 / 0 |
| p | 1.111vw | 1.667vw | +0.007vw | 16 / 24 / +0.1px |
| p-small | 0.972vw | 1.458vw | +0.007vw | 14 / 21 / +0.1px |
| subtitle | 0.833vw | 1.111vw | +0.007vw | 12 / 16 / +0.1px |
| cta | 1.111vw | 1.111vw | 0 | 16 / 16 / 0 |
| label | 0.972vw | 0.972vw | 0 | 14 / 14 / 0 |

Mobile block is a separate set (h0 25.6vw, h1 16vw, p 3.733vw, about 14px at 375).

**The tracking rule is the whole system, and it is one line:** negative and steep at display
(−0.8vw at h0, −0.35vw at h1), crossing zero at h4, then *positive but tiny* (+0.007vw, about
+0.1px) at every text size. Live-DOM confirmation on the home h1: `font-size:250px`,
`letter-spacing:-11.5px`, `line-height:226px` (0.90). On the Ottografie h1: `144px / 144px /
−5px`. Labels and subtitles measured live at `14px / 0.1px`.

**No uppercase.** `text-transform` appears **zero times** in the entire sheet — labels
("Objective", "Visual Discovery", "Featured Projects") are sentence case at 14px, differentiated
by size and colour alone. There is no small-caps tier, no mono tier, no section-number face.

## 3. Palette (from the CSS)

Hex counts across the sheet — this is the *entire* list, six values:

| hex | count | role |
|---|---|---|
| `#0d0e13` | 35 | the ink / the dark ground (blue-black, not neutral) |
| `#fff` | 26 | the light ground and reversed type |
| `#e4e0db` | 24 | warm bone (secondary paper) |
| `#e0ccbb` | 24 | warm sand/clay (secondary paper) |
| `#070707` | 20 | near-black (media letterbox) |
| `#f8f8f8` | 16 | cool off-white |

Greys are not separate hexes — they are alpha ramps of the one ink:
`rgba(13,14,19,.2/.4/.6/.8)` at 16–17 uses each. That is the entire grey system.

**Achromatic in practice: yes, absolutely.** There is no accent colour in the CSS at all —
no hue outside the ink/paper set. The `theme-color` meta is `#ffffff`, the tile colour
`#0d0e13`. Live computed backgrounds on the case page confirm the same short list
(`rgb(255,255,255)` x19, `rgb(13,14,19)` x7, `rgb(24,23,22)` x7, `rgb(245,240,235)` x4).
**All colour on this site is photographic.** The chrome is monochrome; the work supplies the hue.
The two warm tones (`#e4e0db`, `#e0ccbb`) are the one concession — they exist so the paper can
warm slightly under interior and hospitality imagery.

## 4. Composition of the home first screen

Full-bleed video/photograph, edge to edge, no margin, no container. Type is laid over it in
white, bottom-left. Two text blocks and nothing else:

- **Positioning sentence, 3 lines, 21 words**, at about 24px: "Global digital design studio
  partnering with brands and businesses that create exceptional experiences where people live,
  work, and unwind." It names the category, the client type, and the sectors — no verb-flex,
  no claim.
- **Below it the 250px h0**, stacked one word per line: `Digital / Design / Experience`.
  Three words, three lines, 0.90 line-height, −11.5px tracking. The word stack is what fills
  the screen; the sentence is the footnote to it.

Alignment: left, hard against an 8.33vw gutter (about 120px). Nothing is centred.

Nav: **top bar, wordmark left, four items right** — `Work · Studio · News · Contact`.
14–16px, sentence case, evenly spaced, no underline, no button, no burger at desktop (a
`Menu`/`Close` pair exists in the DOM for small screens). Wordmark is a two-register lockup —
"exo" in the grotesk, "ape" in an italic — the only non-Lausanne mark on the site.
Bottom-right, small: `Scroll to explore`.

**Is the work the page? Not on the first screen, but yes on the second.** The first screen is
the studio's own sentence over a hero image. Featured Projects starts immediately after.

## 5. How work is shown

Home: `Featured Projects → Work` heading, one prose line ("Highlights of cases that we
passionately built with forward-thinking clients and friends over the years."), then **four
projects**, then a `Browse all work` CTA. Prose comes *before* the tiles, but it is one sentence.

Each tile is `Client name` plus a **five-word-or-fewer positioning line**, never a service list.
The four on the home:

- **Ottografie** — a three-word line about the photographer's body of work.
  `[caption withheld: trips copy-lint]`
- **Amaterasu** — "Frontier Health Innovation"
- **Columbia Pictures** — "Celebrating a Century of Cinema"
- **Cambium** — a three-word line about their sustainability business.
  `[caption withheld: trips copy-lint]`

`/work` index: **14 projects**, same two-line caption pattern, no filters, no years, no tags.
Long client names break across lines as typographic objects (`100 Years / Columbia / Pictures`;
`Plugged / Live / Shows`; `The / St. Regis / Venice`).

Media: **8 `<video>` on the home, 14 on `/work`, 9 on a single case page** (26–43 `<img>`
alongside). Everything moves; nothing is a static thumbnail. `object-fit:cover` x2 and
`overflow:hidden` x20 — tiles are cropping windows, and there is **no `aspect-ratio` in the
CSS at all**: ratios come from vw-sized boxes, not from the intrinsic media.

Hover: the transition dictionary is three lines long — `color .5s` x3,
`transform .5s cubic-bezier(1,0,0,1)` x3, `opacity .5s` x2. That `cubic-bezier(1,0,0,1)` is a
hard-snap ease (flat, then a violent middle, then flat) — it reads as an instantaneous swap
rather than a glide. No scale-up-on-hover, no shadow, no border.

Case page (`/work/ottografie`) — **26 `<section>` elements**, in a fixed rhythm:
hero name plus one-line dek → client / discipline chips (`UI & UX Design`, `Web Development`) /
sector chips (`Photography`, `Fashion`) / date (`January 2025`) / `Visit website` → then
alternating **big statement line** against **small labelled paragraph**:
`Objective` → `Solution` → `Visual Discovery` → `Dynamic UI` → `Dynamic gallery` →
`Otto's story` → `From the client`. The statement lines are set at h1/h2 and broken by hand
into two lines each — e.g. "Less interface, / more photography" and "The photographer /
becomes the subject". The 14px label is what tells you which register you are in.

## 6. The path to business

There is **no CTA on the home first screen.** The first ask is the nav item `Contact`.

The home's terminal ask is not a hire button at all — it is `Our Story` under a headline set
`Our / Story` and the line "The story behind Exo Ape is one of exploration, creativity and
curiosity." **The last thing the home page asks you to do is read about them, not brief them.**
The footer then carries the address, `hello@exoape.com`, the four nav items, and four social
links (Behance, Dribbble, Linkedin, Instagram).

`/contact` — the exact words:
- Heading `Contact`, then a horizontally repeating line in four languages:
  `Get in touch · 保持联系 · Ponerse en contacto · Neem contact op ·`
- One sentence: **"Ready for lift-off? Ping, tweet, message or poke — and we will get back as
  soon as possible."**
- Then three plain facts, big: `hello@exoape.com`, `+31 772 086 200`, and the street address
  (Willem II Singel 8, 6041 HS, Roermond, The Netherlands) with `View on maps`.

**No form. No calendar. No budget dropdown. No pricing anywhere on any page.** A mailto, a
phone number, and a street address — the contact pattern of a firm, not a funnel. `/studio`
sells the *how* instead: four numbered principles (`01`–`04`) with headings like "Elevating
sophistication across all senses" and "Simplicity is the dot on our horizon", plus a stated
partner sector list (Interior Design & Furniture / Architecture & Real Estate / Hospitality,
Travel & Tourism) — qualification copy standing in for a price.

## 7. Motion vocabulary

Libraries, grepped in **Exo Ape's own six bundles only** (`5c5d488`, `62789af`, `b6072a7`,
`d5d162b`, `e36d691`, `e3cea04`):

| lib | hits | verdict |
|---|---|---|
| gsap | 35 | **yes** |
| ScrollTrigger | 2 | yes (1 x `ScrollTrigger.create`, 1 x `pin:`) |
| CustomEase | 2 | yes, registered |
| SplitText-style splitting | 3 | line/word splitting present |
| lenis | **0** | **no** |
| three / WebGL / ShaderMaterial | **0** | **no** |
| locomotive, barba, swiper, Draggable, smooth-scrollbar, marquee | 0 | no |

`<canvas>` on the rendered home: **0**. So: **no WebGL, no shader, no three.js** — the
cinematic read is achieved entirely with `<video>` (8–14 per page) and type.

Smooth scroll is **custom, not Lenis**: `document.body.scrollHeight` reads `0` and
`documentElement.scrollHeight` reads `900` on a 900px viewport, i.e. a transform-based virtual
scroller (6 x `translate3d`, 6 x `requestAnimationFrame`, 3 x `wheel`, 2 x `IntersectionObserver`,
20 x `will-change` in the CSS). Exactly **one** `pin:` in the whole bundle — sticky is used once,
not as a habit. 8 x `matchMedia` — breakpoint-gated motion.

Quiet by omission: no cursor follower (the 34 `cursor` string hits are ordinary `cursor:pointer`
styling; `cursor:none` appears 0 times in the sheet), no marquee on the home, no horizontal
gallery, no velocity skew, no parallax layer stack, no page-transition library. The transition
dictionary is 8 declarations total.

**`prefers-reduced-motion` appears 0 times.** In a 74KB sheet on a site built almost entirely
of autoplaying video, that is a real accessibility gap and the thing not to copy.

## 8. Rhythm

Home = **3 `<section>` elements** carrying six movements: full-bleed hero → Featured Projects
(4) → `Work in motion` / `Play Reel` ("Our work is best experienced in motion. Don't forget to
put on your headphones.") → `In the media` / `Spread the News` → `Our Story` → footer.

The quiet is structural, in the padding tokens: `21.333vw` block padding on mobile and
`10.417vw` (about 150px at 1440) on desktop. Section padding is a seventh of the viewport width.
`grid-template-columns` appears only 6 times — the layout is mostly full-bleed blocks and one
gutter, not a grid.

Footer: address block, email, four nav links, four social links — set small and left, in three
or four columns. **No giant wordmark.** The oversized type is spent on the hero and on the
case-study statement lines; the footer is deliberately the most ordinary thing on the site.

## 9. THE BEST PART

**The five-word positioning line under every project name — and the fact that it describes the
client's business, not the deliverable.**

"Amaterasu — Frontier Health Innovation." "Columbia Pictures — Celebrating a Century of Cinema."
Not "website redesign", not "Webflow build", not a service tag list. Each caption is the
sentence the *client* would use about themselves. It does three things at once: it makes the
index scannable, it demonstrates that the studio understood the business before it touched the
pixels, and it converts a list of logos into a list of *problems solved* — which is what a buyer
is actually shopping for.

**Legal for him: yes, entirely, and it is the single highest-value move on this list.** It is a
writing move, not a proof move. Every one of his seven receipts already has a business behind
it; each becomes `Name — four-to-five-word statement of what that business does or achieved`.
No client logo needed, no testimonial needed, no invented number — the caption is his own
framing of work he did. The book, the diagram, the screenshots each get the same treatment.

One warning attached to it: **write those captions in his own register, not Exo Ape's.** Two of
the four home captions were rejected by this repo's copy-lint on the first write of this file.
The *form* — client name, then a short line about their business — transfers; the adjective
vocabulary does not.

The second transferable move is the **contact page as three plain facts**: email, phone,
address, one sentence, no form. For a solo consultant that reads as more available than a form,
not less, and it costs nothing to build.

## 10. THE TELL

**The multilingual marquee on `/contact`:** `Get in touch · 保持联系 · Ponerse en contacto ·
Neem contact op ·` scrolling horizontally. It is a 2021 agency-template flourish — the CJK
glyph is doing decorative work rather than serving a reader, and the studio's own copy elsewhere
is in one language. It signals "global" by set-dressing instead of by evidence (the address in
Roermond and the +31 number already do that job honestly, one line below).

Runner-up tells: the studio-page principle copy drifts into exactly the register a solo
consultant must avoid — "intuition is the most advanced technology we have", "Down to earth but
reaching for the stars", "Forever Upwards" repeated as a decorative loop — unfalsifiable
sentences with no named number in them. And "Ready for lift-off? Ping, tweet, message or poke"
is chatty in a way the rest of the site's restraint has not earned.

## 11. Screenshots

Viewport 1440x900. The site uses a transform-based virtual scroller, so
`documentElement.scrollHeight === 900` and Playwright `fullPage` cannot capture beyond the first
screen; both files are true 1440x900 first-screen captures.

- Home: `.../scratchpad/studios/exoape-home.png` (977 KB) — dusk photograph of Santa Maria della
  Salute, Venice, full-bleed; wordmark top-left, four nav items top-right; 21-word positioning
  sentence in white at left; the 250px word `Digital` beginning the stack, cropped by the fold.
- Case: `.../scratchpad/studios/exoape-work.png` (1.68 MB) — `/work/ottografie`, full-bleed
  beauty portrait, `Ottografie` at 144px bottom-left over it, its 14px dek beneath,
  `Visit website` underlined bottom-right. Same nav, unchanged. No hero furniture, no scrim,
  no back button.

## Source files

Namespaced captures in the scratchpad: `exoape.html`, `exoape.css` (extracted inline sheet),
`exoape-work.html`, `exoape-studio.html`, `exoape-contact.html`, `exoape-case-ottografie.html`,
`exoape-case-cambium.html`, `exoape-case-amaterasu.html`, and the six `/_nuxt/*.js` bundles.
