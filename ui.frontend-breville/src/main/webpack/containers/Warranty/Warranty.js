import React from 'react';
import Modal from 'react-modal';
import Button from 'components/shared-ui/button';

import WarrantyTemplate from './WarrantyTemplate';

const Warranty = ( props ) => {
  const [showModal, setIsOpen] = React.useState( false );
  function openModal() {
    setIsOpen( true );
  }

  function closeModal() {
    onkeydown,
    setIsOpen( false );
  }


  return (
    <div className='warranty__wrapper'>
      <Button
        colorScheme='black'
        size='small'
        textType='bold'
        className='breakdown__button-add'
        onClick={ openModal }
      >Add</Button>
      <Modal
        isOpen={ showModal }
        onRequestClose={ closeModal }
        className='cs-modal-content'
        overlayClassName='cs-modal-overlay'
      >
        <WarrantyTemplate onCloseModal={ closeModal } { ...props } />
      </Modal>
    </div>
  );
};

export default Warranty;
