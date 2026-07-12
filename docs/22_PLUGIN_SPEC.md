# 22_PLUGIN_SPEC.md

> **Project:** Investment Intelligence Platform
>
> **Purpose:** Define the standard specification that every Plugin MUST follow.
>
> **Audience:** Developers and AI coding assistants.
>
> **Status:** Living Document
>
> **Priority:** Critical

---

# 1. Purpose

This document defines the Plugin Specification for the Investment Intelligence Platform.

Every business capability MUST be implemented as a Plugin.

The purpose of this specification is to ensure that:

* All Plugins behave consistently.
* All Plugins are independently understandable.
* All Plugins can be managed uniformly by the Platform Core.
* AI coding assistants can generate new Plugins without inventing architecture.

Every Plugin MUST satisfy this specification unless an explicit architectural exception has been documented.

---

# 2. Plugin Philosophy

A Plugin represents one business capability.

Examples include:

* Performance
* Risk
* Consistency
* Holdings
* Strategy
* Macro
* News
* Sentiment

A Plugin owns its business logic completely.

The Platform Core owns infrastructure.

This separation should remain stable throughout the life of the project.

---

# 3. Plugin Goals

Every Plugin SHOULD satisfy the following goals.

## Goal 1

Own one business capability.

---

## Goal 2

Remain independently understandable.

A developer should understand a Plugin without reading unrelated Plugins.

---

## Goal 3

Produce deterministic outputs whenever practical.

---

## Goal 4

Generate explainable Evidence.

---

## Goal 5

Remain independently testable.

---

## Goal 6

Expose a stable public interface.

---

## Goal 7

Integrate cleanly with the Platform Core.

---

# 4. Plugin Lifecycle

Every Plugin follows the same lifecycle.

```text
Plugin Registration
        │
        ▼
Configuration Validation
        │
        ▼
Initialization
        │
        ▼
Execution
        │
        ▼
Evidence Generation
        │
        ▼
Persistence
        │
        ▼
Health Reporting
        │
        ▼
Idle
```

A Plugin may execute repeatedly throughout its lifetime.

Execution should remain deterministic.

---

# 5. Plugin Responsibilities

Every Plugin MUST own:

* Data collection
* Data normalization
* Business analysis
* Evidence generation
* Signal detection
* Knowledge generation
* Plugin configuration
* Plugin-specific tests

A Plugin MAY additionally provide:

* MCP tools
* API endpoints
* CLI commands
* Scheduled jobs

---

# 6. Plugin MUST NOT

A Plugin MUST NOT:

* Modify another Plugin's business data.
* Import another Plugin's analyzers.
* Perform Platform orchestration.
* Manage scheduling.
* Invoke unrelated Plugins.
* Contain user interface logic.
* Depend on undocumented contracts.

Business capabilities remain isolated.

---

# 7. Plugin Inputs

A Plugin MAY consume:

* External APIs
* Files
* Database records
* Configuration
* Execution requests
* Time

Plugins SHOULD avoid consuming outputs produced directly by other Plugins.

Shared information should be retrieved through documented Platform interfaces.

---

# 8. Plugin Outputs

Every Plugin SHOULD produce structured outputs.

Examples include:

* Metrics
* Evidence
* Signals
* Knowledge
* Diagnostics
* Health information

Outputs MUST remain independently understandable.

Outputs SHOULD preserve traceability.

---

# 9. Plugin Ownership

Each Plugin has exclusive ownership over its business capability.

Example:

Performance Plugin owns:

* Rolling Returns
* CAGR
* Annualized Returns

Risk Plugin owns:

* Volatility
* Sharpe Ratio
* Drawdown

Ownership should never overlap.

If two Plugins appear to own the same business logic, the architecture should be reconsidered.

---

# 10. Plugin Independence

Plugins MUST remain independent.

The following principles apply.

Plugins SHOULD communicate through:

* Platform Core
* Evidence Store
* Shared contracts

Plugins MUST NOT communicate through:

* Internal classes
* Direct method calls
* Shared mutable state

Isolation improves maintainability, testing, and extensibility.

---

# 11. Plugin Categories

The Platform may contain multiple categories of Plugins.

Examples include:

Analysis Plugins

* Performance
* Risk
* Consistency

Market Plugins

* Macro
* News
* Sentiment

Portfolio Plugins

* Holdings
* Diversification
* Overlap

Infrastructure Plugins (future)

* Notifications
* Reports
* Export

All Plugin categories follow the same specification.

Only their business capability differs.

---

# 12. Plugin Success Criteria

A Plugin is considered complete when:

