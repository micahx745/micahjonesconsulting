# Malvah Studio — teardown

## 1. Fetch proof
- Requested `https://malvah.studio/` → **301** → `http://malvah.co/` → **200 `https://www.malvah.co/`**
  (`curl -L -w "%{http_code} %{url_effective}"` returned `200 https://www.malvah.co/`).
- `<title>Malvah Studio</title>` (grepped from the served HTML; Playwright `page.title()` agrees).
- Case page: `https://www.malvah.co/projects/pointblank` → `<title>pointblank - Malvah</title>`.
- Stack: Nuxt (`/_nuxt/*.js`, `/_payload.json`), Prismic CDN for media, Cloudflare.

## 2. Type system (from the CSS)
- **One typeface, one weight.** A single inline `@font-face`:
  `font-family: NeueHaasGroteskText Pro; font-weight: 400; font-display: swap;`
  `src: local("Neue Haas Grotesk Text Pro 55 Roman"), url(/fonts/NHaasGroteskTXPro-55Rg.woff2)`.
  29 of the 30 `font-family` declarations are
  `NeueHaasGroteskText Pro, Helvetica Neue, Helvetica, Arial, sans-serif`.
  Stray unused strings `Portrait Text` and `Graphik` sit in the sheet with no live rule.
- **Display and text are the same face at the same weight.** There is no display cut. Every
  computed node sampled on the case page returned `font-weight: 400`. Hierarchy is carried by
  size, colour-opacity and position — never by weight, never by a second family.
- **No monospace anywhere** (the only `ui-monospace` string is the unused Tailwind preflight
  default). No uppercase in the type scale — `text-transform: uppercase` appears 5 times and only
  on utility chrome; nav, headings and captions are all sentence case.
- **The scale is astonishingly small for a studio site.** Computed, at 1440:
  - home hero line "AWWWARDS Studio of the Year '25…" → **22px / 26.84px**
  - case-page `<h1>pointblank` → **52px / 63.44px**, with its serial `SC_12©24` set at the *same*
    52px in `rgba(0,0,0,0.5)`
  - section headings (`The Brandmark`, `The Motif`, `The Grid`) → **22px**, identical to the body
    paragraph beside them
  - nav items, `Areas`, `Overview`, project titles, tag lists → **16px / 20px**
  Fixed px in the sheet: 136, 88, 58, 52, 32, 18, 16, 14, 12. Fluid pairs are `calc()`, not
  `clamp()` — e.g. `calc(40px + 6.66667vw)`, `calc(42.50704px + 4.13146vw)`,
  `calc(30.53521px + 7.32394vw)`.
- **Letter-spacing is tokenised and nearly all negative or zero:**
  `--letter-spacing-primary: -.02em`, `--letter-spacing-xl: -.02em`, `--letter-spacing-meta: -.04rem`,
  `--letter-spacing-eyebrow: -.01rem`, `--letter-spacing-cta: -.01rem`,
  `--letter-spacing-title-lg: 0`, `--letter-spacing-title-sm: 0`, `--letter-spacing-paragraph: 0`.
  A single `letter-spacing:.14em` exists (one tracked-out utility). There is **no** loose uppercase
  eyebrow tracking of the kind most studio sites use.
- Typography is declared with the `font:` shorthand throughout
  (`font: 400 var(--font-size-title-sm)/var(--line-height-title-sm) var(--font-family-secondary)`),
  so size, leading, weight and family move as one token set.

## 3. Palette (from the CSS)
- Tokens: `--color-off-white:#f8f8f7`, `--color-html:#f8f8f7`, `--color-white:#fff`,
  `--color-black:#000`, `--color-off-black:#140700`, `--color-mid-black:#5e5855`,
  `--color-mid-white:#d0d0c8`. Ground/foreground swap per section via
  `--color-background` / `--color-foreground`, which is how a white page flips to a black one
  without a theme provider.
- Hex frequency across HTML + both stylesheets: `#fff` 6, `#000` 5, `#0000` 4, `#00f` 3,
  `#ff7600` 2, `#f8f8f7` 2, then singletons `#d0d0c8`, `#7a7a7a`, `#5e5855`, `#514c49`, `#4c4c4c`,
  `#1d1d1d`, `#140700`.
- Runtime census of every element on the home page: `rgb(0,0,0)` 516, `rgb(230,230,230)` 91,
  `rgb(89,89,89)` 6, `rgba(230,230,230,.2)` 4, `rgb(255,255,255)` 4.
