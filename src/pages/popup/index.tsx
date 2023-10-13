import "@/pages/popup/index.css";
import Popup from "@/pages/popup/Popup";
import { attachTwindStyle } from "@root/src/libs/twind";
import { createRoot } from "react-dom/client";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

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