* It implements the Plugin Contract.
* It produces deterministic outputs.
* It generates explainable Evidence.
* It integrates with the Platform Core.
* It passes automated tests.
* It exposes observable execution.
* It documents its configuration.
* It follows the repository structure.
* It preserves architectural invariants.

Partial implementations are not considered complete.

---

# 13. Part 1 Summary

This section defines what a Plugin is and what responsibilities it owns.

The following sections will define:

* Standard Plugin directory structure
* Required components
* Optional components
* Public interfaces
* Configuration model
* Testing requirements
* MCP integration
* Plugin registration
* Quality checklist

Every Plugin in the Platform will conform to these specifications.

# 14. Standard Plugin Directory Structure

Every Plugin MUST follow the same directory structure.

Consistency is more valuable than individual preferences.

The following structure is the canonical layout.

```text
plugin-name/

├── collectors/
├── normalizers/
├── analyzers/
├── detectors/
├── knowledge/
├── models/
├── contracts/
├── services/
├── config/
├── mcp/
├── api/
├── tests/
├── README.md
└── plugin.ts
```

Every Plugin SHOULD use this layout even if some directories are initially empty.

A predictable structure reduces cognitive load for both humans and AI coding assistants.

---

# 15. Required Components

The following components are mandatory for every Plugin.

| Component     | Required |
| ------------- | -------- |
| plugin entry  | Yes      |
| configuration | Yes      |
| models        | Yes      |
| contracts     | Yes      |
| tests         | Yes      |
| README        | Yes      |

These components define the minimum Plugin skeleton.

---

# 16. Optional Components

The following components should be added only if required.

| Component   | Required                              |
| ----------- | ------------------------------------- |
| collectors  | Depends on external data              |
| normalizers | Depends on external data              |
| analyzers   | Depends on deterministic calculations |
| detectors   | Depends on signal generation          |
| knowledge   | Depends on long-term learning         |
| api         | Optional                              |
| mcp         | Optional                              |
| services    | Optional                              |

Avoid creating empty abstractions simply because the directory exists.

Only add implementation when the business capability requires it.

---

# 17. Plugin Entry

## Purpose

Every Plugin MUST expose exactly one entry point.

Example:

```text
plugin.ts
```

The entry point represents the public interface of the Plugin.

---

## Responsibilities

The Plugin entry MUST:

* Register the Plugin.
* Validate configuration.
* Initialize components.
* Expose lifecycle methods.
* Report Plugin metadata.

---

## MUST NOT

The entry point MUST NOT:

* Perform business analysis.
* Calculate financial metrics.
* Fetch external data.
* Contain business rules.

Its responsibility is orchestration.

---

# 18. Collectors

## Purpose

Acquire external information.

Collectors are responsible for communication with external systems.

---

## Responsibilities

Collectors SHOULD:

* Download data.
* Validate responses.
* Retry failures.
* Handle authentication.
* Respect rate limits.

---

## Outputs

Collectors produce:

Raw Data.

---

## MUST NOT

Collectors MUST NOT:

* Normalize data.
* Calculate metrics.
* Generate Evidence.
* Invoke LLMs.

---

# 19. Normalizers

## Purpose

Convert Raw Data into internal domain models.

---

## Responsibilities

Normalizers SHOULD:

* Standardize field names.
* Validate required fields.
* Convert units.
* Parse provider-specific formats.

---

## Outputs

Normalized Data.

---

## MUST NOT

Normalizers MUST NOT:

* Perform financial analysis.
* Generate Scores.
* Detect Signals.

---

# 20. Analyzers

## Purpose

Generate deterministic financial Metrics and Evidence.

Analyzers are the mathematical engine of the Plugin.

---

## Responsibilities

Analyzers SHOULD:

* Consume Normalized Data.
* Calculate Metrics.
* Produce Evidence.

---

## Outputs

* Metrics
* Evidence

---

## MUST NOT

Analyzers MUST NOT:

* Fetch data.
* Call external APIs.
* Modify stored Evidence.
* Invoke LLMs.

---

# 21. Detectors

## Purpose

Identify meaningful financial relationships.

---

## Responsibilities

Detectors SHOULD:

* Consume Evidence.
* Produce Signals.

Each Detector should answer one business question.

Examples:

* Is volatility increasing?
* Has sector allocation changed?
* Has performance become more consistent?

---

## MUST NOT

Detectors MUST NOT:

* Calculate Metrics.
* Access external providers.

---

# 22. Knowledge Builders

## Purpose

Transform repeated Signals into stable Knowledge.

Knowledge Builders accumulate long-term understanding.

---

## Responsibilities

