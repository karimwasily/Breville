jQuery(function ($) {
    "use strict";
    let visible = false;
    let clickElement;

    function focusTrap() {
        const  focusableElements =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = document.querySelector('#bb-modal'); // select the modal by it's id

        const focusableContent = modal.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0]; // get first element to be focused inside modal
        const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal


        document.addEventListener('keydown', function(e) {
            const isTabPressed = e.key === 'Tab' || e.code === 9;

            if (!isTabPressed) {
                return;
            }

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
        });
        firstFocusableElement.focus();
    }

    function showModal(e, elem) {
        e.preventDefault();
        const xfUrl = elem.data('modal-url') + '.content.html';
        if (visible || !xfUrl) {
            return;
        }
        const showModalEvt = new Event('bb-modal-show');
        const body = document.querySelector('body');
        $.get(xfUrl, function (data) {
            const modal = $('<div id="bb-modal" role="dialog" />');
            $('body').append(modal.append(data));
            $('body').addClass('modal-overflow-hidden');
            $('body').append('<div class="modal-backdrop"></div>');

            const modalBtnClose = `
                <div class="modal-button__close">
                    <button type="button" class="modal-button__close--icon js-close" aria-label="close"></button>
                </div>`;
            $('.cmp-layout-container--modal').append(modalBtnClose);

            const modalFullBtnClose = `
                <div class="modal-full-button__close">
                    <button type="button" class="modal-button__close--icon js-close" aria-label="close"></button>
                </div>`;
            $('.cmp-layout-container--modal-full').append(modalFullBtnClose);
            $('.cmp-layout-container--modal-full').attr('tabindex', '-1');

            modal.fadeIn(300, function () {
                visible = true;
            });
            visible = true;
            focusTrap();
            $('.cmp-layout-container--modal-full').focus();
            body.dispatchEvent(showModalEvt);
        });
        return false;
    }

    function hideModal(e) {
        const modal = $('#bb-modal');
        const body = document.querySelector('body');
        const hideModalEvt = new Event('bb-modal-hide');
        if ($(e.target).closest('#bb-modal').length > 0 && !e.target.classList.contains('js-close')) {
            return false;
        }
        if (visible && modal) {
            e.preventDefault();
            modal.fadeOut(200, function () {
                modal.remove();
                visible = false;
                $(".modal-backdrop").remove();
                $('body').removeClass('modal-overflow-hidden');
            });
            body.dispatchEvent(hideModalEvt);
            clickElement.focus();
            return false;
        }
    }

    $('body').on('click', '[data-modal-url]', function(e) {
        clickElement = $(this);
        showModal(e, clickElement);
    });

    $(document).on('click', hideModal).on('keydown', function (e) {
        if (e.key == "Escape") {
            hideModal(e);
        }
    });
    $('body').on('click', '.js-close', hideModal);

});
