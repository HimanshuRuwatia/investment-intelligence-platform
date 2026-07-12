# Project Charter

> **Project:** Investment Intelligence Platform
>
> **Version:** 1.0.0
>
> **Status:** Living Document
>
> **Owner:** Himanshu Ruwatia
>
> **Last Updated:** July 2026

---

# 1. Purpose of this Document

This document defines the long-term vision, philosophy, engineering principles, and development direction of the Investment Intelligence Platform.

It is intentionally independent of implementation details.

Unlike technical documentation, this document should remain relatively stable throughout the life of the project.

Whenever a technical decision needs to be made, it should align with the principles described here.

This document exists to answer questions such as:

- Why are we building this platform?
- What problems are we trying to solve?
- What principles guide engineering decisions?
- What role should AI play?
- What role should deterministic systems play?
- What should never be compromised?

The answers contained here are considered the project's "constitution."

Implementation details belong in separate documents such as:

- ARCHITECTURE.md
- DEVELOPMENT.md
- DATA_MODEL.md
- MCP_SPEC.md
- DATABASE.md

---

# 2. Executive Summary

The Investment Intelligence Platform is an explainable financial reasoning platform designed to continuously observe the investment ecosystem, transform raw financial information into structured evidence, detect meaningful investment signals, accumulate long-term financial knowledge, and provide transparent, evidence-backed insights through artificial intelligence.

The platform does **not** exist to replace investor judgment.

Instead, it exists to augment it.

Rather than producing opaque buy or sell recommendations, the platform explains:

- why a fund is performing well,
- what investment strategy it appears to follow,
- which market conditions favor that strategy,
- whether performance appears driven by manager skill or macroeconomic factors,
- and what evidence supports every conclusion.

Every important financial conclusion should be traceable back to deterministic analysis.

Artificial Intelligence is responsible for transforming evidence into understanding—not for inventing financial truth.

---

# 3. Vision

## Vision Statement

Build the world's most transparent, explainable, modular, and extensible financial intelligence platform.

The platform should continuously learn from financial markets, explain investment behavior, identify successful investment strategies, and help investors make informed decisions based on evidence rather than intuition.

Mutual funds are only the beginning.

The architecture should naturally extend to additional financial assets including:

- Individual Stocks
- Exchange Traded Funds (ETFs)
- Bonds
- REITs
- Commodities
- International Markets
- Alternative Investments

without requiring architectural redesign.

---

# 4. Mission

The mission of this project is to make sophisticated investment analysis understandable, explainable, and accessible.

Instead of overwhelming users with financial ratios and raw data, the platform should convert complex financial information into structured reasoning that answers the questions investors actually care about.

Examples include:

- Why is this fund outperforming?
- Is the manager genuinely skilled?
- Is this performance sustainable?
- What changed recently?
- What signals indicate future strength or weakness?
- Which market environments historically benefited this strategy?
- Is this manager changing investment style?
- Is this fund still behaving like it did five years ago?

The platform should prioritize explanation over prediction.

Whenever uncertainty exists, it should clearly communicate that uncertainty instead of pretending certainty.

---

# 5. Product Philosophy

This project is **not** a mutual fund screener.

It is **not** a recommendation engine.

It is **not** an automated investment advisor.

It is a Financial Intelligence Platform.

The distinction is intentional.

Most investment platforms answer questions like:

- Which fund generated the highest return?
- Which fund has the highest rating?
- Which fund should I buy?

This platform aims to answer a different class of questions:

- Why is this fund outperforming?
- What investment strategy explains this behavior?
- Which financial evidence supports that conclusion?
- How has the strategy evolved over time?
- Which market conditions historically benefited this approach?
- Is the manager adapting intelligently to changing markets?
- What can be learned from successful funds?

Understanding is more valuable than recommendations.

The platform exists to increase investor understanding, not replace investor responsibility.

---

# 6. Long-Term Vision

The long-term goal is to build a personal financial intelligence assistant capable of continuously observing financial markets and accumulating financial knowledge over time.

Rather than simply responding to user questions, the platform should eventually become capable of proactive analysis.

Examples include:

