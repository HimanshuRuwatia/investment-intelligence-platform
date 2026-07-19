/**
 * Lightweight service registry for Platform Core composition.
 * Not a general-purpose DI framework.
 */
export class ServiceContainer {
  private readonly services = new Map<string, unknown>();

  register<T>(token: string, instance: T): void {
    if (this.services.has(token)) {
      throw new Error(`Service already registered: ${token}`);
    }
    this.services.set(token, instance);
  }

  resolve<T>(token: string): T {
    if (!this.services.has(token)) {
      throw new Error(`Service not registered: ${token}`);
    }
    return this.services.get(token) as T;
  }

  has(token: string): boolean {
    return this.services.has(token);
  }
}

export const ServiceTokens = {
  Config: "config",
  Logger: "logger",
  Lifecycle: "lifecycle",
} as const;
