# public/video — the two clips, served as files

Pass-101 (WINNING-BRIEF-2026-09-05 §1 and the brief's §1 asset list). The mock inlined
these as data URIs because the artifact host had no asset capability; on the real site
they are **files**, which is the one thing §7's rejected list is explicit about.

Sources are `.planning/design/video/A2-hold.mp4` (1920x1080, forward-only, 4.04 s) and
`.planning/design/video/B-loop.mp4` (1440x1440, ping-pong loop, 8.04 s). Both are already
grayscale in the source with a vertical gradient baked in — do not layer a second CSS
gradient over A without checking it against the frame.

| file                 | bytes   | probe                                                   |
| -------------------- | ------- | ------------------------------------------------------- |
| `a2-hold-720.mp4`    | 162,936 | h264, 1280x720, 4.041667 s, no audio                    |
| `a2-hold-720.webm`   | 83,522  | vp9, 1280x720, 4.042 s, no audio                        |
| `a2-poster-last.jpg` | 80,088  | 1920x1080 — the HOLD frame, the poster and the fallback |
| `b-loop-720.mp4`     | 368,251 | h264, 720x720, 8.041667 s, no audio                     |
| `b-loop-720.webm`    | 260,038 | vp9, 720x720, 8.042 s, no audio                         |
| `b-poster.jpg`       | 88,211  | 1440x1440 — first frame                                 |

Total 1,043,046 bytes (1.02 MB) for the whole hero and operator ground.

## The encodes (ffmpeg 8.0.1-full_build, reproducible)

```
ffmpeg -y -i A2-hold.mp4 -vf scale=1280:720 \
  -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -an \
  a2-hold-720.mp4
ffmpeg -y -i A2-hold.mp4 -vf scale=1280:720 \
  -c:v libvpx-vp9 -b:v 0 -crf 33 -row-mt 1 -pix_fmt yuv420p -an \
  a2-hold-720.webm
```

`B-loop.mp4` takes the same two commands at `scale=720:720`. The h264 settings are the
ones `.planning/design/video/README.md` recorded on 2026-09-05, and both re-encodes came
out byte-identical to the `-720.mp4` files made that day (162,936 and 368,251), so the
pipeline reproduces. VP9 runs in constant-quality mode (`-b:v 0 -crf 33`) rather than the
1800k the 1080p/1440p variants used — at 720p the bitrate cap was the binding constraint,
not the quality target.

Posters are copied unchanged from the source directory; they were written with Pillow at
`quality=82`, so 82 is the literal JPEG quality, not an ffmpeg qscale approximation.

## How the page plays them (§1 of the pass brief, §15.1, §16.1)

`preload="auto"`, `autoplay muted playsinline`. **A does not loop** — it plays forward once
and holds its last frame, which is why the poster is the LAST frame and not the first. **B
loops**; it is a ping-pong encode (97 frames forward, then 96 reversed with the duplicated
seam frame trimmed), so neither end shows a cut. An IntersectionObserver pauses whichever
clip is off-screen, and a first user gesture (pointerdown / touchstart / keydown / wheel)
calls `play()` on the hero if it has not ended and on the operator clip if it is at least
35% visible, because autoplay is refused often enough that the poster alone was read as a
still.

The fingertip on `a2-poster-last.jpg` is measured at source (372, 413) of 1920x1080 and
lives in `app/globals.css` as `--fx: 19.375%` / `--fy: 38.2407%`. The stage is 16:9 and the
film is 16:9, so a cover fit is a fill fit and those percentages are the fingertip inside
the box at every width.

The first-generation loop (`A-loop.*`) is retired and is not copied here.
