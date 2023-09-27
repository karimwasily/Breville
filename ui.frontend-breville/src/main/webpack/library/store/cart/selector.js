import { createSelector } from 'reselect';
import { SLICE_NAME } from './constant';

/**
 * Gets the sub-state slice from the store
 * @param {object} state global state
 * @returns {object} sub-state slice
 */
export const getStateSlice = ( state = {} ) => state[SLICE_NAME] || {};

// memoized selector of the sub-state slice
export const selectState = createSelector( getStateSlice, ( state ) => state );

export const selectResults = createSelector( selectState, ( { results } ) => results || {} );
export const selectHasPayments = createSelector( selectResults, ( { paymentInfo } ) =>{
  return Boolean( paymentInfo?.payments?.length );
} );

export const selectWarrantyDetail = createSelector( selectState, ( { warrantyDetail } ) => warrantyDetail || {} );
export const selectCoverageDetails = createSelector( selectState, ( state ) => state?.coverageSummary?.coverage_details || {} );
export const selectIsFetched = createSelector( selectState, ( { fetched } ) => fetched );
export const selectCartVersion = createSelector( selectResults, ( { version } ) => version );

export const selectWait = createSelector( selectState, ( state ) => state.wait );

export const selectOrderSummaryPrice = createSelector( selectResults, ( { subTotal, totalGross, taxAmount, shippingAmount, showTotalSection } )=>( {
  subTotal,
  totalGross,
  taxAmount,
  shippingAmount,
  showTotalSection
} ) );

export const selectTotalGrossFormatted = createSelector( selectResults, ( { totalGross } )=>totalGross );
export const selectTotalCentAmt = createSelector( selectResults, ( { subTotalCentAmt } )=>subTotalCentAmt );
export const selectTotalGrossAmt = createSelector( selectResults, ( { totalGrossCentAmt } )=>totalGrossCentAmt );

export const selectLineItems = createSelector( selectResults, ( state )=>state.lineItems || {} );

export const selectSubscriptionItemGrossAmt = createSelector(
  selectLineItems,
  ( state )=>{

    const { parent = {}, child = {}, subscription = [] } = state;
    let subscriptionGross = 0;
    subscription.forEach( ( each )=> {
      const current = parent[each] || child[each] || {};
      const { totalGross } = current;
      subscriptionGross = totalGross + subscriptionGross;
    } );

    return subscriptionGross;

  } );

export const selectStandardItemGrossAmt = createSelector(
  selectTotalGrossAmt,
  selectSubscriptionItemGrossAmt,
  ( totalGrossCentAmt, subscriptionGrossAmt )=>( totalGrossCentAmt - subscriptionGrossAmt )
);

/**
 * This Selector will select only standard line items products from cart
 */
export const selectStandardItemPayload = createSelector( selectLineItems, ( state )=>{
  const { parent = {}, child = {}, standard = [] } = state;

  return standard.map( ( each )=>{
    const current = parent[each] || child[each] || {};
    const { totalPriceCentAmt, taxAmount, name, productId, quantity, variant: { images = [] } = {} } = current;

    return {
      amountExcludingTax: totalPriceCentAmt,
      description: name,
      id: productId,
      imageUrl: images[0]?.url,
      quantity,
      taxAmount
    };

  } );
} );

export const selectBeanzSubscription = createSelector( selectLineItems, ( state )=>{
  const { parent = {}, child = {}, subscription = [] } = state;
  const current = subscription[0];
  return parent[current] || child[current] || {};
} );

export const selectBeanzFormattedGrossPrice = createSelector( selectBeanzSubscription, ( state )=>state.formattedTotalGross || '' );

export const selectLineItemsCount = createSelector( selectLineItems, ( state )=>{
  return state?.totalItems;
} );

export const selectIsLoading = createSelector( selectState, ( { isLoading } ) => isLoading );

export const selectProducts = createSelector( selectResults, ( state )=>state.products );

export const selectBillingAddress = createSelector( selectResults, ( state )=>state.billingAddress || {} );
export const selectShippingAddress = createSelector( selectResults, ( state )=>state.shippingAddress || {} );
export const selectShippingInfo = createSelector( selectResults, ( state )=>state.shippingInfo || {} );

export const selectOrderDetail = createSelector ( selectState, ( state )=>state.orderDetail || {} );
export const selectDiscountCodes = createSelector( selectResults, ( state )=>state.discountCodes || {} );
