# 24_MCP_SPEC.md

> **Project:** Investment Intelligence Platform
>
> **Purpose:** Define how deterministic Platform capabilities are exposed to AI systems through the Model Context Protocol (MCP).
>
> **Audience:** Developers and AI coding assistants.
>
> **Status:** Living Document
>
> **Priority:** Critical

---

# 1. Purpose

The MCP layer exposes deterministic Platform capabilities to Large Language Models.

It acts as the standardized communication layer between AI systems and Platform Plugins.

The MCP layer does not contain business logic.

It exposes business capabilities implemented elsewhere.

---

# 2. MCP Philosophy

The Platform separates responsibilities into three distinct layers.

```text id="ah4q9r"
Business Logic
        │
        ▼
Plugin
        │
        ▼
MCP Service
        │
        ▼
LLM
```

Plugins perform deterministic computation.

MCP Services expose deterministic capabilities.

LLMs perform reasoning and communication.

---

# 3. Responsibilities

The MCP layer MUST:

* Expose deterministic capabilities.
* Validate requests.
* Invoke the correct Plugin.
* Return structured responses.
* Preserve traceability.
* Report structured errors.

The MCP layer MUST NOT:

* Calculate financial Metrics.
* Modify business logic.
* Generate Scores.
* Produce investment advice.

---

# 4. MCP Service

Every Plugin MAY expose one MCP Service.

The MCP Service owns:

* Tool registration
* Tool discovery
* Request validation
* Response formatting
* Error translation
* Version reporting

Business logic remains inside the Plugin.

---

# 5. MCP Tool

A Tool represents one deterministic business capability.

Examples include:

Performance Plugin

* Get Performance Metrics
* Get Rolling Returns
* Compare Performance
* Explain Performance Score

Risk Plugin

* Calculate Risk Metrics
* Retrieve Risk Evidence
* Explain Risk Score

Each Tool performs one well-defined responsibility.

---

# 6. MCP Design Principles

Every Tool SHOULD be:

* Deterministic
* Focused
* Stateless
* Independently testable
* Independently documentable

Tool behavior should not depend on previous requests.

---

# 7. MCP Processing Pipeline

Every MCP request follows the same processing sequence.

```text id="k8u1pw"
LLM
     │
     ▼
Tool Discovery
     │
     ▼
Input Validation
     │
     ▼
Tool Invocation
     │
     ▼
Plugin
     │
     ▼
Deterministic Result
     │
     ▼
Response Envelope
     │
     ▼
LLM
```

Each stage has one clearly defined responsibility.

---

# 8. Tool Discovery

The Platform SHOULD support dynamic discovery of available Tools.

Discovery SHOULD expose:

* Tool Name
* Description
* Supported Asset Classes
* Supported Entities
* Input Parameters
* Output Structure
* Plugin Version
* Tool Version

Tool discovery should require no knowledge of Plugin internals.

---

# 9. Tool Registration

Every Tool MUST register with its owning MCP Service.

Registration SHOULD include:

* Unique Tool Identifier
* Human-readable Name
* Description
* Version
* Supported Inputs
* Supported Outputs

Registration occurs during Plugin initialization.

---

# 10. Tool Naming

Tool names SHOULD be:

* Short
* Specific
* Stable
* Verb-oriented

Examples:

Good

* Get Performance Metrics
* Compare Funds
* Retrieve Decision Package
* Explain Performance Score

Poor

* Analyze
* Execute
* Process Data
* Utility Tool

Tool names should communicate one clear capability.

---

# 11. Tool Categories

The Platform recognizes several Tool categories.

Retrieval Tools

Return deterministic data.

Examples:

* Get NAV History
* Get Holdings

Analysis Tools

Return deterministic analysis.

Examples:

* Compare Performance
* Calculate Risk

Explanation Support Tools

Return structured reasoning inputs.

Examples:

* Retrieve Evidence
* Retrieve Decision Package

Operational Tools

Support diagnostics.

Examples:

* Plugin Health
* Plugin Status
* Execution History

---

# 12. MCP Summary

