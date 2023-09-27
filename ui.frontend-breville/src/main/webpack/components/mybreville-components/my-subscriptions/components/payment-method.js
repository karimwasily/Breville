import React from 'react';
import { useTranslation } from 'react-i18next';
import { string } from 'prop-types';

function PaymentMethod( { paymentMethod, creditCardNumber, expiryDate } ) {

  const { t } = useTranslation();

  return (
    <div className='billing-payment'>
      <div>
        <p className='order-details-summary__col-subheading'>{ t( 'eh-order-details-heading-payment-method' ) }</p>
        <p className='order-details-summary__col-text'>{ paymentMethod }</p>
      </div>
      <div>
        <p className='order-details-summary__col-text'>{ creditCardNumber }</p>
      </div>
      <div>
        <p className='order-details-summary__col-text'>{ expiryDate }</p>
      </div>
    </div>
  );
}

PaymentMethod.prototype = {
  paymentMethod: string,
  creditCardNumber: string,
  expiryDate: string
};

export default PaymentMethod;
