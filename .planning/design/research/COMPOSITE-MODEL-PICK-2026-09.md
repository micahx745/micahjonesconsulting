# Composite model pick — multi-reference image EDITING, September 2026

Leg 1 of 2. Written 2026-09-06. Every claim below is tied to a URL that returned 200 in this
session. Two jobs set the pick:

- **J1 — Tel Aviv boardroom.** Real photo of an empty boardroom over the beach; insert three real
  people from a second photo (operator + two older men to his right) at the table, add MacBooks,
  keep room/light/window exactly as photographed. Operator identity must hold exactly; the two
  colleagues can be softer. Output >= 2K, 16:9.
- **J2 — RSA stage.** Real photo of a conference stage where a colleague talks to camera. Replace
  him with the operator (blue-suit photo as identity reference), upper torso only, operator's build
  (6 ft, 250 lb, broad) not the other man's. Keep stage, screen, lighting. Output >= 2K.

Both composites then feed Kling 3 Pro image-to-video for a 5-8 s no-audio talking clip.

---

## 1. Ranking table

| # | Model | Max refs | Identity evidence | Max output | Price / image | Real-people policy | Fit |
|---|---|---|---|---|---|---|---|
| 1 | **Nano Banana Pro (Gemini 3 Pro Image)** | 14 total — up to 10 high-fidelity object images, up to 4 character-consistency images, up to 3 style refs ([ai.google.dev](https://ai.google.dev/gemini-api/docs/image-generation)) | "purpose-built for identity preservation"; best for keeping "the same character readable across many poses" ([Atlas Cloud](https://www.atlascloud.ai/blog/guides/best-ai-image-editing-models-2026)). Beat Seedream 5.0 on a face-swap task head-to-head ([302.AI](https://medium.com/@302.AI/nano-banana-2-vs-seedream-5-0-test-has-the-2026-image-generation-sota-arrived-64b9a6de71ca)) | 1K / 2K / 4K; 16:9 among 10 aspect ratios ([ai.google.dev](https://ai.google.dev/gemini-api/docs/image-generation)) | $0.15 std, ~$0.30 at 4K on fal ([fal](https://fal.ai/models/fal-ai/nano-banana-pro/edit)) | Written policy bans deceptive impersonation and biometric use without consent, not consented self-edits ([Google GenAI use policy](https://policies.google.com/terms/generative-ai/use-policy)). The *classifier* is the risk — see §3 | **PICK for J1**; first attempt for J2 |
| 2 | **Nano Banana 2 (Gemini 3.1 Flash Image)** | 14 ([fal](https://fal.ai/models/fal-ai/nano-banana-2/edit)) | Arena #1 for image editing, score 2827, 11,547 blind comparisons ([llm-stats](https://llm-stats.com/leaderboards/best-ai-for-image-editing)) | 0.5K/1K/2K/4K; 2K = 1.5x rate, 4K = 2x ([fal](https://fal.ai/models/fal-ai/nano-banana-2/edit)) | $0.08 std ([fal](https://fal.ai/models/fal-ai/nano-banana-2/edit)) | Same Google stack as #1 | Cheap iteration lane — burn attempts here, finish on Pro |
| 3 | **Seedream 5.0 Pro (ByteDance)** | 10 (Pro); Lite takes 14 ([Atlas Cloud](https://www.atlascloud.ai/blog/ai-updates/seedream-5-0-pro-price)) | Lighting/depth "read as slightly more refined" than Nano Banana Pro on a room scene ([aireiter, 2026-07-09](https://aireiter.com/blog/seedream-5-pro-vs-nano-banana-pro)); **failed** a named face-swap test ([302.AI](https://medium.com/@302.AI/nano-banana-2-vs-seedream-5-0-test-has-the-2026-image-generation-sota-arrived-64b9a6de71ca)) | 2K-class at launch, 4K 16:9 added about a week later ([Atlas Cloud](https://www.atlascloud.ai/blog/ai-updates/seedream-5-0-pro-price)) | $0.075 up to 2.36MP, $0.150 above, +$0.005 per extra input image ([Atlas Cloud](https://www.atlascloud.ai/blog/ai-updates/seedream-5-0-pro-price)) | No Google-grade identity classifier reported | **Fallback if Google refuses J2.** Best room/lighting fidelity; weakest identity |
| 4 | **Qwen-Image-Edit-2511** | 3 ([ComfyUI docs](https://docs.comfy.org/tutorials/image/qwen/qwen-image-edit-2511)) | 2511 adds "refined face identity preservation across pose and style transformations"; 2509 explicitly covers person+person and person+scene fusion ([ComfyUI docs](https://docs.comfy.org/tutorials/image/qwen/qwen-image-edit-2511), [QwenLM/Qwen-Image](https://github.com/QwenLM/Qwen-Image)) | Host-dependent | Host-dependent ([Replicate](https://replicate.com/qwen/qwen-image-edit-plus)) | Apache-2.0 open weights — no vendor refusal layer ([GitHub](https://github.com/QwenLM/Qwen-Image)) | **Escape hatch** if both hosted models refuse. The 3-ref cap is tight, but J2 needs only 2 |
| 5 | **GPT Image 2 (OpenAI)** | 10 ([Atlas Cloud](https://www.atlascloud.ai/blog/guides/best-ai-image-editing-models-2026)) | Arena #2, 2785 ([llm-stats](https://llm-stats.com/leaderboards/best-ai-for-image-editing)); strongest spatial reasoning and text ([Atlas Cloud](https://www.atlascloud.ai/blog/guides/best-ai-image-editing-models-2026)) | not verified | ~$0.01–$0.41 ([Atlas Cloud](https://www.atlascloud.ai/blog/guides/best-ai-image-editing-models-2026)); $0.05 typical ([llm-stats](https://llm-stats.com/leaderboards/best-ai-for-image-editing)) | Strictest of the set on uploaded photos of real people; the ChatGPT UI moderates far harder than the API ([apipass](https://apipass.dev/blogs/how-to-avoid-content-policy-violations-gpt-image-2)) | Skip for identity work. Useful only if the stage screen needs legible text |
| 6 | **FLUX.2 Pro (Black Forest Labs)** | **1** ([Atlas Cloud](https://www.atlascloud.ai/blog/guides/best-ai-image-editing-models-2026)) | Holds "color, lighting, and visual tone"; "the safest default for brand work" ([Atlas Cloud](https://www.atlascloud.ai/blog/guides/best-ai-image-editing-models-2026)) | not verified | $0.03–$0.05 ([Atlas Cloud](https://www.atlascloud.ai/blog/guides/best-ai-image-editing-models-2026)) | not verified this session | **Ruled out.** One reference cannot carry room + faces |
| 7 | **Midjourney omni-reference** | **1** image ([Midjourney guide](https://blakecrosley.com/guides/midjourney)) | Strong character pinning, but "Midjourney has intentionally restricted photorealistic portraits of specific real people" ([techjournal](https://techjournal.org/how-to-use-midjourney-v7)) | not verified | subscription | Restricts photoreal real-person likeness | **Ruled out** on both counts |
| 8 | Ideogram / Kling-Kolors image | not verified | not verified | not verified | not verified | not verified | No September 2026 evidence found placing either near the top four. Not carried forward |

### Recraft (the operator already has an account)

Recraft's own docs cover only Recraft V2/V3/V4/V4.1 and name Nano Banana Pro, Seedream 5.0 Pro,
GPT Image 2 High and Flux 2 Max **only as benchmark opponents** — "In a blind, third-party-judged
benchmark against GPT Image 2 High, Nano Banana Pro, Seedream 5.0 Pro, Flux 2 Max, and others,
Precise mode won 91.6% of its head-to-head matchups"
([recraft.ai/docs](https://www.recraft.ai/docs)). Third-party reviews claim those models are
selectable inside the paid Recraft app and gated off the free tier
([pikes.ai](https://pikes.ai/blog/recraft-review-2026),
[datastudios](https://www.datastudios.org/post/recraft-true-svg-vector-generation-model-pricing-and-api-explained)).
Verified credit costs: raster image 1 credit, vector 2, **creative upscale 20**
([Recraft pricing update](https://www.recraft.ai/blog/pricing-update)); Pro tiers run a flat one
cent per credit, $20–$160/mo for 2,000–16,000 credits
([pikes.ai](https://pikes.ai/blog/recraft-review-2026)).

**Verdict on Recraft: use it for the upscale leg, not the composite leg.** Per-model credit costs
for the hosted third-party models are published nowhere I could fetch. Treat the in-app model list
as unconfirmed until the operator opens the model picker and reads it.

---

## 2. The pick

**J1 (boardroom): Nano Banana Pro, 2K or 4K, 16:9.** It is the only model in the set that takes both
the room plate and a multi-person reference at high fidelity in one call, and its documented slot
system is the exact shape of this job — up to 10 high-fidelity object images plus up to 4
character-consistency images ([ai.google.dev](https://ai.google.dev/gemini-api/docs/image-generation)).
Iterate on Nano Banana 2 at $0.08 to find the framing, then re-run the winning prompt on Pro at 4K.

**J2 (stage): Nano Banana Pro first, Seedream 5.0 Pro second, Qwen-Image-Edit-2511 third.** J2 is
face-swap-shaped, the single riskiest instruction to hand Google (§3). Never phrase it as a swap.

## 3. The policy problem, stated plainly

Google's *written* policy prohibits "Impersonating an individual (living or dead) without explicit
disclosure, in order to deceive" and using "personal data or biometrics without legally-required
consent" ([Google GenAI use policy](https://policies.google.com/terms/generative-ai/use-policy)).
The operator editing photographs of himself for his own consulting site is not that. **The written
policy is not the obstacle; the classifier is.** Reporting through 2026 describes Nano Banana Pro
blocking "face swapping, edits to real identifiable individuals" and anything the filter reads as
identity modification, with Google raising the IMAGE_SAFETY threshold through the first half of 2026
([diyai.io](https://diyai.io/ai-insights/google-gemini-nano-banana-explained/)). Reference-image
edit mode is "filtered even more aggressively than text-to-image, because reference images raise the
consent question" ([VdoBloom, 2026-06-23](https://vdobloom.com/blog/gemini-nano-banana-blocking-fashion-swimwear-images-alternative/)).

Operational consequence: **write both jobs as compositing and scene-continuation, never as swapping,
replacing a person, or transferring a face.** For J2 the safest framing hands it the stage plate and
states that the man on stage *is* the man in the reference photo — a continuity instruction, not a
substitution instruction. Budget for refusal and keep Seedream queued.

## 4. Vendor prompt-guide lines, verbatim

From Google's own image-generation documentation
([ai.google.dev](https://ai.google.dev/gemini-api/docs/image-generation)):

> "Using the provided image, change only the [specific element] to [new element/description]. Keep
> everything else in the image exactly the same, preserving the original style, lighting, and
> composition."

> "Using the provided image of [subject], please [add/remove/modify] [element] to/from the scene."

The same page tells authors to be **"hyper-specific"** and to **"Provide context and intent"**, and
states that when editing, the model aims to **"match the original image's style, lighting, and
perspective."** Both prompts below are built on the first template verbatim.

## 5. Workflow

### Slot assignment

**J1 — boardroom**
- Slot 1 (base / high-fidelity object image): the empty boardroom photograph. This is the plate.
- Slot 2 (character-consistency): the three-person photograph, uncropped.
- Slots 3–5 (character-consistency): a tight crop of the operator's head and shoulders from that
  same photo, plus one crop each of the two colleagues if the first pass softens them past
  recognition. Four character slots exist — spend three on the operator's face if identity drifts.
- Optional slot 6: a reference photo of an open silver laptop at a similar angle, so the model
  renders a real machine rather than a generic laptop shape.

**J2 — stage**
- Slot 1 (base): the RSA stage photograph.
- Slot 2 (character-consistency): the operator in the blue suit, framed head to mid-chest.
- Slot 3: a second operator photo at a different angle if one exists. Head-on identity from a single
  frontal reference is the common failure.

### Prompt — J1

> Using the provided boardroom photograph, add three men seated at the conference table on the near
> side, facing the camera. Keep everything else in the image exactly the same, preserving the
> original style, lighting, and composition — the window, the sea and beach beyond it, the daylight
> direction, the ceiling fixtures, the table surface and the wall colour must be unchanged. The man
> at centre is the man in the second reference image; render his face, hairline, beard and glasses
> exactly as photographed. The two older men sit to his right. Place an open silver laptop in front
> of each man, screens angled away from the camera. The daylight from the window falls on their
> faces and shoulders from the same direction and at the same colour temperature as it falls on the
> room; their shadows on the table match the existing shadows in the plate.

Add only if a first pass renders the colleagues as strangers: *"The two men to his right are the two
older men in the same reference image; keep their faces recognisable."*

### Prompt — J2

> Using the provided stage photograph, keep the stage, the screen behind it, the lectern, the floor
> and every light source exactly as photographed. The man standing at centre and speaking toward the
> camera is the man in the second reference image — render his face, hairline, beard and skin tone
> exactly as photographed there, and dress him in the blue suit he wears in that image. Frame him
> from the waist up. He is a broad, heavy-set man, roughly six feet tall and 250 pounds: wide
> shoulders, a thick neck and a full chest, filling the suit jacket. The stage lighting falls on him
> from the same direction, angle and colour temperature as it falls on the rest of the stage.

### Handling the body-build instruction

Never write "not the other man's body." Negations read as instructions to depict the thing named.
Describe the wanted build in positive physical terms only: *broad, heavy-set, roughly six feet and
250 pounds, wide shoulders, thick neck, full chest, filling the jacket*. If output still returns the
colleague's slimmer frame, add one in-frame scale anchor — *"His shoulders are noticeably wider than
the lectern edge"* — rather than repeating an abstract weight.

### Attempts and cost budget

1. **Framing pass — Nano Banana 2, 1K, about 6 attempts, ~$0.48.** Settle composition, seating
   order, laptop placement, torso crop. Cheap failures.
2. **Identity pass — Nano Banana Pro, 2K, about 8 attempts, ~$1.20.** Where the operator's face
   either holds or does not. Do not accept a near-miss; Kling amplifies any drift across 5-8 s.
3. **Finish — Nano Banana Pro, 4K 16:9, about 3 attempts, ~$0.90.**
4. **Refusal contingency (mainly J2) — Seedream 5.0 Pro, about 6 attempts, ~$0.90** at $0.075/image
   plus $0.005 per extra input image.
5. **Last resort — Qwen-Image-Edit-2511**, self-hosted or on Replicate: three reference slots, open
   weights, no refusal layer.

Realistic budget: **$3.50–$5.00 per job, 15–25 attempts.** Plan two sittings, not one.

### Upscaling

Nano Banana Pro's native 4K makes a separate upscale unnecessary for J1 at 16:9. If a run lands only
at 2K, Recraft's creative upscale costs 20 credits — 20 cents at Pro-tier pricing
([Recraft pricing update](https://www.recraft.ai/blog/pricing-update)) — but run it *before* Kling
and inspect the face at 100%. Creative upscalers reinvent facial detail, which is exactly the detail
that must not move.

### Handoff to Kling 3 Pro

Kling accepts .jpg/.jpeg/.png at 300 px or larger per side and 10 MB or under, and generates 3–15 s
([Kling Video 3.0 Omni guide](https://kling.ai/quickstart/klingai-video-3-omni-model-user-guide)). A
4K composite will exceed 10 MB as PNG — export JPEG at quality about 92 and check file size before
upload. The 5-8 s target sits inside the supported range. No audio is needed, so use the
"No Native Audio" mode; both modes support 1080p and 720p
([Kling Video 3.0 guide](https://kling.ai/quickstart/klingai-video-3-model-user-guide)).

## 6. Unsettled

- Per-model credit costs for third-party models inside Recraft are unpublished, and Recraft's own
  docs do not acknowledge hosting them. The operator should read the in-app model picker.
- No hands-on 2026 test was found running *exactly* this job — inserting real, non-celebrity people
  from photo B into photo A with the plate preserved. The face-swap evidence cited here is a
  celebrity-recognition test, a different failure mode.
- Whether Nano Banana Pro refuses J2 in practice is unknown until it is run. Treat the first Pro
  attempt as the experiment that answers it.
- FLUX.2's reference cap of 1 comes from a third-party comparison; docs.bfl.ai returned 404 on the
  model-spec paths tried. It is ruled out on that number, so the gap does not change the pick.
- Ideogram and Kling/Kolors image were not evidenced in any September 2026 comparison I could fetch.
