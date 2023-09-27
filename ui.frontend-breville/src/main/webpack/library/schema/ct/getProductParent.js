// variables:
// {
//   "locale": "en-US",
//   "parentSKU": "BES920"
// }
export const getProductParentQuery = `
  query ProductDetails ($locale: Locale, $productParentSKU: String) {
    product(key: $productParentSKU) {
      key
      productType {
        key
      }
      masterData {
        published
        current {
          name(locale: $locale)
          categories {
            id
            key
          }
          masterVariant {
            sku
            prices {
              ...ProductPrices
            }
            availability {
              ...AvailabilityFragment
            }
          }
          allVariants {
            images {
              ...ProductImages
            }
            attributesRaw {
              name
              value
            }
            key
            sku
            prices {
              ...ProductPrices
            }
            availability {
              ...AvailabilityFragment
            }
          }
        }
      }
    }
  }
  fragment ProductImages on Image {
    label
    url
  }
  fragment ProductPrices on ProductPrice {
    value {
      type
      currencyCode
      centAmount
      fractionDigits
    }
    country
    channel {
      name(locale: $locale)
    }
  }
  fragment AvailabilityFragment on ProductVariantAvailabilityWithChannels {          
    channels {
      results {
        channel {
          name(locale: $locale)
        }
        availability {
          isOnStock
          availableQuantity
        }
      }
    }
  }
`;