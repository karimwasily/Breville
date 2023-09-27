import React from 'react';

function getChildPrice( child = [], lineItems ){
  if ( !child.length ) return null;
  return child.map( ( each )=>{
    const current = lineItems[each];
    const { name, totalPrice } = current;
    return (
      <div key={ each } className='display-flex mt-5'>
        <span className='cmp-cart-order-summary__bundle-item'>{ name }</span>
        <span className='cmp-cart-order-summary__price ml-auto'>{ totalPrice }</span>
      </div>
    );
  } );
}

function PriceSection( { data, childLineItems } ) {
  const { name, totalPrice, isBundle, standard = [], subscription = [], giftItems = [] } = data;
  return (
    <>
      <div className='display-flex mt-20'>
        <span className='cmp-cart-order-summary__subtitle pr-5'>{ name }</span>
        { !isBundle && <span className='cmp-cart-order-summary__price ml-auto'>{ totalPrice }</span> }
      </div>
      { isBundle && <div className='mt-15'>
          { getChildPrice( [...standard, ...subscription, ...giftItems], childLineItems ) }
        </div> }
      { Boolean( subscription.length ) && <div className='cmp-cart-order-summary__notice'>
        Your credit card will be charged separately for each Beanz order.<br /><br />
        (Roasting/shipping times varies by roaster).
      </div>
      }
    </>
  );
}

export {
  getChildPrice,
  PriceSection
};
