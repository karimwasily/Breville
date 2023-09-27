import React from 'react';
import { useSelector } from 'react-redux';
import { selectShippingAddress, selectShippingInfo } from 'library/store/cart/selector';

export const Shipping = () => {

  const { streetName, streetNumber, additionalStreetInfo, city, region, postalCode, state, country, phone } = useSelector( selectShippingAddress );
  const { shippingMethod } = useSelector ( selectShippingInfo );
  const { name, localizedDescription } = shippingMethod;

  return (
    <section className='cmp-shipping'>
      <h3 className='cmp-shipping__title'>Shipping</h3>
      <hr className='cmp-shipping__line-separator' />
      <h4 className='cmp-shipping__subtitle'>Shipping Address</h4>
      <p className='cmp-shipping__paragraph'>
        { streetName && <span>{ streetName }, </span> }
        { streetNumber && <span>{ streetNumber }, </span> }
        { additionalStreetInfo && <span>{ additionalStreetInfo }, </span> }
        { city && <span>{ city }, </span> }
        { region && <span>{ region }, </span> }
        { postalCode && <span>{ postalCode }, </span> }
        { state && <span>{ state }, </span> }
      </p>
      { country && <p className='cmp-shipping__paragraph'>{ country },</p> }
      { phone && <p className='cmp-shipping__paragraph'>{ phone }</p> }
      <h4 className='cmp-shipping__subtitle'>Shipping Method</h4>
      <p className='cmp-shipping__paragraph'>{ name }</p>
      <p className='cmp-shipping__paragraph'>{ localizedDescription }</p>
    </section>
  );

};

export default Shipping;