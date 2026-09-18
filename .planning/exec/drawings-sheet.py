# Compose the five Pass-121 drawing crops into one labelled sheet for the G3 judge.
# Usage: python .planning/exec/drawings-sheet.py [set_dir]   (default: .planning/mock/pass-121/set)
import sys, os
from PIL import Image, ImageDraw, ImageFont
d = sys.argv[1] if len(sys.argv) > 1 else ".planning/mock/pass-121/set"
order = ["rfp-flow", "guardicore-vis", "ordani-claims", "content-move", "birth-move"]
imgs = []
for slug in order:
    p = os.path.join(d, f"drawing-{slug}-1440.png")
    if not os.path.exists(p):
        sys.exit(f"missing {p}")
    imgs.append((slug, Image.open(p).convert("RGB")))
pad, label_h = 24, 34
W = max(im.width for _, im in imgs) + pad * 2
H = sum(im.height + label_h + pad for _, im in imgs) + pad
sheet = Image.new("RGB", (W, H), (255, 255, 255))
dr = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype("consola.ttf", 20)
except OSError:
    font = ImageFont.load_default()
y = pad
for slug, im in imgs:
    dr.text((pad, y + 6), f"{slug}  ({im.width}x{im.height}, crop of the 1440 page at dpr 2)", fill=(120, 120, 120), font=font)
    y += label_h
    sheet.paste(im, (pad, y))
    y += im.height + pad
out = os.path.join(d, "drawings-sheet-1440.png")
sheet.save(out)
print(out, sheet.size)
