import React from 'react';
import { Grid, Row, Col } from 'xps-react/core';
import { FormButton, Select, Input, Validation } from 'xps-react/core/form';
import Button from 'xps-react/core/button';
import { useTranslation } from 'react-i18next';

import { array, object, string, func, bool } from 'prop-types';
import RemoveAddress from './remove-address';

const EditAddressForm = ( props ) => {
  const { address, isEdit, onRemoveFn, onCancelFn, stateOptions, stateDefaultValue } = props,
    { t } = useTranslation(),
    isDefaultAddress = address.addressId === 'default';

  function doRemoveAddress() {
    if ( isEdit && typeof onRemoveFn === 'function' ) {
      onRemoveFn( address );
    }
  }

  function doCancelEdit() {
    if ( onCancelFn && typeof onCancelFn === 'function' ) {
      onCancelFn();
    }
  }

  return (
    <Grid className='cmp-address__grid'>
      <Row noGutters={ true } className='cmp-container-address'>
        <Col>
          <Input type={ 'text' } name={ 'address1' } label={ `${ t( 'eh-label-address1' ) } *` } validation={ Validation.address } />
        </Col>
      </Row>
      <Row noGutters={ true } className='cmp-container-address'>
        <Col>
          <Input type={ 'text' } name={ 'address2' } label={ `${ t( 'eh-label-address2' ) }` } />
        </Col>
      </Row>
      <Row noGutters={ true } className='cmp-container-address'>
        <Col className='mr-10'>
          <Input type={ 'text' } name={ 'country' } label={ `${ t( 'eh-label-country' ) }` } defaultValue={ 'Australia' } readOnly={ true } />
        </Col>
        <Col className='ml-10'>
          <Input type={ 'text' } name={ 'city' } label={ `${ t( 'eh-label-city' ) } / ${ t( 'eh-label-town' ) } *` } validation={ Validation.city } />
        </Col>
      </Row>
      <Row noGutters={ true } className='cmp-container-address'>
        <Col className='mr-10'>
          <Select name={ 'state' } label={ `${ t( 'eh-label-state' ) } *` } options={ stateOptions } Validation={ Validation.state } defaultValue={ stateDefaultValue } />
        </Col>
        <Col className='ml-10'>
          <Input type={ 'text' } name={ 'zipCode' } label={ `${ t( 'eh-label-zip' ) } *` } validation={ Validation.zipCode } />
        </Col>
      </Row>
      {
          isEdit && !isDefaultAddress && (
            <Row noGutters={ true } className='cmp-container-address'>
              <Col className='mr-10 cmp-link'>
                <RemoveAddress onRemoveFn={ doRemoveAddress }>
                  <p>{ t( 'eh-text-confirming-remove-address' ) }</p>
                </RemoveAddress>
              </Col>
              <Col className='ml-10'></Col>
            </Row>
          )
        }
      <Row noGutters={ true } className='cmp-container-address'>
        <Col className='mr-10 cmp-form--buttons'>
          <Button label='Cancel' disabled={ false } className='cmp-button' onClick={ doCancelEdit }>
            { t ( 'eh-button-cancel' ) }
          </Button>
          <FormButton label='Save' />
        </Col>
        <Col className='ml-10'></Col>
      </Row>
    </Grid>
  );
};

EditAddressForm.defaultProps = {
  onCancelFn: () => void 0,
  onRemoveFn: () => void 0,
  isEdit: false
};

EditAddressForm.propTypes = {
  address: object.isRequired,
  isEdit: bool.isRequired,
  onRemoveFn: func,
  onCancelFn: func,
  stateOptions: array.isRequired,
  stateDefaultValue: string.isRequired
};

export default EditAddressForm;
