#!/usr/bin/env bash
# Pass-120 media chain. Brief §3b.7 commands, with §1 O5 (band still) and O6 (crossfade back to
# frame 0) applied in the order O5/O6 require: the frame-0 master, the poster and the O5 still come
# from the ORIGINAL source's frame 0; only the two video transcodes read the O6 intermediate.
# Every check prints its raw output; the main session compares each against the brief's expected
# value. Nothing here re-encodes to pass a check (stop and report instead).
set -u
export MSYS_NO_PATHCONV=1
cd /c/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live || exit 9

SRC="C:/Users/micah/Downloads/a-man-sits-at-a-table-and-talks--his-head-tilts-sl.mp4"
TMP="C:/tmp/pass120-clip"
OUT="public/media"
CROP="crop=1152:1440:196:0"
mkdir -p "$TMP" "$OUT"
ORIG="$SRC"

echo "== source probe"
ffprobe -v error -show_entries stream=codec_type,codec_name,width,height,r_frame_rate,nb_frames -show_entries format=duration -of csv=p=0 "$ORIG"

echo "== 3b.7 #3 frame 0 master (original source)"
ffmpeg -v error -y -i "$ORIG" -vf "select=eq(n\,0),$CROP,scale=960:1200:flags=lanczos" -frames:v 1 "$TMP/work-hero-f0-960.png"; echo "rc=$?"

echo "== 3b.7 #4 poster AVIF"
ffmpeg -v error -y -i "$TMP/work-hero-f0-960.png" -map_metadata -1 -c:v libaom-av1 -still-picture 1 -crf 20 -cpu-used 4 -pix_fmt yuv420p "$OUT/work-hero-poster-960.avif"; echo "rc=$?"

echo "== O5 band still"
ffmpeg -v error -y -i "$TMP/work-hero-f0-960.png" -q:v 3 "public/media/guardicore-band-960.jpg"; echo "rc=$?"
echo "O5 dims: $(ffprobe -v error -show_entries stream=width,height -of csv=p=0 public/media/guardicore-band-960.jpg) (want 960,1200)"
echo "O5 bytes: $(wc -c < public/media/guardicore-band-960.jpg) (want <= 180000)"

echo "== O6 frame 0 at 1440 and the crossfade intermediate"
ffmpeg -v error -y -i "$ORIG" -vf "select=eq(n\,0)" -frames:v 1 "$TMP/clip-f0-1440.png"; echo "rc=$?"
ffmpeg -v error -y -i "$ORIG" -loop 1 -framerate 24 -t 0.5 -i "$TMP/clip-f0-1440.png" -filter_complex "[0:v]fps=24,format=yuv420p,setsar=1,settb=AVTB[a];[1:v]fps=24,format=yuv420p,setsar=1,settb=AVTB[b];[a][b]xfade=transition=fade:duration=0.5:offset=3.5417,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -preset slow -crf 12 "$TMP/clip-return-1440.mp4"; echo "rc=$?"
SRC="$TMP/clip-return-1440.mp4"
echo "intermediate: $(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=width,height,nb_read_frames -show_entries format=duration -of csv=p=0 "$SRC" | tr '\n' ' ')"

echo "== 3b.7 #1 MP4 (from intermediate)"
ffmpeg -v error -y -i "$SRC" -vf "$CROP,scale=720:900:flags=lanczos,format=yuv420p" -an -map_metadata -1 -c:v libx264 -preset slow -crf 26 -profile:v high -level 4.0 -movflags +faststart "$OUT/work-hero-720.mp4"; echo "rc=$?"

echo "== 3b.7 #2 WebM (from intermediate)"
ffmpeg -v error -y -i "$SRC" -vf "$CROP,scale=720:900:flags=lanczos,format=yuv420p" -an -map_metadata -1 -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$OUT/work-hero-720.webm"; echo "rc=$?"

echo "== O6 end-state check (want All: >= 0.97)"
ffmpeg -v error -y -sseof -0.05 -i public/media/work-hero-720.webm -frames:v 1 "$TMP/webm-last.png"; echo "rc=$?"
ffmpeg -v info -i "$TMP/webm-last.png" -i public/media/work-hero-poster-960.avif -lavfi "[1:v]scale=720:900:flags=lanczos,format=yuv420p[p];[0:v]format=yuv420p[l];[l][p]ssim" -f null - 2>&1 | grep -o 'All:[0-9.]*'

echo "== W1a (want h264,High,720,900,yuv420p,40,97)"
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,profile,width,height,pix_fmt,level,nb_frames -of csv=p=0 public/media/work-hero-720.mp4
echo "== W1b (want vp9,720,900,97)"
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=codec_name,width,height,nb_read_frames -of csv=p=0 public/media/work-hero-720.webm
echo "== W1c (want av1,960,1200)"
ffprobe -v error -show_entries stream=codec_name,width,height -of csv=p=0 public/media/work-hero-poster-960.avif
echo "== W1d (want two lines 'video ')"
for f in public/media/work-hero-720.mp4 public/media/work-hero-720.webm; do ffprobe -v error -show_entries stream=codec_type -of csv=p=0 "$f" | tr '\n' ' '; echo; done
echo "== W1e (want 1)"
head -c 64 public/media/work-hero-720.mp4 | grep -a -c moov
echo "== W1f"
node -e 'const fs=require("fs");const B={"work-hero-720.mp4":240000,"work-hero-720.webm":140000,"work-hero-poster-960.avif":24000};let f=0;for(const [n,max] of Object.entries(B)){const s=fs.statSync("public/media/"+n).size;const ok=s<=max;if(!ok)f++;console.log((ok?"PASS":"FAIL")+" W1f "+n+": got "+s+(ok?"":" (want <= "+max+")"))}console.log("W1f failures: "+f)'
echo "== W1g (brief lists three; O5 adds guardicore-band-960.jpg, so four)"
ls -1 public/media
echo "== W1h (want All: >= 0.98)"
ffmpeg -v info -i public/media/work-hero-poster-960.avif -i public/media/work-hero-720.webm -lavfi "[0:v]scale=720:900:flags=lanczos,format=yuv420p[a];[1:v]select=eq(n\,0),format=yuv420p[b];[a][b]ssim" -frames:v 1 -f null - 2>&1 | grep -o "All:[0-9.]*"
echo "== W1i bite (want All: < 0.98)"
ffmpeg -v info -i public/media/work-hero-poster-960.avif -i public/media/work-hero-720.webm -lavfi "[0:v]scale=720:900:flags=lanczos,format=yuv420p[a];[1:v]select=eq(n\,96),format=yuv420p[b];[a][b]ssim" -frames:v 1 -f null - 2>&1 | grep -o "All:[0-9.]*"
echo "== media120 done"
