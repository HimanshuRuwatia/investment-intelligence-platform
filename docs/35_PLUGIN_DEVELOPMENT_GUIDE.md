# 35_PLUGIN_DEVELOPMENT_GUIDE.md

> **Project:** Investment Intelligence Platform
>
> **Purpose:** Define the standard process for creating new Platform capabilities and Plugins.
>
> **Audience:** Developers and AI coding assistants.
>
> **Status:** Living Document
>
> **Priority:** Critical

---

# 1. Purpose

This document defines the official methodology for extending the Investment Intelligence Platform.

Every new business capability should be implemented using the Plugin architecture described in this guide.

Following a consistent approach ensures:

* Architectural consistency.
* Reusable implementations.
* Easier testing.
* Easier maintenance.
* Higher-quality AI-generated code.

---

# 2. Plugin Philosophy

Plugins encapsulate deterministic business logic.

Every Plugin owns one well-defined responsibility.

Examples include:

* Performance
* Risk
* Portfolio
* Macro
* News
* Sentiment

Plugins should remain independent whenever practical.

Business capabilities emerge from the collaboration of multiple Plugins rather than large monolithic implementations.

---

# 3. Capability vs Plugin

The Platform distinguishes between **Capabilities** and **Plugins**.

| Concept    | Responsibility                                      |
| ---------- | --------------------------------------------------- |
| Capability | Business domain (e.g. Performance, Risk, Portfolio) |
| Plugin     | Executable implementation within a Capability       |

A Capability may consist of one or more Plugins.

Version 1 will generally use one Plugin per Capability.

The architecture should allow future expansion without redesign.

---

# 4. Plugin Responsibilities

A Plugin MAY perform one or more of the following deterministic responsibilities:

* Data Collection
* Data Normalization
* Metric Generation
* Evidence Generation
* Signal Detection
* Knowledge Generation

A Plugin should never perform unrelated business responsibilities.

---

# 5. Plugin Design Principles

Every Plugin SHOULD be:

* Deterministic.
* Modular.
* Independently testable.
* Independently deployable within the Platform.
* Independently documented.

Plugins should communicate through documented Platform contracts.

---

# 6. Plugin Lifecycle

Every Plugin follows the same lifecycle.

```text id="pg1x8d"
Register

↓

Initialize

↓

Validate Configuration

↓

Execute

↓

Persist Outputs

↓

Report Health

↓

Shutdown
```

The lifecycle should remain consistent across all Plugins.

---

# 7. Plugin Registration

Every Plugin MUST register with the Platform Core.

Registration SHOULD include:

* Plugin Identifier
* Capability
* Version
* Description
* Supported Entity Types
* Dependencies

Registration enables discovery and lifecycle management.

---

# 8. Plugin Configuration

Every Plugin SHOULD expose explicit configuration.

Examples include:

* Data Provider
* Collection Frequency
* Retry Limits
* Validation Rules
* Feature Flags

Configuration should remain external to business logic.

---

# 9. Plugin Outputs

A Plugin may produce one or more deterministic outputs.

Examples include:

Primary Outputs

* Normalized Data
* Metrics
* Evidence
* Signals
* Knowledge

Operational Outputs

* Execution Metadata
* Health Information
* Validation Reports

Plugins should clearly distinguish between business outputs and operational outputs.

---

# 10. Part 1 Summary

Plugins are the primary extension mechanism of the Investment Intelligence Platform.

Every Plugin belongs to a Capability, follows a common lifecycle, exposes deterministic behavior, and communicates through documented Platform contracts.

Maintaining consistency across Plugins is essential for scalability, maintainability, and effective AI-assisted development.

# 11. Capability Manifest

## Purpose

Every Plugin MUST provide a Capability Manifest.

The Capability Manifest is the primary description of a Plugin.

It enables the Platform to understand a Plugin without inspecting its implementation.

The Manifest becomes the authoritative source of Plugin metadata.

---

# 12. Manifest Responsibilities

The Capability Manifest SHOULD describe:

