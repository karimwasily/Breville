import { useAuth0 } from '@auth0/auth0-react';
import { checkCookie } from 'xps-utils/cookie';
export const Signup = () => {
  const {
    loginWithRedirect
  } = useAuth0();
  const allSignupbutton = document.querySelectorAll( '.auth-signup' );
  const logoutButton = document.querySelector( '.auth-logout' );
  if (allSignupbutton) {
  allSignupbutton.forEach(signupbutton => {
    if ( signupbutton ) {
        signupbutton.addEventListener( 'click', ( e ) => {
        loginWithRedirect( {
            initialScreen: 'signUp'
        } );
        } );
        if ( checkCookie( 'auth0.is.authenticated' ) == true ) {
        localStorage.setItem( 'userWelcomed', 'true' );
        signupbutton.parentElement.classList.add( 'hidden' );
        logoutButton.parentElement.classList.remove( 'hidden' );
        }
    }
    });
  }
  return null;
};