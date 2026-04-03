import { type ErrorInfo, type ReactNode, Suspense } from "react";
import { RemoteErrorBoundary } from "@/components/remote-slot/error-boundary";
import { RemoteSlotLoader } from "@/components/remote-slot/loader";

interface RemoteSlotProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export function RemoteSlot({ children, onError }: RemoteSlotProps) {
  return (
    <RemoteErrorBoundary onError={onError}>
      <Suspense fallback={<RemoteSlotLoader />}>{children}</Suspense>
    </RemoteErrorBoundary>
  );
}