The MCP layer provides a standardized protocol for exposing deterministic Platform capabilities.

The MCP layer is intentionally lightweight.

Its responsibility is communication rather than computation.

Business intelligence remains owned by Plugins.

The LLM consumes deterministic capabilities through the MCP layer without requiring knowledge of internal Platform implementation.

# 13. Standard Request Specification

## Purpose

Every MCP Tool receives requests using a standardized structure.

The request structure should remain consistent across the entire Platform.

Consistency simplifies:

* Tool discovery
* Validation
* Testing
* Documentation
* AI integration

Business-specific parameters are carried inside the request rather than changing the overall request structure.

---

# 14. Request Principles

Every request SHOULD be:

* Explicit
* Deterministic
* Self-contained
* Independently validatable

Requests SHOULD contain only the information required to perform the requested operation.

---

# 15. Common Request Metadata

Every request SHOULD include common metadata.

Typical metadata includes:

* Request Identifier
* Timestamp
* Calling Client
* Tool Version (optional)
* Correlation Identifier

Metadata supports:

* Logging
* Debugging
* Traceability

Business logic should ignore metadata unless explicitly required.

---

# 16. Tool Parameters

Business parameters belong to the Tool.

Examples include:

Performance Tool

* Fund Identifier
* Evaluation Period
* Benchmark

Risk Tool

* Fund Identifier
* Time Window

Portfolio Tool

* Fund Identifier
* Holdings Date

Each Tool defines its own parameter contract.

---

# 17. Input Validation

Every Tool MUST validate its inputs before invoking Plugin logic.

Validation SHOULD verify:

* Required parameters
* Supported asset class
* Parameter format
* Date ranges
* Identifier validity

Validation failures should terminate processing before business logic begins.

---

# 18. Standard Response Envelope

Every MCP Tool MUST return the same high-level response structure.

The response SHOULD contain:

```text id="vntm92"
Response

├── Status
├── Metadata
├── Data
├── Confidence
├── Warnings
├── Errors
└── Diagnostics
```

Only the **Data** section differs between Tools.

Everything else remains consistent.

---

# 19. Status

Status communicates execution outcome.

Recommended values include:

* Success
* Partial Success
* Validation Failure
* Execution Failure
* Internal Error

Status should describe execution rather than business conclusions.

---

# 20. Metadata

Metadata describes the response.

Examples include:

* Plugin
* Tool
* Plugin Version
* Tool Version
* Request Identifier
* Processing Time
* Generated Timestamp

Metadata improves traceability.

---

# 21. Data

The Data section contains deterministic business information.

Examples include:

Performance Tool

* Metrics
* Evidence
* Scores

Decision Engine Tool

* Decision Package

Portfolio Tool

* Holdings
* Allocation
* Diversification

The Data section SHOULD contain no operational metadata.

---

# 22. Confidence

If applicable, Tools SHOULD expose confidence.

Confidence belongs to deterministic outputs.

Examples:

Decision Package

Overall Confidence

Evidence Tool

Evidence Confidence

Risk Tool

Risk Confidence

Tools that do not calculate confidence MAY omit this section.

---

# 23. Warnings

Warnings communicate important observations that do not prevent successful execution.

Examples include:

* Limited historical data.
* Missing benchmark.
* Recently launched fund.
* Partial holdings available.

Warnings improve transparency.

---

# 24. Errors

Errors SHOULD be structured.

Every error SHOULD contain:

* Error Code
* Human-readable Message
* Severity
* Recoverability

Consumers should be able to respond programmatically to errors.

---

# 25. Diagnostics

Diagnostics provide operational information.

Examples include:

* Execution duration
* Cache usage
* Records processed
* Data provider
* Retry count

Diagnostics support debugging.

They should not affect business outputs.

---

# 26. Response Immutability

Once returned,

an MCP response SHOULD remain immutable.

If deterministic outputs change,

the Tool should generate a new response rather than modifying a previous one.

This preserves reproducibility.

---

# 27. Version Compatibility

The response envelope SHOULD remain backward compatible.

Future additions SHOULD:

