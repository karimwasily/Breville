/**
 * handle signup modal open/close
 */
import {checkCookie, setCookieValue} from 'xps-utils/cookie';
/**
 * initialisation
 */
function init() {
    // select button to open signup modal
    const btnModalOpen = document.querySelector('#signup-modal-btn');
    // select button to close signup modal
    const btnModalClose = document.querySelector('.cmp-form-container--signup .button .cmp-button');
    // select signup modal
    const signUpModal = document.querySelector('.cmp-form-container--signup');
    const cookieValue = checkCookie('modalClosed');
    // check if modal has been closed before
    if(signUpModal){
        if(cookieValue){
            signUpModal.style.display='none';
        }else{
            signUpModal.style.display='block';
        }
    }
    if(btnModalOpen && btnModalClose){
        // listen for click
        btnModalOpen.addEventListener('click', (event) => {
            signUpModal.style.display='block';
            event.preventDefault();
        });
        // listen for click
        btnModalClose.addEventListener('click', (event) => {
            signUpModal.style.display='none';
            //setting cookie to know that user have closed modal
            setCookieValue('modalClosed',true,3600*24*365*10);
            event.preventDefault();
        });
    }
}
/**
 * when page is ready
 */
document.addEventListener("DOMContentLoaded", init);
