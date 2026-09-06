# Video loops — A (16:9) and B (1:1)

Encoded 2026-09-05 with ffmpeg 8.0.1-full_build. Sources: `A-raw.mp4`, `B-raw.mp4`
(1920x1080 and 1440x1440, 24fps, 97 frames, 4.041667s, no audio).

## Grayscale / gradient measurement

Mid frame (n=48) of each raw clip, measured with Pillow. Mean chroma is
`mean(|R-G| + |G-B|)` over all pixels; a true color frame runs in the tens.

| clip | size | mean chroma | max chroma | top-20% luma | bottom-20% luma | delta |
|---|---|---|---|---|---|---|
| A-raw | 1920x1080 | **1.2587** | 9 | 156.15 | 27.43 | **-128.72** |
| B-raw | 1440x1440 | **0.9128** | 11 | 42.91 | 21.96 | **-20.95** |

Both clips are **already grayscale** — residual chroma of ~1/255 is 4:2:0 subsampling
noise, not color. No desaturation filter is needed downstream.

Both have a **baked-in vertical gradient**: the bottom 20% is darker than the top 20%
in each. A is strongly graded (128 levels of falloff, near-white top to near-black
bottom); B is mildly graded (21 levels). Do not layer a second CSS gradient over A
without checking it against the frame — the source already carries one.

## Files

Loops are ping-pong: forward, then reversed with the duplicated seam frame trimmed
(`trim=start_frame=1`), so 97 + 96 = 193 frames at 24fps = 8.041667s, seamless at both ends.

| file | bytes | probe |
|---|---|---|
| `A-loop.mp4` | 1,316,985 | h264, 1920x1080, 24/1, 193 frames, 8.041667s, no audio |
| `A-loop.webm` | 500,736 | vp9, 1920x1080, 24/1, 8.042s, no audio |
| `A-loop-720.mp4` | 418,765 | h264, 1280x720, 24/1, 193 frames, 8.041667s, no audio |
| `A-poster.jpg` | 92,340 | first frame of `A-loop.mp4`, JPEG q82 progressive |
| `B-loop.mp4` | 1,739,191 | h264, 1440x1440, 24/1, 193 frames, 8.041667s, no audio |
| `B-loop.webm` | 632,268 | vp9, 1440x1440, 24/1, 8.042s, no audio |
| `B-loop-720.mp4` | 368,251 | h264, 720x720, 24/1, 193 frames, 8.041667s, no audio |
| `B-poster.jpg` | 88,211 | first frame of `B-loop.mp4`, JPEG q82 progressive |

Every 1080p-class file is under the 2.5MB budget on the first pass; no CRF bump was
needed. MP4s are `crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart`;
720p variants `crf 24`; WebM `libvpx-vp9 -b:v 1800k -crf 33 -row-mt 1`.

Posters were written with Pillow at `quality=82` rather than an ffmpeg qscale
approximation, so 82 is the literal JPEG quality.
