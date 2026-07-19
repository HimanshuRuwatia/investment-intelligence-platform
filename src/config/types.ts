/**
 * Platform configuration model.
 * Configuration must not encode business rules.
 */

export type AppEnv = "development" | "test" | "production";

export type LogLevel = "debug" | "info" | "warn" | "error";

export type PlatformConfig = {
  env: AppEnv;
  logging: {
    level: LogLevel;
  };
};

export const LOG_LEVELS: readonly LogLevel[] = ["debug", "info", "warn", "error"];

export const APP_ENVS: readonly AppEnv[] = ["development", "test", "production"];