Knowledge Builders SHOULD:

* Consume Signals.
* Detect recurring patterns.
* Generate Knowledge.
* Update historical understanding.

---

## MUST NOT

Knowledge Builders MUST NOT:

* Analyze Raw Data.
* Produce Metrics.
* Replace historical Knowledge without preserving traceability.

---

# 23. Models

## Purpose

Represent Plugin-specific business entities.

Examples include:

Performance Plugin:

* Rolling Return
* Annual Return

Risk Plugin:

* Drawdown
* Volatility

Models should represent domain concepts rather than implementation details.

---

# 24. Contracts

## Purpose

Define the public interfaces exposed by the Plugin.

Contracts enable:

* Stable integrations.
* Independent testing.
* Clear ownership.

Consumers should depend on Contracts rather than concrete implementations.

---

# 25. Services

## Purpose

Encapsulate reusable Plugin-specific logic.

Examples:

* Provider selection.
* Data aggregation.
* Internal orchestration.

Services remain internal to the Plugin.

Services MUST NOT become generic dumping grounds for unrelated logic.

---

# 26. Configuration

Each Plugin SHOULD maintain its own configuration.

Examples:

* API endpoints.
* Collection intervals.
* Feature toggles.
* Retry policies.

Configuration should remain declarative.

Business rules belong inside code rather than configuration.

---

# 27. Plugin README

Every Plugin MUST contain its own README.

The README SHOULD describe:

* Plugin purpose.
* Responsibilities.
* Supported outputs.
* Configuration.
* Execution flow.
* Known limitations.

A developer should understand the Plugin without reading its implementation.

---

# 28. Plugin Documentation

Every Plugin should document:

* Public interfaces.
* Important algorithms.
* Business assumptions.
* External dependencies.

Documentation should explain "why" rather than repeating the code.

---

# 29. Component Summary

Every Plugin follows the same internal organization.

The Platform should never require Plugin-specific folder conventions.

Standardization enables:

* Faster onboarding.
* Better AI-generated code.
* Easier navigation.
* Lower maintenance cost.
* Predictable repository structure.

Every new Plugin should look familiar before its implementation is even examined.

# 30. Plugin Public Contract

## Purpose

Every Plugin exposes a public contract to the Platform Core.

The Platform Core MUST interact only through this contract.

The Platform Core MUST NOT depend on internal Plugin implementation details.

This allows Plugins to evolve internally without affecting the rest of the Platform.

---

# 31. Required Lifecycle Operations

Every Plugin MUST support the following lifecycle operations.

| Operation              | Purpose                     | Required |
| ---------------------- | --------------------------- | -------- |
| Register               | Register Plugin metadata    | Yes      |
| Initialize             | Allocate internal resources | Yes      |
| Validate Configuration | Verify Plugin configuration | Yes      |
| Execute                | Execute the Plugin          | Yes      |
| Report Health          | Return operational status   | Yes      |
| Shutdown               | Release resources           | Yes      |

The Platform Core should be able to execute these operations for every Plugin without special handling.

---

# 32. Plugin Metadata

Every Plugin MUST expose metadata.

The metadata allows the Platform Core to understand the Plugin before execution.

Typical metadata includes:

* Plugin Identifier
* Plugin Name
* Plugin Version
* Description
* Owner
* Supported Asset Classes
* Supported Capabilities
* Configuration Version
* Current Status

Metadata should remain lightweight.

Metadata should not contain business data.

---

# 33. Configuration Contract

Every Plugin MUST validate its configuration before execution.

Configuration validation should fail fast.

Examples of validation include:

* Required API credentials.
* Required configuration values.
* Valid scheduling configuration.
* Compatible Plugin version.

Invalid configuration should prevent Plugin execution.

---

# 34. Execution Contract

Plugin execution MUST be deterministic whenever practical.

Execution SHOULD follow the documented processing pipeline.

Execution begins only after successful initialization and configuration validation.

The Platform Core should treat Plugin execution as an isolated operation.

---

# 35. Execution Result

Every execution MUST produce a structured execution result.

The result SHOULD summarize:

* Execution status
* Start time
* End time
* Duration
* Records collected
* Records processed
* Metrics generated
* Evidence generated
* Signals generated
* Knowledge generated
* Errors
* Warnings

Execution results support monitoring and debugging.

---

# 36. Health Contract

Every Plugin MUST expose operational health.

Health information SHOULD answer questions such as:

* Is the Plugin available?
* Did the last execution succeed?
* Are external providers reachable?
* Is the Plugin correctly configured?

Health reporting should remain lightweight.

Health checks should not trigger full Plugin execution.

