import React from 'react';
import { ProductPromoCard } from 'shared-ui/product-promo-card';
import PropTypes from 'prop-types';
// import './index.scss';

// NOTE: this content needs to be authorable
const contentMap = {
  BSK: {
    descriptionList: [
      'Bodum Dual wall Expresso',
      'Coffe cake',
      'Knock Box Mini',
      'Beans Canister'
    ]
  },
  DA: {
    subTitle: 'Digital Item',
    description: 'You will receive a redeemable training voucher in your email'
  }
};

const FreeBundle = ( { title, giftItems = [], productList = {} } ) => {

  function FreeBundle() {

    return giftItems.map( ( each )=>{
      const { name, price, variant: { images = [], attributesRaw: { productType } = {} } = {} } = productList[each] || {};
      const priceValue = price !== 'FREE' ? `(${ price } value)` : '';
      const content = contentMap[productType] || {};
      return (
        <ProductPromoCard
          key={ each }
          title={ name }
          thumbnail={ images[0]?.url }
          imageAlt={ name }
          promoSummary={ `With bundle purchase ${ priceValue }` }
          { ...content }
        />
      );
    } );
  }
  return (
    <div className='free-bundle'>
      <p className='mt-20 free-bundle__title'>{ title }</p>
      <FreeBundle />
    </div>
  );
};

FreeBundle.propTypes = {
  title: PropTypes.string.isRequired
};

export default FreeBundle;
