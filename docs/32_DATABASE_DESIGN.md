# 32_DATABASE_DESIGN.md

> **Project:** Investment Intelligence Platform
>
> **Purpose:** Define the persistence architecture for the Platform.
>
> **Audience:** Developers and AI coding assistants.
>
> **Status:** Living Document
>
> **Priority:** Critical

---

# 1. Purpose

This document defines how Platform information is persisted.

The objective is to:

* Preserve deterministic outputs.
* Support reproducibility.
* Enable explainability.
* Maintain architectural independence from any specific database technology.

The database is an implementation detail.

The persistence model is the architectural concern.

---

# 2. Persistence Philosophy

Business logic should never depend directly on database technology.

The architecture separates:

```text
Business Logic

↓

Evidence Store

↓

Persistence Engine

↓

Database
```

Business components interact only with the Evidence Store.

The Evidence Store determines how information is stored and retrieved.

---

# 3. Persistence Goals

The persistence layer SHOULD provide:

* Reliability
* Reproducibility
* Traceability
* Versioning
* Efficient retrieval
* Simplicity

Performance optimizations should never compromise deterministic behavior.

---

# 4. Persistence Scope

The Platform persists deterministic information.

Examples include:

Business Data

* Funds
* NAV History
* Holdings
* Benchmarks

Derived Information

* Metrics
* Evidence
* Signals
* Knowledge
* Decision Packages

Operational Information

* Plugin Executions
* Logs
* Health Reports

Configuration is stored separately from deterministic business information.

---

# 5. Persistence Principles

Every persisted entity SHOULD satisfy:

* Stable identity.
* Version support.
* Traceability.
* Immutability whenever practical.
* Independent retrieval.

Persisted objects should remain independently understandable.

---

# 6. Evidence Store

The Evidence Store is the primary persistence abstraction.

Responsibilities include:

* Persist deterministic entities.
* Retrieve deterministic entities.
* Preserve relationships.
* Preserve lineage.
* Support historical reconstruction.

The Evidence Store owns persistence.

Plugins do not.

---

# 7. Repository Pattern

Every major entity SHOULD have its own Repository.

Examples:

Fund Repository

Metric Repository

Evidence Repository

Signal Repository

Knowledge Repository

Decision Package Repository

Repositories abstract storage implementation.

Business logic communicates with Repositories rather than databases.

---

# 8. Repository Responsibilities

Repositories SHOULD:

* Store entities.
* Retrieve entities.
* Query entities.
* Support version retrieval.
* Support historical retrieval.

Repositories SHOULD NOT:

* Calculate business Metrics.
* Generate Evidence.
* Invoke Plugins.

Repositories manage persistence only.

---

# 9. Storage Categories

The Platform stores several categories of information.

Reference Data

Examples:

* Funds
* Categories
* Benchmarks

Historical Data

Examples:

* NAV History
* Holdings History

Derived Data

Examples:

* Metrics
* Evidence
* Signals
* Knowledge

Decision Data

Examples:

* Scores
* Decision Packages

Operational Data

Examples:

* Logs
* Executions
* Diagnostics

Separating storage categories improves clarity and future optimization.

---

# 10. Storage Independence

Business code should never assume:

* SQL
* SQLite
* PostgreSQL
* File storage

The only dependency should be:

Repository Contracts.

Changing storage technology should not require changes to Plugin implementations.

---

# 11. Persistence Lifecycle

Every persisted entity follows the same lifecycle.

```text
Created

↓

Validated

↓

Persisted

↓

Referenced

↓

Versioned (if required)

↓

Archived (future)
```

Entities should not be silently modified after persistence.

---

# 12. Retrieval Principles

Retrieval SHOULD be:

* Explicit.
* Deterministic.
* Traceable.
* Independently testable.

Queries should communicate business intent rather than database implementation.

Example:

Preferred

Retrieve Evidence for Fund X during the last five years.

Avoid

Execute arbitrary SQL from business logic.

---

# 13. Database Design Principles

The physical database should reflect the conceptual data model.

The database should not redefine business concepts.

Storage design exists to support:

* Business entities.
* Relationships.
* Efficient retrieval.

Architecture remains the primary source of truth.

---

# 14. Part 1 Summary

The persistence architecture separates business logic from storage technology.

The Platform persists deterministic information through the Evidence Store and Repository abstractions.

The following sections will define:

* Entity persistence
* Versioning
* Lineage
* Indexing
* Local-first storage
* Future migration to production databases

while preserving the architectural independence established throughout the Platform.