- Detecting meaningful changes in fund strategy.
- Monitoring macroeconomic developments.
- Identifying shifts in market leadership.
- Observing manager behavior over multiple market cycles.
- Tracking sector rotation.
- Recognizing recurring investment patterns.
- Generating periodic investment intelligence reports.
- Explaining changes before users ask.

Over time, the platform should become increasingly knowledgeable while remaining fully explainable.

Every conclusion should continue to be supported by observable evidence.

Knowledge should accumulate—not hallucinate.

# 7. Design Philosophy

The architecture of the Investment Intelligence Platform is guided by a small number of fundamental design principles. Every engineering decision should be evaluated against these principles before implementation.

## Principle 1 — Evidence Before Conclusions

Every conclusion produced by the platform must be supported by evidence.

Evidence should be:

* Observable
* Measurable
* Traceable
* Reproducible

The platform should never generate unexplained conclusions.

---

## Principle 2 — Deterministic First

Whenever a financial problem can be solved deterministically, it should not be delegated to an LLM.

Examples of deterministic problems include:

* CAGR
* Rolling Returns
* Sharpe Ratio
* Beta
* Sortino Ratio
* Maximum Drawdown
* Percentile Rankings
* Portfolio Overlap
* Sector Allocation
* Market Cap Distribution

Artificial Intelligence should only be introduced where deterministic methods are insufficient or where natural language understanding is required.

---

## Principle 3 — Explainability By Design

Every important insight should be explainable.

Users should always be able to understand:

* Why the platform reached a conclusion.
* Which evidence contributed.
* Which metrics were used.
* Which signals were detected.
* How confident the platform is.

Explainability is a first-class requirement rather than an optional feature.

---

## Principle 4 — Separation of Responsibilities

Every major component should have a single responsibility.

Examples:

Collectors collect.

Analyzers analyze.

Detectors detect.

Knowledge Builders learn.

Reasoning prepares context.

LLMs explain.

No component should perform responsibilities belonging to another layer.

---

## Principle 5 — Incremental Evolution

The platform should evolve by adding new capabilities rather than modifying existing ones.

Examples:

Adding a new financial metric should require adding a new analyzer.

Adding support for Stocks should require a new plugin.

Adding support for ETFs should require another plugin.

The architecture should encourage extension instead of modification.

---

## Principle 6 — Simplicity Over Cleverness

Simple, understandable implementations are preferred over highly optimized but difficult-to-maintain solutions.

Readability is a feature.

Maintainability is a feature.

Predictability is a feature.

---

## Principle 7 — Local First

Development should prioritize local execution.

Every major feature should work locally before cloud deployment is considered.

This allows:

* Faster iteration
* Easier debugging
* Lower development cost
* Better testability
* Reduced operational complexity

Cloud infrastructure should only be introduced when it provides clear value.

---

# 8. Engineering Philosophy

The platform should be engineered as a collection of independent, composable modules.

Rather than building a large monolithic application, the platform should consist of small, focused components with clearly defined responsibilities.

The engineering philosophy emphasizes:

* Composition over inheritance.
* Explicit interfaces over hidden coupling.
* Strong typing over dynamic assumptions.
* Testability over convenience.
* Modularity over monolithic design.
* Reliability over unnecessary optimization.

Engineering decisions should optimize for long-term maintainability rather than short-term implementation speed.

---

## Build Vertical Slices

Development should proceed by completing one fully functional capability at a time.

Instead of partially implementing every feature, complete one complete workflow before starting another.

Example:

Performance Plugin

1. Collect NAV data.
2. Normalize data.
3. Calculate metrics.
4. Generate evidence.
5. Generate scores.
6. Produce reasoning.
7. Query through a local interface.

Only after the complete workflow is functional should development proceed to the next plugin.

This approach minimizes complexity while continuously producing working software.

---

## Avoid Premature Optimization

The platform should avoid introducing complexity before it becomes necessary.

Examples of decisions intentionally postponed:

* Microservices
* Kubernetes
* Distributed messaging
* Multi-region deployment
* Complex caching strategies
* Enterprise authentication
* Highly optimized infrastructure

The simplest solution that satisfies current requirements should be preferred.

---

## Local Development Strategy

