var skuIDforPnA = '';

export const query = `query (
$options: PageQueryOptions
) {
  posts(options: $options) {
    data {
      id
      title
    }
    meta {
      totalCount
    }
  }
}`;

export const mutation = `mutation (
    $input: CreatePostInput!
  ) {
    createPost(input: $input) {
      id
      title
      body
    }
}`;


export const CreateEmptycartmutation = `
  mutation ($draft: MyCartDraft!) {
    createMyCart(draft: $draft) {
      id
      version
      __typename
    }
  }
  `;

export const CreateEmptyCartVariables = '{"draft": {"currency":"USD" , "country": "US", "inventoryMode": "ReserveOnOrder"}}';
export const UpdateCartmutation = 'mutation updateMyCart($id: String!, $version: Long!, $actions: [MyCartUpdateAction!]!, $locale: Locale!) { updateMyCart(id: $id, version: $version, actions: $actions) { ...CartFields __typename } } fragment CartFields on Cart { id version lineItems { id name(locale: $locale) productSlug(locale: $locale) quantity price { channel{ id } value { ...MoneyFields __typename } discounted { value { ...MoneyFields __typename } __typename } __typename } totalPrice { ...MoneyFields __typename } variant { sku images { url __typename } attributesRaw { name value attributeDefinition { type { name __typename } name label(locale: $locale) __typename } __typename } __typename } __typename } totalPrice { ...MoneyFields __typename } shippingInfo { shippingMethod { id name localizedDescription(locale: $locale) __typename } price { ...MoneyFields __typename } __typename } taxedPrice { totalGross { ...MoneyFields __typename } totalNet { ...MoneyFields __typename } __typename } discountCodes { discountCode { id code name(locale: $locale) __typename } __typename } shippingAddress { ...AddressFields __typename } billingAddress { ...AddressFields __typename } __typename } fragment MoneyFields on Money { centAmount currencyCode fractionDigits __typename } fragment AddressFields on Address { id firstName lastName streetName additionalStreetInfo postalCode city state country phone email __typename }';
export const GoToCart = 'query me($locale: Locale!) { me { activeCart { ...CartFields __typename } __typename } } fragment CartFields on Cart { id customerEmail version lineItems { id name(locale: $locale) productSlug(locale: $locale) quantity discountedPricePerQuantity{ quantity discountedPrice{ includedDiscounts{ discountedAmount{ centAmount } } } } custom{ customFieldsRaw{ name value } } distributionChannel { id __typename } price { channel { id __typename } value { ...MoneyFields __typename } discounted { value { ...MoneyFields __typename } __typename } __typename } totalPrice { ...MoneyFields __typename } totalPrice { ...MoneyFields __typename } taxedPrice{ totalNet{ ...MoneyFields } totalGross{ ...MoneyFields } } taxRate{ amount subRates{ amount } } variant { sku images { url __typename } attributesRaw { name value attributeDefinition { type { name __typename } name label(locale: $locale) __typename } __typename } __typename } __typename } totalPrice { ...MoneyFields __typename } shippingInfo { shippingMethod { id name localizedDescription(locale: $locale) __typename } price { ...MoneyFields __typename } __typename } taxedPrice { totalGross { ...MoneyFields __typename } totalNet { ...MoneyFields __typename } taxPortions{ rate amount{ ...MoneyFields } } __typename } discountCodes { discountCode { id code name(locale: $locale) __typename } __typename } shippingAddress { ...AddressFields __typename } billingAddress { ...AddressFields __typename } __typename } fragment MoneyFields on Money { centAmount currencyCode fractionDigits __typename } fragment AddressFields on Address { firstName lastName streetName additionalStreetInfo postalCode city state region country phone email __typename }';
export const GoToCartVariables = '{"locale":"en"}';
export const GetProductbySku = 'query products($where:String!,$includeNames:[String!],$locale:Locale!) {products(where:$where ) { results { skus masterData{ current{ slug(locale:$locale) masterVariant{ images { url label } attributesRaw(includeNames:$includeNames){ name value } } }} } }}';
export const deleteLineItemQuery = 'mutation updateMyCart($id: String!, $version: Long!, $actions: [MyCartUpdateAction!]!, $locale: Locale!) { updateMyCart(id: $id, version: $version, actions: $actions) { ...CartFields __typename } } fragment CartFields on Cart { id version lineItems { id name(locale: $locale) productSlug(locale: $locale) quantity price { channel{ id } value { ...MoneyFields __typename } discounted { value { ...MoneyFields __typename } __typename } __typename } totalPrice { ...MoneyFields __typename } variant { sku images { url __typename } attributesRaw { name value attributeDefinition { type { name __typename } name label(locale: $locale) __typename } __typename } __typename } __typename } totalPrice { ...MoneyFields __typename } shippingInfo { shippingMethod { id name localizedDescription(locale: $locale) __typename } price { ...MoneyFields __typename } __typename } taxedPrice { totalGross { ...MoneyFields __typename } totalNet { ...MoneyFields __typename } __typename } discountCodes { discountCode { id code name(locale: $locale) __typename } __typename } shippingAddress { ...AddressFields __typename } billingAddress { ...AddressFields __typename } __typename } fragment MoneyFields on Money { centAmount currencyCode fractionDigits __typename } fragment AddressFields on Address { firstName lastName streetName additionalStreetInfo postalCode city country phone email __typename }';
export const promoCodeQuery = `mutation updateMyCart($id: String!, $version: Long!, $actions: [MyCartUpdateAction!]!, $locale: Locale!) { updateMyCart(id: $id, version: $version, actions: $actions) { ...CartFields __typename } } fragment CartFields on Cart { id version lineItems { id name(locale: $locale) productSlug(locale: $locale) quantity price { value { ...MoneyFields __typename } discounted { value { ...MoneyFields __typename } __typename } __typename } totalPrice { ...MoneyFields __typename } variant { sku images { url __typename } attributesRaw { name value attributeDefinition { type { name __typename } name label(locale: $locale) __typename } __typename } __typename } __typename } totalPrice { ...MoneyFields __typename } shippingInfo { shippingMethod { id name localizedDescription(locale: $locale) __typename } price { ...MoneyFields __typename } __typename } taxedPrice { totalGross { ...MoneyFields __typename } totalNet { ...MoneyFields __typename } __typename } discountCodes { discountCode { id code name(locale: $locale) __typename } __typename } shippingAddress { ...AddressFields __typename } billingAddress { ...AddressFields __typename } __typename } fragment MoneyFields on Money { centAmount currencyCode fractionDigits __typename } fragment AddressFields on Address { firstName lastName streetName additionalStreetInfo postalCode city country phone email __typename }`;
export const CreateOrder = 'mutation ($id: String!, $version: Long!, $locale: Locale!) { createMyOrderFromCart(draft: {id: $id, version: $version}) { ...OrderFields } } fragment OrderFields on Order { id orderNumber createdAt lineItems { id name(locale: $locale) productSlug(locale: $locale) quantity price { value { ...MoneyFields } discounted { value { ...MoneyFields } } } custom{ customFieldsRaw{ name value } } totalPrice { ...MoneyFields } variant { sku images { url } attributesRaw { name value attributeDefinition { type { name } name label(locale: $locale) } } } } totalPrice { ...MoneyFields } shippingInfo { shippingMethod { name localizedDescription(locale: $locale) } price { ...MoneyFields } } taxedPrice { totalGross { ...MoneyFields } totalNet { ...MoneyFields } } discountCodes { discountCode { id code name(locale: $locale) } } shippingAddress { ...AddressFields } billingAddress { ...AddressFields } paymentInfo { payments { paymentStatus { interfaceCode } } } } fragment MoneyFields on Money { centAmount currencyCode fractionDigits } fragment AddressFields on Address { firstName lastName streetName additionalStreetInfo postalCode city country phone email }';
export const GetOrderDetails = 'query me($locale:Locale!,$ID:String!){me {order(id:$ID){ orderNumber createdAt lineItems {id name(locale: $locale) productSlug(locale: $locale) quantity price { value { ...MoneyFields } discounted {value { ...MoneyFields } } }custom{customFieldsRaw{ name value } } totalPrice { ...MoneyFields } variant { sku images { url } attributesRaw { name value attributeDefinition { type { name } name label(locale: $locale) } } } }totalPrice {...MoneyFields } shippingInfo { shippingMethod{ name localizedDescription(locale: $locale) } price { ...MoneyFields } } taxedPrice { totalGross { ...MoneyFields } totalNet { ...MoneyFields } } discountCodes { discountCode { id code name(locale: $locale) } } shippingAddress {...AddressFields } billingAddress { ...AddressFields } paymentInfo { payments { paymentStatus { interfaceCode } } } }} } fragment MoneyFields on Money { centAmount currencyCode fractionDigits } fragment AddressFields on Address { firstName lastName streetName additionalStreetInfo postalCode city country phone email}';
export const GetCartVersion = 'query me { me { activeCart { ...CartFields } } } fragment CartFields on Cart { id version }';
export const SetShipingMethod = 'mutation updateMyCart($id: String!, $version: Long!, $actions: [MyCartUpdateAction!]!, $locale: Locale!) { updateMyCart(id: $id, version: $version, actions: $actions) { ...CartFields __typename } } fragment CartFields on Cart { id version lineItems { id name(locale: $locale) productSlug(locale: $locale) quantity discountedPricePerQuantity{ quantity discountedPrice{ includedDiscounts{ discountedAmount{ centAmount } } } } custom{ customFieldsRaw{ name value } } distributionChannel { id __typename } price { channel { id __typename } value { ...MoneyFields __typename } discounted { value { ...MoneyFields __typename } __typename } __typename } totalPrice { ...MoneyFields __typename } totalPrice { ...MoneyFields __typename } taxedPrice{ totalNet{ ...MoneyFields } totalGross{ ...MoneyFields } } taxRate{ amount subRates{ amount } } variant { sku images { url __typename } attributesRaw { name value attributeDefinition { type { name __typename } name label(locale: $locale) __typename } __typename } __typename } __typename } totalPrice { ...MoneyFields __typename } taxedPrice { totalGross { ...MoneyFields __typename } totalNet { ...MoneyFields __typename } __typename } shippingInfo { shippingMethod { id name localizedDescription(locale: $locale) __typename } price { ...MoneyFields __typename } __typename } __typename } fragment MoneyFields on Money { centAmount currencyCode fractionDigits __typename }';
export const PriceandAvailablilityMutation = 'query ProductDetails($includeChannelIds:String!,$country:Country!,$currency:Currency!,$where:String!){  products(sort: "createdAt asc" , where: $where)  {total results { masterData { published  current {  masterVariant {    price(currency:$currency,channelId:$includeChannelIds,country:$country)    {  ...ProductPrices  }  availability{ channels(includeChannelIds:[$includeChannelIds])      { results{  availability{  isOnStock  }  } }  }  }  }  }  }  }}fragment ProductPrices on ProductPrice  {  value {  type  currencyCode    centAmount  fractionDigits  }  country  channel {  name (locale: "en-US") }}';
export const GetPaymentVersion = 'query me($id:String!){ me{payment(id:$id){version } }}';
export default {
  query,
  mutation,
  CreateEmptycartmutation,
  CreateEmptyCartVariables,
  UpdateCartmutation,
  GoToCart,
  GoToCartVariables,
  GetProductbySku,
  deleteLineItemQuery,
  promoCodeQuery,
  CreateOrder,
  GetOrderDetails,
  GetCartVersion,
  SetShipingMethod,
  PriceandAvailablilityMutation,
  GetPaymentVersion
};