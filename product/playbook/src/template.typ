// template.typ — "The 80% Wall" field-manual design system, v2.
//
// v2 direction (operator: "less AI, more special", 2026-08-31):
// - Narrow measure (~62 chars) with a wide outer margin used as a live
//   marginalia rail: section codes, field notes, small annotations.
//   Reference: A Book Apart-style side rail + military FM labeling.
// - Technical-document grammar: spec block on the cover, FM-numbered
//   footers, mono section codes. Matches the site's SpecTable register.
// - Real line-drawn diagrams (Typst-native), not text walls.
//   Reference: Refactoring UI's visual-per-spread density; field-manual
//   line drawings.
// - Palette unchanged (Color Worlds): bone paper, espresso ink,
//   terracotta accent, saffron labels, petrol for diagram strokes.
//
// Compile (from product/playbook/):
//   typst compile src/chapter-01.typ output/the-80-percent-wall-ch1.pdf --font-path fonts

#let cw-terracotta = rgb("#9E3C25")
#let cw-bone = rgb("#ECE3D0")
#let cw-petrol = rgb("#1A4548")
#let cw-espresso = rgb("#2A1F18")
#let cw-saffron = rgb("#C9982F")
#let cw-paper = rgb("#F7F3EA")

#let display-font = "Bricolage Grotesque"
#let body-font = "Hanken Grotesk"
#let mono-font = "JetBrains Mono"

// Geometry. Body column ~340pt at 10.5pt Hanken ≈ 62 chars.
#let rail-width = 132pt
#let rail-gap = 26pt

#let kicker(txt, fill: cw-saffron, size: 8pt) = text(
  font: mono-font, size: size, weight: 700, tracking: 0.11em, fill: fill, upper(txt),
)

// ---- Marginalia -----------------------------------------------------

// Place a note in the outer rail, top-aligned with the next block.
#let side(body) = place(
  dx: 340pt + rail-gap,
  box(width: rail-width)[
    #set text(font: body-font, size: 8pt, fill: cw-espresso.transparentize(18%))
    #set par(leading: 0.62em, spacing: 0.7em, justify: false)
    #body
  ],
)

// A labeled field note in the rail.
#let fieldnote(body) = side[
  #kicker("Field note", fill: cw-terracotta, size: 6.5pt)
  #v(3pt)
  #body
]

// ---- Blocks ---------------------------------------------------------

#let warstory(code, title, body) = block(
  width: 100%,
  fill: cw-espresso,
  inset: (x: 20pt, y: 18pt),
  radius: 2pt,
  breakable: false,
  above: 1.7em,
  below: 1.7em,
)[
  #grid(
    columns: (1fr, auto),
    kicker("From the build log", fill: cw-saffron),
    kicker(code, fill: cw-bone.transparentize(55%), size: 6.5pt),
  )
  #v(8pt)
  #text(font: display-font, size: 13pt, weight: 700, fill: cw-bone)[#title]
  #v(6pt)
  #set text(font: body-font, size: 9.6pt, fill: cw-bone.transparentize(5%))
  #set par(leading: 0.68em, spacing: 0.9em)
  #body
]

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
  #set text(size: 10pt, fill: cw-espresso)
  #set par(leading: 0.68em, spacing: 0.9em)
  #body
]

#let pull(txt) = block(above: 1.8em, below: 1.8em, width: 100%, breakable: false)[
  #line(length: 44pt, stroke: 2.5pt + cw-terracotta)
  #v(9pt)
  #text(font: display-font, size: 16pt, weight: 700, fill: cw-terracotta)[#txt]
]

#let define(term, body) = block(above: 1.5em, below: 1.5em, breakable: false)[
  #kicker(term, fill: cw-terracotta)
  #v(4pt)
  #block(inset: (left: 12pt), stroke: (left: 1pt + cw-espresso.transparentize(70%)))[
    #set text(size: 10pt)
    #body
  ]
]

// PRE-FLIGHT card: the five-habit checklist as a designed artifact.
#let preflight(title, ..items) = block(
  width: 100%,
  stroke: 1.2pt + cw-espresso,
  inset: 0pt,
  radius: 2pt,
  above: 1.7em,
  below: 1.7em,
  breakable: false,
)[
  #block(width: 100%, fill: cw-espresso, inset: (x: 16pt, y: 10pt))[
    #grid(
      columns: (1fr, auto),
      kicker(title, fill: cw-bone),
      kicker("Run tonight", fill: cw-saffron, size: 6.5pt),
    )
  ]
  #block(inset: (x: 16pt, y: 14pt))[
    #for (i, it) in items.pos().enumerate() {
      if i > 0 { v(0.85em); line(length: 100%, stroke: 0.5pt + cw-espresso.transparentize(80%)); v(0.85em) }
      grid(
        columns: (18pt, 1fr),
        align(top)[#box(width: 10pt, height: 10pt, stroke: 1.2pt + cw-espresso, baseline: 1pt)],
        [#set text(size: 9.8pt); #set par(leading: 0.64em, spacing: 0.8em); #it],
      )
    }
  ]
]

