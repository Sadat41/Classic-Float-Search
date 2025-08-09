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

        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'disabled' && 
                    sidebarInput.hasAttribute('disabled')) {
                    sidebarInput.removeAttribute('disabled');
                }
            });
        });
        observer.observe(sidebarInput, { 
            attributes: true, 
            attributeFilter: ['disabled'] 
        });

        
        sidebarInput.removeAttribute('disabled');


        
        let inputTimeout;
        sidebarInput.addEventListener('input', (e) => {
            clearTimeout(inputTimeout);
            inputTimeout = setTimeout(() => {
                if (popupInput.value !== e.target.value) {
                    popupInput.value = e.target.value;
                    popupInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }, 100); // 100ms throttle
        });

        
        sidebarInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                clearTimeout(inputTimeout);
                popupInput.value = sidebarInput.value;
                popupInput.dispatchEvent(new KeyboardEvent('keydown', { 
                    key: 'Enter', 
                    code: 'Enter', 
                    bubbles: true 
                }));
            }
        });

       
        document.addEventListener('click', (event) => {
            if (event.target.closest('.mat-mdc-option')) {
                setTimeout(() => sidebarInput.value = popupInput.value, 50);
            }
        }, { passive: true });

        setupComplete = true;
        return true;
    }

   
    function trySetup() {
        if (setupSearchFix()) return;
        setTimeout(trySetup, 500); 
    }

    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trySetup);
    } else {
        trySetup();
    }
})();