# looped-polyai — Looped (PolyAI), built by darkroom.engineering + Studio Freight

> Note on quotations: three words in the source copy sit on this repo's copy-lint ban list, so they
> are shown as `[…]`. Every other quoted string below is verbatim from the live site or the
> studio's case-study page.

## 1. Fetch proof

- **Live client URL:** https://looped.poly.ai/ — **HTTP 200** (`Server: Vercel`, `X-Matched-Path: /home`, `Content-Length: 38713`).
- **`<title>`:** `Looped: A Customer Service Nightmare`
- Live-site provenance in the client's own head: `<meta name="author" content="Studio Freight"/>`, `<link rel="author" href="https://studiofreight.com"/>`, `<meta name="application-name" content="polyai-website"/>`. So the build ships inside PolyAI's own web property, on PolyAI's own subdomain, with the studio's authorship stamped in the metadata.
- **Studio pointer (case study):** https://darkroom.engineering/work/looped — **HTTP 200**, `<title>Looped - darkroom.engineering</title>`. Its body carries `Live Site ↗` pointing at `https://looped.poly.ai/`, so the pointer resolves to the live client site (rubric requirement satisfied — this report is about the client build, not the case-study page).
- **What the case-study page says they did** (2 lines, one adjective elided):
  > "PolyAI came to us with a familiar frustration: customer service wait times that drain the soul. Instead of the usual tedious hold music, they wanted something […] — a gaming experience that turns wasted minutes into actual fun."
  > "The catch? We had to build a browser-based 2D pixel art maze game in collaboration with Studio Freight and Glenn Catteeuw that would be engaging and responsive."
- Credits block, verbatim: `Client: PolyAI` / `Pixel Art Design: Glenn Catteeuw` / `Development: darkroom.engineering` / `Collaboration: Studio Freight`. Role line: `front-end development / creative development / motion & interactions`. Year `2024`. Type `Game`.
- Declared stack on the case study: `front-end: next.js`, `game engine: Custom-built with Three.js`, `server architecture: vercel`, tools `three.js / theatre.js / howler.js / gsap`, `figma / texturepacker`.

## 2. The client and the product

PolyAI sells enterprise voice AI that replaces IVR phone menus; **Looped is not a page about that product — it is a free browser game the buyer plays, whose ending trades the player's score for their business email.** The thing being sold is the pain of hold music, dramatised, then relieved by the brand.

## 3. First screen

- **Assertion, in 8 words above the button:** eyebrow `PolyAI presents` → wordmark `LOOPED` → dek `A Customer Service Nightmare` → button `Enter if you dare...`. That is the entire first screen. No paragraph, no nav menu, no product claim. Extremely aligned: title, one-line genre, one verb.
- **What the hero IS:** a full-viewport WebGL2 `<canvas>` (measured 1440×900, `style="display:block; width:1440px; height:900px"`) rendering a hand-drawn **pixel-art** scene — an isometric tangle of dead office tech (a corded handset, keypads, cables) in violet, with the acid-green player character (a ball with a worried face) parked at the right edge. The `LOOPED` wordmark is *drawn into the pixel art*, not set in a webfont. Texture source: `/textures/intro.png` + `/textures/intro.json` (TexturePacker atlas); mobile gets a separately-authored `/textures/intro_art_mobile.png`.
- **Nav pattern:** there is no `<nav>` element on the page (`document.querySelectorAll('nav').length === 0`). The header holds exactly **two** items: the PolyAI dot-matrix logomark (top-left, a `<button>`, not a link) and a single text link top-right, `Visit PolyAI` → `https://poly.ai/`, underlined, in `--macaw`. In-game the right slot swaps to a circular music-toggle button. Two affordances, both persistent, nothing hidden behind a hamburger.

## 4. Type system FROM THE CSS

Single face, single weight, entire site:

