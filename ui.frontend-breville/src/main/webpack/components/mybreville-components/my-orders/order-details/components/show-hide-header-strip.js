import React from 'react';
import { useTranslation } from 'react-i18next';

function ShowHideHeaderStrip( { handleShowHideClick, showSummary, grandTotal, isSubscription } ) {

  const { t } = useTranslation();

  return (
    <div className='order-details-summary__ribbon-show-hide'>
      <div className='ribbon__link-show-hide'>
        <a href={ void ( 0 ) } onClick={ handleShowHideClick }>
          <span>{ !showSummary ? t( 'eh-order-details-view-details' ) : t( 'eh-order-details-hide-details' ) }</span>
          <span className={ !showSummary ? 'ribbon__icon-show' : 'ribbon__icon-hide' } />
        </a>
      </div>
      <div className='ribbon__order-total'>
        { isSubscription ?
          <span>{ t( 'eh-text-subscription-total' ) }: <strong>{ t( 'eh-order-details-symbol-currency' ) }{ grandTotal }</strong></span> :
          <span>{ t( 'eh-order-details-heading-order-total' ) }: <strong>{ t( 'eh-order-details-symbol-currency' ) }{ grandTotal }</strong></span> }
      </div>
    </div>
  );
}

export default ShowHideHeaderStrip;
