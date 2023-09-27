import React from 'react';
import { Link } from 'react-router-dom';
import { array } from 'prop-types';
import { useTranslation } from 'react-i18next';
import SvgIcon from 'xps-react/core/icon';
import { sortedArray } from 'xps-utils/array-handler';
import { commaSeparatedNumber } from 'xps-utils/format';

const OrderComponent = ( { orders } )=>{
  const { t } = useTranslation();
  // Most recent order
  const orderDetails = Array.isArray( orders ) && orders.sort( ( a, b )=> Date.parse( b.OrderCreatedDate ) - Date.parse( a.OrderCreatedDate ) )[0];
  // Most Expensive order item in that cart
  const itemDetails = orderDetails?.Items && orderDetails?.Items.length && sortedArray( orderDetails.Items, 'TotalPrice', 'desc' )[0];

  const getStatus = ( className ) => {
    const { OrderStatus } = orderDetails || {};
    switch ( OrderStatus?.toUpperCase() ){
      case t( 'eh-label-order-component-status-shipped' ).toUpperCase():
        return <div className={ `${ className }-green` }>{ t( 'eh-label-order-component-status-shipped' ) }</div>;
      case t( 'eh-label-order-component-status-processing' ).toUpperCase():
        return <div className={ `${ className }-grey` }>{ t( 'eh-label-order-component-status-processing' ) }</div>;
      case t( 'eh-label-order-component-status-partially-shipped' ).toUpperCase():
        return <div className={ `${ className }-orange` }>{ t( 'eh-label-order-component-status-partially-shipped' ) }</div>;
      default: return '';
    }
  };

  return (
    <div className='order-component'>
      <div className='order-component__left--header'>
        <div className='order-component__left--header-my-orders'> { t( 'eh-label-order-component-my-orders' ) } </div>
        <Link className='order-component__left--header-view-all-orders' to='/my-orders'> { t( 'eh-label-order-component-view-all-orders' ) } </Link>
      </div>
      <div className='order-component__content'>
        <div className='order-component__left'>
          <div className='order-component__left--order-id'>
            <Link className='order-component__left--order-id-para' to={ `/my-orders/${ orderDetails?.OrderNumber }` }>
              { t( 'eh-label-order-component-order' ) } { `#${ orderDetails?.OrderNumber || '' }` }
            </Link>
          </div>
          <div className='order-component__left--item-name'>
            <p className='order-component__left--item-name-label'>{ orderDetails?.Items?.length <= 1 ? itemDetails?.ItemDescription : `${ itemDetails?.ItemDescription } +${ orderDetails?.Items?.length - 1 } ${ orderDetails?.Items?.length - 1 === 1 ? t( 'eh-label-order-component-item' ) : t( 'eh-label-order-component-items' ) }` || '' } </p>
          </div>
          <div className='order-component__left--item-price'> { t( 'eh-label-dollar-sign' ) }{ itemDetails?.TotalPrice && commaSeparatedNumber( Number( itemDetails?.TotalPrice ).toFixed( 2 ) ) } </div>
          <div className='order-component__status--left-mobile'>
            { getStatus( 'order-component__status--left-mobile' ) }
          </div>
        </div>
        <div className='order-component__right'>
          <div className='order-component__status'>
            { getStatus( 'order-component__status' ) }
          </div>
          <span className='order-component--rightArrow'>
            <SvgIcon size='12px' iconName={ 'next12' } theme='oneFillBlack' />
          </span>
        </div>
      </div>
    </div>
  );
};

OrderComponent.propTypes = {
  orders: array
};

export default OrderComponent;