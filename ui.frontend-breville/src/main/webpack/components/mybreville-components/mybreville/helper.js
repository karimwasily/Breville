import { isValidDate } from 'xps-utils/misc';

export const productNameConversion = ( name, isMachineDetails = false ) => {
  const regEx = /^the\W/; // matching the starting with "the" if yes! then replace it with "My"
  switch ( isMachineDetails ){
    case false : return name?.replace( regEx, 'My ' ) || name;
    case true : return name?.replace( regEx, '' ) || name;
    default: return name?.replace( regEx, 'My ' ) || name;
  }
};

export const nthDay = ( day ) => {
  if ( day >= 11 && day <= 13 ) {
    return `${ day }th`;
  }
  switch ( day % 10 ) {
    case 1:
      return `${ day }st`;
    case 2:
      return `${ day }nd`;
    case 3:
      return `${ day }rd`;
    default:
      return `${ day }th`;
  }
};

/**
 * utility to check whether the recent order date has passed the 14 days or not
 * @param {string} date
 * @returns {boolean} true or false: true if the order date + 14 days smaller or equal than current date; else returns false
 */

export const daysDeltaToToday = ( targetDate ) => {
  if ( !isValidDate( targetDate ) ) return;
  const second = 1000; // miliseconds
  const minute = 60; // seconds
  const hour = 60; // minutes
  const day = 24 * hour * minute;
  const dayInMiliseconds = day * second;
  const currentDateInMS = new Date( Date.now() ).valueOf();
  const targetDateUInMS = new Date( targetDate ).valueOf();
  return ( currentDateInMS - targetDateUInMS ) / dayInMiliseconds;
};

export const isCoffeeProduct = ( primaryWebCategory ) =>{
  // The fixed coffee product list
  const coffeeProducts = [ 'COFFEE', 'COFFEEGRINDERS', 'ESPRESSO', 'NESPRESSO' ];
  return coffeeProducts.some( ( productCategory )=> productCategory === String( primaryWebCategory || '' ).toUpperCase() );
};