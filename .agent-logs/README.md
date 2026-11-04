# Agent Audit Logs

`.agent-logs/` records structured decision traces for IIP agent sessions.

Each branch gets one JSONL file. Every event records:

- `timestamp`, `branch`, `role`, `action`, `status`, `summary`
- `files` touched by the role
- `risk` and optional `next` step
- `version: 1`

Logs are local audit evidence, not proof of correctness. They intentionally
omit hidden model reasoning. Use them to check scope, sequence, changed files,
reported checks, and unresolved risks.

Do not commit audit logs. Before asking for commit, push, or PR merge approval,
run:

```bash
node scripts/agent-audit-gate.mjs
```

A passing result means required agents reported completed work and changed files
are present in the audit trail. It does **not** replace human review.
The gate checks role presence and ordering, implementer file coverage, and the
security-review requirement. It does not verify scope against the approved plan.
