import React from 'react';
import { useSelector } from 'react-redux';
import { selectBillingAddress } from 'library/store/cart/selector';
import { selectActivePayment, selectCardInfo, selectMaskedCardDetails } from 'library/store/payment/selector';

export const BeanzPayment = () => {
  const { streetName, streetNumber, additionalStreetInfo, city, region, postalCode, state, country, phone } = useSelector ( selectBillingAddress );
  const activePayment = useSelector ( selectActivePayment );
  const { brand } = useSelector ( selectCardInfo );
  const { maskedCardNumber, expiryMonth, expiryYear, cardType } = useSelector ( selectMaskedCardDetails );
  const brandName = {
    visa: 'VISA',
    mc: 'MASTER CARD',
    amex: 'AMERICAN EXPRESS',
    jcb: 'JCB'
  };

  return (
    <section className='cmp-beanz-payment'>
      <h3 className='cmp-beanz-payment__title'>Beanz Payment</h3>
      <hr className='cmp-beanz-payment__line-separator' />
      <h4 className='cmp-beanz-payment__subtitle'>Billing Address</h4>
      <p className='cmp-beanz-payment__paragraph'>
        { streetName && <span>{ streetName }, </span> }
        { streetNumber && <span>{ streetNumber }, </span> }
        { additionalStreetInfo && <span>{ additionalStreetInfo }, </span> }
        { city && <span>{ city }, </span> }
        { region && <span>{ region }, </span> }
        { postalCode && <span>{ postalCode }, </span> }
        { state && <span>{ state }, </span> }
      </p>
      { country && <p className='cmp-beanz-payment__paragraph'>{ country },</p> }
      { phone && <p className='cmp-beanz-payment__paragraph'>{ phone }</p> }
      <h4 className='cmp-beanz-payment__subtitle'>Payment Method</h4>
      { activePayment === 'Credit Card' &&
      <div>
        <p className='cmp-beanz-payment__paragraph'>{ brandName[cardType] }</p>
        <p className='cmp-beanz-payment__paragraph'>{ maskedCardNumber.replaceAll( 'X', '*' ) }</p>
        <p className='cmp-beanz-payment__paragraph'>{ ( `0${ expiryMonth }` ).slice( -2 ) }/{ expiryYear }</p>
      </div>
     }
    </section>
  );

};

export default BeanzPayment;