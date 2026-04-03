import { type ErrorInfo, type ReactNode, Suspense } from "react";
import { RemoteErrorBoundary } from "@/components/remote-slot/error-boundary";
import { RemoteSlotLoader } from "@/components/remote-slot/loader";

interface RemoteSlotProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onRetry?: () => void;
}

export function RemoteSlot({ children, onError, onRetry }: RemoteSlotProps) {
  return (
    <RemoteErrorBoundary onError={onError} onRetry={onRetry}>
      <Suspense fallback={<RemoteSlotLoader />}>{children}</Suspense>
    </RemoteErrorBoundary>
  );
}

export { createLazyRemote } from "@/components/remote-slot/lazy-remote";
export {
  DEFAULT_MAX_AUTO_ATTEMPTS,
  type RetryImportOptions,
} from "@/utils/retry-import";