The platform is designed to run entirely on a developer's machine during the early stages of development.

This includes:

* Local database
* Local scheduler
* Local file storage
* Local configuration
* Local testing
* Local AI integration

The initial objective is correctness, not scalability.

---

# 9. AI Philosophy

Artificial Intelligence is an augmentation layer rather than the decision maker.

The platform deliberately separates deterministic financial analysis from AI reasoning.

## The Role of AI

Artificial Intelligence should:

* Explain financial concepts.
* Summarize evidence.
* Connect multiple observations.
* Compare investment strategies.
* Answer follow-up questions.
* Produce investment reports.
* Translate technical analysis into understandable language.

---

## AI Should Not

Artificial Intelligence should never:

* Compute deterministic financial metrics.
* Perform mathematical calculations already implemented elsewhere.
* Invent supporting evidence.
* Override deterministic conclusions.
* Produce unsupported investment advice.
* Present uncertain information as fact.

---

## Deterministic Systems Produce Truth

Deterministic systems are responsible for generating:

* Financial metrics
* Scores
* Rankings
* Signals
* Confidence values
* Knowledge candidates

The LLM consumes these outputs.

It does not generate them.

---

## AI as a Financial Analyst

A useful mental model is to think of the LLM as an experienced financial analyst reviewing reports prepared by specialized research teams.

The research teams produce the evidence.

The analyst interprets it.

This separation ensures:

* Consistency
* Explainability
* Reproducibility
* Trustworthiness

---

# 10. Development Philosophy

The project follows a Core-First Development Strategy.

The objective is not to build a polished application.

The objective is to build a robust financial intelligence engine.

Everything else—including APIs, dashboards, and user interfaces—should be built on top of that engine.

---

## Development Order

The preferred order of development is:

1. Core domain models
2. Plugin framework
3. Data collectors
4. Data normalizers
5. Financial analyzers
6. Evidence generation
7. Decision engine
8. Knowledge engine
9. Local reasoning interface
10. API layer
11. Frontend applications

This order should only change if a compelling technical reason exists.

---

## User Interface Philosophy

The platform should remain independent of any user interface.

The financial intelligence engine should function correctly without:

* A web application
* A mobile application
* A desktop application

During early development, interacting through:

* CLI commands
* Local scripts
* Tests
* Small diagnostic tools

is sufficient.

The frontend is considered a consumer of the platform rather than part of the platform itself.

---

## Definition of a Complete Feature

A feature is considered complete only when:

* It works locally.
* It has deterministic outputs.
* It integrates with the existing architecture.
* It includes automated tests where appropriate.
* It produces structured outputs.
* It can be consumed by future modules.

A partially implemented feature should not be considered complete.

---

## Continuous Refactoring

Refactoring is encouraged when it improves:

* Simplicity
* Readability
* Modularity
* Testability

However, refactoring should not change the overall architecture without explicit review.

The architecture is intended to remain stable while implementations evolve.

# 11. Product Goals

The Investment Intelligence Platform should evolve into a comprehensive financial reasoning system rather than a traditional investment application.

The primary objective is to help users understand financial markets through deterministic analysis, accumulated knowledge, and explainable AI.

---

## Functional Goals

The platform should eventually be capable of:

### Market Analysis

- Analyze the complete Indian Mutual Fund universe.
- Compare funds within their respective categories.
- Track historical fund performance.
- Monitor changes in investment strategies.
- Detect significant portfolio changes.
- Observe macroeconomic conditions.
- Correlate market events with fund performance.
- Monitor manager behavior over time.

---

### Financial Reasoning

The platform should be able to answer questions such as:

- Why is this fund outperforming?
- Why has this fund recently underperformed?
- Which market conditions favor this investment strategy?
- Is the manager adding value?
- Is the strategy changing?
- Is the portfolio becoming more concentrated?
- Is this performance sustainable?
- What evidence supports these conclusions?

---

### Knowledge Generation

The platform should continuously accumulate financial knowledge.

Examples include:

- Managers that consistently anticipate sector rotations.
- Funds that perform well during rising interest-rate environments.
- Categories that historically outperform during specific macroeconomic cycles.
- Investment behaviors that repeatedly precede strong performance.

