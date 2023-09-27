import React from 'react';
import { node, func, string, number } from 'prop-types';
import { Button } from 'xps-react/core';
import { useTranslation } from 'react-i18next';

export const Layout = ( { machineName, discount, handleSubmit, children } ) => {
  const { t } = useTranslation();

  return (
    <main className='bundle-conf__container'>
      { /* header */ }
      <div className='bundle-conf__header'>
        <h2 className='bundle-conf__header-title'>
          Your Complete Coffee Bundle
        </h2>
        <Button
          onClick={ handleSubmit }
          className='bundle-conf__header-add-btn'
          colorScheme='green'
          textType='bold'
        >
          { t( 'br-add-to-cart' ) }
        </Button>
      </div>

      { /* body */ }
      <div className='bundle-conf__content'>{ children }</div>

      { /* footer */ }
      <div className='bundle-conf__footer'>
        <div className='bundle-conf__footer-wrapper'>
          <div className='bundle-conf__footer-content'>
            <p className='bundle-conf__footer-info'>
              { machineName } + Beanz 3 Month Offer
            </p>
            <span className='bundle-conf__footer-badge'>{ discount }% off</span>
          </div>
          <Button
            onClick={ handleSubmit }
            colorScheme='green'
            textType='bold'
          >
            { t( 'br-add-to-cart' ) }
          </Button>
        </div>
      </div>
    </main>
  );
};

Layout.propTypes = {
  machineName: string,
  discount: number,
  handleSubmit: func,
  children: node
};
