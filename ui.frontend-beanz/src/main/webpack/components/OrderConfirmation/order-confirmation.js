import React, { useEffect, useState, Fragment } from 'react';
import request from 'api/request';
import { OrderProduct } from './order-product';
import { analyticsData } from 'xps-utils/analytics';
const analytics = analyticsData();
export const OrderConfirmation = () => {

  const [products, setProducts] = useState([]);
  const [orderNo, setOrderNo] = useState([]);
  const cartVersion = parseInt(localStorage.getItem('cartversion'));
  const cartID = localStorage.getItem('cartID');
  const locale = 'en';
  let orderID;
  useEffect( async () => {
    document.querySelector(".spinner__dialog").classList.remove('hidden');
    if(!localStorage.getItem("orderID")){
    const response = await request.post('GetCartVersionService')
           localStorage.setItem("cartversion", response.data.me.activeCart.version);

    const OrderCreateresponse = await request.post('orderCreateService', {
                variables: {
                    "id": cartID,
                    "version": parseInt(localStorage.getItem('cartversion')),
                    "locale": locale
                }
            });
                localStorage.setItem("orderID", OrderCreateresponse.data.createMyOrderFromCart.id);
                localStorage.setItem("cartversion", OrderCreateresponse.data.createMyOrderFromCart.version);
                setOrderNo(OrderCreateresponse.data.createMyOrderFromCart.orderNumber);
             }
      const OrderHistoryResponse = await request.post('orderDetailsService', {
                    variables: {
                        "ID": localStorage.getItem("orderID"),
                        "locale":locale
                    }
                });
                  setOrderNo(OrderHistoryResponse.data.me.order.orderNumber);
                  analytics.updateConfirmationAnaytics(OrderHistoryResponse?.data?.me?.order?.orderNumber);
                    localStorage.removeItem("cartversion");
                    localStorage.removeItem("cartID");
                    localStorage.removeItem("cartQuantity");
                    localStorage.removeItem("cartUpadated");
                    localStorage.removeItem("_paypal_storage");
                    localStorage.removeItem("LineItemdeleted");
                    document.querySelector(".cmp-button--cart .cmp-button__text").innerHTML = 0;
                    setProducts(OrderHistoryResponse.data.me.order.lineItems);
                    document.querySelector(".spinner__dialog").classList.add('hidden');
}, []);

  return (
    <div className='order-confirmation base aem-GridColumn aem-GridColumn--default--12'>
      <section className='js-confirmation-section' data-edit-mode='false' data-module='orderConfirmation' data-tracking-flag='true' data-collection-name='marketplace_US_EN'>
        <div className='order-confirmation__success-main-wrapper'>
          <div className='order-confirmation__heading'>
            <div className='h2 order-confirmation__content-heading color-brown text-center'>All Done!</div>
            <p className='order-confirmation__success--text-center'>Order Number: <span className='order-confirmation__order-no'>{orderNo}</span></p>
          </div>
          <section className='order-confirmation__container'>
            <div className='order-confirmation__success-content'>
              <div className='order-confirmation__container-fluid'>
               <div className='order-confirmation__success-row'>
                {
                  (products.length > 0) && products.map((product, index) => {
                    return (
                      <OrderProduct key={index} {...product} />
                    );
                  })
                }
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};