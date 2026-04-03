import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/rspack";
import { withZephyr } from "zephyr-rsbuild-plugin";

export default defineConfig({
  server: {
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "costguard_shell",
      remotes: {
        costguard_analytics:
          "costguard_analytics@http://localhost:3001/remoteEntry.json",
        costguard_insights:
          "costguard_insights@http://localhost:3002/remoteEntry.json",
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
  tools: {
    rspack: {
      plugins: [
        tanstackRouter({
          target: "react",
          autoCodeSplitting: true,
        }),
      ],
    },
  },
  html: {
    template: "./src/index.html",
    title: "CostGuard",
    favicon: "./public/favicon.svg",
  },
});
