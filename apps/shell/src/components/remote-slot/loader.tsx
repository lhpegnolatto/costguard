import { Spinner } from "@/components/ui/spinner";

export function RemoteSlotLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <Spinner className="size-8" />
      <p className="text-xs text-zinc-500">loading content...</p>
    </div>
  );
}
