(function() {
    'use strict';


    
    let setupComplete = false;

    function setupSearchFix() {
        if (setupComplete) return true;

        const sidebarInput = document.querySelector('input[placeholder="Search for items..."]');
        const popupInput = document.getElementById('spotlight-overlay-input');

        if (!sidebarInput || !popupInput) {
            return false;
        }

        // Keep the sidebar input enabled (simple version)
        sidebarInput.removeAttribute('disabled');

        // Sync typing from sidebar to the hidden input
        let inputTimeout;
        sidebarInput.addEventListener('input', (e) => {
            clearTimeout(inputTimeout);
            inputTimeout = setTimeout(() => {
                if (popupInput.value !== e.target.value) {
                    popupInput.value = e.target.value;
                    popupInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }, 100);
        });

        // Handle keyboard 'Enter' press
        sidebarInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                clearTimeout(inputTimeout);
                popupInput.value = sidebarInput.value;
                popupInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
            }
        });

        // ntercept mouse clicks
        document.body.addEventListener('mousedown', (event) => {
            const autocompleteOption = event.target.closest('.mat-mdc-option');
            if (!autocompleteOption) {
                return;
            }

            const parentPanel = autocompleteOption.closest('.mat-mdc-autocomplete-panel');
            if (!parentPanel) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            popupInput.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                bubbles: true,
                cancelable: true
            }));

            setTimeout(() => {
                if (popupInput && sidebarInput) {
                   sidebarInput.value = popupInput.value;
                }
            }, 100);

        }, true);

        setupComplete = true;
        return true;
    }

    // --- Fix for Windowed Mode ---
    const processedForEnabling = new WeakSet();

    function enableAndWatchInputs() {
        document.querySelectorAll('input[placeholder="Search for items..."]').forEach(input => {
            if (processedForEnabling.has(input)) return;

            const parentFormField = input.closest('.mat-mdc-form-field');
            
            const forceEnable = () => {
                if (input.hasAttribute('disabled')) {
                    input.removeAttribute('disabled');
                }
                if (parentFormField && parentFormField.classList.contains('mat-form-field-disabled')) {
                    parentFormField.classList.remove('mat-form-field-disabled');
                }
            };
            
            forceEnable();

            const observer = new MutationObserver(forceEnable);
            observer.observe(input, { attributes: true, attributeFilter: ['disabled'] });
            if (parentFormField) {
                observer.observe(parentFormField, { attributes: true, attributeFilter: ['class'] });
            }

            processedForEnabling.add(input);
        });
    }

    // --- Initialization Logic ---
    function main() {
        function trySetup() {
            if (setupSearchFix()) return;
            setTimeout(trySetup, 500);
        }
        trySetup();
        
        // windowed-mode fix
        enableAndWatchInputs();
        
        
        const masterObserver = new MutationObserver(enableAndWatchInputs);
        masterObserver.observe(document.body, { childList: true, subtree: true });
    }

    // This check ensures the script only runs after the page is ready.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();