# 15. Persistence Entity Model

## Purpose

The Platform persists different kinds of information.

Not every entity has the same purpose or lifecycle.

This section classifies persisted entities according to their business role.

The classification is conceptual and remains independent of the underlying database technology.

---

# 16. Entity Categories

The Platform recognizes three primary categories of persisted entities.

| Category             | Purpose                                                |
| -------------------- | ------------------------------------------------------ |
| Primary Entities     | External business information collected from providers |
| Derived Entities     | Deterministic outputs generated by the Platform        |
| Operational Entities | Information about Platform execution and health        |

Each category has different lifecycle and storage requirements.

---

# 17. Primary Entities

Primary Entities represent externally sourced information.

Examples include:

* Fund
* NAV
* Holdings
* Benchmark
* Market Index
* Fund Manager
* Asset Category

These entities are collected rather than calculated.

They form the foundation of deterministic analysis.

---

# 18. Characteristics of Primary Entities

Primary Entities SHOULD:

* Preserve provider values.
* Record data source.
* Record collection timestamp.
* Preserve historical versions when applicable.
* Avoid Platform-specific interpretation.

Primary Entities should remain as close as practical to the original provider data after normalization.

---

# 19. Derived Entities

Derived Entities are produced by deterministic Platform processing.

Examples include:

* Metric
* Evidence
* Signal
* Knowledge
* Score
* Decision Package

Derived Entities represent the Platform's understanding of collected information.

---

# 20. Characteristics of Derived Entities

Derived Entities SHOULD:

* Reference their source entities.
* Record processing version.
* Record creation timestamp.
* Preserve deterministic lineage.
* Be reproducible.

Derived Entities should never lose the relationship to the information that produced them.

---

# 21. Operational Entities

Operational Entities describe Platform execution.

Examples include:

* Plugin Execution
* Health Report
* Execution Metrics
* Cache Metadata
* Audit Event

Operational Entities exist to support monitoring and diagnostics.

They are not part of financial reasoning.

---

# 22. Characteristics of Operational Entities

Operational Entities SHOULD:

* Have limited retention where appropriate.
* Support diagnostics.
* Support troubleshooting.
* Support performance analysis.

Operational Entities should never influence deterministic financial calculations.

---

# 23. Entity Relationships

Entities form a directed graph.

Example:

```text
Fund
   │
   ▼
NAV History
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
Decision Package
```

Every important derived entity should be traceable back to its originating Primary Entities.

---

# 24. Entity Identity

Every persisted entity SHOULD have a stable identifier.

Identifiers should remain independent of the underlying storage technology.

Preferred characteristics include:

* Globally unique within the Platform.
* Stable across executions.
* Human-readable where practical.

Entity identity should never depend on database row identifiers.

---

# 25. Entity Immutability

Derived Entities SHOULD be treated as immutable.

If:

* Source data changes,
* Processing logic changes,
* Scoring policies change,

the Platform should create a new Derived Entity rather than modifying the existing one.

Historical evaluations should remain reproducible.

---

# 26. Entity Versioning

Versioning should exist at multiple levels.

Examples include:

* Source Data Version
* Plugin Version
* Scoring Policy Version
* Decision Engine Version
* Entity Version

Version information enables historical reconstruction and reproducibility.

---

# 27. Entity Lineage

Every Derived Entity SHOULD preserve lineage.

Example:

```text
Decision Package
        │
        ▼
Knowledge
        │
        ▼
Signals
        │
        ▼
Evidence
        │
        ▼
Metrics
        │
        ▼
NAV History
```

The Platform should always be able to reconstruct how an important conclusion was produced.

---

# 28. Persistence Responsibilities

Different Platform components own different entity categories.

| Component          |         Primary        |              Derived              |       Operational       |
| ------------------ | :--------------------: | :-------------------------------: | :---------------------: |
| Collectors         |         Create         |                 No                |         Limited         |
| Normalizers        | Update normalized form |                 No                |         Limited         |
| Analyzers          |          Read          |     Create Metrics & Evidence     |         Limited         |
| Detectors          |          Read          |           Create Signals          |         Limited         |
| Knowledge Builders |          Read          |          Create Knowledge         |         Limited         |
| Decision Engine    |          Read          | Create Scores & Decision Packages |         Limited         |
| Platform Core      |          Read          |                Read               | Create Operational Data |

Ownership should remain clear and consistent across the Platform.

---

# 29. Part 2 Summary

The persistence model distinguishes between:

* Primary Entities
* Derived Entities
* Operational Entities

