import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import BundleSummaryBrkdwn from 'components/Cart/BundleSummaryBrkdwn';
import CartTableHeader from 'components/Cart/CartTableHeader';
import CardSummaryBundle from 'components/Cart/CardSummaryBundle';
import Hr from 'components/shared-ui/Hr';
import { selectLineItems } from 'library/store/cart/selector';
import Proptypes from 'prop-types';

function CartProductWidget( props ){

  const lineItems = useSelector( selectLineItems );
  const { parent = {}, child = {} } = lineItems;
  const { readonly } = props;
  return (
    <div className={ `cart__table ${ readonly ? 'readonly' : '' }` }>
      <CartTableHeader />
      {
      Object.keys( parent ).map( ( key ) => {
          const current = parent[key];
          const { isBundle, isDynamicBundle } = current;
          return (
            <Fragment key={ key }>
              <div className='cart__bundle' >
                <CardSummaryBundle { ...current } isBundle={ isDynamicBundle } readonly={ readonly } />
                { isDynamicBundle && <BundleSummaryBrkdwn parent={ current } child={ child } readonly={ readonly } /> }
              </div>
              <Hr className='my-40' />
            </Fragment>
          );
      } )
    }
    </div>
  );
}

CartProductWidget.propTypes = {
  readonly: Proptypes.bool
};

export default CartProductWidget;