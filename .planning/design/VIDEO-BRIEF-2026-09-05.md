# Video brief — two photographs become the hero's moving image (2026-09-05)

Operator: "i want something that stands out. I think i might use seedgram or something to
animated the two pics i use. Most of these sites have vids playing. So i can have the laptop
pic have me pointing to the board behind me and the talking table pic is perfect for that.
So web serach and find the best model i should use for this. NOt sure if it would be an
affect you do on the website or in the video generation but I do not want it in color and I
want like a gradient over it. Kind of like these cool design studios do for some of these
vids playing on their sites. I want to do the two pics of me i mentioned. Need best model
and a prompt."

## 1. Ruling: the look lives on the site, the clip stays in colour

Generate both clips in colour at the model's best quality. The site desaturates them and
lays the gradient over them in CSS. Three reasons:

1. The treatment then belongs to the design system. The gradient is drawn in the page's
   own espresso `#0D0D0F` and bone `#F5EFE4`, so it matches the ground it sits on and moves
   with it (the daylight change in the current mock is a `--p` world; a baked-in gradient
   cannot follow it).
2. A colour master stays reusable. If the direction turns to colour, or to a different
   ground, nothing is regenerated.
3. Video models treat "black and white" as a style token and drift on it between
   generations. Grayscale in CSS is exact and identical on every frame.

This is how the studio client builds do it: the clip underneath is ordinary colour footage
(SharpLink, Esther, GrowthLoop all hold ordinary photography under a tinted overlay). The
darkening gradient is `mix-blend-mode`/overlay work on the page, not in the file.

### The two CSS lines (and the element)

```css
.hero-video video { filter: grayscale(1) contrast(1.08) brightness(.92); }
.hero-video::after { content:""; position:absolute; inset:0;
  background: linear-gradient(180deg, rgb(13 13 15 / .15) 0%, rgb(13 13 15 / .55) 60%, #0D0D0F 100%); }
```

```html
<div class="hero-video">
  <video autoplay muted loop playsinline preload="metadata" poster="/video/a-poster.jpg"
         aria-hidden="true">
    <source src="/video/a.webm" type="video/webm">
    <source src="/video/a.mp4"  type="video/mp4">
  </video>
</div>
```

Reduced motion: `@media (prefers-reduced-motion: reduce) { .hero-video video { display:none } }`
and the poster (the source photograph, same treatment) stands in. `muted` must be a real
attribute or iOS refuses autoplay. Serve ≤ 2.5 MB per clip: 1080p, ~2 Mb/s, no audio track.

