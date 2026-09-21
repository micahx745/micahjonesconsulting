import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = path.dirname(fileURLToPath(import.meta.url));
const widths = [390, 1440];
const labels = ["BEFORE", "AFTER"];

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

for (const width of widths) {
  const sources = [
    path.join(root, `before-${width}.png`),
    path.join(root, `after-${width}.png`),
  ];
  const metadata = await Promise.all(
    sources.map((source) => sharp(source).metadata()),
  );
  const actualWidths = metadata.map((entry) => entry.width);
  if (actualWidths.some((actual) => actual > width)) {
    throw new Error(
      `${width}px sheet cannot contain source widths ${actualWidths.join(", ")}`,
    );
  }

  const gap = width === 390 ? 12 : 24;
  const titleHeight = width === 390 ? 56 : 84;
  const labelHeight = width === 390 ? 52 : 72;
  const headerHeight = titleHeight + labelHeight;
  const contentHeight = Math.max(...metadata.map((entry) => entry.height));
  const sheetWidth = width * 2 + gap * 3;
  const sheetHeight = headerHeight + gap + contentHeight + gap;
  const titleSize = width === 390 ? 22 : 34;
  const labelSize = width === 390 ? 16 : 28;
  const title = `PASS-124 HOMEPAGE - ${width}px`;
  const labelMarkup = labels
    .map((label, column) => {
      const x = gap + column * (width + gap) + width / 2;
      const y = titleHeight + labelHeight / 2;
      return `<text x="${x}" y="${y}" class="label">${escapeXml(label)}</text>`;
    })
    .join("");
  const header = Buffer.from(`
    <svg width="${sheetWidth}" height="${headerHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f2efe8"/>
      <style>
        text { fill: #181614; font-family: Arial, sans-serif; font-weight: 700; text-anchor: middle; dominant-baseline: middle; }
        .title { font-size: ${titleSize}px; }
        .label { font-size: ${labelSize}px; }
      </style>
      <text x="${sheetWidth / 2}" y="${titleHeight / 2}" class="title">${escapeXml(title)}</text>
      ${labelMarkup}
    </svg>
  `);
  const composites = [
    { input: header, left: 0, top: 0 },
    ...sources.map((source, column) => ({
      input: source,
      left: gap + column * (width + gap),
      top: headerHeight + gap,
    })),
  ];
  const output = path.join(root, `sheet-${width}.png`);

  await sharp({
    create: {
      width: sheetWidth,
      height: sheetHeight,
      channels: 3,
      background: "#f2efe8",
    },
  })
    .composite(composites)
    .png()
    .toFile(output);

  console.log(
    `wrote ${output} ${sheetWidth}x${sheetHeight}; ` +
      `source widths=${actualWidths.join(",")}; ` +
      `source heights=${metadata.map((entry) => entry.height).join(",")}`,
  );
}
