// {"where": "masterData(current(categories(id=\"dcce414f-f31a-4979-a6d2-8853694a54e6\")))"}

export const getDynamicBundlesViaCategoryQuery = `
  query  ($where:String){
    products(where:$where) {
      count
      results {
        id
        key
        masterData {
          current {
            masterVariant {
              key
              sku
              attributesRaw {
                name
                value
                }
              }
              allVariants {
                key
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
  }
`;