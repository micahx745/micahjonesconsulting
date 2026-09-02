// components/color-worlds/OpeningWorld.tsx
//
// Pass-61 — server-rendered first frame.
//
// THE BUG: `[data-mode="cw"]` in globals.css hard-codes the opening world to
// terracotta, because the home page's hero is terracotta. Every OTHER page
// opens bone or espresso, so every interior page painted the hero's colour
// first and only cross-faded to its real world once WorldSwitcher hydrated,
// on the 0.7s root transition. Caught live on /services and /book at 1440.
// A page whose first screen is a designed object cannot afford a 700ms wrong
// colour before it; the design direction called this the prerequisite for the
// whole opening-redesign pass.
//
// THE FIX: each page declares the world its first section uses. This renders
// a tiny scoped <style> on the server, so the correct background is in the
// very first byte of HTML. WorldSwitcher then sets the identical values on
// mount, which is a no-op write, so no transition fires and nothing flickers.
//
// Values are duplicated from WorldSwitcher's WORLDS map ON PURPOSE. They must
// agree, and a runtime import of a client module into a server component to
// share four hex pairs costs more than it saves. If a world's colour changes,
// change it in both places. WORLD_CONTRACT below is the note that says so.
//
// Usage: render once, as the first child of the page, naming the world of the
// page's first [data-section]:
//     <OpeningWorld name="espresso" />
//
// The union is declared here rather than imported: WorldSwitcher is a client
// component and does not export its WorldName type, and this file is a server
// component. Keeping the union local means no client/server import edge.
type WorldName = "terracotta" | "bone" | "petrol" | "espresso";

// WORLD_CONTRACT: mirrors WORLDS in components/color-worlds/WorldSwitcher.tsx.
// Both are mirrors of the --color-cw-* tokens in app/globals.css.
const OPENING_WORLDS: Record<
  WorldName,
  { bg: string; fg: string; accent: string }
> = {
  terracotta: { bg: "#9E3C25", fg: "#ECE3D0", accent: "#2A1F18" },
  bone: { bg: "#ECE3D0", fg: "#2A1F18", accent: "#9E3C25" },
  petrol: { bg: "#1A4548", fg: "#ECE3D0", accent: "#C9982F" },
  espresso: { bg: "#2A1F18", fg: "#ECE3D0", accent: "#9E3C25" },
};

export function OpeningWorld({ name }: { name: WorldName }) {
  const w = OPENING_WORLDS[name];
  // Scoped to the cw wrapper, same specificity as the globals.css default but
  // later in the cascade, so it wins without !important.
  const css = `[data-mode="cw"]{--cw-bg:${w.bg};--cw-fg:${w.fg};--cw-accent:${w.accent}}`;
  // href + precedence make React 19 HOIST this into <head> and dedupe it by
  // href. Rendered in place it lands mid-body (measured: byte 6316 of 38298 on
  // /work), which works but leaves a parse window where a paint could still use
  // the terracotta default. In the head there is no window at all.
  return (
    <style
      href={`opening-world-${name}`}
      precedence="high"
      dangerouslySetInnerHTML={{ __html: css }}
    />
  );
}
