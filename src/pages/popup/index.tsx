import { createRoot } from "react-dom/client";
import "@/pages/popup/index.css";

import Popup from "@/pages/popup/Popup";

function init() {
  const appContainer = document.querySelector("#app");
  if (!appContainer) {
    throw new Error("Can not find #app");
  }
  const root = createRoot(appContainer);
  root.render(<Popup />);
}

init();
