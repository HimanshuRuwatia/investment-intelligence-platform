# AGENTS.md

> **Investment Intelligence Platform**
>
> Repository-wide instructions for AI coding assistants.
>
> Version: 1.0

---

# Purpose

This repository is designed for long-term AI-assisted development.

Your responsibility is **not** to invent architecture.

Your responsibility is to implement the documented architecture consistently.

The project values:

1. Correctness
2. Determinism
3. Simplicity
4. Explainability
5. Maintainability

Speed is secondary.

---

# Repository Philosophy

The Investment Intelligence Platform is a deterministic financial intelligence system.

It is **NOT**:

* an LLM-first application
* an AI chatbot
* a collection of scripts
* a CRUD application

The LLM is only one consumer of the Platform.

Business logic must never depend on an LLM.

---

# Planning Before Implementation

Unless explicitly instructed otherwise:

The AI should never begin implementing immediately.

Instead:

1. Analyze the request.
2. Read the relevant documentation.
3. Produce an implementation plan.
4. Wait for approval.

Implementation should begin only after the plan has been reviewed and approved.

This applies to every iteration, regardless of size.

---

# Architecture Hierarchy

Always follow this hierarchy.

```text
Project Context

↓

Architecture

↓

Data Model

↓

Plugin Specification

↓

Decision Engine

↓

Database Design

↓

Implementation

↓

Tests
```

If implementation conflicts with architecture:

**Stop and explain the conflict.**

Do not invent a new design.

---

# Read Before Coding

Before making changes:

1. Understand the request.
2. Identify the affected Capability.
3. Read only the relevant documentation.
4. Locate existing implementation.
5. Produce an implementation plan.
6. Estimate implementation scope.
7. If the implementation is too large, decompose it into smaller logical tasks.
8. Reuse existing abstractions.
9. Implement the smallest correct solution.
10. Write or update tests.
11. Explain the change.

Never skip these steps.

---

# Golden Rules

## 1. Do not invent architecture.

Architecture lives in the documentation.

---

## 2. Extend before creating.

Always check whether:

* Plugin
* Repository
* Analyzer
* Collector
* Service
* Model

already exists.

Prefer extension over duplication.

---

## 3. Keep business logic deterministic.

Never introduce:

* random behavior
* hidden heuristics
* undocumented assumptions
* LLM-based business calculations

Given identical inputs, identical outputs must be produced.

---

## 4. Respect separation of concerns.

Collectors collect.

Normalizers normalize.

Validators validate.

Analyzers calculate Metrics.

Evidence Builders create Evidence.

Signal Detectors create Signals.

Knowledge Builders create Knowledge.

Decision Engine evaluates.

LLMs explain.

Never mix responsibilities.

---

## 5. Repository independence.

Business logic must never:

* execute SQL
* depend on SQLite
* depend on PostgreSQL

Always use Repository contracts.

---

## 6. Platform first.

Business code must not know:

* storage implementation
* MCP implementation
* scheduler implementation
* provider implementation

Depend only on Platform contracts.

---

# Platform Overview

```text
Capability

↓

Plugin

↓

Collection

↓

Normalization

↓

Validation

↓

Metrics

↓

Evidence

↓

Signals

↓

Knowledge

↓

Decision Engine

↓

Decision Package

↓

MCP

↓

LLM
```

Never bypass stages.

---

# Plugin Rules

Every new capability should follow the documented Plugin workflow.

Every Plugin should contain only one business responsibility.

Every Plugin should expose:

* Capability Manifest
* Configuration
* Business Pipeline
* Tests
* Documentation

Plugins should communicate through Platform contracts.

Never through direct implementation dependencies.

---

# Decision Engine Rules

The Decision Engine is the only component responsible for:

* Scores
* Rankings
* Confidence
* Decision Packages

Plugins produce deterministic business information.

Plugins do NOT make investment decisions.

---

# Database Rules

Treat the database as an implementation detail.

Business logic communicates with:

Evidence Store

↓

Repositories

↓

Persistence Engine

↓

SQLite

Business logic must never know which database is used.

---

# Testing Rules

Every implementation should include appropriate tests.

Prefer:

* Unit Tests
* Integration Tests
* End-to-End Tests

Given identical inputs:

* Metrics
* Evidence
* Signals
* Knowledge
* Decision Packages

must remain identical.

---

# Documentation Rules

Update documentation when:

* architecture changes
* behavior changes
* contracts change
* configuration changes

Do not update documentation for trivial refactoring.

---

# Local-First Development

Everything should work locally.

Preferred stack:

