import React from 'react';
import Modal from 'react-modal';

import SignInTemplate from './sign-in-template';

const SignIn = (props) => {
  const onClose = props.onClose || undefined;
  const [showModal, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
  }

  const closeModal = () => {
    onkeydown,
    setIsOpen(false);
    document.getElementsByTagName('body')[0].style.overflow = "auto";
    if (onClose) {
      onClose();
    }
  }
  
  return (
    <div className="signin__wrapper">
      <span className='signin__btn' onClick={openModal}>Sign In</span>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        className="modal-signin"
        overlayClassName="overlay-signin"
      >
        <SignInTemplate onCloseModal={closeModal} />
      </Modal>
    </div>
  );
}

export default SignIn;
