# 21_DATA_MODEL.md

> **Project:** Investment Intelligence Platform
>
> **Purpose:** Define the canonical data model for the platform.
>
> **Audience:** Developers and AI coding assistants.
>
> **Status:** Living Document
>
> **Priority:** Critical

---

# 1. Purpose

This document defines the data model of the Investment Intelligence Platform.

The data model describes:

* Business entities
* Processing entities
* Relationships
* Ownership
* Lifecycle
* Validation rules

Every important piece of information processed by the platform should correspond to a documented entity.

---

# 2. Design Principles

The data model follows the principles below.

## Single Ownership

Every entity has one owner.

Only the owner creates or modifies that entity.

---

## Strong Typing

Entities should represent well-defined concepts.

Avoid generic objects such as:

* Data
* Result
* Output
* Item

Prefer domain-specific entities.

---

## Immutability

Processing entities SHOULD be immutable whenever practical.

Instead of modifying existing Evidence, generate new Evidence.

Immutability improves:

* Traceability
* Debugging
* Reproducibility
* Testing

---

## Explainability

Every entity should contribute to explainability.

The platform should always be able to answer:

* Where did this entity originate?
* Which component produced it?
* Which inputs were used?

---

## Traceability

Every derived entity should reference its origin.

Example:

Evidence

↓

Generated from Metrics

↓

Generated from NAV History

↓

Collected from Provider

The entire chain should remain reconstructable.

---

# 3. Information Maturity Model

Information evolves through multiple stages.

Each stage represents an increase in understanding.

```text
Raw Data
    ↓
Normalized Data
    ↓
Metrics
    ↓
Evidence
    ↓
Signals
    ↓
Knowledge
    ↓
Scores
    ↓
Insight
```

Each stage has a different owner.

No stage should be skipped.

---

# 4. Entity Categories

The platform contains five categories of entities.

## Category 1

Core Financial Entities

Examples:

* Fund
* NAV
* Benchmark
* Holdings

---

## Category 2

Processing Entities

Examples:

* Metric
* Evidence
* Signal
* Knowledge
* Score

---

## Category 3

Platform Entities

Examples:

* Plugin
* Execution
* Configuration
* Schedule

---

## Category 4

Reasoning Entities

Examples:

* Reasoning Context
* Insight
* User Question

---

## Category 5

Operational Entities

Examples:

* Log Entry
* Health Status
* Execution Result

Each category serves a distinct purpose within the architecture.

---

# 5. Entity Relationships

The platform is centered around the Fund entity.

A simplified relationship diagram is shown below.

```text
Fund
 │
 ├──────── NAV
 │
 ├──────── Holdings
 │
 ├──────── Benchmark
 │
 ├──────── Category
 │
 ├──────── Metrics
 │
 ├──────── Evidence
 │
 ├──────── Signals
 │
 ├──────── Knowledge
 │
 └──────── Scores
```

Every major analytical entity should ultimately relate back to one or more Funds.

---

# 6. Core Entity — Fund

## Purpose

Represents a financial product being analyzed.

The Fund is the central business entity of the platform.

---

## Owner

Platform

---

## Produced By

External providers.

---

## Consumed By

Every Plugin.

---

## Lifecycle

Created

↓

Updated when provider metadata changes

↓

Referenced by analytical entities

The identity of a Fund should remain stable.

---

## Typical Fields

Examples include:

* Fund Identifier
* Fund Name
* Category
* AMC
* Launch Date
* Benchmark
* Asset Class
* Status

Field definitions are intentionally implementation-independent.

---

## Relationships

A Fund may have:

* Many NAV records
* One Category
* One Benchmark
* Many Holdings
* Many Metrics
* Many Evidence records
* Many Signals
* Many Knowledge records
* Many Scores

---

## Validation Rules

A Fund MUST:

* Have a unique identifier.
* Belong to one category.
* Reference one benchmark where applicable.

---

## Future Extensions

Possible future additions include:

* Expense Ratio
* Fund Manager
* AUM
* ESG Rating
* Tax Classification

---

# 7. Core Entity — NAV

## Purpose

Represents the Net Asset Value of a Fund for a specific date.

NAV is one of the primary inputs for deterministic analysis.

---

## Owner

Collector

---

## Produced By

External data providers.

---

## Consumed By

