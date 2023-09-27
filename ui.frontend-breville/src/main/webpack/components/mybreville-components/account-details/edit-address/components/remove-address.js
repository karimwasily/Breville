import React from 'react';
import { node, func } from 'prop-types';
import Button from 'xps-react/core/button';
import Modal from 'react-modal';

import RemoveAddressTemplate from './remove-address-template';

const RemoveAddress = ( { onRemoveFn, children } ) => {
  const [showModal, setShowModal] = React.useState( false );

  function openModal() {
    setShowModal( true );
  }

  function closeModal() {
    setShowModal( false );
  }

  function doRemoveAddress() {
    onRemoveFn();
  }

  return (
    <div>
      <Button
        disabled={ false }
        href='#'
        className='link'
        type='link'
        children='Remove Address'
        onClick={ openModal }
      />
      <Modal
        isOpen={ showModal }
        contentLabel='onRequestClose Example'
        onRequestClose={ closeModal }
        className='remove-address__modal'
        overlayClassName='remove-address__overlay'
      >
        <RemoveAddressTemplate onCloseModal={ closeModal } onRemoveFn={ doRemoveAddress } content={ children } />
      </Modal>
    </div>
  );
};

RemoveAddress.defaultProps = {
  onRemoveFn: () => 0
};

RemoveAddress.propTypes = {
  onRemoveFn: func.isRequired,
  children: node.isRequired
};

export default RemoveAddress;
