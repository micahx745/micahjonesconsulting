# Task (Sol): scripts/gemini-exec.ps1, the Gemini sibling of deepseek-exec.ps1

Written 2026-09-21 by the main session. You are Sol. Workspace: this repo worktree
(`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`). Create ONE new file,
`scripts/gemini-exec.ps1`. Touch nothing else. You cannot commit here; leave it uncommitted. Never push.
The whole file must be ASCII only (no em-dashes, no curly quotes): LESSONS #46.

WHY: the operator wants Gemini used routinely for reading, drafting, summarising and second opinions, to cut
Claude usage. Today Gemini is reachable only as a cross-review juror (`scripts/cross-review/run_cross_review.py`,
its `_gemini_key()` and GEMINI_ENDPOINT show the key lookup and REST shape).

Read `scripts/deepseek-exec.ps1` in full first and mirror it: same parameters (`-Smoke`, `-Models`, `-PromptFile`,
`-Out`, `-Model`, `-System`, `-MaxTokens`, `-TimeoutSec`), same behaviour, same honesty. Port EVERY fix it carries:
the ConvertTo-Json/Get-Content blow-up, reading the reply as UTF-8 not Latin-1, UTF-8 without BOM on `-Out`, the
absolute `-Out` path fix, and the empty-answer-on-budget report. Differences for Gemini:
- Key: env `GEMINI_API_KEY`, else `~/.claude/.gemini-key`, else `.claude/.gemini-key`. Never printed, never on a
  command line, never in a URL. Send it in the `x-goog-api-key` HEADER, not as `?key=`.
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/<model>:generateContent`. Request body:
  `contents` with one user part holding the prompt file's text; `systemInstruction` when `-System` is given;
  `generationConfig.maxOutputTokens` from `-MaxTokens`. Reply text = concatenation of
  `candidates[0].content.parts[].text`. Report `finishReason` and `usageMetadata` token counts like the DeepSeek
  script reports finish and tokens.
- `-Models`: GET `https://generativelanguage.googleapis.com/v1beta/models` with the header; print each model name
  that supports `generateContent`. Model names come from this listing, never from memory.
- Default model: leave `$Model` defaulting to `gemini-2.5-flash` (the id the cross-review leg already uses), but
  the header comment must say the default is to be confirmed with `-Models`.
- Budget: Gemini 2.5 models can spend output tokens on thinking. If the reply has no text and finishReason is
  MAX_TOKENS, say it is a budget problem and to re-run with a larger `-MaxTokens`, exactly as the DeepSeek script does.
- Header STATUS comment: "UNSMOKED. Written by Sol 2026-09-21. Its output is not evidence until the main session
  runs -Models and -Smoke and records the dated result here."

Validate WITHOUT calling the API: run PowerShell's parser on the file
(`[System.Management.Automation.Language.Parser]::ParseFile(...)` with zero errors) and confirm the file is pure ASCII.
Report both results, and the file's line count. Do not run -Smoke or -Models yourself.
