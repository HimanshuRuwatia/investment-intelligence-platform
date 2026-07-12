# 20_ARCHITECTURE.md

> **Project:** Investment Intelligence Platform
>
> **Purpose:** Define the technical architecture of the platform.
>
> **Audience:** Developers and AI coding assistants.
>
> **Status:** Living Document
>
> **Priority:** Critical

---

# 1. Purpose

This document defines the technical architecture of the Investment Intelligence Platform.

Unlike the Project Context, which explains **why** the platform exists, this document explains **how** it is organized.

It defines:

* System structure
* Component responsibilities
* Data flow
* Dependency rules
* Plugin architecture
* Extension points
* Integration boundaries

Implementation SHOULD follow this document.

If implementation and architecture diverge, the architecture SHOULD be updated deliberately rather than ignored.

---

# 2. Scope

This document defines the architecture of the core financial intelligence engine.

It includes:

* Platform Core
* Plugin Architecture
* Data Processing Pipeline
* Decision Engine
* Reasoning Layer
* Persistence Strategy
* Component Boundaries

It does NOT define:

* Database schema (see `25_DATABASE.md`)
* Domain entities (see `21_DATA_MODEL.md`)
* Plugin-specific implementation (see `22_PLUGIN_SPEC.md`)
* Development workflow (see `30_DEVELOPMENT.md`)

---

# 3. Architectural Goals

The architecture exists to satisfy the following goals.

## Goal 1 — Modularity

Business capabilities MUST be isolated.

Adding a new plugin SHOULD NOT require changes to existing plugins.

---

## Goal 2 — Deterministic Processing

Financial calculations MUST be deterministic.

The same inputs MUST produce the same outputs.

LLMs MUST NOT participate in deterministic calculations.

---

## Goal 3 — Explainability

Every important output MUST be traceable.

Users should always be able to answer:

* Where did this result come from?
* Which plugin produced it?
* Which evidence supports it?
* Which calculations contributed?

---

## Goal 4 — Extensibility

The architecture SHOULD evolve by adding plugins rather than modifying the Platform Core.

Future support for:

* Stocks
* ETFs
* Bonds
* REITs
* Commodities

should require new plugins rather than architectural redesign.

---

## Goal 5 — Local-First Development

The complete platform MUST function on a single developer machine.

Cloud infrastructure is NOT required during the initial implementation.

Every architectural decision SHOULD prioritize developer productivity and correctness over distributed scalability.

---

## Goal 6 — AI-Friendly Design

The architecture SHOULD minimize ambiguity.

Responsibilities MUST be explicit.

Component boundaries MUST be well-defined.

Interfaces SHOULD remain stable.

Documentation SHOULD be sufficient for both human developers and AI coding assistants to implement features consistently.

---

# 4. High-Level System Overview

The platform transforms financial information into explainable investment insights through a sequence of deterministic processing stages.

Each stage has a single responsibility.

```text
External Data Sources
        │
        ▼
Collectors
        │
        ▼
Normalizers
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
Knowledge Builders
        │
        ▼
Knowledge
        │
        ▼
Decision Engine
        │
        ▼
Scores
        │
        ▼
Reasoning Layer
        │
        ▼
LLM
        │
        ▼
Insights
```

Information always moves in one direction.

Each stage consumes structured outputs from the previous stage.

No stage should bypass another without a documented architectural reason.

---

# 5. Processing Philosophy

The platform is a processing pipeline.

Each component performs exactly one transformation.

The output of one component becomes the input to the next.

Example:

Raw NAV history

↓

Normalized NAV records

↓

Rolling Return calculations

↓

Evidence describing historical performance

↓

Signals identifying trends

↓

Knowledge accumulated from repeated trends

↓

Scores summarizing the evaluation

↓

Reasoning package

↓

LLM explanation

Every transformation should be deterministic until the LLM stage.

---

# 6. Architectural Layers

The platform consists of seven logical layers.

Each layer has clearly defined responsibilities.

## Layer 1 — Collection Layer

Purpose

Acquire external information.

Produces:

Raw Data

Consumes:

External APIs, files, or other data sources.

---

## Layer 2 — Normalization Layer

Purpose

Convert external data into standardized internal models.

Produces:

Normalized Data

Consumes:

Raw Data

---

## Layer 3 — Analysis Layer

Purpose

Perform deterministic financial analysis.

Produces:

Metrics and Evidence

Consumes:

Normalized Data

---

## Layer 4 — Detection Layer

Purpose

Identify meaningful financial relationships.

Produces:

Signals

Consumes:

Evidence

---

## Layer 5 — Knowledge Layer

Purpose

Accumulate repeated Signals into long-term Knowledge.

Produces:

Knowledge

Consumes:

Signals

---

## Layer 6 — Decision Layer

Purpose

Generate Scores and Rankings.

Produces:

Scores

Consumes:

Evidence, Signals, and Knowledge

---

## Layer 7 — Reasoning Layer

Purpose

Prepare structured context for the LLM.

Produces:

Reasoning Context

Consumes:

Evidence, Signals, Knowledge, and Scores

The LLM consumes only the output of this layer.

---

# 7. Architectural Principles

The following principles are mandatory.

## Single Responsibility

Every architectural component MUST have exactly one primary responsibility.

---

## Stable Interfaces

Public interfaces SHOULD remain stable.

Internal implementations MAY evolve.

---

## Explicit Dependencies

Dependencies MUST be visible.

Hidden coupling SHOULD be avoided.

---

## Plugin Isolation

Plugins MUST remain independent.

Business logic MUST NOT leak across plugin boundaries.

---

## Deterministic First

Financial analysis MUST always occur before AI reasoning.

---

## Composition Over Inheritance

Components SHOULD be composed from smaller units rather than relying on deep inheritance hierarchies.

---

## Local Before Cloud

The architecture SHOULD assume local execution first.

Distributed deployment is a future concern rather than a current requirement.

---

## Documentation Before Implementation

Architectural changes SHOULD be documented before implementation begins.

Implementation should reflect documented architecture rather than defining it retrospectively.

---

# 8. Architectural Constraints

The following constraints are considered non-negotiable.

The Platform Core MUST NOT contain financial business logic.

Plugins MUST own their business logic.

Collectors MUST NOT calculate financial metrics.

Analyzers MUST NOT fetch external data.

