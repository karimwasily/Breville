import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { func, bool, object } from 'prop-types';
import { Form } from 'xps-react/core/form';
import CloseIconButton from 'components/shared-ui/CloseIconButton';
import EditAddressForm from '../../account-details/edit-address/components/edit-address-form';
import { selectCountryStateList, selectIsError } from 'library/store/mybreville/selector';
import { addUserAddress, updateUserAddress, deleteUserAddress, setNotificationText } from 'library/store/mybreville/actions';

const AddressFormModal = ( props ) => {
  const { isModalOpen, sfdcAddress } = props,
    [showModal, setShowModal] = useState( !!isModalOpen ),
    { t } = useTranslation(),
    dispatch = useDispatch(),
    countryStateList = useSelector( selectCountryStateList ),
    isEdit = !!( sfdcAddress?.Id ),
    usCountryState = countryStateList.filter( ( countryState ) => countryState?.code === 'us' )[0] || {},
    usStates = ( usCountryState?.states || [] ).map( ( state ) => {
      return {
        value: state?.code || 0,
        label: state?.displayName || '-'
      };
    } ),
    addressObj = {
      addressId: sfdcAddress?.Id,
      address1: sfdcAddress?.Shipping_Street_Line_1__c || '',
      address2: sfdcAddress?.Shipping_Street_Line_2__c || '',
      country: sfdcAddress?.Country || 'USA',
      city: sfdcAddress?.City || '',
      state: sfdcAddress?.State || 'AK',
      zipCode: sfdcAddress?.PostalCode || '',
      isDefault: !!sfdcAddress?.isDefault || false
    };

  useEffect( () => {
    if ( isModalOpen !== showModal ) {
      setShowModal( isModalOpen );
    }
  }, [isModalOpen] );

  function closeModal() {
    setShowModal( false );
    if ( props.onModalClosed && typeof props.onModalClosed === 'function' ) {
      props.onModalClosed();
    }
  }

  function onAddressAdded() {
    setNotificationText( t( 'eh-message-address-edited' ) );
    if ( props.onAddressAdded && typeof props.onAddressAdded === 'function' ) {
      props.onAddressAdded();
    }
  }

  function onAddressUpdated() {
    setNotificationText( t( 'eh-message-address-edited' ) );
    if ( props.onAddressUpdated && typeof props.onAddressUpdated === 'function' ) {
      props.onAddressUpdated();
    }
  }

  function onAddressDeleted() {
    setNotificationText( t( 'eh-message-address-edited' ) );
    if ( props.onAddressDeleted && typeof props.onAddressDeleted === 'function' ) {
      props.onAddressDeleted();
    }
  }

  function onCancelEdit() {
    if ( props.onCancelEdit && typeof props.onCancelEdit === 'function' ) {
      props.onCancelEdit();
    }
  }

  function onFailEdit() {
    // @todo Disabled for now due to the error shows up before even the request finishes
    dispatch( setNotificationText( t( 'eh-message-personal-details-has-failed' ) ) );
  }

  function onDeleteUserAddress( formAddressObj ) {
    dispatch( deleteUserAddress( {
      data: formAddressObj,
      successCallback: onAddressDeleted,
      failCallback: onFailEdit
    } ) );
  }

  function handleSubmit( formAddressObj ) {
    if ( isEdit && addressObj?.addressId ) {
      formAddressObj.addressId = addressObj.addressId;
      dispatch( updateUserAddress( {
        data: formAddressObj,
        successCallback: onAddressUpdated,
        failCallback: onFailEdit
      } ) );
    }
    else {
      formAddressObj.isDefault = false;
      dispatch( addUserAddress( {
        data: formAddressObj,
        successCallback: onAddressAdded,
        failCallback: onFailEdit
      } ) );
    }
  }

  return (
    <Modal
      isOpen={ showModal }
      contentLabel='onRequestClose'
      onRequestClose={ closeModal }
      className='address-form__modal'
      overlayClassName='address-form__overlay'
    >
      <div className='address-form__container'>
        <div className='address-form__header'>
          <div className='address-form__title'>{ t( 'eh-button-add-new-address' ) }</div>
          <CloseIconButton onClick={ closeModal } className='address-form__close-icon' size='large' />
        </div>
        <div className='address-form__content'>
          <Form formName='editAddressForm' defaultValues={ addressObj } onSubmit={ handleSubmit }>
            <EditAddressForm stateOptions={ usStates } stateDefaultValue={ addressObj.state } address={ addressObj } onRemoveFn={ onDeleteUserAddress } onCancelFn={ onCancelEdit } isEdit={ isEdit } />
          </Form>
        </div>
      </div>
    </Modal>
  );
};

AddressFormModal.defaultProps = {
  isModalOpen: false,
  sfdcAddress: {},
  onModalClosed: () => void 0,
  onAddressAdded: () => void 0,
  onAddressUpdated: () => void 0,
  onAddressDeleted: () => void 0,
  onCancelEdit: () => void 0
};

AddressFormModal.propTypes = {
  isModalOpen: bool,
  sfdcAddress: object,
  onModalClosed: func,
  onAddressAdded: func,
  onAddressUpdated: func,
  onAddressDeleted: func,
  onCancelEdit: func
};

export default AddressFormModal;