---

# 37. Error Handling Contract

Plugins should classify failures consistently.

| Failure Type      | Expected Behaviour                    |
| ----------------- | ------------------------------------- |
| Recoverable       | Retry if appropriate                  |
| Configuration     | Fail immediately                      |
| External Provider | Report and continue where possible    |
| Internal Logic    | Fail safely and preserve diagnostics  |
| Unexpected        | Log, isolate, and terminate execution |

Failures should never corrupt deterministic outputs.

---

# 38. Plugin State

Plugins SHOULD minimize internal state.

Preferred approach:

Stateless processing.

Examples of acceptable state:

* Cached provider metadata.
* Temporary execution context.
* Validated configuration.

Examples of unacceptable state:

* Hidden business decisions.
* Undocumented caches affecting calculations.
* Cross-execution mutable financial data.

Business state belongs in persistent storage, not memory.

---

# 39. Scheduling

Plugins SHOULD NOT schedule themselves.

Scheduling is owned by the Platform Core.

Plugins should simply declare:

* Whether scheduling is supported.
* Suggested execution frequency.
* Dependencies on data freshness.

The Platform Core decides when execution occurs.

---

# 40. Plugin Registration

Registration makes a Plugin discoverable.

Registration SHOULD provide:

* Metadata
* Configuration requirements
* Lifecycle implementation
* Supported capabilities

Registration MUST occur before initialization.

A Plugin that fails registration should not participate in Platform execution.

---

# 41. Capability Declaration

Every Plugin SHOULD explicitly declare its capabilities.

Examples include:

Performance Plugin

* Performance Analysis
* Rolling Returns
* CAGR

Macro Plugin

* Inflation Analysis
* Interest Rate Monitoring
* GDP Analysis

Capability declarations improve discoverability and future automation.

---

# 42. Asset Class Declaration

Every Plugin SHOULD declare which asset classes it supports.

Examples:

* Mutual Funds
* ETFs
* Stocks
* Bonds

Future Plugins may support multiple asset classes.

The Platform Core should not infer asset class support.

---

# 43. Observability Requirements

Every Plugin SHOULD expose observable execution information.

Minimum recommended information:

* Execution identifier
* Plugin version
* Start time
* End time
* Duration
* Records processed
* Evidence generated
* Errors
* Warnings

Observability should be consistent across all Plugins.

---

# 44. Documentation Requirements

Every Plugin MUST include documentation.

Minimum documentation:

* Purpose
* Responsibilities
* Processing pipeline
* Configuration
* Public contract
* Known limitations

Documentation is considered part of the Plugin.

---

# 45. Plugin Testing Requirements

Every Plugin SHOULD contain:

Unit Tests

* Collectors
* Normalizers
* Analyzers
* Detectors
* Knowledge Builders

Integration Tests

* Plugin execution
* Persistence
* Platform integration

Future End-to-End Tests

* Complete processing flow
* Query flow

Testing should follow the same structure as the Plugin implementation.

---

# 46. Plugin Compliance Checklist

Before a Plugin is considered complete, verify the following.

| Requirement                         | Complete |
| ----------------------------------- | -------- |
| Plugin registered                   | □        |
| Configuration validated             | □        |
| Processing pipeline implemented     | □        |
| Evidence generated                  | □        |
| Signals generated (if applicable)   | □        |
| Knowledge generated (if applicable) | □        |
| Health reporting implemented        | □        |
| Tests written                       | □        |
| Documentation completed             | □        |
| Architecture rules followed         | □        |

This checklist should be satisfied before merging a Plugin into the Platform.

---

# 47. Part 3 Summary

Every Plugin interacts with the Platform through a stable public contract.

The Platform Core should never require Plugin-specific behavior.

Plugins remain independently executable, independently testable, and independently observable.

Standardized contracts allow the Platform to grow by adding new Plugins rather than modifying existing infrastructure.

This specification is intentionally strict because consistency across Plugins is one of the Platform's most important long-term architectural goals.

# 48. Plugin Configuration Specification

## Purpose

Every Plugin MUST support configuration through a standardized mechanism.

Configuration allows the Platform to customize Plugin behavior without modifying source code.

Configuration controls execution.

Configuration does **not** define business logic.

---

# 49. Configuration Principles

Every Plugin configuration SHOULD be:

* Explicit
* Validated
* Versioned
* Immutable during execution
* Independently testable

Configuration should be loaded once during Plugin initialization.

The Plugin should not repeatedly reload configuration during execution unless explicitly requested by the Platform Core.

---

# 50. Configuration Categories

