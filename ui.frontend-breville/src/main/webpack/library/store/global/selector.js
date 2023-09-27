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
export const selectIsLoading = createSelector( selectState, ( state ) => state.isLoading );

// COMPARISON
export const selectIsComparing = createSelector( selectState, ( state ) => state.isComparing );
export const selectComparionList = createSelector( selectState, ( state ) => state.comparisonList );

// AEM GLOBAL CONFIG
export const selectAemConfig = createSelector( selectState, ( state ) => state.aemConfig );

export const selectMulberryConfig = createSelector( selectAemConfig, ( aemConfig ) => ( {
  publicToken: aemConfig?.mulberrypublictoken,
  coverageKey: aemConfig?.mulberrycoveragekey
} ) );

export const selectLocale = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.locale || {} );
export const selectCountry = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.country );
export const selectLanguage = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.language );
export const selectBrand = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.brand );
export const selectWebChannel = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.webchannel );
export const selectSiteRootPath = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.siterootpath );
export const selectCurrencySymbol = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.currencysymbol );
export const selectSfNotifyMeUrl = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.sfnotifymeurl );
export const selectSfNotifyMeEnable = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.sfnotiymeenable === 'true' );
export const selectCurrencyCode = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.currencycode );
export const selectAlgoliaAppID = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.algoliaappid );
export const selectAlgoliaApiKEY = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.algoliaapikey );
export const selectAlgoliaBrevilleIndex = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.algoliabrevilleindex );
export const selectAlgoliaBeanzIndex = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.algoliabeanzindex );
export const selectRecaptchSiteKey = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.recaptchsitekey );
export const selectPurchasePageUrl = createSelector( selectAemConfig, ( aemConfig ) => `${ aemConfig?.purchasepageUrl }/cart` );
export const selectBundlePageUrl = createSelector( selectAemConfig, ( aemConfig ) => aemConfig?.bundlepageUrl );

// BASE URL
export const selectSiteBaseUrl = createSelector( selectCountry, selectLanguage, ( country, language ) => {
  // todo: this needs to be changed to using 'country' from aem config when we switch to dynamic regions and stop using language master
  const tempCountry = 'language-masters';

  return `/${ tempCountry || country }/${ language }`;
} );