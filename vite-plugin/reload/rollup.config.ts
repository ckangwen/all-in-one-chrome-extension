import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

const plugins = [typescript()];

export default defineConfig([
  {
    plugins,
    input: "vite-plugin/reload/initReloadServer.ts",
    output: {
      file: "vite-plugin/reload/initReloadServer.js",
    },
    external: ["ws", "chokidar", "timers"],
  },
  {
    plugins,
    input: "vite-plugin/reload/injections/script.ts",
    output: {
      file: "vite-plugin/reload/injections/script.js",
    },
  },
  {
    plugins,
    input: "vite-plugin/reload/injections/view.ts",
    output: {
      file: "vite-plugin/reload/injections/view.js",
    },
  },
]);
