// product(sku: "BBL920") {
export const getProductQuery = `
  query GetProduct($sku: String) {
    product(sku: $sku) {
      masterData {
        current {
          allVariants {
            sku
            attributesRaw {
              name
              value
            }
          }
        }
      }
    }
  }
`;