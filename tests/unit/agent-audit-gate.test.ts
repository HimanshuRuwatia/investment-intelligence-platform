import { describe, expect, it } from "vitest";
import { evaluateAuditGate, isHighRiskPath } from "../../scripts/agent-audit-gate.mjs";

const FILES = ["src/a.ts", "tests/a.test.ts"];

function event(role, status, timestamp, files = FILES, risk = "low") {
  return { role, status, timestamp, files, risk, summary: `${role} ${status}` };
}

function baseEvents(overrides = {}) {
  return [
    event("planner", "pass", "2026-01-01T00:00:00.000Z"),
    event("implementer", "pass", "2026-01-01T00:01:00.000Z"),
    event("test-runner", "pass", "2026-01-01T00:02:00.000Z"),
    event("code-reviewer", "pass", "2026-01-01T00:03:00.000Z"),
    event("security-reviewer", "pass", "2026-01-01T00:04:00.000Z"),
    ...(overrides.extra ?? []),
  ];
}

function run(events, trackedFiles = FILES) {
  return evaluateAuditGate({ branch: "main", events, trackedFiles });
}

describe("evaluateAuditGate", () => {
  it("passes when every role has a latest passing event in order", () => {
    expect(run(baseEvents())).toEqual({ verdict: "pass", reasons: [] });
  });

  it("fails when a required role is missing", () => {
    const events = baseEvents().filter((item) => item.role !== "implementer");
    const result = run(events);
    expect(result.verdict).toBe("needs_changes");
    expect(result.reasons.join("\n")).toContain("implementer");
  });

  it("lets a later failure invalidate an earlier pass", () => {
    const events = [...baseEvents(), event("implementer", "fail", "2026-01-01T00:05:00.000Z")];
    const result = run(events);
    expect(result.verdict).toBe("needs_changes");
    expect(result.reasons.join("\n")).toContain("implementer reported fail");
  });

  it("fails when a changed file is missing from implementer events", () => {
    const result = run(baseEvents(), [...FILES, "src/unlogged.ts"]);
    expect(result.verdict).toBe("needs_changes");
    expect(result.reasons.join("\n")).toContain("src/unlogged.ts");
  });

  it("fails when out-of-order events are reported", () => {
    const events = baseEvents().map((item) =>
      item.role === "test-runner" ? { ...item, timestamp: "2026-01-01T00:00:30.000Z" } : item,
    );
    const result = run(events);
    expect(result.verdict).toBe("needs_changes");
    expect(result.reasons.join("\n")).toContain("Test Runner event precedes");
  });

  it("requires security review for high-risk paths", () => {
    const events = baseEvents().filter((item) => item.role !== "security-reviewer");
    const result = run(events, ["scripts/agent-audit-gate.mjs"]);
    expect(result.verdict).toBe("needs_changes");
    expect(result.reasons.join("\n")).toContain("security-reviewer");
  });

  it("rejects outside-repository file references", () => {
    const events = [
      ...baseEvents(),
      event("planner", "pass", "2026-01-01T00:06:00.000Z", ["../outside.ts"]),
    ];
    const result = run(events);
    expect(result.verdict).toBe("needs_changes");
    expect(result.reasons.join("\n")).toContain("outside-repository");
  });

  it("classifies high-risk paths", () => {
    expect(isHighRiskPath("scripts/agent-audit-gate.mjs")).toBe(true);
    expect(isHighRiskPath("AGENTIC_DEVELOPMENT.md")).toBe(true);
    expect(isHighRiskPath("opencode.jsonc")).toBe(true);
    expect(isHighRiskPath(".env")).toBe(true);
    expect(isHighRiskPath("src/plugins/performance/analyzer.ts")).toBe(false);
  });
});