```
@font-face{font-family:__tge_675934;
  src:url(/_next/static/media/a64fc1563d6920ba-s.p.woff2) format("woff2");
  font-display:swap;font-weight:400;font-style:normal}
@font-face{font-family:__tge_Fallback_675934;src:local("Arial");
  ascent-override:95.08%;descent-override:25.93%;line-gap-override:2.57%;size-adjust:144.61%}
```
- `--font-tge: "__tge_675934","__tge_Fallback_675934"` — `next/font/local`, name obfuscated. Computed `body{font-family:__tge_675934, __tge_Fallback_675934}`. It is a wide, low-contrast pixel/terminal grotesque (see screenshots) — the whole page is one voice.
- **No display/text split.** The display role is played by *artwork*, not by a second family. The only weight declared anywhere in the seven CSS bundles is `font-weight:400` (7 occurrences). No italic, no variable axis.
- **No mono family** — the pixel face already reads as machine. **No `text-transform` declarations at all** (0 occurrences): the ALL-CAPS look of `LOOPED` is baked into the raster art, and UI strings stay sentence case (`Enter if you dare...`, `Ok, got it!`, `I'm ready!`).
- **No `letter-spacing` declarations at all** (0 occurrences) and **no `clamp()`** (0 occurrences). Sizing is pure viewport-proportional: desktop `font-size:.625vw / 1.1111vw / 1.3888vw / 1.6666vw / 2.2222vw / 2.7777vw`; mobile `2.4vw / 4.2666vw / 5.3333vw / 6.4vw (×7) / 8.5333vw (×4) / 10.6666vw`. Everything scales with the window, like a game HUD — the type never reflows, it zooms.
- Fallback is `local("Arial")` with a **144.61% size-adjust**, i.e. the face is small-on-the-em and they metric-matched it hard so the swap does not jump.

## 5. Palette from the CSS

Named tokens resolved live off `:root`:

| token | value | role |
|---|---|---|
| `--black` | `#231F20` | ground / ink. Also the `<meta name="theme-color">`. |
| `--macaw` | `#D9EE50` | acid yellow-green — the player, the wordmark, the timer, the `Visit PolyAI` link. THE accent. |
| `--purple` | `#C3AFFE` | the maze world's light |
| `--red` | `#FF9292` | alarm — the EXIT sign, failure states |
| `--blue` | `#6FE1EE` | fourth world tint |
| `--white` | `#ffffff` | UI windows |
| `--grey-100/200/300` | `#F1F1F1 / #E8E8E8 / #B5B5B5` | the fake-OS dialog chrome |

Only literal hexes left in the shipped CSS: `#000` (3), `#fff` (2), and one `rgba(35,31,32,.5)` — i.e. `--black` at 50%, used as the vignette/scrim. Everything else is a token.

The structure is a **theme swap, not a palette**: `--background`, `--text-color`, `--accent-color`, `--light-stroke`, `--dark-stroke` are each redefined five times over (`var(--macaw)` / `var(--red)` / `var(--purple)` / `var(--blue)` / `var(--grey-200)`) under theme classes, with matched `-100/-200/-400/-600` stroke ramps. One component set, five colour worlds, swapped per game zone.

Is it the client's brand colour doing the work? **Partly.** PolyAI's own site brand is a deep navy/violet with a lime accent; `--macaw #D9EE50` is that lime pushed to maximum, and it is doing nearly all the work — on a `#231F20` ground it is the only thing your eye can land on. Purple/red/blue are game-world colours invented for this build, not brand colours.

## 6. The narrative arc

There are **no sections.** `document.body.scrollHeight === 0`. The page never scrolls at any width. The arc is a *state machine* on one fixed canvas:

1. **Title card** — logo, `PolyAI presents`, `LOOPED`, `A Customer Service Nightmare`, `Enter if you dare...`. Timer already visible at `04:00`, frozen.
2. **How To Play** — three stacked fake-OS dialogs, each one sentence, each with its own button, plus a `Skip`:
   - "Use the arrow keys to navigate through this maze of outdated technology." → `Ok, got it!`
   - "Watch out! Conquer the challenges ahead, or get sent back to the start." → `Ok, got it!`
   - "Escape the maze in 4 minutes or be stuck in the automation loop forever!" → `I'm ready!`
   (mobile substitutes "Use the joystick…" and a joystick image — two authored copies, not one responsive one.)
