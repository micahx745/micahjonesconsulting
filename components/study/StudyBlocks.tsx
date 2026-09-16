// components/study/StudyBlocks.tsx
//
// Pass-120. The MDX body blocks of the study template. Props are fixed by section 2
// of the Pass-120 brief; markup and CSS by section 3. Server components only.
import type { ReactNode } from "react";
import Image from "next/image";

export function Step({
  n,
  lead,
  children,
}: {
  n: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <div className="cs-step">
      <span className="cs-step__n" aria-hidden="true">
        {n}
      </span>
      <p>
        <strong>{lead}</strong> {children}
      </p>
    </div>
  );
}

export function Exhibit({ children }: { children: ReactNode }) {
  return (
    <table className="cs-exhibit">
      <thead>
        <tr>
          <th scope="col">The request</th>
          <th scope="col">What the engine did</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export function ExhibitRow({
  request,
  engine,
}: {
  request: string;
  engine: string;
}) {
  return (
    <tr>
      <td data-label="The request">{request}</td>
      <td data-label="What the engine did">{engine}</td>
    </tr>
  );
}

export function ChapterBreak({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <figure className="cs-break">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes="100vw"
        className="cs-break__img"
      />
    </figure>
  );
}
