import React from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'prop-types';

function ShowHidePayment( { order, billingAddress } ) {

  const {
    name,
    addressline1,
    city,
    country,
    postalcode,
    phone
  } = billingAddress || {};

  const {
    BillingContactName: orderName,
    BillingStreet: orderAddress1,
    BillingCity: orderCity,
    BillingStateCode: orderStateCode,
    BillingPostalCode: orderPostalCode,
    BillingCountry: orderCountry,
    PaymentMethod: orderPaymentMethod
  } = order || {};

  const { t } = useTranslation();

  return (
    <div className='order-details-summary__row-summary'>
      <p className='order-details-summary__col-heading'>{ t( 'eh-order-details-heading-payment' ) }</p>
      <div className={ `order-details-summary__col-summary ${ billingAddress ? 'subscription-details' : '' }` }>
        <div>
          <p className='order-details-summary__col-subheading'>{ t( 'eh-order-details-heading-billing-address' ) }</p>
          <p className='order-details-summary__col-text'>
            { order ? `${ orderName }` : `${ name }` }, { order ? `${ orderAddress1 }` : `${ addressline1 }` },
          </p>
          <p className='order-details-summary__col-text'>
            { order ? `${ orderCity }` : `${ city }` }, { order ? `${ orderStateCode }` : `${ '' }` } { order ? `${ orderPostalCode }` : `${ postalcode }` },
          </p>
          <p className='order-details-summary__col-text'>
            { order ? `${ orderCountry }` : `${ country }` },
          </p>
          { billingAddress ?
            <p className='order-details-summary__col-text'>
              { phone }
            </p> : '' }
        </div>
        <div>
          { order &&
            <div>
              <p className='order-details-summary__col-subheading'>{ t( 'eh-order-details-heading-payment-method' ) }</p>
              <p className='order-details-summary__col-text'>{ orderPaymentMethod }</p>
            </div> }
        </div>
      </div>
    </div>
  );
}
ShowHidePayment.prototype = {
  order: object,
  billingAddress: object
};

export default ShowHidePayment;
