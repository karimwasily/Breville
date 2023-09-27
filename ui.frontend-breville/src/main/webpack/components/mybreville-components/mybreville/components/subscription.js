import React from 'react';
import { Link } from 'react-router-dom';
import { array } from 'prop-types';
import { useTranslation } from 'react-i18next';
import SubscriptionProduct from './subscription-product';
import SubscriptionNoProduct from './subscription-no-product';

const Subscription = ( { subscriptionDataWithOrderDetails } ) => {
  const { t } = useTranslation();
  const AMOUNT_OF_SUBSCRIPTION = 3;

  return (
    <div className= 'subscription' >
      { subscriptionDataWithOrderDetails?.length > 0 ?
        <div>
          <div className= 'subscription__header'>
            <h3 className='subscription__count'>
              { t( 'eh-label-subscription-product-my-subscriptions' ) }
              <span className='subscription__count-number'>{ subscriptionDataWithOrderDetails?.length }</span>
            </h3>
            <div>
              <Link to='/my-subscriptions' className='subscription__header--view-all-subscriptions'>
                { t( 'eh-label-subscription-product-view-all-subscriptions' ) }
              </Link>
            </div>
          </div>
          <SubscriptionProduct data={ subscriptionDataWithOrderDetails } tileCount={ AMOUNT_OF_SUBSCRIPTION } />
        </div>
       : <SubscriptionNoProduct />
      }
    </div>
  );
};

Subscription.defaultProps = {
  subscriptionDataWithOrderDetails: []
};

Subscription.propTypes = {
  subscriptionDataWithOrderDetails: array
};

export default Subscription;