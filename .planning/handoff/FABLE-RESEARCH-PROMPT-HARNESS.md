# Research brief: cut my Claude usage this week by moving work to my other AI models, without losing frontier-level planning, orchestration and output

You are doing deep research for me (Micah Jones, a solo consultant who builds software). You cannot see my files or my
computer: everything you need about my setup is below. Use web research for current facts (docs, prices, limits and
features as of September 2026) and cite your sources. Where you rely on an assumption instead of a source, label it.

## 1. My situation right now (my words, 2026-09-22)
"Claude usage is at 70% for the week and fable is at 73. chatgpt has only 8% left for 4 days and 7 hours. GLM is
completely reset, deepseek has $11.94 left in credits from the $20 I had added and we spent around 12 mil tokens within
this project and two other projects. Without claude reset on Saturday at 1am - we have to tread lightly."
- Claude, Max plan: weekly all-models 71%, weekly Fable 73% (live reading); both reset Saturday 2026-09-26 01:00 PDT.
  There is also a rolling 5-hour limit.
- ChatGPT Pro (Codex): 8% left, resets in about 4 days 7 hours.
- GLM 5.3 (z.ai Coding Plan): just reset; it has 5-hour and weekly limits.
- DeepSeek (pay-as-you-go API): $11.94 left.
- Gemini (API, free tier, daily quotas per model).
I want top frontier-model quality for planning, orchestration and final output. Grunt work can go to cheaper models.

## 2. How my harness works today
I work in Claude Code (desktop app, Code tab) on Windows 11, in git worktrees, one per arc of work. Projects: my
consulting site (Next.js 16), a SaaS app for birth workers (Ordani), and a landing-page exemplar project.

The models and how each is reached:
- Claude: Fable 5.1 (top tier), Opus 5, Sonnet 5, all with a 1M-token context window. The main chat runs on Opus 5.
  Fable is called as a subagent only at "gates" (design direction, judging mocks or previews, reading briefs), one call
  per gate with a written input file. Sonnet subagents only when a leg needs this session's tools or browser.
- ChatGPT through the Codex CLI (`codex exec`, non-interactive) via a PowerShell wrapper: gpt-6-astra is the juror
  (read-only reviews, images attached); gpt-5.6-sol is the executor (workspace-write sandbox; runs written briefs:
  builds, measuring scripts, screenshots).
- DeepSeek through a REST wrapper (no tools, no file access; text is pasted in): deepseek-flash for volume reading and
  drafting, deepseek-v4-pro for a judged second opinion. Both are reasoning models: too small a max_tokens returns an
  empty answer.
- Gemini through a REST wrapper (gemini-2.5-flash and others): fallback reader. It is multimodal, but I have barely
  used it for visuals.
- GLM 5.3 through a wrapper that launches a second Claude Code process pointed at z.ai, so it HAS tools: it can read
  files, run scripts and edit. Lately treated as overflow.

My routing rules (a repo file, AI_ROUTING.md, printed into every session by a SessionStart hook):
1. Reading, summarising, sweeps: DeepSeek (Gemini as fallback), never a Claude subagent.
2. Drafting copy: two model families in parallel (deepseek-v4-pro and Sol).
3. Builds, captures, measuring, fix rounds: Sol; GLM when up; Sonnet only if a leg needs Chrome or this session's
   context; never Opus or Fable.