Analyzers MUST NOT invoke LLMs.

Detectors MUST consume Evidence rather than Raw Data.

Knowledge Builders MUST consume Signals rather than Metrics.

The Decision Engine MUST consume deterministic outputs only.

The Reasoning Layer MUST NOT perform financial analysis.

The LLM MUST NOT produce deterministic financial calculations.

The user interface MUST remain independent of the intelligence engine.

These constraints define the architectural boundaries of the platform and should be preserved throughout its evolution.

# 9. Platform Core

## Purpose

The Platform Core is the foundation of the Investment Intelligence Platform.

It provides shared infrastructure and orchestration.

It does **not** contain financial intelligence.

Every business capability belongs inside Plugins.

The Platform Core exists so that Plugins can remain independent, reusable, and easy to test.

---

## Responsibilities

The Platform Core MUST provide:

* Plugin lifecycle management
* Plugin registration
* Configuration management
* Scheduling
* Shared logging
* Event routing
* Evidence persistence
* Reasoning orchestration
* Common abstractions

---

## The Platform Core MUST NOT

The Platform Core MUST NOT:

* Calculate financial metrics.
* Generate investment scores.
* Analyze mutual funds.
* Detect market signals.
* Implement plugin-specific business rules.
* Know how any individual plugin works internally.

The Platform Core should only know **that a plugin exists**, not **how it works**.

---

# 10. Platform Core Components

The Platform Core consists of several independent infrastructure components.

Each component has one responsibility.

```text
Platform Core

├── Plugin Registry
├── Plugin Manager
├── Scheduler
├── Configuration Manager
├── Event Bus
├── Evidence Store
├── Reasoning Orchestrator
└── Shared Services
```

---

# 11. Plugin Registry

## Purpose

The Plugin Registry is the authoritative list of all available plugins.

Every plugin must register itself before it can participate in the platform.

---

## Responsibilities

The Plugin Registry MUST:

* Register plugins.
* Discover available plugins.
* Expose plugin metadata.
* Validate plugin uniqueness.
* Track plugin status.

---

## Inputs

* Plugin metadata
* Plugin registration requests

---

## Outputs

* Registered plugin list
* Plugin lookup
* Plugin metadata

---

## MUST NOT

The Plugin Registry MUST NOT:

* Execute plugins.
* Load external data.
* Perform financial analysis.

---

# 12. Plugin Manager

## Purpose

The Plugin Manager controls the lifecycle of plugins.

It determines when plugins start, stop, initialize, and execute.

---

## Responsibilities

The Plugin Manager MUST:

* Initialize plugins.
* Resolve plugin dependencies (if any).
* Start plugins.
* Stop plugins.
* Report plugin health.
* Handle plugin failures.

---

## Inputs

* Plugin Registry
* Scheduler
* Configuration

---

## Outputs

* Running plugins
* Plugin lifecycle events

---

## MUST NOT

The Plugin Manager MUST NOT:

* Analyze financial data.
* Calculate metrics.
* Store Evidence.

---

# 13. Scheduler

## Purpose

The Scheduler determines **when** work should occur.

It never decides **what** work should be performed.

---

## Responsibilities

Examples include:

* Daily NAV refresh
* Weekly reports
* Monthly summaries
* Periodic health checks
* Scheduled plugin execution

---

## Inputs

* Time
* Configuration
* Plugin schedules

---

## Outputs

Execution requests.

---

## MUST NOT

The Scheduler MUST NOT:

* Execute plugin logic directly.
* Perform business analysis.
* Maintain plugin state.

---

# 14. Configuration Manager

## Purpose

Provide configuration to all components.

Configuration should be centralized.

---

## Responsibilities

* Load configuration.
* Validate configuration.
* Provide configuration.
* Support environment-specific overrides.

---

## Examples

Examples of configuration include:

* API keys
* Database settings
* Scheduler intervals
* Plugin enablement
* Feature flags

---

## MUST NOT

Business rules should never be stored as configuration.

Configuration changes should not change the architecture.

---

# 15. Event Bus

## Purpose

Allow infrastructure components to communicate through events.

The Event Bus enables loose coupling.

---

## Examples

PluginStarted

↓

Scheduler receives notification

↓

Monitoring receives notification

↓

Logging receives notification

---

## Responsibilities

The Event Bus SHOULD:

* Publish events.
* Subscribe to events.
* Route events.
* Support future extensibility.

---

## MUST NOT

The Event Bus MUST NOT:

* Store business data.
* Replace the database.
* Contain business logic.

---

# 16. Evidence Store

## Purpose

Persist deterministic outputs generated by plugins.

The Evidence Store acts as the single source of truth for structured financial evidence.

---

## Responsibilities

Store:

* Evidence
* Signals
* Knowledge
* Scores
* Metadata

Support:

* Retrieval
* Versioning
* Auditing

---

## Inputs

* Plugin outputs
* Decision Engine outputs

---

## Outputs

Structured information for downstream consumers.

---

## MUST NOT

The Evidence Store MUST NOT:

* Calculate metrics.
* Generate Evidence.
* Modify plugin outputs.

Persistence is not analysis.

---

# 17. Reasoning Orchestrator

## Purpose

Prepare information for the LLM.

This component bridges deterministic processing and AI reasoning.

---

## Responsibilities

The Reasoning Orchestrator MUST:

* Gather Evidence.
* Gather Signals.
* Gather Knowledge.
* Gather Scores.
* Select relevant information.
* Reduce redundancy.
* Build structured reasoning context.

---

## Inputs

* Evidence Store
* User query
* Current platform state

---

## Outputs

Reasoning Context

---

## MUST NOT

The Reasoning Orchestrator MUST NOT:

* Calculate financial metrics.
* Generate Scores.
* Detect Signals.
* Build Knowledge.

It prepares context.

It does not generate intelligence.

---

# 18. Shared Services

## Purpose

Provide reusable infrastructure that is independent of business logic.

Examples include:

* Logging
* Time utilities
* Retry utilities
* Serialization
* Validation
* Error handling

Shared Services exist to reduce duplication.

---

## MUST NOT

Shared Services MUST NOT contain:

* Plugin-specific logic
* Financial calculations
* Investment rules
* Category-specific behavior

---

# 19. Platform Core Dependency Rules

The Platform Core owns infrastructure.

