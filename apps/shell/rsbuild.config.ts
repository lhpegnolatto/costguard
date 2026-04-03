import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/rspack";
import { withZephyr } from "zephyr-rsbuild-plugin";

const ANALYTICS_REMOTE_URL = process.env.ANALYTICS_REMOTE_URL;
const INSIGHTS_REMOTE_URL = process.env.INSIGHTS_REMOTE_URL;

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
      name: "shell",
      remotes: {
        analytics: `analytics@${ANALYTICS_REMOTE_URL}/mf-manifest.json`,
        insights: `insights@${INSIGHTS_REMOTE_URL}/mf-manifest.json`,
      },
      shared: ["react", "react-dom"],
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
