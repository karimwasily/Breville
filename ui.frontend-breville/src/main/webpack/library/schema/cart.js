const getBaseQuery = ( locale = 'en-US' )=>`
id
version
cartState
totalPrice{ ...MoneyFields __typename }
taxedPrice{ 
  totalNet{ ...MoneyFields } 
  totalGross{ ...MoneyFields }
  taxPortions{ rate amount { ...MoneyFields __typename } name }
}
paymentInfo{
  payments{
   amountPlanned{
    ...MoneyFields __typename
  }
  paymentMethodInfo{
    name(locale:"en-US")
    method
  }
    id
  }
}
shippingAddress {
  id
  firstName
  lastName
  email
  streetName
  streetNumber
  phone
  additionalStreetInfo
  postalCode
  city
  region
  state
  country
}
shippingInfo{
  price{
    ...MoneyFields __typename   
  }
  shippingMethod{
    name
    localizedDescription(locale: $locale)
  }
}
billingAddress {
  id
  firstName
  lastName
  email
  streetName
  streetNumber
  phone
  additionalStreetInfo
  postalCode
  city
  region
  state
  country
}
lineItems{
 id
 name(locale: $locale)
 supplyChannel{id}
 productId
  quantity
  lineItemMode
  totalPrice{ ...MoneyFields }
  taxedPrice{ 
    totalNet{ ...MoneyFields } 
    totalGross{ ...MoneyFields }
  }
  price{
  id value{ ...MoneyFields __typename }
    discounted{
      value{ ...MoneyFields __typename }
    }
  }
  custom{
    customFieldsRaw{ name value }
  }
  variant{
    sku
    attributesRaw{
      name
      value
    }
    images{
      url
      label
      dimensions {
        width
        height
      }
    }
  }
}
discountCodes {
  discountCode {
    id
  }
}
`;

export function cartQuery( locale ) {

  return `
  query me($locale: Locale){
   me{ activeCart {${ getBaseQuery( locale ) }} }
  }
  fragment MoneyFields on Money { centAmount currencyCode fractionDigits __typename }
  `;
}

export const removeLineItemSchema = `mutation updateMyCart($id: String!, $lineItemId: String!, $version: Long!) {
  updateMyCart(
      version: $version
      id: $id,
      actions: [{removeLineItem: { lineItemId: $lineItemId }}]
  ) {
      id
  }
}`;

export const removeBundleSchema = `mutation updateMyCart($id: String!, $lineItemId: String!, $version: Long!) {
  updateMyCart(
    version: $version
    id: $id
    actions: [{ setCustomType: {
          typeKey: "cartcustomfield"
          fields: [
            { name: "delete_bundle" value: "true" }
            { name: "dynamic_bundle_id" value: $lineItemId }
          ]
        }
      }
    ]
  ) {
    id
  }
}`;

export const updateQuantity =
  `mutation updateMyCart($id: String!, $lineItemId: String!, $version: Long!, $quantity: Long!) {
    updateMyCart(
        version: $version
        id: $id,
        actions: [{changeLineItemQuantity: { lineItemId: $lineItemId quantity: $quantity }}]
    ) {
        id
    }
}`;

export const addBundleItem =
`mutation ($draft: MyCartDraft!) {
    createMyCart(draft: $draft) {
      id
      version
      __typename
    }
  }`;

export const addPromoCode =
`mutation updateMyCart($id: String!, $version: Long!, $code: String!) {
  updateMyCart(
      version: $version
      id: $id,
      actions: [{addDiscountCode: { code: $code }}]
  ) {
      id
  }
}`;

export const removePromoCode =
`mutation updateMyCart($id: String!, $version: Long!, $code: String!) {
  updateMyCart(
      version: $version
      id: $id,
      actions: [{removeDiscountCode: { discountCode: { typeId: "discount-code", id: $code} }}]
  ) {
      id
  }
}`;
