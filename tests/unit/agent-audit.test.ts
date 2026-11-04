import { describe, expect, it } from "vitest";
import { parseArguments, safeBranch, toRepoRelative } from "../../scripts/agent-audit-lib.mjs";
import { isHighRiskPath } from "../../scripts/agent-audit-gate.mjs";

describe("agent audit utilities", () => {
  it("parses repeated file arguments", () => {
    expect(
      parseArguments(
        ["--role", "planner", "--file", "src/a.ts", "--file", "tests/a.test.ts"],
        ["file"],
      ),
    ).toEqual({
      role: "planner",
      file: ["src/a.ts", "tests/a.test.ts"],
    });
  });

  it("rejects malformed argument lists", () => {
    expect(() => parseArguments(["--role"], [])).toThrow("Expected --flag value");
    expect(() => parseArguments(["role", "planner"], [])).toThrow("Expected --flag value");
  });

  it("makes branch paths safe", () => {
    expect(safeBranch("feature/audit-gate")).toBe("feature__audit-gate");
    expect(safeBranch("main")).toBe("main");
    expect(() => safeBranch("../escape")).toThrow("Unsafe branch name");
    expect(() => safeBranch("feature/../escape")).toThrow("Unsafe branch name");
  });

  it("accepts repository-relative paths and rejects traversal", () => {
    expect(toRepoRelative("src/cli.ts")).toBe("src/cli.ts");
    expect(toRepoRelative("src/../src/cli.ts")).toBe("src/cli.ts");
    expect(() => toRepoRelative("../outside.txt")).toThrow("outside repository");
    expect(() => toRepoRelative("..")).toThrow("outside repository");
  });

  it("classifies enforcement and configuration paths as high risk", () => {
    expect(isHighRiskPath("scripts/agent-audit-gate.mjs")).toBe(true);
    expect(isHighRiskPath("AGENTIC_DEVELOPMENT.md")).toBe(true);
    expect(isHighRiskPath("opencode.jsonc")).toBe(true);
    expect(isHighRiskPath(".opencode/agents/orchestrator.md")).toBe(true);
    expect(isHighRiskPath(".env")).toBe(true);
    expect(isHighRiskPath("src/plugins/performance/analyzer.ts")).toBe(false);
    expect(isHighRiskPath("tests/unit/agent-audit.test.ts")).toBe(false);
  });
});
