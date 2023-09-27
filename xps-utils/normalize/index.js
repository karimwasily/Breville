/**
 * This method will try to parse the string to JSON first,
 * if fail will return the passed value as it is
 * @param {*} metaInfo value of metafield
 * @returns {*}
 */
 export const tryJsonParse = (metaInfo) => {
    try {
        return JSON.parse(metaInfo);
    } catch (e) {
        return metaInfo;
    }
};

/**
 * This method will normalize array by name attribute in an array
 * @param {Array} metaInfo array we get from ct
 * @param {Boolean} onlyValue it will not extend all remaining attributes in value if passed as true
 * @returns 
 */
export const normalizeByName = (metaInfo = [], onlyValue) => {
    return metaInfo.reduce((accum, { name, ...allValue }) => {
        if (!name) return accum;
        const {value} = allValue;
        return { ...accum, [name]: onlyValue ? value : allValue };
    }, {});
};

/**
 * This method will format price based on the config from CT
 * @param {{centAmount: Number, currencyCode: String, fractionDigits: Number }} price priceobject form CT
 * @param quantity this is optional params if not passed default is 1
 * @returns {String}
 */
export function formatPrice(price, quantity=1){
    if(!price) return undefined
    const currencySymbol = {USD: '$'}
    const { centAmount, currencyCode, fractionDigits } = price
    if(!centAmount) return 'FREE'
    return `${currencySymbol[currencyCode]}${((centAmount*quantity)/100).toLocaleString(undefined, {maximumFractionDigits:fractionDigits,minimumFractionDigits:fractionDigits})}`  
}