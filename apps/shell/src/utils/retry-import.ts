/** Default number of automatic load attempts before showing manual retry. */
export const DEFAULT_MAX_AUTO_ATTEMPTS = 3;

export interface RetryImportOptions {
  /**
   * How many times to try `import()` automatically (with backoff between failures).
   * After all fail, the error UI offers a manual retry.
   */
  maxAutoAttempts?: number;
  /** @deprecated Use `maxAutoAttempts` instead. Same meaning as `maxAutoAttempts`. */
  retries?: number;
  /** Base delay in ms; exponential backoff is applied between automatic attempts */
  delayMs?: number;
  shouldRetry?: (error: unknown) => boolean;
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function defaultShouldRetry(error: unknown) {
  if (error instanceof TypeError) return true;
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    if (
      msg.includes("failed to fetch") ||
      msg.includes("network") ||
      msg.includes("load") ||
      msg.includes("chunk")
    ) {
      return true;
    }
  }
  return true;
}

function resolveMaxAutoAttempts(options?: RetryImportOptions): number {
  if (options?.maxAutoAttempts !== undefined) return options.maxAutoAttempts;
  if (options?.retries !== undefined) return options.retries;
  return DEFAULT_MAX_AUTO_ATTEMPTS;
}

/**
 * Retries a dynamic import up to `maxAutoAttempts` times, then rejects.
 * Manual retry (new lazy mount) is handled by the UI layer after this fails.
 */
export function withRetry<T extends object>(
  importFn: () => Promise<T>,
  options: RetryImportOptions = {},
): Promise<T> {
  const maxAutoAttempts = resolveMaxAutoAttempts(options);
  const { delayMs = 300, shouldRetry = defaultShouldRetry } = options;

  async function attempt(n: number): Promise<T> {
    try {
      return await importFn();
    } catch (error) {
      const canRetry = n < maxAutoAttempts - 1 && shouldRetry(error);
      if (!canRetry) throw error;
      const backoff = delayMs * 2 ** n;
      await sleep(backoff);
      return attempt(n + 1);
    }
  }

  return attempt(0);
}
