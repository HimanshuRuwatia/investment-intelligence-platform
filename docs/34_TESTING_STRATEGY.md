# 34_TESTING_STRATEGY.md

> **Project:** Investment Intelligence Platform
>
> **Purpose:** Define the testing philosophy and strategy for the Platform.
>
> **Audience:** Developers and AI coding assistants.
>
> **Status:** Living Document
>
> **Priority:** Critical

---

# 1. Purpose

The Platform relies on deterministic financial reasoning.

Testing exists to ensure that every layer of the Platform behaves correctly, consistently, and reproducibly.

Testing is considered part of implementation rather than a separate activity.

Every feature should be accompanied by appropriate automated tests.

---

# 2. Testing Philosophy

The Platform follows the following principles.

* Test behavior rather than implementation.
* Prefer deterministic tests.
* Prefer small tests over complex tests.
* Test every architectural layer independently.
* Test complete business flows end-to-end.

Every test should answer one clear question.

---

# 3. Testing Pyramid

The Platform uses a layered testing strategy.

```text id="s2p7km"
End-to-End Tests
        ▲
Integration Tests
        ▲
Unit Tests
```

Most tests should be Unit Tests.

End-to-End Tests should validate complete user workflows.

---

# 4. Testing Scope

Every major Platform component requires testing.

| Component          | Unit | Integration | End-to-End |
| ------------------ | :--: | :---------: | :--------: |
| Collectors         |   ✓  |      ✓      |  Optional  |
| Normalizers        |   ✓  |      ✓      |  Optional  |
| Analyzers          |   ✓  |      ✓      |      ✓     |
| Detectors          |   ✓  |      ✓      |      ✓     |
| Knowledge Builders |   ✓  |      ✓      |      ✓     |
| Decision Engine    |   ✓  |      ✓      |      ✓     |
| MCP Services       |   ✓  |      ✓      |      ✓     |
| Evidence Store     |   ✓  |      ✓      |  Optional  |

---

# 5. Unit Testing

Unit Tests verify one component in isolation.

Examples include:

* CAGR calculation.
* Rolling return calculation.
* Confidence propagation.
* NAV normalization.
* Portfolio diversification calculation.

Unit Tests should avoid external dependencies whenever practical.

---

# 6. Integration Testing

Integration Tests verify collaboration between components.

Examples include:

* Collector → Normalizer
* Analyzer → Evidence Store
* Decision Engine → Repository
* Plugin → MCP Service

Integration Tests validate architectural boundaries.

---

# 7. End-to-End Testing

End-to-End Tests validate complete Platform capabilities.

Example workflow:

```text id="q8x1lb"
Collect NAV

↓

Normalize

↓

Generate Metrics

↓

Generate Evidence

↓

Generate Signals

↓

Generate Knowledge

↓

Generate Decision Package

↓

Retrieve through MCP
```

These tests verify that complete capabilities function correctly.

---

# 8. Determinism Testing

Determinism is a core Platform requirement.

Given identical inputs:

* Metrics must match.
* Evidence must match.
* Signals must match.
* Knowledge must match.
* Decision Packages must match.

Repeated execution should produce identical outputs.

---

# 9. Historical Reproducibility

Historical evaluations must remain reproducible.

Example:

Historical NAV

*

Historical Policy Versions

↓

Historical Decision Package

The regenerated evaluation should match the stored revision.

This capability is essential for explainability.

---

# 10. Regression Testing

Regression Tests ensure that existing functionality remains correct after changes.

Examples include:

* Existing Decision Packages remain reproducible.
* Existing MCP responses remain compatible.
* Existing Plugin behavior remains unchanged.

Regression testing should accompany every significant architectural change.

---

# 11. Test Data

Tests SHOULD use deterministic datasets.

Examples include:

* Fixed NAV history.
* Fixed benchmark history.
* Fixed portfolio holdings.

Random or live market data should not be used in automated tests unless explicitly required.

---

# 12. Test Principles

The Platform follows these testing principles.

* Deterministic inputs.
* Deterministic outputs.
* Fast execution.
* Independent tests.
* Clear assertions.
* Minimal shared state.

Reliable tests are more valuable than numerous fragile tests.

---

# 13. Part 1 Summary

Testing is a first-class architectural concern.

Every layer of the Platform is validated independently before being validated as part of larger workflows.

