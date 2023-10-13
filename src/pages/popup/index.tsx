import { createRoot } from "react-dom/client";
import { attachTwindStyle } from "@/libs/twind";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import "@/pages/popup/index.css";

import Popup from "@/pages/popup/Popup";

refreshOnUpdate("pages/popup");

function init() {
  const appContainer = document.querySelector("#app");
  if (!appContainer) {
    throw new Error("Can not find #app");
  }
  attachTwindStyle(appContainer, document);
  const root = createRoot(appContainer);
  root.render(<Popup />);
}

init();
