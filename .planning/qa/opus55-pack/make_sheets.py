"""Assemble the per-route screenshot sheets for the Opus 5.5 review pack.

Brief: .claude/briefs/opus55-pack-captures.md. Reads manifest.json and the
frames/ directory next to this file; writes sheets/<RR>-<slug>-<kind>.png
(JPEG fallback when a PNG would exceed 4.5 MB).
"""

import json
import math
import os

from PIL import Image, ImageDraw, ImageFont

PACK_DIR = os.path.dirname(os.path.abspath(__file__))
FRAMES_DIR = os.path.join(PACK_DIR, "frames")
SHEETS_DIR = os.path.join(PACK_DIR, "sheets")

GUTTER = 12
STRIP = 40
PHONE_W, PHONE_PER_ROW = 260, 6
DESKTOP_W, DESKTOP_PER_ROW = 470, 4
JPEG_LIMIT = 4.5 * 1024 * 1024


def scaled(path, target_w):
    img = Image.open(path).convert("RGB")
    h = round(img.height * target_w / img.width)
    return img.resize((target_w, h), Image.LANCZOS)


def main():
    os.makedirs(SHEETS_DIR, exist_ok=True)
    with open(os.path.join(PACK_DIR, "manifest.json"), encoding="utf-8") as f:
        manifest = json.load(f)

    route_order = []
    for entry in manifest:
        if entry["route"] not in route_order:
            route_order.append(entry["route"])

    font = ImageFont.load_default(size=18)
    box_font = ImageFont.load_default(size=14)
    jpeg_sheets = []

    for entry in manifest:
        rr = route_order.index(entry["route"]) + 1
        kind = "phone" if entry["width"] == 390 else "desktop"
        width_label = "phone 390 px" if kind == "phone" else "desktop 1440 px"
        target_w, per_row = (
            (PHONE_W, PHONE_PER_ROW) if kind == "phone" else (DESKTOP_W, DESKTOP_PER_ROW)
        )

        names = [
            "{}-{}-{}.png".format(entry["slug"], entry["width"], str(i).zfill(2))
            for i in range(1, entry["frames"] + 1)
        ]
        paths = [os.path.join(FRAMES_DIR, n) for n in names]
        for p in paths:
            if not os.path.exists(p):
                raise SystemExit("missing frame: {}".format(p))
        thumbs = [scaled(p, target_w) for p in paths]
        cell_h = max(t.height for t in thumbs)

        rows = math.ceil(len(thumbs) / per_row)
        sheet_w = GUTTER + per_row * target_w + (per_row - 1) * GUTTER + GUTTER
        sheet_h = STRIP + GUTTER + rows * cell_h + (rows - 1) * GUTTER + GUTTER
        sheet = Image.new("RGB", (sheet_w, sheet_h), "white")
        draw = ImageDraw.Draw(sheet)

        label = "{} | {} | frames 1-{}, left to right, top to bottom | reduced motion".format(
            entry["route"], width_label, len(thumbs)
        )
        draw.text((GUTTER, (STRIP - 18) // 2), label, fill="black", font=font)

        for i, thumb in enumerate(thumbs):
            r, c = divmod(i, per_row)
            x = GUTTER + c * (target_w + GUTTER)
            y = STRIP + GUTTER + r * (cell_h + GUTTER)
            sheet.paste(thumb, (x, y))
            num = str(i + 1)
            bw = int(draw.textlength(num, font=box_font)) + 10
            draw.rectangle([x, y, x + bw, y + 20], fill="black")
            draw.text((x + 5, y + 2), num, fill="white", font=box_font)

        out_png = os.path.join(
            SHEETS_DIR, "{}-{}-{}.png".format(str(rr).zfill(2), entry["slug"], kind)
        )
        sheet.save(out_png, optimize=True)
        if os.path.getsize(out_png) > JPEG_LIMIT:
            out_jpg = out_png[: -len(".png")] + ".jpg"
            sheet.save(out_jpg, quality=85)
            os.remove(out_png)
            jpeg_sheets.append(os.path.basename(out_jpg))
            print("sheet: {} (JPEG fallback: PNG exceeded 4.5 MB)".format(os.path.basename(out_jpg)))
        else:
            print("sheet: {}".format(os.path.basename(out_png)))

    if jpeg_sheets:
        print("jpeg fallback sheets: {}".format(", ".join(jpeg_sheets)))


if __name__ == "__main__":
    main()
