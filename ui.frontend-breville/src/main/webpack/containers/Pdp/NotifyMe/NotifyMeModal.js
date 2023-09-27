import { func, object, bool } from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProductVariantSKU } from 'library/store/product/selector';
import Modal from 'react-modal';
import { selectLanguage, selectCountry, selectRecaptchSiteKey } from 'library/store/global/selector';
import { SFNotifyMeFormModalContent } from './NotifyMeTemplate';
import { NotifyMeResponseModal } from '../NotifyMeResponseModal/NotifyMeResponseModal';
import { keypressEnterSpace } from 'xps-utils/wcag/keypressEnterSpace';

export const NotifyMeModal = ( { aemData, onCloseModal, isOpen } ) => {
  const productVariantSKU = useSelector( selectProductVariantSKU );
  const language = useSelector( selectLanguage );
  const country = useSelector( selectCountry );
  const recaptchSiteKey = useSelector( selectRecaptchSiteKey );
  const [notifyResponseSuccess, setNotifyResponseSuccess] = useState( null );
  const [notifyResponseError, setNotifyResponseError] = useState( null );
  const [notifyResponseTitle, setNotifyResponseTitle] = useState( null );

  const [response, setResponseModal] = useState( false );

  // On response from service open response modal
  function openResponseModal( type, data, title ){
    onCloseModal();
    setResponseModal( true );
    if ( type === 'error' ){
      setNotifyResponseError( data );
      setNotifyResponseTitle( title );
    }
    else {
      setNotifyResponseSuccess( data );
    }
  }

  function onKeyPressEventOpen( event ) {
    keypressEnterSpace( event, openResponseModal );
  }

  // On response modal close
  function resetResponseFlag(){
    setResponseModal( false );
  }

  return (
    <>
      <Modal
        isOpen = { isOpen }
        onRequestClose={ onCloseModal }
        className='notify-modal-wrapper'
        overlayClassName='notify-modal-overlay'
      >
        <SFNotifyMeFormModalContent
          onCloseModal={ onCloseModal }
          productVariantSKU={ productVariantSKU }
          language={ language }
          country={ country }
          variants={ aemData?.variantsInfo }
          aemData={ aemData?.sfNotifyMe }
          recaptchSiteKey={ recaptchSiteKey }
          onKeyPressOpen={ onKeyPressEventOpen }
          productName={ aemData?.productName }
          onResponseFromService={ openResponseModal }
        />
      </Modal>
      { ( notifyResponseSuccess || notifyResponseError ) && <NotifyMeResponseModal isOpenResModal={ response } notifyResponseSuccess={ notifyResponseSuccess } notifyResponseError={ notifyResponseError } resetResponseFlag={ resetResponseFlag } notifyResponseTitle={ notifyResponseTitle } /> }
    </>
  );
};

NotifyMeModal.propTypes = {
  aemData: object,
  onCloseModal: func,
  isOpen: bool,
  onResponseFromService: func
};
