import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDerivedUserDetail } from 'library/store/mybreville/selector';
import { updateUserDetail, setNotificationText } from 'library/store/mybreville/actions';
import { Row, Col } from 'xps-react/core';
import Button from 'xps-react/core/button';
import { Form, Input, FormButton, Validation } from 'xps-react/core/form';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// todo: where will the phone number country code eventually come from?
const phoneCode = '+1';

const EditAccountDetails = ( ) => {

  const userDetail = useSelector( selectDerivedUserDetail );
  const {
    FirstName: firstName,
    LastName: lastName,
    PersonEmail: email,
    Phone: phone
  } = userDetail;

  const defaultValues = {
    firstName,
    lastName,
    email,
    phone
  };

  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  function onUpdateSuccess() {
    dispatch( setNotificationText( t ( 'eh-message-personal-details-has-been-edited' ) ) );
    history.push( '/account-details' );
  }

  function onUpdateFail() {
    dispatch( setNotificationText( t ( 'eh-message-personal-details-has-failed' ) ) );
  }

  function handleSubmit( values ) {
    dispatch( updateUserDetail( {
      data: values,
      successCallback: onUpdateSuccess,
      failCallback: onUpdateFail
    } ) );
  }

  return (
    <div className='cmp-mybreville--edit-account-details'>
      <Form onSubmit={ handleSubmit } defaultValues={ defaultValues } formName='editAccountDetails'>
        <Row noGutters>
          <Col lg={ 4 } md={ 5 } xs={ 12 } className='col--mr'>
            <Input
              type={ 'text' }
              name={ 'firstName' }
              label={ `${ t( 'eh-input-first-name' ) } *` }
              validation={ Validation.firstName }
            />
          </Col>
          <Col lg={ 4 } md={ 5 } xs={ 12 } className='col--ml'>
            <Input
              type={ 'text' }
              name={ 'lastName' }
              label={ `${ t( 'eh-input-last-name' ) } *` }
              validation={ Validation.lastName }
            />
          </Col>
        </Row>
        <Row noGutters>
          <Col lg={ 4 } md={ 5 } xs={ 12 } className='col--mr'>
            <Input
              readOnly
              type={ 'email' }
              name={ 'email' }
              label={ `${ t( 'eh-input-email-address' ) } *` }
              validation={ Validation.email }
            />
          </Col>
          <Col lg={ 4 } md={ 5 } xs={ 12 } className='col--ml'>
            <Input
              type={ 'text' }
              name={ 'phone' }
              label={ t( 'eh-input-phone-number' ) }
              validation={ Validation.phoneOptional }
              prefix={ phoneCode }
            />
          </Col>
        </Row>
        <Row noGutters>
          <Col lg={ 2 } md={ 5 } xs={ 6 } className='col--pr'>
            <Button
              className='cmp-mybreville__link--button form-button'
              textType='bold'
              colorScheme='black'
              href={ '/account-details' }
            >
              { t( 'eh-button-cancel' ) }
            </Button>
          </Col>
          <Col lg={ 2 } md={ 5 } xs={ 6 } className='col--pl'>
            <FormButton
              label={ t( 'eh-button-save' ) }
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

EditAccountDetails.propTypes = {

};

export default EditAccountDetails;
