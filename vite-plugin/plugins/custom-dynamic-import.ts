import type { PluginOption } from "vite";

export default function customDynamicImport(): PluginOption {
  return {
    name: "custom-dynamic-import",
    renderDynamicImport({ moduleId }) {
      if (!moduleId.includes("node_modules")) {
        // ↑ dont modify any import from node_modules
        return {
          left: `
          {
            const dynamicImport = (path) => import(path);
            dynamicImport(
            `,
          right: ")}",
        };
      }
      return {
        left: "import(",
        right: ")",
      };
    },
  };
}
