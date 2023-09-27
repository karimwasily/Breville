/* eslint-disable */ 

export const getShippingMethods = `query ShippingMethodsByLocation($country: Country!) {
  shippingMethodsByLocation(
      country: $country
  ) {
      name
      id
      zoneRates {
      shippingRates {
          price {
            type
            currencyCode
            centAmount
            fractionDigits
          }
        }
      }
  }
  }`;


export const getVersion =
    `query ($id: String!) {
        cart (
            id: $id,
        ) {
            id
              version
        }
      }
    `;

export const updateAddress =
    `mutation ($id: String!, $version: Long!, $shipping: AddressInput, $billing: AddressInput, $shippingMethodId: String) {
        updateMyCart (
            version: $version
            id: $id,
            actions: [{setShippingAddress: { address: $shipping}}, 
              {setBillingAddress: { address: $billing}}, 
              { setShippingMethod: { shippingMethod: { id: $shippingMethodId }} }]
        ) {
            id
              shippingAddress {
                id
            }
                billingAddress {
              id
            }
        }
      }
    `;

export default {
  updateAddress,
  getVersion,
  getShippingMethods
};

