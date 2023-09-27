import { call, put } from 'redux-saga/effects';
import { fetchWarrantyService } from 'library/store/cart/service-request';
import { addWarrantyDetail } from 'library/store/cart/actions';
import { formatPrice } from 'xps-utils/normalize';
import get from 'lodash.get';

/**
 * Method is responsible for normalizing the product respnse
 * @param {Array} response response object from CT
 * @param {Object} warrantyMap warranty detail from cart slice
 * @returns {Object}
 */
function normalizeResponse( response, warrantyMap ){

  return response.reduce( ( accum, current )=>{
    const { id, masterData: { current: { name, masterVariant } = {} } = {} } = current;
    const { prices = [], sku } = masterVariant || {};
    const { channel } = warrantyMap[id];
    const currentPrice = prices.find( ( each )=>{
      const id = get( each, 'channel.id' );
      return channel === id;
    } ) || {};
    const centAmount = get( currentPrice, 'value.centAmount' );
    const formattedPrice = formatPrice( currentPrice.value );

    return { ...accum, [id]: { name, centAmount, formattedPrice, id, sku, channel } };
  }, {} );

}

/**
 * This saga is responsible for fetching warranty details
 * @param {Object} warrantyMap warranty information from cart slice
 */
export function* fetchWarrantyList( warrantyMap = {} ){

  try {
    const warrantyIds = Object.keys( warrantyMap ).map( ( each ) => `"${ each }"` )
    .join( ',' );
    const variables = { Where: `id in (${ warrantyIds })` };
    const warrantyList = yield call( fetchWarrantyService, { variables } );
    const results = get( warrantyList, 'data.products.results', [] );
    const normalizedResponse = normalizeResponse( results, warrantyMap );
    yield put( addWarrantyDetail( normalizedResponse ) );
  }
  catch ( e ){
    console.error( e );
  }

}