Performance Plugin.

Risk Plugin.

Consistency Plugin.

---

## Lifecycle

Collected

↓

Normalized

↓

Persisted

↓

Consumed by Analyzers

NAV records should never be modified after successful validation.

---

## Typical Fields

Examples include:

* Fund Identifier
* Date
* NAV Value
* Currency
* Source
* Collection Timestamp

---

## Relationships

Many NAV records belong to one Fund.

NAV records produce Metrics.

---

## Validation Rules

A NAV record MUST:

* Reference one Fund.
* Contain one valid date.
* Contain one numerical NAV value.
* Preserve provider accuracy.

---

# 8. Part 1 Summary

This section defines the philosophy behind the Platform's data model.

The next sections will introduce the processing entities that form the core of the Platform's intelligence:

* Metric
* Evidence
* Signal
* Knowledge
* Score

These entities are the foundation of deterministic reasoning and will be used extensively throughout the rest of the system.

# 9. Processing Entity — Metric

## Purpose

A Metric is a deterministic numerical value calculated from normalized financial data.

Metrics are the first level of interpretation within the Platform.

They answer questions such as:

* What is the CAGR?
* What is the Sharpe Ratio?
* What is the Drawdown?
* What is the Rolling Return?

Metrics are objective measurements.

They do not express opinions.

---

## Owner

Analyzer

---

## Produced By

Analyzers

---

## Consumed By

* Evidence
* Decision Engine
* Future analyzers

---

## Lifecycle

Normalized Data

↓

Metric Calculation

↓

Validation

↓

Persistence

↓

Evidence Generation

---

## Relationships

A Metric belongs to:

* One Plugin
* One Fund
* One Metric Type

A Metric may contribute to:

* Multiple Evidence records
* Multiple Scores

---

## Typical Fields

Examples include:

* Metric Identifier
* Fund Identifier
* Metric Type
* Metric Value
* Calculation Period
* Calculation Timestamp
* Source Analyzer
* Version

---

## Validation Rules

A Metric MUST:

* Be deterministic.
* Be reproducible.
* Reference its source data.
* Reference its Analyzer.

---

# 10. Processing Entity — Evidence

## Purpose

Evidence is the primary factual output of the Platform.

Evidence transforms numerical Metrics into structured facts that can support reasoning.

Examples:

Metric

Rolling Return = 18.4%

↓

Evidence

"The fund has maintained an 18.4% rolling annual return during the evaluation period."

Evidence is still deterministic.

It is not an opinion.

---

## Owner

Analyzer

---

## Produced By

Analyzers

---

## Consumed By

* Detectors
* Decision Engine
* Reasoning Layer

---

## Lifecycle

Metrics

↓

Evidence

↓

Persistence

↓

Signal Detection

↓

Reasoning

---

## Relationships

Evidence references:

* One Plugin
* One Fund
* One Analyzer
* One or more Metrics

Evidence may generate:

* Signals
* Scores

---

## Typical Fields

Examples include:

* Evidence Identifier
* Plugin
* Fund
* Supporting Metrics
* Description
* Confidence
* Timestamp
* Version

---

## Validation Rules

Evidence MUST:

* Reference supporting Metrics.
* Be reproducible.
* Be explainable.
* Preserve traceability.

---

# 11. Processing Entity — Signal

## Purpose

Signals identify meaningful relationships discovered from Evidence.

Signals answer questions such as:

* What changed?
* What pattern emerged?
* What became significant?

Signals describe observations.

They do not provide recommendations.

---

## Owner

Detector

---

## Produced By

Detectors

---

## Consumed By

* Knowledge Builders
* Decision Engine
* Reasoning Layer

---

## Lifecycle

Evidence

↓

Signal Detection

↓

Persistence

↓

Knowledge Generation

---

## Relationships

Signals reference:

* Evidence
* Plugin
* Fund
* Detector

Signals may contribute to:

* Knowledge
* Scores

---

## Typical Fields

Examples include:

* Signal Identifier
* Signal Type
* Severity
* Description
* Confidence
* Timestamp
* Plugin

---

## Validation Rules

Signals MUST:

* Reference supporting Evidence.
* Be reproducible.
* Be explainable.

Signals MUST NOT exist without Evidence.

---

# 12. Processing Entity — Knowledge

## Purpose