Knowledge should emerge from repeated observations rather than isolated events.

---

### Explainability

Every recommendation or insight should be accompanied by:

- Supporting evidence
- Supporting metrics
- Supporting signals
- Confidence score
- Historical context
- Natural language explanation

Users should never be expected to trust opaque outputs.

---

## Non-Functional Goals

The platform should be:

### Modular

Every business capability should exist independently.

Adding one capability should not require modifying unrelated parts of the system.

---

### Explainable

Every important decision should be understandable.

The user should always be able to ask:

"Why?"

and receive a meaningful answer.

---

### Deterministic

Mathematical problems should always produce deterministic results.

The same inputs should always produce the same outputs.

---

### Extensible

The architecture should naturally support:

- New financial metrics
- New investment products
- New asset classes
- New reasoning engines
- New data providers

without architectural redesign.

---

### Maintainable

The codebase should remain understandable years after its initial implementation.

Readability is preferred over cleverness.

---

### Observable

Every important system activity should be observable.

Examples include:

- Plugin execution
- Analysis duration
- Failed data collection
- Confidence generation
- Evidence creation

---

### Testable

Every deterministic component should be independently testable.

Business logic should never depend on UI components.

---

# 12. Non-Goals

Understanding what the platform will **not** do is equally important.

The following are intentionally out of scope for the foreseeable future.

---

## The platform is NOT

### An Automated Trading System

The platform should never execute trades.

Investment decisions remain the responsibility of the user.

---

### A Buy/Sell Signal Generator

The platform should not produce simplistic recommendations such as:

- Buy
- Sell
- Hold

Instead it should provide evidence that allows users to make informed decisions.

---

### A Portfolio Manager

The platform is not responsible for:

- Portfolio allocation
- Rebalancing
- Tax planning
- Order execution

These may become future plugins but are not core objectives.

---

### A Prediction Engine

The platform should avoid making deterministic predictions about future market behavior.

Financial markets are inherently uncertain.

Instead, the platform should explain:

- historical behavior
- current conditions
- observed patterns
- confidence levels

Users should understand uncertainty rather than ignore it.

---

### A General-Purpose AI Assistant

The LLM exists only to improve financial understanding.

It is not intended to become a generic chatbot.

---

# 13. Guiding Principles

Every implementation should respect the following principles.

---

## Evidence Over Opinion

Financial conclusions should always originate from measurable evidence.

Opinion should never replace evidence.

---

## Understanding Over Recommendation

Helping users understand markets is more valuable than telling them what to buy.

---

## Transparency Over Magic

Users should understand how conclusions were reached.

Black-box reasoning should be avoided whenever practical.

---

## Truth Over Convenience

If the correct answer is:

"I don't know."

or

"There is insufficient evidence."

the platform should communicate that honestly.

---

## Incremental Improvement

The platform should improve continuously through:

- new plugins
- new analyzers
- better reasoning
- richer evidence

rather than periodic rewrites.

---

## Local First

Everything should function locally before production deployment is considered.

---

## Plugin Driven

Business capabilities belong inside plugins.

The platform core should remain minimal.

---

## AI Augments Intelligence

Artificial Intelligence should enhance human understanding.

It should never replace deterministic financial reasoning.

---

# 14. Core Concepts

The following concepts form the common language of the platform.

These definitions should remain consistent throughout the project.

---

## Raw Data

Information collected from external sources.

Examples include:

- NAV history
- Holdings
- Market prices
- RBI announcements
- Inflation reports
- News articles

Raw data has not yet been analyzed.

---

## Metric

A deterministic numerical value derived from raw data.

Examples include:

- CAGR
- Sharpe Ratio
- Maximum Drawdown
- Portfolio Overlap
- Rolling Return

Metrics should always be reproducible.

---

## Evidence

Evidence is structured information that supports a financial conclusion.

Evidence consists of:

- metrics
- supporting data
- metadata
- confidence
- timestamp
- originating plugin

Evidence is the primary currency of the platform.

---

## Signal

A signal represents a meaningful financial relationship or event.

Examples include:

- Manager increased exposure before sector rally.
- Volatility increased significantly.
- Portfolio concentration exceeded historical norms.

