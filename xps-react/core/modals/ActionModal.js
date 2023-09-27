import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { func, string, element, bool, oneOfType } from 'prop-types';
import classNames from "classnames";
import CloseIconButton from 'components/shared-ui/CloseIconButton';
import { Row, Col } from 'xps-react/core';
import Button from 'xps-react/core/button';

export const ActionModal = (props) => {
  const { title, cancelText, ctaText, overlayClassName, className, onCancel, onCta, onModalClosed, isModalOpen, children } = props,
    [showModal, setShowModal] = React.useState(!!isModalOpen);

  useEffect(() => {
    if (!!isModalOpen !== showModal) {
      setShowModal(isModalOpen);
    }
  }, [isModalOpen]);

  function closeModal() {
    setShowModal( false );

    if (typeof onModalClosed === "function") {
      onModalClosed();
    }
  }

  function doCancel(evt) {
    evt.preventDefault();

    if (typeof onCancel === "function") {
      onCancel();
    }
  }

  function doSubmit(evt) {
    evt.preventDefault();

    if (typeof onCta === "function") {
      onCta();
    }
  }

  const classes = classNames("action-modal__modal", className),
    overlayClasses = classNames("action-modal__overlay", overlayClassName);

  return (
    <Modal
      appElement={ document.getElementsByTagName('body') }
      isOpen={ showModal }
      contentLabel='onRequestClose'
      onRequestClose={ closeModal }
      className={ classes }
      overlayClassName={ overlayClasses }
    >
      <div className='action-modal__container'>
        <div className='action-modal__header'>
          {
            !!title && (
              <div className='action-modal__title'>{ title }</div>
            )
          }
          <CloseIconButton onClick={ closeModal } className='action-modal__close-icon' size='large' />
        </div>
        <div className='action-modal__content'>
          { children }
        </div>
        <div className='action-modal__footer'>
          <Row noGutters={ true }>
            <Col>
              <Button className='action-modal__btn cancel' onClick={ doCancel }>
                { cancelText }
              </Button>
            </Col>
            <Col>
              <Button className='action-modal__btn cta' onClick={ doSubmit }>
                { ctaText }
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
}

ActionModal.defaultProps = {
  title: false,
  cancelText: false,
  ctaText: false,
  overlayClassName: '',
  className: '',
  onCancel: () => void 0,
  onCta: () => void 0,
  onModalClosed: () => void 0,
  isModalOpen: false,
};

ActionModal.propTypes = {
  title: oneOfType([string, element]),
  cancelText: oneOfType([string, element]),
  ctaText: oneOfType([string, element]),
  overlayClassName: string,
  className: string,
  onCancel: func,
  onCta: func,
  onModalClosed: func,
  isModalOpen: bool,
};