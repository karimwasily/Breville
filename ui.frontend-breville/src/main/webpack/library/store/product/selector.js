import { createSelector } from 'reselect';
import { formatPrice } from 'xps-utils/normalize';
import { selectLocale, selectWebChannel } from '../global/selector';
import { SLICE_NAME } from './constant';

import { getAvailability, getPrice, getVariantColor } from 'library/utils/normalize';

/**
 * Gets the sub-state slice from the store
 * @param {object} state global state
 * @returns {object} sub-state slice
 */
export const getStateSlice = ( state = {} ) => state[SLICE_NAME] || {};

// memoized selector of the sub-state slice
export const selectState = createSelector( getStateSlice, ( state ) => state );

export const selectResults = createSelector( selectState, ( { results } ) => results || {} );

export const selectIsLoading = createSelector( selectState, ( { isLoading } ) => isLoading );

export const selectProductParent = createSelector( selectState, ( state ) => state.productParent );
export const selectProductItemGroupID = createSelector( selectProductParent, ( productParent ) => productParent?.masterData?.current?.allVariants?.[0]?.attributesRaw?.find( ( attr ) => attr.name === 'productType' )?.value );

export const selectProductName = createSelector( selectProductParent, ( productParent ) => productParent?.masterData?.current?.name );

export const selectPrice = createSelector( selectState, ( state ) => state.price );
export const selectAvailability = createSelector( selectState, ( state ) => state.availability );

export const selectChannelKEY = createSelector( selectState, ( state ) => state.channelKEY );
export const selectVariants = createSelector( selectState, ( state ) => state.variants );
export const selectProductVariant = createSelector( selectState, ( state ) => state.productVariant );
export const selectProductVariantSKU = createSelector( selectProductVariant, ( variant ) => variant?.sku );

export const selectProductVariantPDPImage = createSelector( selectProductVariant, ( variant ) => variant?.images?.find( ( image ) => image.label === 'pdp' )?.url );

export const selectProductVariantColor = createSelector( selectProductVariant, selectLocale, ( variant, locale ) => getVariantColor( variant, locale ) );

export const selectProductVariantPrice = createSelector( selectProductVariant, selectWebChannel, ( variant, webChannel ) => getPrice( variant, webChannel ) );

export const selectProductVariantAvailability = createSelector( selectProductVariant, selectWebChannel, ( variant, webChannel ) => getAvailability( variant, webChannel ) );