Knowledge represents stable understanding accumulated over time.

Knowledge answers questions such as:

* What usually happens?
* Which patterns repeat?
* Which behaviors are persistent?

Knowledge represents accumulated experience rather than individual events.

---

## Owner

Knowledge Builder

---

## Produced By

Knowledge Builders

---

## Consumed By

* Decision Engine
* Reasoning Layer
* LLM

---

## Lifecycle

Signals

↓

Pattern Accumulation

↓

Knowledge

↓

Persistence

↓

Reasoning

Knowledge evolves gradually.

---

## Relationships

Knowledge references:

* Multiple Signals
* Plugin
* Fund
* Knowledge Builder

Knowledge contributes to:

* Scores
* Insights

---

## Typical Fields

Examples include:

* Knowledge Identifier
* Knowledge Type
* Description
* Supporting Signals
* Confidence
* Valid Since
* Last Updated

---

## Validation Rules

Knowledge MUST:

* Be supported by historical Signals.
* Preserve supporting references.
* Be explainable.

Knowledge MUST NOT be inferred directly from Metrics.

---

# 13. Processing Entity — Score

## Purpose

A Score summarizes multiple pieces of deterministic analysis into a standardized numerical evaluation.

Scores simplify comparison across funds.

Examples include:

* Performance Score
* Risk Score
* Consistency Score
* Portfolio Score
* Overall Score

Scores support ranking.

They do not replace Evidence.

---

## Owner

Decision Engine

---

## Produced By

Decision Engine

---

## Consumed By

* Reasoning Layer
* User Interface
* Reports

---

## Lifecycle

Evidence

↓

Signals

↓

Knowledge

↓

Decision Engine

↓

Score

↓

Persistence

↓

Reasoning

---

## Relationships

A Score references:

* Evidence
* Signals
* Knowledge
* Fund

---

## Typical Fields

Examples include:

* Score Identifier
* Score Type
* Numerical Value
* Weighting Model
* Confidence
* Timestamp
* Decision Engine Version

---

## Validation Rules

Scores MUST:

* Be reproducible.
* Reference supporting information.
* Preserve explainability.

Scores MUST NOT exist without deterministic inputs.

---

# 14. Relationship Between Processing Entities

The following diagram summarizes the relationship between the Platform's processing entities.

```text
Normalized Data
        │
        ▼
Metrics
        │
        ▼
Evidence
        │
        ▼
Signals
        │
        ▼
Knowledge
        │
        ▼
Scores
        │
        ▼
Reasoning Context
        │
        ▼
Insight
```

Each entity represents a higher level of understanding.

No stage replaces the previous one.

Every stage builds upon it.

---

# 15. Ownership Summary

| Entity    | Owner             |
| --------- | ----------------- |
| Metric    | Analyzer          |
| Evidence  | Analyzer          |
| Signal    | Detector          |
| Knowledge | Knowledge Builder |
| Score     | Decision Engine   |

Ownership is exclusive.

Only the owning component may create or modify the entity.

Other components consume the entity through documented interfaces.

---

# 16. Why These Entities Exist

The Platform intentionally separates:

Metrics

↓

Evidence

↓

Signals

↓

Knowledge

↓

Scores

rather than combining them into a single generic object.

Benefits include:

* Better explainability.
* Clear ownership.
* Easier testing.
* Independent evolution.
* Lower coupling.
* Richer reasoning context.

Each entity has one responsibility.

This separation is fundamental to the Platform's design and should remain stable throughout the life of the project.

# 17. Reasoning Entity — User Question

## Purpose

Represents a user's request to the Platform.

A User Question initiates Query Mode.

It provides the intent that drives retrieval and reasoning.

Examples include:

* Why has this fund outperformed?
* Compare Fund A and Fund B.
* Which mid-cap funds currently demonstrate the strongest consistency?
* Has this fund changed its investment strategy?

---

## Owner

Platform

---

## Produced By

* CLI
* REST API
* Future Web UI
* Future MCP Clients

---

## Consumed By

* Reasoning Orchestrator
* Context Builder

---

## Lifecycle

User Request

↓

Validation

↓

Intent Identification

↓

Reasoning Context Construction

↓

Response Generation

---

## Typical Fields

Examples include:

