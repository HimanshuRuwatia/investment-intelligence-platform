# Agentic Development Prerequisite

Read this before starting any implementation or review task.

## Non-negotiables

- Deterministic systems produce financial truth.
- LLMs explain deterministic outputs; they do not invent financial calculations.
- Architecture changes require explicit approval and documentation updates.
- The IIP repository is the source of truth.
- Ask before destructive or irreversible actions.

## Scope

Work only inside `/Users/himanshu/Projects/investment-engine` and its Git worktree unless explicitly approved otherwise.

- Do not read personal files, credentials, unrelated projects, or home-directory data.
- Do not modify files outside the repository.
- Report if required context is outside the project; do not silently widen scope.

## Git Flow

Branch convention:

```text
feature/*
```

Agent may:

1. Inspect status, diff, log, remotes, and PR metadata.
2. Create or switch to `feature/*` branches when requested.
3. Propose changes.
4. Run approved local checks.
5. Prepare commits and PR details.

Agent must ask the user before:

- `git add`
- `git commit`
- `git push`
- `git checkout -b` / switching branches
- `git pull`, merge, rebase, reset, stash
- PR creation
- PR merge
- Deleting branches or tags
- Required GitHub configuration changes
- Installing packages or changing dependencies

Even with user approval, merging to `main` requires:

- User approval after reviewing the PR
- Local checks passed and reported honestly
- Independent review completed
- No unresolved high/critical findings

## Specialist Agents

The project defines these agents under `.opencode/agents/`:

- `planner` — scoped plan and acceptance criteria
- `implementer` — smallest safe implementation diff
- `test-runner` — runs relevant local checks only
- `code-reviewer` — independent correctness and maintainability review
- `security-reviewer` — security review for sensitive changes
- `audit-reviewer` — audits the log against the plan and diff
- `orchestrator` — primary session coordinator; does not edit files directly

`orchestrator` may delegate only to these six specialists. It does not implement, merge, commit, push, or bypass gates.

## Audit Gate

Each specialist appends a structured event to `.agent-logs/<branch>.jsonl` after its task. Logs record visible decisions, commands, files, checks, and unresolved risks—not hidden model reasoning.

Before asking the user to approve commit, push, PR creation, or merge, run:

```bash
node scripts/agent-audit-gate.mjs
```

The gate requires, with no command-line overrides:

- The latest matching event for `planner`, `implementer`, `test-runner`, `code-reviewer`, and `security-reviewer` is `pass`
- No outside-repository paths referenced by those events
- Implementer audit files cover every changed file
- Correct planner → implementer → test-runner → code-reviewer → security-reviewer ordering
- Passing security review whenever high-risk paths or high-risk events are present

Audit logs are local, ignored, and not portable to fresh clones. The gate proves only that the local audit trail is complete and internally consistent; it cannot prove tests actually ran or code is correct. It is advisory and must not be used to bypass review. The user remains the final approval authority.

## Merge Gate

`main` is protected by process, not by the agent:

```text
Plan
→ feature/*
→ implementation
→ tests/lint/build
→ independent review
→ security review for risky changes
→ user approval
→ merge through PR
```

Never push directly to `main`.
Never merge a PR merely because the reviewing agent approves.

## GitHub Access

Use GitHub CLI (`gh`).

Allowed for read operations:

```bash
gh repo view
gh pr list
gh pr view
gh pr status
gh pr diff
gh auth status
```

Write operations such as PR creation or merge require explicit user approval and should be run only after local checks and review gates pass.

## Review Workflow

For each PR:

1. Create `feature/*`
2. Implement smallest correct change
3. Run relevant local tests
4. Show diff and test output
5. Independent `code-reviewer` reviews
6. `security-reviewer` reviews when applicable
7. `audit-reviewer` checks `.agent-logs/<branch>.jsonl` and the diff
8. Fix findings
9. Ask user for merge approval
10. Merge only after approval

## Autonomy Rules

The agent may proceed autonomously through non-destructive inspection and local checks.

The agent may not silently:

- expand scope
- modify architecture
- change database/contracts
- weaken tests or guards
- skip review
- commit, push, or merge
- expose secrets

If uncertain, stop and ask the smallest necessary question.
