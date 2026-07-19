import { describe, expect, it } from "vitest";
import { ServiceContainer } from "../../src/core/container.js";
import { PlatformLifecycle } from "../../src/core/lifecycle.js";
import { createPlatform } from "../../src/core/platform.js";
import { createLogger } from "../../src/shared/logger.js";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("ServiceContainer", () => {
  it("registers and resolves services", () => {
    const container = new ServiceContainer();
    container.register("answer", 42);
    expect(container.resolve<number>("answer")).toBe(42);
  });

  it("rejects duplicate registration", () => {
    const container = new ServiceContainer();
    container.register("x", 1);
    expect(() => container.register("x", 2)).toThrow(/already registered/);
  });
});

describe("PlatformLifecycle", () => {
  it("transitions created → starting → running → stopping → stopped", () => {
    const lifecycle = new PlatformLifecycle();
    expect(lifecycle.getState()).toBe("created");

    lifecycle.markStarting();
    lifecycle.markRunning();
    expect(lifecycle.getState()).toBe("running");

    lifecycle.markStopping();
    lifecycle.markStopped();
    expect(lifecycle.getState()).toBe("stopped");
  });

  it("rejects invalid transitions", () => {
    const lifecycle = new PlatformLifecycle();
    expect(() => lifecycle.markRunning()).toThrow(/Invalid lifecycle transition/);
  });
});

describe("createPlatform", () => {
  it("starts and stops using loaded configuration", () => {
    const dir = mkdtempSync(join(tmpdir(), "iip-platform-"));
    const path = join(dir, "config.json");
    writeFileSync(
      path,
      JSON.stringify({
        env: "test",
        logging: { level: "error" },
      }),
    );

    const lines: string[] = [];
    const logger = createLogger({
      level: "info",
      component: "platform",
      now: () => new Date("2026-07-19T10:00:00.000Z"),
      write: (line) => {
        lines.push(line);
      },
    });

    const platform = createPlatform({
      configPath: path,
      env: {},
      logger,
    });

    expect(platform.config.env).toBe("test");
    expect(platform.lifecycle.getState()).toBe("created");

    platform.start();
    expect(platform.lifecycle.getState()).toBe("running");

    platform.stop();
    expect(platform.lifecycle.getState()).toBe("stopped");

    expect(lines.some((line) => line.includes("Platform running"))).toBe(true);
    expect(lines.some((line) => line.includes("Platform stopped"))).toBe(true);
  });
});