Plugins own business logic.

The following dependency rules are mandatory.

Platform Core

↓

Plugins

Allowed

Plugins

↓

Platform Core

Allowed

Plugin

↓

Plugin

Not Allowed

Collector

↓

Analyzer

Allowed

Analyzer

↓

Collector

Not Allowed

Reasoning Orchestrator

↓

LLM

Allowed

LLM

↓

Platform Core

Not Allowed

---

# 20. Platform Core Summary

The Platform Core should remain intentionally small.

Whenever implementing a new feature, ask:

> "Is this infrastructure?"

If yes,

it probably belongs inside the Platform Core.

Otherwise,

it almost certainly belongs inside a Plugin.

Keeping the Platform Core minimal is one of the most important architectural principles of the entire project.

A small Platform Core enables:

* Independent plugins
* Easier testing
* Better scalability
* Clear ownership
* Simpler reasoning
* Lower coupling

# 21. Plugin Architecture

## Purpose

A Plugin is the fundamental building block of the Investment Intelligence Platform.

Every business capability MUST be implemented as a Plugin.

Examples include:

* Performance
* Risk
* Consistency
* Benchmark
* Holdings
* Strategy
* Manager
* Macro
* News
* Sentiment

The architecture is designed so that new business capabilities can be added by introducing new plugins without modifying the Platform Core.

---

# 22. Plugin Philosophy

Every Plugin owns exactly one business capability.

Examples:

Performance Plugin

Responsible for:

* Historical returns
* CAGR
* Rolling returns
* Performance evidence

Risk Plugin

Responsible for:

* Volatility
* Drawdown
* Sharpe Ratio
* Risk evidence

Macro Plugin

Responsible for:

* Inflation
* Interest rates
* GDP
* RBI policy
* Macroeconomic evidence

A Plugin SHOULD answer one class of business questions exceptionally well.

---

# 23. Plugin Responsibilities

Every Plugin is responsible for:

* Collecting required data.
* Normalizing external data.
* Performing deterministic analysis.
* Producing Evidence.
* Detecting Signals.
* Building Knowledge.
* Exposing structured outputs.

A Plugin MAY expose:

* MCP tools
* Local APIs
* CLI commands
* Scheduled jobs

---

# 24. Plugin Internal Structure

Every Plugin SHOULD follow the same internal organization.

```text id="n8owg7"
Plugin

├── Collectors
├── Normalizers
├── Analyzers
├── Detectors
├── Knowledge Builders
├── Models
├── Contracts
├── MCP
├── API
├── Tests
└── Plugin Entry
```

The exact implementation language may change.

The logical organization SHOULD remain consistent.

---

# 25. Plugin Processing Pipeline

Every Plugin processes information using the same sequence.

```text id="wqjz2l"
Raw Data
    ↓
Collectors
    ↓
Normalizers
    ↓
Analyzers
    ↓
Evidence
    ↓
Detectors
    ↓
Signals
    ↓
Knowledge Builders
    ↓
Knowledge
```

The pipeline is intentionally linear.

Each stage has exactly one responsibility.

---

# 26. Plugin Contract

Every Plugin MUST satisfy the following contract.

## Inputs

A Plugin MAY consume:

* External APIs
* Files
* Database records
* Configuration
* Time
* User requests

Plugins SHOULD NOT directly consume outputs from other plugins.

---

## Outputs

A Plugin MAY produce:

* Evidence
* Signals
* Knowledge
* Metadata
* Health information
* Diagnostics

Outputs MUST be structured.

Outputs SHOULD be deterministic whenever practical.

---

## Lifecycle

Every Plugin SHOULD support the following lifecycle.

```text id="98sy7w"
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
Report Status
```

A Plugin should never assume it executes only once.

Execution should be repeatable.

---

# 27. Collector Layer

## Purpose

Acquire raw information required by the Plugin.

Examples:

Performance Plugin

Collect:

* NAV history

Macro Plugin

Collect:

* RBI data
* Inflation
* GDP

Collectors own external communication.

---

## Collector Responsibilities

Collectors MUST:

* Fetch data.
* Retry failures.
* Validate responses.
* Handle rate limits.
* Handle authentication.

Collectors MUST NOT:

* Calculate metrics.
* Detect signals.
* Call LLMs.

---

# 28. Normalizer Layer

## Purpose

Transform external data into internal models.

Responsibilities include:

* Standardizing field names
* Validating required fields
* Handling missing values
* Type conversion
* Unit normalization

Normalizers MUST NOT perform business analysis.

---

# 29. Analyzer Layer

## Purpose

Produce deterministic Metrics.

Examples:

Performance Plugin

Produces:

* CAGR
* Rolling Returns
* Annualized Return

Risk Plugin

Produces:

* Volatility
* Sharpe Ratio
* Maximum Drawdown

Analyzers are the mathematical heart of every Plugin.

---

## Analyzer Responsibilities

Analyzers MUST:

* Consume normalized data.
* Produce deterministic metrics.
* Generate Evidence.

Analyzers MUST NOT:

* Fetch data.
* Call APIs.
* Invoke LLMs.
* Modify platform state.

---

# 30. Detector Layer

## Purpose

Identify meaningful financial relationships.

Examples:

* Increasing volatility.
* Sector rotation.
* Strategy change.
* Concentration increase.

Detectors transform Evidence into Signals.

---

## Detector Responsibilities

Detectors MUST:

* Consume Evidence.
* Produce Signals.

Detectors MUST NOT:

* Calculate financial metrics.
* Fetch external data.

---

# 31. Knowledge Builder Layer

## Purpose

Transform repeated Signals into long-term Knowledge.

Knowledge should evolve gradually.

Examples:

Repeated observation:

Manager increases exposure to manufacturing before earnings upgrades.

↓

Knowledge:

Manager consistently anticipates manufacturing earnings cycles.

Knowledge should be stable.

Temporary observations should remain Signals.

---

# 32. Plugin Independence

Plugins MUST remain independent.

A Plugin SHOULD be understandable without reading another Plugin.

The following are NOT allowed:

Performance Plugin importing Risk analyzers.

Macro Plugin modifying Holdings data.

Benchmark Plugin directly calling Strategy Plugin.

Every Plugin communicates through shared Platform services.

---

# 33. Plugin Extension

New Plugins should be added by implementing the Plugin Contract.

