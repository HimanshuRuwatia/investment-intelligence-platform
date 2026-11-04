#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { repoRoot, safeBranch, toRepoRelative } from "./agent-audit-lib.mjs";

export const highRiskPathPatterns = [
  /(^|\/)[^/]*(auth|secret)[^/]*(\.|$|\/)/i,
  /(^|\/)\.env(\.|$)/i,
  /(^|\/)opencode\.jsonc?$/i,
  /(^|\/)\.opencode\//i,
  /(^|\/)AGENTS\.md$/i,
  /(^|\/)AGENTIC_DEVELOPMENT\.md$/i,
  /(^|\/)WORKFLOW\.md$/i,
  /(^|\/)\.gitignore$/i,
  /(^|\/)package(-lock)?\.json$/i,
  /(^|\/)pnpm-lock\.yaml$/i,
  /(^|\/)\.github\//i,
  /(^|\/)agent-audit[^/]*\.mjs$/i,
];

export function isHighRiskPath(filePath) {
  return highRiskPathPatterns.some((pattern) => pattern.test(filePath));
}

function changedFiles() {
  const tracked = execFileSync("git", ["diff", "--name-only", "HEAD"], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard"], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  return [...new Set([...tracked.split(/\r?\n/), ...untracked.split(/\r?\n/)].filter(Boolean))];
}

function readEvents(logFile) {
  return readFileSync(logFile, "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function latestEvent(events, role) {
  return [...events].reverse().find((event) => event.role === role);
}

function latestPass(events, role) {
  return [...events].reverse().find((event) => event.role === role && event.status === "pass");
}

function verdict(reasons) {
  return { verdict: reasons.length === 0 ? "pass" : "needs_changes", reasons };
}

const requiredRoles = [
  "planner",
  "implementer",
  "test-runner",
  "code-reviewer",
  "security-reviewer",
];

export function evaluateAuditGate({ branch, events, trackedFiles } = {}) {
  const resolvedBranch =
    branch ??
    execFileSync("git", ["branch", "--show-current"], { cwd: repoRoot, encoding: "utf8" }).trim();
  if (!resolvedBranch) throw new Error("Could not determine current branch.");

  const logFile = path.join(repoRoot, ".agent-logs", `${safeBranch(resolvedBranch)}.jsonl`);
  const reasons = [];

  if (!events && !existsSync(logFile)) {
    return verdict([`Audit log not found: ${path.relative(repoRoot, logFile)}`]);
  }

  const auditEvents = events ?? readEvents(logFile);

  for (const role of requiredRoles) {
    const latest = latestEvent(auditEvents, role);
    if (!latest) {
      reasons.push(`${role} must have a passing latest audit event.`);
    } else if (latest.status !== "pass") {
      reasons.push(`${role} reported ${latest.status}: ${latest.summary}`);
    }

    for (const file of latest?.files ?? []) {
      try {
        toRepoRelative(file);
      } catch {
        reasons.push(`${role} referenced an outside-repository file: ${file}`);
      }
    }
  }

  const planner = latestPass(auditEvents, "planner");
  const implementer = latestPass(auditEvents, "implementer");
  const testRunner = latestPass(auditEvents, "test-runner");
  const codeReviewer = latestPass(auditEvents, "code-reviewer");
  const securityReviewer = latestPass(auditEvents, "security-reviewer");

  if (planner && implementer && new Date(planner.timestamp) > new Date(implementer.timestamp)) {
    reasons.push("Planner event is newer than implementer event.");
  }
  if (
    implementer &&
    testRunner &&
    new Date(implementer.timestamp) > new Date(testRunner.timestamp)
  ) {
    reasons.push("Test Runner event precedes implementer event.");
  }
  if (
    testRunner &&
    codeReviewer &&
    new Date(testRunner.timestamp) > new Date(codeReviewer.timestamp)
  ) {
    reasons.push("Code Reviewer event precedes test-runner event.");
  }
  if (
    codeReviewer &&
    securityReviewer &&
    new Date(codeReviewer.timestamp) > new Date(securityReviewer.timestamp)
  ) {
    reasons.push("Security Reviewer event precedes code-reviewer event.");
  }

  const changed = trackedFiles ?? changedFiles();
  const implementerFiles = new Set(
    auditEvents
      .filter((event) => event.role === "implementer")
      .flatMap((event) => event.files ?? []),
  );
  const unaudited = changed.filter((file) => !implementerFiles.has(file));
  if (unaudited.length > 0) {
    reasons.push(`Changed files missing from implementer audit event: ${unaudited.join(", ")}`);
  }

  const highRiskChanged = changed.filter(isHighRiskPath);
  const highRiskEvent = auditEvents.some((event) => event.risk === "high");
  if ((highRiskChanged.length > 0 || highRiskEvent) && !securityReviewer) {
    reasons.push(
      `High-risk changes require a passing security-reviewer event: ${
        highRiskChanged.join(", ") || "high-risk event flag"
      }`,
    );
  }

  return verdict(reasons);
}

function main() {
  if (process.argv.length > 2) {
    console.error("The audit gate takes no arguments. Use the current branch and fixed roles.");
    process.exit(1);
  }
  const result = evaluateAuditGate();
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.verdict === "pass" ? 0 : 1);
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)
) {
  main();
}
