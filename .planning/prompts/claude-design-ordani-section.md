# Claude Design prompt — the Ordani section, built to the Halo Lab bar

Paste everything below the line into Claude Design. Connect both repos first:
`micahjonesconsulting` (branch **redesign-wave4** — NOT main) and the Ordani app repo
(`birthflowV2`). The current in-code attempt lives in
`components/color-worlds/OrdaniLive.tsx` + the `cw-ember`/`cw-tour` blocks of
`app/globals.css` — treat it as a wireframe of intent, not a design to keep.

---

Design ONE section of micahjonesconsulting.com: the **Ordani product section** on the
homepage. Produce a canvas with four artboards:

1. **Desktop 1440×1000** — the finished section, resting state
2. **Desktop 1440×1000** — mid-flow state (cursor has clicked, claim processing)
3. **Desktop 1440×1000** — payout state (the money moment)
4. **Mobile 390×1200** — the full section stacked

Every color, size, weight, and spacing value must be exact and buildable — this gets
implemented 1:1 in CSS by an engineer with no interpretation room.

## The bar you are being graded against

Halo Lab's product shots — study these three before drawing anything:
- https://dribbble.com/shots/27667459-Dashboard-for-a-Sport-Product-Auxon
- https://dribbble.com/shots/27635100-Website-for-a-Naturetech-Product-SyncDepth
- https://dribbble.com/shots/27641192-Website-for-a-Fintech-Product-Wingly

What makes them work, measured from the pixels (use these as law):
- **The photo is cinematic and carries the frame**: one subject, atmospheric light,
  55–70% of the frame is calm negative space. UI never overlaps the subject.
- **Glass, done right**: Auxon = dark-neutral tint ~rgba(15,22,28,0.30) + backdrop blur
  24–40px, 1px border rgba(255,255,255,0.18–0.25) brighter on the top edge, radius
  20–24px, NO drop shadow — separation is tint+blur only. SyncDepth inverts it: light
  tint rgba(255,255,255,0.12–0.18), blur 30–50px, borderless. Shipped-site rule
  (Apple's live CSS): add saturate(150–180%) so blur doesn't average to gray mud; over
  photography, fill alpha runs higher than the Dribbble cliché.
- **Type discipline**: one grotesque family per shot, sentence case everywhere, max 3
  sizes per card. Stat numerals LIGHT weight at ~3× their label size, label to the
  RIGHT on the same baseline. Uppercase exists only in tiny chips.
- **One accent color, rationed**: Auxon uses its red-orange ~5 times, never larger than
  8px. Everything else is white/gray alpha. Restraint IS the premium signal.
- **Scene annotations**: small label+value text raw on the photo with dashed leader
  lines pointing at the subject ("Position: 11/130"). No background fills — they sit
  only where the photo's own luminance guarantees contrast.
- **Composition**: strict edge columns (~275–340px wide) with aligned card tops,
  interior margins ~35–48px, the center reserved for the subject. Five modules
  maximum, not twelve widgets.

## The two design systems (both connected — pull real tokens, don't invent)

**micahjonesconsulting** (the page this lives on): warm cream/bone ground `#ECE3D0`
family, terracotta `#9E3C25`, petrol `#1A4548`, espresso `#2A1F18`, saffron accent
`#C9982F`. Faces: Bricolage Grotesque (display), Hanken Grotesk (body), JetBrains Mono
(data only — use sparingly). The section sits on the cream page as a matted, rounded
(28px) full-bleed photo canvas.

**Ordani** (the product being shown): warm cream app UI, serif display greetings, tan
sidebar, rounded cards — see the app's real dashboard in the birthflowV2 repo
(`.planning/phases/133-*/screenshots/02-dashboard-1440.png`). Any UI-realistic screen
inside the section should feel like THIS app, not a generic SaaS.

## The photography

Preferred: `public/ordani-work.jpg` on the branch — a doula supporting a laboring
client, rebozo over the shoulder (the worker, working — this subject is locked; the
operator rejected maternity portraits as "irrelevant" and admin/paperwork scenes as
"weird"). If its lighting can't reach the Auxon bar, the full stock library is in the
operator's files (`Stock Photos` zip, ~362 frames incl. the LEM birth shoot) — pick a
cinematic frame of birth work being done and SAY which file. Grade the photo
photographically (curves/tint toward the espresso-terracotta world), never with a flat
black scrim.

## The content (facts are LOCKED — never invent a number, name, or metric)

- Eyebrow: **Ordani**. Headline (operator-approved): **"Built for the people who show
  up for mothers."** Sub: "HIPAA-grade practice management I designed, built, and
  support alone. 200 birth workers run on it, and none have left for a competitor."
- **The featured interaction** (the operator's chosen story): three flows listed as
  separate rows — *Get paid* (Medicaid + private pay) · *Client intake* (forms + HIPAA
  consent) · *Birth tracking* (contractions + vitals). A ghost cursor clicks **Get
  paid**, and the payment flow runs as realistic Ordani UI:
  **Medicaid claim — $450.00** → status `Processing` → `Approved` → payout breakdown:
  Deposit to doula **$450.00** / Ordani fee **$0.00** / She keeps **$450.00** →
  closing line **"Full amount. No platform fee."**
  ("Medicaid" not "Medicare" — state doula benefits are Medicaid programs; the operator
  is confirming. $450 is the standing demo figure. Supporting claims allowed on this
  surface: other platforms take 17–20%; Ordani bundles $200–500 of software.)
- A small live indicator may persist: ● **Active birth · 3:12:44** (a ticking timer —
  the beloved detail from every prior round; keep it small).
- CTA: **"See how it was built" →** links to /work/ordani. One CTA only.
- NO person names anywhere in demo UI. No invented stats, clients, or dates.

## What the operator has refused across 6 prior rounds (do not repeat)

1. Solid cream cards floating on the photo — "weak."
2. Dark muddy glass without saturate over a busy photo — "horrible."
3. The product dashboard as a veiled background image — "weird."
4. Static stat pills / stat cards of any kind — "look ai and weak," twice.
5. Admin-pain photography (paper intake scenes) — "weird pic to sell software."
6. Maternity-portrait photography — "nice but irrelevant"; the photo must show the
   WORK being done.
7. Handwriting fonts, tape, stitches, decorative craft props — read as AI tells.

## Motion (annotate the artboards; implementation follows your notes)

The flow must read as SOMEONE USING IT: cursor travels → hover brightens the row →
click (dip + small ripple) → the flow's screen opens → claim appears → status flips →
payout lands line by line → close line → loop. Also: the timer ticks every second.
Specify durations/easings per step. Nothing loops idly except the flow cycle itself;
no parallax, no scroll-jacking, no cursor-following of the REAL cursor. Under
prefers-reduced-motion everything renders as the finished payout state, static.

## Output checklist

- Four artboards as specified, pixel-exact
- A token sheet: every color (hex + alpha), radius, blur, border, shadow, type size/
  weight/case/tracking used — so CSS can be written without guessing
- Motion annotations with ms timings and easings
- One line naming the photo file used and its crop/grade