Plugin configuration SHOULD be divided into logical sections.

| Category      | Examples                                          |
| ------------- | ------------------------------------------------- |
| General       | Plugin name, version, enabled flag                |
| Data Sources  | API endpoints, authentication, provider selection |
| Processing    | Batch size, retry policy, concurrency             |
| Scheduling    | Recommended execution frequency                   |
| Feature Flags | Optional capabilities                             |
| Logging       | Log level, diagnostics                            |
| MCP           | MCP tool exposure settings                        |

Each category should remain focused on one concern.

---

# 51. Secrets Management

Sensitive information MUST NOT be hardcoded.

Examples include:

* API Keys
* Authentication Tokens
* Database Credentials

Plugins should receive secrets from the Platform configuration layer.

Business logic should never know where secrets originate.

---

# 52. Plugin Initialization

Initialization prepares a Plugin for execution.

Initialization MAY include:

* Loading configuration
* Validating dependencies
* Initializing clients
* Creating internal services
* Registering health checks

Initialization MUST NOT perform business analysis.

Initialization should complete quickly.

---

# 53. Execution Context

Every Plugin execution SHOULD receive a structured execution context.

The execution context represents runtime information rather than business data.

Typical information includes:

* Execution Identifier
* Start Timestamp
* Trigger Source
* Requested Scope
* Correlation Identifier
* Environment

The execution context should remain immutable throughout execution.

---

# 54. Trigger Sources

Plugins may execute for different reasons.

Supported trigger sources include:

| Trigger      | Description                 |
| ------------ | --------------------------- |
| Scheduler    | Regular scheduled execution |
| Manual       | User initiated execution    |
| CLI          | Local development           |
| API          | External request            |
| Test         | Automated testing           |
| Future Event | Event-driven execution      |

Plugins SHOULD behave consistently regardless of trigger source.

---

# 55. Logging Requirements

Every Plugin SHOULD generate structured logs.

Recommended log events include:

Initialization

Configuration Validation

Collector Start

Collector Complete

Analyzer Start

Analyzer Complete

Evidence Generated

Signals Generated

Knowledge Generated

Execution Complete

Execution Failed

Logs should describe events rather than internal implementation details.

---

# 56. Metrics and Diagnostics

Each Plugin SHOULD expose operational metrics.

Examples include:

* Execution duration
* Records collected
* Records normalized
* Metrics calculated
* Evidence generated
* Signals generated
* Knowledge objects generated
* Errors encountered
* Retry count

Operational metrics support monitoring and future optimization.

They are separate from financial Metrics.

---

# 57. Plugin Health

Health reporting SHOULD distinguish between operational health and business correctness.

Examples:

Operational Health

* Can external provider be reached?
* Is configuration valid?
* Did initialization succeed?

Business Correctness

* Were calculations completed?
* Was Evidence generated?
* Were validation rules satisfied?

These concepts should remain separate.

---

# 58. Retry Policy

Retries should occur only for recoverable failures.

Examples:

Retry Appropriate

* Temporary network failure
* Rate limiting
* Service unavailable

Retry Not Appropriate

* Invalid configuration
* Invalid input data
* Programming errors
* Contract violations

Retries should never produce duplicate deterministic outputs.

---

# 59. Timeouts

Plugins SHOULD define reasonable execution timeouts.

Examples include:

* External API request timeout
* Collector timeout
* Plugin execution timeout

Timeout values should be configurable.

A timeout should fail gracefully and preserve diagnostic information.

---

# 60. Backward Compatibility

Plugins SHOULD evolve without breaking the Platform.

Examples of compatible changes:

* New Analyzer
* Additional Evidence fields
* New MCP tool
* Improved internal algorithms

Examples of incompatible changes:

* Removing required outputs
* Changing public contracts
* Breaking Plugin registration
* Removing deterministic behavior

Breaking changes require explicit version updates.

---

# 61. Plugin Versioning

Every Plugin SHOULD maintain its own version.

A version change SHOULD occur when:

* Public contract changes.
* Processing logic changes materially.
* Configuration schema changes.
* Deterministic outputs change.

Internal refactoring without behavioral changes does not necessarily require a Plugin version change.

---

# 62. Deprecation Policy

Plugins evolve over time.

Deprecated functionality SHOULD:

* Be documented.
* Continue working during a transition period where practical.
* Provide clear migration guidance.
* Avoid silent behavior changes.

Removal should occur only after consumers have a documented migration path.

---

# 63. Plugin Readiness Checklist

A Plugin is considered production-ready (or locally complete during early development) when the following are satisfied.

