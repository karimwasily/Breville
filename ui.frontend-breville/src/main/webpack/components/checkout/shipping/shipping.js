/* shipping not responsive to mobile */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { any, number, func } from 'prop-types';
import { Grid, Row, Col } from 'xps-react/core';

import {
  FormButton,
  Form
} from 'xps-react/core/form/breville';

import {
  RadioBtnType1,
  RadioBtnType1Item
} from 'xps-react/core/form/breville/non-standard/radio-btn-type-1';

import { selectShippingMethods, selectState, selectCheckoutLoading } from 'library/store/checkout/selector';
import { selectPageLoading } from 'library/store/ui/selectors';
import { pageLoading } from 'library/store/ui/actions';
import { setIsValid, setIsDirty, setCurIndex, updateCartAddress, getShippingMethods } from 'library/store/checkout/actions';
import { SHIPPING_BTN_ID } from 'components/checkout/constants';

import AddressWidget from './address-widget.js';
import { INITIAL_ADDRESS } from '../constants.js';

const Shipping = ( props ) => {
  const { index, isOpen, onNext } = props;
  const dispatch = useDispatch();
  const nextLabel = 'Next: Payment';

  const [billingChecked, setBillingChecked] = useState( true );
  const [next, setNext] = useState( false );

  const checkoutState = useSelector( selectState );
  const shippingAddress = checkoutState.address ? checkoutState.address['1'] : INITIAL_ADDRESS;
  const billingAddress = checkoutState.address ? checkoutState.address['2'] : INITIAL_ADDRESS;

  const checkoutLoading = useSelector( selectCheckoutLoading );

  const loading = useSelector( selectPageLoading );


  const shippingMethods = useSelector( selectShippingMethods );
  const shippingMethodIndex = 0;

  function onSubmit( params ) {
    dispatch( pageLoading( true ) );
    setNext( true );
    dispatch( updateCartAddress( { params } ) );
  }

  useEffect( () => {
    if ( !loading && next ) {
      onNext( index );
      setNext( false );
    }
  }, [next, loading] );

  useEffect( () => {
    const params = { options: { variables: { country: 'US' } } };
    dispatch( getShippingMethods( { params } ) );
  }, [] );

  useEffect( () => {
    if ( isOpen ) {
      dispatch( setCurIndex( index ) );
    }
  }, [isOpen] );

  function callback( isValid, isDirty ) {
    dispatch( setIsValid( isValid, index ) );
    dispatch( setIsDirty( isDirty, index ) );
  }

  function handleBillingCheckbox( event ) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setBillingChecked( value );
  }

  if ( !isOpen ){
    const {
      firstName,
      lastName,
      address1,
      city,
      zipCode,
      state,
      country,
      phone
    } = shippingAddress;

    const txt = `${ firstName } ${ lastName }, ${ address1 },
         ${ city }, ${ zipCode }, ${ state }, ${ country }, ${ phone }`;
    return (
      <>
        <div className='shipping-valid'>
          <div className='shipping-valid__card'>
            <h4 className='shipping-valid__title'>Shipping Address</h4>
            <p className='shipping-valid__txt'>{ txt }</p>
          </div>
          <div className='shipping-valid__card'>
            <h4 className='shipping-valid__title'>Shipping Method</h4>
            <p className='shipping-valid__txt'>Standard Shipping</p>
            <p className='shipping-valid__txt'>7-10 Business Days</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      { checkoutLoading && <Form onSubmit={ onSubmit } formName={ 'not-used' }>
        <h4 className='shipping__address'>Shipping Address</h4>

        <AddressWidget index={ 1 } address={ INITIAL_ADDRESS } />
        <div className='form-checkbox-wrap mb-20'>
          <input
            name='billingChecked'
            type='checkbox'
            checked={ billingChecked }
            onChange={ handleBillingCheckbox }
            className='form-checkbox'
          />
          <label className='form-checkbox-label' htmlFor='billingChecked'>Use Shipping address for billing</label>
        </div>

        <div>
          { !billingChecked &&
          <>
            <h4 className='shipping__address'>Billing Address</h4>
            <AddressWidget index={ 2 } address={ billingAddress } />
          </>
          }
        </div>

        <Grid className='shipping__grid mb-50 mt-50'>
          <Row noGutters={ true }>
            <Col>
              <h4 className='shipping-title'>Shipping Method</h4>
              <RadioBtnType1 name={ 'shippingMethod' }>
                {
                shippingMethods && shippingMethods.map( ( method, index ) => {
                  const price = method.zoneRates[0].shippingRates[0].price.centAmount / 100;
                  return <RadioBtnType1Item
                    key={ index }
                    value={ index.toString() }
                    label={ method.name }
                    labelExt={ '7-10 Business Days' }
                    price={ `$${ price.toFixed( 2 ) }` }
                    checked={ shippingMethodIndex === index }
                  />;
                  } )
              }
              </RadioBtnType1>
            </Col>
          </Row>
          <Row noGutters={ true }>
            <Col md='6' className='mt-35 mb-10'>
              <FormButton label={ nextLabel } disabled={ false } id={ SHIPPING_BTN_ID } />
            </Col>
          </Row>
        </Grid>
      </Form>
      }
      { !checkoutLoading && <Form onSubmit={ onSubmit } formName={ 'shipping' } callback={ callback }>
        <h4 className='shipping__address'>Shipping Address</h4>

        <AddressWidget index={ 1 } address={ shippingAddress } />
        <div className='form-checkbox-wrap mb-20'>
          <input
            name='billingChecked'
            type='checkbox'
            checked={ billingChecked }
            onChange={ handleBillingCheckbox }
            className='form-checkbox'
          />
          <label className='form-checkbox-label' htmlFor='billingChecked'>Use Shipping address for billing</label>
        </div>
        <div>
          { !billingChecked &&
          <>
            <h4 className='shipping__address'>Billing Address</h4>
            <AddressWidget index={ 2 } address={ billingAddress } />
          </>
          }
        </div>

        <Grid className='shipping__grid mb-50 mt-50'>
          <Row noGutters={ true }>
            <Col>
              <h4 className='shipping-title'>Shipping Method</h4>
              <RadioBtnType1 name={ 'shippingMethod' }>
                {
                shippingMethods && shippingMethods.map( ( method, index ) => {
                  const price = method.zoneRates[0].shippingRates[0].price.centAmount / 100;
                  return <RadioBtnType1Item
                    key={ index }
                    value={ index.toString() }
                    label={ method.name }
                    labelExt={ '7-10 Business Days' }
                    price={ `$${ price.toFixed( 2 ) }` }
                    checked={ shippingMethodIndex === index }
                  />;
                  } )
              }
              </RadioBtnType1>
            </Col>
          </Row>
          <Row noGutters={ true }>
            <Col md='6' className='mt-35 mb-10'>
              <FormButton label={ nextLabel } disabled={ false } id={ SHIPPING_BTN_ID } />
            </Col>
          </Row>
        </Grid>
      </Form>
      }
    </> );
};

Shipping.propTypes = {
  isOpen: any,
  index: number,
  onNext: func
};

export default Shipping;


