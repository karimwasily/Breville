import request from 'library/api/request';
import * as ctSchema from 'library/schema/ct/';
import { createCartVars, createCartWithBundleVars, updateCartBundleLineItemsVars, updateCartLineItemVars, updateCartTaxModeVars } from './helper';

/**
 * get all dynamic bundle product categories
 * @param {{locale: string}} variables graphql variables
 * @param {object?} options request options
 * @returns {*}
 */
export const getDynamicBundleProductCategoriesRequest = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.getDynamicBundleProductCategoriesQuery, variables, ...options } );

/**
 * get bundle category via KEY
 * @param {{key: string}} variables graphql variables
 * @param {object?} options request options
 * @returns {*}
 */
export const getBundleCategoryViaKEYRequest = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.bundleCategoryQuery, variables, ...options } );

/**
 * get dynamic bundle via category ID
 * @param {{where: string}} variables graphql variables
 * @param {object?} options request options
 * @returns {*}
 */
export const getDynamicBundlesViaCategoryIDRequest = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.getDynamicBundlesViaCategoryQuery, variables, ...options } );

/**
 * get all finished goods via bundle KEY
 * @param {{where: string, locale: string}} variables graphql variables
 * @param {object?} options request options
 * @returns {*}
 */
export const getMachinesViaFinishedGoodsKEYRequest = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.getMachinesViaFinishedGoodsKEY, variables, ...options } );

/**
 * get coffee plan
 * @param {{sku: string}} variables graphql variables
 * @param {object?} options request options
 * @returns {*}
 */
export const getCoffeePlan = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.getCoffeePlanQuery, variables, ...options } );

/**
 * create cart
 * * currency and country information is provided to dynamically update tax mode externally
 * @param {object} variables variables
 * @param {string} variables.currency currency code for the cart (USD)
 * @param {string} variables.country country code for the cart (US)
 * @param {object?} options request options
 * @returns {*}
 */
export const createCartRequest = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.createCartMutation, variables: createCartVars( variables ), ...options } );

/**
 * get cart info
 * @param {{id: string}} variables graphql variables
 * @param {object?} options request options
 * @returns {*}
 */
export const getCartRequest = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.getCartQuery, variables, ...options } );

/**
 * create cart and add bundle items
 * @param {object} variables variables
 * @param {string} variables.dynamicBundleVariantSKU sku of the dyn bun variant
 * @param {string} variables.dynamicBundleFinishedGoodSKU sku of the finished good within the dynamic bundle product
 * @param {string} variables.coffeeSubscriptionSKU sku of the beanz subscription
 * @param {string} variables.webchannel web channel key of the bundle and finished good line items (breville-web-us)
 * @param {string} variables.currency currency code for the cart (USD)
 * @param {string} variables.country country code for the cart (US)
 * @param {object?} options request options
 * @returns {*}
 */
export const createCartWithBundleRequest = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.createCartMutation, variables: createCartWithBundleVars( variables ), ...options } );

/**
 * update cart to update tax mode
 * @param {object} variables variables
 * @param {string} variables.cartID cart ID (4b46c5f6-7106-475b-8dd0-a3d502d23cec)
 * @param {string} variables.cartVersion cart version (5)
 * @param {string} variables.locale locale region (en-US)
 * @param {string} variables.country country code (US)
 * @param {object?} options request options
 * @returns {*}
 */
export const updateCartTaxModeRequest = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.updateCartMutation, variables: updateCartTaxModeVars( variables ), ...options } );

/**
 * update cart line items
 * @param {object} variables variables
 * @param {string} variables.dynamicBundleVariantSKU sku of the dyn bun variant
 * @param {string} variables.dynamicBundleFinishedGoodSKU sku of the finished good within the dynamic bundle product
 * @param {string} variables.coffeeSubscriptionSKU sku of the beanz subscription
 * @param {string} variables.cartID cart ID (4b46c5f6-7106-475b-8dd0-a3d502d23cec)
 * @param {string} variables.cartVersion cart version (5)
 * @param {string} variables.country country code (US)
 * @param {string} variables.locale locale region (en-US)
 * @param {string} variables.webchannel webchannel (breville-web-us)
 * @param {object?} options request options
 * @returns {*}
 */
export const updateCartBundleLineItemsRequest = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.updateCartMutation, variables: updateCartBundleLineItemsVars( variables ), ...options } );

/**
 * get associated dynamic bundle information from a finished good sku
 * @param {object} variables variables
 * @param {string} variables.key KEY of the finished good (algolia = parentItemID)
 * @param {object?} options request options
 * @returns {*}
 */
export const getAssociatedDynamicBundle = ( variables, options = {} ) => request.get( 'CTRestService', { url: `products/${ variables.key }`, ...options } );
// * original query has been simplified via proxy
// export const getAssociatedDynamicBundle = ( variables, options = {} ) => request.get( 'CTRestService', { url: `products?where=masterData(current(masterVariant(attributes(name%3D"finishedGoodsKey"+and+value%3D"${ variables.sku }"))))&expand=masterData.current.masterVariant.attributes[*].value.value&expand=masterData.current.variants.attributes[*].value.value`, ...options } );