/**
 * Construct a filter query for an array of objectIDs to pass to Algolia
 * @param {string[]} objectIDs - an array of Algolia objectID values
 * @returns {string} - config filter string to pass to <Configure /> algolia react component
 * 
 * @example 
 * const objectIDs = ["BES250XL","BES400XL", "BES500SST1BUS1", "BES800XL", "BES810BSSUSC"]
 * const config = createObjectIDFilterString(objectIDs)
 * <Configure filters={config} />
 * output >> "(objectID:BES250XL OR objectID:BES400XL OR objectI…S1 OR objectID:BES800XL OR objectID:BES810BSSUSC)"}
 * 
 */
export const createObjectIdFilterConfig = objectIDs =>
  `(${objectIDs.map(id => `objectID:${id}`).join(' OR ')})`
