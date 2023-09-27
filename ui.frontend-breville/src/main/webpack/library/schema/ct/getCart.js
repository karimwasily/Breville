// { id: "40bc59ee-63c0-4ac2-8dba-a6da646f45ec" }
export const getCartQuery = `
  query me($id: String!) {
    me {
      cart(id: $id) {
        id
        version
        lineItems {
          id
          variant {
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
`;