3. **The maze** — top-down cubicle floor, timer running (verified counting `04:00 → 03:52`), the acid-green ball as avatar, a pink `EXIT` sign bottom-right. Six wall texture atlases (`walls-0`…`walls-5`) = six zones.
4. **The minigames**, each a named riff on a real phone-support humiliation: `Hold Music Hell`, `Resetting Menu Maze` ("Press 0 for Operator / Press 1 for Sales / Press 2 for Billing / Press 3 for Tech Support"), `Re-Explaining to the Agent`, `Long Recorded Message`, `Glitchy says...`. Failure copy stays in character: "Back to square one! The menu maze claims another victim." / "The agent's as lost as the bot. Time to start all over again."
5. **Result screen one** — win: "You escaped the Automation Loop with $TIME left!" / lose: "Uh-oh, you've become a permanent resident of Looped." Four buttons: `Sign up to see how you compare` · `Share your time` · `Play again` · `Visit PolyAI`.
6. **Result screen two — the ask.** "We think you'll be pleased with your time in Looped" / "Submit your email to see your results and […] your game summary." Email form (business-email validated: "Please use a business email address"), full country dropdown, consent checkbox "I agree to receive other communications from PolyAI", `Submit`, `Privacy Policy`.
7. **Screen three** — "Thanks! / Your results are on the way—check your inbox soon." then back to `Share` · `Play again` · `Visit PolyAI`.
8. **Screen four** — the share card, prewritten: "I escaped endless hold music and 'I don't understand' bots, thanks to PolyAI." (loss variant: "I got trapped in endless hold music and 'I don't understand' bots. If only I'd trusted PolyAI.")

## 7. Motion grammar

**Libraries actually in the runtime**, detected as globals on the live page: `__THREE__`, `gsapVersions`, `lenisVersion`. `Howl`/`Howler` present in the page chunk (11 `Three` refs, 5 `Howl`, 1 `theatre`). The studio's own declared list matches: three.js / theatre.js / howler.js / gsap.

- **WebGL canvases: 1** (webgl2, full viewport, the entire experience). **Videos: 0. `<audio>` elements: 0** — all sound is Howler-driven `.mp3`/`.wav`: `audio/loops/intro.mp3`, `main.mp3`, `main-build.mp3`, `end.mp3`, plus per-character voices `brain.wav`, `computer.wav`, `skull.wav`, `tape.wav`, `glitchy.wav`. The music layers *build* as you progress (`main` → `main-build`), which is the score reacting to the player.
- **Scroll-driven behaviour: none, deliberately.** `lenis` is on `<html class="__variable_675934 lenis">` because it comes with the studio's Satus template, but the document height is zero. There is no pin, no parallax, no horizontal section, no scrub, no reveal-on-scroll, no page transition, no marquee, no cursor follower (`body{cursor:auto}`). This is the corpus's outlier and the reason it is worth reading: **they threw the entire scroll vocabulary away and put the motion budget into a game loop.**
- **What moves instead:** arrow-key avatar movement with a spotlight/vignette that travels with the player (verified — the ball moved and the light moved with it); a live countdown in `--macaw`; sprite-sheet character animation (custom system, atlases named e.g. "reset — 7 frames", "Hold music hell - 8 frames"); custom shaders — the chunk contains a pixelation + `random(pixelUvs*100.)` dissolve with a `uAppear` uniform mapped through `mapRange(0.,1.,uAppear,-0.1,1.1)`, i.e. a **noise-threshold wipe** used for element appear/disappear; and Theatre.js-authored vignette and glitch distortion (per the studio: "giving Glenn real-time control to fine-tune visual effects like vignette and glitch distortions").
- **What is deliberately still:** the header. Logo left, one link right, and they never move, never shrink, never hide — the only fixed furniture in a page where everything else is animation.
- **The ONE motion moment that carries the page:** the **travelling spotlight**. The room is drawn in full detail and then almost entirely extinguished; a soft radial light rides the player, so the maze is revealed only in the radius you occupy. It converts a flat 2D top-down tilemap into dread, it makes a 4-minute timer feel like a threat, and it costs one shader — no rig, no crew, no scan.

## 8. Commerce / the ask

- **Persistent, quiet ask:** `Visit PolyAI` top-right, one link, underlined, macaw — present on the title screen and on every result screen (`visitLink: https://poly.ai`).
- **The real ask is terminal and earned:** you must finish (win *or* lose) before you are asked for anything. Then: `Sign up to see how you compare` → "Submit your email to see your results and […] your game summary." → email + country + "I agree to receive other communications from PolyAI" → `Submit` → "Thanks! Your results are on the way—check your inbox soon."
- **How loud:** silent for the first four minutes, then unavoidable — but the thing being gated is *the player's own score*, not a whitepaper. Loss and win both route to the same form with reworded headers ("You didn't make it through. But did the others?"). Business-email validation means this is a qualified-lead funnel wearing a costume.

