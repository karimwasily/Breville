/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { withAem } from 'library/utils/withAem';
import { object } from 'prop-types';
import TextInput from './TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'library/store/user/actions';
import { selectLogedInUser } from 'library/store/user/selector';
import { addAlternateShippingAddress, setDefaultShippingAddress } from 'library/store/user/actions';
import { states } from '../checkout/helper';


const ReactMyBeanzAccount = ( { aemData } ) => {

  const dispatch = useDispatch();
  let ParentId;
  const logedInUser = useSelector( selectLogedInUser );

  useEffect( () => {
    dispatch( fetchUser() );

  }, [] );

  const [showChangePassword, setShowChangePassword] = useState( false );
  const [showChangeName, setShowChangeName] = useState( false );
  const [showPhoneChange, setShowPhoneChange] = useState( false );
  const [accountDetails, setAccountDetails] = useState( {} );
  const [shippingAddresses, setShippingAddresses] = useState( [] );

  // Password States
  const [newPassword, setNewPassword] = useState( '' );
  const [confirmPassword, setConfirmPassword] = useState( '' );
  const [passDigitError, setPassDigitError] = useState( true );
  const [passShortError, setPassShortError] = useState( true );
  const [passMismatchError, setpassMismatchError] = useState( false );
  const [showPasswordText, setShowPasswordText] = useState( false );
  const [showConfirmPasswordText, setShowConfirmPasswordText] = useState( false );

  useEffect( ()=> {
    let accountAddressArray = [];

    // debugger

    if ( Object.entries( logedInUser ).length > 0 ){
    // Account details API
      setAccountDetails( logedInUser.records[0] );
      ParentId = logedInUser.records[0].Id;

      if ( logedInUser.records[0].ContactPointAddresses !== null ){

        accountAddressArray = logedInUser.records[0].ContactPointAddresses.records;
        accountAddressArray.forEach( ( address )=> {
          address.isComplete = true;
        } );
      }

      const defaultAddress = {
        Shipping_Street_Line_1__c: logedInUser.records[0].Shipping_Street_Line_1__c,
        Shipping_Street_Line_2__c: logedInUser.records[0].Shipping_Street_Line_2__c,
        Street: logedInUser.records[0].ShippingStreet,
        City: logedInUser.records[0].ShippingCity,
        PostalCode: logedInUser.records[0].ShippingPostalCode,
        State: logedInUser.records[0].ShippingState,
        StateCode: logedInUser.records[0].ShippingStateCode,
        CountryCode: logedInUser.records[0].ShippingCountryCode,
        Country: logedInUser.records[0].ShippingCountry,
        Id: logedInUser.records[0].Id,
        isComplete: true
      };
      // if(accountAddressArray.length > 0 ){
      accountAddressArray.unshift( defaultAddress );
      setShippingAddresses( accountAddressArray );
    // }
    }
  }, [logedInUser] );

  useEffect( ()=> {

    document.querySelectorAll(
      '.cmp-form__myaccount-form-field__input, .cmp-form__myaccount-form-field__textarea'
    )
    .forEach( ( elem ) => {
      elem.addEventListener( 'blur', () => setActive( elem, false ) );
      elem.addEventListener( 'focus', () => setActive( elem, true ) );
    } );
  }, [ accountDetails, shippingAddresses, showChangeName, showChangePassword, showPhoneChange] );

  // Animated placeholder for input box
  const setActive = ( el, active ) => {
    const formField = el.parentNode.parentNode;
    const formFieldActive = 'cmp-form__myaccount-form-field--is-active';
    const formFieldFilled = 'cmp-form__myaccount-form-field--is-filled';
    `${ ( active ? formField.classList.add( formFieldActive ) :
      formField.classList.remove( formFieldActive ) ) }`;
    `${ ( el.value.length === 0 ? formField.classList.remove( formFieldFilled ) :
      formField.classList.add( formFieldFilled ) ) }`;
  };

  const handleShowEdit = ( event, clickedFrom ) => {
    event.preventDefault();
    switch ( clickedFrom ) {
      case 'changePassword':
        setShowChangePassword( true );
        setNewPassword( '' );
        setConfirmPassword( '' );
        break;

      case 'changeName':
        setShowChangeName( true );

        setTimeout( ()=>{
          document.getElementById( 'lastname' ).focus();
          document.getElementById( 'firstname' ).focus();
        }, 10 );

        break;


      case 'changePhone':
        setShowPhoneChange( true );

        setTimeout( ()=>{
          document.getElementById( 'phone-number' ).focus();
        }, 10 );

        break;

    }
  };

  const handleHideEdit = ( event, clickedFrom ) => {
    event.preventDefault();
    if ( clickedFrom === 'changePassword' ) {
      setShowChangePassword( false );
    }

    switch ( clickedFrom ) {
      case 'changePassword':
        setShowChangePassword( false );
        setNewPassword( '' );
        setConfirmPassword( '' );
        break;

      case 'changeName':

        if ( accountDetails.FirstName === '' || accountDetails.LastName === '' ){
          setTimeout( ()=>{
            accountDetails.FirstName === '' ? document.getElementById( 'firstname' ).focus() : document.getElementById( 'lastname' ).focus();
          }, 10 );
        }
        else {
          setShowChangeName( false );
          // Make API call for name change
        }
        break;


      case 'changePhone':
        if ( accountDetails.Phone === '' ){
          document.getElementById( 'phone-number' ).focus();
        }
        else {
          setShowPhoneChange( false );
        }
        break;

    }
  };

  // Handles the name change events
  const handleNameChange = ( event )=> {

    switch ( event.target.id ){
      case 'firstname':
        setAccountDetails( { ...accountDetails, FirstName: event.target.value } );
        break;
      case 'lastname':
        setAccountDetails( { ...accountDetails, LastName: event.target.value } );
        break;
    }
  };

  // Handles the edit and save button for address
  const handleAddressEdit = ( event, index )=> {
    event.preventDefault();
    const addressesArray = [...shippingAddresses];
    addressesArray[index].isComplete = false;
    setShippingAddresses( addressesArray );
    setTimeout( ()=> {
      document.getElementById( `zipcodeid-${ index }` ).focus();
      document.getElementById( `state-${ index }` ).focus();
      document.getElementById( `country-${ index }` ).focus();
      document.getElementById( `address-line-2-${ index }` ).focus();
      document.getElementById( `cityid-${ index }` ).focus();
      document.getElementById( `address-line-1-${ index }` ).focus();
    }, 10 );

  };

  // Handles the edit and save button for address
  const handleAddressSave = ( event, index )=> {

    if(index===3){
      return
    }

    let addAltAddressPayLoad = {};
    ParentId = logedInUser.records[0].Id;
    event.preventDefault();

    if ( shippingAddresses[index].Shipping_Street_Line_1__c === '' || shippingAddresses[index].City === '' || shippingAddresses[index].PostalCode === '' ) {
      document.getElementById( `zipcodeid-${ index }` ).focus();
      document.getElementById( `cityid-${ index }` ).focus();
      document.getElementById( `address-line-1-${ index }` ).focus();
    }
    else {
      const addressesArray = [...shippingAddresses];
      // MAKE AN API CALL HERE TO SAVE THE ADDRESS
      addressesArray[index].isComplete = true;
      setShippingAddresses( addressesArray );

      addAltAddressPayLoad = { ParentId: ParentId, AddressType: 'Shipping',
        Shipping_Street_Line_1__c: addressesArray[index].Shipping_Street_Line_1__c,
        Shipping_Street_Line_2__c: addressesArray[index].Shipping_Street_Line_2__c,
        City: addressesArray[index].City, PostalCode: addressesArray[index].PostalCode,
        Country: 'USA', IsDefault: false, Name: `alternate address ${ index }${ 1 }`,
        State: addressesArray[index].State

      };

      const payload = {
        data: addAltAddressPayLoad
      };

      dispatch( addAlternateShippingAddress( payload ) );

    }
  };

  // Handles the Address change events
  const handleAddressChange = ( event, index )=> {
    const addressesArray = [...shippingAddresses];

    switch ( event.target.id ){
      case `address-line-1-${ index }`:
        addressesArray[index] = { ...addressesArray[index], Shipping_Street_Line_1__c: event.target.value };
        break;

      case `address-line-2-${ index }`:
        addressesArray[index] = { ...addressesArray[index], Shipping_Street_Line_2__c: event.target.value };
        break;

      case `cityid-${ index }`:
        addressesArray[index] = { ...addressesArray[index], City: event.target.value };
        break;

      case `zipcodeid-${ index }`:
        addressesArray[index] = { ...addressesArray[index], PostalCode: event.target.value };
        break;

      case `state-${ index }`:
        addressesArray[index] = { ...addressesArray[index], State: event.target.value };
        break;

      case `country-${ index }`:
        addressesArray[index] = { ...addressesArray[index], Country: event.target.value };
        break;
    }
    // Post call to update the addresses
    setShippingAddresses( addressesArray );
  };

  const handlePhoneChange = ( event ) => {
    setAccountDetails( { ...accountDetails, Phone: event.target.value } );
  };

  const setAsDefaultClicked = ( event, index )=> {

    ParentId = logedInUser.records[0].Id;
    event.preventDefault();
    const addressesArray = [...shippingAddresses];
    const setAsDefaultShipAddresspayload = {
            "Shipping_Street_Line_1__c": addressesArray[index].Shipping_Street_Line_1__c,
            "Shipping_Street_Line_2__c": addressesArray[index].Shipping_Street_Line_2__c,
            "ShippingCity": addressesArray[index].City,
            "ShippingPostalCode": addressesArray[index].PostalCode,
            "ShippingState": addressesArray[index].State,
            "ShippingCountry": addressesArray[index].Country
    }

    const payload  = {
      url: ParentId,
      data : setAsDefaultShipAddresspayload
    }

    // setAsDefaultShipAddresspayload;
    dispatch(setDefaultShippingAddress(payload));

    addressesArray.splice( 0, 0, addressesArray.splice( index, 1 )[0] );
    setShippingAddresses( addressesArray );
    // Make an API call as per index and set the value in shipping addresses
  };

  const handleDeleteAddress = ( event, index )=> {
    event.preventDefault();
    const addressesArray = [...shippingAddresses];
    addressesArray.splice( index, 1 );
    setShippingAddresses( addressesArray );
    // Make an API call to delete this address
  };

  const handleAddNewShipingAddress = ( event ) => {
    event.preventDefault();
    const addressesArray = [...shippingAddresses];

    const newAddress = {
      Shipping_Street_Line_1__c: '',
      Shipping_Street_Line_2__c: '',
      Street: '',
      City: '',
      PostalCode: '',
      State: '',
      StateCode: '',
      CountryCode: '',
      Country: '',
      Id: '',
      isComplete: false
    };
    addressesArray.push( newAddress );

    setShippingAddresses( addressesArray );

  };

  const handleShowPassword = ( event ) => {
    event.preventDefault();
    setShowPasswordText( !showPasswordText );
  };

  const handleShowConfirmPassword = ( event ) => {
    event.preventDefault();
    setShowConfirmPasswordText( !showConfirmPasswordText );
  };

  const handlePasswordChange = ( event ) => {
    if ( event.target.value.length < 6 ){
      setPassShortError( true );
    }
    else {
      setPassShortError( false );
    }

    if ( /\d/.test( event.target.value ) ){
      setPassDigitError( false );
    }
    else {
      setPassDigitError( true );
    }
    setNewPassword( event.target.value );
  };

  const handleConfirmPasswordChange = ( event ) => {
    setConfirmPassword( event.target.value );
    if ( event.target.value !== newPassword ){
      setpassMismatchError( true );
    }
    else {
      setpassMismatchError( false );
    }
  };

  const handleSaveNewPassword = ( event ) => {
    event.preventDefault();
    if ( passMismatchError || passShortError || passDigitError ){
      document.getElementById( 'password' ).focus();
    }
    else {
      setShowChangePassword( false );
      setNewPassword( '' );
      setConfirmPassword( '' );
    }

    // API call to change password

  };

  return (
    <div className='cmp-myaccount__root'>
      <div className='cmp-container-myaccount__header'>
        <h1 className='cmp-text-myaccount__header--h1'>
          { aemData.myBeanzAccountHeading }
        </h1>
        <p className='cmp-text-myaccount__header--subhead'>
          { aemData.myBeanzPersonalDetails }
        </p>
      </div>
      <div className='cmp-container__myaccount--details'>
        <h2 className='cmp-text-myaccount__title--h4'>{ aemData.loginText }</h2>
        <div className='cmp-container__myaccount--filled-details'>
          <p className='cmp-text__myaccount--filled-details-p'>
            { accountDetails && accountDetails.PersonEmail }
          </p>
          <a
            href='#'
            onClick={ ( event ) => {
              if ( !showChangePassword ){
                 handleShowEdit( event, 'changePassword' );
                }
              else {
                 handleHideEdit( event, 'changePassword' );
                }
              } }
            className='cmp-text__myaccount--change-password-a'
          >
            { aemData.changePasswordText }
          </a>

          { showChangePassword && (
            <div className='cmp-container__myaccount--edti-password'>
              <h2 className='cmp-text-myaccount__title--h4'>
                { aemData.changePasswordText }
              </h2>
              <div className='cmp-form__myaccount'>
                <div className='cmp-form__myaccount-form-field'>
                  <div className='cmp-form__myaccount-form-field__control'>
                    <TextInput
                      id= 'password'
                      type= { showPasswordText ? 'text' : 'password' }
                      onChange={ ( event )=> {
                      handlePasswordChange( event );
                      } }
                      value={ newPassword }
                      label={ aemData.newPassword }
                      containerClass={ passShortError || passDigitError ? 'cmp-form__myaccount-form-field__control-error' : '' }
                    />
                    <a
                      onClick={ ( event ) => handleShowPassword( event ) }
                      href='#'
                      className='cmp-form__myaccount-form--show-password'
                    >
                      { showPasswordText ? aemData.hideBtnText : aemData.showBtnText }
                    </a>
                    <p className={ passShortError ? 'cmp-form__myaccount-form-field_error-p' : 'cmp-form__myaccount-form-field_success-p' }>At least 6 characters&nbsp;-&nbsp; <span className={ passDigitError ? 'cmp-form__myaccount-form-field_error-p' : 'cmp-form__myaccount-form-field_success-p' }>1 number</span></p>
                  </div>
                </div>

                <div className='cmp-form__myaccount-form-field'>
                  <div className='cmp-form__myaccount-form-field__control'>
                    <TextInput
                      id= 'confPassword'
                      type = { showConfirmPasswordText ? 'text' : 'password' }
                      onChange={ ( event )=> {
                      handleConfirmPasswordChange( event );
                      } }
                      value={ confirmPassword }
                      label={ aemData.confirmPassword }
                      containerClass={ passMismatchError ? 'cmp-form__myaccount-form-field__control-error' : '' }
                    />
                    <a
                      onClick={ ( event )=> handleShowConfirmPassword( event ) }
                      href='#'
                      className='cmp-form__myaccount-form--show-password'
                    >
                      { showConfirmPasswordText ? aemData.hideBtnText : aemData.showBtnText }
                    </a>
                    { passMismatchError && <p className='cmp-form__myaccount-form-field_error-p'>Passwords must be same</p> }
                  </div>
                </div>
                <button onClick={ ( event )=> handleSaveNewPassword( event ) } className='cmp-button__myaccount-form-field__save'>
                  { aemData.saveBtnText }
                </button>
                <button
                  onClick={ ( event ) => handleHideEdit( event, 'changePassword' ) }
                  className='cmp-button__myaccount-form-field__cancel'
                >
                  { aemData.cancelBtnText }
                </button>
              </div>
            </div>
          ) }
        </div>
      </div>
      <div className='cmp-container__myaccount--details'>
        <div className='cmp-container__myaccount--filled-details'>
          <h2 className='cmp-text-myaccount__title--h4'>
            { aemData.nameHeading }
          </h2>
          <a
            onClick={ ( event ) => {
                if ( !showChangeName ){
                handleShowEdit( event, 'changeName' );
                }
                else {
                       handleHideEdit( event, 'changeName' );
                  }
                } }
            href='#'
            className='cmp-text__myaccount--details-edit'
          >
            { !showChangeName ? aemData.editBtnLabel : aemData.saveBtnLabel }
          </a>
          { !showChangeName && (
            <p className='cmp-text__myaccount--filled-details-p'>{ accountDetails ? `${ accountDetails.FirstName === undefined || accountDetails.FirstName === null  ?
               '' : accountDetails.FirstName } 
            ${ accountDetails.LastName === undefined || accountDetails.LastName === null ? '' : accountDetails.LastName }` : '' }</p>
          ) }
        </div>
        { showChangeName && (
          <div className='cmp-form__myaccount'>
            <TextInput
              id='firstname'
              type='text'
              onChange={ ( event ) => handleNameChange( event ) }
              value={ accountDetails.FirstName }
              label={ aemData.firstNameLabel }
              required
            />
            <TextInput
              id='lastname'
              type='text'
              onChange={ ( event ) => handleNameChange( event ) }
              value={ accountDetails.LastName }
              label={ aemData.lastNameLabel }
              required
            />
          </div>
        ) }
      </div>
      <h2 className='cmp-text-myaccount__title--h4'>
        { aemData.shippingAddressHeading }
      </h2>

      {
        shippingAddresses.map( ( address, index )=> {
            return (
              <div key = { address.Id } className='cmp-container__myaccount--details shipping-address'>
                <div className='cmp-container__myaccount--filled-details'>
                  <p className='cmp-text__myaccount--filled-details-bold-p'>
                    { index === 0 ? aemData.defaultText : `${ aemData.alternateShippingAddressLbl } ${ index }` }
                  </p>
                  { address.isComplete && ( <p className='cmp-text__myaccount--filled-details-p'>
                    { address.Shipping_Street_Line_1__c === null ? '' : address.Shipping_Street_Line_1__c }
                    <br />
                    { address.Shipping_Street_Line_2__c === null ? '' : address.Shipping_Street_Line_2__c }
                    <br />
                    { `${ address.City === null ? '' : `${ address.City },` } ${ address.State === null ? '' : `${ address.State },` }
                     ${ address.PostalCode === null ? '' : address.PostalCode }` }
                    <br />
                    { address.Country === null ? '' : address.Country }
                  </p> ) }
                  <a
                    href='#'
                    onClick={ ( event ) => {
                      if ( address.isComplete ){
                        handleAddressEdit( event, index );
                      }
                      else {
                        handleAddressSave( event, index );
                      }

                   } }
                    className='cmp-text__myaccount--details-edit'
                  >
                    { address.isComplete ? aemData.editBtnLabel : aemData.saveBtnLabel }
                  </a>
                </div>
                { address.isComplete && index !== 0 &&
                <div className='cmp-container__myaccount--filled-details'>
                  <a
                    href='#'
                    onClick={ ( event ) => setAsDefaultClicked( event, index ) }
                    className='cmp-text__myaccount--filled-details-anchor--set-as-defualt'
                  >
                    Set as Default
                  </a>
                  <a
                    href='#'
                    onClick={ ( event ) => handleDeleteAddress( event, index ) }
                    className='cmp-text__myaccount--filled-details-anchor--delete-address'
                  >
                    Delete Address
                  </a>
                </div> }
                { !address.isComplete && (
                <div className='cmp-form__myaccount'>
                  <TextInput
                    id={ `address-line-1-${ index }` }
                    type='text;'
                    onChange={ ( event )=> {
                      handleAddressChange( event, index );
                      } }
                    value={ address.Shipping_Street_Line_1__c }
                    label={ aemData.addressLine1 }
                    required
                  />
                  <TextInput
                    id={ `address-line-2-${ index }` }
                    type='text'
                    onChange={ ( event )=> {
                      handleAddressChange( event, index );
                      } }
                    value={ address.Shipping_Street_Line_2__c }
                    label={ aemData.addressLine2 }
                  />
                  <TextInput
                    id={ `cityid-${ index }` }
                    type='text'
                    onChange={ ( event )=> {
                      handleAddressChange( event, index );
                      } }
                    value={ address.City }
                    label={ aemData.cityTown }
                    required
                  />
                  <TextInput
                    id={ `zipcodeid-${ index }` }
                    type='text'
                    onChange={ ( event )=> {
                      handleAddressChange( event, index );
                      } }
                    value={ address.PostalCode }
                    label={ aemData.zipCode }
                    required
                  />
                  <div className='cmp-form__myaccount-form-field--is-filled'>
                    <div className='cmp-form__myaccount-form-field__control'>
                      <label
                        htmlFor={ `state-${ index }` }
                        className='cmp-form__myaccount-form-field__label'
                      >
                        { aemData.stateLbl }
                      </label>
                      <select id={ `state-${ index }` } onChange={ ( event )=> {
                          handleAddressChange( event, index );
                          } } value={ address.State }
                        className='cmp-form__myaccount-form-field__select'
                      >
                        { states.map( ( option ) => {
                         return ( <option key={ option.value } value={ option.value }>{ option.label }</option> );
                       } ) }
                      </select>
                    </div>
                  </div>
                  <TextInput
                    id={ `country-${ index }` }
                    type='text'
                    onChange={ ( event )=> {
                      handleAddressChange( event, index );
                      } }
                    value='USA'
                    label={ aemData.countryLbl }
                    disabled = {true}
                  />
                </div>
              ) }
                { shippingAddresses.length < 4 && index === shippingAddresses.length - 1 &&
                <div className='cmp-container__myaccount--details shipping-address'>
                  <div className='cmp-container__myaccount--filled-details'>
                    <a
                      href='#'
                      onClick={ ( event ) => handleAddNewShipingAddress( event ) }
                      className='cmp-text__myaccount--filled-details-anchor--delete-address'
                    >
                      Add another Shipping Address
                    </a>
                  </div>
                </div>
                 }
              </div>
            );
        } )
        }
      <div className='cmp-container__myaccount--details shipping-address'>
        <h2 className='cmp-text-myaccount__title--h4'>
          { aemData.phoneHeading }
        </h2>
        <div className='cmp-container__myaccount--filled-details'>
          { !showPhoneChange && (
            <p className='cmp-text__myaccount--filled-details-p'>
              { accountDetails.Phone === null ? '' : accountDetails.Phone }
            </p>
          ) }
          <a
            href='#'
            onClick={ ( event ) => {
              if ( !showPhoneChange ){
                 handleShowEdit( event, 'changePhone' );
                }
              else {
                 handleHideEdit( event, 'changePhone' );
                }
              } }
            className='cmp-text__myaccount--details-edit'
          >
            { !showPhoneChange ? aemData.editBtnLabel : aemData.saveBtnLabel }
          </a>
        </div>
        { showPhoneChange && (
          <div className='cmp-form__myaccount'>
            <div className='cmp-form__myaccount-form-field phone-number-box'>
              <input
                type='text'
                className='cmp-form__myaccount-form-field__input--country-call-code'
                value='+1'
                disabled='disabled'
              />

              <TextInput
                id='phone-number'
                type='text'
                onChange={ ( event ) => handlePhoneChange( event ) }
                value={ accountDetails.Phone }
                label={ aemData.phoneHeading }
                required
              />
            </div>
          </div>
        ) }
      </div>
    </div>
  );
};

ReactMyBeanzAccount.propTypes = {
  aemData: object
};

export default withAem( ReactMyBeanzAccount );
