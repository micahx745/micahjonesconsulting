# Video model pick — two hero clips from two photographs

**Ruling, 2026-09-05.** Judge pass over three research legs (leaderboards/arenas, hands-on
reviews Jan–Aug 2026, vendor docs only). This file replaces the vendor-docs draft that
occupied this path; that leg's pricing tables are folded in below.

Every price and spec carries the URL it came from. Where a leg could not get a 200, or where
the record simply does not answer the question, the line says UNVERIFIED and stays UNVERIFIED.

---

## 0. Gate before any money is spent

Two things must clear first. Neither is a model question.

**A. R12 precedent.** `.claude/CLAUDE.md` records that an AI-generated "vibe coding factory"
video loop the operator asked for was **declined under R12 (AI-generated imagery, named)** and
the illustration ban, and was replaced by `<WallChart />`. This job is materially different —
the photograph is real and is of the operator himself; only the motion is synthetic — but that
distinction is a design-director / motion-engineer ruling, not mine to wave through. Get it in
writing before generating, the same way the WallChart exception was granted in writing
2026-09-01.

**B. The source stills are 900x900 and that is disqualifying as-is.** Kling derives output
aspect ratio from the start image and ignores the UI's `aspect_ratio` field entirely
("Aspect ratio is inferred from the start image. The `aspect_ratio` field in the UI is ignored
by the model" — https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video). A 1:1 input
yields a 1:1 clip. **Re-crop or outpaint both stills to 16:9 at 1920x1080 or larger before the
first generation.** A still-image outpaint is a far lower-risk operation than a video
generation, and this single prep step decides whether "native 1080p" is even reachable. It is a
prerequisite, not a preference.

**C. Motion risk, stated once.** A hand pointing at whiteboard *text* is the highest-artifact
motion available in this brief. Every prompt below asks for one gesture, never a sequence.

---

## 1. The ranking

Price columns: **vendor API** is the cheapest first-party or first-party-hosted route with a
fetched price. **Recraft** = credits/sec x $0.01 (Recraft top-ups are "200 credits for $2" —
https://www.recraft.ai/docs/plans-and-billing/credits — the same unit as Runway Dev's
"$0.01 per credit", https://docs.dev.runwayml.com/guides/pricing/). Only the Kling row's
Recraft figure is Recraft-specific from the research; the rest are derived from Runway Dev's
hosted-model table at the shared $0.01 rate and are marked *(derived)*.

| Model | I2V identity preservation (evidence) | Subtle-motion control | Max duration / resolution | Loop behaviour | 8s clip — vendor API | 8s clip — Recraft | Failure mode to watch | Verdict |
|---|---|---|---|---|---|---|---|---|
| **Kling v3 Pro** (fal) | No benchmark. Hands-on: "physically plausible movement that holds up under scrutiny", risk is "character drift" *under heavy motion* (pixo.video). O3 sibling "keeps more natural skin texture" vs 3.0's "more idealized" face (pixverse) | **Best in field.** `negative_prompt` (default `"blur, distort, and low quality"`) + `cfg_scale` (default `0.5`) both exposed | 15s / 1080p-class, **no resolution param** — output follows the start image | `end_image_url` optional | **$0.90** ($0.112/s audio off) | ~$2.96–$4.48 (37–56 cr/s) — the one real arbitrage; buy on fal | Idealised, over-smoothed skin; finger glitches under motion; prompt adherence drops under motion | **PICK** |
| **Veo 3.1** (Gemini API) | Strongest *documented* mechanism: `referenceImages`, "up to three asset images" that preserve "the subject's appearance in the output video". Hands-on: "identity consistency is meaningfully better than Veo 3", "prompt adherence is excellent" | Weak. **No `negativePrompt` and no `seed` in the Veo 3.1 parameter list** | 8/6/4s only; 1080p **8s only**; 24fps; 16:9 | `lastFrame` is a genuine generation constraint | **$1.60** ($0.20/s no audio) | $1.60 *(derived)* | No negative prompt to forbid extra fingers; no seed to lock a winner; SynthID watermark on all output; `personGeneration` for I2V is `allow_adult` only | **RUNNER-UP** |
| Kling 2.5 Turbo Pro (fal) | Same family, older. UNVERIFIED separately | `negative_prompt` yes | 15s | Optional tail image | $0.56 ($0.35/5s +$0.07/s) | n/a | Older model, weaker physics than v3 | **The draft rung.** Cheapest credible iteration loop |
| Wan 3.0 (fal) | **Arena #2–3, but the only hands-on identity read in the record is of WAN 2.2**: "weak identity preservation", "noticeable distortions and inconsistencies in faces". Does not transfer to 3.0 either way | End-frame param; otherwise UNVERIFIED | 30s / **native 1080p (default)**; 16:9 | Explicit end-frame | $1.60 ($0.20/s @1080p) | $1.60 *(derived)* | Predecessor's face record is the open question | Strong on paper. **Test only if Kling fails** — do not lead with it |
| Gemini Omni 1.1 Flash | Arena #1–2 without audio. No identity evidence | 360p draft mode at ~1/3 cost = best iteration loop in field | 3–10s; upscales to 1080p/4K; 24fps | First-and-last-frame keyframes | $0.80 *(10 cr/s +1 first frame)* | $0.80 *(derived)* | Upscale-to-1080p is not native capture; identity untested | Best draft loop. Unproven on faces |
| MiniMax Hailuo H3 | Subject Reference "locks that subject's visual features", but "drift is the default"; "extra limbs" is a listed common failure needing negative prompts | ONE action per prompt is mandatory — "multiple actions cause temporal blending" | **10s cap**, no headroom; 1080p / 2K tier | UNVERIFIED | $1.20 (2K, 15 cr/s) | $1.20 *(derived)* | Extra limbs; 10s ceiling; "H3 Max"/"Turbo" are not MiniMax's own labels | Named specialist for talking-head micro-expression. Fallback for clip B only |
| Runway Gen-4.5 | **Appears on neither I2V arena.** No measured standing | Motion-only prompting rule (their own guide) | 1080p unconfirmed for Gen-4.5 I2V | Params include aspect/duration | $0.96 ($0.12/s) | $0.96 | No I2V standing to weigh | Skip |
| Luma Ray 2 | No identity evidence | `frame0`/`frame1` keyframes — cleanest loop control in the set; explicit `loop` setting | 1080p/4k | **Best loop control** | UNVERIFIED (not on docs page) | UNVERIFIED | Images must be CDN-hosted URLs, no direct upload | Fallback **only if the loop seam is the failure mode** |
| Grok Imagine 1.5 | Arena top-7 | — | Resolution **conflicted**: one review says "480p and 720p" cap; Runway prices a 1080p tier at 29 cr/s | 15s | $0.64 direct from xAI ($0.08/s) | $2.32 (1080p, 29 cr/s) | Unresolved resolution ceiling | Skip on the conflict alone |
| Dreamina Seedance 2.0 / 2.5 | **DISQUALIFIED.** Reference images containing detectable real human faces are **blocked at the input layer** — generation never starts. Also "identity drift across longer clips — faces subtly change over time" | — | 2.5 I2V on fal is 480p/720p **only** | — | $5.44 (1080p via Runway) / $2.31 per 5s 720p on fal | $5.44 | Cannot run this job | **Disqualified** |
| Sora 2 | **DISQUALIFIED for iteration reliability.** Real-person likeness gated behind Cameo live-capture consent; I2V containing people carries stricter guardrails | — | — | — | — | — | Most likely of the field to refuse mid-iteration | **Disqualified** |

**Sources for the table rows, in order of first use:**
fal Kling v3 Pro https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video ·
Veo docs https://ai.google.dev/gemini-api/docs/veo ·
Runway Dev pricing https://docs.dev.runwayml.com/guides/pricing/ ·
Recraft credits https://www.recraft.ai/docs/plans-and-billing/credits ·
pixo.video https://pixo.video/blog/seedance-vs-veo-vs-kling ·
pixverse https://pixverse.ai/en/blog/kling-o3-and-3-0-now-available-on-pixverse ·
fal Kling 2.5 Turbo Pro https://fal.ai/models/fal-ai/kling-video/v2.5-turbo/pro/image-to-video ·
fal Wan 3 https://fal.ai/wan-3 ·
letsenhance https://letsenhance.io/blog/all/best-ai-video-generators/ ·
Gemini Omni 1.1 Flash https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/ ·
Hailuo guide https://aivideobootcamp.com/blog/hailuo-ai-complete-guide-2026/ ·
MiniMax H3 https://huggingface.co/blog/ResterChed/minimax-h3-hailuo-3-0 ·
Luma docs https://docs.lumalabs.ai/docs/video-generation ·
xAI models https://docs.x.ai/docs/models ·
Grok review https://deevid.ai/blog/grok-imagine-video-review ·
Seedance block https://wavespeed.ai/blog/posts/seedance-2-0-review-issues-and-alternatives/ ·
Seedance fal https://fal.ai/models/bytedance/seedance-2.5/image-to-video ·
Sora 2 https://www.nbcnews.com/tech/tech-news/openai-announces-sora-2-ai-video-audio-app-rcna234753 ·
AA arena https://artificialanalysis.ai/video/leaderboard/image-to-video ·
arena.ai https://arena.ai/leaderboard/image-to-video

---

## 2. THE PICK

### **Kling v3 Pro image-to-video, on fal.ai — `fal-ai/kling-video/v3/pro/image-to-video`.**
### Runner-up: **Veo 3.1 image-to-video** (Gemini API), 1080p / 8s / no audio.

1. Veo's headline identity mechanism is `referenceImages`, "up to three asset images" that
   preserve "the subject's appearance in the output video"
   (https://ai.google.dev/gemini-api/docs/veo) — the operator has **one** photo per clip, so
   the single strongest reason to pay Veo's premium is built for a case he does not have.
2. Kling v3 Pro exposes the two controls that map directly onto this job's named failure modes
   — `negative_prompt` (default `"blur, distort, and low quality"`) for the "extra limbs" and
   finger artifacts the hands-on record names, and `cfg_scale` (default `0.5`) for holding one
   small gesture — while the Veo 3.1 parameter list fetched today carries **neither a
   `negativePrompt` nor a `seed`**.
3. The hands-on record puts Kling's motion at "physically plausible movement that holds up
   under scrutiny" and its portrait failure at an "idealized" over-smoothed face
   (https://pixo.video/blog/seedance-vs-veo-vs-kling and
   https://pixverse.ai/en/blog/kling-o3-and-3-0-now-available-on-pixverse), which is precisely
   the failure the planned `grayscale(1)` plus contrast plus gradient CSS substantially hides,
   while its other failure, drift and lost prompt adherence "under heavy motion", is answered
   by a brief that asks for almost no motion.
4. A regeneration costs **$0.56 at 5s / $0.90 at 8s** audio-off against Veo's **$1.60** for its
   only 1080p duration, and Kling's continuous 3–15s range lets a 6s clip exist at all where
   Veo offers 4, 6 or 8 and nothing between
   (https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video and
   https://docs.dev.runwayml.com/guides/pricing/).
5. The two highest-rated names on both arenas cannot run this job at all: Seedance blocks
   reference images containing detectable real human faces **at the input layer**
   (https://wavespeed.ai/blog/posts/seedance-2-0-review-issues-and-alternatives/) and Sora 2
   gates real-person likeness behind live-capture consent
   (https://www.nbcnews.com/tech/tech-news/openai-announces-sora-2-ai-video-audio-app-rcna234753),
   so leaderboard rank was never going to settle this.

### What the evidence does NOT settle

- **No public benchmark measures identity preservation from a reference photo.** Both live
  arenas (1.9M votes across 47 models on arena.ai) are blind *overall preference* Elos. The only
  2026 work on this axis is academic — ConsIDVid-Bench / ConsID-Gen
  (https://arxiv.org/html/2602.10113v1) and the CVPR 2026 VGBE challenge
  (https://openaccess.thecvf.com/content/CVPR2026W/VGBE/papers/Wu_VGBE_2026_Challenge_on_Image-to-Video_Consistent_Generation_Methods_and_Results_CVPRW_2026_paper.pdf)
  — and neither publishes a commercial head-to-head. **Requirement 1 is not answerable from the
  literature. It is answerable only by generating clips and looking at the face at 100%.**
- **Nothing in the record tests a 900x900 phone-camera source.** Source resolution below output
  resolution is a risk no reviewed test addresses. UNVERIFIED.
- **"Kling outputs 1080p" is inferred, not documented.** fal's v3 Pro page has *no* resolution
  parameter; the 1080p claim comes from Artificial Analysis listing "Kling 3.0 1080p (Pro)" and
  from third-party pricing. **`ffprobe` the first returned file before spending anything more.**
- **Wan 3.0 may well be better and the record cannot say.** It leads the arena and is natively
  1080p with an end-frame param, but the only hands-on face read is of WAN **2.2** ("noticeable
  distortions and inconsistencies in faces"), which does not transfer in either direction.
- Whether Kling refuses, degrades, or watermarks on a specific real person's face: untested.
  Veo watermarks all output with SynthID; Kling's watermark status is UNVERIFIED.
- Runway's I2V prompting rule quoted below is vendor-authored but **second-hand** — the
  help-centre article returns 403 to a plain fetch, so it is from Runway's own indexed listing.

### The spend that actually decides it

Three attempts per clip on the pick is **$3.36** at 5s. Adding a three-attempt Veo control set
is another **$9.60**. **Under $13 settles requirement 1 with evidence instead of inference.**
Do that before committing to either.

---

## 3. Prompt grammar and settings for the pick

### Grammar, verbatim from Kling's own guide

From "Kling AI Image to Video Guide | Kling AI"
(https://kling.ai/quickstart/image-to-video-guide):

> **"Prompt = Subject + Movement，Background + Movement ······"**

with `Subject + Movement` named as "the most fundamental elements of the formula", and three
rules quoted verbatim:

> "Use simple words and sentence structures, avoiding overly complex language"

> "Movement should comply with the laws of physics, and it's best to describe movements that are likely to occur in the image"

> "At the current stage, it is challenging to generate complex physical movements, such as the bouncing of a ball or the trajectory of a high-altitude throw"

**Cross-model rule that outranks the formula for this job**, from Runway's image-to-video
guide (vendor-authored, second-hand — see caveat above,
https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide):
the input image "establishes the visual starting point", prompts should "focus almost
exclusively on motion", and, the identity rule,

> "When describing subject motion, refer to characters or objects with general terms like 'the subject' or simple pronouns."

**So: never describe his face, build, hair, age, or clothing. The photograph carries all of
that. Describing it invites the model to re-render it.** Note this inverts Veo's published
"use adjectives and adverbs to paint a clear picture", which is written for *text*-to-video and
is the wrong advice here.

### Settings

| Field | Value | Why |
|---|---|---|
| `start_image_url` | the **pre-cropped 16:9, 1920x1080 or larger** still | Aspect and size are inferred from this image and from nothing else. This is the resolution lever. |
| `prompt` | see section 4 | |
| `negative_prompt` | see section 4 (extend the default, do not replace the concept) | Default is `"blur, distort, and low quality"` |
| `cfg_scale` | **sweep `0.5` / `0.65` / `0.8` on round one**, keep the winner | Prompt-adherence strength. Higher should hold "one small gesture, nothing else"; too high risks stiffness. fal documents only "float, default 0.5" — **the range is assumed 0–1 and is UNVERIFIED**. |
| `duration` | **`"5"` while iterating, `"8"` for the ship** | 5s is $0.56 a try; 8s is $0.90 and sits mid-window of the 5–10s requirement |
| `generate_audio` | **`false` — not optional** | Defaults to **`true`** and costs 50% more ($0.168/s vs $0.112/s). The site plays muted. |
| `end_image_url` | **leave empty** | See the loop rule below |
| seed | **not exposed** | You cannot lock a good result and vary it. Treat every attempt as independent; **save every returned file locally before generating the next**; expect no reproducibility. |
| resolution | **not exposed** | Comes from the start image. `ffprobe` attempt 1. |
| fps | not exposed | UNVERIFIED for Kling v3 |

### The loop rule — do NOT pass the same photo as first and last frame

> "most models respond to identical start and end frames by generating little or no motion at all, defeating the entire point of the loop"
> (https://ffmpeg.party/guides/ai-video-loop/)

**Use ping-pong instead, and let it do double duty.** Ask the model for the *outbound* half of
the gesture only — one action, which is also what the Hailuo record demands ("restrict to ONE
explicit action per prompt. Multiple actions cause temporal blending") and what protects Kling's
prompt adherence. Then reverse the clip in post to get both the *return* the brief asks for and
a loop with no visible cut, out of a single generation:

```bash
# 5s outbound clip -> 10s ping-pong, duplicate seam frame trimmed
ffmpeg -i A.mp4 -filter_complex \
  "[0:v]split[f][r];[r]reverse,trim=start_frame=1,setpts=PTS-STARTPTS[rv];[f][rv]concat=n=2:v=1[v]" \
  -map "[v]" -an -c:v libx264 -crf 20 -pix_fmt yuv420p A-loop.mp4
```

The `trim=start_frame=1` is load-bearing: without it "the seam has a duplicate frame — and so
does the loop point — producing a visible stutter on every cycle" (same source). Also ship a
VP9/AV1 WebM alongside the H.264 MP4.

**Camera: none.** A push-in reversed becomes a pull-out, so a ping-pong hero would breathe in
and out. If the operator wants the slow push-in, it costs the ping-pong and needs a straight 8s
clip with a held final pose instead. Decide that before generating, not after.

---

## 4. The two draft prompts

Written in `Subject + Movement，Background + Movement`. Simple words. One action each. No
appearance described. No camera language except a prohibition.

### Clip A — laptop, whiteboard

```
A man sits at a laptop. He turns his head toward the whiteboard behind him and
raises one hand to point at it. The whiteboard stays still. The room stays still.
The camera does not move.
```

The return is the ffmpeg reverse, not a second clause. If hands break at `cfg_scale 0.8`, cut
the prompt to its first two sentences and let the point be implied by the lift — a raised hand
reversed still reads as a gesture toward the board.

### Clip B — table, mid-conversation

```
A man sits at a table and talks. His head tilts slightly and one hand makes a small
gesture above the table. The room behind him stays still. The camera does not move.
```

No audio is generated and none is needed; nothing here asks for lip-sync. If the mouth reads
as mush, drop "and talks" to "and listens" — a listening beat loops better anyway and is the
truer register for a hero clip sitting behind a headline.

### Negative prompt — both clips

```
blur, distort, and low quality, extra fingers, deformed hands, extra limbs, warped
face, changing face, morphing features, face swap, plastic skin, camera shake, zoom,
pan, dolly, fast motion, jump cut, text, watermark, subtitles, second person
```

The first clause preserves fal's default. `extra limbs` is there because it is a *listed common
failure requiring negative prompts* in the Hailuo record and the same artifact class appears
across the field. `second person` is there because "character blending" is a named cross-model
failure and a whiteboard scene has room for a phantom.

### Judging an attempt

Face at **100% zoom, first frame against last frame, side by side** — not the moving clip,
which hides drift. Then hands at 100% across the middle third, where the gesture lives. Then,
only then, watch it. Reject on the face; everything else is fixable in post.

---

## 5. Colour: ask for none of it — the grade is CSS

**Ask the model for a natural, correctly-exposed colour clip.** Do not prompt for "black and
white", "desaturated", "moody", "cinematic grade", "teal and orange", or any film-stock name.
Three reasons: a CSS grade is reversible and a baked-in one is not; grading words are *style*
words, and style words pull the model away from the photograph, which is the identity risk
itself (Runway's rule: describe motion, let the image carry appearance); and a pre-desaturated
source leaves the CSS less contrast latitude to work with.

The one colour-adjacent thing worth asking for is **lighting continuity** — no flicker, no
shifting light — which the negative prompt's `camera shake` and `jump cut` terms partly cover.

### The two CSS lines

```css
/* 1. the grade */
.hero-video {
  filter: grayscale(1) contrast(1.12) brightness(0.9);
}

/* 2. the scrim — theater ground (#0D0D0F) */
.hero-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgb(13 13 15 / 0.15) 0%,
    rgb(13 13 15 / 0.55) 55%,
    rgb(13 13 15 / 0.88) 100%
  );
}

/* foyer variant — scrim to paper (#F5EFE4) instead */
[data-mode="foyer"] .hero-frame::after {
  background: linear-gradient(
    to bottom,
    rgb(245 239 228 / 0.20) 0%,
    rgb(245 239 228 / 0.72) 60%,
    rgb(245 239 228 / 0.95) 100%
  );
}
```

Tune `contrast()` **after** the scrim is in place, not before — the two multiply. Measure the
headline against the *lightest* point of the composite in the foyer case and the *darkest* in
theater; 4.5:1 or it does not ship. Copper on paper stays `--accent-copper-deep #8E3A1E` for
anything at body size (project WCAG AA rule, Pitfall B1).

### The video element

```html
<div class="hero-frame">
  <video
    class="hero-video"
    poster="/hero-whiteboard-poster.avif"
    autoplay
    muted
    loop
    playsinline
    preload="metadata"
    disablepictureinpicture
    aria-hidden="true"
    tabindex="-1"
  >
    <source src="/hero-whiteboard.webm" type="video/webm" />
    <source src="/hero-whiteboard.mp4" type="video/mp4" />
  </video>
</div>
```

`muted` must be in the markup, not set in JS, or iOS and Safari refuse autoplay. `playsinline`
stops iOS taking the video fullscreen. `preload="metadata"` rather than `auto` — this is a
Lighthouse-95-or-better site and an autoplaying hero must not compete with LCP; let the
`poster` be the LCP element (export frame 1 as AVIF/WebP). `aria-hidden` plus `tabindex="-1"`
because the clip is decorative and carries no information the copy does not.

### Reduced motion

`display: none` is **not sufficient** — a hidden `<video autoplay>` still downloads and still
decodes. Gate it at render:

```tsx
const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

return reduced
  ? <img src="/hero-whiteboard-poster.avif" alt="" aria-hidden="true" className="hero-video" />
  : <video>{/* … */}</video>;
```

with a CSS belt-and-braces for the pre-hydration frame:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-video { display: none; }
  .hero-frame {
    background-image: url("/hero-whiteboard-poster.avif");
    background-size: cover;
    background-position: center;
  }
}
```

This is project definition-of-done item 6, and it is the item a hero video is most likely to
quietly fail.

---

## Appendix — fetched pricing tables

Runway Dev, "$0.01 per credit" (https://docs.dev.runwayml.com/guides/pricing/):

| Model | Resolution | Credits/sec | USD/sec | 8s clip |
|---|---|---|---|---|
| gen4_turbo | — | 5 | $0.05 | $0.40 |
| gen4.5 | — | 12 | $0.12 | $0.96 |
| veo3.1 (no audio) | — | 20 | $0.20 | $1.60 |
| veo3.1 (audio) | — | 40 | $0.40 | $3.20 |
| veo3.1_fast (no audio) | — | 10 | $0.10 | $0.80 |
| h3_max | 480p / 768p | 5 / 8 | $0.05 / $0.08 | $0.40 / $0.64 |
| hailuo3 | 768p / 2K | 10 (+2 per ref) / 15 | $0.10 / $0.15 | $0.80 / $1.20 |
| grok_imagine_1_5 | 480p / 720p / 1080p | 10 / 16 / 29 (+1 per ref) | $0.10 / $0.16 / $0.29 | $0.80 / $1.28 / $2.32 |
| seedance2_5 | 480p / 720p / 1080p | 20 / 30 / 68 (+50% input/ref) | $0.20 / $0.30 / $0.68 | $1.60 / $2.40 / $5.44 |
| wan3 | 480p / 720p / 1080p | 5 / 10 / 20 | $0.05 / $0.10 / $0.20 | $0.40 / $0.80 / $1.60 |
| gemini_omni_flash | I2V | 10 (+1 first frame) | $0.10 | $0.80 |

Buy direct where it is cheaper: xAI prices `grok-imagine-video-1.5` at **$0.080/sec**
(https://docs.x.ai/docs/models) against $0.29/sec at 1080p through Runway. Kling on fal is
$0.112/sec against Recraft's 37–56 credits/sec. Never buy a hosted model through an aggregator
without checking the first party.

### Verification log for this ruling

Fetched 2026-09-05, HTTP 200, by the judge (not inherited from a leg):

- https://ai.google.dev/gemini-api/docs/veo — Veo 3.1 parameter list, durations, resolutions,
  `personGeneration` values, SynthID. Confirmed **no `negativePrompt`, no `seed`**.
- https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video — full input schema,
  `negative_prompt` default, `cfg_scale` default 0.5, `generate_audio` default **true**,
  `end_image_url`, aspect-from-start-image, per-second pricing.
- https://kling.ai/quickstart/image-to-video-guide — "Kling AI Image to Video Guide | Kling AI",
  the verbatim `Subject + Movement` formula and the three motion rules quoted in section 3.
