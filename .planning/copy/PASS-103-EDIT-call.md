# Pass 103 Step A: /call

Editor proposals only. Source: branch `design/room-and-ledger`, HEAD `4250905`, 2026-09-08. No application or approval is implied.

Rows cover both intake paragraphs, all four register values, the confirmation state, the weekday warning, and the optional note prompt. CA07–CA08 belong to the confirmation state; CA09 belongs to the form state. Those states are mutually exclusive. The two em dashes in CURRENT therefore belong to separate states; the proposals remove both. Functional field labels, slots, buttons, error transport, and metadata stay fixed. CA10 uses plural wording for the two actual participants.

CURRENT preserves the source wording, case, punctuation, and numbers as readable text. Source line wraps and inline markup are flattened; HTML entities are decoded. Block terms and statements are separated by a space. KEEP means reuse CURRENT exactly, including links, emphasis, and attribution. Row IDs are in the why column; each reason is at most 12 words including its ID.

| CURRENT (verbatim)                                                                                                                  | PROPOSED                                                                                                   | why                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| No deck and no pitch. Bring the problem, and this call is where the work starts. If you have notes, bring them. If not, I will ask. | No deck and no pitch. The work starts with your problem. Bring notes if you have them. If not, I will ask. | CA01. Shorter; keeps the invitation and preparation optional. |
| What you leave with: a diagnosis of what is stuck and what work would fix it. I also tell you whether you need me at all.           | I name what is stuck and what work would fix it. I tell you whether you need me at all.                    | CA02. First person; cuts the label and repetition.            |
| Free                                                                                                                                | KEEP                                                                                                       | CA03. Locked cost.                                            |
| Thirty minutes                                                                                                                      | KEEP                                                                                                       | CA04. Locked duration.                                        |
| Tue to Thu, 10am to 4pm Pacific                                                                                                     | KEEP                                                                                                       | CA05. Locked days, hours, and time zone.                      |
| A calendar invite by email. The video link comes from me before the call.                                                           | A calendar invite by email. I send the video link before the call.                                         | CA06. Active; keeps the invitation and video-link timing.     |
| Booked.                                                                                                                             | KEEP                                                                                                       | CA07. Clear confirmation.                                     |
| The calendar invite is in your inbox — reminders included. I’ll reply with a video link before the call.                            | The calendar invite is in your inbox, with reminders. I’ll reply with a video link before the call.        | CA08. Removes an em dash; keeps reminders and timing.         |
| Calls run Tuesday through Thursday — pick one of those days.                                                                        | Calls run Tuesday through Thursday. Pick one of those days.                                                | CA09. Shorter sentences; removes an em dash.                  |
| What should we talk about? (optional)                                                                                               | KEEP                                                                                                       | CA10. Plain optional prompt; both participants are meant.     |

Source map, in table order:

- CA01: `app/(room)/call/page.tsx:68`; p.
- CA02: `app/(room)/call/page.tsx:72`; p.
- CA03: `app/(room)/call/page.tsx:43`; term: Cost.
- CA04: `app/(room)/call/page.tsx:44`; term: Length.
- CA05: `app/(room)/call/page.tsx:45`; term: When.
- CA06: `app/(room)/call/page.tsx:47`; term: After.
- CA07: `components/color-worlds/BookCallForm.tsx:74`; p.
- CA08: `components/color-worlds/BookCallForm.tsx:75`; p.
- CA09: `components/color-worlds/BookCallForm.tsx:122`; p.
- CA10: `components/color-worlds/BookCallForm.tsx:128`; optional intake prompt.

Counts: 10 rows / 5 proposed / 5 KEEP. Average sentence length: 7.07 before / 5.88 after. Method and denominators are in `PASS-103-SUMMARY.md`.
