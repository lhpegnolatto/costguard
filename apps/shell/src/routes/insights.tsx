import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/insights")({
  component: Index,
});

function Index() {
  return (
    <div>
      <h1>Insights</h1>
    </div>
  );
}
