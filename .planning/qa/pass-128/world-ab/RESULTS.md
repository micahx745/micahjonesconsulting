# Pass-128b results

## Runs

| Arm | Round | framesOver33ms | intervalMsP95 | droppedFrames | drawFrames | transitionEvents | UpdateLayoutTree ms | FunctionCall ms | EventDispatch ms | worldSwitchCount | Flag checks ok |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| A | 1 | 45 | 33.4 | 76 | 207 | 895 | 504.64 | 405.64 | 345.72 | 2 | yes |
| W | 1 | 2 | 16.76 | 43 | 170 | 23 | 36.88 | 136.28 | 77.1 | 0 | yes |
| DW | 1 | 2 | 16.7 | 35 | 145 | 27 | 21.76 | 120.5 | 70.22 | 0 | yes |
| X | 1 | 45 | 33.4 | 74 | 207 | 925 | 452.49 | 372.73 | 316.7 | 2 | yes |
| P | 1 | 45 | 33.4 | 76 | 204 | 853 | 486.83 | 388.41 | 319.01 | 2 | yes |
| ALL | 1 | 2 | 16.8 | 35 | 143 | 31 | 22.05 | 118.95 | 69.44 | 0 | yes |
| W | 2 | 2 | 16.7 | 43 | 170 | 29 | 41.53 | 135.66 | 73.12 | 0 | yes |
| DW | 2 | 2 | 16.7 | 36 | 136 | 27 | 22.41 | 121.34 | 71.1 | 0 | yes |
| X | 2 | 46 | 33.4 | 76 | 205 | 866 | 493.43 | 388.72 | 329.22 | 2 | yes |
| P | 2 | 46 | 33.4 | 75 | 206 | 923 | 512.88 | 409.2 | 346.81 | 2 | yes |
| ALL | 2 | 2 | 16.77 | 35 | 145 | 21 | 23.65 | 130.5 | 78.54 | 0 | yes |
| A | 2 | 40 | 33.4 | 79 | 205 | 789 | 597.85 | 435.64 | 368.69 | 2 | yes |
| DW | 3 | 2 | 16.8 | 35 | 145 | 27 | 23.09 | 117.33 | 66.62 | 0 | yes |
| X | 3 | 44 | 33.32 | 77 | 207 | 821 | 527.88 | 395.3 | 343.02 | 2 | yes |
| P | 3 | 45 | 33.4 | 75 | 199 | 859 | 507.17 | 406.96 | 339.63 | 2 | yes |
| ALL | 3 | 2 | 16.79 | 35 | 144 | 21 | 23.07 | 118.44 | 67.81 | 0 | yes |
| A | 3 | 44 | 33.4 | 79 | 202 | 827 | 486.64 | 399.83 | 335.78 | 2 | yes |
| W | 3 | 2 | 16.7 | 44 | 170 | 27 | 39.32 | 139.71 | 76.15 | 0 | yes |
| T | 1 | 45 | 33.4 | 77 | 208 | 880 | 489.54 | 384.9 | 328.02 | 2 | yes |

## Medians

| Arm | Runs | droppedFrames | framesOver33ms | transitionEvents | UpdateLayoutTree ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| A | 3 | 79 | 44 | 827 | 504.64 |
| W | 3 | 43 | 2 | 27 | 39.32 |
| DW | 3 | 35 | 2 | 27 | 22.41 |
| X | 3 | 76 | 45 | 866 | 493.43 |
| P | 3 | 75 | 45 | 859 | 507.17 |
| ALL | 3 | 35 | 2 | 21 | 23.07 |
| T | 1 | 77 | 45 | 880 | 489.54 |

## T transitionLog

```json
{"starts":300,"cancels":205,"topTargets":[["A.cw-mlink",336],["A.cw-section-cta",84],["P.cw-exits__co",28],["P.cw-exits__val",24],["NAV.cw-nav",8],["DIV.cw-js-reveals",6],["SPAN.cw-rec__line",6],["DIV.cw-door",4],["DIV.cw-offer__box",4],["SPAN.cw-exits__tick",3]],"topProperties":[["color",484],["background-color",11],["opacity",5],["transform",5]]}
```

## Verification

1. PASS - `node --check .planning/qa/pass-128/scroll-probe.mjs`: exit 0; output bytes 0.
2. PASS - line counts: A=3, W=3, DW=3, X=3, P=3, ALL=3, T=1.
3. PASS - 19/19 lines: `consoleErrors=[]`; gestureCount range 1..2; frames range 247..312; `UpdateLayoutTree` present 19/19; integer `droppedFrames`, `drawFrames`, and `transitionEvents` 19/19.
4. PASS - A/X/P/T world values 10/10: switch count 2 and `["#9E3C25","#ECE3D0","#9E3C25"]`; W/DW/ALL world values 9/9: switch count 0 and `["#9E3C25"]`; W/DW/ALL `worldDoors` 9/9: `{"found":true,"before":"bone","after":"terracotta"}`.
5. PASS - X/ALL `pinExits.found` 6/6 true, top 4597.21875; P/ALL `passiveForced` values 4,4,4,4,4,4; DW/ALL detach checks 6/6 with charsBefore 59, roots `cw-offer-title,cw-howiwork-title,cw-ordani-title,cw-build-title`, charsAfter 0, charsAfterGesture 0, and `cw-offer-title` opacity 0 then 1.
6. PASS - A median `framesOver33ms` 44 (required 40..50); A median `droppedFrames` 79 (required 65..85).
7. PASS - `webglRenderer` 19/19: `ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11)`.
8. FAIL - literal global `git status --short`: 699 entries (1 tracked, 698 untracked), not only the two expected pass paths. Scoped status for `.planning/qa/pass-128/`: `M .planning/qa/pass-128/scroll-probe.mjs` and `?? .planning/qa/pass-128/world-ab/`. `git diff --name-only`: `.planning/qa/pass-128/scroll-probe.mjs` only.

Run attempts: 19/19 completed on attempt 1; reruns 0.
