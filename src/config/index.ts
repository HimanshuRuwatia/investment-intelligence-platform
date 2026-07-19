import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadConfig } from "./load-config.js";
import type { PlatformConfig } from "./types.js";

export type { AppEnv, LogLevel, PlatformConfig } from "./types.js";
export { APP_ENVS, LOG_LEVELS } from "./types.js";
export { applyEnvOverrides, ConfigError, loadConfig, parsePlatformConfig } from "./load-config.js";

/**
 * Resolve the default config file relative to the compiled package layout:
 * dist/config → ../../config/default.json
 * (source lives at src/config; compiled output mirrors that.)
 */
export function resolveDefaultConfigPath(moduleUrl: string = import.meta.url): string {
  const moduleDir = dirname(fileURLToPath(moduleUrl));
  return join(moduleDir, "..", "..", "config", "default.json");
}

/**
 * Load the default platform configuration for local development.
 */
export function loadDefaultConfig(env: NodeJS.ProcessEnv = process.env): PlatformConfig {
  return loadConfig(resolveDefaultConfigPath(), env);
}
