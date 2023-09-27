/**
 * Convert all labels to uppercase for easy downstream comparison
 * @param {any} items algolia items
 * @param {Array} tileList array of objects from aem
 * @returns {Array}
 * */
export const useUpperCase = ( items, tileList ) => {
  const _items = items.map( ( item ) => {
    return {
      ...item,
      label: item.label.toUpperCase()
    };
  } );

  const _tileList = tileList.map( ( tile ) => {
    return {
      ...tile,
      algoliaAttrMapVal: tile.algoliaAttrMapVal.toUpperCase()
    };
  } );

  return [_items, _tileList];
};
