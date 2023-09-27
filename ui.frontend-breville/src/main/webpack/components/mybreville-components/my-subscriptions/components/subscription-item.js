import React from 'react';
import { object, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import ItemStrip from './item-strip';
import ItemBody from './item-body';
import { formatDate } from '../../my-orders/helpers';
import { DEFAULT_PRODUCT_NAME, ORDER_GROUP_ID } from '../../constants';

const SubscriptionItem = ( { subscription, onBeanzSubscriptionEdit } ) => {
  const { t } = useTranslation(),
    {
      nextdeliverydate: nextDate,
      status: itemStatus,
      Meta: {
        orderImagesName: productName = DEFAULT_PRODUCT_NAME,
        orderItemGroupId: groupId,
        orderRoasterName: roasterName
      } = {}
    } = subscription,
    status = itemStatus?.toLowerCase(),
    beanzName = [t( 'eh-subscription-title-beanz-subscription' ), '-', roasterName, productName].filter( Boolean ).join( ' ' ),
    displayName = ( groupId === ORDER_GROUP_ID ) ? beanzName : productName;

  return (
    <div className='subscription-item'>
      <ItemStrip
        title={ displayName }
        status={ status }
        date={ formatDate( nextDate ) }
      />
      <ItemBody
        subscriptionData={ subscription }
        onBeanzSubscriptionEdit={ onBeanzSubscriptionEdit }
      />
    </div>
  );
};

SubscriptionItem.defaultProps = {
  subscription: {},
  onBeanzSubscriptionEdit: () => void 0
};

SubscriptionItem.propTypes = {
  subscription: object,
  onBeanzSubscriptionEdit: func
};

export default SubscriptionItem;