window.onload = function () {
  const okButton = document.querySelector( '.message-popup_button' );
  const messagepopup = document.querySelector( '.message-popup' );
  if ( okButton && messagepopup ) {
    okButton.addEventListener( 'click', ( e ) => {
      e.preventDefault();
      messagepopup.classList.add( 'hidden' );
    } );
  }
};