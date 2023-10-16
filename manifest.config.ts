import packageJson from "./package.json";
import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  icons: {
    128: "images/icons/128.png",
  },
  permissions: ["storage", "contextMenus", "tabs"],
  options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "images/icons/34.png",
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.ts"],
    },
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["images/icons/128.png", "images/icons/34.png"],
      matches: ["*://*/*"],
    },
  ],
});
