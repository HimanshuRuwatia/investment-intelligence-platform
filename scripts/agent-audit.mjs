#!/usr/bin/env node
import { appendLog, assertFields, parseArguments, toRepoRelative } from "./agent-audit-lib.mjs";

const allowedStatuses = new Set(["pass", "fail", "blocked", "info"]);
const allowedRisks = new Set(["low", "medium", "high"]);

try {
  const args = parseArguments(process.argv.slice(2), ["file"]);
  assertFields(args, ["role", "action", "status", "summary"]);

  if (!allowedStatuses.has(args.status)) {
    throw new Error(`Invalid --status '${args.status}'. Use pass, fail, blocked, or info.`);
  }
  if (args.risk && !allowedRisks.has(args.risk)) {
    throw new Error(`Invalid --risk '${args.risk}'. Use low, medium, or high.`);
  }

  const files = (args.file ?? []).map(toRepoRelative);
  const { logFile, event } = appendLog({
    role: args.role,
    action: args.action,
    status: args.status,
    summary: args.summary,
    files,
    risk: args.risk ?? "low",
    next: args.next ?? null,
  });

  console.log(JSON.stringify({ logFile, event }, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
