import { analyticsData } from 'xps-utils/analytics';
const analytics = analyticsData();

export const shippingAddressAnalyticsUpdate = ( res ) => {
  analytics.updateConfirmationData( {
    address: {
      country: res?.data?.updateMyCart?.billingAddress?.country,
      city: res?.data?.updateMyCart?.billingAddress?.city,
      stateProvince: res?.data?.updateMyCart?.billingAddress?.state,
      postalCode: res?.data?.updateMyCart?.billingAddress?.postalCode
    }
  } );
};

export const shippingMethodSetAnalyticsUpdate = ( res ) => {
  analytics.updateConfirmationData( {
    total: {
      basePrice: ( res?.data?.updateMyCart?.totalPrice?.centAmount / 100 ).toFixed( 2 ),
      promotionCode: '',
      promoDiscount: '',
      currency: res?.data?.updateMyCart?.totalPrice?.currencyCode,
      shipping: ( res?.data?.updateMyCart?.shippingInfo?.price?.centAmount / 100 ).toFixed( 2 )
    }
  } );
};

export const shippingMethodRecalculateAnalyticsUpdate = ( res ) => {
  const results = res.data.updateMyCart.lineItems;
  let basePrice, cartBasePriceArr = [];
  if (results.length) {
    for (let i = 0; i < results.length; i++) {
      basePrice = results[i].totalPrice.centAmount / 100;
      cartBasePriceArr.push(basePrice);
    }
  }
  
  basePrice = cartBasePriceArr.reduce((pv, cv) => pv + cv, 0);
  let taxAmount = res?.data?.updateMyCart?.taxedPrice?.totalGross?.centAmount - res?.data?.updateMyCart?.taxedPrice?.totalNet?.centAmount;
  taxAmount = ( taxAmount / 100 ).toFixed( 2 );
  const transactionTotal = ( res?.data?.updateMyCart?.taxedPrice?.totalGross?.centAmount / 100 ).toFixed( 2 );
  const shipping = ( res?.data?.updateMyCart?.shippingInfo?.price?.centAmount / 100 ).toFixed( 2 );
  const currency = res?.data?.updateMyCart?.shippingInfo?.price?.currencyCode;
  analytics.updateConfirmationData( {
    basePrice:basePrice,
    taxAmount: taxAmount,
    transactionTotal: transactionTotal,
    shipping: shipping,
    currency: currency,
    total: {
      basePrice:basePrice,
      currency: currency,
      taxAmount: taxAmount,
      transactionTotal: transactionTotal,
      shipping: shipping,
    }
  } );
};


export const updateCartAnalyticsData = ( cartData ) => {
  const { products, cart } = analytics.updateProductAndCart( cartData );
  analytics.updateAnalytics( { pageLoad: true, level: ['products', 'cart'], data: [products, cart] } );
};


export const shippingAddressView = () => {
  analytics.updateAnalytics( {
    level: ['transaction'],
    data: [{ info: { transactionId: '' } }],
    trackMsg: analytics.constVal.ECOMM_CLICK_RULE
  }, {
    navComponent: analytics.constVal.CHECKOUT,
    navSubComponent: analytics.constVal.EMAIL_SUBMIT
  } );
  analytics.updatePageInfo( 'shipping' );
};

export const addressSubmitRequest = () => {
  analytics.updateAnalytics( {
    trackMsg: analytics.constVal.ECOMM_CLICK_RULE
  }, {
    navComponent: analytics.constVal.CHECKOUT,
    navSubComponent: analytics.constVal.SHIP_ADD_SUBMIT
  } );
};