This separation improves architectural clarity, preserves deterministic lineage, and allows the persistence layer to evolve independently of business logic.

Every important business conclusion should remain traceable back to its originating data through a well-defined chain of persisted entities.

# 30. Versioning Strategy

## Purpose

The Platform preserves historical evaluations.

Instead of replacing deterministic information, new versions are created when business-relevant changes occur.

This enables:

* Reproducibility
* Historical comparison
* Auditability
* Explainability

---

# 31. Versioning Philosophy

The Platform treats deterministic evaluations as historical facts.

Facts should be preserved.

When information changes,

a new version should normally be created rather than modifying an existing evaluation.

Historical evaluations remain valuable.

---

# 32. What Should Be Versioned

The following entities SHOULD support versioning.

Primary Entities

* Fund metadata (when provider information changes)
* Holdings
* Benchmark composition

Derived Entities

* Metrics
* Evidence
* Signals
* Knowledge
* Scores
* Decision Packages

Operational entities generally do not require long-term versioning unless needed for auditing.

---

# 33. Version Triggers

A new version SHOULD be created when:

* Source data changes.
* Processing algorithms change.
* Plugin version changes.
* Scoring Policy changes.
* Ranking Policy changes.
* Decision Engine version changes.

Minor implementation refactoring that produces identical outputs SHOULD NOT create a new version.

---

# 34. Version Identity

Every versioned entity SHOULD include:

* Stable Entity Identifier
* Version Number
* Created Timestamp
* Source Version
* Processing Version

Versions should remain independently retrievable.

---

# 35. Historical Reconstruction

The Platform SHOULD support reconstructing historical evaluations.

Example:

Question:

> "Why did this fund receive a Performance Score of 87 on 15 January 2026?"

The Platform should retrieve:

* Historical Decision Package
* Historical Evidence
* Historical Metrics
* Historical Policy Versions

Historical reconstruction should not depend on current algorithms.

---

# 36. Entity Snapshots

A version represents a snapshot of deterministic understanding at a point in time.

Example:

```text id="wd9zbh"
Fund A

Version 1

↓

Version 2

↓

Version 3

↓

Version 4
```

Each version should remain independently understandable.

---

# 37. Lineage Preservation

Versioning must preserve lineage.

Example:

```text id="hqk8mk"
Decision Package v4

↓

Evidence v9

↓

Metrics v12

↓

NAV History
```

Every version should maintain references to the exact deterministic inputs used during evaluation.

---

# 38. Policy Version References

Every Decision Package SHOULD reference the policy versions used during evaluation.

Examples:

* Decision Engine Version
* Scoring Policy Version
* Ranking Policy Version
* Confidence Policy Version

Methodology changes must remain traceable.

---

# 39. Soft Updates vs New Versions

Not every change requires a new version.

Examples of acceptable in-place updates:

* Documentation fields
* Display names
* Internal metadata
* Cached operational values

Examples requiring a new version:

* Business calculations
* Scores
* Evidence
* Signals
* Knowledge
* Rankings

Business meaning should never change silently.

---

# 40. Version Retention

Historical versions SHOULD be retained whenever practical.

The Platform values explainability over aggressive data deletion.

Retention policies may differ by entity type.

Examples:

| Entity            | Suggested Retention |
| ----------------- | ------------------- |
| NAV History       | Indefinite          |
| Decision Packages | Indefinite          |
| Evidence          | Indefinite          |
| Operational Logs  | Configurable        |
| Cache Entries     | Configurable        |

---

# 41. Temporal Queries

The persistence layer SHOULD support time-aware queries.

Examples:

* Latest Decision Package.
* Decision Package as of a specific date.
* Evidence generated during a date range.
* Fund ranking on a historical date.

Time-aware retrieval is a first-class Platform capability.

---

# 42. Version Comparison

The Platform SHOULD support comparing versions.

Examples:

Decision Package v4

vs

Decision Package v5

The comparison SHOULD identify:

* Score changes.
* Confidence changes.
* New Evidence.
* Removed Evidence.
* Policy changes.

Version comparison improves transparency.

---

# 43. Historical Audit

The Platform SHOULD support deterministic auditing.

Audit capabilities include:

* What changed?
* When did it change?
* Why did it change?
* Which Plugin generated the change?
* Which policy version was used?

Auditing should rely on persisted deterministic information rather than execution logs alone.

---

# 44. Versioning Principles

Versioning follows these principles.

