# 31_CODING_STANDARDS.md

> **Project:** Investment Intelligence Platform
>
> **Purpose:** Define the coding standards used throughout the Platform.
>
> **Audience:** Developers and AI coding assistants.
>
> **Status:** Living Document
>
> **Priority:** Critical

---

# 1. Purpose

This document defines the engineering standards for implementing the Investment Intelligence Platform.

The objectives are:

* Produce consistent code.
* Improve readability.
* Simplify maintenance.
* Improve AI-generated code quality.
* Reduce architectural drift.

These standards apply to every source file unless explicitly documented otherwise.

---

# 2. Core Engineering Principles

Every implementation SHOULD prioritize:

1. Correctness
2. Readability
3. Determinism
4. Explainability
5. Maintainability
6. Testability
7. Performance

Performance optimizations should never significantly reduce readability unless justified by measurement.

---

# 3. Coding Philosophy

The Platform favors:

* Explicit code over clever code.
* Simple code over abstract code.
* Composition over inheritance.
* Small modules over large modules.
* Pure functions where practical.
* Clear names over short names.

Future maintainers should understand code without reading unrelated modules.

---

# 4. File Size Guidelines

Files should remain focused.

Recommended limits:

| File Type    | Recommended Maximum |
| ------------ | ------------------- |
| Utility      | ~150 lines          |
| Analyzer     | ~250 lines          |
| Collector    | ~250 lines          |
| Service      | ~300 lines          |
| Plugin Entry | ~150 lines          |

Large files should be split by responsibility rather than region comments.

These are guidelines rather than strict limits.

---

# 5. Function Design

Functions SHOULD:

* Perform one responsibility.
* Have descriptive names.
* Minimize side effects.
* Return predictable outputs.
* Validate important inputs.

Functions SHOULD NOT:

* Perform multiple unrelated tasks.
* Hide business logic.
* Mutate unrelated state.

---

# 6. Naming Conventions

Names should describe business intent.

Good examples:

* calculateRollingReturns
* buildDecisionPackage
* detectOutperformance
* normalizeNavData

Poor examples:

* processData
* handleStuff
* executeLogic
* utilFunction

Names should communicate purpose rather than implementation.

---

# 7. Variable Naming

Variables should be descriptive.

Preferred examples:

* performanceEvidence
* rollingReturnMetrics
* confidenceScore
* benchmarkComparison

Avoid:

* temp
* value
* obj
* data
* result

Generic names are acceptable only for very small local scopes.

---

# 8. Class Responsibilities

Every class SHOULD own one responsibility.

Examples:

Good

* NavCollector
* PerformanceAnalyzer
* RiskDetector

Poor

* PlatformManager
* UtilityService
* FinancialEngine

Classes with broad or ambiguous responsibilities should be decomposed.

---

# 9. Error Handling

Errors should be explicit.

Preferred approach:

* Validate early.
* Fail clearly.
* Preserve diagnostic information.
* Avoid swallowing exceptions.

Every recoverable error should communicate:

* What failed.
* Why it failed.
* Whether retry is appropriate.

---

# 10. Asynchronous Code

Asynchronous operations SHOULD be:

* Explicit.
* Awaited correctly.
* Independently testable.

Independent operations SHOULD execute concurrently where safe.

Dependent operations SHOULD execute sequentially.

Concurrency should never change deterministic behavior.

---

# 11. Immutability

Prefer immutable objects whenever practical.

Instead of modifying existing objects:

Create new objects representing the updated state.

Benefits include:

* Easier debugging.
* Better testing.
* Improved traceability.
* Reduced side effects.

---

# 12. Comments

Comments should explain:

* Why.
* Business assumptions.
* Non-obvious decisions.

Comments should NOT repeat what the code already says.

Example:

Good

"Rolling returns use overlapping windows because they reduce period-selection bias."

Poor

"Increment counter by one."

Code should remain the primary documentation.

---

# 13. Constants

Business constants should be centralized.

Examples include:

* Category weights.
* Confidence thresholds.
* Retry limits.
* Timeout defaults.

Magic numbers should be avoided.

Constants should have meaningful names.

---

# 14. Dependency Management

Modules SHOULD depend only on documented interfaces.

Avoid hidden coupling.

Dependencies should flow inward toward business logic rather than outward toward infrastructure.

Business logic should not depend directly on implementation details of external libraries.

---

# 15. Logging Standards

Logging SHOULD capture meaningful events.

Examples:

* Plugin execution started.
* Collector completed.
* Evidence generated.
* Decision Package created.

Avoid excessive logging inside tight loops.

Logs should help diagnose behavior rather than narrate every instruction.

---

# 16. Code Review Checklist

Before merging new code, verify:

| Requirement                      | Complete |
| -------------------------------- | -------- |
| Single responsibility maintained | □        |
| Naming is descriptive            | □        |
| Business logic isolated          | □        |
| Error handling implemented       | □        |
| Tests written                    | □        |
| Documentation updated            | □        |
| Architecture respected           | □        |
| No duplicated logic              | □        |

Consistency is preferred over personal style.

---

# 17. AI Coding Guidelines

When generating code, AI assistants SHOULD:

* Follow the documented architecture.
* Reuse existing abstractions.
* Prefer explicit implementations.
* Avoid speculative abstractions.
* Preserve deterministic behavior.
* Write tests alongside implementation where practical.

AI assistants SHOULD NOT invent new architectural patterns without explicit justification.

---

# 18. Refactoring Principles

Refactoring should improve:

* Readability.
* Simplicity.
* Testability.
* Separation of concerns.

Refactoring should preserve externally observable behavior unless the change is intentional and documented.

---

# 19. Documentation Standards

Public modules SHOULD include documentation describing:

* Purpose.
* Responsibilities.
* Inputs.
* Outputs.
* Dependencies.
* Limitations.

Documentation should evolve with the code.

---

# 20. Coding Standards Summary

The Investment Intelligence Platform prioritizes engineering clarity over implementation cleverness.

Code should be:

* Predictable.
* Deterministic.
* Readable.
* Modular.
* Explainable.
* Well-tested.

These standards exist to help both humans and AI coding assistants produce a consistent, maintainable codebase as the Platform evolves.
