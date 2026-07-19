# NEXT_SESSION.md

> This file is maintained automatically by the AI assistant.
>
> It is **not** a static template.
>
> At the end of every implementation session, this file MUST be rewritten to reflect the current repository state.
>
> A completely new AI assistant should be able to copy the prompt below and immediately continue development.

---

# AI Instructions

Before ending every implementation session:

1. Review the repository.
2. Review CURRENT_STATUS.md.
3. Review SESSION_HANDOFF.md (if present).
4. Determine the exact current implementation state.
5. Rewrite this entire file.
6. Ensure the prompt below reflects the current state of development.

This file should always describe the **current** repository.

Never leave stale information.

---

# Current Repository State

## Current Milestone

M1 – Platform Foundation

---

## Current Iteration

M1.2 – Platform Core

---

## Current Task

Implement the minimum Platform Core: initialization, configuration loader, logging, Plugin Manager, dependency container, and application lifecycle.

---

## Completed During Previous Session

M1.1 – Project Bootstrap:

- pnpm + TypeScript ESM project
- Vitest / ESLint / Prettier
- Minimal CLI (`src/bootstrap`, `src/cli`)
- Smoke tests
- README Getting Started

Checkpoint: `progress/checkpoints/M1.1_PROJECT_BOOTSTRAP.md`

---

## Remaining Work

From `docs/33_IMPLEMENTATION_PLAN.md` Iteration 2 — Platform Core:

- Platform initialization
- Configuration loader
- Logging
- Plugin Manager
- Dependency container
- Application lifecycle

Do **not** implement SQLite, Evidence Store, financial plugins, MCP, or Decision Engine in M1.2 unless the iteration plan explicitly includes them.

---

## Files Currently Being Modified

None (M1.1 complete; M1.2 not started).

---

## Suggested Documentation

Read only what M1.2 requires:

- `AGENTS.md`
- `WORKFLOW.md`
- `progress/CURRENT_STATUS.md`
- `progress/checkpoints/M1.1_PROJECT_BOOTSTRAP.md`
- `docs/33_IMPLEMENTATION_PLAN.md` (Iteration 2)
- `docs/20_ARCHITECTURE.md` (Platform Core sections)
- `docs/30_TECH_STACK.md`
- `docs/31_CODING_STANDARDS.md`
- `docs/34_TESTING_STRATEGY.md`

---

## Known Risks

- M1.2 scope in the implementation plan is broader than a single small session; decompose if needed.
- Empty `src/core` / `src/config` placeholders exist — extend them; do not invent a parallel layout.

---

## Exact Prompt For Next Session

---

You are continuing development of the Investment Intelligence Platform.

Read:

- AGENTS.md
- WORKFLOW.md
- progress/CURRENT_STATUS.md
- progress/checkpoints/M1.1_PROJECT_BOOTSTRAP.md

SESSION_HANDOFF.md has no active handoff.

Read only the documentation required for the current task.

Current iteration:

M1.2 – Platform Core

Current objective:

Implement the minimum Platform Core (initialization, configuration loader, logging, Plugin Manager, dependency container, application lifecycle).

Completed previously:

M1.1 – Project Bootstrap (runnable TypeScript + pnpm + Vitest + ESLint/Prettier + minimal CLI).

Remaining work:

- Platform initialization
- Configuration loader
- Logging
- Plugin Manager
- Dependency container
- Application lifecycle

Do not write code.

First inspect the repository.

Verify implementation matches CURRENT_STATUS.md.

Produce a plan.

Wait for approval.

---

# Validation

Before saving this file verify:

- Repository state matches the prompt.
- CURRENT_STATUS.md matches the prompt.
- SESSION_HANDOFF.md matches the prompt.
- No completed tasks remain listed as incomplete.
- No stale information remains.