The objective is to guarantee deterministic, reproducible financial reasoning rather than merely verifying code execution.

# 14. Verification Layers

## Purpose

The Platform verifies correctness at multiple architectural layers.

Traditional software testing alone is insufficient.

The Platform must also verify deterministic financial reasoning and decision quality.

Each verification layer validates a different aspect of the system.

---

# 15. Software Verification

Software Verification confirms that implementation behaves correctly.

Examples include:

* Function correctness.
* API behavior.
* Error handling.
* Repository behavior.
* Plugin lifecycle.

Software Verification answers:

> "Does the code behave correctly?"

---

# 16. Data Verification

Data Verification confirms the integrity of collected and persisted information.

Examples include:

* NAV completeness.
* Holdings validation.
* Duplicate detection.
* Referential integrity.
* Historical consistency.

Data Verification answers:

> "Can the Platform trust the available data?"

---

# 17. Financial Verification

Financial Verification confirms deterministic financial calculations.

Examples include:

* CAGR calculations.
* Rolling Returns.
* Sharpe Ratio.
* Maximum Drawdown.
* Portfolio Diversification.

Financial Verification answers:

> "Are the mathematical calculations correct?"

Reference values should come from trusted datasets or independently verified calculations.

---

# 18. Evidence Verification

Evidence Verification confirms that deterministic Metrics are converted into correct Evidence.

Examples include:

Metric

↓

Evidence

Questions include:

* Was the correct Evidence produced?
* Was confidence propagated correctly?
* Were thresholds applied correctly?

Evidence Verification ensures business interpretation remains deterministic.

---

# 19. Signal Verification

Signal Verification validates pattern detection.

Examples:

Evidence

↓

Signal

Questions include:

* Was the expected Signal generated?
* Were conflicting Signals preserved?
* Were confidence values propagated correctly?

Signals should always remain explainable.

---

# 20. Knowledge Verification

Knowledge Verification validates long-term understanding.

Examples:

Signals

↓

Knowledge

Questions include:

* Was recurring behavior detected?
* Was historical consistency preserved?
* Was Knowledge generated only after sufficient supporting Signals?

Knowledge should emerge from deterministic observations rather than isolated events.

---

# 21. Decision Verification

Decision Verification validates the Decision Engine.

Questions include:

* Are Scores correct?
* Are Rankings correct?
* Is Confidence correct?
* Are Decision Packages reproducible?
* Are policy versions correctly referenced?

Decision Verification ensures that deterministic evaluations remain consistent with the documented methodology.

---

# 22. MCP Verification

MCP Verification confirms AI integration.

Examples include:

* Tool discovery.
* Request validation.
* Response envelopes.
* Version compatibility.
* Error handling.

The objective is to ensure deterministic Platform capabilities remain consistently accessible.

---

# 23. LLM Verification

The LLM is not responsible for financial calculations.

Therefore, LLM Verification evaluates communication rather than computation.

Questions include:

* Does the explanation accurately reflect the Decision Package?
* Are limitations communicated?
* Are conflicts explained?
* Is confidence represented correctly?
* Does the response avoid unsupported conclusions?

The LLM should never contradict deterministic Platform outputs.

---

# 24. Verification Dependencies

Verification proceeds from lower layers to higher layers.

```text id="d2c7fk"
Software

↓

Data

↓

Financial

↓

Evidence

↓

Signals

↓

Knowledge

↓

Decision Engine

↓

MCP

↓

LLM
```

Higher layers should rely on lower layers already being verified.

---

# 25. Failure Classification

Failures should be classified according to their verification layer.

Examples:

Software Failure

Implementation bug.

Data Failure

Invalid NAV.

Financial Failure

Incorrect CAGR.

Decision Failure

Incorrect Overall Score.

LLM Failure

Incorrect explanation.

Classification accelerates debugging and maintenance.

---

# 26. Verification Principles

Every verification layer follows these principles.

* Deterministic.
* Reproducible.
* Independently executable.
* Clearly documented.
* Automated where practical.

Verification should always identify which architectural layer failed.

---

# 27. Part 2 Summary

The Platform verifies correctness through multiple independent verification layers.

Each layer validates a different aspect of deterministic reasoning.

This layered strategy improves reliability, simplifies debugging, and ensures that business methodology remains as rigorously tested as the software itself.

# 28. Quality Gates

