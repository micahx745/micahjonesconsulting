// book.typ — The 80% Wall, assembled.
//
// The complete manual: cover, contents, ten chapters. Each chapter
// file carries its own show rule (footers, § numbering scoped by
// include), and chapter-open resets the section counter, so the
// chapters compose without edits. The edition state suppresses
// chapter 1's free-sampler sales colophon.
//
// Compile (from product/playbook/):
//   typst compile src/book.typ output/the-80-percent-wall.pdf --font-path fonts
#import "template.typ": *

#set document(
  title: "The 80% Wall — A field manual for solo builders",
  author: "Micah Jones",
)

#edition.update("book")

#book-cover()

#book-toc((
  ("01", "Why your build broke at 80%"),
  ("02", "The spec is the moat"),
  ("03", "The architecture you didn't draw"),
  ("04", "Deploy day"),
  ("05", "The security pre-flight"),
  ("06", "Stripe in production"),
  ("07", "Compliance, when it matters"),
  ("08", "The first ten users"),
  ("09", "The distribution loop"),
  ("10", "When to hand it off"),
))

#include "chapter-01.typ"
#include "chapter-02.typ"
#include "chapter-03.typ"
#include "chapter-04.typ"
#include "chapter-05.typ"
#include "chapter-06.typ"
#include "chapter-07.typ"
#include "chapter-08.typ"
#include "chapter-09.typ"
#include "chapter-10.typ"
