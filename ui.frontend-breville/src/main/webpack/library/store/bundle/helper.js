/**
 * graphql variable data for create cart
 * @param {object} args args
 * @param {string} args.currency currency code for the cart (USD)
 * @param {string} args.country country code for the cart (US)
 * @param {string} args.locale locale region (en-US)
 * @returns {object} graphql cart draft variable
 */
export const createCartVars = ( { currency, country, locale } ) => (
  { draft: {
    currency: currency,
    country: country,
    locale,
    inventoryMode: 'ReserveOnOrder',
    billingAddress: {
      country: country
    }
  }
  } );

/**
 * graphql variable data for create cart with bundle request
 * @param {object} args args
 * @param {string} args.dynamicBundleVariantSKU sku of the dyn bun variant
 * @param {string} args.dynamicBundleFinishedGoodSKU sku of the finished good within the dynamic bundle product
 * @param {string} args.coffeeSubscriptionSKU sku of the beanz subscription
 * @param {string} args.webchannel web channel key of the bundle and finished good line items (breville-web-us)
 * @param {string} args.currency currency code for the cart (USD)
 * @param {string} args.country country code for the cart (US)
 * @returns {object} graphql cart draft variable
 */
export const createCartWithBundleVars = ( { dynamicBundleVariantSKU, dynamicBundleFinishedGoodSKU, coffeeSubscriptionSKU, webchannel, currency, country } ) => (
  { draft: {
    currency: currency,
    shippingAddress: {
      country
    },
    billingAddress: {
      country
    },
    lineItems: [
      {
        sku: dynamicBundleVariantSKU,
        quantity: 1,
        supplyChannel: {
          typeId: 'channel',
          key: webchannel
        },
        distributionChannel: {
          typeId: 'channel',
          key: webchannel
        }
      },
      {
        // sku: '<<<Finished goods sku as in dynamic bundle product finishedGoodsSKU attribute>>',
        sku: dynamicBundleFinishedGoodSKU,
        quantity: 1,
        custom: {
          typeKey: 'lineitemoption',
          fields: [
            {
              name: 'parent_dynamic_bundle',
              // value: '"<<dynamic bundle variant sku>>"'
              value: JSON.stringify( dynamicBundleVariantSKU )
            }, {
              name: 'is_part_of_dynamic_bundle',
              value: 'true'
            }
          ]
        },
        supplyChannel: {
          typeId: 'channel',
          key: webchannel
        },
        distributionChannel: {
          typeId: 'channel',
          key: webchannel
        }
      },
      {
        // sku: '<<Beans SKU>>',
        sku: coffeeSubscriptionSKU,
        quantity: 1,
        custom: {
          typeKey: 'lineitemoption',
          fields: [
            {
              name: 'parent_dynamic_bundle',
              value: JSON.stringify( dynamicBundleVariantSKU )
            }, {
              name: 'is_part_of_dynamic_bundle',
              value: 'true'
            },
            {
              name: 'Grind',
              value: '"test"'
            },
            {
              name: 'Subscription_plan_id',
              value: '\"PLAN_WEEKLY_2\"'
            }
          ]
        },
        supplyChannel: {
          typeId: 'channel',
          key: webchannel
        },
        distributionChannel: {
          typeId: 'channel',
          key: webchannel
        }
      }
    ]
  }
  } );

/**
 * graphql variable data for update cart request
 * @param {object} args args
 * @param {string} args.cartID cart ID (4b46c5f6-7106-475b-8dd0-a3d502d23cec)
 * @param {string} args.cartVersion cart version (5)
 * @param {string} args.locale locale region (en-US)
 * @param {string} args.country country code (US)
 * @returns {object}
 */
export const updateCartTaxModeVars = ( { cartID, cartVersion, locale, country } ) => (
  { id: cartID, version: cartVersion, locale,
    actions: [{
      changeTaxMode: {
        taxMode: 'Platform'
      }
    },
    {
      setShippingAddress: {
        address: { country }
      }
    }
    ]
  }
);

/**
 * graphql variable data for update cart with bundle request
 * @param {object} args args
 * @param {string} args.dynamicBundleVariantSKU sku of the dyn bun variant
 * @param {string} args.dynamicBundleFinishedGoodSKU sku of the finished good within the dynamic bundle product
 * @param {string} args.coffeeSubscriptionSKU sku of the beanz subscription
 * @param {string} args.cartID cart ID (4b46c5f6-7106-475b-8dd0-a3d502d23cec)
 * @param {string} args.cartVersion cart version (5)
 * @param {string} args.country country code (US)
 * @param {string} args.locale locale region (en-US)
 * @param {string} args.webchannel webchannel (breville-web-us)
 * @returns {object}
 */
export const updateCartBundleLineItemsVars = ( { dynamicBundleVariantSKU, dynamicBundleFinishedGoodSKU, coffeeSubscriptionSKU, cartID, cartVersion, country, locale, webchannel } ) => (
  {
    id: cartID,
    version: cartVersion,
    locale,
    shippingAddress: {
      country
    },
    billingAddress: {
      country
    },
    actions: [
      {
        addLineItem: {
          sku: dynamicBundleVariantSKU,
          quantity: 1,
          supplyChannel: {
            typeId: 'channel',
            key: webchannel
          },
          distributionChannel: {
            typeId: 'channel',
            key: webchannel
          }
        }
      },
      {
        addLineItem: {
          sku: dynamicBundleFinishedGoodSKU,
          quantity: 1,
          custom: {
            typeKey: 'lineitemoption',
            fields: [
              {
                name: 'parent_dynamic_bundle',
                value: JSON.stringify( dynamicBundleVariantSKU )
              },
              {
                name: 'is_part_of_dynamic_bundle',
                value: 'true'
              }
            ]
          },
          supplyChannel: {
            typeId: 'channel',
            key: webchannel
          },
          distributionChannel: {
            typeId: 'channel',
            key: webchannel
          }
        }
      },
      {
        addLineItem: {
          sku: coffeeSubscriptionSKU,
          quantity: 1,
          custom: {
            typeKey: 'lineitemoption',
            fields: [
              {
                name: 'parent_dynamic_bundle',
                value: JSON.stringify( dynamicBundleVariantSKU )
              },
              {
                name: 'is_part_of_dynamic_bundle',
                value: 'true'
              },
              {
                name: 'Grind',
                value: '"test"'
              },
              {
                name: 'Subscription_plan_id',
                value: '\"PLAN_WEEKLY_2\"'
              }
            ]
          },
          supplyChannel: {
            typeId: 'channel',
            key: webchannel
          },
          distributionChannel: {
            typeId: 'channel',
            key: webchannel
          }
        }
      }
    ]
  }
);