The Platform Core should not require modification.

Example:

Adding an ETF Plugin SHOULD involve:

* New Collector
* New Normalizer
* New Analyzer
* New Detector
* New Knowledge Builder

Existing Plugins remain unchanged.

This satisfies the Open/Closed Principle.

---

# 34. Plugin Error Handling

A Plugin failure should be isolated.

Examples:

If the News Plugin fails:

Performance Plugin continues.

Risk Plugin continues.

Macro Plugin continues.

One Plugin should never prevent another from executing.

---

# 35. Plugin Quality Requirements

Every Plugin SHOULD satisfy the following.

Correctness

Financial calculations are accurate.

Determinism

Repeated execution produces identical outputs.

Isolation

No hidden dependencies.

Testability

Business logic is independently testable.

Explainability

Evidence can be inspected.

Observability

Execution is logged.

Maintainability

Responsibilities remain focused.

---

# 36. Plugin Summary

A Plugin is an independently executable business capability.

The Platform grows by adding Plugins.

The Platform Core remains stable.

Every Plugin follows the same processing pipeline.

Every Plugin follows the same lifecycle.

Every Plugin follows the same contract.

Consistency across Plugins is one of the most important architectural goals of the entire platform.

# 37. Execution Modes

The Investment Intelligence Platform operates in two independent execution modes.

1. Processing Mode
2. Query Mode

These modes have different responsibilities, execution patterns, and performance characteristics.

Understanding this distinction is essential for implementing the platform correctly.

---

# 38. Processing Mode

## Purpose

Processing Mode continuously transforms external financial data into structured knowledge.

Its primary objective is to answer future questions before they are asked.

Processing Mode is deterministic.

It is responsible for building the Platform's knowledge base.

---

## Trigger Sources

Processing Mode may be triggered by:

* Scheduled execution
* Manual execution
* Data refresh
* Plugin execution
* Future event-based triggers

---

## Responsibilities

Processing Mode MUST:

* Collect data.
* Normalize data.
* Calculate metrics.
* Produce Evidence.
* Detect Signals.
* Build Knowledge.
* Generate Scores.
* Persist outputs.

Processing Mode MUST NOT:

* Answer user questions.
* Invoke conversational reasoning.
* Generate natural-language reports unless explicitly requested.

---

## Processing Flow

```text
External Data
        │
        ▼
Collectors
        │
        ▼
Normalizers
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
Knowledge Builders
        │
        ▼
Knowledge
        │
        ▼
Decision Engine
        │
        ▼
Scores
        │
        ▼
Evidence Store
```

Processing Mode ends when deterministic outputs have been stored.

---

# 39. Query Mode

## Purpose

Query Mode answers user questions.

It never performs financial analysis directly.

Instead, it consumes information previously generated by Processing Mode.

---

## Responsibilities

Query Mode MUST:

* Understand user intent.
* Retrieve relevant Evidence.
* Retrieve relevant Signals.
* Retrieve relevant Knowledge.
* Retrieve Scores.
* Build reasoning context.
* Produce explanations.

---

## Query Mode MUST NOT

Query Mode MUST NOT:

* Recalculate financial metrics.
* Fetch historical NAVs directly.
* Perform deterministic analysis.
* Modify stored Evidence.
* Persist new financial conclusions.

If required information does not exist, Query Mode should explicitly state that the platform lacks sufficient evidence rather than attempting to infer unsupported conclusions.

---

# 40. Query Flow

```text
User Question
        │
        ▼
Intent Identification
        │
        ▼
Reasoning Orchestrator
        │
        ▼
Evidence Store
        │
        ▼
Evidence
Signals
Knowledge
Scores
        │
        ▼
Context Builder
        │
        ▼
LLM
        │
        ▼
Answer
```

Query Mode should primarily read existing information.

It should not generate new deterministic knowledge.

---

# 41. Context Builder

## Purpose

The Context Builder prepares information for the LLM.

It is responsible for selecting the smallest amount of information required to answer a question accurately.

This reduces token usage while preserving explainability.

---

## Responsibilities

The Context Builder SHOULD:

* Retrieve only relevant Evidence.
* Remove duplicate information.
* Prioritize high-confidence Signals.
* Include supporting Knowledge.
* Include relevant Scores.
* Preserve traceability.

---

## Inputs

* User query
* Evidence
* Signals
* Knowledge
* Scores

---

## Outputs

Structured reasoning context.

---

## MUST NOT

The Context Builder MUST NOT:

* Calculate metrics.
* Generate Signals.
* Modify Knowledge.
* Invent missing information.

Its responsibility is selection, not generation.

---

# 42. Reasoning Context

The Reasoning Context is the only structured input provided to the LLM.

A Reasoning Context SHOULD contain:

* Relevant Evidence
* Relevant Signals
* Relevant Knowledge
* Relevant Scores
* Confidence values
* Supporting metadata

It SHOULD NOT contain:

* Entire historical datasets
* Duplicate information
* Unrelated plugin outputs
* Raw external responses

The goal is precision rather than completeness.

---

# 43. Example Query

Example Question

> "Why has Fund A outperformed Fund B over the past year?"

The Platform should process the request as follows.

Step 1

Understand the question.

The user is requesting:

* Comparison
* Performance explanation
* One-year period

---

Step 2

Retrieve deterministic information.

Examples:

Performance Evidence

Consistency Evidence

Relevant Signals

Manager Knowledge

Macro observations

Scores

---

Step 3

Construct Reasoning Context.

Only information relevant to the question is included.

---

Step 4

Invoke the LLM.

The LLM receives structured context rather than raw datasets.

---

Step 5

Generate explanation.

The explanation should reference:

* Metrics
* Signals
* Knowledge
* Confidence

The explanation should remain grounded in deterministic outputs.

---

# 44. Query Optimization

The architecture should optimize for retrieval rather than recomputation.

Preferred approach:

Retrieve previously calculated Evidence.

Avoid:

Recomputing financial metrics for every user question.

Benefits include:

* Faster responses.
* Lower compute cost.
* Improved consistency.
* Better explainability.
* Stable deterministic outputs.

---

# 45. Freshness

The Platform should distinguish between:

Processing freshness

and

Query freshness.

Examples:

NAV updated yesterday.

Knowledge updated this morning.

News updated one hour ago.

