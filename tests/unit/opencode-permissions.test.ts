import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const config = JSON.parse(readFileSync("opencode.jsonc", "utf8"));

function matches(pattern, value) {
  const regex = new RegExp(
    `^${pattern
      .replace(/[.+^${}()|[\]\\]/g, "\\$&")
      .replace(/\*/g, ".*")
      .replace(/\?/g, ".")}$`,
    "i",
  );
  return regex.test(value);
}

function resolve(action, resource) {
  return config.permissions
    .filter((rule) => matches(rule.action, action) && matches(rule.resource, resource))
    .at(-1)?.effect;
}

describe("opencode.jsonc permission resolution", () => {
  it("denies pushes to main across bypass forms", () => {
    expect(resolve("shell", "git push origin main")).toBe("deny");
    expect(resolve("shell", "git push origin HEAD:main")).toBe("deny");
    expect(resolve("shell", "git push origin HEAD:refs/heads/main")).toBe("deny");
    expect(resolve("shell", "git push origin main --force")).toBe("deny");
    expect(resolve("shell", "git push -f origin main")).toBe("deny");
    expect(resolve("shell", "git push --force-with-lease origin main")).toBe("deny");
    expect(resolve("shell", "git push origin :main")).toBe("deny");
  });

  it("asks for feature-branch pushes", () => {
    expect(resolve("shell", "git push -u origin feature/audit-gate")).toBe("ask");
  });

  it("denies destructive or secret-exposing actions", () => {
    expect(resolve("shell", "sudo rm -rf /")).toBe("deny");
    expect(resolve("shell", "rm -rf node_modules")).toBe("deny");
    expect(resolve("shell", "gh secret set TOKEN")).toBe("deny");
    expect(resolve("shell", "gh repo delete owner/repo")).toBe("deny");
  });

  it("asks for commits and PR creation", () => {
    expect(resolve("shell", "git commit -m test")).toBe("ask");
    expect(resolve("shell", "gh pr create --fill")).toBe("ask");
    expect(resolve("shell", "gh pr merge 1 --squash")).toBe("ask");
  });

  it("allows safe read and test commands", () => {
    expect(resolve("shell", "git status --short")).toBe("allow");
    expect(resolve("shell", "pnpm test")).toBe("allow");
    expect(resolve("shell", "node scripts/agent-audit-gate.mjs")).toBe("allow");
  });

  it("denies outside-project file access and env edits", () => {
    expect(resolve("external_directory", "/Users/himanshu/.ssh")).toBe("deny");
    expect(resolve("edit", ".env")).toBe("deny");
    expect(resolve("edit", ".env.local")).toBe("deny");
    expect(resolve("edit", ".env.example")).toBe("allow");
    expect(resolve("edit", "config/.env")).toBe("deny");
    expect(resolve("edit", "src/index.ts")).toBe("allow");
  });

  it("asks before editing governance files", () => {
    expect(resolve("edit", "AGENTS.md")).toBe("ask");
    expect(resolve("edit", "opencode.jsonc")).toBe("ask");
    expect(resolve("edit", "scripts/agent-audit-gate.mjs")).toBe("ask");
  });
});
