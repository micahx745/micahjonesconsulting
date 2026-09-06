# sara-soueidan — teardown

Slug: `sara-soueidan` · kind: studio (solo practitioner) · captured 2026-09-05

## 1. Fetch proof

- URL: `https://www.sarasoueidan.com/`
- HTTP status: **200** (`curl` → `STATUS:200 SIZE:300107`; Playwright `resp.status() === 200`)
- `<title>`: **`Home`** — that is the entire tag. No name, no descriptor, no separator.
  (Second page fetched: `https://www.sarasoueidan.com/about/`, 200, `<title>About me</title>`.)
- Stylesheet read directly: `/assets/css/styles.css`, 200, 38,203 bytes.

## 2. Type system (from the CSS, not from looks)

There are **no `@font-face` rules for the body or display faces**. The one `@font-face` in the
sheet is decorative and near-unused:

```css
@font-face { font-family: "handwriting";
  src: local("Rollerscript"), url("../fonts/Rollerscript-Smooth.otf") format("opentype"); }
```

The head links Google Fonts for **IBM Plex Mono, Inclusive Sans, Inconsolata** — and that request
**returns HTTP 400**. The URL is malformed (`Inconsolata:wght@200..900display=swap`, missing the
`&` before `display`). Nothing in `styles.css` references any of those three families anyway.
So in practice the site ships **zero webfonts** and renders entirely in the OS UI stack:

- **Text face:** `--font-family` = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  Helvetica, Arial, sans-serif` (computed `body.fontFamily` confirms this exact stack).
- **Display face:** headings get their own, slightly different stack —
  `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
  "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`. Same physical font on most machines;
  the split exists so `system-ui` leads for headings.
- **Mono:** `Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace` — code blocks only.
  There is a full `a11y-light` syntax-highlight theme baked into the sheet.
- **Weights in use:** `bold`(9), `500`(6), `normal`(4), `600`(4), `300`(4), `700`(3),
  `900`(2), `400`(2). The 900 is reserved for `h1`.

Scale — a fluid step scale with hard px fallbacks sitting right next to it:

```css
--step-0: calc(.2vw + 1.1rem);   --step-4: calc(.2vw + 2.074rem);
--step-1: calc(.2vw + 1.2rem);   --step-5: calc(.2vw + 2.488rem);
--step-2: calc(.2vw + 1.44rem);  --step-6: calc(.2vw + 2.986rem);
--step-3: calc(.2vw + 1.728rem); --step-7: calc(.2vw + 3.584rem);
```

Ratio ≈ 1.2. No `clamp()` anywhere — it is `calc(.2vw + Nrem)`, the older simpler fluid trick,
which never needs a max clamp because `.2vw` grows so slowly.

**The one type move worth stealing:** at 1440 the `h1` computes to **36.064px / weight 900 /
letter-spacing −1px**, and the lead sentence directly under it computes to **36.064px / weight
400**. Identical size, opposite weight. The name is a bold stub; the sentence that sells is the
same height in light weight. Body drops to 20.48px, line-height 32.768px
(`calc(0.25rem + 1em)`), letter-spacing −0.01em (−0.2048px) on the whole body.

Letter-spacing is used in exactly five places: `−0.01em` body, `−1px` on `.h1`/`.h0`, `1px` on
`.eyebrow` and on `table`. Uppercase appears three times only: `.eyebrow`, the skip-link, and
event-type chips.

## 3. Palette (from the CSS)

