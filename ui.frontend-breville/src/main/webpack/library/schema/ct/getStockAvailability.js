// channel ID = "0795e888-c399-4977-badf-88009c0893bf"
// channel KEY = 'breville-web-us'
// sku: "BES920BSXL"
export const getStockAvailabilityQuery = `
  query products($sku: String!) {
    product(sku: $sku) {
      masterData {
        current {
          masterVariant {
            availability {
              channels(includeChannelIds: ["0795e888-c399-4977-badf-88009c0893bf"]) {
                results {
                  availability {
                    isOnStock
                    restockableInDays
                    availableQuantity
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;