* Node.js
* TypeScript
* pnpm
* SQLite

Do not introduce cloud dependencies unless explicitly requested.

Do not introduce paid services into the core Platform.

---

# Keep It Simple

Avoid introducing:

* unnecessary abstractions
* premature optimization
* speculative features
* generic frameworks
* complex dependency injection
* microservices

Build only what is required today.

---

# Incremental Implementation

The Platform is developed through small, reviewable implementation increments.

Avoid large, monolithic code generation.

As a guideline:

- Prefer implementation chunks of approximately **300–500 lines of newly written code**.
- If a task is expected to exceed this size, split it into multiple logical implementation steps.
- Each step should produce a working, testable state whenever practical.

Large implementation requests should be decomposed into smaller tasks such as:

- Contracts
- Models
- Infrastructure
- Business Logic
- Tests
- Documentation

rather than attempting to implement an entire capability in a single step.

The objective is not to minimize lines of code.

The objective is to maximize:

- Reviewability
- Correctness
- Determinism
- Testability
- Recoverability
- AI reasoning quality

If an implementation appears too large for one iteration, stop after producing an implementation plan and propose a decomposition before writing code.

When uncertain, prefer **smaller implementation increments** over larger ones.

---

# If You Are Unsure

Stop and determine:

* Which Capability owns this?
* Which Plugin owns this?
* Which document defines this?
* Can an existing component be extended?
* Is the behavior deterministic?

If the answer is unclear,

ask for clarification.

Never guess architectural decisions.

---

# Definition of Done

A task is complete only if:

* The architecture is respected.
* Code builds successfully.
* Tests pass.
* Deterministic behavior is preserved.
* Documentation is updated if required.
* No unnecessary abstractions were introduced.
* The solution is the smallest reasonable implementation.

---

# Repository Documentation

Use these documents as the authoritative reference.

| Document                       | Purpose                       |
| ------------------------------ | ----------------------------- |
| 10_PROJECT_CONTEXT.md          | Project vision and objectives |
| 11_AI_CONTEXT.md               | AI-specific context           |
| 12_GLOSSARY.md                 | Common terminology            |
| 20_ARCHITECTURE.md             | System architecture           |
| 21_DATA_MODEL.md               | Business entities             |
| 22_PLUGIN_SPEC.md              | Plugin architecture           |
| 23_DECISION_ENGINE.md          | Decision methodology          |
| 24_MCP_SPEC.md                 | MCP integration               |
| 30_TECH_STACK.md               | Technology choices            |
| 31_CODING_STANDARDS.md         | Coding conventions            |
| 32_DATABASE_DESIGN.md          | Persistence architecture      |
| 33_IMPLEMENTATION_PLAN.md      | Development roadmap           |
| 34_TESTING_STRATEGY.md         | Testing methodology           |
| 35_PLUGIN_DEVELOPMENT_GUIDE.md | Plugin implementation         |
| 39_AI_DEVELOPMENT_GUIDE.md     | AI development practices      |
| AGENTIC_DEVELOPMENT.md          | Agent scope, Git and GitHub gates |

Read only the documents relevant to the current task.

Do not load unnecessary context.

---

# Core Principle

Every change should make the Platform:

* easier to understand
* easier to test
* easier to extend
* more deterministic
* more maintainable

Protect the architecture above all else.

# Development Workflow

This repository follows a mandatory implementation workflow.

Before beginning any implementation task, read:

- WORKFLOW.md
- AGENTIC_DEVELOPMENT.md

The workflow defines:

- Planning
- Session management
- Progress tracking
- Checkpoints
- Session handoffs
- Definition of Done

`AGENTIC_DEVELOPMENT.md` defines:

- Repository-scoped agent permissions
- `feature/*` branch workflow
- GitHub/`gh` approval gates
- Independent review and merge requirements
- Rules for keeping autonomous agents inside IIP scope

Do not begin implementation without following the workflow.

---

# Session Completion

An implementation session is not complete until the repository has been fully synchronized.

Before ending every implementation session:

- Complete the current logical implementation step.
- Review the implementation.
- Run or update appropriate tests.
- Review whether documentation needs updating.
- Update all required progress files as defined in WORKFLOW.md.
- Generate or update `NEXT_SESSION.md`.
- If the iteration is complete, generate an Iteration Checkpoint and update `ITERATION_HISTORY.md`.
- If the iteration is incomplete, update `SESSION_HANDOFF.md`.

Leave the repository in a state where a completely new AI assistant can continue development without relying on previous conversations.

The repository—not the chat history—is the source of truth.