* Plugin identity.
* Capability.
* Version.
* Purpose.
* Dependencies.
* Inputs.
* Outputs.
* Configuration.
* MCP Services.
* Health Checks.

The Manifest describes the Plugin.

It does not implement the Plugin.

---

# 13. Manifest Information

A typical Manifest SHOULD contain information such as:

General

* Plugin Identifier
* Plugin Name
* Capability
* Version
* Description

Business

* Supported Entity Types
* Generated Entity Types
* Primary Responsibility

Operational

* Configuration
* Scheduler Support
* Health Checks

Integration

* MCP Services
* Tool Names
* Repository Dependencies

The exact implementation format is intentionally left open.

---

# 14. Plugin Dependencies

Every Plugin SHOULD explicitly declare its dependencies.

Examples include:

Performance Plugin

Depends on:

* Fund Repository
* NAV Repository

Decision Engine

Depends on:

* Performance Plugin
* Risk Plugin
* Portfolio Plugin

Dependencies should be explicit rather than discovered implicitly.

---

# 15. Input Contracts

Plugins SHOULD define their expected inputs.

Examples include:

Performance Plugin

Inputs:

* NAV History
* Benchmark History

Risk Plugin

Inputs:

* NAV History

Portfolio Plugin

Inputs:

* Holdings

Input contracts improve validation and testing.

---

# 16. Output Contracts

Plugins SHOULD define deterministic outputs.

Examples include:

Performance Plugin

Outputs:

* Performance Metrics
* Performance Evidence
* Performance Signals
* Performance Knowledge

Operational outputs should be documented separately from business outputs.

---

# 17. Configuration Contract

Plugins SHOULD explicitly describe configurable behavior.

Examples include:

* Collection schedule.
* Retry limits.
* Data provider.
* Validation rules.
* Feature flags.

Configuration should remain declarative.

Business logic should not depend on hardcoded configuration values.

---

# 18. Repository Usage

The Manifest SHOULD identify which repositories are required.

Examples:

Reads:

* Fund Repository
* NAV Repository

Writes:

* Metric Repository
* Evidence Repository

Repository declarations improve dependency management.

---

# 19. MCP Exposure

If a Plugin exposes AI capabilities,

the Manifest SHOULD describe:

* MCP Service.
* Tool Names.
* Supported Operations.

This allows automatic Tool discovery.

---

# 20. Health Checks

Plugins SHOULD expose health information.

Typical health indicators include:

* Initialization status.
* Last successful execution.
* Data freshness.
* Validation status.
* Error count.

Health information supports diagnostics.

---

# 21. Capability Discovery

The Platform SHOULD discover Plugins by reading their Capability Manifests.

Discovery should not require loading Plugin business logic.

Discovery information includes:

* Capability.
* Version.
* Dependencies.
* MCP Services.
* Configuration.

Automatic discovery improves extensibility.

---

# 22. Manifest Evolution

Capability Manifests are expected to evolve.

New optional fields may be added without affecting existing Plugins.

Breaking changes should require a Manifest version increment.

---

# 23. Part 2 Summary

The Capability Manifest is the authoritative description of every Plugin.

It enables automatic discovery, dependency management, configuration, health monitoring, and MCP integration while keeping business implementation independent from Platform infrastructure.

Every Plugin should be understandable from its Manifest before examining its source code.

# 24. Plugin Structure

## Purpose

Every Plugin follows the same directory and architectural structure.

A consistent structure improves:

* Maintainability.
* Discoverability.
* AI-assisted development.
* Testing.
* Documentation.

Developers should be able to navigate any Plugin using the same mental model.

---

# 25. Plugin Layers

Each Plugin consists of three logical layers.

```text id="d7h2qw"
Plugin

├── Public Interface
├── Business Pipeline
└── Infrastructure
```

Each layer has clearly defined responsibilities.

---

# 26. Public Interface

The Public Interface exposes the Plugin to the Platform.

Typical components include:

* Capability Manifest
* Plugin Registration
* Public Contracts
* MCP Service (optional)

The Public Interface should contain minimal business logic.

