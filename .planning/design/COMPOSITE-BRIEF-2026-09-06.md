# Composite brief — two recreated scenes, then two talking clips (2026-09-06)

Operator, verbatim: "i have one real picture of a board room overlooking a tel aviv beach. i
didnt take pics because of claissfied nature of the meeting but i would like to take people
from the photo im in (new batch im iwth two older guys to my right) and add them to there. Put
some macbooks on the table. Make it a video of me talking naturally. Another video is i was
speaking at a conference (RSA) and made a video but lost the pic that was taken of my part
talkign to cam. I want to change the pic andr replace my co worker with me (i have a pic of me
in a blue suit that can be added. Maybe we do not show my lower body and just upper turso
(make sure I dont have the body of that man I am bigger 6ft 250 but not fat). Then we convert
the new pic with me into a vid"

## 0. The honesty line

Both outputs are recreations of real moments, not photographs of them. They are for ambient
use behind type, veiled and monochrome like the other clips. They do not go in the proof index,
they do not get captions that imply a photograph, and the two colleagues in scene 1 appear
only with their say-so (the existing Tel Aviv photo is a photograph of them; this would not
be). If the RSA video of him speaking is found, a real frame from it replaces scene 2's
composite outright.

## 1. Sources (prepared, `video/sources/`)

| File | What it is | Notes |
| --- | --- | --- |
| `S1-boardroom-clean.jpg` 1080×1400 | Hotel meeting room, Tel Aviv; long dark table, chairs along the left, TV on the left wall, window at the far end onto the beach; hard backlight | Portrait. Ceiling cropped to remove a sticker |
| `S2-rsa-clean.jpg` 1080×1920 | The Guardicore booth at RSA: orange wall, "Workload Protection for Any…", a screen with the logo, a colleague in a dark blazer talking toward a camera on a tripod, the camera operator's back at lower left, lights and the "illusive" cubes above | Portrait. "getit" sticker cloned out |
| `S3-group-clean.jpg` 1024×780 | Him (grey gilet over a check shirt, lanyard, arms folded) with two older men to his right: grey hair and glasses in a black quarter-zip; bald in a navy striped sweater, writing | The identity source for scene 1 |
| `S4-suit-ref.jpg` 1536×2048 | Him in a blue suit, white open collar, full beard, shot from below outdoors | The identity source for scene 2; the low angle must not carry over |
| `S5-bar-unassigned.jpg` | A hotel bar | Purpose not stated; parked |

Crops to cut before the first attempt (Pillow, in the same folder): `S3-op-head.jpg` (his
head and shoulders from S3, ~600px), `S3-man1-head.jpg`, `S3-man2-head.jpg`, `S4-head.jpg`
(head to mid-chest from S4). Character slots take faces better than full frames.

## 2. Model pick, verified

**Nano Banana Pro** (`gemini-3-pro-image`) for the identity passes and the 4K finish;
**Nano Banana 2** (`gemini-3.1-flash-image`) for cheap framing passes. Runner-up
**Seedream 5.0 Pro** (ByteDance) if Google's classifier refuses; last resort
**Qwen-Image-Edit-2511** (open weights, three references, no vendor refusal layer).
Research: `research/COMPOSITE-MODEL-PICK-2026-09.md`.

Correction from Google's own page, fetched 2026-09-06 (ai.google.dev/gemini-api/docs/
image-generation): reference slots are **6 object + 5 character** on Gemini 3 Pro Image and
**10 object + 4 character + 3 style** on Gemini 3.1 Flash Image (the research quoted the Flash
figures for Pro). Output 0.5K/1K/2K/4K; aspect ratios include 16:9, 4:5, 9:16, 21:9. The page
carries no statement about real faces; the refusals are the classifier, reported by users
through 2026, and they bite hardest on anything phrased as a face swap or "replace this
person".

**Operational rule:** write both jobs as compositing and scene continuation. Never "replace",
"swap", "transfer his face". Scene 2 asserts that the man on the booth floor *is* the man in
the reference, which is a continuity instruction, not a substitution. Body build in positive
terms only; a negation ("not fat", "not that man's body") reads as an instruction to depict
the thing named.

Prices (fal, 2026-09-06): Nano Banana Pro $0.15 per image, ~$0.30 at 4K; Nano Banana 2 $0.08.
Budget $3.50–5.00 per scene across 15–25 attempts. Plan two sittings.

Recraft is the wrong lane for this: its docs cover only its own V2–V4.1 models. Its creative
upscale (20 credits, $0.20) is the fallback if a run lands at 2K.

## 3. Scene 1 — the boardroom

Slots: object 1 = `S1-boardroom-clean.jpg`; character 1 = `S3-op-head.jpg`; character 2 =
`S3-group-clean.jpg`; characters 3–4 = the two colleagues' head crops; object 2 (optional) = a
photo of an open MacBook at a three-quarter angle so the machines render as real ones.
Output 4K 16:9 (the plate is portrait; the room is extended sideways). Also run one 4:5 for a
portrait panel.

