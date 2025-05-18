chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get(['cbAnswerHiderEnabled'], (result) => {
    const newState = !result.cbAnswerHiderEnabled;

    chrome.storage.sync.set({ cbAnswerHiderEnabled: newState }, () => {
      if (newState) {
        // If turning ON, inject the content script
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
      } else {
        // If turning OFF, refresh the page to remove changes
        chrome.tabs.reload(tab.id);
      }

      // Optional: update badge
      chrome.action.setBadgeText({
        tabId: tab.id,
        text: newState ? "ON" : ""
      });
      chrome.action.setBadgeBackgroundColor({
        tabId: tab.id,
        color: "#4688F1"
      });
    });
  });
});