---

# 27. Business Pipeline

The Business Pipeline contains deterministic business processing.

Typical stages include:

```text id="x6q4mj"
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
```

Each stage should perform one responsibility.

Pipeline stages should remain independently testable.

---

# 28. Infrastructure Layer

Infrastructure supports the Business Pipeline.

Examples include:

* Repository implementations.
* External provider clients.
* Logging.
* Configuration.
* Retry logic.
* Caching.

Infrastructure should never contain financial reasoning.

---

# 29. Recommended Directory Structure

A Plugin SHOULD follow a consistent directory layout.

```text id="p9f8yt"
performance/

├── manifest/
├── registration/
├── config/
├── collectors/
├── normalizers/
├── validators/
├── analyzers/
├── evidence/
├── signals/
├── knowledge/
├── repositories/
├── providers/
├── mcp/
├── health/
├── tests/
└── README.md
```

Not every Plugin will require every directory.

Unused directories should not be created unnecessarily.

---

# 30. Collector Responsibilities

Collectors retrieve external information.

Collectors SHOULD:

* Fetch data.
* Handle provider communication.
* Preserve raw information.

Collectors SHOULD NOT:

* Calculate financial metrics.
* Modify business meaning.
* Generate Evidence.

---

# 31. Normalizer Responsibilities

Normalizers transform provider-specific data into Platform entities.

Responsibilities include:

* Field mapping.
* Type conversion.
* Unit normalization.
* Standardized identifiers.

Normalizers should avoid business interpretation.

---

# 32. Validator Responsibilities

Validators verify collected information.

Typical responsibilities include:

* Required fields.
* Business rules.
* Referential integrity.
* Historical consistency.

Only validated information proceeds through the pipeline.

---

# 33. Analyzer Responsibilities

Analyzers generate deterministic Metrics.

Examples include:

* CAGR.
* Rolling Returns.
* Maximum Drawdown.
* Volatility.

Analyzers produce Metrics only.

They do not generate Evidence.

---

# 34. Evidence Builder Responsibilities

Evidence Builders convert Metrics into deterministic Evidence.

Examples:

Metric

↓

Evidence

Evidence Builders apply documented business rules.

They should never perform raw financial calculations.

---

# 35. Signal Detector Responsibilities

Signal Detectors identify patterns across Evidence.

Examples include:

* Improving Trend.
* Declining Consistency.
* Increasing Volatility.

Signals summarize deterministic observations.

---

# 36. Knowledge Builder Responsibilities

Knowledge Builders identify stable, long-term patterns.

Knowledge should emerge from multiple supporting Signals.

Knowledge should not be generated from isolated events.

---

# 37. Infrastructure Responsibilities

Infrastructure components include:

* Provider clients.
* Repository adapters.
* Configuration.
* Logging.
* Health monitoring.
* Retry mechanisms.

Infrastructure exists to support business processing without influencing business conclusions.

---

# 38. Plugin Structure Principles

Every Plugin should satisfy the following principles.

* Clear separation of concerns.
* Small focused modules.
* Deterministic processing.
* Independent testing.
* Consistent layout.
* Explicit dependencies.

A developer familiar with one Plugin should immediately understand another.

---

# 39. Part 3 Summary

Every Plugin follows a consistent layered architecture consisting of:

* Public Interface.
* Business Pipeline.
* Infrastructure.

This structure separates business reasoning from operational concerns while providing a predictable implementation model for both developers and AI coding assistants.

# 40. Plugin Development Workflow

## Purpose

Every Plugin should be developed using the same structured workflow.

The workflow minimizes architectural drift and ensures that every Plugin integrates consistently with the Platform.

The workflow applies equally to human developers and AI coding assistants.

---

# 41. Step 1 — Define the Capability

Before writing any code, define the business capability.

Questions to answer include:

* What business problem does this Plugin solve?
* What deterministic responsibility does it own?
* Which Capability does it belong to?
* What is explicitly outside its scope?

The Capability definition becomes the foundation for the Plugin.

---

