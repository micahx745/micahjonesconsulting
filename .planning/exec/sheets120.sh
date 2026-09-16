#!/usr/bin/env bash
# Pass-120 judge contact sheets: tiles the §6.7 captures, the dim-path frames and the OG cards into nine
# PNGs so the first-preview look reads 9 images instead of 35 (MODEL_ROUTING §6 budget). Tiles are
# scaled, never cropped; each sheet's tile order is printed. Output: .planning/qa/pass-120/build/sheets/.
set -u
export MSYS_NO_PATHCONV=1
cd /c/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live || exit 9
D=.planning/qa/pass-120/build/shots
O=.planning/qa/pass-120/build/sheets
mkdir -p "$O"

grid2x2() { # out a b c d   (1440x900 captures -> 720x450 tiles, 1440x900 sheet)
  local out="$1"; shift
  ffmpeg -v error -y -i "$1" -i "$2" -i "$3" -i "$4" -filter_complex \
    "[0:v]scale=720:450[a];[1:v]scale=720:450[b];[2:v]scale=720:450[c];[3:v]scale=720:450[d];[a][b][c][d]xstack=inputs=4:layout=0_0|w0_0|0_h0|w0_h0" \
    -frames:v 1 "$O/$out" && echo "$out: TL $(basename "$1") | TR $(basename "$2") | BL $(basename "$3") | BR $(basename "$4")"
}
row4() { # out a b c d   (390x844 @2x captures -> 390x844 tiles, 1560x844 sheet)
  local out="$1"; shift
  ffmpeg -v error -y -i "$1" -i "$2" -i "$3" -i "$4" -filter_complex \
    "[0:v]scale=390:844[a];[1:v]scale=390:844[b];[2:v]scale=390:844[c];[3:v]scale=390:844[d];[a][b][c][d]hstack=inputs=4" \
    -frames:v 1 "$O/$out" && echo "$out: 1 $(basename "$1") | 2 $(basename "$2") | 3 $(basename "$3") | 4 $(basename "$4")"
}
grid3x2() { # out a b c d e f  (any size -> 600x375 tiles, 1800x750 sheet)
  local out="$1"; shift
  ffmpeg -v error -y -i "$1" -i "$2" -i "$3" -i "$4" -i "$5" -i "$6" -filter_complex \
    "[0:v]scale=600:375[a];[1:v]scale=600:375[b];[2:v]scale=600:375[c];[3:v]scale=600:375[d];[4:v]scale=600:375[e];[5:v]scale=600:375[f];[a][b][c][d][e][f]xstack=inputs=6:layout=0_0|w0_0|w0+w1_0|0_h0|w0_h0|w0+w1_h0" \
    -frames:v 1 "$O/$out" && echo "$out: top $(basename "$1"), $(basename "$2"), $(basename "$3") | bottom $(basename "$4"), $(basename "$5"), $(basename "$6")"
}

grid2x2 s1-work-1440.png $D/work-lead-hero-still-1440.png $D/work-method-line-and-entries-1440.png $D/work-record-block-1440.png $D/work-hero-nojs-1440.png
row4 s2-work-390.png $D/work-lead-hero-still-390.png $D/work-method-line-and-entries-390.png $D/work-record-block-390.png $D/work-hero-nojs-390.png
grid2x2 s3-guardicore-1440.png $D/study-guardicore-curtain-1440.png $D/study-guardicore-band-to-paper-1440.png $D/study-guardicore-band-photo-1440.png $D/study-guardicore-close-and-all-work-1440.png
grid2x2 s4-rfp-1440.png $D/study-rfp-engine-curtain-1440.png $D/study-rfp-engine-band-to-paper-1440.png $D/study-rfp-engine-worked-example-1440.png $D/study-rfp-engine-close-and-all-work-1440.png
grid2x2 s5-birth-ordani-1440.png $D/study-birth-worker-curtain-1440.png $D/study-birth-worker-band-to-paper-1440.png $D/study-birth-worker-close-and-all-work-1440.png $D/study-ordani-chapter-photo-1440.png
row4 s6-curtains-390.png $D/study-guardicore-curtain-390.png $D/study-rfp-engine-curtain-390.png $D/study-birth-worker-curtain-390.png $D/study-ordani-curtain-390.png
row4 s7-body-390.png $D/study-rfp-engine-worked-example-390.png $D/study-rfp-engine-band-to-paper-390.png $D/study-guardicore-close-and-all-work-390.png $D/study-birth-worker-close-and-all-work-390.png
V=.planning/qa/pass-120/build/dim
grid3x2 s8-dim-path-1440.png $V/dim-0094.png $V/dim-0220.png $V/dim-0273.png $V/dim-0346.png $V/dim-0450.png $V/dim-0600.png
T=.planning/qa/pass-120/template
grid3x2 s9-og-cards.png $T/og-guardicore.png $T/og-rfp-engine.png $T/og-ordani.png $T/og-content-engine.png $T/og-birth-worker.png $D/study-content-engine-curtain-1440.png
ls -la "$O"
