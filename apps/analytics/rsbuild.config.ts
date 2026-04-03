import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { withZephyr } from "zephyr-rsbuild-plugin";

export default defineConfig({
  server: {
    port: 3001,
  },
  output: {
    assetPrefix: "auto",
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "costguard_analytics",
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/exposed/app.tsx",
      },
      shared: ["react", "react-dom"],
    }),
    withZephyr(),
  ],
});
