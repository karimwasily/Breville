// Animated placeholder for input box
const setActive = (el, active) => {
    const formField = el.parentNode.parentNode;
    const formFieldActive = 'cmp-form__myaccount-form-field--is-active';
    const formFieldFilled = 'cmp-form__myaccount-form-field--is-filled';
    `${(active ? formField.classList.add(formFieldActive) :
        formField.classList.remove(formFieldActive))}`;
    `${(el.value.length == 0 ? formField.classList.remove(formFieldFilled) :
        formField.classList.add(formFieldFilled))}`;
}
document
    .querySelectorAll(
        '.cmp-form__myaccount-form-field__input, .cmp-form__myaccount-form-field__textarea'
    )
    .forEach(elem => {
        elem.addEventListener('blur', () => setActive(elem, false))
        elem.addEventListener('focus', () => setActive(elem, true))
    })