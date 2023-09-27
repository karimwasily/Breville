import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Form } from 'xps-react/core/form';
import { selectCountryStateList, selectAddressById, selectIsError } from 'library/store/mybreville/selector';
import { addUserAddress, updateUserAddress, deleteUserAddress, setNotificationText } from 'library/store/mybreville/actions';
import EditAddressForm from './components/edit-address-form.js';
import { useTranslation } from 'react-i18next';

const EditAddress = ( props ) => {
  const addressIdParam = props?.match?.params?.addressId || '',
    isError = useSelector( selectIsError ),
    { t } = useTranslation(),
    history = useHistory(),
    dispatch = useDispatch(),
    sfdcAddress = useSelector( selectAddressById( addressIdParam ) ),
    countryStateList = useSelector( selectCountryStateList ),
    usCountryState = countryStateList.filter( ( countryState ) => countryState?.code === 'us' )[0] || {},
    usStates = ( usCountryState?.states || [] ).map( ( state ) => {
      return {
        value: state?.code || 0,
        label: state?.displayName || '-'
      };
    } ),
    isEdit = !!( addressIdParam && sfdcAddress ),
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

  /**
   * Handles if user provides addressId in the URL param, but the address does not exist
   */
  useEffect( () => {
    if ( addressIdParam && !sfdcAddress ) {
      history.push( '/account-details/saved-addresses/new' );
    }
  }, [] );

  function onAddressAdded() {
    history.push( '/account-details/saved-addresses' );
    setNotificationText( t( 'eh-message-address-edited' ) );
  }

  function onAddressUpdated() {
    history.push( '/account-details/saved-addresses' );
    setNotificationText( t( 'eh-message-address-edited' ) );
  }

  function onAddressDeleted() {
    history.push( '/account-details/saved-addresses' );
    setNotificationText( t( 'eh-message-address-edited' ) );
  }

  function onCancelEdit() {
    history.push( '/account-details/saved-addresses' );
  }

  function onFailEdit() {
    setNotificationText( t( 'eh-message-personal-details-has-failed' ) );
  }

  function onDeleteUserAddress( formAddressObj ) {
    dispatch( deleteUserAddress( {
      data: formAddressObj,
      successCallback: onAddressDeleted
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
    <div className='cmp-mybreville__edit-address'>
      <Form formName='editAddressForm' defaultValues={ addressObj } onSubmit={ handleSubmit }>
        <EditAddressForm stateOptions={ usStates } stateDefaultValue={ addressObj.state } address={ addressObj } onRemoveFn={ onDeleteUserAddress } onCancelFn={ onCancelEdit } isEdit={ isEdit } />
      </Form>
    </div>
  );
};

EditAddress.propTypes = {
};

export default withRouter( EditAddress );
