export const updateCartMutation = `
  mutation updateMyCart($id: String!, $version: Long!, $actions: [MyCartUpdateAction!]!, $locale: Locale!) {
    updateMyCart(id: $id, version: $version, actions: $actions) {
      ...CartFields
      __typename
    }
  }

  fragment CartFields on Cart {
    id
    version
    lineItems {
      id
      name(locale: $locale)
      productSlug(locale: $locale)
      quantity
      price {
        value {
          ...MoneyFields
          __typename
        }
        discounted {
          value {
            ...MoneyFields
            __typename
          }
          __typename
        }
        __typename
      }
      totalPrice {
        ...MoneyFields
        __typename
      }
      variant {
        sku
        images {
          url
          __typename
        }
        attributesRaw {
          name
          value
          attributeDefinition {
            type {
              name
              __typename
            }
            name
            label(locale: $locale)
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    totalPrice {
      ...MoneyFields
      __typename
    }
    shippingInfo {
      shippingMethod {
        id
        name
        localizedDescription(locale: $locale)
        __typename
      }
      price {
        ...MoneyFields
        __typename
      }
      __typename
    }
    taxedPrice {
      totalGross {
        ...MoneyFields
        __typename
      }
      totalNet {
        ...MoneyFields
        __typename
      }
      __typename
    }
    discountCodes {
      discountCode {
        id
        code
        name(locale: $locale)
        __typename
      }
      __typename
    }
    shippingAddress {
      ...AddressFields
      __typename
    }
    billingAddress {
      ...AddressFields
      __typename
    }
    __typename
  }

  fragment MoneyFields on Money {
    centAmount
    currencyCode
    fractionDigits
    __typename
  }

  fragment AddressFields on Address {
    firstName
    lastName
    streetName
    additionalStreetInfo
    postalCode
    city
    country
    phone
    email
    __typename
  }
`;

/*
{
  "id": "<<cart id >>",
  "version": "<<cart version>>",
  "locale": "en-US",
  "actions": [
    {
      "addLineItem": {
        "sku": "<<dynamic bundle sku>>",
        "quantity": 1,
        "supplyChannel": {
          "typeId": "channel",
          "key": "breville-web-us"
        },
        "distributionChannel": {
          "typeId": "channel",
          "key": "breville-web-us"
        }
      }
    },
    {
      "addLineItem": {
        "sku": "<<<Finished goods sku as in dynamic bundle product finishedGoodsSKU attribute>>",
        "quantity": 1,
        "custom": {
          "typeKey": "lineitemoption",
          "fields": [
            {
              "name": "parent_dynamic_bundle",
              "value": "\"<<dynamic bundle sku>>\""
            },
            {
              "name": "is_part_of_dynamic_bundle",
              "value": "true"
            }
          ]
        },
        "supplyChannel": {
          "typeId": "channel",
          "key": "breville-web-us"
        },
        "distributionChannel": {
          "typeId": "channel",
          "key": "breville-web-us"
        }
      }
    },
    {
      "addLineItem": {
        "sku": "<<beans sku for plan wekly 2>>",
        "quantity": 1,
        "custom": {
          "typeKey": "lineitemoption",
          "fields": [
            {
              "name": "parent_dynamic_bundle",
              "value": "\"<<dynamic bundle sku>>\""
            },
            {
              "name": "is_part_of_dynamic_bundle",
              "value": "true"
            },
            {
              "name": "Grind",
              "value": "\"test\""
            },
            {
              "name": "Subscription_plan_id",
              "value": "\"PLAN_WEEKLY_2\""
            }
          ]
        },
        "supplyChannel": {
          "typeId": "channel",
          "key": "breville-web-us"
        },
        "distributionChannel": {
          "typeId": "channel",
          "key": "breville-web-us"
        }
      }
    }
  ]
}
*/