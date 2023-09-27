// {"where": "key in (\"BES880\",\"BES878\")"}

export const getMachinesViaFinishedGoodsKEY = `
  query ($where: String, $locale: Locale) {
    products(where: $where) {
      count
      results {
        id
        key
        masterData {
          current {
            name(locale: $locale)
            categories {
              id
              key
            }
            allVariants {
              key
              sku
              attributesRaw {
                name
                value
              }
              images {
                ...ProductImages
              }
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
