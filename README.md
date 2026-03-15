# Gemini Cleaner - Hide Upgrade Prompts

A lightweight, minimal Chrome extension designed to hide the "Upgrade to Google AI Ultra" ads and banners on `gemini.google.com`.

<img width="904" height="809" alt="Image" src="https://github.com/user-attachments/assets/a707ff94-f41f-446b-8386-8822f979dfae" />

## Features

- **Toggle On/Off**: Easily enable or disable the ad blocking via a Material Design popup.
- **Clean Interface**: Keeps your Gemini experience focused and free from upsell distractions.
- **Privacy First**: No data collection. The extension only requires `storage` permission to save your toggle preference.
- **Lightweight**: Zero dependencies, minimal footprint.

## Chrome Web Store

Coming soon! This extension is currently under review for the Chrome Web Store.

## Installation (Local Development)

1. Clone or download this repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top right corner).
4. Click **Load unpacked**.
5. Select the project folder.
6. Refresh `https://gemini.google.com/app`.

## Technical Details

- **Manifest V3**: Using the latest Chrome extension standards.
- **CSS Injection**: Uses specific selectors to target Angular-based elements without affecting core functionality.

## Contributing

Feel free to open an issue or submit a pull request if Google updates their selectors and the ads reappear!
