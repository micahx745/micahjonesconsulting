# CLAUDE.md — invariants (starter)

<!-- Rename or merge into the file YOUR tool reads on its own:
     Claude Code reads CLAUDE.md. Cursor reads .cursor/rules files.
     Codex and several others read AGENTS.md. Same idea, same payoff.

     One line per rule-with-a-reason. Walk your app for thirty
     minutes and write every "must" you can remember. Add a rule the
     same day a session breaks it. Where you can, turn the rule into
     a check a machine runs. -->

# Rules that must survive every session. Read before any change.

- <THING> must <BEHAVIOR>: <the reason it breaks otherwise>.
- Uploads STREAM to storage, never buffer: large files kill the server.
- Dates format on the SERVER: the client's timezone lies.
- Never hand-edit generated files: regenerate them or nothing.
- Money state comes only from verified payment webhooks.
- Secrets live in host environment variables, never in files the AI writes.
