import { readFileSync } from "node:fs";
import { APP_ENVS, LOG_LEVELS, type AppEnv, type LogLevel, type PlatformConfig } from "./types.js";

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseAppEnv(value: unknown, context: string): AppEnv {
  if (typeof value !== "string" || !APP_ENVS.includes(value as AppEnv)) {
    throw new ConfigError(
      `${context} must be one of: ${APP_ENVS.join(", ")}. Received: ${String(value)}`,
    );
  }
  return value as AppEnv;
}

function parseLogLevel(value: unknown, context: string): LogLevel {
  if (typeof value !== "string" || !LOG_LEVELS.includes(value as LogLevel)) {
    throw new ConfigError(
      `${context} must be one of: ${LOG_LEVELS.join(", ")}. Received: ${String(value)}`,
    );
  }
  return value as LogLevel;
}

/**
 * Validate and normalize a raw config object into PlatformConfig.
 */
export function parsePlatformConfig(raw: unknown): PlatformConfig {
  if (!isRecord(raw)) {
    throw new ConfigError("Configuration root must be an object.");
  }

  if (!isRecord(raw["logging"])) {
    throw new ConfigError('Configuration must include a "logging" object.');
  }

  const logging = raw["logging"];

  return {
    env: parseAppEnv(raw["env"], "env"),
    logging: {
      level: parseLogLevel(logging["level"], "logging.level"),
    },
  };
}

/**
 * Apply environment overrides on top of a loaded config.
 * Supported: NODE_ENV → env, LOG_LEVEL → logging.level
 */
export function applyEnvOverrides(
  config: PlatformConfig,
  env: NodeJS.ProcessEnv = process.env,
): PlatformConfig {
  const next: PlatformConfig = {
    env: config.env,
    logging: { level: config.logging.level },
  };

  if (env["NODE_ENV"] !== undefined && env["NODE_ENV"] !== "") {
    next.env = parseAppEnv(env["NODE_ENV"], "NODE_ENV");
  }

  if (env["LOG_LEVEL"] !== undefined && env["LOG_LEVEL"] !== "") {
    next.logging.level = parseLogLevel(env["LOG_LEVEL"], "LOG_LEVEL");
  }

  return next;
}

/**
 * Load platform configuration from a JSON file, then apply env overrides.
 */
export function loadConfig(
  configPath: string,
  env: NodeJS.ProcessEnv = process.env,
): PlatformConfig {
  let rawText: string;
  try {
    rawText = readFileSync(configPath, "utf8");
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new ConfigError(`Failed to read configuration file "${configPath}": ${detail}`);
  }

  let rawJson: unknown;
  try {
    rawJson = JSON.parse(rawText) as unknown;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new ConfigError(`Invalid JSON in configuration file "${configPath}": ${detail}`);
  }

  return applyEnvOverrides(parsePlatformConfig(rawJson), env);
}
