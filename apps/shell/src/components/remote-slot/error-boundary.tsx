import { Component, type ErrorInfo, type ReactNode } from "react";
import { RemoteSlotErrorFallback } from "@/components/remote-slot/error-fallback";

interface RemoteErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  preventRetry?: boolean;
  onRetry?: () => void;
  fallback?: (props: { error: Error; reset: () => void }) => ReactNode;
}

interface RemoteErrorBoundaryState {
  error: Error | null;
}

export class RemoteErrorBoundary extends Component<
  RemoteErrorBoundaryProps,
  RemoteErrorBoundaryState
> {
  state: RemoteErrorBoundaryState = { error: null };

  static getDerivedStateFromError(
    error: Error,
  ): Partial<RemoteErrorBoundaryState> {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.setState({ error: null });
  };

  handleRetry = () => {
    this.props.onRetry?.();
    this.reset();
  };

  render() {
    const { error } = this.state;
    if (error) {
      const { fallback, preventRetry } = this.props;
      return (
        fallback?.({ error, reset: this.handleRetry }) ?? (
          <RemoteSlotErrorFallback
            error={error}
            preventRetry={preventRetry}
            onRetry={this.handleRetry}
          />
        )
      );
    }
    return this.props.children;
  }
}
