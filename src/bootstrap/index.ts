import { runCli } from "../cli/cli.js";

/**
 * Application entry point.
 * M1.1: starts the CLI only. Platform Core initialization arrives in M1.2.
 */
function main(): void {
  const result = runCli(process.argv);

  if (result.stdout.length > 0) {
    process.stdout.write(result.stdout);
  }

  if (result.stderr.length > 0) {
    process.stderr.write(result.stderr);
  }

  process.exitCode = result.exitCode;
}

main();
