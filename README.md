# Classic Float Search

> **Restore the classic CSFloat search experience with sidebar input and native autocomplete suggestions**

## What This Extension Does

CSFloat recently updated their search interface with a popup overlay that many users find disruptive. **Classic Float Search** brings back the familiar sidebar search experience you're used to, complete with the beautiful autocomplete dropdown that shows item suggestions with images and details.

### Features

- **Classic Sidebar Search** - Type directly in the left sidebar search box
- **Native Autocomplete** - Beautiful dropdown with item images and details  
- **Smooth Performance** - Optimized to prevent lag and stuttering
- **Smart Suggestions** - Real CSFloat item database with images
- **Keyboard Support** - Press Enter to search, click suggestions to select
- **Visual Indicator** - Orange border shows the extension is active

### What Gets Hidden

- The large popup overlay that blocks the interface
- The intrusive backdrop that covers the entire screen
- All the disruption while keeping the functionality

## Installation Guide

### Step 1: Download the Extension

1. **Download** this extension folder to your computer
2. **Extract** if it's in a ZIP file
3. **Remember** the folder location (you'll need it in Step 2)

### Step 2: Enable Developer Mode

1. Open **Google Chrome**
2. Click the **three dots menu** (⋮) in the top right corner
3. Go to **More tools** → **Extensions**
4. **Alternative**: Type `chrome://extensions/` in the address bar

**In the Extensions page:**
1. Look for **"Developer mode"** toggle in the **top right corner**
2. **Click the toggle** to turn it ON (it should turn blue/green)
3. You'll see new buttons appear: "Load unpacked", "Pack extension", "Update"

### Step 3: Load the Extension

1. Click the **"Load unpacked"** button (now visible after enabling Developer mode)
2. **Navigate to** the extension folder you downloaded/extracted
3. **Select the folder** containing the `manifest.json` file
4. Click **"Select Folder"** (Windows) or **"Open"** (Mac)

### Step 4: Verify Installation

You should now see **"Classic Float Search"** in your extensions list with:
- **Status**: Enabled 
- **ID**: A random string of letters
- **Description**: "Restores the classic CSFloat search experience..."

## How to Use

### Getting Started

1. **Navigate** to [csfloat.com/search](https://csfloat.com/search)
2. **Look** for the search box in the left sidebar 
3. **Notice** the orange border (this means the extension is working!)

### Using the Search

#### Basic Search
1. **Click** in the sidebar search box
2. **Start typing** any item name (e.g., "karambit", "ak-47", "gloves")
3. **Watch** the autocomplete dropdown appear below
4. **Press Enter** to search or **click a suggestion** to select it

#### Understanding Suggestions
The dropdown shows rich suggestions with:
- **Item Images** - Actual skin previews
- **Item Names** - Full names like "Karambit | Doppler"  
- **Rarity Colors** - Consumer, Industrial, Mil-Spec, etc.
- **Special Attributes** - StatTrak™, wear ranges, etc.

#### Navigation Tips
- **Type freely** - The search updates as you type
- **Use arrow keys** - Navigate through suggestions (if supported)
- **Click anywhere** - Suggestions auto-hide when clicking outside
- **Press Escape** - Close suggestions and continue typing

## Troubleshooting

### Extension Not Working?

**Check if installed correctly:**
1. Go to `chrome://extensions/`
2. Find "Classic Float Search"
3. Make sure the toggle is **ON** (blue/enabled)

**Try refreshing CSFloat:**
1. Go to any CSFloat page
2. Press **Ctrl+F5** (Windows) or **Cmd+Shift+R** (Mac) to hard refresh
3. The orange border should appear around the search box

### Search Box Still Disabled?

**Common solutions:**
1. **Wait a moment** - The extension takes a few seconds to activate
2. **Refresh the page** - Sometimes a simple refresh helps
3. **Check console** - Press F12, look for any error messages
4. **Restart browser** - Close and reopen Chrome completely

### Suggestions Not Appearing?

**Possible fixes:**
1. **Type more characters** - Try typing at least 2-3 characters
2. **Check your spelling** - Make sure item names are spelled correctly
3. **Wait briefly** - Suggestions may take a moment to load
4. **Try common items** - Test with "karambit", "ak-47", or "awp"

## Privacy & Security

### What This Extension Does
- **Only runs on CSFloat** - Doesn't access any other websites
- **No data collection** - Doesn't track or store your searches  
- **No external servers** - Works entirely within your browser
- **Open source code** - You can inspect all the code files

### Permissions Explained
- **`activeTab`** - Only needed to interact with the current CSFloat tab
- **No broad permissions** - Can't access your browsing history or other sites

## Technical Details

### Files Structure
```
Classic Float Search/
├── manifest.json      # Extension configuration
├── content.js         # Main functionality script  
├── styles.css         # Interface optimization styles
└── README.md         # This documentation
```

### Browser Compatibility
- **Google Chrome** (recommended)
- **Microsoft Edge** (Chromium-based)
- **Brave Browser**
- **Opera** (Chromium-based)
- **Firefox** - Not supported (different extension system)
- **Safari** - Not supported (different extension system)

### Version Requirements
- **Chrome 88+** (for Manifest V3 support)
- **Modern JavaScript** support required

## Sharing with Friends

### Easy Installation for Others

**Method 1: Share the Folder**
1. **Zip** your extension folder
2. **Share** the ZIP file
3. **Recipients** follow the installation guide above

**Method 2: Step-by-Step for Non-Tech Users**

Send them this simple instruction:
> 1. Download the extension ZIP file I sent you
> 2. Extract it to a folder on your desktop
> 3. Open Chrome and go to Settings → Extensions  
> 4. Turn ON "Developer mode" (top right toggle)
> 5. Click "Load unpacked" and select the folder
> 6. Go to csfloat.com/search and enjoy!

## Changelog

### Version 1.0.0
- Initial release
- Classic sidebar search restoration
- Native autocomplete dropdown
- Performance optimizations
- Visual confirmation indicator

## Frequently Asked Questions

**Q: Is this safe to use?**  
A: Yes! The extension only runs on CSFloat and doesn't collect any data.

**Q: Will this break when CSFloat updates?**  
A: It might need updates if CSFloat changes their interface significantly.

**Q: Can I use this alongside other CSFloat extensions?**  
A: Generally yes, but some extensions might conflict. Try disabling others if issues occur.

**Q: Why do I need Developer Mode?**  
A: This extension isn't published on the Chrome Web Store, so it requires manual installation.

**Q: Does this work on mobile?**  
A: No, this is only for desktop Chrome browsers.

**Q: How do I uninstall it?**  
A: Go to chrome://extensions/, find "Classic Float Search", and click "Remove".

**Q: Can I modify the code?**  
A: Yes! All source code is available and you can customize it as needed.

---

**Made with care for the CSFloat community**

*Having issues? Double-check the installation steps or try refreshing the CSFloat page!*