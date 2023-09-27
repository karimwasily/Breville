import React, { useState, useCallback, useEffect, Fragment, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from 'react-responsive';
import { ShippingModal } from './shippingModal';
import classNames from 'classnames';
import { Grid, Row, Col } from 'xps-react/core/layout';
import { BeanzSpinner } from 'components/ReactCart/BeanzSpinner';
import { Input } from 'components/shared-ui/input';
import DownArrow from '../../resources/images/downarrow.svg';
import userSchema from 'library/schema/users';
import { Item } from './checkout-item';
import { payment } from '../../aem-components/beanz/payment/js/payment';
import { getActiveCart, updateActiveCart } from '../../library/store/checkout/actions';
import { fetchUser, updateUserShippingAddress } from '../../library/store/user/actions';
import { addressForm } from './address-from';
import { totalAmount } from './content';
import { paymentForm } from './payment-from';
import { countries, getUpdatedAddress, inputsFields, mapAddress,
  emptyCartHandler, formReducer, accountShippingAddress, mapGoogleAutocompleteAddress } from './helper';
import { selectIsCartEmpty, selectActiveCart, selectUpdatedCart, selectIsLoading } from '../../library/store/checkout/selector';
import { selectLogedInUser } from '../../library/store/user/selector';

import { initAutocomplete } from './autocomplete';
import { VALIDATOR_REQUIRE as required, VALIDATOR_EMAIL as email } from 'components/shared-ui/input/validators';
import { shippingAddressView, addressSubmitRequest } from './analytics-update';

export const Checkout = () => {

  const isEmptyCart = useSelector( selectIsCartEmpty );
  let loading = useSelector( selectIsLoading );
  const activeCart = useSelector( selectActiveCart );
  const updatedCart = useSelector( selectUpdatedCart );
  const logedInUser = useSelector( selectLogedInUser );

  const isWelcomed = localStorage.getItem( 'userWelcomed' );
  let cartVersion = parseInt( localStorage.getItem( 'cartversion' ) );
  const cartID = localStorage.getItem( 'cartID' );
  const locale = 'en';
  const referenceID = uuidv4();
  const isBigScreen = useMediaQuery( { query: '(min-device-width: 768px)' } );
  const isSmallScreen = useMediaQuery( { query: '(max-device-width: 767px)' } );
  const border = classNames( { border: isBigScreen } );

  const [cartItems, setCartItems] = useState();
  const [shippingTax, setShippingTax] = useState();
  const [cartTotalPrice, setCartTotalPrice] = useState();
  const [showDetails, setShowDetails] = useState( false );
  const [showButton, setShowButton] = useState( true );
  const [isLoading, setIsLoading] = useState( false );
  const [isModelOpen, setIsModelOpen] = useState( false );
  if ( typeof ( loading ) === 'undefined' ) loading = true;
  const dispatchAction = useDispatch();

  const [formState, dispatch] = useReducer( formReducer, {
    inputs: inputsFields.inputs,
    isValid: false
  } );

  const [sections, setSections] = useState( {
    email: true,
    shippingAddress: false,
    billingAddress: false,
    payment: false
  } );

  const [sectionEdit, setSectionEdit] = useState( {
    email: true,
    shippingAddress: true,
    billingAddress: true,
    payment: true
  } );

  useEffect( () => {
    if ( isWelcomed === 'true' ) {
      dispatchAction( fetchUser() );
    }
    const payload = {
      variables: userSchema.GoToCartVariables
    };
    dispatchAction( getActiveCart( payload ) );
    const sameBillingAddress = localStorage.getItem( 'sameBillingAddress' );
    dispatch( { type: 'INPUT_CHANGE', value: sameBillingAddress !== 'false', isValid: true, inputId: 'sameBillingAddress', isTouched: true } );
  }, [] );

  const updateAddress = ( type, address ) => {
    const autocompleteAddress = mapGoogleAutocompleteAddress( type, address );
    setSections( { ...sections, shippingAddress: false } );
    Object.keys( autocompleteAddress ).map( function ( key ) {
      dispatch( { type: 'INPUT_CHANGE', value: autocompleteAddress[key], isValid: true, inputId: key, isTouched: true } );
    } );
    setSections( { ...sections, shippingAddress: true } );
  };

  useEffect( () => {
    if ( sections.shippingAddress && sectionEdit.shippingAddress ) {
      initAutocomplete( updateAddress, 'shippingStreetAddress' );
      if ( !formState.inputs.sameBillingAddress.value ) {
        initAutocomplete( updateAddress, 'billingStreetAddress' );
      }
    }
  }, [sections, sectionEdit] );

  useEffect( ()=>{
    if ( isEmptyCart ) {
      localStorage.setItem ( 'cartEmpty', 'true' );
      emptyCartHandler();
    }
    else {
      localStorage.setItem( 'cartEmpty', 'false' );
    }
  }, [isEmptyCart] );

  useEffect( ()=>{
    setIsLoading( loading );
  }, [loading] );

  useEffect( () => {
    if ( isWelcomed === 'true' ) {
      if ( activeCart && Object.entries( activeCart ).length > 0 && Object.entries( logedInUser ).length > 0 ) {
        setInitalFormData( activeCart, logedInUser );
      }
    }
    else {
      if ( activeCart && Object.entries( activeCart ).length > 0 ) {
        setInitalFormData( activeCart, logedInUser );
      }
    }
  }, [activeCart, logedInUser] );

  const paymentLoadingHandler = ( status ) => {
    setIsLoading( false );
    if ( !status ) {
      setShowButton( true );
      setSections( { email: true, shippingAddress: true, billingAddress: true, payment: false } );
    }
  };

  useEffect( () => {
    if ( Object.entries( updatedCart ).length > 0 ) {
      setShippingTax( updatedCart.shippingInfo?.price );
      setCartTotalPrice( updatedCart.taxedPrice?.totalGross );
      setShowButton( false );
      setCartItems( updatedCart );
      addressSubmitRequest();
      if ( isWelcomed === 'true' ) {
        setIsModelOpen( true );
      }
      payment( paymentLoadingHandler, updatedCart, formState.inputs.email.value );
    }
  }, [updatedCart] );

  const inputHandler = useCallback( ( id, value, isValid ) => {
    dispatch( { type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id, isTouched: formState.inputs[id].isTouched } );
  }, [] );

  const setInitalFormData = ( activeCart, account ) => {
    setCartItems( activeCart );
    setCartTotalPrice( activeCart.taxedPrice ? activeCart?.taxedPrice?.totalGross : activeCart?.totalPrice );
    setShippingTax( activeCart.shippingInfo ? activeCart.shippingInfo.price : '' );
    let shippingAddress, billingAddress;
    cartVersion = activeCart.version;
    const email = isWelcomed === 'true' ? account?.records[0]?.PersonEmail : activeCart?.customerEmail;
    if ( email && !formState.inputs.email.value ) {
      dispatch( { type: 'INPUT_CHANGE', value: email, isValid: true, inputId: 'email', isTouched: true } );
      setSectionEdit( { email: false, shippingAddress: true, billingAddress: true, payment: true } );
      setSections( { email: true, shippingAddress: true, billingAddress: true, payment: false } );
    }
    else {
      setSections( { email: true, shippingAddress: false, billingAddress: false, payment: false } );
    }
    if ( isWelcomed === 'true' ) {
      if ( account?.records[0]?.ShippingPostalCode ) {
        shippingAddress = mapAddress( account?.records[0], true, 'shipping' );
      }
    }
    else {
      if ( activeCart.shippingAddress ) {
        shippingAddress = mapAddress( activeCart.shippingAddress, false, 'shipping' );
        const cartBillingAddress = formState.inputs.sameBillingAddress.value ? activeCart.shippingAddress : activeCart.billingAddress;
        billingAddress = mapAddress( cartBillingAddress, false, 'billing' );
      }
    }

    if ( shippingAddress ) {
      let isEdit = false;
      if ( !formState.inputs.sameBillingAddress.value && !billingAddress ) {
        isEdit = true;
      }
      setSections( { email: true, shippingAddress: true, billingAddress: true, payment: false } );
      setSectionEdit( { email: false, shippingAddress: isEdit, billingAddress: false, payment: true } );
      Object.keys( shippingAddress ).map( function ( key ) {
        let valid = !shippingAddress[ key ];
        if ( key === 'shippingStreetAddress2' ) valid = false;
        dispatch( { type: 'INPUT_CHANGE', value: shippingAddress[key], isValid: !valid, inputId: key, isTouched: true } );
      } );
    }
    if ( billingAddress ) {
      Object.keys( billingAddress ).map( function ( key ) {
        let valid = !billingAddress[ key ];
        if ( key === 'billingStreetAddress2' ) valid = false;
        dispatch( { type: 'INPUT_CHANGE', value: billingAddress[key], isValid: !valid, inputId: key, isTouched: true } );
      } );
    }
    setIsLoading( false );
  };

  function onSubmit( event ) {
    event.preventDefault();
    if ( formState.isValid ) {
      setIsLoading( true );
      setSections( { email: true, shippingAddress: true, billingAddress: true, payment: true } );
      setSectionEdit( { email: false, shippingAddress: false, billingAddress: false, payment: false } );
      let updatedShippingAddress, updatedBillingAddress;
      if ( formState.inputs.sameBillingAddress.value ) {
        updatedShippingAddress = getUpdatedAddress( formState.inputs, true );
        updatedBillingAddress = updatedShippingAddress;
      }
      else {
        updatedShippingAddress = getUpdatedAddress( formState.inputs, true );
        updatedBillingAddress = getUpdatedAddress( formState.inputs, false );
      }
      updatedShippingAddress['id'] = referenceID;
      const payload = {
        variables: {
          actions: [
            { setBillingAddress: { address: updatedBillingAddress } },
            { setShippingAddress: { address: updatedShippingAddress } },
            { setCustomerEmail: { email: formState.inputs.email.value } }
          ],
          id: cartID, version: cartVersion, locale: locale }
      };
      dispatchAction( updateActiveCart( payload ) );
    }
    else {
      Object.keys( formState.inputs ).map( function ( key ) {
        dispatch( { type: 'INPUT_CHANGE', value: formState.inputs[key].value, isValid: formState.inputs[key].isValid, inputId: key, isTouched: true } );
      } );
      setSectionEdit( { email: false, shippingAddress: true, billingAddress: true, payment: false } );
    }
  }

  function handleBillingAddress( event ) {
    localStorage.setItem( 'sameBillingAddress', event.currentTarget.checked );
    dispatch( { type: 'INPUT_CHANGE', value: event.currentTarget.checked, isValid: true, inputId: 'sameBillingAddress', isTouched: true } );
    setSections( { ...sections, billingAddress: true } );
  }

  function editDataHandler( event ) {
    const section = event.currentTarget.dataset.section;
    setSectionEdit( { ...sectionEdit, [section]: true } );
    if ( section === 'shippingAddress' ) {
      setSections( { ...sections, payment: false } );
      setShowButton( true );
    }
    else if ( section === 'email' ) {
      setSections ( { ...sections, shippingAddress: false, payment: false } );
    }
  }

  function continueToShipping() {
    if ( formState.inputs.email.isValid ) {
      shippingAddressView();
      setShowButton( true );
      setSectionEdit( { ...sectionEdit, shippingAddress: true, email: false } );
      setSections( { ...sections, shippingAddress: true } );
    }
    else {
      dispatch( { type: 'INPUT_CHANGE', value: formState.inputs.email.value, isValid: false, inputId: 'email', isTouched: true } );
    }
  }

  function toggleDetailsHandler() {
    setShowDetails( ( prevState ) => !prevState );
  }

  function updateAccountShippingAddress() {
    if ( isWelcomed === 'true' ) {
      const payload = {
        url: logedInUser?.records[0]?.Id,
        data: accountShippingAddress( formState.inputs )
      };
      dispatchAction( updateUserShippingAddress( payload ) );
      setIsModelOpen( false );
    }
  }

  function shippingModalClose() {
    setIsModelOpen( false );
  }

  return (
    <Grid className='cmp-container__checkout-root cmp-teaser__checkout-wrapper d-none'>
      { isLoading && <BeanzSpinner /> }
      <Fragment>
        <h1 className='cmp-text__checkout--heading'>Your Order</h1>
        { isSmallScreen &&
          <Fragment>
            { cartItems?.lineItems?.map( ( product, index ) => {
                return (
                  <Item key={ index } { ...product } details={ showDetails } />
                );
              } )
            }
            { totalAmount( shippingTax, cartTotalPrice ) }
            <div onClick={ toggleDetailsHandler } onKeyPress={ toggleDetailsHandler } className='cmp-text__checkout--toggle-details' role='button' tabIndex={ 0 }>
              <DownArrow />
              { showDetails ? 'HIDE' : 'DETAILS' }
              <DownArrow />
            </div>
          </Fragment>
        }
        <Row>
          <Col md={ 7 } className={ `cmp-teaser__checkout-left-wrapper ${ border }` }>
            <div className='cmp-container__checkout-email--wrapper'>
              <Row>
                <Col>
                  <h4 className='cmp-text__checkout--sub-heading'>1. Emails</h4>
                  { sections.email && (
                    <Fragment>
                      { !sectionEdit.email ?
                        <Row>
                          <Fragment>
                            <Col><span className='cmp-text__checkout--saved-email'>{ formState.inputs.email.value }</span></Col>
                            { isWelcomed !== 'true' &&
                              <span role='button' className='cmp-text__checkout--edit email' data-section='email' onClick={ editDataHandler } onKeyPress={ editDataHandler } tabIndex='0'>Edit </span>
                            }
                          </Fragment>
                        </Row> :
                        <div className='cmp-container__checkout-email--box'>
                          <Row>
                            <Col>
                              <Input label='Email' type='text' id='email' name='email' errorMessage='Plese enter a valid email address.'
                                validators={ [required(), email()] } onChange={ inputHandler } initialValue={ formState.inputs.email.value }
                                initialValid={ formState.inputs.email.isValid } isTouched={ formState.inputs.email.isTouched }
                              />
                            </Col>
                          </Row>
                          <button className='payment-button' onClick={ continueToShipping }>  Continue to Shipping </button>
                        </div>
                    }
                    </Fragment>
                  ) }
                </Col>
              </Row>
            </div>
            <hr className='cmp-hr__border-bottom' />
            <Row>
              <Col>
                <h4 className='cmp-text__checkout--sub-heading'>2. Shipping Address</h4>
              </Col>
              { sections.shippingAddress && !sectionEdit.shippingAddress && <span className='cmp-text__checkout--edit' role='button'
                data-section='shippingAddress' onClick={ editDataHandler } onKeyPress={ editDataHandler } tabIndex='0'
              >Edit</span>
              }
            </Row>
            { sections.shippingAddress && <Fragment>
              <form>
                { !sectionEdit.shippingAddress ?
                  ( <Fragment>
                    <div className='cmp-container__checkout-shipping--wrapper'>
                      <Row className='left'>
                        <Col className='cmp-grid__checkout-address--col'>
                          <label htmlFor='name' className='cmp-text__checkout--saved-label'>Name</label>
                          <span className='cmp-text__checkout--saved'>{ `${ formState.inputs.shippingFirstName.value } ${ formState.inputs.shippingLastName.value }` }</span>
                        </Col>
                      </Row>
                      <Row className='left'>
                        <Col className='cmp-grid__checkout-address--col'>
                          <label htmlFor='address' className='cmp-text__checkout--saved-label'>Address</label>
                          <span className='cmp-text__checkout--saved'>
                            { `${ formState.inputs.shippingStreetAddress.value }, 
                              ${ formState.inputs.shippingStreetAddress2.value && `${ formState.inputs.shippingStreetAddress2.value },` }
                            ${ formState.inputs.shippingCityTown.value }, ${ formState.inputs.shippingZipcode.value }, ${ formState.inputs.shippingStates.value }` }
                          </span>
                        </Col>
                      </Row>
                      <Row className='left'>
                        <Col className='cmp-grid__checkout-address--col'>
                          <label htmlFor='phone' className='cmp-text__checkout--saved-label'>Phone</label>
                          <span className='cmp-text__checkout--saved'>{ formState.inputs.shippingPhone.value }</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h4 className='cmp-text__checkout--sub-heading'>Billing Address</h4>
                        </Col>
                      </Row>
                      { formState.inputs.sameBillingAddress.value ? <Row className='left'>
                        <Col className='cmp-grid__checkout-address--col'>
                          <span className='left cmp-text__checkout--billing-addres--label'>Use shipping address as billing address</span>
                        </Col>
                      </Row> :
                      <Fragment>
                        <Row className='left'>
                          <Col className='cmp-grid__checkout-address--col'>
                            <label htmlFor='name' className='cmp-text__checkout--saved-label'>Name</label>
                            <span className='cmp-text__checkout--saved'>{ `${ formState.inputs.billingFirstName.value } ${ formState.inputs.billingLastName.value }` }</span>
                          </Col>
                        </Row>
                        <Row className='left'>
                          <Col className='cmp-grid__checkout-address--col'>
                            <label htmlFor='address' className='cmp-text__checkout--saved-label'>Address</label>
                            <span className='cmp-text__checkout--saved'>{
                              `${ formState.inputs.billingStreetAddress.value }, 
                              ${ formState.inputs.billingStreetAddress2.value && `${ formState.inputs.billingStreetAddress2.value },` }
                              ${ formState.inputs.billingCityTown.value }, ${ formState.inputs.billingZipcode.value }, ${ formState.inputs.billingStates.value }` }
                            </span>
                          </Col>
                        </Row>
                        <Row className='left'>
                          <Col className='cmp-grid__checkout-address--col'>
                            <label htmlFor='phone' className='cmp-text__checkout--saved-label'>Phone</label>
                            <span className='cmp-text__checkout--saved'>{ formState.inputs.billingPhone.value }</span>
                          </Col>
                        </Row>
                      </Fragment>
                      }
                    </div>
                  </Fragment> ) :
                  <div className='cmp-container__checkout-shipping--wrapper'>
                    <div className='cmp-container__checkout-address--box'>
                      { addressForm( 'shipping', formState, inputHandler ) }
                      <Row alignItems='center' className='cmp-checkout__shipping-adress-checkobox'>
                        <Col className='cmp-col__checkout__shipping-adress-checkobox'>
                          <input type='checkbox' id='sameBillingAddress' name='sameBillingAddress' className='cmp-form__checkout__shipping-adress-checkobox--input'
                            onChange={ handleBillingAddress } checked={ formState.inputs.sameBillingAddress.value }
                          />
                          <label htmlFor='sameBillingAddress' className='cmp-checkout__shipping-adress-checkobox--label'>Tick to use same billing address</label>
                        </Col>
                      </Row>
                      { !formState.inputs.sameBillingAddress.value && ( <Fragment>
                        <h4 className='cmp-text__checkout--sub-heading'>Billing Address</h4>
                        <Input
                          element='select'
                          className='cmp-form__checkout-form-field__select'
                          onChange={ inputHandler }
                          options={ countries }
                          id='countries'
                          initialValid={ true }
                          initialValue={ formState.inputs.countries.value }
                          validators={ [] }
                        />
                        { addressForm( 'billing', formState, inputHandler ) }
                      </Fragment> ) }
                    </div>
                  </div> }
                { showButton && <div className='cmp-container__checkout-payemnt--box'>
                  <button className='payment-button' type='button' onClick={ onSubmit }>Continue to Payment</button>
                </div> }

              </form>
            </Fragment>
            }
            <hr className='cmp-hr__border-bottom' />
            <h4 className='cmp-text__checkout--sub-heading'>3. Payment</h4>
            { sections.payment && paymentForm() }

          </Col>
          { isBigScreen && <Row className='cmp-checkout__right-content'>
            <Col>
              {
                cartItems?.lineItems?.map( ( product, index ) => {
                  return (
                    <Item key={ index } { ...product } details={ true } />
                  );
                } )
              }
              { cartTotalPrice && totalAmount( shippingTax, cartTotalPrice ) }
            </Col>
          </Row> }
        </Row>
        { isModelOpen && <ShippingModal isOpen={ isModelOpen } onModalClosed={ shippingModalClose } onSaveData={ updateAccountShippingAddress }> </ShippingModal> }
      </Fragment>
    </Grid> );
};