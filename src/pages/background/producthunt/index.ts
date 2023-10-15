import {
  ContextMenusCreatePropertiesTree,
  OnContextMenusClick,
  productHuntNextDataMessage,
} from "@/libs/chrome";
import { saveToNotion } from "./saveToNotion";

export const contextMenus: ContextMenusCreatePropertiesTree[] = [
  {
    title: "Product Hunt",
    documentUrlPatterns: ["https://www.producthunt.com/*"],
    children: [
      {
        title: "Save To Notion",
        documentUrlPatterns: ["https://www.producthunt.com/posts/*"],
      },
    ],
  },
];

export const onContextMenuClick: OnContextMenusClick = (info) => {
  const currentUrl = info.pageUrl;

  productHuntNextDataMessage.sendMessage().then((res) => {
    saveToNotion(currentUrl, res);
  });
};