Signals are generated by analyzing evidence.

---

## Knowledge

Knowledge is accumulated understanding produced from repeated signals over time.

Unlike signals, knowledge represents stable observations rather than temporary events.

Example:

"This manager consistently rotates into manufacturing before earnings upgrades."

Knowledge evolves continuously.

---

## Insight

An insight is a human-readable conclusion generated by combining:

- evidence
- signals
- knowledge

Insights are ultimately communicated by the LLM.

---

## Confidence

Confidence represents how strongly the platform believes a conclusion is supported.

Confidence should always accompany:

- evidence
- signals
- knowledge
- insights

Confidence is never absolute.

It should reflect uncertainty honestly.

---

## Plugin

A plugin represents one business capability.

Examples include:

- Performance
- Risk
- Strategy
- Holdings
- Macro

Plugins own their complete implementation.

---

## Platform Core

The Platform Core orchestrates plugins.

It is responsible for:

- scheduling
- lifecycle management
- evidence storage
- orchestration
- reasoning coordination

The Platform Core should never contain financial business logic.

# 15. Quality Standards

The quality of the platform should never be sacrificed for implementation speed.

Every feature should satisfy the following standards before it is considered complete.

---

## Correctness

Financial calculations must be correct.

Deterministic analyzers should be validated against known examples whenever possible.

Correctness always takes priority over performance.

---

## Explainability

Every important output should be explainable.

If the platform produces:

- a score,
- a signal,
- a ranking,
- or an insight,

the user should be able to understand:

- why it exists,
- how it was calculated,
- what evidence supports it,
- and how confident the platform is.

---

## Reproducibility

Running the same analysis twice using identical inputs should produce identical outputs.

Deterministic behavior builds trust.

---

## Modularity

Every component should be independently testable.

Components should communicate through clearly defined interfaces.

Adding a new capability should require adding new modules rather than modifying existing ones.

---

## Maintainability

The platform is expected to evolve over many years.

Future developers—including AI coding assistants—should be able to understand the codebase without requiring tribal knowledge.

Readability is considered a feature.

---

## Observability

Every important process should be observable.

Examples include:

- Plugin execution
- Data collection
- Analysis duration
- Failures
- Warnings
- Generated evidence
- Confidence calculations

The platform should make debugging straightforward.

---

## Testability

Business logic should be easy to test independently.

Whenever practical, deterministic analyzers should include automated tests.

Testing should focus on correctness rather than implementation details.

---

# 16. Technology Philosophy

Technology exists to support the architecture.

The architecture should never be driven by technology trends.

The preferred technology stack should satisfy the following characteristics:

- Well supported
- Widely adopted
- Strong ecosystem
- Excellent tooling
- Long-term maintainability

Technology choices may evolve as requirements become clearer.

The architecture should minimize vendor lock-in whenever practical.

---

## Local-First Development

The platform should be fully functional on a single developer machine.

Early development should prioritize:

- Local execution
- Local databases
- Local testing
- Local configuration
- Local debugging

Cloud infrastructure should only be introduced after the core intelligence engine is stable.

---

## Infrastructure Last

Infrastructure should support working software.

Working software should never depend on unfinished infrastructure.

Avoid introducing complexity before it becomes necessary.

Examples include:

- Kubernetes
- Distributed systems
- Event streaming platforms
- Service meshes
- Multi-region deployments

These should only be adopted when solving a demonstrated problem.

---

# 17. AI Coding Assistant Guidelines

AI coding assistants are collaborators rather than autonomous developers.

They should accelerate implementation while respecting the project's architecture.

---

## AI assistants should

- Follow the documented architecture.
- Respect plugin boundaries.
- Produce deterministic implementations whenever possible.
- Prefer composition over inheritance.
- Produce readable code.
- Keep modules focused.
- Avoid unnecessary abstraction.
- Write clear documentation.
- Generate strongly typed code.
- Suggest improvements without changing established architecture.

---

## AI assistants should not

- Redesign the architecture unless explicitly requested.
- Introduce hidden coupling.
- Mix business logic with infrastructure.
- Place financial calculations inside LLM prompts.
- Circumvent deterministic analysis.
- Create unnecessary complexity.
- Over-engineer for future requirements.

