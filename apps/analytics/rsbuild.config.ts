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
      name: "analytics",
      exposes: {
        "./app": "./src/exposed/app.tsx",
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
    }),
    withZephyr(),
  ],
});
