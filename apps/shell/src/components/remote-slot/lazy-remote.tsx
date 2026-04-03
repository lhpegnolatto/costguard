import {
  type ComponentProps,
  type ComponentType,
  lazy,
  useMemo,
  useState,
} from "react";
import { RemoteSlot } from "@/components/remote-slot";
import { type RetryImportOptions, withRetry } from "@/utils/retry-import";

export function createLazyRemote<T extends ComponentType>(
  importFn: () => Promise<{ default: T }>,
  options?: RetryImportOptions,
) {
  return function LazyRemote(props: ComponentProps<T>) {
    const [attempt, setAttempt] = useState(0);

    const Component = useMemo(() => {
      void attempt;
      return lazy(() => withRetry(importFn, options));
    }, [attempt]);
    const Comp = Component as ComponentType<ComponentProps<T>>;

    return (
      <RemoteSlot onRetry={() => setAttempt((n) => n + 1)}>
        <Comp {...props} />
      </RemoteSlot>
    );
  };
}
