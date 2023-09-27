export const isBrowser = typeof window !== 'undefined';

export const isNavigator = typeof navigator !== 'undefined';


/**
 * utility to check the given date valid or not
 * @param {string} date 
 * @returns {boolean} true or false : returns true for valid; else false
 */

export const isValidDate = ( arg ) => {
    if( !arg ) return;
    return !isNaN( new Date( arg ).getTime() );
};

/**
 * utility to return the object with query string parameters
 * @param {string} url // location.search
 * @returns {object}
 */

export const searchParams = ( url ) =>{
    const result = {}
    if( !url ) return result;
    const urlParams = new URLSearchParams(url);
    for(const [key, value] of urlParams) { 
        result[key] = value;
    }
    return result;
};

/**
 * helper to check if an object is empty
 * @param {object} obj object to check whether is empty
 * @returns {boolean}
 */
export const isObjectEmpty = ( obj ) => obj && Object.keys(obj).length === 0 && obj.constructor === Object