---

## Preferred Development Style

Implement complete vertical slices.

Each feature should progress through:

Collection

↓

Normalization

↓

Analysis

↓

Evidence

↓

Reasoning

↓

Testing

↓

Completion

This approach produces usable software throughout development.

---

# 18. Development Roadmap

The project should evolve incrementally.

---

## Phase 1 — Platform Foundation

Objectives:

- Repository setup
- Core project structure
- Plugin framework
- Configuration
- Logging
- Domain models
- Local database
- Testing framework

---

## Phase 2 — Performance Plugin

Objectives:

- NAV collection
- Performance metrics
- Rolling returns
- Evidence generation
- Local querying

This plugin establishes the complete end-to-end workflow.

---

## Phase 3 — Risk Plugin

Objectives:

- Volatility
- Sharpe Ratio
- Sortino Ratio
- Drawdown
- Risk evidence

---

## Phase 4 — Consistency Plugin

Objectives:

- Rolling return consistency
- Positive return frequency
- Historical stability

---

## Phase 5 — Benchmark Plugin

Objectives:

- Benchmark comparison
- Alpha
- Information Ratio
- Relative performance

---

## Phase 6 — Holdings Plugin

Objectives:

- Portfolio allocation
- Diversification
- Sector exposure
- Market-cap analysis

---

## Phase 7 — Strategy Plugin

Objectives:

- Investment style detection
- Growth vs Value
- Momentum
- Defensive positioning
- Strategy evolution

---

## Phase 8 — Macro Plugin

Objectives:

- Inflation
- RBI policy
- GDP
- Currency
- Interest rates
- Economic indicators

---

## Phase 9 — Knowledge Engine

Objectives:

- Historical learning
- Pattern accumulation
- Strategy memory
- Long-term observations

---

## Phase 10 — LLM Reasoning

Objectives:

- Context builder
- Explainability
- Comparative reasoning
- Report generation
- Conversational analysis

---

## Phase 11 — User Interfaces

Possible interfaces include:

- CLI
- REST API
- Web Dashboard
- Desktop Application
- Mobile Application

The intelligence engine should already be fully functional before this phase begins.

---

# 19. Definition of Success

The project is considered successful when:

- Every financial conclusion is backed by evidence.
- Every recommendation is explainable.
- Every plugin can be developed independently.
- The architecture remains stable as new capabilities are added.
- AI improves understanding without replacing deterministic reasoning.
- The platform accumulates financial knowledge over time.
- The codebase remains understandable and maintainable.
- New contributors can understand the system through documentation.
- Users trust the reasoning because they can inspect the evidence behind every conclusion.

Success is measured by transparency, correctness, and maintainability rather than feature count.

---

# 20. Future Vision

The long-term vision extends beyond mutual fund analysis.

The platform should become a general-purpose financial reasoning platform capable of supporting multiple investment domains through the same architectural principles.

Future capabilities may include:

- Stock analysis
- ETF analysis
- Bond analysis
- Portfolio optimization
- Retirement planning
- Tax-aware analysis
- Asset allocation
- Scenario simulation
- Risk profiling
- Global market support

These capabilities should emerge by adding new plugins rather than modifying the platform core.

The architecture should remain stable while the platform continuously expands its knowledge and analytical capabilities.

---

# 21. Document Maintenance

This document is intended to remain stable.

It defines the project's vision rather than implementation.

Minor clarifications may be added over time.

Major architectural changes should instead be reflected in:

- ARCHITECTURE.md
- DATA_MODEL.md
- PLUGIN_SPEC.md
- MCP_SPEC.md
- DEVELOPMENT.md

This document should be updated only when the vision or guiding principles of the project change.

---

# Closing Statement

The Investment Intelligence Platform is an attempt to build software that prioritizes understanding over recommendation, evidence over opinion, and transparency over complexity.

The platform should continuously evolve, learn from financial markets, and provide investors with trustworthy, explainable insights grounded in deterministic analysis.

Every engineering decision should reinforce these principles.

If a future design choice conflicts with this charter, the charter should take precedence.