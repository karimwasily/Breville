import { useAuth0 } from '@auth0/auth0-react';

export const AuthLogin = () => {
  const { isAuthenticated } = useAuth0();

  if ( isAuthenticated ) {
    const isCreateCustomerServiceCalled = localStorage.getItem( 'createCustomServiceCalled' );
    if ( !isCreateCustomerServiceCalled ) {
      const localStore = Object.entries( localStorage );
      localStore.forEach( function ( val, i ) {
        if ( val[0].includes( 'auth0spa' ) ) {
          const authToken = ( JSON.parse( val[1] ).body.id_token );
          localStorage.setItem( 'access_token', authToken );
          localStorage.setItem( 'createCustomServiceCalled', true );
          localStorage.setItem( 'userWelcomed', true );
        }
      } );
    }
  }
  return null;
};