* Add optional sections.
* Preserve existing sections.
* Avoid changing meanings.

Breaking changes require a Tool version increment.

---

# 28. Request/Response Lifecycle

The complete lifecycle is:

```text id="y9mb4r"
Request

↓

Validation

↓

Tool

↓

Plugin

↓

Deterministic Result

↓

Response Envelope

↓

LLM
```

Every request should produce exactly one response envelope.

---

# 29. Response Principles

Every response SHOULD be:

* Deterministic
* Traceable
* Versioned
* Explainable
* Self-describing

Consumers should understand a response without reading Tool implementation.

---

# 30. Why a Standard Envelope Exists

Without a standard envelope:

Each Tool returns different structures.

Every consumer requires Tool-specific logic.

Every AI model must learn every Tool separately.

With a standard envelope:

Every Tool behaves consistently.

Consumers become simpler.

AI coding assistants require less context.

Future Plugins integrate automatically.

Consistency is one of the Platform's most valuable engineering properties.

---

# 31. Part 2 Summary

The MCP layer standardizes communication rather than business logic.

Every Tool accepts validated requests.

Every Tool returns the same response envelope.

Only the deterministic business data changes.

This consistency enables reliable integration between deterministic Plugins and AI reasoning systems while keeping Tool implementations focused on their individual business capabilities.

# 32. Tool Orchestration

## Purpose

The Platform may expose many MCP Tools across multiple Plugins.

Complex user questions often require information from multiple Tools.

The Tool Orchestrator coordinates Tool execution and assembles deterministic outputs before they reach the LLM.

The LLM should reason over assembled information rather than manually coordinating every Tool.

---

# 33. Orchestration Philosophy

The Platform separates responsibilities as follows.

```text id="f7gxq2"
User Question
        │
        ▼
LLM
        │
        ▼
Execution Plan
        │
        ▼
Tool Orchestrator
        │
        ▼
MCP Tools
        │
        ▼
Merged Deterministic Results
        │
        ▼
LLM
```

The Tool Orchestrator owns execution.

The LLM owns reasoning.

---

# 34. Execution Plan

Before invoking Tools, an Execution Plan SHOULD be created.

The plan describes:

* Which Plugins are required.
* Which MCP Tools should be invoked.
* Execution order.
* Parallel execution opportunities.
* Expected outputs.

The Execution Plan contains no business results.

It describes how information will be gathered.

---

# 35. Tool Selection

Tool selection SHOULD be deterministic whenever possible.

Examples:

Question

"What is the rolling return?"

↓

Performance Plugin

↓

Get Rolling Returns Tool

Question

"What are the main portfolio risks?"

↓

Portfolio Plugin

↓

Risk Plugin

↓

Relevant Tools

The Platform should avoid unnecessary Tool execution.

---

# 36. Parallel Execution

Independent Tools SHOULD execute in parallel.

Example:

Performance Tool

Risk Tool

Macro Tool

can execute simultaneously because they do not depend on one another.

Parallel execution improves responsiveness while preserving deterministic behavior.

---

# 37. Sequential Execution

Some Tool invocations depend on earlier results.

Example:

Retrieve Decision Package

↓

Extract Evidence References

↓

Retrieve Supporting Evidence

↓

Retrieve Knowledge

Sequential execution should occur only when dependencies require it.

---

# 38. Result Aggregation

Results from multiple Tools SHOULD be merged into a unified deterministic structure.

Aggregation SHOULD preserve:

* Source Plugin
* Source Tool
* Confidence
* Evidence References
* Metadata

Aggregation MUST NOT modify business conclusions.

It combines results without changing them.

---

# 39. Duplicate Elimination

Multiple Tools may return overlapping information.

The Tool Orchestrator SHOULD eliminate duplicates while preserving traceability.

Duplicate removal should be deterministic.

Original sources should remain identifiable.

---

# 40. Context Minimization

Only information relevant to the current question should be forwarded to the LLM.

Example:

If the user asks:

> "Why is this fund's Performance Score high?"

The Platform should retrieve:

