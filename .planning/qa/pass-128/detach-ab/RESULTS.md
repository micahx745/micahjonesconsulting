# Pass-128a detach A/B results

| Arm | Round | framesOver33ms | intervalMsP95 | UpdateLayoutTree ms | Paint ms | FunctionCall ms | webglRenderer | detach ok |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| A | 1 | 46 | 33.38 | 576.24 | 368.36 | 450.07 | ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| D | 1 | 46 | 33.4 | 608.24 | 242.6 | 459.52 | ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| G | 1 | 43 | 33.4 | 594.26 | 319.9 | 468.09 | ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| DG | 1 | 45 | 33.4 | 609.75 | 205.29 | 461.94 | ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| Agpu | 1 | 42 | 33.4 | 554.74 | 318.63 | 444.88 | ANGLE (NVIDIA, NVIDIA GeForce RTX 4080 (0x00002704) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| Ggpu | 1 | 45 | 33.4 | 496.94 | 304.5 | 396.88 | ANGLE (NVIDIA, NVIDIA GeForce RTX 4080 (0x00002704) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| D | 2 | 45 | 33.4 | 555.85 | 191.6 | 417.53 | ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| G | 2 | 45 | 33.4 | 522.73 | 265.03 | 388.54 | ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| DG | 2 | 39 | 33.4 | 518.13 | 173.45 | 384.24 | ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| Agpu | 2 | 45 | 33.3 | 478.73 | 296.36 | 396.07 | ANGLE (NVIDIA, NVIDIA GeForce RTX 4080 (0x00002704) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| Ggpu | 2 | 43 | 33.4 | 546.92 | 322.87 | 417.6 | ANGLE (NVIDIA, NVIDIA GeForce RTX 4080 (0x00002704) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| A | 2 | 43 | 33.4 | 627.03 | 314.11 | 462.38 | ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| G | 3 | 45 | 33.3 | 492.27 | 282.94 | 387.33 | ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| DG | 3 | 40 | 33.3 | 485.7 | 202.52 | 387.06 | ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| Agpu | 3 | 45 | 33.4 | 486.76 | 309.26 | 391.91 | ANGLE (NVIDIA, NVIDIA GeForce RTX 4080 (0x00002704) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| Ggpu | 3 | 45 | 33.4 | 484.4 | 293.48 | 396.56 | ANGLE (NVIDIA, NVIDIA GeForce RTX 4080 (0x00002704) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| A | 3 | 45 | 33.4 | 551.42 | 314.88 | 420.88 | ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |
| D | 3 | 46 | 33.4 | 435.09 | 198.44 | 356.28 | ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11) | yes |

## Arm medians

- A: framesOver33ms 45; UpdateLayoutTree 576.24 ms.
- D: framesOver33ms 46; UpdateLayoutTree 555.85 ms.
- G: framesOver33ms 45; UpdateLayoutTree 522.73 ms.
- DG: framesOver33ms 40; UpdateLayoutTree 518.13 ms.
- Agpu: framesOver33ms 45; UpdateLayoutTree 486.76 ms.
- Ggpu: framesOver33ms 45; UpdateLayoutTree 496.94 ms.

## Verification

1. PASS - `node --check .planning/qa/pass-128/scroll-probe.mjs` exited 0 with no output.
2. PASS - A, D, G, DG, Agpu, and Ggpu each have 3 JSONL lines; total 18 lines. There are 18 trace files and 18 log files.
3. PASS - 18/18 lines have `consoleErrors: []`, `worldSwitchCount: 2`, `gestureCount` 1..2, `frames` 267..305, non-null trace summaries, and `UpdateLayoutTree` present.
4. PASS - all 6 D/DG lines have `charsBefore: 59`, roots `cw-offer-title,cw-howiwork-title,cw-ordani-title,cw-build-title`, `charsAfter: 0`, `charsAfterGesture: 0`, and the `cw-offer-title` sample opacity `0` before and `1` after. All 12 A/G/Agpu/Ggpu lines have `detach: null`.
5. FAIL - A `framesOver33ms` values are 46, 43, 45 (median 45), but A `intervalMsP95` values are 33.38, 33.4, 33.4 rather than every value being exactly 33.4. The environment drifted; no arm differences are interpreted here.
6. FAIL - A/D/G/DG report `ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11)`, not a string naming SwiftShader or `no-webgl`. Agpu/Ggpu report `ANGLE (NVIDIA, NVIDIA GeForce RTX 4080 (0x00002704) Direct3D11 vs_5_0 ps_5_0, D3D11)`, so the GPU arms name a hardware adapter and are not marked INVALID.
7. FAIL - full `git status --short` has 699 entries, including pre-existing unrelated changes, rather than only the two expected entries. Pass-scoped status is exactly ` M .planning/qa/pass-128/scroll-probe.mjs` and `?? .planning/qa/pass-128/detach-ab/`; trace `*.runN.json` files are ignored within that directory.
