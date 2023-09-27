import React from 'react';
import { Grid, Row, Col } from 'xps-react/core';
import { Input, CheckboxExt, Validation } from 'xps-react/core/form';
import Warranty from 'resources/svgs/warranty-2.svg';
import CoffeeBag from 'resources/svgs/coffee-bag.svg';
import { getWatch } from 'xps-react/core/form/';

const CreateAccount = () => {
  const watch = getWatch();
  return (
    <div>
      <div className='mb-25 mt-40'>
        <h4 className='account__title'>Create your account</h4>
        <p className='account__txt'>A Breville account is required before purchase to manage your subscription.<br />
          Just add a password to create your account.</p>
      </div>

      <Grid className='account__grid'>
        <Row noGutters={ true }>
          <Col lg={ 4 }>
            <div className='account__warranty'>
              <div className='account__icon-wrap'>
                <CoffeeBag width='28' height='40' viewBox='0 0 71 101' />
              </div>
              <p className='account__txt'>Manage your subscription settings</p>
            </div>
          </Col>
          <Col lg={ 4 }>
            <div className='account__warranty'>
              <div className='account__icon-wrap'>
                <Warranty width='34' height='38' viewBox='0 0 37 41' />
              </div>
              <p className='account__txt'>Register your machine and access warranty.</p>
            </div>
          </Col>
        </Row>
        <div className='mb-35'></div>
        <Row noGutters={ true }>
          <Col className='mr-10' >
            <Input
              type={'email'}
              name={ 'email' }
              label={ 'Email*' }
              validation={ Validation.email }
            />
          </Col>
          <Col className='ml-10'></Col>
        </Row>
        <Row noGutters={ true }>
          <Col className='mr-10'>
            <Input
              name={ 'password' }
              type={'password'}
              label={ 'Password*' }
              validation={ Validation.password }
            />
            <span className='account__note'>Minimum 6 Characters and 1 Number</span>
          </Col>
          <Col className='ml-10'>
            <Input
              type={'password'}
              name={ 'repeatPassword' }
              label={ 'Repeat Password*' }   
              validation={ Validation.repeatPassword(watch) }   
            />
          </Col>
        </Row>
      </Grid>
      <div className='mb-25'></div>
    
      <div className='mb-20'>
        <div className='form-checkbox-wrap mb-20'>
          <CheckboxExt name={'termsConditions'} />
          <label className='form-checkbox-label' htmlFor='terms'>I agree to Breville&apos;s <span className='form-underline'>Terms and Conditions</span></label>
        </div>
        <div className='form-checkbox-wrap form-checkbox-wrap--top'>
          <CheckboxExt name={'newsletters'} />
          <label className='form-checkbox-label' htmlFor='newsletters'>I want to receive newsletters and marketing updates from Breville
            and affiliated brands and acknowledge that I have read Breville&apos;s <span className='form-underline'>Privacy Policy</span>.</label><br />
        </div>
      </div>
      <div className='account__note mb-50'>
        You have the right to opt out of our newsletters and marketing updates at any time.
      </div>
  </div>
  );
};

export default CreateAccount;

/*

<Col className='mr-10'>
            <PasswordInput
              name={ 'password' }
              label={ 'Password*' }
              register={ register }
               args={ Validation.password }
            />
            <span className='account__note'>Minimum 6 Characters and 1 Number</span>
          </Col>
          <Col className='ml-10'>
            <PasswordInput
              name={ 'repeatPassword' }
              label={ 'Repeat Password*' }
              register={ register }
              args={{ required: true, validate: ( value ) => value === watch( 'password' ) }}       
            />
          </Col>
          */