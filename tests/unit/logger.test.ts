import { describe, expect, it } from "vitest";
import { createLogger } from "../../src/shared/logger.js";

describe("createLogger", () => {
  it("emits structured JSON with required fields", () => {
    const lines: string[] = [];
    const logger = createLogger({
      level: "info",
      component: "test",
      now: () => new Date("2026-07-19T10:00:00.000Z"),
      write: (line) => {
        lines.push(line);
      },
    });

    logger.info("hello", { count: 1 });

    expect(lines).toHaveLength(1);
    expect(JSON.parse(lines[0]!)).toEqual({
      timestamp: "2026-07-19T10:00:00.000Z",
      level: "info",
      component: "test",
      message: "hello",
      fields: { count: 1 },
    });
  });

  it("filters messages below the configured level", () => {
    const lines: string[] = [];
    const logger = createLogger({
      level: "warn",
      now: () => new Date("2026-07-19T10:00:00.000Z"),
      write: (line) => {
        lines.push(line);
      },
    });

    logger.debug("skip");
    logger.info("skip");
    logger.warn("keep");

    expect(lines).toHaveLength(1);
    expect(JSON.parse(lines[0]!).level).toBe("warn");
  });

  it("child loggers inherit level and use a new component", () => {
    const lines: string[] = [];
    const logger = createLogger({
      level: "debug",
      component: "parent",
      now: () => new Date("2026-07-19T10:00:00.000Z"),
      write: (line) => {
        lines.push(line);
      },
    });

    logger.child("child").debug("nested");

    expect(JSON.parse(lines[0]!).component).toBe("child");
  });
});
