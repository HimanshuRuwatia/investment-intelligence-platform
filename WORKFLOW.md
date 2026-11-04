# Development Workflow

> Official development workflow for the Investment Intelligence Platform.
>
> This document defines how every implementation session should be conducted.
>
> Every AI assistant and human developer must follow this workflow.

---

# Purpose

The Platform is developed incrementally.

The repository—not the chat history—is the source of truth.

Every implementation session should leave enough information for a completely new AI assistant to continue development without relying on previous conversations.

---

# Core Principle

Never depend on chat history.

Always depend on:

- Repository
- Documentation
- Progress files

A new AI should be able to continue development using only the repository.

---

# Development Lifecycle

Every implementation session follows this lifecycle.

Planning

↓

Implementation

↓

Self Review

↓

Testing

↓

Documentation Review

↓

Audit Gate

↓

Progress Update

↓

Git Commit

↓

Next Session

Do not skip steps.

---

# Session Start

Before writing code:

1. Read AGENTS.md.
2. Read progress/CURRENT_STATUS.md.
3. Read the latest Iteration Checkpoint (if applicable).
4. Read only the documentation relevant to the requested task.
5. Produce an implementation plan.
6. Wait for approval before coding unless explicitly instructed otherwise.

---

# Implementation Rules

Implement only the requested iteration.

Do not implement future milestones.

Do not redesign architecture.

Do not introduce speculative abstractions.

Keep changes minimal.

Every change should preserve deterministic behavior.

---

# Self Review

Before considering implementation complete:

Review:

- Architecture
- Coding Standards
- Determinism
- Duplicate Code
- Simplicity
- Separation of Concerns

Report issues before modifying code.

---

# Testing

Every iteration should include appropriate tests.

Verify:

- Build succeeds.
- Tests pass.
- No regressions introduced.
- Deterministic outputs preserved.

---

# Audit Gate

Before asking for commit, push, PR creation, or merge approval:

1. Run `node scripts/agent-audit-gate.mjs`.
2. If it fails, do not request approval; resolve the missing or inconsistent audit evidence.
3. If it passes, report that it is necessary but not sufficient and still present the full diff for review.

# Documentation Review

Determine whether documentation should change.

Update documentation only if:

- Architecture changed.
- Contracts changed.
- Behavior changed.
- Configuration changed.

Do not modify documentation for simple refactoring.

---

# Progress Tracking

Every session MUST update:

progress/CURRENT_STATUS.md

If the iteration is incomplete:

Update:

progress/SESSION_HANDOFF.md

If the iteration is complete:

Append:

progress/ITERATION_HISTORY.md

Generate:

Iteration Checkpoint

---

# Definition of Done

A task is complete only if:

✓ Code builds

✓ Tests pass

✓ Architecture respected

✓ Documentation reviewed

✓ CURRENT_STATUS.md updated

✓ SESSION_HANDOFF.md updated (if incomplete)

OR

✓ Iteration Checkpoint generated (if complete)

✓ Git Commit prepared

---

# Context Exhaustion Procedure

If context becomes large:

Do NOT continue coding indefinitely.

Instead:

1. Finish the current logical task.
2. Generate SESSION_HANDOFF.md.
3. Update CURRENT_STATUS.md.
4. Generate a continuation prompt.
5. Start a new AI session.

Never rely on previous chat history.

---

# New AI Session

Every new AI session begins by reading:

AGENTS.md

↓

CURRENT_STATUS.md

↓

SESSION_HANDOFF.md (if present)

↓

Latest Iteration Checkpoint

↓

Relevant Documentation

Only then should implementation continue.

---

# Repository is the Source of Truth

The repository always has higher priority than chat history.

Every AI assistant should assume that another AI may continue development tomorrow.

Leave the repository in a state that supports seamless handoff.