Hex census of `styles.css`: `#fff`(6), `#ddd`(3), `#aa5d00`(3), `#000`(3), `#d91e18`(2),
`#b8860b`(2), `#696969`(2), `#545454`(2), `#008000`(2), `#ff369c`(1), `#fefefe`(1), `#f8d204`(1),
`#f0f0f0`(1), `#eee`(1), `#c0cee9`(1), `#aaa`(1), `#333`(1), `#111`(1), `#007299`(1).
**Six of those (#aa5d00, #d91e18, #b8860b, #008000, #007299, #696969) are the code-highlight
theme, not the design.** Strip them and the design palette is: white, black, three greys, one
pink, one yellow.

Declared tokens:

```css
--color-brand: #FF369C;   --color-accent: var(--color-brand);
--color-highlight: #F8D204;
--color-1 … --color-10: oklch(0.100 0.017 306) … oklch(0.900 0.020 306)  /* violet-neutral ramp */
```

The oklch ramp is declared and, as far as the rendered home goes, essentially unused — scaffold
left in the sheet.

Runtime census of every element on the home page:
`rgb(0,0,0)` ×199 · `rgb(255,255,255)` ×15 · `rgb(17,17,17)` ×2 · **`rgb(255,54,156)` ×1** ·
`rgb(253,232,226)` ×1.

**Achromatic in practice: yes, emphatically.** The brand pink appears on **one element on the
entire home page**. `var(--color-accent)` is referenced 3 times in 38KB of CSS — an `ol` marker,
a focus outline, one text colour. Even body links compute to `rgb(0,0,0)` with
`text-decoration-line: none` at the top level. Ground is white (`#fefefe` on one surface,
otherwise transparent over white); type is pure `#000`.

## 4. Composition of the home first screen

Two columns at 1440. Left: `h1` "Hi, I'm Sara." (**3 words**), then a 4-clause positioning
sentence — "I'm an independent web user interface developer, author, speaker, and educator. I
work at the [banned-word elided] of design and code, and I help front-end designers and developers
do what they do, better." (**37 words**; the elided noun is on this project's own banned list, so
it is bracketed rather than quoted) — then a 78-word "my people are…" audience paragraph in body
size. Right: a single photograph of her, roughly 4:5, no crop treatment, no frame, no caption.
That is the entire first screen. The text column caps at 675px inside a 1296px container
(`.content-container { width: 90vw }`), so the measure is ~60ch and the right half is portrait.

Nav: a **top bar, 5 items** plus wordmark left — `Sara Soueidan` | Blog · Newsletter · Speaking ·
The Accessibility Course · About Me. Flat, no dropdown, no hamburger at desktop, one hairline rule
under it. `a[aria-current=page] { font-weight: bold }` is the only active state.

**Is the WORK the page? No.** There is no work. The page asserts who she is and who she is for,
then immediately becomes a blog index. Under the fold: "Latest articles from the blog" (5 entries
with full deks and dates), "Notable updates", newsletter, RSS, social, "More on this site".
4 `<section>` elements, 5669px tall, **1 image on the whole page** (the portrait).

## 5. How work is shown

Not shown. No tiles, no case studies, no project index, no video, no aspect-ratio system.
**The artifacts are the writing.** Each blog entry on the home page is title + published date +
last-updated date + a 60–90-word abstract in body type — a list-index of arguments, not of
clients. No hover behaviour beyond the browser default; no thumbnails.

The nearest thing to a portfolio is `/about/`, where a `.logos-list` flex-wrap grid carries **16
client marks** — Netflix, SuperFriendly, Herman Miller, Khan Academy, Smashing Magazine, Schiphol
Amsterdam Airport, Telus, Compass, Prismic, Codrops, Bosch, Level Access, WebMD, Sauper
Associates, VPI European Rail Service, ESLint — introduced by one flat line: "Here is a selected
list of clients I've had the opportunity to work with." No case attached to any of them. Then
awards, then "Selected interviews" (7 named publications), then the same newsletter block.
`/endorsements/` is a separate page and is deliberately kept off the home page.

Prose before any proof: **zero projects, ~115 words of positioning, then articles.**

## 6. The path to business

There is **no hire page, no contact page, no form, no calendar, and zero `mailto:` links** on the
home page (`grep -c 'mailto:' → 0`) or on `/about/`. `/hire-me/`, `/services/`, `/work/` all
return **404**.

The only conversion elements on the site:

1. **Nav item "The Accessibility Course"**, an off-site link to
   `https://practical-accessibility.today` — the paid product.
2. **A ConvertKit newsletter block**, whose only button reads exactly **"Sign Me Up"**, under the
   pitch "Join thousands of UI designers, engineers, and frontend web enthusiasts on my mailing
   list who get VIP access to updates and new content."
3. Repeated **"Read the article →"** links.

**Pricing: not shown anywhere on this domain.** It lives on the course domain. The business model
is stated only by implication — she stopped selling hours and now sells a course, so the site
stopped having a hire button. The footer says what she is, not what she will do for you:
"Web UI engineering content by a human for humans. (Yes, including all the em dashes.) No large
language models (LLMs) were used to create this website. Don't use my content to train your LLMs."

## 7. Motion vocabulary

