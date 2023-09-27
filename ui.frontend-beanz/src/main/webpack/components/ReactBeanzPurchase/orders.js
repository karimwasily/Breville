import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { viewOrder } from 'library/store/subscription/actions';
import { selectOrders } from 'library/store/subscription/selector';
import { Fragment } from 'react';


export default function Order() {
  const response = useSelector( selectOrders );
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState( 0 );
  const [orders, setOrders] = useState( [] );
  const [show, setShow] = useState( false );
  const toggleItems = ( index ) => {
    if ( collapse === index ) {
      setCollapse( null );
    }
    else {
      setCollapse( index );
    }
  };

  useEffect( () => {
    dispatch( viewOrder() );
  }, [] );

  useEffect( () => {
    setOrders( response.slice( 0, 5 ) );
    response.length > 5 ? setShow( true ) : '';
  }, [response] );

  const showAllOrders = () => {
    setOrders( response );
    setShow( false );
  };

  return (
    <div className='cmp-container-purchase__content' id='order'>
      {
        orders && orders.map( ( item, index ) => {

          return (
            <>
              <div className='cmp-container-purchase__content--card-box' key={ index }>
                <div className={ `cmp-container-purchase__content--box ${ collapse !== index ? 'collapsed' : 'null'
                  }` }
                >
                  <div className='cmp-container-purchase__content--box-head'>
                    <p className='cmp-text-purchase__content--box-head--title'>Order No. { item.OrderNumber }</p>
                    <p className='cmp-text-purchase__content--box-head--sub-title'>{ moment( item.OrderCreatedDate ).format( 'MMMM DD, YYYY' ) }</p>
                    <span onClick={ () => toggleItems( index ) } className='cmp-text-purchase__content--box-toggle-arrow'></span>
                  </div>

                  <span className='cmp-container-purchase__content--order-status font-orange'>
                    { item.OrderStatus }
                  </span>
                  <div className='cmp-container-purchase__content--box-row'>
                    <div className='cmp-container-purchase__content--box-column'>
                      <div className='cmp-container-purchase__content--box-order-detials'>
                        { item.Items.map( ( bean, i ) => {
                          return (
                            <Fragment key={ i }>
                              <div class='cmp-container-purchase__content--box-order-head font-orange'>
                                <p class='cmp-text-purchase__content--box-order-head--order-number'>Item { ( i + 1 ) }</p>
                                <p class='cmp-text-purchase__content--box-order-head--order-status text-right '>{ bean.ItemStatus }</p>
                              </div>
                              <div className='cmp-container-purchase__content--box-order-detials-item'>
                                <img src={ bean.ProductImageUrl } className='cmp-image-purchase__content--box-order-detials-item--image' />
                                <div className='cmp-container-purchase__content--box-order-detials-item--details'>
                                  <p className='cmp-container-purchase__content--box-order-detials-item--darkroast'>{ bean.VendorName } | { bean.CoffeeType }</p>
                                  <p className='cmp-container-purchase__content--box-order-detials-item--item-name'>{ bean.ItemDescription }</p>
                                  <p className='cmp-container-purchase__content--box-order-detials-item--item-quantitly'>{ ( bean.SubscriptionFrequency ).split( '_' )[2] } Weeks, { bean.Quantity } x { bean.Weight } Bags, { bean.GrindType }</p>
                                  <p className='cmp-container-purchase__content--box-order-detials-item--subscription'>Subscription</p>
                                  { item.TrackingLink !== null && <a href={ item.TrackingLink } target='_blank' class='cmp-container-purchase__content--box-order-details-item--trackLink' rel='noreferrer'>
                                    Track this order
                                  </a> }
                                </div>
                              </div>
                              <div className='cmp-container-purchase__content--box--order-price-details'>
                                <ul className='cmp-container-purchase__content--box--order-price-details--ul'>
                                  <li className='cmp-container-purchase__content--box--order-price-details--li'>Cost</li>
                                  <li className='cmp-container-purchase__content--box--order-price-details--li'>{ bean.Quantity } x ${ bean.UnitPrice }</li>
                                </ul>

                                <ul className='cmp-container-purchase__content--box--order-price-details--ul'>
                                  <li className='cmp-container-purchase__content--box--order-price-details--li'>Discount</li>
                                  <li className='cmp-container-purchase__content--box--order-price-details--li'>${ ( bean.Discount ).toFixed( 2 ) }</li>
                                </ul>

                                <ul className='cmp-container-purchase__content--box--order-price-details--ul'>
                                  <li className='cmp-container-purchase__content--box--order-price-details--li'>Taxes</li>
                                  <li className='cmp-container-purchase__content--box--order-price-details--li'>${ bean.ItemTax }</li>
                                </ul>
                                <ul className='cmp-container-purchase__content--box--order-price-details--ul'>
                                  <li className='cmp-container-purchase__content--box--order-price-details--li order-sub-total'>Sub Total</li>
                                  <li className='cmp-container-purchase__content--box--order-price-details--li'>${ ( bean.TotalPrice.toFixed( 2 ) ) }</li>
                                </ul>
                                <hr />
                              </div>
                            </Fragment>
                          );
                        } ) }


                        <div className='cmp-container-purchase__content--box--order-price-details'>
                          <ul className='cmp-container-purchase__content--box--order-price-details--ul'>
                            <li className='cmp-container-purchase__content--box--order-price-details--li'>Shipping</li>
                            <li className='cmp-container-purchase__content--box--order-price-details--li'>${ ( item.ShippingAmount ).toFixed( 2 ) }</li>
                          </ul>
                          <ul className='cmp-container-purchase__content--box--order-price-details--ul'>
                            <li className='cmp-container-purchase__content--box--order-price-details--li order-total'>Order Total</li>
                            <li className='cmp-container-purchase__content--box--order-price-details--li'>$ { ( item.OrderGrandTotal ).toFixed( 2 ) }</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='cmp-container-purchase__content--box-column'>
                      <div className='cmp-container-purchase__content--box--shipping-address'>
                        <div className='cmp-container-purchase__content--box--edit-box shipping-address'>
                          <p className='cmp-text-purchase__content--box--edit-box--title'>SHIPS TO</p>
                        </div>
                        <p className='cmp-text-purchase__content--box--shipping-address-p'>{ item.ShippingContactName }, { item.ShippingCity }, { item.ShippingStreet }, { item.ShippingState }, { item.ShippingStateCode } { item.ShippingPostalCode }, { item.ShippingCountry }</p>
                      </div>
                      <div className='cmp-container-purchase__content--box--billing-address'>
                        <div className='cmp-container-purchase__content--box--edit-box billing-address'>
                          <p className='cmp-text-purchase__content--box--edit-box--title'>BILLED TO</p>
                        </div>
                        <p className='cmp-text-purchase__content--box--billing-address-p'>
                          { item.BillingContactName }, { item.BillingCity }, { item.BillingStreet }, { item.BillingState }, { item.BillingStateCode } { item.BillingPostalCode }, { item.BillingCountry }
                        </p>
                      </div>
                      <div className='cmp-container-purchase__content--box--payment'>
                        <div className='cmp-container-purchase__content--box--edit-box payment'>
                          <p className='cmp-text-purchase__content--box--edit-box--title'>PAYMENT</p>
                        </div>
                        <p className='cmp-text-purchase__content--box--payment-p'>
                          { item.PaymentMethod }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );

        } )
      }
      { show && <div className='cmp-botton-purchase__div'>
        <button type='button' onClick={ showAllOrders } className='cmp-botton-purchase__content--view-more'>View more</button>
      </div> }
    </div>
  );
}
