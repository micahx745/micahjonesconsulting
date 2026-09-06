# CLIENT-WORK SYNTHESIS — what Studio Freight / darkroom.engineering actually build FOR CLIENTS

Source: `00-CLIENT-SITES.md` plus the **14 teardowns** in this directory —
`bad-omens` · `cora` · `dragonfly` · `esther` · `growthloop` · `hyperbolic` · `looped-polyai` ·
`lore` · `oreo-bts` · `provable-explorer` · `psyop` · `sharplink` · `tambo` · `viture-neckband`.

Every count below has a denominator of **14** unless stated. Every claim carries a
`slug §section` citation to the teardown that established it. Where a teardown did not settle a
question the build is counted as unrecorded rather than assumed.

**The distinction held throughout:** these are sites on the CLIENT's own domain
(`us.oreobts.com`, `badomensofficial.com`, `tambo.co`, `cora.computer`, …), not the studios' own
homepages and not case-study pages. Case-study pages appear here only as pointers.

**One unverified attribution, flagged and kept:** `sharplink §1` records that the site carries no
studio credit, no `humans.txt`, and no pointer page on either studio index — only the house
tooling fingerprint. It is counted in the corpus because the build is unmistakably the house
system, and every claim drawn from it below is a claim about the *pattern*, not about authorship.

Contact sheets (all three built with Pillow, 4 columns, 700px thumbs, slug labels):
`…/scratchpad/client-work/CONTACT-top.png` (2920×2044, 3,802,732 b, **14 tiles**) ·
`CONTACT-mid.png` (2920×2044, 2,777,668 b, **14 tiles**) ·
`CONTACT-390.png` (2920×6352, 8,642,108 b, **14 tiles**).

---

## A. THE ETHOS AS PRACTISED FOR CLIENTS

### A1. The ground is a tinted near-black or a tinted near-paper. Almost never #000 or #fff.

**6 of 14 run a dark ground:** `oreo-bts §5` (`#060606`, though the 3D scene is the real ground),
`looped-polyai §5` (`#231F20`), `bad-omens §5` (`#131514`, "an almost-black with a green cast"),
`viture-neckband §5` (`#020202`), `dragonfly §5` (`#000`), `lore §5` (body computes
`rgb(19,21,20)`).
**7 of 14 run a light ground:** `hyperbolic §5` (`#eee`-family), `sharplink §5` (`#f7f7f5`),
`esther §5` (cream `#faf6e6`), `growthloop §5` (`#fff` with `#fafbff` as the quiet tint),
`psyop §5` (`#fff`), `provable-explorer §5` (`#F7F5F3`, "warm paper grey, *not* white"),
`tambo §5` (`#e5f0ed`, "a pale mint paper, *not* white").
**1 of 14 makes the brand colour the entire field:** `cora §5` — `body{background:rgb(17,123,200)}`,
"The brand colour is not an accent — **it is the entire page**."