| Requirement                          | Complete |
| ------------------------------------ | -------- |
| Configuration validated              | □        |
| Initialization succeeds              | □        |
| Deterministic processing implemented | □        |
| Operational logging implemented      | □        |
| Health reporting implemented         | □        |
| Retry behavior documented            | □        |
| Timeouts configured                  | □        |
| Version assigned                     | □        |
| Documentation updated                | □        |
| Tests passing                        | □        |

---

# 64. Plugin Operational Principles

The following principles apply to every Plugin.

* Configuration is explicit.
* Secrets are externalized.
* Execution is deterministic.
* Logging is structured.
* Health is observable.
* Failures are isolated.
* Retries are controlled.
* Versioning is deliberate.
* Backward compatibility is respected whenever practical.

Operational consistency is as important as architectural consistency.

---

# 65. Part 4 Summary

A Plugin is more than business logic.

It is an independently executable, configurable, observable, versioned, and testable unit of functionality.

By standardizing operational behavior across all Plugins, the Platform ensures that every new capability integrates predictably with the existing ecosystem while remaining easy to operate, debug, and evolve.

# 66. MCP Integration Specification

## Purpose

Plugins MAY expose functionality through the Model Context Protocol (MCP).

MCP provides a standardized mechanism for AI models to interact with deterministic components of the Platform.

An MCP endpoint should expose capabilities.

It should not expose implementation details.

---

# 67. MCP Philosophy

The MCP layer is an interface.

It is **not** where business logic lives.

Business logic belongs inside the Plugin.

The MCP layer simply makes Plugin capabilities available to AI assistants.

The architecture should therefore be:

```text
User
    │
    ▼
LLM
    │
    ▼
MCP
    │
    ▼
Plugin
```

The LLM never bypasses MCP to access Plugin internals.

---

# 68. MCP Design Principles

Every MCP tool SHOULD be:

* Small
* Focused
* Deterministic
* Independently testable
* Independently discoverable

A single MCP tool should perform one business task well.

Avoid "god tools" that attempt to answer every question.

---

# 69. MCP Tool Categories

Plugins MAY expose multiple MCP tools.

Examples include:

Data Retrieval

* Retrieve NAV history
* Retrieve Holdings
* Retrieve Scores

Analysis

* Compare funds
* Explain Score
* Retrieve Evidence

Diagnostics

* Plugin Health
* Plugin Status
* Execution History

Administrative

* Refresh Plugin
* Validate Configuration

---

# 70. MCP Tool Requirements

Every MCP tool SHOULD clearly define:

| Property    | Description            |
| ----------- | ---------------------- |
| Name        | Unique tool name       |
| Description | Human-readable purpose |
| Input       | Required parameters    |
| Output      | Structured response    |
| Errors      | Possible failure modes |
| Owner       | Plugin responsible     |

Every tool should have one obvious responsibility.

---

# 71. MCP Input Principles

Inputs SHOULD be:

* Explicit
* Strongly typed
* Minimal
* Validated

Examples:

Good

* Fund Identifier
* Category
* Time Period

Poor

* Generic JSON blob
* Free-form configuration
* Ambiguous objects

The Platform should reject invalid requests before invoking business logic.

---

# 72. MCP Output Principles

Every MCP response SHOULD be structured.

Responses MAY contain:

* Metrics
* Evidence
* Signals
* Knowledge
* Scores
* Metadata

Responses SHOULD NOT contain:

* Natural-language investment advice
* Hidden calculations
* Internal implementation details

LLMs generate explanations.

Plugins generate facts.

---

# 73. Tool Granularity

Prefer multiple focused tools over one large tool.

Preferred:

Performance Plugin

* Get Performance Metrics
* Get Rolling Returns
* Get Performance Evidence
* Explain Performance Score

Avoid:

Performance Plugin

* Do Everything

Smaller tools are easier to test, document, and compose.

---

# 74. MCP Error Handling

MCP responses SHOULD distinguish between:

Validation Errors

Examples:

* Missing Fund Identifier
* Invalid date range

Execution Errors

Examples:

* External provider unavailable
* Plugin execution failed

Platform Errors

Examples:

* Plugin not registered
* Plugin disabled

Errors should be structured and machine-readable.

---

# 75. Discoverability

The Platform SHOULD support automatic discovery of available MCP tools.

Each Plugin should publish:

* Supported tools
* Tool descriptions
* Supported asset classes
* Required parameters

This enables future dynamic tool selection.

---

# 76. Capability Manifest

Every Plugin SHOULD expose a Capability Manifest.

The Capability Manifest describes what the Plugin can do.

Example information includes:

Plugin

Performance

Capabilities

