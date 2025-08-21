const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create build directory
if (!fs.existsSync('build')) {
    fs.mkdirSync('build');
}

// Package Chrome version
function packageChrome() {
    const output = fs.createWriteStream('build/classic-float-search-chrome.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    archive.pipe(output);
    
    // Add Chrome files
    archive.file('manifest.json', { name: 'manifest.json' });
    archive.file('content.js', { name: 'content.js' });
    archive.file('styles.css', { name: 'styles.css' });
    archive.file('icon16.png', { name: 'icon16.png' });
    archive.file('icon48.png', { name: 'icon48.png' });
    archive.file('icon128.png', { name: 'icon128.png' });
    
    archive.finalize();
    console.log('Chrome package created: build/classic-float-search-chrome.zip');
}

// Package Firefox version
function packageFirefox() {
    const output = fs.createWriteStream('build/classic-float-search-firefox.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    archive.pipe(output);
    
    // Add Firefox files
    archive.directory('firefox/', false);
    
    archive.finalize();
    console.log('Firefox package created: build/classic-float-search-firefox.zip');
}

packageChrome();
packageFirefox();