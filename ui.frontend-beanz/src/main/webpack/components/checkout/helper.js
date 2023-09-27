import { showErrorModal } from '../../../webpack/aem-components/beanz/errormodal/js/errormodal';
export const countries = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' }
];

export const states = [
  { value: '-1', label: 'Please Select' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AP', label: 'Armed Forces Pacific' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'FM', label: 'Fedrated Micronesia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'GU', label: 'Gaum' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PW', label: 'Palau' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'VI', label: 'US Virgin Islands' },
  { value: 'UM', label: 'United States Minor Outlying Islands' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];

export const inputsFields = {
  inputs: {
    email: { value: '', isValid: false, isTouched: false },
    shippingFirstName: { value: '', isValid: false, isTouched: false },
    shippingLastName: { value: '', isValid: false, isTouched: false },
    shippingStreetAddress: { value: '', isValid: false, isTouched: false },
    shippingStreetAddress2: { value: '', isValid: true, isTouched: false },
    shippingCityTown: { value: '', isValid: false, isTouched: false },
    shippingZipcode: { value: '', isValid: false, isTouched: false },
    shippingStates: { value: '', isValid: false, isTouched: false },
    shippingPhone: { value: '', isValid: false, isTouched: false },
    countries: { value: '', isValid: true, isTouched: false },
    billingFirstName: { value: '', isValid: false, isTouched: false },
    billingLastName: { value: '', isValid: false, isTouched: false },
    billingStreetAddress: { value: '', isValid: false, isTouched: false },
    billingStreetAddress2: { value: '', isValid: true, isTouched: false },
    billingCityTown: { value: '', isValid: false, isTouched: false },
    billingZipcode: { value: '', isValid: false, isTouched: false },
    billingStates: { value: '', isValid: false, isTouched: false },
    billingPhone: { value: '', isValid: false, isTouched: false },
    sameBillingAddress: { value: true, isValid: true, isTouched: false }
  }
};

export const mapAddress = ( address, isWelcomed, type ) => {
  if ( isWelcomed ) {
    address.FirstName = address.FirstName ? address.FirstName : address.Name.split( ' ' )[0];
  }
  try {
    const newAddress = {
      [`${ type }FirstName` ]: isWelcomed ? address.FirstName : address.firstName,
      [`${ type }LastName`]: isWelcomed ? address.LastName : address.lastName,
      [`${ type }StreetAddress`]: isWelcomed ? address.Shipping_Street_Line_1__c : address.streetName,
      [`${ type }StreetAddress2`]: isWelcomed ? address.Shipping_Street_Line_2__c : address.additionalStreetInfo,
      [`${ type }Zipcode`]: isWelcomed ? address.ShippingPostalCode : address.postalCode,
      [`${ type }CityTown`]: isWelcomed ? address.ShippingCity : address.city,
      [`${ type }States`]: isWelcomed ? address.ShippingState : address.state,
      [`${ type }Phone`]: isWelcomed ? address.Phone : address.phone,
      countries: isWelcomed ? address.ShippingCountryCode : address.country,
      email: isWelcomed ? address.PersonEmail : address.email
    };
    return newAddress;
  }
  catch ( error ) {
    return null;
  }
};

export const isFormValidCheck = ( state, action ) => {
  let formIsValid = true;
  for ( const inputId in state.inputs ) {
    if ( state.inputs.sameBillingAddress.value || ( action.inputId === 'sameBillingAddress' && action.isValid ) ) {
      if ( !inputId.startsWith( 'billing' ) ) {
        if ( inputId === action.inputId ) {
          formIsValid = formIsValid && action.isValid;
        }
        else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
    }
    else {
      if ( inputId === action.inputId ) {
        formIsValid = formIsValid && action.isValid;
      }
      else {
        formIsValid = formIsValid && state.inputs[inputId].isValid;
      }
    }
  }
  return formIsValid;
};

export const formReducer = ( state, action ) => {

  switch ( action.type ) {
    case 'INPUT_CHANGE':
      const formIsValid = isFormValidCheck( state, action );
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid, isTouched: action.isTouched }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

export const emptyCartHandler = () => {
  showErrorModal( '.emptyCartErrorModal' );
  const errorModalButtons = document.querySelectorAll( '.emptyCartErrorModal .errormodal_dialog-close,.emptyCartErrorModal .errormodal_btn--primary' );
  errorModalButtons.forEach( ( button ) => {
    button.addEventListener( 'click', function ( e ) {
      e.preventDefault();
      window.location.href = './cart.html';
    } );
  } );
};

export const getUpdatedAddress = ( data, isShippingAddress ) => {
  const address = {
    country: 'US',
    firstName: isShippingAddress ? data.shippingFirstName.value : data.billingFirstName.value,
    lastName: isShippingAddress ? data.shippingLastName.value : data.billingLastName.value,
    streetName: isShippingAddress ? data.shippingStreetAddress.value : data.billingStreetAddress.value,
    additionalStreetInfo: isShippingAddress ? data.shippingStreetAddress2.value : data.billingStreetAddress2.value,
    postalCode: isShippingAddress ? data.shippingZipcode.value : data.billingZipcode.value,
    city: isShippingAddress ? data.shippingCityTown.value : data.billingCityTown.value,
    region: isShippingAddress ? data.shippingStates.value : data.billingStates.value,
    state: isShippingAddress ? data.shippingStates.value : data.billingStates.value,
    phone: isShippingAddress ? data.shippingPhone.value : data.billingPhone.value,
    email: data.email.value
  };
  return address;
};

export const accountShippingAddress = ( data ) => {
  const accountShippingData = {
    FirstName: data.shippingFirstName.value,
    LastName: data.shippingLastName.value,
    Phone: data.shippingPhone.value,
    ShippingCity: data.shippingCityTown.value,
    ShippingCountryCode: 'US',
    ShippingPostalCode: data.shippingZipcode.value,
    ShippingStateCode: data.shippingStates.value,
    ShippingStreet: data.shippingStreetAddress.value,
    Shipping_Street_Line_1__c: data.shippingStreetAddress.value,
    Shipping_Street_Line_2__c: data.shippingStreetAddress2.value
  };
  return accountShippingData;
};


export const mapGoogleAutocompleteAddress = ( type, address ) => {
  const mappedAddress = {};
  let streetAddress = '';
  for ( let i = 0; i < address.length; i++ ) {
    const addressTyep = address[i].types[0];
    switch ( addressTyep ) {
      case 'postal_code':
        mappedAddress[`${ type }Zipcode`] = address[i].long_name;
        break;
      case 'country':
        mappedAddress['countries'] = address[i].short_name;
        break;
      case 'administrative_area_level_1':
        mappedAddress[`${ type }States`] = address[i].short_name;
        break;
      case 'locality':
        mappedAddress[`${ type }CityTown`] = address[i].long_name;
        break;
      case 'neighborhood':
        mappedAddress[`${ type }StreetAddress2`] = address[i].long_name;
        break;
      case 'street_number':
        streetAddress = `${ streetAddress } ${ address[i].long_name }`;
        mappedAddress[`${ type }StreetAddress`] = streetAddress;
        break;
      case 'route':
        streetAddress = `${ streetAddress } ${ address[i].long_name }`;
        mappedAddress[`${ type }StreetAddress`] = streetAddress;
        break;
    }
  }
  return mappedAddress;
};