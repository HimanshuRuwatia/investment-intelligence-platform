# Iteration History

> Permanent development history.
>
> Append only.
>
> Never delete previous entries.

---

# Template

## Iteration

Example:

M1.1 – Project Bootstrap

### Status

Completed

### Date

YYYY-MM-DD

### Objective

Short description.

### Deliverables

- Item
- Item
- Item

### Architectural Decisions

- Decision
- Decision

### Tests

- Unit Tests
- Integration Tests

### Git Commit

commit message

### Notes

Additional observations.

---

# History

## Iteration

M1.1 – Project Bootstrap

### Status

Completed

### Date

2026-07-19

### Objective

Create the initial runnable repository skeleton: TypeScript, pnpm, tests, lint/format, and a minimal CLI.

### Deliverables

- pnpm + TypeScript ESM project configured
- Documented `src/` directory layout created
- Vitest, ESLint, and Prettier configured
- Minimal CLI entry (`src/bootstrap` + `src/cli`)
- README Getting Started section
- Smoke unit tests

### Architectural Decisions

- Single-package modular monolith (no monorepo)
- ESM with TypeScript `NodeNext` module resolution
- Vitest for tests; ESLint flat config + Prettier for lint/format
- CLI uses `process.argv` only (no commander)
- Empty `src/core`, `src/plugins`, and `src/config` placeholders retained per architecture layout

### Tests

- Unit: `tests/unit/smoke.test.ts` (CLI help, version, unknown args, `--` separator)

### Git Commit

Suggested:

```text
chore: bootstrap TypeScript project with pnpm, Vitest, and minimal CLI

Establish M1.1 runnable skeleton so developers can install, build, test, and start locally.
```

### Notes

Checkpoint: `progress/checkpoints/M1.1_PROJECT_BOOTSTRAP.md`

Next iteration: M1.2 – Platform Core