* Question Identifier
* Original Question
* Normalized Query
* Timestamp
* Session Identifier
* Requested Funds
* Requested Time Period
* Requested Categories

---

## Validation Rules

A User Question MUST:

* Contain meaningful text.
* Preserve the original wording.
* Record creation time.

---

# 18. Reasoning Entity — Reasoning Context

## Purpose

Represents the complete deterministic context prepared for the LLM.

The Reasoning Context is the most important non-financial entity in the Platform.

It bridges deterministic analysis and conversational AI.

---

## Owner

Reasoning Orchestrator

---

## Produced By

Reasoning Orchestrator

---

## Consumed By

LLM

---

## Lifecycle

User Question

↓

Evidence Retrieval

↓

Signal Retrieval

↓

Knowledge Retrieval

↓

Score Retrieval

↓

Context Assembly

↓

LLM

---

## Relationships

A Reasoning Context references:

* One User Question
* Zero or more Evidence
* Zero or more Signals
* Zero or more Knowledge objects
* Zero or more Scores

---

## Typical Fields

Examples include:

* Context Identifier
* User Question
* Selected Evidence
* Selected Signals
* Selected Knowledge
* Selected Scores
* Overall Confidence
* Generated Timestamp

---

## Validation Rules

A Reasoning Context MUST:

* Reference deterministic outputs only.
* Preserve traceability.
* Avoid duplicate information.
* Minimize unnecessary data.

The Reasoning Context SHOULD contain only information relevant to the user's question.

---

# 19. Reasoning Entity — Insight

## Purpose

Represents the final human-readable response generated by the LLM.

Insights communicate understanding.

Insights do not create financial truth.

---

## Owner

LLM

---

## Produced By

LLM

---

## Consumed By

* CLI
* REST API
* Future UI
* Reports

---

## Lifecycle

Reasoning Context

↓

LLM

↓

Insight

↓

User

---

## Relationships

An Insight references:

* One User Question
* One Reasoning Context

An Insight is supported by:

* Evidence
* Signals
* Knowledge
* Scores

through the Reasoning Context.

---

## Typical Fields

Examples include:

* Insight Identifier
* Generated Response
* Supporting Confidence
* Generation Timestamp
* Model Information
* Reasoning Context Identifier

---

## Validation Rules

Insights MUST:

* Remain grounded in the supplied Reasoning Context.
* Preserve explainability.
* Avoid unsupported conclusions.

Insights MUST NOT introduce deterministic financial calculations.

---

# 20. Reasoning Entity Relationships

The reasoning entities operate as follows.

```text
User Question
        │
        ▼
Reasoning Orchestrator
        │
        ▼
Reasoning Context
        │
        ▼
LLM
        │
        ▼
Insight
```

The LLM never communicates directly with the Evidence Store.

All reasoning passes through the Reasoning Context.

---

# 21. Platform Entity — Plugin

## Purpose

Represents one independently deployable business capability.

A Plugin owns one business domain.

Examples:

* Performance
* Risk
* Macro
* Holdings
* Strategy

---

## Owner

Platform Core

---

## Produced By

Plugin Registration

---

## Consumed By

* Plugin Registry
* Plugin Manager
* Scheduler

---

## Typical Fields

Examples include:

* Plugin Identifier
* Plugin Name
* Plugin Version
* Status
* Configuration
* Enabled Flag

---

## Validation Rules

A Plugin MUST:

* Have a unique identifier.
* Implement the Plugin Contract.
* Register successfully before execution.

---

# 22. Platform Entity — Plugin Execution

## Purpose

Represents one execution of a Plugin.

Every Plugin execution should be independently traceable.

---

## Owner

Plugin Manager

---

## Produced By

Scheduler or Manual Execution

---

## Consumed By

* Logging
* Monitoring
* Debugging
* Future Dashboard

---

## Typical Fields

Examples include:

* Execution Identifier
* Plugin Identifier
* Start Time
* End Time
* Status
* Records Processed
* Evidence Generated
* Error Count

---

## Validation Rules

Every execution MUST:

* Have a unique identifier.
* Record execution status.
* Record execution timestamps.

---

# 23. Platform Entity — Configuration

## Purpose

Represents validated runtime configuration.

Configuration controls execution.

Configuration does not define business rules.

---

## Owner

Configuration Manager

---

## Produced By

Platform Startup

