import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Row, Col } from 'xps-react/core';
import { Input, Validation } from 'xps-react/core/form';
import { Form, FormButton } from 'xps-react/core/form';
import Button from 'xps-react/core/button';

const ChangePassword = () => {

  const history = useHistory();
  const accountDetailsUrl = '/account-details';

  return (
    <Form>
      <Grid fluid className='cmp-mybreville__change-password'>
        <Row>
          <Col xs={ 12 } lg={ 6 } className='cmp-mybreville__change-password-column'>
            <Input
              type='password'
              name='new-password'
              className='cmp-mybreville__change-password-input'
              placeholder=''
              label='New Password'
              fieldInformation='Minimum 6 Characters Including Number'
              validation={ Validation.password }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 } lg={ 6 } className='cmp-mybreville__change-password-column'>
            <Input
              type='password'
              name='repeat-new-password'
              className='cmp-mybreville__change-password-input'
              placeholder=''
              label='Repeat New Password'
              fieldInformation='Minimum 6 Characters Including Number'
              validation={ Validation.repeatPassword }
              toConfirm='new-password'
            />
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 } lg={ 6 } className='cmp-mybreville__change-password-column cmp-form--buttons'>
            <Button
              label='Cancel'
              disabled={ false }
              className='cmp-button'
              children='Cancel'
              onClick={ () => {
                history.push( accountDetailsUrl );
                } }
            />
            <FormButton label='Save' />
          </Col>
          <Col className='ml-10'> </Col>
        </Row>
      </Grid>
    </Form>
  );
};

ChangePassword.propTypes = {

};


export default ChangePassword;