User asked a question now.

The Platform should expose the timestamp of important Evidence whenever practical.

Freshness is part of explainability.

---

# 46. Query Responsibility Summary

Processing Mode builds knowledge.

Query Mode consumes knowledge.

Processing Mode is deterministic.

Query Mode is conversational.

Processing Mode creates financial intelligence.

Query Mode communicates financial intelligence.

This separation is fundamental to the architecture and should remain unchanged as the Platform evolves.

# 47. Component Communication

## Purpose

This section defines how components communicate with one another.

The objective is to:

* Minimize coupling.
* Maximize modularity.
* Prevent circular dependencies.
* Keep responsibilities explicit.

Every component MUST communicate only through documented interfaces.

Direct access to internal implementation details is prohibited.

---

# 48. Communication Rules

The following rules are mandatory.

## Rule 1

Components MAY communicate only with adjacent layers.

Example:

Collector

↓

Normalizer

↓

Analyzer

A Collector MUST NOT invoke an Analyzer directly.

---

## Rule 2

Plugins MUST NOT directly communicate with other plugins.

If Plugin A requires information produced by Plugin B, it MUST obtain that information through the Platform Core or the Evidence Store.

---

## Rule 3

The Platform Core coordinates components.

It does not perform business logic.

---

## Rule 4

The LLM is always the final consumer.

No deterministic component should consume LLM-generated outputs as business data.

---

## Rule 5

Every interaction should have a clear owner.

If ownership is unclear, the architecture should be reconsidered before implementation.

---

# 49. Data Ownership

Every piece of information has exactly one owner.

Ownership prevents duplicate logic and conflicting implementations.

| Data              | Owner                  |
| ----------------- | ---------------------- |
| Raw External Data | Collector              |
| Normalized Data   | Normalizer             |
| Metrics           | Analyzer               |
| Evidence          | Analyzer               |
| Signals           | Detector               |
| Knowledge         | Knowledge Builder      |
| Scores            | Decision Engine        |
| Reasoning Context | Reasoning Orchestrator |
| Insight           | LLM                    |

Only the owning component may create or modify its data.

Other components may consume it but MUST NOT change it.

---

# 50. Information Lifecycle

Every piece of information follows the same lifecycle.

```text id="3l6m8q"
Created
    ↓
Validated
    ↓
Consumed
    ↓
Persisted
    ↓
Queried
    ↓
Archived (future)
```

The lifecycle should remain consistent across all plugins.

---

# 51. Dependency Model

Dependencies should always point toward lower-level abstractions.

Preferred dependency direction:

```text id="1q8xup"
Platform Core
        ▲

Plugin
        ▲

Collector
        ▲

Normalizer
        ▲

Analyzer
        ▲

Detector
        ▲

Knowledge Builder
```

Execution flows downward.

Dependencies point upward toward abstractions.

This reduces coupling and simplifies testing.

---

# 52. Allowed Dependencies

The following dependencies are allowed.

| From                   | To                | Allowed |
| ---------------------- | ----------------- | ------- |
| Collector              | Normalizer        | Yes     |
| Normalizer             | Analyzer          | Yes     |
| Analyzer               | Detector          | Yes     |
| Detector               | Knowledge Builder | Yes     |
| Knowledge Builder      | Decision Engine   | Yes     |
| Decision Engine        | Evidence Store    | Yes     |
| Reasoning Orchestrator | Evidence Store    | Yes     |
| Reasoning Orchestrator | LLM               | Yes     |

These represent the intended processing flow.

---

# 53. Forbidden Dependencies

The following dependencies are prohibited.

| From              | To              | Allowed |
| ----------------- | --------------- | ------- |
| Analyzer          | Collector       | No      |
| Detector          | Collector       | No      |
| Knowledge Builder | Collector       | No      |
| Plugin            | Plugin          | No      |
| LLM               | Analyzer        | No      |
| LLM               | Decision Engine | No      |
| UI                | Analyzer        | No      |
| UI                | Collector       | No      |

Business logic should never be driven directly from the user interface.

---

# 54. Interface Philosophy

Components should communicate through contracts rather than implementations.

Every public interface SHOULD be:

* Small
* Explicit
* Stable
* Strongly typed
* Independently testable

Implementation details should remain private.

Consumers should depend only on the contract.

---

# 55. Failure Isolation

Failures should remain local whenever possible.

Examples:

If the News Plugin fails:

* Performance Plugin continues.
* Risk Plugin continues.
* Strategy Plugin continues.

If one Collector fails:

* Other Collectors continue.

If one Analyzer fails:

* Other Analyzers continue.

The platform should degrade gracefully rather than stopping entirely.

---

# 56. Idempotency

Deterministic processing should be idempotent.

Running the same processing pipeline multiple times with identical inputs should produce identical outputs.

Benefits include:

* Easier retries
* Simpler debugging
* Safer scheduling
* Predictable behavior

Whenever practical, processing components should avoid side effects beyond their documented outputs.

---

# 57. Stateless vs Stateful Components

The preferred design is stateless processing.

Examples of stateless components:

* Collector
* Normalizer
* Analyzer
* Detector

These components consume inputs and produce outputs without maintaining long-term execution state.

Examples of stateful components:

* Evidence Store
* Configuration Manager
* Scheduler
* Plugin Registry

State should exist only where it provides clear value.

---

# 58. Extension Strategy

The architecture should support extension without modification.

Examples:

Adding a new Analyzer:

* No Platform Core changes.
* No existing Analyzer changes.
* Minimal plugin changes.

Adding a new Plugin:

* Register the Plugin.
* Implement the Plugin Contract.
* Configure scheduling if required.

Existing plugins remain unchanged.

---

# 59. Architectural Invariants

The following invariants should always remain true.

* Financial calculations are deterministic.
* Plugins remain independent.
* The Platform Core contains no business logic.
* Every business capability belongs to exactly one Plugin.
* Every important conclusion is evidence-backed.
* The LLM explains deterministic outputs.
* User interfaces remain consumers of the Platform.
* Processing and Query execution remain separate.
* Component responsibilities remain focused.
* Architecture evolves through extension rather than redesign.

If any future implementation violates one of these invariants, the implementation should be reconsidered before proceeding.

---

# 60. Architecture Checkpoint

At this stage, the architecture defines:

✓ Platform Core

