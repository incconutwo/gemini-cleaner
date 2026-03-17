const toggle = document.getElementById('toggle');
const statusLabel = document.getElementById('status-label');
const statusBar = document.getElementById('status-bar');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');

function applyState(enabled) {
  toggle.checked = enabled;
  statusLabel.textContent = enabled ? 'Enabled' : 'Disabled';

  if (enabled) {
    statusBar.classList.remove('inactive');
    statusDot.classList.remove('inactive');
    statusText.textContent = 'Blocking upgrade prompts on Gemini';
  } else {
    statusBar.classList.add('inactive');
    statusDot.classList.add('inactive');
    statusText.textContent = 'Ad blocking is paused';
  }
}

// Load saved state using Firefox browser API
browser.storage.sync.get({ enabled: true }).then(({ enabled }) => {
  applyState(enabled);
});

// On toggle change
toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  browser.storage.sync.set({ enabled });
  applyState(enabled);

  // Notify all active Gemini tabs
  browser.tabs.query({ url: 'https://gemini.google.com/*' }).then(tabs => {
    tabs.forEach(tab => {
      browser.tabs.sendMessage(tab.id, { type: 'SET_ENABLED', enabled }).catch(() => {});
    });
  });
});
