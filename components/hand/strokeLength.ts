export function screenLength(el: SVGPathElement): number {
  const userLength = el.getTotalLength();
  let length = userLength;
  if (el.getAttribute("vector-effect") === "non-scaling-stroke") {
    const ctm = el.getScreenCTM();
    if (ctm) {
      length = 0;
      let previous: DOMPoint | null = null;
      for (let i = 0; i < 200; i++) {
        const p = el.getPointAtLength((i / 199) * userLength);
        const mapped = new DOMPoint(p.x, p.y).matrixTransform(ctm);
        if (previous) {
          length += Math.hypot(mapped.x - previous.x, mapped.y - previous.y);
        }
        previous = mapped;
      }
    }
  }
  return Math.ceil(length) + 2;
}
