import { setupContextMenu } from "@/libs/chrome";
import {
  contextMenus as ProductHuntContextMenus,
  onContextMenuClick as onProductHuntContextMenuClick,
} from "./producthunt";

setupContextMenu(
  (info, tab) => {
    onProductHuntContextMenuClick(info, tab);
  },
  [...ProductHuntContextMenus],
);
