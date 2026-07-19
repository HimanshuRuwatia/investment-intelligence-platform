import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  applyEnvOverrides,
  ConfigError,
  loadConfig,
  parsePlatformConfig,
} from "../../src/config/index.js";

describe("parsePlatformConfig", () => {
  it("accepts a valid config object", () => {
    const config = parsePlatformConfig({
      env: "development",
      logging: { level: "info" },
    });

    expect(config).toEqual({
      env: "development",
      logging: { level: "info" },
    });
  });

  it("rejects invalid log levels", () => {
    expect(() =>
      parsePlatformConfig({
        env: "development",
        logging: { level: "verbose" },
      }),
    ).toThrow(ConfigError);
  });

  it("rejects missing logging section", () => {
    expect(() => parsePlatformConfig({ env: "development" })).toThrow(ConfigError);
  });
});

describe("applyEnvOverrides", () => {
  it("overrides env and log level from process env", () => {
    const base = parsePlatformConfig({
      env: "development",
      logging: { level: "info" },
    });

    const next = applyEnvOverrides(base, {
      NODE_ENV: "test",
      LOG_LEVEL: "debug",
    });

    expect(next.env).toBe("test");
    expect(next.logging.level).toBe("debug");
  });
});

describe("loadConfig", () => {
  it("loads JSON from disk and applies env overrides", () => {
    const dir = mkdtempSync(join(tmpdir(), "iip-config-"));
    const path = join(dir, "config.json");
    writeFileSync(
      path,
      JSON.stringify({
        env: "development",
        logging: { level: "warn" },
      }),
    );

    const config = loadConfig(path, { LOG_LEVEL: "error" });

    expect(config.env).toBe("development");
    expect(config.logging.level).toBe("error");
  });

  it("fails when the file is missing", () => {
    expect(() => loadConfig("/tmp/does-not-exist-iip-config.json")).toThrow(ConfigError);
  });
});