---

## Consumed By

Platform Components

---

## Typical Fields

Examples include:

* Environment
* Database Configuration
* API Credentials
* Scheduler Configuration
* Plugin Configuration
* Logging Configuration

---

## Validation Rules

Configuration MUST:

* Be validated before use.
* Be immutable during execution unless explicitly reloaded.
* Never contain business logic.

---

# 24. Operational Entity — Execution Result

## Purpose

Represents the outcome of any executable operation.

Examples include:

* Plugin execution
* Data collection
* Metric calculation
* Knowledge generation

Execution Results support monitoring and debugging.

---

## Typical Fields

Examples include:

* Result Identifier
* Component
* Status
* Duration
* Error Details
* Warnings
* Output Counts

---

# 25. Operational Entity — Health Status

## Purpose

Represents the current operational health of a component.

Health information supports diagnostics and future monitoring.

---

## Typical Fields

Examples include:

* Component Identifier
* Health Status
* Last Successful Execution
* Last Failure
* Consecutive Failures
* Current Availability

---

# 26. Entity Dependency Graph

The conceptual dependency graph for the Platform is shown below.

```text
Fund
 │
 ├── NAV
 │
 ├── Holdings
 │
 └── Benchmark
      │
      ▼
Normalized Data
      │
      ▼
Metric
      │
      ▼
Evidence
      │
      ▼
Signal
      │
      ▼
Knowledge
      │
      ▼
Score
      │
      ▼
Reasoning Context
      │
      ▼
Insight
```

Every analytical entity ultimately traces back to deterministic financial data.

---

# 27. Data Model Principles

The complete data model follows these principles.

* Every entity has one owner.
* Every entity has one primary responsibility.
* Every entity has a documented lifecycle.
* Every derived entity references its origin.
* Every important conclusion remains traceable.
* Business entities remain separate from operational entities.
* Deterministic entities remain separate from AI-generated entities.

These principles ensure that the Platform remains explainable, maintainable, and extensible as additional Plugins and asset classes are introduced.

# 28. Entity Identity

## Purpose

Every entity in the Platform MUST have a stable identity.

Identity allows entities to be:

* Referenced
* Versioned
* Related
* Audited
* Explained

Identity is a business concept rather than a database implementation detail.

---

## Identity Principles

Every entity SHOULD:

* Have one primary identifier.
* Retain its identifier throughout its lifecycle.
* Never change identity after creation.

Identifiers should remain stable even if the underlying implementation changes.

---

## Entity Identity Summary

| Entity            | Identity               |
| ----------------- | ---------------------- |
| Fund              | Fund Identifier        |
| NAV               | Fund Identifier + Date |
| Metric            | Metric Identifier      |
| Evidence          | Evidence Identifier    |
| Signal            | Signal Identifier      |
| Knowledge         | Knowledge Identifier   |
| Score             | Score Identifier       |
| Reasoning Context | Context Identifier     |
| Insight           | Insight Identifier     |
| Plugin            | Plugin Identifier      |
| Plugin Execution  | Execution Identifier   |

Identity should be unique within the scope of the Platform.

---

# 29. Entity Relationships

The Platform follows explicit relationships between entities.

## Fund Relationships

One Fund

↓

Many NAV Records

One Fund

↓

Many Metrics

One Fund

↓

Many Evidence Records

One Fund

↓

Many Signals

One Fund

↓

Many Knowledge Records

One Fund

↓

Many Scores

---

## Evidence Relationships

One Evidence

↓

Many Signals

One Signal

↓

Many Knowledge Objects

One Knowledge Object

↓

Many Scores

These relationships represent conceptual ownership.

---

# 30. Cardinality

The following cardinalities define expected relationships.

| Relationship                      | Cardinality  |
| --------------------------------- | ------------ |
| Fund → NAV                        | One to Many  |
| Fund → Metric                     | One to Many  |
| Fund → Evidence                   | One to Many  |
| Fund → Signal                     | One to Many  |
| Fund → Knowledge                  | One to Many  |
| Fund → Score                      | One to Many  |
| Evidence → Signal                 | One to Many  |
| Signal → Knowledge                | Many to Many |
| Knowledge → Score                 | Many to Many |
| User Question → Reasoning Context | One to One   |
| Reasoning Context → Insight       | One to One   |

