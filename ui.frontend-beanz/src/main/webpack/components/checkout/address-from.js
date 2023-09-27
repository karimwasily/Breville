import React, { Fragment } from 'react';
import { Row } from 'xps-react/core/layout';
import { Input } from 'components/shared-ui/input';
import { states } from './helper';
import { VALIDATOR_REQUIRE as required, VALIDATOR_NUMBER as number } from 'components/shared-ui/input/validators';


export const addressForm = ( type, formState, inputHandler ) => {
  return (
    <Fragment>
      <Input label='FIRST NAME' type='text' id={ `${ type }FirstName` } name={ `${ type }FirstName` } errorMessage='Required' validators={ [required()] }
        initialValid={ type === 'shipping' ? formState.inputs.shippingFirstName.isValid : formState.inputs.billingFirstName.isValid }
        isTouched={ type === 'shipping' ? formState.inputs.shippingFirstName.isTouched : formState.inputs.billingFirstName.isTouched }
        onChange={ inputHandler } initialValue={ type === 'shipping' ? formState.inputs.shippingFirstName.value : formState.inputs.billingFirstName.value }
      />
      <Input label='LAST NAME' type='text' id={ `${ type }LastName` } name={ `${ type }LastName` } errorMessage='Required' validators={ [required()] }
        initialValid={ type === 'shipping' ? formState.inputs.shippingLastName.isValid : formState.inputs.billingLastName.isValid }
        isTouched={ type === 'shipping' ? formState.inputs.shippingLastName.isTouched : formState.inputs.billingLastName.isTouched }
        onChange={ inputHandler } initialValue={ type === 'shipping' ? formState.inputs.shippingLastName.value : formState.inputs.billingLastName.value }
      />
      <Input label='STREET ADDRESS' type='text' id={ `${ type }StreetAddress` } name={ `${ type }StreetAddress` } errorMessage='Required' validators={ [required()] }
        initialValid={ type === 'shipping' ? formState.inputs.shippingStreetAddress.isValid : formState.inputs.billingStreetAddress.isValid }
        isTouched={ type === 'shipping' ? formState.inputs.shippingStreetAddress.isTouched : formState.inputs.billingStreetAddress.isTouched }
        onChange={ inputHandler } initialValue={ type === 'shipping' ? formState.inputs.shippingStreetAddress.value : formState.inputs.billingStreetAddress.value }
      />
      <Input label='ADDRESS LINE2(OPTIONAL)' type='text' id={ `${ type }StreetAddress2` } name={ `${ type }StreetAddress2` } validators={ [] }
        initialValid={ true }
        isTouched={ type === 'shipping' ? formState.inputs.shippingStreetAddress2.isTouched : formState.inputs.billingStreetAddress2.isTouched }
        onChange={ inputHandler } initialValue={ type === 'shipping' ? formState.inputs.shippingStreetAddress2.value : formState.inputs.billingStreetAddress2.value }
      />
      <Input label='CITY/TOWN' type='text' id={ `${ type }CityTown` } name={ `${ type }CityTown` } errorMessage='Required' validators={ [required()] }
        initialValid={ type === 'shipping' ? formState.inputs.shippingCityTown.isValid : formState.inputs.billingCityTown.isValid }
        isTouched={ type === 'shipping' ? formState.inputs.shippingCityTown.isTouched : formState.inputs.shippingCityTown.isTouched }
        onChange={ inputHandler } initialValue={ type === 'shipping' ? formState.inputs.shippingCityTown.value : formState.inputs.billingCityTown.value }
      />
      <Input label='ZIPCODE' type='text' id={ `${ type }Zipcode` } name={ `${ type }Zipcode` } errorMessage='Required' validators={ [required()] }
        initialValid={ type === 'shipping' ? formState.inputs.shippingZipcode.isValid : formState.inputs.billingZipcode.isValid }
        isTouched={ type === 'shipping' ? formState.inputs.shippingZipcode.isTouched : formState.inputs.billingZipcode.isTouched }
        onChange={ inputHandler } initialValue={ type === 'shipping' ? formState.inputs.shippingZipcode.value : formState.inputs.billingZipcode.value }
      />
      <Input element='select' className='cmp-form__checkout-form-field__select' onChange={ inputHandler } errorMessage='Required' options={ states } id={ `${ type }States` }
        initialValid={ type === 'shipping' ? formState.inputs.shippingStates.isValid : formState.inputs.billingStates.isValid }
        isTouched={ type === 'shipping' ? formState.inputs.shippingStates.isTouched : formState.inputs.billingStates.isTouched }
        validators={ [required()] } initialValue={ type === 'shipping' ? formState.inputs.shippingStates.value : formState.inputs.billingStates.value }
      />
      <Row>
        <span className='cmp-text__checkout--country'>United States</span>
      </Row>
      <Row alignItems='center' justify='space-between'>
        <span className='cmp-form__checkout--country-code'>USA +1</span> <span className='cmp-form__checkout-input--phone-number'>
          <Input label='PHONE' type='text' id={ `${ type }Phone` } name={ `${ type }Phone` } errorMessage='Please enter valid phone number' validators={ [required(), number()] }
            initialValid = { type === 'shipping' ? formState.inputs.shippingPhone.isValid : formState.inputs.billingPhone.isValid }
            isTouched={ type === 'shipping' ? formState.inputs.shippingPhone.isTouched : formState.inputs.billingPhone.isTouched }
            initialValue={ type === 'shipping' ? formState.inputs.shippingPhone.value : formState.inputs.billingPhone.value } onChange={ inputHandler }
          />
        </span>
      </Row>
    </Fragment>
  );
};