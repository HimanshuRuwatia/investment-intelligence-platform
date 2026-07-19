import type { LogLevel } from "../config/types.js";

export type LogFields = Record<string, string | number | boolean | null>;

export type LogEntry = {
  timestamp: string;
  level: LogLevel;
  component: string;
  message: string;
  fields?: LogFields;
};

export type Logger = {
  debug(message: string, fields?: LogFields): void;
  info(message: string, fields?: LogFields): void;
  warn(message: string, fields?: LogFields): void;
  error(message: string, fields?: LogFields): void;
  child(component: string): Logger;
};

const LEVEL_RANK: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export type CreateLoggerOptions = {
  level: LogLevel;
  component?: string;
  now?: () => Date;
  write?: (line: string, level: LogLevel) => void;
};

function defaultWrite(line: string, level: LogLevel): void {
  if (level === "error" || level === "warn") {
    process.stderr.write(`${line}\n`);
  } else {
    process.stdout.write(`${line}\n`);
  }
}

/**
 * Create a structured JSON-line logger.
 * Deterministic when `now` and `write` are injected (tests).
 */
export function createLogger(options: CreateLoggerOptions): Logger {
  const component = options.component ?? "platform";
  const now = options.now ?? (() => new Date());
  const write = options.write ?? defaultWrite;

  const emit = (level: LogLevel, message: string, fields?: LogFields): void => {
    if (LEVEL_RANK[level] < LEVEL_RANK[options.level]) {
      return;
    }

    const entry: LogEntry = {
      timestamp: now().toISOString(),
      level,
      component,
      message,
    };

    if (fields !== undefined && Object.keys(fields).length > 0) {
      entry.fields = fields;
    }

    write(JSON.stringify(entry), level);
  };

  return {
    debug: (message, fields) => emit("debug", message, fields),
    info: (message, fields) => emit("info", message, fields),
    warn: (message, fields) => emit("warn", message, fields),
    error: (message, fields) => emit("error", message, fields),
    child: (childComponent) =>
      createLogger({
        level: options.level,
        component: childComponent,
        now,
        write,
      }),
  };
}
