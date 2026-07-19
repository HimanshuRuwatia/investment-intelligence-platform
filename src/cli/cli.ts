import { APP_NAME, APP_VERSION } from "../shared/version.js";

export type CliResult = {
  exitCode: number;
  stdout: string;
  stderr: string;
};

/**
 * Minimal CLI for local development.
 * Supports --help / -h and --version / -v only.
 */
export function runCli(argv: readonly string[]): CliResult {
  // pnpm/npm may insert a bare "--" before forwarded arguments.
  const args = argv.slice(2).filter((arg) => arg !== "--");

  if (args.includes("--help") || args.includes("-h")) {
    return {
      exitCode: 0,
      stdout: [
        `${APP_NAME} CLI`,
        "",
        "Usage:",
        "  pnpm start [--help | --version]",
        "",
        "Options:",
        "  -h, --help     Show this help message",
        "  -v, --version  Show version",
        "",
      ].join("\n"),
      stderr: "",
    };
  }

  if (args.includes("--version") || args.includes("-v")) {
    return {
      exitCode: 0,
      stdout: `${APP_NAME} v${APP_VERSION}\n`,
      stderr: "",
    };
  }

  if (args.length === 0) {
    return {
      exitCode: 0,
      stdout: `${APP_NAME} v${APP_VERSION}\n`,
      stderr: "",
    };
  }

  return {
    exitCode: 1,
    stdout: "",
    stderr: [`Unknown argument: ${args[0]}`, "Run with --help for usage.", ""].join("\n"),
  };
}
