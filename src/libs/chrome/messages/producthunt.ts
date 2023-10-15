import { getActiveTab } from "../tabs";

const GET_PRODUCT_HUNT_NEXT_DATA = "GET_PRODUCT_HUNT_NEXT_DATA";

export const productHuntNextDataMessage = {
  async sendMessage(): Promise<string> {
    const activeTab = await getActiveTab();
    if (!activeTab) return;

    return new Promise((resolve) => {
      chrome.tabs.sendMessage(
        activeTab.id!,
        { action: GET_PRODUCT_HUNT_NEXT_DATA },
        function (response) {
          resolve(response);
        },
      );
    });
  },
  onMessage() {
    chrome.runtime.onMessage.addListener(({ action }, sender, sendResponse) => {
      if (action === GET_PRODUCT_HUNT_NEXT_DATA) {
        const productHuntNextData = document?.querySelector("script#__NEXT_DATA__");
        if (!productHuntNextData) return;

        const productHuntNextDataText = productHuntNextData.innerHTML;
        sendResponse(productHuntNextDataText);
      }
    });
  },
};
