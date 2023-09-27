import React from 'react';
import { object, bool } from 'prop-types';
import { useTranslation } from 'react-i18next';

const ItemDetails = ( { item, isCoffee } ) => {
  const { t } = useTranslation();

  let name = item?.ItemDescription;
  if ( item?.IsSubscriptionItem && isCoffee ) {
    name = `${ t( 'eh-order-details-label-beanz-trial' ) } ${ t( 'eh-text-subscription' ) }`;
  }
  else if ( item?.IsSubscriptionItem ) {
    name = `${ name } ${ t( 'eh-text-subscription' ) }`;
  }

  return (
    <div className='shipment-details'>
      <div className={ 'shipment-container' }>
        <div className={ 'shipment-detail' }>
          <img className={ 'shipment-item-image' } src={ item?.Meta?.orderImages } alt={ item?.ItemDescription }></img>
          <div className='shipment-text-model-container'>
            <span className='shipment-item-name'> { name } </span>
            { !isCoffee &&
              <span className='shipment-text-model-1'>
                <span>{ t( 'eh-order-details-shipment-details-model' ) }:</span> <span>{ item?.ProductNumber }</span>
              </span>
            }
            { ( isCoffee && item?.IsSubscriptionItem ) &&
              <span className='shipment-text-model-2'>{ `${ item?.VendorName || '' } ${ item?.ItemDescription || '' }` }</span>
            }
            { ( item?.Meta?.orderItemGroupId === 'FG' ) && ( item?.Meta?.orderColorSwatch || item?.Meta?.orderColor ) && <span className='shipment-text-model-2'>
              { item?.Meta?.orderColorSwatch && <img className={ 'swatch-image' } src={ item?.Meta?.orderColorSwatch } alt={ item?.Meta?.orderColor }></img> }
              <span>{ item?.Meta?.orderColor || '' }</span>
            </span> }
          </div>
        </div>
        <div className='shipment-quantity'>
          <span>{ t( 'eh-order-details-shipment-details-qty' ) }:</span><span className='quantity-text'>{ item?.Quantity }</span>
        </div>
        <div className='shipment-total-price'>
          <span className='label-font-weight-bold'>{ t( 'eh-order-details-symbol-currency' ) }{ item?.TotalPrice?.toFixed( 2 ) }</span>
        </div>
      </div>
    </div>
  );
};

ItemDetails.propTypes = {
  item: object.isRequired,
  isCoffee: bool
};

export default ItemDetails;