// ---- Diagrams (Typst-native line drawings, petrol strokes) ----------

// The three-curves chart: constraint count crosses window capacity.
#let wall-chart() = block(above: 1.6em, below: 1.6em, breakable: false)[
  #let w = 340pt
  #let h = 168pt
  #box(width: w, height: h)[
    // axes
    #place(dx: 0pt, dy: h - 22pt, line(length: w, stroke: 1pt + cw-espresso))
    #place(dx: 0pt, dy: 6pt, line(angle: 90deg, length: h - 28pt, stroke: 1pt + cw-espresso))
    // window capacity: flat-ish line
    #place(dx: 0pt, dy: 58pt, line(end: (w - 6pt, -4pt), stroke: (paint: cw-petrol, thickness: 1.4pt, dash: "dashed")))
    // constraints pile: rising segments, crossing ~72% across
    #place(dx: 0pt, dy: h - 24pt, line(end: (90pt, -14pt), stroke: 2pt + cw-terracotta))
    #place(dx: 90pt, dy: h - 38pt, line(end: (80pt, -28pt), stroke: 2pt + cw-terracotta))
    #place(dx: 170pt, dy: h - 66pt, line(end: (70pt, -44pt), stroke: 2pt + cw-terracotta))
    #place(dx: 240pt, dy: h - 110pt, line(end: (60pt, -50pt), stroke: 2pt + cw-terracotta))
    // crossing marker at ~ (247pt, 54pt)
    #place(dx: 241pt, dy: 48pt, circle(radius: 4pt, stroke: 1.6pt + cw-espresso, fill: cw-paper))
    #place(dx: 214pt, dy: 26pt, kicker("The wall", fill: cw-espresso, size: 7pt))
    // labels
    #place(dx: 6pt, dy: 40pt, kicker("What fits in the window", fill: cw-petrol, size: 6.5pt))
    #place(dx: 14pt, dy: h - 58pt, kicker("Unwritten rules", fill: cw-terracotta, size: 6.5pt))
    #place(dx: 0pt, dy: h - 16pt, kicker("Build progress", fill: cw-espresso.transparentize(35%), size: 6.5pt))
    #place(dx: w - 34pt, dy: h - 16pt, kicker("80%", fill: cw-espresso, size: 7pt))
  ]
]

// The transcript diagram: a strip of blocks, oldest falling out.
#let window-diagram() = block(above: 1.6em, below: 1.6em, breakable: false)[
  #let cell(label, dead: false) = box(
    width: 46pt, height: 30pt,
    stroke: if dead { (paint: cw-espresso.transparentize(65%), thickness: 1pt, dash: "dashed") } else { 1.2pt + cw-petrol },
    fill: if dead { none } else { cw-petrol.transparentize(92%) },
    align(center + horizon, kicker(label, fill: if dead { cw-espresso.transparentize(55%) } else { cw-petrol }, size: 5.5pt)),
  )
  #stack(
    dir: ltr, spacing: 6pt,
    cell("Tue's fix", dead: true),
    cell("Why it's odd", dead: true),
    cell("File reads"),
    cell("Your ask"),
    cell("New diff"),
    cell("Errors"),
  )
  #v(6pt)
  #grid(
    columns: (1fr, 1fr),
    align(left, kicker("Fell out of the window", fill: cw-espresso.transparentize(45%), size: 6.5pt)),
    align(right, kicker("What the model can see now", fill: cw-petrol, size: 6.5pt)),
  )
]

// ---- Pages ----------------------------------------------------------