- **Achromatic in practice: yes, completely.** One accent is declared —
  `--color-brian-orange:#ff7600` — and a live scan of every computed `color`, `background-color`
  and `border-color` on the home page found it **zero times**. The only colour on the page comes
  from the photography. Grey is not really a grey token either: secondary text is the same black
  at 50% alpha (`rgba(0,0,0,0.5)`).

## 4. Composition of the home first screen
- A **click gate first**: black screen, a percentage counter, `01 / 02 / 03`, the studio name
  repeated as a scattered physics/WebGL type field, and the words **`Enter Site`**. Nothing of the
  site is visible until you click. (Two synthetic clicks at viewport centre dismissed it; a
  `getByText("Enter Site")` click did not, because the hit target is the canvas overlay.)
- Past the gate: **white ground**, and the first screen asserts one sentence in **17 words** —
  "AWWWARDS Studio of the Year '25. Crafting distinctive brand experiences." It is set at 22px,
  roughly centre-right, on the optical middle line, with enormous white above it.
- Alignment is a **band of marks across one horizontal line**, not a stack: wordmark
  `Malvah.Studio` top-left (a Grotesk "Malvah." locked to an engraved script "Studio" — an SVG
  lockup, not a webfont), `Menu` and `SI_01` top-right, then on the mid-line a small `M` glyph at
  far left, a narrow column of work imagery, the sentence, and `CT_SA©2024` flush right.
- Nav: **5 items** — Home / Work / Studio / Words / Contact — inside a hidden `Menu` overlay, plus
  a sixth persistent oddity, `SI_01`, linking to `/site-index`. The top bar itself carries only the
  wordmark and two words.
- **The work is not the page.** The first screen is a sentence and a sliver of image. The imagery
  runs as a *narrow vertical column* occupying about a quarter of the width, the right two thirds
  left empty — the inverse of the full-bleed hero convention.

## 5. How work is shown
- Home: a scrolling column of media, then a `Recent Work(6)` list with `View All` → `/projects`.
  Six projects on the home page, each captioned **name + serial**: `pointblank SC_12©24`,
  `Stewart & Partners SC_10©23`, `Pantheone Audio SC_04©23`, `Fold7 SC_03©23`,
  `Bitter Creek SC_11©25`, `Boring SC_13©25`.
- Prose is not deferred — the studio paragraph ("What started as a small design studio nestled in
  the back of a skate park…") sits *above* the work list, immediately after the hero sentence.
  So: **zero projects before the first prose**, six after it.
- Case page (`/projects/pointblank`, 22,284px tall): **34 images, 7 videos**, not cropped into
  uniform tiles. Measured widths are a two-value system — **1385px full-column** and **690px
  half-column**; heights vary freely (468, 841, 851, 562, 864, 890, 1472), so ratios are
  content-led, not a grid of 16:9 or 4:5 cards.
- The case-page masthead is a **label/value table**, not a paragraph: `Areas` → Branding, UX, UI,
  Development · `Overview` → one 34-word paragraph · `Links` → Instagram, Website. All values are
  black at 50% alpha; all labels solid black at 16px.
- The body is a **three-column caption structure**: a short left-margin label (`The Brandmark`,
  `The Motif`, `The Grid`), a middle prose column at 22px, the media at right. The label column is
  what makes it read like a specimen sheet rather than a blog post.
- The case-page footer is a **serialised next-project index** — eight entries, each
  `Name · SC_0N©YY · (Branding), (UX), (UI), (Development)`. The parenthesised discipline tags are
  the recurring device.
- Hover behaviour: not observable from static capture; nothing in the sheet beyond opacity changes
  and an `:after` rule that grows a rule under link buttons.

## 6. The path to business
- Contact is the 5th nav item, and the home page closes with a plain ask: **"Keen to work with
  us?"** followed by the CTA **"Drop us a mail"**, then the address itself (Cloudflare-obfuscated
  in the HTML as `[email protected]`), with an **"Email copied! ✌️"** confirmation state — so the
  CTA is a copy-to-clipboard, not a form.
- No form, no calendar, no "book a call", no budget dropdown anywhere on the home page.
- **No pricing.** No rate, no range, no packages, no "starting at".
- Physical proof stands in for a sales pitch: `33 Loop Street, (CT) City Centre, Cape Town, 8000`,
  `Est. 2018`, `©18-26`, `CT_SA©2024`. Plus 10 social links (Awwwards, Instagram, Behance, X,
  Medium, LinkedIn, Dribbble, YouTube, Facebook, and their own `experiment.malvah.co`).
- The one status claim is a third-party award — "AWWWARDS Studio of the Year '25" — carried inside
  the hero sentence rather than in a badge row.

