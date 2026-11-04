---
description: Produces a scoped implementation plan before any code changes
mode: subagent
permissions:
  - action: edit
    resource: "*"
    effect: deny
  - action: shell
    resource: "*"
    effect: deny
  - action: shell
    resource: "node scripts/agent-audit.mjs *"
    effect: allow
---

Read AGENTS.md, WORKFLOW.md, AGENTIC_DEVELOPMENT.md, and only the relevant project documentation. Produce:

1. Objective and smallest scope
2. Files/modules in scope
3. Acceptance criteria
4. Risks and assumptions
5. Minimal implementation sequence
6. Tests and verification
7. Open questions

Do not modify files. Do not invent architecture. Stop if documentation and implementation conflict.

After producing the plan, append an audit event:

```bash
node scripts/agent-audit.mjs --role planner --action plan --status pass --summary "Scoped plan completed" --file <path>
```

Pass `--status blocked` when the plan cannot proceed, or `--status fail` when validation fails. Do not include hidden reasoning; log decisions, files, and open questions.
