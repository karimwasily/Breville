import React from 'react';
import { Button } from 'xps-react/core';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';

const GetSupportNonLoggedInUser = () => {
  const { t } = useTranslation();
  const { loginWithRedirect } = useAuth0();

  function handleClick() {
    loginWithRedirect();
  }

  return (
    <div className='get-support'>
      <h2 className='get-support__header'>
        { t( 'eh-support-get-support-for-your-products' ) }
      </h2>
      <p className='get-support__para'>
        { t( 'eh-support-log-in-para' ) }
      </p>
      <div className='get-support__button-wrapper'>
        <Button
          className='get-support__button-login'
          size='medium'
          colorScheme='purpleFill'
          textType='bold'
          onClick={ handleClick }
        >
          { t( 'eh-support-button-log-in' ) }
        </Button>
        <Button
          className='get-support__button-view-product'
          size='medium'
          colorScheme='purple'
          textType='bold'
        >
          { t( 'eh-support-button-view-product' ) }
        </Button>
      </div>
    </div>
  );
};

export default GetSupportNonLoggedInUser;