* Performance Evidence
* Performance Signals
* Performance Knowledge
* Decision Package

It should not retrieve unrelated Macro or Portfolio information unless required.

Reducing unnecessary context improves efficiency and reduces the likelihood of irrelevant reasoning.

---

# 41. Failure Handling

If one Tool fails, the Tool Orchestrator SHOULD determine whether execution can continue.

Examples:

Recoverable

* Macro Tool unavailable.

Proceed using available information and record the limitation.

Non-Recoverable

* Decision Package unavailable.

Stop execution and report the failure.

Failure policies should be deterministic and documented.

---

# 42. Caching

The Tool Orchestrator MAY cache deterministic Tool responses.

Suitable candidates include:

* Historical NAV data.
* Decision Packages.
* Static Fund metadata.
* Benchmark information.

Caching should never alter deterministic outputs.

Cache invalidation policies should be explicit.

---

# 43. Tool Dependencies

Tools SHOULD remain as independent as possible.

When dependencies exist, they should be declared explicitly.

Example:

Decision Package Tool

Depends on:

* Performance Plugin
* Risk Plugin
* Decision Engine

Dependency graphs should be acyclic whenever practical.

---

# 44. Orchestration Metadata

The Tool Orchestrator SHOULD produce execution metadata.

Examples include:

* Execution Identifier
* Tools Invoked
* Execution Order
* Parallel Tasks
* Execution Duration
* Failed Tools
* Cached Responses Used

Metadata supports diagnostics and future optimization.

---

# 45. LLM Responsibilities

The LLM SHOULD:

* Interpret deterministic outputs.
* Explain trade-offs.
* Summarize findings.
* Answer follow-up questions.

The LLM MUST NOT:

* Decide which deterministic calculations to perform.
* Replace Tool outputs.
* Ignore deterministic conflicts.
* Invent missing evidence.

---

# 46. Orchestration Principles

The following principles apply.

* Execute the minimum number of Tools required.
* Prefer parallel execution where possible.
* Preserve deterministic outputs.
* Keep Tool responsibilities independent.
* Minimize LLM context.
* Preserve traceability.
* Keep orchestration deterministic.

These principles improve scalability as the Platform grows.

---

# 47. Part 3 Summary

The Tool Orchestrator enables the Platform to answer complex questions using multiple deterministic information channels.

The Platform decides how information is collected.

The LLM decides how information is communicated.

This separation allows the Platform to scale to many Plugins and MCP Tools while preserving deterministic behavior and keeping AI reasoning grounded in structured evidence.

# 48. MCP Quality Standards

## Purpose

This section defines the quality standards that every MCP Service and MCP Tool must satisfy.

The objective is to ensure that every Tool is:

* Predictable
* Deterministic
* Discoverable
* Testable
* Explainable
* Easy for both humans and AI systems to use

Quality standards apply equally to manually written and AI-generated implementations.

---

# 49. Tool Quality Attributes

Every Tool SHOULD satisfy the following attributes.

| Attribute     | Description                                                               |
| ------------- | ------------------------------------------------------------------------- |
| Deterministic | Same request produces the same response when underlying data is unchanged |
| Correct       | Returns accurate deterministic information                                |
| Focused       | Performs one business capability well                                     |
| Stateless     | Does not rely on previous requests                                        |
| Discoverable  | Can be automatically identified by the Platform                           |
| Documented    | Has complete documentation                                                |
| Testable      | Can be independently tested                                               |
| Versioned     | Supports controlled evolution                                             |

No single attribute should be sacrificed without explicit justification.

---

# 50. Documentation Requirements

Every Tool MUST include documentation.

Minimum documentation includes:

* Purpose
* Supported inputs
* Supported outputs
* Validation rules
* Possible warnings
* Possible errors
* Example usage
* Version history

Documentation should describe behavior rather than implementation.

---

# 51. Testing Requirements

Every Tool SHOULD include automated tests.

Minimum recommended tests include:

Unit Tests

* Input validation
* Output validation
* Error handling
* Edge cases

Integration Tests

* Plugin integration
* MCP Service integration
* Response envelope validation