// Cover: espresso, spec-sheet block, big numeral composition.
#let chapter-open(num, title, dek, spec: ()) = page(
  fill: cw-espresso,
  margin: (top: 84pt, bottom: 66pt, left: 84pt, right: 84pt),
  footer: none,
  header: none,
)[
  #grid(
    columns: (1fr, auto),
    kicker("The 80% Wall", fill: cw-bone),
    kicker("Field manual · Document " + num + " of 10", fill: cw-bone.transparentize(45%)),
  )
  #v(4pt)
  #line(length: 100%, stroke: 0.7pt + cw-bone.transparentize(70%))
  #v(26pt)
  #text(font: display-font, size: 128pt, weight: 800, fill: cw-terracotta, tracking: -0.03em)[#num]
  #v(-20pt)
  #text(font: display-font, size: 30pt, weight: 800, fill: cw-bone)[#title]
  #v(12pt)
  #box(width: 330pt)[
    #set par(leading: 0.68em)
    #text(font: body-font, size: 11.5pt, fill: cw-bone.transparentize(10%))[#dek]
  ]
  #v(1fr)
  // spec block — the technical-document data card.
  #block(width: 100%, stroke: 0.8pt + cw-bone.transparentize(55%), inset: (x: 16pt, y: 12pt), radius: 2pt)[
    #set text(font: mono-font, size: 7pt, fill: cw-bone.transparentize(20%), tracking: 0.09em)
    #grid(
      columns: (auto, 1fr, auto, 1fr),
      column-gutter: 14pt,
      row-gutter: 7pt,
      ..spec.map(((k, v)) => (
        text(fill: cw-saffron, weight: 700, upper(k)),
        upper(v),
      )).flatten(),
    )
  ]
]

// Main show rule. Wide outer margin = the rail.
#let manual(chapter-num: "01", body) = {
  set page(
    paper: "us-letter",
    margin: (top: 82pt, bottom: 78pt, left: 84pt, right: 84pt + rail-gap + rail-width),
    fill: cw-paper,
    footer: context {
      set text(font: mono-font, size: 6.5pt, fill: cw-espresso.transparentize(40%), tracking: 0.1em)
      box(width: 340pt + rail-gap + rail-width)[
        #grid(
          columns: (1fr, auto, 1fr),
          align(left)[THE 80% WALL · FM-#chapter-num · REV 2026.08],
          align(center)[#counter(page).display()],
          align(right)[MICAHJONESCONSULTING.COM/PLAYBOOK],
        )
      ]
    },
  )
  set text(font: body-font, size: 10.5pt, fill: cw-espresso, weight: 400)
  set par(leading: 0.7em, spacing: 1.05em, justify: false)
  set strong(delta: 300)
  show heading.where(level: 2): it => {
    block(above: 1.9em, below: 0.9em, width: 100%, {
      counter("sect").step()
      place(dx: 340pt + rail-gap, dy: 4pt, context {
        kicker("§ " + chapter-num + "." + str(counter("sect").get().first()), fill: cw-terracotta, size: 7pt)
      })
      line(length: 30pt, stroke: 2.5pt + cw-terracotta)
      v(7pt)
      text(font: display-font, size: 17pt, weight: 800, fill: cw-espresso, it.body)
    })
  }
  show heading.where(level: 3): it => {
    v(1.25em, weak: true)
    text(font: display-font, size: 11.5pt, weight: 700, fill: cw-terracotta, it.body)
    v(0.5em, weak: true)
  }
  show emph: set text(style: "italic")
  body
}

// End matter on its own closing page: author, then the two paths
// stacked full-measure (buy the manual / hire the operator).
#let two-paths(author-body, manual-body, operator-body) = [
  #v(1.6em)
  #line(length: 100%, stroke: 1.2pt + cw-espresso)
  #v(14pt)
  #kicker("Who wrote this", fill: cw-terracotta)
  #v(8pt)
  #author-body
  #v(20pt)
  #block(width: 100%, fill: cw-bone, inset: (x: 17pt, y: 15pt), radius: 2pt, breakable: false)[
    #kicker("Path one · The manual", fill: cw-terracotta, size: 7pt)
    #v(7pt)
    #set text(size: 9.8pt)
    #set par(leading: 0.66em, spacing: 0.85em)
    #manual-body
  ]
  #v(12pt)
  #block(width: 100%, fill: cw-espresso, inset: (x: 17pt, y: 15pt), radius: 2pt, breakable: false)[
    #kicker("Path two · The operator", fill: cw-saffron, size: 7pt)
    #v(7pt)
    #set text(size: 9.8pt, fill: cw-bone)
    #set par(leading: 0.66em, spacing: 0.85em)
    #operator-body
  ]
  #v(1fr)
  #text(font: mono-font, size: 6.5pt, fill: cw-espresso.transparentize(40%), tracking: 0.1em)[
    © 2026 MICAH JONES · FREE CHAPTER · SHARE IT, DON'T SELL IT
  ]
]
