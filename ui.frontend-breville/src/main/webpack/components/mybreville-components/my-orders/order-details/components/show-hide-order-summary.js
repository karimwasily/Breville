import React from 'react';
import { useTranslation } from 'react-i18next';

function ShowHideOrderSummary( { shippingAmount, grandTotal, totalPrice, totalTax } ) {

  const { t } = useTranslation();

  return (
    <div className='order-details-summary__row-summary'>
      <p className='order-details-summary__col-heading'>{ t( 'eh-order-details-heading-order-summary' ) }</p>
      <div className='order-details-summary__col-summary col-summary-totals'>
        <div>
          <div className='order-details-summary__row-totals'>
            <div className='order-details-summary__totals-label'>
              <p className='order-details-summary__col-text'>{ t( 'eh-order-details-label-subtotal' ) }:</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className='order-details-summary__totals-item'>
              <p className='order-details-summary__col-text'><strong>{ t( 'eh-order-details-symbol-currency' ) }{ totalPrice }</strong></p>
            </div>
          </div>
        </div>
      </div>
      <div className='order-details-summary__col-summary col-summary-totals'>
        <div>
          <div className='order-details-summary__row-totals'>
            <div className='order-details-summary__totals-label'>
              <p className='order-details-summary__col-text'>{ t( 'eh-order-details-label-estimated-shipping' ) }:</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className='order-details-summary__totals-item'>
              <p className='order-details-summary__col-text'>{ (shippingAmount === 0 || typeof shippingAmount === 'undefined') ? t( 'eh-order-details-shipping-free' ) : `t('eh-order-details-symbol-currency')${ shippingAmount }` }</p>
            </div>
          </div>
        </div>
      </div>
      <div className='order-details-summary__col-summary col-summary-totals tax-border-bottom'>
        <div>
          <div className='order-details-summary__row-totals'>
            <div className='order-details-summary__totals-label'>
              <p className='order-details-summary__col-text'>{ t( 'eh-order-details-label-sales-tax' ) }:</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className='order-details-summary__totals-item'>
              <p className='order-details-summary__col-text'>{ t( 'eh-order-details-symbol-currency' ) }{ totalTax }</p>
            </div>
          </div>
        </div>
      </div>
      <div className='order-details-summary__col-summary col-summary-totals'>
        <div>
          <div className='order-details-summary__row-totals grand-total'>
            <div className='order-details-summary__grandtotal-label'>
              <p className='grand-total-label'>{ t( 'eh-order-details-heading-order-total' ) }:</p>
            </div>
          </div>
        </div>
        <div>
          <div className='order-details-summary__row-totals grand-total'>
            <div className='order-details-summary__totals-item'>
              <p className='grand-total-label'>{ t( 'eh-order-details-symbol-currency' ) }{ grandTotal }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowHideOrderSummary;
