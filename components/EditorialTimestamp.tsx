// components/EditorialTimestamp.tsx
//
// Tier H — Editorial timestamp anchor.
//
// Bottom-right of every page: tiny serif-italic timestamp that reads
// "Oakland ¶ Month Year ¶ Issue 01". Server-rendered with the current
// month/year. Works as an editorial mark / specimen — a publication
// would have one of these somewhere on every spread. Pure typography,
// pointer-events:none, decorative.
//
// Mode-aware via :has() selectors in globals.css.
export function EditorialTimestamp() {
  const now = new Date();
  const month = now.toLocaleDateString("en-US", { month: "long" });
  const year = now.getFullYear();

  return (
    <div className="editorial-timestamp" aria-hidden>
      <span className="editorial-timestamp__place">Oakland</span>
      <span className="editorial-timestamp__sep">¶</span>
      <span className="editorial-timestamp__date">
        {month} {year}
      </span>
      <span className="editorial-timestamp__sep">¶</span>
      <span className="editorial-timestamp__issue">Issue 01</span>
    </div>
  );
}
