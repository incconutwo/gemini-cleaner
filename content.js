function updateAdVisibility(enabled) {
  if (enabled) {
    document.body.classList.add('gemini-ads-hidden');
  } else {
    document.body.classList.remove('gemini-ads-hidden');
  }
}

// Initial load check
chrome.storage.sync.get({ blockGeminiAds: true }, (result) => {
  updateAdVisibility(result.blockGeminiAds);
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleAds") {
    updateAdVisibility(request.enabled);
  }
});
