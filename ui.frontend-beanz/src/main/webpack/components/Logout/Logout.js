import { useAuth0 } from '@auth0/auth0-react';
import { checkCookie } from 'xps-utils/cookie';
export const Logout = () => {
  const { logout } = useAuth0();
  const loginButton = document.querySelector( '.auth-login-button' );
  const allLogoutButton = document.querySelectorAll( '.auth-logout,.orderConfirmation-mybeanz' );
  const messages = document.querySelector( '.messages .message-popup' );
  const logedOutMessage = document.querySelector( '.messages .logedOutMessage' );
  const messageShow = document.querySelector( '.messages .message-popup .message-popup_text' );
  if ( allLogoutButton ) {
    allLogoutButton.forEach( ( logoutButton ) => {
      logoutButton.addEventListener( 'click', ( e ) => {
        localStorage.clear();
        localStorage.setItem( 'logoutEvent', true );
        logout( {
          returnTo: window.location.href
        } );
      } );
       if ( checkCookie( 'auth0.is.authenticated' ) !== true ) {
        localStorage.setItem( 'userWelcomed', 'false' );
        loginButton.parentElement.classList.remove( 'hidden' );
        logoutButton.parentElement.classList.add( 'hidden' );
        const logoutEvent = localStorage.getItem( 'logoutEvent' );
        if (logoutEvent && logedOutMessage && logedOutMessage && messages ){
          messageShow.innerHTML = logedOutMessage.innerHTML;
          messages.classList.remove( 'hidden' );
          setTimeout(function() {
            messages.classList.add( 'hidden' );
        }, 5000);
        localStorage.setItem( 'logoutEvent', false );
        }
      }
    } );
  }
  return null;
};
