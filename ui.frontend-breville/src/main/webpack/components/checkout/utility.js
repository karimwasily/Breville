import codesCountry from './shipping/codes-country.json';

const parseAddressToArray = function ( obj ) {
  // parses address into array
  const parsedObj = {};
  for ( const key in obj ) {
    const parsedKey = key.split( '_' );
    if ( parsedKey.length === 2 ) {
      const temp = {};
      temp[parsedKey[1]] = obj[key];
      parsedObj[parsedKey[0]] = { ...parsedObj[parsedKey[0]], ...temp };
    }
    else {
      parsedObj[parsedKey] = obj[key];
    }
  }
  return parsedObj;
};

const mapAddressToCommerceTools = function ( address ) {
  const {
    address1 = '',
    address2 = '',
    city = '',
    email = '',
    firstName = '',
    lastName = '',
    phone = '',
    state = '',
    zipCode = ''
  } = address;

  return {
    city,
    email,
    firstName,
    lastName,
    phone,
    state,
    country: 'US',
    streetName: address1,
    additionalStreetInfo: address2,
    postalCode: zipCode
  };
};

const mapCommerceToolsToAddress = function ( ct ) {
  const {
    city = '',
    email = '',
    firstName = '',
    lastName = '',
    phone = '',
    state = '',
    streetName = '',
    postalCode = '',
    additionalStreetInfo = ''
  } = ct;

  return {
    address1: streetName,
    address2: additionalStreetInfo,
    city,
    email,
    firstName,
    lastName,
    phone,
    state,
    zipCode: postalCode,
    country: 'United States'
  };
};

export {
  parseAddressToArray,
  mapAddressToCommerceTools,
  mapCommerceToolsToAddress
};
