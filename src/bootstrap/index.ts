import { createPlatform } from "../core/platform.js";
import { runCli } from "../cli/cli.js";

/**
 * Application entry point.
 * M1.2 Step A: load config, start Platform Core foundations, then run CLI.
 */
function main(): void {
  try {
    const platform = createPlatform();

    try {
      platform.start();

      const result = runCli(process.argv);

      if (result.stdout.length > 0) {
        process.stdout.write(result.stdout);
      }

      if (result.stderr.length > 0) {
        process.stderr.write(result.stderr);
      }

      process.exitCode = result.exitCode;
    } finally {
      if (platform.lifecycle.getState() === "running") {
        platform.stop();
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  }
}

main();
