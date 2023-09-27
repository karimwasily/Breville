export const createCartMutation = `
  mutation ($draft: MyCartDraft!) {
    createMyCart(draft: $draft) {
      id
      version
      __typename
    }
  }
`;


/*
  { draft: {
    currency: currency,
    country: country,
    billingAddress: {
      country: country
    }
  }
*/