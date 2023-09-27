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
export const selectCardAuthorized = createSelector( selectState, ( { cardAuthorized } ) => cardAuthorized );
export const selectCardInfo = createSelector ( selectState, ( { cardInfo } ) => cardInfo || {} );
export const selectMaskedCardDetails = createSelector ( selectState, ( { maskedCardDetails } ) => maskedCardDetails || {} );
export const selectPaypalAuthorized = createSelector( selectState, ( { paypalAuthorized } ) => paypalAuthorized );
export const selectPaymentDetail = createSelector( selectState, ( { paymentDetail } ) => paymentDetail || {} );
export const selectActivePayment = createSelector( selectState, ( { activePayment } ) => activePayment || '' );
export const selectPaymentId = createSelector( selectResults, ( { id } ) => id );
export const selectPaymentMethods = createSelector( selectResults, ( { paymentMethods } ) => paymentMethods || {} );
export const selectResponseParsed = createSelector( selectResults, ( { responseParsed } ) => responseParsed || {} );

export const selectIsLoading = createSelector( selectState, ( { isLoading } ) => isLoading );
