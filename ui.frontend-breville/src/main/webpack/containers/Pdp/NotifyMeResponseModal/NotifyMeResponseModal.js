import { object, bool, oneOfType, string, func } from 'prop-types';
import React from 'react';
import Modal from 'react-modal';
import CloseIconButton from 'components/shared-ui/CloseIconButton';
import { Button } from 'xps-react/core';
import { useTranslation } from 'react-i18next';

/**
 * notify response modal
 * @param {object} props props
 * @param {function} props.resetResponseFlag callback to close the modal
 * * @param {boolean} props.isOpenResModal is a flag to open the response modal
 * @param {object | string} props.notifyResponse notifyResponse is an 'object' when it errors or a 'string' when success
 * @returns {React.ReactElement}
 */

export const NotifyMeResponseModal = ( { notifyResponseSuccess, isOpenResModal, resetResponseFlag, notifyResponseError, notifyResponseTitle } ) => {
  const { t } = useTranslation();
  function closeResponseModal(){
    resetResponseFlag( false );
  }

  return (
    <Modal
      isOpen = { isOpenResModal }
      onRequestClose={ closeResponseModal }
      className='notify-reponse-modal-wrapper'
      overlayClassName='notify-reponse-modal-overlay'
    >
      <button className='notify__close-btn' onClick={ closeResponseModal } />
      <div className='modal__container-response'>
        <div className='modal__header'>
          <div className='modal__title'>{ notifyResponseSuccess ? 'Thank You' : `${ notifyResponseTitle ? notifyResponseTitle : 'Error' }` }</div>
        </div>
        <div className='modal__content'>
          { notifyResponseSuccess ? <p>Success</p> : <p>{ notifyResponseError }</p> }
        </div>

        <div className='modal__footer'>
          <Button
            colorScheme='purpleFill'
            size='medium'
            textType='bold'
            onClick={ closeResponseModal }
          >  { t( 'eh-text-close' ) }</Button>
        </div>

      </div>
    </Modal>

  );
};

NotifyMeResponseModal.propTypes = {
  isOpenResModal: bool,
  notifyResponse: oneOfType( [string, object] ),
  resetResponseFlag: func
};
