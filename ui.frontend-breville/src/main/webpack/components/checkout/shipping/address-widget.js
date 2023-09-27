import React from 'react';
import { Grid, Row, Col } from 'xps-react/core';
import { Validation } from 'xps-react/core/form/breville';
import { Select, Input } from 'xps-react/core/form/breville';
import states from './states-us.json';

const AddressWidget = ( props ) => {
  const { address, index } = props;
  const options = states;
  const {
    email,
    firstName,
    lastName,
    address1,
    address2,
    city,
    zipCode,
    state,
    country,
    phone
  } = address;

  return (
    <>
      <Grid className='shipping__grid'>
        <Row noGutters={ true }>
          <Col md='6'>
            <Input
              type={ 'email' }
              defaultValue={ email }
              name={ `${ index }_email` }
              label={ 'Email*' }
              validation={ Validation.email }
            />
          </Col>
        </Row>
        <Row noGutters={ true }>
          <Col md='6'>
            <Input
              defaultValue={ firstName }
              type={ 'text' }
              name={ `${ index }_firstName` }
              label={ 'First Name*' }
              validation={ Validation.name }
            />
          </Col>
          <Col md='6'>
            <Input
              type={ 'text' }
              name={ `${ index }_lastName` }
              defaultValue={ lastName }
              label={ 'Last Name*' }
              validation={ Validation.name }
            />
          </Col>
        </Row>
        <Row noGutters={ true }>
          <Col>
            <Input
              type={ 'text' }
              name={ `${ index }_address1` }
              defaultValue={ address1 }
              label={ 'Address 1*' }
              validation={ Validation.address }
            />
          </Col>
        </Row>
        <Row noGutters={ true }>
          <Col>
            <Input
              type={ 'text' }
              name={ `${ index }_address2` }
              defaultValue={ address2 }
              label={ 'Address 2' }
            />
          </Col>
        </Row>
        <Row noGutters={ true }>
          <Col md='6'>
            <Input
              type={ 'text' }
              name={ `${ index }_country` }
              defaultValue={ country }
              label={ 'Country' }
              placeHolder={ 'United States' }
              readOnly={ true }
            />
          </Col>
          <Col md='6'>
            <Input
              type={ 'text' }
              name={ `${ index }_city` }
              defaultValue={ city }
              label={ 'City/Town*' }
              validation={ Validation.city }
            />
          </Col>
        </Row>
        <Row noGutters={ true }>
          <Col md='6'>
            <Select
              name={ `${ index }_state` }
              defaultValue={ state }
              label={ 'State*' }
              options={ options }
            />
          </Col>
          <Col md='6'>
            <Input
              type={ 'text' }
              name={ `${ index }_zipCode` }
              defaultValue={ zipCode }
              label={ 'Zip Code*' }
              validation={ Validation.zipCode }
            />
          </Col>
        </Row>
        <Row noGutters={ true }>
          <Col md='6'>
            <Input
              type={ 'text' }
              name={ `${ index }_phone` }
              defaultValue={ phone }
              label={ 'Phone Number*' }
              validation={ Validation.phone }
            />
          </Col>
        </Row>
      </Grid>
    </> );
};
export default AddressWidget;
