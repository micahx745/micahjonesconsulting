// template.typ — "The 80% Wall" field-manual design system.
//
// Print grammar of the site's Color Worlds system: bone paper, espresso
// ink, terracotta accent, saffron mono labels, petrol reserved for code.
// Fonts mirror the site: Bricolage Grotesque (display), Hanken Grotesk
// (body), JetBrains Mono (labels — CW uses mono for kickers).
//
// Compile (from product/playbook/):
//   typst compile src/chapter-01.typ output/the-80-percent-wall-ch1.pdf --font-path fonts

#let cw-terracotta = rgb("#9E3C25")
#let cw-bone = rgb("#ECE3D0")
#let cw-petrol = rgb("#1A4548")
#let cw-espresso = rgb("#2A1F18")
#let cw-saffron = rgb("#C9982F")
#let cw-paper = rgb("#F7F3EA") // print tint of bone — full bone is too heavy for body pages

#let display-font = "Bricolage Grotesque"
#let body-font = "Hanken Grotesk"
#let mono-font = "JetBrains Mono"

// Small uppercase tracked mono label.
#let kicker(txt, fill: cw-saffron) = text(
  font: mono-font, size: 8pt, weight: 700, tracking: 0.12em, fill: fill, upper(txt),
)

// Full-bleed espresso chapter opener.
#let chapter-open(num, title, dek) = page(
  fill: cw-espresso,
  margin: (top: 90pt, bottom: 72pt, left: 90pt, right: 90pt),
  footer: none,
  header: none,
)[
  #kicker("The 80% Wall · A field manual for solo builders")
  #v(90pt)
  #text(font: display-font, size: 132pt, weight: 800, fill: cw-terracotta)[#num]
  #v(2pt)
  #text(font: display-font, size: 31pt, weight: 800, fill: cw-bone)[#title]
  #v(16pt)
  #text(font: body-font, size: 12.5pt, style: "italic", fill: cw-bone.transparentize(12%))[#dek]
  #v(1fr)
  #grid(
    columns: (1fr, auto),
    align(left)[#kicker("Micah Jones", fill: cw-bone.transparentize(35%))],
    align(right)[#kicker("Chapter " + num + " of 10", fill: cw-bone.transparentize(35%))],
  )
]

// Dark panel for a true story from the build log.
#let warstory(title, body) = block(
  width: 100%,
  fill: cw-espresso,
  stroke: (left: 3pt + cw-terracotta),
  inset: (x: 18pt, y: 16pt),
  radius: 2pt,
  breakable: false,
  above: 1.6em,
  below: 1.6em,
)[
  #kicker("From the build log")
  #v(7pt)
  #text(font: display-font, size: 12.5pt, weight: 700, fill: cw-bone)[#title]
  #v(6pt)
  #set text(font: body-font, size: 9.8pt, fill: cw-bone.transparentize(6%))
  #set par(leading: 0.68em, spacing: 0.9em)
  #body
]

// Bone callout with terracotta rule.
#let callout(body) = block(
  width: 100%,
  fill: cw-bone,
  stroke: (left: 3pt + cw-terracotta),
  inset: (x: 16pt, y: 13pt),
  radius: 2pt,
  breakable: false,
  above: 1.5em,
  below: 1.5em,
)[
  #set text(size: 10.2pt, fill: cw-espresso)
  #set par(leading: 0.68em, spacing: 0.9em)
  #body
]

// Big display pull-line.
#let pull(txt) = block(above: 1.7em, below: 1.7em, width: 100%)[
  #text(font: display-font, size: 16.5pt, weight: 700, fill: cw-terracotta)[#txt]
]

// Definition block.
#let define(term, body) = block(above: 1.4em, below: 1.4em)[
  #kicker(term, fill: cw-terracotta)
  #v(4pt)
  #set text(size: 10.2pt)
  #body
]

// Checklist with square boxes.
#let checkitem(body) = grid(
  columns: (16pt, 1fr),
  row-gutter: 0pt,
  align(top + left)[#box(width: 9pt, height: 9pt, stroke: 1.2pt + cw-espresso, baseline: 0.5pt)],
  [#set text(size: 10.2pt); #set par(leading: 0.66em); #body],
)
#let checklist(..items) = block(above: 1.2em, below: 1.4em)[
  #for it in items.pos() {
    checkitem(it)
    v(0.75em)
  }
]

// Main show rule.
#let manual(chapter-num: "01", body) = {
  set page(
    paper: "us-letter",
    margin: (top: 84pt, bottom: 80pt, left: 96pt, right: 96pt),
    fill: cw-paper,
    footer: context {
      set text(font: mono-font, size: 7pt, fill: cw-espresso.transparentize(42%), tracking: 0.09em)
      grid(
        columns: (1fr, auto, 1fr),
        align(left)[THE 80% WALL · CHAPTER #chapter-num],
        align(center)[#counter(page).display()],
        align(right)[MICAHJONESCONSULTING.COM/PLAYBOOK],
      )
    },
  )
  set text(font: body-font, size: 10.5pt, fill: cw-espresso, weight: 400)
  set par(leading: 0.72em, spacing: 1.12em, justify: false)
  set strong(delta: 300)
  show heading.where(level: 2): it => {
    v(1.5em, weak: true)
    text(font: display-font, size: 16pt, weight: 700, fill: cw-espresso, it.body)
    v(0.65em, weak: true)
  }
  show heading.where(level: 3): it => {
    v(1.2em, weak: true)
    text(font: display-font, size: 12pt, weight: 700, fill: cw-terracotta, it.body)
    v(0.5em, weak: true)
  }
  show emph: set text(style: "italic")
  body
}

// Closing page: next-chapter teaser + copyright.
#let closing(next-num, next-title, next-line) = [
  #v(1fr)
  #line(length: 100%, stroke: 0.8pt + cw-terracotta)
  #v(14pt)
  #kicker("Next · Chapter " + next-num)
  #v(6pt)
  #text(font: display-font, size: 19pt, weight: 800, fill: cw-espresso)[#next-title]
  #v(8pt)
  #text(size: 10.5pt)[#next-line]
  #v(22pt)
  #text(size: 10.2pt)[
    This is Chapter 1 of ten, free. The full manual, with the companion
    prompt files and checklists, ships at
    #text(fill: cw-terracotta, weight: 700)[micahjonesconsulting.com/playbook].
    Launch price \$99.
  ]
  #v(16pt)
  #text(font: mono-font, size: 7pt, fill: cw-espresso.transparentize(42%), tracking: 0.09em)[
    © 2026 MICAH JONES · FREE CHAPTER · SHARE IT, DON'T SELL IT
  ]
]
