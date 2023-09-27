import React from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'prop-types';

function ShowHideShipping( { order, shippingAddress } ) {

  const {
    name,
    addressline1,
    city,
    country,
    postalcode,
    phone
  } = shippingAddress || {};

  const {
    ShippingContactName: orderName,
    ShippingStreet: orderAddress1,
    ShippingCity: orderCity,
    ShippingStateCode: orderStateCode,
    ShippingPostalCode: orderPostalCode,
    ShippingCountry: orderCountry,
    ShippingMethod: orderShippingMethod
  } = order || {};


  const { t } = useTranslation();

  return (
    <div className='order-details-summary__row-summary'>
      <p className='order-details-summary__col-heading'>{ t( 'eh-order-details-heading-shipping' ) }</p>
      <div className={ `order-details-summary__col-summary ${ shippingAddress ? 'subscription-details' : '' }` }>
        <div>
          <p className='order-details-summary__col-subheading'>{ t( 'eh-order-details-heading-shipping-address' ) }</p>
          <p className='order-details-summary__col-text'>
            { order ? `${ orderName }` : `${ name }` }, { order ? `${ orderAddress1 }` : `${ addressline1 }` },
          </p>
          <p className='order-details-summary__col-text'>
            { order ? `${ orderCity }` : `${ city }` }, { order ? `${ orderStateCode }` : `${ '' }` } { order ? `${ orderPostalCode }` : `${ postalcode }` },
          </p>
          <p className='order-details-summary__col-text'>
            { order ? `${ orderCountry }` : `${ country }` },
          </p>
          { shippingAddress ?
            <p className='order-details-summary__col-text'>
              { phone }
            </p> : '' }
        </div>
        <div>
          { order &&
            <div>
              <p className='order-details-summary__col-subheading'>{ t( 'eh-order-details-heading-shipping-method' ) }</p>
              <p className='order-details-summary__col-text'>{ orderShippingMethod }</p>
            </div>
           }
        </div>
      </div>
    </div>
  );
}
ShowHideShipping.prototype = {
  order: object,
  shippingAddress: object
};

export default ShowHideShipping;


