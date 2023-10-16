import "@/pages/panel/index.css";
import Panel from "@/pages/panel/Panel";
import { createRoot } from "react-dom/client";

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(<Panel />);
}

init();
