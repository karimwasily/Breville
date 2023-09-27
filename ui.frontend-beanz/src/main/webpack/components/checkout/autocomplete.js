import { func, string } from 'prop-types';

let shippingAddressautocomplete;
let billingAddressautocomplete;
let inputField;

export function initAutocomplete( updateAddress, inputId ) {

  inputField = document.querySelector( `#${ inputId }` );
  const config = {
    componentRestrictions: { country: ['us'] },
    fields: ['address_components', 'geometry'],
    types: ['address']
  };

  if ( inputId === 'shippingStreetAddress' ) {
    shippingAddressautocomplete = new google.maps.places.Autocomplete( inputField, config );
    shippingAddressautocomplete.addListener( 'place_changed', fillShippingAddress );
  }

  if ( inputId === 'billingStreetAddress' ) {
    billingAddressautocomplete = new google.maps.places.Autocomplete( inputField, config );
    billingAddressautocomplete.addListener( 'place_changed', fillBillingAddress );
  }

  function fillShippingAddress() {
    const place = shippingAddressautocomplete.getPlace();
    if ( typeof updateAddress === 'function' ) {
      updateAddress( 'shipping', place.address_components );
    }
  }

  function fillBillingAddress() {
    const place = billingAddressautocomplete.getPlace();
    if ( typeof updateAddress === 'function' ) {
      updateAddress( 'billing', place.address_components );
    }
  }
}


initAutocomplete.propTypes = {
  updateAddress: func,
  inputId: string
};
