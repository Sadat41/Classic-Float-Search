(function() {
    'use strict';

    const processedInputs = new WeakMap();
    let masterObserverDebounceTimeout;

    // A flag to track if the next input should trigger a search reset.
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
            console.log('CSFloat Classic Search: Missing spotlight overlay or popup input, retrying...');
            setTimeout(() => initializeClassicSearch(sidebarInput), 500);
            return;
        }

        console.log('CSFloat Classic Search: Initializing for new search input.');

        const cloneToOriginalMap = new Map();
        let inputTimeout;

        sidebarInput.addEventListener('input', () => {
            console.log('CSFloat Classic Search: Input event triggered, value:', sidebarInput.value);
            console.log('CSFloat Classic Search: isNewSearchSequence:', isNewSearchSequence);
            
            if (isNewSearchSequence) {
                console.log('CSFloat Classic Search: New search sequence detected, clearing old chip.');
                const chipDeleteButton = document.querySelector('app-spotlight-chip .delete .btn');
                
                if (chipDeleteButton) {
                    performRealisticClick(chipDeleteButton);
                    console.log('CSFloat Classic Search: Clicked chip delete button');
                }
                
                // observer for new search sequence
                console.log('CSFloat Classic Search: Recreating observer for new sequence');
                createObserver();
                

                setTimeout(() => {
                    console.log('CSFloat Classic Search: Force re-activating search overlay');
                    performRealisticClick(popupInput);
                    popupInput.focus();
                }, 50);
                
                isNewSearchSequence = false;
            }
            
            clearTimeout(inputTimeout);
            inputTimeout = setTimeout(() => {
                console.log('CSFloat Classic Search: Setting popup input value and triggering search');
                // Ensure the spotlight overlay is properly activated before setting value
                if (!spotlightOverlay.style.visibility || spotlightOverlay.style.visibility === 'hidden') {
                    console.log('CSFloat Classic Search: Re-activating spotlight overlay');
                    performRealisticClick(popupInput);
                }
                popupInput.value = sidebarInput.value;
                popupInput.dispatchEvent(new Event('input', { bubbles: true }));
                popupInput.focus(); 
                console.log('CSFloat Classic Search: Popup input updated with value:', popupInput.value);
            }, 150);
        });

        sidebarInput.addEventListener('focus', () => {
            console.log('CSFloat Classic Search: Focus event triggered, isNewSearchSequence:', isNewSearchSequence);
            
            if (isNewSearchSequence) {
                console.log('CSFloat Classic Search: Complete reinitialization needed');
                
                
                processedInputs.delete(sidebarInput);
                
                // Completely reinitialize after a delay
                setTimeout(() => {
                    console.log('CSFloat Classic Search: Reinitializing extension');
                    initializeClassicSearch(sidebarInput);
                }, 300);
                
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

        // This listener now resets the search sequence when user click away.
        document.addEventListener('click', (e) => {
            if (!sidebarInput.contains(e.target) && !customDropdown.contains(e.target) && !popupInput.contains(e.target)) {
                console.log('CSFloat Classic Search: Clicked away from search, hiding dropdown');
                // Only reset the flag if the dropdown was actually visible before this click.
                if (customDropdown.offsetParent !== null && !isNewSearchSequence) {
                    isNewSearchSequence = true;
                    console.log('CSFloat Classic Search: Set isNewSearchSequence to true');
                }
                customDropdown.style.display = 'none';
                popupInput.blur();
            }
        });

        let observer;
        
        function createObserver() {
            if (observer) {
                observer.disconnect();
            }
            
            observer = new MutationObserver(() => {
                console.log('CSFloat Classic Search: Mutation observer triggered');
                const resultsWrapper = spotlightOverlay.querySelector('.results-wrapper');
                customDropdown.innerHTML = '';
                cloneToOriginalMap.clear();

                if (resultsWrapper && resultsWrapper.hasChildNodes()) {
                    const resultRows = resultsWrapper.querySelectorAll('.result-row');
                    console.log('CSFloat Classic Search: Found', resultRows.length, 'results');
                    resultRows.forEach(originalResult => {
                        const clonedResult = originalResult.cloneNode(true);
                        customDropdown.appendChild(clonedResult);
                        cloneToOriginalMap.set(clonedResult, originalResult);
                    });
                    console.log('CSFloat Classic Search: Showing dropdown');
                    positionAndShowDropdown();
                } else {
                    console.log('CSFloat Classic Search: No results found, hiding dropdown');
                    customDropdown.style.display = 'none';
                }
            });

            observer.observe(spotlightOverlay, { childList: true, subtree: true });
            console.log('CSFloat Classic Search: Observer created and attached');
        }
        
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
    
    function main() {
        const masterObserver = new MutationObserver(() => {
            forceEnableInputs();
            clearTimeout(masterObserverDebounceTimeout);
            masterObserverDebounceTimeout = setTimeout(() => {
                 const inputs = document.querySelectorAll('input[placeholder="Search for items..."]');
                 inputs.forEach(initializeClassicSearch);
            }, 100);
        });

        masterObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }

})();