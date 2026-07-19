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

---

## Iteration

M1.2 Step A – Platform Foundations

### Status

Completed

### Date

2026-07-19

### Objective

Implement Platform Core foundations: configuration loader, structured logging, lightweight service container, application lifecycle, and platform composition. Extend bootstrap to start the platform before the CLI.

### Deliverables

- Typed config model + JSON loader with NODE_ENV / LOG_LEVEL overrides
- `config/default.json`
- Structured JSON-line logger
- ServiceContainer + PlatformLifecycle + createPlatform
- Bootstrap starts/stops platform around CLI
- Unit tests for config, logger, container, lifecycle, platform

### Architectural Decisions

- In-house logger (no pino/winston)
- Manual ServiceContainer (no DI framework)
- Config file at repo-root `config/default.json`; loader code under `src/config/`
- Plugin Registry/Manager deferred to M1.2 Step B

### Tests

- Unit: `tests/unit/config.test.ts`, `logger.test.ts`, `platform.test.ts` (plus existing smoke tests)

### Git Commit

Suggested:

```text
feat: add Platform Core foundations (config, logger, lifecycle)

Complete M1.2 Step A so the app loads config, logs structured events, and starts/stops cleanly before the CLI.
```

### Notes

Checkpoint: `progress/checkpoints/M1.2_STEP_A_PLATFORM_FOUNDATIONS.md`

Remaining within M1.2: Step B – Plugin Registry and Plugin Manager
