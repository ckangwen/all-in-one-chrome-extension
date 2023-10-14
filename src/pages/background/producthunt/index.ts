import { ContextMenusCreatePropertiesTree, OnContextMenusClick } from "@/libs/chrome";
import { saveToNotion } from "./saveToNotion";

const UrlPatterns = ["https://www.producthunt.com/*"];

export const contextMenus: ContextMenusCreatePropertiesTree[] = [
  {
    title: "Product Hunt",
    documentUrlPatterns: UrlPatterns,
    children: [
      {
        title: "Save To Notion",
        documentUrlPatterns: UrlPatterns,
      },
    ],
  },
];

export const onContextMenuClick: OnContextMenusClick = (info) => {
  const currentUrl = info.pageUrl;
  saveToNotion(currentUrl);
};
