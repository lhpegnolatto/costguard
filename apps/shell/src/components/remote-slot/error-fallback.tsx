import { Button } from "@/components/ui/button";

interface RemotesErrorFallbackProps {
  error: Error;
  onRetry?: () => void;
}

export function RemoteSlotErrorFallback({
  error,
  onRetry,
}: RemotesErrorFallbackProps) {
  const isDev = import.meta.env.DEV;

  function handleRetry() {
    if (onRetry) {
      onRetry();
      return;
    }

    window.location.reload();
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 px-4 text-center">
      <p className="text-sm font-medium text-foreground">
        This module could not be loaded
      </p>
      <p className="text-xs text-zinc-500 max-w-md">
        The remote app failed to load or crashed. You can try again, or refresh
        the page if the problem continues.
      </p>
      {isDev ? (
        <pre className="max-w-full overflow-x-auto rounded-md border border-border bg-muted/50 px-3 py-2 text-left text-[11px] leading-relaxed text-muted-foreground font-mono whitespace-pre-wrap break-all">
          {error.message}
        </pre>
      ) : null}
      <Button type="button" variant="outline" size="sm" onClick={handleRetry}>
        Try again
      </Button>
    </div>
  );
}
