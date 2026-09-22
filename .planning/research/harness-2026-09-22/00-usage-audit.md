# 00 usage audit (harness research 2026-09-22, GLM leg 1)

Stage 3. eq = list-price weighting (assumption, see JSON). Sessions: the 7 most recent with >=50 unique assistant messages; files modified <15min excluded (4).

## 1. TOP BURN PATTERNS

10 largest (session x tool class) by eq = direct + carry. Share = total / grand direct eq (carry is an attribution of cost already inside later calls' cr, so shares can exceed the direct sum).

| # | session | class | direct eq | carry | total | share |
|---|---|---|---|---|---|---|
| 1 | 56c58c6d | bash | 24,687,912 | 6,710,979 | 31,398,891 | 22.8% |
| 2 | 6eb42c8d | bash | 18,375,054 | 3,476,691 | 21,851,745 | 15.8% |
| 3 | 88c6ab1b | bash | 12,227,932 | 4,172,732 | 16,400,664 | 11.9% |
| 4 | 7c9c4bb5 | bash | 12,612,057 | 3,200,746 | 15,812,803 | 11.5% |
| 5 | d906ccd7 | bash | 10,210,408 | 2,771,195 | 12,981,603 | 9.4% |
| 6 | 56c58c6d | text_read | 2,986,427 | 5,197,089 | 8,183,516 | 5.9% |
| 7 | 6eb42c8d | text_read | 1,465,827 | 3,548,492 | 5,014,319 | 3.6% |
| 8 | f9e4092b | bash | 4,153,559 | 529,587 | 4,683,145 | 3.4% |
| 9 | 874fc801 | bash | 3,558,972 | 615,854 | 4,174,825 | 3.0% |
| 10 | 88c6ab1b | text_read | 1,373,910 | 2,253,487 | 3,627,397 | 2.6% |

## 2. T1 sessions

| id8 | dir | first | last | model | msgs | peak ctx | compact | in | cw | cr | out | eq main | eq sub |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 874fc801 | -main | 2026-09-22T03:15 | 2026-09-22T16:38 | claude-opus-5 | 129 | 515,575 | 0 | 266 | 873,631 | 40,555,356 | 254,788 | 7,077,004 | 235,093 |
| f9e4092b | -main | 2026-09-22T01:27 | 2026-09-22T02:36 | claude-opus-5 | 112 | 540,238 | 0 | 224 | 499,420 | 42,825,306 | 218,648 | 6,374,835 | 0 |
| 7c9c4bb5 | --claude-worktrees-p106-live | 2026-09-21T20:48 | 2026-09-21T23:45 | claude-opus-5 | 380 | 789,896 | 0 | 842 | 1,382,917 | 168,371,528 | 363,641 | 21,422,034 | 1,432,316 |
| 88c6ab1b | -main | 2026-09-21T17:20 | 2026-09-21T20:48 | claude-opus-5 | 345 | 810,365 | 0 | 754 | 757,871 | 176,278,319 | 336,732 | 20,827,988 | 990,126 |
| 6eb42c8d | -main | 2026-09-21T00:59 | 2026-09-21T17:20 | claude-opus-5 | 303 | 889,043 | 0 | 622 | 1,865,674 | 149,199,642 | 400,305 | 20,653,459 | 6,963,802 |
| d906ccd7 | -main | 2026-09-20T17:27 | 2026-09-21T02:08 | claude-opus-5 | 247 | 538,751 | 0 | 494 | 1,249,333 | 80,933,398 | 241,074 | 11,797,870 | 1,806,518 |
| 56c58c6d | -main | 2026-09-19T15:20 | 2026-09-20T04:31 | claude-opus-5 | 376 | 871,284 | 0 | 754 | 1,276,865 | 203,930,403 | 415,990 | 25,027,474 | 13,298,220 |

## 3. T3 by tool class (main sessions)

| class | calls | direct eq | carry | share (direct) | share (+carry) |
|---|---|---|---|---|---|
| bash | 1257.8 | 71,725,573 | 18,347,115 | 52.0% | 65.3% |
| text_read | 65.7 | 3,484,671 | 8,806,398 | 2.5% | 8.9% |
| reply | 136.0 | 8,285,041 | 1,708,459 | 6.0% | 7.2% |
| image_read | 50.0 | 2,909,099 | 2,837,111 | 2.1% | 4.2% |
| write_edit:planning | 58.0 | 5,227,678 | 231,298 | 3.8% | 4.0% |
| popup | 54.5 | 4,526,237 | 190,529 | 3.3% | 3.4% |
| write_edit:handoff | 61.5 | 4,098,085 | 102,856 | 3.0% | 3.0% |
| browser_other | 43.3 | 2,502,325 | 449,981 | 1.8% | 2.1% |
| agent | 30.5 | 2,119,700 | 245,578 | 1.5% | 1.7% |
| usage | 17.3 | 1,916,299 | 324,162 | 1.4% | 1.6% |
| write_edit:site | 26.8 | 1,525,166 | 211,355 | 1.1% | 1.3% |
| other_tool | 24.5 | 1,583,808 | 39,472 | 1.1% | 1.2% |
| search | 12.5 | 573,660 | 662,652 | 0.4% | 0.9% |
| skill | 2.5 | 138,329 | 950,827 | 0.1% | 0.8% |
| write_edit:harness | 17.5 | 914,939 | 47,849 | 0.7% | 0.7% |
| write_edit:lessons | 13.5 | 749,566 | 137,363 | 0.5% | 0.6% |
| other_mcp | 13.0 | 437,957 | 374,586 | 0.3% | 0.6% |
| workflow | 4.0 | 264,675 | 53,420 | 0.2% | 0.2% |
| write_edit:other | 3.0 | 197,854 | 12,233 | 0.1% | 0.2% |

## 4. T4 images per session

| session | image blocks | est tokens (28px tiles, cap 4784) | carry of image-bearing results |
|---|---|---|---|
| 874fc801 | 29 | 35,588 | 151,423 |
| f9e4092b | 2 | 7,190 | 41,877 |
| 7c9c4bb5 | 36 | 85,402 | 474,028 |
| 88c6ab1b | 49 | 92,358 | 977,663 |
| 6eb42c8d | 38 | 83,688 | 1,024,879 |
| d906ccd7 | 4 | 3,263 | 50,515 |
| 56c58c6d | 43 | 84,263 | 253,490 |

## 5. T5 subagents

35 subagent runs; 29 not matched to a parent Agent call by timestamp window. All requested/actual mismatches, then the 12 largest by eq. (requested = Agent input.model; actual = models in the subagent transcript.)

MISMATCHES: 0

| parent | type | requested | actual | msgs | tools | imgs | sum ctx | last ctx | eq |
|---|---|---|---|---|---|---|---|---|---|
| 6eb42c8d | general-purpose | unset | claude-sonnet-5 | 126 | 151 | 4 | 30,215,982 | 324,558 | 3,439,974 |
| 6eb42c8d | general-purpose | unset | claude-sonnet-5 | 118 | 117 | 3 | 22,495,201 | 266,897 | 2,596,337 |
| 56c58c6d | general-purpose | unset | claude-sonnet-5 | 62 | 80 | 0 | 16,154,807 | 351,875 | 1,986,258 |
| 56c58c6d | general-purpose | unset | claude-sonnet-5 | 62 | 77 | 0 | 14,817,225 | 293,753 | 1,786,449 |
| 56c58c6d | general-purpose | unset | claude-sonnet-5 | 52 | 60 | 0 | 12,860,300 | 333,639 | 1,673,226 |
| 56c58c6d | general-purpose | unset | claude-sonnet-5 | 48 | 54 | 0 | 10,214,975 | 295,509 | 1,371,697 |
| 56c58c6d | general-purpose | unset | claude-fable-5-1 | 11 | 79 | 18 | 3,014,901 | 406,440 | 1,269,088 |
| 56c58c6d | general-purpose | unset | claude-sonnet-5 | 50 | 50 | 0 | 8,803,782 | 246,614 | 1,170,307 |
| 56c58c6d | general-purpose | unset | claude-sonnet-5 | 36 | 47 | 0 | 7,973,828 | 293,114 | 1,091,288 |
| d906ccd7 | general-purpose | unset | claude-sonnet-5 | 53 | 50 | 0 | 5,614,171 | 119,798 | 872,278 |
| 56c58c6d | general-purpose | unset | claude-sonnet-5 | 35 | 42 | 0 | 6,292,999 | 229,751 | 852,381 |
| d906ccd7 | general-purpose | unset | claude-sonnet-5 | 36 | 37 | 0 | 5,587,914 | 200,139 | 800,623 |

## 6. T6 fixed prefix

| session | first assistant ctx | median of first three |
|---|---|---|
| 874fc801 | 93,930 | 117,256 |
| f9e4092b | 92,984 | 116,326 |
| 7c9c4bb5 | 95,596 | 110,070 |
| 88c6ab1b | 99,258 | 123,226 |
| 6eb42c8d | 100,041 | 109,429 |
| d906ccd7 | 100,113 | 108,735 |
| 56c58c6d | 93,155 | 121,820 |

median across sessions of the first-three median: 116,326

## 7. T7 long context

- ctx > 200K: 2098 calls, eq 119,284,679 (86.5% of grand eq)
- ctx > 400K: 1089 calls, eq 80,393,104 (58.3% of grand eq)

## 8. T8 instruction files

Calibration: global + worktree stack + MEMORY.md = 29,277 bytes = 9,660 tokens (the app's Memory-files reading) -> 0.329952 tokens/byte.
Stack bytes: global 7,911 · worktree 19,481 · main checkout 19,423 · memory 1,885.
Main-checkout stack estimate: 6,409 tokens (vs worktree stack 6,428).
Double-load sessions (cwd moved main -> worktree mid-session):
- 874fc801 at 2026-09-22T03:16: 126 calls after the move x main-stack 6,409 tokens x R=0.100 = 80,753 extra eq
- f9e4092b at 2026-09-22T01:28: 110 calls after the move x main-stack 6,409 tokens x R=0.100 = 70,499 extra eq
- 88c6ab1b at 2026-09-21T17:20: 344 calls after the move x main-stack 6,409 tokens x R=0.100 = 220,470 extra eq
- 6eb42c8d at 2026-09-21T00:59: 301 calls after the move x main-stack 6,409 tokens x R=0.100 = 192,911 extra eq
- d906ccd7 at 2026-09-20T17:27: 245 calls after the move x main-stack 6,409 tokens x R=0.100 = 157,020 extra eq
- 56c58c6d at 2026-09-19T15:20: 375 calls after the move x main-stack 6,409 tokens x R=0.100 = 240,338 extra eq

## 9. Loops (verify/exec)

- 138 loops of >=5 consecutive exec/verify-only messages; eq 59,315,944 (43.0% of grand eq); lengths (desc): 41,38,34,32,29,28,24,22,22,20,20,19,18,18,18,17,17,16,16,16,15,15,14,14,14

## 10. Checks (T10)

- session-vs-model totals reconcile: YES
- grand: in=8,118 cw=15,054,867 cr=1,024,385,856 out=2,306,541 eq=137,906,738
- cache_creation 5m/1h split absent on 0 messages (all cw weighted 1.25)
- carry deltas clamped at 0: 1 negative deltas counted
- anchor first-call ctx 70-80K: first-ctx values 874fc801 93,930, f9e4092b 92,984, 7c9c4bb5 95,596, 88c6ab1b 99,258, 6eb42c8d 100,041, d906ccd7 100,113, 56c58c6d 93,155
- anchor about 23 images opened (Pass-128c): per-session counts 874fc801 29, f9e4092b 2, 7c9c4bb5 36, 88c6ab1b 49, 6eb42c8d 38, d906ccd7 4, 56c58c6d 43
- anchor peak about 456K (Pass-128c): best image-count match 874fc801 peak ctx 515,575 vs anchor 456,000 (13% over)
- anchor fable juror 134,828 tokens / 7 tool uses: parent 874fc801 type general-purpose actual claude-fable-5-1 sum_ctx 292,315 last_ctx 118,257 tools 7 -> matches neither
- anchor fable juror 134,828 tokens / 7 tool uses: parent 6eb42c8d type general-purpose actual claude-fable-5-1 sum_ctx 1,228,421 last_ctx 135,370 tools 14 -> matches last-ctx
- anchor fable juror 134,828 tokens / 7 tool uses: parent 88c6ab1b type general-purpose actual claude-fable-5-1 sum_ctx 422,950 last_ctx 130,131 tools 8 -> matches last-ctx
- anchor fable juror 134,828 tokens / 7 tool uses: parent 88c6ab1b type general-purpose actual claude-fable-5-1 sum_ctx 285,085 last_ctx 111,353 tools 7 -> matches neither
- (15 more fable subagent rows in the JSON, none with 7 tool uses or a 134,828 match)
- subagent runs: 35 total, 29 unmatched to a parent Agent call
- assistant lines vs unique messages (main, per session): 874fc801 346/129; f9e4092b 335/112; 7c9c4bb5 948/380; 88c6ab1b 814/345; 6eb42c8d 745/303; d906ccd7 477/247; 56c58c6d 840/376
- json parse errors: 0

