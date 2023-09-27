import { arrayOf, func, array, shape, string, number } from 'prop-types';
import React, { useState } from 'react';
import { Image } from 'shared-ui/image';

import { useDispatch, useSelector } from 'react-redux';
import { selectProductName, selectProductVariantColor, selectProductVariantSKU, selectProductVariantPDPImage } from 'library/store/product/selector';
import { selectPurchasePageUrl } from 'library/store/global/selector';
import Button from 'shared-ui/button';
import Modal from 'react-modal';
import { CompleteBundle } from 'containers/Pdp/components/CompleteBundle/CompleteBundle';
import { MulberryWarranty } from 'containers/Pdp/components/MulberryWarranty/MulberryWarranty';
import { useTranslation } from 'react-i18next';
import { MulberryPreselect } from 'containers/Pdp/components/MulberryWarranty/MulberryPreselect';
import classNames from 'classnames';
import { setLineItemInCart } from 'library/store/product/actions';
import { usePageNavigation } from 'containers/Pdp/components/MulberryWarranty/usePageNavigation';

export const AddToCartModal = ( { category, productBundle, keepShoppingLink, onClose, warrantyObject, quantity } ) => {
  const isEspresso = category === 'espresso';
  const { selectedWarranty } = warrantyObject;
  const [warrantyPreselected] = useState( Boolean( selectedWarranty ) );
  const purchasePageUrl = useSelector( selectPurchasePageUrl );

  const productName = useSelector( selectProductName );
  const productVariantSKU = useSelector( selectProductVariantSKU );
  const variantColor = useSelector( selectProductVariantColor );
  const variantPDPImage = useSelector( selectProductVariantPDPImage );

  const { queuePageNavigation } = usePageNavigation( purchasePageUrl );
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const addItemToCart = () => {
    dispatch( setLineItemInCart( { sku: productVariantSKU, quantity, warrantySKU: selectedWarranty } ) );
  };

  function handleGoToCartPage() {
    addItemToCart();
    queuePageNavigation();
  }

  function handleOnClose() {
    addItemToCart();
    // Wait for event to be dispatched before closing the modal
    setTimeout( onClose, 100 );
  }

  return (
    <Modal isOpen onRequestClose={ handleOnClose } className='add-to-cart-modal-content' overlayClassName='add-to-cart-modal-overlay'>
      <div className='add-to-cart-modal__wrapper'>
        <h2 className='add-to-cart-modal__main-title'>{ productName } { t( 'pdp-addedToCart' ) }</h2>
        <div className={ classNames( 'add-to-cart-modal__info-wrapper', 'flex-center', { 'mulberry-preselected': warrantyPreselected } ) }>
          <div className='add-to-cart-modal__main-data'>
            <Image src={ variantPDPImage } alt={ productName } className='add-to-cart-modal__hero_image' />
            <div className='add-to-cart-modal__color_wrapper'>
              <p className='add-to-cart-modal__color-title'>{ variantColor.label }</p>
              <Image className='add-to-cart-modal__swatch' src={ variantColor.src } alt={ variantColor.label } />
            </div>
          </div>
          { !isEspresso && warrantyPreselected && <MulberryPreselect { ...warrantyObject } /> }
        </div>
        { !isEspresso && !warrantyPreselected && <MulberryWarranty { ...warrantyObject } /> }
        <div className='add-to-cart__btn-area'>
          <Button className='add-to-cart__action-btn'
            onClick={ handleOnClose }
            colorScheme='inverted'
            href={ keepShoppingLink }
            textType='bold'
          >
            { t( 'pdp-keepShopping' ) }
          </Button>
          <Button className='add-to-cart__action-btn'
            onClick={ handleGoToCartPage }
            colorScheme='green'
            textType='bold'
          >
            { t( 'pdp-goToCart' ) }
          </Button>
        </div>
        { isEspresso && <CompleteBundle productBundle={ productBundle } heroImgUrl={ variantPDPImage } /> }
      </div>
      <button className='add-to-cart__close-btn' onClick={ handleOnClose } />
    </Modal>
  );
};

AddToCartModal.propTypes = {
  category: string,
  keepShoppingLink: string,
  productBundle: array,
  onClose: func,
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
  } ),
  quantity: number
};
