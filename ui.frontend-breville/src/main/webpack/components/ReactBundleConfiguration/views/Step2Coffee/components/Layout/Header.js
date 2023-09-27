import React from 'react';
import { number } from 'prop-types';
import { InfoTooltip } from 'shared-ui/Tooltip/components/InfoTooltip';

export const Header = ( { bundleDiscountPercentage } ) => {
  return (
    <div className='coffee-conf-header'>
      <h1 className='coffee-conf-header__title'>
        Select Your Coffee <span>to complete your bundle.</span>
      </h1>
      <div className='coffee-conf-header__content'>
        <div className='coffee-conf-header__info'>
          <h4 className='coffee-conf-header__logo'>by Breville</h4>
          <p className='coffee-conf-header__desc'>
            With the Beanz Trial Subscription, you are <b>commited to 12 bags</b> of freshly roasted
            coffee (2 bags every 2 weeks with free shipping) and get a <b>free Barista Kit (Valued at
              $200)</b> and <b>free Training & Support.</b>
          </p>
        </div>
        <div className='coffee-conf-header__price-info'>
          <h4 className='coffee-conf-header__logo'>by Breville</h4>
          <p className='coffee-conf-header__offer'>{ bundleDiscountPercentage }% OFF</p>
          <p className='coffee-conf-header__price-amount'><b>On your first 12 bags of coffee!</b>
            <InfoTooltip
              id='beanz-commit-tooltip'
              content={ `You are commiting to 12 bags of coffee with ${ bundleDiscountPercentage }% OFF. When your trial subscription ends, a regular Beanz subscription will begin. You may change your delivery settings at anytime.` }
            />
          </p>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  bundleDiscountPercentage: number
};