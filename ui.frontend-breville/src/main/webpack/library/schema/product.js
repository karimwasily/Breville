export const productQuery = `
query products($Where: String!) {
  products(where: $Where) {
    results {
      id
      lastModifiedAt
      masterData{
        current {
          name(locale:"en-US")
          nameAllLocales {
            locale
            value
          }
          masterVariant{
            sku
             prices{
              id
              discounted {
                value {
                  centAmount
                  fractionDigits
                  currencyCode
                  type
                }
                discountRef {
                  id
                }
              }
              value {
                centAmount
                fractionDigits
                currencyCode
                type
              }
              channel{
                id
              }
            }
          }
          variants {
            attributesRaw {
              name
              value
            }
           prices {
              id
              discounted {
                value {
                  centAmount
                  fractionDigits
                  currencyCode
                  type
                }
                discountRef {
                  id
                }
              }
              value {
                centAmount
                fractionDigits
                currencyCode
                type
              }
            }
          }
        }
      }
    }
  }
}`;