* Calculate CAGR
* Calculate Rolling Returns
* Generate Performance Evidence
* Generate Performance Scores

Supported Entities

* Fund
* NAV
* Metric
* Evidence

Supported Asset Classes

* Mutual Funds

Supported MCP Tools

* Get Performance Metrics
* Compare Funds
* Explain Score

The Capability Manifest is metadata.

It contains no business logic.

---

# 77. AI Interaction Model

The expected interaction pattern is:

```text
User Question
        │
        ▼
LLM
        │
        ▼
Determine Required Capability
        │
        ▼
Invoke MCP Tool(s)
        │
        ▼
Receive Deterministic Outputs
        │
        ▼
Generate Explanation
        │
        ▼
Return Answer
```

The LLM should invoke the minimum number of tools required to answer a question.

---

# 78. Multiple Plugin Collaboration

Complex questions may require information from multiple Plugins.

Example:

Question:

> "Why did this fund outperform while maintaining relatively low risk?"

The LLM may retrieve:

Performance Plugin

* Performance Evidence

Risk Plugin

* Risk Evidence

Macro Plugin

* Relevant Macro Signals

Decision Engine

* Overall Scores

The LLM combines deterministic outputs into one coherent explanation.

No Plugin communicates directly with another Plugin.

The LLM and Platform Core perform orchestration.

---

# 79. MCP Security Principles

MCP tools SHOULD expose only approved capabilities.

Plugins MUST NOT expose:

* Internal helper functions
* Private implementation details
* Raw credentials
* Internal caches

Only stable business capabilities should be publicly available.

---

# 80. MCP Testing Requirements

Every exposed MCP tool SHOULD have automated tests.

Tests SHOULD verify:

* Input validation
* Output structure
* Error handling
* Deterministic behavior
* Documentation accuracy

The MCP layer should remain reliable because it is the primary integration point for AI systems.

---

# 81. MCP Summary

The MCP layer is the bridge between deterministic financial intelligence and conversational AI.

Plugins expose capabilities.

The Platform discovers those capabilities.

The LLM selects the appropriate capabilities.

Plugins return deterministic information.

The LLM transforms that information into understandable explanations.

The separation between deterministic computation and AI reasoning remains preserved throughout the entire interaction.

# 82. Reference Implementation — Performance Plugin

## Purpose

This section demonstrates how a Plugin should be implemented by applying the Plugin Specification to a concrete example.

The Performance Plugin serves as the canonical reference implementation for future Plugins.

Future Plugins SHOULD resemble this Plugin in structure, lifecycle, and behavior.

---

# 83. Business Capability

Plugin Name

Performance Plugin

Business Capability

Historical performance analysis for investment funds.

Primary Responsibilities

* Calculate historical returns.
* Calculate CAGR.
* Calculate rolling returns.
* Generate performance Evidence.
* Detect performance Signals.
* Build long-term performance Knowledge.
* Produce Performance Scores.

---

# 84. Directory Structure

```text id="mhw7wj"
performance/

├── collectors/
│   └── nav_collector
│
├── normalizers/
│   └── nav_normalizer
│
├── analyzers/
│   ├── cagr_analyzer
│   ├── rolling_return_analyzer
│   ├── annual_return_analyzer
│   └── consistency_analyzer
│
├── detectors/
│   ├── outperformance_detector
│   ├── consistency_detector
│   └── trend_detector
│
├── knowledge/
│   └── performance_knowledge_builder
│
├── models/
│
├── contracts/
│
├── services/
│
├── config/
│
├── mcp/
│
├── api/
│
├── tests/
│
├── README.md
│
└── plugin.ts
```

Every future Plugin should follow this same organizational pattern.

---

# 85. Processing Pipeline

The Performance Plugin processes information using the standard Platform pipeline.

```text id="6nucb4"
NAV Provider
      │
      ▼
Collector
      │
      ▼
Normalizer
      │
      ▼
Analyzers
      │
      ▼
Evidence
      │
      ▼
Detectors
      │
      ▼
Signals
      │
      ▼
Knowledge Builder
      │
      ▼
Knowledge
      │
      ▼
Decision Engine
      │
      ▼
Performance Score
```

No stage should bypass another.

---

# 86. Collector Responsibilities

The NAV Collector is responsible for:

* Downloading historical NAV data.
* Validating provider responses.
* Handling retries.
* Recording collection metadata.

The Collector MUST NOT:

* Calculate returns.
* Generate Evidence.
* Detect Signals.

---

# 87. Normalizer Responsibilities

The NAV Normalizer converts provider-specific responses into Platform models.