✓ Plugin Architecture

✓ Processing Pipeline

✓ Query Pipeline

✓ Component Communication

✓ Dependency Rules

✓ Ownership Model

The remaining sections of this document will define:

* Repository structure
* Interface contracts
* Configuration
* Logging and observability
* Testing architecture
* Scalability strategy
* Future evolution

These topics build upon the foundations established above and should not redefine the architectural principles already documented.

# 61. Repository Architecture

## Purpose

This section defines how the repository is organized.

The repository structure is an extension of the software architecture.

A directory represents ownership.

Every source file should have one obvious location.

If multiple locations seem equally valid, the architecture should be reconsidered.

---

# 62. High-Level Repository Structure

The repository SHOULD follow the following structure.

```text
investment-intelligence-platform/

├── docs/
│
├── src/
│   ├── core/
│   ├── plugins/
│   ├── shared/
│   ├── cli/
│   ├── config/
│   └── bootstrap/
│
├── tests/
│
├── scripts/
│
├── data/
│
├── logs/
│
└── package.json
```

The architecture intentionally separates business logic from infrastructure.

---

# 63. Source Directory Responsibilities

## `/src/core`

Purpose:

Platform infrastructure.

Contains:

* Plugin Registry
* Plugin Manager
* Scheduler
* Event Bus
* Evidence Store
* Reasoning Orchestrator
* Shared platform interfaces

MUST NOT contain:

* Fund analysis
* Risk calculations
* Investment logic

---

## `/src/plugins`

Purpose:

Business capabilities.

Every Plugin lives inside this directory.

Examples:

```text
plugins/

performance/

risk/

macro/

benchmark/

holdings/
```

All financial intelligence belongs here.

---

## `/src/shared`

Purpose:

Reusable code shared across the entire Platform.

Examples:

* Logger
* Error types
* Utilities
* Validation
* Date helpers
* Shared interfaces
* Constants

Shared code MUST remain business-independent.

---

## `/src/cli`

Purpose:

Local interaction.

Examples:

* Run processing
* Query plugins
* Debug data
* Generate reports

The CLI exists to support development.

It is not the production user interface.

---

## `/src/config`

Purpose:

Configuration loading and validation.

Contains:

* Environment configuration
* Feature flags
* Plugin configuration
* Scheduling configuration

Business rules MUST NOT exist here.

---

## `/src/bootstrap`

Purpose:

Application startup.

Responsibilities:

* Initialize Platform Core
* Register plugins
* Load configuration
* Start schedulers
* Start CLI

Bootstrap contains only startup logic.

---

# 64. Plugin Directory Structure

Every Plugin SHOULD follow the same structure.

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
├── api/
├── mcp/
├── tests/
└── plugin.ts
```

Consistency across plugins is more valuable than individual preferences.

---

# 65. Plugin Entry Point

Every Plugin MUST expose one entry point.

Example:

```text
performance/

plugin.ts
```

Responsibilities include:

* Plugin registration
* Lifecycle hooks
* Configuration validation
* Component initialization

The entry point should not contain business logic.

---

# 66. Ownership Rules

Every directory has exactly one owner.

| Directory | Owner              |
| --------- | ------------------ |
| core      | Platform           |
| plugins   | Individual Plugins |
| shared    | Platform           |
| cli       | Platform           |
| config    | Platform           |
| bootstrap | Platform           |
| docs      | Entire project     |
| tests     | Entire project     |

Ownership should remain obvious.

---

# 67. File Placement Rules

When creating a new file, determine its responsibility first.

Examples:

Question:

"Calculates CAGR"

Location:

Performance Plugin → analyzers

---

Question:

"Downloads NAV history"

Location:

Performance Plugin → collectors

---

Question:

"Explains performance"

Location:

Reasoning Layer

---

Question:

"Logs execution"

Location:

Shared

---

Question:

"Registers plugins"

Location:

Core

---

# 68. Shared Code Guidelines

Shared code should exist only when genuinely shared.

Examples of good shared code:

* Logger
* Retry utility
* HTTP client
* Date utilities
* Validation library

Examples of poor shared code:

* Shared investment logic
* Shared plugin calculations
* Shared business rules

If code is shared by only one Plugin, it belongs inside that Plugin.

---

# 69. Testing Structure

Tests should mirror the source structure.

Example:

```text
src/plugins/performance/analyzers/

↓

tests/plugins/performance/analyzers/
```

A developer should immediately know where tests belong.

---

# 70. Configuration Strategy

Configuration should be centralized.

Configuration examples:

* Database connection
* API credentials
* Scheduler intervals
* Feature toggles

Configuration MUST NOT determine business logic.

Business behavior belongs inside Plugins.

---

# 71. Local Development Files

The repository MAY include directories intended only for local development.

Examples:

```text
data/

sample/

exports/

cache/

