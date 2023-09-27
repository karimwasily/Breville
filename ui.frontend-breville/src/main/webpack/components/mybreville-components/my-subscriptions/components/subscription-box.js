import React from 'react';
import { object, string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { formatDateLongMonth } from '../../my-orders/helpers';
import { DEFAULT_PRODUCT_NAME, ORDER_GROUP_ID } from '../../constants';

const SubscriptionBox = ( { subscription, className } ) => {
  const { t } = useTranslation(),
    {
      nextdeliverydate: nextDate,
      Meta: {
        orderImages: image,
        orderImagesName: productName = DEFAULT_PRODUCT_NAME,
        orderItemGroupId: groupId
      } = {}
    } = subscription,
    displayName = ( groupId === ORDER_GROUP_ID ) ? beanzName : productName,
    status = subscription?.status?.toLowerCase(),
    dNextDate = new Date( nextDate ),
    isInvalidDate = isNaN( dNextDate.getTime() ),
    isoNextDate = isInvalidDate ? '' : dNextDate.toISOString(),
    classes = classNames( 'subscription-box', className );

  return (
    <div className={ classes }>
      <div className='subscription-box__image-wrapper'>
        <img src={ image } alt={ displayName } width={ 110 } height={ 110 }></img>
      </div>
      <div className='subscription-box__item-details'>
        <h5 className='subscription-box__item-name'>{ displayName }</h5>
        <p>{ t( 'eh-text-subscription-next-order' ) }: <time dateTime={ isoNextDate }>{ formatDateLongMonth( nextDate ) }</time></p>
        <p>{ t( 'eh-label-order-status' ) }: { t( `eh-status-${ status }` ) }</p>
      </div>
    </div>
  );
};

SubscriptionBox.defaultProps = {
  subscription: {}
};

SubscriptionBox.propTypes = {
  subscription: object,
  className: string
};

export default SubscriptionBox;