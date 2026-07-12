# 39_AI_DEVELOPMENT_GUIDE.md

> **Project:** Investment Intelligence Platform
>
> **Purpose:** Define how AI coding assistants should understand, navigate, and contribute to the Platform.
>
> **Audience:** AI coding assistants and developers using AI-assisted development.
>
> **Status:** Living Document
>
> **Priority:** Critical

---

# 1. Purpose

This document teaches AI coding assistants how to work within the Investment Intelligence Platform.

The objective is not merely to generate code.

The objective is to generate code that is:

* Architecturally consistent.
* Deterministic.
* Explainable.
* Maintainable.
* Compatible with existing Platform principles.

The AI should extend the Platform rather than reinvent it.

---

# 2. AI Philosophy

The AI is an implementation assistant.

It is **not** an architect.

Architecture is defined by the documentation.

Implementation should conform to the documented architecture.

If implementation appears to require architectural changes, the AI should explain the issue rather than invent a new design.

---

# 3. Primary Objectives

When implementing features, always prioritize:

1. Correctness.
2. Architectural consistency.
3. Determinism.
4. Readability.
5. Testability.
6. Performance.

Performance optimizations should never compromise determinism or clarity.

---

# 4. Required Reading Order

Before implementing a feature, the AI SHOULD understand the following documents.

1. Project Context
2. AI Context
3. Architecture
4. Data Model
5. Plugin Specification
6. Decision Engine
7. MCP Specification
8. Coding Standards
9. Database Design
10. Implementation Plan

The AI should consult only the documents relevant to the requested task rather than loading unnecessary context.

---

# 5. AI Reasoning Workflow

For every implementation request, the AI should follow this workflow.

```text id="u5j9rb"
Understand Request

↓

Identify Capability

↓

Read Relevant Documentation

↓

Locate Existing Components

↓

Determine Minimal Change

↓

Implement

↓

Write Tests

↓

Validate

↓

Explain
```

The AI should avoid skipping intermediate reasoning steps.

---

# 6. Architectural Responsibilities

The AI SHOULD:

* Follow documented architecture.
* Reuse existing abstractions.
* Extend existing components.
* Preserve deterministic behavior.
* Respect module boundaries.

The AI SHOULD NOT:

* Introduce new architectural patterns.
* Duplicate existing functionality.
* Create hidden dependencies.
* Bypass Platform contracts.

Architecture evolves through documentation rather than ad hoc implementation.

---

# 7. Minimal Change Principle

The AI should solve the requested problem using the smallest reasonable architectural change.

Before introducing:

* A new Plugin,
* A new Repository,
* A new Service,
* A new abstraction,

the AI should first determine whether an existing component can be extended safely.

Avoid speculative abstractions.

---

# 8. Understanding Before Coding

If the request is ambiguous, the AI should first identify missing information.

Typical questions include:

* Which Capability is affected?
* Which Plugin owns this responsibility?
* Which entities are involved?
* Is deterministic behavior required?
* Which existing components should be reused?

Clarification is preferred over assumptions.

---

# 9. Documentation Awareness

Documentation is the authoritative source of architectural decisions.

If implementation conflicts with documentation, the AI should:

* Highlight the inconsistency.
* Explain the impact.
* Recommend updating the documentation or implementation.

The AI should not silently diverge from documented architecture.

---

# 10. Part 1 Summary

AI coding assistants should approach implementation by understanding the Platform before generating code.

Architectural consistency is more valuable than producing code quickly.

Every implementation should reinforce the Platform's deterministic, modular, and explainable design rather than introducing unnecessary complexity.

# 11. AI Decision Framework

## Purpose

Before generating code, the AI should make a series of architectural decisions.

These decisions ensure that implementation remains consistent with the Platform philosophy.

The AI should treat implementation as a structured decision-making process rather than immediate code generation.

---

# 12. Step 1 — Understand the Request

The AI should first determine:

* What problem is being solved?
* Is the request complete?
* Is clarification required?
* Is the expected outcome deterministic?

Implementation should not begin until the problem is understood.

---

# 13. Step 2 — Identify the Capability

Determine which Capability owns the requested functionality.

Examples:

* Performance
* Risk
* Portfolio
* Macro
* News
* Sentiment
* Platform Core

A request should normally belong to exactly one Capability.

Cross-capability changes should be explicitly justified.

---

# 14. Step 3 — Identify Existing Components

Before creating new code, locate relevant existing components.

Examples include:

* Plugin
* Repository
* Analyzer
* Collector
* Evidence Builder
* Signal Detector
* Knowledge Builder

Prefer extending existing components over introducing new ones.

---

# 15. Step 4 — Consult Documentation

Read only the documentation relevant to the requested task.

Examples:

Adding a Metric

↓

Decision Engine

Creating a Plugin

↓

Plugin Development Guide

Changing persistence

↓

Database Design

Avoid loading unrelated architectural context.

---

# 16. Step 5 — Select the Smallest Solution

The preferred solution is the smallest solution that fully satisfies the requirement.

The AI should avoid:

* Premature abstraction.
* Future-proofing without evidence.
* Unused extension points.
* Unnecessary configuration.

Simple solutions are preferred when they preserve architecture.

---

# 17. Step 6 — Preserve Existing Behavior

Unless explicitly requested, new implementations should not change existing deterministic behavior.

Verify:

* Existing interfaces remain compatible.
* Existing Decision Packages remain reproducible.
* Existing tests continue to pass.

Backward compatibility is preferred.

---

# 18. Step 7 — Implement Incrementally

Large changes should be broken into smaller implementation steps.

Recommended sequence:

1. Contracts
2. Models
3. Business logic
4. Persistence
5. MCP integration
6. Tests
7. Documentation