logs/
```

These directories support development and debugging.

They should remain separate from production code.

---

# 72. Generated Artifacts

Generated outputs should never be committed as source code.

Examples include:

* Reports
* Cached data
* Temporary exports
* Analysis snapshots

Generated artifacts belong outside the source tree whenever practical.

---

# 73. Naming Conventions

Naming should be predictable.

Examples:

Directories:

```
performance
macro
benchmark
```

Files:

```
nav_collector.ts
rolling_return_analyzer.ts
strategy_detector.ts
knowledge_builder.ts
```

Classes:

```
NavCollector
RollingReturnAnalyzer
StrategyDetector
PerformanceKnowledgeBuilder
```

Names should describe responsibility rather than implementation.

---

# 74. Repository Evolution

The repository should grow by:

* Adding Plugins
* Adding Analyzers
* Adding Collectors
* Adding Documentation

The Platform Core should change infrequently.

A healthy repository grows horizontally rather than vertically.

---

# 75. Repository Summary

The repository structure reflects the architecture.

Infrastructure belongs in the Platform Core.

Business logic belongs in Plugins.

Shared utilities remain business-independent.

Testing mirrors the source tree.

Consistency is preferred over personal coding style.

Every file should have one obvious home.

The repository organization should help both humans and AI coding assistants navigate the codebase with minimal ambiguity.

# 76. Interface Architecture

## Purpose

This section defines how components communicate through stable interfaces.

The objective is to:

* Reduce coupling.
* Improve maintainability.
* Enable independent testing.
* Support future extensions.
* Allow implementations to evolve without affecting consumers.

Components should depend on contracts rather than implementations.

---

# 77. Interface Philosophy

Every public component SHOULD expose a minimal interface.

Consumers should know:

* What the component does.
* What inputs it requires.
* What outputs it produces.

Consumers should NOT know:

* Internal implementation.
* Internal algorithms.
* Internal storage.
* Internal helper classes.

Interfaces define capabilities.

Implementations define behavior.

---

# 78. Component Contract

Every major component SHOULD clearly define:

## Purpose

Why the component exists.

---

## Inputs

What the component consumes.

---

## Outputs

What the component produces.

---

## Responsibilities

What the component owns.

---

## Dependencies

Which Platform services it depends upon.

---

## Side Effects

Any observable effects.

Examples:

* Database writes
* File creation
* Event publication
* Logging

---

## MUST NOT

Explicit responsibilities the component should never perform.

Every public component should follow this structure.

---

# 79. Plugin Contract

Every Plugin MUST expose a common contract to the Platform Core.

The Platform Core should interact with every Plugin in exactly the same way.

The Platform Core should not need special handling for individual Plugins.

The Plugin Contract SHOULD support:

* Registration
* Initialization
* Validation
* Execution
* Health reporting
* Shutdown

Plugin-specific business logic remains internal.

---

# 80. Collector Contract

Every Collector SHOULD expose a common interface.

Inputs:

* Configuration
* Execution request

Outputs:

* Raw Data

Collectors own communication with external systems.

Collectors should remain independently replaceable.

---

# 81. Normalizer Contract

Every Normalizer SHOULD:

Consume:

* Raw Data

Produce:

* Normalized Data

Normalizers should be deterministic.

Normalizers should never access external systems.

---

# 82. Analyzer Contract

Every Analyzer SHOULD:

Consume:

* Normalized Data

Produce:

* Metrics
* Evidence

Analyzers MUST be deterministic.

Analyzers SHOULD be pure functions whenever practical.

Analyzers MUST NOT modify external state.

---

# 83. Detector Contract

Every Detector SHOULD:

Consume:

* Evidence

Produce:

* Signals

Detectors SHOULD operate independently.

Each Detector should answer one business question.

---

# 84. Knowledge Builder Contract

Every Knowledge Builder SHOULD:

Consume:

* Signals

Produce:

* Knowledge

Knowledge Builders should accumulate understanding over time.

Knowledge should remain explainable.

---

# 85. Decision Engine Contract

The Decision Engine SHOULD:

Consume:

* Evidence
* Signals
* Knowledge

Produce:

* Scores
* Rankings
* Confidence

The Decision Engine should never require direct access to external data sources.

---

# 86. Reasoning Contract

The Reasoning Orchestrator SHOULD:

Consume:

* User Question
* Evidence
* Signals
* Knowledge
* Scores

Produce:

* Reasoning Context

The Reasoning Context becomes the only structured input passed to the LLM.

---

# 87. LLM Contract

The LLM SHOULD:

Consume:

* Reasoning Context

Produce:

* Human-readable Insights

The LLM MUST NOT:

* Query databases directly.
* Calculate financial metrics.
* Modify platform state.
* Produce deterministic business outputs.

The LLM is a consumer.

It is not a producer of financial intelligence.

---

# 88. Error Handling Strategy

Errors should remain localized.

Every component SHOULD classify failures as one of the following:

Recoverable

Examples:

* Temporary API failure.
* Network timeout.
* Rate limiting.

The component may retry.

---

Non-Recoverable

Examples:

* Invalid configuration.
* Corrupt data.
* Missing required fields.

The component should fail gracefully and report the error.

---

Unexpected

Examples:

* Programming errors.
* Contract violations.
* Unhandled exceptions.

The component should terminate safely, log sufficient context, and avoid corrupting shared state.

---

# 89. Observability

Every major component SHOULD expose observable execution information.

Examples include:

* Start time
* Finish time
* Duration
* Status
* Error count
* Warning count
* Records processed
* Evidence generated
* Signals generated

Observability should support both debugging and future monitoring.

---

# 90. Logging Principles

Logging should provide useful operational insight without exposing sensitive information.

Each log entry SHOULD include:

* Component
* Plugin
* Timestamp
* Execution identifier
* Log level
* Message

Logs SHOULD be structured whenever practical.

---

# 91. Configuration Principles

Configuration should be explicit.

Components SHOULD receive configuration through the Platform Core rather than loading configuration independently.

Benefits include:

* Centralized validation.
* Easier testing.
* Consistent behavior.
* Improved observability.

---

# 92. Testing Architecture

Testing should follow the same architectural boundaries as production code.

Every deterministic component SHOULD have independent unit tests.

Examples:

Collector

↓

Collector Tests

Analyzer

↓

Analyzer Tests

Detector

↓

Detector Tests

Knowledge Builder

↓

Knowledge Builder Tests

Integration tests should validate communication between components.

---

# 93. Architectural Evolution

The architecture is expected to evolve.

However, evolution should occur through:

* New Plugins.
* New Collectors.
* New Analyzers.
* New Detectors.
* New Knowledge Builders.

The Platform Core should remain relatively stable.

Changes to the Platform Core require stronger justification than changes to individual Plugins.

---

# 94. Architecture Checklist

Before implementing any new feature, verify the following.

□ Does the feature belong inside an existing Plugin?

□ Does the feature have one clear owner?

□ Does the feature follow the processing pipeline?

□ Are responsibilities clearly separated?

□ Is deterministic logic isolated from AI reasoning?

□ Are interfaces respected?

□ Does the Platform Core remain free of business logic?

□ Can the feature be tested independently?

□ Does the feature preserve explainability?

□ Does the feature follow the documented architecture?

If any answer is "No", reconsider the implementation before writing code.

---

# 95. Architecture Summary

The architecture of the Investment Intelligence Platform is intentionally simple.

The Platform Core provides infrastructure.

Plugins provide financial intelligence.

Deterministic processing produces structured evidence.

The Decision Engine transforms evidence into scores.

The Reasoning Layer prepares context.

The LLM communicates understanding.

The architecture should grow through extension rather than redesign.

Every architectural decision should reinforce:

* Modularity
* Determinism
* Explainability
* Maintainability
* Testability
* Local-first development

These principles define the technical foundation of the platform and should remain stable as the system evolves.

# Appendix A — End-to-End Execution Examples

This appendix demonstrates how the architecture operates using realistic examples.

The purpose of these examples is to illustrate how the different architectural components collaborate.

These examples are informative rather than normative.

The architectural rules defined earlier in this document remain authoritative.

---

# Example 1 — Scheduled Performance Analysis

## Scenario

The daily scheduler triggers the Performance Plugin to refresh historical NAV data and update performance metrics.

---

## Step 1 — Scheduler

The Scheduler determines that the daily Performance Plugin job should execute.

The Scheduler sends an execution request to the Plugin Manager.

The Scheduler does not execute business logic itself.

---

## Step 2 — Plugin Manager

The Plugin Manager:

* Locates the Performance Plugin.
* Verifies that it is enabled.
* Loads its configuration.
* Starts the execution lifecycle.

---

## Step 3 — Collector

The NAV Collector retrieves:

* Latest NAV values
* Historical NAV records

The Collector validates the response.

No financial calculations occur.

Output:

Raw NAV Data.

---

## Step 4 — Normalizer

The Normalizer converts external responses into internal domain models.

Examples:

External Provider

↓

Different field names

↓

Internal NAV Model

Missing values are validated.

Units are standardized.

Output:

Normalized NAV Records.

---

## Step 5 — Analyzer

The Performance Analyzer calculates:

* CAGR
* Rolling Returns
* Annualized Returns
* Monthly Returns

The Analyzer creates Evidence describing the calculated metrics.

Output:

Performance Evidence.

---

## Step 6 — Detector

The Detector examines Evidence.

Examples:

Rolling returns improving.

↓

Signal generated.

Volatility increasing.

↓

Signal generated.

Signals describe observations.

They do not provide investment advice.

---

## Step 7 — Knowledge Builder

Repeated Signals are accumulated.

Example:

Signal:

Performance consistently exceeds benchmark.

↓

Observed repeatedly over multiple years.

↓

Knowledge:

"The fund has demonstrated persistent outperformance relative to its benchmark."

Knowledge represents long-term understanding.

---

## Step 8 — Decision Engine

The Decision Engine combines:

* Performance Evidence
* Signals
* Knowledge

It calculates:

* Performance Score
* Confidence

Outputs are deterministic.

---

## Step 9 — Evidence Store

The Platform persists:

* Evidence
* Signals
* Knowledge
* Scores

These become available for future queries.

Processing Mode ends.

No LLM interaction has occurred.

---

# Example 2 — User Question

## Scenario

The user asks:

> "Why has Fund A outperformed Fund B during the past year?"

The Platform enters Query Mode.

---

## Step 1 — User Request

The user submits a natural-language question.

The Platform identifies:

* Comparison request.
* Performance question.
* Time period:
  One year.

---

## Step 2 — Reasoning Orchestrator

The Reasoning Orchestrator determines which information is required.

Examples:

Performance Evidence.

Relevant Signals.

Knowledge.

Performance Scores.

Confidence.

No financial calculations occur.

---

## Step 3 — Evidence Retrieval

Relevant information is retrieved from the Evidence Store.

Only information related to the requested funds and time period is selected.

Historical datasets are not passed directly to the LLM.

---

## Step 4 — Context Builder

The Context Builder prepares a structured reasoning package.

Example:

Performance Score

92

Performance Evidence

Rolling return exceeded category average by 4.3%.

Signal

Outperformance remained consistent for 11 months.

Knowledge

Manager historically performs well during manufacturing sector expansion.

Confidence

94%.

Only relevant information is included.

---

## Step 5 — LLM

The LLM receives only the structured reasoning context.

The LLM explains:

* What happened.
* Why it happened.
* Which Evidence supports the explanation.
* Which Signals contributed.
* Which Knowledge provides historical context.

The LLM does not calculate financial metrics.

The LLM does not invent Evidence.

---

## Step 6 — Final Response

The Platform returns a structured explanation.

Example:

"Fund A outperformed primarily because it maintained consistently higher rolling returns over the past eleven months. The Performance Plugin detected sustained outperformance relative to the category average, while the Strategy Plugin identified an increased allocation to manufacturing and capital goods during a period of sector strength. Historical Knowledge indicates that the fund manager has previously demonstrated similar positioning during comparable market conditions. Overall confidence in this explanation is 94%."

The explanation is fully supported by deterministic outputs.

---

# Example 3 — Plugin Failure

## Scenario

The Macro Plugin fails because an external API is temporarily unavailable.

---

## Execution

The Collector reports a recoverable failure.

The Plugin Manager records the Plugin status.

The Scheduler schedules a retry according to policy.

Other Plugins continue executing normally.

Examples:

Performance Plugin

✓ Continues

Risk Plugin

✓ Continues

Holdings Plugin

✓ Continues

No unrelated Plugin is affected.

The architecture isolates failures.

---

# Example 4 — Adding a New Plugin

## Scenario

Support for Exchange Traded Funds (ETFs) is added.

Implementation steps:

Create:

ETF Plugin.

Implement:

* Collector
* Normalizer
* Analyzer
* Detector
* Knowledge Builder

Register the Plugin.

Provide configuration.

Enable scheduling.

No existing Plugin is modified.

The Platform Core is unchanged.

The architecture has been extended without redesign.

---

# Example 5 — Explaining a Score

## Scenario

The user asks:

> "Why did this fund receive a Performance Score of 91?"

The Platform retrieves:

Evidence:

Rolling returns consistently exceeded category averages.

Signals:

Positive trend maintained across multiple evaluation periods.

Knowledge:

The fund manager has repeatedly demonstrated effective sector allocation during similar market conditions.

Decision Engine Output:

Performance Score:

91

Confidence:

93%

The LLM explains the Score using only the retrieved information.

The explanation remains traceable.

Every statement can be linked back to deterministic Evidence.

---

# Architectural Lessons

The previous examples illustrate several core principles.

Processing Mode creates financial intelligence.

Query Mode consumes financial intelligence.

The Platform Core coordinates execution.

Plugins own business logic.

Deterministic processing precedes AI reasoning.

Evidence is persisted before it is explained.

The LLM communicates understanding rather than generating financial truth.

These principles should remain true regardless of how the Platform evolves in the future.
