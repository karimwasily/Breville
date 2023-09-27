function init() {
    const promoCloseButton = document.querySelector('.cmp-container--promo .cmp-button');
    if(promoCloseButton) {
        promoCloseButton.addEventListener('click', event => {
            const promo = document.querySelector('.cmp-container--promo');
            promo.style.display = 'none';
        });
    }
}
document.addEventListener("DOMContentLoaded", init);