* Preserve historical facts.
* Avoid destructive updates.
* Maintain lineage.
* Support reconstruction.
* Support comparison.
* Record methodology versions.

Versioning is essential for deterministic explainability.

---

# 45. Part 3 Summary

The Platform preserves historical understanding through versioned deterministic entities.

Historical evaluations remain reproducible because:

* Facts are preserved.
* Methodologies are versioned.
* Lineage is maintained.
* Time-aware retrieval is supported.

Versioning enables users and developers to understand not only the Platform's current conclusions, but also how and why those conclusions evolved over time.

# 46. Retrieval Architecture

## Purpose

The persistence layer exists not only to store deterministic information, but also to retrieve it efficiently and predictably.

Retrieval should express business intent rather than storage implementation.

Business components should never construct database-specific queries directly.

---

# 47. Retrieval Philosophy

The Platform retrieves business entities.

It does not retrieve database rows.

Preferred:

* Retrieve latest Decision Package.
* Retrieve Evidence for Fund.
* Retrieve Holdings as of a date.

Avoid:

* Execute arbitrary SQL from business logic.
* Depend on table layouts.
* Depend on storage-specific features.

Repositories translate business intent into storage operations.

---

# 48. Repository Contracts

Each Repository exposes business-oriented operations.

Examples:

Fund Repository

* Find Fund by Identifier
* Retrieve Funds by Category
* Retrieve Active Funds

Decision Package Repository

* Retrieve Latest Decision Package
* Retrieve Historical Decision Package
* Retrieve Decision Package Revisions

Evidence Repository

* Retrieve Evidence by Fund
* Retrieve Evidence by Category
* Retrieve Evidence by Date Range

Repository contracts should remain stable even if storage technology changes.

---

# 49. Read Models

Some queries require information assembled from multiple entities.

Rather than repeatedly reconstructing these views, the Platform MAY maintain Read Models.

Examples include:

* Fund Summary
* Portfolio Summary
* Category Summary
* Top Ranked Funds
* Latest Market Snapshot

Read Models are derived projections.

They do not replace the underlying deterministic entities.

---

# 50. Read Model Characteristics

Read Models SHOULD:

* Be derived from persisted deterministic entities.
* Be reproducible.
* Be refreshable.
* Be optimized for retrieval.
* Never become the authoritative source of truth.

The source of truth remains the persisted entities.

---

# 51. Query Categories

The Platform recognizes four primary query types.

| Category            | Example                                    |
| ------------------- | ------------------------------------------ |
| Entity Queries      | Retrieve one Fund or Decision Package      |
| Historical Queries  | Retrieve information as of a specific date |
| Comparative Queries | Compare multiple funds                     |
| Analytical Queries  | Aggregate and filter large datasets        |

Different query types may require different optimizations.

---

# 52. Historical Retrieval

Historical retrieval is a first-class capability.

Examples:

* Decision Package as of 1 January 2026.
* Holdings before a manager change.
* Evidence generated during a market correction.

Historical retrieval should rely on persisted revisions rather than recalculation whenever possible.

---

# 53. Comparative Retrieval

Comparative queries retrieve multiple related entities.

Examples:

* Compare three Flexi Cap funds.
* Compare current and previous Decision Packages.
* Compare category averages.

Comparisons should preserve the identity and provenance of every retrieved entity.

---

# 54. Analytical Retrieval

Analytical retrieval summarizes large collections of deterministic information.

Examples:

* Top 20 funds by Overall Score.
* Funds with improving Risk Scores.
* Funds with declining Confidence.
* Average Performance Score by category.

Analytical queries should operate on persisted data rather than triggering new deterministic analysis.

---

# 55. Query Optimization Principles

The persistence layer SHOULD optimize retrieval without changing business semantics.

Examples include:

* Appropriate indexing.
* Read Models.
* Cached deterministic projections.
* Efficient repository implementations.

Optimization should remain invisible to business logic.

---

# 56. Caching

Caching MAY be used for deterministic information.

Suitable candidates include:

* Fund metadata.
* Latest Decision Packages.
* Category summaries.
* Benchmark information.

Caches are implementation details.

Business components should not depend on cache behavior.

---

# 57. Query Traceability

Every important retrieval SHOULD remain traceable.

The Platform should be able to identify:

* Repository used.
* Entity revision retrieved.
* Query timestamp.
* Source of the retrieved information.

Traceability supports debugging and reproducibility.

---

# 58. Repository Responsibilities

Repositories are responsible for:

* Persistence.
* Retrieval.
* Version-aware queries.
* Read Model generation (where applicable).

