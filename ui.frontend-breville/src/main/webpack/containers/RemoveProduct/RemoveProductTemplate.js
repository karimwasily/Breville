import React from 'react';
import { useDispatch } from 'react-redux';
import Button from 'shared-ui/button';
import { func, string } from 'prop-types';
import CloseIconButton from 'components/shared-ui/CloseIconButton';
import { removeProduct, removeBundle } from 'library/store/cart/actions';
import product from 'library/saga/product';

const RemoveProductTemplate = ( props ) => {

  const { content, onCloseModal, productId, isDynamicBundle } = props;
  const dispatch = useDispatch();

  function handleRemoveClick(){
    dispatch( removeProduct( { productId, isDynamicBundle } ) );
    // dispatch( removeProduct( { productId } ) );
  }

  return (
    <div className='remove-product__container'>
      <div className='remove-product__header'>
        <div className='remove-product__title'>Remove Product?</div>
        <CloseIconButton onClick={ onCloseModal } className='remove-product__close-icon' size='large' />
      </div>
      <div className='remove-product__content'>
        { content }
      </div>
      <div className='remove-product__footer'>
        <div className='react-flex'>
          <Button className='remove-product__button--cancel' onClick={ onCloseModal }>Cancel</Button>
          <Button className='remove-product__button--remove' onClick={ handleRemoveClick }>Remove</Button>
        </div>
      </div>
    </div>

  );
};

RemoveProductTemplate.propTypes = {
  onCloseModal: func,
  content: string
};


export default RemoveProductTemplate;
