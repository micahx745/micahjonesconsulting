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

// A file rendered as an artifact: mono header bar + contents.
#let filecard(filename, body) = block(
  width: 100%,
  stroke: 1pt + cw-petrol,
  inset: 0pt,
  radius: 2pt,
  breakable: false,
  above: 1.5em,
  below: 1.5em,
)[
  #block(width: 100%, fill: cw-petrol, inset: (x: 14pt, y: 8pt))[
    // no upper(): filename case is meaningful
    #text(font: mono-font, size: 7pt, weight: 700, tracking: 0.11em, fill: cw-bone, filename)
  ]
  #block(inset: (x: 14pt, y: 12pt))[
    #set text(font: mono-font, size: 8.4pt, fill: cw-espresso)
    #set par(leading: 0.72em, spacing: 0.72em)
    #body
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

// Drift chart: intent vs repo diverging over sessions.
#let drift-chart() = block(above: 1.6em, below: 1.6em, breakable: false)[
  #let w = 340pt
  #let h = 150pt
  #box(width: w, height: h)[
    // axes
    #place(dx: 0pt, dy: h - 22pt, line(length: w, stroke: 1pt + cw-espresso))
    #place(dx: 0pt, dy: 6pt, line(angle: 90deg, length: h - 28pt, stroke: 1pt + cw-espresso))
    // intent: steady rise (petrol), (0,110) -> (330,40)
    #place(dx: 0pt, dy: 110pt, line(end: (330pt, -70pt), stroke: 1.6pt + cw-petrol))
    // repo: rises then plateaus (terracotta), diverging below intent
    #place(dx: 0pt, dy: 110pt, line(end: (80pt, -14pt), stroke: 2pt + cw-terracotta))
    #place(dx: 80pt, dy: 96pt, line(end: (80pt, -6pt), stroke: 2pt + cw-terracotta))
    #place(dx: 160pt, dy: 90pt, line(end: (80pt, -2pt), stroke: 2pt + cw-terracotta))
    #place(dx: 240pt, dy: 88pt, line(end: (90pt, -1pt), stroke: 2pt + cw-terracotta))
    // the widening gap, marked at the right edge
    #place(dx: 330pt, dy: 40pt, line(angle: 90deg, length: 47pt, stroke: (paint: cw-espresso, thickness: 1pt, dash: "dotted")))
    #place(dx: 255pt, dy: 96pt, kicker("The gap", fill: cw-espresso, size: 7pt))
    // labels, clear of both lines
    #place(dx: 6pt, dy: 68pt, kicker("The app you intend", fill: cw-petrol, size: 6.5pt))
    #place(dx: 118pt, dy: 112pt, kicker("The app the sessions build", fill: cw-terracotta, size: 6.5pt))
    #place(dx: 0pt, dy: h - 16pt, kicker("Sessions", fill: cw-espresso.transparentize(35%), size: 6.5pt))
  ]
]

// The five-box architecture map (chapter 3's centerpiece).
#let arch-box(x, y, bw, bh, label, sub: none) = {
  place(dx: x, dy: y, box(
    width: bw, height: bh,
    stroke: 1.3pt + cw-petrol,
    fill: cw-petrol.transparentize(94%),
    align(center + horizon)[
      #kicker(label, fill: cw-petrol, size: 7pt)
      #if sub != none {
        v(2pt)
        text(font: mono-font, size: 5.5pt, fill: cw-espresso.transparentize(30%), tracking: 0.05em, sub)
      }
    ],
  ))
}
#let arch-arrow(x, y1, y2, label, lx) = {
  place(dx: x, dy: y1, line(angle: 90deg, length: y2 - y1, stroke: 1.2pt + cw-espresso))
  place(dx: x - 2.6pt, dy: y2 - 4pt, text(size: 7pt, fill: cw-espresso)[▼])
  place(dx: lx, dy: (y1 + y2) / 2 - 4pt, kicker(label, fill: cw-terracotta, size: 5.5pt))
}
#let arch-diagram() = block(above: 1.7em, below: 1.7em, breakable: false)[
  #box(width: 340pt, height: 236pt)[
    #arch-box(100pt, 0pt, 140pt, 36pt, "Client", sub: "browser · phone")
    #arch-arrow(170pt, 36pt, 74pt, "session token", 178pt)
    #arch-box(70pt, 74pt, 200pt, 38pt, "Server", sub: "your rules run here")
    #arch-arrow(60pt, 112pt, 158pt, "owner filter", 0pt)
    #arch-arrow(170pt, 112pt, 158pt, "signed access", 178pt)
    #arch-arrow(280pt, 112pt, 158pt, "secrets", 288pt)
    #arch-box(10pt, 158pt, 100pt, 40pt, "Data", sub: "who sees what")
    #arch-box(120pt, 158pt, 100pt, 40pt, "Storage", sub: "files · media")
    #arch-box(230pt, 158pt, 100pt, 40pt, "3rd parties", sub: "pay · mail · sms")
    #arch-arrow(280pt, 198pt, 228pt, "verified webhooks", 180pt)
    #place(dx: 20pt, dy: 224pt, kicker("back into the server, never the client", fill: cw-espresso.transparentize(35%), size: 5.5pt))
  ]
]

