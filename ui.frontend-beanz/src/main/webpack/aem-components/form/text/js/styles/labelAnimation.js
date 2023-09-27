function init() {
    const element = document.querySelector('.cmp-form-text--beanz-signup .cmp-form-text .cmp-form-text__text');

    // if element exists on page
    if (element) {
        element.addEventListener('focus', () => {
            element.parentElement.classList.add('is-completed');
        });
        element.addEventListener('focusout', (event) => {
            event.target.value === "" && element.parentElement.classList.remove('is-completed');
        });
    }
}
document.addEventListener("DOMContentLoaded", init);