Regression Tests

* Existing behavior remains unchanged
* Response compatibility
* Version compatibility

Testing should focus on observable behavior.

---

# 52. Performance Requirements

Every Tool SHOULD execute efficiently.

Examples:

* Avoid unnecessary Plugin invocations.
* Prefer cached deterministic data where appropriate.
* Execute independent operations in parallel.
* Minimize duplicate work.

Performance optimizations MUST preserve deterministic behavior.

---

# 53. Response Size

Responses SHOULD include only information required for the current request.

Large deterministic datasets SHOULD be summarized where appropriate.

Examples:

Good

Decision Package

↓

Evidence Summary

↓

Evidence References

Poor

Entire NAV history

Entire holdings history

Entire execution log

The Platform should retrieve detailed information only when explicitly requested.

---

# 54. Backward Compatibility

Public Tool behavior SHOULD remain backward compatible.

Compatible changes include:

* New optional fields
* Additional metadata
* Additional warnings
* Improved diagnostics

Breaking changes include:

* Removing required fields
* Renaming existing fields
* Changing response semantics
* Removing supported capabilities

Breaking changes require a Tool version increment.

---

# 55. Tool Evolution

Tools are expected to evolve.

Examples include:

* Improved validation
* Better diagnostics
* Additional optional parameters
* Faster implementations
* Improved documentation

Evolution should preserve existing integrations whenever practical.

---

# 56. Security Principles

Every Tool SHOULD follow these principles.

* Validate all inputs.
* Expose only documented capabilities.
* Never expose secrets.
* Never expose internal implementation details.
* Respect authorization policies implemented by the Platform.
* Log security-relevant failures.

Security should be enforced consistently across all Tools.

---

# 57. Observability

Every Tool SHOULD expose operational metrics.

Examples include:

* Invocation count
* Average execution time
* Error count
* Validation failures
* Cache hit rate
* Success rate

Observability supports future monitoring and optimization.

---

# 58. Tool Discoverability

Every Tool SHOULD be discoverable without reading source code.

The Platform should expose:

* Tool Name
* Description
* Plugin
* Version
* Supported Asset Classes
* Supported Entities
* Input Schema
* Output Schema

Discoverability improves automation and AI integration.

---

# 59. MCP Service Responsibilities

An MCP Service SHOULD provide:

* Tool registration
* Tool discovery
* Request routing
* Input validation
* Response formatting
* Version reporting
* Diagnostics

Business logic remains entirely inside Plugins.

---

# 60. MCP Compliance Checklist

Before exposing a Tool through MCP, verify:

| Requirement                            | Complete |
| -------------------------------------- | -------- |
| Tool documented                        | □        |
| Inputs validated                       | □        |
| Standard response envelope implemented | □        |
| Errors structured                      | □        |
| Warnings implemented                   | □        |
| Automated tests passing                | □        |
| Version assigned                       | □        |
| Discoverable through MCP Service       | □        |
| Plugin integration verified            | □        |
| Architecture guidelines followed       | □        |

Every Tool should satisfy this checklist before being made available to AI systems.

---

# 61. MCP Service Checklist

Before releasing an MCP Service, verify:

| Requirement                     | Complete |
| ------------------------------- | -------- |
| All Tools registered            | □        |
| Discovery implemented           | □        |
| Routing implemented             | □        |
| Response envelopes standardized | □        |
| Diagnostics implemented         | □        |
| Version reporting implemented   | □        |
| Documentation completed         | □        |
| Integration tests passing       | □        |

An MCP Service should be considered a first-class Platform component.

---

# 62. MCP Specification Summary

The MCP Specification defines how deterministic Platform capabilities are exposed to AI systems.

The specification standardizes:

* MCP Services
* Tool registration
* Tool discovery
* Request validation
* Response envelopes
* Tool orchestration
* Quality standards

By standardizing these concerns, the Platform ensures that every deterministic capability is consistently accessible to AI systems without exposing internal implementation details.

This enables reliable, explainable, and scalable integration between deterministic financial intelligence and conversational AI.