# 42. Step 2 — Define Inputs

Identify all required inputs.

Examples include:

Business Inputs

* NAV History
* Holdings
* Benchmark Data

Platform Inputs

* Configuration
* Existing Evidence
* Existing Knowledge

Every input should have a documented source.

---

# 43. Step 3 — Define Outputs

Identify deterministic outputs.

Examples include:

* Metrics
* Evidence
* Signals
* Knowledge
* Validation Reports

Outputs should be clearly documented before implementation begins.

---

# 44. Step 4 — Design the Processing Pipeline

Design the internal business pipeline.

Example:

```text id="m5k8rz"
Collect

↓

Normalize

↓

Validate

↓

Generate Metrics

↓

Generate Evidence

↓

Generate Signals

↓

Generate Knowledge

↓

Persist
```

Each stage should have one responsibility.

---

# 45. Step 5 — Create the Capability Manifest

Implement the Capability Manifest.

The Manifest should describe:

* Identity
* Version
* Inputs
* Outputs
* Dependencies
* Configuration
* MCP Services

The Platform should be able to discover the Plugin before it executes.

---

# 46. Step 6 — Implement Infrastructure

Build infrastructure components first.

Examples include:

* Provider Clients
* Repository Adapters
* Configuration
* Logging
* Validation Framework

Infrastructure should exist before business processing begins.

---

# 47. Step 7 — Implement Business Pipeline

Implement one pipeline stage at a time.

Recommended order:

1. Collector
2. Normalizer
3. Validator
4. Analyzer
5. Evidence Builder
6. Signal Detector
7. Knowledge Builder

Complete each stage before moving to the next.

---

# 48. Step 8 — Persist Outputs

Persist deterministic outputs through the Evidence Store.

Business components should never communicate directly with database implementations.

Repositories remain the only persistence interface.

---

# 49. Step 9 — Testing

Test each stage independently.

Recommended order:

* Unit Tests
* Integration Tests
* End-to-End Tests

The complete pipeline should produce deterministic outputs.

---

# 50. Step 10 — Platform Registration

Register the completed Plugin with the Platform.

Registration includes:

* Plugin Manager
* Capability Discovery
* Health Monitoring
* Scheduler (if required)
* MCP Services (if exposed)

The Platform should recognize the Plugin automatically through its Capability Manifest whenever possible.

---

# 51. Step 11 — Documentation

Every completed Plugin should include documentation.

Minimum documentation includes:

* Purpose
* Inputs
* Outputs
* Processing Pipeline
* Configuration
* Dependencies
* Limitations
* Example Usage

Documentation should evolve alongside implementation.

---

# 52. Definition of Done

A Plugin is complete only when:

* Architecture followed.
* Manifest implemented.
* Pipeline implemented.
* Tests passing.
* Documentation updated.
* Deterministic outputs verified.
* Successfully registered with the Platform.

A partially completed Plugin should not be considered production-ready.

---

# 53. Development Principles

Plugin development follows these principles.

* Business-first.
* Deterministic processing.
* Incremental implementation.
* Independent testing.
* Explicit dependencies.
* Consistent architecture.

Every Plugin should be understandable, testable, and maintainable in isolation.

---

# 54. Part 4 Summary

The Plugin Development Workflow provides a repeatable process for extending the Platform.

Every Plugin progresses through the same stages:

* Capability definition.
* Pipeline design.
* Implementation.
* Testing.
* Registration.
* Documentation.

Following this workflow ensures architectural consistency while making Plugin development predictable for both developers and AI coding assistants.

# 55. Plugin Integration

## Purpose

A Plugin becomes part of the Platform only after successful integration.

Integration standardizes how Plugins interact with the Platform Core and other Platform components.

Implementation and integration are separate concerns.

---

# 56. Plugin Lifecycle States

Every Plugin progresses through defined lifecycle states.

```text id="a7v9pk"
Discovered

↓

Validated

↓

Registered

↓

Initialized

↓

Healthy

↓

Executing

↓

Idle

↓

Disabled
```

State transitions should be managed by the Platform Core.