## 7. Motion vocabulary
- Libraries in the entry bundle (`/_nuxt/Dy5qH14U.js`, 1.5MB): **GSAP** (85 hits, incl.
  `ScrollTrigger` 26, `SplitText` 3, one `ScrollTrigger.create`, one `pin:`), **Lenis** smooth
  scroll (34 hits, `smoothWheel` 4), **three.js** (`WebGLRenderer` 37, `PerspectiveCamera` 8), and
  a `matter` physics engine (39 hits — what scatters the name field on the loader).
- DOM at runtime: home = **1 canvas, 8 videos, 45 images**; case page = **7 videos, 34 images**.
  One reel is served direct from Prismic (`Malvah.Reel_2024.mp4`) behind a `Play reel` /
  `Close reel` overlay with its own `00:00:00` timecode and a `Reel@2024` label.
- Behaviours: preloader with percentage + `01/02/03` counter and a physics-scattered wordmark
  field; smooth scroll everywhere; scroll-triggered reveals; a modal reel player. `cursor` appears
  26 times in the bundle, so a custom cursor is likely, though I did not observe it firing.
- **What is quiet:** no marquee (0 hits), no horizontal gallery, no Locomotive/Barba/Swiper, only
  one `pin:` in the whole bundle, and the page body does not move under you — the WebGL and the
  physics are spent entirely on the door, then never seen again.

## 8. Rhythm
- Home: **10 `<section>`s**, 8,999px tall — under 7 viewports, short for the genre.
- The pattern is *quiet → dense → quiet*: an almost-empty first screen (one 17-word sentence in a
  field of white), then the studio paragraphs, then a `What we do_` band that inverts to the black
  ground (`rgb(230,230,230)` type appears exactly where the section flips), then `Recent Work(6)`,
  then a full-bleed reel, then the footer.
- Media never goes edge-to-edge on the home page; it stays in a narrow left column. Full-bleed is
  reserved for the case pages and the reel.
- Footer: **no giant wordmark.** Instead a manifesto line, `Born through Passion / fixated on
  progress`, a self-deprecating `Just another design studio`, `Est. 2018`, `CT_SA©2024`, the
  5-item nav repeated, 10 socials, `2018-26`, Privacy Policy, Terms of Use. Small type, dense,
  filed like a colophon.

## 9. THE BEST PART
**The serial number.** Every project carries a code — `SC_12©24`, `SC_10©23`, `SC_04©23` — and the
site itself carries `SI_01` and `CT_SA©2024`. On the case page the serial is set at the *same 52px
as the project title*, just dropped to 50% black, so the code reads as the title's equal rather
than as metadata. It does three things at once: it dates the work honestly, it implies an archive
with a spine, and it turns a list of six projects into an inventory. The studio files its
discipline set the same way — `(Branding), (UX), (UI), (Development)` in parentheses under every
entry.

**Legal for him: yes, entirely.** A serial is a fact about his own artifacts, not a claim about a
client. Seven receipts become `RC_01` … `RC_07`; the book's hand-drawn pages become `PG_06`; case
studies get `CS_01©25`. No logo, no testimonial, no invented proof is required for any of it — and
it gives a solo consultant with a small body of work the one thing a small body of work normally
lacks, which is the feeling of a catalogue.

The related move worth stealing is the **label/value masthead** (`Areas` / `Overview` / `Links` as
flush-left labels in solid black with values at 50% alpha): it lets a case study open with facts
instead of adjectives, and it is the same shape as the numbers he already has.

Second, cheaper lesson: **hierarchy without a second weight.** One face, one weight, size and alpha
doing all the work, negative tracking on everything. Directly portable to a three-face system — it
argues for using far fewer of the available weights than the fonts offer.

## 10. THE TELL
**The `Enter Site` door.** A black screen, a loading percentage, `01 / 02 / 03`, and a physics
simulation of the studio's own name scattered across the viewport — costing a WebGL renderer, a
physics engine and several seconds — before a single word of the actual site is visible. It is the
2024–25 awards-site convention in its purest form, it exists to be judged rather than read, and it
makes a first-time visitor's first interaction a click that buys them nothing. A consultant selling
clarity cannot put a gate in front of the proof. (Runner-up tell: ten social icons in the footer,
one of them Facebook, which reads as a checklist rather than a choice.)

## 11. Screenshots
- Home (past the gate), 1440x900 viewport, full-page capped at 3 viewports:
  `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/malvah-home.png`
- Case page `/projects/pointblank`:
  `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/malvah-work.png`
