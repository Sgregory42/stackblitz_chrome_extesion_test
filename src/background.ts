chrome.commands.onCommand.addListener((command) => {
  if (command === "open-note-input" || command === "open-note-input-with-screenshot") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, { action: command });
      }
    });
  }
});