4. The main Claude session keeps briefs, rulings, the verified-facts ledger check, ship decisions, commits, and any
   copy with non-ASCII characters (an executor's Windows shell once turned a curly apostrophe into "?").
5. Quality confirmation at every design or copy checkpoint: three independent reads, Fable (one call), Astra and
   deepseek-v4-pro. When they split, I get each model's pick by name plus the main session's tie-break.
6. Check usage before any Claude fan-out. At 75% weekly, Claude narrows to the ledger, ship calls and the taste gate;
   at 90%, only production containment.
7. Every commit and checkpoint carries a "LEGS" stamp listing which models ran.

Process scaffolding:
- Arc shape: the top model rules and writes a brief (exact strings, layout spec, verification commands with expected
  output, a rejected list) and commits it; an executor runs it verbatim; the top model judges at named checkpoints.
  Budget: at most 15 top-tier tool calls per arc.
- Session memory: RESUME.md (at most 2.5 KB, rewritten after every task); a numbered LESSONS file (52 entries) that
  includes a ledger of verified facts; "kickoff" handoff files so a new chat can start cold.
- Hooks: a SessionStart hook prints the routing table; a PreToolUse hook blocks writes into the wrong checkout. Build
  gates (copy lint, banned words and others) run before any push.
- Fixed context on every turn, before any conversation, from the app's usage panel: system tools ~30.6K tokens, MCP
  tool definitions ~16.4K, the skills list ~9.8K (many plugins are installed), instruction and memory files ~9.6K
  (global and project CLAUDE.md files, a long design constitution; when a chat starts in the main checkout and moves
  into a worktree, the project files load twice), system prompt ~4.1K. About 70K tokens per turn in total.
- Decisions reach me through popups: at most 2 questions at a time, recommended option first.
- Standing rules: routing changes live in the repo, never in the global ~/.claude config (my words: "i dont want you
  messing with global things"). Privacy: nothing with client data, personal data or keys goes to a third-party API
  (DeepSeek is outside the US).

## 3. What I have measured (one long chat on 2026-09-21/22: a site performance fix)
- One Fable "juror" subagent call that looked at 6 screenshots cost 134,828 tokens (7 tool calls, about 4 minutes).
- The Opus main session opened 23 images itself (2 contact sheets, 20 screenshots, 1 photo) to check visuals. Its
  context grew to about 456K tokens by the end. Weekly all-models went from 68% to 71% during that chat, with a second
  chat running in parallel.
- Sol's single brief run cost 187,218 ChatGPT tokens.
- Three briefs in a row carried wrong expected values, so the top model redid the pre-flight checks itself.
- Friction: the Codex sandbox on Windows could not find pnpm or ripgrep and could not launch Chrome for one script;
  only one Codex task can run at a time (a Windows sandbox account lockout, error 1909); Gemini quotas are per model;
  GLM hits weekly limits; long chats pile up huge context.

## 4. What I want from you
Research deeply, then give me a plan that keeps frontier quality where it matters and moves everything else off Claude:
for the next 4 days, and as a durable setup after Saturday. Answer these:

A. How Claude usage is actually counted on a Max plan in Claude Code: context re-sent every turn, prompt caching and
   how cached tokens count toward the limits, subagent contexts, what images cost and how resolution drives it,
   compaction, MCP tool definitions and skills. Which of my habits are the expensive ones? Rank them with token math.
B. The best role for each of my five model families given current capabilities, prices and limits. Especially: GLM as
   a tool-using executor through Claude Code (and z.ai's usage policy); Gemini for visual QA (can it reliably judge
   screenshots and contact sheets against a written checklist?); DeepSeek's context caching and cost control; and how
   to spend ChatGPT's last 8%.
C. Orchestration patterns that keep a frontier model on planning and final judgment while cheaper models do the
   reading, drafting, execution and first-pass review (cascades, route-then-verify, small-model extraction with
   frontier adjudication, structured digests instead of raw reads). What does the evidence say about quality loss, and
   how do I guard against it (deterministic checks, independent reviewers, spot audits)?
D. Concrete harness changes, ranked by Claude tokens saved against quality risk. For each: what to change (a hook, a
   wrapper script, a prompt template, rule text, a workflow step), exactly how it works, which model or script does the
   work, the automatic check that proves it works, and the estimated saving. Cover at least: moving visual QA off
   Claude; shrinking what a Claude juror sees (for example one downscaled montage, text-first evidence); session-length
   and handoff rules; cutting the ~70K fixed tokens per turn (unused MCP servers, plugins and skills; duplicated
   instruction files); budget meters and hard caps per vendor; delegating brief pre-flight to an executor; a hook that
   warns before the main session opens many images.
E. A day-by-day routing plan from now until Saturday 01:00 PDT under the budgets above: what the main Claude session
   should and should not do each day, and what to defer until after the reset.
F. What to measure first: a spec for a small LOCAL script that tallies my Claude Code session transcripts (JSONL) by
   activity (image reads, file reads, tool output, subagents, verification loops) so I can confirm your estimates. No
   transcript text may go to a third party.
G. What NOT to do: changes that would quietly lower quality or break my privacy rule.

## 5. Output format
- Open with one paragraph: the 3 changes that save the most Claude usage this week without hurting quality.
- Then sections A to G.
- A ranked table: change | Claude tokens saved (estimate and reasoning) | quality risk | the check that proves it |
  who executes | effort | this week or after the reset.
- "Decisions for Micah": at most 4 questions, each with 2 to 4 options, the recommended option first, one line on the
  trade-off.
- "Hand-off to Claude Code": a short numbered list my Opus session can turn into a brief for GLM to implement
  (repo-level changes only; anything global goes in the decisions list instead).
- Cite sources inline. Mark every estimate and assumption as such. Prefer primary docs (Anthropic, OpenAI, Google,
  DeepSeek, z.ai).