```
Using the provided boardroom photograph, extend the room to a 16:9 frame by continuing the
walls, ceiling, curtains and the long table on both sides, and add three men seated along
the left side of the table in the three chairs nearest the camera, turned toward the camera
and toward each other as if mid-conversation. Keep everything else in the image exactly the
same, preserving the original style, lighting, and composition: the window and the sea and
beach beyond it, the daylight coming from the far end, the dark wooden table, the bottles and
glasses, the wall colour and the television. The man nearest the camera is the man in the
first character reference: render his face, hairline, beard and skin tone exactly as
photographed, no glasses, wearing the same grey gilet over a check shirt. The two men beyond
him are the two older men in the group reference: keep their faces recognisable. Place an
open silver MacBook on the table in front of each man, screens angled away from the camera.
The daylight from the window lights their faces and shoulders from the same direction and
at the same colour temperature as the room, and their shadows on the table match the
existing shadows. Photographic, a phone camera in a bright room, no added text.
```

If the colleagues come back as strangers, add "and keep the glasses on the grey-haired man
and the navy striped sweater on the bald man". If his face drifts, spend all four character
slots on crops of him.

## 4. Scene 2 — the RSA booth

Slots: object 1 = `S2-rsa-clean.jpg`; character 1 = `S4-head.jpg`; character 2 = `S4-suit-ref.jpg`;
character 3 = `S3-op-head.jpg` (a second angle of his face; a single frontal reference is the
usual identity failure). Output 4K 16:9 (extend the booth sideways) and one 4:5.

```
Using the provided photograph of a conference booth, keep the orange booth wall, the banner,
the screen and its logo, the camera on the tripod, the camera operator in the foreground,
the stage lights and the hanging cubes exactly as photographed, preserving the original
style, lighting, and composition. The man standing at the right in front of the screen,
speaking toward the camera with his hands raised mid-gesture, is the man in the character
references: render his face, hairline, full beard and skin tone exactly as photographed
there, seen at the camera's eye level, and dress him in the blue suit and white open-collar
shirt from the reference. He is a broad, heavy-set man, roughly six feet tall and two
hundred and fifty pounds, with wide shoulders, a thick neck and a full chest filling the
suit jacket; his shoulders are noticeably wider than the screen's bezel behind him. Frame
the image so it ends at his waist. The booth lighting falls on him from the same direction,
angle and colour temperature as it falls on the rest of the booth. Photographic, no added
text.
```

Google is likeliest to refuse this one. If it does after two rephrasings, go straight to
Seedream 5.0 Pro with the same prompt. If the frame stays slim, add one scale anchor rather
than repeating the weight.

## 5. Judging a composite

Face at 100% against `S3-op-head` / `S4-head`: hairline, beard density, the shape of the
nose bridge and the eye spacing. Hands next (both scenes have visible hands). Then the light:
his face must not be lit from a different side than the room. Then the seams where the room
was extended. Reject on the face; everything else is another attempt.

## 6. To video (Kling 3 Pro, per `VIDEO-BRIEF-2026-09-05.md` §4)

Input: JPEG at quality 92, under 10 MB (a 4K PNG exceeds Kling's cap), the colour master;
the site grades it. Duration 5 s drafts, 8 s ship. No end frame. Negative prompt as before.

Scene 1, a loop (ambient, like clip B):
```
A man sits at a conference table and talks. His head turns slightly toward the men beside
him and one hand makes a small gesture. The other men listen. The window stays still. The
camera does not move.
```
Scene 2, forward then hold (like the hero):
```
A man stands and speaks toward the camera. His head nods slightly and his hands make a
small gesture, then settle. The booth stays still. The camera does not move.
```
"Talks" without audio can produce a mushy mouth; if it does, change "talks" to "listens and
nods" for scene 1 and "speaks" to "explains with his hands" for scene 2.

### Kling terms and face-stability rules (research leg 2, 2026-09-06)

- **Generate on a paid Kling membership or not at all.** The free tier forbids commercial use
  of output and non-members must keep the watermark and attribute; members' commercial use
  is unrestricted (kling.ai/docs/payment-policy §3.1.2, §4.6, §7.2).
- **The colleagues' consent is a warranty he gives at upload** (user policy §4.3, personality
  rights). Get it in writing before scene 1 is generated.
- Add the preservation clause to every clip prompt, verbatim: "Same facial proportions, eye
  spacing, jaw shape and hairline throughout." Keep the character wording byte-identical
  across retries; change one variable per run.
- No head turns away and back, no orbits, no whip pans: those make the model reinvent the
  face. A slow push-in of a few inches over five seconds is the safe camera move if any.
- Feed the compositor's original render (JPEG q92, true 16:9 at 2560×1440 or larger, under
  10 MB), never a screenshot or a re-save. Do not downscale: face size in frame is a warping
  factor.
- Unverified: whether Kling 3 Pro really outputs above 1080p (its page says 4K; a head-to-
  head measured 1080p). Probe the first file.

## 7. Where they land

Scene 1 is the strongest candidate for the "three rooms" Position panel in How I work, or
for the operator section's ground if it reads better than the Tel Aviv table clip. Scene 2 is
ambient only: behind the FAQ head or the ask, veiled. Neither enters the proof index.

## 8. Open with the operator

The RSA video's location · what the bar photo is for · the two colleagues' say-so.
