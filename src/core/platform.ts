import { loadConfig, resolveDefaultConfigPath, type PlatformConfig } from "../config/index.js";
import { createLogger, type Logger } from "../shared/logger.js";
import { ServiceContainer, ServiceTokens } from "./container.js";
import { PlatformLifecycle } from "./lifecycle.js";

export type Platform = {
  readonly config: PlatformConfig;
  readonly logger: Logger;
  readonly container: ServiceContainer;
  readonly lifecycle: PlatformLifecycle;
  start(): void;
  stop(): void;
};

export type CreatePlatformOptions = {
  configPath?: string;
  env?: NodeJS.ProcessEnv;
  logger?: Logger;
};

/**
 * Compose Platform Core foundations (config, logger, lifecycle, container).
 * Plugin Manager arrives in M1.2 Step B.
 */
export function createPlatform(options: CreatePlatformOptions = {}): Platform {
  const configPath = options.configPath ?? resolveDefaultConfigPath();
  const env = options.env ?? process.env;
  const config = loadConfig(configPath, env);
  const logger =
    options.logger ??
    createLogger({
      level: config.logging.level,
      component: "platform",
    });
  const lifecycle = new PlatformLifecycle();
  const container = new ServiceContainer();

  container.register(ServiceTokens.Config, config);
  container.register(ServiceTokens.Logger, logger);
  container.register(ServiceTokens.Lifecycle, lifecycle);

  const start = (): void => {
    lifecycle.markStarting();
    logger.info("Platform starting", {
      env: config.env,
      logLevel: config.logging.level,
    });
    lifecycle.markRunning();
    logger.info("Platform running");
  };

  const stop = (): void => {
    lifecycle.markStopping();
    logger.info("Platform stopping");
    lifecycle.markStopped();
    logger.info("Platform stopped");
  };

  return {
    config,
    logger,
    container,
    lifecycle,
    start,
    stop,
  };
}
