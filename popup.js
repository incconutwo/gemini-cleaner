document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('blockerToggle');

  // Load current state (default: enabled)
  chrome.storage.sync.get({ blockGeminiAds: true }, (result) => {
    toggle.checked = result.blockGeminiAds;
  });

  // Listen for changes
  toggle.addEventListener('change', (e) => {
    const isEnabled = e.target.checked;
    
    // Save state
    chrome.storage.sync.set({ blockGeminiAds: isEnabled });

    // Send a message to the active tab to update immediately
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url.includes("gemini.google.com")) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggleAds", enabled: isEnabled }).catch(() => {
          // Content script might not be injected yet or tab might be reloading
        });
      }
    });
  });
});