**Only 1 of the 6 dark builds uses literal `#000`** (`dragonfly §5`); the other five all shift the
black warm or cool. **Only 2 of the 7 light builds use literal `#fff`** (`psyop §5`,
`growthloop §5`). Type colour follows the same rule: bone not white on dark
(`bad-omens §5` `#ECEAEB` "Never pure white for body", `lore §5` `#fffaf4`, `dragonfly §5`
`#f2f2f2`, `provable-explorer §5` `#F0E9E6`), warm near-black not black on light
(`hyperbolic §5` `#1a1a1a`, `growthloop §5` `#181609` "a warm-shifted near-black … never pure
`#000` for body", `tambo §5` `#0f1a17`, `provable-explorer §5` `#070504`, `esther §5` `#101010`).

### A2. One accent. Zero exceptions. Usually the client's own, and usually rationed.

**14 of 14 run exactly one accent hue. 0 of 14 have a second.**
`oreo-bts §5` (one hue family, OREO blue in five stops, ~160 occurrences; "There is no second
accent") · `looped-polyai §5` (`--macaw #D9EE50`) · `bad-omens §5` (`#27414C`) ·
`viture-neckband §5` (`#ed1512`, "One accent, one gradient, three jobs") · `hyperbolic §5`
(`#5b25d4`) · `sharplink §5` (`#0e76ff`) · `dragonfly §5` (`#fa4c14`; pink and purple are declared
as alternate themes the home page never invokes) · `esther §5` (`#0daf1e`) · `cora §5`
(`#117bc8`) · `growthloop §5` (`#1653f1`) · `lore §5` (an accent *set* — ten named colour worlds,
one chosen per load) · `psyop §5` (`red`) · `provable-explorer §5` (`--accent: var(--foreground)`
— literally none) · `tambo §5` (the mint ramp).

**12 of 14 use the client's own brand colour to do the work.** Two do not: `psyop §5` — Psyop's
identity was wordmark-only, so the studio *invented* Siren Red and then spends it about six times
a page; `provable-explorer §5` — "there is no brand accent doing the work", the only saturated
colours are `--positive` mint and `--negative` coral and **they appear only on data**.

**5 of 14 ration the accent into single digits per screen** and the teardowns count it:
`hyperbolic §5` ("rationed hard" — three places), `sharplink §5` ("accent frequency is *low single
digits*" — about four places on the home page), `dragonfly §5` ("on the first screen it appears
exactly **twice**"), `bad-omens §5` ("It appears only on *labels and wipes* … **Never on type**"),
`psyop §5` ("Frequency on the homepage: exactly **one** element").

### A3. Weights are light. Tracking is negative or absent. `clamp()` is gone.

**12 of 14 set display type at weight 300–500 — the display face is not bold.**
`cora §4` (H1 weight **300**, Signifier Light, at 55px) · `tambo §4` (sentient **300** at 63.56px,
−0.05em) · `dragonfly §4` (display weight **300**; "Weight range in use is narrow — 300 and 400
only") · `sharplink §4` ("**400** for every display headline") · `lore §4` ("Weights in the whole
document: 350, 400, 500. **Nothing bold anywhere**") · `looped-polyai §4` ("the only weight
declared anywhere in the seven CSS bundles is `font-weight:400`") · `bad-omens §4` ("**360 of 362
text nodes** render in Helvetica/Arial at weight 400") · `growthloop §4` ("the headline is *not*
bold, it is Medium or Semibold at large size") · `viture-neckband §4` (section headlines are
`font-medium` 500) · `hyperbolic §4` ("the sub-heads are *lighter* than the section heads, which
is what keeps an 8,419px page from shouting") · `esther §4` (display sits at 400) · `psyop §4`
(body FT Calhern **300**).
Only two go heavy: `oreo-bts §4` (Bricolage 800 throughout) and `provable-explorer §4` (700 is the
most-used weight — but **the largest type on that whole page is 32px**, so it never reads as a
shout).

**8 of 14 track display negatively**, from −0.02em to −4.4%: `hyperbolic §4` (−2% on h1, −1% on
h2, "tightening as size grows"), `sharplink §4` (−0.03em at 88px scaling to −0.01em at 24px —
tracking proportional to size), `dragonfly §4` (−12.24px at 204px), `growthloop §4` (−0.05em),
`lore §4` (−0.04em on *everything*, display and body alike), `tambo §4` (−0.05em ×8),
`provable-explorer §4` (−0.03em), `psyop §4` (+0.01em — the outlier, tiny positive).
**5 of 14 ship literally no tracking at all** — `looped-polyai §4` ("**no `letter-spacing`
declarations at all** (0 occurrences)"), `bad-omens §4` ("`letter-spacing` computes to `normal`
everywhere"), `viture-neckband §4` ("**not one `letter-spacing` declaration in the entire
stylesheet**"), `cora §4` ("`letter-spacing:0` on all 25 declarations"), `esther §4`
("`letter-spacing:0` (223 rules) … Display gets **no negative tracking at all**").
**1 of 14 inverts the whole convention:** `oreo-bts §4` — **+2% and +6% on display and labels,
−3% on body.** "That inversion is the system."

**9 of 14 ship zero `clamp()`.** `oreo-bts §4`, `looped-polyai §4`, `bad-omens §4`,
`viture-neckband §4`, `cora §4`, `growthloop §4`, `lore §4`, `tambo §4`, `provable-explorer §4`.
**5 of those 9 replace it with the same house formula:**
`min(calc(((N*100)/var(--device-width))*1vw), N*1.3333px)` with `--device-width: 375|390 → 1440` —
`oreo-bts §4`, `cora §4`, `growthloop §4`, `lore §4`, `tambo §4`. You type the Figma pixel number
and the token math does the rest. The other four use raw `vw` swapped wholesale at one breakpoint
(`looped-polyai §4` desktop `.625vw`–`2.7777vw`, `bad-omens §4` two hard breakpoints at 799/800px,
`viture-neckband §4` a closed 14-step `-d`/`-m` scale) or fixed steps (`provable-explorer §4`).

### A4. Three type roles, and mono is fenced to labels.

**6 of 14 run the exact three-role split — display face / text face / mono confined to labels,
§-codes and data:** `oreo-bts §4` (Bricolage display / Pluto body / ServerMono "labels/data only"),
`hyperbolic §4` (`kh` display / `geist` text / `mono` "eyebrows and the `01`–`06` ordinals only.
Never body, never headings. Exactly the 'narrow third' discipline"), `dragonfly §4` (FK Roman /
NON Natural Grotesk / NON Natural Mono at **10px**), `lore §4` (Ceraph / Oracle / Server Mono
"labels only"), `provable-explorer §4` ("**Mono does the labelling** … body prose is never
uppercase and never mono"), `tambo §4` ("Mono is fenced to labels; body copy is never mono").

**2 of 14 subvert it, deliberately:** `psyop §4` puts New Heterodox **Mono** in the *display* slot
and FT Calhern sans in the text slot — "the inversion of the usual arrangement, and the whole
reason the page reads as a title card rather than a website." `esther §4` goes mono-first for the
entire site (four Gaisyr/Isola semimono and mono cuts).
**6 of 14 load no mono at all** — `looped-polyai §4` ("the pixel face already reads as machine"),
`bad-omens §4` (one unexercised declaration), `viture-neckband §4` ("**No mono anywhere**"),
`sharplink §4` ("**Mono: none.** … the 'technical' register is carried entirely by
condensed-uppercase-with-tracking"), `cora §4` ("**No monospace face is loaded at all.** Zero
mono"), `growthloop §4` (Server Mono is loaded and tokenised but "vestigial").

**1 of 14 ships no webfont at all.** `bad-omens §4` — a nine-figure band's flagship store, built
by the studio that wrote Lenis, set entirely in **Helvetica/Arial, one weight, uppercase**, with
**zero `@font-face` rules**.

### A5. Uppercase is a property of the label layer, not a headline treatment.

`oreo-bts §4` applies `text-transform:uppercase` exactly **once** in CSS — everything that reads
as caps is typed in caps in the copy. `viture-neckband §4`: "exactly **one**
`text-transform:uppercase` rule in 75KB of CSS. Case does no work here." `growthloop §4`:
"`text-transform:uppercase` count in the shipped CSS = **0** … every eyebrow is sentence case."
`cora §4`: "`text-transform`: exactly one declaration, and it is **`lowercase`**. There is **no
uppercase** in the type system." `looped-polyai §4`: "**no `text-transform` declarations at all**."
`sharplink §4`: uppercase "confined to that one 13px label style plus button text. Headlines are
sentence case." `hyperbolic §4`: confined to the h1 and the mono eyebrows.
Against that: `esther §4` (`text-transform:uppercase` **258 times**), `bad-omens §4` (12 rules
covering essentially all chrome), `dragonfly §4` (every heading level and every label).
**Net: 8 of 14 use uppercase once or not at all; 3 of 14 make it the house voice.**

### A6. Nav is small, and three of them hide it.

**7 of 14 ship three or fewer visible nav targets:** `cora §3` (2 — "Total chrome: a logo and two
words"), `looped-polyai §3` (2, and `document.querySelectorAll('nav').length === 0`),
`bad-omens §3` (3, and the header is `opacity:0` at scrollY 0), `oreo-bts §3` (3, split),
`lore §3` ("Nav: essentially none" — four chrome items, no menu, no section list), `esther §3`
("**no visible nav**" — three items on a bar fixed to the *bottom* of the viewport),
`dragonfly §3` ("**hidden by default**" — one MENU pill top-centre plus four fixed corner glyphs
spelling D/F/L/Y at the viewport edges).
4–5 items: `hyperbolic §3`, `viture-neckband §3`, `sharplink §3`, `growthloop §3`, `psyop §3`
(five, justified edge-to-edge across a 38px bar — "no logo-left/menu-right cluster").
6–7: `provable-explorer §3` (6, none hidden on desktop), `tambo §3` (a floating triple-pill,
7 targets).
**Only 1 of 14 ships a mega-menu** — `growthloop §3`, the one enterprise-SaaS build.

### A7. How the product is shown.

- **As itself, live, doing the thing — 5 of 14.** `tambo §3` (a real map of Boston and a live chat
  transcript, drawn in dashed frames "so they read as *the thing being generated*, not a
  screenshot"), `provable-explorer §3` (the search field *is* the hero, with a placeholder cycling
  `program… / transaction… / wallet… / block…`), `cora §3` (a laptop-framed screenshot of the
  actual product Brief rising from the bottom edge), `hyperbolic §6` (the page's only `<video>`
  shows "Creating Your Instance"), `growthloop §3` (the AI Studio card with a real typed prompt
  and a chain of agent chips).
- **As a rendered or filmed object — 4 of 14.** `viture-neckband §3` (336-frame canvas scrub),
  `sharplink §3` (prerendered `.webm` CGI), `esther §3` (flash-lit photograph plus a 3D cap),
  `bad-omens §3` (a 4392×3164 film still plus a full merch shoot).
- **As a world you enter — 3 of 14.** `oreo-bts §3`, `looped-polyai §3`, `lore §3`.
- **Withheld — 2 of 14.** `psyop §3` ("The hero **IS type** … The reel is withheld"),
  `dragonfly §3` (one word, `DRAGONFLY`, at 160px).

**10 of 14 put a named number on the first or second screen.** `cora §3` ("Cora is the $150,000
chief of staff that only costs $20 per month" — thirteen words, in the sub-line),
`viture-neckband §3` (`FROM $328` in the nav) and `§6.3` (`7 x CPU POWER · 40 x GPU POWER · 6 x
RAM · 50%+ Battery Life · 20%+ Lighter` at section 3 of 11), `hyperbolic §3` ("250,000+ builders"),
`provable-explorer §6.2` (twelve one-number stat cards immediately below the fold),
`growthloop §6.7` (`2X ROAS / 60% GMV / 70% CPC`), `sharplink §6.2` (a live `TOTAL ETH HOLDINGS`
panel at section 2), `dragonfly §6.2` ("checks go anywhere from **$3M to $30M+**"), `esther §8`
(`ESTHER RUM $36.99`), `bad-omens §8` (a price pill on every card), `tambo §6.8` (Free / $25 /
Enterprise). The four that name no number are the two campaign builds and the two firm builds.

### A8. The ask is quiet, and there are never more than two button styles.

**10 of 14 file the ask as quiet in their own §8.** `oreo-bts` ("Nothing shouts 'buy'"),
`bad-omens` ("The photography carries the volume; the UI whispers"), `dragonfly` ("Loudness: near
zero"), `esther` ("Almost a whisper"), `sharplink` ("13px in an 88px headline environment. Nothing
is sticky, nothing pulses, there is no floating button"), `psyop` ("quiet in colour and enormous in
size"), `provable-explorer` ("quiet"), `tambo` ("Loudness: quiet"), `lore` ("it never grows,
pulses or shouts"), `viture-neckband` (one saturated red rectangle in the nav, and "**no**
interstitial buy button" across eleven sections).
The four loud ones are loud in exactly one way: `growthloop §8` ("**exactly two button styles on
the whole site**"), `cora §8` ("there are only ever **two verbs** on the entire site and they mean
the same thing"), `hyperbolic §8` ("violet fill on exactly one button per screen"),
`looped-polyai §8` (silent for four minutes, then unavoidable).

**5 of 14 print a price on the page** — `viture-neckband §8`, `esther §8`, `bad-omens §8`,
`cora §8` ("no demo request, no 'book a call,' no separate pricing page — **the price is on the
page**"), `tambo §6.8`. Set against the studios' own sites, where `STUDIO-ETHOS-SYNTHESIS §A5`
records **14 of 14 show no pricing, 14 of 14 ship no calendar, 14 of 14 have no budget dropdown**.
**The studios sell themselves by refusing to price. They sell their clients by printing the price.**

**1 of 14 gives each audience its own verb** — `hyperbolic §8`: `AI NATIVES → Launch GPU Instance`,
`RESEARCHERS → Start an Experiment`, `COMPUTE PROVIDERS → List Your GPU Capacity`. Its §10 makes
the case: "'Get started' three times is one offer stated thrice; 'Launch / Start / List' is three
offers."

---

### A9. THE CONTRAST — the client register is NOT the studio-homepage register

The studios' own homepages, per `STUDIO-ETHOS-SYNTHESIS` and `studios/studiofreight.md`:

| | Studio's own homepage | The client builds |
|---|---|---|
| **Ground** | achromatic off-white paper; `studiofreight §3` — the named accent `--color-brian-orange #ff7600` occurs **once in the CSS, the declaration itself, and is never consumed**; **12 of 14 studio sites render no accent at all** (`STUDIO-ETHOS §A1`) | **14 of 14 client builds render one accent, and 12 of the 14 are the client's own brand colour** (§A2 above) |
| **First screen** | a **mosaic** — `studiofreight §4`: 26 project thumbnails on a gappy, deliberately unequal grid, three words dead-centre, **`scrollHeight === 900`, the home page does not scroll** | 12 of 14 client pages scroll, median ~9,000px ≈ 10 viewports (§C4). Only `psyop §3` (900px) and `looped-polyai §6` (`scrollHeight === 0`) hold the one-screen form |
| **Chrome** | **corner furniture on a fixed frame** — `studiofreight §4` (crest top-left, a comma-run of four right-of-centre, `Contact` top-right, `IG / LI · Studio Freight · ©2026` pinned to the bottom edge); `STUDIO-ETHOS §A6` counts this in 6 of 14 studio sites | 1 of 14 client builds does it: `dragonfly §3` (D/F/L/Y at the four corners) — and that build is a VC firm selling its own credibility, i.e. a studio-shaped client |
| **Motion** | **near-still** — `STUDIO-ETHOS §A8`: `position:sticky` count **0** on all three measured Studio Freight pages, **0 of 14 scroll-jack**, **12 of 14 have no cursor follower** | **9 of 14 client builds run a sticky pin** (§B1). The scroll is the argument's spine, not an absence |
| **Proof** | **12 of 14 studio sites carry no testimonial on the home page at all**; work is shown as a name plus a two-part sector and nothing else (`studiofreight §5` — `La Marzocco Consumer, Food/Drink`) | **6 of 14 client builds place proof at position 2 or 3, before a single feature is explained** (§C2) |
| **Price** | **14 of 14 show none** (`STUDIO-ETHOS §A5`) | **5 of 14 print it** (§A8) |
| **The ask** | 2–4 words, not in the nav, an address rather than a button (`STUDIO-ETHOS §A5`) | quiet in 10 of 14 — the *tone* survives the crossing; the *placement* does not. Client builds repeat the ask once per section (`esther §8`: `SHOP PRODUCT → SHOP RUM → SHOP ESTHER → GO TO SHOP`) |

**The single sentence:** the studio homepage is a wall of other people's work that refuses to
explain itself; the client build is a nine-thousand-pixel argument that explains itself six times
and prices itself once. Same palette discipline, same type discipline, same motion ceiling —
opposite postures.

---

## B. THE MOTION GRAMMAR — the core deliverable

### B0. What is actually loaded

| Library | Count | Where |
|---|---|---|
| **Lenis** | **12 of 14** | `oreo-bts §7` (`window.lenis === true`) · `looped-polyai §7` (present but the document height is **zero** — it ships with the template and does nothing) · `bad-omens §7` (`<html class="lenis">`, and it "is the whole animation stack") · `viture-neckband §7` (`1.1.16`) · `hyperbolic §7` · `sharplink §7` (23 refs) · `dragonfly §7` (`1.3.17`) · `esther §7` · `growthloop §7` (`1.3.15`) · `lore §7` (`1.3.16`) · `psyop §7` (the only library on the page) · `tambo §7` (`lenis-autoToggle`). **Absent in `cora §7` and `provable-explorer §7`, both probed `false`/`null`.** |
| **GSAP** | **8 of 14** | `looped-polyai §7` · `viture-neckband §7` (`3.12.5`) · `hyperbolic §7` (via `data-gsap` markup; no global) · `sharplink §7` (61 refs + ScrollTrigger ×24, Observer ×9, Flip ×3, SplitText ×1) · `dragonfly §7` (`3.14.2`) · `esther §7` (30 + ScrollTrigger 5) · `growthloop §7` · `lore §7` (`3.14.2`). **Absent in 6:** `oreo-bts §7` ("**No GSAP. No Framer Motion.**"), `bad-omens §7` (`window.gsap === false` — the studio's own case study claims GSAP and the live code contradicts it), `cora §7`, `provable-explorer §7`, `psyop §7`, `tambo §7` (`window.gsap` false, one string mention) |
| **three.js / WebGL** | **7 of 14** | `oreo-bts` · `looped-polyai` · `hyperbolic` · `sharplink` · `dragonfly` · `esther` · `lore` |
| **tempus** (house rAF scheduler) | **7 of 14** | `oreo-bts` · `sharplink` · `dragonfly` · `esther` · `growthloop` · `lore` · `tambo` |
| **hamo** (throttled resize/rect hooks) | **2 of 14** | `oreo-bts §7` · `sharplink §7` |
| **Framer Motion / Barba / Locomotive** | **0 of 14** | Swiper appears once (`viture-neckband §7`, one slider); Embla once (`sharplink §7`, the news rail) |

**4 of 14 ship essentially no animation library** — and three of them are among the most
expensive-looking pages in the set: `cora §7` (lenis/gsap/three/tempus all probed false; "a plain
Next.js build with **hand-written scroll math**"), `provable-explorer §7` (all null; "From the
studio that *wrote* Lenis — on this build they left it out"), `psyop §7` (Lenis only; "No GSAP. No
Three.js. No WebGL. **Zero `<canvas>`**"), `bad-omens §7` (Lenis only;
`document.getAnimations()` returns an **empty array at rest**).

### B1. MECHANISM ONE — sticky pin, advancing content. **9 of 14.**

One column holds; the other moves past it. Never `position:fixed` with scroll math, never a jack.

| Build | The pin | Trigger / duration |
|---|---|---|
| `growthloop §7` | the `01 Audiences / 02 Universal Journeys / 03 Insights` rail holds at `opacity: .48` and lights to `1` one line at a time while a royal-blue product panel swaps beside it | `useScrollTrigger({start:"top center", end:"bottom top", onProgress})` normalised to a 0–1 number; the state change is `transition-all duration-300` |
| `hyperbolic §7` | a line-art figure holds in the left column while three audiences (`AI NATIVES / RESEARCHERS / COMPUTE PROVIDERS`) scroll past on the right | entrance offsets declared in markup: `data-gsap='{"x":0,"y":"10%"}'` on the media, `'{"y":"30%"}'` on each claim |
| `sharplink §7` | a 3D render holds while five propositions pass, **each fading from ~25% to 100% opacity as it reaches reading position** | ScrollTrigger; visible directly in `sharplink-mid.png` |
| `cora §7` | **six** `sticky top-0 h-[100vh]` panels — the copy holds still, the screenshot changes | hand-written scroll math, no library |
| `tambo §7` | two `sticky top-0 h-screen bg-white` **curtains** plus a sticky footer reveal (`dt:sticky dt:top-0 dt:h-screen` inside an 1800px parent) | `position:sticky` + IntersectionObserver only |
| `viture-neckband §7` | **16 elements** compute to sticky; the canvas sequence's sticky child is `height:100vh; top:0` | scroll length derived from the asset: `height: calc(var(--frames) * 15px)` with `--frames:336` → **5,040px for one idea** |
| `lore §7` | **exactly one** `position:sticky` over a 9,000px document — the whole page is one pinned stage the text scrolls through | scrubbed continuously |
| `esther §7` | `.column-width-text__line` sticky at `top:12px` — the founder-story lines pin **one at a time**; `.router-card__link-container` sticky at `top:450px` | |
| `bad-omens §7` | one sticky PDP rail, `top: calc(var(--header-height) + 3.64583vw)` | |

**0 of 14 scroll-jack.** Stated explicitly in `bad-omens §7`, `viture-neckband §7`, `sharplink §7`,
`growthloop §7`, `cora §7`, `tambo §7`, `dragonfly §7`, `lore §7`, `provable-explorer §7`,
`psyop §7`, `esther §7`.
**Zero sticky at all: `dragonfly §7`** ("**No `position:sticky` anywhere.** Nothing pins, nothing
scrubs, nothing goes horizontal") and **`provable-explorer §7`** (header and mobile menu only).

### B2. MECHANISM TWO — scroll-scrubbed frame sequence. **2 of 14 in frames, 3 more in WebGL.**

- `viture-neckband §7` — 336 frames painted to a `<canvas>`, **15px of scroll per frame**, the
  section's height derived from the asset. Up to seven such canvases on one page.
- `cora §7` — **two layers of 38 `.webp` frames as 76 stacked `<img>` tags**, every one carrying
  inline `style="visibility:hidden"` except the current one. "the only `will-change` in the entire
  stylesheet is **`will-change: visibility`**." Background and foreground scrub independently, so
  the painted world has real depth. **No canvas. No library. Roughly 40 lines.**

Scrub driving WebGL instead of frames — 3 more: `oreo-bts §7` (wheel input converted into a
**camera dolly** through a 3D letter field; 6,000px of wheel grew the letters and re-parallaxed
them at different depths), `lore §7` (the logotype rotates and recedes; its `O` resolves into the
ring that frames a founder's portrait), `esther §7` (the cap travels).
**Scroll-scrub of any kind: 5 of 14.**

### B3. MECHANISM THREE — the travelling object. **4 of 14.**

One prop crosses the whole page and does several jobs.

- `esther §7` — **the choreography is authored in the markup.** The green cap follows invisible
  1px marker divs placed inside the sections themselves:
  `.sanity-display-text__text-top-path-marker {top:10%; right:40vw}`,
  `__text-bottom-path-marker {bottom:20vh; left:40vw}`, `__text-middle-path-marker
  {bottom:-10vh; left:40vw}`, plus `.home-webgl-path-target` (sticky) and
  `.home-webgl-drop-zone` (fixed). It rides the full 7,708px and parks dead centre of the
  `ZERO SUGAR / ZERO CARBS` screen. Velocity-coupled (50 `velocity` references).
  **The animation code is generic; the route is content.**
- `lore §7` — one object, three jobs: logotype → ring → portrait frame.
- `viture-neckband §7` — "the hero neckband turning under a spotlight as you scroll, on a pinned
  canvas. **The object rotates; the page does not.**"
- `looped-polyai §7` — the travelling spotlight that rides the player: "The room is drawn in full
  detail and then almost entirely extinguished; a soft radial light rides the player … it costs
  **one shader** — no rig, no crew, no scan."

### B4. MECHANISM FOUR — the ground changes without any section declaring a background. **4 of 14.**

- `sharplink §7` — **the purest version.** One `position: fixed; height: 100lvh` radial sky at
  `z-index: 0` (`radial-gradient(ellipse 100% 130% at 50% -30%, #c4d5e7 45%, #fdfbf7 85%,
  #f7f7f5)`), with two `.gradient-bg-dark` sheets parallaxing over it at `--parallax-scale: 1.3`
  on `translateY(calc(var(--parallax-offset) * -1))` with `will-change: transform`. "The page
  reads black at the hero and cream at the news block **without a single section owning a
  colour**." Its §7 names this as the one motion moment: "*the page's own daylight changes.*"
- `cora §7` — the painted world walks from a blue cloudscape to a golden wheat field.
- `tambo §7` — the white content card un-sticks and lifts off the mint ground, twice.
- `lore §7` — light shafts, spark colour and background drift within the chosen colour world.

### B5. MECHANISM FIVE — marquee. **7 of 14, and 5 of the 7 are borrowed authority.**

`esther §7` (**55 marquee elements**, five distinct systems, all `will-change:transform;
pointer-events:none`) · `viture-neckband §7` (**775 `marquee` tokens**, counter-running rows) ·
`hyperbolic §7` (two logo rows, one reversed) · `cora §7` (the testimonial river; the eight quotes
repeat ~5× in the DOM "so the loop never shows a seam") · `tambo §7` (nine tweets duplicated
verbatim — "the infinite-loop tell") · `psyop §7` (one footer press headline) · `bad-omens §7`.

**Only `bad-omens §7` uses the marquee to carry information the visitor needs**, and it is that
page's *single* moving element: "A green `ANNOUNCEMENT` header bar drops onto the card, and beneath
it a marquee runs `SOLD OUT • SOLD OUT • SOLD OUT •` on loop … the only thing that *does* move is
the thing you can no longer buy."
**No marquee at all: 7 of 14** — `sharplink §7` ("zero `marquee` selectors"), `dragonfly §7`,
`lore §7`, `provable-explorer §7`, `looped-polyai §7`, `growthloop §7`, `oreo-bts §7`.

### B6. MECHANISM SIX — hover as a load-bearing reveal. **3 of 14, all pure CSS.**

- `psyop §7`, the row: `.global-list__item:after` is a 1px red rule going `scaleY(0) → 1` from
  `transform-origin: top left` over **`.45s`**; simultaneously a **160×160** thumbnail fades in at
  the row's left edge over **`.4s`**, and a red `(VIEW)` fades in at grid column 12 over **`.5s`**.
  Nothing visible at rest.
- `psyop §7`, the hero: hovering `(ALL WORK)` slides the three headline rows apart
  (`translate(8.33vw)`, `translate(-18.89vw)`, `translate(8.33vw)`, **`.65s
  var(--ease-in-out-quart)`**) while three muted reels fade into the emptied white space, and the
  headline runs `color: var(--theme-bg); mix-blend-mode: difference` so it **inverts through** the
  video instead of sitting on it.
- `bad-omens §7` — tour-row wipe: `::before{background:var(--theme-contrast); transform-origin:0;
  transform:scaleX(0); transition: transform .3s var(--ease-out-expo)}` → `scaleX(1)`. Plus a
  product image crossfade (`opacity .3s ease-in-out`, front and back of the garment) and a link
  underline grow (`width:105%; scaleX(0)→1, .5s var(--ease-out-expo)`).
- `dragonfly §7` — the `.mask-hover` lens (see B8; it is cursor-driven, which is the exception).

### B7. MECHANISM SEVEN — entrance reveals, and how they are declared. **6 of 14.**

- `hyperbolic §7` — **the component names its own entrance in markup.**
  `data-gsap='{"x":0,"y":"10%"}'` on the media, `'{"y":"30%"}'` on each of four claims, so **the
  picture arrives before the numbers**. One GSAP call over `[data-gsap]`.
- `growthloop §7` — every effect normalised to a 0–1 progress number; the tween is
  `ease:"expo.out", duration:1, opacity:1`, fired **once** behind a `K.current = true` guard at
  `start:"top center"`.
- `viture-neckband §7` — `split-text_splitText` carries `style="opacity:0"` **on the server
  render**, with a `split-text_fallback` copy underneath, "so the sentence exists for crawlers and
  for no-JS." `tambo §7` does the same for video (`visibility:hidden` in SSR HTML, unhidden by
  observer).
- `sharplink §7` — `TextReveal.css` ships `.text-reveal{opacity:0}` with `.word` / `.letter`
  children at `display:inline-block`.
- `psyop §7` — 1.4s on `cubic-bezier(.48,0,.1,1)`; each headline line exists **twice**, stacked,
  and `rotate-top` / `rotate-bottom` roll one out and the other in like a split-flap board, while
  `unmask-left`, `unmask-bottom`, `unmask-right` bring different lines in from different edges.
  All of it gated by an `--animations-ready` class holding `animation-play-state: paused;
  opacity: 0`. Mobile drops the mechanism rather than faking it: `clip-path: inset(0 0 100% 0)`
  plus translateY, staggered **200 / 375 / 550 / 725ms** on a bespoke spring
  `linear(0,.688 18.7%,1.019 34.9%,…)`.

**But the type itself does not animate in — 8 of 14 say so explicitly.** `oreo-bts §7`
("Deliberately still: the body copy. No text reveals, no split-letter staggers"), `cora §7`
("Headlines do not split, mask, stagger, or fly. There is **no cursor follower**, no magnetic
button, no counter, no scramble text. The words sit; the world moves behind them"),
`hyperbolic §7` ("Nothing on this page splits characters, scrambles, or scrubs a headline"),
`esther §7` ("The type never animates in — it is simply there, poster-flat, at whatever scroll
position you stop"), `tambo §7` ("The H1 does not animate in — it is simply *there* on first
paint. On a 10.9-viewport page that is a lot of restraint"), `growthloop §7` ("The first screen is
a photograph and a sentence and it does not move"), `dragonfly §7`, `provable-explorer §7`.

### B8. Cursor followers. **1 of 14.**

`dragonfly §7` only, and it is designed rather than decorative: `.mask-hover` stacks two copies of
a headline and moves a mask under the pointer —
`--radius:120px; --x:50%; --y:50%;` with
`mask-image: radial-gradient(circle var(--radius) at var(--x) var(--y), transparent 0, #000 50%)`
on the normal copy and the inverse on a `.mask-blur` twin above it, plus a transparent `:before`
pad extending the hit area 32px on every side. Two CSS variables, no library.
**Explicitly absent in 13** — `oreo-bts`, `looped-polyai` (`body{cursor:auto}`), `bad-omens`,
`viture-neckband`, `hyperbolic`, `sharplink`, `esther`, `cora`, `growthloop`, `lore`, `psyop`,
`provable-explorer`, `tambo`.

### B9. Page transitions. **2 of 14, and one is a fade.**

`oreo-bts §7` ships a real staged outlet (`data-transition-outlet`,
`data-transition-phase="idle"`, `data-transition-page="present"` — "a real outlet, not a fade").
`psyop §7` ships `.page-enter/leave-active { transition: opacity .6s }` — a Vue-router crossfade,
"no flourish." A branded loader appears once: `viture-neckband §7`
(`loader_curtain` / `loader_border` at `transform:scaleY(0)` with
`linear-gradient(to top,transparent 33%,var(--orange),transparent 66%)` plus `filter:blur(5px)`).

### B10. The easing ladder as a token set. **7 of 14 — and 4 ship the same curve under the same name.**

`oreo-bts §7` (**22** named cubic-beziers as CSS variables) · `viture-neckband §7` (**18** on
`:root` plus the house `--gleasing`) · `tambo §5` (**12** named curves shipped as first-class
tokens alongside colour) · `bad-omens §7` · `cora §7` (`--ease-out-expo: cubic-bezier(.19,1,.22,1)`)
· `dragonfly §7` (the Satus `--ease-*` set survives the re-platform) · `psyop §7`
(`--ease-in-out-quart`, `ease-out-quint`).

**The house curve, by name, in 4 of 14:** `cubic-bezier(.4, 0, 0, 1)` —
`--ease-glease` in `oreo-bts §7`, `--gleasing` in `viture-neckband §7`, `--gleasing` in
`bad-omens §7`, `--ease-gleasing` in `tambo §5`. It is a two-line steal that costs nothing.

### B11. WHAT IS DELIBERATELY STILL — the negative space of the grammar

This is the half of the grammar that gets lost in a screenshot, and it is where the discipline is.

- **The hero does not move — 4 explicit.** `growthloop §7` ("For a Lenis-house build this is a
  conscious act of restraint — they shipped the smooth-scroll runtime and then used it almost
  entirely for *state*, not for *animation*"), `bad-omens §7` ("no parallax, no Ken Burns, no
  scrub, no autoplaying video, no entrance stagger anywhere"), `tambo §7`, `cora §7`.
- **The photography does not move — 2 explicit.** `esther §7`, `bad-omens §7`.
- **The chrome does not move — 3 explicit.** `looped-polyai §7` ("the header … never move, never
  shrink, never hide — the only fixed furniture in a page where everything else is animation"),
  `lore §7` ("the chrome … is pinned and motionless for the entire 9,000px"),
  `provable-explorer §7`.
- **No velocity skew — 5 explicit.** `sharplink §7`, `dragonfly §7`, `cora §7`, `tambo §7`,
  `growthloop §7`.
- **No horizontal-scroll section — 6 explicit.** `viture-neckband §7`, `dragonfly §7`,
  `sharplink §7`, `tambo §7`, `psyop §7`, `growthloop §7` (its carousel is arrow-driven, "not
  scroll-hijacked").
- **The CSS keyframe ceiling is two.** `dragonfly §7` — **`@keyframes: 0`,
  `document.getAnimations()` at mid-scroll: **0**; every moving thing is rAF-driven through
  Tempus. `bad-omens §7` — `getAnimations()` empty at rest. `hyperbolic §7` — "only **two**
  animation names exist page-wide (`gradient` and `pulse`). That is the entire ambient-motion
  budget." `lore §7` — "Total CSS keyframe animations: **two**." `provable-explorer §7` — three,
  all micro (`pulse` for skeletons, `rotateCW` 9s for the search ring, five 0.2s tooltip slides).

- **`prefers-reduced-motion`, reported honestly:** verified present in **2** (`oreo-bts §7`,
  `esther §7` — 4 rules). Verified **absent and filed as a defect** in **1**: `cora §7` — "No
  `prefers-reduced-motion` block exists in the CSS. Zero occurrences. Noted as a defect, not a
  technique." Unrecorded in the other 11.

### B12. THE ONE MOTION MOMENT — every build names exactly one

Fourteen for fourteen. Each §7 closes by naming the single moment that carries the page:

| Build | The one moment |
|---|---|
| `oreo-bts` | wheel becomes camera travel *into* a sphere of half a million real fan letters |
| `looped-polyai` | the travelling spotlight — the room drawn in full, then extinguished |
| `bad-omens` | the `SOLD OUT` ticker: the only thing that moves is the thing you cannot buy |
| `viture-neckband` | the object rotates under a spotlight; the page does not |
| `hyperbolic` | the hyperboloid — the logo at full scale, rotating on its own clock, doing no work |
| `sharplink` | the page's own daylight changes, black to cream, in one continuous move |
| `dragonfly` | a fixed ASCII canvas that never leaves the viewport |
| `esther` | the cap detaches from the bottle and travels the full 7,708px |
| `cora` | the sky becomes a wheat field while the copy stays put |
| `growthloop` | the pinned rail lights one line at a time as the panel advances |
| `lore` | one prop, continuously transformed, for 9,000px |
| `psyop` | an empty page becomes a showreel only when you reach for it, and reverses when you let go |
| `provable-explorer` | the cycling search placeholder — the page's entire tutorial, no library |
| `tambo` | the white card lifting off the mint ground |

**The rule underneath: one moment, and everything else is service.** Four of the fourteen achieve
it with no library and no asset (`bad-omens`, `psyop`, `provable-explorer`, `tambo`).

---

## C. HOW THEY TELL A STORY

### C1. The recurring arc

The skeleton, distilled from all fourteen §6 sections:

> **claim → who already trusts it → what it is → who it is for → the numbers → who says so →
> what it cannot do → the objection → the price → the ask**

Two structural rules hold across the set regardless of build type:

1. **Proof precedes features.** `viture-neckband §6` states it flattest: "Proof precedes features,
   and **the caveats are printed in the same section as the boast**."
2. **The ask is repeated but reworded.** `esther §8` — `SHOP PRODUCT` → `SHOP RUM` →
   `SHOP ESTHER` → `GO TO SHOP`, "always as the last line of that section's argument, always
   earned by the paragraph above it."

### C2. Where proof sits

**6 of 14 put proof at position 2 or 3, before a single feature is explained.**
`cora §6` (the testimonial river is section 3 of 11 — "Proof arrives **second, before a single
feature**") · `hyperbolic §6` (`TRUSTED BY LEADING AI TEAMS` at section 2, and named testimonials
again at 6 — "Proof is placed twice, early (logos) and late (testimonials), with the product
demonstration between them") · `growthloop §6` (trust bar at 3, the outcome claim at 4, features
not until 5) · `sharplink §6` (a live `TOTAL ETH HOLDINGS` panel at section 2) ·
`viture-neckband §6` (the numbers at section 3 of 11) · `esther §6` (a **named** expert — Antonio
L. de Haro, "Founder, Rare Spirits Global Society of Rum Explorers" — at 3, and a press wall with
outlets and outbound links at 4).

**3 defer it and then overwhelm.** `dragonfly §6` (the portfolio is section 6 of 8 and runs
4,026px, a third of the page: nine names at display scale, then ~200 companies as plain
alphabetized text — "Proof is deferred until a third of the way down and then delivered at
overwhelming volume") · `tambo §6` (four separate proof *currencies* at positions 5, 9, 10 and 12
— named engineers, named investors, named community apps, screenshotted tweets — and its §11 notes
"Tambo never shows two proof types on the same screen") · `lore §6` (three real humans at beat 12
of 14, with bios so specific they cannot be fabricated).

**6 of 14 ship a named objection section, and 4 of those sit immediately beside the price.**
`cora §6` (#8 security and privacy — four flat claims — then #10 the FAQ: "Wait, does this
actually write and send emails for me?") · `sharplink §6` (#7 FAQ — "**where the actual argument
lives**": "100% of staking yield accrues to shareholders. We do not skim rewards.") ·
`hyperbolic §6` (#9 `faq-traditional`, "The basics, answered") · `growthloop §6` (#11, the
enterprise-security handler) · `viture-neckband §6` (#7's footnote `*6DoF will be enabled combined
with our next-gen glasses` — the caveat printed inside the boast) · `tambo §6` (#4 "Auth just
works", "The boring parts, solved").

### C3. PRODUCT vs PERSON vs DROP — three different builds, kept different

**PRODUCT build — 7 of 14** (`hyperbolic`, `cora`, `growthloop`, `tambo`, `viture-neckband`,
`provable-explorer`, `sharplink`):
- Arc: claim → proof → mechanism → who it's for → the numbers → objections → price → ask.
- The product is shown **doing the thing** (§A7): a live map, a real prompt, an inbox screenshot,
  an instance being created.
- **The numbers are the graphic.** `viture-neckband §10` — section 3 is "a headline, a row of
  comparative numbers set at display size with a gradient clipped into the glyphs, and one
  asterisked footnote naming the baseline … **the numbers ARE the graphic**."
  `provable-explorer §10` — a grid of small equal cards each carrying exactly one named number;
  "the discipline that makes it read premium is that **nothing on the page is bigger than the
  numbers**."
- The ask escalates in specificity and is never more than one screen away (`hyperbolic §8`;
  `cora §8` counts **11 links to the single `sign_up` URL**).
- Price on the page in 4 of the 7.

**PERSON / FIRM build — 3 of 14** (`dragonfly`, `psyop`, `lore`):
- Arc, per `dragonfly §6`: **name → claim → silence → what we think → who we are → who trusts us →
  how you join.** `psyop §6` compresses it to one screen: eleven words, one link, `scrollHeight`
  exactly 900px.
- **Proof is names as running text. Zero logos, on purpose.** `dragonfly §10` — "Dragonfly could
  afford a logo wall. They have about 200 portfolio companies including Avalanche, Polygon,
  Polymarket, Bybit, Aptos, 1inch, Compound. **They ship zero logos.**" `lore §6` — "Proof is
  *people*, not logos — there are **no client marks on the page at all**."
- **The ask is an address, not a button.** `dragonfly §8` — `CONTACT` appears twice, both times as
  "plain 16px uppercase links with a hairline rule under them. No button, no fill, no accent
  colour, no arrow … The page's position is that **if you need a button to find the contact link,
  you are not the founder they want**." `psyop §8` — `(ALL WORK)`, three words in parentheses, the
  only link in the body of the page.
- The person build is where the **silence** is bought in the largest units: `dragonfly §9` ("The
  page buys silence in large, expensive units" — a 910px block carrying four words),
  `psyop §9` ("roughly **55% empty white** by area, and that gap is exactly the space the reels
  fill on hover").

**DROP / CAMPAIGN build — 4 of 14** (`bad-omens`, `esther`, `oreo-bts`, `looped-polyai`):
- Arc, per `bad-omens §6`: **watch the thing → buy the thing → see it live → be told about the next
  thing.** Buying is literally two thirds of the scroll — 6,205px of 9,098px is product grid.
- `oreo-bts §6` inverts the commerce weighting entirely: gratitude → contribute → see everyone
  else's contribution → buy. "**The product is last and smallest.**" A full screen of thanks —
  32 words addressed to the audience — before the product is mentioned.
- **Every screen is a poster.** `esther §1` quotes the studio verbatim: "We designed the site like
  graphic designers, not web designers. **Every screen had to work as a poster on its own, no
  matter where you stopped scrolling.**" That is why `esther §4` uses **one display size for the
  entire site** — `clamp(88px, 11vw, 115px)`, used **34 times**, with no h1/h2/h3 ladder in the
  display voice: a phrase is either a poster or it is 14px mono.
- `looped-polyai §6` is the corpus outlier: **no sections at all**, `scrollHeight === 0`, a state
  machine on one fixed canvas, and the ask is terminal and *earned* — you must finish before you
  are asked for anything, and what is gated is **the visitor's own score**, not a whitepaper.

### C4. Rhythm and length

- **Median page: ~9,000px, about 10 viewports.** `esther` 7,708 · `hyperbolic` 8,419 ·
  `sharplink` 8,664 · `lore` ~9,000 · `bad-omens` 9,098 · `tambo` 9,799 · `cora` 12,318 ·
  `dragonfly` 13,726 · `growthloop` 14,488 · `viture-neckband` **28,540** (≈32 viewports).
- **The two shortest pages are the two most confident:** `psyop` **900px** (one screen, no scroll)
  and `provable-explorer` **3,792px**. `oreo-bts` and `looped-polyai` have no document scroll at
  all.
- **Section heights are deliberately unequal.** `hyperbolic §9` — longest 1,392px, shortest 427px,
  "a **3.3×** span, so the page visibly breathes." `viture-neckband §9` — 1190 / 1785 / 2380 / 595
  / **5040** / 595 / 1785 / 1190 / 1785 / 595 / 1190 / 4985: "The 595px sections are single beats;
  the 5040px one is the set piece." `dragonfly §6` — the `01 ABOUT` section is **268px**, the
  shortest on a 13,726px page, while `GLOBAL SINCE DAY 1` gets 910px for four words.
- **14 of 14 name where the page goes quiet, and the quiet is the luxury signal.**
  `sharplink §9` — "~400 vertical pixels of nothing but render" between the headline and the
  positioning sentence, and three empty columns beside one news card: "**That emptiness is the
  luxury signal, not the render.**" `growthloop §9` — "The page buys its emphasis with emptiness
  rather than with effects." `tambo §9` — ~300px of pure empty mint below the architecture
  diagram. `esther §9` — the `ZERO SUGAR` screen: three display lines and ~900px of empty cream.

---

## D. THE BEST PARTS FOR MICAH, RANKED

His inventory, taken from the live repo: a real book (`The 80% Wall`, ten chapters, 69 pages,
26 companion files, $99 — `app/(foyer)/playbook/page.tsx`), seven drawn spreads plus a cover in
`public/playbook/`, one photograph (`/hero-context.jpg`), **seven ledger receipts with names and
numbers** (`app/(foyer)/page.tsx`), three fixed-price packages ($500 / $2,500 / $7,500 —
`app/(foyer)/packages/page.tsx`), engagements from **$5K a month**, and **two withheld-name
quotes** (`content/work/ordani.mdx` — "A beta user, name withheld"; `content/work/rfp-engine.mdx` —
"The author, name protected").

### 1. The pinned rail with an advancing panel — and one verb per step. **LEGAL.**
**Mechanism.** `position: sticky` on a left column holding an ordered list at `opacity: .48`, each
line lighting to `1` as it crosses reading position on `transition: opacity 300ms`; one image per
step advances in the right column.
**Source:** `growthloop §10` (the `01/02/03` rail — "It costs one sticky container and an opacity
class"), `hyperbolic §10` (the pinned figure with three audiences), `sharplink §7` (five
propositions at ascending opacity), `cora §7` (six sticky panels). **9 of 14 builds run this
family.**
**Mapping.** He already ships the list as a static `<ol>`: `01 Diagnose / 02 Build / 03 Position`,
each with a deliverable line (`→ Positioning audit memo`, `→ Shipped artifact, month one`,
`→ The story the market repeats`). The three panels are `spread-arch.png`, `spread-rings.png`,
`spread-wallchart.png`, already in `public/playbook/`. And `hyperbolic §10`'s rule is already
satisfied by his own copy: **three different verbs** — `Buy the Unstick Session` / `Buy the Audit` /
`Buy the Sprint`.
**Why it is first.** It solves the three-packages problem without a comparison table
(`growthloop §10`: "The rail turns 'here are my packages' into 'here is the sequence, and you are
currently at step two of it'"), it needs one image per step and he has them, it does not pin the
page, does not scrub, does not follow the cursor, and it sits inside the House Lights motion
budget as a two-column layout where one column is taller than the other.

### 2. SPOTLIGHT over INDEX — the two-tier proof block with zero logos. **LEGAL.**
**Mechanism.** A `SEC—0N` mono code and a centred head with the **count printed in 10px mono**
beneath it, then a handful of names promoted to display size with the number as a mono category
label beside them, then the remainder as plain uppercase text with a hairline rule. No images, no
library, no WebGL: an `<h2>`, a mono `<span>`, a `<ul>`.
**Source:** `dragonfly §10` (`BYBIT / CEFI`, `NEAR FOUNDATION / L1-L2S`, with the literal string
`09` in 10px mono under `SPOTLIGHT`), reinforced by `lore §6` and `psyop §10`.
**Mapping.** His ledger is already this data:
`Guardicore · $14M in revenue · acquired by Akamai` · `SurveyMonkey Enterprise · $1M+ toward the
IPO` · `Postmates · acquired by Uber, $2.65B` · `Industry author · 8K → 290K in five months` ·
`Industry author · $3M in contracts won · close rate doubled` · `Ordani · Active paying users` ·
`Consulting · $20M+ in client revenue`. Promote three to display, leave four as text, print
**`07`** in mono under the head.
**Why it fits.** Every "trusted by" pattern he cannot build requires logos; **this one forbids
them**. `dragonfly §10`: "the absence of logos stops reading as a shortage and starts reading as a
house rule." Mono is already cleared in his constitution for "labels, § codes and data" — the
`SEC—04` idiom *is* the § code.
**The guardrail:** `dragonfly §11` — "A text index is honest precisely because it is countable,
and a padded one is the fastest way to lose the reader who counts." Seven, not seventy.

### 3. The provenance micro-line on the proof card. **LEGAL — already in his repo.**
**Mechanism.** `oreo-bts §10` — each letter card carries four typographic elements and nothing
else: the claim, a set of marks, an initials signature, and **a caps micro-line naming where it
came from** (`CON AMOR DESDE ECUADOR`, `MIT LIEBE AUS DEUTSCHLAND`,
`ҚАЗАҚСТАН ЕЛІНЕН ЫСТЫҚ ЫҚЫЛАС`). "No photo, no logo, no video, and the card reads as *from a
specific human in a specific place*." Set the claim at 80% line-height; set the provenance at
.75rem with **+2% tracking**.
**Mapping.** His two attributions are already written and already honest: `A beta user, name
withheld` and `The author, name protected`. `oreo-bts §10` argues the withheld name reads as
**more** credible than a logo wall, not less. `growthloop §10` says the same from the other side:
"A card without a headshot reads as 'this client asked not to be named,' which is a stronger
signal than a stock avatar."
**The edit is typographic, not editorial:** move those attributions out of an italic byline and
into a tracked caps micro-line in the label face.

### 4. The price-comparison sub-headline, above the fold. **NEEDS OWNER INPUT.**
**Mechanism.** `cora §10` — "Cora is the $150,000 chief of staff that only costs $20 per month."
Thirteen words. "It names the expensive alternative, names the price, and does the buyer's
arithmetic in the same breath — and it sits above the fold, under the headline, **not in a pricing
section**."
**Mapping.** He has the raw material and needs no proof he lacks: he knows what the alternative
costs, and he has `$99`, `$500 / $2,500 / $7,500`, and `$5K a month` already priced.
**Why it needs owner input:** the comparison figure is a claim about someone else's cost. It has to
be a number he will defend, and it belongs in the LESSONS #3 verified-facts ledger with a source
and a date before it goes on a surface. Do not ship a round number nobody sourced.

### 5. The price in the persistent header, plus an attribution param on the terminal CTA. **LEGAL.**
**Mechanism.** `viture-neckband §10` — `FROM $328` sits in the fixed nav beside the CTA from pixel
one, "so it is the loudest thing on screen at all times and never has to be repeated mid-page";
between hero and footer there is **no interstitial buy button** across eleven sections. And the
final CTA carries `?discount=neckband`, so "the page's contribution stops being a guess."
**Mapping.** `FROM $99 · The manual` in the `/playbook` header; `FROM $500` on `/packages`. Both
pages currently hide price below the fold. The query param is one line.
**Reinforced by:** `cora §8` — "no separate pricing page — **the price is on the page**." And by
the contrast in §A8: the studios never price themselves, and always price their clients.

### 6. The one-number card grid — with the footnote that names the baseline. **LEGAL.**
**Mechanism.** `viture-neckband §10` — a headline, a row of comparative numbers at display size,
and **one asterisked footnote naming what the number is measured against**
(`*Compared to VITURE One Neckband`): "two things make it work and both are free: the footnote
naming what the number is measured against, **which turns a boast into a claim someone could
check**; and the placement — proof at position 3 of 11, before a single feature is explained."
`provable-explorer §10` supplies the restraint: equal cards, a mono uppercase label, one figure at
24–32px, borders at 4% ink, and **nothing on the page bigger than the numbers**.
**Mapping.** `40% → 91%` needs `*intake completion, Ordani beta`. `8K → 290K` needs `*monthly
reach, five months`. `$3M` needs `*contracts won through the platform`. His LESSONS #3 ledger
already enforces exactly this discipline; the design move is to **print the ledger's provenance on
the page** instead of keeping it in the repo.

**Ranked below the top six, and worth taking:**

7. **The opacity-graded headline.** `provable-explorer §10` — the h1 is four spans, one word at
   100% ink and three at 64%: a full hierarchy at **32px** with no second font, no colour and no
   size jump. It degrades honestly too — the two low-ink spans are `hidden md:block`, so at 390
   the headline **shortens itself to the two words that matter**. **LEGAL**, free, and it maps
   straight onto his rolling-word hero.
8. **The withheld hero + the nav that is not there yet.** `psyop §10` (eleven words and one
   parenthetical link — his `(ALL WORK)` is `(READ THE BOOK)`) plus `bad-omens §10`
   (`data-hide="true"` and `opacity:0` on the fixed header at scrollY 0, released over 300ms
   `cubic-bezier(.4,0,0,1)` after the first viewport). **LEGAL** — one CSS transition, no library,
   and `bad-omens §10` flags it explicitly as a fade rather than a second signature motion.
9. **The hover-revealed row.** `psyop §10` — 1px accent rule `scaleY(0)→1` from `top left` over
   `.45s`, a 160px thumbnail fading in at the row's left margin over `.4s`, `(VIEW)` flush right
   over `.5s`. "Rows he has no image for simply show the hairline and the label; **the mechanism
   degrades per-row without looking broken, which a logo grid cannot do**." **LEGAL**, pure CSS.
10. **Author the path in the markup.** `esther §10` — invisible 1px marker divs placed inside the
    sections put the choreography where the content lives, so one drawn page travels the scroll on
    a CSS `offset-path` with no WebGL and no model. **LEGAL as code, but this is a second signature
    motion** and `.claude/CLAUDE.md` requires the motion-engineer's written approval. Park it.
11. **The result-gated ask.** `looped-polyai §10` — "Gate the visitor's own result, not your
    content — and only after you have given them something." The honest half shows free on screen;
    the tailored write-up is what the email buys. **NEEDS OWNER INPUT** — new copy, new logic, and
    the scoring has to be real.
12. **The colour-world set.** `lore §10` — name several palettes and let one carry the page. He
    already ships the better version: `app/(foyer)/page.tsx` runs `data-world` on terracotta /
    bone / petrol / espresso with a `WorldSwitcher` cross-fading at viewport centre. Lore's is
    randomised per load; his is deterministic per section, which is correct for a page that must
    read the same twice. **Deepen it per `sharplink §7` (§F below); do not randomise it.**

### ILLEGAL — named, with the teardown that says so

- **Any WebGL hero.** `oreo-bts §11` · `dragonfly §11` · `lore §11` · `hyperbolic §11` ·
  `esther §11`. Five of the fourteen tells are the same tell. `lore §11`: "Do not attempt a
  low-poly version: **a cheap 3D word reads worse than no 3D at all.**"
- **A 3D scan, render sequence, or turntable of anything.** `viture-neckband §11` ("Do not attempt
  a frame sequence with a photograph of yourself"), `sharplink §11` ("There is no cheap version"),
  `esther §11`.
- **Stock photography, AI stills, an icon kit, an illustrated world.** `cora §11` ("Do not try to
  fake it with stock skies or an AI-generated landscape; the whole effect depends on the paint
  being authored for this page"), `bad-omens §11`, `growthloop §11`, `hyperbolic §11`.
- **A logo wall or a "trusted by" marquee.** `hyperbolic §11` — "Micah has no logos and one
  anonymous quote — the marquee is not available to him, and **faking it is out of the
  question**." `growthloop §11`, `viture-neckband §11` ("Micah has no logos and must not fake an
  equivalent").
- **A scarcity ticker over scarcity that does not exist.** `bad-omens §11` — "a scarcity ticker
  over fake scarcity is **the one way this borrow goes wrong**."
- **A mascot or a stand-in figure.** `tambo §11` — "a stand-in mascot on a consultant's site is
  worse than no mascot, **the same reasoning that deleted the 'MJ' monogram from `/about`**."
- **A padded proof index.** `dragonfly §11`.
- **A live-data panel fed by dummy tickers.** `sharplink §11` — "faking one with dummy tickers is
  the exact opposite of the honesty this design trades on."

---

## E. THE TELLS — what is budget, and what is trend

### E1. Budget. Cannot be faked, in descending order of how often it appears.

1. **Custom or licensed type — 8 of 14. The most-repeated tell in the whole set, ahead of the 3D.**
   `hyperbolic §11` (the display face `kh` drawn for the client — "a five-figure line item in a
   brand-identity engagement") · `psyop §11` (New Heterodox Mono + FT Calhern, "a paid identity
   deliverable, not a Google Fonts pairing") · `lore §11` (ABC Ceraph + ABC Oracle, paid Dinamo
   faces) · `esther §11` (four licensed families) · `provable-explorer §11` (Innovator Grotesk in
   **18 self-hosted faces** plus PP Supply Mono) · `cora §11` (**14 preloaded Signifier faces** —
   "the page uses maybe four of them") · `dragonfly §4` (FK Roman Standard + NON Natural Grotesk +
   NON Natural Mono, 32 `.woff2` files) · `looped-polyai §11` (a licensed display face doing the
   whole typographic job, plus the wordmark drawn as artwork rather than typed).
   **This is the tell Micah cannot chase at all** — the Artifact CSP admits only Google Fonts, and
   `lib/fonts.ts` is already committed. What *is* copyable is the behaviour, and every teardown
   says so: `hyperbolic §11` — "the *behaviour* is copyable (one display face, tight negative
   tracking, caps confined to the h1) with any well-cut retail face."
2. **Bespoke 3D with a modelling and lookdev pipeline — 5 of 14.** `oreo-bts §11` (a Cinema 4D
   Korean night market, hand-lettered Hangul neon, a licensed BTS likeness, a Theatre.js camera
   timeline, four named 3D/creative-tech credits *plus* a separate brand agency) · `dragonfly §11`
   (a Blender dragonfly through a custom WebGL ASCII shader the studio **shipped as its own public
   product** at `ascii.dragonfly.xyz` — "a modelling budget, a shader-authoring budget, and a
   spare-tool budget on one line item") · `lore §11` · `esther §11` (a DRACO-compressed GLTF cap
   lit to match the photo shoot, plus an idle-triggered lion easter egg) · `hyperbolic §11` (and
   note *why* it works: "it works because the company is *named* Hyperbolic — the geometry and the
   name are the same object. **A commissioned mark rendered live is not a pattern; it is a
   budget.**")
3. **A commissioned illustrator or animator — 4 of 14.** `cora §11` (76 painted landscape frames,
   two custom worlds) · `hyperbolic §11` (dithered botanicals in a proprietary treatment) ·
   `tambo §11` (six octopus loops, one verb each) · `looped-polyai §11` (Glenn Catteeuw designing
   an entire maze and character set in Figma tile by tile, exported through TexturePacker: six wall
   sheets, a character set, five voice recordings, four music loops).
4. **A crew — photography or film with a grade — 4 of 14.** `bad-omens §11` (a 4392×3164 still
   from a built music-video set, plus a full merch shoot with **a second angle per SKU** purely to
   feed the hover crossfade) · `esther §11` (flash-lit night photography, four bottles, a red
   table) · `growthloop §11` (commissioned photography colour-graded into duotone with the client's
   wordmark burned in) · `psyop §11` (twenty-five years of Netflix/Nike/Google broadcast
   animation: "the same interaction with generic B-roll reads as a screensaver").
5. **Borrowed institutional authority — 5 of 14.** `tambo §11` (**eighteen** third-party
   endorsements across four currencies) · `cora §11` (Mike Krieger, Kevin Roose, Andrew Wilkinson
   — "**That distribution is the asset, not the design**") · `hyperbolic §11` · `growthloop §11`
   (a Google Cloud Partner of the Year band and G2 badges) · `viture-neckband §11` (the persuasive
   force of section 5 "is entirely borrowed from Netflix, Xbox and Disney+ owning those marks").
6. **Prerendered CGI or a frame-sequence render farm — 2 of 14.** `viture-neckband §11` (a
   336-frame sequence, up to seven canvases, thirteen bespoke `.webm` with `-sd` variants) ·
   `sharplink §11` (two studio-rendered films at 2160×1620 and 1200×1600).
7. **A real data pipeline — 3 of 14.** `provable-explorer §11` (an indexer backend and a year of
   integration) · `sharplink §11` (the live panel that rendered `data not available` on the probe —
   "which is itself instructive: the number is genuinely live, not baked") · `oreo-bts §11` (half a
   million rows behind a global API in 90 locales).

**The load-bearing observation, from `sharplink §11`:** "**stripping both tells leaves the page
almost intact.** Kill the videos and you still have: a fixed gradient atmosphere, one
Archivo/Archivo-Narrow pair, thirteen hex literals, a 15% dashed grid, one 13px label style, five
propositions against a pinned column, and 400px of deliberate emptiness under the headline. **That
residue is the borrowable site.**"

### E2. Trend. Will date, or is already dating.

- **The marquee of borrowed marks.** 5 of the 7 marquees in the set are logo or tweet walls
  (§B5). `tambo §7` names the giveaway: the content is duplicated verbatim in the DOM.
  **`bad-omens §7` is the only marquee in the corpus carrying information the visitor needs.**
  (Micah's Pass-68 deletion of his own ✦ marquee is confirmed correct by this count.)
- **The nav hidden behind a single MENU pill.** `dragonfly §3`, `bad-omens §3`, `esther §3`,
  `lore §3` — beautiful and hostile. `provable-explorer §3` keeps all six items visible and
  `psyop §3` justifies all five edge-to-edge, and neither loses anything.
- **The floating pill nav.** `tambo §3` (a triple-pill with two social counters), `cora §3` (a
  two-item pill). This is the 2026 shape and it will read as 2026 in 2028.
- **The announcement bar.** `growthloop §11` — "a shipping-cadence flex that only works when there
  is a product org behind it; **on a one-person site it reads as a stale banner within a month**."
- **Gradient text fills.** `viture-neckband §5` (`background-clip` into the stat numerals),
  `oreo-bts §5` (an SVG inset-shadow filter faking extruded neon glass on live text). Both are
  brand-specific; neither survives being borrowed.

**What is NOT trend and has already outlived a cycle:** `position:sticky` plus an opacity class
(9 of 14), the near-black-not-`#000` / off-white-not-`#fff` pair (12 of 14), one accent
(14 of 14), the type-role split with mono fenced to labels (6 of 14), one label style at one size
repeated fifteen times (`sharplink §10`), and the two-keyframe ceiling (`hyperbolic §7`,
`lore §7`, `dragonfly §7`).

---

## F. WHAT STUDIO FREIGHT WOULD BUILD FOR MICAH

**In the client-work register, not the studio-homepage register.** So: no 26-tile mosaic, no
corner chrome, no 900px non-scrolling home (`studiofreight §4`). What they build for a client is a
~9,000px argued page with one accent, a pinned rail, proof at position two, the price printed, and
a quiet ask.

**And the corpus says he is two clients.** He is a PERSON (the consultant — `dragonfly` / `psyop` /
`lore` register) *and* a PRODUCT (the $99 manual — `cora` / `tambo` / `viture-neckband` register).
The set never blends the two. **Give the person the home and the product the `/playbook`, and make
them one house through ground, accent, label style and easing — never through layout.**

### F1. Hero — `sharplink §3`'s four-block first screen, which needs no render at all

Headline hard left in the top-left quadrant. Two CTAs beneath it. Then **~400px of nothing**. Then
the positioning sentence pinned bottom-left and one dated proof row bottom-right.
`sharplink §9`: "**That emptiness is the luxury signal, not the render.**" And `sharplink §11`
confirms the residue survives without the CGI.

His live copy already fits: `I build the [go-to-market / product / data platform / RFP engine].`
(`components/color-worlds/Hero.tsx`), with the sub-line from his own metadata — *"Four exits behind
my work, $5B+ combined. $20M+ in client revenue."* Bottom-right: one ledger row, dated —
`Guardicore · 2018–2021 · $14M in revenue · acquired by Akamai`.
**Cheaper than the rolling word, from `viture-neckband §3`:** set the *noun* in the accent and the
connective words in ink, so the glance-read is `[the] product` — two-tone, no JS, no timers.

### F2. Type class + Google Fonts candidates

The most-copied pattern is the three-role split (6 of 14): a display face with negative tracking,
a text face, and **a mono fenced to labels, § codes and data**. `lib/fonts.ts` already runs exactly
that — Bricolage Grotesque (with `opsz`), Hanken Grotesk, JetBrains Mono. **Keep it.** Candidates
if a pairing is ever revisited, all served by `fonts.googleapis.com` / `fonts.gstatic.com` (the
only stylesheet origin the Artifact CSP admits):

- **Instrument Serif** (display, 400) — the `cora §4` / `tambo §4` move: a light-weight contrast
  serif at 55–64px with −0.05em tracking. Both builds set display at **300**; Instrument Serif's
  single weight is the retail equivalent.
- **Archivo + Archivo Narrow** — the `sharplink §4` pair: one superfamily doing display *and*
  label, and `sharplink §10`'s finding that "**you do not need a mono face to get the technical
  register; tracked condensed uppercase does it**." Archivo Narrow at 13px / 500 / +0.08em /
  uppercase is that label style exactly.
- **Bricolage Grotesque** (already his) — `oreo-bts §4` runs the same variable face driven to
  `font-variation-settings: "opsz" 72, "wdth" 75`, getting a condensed display cut out of one file
  rather than licensing a second face. "That is the whole trick."

**One label style, one size, everywhere.** `sharplink §10`: "one label style at **one** size,
repeated fifteen times, is what makes a page feel systematic." JetBrains Mono, one size, uppercase,
tracked open — kickers, § codes, dates, stat captions, buttons. Nothing else.

**Weight discipline:** display at 300–500 (12 of 14). His display is currently doing more work
through size than weight, which is right; the rule to add is that **sub-heads must be lighter than
section heads** (`hyperbolic §4` — "which is what keeps an 8,419px page from shouting").

### F3. Palette stance

- **One accent. It stays copper.** 14 of 14, zero exceptions. Ration it: `hyperbolic §5`,
  `sharplink §5`, `dragonfly §5` all keep it to single digits per screen, and `bad-omens §5` keeps
  it **off type entirely** — labels and wipes only. His WCAG rule (`--accent-copper-deep #8E3A1E`
  for body emphasis) survives untouched, because in this register the accent barely touches body.
- **Near-black, not `#000`; paper, not `#fff`.** 12 of 14. He already ships `#0D0D0F` and
  `#F5EFE4`, which is the correct pair.
- **Deepen `data-world` into `sharplink §7`'s fixed atmosphere.** Today his `WorldSwitcher`
  cross-fades the palette as each section crosses viewport centre — four discrete swaps.
  SharpLink's version is one `position: fixed; height: 100lvh` ground at `z-index: 0` that **no
  section overrides**, with a gradient sheet parallaxing over it: the page travels from espresso to
  bone as *one continuous move*, so a section never "starts" — the light just changes. Cost: one
  fixed div, one custom property driven from scroll, `will-change: transform`. It resolves to the
  finished frame under `prefers-reduced-motion` by construction.
- **Add the 15% hairline as a single token.** `sharplink §10` — `--stroke-black-subtle: #00000026`
  and `--stroke-off-white-subtle: #f3f3f326` are the *same* 15% alpha inverted, drawn as dashed
  SVG rules with tiny accent square ticks at the origins. "For a consultant with seven receipts and
  no logos, a visible column grid is **free architecture** — it makes a page with little content
  look designed rather than empty."

### F4. The narrative arc for HIS page, in his own live copy

| # | Beat | His words (live, from the repo) | Cited to |
|---|---|---|---|
| 1 | **Hero — claim, two CTAs, 400px of nothing, sentence bottom-left, one dated row bottom-right** | `I build the go-to-market.` · `Four exits behind my work, $5B+ combined. $20M+ in client revenue.` | `sharplink §3`, `§9` |
| 2 | **Proof, at position two, before any service is named** — SPOTLIGHT (3 receipts at display, number as mono category) over INDEX (4 as text), `07` in mono under the head | `Guardicore · $14M in revenue · acquired by Akamai` · `Postmates · acquired by Uber, $2.65B` · `Industry author · $3M in contracts won · close rate doubled` · then the remaining four | `dragonfly §10`; `cora §6` ("Proof arrives second, before a single feature") |
| 3 | **The pinned rail** — sticky `01/02/03` at `opacity:.48 → 1`, one drawn spread advancing beside it | `01 Diagnose` / `02 Build` / `03 Position`, each with its `→ artifact` line | `growthloop §10`, `hyperbolic §10` |
| 4 | **The product, shown doing the thing** — the manual as an object, `WallChart` already drawing page 6, the spread in a frame that reads as *the artifact* | `The AI handed you the code. Now ship the company.` · `Ten chapters, 69 pages, 26 files` | `tambo §3`, `cora §6.4` |
| 5 | **The numbers as the graphic, each with its footnote** — display-size figures, mono labels, borders at 4% ink, nothing on the page bigger | `40% → 91%` `*intake completion, Ordani beta` · `8K → 290K` `*monthly reach, five months` | `viture-neckband §10`, `provable-explorer §10` |
| 6 | **The objection, in the buyer's own voice, beside the price** | `Is this for me, if I vibe-coded it?` · `What if it does not help?` — *"Thirty days, full refund, no questions asked."* | `cora §10` ("the 'Wait,' is doing the work"), `sharplink §6.7` |
| 7 | **The price, on the page** | `$99` · `$500 / $2,500 / $7,500` · `The engagements start at $5K a month` | `cora §8`; 5 of 14 print it, 0 of 14 studio sites do (§A8) |
| 8 | **The ask, quiet, in his words** — one filled pill, one outlined, nothing else | `Name the problem →` · `Buy the manual · $99` · `Buy the Audit` | 10 of 14 (§A8); `growthloop §8` ("two button styles on the whole site"); `hyperbolic §10` (a distinct verb per ask) |

### F5. The motion grammar to use — and what stays still

**Use, in total:**
1. **One sticky rail.** `position: sticky` plus an opacity class. No pin on the page, no scrub.
   [9 of 14 · `growthloop §7`]
2. **Entrance offsets declared in markup, fired once behind a guard.** `data-reveal='{"y":"30%"}'`
   on the block, media at 10% so **the picture lands before the claim**; the finished frame ships
   in the SSR HTML and JS only hides it. [`hyperbolic §7`, `growthloop §7`, `viture-neckband §7`]
3. **One hover reveal on the ledger rows.** `::before` `scaleX(0) → scaleX(1)` from
   `transform-origin: 0` over **300ms** `var(--ease-out-expo)`, with the screenshot fading in at
   the row's left margin over 400ms — and rows with no image showing only the hairline.
   [`bad-omens §7`, `psyop §10`]
4. **The fixed-atmosphere ground change** (F3 above). [`sharplink §7`]
5. **`--gleasing: cubic-bezier(.4, 0, 0, 1)` as a token**, plus `--ease-out-expo:
   cubic-bezier(.19, 1, .22, 1)`. [4 of 14 ship the first under that name · `oreo-bts §7`,
   `viture-neckband §7`, `bad-omens §7`, `tambo §5`]
6. **A ceiling of two named `@keyframes` on the whole page.** [`hyperbolic §7`, `lore §7`]

**Stays still:**
- **The type.** 8 of 14 explicitly. `tambo §7`: "The H1 does not animate in — it is simply *there*
  on first paint. On a 10.9-viewport page that is a lot of restraint." His `SplitReveal` is the one
  existing component the corpus would question; if it stays, it should be the *only* text entrance
  on the page, not the default for every `h2`.
- **The hero.** `growthloop §7` — a photograph and a sentence, and it does not move.
- **The photograph.** `esther §7`, `bad-omens §7` — no parallax, no Ken Burns, no scrub on
  `/hero-context.jpg`.
- **The chrome.** `looped-polyai §7`, `lore §7` — the header never shrinks, never hides, never
  moves once revealed.
- **The pointer.** **13 of 14 have no cursor follower.** The `pointermove` handler in
  `components/color-worlds/Hero.tsx` that writes
  `h1.style.transform = translate(tx*6*scale, ty*4*scale)` is a cursor-coupled drift; `dragonfly`
  is the corpus's only pointer effect and its version is a *designed lens*, not a wobble. **Cut
  it.** The `MagneticArea` component belongs to the same family and gets the same ruling.
- **No velocity skew, no horizontal section, no page-transition curtain, no marquee.**

### F6. How the book and the person each get shown

**The book — product register.** `tambo §3`'s dashed-frame device: the spread sits in a frame that
reads as *the artifact being produced*, not as a screenshot. `viture-neckband §10`: `FROM $99` in
the header from pixel one, and no interstitial buy button between hero and foot. `cora §10`'s
frame-sequence, scaled down honestly: his seven drawn spreads stacked in one `100vh` sticky panel
with `visibility` toggled on scroll is nine frames instead of thirty-eight, needs no canvas, no
GSAP, ~40 lines — **the book draws itself as the reader descends.** (Note this competes with the
pinned rail for the one-signature slot; pick one.)

**The person — person register.** `dragonfly §10`'s names-as-text and `lore §6`'s bios "so specific
they cannot be fabricated." He has that material: `I joined Postmates, SurveyMonkey, Guardicore
(Akamai) and Neuton.AI early` is unfakeable in exactly the way Lore's founder bios are. One
photograph, held still, used once — `esther §10` and `bad-omens §10` converge on the same
sentence: **let the artifact be the only ornament.**

### F7. Where the ask lives, in which of his words

`sharplink §8`'s shape. Primary in the hero: a near-white chip with **the accent square arrow chip
bolted to its right edge**, square corners, 13px tracked caps — reading **`Name the problem →`**.
Secondary directly beneath, same size, grey chip, **no arrow** — **`See the packages`**. Then
nothing until the foot, where the same pair returns.
Plus `viture-neckband §10`: **`FROM $500`** lives in the header the whole way down, so the "what
does this cost" scroll never happens; and the terminal CTA carries an attribution param so the
page's contribution stops being a guess.
Plus `hyperbolic §10`'s rule, which he already satisfies: **three asks, three verbs** —
`Buy the manual` / `Buy the Audit` / `Name the problem`. Never `Learn more` as a primary.

---

## Counts at a glance

14 builds · 14 teardowns read · 42 screenshots on 3 contact sheets (14 each).
**14/14** one accent, zero second accents · **12/14** the client's own brand colour ·
**12/14** avoid pure `#000`/`#fff` for ground or type · **12/14** display type at weight 300–500 ·
**9/14** zero `clamp()` · **5/14** the same `min(calc(N*100/--device-width*1vw), …)` formula ·
**6/14** the display/text/mono-label split, mono never in body · **8/14** uppercase once or never ·
**7/14** three or fewer visible nav targets · **10/14** a named number by the second screen ·
**5/14** print a price (vs **0/14** studio sites) · **10/14** file the ask as quiet ·
**12/14** Lenis · **8/14** GSAP · **7/14** three.js · **4/14** no animation library at all ·
**9/14** a sticky pin · **0/14** scroll-jack · **1/14** a cursor follower · **7/14** a marquee
(only **1** carrying information) · **8/14** the type does not animate in · **2** named keyframes
is the ceiling · **14/14** name exactly one motion moment · **6/14** proof at position 2–3 ·
**6/14** a named objection section · **8/14** custom or licensed type — the most-repeated tell.
