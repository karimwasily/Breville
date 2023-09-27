import { kebabToSnakeCase } from 'xps-utils/format'

/**
 * convert algolia attribute to include locale suffix
 * parentItemName => parentItemName_en_US
 * @param {string} attr algolia attribute
 * @param {string?} locale aem locale
 * @returns {string}
 */
export const algoliaAttrLocale = (attr, locale = 'en-US') => {
  return `${attr}_${kebabToSnakeCase(locale)}` 
}

/**
 * get every attribute with the specified locale suffix and create an additional attribute without it to be consumed
 * eg: productCallout_en_US -> productCallout
 * @param {object} hit algolia hit record
 * @param {string} locale region (en-US)
 * @returns {object} updatedHit with additional attributes
 */
export const addDefaultAttrsBasedOnLocale = (hit, locale) => {
  const suffix = '_' + kebabToSnakeCase(locale)

  return Object.entries(hit).reduce((updatedHit, [key, val]) => {
    if (key.includes(suffix)) {
      updatedHit[key.replace(suffix, '')] = val
    }
    updatedHit[key] = val
    return updatedHit
  }, {})
}

/**
 * normalise the breville algolia hit data to be used in generic react components
 * @param {object} hit - returned hit data from algolia search response
 * @param {string} locale - locale suffix to append to algolia attributes
 * @returns {object} - transformed hit for generic react components to use
 */
export const normalizeBrevilleHit = ( hit, locale = 'en-US' ) => {
  const updatedHit = addDefaultAttrsBasedOnLocale(hit, locale)

  return {
    ...updatedHit,
    key: updatedHit.objectID,
    sku: updatedHit.objectID,
    imgSrc: updatedHit.tile_image,
    imgAlt: ''
  }
}

/**
 * normalise the algolia hit returned from Beanz index
 * @param {object} hit algolia record
 * @param {string} locale locale suffix to append to algolia attributes
 * @returns {object} - transformed hit for generic react components to use
 */
export const normalizeBeanzHit = ( hit, locale = 'en-US' ) => {
  const updatedHit =  addDefaultAttrsBasedOnLocale(hit, locale)
  return {
    ...updatedHit,
    brand: updatedHit?.vendorName?.trim() || updatedHit.Our_Roasters,
    roast: updatedHit.WEB_ROASTLEVEL || updatedHit.The_Roast,
    flavour: updatedHit.WEB_FLAVOURNOTES || updatedHit.Coffee_Flavors 
  }
}
