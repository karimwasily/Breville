import React, { useState, Fragment } from 'react';
import Modal from 'react-modal';
import { func, bool } from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '560px',
    minHeight: '250px',
    boxShadow: '0 2px 12px 0 rgb(0 0 0 / 50%), 0 2px 4px 0 rgb(0 0 0 / 50%)',
    backgroundColor: '#fff',
  }
};

export const ShippingModal = ( props ) =>{
  const { isOpen, onModalClosed, onSaveData } = props;
  const [open, setOpen] = useState( isOpen );

  function closeModal() {
    setOpen( false );

    if ( typeof onModalClosed === 'function' ) {
      onModalClosed();
    }
  }

  function save() {
    if ( typeof onModalClosed === 'function' ) {
      onSaveData();
    }
  }

  return (
    <Fragment>
      <Modal
        appElement={ document.getElementsByTagName( 'body' ) }
        isOpen={ open }
        style={ customStyles }
        onRequestClose={ closeModal }
      >
        <div className='cmp-modal-root model-container'>
          <div className='cmp-modal-root flex'>
            <div className='cmp-modal-root model-title'>Save shipping address?</div>
            <button onClick={ closeModal } className='cmp-modal-root closeBtn'>X</button>
          </div>
          <div className='cmp-modal-root model-body'>
            <p> Save this new address to your account to use later.You can have 3 saved shipping addresses.</p>
          </div>
          <div className='cmp-modal-root flex'>
            <button type='button' onClick={ closeModal } className='cmp-modal-root cancelBtn'>No, don't save it </button>
            <button type='button' onClick={ save } className='cmp-modal-root saveBtn'> Yes, save it </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

ShippingModal.defaultProps = {
  onModalClosed: () => void 0,
  onSaveData: () => void 0,
  isOpen: false
};

ShippingModal.propTypes = {
  onModalClosed: func,
  onSaveData: func,
  isOpen: bool
};