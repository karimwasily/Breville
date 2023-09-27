import React from 'react';
import Proptypes from 'prop-types';
import { Image } from 'shared-ui/image';
import Button from '../shared-ui/button/button';
import RemoveProduct from 'containers/RemoveProduct';


export const SubscriptionSummary = ( props ) => {
  const { productId, title, thumbnail, imageAlt, coffee, quantity, firstShipment, badge, oldPrice, newPrice, oldTotalPrice, newTotalPrice, children, readonly } = props;

  return (
    <section className='cmp-cart-subscription-summary'>
      <div className='display-flex'>
        <Image isThumbnail src={ thumbnail } alt={ imageAlt } />
        <div>
          <div className='cmp-cart-subscription-summary__title'>{ title }</div>
          <div className='cmp-cart-subscription-summary__meta'>
            { badge && <div className='cmp-cart-subscription-summary__badge mb-5'>{ badge }</div> }
            <div className='cmp-cart-subscription-summary__price'>
              { oldTotalPrice && <span className='cmp-cart-subscription-summary__old-price mr-5'>{ oldTotalPrice }</span> }
              { newTotalPrice && <span className='cmp-cart-subscription-summary__new-price mb-25'>{ newTotalPrice }</span> }
            </div>
            { /* NOTE: Not MVP { !readonly &&
              <Button type='link' onClick={ handleClick } className='cmp-cart-subscription-summary__link cmp-cart-button md-up'>Edit Selections</Button>
            } */ }
          </div>
          <div className='cmp-cart-subscription-summary__info'>
            <div className='my-5'>Coffee: { coffee }</div>
            { quantity && <div className='my-5'>Quantity: { quantity }</div> }
            { firstShipment && <div className='my-5'>First shipment: { firstShipment }</div> }
            <div className='my-5'>
              <span className='cmp-cart-subscription-summary__old-price mr-5'>{ oldPrice }</span>
              <span className='cmp-cart-subscription-summary__new-price mr-5'>{ newPrice }</span>
              Per Bag
            </div>
          </div>

          <div className='cmp-cart-subscription-summary__text mt-15'>
            { children }
          </div>
          { !readonly &&
            <RemoveProduct productId={ productId } isDynamicBundle>
              <p>Are you sure you want to remove a <strong>Beanz Trial Subscription</strong>?</p>
              <p>You will lose the Beanz Offer, Free Barista Kit ($200 value) and Barista Training & Support.</p>
            </RemoveProduct>
          }
          { /* NOTE: Not MVP { !readonly &&
            <Button type='link' onClick={ handleClick } className='cmp-cart-subscription-summary__link cmp-cart-button p-0 mt-10 sm-only'>Edit Selections</Button>
          } */ }
        </div>
      </div>
      { /* NOTE: Not MVP { !readonly &&
        <Button type='link' onClick={ handleClick } className='cmp-cart-subscription-summary__link cmp-cart-button md-up'>Edit Selections</Button>
      } */ }
    </section>
  );
};

SubscriptionSummary.propTypes = {
  title: Proptypes.string.isRequired,
  thumbnail: Proptypes.string.isRequired,
  imageAlt: Proptypes.string.isRequired,
  coffee: Proptypes.string.isRequired,
  quantity: Proptypes.string,
  firstShipment: Proptypes.string,
  badge: Proptypes.string,
  oldPrice: Proptypes.string.isRequired,
  newPrice: Proptypes.string.isRequired,
  oldTotalPrice: Proptypes.string,
  newTotalPrice: Proptypes.string,
  children: Proptypes.node.isRequired,
  readonly: Proptypes.bool
};

export default SubscriptionSummary;
