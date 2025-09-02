(function() {
    'use strict';

    let processedInputs = new WeakMap();
    let masterObserverDebounceTimeout;
    let currentUrl = window.location.href;
    let isNewSearchSequence = true;

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
    
    function handleNavigation() {
        if (currentUrl !== window.location.href) {
            currentUrl = window.location.href;
            
            if (isDbPage()) {
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
        if (isDbPage()) {
            return;
        }
        
        if (!isSearchPage()) {
            return;
        }
        
        // Initial setup
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
        setInterval(handleNavigation, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            startNavigationMonitoring();
            main();
        });
    } else {
        startNavigationMonitoring();
        main();
    }

})();