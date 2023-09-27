import request from 'library/api/request';
import * as ctSchema from 'library/schema/ct/';
import { updateCartLineItemVars } from './helper';

/**
 * get product parent and all variantions
 * @param {{locale: string, productParentSKU: string}} variables graphql variables
 * @param {object?} options request options
 * @returns {*}
 */
export const getProductParentRequest = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.getProductParentQuery, variables, ...options } );

/**
 * update cart line items
 * @param {object} variables variables
 * @param {string} variables.sku sku of the dyn bun variant
 * @param {number} [variables.quantity] quantity
 * @param {string} variables.coffeeSubscriptionSKU sku of the beanz subscription
 * @param {string} variables.cartID cart ID (4b46c5f6-7106-475b-8dd0-a3d502d23cec)
 * @param {string} variables.cartVersion cart version (5)
 * @param {string} variables.country country code (US)
 * @param {string} variables.locale locale region (en-US)
 * @param {string} variables.webchannel webchannel (breville-web-us)
 * @param {string} variables.warrantySKU SKU for Mulberry Warranty (EW4YRNW450)
 * @param {object?} options request options
 * @returns {Promise}
 */
export const updateCartLineItemRequest = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.updateCartMutation, variables: updateCartLineItemVars( variables ), ...options } );

/**
 * get parent products and all variantions
 * @param {object} variables variables
 * @param {string[]} variables.skus graphql variables
 * @param {object?} options request options
 * @returns {*}
 */
export const getAllProducts = ( variables, options = {} ) => request.post( 'CTGraphqlService', { query: ctSchema.getProductsQuery, variables, ...options } );