// variables:
// const skus=["dynamic_bundle_sku001","db0002"];
// {variables:{skus:skus}}
export const getProductsQuery = `
  query GetProducts($skus:[String!]){
    products(skus:$skus) {
      total
      results{
        key
        masterData{
          current{
            allVariants{
              sku
              attributesRaw{
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