Cardinality defines conceptual relationships rather than physical database design.

---

# 31. Entity Versioning

## Purpose

Financial analysis evolves.

The Platform should preserve historical outputs rather than replacing them.

Versioning enables:

* Reproducibility
* Auditing
* Historical comparison
* Algorithm improvements

---

## Versioning Principles

Entities SHOULD be versioned whenever:

* Analysis algorithms change.
* Scoring methodology changes.
* Plugin logic changes.
* Supporting data changes materially.

Versioning should preserve previous outputs whenever practical.

---

## Versioned Entities

The following entities SHOULD support versioning.

* Metric
* Evidence
* Signal
* Knowledge
* Score

Raw financial data should generally preserve provider history rather than Platform versions.

---

# 32. Temporal Validity

Financial information changes over time.

Every derived entity should clearly indicate the period it represents.

Examples:

Metric

Valid for:

2024-01-01 to 2024-12-31

Knowledge

Valid since:

2022-08-15

Score

Calculated on:

2026-07-12

Users should always understand the time period represented by an entity.

---

# 33. Entity Lineage

## Purpose

Every important conclusion should be traceable back to its origin.

Lineage enables explainability.

---

## Example

```text
Insight

↓

Reasoning Context

↓

Score

↓

Knowledge

↓

Signal

↓

Evidence

↓

Metric

↓

Normalized NAV

↓

Raw NAV

↓

External Provider
```

Every stage should preserve references to its immediate inputs.

The complete chain should be reconstructable.

---

# 34. Confidence Propagation

Confidence should accompany derived entities.

Confidence is not certainty.

It represents the Platform's assessment of how well the available evidence supports the conclusion.

---

## Confidence Flow

```text
Metric
     ↓
Evidence
     ↓
Signal
     ↓
Knowledge
     ↓
Score
     ↓
Reasoning Context
```

Each stage should explain how its confidence was derived.

Confidence should never be invented by the LLM.

The LLM communicates confidence.

It does not calculate confidence.

---

# 35. Entity Lifecycle Summary

Every entity follows a lifecycle.

```text
Created
    ↓
Validated
    ↓
Persisted
    ↓
Consumed
    ↓
Referenced
    ↓
Superseded (if applicable)
    ↓
Archived (future)
```

Entities should not be silently modified after creation.

If information changes materially, a new version should be produced.

---

# 36. Validation Principles

Every entity SHOULD be validated before it becomes available to downstream components.

Validation includes:

Structural validation

Examples:

* Required fields exist.
* Data types are correct.
* Identifiers are present.

---

Business validation

Examples:

* NAV is positive.
* Fund exists.
* Metric period is valid.
* Confidence is within expected bounds.

---

Relationship validation

Examples:

* Evidence references existing Metrics.
* Signals reference existing Evidence.
* Scores reference deterministic inputs.

Validation failures should never be ignored.

---

# 37. Data Integrity Rules

The following rules apply throughout the Platform.

* Every derived entity references its inputs.
* Every entity has a documented owner.
* Every entity has a documented lifecycle.
* Every entity is independently explainable.
* Every entity is independently testable.
* Derived entities remain reproducible.
* AI-generated entities never replace deterministic entities.

These rules preserve long-term trust in the Platform.

---

# 38. Data Model Checklist

Before introducing a new entity, verify the following.

□ Does the entity represent one clear concept?

□ Does it have one owner?

□ Is its lifecycle documented?

□ Are its relationships defined?

□ Is its identity stable?

□ Can it be validated?

□ Can it be explained?

□ Can it be versioned if required?

□ Can it be traced back to its source?

□ Does it avoid duplicating an existing entity?

If any answer is "No", reconsider the design before implementation.

---

# 39. Data Model Summary

The data model defines the conceptual language of the Investment Intelligence Platform.

Business entities represent financial products.

Processing entities represent deterministic analysis.

Reasoning entities bridge deterministic outputs and conversational AI.

Operational entities support execution and observability.

Every entity has:

* A single responsibility.
* A documented owner.
* A documented lifecycle.
* Explicit relationships.
* Stable identity.
* Clear traceability.

The conceptual data model should remain stable even if the underlying persistence technology changes.

This document intentionally avoids storage-specific concerns.

Database implementation details belong in `25_DATABASE.md`.