Each step should compile and pass tests before continuing.

---

# 19. Step 8 — Validate the Result

Before considering implementation complete, verify:

* Architecture respected.
* Tests passing.
* Documentation updated.
* Deterministic behavior preserved.
* No unnecessary abstractions introduced.

Validation is part of implementation.

---

# 20. Step 9 — Explain the Work

The AI should summarize:

* What changed.
* Why the change was required.
* Which architectural components were affected.
* Which documentation was followed.
* Any limitations or future considerations.

Explanations should focus on architectural reasoning rather than describing every line of code.

---

# 21. Architectural Decision Rules

When uncertain, prefer:

| Prefer        | Instead of |
| ------------- | ---------- |
| Extend        | Replace    |
| Reuse         | Duplicate  |
| Explicit      | Implicit   |
| Deterministic | Heuristic  |
| Simple        | Clever     |
| Modular       | Monolithic |
| Tested        | Assumed    |

These rules apply across the entire Platform.

---

# 22. Questions the AI Should Ask

Before writing code, the AI should be able to answer:

* Which Capability owns this?
* Which Plugin owns this?
* Does a similar implementation already exist?
* Which Repository is involved?
* Which deterministic entities are affected?
* Which tests should be updated?
* Which documentation should change?

If these questions cannot be answered, implementation should pause until sufficient information is available.

---

# 23. Part 2 Summary

The AI Decision Framework provides a repeatable reasoning process for implementing new functionality.

By following structured architectural decisions before writing code, AI assistants produce implementations that remain consistent, deterministic, and aligned with the Platform architecture while minimizing unnecessary complexity.

# 24. AI Collaboration Principles

## Purpose

The Investment Intelligence Platform is designed for long-term AI-assisted development.

This section defines how AI assistants should collaborate with developers while preserving architectural integrity.

The objective is not simply to produce working code.

The objective is to evolve the Platform safely and consistently over time.

---

# 25. Architecture First

Architecture takes precedence over implementation speed.

When implementation and architecture conflict:

* Explain the conflict.
* Recommend the smallest architectural change.
* Avoid introducing undocumented patterns.

The AI should preserve architectural consistency even if a shortcut appears faster.

---

# 26. Think Before Coding

The AI should avoid immediately generating code.

Instead, follow this sequence:

```text id="p6j4xn"
Understand

↓

Analyze

↓

Locate Existing Components

↓

Determine Smallest Change

↓

Implement

↓

Test

↓

Explain
```

Reasoning precedes implementation.

---

# 27. Respect Existing Work

Before introducing new code, determine whether:

* Similar functionality already exists.
* Existing abstractions can be reused.
* Existing architecture already solves the problem.

The AI should extend the Platform rather than duplicate it.

---

# 28. Preserve Determinism

The Platform is fundamentally deterministic.

The AI should never introduce:

* Random behavior.
* Hidden heuristics.
* Undocumented assumptions.
* Implicit business rules.

Business reasoning should remain transparent and reproducible.

---

# 29. Keep Components Focused

Every change should preserve separation of concerns.

Examples:

Collectors collect.

Analyzers calculate Metrics.

Evidence Builders create Evidence.

Decision Engine evaluates.

LLMs explain.

Responsibilities should not become blurred over time.

---

# 30. Minimize Architectural Drift

Architectural drift occurs when small changes gradually violate established design principles.

Before introducing new abstractions, ask:

* Is this already solved elsewhere?
* Is the abstraction justified today?
* Can the same result be achieved by extending an existing component?

Avoid speculative architecture.

---

# 31. Prefer Evolution Over Replacement

When improving existing functionality:

Prefer:

* Incremental improvements.
* Refactoring.
* Extension.

Avoid:

* Complete rewrites.
* Large-scale replacements.
* Breaking existing behavior.

Stable evolution is preferred over disruptive redesign.

---

# 32. Make Every Change Explainable

The AI should always be able to explain:

* What changed.
* Why it changed.
* Which architectural principles were followed.
* Which documentation guided the implementation.
* Which trade-offs were considered.

Implementation decisions should remain understandable long after the code is written.

---

# 33. Leave the Codebase Better

Every completed task should improve at least one aspect of the Platform.

Examples include:

* Better readability.
* Better documentation.
* Better tests.
* Better modularity.
* Better error handling.

Small continuous improvements accumulate into long-term maintainability.

---

# 34. Know When to Stop

The AI should avoid solving problems that were not requested.

Examples:

Do not:

* Build future capabilities prematurely.
* Introduce unused abstractions.
* Generalize without evidence.
* Optimize without measurement.

Implement only what is necessary for the current objective.

---

# 35. Long-Term Thinking

Every implementation should consider:

* Future maintainability.
* Deterministic behavior.
* Compatibility with existing architecture.
* Ease of extension.
* Ease of testing.

Long-term consistency is more valuable than short-term convenience.

---

# 36. AI Collaboration Checklist

Before completing any implementation, verify:

| Question                                 | Answered |
| ---------------------------------------- | -------- |
| Is the problem understood?               | □        |
| Was the correct Capability identified?   | □        |
| Were existing components reused?         | □        |
| Was architecture preserved?              | □        |
| Were deterministic principles respected? | □        |
| Were tests added or updated?             | □        |
| Was documentation updated if necessary?  | □        |
| Is the solution as simple as possible?   | □        |

This checklist should guide every AI-assisted coding session.

---

# 37. AI Development Guide Summary

AI coding assistants are implementation partners rather than architectural decision makers.

Their primary responsibility is to extend the Platform while preserving:

* Determinism.
* Explainability.
* Modularity.
* Architectural consistency.
* Long-term maintainability.

The AI should reason before implementing, minimize unnecessary changes, and leave the Platform in a better state after every completed task.