Responsibilities include:

* Date normalization.
* Numeric validation.
* Currency normalization.
* Missing value handling.

The Normalizer MUST NOT calculate financial Metrics.

---

# 88. Analyzer Responsibilities

The Performance Plugin contains multiple specialized Analyzers.

Examples include:

CAGR Analyzer

Produces:

* CAGR Metric
* CAGR Evidence

Rolling Return Analyzer

Produces:

* Rolling Return Metric
* Rolling Return Evidence

Consistency Analyzer

Produces:

* Consistency Metric
* Consistency Evidence

Each Analyzer owns one mathematical responsibility.

---

# 89. Detector Responsibilities

The Plugin includes multiple Detectors.

Examples:

Outperformance Detector

Detects:

Performance exceeding benchmark.

Consistency Detector

Detects:

Stable historical returns.

Trend Detector

Detects:

Improving or declining long-term performance.

Each Detector converts Evidence into Signals.

---

# 90. Knowledge Builder

The Performance Knowledge Builder accumulates recurring Signals.

Examples:

Repeated Signal

Fund consistently exceeds benchmark during market corrections.

↓

Knowledge

The fund demonstrates historically resilient downside performance.

Knowledge should emerge from repeated observations rather than isolated events.

---

# 91. MCP Tools

The Performance Plugin MAY expose tools such as:

| Tool                      | Purpose                                             |
| ------------------------- | --------------------------------------------------- |
| Get Performance Metrics   | Retrieve deterministic Metrics                      |
| Get Rolling Returns       | Retrieve rolling return history                     |
| Get Performance Evidence  | Retrieve supporting Evidence                        |
| Compare Performance       | Compare multiple funds                              |
| Explain Performance Score | Retrieve information supporting a Performance Score |

Each tool exposes one business capability.

---

# 92. Example User Question

User Question

> "Why has Fund A outperformed over the last five years?"

Expected execution:

Reasoning Orchestrator

↓

Performance Plugin

↓

Performance Evidence

↓

Performance Signals

↓

Performance Knowledge

↓

Performance Score

↓

Reasoning Context

↓

LLM

↓

Insight

No additional Plugin is required.

---

# 93. Example Multi-Plugin Question

User Question

> "Why has Fund A outperformed while maintaining lower risk than its peers?"

Required Plugins:

Performance Plugin

↓

Performance Evidence

Risk Plugin

↓

Risk Evidence

Decision Engine

↓

Combined Scores

Reasoning Layer

↓

Merged Context

LLM

↓

Unified Explanation

Each Plugin contributes only its own deterministic outputs.

---

# 94. Testing Strategy

The Performance Plugin SHOULD include:

Unit Tests

* Collector
* Normalizer
* Every Analyzer
* Every Detector
* Knowledge Builder

Integration Tests

* Complete Plugin execution
* Evidence persistence
* MCP tools

End-to-End Tests

* Full processing pipeline
* Representative user queries

Testing should validate deterministic behavior.

---

# 95. Operational Metrics

The Plugin SHOULD report:

* Execution duration
* NAV records collected
* Metrics generated
* Evidence generated
* Signals generated
* Knowledge generated
* Errors
* Warnings

Operational metrics support observability rather than financial analysis.

---

# 96. Plugin Quality Checklist

The reference Plugin satisfies the following.

| Requirement            | Status |
| ---------------------- | ------ |
| Architecture compliant | ✓      |
| Deterministic          | ✓      |
| Independently testable | ✓      |
| Explainable            | ✓      |
| Observable             | ✓      |
| Configurable           | ✓      |
| MCP enabled            | ✓      |
| Documented             | ✓      |
| Versioned              | ✓      |

Every future Plugin should aim to satisfy the same checklist.

---

# 97. Lessons for Future Plugins

The Performance Plugin demonstrates the standard implementation approach.

Future Plugins should preserve:

* The processing pipeline.
* Component responsibilities.
* Public contracts.
* Operational behavior.
* Repository structure.
* Testing philosophy.
* Explainability.
* Deterministic processing.

Only the business capability should change.

The architecture should remain consistent across the entire Platform.

---

# 98. Plugin Specification Summary

This document defines the canonical specification for every Plugin in the Investment Intelligence Platform.

A Plugin is:

* Independently understandable.
* Independently executable.
* Independently testable.
* Deterministic.
* Explainable.
* Observable.
* Configurable.
* Extensible.

The Platform grows by adding Plugins rather than modifying the Platform Core.

Consistency across Plugins is one of the Platform's highest engineering priorities.

This specification should be treated as the authoritative guide for implementing every future Plugin.
