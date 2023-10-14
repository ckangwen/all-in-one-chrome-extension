import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { setupContextMenu } from "@/libs/chrome";
import {
  contextMenus as ProductHuntContextMenus,
  onContextMenuClick as onProductHuntContextMenuClick,
} from "./producthunt";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

setupContextMenu(
  (info, tab) => {
    onProductHuntContextMenuClick(info, tab);
  },
  [...ProductHuntContextMenus],
);
