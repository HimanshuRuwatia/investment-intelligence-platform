export type LifecycleState = "created" | "starting" | "running" | "stopping" | "stopped";

/**
 * Tracks Platform application lifecycle state transitions.
 * Invalid transitions throw to keep behavior deterministic.
 */
export class PlatformLifecycle {
  private state: LifecycleState = "created";

  getState(): LifecycleState {
    return this.state;
  }

  markStarting(): void {
    this.transition("created", "starting");
  }

  markRunning(): void {
    this.transition("starting", "running");
  }

  markStopping(): void {
    this.transition("running", "stopping");
  }

  markStopped(): void {
    this.transition("stopping", "stopped");
  }

  private transition(from: LifecycleState, to: LifecycleState): void {
    if (this.state !== from) {
      throw new Error(
        `Invalid lifecycle transition: expected "${from}" but was "${this.state}" (to "${to}")`,
      );
    }
    this.state = to;
  }
}
