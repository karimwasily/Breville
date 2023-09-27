import React, { useState, useRef } from 'react';
import { array, string, bool } from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { ActionModal } from 'xps-react/core';
import { formatDateLongMonth } from '../../../my-orders/helpers';
export default function SelectModal( props ) {

  const { name, label, options, defaultValue, title, cancelText, ctaText, modelDescription } = props;
  const [openCancelSubModal, setOpenCancelSubModal] = useState( false );
  const [modelDate, setModelDate] = useState( );
  const formParameters = useFormContext();
  const register = formParameters ? formParameters.register : undefined;
  const { ref: inputRef, ...inputRest } = register( name ) || {};
  const elementRef = useRef();

  function showPauseSubscriptionModal( evt ) {
    evt?.preventDefault();
    setOpenCancelSubModal( true );
  }

  function hidePauseSubscriptionModal() {
    if ( elementRef && elementRef.current ){
      elementRef.current.selectedIndex = '0';
    }
    setOpenCancelSubModal( false );
  }

  function doPauseSubscriptionModal() {
    setOpenCancelSubModal( false );
  }

  function handleChange( event ){
    const value = event?.target?.value || {};
    let splitString = [];
    if ( value?.length ){
      splitString = value?.split( '+' );
      if ( splitString?.length && value ){
        const formatedDate = formatDateLongMonth( splitString[0] );
        setModelDate( formatedDate );
        showPauseSubscriptionModal();
      }
    }
  }

  return (
    <div className='form-group'>
      <label className='form-label' htmlFor={ name }>{ label }</label>
      { inputRef ?
        <select id='timeFrame' onClick={ handleChange } { ...inputRest } name={ name } ref={ ( elem ) => {
            inputRef( elem );
            elementRef.current = elem;
          } } className='form-select' defaultValue={ defaultValue }
        >
          {
            options?.map( ( { value, label } ) => (
              <option key={ value } value={ value }>{ label }</option>
          ) ) }
        </select>
        :
        <select name={ name } className='form-select'>
          { options.map( ( { value, label } ) => (
            <option key={ value } value={ value }>{ label }</option>
          ) ) }
        </select>
      }
      <ActionModal isModalOpen= { openCancelSubModal }
        title={ title }
        cancelText={ cancelText }
        onCancel={ hidePauseSubscriptionModal }
        ctaText={ ctaText }
        onCta={ doPauseSubscriptionModal }
        onModalClosed={ hidePauseSubscriptionModal }
      >
        { modelDescription } { modelDate }.
      </ActionModal>
    </div>
  );
}

SelectModal.propTypes = {
  options: array,
  name: string,
  label: string,
  defaultValue: string,
  title: string,
  cancelText: string,
  ctaText: string,
  modelDescription: string
};