Plugins should not manage their own lifecycle.

---

# 57. Platform Startup

During Platform startup:

1. Discover Capability Manifests.
2. Validate Manifests.
3. Resolve dependencies.
4. Register Plugins.
5. Initialize infrastructure.
6. Perform health checks.
7. Enable execution.

Startup should fail gracefully if required dependencies are unavailable.

---

# 58. Dependency Resolution

Dependencies should be resolved before Plugin initialization.

Examples:

Performance Plugin

↓

Requires

↓

Fund Repository

↓

NAV Repository

If required dependencies cannot be satisfied, the Plugin should not enter the Healthy state.

---

# 59. Health Monitoring

Every Plugin SHOULD expose health information.

Examples include:

* Current lifecycle state.
* Last successful execution.
* Data freshness.
* Validation status.
* Error count.
* Average execution time.

Health information supports operational monitoring.

---

# 60. Scheduler Integration

Plugins MAY register scheduled tasks.

Examples include:

* Daily NAV collection.
* Weekly holdings refresh.
* Monthly macro update.

Scheduling remains owned by the Platform Scheduler.

Plugins declare schedules but do not execute themselves.

---

# 61. MCP Integration

Plugins MAY expose one or more MCP Services.

Platform responsibilities include:

* Service registration.
* Tool discovery.
* Version reporting.
* Request routing.

Plugins provide business capabilities.

The MCP runtime exposes those capabilities.

---

# 62. Repository Integration

Plugins SHOULD interact with persistence exclusively through Repository contracts.

Plugins SHOULD NOT:

* Execute SQL.
* Depend on SQLite.
* Depend on PostgreSQL.

Persistence implementation remains invisible to Plugin business logic.

---

# 63. Event Integration (Future)

Future Platform versions MAY support internal events.

Examples include:

* NAV Updated.
* Decision Package Generated.
* Plugin Execution Completed.

Plugins may subscribe to documented Platform events without creating tight coupling.

This capability is intentionally deferred.

---

# 64. Failure Handling

Plugin failures should remain isolated.

Examples:

Recoverable

* Temporary provider unavailable.

Action:

Retry according to documented policy.

Non-Recoverable

* Invalid Manifest.

Action:

Prevent Plugin initialization.

Failures should not compromise unrelated Plugins.

---

# 65. Plugin Upgrade Strategy

Plugins are expected to evolve.

Upgrades SHOULD preserve:

* Capability identity.
* Repository contracts.
* MCP contracts.
* Deterministic behavior whenever possible.

Breaking changes should be versioned explicitly.

---

# 66. Plugin Compatibility

Every Plugin SHOULD declare compatibility with:

* Platform Version.
* Manifest Version.
* MCP Version.
* Repository Contracts.

Compatibility checks occur before initialization.

---

# 67. Plugin Isolation

Plugins SHOULD remain isolated.

They should communicate through:

* Repository contracts.
* Platform services.
* Documented APIs.
* Platform events (future).

Direct Plugin-to-Plugin dependencies should be minimized.

---

# 68. Plugin Observability

The Platform SHOULD monitor Plugin execution.

Typical metrics include:

* Execution count.
* Success rate.
* Failure rate.
* Average duration.
* Validation failures.

Observability improves debugging and long-term maintenance.

---

# 69. Plugin Integration Principles

The Platform follows these principles.

* Automatic discovery.
* Explicit dependencies.
* Platform-managed lifecycle.
* Strong isolation.
* Deterministic execution.
* Standardized integration.

These principles ensure that new Plugins integrate consistently without introducing architectural complexity.

---

# 70. Plugin Development Guide Summary

Plugins are the primary extension mechanism of the Investment Intelligence Platform.

Every Plugin:

* Belongs to a Capability.
* Exposes a Capability Manifest.
* Follows a standard structure.
* Implements a deterministic business pipeline.
* Integrates through the Platform Core.
* Remains independently testable and maintainable.

Following this guide ensures that every new capability can be added with minimal architectural decisions while preserving consistency across the Platform.
