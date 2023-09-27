import React, { useState } from 'react';
import { array, number } from 'prop-types';
import SubscriptionProductTiles from './subscription-product-tiles';

const SubscriptionProduct = ( { data, tileCount } ) => {

  const [subscriptionData, setSubscriptionData] = useState( data );

  if ( subscriptionData?.length > tileCount ) {
    setSubscriptionData( subscriptionData.slice( 0, tileCount ) );
  }

  return (
    <div className= 'subscription-product' >
      <div className='subscription-product__tiles'>
        { Array.isArray( subscriptionData ) && !!subscriptionData.length && subscriptionData.map( ( item )=>
          <SubscriptionProductTiles item={ item } key={ item.standingorderid } />
        ) }
      </div>
    </div>
  );
};

SubscriptionProduct.defaultProps = {
  data: [],
  tileCount: 2
};

SubscriptionProduct.propTypes = {
  data: array,
  tileCount: number
};

export default SubscriptionProduct;