import { AlgoliaHttp } from 'library/http/algoliaHttp';
import { orderBy } from 'lodash';

// todo: Algolia order data key - constant mapping
const ORDER_API_KEY = {
  orderDate: 'OrderCreatedDate',
  orderTotal: 'OrderGrandTotal'
};
const { orderDate, orderTotal } = ORDER_API_KEY;


/**
 * @typedef {Object} FilterOption
 * @property {string} label
 * @property {number} count
 * @property {boolean} active
 */

/**
 * @typedef {Object} FilterDropdownItem
 * @property {string} filterName
 * @property {array<FilterOption>} filterOptions
 */

/**
 * @typedef {array<FilterDropdownItem>} FilterDropdown
 */

/**
 * Filter dropdown helper counters
 * @param {function} t translate function
 * @param {array} orders The list of orders
 * @returns {object} A mapped object containing key of DropdownItem's label and value of the total count
 */
function generateDropdownItemCounts( t, orders ) {
  const tmpOrders = orders.slice(),
    yearsMapCount = {},
    subsMapsCount = {
      [t( 'eh-filter-label-subscription-orders' )]: 0,
      [t( 'eh-filter-label-standard-orders' )]: 0
    };

  /** Count orders types and years */
  for ( let i = 0, len = tmpOrders?.length; i < len; i++ ) {
    const order = tmpOrders[i],
      orderDate = new Date( order?.OrderCreatedDate ),
      orderDateYear = orderDate.getFullYear();

    /** Count all the years */
    if ( !isNaN( orderDateYear ) ) {
      if ( !Object.prototype.hasOwnProperty.call( yearsMapCount, orderDateYear ) ) {
        yearsMapCount[orderDateYear] = 1;
      }
      else {
        yearsMapCount[orderDateYear]++;
      }
    }

    /** Count all subscriptions */
    if ( order?.HasSubscriptions ) {
      subsMapsCount[t( 'eh-filter-label-subscription-orders' )]++;
    }
    else {
      subsMapsCount[t( 'eh-filter-label-standard-orders' )]++;
    }
  }

  return { yearsMapCount, subsMapsCount };
}

/**
 * Create a new FilterDropdown object
 * @param {function} t translate function
 * @param {array} orders The list of orders
 * @returns {FilterDropdown} A FilterDropdown
 */
export function createFilterDropdowns( t, orders ) {
  /** Merged map counters */
  const { yearsMapCount, subsMapsCount } = generateDropdownItemCounts( t, orders );
  const allYearsSorted = Object.keys( yearsMapCount ).sort( ( a, b ) => a - b );

  return [{
    filterName: t( 'eh-filter-text-type' ),
    filterOptions: [{
      label: t( 'eh-filter-label-subscription-orders' ),
      count: subsMapsCount[t( 'eh-filter-label-subscription-orders' )] || 0,
      active: false
    }, {
      label: t( 'eh-filter-label-standard-orders' ),
      count: subsMapsCount[t( 'eh-filter-label-standard-orders' )] || 0,
      active: false
    }]
  }, {
    filterName: t( 'eh-filter-text-year' ),
    filterOptions: allYearsSorted.map( ( year ) => {
      return {
        label: year,
        count: yearsMapCount[year] || 0,
        active: false
      };
    } )
  }];
}

/**
 * Updates a filter option count and return a new filter option
 * @param {function} t translate function
 * @param {array} orders The list of orders
 * @param {array<FilterOption>} filterOptions Array of filterOption
 * @returns {FilterDropdown} A FilterDropdown
 */
export function updateFilterOptionCounts( t, orders, filterOptions ) {
  /** Merged map counters */
  const { yearsMapCount, subsMapsCount } = generateDropdownItemCounts( t, orders );
  const mergedCounts = { ...yearsMapCount, ...subsMapsCount };
  const result = filterOptions.slice();

  for ( let i = 0, len = result?.length; i < len; i++ ) {
    const filterOption = result[i],
      key = filterOption?.label;

    if ( key ) {
      filterOption.count = mergedCounts[key] || 0;
    }
  }

  return result;
}


export function sortByValue( orderList, sortValue ) {
  // property: which property to sort by; direction: asc or desc
  const [property, direction] = sortValue.split( '_' );

  if ( property === 'time' ) {
    const sortFunction = ( item ) => new Date( item[orderDate] ).getTime();
    return orderBy( orderList, sortFunction, direction );
  }
  else if ( property === 'price' ) {
    return orderBy( orderList, orderTotal, direction );
  }
  else {
    return orderList;
  }
}


