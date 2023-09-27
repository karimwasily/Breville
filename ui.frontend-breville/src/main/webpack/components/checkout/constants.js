import React from 'react';
import ReviewOrder from 'components/checkout/review-order';
import BeanzSubscription from 'components/checkout/beanz-subscription';
import { ShippingWidget } from 'components/checkout/shipping';
import { Payment } from 'components/checkout/payment';

export const SHIPPING_BTN_ID = 'SHIPPING_BTN_ID';
export const PAYMENT__BTN_ID = 'PAYMENT__BTN_ID';
export const BEANZ_SUBSCRIPTION_BTN_ID = 'BEANZ_SUBSCRIPTION_BTN_ID';
export const REVIEW_ORDER_BTN_ID = 'REVIEW_ORDER_BTN_ID';
export const PLACE_ORDER_BTN_ID = 'PLACE_ORDER_BTN_ID';


export const DYNAMIC_STEPS = [<ShippingWidget key='shipping' />, <Payment key='payment' />, <BeanzSubscription key='beanzSubcription' />, <ReviewOrder key='reviewOrder' />];
export const DYNAMIC_LABELS = ['Shipping', 'Payment', 'Set up Beanz Subscription', 'Review Order', 'Place Order'];
export const DYNAMIC_IDS = [SHIPPING_BTN_ID, PAYMENT__BTN_ID, BEANZ_SUBSCRIPTION_BTN_ID, REVIEW_ORDER_BTN_ID, PLACE_ORDER_BTN_ID];

export const STATIC_STEPS = [<ShippingWidget key='shipping' />, <Payment key='payment' />, <ReviewOrder key='reviewOrder' />];
export const STATIC_LABELS = ['Shipping', 'Payment', 'Review Order', 'Place Order'];
export const STATIC_IDS = [SHIPPING_BTN_ID, PAYMENT__BTN_ID, REVIEW_ORDER_BTN_ID, PLACE_ORDER_BTN_ID];

export const INITIAL_ADDRESS = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  postalCode: '',
  state: '',
  country: 'United States',
  phone: '',
  email: ''
};

