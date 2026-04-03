declare module "analytics/app" {
  import type { ComponentType } from "react";
  const App: ComponentType;
  export default App;
}

declare module "insights/app" {
  import type { ComponentType } from "react";
  const App: ComponentType;
  export default App;
}

declare module "insights/crashed" {
  import type { ComponentType } from "react";
  const Crashed: ComponentType;
  export default Crashed;
}
