<div align="center">

<img src="https://github.com/Sadat41/Classic-Float-Search/blob/main/icons/icon128.png?raw=true" alt="Classic Float Search Logo" width="128" height="128">

# Classic Float Search

**Restore the classic CSFloat search experience with sidebar input and native autocomplete suggestions**

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://github.com/Sadat41/Classic-Float-Search/releases)
[![Firefox Extension](https://img.shields.io/badge/Firefox_Browser-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)](https://raw.githubusercontent.com/Sadat41/Classic-Float-Search/main/csfloat%20extension-firefox.zip)
[![Version](https://img.shields.io/badge/Version-1.1.0-brightgreen?style=for-the-badge)](https://github.com/Sadat41/Classic-Float-Search/releases)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![CSFloat](https://img.shields.io/badge/CSFloat-Compatible-orange?style=for-the-badge)](https://csfloat.com)

[Download](#installation) • [Documentation](#how-to-use) • [Troubleshooting](#troubleshooting) • [FAQ](#frequently-asked-questions)

</div>


## Previews

<div align="center">
  <img src="https://github.com/Sadat41/Classic-Float-Search/blob/main/previews/preview.gif?raw=true" alt="Classic Float Search Preview" />
</div>

---

## Overview

CSFloat recently updated their search interface with a popup overlay that many users find disruptive. **Classic Float Search** brings back the familiar sidebar search experience you're used to, complete with the beautiful autocomplete dropdown that shows item suggestions with images and details.

### Key Features

- **Classic Sidebar Search** - Type directly in the left sidebar search box
- **Native Autocomplete** - Beautiful dropdown with item images and details  
- **Smooth Performance** - Optimized to prevent lag and stuttering
- **Smart Suggestions** - Real CSFloat item database with images
- **Keyboard Support** - Press Enter to search, click suggestions to select

### What Gets Hidden

- The large popup overlay that blocks the interface
- The intrusive backdrop that covers the entire screen
- All the disruption while keeping the functionality

---

## Tech Stack

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension_API-4285F4?style=flat&logo=googlechrome&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?style=flat&logo=css3&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-brightgreen?style=flat)

**Frontend:** Vanilla JavaScript ES6+, CSS3, Chrome Extension APIs  
**Architecture:** Content Script + CSS Injection, DOM Manipulation  
**Performance:** Throttled Events, Efficient DOM Observers, Passive Listeners

---

## Installation

<div align="center">

### Download for Your Browser

<a href="https://github.com/Sadat41/Classic-Float-Search/tree/main/chrome">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/chrome/chrome-original.svg" alt="Chrome" width="60" height="60" style="margin: 0 20px;">
</a>
<a href="https://github.com/Sadat41/Classic-Float-Search/tree/main/firefox">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/firefox/firefox-original.svg" alt="Firefox" width="60" height="60" style="margin: 0 20px;">
</a>

*Click the browser logo above to access the extension files*

</div>

---

### Chrome Installation

1. **Download** the repository and navigate to the `chrome/` folder
2. **Open Chrome** and go to `chrome://extensions/`
3. **Enable** "Developer mode" (toggle in top right)
4. **Click** "Load unpacked" and select the `chrome/` folder
5. **Done!** Visit [csfloat.com/search](https://csfloat.com/search) to use

### Firefox Installation

1. **Download** the repository and navigate to the `firefox/` folder
2. **Open Firefox** and go to `about:debugging`
3. **Click** "This Firefox" in the sidebar
4. **Click** "Load Temporary Add-on" and select `manifest.json` from the `firefox/` folder
5. **Done!** Visit [csfloat.com/search](https://csfloat.com/search) to use

### Alternative: Quick Install (Development)

### Method 2: Detailed Steps

<details>
<summary>Click to expand detailed installation guide</summary>

#### Step 1: Download the Extension
1. Go to the [GitHub repository](https://github.com/Sadat41/Classic-Float-Search)
2. Click the green **"Code"** button → **"Download ZIP"**
3. Extract the ZIP file to a memorable location

#### Step 2: Enable Developer Mode
1. Open **Google Chrome**
2. Navigate to `chrome://extensions/` or:
   - Click three dots menu (⋮) → **More tools** → **Extensions**
3. Find **"Developer mode"** toggle in the top right corner
4. Click to **turn it ON** (should turn blue/green)

#### Step 3: Load the Extension
1. Click **"Load unpacked"** button (now visible)
2. Navigate to your extracted folder
3. Select the folder containing `manifest.json`
4. Click **"Select Folder"**

#### Step 4: Verify Installation
- Look for **"Classic Float Search"** in your extensions list
- Status should show **"Enabled"**
- Visit CSFloat to see the orange border around search box

</details>

---

## How to Use

### Getting Started

1. **Navigate** to [csfloat.com/search](https://csfloat.com/search)
2. **Look** for the search box in the left sidebar 
3. **Notice** the orange border (extension is active!)

### Basic Usage

| Action | Description |
|--------|-------------|
| **Type in sidebar** | Start typing any item name (e.g., "karambit", "ak-47") |
| **View suggestions** | Autocomplete dropdown appears with images and details |
| **Click suggestion** | Select any item from the dropdown |
| **Press Enter** | Execute search with current text |
| **Press Escape** | Close suggestions and continue typing |

### Understanding Suggestions

The dropdown displays rich information:
- **Item Images** - Actual skin previews from Steam
- **Item Names** - Full names like "Karambit | Doppler"  
- **Rarity Colors** - Consumer, Industrial, Mil-Spec, Restricted, Classified, Covert
- **Special Attributes** - StatTrak™, wear ranges, collection info

---

## Troubleshooting

### Common Issues

<details>
<summary>Extension not working?</summary>

**Check installation:**
1. Go to `chrome://extensions/`
2. Find "Classic Float Search"
3. Ensure toggle is **ON** (blue/enabled)

**Refresh CSFloat:**
1. Press **Ctrl+F5** (Windows) or **Cmd+Shift+R** (Mac)
2. Look for orange border around search box
3. Try typing in the sidebar search

</details>

<details>
<summary>Search box still disabled?</summary>

**Solutions:**
- **Wait 2-3 seconds** - Extension needs time to initialize
- **Refresh page** - Sometimes a simple refresh works
- **Check browser console** - Press F12, look for errors
- **Restart Chrome** - Close browser completely and reopen

</details>

<details>
<summary>No autocomplete suggestions?</summary>

**Fixes:**
- **Type more characters** - Try at least 2-3 characters
- **Check spelling** - Ensure item names are correct
- **Test common items** - Try "karambit", "ak-47", "awp"
- **Wait briefly** - Suggestions may load with slight delay

</details>

---

## Privacy & Security

### What This Extension Does
- **CSFloat Only** - Runs exclusively on CSFloat domains
- **No Data Collection** - Doesn't track or store searches
- **Local Processing** - Everything happens in your browser
- **Open Source** - All code is public and auditable

### Permissions Explained
```json
{
  "permissions": ["activeTab"],
  "host_permissions": ["https://csfloat.com/*", "https://*.csfloat.com/*"]
}
```

- **`activeTab`** - Interact with current CSFloat tab only
- **Host permissions** - Access CSFloat pages to modify search interface
- **No broad permissions** - Cannot access other websites or browsing data

---

## Technical Details

### Architecture

![Architecture Diagram](https://github.com/Sadat41/Classic-Float-Search/blob/main/Architecture.png?raw=true)


### Files Structure
```
Classic-Float-Search/
├── chrome/            # Chrome extension (Manifest v3)
│   ├── manifest.json
│   ├── content.js
│   ├── styles.css
│   └── icon*.png
├── firefox/           # Firefox extension (Manifest v2)
│   ├── manifest.json
│   ├── content.js
│   ├── styles.css
│   └── icon*.png
├── icons/             # Shared icon assets
├── previews/          # Screenshots and demos
└── README.md          # Documentation
```

### Browser Compatibility
| Browser | Support | Notes |
|---------|---------|-------|
| **Chrome 88+** | Full | Recommended |
| **Firefox 57+** | Full | Available |
| **Edge (Chromium)** | Full | Tested |
| **Brave** | Full | Compatible |
| **Opera** | Partial | May work |
| **Safari** | No | Different extension system |

---

## Contributing

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Sadat41/Classic-Float-Search.git

# Navigate to project
cd Classic-Float-Search

# Load in Chrome for testing
# Go to chrome://extensions/ → Developer mode → Load unpacked
```

### Making Changes

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## Frequently Asked Questions

<details>
<summary><strong>Q: Is this safe to use?</strong></summary>
<br>
<strong>A:</strong> Yes! The extension only runs on CSFloat, doesn't collect data, and all code is open source for review.
</details>

<details>
<summary><strong>Q: Will this break when CSFloat updates?</strong></summary>
<br>
<strong>A:</strong> It might need updates if CSFloat significantly changes their interface. We'll monitor and update as needed.
</details>


<details>
<summary><strong>Q: Can I use this with other CSFloat extensions?</strong></summary>
<br>
<strong>A:</strong> Generally yes, but some extensions might conflict. Try disabling others if you experience issues.
</details>

<details>
<summary><strong>Q: How do I uninstall?</strong></summary>
<br>
<strong>A:</strong> Go to <code>chrome://extensions/</code>, find "Classic Float Search", and click "Remove".
</details>

---

## Changelog

### Version 1.0.0 (Latest)
- Initial release
- Classic sidebar search restoration
- Native autocomplete dropdown
- Performance optimizations
- Visual confirmation indicator

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with care for the CSFloat community**

[Star this repo](https://github.com/Sadat41/Classic-Float-Search) • [Report Bug](https://github.com/Sadat41/Classic-Float-Search/issues) • [Request Feature](https://github.com/Sadat41/Classic-Float-Search/issues)

---

*Having issues? Check the [troubleshooting guide](#troubleshooting) or [open an issue](https://github.com/Sadat41/Classic-Float-Search/issues)!*

</div>