## 9. Rhythm

- **Section count: zero.** One fixed full-bleed viewport, 100% of the time, at every breakpoint. Nothing is contained; nothing scrolls.
- **Where it goes quiet:** the title card (four short lines and a button on a still illustration) and the between-game dialogs — each fake-OS window carries exactly one sentence and one button. The quiet is structural: the loud thing is the game, so every piece of *language* is short.
- **Footer pattern: there is no footer.** Legal lives where it is actually needed — `Privacy Policy` appears only on the form screen, and terms link off to `https://poly.ai`. The DOM is 263 nodes total.
- Mobile (390) is a different composition, not a squeeze: separate `intro_art_mobile` artwork, portrait framing, joystick copy and joystick image swapped for the arrow-keys copy and keyboard image.

## 10. THE BEST PART for Micah

**Gate the visitor's own result, not your content — and only after you have given them something.**

Looped's funnel is: play → get a number that is *about you* (`You escaped … with $TIME left!`) → hand over an email to get the write-up of that number. Nobody is asked for an email to download a PDF here. They are asked for it so the site can give back the thing they just produced. Micah can run that shape with zero new assets:

A one-page **diagnostic** built out of the nine hand-drawn pages he already has — six to eight questions from the book's own framework, each answer a click, a hand-drawn diagram as the visual for each question, about 90 seconds end to end. It scores into a named result. The result headline appears immediately and free (the honest half, the part Looped shows on screen one). The tailored summary — which of the nine pages apply to you, in what order — is what the email buys. Then the three fixed-price packages appear ranked by the diagnostic, and the $5K/mo engagement is the answer for exactly one of the outcomes.

Three sub-mechanisms he should lift alongside it, all cheap:

1. **The named-humiliation list.** `Hold Music Hell`, `Resetting Menu Maze`, `Re-Explaining to the Agent` — the site's spine is five specific pains with names, not one abstract "customer experience" claim. Micah's seven receipts contain the equivalents: name the five failure modes his buyers actually live in, in their words, and let each one be a question in the diagnostic.
2. **Two affordances, no nav.** Logomark left, one link right, nothing else, on every state. On a $99-book page that is the correct amount of navigation, and it is free.
3. **The travelling spotlight, demoted to CSS.** He cannot ship a shader, but the *idea* — draw the whole thing, then reveal only what the reader is on — is a `mask-image: radial-gradient()` or an opacity ramp on the nine diagram pages. One page lit, eight dimmed. That is the book's structure made visible for the cost of one rule, and it is the closest legal borrow of Looped's single carrying moment.

## 11. THE TELL

**A hand-built Three.js game engine with a bespoke sprite pipeline.** The case study says it plainly: "we developed a custom game engine built on Three.js", "a custom sprite animation system", "flexible placement tools", "custom shaders", Theatre.js wired up so an artist could tune the vignette live. Behind that sits **Glenn Catteeuw designing the entire maze and character set in Figma tile by tile** and exporting atlases through TexturePacker — six wall sheets, a character set, five voice recordings, four music loops. That is a named illustrator on retainer, a games-capable dev team, and a composer, for one microsite. Nobody should attempt the pixel-art game.

Second, smaller tell: **the licensed display face doing the whole typographic job**, plus artwork-as-wordmark. The `LOOPED` logotype is drawn, not typed. A solo consultant fakes neither.

What is *not* the tell, and is fully portable: the zero-scroll single-viewport structure, the two-item header, the one-sentence-per-dialog copy discipline, the five-theme token swap over one component set, and above all the result-gated email.

## 12. Screenshots (Playwright, 1440×900 unless noted)

- `looped-polyai-top.png` — first screen: pixel-art title card, `PolyAI presents / LOOPED / A Customer Service Nightmare / Enter if you dare...`
- `looped-polyai-mid.png` — in-game, timer `04:00`, spotlight before the player enters frame (the page has **zero scroll height**, so the rubric's 35%/70% scroll positions do not exist; these are the two equivalent states of the experience's own progression)
- `looped-polyai-late.png` — in-game after arrow-key movement: timer `03:52`, acid-green avatar lit by the travelling spotlight, pink EXIT sign bottom-right
- `looped-polyai-390.png` — mobile first screen (390×844, iOS UA), separately authored portrait artwork

All four in:
`C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/client-work/`
