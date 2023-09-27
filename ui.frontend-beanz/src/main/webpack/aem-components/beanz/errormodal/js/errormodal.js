export function showErrorModal(showErrorModal) {
    const errorModalCloseIcons = document.querySelector(".errormodal_dialog-close");
    const errorModalOkBtn = document.querySelector(".errormodal_cart-modal-button");
    const errorModal = document.querySelector(".error_modal");
    if (errorModal && errorModalOkBtn && errorModalCloseIcons) {
        errorModalCloseIcons.addEventListener('click', (e) => {
            e.preventDefault();
            errorModal.classList.add('hidden');
            document.querySelector(".spinner__dialog").classList.add('hidden');
        });
        errorModalOkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            errorModal.classList.add('hidden');
            document.querySelector(".spinner__dialog").classList.add('hidden');
        });
    }
    const errorClass = document.querySelector(showErrorModal);
    if (errorClass) {
        errorClass.classList.remove('hidden');
    }
}