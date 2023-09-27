import React, { Fragment } from 'react';

export const paymentForm = () => {
  return (
    <Fragment>
      <div className='cmp-teaser__checkout-custom-details accordion-expanded paymentSection hidden' id='paymentSection'>
        <div className='cmp-toggle__checkout-accordion'>
          <div className='cmp-toggle__checkout-accordion-body'>
            <div className='cmp-container__checkout-payment-wrapper'>
              <ul className='nav tabs-nav' id='' role='tablist'>
                <li className='nav-item'>
                  <a className='nav-link active' data-tab-id='credit-card'>By Credit Card</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' data-tab-id='paypalPayment'>By Paypal</a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className='tab-pane credit-card active' id='credit-card'>
                  <form className='shipping-form'>
                    <div className='cmp-teaser__checkout-input-wrapper'>
                      <div id='card-container'></div>
                      <div id="my-container"></div>
                      <div className='cmp-container__paynow-checkbox-wrapper' id='termsAndConditionCard'>
                        <input type='checkbox' className='cmp-form__paynow-checkbox' />
                        <label htmlFor className='cmp-form__paynow-checkbox-label'> By proceeding you are agreeing to our
                          <a href='/us/en/legal/terms-of-use.html' className='text-green' target='_blank'><u> Terms and Conditions</u></a> and our
                          <a href='https://www.breville.com/us/en/legal/privacy-policy.html' className='text-green' target='_blank' rel='noreferrer'><u> Privacy Policy</u></a>
                        </label>
                      </div>
                      <p className='text-center cmp-text__small-font'>Total amount you need to pay now
                        <strong><span className='totalCartAmount'></span></strong>
                      </p>
                    </div>
                  </form>
                </div>
                <div className='tab-pane paypal' id='paypalPayment'>
                  <div className='cmp-teaser__checkout-form-wrapper'>
                    <div id='paypal-container'></div>
                    <div className='paypalAdditional hidden'>
                      <div className='cmp-container__paynow-checkbox-wrapper' id='termsAndConditionPaypal'>
                        <input type='checkbox' className='cmp-form__paynow-checkbox' />
                        <label htmlFor className='cmp-form__paynow-checkbox-label'>By proceeding you are agreeing to
                          our
                          <a href='/us/en/legal/terms-of-use.html' className='text-green' target='_blank'><u>Terms and
                            Conditions</u></a> and our
                          <a href='https://www.breville.com/us/en/legal/privacy-policy.html' className='text-green' target='_blank' rel='noreferrer'><u>Privacy
                            Policy</u></a>
                        </label>
                      </div>
                      <div className='cmp-form__checkout-submit-btn-wraper adyen-paypal-payment-btn disabled'>
                        <button className='btn-primary cmp-btn__checkout-submit-btn'>Pay Now</button>
                      </div>
                      <p className='cmp-text__small-font'>Total amount you need to pay now
                        <strong><span className='totalPaypalCartAmount'></span></strong>
                      </p>
                    </div>
                  </div>
                  <p className='safer cmp-text__small-font'>The safer, easier way to pay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};