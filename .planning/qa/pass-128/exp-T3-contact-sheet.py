"""Pass-128 experiment T3 contact-sheet builder. EVIDENCE ONLY.

Parameterized copy of build-contact-sheets.py (same folder): reads
<frames_dir>/manifest.json + world-switches.json and writes
<out_prefix>-switch-<n>.png (one per --cw-bg change) and
<out_prefix>-scroll-all.png (every 3rd frame across the whole capture) into
this directory. If there are zero switch events, only scroll-all is written
(this happens under the T3 --block variant, where the world switch never
fires -- see exp-T3.txt).

Usage: python exp-T3-contact-sheet.py <frames_dir> <out_prefix>
"""
import json
import os
import sys
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
FRAMES_DIR = os.path.join(HERE, sys.argv[1])
OUT_PREFIX = sys.argv[2]

with open(os.path.join(FRAMES_DIR, "manifest.json")) as f:
    manifest = json.load(f)
with open(os.path.join(FRAMES_DIR, "world-switches.json")) as f:
    switches = json.load(f)

manifest.sort(key=lambda x: x["relMs"])

try:
    FONT = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 16)
    FONT_SMALL = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 13)
except Exception:
    FONT = ImageFont.load_default()
    FONT_SMALL = FONT

THUMB_W = 130
LABEL_H = 22
PAD = 4


def load_thumb(entry):
    im = Image.open(os.path.join(FRAMES_DIR, entry["file"])).convert("RGB")
    w, h = im.size
    scale = THUMB_W / w
    im = im.resize((THUMB_W, int(h * scale)), Image.LANCZOS)
    return im


def tile(entry, highlight=False):
    im = load_thumb(entry)
    w, h = im.size
    canvas = Image.new("RGB", (w + 2 * PAD, h + LABEL_H + 2 * PAD), (30, 30, 30))
    canvas.paste(im, (PAD, LABEL_H))
    draw = ImageDraw.Draw(canvas)
    label = f"{entry['relMs']}ms  #{entry['index']}"
    color = (255, 90, 90) if highlight else (230, 230, 230)
    draw.text((PAD, 2), label, fill=color, font=FONT_SMALL)
    if highlight:
        draw.rectangle([0, 0, canvas.width - 1, canvas.height - 1], outline=(255, 60, 60), width=3)
    return canvas


def grid(tiles, cols, title):
    if not tiles:
        raise ValueError("no tiles to lay out for: " + title)
    tw, th = tiles[0].size
    rows = (len(tiles) + cols - 1) // cols
    title_h = 34
    canvas = Image.new("RGB", (cols * tw, rows * th + title_h), (15, 15, 15))
    draw = ImageDraw.Draw(canvas)
    draw.text((8, 8), title, fill=(255, 255, 255), font=FONT)
    for i, t in enumerate(tiles):
        x = (i % cols) * tw
        y = title_h + (i // cols) * th
        canvas.paste(t, (x, y))
    return canvas


switch_events = switches[1:]
for n, sw in enumerate(switch_events, start=1):
    lo = sw["relMs"] - 300
    hi = sw["relMs"] + 900
    frames_in_window = [f for f in manifest if lo <= f["relMs"] <= hi]
    tiles = []
    for f in frames_in_window:
        hl = sw["relMs"] <= f["relMs"] <= sw["relMs"] + 50
        tiles.append(tile(f, highlight=hl))
    prev_bg = switches[n - 1]["bg"]
    new_bg = sw["bg"]
    title = f"{OUT_PREFIX} switch-{n}: {prev_bg} -> {new_bg} (event at {sw['relMs']}ms, {len(tiles)} frames)"
    cols = 8
    sheet = grid(tiles, cols, title)
    out_path = os.path.join(HERE, f"{OUT_PREFIX}-switch-{n}.png")
    sheet.save(out_path)
    print(f"wrote {out_path} ({sheet.size[0]}x{sheet.size[1]}, {len(tiles)} frames)")

if not switch_events:
    print(f"NOTE: {sys.argv[1]} recorded ZERO world-switch events -- no switch-<n>.png written.")

every_n = max(1, len(manifest) // 24)
sampled = [f for i, f in enumerate(manifest) if i % every_n == 0]
tiles = []
for f in sampled:
    hl = any(sw["relMs"] <= f["relMs"] <= sw["relMs"] + 50 for sw in switch_events)
    tiles.append(tile(f, highlight=hl))
title = f"{OUT_PREFIX} scroll-all: every {every_n}th frame, {len(tiles)} of {len(manifest)} total, 0..{manifest[-1]['relMs']}ms"
sheet = grid(tiles, 8, title)
out_path = os.path.join(HERE, f"{OUT_PREFIX}-scroll-all.png")
sheet.save(out_path)
print(f"wrote {out_path} ({sheet.size[0]}x{sheet.size[1]}, {len(tiles)} frames)")