// Two-machines panel: the laptop's implicit state vs production's
// explicit-only state (chapter 4).
#let machines-diagram() = block(above: 1.7em, below: 1.7em, breakable: false)[
  #grid(
    columns: (1fr, 1fr),
    column-gutter: 12pt,
    box(width: 100%, stroke: 1.3pt + cw-petrol, inset: 12pt, fill: cw-petrol.transparentize(94%))[
      #kicker("Your laptop", fill: cw-petrol, size: 7pt)
      #v(6pt)
      #set text(font: mono-font, size: 7pt, fill: cw-espresso.transparentize(15%))
      #set par(leading: 0.85em)
      .env file with every key \
      logged-in CLIs \
      database you seeded by hand \
      localhost URLs everywhere \
      files from six months of work
    ],
    box(width: 100%, stroke: 1.3pt + cw-terracotta, inset: 12pt)[
      #kicker("Production", fill: cw-terracotta, size: 7pt)
      #v(6pt)
      #set text(font: mono-font, size: 7pt, fill: cw-espresso.transparentize(15%))
      #set par(leading: 0.85em)
      your code \
      \
      ...and nothing else. \
      Every value you didn't \
      explicitly provide is missing.
    ],
  )
]

// Money-flow diagram (chapter 6): checkout out, signed webhook back,
// and the success page marked as not-the-truth.
#let money-diagram() = block(above: 1.7em, below: 1.7em, breakable: false)[
  #box(width: 340pt, height: 190pt)[
    #arch-box(0pt, 0pt, 110pt, 38pt, "Browser", sub: "your customer")
    #arch-box(230pt, 0pt, 110pt, 38pt, "Stripe", sub: "hosted checkout")
    #arch-box(115pt, 118pt, 110pt, 38pt, "Your server", sub: "webhook endpoint")
    #arch-box(0pt, 118pt, 90pt, 38pt, "Database", sub: "paid = true")
    // browser -> stripe
    #place(dx: 110pt, dy: 17pt, line(length: 120pt, stroke: 1.2pt + cw-espresso))
    #place(dx: 224pt, dy: 13.5pt, text(size: 7pt, fill: cw-espresso)[▶])
    #place(dx: 128pt, dy: 5pt, kicker("sent to pay", fill: cw-espresso.transparentize(30%), size: 5.5pt))
    // stripe -> server (signed webhook)
    #place(dx: 285pt, dy: 38pt, line(end: (-105pt, 80pt), stroke: 1.4pt + cw-petrol))
    #place(dx: 176pt, dy: 112pt, text(size: 7pt, fill: cw-petrol)[▼])
    #place(dx: 240pt, dy: 82pt, kicker("signed webhook", fill: cw-petrol, size: 5.5pt))
    #place(dx: 240pt, dy: 92pt, kicker("= the truth", fill: cw-petrol, size: 5.5pt))
    // server -> db
    #place(dx: 115pt, dy: 137pt, line(length: -25pt, stroke: 1.2pt + cw-espresso))
    #place(dx: 92pt, dy: 133.5pt, text(size: 7pt, fill: cw-espresso)[◀])
    // browser -> success page, crossed out
    #place(dx: 30pt, dy: 38pt, line(end: (100pt, 80pt), stroke: (paint: cw-terracotta, thickness: 1.2pt, dash: "dashed")))
    #place(dx: 8pt, dy: 74pt, kicker("\"/success\" loaded", fill: cw-terracotta, size: 5.5pt))
    #place(dx: 8pt, dy: 84pt, kicker("is not proof of payment", fill: cw-terracotta, size: 5.5pt))
    #place(dx: 130pt, dy: 170pt, kicker("money state flows one way: stripe, then server, then db", fill: cw-espresso.transparentize(35%), size: 5.5pt))
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
  #pagebreak()
  #v(20pt)
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