## Purpose

Quality Gates define the minimum standards that every Platform capability must satisfy before being considered complete.

A capability should progress to the next implementation stage only after all applicable quality gates have passed.

Quality Gates provide objective completion criteria for both human developers and AI coding assistants.

---

# 29. Code Quality Gate

Every implementation must satisfy the following:

* Builds successfully.
* No compilation errors.
* Linting passes.
* Formatting passes.
* Static analysis passes (where configured).

The codebase should remain clean and consistent after every change.

---

# 30. Test Quality Gate

All required automated tests must pass.

Examples include:

* Unit Tests.
* Integration Tests.
* End-to-End Tests.
* Regression Tests.

No known failing tests should remain in the main development branch.

---

# 31. Data Quality Gate

Collected data must satisfy validation requirements.

Examples:

* Required fields present.
* Referential integrity maintained.
* Historical consistency verified.
* Duplicate detection completed.
* Validation status recorded.

Invalid business data should not proceed to deterministic processing.

---

# 32. Financial Quality Gate

Financial calculations must be independently verified.

Examples:

* CAGR validated.
* Rolling Returns validated.
* Risk metrics validated.
* Portfolio calculations validated.

Reference datasets or independently verified calculations should be used whenever practical.

---

# 33. Decision Quality Gate

Decision Engine outputs must satisfy deterministic requirements.

Verify:

* Scores reproducible.
* Rankings reproducible.
* Confidence reproducible.
* Decision Packages reproducible.
* Policy versions correctly referenced.

Identical inputs must always produce identical outputs.

---

# 34. Explainability Gate

Every important deterministic conclusion should be explainable.

Questions include:

* Can the Overall Score be traced?
* Can category contributions be explained?
* Can supporting Evidence be identified?
* Can limitations be communicated?

Every major conclusion should remain traceable to deterministic inputs.

---

# 35. MCP Quality Gate

Every MCP capability should verify:

* Tool registration.
* Tool discovery.
* Request validation.
* Response envelope compliance.
* Structured errors.
* Version compatibility.

AI systems should receive consistent deterministic interfaces.

---

# 36. LLM Quality Gate

The LLM should accurately communicate deterministic Platform outputs.

Verify:

* No unsupported conclusions.
* No contradiction of Decision Packages.
* Correct representation of confidence.
* Correct explanation of limitations.
* Appropriate handling of uncertainty.

The LLM should communicate rather than reinterpret deterministic reasoning.

---

# 37. Performance Quality Gate

Performance should be evaluated using representative datasets.

Examples include:

* Plugin execution time.
* Decision Engine execution time.
* Repository retrieval time.
* MCP response latency.

Optimization should never compromise correctness or determinism.

---

# 38. Documentation Quality Gate

Every completed capability should include updated documentation.

Examples include:

* Architecture references.
* Plugin documentation.
* MCP documentation.
* API contracts.
* Example usage.

Documentation should accurately reflect implementation.

---

# 39. Demonstration Gate

Every completed iteration should provide a runnable demonstration.

Examples:

CLI

```text id="kr4b7m"
pnpm analyze fund "Parag Parikh Flexi Cap"
```

Output:

* Decision Package generated.
* Evidence displayed.
* Scores explained.

A capability should always be demonstrable without requiring unfinished future work.

---

# 40. Release Checklist

Before completing a milestone, verify:

| Requirement              | Complete |
| ------------------------ | -------- |
| Code builds              | □        |
| Tests pass               | □        |
| Validation passes        | □        |
| Decision Engine verified | □        |
| Documentation updated    | □        |
| Demonstration available  | □        |
| Architecture respected   | □        |
| No known regressions     | □        |

This checklist applies to every milestone.

---

# 41. Continuous Improvement

Quality Gates are expected to evolve.

Examples include:

* Additional verification layers.
* New financial metrics.
* Improved regression coverage.
* Better performance benchmarks.

New quality gates should strengthen the Platform without introducing unnecessary complexity.

---

# 42. Testing Strategy Summary

The Platform treats testing as a continuous architectural activity rather than a final implementation step.

Quality Gates ensure that every capability satisfies objective standards for:

* Correctness.
* Determinism.
* Explainability.
* Reproducibility.
* Documentation.
* Demonstrability.

A capability is considered complete only after successfully passing all applicable quality gates.
