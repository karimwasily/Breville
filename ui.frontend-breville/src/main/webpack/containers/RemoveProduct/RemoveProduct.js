import React from 'react';
import { node } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectModalOpenState } from 'library/store/ui/selectors';
import { changeModalState } from 'library/store/ui/actions';
import CloseIconButton from 'components/shared-ui/CloseIconButton';

import RemoveProductTemplate from './RemoveProductTemplate';
import Modal from 'react-modal';

const RemoveProduct = ( props ) => {
  const { children, productId, isDynamicBundle } = props;
  const isOpen = useSelector( selectModalOpenState( productId ) );
  const dispatch = useDispatch();

  function openModal() {
    dispatch( changeModalState( productId, true ) );
  }

  function closeModal(){
    onkeydown,
    dispatch( changeModalState( productId, false ) );
  }

  return (
    <div>
      <CloseIconButton onClick={ openModal } className='cart-bundle-summary__remove' title='Remove Item' />
      <Modal
        isOpen={ isOpen }
        contentLabel='onRequestClose Example'
        onRequestClose={ closeModal }
        className='modal-remove-product'
        overlayClassName='overlay-remove-product'
      >
        <RemoveProductTemplate
          onCloseModal={ closeModal }
          content={ children }
          isDynamicBundle={ isDynamicBundle }
          productId={ productId }
        />
      </Modal>
    </div>
  );
};

RemoveProduct.propTypes = {
  children: node.isRequired
};

export default RemoveProduct;
