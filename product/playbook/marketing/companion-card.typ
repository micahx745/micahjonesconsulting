// product/playbook/marketing/companion-card.typ — landing-page proof
// asset. Renders the REAL companion file checklists/05-security.md
// through the book's own preflight() grammar (design-director call:
// the book's grammar, never a third HTML card system). Content is
// verbatim from the file; regenerate the PNG whenever it changes:
//   typst compile marketing/companion-card.typ ../../public/playbook/companion-card.png --format png --ppi 220 --font-path fonts --root ..
#import "../src/template.typ": *

#set page(width: 420pt, height: auto, fill: cw-paper, margin: 24pt)
#set text(font: body-font, size: 10.5pt, fill: cw-espresso)

#preflight(
  "checklists/05-security.md",
  [Run the two-account test: create as A, snoop as B, through the
    app and through edited IDs.],
  [Row-level security on, on every table. Deny by default; service
    key server-side only.],
  [View-source the deployed site; search the page and its scripts
    for anything key-shaped.],
  [Grep the repo AND its history for credential shapes. Anything
    found gets rotated, never just deleted.],
  [Hit your admin routes logged out, cold, in an incognito window.],
)