Repositories are NOT responsible for:

* Financial calculations.
* Evidence generation.
* Decision making.
* LLM interaction.

Repository responsibilities remain focused on persistence concerns.

---

# 59. Retrieval Principles

The Platform follows these retrieval principles.

* Express business intent.
* Preserve determinism.
* Support historical queries.
* Support analytical queries.
* Hide storage implementation.
* Optimize transparently.
* Preserve traceability.

These principles apply regardless of storage technology.

---

# 60. Part 4 Summary

Retrieval is a business capability rather than a database operation.

Repositories expose business-oriented contracts.

Read Models provide optimized projections for common access patterns.

The persistence layer remains responsible for efficient retrieval while preserving deterministic behavior and maintaining independence from any specific database implementation.

# 61. Storage Technology Strategy

## Purpose

This section defines the storage technologies used by the Platform.

The Platform separates persistence architecture from storage implementation.

Storage technologies may evolve over time without affecting business logic.

---

# 62. Storage Philosophy

The Platform follows a **Local-First** storage strategy.

Development priorities are:

1. Simplicity
2. Determinism
3. Reliability
4. Explainability
5. Easy local development

Distributed storage is intentionally deferred until operational requirements justify additional complexity.

---

# 63. Initial Storage Technology

The official storage technology for Version 1 is:

**SQLite**

Reasons:

* Fully open source.
* Zero configuration.
* No database server.
* Single portable file.
* Excellent reliability.
* Excellent Node.js ecosystem.
* Simple backup strategy.
* Excellent local development experience.

SQLite satisfies all current Platform requirements.

---

# 64. Why SQLite

SQLite aligns with the Platform philosophy.

Advantages include:

* Entire Platform runs locally.
* Simple installation.
* No network latency.
* Easy inspection using database tools.
* Fast enough for the expected workload.
* Widely supported.
* Proven stability.

The Platform is computationally intensive rather than transaction intensive.

SQLite is therefore an appropriate initial choice.

---

# 65. Database File

The Platform SHOULD use a single primary database.

Example:

```text id="y8m4hk"
data/

└── investment.db
```

Additional databases should be introduced only when justified by operational requirements.

---

# 66. Repository Independence

Repositories MUST remain independent of SQLite.

Business components communicate only with Repository contracts.

Future migration should affect only the Persistence Engine.

Example future migration:

```text id="0a6h9t"
SQLite

↓

PostgreSQL
```

Business logic remains unchanged.

---

# 67. Migration Strategy

Storage technology may evolve in stages.

Stage 1

SQLite

↓

Stage 2

PostgreSQL (optional)

↓

Stage 3

Specialized analytical storage (only if justified)

Migration should be driven by measured requirements rather than anticipated scale.

---

# 68. Backup Strategy

The Platform SHOULD support straightforward backups.

SQLite enables:

* File copy backups.
* Version-controlled schema.
* Simple restoration.
* Offline portability.

Backups should preserve deterministic history.

---

# 69. Schema Management

Schema evolution SHOULD be managed through versioned migrations.

Migration principles:

* Deterministic.
* Reproducible.
* Backward compatible where practical.
* Independently testable.

Schema changes should never silently alter persisted business meaning.

---

# 70. Indexing Principles

Indexes exist to improve retrieval performance.

Indexes SHOULD be created based on observed query patterns.

Examples include:

* Fund Identifier
* Category
* Evaluation Date
* Decision Package Revision
* Plugin Identifier

Indexes should remain implementation details.

Repositories should not depend on specific indexes.

---

# 71. Local Development

A new developer SHOULD be able to start the Platform with minimal setup.

Typical workflow:

* Clone repository.
* Install dependencies.
* Create or migrate database.
* Run Platform.

No external database installation should be required.

---

# 72. Production Readiness

The initial implementation optimizes for local development.

Future production deployment may introduce:

* PostgreSQL
* Managed backups
* High availability
* Replication

These operational concerns should not influence Version 1 architecture.

---

# 73. Storage Principles

The storage layer follows these principles.

* Local-first.
* Technology-independent architecture.
* Repository abstraction.
* Versioned schema.
* Simple backups.
* Incremental evolution.

The storage implementation serves the Platform architecture rather than defining it.

---

# 74. Part 5 Summary

SQLite is the official storage technology for Version 1 of the Investment Intelligence Platform.

The Platform remains architecturally independent of any specific database through the Repository and Persistence Engine abstractions.

Future migration to other storage technologies should require changes only within the persistence layer, preserving the deterministic business architecture established throughout the Platform.

