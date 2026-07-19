import { describe, expect, it } from "vitest";
import { runCli } from "../../src/cli/cli.js";
import { APP_NAME, APP_VERSION } from "../../src/shared/version.js";

describe("CLI smoke", () => {
  it("prints version for --version", () => {
    const result = runCli(["node", "cli", "--version"]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe(`${APP_NAME} v${APP_VERSION}\n`);
    expect(result.stderr).toBe("");
  });

  it("prints help for --help", () => {
    const result = runCli(["node", "cli", "--help"]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Usage:");
    expect(result.stdout).toContain("--version");
    expect(result.stderr).toBe("");
  });

  it("rejects unknown arguments", () => {
    const result = runCli(["node", "cli", "unknown-command"]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("Unknown argument");
  });

  it("ignores a bare -- separator before options", () => {
    const result = runCli(["node", "cli", "--", "--version"]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe(`${APP_NAME} v${APP_VERSION}\n`);
  });
});
