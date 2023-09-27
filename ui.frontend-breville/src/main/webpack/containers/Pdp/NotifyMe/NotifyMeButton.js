import { selectSfNotifyMeEnable } from 'library/store/global/selector';
import { object } from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'xps-react/core/button';
import { keypressEnterSpace } from 'xps-utils/wcag/keypressEnterSpace';
import { NotifyMeModal } from './NotifyMeModal';

export const NotifyMeButton = ( { aemData } ) => {
  const [showModal, setIsModalOpen] = useState( false );
  const sfNotifyMeEnable = useSelector( selectSfNotifyMeEnable );

  // Notify modal open
  function openModal() {
    setIsModalOpen( true );
  }

  function onKeyPressEventOpen( event ) {
    keypressEnterSpace( event, openModal );
  }

  // Notify modal close
  function closeModal(){
    setIsModalOpen( false );
  }

  // if no data from aem dont display none
  if ( !sfNotifyMeEnable || !aemData?.sfNotifyMe ) return null;

  return (
    <>
      <Button onClick={ openModal } onKeyPress={ onKeyPressEventOpen } style={{ flex: 2 }} className='cmp-button--notify-me'>Notify me</Button>
      <NotifyMeModal aemData={ aemData } onCloseModal={ closeModal } isOpen={ showModal } />
    </>
  );
};

NotifyMeButton.propTypes = {
  aemData: object
};
