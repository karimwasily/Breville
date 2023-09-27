import { formatSwatchSrc } from 'library/utils/formatSwatchVariants';
import { formatPrice } from 'xps-utils/normalize';

/**
 * get a normalized color value of the ct product variant
 * @param {object} variant ct variant
 * @param {string} locale (en-US)
 * @returns {object | null}
 */
export const getVariantColor = ( variant, locale ) => {
  const color = variant?.attributesRaw.find( ( attr ) => attr.name === 'COLOUR_TRANSLATION' )?.value;

  if ( !color ) return {};

  return {
    sku: variant.sku,
    label: color[locale],
    src: formatSwatchSrc( color )
  };
};

/**
 * get the availability value of the ct product variant
 * @param {object} variant ct variant
 * @param {string} webChannel (breville-web-us)
 * @returns {object | null}
 */
export const getAvailability = ( variant, webChannel ) => {
  if ( !variant ) return null;

  const availability = variant.availability?.channels?.results?.find( ( result ) => result.channel?.name === webChannel )?.availability;

  return availability ? availability : null;
};

/**
 * get the price value of the ct product variant
 * @param {object} variant ct variant
 * @param {string} webChannel (breville-web-us)
 * @returns {object | null}
 */
export const getPrice = ( variant, webChannel ) => {
  if ( !variant ) return null;

  // get local price based on channel
  const prices = variant.prices;
  const localePrice = prices.find( ( p ) => p.channel?.name === webChannel )?.value;
  // construct price string
  const price = {
    ...localePrice,
    displayPrice: localePrice ? formatPrice( localePrice ) : null
  };

  return localePrice ? price : null;
};

/**
 * add helper values for easier access within the CT response
 * ! this mutates the object
 * @param {object} args args
 * @param {object} args.variant ct variant
 * @param {string} args.webchannel (breville-web-us)
 * @param {string} args.locale (en-US)
 * @returns {void}
 */
export const addHelperAttributesToVariant = ( { variant, webchannel, locale } ) => {
// dynamically add helper fields
  variant._price = getPrice( variant, webchannel );
  variant._availability = getAvailability( variant, webchannel );
  variant._color = getVariantColor( variant, locale );
};

/**
 * get the variants to show to the customer
 * @param {array} allVariants allVariants field from graphql response from CT
 * @param {string} webChannel (breville-web-us)
 * @returns {array}
 */
export const getVariants = ( allVariants, webChannel ) => {
  if ( !allVariants?.length ) return [];
  // todo: also filter by web_status visibility
  const variants = allVariants.filter( ( variant ) => {
    // if a variant has a price for the current webchannel then we can show it to the customer
    const price = getPrice( variant, webChannel );
    return Boolean( price );
  } );
  return variants;
};