A copper tint (the corpus' "client's own colour, rationed") is available as a second
overlay layer at `mix-blend-mode: color` with copper at 10–14% opacity, over the grayscale,
if the pure monochrome reads too cold beside the bone page. Decide at the first preview,
not now.

## 2. The source frames (cut 2026-09-05, in `.planning/design/video/`)

| File | From | Size | Use |
| --- | --- | --- | --- |
| `A-whiteboard-16x9.jpg` | `public/hero-context.jpg` rows 40–1052 | 1800×1012 | Clip A, landscape hero |
| `A-whiteboard-4x5.jpg` | same, columns 360–1800 | 1440×1800 | Clip A, portrait card |
| `B-table-1x1.jpg` | Downloads `IMG_9960.jpeg` (430,390)–(1290,1250), sticker patched | 860×860 | Clip B, square panel |
| `B-table-4x5.jpg` | same, to row 1465 | 860×1075 | Clip B, portrait card |

Clip B's source is the full-resolution original of the Tel Aviv photograph, not the
770×575 crop the site serves; the Instagram location and handle stickers were cropped out
and the small round sticker on the tablecloth was cloned over. The one colleague whose
face the crop removes is the one whose face sat under a handle sticker; the two colleagues
who remain (the man in glasses, the phone at left) are in the photograph the site already
publishes.

Feed the model the largest frame it accepts. A 900px face is the floor; below that the
model invents skin texture and the result reads as AI.

## 3. What each clip does, and what will go wrong

**Clip A — the whiteboard.** As asked: he is typing, looks up, turns to his right and
gestures at the board behind him once, and returns to the laptop. The risk is the hand: in
the source both hands are behind the laptop lid, so a pointing arm is invented from
nothing, and invented hands are where every model fails. Generate the as-asked prompt
first; if the hand is wrong twice, fall to the second prompt, where he looks up, turns his
head toward the board and back, and the board does the pointing (the eye follows his). The
second version is the one the corpus would ship: 8/14 client builds keep the person nearly
still and let one small thing move.

**Clip B — the table.** Already mid-sentence with the hand open over the paper. Ask for
speech without words: head moving as he talks, the open hand turning once to make the
point, eyes on the person he is addressing (out of frame right). Everything else stays:
the glasses man tilts his head at most; the phone hands stay on the phone. This clip needs
almost nothing from the model and will likely land on the first try.

**Both:** camera locked or a slow push-in of at most 3%. No zoom, no pan, no rack focus,
no lighting change. 5–8 seconds. The last frame should be near the first so the loop
closes; where the model supports first-and-last frame, give it the same photograph for
both. Colour, not monochrome (see §1). No audio.

## 4. Model pick: Kling 3 Pro, image-to-video

Research: `research/VIDEO-MODEL-PICK-2026-09.md` (Opus, three angles, 2026-09-05; every
claim carries a fetched URL). Three of its decisive claims re-fetched by Fable the same day:

| Claim | Source | Verbatim |
| --- | --- | --- |
| Seedance refuses real faces | wavespeed.ai review of Seedance 2.0, 2026-04-06 | "All realistic human faces are blocked as reference images" — nothing published either way for 2.5 |
| Kling v3 Pro price, aspect | fal.ai model page | "$0.112" per second audio off, "$0.168" with audio; "Aspect ratio is inferred from the start image. The `aspect_ratio` field in the UI is ignored by the model." Duration 3–15 s. `negative_prompt` default "blur, distort, and low quality"; `cfg_scale` default 0.5; `end_image_url` optional; no resolution parameter |
| Recraft credits | recraft.ai/docs credits page | $0.01 per credit at every top-up tier; video billed "equals model price" |

**Why Kling 3 Pro.** It is on the Recraft list you screenshotted, so no new account. It
exposes the two knobs this job needs, a negative prompt (for hands and a changing face) and
a guidance scale (for holding one small gesture); Veo 3.1's parameter list carries neither.
Its known failure is an over-smoothed "idealized" face, which the grayscale and contrast
grade partly hides; its other failure, drift under heavy motion, is answered by asking for
almost none. And the two models above it on the preference arenas cannot take this job:
Seedance 2.0 blocked real faces at the input, and Sora 2 gates a real person's likeness
behind live-capture consent. Leaderboard rank never decided this.

**Runner-up:** Veo 3.1 image-to-video on the Gemini API, 1080p, 8 s, $1.60 per attempt.
Use it only if Kling's face fails the 100% zoom test twice. If you want to test the model
you first named, Seedance 2.5 costs one attempt on Recraft to find out whether the face
block lifted; do not start there.

**Where to run it.** Same model, two prices:

| | 5 s draft | 8 s ship |
| --- | --- | --- |
| fal.ai `fal-ai/kling-video/v3/pro/image-to-video`, audio off | $0.56 | $0.90 |
| Recraft, Kling 3 Pro at 37–56 credits/s (your screenshot) | $1.85–2.80 | $2.96–4.48 |

Six drafts and two ship clips on fal is under $6. Recraft's interface is fine if the API is
friction; budget three times the money.

**What the evidence does not settle.** No public benchmark measures whether a specific
real face survives image-to-video; the arenas score overall preference. Kling's output
resolution is inferred from third-party listings, not documented on the model page:
`ffprobe` the first file. Nothing in the record tests a phone-camera source of this size.
Whether Kling watermarks is unverified; Veo does (SynthID). Three attempts per clip
replaces all of this with evidence.

**Design ruling (R12), recorded here so it is not re-litigated.** The declined "vibe coding
factory" loop was AI-generated imagery. These clips are photographs of the operator with
synthetic motion added; the frame the visitor sees is the real photograph in every pixel
that does not move. Allowed, on four conditions: the colour master is kept and the grade is
CSS (§1); one clip in the hero, not two; reduced motion shows the treated poster; and a
clip is rejected on the face before anything else is judged.

### Settings

- `start_image_url`: `A-whiteboard-16x9.jpg` (1800×1012) for clip A. Aspect follows the
  image, so the 16:9 crop is what makes a 16:9 hero clip. For clip B use `B-table-1x1.jpg`
  or `B-table-4x5.jpg`; B is a panel or a portrait card further down the page, not a
  second hero, so it does not need 16:9. (The research file says the stills are 900×900;
  that was the mock's downsample. The hero source is 1800×1800 and the crops are cut.)
- `duration`: `5` while drafting, `8` for the ship clip.
- `generate_audio`: `false`. It defaults to true, costs half again as much, and the site
  plays muted.
- `cfg_scale`: try 0.5, 0.65 and 0.8 on the first round, keep the one that holds the hand.
- `end_image_url`: leave empty. Passing the same photograph as first and last frame makes
  most models generate almost no motion. Ask for the outbound half of the gesture only and
  make the return and the loop in post by reversing (below).
- No seed is exposed. Every attempt is independent; save each file before the next.
- Camera: none. A push-in reversed becomes a pull-out, so the ping-pong loop forbids it.

### Prompt grammar

Kling's own guide: "Prompt = Subject + Movement, Background + Movement", "Use simple words
and sentence structures", "describe movements that are likely to occur in the image".
Runway's image-to-video rule, adopted: refer to the person as "the subject" or "a man" and
never describe face, build, hair or clothing. The photograph carries all of it; describing
it invites the model to re-render it.

### Clip A, the whiteboard (as asked)

```
A man sits at a laptop. He turns his head toward the whiteboard behind him and
raises one hand to point at it. The whiteboard stays still. The room stays still.
The camera does not move.
```

If the hand breaks at every guidance value, cut to the first two sentences: he looks up
and turns his head toward the board. A raised hand reversed still reads as a gesture; a
turned head reversed reads as a glance. Either loops.

### Clip B, the table

```
A man sits at a table and talks. His head tilts slightly and one hand makes a small
gesture above the table. The other people stay still. The room behind him stays still.
The camera does not move.
```

If the mouth reads as mush, change "and talks" to "and listens". A listening beat loops
better and is the truer register for a clip behind a headline.

### Clip C, the workshop table (added 2026-09-06)

Source `video/sources/S3-group-clean.jpg` (1024×780, real photograph: him arms folded at
left, a grey-haired colleague reading, a bald colleague writing). Colleagues kept nearly
still by the prompt, for their sake and for identity. Loops (returns to rest). A panel, not
a ground (4:3, modest resolution).

```
A man sits at a table with his arms folded, listening. He glances down at the papers in
front of him, looks back up, and nods once. The man beside him keeps reading and the man
writing moves his pen slightly; otherwise they stay still. The room and the table stay
exactly as they are. The camera does not move. Same facial proportions, eye spacing, jaw
shape and hairline throughout.
```

Negative: the list below plus "head turning away, standing up". 5 s, audio off, no end
frame, cfg 0.5. If the nod reads mechanical, drop "and nods once".

### Negative prompt, both clips

```
blur, distort, and low quality, extra fingers, deformed hands, extra limbs, warped
face, changing face, morphing features, face swap, plastic skin, camera shake, zoom,
pan, dolly, fast motion, jump cut, text, watermark, subtitles, second person
```

### Judging an attempt

First frame beside last frame at 100% zoom, the face. Then the hands across the middle
third. Only then watch it. Reject on the face; everything else is fixable.

### Making the loop

```bash
ffmpeg -i A.mp4 -filter_complex "[0:v]split[f][r];[r]reverse,trim=start_frame=1,setpts=PTS-STARTPTS[rv];[f][rv]concat=n=2:v=1[v]" -map "[v]" -an -c:v libx264 -crf 20 -pix_fmt yuv420p A-loop.mp4
```

The `trim=start_frame=1` drops the duplicated seam frame; without it every cycle stutters.
Then one WebM (VP9, ~2 Mb/s) and one MP4 (H.264) into `public/video/`, the treated poster
beside them, and the element in §1.
