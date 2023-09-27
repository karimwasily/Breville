import React from 'react';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';

const OrderStrip = ( { orderNumber, orderDate, orderStatus } ) => {
  const { t } = useTranslation();
  /**
   * orderDate comes in ISO8601 UTC format
   */
  const date = new Date( orderDate );
  const isInvalidDate = isNaN( date.getTime() );
  let orderDateString = '';

  if ( !isInvalidDate ) {
    const day = date.getDate();
    const month = date.toLocaleString( 'default', { month: 'long' } );
    const year = date.getFullYear();

    orderDateString = `${ month } ${ day }, ${ year }`;
  }

  return (
    <div className='my-orders__order-strip' data-testid={ `order-strip-${ orderNumber }` }>
      <div className='order-number'>
        <p><span className='label-font-weight-bold'>{ t( 'eh-label-order-number' ) }: </span> { orderNumber }</p>
      </div>
      <div className='order-date'>
        <p><span className='label-font-weight-bold'>{ t( 'eh-label-order-date' ) }: </span> { orderDateString } </p>
      </div>
      <div className='order-status'>
        <p><span className='label-font-weight-bold'>{ t( 'eh-label-order-status' ) }: </span> { orderStatus }</p>
      </div>
    </div>
  );
};

OrderStrip.propTypes = {
  orderNumber: string,
  orderDate: string,
  orderStatus: string
};

export default OrderStrip;