- Libraries in the DOM: **none for motion.** Three `script[src]` on the home page:
  `cdn.usefathom.com/script.js` (analytics), `f.convertkit.com/ckjs/ck.5.js` (the form),
  `/assets/js/lite-yt-embed.js`. Plus one inline `<script type="module">`.
- `lenis`: no. `gsap`: no. `three`/WebGL: no. `<canvas>`: **0**. `<video>`: **0**. marquee: no.
- The sheet contains **4** `transition:` / `@keyframes` / `animation:` declarations combined, and
  **zero** `@keyframes`.
- The only motion rule of consequence:

  ```css
  @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth } }
  ```

  Native smooth scroll, correctly gated. There is no `position: sticky` in the sheet.
- The only transition on an interactive element is `transition: top 0.1s linear` — on the
  **skip link**. The first animated thing she wrote was the accessibility affordance.
- What is quiet: everything. No page transitions, no parallax, no pinning, no cursor, no
  scroll-triggered reveals, no hover lifts.

## 8. Rhythm

4 `<section>`s over 5669px. The beat: assertion (2-col, portrait) → 5 long-form article entries
stacked full-measure → "Notable updates" → newsletter → a 4-item "More on this site" card grid →
footer. **Nothing goes full-bleed.** Nothing goes quiet by emptying — it goes quiet by staying at
one measure for 3000px. The `.bird-food .grid` block is the only inline `<style>`:
`repeat(auto-fit, minmax(300px, 1fr))` with `gap: var(--space-3xl)` — the largest step in a Utopia
space scale, used exactly once.

Footer: **no giant wordmark.** Three small centred paragraphs — where it was built (Lebanon,
Eleventy, Netlify), the anti-LLM declaration, and "© Sara Soueidan 2013–Today". A hand-drawn bird
SVG sits in the bottom-right corner; the same bird is the `ul` list-image, inlined as a data URI.
That bird is the entire brand identity: one hand-drawn mark, reused as a bullet.

## 9. THE BEST PART

**The headline and the sentence are the same size; only the weight differs — and the sentence,
not the name, is what is actually big.** `h1` at 36.064px/900 and the positioning paragraph at
36.064px/400, both capped at a 675px measure. The name is a stub; the claim gets the room. The
first screen therefore has no hero type at all — no 120px display setting, no clamp, no wordmark
moment — and still reads as confident, because the confidence is in the sentence being long
enough to be specific and set large enough to be unavoidable.

The second half of the same lesson: **the one accent colour appears exactly once on the page.**
`rgb(255,54,156)` on a single element out of 199 black ones. Scarcity is what makes it read as a
decision rather than a theme.

**Legal for him: yes, entirely.** This costs nothing he does not have. He has a positioning
sentence, a photograph of himself, and a colour. Setting his own sentence at the same size as his
name in the opposite weight, on a ~60ch measure, with copper appearing once above the fold, is a
pure typography move — no client logos, no testimonials, no invented proof. It arguably fits him
better than her, because his proof (a book with hand-drawn pages, seven receipts with names and
numbers) can then arrive under a first screen that has spent nothing.

Corollary he should NOT copy: her home defers all proof because her proof is 12 years of public
writing the buyer already knows. He does not have that; his artifacts need to appear sooner than
hers do.

## 10. THE TELL

**The site is running on maintenance autopilot and it shows in the head.** Three Google Fonts are
preconnected and requested — and the request **400s** because of a missing `&` in the URL — while
the CSS never names any of them. An `oklch()` ten-step ramp is declared and unused. A
`--font-family`, a `--font` and a fallback stack all coexist. `<title>Home</title>` is the literal
template default with no site name appended, which is both an SEO tell and a small accessibility
miss on an accessibility expert's site.

The design tell underneath it: **`font-family: system-ui` on an editorial site is a position for
about two years and a default forever after.** It reads as "I chose performance and then stopped
choosing" — fine when your name carries the page, hollow when it does not. The conclusion for this
project is not that system fonts are the answer; it is that *one* face, set at *two* weights, with
*one* accent used *once*, is the answer.

## 11. Screenshots

- Home: `…/scratchpad/studios/sara-soueidan-home.png` (1440×900 viewport, full page clipped to
  2700px = 3 viewports)
- Work/case analogue — `/about/`, the only page carrying client evidence:
  `…/scratchpad/studios/sara-soueidan-work.png` (1440×900 viewport, clipped to 2700px)
