const toggleBtn = document.getElementById('toggle');

chrome.storage.sync.get(['cbAnswerHiderEnabled'], (result) => {
    toggleBtn.textContent = result.cbAnswerHiderEnabled ? 'Disable Hider' : 'Enable Hider';
});

toggleBtn.addEventListener('click', () => {
    chrome.storage.sync.get(['cbAnswerHiderEnabled'], (result) => {
        const newState = !result.cbAnswerHiderEnabled;
        chrome.storage.sync.set({ cbAnswerHiderEnabled: newState }, () => {
            toggleBtn.textContent = newState ? 'Disable Hider' : 'Enable Hider';
            // Reload current tab to re-run content script with new setting
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ['content.js']
                });
            });
        });
    });
});
