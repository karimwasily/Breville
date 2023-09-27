import React from 'react';
import { func, bool } from 'prop-types';
import { Button } from 'xps-react/core';
import { useTranslation } from 'react-i18next';

export const Footer = ( { handleSubmit, submitDisabled = true } ) => {
  const { t } = useTranslation();

  return (
    <div className='coffee-conf-footer'>
      <div className='coffee-conf-footer__inner'>
        <div className='coffee-conf-footer__content'>
          <h5 className='coffee-conf-footer__title'>Beanz Offer Details</h5>
          <p className='coffee-conf-footer__desc'>
            You are commiting to 12 bags of coffee, from the roasters of your choice. When your trial subscription ends, a regular Beanz subscription will begin. You may change your delivery settings at anytime.
          </p>
        </div>
        <div className='coffee-conf-footer__links'>
          <Button
            size='large'
            onClick={ handleSubmit }
            textType='bold'
            colorScheme={ `${ submitDisabled ? '' : 'green' }` }
            className='coffee-conf-footer__submit'
            disabled={ submitDisabled }
          >{ t( 'br-next' ) }</Button>

          { /* // todo: href link required */ }
          <a href='#' className='coffee-conf-footer__skip'>
            I just want to get the machine, skip the 20% off Beanz and free gifts.
          </a>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  handleSubmit: func,
  submitDisabled: bool
};
