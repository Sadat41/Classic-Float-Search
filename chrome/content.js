(function() {
    'use strict';
    
    // Immediately exit if we're on a /db page - no extension activity at all
    if (window.location.pathname.startsWith('/db')) {
        return;
    }

    let processedInputs = new WeakMap();
    let masterObserverDebounceTimeout;
    let currentUrl = window.location.href;
    let isNewSearchSequence = true;
    let navigationInterval;

    function getDropdownContainer() {
        let container = document.getElementById('classic-search-dropdown-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'classic-search-dropdown-container';
            container.style.display = 'none';
            document.body.appendChild(container);
        }
        return container;
    }

    function performRealisticClick(element) {
        if (!element) return;
        const eventParams = { bubbles: true, cancelable: true, view: window };
        element.dispatchEvent(new MouseEvent('mousedown', eventParams));
        element.dispatchEvent(new MouseEvent('mouseup', eventParams));
        element.dispatchEvent(new MouseEvent('click', eventParams));
    }

    function initializeClassicSearch(sidebarInput) {
        if (!sidebarInput || processedInputs.has(sidebarInput)) {
            return;
        }

        const spotlightOverlay = document.querySelector('app-spotlight-overlay');
        const popupInput = document.getElementById('spotlight-overlay-input');
        const customDropdown = getDropdownContainer();

        if (!spotlightOverlay || !popupInput) {
            setTimeout(() => initializeClassicSearch(sidebarInput), 1000);
            return;
        }

        const cloneToOriginalMap = new Map();
        let inputTimeout;
        let observer;
        
        function createObserver() {
            if (observer) {
                observer.disconnect();
            }
            
            observer = new MutationObserver(() => {
                const resultsWrapper = spotlightOverlay.querySelector('.results-wrapper');
                customDropdown.innerHTML = '';
                cloneToOriginalMap.clear();

                if (resultsWrapper && resultsWrapper.hasChildNodes()) {
                    const resultRows = resultsWrapper.querySelectorAll('.result-row');
                    resultRows.forEach(originalResult => {
                        const clonedResult = originalResult.cloneNode(true);
                        customDropdown.appendChild(clonedResult);
                        cloneToOriginalMap.set(clonedResult, originalResult);
                    });
                    positionAndShowDropdown();
                } else {
                    customDropdown.style.display = 'none';
                }
            });

            observer.observe(spotlightOverlay, { childList: true, subtree: true });
        }

        sidebarInput.addEventListener('input', () => {
            if (isNewSearchSequence) {
                const chipDeleteButton = document.querySelector('app-spotlight-chip .delete .btn');
                if (chipDeleteButton) {
                    performRealisticClick(chipDeleteButton);
                }
                
                createObserver();
                
                setTimeout(() => {
                    performRealisticClick(popupInput);
                    popupInput.focus();
                }, 50);
                
                isNewSearchSequence = false;
            }
            
            clearTimeout(inputTimeout);
            inputTimeout = setTimeout(() => {
                if (!spotlightOverlay.style.visibility || spotlightOverlay.style.visibility === 'hidden') {
                    performRealisticClick(popupInput);
                }
                popupInput.value = sidebarInput.value;
                popupInput.dispatchEvent(new Event('input', { bubbles: true }));
                popupInput.focus();
            }, 150);
        });

        sidebarInput.addEventListener('focus', () => {
            if (isNewSearchSequence) {
                processedInputs.delete(sidebarInput);
                
                setTimeout(() => {
                    initializeClassicSearch(sidebarInput);
                }, 500);
                
                isNewSearchSequence = false;
            }
        });

        sidebarInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const firstOriginalResult = spotlightOverlay.querySelector('.result-row');
                performRealisticClick(firstOriginalResult);
                customDropdown.style.display = 'none';
                isNewSearchSequence = true;
            }
        });
        
        function positionAndShowDropdown() {
            const formField = sidebarInput.closest('.mat-mdc-form-field');
            if (!formField) return;

            requestAnimationFrame(() => {
                const rect = formField.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    customDropdown.style.top = `${rect.bottom + window.scrollY}px`;
                    customDropdown.style.left = `${rect.left + window.scrollX}px`;
                    customDropdown.style.width = `${rect.width}px`;
                    customDropdown.style.display = 'block';

                    // Force layout recalculation for text wrapping to take effect
                    void customDropdown.offsetHeight;
                } else {
                    customDropdown.style.display = 'none';
                }
            });
        }

        customDropdown.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const clickedClone = e.target.closest('.result-row');

            if (clickedClone && cloneToOriginalMap.has(clickedClone)) {
                const originalElement = cloneToOriginalMap.get(clickedClone);
                performRealisticClick(originalElement);
                customDropdown.style.display = 'none';
                isNewSearchSequence = true;
            }
        });

        document.addEventListener('click', (e) => {
            if (!sidebarInput.contains(e.target) && !customDropdown.contains(e.target) && !popupInput.contains(e.target)) {
                if (customDropdown.offsetParent !== null && !isNewSearchSequence) {
                    isNewSearchSequence = true;
                }
                customDropdown.style.display = 'none';
                popupInput.blur();
            }
        });
        
        createObserver();

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (customDropdown.offsetParent !== null) {
                    positionAndShowDropdown();
                }
            }, 100);
        });

        processedInputs.set(sidebarInput, true);
    }
    
    function forceEnableInputs() {
        const inputs = document.querySelectorAll('input[placeholder="Search for items..."]');
        inputs.forEach(input => {
            if (input.hasAttribute('disabled')) {
                input.removeAttribute('disabled');
            }
            const parentFormField = input.closest('.mat-mdc-form-field');
            if (parentFormField && parentFormField.classList.contains('mat-form-field-disabled')) {
                parentFormField.classList.remove('mat-form-field-disabled');
            }
        });
    }
    
    function isSearchPage() {
        return window.location.pathname.startsWith('/search');
    }
    
    function isDbPage() {
        return window.location.pathname.startsWith('/db');
    }
    
    function cleanupExtension() {
        const dropdown = document.getElementById('classic-search-dropdown-container');
        if (dropdown) {
            dropdown.remove();
        }
        
        const inputs = document.querySelectorAll('input[placeholder="Search for items..."]');
        inputs.forEach(input => {
            if (input.hasAttribute('disabled')) {
                input.removeAttribute('disabled');
            }
            const parentFormField = input.closest('.mat-mdc-form-field');
            if (parentFormField && parentFormField.classList.contains('mat-form-field-disabled')) {
                parentFormField.classList.remove('mat-form-field-disabled');
            }
        });
        
        processedInputs = new WeakMap();
    }
    
    async function showRefreshNotification() {
        // Check if user has permanently dismissed notifications
        try {
            const result = await chrome.storage.local.get(['csfloat-notification-disabled']);
            if (result['csfloat-notification-disabled'] === true) {
                console.log('CSFloat notification disabled by user');
                return;
            }
        } catch (error) {
            console.log('Failed to check storage, showing notification:', error);
        }
        
        if (document.getElementById('csfloat-extension-notification')) {
            console.log('CSFloat notification already exists');
            return;
        }
        
        console.log('CSFloat showing notification');
        
        const notification = document.createElement('div');
        notification.id = 'csfloat-extension-notification';
        notification.innerHTML = `
            <div class="csfloat-notification-container" style="
                position: fixed !important;
                top: 20px !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                background: rgba(255, 255, 255, 0.08) !important;
                backdrop-filter: blur(20px) saturate(180%) !important;
                color: white !important;
                padding: 24px 28px !important;
                border-radius: 24px !important;
                box-shadow: 
                    0 20px 50px rgba(0, 0, 0, 0.4),
                    0 0 0 1px rgba(255, 255, 255, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
                z-index: 2147483647 !important;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                max-width: 460px !important;
                width: 460px !important;
                text-align: center !important;
                animation: slideDownBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
                border: 1px solid rgba(255, 255, 255, 0.12) !important;
                overflow: hidden !important;
                margin: 0 !important;
                display: block !important;
            ">
                <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                "></div>
                
                <div style="
                    margin-bottom: 12px; 
                    font-weight: 700; 
                    font-size: 18px; 
                    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    gap: 10px;
                    filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));
                ">
                    <span style="font-size: 20px; filter: none; -webkit-text-fill-color: initial;">🔍</span>
                    CSFloat Classic Search
                </div>
                
                <div style="
                    line-height: 1.6; 
                    margin-bottom: 20px; 
                    font-size: 15px;
                    color: rgba(255, 255, 255, 0.95);
                    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                ">
                    Search not working as expected? Simply <strong style="color: #a8edea;">refresh the page</strong> to activate the classic search experience.
                </div>
                
                <div style="
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                    margin-top: 16px;
                ">
                    <button class="csfloat-btn-primary" style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                        color: white !important;
                        border: none !important;
                        padding: 12px 20px !important;
                        border-radius: 12px !important;
                        font-weight: 600 !important;
                        font-size: 14px !important;
                        cursor: pointer !important;
                        transition: all 0.3s ease !important;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4) !important;
                        border: 1px solid rgba(255,255,255,0.1) !important;
                        pointer-events: auto !important;
                        z-index: 2147483647 !important;
                        position: relative !important;
                    ">
                        ✓ Got it
                    </button>
                    <button class="csfloat-btn-secondary" style="
                        background: rgba(255, 255, 255, 0.1) !important;
                        color: rgba(255, 255, 255, 0.9) !important;
                        border: 1px solid rgba(255,255,255,0.2) !important;
                        padding: 12px 20px !important;
                        border-radius: 12px !important;
                        font-weight: 500 !important;
                        font-size: 14px !important;
                        cursor: pointer !important;
                        transition: all 0.3s ease !important;
                        backdrop-filter: blur(10px) !important;
                        pointer-events: auto !important;
                        z-index: 2147483647 !important;
                        position: relative !important;
                    ">
                        Never show again
                    </button>
                </div>
            </div>
            <style>
                @keyframes slideDownBounce {
                    0% { 
                        transform: translateX(-50%) translateY(-30px) scale(0.8); 
                        opacity: 0; 
                    }
                    70% {
                        transform: translateX(-50%) translateY(5px) scale(1.02);
                        opacity: 0.9;
                    }
                    100% { 
                        transform: translateX(-50%) translateY(0) scale(1); 
                        opacity: 1; 
                    }
                }
                
                .csfloat-btn-primary:hover {
                    background: linear-gradient(135deg, #7c8ef0 0%, #8458b8 100%) !important;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6) !important;
                }
                
                .csfloat-btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.15) !important;
                    border-color: rgba(255,255,255,0.3) !important;
                    transform: translateY(-1px);
                }
                
                .csfloat-btn-primary:active,
                .csfloat-btn-secondary:active {
                    transform: translateY(0) scale(0.98);
                }
            </style>
        `;
        
        document.body.appendChild(notification);
        console.log('CSFloat notification element added to DOM, checking visibility:', notification.offsetParent !== null);
        console.log('Notification position:', {
            top: notification.getBoundingClientRect().top,
            left: notification.getBoundingClientRect().left,
            width: notification.getBoundingClientRect().width,
            height: notification.getBoundingClientRect().height
        });
        
        // Handle button clicks
        const primaryBtn = notification.querySelector('.csfloat-btn-primary');
        const secondaryBtn = notification.querySelector('.csfloat-btn-secondary');
        
        const removeNotification = async (permanent = false) => {
            const notif = document.getElementById('csfloat-extension-notification');
            if (notif) {
                notif.style.animation = 'slideUpFade 0.3s ease-out forwards';
                setTimeout(() => {
                    if (notif.parentNode) {
                        notif.remove();
                    }
                }, 300);
            }
            
            if (permanent) {
                try {
                    await chrome.storage.local.set({'csfloat-notification-disabled': true});
                    console.log('CSFloat notification disabled permanently');
                } catch (error) {
                    console.error('Failed to save notification preference:', error);
                }
            }
        };
        
        primaryBtn.addEventListener('click', (e) => {
            console.log('CSFloat primary button clicked - Got it');
            e.stopPropagation();
            removeNotification(false);
        });
        
        secondaryBtn.addEventListener('click', (e) => {
            console.log('CSFloat secondary button clicked - Never show again');
            e.stopPropagation();
            removeNotification(true);
        });
        
        // Auto-remove after 15 seconds
        setTimeout(() => removeNotification(false), 15000);
        
        // Add exit animation style
        if (!document.querySelector('#csfloat-exit-animation')) {
            const style = document.createElement('style');
            style.id = 'csfloat-exit-animation';
            style.textContent = `
                @keyframes slideUpFade {
                    to { 
                        transform: translateX(-50%) translateY(-20px) scale(0.9); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function handleNavigation() {
        if (currentUrl !== window.location.href) {
            currentUrl = window.location.href;
            
            if (isDbPage()) {
                // Show notification before shutting down
                setTimeout(async () => {
                    await showRefreshNotification();
                }, 1000);
                
                // Completely stop and disable all extension functionality
                cleanupExtension();
                // Stop all further navigation monitoring
                window.removeEventListener('popstate', handleNavigation);
                // Clear all intervals and timeouts
                clearTimeout(masterObserverDebounceTimeout);
                if (navigationInterval) {
                    clearInterval(navigationInterval);
                }
                return;
            }
            
            if (isSearchPage()) {
                isNewSearchSequence = true;
                processedInputs = new WeakMap();
                
                setTimeout(() => {
                    main();
                }, 500);
            }
        }
    }
    
    function main() {
        console.log('CSFloat main() called, current URL:', window.location.href);
        console.log('isDbPage():', isDbPage());
        console.log('isSearchPage():', isSearchPage());
        
        if (isDbPage()) {
            console.log('Detected DB page, cleaning up and exiting');
            cleanupExtension();
            return;
        }
        
        if (!isSearchPage()) {
            console.log('Not a search page, exiting main()');
            return;
        }
        
        console.log('On search page, will show notification in 1.5s');
        // Show notification to help users if needed
        setTimeout(async () => {
            console.log('Timeout reached, calling showRefreshNotification()');
            await showRefreshNotification();
        }, 1500);
        
        forceEnableInputs();
        const inputs = document.querySelectorAll('input[placeholder="Search for items..."]');
        inputs.forEach(initializeClassicSearch);
        
        const masterObserver = new MutationObserver(() => {
            forceEnableInputs();
            clearTimeout(masterObserverDebounceTimeout);
            masterObserverDebounceTimeout = setTimeout(() => {
                 const inputs = document.querySelectorAll('input[placeholder="Search for items..."]');
                 inputs.forEach(initializeClassicSearch);
            }, 200);
        });

        masterObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function startNavigationMonitoring() {
        if (isDbPage()) {
            cleanupExtension();
            return;
        }
        
        const navigationObserver = new MutationObserver(() => {
            handleNavigation();
        });
        
        const targetElement = document.querySelector('title') || document.head || document.body;
        if (targetElement) {
            navigationObserver.observe(targetElement, {
                childList: true,
                subtree: true
            });
        }
        
        window.addEventListener('popstate', handleNavigation);
        navigationInterval = setInterval(handleNavigation, 1000);
    }

    console.log('CSFloat extension starting, readyState:', document.readyState);
    console.log('Current URL:', window.location.href);
    
    if (document.readyState === 'loading') {
        console.log('Document still loading, waiting for DOMContentLoaded');
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOMContentLoaded fired, starting extension');
            startNavigationMonitoring();
            main();
        });
    } else {
        console.log('Document ready, starting extension immediately');
        startNavigationMonitoring();
        main();
    }

})();