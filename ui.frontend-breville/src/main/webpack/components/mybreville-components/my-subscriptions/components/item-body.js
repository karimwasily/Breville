import React, { useState } from 'react';
import { object, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { SUBSCRIPTION_STATUS } from '../../constants';
import Button from 'xps-react/core/button';
import ShowHideHeaderStrip from '../../my-orders/order-details/components/show-hide-header-strip';
import ShowHideShipping from '../../my-orders/order-details/components/show-hide-shipping';
import ShowHidePayment from '../../my-orders/order-details/components/show-hide-payment';
import PaymentMethod from './payment-method';
import { formatDate, formatDateLongMonth } from '../../my-orders/helpers';
import { getSubscriptionFrequency } from '../utility';

const ItemBody = ( { subscriptionData, onBeanzSubscriptionEdit } ) => {
  const { t } = useTranslation(),
    [showSummary, setShowSummary] = useState( false ),
    {
      nextdeliverydate: nextDate,
      standingorderid,
      quantity,
      status: itemStatus,
      subscriptionamount: total,
      skucode: sku = '',
      Meta: {
        orderImages: image,
        orderImagesName: productName = DEFAULT_PRODUCT_NAME,
        orderItemGroupId: groupId,
        orderRoasterName: roasterName
      } = {}
    } = subscriptionData,
    isBeanz = groupId === 'MR',
    subscriptionId = standingorderid || '',
    { unit, interval } = getSubscriptionFrequency( subscriptionData ),
    longDateStr = formatDateLongMonth( nextDate ),
    frequency = ( interval === '1' ) ? t( `eh-text-frequency-${ unit }-1` ) : [t( 'eh-text-frequency-every' ), interval, t( `eh-text-frequency-${ unit }` )].join( ' ' ),
    status = itemStatus?.toLowerCase(),
    nextDateStr = ( status === SUBSCRIPTION_STATUS.paused ) ? [t( 'eh-status-paused' ), '-', t( 'eh-text-date-until' ), longDateStr].filter( Boolean ).join( ' ' ) : longDateStr;

  function handleShowHideClick( e ) {
    e?.preventDefault();
    setShowSummary( !showSummary );
  }

  function handleBeanzSubscriptionEdit() {
    if ( onBeanzSubscriptionEdit && typeof onBeanzSubscriptionEdit === 'function' ) {
      onBeanzSubscriptionEdit( subscriptionData );
    }
  }

  return (
    <div className='item-body'>
      <div className='item-body__main'>
        <div className='item-body__main__image'>
          <img src={ image } alt={ productName }></img>
        </div>
        <div className='item-body__main__details'>
          <div className='details__text'>
            <p>
              <span className='label-font-weight-bold'>{ t( 'eh-text-subscription-frequency' ) }</span>: { frequency }
            </p>
            <p>
              <span className='label-font-weight-bold'>{ t( 'eh-text-subscription-quantity' ) }</span>: { quantity }
            </p>
            {
              ( status !== SUBSCRIPTION_STATUS.cancelled ) &&
              <p>
                <span className='label-font-weight-bold'>{ t( 'eh-text-subscription-next-order' ) }</span>: { nextDateStr }
              </p>
            }

          </div>
          <div className='details__edit-button'>
            {
              ( status !== SUBSCRIPTION_STATUS.cancelled ) &&
              ( isBeanz ? (
                <Button
                  disabled={ false }
                  children={ t( 'eh-button-subscription-edit' ) }
                  onClick={ handleBeanzSubscriptionEdit }
                  href={ void 0 }
                />
              ) : (
                <Button
                  disabled={ false }
                  children={ t( 'eh-button-subscription-edit' ) }
                  href={ `/my-subscriptions/${ subscriptionId }` }
                />
              ) )
            }

          </div>
        </div>
      </div>
      <div className='order-details-summary'>
        <ShowHideHeaderStrip handleShowHideClick={ handleShowHideClick } showSummary={ showSummary } isSubscription={ true } grandTotal={ total?.toFixed( 2 ) } />
        { showSummary &&
        <div className='order-details-summary__container'>
          <ShowHideShipping shippingAddress={ subscriptionData?.shippingAddress } />
          <ShowHidePayment billingAddress={ subscriptionData?.billingAddress } />
          { /* creditCardNumber and expriyDate is not available in CT that is why Just added a hard coded value*/ }
          <PaymentMethod paymentMethod={ subscriptionData?.paymenttype } creditCardNumber={ '*********1234' } expiryDate={ formatDate( nextDate ) } />
        </div>
            }
      </div>
    </div>
  );
};

ItemBody.defaultProps = {
  subscriptionData: {},
  onBeanzSubscriptionEdit: () => void 0
};

ItemBody.propTypes = {
  subscriptionData: object,
  onBeanzSubscriptionEdit: func
};

export default ItemBody;

