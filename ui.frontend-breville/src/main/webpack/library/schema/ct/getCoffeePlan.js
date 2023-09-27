// {"sku": "MBZ31860CWA04012Z_PLAN_WEEKLY_2"}
export const getCoffeePlanQuery = `
  query ($sku: String) {
    product(sku: $sku) {
      masterData {
        current {
          allVariants {
            sku
            prices {
              country
              channel {
                key
                id
              }
              value {
                centAmount
                currencyCode
              }
            }
            attributesRaw(includeNames: ["subscriptionPlanKey"]) {
              name
              value
            }
          }
        }
      }
    }
  }
`;
