import React, { useState } from 'react';
import { array, func } from 'prop-types';
import SubscriptionItem from './subscription-item';

const SubscriptionList = ( { subscriptions, onBeanzSubscriptionEdit } ) => {

  return subscriptions.map( ( subItem, index ) => {
    return (
      <div data-testid='subscription-list' key={ index }>
        <SubscriptionItem subscription={ subItem } onBeanzSubscriptionEdit={ onBeanzSubscriptionEdit } />
      </div>
    );
  } );
};

SubscriptionList.defaultProps = {
  subscriptions: [],
  onBeanzSubscriptionEdit: () => void 0
};

SubscriptionList.propTypes = {
  subscriptions: array,
  onBeanzSubscriptionEdit: func
};

export default SubscriptionList;