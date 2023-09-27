/* shipping not responsive to mobile */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { any, string, number, func } from 'prop-types';
import {
  RadioBtnType2,
  RadioBtnType2Item,
  Form,
  FormButton,
  RadioBtnType1,
  RadioBtnType1Item
} from 'xps-react/core/form';
import Address from './address-widget.js';


const ShippingAuth = ( props ) => {
  const { index, isOpen, onNext } = props;
  const nextLabel = 'Next: Payment';
  const dispatch = useDispatch();
  const { fetchRequest } = apiActions;

  function onSubmit( data ) {
    console.log( 'submitted', data );
    onNext( index );
  }

  useEffect( () => {
    const params = { options: { variables: { country: 'US' } } };
    dispatch( fetchRequest( params ) );
  }, [] );

  // const shippingMethods = useSelector( shippingData );
  // const shippingMethodsByLocation = shippingMethods ? shippingMethods.shippingMethodsByLocation : {};


  const hasData = false;
  if ( !isOpen ){
    let txt = '';
    if ( hasData ) {
      const {
        firstName,
        lastName,
        address1,
        city,
        zipCode,
        state,
        country,
        phone
      } = data;

      txt = `${ firstName } ${ lastName }, ${ address1 },
            ${ city }, ${ zipCode }, ${ state }, ${ country }, ${ phone }`;
    }
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
      <Form onSubmit={ onSubmit } formName={ 'shippingAuth' }>
        <div className='shippingAuth__address-forms mb-50'>
          <h4 className='shipping__address'>Shipping Address</h4>
          <RadioBtnType2 name={ 'shippingAddress' }>
            <RadioBtnType2Item
              value={ '0' }
              label={ 'Home Address' }
              labelExt={ 'John Doe, 1877 Geneva Street New York, NY 10013, United States, (386) 328-8467' }
              lnk={ 'Edit' }
              checked
            >
              <Address />
            </RadioBtnType2Item>
            <RadioBtnType2Item
              value={ '1' }
              label={ 'Office Address' }
              labelExt={ 'John Doe, 30 Broad Street New York, NY 10004, United States, (386) 328-8467' }
              lnk={ 'Edit' }
            >
              <Address />
            </RadioBtnType2Item>
            <RadioBtnType2Item
              value={ '2' }
              label={ 'New Address' }
            >
              <Address />
            </RadioBtnType2Item>
          </RadioBtnType2>
        </div>
        <div className='mb-50 mt-10'>
          <h4 className='shipping-title'>Shipping Method</h4>
          <RadioBtnType1 initIndex={ '1' } name={ 'shipping' }>
            <RadioBtnType1Item
              value={ '0' }
              label={ 'Standard Shipping' }
              labelExt={ '7-10 Business Days' }
              price={ 'FREE' }
              checked
            />
            <RadioBtnType1Item
              value={ '1' }
              label={ 'Next Working Day delivery' }
              labelExt={ 'Delivery on the Next Working Day' }
              price={ '$9.95' }
            />
          </RadioBtnType1>
          <div className='pb-10 mt-50'>
            <FormButton label={ nextLabel } disabled={ false } />
          </div>
        </div>
      </Form>
    </>
  );
};

ShippingAuth.propTypes = {
  isOpen: any,
  index: number,
  onNext: func
};

export default ShippingAuth;
