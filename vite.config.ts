/// <reference types="vitest/globals" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import manifest from "./manifest.config";
import { crx } from "@crxjs/vite-plugin";

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, "src");
const publicDir = resolve(rootDir, "public");

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      "@root": rootDir,
      "@": srcDir,
    },
  },
  plugins: [
    react(),
    crx({
      manifest,
    }),
  ],
  publicDir,
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/chunk-[hash].js",
      },
    },
  },
});
