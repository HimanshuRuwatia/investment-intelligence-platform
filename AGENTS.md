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
5. Reuse existing abstractions.
6. Implement the smallest correct solution.
7. Write or update tests.
8. Explain the change.

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

WORKFLOW.md

The workflow defines:

- Planning
- Session management
- Progress tracking
- Checkpoints
- Handoff procedures
- Definition of Done

Do not begin implementation without following that workflow.

Before ending any implementation session, update all required progress files as defined in WORKFLOW.md.

An implementation session is not complete until repository state, documentation, and progress tracking are synchronized.