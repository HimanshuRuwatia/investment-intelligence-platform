# Investment Intelligence Platform

> **Repository Documentation Index**
>
> **Version:** 1.0
>
> **Status:** Active
>
> **Read this document first.**

---

# Welcome

Welcome to the **Investment Intelligence Platform**.

This repository contains the source code and architecture documentation for building a modular, explainable financial intelligence platform.

The project is designed to analyze financial markets using deterministic analysis and Artificial Intelligence in a transparent, explainable, and extensible manner.

The first supported asset class is **Indian Mutual Funds**, but the architecture is intentionally designed to support additional financial products in the future.

---

# Getting Started

## Prerequisites

* Node.js 20+ (LTS recommended)
* [pnpm](https://pnpm.io/) 10+

## Install

```bash
pnpm install
```

## Build

```bash
pnpm build
```

## Test

```bash
pnpm test
```

## Lint and format

```bash
pnpm lint
pnpm format:check
```

## Run the CLI

```bash
pnpm start
pnpm start -- --help
pnpm start -- --version
```

On start, the Platform loads `config/default.json`, initializes logging and lifecycle, then runs the CLI.
Override with `NODE_ENV` and `LOG_LEVEL`. Plugin Manager arrives in M1.2 Step B.

---

# Repository Philosophy

This repository follows one guiding principle:

> **Documentation drives implementation.**

Implementation should follow the documented architecture.

Architecture should follow the project vision.

The documentation is considered part of the codebase.

---

# Reading Order

The documentation is intentionally ordered.

When working on this project, read the documents in the following sequence.

## Phase 1 — Project Understanding

### `10_PROJECT_CONTEXT.md`

Read first.

Defines:

* Project vision
* Product philosophy
* Engineering philosophy
* AI philosophy
* Development philosophy
* Long-term goals

This document explains **why** the platform exists.

---

### `11_AI_CONTEXT.md`

Read second.

Defines:

* Implementation constraints
* AI coding assistant guidance
* Terminology
* Responsibilities
* Coding rules
* Development workflow

This document explains **how contributors should think** while implementing the project.

---

### `12_GLOSSARY.md`

Read third.

Defines every important term used throughout the project.

Examples:

* Plugin
* Collector
* Analyzer
* Evidence
* Signal
* Knowledge
* Insight

No document should introduce terminology that is not defined in the glossary.

---

## Phase 2 — System Design

### `20_ARCHITECTURE.md`

Defines:

* Overall system architecture
* Component interactions
* Data flow
* Plugin architecture
* Dependency rules
* Extension strategy

This is the primary technical design document.

---

### `21_DATA_MODEL.md`

Defines all domain models.

Examples:

* Fund
* NAV
* Evidence
* Signal
* Knowledge
* Score
* Plugin

---

### `22_PLUGIN_SPEC.md`

Defines the plugin contract.

Every plugin MUST conform to this specification.

---

### `23_DECISION_ENGINE.md`

Defines:

* Scoring
* Signal generation
* Knowledge generation
* Confidence propagation
* Ranking

---

### `24_MCP_SPEC.md`

Defines:

* MCP integration
* Tool contracts
* Input/output schemas
* Registration
* Versioning

---

### `25_DATABASE.md`

Defines:

* Persistence layer
* Database schema
* Storage strategy
* Versioning
* Indexing

---

## Phase 3 — Development

### `30_DEVELOPMENT.md`

Defines:

* Development workflow
* Branching strategy
* Coding standards
* Testing
* Local execution

---

### `31_IMPLEMENTATION_PLAN.md`

Defines:

* Current sprint
* Milestones
* Priorities
* Development phases

---

### `90_AI_RULES.md`

Contains concise implementation rules specifically optimized for AI coding assistants.

This document should be referenced frequently during development.

---

# Documentation Hierarchy

If two documents appear to conflict, follow this precedence:

1. `10_PROJECT_CONTEXT.md`
2. `11_AI_CONTEXT.md`
3. `12_GLOSSARY.md`
4. `20_ARCHITECTURE.md`
5. `21_DATA_MODEL.md`
6. `22_PLUGIN_SPEC.md`
7. `23_DECISION_ENGINE.md`
8. `24_MCP_SPEC.md`
9. `25_DATABASE.md`
10. `30_DEVELOPMENT.md`
11. `31_IMPLEMENTATION_PLAN.md`
12. `90_AI_RULES.md`

Higher-level documents define intent.

Lower-level documents define implementation.

Implementation MUST never violate higher-level documents.

---

# Current Development Stage

Current Phase:

**Platform Foundation**

Current Objective:

Build the core financial intelligence engine.

Current Asset Class:

Indian Mutual Funds

Current Development Strategy:

Vertical Slice Development

Current Execution Strategy:

Local First

Current User Interface Strategy:

No production UI.

Use local scripts, CLI tools, tests, and debugging utilities until the intelligence engine is stable.

---

# Core Architectural Principles

The following principles apply throughout the repository.

* Deterministic systems generate financial truth.
* LLMs explain deterministic outputs.
* Every important conclusion MUST be evidence-backed.
* Plugins MUST remain independent.
* The Platform Core MUST NOT contain financial business logic.
* Components SHOULD have a single responsibility.
* Architecture SHOULD evolve through extension rather than modification.
* Simplicity SHOULD be preferred over unnecessary abstraction.

---

# Repository Structure

```text
docs/
├── 00_README.md
├── 10_PROJECT_CONTEXT.md
├── 11_AI_CONTEXT.md
├── 12_GLOSSARY.md
├── 20_ARCHITECTURE.md
├── 21_DATA_MODEL.md
├── 22_PLUGIN_SPEC.md
├── 23_DECISION_ENGINE.md
├── 24_MCP_SPEC.md
├── 25_DATABASE.md
├── 30_DEVELOPMENT.md
├── 31_IMPLEMENTATION_PLAN.md
├── 90_AI_RULES.md
└── adr/
```

The documentation should evolve before the implementation.

---

# Current Implementation Priority

The immediate objective is to complete one fully functional vertical slice.

Target Plugin:

**Performance Plugin**

The plugin should support:

1. Data collection
2. Data normalization
3. Financial analysis
4. Evidence generation
5. Evidence storage
6. Reasoning-ready output
7. Local querying

Only after the complete workflow functions correctly should additional plugins be implemented.

---

# Contribution Guidelines

Before implementing any feature:

1. Read the relevant documentation.
2. Identify the owning plugin.
3. Respect plugin boundaries.
4. Keep responsibilities focused.
5. Implement the smallest complete solution.
6. Add tests where appropriate.
7. Avoid premature optimization.
8. Update documentation if architectural changes are required.

---

# Long-Term Vision

The long-term goal is to build a trustworthy financial reasoning platform that helps investors understand markets through deterministic analysis and explainable AI.

The platform should grow by adding new plugins and analytical capabilities while maintaining a stable core architecture.

The emphasis is on:

* Transparency
* Explainability
* Deterministic reasoning
* Modularity
* Maintainability
* Extensibility

Every engineering decision should reinforce these principles.

---

# Final Reminder

This repository prioritizes:

**Understanding over recommendation.**

**Evidence over opinion.**

**Deterministic reasoning over opaque AI decisions.**

**Working local software over premature infrastructure.**

**Long-term maintainability over short-term convenience.**
