import { formatPrice, normalizeByName, tryJsonParse } from 'xps-utils/normalize';
import get from 'lodash.get';

/**
 * This method returns the category for product based on provided attributes
 * @param {{lineItemMode: String, subscriptionVariant: Boolean}} param0 required attributes to determine category
 * @returns {String}
 */
export function getProductCategory( { lineItemMode, subscriptionVariant } ){

  if ( lineItemMode === 'GiftLineItem' ) return 'giftItems';
  if ( subscriptionVariant ) return 'subscription';
  return 'standard';
}

/**
 * This function will normalize totalPrice and price in cartresponse
 * @param {Object} lineItemData response from cart call
 * @returns {Object}
 */
export function normalizeLineItemPrice( lineItemData ){
  const { totalPrice, quantity, price: { value, discounted } = {}, totalGross = 0 } = lineItemData;

  const { centAmount } = totalPrice;
  const taxAmount = totalGross ? totalGross - centAmount : 0;
  const { value: discountedValue } = discounted || {};
  return {
    discounted: formatPrice( discountedValue ),
    totalPrice: formatPrice( totalPrice ),
    originalTotalPrice: formatPrice( value, quantity ),
    price: formatPrice( value ),
    taxAmount,
    totalPriceCentAmt: centAmount,
    originalTotalPriceCentAmt: value
  };
}

/**
 * This method is responsible for localizing the attribute
 * @param {Object} attributesRaw attributesRaw object from CT
 * @param {String} region current region
 * @returns {Object}
 */
export function localizeAttributeRaw( attributesRaw, region ){

  return attributesRaw.reduce( ( accum, { name, value } ) => {
    if ( !name ) return accum;

    return { ...accum, [name]: tryJsonParse( value[region] || value ) };
  }, {} );
}

/**
 * This method is responsible for normalizing each line item in cart
 * @param {Object} lineItem each line item data from cart response
 * @param {Object} normalized final normalized object to be constructed
 * @param {String} region current localize region
 * @returns {*}
 */
export function normalizeLineItem( lineItem = {}, normalized, region ) {

  const { custom, productId, variant = {}, lineItemMode, ...others } = lineItem;
  const totalGross = get( others, 'taxedPrice.totalGross.centAmount' );
  const normalizedPrice = normalizeLineItemPrice( { ...lineItem, totalGross } );
  const formattedTotalGross = formatPrice( get( others, 'taxedPrice.totalGross' ) );
  const { sku: key, attributesRaw, ...otherVariantData } = variant;
  const normalizedAttributesRaw = localizeAttributeRaw( attributesRaw, region );
  const { productType, subscriptionVariant } = normalizedAttributesRaw || {};
  const productCategory = getProductCategory( { lineItemMode, subscriptionVariant } );
  const isDynamicBundle = productType === 'DB';
  if ( isDynamicBundle )normalized.hasDynamicBundle = isDynamicBundle;
  const warranty = normalizedAttributesRaw['warranty-reference'] || [];


  const normalizedWarranty = warranty.reduce( ( accum, each )=>{
    const product = each.filter( ( each )=>each.name === 'associated-product' )[0]?.value?.[0]?.id;
    const channel = each.filter( ( each )=>each.name === 'channel' )[0]?.value?.id;
    normalized.warrantyMap[product] = { product, channel };
    const rank = each.filter( ( each )=>each.name === 'rank' )[0]?.value;
    return { ...accum, [rank]: product };
  }, {} );

  if ( !isDynamicBundle ) {
    normalized.totalItems = normalized.totalItems + others.quantity;
    normalized[productCategory]?.push( key );
  }
  // NOTE: If custom is null then it is parent or lineitem
  if ( !custom ) {
    normalized.parent[key] = {
      ...lineItem,
      giftItems: [],
      subscription: [],
      standard: [],
      ...normalizedPrice,
      variant: { ...variant, attributesRaw: normalizedAttributesRaw },
      isDynamicBundle,
      warranty: normalizedWarranty,
      lineItemMode,
      totalGross,
      formattedTotalGross
    };
    return null;
  }

  const normalizedCustom = normalizeByName( custom.customFieldsRaw, true );
  const { parent_dynamic_bundle: parentDynamiceBundle } = normalizedCustom;
  normalized.child[key] = {
    metaInfo: normalizedCustom,
    productId,
    variant: { ...variant, attributesRaw: normalizedAttributesRaw },
    ...others,
    ...normalizedPrice,
    lineItemMode,
    warranty: normalizedWarranty,
    totalGross,
    formattedTotalGross
  };
  if ( parentDynamiceBundle ) {
    if ( !normalized.parent[parentDynamiceBundle] ) return;
    normalized?.parent[parentDynamiceBundle]?.[productCategory].push( key );
    normalized.parent[parentDynamiceBundle].isBundle = true;
  }
}

/**
 * This method will normalize the cart data
 * @param {Object} response response object from the CT
 * @returns {Object}
 */
export function nomralizeCart( response ) {
  const cartData = get( response, 'data.me.activeCart', {} );
  const { region } = response;
  const { lineItems, totalPrice, taxedPrice, ...otherData } = cartData;

  const normalized = {
    parent: {},
    child: {},
    totalItems: 0,
    warrantyMap: {},
    giftItems: [],
    subscription: [],
    standard: []
  };

  const { centAmount: subTotalCentAmt } = totalPrice;
  const { totalGross = {}, taxPortions = [] } = taxedPrice || {};
  const taxAmount = get( taxPortions, '0.amount' );
  const shippingAmount = get( otherData, 'shippingInfo.price', {} );
  lineItems.forEach( ( each )=>{
    normalizeLineItem( each, normalized, region );
  } );

  return {
    lineItems: normalized,
    subTotal: formatPrice( totalPrice ),
    totalGross: formatPrice( totalGross ),
    totalGrossCentAmt: totalGross.centAmount,
    taxAmount: formatPrice( taxAmount ),
    shippingAmount: formatPrice( shippingAmount ),
    subTotalCentAmt,
    showTotalSection: Boolean( taxedPrice ),
    ...otherData };
}
