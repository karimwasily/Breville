window.addEventListener('DOMContentLoaded', function() {
    const QUERY = {
        MODAL_WRAPPER : ".cmp-modal__wrapper",
        MODAL_WRAPPER_OPEN : 'cmp-modal__wrapper--open',
        MODAL : ".cmp-modal",
        MODAL_OPEN : "cmp-modal--open",
        MODAL_BUTTON : ".cmp-button",
        MODAL_CLOSE_BUTTON : "cmp-modal__close-button",
        MODAL_BACKDROP : ".cmp-modal__backdrop",
        DATA_MODAL_ID : "[data-modal-id]",
    };

    let visible = false;
    let clickElement;

    function focusTrap(modal) {
        const  focusableElements =
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)';
        const focusableContent = modal.querySelectorAll(focusableElements);
        console.log(focusableContent);

        if(focusableContent) {
            const firstFocusableElement = focusableContent[0]; // get first element to be focused inside modal
            const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Tab' || e.code === 9) {
                    if (e.shiftKey) { // if shift key pressed for shift + tab combination
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus(); // add focus for the last focusable element
                            e.preventDefault();
                        }
                    } else { // if tab key is pressed
                        if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                            firstFocusableElement.focus(); // add focus for the first focusable element
                            e.preventDefault();
                        }
                    }
                }
            });
            firstFocusableElement.focus();
        }
    }

    function hideModal(modal) {
        if(modal && visible) {
            const closeModalEvent = new Event('cmp-modal-close');
            visible = false;
            modal.textContent = '';
            modal.classList.remove(QUERY.MODAL_OPEN);
            modal.parentNode.classList.remove(QUERY.MODAL_WRAPPER_OPEN);
            document.body.style.overflow = 'unset';
            clickElement.focus();
            document.body.dispatchEvent(closeModalEvent);
        }
    }

    function showModal(modal, url) {
        const modalUrl = url + '.content.html';
        const openModalEvent = new Event('cmp-modal-open');

        if(!visible && modalUrl) {
            visible = true;
            const modalCloseButton = document.createElement("button");
            modalCloseButton.classList.add(QUERY.MODAL_CLOSE_BUTTON);
            modalCloseButton.ariaLabel = "Close button";
            const modalBackdrop = modal.parentNode.querySelector(QUERY.MODAL_BACKDROP);

            fetch(modalUrl).then(response => response.text()).then(data => {
                modal.insertAdjacentHTML('afterbegin', data);
                modal.appendChild(modalCloseButton);
                modal.classList.add(QUERY.MODAL_OPEN);
                modal.parentNode.classList.add(QUERY.MODAL_WRAPPER_OPEN);
                document.body.style.overflow = 'hidden';
                focusTrap(modal);
            });

            modalCloseButton.addEventListener('click', () => {
                hideModal(modal);
            });

            modalBackdrop.addEventListener('click', () => {
                hideModal(modal);
            });

            document.addEventListener('keydown',(e) => {
                if (e.key == "Escape") {
                    hideModal(modal);
                }
            });
            document.body.dispatchEvent(openModalEvent);
        }
    }    

    const buttons = document.querySelectorAll(QUERY.MODAL_BUTTON);

    if(buttons) {
        buttons.forEach(button => {
            if(button.dataset.modalId) {
                const buttonModalId = button.dataset.modalId;
                const modalUrl = button.dataset.modalUrl;
                const modal = document.getElementById(buttonModalId);

                if(modal) {
                    button.addEventListener('click', () => {
                        clickElement = button;
                        showModal(modal, modalUrl);
                    });
                }
            }
        });
    }
});
