/**
 * Gemini Cleaner - content.js (Firefox)
 * Dynamically hides "Upgrade to Ultra" ads and banners on gemini.google.com
 */

const UPGRADE_SELECTORS = [
  '[aria-label*="Upgrade"]',
  '[aria-label*="Ultra"]',
  '[title*="Upgrade to"]',
  '[data-test-id*="upgrade"]',
  '[data-test-id*="upsell"]',
  'upgrade-plan-button',
  'upsell-dialog',
  'upsell-banner',
  'upgrade-cta',
  'gemini-ultra-upsell',
  '.upgrade-button-container',
  '.upsell-card',
  '.upgrade-card',
  '.upgrade-sticky-bar',
  '.bottom-upgrade-bar',
  '.trial-banner',
  '.paywall-banner',
  '.ultra-upsell',
  '.plan-upgrade-cta',
  '.upgrade-cta-container',
];

let isEnabled = true;
const hiddenNodes = new WeakSet();

function hideElement(el) {
  if (!hiddenNodes.has(el)) {
    el.style.setProperty('display', 'none', 'important');
    hiddenNodes.add(el);
  }
}

function showElement(el) {
  el.style.removeProperty('display');
}

function applyToAll() {
  if (!isEnabled) return;
  UPGRADE_SELECTORS.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(hideElement);
    } catch (_) {}
  });

  document.querySelectorAll('button, a, div[role="banner"], aside').forEach(el => {
    const text = el.innerText || '';
    if (
      /upgrade to (google ai )?ultra/i.test(text) ||
      /try (google ai )?ultra/i.test(text) ||
      /get (google ai )?ultra/i.test(text) ||
      /start (free )?trial/i.test(text)
    ) {
      if (el.querySelectorAll('*').length < 40) {
        hideElement(el);
      }
    }
  });
}

function restoreAll() {
  UPGRADE_SELECTORS.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(showElement);
    } catch (_) {}
  });
}

// Load saved state — use browser.storage (Firefox native API)
browser.storage.sync.get({ enabled: true }).then(({ enabled }) => {
  isEnabled = enabled;
  if (isEnabled) applyToAll();
});

// Listen for toggle messages from popup
browser.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'SET_ENABLED') {
    isEnabled = msg.enabled;
    if (isEnabled) {
      applyToAll();
    } else {
      restoreAll();
    }
  }
});

// Watch for dynamically injected nodes
const observer = new MutationObserver(() => {
  if (isEnabled) applyToAll();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
