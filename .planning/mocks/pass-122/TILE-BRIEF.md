# Pass-122 style tile brief: Kinetic Editorial, one screen (2026-09-18)

## Why this exists
The operator rejected Pass-121 on sight: "bland, word heavy, weak design ... would not draw someone
in ... Why do you keep going underwhelming?" On 2026-09-18 he picked the research's **Kinetic
Editorial** direction and lifted the rules that capped it (LESSONS #3 "PASS-122 DIRECTION AND THE DEMO
PIECE" and "PASS-122 RULES ON TRIAL"; `docs/DESIGN_BAR.md` dated rulings). The description he picked:

> "Your numbers as poster-size type that assembles and moves as you scroll ($20M+, $14M, 800,000). The
> Tel Aviv clip plays inside the lettering for one beat. Most punch. Risk: phone speed, so I'd build it
> without 3D and prove it on a mid-range phone."

The research behind it: `.planning/research/pass-122-research-answer.md` §3 Direction C, and the verified
reference captures `.planning/qa/pass-122/sheets/sheet-C.png` (aristidebenoist.com type at 250px on a
phone; matvoyce.tv type that stretches and snaps; obys.agency posters; basement.studio one accent on
black). The one question that matters before any other: **would this stop a skeptical B2B founder
scrolling on a phone in the first five seconds?** A tasteful, quiet, correct tile FAILS this brief.

## What to build
The home page's first screen plus the scroll run that follows it, no more than about 3 viewport heights
in total: the page a stranger lands on. It must show the MOTION, because the direction is motion: open it
in a browser and scroll. One self-contained `index.html` (inline CSS and JS; no build step, no framework).

- Two display faces in the same file: `index.html` shows your CHALLENGER face; `index.html?face=bricolage`
  shows the identical design in Bricolage Grotesque (Google Fonts; variable wght 200-800, wdth 75-100,
  opsz 12-96). Everything except the display face is identical between the two.
- Body text: Hanken Grotesk. Labels only (small caps-style metadata, never headings or body): JetBrains
  Mono. Both from Google Fonts.
- Motion: vanilla JS (requestAnimationFrame + scroll position) and/or CSS scroll-driven animations with a
  JS fallback. No libraries. Transform, opacity, font-variation-settings and clip/mask only. It must run
  smoothly on a mid-range phone: no layout thrash, no canvas, no WebGL, no 3D.
- `prefers-reduced-motion: reduce`: every number and line renders finished and still.
- Without JavaScript: every number is the real, final number in the HTML (motion only ever animates TOWARD
  the real value; a counter never starts from a wrong visible number if JS fails).
- Responsive: designed for 390 wide first, then 1440. No horizontal scroll at 390. Full-bleed is the point.

## What the rulings allow (use them; timidity is the known failure mode)
- Type and numbers may move with the scroll; a section may hold (sticky/pin) while its number assembles;
  entrances may run longer than 400ms. ONE hero number per section may assemble once.
- Poster grounds: each section on its own full-bleed ground (ink, paper, or one saturated colour), type at
  maximum contrast, ONE accent per screen. You choose the palette; say why. Copper #C8542B is today's
  accent and may stay or go.
- Imagery: the operator's real photos (below), treated (grain, duotone, crop) if you like, and the Tel Aviv
  clip, which should play INSIDE the lettering for one beat (a text knockout / mask over the video). Note
  LESSONS #7: `mix-blend-mode` only blends inside its nearest stacking context; an SVG or CSS mask is often
  more reliable.

## Hard bans (these did NOT move)
- No invented words. Every visible string must come VERBATIM from the copy list below. You may DROP any
  string; you may not reword, shorten into new phrasing, or add a sentence, label, tagline or caption.
  If you believe the design needs a new string, render the gap as a visible bracketed note
  `[NEW COPY NEEDED: what and why]` and report it; the operator decides copy.
- No captions or AI disclosure on photos or the clip (operator ruling). No logos, no testimonials, no
  quotes (none are approved yet).
- No diagrams of the work: no boxes, arrows, flow charts, node graphs (the 2026-09-18 hold stands). A
  number is type, not a chart, in this tile.
- No cursor followers, no scroll that changes speed (no scroll-jacking, no mandatory snap), no marquees,
  no idle loops (the clip plays once per beat, it does not loop forever), no gradients, no gradient text,
  no purple/indigo, no glow, no glassmorphism, no icons, no illustration, no stock.
- Mono never for headings or body. At most one em-dash on the page.
- Contrast: body text 4.5:1 and large text 3:1 against the ground it actually sits on, including over
  photos and while animating at rest positions.
- The research's wrong figures never appear: no "$610.4M", no "October 2021", no "behind the work"
  (it is "behind my work"), no "/mo" or "a month" rate for 800,000 beyond the approved line below.

## Copy list (verbatim; the only strings allowed)
Wordmark: `MICAH/JONES`
Nav: `Services` `Work` `About` `Contact`
Hero line: `I take AI-built products from demo to production.`
Hero support (optional, droppable): `I also position products and build the go-to-market that sells them.`
  `Strategy and software, shipped by the same pair of hands.`
CTAs: `Book a free intro call →` `See the work ↓` `Start the Audit ↓`
The receipts: `The receipts.` `$20M+` `In revenue behind my work`
Exits: `Four exits I worked inside` / `Postmates` `$2.65B` `Acquired by Uber` / `SurveyMonkey` `$2.33B`
  `IPO, first-day value` / `Guardicore` `$600M` `Acquired by Akamai` / `Neuton.AI` `Undisclosed`
  `Technology acquired by Nordic Semiconductor`
Study lines (figure first): `$14M in revenue, sourced and closed, at a $1.2M average enterprise deal.`
  `$3M in signed contracts across eleven awards.`
  `Up to 800,000 impressions in a month, up from a few thousand a month.`
  `Bookings went from one to three a month to five to ten.`
  `Birth workers keep hundreds of dollars per client that a claims service would take.`
Study contexts: `Guardicore, acquired by Akamai` `An award-winning author and leadership consultant who
  teaches government bodies and corporations` `A social activist` `A birth worker` `ORDANI`
Contact: `micah@micahjonesconsulting.com`

## Assets (relative to your tile folder: `../assets/`)
- `hero-context.jpg` 1800x1800: the operator at a desk with a laptop (today's home hero photo).
- `portrait-desk.jpg` 784x980 and `portrait-context.jpg` 1000x1250: the operator working.
- `guardicore-telaviv-session.jpg` 770x575: the Tel Aviv working session (the clip's source photo).
- `work-hero-720.mp4` / `.webm` (4s, 210KB) with poster `work-hero-poster-960.avif`: the Tel Aviv clip.
  Play it muted, inline, once per beat; the poster/photo is the no-JS and reduced-motion frame.
Reference files by these relative paths; a later step inlines them.

## Deliver
- `index.html` in your tile folder, plus `NOTES.md` there: your angle in two sentences, the challenger face
  (name, foundry, licence, source URL; it must be free for commercial web use: OFL or equivalent), the
  palette with hex values and where each is used, what moves and when (scroll ranges), and any
  `[NEW COPY NEEDED]` gaps.
- Before you finish, open your own page in a headless browser at 390x844 and 1440x900 (puppeteer-core via
  `createRequire("C:/tmp/p101tools/package.json")`, Chrome at
  `C:/Program Files/Google/Chrome/Application/chrome.exe`), scroll it with `page.mouse.wheel`, and LOOK at
  the frames. Fix what you see. Do not report "looks great"; report what the frames show.
