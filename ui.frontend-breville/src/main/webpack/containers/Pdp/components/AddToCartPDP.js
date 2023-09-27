import React, { useCallback, useState } from 'react';
import { arrayOf, func, number, object, shape, string } from 'prop-types';
import { Button } from 'xps-react/core';
import { useSelector } from 'react-redux';
import { selectProductVariantAvailability } from 'library/store/product/selector';
import { QuantityPDP } from './QuantityPDP';
import { AddToCartModal } from 'containers/Pdp/components/AddToCartModal/AddToCartModal';
import { NotifyMeButton } from '../NotifyMe/NotifyMeButton';
import classNames from 'classnames';
import { AddToCartStickyHeader } from 'containers/Pdp/components/AddToCartStickyHeader/AddToCartStickyHeader';

const MIN_QUANTITY = 1;

export const AddToCartPDP = ( { aemData, warrantyObject, showStickyHeader = false } ) => {
  const [quantity, setQuantity] = useState( MIN_QUANTITY );
  const [showAddToCartModal, setShowAddToCartModal] = useState( false );

  const [wrapperHeight, setWrapperHeight] = useState( 0 );
  const wrapperRef = useCallback( ( node ) => {
    if ( node ) {
      setWrapperHeight( node.getBoundingClientRect().height );
    }
  }, [] );

  const availability = useSelector( selectProductVariantAvailability );

  function toggleAddToCartModal() {
    return setShowAddToCartModal( ( state ) => !state );
  }

  function addToCart() {
    toggleAddToCartModal();
  }

  if ( availability === null ) return null;

  const wrapperClassName = classNames(
    'cmp-primary-product--machine-detail__notify',
    'primary-product-container__controls',
    { 'cmp-primary-product--machine-detail--sticky': showStickyHeader }
  );

  return (
    <>
      <div className={ wrapperClassName } ref={ wrapperRef }>
        { showStickyHeader && <AddToCartStickyHeader /> }
        { ( availability?.isOnStock && availability?.availableQuantity > 0 ) ? (
          <>
            <QuantityPDP quantity={ quantity } setQuantity={ setQuantity } minQuantity={ MIN_QUANTITY } isOnStock={ availability?.isOnStock } availableQuantity={ availability?.availableQuantity } />
            <Button onClick={ addToCart } className='cmp-button--cart' size='medium'>Add To Cart</Button>
          </>
          ) : (
            <>
              <Button disabled className='cmp-button--sold-out'>Sold out</Button>
              <NotifyMeButton aemData={ aemData } />
            </>
          ) }
        { showAddToCartModal &&
          <AddToCartModal
            category={ aemData.category }
            productBundle={ aemData.productBundle }
            keepShoppingLink={ aemData.keepShoppingLink }
            onClose={ toggleAddToCartModal }
            warrantyObject={ warrantyObject }
            quantity={ quantity }
          />
          }
      </div>
      { /* Placeholder for Add To Cart button to avoid layout shift */ }
      { showStickyHeader && <div style={{ height: `${ wrapperHeight }px` }} /> }
    </>
  );
};

AddToCartPDP.propTypes = {
  aemData: object,
  warrantyObject: shape( {
    warrantyData: arrayOf( shape( {
      id: string,
      name: string,
      centAmount: number,
      formattedPrice: string,
      sku: string,
      channel: string
    } ) ),
    selectedWarranty: string,
    setSelectedWarranty: func
  } )
};