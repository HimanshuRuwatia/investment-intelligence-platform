# 30_TECH_STACK.md

> **Project:** Investment Intelligence Platform
>
> **Purpose:** Define the official technology stack for the platform.
>
> **Audience:** Developers and AI coding assistants.
>
> **Status:** Living Document
>
> **Priority:** Critical

---

# 1. Purpose

This document defines the approved technology stack for the Investment Intelligence Platform.

The goals are to:

* Maintain consistency.
* Reduce unnecessary technology choices.
* Improve AI-generated code quality.
* Simplify onboarding.
* Allow the Platform to evolve incrementally.

Unless explicitly documented otherwise, all implementation decisions should follow this document.

---

# 2. Development Philosophy

The Platform follows a **Local-First** development model.

The objective is to make every module fully functional before introducing production infrastructure.

Development priorities are:

1. Correctness
2. Determinism
3. Explainability
4. Testability
5. Performance
6. Scalability

Scalability should never complicate early development unnecessarily.

---

# 3. Local-First Principles

The initial implementation SHOULD:

* Run entirely on a developer machine.
* Require minimal setup.
* Avoid unnecessary cloud services.
* Avoid distributed infrastructure.
* Avoid Kubernetes.
* Avoid microservices.
* Avoid external databases unless required.

The first milestone is a working deterministic platform rather than a production deployment.

---

# 4. Technology Selection Principles

Every technology should satisfy most of the following:

* Widely adopted
* Strong ecosystem
* Excellent documentation
* Long-term community support
* AI-friendly
* Easy local development
* Production ready

Popularity alone is not sufficient.

The technology should also align with the Platform architecture.

---

# 5. Programming Language

## Primary Language

**TypeScript**

Reasons:

* Excellent MCP ecosystem.
* Excellent AI tooling support.
* Strong typing.
* Mature Node.js ecosystem.
* Excellent support in Cursor.
* Easy integration with modern LLM SDKs.
* Good testing ecosystem.

TypeScript is the primary implementation language.

---

# 6. Runtime

**Node.js (Latest LTS)**

Reasons:

* Mature ecosystem.
* Excellent package manager.
* Broad MCP support.
* Fast local iteration.
* Cross-platform.

All server-side code should target the current LTS version unless documented otherwise.

---

# 7. Package Manager

Preferred:

**pnpm**

Reasons:

* Fast.
* Efficient disk usage.
* Reliable lockfiles.
* Excellent monorepo support if needed later.

The Platform should use a single package manager consistently.

---

# 8. Project Structure

Initially the project should be a single repository.

The Platform should remain a modular monolith.

Future migration to multiple repositories should occur only if justified by clear operational needs.

---

# 9. Application Architecture

The initial implementation consists of:

* One executable application.
* One Platform Core.
* Multiple Plugins.
* Local storage.
* CLI interface.

No frontend is required during early development.

The focus is deterministic processing.

---

# 10. User Interface Strategy

The Platform will evolve in stages.

Stage 1

CLI

↓

Stage 2

Local Web Interface

↓

Stage 3

Production Web Application

UI decisions should not influence business architecture.

---

# 11. Configuration

Configuration should use environment variables and structured configuration files.

Configuration must remain external to business logic.

Secrets must never be committed to source control.

---

# 12. Logging

Structured logging should be used throughout the Platform.

Logs should be machine-readable.

Logging libraries should support:

* Log levels
* Structured fields
* Context propagation
* Future file and console outputs

---

# 13. Testing Framework

Testing should be automated from the beginning.

Recommended testing layers:

* Unit Tests
* Integration Tests
* End-to-End Tests

Testing should evolve alongside implementation rather than being deferred.

---

# 14. Dependency Philosophy

Every dependency should justify its existence.

Prefer:

* Mature libraries
* Active maintenance
* Clear documentation

Avoid introducing dependencies for trivial functionality.

---

# 15. AI Development Philosophy

AI coding assistants are treated as implementation partners.

Documentation should provide sufficient context for smaller models to generate high-quality code.

Every implementation should prioritize:

* Readability
* Determinism
* Modularity
* Explicitness

Overly clever implementations should be avoided.

---

# 16. Future Evolution

The technology stack is expected to evolve.

Changes should be deliberate, documented, and backward compatible whenever practical.

Architectural consistency is more valuable than adopting new technologies simply because they are fashionable.

---

# 17. Tech Stack Summary

The initial implementation prioritizes:

* Local-first development.
* TypeScript.
* Node.js.
* Modular monolith architecture.
* CLI-first workflow.
* Strong typing.
* Deterministic processing.
* AI-friendly development.

Production infrastructure will be introduced only after the core Platform is functionally complete and thoroughly tested locally.
