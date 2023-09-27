import React from 'react';
import { func } from 'prop-types';
import CloseIconButton from 'components/shared-ui/CloseIconButton';
import Facebook from 'resources/svgs/facebook-blue.svg';
import Google from 'resources/svgs/google.svg';


import { Input } from 'xps-react/core/form';
import Button from 'xps-react/core/button';

const SignInTemplate = (props) => {
  const { onCloseModal } = props;

  return (
    <div className="signin-modal__container">
      <div className="signin-modal-header">
          <h2 className="signin-modal-header__title">Sign In</h2>
          <p className="signin-modal-header__desc">with your Breville account for faster checkout</p>
          <CloseIconButton onClick={onCloseModal} className="signin-modal__close-icon" size="large"/>
      </div>
      <form className="signin-modal-content" onSubmit={onCloseModal}>
        <Input
          name={ 'email' }
          label={ 'Email*' }
        />
        <Input
          name={ 'password' }
          label={ 'Password*' }
        />
       
        <Button type={'submit'} textType={'bold'} className="form-btn mt-10">Log in & Checkout</Button>
        <div className="social-media-btn-wrap mt-25">
            <button className="google-btn">
              <div className="signin-icon-wrap">
                <Google width="24" height="24"/><span className="signin-icon-txt">Google</span>
              </div>      
            </button>
            <button className="facebook-btn">  
              <div className="signin-icon-wrap">
                <Facebook width="24" height="24"/><span className="signin-icon-txt">Facebook</span>
              </div>        
            </button>
        </div>
      </form>
    </div>
  )
}

SignInTemplate.propTypes = {
  onCloseModal: func,
};

export default SignInTemplate;