/**
 * Parse a ISO8601 UTC format date string into format: 'Month dd, yyyy'
 * @param {string} originalDate  ISO8601 UTC format date string
 * @returns {string} Formatted date string
 */
export function formatDateLongMonth( originalDate ) {
  const date = new Date( originalDate );
  const isInvalidDate = isNaN( date.getTime() );
  let formattedDate = '';

  if ( !isInvalidDate ) {
    const day = date.getDate();
    const month = date.toLocaleString( 'default', { month: 'long' } );
    const year = date.getFullYear();

    formattedDate = `${ month } ${ day }, ${ year }`;
  }
  return formattedDate;
}

/**
 * Parse a ISO8601 UTC format date string into format: 'mm/dd/yyyy'
 * @param {string} originalDate  ISO8601 UTC format date string
 * @returns {string} Formatted date string
 */
export function formatDate( originalDate ) {
  const date = new Date( originalDate );
  const isInvalidDate = isNaN( date.getTime() );
  let formattedDate = '';

  if ( !isInvalidDate ) {
    const day = date.getDate();
    const month = ( `0${ date.getMonth() + 1 }` ).slice( -2 );
    const year = date.getFullYear();

    formattedDate = `${ month }/${ day }/${ year }`;
  }
  return formattedDate;
}


/**
 * Multiple fetches from beanz and breville algolia for products' metadata
 * @param {array} orderItems An array of product
 * @returns {array} A new array of orderItems where each element is populated with Meta field
 */
export async function getAlgoliaProductsMeta( orderItems ) {
  if ( !orderItems || !orderItems.length ) {
    return orderItems;
  }

  // If product's meta is already in the orderItems
  if ( orderItems.every( ( orderItem ) => !!orderItem?.Meta ) ) {
    return orderItems;
  }

  const objectIds = orderItems.map( ( orderItem ) => orderItem.ProductNumber ),
    clonedOrderItems = [...orderItems];

  return AlgoliaHttp.getHitByObjectIds( objectIds ).then( ( hits ) => {
    for ( let i = 0, len = hits?.length; i < len; i++ ) {
      const hit = hits[i],
        clonedOrderItem = clonedOrderItems[i],
        isSameId = clonedOrderItem.ProductNumber.toUpperCase() === hit?.objectID.toUpperCase();

      if ( hit && isSameId ) {
        clonedOrderItem.Meta = {
          primaryWebCategory: ( hit?.primaryWebCategory || '' ),
          orderImages: ( hit.cart_image ? hit.cart_image : ''  ),
          orderImagesName: ( hit.productName ? hit.productName : '' ),
          orderColor: ( hit.color_en_US ? hit.color_en_US : '' ),
          orderColorSwatch: ( hit.color_swatch ? hit.color_swatch : '' ),
          orderItemGroupId: ( hit.itemGroupID ? hit.itemGroupID : '' ),
          orderRoasterName: ( hit.Our_Roasters ? hit.Our_Roasters : '' ),
          orderParentId: ( hit.parentItemID ? hit.parentItemID : '' )
        };
      }
    }

    return clonedOrderItems;
  } );
}

/**
 * DEPRECATED
 * Single fetch from beanz and breville algolia for a product metadata
 * @param {object} orderItem A product
 * @returns {object} a new object of product where it is populated with Meta field
 * @deprecated Use getAlgoliaProductsMeta and pass a single item in an array instead.
 */
export async function getAlgoliaProductMeta( orderItem ) {
  const clonedOrderItem = Object.assign( {}, orderItem );

  if ( !clonedOrderItem?.ProductNumber ) {
    return Promise.resolve( clonedOrderItem );
  }

  return new Promise( ( resolve ) => {
    AlgoliaHttp.searchProductByNumber( clonedOrderItem.ProductNumber ).then( ( matchingHit ) => {
      if ( matchingHit ) {
        clonedOrderItem.Meta = {
          orderImages: ( matchingHit.cart_image ? matchingHit.cart_image : ''  ),
          orderImagesName: ( matchingHit.productName ? matchingHit.productName : '' ),
          orderColor: ( matchingHit.color_en_US ? matchingHit.color_en_US : '' ),
          orderColorSwatch: ( matchingHit.color_swatch ? matchingHit.color_swatch : '' ),
          orderItemGroupId: ( matchingHit.itemGroupID ? matchingHit.itemGroupID : '' ),
          orderRoasterName: ( matchingHit.Our_Roasters ? matchingHit.Our_Roasters : '' )
        };
      }
      else {
        throw 'No hits from algolia';
      }

      resolve( clonedOrderItem );
    } )
    .catch( () => {
      clonedOrderItem.Meta = {};
      resolve( clonedOrderItem );
    } );
  } );
}
