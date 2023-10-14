import { nanoid } from "../utils";

export interface ContextMenusCreatePropertiesTree extends chrome.contextMenus.CreateProperties {
  children?: ContextMenusCreatePropertiesTree[];
}

export type OnContextMenusClick = (
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab,
) => void;

export function setupContextMenu(
  onClick?: OnContextMenusClick,
  menus: ContextMenusCreatePropertiesTree[] = [],
) {
  let rootContextMenuId: string | number = 0;

  const createContextMenu = (
    options: chrome.contextMenus.CreateProperties,
    callback?: (() => void) | undefined,
  ) => {
    if (!options.id) {
      options.id = nanoid();
    }
    if (rootContextMenuId && !options.parentId) {
      options.parentId = this.rootContextMenuId;
    }
    return chrome?.contextMenus?.create(options, callback);
  };

  // 递归遍历 menus，创建上下文菜单
  const createMenus = (
    menuTree: ContextMenusCreatePropertiesTree[],
    parentId?: string | number,
  ) => {
    menuTree.forEach((menu: ContextMenusCreatePropertiesTree) => {
      if (menu.children && menu.children.length > 0) {
        const { children, ...rest } = menu;
        const id = createContextMenu({
          ...rest,
          parentId,
        });
        createMenus(children, id);
      } else {
        createContextMenu({
          ...menu,
          parentId,
        });
      }
    });
  };

  // ------------------------------------

  chrome.contextMenus.onClicked.addListener(onClick);

  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.removeAll();

    rootContextMenuId = createContextMenu({
      title: "One In All",
    });

    createMenus(menus, rootContextMenuId);
  });

  return {
    createContextMenu,
  };
}
