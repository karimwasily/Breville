import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { func, string, element, bool, oneOfType } from 'prop-types';
import classNames from 'classnames';
import CloseIconButton from 'components/shared-ui/CloseIconButton';

const VideoModal = ( props ) => {
  const { overlayClassName, className, onModalClosed, isModalOpen, children } = props,
    [showModal, setShowModal] = useState( !!isModalOpen );

  useEffect( () => {
    if ( !!isModalOpen !== showModal ) {
      setShowModal( isModalOpen );
    }
  }, [isModalOpen] );

  function closeModal() {
    setShowModal( false );

    if ( typeof onModalClosed === 'function' ) {
      onModalClosed();
    }
  }


  const classes = classNames( 'video-modal__modal', className ),
    overlayClasses = classNames( 'video-modal__overlay', overlayClassName );

  return (
    <Modal
      appElement={ document.getElementsByTagName( 'body' ) }
      isOpen={ showModal }
      contentLabel='onRequestClose'
      onRequestClose={ closeModal }
      className={ classes }
      overlayClassName={ overlayClasses }
    >
      <div className='video-modal__container'>
        <div className='video-modal__header'>
          <CloseIconButton onClick={ closeModal } className='video-modal__close-icon' size='large' />
        </div>
        <div className='video-modal__content'>
          { children }
        </div>
      </div>
    </Modal>
  );
};

VideoModal.defaultProps = {
  overlayClassName: '',
  className: '',
  onModalClosed: () => void 0,
  isModalOpen: false
};

VideoModal.propTypes = {
  overlayClassName: string,
  className: string,
  onModalClosed: func,
  isModalOpen: bool
};

export default VideoModal;