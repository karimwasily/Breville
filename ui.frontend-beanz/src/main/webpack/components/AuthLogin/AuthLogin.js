import { useAuth0 } from '@auth0/auth0-react';
import { checkCookie } from 'xps-utils/cookie';
import { useDispatch } from 'react-redux';
import { mergeCart } from 'library/store/cart/actions';
import { setAuthData } from 'xps-utils/authtokendatahandler';

export const AuthLogin = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const allLoginButton = document.querySelectorAll( '.auth-login-button' );
  const logoutButton = document.querySelector( '.auth-logout' );
  const orderConfirmationMybeanz = document.querySelector( '.orderConfirmation-mybeanz' );
  const messages = document.querySelector( '.messages .message-popup' );
  const messageShow = document.querySelector( '.messages .message-popup .message-popup_text' );
  const logedInMessage = document.querySelector( '.messages .logedInMessage' );
  if ( allLoginButton ) {
    allLoginButton.forEach( ( loginButton ) => {
      if ( loginButton ) {
        loginButton.addEventListener( 'click', ( e ) => {
          loginWithRedirect({
            appState: { target: window.location.href }
          });
        } );
         if ( checkCookie( 'auth0.is.authenticated' ) == true ) {
          localStorage.setItem( 'userWelcomed', 'true' );
          loginButton.parentElement.classList.add( 'hidden' );
          logoutButton.parentElement.classList.remove( 'hidden' );
          if ( orderConfirmationMybeanz ) {
            orderConfirmationMybeanz.parentElement.classList.remove( 'hidden' );
          }
        }
      }
    } );
  }
  if ( isAuthenticated ) {
    const isCreateCustomerServiceCalled = localStorage.getItem( 'createCustomServiceCalled' );
    if ( !isCreateCustomerServiceCalled ) {
      const localStore = Object.entries(localStorage);
      localStore.forEach(function (val, i) {
        if (val[0].includes('auth0spa')) {
          setAuthData();
          dispatch( mergeCart() );
        }
      });
    }
    const isLoginMessageDisplayed = localStorage.getItem( 'loginMessageDisplayed' );
    if ( !isLoginMessageDisplayed && logedInMessage && messageShow && messages ){
      localStorage.setItem( 'loginMessageDisplayed', true );
      messageShow.innerHTML = logedInMessage.innerHTML;
      messages.classList.remove( 'hidden' );
      setTimeout(function() {
        messages.classList.add( 'hidden' );
    }, 5000);
    }
  }
  return null;
};