# 75. Data Quality and Validation

## Purpose

The Platform depends on high-quality deterministic information.

Before business data becomes part of the Evidence Store, it should pass a series of validation steps.

Validation protects the integrity of deterministic analysis.

---

# 76. Data Quality Philosophy

The Platform follows a simple principle:

> **Persist only validated business information.**

Validation should occur before persistence.

Invalid information should never silently become part of deterministic history.

---

# 77. Validation Pipeline

Every collected dataset SHOULD pass through the following stages.

```text id="vmx5kt"
Raw Data
      │
      ▼
Normalization
      │
      ▼
Validation
      │
      ▼
Persistence
```

Only validated information enters the Evidence Store.

---

# 78. Validation Categories

The Platform performs multiple kinds of validation.

| Category               | Purpose                    |
| ---------------------- | -------------------------- |
| Structural Validation  | Required fields and schema |
| Domain Validation      | Business correctness       |
| Referential Validation | Relationship integrity     |
| Historical Validation  | Time consistency           |
| Processing Validation  | Plugin-specific rules      |

Each validation category protects a different aspect of data quality.

---

# 79. Structural Validation

Structural Validation verifies the basic shape of incoming information.

Examples include:

* Required fields present.
* Correct data types.
* Valid date formats.
* Numeric values within supported ranges.

Structural validation occurs before business validation.

---

# 80. Domain Validation

Domain Validation verifies business correctness.

Examples:

* NAV must be positive.
* Fund category must exist.
* Holdings percentages should be reasonable.
* Benchmark identifier must be recognized.

Business rules belong here rather than inside persistence logic.

---

# 81. Referential Validation

Relationships should remain valid.

Examples:

* Every NAV references an existing Fund.
* Every Decision Package references an existing Fund.
* Every Evidence record references valid Metrics.
* Every Signal references valid Evidence.

Broken references should be rejected.

---

# 82. Historical Validation

Historical data should remain temporally consistent.

Examples:

* NAV dates should not be in the future.
* Holdings effective dates should be valid.
* Decision Package timestamps should follow processing order.

Historical consistency improves reproducibility.

---

# 83. Processing Validation

Each Plugin MAY define additional validation rules.

Examples:

Performance Plugin

* Minimum historical NAV coverage.

Risk Plugin

* Minimum observation period.

Portfolio Plugin

* Holdings sum approximately equals 100%.

Plugin validation complements common Platform validation.

---

# 84. Validation Results

Validation SHOULD produce structured outcomes.

Possible results include:

* Passed
* Passed with Warnings
* Failed

Warnings should not necessarily prevent persistence.

Failures should.

---

# 85. Data Quality Metadata

Persisted entities SHOULD include quality metadata where appropriate.

Examples include:

* Validation Timestamp
* Validation Status
* Data Source
* Collection Timestamp
* Processing Plugin
* Quality Warnings

Quality metadata supports future auditing.

---

# 86. Handling Invalid Data

Invalid information SHOULD NOT silently enter deterministic processing.

Possible actions include:

* Reject persistence.
* Quarantine the dataset.
* Record validation errors.
* Notify operational monitoring.

Invalid data should remain isolated from deterministic reasoning.

---

# 87. Data Freshness

The Platform SHOULD track freshness independently of correctness.

Examples:

* NAV updated today.
* Holdings updated last month.
* Macro data updated yesterday.

Freshness influences confidence.

It does not necessarily affect correctness.

---

# 88. Data Completeness

The Platform SHOULD evaluate completeness.

Examples:

* Historical NAV coverage.
* Available holdings history.
* Manager history.
* Benchmark availability.

Completeness contributes to Evidence Quality and Confidence calculations.

---

# 89. Quality Monitoring

The Platform SHOULD monitor long-term data quality.

Examples:

* Validation failure rates.
* Missing provider updates.
* Stale datasets.
* Schema changes from providers.

Quality monitoring helps detect issues before they affect deterministic evaluations.

---

# 90. Validation Principles

Validation follows these principles.

* Validate early.
* Validate consistently.
* Preserve deterministic history.
* Reject invalid business information.
* Preserve validation metadata.
* Separate freshness from correctness.

Validation is a foundational Platform capability.

---

# 91. Part 6 Summary

The Platform protects deterministic reasoning through structured validation.

Only validated business information becomes part of the Evidence Store.

Data quality, freshness, and completeness are treated as independent concepts that collectively influence confidence and explainability while preserving the integrity of persisted deterministic information.
