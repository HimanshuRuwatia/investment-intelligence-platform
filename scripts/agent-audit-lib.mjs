import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const logDirectory = path.join(repoRoot, ".agent-logs");

export function currentBranch() {
  return execFileSync("git", ["branch", "--show-current"], {
    cwd: repoRoot,
    encoding: "utf8",
  }).trim();
}

export function safeBranch(branch) {
  if (!/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(branch) || branch.includes("..")) {
    throw new Error(`Unsafe branch name: ${branch}`);
  }
  return branch.replaceAll("/", "__");
}

export function toRepoRelative(input) {
  const normalized = path.normalize(String(input)).replaceAll(path.sep, "/");
  if (path.isAbsolute(normalized)) {
    const relative = path.relative(repoRoot, normalized).replaceAll(path.sep, "/");
    if (relative.startsWith("../") || path.isAbsolute(relative)) {
      throw new Error(`File is outside repository: ${input}`);
    }
    return relative;
  }
  if (normalized === ".." || normalized.startsWith("../")) {
    throw new Error(`File is outside repository: ${input}`);
  }
  return normalized;
}

export function parseArguments(argv, repeatedFlags = []) {
  const result = {};
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!flag?.startsWith("--") || value === undefined || value.startsWith("--")) {
      throw new Error(`Expected --flag value, received: ${flag ?? "end of arguments"}`);
    }
    const key = flag.slice(2);
    if (repeatedFlags.includes(key)) {
      result[key] = [...(result[key] ?? []), value];
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function assertFields(args, required) {
  for (const field of required) {
    if (!args[field] || (Array.isArray(args[field]) && args[field].length === 0)) {
      throw new Error(`Missing required --${field}`);
    }
  }
}

export function appendLog(entry) {
  mkdirSync(logDirectory, { recursive: true });
  const branch = entry.branch || currentBranch();
  const logFile = path.join(logDirectory, `${safeBranch(branch)}.jsonl`);
  const event = { version: 1, timestamp: new Date().toISOString(), ...entry, branch };
  writeFileSync(logFile, `${JSON.stringify(event)}\n`, { flag: "a" });
  return { logFile, event };
}
